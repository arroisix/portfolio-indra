'use client';
import * as React from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Checkbox } from '@base-ui/react/checkbox';

// Figma Design Tokens
const colors = {
    primary: '#2088FF',
    primaryHover: '#1a6fd9',
    background: '#F5F7FA',
    white: '#FFFFFF',
    textDark: '#090A0B',
    textMuted: '#637D92',
    textLight: '#7991A4',
    textLighter: '#92A5B5',
    border: '#DAE1E7',
    borderLight: '#E7EBEF',
    success: '#0B7B69',
    successBg: '#CFFFF7',
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

// Icons (from Figma design)
const Icons: Record<string, React.FC<{ className?: string; active?: boolean }>> = {
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
    show: ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M5 5.77778C5 5.34822 5.34822 5 5.77778 5H8L8 19H5.77778C5.34822 19 5 18.6518 5 18.2222V5.77778ZM10 19L10 5H18.2222C18.6518 5 19 5.34822 19 5.77778V18.2222C19 18.6518 18.6518 19 18.2222 19H10ZM9 21H5.77778C4.24365 21 3 19.7563 3 18.2222V5.77778C3 4.24365 4.24365 3 5.77778 3H9H18.2222C19.7563 3 21 4.24365 21 5.77778V18.2222C21 19.7563 19.7563 21 18.2222 21H9Z" fill={colors.textMuted}/></svg>,
    home: ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 10l9-7 9 7v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9z" stroke={colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke={colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
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

// Sidebar
function Sidebar({ activeSection, collapsed, onToggle }: { activeSection: string; collapsed: boolean; onToggle: () => void }) {
    return (
        <aside className={`${collapsed ? 'w-[72px]' : 'w-[240px]'} bg-white flex flex-col h-screen fixed left-0 top-0 z-40 transition-all duration-300`} style={{ borderRight: `1px solid ${colors.border}` }}>
            {/* Logo */}
            <div className="p-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                <HarmoniLogo collapsed={collapsed} />
            </div>

            {/* Company Selector */}
            <div className="p-3">
                <CompanyDropdown collapsed={collapsed} />
            </div>

            {/* Create New Button */}
            {!collapsed && (
                <div className="px-3 mb-2">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: colors.primary }}>
                        <Icons.plus className="" />
                        Create New...
                    </button>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-3 py-2 overflow-y-auto">
                {MENU_ITEMS.map(item => {
                    const Icon = Icons[item.icon] || Icons.dashboard;
                    const isActive = activeSection === item.id;
                    return (
                        <button
                            key={item.id}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 mb-0.5`}
                            style={{
                                backgroundColor: isActive ? colors.primary : 'transparent',
                                color: isActive ? colors.white : colors.textMuted,
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
            </nav>

            {/* Bottom Actions */}
            <div className="p-3" style={{ borderTop: `1px solid ${colors.borderLight}` }}>
                <button onClick={onToggle} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-gray-50" style={{ color: colors.textMuted }}>
                    {collapsed ? <Icons.show className="" /> : <Icons.hide className="" />}
                    {!collapsed && <span>Hide Sidebar</span>}
                </button>
                <a href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-gray-50" style={{ color: colors.textMuted }}>
                    <Icons.home className="" />
                    {!collapsed && <span>Back to Portfolio</span>}
                </a>
            </div>
        </aside>
    );
}

// Tab Bar
function TabBar() {
    return (
        <div className="flex items-center gap-1 px-1 py-1 rounded-lg" style={{ backgroundColor: colors.background }}>
            <button className="px-4 py-2 rounded-md text-sm font-medium text-white" style={{ backgroundColor: colors.primary }}>
                Chart of Accounts
            </button>
            <button className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white" style={{ color: colors.textMuted }}>
                Locked Accounts
            </button>
        </div>
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
                <Dialog.Backdrop className="fixed inset-0 z-50 animate-[fadeIn_0.2s]" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} />
                <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl w-[480px] z-50 animate-[scaleIn_0.2s] overflow-hidden">
                    <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                        <Dialog.Title className="text-lg font-semibold" style={{ color: colors.textDark }}>New Account</Dialog.Title>
                        <Dialog.Close className="p-1 rounded-lg transition-colors hover:bg-gray-100" style={{ color: colors.textMuted }}><Icons.x /></Dialog.Close>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: colors.textDark }}>Account Name</label>
                            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg text-sm transition-all outline-none" style={{ border: `1px solid ${colors.border}`, color: colors.textDark }} placeholder="e.g. Office Supplies" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5" style={{ color: colors.textDark }}>Account Type</label>
                                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value as Account['type'] })} className="w-full px-4 py-2.5 rounded-lg text-sm bg-white transition-all outline-none" style={{ border: `1px solid ${colors.border}`, color: colors.textDark }}>
                                    {ACCOUNT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5" style={{ color: colors.textDark }}>Account Code</label>
                                <input type="text" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} className="w-full px-4 py-2.5 rounded-lg text-sm transition-all outline-none" style={{ border: `1px solid ${colors.border}`, color: colors.textDark }} placeholder="Auto-generated" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: colors.textDark }}>Description (Optional)</label>
                            <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={2} className="w-full px-4 py-2.5 rounded-lg text-sm transition-all outline-none resize-none" style={{ border: `1px solid ${colors.border}`, color: colors.textDark }} placeholder="Brief description of this account" />
                        </div>
                    </div>
                    <div className="px-6 py-4 flex justify-end gap-3" style={{ borderTop: `1px solid ${colors.borderLight}` }}>
                        <Dialog.Close className="px-4 py-2.5 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100" style={{ color: colors.textMuted, border: `1px solid ${colors.border}` }}>Cancel</Dialog.Close>
                        <button onClick={handleSubmit} className="px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-colors hover:opacity-90" style={{ backgroundColor: colors.primary }}>Create Account</button>
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
                <Dialog.Backdrop className="fixed inset-0 z-50 animate-[fadeIn_0.2s]" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} />
                <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl w-[400px] z-50 animate-[scaleIn_0.2s] overflow-hidden">
                    <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                        <Dialog.Title className="text-lg font-semibold" style={{ color: colors.textDark }}>Connect Bank Account</Dialog.Title>
                        <Dialog.Close className="p-1 rounded-lg transition-colors hover:bg-gray-100" style={{ color: colors.textMuted }}><Icons.x /></Dialog.Close>
                    </div>
                    <div className="p-6">
                        <p className="text-sm mb-4" style={{ color: colors.textMuted }}>Connect <strong style={{ color: colors.textDark }}>{account?.name}</strong> to your bank for automatic transaction sync.</p>
                        <div className="space-y-2">
                            {['BCA', 'Mandiri', 'BNI', 'BRI', 'CIMB Niaga'].map(bank => (
                                <button key={bank} className="w-full flex items-center gap-4 p-3 rounded-lg transition-all hover:border-blue-300" style={{ border: `1px solid ${colors.border}` }}>
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold" style={{ backgroundColor: colors.background, color: colors.textMuted }}>{bank.substring(0, 2)}</div>
                                    <span className="font-medium" style={{ color: colors.textDark }}>{bank}</span>
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
    const [showNewAccountDialog, setShowNewAccountDialog] = React.useState(false);
    const [showConnectBankDialog, setShowConnectBankDialog] = React.useState(false);
    const [selectedAccount, setSelectedAccount] = React.useState<Account | null>(null);
    const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

    const filteredAccounts = accounts.filter(acc => {
        const matchesSearch = acc.name.toLowerCase().includes(searchQuery.toLowerCase()) || acc.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || acc.type === filterType;
        return matchesSearch && matchesType;
    });

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
        <div className="min-h-screen font-['Inter',sans-serif]" style={{ backgroundColor: colors.background }}>
            {/* CSS */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
            `}</style>

            <Sidebar activeSection="chart-of-accounts" collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

            {/* Header */}
            <header className={`fixed top-0 ${sidebarCollapsed ? 'left-[72px]' : 'left-[240px]'} right-0 bg-white z-30 transition-all duration-300`} style={{ borderBottom: `1px solid ${colors.border}` }}>
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <h1 className="text-lg font-semibold" style={{ color: colors.textDark }}>{title}</h1>
                        <TabBar />
                    </div>
                    <button onClick={() => setShowNewAccountDialog(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90" style={{ backgroundColor: colors.primary }}>
                        <Icons.plus className="" />
                        New Account
                    </button>
                </div>
            </header>

            <main className={`${sidebarCollapsed ? 'ml-[72px]' : 'ml-[240px]'} pt-[72px] min-h-screen transition-all duration-300`}>
                <div className="p-6">
                    {/* Filters */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textLight }} />
                                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search accounts..." className="pl-10 pr-4 py-2.5 w-64 rounded-lg text-sm outline-none transition-all" style={{ border: `1px solid ${colors.border}`, color: colors.textDark }} />
                            </div>
                            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-4 py-2.5 rounded-lg text-sm bg-white outline-none transition-all" style={{ border: `1px solid ${colors.border}`, color: colors.textDark }}>
                                <option value="all">All Types</option>
                                {ACCOUNT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <p className="text-sm" style={{ color: colors.textMuted }}>Showing {filteredAccounts.length} of {accounts.length}</p>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl overflow-hidden" style={{ border: `1px solid ${colors.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <table className="w-full">
                            <thead>
                                <tr style={{ borderBottom: `1px solid ${colors.borderLight}`, backgroundColor: colors.background }}>
                                    <th className="w-12 py-3 px-4"></th>
                                    <th className="text-left py-3 px-4">
                                        <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textMuted }}>
                                            Code <Icons.sort />
                                        </div>
                                    </th>
                                    <th className="text-left py-3 px-4">
                                        <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textMuted }}>
                                            Account Name <Icons.sort />
                                        </div>
                                    </th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textMuted }}>Type</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textMuted }}>Subtype</th>
                                    <th className="text-right py-3 px-4">
                                        <div className="flex items-center justify-end gap-1 text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textMuted }}>
                                            Balance <Icons.sort />
                                        </div>
                                    </th>
                                    <th className="text-center py-3 px-4 w-28 text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textMuted }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAccounts.map((account, idx) => (
                                    <tr key={account.id} className="transition-colors hover:bg-gray-50/50" style={{ borderBottom: idx < filteredAccounts.length - 1 ? `1px solid ${colors.borderLight}` : 'none' }}>
                                        <td className="py-3 px-4">
                                            <Checkbox.Root checked={selectedIds.has(account.id)} onCheckedChange={() => toggleSelect(account.id)} className="w-4 h-4 rounded flex items-center justify-center transition-all" style={{ border: selectedIds.has(account.id) ? 'none' : `2px solid ${colors.border}`, backgroundColor: selectedIds.has(account.id) ? colors.primary : 'transparent' }}>
                                                <Checkbox.Indicator className="text-white"><Icons.check /></Checkbox.Indicator>
                                            </Checkbox.Root>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-sm font-mono" style={{ color: colors.textLight }}>{account.code}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium" style={{ color: colors.textDark }}>{account.name}</span>
                                                {account.locked && <Icons.lock className="" style={{ color: colors.textLight }} />}
                                            </div>
                                            {account.description && <p className="text-xs mt-0.5" style={{ color: colors.textLight }}>{account.description}</p>}
                                        </td>
                                        <td className="py-3 px-4"><TypeBadge type={account.type} /></td>
                                        <td className="py-3 px-4"><span className="text-sm" style={{ color: colors.textMuted }}>{account.subtype}</span></td>
                                        <td className="py-3 px-4 text-right">
                                            <span className="text-sm font-medium tabular-nums" style={{ color: account.balance < 0 ? '#DC2626' : colors.textDark }}>
                                                {formatCurrency(account.balance)}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {account.bankConnected ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium" style={{ backgroundColor: colors.successBg, color: colors.success }}>
                                                    <Icons.link /> Connected
                                                </span>
                                            ) : (
                                                <button onClick={() => handleConnectBank(account)} className="px-2 py-1 rounded-md text-xs font-medium transition-colors hover:bg-blue-50" style={{ color: colors.primary, border: `1px solid ${colors.border}` }}>
                                                    Connect
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredAccounts.length === 0 && (
                            <div className="py-16 text-center" style={{ color: colors.textMuted }}>
                                <p className="text-lg font-medium">No accounts found</p>
                                <p className="text-sm mt-1">Try adjusting your search or filter</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4 text-sm" style={{ color: colors.textMuted }}>
                        <span>Page 1 of 1</span>
                        <div className="flex items-center gap-1">
                            <button className="px-3 py-1.5 rounded-lg transition-colors hover:bg-white disabled:opacity-50" style={{ border: `1px solid ${colors.border}` }} disabled>Previous</button>
                            <button className="px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: colors.primary }}>1</button>
                            <button className="px-3 py-1.5 rounded-lg transition-colors hover:bg-white disabled:opacity-50" style={{ border: `1px solid ${colors.border}` }} disabled>Next</button>
                        </div>
                    </div>
                </div>
            </main>

            <NewAccountDialog isOpen={showNewAccountDialog} onOpenChange={setShowNewAccountDialog} onAdd={handleAddAccount} />
            <ConnectBankDialog isOpen={showConnectBankDialog} onOpenChange={setShowConnectBankDialog} account={selectedAccount} />
        </div>
    );
}
