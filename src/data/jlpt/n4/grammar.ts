import { GrammarPoint } from '../n5/grammar';

export const n4Grammar: GrammarPoint[] = [
  {
    id: "te-iru",
    level: "N4",
    title: "〜ている (te iru)",
    meaning: "Sedang melakukan / Keadaan berlanjut",
    structure: "Kata Kerja (Bentuk Te) + いる",
    explanation: "Memiliki dua arti utama: 1) Menyatakan suatu aksi yang sedang berlangsung saat ini (present continuous). 2) Menyatakan suatu keadaan yang merupakan hasil dari tindakan di masa lalu dan masih berlanjut hingga sekarang.",
    examples: [
      {
        japanese: "今、本を読んでいます。",
        romaji: "Ima, hon o yonde imasu.",
        english: "Sekarang, saya sedang membaca buku."
      },
      {
        japanese: "結婚しています。",
        romaji: "Kekkon shite imasu.",
        english: "Saya (dalam keadaan) sudah menikah."
      }
    ]
  },
  {
    id: "ta-koto-ga-aru",
    level: "N4",
    title: "〜たことがある",
    meaning: "Pernah (Pengalaman)",
    structure: "Kata Kerja (Bentuk Ta) + ことがある",
    explanation: "Digunakan untuk membicarakan pengalaman di masa lalu. Artinya 'pernah melakukan sesuatu'. Tidak digunakan untuk hal yang rutin dilakukan (seperti 'saya pernah makan pagi hari ini').",
    examples: [
      {
        japanese: "日本へ行ったことがあります。",
        romaji: "Nihon e itta koto ga arimasu.",
        english: "Saya pernah pergi ke Jepang."
      },
      {
        japanese: "お寿司を食べたことがありません。",
        romaji: "Osushi o tabeta koto ga arimasen.",
        english: "Saya tidak pernah makan sushi."
      }
    ]
  },
  {
    id: "tsumori",
    level: "N4",
    title: "〜つもり (tsumori)",
    meaning: "Bermaksud / Berencana untuk",
    structure: "Kata Kerja (Kamus / Nai) + つもりです",
    explanation: "Digunakan untuk menyatakan niat atau rencana kuat yang sudah diputuskan sebelumnya. Biasanya tidak digunakan untuk menanyakan niat orang tua/atasan karena dianggap kurang sopan.",
    examples: [
      {
        japanese: "来年、日本へ行くつもりです。",
        romaji: "Rainen, Nihon e iku tsumori desu.",
        english: "Tahun depan, saya bermaksud/berencana pergi ke Jepang."
      },
      {
        japanese: "今日は出かけないつもりです。",
        romaji: "Kyou wa dekakenai tsumori desu.",
        english: "Hari ini saya tidak ada rencana untuk keluar."
      }
    ]
  }
];
