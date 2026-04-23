import { GrammarPoint } from '../n5/grammar';

export const n3Grammar: GrammarPoint[] = [
  {
    id: "nagara",
    level: "N3",
    title: "〜ながら (nagara)",
    meaning: "Sambil",
    structure: "Kata Kerja (Bentuk Masu dicoret) + ながら",
    explanation: "Digunakan untuk menunjukkan bahwa subjek melakukan dua aktivitas secara bersamaan. Tindakan utama adalah kata kerja yang datang setelah ながら.",
    examples: [
      {
        japanese: "音楽を聴きながら勉強します。",
        romaji: "Ongaku o kikinagara benkyou shimasu.",
        english: "Saya belajar sambil mendengarkan musik."
      }
    ]
  },
  {
    id: "ni-chigainai",
    level: "N3",
    title: "〜に違いない",
    meaning: "Pasti / Tidak salah lagi",
    structure: "Bentuk Biasa (Kamus/Ta/Nai) + に違いない",
    explanation: "Digunakan untuk menyatakan keyakinan kuat atau kesimpulan dari si pembicara berdasarkan bukti atau firasat.",
    examples: [
      {
        japanese: "彼は犯人に違いない。",
        romaji: "Kare wa hannin ni chigainai.",
        english: "Dia pasti pelakunya."
      }
    ]
  }
];
