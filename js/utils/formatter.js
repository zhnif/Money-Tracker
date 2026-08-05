function formatDate(date) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",

    month: "long",

    year: "numeric",
  });
}

function formatCurrency(number) {
  return Number(number).toLocaleString("id-ID");
}
