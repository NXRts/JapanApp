import { GrammarPoint } from "../n5/grammar";

export const n4Grammar: GrammarPoint[] = [
  {
    id: "te-iru",
    level: "N4",
    title: "〜ている (te iru)",
    meaning: "Doing / State of continuation",
    structure: "Verb (Te-form) + いる",
    explanation:
      "Has two main meanings: 1) Expresses an ongoing action (present continuous). 2) Expresses a state that is the result of a past action and still continues.",
    examples: [
      {
        japanese: "今、本を読んでいます。",
        romaji: "Ima, hon o yonde imasu.",
        english: "I am reading a book now.",
      },
      {
        japanese: "結婚しています。",
        romaji: "Kekkon shite imasu.",
        english: "I am (in the state of being) married.",
      },
    ],
  },
  {
    id: "ta-koto-ga-aru",
    level: "N4",
    title: "〜たことがある",
    meaning: "Have done before (Experience)",
    structure: "Verb (Ta-form) + ことがある",
    explanation:
      "Used to talk about past experiences. Means 'have done something'. Not used for routine actions.",
    examples: [
      {
        japanese: "日本へ行ったことがあります。",
        romaji: "Nihon e itta koto ga arimasu.",
        english: "I have been to Japan before.",
      },
      {
        japanese: "お寿司を食べたことがありません。",
        romaji: "Osushi o tabeta koto ga arimasen.",
        english: "I have never eaten sushi.",
      },
    ],
  },
  {
    id: "tsumori",
    level: "N4",
    title: "〜つもり (tsumori)",
    meaning: "Intend / Plan to",
    structure: "Verb (Dictionary form / Nai) + つもりです",
    explanation:
      "Used to express a strong intention or plan decided beforehand. Usually not used to ask the intentions of superiors.",
    examples: [
      {
        japanese: "来年、日本へ行くつもりです。",
        romaji: "Rainen, Nihon e iku tsumori desu.",
        english: "Next year, I intend/plan to go to Japan.",
      },
      {
        japanese: "今日は出かけないつもりです。",
        romaji: "Kyou wa dekakenai tsumori desu.",
        english: "I have no plans to go out today.",
      },
    ],
  },
  {
    id: "yotei",
    level: "N4",
    title: "〜予定 (yotei)",
    meaning: "Schedule / Plan",
    structure: "Verb (Dictionary form) / Noun + の + 予定です",
    explanation:
      "Used to express a fixed plan or schedule that has been set (usually objectively or formally).",
    examples: [
      {
        japanese: "明日は会議の予定です。",
        romaji: "Ashita wa kaigi no yotei desu.",
        english: "There is a meeting planned for tomorrow.",
      },
      {
        japanese: "来月、出張する予定です。",
        romaji: "Raigetsu, shucchou suru yotei desu.",
        english: "I am scheduled to go on a business trip next month.",
      },
    ],
  },
  {
    id: "te-shimau",
    level: "N4",
    title: "〜てしまう (te shimau)",
    meaning: "Completed / Unintentional (regret)",
    structure: "Verb (Te-form) + しまう / しまいました",
    explanation:
      "Expresses two things: 1) Completing an action entirely. 2) Regret over something that happened unintentionally.",
    examples: [
      {
        japanese: "この本はもう読んでしまいました。",
        romaji: "Kono hon wa mou yonde shimaimashita.",
        english: "I have already finished reading this book.",
      },
      {
        japanese: "パスポートを忘れてしまいました。",
        romaji: "Pasupooto o wasurete shimaimashita.",
        english: "Oh no, I (accidentally) forgot my passport.",
      },
    ],
  },
  {
    id: "te-oku",
    level: "N4",
    title: "〜ておく (te oku)",
    meaning: "Do in preparation",
    structure: "Verb (Te-form) + おく / おきます",
    explanation:
      "Performing an action as preparation for the future, or leaving something in its current state.",
    examples: [
      {
        japanese: "パーティーの前に、飲み物を買っておきます。",
        romaji: "Paatii no mae ni, nomimono o katte okimasu.",
        english: "Before the party, I will buy some drinks (as preparation).",
      },
      {
        japanese: "窓は開けておいてください。",
        romaji: "Mado wa akete oite kudasai.",
        english: "Please leave the window open (as it is).",
      },
    ],
  },
  {
    id: "sou-desu-hearsay",
    level: "N4",
    title: "〜そうです (sou desu - Hearsay)",
    meaning: "I heard / It is said that",
    structure: "Bentuk Biasa (Dictionary form/Ta/Nai) + そうです",
    explanation:
      "Used to convey information heard from another source (rumor/hearsay). The source is often marked with 〜によると (according to...).",
    examples: [
      {
        japanese: "天気予報によると、明日は雨だそうです。",
        romaji: "Tenki yohou ni yoru to, ashita wa ame da sou desu.",
        english:
          "According to the weather forecast, they say it will rain tomorrow.",
      },
      {
        japanese: "山田さんは結婚したそうです。",
        romaji: "Yamada-san wa kekkon shita sou desu.",
        english: "I heard that Mr. Yamada got married.",
      },
    ],
  },
  {
    id: "sou-desu-appearance",
    level: "N4",
    title: "〜そうです (sou desu - Appearance)",
    meaning: "Looks like / Appears to be",
    structure: "Verb (Masu-stem) / Adjective (i stem) + そうです",
    explanation:
      "Expresses a guess or impression captured by the eyes (visual). Different from hearsay form which uses the plain form.",
    examples: [
      {
        japanese: "このケーキはおいしそうです。",
        romaji: "Kono keeki wa oishisou desu.",
        english: "This cake looks delicious.",
      },
      {
        japanese: "雨が降りそうです。",
        romaji: "Ame ga furisou desu.",
        english: "It looks like it's going to rain.",
      },
    ],
  },
  {
    id: "sugiru",
    level: "N4",
    title: "〜すぎる (sugiru)",
    meaning: "Too much / Excessively",
    structure: "Verb (Masu-stem) / Adjective (i stem) + すぎる",
    explanation:
      "Indicates that a condition or action is excessive, exceeding reasonable limits (usually negative connotation).",
    examples: [
      {
        japanese: "昨日はお酒を飲みすぎました。",
        romaji: "Kinou wa osake o nomisugimashita.",
        english: "Yesterday I drank too much alcohol.",
      },
      {
        japanese: "このカバンは高すぎます。",
        romaji: "Kono kaban wa takasugimasu.",
        english: "This bag is too expensive.",
      },
    ],
  },
  {
    id: "hou-ga-ii",
    level: "N4",
    title: "〜ほうがいい (hou ga ii)",
    meaning: "Had better / Should",
    structure: "Verb (Ta / Nai) + ほうがいいです",
    explanation:
      "Used to give strong advice or suggestions to others, implying that something bad might happen if the advice is not followed.",
    examples: [
      {
        japanese: "疲れたら、休んだほうがいいですよ。",
        romaji: "Tsukaretara, yasunda hou ga ii desu yo.",
        english: "If you are tired, you should take a rest.",
      },
      {
        japanese: "夜遅く出かけないほうがいいです。",
        romaji: "Yoru osoku dekakenai hou ga ii desu.",
        english: "You should not go out late at night.",
      },
    ],
  },
  {
    id: "kamoshiremasen",
    level: "N4",
    title: "〜かもしれません (kamoshiremasen)",
    meaning: "Might / Perhaps",
    structure: "Bentuk Biasa + かもしれません",
    explanation:
      "Expresses probability or the possibility of something happening (around 50%). It is a subjective guess from the speaker.",
    examples: [
      {
        japanese: "明日は雪が降るかもしれません。",
        romaji: "Ashita wa yuki ga furu kamoshiremasen.",
        english: "Maybe it will snow tomorrow.",
      },
      {
        japanese: "彼は本当のことを知っているかもしれない。",
        romaji: "Kare wa hontou no koto o shitte iru kamoshirenai.",
        english: "He might know the truth.",
      },
    ],
  },
  {
    id: "nara",
    level: "N4",
    title: "〜なら (nara)",
    meaning: "If (Assumption/Suggestion)",
    structure: "Noun / Verb Biasa + なら",
    explanation:
      "Used when giving advice or views based on a topic just raised by the listener.",
    examples: [
      {
        japanese: "温泉に行くなら、箱根がいいですよ。",
        romaji: "Onsen ni iku nara, Hakone ga ii desu yo.",
        english: "If you want to go to a hot spring, Hakone is a good place.",
      },
      {
        japanese: "パソコンなら、この店が安いです。",
        romaji: "Pasokon nara, kono mise ga yasui desu.",
        english: "If you're talking about computers, this shop is cheap.",
      },
    ],
  },
  {
    id: "tara",
    level: "N4",
    title: "〜たら (tara)",
    meaning: "If / After",
    structure: "Verb / Sifat (Past form) + ら",
    explanation:
      "Used for the 'if' supposition or expressing an action that will happen 'after' a future condition is met.",
    examples: [
      {
        japanese: "雨が降ったら、行きません。",
        romaji: "Ame ga futtara, ikimasen.",
        english: "If it rains, I won't go.",
      },
      {
        japanese: "日本に着いたら、電話します。",
        romaji: "Nihon ni tsuitara, denwa shimasu.",
        english: "After I arrive in Japan, I will call you.",
      },
    ],
  },
  {
    id: "ba-conditional",
    level: "N4",
    title: "〜ば (Bentuk Syarat / Conditional 'ba')",
    meaning: "If (Condition)",
    structure: "Verb (Ba-form)",
    explanation:
      "A conditional form focused on the necessary conditions to produce a certain result. (Change last U syllable to E, add 'ba').",
    examples: [
      {
        japanese: "春になれば、桜が咲きます。",
        romaji: "Haru ni nareba, sakura ga sakimasu.",
        english: "If spring comes, cherry blossoms will bloom.",
      },
      {
        japanese: "薬を飲めば、よくなりますよ。",
        romaji: "Kusuri o nomeba, yoku narimasu yo.",
        english: "If you take medicine, you will get better.",
      },
    ],
  },
  {
    id: "te-ageru-morau-kureru",
    level: "N4",
    title: "〜てあげる / 〜てもらう / 〜てくれる",
    meaning: "To give / receive (Action)",
    structure: "Verb (Te-form) + あげる / もらう / くれる",
    explanation:
      "Used to express the activity of giving or receiving 'help' or 'kindness'. Kureru (others do for me), Morau (I receive the action), Ageru (I do for others).",
    examples: [
      {
        japanese: "先生が日本語を教えてくれました。",
        romaji: "Sensei ga Nihongo o oshiete kuremashita.",
        english: "The teacher taught me Japanese.",
      },
      {
        japanese: "友達に車を貸してあげました。",
        romaji: "Tomodachi ni kuruma o kashite agemashita.",
        english: "I lent my car to a friend.",
      },
    ],
  },
  {
    id: "reru-rareru-passive",
    level: "N4",
    title: "〜れる / られる (Bentuk Pasif)",
    meaning: "Passive form (to be ...)",
    structure:
      "Verb Group 1 (Change U jadi A + れる), Group 2 (Ubah RU to られる)",
    explanation:
      "Used when the subject receives an action from another person or object. In Japanese, the passive is also often used to show that the speaker is annoyed/affected by someone else's action.",
    examples: [
      {
        japanese: "私は先生に褒められました。",
        romaji: "Watashi wa sensei ni homeraremashita.",
        english: "I was praised by the teacher.",
      },
      {
        japanese: "雨に降られて、服が濡れました。",
        romaji: "Ame ni furarete, fuku ga nuremashita.",
        english: "I got caught in the rain, and my clothes got wet.",
      },
    ],
  },
  {
    id: "seru-saseru-causative",
    level: "N4",
    title: "〜せる / させる (Bentuk Kausatif)",
    meaning: "Causative form (to make/let someone do)",
    structure:
      "Verb Group 1 (Change U jadi A + せる), Group 2 (Ubah RU to させる)",
    explanation:
      "Used when someone makes, orders, or lets another person do an action. If it's forced (ordering), use particle に. If it's permission (letting), use particle を.",
    examples: [
      {
        japanese: "先生は学生に宿題をさせました。",
        romaji: "Sensei wa gakusei ni shukudai o sasemashita.",
        english: "The teacher made the students do homework.",
      },
      {
        japanese: "母は子供を公園で遊ばせました。",
        romaji: "Haha wa kodomo o kouen de asobasemashita.",
        english: "The mother let her child play in the park.",
      },
    ],
  },
  {
    id: "yasui-nikui",
    level: "N4",
    title: "〜やすい / 〜にくい",
    meaning: "Easy to... / Difficult to...",
    structure: "Verb (Masu-stem) + やすい / にくい",
    explanation:
      "Used to state whether an action is easy (yasui) or difficult (nikui) to perform, either due to the inherent nature of the object or due to the situation.",
    examples: [
      {
        japanese: "このペンはとても書きやすいです。",
        romaji: "Kono pen wa totemo kakiyasui desu.",
        english: "This pen is very easy to write with.",
      },
      {
        japanese: "この漢字は覚えにくいです。",
        romaji: "Kono kanji wa oboenikui desu.",
        english: "This kanji is difficult to remember.",
      },
    ],
  },
  {
    id: "youni-suru",
    level: "N4",
    title: "〜ようにする (youni suru)",
    meaning: "Try to / Make sure to",
    structure: "Verb (Dictionary form / Nai) + ようにする",
    explanation:
      "Expresses a conscious intention or effort to continuously do or not do something as a habit.",
    examples: [
      {
        japanese: "毎日、野菜を食べるようにしています。",
        romaji: "Mainichi, yasai o taberu youni shite imasu.",
        english: "Every day, I try to (make it a habit to) eat vegetables.",
      },
      {
        japanese: "甘い物を食べないようにしています。",
        romaji: "Amai mono o tabenai youni shite imasu.",
        english: "I try not to eat sweet things.",
      },
    ],
  },
  {
    id: "tameni",
    level: "N4",
    title: "〜ために (tame ni)",
    meaning: "For the sake of / In order to",
    structure: "Verb (Dictionary form) / Noun + の + ために",
    explanation:
      "Used to show a clear purpose of an action that will be performed with effort (not just a passive intention).",
    examples: [
      {
        japanese: "家を買うために、お金を貯めています。",
        romaji: "Ie o kau tame ni, okane o tamete imasu.",
        english: "In order to buy a house, I am saving money.",
      },
      {
        japanese: "家族のために働きます。",
        romaji: "Kazoku no tame ni hatarakimasu.",
        english: "I work for the sake of my family.",
      },
    ],
  },
];
