'use client';
import * as React from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Checkbox } from '@base-ui/react/checkbox';
import { Menu } from '@base-ui/react/menu';
import { Select } from '@base-ui/react/select';
import { Popover } from '@base-ui/react/popover';

// Figma Design Tokens (Harmoni Design System)
const colors = {
    primary: '#2088FF',
    primaryHover: '#1a6fd9',
    background: '#F5F7FA',       // neutrals100 - sidebar & grey areas
    white: '#FFFFFF',
    textDark: '#090A0B',
    textMuted: '#637D92',       // secondary800
    textLight: '#7991A4',       // secondary700 - inactive tab text
    textLighter: '#92A5B5',    // secondary600
    border: '#DAE1E7',         // secondary200
    borderLight: '#E7EBEF',     // secondary100
    success: '#0B7B69',        // success300 - Active badge text
    successBg: '#CFFFF7',      // success - Active badge bg
    shadow: 'rgba(0, 0, 0, 0.08)',
};

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

// Menu items grouped by section
const MENU_SECTION_1 = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'cash-bank', label: 'Cash & Bank', icon: 'bank' },
    { id: 'report', label: 'Report', icon: 'graph' },
];

const MENU_SECTION_2 = [ // CREATE
    { id: 'sales', label: 'Sales', icon: 'money', hasDropdown: true },
    { id: 'purchase', label: 'Purchase', icon: 'shop', hasDropdown: true },
    { id: 'expense', label: 'Expense', icon: 'expense' },
    { id: 'inventory', label: 'Inventory', icon: 'box' },
    { id: 'fixed-assets', label: 'Fixed Assets', icon: 'folders', hasDropdown: true },
];

const MENU_SECTION_3 = [ // MANAGE
    { id: 'chart-of-accounts', label: 'Chart of Accounts', icon: 'journal' },
    { id: 'contacts', label: 'Contacts', icon: 'contacts' },
    { id: 'manual-journal', label: 'Manual Journal', icon: 'journal' },
    { id: 'settings', label: 'Settings', icon: 'settings', hasDropdown: true },
];

const ACCOUNT_TYPES = ['Assets', 'Liabilities', 'Equity', 'Revenue', 'Expenses'] as const;

// Helpers
const formatCurrency = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

