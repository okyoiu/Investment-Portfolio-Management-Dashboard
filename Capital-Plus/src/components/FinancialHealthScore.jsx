// ============================================
// FINANCIAL HEALTH SCORE COMPONENT
// ============================================
// Calculates overall financial health (0-100)
// Color-coded indicators and improvement suggestions
// ============================================

import React from 'react';
import { Heart, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export default function FinancialHealthScore({ financialData, spendingCategories }) {
  // Calculate financial health score (0-100)
  const calculateHealthScore = () => {
    let score = 0;
    const factors = [];

    // 1. Savings Rate (0-30 points)
    const savingsRate = ((financialData.monthlyIncome - financialData.monthlyExpenses) / financialData.monthlyIncome) * 100;
    const savingsScore = Math.min(savingsRate / 2, 30); // 60% savings rate = 30 points
    score += savingsScore;
    factors.push({
      name: 'Savings Rate',
      score: savingsScore,
      max: 30,
      status: savingsRate >= 20 ? 'excellent' : savingsRate >= 10 ? 'good' : 'poor',
      message: savingsRate >= 20 
        ? `Excellent! You're saving ${savingsRate.toFixed(1)}% of your income.`
        : savingsRate >= 10 
          ? `Good! You're saving ${savingsRate.toFixed(1)}% of your income.`
          : `Consider saving at least 20% of your income. Currently ${savingsRate.toFixed(1)}%.`
    });

    // 2. Emergency Fund (0-25 points)
    const emergencyFundMonths = financialData.savings / financialData.monthlyExpenses;
    const emergencyScore = Math.min(emergencyFundMonths * 5, 25); // 5 months = 25 points
    score += emergencyScore;
    factors.push({
      name: 'Emergency Fund',
      score: emergencyScore,
      max: 25,
      status: emergencyFundMonths >= 6 ? 'excellent' : emergencyFundMonths >= 3 ? 'good' : 'poor',
      message: emergencyFundMonths >= 6
        ? `Excellent! You have ${emergencyFundMonths.toFixed(1)} months of expenses saved.`
        : emergencyFundMonths >= 3
          ? `Good! You have ${emergencyFundMonths.toFixed(1)} months saved. Aim for 6 months.`
          : `Build an emergency fund of 3-6 months expenses. Currently ${emergencyFundMonths.toFixed(1)} months.`
    });

    // 3. Spending Control (0-25 points)
    const housingPercentage = (spendingCategories.find(c => c.name === 'Housing')?.amount || 0) / financialData.monthlyIncome * 100;
    const housingScore = housingPercentage <= 30 ? 25 : housingPercentage <= 40 ? 15 : 5;
    score += housingScore;
    factors.push({
      name: 'Housing Costs',
      score: housingScore,
      max: 25,
      status: housingPercentage <= 30 ? 'excellent' : housingPercentage <= 40 ? 'good' : 'poor',
      message: housingPercentage <= 30
        ? `Excellent! Housing is ${housingPercentage.toFixed(1)}% of income (target: <30%).`
        : housingPercentage <= 40
          ? `Good! Housing is ${housingPercentage.toFixed(1)}% of income.`
          : `Housing costs are high at ${housingPercentage.toFixed(1)}% of income. Target: <30%.`
    });

    // 4. Debt-to-Income Ratio (0-20 points)
    // Assuming no debt for now, give full points
    const debtScore = 20;
    score += debtScore;
    factors.push({
      name: 'Debt Management',
      score: debtScore,
      max: 20,
      status: 'excellent',
      message: 'No significant debt detected. Keep it up!'
    });

    return { totalScore: Math.round(score), factors };
  };

  const { totalScore, factors } = calculateHealthScore();

  // Get health status and color
  const getHealthStatus = (score) => {
    if (score >= 80) return { 
      label: 'Excellent', 
      color: 'lime', 
      bgClass: 'bg-lime-400/20', 
      borderClass: 'border-lime-400/30',
      textClass: 'text-lime-400'
    };
    if (score >= 60) return { 
      label: 'Good', 
      color: 'cyan', 
      bgClass: 'bg-cyan-400/20', 
      borderClass: 'border-cyan-400/30',
      textClass: 'text-cyan-400'
    };
    if (score >= 40) return { 
      label: 'Fair', 
      color: 'yellow', 
      bgClass: 'bg-yellow-400/20', 
      borderClass: 'border-yellow-400/30',
      textClass: 'text-yellow-400'
    };
    return { 
      label: 'Needs Improvement', 
      color: 'red', 
      bgClass: 'bg-red-400/20', 
      borderClass: 'border-red-400/30',
      textClass: 'text-red-400'
    };
  };

  const status = getHealthStatus(totalScore);

  // Get improvement suggestions
  const getSuggestions = () => {
    const suggestions = [];
    factors.forEach(factor => {
      if (factor.status === 'poor') {
        suggestions.push(factor.message);
      }
    });
    if (suggestions.length === 0) {
      suggestions.push('Your financial health is excellent! Keep maintaining good habits.');
    }
    return suggestions;
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <Heart className={`w-6 h-6 ${status.textClass}`} />
        <h3 className={`
          font-semibold text-2xl 
          text-gray-200
        `}>
          Financial Health Score
        </h3>
      </div>

      {/* Score Display - BIGGER */}
      <div className={`
        mb-6 p-8 rounded-lg 
        ${status.bgClass}
        border-2 ${status.borderClass}
        text-center
      `}>
        <div className={`
          text-8xl font-bold mb-3 
          ${status.textClass}
        `}>
          {totalScore}
        </div>
        <div className={`
          text-3xl font-semibold mb-2 
          ${status.textClass}
        `}>
          {status.label}
        </div>
        <p className="text-base text-gray-400">
          Out of 100 points
        </p>
      </div>

      {/* Score Breakdown */}
      <div className="mb-6">
        <h4 className={`
          font-medium mb-3 
          text-gray-300
        `}>
          Score Breakdown
        </h4>
        <div className="space-y-3">
          {factors.map((factor, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">{factor.name}</span>
                <span className={`
                  text-sm font-semibold 
                  ${factor.status === 'excellent' ? 'text-lime-400' : 
                    factor.status === 'good' ? 'text-cyan-400' : 
                    'text-red-400'}
                `}>
                  {factor.score.toFixed(0)}/{factor.max}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`
                    h-full 
                    transition-all duration-500
                    ${factor.status === 'excellent' ? 'bg-lime-400' : 
                      factor.status === 'good' ? 'bg-cyan-400' : 
                      'bg-red-400'}
                  `}
                  style={{ width: `${(factor.score / factor.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className={`
        p-4 rounded-lg 
        bg-gray-700/30 
        border border-gray-600
      `}>
        <div className="flex items-center gap-2 mb-3">
          {totalScore >= 60 ? (
            <CheckCircle className="w-4 h-4 text-lime-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-yellow-400" />
          )}
          <h4 className={`
            font-medium 
            text-gray-300
          `}>
            {totalScore >= 60 ? 'Keep It Up!' : 'Improvement Suggestions'}
          </h4>
        </div>
        <ul className="space-y-2">
          {getSuggestions().map((suggestion, index) => (
            <li key={index} className={`
              text-sm 
              text-gray-400 
              flex items-start gap-2
            `}>
              <span className="text-cyan-400 mt-1">•</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
