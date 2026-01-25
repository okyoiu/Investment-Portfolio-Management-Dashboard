// ============================================
// UPCOMING BILLS COMPONENT
// ============================================
// Shows upcoming bills and payments
// Helps users stay on top of expenses
// ============================================

import React from 'react';
import { Calendar, AlertCircle, CheckCircle } from 'lucide-react';

export default function UpcomingBills() {
  const upcomingBills = [
    {
      id: 1,
      name: 'Rent Payment',
      amount: 1200,
      dueDate: '2024-02-01',
      category: 'Housing',
      status: 'upcoming'
    },
    {
      id: 2,
      name: 'Electric Bill',
      amount: 85.50,
      dueDate: '2024-02-05',
      category: 'Utilities',
      status: 'upcoming'
    },
    {
      id: 3,
      name: 'Internet Service',
      amount: 79.99,
      dueDate: '2024-02-08',
      category: 'Utilities',
      status: 'upcoming'
    },
    {
      id: 4,
      name: 'Car Insurance',
      amount: 145.00,
      dueDate: '2024-02-15',
      category: 'Transportation',
      status: 'upcoming'
    }
  ];

  // Calculate days until due
  const daysUntilDue = (dateString) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate total upcoming
  const totalUpcoming = upcomingBills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-purple-400" />
        <h3 className={`
          font-semibold text-lg 
          text-gray-200
        `}>
          Upcoming Bills
        </h3>
      </div>

      <div className="space-y-3 mb-4">
        {upcomingBills.map((bill) => {
          const daysUntil = daysUntilDue(bill.dueDate);
          const isUrgent = daysUntil <= 3;
          const isSoon = daysUntil <= 7;
          
          return (
            <div
              key={bill.id}
              className={`
                p-3 rounded-lg 
                border 
                ${isUrgent ? 'bg-red-400/10 border-red-400/30' : 
                  isSoon ? 'bg-yellow-400/10 border-yellow-400/30' : 
                  'bg-gray-700/30 border-gray-600'}
                transition-all hover:border-gray-500
              `}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`
                      font-semibold text-sm 
                      text-gray-200
                    `}>
                      {bill.name}
                    </h4>
                    {isUrgent && (
                      <AlertCircle className="w-3 h-3 text-red-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    {bill.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`
                    font-bold 
                    ${isUrgent ? 'text-red-400' : 'text-gray-200'}
                  `}>
                    ${bill.amount.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {daysUntil > 0 
                      ? `Due in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`
                      : daysUntil === 0
                      ? 'Due today'
                      : 'Overdue'}
                  </span>
                </div>
                <span className={`
                  text-xs 
                  ${isUrgent ? 'text-red-400' : 
                    isSoon ? 'text-yellow-400' : 
                    'text-gray-400'}
                `}>
                  {new Date(bill.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Summary */}
      <div className={`
        pt-4 border-t border-gray-700
        flex items-center justify-between
      `}>
        <div>
          <p className="text-sm text-gray-400">Total Upcoming</p>
          <p className={`
            text-xl font-bold 
            text-purple-400
          `}>
            ${totalUpcoming.toFixed(2)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Next 30 days</p>
          <p className="text-sm font-semibold text-gray-300">
            {upcomingBills.length} bills
          </p>
        </div>
      </div>
    </div>
  );
}
