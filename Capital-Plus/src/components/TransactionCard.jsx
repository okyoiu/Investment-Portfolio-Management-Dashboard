// ============================================
// TRANSACTION CARD COMPONENT
// ============================================
// This component displays a list of recent transactions
// - Shows transaction type, name, and amount
// - Each transaction has an avatar with first letter of name
// ============================================

import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function TransactionCard({ transactions }) {
  return (
    <div className="card">
      
      {/* Card header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Your Transactions</h3>
        
        {/* Decorative icons */}
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <TrendingUp key={i} className="w-5 h-5 text-lime-400 opacity-50" />
          ))}
        </div>
      </div>
      
      {/* List of transactions */}
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            
            {/* Avatar circle with first letter of name */}
            <div className="avatar">
              <span className="text-lime-400 font-bold text-sm">
                {transaction.name[0]}
              </span>
            </div>
            
            {/* Transaction details */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-200">
                {transaction.type}
              </p>
              <p className="text-xs text-gray-400">
                {transaction.name}
              </p>
            </div>
            
            {/* Transaction amount (negative amounts shown in red) */}
            <span className="font-semibold text-red-400">
              ${Math.abs(transaction.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
