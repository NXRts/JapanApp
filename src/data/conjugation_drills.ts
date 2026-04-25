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
  }
];
