// ============================================
// SUBSCRIPTION MANAGER COMPONENT
// ============================================
// Shows subscriptions for selected account
// Provides insights and suggestions
// ============================================

import React, { useState } from 'react';
import { 
  CreditCard, 
  Calendar, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  Plus,
  X,
  Lightbulb,
  DollarSign
} from 'lucide-react';

export default function SubscriptionManager({ accountId, accountBalance }) {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: 'Netflix',
      amount: 15.99,
      frequency: 'monthly',
      nextBilling: '2024-02-01',
      category: 'Entertainment',
      status: 'active'
    },
    {
      id: 2,
      name: 'Spotify Premium',
      amount: 9.99,
      frequency: 'monthly',
      nextBilling: '2024-02-05',
      category: 'Entertainment',
      status: 'active'
    },
    {
      id: 3,
      name: 'Adobe Creative Cloud',
      amount: 52.99,
      frequency: 'monthly',
      nextBilling: '2024-02-10',
      category: 'Software',
      status: 'active'
    },
    {
      id: 4,
      name: 'Gym Membership',
      amount: 49.99,
      frequency: 'monthly',
      nextBilling: '2024-02-15',
      category: 'Health',
      status: 'active'
    }
  ]);

  const [isAddingSubscription, setIsAddingSubscription] = useState(false);
  const [newSubscription, setNewSubscription] = useState({
    name: '',
    amount: '',
    frequency: 'monthly',
    category: 'Other',
    nextBilling: ''
  });

  // Calculate total monthly subscriptions
  const totalMonthly = subscriptions
    .filter(sub => sub.status === 'active' && sub.frequency === 'monthly')
    .reduce((sum, sub) => sum + sub.amount, 0);

  const totalYearly = subscriptions
    .filter(sub => sub.status === 'active' && sub.frequency === 'yearly')
    .reduce((sum, sub) => sum + sub.amount, 0);

  const totalMonthlyEquivalent = totalMonthly + (totalYearly / 12);

  // Get suggestions based on subscriptions
  const getSuggestions = () => {
    const suggestions = [];

    // Check if subscriptions exceed 10% of balance
    if (accountBalance > 0 && (totalMonthlyEquivalent / accountBalance) > 0.1) {
      suggestions.push({
        type: 'warning',
        icon: AlertCircle,
        title: 'High Subscription Ratio',
        message: `Your subscriptions ($${totalMonthlyEquivalent.toFixed(2)}/mo) are ${((totalMonthlyEquivalent / accountBalance) * 100).toFixed(1)}% of your account balance.`,
        action: 'Consider canceling unused subscriptions.'
      });
    }

    // Check for duplicate categories
    const categoryCount = {};
    subscriptions.forEach(sub => {
      if (sub.status === 'active') {
        categoryCount[sub.category] = (categoryCount[sub.category] || 0) + 1;
      }
    });

    Object.entries(categoryCount).forEach(([category, count]) => {
      if (count >= 3) {
        suggestions.push({
          type: 'info',
          icon: Lightbulb,
          title: 'Multiple Subscriptions',
          message: `You have ${count} active subscriptions in ${category}.`,
          action: 'Review if you need all of them.'
        });
      }
    });

    // Check for upcoming renewals
    const today = new Date();
    const upcoming = subscriptions.filter(sub => {
      const billingDate = new Date(sub.nextBilling);
      const daysUntil = Math.ceil((billingDate - today) / (1000 * 60 * 60 * 24));
      return daysUntil <= 7 && daysUntil > 0 && sub.status === 'active';
    });

    if (upcoming.length > 0) {
      suggestions.push({
        type: 'info',
        icon: Calendar,
        title: 'Upcoming Renewals',
        message: `${upcoming.length} subscription${upcoming.length > 1 ? 's' : ''} renewing soon.`,
        action: `Total: $${upcoming.reduce((sum, sub) => sum + sub.amount, 0).toFixed(2)}`
      });
    }

    // Positive reinforcement
    if (subscriptions.filter(s => s.status === 'active').length <= 3 && totalMonthlyEquivalent < 50) {
      suggestions.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Well Managed!',
        message: 'You have a reasonable number of subscriptions.',
        action: 'Keep it up!'
      });
    }

    return suggestions;
  };

  // Add subscription
  const handleAddSubscription = () => {
    if (!newSubscription.name || !newSubscription.amount) {
      alert('Please fill in name and amount');
      return;
    }

    const subscription = {
      id: subscriptions.length + 1,
      ...newSubscription,
      amount: parseFloat(newSubscription.amount),
      nextBilling: newSubscription.nextBilling || new Date().toISOString().split('T')[0],
      status: 'active'
    };

    setSubscriptions([...subscriptions, subscription]);
    setNewSubscription({ name: '', amount: '', frequency: 'monthly', category: 'Other', nextBilling: '' });
    setIsAddingSubscription(false);
  };

  // Cancel subscription
  const handleCancelSubscription = (id) => {
    setSubscriptions(subscriptions.map(sub =>
      sub.id === id ? { ...sub, status: 'cancelled' } : sub
    ));
  };

  // Days until billing
  const daysUntilBilling = (dateString) => {
    const today = new Date();
    const billingDate = new Date(dateString);
    const diffTime = billingDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const activeSubscriptions = subscriptions.filter(s => s.status === 'active');
  const suggestions = getSuggestions();

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`
            font-semibold text-lg 
            text-gray-200
          `}>
            Subscriptions
          </h3>
          <p className="text-sm text-gray-400">
            ${totalMonthlyEquivalent.toFixed(2)}/month total
          </p>
        </div>
        <button
          onClick={() => setIsAddingSubscription(!isAddingSubscription)}
          className={`
            p-2 rounded-lg 
            bg-purple-400/20 
            text-purple-400
            hover:bg-purple-400/30 
            transition-all
          `}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Add Subscription Form */}
      {isAddingSubscription && (
        <div className={`
          mb-6 p-4 
          bg-gray-700/50 
          rounded-lg 
          border border-gray-600
        `}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-gray-200 font-medium">Add Subscription</h4>
            <button
              onClick={() => setIsAddingSubscription(false)}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Subscription Name"
              value={newSubscription.name}
              onChange={(e) => setNewSubscription({ ...newSubscription, name: e.target.value })}
              className="input-field"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Amount"
                value={newSubscription.amount}
                onChange={(e) => setNewSubscription({ ...newSubscription, amount: e.target.value })}
                step="0.01"
                className="input-field"
              />
              <select
                value={newSubscription.frequency}
                onChange={(e) => setNewSubscription({ ...newSubscription, frequency: e.target.value })}
                className="input-field"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <select
              value={newSubscription.category}
              onChange={(e) => setNewSubscription({ ...newSubscription, category: e.target.value })}
              className="input-field"
            >
              <option value="Entertainment">Entertainment</option>
              <option value="Software">Software</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="date"
              placeholder="Next Billing Date"
              value={newSubscription.nextBilling}
              onChange={(e) => setNewSubscription({ ...newSubscription, nextBilling: e.target.value })}
              className="input-field"
            />
            <button
              onClick={handleAddSubscription}
              className="btn-primary w-full"
            >
              Add Subscription
            </button>
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-6 space-y-3">
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            const getColorClasses = (type) => {
              if (type === 'warning') {
                return {
                  bg: 'bg-red-400/10',
                  border: 'border-red-400/30',
                  text: 'text-red-400'
                };
              } else if (type === 'success') {
                return {
                  bg: 'bg-lime-400/10',
                  border: 'border-lime-400/30',
                  text: 'text-lime-400'
                };
              } else {
                return {
                  bg: 'bg-cyan-400/10',
                  border: 'border-cyan-400/30',
                  text: 'text-cyan-400'
                };
              }
            };
            const colors = getColorClasses(suggestion.type);
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
                      {suggestion.title}
                    </h4>
                    <p className="text-xs text-gray-300 mb-1">
                      {suggestion.message}
                    </p>
                    <p className="text-xs text-gray-400">
                      💡 {suggestion.action}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Subscriptions List */}
      <div className="space-y-3">
        {activeSubscriptions.length === 0 ? (
          <div className={`
            p-6 text-center 
            border-2 border-dashed border-gray-700 
            rounded-lg
          `}>
            <CreditCard className="w-10 h-10 text-gray-600 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">No active subscriptions</p>
          </div>
        ) : (
          activeSubscriptions.map((subscription) => {
            const daysUntil = daysUntilBilling(subscription.nextBilling);
            const isUpcoming = daysUntil <= 7 && daysUntil > 0;
            
            return (
              <div
                key={subscription.id}
                className={`
                  p-4 rounded-lg 
                  border 
                  ${isUpcoming ? 'bg-yellow-400/10 border-yellow-400/30' : 'bg-gray-700/30 border-gray-600'}
                  transition-all hover:border-gray-500
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`
                        font-semibold 
                        text-gray-200
                      `}>
                        {subscription.name}
                      </h4>
                      {isUpcoming && (
                        <span className={`
                          px-2 py-0.5 rounded 
                          bg-yellow-400/20 
                          text-yellow-400 
                          text-xs font-medium
                        `}>
                          Renewing Soon
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      {subscription.category} • {subscription.frequency}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`
                      font-bold text-lg 
                      ${isUpcoming ? 'text-yellow-400' : 'text-gray-200'}
                    `}>
                      ${subscription.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400">
                      /{subscription.frequency === 'monthly' ? 'mo' : 'yr'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {daysUntil > 0 
                        ? `Renews in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`
                        : daysUntil === 0
                        ? 'Renews today'
                        : 'Overdue'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCancelSubscription(subscription.id)}
                    className={`
                      px-3 py-1 rounded 
                      bg-red-400/20 
                      text-red-400 
                      text-xs font-medium
                      hover:bg-red-400/30 
                      transition-all
                    `}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary */}
      {activeSubscriptions.length > 0 && (
        <div className={`
          mt-6 pt-4 border-t border-gray-700
          flex items-center justify-between
        `}>
          <div>
            <p className="text-sm text-gray-400">Total Monthly Cost</p>
            <p className={`
              text-2xl font-bold 
              text-purple-400
            `}>
              ${totalMonthlyEquivalent.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Active Subscriptions</p>
            <p className={`
              text-2xl font-bold 
              text-gray-200
            `}>
              {activeSubscriptions.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
