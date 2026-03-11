'use client';
import * as React from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Popover } from '@base-ui/react/popover';
import { Checkbox } from '@base-ui/react/checkbox';
import { Menu } from '@base-ui/react/menu';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Types
interface CatalogItem { id: string; name: string; cost: number; unit: string; }
interface LineItem { id: string; name: string; catalogItem: string | null; quantity: number; tags: string[]; isNew?: boolean; }

// Data
const CATALOG: CatalogItem[] = [
    { id: 'CON', name: 'Concrete Foundation', cost: 150, unit: 'CY' },
    { id: 'STL', name: 'Steel Framing', cost: 275, unit: 'TN' },
    { id: 'ELE', name: 'Electrical Rough-In', cost: 95, unit: 'PT' },
    { id: 'PLM', name: 'Plumbing Rough-In', cost: 120, unit: 'FX' },
    { id: 'HVC', name: 'HVAC Ductwork', cost: 185, unit: 'LF' },
    { id: 'DRY', name: 'Drywall Installation', cost: 45, unit: 'SF' },
    { id: 'ROF', name: 'Roofing Assembly', cost: 225, unit: 'SQ' },
    { id: 'WIN', name: 'Window Units', cost: 350, unit: 'EA' },
    { id: 'FIR', name: 'Fire Suppression', cost: 165, unit: 'HD' },
    { id: 'CLD', name: 'Exterior Cladding', cost: 95, unit: 'SF' },
];

const LOCATIONS = [
    { id: 'Building A', gradient: 'from-blue-50 to-white' },
    { id: 'Building B', gradient: 'from-emerald-50 to-white' },
    { id: 'Building C', gradient: 'from-amber-50 to-white' },
    { id: 'Site Work', gradient: 'from-slate-50 to-white' },
];

const INITIAL_ITEMS: LineItem[] = [
    { id: '1', name: 'Foundation - Main Structure', catalogItem: 'CON', quantity: 450, tags: ['Building A'] },
    { id: '2', name: 'Foundation - Annex Wing', catalogItem: 'CON', quantity: 180, tags: ['Building B'] },
    { id: '3', name: 'Structural Steel - Floors 1-5', catalogItem: 'STL', quantity: 125, tags: ['Building A'] },
    { id: '4', name: 'Structural Steel - Annex', catalogItem: 'STL', quantity: 48, tags: ['Building B'] },
    { id: '5', name: 'Electrical - Core Distribution', catalogItem: 'ELE', quantity: 320, tags: ['Building A', 'Building B'] },
    { id: '6', name: 'Electrical - Office Floors', catalogItem: 'ELE', quantity: 580, tags: ['Building A'] },
    { id: '7', name: 'Plumbing - Restroom Cores', catalogItem: 'PLM', quantity: 96, tags: ['Building A', 'Building B'] },
    { id: '8', name: 'HVAC - Main Distribution', catalogItem: 'HVC', quantity: 2400, tags: ['Building A'] },
    { id: '9', name: 'Drywall - Interior Partitions', catalogItem: 'DRY', quantity: 18500, tags: ['Building A', 'Building B'] },
    { id: '10', name: 'Roofing - Main Building', catalogItem: 'ROF', quantity: 85, tags: ['Building A'] },
];

const AI_ACTIONS = {
    withSelection: [
        { id: 'optimize-qty', label: 'Optimize Quantities', desc: 'AI suggests optimal quantities' },
        { id: 'auto-tag', label: 'Auto-Tag Locations', desc: 'AI assigns location tags' },
    ],
    withoutSelection: [
        { id: 'suggest-items', label: 'Suggest Missing Items', desc: 'AI finds missing items' },
        { id: 'cost-analysis', label: 'Cost Analysis', desc: 'AI cost breakdown' },
    ]
};

