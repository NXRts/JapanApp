export interface Example {
  japanese: string;
  romaji: string;
  english: string; // Indonesian translation
}

export interface GrammarPoint {
  id: string;
  level: string;
  title: string;
  meaning: string;
  structure: string;
  explanation: string;
  examples: Example[];
}

export const n5Grammar: GrammarPoint[] = [
  {
    id: "desu",
    level: "N5",
    title: "〜です (desu)",
    meaning: "Adalah / Merupakan (To be)",
    structure: "Kata Benda / Kata Sifat + です",
    explanation: "Digunakan pada akhir kalimat untuk menunjukkan kesopanan (bentuk formal) sekaligus menyatakan identitas, keadaan, atau fakta dari subjek.",
    examples: [
      {
        japanese: "私は学生です。",
        romaji: "Watashi wa gakusei desu.",
        english: "Saya adalah seorang murid."
      },
      {
        japanese: "今日はいい天気です。",
        romaji: "Kyou wa ii tenki desu.",
        english: "Hari ini cuacanya bagus."
      }
    ]
  },
  {
    id: "wa-particle",
    level: "N5",
    title: "Partikel は (wa)",
    meaning: "Adalah / Adapun (Penanda Topik)",
    structure: "Topik + は + Predikat",
    explanation: "Partikel は (ditulis 'ha' tapi dibaca 'wa') digunakan untuk menandai topik dari suatu kalimat. Topik adalah apa yang sedang dibicarakan dalam kalimat tersebut.",
    examples: [
      {
        japanese: "これはペンです。",
        romaji: "Kore wa pen desu.",
        english: "Ini adalah pulpen."
      },
      {
        japanese: "山田さんは先生です。",
        romaji: "Yamada-san wa sensei desu.",
        english: "Bapak Yamada adalah seorang guru."
      }
    ]
  },
  {
    id: "masu",
    level: "N5",
    title: "〜ます (masu)",
    meaning: "Melakukan (Bentuk Sopan Kata Kerja)",
    structure: "Kata Kerja (Bentuk Masu) + ます",
    explanation: "Akhiran untuk kata kerja bentuk formal/sopan. Digunakan untuk menyatakan tindakan positif yang terjadi saat ini, kebiasaan, atau di masa depan.",
    examples: [
      {
        japanese: "毎日りんごを食べます。",
        romaji: "Mainichi ringo o tabemasu.",
        english: "Saya makan apel setiap hari."
      },
      {
        japanese: "明日学校へ行きます。",
        romaji: "Ashita gakkou e ikimasu.",
        english: "Besok saya pergi ke sekolah."
      }
    ]
  },
  {
    id: "masen",
    level: "N5",
    title: "〜ません (masen)",
    meaning: "Tidak melakukan (Bentuk Negatif Sopan)",
    structure: "Kata Kerja (Bentuk Masu) + ません",
    explanation: "Bentuk negatif dari 〜ます. Digunakan untuk menyatakan bahwa suatu tindakan tidak dilakukan (saat ini/masa depan) secara sopan.",
    examples: [
      {
        japanese: "私は肉を食べません。",
        romaji: "Watashi wa niku o tabemasen.",
        english: "Saya tidak makan daging."
      },
      {
        japanese: "今日はテレビを見ません。",
        romaji: "Kyou wa terebi o mimasen.",
        english: "Hari ini saya tidak menonton TV."
      }
    ]
  },
  {
    id: "ni-particle-time",
    level: "N5",
    title: "Partikel に (Waktu)",
    meaning: "Pada (Waktu spesifik)",
    structure: "Waktu Spesifik + に + Kata Kerja",
    explanation: "Partikel に digunakan untuk menunjukkan titik waktu spesifik kapan suatu tindakan terjadi (seperti jam, tanggal, hari, bulan). Tidak digunakan untuk kata penunjuk waktu relatif seperti 'hari ini' atau 'besok'.",
    examples: [
      {
        japanese: "六時に起きます。",
        romaji: "Rokuji ni okimasu.",
        english: "Saya bangun pada jam 6."
      },
      {
        japanese: "日曜日に日本へ行きます。",
        romaji: "Nichiyoubi ni Nihon e ikimasu.",
        english: "Saya pergi ke Jepang pada hari Minggu."
      }
    ]
  },
  {
    id: "o-particle",
    level: "N5",
    title: "Partikel を (o)",
    meaning: "Objek Langsung",
    structure: "Objek + を + Kata Kerja Transitif",
    explanation: "Partikel を (ditulis 'wo' tapi dibaca 'o') digunakan untuk menandai objek langsung dari sebuah kata kerja tindakan (objek yang dikenai suatu tindakan).",
    examples: [
      {
        japanese: "水を飲みます。",
        romaji: "Mizu o nomimasu.",
        english: "Saya minum air."
      },
      {
        japanese: "本を読みました。",
        romaji: "Hon o yomimashita.",
        english: "Saya telah membaca buku."
      }
    ]
  },
  {
    id: "de-particle-place",
    level: "N5",
    title: "Partikel で (Tempat)",
    meaning: "Di (Tempat terjadinya aktivitas)",
    structure: "Tempat + で + Kata Kerja Aksi",
    explanation: "Menunjukkan lokasi di mana sebuah aktivitas atau kejadian berlangsung. Berbeda dengan に yang hanya menunjukkan letak keberadaan statis.",
    examples: [
      {
        japanese: "レストランで晩ご飯を食べます。",
        romaji: "Resutoran de bangohan o tabemasu.",
        english: "Saya makan malam di restoran."
      },
      {
        japanese: "図書館で勉強しました。",
        romaji: "Toshokan de benkyou shimashita.",
        english: "Saya belajar di perpustakaan."
      }
    ]
  },
  {
    id: "arimasu-imasu",
    level: "N5",
    title: "あります / います",
    meaning: "Ada / Berada",
    structure: "Benda/Orang + が + あります/います",
    explanation: "あります digunakan untuk menyatakan keberadaan benda mati atau tumbuhan. Sedangkan います digunakan untuk benda hidup yang bisa bergerak sendiri seperti manusia dan hewan.",
    examples: [
      {
        japanese: "あそこに犬がいます。",
        romaji: "Asoko ni inu ga imasu.",
        english: "Di sana ada anjing."
      },
      {
        japanese: "机の上に本があります。",
        romaji: "Tsukue no ue ni hon ga arimasu.",
        english: "Di atas meja ada buku."
      }
    ]
  }
];
