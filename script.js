// SpendWise - Interactive Version - Week 7

// 1. DATA STORAGE - Array of Objects
let monthlyIncome = 0;
let expenses = []; // Each expense = { category: "Food", amount: 5000 }
const SAVINGS_RATE = 0.20;
const CURRENCY = "KES";

// DOM ELEMENTS
const incomeForm = document.getElementById("incomeForm");
const expenseForm = document.getElementById("expenseForm");
const incomeInput = document.getElementById("incomeInput");
const categoryInput = document.getElementById("categoryInput");
const amountInput = document.getElementById("amountInput");
const expenseList = document.getElementById("expenseList");
const incomeDisplay = document.getElementById("incomeDisplay");
const expenseDisplay = document.getElementById("expenseDisplay");
const balanceDisplay = document.getElementById("balanceDisplay");
const savingsDisplay = document.getElementById("savingsDisplay");
const messageEl = document.getElementById("message");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

// 2. CALCULATIONS - Functions
function calculateTotalExpenses() {
    let total = 0;
    // LOOP - Requirement 3: Process array with loop
    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }
    return total;
}

function getBudgetMessage(balance, income) {
    // CONDITIONALS - Requirement 1: Decision Making
    if (income === 0) {
        return "Enter your income to start.";
    } else if (balance < 0) {
        return "⚠️ You are overspending! You spent more than you earn.";
    } else if (balance === 0) {
        return "You spent everything. Try to save a little next month.";
    } else if (balance < income * 0.1) {
        return "Good start, but you saved very little. Aim for 20%.";
    } else {
        return "🎉 Great job! You are managing your money well.";
    }
}

// 3. DOM UPDATE - Requirement 4: Update Dashboard Dynamically
function updateDashboard() {
    const totalExpenses = calculateTotalExpenses();
    const balance = monthlyIncome - totalExpenses;
    const savingsGoal = monthlyIncome * SAVINGS_RATE;

    incomeDisplay.textContent = `${CURRENCY} ${monthlyIncome}`;
    expenseDisplay.textContent = `${CURRENCY} ${totalExpenses}`;
    balanceDisplay.textContent = `${CURRENCY} ${balance}`;
    savingsDisplay.textContent = `${CURRENCY} ${savingsGoal}`;
    messageEl.textContent = getBudgetMessage(balance, monthlyIncome);

    // Color balance red if overspending
    balanceDisplay.style.color = balance < 0 ? "red" : "#0a7a42";

    // Progress bar: % of income spent
    let percent = monthlyIncome > 0 ? Math.min((totalExpenses / monthlyIncome) * 100, 100) : 0;
    progressBar.style.width = percent + "%";
    progressBar.style.background = percent > 100 || balance < 0 ? "red" : percent > 80 ? "orange" : "#0a7a42";
    progressText.textContent = monthlyIncome > 0 ? `You have spent ${Math.round(percent)}% of your income` : "";

    // Console log for lecturer
    console.log("Income:", monthlyIncome, "Total Expenses:", totalExpenses, "Balance:", balance);

    renderExpenseList();
}

function renderExpenseList() {
    expenseList.innerHTML = ""; // Clear list

    if (expenses.length === 0) {
        expenseList.innerHTML = '<li class="empty">No expenses yet. Add one above.</li>';
        return;
    }

    // LOOP to display each expense
    for (let i = 0; i < expenses.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = `<span>${expenses[i].category} - ${CURRENCY} ${expenses[i].amount}</span>`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        // EVENT LISTENER inside loop - each button deletes its own item
        deleteBtn.addEventListener("click", function() {
            expenses.splice(i, 1); // Remove from array
            updateDashboard();
        });

        li.appendChild(deleteBtn);
        expenseList.appendChild(li);
    }
}

// 4. EVENT HANDLERS - Requirement 5: Handle User Interactions
incomeForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Stop page refresh
    const value = parseFloat(incomeInput.value);
    if (value > 0) {
        monthlyIncome = value;
        incomeInput.value = "";
        updateDashboard();
    } else {
        alert("Please enter a valid income");
    }
});

expenseForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const category = categoryInput.value;
    const amount = parseFloat(amountInput.value);

    if (!category || !amount || amount <= 0) {
        alert("Please select a category and enter a valid amount");
        return;
    }

    // Add to ARRAY - Requirement 2
    expenses.push({ category: category, amount: amount });
    amountInput.value = "";
    categoryInput.value = "";
    updateDashboard();
});

document.getElementById("resetBtn").addEventListener("click", function() {
    monthlyIncome = 0;
    expenses = [];
    updateDashboard();
});

// Initial render
updateDashboard();