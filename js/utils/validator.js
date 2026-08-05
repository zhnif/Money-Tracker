function validateTransaction(title, amount, date) {
  if (title === "") {
    showToast("Judul wajib diisi", "error");

    return false;
  }

  if (amount <= 0) {
    showToast("Nominal harus lebih dari 0", "error");

    return false;
  }

  if (date === "") {
    showToast("Tanggal wajib diisi", "error");

    return false;
  }

  return true;
}
