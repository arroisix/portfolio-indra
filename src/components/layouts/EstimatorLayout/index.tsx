import * as React from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Types
interface CatalogItem {
    id: string;
    name: string;
    cost: number;
    unit: string;
}

interface LineItem {
    id: string;
    name: string;
    catalogItem: string | null;
    quantity: number;
    tags: string[];
}

// Extended catalog
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

const LOCATIONS = ['Building A', 'Building B', 'Building C', 'Site Work'];

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
    { id: '11', name: 'Windows - Curtain Wall System', catalogItem: 'WIN', quantity: 156, tags: ['Building A'] },
    { id: '12', name: 'Fire Suppression - All Floors', catalogItem: 'FIR', quantity: 420, tags: ['Building A', 'Building B'] },
];

// AI Actions - only AI-powered features
const AI_ACTIONS = {
    withSelection: [
        { id: 'optimize-qty', label: 'Optimize Quantities', icon: 'chart', description: 'AI suggests optimal quantities based on industry standards' },
        { id: 'auto-tag', label: 'Auto-Tag Locations', icon: 'tag', description: 'AI assigns location tags based on item names' },
    ],
    withoutSelection: [
        { id: 'suggest-items', label: 'Suggest Missing Items', icon: 'search', description: 'AI finds commonly required items that may be missing' },
        { id: 'cost-analysis', label: 'Cost Analysis', icon: 'dollar', description: 'AI provides detailed cost breakdown and insights' },
    ]
};

// Helpers
const generateId = () => `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
const getCatalog = (id: string | null) => CATALOG.find(c => c.id === id);
const getCost = (item: LineItem) => (getCatalog(item.catalogItem)?.cost || 0) * item.quantity;
const formatCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(n);

// Icons
function Icon({ name, size = 16 }: { name: string; size?: number }) {
    const paths: Record<string, React.ReactNode> = {
        plus: <path d="M12 5v14M5 12h14" />,
        chart: <path d="M18 20V10M12 20V4M6 20v-6" />,
        tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><circle cx="7" cy="7" r="1" /></>,
        copy: <><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></>,
        trash: <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />,
        search: <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></>,
        dollar: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></>,
        sparkles: <><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /><path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z" /></>,
        chevronDown: <path d="M6 9l6 6 6-6" />,
        x: <path d="M18 6L6 18M6 6l12 12" />,
        home: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
        menu: <path d="M3 12h18M3 6h18M3 18h18" />,
        book: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></>,
        stop: <rect x="6" y="6" width="12" height="12" rx="2" />,
        check: <path d="M20 6L9 17l-5-5" />,
        message: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></>,
        edit: <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />,
    };
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {paths[name]}
        </svg>
    );
}

// Sidebar with green theme - fixed position
function Sidebar({ activeSection, onOpenChat }: { activeSection: string; onOpenChat: () => void }) {
    const menuItems = [
        { id: 'estimates', label: 'Estimates', icon: 'book' },
        { id: 'catalog', label: 'Catalog', icon: 'tag' },
    ];
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
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeSection === item.id ? 'bg-white/20 text-white font-medium' : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        <Icon name={item.icon} size={18} />
                        {item.label}
                    </button>
                ))}
                <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs font-medium text-white/50 uppercase tracking-wider px-3 mb-2">AI Assistant</p>
                    <button
                        onClick={onOpenChat}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <Icon name="message" size={18} />
                        Open Chat
                    </button>
                </div>
            </nav>
            <div className="p-3 border-t border-white/10">
                <a href="/" className="flex items-center gap-2 px-3 py-2 text-sm text-white/60 hover:text-white transition-colors">
                    <Icon name="home" size={18} />
                    Back to Portfolio
                </a>
            </div>
        </aside>
    );
}

// Catalog Popover
function CatalogPopover({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 p-4 max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Catalog Reference</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded"><Icon name="x" size={16} /></button>
                </div>
                <div className="space-y-2">
                    {CATALOG.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-8 bg-[#2D5A27]/10 text-[#2D5A27] rounded-lg flex items-center justify-center text-xs font-bold">{item.id}</span>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                    <p className="text-xs text-gray-500">per {item.unit}</p>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{formatCurrency(item.cost)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

// Delete Confirmation Dialog
function DeleteConfirmDialog({
    isOpen,
    itemCount,
    onConfirm,
    onCancel
}: {
    isOpen: boolean;
    itemCount: number;
    onConfirm: () => void;
    onCancel: () => void;
}) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
            <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Items?</h3>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete {itemCount} item{itemCount > 1 ? 's' : ''}? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

// Location Editor Popover
function LocationEditor({
    tags,
    onChange,
    onClose
}: {
    tags: string[];
    onChange: (tags: string[]) => void;
    onClose: () => void;
}) {
    const toggleLocation = (loc: string) => {
        if (tags.includes(loc)) {
            onChange(tags.filter(t => t !== loc));
        } else {
            onChange([...tags, loc]);
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2">
                {LOCATIONS.map(loc => (
                    <button
                        key={loc}
                        onClick={() => toggleLocation(loc)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                    >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            tags.includes(loc) ? 'bg-[#2D5A27] border-[#2D5A27]' : 'border-gray-300'
                        }`}>
                            {tags.includes(loc) && <Icon name="check" size={10} />}
                        </div>
                        <span className={tags.includes(loc) ? 'text-gray-900 font-medium' : 'text-gray-600'}>{loc}</span>
                    </button>
                ))}
            </div>
        </>
    );
}

