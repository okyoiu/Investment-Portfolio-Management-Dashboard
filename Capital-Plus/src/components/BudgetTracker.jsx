// ============================================
// BUDGET TRACKER COMPONENT
// ============================================
// This component tracks spending against budget limits
// - Shows budget progress for each category
// - Sends notifications when going over budget
// - Allows users to set and edit budget limits
// ============================================

import React, { useState, useEffect } from 'react';
import { AlertCircle, Settings, DollarSign } from 'lucide-react';

export default function BudgetTracker({ 
  spendingCategories,  // Current spending data
  onBudgetUpdate       // Callback when budget is updated
}) {
  // ============================================
  // STATE VARIABLES
  // ============================================
  
  // Budget limits for each category
  const [budgets, setBudgets] = useState({
    Housing: 1200,
    Food: 800,
    Transportation: 600,
    Entertainment: 400,
    Utilities: 200
  });

  // Track if user is editing budgets
  const [isEditing, setIsEditing] = useState(false);
  
  // Store notification messages
  const [notifications, setNotifications] = useState([]);

  // ============================================
  // FUNCTIONS
  // ============================================

  // Check if any category is over budget and create notifications
  const checkBudgetLimits = () => {
    const newNotifications = [];
    
    spendingCategories.forEach(category => {
      const budgetLimit = budgets[category.name] || 0;
      const spent = category.amount;
      const percentage = (spent / budgetLimit) * 100;
      
      // If over 100% of budget, create warning notification
      if (percentage > 100) {
        const overAmount = spent - budgetLimit;
        newNotifications.push({
          id: Date.now() + Math.random(),
          type: 'warning',
          category: category.name,
          message: `You've exceeded your ${category.name} budget by $${overAmount.toFixed(2)}!`,
          percentage: percentage.toFixed(1)
        });
      }
      // If over 80% of budget, create caution notification
      else if (percentage > 80) {
        const remaining = budgetLimit - spent;
        newNotifications.push({
          id: Date.now() + Math.random(),
          type: 'caution',
          category: category.name,
          message: `Warning: You've used ${percentage.toFixed(1)}% of your ${category.name} budget. Only $${remaining.toFixed(2)} remaining.`,
          percentage: percentage.toFixed(1)
        });
      }
    });
    
    setNotifications(newNotifications);
    
    // Show browser notification if over budget
    if (newNotifications.some(n => n.type === 'warning')) {
      showBrowserNotification(newNotifications.find(n => n.type === 'warning'));
    }
  };

  // Show browser notification (if permission granted)
  const showBrowserNotification = (notification) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Budget Alert!', {
        body: notification.message,
        icon: '/vite.svg',
        badge: '/vite.svg'
      });
    }
  };

  // Request notification permission
  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          alert('Notifications enabled! You\'ll be alerted when going over budget.');
        }
      });
    }
  };

  // Update budget for a category
  const updateBudget = (categoryName, newBudget) => {
    setBudgets(prev => ({
      ...prev,
      [categoryName]: parseFloat(newBudget) || 0
    }));
    
    // Notify parent component
    if (onBudgetUpdate) {
      onBudgetUpdate({ ...budgets, [categoryName]: parseFloat(newBudget) || 0 });
    }
  };

  // Calculate budget progress percentage
  const getBudgetProgress = (categoryName, spent) => {
    const budget = budgets[categoryName] || 0;
    if (budget === 0) return 0;
    return Math.min(100, (spent / budget) * 100);
  };

  // Check budgets whenever spending changes
  useEffect(() => {
    checkBudgetLimits();
  }, [spendingCategories, budgets]);

  // Request notification permission on mount
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // ============================================
  // RENDER (What shows on screen)
  // ============================================
  return (
    <div className="card">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-lime-400" />
          <h3 className={`
            font-semibold text-lg 
            text-gray-200
          `}>
            Budget Tracker
          </h3>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`
            p-2 rounded-lg 
            hover:bg-gray-700/50 
            transition-colors
          `}
        >
          <Settings className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="mb-6 space-y-2">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`
                p-3 rounded-lg 
                flex items-start gap-3
                ${notification.type === 'warning' 
                  ? 'bg-red-500/20 border border-red-500/50' 
                  : 'bg-yellow-500/20 border border-yellow-500/50'}
              `}
            >
              <AlertCircle className={`
                w-5 h-5 mt-0.5
                ${notification.type === 'warning' ? 'text-red-400' : 'text-yellow-400'}
              `} />
              <div className="flex-1">
                <p className={`
                  text-sm font-medium
                  ${notification.type === 'warning' ? 'text-red-400' : 'text-yellow-400'}
                `}>
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className={`
                  text-xs 
                  ${notification.type === 'warning' ? 'text-red-400' : 'text-yellow-400'}
                  hover:opacity-70
                `}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Budget Progress Bars */}
      <div className="space-y-4">
        {spendingCategories.map((category, index) => {
          const progress = getBudgetProgress(category.name, category.amount);
          const budget = budgets[category.name] || 0;
          const remaining = budget - category.amount;
          const isOver = progress > 100;
          const isWarning = progress > 80 && progress <= 100;

          return (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className={`
                    text-sm font-medium
                    ${isOver ? 'text-red-400' : isWarning ? 'text-yellow-400' : 'text-gray-300'}
                  `}>
                    {category.name}
                  </span>
                  {isOver && <AlertCircle className="w-4 h-4 text-red-400" />}
                </div>
                <div className="text-right">
                  <span className={`
                    text-sm font-semibold
                    ${isOver ? 'text-red-400' : isWarning ? 'text-yellow-400' : 'text-gray-300'}
                  `}>
                    ${category.amount.toFixed(2)} / ${budget.toFixed(2)}
                  </span>
                  {!isEditing && (
                    <span className={`
                      text-xs ml-2
                      ${isOver ? 'text-red-400' : isWarning ? 'text-yellow-400' : 'text-gray-500'}
                    `}>
                      {isOver ? `+$${Math.abs(remaining).toFixed(2)} over` : `$${remaining.toFixed(2)} left`}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className={`
                w-full h-3 
                bg-gray-700 rounded-full 
                overflow-hidden mb-1
              `}>
                <div
                  className={`
                    h-full transition-all duration-500
                    ${isOver ? 'bg-red-400' : isWarning ? 'bg-yellow-400' : 'bg-lime-400'}
                  `}
                  style={{ width: `${Math.min(100, progress)}%` }}
                ></div>
              </div>

              {/* Edit Budget Input */}
              {isEditing && (
                <div className="mt-2">
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => updateBudget(category.name, e.target.value)}
                    className={`
                      w-full px-3 py-1.5 
                      bg-gray-700/50 
                      border border-gray-600 
                      rounded-lg 
                      text-sm text-white
                      focus:outline-none 
                      focus:ring-2 focus:ring-lime-400/50
                    `}
                    placeholder="Set budget"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}

              {/* Progress Percentage */}
              <span className={`
                text-xs 
                ${isOver ? 'text-red-400' : isWarning ? 'text-yellow-400' : 'text-gray-500'}
              `}>
                {progress.toFixed(1)}% of budget used
              </span>
            </div>
          );
        })}
      </div>

      {/* Enable Notifications Button */}
      {Notification.permission !== 'granted' && (
        <button
          onClick={requestNotificationPermission}
          className={`
            w-full mt-4 py-2 
            bg-cyan-400/20 
            text-cyan-400 
            rounded-lg 
            text-sm font-medium
            hover:bg-cyan-400/30 
            transition-all
          `}
        >
          Enable Budget Notifications
        </button>
      )}
    </div>
  );
}
