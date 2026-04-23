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
    explanation: "Digunakan untuk membicarakan pengalaman di masa lalu. Artinya 'pernah melakukan sesuatu'. Tidak digunakan untuk hal yang rutin dilakukan.",
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
    explanation: "Digunakan untuk menyatakan niat atau rencana kuat yang sudah diputuskan sebelumnya. Biasanya tidak digunakan untuk menanyakan niat orang tua/atasan.",
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
  },
  {
    id: "yotei",
    level: "N4",
    title: "〜予定 (yotei)",
    meaning: "Rencana / Jadwal",
    structure: "Kata Kerja (Kamus) / Kata Benda + の + 予定です",
    explanation: "Digunakan untuk menyatakan rencana yang sudah pasti atau jadwal yang sudah ditetapkan (biasanya secara objektif atau formal).",
    examples: [
      {
        japanese: "明日は会議の予定です。",
        romaji: "Ashita wa kaigi no yotei desu.",
        english: "Besok rencananya ada rapat."
      },
      {
        japanese: "来月、出張する予定です。",
        romaji: "Raigetsu, shucchou suru yotei desu.",
        english: "Bulan depan dijadwalkan akan melakukan perjalanan dinas."
      }
    ]
  },
  {
    id: "te-shimau",
    level: "N4",
    title: "〜てしまう (te shimau)",
    meaning: "Selesai (tuntas) / Tidak sengaja (penyesalan)",
    structure: "Kata Kerja (Bentuk Te) + しまう / しまいました",
    explanation: "Mengekspresikan dua hal: 1) Menyelesaikan suatu tindakan secara tuntas hingga akhir. 2) Penyesalan atas sesuatu yang terjadi secara tidak sengaja.",
    examples: [
      {
        japanese: "この本はもう読んでしまいました。",
        romaji: "Kono hon wa mou yonde shimaimashita.",
        english: "Saya sudah selesai membaca buku ini (sampai tuntas)."
      },
      {
        japanese: "パスポートを忘れてしまいました。",
        romaji: "Pasupooto o wasurete shimaimashita.",
        english: "Aduh, saya (tidak sengaja) melupakan paspor saya."
      }
    ]
  },
  {
    id: "te-oku",
    level: "N4",
    title: "〜ておく (te oku)",
    meaning: "Melakukan sebagai persiapan",
    structure: "Kata Kerja (Bentuk Te) + おく / おきます",
    explanation: "Melakukan suatu tindakan sebagai bentuk persiapan untuk masa depan, atau membiarkan sesuatu dalam keadaan seperti semula.",
    examples: [
      {
        japanese: "パーティーの前に、飲み物を買っておきます。",
        romaji: "Paatii no mae ni, nomimono o katte okimasu.",
        english: "Sebelum pesta, saya akan membeli minuman (sebagai persiapan)."
      },
      {
        japanese: "窓は開けておいてください。",
        romaji: "Mado wa akete oite kudasai.",
        english: "Tolong biarkan jendelanya terbuka (seperti itu saja)."
      }
    ]
  },
  {
    id: "sou-desu-hearsay",
    level: "N4",
    title: "〜そうです (sou desu - Hearsay)",
    meaning: "Katanya / Kudengar",
    structure: "Bentuk Biasa (Kamus/Ta/Nai) + そうです",
    explanation: "Digunakan untuk menyampaikan informasi yang didengar dari sumber lain (kabar angin/katanya). Sumber informasi biasanya ditandai dengan 〜によると (menurut...).",
    examples: [
      {
        japanese: "天気予報によると、明日は雨だそうです。",
        romaji: "Tenki yohou ni yoru to, ashita wa ame da sou desu.",
        english: "Menurut ramalan cuaca, katanya besok akan hujan."
      },
      {
        japanese: "山田さんは結婚したそうです。",
        romaji: "Yamada-san wa kekkon shita sou desu.",
        english: "Kudengar Yamada sudah menikah."
      }
    ]
  },
  {
    id: "sou-desu-appearance",
    level: "N4",
    title: "〜そうです (sou desu - Appearance)",
    meaning: "Kelihatannya / Tampaknya",
    structure: "Kata Kerja (Masu dicoret) / Kata Sifat (i dicoret) + そうです",
    explanation: "Menyatakan dugaan atau kesan yang ditangkap oleh mata (visual). Berbeda dengan bentuk hearsay yang menggunakan bentuk biasa (kamus).",
    examples: [
      {
        japanese: "このケーキはおいしそうです。",
        romaji: "Kono keeki wa oishisou desu.",
        english: "Kue ini kelihatannya enak."
      },
      {
        japanese: "雨が降りそうです。",
        romaji: "Ame ga furisou desu.",
        english: "Kelihatannya akan turun hujan."
      }
    ]
  },
  {
    id: "sugiru",
    level: "N4",
    title: "〜すぎる (sugiru)",
    meaning: "Terlalu...",
    structure: "Kata Kerja (Masu dicoret) / Kata Sifat (i dicoret) + すぎる",
    explanation: "Menyatakan bahwa suatu kondisi atau tindakan berlebihan hingga melampaui batas yang wajar (biasanya berkonotasi negatif).",
    examples: [
      {
        japanese: "昨日はお酒を飲みすぎました。",
        romaji: "Kinou wa osake o nomisugimashita.",
        english: "Kemarin saya minum alkohol terlalu banyak."
      },
      {
        japanese: "このカバンは高すぎます。",
        romaji: "Kono kaban wa takasugimasu.",
        english: "Tas ini terlalu mahal."
      }
    ]
  },
  {
    id: "hou-ga-ii",
    level: "N4",
    title: "〜ほうがいい (hou ga ii)",
    meaning: "Sebaiknya...",
    structure: "Kata Kerja (Ta / Nai) + ほうがいいです",
    explanation: "Digunakan untuk memberikan saran atau anjuran yang kuat kepada orang lain, yang mengimplikasikan hal buruk akan terjadi jika saran ini tidak diikuti.",
    examples: [
      {
        japanese: "疲れたら、休んだほうがいいですよ。",
        romaji: "Tsukaretara, yasunda hou ga ii desu yo.",
        english: "Kalau lelah, sebaiknya Anda istirahat."
      },
      {
        japanese: "夜遅く出かけないほうがいいです。",
        romaji: "Yoru osoku dekakenai hou ga ii desu.",
        english: "Sebaiknya Anda tidak keluar larut malam."
      }
    ]
  },
  {
    id: "kamoshiremasen",
    level: "N4",
    title: "〜かもしれません (kamoshiremasen)",
    meaning: "Mungkin saja",
    structure: "Bentuk Biasa + かもしれません",
    explanation: "Mengekspresikan probabilitas atau kemungkinan terjadinya sesuatu (sekitar 50%). Ini adalah tebakan subyektif dari pembicara.",
    examples: [
      {
        japanese: "明日は雪が降るかもしれません。",
        romaji: "Ashita wa yuki ga furu kamoshiremasen.",
        english: "Mungkin besok akan turun salju."
      },
      {
        japanese: "彼は本当のことを知っているかもしれない。",
        romaji: "Kare wa hontou no koto o shitte iru kamoshirenai.",
        english: "Dia mungkin tahu kebenarannya."
      }
    ]
  },
  {
    id: "nara",
    level: "N4",
    title: "〜なら (nara)",
    meaning: "Kalau (Asumsi/Saran)",
    structure: "Kata Benda / Kata Kerja Biasa + なら",
    explanation: "Digunakan ketika memberikan saran atau pandangan berdasarkan topik yang baru saja diangkat oleh lawan bicara.",
    examples: [
      {
        japanese: "温泉に行くなら、箱根がいいですよ。",
        romaji: "Onsen ni iku nara, Hakone ga ii desu yo.",
        english: "Kalau mau pergi ke pemandian air panas, Hakone itu bagus lho."
      },
      {
        japanese: "パソコンなら、この店が安いです。",
        romaji: "Pasokon nara, kono mise ga yasui desu.",
        english: "Kalau (bicara soal) komputer, toko ini murah."
      }
    ]
  },
  {
    id: "tara",
    level: "N4",
    title: "〜たら (tara)",
    meaning: "Kalau / Setelah",
    structure: "Kata Kerja / Sifat (Bentuk Lampau) + ら",
    explanation: "Digunakan untuk pengandaian 'jika' atau menyatakan tindakan yang akan terjadi 'setelah' suatu kondisi masa depan terpenuhi.",
    examples: [
      {
        japanese: "雨が降ったら、行きません。",
        romaji: "Ame ga futtara, ikimasen.",
        english: "Kalau hujan turun, saya tidak akan pergi."
      },
      {
        japanese: "日本に着いたら、電話します。",
        romaji: "Nihon ni tsuitara, denwa shimasu.",
        english: "Setelah tiba di Jepang, saya akan menelepon."
      }
    ]
  },
  {
    id: "ba-conditional",
    level: "N4",
    title: "〜ば (Bentuk Syarat / Conditional 'ba')",
    meaning: "Jika (Kondisi)",
    structure: "Kata Kerja (Bentuk Ba)",
    explanation: "Bentuk kondisional yang fokus pada syarat yang diperlukan untuk menghasilkan akibat tertentu. (Ubah suku kata terakhir U menjadi E, tambah 'ba').",
    examples: [
      {
        japanese: "春になれば、桜が咲きます。",
        romaji: "Haru ni nareba, sakura ga sakimasu.",
        english: "Jika musim semi tiba, bunga sakura akan mekar."
      },
      {
        japanese: "薬を飲めば、よくなりますよ。",
        romaji: "Kusuri o nomeba, yoku narimasu yo.",
        english: "Kalau kamu minum obat, kamu akan sembuh."
      }
    ]
  },
  {
    id: "te-ageru-morau-kureru",
    level: "N4",
    title: "〜てあげる / 〜てもらう / 〜てくれる",
    meaning: "Menerima / Memberikan (Tindakan)",
    structure: "Kata Kerja (Bentuk Te) + あげる / もらう / くれる",
    explanation: "Digunakan untuk menyatakan aktivitas memberi atau menerima 'bantuan' atau 'kebaikan'. Kureru (orang lain melakukan untukku), Morau (aku menerima tindakan), Ageru (aku melakukan untuk orang lain).",
    examples: [
      {
        japanese: "先生が日本語を教えてくれました。",
        romaji: "Sensei ga Nihongo o oshiete kuremashita.",
        english: "Guru mengajarkan bahasa Jepang kepada saya."
      },
      {
        japanese: "友達に車を貸してあげました。",
        romaji: "Tomodachi ni kuruma o kashite agemashita.",
        english: "Saya meminjamkan mobil kepada teman."
      }
    ]
  }
];
