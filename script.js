// Getting DOM elements
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

// Event listener for form submission
expenseForm.addEventListener('submit', addExpense);

// Array to store expenses
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to add a new expense
function addExpense(e) {
  e.preventDefault();

  // Get input values
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;

  // Create an expense object
  const expense = { description, amount, date, category };

  // Add the expense to the array and local storage
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Clear form fields
  expenseForm.reset();

  // Update the expense list display
  displayExpenses();
}

// Function to display expenses
function displayExpenses() {
  expenseList.innerHTML = '';

  expenses.forEach((expense, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${expense.description}</td>
      <td>${expense.amount}</td>
      <td>${expense.date}</td>
      <td>${expense.category}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
        <button class="btn btn-warning btn-sm" onclick="editExpense(${index})">Edit</button>
      </td>
    `;

    expenseList.appendChild(row);
  });
}

// Function to delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  displayExpenses();
}

// Function to edit an expense
function editExpense(index) {
  const expense = expenses[index];

  document.getElementById('description').value = expense.description;
  document.getElementById('amount').value = expense.amount;
  document.getElementById('date').value = expense.date;
  document.getElementById('category').value = expense.category;

  deleteExpense(index); // Remove the expense from the list while editing
}

// Initialize the app by displaying any existing expenses from local storage
displayExpenses();
