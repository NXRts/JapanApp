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
    meaning: "To be (is/am/are)",
    structure: "Noun / Adjective + です",
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
    id: "dewa-arimasen",
    level: "N5",
    title: "〜ではありません (dewa arimasen)",
    meaning: "To not be (is not/am not/are not)",
    structure: "Noun / Na-Adjective + ではありません",
    explanation: "Bentuk negatif dari 'desu' untuk kata benda dan kata sifat-na. Dalam percakapan sehari-hari sering disingkat menjadi 'ja arimasen'.",
    examples: [
      {
        japanese: "私は先生ではありません。",
        romaji: "Watashi wa sensei dewa arimasen.",
        english: "Saya bukan seorang guru."
      },
      {
        japanese: "ここは静かじゃありません。",
        romaji: "Koko wa shizuka ja arimasen.",
        english: "Di sini tidak tenang/sunyi."
      }
    ]
  },
  {
    id: "wa-particle",
    level: "N5",
    title: "Partikel は (wa)",
    meaning: "Topic marker",
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
    meaning: "Polite verb form",
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
    meaning: "Polite negative verb form",
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
    id: "mashita",
    level: "N5",
    title: "〜ました (mashita)",
    meaning: "Past polite verb form (Completed)",
    structure: "Kata Kerja (Bentuk Masu) + ました",
    explanation: "Bentuk lampau (past tense) yang sopan untuk kata kerja. Digunakan untuk menyatakan tindakan yang sudah terjadi atau selesai dilakukan.",
    examples: [
      {
        japanese: "昨日、映画を見ました。",
        romaji: "Kinou, eiga o mimashita.",
        english: "Kemarin, saya (telah) menonton film."
      },
      {
        japanese: "今朝、６時に起きました。",
        romaji: "Kesa, rokuji ni okimashita.",
        english: "Tadi pagi, saya bangun jam 6."
      }
    ]
  },
  {
    id: "masen-deshita",
    level: "N5",
    title: "〜ませんでした (masen deshita)",
    meaning: "Past negative polite verb form",
    structure: "Kata Kerja (Bentuk Masu) + ませんでした",
    explanation: "Bentuk negatif lampau dari kata kerja yang sopan. Artinya suatu tindakan tidak dilakukan di masa lalu.",
    examples: [
      {
        japanese: "きのうは勉強しませんでした。",
        romaji: "Kinou wa benkyou shimasen deshita.",
        english: "Kemarin saya tidak belajar."
      },
      {
        japanese: "朝ご飯を食べませんでした。",
        romaji: "Asagohan o tabemasen deshita.",
        english: "Saya tidak makan sarapan."
      }
    ]
  },
  {
    id: "ni-particle-time",
    level: "N5",
    title: "Partikel に (Waktu)",
    meaning: "At (specific time)",
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
    id: "ni-particle-destination",
    level: "N5",
    title: "Partikel に (Tujuan)",
    meaning: "To / For (Destination / Recipient)",
    structure: "Tempat/Orang + に + Kata Kerja Pindah/Memberi",
    explanation: "Menunjukkan tujuan pergerakan (pergi ke...) atau arah sebuah tindakan (memberi kepada...).",
    examples: [
      {
        japanese: "会社に行きます。",
        romaji: "Kaisha ni ikimasu.",
        english: "Saya pergi ke perusahaan/kantor."
      },
      {
        japanese: "友達にプレゼントをあげます。",
        romaji: "Tomodachi ni purezento o agemasu.",
        english: "Saya memberikan hadiah kepada teman."
      }
    ]
  },
  {
    id: "e-particle",
    level: "N5",
    title: "Partikel へ (e)",
    meaning: "To (Direction of movement)",
    structure: "Tempat + へ + Kata Kerja Pergerakan (行く, 来る, 帰る)",
    explanation: "Mirip dengan に untuk tujuan, tapi lebih menekankan pada arah pergerakan. Ditulis 'he' tapi dibaca 'e'.",
    examples: [
      {
        japanese: "東京へ行きます。",
        romaji: "Toukyou e ikimasu.",
        english: "Saya pergi ke (arah) Tokyo."
      },
      {
        japanese: "うちへ帰ります。",
        romaji: "Uchi e kaerimasu.",
        english: "Saya pulang ke rumah."
      }
    ]
  },
  {
    id: "o-particle",
    level: "N5",
    title: "Partikel を (o)",
    meaning: "Direct object marker",
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
    meaning: "At / In (Location of action)",
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
    id: "de-particle-tool",
    level: "N5",
    title: "Partikel で (Alat / Metode)",
    meaning: "By means of / Using",
    structure: "Alat / Metode / Kendaraan + で",
    explanation: "Menunjukkan alat, sarana, atau metode yang digunakan untuk melakukan sesuatu.",
    examples: [
      {
        japanese: "バスで学校へ行きます。",
        romaji: "Basu de gakkou e ikimasu.",
        english: "Saya pergi ke sekolah dengan (naik) bus."
      },
      {
        japanese: "鉛筆で手紙を書きます。",
        romaji: "Enpitsu de tegami o kakimasu.",
        english: "Saya menulis surat dengan pensil."
      }
    ]
  },
  {
    id: "to-particle",
    level: "N5",
    title: "Partikel と (to)",
    meaning: "And / With",
    structure: "Kata Benda 1 + と + Kata Benda 2 (atau Bersama Orang + と)",
    explanation: "Bisa digunakan untuk menggabungkan benda ('dan') secara spesifik, atau menunjukkan teman beraktivitas ('bersama dengan').",
    examples: [
      {
        japanese: "犬と猫が好きです。",
        romaji: "Inu to neko ga suki desu.",
        english: "Saya suka anjing dan kucing."
      },
      {
        japanese: "友達と映画を見ました。",
        romaji: "Tomodachi to eiga o mimashita.",
        english: "Saya menonton film bersama teman."
      }
    ]
  },
  {
    id: "mo-particle",
    level: "N5",
    title: "Partikel も (mo)",
    meaning: "Also / Too",
    structure: "Kata Benda + も",
    explanation: "Menggantikan partikel は, が, atau を untuk menyatakan bahwa sesuatu 'juga' memiliki sifat atau melakukan aksi yang sama dengan yang telah disebutkan sebelumnya.",
    examples: [
      {
        japanese: "私も学生です。",
        romaji: "Watashi mo gakusei desu.",
        english: "Saya juga seorang murid."
      },
      {
        japanese: "りんごを買いました。みかんも買いました。",
        romaji: "Ringo o kaimashita. Mikan mo kaimashita.",
        english: "Saya membeli apel. Saya juga membeli jeruk."
      }
    ]
  },
  {
    id: "ga-particle",
    level: "N5",
    title: "Partikel が (ga)",
    meaning: "Subject marker",
    structure: "Subjek + が + Predikat",
    explanation: "Berbeda dengan は yang menandai topik lama, が digunakan untuk menandai informasi baru (subjek), atau digunakan secara spesifik bersama kata sifat yang menunjukkan suka/benci, pintar/bodoh, ada/tidak ada.",
    examples: [
      {
        japanese: "雨が降っています。",
        romaji: "Ame ga futte imasu.",
        english: "Hujan sedang turun. (fakta baru)"
      },
      {
        japanese: "私は猫が好きです。",
        romaji: "Watashi wa neko ga suki desu.",
        english: "Saya (topik) suka kucing (subjek spesifik)."
      }
    ]
  },
  {
    id: "arimasu-imasu",
    level: "N5",
    title: "あります / います",
    meaning: "There is / To exist",
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
  },
  {
    id: "kara-made",
    level: "N5",
    title: "〜から 〜まで (kara - made)",
    meaning: "From ... To ...",
    structure: "Waktu/Tempat 1 + から + Waktu/Tempat 2 + まで",
    explanation: "Menunjukkan titik awal (kara) dan titik akhir (made) dari waktu atau jarak geografis.",
    examples: [
      {
        japanese: "会議は９時から５時までです。",
        romaji: "Kaigi wa kuji kara goji made desu.",
        english: "Rapat berlangsung dari jam 9 sampai jam 5."
      },
      {
        japanese: "家から学校まで歩きます。",
        romaji: "Ie kara gakkou made arukimasu.",
        english: "Saya berjalan dari rumah sampai ke sekolah."
      }
    ]
  },
  {
    id: "te-kudasai",
    level: "N5",
    title: "〜てください (te kudasai)",
    meaning: "Please do...",
    structure: "Kata Kerja (Bentuk Te) + ください",
    explanation: "Digunakan untuk meminta seseorang melakukan sesuatu dengan cara yang sopan.",
    examples: [
      {
        japanese: "ここに名前を書いてください。",
        romaji: "Koko ni namae o kaite kudasai.",
        english: "Tolong tulis nama di sini."
      },
      {
        japanese: "ちょっと待ってください。",
        romaji: "Chotto matte kudasai.",
        english: "Tolong tunggu sebentar."
      }
    ]
  },
  {
    id: "te-mo-ii-desu",
    level: "N5",
    title: "〜てもいいです (te mo ii desu)",
    meaning: "May do... (Permission)",
    structure: "Kata Kerja (Bentuk Te) + もいいです(か)",
    explanation: "Memberikan atau meminta izin untuk melakukan sesuatu. Ditambah 'ka' di akhir untuk bertanya 'Bolehkah saya...?'",
    examples: [
      {
        japanese: "写真を撮ってもいいですか。",
        romaji: "Shashin o totte mo ii desu ka.",
        english: "Bolehkah saya mengambil foto?"
      },
      {
        japanese: "はい、ここで休んでもいいです。",
        romaji: "Hai, koko de yasunde mo ii desu.",
        english: "Ya, Anda boleh istirahat di sini."
      }
    ]
  },
  {
    id: "te-wa-ikemasen",
    level: "N5",
    title: "〜てはいけません (te wa ikemasen)",
    meaning: "Must not do (Prohibition)",
    structure: "Kata Kerja (Bentuk Te) + はいけません",
    explanation: "Digunakan untuk melarang atau menunjukkan bahwa suatu tindakan tidak diizinkan / dilarang keras.",
    examples: [
      {
        japanese: "ここでタバコを吸ってはいけません。",
        romaji: "Koko de tabako o sutte wa ikemasen.",
        english: "Tidak boleh merokok di sini."
      },
      {
        japanese: "危ないですから、入ってはいけません。",
        romaji: "Abunai desu kara, haitte wa ikemasen.",
        english: "Karena berbahaya, tidak boleh masuk."
      }
    ]
  },
  {
    id: "nai-de-kudasai",
    level: "N5",
    title: "〜ないでください (nai de kudasai)",
    meaning: "Please don't do...",
    structure: "Kata Kerja (Bentuk Nai) + でください",
    explanation: "Permintaan sopan agar seseorang TIDAK melakukan sesuatu.",
    examples: [
      {
        japanese: "写真を撮らないでください。",
        romaji: "Shashin o toranaide kudasai.",
        english: "Tolong jangan mengambil foto."
      },
      {
        japanese: "心配しないでください。",
        romaji: "Shinpai shinaide kudasai.",
        english: "Tolong jangan khawatir."
      }
    ]
  },
  {
    id: "tai-desu",
    level: "N5",
    title: "〜たいです (tai desu)",
    meaning: "Want to do...",
    structure: "Kata Kerja (Bentuk Masu dicoret) + たいです",
    explanation: "Menyatakan keinginan diri sendiri untuk melakukan suatu tindakan. Bertingkah laku seperti kata sifat berakhiran-i.",
    examples: [
      {
        japanese: "日本へ行きたいです。",
        romaji: "Nihon e ikitai desu.",
        english: "Saya ingin pergi ke Jepang."
      },
      {
        japanese: "寿司が食べたいです。",
        romaji: "Sushi ga tabetai desu.",
        english: "Saya ingin makan sushi."
      }
    ]
  },
  {
    id: "hoshii-desu",
    level: "N5",
    title: "〜がほしいです (ga hoshii desu)",
    meaning: "Want (something)",
    structure: "Kata Benda + がほしいです",
    explanation: "Menyatakan keinginan akan suatu benda mati atau hal yang bisa dimiliki, bukan sebuah aksi/tindakan.",
    examples: [
      {
        japanese: "新しい車がほしいです。",
        romaji: "Atarashii kuruma ga hoshii desu.",
        english: "Saya ingin mobil baru."
      },
      {
        japanese: "時間とお金がほしいです。",
        romaji: "Jikan to okane ga hoshii desu.",
        english: "Saya ingin waktu dan uang."
      }
    ]
  },
  {
    id: "koto-ga-dekimasu",
    level: "N5",
    title: "〜ことができます (koto ga dekimasu)",
    meaning: "Can / Able to do",
    structure: "Kata Kerja (Bentuk Kamus) + ことができます",
    explanation: "Cara sopan untuk menyatakan kemampuan atau kemungkinan untuk melakukan sesuatu.",
    examples: [
      {
        japanese: "私は日本語を少し話すことができます。",
        romaji: "Watashi wa Nihongo o sukoshi hanasu koto ga dekimasu.",
        english: "Saya bisa berbicara bahasa Jepang sedikit."
      },
      {
        japanese: "ここでチケットを買うことができます。",
        romaji: "Koko de chiketto o kau koto ga dekimasu.",
        english: "Anda bisa membeli tiket di sini."
      }
    ]
  },
  {
    id: "tari-tari",
    level: "N5",
    title: "〜たり、〜たりします (tari, tari shimasu)",
    meaning: "Doing things like... and...",
    structure: "Kata Kerja 1 (Bentuk Ta) + り、Kata Kerja 2 (Bentuk Ta) + りします",
    explanation: "Digunakan untuk menyebutkan beberapa contoh tindakan dari banyak tindakan yang dilakukan. Tidak menyiratkan urutan waktu seperti partikel 'te'. Kata kerja terakhir selalu diikuti 'shimasu' (atau 'shimashita' untuk masa lalu).",
    examples: [
      {
        japanese: "週末は買い物をしたり、映画を見たりします。",
        romaji: "Shuumatsu wa kaimono o shitari, eiga o mitari shimasu.",
        english: "Pada akhir pekan, saya (melakukan hal seperti) berbelanja dan menonton film."
      },
      {
        japanese: "昨日は本を読んだり、手紙を書いたりしました。",
        romaji: "Kinou wa hon o yondari, tegami o kaitari shimashita.",
        english: "Kemarin saya membaca buku, menulis surat, dan sebagainya."
      }
    ]
  },
  {
    id: "mae-ni",
    level: "N5",
    title: "〜前に (mae ni)",
    meaning: "Before...",
    structure: "Kata Kerja (Kamus) / Kata Benda + の / Waktu + 前に",
    explanation: "Digunakan untuk menunjukkan bahwa suatu tindakan dilakukan sebelum tindakan lain atau kejadian lain terjadi.",
    examples: [
      {
        japanese: "寝る前に、本を読みます。",
        romaji: "Neru mae ni, hon o yomimasu.",
        english: "Sebelum tidur, saya membaca buku."
      },
      {
        japanese: "食事の前に、手を洗います。",
        romaji: "Shokuji no mae ni, te o araimasu.",
        english: "Sebelum makan, saya mencuci tangan."
      }
    ]
  },
  {
    id: "ato-de",
    level: "N5",
    title: "〜後で (ato de)",
    meaning: "After...",
    structure: "Kata Kerja (Bentuk Ta) / Kata Benda + の + 後で",
    explanation: "Digunakan untuk menunjukkan bahwa suatu tindakan dilakukan setelah tindakan lain selesai. Sangat penting untuk mengingat kata kerja menggunakan bentuk Ta (lampau) sebelum 'ato de'.",
    examples: [
      {
        japanese: "勉強した後で、映画を見ます。",
        romaji: "Benkyou shita ato de, eiga o mimasu.",
        english: "Setelah belajar, saya akan menonton film."
      },
      {
        japanese: "仕事の後で、飲みに行きましょう。",
        romaji: "Shigoto no ato de, nomi ni ikimashou.",
        english: "Setelah bekerja, mari kita pergi minum."
      }
    ]
  },
  {
    id: "kara-reason",
    level: "N5",
    title: "〜から (kara - Alasan)",
    meaning: "Because...",
    structure: "Kalimat Alasan + から、Kalimat Akibat",
    explanation: "Digunakan untuk menjelaskan alasan. 'Kara' biasanya bernuansa subyektif dan sering dipakai ketika membujuk, memerintah, atau memberikan alasan pribadi.",
    examples: [
      {
        japanese: "忙しいですから、行きません。",
        romaji: "Isogashii desu kara, ikimasen.",
        english: "Karena sibuk, saya tidak akan pergi."
      },
      {
        japanese: "明日テストがありますから、勉強します。",
        romaji: "Ashita tesuto ga arimasu kara, benkyou shimasu.",
        english: "Karena besok ada ujian, saya belajar."
      }
    ]
  },
  {
    id: "node",
    level: "N5",
    title: "〜ので (node)",
    meaning: "Because (Formal)",
    structure: "Bentuk Biasa (Na-adj/Noun + な) + ので",
    explanation: "Mirip dengan 'kara', tetapi 'node' lebih obyektif dan sopan. Sering digunakan untuk menjelaskan fakta atau meminta maaf secara formal.",
    examples: [
      {
        japanese: "雨が降っているので、試合は中止です。",
        romaji: "Ame ga futte iru node, shiai wa chuushi desu.",
        english: "Karena hujan turun (fakta obyektif), pertandingan dibatalkan."
      },
      {
        japanese: "日曜日なので、銀行は休みです。",
        romaji: "Nichiyoubi na node, ginkou wa yasumi desu.",
        english: "Karena (ini) hari Minggu, bank libur."
      }
    ]
  },
  {
    id: "tsumori-n5",
    level: "N5",
    title: "〜つもりです (tsumori desu)",
    meaning: "Intend / Plan to",
    structure: "Kata Kerja (Bentuk Kamus / Nai) + つもりです",
    explanation: "Digunakan untuk menyatakan rencana atau niat kuat dari si pembicara yang sudah diputuskan sebelumnya.",
    examples: [
      {
        japanese: "来年、日本へ行くつもりです。",
        romaji: "Rainen, Nihon e iku tsumori desu.",
        english: "Tahun depan, saya berencana pergi ke Jepang."
      },
      {
        japanese: "今日は出かけないつもりです。",
        romaji: "Kyou wa dekakenai tsumori desu.",
        english: "Hari ini saya bermaksud untuk tidak keluar."
      }
    ]
  }
];
