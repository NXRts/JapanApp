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
    passive: string;  // 食べられる
    causative: string;// 食べさせる
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
      te: "行って",
      ta: "行った",
      nai: "行かない",
      passive: "行かれる",
      causative: "行かせる"
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
      nai: "飲まない",
      passive: "飲まれる",
      causative: "飲ませる"
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
      nai: "話さない",
      passive: "話される",
      causative: "話させる"
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
      nai: "待たない",
      passive: "待たれる",
      causative: "待たせる"
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
      nai: "買わない",
      passive: "買われる",
      causative: "買わせる"
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
      nai: "読まない",
      passive: "読まれる",
      causative: "読ませる"
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
      nai: "泳がない",
      passive: "泳がれる",
      causative: "泳がせる"
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
      nai: "遊ばない",
      passive: "遊ばれる",
      causative: "遊ばせる"
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
      nai: "帰らない",
      passive: "帰られる",
      causative: "帰らせる"
    }
  },
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
      nai: "書かない",
      passive: "書かれる",
      causative: "書かせる"
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
      nai: "聞かない",
      passive: "聞かれる",
      causative: "聞かせる"
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
      nai: "歩かない",
      passive: "歩かれる",
      causative: "歩かせる"
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
      nai: "働かない",
      passive: "働かれる",
      causative: "働かせる"
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
      nai: "急がない",
      passive: "急がれる",
      causative: "急がせる"
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
      nai: "死なない",
      passive: "死なれる",
      causative: "死なせる"
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
      nai: "飛ばない",
      passive: "飛ばれる",
      causative: "飛ばせる"
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
      nai: "呼ばない",
      passive: "呼ばれる",
      causative: "呼ばせる"
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
      nai: "休まない",
      passive: "休まれる",
      causative: "休ませる"
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
      nai: "住まない",
      passive: "住まれる",
      causative: "住ませる"
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
      nai: "座らない",
      passive: "座られる",
      causative: "座らせる"
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
      nai: "作らない",
      passive: "作られる",
      causative: "作らせる"
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
      nai: "乗らない",
      passive: "乗られる",
      causative: "乗らせる"
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
      nai: "頑張らない",
      passive: "頑張られる",
      causative: "頑張らせる"
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
      nai: "会わない",
      passive: "会われる",
      causative: "会わせる"
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
      nai: "洗わない",
      passive: "洗われる",
      causative: "洗わせる"
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
      nai: "歌わない",
      passive: "歌われる",
      causative: "歌わせる"
    }
  },

  // --- ADDITIONAL RU-VERBS ---
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
      nai: "食べない",
      passive: "食べられる",
      causative: "食べさせる"
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
      nai: "見ない",
      passive: "見られる",
      causative: "見させる"
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
      nai: "寝ない",
      passive: "寝られる",
      causative: "寝させる"
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
      nai: "起きない",
      passive: "起きられる",
      causative: "起きさせる"
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
      nai: "教えない",
      passive: "教えられる",
      causative: "教えさせる"
    }
  },
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
      nai: "開けない",
      passive: "開けられる",
      causative: "開けさせる"
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
      nai: "閉めない",
      passive: "閉められる",
      causative: "閉めさせる"
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
      nai: "始めない",
      passive: "始められる",
      causative: "始めさせる"
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
      nai: "忘れない",
      passive: "忘れられる",
      causative: "忘れさせる"
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
      nai: "覚えない",
      passive: "覚えられる",
      causative: "覚えさせる"
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
      nai: "借りない",
      passive: "借りられる",
      causative: "借りさせる"
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
      nai: "降りない",
      passive: "降りられる",
      causative: "降りさせる"
    }
  },

  // --- ADDITIONAL IRREGULAR VERBS ---
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
      nai: "しない",
      passive: "される",
      causative: "させる"
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
      nai: "来ない",
      passive: "来られる",
      causative: "来させる"
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
      nai: "勉強しない",
      passive: "勉強される",
      causative: "勉強させる"
    }
  },
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
      nai: "買い物しない",
      passive: "買い物される",
      causative: "買い物させる"
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
      nai: "掃除しない",
      passive: "掃除される",
      causative: "掃除させる"
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
      nai: "料理しない",
      passive: "料理される",
      causative: "料理させる"
    }
  }
];
