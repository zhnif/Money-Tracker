let transactions = loadTransactions();
let editId = null;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const amount = Number(amountInput.value.replace(/\./g, ""));
  const date = document.getElementById("date").value;

  if (!validateTransaction(title, amount, date)) {
    return;
  }

  const data = createTransactionObject(
    title,

    amount,

    document.getElementById("type").value,

    document.getElementById("category").value,

    date,
  );

  if (editId !== null) {
    updateTransaction(data);
  } else {
    addTransaction(data);
  }

  renderTransactions();

  updateSummary();

  form.reset();
});

amountInput.addEventListener("input", function () {
  let value = this.value.replace(/\D/g, "");

  if (value === "") {
    this.value = "";

    return;
  }

  this.value = formatCurrency(value);
});

search.addEventListener("input", renderTransactions);

filter.addEventListener("change", renderTransactions);

renderTransactions();
updateSummary();
