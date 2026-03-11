'use client';
import * as React from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Select } from '@base-ui/react/select';
import { Checkbox } from '@base-ui/react/checkbox';

// Types
interface Account {
    id: string;
    code: string;
    name: string;
    type: 'Assets' | 'Liabilities' | 'Equity' | 'Revenue' | 'Expenses';
    subtype: string;
    balance: number;
    bankConnected?: boolean;
    locked?: boolean;
    description?: string;
}

// Common Chart of Accounts Data
const CHART_OF_ACCOUNTS: Account[] = [
    // ASSETS
    { id: '1', code: '1-10001', name: 'Cash on Hand', type: 'Assets', subtype: 'Current Assets', balance: 25000000, bankConnected: false },
    { id: '2', code: '1-10002', name: 'BCA - Operating Account', type: 'Assets', subtype: 'Current Assets', balance: 150000000, bankConnected: true },
    { id: '3', code: '1-10003', name: 'Mandiri - Payroll Account', type: 'Assets', subtype: 'Current Assets', balance: 75000000, bankConnected: true },
    { id: '4', code: '1-10004', name: 'BNI - Savings Account', type: 'Assets', subtype: 'Current Assets', balance: 200000000, bankConnected: true },
    { id: '5', code: '1-10005', name: 'Petty Cash', type: 'Assets', subtype: 'Current Assets', balance: 5000000, bankConnected: false },
    { id: '6', code: '1-10100', name: 'Accounts Receivable', type: 'Assets', subtype: 'Current Assets', balance: 450000000, description: 'Trade receivables from customers' },
    { id: '7', code: '1-10101', name: 'Allowance for Doubtful Accounts', type: 'Assets', subtype: 'Current Assets', balance: -22500000, description: 'Estimated uncollectible accounts' },
    { id: '8', code: '1-10200', name: 'Inventory - Raw Materials', type: 'Assets', subtype: 'Current Assets', balance: 180000000 },
    { id: '9', code: '1-10201', name: 'Inventory - Work in Progress', type: 'Assets', subtype: 'Current Assets', balance: 95000000 },
    { id: '10', code: '1-10202', name: 'Inventory - Finished Goods', type: 'Assets', subtype: 'Current Assets', balance: 320000000 },
    { id: '11', code: '1-10300', name: 'Prepaid Insurance', type: 'Assets', subtype: 'Current Assets', balance: 24000000 },
    { id: '12', code: '1-10301', name: 'Prepaid Rent', type: 'Assets', subtype: 'Current Assets', balance: 60000000 },
    { id: '13', code: '1-10302', name: 'Prepaid Taxes', type: 'Assets', subtype: 'Current Assets', balance: 35000000 },
    { id: '14', code: '1-20001', name: 'Land', type: 'Assets', subtype: 'Fixed Assets', balance: 2500000000, locked: true },
    { id: '15', code: '1-20002', name: 'Buildings', type: 'Assets', subtype: 'Fixed Assets', balance: 1800000000 },
    { id: '16', code: '1-20003', name: 'Accumulated Depreciation - Buildings', type: 'Assets', subtype: 'Fixed Assets', balance: -360000000 },
    { id: '17', code: '1-20004', name: 'Machinery & Equipment', type: 'Assets', subtype: 'Fixed Assets', balance: 750000000 },
    { id: '18', code: '1-20005', name: 'Accumulated Depreciation - M&E', type: 'Assets', subtype: 'Fixed Assets', balance: -225000000 },
    { id: '19', code: '1-20006', name: 'Vehicles', type: 'Assets', subtype: 'Fixed Assets', balance: 450000000 },
    { id: '20', code: '1-20007', name: 'Accumulated Depreciation - Vehicles', type: 'Assets', subtype: 'Fixed Assets', balance: -180000000 },
    { id: '21', code: '1-20008', name: 'Office Equipment', type: 'Assets', subtype: 'Fixed Assets', balance: 120000000 },
    { id: '22', code: '1-20009', name: 'Computer & IT Equipment', type: 'Assets', subtype: 'Fixed Assets', balance: 85000000 },
    // LIABILITIES
    { id: '23', code: '2-10001', name: 'Accounts Payable', type: 'Liabilities', subtype: 'Current Liabilities', balance: 280000000, description: 'Trade payables to suppliers' },
    { id: '24', code: '2-10002', name: 'Accrued Expenses', type: 'Liabilities', subtype: 'Current Liabilities', balance: 45000000, description: 'Expenses incurred but not yet paid' },
    { id: '25', code: '2-10003', name: 'Accrued Salaries & Wages', type: 'Liabilities', subtype: 'Current Liabilities', balance: 125000000 },
    { id: '26', code: '2-10004', name: 'Income Tax Payable', type: 'Liabilities', subtype: 'Current Liabilities', balance: 85000000 },
    { id: '27', code: '2-10005', name: 'VAT Payable', type: 'Liabilities', subtype: 'Current Liabilities', balance: 62000000 },
    { id: '28', code: '2-10006', name: 'Unearned Revenue', type: 'Liabilities', subtype: 'Current Liabilities', balance: 95000000, description: 'Payments received before service delivery' },
    { id: '29', code: '2-10007', name: 'Short-term Loans', type: 'Liabilities', subtype: 'Current Liabilities', balance: 300000000 },
    { id: '30', code: '2-10008', name: 'Current Portion of Long-term Debt', type: 'Liabilities', subtype: 'Current Liabilities', balance: 150000000 },
    { id: '31', code: '2-20001', name: 'Bank Loan - BCA', type: 'Liabilities', subtype: 'Long-term Liabilities', balance: 800000000, bankConnected: true },
    { id: '32', code: '2-20002', name: 'Bank Loan - Mandiri', type: 'Liabilities', subtype: 'Long-term Liabilities', balance: 500000000, bankConnected: true },
    { id: '33', code: '2-20003', name: 'Mortgage Payable', type: 'Liabilities', subtype: 'Long-term Liabilities', balance: 1200000000 },
    { id: '34', code: '2-20004', name: 'Bonds Payable', type: 'Liabilities', subtype: 'Long-term Liabilities', balance: 2000000000 },
    // EQUITY
    { id: '35', code: '3-10001', name: 'Common Stock', type: 'Equity', subtype: 'Owner\'s Equity', balance: 1000000000, locked: true },
    { id: '36', code: '3-10002', name: 'Additional Paid-in Capital', type: 'Equity', subtype: 'Owner\'s Equity', balance: 500000000 },
    { id: '37', code: '3-10003', name: 'Retained Earnings', type: 'Equity', subtype: 'Owner\'s Equity', balance: 1850000000 },
    { id: '38', code: '3-10004', name: 'Treasury Stock', type: 'Equity', subtype: 'Owner\'s Equity', balance: -100000000 },
    { id: '39', code: '3-10005', name: 'Owner\'s Drawings', type: 'Equity', subtype: 'Owner\'s Equity', balance: -75000000 },
    // REVENUE
    { id: '40', code: '4-10001', name: 'Sales Revenue', type: 'Revenue', subtype: 'Operating Revenue', balance: 4500000000 },
    { id: '41', code: '4-10002', name: 'Service Revenue', type: 'Revenue', subtype: 'Operating Revenue', balance: 850000000 },
    { id: '42', code: '4-10003', name: 'Sales Returns & Allowances', type: 'Revenue', subtype: 'Operating Revenue', balance: -125000000 },
    { id: '43', code: '4-10004', name: 'Sales Discounts', type: 'Revenue', subtype: 'Operating Revenue', balance: -95000000 },
    { id: '44', code: '4-20001', name: 'Interest Income', type: 'Revenue', subtype: 'Other Revenue', balance: 45000000 },
    { id: '45', code: '4-20002', name: 'Dividend Income', type: 'Revenue', subtype: 'Other Revenue', balance: 25000000 },
    { id: '46', code: '4-20003', name: 'Rental Income', type: 'Revenue', subtype: 'Other Revenue', balance: 120000000 },
    { id: '47', code: '4-20004', name: 'Gain on Sale of Assets', type: 'Revenue', subtype: 'Other Revenue', balance: 35000000 },
    // EXPENSES
    { id: '48', code: '5-10001', name: 'Cost of Goods Sold', type: 'Expenses', subtype: 'Cost of Sales', balance: 2700000000 },
    { id: '49', code: '5-10002', name: 'Direct Labor', type: 'Expenses', subtype: 'Cost of Sales', balance: 450000000 },
    { id: '50', code: '5-10003', name: 'Manufacturing Overhead', type: 'Expenses', subtype: 'Cost of Sales', balance: 280000000 },
    { id: '51', code: '5-20001', name: 'Salaries & Wages Expense', type: 'Expenses', subtype: 'Operating Expenses', balance: 850000000 },
    { id: '52', code: '5-20002', name: 'Employee Benefits', type: 'Expenses', subtype: 'Operating Expenses', balance: 125000000 },
    { id: '53', code: '5-20003', name: 'Rent Expense', type: 'Expenses', subtype: 'Operating Expenses', balance: 180000000 },
    { id: '54', code: '5-20004', name: 'Utilities Expense', type: 'Expenses', subtype: 'Operating Expenses', balance: 65000000 },
    { id: '55', code: '5-20005', name: 'Insurance Expense', type: 'Expenses', subtype: 'Operating Expenses', balance: 48000000 },
    { id: '56', code: '5-20006', name: 'Depreciation Expense', type: 'Expenses', subtype: 'Operating Expenses', balance: 195000000 },
    { id: '57', code: '5-20007', name: 'Office Supplies Expense', type: 'Expenses', subtype: 'Operating Expenses', balance: 32000000 },
    { id: '58', code: '5-20008', name: 'Marketing & Advertising', type: 'Expenses', subtype: 'Operating Expenses', balance: 250000000 },
    { id: '59', code: '5-20009', name: 'Professional Fees', type: 'Expenses', subtype: 'Operating Expenses', balance: 85000000 },
    { id: '60', code: '5-20010', name: 'Travel & Entertainment', type: 'Expenses', subtype: 'Operating Expenses', balance: 45000000 },
    { id: '61', code: '5-20011', name: 'Telecommunications', type: 'Expenses', subtype: 'Operating Expenses', balance: 28000000 },
    { id: '62', code: '5-20012', name: 'Repairs & Maintenance', type: 'Expenses', subtype: 'Operating Expenses', balance: 55000000 },
    { id: '63', code: '5-30001', name: 'Interest Expense', type: 'Expenses', subtype: 'Other Expenses', balance: 145000000 },
    { id: '64', code: '5-30002', name: 'Bank Charges', type: 'Expenses', subtype: 'Other Expenses', balance: 12000000 },
    { id: '65', code: '5-30003', name: 'Bad Debt Expense', type: 'Expenses', subtype: 'Other Expenses', balance: 35000000 },
    { id: '66', code: '5-30004', name: 'Loss on Sale of Assets', type: 'Expenses', subtype: 'Other Expenses', balance: 15000000 },
    { id: '67', code: '5-30005', name: 'Income Tax Expense', type: 'Expenses', subtype: 'Other Expenses', balance: 285000000 },
];

