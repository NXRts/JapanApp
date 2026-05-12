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
    meaning: "To eat",
    category: "verb",
    example: {
      japanese: "朝ごはんを食べます。",
      romaji: "Asagohan o tabemasu.",
      english: "I eat breakfast."
    }
  },
  {
    id: "v-n5-nomu",
    level: "N5",
    word: "飲む",
    reading: "のむ",
    romaji: "nomu",
    meaning: "To drink",
    category: "verb",
    example: {
      japanese: "水を飲みます。",
      romaji: "Mizu o nomimasu.",
      english: "I drink water."
    }
  },
  {
    id: "v-n5-iku",
    level: "N5",
    word: "行く",
    reading: "いく",
    romaji: "iku",
    meaning: "To go",
    category: "verb",
    example: {
      japanese: "学校へ行きます。",
      romaji: "Gakkou e ikimasu.",
      english: "I go to school."
    }
  },
  {
    id: "v-n5-kuru",
    level: "N5",
    word: "来る",
    reading: "くる",
    romaji: "kuru",
    meaning: "To come",
    category: "verb",
    example: {
      japanese: "友達がうちに来ます。",
      romaji: "Tomodachi ga uchi ni kimasu.",
      english: "A friend is coming to my house."
    }
  },
  {
    id: "v-n5-suru",
    level: "N5",
    word: "する",
    reading: "する",
    romaji: "suru",
    meaning: "To do",
    category: "verb",
    example: {
      japanese: "週末にテニスをします。",
      romaji: "Shuumatsu ni tenisu o shimasu.",
      english: "I play tennis on weekends."
    }
  },
  {
    id: "v-n5-watashi",
    level: "N5",
    word: "私",
    reading: "わたし",
    romaji: "watashi",
    meaning: "I / Me",
    category: "noun",
    example: {
      japanese: "私は学生です。",
      romaji: "Watashi wa gakusei desu.",
      english: "I am a student."
    }
  },
  {
    id: "v-n5-hito",
    level: "N5",
    word: "人",
    reading: "ひと",
    romaji: "hito",
    meaning: "Person",
    category: "noun",
    example: {
      japanese: "あの人は誰ですか。",
      romaji: "Ano hito wa dare desu ka.",
      english: "Who is that person?"
    }
  },
  {
    id: "v-n5-hon",
    level: "N5",
    word: "本",
    reading: "ほん",
    romaji: "hon",
    meaning: "Book",
    category: "noun",
    example: {
      japanese: "図書館で本を借ります。",
      romaji: "Toshokan de hon o karimasu.",
      english: "I borrow books from the library."
    }
  },
  {
    id: "v-n5-jikan",
    level: "N5",
    word: "時間",
    reading: "じかん",
    romaji: "jikan",
    meaning: "Time",
    category: "noun",
    example: {
      japanese: "時間がありません。",
      romaji: "Jikan ga arimasen.",
      english: "There is no time."
    }
  },
  {
    id: "v-n5-ie",
    level: "N5",
    word: "家",
    reading: "いえ",
    romaji: "ie",
    meaning: "House",
    category: "noun",
    example: {
      japanese: "私の家は大きいです。",
      romaji: "Watashi no ie wa ookii desu.",
      english: "My house is big."
    }
  },
  {
    id: "v-n5-takai",
    level: "N5",
    word: "高い",
    reading: "たかい",
    romaji: "takai",
    meaning: "Tall / Expensive",
    category: "adjective",
    example: {
      japanese: "このカバンは高いです。",
      romaji: "Kono kaban wa takai desu.",
      english: "This bag is expensive."
    }
  },
  {
    id: "v-n5-yasui",
    level: "N5",
    word: "安い",
    reading: "やすい",
    romaji: "yasui",
    meaning: "Cheap",
    category: "adjective",
    example: {
      japanese: "あのレストランは安くて美味しいです。",
      romaji: "Ano resutoran wa yasukute oishii desu.",
      english: "That restaurant is cheap and delicious."
    }
  },
  {
    id: "v-n5-ookii",
    level: "N5",
    word: "大きい",
    reading: "おおきい",
    romaji: "ookii",
    meaning: "Big",
    category: "adjective",
    example: {
      japanese: "大きいりんごを買いました。",
      romaji: "Ookii ringo o kaimashita.",
      english: "I bought a big apple."
    }
  },
  {
    id: "v-n5-chiisai",
    level: "N5",
    word: "小さい",
    reading: "ちいさい",
    romaji: "chiisai",
    meaning: "Small",
    category: "adjective",
    example: {
      japanese: "小さい犬がいます。",
      romaji: "Chiisai inu ga imasu.",
      english: "There is a small dog."
    }
  },
  {
    id: "v-n5-atarashii",
    level: "N5",
    word: "新しい",
    reading: "あたらしい",
    romaji: "atarashii",
    meaning: "New",
    category: "adjective",
    example: {
      japanese: "新しい靴が欲しいです。",
      romaji: "Atarashii kutsu ga hoshii desu.",
      english: "I want new shoes."
    }
  },
  {
    id: "v-n5-furui",
    level: "N5",
    word: "古い",
    reading: "ふるい",
    romaji: "furui",
    meaning: "Old",
    category: "adjective",
    example: {
      japanese: "これは古い車です。",
      romaji: "Kore wa furui kuruma desu.",
      english: "This is an old car."
    }
  },
  {
    id: "v-n5-totemo",
    level: "N5",
    word: "とても",
    reading: "とても",
    romaji: "totemo",
    meaning: "Very",
    category: "adverb",
    example: {
      japanese: "今日はとても暑いです。",
      romaji: "Kyou wa totemo atsui desu.",
      english: "It is very hot today."
    }
  },
  {
    id: "v-n5-sukoshi",
    level: "N5",
    word: "少し",
    reading: "すこし",
    romaji: "sukoshi",
    meaning: "A little",
    category: "adverb",
    example: {
      japanese: "日本語が少しわかります。",
      romaji: "Nihongo ga sukoshi wakarimasu.",
      english: "I understand a little Japanese."
    }
  },
  {
    id: "v-n5-yoku",
    level: "N5",
    word: "よく",
    reading: "よく",
    romaji: "yoku",
    meaning: "Often / Well",
    category: "adverb",
    example: {
      japanese: "私はよく映画を見ます。",
      romaji: "Watashi wa yoku eiga o mimasu.",
      english: "I often watch movies."
    }
  },
  {
    id: "v-n5-itsumo",
    level: "N5",
    word: "いつも",
    reading: "いつも",
    romaji: "itsumo",
    meaning: "Always",
    category: "adverb",
    example: {
      japanese: "彼はいつも元気です。",
      romaji: "Kare wa itsumo genki desu.",
      english: "He is always energetic."
    }
  },
  {
    id: "v-n5-okiru",
    level: "N5",
    word: "起きる",
    reading: "おきる",
    romaji: "okiru",
    meaning: "To wake up",
    category: "verb",
    example: {
      japanese: "毎朝六時に起きます。",
      romaji: "Maiasa rokuji ni okimasu.",
      english: "I wake up at six every morning."
    }
  },
  {
    id: "v-n5-neru",
    level: "N5",
    word: "寝る",
    reading: "ねる",
    romaji: "neru",
    meaning: "To sleep",
    category: "verb",
    example: {
      japanese: "夜十時に寝ます。",
      romaji: "Yoru juuji ni nemasu.",
      english: "I go to sleep at ten at night."
    }
  },
  {
    id: "v-n5-hanasu",
    level: "N5",
    word: "話す",
    reading: "はなす",
    romaji: "hanasu",
    meaning: "To speak",
    category: "verb",
    example: {
      japanese: "友達と日本語で話します。",
      romaji: "Tomodachi to Nihongo de hanashimasu.",
      english: "I speak with my friend in Japanese."
    }
  },
  {
    id: "v-n5-kiku",
    level: "N5",
    word: "聞く",
    reading: "きく",
    romaji: "kiku",
    meaning: "To listen / To ask",
    category: "verb",
    example: {
      japanese: "先生に質問を聞きます。",
      romaji: "Sensei ni shitsumon o kikimasu.",
      english: "I ask the teacher a question."
    }
  },
  {
    id: "v-n5-yomu",
    level: "N5",
    word: "読む",
    reading: "よむ",
    romaji: "yomu",
    meaning: "To read",
    category: "verb",
    example: {
      japanese: "毎晩本を読みます。",
      romaji: "Maiban hon o yomimasu.",
      english: "I read books every night."
    }
  },
  {
    id: "v-n5-kaku",
    level: "N5",
    word: "書く",
    reading: "かく",
    romaji: "kaku",
    meaning: "To write",
    category: "verb",
    example: {
      japanese: "ノートに漢字を書きます。",
      romaji: "Nooto ni kanji o kakimasu.",
      english: "I write kanji in my notebook."
    }
  },
  {
    id: "v-n5-inu",
    level: "N5",
    word: "犬",
    reading: "いぬ",
    romaji: "inu",
    meaning: "Dog",
    category: "noun",
    example: {
      japanese: "可愛い犬がいます。",
      romaji: "Kawaii inu ga imasu.",
      english: "There is a cute dog."
    }
  },
  {
    id: "v-n5-neko",
    level: "N5",
    word: "猫",
    reading: "ねこ",
    romaji: "neko",
    meaning: "Cat",
    category: "noun",
    example: {
      japanese: "私は猫が好きです。",
      romaji: "Watashi wa neko ga suki desu.",
      english: "I like cats."
    }
  },
  {
    id: "v-n5-mizu",
    level: "N5",
    word: "水",
    reading: "みず",
    romaji: "mizu",
    meaning: "Water",
    category: "noun",
    example: {
      japanese: "冷たい水を飲みます。",
      romaji: "Tsumetai mizu o nomimasu.",
      english: "I drink cold water."
    }
  },
  {
    id: "v-n5-ocha",
    level: "N5",
    word: "お茶",
    reading: "おちゃ",
    romaji: "ocha",
    meaning: "Green tea",
    category: "noun",
    example: {
      japanese: "温かいお茶をどうぞ。",
      romaji: "Atatakai ocha o douzo.",
      english: "Please, have some warm tea."
    }
  },
  {
    id: "v-n5-ringo",
    level: "N5",
    word: "りんご",
    reading: "りんご",
    romaji: "ringo",
    meaning: "Apple",
    category: "noun",
    example: {
      japanese: "りんごを三つ買いました。",
      romaji: "Ringo o mittsu kaimashita.",
      english: "I bought three apples."
    }
  },
  {
    id: "v-n5-mikan",
    level: "N5",
    word: "みかん",
    reading: "みかん",
    romaji: "mikan",
    meaning: "Mandarin orange",
    category: "noun",
    example: {
      japanese: "みかんが美味しいです。",
      romaji: "Mikan ga oishii desu.",
      english: "Mandarin oranges are delicious."
    }
  },
  {
    id: "v-n5-eiga",
    level: "N5",
    word: "映画",
    reading: "えいが",
    romaji: "eiga",
    meaning: "Movie",
    category: "noun",
    example: {
      japanese: "週末に映画を見ます。",
      romaji: "Shuumatsu ni eiga o mimasu.",
      english: "I watch movies on weekends."
    }
  },
  {
    id: "v-n5-tomodachi",
    level: "N5",
    word: "友達",
    reading: "ともだち",
    romaji: "tomodachi",
    meaning: "Friend",
    category: "noun",
    example: {
      japanese: "友達と一緒に遊びます。",
      romaji: "Tomodachi to issho ni asobimasu.",
      english: "I play together with my friend."
    }
  },
  {
    id: "v-n5-gakkou",
    level: "N5",
    word: "学校",
    reading: "がっこう",
    romaji: "gakkou",
    meaning: "School",
    category: "noun",
    example: {
      japanese: "明日、学校が休みです。",
      romaji: "Ashita, gakkou ga yasumi desu.",
      english: "Tomorrow, school is out."
    }
  },
  {
    id: "v-n5-sensei",
    level: "N5",
    word: "先生",
    reading: "せんせい",
    romaji: "sensei",
    meaning: "Teacher",
    category: "noun",
    example: {
      japanese: "山田先生は優しいです。",
      romaji: "Yamada sensei wa yasashii desu.",
      english: "Mr. Yamada is kind."
    }
  },
  {
    id: "v-n5-atsui",
    level: "N5",
    word: "暑い",
    reading: "あつい",
    romaji: "atsui",
    meaning: "Hot (weather)",
    category: "adjective",
    example: {
      japanese: "今日はとても暑いです。",
      romaji: "Kyou wa totemo atsui desu.",
      english: "It is very hot today."
    }
  },
  {
    id: "v-n5-samui",
    level: "N5",
    word: "寒い",
    reading: "さむい",
    romaji: "samui",
    meaning: "Cold (weather)",
    category: "adjective",
    example: {
      japanese: "冬は寒いです。",
      romaji: "Fuyu wa samui desu.",
      english: "Winter is cold."
    }
  },
  {
    id: "v-n5-oishii",
    level: "N5",
    word: "美味しい",
    reading: "おいしい",
    romaji: "oishii",
    meaning: "Delicious",
    category: "adjective",
    example: {
      japanese: "このケーキは美味しいです。",
      romaji: "Kono keeki wa oishii desu.",
      english: "This cake is delicious."
    }
  },
  {
    id: "v-n5-tanoshii",
    level: "N5",
    word: "楽しい",
    reading: "たのしい",
    romaji: "tanoshii",
    meaning: "Fun / Enjoyable",
    category: "adjective",
    example: {
      japanese: "パーティーは楽しかったです。",
      romaji: "Paatii wa tanoshikatta desu.",
      english: "The party was fun."
    }
  },
  {
    id: "v-n5-getsuyoubi",
    level: "N5",
    word: "月曜日",
    reading: "げつようび",
    romaji: "getsuyoubi",
    meaning: "Monday",
    category: "noun",
    example: {
      japanese: "月曜日は忙しいです。",
      romaji: "Getsuyoubi wa isogashii desu.",
      english: "I am busy on Mondays."
    }
  },
  {
    id: "v-n5-kayoubi",
    level: "N5",
    word: "火曜日",
    reading: "かようび",
    romaji: "kayoubi",
    meaning: "Tuesday",
    category: "noun",
    example: {
      japanese: "火曜日にテストがあります。",
      romaji: "Kayoubi ni tesuto ga arimasu.",
      english: "There is a test on Tuesday."
    }
  },
  {
    id: "v-n5-suiyoubi",
    level: "N5",
    word: "水曜日",
    reading: "すいようび",
    romaji: "suiyoubi",
    meaning: "Wednesday",
    category: "noun",
    example: {
      japanese: "水曜日は休みです。",
      romaji: "Suiyoubi wa yasumi desu.",
      english: "Wednesday is a holiday."
    }
  },
  {
    id: "v-n5-mokuyoubi",
    level: "N5",
    word: "木曜日",
    reading: "もくようび",
    romaji: "mokuyoubi",
    meaning: "Thursday",
    category: "noun",
    example: {
      japanese: "木曜日に映画を見ます。",
      romaji: "Mokuyoubi ni eiga o mimasu.",
      english: "I watch movies on Thursdays."
    }
  },
  {
    id: "v-n5-kinyoubi",
    level: "N5",
    word: "金曜日",
    reading: "きんようび",
    romaji: "kinyoubi",
    meaning: "Friday",
    category: "noun",
    example: {
      japanese: "金曜日の夜は楽しいです。",
      romaji: "Kinyoubi no yoru wa tanoshii desu.",
      english: "Friday nights are fun."
    }
  },
  {
    id: "v-n5-doyoubi",
    level: "N5",
    word: "土曜日",
    reading: "どようび",
    romaji: "doyoubi",
    meaning: "Saturday",
    category: "noun",
    example: {
      japanese: "土曜日に買い物をします。",
      romaji: "Doyoubi ni kaimono o shimasu.",
      english: "I go shopping on Saturdays."
    }
  },
  {
    id: "v-n5-nichiyoubi",
    level: "N5",
    word: "日曜日",
    reading: "にちようび",
    romaji: "nichiyoubi",
    meaning: "Sunday",
    category: "noun",
    example: {
      japanese: "日曜日は家にいます。",
      romaji: "Nichiyoubi wa ie ni imasu.",
      english: "I am at home on Sundays."
    }
  },
  {
    id: "v-n5-kyou",
    level: "N5",
    word: "今日",
    reading: "きょう",
    romaji: "kyou",
    meaning: "Today",
    category: "noun",
    example: {
      japanese: "今日は天気がいいです。",
      romaji: "Kyou wa tenki ga ii desu.",
      english: "The weather is nice today."
    }
  },
  {
    id: "v-n5-ashita",
    level: "N5",
    word: "明日",
    reading: "あした",
    romaji: "ashita",
    meaning: "Tomorrow",
    category: "noun",
    example: {
      japanese: "明日は雨です。",
      romaji: "Ashita wa ame desu.",
      english: "It will rain tomorrow."
    }
  },
  {
    id: "v-n5-kinou",
    level: "N5",
    word: "昨日",
    reading: "きのう",
    romaji: "kinou",
    meaning: "Yesterday",
    category: "noun",
    example: {
      japanese: "昨日は疲れました。",
      romaji: "Kinou wa tsukaremashita.",
      english: "I felt tired yesterday."
    }
  },
  {
    id: "v-n5-asa",
    level: "N5",
    word: "朝",
    reading: "あさ",
    romaji: "asa",
    meaning: "Morning",
    category: "noun",
    example: {
      japanese: "毎朝コーヒーを飲みます。",
      romaji: "Maiasa koohii o nomimasu.",
      english: "I drink coffee every morning."
    }
  },
  {
    id: "v-n5-hiru",
    level: "N5",
    word: "昼",
    reading: "ひる",
    romaji: "hiru",
    meaning: "Afternoon / Noon",
    category: "noun",
    example: {
      japanese: "昼に友達と会います。",
      romaji: "Hiru ni tomodachi to aimasu.",
      english: "I meet a friend at noon."
    }
  },
  {
    id: "v-n5-yoru",
    level: "N5",
    word: "夜",
    reading: "よる",
    romaji: "yoru",
    meaning: "Night / Evening",
    category: "noun",
    example: {
      japanese: "夜は勉強します。",
      romaji: "Yoru wa benkyou shimasu.",
      english: "I study at night."
    }
  },
  {
    id: "v-n5-chichi",
    level: "N5",
    word: "父",
    reading: "ちち",
    romaji: "chichi",
    meaning: "Father",
    category: "noun",
    example: {
      japanese: "父は会社員です。",
      romaji: "Chichi wa kaishain desu.",
      english: "My father is an office worker."
    }
  },
  {
    id: "v-n5-haha",
    level: "N5",
    word: "母",
    reading: "はは",
    romaji: "haha",
    meaning: "Mother",
    category: "noun",
    example: {
      japanese: "母は料理が上手です。",
      romaji: "Haha wa ryouri ga jouzu desu.",
      english: "My mother is good at cooking."
    }
  },
  {
    id: "v-n5-ani",
    level: "N5",
    word: "兄",
    reading: "あに",
    romaji: "ani",
    meaning: "Older brother",
    category: "noun",
    example: {
      japanese: "兄は東京にいます。",
      romaji: "Ani wa Toukyou ni imasu.",
      english: "My older brother is in Tokyo."
    }
  },
  {
    id: "v-n5-ane",
    level: "N5",
    word: "姉",
    reading: "あね",
    romaji: "ane",
    meaning: "Older sister",
    category: "noun",
    example: {
      japanese: "姉は大学生です。",
      romaji: "Ane wa daigakusei desu.",
      english: "My older sister is a college student."
    }
  },
  {
    id: "v-n5-otouto",
    level: "N5",
    word: "弟",
    reading: "おとうと",
    romaji: "otouto",
    meaning: "Younger brother",
    category: "noun",
    example: {
      japanese: "弟は元気です。",
      romaji: "Otouto wa genki desu.",
      english: "My younger brother is energetic."
    }
  },
  {
    id: "v-n5-imouto",
    level: "N5",
    word: "妹",
    reading: "いもうと",
    romaji: "imouto",
    meaning: "Younger sister",
    category: "noun",
    example: {
      japanese: "妹はとても可愛いです。",
      romaji: "Imouto wa totemo kawaii desu.",
      english: "My younger sister is very cute."
    }
  },
  {
    id: "v-n5-otoosan",
    level: "N5",
    word: "お父さん",
    reading: "おとうさん",
    romaji: "otousan",
    meaning: "Father (polite)",
    category: "noun",
    example: {
      japanese: "お父さんはお元気ですか。",
      romaji: "Otousan wa ogenki desu ka.",
      english: "Is your father well?"
    }
  },
  {
    id: "v-n5-okaasan",
    level: "N5",
    word: "お母さん",
    reading: "おかあさん",
    romaji: "okaasan",
    meaning: "Mother (polite)",
    category: "noun",
    example: {
      japanese: "山田さんのお母さんに会いました。",
      romaji: "Yamada-san no okaasan ni aimashita.",
      english: "I met Mr. Yamada's mother."
    }
  },
  {
    id: "v-n5-migi",
    level: "N5",
    word: "右",
    reading: "みぎ",
    romaji: "migi",
    meaning: "Right",
    category: "noun",
    example: {
      japanese: "右へ曲がってください。",
      romaji: "Migi e magatte kudasai.",
      english: "Please turn right."
    }
  },
  {
    id: "v-n5-hidari",
    level: "N5",
    word: "左",
    reading: "ひだり",
    romaji: "hidari",
    meaning: "Left",
    category: "noun",
    example: {
      japanese: "銀行の左に郵便局があります。",
      romaji: "Ginkou no hidari ni yuubinkyoku ga arimasu.",
      english: "There is a post office to the left of the bank."
    }
  },
  {
    id: "v-n5-mae",
    level: "N5",
    word: "前",
    reading: "まえ",
    romaji: "mae",
    meaning: "Front / Before",
    category: "noun",
    example: {
      japanese: "駅の前にタクシーがいます。",
      romaji: "Eki no mae ni takushii ga imasu.",
      english: "There is a taxi in front of the station."
    }
  },
  {
    id: "v-n5-ushiro",
    level: "N5",
    word: "後ろ",
    reading: "うしろ",
    romaji: "ushiro",
    meaning: "Behind / Back",
    category: "noun",
    example: {
      japanese: "私の後ろに山田さんがいます。",
      romaji: "Watashi no ushiro ni Yamada-san ga imasu.",
      english: "Mr. Yamada is behind me."
    }
  },
  {
    id: "v-n5-naka",
    level: "N5",
    word: "中",
    reading: "なか",
    romaji: "naka",
    meaning: "Inside",
    category: "noun",
    example: {
      japanese: "鞄の中に本があります。",
      romaji: "Kaban no naka ni hon ga arimasu.",
      english: "There is a book inside the bag."
    }
  },
  {
    id: "v-n5-soto",
    level: "N5",
    word: "外",
    reading: "そと",
    romaji: "soto",
    meaning: "Outside",
    category: "noun",
    example: {
      japanese: "外は寒いです。",
      romaji: "Soto wa samui desu.",
      english: "It is cold outside."
    }
  },
  {
    id: "v-n5-ue",
    level: "N5",
    word: "上",
    reading: "うえ",
    romaji: "ue",
    meaning: "Up / Above",
    category: "noun",
    example: {
      japanese: "机の上に時計があります。",
      romaji: "Tsukue no ue ni tokei ga arimasu.",
      english: "There is a clock on the desk."
    }
  },
  {
    id: "v-n5-shita",
    level: "N5",
    word: "下",
    reading: "した",
    romaji: "shita",
    meaning: "Down / Below",
    category: "noun",
    example: {
      japanese: "テーブルの下に猫がいます。",
      romaji: "Teeburu no shita ni neko ga imasu.",
      english: "There is a cat under the table."
    }
  },
  {
    id: "v-n5-aka",
    level: "N5",
    word: "赤",
    reading: "あか",
    romaji: "aka",
    meaning: "Red",
    category: "noun",
    example: {
      japanese: "赤が好きです。",
      romaji: "Aka ga suki desu.",
      english: "I like red."
    }
  },
  {
    id: "v-n5-ao",
    level: "N5",
    word: "青",
    reading: "あお",
    romaji: "ao",
    meaning: "Blue",
    category: "noun",
    example: {
      japanese: "空は青いです。",
      romaji: "Sora wa aoi desu.",
      english: "The sky is blue."
    }
  },
  {
    id: "v-n5-shiro",
    level: "N5",
    word: "白",
    reading: "しろ",
    romaji: "shiro",
    meaning: "White",
    category: "noun",
    example: {
      japanese: "白い車を買いました。",
      romaji: "Shiroi kuruma o kaimashita.",
      english: "I bought a white car."
    }
  },
  {
    id: "v-n5-kuro",
    level: "N5",
    word: "黒",
    reading: "くろ",
    romaji: "kuro",
    meaning: "Black",
    category: "noun",
    example: {
      japanese: "黒い猫がいます。",
      romaji: "Kuroi neko ga imasu.",
      english: "There is a black cat."
    }
  },
  {
    id: "v-n5-kau",
    level: "N5",
    word: "買う",
    reading: "かう",
    romaji: "kau",
    meaning: "To buy",
    category: "verb",
    example: {
      japanese: "デパートで靴を買います。",
      romaji: "Depaato de kutsu o kaimasu.",
      english: "I buy shoes at the department store."
    }
  },
  {
    id: "v-n5-matsu",
    level: "N5",
    word: "待つ",
    reading: "まつ",
    romaji: "matsu",
    meaning: "To wait",
    category: "verb",
    example: {
      japanese: "駅で友達を待ちます。",
      romaji: "Eki de tomodachi o machimasu.",
      english: "I wait for my friend at the station."
    }
  },
  {
    id: "v-n5-wakaru",
    level: "N5",
    word: "分かる",
    reading: "わかる",
    romaji: "wakaru",
    meaning: "To understand",
    category: "verb",
    example: {
      japanese: "日本語が少し分かります。",
      romaji: "Nihongo ga sukoshi wakarimasu.",
      english: "I understand a little Japanese."
    }
  },
  {
    id: "v-n5-shiru",
    level: "N5",
    word: "知る",
    reading: "しる",
    romaji: "shiru",
    meaning: "To know",
    category: "verb",
    example: {
      japanese: "彼の電話番号を知っていますか。",
      romaji: "Kare no denwabangou o shitte imasu ka.",
      english: "Do you know his phone number?"
    }
  },
  {
    id: "v-n5-tsukuru",
    level: "N5",
    word: "作る",
    reading: "つくる",
    romaji: "tsukuru",
    meaning: "To make",
    category: "verb",
    example: {
      japanese: "母がケーキを作りました。",
      romaji: "Haha ga keeki o tsukurimashita.",
      english: "My mother made a cake."
    }
  },
  {
    id: "v-n5-au",
    level: "N5",
    word: "会う",
    reading: "あう",
    romaji: "au",
    meaning: "To meet",
    category: "verb",
    example: {
      japanese: "明日、先生に会います。",
      romaji: "Ashita, sensei ni aimasu.",
      english: "Tomorrow, I will meet the teacher."
    }
  },
  {
    id: "v-n5-noru",
    level: "N5",
    word: "乗る",
    reading: "のる",
    romaji: "noru",
    meaning: "To ride / To get on",
    category: "verb",
    example: {
      japanese: "バスに乗ります。",
      romaji: "Basu ni norimasu.",
      english: "I get on the bus."
    }
  },
  {
    id: "v-n5-oriru",
    level: "N5",
    word: "降りる",
    reading: "おりる",
    romaji: "oriru",
    meaning: "To get off",
    category: "verb",
    example: {
      japanese: "次の駅で降ります。",
      romaji: "Tsugi no eki de orimasu.",
      english: "I will get off at the next station."
    }
  },
  {
    id: "v-n5-yasumu",
    level: "N5",
    word: "休む",
    reading: "やすむ",
    romaji: "yasumu",
    meaning: "To rest / To take a day off",
    category: "verb",
    example: {
      japanese: "少し休みましょう。",
      romaji: "Sukoshi yasumimashou.",
      english: "Let's take a short rest."
    }
  },
  {
    id: "v-n5-ii",
    level: "N5",
    word: "いい",
    reading: "いい",
    romaji: "ii",
    meaning: "Good / Nice",
    category: "adjective",
    example: {
      japanese: "今日はいい天気です。",
      romaji: "Kyou wa ii tenki desu.",
      english: "The weather is nice today."
    }
  },
  {
    id: "v-n5-warui",
    level: "N5",
    word: "悪い",
    reading: "わるい",
    romaji: "warui",
    meaning: "Bad",
    category: "adjective",
    example: {
      japanese: "天気が悪いです。",
      romaji: "Tenki ga warui desu.",
      english: "The weather is bad."
    }
  },
  {
    id: "v-n5-nagai",
    level: "N5",
    word: "長い",
    reading: "ながい",
    romaji: "nagai",
    meaning: "Long",
    category: "adjective",
    example: {
      japanese: "彼女の髪は長いです。",
      romaji: "Kanojo no kami wa nagai desu.",
      english: "Her hair is long."
    }
  },
  {
    id: "v-n5-mijikai",
    level: "N5",
    word: "短い",
    reading: "みじかい",
    romaji: "mijikai",
    meaning: "Short",
    category: "adjective",
    example: {
      japanese: "短い手紙を書きました。",
      romaji: "Mijikai tegami o kakimashita.",
      english: "I wrote a short letter."
    }
  },
  {
    id: "v-n5-hayai",
    level: "N5",
    word: "早い",
    reading: "はやい",
    romaji: "hayai",
    meaning: "Fast / Early",
    category: "adjective",
    example: {
      japanese: "日本の新幹線は速いです。",
      romaji: "Nihon no shinkansen wa hayai desu.",
      english: "The Japanese Shinkansen is fast."
    }
  },
  {
    id: "v-n5-osoi",
    level: "N5",
    word: "遅い",
    reading: "おそい",
    romaji: "osoi",
    meaning: "Slow / Late",
    category: "adjective",
    example: {
      japanese: "夜遅くに電話しました。",
      romaji: "Yoru osoku ni denwa shimashita.",
      english: "I called late at night."
    }
  },
  {
    id: "v-n5-kirei",
    level: "N5",
    word: "綺麗",
    reading: "きれい",
    romaji: "kirei",
    meaning: "Beautiful / Clean",
    category: "adjective",
    example: {
      japanese: "この花はとてもきれいです。",
      romaji: "Kono hana wa totemo kirei desu.",
      english: "This flower is very beautiful."
    }
  },
  {
    id: "v-n5-shizuka",
    level: "N5",
    word: "静か",
    reading: "しずか",
    romaji: "shizuka",
    meaning: "Quiet / Peaceful",
    category: "adjective",
    example: {
      japanese: "図書館は静かです。",
      romaji: "Toshokan wa shizuka desu.",
      english: "The library is quiet."
    }
  },
  {
    id: "v-n5-nigiyaka",
    level: "N5",
    word: "賑やか",
    reading: "にぎやか",
    romaji: "nigiyaka",
    meaning: "Lively / Busy",
    category: "adjective",
    example: {
      japanese: "この町はいつも賑やかです。",
      romaji: "Kono machi wa itsumo nigiyaka desu.",
      english: "This town is always lively."
    }
  },
  {
    id: "v-n5-benri",
    level: "N5",
    word: "便利",
    reading: "べんり",
    romaji: "benri",
    meaning: "Convenient / Handy",
    category: "adjective",
    example: {
      japanese: "スマートフォンはとても便利です。",
      romaji: "Sumatofon wa totemo benri desu.",
      english: "Smartphones are very convenient."
    }
  }
];