// Icons (from Figma design)
const Icons: Record<string, React.FC<{ className?: string; active?: boolean; style?: React.CSSProperties }>> = {
    // Figma exported icons - Dashboard (speedometer style)
    dashboard: ({ className, active }) => (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 6C10.809 6.009 9.63149 6.25252 8.53463 6.71666C7.43778 7.18079 6.44309 7.85645 5.60738 8.70505C4.77166 9.55364 4.11127 10.5586 3.66394 11.6624C3.21661 12.7662 2.99109 13.9474 3.00027 15.1384V16.8C3.00027 17.1182 3.12669 17.4235 3.35173 17.6486C3.57677 17.8736 3.88199 18 4.20023 18H19.7998C20.118 18 20.4232 17.8736 20.6483 17.6486C20.8734 17.4235 20.9997 17.1182 20.9997 16.8V15.136C21.0177 12.731 20.0795 10.4175 18.3917 8.7042C16.704 6.9909 14.4049 6.01818 12 6Z" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 17V16.4C9 15.7635 9.31607 15.153 9.87868 14.703C10.4413 14.2529 11.2044 14 12 14C12.7956 14 13.5587 14.2529 14.1213 14.703C14.6839 15.153 15 15.7635 15 16.4V17" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 10L12 14" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    // Figma exported - Bank (building with columns)
    bank: ({ className, active }) => (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 4C12.4206 4 12.8335 4.11613 13.1942 4.33398L13.1952 4.33301L21.5009 9.13477C21.8921 9.36131 22.0827 9.82204 21.9657 10.2588C21.8484 10.6958 21.4524 11 20.9999 11H18.9999V18H19.9999C20.5522 18 20.9999 18.4477 20.9999 19C20.9999 19.5523 20.5522 20 19.9999 20H3.99988C3.44764 20 2.99988 19.5523 2.99988 19C2.99988 18.4477 3.44764 18 3.99988 18H4.99988V11H2.99988C2.54743 11 2.1513 10.6958 2.03406 10.2588C1.91706 9.82207 2.10768 9.36132 2.49891 9.13477L10.8046 4.33301V4.33398C11.1655 4.11583 11.5789 4.00002 11.9999 4ZM6.99988 11V18H16.9999V11H6.99988ZM8.99988 12C9.55217 12 9.99988 12.4477 9.99988 13V16C9.99988 16.5523 9.55217 17 8.99988 17C8.44764 17 7.99988 16.5523 7.99988 16V13C7.99988 12.4477 8.44764 12 8.99988 12ZM11.9999 12C12.5522 12 12.9999 12.4477 12.9999 13V16C12.9999 16.5523 12.5522 17 11.9999 17C11.4476 17 10.9999 16.5523 10.9999 16V13C10.9999 12.4477 11.4476 12 11.9999 12ZM14.9999 12C15.5522 12 15.9999 12.4477 15.9999 13V16C15.9999 16.5523 15.5522 17 14.9999 17C14.4476 17 13.9999 16.5523 13.9999 16V13C13.9999 12.4477 14.4476 12 14.9999 12ZM11.9999 6C11.9392 6.00002 11.8819 6.01749 11.8348 6.04688C11.8252 6.05289 11.8154 6.05877 11.8055 6.06445L6.72742 9H17.2723L12.1942 6.06445C12.1844 6.05877 12.1746 6.05289 12.1649 6.04688C12.1179 6.0175 12.0606 6 11.9999 6Z" fill={active ? '#fff' : colors.textLight}/>
        </svg>
    ),
    // Figma exported - Report (bar chart)
    graph: ({ className, active }) => (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M17.8013 20.1045V10.1045" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.8013 20.1045V4.10449" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.80127 20.1045V14.1045" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    // Figma exported - Sales (dollar circle)
    money: ({ className, active }) => (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.9146 9.99999C13.8488 9.81369 13.7472 9.64427 13.6181 9.5C13.3434 9.19312 12.9443 9 12.5 9H11.339C10.5995 9 10 9.59947 10 10.3389C10 10.9682 10.4381 11.5125 11.0528 11.647L12.8205 12.0337C13.5092 12.1843 14 12.7945 14 13.4995C14 14.3279 13.3284 15 12.5 15H11.5C10.8469 15 10.2913 14.5826 10.0854 14" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 9V8" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V15" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    // Figma exported - Purchase (shopping bag)
    shop: ({ className, active }) => (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19.9915 18.6433C20.013 18.8148 19.9937 18.9883 19.9351 19.1527C19.8765 19.317 19.78 19.4683 19.6517 19.5966C19.5231 19.7247 19.3658 19.827 19.1902 19.8964C19.0144 19.966 18.8243 20.0013 18.6324 20H5.36758C5.17564 20.0013 4.98557 19.966 4.80988 19.8964C4.63419 19.827 4.47686 19.7247 4.34826 19.5966C4.22 19.4683 4.12342 19.317 4.06486 19.1527C4.00629 18.9883 3.98708 18.8148 4.00848 18.6433L5.06486 9L18.9351 9L19.9915 18.6433Z" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 9V7.125C9 6.2962 9.31607 5.50134 9.87868 4.91529C10.4413 4.32924 11.2044 4 12 4C12.7956 4 13.5587 4.32924 14.1213 4.91529C14.6839 5.50134 15 6.2962 15 7.125V9" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="5" y1="16" x2="19" y2="16" stroke={active ? '#fff' : colors.textLight} strokeWidth="2"/>
        </svg>
    ),
    // Figma exported - Expense (credit card)
    expense: ({ className, active }) => (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18.7692 6H5.23077C4.55103 6 4 6.56554 4 7.26316V16.7369C4 17.4344 4.55103 18 5.23077 18H18.7692C19.449 18 20 17.4344 20 16.7369V7.26316C20 6.56554 19.449 6 18.7692 6Z" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 10H20.0179" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 14H16.8482" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    // Figma exported - Inventory (box/archive)
    box: ({ className, active }) => (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6V10C21 10.5523 20.5523 11 20 11V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V11C3.44772 11 3 10.5523 3 10V6ZM18 18V11H6V18H18ZM19 7V9H5V7H19ZM10 12C9.44772 12 9 12.4477 9 13C9 13.5523 9.44772 14 10 14H14C14.5523 14 15 13.5523 15 13C15 12.4477 14.5523 12 14 12H10Z" fill={active ? '#fff' : colors.textLight}/>
        </svg>
    ),
    // Figma exported - Fixed Assets (folder)
    folders: ({ className, active }) => (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.76 6.30769C5.64145 6.30769 5.54152 6.35093 5.47888 6.40755C5.41876 6.46191 5.4 6.51987 5.4 6.5641V16.4359C5.4 16.4801 5.41876 16.5381 5.47888 16.5924C5.54152 16.6491 5.64145 16.6923 5.76 16.6923H18.24C18.3585 16.6923 18.4585 16.6491 18.5211 16.5924C18.5812 16.5381 18.6 16.4801 18.6 16.4359V8.67949C18.6 8.63526 18.5812 8.5773 18.5211 8.52294C18.4585 8.46631 18.3585 8.42308 18.24 8.42308H11.22C10.831 8.42308 10.4661 8.24177 10.2411 7.93665L9.03984 6.30769H5.76ZM3.83494 4.72625C4.35742 4.25392 5.05107 4 5.76 4H9.66C10.049 4 10.4139 4.18131 10.6389 4.48643L11.8402 6.11538H18.24C18.9489 6.11538 19.6426 6.36931 20.1651 6.84163C20.69 7.31622 21 7.97567 21 8.67949V16.4359C21 17.1397 20.69 17.7992 20.1651 18.2738C19.6426 18.7461 18.9489 19 18.24 19H5.76C5.05107 19 4.35742 18.7461 3.83494 18.2738C3.30996 17.7992 3 17.1397 3 16.4359V6.5641C3 5.86029 3.30996 5.20084 3.83494 4.72625Z" fill={active ? '#fff' : colors.textLight}/>
        </svg>
    ),
    // Figma exported - Chart of Accounts (document with lines and pocket)
    journal: ({ className, active }) => (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M8 8H16" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 11H16" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 17.8333V6.16667C5 5.52234 5.52234 5 6.16667 5H17.8333C18.4777 5 19 5.52234 19 6.16667V17.8333C19 18.4777 18.4777 19 17.8333 19H6.16667C5.52234 19 5 18.4777 5 17.8333Z" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 14H9.66667V14.4C9.66667 15.2837 10.7113 16 12 16C13.2887 16 14.3333 15.2837 14.3333 14.4V14H19" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    // Figma exported - Contacts (book)
    contacts: ({ className, active }) => (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M7.1875 5H19V19H7.1875C6.60734 19 6.05094 18.8156 5.6407 18.4874C5.23047 18.1592 5 17.7141 5 17.25V6.75C5 6.28587 5.23047 5.84075 5.6407 5.51256C6.05094 5.18437 6.60734 5 7.1875 5Z" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 15C18 15 12.4165 15 8.72125 15C7.68602 15 6.56215 14.9527 5.7353 15.5756C5.2451 15.9448 5 16.4407 5 17" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round"/>
        </svg>
    ),
    // Figma exported - Hide sidebar (panel icon)
    hide: ({ className }) => (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M5 5.77778C5 5.34822 5.34822 5 5.77778 5H8L8 19H5.77778C5.34822 19 5 18.6518 5 18.2222V5.77778ZM10 19L10 5H18.2222C18.6518 5 19 5.34822 19 5.77778V18.2222C19 18.6518 18.6518 19 18.2222 19H10ZM9 21H5.77778C4.24365 21 3 19.7563 3 18.2222V5.77778C3 4.24365 4.24365 3 5.77778 3H9H18.2222C19.7563 3 21 4.24365 21 5.77778V18.2222C21 19.7563 19.7563 21 18.2222 21H9Z" fill={colors.textMuted}/>
        </svg>
    ),
    // Figma exported - Add/Plus
    plus: ({ className }) => (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 4L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 8L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    // Figma exported - Arrow down
    arrowDown: ({ className }) => (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 7L8 11L12 7" stroke={colors.textDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    // Figma exported - Sort/Ascending
    sort: ({ className }) => (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M9.29295 9.29297C9.68348 8.90248 10.3165 8.90246 10.707 9.29297C11.0975 9.68348 11.0975 10.3165 10.707 10.707L8.70702 12.707C8.3165 13.0975 7.68348 13.0975 7.29295 12.707L5.29295 10.707C4.90243 10.3165 4.90243 9.68349 5.29295 9.29297C5.68348 8.90248 6.3165 8.90246 6.70702 9.29297L7.99999 10.5859L9.29295 9.29297ZM7.99999 3C8.26518 3.00002 8.5195 3.10545 8.70702 3.29297L10.707 5.29297C11.0975 5.68348 11.0975 6.31652 10.707 6.70703C10.3165 7.09754 9.68348 7.09752 9.29295 6.70703L7.99999 5.41406L6.70702 6.70703C6.3165 7.09754 5.68348 7.09752 5.29295 6.70703C4.90243 6.31651 4.90243 5.68349 5.29295 5.29297L7.29295 3.29297C7.48049 3.10546 7.73479 3 7.99999 3Z" fill={colors.textDark}/>
        </svg>
    ),
    // Figma exported - Lock
    lock: ({ className }) => (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11.1111 7H4.88889C4.39797 7 4 7.48842 4 8.09091V11.9091C4 12.5116 4.39797 13 4.88889 13H11.1111C11.602 13 12 12.5116 12 11.9091V8.09091C12 7.48842 11.602 7 11.1111 7Z" stroke={colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 7V5.22222C6 4.63285 6.21071 4.06762 6.58579 3.65087C6.96086 3.23413 7.46957 3 8 3C8.53043 3 9.03914 3.23413 9.41421 3.65087C9.78929 4.06762 10 4.63285 10 5.22222V7" stroke={colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    // Additional utility icons
    chevronRight: ({ className, active }) => <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke={active ? 'rgba(255,255,255,0.7)' : colors.textLighter} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    search: ({ className }) => <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke={colors.textLight} strokeWidth="2"/><path d="M20 20l-3.5-3.5" stroke={colors.textLight} strokeWidth="2" strokeLinecap="round"/></svg>,
    x: ({ className }) => <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
    check: ({ className }) => <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    link: ({ className }) => <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    info: ({ className, style }) => <svg className={className} style={style} width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 8v.01M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
    edit: ({ className }) => <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.333 2A1.886 1.886 0 0114 4.667l-8.667 8.666L2 14l.667-3.333L11.333 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    delete: ({ className }) => <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4m2 0v9.333a1.333 1.333 0 01-1.334 1.334H4.667a1.333 1.333 0 01-1.334-1.334V4h9.334z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    show: ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M5 5.77778C5 5.34822 5.34822 5 5.77778 5H8L8 19H5.77778C5.34822 19 5 18.6518 5 18.2222V5.77778ZM10 19L10 5H18.2222C18.6518 5 19 5.34822 19 5.77778V18.2222C19 18.6518 18.6518 19 18.2222 19H10ZM9 21H5.77778C4.24365 21 3 19.7563 3 18.2222V5.77778C3 4.24365 4.24365 3 5.77778 3H9H18.2222C19.7563 3 21 4.24365 21 5.77778V18.2222C21 19.7563 19.7563 21 18.2222 21H9Z" fill={colors.textMuted}/></svg>,
    home: ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 10l9-7 9 7v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9z" stroke={colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke={colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    // More icon (3 dots)
    more: ({ className }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12.5 13C13.3284 13 14 12.3284 14 11.5C14 10.6716 13.3284 10 12.5 10C11.6716 10 11 10.6716 11 11.5C11 12.3284 11.6716 13 12.5 13Z" fill={colors.textLight}/>
            <path d="M19.5 13C20.3284 13 21 12.3284 21 11.5C21 10.6716 20.3284 10 19.5 10C18.6716 10 18 10.6716 18 11.5C18 12.3284 18.6716 13 19.5 13Z" fill={colors.textLight}/>
            <path d="M5.5 13C6.32843 13 7 12.3284 7 11.5C7 10.6716 6.32843 10 5.5 10C4.67157 10 4 10.6716 4 11.5C4 12.3284 4.67157 13 5.5 13Z" fill={colors.textLight}/>
        </svg>
    ),
    // Settings (gear)
    settings: ({ className, active }) => (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke={active ? '#fff' : colors.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
};

// Harmoni Logo
const HarmoniLogo = ({ collapsed }: { collapsed: boolean }) => (
    <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
            <span className="text-white font-bold text-sm">H</span>
        </div>
        {!collapsed && <span className="font-semibold text-sm" style={{ color: colors.textDark }}>Harmoni</span>}
    </div>
);

// Company Dropdown
const CompanyDropdown = ({ collapsed }: { collapsed: boolean }) => (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-[${colors.borderLight}]`} style={{ backgroundColor: colors.background }}>
        <div className="w-6 h-6 rounded bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-xs font-semibold">C</div>
        {!collapsed && (
            <>
                <span className="flex-1 text-sm font-medium truncate" style={{ color: colors.textDark }}>PT. Cinta Abadi Terkini</span>
                <Icons.arrowDown className="text-gray-400" />
            </>
        )}
    </div>
);

// Sidebar (Figma: neutrals100 #f5f7fa)
function Sidebar({ activeSection, collapsed }: { activeSection: string; collapsed: boolean }) {
    return (
        <aside className={`${collapsed ? 'w-[72px]' : 'w-[202px]'} flex flex-col h-screen fixed left-0 top-0 z-40 transition-all duration-300`} style={{ backgroundColor: colors.background, borderRight: `1px solid ${colors.border}` }}>
            {/* Company Selector at top */}
            <div className="p-3" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                <CompanyDropdown collapsed={collapsed} />
            </div>

            {/* Create New Button with Menu */}
            {!collapsed && (
                <div className="px-4 py-3">
                    <Menu.Root>
                        <Menu.Trigger className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded text-sm font-semibold btn-animate" style={{ border: `1px solid ${colors.border}`, color: colors.textDark }}>
                            <Icons.plus className="" />
                            Create New...
                        </Menu.Trigger>
                        <Menu.Portal>
                            <Menu.Positioner>
                                <Menu.Popup className="bg-white rounded-lg shadow-lg py-1 min-w-[180px] popover-animate" style={{ border: `1px solid ${colors.borderLight}` }}>
                                    {['Invoice', 'Bill', 'Expense', 'Manual Journal', 'Contact'].map((item) => (
                                        <Menu.Item key={item} className="px-4 py-2.5 text-sm cursor-pointer menu-item" style={{ color: colors.textDark }}>
                                            {item}
                                        </Menu.Item>
                                    ))}
                                </Menu.Popup>
                            </Menu.Positioner>
                        </Menu.Portal>
                    </Menu.Root>
                </div>
            )}

            {/* Navigation - grouped by sections */}
            <nav className="flex-1 px-0 pt-3 overflow-y-auto">
                {/* Section 1 - no title */}
                <div className="pb-3" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                    {MENU_SECTION_1.map(item => {
                        const Icon = Icons[item.icon] || Icons.dashboard;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                data-active={isActive}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm sidebar-item rounded-lg mx-1"
                                style={{
                                    backgroundColor: isActive ? colors.primary : 'transparent',
                                    color: isActive ? colors.white : colors.textMuted,
                                    width: 'calc(100% - 8px)',
                                }}
                            >
                                <Icon active={isActive} />
                                {!collapsed && <span className="flex-1 text-left font-medium">{item.label}</span>}
                            </button>
                        );
                    })}
                </div>

                {/* Section 2 - CREATE */}
                <div className="pt-3 pb-3" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                    {!collapsed && (
                        <div className="px-4 pb-2">
                            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: colors.textLighter }}>CREATE</span>
                        </div>
                    )}
                    {MENU_SECTION_2.map(item => {
                        const Icon = Icons[item.icon] || Icons.dashboard;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                data-active={isActive}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm sidebar-item rounded-lg mx-1"
                                style={{
                                    backgroundColor: isActive ? colors.primary : 'transparent',
                                    color: isActive ? colors.white : colors.textMuted,
                                    width: 'calc(100% - 8px)',
                                }}
                            >
                                <Icon active={isActive} />
                                {!collapsed && (
                                    <>
                                        <span className="flex-1 text-left font-medium">{item.label}</span>
                                        {item.hasDropdown && <Icons.chevronRight active={isActive} />}
                                    </>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Section 3 - MANAGE */}
                <div className="pt-3">
                    {!collapsed && (
                        <div className="px-4 pb-2">
                            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: colors.textLighter }}>MANAGE</span>
                        </div>
                    )}
                    {MENU_SECTION_3.map(item => {
                        const Icon = Icons[item.icon] || Icons.dashboard;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                data-active={isActive}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm sidebar-item rounded-lg mx-1"
                                style={{
                                    backgroundColor: isActive ? colors.primary : 'transparent',
                                    color: isActive ? colors.white : colors.textMuted,
                                    width: 'calc(100% - 8px)',
                                }}
                            >
                                <Icon active={isActive} />
                                {!collapsed && (
                                    <>
                                        <span className="flex-1 text-left font-medium">{item.label}</span>
                                        {item.hasDropdown && <Icons.chevronRight active={isActive} />}
                                    </>
                                )}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Profile & Notifications at bottom with Menu */}
            <div className="w-full p-3 flex items-center gap-3" style={{ backgroundColor: colors.borderLight, borderRadius: '12px 12px 0 0' }}>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
                    <span className="text-white text-xs font-semibold">JA</span>
                </div>
                {!collapsed && (
                    <>
                        <span className="flex-1 text-sm font-semibold truncate text-left" style={{ color: colors.textMuted }}>John Appleseed</span>
                        <Menu.Root>
                            <Menu.Trigger render={<button type="button" />} className="p-1.5 rounded hover:bg-white/50 btn-animate outline-none">
                                <Icons.more className="" />
                            </Menu.Trigger>
                            <Menu.Portal>
                                <Menu.Positioner side="right" align="end" sideOffset={8}>
                                    <Menu.Popup className="bg-white rounded-lg shadow-lg py-1 min-w-[180px] popover-animate" style={{ border: `1px solid ${colors.borderLight}` }}>
                                        <Menu.Item className="px-4 py-2.5 text-sm cursor-pointer menu-item" style={{ color: colors.textDark }}>
                                            Profile Settings
                                        </Menu.Item>
                                        <Menu.Item className="px-4 py-2.5 text-sm cursor-pointer menu-item" style={{ color: colors.textDark }}>
                                            Notifications
                                        </Menu.Item>
                                        <div className="my-1" style={{ borderTop: `1px solid ${colors.borderLight}` }} />
                                        <Menu.Item className="px-4 py-2.5 text-sm cursor-pointer menu-item" style={{ color: colors.textDark }} onClick={() => window.location.href = '/'}>
                                            Back to Portfolio
                                        </Menu.Item>
                                        <Menu.Item className="px-4 py-2.5 text-sm cursor-pointer menu-item" style={{ color: '#DC2626' }}>
                                            Sign Out
                                        </Menu.Item>
                                    </Menu.Popup>
                                </Menu.Positioner>
                            </Menu.Portal>
                        </Menu.Root>
                    </>
                )}
            </div>
        </aside>
    );
}

// Sortable table header (Figma: Ascending Descending icon)
type SortKey = 'code' | 'name' | 'type' | 'status' | 'balance';
type SortConfig = { key: SortKey; dir: 'asc' | 'desc' } | null;
function SortHeader({ label, sortKey, currentSort, onSort, alignRight }: { label: string; sortKey: SortKey; currentSort: SortConfig; onSort: (c: SortConfig) => void; alignRight?: boolean }) {
    const isActive = currentSort?.key === sortKey;
    const nextDir = !isActive ? 'asc' : currentSort?.dir === 'asc' ? 'desc' : 'asc';
    return (
        <button
            type="button"
            onClick={() => onSort(isActive && currentSort?.dir === 'desc' ? null : { key: sortKey, dir: nextDir })}
            className={`flex items-center gap-1 text-xs font-normal tracking-wide outline-none w-full ${alignRight ? 'justify-end text-right' : 'text-left'}`}
            style={{ color: colors.textMuted }}
        >
            {label}
            <span className="inline-flex shrink-0"><Icons.sort /></span>
        </button>
    );
}

// Modal wrapper: center with flex so popup doesn't use translate (fixes animation glitch)
function ModalWrap({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ pointerEvents: 'none' }}>
            <div style={{ pointerEvents: 'auto' }} className="animate-[modalScaleIn_0.2s_ease-out]">
                {children}
            </div>
        </div>
    );
}

// Parent account options per type
const PARENT_ACCOUNTS: Record<Account['type'], string[]> = {
    Assets: ['Current Assets', 'Fixed Assets', 'Other Assets'],
    Liabilities: ['Current Liabilities', 'Long-term Liabilities'],
    Equity: ["Owner's Equity", 'Retained Earnings'],
    Revenue: ['Operating Revenue', 'Other Revenue'],
    Expenses: ['Cost of Sales', 'Operating Expenses', 'Other Expenses'],
};

// New Account Dialog - Figma 181-1364 (layout, content, labels, helpers, footer)
function NewAccountDialog({ isOpen, onOpenChange, onAdd }: { isOpen: boolean; onOpenChange: (v: boolean) => void; onAdd: (account: Partial<Account>) => void }) {
    const [formData, setFormData] = React.useState({ name: '', type: 'Assets' as Account['type'], parent: '', code: '', description: '', active: true });

    const isFormValid = formData.name.trim() !== '' && formData.code.trim() !== '' && formData.parent !== '';

    const handleSubmit = () => {
        if (isFormValid) {
            onAdd({
                id: `new-${Date.now()}`,
                code: formData.code,
                name: formData.name,
                type: formData.type,
                subtype: formData.parent,
                balance: 0,
                description: formData.description,
            });
            resetAndClose();
        }
    };

    const resetAndClose = () => {
        setFormData({ name: '', type: 'Assets', parent: '', code: '', description: '', active: true });
        onOpenChange(false);
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) resetAndClose(); }}>
            <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 z-50 animate-[fadeIn_0.2s]" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} />
                <ModalWrap>
                    <Dialog.Popup className="bg-white overflow-hidden" style={{ width: 519, borderRadius: 12, boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.13)' }}>
                        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                            <Dialog.Title className="text-base font-semibold" style={{ color: '#121417' }}>New Account</Dialog.Title>
                            <Dialog.Close className="p-1 rounded transition-colors hover:bg-gray-100" style={{ color: colors.textMuted }}><Icons.x /></Dialog.Close>
                        </div>
                        <div className="p-6 flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-normal" style={{ color: colors.textDark }}>Account type</label>
                                    <Select.Root value={formData.type} onValueChange={(val) => setFormData({ ...formData, type: val as Account['type'], parent: '' })}>
                                        <Select.Trigger className="w-full px-3 py-3 rounded text-sm outline-none flex items-center justify-between input-animate" style={{ border: `1px solid ${colors.borderLight}`, color: colors.textDark }}>
                                            <Select.Value placeholder="Select type" />
                                            <Select.Icon><Icons.arrowDown /></Select.Icon>
                                        </Select.Trigger>
                                        <Select.Portal>
                                            <Select.Positioner>
                                                <Select.Popup className="bg-white rounded-lg shadow-lg border py-1 animate-[slideDown_0.15s]" style={{ borderColor: colors.borderLight, minWidth: 200 }}>
                                                    {ACCOUNT_TYPES.map(t => (
                                                        <Select.Item key={t} value={t} className="px-3 py-2 text-sm cursor-pointer menu-item outline-none" style={{ color: colors.textDark }}>
                                                            <Select.ItemText>{t}</Select.ItemText>
                                                        </Select.Item>
                                                    ))}
                                                </Select.Popup>
                                            </Select.Positioner>
                                        </Select.Portal>
                                    </Select.Root>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-normal" style={{ color: colors.textDark }}>Parent account</label>
                                    <Select.Root value={formData.parent} onValueChange={(val) => setFormData({ ...formData, parent: val })}>
                                        <Select.Trigger className="w-full px-3 py-3 rounded text-sm outline-none flex items-center justify-between input-animate" style={{ border: `1px solid ${colors.borderLight}`, color: formData.parent ? colors.textDark : colors.textLighter }}>
                                            <Select.Value placeholder="Select parent" />
                                            <Select.Icon><Icons.arrowDown /></Select.Icon>
                                        </Select.Trigger>
                                        <Select.Portal>
                                            <Select.Positioner>
                                                <Select.Popup className="bg-white rounded-lg shadow-lg border py-1 animate-[slideDown_0.15s]" style={{ borderColor: colors.borderLight, minWidth: 200 }}>
                                                    {PARENT_ACCOUNTS[formData.type].map(p => (
                                                        <Select.Item key={p} value={p} className="px-3 py-2 text-sm cursor-pointer menu-item outline-none" style={{ color: colors.textDark }}>
                                                            <Select.ItemText>{p}</Select.ItemText>
                                                        </Select.Item>
                                                    ))}
                                                </Select.Popup>
                                            </Select.Positioner>
                                        </Select.Portal>
                                    </Select.Root>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-normal" style={{ color: colors.textDark }}>Code</label>
                                <input type="text" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} className="w-full px-3 py-2.5 rounded text-sm outline-none input-animate" style={{ border: `1px solid ${colors.borderLight}`, color: colors.textDark }} placeholder="Ex : 1102" />
                                <p className="text-xs leading-relaxed" style={{ color: colors.textMuted }}>A unique code or number for this account up to 50 characters.</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-normal" style={{ color: colors.textDark }}>Account Name</label>
                                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-3 rounded text-sm outline-none h-9 input-animate" style={{ border: `1px solid ${colors.borderLight}`, color: colors.textDark }} placeholder=" " />
                                <p className="text-xs leading-relaxed" style={{ color: colors.textMuted }}>A short title for this account up to 50 characters.</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-normal" style={{ color: colors.textDark }}>Description</label>
                                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-3 py-3 rounded text-sm outline-none resize-none input-animate" style={{ border: `1px solid ${colors.borderLight}`, color: colors.textDark }} placeholder=" " />
                                <p className="text-xs leading-relaxed" style={{ color: colors.textMuted }}>Add description of how this account should be used.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-normal" style={{ color: colors.textDark }}>Activate this account</span>
                                <Checkbox.Root checked={formData.active} onCheckedChange={(checked) => setFormData({ ...formData, active: !!checked })} className="w-10 h-5 rounded-full p-0.5 transition-colors" style={{ backgroundColor: formData.active ? colors.primary : colors.border }}>
                                    <span className="block w-4 h-4 rounded-full bg-white shadow transition-transform" style={{ transform: formData.active ? 'translateX(20px)' : 'translateX(0)' }} />
                                </Checkbox.Root>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end px-4 py-3" style={{ backgroundColor: colors.background }}>
                            <button type="button" onClick={resetAndClose} className="px-4 py-2 h-[42px] rounded text-sm font-semibold flex items-center justify-center btn-animate" style={{ color: colors.textDark, border: `1px solid ${colors.borderLight}` }}>Cancel</button>
                            <button type="button" onClick={handleSubmit} disabled={!isFormValid} className="px-4 py-2 h-[42px] rounded text-sm font-semibold text-white flex items-center justify-center btn-animate btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none" style={{ backgroundColor: colors.primary }}>Save Changes</button>
                        </div>
                    </Dialog.Popup>
                </ModalWrap>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

// View Account Dialog - Figma 181-1465 (title code - name, banner, Account Settings rows, Edit/Delete footer)
function ViewAccountDialog({ account, onClose, onConnectBank }: { account: Account | null; onClose: () => void; onConnectBank: (a: Account) => void }) {
    if (!account) return null;
    const showConnect = !account.bankConnected && (account.type === 'Assets' || account.type === 'Liabilities');
    return (
        <Dialog.Root open={!!account} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 z-50 animate-[fadeIn_0.2s]" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} />
                <ModalWrap>
                    <Dialog.Popup className="bg-white overflow-hidden" style={{ width: 577, borderRadius: 12, boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.13)' }}>
                        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                            <Dialog.Title className="text-base font-semibold" style={{ color: '#121417' }}>{account.code} - {account.name}</Dialog.Title>
                            <Dialog.Close className="p-1 rounded transition-colors hover:bg-gray-100 btn-animate" style={{ color: colors.textMuted }}><Icons.x /></Dialog.Close>
                        </div>
                        <div className="p-6 flex flex-col gap-6">
                            {showConnect && (
                                <div className="flex gap-2 items-start p-4 rounded-lg" style={{ backgroundColor: '#FFF0DD' }}>
                                    <Icons.info className="shrink-0" style={{ color: '#CC7914' }} />
                                    <div className="flex-1 flex flex-col items-end gap-2">
                                        <div className="w-full flex flex-col gap-1">
                                            <p className="text-sm font-bold" style={{ color: '#CC7914' }}>Connect Account for Automated Balancing</p>
                                            <p className="text-xs leading-relaxed" style={{ color: '#4A5E6D' }}>Link your account for efficient reconciliation with automatic balance matching.</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <button type="button" className="text-sm font-semibold px-4 py-2 btn-animate rounded" style={{ color: colors.textDark }}>Learn More</button>
                                            <button type="button" onClick={() => onConnectBank(account)} className="text-sm font-semibold px-4 py-2 rounded h-[33px] flex items-center justify-center btn-animate" style={{ border: `1px solid ${colors.borderLight}`, color: colors.textDark }}>Connect to Cash & Bank</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-col gap-6 pb-6" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-normal" style={{ color: colors.textDark }}>Account type</p>
                                        <p className="text-sm" style={{ color: colors.textMuted }}>{account.type}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-normal" style={{ color: colors.textDark }}>Parent account</p>
                                        <p className="text-sm" style={{ color: colors.textMuted }}>{account.subtype}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-normal" style={{ color: colors.textDark }}>Code</p>
                                    <p className="text-sm" style={{ color: colors.textMuted }}>{account.code}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6 pb-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-normal" style={{ color: colors.textDark }}>Account Name</p>
                                        <p className="text-sm" style={{ color: colors.textMuted }}>{account.name}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-normal" style={{ color: colors.textDark }}>Description</p>
                                        <p className="text-sm" style={{ color: colors.textMuted }}>{account.description || '-'}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-normal" style={{ color: colors.textDark }}>Account Status</p>
                                        <p className="text-sm" style={{ color: colors.textMuted }}>Active</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-normal" style={{ color: colors.textDark }}>Year to Date</p>
                                        <p className="text-sm tabular-nums" style={{ color: account.balance < 0 ? '#DC2626' : colors.textMuted }}>{formatCurrency(account.balance)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end px-4 py-3" style={{ backgroundColor: colors.background }}>
                            <button type="button" className="px-4 py-2 h-[42px] rounded text-sm font-semibold flex items-center justify-center gap-2 btn-animate" style={{ border: `1px solid ${colors.borderLight}`, color: colors.textDark }}><Icons.edit />Edit</button>
                            <button type="button" className="px-4 py-2 h-[42px] rounded text-sm font-semibold flex items-center justify-center gap-2 btn-animate" style={{ border: `1px solid ${colors.borderLight}`, color: colors.textDark }}><Icons.delete />Delete</button>
                        </div>
                    </Dialog.Popup>
                </ModalWrap>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

// Connect Bank Dialog
function ConnectBankDialog({ isOpen, onOpenChange, account }: { isOpen: boolean; onOpenChange: (v: boolean) => void; account: Account | null }) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 z-50 animate-[fadeIn_0.2s]" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} />
                <ModalWrap>
                    <Dialog.Popup className="bg-white rounded-xl shadow-2xl overflow-hidden" style={{ width: 400 }}>
                        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                            <Dialog.Title className="text-lg font-semibold" style={{ color: colors.textDark }}>Connect Bank Account</Dialog.Title>
                            <Dialog.Close className="p-1 rounded-lg transition-colors hover:bg-gray-100 btn-animate" style={{ color: colors.textMuted }}><Icons.x /></Dialog.Close>
                        </div>
                        <div className="p-6">
                            <p className="text-sm mb-4" style={{ color: colors.textMuted }}>Connect <strong style={{ color: colors.textDark }}>{account?.name}</strong> to your bank for automatic transaction sync.</p>
                            <div className="space-y-2">
                                {['BCA', 'Mandiri', 'BNI', 'BRI', 'CIMB Niaga'].map(bank => (
                                    <button key={bank} type="button" onClick={() => onOpenChange(false)} className="w-full flex items-center gap-4 p-3 rounded-lg btn-animate group" style={{ border: `1px solid ${colors.border}` }}>
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors group-hover:bg-blue-50" style={{ backgroundColor: colors.background, color: colors.textMuted }}>{bank.substring(0, 2)}</div>
                                        <span className="font-medium transition-colors group-hover:text-blue-600" style={{ color: colors.textDark }}>{bank}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Dialog.Popup>
                </ModalWrap>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

// Account Type Badge
function TypeBadge({ type }: { type: Account['type'] }) {
    const styles: Record<Account['type'], { bg: string; text: string }> = {
        Assets: { bg: '#E8F5E9', text: '#2E7D32' },
        Liabilities: { bg: '#FFEBEE', text: '#C62828' },
        Equity: { bg: '#F3E5F5', text: '#7B1FA2' },
        Revenue: { bg: '#E3F2FD', text: '#1565C0' },
        Expenses: { bg: '#FFF3E0', text: '#EF6C00' },
    };
    return (
        <span className="px-2.5 py-1 text-xs font-medium rounded-md" style={{ backgroundColor: styles[type].bg, color: styles[type].text }}>
            {type}
        </span>
    );
}

// Main Layout
export default function HarmoniLayout(props: any) {
    const { page } = props;
    const { title } = page;

    const [accounts, setAccounts] = React.useState<Account[]>(CHART_OF_ACCOUNTS);
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filterType, setFilterType] = React.useState<string>('all');
    const [sortConfig, setSortConfig] = React.useState<SortConfig>(null);
    const [showNewAccountDialog, setShowNewAccountDialog] = React.useState(false);
    const [showConnectBankDialog, setShowConnectBankDialog] = React.useState(false);
    const [viewAccount, setViewAccount] = React.useState<Account | null>(null);
    const [selectedAccount, setSelectedAccount] = React.useState<Account | null>(null);
    const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

    const filteredAccounts = accounts.filter(acc => {
        const matchesSearch = acc.name.toLowerCase().includes(searchQuery.toLowerCase()) || acc.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || acc.type === filterType;
        return matchesSearch && matchesType;
    });

    const sortedAccounts = React.useMemo(() => {
        if (!sortConfig) return filteredAccounts;
        const sorted = [...filteredAccounts].sort((a, b) => {
            const key = sortConfig.key;
            if (key === 'code') return (a.code.localeCompare(b.code)) * (sortConfig.dir === 'asc' ? 1 : -1);
            if (key === 'name') return (a.name.localeCompare(b.name)) * (sortConfig.dir === 'asc' ? 1 : -1);
            if (key === 'type') return (a.type.localeCompare(b.type)) * (sortConfig.dir === 'asc' ? 1 : -1);
            if (key === 'status') return 0; // all Active
            if (key === 'balance') return (a.balance - b.balance) * (sortConfig.dir === 'asc' ? 1 : -1);
            return 0;
        });
        return sorted;
    }, [filteredAccounts, sortConfig]);

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

    return (
        <div className="min-h-screen" style={{ backgroundColor: colors.white, fontFamily: "'DM Sans', sans-serif" }}>
            {/* CSS with subtle animations */}
            <style jsx global>{`

                /* Base animations */
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
                @keyframes modalScaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
                @keyframes checkPop { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
                @keyframes ripple { 0% { transform: scale(0); opacity: 0.5; } 100% { transform: scale(2.5); opacity: 0; } }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
                @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

                /* Button interactions */
                .btn-animate {
                    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                .btn-animate:hover { transform: translateY(-1px); box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                .btn-animate:active { transform: translateY(0) scale(0.98); }

                /* Primary button glow */
                .btn-primary:hover { box-shadow: 0 4px 12px rgba(32, 136, 255, 0.3); }

                /* Row hover effect */
                .row-hover {
                    transition: all 0.15s ease;
                }
                .row-hover:hover {
                    background-color: #F8FAFC !important;
                }

                /* Menu item animation */
                .menu-item {
                    transition: all 0.15s ease;
                }
                .menu-item:hover {
                    background-color: rgba(32, 136, 255, 0.08);
                }
                .menu-item:active {
                    transform: scale(0.98);
                }

                /* Checkbox animation */
                .checkbox-animate [data-indicator] {
                    animation: checkPop 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Input focus animation */
                .input-animate {
                    transition: all 0.2s ease;
                }
                .input-animate:focus {
                    border-color: #2088FF !important;
                    box-shadow: 0 0 0 3px rgba(32, 136, 255, 0.15);
                }

                /* Tab underline animation */
                .tab-animate {
                    position: relative;
                    transition: color 0.2s ease;
                }
                .tab-animate::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    width: 0;
                    height: 3px;
                    background: #2088FF;
                    transition: all 0.2s ease;
                    transform: translateX(-50%);
                }
                .tab-animate[data-active="true"]::after {
                    width: 100%;
                }

                /* Badge animation */
                .badge-animate {
                    transition: all 0.2s ease;
                }
                .badge-animate:hover {
                    transform: scale(1.05);
                }

                /* Sidebar menu animation */
                .sidebar-item {
                    transition: all 0.15s ease;
                    position: relative;
                }
                .sidebar-item:hover {
                    background-color: rgba(32, 136, 255, 0.08);
                }
                .sidebar-item:active {
                    transform: scale(0.98);
                }
                .sidebar-item[data-active="true"] {
                    animation: slideUp 0.2s ease;
                }

                /* Select dropdown animation */
                .select-popup {
                    animation: slideDown 0.15s ease;
                }

                /* Popover animation */
                .popover-animate {
                    animation: scaleIn 0.15s ease;
                    transform-origin: top left;
                }

                /* Connected badge pulse */
                .connected-badge {
                    animation: pulse 2s infinite;
                }

                /* Table sort icon rotation */
                .sort-icon {
                    transition: transform 0.2s ease;
                }
                .sort-icon[data-dir="desc"] {
                    transform: rotate(180deg);
                }
            `}</style>

            <Sidebar activeSection="chart-of-accounts" collapsed={sidebarCollapsed} />

            {/* Header - Chart of Accounts only (no "Harmoni Dashboard" per Figma) */}
            <header className={`fixed top-0 ${sidebarCollapsed ? 'left-[72px]' : 'left-[202px]'} right-0 z-30 transition-all duration-300`} style={{ backgroundColor: colors.white }}>
                <div className="px-4 py-3 flex items-center gap-4" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                    {/* Hide Sidebar Button */}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="p-2 rounded-lg btn-animate"
                        style={{ backgroundColor: 'transparent' }}
                    >
                        <Icons.hide className="" />
                    </button>

                    {/* Title - always "Chart of Accounts" to match Figma */}
                    <h1 className="text-lg font-bold" style={{ color: colors.textDark }}>Chart of Accounts</h1>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* New Account Button */}
                    <button onClick={() => setShowNewAccountDialog(true)} className="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold text-white btn-animate btn-primary" style={{ backgroundColor: colors.primary }}>
                        <Icons.plus className="" />
                        New Account
                    </button>
                </div>
            </header>

            {/* Main content area - white per Figma */}
            <main className={`${sidebarCollapsed ? 'ml-[72px]' : 'ml-[202px]'} pt-[60px] min-h-screen transition-all duration-300`} style={{ backgroundColor: colors.white }}>
                <div className="p-4">
                    {/* Single wrapper: tabs + filter + table in one box (Figma 181:1169 - border-radius 8px, stroke) */}
                    <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${colors.borderLight}`, backgroundColor: colors.white }}>
                        {/* Top row: Tabs + Search + Filter By (gray only behind this row; no extra strip below blue line) */}
                        <div className="flex items-stretch justify-between gap-4 pr-4 pb-0" style={{ backgroundColor: colors.background }}>
                            <div className="flex gap-1 items-center">
                                {(['all', 'Assets', 'Liabilities', 'Equity', 'Expenses', 'Revenue'] as const).map(tab => {
                                    const label = tab === 'all' ? 'All' : tab === 'Assets' ? 'Asset' : tab === 'Liabilities' ? 'Liabilities' : tab === 'Equity' ? 'Equity' : tab === 'Expenses' ? 'Expense' : 'Revenue';
                                    const isActive = filterType === tab;
                                    return (
                                        <button
                                            key={tab}
                                            onClick={() => setFilterType(tab)}
                                            data-active={isActive}
                                            className="py-4 text-sm flex items-center justify-center outline-none min-w-[80px] tab-animate"
                                            style={{
                                                color: isActive ? colors.primary : colors.textLight,
                                                fontWeight: isActive ? 600 : 400,
                                            }}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <div className="relative">
                                    <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textLighter }} />
                                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search" className="pl-10 pr-3 py-2 w-[228px] rounded text-sm outline-none input-animate" style={{ border: `1px solid ${colors.borderLight}`, color: colors.textDark }} />
                                </div>
                                <Menu.Root>
                                    <Menu.Trigger className="flex items-center gap-2 px-3 py-2 rounded text-sm outline-none btn-animate" style={{ border: `1px solid ${colors.borderLight}`, color: colors.textDark }}>
                                        Filter By <Icons.arrowDown className="" />
                                    </Menu.Trigger>
                                    <Menu.Portal>
                                        <Menu.Positioner>
                                            <Menu.Popup className="bg-white rounded-lg shadow-lg py-1 min-w-[160px] popover-animate" style={{ border: `1px solid ${colors.borderLight}` }}>
                                                <Menu.Item className="px-4 py-2.5 text-sm cursor-pointer menu-item" style={{ color: colors.textDark }}>
                                                    Bank Connected
                                                </Menu.Item>
                                                <Menu.Item className="px-4 py-2.5 text-sm cursor-pointer menu-item" style={{ color: colors.textDark }}>
                                                    Has Balance
                                                </Menu.Item>
                                                <Menu.Item className="px-4 py-2.5 text-sm cursor-pointer menu-item" style={{ color: colors.textDark }}>
                                                    Locked Only
                                                </Menu.Item>
                                            </Menu.Popup>
                                        </Menu.Positioner>
                                    </Menu.Portal>
                                </Menu.Root>
                            </div>
                        </div>

                        {/* Table - compact rows (py-2 = 8px), Year to Date right-aligned */}
                        <table className="w-full">
                            <thead>
                                <tr style={{ borderBottom: `1px solid ${colors.borderLight}`, backgroundColor: colors.white }}>
                                    <th className="w-[51px] py-2 px-4"></th>
                                    <th className="text-left py-2 px-4" style={{ width: 101 }}>
                                        <SortHeader label="Code" sortKey="code" currentSort={sortConfig} onSort={setSortConfig} />
                                    </th>
                                    <th className="text-left py-2 px-4">
                                        <SortHeader label="Name" sortKey="name" currentSort={sortConfig} onSort={setSortConfig} />
                                    </th>
                                    <th className="text-left py-2 px-4">
                                        <SortHeader label="Type" sortKey="type" currentSort={sortConfig} onSort={setSortConfig} />
                                    </th>
                                    <th className="text-left py-2 px-4 w-[110px]">
                                        <SortHeader label="Status" sortKey="status" currentSort={sortConfig} onSort={setSortConfig} />
                                    </th>
                                    <th className="text-right py-2 px-4 w-[140px]">
                                        <SortHeader label="Year to Date" sortKey="balance" currentSort={sortConfig} onSort={setSortConfig} alignRight />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedAccounts.map((account, idx) => (
                                    <tr key={account.id} className="row-hover cursor-pointer" style={{ borderBottom: idx < sortedAccounts.length - 1 ? `1px solid ${colors.borderLight}` : 'none' }} onClick={() => setViewAccount(account)}>
                                        <td className="py-2 px-4 w-[51px] align-middle text-center" onClick={e => e.stopPropagation()}>
                                            {account.locked ? (
                                                <Icons.lock className="inline-block" style={{ color: colors.textLight }} />
                                            ) : (
                                                <Checkbox.Root
                                                    checked={selectedIds.has(account.id)}
                                                    onCheckedChange={() => toggleSelect(account.id)}
                                                    className="w-4 h-4 rounded flex items-center justify-center transition-all checkbox-animate"
                                                    style={{
                                                        border: selectedIds.has(account.id) ? 'none' : `2px solid ${colors.border}`,
                                                        backgroundColor: selectedIds.has(account.id) ? colors.primary : 'transparent',
                                                    }}
                                                >
                                                    <Checkbox.Indicator className="text-white">
                                                        <Icons.check />
                                                    </Checkbox.Indicator>
                                                </Checkbox.Root>
                                            )}
                                        </td>
                                        <td className="py-2 px-4 align-top" style={{ width: 101 }}>
                                            <span className="text-sm font-mono leading-tight" style={{ color: colors.textDark }}>{account.code}</span>
                                        </td>
                                        <td className="py-2 px-4 align-top">
                                            <span className="text-sm font-normal leading-tight transition-colors" style={{ color: colors.primary }}>{account.name}</span>
                                            {account.description && <p className="text-xs mt-0.5 leading-snug" style={{ color: colors.textMuted }}>{account.description}</p>}
                                        </td>
                                        <td className="py-2 px-4 align-top"><span className="text-sm leading-tight" style={{ color: colors.textDark }}>{account.type}</span></td>
                                        <td className="py-2 px-4 align-top">
                                            <span className="inline-flex items-center justify-center px-3 py-0.5 rounded-2xl text-sm font-normal badge-animate connected-badge" style={{ backgroundColor: colors.successBg, color: colors.success }}>
                                                Active
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 text-right align-top w-[140px]">
                                            <span className="text-sm font-normal tabular-nums" style={{ color: account.balance < 0 ? '#DC2626' : colors.textDark }}>
                                                {formatCurrency(account.balance)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {sortedAccounts.length === 0 && (
                            <div className="py-12 text-center" style={{ color: colors.textMuted }}>
                                <p className="text-base font-medium">No accounts found</p>
                                <p className="text-sm mt-1">Try adjusting your search or filter</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4 text-sm" style={{ color: colors.textMuted }}>
                        <span>Show 10 Data per page</span>
                        <div className="flex items-center gap-1">
                            <button className="px-3 py-1.5 rounded-lg btn-animate disabled:opacity-50" style={{ border: `1px solid ${colors.border}` }} disabled>Previous</button>
                            <button className="px-3 py-1.5 rounded-lg text-white btn-animate btn-primary" style={{ backgroundColor: colors.primary }}>1</button>
                            <button className="px-3 py-1.5 rounded-lg btn-animate disabled:opacity-50" style={{ border: `1px solid ${colors.border}` }} disabled>Next</button>
                        </div>
                    </div>
                </div>
            </main>

            <NewAccountDialog isOpen={showNewAccountDialog} onOpenChange={setShowNewAccountDialog} onAdd={handleAddAccount} />
            <ViewAccountDialog account={viewAccount} onClose={() => setViewAccount(null)} onConnectBank={(a) => { setSelectedAccount(a); setViewAccount(null); setShowConnectBankDialog(true); }} />
            <ConnectBankDialog isOpen={showConnectBankDialog} onOpenChange={setShowConnectBankDialog} account={selectedAccount} />
        </div>
    );
}
