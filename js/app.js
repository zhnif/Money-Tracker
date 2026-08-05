const form = document.getElementById("transactionForm");
const amountInput = document.getElementById("amount");
const list = document.getElementById("transactionList");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const toast = document.getElementById("toast");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let editId = null;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const amount = Number(amountInput.value.replace(/\./g, ""));
  const date = document.getElementById("date").value;

  if (title === "") {
    showToast("Judul wajib diisi", "error");
    return;
  }
  if (amount <= 0) {
    showToast("Nominal harus lebih dari 0", "error");
    return;
  }
  if (date === "") {
    showToast("Tanggal wajib diisi", "error");
    return;
  }

  const data = {
    id: Date.now(),
    title: title,
    amount: amount,
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
    date: date,
  };

  if (editId !== null) {
    const index = transactions.findIndex((item) => item.id === editId);

    transactions[index] = {
      ...transactions[index],

      ...data,

      id: editId,
    };

    saveTransactions();

    showToast("✏️ Transaksi berhasil diperbarui");

    editId = null;

    document.querySelector("#transactionForm button").textContent =
      "➕ Tambah Transaksi";
  } else {
    transactions.push(data);

    saveTransactions();

    showToast("✅ Transaksi berhasil ditambahkan");
  }

  renderTransactions();

  updateSummary();

  form.reset();
});

function renderTransactions() {
  const keyword = search.value.toLowerCase();

  const typeFilter = filter.value;

  const filtered = transactions.filter((item) => {
    const matchTitle = item.title.toLowerCase().includes(keyword);

    const matchType = typeFilter === "all" || item.type === typeFilter;

    return matchTitle && matchType;
  });

  if (filtered.length === 0) {
    list.innerHTML = '<p class="empty">📭 Tidak ada transaksi.</p>';

    return;
  }

  list.innerHTML = "";

  filtered.forEach((item) => {
    list.innerHTML += `

        <div class="transaction">

            <div class="transaction-left">

                <h3>${item.title}</h3>

                <p>

                    <span class="badge">

                        ${item.category}

                    </span>

                    <span class="date">

                        ${formatDate(item.date)}

                    </span>

                </p>    

            </div>

            <div>

                <h3 class="${item.type === "income" ? "plus" : "minus"}">

                    ${item.type === "income" ? "+" : "-"}Rp${item.amount.toLocaleString("id-ID")}

                </h3>

                <br>

                <div style="display:flex;gap:8px;margin-top:10px;">

                    <button
                        class="edit-btn"
                        onclick="editTransaction(${item.id})">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteTransaction(${item.id})">
                        Hapus
                    </button>

                </div>

            </div>

        </div>

        `;
  });
}

function updateSummary() {
  let totalIncome = 0;
  let totalExpense = 0;
  transactions.forEach((item) => {
    if (item.type === "income") {
      totalIncome += item.amount;
    } else {
      totalExpense += item.amount;
    }
  });

  balance.textContent =
    "Rp" + (totalIncome - totalExpense).toLocaleString("id-ID");
  income.textContent = "Rp" + totalIncome.toLocaleString("id-ID");
  expense.textContent = "Rp" + totalExpense.toLocaleString("id-ID");
}

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
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

  saveTransactions();

  showToast("🗑️ Transaksi berhasil dihapus", "error");

  renderTransactions();

  updateSummary();
}

function showToast(message, type = "success") {
  toast.textContent = message;

  toast.className = "";

  if (type === "error") {
    toast.classList.add("error");
  }

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",

    month: "long",

    year: "numeric",
  });
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

amountInput.addEventListener("input", function () {
  let value = this.value.replace(/\D/g, "");

  if (value === "") {
    this.value = "";

    return;
  }

  this.value = Number(value).toLocaleString("id-ID");
});

search.addEventListener("input", renderTransactions);

filter.addEventListener("change", renderTransactions);

renderTransactions();
updateSummary();
