import { GrammarPoint } from '../n5/grammar';

export const n3Grammar: GrammarPoint[] = [
  {
    id: "hodo-nai",
    level: "N3",
    title: "～ほど～ない (~hodo ~nai)",
    meaning: "Tidak seberapa... (dibandingkan dengan...)",
    structure: "[Kata Benda] ほど + [Kata Sifat Negatif/Kata Kerja Bentuk-nai]",
    explanation: "Digunakan untuk membandingkan dua hal dan menyatakan bahwa sesuatu tidak sama levelnya/tingkatannya dengan hal yang dibandingkan.",
    examples: [
      {
        japanese: "今年の冬は去年ほど寒くないです。",
        romaji: "Kotoshi no fuyu wa kyonen hodo samukunai desu.",
        english: "Musim dingin tahun ini tidak sedingin tahun lalu."
      }
    ]
  },
  {
    id: "kamo-shirenai",
    level: "N3",
    title: "～かもしれない (~kamo shirenai)",
    meaning: "Mungkin / Bisa jadi...",
    structure: "[Kata Kerja Bentuk Biasa / Kata Sifat / Kata Benda] + かもしれない",
    explanation: "Mengekspresikan tebakan atau kemungkinan (probabilitas sekitar 50%) bahwa sesuatu mungkin terjadi atau benar.",
    examples: [
      {
        japanese: "明日は雨が降るかもしれない。",
        romaji: "Ashita wa ame ga furu kamo shirenai.",
        english: "Besok mungkin akan turun hujan."
      },
      {
        japanese: "彼は本当のことを知っているかもしれない。",
        romaji: "Kare wa hontou no koto o shitte iru kamo shirenai.",
        english: "Bisa jadi dia mengetahui kebenarannya."
      }
    ]
  },
  {
    id: "tame-ni",
    level: "N3",
    title: "～ために (~tame ni)",
    meaning: "Untuk / Demi...",
    structure: "[Kata Kerja Kamus / Kata Benda + の] + ために",
    explanation: "Digunakan untuk menyatakan tujuan, niat, atau sasaran dari suatu tindakan.",
    examples: [
      {
        japanese: "家族のために、毎日一生懸命働いています。",
        romaji: "Kazoku no tame ni, mainichi isshoukenmei hataraite imasu.",
        english: "Demi keluarga, saya bekerja keras setiap hari."
      },
      {
        japanese: "日本語を話せるようになるために、勉強しています。",
        romaji: "Nihongo o hanaseru you ni naru tame ni, benkyou shite imasu.",
        english: "Saya sedang belajar agar bisa berbicara bahasa Jepang."
      }
    ]
  },
  {
    id: "nagara-mo",
    level: "N3",
    title: "～ながらも (~nagara mo)",
    meaning: "Meskipun / Walaupun...",
    structure: "[Kata Kerja Stem / Kata Sifat / Noun] + ながら(も)",
    explanation: "Sama seperti 'ga' atau 'keredomo', memiliki arti kontradiktif (kendati x, tetapi y). Umumnya digunakan dalam konteks tertulis atau formal.",
    examples: [
      {
        japanese: "安いながらも、このカメラはよく撮れる。",
        romaji: "Yasui nagara mo, kono kamera wa yoku toreru.",
        english: "Walaupun murah, kamera ini bisa mengambil foto dengan baik."
      }
    ]
  }
];
