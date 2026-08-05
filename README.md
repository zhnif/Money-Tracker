# 💰 Money Tracker - Kelola Keuangan dengan Mudah & Modern

![Money Tracker Banner](https://img.shields.io/badge/Money%20Tracker-v1.0-6366f1?style=for-the-badge&logo=wallet)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

**Money Tracker** adalah aplikasi pencatatan keuangan pribadi berbasis web yang dirancang dengan antarmuka modern ala _Mobile Banking_ (M-Banking). Aplikasi ini membantu Anda mencatat pemasukan, pengeluaran, serta memvisualisasikan kondisi keuangan secara real-time.

---

## ✨ Fitur Utama

- 💳 **Ringkasan Saldo Real-Time**: Melihat Total Saldo, Total Pemasukan, dan Total Pengeluaran secara instan.
- 📊 **Visualisasi Chart**: Grafik interaktif dari [Chart.js](https://www.chartjs.org/) untuk menganalisis arus kas.
- ➕ **Manajemen Transaksi**: Tambah, edit, dan hapus riwayat transaksi dengan mudah.
- 🔍 **Filter & Pencarian**: Cari transaksi berdasarkan kata kunci atau filter tipe (Pemasukan/Pengeluaran).
- 📜 **Riwayat Transaksi Teratur**: Tampilan daftar riwayat dilengkapi dengan internal scrollbar agar tidak membuat halaman terlalu panjang.
- 📱 **Responsif & UI Modern**: Tampilan Glassmorphism yang nyaman digunakan baik di Mobile (M-Banking style) maupun Desktop.
- 💾 **Penyimpanan Lokal (LocalStorage)**: Data tersimpan aman di browser Anda tanpa perlu _login_ atau server backend.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur halaman web secara semantik.
- **CSS3 (Custom Variables & Flexbox/Grid)**: Desain Glassmorphism & layout responsif.
- **JavaScript (ES6+)**: Logika aplikasi, manipulasi DOM, dan pengelolaan data LocalStorage.
- **Chart.js**: Library visualisasi grafik keuangan.

---

## 📂 Struktur Folder Project

```text
Money-Tracker/
├── css/
│   ├── variables.css      # Variabel warna dan konfigurasi tema
│   ├── style.css          # Style utama & UI Glassmorphism
│   └── responsive.css     # Penyesuaian tampilan mobile & tablet
├── js/
│   ├── utils/
│   │   ├── formatter.js    # Formatter mata uang & tanggal
│   │   └── validator.js    # Validasi input form
│   ├── app.js             # Entry point aplikasi
│   ├── chart.js           # Konfigurasi Chart.js
│   ├── dashboard.js       # Manajemen state dashboard
│   ├── dom.js             # Elemen selector DOM
│   ├── statistics.js      # Kalkulasi statistik keuangan
│   ├── storage.js         # Pengelolaan LocalStorage
│   ├── transaction.js     # Logika CRUD transaksi
│   └── ui.js              # Manipulasi tampilan UI & Toast
├── index.html             # Halaman utama
└── README.md              # Dokumentasi project



'''
🚀 Cara Menjalankan Project
Clone Repositori ini:

Bash
git clone [https://github.com/zhnif/Money-Tracker.git](https://github.com/zhnif/Money-Tracker.git)
Buka Direktori Project:

Bash
cd Money-Tracker
Jalankan Aplikasi:
Buka file index.html di browser favorit Anda atau gunakan ekstensi Live Server di VS Code.

🤝 Kontribusi
Kontribusi, kritik, dan saran selalu terbuka! Jika Anda memiliki ide untuk fitur baru atau perbaikan bug:

Fork repositori ini.

Buat feature branch baru (git checkout -b feature/FiturBaru).

Commit perubahan Anda (git commit -m 'Menambahkan Fitur Baru').

Push ke branch (git push origin feature/FiturBaru).

Buat Pull Request.

👤 Author
zhnif - GitHub Profile
