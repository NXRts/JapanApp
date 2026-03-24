import { GrammarPoint } from '../n5/grammar';

export const n4Grammar: GrammarPoint[] = [
  {
    id: "ndesu",
    level: "N4",
    title: "～んです (~ndesu)",
    meaning: "Menjelaskan alasan atau menekankan sesuatu",
    structure: "[Kata Kerja Bentuk Biasa] + んです",
    explanation: "Digunakan untuk memberikan penjelasan/alasan dari suatu konteks, atau untuk menanyakan penjelasan (kepo). Terdengar lebih natural dalam percakapan sehari-hari.",
    examples: [
      {
        japanese: "どうして遅れたんですか。",
        romaji: "Doushite okureta n desu ka.",
        english: "Kenapa kamu terlambat?"
      },
      {
        japanese: "バスが来なかったんです。",
        romaji: "Basu ga konakatta n desu.",
        english: "Busnya tidak datang."
      }
    ]
  },
  {
    id: "temoii",
    level: "N4",
    title: "～てもいいですか (~temo ii desu ka)",
    meaning: "Bolehkah saya... / Apakah tidak apa-apa jika...",
    structure: "[Kata Kerja Bentuk-te] + もいいですか",
    explanation: "Digunakan untuk meminta izin melakukan sesuatu secara sopan.",
    examples: [
      {
        japanese: "ここで写真を撮ってもいいですか。",
        romaji: "Koko de shashin o tottemo ii desu ka.",
        english: "Bolehkah saya mengambil foto di sini?"
      },
      {
        japanese: "はい、いいですよ。",
        romaji: "Hai, ii desu yo.",
        english: "Ya, boleh."
      }
    ]
  },
  {
    id: "nakerebanaranai",
    level: "N4",
    title: "～なければならない (~nakereba naranai)",
    meaning: "Harus...",
    structure: "[Kata Kerja Bentuk-nai (buang 'i')] + ければならない",
    explanation: "Menyatakan sebuah kewajiban atau keharusan mutlak yang bersumber dari norma sosial atau peraturan.",
    examples: [
      {
        japanese: "明日、学校に行かなければなりません。",
        romaji: "Ashita, gakkou ni ikanakereba narimasen.",
        english: "Besok saya harus pergi ke sekolah."
      }
    ]
  },
  {
    id: "nagara",
    level: "N4",
    title: "～ながら (~nagara)",
    meaning: "Sambil...",
    structure: "[Kata Kerja Bentuk-masu (buang 'masu')] + ながら",
    explanation: "Dipakai ketika ada dua kegiatan yang dilakukan bersamaan. Kegiatan yang disebutkan setelah 'nagara' adalah kegiatan utamanya.",
    examples: [
      {
        japanese: "音楽を聞きながら勉強します。",
        romaji: "Ongaku o kikinagara benkyou shimasu.",
        english: "Saya belajar sambil mendengarkan musik."
      }
    ]
  },
  {
    id: "sugiru",
    level: "N4",
    title: "～すぎる (~sugiru)",
    meaning: "Terlalu...",
    structure: "[Kata Kerja Bentuk-masu/Kata Sifat (buang 'i' atau 'na')] + すぎる",
    explanation: "Menyatakan sesuatu yang berlebihan dan biasanya diiringi oleh nuansa negatif.",
    examples: [
      {
        japanese: "昨日の夜、お酒を飲みすぎました。",
        romaji: "Kinou no yoru, osake o nomisugimashita.",
        english: "Tadi malam saya terlalu banyak minum alkohol."
      },
      {
        japanese: "このカレーは辛すぎます。",
        romaji: "Kono karee wa karasugimasu.",
        english: "Kari ini terlalu pedas."
      }
    ]
  }
];
