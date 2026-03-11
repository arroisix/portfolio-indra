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
    isNew?: boolean;
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

const LOCATIONS = [
    { id: 'Building A', icon: 'building', gradient: 'from-blue-50 to-white' },
    { id: 'Building B', icon: 'building', gradient: 'from-emerald-50 to-white' },
    { id: 'Building C', icon: 'building', gradient: 'from-amber-50 to-white' },
    { id: 'Site Work', icon: 'construction', gradient: 'from-slate-50 to-white' },
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
    { id: '11', name: 'Windows - Curtain Wall System', catalogItem: 'WIN', quantity: 156, tags: ['Building A'] },
    { id: '12', name: 'Fire Suppression - All Floors', catalogItem: 'FIR', quantity: 420, tags: ['Building A', 'Building B'] },
];

// AI Actions
const AI_ACTIONS = {
    withSelection: [
        { id: 'optimize-qty', label: 'Optimize Quantities', icon: 'chart', description: 'AI suggests optimal quantities' },
        { id: 'auto-tag', label: 'Auto-Tag Locations', icon: 'tag', description: 'AI assigns location tags' },
    ],
    withoutSelection: [
        { id: 'suggest-items', label: 'Suggest Missing Items', icon: 'search', description: 'AI finds missing items' },
        { id: 'cost-analysis', label: 'Cost Analysis', icon: 'dollar', description: 'AI cost breakdown' },
    ]
};

// Helpers
const generateId = () => `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
const getCatalog = (id: string | null) => CATALOG.find(c => c.id === id);
const getCost = (item: LineItem) => (getCatalog(item.catalogItem)?.cost || 0) * item.quantity;
const formatCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(n);

// Icons - Clean line icons inspired by IconaMoon
function Icon({ name, size = 20, className = '' }: { name: string; size?: number; className?: string }) {
    const icons: Record<string, React.ReactNode> = {
        plus: <path d="M12 5v14M5 12h14" />,
        chart: <><path d="M3 3v18h18" /><path d="M18 17V9M13 17V5M8 17v-3" /></>,
        tag: <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>,
        copy: <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></>,
        trash: <><path d="M3 6h18" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" /><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></>,
        search: <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></>,
        dollar: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></>,
        sparkles: <><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /><path d="M19 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" /></>,
        chevronDown: <path d="M6 9l6 6 6-6" />,
        x: <path d="M18 6L6 18M6 6l12 12" />,
        home: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><path d="M9 22V12h6v10" /></>,
        book: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></>,
        stop: <rect x="6" y="6" width="12" height="12" rx="2" />,
        check: <path d="M20 6L9 17l-5-5" />,
        message: <><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></>,
        edit: <><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></>,
        building: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" /></>,
        construction: <><path d="M2 20h20" /><path d="M5 20v-4l7-7 7 7v4" /><path d="M12 9V3l4 4" /></>,
        send: <><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></>,
    };
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            {icons[name]}
        </svg>
    );
}

// Sidebar - Fixed position, green theme
function Sidebar({ activeSection }: { activeSection: string }) {
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

// Location Card with icon and gradient
function LocationCard({ location, total, itemCount }: { location: typeof LOCATIONS[0]; total: number; itemCount: number }) {
    return (
        <div className={`bg-gradient-to-br ${location.gradient} rounded-xl border border-gray-100 p-4 shadow-sm`}>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                    <Icon name={location.icon} size={16} className="text-gray-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">{location.id}</p>
            </div>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(total)}</p>
            <p className="text-xs text-gray-500 mt-1">{itemCount} items</p>
        </div>
    );
}

// Delete Confirmation Dialog
function DeleteConfirmDialog({ isOpen, itemCount, onConfirm, onCancel }: { isOpen: boolean; itemCount: number; onConfirm: () => void; onCancel: () => void }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
            <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Items?</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete {itemCount} item{itemCount > 1 ? 's' : ''}?</p>
                <div className="flex gap-3 justify-end">
                    <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600">Delete</button>
                </div>
            </div>
        </div>
    );
}

// Location Editor
function LocationEditor({ tags, onChange, onClose }: { tags: string[]; onChange: (tags: string[]) => void; onClose: () => void }) {
    const toggleLocation = (loc: string) => {
        onChange(tags.includes(loc) ? tags.filter(t => t !== loc) : [...tags, loc]);
    };
    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2">
                {LOCATIONS.map(loc => (
                    <button key={loc.id} onClick={() => toggleLocation(loc.id)} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${tags.includes(loc.id) ? 'bg-[#2D5A27] border-[#2D5A27] text-white' : 'border-gray-300'}`}>
                            {tags.includes(loc.id) && <Icon name="check" size={10} />}
                        </div>
                        <Icon name={loc.icon} size={14} className="text-gray-400" />
                        <span className={tags.includes(loc.id) ? 'text-gray-900 font-medium' : 'text-gray-600'}>{loc.id}</span>
                    </button>
                ))}
            </div>
        </>
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

