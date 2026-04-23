import { GrammarPoint } from '../n5/grammar';

export const n1Grammar: GrammarPoint[] = [
  {
    id: "kaneru",
    level: "N1",
    title: "〜かねる (kaneru)",
    meaning: "Sulit untuk / Tidak bisa (karena alasan psikologis)",
    structure: "Kata Kerja (Bentuk Masu dicoret) + かねる",
    explanation: "Menyatakan ketidakmampuan untuk melakukan sesuatu bukan karena kurangnya keterampilan fisik, melainkan karena alasan psikologis, norma sosial, atau etika (keberatan, sungkan, sulit diterima hati). Sering digunakan dalam bisnis formal.",
    examples: [
      {
        japanese: "そのご提案には賛同しかねます。",
        romaji: "Sono goteian ni wa sandou shikanemasu.",
        english: "Saya sulit (tidak bisa) menyetujui usulan tersebut."
      },
      {
        japanese: "私個人の立場からは、お答えしかねます。",
        romaji: "Watashi kojin no tachiba kara wa, okotaeshikanemasu.",
        english: "Dari sudut pandang saya pribadi, hal itu sulit untuk saya jawab."
      }
    ]
  },
  {
    id: "zaru-o-enai",
    level: "N1",
    title: "〜ざるを得ない (zaru o enai)",
    meaning: "Terpaksa harus / Tidak ada pilihan lain selain",
    structure: "Kata Kerja (Nai dicoret) + ざるを得ない (*Suru menjadi sezaru)",
    explanation: "Situasi ekstrem di mana meskipun seseorang mungkin tidak ingin melakukan sesuatu, keadaan memaksanya demikian sehingga tidak ada pilihan lain selain melakukannya.",
    examples: [
      {
        japanese: "これだけ証拠があれば、彼が犯人だと認めざるを得ない。",
        romaji: "Koredake shouko ga areba, kare ga hannin da to mitomezaru o enai.",
        english: "Dengan bukti sebanyak ini, kita terpaksa harus mengakui bahwa dia adalah pelakunya."
      },
      {
        japanese: "台風のため、旅行は中止せざるを得なかった。",
        romaji: "Taifuu no tame, ryokou wa chuushi sezaru o enakatta.",
        english: "Karena topan, mau tidak mau perjalanan tersebut terpaksa dibatalkan."
      }
    ]
  },
  {
    id: "koto-naku",
    level: "N1",
    title: "〜ことなしに (koto nashi ni)",
    meaning: "Tanpa melakukan...",
    structure: "Kata Kerja Kamus + ことなしに",
    explanation: "Sangat formal. Menekankan bahwa jika tindakan utama dilakukan tanpa adanya prasyarat atau aksi sekunder tertentu (A), maka hasilnya (B) akan sulit dicapai atau mustahil.",
    examples: [
      {
        japanese: "過去を反省することなしに、明るい未来はない。",
        romaji: "Kako o hansei suru koto nashi ni, akarui mirai wa nai.",
        english: "Tanpa melakukan introspeksi terhadap masa lalu, masa depan yang cerah tidak akan ada."
      }
    ]
  },
  {
    id: "yogi-naku-sareru",
    level: "N1",
    title: "〜余儀なくされる (yogi naku sareru)",
    meaning: "Dipaksa untuk / Terpaksa karena keadaan luar",
    structure: "Kata Benda + を余儀なくされる",
    explanation: "Digunakan pada berita atau tulisan sangat formal. Berarti subjek yang tidak memiliki daya untuk menolak didorong ke dalam situasi yang tidak diinginkan karena kondisi tak terduga (bencana alam, krisis, dsb).",
    examples: [
      {
        japanese: "資金不足のため、計画の変更を余儀なくされた。",
        romaji: "Shikin busoku no tame, keikaku no henkou o yoginaku sareta.",
        english: "Karena kurangnya dana, perubahan rencana terpaksa (dengan sangat menyesal) dilakukan."
      }
    ]
  },
  {
    id: "nari-ni",
    level: "N1",
    title: "〜なりに (nari ni)",
    meaning: "Sesuai porsinya / Dengan cara tersendiri",
    structure: "Kata Benda / Kata Sifat / Kata Kerja + なりに",
    explanation: "Walaupun memiliki keterbatasan (baik status, pengalaman, dll), seseorang telah melakukan usaha terbaik sepadan dengan batasan atau posisinya tersebut.",
    examples: [
      {
        japanese: "子供は子供なりに色々と悩んでいるのだ。",
        romaji: "Kodomo wa kodomo nari ni iro-iro to nayande iru no da.",
        english: "Anak-anak, dengan cara mereka sendiri (khas anak-anak), menghadapi berbagai macam kekhawatiran."
      },
      {
        japanese: "私なりに頑張ってみます。",
        romaji: "Watashi nari ni ganbatte mimasu.",
        english: "Saya akan berusaha sebaik-baiknya sesuai kemampuan (terbatas) saya."
      }
    ]
  }
];
