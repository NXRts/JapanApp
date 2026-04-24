export interface VocabularyItem {
  id: string;
  level: string;
  word: string;
  reading: string;
  romaji: string;
  meaning: string;
  category: "noun" | "verb" | "adjective" | "adverb" | "other";
  example?: {
    japanese: string;
    romaji: string;
    english: string;
  };
}

export const n5Vocabulary: VocabularyItem[] = [
  {
    id: "v-n5-taberu",
    level: "N5",
    word: "食べる",
    reading: "たべる",
    romaji: "taberu",
    meaning: "Makan",
    category: "verb",
    example: {
      japanese: "朝ごはんを食べます。",
      romaji: "Asagohan o tabemasu.",
      english: "Saya makan sarapan."
    }
  },
  {
    id: "v-n5-nomu",
    level: "N5",
    word: "飲む",
    reading: "のむ",
    romaji: "nomu",
    meaning: "Minum",
    category: "verb",
    example: {
      japanese: "水を飲みます。",
      romaji: "Mizu o nomimasu.",
      english: "Saya minum air."
    }
  },
  {
    id: "v-n5-iku",
    level: "N5",
    word: "行く",
    reading: "いく",
    romaji: "iku",
    meaning: "Pergi",
    category: "verb",
    example: {
      japanese: "学校へ行きます。",
      romaji: "Gakkou e ikimasu.",
      english: "Saya pergi ke sekolah."
    }
  },
  {
    id: "v-n5-kuru",
    level: "N5",
    word: "来る",
    reading: "くる",
    romaji: "kuru",
    meaning: "Datang",
    category: "verb",
    example: {
      japanese: "友達がうちに来ます。",
      romaji: "Tomodachi ga uchi ni kimasu.",
      english: "Teman datang ke rumah saya."
    }
  },
  {
    id: "v-n5-suru",
    level: "N5",
    word: "する",
    reading: "する",
    romaji: "suru",
    meaning: "Melakukan",
    category: "verb",
    example: {
      japanese: "週末にテニスをします。",
      romaji: "Shuumatsu ni tenisu o shimasu.",
      english: "Di akhir pekan saya (melakukan) tenis."
    }
  },
  {
    id: "v-n5-watashi",
    level: "N5",
    word: "私",
    reading: "わたし",
    romaji: "watashi",
    meaning: "Saya",
    category: "noun",
    example: {
      japanese: "私は学生です。",
      romaji: "Watashi wa gakusei desu.",
      english: "Saya adalah seorang murid."
    }
  },
  {
    id: "v-n5-hito",
    level: "N5",
    word: "人",
    reading: "ひと",
    romaji: "hito",
    meaning: "Orang",
    category: "noun",
    example: {
      japanese: "あの人は誰ですか。",
      romaji: "Ano hito wa dare desu ka.",
      english: "Orang itu siapa?"
    }
  },
  {
    id: "v-n5-hon",
    level: "N5",
    word: "本",
    reading: "ほん",
    romaji: "hon",
    meaning: "Buku",
    category: "noun",
    example: {
      japanese: "図書館で本を借ります。",
      romaji: "Toshokan de hon o karimasu.",
      english: "Saya meminjam buku di perpustakaan."
    }
  },
  {
    id: "v-n5-jikan",
    level: "N5",
    word: "時間",
    reading: "じかん",
    romaji: "jikan",
    meaning: "Waktu",
    category: "noun",
    example: {
      japanese: "時間がありません。",
      romaji: "Jikan ga arimasen.",
      english: "Tidak ada waktu."
    }
  },
  {
    id: "v-n5-ie",
    level: "N5",
    word: "家",
    reading: "いえ",
    romaji: "ie",
    meaning: "Rumah",
    category: "noun",
    example: {
      japanese: "私の家は大きいです。",
      romaji: "Watashi no ie wa ookii desu.",
      english: "Rumah saya besar."
    }
  },
  {
    id: "v-n5-takai",
    level: "N5",
    word: "高い",
    reading: "たかい",
    romaji: "takai",
    meaning: "Tinggi / Mahal",
    category: "adjective",
    example: {
      japanese: "このカバンは高いです。",
      romaji: "Kono kaban wa takai desu.",
      english: "Tas ini mahal."
    }
  },
  {
    id: "v-n5-yasui",
    level: "N5",
    word: "安い",
    reading: "やすい",
    romaji: "yasui",
    meaning: "Murah",
    category: "adjective",
    example: {
      japanese: "あのレストランは安くて美味しいです。",
      romaji: "Ano resutoran wa yasukute oishii desu.",
      english: "Restoran itu murah dan enak."
    }
  },
  {
    id: "v-n5-ookii",
    level: "N5",
    word: "大きい",
    reading: "おおきい",
    romaji: "ookii",
    meaning: "Besar",
    category: "adjective",
    example: {
      japanese: "大きいりんごを買いました。",
      romaji: "Ookii ringo o kaimashita.",
      english: "Saya membeli apel yang besar."
    }
  },
  {
    id: "v-n5-chiisai",
    level: "N5",
    word: "小さい",
    reading: "ちいさい",
    romaji: "chiisai",
    meaning: "Kecil",
    category: "adjective",
    example: {
      japanese: "小さい犬がいます。",
      romaji: "Chiisai inu ga imasu.",
      english: "Ada anjing kecil."
    }
  },
  {
    id: "v-n5-atarashii",
    level: "N5",
    word: "新しい",
    reading: "あたらしい",
    romaji: "atarashii",
    meaning: "Baru",
    category: "adjective",
    example: {
      japanese: "新しい靴が欲しいです。",
      romaji: "Atarashii kutsu ga hoshii desu.",
      english: "Saya menginginkan sepatu baru."
    }
  },
  {
    id: "v-n5-furui",
    level: "N5",
    word: "古い",
    reading: "ふるい",
    romaji: "furui",
    meaning: "Lama / Kuno",
    category: "adjective",
    example: {
      japanese: "これは古い車です。",
      romaji: "Kore wa furui kuruma desu.",
      english: "Ini adalah mobil tua."
    }
  },
  {
    id: "v-n5-totemo",
    level: "N5",
    word: "とても",
    reading: "とても",
    romaji: "totemo",
    meaning: "Sangat",
    category: "adverb",
    example: {
      japanese: "今日はとても暑いです。",
      romaji: "Kyou wa totemo atsui desu.",
      english: "Hari ini sangat panas."
    }
  },
  {
    id: "v-n5-sukoshi",
    level: "N5",
    word: "少し",
    reading: "すこし",
    romaji: "sukoshi",
    meaning: "Sedikit",
    category: "adverb",
    example: {
      japanese: "日本語が少しわかります。",
      romaji: "Nihongo ga sukoshi wakarimasu.",
      english: "Saya mengerti bahasa Jepang sedikit."
    }
  },
  {
    id: "v-n5-yoku",
    level: "N5",
    word: "よく",
    reading: "よく",
    romaji: "yoku",
    meaning: "Sering / Dengan baik",
    category: "adverb",
    example: {
      japanese: "私はよく映画を見ます。",
      romaji: "Watashi wa yoku eiga o mimasu.",
      english: "Saya sering menonton film."
    }
  },
  {
    id: "v-n5-itsumo",
    level: "N5",
    word: "いつも",
    reading: "いつも",
    romaji: "itsumo",
    meaning: "Selalu",
    category: "adverb",
    example: {
      japanese: "彼はいつも元気です。",
      romaji: "Kare wa itsumo genki desu.",
      english: "Dia selalu bersemangat."
    }
  },
  {
    id: "v-n5-okiru",
    level: "N5",
    word: "起きる",
    reading: "おきる",
    romaji: "okiru",
    meaning: "Bangun",
    category: "verb",
    example: {
      japanese: "毎朝六時に起きます。",
      romaji: "Maiasa rokuji ni okimasu.",
      english: "Saya bangun jam enam setiap pagi."
    }
  },
  {
    id: "v-n5-neru",
    level: "N5",
    word: "寝る",
    reading: "ねる",
    romaji: "neru",
    meaning: "Tidur",
    category: "verb",
    example: {
      japanese: "夜十時に寝ます。",
      romaji: "Yoru juuji ni nemasu.",
      english: "Saya tidur pada jam sepuluh malam."
    }
  },
  {
    id: "v-n5-hanasu",
    level: "N5",
    word: "話す",
    reading: "はなす",
    romaji: "hanasu",
    meaning: "Berbicara",
    category: "verb",
    example: {
      japanese: "友達と日本語で話します。",
      romaji: "Tomodachi to Nihongo de hanashimasu.",
      english: "Saya berbicara dengan teman menggunakan bahasa Jepang."
    }
  },
  {
    id: "v-n5-kiku",
    level: "N5",
    word: "聞く",
    reading: "きく",
    romaji: "kiku",
    meaning: "Mendengar / Bertanya",
    category: "verb",
    example: {
      japanese: "先生に質問を聞きます。",
      romaji: "Sensei ni shitsumon o kikimasu.",
      english: "Saya menanyakan pertanyaan kepada guru."
    }
  },
  {
    id: "v-n5-yomu",
    level: "N5",
    word: "読む",
    reading: "よむ",
    romaji: "yomu",
    meaning: "Membaca",
    category: "verb",
    example: {
      japanese: "毎晩本を読みます。",
      romaji: "Maiban hon o yomimasu.",
      english: "Saya membaca buku setiap malam."
    }
  },
  {
    id: "v-n5-kaku",
    level: "N5",
    word: "書く",
    reading: "かく",
    romaji: "kaku",
    meaning: "Menulis",
    category: "verb",
    example: {
      japanese: "ノートに漢字を書きます。",
      romaji: "Nooto ni kanji o kakimasu.",
      english: "Saya menulis kanji di buku catatan."
    }
  },
  {
    id: "v-n5-inu",
    level: "N5",
    word: "犬",
    reading: "いぬ",
    romaji: "inu",
    meaning: "Anjing",
    category: "noun",
    example: {
      japanese: "可愛い犬がいます。",
      romaji: "Kawaii inu ga imasu.",
      english: "Ada anjing yang lucu."
    }
  },
  {
    id: "v-n5-neko",
    level: "N5",
    word: "猫",
    reading: "ねこ",
    romaji: "neko",
    meaning: "Kucing",
    category: "noun",
    example: {
      japanese: "私は猫が好きです。",
      romaji: "Watashi wa neko ga suki desu.",
      english: "Saya suka kucing."
    }
  },
  {
    id: "v-n5-mizu",
    level: "N5",
    word: "水",
    reading: "みず",
    romaji: "mizu",
    meaning: "Air",
    category: "noun",
    example: {
      japanese: "冷たい水を飲みます。",
      romaji: "Tsumetai mizu o nomimasu.",
      english: "Saya minum air dingin."
    }
  },
  {
    id: "v-n5-ocha",
    level: "N5",
    word: "お茶",
    reading: "おちゃ",
    romaji: "ocha",
    meaning: "Teh hijau",
    category: "noun",
    example: {
      japanese: "温かいお茶をどうぞ。",
      romaji: "Atatakai ocha o douzo.",
      english: "Silakan teh hangatnya."
    }
  },
  {
    id: "v-n5-ringo",
    level: "N5",
    word: "りんご",
    reading: "りんご",
    romaji: "ringo",
    meaning: "Apel",
    category: "noun",
    example: {
      japanese: "りんごを三つ買いました。",
      romaji: "Ringo o mittsu kaimashita.",
      english: "Saya membeli tiga buah apel."
    }
  },
  {
    id: "v-n5-mikan",
    level: "N5",
    word: "みかん",
    reading: "みかん",
    romaji: "mikan",
    meaning: "Jeruk mandarin",
    category: "noun",
    example: {
      japanese: "みかんが美味しいです。",
      romaji: "Mikan ga oishii desu.",
      english: "Jeruk mandarinnya enak."
    }
  },
  {
    id: "v-n5-eiga",
    level: "N5",
    word: "映画",
    reading: "えいが",
    romaji: "eiga",
    meaning: "Film",
    category: "noun",
    example: {
      japanese: "週末に映画を見ます。",
      romaji: "Shuumatsu ni eiga o mimasu.",
      english: "Saya menonton film di akhir pekan."
    }
  },
  {
    id: "v-n5-tomodachi",
    level: "N5",
    word: "友達",
    reading: "ともだち",
    romaji: "tomodachi",
    meaning: "Teman",
    category: "noun",
    example: {
      japanese: "友達と一緒に遊びます。",
      romaji: "Tomodachi to issho ni asobimasu.",
      english: "Saya bermain bersama dengan teman."
    }
  },
  {
    id: "v-n5-gakkou",
    level: "N5",
    word: "学校",
    reading: "がっこう",
    romaji: "gakkou",
    meaning: "Sekolah",
    category: "noun",
    example: {
      japanese: "明日、学校が休みです。",
      romaji: "Ashita, gakkou ga yasumi desu.",
      english: "Besok, sekolah libur."
    }
  },
  {
    id: "v-n5-sensei",
    level: "N5",
    word: "先生",
    reading: "せんせい",
    romaji: "sensei",
    meaning: "Guru",
    category: "noun",
    example: {
      japanese: "山田先生は優しいです。",
      romaji: "Yamada sensei wa yasashii desu.",
      english: "Guru Yamada baik hati."
    }
  },
  {
    id: "v-n5-atsui",
    level: "N5",
    word: "暑い",
    reading: "あつい",
    romaji: "atsui",
    meaning: "Panas (cuaca)",
    category: "adjective",
    example: {
      japanese: "今日はとても暑いです。",
      romaji: "Kyou wa totemo atsui desu.",
      english: "Hari ini sangat panas."
    }
  },
  {
    id: "v-n5-samui",
    level: "N5",
    word: "寒い",
    reading: "さむい",
    romaji: "samui",
    meaning: "Dingin (cuaca)",
    category: "adjective",
    example: {
      japanese: "冬は寒いです。",
      romaji: "Fuyu wa samui desu.",
      english: "Musim dingin itu dingin."
    }
  },
  {
    id: "v-n5-oishii",
    level: "N5",
    word: "美味しい",
    reading: "おいしい",
    romaji: "oishii",
    meaning: "Enak",
    category: "adjective",
    example: {
      japanese: "このケーキは美味しいです。",
      romaji: "Kono keeki wa oishii desu.",
      english: "Kue ini enak."
    }
  },
  {
    id: "v-n5-tanoshii",
    level: "N5",
    word: "楽しい",
    reading: "たのしい",
    romaji: "tanoshii",
    meaning: "Menyenangkan",
    category: "adjective",
    example: {
      japanese: "パーティーは楽しかったです。",
      romaji: "Paatii wa tanoshikatta desu.",
      english: "Pestanya menyenangkan."
    }
  }
];
