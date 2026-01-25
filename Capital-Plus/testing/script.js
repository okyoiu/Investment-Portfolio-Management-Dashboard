let expenses = [];
let monthlyIncome = 0;

const incomeInput = document.getElementById('income');
const expenseNameInput = document.getElementById('expenseName');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const addBtn = document.getElementById('addBtn');

// Event listeners
incomeInput.addEventListener('input', updateIncome);
addBtn.addEventListener('click', addExpense);

// Allow Enter key to add expense
amountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addExpense();
});

function updateIncome() {
    monthlyIncome = parseFloat(incomeInput.value) || 0;
    updateDisplay();
}

function addExpense() {
    const name = expenseNameInput.value.trim();
    const category = categoryInput.value;
    const amount = parseFloat(amountInput.value);

    if (!name || !category || !amount) {
        alert('Please fill in all fields');
        return;
    }

    expenses.push({
        id: Date.now(),
        name,
        category,
        amount
    });

    // Clear inputs
    expenseNameInput.value = '';
    categoryInput.value = '';
    amountInput.value = '';

    updateDisplay();
}

function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    updateDisplay();
}

function updateDisplay() {
    updateSummary();
    updateExpensesTable();
    updateSuggestions();
    updateCategoryBreakdown();
}

function updateSummary() {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remaining = monthlyIncome - totalExpenses;

    document.getElementById('totalIncome').textContent = `$${monthlyIncome.toFixed(2)}`;
    document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
    
    const remainingEl = document.getElementById('remaining');
    remainingEl.textContent = `$${remaining.toFixed(2)}`;
    remainingEl.className = 'card-value ' + (remaining >= 0 ? 'positive' : 'negative');
}

function updateExpensesTable() {
    const tbody = document.getElementById('expensesBody');
    const expensesList = document.getElementById('expensesList');

    if (expenses.length === 0) {
        expensesList.style.display = 'none';
        return;
    }

    expensesList.style.display = 'block';
    tbody.innerHTML = '';

    expenses.forEach(exp => {
        const percentage = monthlyIncome > 0 ? ((exp.amount / monthlyIncome) * 100).toFixed(1) : 0;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${exp.name}</td>
            <td>${exp.category}</td>
            <td><strong>$${exp.amount.toFixed(2)}</strong></td>
            <td>${percentage}%</td>
            <td><button class="delete-btn" onclick="deleteExpense(${exp.id})">Delete</button></td>
        `;
        tbody.appendChild(row);
    });
}

function getCategoryTotals() {
    const totals = {};
    expenses.forEach(exp => {
        totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
    });
    return totals;
}

function updateSuggestions() {
    const suggestionsDiv = document.getElementById('suggestions');
    const categoryTotals = getCategoryTotals();
    const suggestions = [];

    Object.entries(categoryTotals).forEach(([category, amount]) => {
        const percentage = monthlyIncome > 0 ? (amount / monthlyIncome) * 100 : 0;

        if (category === 'Food & Dining' && percentage > 15) {
            suggestions.push({
                category,
                amount,
                suggestion: 'Try meal planning and cooking at home more often. Limit dining out to special occasions.',
                potential: amount * 0.3
            });
        }
        if (category === 'Entertainment' && percentage > 10) {
            suggestions.push({
                category,
                amount,
                suggestion: 'Look for free or low-cost activities. Consider canceling unused subscriptions.',
                potential: amount * 0.4
            });
        }
        if (category === 'Shopping' && percentage > 10) {
            suggestions.push({
                category,
                amount,
                suggestion: 'Wait 24-48 hours before non-essential purchases. Use the 30-day rule for bigger items.',
                potential: amount * 0.35
            });
        }
        if (category === 'Transportation' && percentage > 20) {
            suggestions.push({
                category,
                amount,
                suggestion: 'Consider carpooling, public transit, or biking. Shop around for better insurance rates.',
                potential: amount * 0.2
            });
        }
        if (category === 'Utilities' && percentage > 10) {
            suggestions.push({
                category,
                amount,
                suggestion: 'Reduce energy usage: adjust thermostat, use LED bulbs, unplug devices when not in use.',
                potential: amount * 0.15
            });
        }
    });

    if (!categoryTotals['Savings'] || categoryTotals['Savings'] < monthlyIncome * 0.2) {
        suggestions.push({
            category: 'Savings',
            amount: categoryTotals['Savings'] || 0,
            suggestion: 'Aim to save at least 20% of your income. Set up automatic transfers to a savings account.',
            potential: monthlyIncome * 0.2 - (categoryTotals['Savings'] || 0)
        });
    }

    if (suggestions.length === 0) {
        suggestionsDiv.style.display = 'none';
        return;
    }

    suggestionsDiv.style.display = 'block';
    
    let html = '<h2>💡 Ways to Save Money</h2>';
    
    suggestions.forEach(sug => {
        const currentPercent = monthlyIncome > 0 ? ((sug.amount / monthlyIncome) * 100).toFixed(1) : 0;
        html += `
            <div class="suggestion-card">
                <h3>${sug.category}</h3>
                <p style="color: #6b7280; margin-bottom: 0.5rem;">Current: $${sug.amount.toFixed(2)} (${currentPercent}% of income)</p>
                <p>${sug.suggestion}</p>
                <div class="suggestion-savings">Potential monthly savings: $${sug.potential.toFixed(2)}</div>
            </div>
        `;
    });

    const totalSavings = suggestions.reduce((sum, s) => sum + s.potential, 0);
    html += `
        <div class="total-savings">
            <div class="total-savings-amount">Total Potential Savings: $${totalSavings.toFixed(2)}/month</div>
            <div class="total-savings-yearly">That's $${(totalSavings * 12).toFixed(2)} per year!</div>
        </div>
    `;

    suggestionsDiv.innerHTML = html;
}

function updateCategoryBreakdown() {
    const breakdownDiv = document.getElementById('categoryBreakdown');
    const categoryTotals = getCategoryTotals();

    if (Object.keys(categoryTotals).length === 0) {
        breakdownDiv.style.display = 'none';
        return;
    }

    breakdownDiv.style.display = 'block';

    let html = '<h2>Spending by Category</h2><div class="category-grid">';

    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

    sortedCategories.forEach(([category, amount]) => {
        const percentage = monthlyIncome > 0 ? ((amount / monthlyIncome) * 100).toFixed(1) : 0;
        const barWidth = monthlyIncome > 0 ? (amount / monthlyIncome) * 100 : 0;

        html += `
            <div class="category-item">
                <div class="category-header">
                    <span class="category-name">${category}</span>
                    <span class="category-amount">$${amount.toFixed(2)}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${barWidth}%"></div>
                </div>
                <div class="category-percentage">${percentage}% of income</div>
            </div>
        `;
    });

    html += '</div>';
    breakdownDiv.innerHTML = html;
}