// ============================================
// ACCOUNT MANAGER COMPONENT
// ============================================
// Manages multiple banking accounts
// Beautiful sliding card interface with hover effects
// ============================================

import React, { useState } from 'react';
import { Plus, X, Edit2, Trash2, Wallet } from 'lucide-react';
import AccountCard from './AccountCard';

export default function AccountManager({ accounts, onAccountsChange, selectedAccountId, onSelectAccount }) {
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [editingAccountId, setEditingAccountId] = useState(null);
  const [newAccount, setNewAccount] = useState({
    name: '',
    type: 'checking',
    balance: 0,
    accountNumber: '',
    bankName: ''
  });

  // Generate random account number
  const generateAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  // Handle add account
  const handleAddAccount = () => {
    if (!newAccount.name) {
      alert('Please enter an account name');
      return;
    }

    const account = {
      id: accounts.length + 1,
      ...newAccount,
      accountNumber: newAccount.accountNumber || generateAccountNumber(),
      balance: parseFloat(newAccount.balance) || 0
    };

    onAccountsChange([...accounts, account]);
    setNewAccount({ name: '', type: 'checking', balance: 0, accountNumber: '', bankName: '' });
    setIsAddingAccount(false);
  };

  // Handle edit account
  const handleEditAccount = (accountId) => {
    const account = accounts.find(a => a.id === accountId);
    if (account) {
      setNewAccount({
        name: account.name,
        type: account.type,
        balance: account.balance,
        accountNumber: account.accountNumber,
        bankName: account.bankName || ''
      });
      setEditingAccountId(accountId);
      setIsAddingAccount(true);
    }
  };

  // Handle update account
  const handleUpdateAccount = () => {
    const updatedAccounts = accounts.map(account =>
      account.id === editingAccountId
        ? {
            ...account,
            ...newAccount,
            balance: parseFloat(newAccount.balance) || 0
          }
        : account
    );
    onAccountsChange(updatedAccounts);
    setIsAddingAccount(false);
    setEditingAccountId(null);
    setNewAccount({ name: '', type: 'checking', balance: 0, accountNumber: '', bankName: '' });
  };

  // Handle delete account
  const handleDeleteAccount = (accountId) => {
    if (confirm('Are you sure you want to delete this account?')) {
      const updatedAccounts = accounts.filter(a => a.id !== accountId);
      onAccountsChange(updatedAccounts);
      if (selectedAccountId === accountId && updatedAccounts.length > 0) {
        onSelectAccount(updatedAccounts[0].id);
      }
    }
  };

  // Calculate total balance
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`
            font-semibold text-lg 
            text-gray-200
          `}>
            My Accounts
          </h3>
          <p className="text-sm text-gray-400">
            Total: ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <button
          onClick={() => {
            setIsAddingAccount(true);
            setEditingAccountId(null);
            setNewAccount({ name: '', type: 'checking', balance: 0, accountNumber: '', bankName: '' });
          }}
          className={`
            p-2 rounded-lg 
            bg-cyan-400/20 
            text-cyan-400
            hover:bg-cyan-400/30 
            transition-all
          `}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Add/Edit Account Form */}
      {isAddingAccount && (
        <div className={`
          mb-6 p-4 
          bg-gray-700/50 
          rounded-lg 
          border border-gray-600
        `}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-gray-200 font-medium">
              {editingAccountId ? 'Edit Account' : 'Add New Account'}
            </h4>
            <button
              onClick={() => {
                setIsAddingAccount(false);
                setEditingAccountId(null);
              }}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Account Name (e.g., Main Checking)"
              value={newAccount.name}
              onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
              className="input-field"
            />
            <select
              value={newAccount.type}
              onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
              className="input-field"
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
              <option value="credit">Credit Card</option>
              <option value="investment">Investment</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Balance"
              value={newAccount.balance}
              onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
              step="0.01"
              className="input-field"
            />
            <input
              type="text"
              placeholder="Bank Name (optional)"
              value={newAccount.bankName}
              onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
              className="input-field"
            />
            <div className="flex gap-2">
              <button
                onClick={editingAccountId ? handleUpdateAccount : handleAddAccount}
                className="btn-primary flex-1"
              >
                {editingAccountId ? 'Update' : 'Add'} Account
              </button>
              {editingAccountId && (
                <button
                  onClick={() => handleDeleteAccount(editingAccountId)}
                  className={`
                    px-4 py-2 
                    bg-red-400/20 
                    text-red-400 
                    rounded-lg 
                    hover:bg-red-400/30 
                    transition-all
                  `}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Accounts List with Sliding Effect */}
      <div className="space-y-3">
        {accounts.map((account, index) => (
          <AccountCard
            key={account.id}
            account={account}
            isSelected={selectedAccountId === account.id}
            onSelect={onSelectAccount}
            onEdit={handleEditAccount}
            index={index}
          />
        ))}

        {accounts.length === 0 && (
          <div className={`
            p-8 text-center 
            border-2 border-dashed border-gray-700 
            rounded-lg
          `}>
            <Wallet className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 mb-2">No accounts yet</p>
            <p className="text-sm text-gray-500">Click the + button to add your first account</p>
          </div>
        )}
      </div>
    </div>
  );
}
