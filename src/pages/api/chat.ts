import Groq from 'groq-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are an AI assistant for Boon AI's pre-construction cost estimator tool. You help contractors and estimators manage line items for early-stage project estimates.

Available catalog items with codes:
- CON: Concrete Foundation - $150/CY
- STL: Steel Framing - $275/TN
- ELE: Electrical Rough-In - $95/PT
- PLM: Plumbing Rough-In - $120/FX
- HVC: HVAC Ductwork - $185/LF
- DRY: Drywall Installation - $45/SF
- ROF: Roofing Assembly - $225/SQ
- WIN: Window Units - $350/EA
- FIR: Fire Suppression - $165/HD
- CLD: Exterior Cladding - $95/SF

Location tags: Building A, Building B, Building C, Site Work

You help with:
1. Adding new line items with appropriate catalog items and realistic quantities
2. Optimizing quantities based on industry standards
3. Auto-tagging items with locations based on their names
4. Finding commonly missing items for commercial construction
5. Providing cost summaries and analysis

ALWAYS respond with a JSON action block when making changes:
\`\`\`json
{
  "action": "add" | "update" | "none",
  "items": [
    {
      "id": "existing-item-id (for updates only)",
      "name": "Item description",
      "catalogItem": "CON" | "STL" | "ELE" | "PLM" | "HVC" | "DRY" | "ROF" | "WIN" | "FIR" | "CLD" | null,
      "quantity": number,
      "tags": ["Building A", "Building B", "Building C", "Site Work"]
    }
  ],
  "message": "Brief explanation of changes"
}
\`\`\`

For "Add Line Items" requests: Suggest 2-4 new items that complement the current estimate.
For "Find Missing Items": Analyze the estimate and suggest commonly required items that may be missing.
For "Optimize Quantities": Review quantities and suggest realistic adjustments based on commercial construction standards.
For "Auto-Tag Location": Analyze item names and assign appropriate location tags.
For "Cost Summary": Provide analysis without JSON block.`;

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

interface LineItem {
    id: string;
    name: string;
    catalogItem: string | null;
    quantity: number;
    tags: string[];
}

interface RequestBody {
    messages: ChatMessage[];
    lineItems: LineItem[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { messages, lineItems } = req.body as RequestBody;

        // Build context about current line items
        let context = '';
        if (lineItems && lineItems.length > 0) {
            context = '\n\nCurrent line items in the estimate:\n';
            lineItems.forEach((item, index) => {
                const catalogInfo = item.catalogItem
                    ? `Catalog: ${item.catalogItem}`
                    : 'No catalog item';
                const tagInfo = item.tags.length > 0
                    ? `Tags: ${item.tags.join(', ')}`
                    : 'No tags';
                context += `${index + 1}. [ID: ${item.id}] ${item.name} - ${catalogInfo}, Qty: ${item.quantity}, ${tagInfo}\n`;
            });
        } else {
            context = '\n\nThe estimate is currently empty (no line items).';
        }

        const response = await client.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            max_tokens: 1024,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT + context },
                ...messages.map(msg => ({
                    role: msg.role as 'user' | 'assistant',
                    content: msg.content,
                })),
            ],
        });

        const assistantMessage = response.choices[0]?.message?.content || '';

        // Try to extract JSON action from response
        let action = null;
        const jsonMatch = assistantMessage.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch) {
            try {
                action = JSON.parse(jsonMatch[1]);
            } catch {
                // JSON parsing failed, no action
            }
        }

        return res.status(200).json({
            message: assistantMessage,
            action,
        });
    } catch (error) {
        console.error('Chat API error:', error);
        return res.status(500).json({ error: 'Failed to process chat request' });
    }
}
