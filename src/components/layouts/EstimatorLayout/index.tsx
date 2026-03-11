'use client';
import * as React from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Popover } from '@base-ui/react/popover';
import { Checkbox } from '@base-ui/react/checkbox';
import { Menu } from '@base-ui/react/menu';
import { NumberField } from '@base-ui/react/number-field';
import { Select } from '@base-ui/react/select';
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
    { id: 'Building A', gradient: 'from-blue-50 to-white', color: 'bg-blue-100' },
    { id: 'Building B', gradient: 'from-emerald-50 to-white', color: 'bg-emerald-100' },
    { id: 'Building C', gradient: 'from-amber-50 to-white', color: 'bg-amber-100' },
    { id: 'Site Work', gradient: 'from-slate-50 to-white', color: 'bg-slate-100' },
];

const INITIAL_ITEMS: LineItem[] = [
    // Building A - Foundation & Structure (1-15)
    { id: '1', name: 'Foundation - Main Structure', catalogItem: 'CON', quantity: 450, tags: ['Building A'] },
    { id: '2', name: 'Foundation - Elevator Pit', catalogItem: 'CON', quantity: 85, tags: ['Building A'] },
    { id: '3', name: 'Foundation - Loading Dock', catalogItem: 'CON', quantity: 120, tags: ['Building A'] },
    { id: '4', name: 'Structural Steel - Floors 1-5', catalogItem: 'STL', quantity: 125, tags: ['Building A'] },
    { id: '5', name: 'Structural Steel - Floors 6-10', catalogItem: 'STL', quantity: 118, tags: ['Building A'] },
    { id: '6', name: 'Structural Steel - Roof Framing', catalogItem: 'STL', quantity: 45, tags: ['Building A'] },
    { id: '7', name: 'Structural Steel - Canopy', catalogItem: 'STL', quantity: 12, tags: ['Building A'] },
    { id: '8', name: 'Concrete - Floor Slabs Level 1', catalogItem: 'CON', quantity: 280, tags: ['Building A'] },
    { id: '9', name: 'Concrete - Floor Slabs Level 2-5', catalogItem: 'CON', quantity: 1120, tags: ['Building A'] },
    { id: '10', name: 'Concrete - Floor Slabs Level 6-10', catalogItem: 'CON', quantity: 1400, tags: ['Building A'] },
    { id: '11', name: 'Concrete - Stairwells', catalogItem: 'CON', quantity: 95, tags: ['Building A'] },
    { id: '12', name: 'Roofing - Main Building', catalogItem: 'ROF', quantity: 85, tags: ['Building A'] },
    { id: '13', name: 'Roofing - Mechanical Penthouse', catalogItem: 'ROF', quantity: 22, tags: ['Building A'] },
    { id: '14', name: 'Exterior Cladding - North Facade', catalogItem: 'CLD', quantity: 4500, tags: ['Building A'] },
    { id: '15', name: 'Exterior Cladding - South Facade', catalogItem: 'CLD', quantity: 4200, tags: ['Building A'] },
    // Building A - MEP (16-35)
    { id: '16', name: 'Electrical - Core Distribution', catalogItem: 'ELE', quantity: 320, tags: ['Building A'] },
    { id: '17', name: 'Electrical - Office Floors 1-5', catalogItem: 'ELE', quantity: 580, tags: ['Building A'] },
    { id: '18', name: 'Electrical - Office Floors 6-10', catalogItem: 'ELE', quantity: 620, tags: ['Building A'] },
    { id: '19', name: 'Electrical - Emergency Systems', catalogItem: 'ELE', quantity: 85, tags: ['Building A'] },
    { id: '20', name: 'Electrical - Parking Garage', catalogItem: 'ELE', quantity: 145, tags: ['Building A'] },
    { id: '21', name: 'Plumbing - Restroom Cores Level 1-5', catalogItem: 'PLM', quantity: 96, tags: ['Building A'] },
    { id: '22', name: 'Plumbing - Restroom Cores Level 6-10', catalogItem: 'PLM', quantity: 96, tags: ['Building A'] },
    { id: '23', name: 'Plumbing - Kitchen/Break Rooms', catalogItem: 'PLM', quantity: 48, tags: ['Building A'] },
    { id: '24', name: 'Plumbing - Fire Suppression Risers', catalogItem: 'PLM', quantity: 24, tags: ['Building A'] },
    { id: '25', name: 'HVAC - Main Distribution', catalogItem: 'HVC', quantity: 2400, tags: ['Building A'] },
    { id: '26', name: 'HVAC - Floor 1-5 Ductwork', catalogItem: 'HVC', quantity: 3200, tags: ['Building A'] },
    { id: '27', name: 'HVAC - Floor 6-10 Ductwork', catalogItem: 'HVC', quantity: 3400, tags: ['Building A'] },
    { id: '28', name: 'HVAC - Rooftop Units', catalogItem: 'HVC', quantity: 850, tags: ['Building A'] },
    { id: '29', name: 'Fire Suppression - Floors 1-5', catalogItem: 'FIR', quantity: 185, tags: ['Building A'] },
    { id: '30', name: 'Fire Suppression - Floors 6-10', catalogItem: 'FIR', quantity: 195, tags: ['Building A'] },
    { id: '31', name: 'Fire Suppression - Parking', catalogItem: 'FIR', quantity: 78, tags: ['Building A'] },
    // Building A - Interiors (32-45)
    { id: '32', name: 'Drywall - Interior Partitions Level 1', catalogItem: 'DRY', quantity: 3200, tags: ['Building A'] },
    { id: '33', name: 'Drywall - Interior Partitions Level 2-5', catalogItem: 'DRY', quantity: 12800, tags: ['Building A'] },
    { id: '34', name: 'Drywall - Interior Partitions Level 6-10', catalogItem: 'DRY', quantity: 16000, tags: ['Building A'] },
    { id: '35', name: 'Drywall - Ceiling Systems Level 1-5', catalogItem: 'DRY', quantity: 8500, tags: ['Building A'] },
    { id: '36', name: 'Drywall - Ceiling Systems Level 6-10', catalogItem: 'DRY', quantity: 10200, tags: ['Building A'] },
    { id: '37', name: 'Window Units - North Facade', catalogItem: 'WIN', quantity: 120, tags: ['Building A'] },
    { id: '38', name: 'Window Units - South Facade', catalogItem: 'WIN', quantity: 115, tags: ['Building A'] },
    { id: '39', name: 'Window Units - East/West Facades', catalogItem: 'WIN', quantity: 85, tags: ['Building A'] },
    { id: '40', name: 'Window Units - Lobby Curtain Wall', catalogItem: 'WIN', quantity: 45, tags: ['Building A'] },
    // Building B - Foundation & Structure (41-55)
    { id: '41', name: 'Foundation - Annex Wing', catalogItem: 'CON', quantity: 180, tags: ['Building B'] },
    { id: '42', name: 'Foundation - Conference Center', catalogItem: 'CON', quantity: 95, tags: ['Building B'] },
    { id: '43', name: 'Foundation - Cafeteria', catalogItem: 'CON', quantity: 110, tags: ['Building B'] },
    { id: '44', name: 'Structural Steel - Annex Floors 1-3', catalogItem: 'STL', quantity: 48, tags: ['Building B'] },
    { id: '45', name: 'Structural Steel - Conference Center', catalogItem: 'STL', quantity: 28, tags: ['Building B'] },
    { id: '46', name: 'Structural Steel - Skybridge', catalogItem: 'STL', quantity: 15, tags: ['Building B'] },
    { id: '47', name: 'Concrete - Floor Slabs All Levels', catalogItem: 'CON', quantity: 520, tags: ['Building B'] },
    { id: '48', name: 'Roofing - Annex Building', catalogItem: 'ROF', quantity: 42, tags: ['Building B'] },
    { id: '49', name: 'Roofing - Conference Center', catalogItem: 'ROF', quantity: 35, tags: ['Building B'] },
    { id: '50', name: 'Exterior Cladding - Annex All Sides', catalogItem: 'CLD', quantity: 2800, tags: ['Building B'] },
    // Building B - MEP (51-65)
    { id: '51', name: 'Electrical - Annex Distribution', catalogItem: 'ELE', quantity: 180, tags: ['Building B'] },
    { id: '52', name: 'Electrical - Conference Center', catalogItem: 'ELE', quantity: 95, tags: ['Building B'] },
    { id: '53', name: 'Electrical - Cafeteria Kitchen', catalogItem: 'ELE', quantity: 65, tags: ['Building B'] },
    { id: '54', name: 'Plumbing - Annex Restrooms', catalogItem: 'PLM', quantity: 48, tags: ['Building B'] },
    { id: '55', name: 'Plumbing - Cafeteria', catalogItem: 'PLM', quantity: 36, tags: ['Building B'] },
    { id: '56', name: 'HVAC - Annex Distribution', catalogItem: 'HVC', quantity: 1400, tags: ['Building B'] },
    { id: '57', name: 'HVAC - Conference Center', catalogItem: 'HVC', quantity: 650, tags: ['Building B'] },
    { id: '58', name: 'HVAC - Cafeteria Kitchen Hood', catalogItem: 'HVC', quantity: 180, tags: ['Building B'] },
    { id: '59', name: 'Fire Suppression - Annex All Floors', catalogItem: 'FIR', quantity: 95, tags: ['Building B'] },
    { id: '60', name: 'Fire Suppression - Cafeteria', catalogItem: 'FIR', quantity: 45, tags: ['Building B'] },
    // Building B - Interiors (61-70)
    { id: '61', name: 'Drywall - Annex Partitions', catalogItem: 'DRY', quantity: 5400, tags: ['Building B'] },
    { id: '62', name: 'Drywall - Conference Center', catalogItem: 'DRY', quantity: 2800, tags: ['Building B'] },
    { id: '63', name: 'Drywall - Cafeteria', catalogItem: 'DRY', quantity: 1800, tags: ['Building B'] },
    { id: '64', name: 'Window Units - Annex', catalogItem: 'WIN', quantity: 65, tags: ['Building B'] },
    { id: '65', name: 'Window Units - Conference Center', catalogItem: 'WIN', quantity: 28, tags: ['Building B'] },
    // Building C - Foundation & Structure (66-75)
    { id: '66', name: 'Foundation - Parking Structure', catalogItem: 'CON', quantity: 680, tags: ['Building C'] },
    { id: '67', name: 'Foundation - Utility Building', catalogItem: 'CON', quantity: 45, tags: ['Building C'] },
    { id: '68', name: 'Structural Steel - Parking Levels 1-3', catalogItem: 'STL', quantity: 95, tags: ['Building C'] },
    { id: '69', name: 'Structural Steel - Parking Levels 4-5', catalogItem: 'STL', quantity: 68, tags: ['Building C'] },
    { id: '70', name: 'Concrete - Parking Deck All Levels', catalogItem: 'CON', quantity: 2400, tags: ['Building C'] },
    { id: '71', name: 'Concrete - Ramps', catalogItem: 'CON', quantity: 180, tags: ['Building C'] },
    { id: '72', name: 'Roofing - Parking Top Level', catalogItem: 'ROF', quantity: 55, tags: ['Building C'] },
    { id: '73', name: 'Exterior Cladding - Parking Facades', catalogItem: 'CLD', quantity: 3200, tags: ['Building C'] },
    // Building C - MEP (74-80)
    { id: '74', name: 'Electrical - Parking Lighting', catalogItem: 'ELE', quantity: 420, tags: ['Building C'] },
    { id: '75', name: 'Electrical - EV Charging Stations', catalogItem: 'ELE', quantity: 85, tags: ['Building C'] },
    { id: '76', name: 'Electrical - Security Systems', catalogItem: 'ELE', quantity: 65, tags: ['Building C'] },
    { id: '77', name: 'Plumbing - Parking Drainage', catalogItem: 'PLM', quantity: 120, tags: ['Building C'] },
    { id: '78', name: 'HVAC - Parking Ventilation', catalogItem: 'HVC', quantity: 1800, tags: ['Building C'] },
    { id: '79', name: 'Fire Suppression - Parking All Levels', catalogItem: 'FIR', quantity: 245, tags: ['Building C'] },
    { id: '80', name: 'Fire Suppression - Utility Building', catalogItem: 'FIR', quantity: 18, tags: ['Building C'] },
    // Site Work (81-100)
    { id: '81', name: 'Site Concrete - Main Entry Drive', catalogItem: 'CON', quantity: 320, tags: ['Site Work'] },
    { id: '82', name: 'Site Concrete - Pedestrian Plaza', catalogItem: 'CON', quantity: 450, tags: ['Site Work'] },
    { id: '83', name: 'Site Concrete - Loading Area', catalogItem: 'CON', quantity: 180, tags: ['Site Work'] },
    { id: '84', name: 'Site Concrete - Sidewalks', catalogItem: 'CON', quantity: 520, tags: ['Site Work'] },
    { id: '85', name: 'Site Electrical - Parking Lot Lighting', catalogItem: 'ELE', quantity: 145, tags: ['Site Work'] },
    { id: '86', name: 'Site Electrical - Landscape Lighting', catalogItem: 'ELE', quantity: 95, tags: ['Site Work'] },
    { id: '87', name: 'Site Electrical - Monument Sign', catalogItem: 'ELE', quantity: 12, tags: ['Site Work'] },
    { id: '88', name: 'Site Plumbing - Storm Drainage', catalogItem: 'PLM', quantity: 180, tags: ['Site Work'] },
    { id: '89', name: 'Site Plumbing - Irrigation System', catalogItem: 'PLM', quantity: 95, tags: ['Site Work'] },
    { id: '90', name: 'Site Plumbing - Water Main Connection', catalogItem: 'PLM', quantity: 24, tags: ['Site Work'] },
    { id: '91', name: 'Site Plumbing - Sanitary Connection', catalogItem: 'PLM', quantity: 18, tags: ['Site Work'] },
    // Shared/Multi-building items (92-100)
    { id: '92', name: 'Electrical - Main Switchgear', catalogItem: 'ELE', quantity: 48, tags: ['Building A', 'Building B'] },
    { id: '93', name: 'Electrical - Emergency Generator', catalogItem: 'ELE', quantity: 24, tags: ['Building A', 'Building B', 'Building C'] },
    { id: '94', name: 'HVAC - Central Plant Piping', catalogItem: 'HVC', quantity: 2200, tags: ['Building A', 'Building B'] },
    { id: '95', name: 'Fire Suppression - Fire Pump', catalogItem: 'FIR', quantity: 35, tags: ['Building A', 'Building B', 'Building C'] },
    { id: '96', name: 'Drywall - Skybridge Interior', catalogItem: 'DRY', quantity: 680, tags: ['Building A', 'Building B'] },
    { id: '97', name: 'Window Units - Skybridge', catalogItem: 'WIN', quantity: 24, tags: ['Building A', 'Building B'] },
    { id: '98', name: 'Exterior Cladding - Entry Canopy', catalogItem: 'CLD', quantity: 450, tags: ['Building A', 'Site Work'] },
    { id: '99', name: 'Concrete - Utility Tunnels', catalogItem: 'CON', quantity: 280, tags: ['Building A', 'Building B', 'Building C'] },
    { id: '100', name: 'Fire Suppression - Site Hydrants', catalogItem: 'FIR', quantity: 28, tags: ['Site Work'] },
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

// Icons with animations
const Icons = {
    plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>,
    minus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/></svg>,
    trash: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
    copy: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
    chat: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
    sparkles: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/></svg>,
    building: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01"/></svg>,
    home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>,
    book: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
    chevronDown: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>,
    chevronUpDown: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg>,
    x: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>,
    send: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2" fill="none"/></svg>,
    check: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>,
    stop: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>,
};

// CSS for animations (inline styles for simplicity)
const styles = {
    buttonHover: "transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]",
    checkboxAnim: "transition-all duration-200 ease-out",
    fadeIn: "animate-[fadeIn_0.3s_ease-out]",
    slideIn: "animate-[slideIn_0.2s_ease-out]",
    pulse: "animate-pulse",
    shimmer: "animate-[shimmer_2s_infinite]",
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
                    <button key={item.id} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${activeSection === item.id ? 'bg-white/20 text-white font-medium' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                        <item.Icon />
                        {item.label}
                    </button>
                ))}
            </nav>
            <div className="p-3 border-t border-white/10">
                <a href="/" className="flex items-center gap-2 px-3 py-2 text-sm text-white/60 hover:text-white transition-colors"><Icons.home /> Back to Portfolio</a>
            </div>
        </aside>
    );
}

