import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function TransactionCard({ transactions }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 hover:border-lime-400/30 transition-all duration-300 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Your Transactions</h3>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <TrendingUp key={i} className="w-5 h-5 text-lime-400 opacity-50" />
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/30 transition-all duration-200">
            <div className="w-10 h-10 bg-lime-400/20 rounded-full flex items-center justify-center ring-2 ring-lime-400/20">
              <span className="text-lime-400 font-bold text-sm">{tx.name[0]}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-200">{tx.type}</p>
              <p className="text-xs text-gray-400">{tx.name}</p>
            </div>
            <span className="font-semibold text-red-400">${Math.abs(tx.amount).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}