# Panduan Grafik & Persyaratan Google Play Console - JapanApp

Dokumen ini berisi panduan teknis dan daftar periksa (checklist) untuk menyiapkan aset grafik serta pengisian formulir rilis pada Google Play Console untuk JapanApp.

---

## 🎨 1. Aset Grafik Google Play Store

Berikut adalah spesifikasi aset visual wajib dan opsional yang perlu Anda unggah di bagian **Main Store Listing**:

### A. App Icon (Ikon Aplikasi) - ✅ SUDAH SIAP
- **Ukuran**: 512 x 512 piksel.
- **Format**: PNG 32-bit (transparan diperbolehkan, tapi disarankan berbentuk persegi penuh dengan sudut bulat otomatis dari Google Play).
- **Ukuran Berkas**: Maksimal 1 MB.
- **Lokasi Aset Lokal**: `public/icons/icon-512.png`

### B. Feature Graphic (Grafik Unggulan) - ⚠️ WAJIB DIBUAT
Grafik ini digunakan untuk mempromosikan aplikasi Anda di berbagai tempat di Google Play Store (misalnya slide banner rekomendasi).
- **Ukuran**: 1024 x 500 piksel.
- **Format**: PNG atau JPEG (tanpa transparansi).
- **Ukuran Berkas**: Maksimal 15 MB.
- **Rekomendasi Desain**:
  - Tempatkan logo dan elemen visual utama di **tengah grafik** (aman dari pemotongan layar).
  - Hindari menaruh teks promosi penting di dekat pinggir batas luar.
  - Gunakan palet warna yang seragam dengan JapanApp (merah/putih/indigo gradien).

### C. Promo Graphic (Grafik Promo) - ⚠️ OPSIONAL (DISARANKAN)
- **Ukuran**: 180 x 120 piksel.
- **Format**: PNG atau JPEG.
- **Rasio**: 3:2.

### D. Screenshots (Tangkapan Layar) - ✅ SUDAH SIAP
Anda wajib mengunggah minimal 2 screenshot untuk setiap form factor (Phone, 7-inch tablet, 10-inch tablet).
- **Ukuran**: Minimum 320px, maksimum 3840px pada sisi terpanjang.
- **Rasio**: 16:9 (landscape) atau 9:16 (portrait).
- **Lokasi Aset Lokal**:
  - Mobile: `public/images/screenshot-mobile.png`
  - Desktop/Tablet: `public/images/screenshot-desktop.png`

---

## 📋 2. Kuesioner & Formulir Google Play Console

Saat mendaftarkan aplikasi di Play Console, Anda harus menyelesaikan beberapa formulir wajib. Berikut panduan pengisiannya untuk JapanApp:

### A. Kebijakan Privasi (Privacy Policy)
Google Play mewajibkan tautan kebijakan privasi yang aktif.
- **URL**: Gunakan URL domain production Anda yang mengarah langsung ke halaman kebijakan privasi:
  `https://japan-app.vercel.app/privacy-policy`

### B. Rating Konten (Content Rating)
Anda akan mengisi kuesioner penilaian dari IARC (International Age Rating Coalition).
- **Kategori Aplikasi**: Pilih **Education / Reference** (Pendidikan/Referensi).
- **Kekerasan, Ketelanjangan, Bahasa Kasar**: Pilih **No** (Tidak) untuk semua pertanyaan karena aplikasi ini murni untuk pembelajaran bahasa Jepang (Kanji & Kana).
- **Fitur Interaktif**:
  - Apakah aplikasi berbagi lokasi pengguna? **No**
  - Apakah aplikasi memungkinkan pengguna berinteraksi/berkomunikasi satu sama lain? **No**
  - Apakah ada pembelian digital? **No**

### C. Target Audiens & Konten (Target Audience and Content)
- **Rentang Usia Target**: Pilih kelompok usia yang relevan (disarankan mencakup **13-15**, **16-17**, dan **18 ke atas**).
- **Target Anak-anak**: Jika Anda memilih rentang di bawah 13 tahun, Google akan menerapkan kebijakan keluarga yang sangat ketat. Oleh karena itu, lebih baik membatasi target audiens utama ke usia **13 tahun ke atas**.
- **Daya Tarik bagi Anak-anak**: Google akan menanyakan "Apakah listing toko Anda secara tidak sengaja menarik minat anak-anak?". Pilih **No** jika desain Anda profesional untuk remaja/dewasa.

### D. Kategori Aplikasi (App Category)
- **Application Type**: **App** (Aplikasi)
- **Category**: **Education** (Pendidikan)
- **Tags**: Tambahkan tag seperti `Education`, `Language learning`, `Japanese language`.

---

## 🚀 3. Langkah Rilis ke Production

Setelah berkas `.aab` dibangun menggunakan skrip `scripts/build-twa.sh`:
1. Masuk ke [Google Play Console](https://play.google.com/console/).
2. Pilih aplikasi Anda -> buka menu **Production** di bilah sisi.
3. Klik **Create new release**.
4. Unggah berkas `app-release-signed.aab`.
5. Lengkapi catatan rilis (Release Notes) dalam bahasa Indonesia/Inggris (misal: *"Rilis awal JapanApp PWA untuk belajar Kanji dan Kana secara interaktif"*).
6. Simpan, lalu klik **Review release** dan kirimkan untuk peninjauan (Review biasanya memakan waktu 1-3 hari kerja).