const MENU_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'cash-bank', label: 'Cash & Bank', icon: 'bank' },
    { id: 'report', label: 'Report', icon: 'graph' },
    { id: 'sales', label: 'Sales', icon: 'money', hasDropdown: true },
    { id: 'purchase', label: 'Purchase', icon: 'shop', hasDropdown: true },
    { id: 'expense', label: 'Expense', icon: 'expense' },
    { id: 'inventory', label: 'Inventory', icon: 'box' },
    { id: 'fixed-assets', label: 'Fixed Assets', icon: 'folders', hasDropdown: true },
    { id: 'chart-of-accounts', label: 'Chart of Accounts', icon: 'journal' },
    { id: 'contacts', label: 'Contacts', icon: 'contacts' },
];

const ACCOUNT_TYPES = ['Assets', 'Liabilities', 'Equity', 'Revenue', 'Expenses'] as const;

// Helpers
const formatCurrency = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

const styles = {
    buttonHover: "transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]",
};

// Icons
const Icons = {
    dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
    bank: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>,
    graph: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
    money: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8M8 14h8"/></svg>,
    shop: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>,
    expense: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 4H3v16h18V4zM3 10h18M7 15h3"/></svg>,
    box: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>,
    folders: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
    journal: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
    contacts: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    gear: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    chevronDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>,
    chevronRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>,
    plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>,
    search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
    x: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>,
    check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>,
    link: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
    lock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
    hide: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 19l-7-7 7-7"/><path d="M18 19l-7-7 7-7"/></svg>,
    show: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 5l7 7-7 7"/><path d="M6 5l7 7-7 7"/></svg>,
    home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>,
};

