# Laporan Analisis Fitur Japan App

Berikut adalah analisis mengenai fitur-fitur yang sudah tersedia (diimplementasikan) dan fitur-fitur yang belum ada (potensial untuk dikembangkan) pada aplikasi.

## ✅ Fitur yang Sudah Ada (Implemented Features)

1. **Sistem Pembelajaran Kana (Hiragana & Katakana)**
   - Pembelajaran huruf dasar Jepang dengan referensi yang tertata.

2. **Pembelajaran dan Latihan Kanji**
   - **Kanji Grid Visualization:** Tampilan kanji yang diatur dalam bentuk grid.
   - **Kanji Drawing Practice:** Fitur latihan interaktif untuk menulis atau menggambar kanji (termasuk urutan guratan).

3. **Latihan Kosakata (Vocabulary Flashcards)**
   - Flashcard interaktif untuk melatih ingatan terhadap kosakata.
   - Integrasi sistem Spaced Repetition (Review) untuk mengingatkan pengguna akan kata yang sudah dipelajari.

4. **Kuis dan Evaluasi Pembelajaran**
   - **Quiz & Reverse Quiz:** Tes pemahaman untuk mengevaluasi kemampuan membaca dan menerjemahkan.
   - **Daily Quiz:** Kuis harian untuk menjaga konsistensi belajar.

5. **Kamus Terintegrasi (Jisho Search)**
   - Fitur pencarian kata (Dictionary Overlay) yang terhubung langsung di dalam aplikasi untuk mencari definisi kosakata langsung.

6. **Persiapan JLPT (JLPT Library)**
   - Akses untuk belajar vocabulary, kanji, dan grammar berdasarkan level JLPT (N5 - N1).

7. **Materi Tata Bahasa (Grammar & Materi)**
   - Penjelasan tekstual terkait struktur kalimat dan tata bahasa Jepang.

8. **Permainan Edukatif (Gamification)**
   - Fitur permainan seperti **Match Pairs** (Mencocokkan kartu) untuk metode belajar yang lebih santai.

9. **Statistik dan Pelacakan Progres (Stats)**
   - Memantau perkembangan belajar pengguna, jumlah kartu yang telah di-review, dan persentase penguasaan materi.

10. **Blog & Artikel**
    - Sistem manajemen konten internal yang berisi artikel atau post blog dengan estimasi waktu baca (Read Time Calculation).

11. **Kustomisasi Tema & Tampilan**
    - Dukungan **Dark Mode / Light Mode** serta warna aksen yang dapat dikonfigurasi melalui Settings.
    - Konversi otomatis huruf Romaji ke Kana menggunakan engine **Wanakana**.

---

## ❌ Fitur yang Belum Ada (Missing / Potential Features)

1. **Autentikasi Pengguna & Sinkronisasi Cloud (Cloud Sync)**
   - Saat ini progres sepertinya hanya disimpan secara lokal (di browser perangkat). Belum ada fitur pembuatan akun (Login/Register) untuk menyimpan progres di server agar bisa sinkron antar perangkat.

2. **Audio & Pelafalan (Text-to-Speech / Native Audio)**
   - Belum ada tombol suara yang memungkinkan pengguna mendengarkan pelafalan asli (Native Speaker) untuk karakter Kanji, Kana, maupun contoh kalimat kosakata.

3. **Pengenalan Suara (Speech Recognition)**
   - Fitur untuk mengevaluasi kemampuan berbicara pengguna (*speaking practice*) dengan merekam suara pengguna dan memberikan penilaian keakuratan pelafalan.

4. **Papan Peringkat (Leaderboard) & Fitur Sosial**
   - Belum ada sistem kompetisi antar pengguna (Leaderboard), pamer pencapaian, atau fitur menambahkan "Teman" untuk bertanding skor poin harian.

5. **Dukungan Offline Penuh (PWA / Progressive Web App)**
   - Membuat aplikasi bisa diinstal di layar utama (Homescreen) HP dan digunakan secara luring (tanpa koneksi internet) sepenuhnya.

6. **Target Belajar (Custom Study Goals & Reminders)**
   - Fitur di mana pengguna bisa mengatur notifikasi atau pengingat belajar (misal: "Ingatkan saya belajar jam 8 malam tiap hari") baik via Push Notification atau Email.

7. **Sistem Achievement / Badges Lanjutan**
   - Pemberian penghargaan berupa lencana digital visual (Badges) secara spesifik apabila pengguna berhasil melewati *milestone* tertentu (misalnya: *Combo Login 30 Hari*, *Master N5*).

8. **Simulasi Ujian JLPT (Mock Test)**
   - Latihan soal dengan batas waktu sungguhan (Timer) yang dirancang persis seperti ujian JLPT asli, mencakup *Reading*, *Vocabulary*, dan *Listening* (jika dipadukan dengan fitur audio).
