// ============================================
// TRANSACTION MODAL COMPONENT
// ============================================
// Reusable modal for adding income, expenses, and transfers
// ============================================

import React, { useState } from 'react';
import { X, DollarSign, Tag, Calendar, FileText } from 'lucide-react';

export default function TransactionModal({ 
  isOpen, 
  onClose, 
  type, // 'income', 'expense', or 'transfer'
  onSave 
}) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    recipient: '' // For transfers
  });

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        amount: '',
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        recipient: ''
      });
    }
  }, [isOpen]);

  // Categories based on type
  const categories = {
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
    expense: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Healthcare', 'Other'],
    transfer: ['Savings Account', 'Investment Account', 'Other Account']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.description) {
      alert('Please fill in amount and description');
      return;
    }

    const transactionData = {
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category || (type === 'income' ? 'Income' : type === 'expense' ? 'Other' : 'Transfer'),
      date: formData.date,
      type: type === 'income' ? 'Income' : type === 'expense' ? 'Expense' : 'Transfer',
      recipient: formData.recipient || null
    };

    onSave(transactionData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  const title = type === 'income' ? 'Add Income' : type === 'expense' ? 'Add Expense' : 'Transfer Money';
  
  // Button styling based on type
  const getButtonClass = () => {
    if (type === 'income') {
      return 'bg-lime-400/20 text-lime-400 hover:bg-lime-400/30';
    } else if (type === 'expense') {
      return 'bg-red-400/20 text-red-400 hover:bg-red-400/30';
    } else {
      return 'bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30';
    }
  };

  return (
    <div className={`
      fixed inset-0 
      bg-black/50 
      flex items-center justify-center 
      z-50 
      p-4
    `}>
      <div className={`
        card 
        max-w-md w-full 
        max-h-[90vh] 
        overflow-y-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`
            text-2xl font-bold 
            text-gray-200
          `}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className={`
              p-2 rounded-lg 
              hover:bg-gray-700 
              transition-colors
            `}
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div>
            <label className={`
              block text-sm font-medium 
              text-gray-300 mb-2
            `}>
              <DollarSign className="w-4 h-4 inline mr-1" />
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0.01"
              required
              className="input-field"
              placeholder="0.00"
            />
          </div>

          {/* Description */}
          <div>
            <label className={`
              block text-sm font-medium 
              text-gray-300 mb-2
            `}>
              <FileText className="w-4 h-4 inline mr-1" />
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="input-field"
              placeholder={type === 'income' ? 'e.g., Salary from Company' : type === 'expense' ? 'e.g., Grocery Shopping' : 'e.g., Transfer to Savings'}
            />
          </div>

          {/* Category */}
          <div>
            <label className={`
              block text-sm font-medium 
              text-gray-300 mb-2
            `}>
              <Tag className="w-4 h-4 inline mr-1" />
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select a category</option>
              {categories[type].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className={`
              block text-sm font-medium 
              text-gray-300 mb-2
            `}>
              <Calendar className="w-4 h-4 inline mr-1" />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          {/* Recipient (for transfers only) */}
          {type === 'transfer' && (
            <div>
              <label className={`
                block text-sm font-medium 
                text-gray-300 mb-2
              `}>
                To Account
              </label>
              <input
                type="text"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Savings Account"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`
                flex-1 py-3 px-4 
                bg-gray-700 
                text-gray-300 
                rounded-lg 
                font-medium 
                hover:bg-gray-600 
                transition-all
              `}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`
                flex-1 py-3 px-4 
                rounded-lg 
                font-medium 
                transition-all
                ${getButtonClass()}
              `}
            >
              {type === 'income' ? 'Add Income' : type === 'expense' ? 'Add Expense' : 'Transfer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
