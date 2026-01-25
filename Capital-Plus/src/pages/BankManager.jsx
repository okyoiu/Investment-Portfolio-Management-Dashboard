// ============================================
// BANK MANAGER PAGE COMPONENT
// ============================================
// This page provides advanced money management features:
// - Track and manage money with algorithms
// - Analyze spending patterns
// - Get suggestions based on current trends
// - View financial insights and recommendations
// ============================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Lightbulb, BarChart3 } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function BankManager() {
  const navigate = useNavigate();

  // ============================================
  // STATE VARIABLES
  // ============================================
  
  // User's financial data
  const [financialData, setFinancialData] = useState({
    totalBalance: 12500.00,
    monthlyIncome: 5000.00,
    monthlyExpenses: 3200.00,
    savings: 9300.00,
    investments: 3200.00
  });

  // Spending categories with amounts
  const [spendingCategories, setSpendingCategories] = useState([
    { name: 'Housing', amount: 1200, percentage: 37.5, trend: 'stable' },
    { name: 'Food', amount: 800, percentage: 25.0, trend: 'up' },
    { name: 'Transportation', amount: 600, percentage: 18.8, trend: 'down' },
    { name: 'Entertainment', amount: 400, percentage: 12.5, trend: 'up' },
    { name: 'Utilities', amount: 200, percentage: 6.2, trend: 'stable' }
  ]);

  // Algorithm-generated suggestions
  const [suggestions, setSuggestions] = useState([]);

  // ============================================
  // ALGORITHM FUNCTIONS
  // ============================================

  // Calculate savings rate
  const calculateSavingsRate = () => {
    const savings = financialData.monthlyIncome - financialData.monthlyExpenses;
    return ((savings / financialData.monthlyIncome) * 100).toFixed(1);
  };

  // Analyze spending patterns and generate suggestions
  const analyzeAndSuggest = () => {
    const savingsRate = parseFloat(calculateSavingsRate());
    const newSuggestions = [];

    // Suggestion 1: Savings rate analysis
    if (savingsRate < 20) {
      newSuggestions.push({
        type: 'warning',
        title: 'Low Savings Rate',
        message: `Your savings rate is ${savingsRate}%. Aim for at least 20% to build wealth faster.`,
        action: 'Consider reducing discretionary spending by 10-15%.',
        impact: 'High'
      });
    } else if (savingsRate >= 20 && savingsRate < 30) {
      newSuggestions.push({
        type: 'info',
        title: 'Good Savings Rate',
        message: `Your savings rate is ${savingsRate}%. You're on track!`,
        action: 'Consider increasing to 30% for accelerated growth.',
        impact: 'Medium'
      });
    } else {
      newSuggestions.push({
        type: 'success',
        title: 'Excellent Savings Rate',
        message: `Your savings rate is ${savingsRate}%. Outstanding work!`,
        action: 'Consider investing more of your savings for higher returns.',
        impact: 'Low'
      });
    }

    // Suggestion 2: Expense category analysis
    const highSpending = spendingCategories.find(cat => cat.percentage > 30);
    if (highSpending) {
      newSuggestions.push({
        type: 'warning',
        title: 'High Spending Category',
        message: `${highSpending.name} accounts for ${highSpending.percentage}% of your expenses.`,
        action: `Review ${highSpending.name} spending and look for ways to reduce by 10-20%.`,
        impact: 'High'
      });
    }

    // Suggestion 3: Investment opportunity
    if (financialData.savings > 10000 && financialData.investments < financialData.savings * 0.3) {
      newSuggestions.push({
        type: 'info',
        title: 'Investment Opportunity',
        message: 'You have significant savings but low investments.',
        action: 'Consider investing 30-40% of savings in diversified index funds for long-term growth.',
        impact: 'High'
      });
    }

    // Suggestion 4: Emergency fund check
    const emergencyFundMonths = financialData.savings / financialData.monthlyExpenses;
    if (emergencyFundMonths < 3) {
      newSuggestions.push({
        type: 'warning',
        title: 'Emergency Fund Low',
        message: `You have ${emergencyFundMonths.toFixed(1)} months of expenses saved.`,
        action: 'Build emergency fund to 3-6 months of expenses before investing more.',
        impact: 'High'
      });
    } else if (emergencyFundMonths >= 6) {
      newSuggestions.push({
        type: 'success',
        title: 'Strong Emergency Fund',
        message: `You have ${emergencyFundMonths.toFixed(1)} months of expenses saved.`,
        action: 'Consider moving excess emergency funds to investments for better returns.',
        impact: 'Medium'
      });
    }

    // Suggestion 5: Trend-based suggestion (current market trends)
    newSuggestions.push({
      type: 'info',
      title: 'Current Market Trend',
      message: 'High-yield savings accounts are offering 4-5% APY.',
      action: 'Move savings to a high-yield account to earn more on your emergency fund.',
      impact: 'Medium'
    });

    setSuggestions(newSuggestions);
  };

  // Calculate financial health score (0-100)
  const calculateHealthScore = () => {
    let score = 50; // Base score

    // Savings rate contribution (0-30 points)
    const savingsRate = parseFloat(calculateSavingsRate());
    if (savingsRate >= 30) score += 30;
    else if (savingsRate >= 20) score += 20;
    else if (savingsRate >= 10) score += 10;

    // Emergency fund contribution (0-20 points)
    const emergencyMonths = financialData.savings / financialData.monthlyExpenses;
    if (emergencyMonths >= 6) score += 20;
    else if (emergencyMonths >= 3) score += 15;
    else if (emergencyMonths >= 1) score += 5;

    // Investment contribution (0-20 points)
    const investmentRatio = financialData.investments / financialData.totalBalance;
    if (investmentRatio >= 0.3) score += 20;
    else if (investmentRatio >= 0.2) score += 15;
    else if (investmentRatio >= 0.1) score += 10;

    // Expense control (0-10 points)
    const expenseRatio = financialData.monthlyExpenses / financialData.monthlyIncome;
    if (expenseRatio < 0.5) score += 10;
    else if (expenseRatio < 0.7) score += 5;

    return Math.min(100, Math.max(0, score));
  };

  // Run analysis when component loads
  useEffect(() => {
    analyzeAndSuggest();
  }, []);

  const healthScore = calculateHealthScore();

  // ============================================
  // RENDER (What shows on screen)
  // ============================================
  return (
    <div className="page-bg">
      {/* Top navigation bar */}
      <Navbar />

      {/* Main content container */}
      <div className="page-container">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className={`
            text-4xl font-bold mb-2 
            text-gradient
          `}>
            Bank Manager Dashboard
          </h1>
          <p className="text-gray-400">
            Advanced money tracking, analysis, and intelligent suggestions
          </p>
        </div>

        {/* Financial Health Score Card */}
        <div className={`
          card mb-6 
          border-l-4 
          ${healthScore >= 80 ? 'border-lime-400' : healthScore >= 60 ? 'border-yellow-400' : 'border-red-400'}
        `}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`
                text-lg font-semibold mb-2
                text-gray-200
              `}>
                Financial Health Score
              </h3>
              <p className="text-gray-400 text-sm">
                Based on savings rate, emergency fund, investments, and expense control
              </p>
            </div>
            <div className={`
              text-5xl font-bold
              ${healthScore >= 80 ? 'text-lime-400' : healthScore >= 60 ? 'text-yellow-400' : 'text-red-400'}
            `}>
              {healthScore}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ============================================
              LEFT COLUMN: Financial Overview
              ============================================ */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="w-6 h-6 text-lime-400" />
                  <h3 className="font-semibold text-gray-200">Total Balance</h3>
                </div>
                <p className={`
                  text-3xl font-bold 
                  text-lime-400
                `}>
                  ${financialData.totalBalance.toLocaleString()}
                </p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                  <h3 className="font-semibold text-gray-200">Monthly Income</h3>
                </div>
                <p className={`
                  text-3xl font-bold 
                  text-cyan-400
                `}>
                  ${financialData.monthlyIncome.toLocaleString()}
                </p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                  <h3 className="font-semibold text-gray-200">Monthly Expenses</h3>
                </div>
                <p className={`
                  text-3xl font-bold 
                  text-red-400
                `}>
                  ${financialData.monthlyExpenses.toLocaleString()}
                </p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <PieChart className="w-6 h-6 text-yellow-400" />
                  <h3 className="font-semibold text-gray-200">Savings Rate</h3>
                </div>
                <p className={`
                  text-3xl font-bold 
                  text-yellow-400
                `}>
                  {calculateSavingsRate()}%
                </p>
              </div>
            </div>

            {/* Spending Categories Breakdown */}
            <div className="card">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-lime-400" />
                <h3 className={`
                  text-lg font-semibold 
                  text-gray-200
                `}>
                  Spending by Category
                </h3>
              </div>
              
              <div className="space-y-4">
                {spendingCategories.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{category.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">${category.amount}</span>
                        {category.trend === 'up' && (
                          <TrendingUp className="w-4 h-4 text-red-400" />
                        )}
                        {category.trend === 'down' && (
                          <TrendingDown className="w-4 h-4 text-lime-400" />
                        )}
                      </div>
                    </div>
                    <div className={`
                      w-full h-2 
                      bg-gray-700 rounded-full 
                      overflow-hidden
                    `}>
                      <div 
                        className={`
                          h-full 
                          ${category.percentage > 30 ? 'bg-red-400' : 'bg-lime-400'}
                          transition-all duration-500
                        `}
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <span className={`
                      text-xs text-gray-500 
                      mt-1 block
                    `}>
                      {category.percentage}% of total expenses
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================
              RIGHT COLUMN: Suggestions
              ============================================ */}
          <div className="space-y-6">
            
            {/* Suggestions Header */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-lime-400" />
                <h3 className={`
                  text-lg font-semibold 
                  text-gray-200
                `}>
                  Smart Suggestions
                </h3>
              </div>
              <p className={`
                text-sm text-gray-400 
                mb-4
              `}>
                AI-powered recommendations based on your financial data and current market trends
              </p>
              <button 
                onClick={analyzeAndSuggest}
                className={`
                  w-full py-2 
                  bg-lime-400/20 
                  text-lime-400 
                  rounded-lg 
                  font-medium 
                  hover:bg-lime-400/30 
                  transition-all
                `}
              >
                Refresh Analysis
              </button>
            </div>

            {/* Suggestions List */}
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  className={`
                    card 
                    border-l-4 
                    ${suggestion.type === 'success' ? 'border-lime-400' : 
                      suggestion.type === 'warning' ? 'border-yellow-400' : 
                      'border-cyan-400'}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`
                      p-2 rounded-lg 
                      ${suggestion.type === 'success' ? 'bg-lime-400/20' : 
                        suggestion.type === 'warning' ? 'bg-yellow-400/20' : 
                        'bg-cyan-400/20'}
                    `}>
                      {suggestion.type === 'success' && <TrendingUp className="w-4 h-4 text-lime-400" />}
                      {suggestion.type === 'warning' && <TrendingDown className="w-4 h-4 text-yellow-400" />}
                      {suggestion.type === 'info' && <Lightbulb className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <div className="flex-1">
                      <h4 className={`
                        font-semibold mb-1 
                        text-gray-200
                      `}>
                        {suggestion.title}
                      </h4>
                      <p className={`
                        text-sm mb-2 
                        text-gray-400
                      `}>
                        {suggestion.message}
                      </p>
                      <p className={`
                        text-sm font-medium 
                        text-lime-400
                      `}>
                        💡 {suggestion.action}
                      </p>
                      <span className={`
                        inline-block mt-2 px-2 py-1 
                        text-xs rounded 
                        ${suggestion.impact === 'High' ? 'bg-red-400/20 text-red-400' : 
                          suggestion.impact === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' : 
                          'bg-gray-400/20 text-gray-400'}
                      `}>
                        {suggestion.impact} Impact
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
