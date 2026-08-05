function updateStatistics(totalIncome, totalExpense, transactions) {
  totalTransaction.textContent = transactions.length;

  totalIncomeCard.textContent = "Rp" + totalIncome.toLocaleString("id-ID");

  totalExpenseCard.textContent = "Rp" + totalExpense.toLocaleString("id-ID");

  const totalNominal = totalIncome + totalExpense;

  const average =
    transactions.length === 0
      ? 0
      : Math.round(totalNominal / transactions.length);

  averageTransaction.textContent = "Rp" + average.toLocaleString("id-ID");
}
