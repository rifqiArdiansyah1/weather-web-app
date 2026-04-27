# 🚀 Project Roadmap: Weather Web App (Phase 2 - UI/UX Enhancements)

## 📋 Deskripsi Proyek
Fase ini berfokus pada pengembangan dan peningkatan antarmuka pengguna (UI) dari aplikasi web cuaca yang sudah ada. Tujuannya adalah membuat aplikasi menjadi lebih hidup, dinamis, dan interaktif sesuai dengan kondisi cuaca terkini di lokasi yang dicari pengguna.

## ✨ Fitur Tambahan (Requirements)
Terdapat tiga fitur utama yang harus ditambahkan pada aplikasi:

1. **Animasi Cuaca Terkini (Weather Animations):** 
   Aplikasi harus menampilkan animasi yang merepresentasikan cuaca saat ini secara visual. Misalnya: animasi rintik hujan turun saat cuaca hujan, animasi awan bergerak saat mendung, salju jatuh, dsb.
2. **Dynamic Background (Latar Belakang Dinamis):**
   Warna atau gambar latar belakang (*background*) dari aplikasi harus otomatis berubah menyesuaikan kondisi cuaca. Contohnya: biru terang untuk siang cerah, gradasi abu-abu gelap untuk mendung/hujan, gelap pekat untuk malam hari.
3. **Typing Animation pada Placeholder:**
   Teks `placeholder` pada kotak pencarian (*search input*) tidak boleh statis. Harus ada animasi seolah-olah sedang diketik oleh seseorang (misal: otomatis mengetik "Jakarta...", lalu dihapus perlahan, lalu mengetik "London...", dan seterusnya).

## 📝 Instruksi Implementasi (Step-by-Step)

Untuk programmer / AI agent yang akan mengerjakan, ikuti urutan langkah berikut secara disiplin untuk menjaga kode tetap rapi (gunakan Vanilla HTML/CSS/JS tanpa *library* berat):

### Langkah 1: Animasi Typing pada Placeholder
1. Buka file Javascript utama (`script.js`).
2. Buat sebuah *array* berisi nama-nama kota populer di seluruh dunia (contoh: `["Jakarta", "London", "Tokyo", "New York", "Paris", "Lamongan", "Bojonegoro", "Surabaya", "Bandung", "Semarang", "Malang", "Yogyakarta"]`).
3. Buat logika animasi *typing* (bisa menggunakan `setTimeout` atau `setInterval` yang dipanggil secara rekursif):
   - Tambahkan karakter satu per satu (efek mengetik).
   - Tunggu sejenak setelah kata selesai.
   - Hapus karakter satu per satu (efek *backspace*).
   - Pindah ke kata berikutnya di dalam array.
4. Aplikasikan teks string yang terus berubah tersebut ke dalam atribut `placeholder` pada elemen `<input id="search-input">`.

### Langkah 2: Persiapan Dynamic Background
1. Modifikasi file `styles.css` untuk menyiapkan berbagai *CSS class* spesifik untuk masing-masing tema cuaca. Contoh nama *class*:
   - `.theme-clear-day` (Gradien biru langit cerah)
   - `.theme-clear-night` (Gradien biru sangat gelap/hitam)
   - `.theme-cloudy` (Gradien abu-abu kebiruan)
   - `.theme-rain` (Gradien biru abu-abu pekat)
   - `.theme-snow` (Gradien abu-abu terang kebiruan)
2. Pastikan perubahan transisi *background* berlangsung halus (*smooth transition* pada properti *background*).

### Langkah 3: Animasi Cuaca (Weather Effects / Particles)
1. Tambahkan kontainer absolut pada `index.html` (misalnya `<div id="weather-animation-container"></div>`) yang memiliki index-z di bawah konten UI utama (agar animasi berada di latar belakang).
2. Tulis logika Javascript dan/atau CSS Keyframes murni untuk memunculkan elemen partikel:
   - **Hujan:** _Generate_ garis-garis tipis transparan secara acak yang bergerak cepat dari atas ke bawah (`translateY`).
   - **Awan:** Munculkan elemen/SVG bentuk awan yang bergerak pelan secara horizontal (`translateX`).
   - **Salju:** _Generate_ titik-titik putih dengan posisi vertikal dan sedikit gerakan sinusoidal (kiri-kanan) ke bawah.
3. Buat fungsi Javascript `renderWeatherAnimation(iconCode)` yang akan menyuntikkan (atau menghapus) partikel tersebut ke dalam kontainer sesuai jenis cuaca. Jangan lupa bersihkan partikel cuaca sebelumnya (`innerHTML = ''`) jika cuaca berubah.

### Langkah 4: Penggabungan ke Alur Utama (Data Binding)
1. Perhatikan respon data kondisi cuaca dari Visual Crossing API (`data.currentConditions.icon`). Visual Crossing mengembalikan string standar seperti `rain`, `snow`, `cloudy`, `clear-day`, dsb.
2. Buat fungsi pemetaan utama `updateThemeAndAnimation(iconCode)` yang dipanggil tepat setelah data berhasil di-*fetch*.
3. Fungsi ini bertugas:
   - Menghapus semua *class* tema cuaca yang ada di `<body>`.
   - Menambahkan *class* tema yang sesuai dengan `iconCode`.
   - Memanggil `renderWeatherAnimation(iconCode)` untuk merender partikel.

## ✅ Kriteria Penerimaan (Acceptance Criteria)
- [ ] Teks *placeholder* pada form pencarian terus-menerus menampilkan efek ketik-dan-hapus nama-nama kota bergantian.
- [ ] Setiap kali pencarian kota berhasil diselesaikan, latar belakang berubah warna secara halus menyesuaikan kondisi cuacanya.
- [ ] Terdapat animasi visual bergerak di latar belakang (seperti awan melintas, hujan deras turun, atau partikel salju) yang akurat dengan status cuaca.
- [ ] Animasi tidak menutupi visibilitas dan teks data (*glassmorphism* UI tetap mendominasi dan teks tetap bisa dibaca).
- [ ] Performanya ringan dan tidak mengganggu animasi transisi antarmuka.