const getIcon = (iconName: string) => {
    const iconMap: Record<string, () => JSX.Element> = Icons;
    return iconMap[iconName] || Icons.dashboard;
};

// Harmoni Logo
const HarmoniLogo = ({ collapsed }: { collapsed: boolean }) => (
    <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30">
            H
        </div>
        {!collapsed && <span className="font-semibold text-gray-900 text-lg">Harmoni</span>}
    </div>
);

// Sidebar
function Sidebar({ activeSection, collapsed, onToggle }: { activeSection: string; collapsed: boolean; onToggle: () => void }) {
    const [expandedMenus, setExpandedMenus] = React.useState<Set<string>>(new Set());

    const toggleMenu = (id: string) => {
        const newExpanded = new Set(expandedMenus);
        newExpanded.has(id) ? newExpanded.delete(id) : newExpanded.add(id);
        setExpandedMenus(newExpanded);
    };

    return (
        <aside className={`${collapsed ? 'w-16' : 'w-60'} bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-40 transition-all duration-300`}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <HarmoniLogo collapsed={collapsed} />
            </div>
            <nav className="flex-1 p-2 overflow-y-auto">
                {MENU_ITEMS.map(item => {
                    const Icon = getIcon(item.icon);
                    const isActive = activeSection === item.id;
                    const isExpanded = expandedMenus.has(item.id);
                    return (
                        <div key={item.id}>
                            <button
                                onClick={() => item.hasDropdown ? toggleMenu(item.id) : null}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 mb-0.5 ${isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                            >
                                <span className={isActive ? 'text-indigo-600' : 'text-gray-400'}><Icon /></span>
                                {!collapsed && (
                                    <>
                                        <span className="flex-1 text-left">{item.label}</span>
                                        {item.hasDropdown && (
                                            <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                                                <Icons.chevronRight />
                                            </span>
                                        )}
                                    </>
                                )}
                            </button>
                        </div>
                    );
                })}
            </nav>
            <div className="p-2 border-t border-gray-100">
                <button onClick={onToggle} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
                    {collapsed ? <Icons.show /> : <Icons.hide />}
                    {!collapsed && <span>Hide Sidebar</span>}
                </button>
                <a href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
                    <Icons.home />
                    {!collapsed && <span>Back to Portfolio</span>}
                </a>
            </div>
        </aside>
    );
}

// New Account Dialog
function NewAccountDialog({ isOpen, onOpenChange, onAdd }: { isOpen: boolean; onOpenChange: (v: boolean) => void; onAdd: (account: Partial<Account>) => void }) {
    const [formData, setFormData] = React.useState({ name: '', type: 'Assets' as Account['type'], subtype: '', code: '', description: '' });

    const handleSubmit = () => {
        if (formData.name && formData.type) {
            onAdd({
                id: `new-${Date.now()}`,
                code: formData.code || `${formData.type[0]}-${Date.now().toString().slice(-5)}`,
                name: formData.name,
                type: formData.type,
                subtype: formData.subtype || 'Other',
                balance: 0,
                description: formData.description,
            });
            setFormData({ name: '', type: 'Assets', subtype: '', code: '', description: '' });
            onOpenChange(false);
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-[fadeIn_0.2s_ease-out]" />
                <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-[480px] z-50 animate-[scaleIn_0.2s_ease-out] overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <Dialog.Title className="text-lg font-semibold text-gray-900">New Account</Dialog.Title>
                        <Dialog.Close className="p-1 text-gray-400 hover:text-gray-600 transition-colors"><Icons.x /></Dialog.Close>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Account Name</label>
                            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" placeholder="e.g. Office Supplies" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Account Type</label>
                                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value as Account['type'] })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white">
                                    {ACCOUNT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Account Code</label>
                                <input type="text" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" placeholder="Auto-generated" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description (Optional)</label>
                            <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none" placeholder="Brief description of this account" />
                        </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                        <Dialog.Close className={`px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 ${styles.buttonHover}`}>Cancel</Dialog.Close>
                        <button onClick={handleSubmit} className={`px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 ${styles.buttonHover}`}>Create Account</button>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

// Connect Bank Dialog
function ConnectBankDialog({ isOpen, onOpenChange, account }: { isOpen: boolean; onOpenChange: (v: boolean) => void; account: Account | null }) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-[fadeIn_0.2s_ease-out]" />
                <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-[400px] z-50 animate-[scaleIn_0.2s_ease-out] overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <Dialog.Title className="text-lg font-semibold text-gray-900">Connect Bank Account</Dialog.Title>
                        <Dialog.Close className="p-1 text-gray-400 hover:text-gray-600 transition-colors"><Icons.x /></Dialog.Close>
                    </div>
                    <div className="p-6">
                        <p className="text-sm text-gray-600 mb-4">Connect <strong>{account?.name}</strong> to your bank for automatic transaction sync.</p>
                        <div className="space-y-3">
                            {['BCA', 'Mandiri', 'BNI', 'BRI', 'CIMB Niaga'].map(bank => (
                                <button key={bank} className={`w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/50 transition-all ${styles.buttonHover}`}>
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 font-semibold text-sm">{bank.substring(0, 2)}</div>
                                    <span className="font-medium text-gray-900">{bank}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

// Account Type Badge
function TypeBadge({ type }: { type: Account['type'] }) {
    const colors: Record<Account['type'], string> = {
        Assets: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        Liabilities: 'bg-rose-50 text-rose-700 border-rose-200',
        Equity: 'bg-violet-50 text-violet-700 border-violet-200',
        Revenue: 'bg-blue-50 text-blue-700 border-blue-200',
        Expenses: 'bg-amber-50 text-amber-700 border-amber-200',
    };
    return <span className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${colors[type]}`}>{type}</span>;
}

// Main Layout
export default function HarmoniLayout(props: any) {
    const { page } = props;
    const { title } = page;

    const [accounts, setAccounts] = React.useState<Account[]>(CHART_OF_ACCOUNTS);
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filterType, setFilterType] = React.useState<string>('all');
    const [showNewAccountDialog, setShowNewAccountDialog] = React.useState(false);
    const [showConnectBankDialog, setShowConnectBankDialog] = React.useState(false);
    const [selectedAccount, setSelectedAccount] = React.useState<Account | null>(null);
    const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

    const filteredAccounts = accounts.filter(acc => {
        const matchesSearch = acc.name.toLowerCase().includes(searchQuery.toLowerCase()) || acc.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || acc.type === filterType;
        return matchesSearch && matchesType;
    });

    const groupedAccounts = ACCOUNT_TYPES.reduce((acc, type) => {
        acc[type] = filteredAccounts.filter(a => a.type === type);
        return acc;
    }, {} as Record<Account['type'], Account[]>);

    const toggleSelect = (id: string) => {
        const s = new Set(selectedIds);
        s.has(id) ? s.delete(id) : s.add(id);
        setSelectedIds(s);
    };

    const handleAddAccount = (account: Partial<Account>) => {
        setAccounts([...accounts, account as Account]);
    };

    const handleConnectBank = (account: Account) => {
        setSelectedAccount(account);
        setShowConnectBankDialog(true);
    };

    const totals = ACCOUNT_TYPES.reduce((acc, type) => {
        acc[type] = accounts.filter(a => a.type === type).reduce((sum, a) => sum + a.balance, 0);
        return acc;
    }, {} as Record<Account['type'], number>);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Global CSS animations */}
            <style jsx global>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                @keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>

            <Sidebar activeSection="chart-of-accounts" collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

            {/* Fixed Header */}
            <header className={`fixed top-0 ${sidebarCollapsed ? 'left-16' : 'left-60'} right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-8 py-4 z-30 shadow-sm transition-all duration-300`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">PT. Cinta Abadi Terkini</p>
                        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                    </div>
                    <button onClick={() => setShowNewAccountDialog(true)} className={`flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 shadow-sm shadow-indigo-500/20 ${styles.buttonHover}`}>
                        <Icons.plus /> New Account
                    </button>
                </div>
            </header>

            <main className={`${sidebarCollapsed ? 'ml-16' : 'ml-60'} pt-[88px] min-h-screen transition-all duration-300`}>
                <div className="p-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-5 gap-4 mb-8">
                        {ACCOUNT_TYPES.map(type => {
                            const colors: Record<string, string> = {
                                Assets: 'from-emerald-500 to-teal-600',
                                Liabilities: 'from-rose-500 to-pink-600',
                                Equity: 'from-violet-500 to-purple-600',
                                Revenue: 'from-blue-500 to-cyan-600',
                                Expenses: 'from-amber-500 to-orange-600',
                            };
                            return (
                                <div key={type} className={`bg-gradient-to-br ${colors[type]} rounded-2xl p-5 text-white shadow-lg`}>
                                    <p className="text-white/80 text-sm font-medium">{type}</p>
                                    <p className="text-2xl font-bold mt-1">{formatCurrency(Math.abs(totals[type]))}</p>
                                    <p className="text-white/70 text-xs mt-2">{accounts.filter(a => a.type === type).length} accounts</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Filters & Search */}
                    <div className="bg-white rounded-t-2xl border border-b-0 border-gray-200 px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Icons.search />
                                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search accounts..." className="pl-10 pr-4 py-2.5 w-64 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all absolute left-0 top-1/2 -translate-y-1/2" style={{ paddingLeft: '40px' }} />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icons.search /></span>
                            </div>
                            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
                                <option value="all">All Types</option>
                                {ACCOUNT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <p className="text-sm text-gray-500">{filteredAccounts.length} accounts</p>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-b-2xl border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <th className="w-12 py-4 px-5"></th>
                                    <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Code</th>
                                    <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Account Name</th>
                                    <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                                    <th className="text-left py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Subtype</th>
                                    <th className="text-right py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Balance</th>
                                    <th className="text-center py-4 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAccounts.map(account => (
                                    <tr key={account.id} className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${selectedIds.has(account.id) ? 'bg-indigo-50/50' : ''}`}>
                                        <td className="py-4 px-5">
                                            <Checkbox.Root checked={selectedIds.has(account.id)} onCheckedChange={() => toggleSelect(account.id)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${selectedIds.has(account.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 hover:border-gray-400'}`}>
                                                <Checkbox.Indicator className="animate-[scaleIn_0.15s_ease-out]"><Icons.check /></Checkbox.Indicator>
                                            </Checkbox.Root>
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className="text-sm font-mono text-gray-500">{account.code}</span>
                                        </td>
                                        <td className="py-4 px-5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-900">{account.name}</span>
                                                {account.locked && <span className="text-gray-400"><Icons.lock /></span>}
                                            </div>
                                            {account.description && <p className="text-xs text-gray-500 mt-0.5">{account.description}</p>}
                                        </td>
                                        <td className="py-4 px-5"><TypeBadge type={account.type} /></td>
                                        <td className="py-4 px-5"><span className="text-sm text-gray-600">{account.subtype}</span></td>
                                        <td className="py-4 px-5 text-right">
                                            <span className={`text-sm font-semibold tabular-nums ${account.balance < 0 ? 'text-rose-600' : 'text-gray-900'}`}>
                                                {formatCurrency(account.balance)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-center">
                                            {account.bankConnected ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium">
                                                    <Icons.link /> Connected
                                                </span>
                                            ) : (
                                                <button onClick={() => handleConnectBank(account)} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                                                    Connect
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredAccounts.length === 0 && (
                            <div className="py-16 text-center text-gray-500">
                                <p className="text-lg font-medium">No accounts found</p>
                                <p className="text-sm mt-1">Try adjusting your search or filter</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                        <span>Showing {filteredAccounts.length} of {accounts.length} accounts</span>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                            <span className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg">1</span>
                            <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
                        </div>
                    </div>
                </div>
            </main>

            <NewAccountDialog isOpen={showNewAccountDialog} onOpenChange={setShowNewAccountDialog} onAdd={handleAddAccount} />
            <ConnectBankDialog isOpen={showConnectBankDialog} onOpenChange={setShowConnectBankDialog} account={selectedAccount} />
        </div>
    );
}
