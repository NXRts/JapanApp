export interface MateriItem {
  id: string;
  title: string;
  titleKanji?: string;
  description: string;
  category: "curriculum" | "guides" | "printables" | "cheatsheets";
  type: "grammar" | "vocabulary" | "kana" | "reading" | "tips" | "printables" | "cheatsheet";
  level: "N5" | "N4" | "N3" | "N2" | "N1" | "All";
  duration: string;
  modulesCount: number;
  colorRgb: string;
  badgeText: string;
  actionText: string;
  href: string;
  iconType: "book" | "vocab" | "dictionary" | "lightbulb" | "print" | "reading" | "star" | "grid";
  popular?: boolean;
  featured?: boolean;
  cheatSheetPreview?: {
    summaryTitle: string;
    points: { title: string; desc: string; example?: string }[];
  };
}

export const MATERI_CATALOG: MateriItem[] = [
  // ─── 5 ORIGINAL CORE HUBS ──────────────────────────────────────────────────
  {
    id: "grammar-hub",
    title: "Grammar",
    titleKanji: "文法 (Bunpou)",
    description: "Learn sentence structures, particles, and Japanese patterns from N5 to N4 levels with in-depth explanations.",
    category: "curriculum",
    type: "grammar",
    level: "N5",
    duration: "45 min/modul",
    modulesCount: 24,
    colorRgb: "59, 130, 246", // Blue
    badgeText: "Core Hub",
    actionText: "Start Learning",
    href: "/grammar",
    iconType: "book",
    popular: true,
    featured: true,
    cheatSheetPreview: {
      summaryTitle: "Ringkasan Partikel Utama N5",
      points: [
        { title: "Partikel は (Wa)", desc: "Menandai topik utama kalimat.", example: "私は学生です (Saya adalah siswa)." },
        { title: "Partikel を (O)", desc: "Menandai objek penderita dari kata kerja transitif.", example: "本を読みます (Membaca buku)." },
        { title: "Partikel に (Ni)", desc: "Menunjukkan tujuan, waktu spesifik, atau keberadaan tempat.", example: "7時に起きます (Bangun jam 7)." },
        { title: "Partikel で (De)", desc: "Menunjukkan tempat terjadinya aksi atau sarana/alat.", example: "電車で行きます (Pergi dengan kereta)." },
      ],
    },
  },
  {
    id: "vocab-hub",
    title: "Vocabulary",
    titleKanji: "語彙 (Goi)",
    description: "Enrich your vocabulary with thousands of words accompanied by example sentences and pronunciation audio.",
    category: "curriculum",
    type: "vocabulary",
    level: "All",
    duration: "30 min/modul",
    modulesCount: 40,
    colorRgb: "16, 185, 129", // Emerald
    badgeText: "Audio Supported",
    actionText: "Enrich Vocabulary",
    href: "/vocabulary",
    iconType: "vocab",
    popular: true,
    featured: true,
  },
  {
    id: "jlpt-hub",
    title: "JLPT",
    titleKanji: "JLPT対策",
    description: "Quickly access thousands of Japanese vocabulary and grammar instantly through our smart search system.",
    category: "curriculum",
    type: "grammar",
    level: "N3",
    duration: "Simulasi 60m",
    modulesCount: 50,
    colorRgb: "234, 179, 8", // Amber
    badgeText: "Smart Search",
    actionText: "Open JLPT",
    href: "/jlpt",
    iconType: "dictionary",
    popular: true,
    featured: true,
  },
  {
    id: "tips-hub",
    title: "Learning Tips",
    titleKanji: "学習法 (Gakushouhou)",
    description: "Discover professional strategies and psychological tricks to accelerate your Japanese acquisition journey.",
    category: "guides",
    type: "tips",
    level: "All",
    duration: "10 min baca",
    modulesCount: 12,
    colorRgb: "139, 92, 246", // Purple
    badgeText: "Strategies",
    actionText: "View Strategies",
    href: "/tips",
    iconType: "lightbulb",
    popular: true,
    featured: true,
  },
  {
    id: "practice-sheets-hub",
    title: "Practice Sheets",
    titleKanji: "原稿用紙",
    description: "Generate custom Japanese Genkouyoushi grids for Kana and Kanji to print out and practice handwriting offline.",
    category: "printables",
    type: "printables",
    level: "All",
    duration: "Cetak Instan",
    modulesCount: 8,
    colorRgb: "244, 63, 94", // Rose
    badgeText: "Genkouyoushi",
    actionText: "Print Sheets",
    href: "/practice-sheets",
    iconType: "print",
    popular: true,
    featured: true,
  },

  // ─── EXPANDED MODULES ─────────────────────────────────────────────────────
  {
    id: "kana-foundation",
    title: "Kana Foundation",
    titleKanji: "仮名 (Kana)",
    description: "Kuasai 46 huruf Hiragana dan 46 Katakana lengkap dengan audio stroke-by-stroke, variasi Dakuten, Handakuten, dan Yoon.",
    category: "curriculum",
    type: "kana",
    level: "N5",
    duration: "20 min/modul",
    modulesCount: 10,
    colorRgb: "236, 72, 153", // Pink
    badgeText: "Wajib Pemula",
    actionText: "Latihan Kana",
    href: "/kana",
    iconType: "star",
  },
  {
    id: "reading-comprehension",
    title: "Reading & Comprehension",
    titleKanji: "読解 (Dokkai)",
    description: "Latih kemampuan membaca teks pendek hingga cerita interaktif dilengkapi dengan sakelar Furigana dan narasi suara.",
    category: "curriculum",
    type: "reading",
    level: "N4",
    duration: "25 min/modul",
    modulesCount: 15,
    colorRgb: "14, 165, 233", // Sky Blue
    badgeText: "Cerita Interaktif",
    actionText: "Mulai Membaca",
    href: "/learning",
    iconType: "reading",
  },
  {
    id: "cheatsheet-verbs",
    title: "Cheat Sheet: Verb Conjugation",
    titleKanji: "動詞活用表",
    description: "Ringkasan cepat tabel konjugasi kata kerja Grup 1 (Godan), Grup 2 (Ichidan), dan Grup 3 (Irregular) bentuk Masu, Te, Nai, dan Lampau.",
    category: "cheatsheets",
    type: "cheatsheet",
    level: "N5",
    duration: "Referensi Cepat",
    modulesCount: 5,
    colorRgb: "168, 85, 247", // Purple Accent
    badgeText: "Cheat Sheet",
    actionText: "Buka Cheat Sheet",
    href: "/grammar",
    iconType: "grid",
    cheatSheetPreview: {
      summaryTitle: "Aturan Dasar Konjugasi Kata Kerja",
      points: [
        { title: "Bentuk -Te (Grup 1)", desc: "う・つ・る ➔ って | む・ぶ・ぬ ➔ んで | く ➔ いて | ぐ ➔ いで", example: "買う ➔ 買って, 飲む ➔ 飲んで" },
        { title: "Bentuk -Te (Grup 2)", desc: "Buang る lalu tambahkan て.", example: "食べる ➔ 食べて, 見る ➔ 見て" },
        { title: "Bentuk -Te (Grup 3)", desc: "Kata kerja tidak beraturan: する ➔ して, 来る ➔ きて", example: "勉強する ➔ 勉強して" },
      ],
    },
  },
  {
    id: "cheatsheet-particles",
    title: "Cheat Sheet: Particle Guide",
    titleKanji: "助詞まとめ",
    description: "Panduan ringkas pemakaian partikel (は, が, を, に, で, へ, と, から, まで, より, だけ) beserta contoh jebakan kuis.",
    category: "cheatsheets",
    type: "cheatsheet",
    level: "N5",
    duration: "Referensi Cepat",
    modulesCount: 11,
    colorRgb: "20, 184, 166", // Teal
    badgeText: "Cheat Sheet",
    actionText: "Buka Cheat Sheet",
    href: "/grammar",
    iconType: "grid",
    cheatSheetPreview: {
      summaryTitle: "Partikel Paling Sering Membingungkan",
      points: [
        { title: "に vs で (Lokasi)", desc: "に = Lokasi keberadaan (ある/いる). で = Lokasi tempat beraktivitas.", example: "部屋にいる (Ada di kamar) vs 部屋で勉強する (Belajar di kamar)" },
        { title: "へ vs に (Arah)", desc: "へ menekankan arah pergerakan. に menekankan titik tujuan akhir.", example: "日本へ行く (Pergi menuju Jepang)" },
      ],
    },
  },
];
