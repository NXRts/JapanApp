"use client";

import React, { useState, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  background: var(--background);
  color: var(--foreground);
  font-family: "Inter", "Noto Sans JP", sans-serif;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 6rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem 1rem 4rem;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(
    135deg,
    rgba(var(--primary-rgb), 0.08) 0%,
    rgba(var(--secondary-rgb), 0.04) 100%
  );
  border-radius: 24px;
  border: 1px solid var(--border);
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  animation: ${fadeIn} 0.6s ease-out;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(var(--primary-rgb), 0.03) 0%,
      transparent 50%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 2.5rem 1rem;
    margin-bottom: 2rem;
    border-radius: 16px;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--foreground);
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(
      135deg,
      var(--primary) 0%,
      var(--primary-light) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-family: "Noto Sans JP", sans-serif;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 550px;
  width: 100%;
  margin: 0 auto;
  z-index: 10;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.1rem 1.5rem 1.1rem 3.25rem;
  font-size: 1.05rem;
  border-radius: 999px;
  border: 2px solid var(--border);
  background: var(--surface);
  color: var(--foreground);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.15), var(--shadow-md);
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: color 0.3s ease;

  ${SearchInput}:focus + & {
    color: var(--primary);
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: var(--border);
    color: var(--foreground);
  }
`;

const GridTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 1.5rem;
    background: var(--primary);
    border-radius: 3px;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 3.5rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

interface CategoryCardProps {
  $active: boolean;
  $accentColor: string;
}

const CategoryCard = styled.button<CategoryCardProps>`
  background: var(--surface);
  border: 2px solid ${props => props.$active ? props.$accentColor : "var(--border)"};
  border-radius: 20px;
  padding: 1.75rem 1.25rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$active ? `0 8px 24px -6px rgba(var(--primary-rgb), 0.15)` : "var(--shadow-sm)"};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;

  &:hover {
    transform: translateY(-5px);
    border-color: ${props => props.$accentColor};
    box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.1), var(--shadow-md);
  }

  .icon-container {
    width: 54px;
    height: 54px;
    border-radius: 16px;
    background: ${props => `rgba(${props.$accentColor === "var(--primary)" ? "var(--primary-rgb)" : props.$accentColor === "var(--secondary)" ? "var(--secondary-rgb)" : "var(--accent-rgb)"}, 0.1)`};
    color: ${props => props.$accentColor};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  h3 {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--foreground);
    margin: 0;
  }

  p {
    font-size: 0.825rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.4;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ResetFilterButton = styled.button`
  background: transparent;
  border: 1px solid var(--border);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.35rem;

  &:hover {
    background: var(--border);
    color: var(--foreground);
  }
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 4rem;
`;

const AccordionItem = styled(motion.div)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: var(--primary-light);
  }
`;

interface AccordionHeaderProps {
  $isOpen: boolean;
}

const AccordionHeader = styled.button<AccordionHeaderProps>`
  width: 100%;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.$isOpen ? "var(--primary)" : "var(--foreground)"};
  transition: color 0.3s ease;

  span {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .category-tag {
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
    border-radius: 99px;
    background: rgba(var(--primary-rgb), 0.08);
    color: var(--primary);
    font-weight: 500;
  }

  .arrow-icon {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${props => props.$isOpen ? "rotate(180deg)" : "rotate(0)"};
    color: var(--text-secondary);
  }

  @media (max-width: 600px) {
    padding: 1rem 1.25rem;
    font-size: 1rem;
  }
`;

const AccordionContent = styled(motion.div)`
  overflow: hidden;
`;

const AccordionBody = styled.div`
  padding: 0 1.5rem 1.5rem;
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.975rem;
  border-top: 1px solid rgba(var(--primary-rgb), 0.05);

  p {
    margin-bottom: 0.75rem;
  }
  
  p:last-child {
    margin-bottom: 0;
  }

  strong {
    color: var(--foreground);
  }

  ul {
    margin-left: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  @media (max-width: 600px) {
    padding: 0 1.25rem 1.25rem;
    font-size: 0.9rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: var(--surface);
  border: 1px dashed var(--border);
  border-radius: 16px;
  color: var(--text-secondary);

  svg {
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  h3 {
    color: var(--foreground);
    margin-bottom: 0.5rem;
    font-weight: 700;
  }
`;

const ContactSection = styled.section`
  background: linear-gradient(
    135deg,
    var(--surface) 0%,
    rgba(var(--primary-rgb), 0.02) 100%
  );
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  box-shadow: var(--shadow-sm);
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1.5rem;
  }
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 1.85rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: var(--foreground);
    line-height: 1.2;

    span {
      color: var(--primary);
    }
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 2rem;
    font-size: 1.05rem;
  }

  .badge-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .badge-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 600;
    color: var(--foreground);
    font-size: 0.95rem;

    svg {
      color: var(--secondary);
    }
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: var(--surface);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--foreground);
  }
