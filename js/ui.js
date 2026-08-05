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
