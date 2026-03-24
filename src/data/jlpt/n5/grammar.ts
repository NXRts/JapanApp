export interface Example {
  japanese: string;
  romaji: string;
  english: string; // Wait, actually it's now Indonesian, I'll keep the key as english or maybe indonesian
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
    id: "wa-desu",
    level: "N5",
    title: "A は B です (A wa B desu)",
    meaning: "A adalah B",
    structure: "[Kata Benda A] は [Kata Benda B] です",
    explanation: "Partikel は (wa) menandai topik pembicaraan. です (desu) adalah kopula sopan (penutup kalimat) yang menegaskan pernyataan.",
    examples: [
      {
        japanese: "私は学生です。",
        romaji: "Watashi wa gakusei desu.",
        english: "Saya adalah seorang murid."
      },
      {
        japanese: "これは本です。",
        romaji: "Kore wa hon desu.",
        english: "Ini adalah buku."
      }
    ]
  },
  {
    id: "mo-desu",
    level: "N5",
    title: "A も B です (A mo B desu)",
    meaning: "A juga B",
    structure: "[Kata Benda A] も [Kata Benda B] です",
    explanation: "Partikel も (mo) berarti 'juga'. Ia menggantikan peran partikel は (wa) untuk menyatakan kesamaan karakteristik dengan topik sebelumnya.",
    examples: [
      {
        japanese: "田中さんも学生です。",
        romaji: "Tanaka-san mo gakusei desu.",
        english: "Sdr. Tanaka juga seorang murid."
      }
    ]
  },
  {
    id: "no-particle",
    level: "N5",
    title: "A の B (A no B)",
    meaning: "B milik A / B pualam A",
    structure: "[Kata Benda A] の [Kata Benda B]",
    explanation: "Partikel の (no) menyatakan kepemilikan atau hubungan bagian dari keseluruhan. A menjabarkan/menerangkan B.",
    examples: [
      {
        japanese: "私の名前はユスフです。",
        romaji: "Watashi no namae wa Yusuf desu.",
        english: "Nama saya adalah Yusuf."
      },
      {
        japanese: "これは日本語の本です。",
        romaji: "Kore wa nihongo no hon desu.",
        english: "Ini adalah buku bahasa Jepang."
      }
    ]
  },
  {
    id: "ni-arimasu",
    level: "N5",
    title: "～にあります (~ni arimasu)",
    meaning: "Ada di... (Objek benda mati)",
    structure: "[Tempat] に [Kata Benda] があります",
    explanation: "Digunakan untuk menunjukkan keberadaan suatu benda mati atau tumbuhan di suatu lokasi.",
    examples: [
      {
        japanese: "机の上に本があります。",
        romaji: "Tsukue no ue ni hon ga arimasu.",
        english: "Ada buku di atas meja."
      }
    ]
  },
  {
    id: "ni-imasu",
    level: "N5",
    title: "～にいます (~ni imasu)",
    meaning: "Ada di... (Mahluk hidup)",
    structure: "[Tempat] に [Orang/Hewan] がいます",
    explanation: "Digunakan uutuk menunjukkan keberadaan mahluk hidup (orang atau hewan) yang bisa bergerak sendiri.",
    examples: [
      {
        japanese: "部屋に犬がいます。",
        romaji: "Heya ni inu ga imasu.",
        english: "Ada anjing di dalam kamar."
      }
    ]
  }
];
