function createTransactionObject(title, amount, type, category, date) {
  return {
    id: Date.now(),
    title,
    amount,
    type,
    category,
    date,
  };
}

function addTransaction(data) {
  transactions.push(data);

  saveTransactions(transactions);

  showToast("✅ Transaksi berhasil ditambahkan");
}

function updateTransaction(data) {
  const index = transactions.findIndex((item) => item.id === editId);

  if (index === -1) return;

  transactions[index] = {
    ...transactions[index],

    ...data,

    id: editId,
  };

  saveTransactions(transactions);

  showToast("✏️ Transaksi berhasil diperbarui");

  editId = null;

  document.querySelector("#transactionForm button").textContent =
    "➕ Tambah Transaksi";
}

function deleteTransaction(id) {
  if (!confirm("Yakin ingin menghapus transaksi ini?")) {
    return;
  }

  transactions = transactions.filter((item) => item.id !== id);

  if (editId === id) {
    editId = null;

    form.reset();

    document.querySelector("#transactionForm button").textContent =
      "➕ Tambah Transaksi";
  }

  saveTransactions(transactions);

  showToast("🗑️ Transaksi berhasil dihapus", "error");

  renderTransactions();

  updateSummary();
}

function editTransaction(id) {
  const item = transactions.find((item) => item.id === id);

  if (!item) return;

  editId = id;

  document.getElementById("title").value = item.title;

  amountInput.value = item.amount.toLocaleString("id-ID");

  document.getElementById("type").value = item.type;

  document.getElementById("category").value = item.category;

  document.getElementById("date").value = item.date;

  document.querySelector("#transactionForm button").textContent =
    "💾 Simpan Perubahan";

  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });

  document.getElementById("title").focus();
}
