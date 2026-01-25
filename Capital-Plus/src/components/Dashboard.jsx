// ============================================
// DASHBOARD COMPONENT
// ============================================
// This is the main home page that shows:
// - Welcome message and hero section
// - Financial overview cards
// - Monthly income and expenses
// - Recent transactions
// - Budget tracker with notifications
// - Currency exchange calculator
// - Quick actions
// - Spending summary
// ============================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Wallet, 
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  BarChart3
} from 'lucide-react';
import Navbar from './Navbar';
import TransactionCard from './TransactionCard';
import ExchangeCard from './ExchangeCard';
import BudgetTracker from './BudgetTracker';
import TransactionModal from './TransactionModal';
import SpendingCharts from './SpendingCharts';
import FinancialGoals from './FinancialGoals';
import FinancialHealthScore from './FinancialHealthScore';
import AIFinancialInsights from './AIFinancialInsights';
import AccountManager from './AccountManager';
import SubscriptionManager from './SubscriptionManager';
import AccountInsights from './AccountInsights';
import QuickTips from './QuickTips';
import RecentActivity from './RecentActivity';
import UpcomingBills from './UpcomingBills';

export default function Dashboard() {
  // ============================================
  // STATE VARIABLES
  // ============================================

  // Multiple accounts
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: 'Main Checking',
      type: 'checking',
      balance: 4500.00,
      accountNumber: '1234567890',
      bankName: 'Capital Bank'
    },
    {
      id: 2,
      name: 'Savings Account',
      type: 'savings',
      balance: 8000.00,
      accountNumber: '9876543210',
      bankName: 'Capital Bank'
    },
    {
      id: 3,
      name: 'Credit Card',
      type: 'credit',
      balance: -1200.00,
      accountNumber: '5555123456',
      bankName: 'Capital Plus Card'
    }
  ]);

  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id || null);

  // Get selected account
  const selectedAccount = accounts.find(a => a.id === selectedAccountId) || accounts[0];

  // Calculate aggregated financial data from all accounts
  const calculateFinancialData = () => {
    const totalBalance = accounts.reduce((sum, acc) => sum + (acc.type === 'credit' ? -Math.abs(acc.balance) : acc.balance), 0);
    const savings = accounts.filter(a => a.type === 'savings').reduce((sum, a) => sum + a.balance, 0);
    const investments = accounts.filter(a => a.type === 'investment').reduce((sum, a) => sum + a.balance, 0);
    const checking = accounts.filter(a => a.type === 'checking').reduce((sum, a) => sum + a.balance, 0);
    
    return {
      totalBalance: totalBalance,
      monthlyIncome: 5000.00, // Can be updated from transactions
      monthlyExpenses: 3200.00, // Can be updated from transactions
      savings: savings,
      investments: investments,
      availableBalance: checking
    };
  };

  // Calculate financial data from accounts
  const financialData = React.useMemo(() => calculateFinancialData(), [accounts]);

  // Spending categories with amounts (for budget tracking)
  const [spendingCategories, setSpendingCategories] = useState([
    { name: 'Housing', amount: 1200, percentage: 37.5, trend: 'stable' },
    { name: 'Food', amount: 800, percentage: 25.0, trend: 'up' },
    { name: 'Transportation', amount: 600, percentage: 18.8, trend: 'down' },
    { name: 'Entertainment', amount: 400, percentage: 12.5, trend: 'up' },
    { name: 'Utilities', amount: 200, percentage: 6.2, trend: 'stable' }
  ]);

  // List of recent money transactions to display
  const [transactionList, setTransactionList] = useState([
    { id: 1, name: 'Joel Kenley', amount: -68.00, type: 'Payment', date: '2024-01-20', category: 'Entertainment' },
    { id: 2, name: 'Mark Smith', amount: -120.00, type: 'Transfer', date: '2024-01-19', category: 'Food' },
    { id: 3, name: 'YourBank', amount: -68.00, type: 'Transaction', date: '2024-01-18', category: 'Utilities' },
    { id: 4, name: 'Salary Deposit', amount: 5000.00, type: 'Income', date: '2024-01-15', category: 'Income' }
  ]);

  // Modal states for Quick Actions
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // ============================================
  // FUNCTIONS
  // ============================================

  // Add a new transaction (legacy function for the + button)
  const addTransaction = () => {
    setIsExpenseModalOpen(true);
  };

  // Handle saving income transaction
  const handleSaveIncome = (transactionData) => {
    const newTransaction = {
      id: transactionList.length + 1,
      name: transactionData.description,
      amount: transactionData.amount,
      type: 'Income',
      date: transactionData.date,
      category: transactionData.category,
      accountId: selectedAccountId
    };
    
    setTransactionList([newTransaction, ...transactionList]);
    
    // Update selected account balance
    if (selectedAccountId) {
      setAccounts(accounts.map(acc => 
        acc.id === selectedAccountId 
          ? { ...acc, balance: acc.balance + transactionData.amount }
          : acc
      ));
    }
  };

  // Handle saving expense transaction
  const handleSaveExpense = (transactionData) => {
    const newTransaction = {
      id: transactionList.length + 1,
      name: transactionData.description,
      amount: -transactionData.amount, // Negative for expenses
      type: 'Expense',
      date: transactionData.date,
      category: transactionData.category,
      accountId: selectedAccountId
    };
    
    setTransactionList([newTransaction, ...transactionList]);
    
    // Update selected account balance
    if (selectedAccountId) {
      setAccounts(accounts.map(acc => 
        acc.id === selectedAccountId 
          ? { ...acc, balance: acc.balance - transactionData.amount }
          : acc
      ));
    }

    // Update spending category
    const category = transactionData.category || 'Other';
    updateSpendingCategory(category, transactionData.amount);
  };

  // Handle saving transfer transaction
  const handleSaveTransfer = (transactionData) => {
    const newTransaction = {
      id: transactionList.length + 1,
      name: transactionData.description || `Transfer to ${transactionData.recipient || 'Account'}`,
      amount: -transactionData.amount, // Negative for transfers (money going out)
      type: 'Transfer',
      date: transactionData.date,
      category: transactionData.category || 'Transfer',
      accountId: selectedAccountId
    };
    
    setTransactionList([newTransaction, ...transactionList]);
    
    // Update accounts (transfer from selected to savings account)
    if (selectedAccountId) {
      const savingsAccount = accounts.find(a => a.type === 'savings');
      if (savingsAccount) {
        setAccounts(accounts.map(acc => 
          acc.id === selectedAccountId
            ? { ...acc, balance: acc.balance - transactionData.amount }
            : acc.id === savingsAccount.id
            ? { ...acc, balance: acc.balance + transactionData.amount }
            : acc
        ));
      }
    }
  };

  // Update spending category amount
  const updateSpendingCategory = (categoryName, amount) => {
    setSpendingCategories(prev => {
      const categoryExists = prev.find(cat => cat.name === categoryName);
      
      // Calculate new total expenses for percentage calculation
      const newTotal = prev.reduce((sum, cat) => {
        if (cat.name === categoryName) {
          return sum + (cat.amount + amount);
        }
        return sum + cat.amount;
      }, 0);
      
      if (categoryExists) {
        // Update existing category
        return prev.map(cat => 
          cat.name === categoryName 
            ? { 
                ...cat, 
                amount: cat.amount + amount,
                percentage: newTotal > 0 ? ((cat.amount + amount) / newTotal * 100).toFixed(1) : 0
              }
            : {
                ...cat,
                percentage: newTotal > 0 ? (cat.amount / newTotal * 100).toFixed(1) : 0
              }
        );
      } else {
        // Add new category if it doesn't exist
        const newTotalWithNew = newTotal + amount;
        return [
          ...prev.map(cat => ({
            ...cat,
            percentage: newTotalWithNew > 0 ? (cat.amount / newTotalWithNew * 100).toFixed(1) : 0
          })),
          {
            name: categoryName,
            amount: amount,
            percentage: newTotalWithNew > 0 ? (amount / newTotalWithNew * 100).toFixed(1) : 0,
            trend: 'stable'
          }
        ];
      }
    });
  };

  // Calculate savings rate
  const savingsRate = ((financialData.monthlyIncome - financialData.monthlyExpenses) / financialData.monthlyIncome * 100).toFixed(1);

  // Handle budget update from BudgetTracker
  const handleBudgetUpdate = (newBudgets) => {
    // Budgets are updated in BudgetTracker component
    // This callback can be used to save to backend
    console.log('Budgets updated:', newBudgets);
  };

  // ============================================
  // RENDER (What shows on screen)
  // ============================================
  return (
    <div className="page-bg">
      {/* Top navigation bar */}
      <Navbar />

      {/* Main content container */}
      <div className="page-container">
        
        {/* Page Header with Quick Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`
                text-4xl font-bold mb-2 
                text-gradient
              `}>
                Dashboard
              </h1>
              <p className="text-gray-400">
                Welcome back! Here's your financial overview
              </p>
            </div>
            <Link 
              to="/bank-manager" 
              className={`
                px-4 py-2 
                bg-lime-400/20 
                text-lime-400 
                rounded-lg 
                font-medium 
                hover:bg-lime-400/30 
                transition-all
                flex items-center gap-2
              `}
            >
              <BarChart3 className="w-4 h-4" />
              Bank Manager
            </Link>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-5 h-5 text-lime-400" />
                <span className="text-sm text-gray-400">Total Balance</span>
              </div>
              <p className={`
                text-2xl font-bold 
                text-lime-400
              `}>
                ${financialData.totalBalance.toLocaleString()}
              </p>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUpRight className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-gray-400">This Month</span>
              </div>
              <p className={`
                text-2xl font-bold 
                text-cyan-400
              `}>
                +${financialData.monthlyIncome.toLocaleString()}
              </p>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownRight className="w-5 h-5 text-red-400" />
                <span className="text-sm text-gray-400">Spent</span>
              </div>
              <p className={`
                text-2xl font-bold 
                text-red-400
              `}>
                -${financialData.monthlyExpenses.toLocaleString()}
              </p>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-2">
                <PiggyBank className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-400">Savings Rate</span>
              </div>
              <p className={`
                text-2xl font-bold 
                text-yellow-400
              `}>
                {savingsRate}%
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ============================================
              LEFT SIDEBAR: Accounts & Related Info
              ============================================ */}
          <div className="lg:col-span-1 space-y-6">
            {/* Accounts Manager */}
            <AccountManager
              accounts={accounts}
              onAccountsChange={setAccounts}
              selectedAccountId={selectedAccountId}
              onSelectAccount={setSelectedAccountId}
            />

            {/* Quick Actions - Easy access for adding money */}
            <div className="card bg-gradient-to-br from-lime-400/10 to-cyan-400/10 border-lime-400/30">
              <h3 className={`
                font-semibold text-lg mb-4 
                text-gray-200
              `}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setIsIncomeModalOpen(true)}
                  className={`
                    w-full py-3 px-4 
                    bg-lime-400/20 
                    text-lime-400 
                    rounded-lg 
                    font-medium 
                    hover:bg-lime-400/30 
                    transition-all
                    flex items-center justify-center gap-2
                    hover:scale-105
                  `}
                >
                  <Plus className="w-4 h-4" />
                  Add Income
                </button>
                <button 
                  onClick={() => setIsExpenseModalOpen(true)}
                  className={`
                    w-full py-3 px-4 
                    bg-red-400/20 
                    text-red-400 
                    rounded-lg 
                    font-medium 
                    hover:bg-red-400/30 
                    transition-all
                    flex items-center justify-center gap-2
                    hover:scale-105
                  `}
                >
                  <Minus className="w-4 h-4" />
                  Add Expense
                </button>
                <button 
                  onClick={() => setIsTransferModalOpen(true)}
                  className={`
                    w-full py-3 px-4 
                    bg-cyan-400/20 
                    text-cyan-400 
                    rounded-lg 
                    font-medium 
                    hover:bg-cyan-400/30 
                    transition-all
                    flex items-center justify-center gap-2
                    hover:scale-105
                  `}
                >
                  <ArrowUpRight className="w-4 h-4" />
                  Transfer Money
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <RecentActivity 
              accounts={accounts}
              transactions={transactionList}
            />

            {/* Upcoming Bills */}
            <UpcomingBills />

            {/* Financial Goals */}
            <FinancialGoals 
              currentSavings={financialData.savings}
              onGoalUpdate={(goals) => console.log('Goals updated:', goals)}
            />

            {/* Financial Stats - 3 Little Containers */}
            <div className="grid grid-cols-1 gap-3">
              {/* Monthly Income */}
              <div className="card bg-gradient-to-br from-lime-400/10 to-lime-400/5 border-lime-400/30">
                <p className="text-xs text-gray-400 mb-1">Monthly Income</p>
                <p className="text-xl font-bold text-lime-400">
                  + ${financialData.monthlyIncome.toLocaleString()}
                </p>
              </div>

              {/* Available Balance */}
              <div className="card bg-gradient-to-br from-cyan-400/10 to-cyan-400/5 border-cyan-400/30">
                <p className="text-xs text-gray-400 mb-1">Available</p>
                <p className="text-xl font-bold text-cyan-400">
                  ${financialData.availableBalance.toLocaleString()}
                </p>
              </div>

              {/* Savings */}
              <div className="card bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 border-yellow-400/30">
                <p className="text-xs text-gray-400 mb-1">Savings</p>
                <p className="text-xl font-bold text-yellow-400">
                  ${financialData.savings.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Account Insights - Right underneath Savings */}
            {selectedAccount && (
              <AccountInsights 
                account={selectedAccount}
                financialData={financialData}
              />
            )}

            {/* Subscription Manager - Right underneath Savings */}
            {selectedAccount && (
              <SubscriptionManager 
                accountId={selectedAccountId}
                accountBalance={selectedAccount.balance}
              />
            )}

            {/* Spending Summary - Right underneath Savings */}
            <div className="card">
              <h3 className={`
                font-semibold text-lg mb-4 
                text-gray-200
              `}>
                Spending Summary
              </h3>
              <div className="space-y-3">
                {spendingCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`
                        w-2 h-2 rounded-full
                        ${index === 0 ? 'bg-red-400' : 
                          index === 1 ? 'bg-orange-400' : 
                          index === 2 ? 'bg-yellow-400' : 
                          index === 3 ? 'bg-lime-400' : 
                          'bg-cyan-400'}
                      `}></div>
                      <span className="text-sm text-gray-300">{category.name}</span>
                    </div>
                    <span className={`
                      text-sm font-semibold 
                      text-gray-200
                    `}>
                      ${category.amount}
                    </span>
                  </div>
                ))}
                <div className={`
                  pt-3 mt-3 
                  border-t border-gray-700
                  flex items-center justify-between
                `}>
                  <span className={`
                    font-semibold 
                    text-gray-200
                  `}>
                    Total
                  </span>
                  <span className={`
                    font-bold text-lg 
                    text-red-400
                  `}>
                    ${financialData.monthlyExpenses.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Tips - Right underneath Savings */}
            <QuickTips />
          </div>
          
          {/* ============================================
              MAIN CONTENT: Dashboard Features
              ============================================ */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Selected Account Info */}
            {selectedAccount && (
              <div className={`
                card 
                bg-gradient-to-r 
                from-cyan-400/10 to-lime-400/10 
                border-cyan-400/30
              `}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Selected Account</p>
                    <h3 className={`
                      text-2xl font-bold 
                      text-gray-200
                    `}>
                      {selectedAccount.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {selectedAccount.type.charAt(0).toUpperCase() + selectedAccount.type.slice(1)} • {selectedAccount.bankName || 'Bank'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">Balance</p>
                    <p className={`
                      text-3xl font-bold 
                      ${selectedAccount.balance >= 0 ? 'text-lime-400' : 'text-red-400'}
                    `}>
                      ${selectedAccount.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Savings Rate Card - Simplified */}
            <div className="card relative overflow-hidden">
              {/* Background decoration icon */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <TrendingUp className="w-full h-full text-lime-400" />
              </div>
              
              {/* Card content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Savings Rate</p>
                    <p className={`
                      text-3xl font-bold 
                      text-lime-400
                    `}>
                      {savingsRate}%
                    </p>
                  </div>
                  <div className={`
                    px-4 py-2 
                    bg-lime-400/20 
                    rounded-lg
                  `}>
                    <span className={`
                      text-sm font-medium 
                      text-lime-400
                    `}>
                      Saved
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Tracker Card */}
            <BudgetTracker 
              spendingCategories={spendingCategories}
              onBudgetUpdate={handleBudgetUpdate}
            />

            {/* Financial Health Score - BIGGER, Full Width */}
            <FinancialHealthScore 
              financialData={financialData}
              spendingCategories={spendingCategories}
            />

            {/* AI Financial Insights - BIGGER, Full Width */}
            <AIFinancialInsights 
              financialData={financialData}
              spendingCategories={spendingCategories}
              transactionList={transactionList}
            />

            {/* Spending Charts - BIGGER, Full Width */}
            <SpendingCharts 
              spendingCategories={spendingCategories}
              transactionList={transactionList}
              monthlyExpenses={financialData.monthlyExpenses}
              monthlyIncome={financialData.monthlyIncome}
            />

            {/* Recent Transactions Card */}
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h3 className={`
                  font-semibold text-lg 
                  text-gray-200
                `}>
                  Recent Transactions
                </h3>
                <button
                  onClick={addTransaction}
                  className={`
                    p-2 rounded-lg 
                    bg-lime-400/20 
                    text-lime-400
                    hover:bg-lime-400/30 
                    transition-all
                  `}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <TransactionCard transactions={transactionList} />
            </div>

            {/* Currency Exchange Card - Now supports all currencies and crypto */}
            <ExchangeCard />
          </div>

          {/* ============================================
              RIGHT SIDEBAR: Additional Content
              ============================================ */}
          <div className="lg:col-span-1 space-y-6">
            {/* Right sidebar can be used for additional content if needed */}
          </div>
        </div>
      </div>

      {/* Transaction Modals */}
      <TransactionModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        type="income"
        onSave={handleSaveIncome}
      />
      <TransactionModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        type="expense"
        onSave={handleSaveExpense}
      />
      <TransactionModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        type="transfer"
        onSave={handleSaveTransfer}
      />
    </div>
  );
}
