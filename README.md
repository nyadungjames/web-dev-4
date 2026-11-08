# SpendWise - Interactive Budget Tracker

## What Improvements Were Made to SpendWise This Week
This week SpendWise was upgraded from prompt() popups to a fully interactive web app.
- Replaced prompt() with real HTML forms for income and expenses
- Added a live dashboard that updates instantly when you add/delete expenses
- Added an expense list where each expense can be deleted individually
- Added a progress bar showing % of income spent
- Added color feedback: balance turns red when overspending, progress bar turns orange/red
- Added a Reset button to clear all data

## How Conditionals Are Used in the Project
Conditionals are in `getBudgetMessage()` and `updateDashboard()`:
- `if (income === 0)` -> ask user to enter income
- `else if (balance < 0)` -> warn "You are overspending!"
- `else if (balance === 0)` -> "You spent everything"
- `else if (balance < income * 0.1)` -> "You saved very little"
- `else` -> "Great job!"
Conditionals are also used for validation: `if (value > 0)` and `if (!category || !amount)` to reject invalid input.
Color logic also uses ternary: `balance < 0 ? "red" : "green"`.

## How Arrays Are Used to Store Data
Expenses are stored in one array of objects, not individual variables:
```js
let expenses = [];
expenses.push({ category: "Food", amount: 5000 });