// Helpers
const generateId = () => `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
const getCatalog = (id: string | null) => CATALOG.find(c => c.id === id);
const getCost = (item: LineItem) => (getCatalog(item.catalogItem)?.cost || 0) * item.quantity;
const formatCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(n);

// Basil Icons - Using downloaded SVGs as inline components
const Icons = {
    plus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>,
    trash: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
    copy: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
    chat: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
    sparkles: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/></svg>,
    building: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01"/></svg>,
    home: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>,
    book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
    chevronDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>,
    x: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>,
    send: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2" fill="none"/></svg>,
    check: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>,
    stop: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>,
};

// Sidebar
function Sidebar({ activeSection }: { activeSection: string }) {
    return (
        <aside className="w-56 bg-[#2D5A27] flex flex-col h-screen fixed left-0 top-0 z-40">
            <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                        <span className="text-[#2D5A27] font-bold text-sm">B</span>
                    </div>
                    <span className="font-semibold text-white">Boon AI</span>
                </div>
            </div>
            <nav className="flex-1 p-3">
                <p className="text-xs font-medium text-white/50 uppercase tracking-wider px-3 mb-2">Menu</p>
                {[{ id: 'estimates', label: 'Estimates', Icon: Icons.book }, { id: 'catalog', label: 'Catalog', Icon: Icons.building }].map(item => (
                    <button key={item.id} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${activeSection === item.id ? 'bg-white/20 text-white font-medium' : 'text-white/70 hover:bg-white/10'}`}>
                        <item.Icon />
                        {item.label}
                    </button>
                ))}
            </nav>
            <div className="p-3 border-t border-white/10">
                <a href="/" className="flex items-center gap-2 px-3 py-2 text-sm text-white/60 hover:text-white"><Icons.home /> Back to Portfolio</a>
            </div>
        </aside>
    );
}

// Location Card
function LocationCard({ location, total, itemCount }: { location: typeof LOCATIONS[0]; total: number; itemCount: number }) {
    return (
        <div className={`bg-gradient-to-br ${location.gradient} rounded-xl border border-gray-100 p-4 shadow-sm`}>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600"><Icons.building /></div>
                <p className="text-sm font-medium text-gray-700">{location.id}</p>
            </div>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(total)}</p>
            <p className="text-xs text-gray-500 mt-1">{itemCount} items</p>
        </div>
    );
}

