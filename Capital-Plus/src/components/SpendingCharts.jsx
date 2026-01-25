// ============================================
// SPENDING CHARTS COMPONENT
// ============================================
// Simple charts using CSS and SVG (no external dependencies)
// Interactive charts for spending trends and category breakdown
// ============================================

import React from 'react';
import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';

export default function SpendingCharts({ 
  spendingCategories, 
  transactionList,
  monthlyExpenses,
  monthlyIncome 
}) {
  // Prepare data for pie chart (category breakdown)
  const pieData = spendingCategories.map(cat => ({
    name: cat.name,
    value: cat.amount,
    percentage: cat.percentage
  }));

  // Colors for charts
  const COLORS = ['#f87171', '#fb923c', '#fbbf24', '#84cc16', '#22d3ee', '#60a5fa', '#a78bfa'];

  // Calculate total for pie chart
  const totalAmount = pieData.reduce((sum, item) => sum + item.value, 0);

  // Prepare data for line chart (spending over time)
  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const lineData = months.map((month, index) => ({
    month,
    expenses: Math.floor(monthlyExpenses * (0.8 + Math.random() * 0.4)),
    income: Math.floor(monthlyIncome * (0.9 + Math.random() * 0.2))
  }));

  // Find max value for scaling
  const maxValue = Math.max(...lineData.map(d => Math.max(d.expenses, d.income)));

  // Prepare data for bar chart (monthly comparison)
  const barData = [
    { month: 'Oct', income: monthlyIncome * 0.95, expenses: monthlyExpenses * 0.9 },
    { month: 'Nov', income: monthlyIncome * 1.05, expenses: monthlyExpenses * 1.1 },
    { month: 'Dec', income: monthlyIncome, expenses: monthlyExpenses }
  ];
  const maxBarValue = Math.max(...barData.flatMap(d => [d.income, d.expenses]));

  // Calculate pie chart segments
  const calculatePieSegment = (percentage, startAngle) => {
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    const largeArc = angle > 180 ? 1 : 0;
    
    const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
    const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
    const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
    const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
    
    return {
      path: `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`,
      endAngle
    };
  };

  let currentAngle = 0;
  const pieSegments = pieData.map((item, index) => {
    const segment = calculatePieSegment(item.percentage, currentAngle);
    currentAngle = segment.endAngle;
    return {
      ...item,
      path: segment.path,
      color: COLORS[index % COLORS.length]
    };
  });

  return (
    <div className="space-y-6">
      {/* Category Breakdown Pie Chart - BIGGER */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <PieChartIcon className="w-6 h-6 text-cyan-400" />
          <h3 className={`
            font-semibold text-2xl 
            text-gray-200
          `}>
            Spending by Category
          </h3>
        </div>
        <div className="flex items-center justify-center">
          <svg width="300" height="300" viewBox="0 0 200 200" className="mb-4">
            {pieSegments.map((segment, index) => (
              <path
                key={index}
                d={segment.path}
                fill={segment.color}
                stroke="#1f2937"
                strokeWidth="2"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-gray-300 flex-1">{item.name}</span>
              <span className="text-sm font-semibold text-gray-200">
                ${item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Spending Trends Line Chart - BIGGER */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-lime-400" />
          <h3 className={`
            font-semibold text-2xl 
            text-gray-200
          `}>
            Spending Trends (6 Months)
          </h3>
        </div>
        <div className="relative h-80">
          <svg width="100%" height="100%" className="absolute inset-0">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map(i => (
              <line
                key={i}
                x1="10%"
                y1={`${20 + i * 20}%`}
                x2="90%"
                y2={`${20 + i * 20}%`}
                stroke="#374151"
                strokeWidth="1"
              />
            ))}
            
            {/* Y-axis labels */}
            {[0, 1, 2, 3, 4].map(i => (
              <text
                key={i}
                x="8%"
                y={`${20 + i * 20}%`}
                fill="#9ca3af"
                fontSize="10"
                textAnchor="end"
                alignmentBaseline="middle"
              >
                ${Math.floor(maxValue * (1 - i * 0.25)).toLocaleString()}
              </text>
            ))}

            {/* Income line */}
            <polyline
              points={lineData.map((d, i) => 
                `${10 + (i * 80 / (lineData.length - 1))}%,${80 - (d.income / maxValue) * 60}%`
              ).join(' ')}
              fill="none"
              stroke="#84cc16"
              strokeWidth="3"
            />
            
            {/* Expenses line */}
            <polyline
              points={lineData.map((d, i) => 
                `${10 + (i * 80 / (lineData.length - 1))}%,${80 - (d.expenses / maxValue) * 60}%`
              ).join(' ')}
              fill="none"
              stroke="#f87171"
              strokeWidth="3"
            />

            {/* Data points */}
            {lineData.map((d, i) => {
              const x = 10 + (i * 80 / (lineData.length - 1));
              return (
                <g key={i}>
                  <circle
                    cx={`${x}%`}
                    cy={`${80 - (d.income / maxValue) * 60}%`}
                    r="4"
                    fill="#84cc16"
                  />
                  <circle
                    cx={`${x}%`}
                    cy={`${80 - (d.expenses / maxValue) * 60}%`}
                    r="4"
                    fill="#f87171"
                  />
                </g>
              );
            })}

            {/* X-axis labels */}
            {lineData.map((d, i) => {
              const x = 10 + (i * 80 / (lineData.length - 1));
              return (
                <text
                  key={i}
                  x={`${x}%`}
                  y="95%"
                  fill="#9ca3af"
                  fontSize="12"
                  textAnchor="middle"
                >
                  {d.month}
                </text>
              );
            })}
          </svg>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-lime-400 rounded-full" />
            <span className="text-sm text-gray-400">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <span className="text-sm text-gray-400">Expenses</span>
          </div>
        </div>
      </div>

      {/* Monthly Comparison Bar Chart - BIGGER */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-yellow-400" />
          <h3 className={`
            font-semibold text-2xl 
            text-gray-200
          `}>
            Monthly Comparison
          </h3>
        </div>
        <div className="space-y-4">
          {barData.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">{item.month}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-lime-400">
                    Income: ${item.income.toLocaleString()}
                  </span>
                  <span className="text-sm text-red-400">
                    Expenses: ${item.expenses.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 h-8">
                <div 
                  className="bg-lime-400 rounded"
                  style={{ width: `${(item.income / maxBarValue) * 100}%` }}
                />
                <div 
                  className="bg-red-400 rounded"
                  style={{ width: `${(item.expenses / maxBarValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