`;

const FormInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--background);
  color: var(--foreground);
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
  }
`;

const FormSelect = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--background);
  color: var(--foreground);
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--background);
  color: var(--foreground);
  font-family: inherit;
  font-size: 0.95rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
  }
`;

const FormButton = styled.button`
  padding: 0.85rem 1.5rem;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark) 100%
  );
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(var(--primary-rgb), 0.35);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SuccessOverlay = styled(motion.div)`
  text-align: center;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;

  .check-circle {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(var(--secondary-rgb), 0.1);
    color: var(--secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--foreground);
    margin: 0;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.5;
    max-width: 320px;
    margin: 0;
  }
`;

// Types and mock data
interface FaqItem {
  id: string;
  category: "akun" | "belajar" | "jlpt" | "teknis";
  categoryLabel: string;
  question: string;
  answer: React.ReactNode;
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCategory, setFormCategory] = useState("umum");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock FAQs
  const faqs: FaqItem[] = useMemo(() => [
    {
      id: "faq-1",
      category: "akun",
      categoryLabel: "Akun & Keamanan",
      question: "Bagaimana cara mendaftar akun di Japan Learning App?",
      answer: (
        <div>
          <p>
            Anda dapat membuat akun secara gratis dengan mengklik tombol <strong>Register</strong> di pojok kanan atas layar Anda (atau melalui menu navigasi pada mode seluler).
          </p>
          <p>
            Dengan memiliki akun terdaftar, semua data kemajuan belajar Anda seperti <strong>EXP</strong> harian, <strong>Streak belajar</strong>, lencana pencapaian, dan riwayat materi kosakata serta Kanji akan disimpan secara aman di cloud dan dapat disinkronkan di berbagai perangkat.
          </p>
        </div>
      ),
    },
    {
      id: "faq-2",
      category: "akun",
      categoryLabel: "Akun & Keamanan",
      question: "Bagaimana cara mereset atau mengganti kata sandi saya?",
      answer: (
        <div>
          <p>
            Jika Anda lupa kata sandi Anda saat ingin masuk, Anda dapat mengklik tautan <strong>Lupa Sandi</strong> di halaman login untuk menerima surel instruksi pengaturan ulang kata sandi.
          </p>
          <p>
            Jika Anda sudah masuk dan ingin mengubah kata sandi, Anda dapat membuka modal <strong>Pengaturan</strong> melalui menu drop-down "Lainnya" di sidebar kiri, lalu pilih tab keamanan untuk memperbarui kata sandi Anda.
          </p>
        </div>
      ),
    },
    {
      id: "faq-3",
      category: "akun",
      categoryLabel: "Akun & Keamanan",
      question: "Apakah data progres belajar saya akan hilang jika saya logout?",
      answer: (
        <div>
          <p>
            <strong>Tidak</strong>. Selama Anda terdaftar menggunakan akun (email & password), seluruh data progres belajar Anda disimpan secara aman di server kami. Anda dapat logout dan login kembali kapan pun tanpa khawatir kehilangan kemajuan belajar Anda.
          </p>
        </div>
      ),
    },
    {
      id: "faq-4",
      category: "belajar",
      categoryLabel: "Metode Belajar",
      question: "Bagaimana sistem Spaced Repetition (SRS) bekerja di halaman Belajar?",
      answer: (
        <div>
          <p>
            <strong>Spaced Repetition System (SRS)</strong> adalah algoritma pembelajaran yang dirancang untuk membantu Anda mengingat karakter Kanji dan kosakata bahasa Jepang dengan menjadwalkan peninjauan ulang sesaat sebelum Anda melupakannya.
          </p>
          <p>Sistem ini bekerja dengan cara berikut:</p>
          <ul>
            <li>Setiap kartu karakter memiliki tingkat kekuatan memori Anda.</li>
            <li>Jika Anda menjawab dengan benar selama sesi latihan, interval waktu untuk pengulangan berikutnya akan diperpanjang (misal: muncul kembali setelah 3 hari, 7 hari, dst).</li>
            <li>Jika Anda menjawab salah, interval akan disetel ulang dan karakter tersebut akan lebih sering ditanyakan hingga Anda benar-benar menghafalnya.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "faq-5",
      category: "belajar",
      categoryLabel: "Metode Belajar",
      question: "Bagaimana cara mempertahankan Streak harian saya?",
      answer: (
        <div>
          <p>
            <strong>Streak</strong> harian melambangkan konsistensi belajar Anda. Untuk menambah atau mempertahankan jumlah streak Anda, Anda harus menyelesaikan setidaknya <strong>satu materi pelajaran</strong>, menjawab kuis harian, atau menyelesaikan satu latihan menulis karakter setiap hari sebelum tengah malam (pukul 23:59 waktu setempat).
          </p>
          <p>
            Jika Anda melewatkan satu hari penuh tanpa melakukan aktivitas belajar di aplikasi, streak Anda akan tereset menjadi 0 kembali. Anda juga dapat menggunakan item pelindung streak yang bisa diperoleh melalui akumulasi EXP kuis harian tertentu.
          </p>
        </div>
      ),
    },
    {
      id: "faq-6",
      category: "belajar",
      categoryLabel: "Metode Belajar",
      question: "Bagaimana sistem EXP (Experience Points) dan level profil dihitung?",
      answer: (
        <div>
          <p>
            Setiap kali Anda menyelesaikan kuis, latihan menulis, permainan pencocokan kartu, atau membaca artikel blog baru, Anda akan mendapatkan <strong>EXP</strong>.
          </p>
          <p>Distribusi EXP rata-rata adalah:</p>
          <ul>
            <li>Menyelesaikan Kuis Harian: <strong>+15 EXP</strong></li>
            <li>Mempelajari Materi Baru: <strong>+10 EXP</strong></li>
            <li>Menyelesaikan Level Game: <strong>+20 EXP</strong></li>
          </ul>
          <p>
            Setiap kali total EXP Anda mencapai batas ambang level baru, profil Anda secara otomatis naik level. Anda dapat memantau grafik perkembangan EXP mingguan Anda di tab <strong>Stats</strong> di sidebar.
          </p>
        </div>
      ),
    },
    {
      id: "faq-7",
      category: "jlpt",
      categoryLabel: "Materi & JLPT",
      question: "Bagaimana cara mengakses dan mengunduh Practice Sheets?",
      answer: (
        <div>
          <p>
            Japan Learning App menyediakan lembar latihan menulis (<strong>Practice Sheets</strong>) berformat PDF gratis yang dirancang khusus untuk membantu Anda melatih memori otot saat menulis Hiragana, Katakana, dan Kanji.
          </p>
          <p>
            Untuk mengaksesnya, arahkan kursor ke tab navigasi kiri lalu pilih <strong>Practice Sheets</strong>. Dari sana, Anda dapat menyaring lembar latihan berdasarkan level JLPT (N5 - N1) atau jenis karakter, lalu klik tombol download untuk menyimpan dan mencetaknya secara mandiri.
          </p>
        </div>
      ),
    },
    {
      id: "faq-8",
      category: "jlpt",
      categoryLabel: "Materi & JLPT",
      question: "Apakah materi kuis JLPT di sini sesuai dengan standar ujian resmi?",
      answer: (
        <div>
          <p>
            <strong>Ya, materi kami disusun sedemikian rupa agar relevan dengan kurikulum JLPT resmi</strong>.
          </p>
          <p>
            Bank soal dan pembagian materi kosakata, tata bahasa (grammar), dan Kanji kami disesuaikan dengan standar silabus JLPT dari level dasar (N5) hingga tingkat mahir (N1). Latihan soal kami mencakup pilihan ganda, arti kosakata, pelafalan audio, hingga susunan tata bahasa yang sering diujikan.
          </p>
        </div>
      ),
    },
    {
      id: "faq-9",
      category: "jlpt",
      categoryLabel: "Materi & JLPT",
      question: "Bagaimana cara menggunakan fitur audio pelafalan karakter?",
      answer: (
        <div>
          <p>
            Di setiap kartu kosakata atau karakter di halaman <strong>Materials</strong> dan <strong>Characters</strong>, Anda akan menemukan tombol ikon speaker (suara).
          </p>
          <p>
            Cukup klik atau ketuk ikon tersebut untuk memutar audio pengucapan kata tersebut. Audio kami diproduksi menggunakan format ucapan berkualitas tinggi yang disimulasikan sesuai aksen penutur asli Jepang (Tokyo dialect).
          </p>
        </div>
      ),
    },
    {
      id: "faq-10",
      category: "teknis",
      categoryLabel: "Masalah Teknis",
      question: "Audio pelafalan tidak berbunyi di peramban saya, bagaimana memperbaikinya?",
      answer: (
        <div>
          <p>
            Jika Anda mengalami masalah di mana audio pelafalan tidak keluar sama sekali, silakan coba beberapa langkah pemecahan masalah berikut:
          </p>
          <ul>
            <li>Pastikan perangkat Anda tidak dalam mode senyap (silent mode) dan volume media dalam keadaan aktif.</li>
            <li>Di beberapa peramban seluler (seperti Safari di iOS atau Chrome di Android), suara mungkin diblokir secara otomatis karena pengaturan pemutaran otomatis (autoplay restriction). Coba ketuk tombol speaker berulang kali untuk memicu izin audio peramban Anda.</li>
            <li>Aplikasi kami menggunakan pustaka Web Speech API bawaan peramban Anda. Pastikan sistem operasi perangkat Anda terinstal modul teks-ke-suara (TTS) bahasa Jepang yang aktif.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "faq-11",
      category: "teknis",
      categoryLabel: "Masalah Teknis",
      question: "Mengapa streak saya tereset padahal saya merasa sudah belajar hari ini?",
      answer: (
        <div>
          <p>
            Teresetnya streak biasanya disebabkan oleh ketidaksesuaian zona waktu perangkat atau kegagalan sinkronisasi data akibat koneksi internet yang terputus saat Anda menyelesaikan kuis.
          </p>
          <p>
            Pastikan jam dan tanggal pada perangkat Anda diatur secara otomatis ke jaringan internet Anda. Selain itu, pastikan status bar menunjukkan profil Anda telah tersinkronisasi sebelum Anda menutup aplikasi.
          </p>
        </div>
      ),
    },
    {
      id: "faq-12",
      category: "teknis",
      categoryLabel: "Masalah Teknis",
      question: "Saya menemukan bug atau kesalahan materi belajar, bagaimana cara melaporkannya?",
      answer: (
        <div>
          <p>
            Kami sangat berkomitmen menjaga akurasi materi pembelajaran bahasa Jepang di aplikasi ini. Jika Anda menemukan terjemahan yang keliru, penulisan romaji yang kurang tepat, atau bug pada visual kuis:
          </p>
          <p>
            Silakan kirimkan laporan Anda secara detail melalui formulir <strong>Hubungi Dukungan</strong> yang berada di bagian bawah halaman ini. Cantumkan nama materi atau level JLPT, screenshot jika memungkinkan, dan deskripsi singkat masalahnya. Tim kami akan segera meninjau dan melakukan pembaruan materi.
          </p>
        </div>
      ),
    },
  ], []);

  // Filter FAQs based on query & category
  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory ? faq.category === selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [faqs, searchQuery, selectedCategory]);

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // toggle off
    } else {
      setSelectedCategory(category);
    }
    setOpenFaqId(null); // close any open accordion on filter change
  };

  const handleFaqToggle = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form fields
      setFormName("");
      setFormEmail("");
      setFormCategory("umum");
      setFormMessage("");
    }, 1500);
  };

  return (
    <Container>
      <ContentWrapper>
        <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Bantuan" />

        {/* HERO SEARCH SECTION */}
        <HeroSection>
          <HeroTitle>
            Ada yang bisa <span>kami bantu?</span>
          </HeroTitle>
          <HeroSubtitle>何かお手伝いできることはありますか？</HeroSubtitle>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Cari pertanyaan Anda di sini... (misal: 'Streak', 'Audio', 'JLPT')"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenFaqId(null); // close opened accordion on typing
              }}
            />
            <SearchIconWrapper>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </SearchIconWrapper>
            {searchQuery && (
              <ClearButton onClick={() => setSearchQuery("")}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </ClearButton>
            )}
          </SearchContainer>
        </HeroSection>

        {/* CATEGORY GRID CARDS */}
        <GridTitle>Pilih Kategori Bantuan</GridTitle>
        <CategoryGrid>
          <CategoryCard
            onClick={() => handleCategorySelect("akun")}
            $active={selectedCategory === "akun"}
            $accentColor="var(--primary)"
          >
            <div className="icon-container">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3>Akun & Profil</h3>
            <p>Pengaturan akun, sandi, dan progres cloud.</p>
          </CategoryCard>

          <CategoryCard
            onClick={() => handleCategorySelect("belajar")}
            $active={selectedCategory === "belajar"}
            $accentColor="var(--secondary)"
          >
            <div className="icon-container">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <h3>Metode Belajar</h3>
            <p>Spaced Repetition (SRS), Streak, dan level EXP.</p>
          </CategoryCard>

          <CategoryCard
            onClick={() => handleCategorySelect("jlpt")}
            $active={selectedCategory === "jlpt"}
            $accentColor="var(--zen-gold, #b8860b)"
          >
            <div className="icon-container">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h3>Materi & JLPT</h3>
            <p>Practice sheets, audio native, latihan Kanji.</p>
          </CategoryCard>

          <CategoryCard
            onClick={() => handleCategorySelect("teknis")}
            $active={selectedCategory === "teknis"}
            $accentColor="var(--accent)"
          >
            <div className="icon-container">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
            </div>
            <h3>Masalah Teknis</h3>
            <p>Masalah suara audio, sinkronisasi, dan bug.</p>
          </CategoryCard>
        </CategoryGrid>

        {/* ACCORDION FAQ SECTION */}
        <SectionHeader>
          <GridTitle style={{ marginBottom: 0 }}>
            {selectedCategory
              ? `Pertanyaan Kategori: ${
                  selectedCategory === "akun"
                    ? "Akun & Keamanan"
                    : selectedCategory === "belajar"
                    ? "Metode Belajar"
                    : selectedCategory === "jlpt"
                    ? "Materi & JLPT"
                    : "Masalah Teknis"
                }`
              : "Pertanyaan yang Sering Diajukan (FAQ)"}
          </GridTitle>

          {(selectedCategory || searchQuery) && (
            <ResetFilterButton
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
                setOpenFaqId(null);
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Tampilkan Semua
            </ResetFilterButton>
          )}
        </SectionHeader>

        <AccordionContainer>
          <AnimatePresence initial={false}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <AccordionItem
                    key={faq.id}
                    layout="position"
                    transition={{ duration: 0.2 }}
                  >
                    <AccordionHeader
                      onClick={() => handleFaqToggle(faq.id)}
                      $isOpen={isOpen}
                    >
                      <span>
                        <span className="category-tag">{faq.categoryLabel}</span>
                        {faq.question}
                      </span>
                      <svg
                        className="arrow-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </AccordionHeader>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <AccordionContent
                          key={`content-${faq.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <AccordionBody>
                            {faq.answer}
                          </AccordionBody>
                        </AccordionContent>
                      )}
                    </AnimatePresence>
                  </AccordionItem>
                );
              })
            ) : (
              <EmptyState>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <h3>Tidak ada pertanyaan ditemukan</h3>
                <p>Coba gunakan kata kunci lain atau pilih kategori bantuan di atas.</p>
              </EmptyState>
            )}
          </AnimatePresence>
        </AccordionContainer>

        {/* CONTACT & FEEDBACK FORM */}
        <ContactSection id="hubungi-kami">
          <ContactInfo>
            <h2>
              Masih butuh <span>bantuan?</span>
            </h2>
            <p>
              Jika Anda tidak menemukan jawaban atas pertanyaan Anda, silakan hubungi tim dukungan kami dengan mengirimkan tiket bantuan. Kami akan menanggapi dalam waktu 1-2 hari kerja.
            </p>
            <div className="badge-list">
              <div className="badge-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Dukungan Bahasa Indonesia & English
              </div>
              <div className="badge-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Waktu Respons Cepat & Ramah
              </div>
              <div className="badge-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                100% Gratis Tanpa Biaya Tambahan
              </div>
            </div>
          </ContactInfo>

          <div>
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <ContactForm onSubmit={handleSubmit} key="contact-form">
                  <FormGroup>
                    <label htmlFor="form-name">Nama Lengkap</label>
                    <FormInput
                      id="form-name"
                      type="text"
                      placeholder="Masukkan nama Anda"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="form-email">Alamat Email</label>
                    <FormInput
                      id="form-email"
                      type="email"
                      placeholder="nama@email.com"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="form-cat">Kategori Laporan</label>
                    <FormSelect
                      id="form-cat"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                    >
                      <option value="umum">Pertanyaan Umum</option>
                      <option value="akun">Masalah Akun & Login</option>
                      <option value="materi">Kesalahan / Koreksi Materi</option>
                      <option value="bug">Pelaporan Bug Teknis</option>
                      <option value="saran">Saran & Masukan</option>
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="form-msg">Pesan / Detail Masalah</label>
                    <FormTextarea
                      id="form-msg"
                      placeholder="Tuliskan detail pertanyaan atau masalah yang Anda alami secara jelas..."
                      required
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                    />
                  </FormGroup>

                  <FormButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          style={{
                            animation: "spin 1s linear infinite",
                            marginRight: "0.25rem",
                          }}
                        >
                          <path d="M21 12a9 9 0 0 1-9 9m-9-9a9 9 0 0 1 9-9" />
                        </svg>
                        Mengirim Laporan...
                      </>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        Kirim Tiket Bantuan
                      </>
                    )}
                  </FormButton>
                </ContactForm>
              ) : (
                <SuccessOverlay
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="check-circle">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3>Tiket Bantuan Terkirim!</h3>
                  <p>
                    Terima kasih telah menghubungi kami. Tim dukungan kami akan meninjau pesan Anda dan membalas melalui alamat email yang Anda cantumkan secepatnya.
                  </p>
                  <ResetFilterButton
                    onClick={() => setIsSubmitted(false)}
                    style={{ marginTop: "1rem" }}
                  >
                    Kirim Pesan Lain
                  </ResetFilterButton>
                </SuccessOverlay>
              )}
            </AnimatePresence>
          </div>
        </ContactSection>
      </ContentWrapper>
      
      {/* Global CSS spinner keyframe animation */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  );
}