// AI Chat Dialog - Floating button that opens chat
function AIChatButton({ items, onItemsChange, isProcessing, setIsProcessing }: { items: LineItem[]; onItemsChange: (items: LineItem[]) => void; isProcessing: boolean; setIsProcessing: (v: boolean) => void }) {
    const [messages, setMessages] = React.useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
    const [input, setInput] = React.useState('');
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isProcessing) return;
        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsProcessing(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, { role: 'user', content: userMessage }], lineItems: items }),
            });
            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.message || 'Sorry, I could not process that.' }]);

            if (data.action?.action === 'add' && data.action.items) {
                const newItems = data.action.items.map((item: any) => ({
                    id: generateId(), name: item.name || 'New Item',
                    catalogItem: CATALOG.find(c => c.id === item.catalogItem) ? item.catalogItem : null,
                    quantity: item.quantity || 1, tags: item.tags || [], isNew: true,
                }));
                onItemsChange([...newItems, ...items]);
            } else if (data.action?.action === 'update' && data.action.items) {
                onItemsChange(items.map(item => {
                    const update = data.action.items.find((u: any) => u.id === item.id);
                    return update ? { ...item, quantity: update.quantity ?? item.quantity, tags: update.tags ?? item.tags } : item;
                }));
            }
        } catch { setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error.' }]); }
        finally { setIsProcessing(false); }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger className="fixed bottom-6 right-6 w-14 h-14 bg-[#2D5A27] text-white rounded-full shadow-lg hover:bg-[#234620] flex items-center justify-center z-50 transition-transform hover:scale-105">
                <Icons.chat />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 bg-black/30 z-50" />
                <Dialog.Popup className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col max-h-[500px] overflow-hidden">
                    <div className="px-4 py-3 bg-[#2D5A27] flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white">
                            <Icons.sparkles />
                            <span className="font-semibold">AI Assistant</span>
                        </div>
                        <Dialog.Close className="text-white/70 hover:text-white"><Icons.x /></Dialog.Close>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 min-h-[300px]">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-400 py-8">
                                <div className="mb-2 opacity-50"><Icons.chat /></div>
                                <p className="text-sm">Ask me anything about your estimate</p>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${msg.role === 'user' ? 'bg-[#2D5A27] text-white' : 'bg-white border text-gray-900'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-3 border-t flex gap-2">
                        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27]" disabled={isProcessing} />
                        <button onClick={sendMessage} disabled={isProcessing || !input.trim()} className="px-3 py-2 bg-[#2D5A27] text-white rounded-lg disabled:opacity-50"><Icons.send /></button>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

// Delete Confirm Dialog
function DeleteConfirmDialog({ isOpen, onOpenChange, itemCount, onConfirm }: { isOpen: boolean; onOpenChange: (v: boolean) => void; itemCount: number; onConfirm: () => void }) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 bg-black/50 z-50" />
                <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full z-50">
                    <Dialog.Title className="text-lg font-semibold text-gray-900 mb-2">Delete Items?</Dialog.Title>
                    <Dialog.Description className="text-gray-600 mb-6">Are you sure you want to delete {itemCount} item{itemCount > 1 ? 's' : ''}?</Dialog.Description>
                    <div className="flex gap-3 justify-end">
                        <Dialog.Close className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</Dialog.Close>
                        <button onClick={() => { onConfirm(); onOpenChange(false); }} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600">Delete</button>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

// Location Editor Popover
function LocationEditorPopover({ tags, onChange, children }: { tags: string[]; onChange: (tags: string[]) => void; children: React.ReactNode }) {
    const toggleLocation = (loc: string) => onChange(tags.includes(loc) ? tags.filter(t => t !== loc) : [...tags, loc]);
    return (
        <Popover.Root>
            <Popover.Trigger render={children as any} />
            <Popover.Portal>
                <Popover.Positioner className="z-50">
                    <Popover.Popup className="bg-white rounded-lg shadow-xl border py-2 w-48">
                        {LOCATIONS.map(loc => (
                            <button key={loc.id} onClick={() => toggleLocation(loc.id)} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50">
                                <Checkbox.Root checked={tags.includes(loc.id)} className={`w-4 h-4 rounded border-2 flex items-center justify-center ${tags.includes(loc.id) ? 'bg-[#2D5A27] border-[#2D5A27] text-white' : 'border-gray-300'}`}>
                                    <Checkbox.Indicator><Icons.check /></Checkbox.Indicator>
                                </Checkbox.Root>
                                <span className={tags.includes(loc.id) ? 'font-medium' : ''}>{loc.id}</span>
                            </button>
                        ))}
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>
    );
}

// AI Actions Menu
function AIActionsMenu({ selectedCount, onAction, isProcessing }: { selectedCount: number; onAction: (action: typeof AI_ACTIONS.withSelection[0]) => void; isProcessing: boolean }) {
    const actions = selectedCount > 0 ? AI_ACTIONS.withSelection : AI_ACTIONS.withoutSelection;
    return (
        <Menu.Root>
            <Menu.Trigger disabled={isProcessing} className="flex items-center gap-2 px-4 py-2 bg-[#2D5A27] text-white rounded-lg hover:bg-[#234620] text-sm font-medium disabled:opacity-50">
                <Icons.sparkles /> AI Assist <Icons.chevronDown />
            </Menu.Trigger>
            <Menu.Portal>
                <Menu.Positioner className="z-50">
                    <Menu.Popup className="bg-white rounded-xl shadow-xl border py-2 w-64">
                        {selectedCount > 0 && <div className="px-4 py-2 border-b bg-[#2D5A27]/5 text-xs font-medium text-[#2D5A27]">{selectedCount} item{selectedCount > 1 ? 's' : ''} selected</div>}
                        {actions.map(action => (
                            <Menu.Item key={action.id} onClick={() => onAction(action)} className="w-full flex flex-col px-4 py-2.5 text-left hover:bg-gray-50 cursor-pointer">
                                <span className="text-sm font-medium text-gray-900">{action.label}</span>
                                <span className="text-xs text-gray-500">{action.desc}</span>
                            </Menu.Item>
                        ))}
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>
    );
}

// Catalog Popover
function CatalogPopover() {
    return (
        <Popover.Root>
            <Popover.Trigger className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                <Icons.book /> Catalog
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Positioner className="z-50">
                    <Popover.Popup className="bg-white rounded-xl shadow-xl border p-4 w-80 max-h-96 overflow-y-auto">
                        <h3 className="font-semibold text-gray-900 mb-3">Catalog Reference</h3>
                        <div className="space-y-2">
                            {CATALOG.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <span className="w-8 h-8 bg-[#2D5A27]/10 text-[#2D5A27] rounded-lg flex items-center justify-center text-xs font-bold">{item.id}</span>
                                        <div><p className="text-sm font-medium">{item.name}</p><p className="text-xs text-gray-500">per {item.unit}</p></div>
                                    </div>
                                    <span className="text-sm font-semibold">{formatCurrency(item.cost)}</span>
                                </div>
                            ))}
                        </div>
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>
    );
}

