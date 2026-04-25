export type VerbGroup = 1 | 2 | 3;

export interface ConjugationVerb {
  dictionary: string; // e.g. 食べる
  reading: string;    // e.g. たべる
  romaji: string;     // e.g. taberu
  meaning: string;    // e.g. Makan
  group: VerbGroup;   // 1 (U-verbs), 2 (Ru-verbs), 3 (Irregular)
  forms: {
    masu: string;     // 食べます
    te: string;       // 食べて
    ta: string;       // 食べた
    nai: string;      // 食べない
  };
}

export const conjugationData: ConjugationVerb[] = [
  // Group 1 (U-verbs)
  {
    dictionary: "行く",
    reading: "いく",
    romaji: "iku",
    meaning: "Pergi",
    group: 1,
    forms: {
      masu: "行きます",
      te: "行って", // Special case
      ta: "行った", // Special case
      nai: "行かない"
    }
  },
  {
    dictionary: "飲む",
    reading: "のむ",
    romaji: "nomu",
    meaning: "Minum",
    group: 1,
    forms: {
      masu: "飲みます",
      te: "飲んで",
      ta: "飲んだ",
      nai: "飲まない"
    }
  },
  {
    dictionary: "話す",
    reading: "はなす",
    romaji: "hanasu",
    meaning: "Berbicara",
    group: 1,
    forms: {
      masu: "話します",
      te: "話して",
      ta: "話した",
      nai: "話さない"
    }
  },
  {
    dictionary: "待つ",
    reading: "まつ",
    romaji: "matsu",
    meaning: "Menunggu",
    group: 1,
    forms: {
      masu: "待ちます",
      te: "待って",
      ta: "待った",
      nai: "待たない"
    }
  },
  {
    dictionary: "買う",
    reading: "かう",
    romaji: "kau",
    meaning: "Membeli",
    group: 1,
    forms: {
      masu: "買います",
      te: "買って",
      ta: "買った",
      nai: "買わない"
    }
  },
  {
    dictionary: "読む",
    reading: "よむ",
    romaji: "yomu",
    meaning: "Membaca",
    group: 1,
    forms: {
      masu: "読みます",
      te: "読んで",
      ta: "読んだ",
      nai: "読まない"
    }
  },
  {
    dictionary: "泳ぐ",
    reading: "およぐ",
    romaji: "oyogu",
    meaning: "Berenang",
    group: 1,
    forms: {
      masu: "泳ぎます",
      te: "泳いで",
      ta: "泳いだ",
      nai: "泳がない"
    }
  },
  {
    dictionary: "遊ぶ",
    reading: "あそぶ",
    romaji: "asobu",
    meaning: "Bermain",
    group: 1,
    forms: {
      masu: "遊びます",
      te: "遊んで",
      ta: "遊んだ",
      nai: "遊ばない"
    }
  },
  {
    dictionary: "帰る",
    reading: "かえる",
    romaji: "kaeru",
    meaning: "Pulang",
    group: 1,
    forms: {
      masu: "帰ります",
      te: "帰って",
      ta: "帰った",
      nai: "帰らない"
    }
  },

  // Group 2 (Ru-verbs)
  {
    dictionary: "食べる",
    reading: "たべる",
    romaji: "taberu",
    meaning: "Makan",
    group: 2,
    forms: {
      masu: "食べます",
      te: "食べて",
      ta: "食べた",
      nai: "食べない"
    }
  },
  {
    dictionary: "見る",
    reading: "みる",
    romaji: "miru",
    meaning: "Melihat",
    group: 2,
    forms: {
      masu: "見ます",
      te: "見て",
      ta: "見た",
      nai: "見ない"
    }
  },
  {
    dictionary: "寝る",
    reading: "ねる",
    romaji: "neru",
    meaning: "Tidur",
    group: 2,
    forms: {
      masu: "寝ます",
      te: "寝て",
      ta: "寝た",
      nai: "寝ない"
    }
  },
  {
    dictionary: "起きる",
    reading: "おきる",
    romaji: "okiru",
    meaning: "Bangun",
    group: 2,
    forms: {
      masu: "起きます",
      te: "起きて",
      ta: "起きた",
      nai: "起きない"
    }
  },
  {
    dictionary: "教える",
    reading: "おしえる",
    romaji: "oshieru",
    meaning: "Mengajar",
    group: 2,
    forms: {
      masu: "教えます",
      te: "教えて",
      ta: "教えた",
      nai: "教えない"
    }
  },

  // Group 3 (Irregular)
  {
    dictionary: "する",
    reading: "する",
    romaji: "suru",
    meaning: "Melakukan",
    group: 3,
    forms: {
      masu: "します",
      te: "して",
      ta: "した",
      nai: "しない"
    }
  },
  {
    dictionary: "来る",
    reading: "くる",
    romaji: "kuru",
    meaning: "Datang",
    group: 3,
    forms: {
      masu: "来ます",
      te: "来て",
      ta: "来た",
      nai: "来ない"
    }
  },
  {
    dictionary: "勉強する",
    reading: "べんきょうする",
    romaji: "benkyousuru",
    meaning: "Belajar",
    group: 3,
    forms: {
      masu: "勉強します",
      te: "勉強して",
      ta: "勉強した",
      nai: "勉強しない"
    }
  },
  // --- ADDITIONAL U-VERBS ---
  {
    dictionary: "書く",
    reading: "かく",
    romaji: "kaku",
    meaning: "Menulis",
    group: 1,
    forms: {
      masu: "書きます",
      te: "書いて",
      ta: "書いた",
      nai: "書かない"
    }
  },
  {
    dictionary: "聞く",
    reading: "きく",
    romaji: "kiku",
    meaning: "Mendengar / Bertanya",
    group: 1,
    forms: {
      masu: "聞きます",
      te: "聞いて",
      ta: "聞いた",
      nai: "聞かない"
    }
  },
  {
    dictionary: "歩く",
    reading: "あるく",
    romaji: "aruku",
    meaning: "Berjalan",
    group: 1,
    forms: {
      masu: "歩きます",
      te: "歩いて",
      ta: "歩いた",
      nai: "歩かない"
    }
  },
  {
    dictionary: "働く",
    reading: "はたらく",
    romaji: "hataraku",
    meaning: "Bekerja",
    group: 1,
    forms: {
      masu: "働きます",
      te: "働いて",
      ta: "働いた",
      nai: "働かない"
    }
  },
  {
    dictionary: "急ぐ",
    reading: "いそぐ",
    romaji: "isogu",
    meaning: "Bergegas / Buru-buru",
    group: 1,
    forms: {
      masu: "急ぎます",
      te: "急いで",
      ta: "急いだ",
      nai: "急がない"
    }
  },
  {
    dictionary: "死ぬ",
    reading: "しぬ",
    romaji: "shinu",
    meaning: "Mati",
    group: 1,
    forms: {
      masu: "死にます",
      te: "死んで",
      ta: "死んだ",
      nai: "死なない"
    }
  },
  {
    dictionary: "飛ぶ",
    reading: "とぶ",
    romaji: "tobu",
    meaning: "Terbang",
    group: 1,
    forms: {
      masu: "飛びます",
      te: "飛んで",
      ta: "飛んだ",
      nai: "飛ばない"
    }
  },
  {
    dictionary: "呼ぶ",
    reading: "よぶ",
    romaji: "yobu",
    meaning: "Memanggil",
    group: 1,
    forms: {
      masu: "呼びます",
      te: "呼んで",
      ta: "呼んだ",
      nai: "呼ばない"
    }
  },
  {
    dictionary: "休む",
    reading: "やすむ",
    romaji: "yasumu",
    meaning: "Beristirahat / Libur",
    group: 1,
    forms: {
      masu: "休みます",
      te: "休んで",
      ta: "休んだ",
      nai: "休まない"
    }
  },
  {
    dictionary: "住む",
    reading: "すむ",
    romaji: "sumu",
    meaning: "Tinggal / Menetap",
    group: 1,
    forms: {
      masu: "住みます",
      te: "住んで",
      ta: "住んだ",
      nai: "住まない"
    }
  },
  {
    dictionary: "座る",
    reading: "すわる",
    romaji: "suwaru",
    meaning: "Duduk",
    group: 1,
    forms: {
      masu: "座ります",
      te: "座って",
      ta: "座った",
      nai: "座らない"
    }
  },
  {
    dictionary: "作る",
    reading: "つくる",
    romaji: "tsukuru",
    meaning: "Membuat",
    group: 1,
    forms: {
      masu: "作ります",
      te: "作って",
      ta: "作った",
      nai: "作らない"
    }
  },
  {
    dictionary: "乗る",
    reading: "のる",
    romaji: "noru",
    meaning: "Naik (Kendaraan)",
    group: 1,
    forms: {
      masu: "乗ります",
      te: "乗って",
      ta: "乗った",
      nai: "乗らない"
    }
  },
  {
    dictionary: "頑張る",
    reading: "がんばる",
    romaji: "ganbaru",
    meaning: "Berusaha keras",
    group: 1,
    forms: {
      masu: "頑張ります",
      te: "頑張って",
      ta: "頑張った",
      nai: "頑張らない"
    }
  },
  {
    dictionary: "会う",
    reading: "あう",
    romaji: "au",
    meaning: "Bertemu",
    group: 1,
    forms: {
      masu: "会います",
      te: "会って",
      ta: "会った",
      nai: "会わない"
    }
  },
  {
    dictionary: "洗う",
    reading: "あらう",
    romaji: "arau",
    meaning: "Mencuci",
    group: 1,
    forms: {
      masu: "洗います",
      te: "洗って",
      ta: "洗った",
      nai: "洗わない"
    }
  },
  {
    dictionary: "歌う",
    reading: "うたう",
    romaji: "utau",
    meaning: "Menyanyi",
    group: 1,
    forms: {
      masu: "歌います",
      te: "歌って",
      ta: "歌った",
      nai: "歌わない"
    }
  },

  // --- ADDITIONAL RU-VERBS ---
  {
    dictionary: "開ける",
    reading: "あける",
    romaji: "akeru",
    meaning: "Membuka",
    group: 2,
    forms: {
      masu: "開けます",
      te: "開けて",
      ta: "開けた",
      nai: "開けない"
    }
  },
  {
    dictionary: "閉める",
    reading: "しめる",
    romaji: "shimeru",
    meaning: "Menutup",
    group: 2,
    forms: {
      masu: "閉めます",
      te: "閉めて",
      ta: "閉めた",
      nai: "閉めない"
    }
  },
  {
    dictionary: "始める",
    reading: "はじめる",
    romaji: "hajimeru",
    meaning: "Memulai",
    group: 2,
    forms: {
      masu: "始めます",
      te: "始めて",
      ta: "始めた",
      nai: "始めない"
    }
  },
  {
    dictionary: "忘れる",
    reading: "わすれる",
    romaji: "wasureru",
    meaning: "Lupa",
    group: 2,
    forms: {
      masu: "忘れます",
      te: "忘れて",
      ta: "忘れた",
      nai: "忘れない"
    }
  },
  {
    dictionary: "覚える",
    reading: "おぼえる",
    romaji: "oboeru",
    meaning: "Mengingat / Menghafal",
    group: 2,
    forms: {
      masu: "覚えます",
      te: "覚えて",
      ta: "覚えた",
      nai: "覚えない"
    }
  },
  {
    dictionary: "借りる",
    reading: "かりる",
    romaji: "kariru",
    meaning: "Meminjam",
    group: 2,
    forms: {
      masu: "借ります",
      te: "借りて",
      ta: "借りた",
      nai: "借りない"
    }
  },
  {
    dictionary: "降りる",
    reading: "おりる",
    romaji: "oriru",
    meaning: "Turun (Kendaraan)",
    group: 2,
    forms: {
      masu: "降ります",
      te: "降りて",
      ta: "降りた",
      nai: "降りない"
    }
  },

  // --- ADDITIONAL IRREGULAR VERBS ---
  {
    dictionary: "買い物する",
    reading: "かいものする",
    romaji: "kaimonosuru",
    meaning: "Berbelanja",
    group: 3,
    forms: {
      masu: "買い物します",
      te: "買い物して",
      ta: "買い物した",
      nai: "買い物しない"
    }
  },
  {
    dictionary: "掃除する",
    reading: "そうじする",
    romaji: "soujisuru",
    meaning: "Membersihkan",
    group: 3,
    forms: {
      masu: "掃除します",
      te: "掃除して",
      ta: "掃除した",
      nai: "掃除しない"
    }
  },
  {
    dictionary: "料理する",
    reading: "りょうりする",
    romaji: "ryourisuru",
    meaning: "Memasak",
    group: 3,
    forms: {
      masu: "料理します",
      te: "料理して",
      ta: "料理した",
      nai: "料理しない"
    }
  }
];
