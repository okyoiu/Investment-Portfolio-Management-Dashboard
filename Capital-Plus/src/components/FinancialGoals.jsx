// ============================================
// FINANCIAL GOALS COMPONENT
// ============================================
// Track savings goals with progress indicators
// Visual countdown and achievement badges
// ============================================

import React, { useState } from 'react';
import { Target, Trophy, Calendar, Plus, X } from 'lucide-react';

export default function FinancialGoals({ currentSavings, onGoalUpdate }) {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 6500,
      deadline: '2024-06-30',
      category: 'Emergency'
    },
    {
      id: 2,
      title: 'Vacation to Europe',
      targetAmount: 5000,
      currentAmount: 2800,
      deadline: '2024-08-15',
      category: 'Travel'
    },
    {
      id: 3,
      title: 'New Car Down Payment',
      targetAmount: 8000,
      currentAmount: 3200,
      deadline: '2024-12-31',
      category: 'Vehicle'
    }
  ]);

  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    deadline: '',
    category: 'Other'
  });

  // Calculate progress percentage
  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  // Calculate days until deadline
  const daysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Calculate monthly savings needed
  const monthlySavingsNeeded = (current, target, days) => {
    if (days <= 0) return 0;
    const months = days / 30;
    const remaining = target - current;
    return months > 0 ? (remaining / months).toFixed(2) : remaining;
  };

  // Add new goal
  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.deadline) {
      alert('Please fill in all fields');
      return;
    }

    const goal = {
      id: goals.length + 1,
      title: newGoal.title,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      deadline: newGoal.deadline,
      category: newGoal.category
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: '', targetAmount: '', deadline: '', category: 'Other' });
    setIsAddingGoal(false);
    if (onGoalUpdate) onGoalUpdate([...goals, goal]);
  };

  // Update goal progress
  const updateGoalProgress = (id, amount) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount) }
        : goal
    ));
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-cyan-400" />
          <h3 className={`
            font-semibold text-lg 
            text-gray-200
          `}>
            Financial Goals
          </h3>
        </div>
        <button
          onClick={() => setIsAddingGoal(!isAddingGoal)}
          className={`
            p-2 rounded-lg 
            bg-cyan-400/20 
            text-cyan-400
            hover:bg-cyan-400/30 
            transition-all
          `}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Add Goal Form */}
      {isAddingGoal && (
        <div className={`
          mb-6 p-4 
          bg-gray-700/50 
          rounded-lg 
          border border-gray-600
        `}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-gray-200 font-medium">Add New Goal</h4>
            <button
              onClick={() => setIsAddingGoal(false)}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Goal title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="input-field"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Target amount"
                value={newGoal.targetAmount}
                onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                className="input-field"
              />
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="input-field"
              />
            </div>
            <button
              onClick={handleAddGoal}
              className="btn-primary w-full"
            >
              Add Goal
            </button>
          </div>
        </div>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          const daysLeft = daysUntilDeadline(goal.deadline);
          const monthlyNeeded = monthlySavingsNeeded(goal.currentAmount, goal.targetAmount, daysLeft);
          const isCompleted = progress >= 100;

          return (
            <div
              key={goal.id}
              className={`
                p-4 rounded-lg 
                border 
                ${isCompleted 
                  ? 'bg-lime-400/10 border-lime-400/30' 
                  : 'bg-gray-700/30 border-gray-600'
                }
              `}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`
                      font-semibold 
                      ${isCompleted ? 'text-lime-400' : 'text-gray-200'}
                    `}>
                      {goal.title}
                    </h4>
                    {isCompleted && (
                      <Trophy className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{goal.category}</p>
                </div>
                <div className="text-right">
                  <p className={`
                    font-bold 
                    ${isCompleted ? 'text-lime-400' : 'text-gray-200'}
                  `}>
                    ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">{progress.toFixed(1)}%</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className={`
                w-full h-3 
                bg-gray-700 
                rounded-full 
                overflow-hidden 
                mb-3
              `}>
                <div
                  className={`
                    h-full 
                    transition-all duration-500
                    ${isCompleted 
                      ? 'bg-lime-400' 
                      : progress >= 75 
                        ? 'bg-cyan-400' 
                        : progress >= 50 
                          ? 'bg-yellow-400' 
                          : 'bg-red-400'
                    }
                  `}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Goal Details */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>{daysLeft} days left</span>
                  </div>
                  {!isCompleted && (
                    <div className="text-gray-400">
                      ${monthlyNeeded}/mo needed
                    </div>
                  )}
                </div>
                {isCompleted && (
                  <span className={`
                    px-2 py-1 rounded 
                    bg-lime-400/20 
                    text-lime-400 
                    text-xs font-medium
                  `}>
                    Achieved! 🎉
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
