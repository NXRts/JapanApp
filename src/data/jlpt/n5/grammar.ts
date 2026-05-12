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
    explanation: "Used at the end of a sentence to show politeness (formal form) and to state identity, state, or facts about the subject.",
    examples: [
      {
        japanese: "私は学生です。",
        romaji: "Watashi wa gakusei desu.",
        english: "I am a student."
      },
      {
        japanese: "今日はいい天気です。",
        romaji: "Kyou wa ii tenki desu.",
        english: "Today's weather is good."
      }
    ]
  },
  {
    id: "dewa-arimasen",
    level: "N5",
    title: "〜ではありません (dewa arimasen)",
    meaning: "To not be (is not/am not/are not)",
    structure: "Noun / Na-Adjective + ではありません",
    explanation: "The negative form of 'desu' for nouns and na-adjectives. In daily conversation, it is often shortened to 'ja arimasen'.",
    examples: [
      {
        japanese: "私は先生ではありません。",
        romaji: "Watashi wa sensei dewa arimasen.",
        english: "I am not a teacher."
      },
      {
        japanese: "ここは静かじゃありません。",
        romaji: "Koko wa shizuka ja arimasen.",
        english: "It is not quiet here."
      }
    ]
  },
  {
    id: "wa-particle",
    level: "N5",
    title: "Partikel は (wa)",
    meaning: "Topic marker",
    structure: "Topik + は + Predikat",
    explanation: "The particle は (written 'ha' but pronounced 'wa') is used to mark the topic of a sentence. The topic is what is being talked about in the sentence.",
    examples: [
      {
        japanese: "これはペンです。",
        romaji: "Kore wa pen desu.",
        english: "This is a pen."
      },
      {
        japanese: "山田さんは先生です。",
        romaji: "Yamada-san wa sensei desu.",
        english: "Mr. Yamada is a teacher."
      }
    ]
  },
  {
    id: "masu",
    level: "N5",
    title: "〜ます (masu)",
    meaning: "Polite verb form",
    structure: "Kata Kerja (Bentuk Masu) + ます",
    explanation: "The suffix for formal/polite verb forms. Used to state positive actions happening now, habits, or future actions.",
    examples: [
      {
        japanese: "毎日りんごを食べます。",
        romaji: "Mainichi ringo o tabemasu.",
        english: "I eat apples every day."
      },
      {
        japanese: "明日学校へ行きます。",
        romaji: "Ashita gakkou e ikimasu.",
        english: "I will go to school tomorrow."
      }
    ]
  },
  {
    id: "masen",
    level: "N5",
    title: "〜ません (masen)",
    meaning: "Polite negative verb form",
    structure: "Kata Kerja (Bentuk Masu) + ません",
    explanation: "The negative form of 〜ます. Used to politely state that an action is not being performed (present/future).",
    examples: [
      {
        japanese: "私は肉を食べません。",
        romaji: "Watashi wa niku o tabemasen.",
        english: "I don't eat meat."
      },
      {
        japanese: "今日はテレビを見ません。",
        romaji: "Kyou wa terebi o mimasen.",
        english: "I won't watch TV today."
      }
    ]
  },
  {
    id: "mashita",
    level: "N5",
    title: "〜ました (mashita)",
    meaning: "Past polite verb form (Completed)",
    structure: "Kata Kerja (Bentuk Masu) + ました",
    explanation: "The polite past tense form for verbs. Used to state actions that have already happened or have been completed.",
    examples: [
      {
        japanese: "昨日、映画を見ました。",
        romaji: "Kinou, eiga o mimashita.",
        english: "Yesterday, I watched a movie."
      },
      {
        japanese: "今朝、６時に起きました。",
        romaji: "Kesa, rokuji ni okimashita.",
        english: "This morning, I woke up at 6."
      }
    ]
  },
  {
    id: "masen-deshita",
    level: "N5",
    title: "〜ませんでした (masen deshita)",
    meaning: "Past negative polite verb form",
    structure: "Kata Kerja (Bentuk Masu) + ませんでした",
    explanation: "The polite past negative form for verbs. It means an action was not performed in the past.",
    examples: [
      {
        japanese: "きのうは勉強しませんでした。",
        romaji: "Kinou wa benkyou shimasen deshita.",
        english: "Yesterday, I didn't study."
      },
      {
        japanese: "朝ご飯を食べませんでした。",
        romaji: "Asagohan o tabemasen deshita.",
        english: "I didn't eat breakfast."
      }
    ]
  },
  {
    id: "ni-particle-time",
    level: "N5",
    title: "Partikel に (Waktu)",
    meaning: "At (specific time)",
    structure: "Waktu Spesifik + に + Kata Kerja",
    explanation: "The particle に is used to indicate a specific point in time when an action occurs (such as hour, date, day, month). It is not used for relative time markers like 'today' or 'tomorrow'.",
    examples: [
      {
        japanese: "六時に起きます。",
        romaji: "Rokuji ni okimasu.",
        english: "I wake up at 6 o'clock."
      },
      {
        japanese: "日曜日に日本へ行きます。",
        romaji: "Nichiyoubi ni Nihon e ikimasu.",
        english: "I'm going to Japan on Sunday."
      }
    ]
  },
  {
    id: "ni-particle-destination",
    level: "N5",
    title: "Partikel に (Tujuan)",
    meaning: "To / For (Destination / Recipient)",
    structure: "Tempat/Orang + に + Kata Kerja Pindah/Memberi",
    explanation: "Indicates the destination of movement (going to...) or the direction of an action (giving to...).",
    examples: [
      {
        japanese: "会社に行きます。",
        romaji: "Kaisha ni ikimasu.",
        english: "I'm going to the company/office."
      },
      {
        japanese: "友達にプレゼントをあげます。",
        romaji: "Tomodachi ni purezento o agemasu.",
        english: "I give a present to my friend."
      }
    ]
  },
  {
    id: "e-particle",
    level: "N5",
    title: "Partikel へ (e)",
    meaning: "To (Direction of movement)",
    structure: "Tempat + へ + Kata Kerja Pergerakan (行く, 来る, 帰る)",
    explanation: "Similar to に for destination, but emphasizes the direction of movement more. Written as 'he' but pronounced 'e'.",
    examples: [
      {
        japanese: "東京へ行きます。",
        romaji: "Toukyou e ikimasu.",
        english: "I'm going (towards) Tokyo."
      },
      {
        japanese: "うちへ帰ります。",
        romaji: "Uchi e kaerimasu.",
        english: "I'm going home."
      }
    ]
  },
  {
    id: "o-particle",
    level: "N5",
    title: "Partikel を (o)",
    meaning: "Direct object marker",
    structure: "Objek + を + Kata Kerja Transitif",
    explanation: "The particle を (written 'wo' but pronounced 'o') is used to mark the direct object of an action verb (the object that receives the action).",
    examples: [
      {
        japanese: "水を飲みます。",
        romaji: "Mizu o nomimasu.",
        english: "I drink water."
      },
      {
        japanese: "本を読みました。",
        romaji: "Hon o yomimashita.",
        english: "I read a book."
      }
    ]
  },
  {
    id: "de-particle-place",
    level: "N5",
    title: "Partikel で (Tempat)",
    meaning: "At / In (Location of action)",
    structure: "Tempat + で + Kata Kerja Aksi",
    explanation: "Indicates the location where an activity or event takes place. Different from に which only shows the location of static existence.",
    examples: [
      {
        japanese: "レストランで晩ご飯を食べます。",
        romaji: "Resutoran de bangohan o tabemasu.",
        english: "I eat dinner at a restaurant."
      },
      {
        japanese: "図書館で勉強しました。",
        romaji: "Toshokan de benkyou shimashita.",
        english: "I studied at the library."
      }
    ]
  },
  {
    id: "de-particle-tool",
    level: "N5",
    title: "Partikel で (Alat / Metode)",
    meaning: "By means of / Using",
    structure: "Alat / Metode / Kendaraan + で",
    explanation: "Indicates the tool, means, or method used to perform an action.",
    examples: [
      {
        japanese: "バスで学校へ行きます。",
        romaji: "Basu de gakkou e ikimasu.",
        english: "I go to school by bus."
      },
      {
        japanese: "鉛筆で手紙を書きます。",
        romaji: "Enpitsu de tegami o kakimasu.",
        english: "I write a letter with a pencil."
      }
    ]
  },
  {
    id: "to-particle",
    level: "N5",
    title: "Partikel と (to)",
    meaning: "And / With",
    structure: "Kata Benda 1 + と + Kata Benda 2 (atau Bersama Orang + と)",
    explanation: "Can be used to combine objects ('and') specifically, or to show a companion in an activity ('together with').",
    examples: [
      {
        japanese: "犬と猫が好きです。",
        romaji: "Inu to neko ga suki desu.",
        english: "I like dogs and cats."
      },
      {
        japanese: "友達と映画を見ました。",
        romaji: "Tomodachi to eiga o mimashita.",
        english: "I watched a movie with a friend."
      }
    ]
  },
  {
    id: "mo-particle",
    level: "N5",
    title: "Partikel も (mo)",
    meaning: "Also / Too",
    structure: "Kata Benda + も",
    explanation: "Replaces the particle は, が, or を to state that something 'also' has the same property or performs the same action as what has been mentioned before.",
    examples: [
      {
        japanese: "私も学生です。",
        romaji: "Watashi mo gakusei desu.",
        english: "I am also a student."
      },
      {
        japanese: "りんごを買いました。みかんも買いました。",
        romaji: "Ringo o kaimashita. Mikan mo kaimashita.",
        english: "I bought an apple. I also bought an orange."
      }
    ]
  },
  {
    id: "ga-particle",
    level: "N5",
    title: "Partikel が (ga)",
    meaning: "Subject marker",
    structure: "Subjek + が + Predikat",
    explanation: "Unlike は which marks the old topic, が is used to mark new information (subject), or is used specifically with adjectives indicating like/dislike, skillful/unskillful, exist/not exist.",
    examples: [
      {
        japanese: "雨が降っています。",
        romaji: "Ame ga futte imasu.",
        english: "It's raining. (new fact)"
      },
      {
        japanese: "私は猫が好きです。",
        romaji: "Watashi wa neko ga suki desu.",
        english: "I (topic) like cats (specific subject)."
      }
    ]
  },
  {
    id: "arimasu-imasu",
    level: "N5",
    title: "あります / います",
    meaning: "There is / To exist",
    structure: "Benda/Orang + が + あります/います",
    explanation: "あります is used to state the existence of inanimate objects or plants. Whereas います is used for living things that can move on their own like humans and animals.",
    examples: [
      {
        japanese: "あそこに犬がいます。",
        romaji: "Asoko ni inu ga imasu.",
        english: "There is a dog over there."
      },
      {
        japanese: "机の上に本があります。",
        romaji: "Tsukue no ue ni hon ga arimasu.",
        english: "There is a book on the table."
      }
    ]
  },
  {
    id: "kara-made",
    level: "N5",
    title: "〜から 〜まで (kara - made)",
    meaning: "From ... To ...",
    structure: "Waktu/Tempat 1 + から + Waktu/Tempat 2 + まで",
    explanation: "Indicates the starting point (kara) and ending point (made) of time or geographical distance.",
    examples: [
      {
        japanese: "会議は９時から５時までです。",
        romaji: "Kaigi wa kuji kara goji made desu.",
        english: "The meeting is from 9 o'clock to 5 o'clock."
      },
      {
        japanese: "家から学校まで歩きます。",
        romaji: "Ie kara gakkou made arukimasu.",
        english: "I walk from home to school."
      }
    ]
  },
  {
    id: "te-kudasai",
    level: "N5",
    title: "〜てください (te kudasai)",
    meaning: "Please do...",
    structure: "Kata Kerja (Bentuk Te) + ください",
    explanation: "Used to ask someone to do something in a polite manner.",
    examples: [
      {
        japanese: "ここに名前を書いてください。",
        romaji: "Koko ni namae o kaite kudasai.",
        english: "Please write your name here."
      },
      {
        japanese: "ちょっと待ってください。",
        romaji: "Chotto matte kudasai.",
        english: "Please wait a moment."
      }
    ]
  },
  {
    id: "te-mo-ii-desu",
    level: "N5",
    title: "〜てもいいです (te mo ii desu)",
    meaning: "May do... (Permission)",
    structure: "Kata Kerja (Bentuk Te) + もいいです(か)",
    explanation: "Giving or asking for permission to do something. Add 'ka' at the end to ask 'May I...?'",
    examples: [
      {
        japanese: "写真を撮ってもいいですか。",
        romaji: "Shashin o totte mo ii desu ka.",
        english: "May I take a photo?"
      },
      {
        japanese: "はい、ここで休んでもいいです。",
        romaji: "Hai, koko de yasunde mo ii desu.",
        english: "Yes, you may rest here."
      }
    ]
  },
  {
    id: "te-wa-ikemasen",
    level: "N5",
    title: "〜てはいけません (te wa ikemasen)",
    meaning: "Must not do (Prohibition)",
    structure: "Kata Kerja (Bentuk Te) + はいけません",
    explanation: "Used to prohibit or indicate that an action is not allowed / strictly prohibited.",
    examples: [
      {
        japanese: "ここでタバコを吸ってはいけません。",
        romaji: "Koko de tabako o sutte wa ikemasen.",
        english: "Smoking is not allowed here."
      },
      {
        japanese: "危ないですから、入ってはいけません。",
        romaji: "Abunai desu kara, haitte wa ikemasen.",
        english: "Since it's dangerous, entering is not allowed."
      }
    ]
  },
  {
    id: "nai-de-kudasai",
    level: "N5",
    title: "〜ないでください (nai de kudasai)",
    meaning: "Please don't do...",
    structure: "Kata Kerja (Bentuk Nai) + でください",
    explanation: "A polite request for someone NOT to do something.",
    examples: [
      {
        japanese: "写真を撮らないでください。",
        romaji: "Shashin o toranaide kudasai.",
        english: "Please do not take photos."
      },
      {
        japanese: "心配しないでください。",
        romaji: "Shinpai shinaide kudasai.",
        english: "Please don't worry."
      }
    ]
  },
  {
    id: "tai-desu",
    level: "N5",
    title: "〜たいです (tai desu)",
    meaning: "Want to do...",
    structure: "Kata Kerja (Bentuk Masu dicoret) + たいです",
    explanation: "Expresses one's own desire to perform an action. Behaves like an i-adjective.",
    examples: [
      {
        japanese: "日本へ行きたいです。",
        romaji: "Nihon e ikitai desu.",
        english: "I want to go to Japan."
      },
      {
        japanese: "寿司が食べたいです。",
        romaji: "Sushi ga tabetai desu.",
        english: "I want to eat sushi."
      }
    ]
  },
  {
    id: "hoshii-desu",
    level: "N5",
    title: "〜がほしいです (ga hoshii desu)",
    meaning: "Want (something)",
    structure: "Kata Benda + がほしいです",
    explanation: "Expresses a desire for an inanimate object or something that can be possessed, not an action.",
    examples: [
      {
        japanese: "新しい車がほしいです。",
        romaji: "Atarashii kuruma ga hoshii desu.",
        english: "I want a new car."
      },
      {
        japanese: "時間とお金がほしいです。",
        romaji: "Jikan to okane ga hoshii desu.",
        english: "I want time and money."
      }
    ]
  },
  {
    id: "koto-ga-dekimasu",
    level: "N5",
    title: "〜ことができます (koto ga dekimasu)",
    meaning: "Can / Able to do",
    structure: "Kata Kerja (Bentuk Kamus) + ことができます",
    explanation: "A polite way to state ability or possibility to perform something.",
    examples: [
      {
        japanese: "私は日本語を少し話すことができます。",
        romaji: "Watashi wa Nihongo o sukoshi hanasu koto ga dekimasu.",
        english: "I can speak a little Japanese."
      },
      {
        japanese: "ここでチケットを買うことができます。",
        romaji: "Koko de chiketto o kau koto ga dekimasu.",
        english: "You can buy tickets here."
      }
    ]
  },
  {
    id: "tari-tari",
    level: "N5",
    title: "〜たり、〜たりします (tari, tari shimasu)",
    meaning: "Doing things like... and...",
    structure: "Kata Kerja 1 (Bentuk Ta) + り、Kata Kerja 2 (Bentuk Ta) + りします",
    explanation: "Used to list several examples of actions from many that are performed. It does not imply chronological order like the 'te' particle. The last verb is always followed by 'shimasu' (or 'shimashita' for the past).",
    examples: [
      {
        japanese: "週末は買い物をしたり、映画を見たりします。",
        romaji: "Shuumatsu wa kaimono o shitari, eiga o mitari shimasu.",
        english: "On weekends, I do things like shopping and watching movies."
      },
      {
        japanese: "昨日は本を読んだり、手紙を書いたりしました。",
        romaji: "Kinou wa hon o yondari, tegami o kaitari shimashita.",
        english: "Yesterday I read books, wrote letters, and so on."
      }
    ]
  },
  {
    id: "mae-ni",
    level: "N5",
    title: "〜前に (mae ni)",
    meaning: "Before...",
    structure: "Kata Kerja (Kamus) / Kata Benda + の / Waktu + 前に",
    explanation: "Used to indicate that an action is performed before another action or event occurs.",
    examples: [
      {
        japanese: "寝る前に、本を読みます。",
        romaji: "Neru mae ni, hon o yomimasu.",
        english: "Before going to sleep, I read a book."
      },
      {
        japanese: "食事の前に、手を洗います。",
        romaji: "Shokuji no mae ni, te o araimasu.",
        english: "Before eating, I wash my hands."
      }
    ]
  },
  {
    id: "ato-de",
    level: "N5",
    title: "〜後で (ato de)",
    meaning: "After...",
    structure: "Kata Kerja (Bentuk Ta) / Kata Benda + の + 後で",
    explanation: "Used to indicate that an action is performed after another action is completed. It is very important to remember that the verb uses the Ta-form (past) before 'ato de'.",
    examples: [
      {
        japanese: "勉強した後で、映画を見ます。",
        romaji: "Benkyou shita ato de, eiga o mimasu.",
        english: "After studying, I will watch a movie."
      },
      {
        japanese: "仕事の後で、飲みに行きましょう。",
        romaji: "Shigoto no ato de, nomi ni ikimashou.",
        english: "After work, let's go for a drink."
      }
    ]
  },
  {
    id: "kara-reason",
    level: "N5",
    title: "〜から (kara - Alasan)",
    meaning: "Because...",
    structure: "Kalimat Alasan + から、Kalimat Akibat",
    explanation: "Used to explain the reason. 'Kara' usually has a subjective nuance and is often used when persuading, commanding, or giving personal reasons.",
    examples: [
      {
        japanese: "忙しいですから、行きません。",
        romaji: "Isogashii desu kara, ikimasen.",
        english: "Since I am busy, I won't go."
      },
      {
        japanese: "明日テストがありますから、勉強します。",
        romaji: "Ashita tesuto ga arimasu kara, benkyou shimasu.",
        english: "Because there's a test tomorrow, I'll study."
      }
    ]
  },
  {
    id: "node",
    level: "N5",
    title: "〜ので (node)",
    meaning: "Because (Formal)",
    structure: "Bentuk Biasa (Na-adj/Noun + な) + ので",
    explanation: "Similar to 'kara', but 'node' is more objective and polite. Often used to explain facts or apologize formally.",
    examples: [
      {
        japanese: "雨が降っているので、試合は中止です。",
        romaji: "Ame ga futte iru node, shiai wa chuushi desu.",
        english: "Since it's raining (objective fact), the match is cancelled."
      },
      {
        japanese: "日曜日なので、銀行は休みです。",
        romaji: "Nichiyoubi na node, ginkou wa yasumi desu.",
        english: "Since (it's) Sunday, the bank is closed."
      }
    ]
  },
  {
    id: "tsumori-n5",
    level: "N5",
    title: "〜つもりです (tsumori desu)",
    meaning: "Intend / Plan to",
    structure: "Kata Kerja (Bentuk Kamus / Nai) + つもりです",
    explanation: "Used to state a plan or strong intention of the speaker that has been decided beforehand.",
    examples: [
      {
        japanese: "来年、日本へ行くつもりです。",
        romaji: "Rainen, Nihon e iku tsumori desu.",
        english: "Next year, I intend to go to Japan."
      },
      {
        japanese: "今日は出かけないつもりです。",
        romaji: "Kyou wa dekakenai tsumori desu.",
        english: "Today I intend not to go out."
      }
    ]
  }
];