// AI Chat Panel - Now inline in content
function AIChatPanel({ items, onItemsChange, isProcessing, setIsProcessing }: { items: LineItem[]; onItemsChange: (items: LineItem[]) => void; isProcessing: boolean; setIsProcessing: (v: boolean) => void }) {
    const [messages, setMessages] = React.useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
    const [input, setInput] = React.useState('');
    const [isExpanded, setIsExpanded] = React.useState(false);
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
                body: JSON.stringify({ messages: [...messages, { role: 'user', content: userMessage }], lineItems: items }),
            });
            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.message || 'Sorry, I could not process that.' }]);

            if (data.action?.action === 'add' && data.action.items) {
                const newItems = data.action.items.map((item: any) => ({
                    id: generateId(),
                    name: item.name || 'New Item',
                    catalogItem: CATALOG.find(c => c.id === item.catalogItem) ? item.catalogItem : null,
                    quantity: item.quantity || 1,
                    tags: item.tags || [],
                    isNew: true,
                }));
                onItemsChange([...newItems, ...items]);
            } else if (data.action?.action === 'update' && data.action.items) {
                onItemsChange(items.map(item => {
                    const update = data.action.items.find((u: any) => u.id === item.id);
                    return update ? { ...item, quantity: update.quantity ?? item.quantity, tags: update.tags ?? item.tags } : item;
                }));
            }
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error.' }]);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-[#2D5A27]/5 to-transparent hover:from-[#2D5A27]/10 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#2D5A27] flex items-center justify-center">
                        <Icon name="sparkles" size={16} className="text-white" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">AI Assistant</p>
                        <p className="text-xs text-gray-500">Ask anything about your estimate</p>
                    </div>
                </div>
                <Icon name="chevronDown" size={20} className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            {isExpanded && (
                <div className="border-t border-gray-100">
                    <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-400 py-8">
                                <Icon name="message" size={32} className="mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Start a conversation</p>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${msg.role === 'user' ? 'bg-[#2D5A27] text-white' : 'bg-white border border-gray-200 text-gray-900'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-3 border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent"
                            disabled={isProcessing}
                        />
                        <button onClick={sendMessage} disabled={isProcessing || !input.trim()} className="px-3 py-2 bg-[#2D5A27] text-white rounded-lg disabled:opacity-50">
                            <Icon name="send" size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// AI Actions Dropdown
function AIActionsDropdown({ selectedCount, onAction, isProcessing }: { selectedCount: number; onAction: (action: typeof AI_ACTIONS.withSelection[0]) => void; isProcessing: boolean }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const actions = selectedCount > 0 ? AI_ACTIONS.withSelection : AI_ACTIONS.withoutSelection;

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} disabled={isProcessing} className="flex items-center gap-2 px-4 py-2 bg-[#2D5A27] text-white rounded-lg hover:bg-[#234620] text-sm font-medium disabled:opacity-50">
                <Icon name="sparkles" size={16} />
                AI Assist
                <Icon name="chevronDown" size={14} />
            </button>
            {isOpen && !isProcessing && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50 py-2">
                        {selectedCount > 0 && (
                            <div className="px-4 py-2 border-b border-gray-100 bg-[#2D5A27]/5">
                                <p className="text-xs font-medium text-[#2D5A27]">{selectedCount} item{selectedCount > 1 ? 's' : ''} selected</p>
                            </div>
                        )}
                        {actions.map(action => (
                            <button key={action.id} onClick={() => { onAction(action); setIsOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50">
                                <Icon name={action.icon} size={16} className="text-[#2D5A27]" />
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
    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
    const [editingLocation, setEditingLocation] = React.useState<string | null>(null);
    const [lottieData, setLottieData] = React.useState<any>(null);

    React.useEffect(() => {
        fetch('/animations/ai-flow.json').then(r => r.json()).then(setLottieData).catch(() => {});
    }, []);

    // Clear isNew flag after 3 seconds
    React.useEffect(() => {
        const newItems = items.filter(i => i.isNew);
        if (newItems.length > 0) {
            const timer = setTimeout(() => {
                setItems(items.map(i => ({ ...i, isNew: false })));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [items]);

    const total = items.reduce((sum, item) => sum + getCost(item), 0);
    const selectedTotal = Array.from(selectedIds).reduce((sum, id) => {
        const item = items.find(i => i.id === id);
        return sum + (item ? getCost(item) : 0);
    }, 0);

    const groupedByLocation = React.useMemo(() => {
        return LOCATIONS.map(loc => ({
            ...loc,
            items: items.filter(item => item.tags.includes(loc.id)),
            total: items.filter(item => item.tags.includes(loc.id)).reduce((sum, item) => sum + getCost(item), 0)
        }));
    }, [items]);

    const toggleSelect = (id: string) => {
        if (isProcessing) return;
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
        setSelectedIds(newSet);
    };

    const toggleSelectAll = () => {
        if (isProcessing) return;
        setSelectedIds(selectedIds.size === items.length ? new Set() : new Set(items.map(i => i.id)));
    };

    const updateItem = (updated: LineItem) => {
        if (isProcessing) return;
        setItems(items.map(i => i.id === updated.id ? updated : i));
    };

    const addItem = () => {
        if (isProcessing) return;
        const newItem = { id: generateId(), name: '', catalogItem: null, quantity: 1, tags: [], isNew: true };
        setItems([newItem, ...items]); // Add at top
    };

    const handleDeleteSelected = () => {
        if (selectedIds.size > 0) setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        setItems(items.filter(i => !selectedIds.has(i.id)));
        setSelectedIds(new Set());
        setShowDeleteConfirm(false);
    };

    const duplicateSelected = () => {
        if (isProcessing || selectedIds.size === 0) return;
        const duplicates = Array.from(selectedIds).map(id => {
            const orig = items.find(i => i.id === id);
            return orig ? { ...orig, id: generateId(), name: `${orig.name} (Copy)`, isNew: true } : null;
        }).filter(Boolean) as LineItem[];
        setItems([...duplicates, ...items]); // Add at top
        setSelectedIds(new Set());
    };

    const handleAIAction = async (action: typeof AI_ACTIONS.withSelection[0]) => {
        setIsProcessing(true);
        setProcessingMessage(action.label);

        try {
            const selectedItems = Array.from(selectedIds).map(id => items.find(i => i.id === id)).filter(Boolean) as LineItem[];
            const contextItems = selectedIds.size > 0 ? selectedItems : items;

            const promptMap: Record<string, string> = {
                'optimize-qty': `Analyze and optimize quantities for these construction items. Items: ${JSON.stringify(contextItems.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, catalogItem: i.catalogItem })))}. Return updated quantities.`,
                'auto-tag': `Assign location tags (Building A, Building B, Building C, Site Work) to these items based on their names. Items: ${JSON.stringify(contextItems.map(i => ({ id: i.id, name: i.name, tags: i.tags })))}`,
                'suggest-items': `Suggest 3-4 missing items for this commercial construction estimate. Current items: ${JSON.stringify(items.map(i => i.name))}.`,
                'cost-analysis': `Provide cost analysis for this estimate. Total: ${formatCurrency(total)}. Items: ${JSON.stringify(items.map(i => ({ name: i.name, cost: getCost(i) })))}`,
            };

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [{ role: 'user', content: promptMap[action.id] || action.description }], lineItems: contextItems }),
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
                    isNew: true,
                }));
                setItems([...newItems, ...items]); // Add at top
            } else if (data.action?.action === 'update' && data.action.items) {
                setItems(items.map(item => {
                    const update = data.action.items.find((u: any) => u.id === item.id);
                    return update ? { ...item, quantity: update.quantity ?? item.quantity, tags: update.tags ?? item.tags } : item;
                }));
            }
            setSelectedIds(new Set());
        } catch (e) {
            console.error('AI action failed:', e);
        } finally {
            setIsProcessing(false);
            setProcessingMessage('');
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <Sidebar activeSection="estimates" />

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

                {/* Content */}
                <div className="flex-1 px-6 py-6 overflow-auto">
                    {/* Location Cards - At Top */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {groupedByLocation.map(loc => (
                            <LocationCard key={loc.id} location={loc} total={loc.total} itemCount={loc.items.length} />
                        ))}
                    </div>

                    {/* AI Chat Panel - In Content */}
                    <div className="mb-6">
                        <AIChatPanel items={items} onItemsChange={setItems} isProcessing={isProcessing} setIsProcessing={setIsProcessing} />
                    </div>

                    {/* Toolbar */}
                    <div className="bg-white rounded-t-xl border border-b-0 border-gray-200 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button onClick={addItem} disabled={isProcessing} className="flex items-center gap-2 px-3 py-1.5 bg-[#2D5A27]/10 border border-[#2D5A27]/20 rounded-lg text-sm text-[#2D5A27] font-medium hover:bg-[#2D5A27]/20 disabled:opacity-50">
                                <Icon name="plus" size={16} />
                                Add Item
                            </button>
                            <div className="relative">
                                <button onClick={() => setShowCatalog(!showCatalog)} disabled={isProcessing} className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                                    <Icon name="book" size={16} />
                                    Catalog
                                </button>
                                <CatalogPopover isOpen={showCatalog} onClose={() => setShowCatalog(false)} />
                            </div>
                            {selectedIds.size > 0 && (
                                <>
                                    <div className="w-px h-6 bg-gray-200" />
                                    <button onClick={duplicateSelected} disabled={isProcessing} className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                                        <Icon name="copy" size={16} />
                                        Duplicate
                                    </button>
                                    <button onClick={handleDeleteSelected} disabled={isProcessing} className="flex items-center gap-2 px-3 py-1.5 border border-red-200 rounded-lg text-sm text-red-600 hover:bg-red-50 disabled:opacity-50">
                                        <Icon name="trash" size={16} />
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                        <AIActionsDropdown selectedCount={selectedIds.size} onAction={handleAIAction} isProcessing={isProcessing} />
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-b-xl border border-gray-200 overflow-hidden">
                        {/* AI Processing Banner */}
                        {isProcessing && (
                            <div className="bg-[#2D5A27] px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {lottieData ? (
                                        <div className="w-8 h-8"><Lottie animationData={lottieData} loop autoplay /></div>
                                    ) : (
                                        <div className="w-8 h-8 flex items-center justify-center"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /></div>
                                    )}
                                    <div>
                                        <p className="text-sm font-medium text-white">AI is working...</p>
                                        <p className="text-xs text-white/70">{processingMessage}</p>
                                    </div>
                                </div>
                                <button onClick={() => { setIsProcessing(false); setProcessingMessage(''); }} className="flex items-center gap-2 px-3 py-1.5 bg-white/20 text-white rounded-lg text-sm hover:bg-white/30">
                                    <Icon name="stop" size={14} />
                                    Stop
                                </button>
                            </div>
                        )}

                        <div className={isProcessing ? 'opacity-50 pointer-events-none' : ''}>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50/50">
                                        <th className="w-12 py-3 px-4">
                                            <input type="checkbox" checked={selectedIds.size === items.length && items.length > 0} onChange={toggleSelectAll} className="w-4 h-4 rounded border-gray-300 text-[#2D5A27] focus:ring-[#2D5A27]" disabled={isProcessing} />
                                        </th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Item Name</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-44">Catalog</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-24">Qty</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Location</th>
                                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-28">Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => {
                                        const catalog = getCatalog(item.catalogItem);
                                        const cost = getCost(item);
                                        return (
                                            <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${selectedIds.has(item.id) ? 'bg-[#2D5A27]/5' : ''} ${item.isNew ? 'bg-[#2D5A27]/10 animate-pulse' : ''}`}>
                                                <td className="py-3 px-4">
                                                    <input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} className="w-4 h-4 rounded border-gray-300 text-[#2D5A27] focus:ring-[#2D5A27]" disabled={isProcessing} />
                                                </td>
                                                <td className="py-3 px-4">
                                                    <input type="text" value={item.name} onChange={e => updateItem({ ...item, name: e.target.value })} className="w-full bg-transparent border-0 focus:ring-0 text-sm text-gray-900 placeholder-gray-400" placeholder="Enter item name" disabled={isProcessing} />
                                                </td>
                                                <td className="py-3 px-4">
                                                    <select value={item.catalogItem || ''} onChange={e => updateItem({ ...item, catalogItem: e.target.value || null })} className="w-full bg-transparent border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:ring-1 focus:ring-[#2D5A27] focus:border-[#2D5A27]" disabled={isProcessing}>
                                                        <option value="">Select...</option>
                                                        {CATALOG.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                    </select>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-1">
                                                        <input type="number" value={item.quantity} onChange={e => updateItem({ ...item, quantity: Math.max(0, parseInt(e.target.value) || 0) })} className="w-16 bg-transparent border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center focus:ring-1 focus:ring-[#2D5A27] focus:border-[#2D5A27]" disabled={isProcessing} />
                                                        {catalog && <span className="text-xs text-gray-400">{catalog.unit}</span>}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 relative">
                                                    <button onClick={() => setEditingLocation(editingLocation === item.id ? null : item.id)} disabled={isProcessing} className="flex flex-wrap gap-1 items-center group">
                                                        {item.tags.length > 0 ? item.tags.map(tag => <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>) : <span className="text-xs text-gray-400">Click to add</span>}
                                                        <span className="opacity-0 group-hover:opacity-100 ml-1 text-gray-400"><Icon name="edit" size={12} /></span>
                                                    </button>
                                                    {editingLocation === item.id && <LocationEditor tags={item.tags} onChange={tags => updateItem({ ...item, tags })} onClose={() => setEditingLocation(null)} />}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <span className="text-sm font-medium text-gray-900 tabular-nums">{formatCurrency(cost)}</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {items.length === 0 && <div className="py-12 text-center text-gray-500"><p>No items yet. Click "Add Item" to start.</p></div>}
                        </div>
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

            <DeleteConfirmDialog isOpen={showDeleteConfirm} itemCount={selectedIds.size} onConfirm={confirmDelete} onCancel={() => setShowDeleteConfirm(false)} />
        </div>
    );
}