// Main Layout
export default function EstimatorLayout(props: any) {
    const { page } = props;
    const { title } = page;

    const [items, setItems] = React.useState<LineItem[]>(INITIAL_ITEMS);
    const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [processingMessage, setProcessingMessage] = React.useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
    const [lottieData, setLottieData] = React.useState<any>(null);

    React.useEffect(() => { fetch('/animations/ai-flow.json').then(r => r.json()).then(setLottieData).catch(() => {}); }, []);
    React.useEffect(() => {
        const newItems = items.filter(i => i.isNew);
        if (newItems.length > 0) {
            const timer = setTimeout(() => setItems(items.map(i => ({ ...i, isNew: false }))), 3000);
            return () => clearTimeout(timer);
        }
    }, [items]);

    const total = items.reduce((sum, item) => sum + getCost(item), 0);
    const selectedTotal = Array.from(selectedIds).reduce((sum, id) => sum + (getCost(items.find(i => i.id === id)!) || 0), 0);
    const groupedByLocation = LOCATIONS.map(loc => ({ ...loc, items: items.filter(item => item.tags.includes(loc.id)), total: items.filter(item => item.tags.includes(loc.id)).reduce((sum, item) => sum + getCost(item), 0) }));

    const toggleSelect = (id: string) => { if (isProcessing) return; const s = new Set(selectedIds); s.has(id) ? s.delete(id) : s.add(id); setSelectedIds(s); };
    const toggleSelectAll = () => { if (isProcessing) return; setSelectedIds(selectedIds.size === items.length ? new Set() : new Set(items.map(i => i.id))); };
    const updateItem = (updated: LineItem) => { if (isProcessing) return; setItems(items.map(i => i.id === updated.id ? updated : i)); };
    const addItem = () => { if (isProcessing) return; setItems([{ id: generateId(), name: '', catalogItem: null, quantity: 1, tags: [], isNew: true }, ...items]); };
    const confirmDelete = () => { setItems(items.filter(i => !selectedIds.has(i.id))); setSelectedIds(new Set()); };
    const duplicateSelected = () => { if (isProcessing || selectedIds.size === 0) return; const dups = Array.from(selectedIds).map(id => { const o = items.find(i => i.id === id); return o ? { ...o, id: generateId(), name: `${o.name} (Copy)`, isNew: true } : null; }).filter(Boolean) as LineItem[]; setItems([...dups, ...items]); setSelectedIds(new Set()); };

    const handleAIAction = async (action: typeof AI_ACTIONS.withSelection[0]) => {
        setIsProcessing(true); setProcessingMessage(action.label);
        try {
            const selectedItems = Array.from(selectedIds).map(id => items.find(i => i.id === id)).filter(Boolean) as LineItem[];
            const contextItems = selectedIds.size > 0 ? selectedItems : items;
            const promptMap: Record<string, string> = {
                'optimize-qty': `Analyze and optimize quantities for these construction items. Items: ${JSON.stringify(contextItems.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, catalogItem: i.catalogItem })))}. Return updated quantities.`,
                'auto-tag': `Assign location tags (Building A, Building B, Building C, Site Work) to these items based on their names. Items: ${JSON.stringify(contextItems.map(i => ({ id: i.id, name: i.name, tags: i.tags })))}`,
                'suggest-items': `Suggest 3-4 missing items for this commercial construction estimate. Current items: ${JSON.stringify(items.map(i => i.name))}.`,
                'cost-analysis': `Provide cost analysis for this estimate. Total: ${formatCurrency(total)}. Items: ${JSON.stringify(items.map(i => ({ name: i.name, cost: getCost(i) })))}`,
            };
            const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: promptMap[action.id] || action.desc }], lineItems: contextItems }) });
            if (!response.ok) throw new Error('API request failed');
            const data = await response.json();
            if (data.action?.action === 'add' && data.action.items) {
                const newItems = data.action.items.map((item: any) => ({ id: generateId(), name: item.name || 'New Item', catalogItem: CATALOG.find(c => c.id === item.catalogItem) ? item.catalogItem : null, quantity: item.quantity || 1, tags: item.tags || [], isNew: true }));
                setItems([...newItems, ...items]);
            } else if (data.action?.action === 'update' && data.action.items) {
                setItems(items.map(item => { const update = data.action.items.find((u: any) => u.id === item.id); return update ? { ...item, quantity: update.quantity ?? item.quantity, tags: update.tags ?? item.tags } : item; }));
            }
            setSelectedIds(new Set());
        } catch (e) { console.error('AI action failed:', e); }
        finally { setIsProcessing(false); setProcessingMessage(''); }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <Sidebar activeSection="estimates" />
            <main className="ml-56 flex flex-col min-h-screen">
                <header className="bg-white border-b px-6 py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div><h1 className="text-lg font-semibold text-gray-900">{title}</h1><p className="text-sm text-gray-500">Commercial Office Complex - Phase 1</p></div>
                        <div className="flex items-center gap-6">
                            <div className="text-right"><p className="text-sm text-gray-500">Total Estimate</p><p className="text-2xl font-bold tabular-nums">{formatCurrency(total)}</p></div>
                            {selectedIds.size > 0 && <div className="text-right pl-6 border-l"><p className="text-sm text-[#2D5A27]">{selectedIds.size} selected</p><p className="text-lg font-semibold text-[#2D5A27] tabular-nums">{formatCurrency(selectedTotal)}</p></div>}
                        </div>
                    </div>
                </header>

                <div className="flex-1 px-6 py-6 overflow-auto">
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {groupedByLocation.map(loc => <LocationCard key={loc.id} location={loc} total={loc.total} itemCount={loc.items.length} />)}
                    </div>

                    <div className="bg-white rounded-t-xl border border-b-0 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button onClick={addItem} disabled={isProcessing} className="flex items-center gap-2 px-3 py-1.5 bg-[#2D5A27]/10 border border-[#2D5A27]/20 rounded-lg text-sm text-[#2D5A27] font-medium hover:bg-[#2D5A27]/20 disabled:opacity-50"><Icons.plus /> Add Item</button>
                            <CatalogPopover />
                            {selectedIds.size > 0 && (<><div className="w-px h-6 bg-gray-200" /><button onClick={duplicateSelected} disabled={isProcessing} className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"><Icons.copy /> Duplicate</button><button onClick={() => setShowDeleteConfirm(true)} disabled={isProcessing} className="flex items-center gap-2 px-3 py-1.5 border border-red-200 rounded-lg text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"><Icons.trash /> Delete</button></>)}
                        </div>
                        <AIActionsMenu selectedCount={selectedIds.size} onAction={handleAIAction} isProcessing={isProcessing} />
                    </div>

                    <div className="bg-white rounded-b-xl border overflow-hidden">
                        {isProcessing && (
                            <div className="bg-[#2D5A27] px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {lottieData ? <div className="w-8 h-8"><Lottie animationData={lottieData} loop autoplay /></div> : <div className="w-8 h-8 flex items-center justify-center"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /></div>}
                                    <div><p className="text-sm font-medium text-white">AI is working...</p><p className="text-xs text-white/70">{processingMessage}</p></div>
                                </div>
                                <button onClick={() => { setIsProcessing(false); setProcessingMessage(''); }} className="flex items-center gap-2 px-3 py-1.5 bg-white/20 text-white rounded-lg text-sm hover:bg-white/30"><Icons.stop /> Stop</button>
                            </div>
                        )}
                        <div className={isProcessing ? 'opacity-50 pointer-events-none' : ''}>
                            <table className="w-full">
                                <thead><tr className="border-b bg-gray-50/50">
                                    <th className="w-12 py-3 px-4"><Checkbox.Root checked={selectedIds.size === items.length && items.length > 0} onCheckedChange={toggleSelectAll} disabled={isProcessing} className={`w-4 h-4 rounded border-2 flex items-center justify-center ${selectedIds.size === items.length && items.length > 0 ? 'bg-[#2D5A27] border-[#2D5A27] text-white' : 'border-gray-300'}`}><Checkbox.Indicator><Icons.check /></Checkbox.Indicator></Checkbox.Root></th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Item Name</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-44">Catalog</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-24">Qty</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Location</th>
                                    <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-28">Cost</th>
                                </tr></thead>
                                <tbody>
                                    {items.map(item => {
                                        const catalog = getCatalog(item.catalogItem);
                                        return (
                                            <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50/50 ${selectedIds.has(item.id) ? 'bg-[#2D5A27]/5' : ''} ${item.isNew ? 'bg-[#2D5A27]/10 animate-pulse' : ''}`}>
                                                <td className="py-3 px-4"><Checkbox.Root checked={selectedIds.has(item.id)} onCheckedChange={() => toggleSelect(item.id)} disabled={isProcessing} className={`w-4 h-4 rounded border-2 flex items-center justify-center ${selectedIds.has(item.id) ? 'bg-[#2D5A27] border-[#2D5A27] text-white' : 'border-gray-300'}`}><Checkbox.Indicator><Icons.check /></Checkbox.Indicator></Checkbox.Root></td>
                                                <td className="py-3 px-4"><input type="text" value={item.name} onChange={e => updateItem({ ...item, name: e.target.value })} className="w-full bg-transparent border-0 focus:ring-0 text-sm placeholder-gray-400" placeholder="Enter item name" disabled={isProcessing} /></td>
                                                <td className="py-3 px-4"><select value={item.catalogItem || ''} onChange={e => updateItem({ ...item, catalogItem: e.target.value || null })} className="w-full bg-transparent border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:ring-1 focus:ring-[#2D5A27]" disabled={isProcessing}><option value="">Select...</option>{CATALOG.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></td>
                                                <td className="py-3 px-4"><div className="flex items-center gap-1"><input type="number" value={item.quantity} onChange={e => updateItem({ ...item, quantity: Math.max(0, parseInt(e.target.value) || 0) })} className="w-16 bg-transparent border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center focus:ring-1 focus:ring-[#2D5A27]" disabled={isProcessing} />{catalog && <span className="text-xs text-gray-400">{catalog.unit}</span>}</div></td>
                                                <td className="py-3 px-4"><LocationEditorPopover tags={item.tags} onChange={tags => updateItem({ ...item, tags })}><button className="flex flex-wrap gap-1 items-center group">{item.tags.length > 0 ? item.tags.map(tag => <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>) : <span className="text-xs text-gray-400">Click to add</span>}</button></LocationEditorPopover></td>
                                                <td className="py-3 px-4 text-right"><span className="text-sm font-medium tabular-nums">{formatCurrency(getCost(item))}</span></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {items.length === 0 && <div className="py-12 text-center text-gray-500">No items yet. Click "Add Item" to start.</div>}
                        </div>
                    </div>
                </div>

                <footer className="bg-white border-t px-6 py-4">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{items.length} items · {items.reduce((s, i) => s + i.quantity, 0).toLocaleString()} total units</span>
                        <span>Built for Boon AI Design Challenge</span>
                    </div>
                </footer>
            </main>

            <AIChatButton items={items} onItemsChange={setItems} isProcessing={isProcessing} setIsProcessing={setIsProcessing} />
            <DeleteConfirmDialog isOpen={showDeleteConfirm} onOpenChange={setShowDeleteConfirm} itemCount={selectedIds.size} onConfirm={confirmDelete} />
        </div>
    );
}
