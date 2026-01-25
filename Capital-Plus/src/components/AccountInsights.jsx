// ============================================
// ACCOUNT INSIGHTS COMPONENT
// ============================================
// Shows helpful insights and tips for selected account
// Fills empty spaces with useful information
// ============================================

import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Info,
  Target,
  Zap
} from 'lucide-react';

export default function AccountInsights({ account, financialData }) {
  if (!account) return null;

  const insights = [];

  // Balance insights
  if (account.balance < 0) {
    insights.push({
      icon: AlertTriangle,
      color: 'red',
      title: 'Negative Balance',
      message: 'This account has a negative balance. Consider transferring funds.',
      action: 'Transfer from savings to cover the balance.'
    });
  } else if (account.balance < 100) {
    insights.push({
      icon: AlertTriangle,
      color: 'yellow',
      title: 'Low Balance',
      message: 'Account balance is below $100. Monitor closely.',
      action: 'Consider adding funds to avoid overdraft fees.'
    });
  } else if (account.balance > 5000) {
    insights.push({
      icon: TrendingUp,
      color: 'lime',
      title: 'Healthy Balance',
      message: 'Your account has a strong balance. Great job!',
      action: 'Consider moving excess funds to savings for better returns.'
    });
  }

  // Account type specific insights
  if (account.type === 'savings') {
    const savingsRate = (financialData.savings / financialData.monthlyIncome) * 100;
    if (savingsRate < 20) {
      insights.push({
        icon: Target,
        color: 'cyan',
        title: 'Savings Goal',
        message: `You're saving ${savingsRate.toFixed(1)}% of income.`,
        action: 'Aim for 20% to build wealth faster.'
      });
    }
  }

  if (account.type === 'credit') {
    if (account.balance < 0) {
      const utilization = Math.abs(account.balance);
      insights.push({
        icon: Info,
        color: 'purple',
        title: 'Credit Utilization',
        message: `You have $${utilization.toFixed(2)} in credit card debt.`,
        action: 'Pay off high-interest debt first to save money.'
      });
    }
  }

  // Spending insights
  const monthlySpending = financialData.monthlyExpenses;
  const accountRatio = account.balance / monthlySpending;
  
  if (accountRatio < 1 && account.type === 'checking') {
    insights.push({
      icon: Zap,
      color: 'yellow',
      title: 'Spending Alert',
      message: `Your balance covers ${(accountRatio * 100).toFixed(0)}% of monthly expenses.`,
      action: 'Build a buffer of at least 2 months expenses.'
    });
  }

  if (insights.length === 0) {
    insights.push({
      icon: Info,
      color: 'cyan',
      title: 'Account Status',
      message: 'Your account is in good standing.',
      action: 'Keep up the good financial habits!'
    });
  }

  const getColorClasses = (color) => {
    const colors = {
      red: { bg: 'bg-red-400/10', border: 'border-red-400/30', text: 'text-red-400' },
      yellow: { bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', text: 'text-yellow-400' },
      lime: { bg: 'bg-lime-400/10', border: 'border-lime-400/30', text: 'text-lime-400' },
      cyan: { bg: 'bg-cyan-400/10', border: 'border-cyan-400/30', text: 'text-cyan-400' },
      purple: { bg: 'bg-purple-400/10', border: 'border-purple-400/30', text: 'text-purple-400' }
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div className="card">
      <h3 className={`
        font-semibold text-lg mb-4 
        text-gray-200
      `}>
        Account Insights
      </h3>
      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const colors = getColorClasses(insight.color);
          return (
            <div
              key={index}
              className={`
                p-3 rounded-lg 
                ${colors.bg} 
                border ${colors.border}
              `}
            >
              <div className="flex items-start gap-2">
                <Icon className={`w-4 h-4 ${colors.text} mt-0.5`} />
                <div className="flex-1">
                  <h4 className={`
                    text-sm font-semibold mb-1 
                    ${colors.text}
                  `}>
                    {insight.title}
                  </h4>
                  <p className="text-xs text-gray-300 mb-1">
                    {insight.message}
                  </p>
                  <p className="text-xs text-gray-400">
                    💡 {insight.action}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
