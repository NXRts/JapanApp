import { GrammarPoint } from '../n5/grammar';

export const n2Grammar: GrammarPoint[] = [
  {
    id: "touta",
    level: "N2",
    title: "～を問わず (~o towazu)",
    meaning: "Tanpa memandang... / Tidak peduli...",
    structure: "Noun + を問わず",
    explanation: "Mengindikasikan bahwa sesuatu berlaku merata tanpa terpengaruh oleh karakteristik spesifik dari sesuatu tersebut (misal usia, gender, kewarganegaraan, cuaca).",
    examples: [
      {
        japanese: "このマラソン大会は年齢を問わず、誰でも参加できます。",
        romaji: "Kono marason taikai wa nenrei o towazu, daredemo sanka dekimasu.",
        english: "Lomba maraton ini dapat diikuti oleh siapa saja tanpa memandang batasan usia."
      },
      {
        japanese: "昼夜を問わず、警察はパトロールをしている。",
        romaji: "Chuuya o towazu, keisatsu wa patorooru o shite iru.",
        english: "Polisi melakukan patroli tanpa melihat siang atau malam."
      }
    ]
  },
  {
    id: "nikakarawazu",
    level: "N2",
    title: "～にもかかわらず (~ni mo kakawarazu)",
    meaning: "Meskipun / Padahal...",
    structure: "[Verb/Adj/Noun] + にもかかわらず / [V-te/Adj-te] + いるにもかかわらず",
    explanation: "Mengekspresikan penyesalan, keluhan, atau kejutan atas dua kenyataan yang seharusnya bertentangan (A terjadi, namun herannya B bukan konsekuensi alaminya).",
    examples: [
      {
        japanese: "雨が降っているにもかかわらず、サッカーの試合は続けられた。",
        romaji: "Ame ga futte iru ni mo kakawarazu, sakkaa no shiai wa tsuzukerareta.",
        english: "Meskipun hujan turun, pertandingan sepak bola tetap dilanjutkan."
      }
    ]
  },
  {
    id: "wake-nai",
    level: "N2",
    title: "～わけがない (~wake ga nai)",
    meaning: "Tidak mungkin... / Mustahil...",
    structure: "[Kata Kerja Biasa / Kata Sifat] + わけがない",
    explanation: "Digunakan untuk menolak suatu kemungkinan secara kuat, berdasarkan alasan objektif atau keyakinan yang kokoh.",
    examples: [
      {
        japanese: "あんなにたくさん食べたのに、まだお腹が空いているわけがない。",
        romaji: "Anna ni takusan tabeta noni, mada onaka ga suite iru wake ga nai.",
        english: "Padahal makan sebanyak itu, tidak mungkin perutnya masih lapar."
      },
      {
        japanese: "彼がそんな嘘をつくわけがない。",
        romaji: "Kare ga sonna uso o tsuku wake ga nai.",
        english: "Mustahil dia berbohong seperti itu."
      }
    ]
  }
];
