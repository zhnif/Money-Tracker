let financeChartInstance = null;

// Fungsi untuk mengelompokkan transaksi berdasarkan tanggal
function getChartDataByDate() {
  if (typeof transactions === "undefined" || !transactions.length) {
    return { labels: [], incomeData: [], expenseData: [] };
  }

  const groupedData = {};

  // Urutkan transaksi dari tanggal tertua ke terbaru
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  sortedTransactions.forEach((t) => {
    const dateObj = new Date(t.date);
    const dateLabel = isNaN(dateObj.getTime())
      ? t.date
      : dateObj.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
        });

    if (!groupedData[dateLabel]) {
      groupedData[dateLabel] = { income: 0, expense: 0 };
    }

    if (t.type === "income") {
      groupedData[dateLabel].income += Number(t.amount);
    } else if (t.type === "expense") {
      groupedData[dateLabel].expense += Number(t.amount);
    }
  });

  const labels = Object.keys(groupedData);
  const incomeData = labels.map((date) => groupedData[date].income);
  const expenseData = labels.map((date) => groupedData[date].expense);

  return { labels, incomeData, expenseData };
}

// Fungsi memperbarui Grafik
function updateChartData() {
  const ctx = document.getElementById("financeChart");
  if (!ctx) return;

  const { labels, incomeData, expenseData } = getChartDataByDate();

  if (financeChartInstance) {
    financeChartInstance.data.labels = labels.length
      ? labels
      : ["Belum ada data"];
    financeChartInstance.data.datasets[0].data = incomeData.length
      ? incomeData
      : [0];
    financeChartInstance.data.datasets[1].data = expenseData.length
      ? expenseData
      : [0];
    financeChartInstance.update();
    return;
  }

  financeChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels.length ? labels : ["Belum ada data"],
      datasets: [
        {
          label: "Pemasukan",
          data: incomeData.length ? incomeData : [0],
          backgroundColor: "rgba(16, 185, 129, 0.85)",
          borderColor: "#10b981",
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false,
        },
        {
          label: "Pengeluaran",
          data: expenseData.length ? expenseData : [0],
          backgroundColor: "rgba(244, 63, 94, 0.85)",
          borderColor: "#f43f5e",
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Memastikan chart menyesuaikan container
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: "#94a3b8",
            font: { family: "Inter", size: 12 },
          },
        },
        y: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: {
            color: "#94a3b8",
            font: { family: "Inter", size: 11 },
            // FORMATTING ANGKAH RUPIAH SUPAYA TIDAK MELEBAR / CACAT (Rp 120000jt -> Rp 120M)
            callback: function (value) {
              if (value >= 1000000000)
                return "Rp " + (value / 1000000000).toFixed(1) + "M";
              if (value >= 1000000)
                return "Rp " + (value / 1000000).toFixed(0) + "jt";
              if (value >= 1000)
                return "Rp " + (value / 1000).toFixed(0) + "rb";
              return "Rp " + value;
            },
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
          align: "end",
          labels: {
            color: "#94a3b8",
            usePointStyle: true,
            boxWidth: 8,
            font: { family: "Inter", size: 12 },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) label += ": ";
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(context.parsed.y);
              }
              return label;
            },
          },
        },
      },
    },
  });
}

// Monkey-patching ke updateSummary
document.addEventListener("DOMContentLoaded", () => {
  if (typeof window.updateSummary === "function") {
    const originalUpdateSummary = window.updateSummary;
    window.updateSummary = function () {
      originalUpdateSummary();
      updateChartData();
    };
  }

  updateChartData();
});
