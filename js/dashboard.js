function calculateIncome() {
  return transactions

    .filter((item) => item.type === "income")

    .reduce((total, item) => total + item.amount, 0);
}

function calculateExpense() {
  return transactions

    .filter((item) => item.type === "expense")

    .reduce((total, item) => total + item.amount, 0);
}

function calculateBalance() {
  return calculateIncome() - calculateExpense();
}

function updateSummary() {
  const totalIncome = calculateIncome();

  const totalExpense = calculateExpense();

  const totalBalance = calculateBalance();

  balance.textContent = formatCurrency(totalBalance);

  income.textContent = formatCurrency(totalIncome);

  expense.textContent = formatCurrency(totalExpense);
}
