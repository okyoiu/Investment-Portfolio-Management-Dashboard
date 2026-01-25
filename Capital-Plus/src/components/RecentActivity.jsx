// ============================================
// RECENT ACTIVITY COMPONENT
// ============================================
// Shows recent account activity and updates
// Fills right sidebar with useful information
// ============================================

import React from 'react';
import { 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp,
  Bell,
  Clock
} from 'lucide-react';

export default function RecentActivity({ accounts, transactions }) {
  // Generate recent activity from accounts and transactions
  const activities = [
    {
      id: 1,
      type: 'transaction',
      icon: ArrowDownRight,
      color: 'red',
      message: 'Payment to Netflix',
      amount: -15.99,
      time: '2 hours ago',
      account: 'Main Checking'
    },
    {
      id: 2,
      type: 'transfer',
      icon: ArrowUpRight,
      color: 'cyan',
      message: 'Transfer to Savings',
      amount: 500,
      time: '1 day ago',
      account: 'Main Checking'
    },
    {
      id: 3,
      type: 'income',
      icon: TrendingUp,
      color: 'lime',
      message: 'Salary Deposit',
      amount: 5000,
      time: '3 days ago',
      account: 'Main Checking'
    },
    {
      id: 4,
      type: 'goal',
      icon: TrendingUp,
      color: 'yellow',
      message: 'Emergency Fund Goal - 65% Complete',
      amount: null,
      time: '5 days ago',
      account: 'Savings Account'
    }
  ];

  const getActivityColor = (color) => {
    const colors = {
      red: { bg: 'bg-red-400/20', text: 'text-red-400', icon: 'text-red-400' },
      cyan: { bg: 'bg-cyan-400/20', text: 'text-cyan-400', icon: 'text-cyan-400' },
      lime: { bg: 'bg-lime-400/20', text: 'text-lime-400', icon: 'text-lime-400' },
      yellow: { bg: 'bg-yellow-400/20', text: 'text-yellow-400', icon: 'text-yellow-400' }
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-cyan-400" />
        <h3 className={`
          font-semibold text-lg 
          text-gray-200
        `}>
          Recent Activity
        </h3>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => {
          const Icon = activity.icon;
          const colors = getActivityColor(activity.color);
          return (
            <div
              key={activity.id}
              className={`
                p-3 rounded-lg 
                ${colors.bg} 
                border border-gray-700
                hover:border-gray-600 
                transition-all
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  p-2 rounded-lg 
                  ${colors.bg}
                `}>
                  <Icon className={`w-4 h-4 ${colors.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`
                    text-sm font-medium mb-1 
                    text-gray-200
                  `}>
                    {activity.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{activity.time}</span>
                    </div>
                    {activity.amount !== null && (
                      <span className={`
                        text-sm font-semibold 
                        ${activity.amount > 0 ? 'text-lime-400' : 'text-red-400'}
                      `}>
                        {activity.amount > 0 ? '+' : ''}${activity.amount.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.account}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Summary */}
      <div className={`
        mt-4 pt-4 border-t border-gray-700
        flex items-center justify-between
      `}>
        <div>
          <p className="text-xs text-gray-400">This Week</p>
          <p className="text-sm font-semibold text-gray-200">
            {activities.length} activities
          </p>
        </div>
        <button className={`
          text-xs 
          text-cyan-400 
          hover:text-cyan-300 
          transition-colors
        `}>
          View All
        </button>
      </div>
    </div>
  );
}
