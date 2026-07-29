import { GrammarPoint } from "@/data/jlpt/types";

export const n2Grammar: GrammarPoint[] = [
  {
    id: "ni-tsuite",
    level: "N2",
    title: "〜について (ni tsuite)",
    meaning: "About / Concerning",
    structure: "Noun + について",
    explanation:
      "Used when talking, thinking, or investigating a topic. Equivalent to 'about' in English.",
    examples: [
      {
        japanese: "日本の歴史について調べています。",
        romaji: "Nihon no rekishi ni tsuite shirabete imasu.",
        english: "I am investigating Japanese history.",
      },
    ],
  },
  {
    id: "ni-kanshite",
    level: "N2",
    title: "〜に関して (ni kanshite)",
    meaning: "Regarding / Related to",
    structure: "Noun + に関して",
    explanation:
      "Similar to について (ni tsuite) but more formal and often used in written texts, business, or official announcements.",
    examples: [
      {
        japanese: "この問題に関して、ご意見はありませんか。",
        romaji: "Kono mondai ni kanshite, go-iken wa arimasen ka.",
        english: "Regarding this problem, are there any opinions?",
      },
    ],
  },
  {
    id: "ue-de",
    level: "N2",
    title: "〜上で (ue de)",
    meaning: "Upon (doing ...) / After ...",
    structure: "Verb (Ta) / Noun+の + 上で",
    explanation:
      "Indicates a condition or process that must be passed first. Often used in situations where the first stage is a prerequisite for making a decision or action in the second stage.",
    examples: [
      {
        japanese: "家族と相談した上で、お返事いたします。",
        romaji: "Kazoku to soudan shita ue de, ohenji itashimasu.",
        english: "I will reply after consulting with my family.",
      },
      {
        japanese: "内容をご確認の上で、サインをお願いします。",
        romaji: "Naiyou o gokakunin no ue de, sain o onegai shimasu.",
        english: "Please sign after checking the contents.",
      },
    ],
  },
  {
    id: "ni-sotte",
    level: "N2",
    title: "〜に沿って (ni sotte)",
    meaning: "Along / In accordance with (guidelines)",
    structure: "Noun + に沿って",
    explanation:
      "Means parallel or following the flow of something (like a road, river). In an abstract sense, it means acting in compliance or accordance with expectations, manuals, plans, policies.",
    examples: [
      {
        japanese: "川に沿って桜の木が植えられている。",
        romaji: "Kawa ni sotte sakura no ki ga uerarete iru.",
        english: "Cherry blossom trees are planted along the river.",
      },
      {
        japanese: "マニュアルに沿って作業を進めてください。",
        romaji: "Manyuaru ni sotte sagyou o susumete kudasai.",
        english: "Please proceed with the work in accordance with the manual.",
      },
    ],
  },
  {
    id: "beki-da",
    level: "N2",
    title: "〜べきだ (beki da)",
    meaning: "Should / Ought to",
    structure: "Verb (Dictionary form) + べきだ",
    explanation:
      "Contains an element of moral, ethical obligation, or common sense that something is 'indeed appropriate' to do. Stronger than 〜ほうがいい.",
    examples: [
      {
        japanese: "約束は守るべきだ。",
        romaji: "Yakusoku wa mamoru beki da.",
        english: "A promise should be kept.",
      },
      {
        japanese: "学生はもっと勉強すべきだ。",
        romaji: "Gakusei wa motto benkyou subeki da.",
        english: "Students should study harder.",
      },
    ],
  },
  {
    id: "kiri",
    level: "N2",
    title: "〜きり / っきり (kiri)",
    meaning: "Only / Ever since (unchanged)",
    structure: "Verb (Ta) / Noun + きり",
    explanation:
      "1) Expresses 'only' (strong limitation). 2) Something remains unchanged since the last event (often followed by the connotation that the expected result never happened).",
    examples: [
      {
        japanese: "彼に会ったのは、10年前に一度きりです。",
        romaji: "Kare ni atta no wa, juunen mae ni ichido kiri desu.",
        english: "I have only met him once, 10 years ago.",
      },
      {
        japanese: "息子は朝出かけたきり、まだ帰ってこない。",
        romaji: "Musuko wa asa dekaketa kiri, mada kaette konai.",
        english:
          "Ever since my son went out this morning, he hasn't returned yet.",
      },
    ],
  },
  {
    id: "gachi",
    level: "N2",
    title: "〜がち (gachi)",
    meaning: "Tend to / Often (negative connotation)",
    structure: "Noun / Verb (Masu-stem) + がち",
    explanation:
      "A tendency to be in a certain condition, or an action that often happens easily, often used to imply a complaint or warning.",
    examples: [
      {
        japanese: "私は最近、忘れ物をしがちだ。",
        romaji: "Watashi wa saikin, wasuremono o shigachi da.",
        english: "Lately, I often forget my things.",
      },
      {
        japanese: "曇りがちの天気が続いています。",
        romaji: "Kumorigachi no tenki ga tsudzuite imasu.",
        english: "The weather, which tends to be cloudy, is continuing.",
      },
    ],
  },
  {
    id: "ni-tsurete",
    level: "N2",
    title: "〜につれて (ni tsurete)",
    meaning: "As... / Along with",
    structure: "Verb Dictionary form / Noun Verbal + につれて",
    explanation:
      "Shows gradual and proportional change. As condition A changes, thing B also changes simultaneously.",
    examples: [
      {
        japanese: "年を取るにつれて、記憶力が悪くなる。",
        romaji: "Toshi o toru ni tsurete, kiokuryoku ga waruku naru.",
        english: "As you get older, your memory decreases.",
      },
    ],
  },
  {
    id: "ni-shite-wa",
    level: "N2",
    title: "〜にしては (ni shite wa)",
    meaning: "Considering that... / For a...",
    structure: "Noun / Verb Biasa + にしては",
    explanation:
      "Expresses surprise because the reality is different from the standard expectations usually attached to something.",
    examples: [
      {
        japanese: "彼は外国人にしては、日本語がとても上手だ。",
        romaji: "Kare wa gaikokujin ni shite wa, Nihongo ga totemo jouzu da.",
        english: "For a foreigner, his Japanese is very skillful.",
      },
      {
        japanese: "初めて作ったにしては、美味しいですね。",
        romaji: "Hajimete tsukutta ni shite wa, oishii desu ne.",
        english:
          "Considering it's your first time cooking, it's delicious, isn't it?",
      },
    ],
  },
  {
    id: "sai-ni",
    level: "N2",
    title: "〜際に (sai ni)",
    meaning: "On the occasion of / When",
    structure: "Verb (Dictionary form/Ta) / Noun+の + 際に",
    explanation:
      "Exactly the same as 〜時 (toki) but with a much more formal tone. Usually used in written announcements, manuals, or public voice announcements.",
    examples: [
      {
        japanese: "お降りの際は、お忘れ物のないようご注意ください。",
        romaji: "Oorino sai wa, owasuremono no nai you gochuui kudasai.",
        english:
          "When getting off, please be careful not to leave any belongings behind.",
      },
    ],
  },
  {
    id: "to-tomo-ni",
    level: "N2",
    title: "〜とともに (to tomo ni)",
    meaning: "Along with / At the same time",
    structure: "Verb Dictionary form / Noun + とともに",
    explanation:
      "Used when two changes or events occur in parallel at the same time, or can also mean 'A and B (simultaneously)'.",
    examples: [
      {
        japanese: "春の訪れとともに、花が咲き始めた。",
        romaji: "Haru no otozure to tomo ni, hana ga sakihajimeta.",
        english: "Along with the arrival of spring, flowers began to bloom.",
      },
    ],
  },
  {
    id: "monoka",
    level: "N2",
    title: "〜ものか (mono ka)",
    meaning: "No way... / Not at all...",
    structure: "Verb Biasa / Sifat / Noun + ものか",
    explanation:
      "A strong rejection, showing the speaker's emotion that they strictly will not do something or consider something impossible.",
    examples: [
      {
        japanese: "あんな店、二度と行くものか。",
        romaji: "Anna mise, nido to iku mono ka.",
        english: "No way I'm going to a (bad) shop like that twice!",
      },
      {
        japanese: "疲れるものか。まだまだ大丈夫だ。",
        romaji: "Tsukareru mono ka. Mada mada daijoubu da.",
        english: "No way I'm tired. I'm still doing fine.",
      },
    ],
  },
  {
    id: "igai",
    level: "N2",
    title: "〜以外 (igai)",
    meaning: "Except / Other than",
    structure: "Noun + 以外",
    explanation:
      "Expresses an exception. 'Except for this, everything else is...' or 'Besides this'.",
    examples: [
      {
        japanese: "日曜日以外は、毎日働いています。",
        romaji: "Nichiyoubi igai wa, mainichi hataraite imasu.",
        english: "Other than Sundays, I work every day.",
      },
    ],
  },
  {
    id: "nuki-de",
    level: "N2",
    title: "〜抜きで (nuki de)",
    meaning: "Without...",
    structure: "Noun + 抜きで",
    explanation:
      "Something that is usually or properly present/involved, but is intentionally removed or not included.",
    examples: [
      {
        japanese: "冗談抜きで、真面目に話しましょう。",
        romaji: "Joudan nuki de, majime ni hanashimashou.",
        english: "Jokes aside, let's talk seriously.",
      },
      {
        japanese: "わさび抜きのお寿司をお願いします。",
        romaji: "Wasabi nuki no osushi o onegai shimasu.",
        english: "I'll have sushi without wasabi, please.",
      },
    ],
  },
  {
    id: "koso",
    level: "N2",
    title: "〜こそ (koso)",
    meaning: "Precisely / Especially",
    structure: "Noun + こそ",
    explanation:
      "Gives a very strong emphasis on the preceding word, eliminating other possibilities.",
    examples: [
      {
        japanese: "こちらこそ、よろしくお願いします。",
        romaji: "Kochira koso, yoroshiku onegai shimasu.",
        english:
          "The pleasure is all mine (it is precisely me who should say so).",
      },
      {
        japanese: "今年こそ、N2に合格したい。",
        romaji: "Kotoshi koso, N2 ni goukaku shitai.",
        english:
          "This year for sure (without failing again), I want to pass N2.",
      },
    ],
  },
  {
    id: "bakari-ka",
    level: "N2",
    title: "〜ばかりか (bakari ka)",
    meaning: "Not only..., but also...",
    structure: "Bentuk Biasa + ばかりか",
    explanation:
      "Emphasizes that in addition to thing A (which might be bad or good), even thing B is added, strengthening its degree (adding an element of admiration or negative surprise).",
    examples: [
      {
        japanese: "このレストランは安いばかりか、とても美味しい。",
        romaji: "Kono resutoran wa yasui bakari ka, totemo oishii.",
        english: "This restaurant is not only cheap, but also very delicious.",
      },
    ],
  },
  {
    id: "karaniwa",
    level: "N2",
    title: "〜からには (kara ni wa)",
    meaning: "Now that... / Since...",
    structure: "Verb (Dictionary form/Ta) + からには",
    explanation:
      "Expresses a responsibility or strong intention, 'since a situation has already occurred, naturally one must (take a strong action)'",
    examples: [
      {
        japanese: "やると決めたからには、最後まで頑張ります。",
        romaji: "Yaru to kimeta kara ni wa, saigo made ganbarimasu.",
        english: "Since I've decided to do it, I'll do my best until the end.",
      },
    ],
  },
  {
    id: "wari-ni",
    level: "N2",
    title: "〜わりに (wari ni)",
    meaning: "For a... / Considering...",
    structure: "Bentuk Biasa / Noun+の + わりに",
    explanation:
      "Similar to にしては, states that the result is out of proportion to the basic conditions.",
    examples: [
      {
        japanese: "彼はたくさん食べるわりに、太らない。",
        romaji: "Kare wa takusan taberu wari ni, futoranai.",
        english: "Considering how much he eats, he doesn't get fat.",
      },
    ],
  },
  {
    id: "gimi-n2",
    level: "N2",
    title: "〜気味 (gimi)",
    meaning: "Feeling a bit... / Agak... (Negative tendency)",
    structure: "Noun / Verb (Masu-stem) + 気味",
    explanation:
      "Expresses that someone has symptoms or feels prone to a certain physical/mental state, usually with a negative connotation or being out of the ordinary.",
    examples: [
      {
        japanese: "最近、少し疲れ気味です。",
        romaji: "Saikin, sukoshi tsukaregimi desu.",
        english: "Lately, I've been feeling a bit exhausted.",
      },
    ],
  },
  {
    id: "kuse-ni",
    level: "N2",
    title: "〜くせに (kuse ni)",
    meaning: "Despite / Even though... (Blaming tone)",
    structure: "Bentuk Biasa + くせに",
    explanation:
      "States a contradictory sentence ('even though / despite') accompanied by feelings of criticism, belittling, or blaming others.",
    examples: [
      {
        japanese: "知らないくせに、何でも知っているように話す。",
        romaji: "Shiranai kuse ni, nandemo shitte iru you ni hanasu.",
        english:
          "Even though he doesn't know, he talks as if he knows everything.",
      },
    ],
  },
  {
    id: "to-i-nagara",
    level: "N2",
    title: "〜と言いながら (to ii nagara)",
    meaning: "Despite saying that... (reality is different)",
    structure: "Plain Form / Quote Sentence + と言いながら",
    explanation:
      "Describes a clear contradiction between what someone says and their direct actions.",
    examples: [
      {
        japanese: "ダイエットすると言いながら、またケーキを食べている。",
        romaji: "Daietto suru to ii nagara, mata keeki o tabete iru.",
        english:
          "Even though (just now) he said he's on a diet, he's eating cake again.",
      },
    ],
  },
  {
    id: "ni-sugimai",
    level: "N2",
    title: "〜に過ぎない (ni suginai)",
    meaning: "Merely / Nothing more than...",
    structure: "Bentuk Biasa / Noun + に過ぎない",
    explanation:
      "Emphasizes that it's not something big or excessive, but 'merely' like that. Used to downplay something that might be considered large.",
    examples: [
      {
        japanese: "それは私の推測に過ぎない。",
        romaji: "Sore wa watashi no suisoku ni suginai.",
        english: "It's merely my guess (nothing more).",
      },
      {
        japanese: "彼はただの社員に過ぎないのに、偉そうだ。",
        romaji: "Kare wa tada no shain ni suginai noni, erasou da.",
        english:
          "Even though he's merely a regular employee, he's very arrogant.",
      },
    ],
  },
  {
    id: "ue-ni",
    level: "N2",
    title: "〜上に (ue ni)",
    meaning: "In addition to / Not only",
    structure: "Bentuk Biasa (Adjective/Noun+の) + 上に",
    explanation:
      "Adds an extra point, often having the same polarity (good added with good, bad added with bad).",
    examples: [
      {
        japanese: "彼は頭がいい上に、性格も優しい。",
        romaji: "Kare wa atama ga ii ue ni, seikaku mo yasashii.",
        english: "Besides being smart, he is also kind-hearted.",
      },
    ],
  },
  {
    id: "kagiri",
    level: "N2",
    title: "〜限り (kagiri)",
    meaning: "As long as / To the extent that",
    structure: "Verb (Dictionary form/Te-iru/Ta) + 限り",
    explanation:
      "Sets a limit, where as long as condition A is met then B will continue.",
    examples: [
      {
        japanese: "私がいきている限り、この会社は潰させない。",
        romaji: "Watashi ga ikite iru kagiri, kono kaisha wa tsubusasenai.",
        english:
          "As long as I am alive, I will not let this company go bankrupt.",
      },
    ],
  },
  {
    id: "nikaetai",
    level: "N2",
    title: "〜に代えて (ni kaete)",
    meaning: "Representing / In place of",
    structure: "Noun + に代えて",
    explanation:
      "Used when the position of one party is taken over or the action normally done by A is represented by B. More formal than 'kawari ni'.",
    examples: [
      {
        japanese: "社長に代えて、私がご挨拶申し上げます。",
        romaji: "Shachou ni kaete, watashi ga goaisatsu moushiagemasu.",
        english: "Representing the director, I will deliver the greeting.",
      },
    ],
  },
];