// AI Chat Panel
function ChatPanel({
    isOpen,
    onClose,
    items,
    onItemsChange,
    isProcessing,
    setIsProcessing
}: {
    isOpen: boolean;
    onClose: () => void;
    items: LineItem[];
    onItemsChange: (items: LineItem[]) => void;
    isProcessing: boolean;
    setIsProcessing: (v: boolean) => void;
}) {
    const [messages, setMessages] = React.useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
    const [input, setInput] = React.useState('');
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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
                body: JSON.stringify({
                    messages: [...messages, { role: 'user', content: userMessage }],
                    lineItems: items,
                }),
            });

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.message || 'Sorry, I could not process that request.' }]);

            // Handle AI actions
            if (data.action?.action === 'add' && data.action.items) {
                const newItems = data.action.items.map((item: any) => ({
                    id: generateId(),
                    name: item.name || 'New Item',
                    catalogItem: CATALOG.find(c => c.id === item.catalogItem) ? item.catalogItem : null,
                    quantity: item.quantity || 1,
                    tags: item.tags || [],
                }));
                onItemsChange([...items, ...newItems]);
            } else if (data.action?.action === 'update' && data.action.items) {
                const updatedItems = items.map(item => {
                    const update = data.action.items.find((u: any) => u.id === item.id);
                    if (update) {
                        return {
                            ...item,
                            name: update.name ?? item.name,
                            catalogItem: update.catalogItem !== undefined ? update.catalogItem : item.catalogItem,
                            quantity: update.quantity ?? item.quantity,
                            tags: update.tags ?? item.tags,
                        };
                    }
                    return item;
                });
                onItemsChange(updatedItems);
            }
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error processing your request.' }]);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#2D5A27]">
                <div className="flex items-center gap-2">
                    <Icon name="sparkles" size={20} />
                    <h3 className="font-semibold text-white">AI Assistant</h3>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-white/10 rounded text-white">
                    <Icon name="x" size={20} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                        <Icon name="message" size={32} />
                        <p className="mt-2 text-sm">Ask me anything about your estimate.</p>
                        <p className="text-xs mt-1">I can help you add items, optimize quantities, and more.</p>
                    </div>
                )}
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                            msg.role === 'user'
                                ? 'bg-[#2D5A27] text-white'
                                : 'bg-gray-100 text-gray-900'
                        }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendMessage()}
                        placeholder="Ask about your estimate..."
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent"
                        disabled={isProcessing}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isProcessing || !input.trim()}
                        className="px-4 py-2 bg-[#2D5A27] text-white rounded-lg text-sm font-medium hover:bg-[#234620] disabled:opacity-50 transition-colors"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

