#!/bin/bash
# ==============================================================================
# Script Pembangun & Penandatangan Android TWA (Trusted Web Activity)
# Untuk JapanApp (Production-Ready)
# ==============================================================================

# Warna untuk output terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0;0m' # No Color

echo -e "${BLUE}============================================================${NC}"
echo -e "${GREEN}      Android TWA Build & Keystore Helper - JapanApp${NC}"
echo -e "${BLUE}============================================================${NC}"
echo ""

# 1. Pengecekan Prasyarat (Node.js & Java JDK)
echo -e "${YELLOW}[1/4] Memeriksa prasyarat sistem...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js belum terinstal. Silakan instal Node.js terlebih dahulu.${NC}"
    exit 1
else
    echo -e "${GREEN}✓ Node.js terdeteksi: $(node -v)${NC}"
fi

if ! command -v keytool &> /dev/null; then
    echo -e "${RED}Error: Java JDK (keytool) tidak terdeteksi.${NC}"
    echo -e "Silakan instal Java Development Kit (JDK 17 atau yang lebih baru) terlebih dahulu."
    exit 1
else
    echo -e "${GREEN}✓ Java JDK (keytool) terdeteksi.${NC}"
fi

# 2. Pengecekan / Instalasi Bubblewrap
echo ""
echo -e "${YELLOW}[2/4] Memeriksa Bubblewrap CLI...${NC}"
if ! command -v bubblewrap &> /dev/null; then
    echo -e "${YELLOW}Bubblewrap CLI tidak ditemukan. Memasang secara global...${NC}"
    echo -e "${BLUE}Menjalankan: npm install -g @bubblewrap/cli${NC}"
    npm install -g @bubblewrap/cli
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Bubblewrap CLI berhasil dipasang!${NC}"
    else
        echo -e "${RED}Gagal memasang Bubblewrap. Coba jalankan secara manual: sudo npm install -g @bubblewrap/cli${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ Bubblewrap CLI terdeteksi.${NC}"
fi

# 3. Panduan Inisialisasi Proyek TWA
echo ""
echo -e "${YELLOW}[3/4] Alur Inisialisasi TWA (Trusted Web Activity)${NC}"
echo -e "PENTING: Bubblewrap sebaiknya dijalankan di luar folder Next.js ini"
echo -e "agar file build Android tidak tercampur ke kode web."
echo ""
echo -e "Langkah-langkah berikutnya:"
echo -e "  1. Keluar dari folder ini (misal: ${BLUE}cd ..${NC})"
echo -e "  2. Buat folder baru: ${BLUE}mkdir japanapp-twa && cd japanapp-twa${NC}"
echo -e "  3. Jalankan inisialisasi Bubblewrap dengan manifest PWA web Anda:"
echo -e "     ${GREEN}bubblewrap init --manifest=https://japan-app.vercel.app/manifest.json${NC}"
echo -e "  4. Bubblewrap akan meminta Anda mengisi beberapa detail seperti:"
echo -e "     - Nama aplikasi, nama pendek, package name (gunakan: ${BLUE}com.japanapp.learn${NC})"
echo -e "     - Konfigurasi status bar, splash screen, dll."
echo -e "     - Jalur JDK & Android SDK (jika belum ada, Bubblewrap bisa mendownloadnya otomatis)."

# 4. Panduan Signing Key & digital asset links
echo ""
echo -e "${YELLOW}[4/4] Panduan Pembuatan Keystore & Asset Links${NC}"
echo -e "Setelah inisialisasi selesai, ikuti langkah berikut untuk menandatangani aplikasi:"
echo ""
echo -e "A. ${YELLOW}Menghasilkan Keystore Baru (Signing Key)${NC}"
echo -e "Jika Bubblewrap menanyakan apakah ingin membuat keystore baru, pilih ${GREEN}Yes${NC}."
echo -e "Atau jika ingin membuat manual, jalankan perintah:"
echo -e "  ${BLUE}keytool -genkeypair -v -keystore android.keystore -alias android-alias \\${NC}"
echo -e "  ${BLUE}  -keyalg RSA -keysize 2048 -validity 10000${NC}"
echo -e "*(PENTING: Simpan berkas keystore dan password-nya dengan sangat aman!)*"
echo ""
echo -e "B. ${YELLOW}Mendapatkan SHA-256 Fingerprint untuk Verification${NC}"
echo -e "Untuk menghapus bilah alamat browser (URL bar) di aplikasi Android Anda,"
echo -e "ambil fingerprint sertifikat Anda dengan perintah:"
echo -e "  ${BLUE}keytool -list -v -keystore android.keystore -alias android-alias${NC}"
echo -e "Cari baris ${GREEN}SHA256: XX:XX:XX...${NC} lalu salin nilainya."
echo ""
echo -e "C. ${YELLOW}Perbarui digital asset links di Web:${NC}"
echo -e "Masukkan nilai SHA-256 tersebut ke dalam berkas:"
echo -e "  [public/.well-known/assetlinks.json](file:///home/nxrts/Program%20Koding/Japan-App/public/.well-known/assetlinks.json)"
echo ""
echo -e "D. ${YELLOW}Membangun Android App Bundle (.aab)${NC}"
echo -e "Setelah verifikasi dikonfigurasi, bangun berkas rilis aplikasi Anda:"
echo -e "  ${GREEN}bubblewrap build${NC}"
echo -e "Unggah berkas ${BLUE}app-release-signed.aab${NC} yang dihasilkan ke Google Play Console."
echo ""
echo -e "${GREEN}============================================================${NC}"
echo -e "  Helper selesai. Ikuti petunjuk di atas untuk deploy Google Play!  "
echo -e "${GREEN}============================================================${NC}"
