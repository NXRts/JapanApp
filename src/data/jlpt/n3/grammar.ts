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
  },
  {
    id: "darake",
    level: "N3",
    title: "〜だらけ (darake)",
    meaning: "Penuh dengan (hal negatif)",
    structure: "Kata Benda + だらけ",
    explanation: "Menggambarkan bahwa sesuatu dipenuhi oleh hal-hal yang tidak menyenangkan, kotor, atau tidak diinginkan secara visual (seperti debu, lumpur, kesalahan).",
    examples: [
      {
        japanese: "彼の部屋はゴミだらけだ。",
        romaji: "Kare no heya wa gomi darake da.",
        english: "Kamarnya penuh dengan sampah."
      },
      {
        japanese: "この作文は間違いだらけです。",
        romaji: "Kono sakubun wa machigai darake desu.",
        english: "Karangan ini penuh dengan kesalahan."
      }
    ]
  },
  {
    id: "tokoro-da",
    level: "N3",
    title: "〜ところだ (tokoro da)",
    meaning: "Baru saja / Sedang / Akan",
    structure: "Kata Kerja (Kamus/Te-iru/Ta) + ところだ",
    explanation: "Menunjukkan 'titik waktu' yang sangat spesifik dari suatu aksi. Kamus = akan segera dilakukan. Te-iru = sedang tepat dilakukan sekarang. Ta = baru saja selesai detik ini.",
    examples: [
      {
        japanese: "今からご飯を食べるところです。",
        romaji: "Ima kara gohan o taberu tokoro desu.",
        english: "Saya baru akan mulai makan sekarang."
      },
      {
        japanese: "たった今、バスが出たところです。",
        romaji: "Tatta ima, basu ga deta tokoro desu.",
        english: "Baru saja detik ini, busnya berangkat."
      }
    ]
  },
  {
    id: "wake-ga-nai",
    level: "N3",
    title: "〜わけがない (wake ga nai)",
    meaning: "Tidak mungkin",
    structure: "Bentuk Biasa + わけがない",
    explanation: "Pernyataan keyakinan yang sangat kuat (100%) dari pembicara bahwa sesuatu itu sama sekali tidak mungkin terjadi berdasarkan logika atau kenyataan.",
    examples: [
      {
        japanese: "あんな下手なチームが勝てるわけがない。",
        romaji: "Anna hetana chiimu ga kateru wake ga nai.",
        english: "Tidak mungkin tim payah seperti itu bisa menang."
      },
      {
        japanese: "彼がお金を盗むわけがありません。",
        romaji: "Kare ga okane o nusumu wake ga arimasen.",
        english: "Tidak mungkin dia mencuri uang."
      }
    ]
  },
  {
    id: "sae",
    level: "N3",
    title: "〜さえ (sae)",
    meaning: "Bahkan",
    structure: "Kata Benda + さえ",
    explanation: "Digunakan untuk memberikan contoh kasus ekstrem, yang menyiratkan bahwa 'jika hal ekstrem ini saja (bahkan) terjadi/tidak terjadi, apalagi hal yang biasa'.",
    examples: [
      {
        japanese: "ひらがなさえ書けない。",
        romaji: "Hiragana sae kakenai.",
        english: "Bahkan Hiragana pun saya tidak bisa menulisnya."
      },
      {
        japanese: "専門家でさえわからない問題だ。",
        romaji: "Senmonka de sae wakaranai mondai da.",
        english: "Itu adalah masalah yang bahkan seorang ahli pun tidak mengerti."
      }
    ]
  },
  {
    id: "sae-ba",
    level: "N3",
    title: "〜さえ〜ば (sae...ba)",
    meaning: "Asalkan... (Satu-satunya syarat)",
    structure: "Kata Benda + さえ + Kata Kerja (Ba)",
    explanation: "Menyatakan bahwa jika SATU syarat minimum tersebut terpenuhi, maka semuanya akan beres/baik-baik saja.",
    examples: [
      {
        japanese: "あなたさえいれば、私は幸せです。",
        romaji: "Anata sae ireba, watashi wa shiawase desu.",
        english: "Asalkan ada kamu, aku bahagia."
      },
      {
        japanese: "お金さえあれば、何でもできる。",
        romaji: "Okane sae areba, nandemo dekiru.",
        english: "Asalkan ada uang, apapun bisa dilakukan."
      }
    ]
  },
  {
    id: "ppanashi",
    level: "N3",
    title: "〜っぱなし (ppanashi)",
    meaning: "Dibiarkan (dalam keadaan buruk)",
    structure: "Kata Kerja (Masu dicoret) + っぱなし",
    explanation: "Mirip dengan 〜まま, namun 〜っぱなし biasanya digunakan untuk kondisi negatif di mana seseorang membiarkan sesuatu yang seharusnya diubah/dibereskan.",
    examples: [
      {
        japanese: "水を出しっぱなしにしないでください。",
        romaji: "Mizu o dashippanashi ni shinaide kudasai.",
        english: "Tolong jangan biarkan air mengalir terus (dibiarkan menyala)."
      },
      {
        japanese: "テレビをつけっぱなしで寝てしまった。",
        romaji: "Terebi o tsukeppanashi de nete shimatta.",
        english: "Saya ketiduran dengan TV dibiarkan menyala."
      }
    ]
  },
  {
    id: "tabini",
    level: "N3",
    title: "〜たびに (tabi ni)",
    meaning: "Setiap kali...",
    structure: "Kata Kerja (Kamus) / Benda+の + たびに",
    explanation: "Menekankan bahwa setiap kali hal A terjadi, maka SELALU hal B akan terjadi tanpa terkecuali.",
    examples: [
      {
        japanese: "この写真を見るたびに、昔を思い出す。",
        romaji: "Kono shashin o miru tabi ni, mukashi o omoidasu.",
        english: "Setiap kali melihat foto ini, saya teringat masa lalu."
      },
      {
        japanese: "父は出張のたびに、お土産を買ってきてくれる。",
        romaji: "Chichi wa shucchou no tabi ni, omiyage o katte kite kureru.",
        english: "Ayah selalu membelikan oleh-oleh setiap kali perjalanan dinas."
      }
    ]
  },
  {
    id: "to-totanni",
    level: "N3",
    title: "〜とたんに (to totan ni)",
    meaning: "Begitu (ini) terjadi, langsung...",
    structure: "Kata Kerja (Ta) + とたんに",
    explanation: "Menyatakan bahwa tepat setelah kejadian pertama berlangsung, secara mendadak kejadian kedua terjadi, sering kali tanpa diduga.",
    examples: [
      {
        japanese: "ドアを開けたとたんに、猫が飛び出してきた。",
        romaji: "Doa o aketa totan ni, neko ga tobidashite kita.",
        english: "Begitu pintu dibuka, kucing itu langsung melompat keluar."
      },
      {
        japanese: "先生の顔を見たとたんに、涙が出た。",
        romaji: "Sensei no kao o mita totan ni, namida ga deta.",
        english: "Begitu melihat wajah guru, air mataku langsung keluar."
      }
    ]
  },
  {
    id: "ni-taishite",
    level: "N3",
    title: "〜に対して (ni taishite)",
    meaning: "Terhadap / Berlawanan dengan",
    structure: "Kata Benda + に対して",
    explanation: "Memiliki dua arti: 1) Sikap/tindakan 'terhadap' suatu subjek. 2) Menunjukkan perbedaan kontras 'berlawanan dengan / dibandingkan dengan'.",
    examples: [
      {
        japanese: "お客様に対して、丁寧な言葉を使いなさい。",
        romaji: "Okyakusama ni taishite, teineina kotoba o tsukainasai.",
        english: "Gunakanlah bahasa yang sopan terhadap pelanggan."
      },
      {
        japanese: "兄は活発なのに対して、弟はおとなしい。",
        romaji: "Ani wa kappatsu na no ni taishite, otouto wa otonashii.",
        english: "Berlawanan dengan kakaknya yang aktif, adiknya pendiam."
      }
    ]
  },
  {
    id: "ni-kimatte-iru",
    level: "N3",
    title: "〜に決まっている (ni kimatte iru)",
    meaning: "Sudah pasti / Tentu saja",
    structure: "Bentuk Biasa + に決まっている",
    explanation: "Sangat mirip dengan に違いない, tetapi lebih kasual dan bernuansa subyektif ('Ah, sudah pasti begitu lah!').",
    examples: [
      {
        japanese: "そんなの嘘に決まっている。",
        romaji: "Sonna no uso ni kimatte iru.",
        english: "Sudah pasti itu bohong."
      },
      {
        japanese: "一人で外国へ行くなんて、寂しいに決まっている。",
        romaji: "Hitori de gaikoku e iku nante, samishii ni kimatte iru.",
        english: "Pergi ke luar negeri sendirian, sudah pasti akan merasa kesepian."
      }
    ]
  },
  {
    id: "uchi-ni",
    level: "N3",
    title: "〜うちに (uchi ni)",
    meaning: "Selagi / Mumpung",
    structure: "Kata Kerja (Te-iru/Nai) / Kata Sifat / Benda+の + うちに",
    explanation: "Menyarankan untuk melakukan sesuatu selagi kondisinya masih memungkinkan (sebelum situasinya berubah menjadi buruk/tidak memungkinkan).",
    examples: [
      {
        japanese: "温かいうちに、食べてください。",
        romaji: "Atatakai uchi ni, tabete kudasai.",
        english: "Silakan dimakan selagi (mumpung) masih hangat."
      },
      {
        japanese: "忘れないうちに、メモをしておこう。",
        romaji: "Wasurenai uchi ni, memo o shite okou.",
        english: "Mari kita catat selagi belum lupa."
      }
    ]
  },
  {
    id: "you-ni-suru",
    level: "N3",
    title: "〜ようにする (you ni suru)",
    meaning: "Berusaha untuk...",
    structure: "Kata Kerja (Kamus/Nai) + ようにする",
    explanation: "Menunjukkan usaha atau niat terus-menerus untuk membuat suatu keadaan terjadi atau menjadi kebiasaan.",
    examples: [
      {
        japanese: "毎日、野菜を食べるようにしています。",
        romaji: "Mainichi, yasai o taberu you ni shite imasu.",
        english: "Saya berusaha untuk selalu makan sayur setiap hari."
      },
      {
        japanese: "遅刻しないようにしてください。",
        romaji: "Chikoku shinai you ni shite kudasai.",
        english: "Tolong usahakan agar tidak datang terlambat."
      }
    ]
  },
  {
    id: "you-ni-naru",
    level: "N3",
    title: "〜ようになる (you ni naru)",
    meaning: "Menjadi bisa / Mulai terbiasa",
    structure: "Kata Kerja (Kamus/Potensial) + ようになる",
    explanation: "Menunjukkan perubahan keadaan, dari yang asalnya tidak bisa menjadi bisa, atau dari tidak terbiasa menjadi terbiasa.",
    examples: [
      {
        japanese: "納豆が食べられるようになりました。",
        romaji: "Nattou ga taberareru you ni narimashita.",
        english: "Saya (sekarang) menjadi bisa makan natto."
      },
      {
        japanese: "最近、よくアニメを見るようになった。",
        romaji: "Saikin, yoku anime o miru you ni natta.",
        english: "Akhir-akhir ini, saya jadi (mulai) sering menonton anime."
      }
    ]
  },
  {
    id: "koto-ni-suru",
    level: "N3",
    title: "〜ことにする (koto ni suru)",
    meaning: "Memutuskan untuk...",
    structure: "Kata Kerja (Kamus/Nai) + ことにする",
    explanation: "Menyatakan sebuah keputusan subyektif yang dibuat oleh diri sendiri, biasanya untuk kebiasaan atau tindakan ke depan.",
    examples: [
      {
        japanese: "明日からタバコをやめることにしました。",
        romaji: "Ashita kara tabako o yameru koto ni shimashita.",
        english: "Saya telah memutuskan untuk berhenti merokok mulai besok."
      },
      {
        japanese: "車を買わないことにした。",
        romaji: "Kuruma o kawanai koto ni shita.",
        english: "Saya memutuskan untuk tidak membeli mobil."
      }
    ]
  },
  {
    id: "to-iutte-mo",
    level: "N3",
    title: "〜といっても (to itte mo)",
    meaning: "Meskipun dibilang / Sekalipun disebut...",
    structure: "Bentuk Biasa + といっても",
    explanation: "Digunakan ketika kenyataannya jauh lebih kecil, sedikit, atau tidak semenarik seperti ekspektasi dari pernyataan sebelumnya.",
    examples: [
      {
        japanese: "英語が話せるといっても、少しだけです。",
        romaji: "Eigo ga hanaseru to itte mo, sukoshi dake desu.",
        english: "Meskipun dibilang bisa berbahasa Inggris, (saya) hanya bisa sedikit saja."
      },
      {
        japanese: "家を建てたといっても、とても小さい家です。",
        romaji: "Ie o tateta to itte mo, totemo chiisai ie desu.",
        english: "Sekalipun disebut telah membangun rumah, itu adalah rumah yang sangat kecil."
      }
    ]
  }
];
