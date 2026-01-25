// ============================================
// AI FINANCIAL INSIGHTS COMPONENT
// ============================================
// AI-powered predictions and personalized recommendations
// Spending forecasts and smart suggestions
// ============================================

import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, TrendingDown, Lightbulb, Target, AlertTriangle } from 'lucide-react';

export default function AIFinancialInsights({ 
  financialData, 
  spendingCategories, 
  transactionList 
}) {
  const [insights, setInsights] = useState([]);
  const [predictions, setPredictions] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    generateInsights();
  }, [financialData, spendingCategories]);

  const generateInsights = () => {
    const savingsRate = ((financialData.monthlyIncome - financialData.monthlyExpenses) / financialData.monthlyIncome) * 100;
    const avgDailySpending = financialData.monthlyExpenses / 30;
    const projectedMonthly = financialData.monthlyExpenses * 1.05; // 5% increase prediction

    // Generate predictions
    setPredictions({
      nextMonthSpending: projectedMonthly,
      yearEndSavings: (financialData.monthlyIncome - projectedMonthly) * 12,
      daysUntilGoal: calculateDaysUntilGoal(),
      projectedBalance: financialData.totalBalance + ((financialData.monthlyIncome - projectedMonthly) * 6)
    });

    // Generate recommendations
    const recs = [];

    // Savings rate recommendation
    if (savingsRate < 20) {
      recs.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Increase Savings Rate',
        message: `You're currently saving ${savingsRate.toFixed(1)}%. Aim for 20% to build wealth faster.`,
        action: `Save $${((financialData.monthlyIncome * 0.2) - (financialData.monthlyIncome - financialData.monthlyExpenses)).toFixed(0)} more per month.`
      });
    }

    // Spending category analysis
    const highestCategory = spendingCategories.reduce((max, cat) => 
      cat.amount > max.amount ? cat : max
    );
    if (highestCategory.percentage > 40) {
      recs.push({
        type: 'info',
        icon: Lightbulb,
        title: 'High Spending Category',
        message: `${highestCategory.name} accounts for ${highestCategory.percentage}% of your expenses.`,
        action: `Consider reviewing ${highestCategory.name} expenses for potential savings.`
      });
    }

    // Emergency fund recommendation
    const emergencyMonths = financialData.savings / financialData.monthlyExpenses;
    if (emergencyMonths < 3) {
      recs.push({
        type: 'warning',
        icon: Target,
        title: 'Build Emergency Fund',
        message: `You have ${emergencyMonths.toFixed(1)} months of expenses saved.`,
        action: `Aim for 3-6 months. Save $${(financialData.monthlyExpenses * 3 - financialData.savings).toFixed(0)} more.`
      });
    }

    // Positive reinforcement
    if (savingsRate >= 20 && emergencyMonths >= 3) {
      recs.push({
        type: 'success',
        icon: TrendingUp,
        title: 'Excellent Financial Habits!',
        message: 'You\'re maintaining strong savings and have a solid emergency fund.',
        action: 'Consider investing excess savings for long-term growth.'
      });
    }

    setRecommendations(recs);

    // Generate insights
    const newInsights = [
      {
        type: 'prediction',
        icon: TrendingUp,
        title: 'Next Month Forecast',
        value: `$${projectedMonthly.toLocaleString()}`,
        change: '+5%',
        description: 'Based on current trends, your spending may increase slightly.'
      },
      {
        type: 'projection',
        icon: Target,
        title: '6-Month Projection',
        value: `$${predictions?.projectedBalance.toLocaleString() || '0'}`,
        change: '+$' + ((financialData.monthlyIncome - projectedMonthly) * 6).toLocaleString(),
        description: 'If current trends continue, this is your projected balance.'
      },
      {
        type: 'insight',
        icon: Brain,
        title: 'Daily Spending Average',
        value: `$${avgDailySpending.toFixed(2)}`,
        change: null,
        description: `You spend an average of $${avgDailySpending.toFixed(2)} per day.`
      }
    ];

    setInsights(newInsights);
  };

  const calculateDaysUntilGoal = () => {
    // Example: days until $10,000 savings goal
    const goal = 10000;
    const current = financialData.savings;
    const monthlySavings = financialData.monthlyIncome - financialData.monthlyExpenses;
    if (monthlySavings <= 0) return null;
    const monthsNeeded = (goal - current) / monthlySavings;
    return Math.ceil(monthsNeeded * 30);
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'prediction': return { 
        color: 'cyan', 
        bg: 'bg-cyan-400/10', 
        border: 'border-cyan-400/30', 
        text: 'text-cyan-400' 
      };
      case 'projection': return { 
        color: 'lime', 
        bg: 'bg-lime-400/10', 
        border: 'border-lime-400/30', 
        text: 'text-lime-400' 
      };
      case 'insight': return { 
        color: 'yellow', 
        bg: 'bg-yellow-400/10', 
        border: 'border-yellow-400/30', 
        text: 'text-yellow-400' 
      };
      default: return { 
        color: 'gray', 
        bg: 'bg-gray-400/10', 
        border: 'border-gray-400/30', 
        text: 'text-gray-400' 
      };
    }
  };

  const getRecommendationColor = (type) => {
    switch (type) {
      case 'warning': return { 
        color: 'red', 
        bg: 'bg-red-400/10', 
        border: 'border-red-400/30', 
        text: 'text-red-400' 
      };
      case 'info': return { 
        color: 'cyan', 
        bg: 'bg-cyan-400/10', 
        border: 'border-cyan-400/30', 
        text: 'text-cyan-400' 
      };
      case 'success': return { 
        color: 'lime', 
        bg: 'bg-lime-400/10', 
        border: 'border-lime-400/30', 
        text: 'text-lime-400' 
      };
      default: return { 
        color: 'gray', 
        bg: 'bg-gray-400/10', 
        border: 'border-gray-400/30', 
        text: 'text-gray-400' 
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Header - BIGGER */}
      <div className="card bg-gradient-to-br from-purple-400/10 to-pink-400/10 border-2 border-purple-400/30">
        <div className="flex items-center gap-4 mb-6">
          <div className={`
            p-3 rounded-lg 
            bg-purple-400/20
          `}>
            <Brain className="w-7 h-7 text-purple-400" />
          </div>
          <div>
            <h3 className={`
              font-semibold text-2xl 
              text-gray-200
            `}>
              AI Financial Insights
            </h3>
            <p className="text-base text-gray-400">
              Powered by advanced algorithms
            </p>
          </div>
        </div>
      </div>

      {/* Predictions & Insights - BIGGER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => {
          const colorScheme = getInsightColor(insight.type);
          const Icon = insight.icon;
          return (
            <div
              key={index}
              className={`
                card 
                ${colorScheme.bg} 
                ${colorScheme.border}
              `}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-4 h-4 ${colorScheme.text}`} />
                <span className={`
                  text-sm font-medium 
                  text-gray-300
                `}>
                  {insight.title}
                </span>
              </div>
              <div className={`
                text-2xl font-bold mb-1 
                ${colorScheme.text}
              `}>
                {insight.value}
              </div>
              {insight.change && (
                <div className={`
                  text-xs mb-2 
                  ${colorScheme.text}
                `}>
                  {insight.change}
                </div>
              )}
              <p className={`
                text-xs 
                text-gray-400
              `}>
                {insight.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* AI Recommendations */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <h3 className={`
            font-semibold text-lg 
            text-gray-200
          `}>
            Personalized Recommendations
          </h3>
        </div>
        <div className="space-y-3">
          {recommendations.map((rec, index) => {
            const colorScheme = getRecommendationColor(rec.type);
            const Icon = rec.icon;
            return (
              <div
                key={index}
                className={`
                  p-4 rounded-lg 
                  ${colorScheme.bg} 
                  border ${colorScheme.border}
                `}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 ${colorScheme.text} mt-0.5`} />
                  <div className="flex-1">
                    <h4 className={`
                      font-semibold mb-1 
                      ${colorScheme.text}
                    `}>
                      {rec.title}
                    </h4>
                    <p className={`
                      text-sm mb-2 
                      text-gray-300
                    `}>
                      {rec.message}
                    </p>
                    <p className={`
                      text-xs 
                      text-gray-400
                    `}>
                      💡 {rec.action}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Future Projections */}
      {predictions && (
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h3 className={`
              font-semibold text-lg 
              text-gray-200
            `}>
              Future Projections
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">Next Month Spending</span>
              <span className="text-cyan-400 font-semibold">
                ${predictions.nextMonthSpending.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">Year-End Savings Potential</span>
              <span className="text-lime-400 font-semibold">
                ${predictions.yearEndSavings.toLocaleString()}
              </span>
            </div>
            {predictions.daysUntilGoal && (
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <span className="text-gray-300">Days Until $10K Goal</span>
                <span className="text-yellow-400 font-semibold">
                  {predictions.daysUntilGoal} days
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
