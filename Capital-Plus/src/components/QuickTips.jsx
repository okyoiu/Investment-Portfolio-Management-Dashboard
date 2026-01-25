// ============================================
// QUICK TIPS COMPONENT
// ============================================
// Fills empty spaces with helpful financial tips
// ============================================

import React, { useState } from 'react';
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';

export default function QuickTips() {
  const tips = [
    {
      title: 'Build an Emergency Fund',
      message: 'Aim to save 3-6 months of expenses in an easily accessible account.',
      category: 'Savings'
    },
    {
      title: 'Review Subscriptions Regularly',
      message: 'Cancel unused subscriptions to free up money for savings and investments.',
      category: 'Spending'
    },
    {
      title: 'Automate Your Savings',
      message: 'Set up automatic transfers to savings accounts to build wealth effortlessly.',
      category: 'Automation'
    },
    {
      title: 'Track Every Expense',
      message: 'Knowing where your money goes is the first step to better financial control.',
      category: 'Tracking'
    },
    {
      title: 'Pay Off High-Interest Debt First',
      message: 'Focus on credit card debt before other loans to save on interest payments.',
      category: 'Debt'
    },
    {
      title: 'Invest Early and Often',
      message: 'Start investing early to take advantage of compound interest over time.',
      category: 'Investing'
    }
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const currentTip = tips[currentTipIndex];

  return (
    <div className="card bg-gradient-to-br from-yellow-400/10 to-orange-400/10 border-yellow-400/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <h3 className={`
            font-semibold text-lg 
            text-gray-200
          `}>
            Financial Tip
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevTip}
            className={`
              p-1 rounded 
              hover:bg-gray-700 
              transition-colors
            `}
          >
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
          <span className="text-xs text-gray-400">
            {currentTipIndex + 1}/{tips.length}
          </span>
          <button
            onClick={nextTip}
            className={`
              p-1 rounded 
              hover:bg-gray-700 
              transition-colors
            `}
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
      
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className={`
            px-2 py-1 rounded 
            bg-yellow-400/20 
            text-yellow-400 
            text-xs font-medium
          `}>
            {currentTip.category}
          </span>
        </div>
        <h4 className={`
          font-semibold mb-2 
          text-gray-200
        `}>
          {currentTip.title}
        </h4>
        <p className={`
          text-sm 
          text-gray-400
        `}>
          {currentTip.message}
        </p>
      </div>
    </div>
  );
}
