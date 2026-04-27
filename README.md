# 🌤️ Weather Insight - Weather App

Weather Insight adalah aplikasi pemantauan cuaca berbasis web yang modern, interaktif, dan imersif. Project ini dikembangkan sebagai bentuk implementasi dari ide project [roadmap.sh/projects/weather-app](https://roadmap.sh/projects/weather-app).

Aplikasi ini tidak hanya memberikan data cuaca yang akurat, tetapi juga memberikan pengalaman visual yang menyesuaikan dengan kondisi cuaca di lokasi yang dicari.

## 🚀 Fitur Utama

1.  **Pencarian Lokasi Global**: Cari data cuaca untuk kota mana pun di seluruh dunia.
2.  **Visualisasi Cuaca Dinamis (Imersif)**:
    *   **Partikel Cuaca**: Animasi hujan, salju, awan bergerak, kabut, matahari yang bersinar, hingga bintang yang berkelap-kelip sesuai kondisi cuaca.
    *   **Tema Latar Belakang**: Warna latar belakang aplikasi berubah secara otomatis mengikuti kondisi cuaca (Cerah, Berawan, Hujan, Badai, dsb).
3.  **Timeline 48 Jam**: Pantau perubahan cuaca setiap jam, mencakup 24 jam ke belakang dan 24 jam ke depan untuk perencanaan yang lebih baik.
4.  **Detail Cuaca Lengkap**: Menampilkan informasi mendalam seperti:
    *   Kecepatan & Arah Angin.
    *   Kelembapan Udara.
    *   Peluang Presipitasi (Hujan).
    *   Tekanan Udara.
5.  **Animasi Ketik (Typing Animation)**: Placeholder pada kolom pencarian yang memberikan saran kota-kota populer secara interaktif.
6.  **Desain Glassmorphism**: Antarmuka modern yang bersih dan transparan, memberikan kesan premium dan responsif di berbagai perangkat.

## 💎 Keunggulan

*   **Pengalaman Visual yang Hidup**: Tidak seperti aplikasi cuaca statis, Weather Insight memberikan nuansa "nyata" melalui animasi partikel.
*   **Ringan & Cepat**: Dibangun menggunakan **Vanilla JavaScript** dan **CSS Murni** tanpa framework berat, memastikan performa maksimal.
*   **Akurasi Data**: Menggunakan **Visual Crossing Weather API** yang menyediakan data komprehensif mulai dari historis hingga prakiraan masa depan.
*   **Navigasi Mudah**: Timeline yang otomatis bergeser ke waktu "Sekarang" memudahkan pengguna melihat kondisi saat ini secara instan.

## 🛠️ Teknologi yang Digunakan

*   **HTML5**: Struktur semantik.
*   **CSS3**: Styling modern dengan Glassmorphism dan Keyframe Animations.
*   **Vanilla JavaScript (ES6+)**: Logika aplikasi, manipulasi DOM, dan integrasi API.
*   **Visual Crossing API**: Sumber data cuaca global.

## 🏃 Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan project ini di komputer Anda:

1.  **Clone Repositori**:
    ```bash
    git clone https://github.com/username/weather-web-app.git
    ```
2.  **Masuk ke Direktori**:
    ```bash
    cd weather-web-app
    ```
3.  **Buka File**:
    Cukup buka file `index.html` menggunakan browser pilihan Anda (Chrome, Firefox, Edge, dsb).
    
    *Atau jika menggunakan VS Code, Anda bisa menggunakan extension **Live Server** untuk pengalaman pengembangan yang lebih baik.*

4.  **Konfigurasi API (Opsional)**:
    Aplikasi ini sudah menyertakan API Key default. Namun, jika Anda ingin menggunakan kunci sendiri:
    *   Daftar di [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api).
    *   Buka file `script.js`.
    *   Ganti nilai variabel `API_KEY` di baris pertama dengan kunci Anda sendiri.

---

Dibuat dengan ❤️ untuk komunitas pengembang. Inspirasi project dari [roadmap.sh](https://roadmap.sh).
