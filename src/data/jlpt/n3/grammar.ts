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
    title: "〜に違いない (ni chigainai)",
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
  },
  {
    id: "koto-ni-natte-iru",
    level: "N3",
    title: "〜ことになっている",
    meaning: "Sudah diatur / Telah diputuskan (Peraturan)",
    structure: "Kata Kerja (Kamus/Nai) + ことになっている",
    explanation: "Menyatakan sesuatu yang telah diputuskan di luar kendali kita, seperti aturan, adat, kebiasaan, atau hukum yang berlaku secara objektif.",
    examples: [
      {
        japanese: "この教室では日本語しか話せないことになっています。",
        romaji: "Kono kyoushitsu de wa Nihongo shika hanasenai koto ni natte imasu.",
        english: "Sesuai aturan, di ruang kelas ini hanya boleh berbicara bahasa Jepang."
      }
    ]
  },
  {
    id: "to-tori-ni",
    level: "N3",
    title: "〜とおりに (toori ni)",
    meaning: "Sesuai dengan / Seperti halnya",
    structure: "Kata Kerja (Kamus/Ta) / Benda+の + とおりに",
    explanation: "Digunakan untuk menyatakan bahwa seseorang melakukan tindakan sesuai persis dengan pola, instruksi, atau harapan yang sudah ada.",
    examples: [
      {
        japanese: "私が言ったとおりに書いてください。",
        romaji: "Watashi ga itta toori ni kaite kudasai.",
        english: "Tolong tulis sesuai dengan apa yang saya katakan."
      },
      {
        japanese: "説明書のとおりに組み立てました。",
        romaji: "Setsumeisho no toori ni kumitatemashita.",
        english: "Saya merakitnya sesuai dengan buku panduan."
      }
    ]
  },
  {
    id: "ba-yokatta",
    level: "N3",
    title: "〜ばよかった (ba yokatta)",
    meaning: "Seharusnya... (Penyesalan)",
    structure: "Kata Kerja (Bentuk Ba) + よかった",
    explanation: "Digunakan untuk mengungkapkan penyesalan tentang hal di masa lalu. 'Ah, seharusnya saya melakukan itu' (tapi kenyataannya tidak dilakukan).",
    examples: [
      {
        japanese: "もっと勉強すればよかった。",
        romaji: "Motto benkyou sureba yokatta.",
        english: "Seharusnya saya belajar lebih giat (dulu)."
      },
      {
        japanese: "あんなことを言わなければよかった。",
        romaji: "Anna koto o iwanakereba yokatta.",
        english: "Seharusnya saya tidak mengatakan hal seperti itu."
      }
    ]
  },
  {
    id: "hazu-desu",
    level: "N3",
    title: "〜はずです (hazu desu)",
    meaning: "Pasti / Seharusnya (Ekspektasi logis)",
    structure: "Bentuk Biasa + はずです",
    explanation: "Menyatakan kesimpulan logis pembicara berdasarkan fakta atau jadwal yang diketahui. Menunjukkan keyakinan yang kuat (mirip dengan 'It must be / It should be').",
    examples: [
      {
        japanese: "山田さんはアメリカに住んでいたから、英語が話せるはずです。",
        romaji: "Yamada-san wa Amerika ni sunde ita kara, eigo ga hanaseru hazu desu.",
        english: "Karena Yamada pernah tinggal di Amerika, dia seharusnya bisa berbahasa Inggris."
      }
    ]
  },
  {
    id: "mama",
    level: "N3",
    title: "〜まま (mama)",
    meaning: "Dalam keadaan... / Dibiarkan...",
    structure: "Kata Kerja (Ta/Nai) / Kata Benda + の + まま",
    explanation: "Menyatakan kondisi atau keadaan dibiarkan tidak berubah setelah sesuatu dilakukan. Sering menunjukkan bahwa hal tersebut seharusnya tidak dibiarkan demikian.",
    examples: [
      {
        japanese: "エアコンをつけたまま寝てしまった。",
        romaji: "Eakon o tsuketa mama nete shimatta.",
        english: "Saya ketiduran dalam keadaan AC dibiarkan menyala."
      },
      {
        japanese: "靴のまま家に入らないでください。",
        romaji: "Kutsu no mama ie ni hairanaide kudasai.",
        english: "Tolong jangan masuk ke rumah dalam keadaan (masih memakai) sepatu."
      }
    ]
  },
  {
    id: "te-kara-denai-to",
    level: "N3",
    title: "〜てからでないと (te kara denai to)",
    meaning: "Kecuali jika... / Sebelum (ini dilakukan), maka tidak bisa...",
    structure: "Kata Kerja (Bentuk Te) + からでないと + Bentuk Negatif",
    explanation: "Menyatakan bahwa tindakan pertama harus benar-benar diselesaikan lebih dahulu sebelum hal kedua bisa dilakukan. Jika kondisi pertama tidak terpenuhi, akibat di belakangnya tidak akan bisa terjadi.",
    examples: [
      {
        japanese: "親に相談してからでないと、決められません。",
        romaji: "Oya ni soudan shite kara denai to, kimeraremasen.",
        english: "Kecuali jika saya berdiskusi dengan orang tua terlebih dahulu, saya tidak bisa memutuskannya."
      }
    ]
  },
  {
    id: "gimi",
    level: "N3",
    title: "〜気味 (gimi)",
    meaning: "Merasa sedikit... / Agak... (Kecenderungan negatif)",
    structure: "Kata Benda / Kata Kerja (Masu dicoret) + 気味",
    explanation: "Mengekspresikan bahwa seseorang memiliki gejala atau merasa cenderung pada suatu keadaan fisik/mental, biasanya berkonotasi negatif atau di luar kebiasaan.",
    examples: [
      {
        japanese: "最近、少し疲れ気味です。",
        romaji: "Saikin, sukoshi tsukaregimi desu.",
        english: "Akhir-akhir ini, saya merasa agak kelelahan."
      },
      {
        japanese: "彼は風邪気味で学校を休んだ。",
        romaji: "Kare wa kazegimi de gakkou o yasunda.",
        english: "Dia libur sekolah karena merasa agak flu."
      }
    ]
  },
  {
    id: "kawari-ni",
    level: "N3",
    title: "〜代わりに (kawari ni)",
    meaning: "Sebagai gantinya / Alih-alih",
    structure: "Bentuk Biasa / Benda+の + 代わりに",
    explanation: "Digunakan ketika satu hal digunakan untuk menggantikan atau mewakili sesuatu yang lain, atau sebagai 'kompensasi/timbal balik' atas suatu hal.",
    examples: [
      {
        japanese: "社長の代わりに私が会議に出席します。",
        romaji: "Shachou no kawari ni watashi ga kaigi ni shusseki shimasu.",
        english: "Saya akan menghadiri rapat menggantikan (sebagai wakil dari) direktur."
      },
      {
        japanese: "英語を教えてもらう代わりに、日本語を教えます。",
        romaji: "Eigo o oshiete morau kawari ni, Nihongo o oshiemasu.",
        english: "Sebagai ganti Anda mengajari saya bahasa Inggris, saya akan mengajari Anda bahasa Jepang."
      }
    ]
  }
];