// Location Card with improved styling
function LocationCard({ location, total, itemCount }: { location: typeof LOCATIONS[0]; total: number; itemCount: number }) {
    return (
        <div className={`bg-gradient-to-br ${location.gradient} rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}>
            <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${location.color} flex items-center justify-center text-gray-600`}><Icons.building /></div>
                <p className="text-sm font-semibold text-gray-800">{location.id}</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">{formatCurrency(total)}</p>
            <p className="text-xs text-gray-500 mt-1">{itemCount} items</p>
        </div>
    );
}

// AI Chat Dialog - Floating button
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
            <Dialog.Trigger className={`fixed bottom-6 right-6 w-14 h-14 bg-[#2D5A27] text-white rounded-full shadow-lg hover:bg-[#234620] flex items-center justify-center z-50 ${styles.buttonHover}`}>
                <Icons.chat />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 animate-[fadeIn_0.2s_ease-out]" />
                <Dialog.Popup className="fixed bottom-24 right-6 w-[400px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col max-h-[520px] overflow-hidden animate-[slideUp_0.3s_ease-out]">
                    <div className="px-5 py-4 bg-gradient-to-r from-[#4A7C43] to-[#2D5A27] flex items-center justify-between">
                        <div className="flex items-center gap-3 text-white">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"><Icons.sparkles /></div>
                            <div>
                                <span className="font-semibold block">AI Assistant</span>
                                <span className="text-xs text-white/70">Powered by Groq</span>
                            </div>
                        </div>
                        <Dialog.Close className="text-white/70 hover:text-white transition-colors p-1"><Icons.x /></Dialog.Close>
                    </div>
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50 min-h-[320px]">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-400 py-12">
                                <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-xl flex items-center justify-center"><Icons.chat /></div>
                                <p className="text-sm font-medium">Ask me anything about your estimate</p>
                                <p className="text-xs mt-1">I can help optimize quantities, suggest items, and more</p>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.3s_ease-out]`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user' ? 'bg-[#2D5A27] text-white rounded-br-md' : 'bg-white border shadow-sm text-gray-900 rounded-bl-md'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 border-t bg-white flex gap-3">
                        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20 focus:border-[#2D5A27] transition-all" disabled={isProcessing} />
                        <button onClick={sendMessage} disabled={isProcessing || !input.trim()} className={`px-4 py-2.5 bg-[#2D5A27] text-white rounded-xl disabled:opacity-50 ${styles.buttonHover}`}><Icons.send /></button>
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
                <Dialog.Backdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-[fadeIn_0.2s_ease-out]" />
                <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full z-50 animate-[scaleIn_0.2s_ease-out]">
                    <Dialog.Title className="text-lg font-semibold text-gray-900 mb-2">Delete Items?</Dialog.Title>
                    <Dialog.Description className="text-gray-600 mb-6">Are you sure you want to delete {itemCount} item{itemCount > 1 ? 's' : ''}? This action cannot be undone.</Dialog.Description>
                    <div className="flex gap-3 justify-end">
                        <Dialog.Close className={`px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 ${styles.buttonHover}`}>Cancel</Dialog.Close>
                        <button onClick={() => { onConfirm(); onOpenChange(false); }} className={`px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 ${styles.buttonHover}`}>Delete</button>
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
                <Popover.Positioner sideOffset={8} className="z-50">
                    <Popover.Popup className="bg-white rounded-xl shadow-xl border py-2 w-52 animate-[slideIn_0.15s_ease-out]">
                        <p className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Assign Locations</p>
                        {LOCATIONS.map(loc => (
                            <button key={loc.id} onClick={() => toggleLocation(loc.id)} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${styles.buttonHover}`}>
                                <Checkbox.Root checked={tags.includes(loc.id)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${tags.includes(loc.id) ? 'bg-[#2D5A27] border-[#2D5A27] text-white scale-105' : 'border-gray-300 hover:border-gray-400'}`}>
                                    <Checkbox.Indicator className="animate-[scaleIn_0.15s_ease-out]"><Icons.check /></Checkbox.Indicator>
                                </Checkbox.Root>
                                <span className={`transition-colors ${tags.includes(loc.id) ? 'font-medium text-gray-900' : 'text-gray-600'}`}>{loc.id}</span>
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
            <Menu.Trigger disabled={isProcessing} className={`flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#4A7C43] to-[#2D5A27] text-white rounded-xl text-sm font-medium disabled:opacity-50 shadow-sm ${styles.buttonHover}`}>
                <Icons.sparkles /> AI Assist <Icons.chevronDown />
            </Menu.Trigger>
            <Menu.Portal>
                <Menu.Positioner sideOffset={8} className="z-50">
                    <Menu.Popup className="bg-white rounded-xl shadow-xl border py-2 w-72 animate-[slideIn_0.15s_ease-out]">
                        {selectedCount > 0 && <div className="px-4 py-2.5 border-b bg-[#2D5A27]/5 text-xs font-medium text-[#2D5A27]">{selectedCount} item{selectedCount > 1 ? 's' : ''} selected</div>}
                        {actions.map(action => (
                            <Menu.Item key={action.id} onClick={() => onAction(action)} className={`w-full flex flex-col px-4 py-3 text-left hover:bg-gray-50 cursor-pointer transition-colors ${styles.buttonHover}`}>
                                <span className="text-sm font-medium text-gray-900">{action.label}</span>
                                <span className="text-xs text-gray-500 mt-0.5">{action.desc}</span>
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
            <Popover.Trigger className={`flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all ${styles.buttonHover}`}>
                <Icons.book /> Catalog
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Positioner sideOffset={8} className="z-50">
                    <Popover.Popup className="bg-white rounded-xl shadow-xl border p-5 w-[340px] max-h-[420px] overflow-y-auto animate-[slideIn_0.15s_ease-out]">
                        <h3 className="font-semibold text-gray-900 mb-4">Catalog Reference</h3>
                        <div className="space-y-2">
                            {CATALOG.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 bg-[#2D5A27]/10 text-[#2D5A27] rounded-xl flex items-center justify-center text-xs font-bold">{item.id}</span>
                                        <div><p className="text-sm font-medium text-gray-900">{item.name}</p><p className="text-xs text-gray-500">per {item.unit}</p></div>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(item.cost)}</span>
                                </div>
                            ))}
                        </div>
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>
    );
}

// Quantity Field with NumberField from Base UI
function QuantityField({ value, onChange, unit, disabled }: { value: number; onChange: (v: number) => void; unit?: string; disabled?: boolean }) {
    return (
        <NumberField.Root value={value} onValueChange={(val) => onChange(val ?? 0)} min={0} disabled={disabled} className="inline-flex">
            <NumberField.Group className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                <NumberField.Decrement className={`w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 transition-all ${styles.buttonHover}`}>
                    <Icons.minus />
                </NumberField.Decrement>
                <NumberField.Input className="w-16 h-9 text-center text-sm font-medium border-x border-gray-200 focus:outline-none focus:bg-gray-50" />
                <NumberField.Increment className={`w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 transition-all ${styles.buttonHover}`}>
                    <Icons.plus />
                </NumberField.Increment>
            </NumberField.Group>
            {unit && <span className="ml-2 text-xs text-gray-400 self-center">{unit}</span>}
        </NumberField.Root>
    );
}

// Catalog Select with Base UI Select
function CatalogSelect({ value, onChange, disabled }: { value: string | null; onChange: (v: string | null) => void; disabled?: boolean }) {
    const catalogItems = CATALOG.map(c => ({ label: c.name, value: c.id }));

    return (
        <Select.Root value={value || ''} onValueChange={(val) => onChange(val || null)} disabled={disabled}>
            <Select.Trigger className={`flex items-center justify-between w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20 focus:border-[#2D5A27] transition-all ${styles.buttonHover}`}>
                <Select.Value placeholder="Select catalog item..." />
                <Select.Icon className="text-gray-400"><Icons.chevronUpDown /></Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Positioner sideOffset={4} className="z-50">
                    <Select.Popup className="bg-white rounded-xl shadow-xl border py-2 w-[280px] max-h-[300px] overflow-y-auto animate-[slideIn_0.15s_ease-out]">
                        {catalogItems.map(item => (
                            <Select.Item key={item.value} value={item.value} className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 cursor-pointer transition-colors data-[highlighted]:bg-gray-50 ${styles.buttonHover}`}>
                                <Select.ItemIndicator className="w-4">
                                    <Icons.check />
                                </Select.ItemIndicator>
                                <Select.ItemText>{item.label}</Select.ItemText>
                            </Select.Item>
                        ))}
                    </Select.Popup>
                </Select.Positioner>
            </Select.Portal>
        </Select.Root>
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
            {/* Global CSS animations */}
            <style jsx global>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                @keyframes shimmer { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes borderPulse {
                    0%, 100% { border-color: rgba(74, 124, 67, 0.3); box-shadow: 0 0 20px rgba(74, 124, 67, 0.1); }
                    50% { border-color: rgba(74, 124, 67, 0.6); box-shadow: 0 0 30px rgba(74, 124, 67, 0.2); }
                }
                .ai-processing-border {
                    animation: borderPulse 2s ease-in-out infinite;
                    border: 2px solid rgba(74, 124, 67, 0.3);
                }
                .ai-processing-gradient {
                    background: linear-gradient(90deg, rgba(74, 124, 67, 0.05), rgba(74, 124, 67, 0.1), rgba(74, 124, 67, 0.05));
                    background-size: 200% 100%;
                    animation: gradientMove 3s ease-in-out infinite;
                }
            `}</style>

            <Sidebar activeSection="estimates" />

            {/* Fixed Header with Blur */}
            <header className="fixed top-0 left-56 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-8 py-5 z-30 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Commercial Office Complex - Phase 1</p>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="text-right">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Estimate</p>
                            <p className="text-3xl font-bold text-gray-900 tabular-nums tracking-tight">{formatCurrency(total)}</p>
                        </div>
                        {selectedIds.size > 0 && (
                            <div className="text-right pl-8 border-l border-gray-200 animate-[fadeIn_0.2s_ease-out]">
                                <p className="text-xs font-medium text-[#2D5A27] uppercase tracking-wide">{selectedIds.size} selected</p>
                                <p className="text-xl font-semibold text-[#2D5A27] tabular-nums">{formatCurrency(selectedTotal)}</p>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="ml-56 flex flex-col min-h-screen pt-[88px]">
                <div className="flex-1 px-8 py-8 overflow-auto">
                    {/* Location Cards */}
                    <div className="grid grid-cols-4 gap-5 mb-8">
                        {groupedByLocation.map(loc => <LocationCard key={loc.id} location={loc} total={loc.total} itemCount={loc.items.length} />)}
                    </div>

                    {/* Table Toolbar */}
                    <div className="bg-white rounded-t-2xl border border-b-0 border-gray-200 px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={addItem} disabled={isProcessing} className={`flex items-center gap-2 px-4 py-2.5 bg-[#2D5A27]/10 border border-[#2D5A27]/20 rounded-xl text-sm text-[#2D5A27] font-medium hover:bg-[#2D5A27]/20 disabled:opacity-50 ${styles.buttonHover}`}><Icons.plus /> Add Item</button>
                            <CatalogPopover />
                            {selectedIds.size > 0 && (
                                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 animate-[fadeIn_0.2s_ease-out]">
                                    <button onClick={duplicateSelected} disabled={isProcessing} className={`flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 ${styles.buttonHover}`}><Icons.copy /> Duplicate</button>
                                    <button onClick={() => setShowDeleteConfirm(true)} disabled={isProcessing} className={`flex items-center gap-2 px-4 py-2.5 border border-red-200 rounded-xl text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 ${styles.buttonHover}`}><Icons.trash /> Delete</button>
                                </div>
                            )}
                        </div>
                        <AIActionsMenu selectedCount={selectedIds.size} onAction={handleAIAction} isProcessing={isProcessing} />
                    </div>

                    {/* Table with AI Processing Effect */}
                    <div className={`bg-white rounded-b-2xl border border-gray-200 overflow-hidden transition-all duration-500 ${isProcessing ? 'ai-processing-border' : ''}`}>
                        {isProcessing && (
                            <div className="bg-gradient-to-r from-[#7CB371] via-[#5A9B52] to-[#7CB371] bg-[length:200%_100%] animate-[gradientMove_3s_ease-in-out_infinite] px-5 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {lottieData ? <div className="w-10 h-10 bg-white/20 rounded-xl p-1"><Lottie animationData={lottieData} loop autoplay /></div> : <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-xl"><div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" /></div>}
                                    <div>
                                        <p className="text-sm font-semibold text-white">AI is analyzing your estimate...</p>
                                        <p className="text-xs text-white/80">{processingMessage}</p>
                                    </div>
                                </div>
                                <button onClick={() => { setIsProcessing(false); setProcessingMessage(''); }} className={`flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl text-sm font-medium hover:bg-white/30 ${styles.buttonHover}`}><Icons.stop /> Stop</button>
                            </div>
                        )}
                        <div className={`${isProcessing ? 'opacity-60 pointer-events-none ai-processing-gradient' : ''} transition-opacity duration-300`}>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50">
                                        <th className="w-14 py-4 px-5">
                                            <Checkbox.Root checked={selectedIds.size === items.length && items.length > 0} onCheckedChange={toggleSelectAll} disabled={isProcessing} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${selectedIds.size === items.length && items.length > 0 ? 'bg-[#2D5A27] border-[#2D5A27] text-white scale-105' : 'border-gray-300 hover:border-gray-400'} ${styles.checkboxAnim}`}>
                                                <Checkbox.Indicator className="animate-[scaleIn_0.15s_ease-out]"><Icons.check /></Checkbox.Indicator>
                                            </Checkbox.Root>
                                        </th>
                                        <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Item Name</th>
                                        <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-56">Catalog</th>
                                        <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-40">Quantity</th>
                                        <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-48">Location</th>
                                        <th className="text-right py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-32">Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => {
                                        const catalog = getCatalog(item.catalogItem);
                                        return (
                                            <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${selectedIds.has(item.id) ? 'bg-[#2D5A27]/5' : ''} ${item.isNew ? 'bg-[#2D5A27]/10 animate-[fadeIn_0.5s_ease-out]' : ''}`}>
                                                <td className="py-4 px-5">
                                                    <Checkbox.Root checked={selectedIds.has(item.id)} onCheckedChange={() => toggleSelect(item.id)} disabled={isProcessing} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${selectedIds.has(item.id) ? 'bg-[#2D5A27] border-[#2D5A27] text-white scale-105' : 'border-gray-300 hover:border-gray-400'} ${styles.checkboxAnim}`}>
                                                        <Checkbox.Indicator className="animate-[scaleIn_0.15s_ease-out]"><Icons.check /></Checkbox.Indicator>
                                                    </Checkbox.Root>
                                                </td>
                                                <td className="py-4 px-5">
                                                    <input type="text" value={item.name} onChange={e => updateItem({ ...item, name: e.target.value })} className="w-full bg-transparent border-0 focus:ring-0 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none" placeholder="Enter item name" disabled={isProcessing} />
                                                </td>
                                                <td className="py-4 px-5">
                                                    <CatalogSelect value={item.catalogItem} onChange={v => updateItem({ ...item, catalogItem: v })} disabled={isProcessing} />
                                                </td>
                                                <td className="py-4 px-5">
                                                    <QuantityField value={item.quantity} onChange={v => updateItem({ ...item, quantity: v })} unit={catalog?.unit} disabled={isProcessing} />
                                                </td>
                                                <td className="py-4 px-5">
                                                    <LocationEditorPopover tags={item.tags} onChange={tags => updateItem({ ...item, tags })}>
                                                        <button className={`flex flex-wrap gap-1.5 items-center min-h-[36px] ${styles.buttonHover}`}>
                                                            {item.tags.length > 0 ? item.tags.map(tag => <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg transition-colors hover:bg-gray-200">{tag}</span>) : <span className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Click to add</span>}
                                                        </button>
                                                    </LocationEditorPopover>
                                                </td>
                                                <td className="py-4 px-5 text-right">
                                                    <span className="text-sm font-semibold text-gray-900 tabular-nums">{formatCurrency(getCost(item))}</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {items.length === 0 && <div className="py-16 text-center text-gray-500">No items yet. Click "Add Item" to start building your estimate.</div>}
                        </div>
                    </div>
                </div>

                <footer className="bg-white border-t border-gray-200 px-8 py-4">
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
