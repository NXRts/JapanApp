export interface GameItem {
  id: string;
  title: string;
  titleKanji?: string;
  description: string;
  category: "reflex" | "puzzle" | "grammar" | "drill" | "quiz";
  difficulty: "Semua" | "Pemula" | "Menengah" | "Tantangan";
  duration: string;
  xpReward: number;
  skillFocus: string;
  colorRgb: string;
  badgeText: string;
  actionText: string;
  href: string;
  iconType:
    | "puzzle"
    | "keyboard"
    | "sentence"
    | "conjugation"
    | "cards"
    | "daily"
    | "quiz";
  popular?: boolean;
  featured?: boolean;
  howToPlayPreview?: {
    summaryTitle: string;
    points: { title: string; desc: string; example?: string }[];
  };
}

export const GAME_CATALOG: GameItem[] = [
  {
    id: "memory-match",
    title: "Memory Match",
    titleKanji: "神経衰弱 (Shinkei Suijaku)",
    description:
      "Teka-teki visual mencocokkan karakter Hiragana dan Katakana yang memiliki pelafalan serupa untuk melatih ingatan aktif dan membersihkan papan permainan.",
    category: "puzzle",
    difficulty: "Pemula",
    duration: "2-3 Menit",
    xpReward: 25,
    skillFocus: "Memori Visual & Kana",
    colorRgb: "245, 158, 11", // Amber
    badgeText: "PUZZLE",
    actionText: "Mainkan Match",
    href: "/game/memory-match",
    iconType: "puzzle",
    popular: true,
    featured: true,
    howToPlayPreview: {
      summaryTitle: "Panduan Bermain Memory Match",
      points: [
        {
          title: "Buka Dua Kartu Berturut-turut",
          desc: "Klik satu kartu untuk membukanya, lalu cari kartu lain yang memiliki bunyi atau karakter yang sepadan.",
        },
        {
          title: "Cocokkan Hiragana & Katakana",
          desc: "Pasangkan karakter Hiragana dengan versi Katakana-nya untuk melenyapkan kartu dari papan permainan.",
          example: "Kartu 'あ' cocok dengan kartu 'ア'",
        },
        {
          title: "Raih Kombo & Waktu Tercepat",
          desc: "Membuka pasangan kartu tanpa salah berturut-turut memberikan multiplier kombo dan bonus EXP tertinggi.",
        },
      ],
    },
  },
  {
    id: "speed-typing",
    title: "Kana Speed Typing",
    titleKanji: "タイピング (Taipingu)",
    description:
      "Uji kecepatan refleks dan kelincahan jemari! Ketikkan Romaji yang tepat untuk setiap karakter Kana yang melayang sebelum waktu putaran habis.",
    category: "reflex",
    difficulty: "Pemula",
    duration: "1-2 Menit",
    xpReward: 30,
    skillFocus: "Kecepatan Refleks & Romaji",
    colorRgb: "59, 130, 246", // Electric Blue
    badgeText: "REFLEX",
    actionText: "Uji Kecepatan",
    href: "/game/speed-typing",
    iconType: "keyboard",
    popular: true,
    featured: true,
    howToPlayPreview: {
      summaryTitle: "Panduan Bermain Speed Typing",
      points: [
        {
          title: "Perhatikan Karakter yang Muncul",
          desc: "Karakter Hiragana atau Katakana akan muncul di layar permainan secara beruntun.",
        },
        {
          title: "Ketikkan Romaji dengan Cepat",
          desc: "Ketik huruf latin (Romaji) yang sesuai langsung pada keyboard Anda tanpa perlu menekan Enter.",
          example: "Muncul 'か' -> ketik 'ka', muncul 'つ' -> ketik 'tsu'",
        },
        {
          title: "Jaga Akurasi Streak",
          desc: "Hindari salah ketik agar multiplier skor kombo tidak ter-reset, dan kumpulkan skor setinggi mungkin.",
        },
      ],
    },
  },
  {
    id: "sentence-builder",
    title: "Sentence Builder",
    titleKanji: "文作成 (Bun Sakusei)",
    description:
      "Rangkai kalimat bahasa Jepang yang alami dengan menyusun potongan kata, frasa, dan partikel (は, を, に, で) ke dalam tata urutan gramatikal yang tepat.",
    category: "grammar",
    difficulty: "Menengah",
    duration: "3-4 Menit",
    xpReward: 35,
    skillFocus: "Struktur Kalimat & Partikel",
    colorRgb: "139, 92, 246", // Violet
    badgeText: "GRAMMAR",
    actionText: "Susun Kalimat",
    href: "/game/sentence-builder",
    iconType: "sentence",
    popular: true,
    featured: true,
    howToPlayPreview: {
      summaryTitle: "Panduan Bermain Sentence Builder",
      points: [
        {
          title: "Cermati Arti Kalimat Target",
          desc: "Baca arti bahasa Indonesia yang diinginkan pada petunjuk di bagian atas layar.",
        },
        {
          title: "Tarik atau Klik Potongan Blok Kata",
          desc: "Urutkan subjek, partikel (は, を, に, で), objek, dan kata kerja predikat pada slot yang tersedia.",
          example: "[わたし は] + [ほん を] + [よみます]",
        },
        {
          title: "Evaluasi Struktur Seketika",
          desc: "Tekan tombol periksa untuk melihat apakah kalimat sudah tepat secara tata bahasa Jepang alami.",
        },
      ],
    },
  },
  {
    id: "conjugation-drills",
    title: "Conjugation Drills",
    titleKanji: "活用ドリル (Katsuyou Doriru)",
    description:
      "Latihan kilat menguasai perubahan bentuk kata kerja & kata sifat Jepang (Bentuk Masu, Te, Ta, Nai) secara cepat dan tepat sebelum waktu habis.",
    category: "drill",
    difficulty: "Menengah",
    duration: "2-3 Menit",
    xpReward: 30,
    skillFocus: "Kelenturan Bentuk Kata Kerja",
    colorRgb: "16, 185, 129", // Emerald
    badgeText: "DRILL",
    actionText: "Mulai Drill",
    href: "/game/conjugation",
    iconType: "conjugation",
    popular: true,
    howToPlayPreview: {
      summaryTitle: "Panduan Bermain Conjugation Drills",
      points: [
        {
          title: "Kenali Golongan Kata Kerja",
          desc: "Perhatikan apakah kata kerja termasuk Golongan 1 (Godan), Golongan 2 (Ichidan), atau Golongan 3 (Kuru/Suru).",
        },
        {
          title: "Pilih Perubahan Bentuk yang Diminta",
          desc: "Ubah bentuk kamus (Jisho-kei) ke bentuk yang diminta soal sebelum waktu berjalan habis.",
          example: "Taberu (Bentuk Te) -> Tabete, Iku (Bentuk Ta) -> Itta",
        },
        {
          title: "Asah Refleks Percakapan",
          desc: "Semakin sering berlatih, Anda tidak perlu lagi mengingat-ingat rumus saat berbicara secara langsung!",
        },
      ],
    },
  },
  {
    id: "match-pairs",
    title: "Match Pairs Kana",
    titleKanji: "ペア合わせ (Pea Awase)",
    description:
      "Hubungkan pasangan karakter Kana dengan Romaji atau padanan artinya secara serentak untuk mengasah ketajaman memori jangka pendek.",
    category: "puzzle",
    difficulty: "Pemula",
    duration: "1-2 Menit",
    xpReward: 20,
    skillFocus: "Pengenalan Cepat Karakter",
    colorRgb: "244, 63, 94", // Rose
    badgeText: "POPULAR",
    actionText: "Mainkan Pasangan",
    href: "/match-pairs",
    iconType: "cards",
    howToPlayPreview: {
      summaryTitle: "Panduan Bermain Match Pairs",
      points: [
        {
          title: "Pilih Kartu Huruf",
          desc: "Klik satu kartu karakter Jepang pada baris atau kolom yang tersedia.",
        },
        {
          title: "Klik Kartu Pasangannya",
          desc: "Segera klik kartu arti atau Romaji yang bersesuaian untuk menghilangkannya dari layar.",
          example: "Hubungkan kartu 'さ' dengan kartu 'sa'",
        },
        {
          title: "Kosongkan Seluruh Papan",
          desc: "Bersihkan seluruh pasangan kartu secepat mungkin untuk mencetak rekor bintang tertinggi.",
        },
      ],
    },
  },
  {
    id: "daily-quiz",
    title: "Daily Quiz Rush",
    titleKanji: "毎日クイズ (Mainichi Kuizu)",
    description:
      "Sesi tantangan kuis harian 5 menit dengan campuran materi kosakata, kanji, dan grammar untuk mengamankan streak belajar harian dan raih XP ekstra.",
    category: "quiz",
    difficulty: "Semua",
    duration: "3-5 Menit",
    xpReward: 50,
    skillFocus: "Streak Harian & Evaluasi",
    colorRgb: "249, 115, 22", // Warm Orange
    badgeText: "DAILY",
    actionText: "Ikuti Kuis",
    href: "/daily-quiz",
    iconType: "daily",
    popular: true,
    howToPlayPreview: {
      summaryTitle: "Panduan Daily Quiz Rush",
      points: [
        {
          title: "Tersedia 1 Sesi Setiap Hari",
          desc: "Paket soal kuis berganti secara otomatis setiap pukul 00.00 tengah malam.",
        },
        {
          title: "Pertahankan Streak Belajar",
          desc: "Menyelesaikan kuis harian otomatis mencatat hari aktif belajar dan melindungi streak Anda.",
        },
        {
          title: "Kumpulkan Bonus XP Harian",
          desc: "Skor sempurna memberikan bonus XP berlipat yang membantu Anda naik kasta di papan peringkat Liga.",
        },
      ],
    },
  },
  {
    id: "reverse-quiz",
    title: "Reverse Quiz Challenge",
    titleKanji: "逆引きクイズ (Gyakubiki Kuizu)",
    description:
      "Uji pemahaman mandiri tanpa contekan! Diberikan bunyi suara atau arti Romaji, pilih huruf Jepang aslinya secara terbalik untuk membangun reflek berpikir langsung.",
    category: "quiz",
    difficulty: "Tantangan",
    duration: "2-3 Menit",
    xpReward: 25,
    skillFocus: "Daya Ingat Mandiri & Audio",
    colorRgb: "99, 102, 241", // Indigo
    badgeText: "CHALLENGE",
    actionText: "Mulai Tantangan",
    href: "/reverse-quiz",
    iconType: "quiz",
    howToPlayPreview: {
      summaryTitle: "Panduan Reverse Quiz Challenge",
      points: [
        {
          title: "Perhatikan Bunyi / Arti",
          desc: "Soal menampilkan arti atau memainkan pelafalan audio kata bahasa Jepang.",
        },
        {
          title: "Pilih Bentuk Huruf Aslinya",
          desc: "Tentukan huruf Kana atau Kanji yang merupakan representasi tertulis yang benar dari pilihan yang ada.",
        },
        {
          title: "Latih Otak Berpikir Spontan",
          desc: "Membiasakan otak memanggil kembali bentuk karakter tanpa harus bergantung pada teks bantuan latin.",
        },
      ],
    },
  },
];
