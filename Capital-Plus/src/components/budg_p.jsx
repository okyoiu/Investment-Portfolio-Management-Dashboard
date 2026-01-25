import React, { useState, useEffect } from 'react';

export default function BudgetPlanner() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = income - totalExpenses;

  const addExpense = () => {
    if (!expenseName || !category || !amount || amount <= 0) {
      alert('Please fill in all fields with valid values');
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      category: category,
      amount: parseFloat(amount)
    };

    setExpenses([...expenses, newExpense]);
    setExpenseName('');
    setCategory('');
    setAmount('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const getCategoryBreakdown = () => {
    const breakdown = {};
    expenses.forEach(exp => {
      if (!breakdown[exp.category]) {
        breakdown[exp.category] = 0;
      }
      breakdown[exp.category] += exp.amount;
    });
    return breakdown;
  };

  const getSuggestions = () => {
    if (income === 0) return [];
    
    const suggestions = [];
    const housingPercent = (expenses.find(e => e.category === 'Housing')?.amount || 0) / income * 100;
    const savingsPercent = (expenses.find(e => e.category === 'Savings')?.amount || 0) / income * 100;
    
    if (housingPercent > 30) {
      suggestions.push('🏠 Housing costs exceed 30% of income. Consider ways to reduce housing expenses.');
    }
    if (savingsPercent < 20) {
      suggestions.push('💰 Try to save at least 20% of your income for future goals.');
    }
    if (remaining < 0) {
      suggestions.push('⚠️ You are spending more than you earn! Review and cut unnecessary expenses.');
    }
    if (totalExpenses > income * 0.9 && remaining >= 0) {
      suggestions.push('⚡ You\'re spending 90%+ of income. Consider building an emergency fund.');
    }

    return suggestions;
  };

  const categoryBreakdown = getCategoryBreakdown();
  const suggestions = getSuggestions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Budget Planner
          </h1>
          <p className="text-gray-400 text-lg">Take control of your finances and discover savings opportunities</p>
        </header>

        {/* Income Section */}
        <div className="mb-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30">
          <label className="block text-lime-400 font-semibold mb-3 text-lg">Monthly Income</label>
          <input
            type="number"
            value={income || ''}
            onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
            placeholder="Enter your monthly income"
            className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
          />
        </div>

        {/* Add Expense Section */}
        <div className="mb-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30">
          <h2 className="text-2xl font-bold text-lime-400 mb-4">Add Expense</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              placeholder="Expense name"
              className="px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-lime-400 transition-colors"
            >
              <option value="">Select category</option>
              <option value="Housing">Housing</option>
              <option value="Transportation">Transportation</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Insurance">Insurance</option>
              <option value="Savings">Savings</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
            />
            <button
              onClick={addExpense}
              className="px-6 py-3 bg-lime-400 text-gray-900 rounded-lg font-semibold hover:bg-lime-300 transition-all duration-200 shadow-lg shadow-lime-400/20 hover:shadow-lime-400/30"
            >
              Add Expense
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-lime-500/10 to-lime-600/10 backdrop-blur-sm rounded-2xl p-6 border border-lime-500/30">
            <div className="text-gray-400 text-sm mb-2">Monthly Income</div>
            <div className="text-3xl font-bold text-lime-400">${income.toFixed(2)}</div>
          </div>
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
            <div className="text-gray-400 text-sm mb-2">Total Expenses</div>
            <div className="text-3xl font-bold text-red-400">${totalExpenses.toFixed(2)}</div>
          </div>
          <div className={`bg-gradient-to-br backdrop-blur-sm rounded-2xl p-6 border ${
            remaining >= 0 
              ? 'from-cyan-500/10 to-cyan-600/10 border-cyan-500/30' 
              : 'from-red-500/10 to-red-600/10 border-red-500/30'
          }`}>
            <div className="text-gray-400 text-sm mb-2">Remaining</div>
            <div className={`text-3xl font-bold ${remaining >= 0 ? 'text-cyan-400' : 'text-red-400'}`}>
              ${remaining.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Expenses List */}
        {expenses.length > 0 && (
          <div className="mb-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30">
            <h2 className="text-2xl font-bold text-lime-400 mb-4">Your Expenses</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-500/30">
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Category</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">% of Income</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                      <td className="py-3 px-4 text-white">{expense.name}</td>
                      <td className="py-3 px-4 text-gray-300">{expense.category}</td>
                      <td className="py-3 px-4 text-white font-semibold">${expense.amount.toFixed(2)}</td>
                      <td className="py-3 px-4 text-cyan-400">
                        {income > 0 ? ((expense.amount / income) * 100).toFixed(1) : 0}%
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => deleteExpense(expense.id)}
                          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-8 bg-gradient-to-br from-amber-500/10 to-amber-600/10 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/30">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">💡 Suggestions</h2>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-300 flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Category Breakdown */}
        {Object.keys(categoryBreakdown).length > 0 && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30">
            <h2 className="text-2xl font-bold text-lime-400 mb-4">📊 Category Breakdown</h2>
            <div className="space-y-3">
              {Object.entries(categoryBreakdown).map(([cat, amt]) => (
                <div key={cat} className="flex justify-between items-center">
                  <span className="text-gray-300">{cat}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-48 bg-gray-700/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-lime-400 to-cyan-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${income > 0 ? (amt / income) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-semibold w-24 text-right">${amt.toFixed(2)}</span>
                    <span className="text-cyan-400 w-16 text-right">
                      {income > 0 ? ((amt / income) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}