// AI Actions Dropdown
function AIActionsDropdown({
    selectedCount,
    onAction,
    isProcessing
}: {
    selectedCount: number;
    onAction: (action: typeof AI_ACTIONS.withSelection[0]) => void;
    isProcessing: boolean;
}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const actions = selectedCount > 0 ? AI_ACTIONS.withSelection : AI_ACTIONS.withoutSelection;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isProcessing}
                className="flex items-center gap-2 px-4 py-2 bg-[#2D5A27] text-white rounded-lg hover:bg-[#234620] transition-colors text-sm font-medium disabled:opacity-50"
            >
                <Icon name="sparkles" size={16} />
                AI Assist
                <Icon name="chevronDown" size={14} />
            </button>
            {isOpen && !isProcessing && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 py-2">
                        {selectedCount === 0 && (
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="text-xs text-gray-500">Select items for more actions</p>
                            </div>
                        )}
                        {selectedCount > 0 && (
                            <div className="px-4 py-2 border-b border-gray-100 bg-[#2D5A27]/5">
                                <p className="text-xs font-medium text-[#2D5A27]">{selectedCount} item{selectedCount > 1 ? 's' : ''} selected</p>
                            </div>
                        )}
                        {actions.map(action => (
                            <button
                                key={action.id}
                                onClick={() => { onAction(action); setIsOpen(false); }}
                                className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                            >
                                <div className="mt-0.5 text-[#2D5A27]">
                                    <Icon name={action.icon} size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{action.label}</p>
                                    <p className="text-xs text-gray-500">{action.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
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
    const [showCatalog, setShowCatalog] = React.useState(false);
    const [showChat, setShowChat] = React.useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
    const [editingLocation, setEditingLocation] = React.useState<string | null>(null);
    const [lottieData, setLottieData] = React.useState<any>(null);

    React.useEffect(() => {
        fetch('/animations/ai-flow.json').then(r => r.json()).then(setLottieData).catch(() => {});
    }, []);

    const total = items.reduce((sum, item) => sum + getCost(item), 0);
    const selectedTotal = Array.from(selectedIds).reduce((sum, id) => {
        const item = items.find(i => i.id === id);
        return sum + (item ? getCost(item) : 0);
    }, 0);

    // Group items by location for subtotals
    const groupedByLocation = React.useMemo(() => {
        const groups: Record<string, { items: LineItem[]; total: number }> = {};
        LOCATIONS.forEach(loc => {
            const locItems = items.filter(item => item.tags.includes(loc));
            groups[loc] = {
                items: locItems,
                total: locItems.reduce((sum, item) => sum + getCost(item), 0)
            };
        });
        return groups;
    }, [items]);

    const toggleSelect = (id: string) => {
        if (isProcessing) return;
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const toggleSelectAll = () => {
        if (isProcessing) return;
        if (selectedIds.size === items.length) setSelectedIds(new Set());
        else setSelectedIds(new Set(items.map(i => i.id)));
    };

    const updateItem = (updated: LineItem) => {
        if (isProcessing) return;
        setItems(items.map(i => i.id === updated.id ? updated : i));
    };

    const handleDeleteSelected = () => {
        if (selectedIds.size > 0) {
            setShowDeleteConfirm(true);
        }
    };

    const confirmDelete = () => {
        setItems(items.filter(i => !selectedIds.has(i.id)));
        setSelectedIds(new Set());
        setShowDeleteConfirm(false);
    };

    const addItem = () => {
        if (isProcessing) return;
        setItems([...items, { id: generateId(), name: '', catalogItem: null, quantity: 1, tags: [] }]);
    };

    const duplicateSelected = () => {
        if (isProcessing || selectedIds.size === 0) return;
        const duplicates = Array.from(selectedIds).map(id => {
            const orig = items.find(i => i.id === id);
            if (!orig) return null;
            return { ...orig, id: generateId(), name: `${orig.name} (Copy)` };
        }).filter(Boolean) as LineItem[];
        setItems([...items, ...duplicates]);
        setSelectedIds(new Set());
    };

    const handleAIAction = async (action: typeof AI_ACTIONS.withSelection[0]) => {
        setIsProcessing(true);
        setProcessingMessage(action.label);

        try {
            const selectedItems = Array.from(selectedIds).map(id => items.find(i => i.id === id)).filter(Boolean) as LineItem[];
            const contextItems = selectedIds.size > 0 ? selectedItems : items;

            const promptMap: Record<string, string> = {
                'optimize-qty': `Analyze and optimize quantities for these construction items based on industry standards. Current items: ${JSON.stringify(contextItems.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, catalogItem: i.catalogItem })))}. Return updated quantities that are more realistic for a commercial office complex.`,
                'auto-tag': `Analyze these construction line items and assign appropriate location tags (Building A, Building B, Building C, Site Work) based on their names. Items: ${JSON.stringify(contextItems.map(i => ({ id: i.id, name: i.name, tags: i.tags })))}`,
                'suggest-items': `Analyze this construction estimate and suggest 3-4 commonly required items that might be missing. Current items: ${JSON.stringify(items.map(i => i.name))}. Focus on items typically needed for commercial office construction.`,
                'cost-analysis': `Provide a brief cost analysis for this construction estimate. Total: ${formatCurrency(total)}. Items by category: ${JSON.stringify(items.map(i => ({ name: i.name, cost: getCost(i), catalog: i.catalogItem })))}`,
            };

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: promptMap[action.id] || action.description }],
                    lineItems: contextItems,
                }),
            });

            if (!response.ok) throw new Error('API request failed');
            const data = await response.json();
            console.log('AI response:', data);

            if (data.action?.action === 'add' && data.action.items) {
                const newItems = data.action.items.map((item: any) => ({
                    id: generateId(),
                    name: item.name || 'New Item',
                    catalogItem: CATALOG.find(c => c.id === item.catalogItem) ? item.catalogItem : null,
                    quantity: item.quantity || 1,
                    tags: item.tags || [],
                }));
                setItems([...items, ...newItems]);
            } else if (data.action?.action === 'update' && data.action.items) {
                const updatedItems = items.map(item => {
                    const update = data.action.items.find((u: any) => u.id === item.id);
                    if (update) {
                        return {
                            ...item,
                            quantity: update.quantity ?? item.quantity,
                            tags: update.tags ?? item.tags,
                        };
                    }
                    return item;
                });
                setItems(updatedItems);
            }

            setSelectedIds(new Set());
        } catch (e) {
            console.error('AI action failed:', e);
        } finally {
            setIsProcessing(false);
            setProcessingMessage('');
        }
    };

    const stopProcessing = () => {
        setIsProcessing(false);
        setProcessingMessage('');
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <Sidebar activeSection="estimates" onOpenChat={() => setShowChat(true)} />

            <main className="ml-56 flex flex-col min-h-screen">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
                            <p className="text-sm text-gray-500">Commercial Office Complex - Phase 1</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Total Estimate</p>
                                <p className="text-2xl font-bold text-gray-900 tabular-nums">{formatCurrency(total)}</p>
                            </div>
                            {selectedIds.size > 0 && (
                                <div className="text-right pl-6 border-l border-gray-200">
                                    <p className="text-sm text-[#2D5A27]">{selectedIds.size} selected</p>
                                    <p className="text-lg font-semibold text-[#2D5A27] tabular-nums">{formatCurrency(selectedTotal)}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Toolbar */}
                <div className="bg-white border-b border-gray-200 px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Manual Actions */}
                            <button
                                onClick={addItem}
                                disabled={isProcessing}
                                className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                <Icon name="plus" size={16} />
                                Add Item
                            </button>
                            <div className="relative">
                                <button
                                    onClick={() => setShowCatalog(!showCatalog)}
                                    disabled={isProcessing}
                                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                >
                                    <Icon name="book" size={16} />
                                    Catalog
                                </button>
                                <CatalogPopover isOpen={showCatalog} onClose={() => setShowCatalog(false)} />
                            </div>

                            {/* Selection Actions */}
                            {selectedIds.size > 0 && (
                                <>
                                    <div className="w-px h-6 bg-gray-200" />
                                    <button
                                        onClick={duplicateSelected}
                                        disabled={isProcessing}
                                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                    >
                                        <Icon name="copy" size={16} />
                                        Duplicate
                                    </button>
                                    <button
                                        onClick={handleDeleteSelected}
                                        disabled={isProcessing}
                                        className="flex items-center gap-2 px-3 py-1.5 border border-red-200 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                                    >
                                        <Icon name="trash" size={16} />
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                        <AIActionsDropdown
                            selectedCount={selectedIds.size}
                            onAction={handleAIAction}
                            isProcessing={isProcessing}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 px-6 py-4 overflow-auto">
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        {/* AI Processing Banner */}
                        {isProcessing && (
                            <div className="bg-[#2D5A27] px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {lottieData ? (
                                        <div className="w-8 h-8">
                                            <Lottie animationData={lottieData} loop autoplay />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm font-medium text-white">AI is working...</p>
                                        <p className="text-xs text-white/70">{processingMessage}</p>
                                    </div>
                                </div>
                                <button onClick={stopProcessing} className="flex items-center gap-2 px-3 py-1.5 bg-white/20 text-white rounded-lg text-sm hover:bg-white/30 transition-colors">
                                    <Icon name="stop" size={14} />
                                    Stop
                                </button>
                            </div>
                        )}

                        {/* Full overlay when processing */}
                        {isProcessing && (
                            <div className="absolute inset-0 bg-white/60 z-20 cursor-not-allowed" />
                        )}

                        <div className={isProcessing ? 'relative' : ''}>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50/50">
                                        <th className="w-12 py-3 px-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.size === items.length && items.length > 0}
                                                onChange={toggleSelectAll}
                                                className="w-4 h-4 rounded border-gray-300 text-[#2D5A27] focus:ring-[#2D5A27]"
                                                disabled={isProcessing}
                                            />
                                        </th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Item Name</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-44">Catalog</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-24">Qty</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Location</th>
                                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-28">Cost</th>
                                    </tr>
                                </thead>
                                <tbody className={isProcessing ? 'opacity-50 pointer-events-none' : ''}>
                                    {items.map(item => {
                                        const catalog = getCatalog(item.catalogItem);
                                        const cost = getCost(item);
                                        return (
                                            <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${selectedIds.has(item.id) ? 'bg-[#2D5A27]/5' : ''}`}>
                                                <td className="py-3 px-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIds.has(item.id)}
                                                        onChange={() => toggleSelect(item.id)}
                                                        className="w-4 h-4 rounded border-gray-300 text-[#2D5A27] focus:ring-[#2D5A27]"
                                                        disabled={isProcessing}
                                                    />
                                                </td>
                                                <td className="py-3 px-4">
                                                    <input
                                                        type="text"
                                                        value={item.name}
                                                        onChange={e => updateItem({ ...item, name: e.target.value })}
                                                        className="w-full bg-transparent border-0 focus:ring-0 text-sm text-gray-900 placeholder-gray-400"
                                                        placeholder="Enter item name"
                                                        disabled={isProcessing}
                                                    />
                                                </td>
                                                <td className="py-3 px-4">
                                                    <select
                                                        value={item.catalogItem || ''}
                                                        onChange={e => updateItem({ ...item, catalogItem: e.target.value || null })}
                                                        className="w-full bg-transparent border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:ring-1 focus:ring-[#2D5A27] focus:border-[#2D5A27]"
                                                        disabled={isProcessing}
                                                    >
                                                        <option value="">Select...</option>
                                                        {CATALOG.map(c => (
                                                            <option key={c.id} value={c.id}>{c.name}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-1">
                                                        <input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={e => updateItem({ ...item, quantity: Math.max(0, parseInt(e.target.value) || 0) })}
                                                            className="w-16 bg-transparent border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center focus:ring-1 focus:ring-[#2D5A27] focus:border-[#2D5A27]"
                                                            disabled={isProcessing}
                                                        />
                                                        {catalog && <span className="text-xs text-gray-400">{catalog.unit}</span>}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 relative">
                                                    <button
                                                        onClick={() => setEditingLocation(editingLocation === item.id ? null : item.id)}
                                                        disabled={isProcessing}
                                                        className="flex flex-wrap gap-1 items-center group"
                                                    >
                                                        {item.tags.length > 0 ? (
                                                            item.tags.map(tag => (
                                                                <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>
                                                            ))
                                                        ) : (
                                                            <span className="text-xs text-gray-400">Click to add</span>
                                                        )}
                                                        <span className="opacity-0 group-hover:opacity-100 ml-1 text-gray-400">
                                                            <Icon name="edit" size={12} />
                                                        </span>
                                                    </button>
                                                    {editingLocation === item.id && (
                                                        <LocationEditor
                                                            tags={item.tags}
                                                            onChange={(tags) => updateItem({ ...item, tags })}
                                                            onClose={() => setEditingLocation(null)}
                                                        />
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <span className="text-sm font-medium text-gray-900 tabular-nums">{formatCurrency(cost)}</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            {items.length === 0 && (
                                <div className="py-12 text-center text-gray-500">
                                    <p>No items yet. Click "Add Item" to start.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Location Subtotals */}
                    <div className="mt-4 grid grid-cols-4 gap-4">
                        {LOCATIONS.map(loc => (
                            <div key={loc} className="bg-white rounded-lg border border-gray-200 p-4">
                                <p className="text-xs font-medium text-gray-500 uppercase">{loc}</p>
                                <p className="text-lg font-semibold text-gray-900 mt-1">{formatCurrency(groupedByLocation[loc].total)}</p>
                                <p className="text-xs text-gray-400">{groupedByLocation[loc].items.length} items</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{items.length} items · {items.reduce((s, i) => s + i.quantity, 0).toLocaleString()} total units</span>
                        <span>Built for Boon AI Design Challenge</span>
                    </div>
                </footer>
            </main>

            {/* Chat Panel */}
            <ChatPanel
                isOpen={showChat}
                onClose={() => setShowChat(false)}
                items={items}
                onItemsChange={setItems}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
            />

            {/* Delete Confirmation */}
            <DeleteConfirmDialog
                isOpen={showDeleteConfirm}
                itemCount={selectedIds.size}
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteConfirm(false)}
            />
        </div>
    );
}
