// Grammar Lesson System - Inspired by SakuraFlow's lesson structure
// Each lesson groups related grammar points into themed sections with exercises

export interface GrammarSection {
  id: string;
  title: string; // Japanese pattern e.g. "X は Y です"
  subtitle: string; // English description e.g. "Marking topics and polite sentences"
  introduction: string;
  subsections: {
    heading: string;
    content: string;
    examples?: {
      japanese: string;
      furigana?: string; // e.g. "わたし は がくせい です"
      english: string;
    }[];
    tip?: string;
  }[];
  keyVocabulary?: {
    kanji: string;
    furigana: string;
    meaning: string;
  }[];
  summary: string[];
}

export interface GrammarExercise {
  type: "fill-particle" | "word-bank" | "translate-choice";
  question: string;
  sentence?: string; // Sentence with blank for fill-particle
  target?: string; // The correct answer (particle to fill)
  hint?: string; // Explanation after answer
  words?: string[]; // For word-bank: the word tiles
  answer?: string[]; // For word-bank: correct order
  choices?: string[]; // For translate-choice: options
  correct?: string; // For translate-choice: correct option
}

export interface GrammarLesson {
  id: string;
  lessonNumber: number;
  title: string;
  subtitle: string; // Grammar points covered (e.g. "は・です・か・なん・の")
  description: string; // What you'll learn
  estimatedMinutes: number;
  sections: GrammarSection[];
  exercises: GrammarExercise[];
}

// ──────────────────────────────────────────────────────────────────────────────
// LESSON 1: First Sentences
// ──────────────────────────────────────────────────────────────────────────────
const lesson1Sections: GrammarSection[] = [
  {
    id: "x-wa-y-desu",
    title: "X は Y です",
    subtitle: "Marking topics and polite sentences",
    introduction:
      "This is the very first sentence pattern you learn in Japanese, and one of the most important. With は you mark the topic of your sentence, and with です you make it polite. Together they form the foundation for almost every Japanese sentence.",
    subsections: [
      {
        heading: "What is は?",
        content:
          'は is the topic particle. It marks what you are talking about. Important: は is pronounced "wa" as a particle, even though the character is normally "ha". Think of は as "As for X…", it sets the frame for the rest of the sentence.',
        examples: [
          {
            japanese: "私は学生です。",
            furigana: "わたし は がくせい です",
            english: "I am a student.",
          },
          {
            japanese: "たなかさんは先生です。",
            furigana: "たなかさん は せんせい です",
            english: "Tanaka-san is a teacher.",
          },
        ],
        tip: 'は is always pronounced "wa" when used as a particle. This is one of the most well-known quirks of Japanese!',
      },
      {
        heading: "What is です?",
        content:
          "です is the polite copula. It links the topic to a description or noun and makes the sentence formal/polite. It is similar to 'is/am/are' in English.",
        examples: [
          {
            japanese: "これはペンです。",
            furigana: "これ は ぺん です",
            english: "This is a pen.",
          },
        ],
      },
      {
        heading: "Putting it together: X は Y です",
        content:
          "Combine は and です to say what something is. The pattern is: [Topic] は [Noun/Description] です。",
        examples: [
          {
            japanese: "私は日本人です。",
            furigana: "わたし は にほんじん です",
            english: "I am Japanese.",
          },
          {
            japanese: "今日はいい天気です。",
            furigana: "きょう は いい てんき です",
            english: "Today's weather is good.",
          },
        ],
      },
    ],
    keyVocabulary: [
      { kanji: "学生", furigana: "がくせい", meaning: "student" },
      { kanji: "先生", furigana: "せんせい", meaning: "teacher" },
      { kanji: "友達", furigana: "ともだち", meaning: "friend" },
      { kanji: "日本人", furigana: "にほんじん", meaning: "Japanese person" },
      { kanji: "アメリカ人", furigana: "アメリカじん", meaning: "American" },
    ],
    summary: [
      'は (wa) marks the topic of the sentence, "As for X…"',
      'です makes the sentence polite, like "is/am/are"',
      'Basic pattern: X は Y です = "X is Y"',
      'は is always pronounced "wa" when used as a particle',
    ],
  },
  {
    id: "question-ka",
    title: "〜か (Questions)",
    subtitle: "Forming polite questions",
    introduction:
      "In Japanese, you can turn any statement into a question simply by adding か at the end. No need to change the word order like in English!",
    subsections: [
      {
        heading: "Adding か to make a question",
        content:
          "Just add か to the end of a sentence to ask a question. Your voice typically rises slightly at the end, similar to a question tone in English.",
        examples: [
          {
            japanese: "これはペンですか。",
            furigana: "これ は ぺん です か",
            english: "Is this a pen?",
          },
          {
            japanese: "山田さんは先生ですか。",
            furigana: "やまだ さん は せんせい です か",
            english: "Is Yamada-san a teacher?",
          },
        ],
        tip: "In formal written Japanese, か ends with 。(period), not ？. In casual speech, the question mark ? is sometimes used.",
      },
      {
        heading: "Answering with はい / いいえ",
        content: "Answer questions with はい (yes) or いいえ (no).",
        examples: [
          {
            japanese: "はい、先生です。",
            furigana: "はい、せんせい です",
            english: "Yes, (I) am a teacher.",
          },
          {
            japanese: "いいえ、先生ではありません。",
            furigana: "いいえ、せんせい では ありません",
            english: "No, (I) am not a teacher.",
          },
        ],
      },
    ],
    summary: [
      "Add か at the end of a sentence to make it a question",
      "No word order change needed – just add か!",
      "Answer with はい (yes) or いいえ (no)",
    ],
  },
  {
    id: "nan-desu-ka",
    title: "なんですか (What is it?)",
    subtitle: "Asking what something is",
    introduction:
      "なん (or なに) means 'what'. Combine with は, です, and か to ask 'What is X?'",
    subsections: [
      {
        heading: "Using なん to ask 'what'",
        content:
          "なん is used before です. The full pattern: [Topic] は なんですか = 'What is [topic]?'",
        examples: [
          {
            japanese: "これはなんですか。",
            furigana: "これ は なん です か",
            english: "What is this?",
          },
          {
            japanese: "あれはなんですか。",
            furigana: "あれ は なん です か",
            english: "What is that (over there)?",
          },
        ],
        tip: "Use これ (this), それ (that near you), あれ (that over there) to point at things.",
      },
    ],
    summary: [
      "なん + ですか = 'What is it?'",
      "これはなんですか = 'What is this?'",
      "これ (this), それ (that), あれ (that over there)",
    ],
  },
  {
    id: "no-particle",
    title: "Partikel の (Possession & Connection)",
    subtitle: "Connecting nouns together",
    introduction:
      "の connects two nouns. It works like the English 's or 'of'. The first noun modifies or owns the second.",
    subsections: [
      {
        heading: "Using の to show possession",
        content:
          "Pattern: [Owner] の [Thing owned]. Think of it as [Owner]'s [Thing].",
        examples: [
          {
            japanese: "私の本です。",
            furigana: "わたし の ほん です",
            english: "It's my book.",
          },
          {
            japanese: "田中さんの車はあかいです。",
            furigana: "たなか さん の くるま は あかい です",
            english: "Tanaka-san's car is red.",
          },
        ],
      },
      {
        heading: "Using の to connect categories",
        content:
          "の also connects categories or descriptions: [Category] の [Item]",
        examples: [
          {
            japanese: "日本語の本",
            furigana: "にほんご の ほん",
            english: "A Japanese language book",
          },
          {
            japanese: "大学の先生",
            furigana: "だいがく の せんせい",
            english: "A university teacher",
          },
        ],
      },
    ],
    summary: [
      "の connects two nouns (possession or categorization)",
      "[A] の [B] = B of A, or A's B",
      "Can chain multiple nouns: 私の大学の先生",
    ],
  },
  {
    id: "dewa-arimasen",
    title: "〜ではありません (Negation)",
    subtitle: "Saying what something is NOT",
    introduction:
      "Just as です makes positive statements, ではありません is its negative form. Use it to say something is NOT something.",
    subsections: [
      {
        heading: "Using ではありません",
        content:
          "Replace です with ではありません to negate. In casual speech, じゃありません is used.",
        examples: [
          {
            japanese: "私は先生ではありません。",
            furigana: "わたし は せんせい では ありません",
            english: "I am not a teacher.",
          },
          {
            japanese: "これはペンじゃありません。",
            furigana: "これ は ぺん じゃ ありません",
            english: "This is not a pen. (casual)",
          },
        ],
        tip: "ではありません (formal) = じゃありません (casual). Both are correct!",
      },
    ],
    summary: [
      "ではありません = the negative of です",
      "Pattern: X は Y ではありません = 'X is not Y'",
      "Casual version: じゃありません",
    ],
  },
];

const lesson1Exercises: GrammarExercise[] = [
  {
    type: "fill-particle",
    question: "Fill in the particle",
    sentence: "私 ___ 学生 です。",
    target: "は",
    hint: 'は marks 私 "I" as the topic of the sentence.',
  },
  {
    type: "word-bank",
    question: "Translate this sentence:",
    sentence: "This is a book.",
    words: ["は", "です", "本", "が", "これ", "この"],
    answer: ["これ", "は", "本", "です"],
  },
  {
    type: "fill-particle",
    question: "Fill in the particle",
    sentence: "山田さん ___ 先生 です か。",
    target: "は",
    hint: "は marks the topic (Yamada-san) of this question.",
  },
  {
    type: "word-bank",
    question: "Translate this sentence:",
    sentence: "I am not a student.",
    words: ["私", "は", "です", "学生", "ではありません", "が"],
    answer: ["私", "は", "学生", "ではありません"],
  },
  {
    type: "translate-choice",
    question: "What does これはなんですか mean?",
    choices: [
      "What is this?",
      "Is this a book?",
      "This is what.",
      "Where is this?",
    ],
    correct: "What is this?",
  },
  {
    type: "fill-particle",
    question: "Fill in the particle",
    sentence: "私 ___ 本 です。",
    target: "の",
    hint: "の shows possession: 'my book'.",
  },
  {
    type: "word-bank",
    question: "Translate this sentence:",
    sentence: "Tanaka-san is a teacher.",
    words: ["田中さん", "は", "先生", "です", "が", "の"],
    answer: ["田中さん", "は", "先生", "です"],
  },
  {
    type: "fill-particle",
    question: "Fill in the particle",
    sentence: "日本語 ___ 本",
    target: "の",
    hint: "の connects 'Japanese language' and 'book' = a Japanese language book.",
  },
  {
    type: "translate-choice",
    question: "Which is the casual negative of です?",
    choices: ["ではありません", "じゃありません", "ません", "ないです"],
    correct: "じゃありません",
  },
  {
    type: "word-bank",
    question: "Translate this sentence:",
    sentence: "Is Yamada-san a student?",
    words: ["山田さん", "は", "学生", "ですか", "が", "の"],
    answer: ["山田さん", "は", "学生", "ですか"],
  },
  {
    type: "fill-particle",
    question: "Fill in the particle",
    sentence: "これ ___ ペン です か。",
    target: "は",
    hint: "は marks これ (this) as the topic of the question.",
  },
  {
    type: "translate-choice",
    question: "How do you say 'I am Japanese'?",
    choices: [
      "私は日本人です。",
      "私の日本人です。",
      "私が日本人ですか。",
      "私は日本人ではありません。",
    ],
    correct: "私は日本人です。",
  },
  {
    type: "word-bank",
    question: "Translate this sentence:",
    sentence: "This is not a pen.",
    words: ["これ", "は", "ペン", "ではありません", "です", "が"],
    answer: ["これ", "は", "ペン", "ではありません"],
  },
  {
    type: "fill-particle",
    question: "Fill in the particle",
    sentence: "大学 ___ 先生",
    target: "の",
    hint: "の connects category (university) to item (teacher).",
  },
  {
    type: "translate-choice",
    question: "What does はい、先生です mean?",
    choices: [
      "Yes, (I) am a teacher.",
      "No, I am not a teacher.",
      "Are you a teacher?",
      "The teacher is here.",
    ],
    correct: "Yes, (I) am a teacher.",
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// LESSON 2: Verbs & Movement
// ──────────────────────────────────────────────────────────────────────────────
const lesson2Sections: GrammarSection[] = [
  {
    id: "masu-form",
    title: "〜ます (Polite Verbs)",
    subtitle: "Polite present/future verb form",
    introduction:
      "〜ます is the polite ending for Japanese verbs in the present/future tense. This is the standard form to use in most situations.",
    subsections: [
      {
        heading: "How to use 〜ます",
        content:
          "Japanese verbs in polite form end in 〜ます for present/future affirmative. The negative is 〜ません, and the past is 〜ました.",
        examples: [
          {
            japanese: "毎日りんごを食べます。",
            furigana: "まいにち りんご を たべます",
            english: "I eat apples every day.",
          },
          {
            japanese: "明日学校へ行きます。",
            furigana: "あした がっこう へ いきます",
            english: "I will go to school tomorrow.",
          },
        ],
        tip: "〜ます verbs are always polite and safe to use with strangers, teachers, or in formal situations.",
      },
      {
        heading: "〜ません (Negative)",
        content: "To say you do NOT do something, replace ます with ません.",
        examples: [
          {
            japanese: "私は肉を食べません。",
            furigana: "わたし は にく を たべません",
            english: "I don't eat meat.",
          },
        ],
      },
      {
        heading: "〜ました (Past)",
        content: "To say what you DID, replace ます with ました.",
        examples: [
          {
            japanese: "昨日、映画を見ました。",
            furigana: "きのう、えいが を みました",
            english: "Yesterday, I watched a movie.",
          },
        ],
      },
    ],
    keyVocabulary: [
      { kanji: "食べます", furigana: "たべます", meaning: "to eat" },
      { kanji: "飲みます", furigana: "のみます", meaning: "to drink" },
      { kanji: "見ます", furigana: "みます", meaning: "to watch/see" },
      { kanji: "行きます", furigana: "いきます", meaning: "to go" },
      { kanji: "来ます", furigana: "きます", meaning: "to come" },
      { kanji: "帰ります", furigana: "かえります", meaning: "to return home" },
    ],
    summary: [
      "〜ます = polite present/future (I do / I will do)",
      "〜ません = polite negative (I don't do)",
      "〜ました = polite past (I did)",
      "〜ませんでした = polite past negative (I didn't do)",
    ],
  },
  {
    id: "movement-particles",
    title: "Particles に・へ・で",
    subtitle: "Location and movement particles",
    introduction:
      "These three particles help you describe where actions happen and how you get there.",
    subsections: [
      {
        heading: "へ and に for destination",
        content:
          "Both へ and に can indicate where you are going. へ emphasizes direction, に emphasizes the destination point.",
        examples: [
          {
            japanese: "東京へ行きます。",
            furigana: "とうきょう へ いきます",
            english: "I'm going to Tokyo.",
          },
          {
            japanese: "会社に行きます。",
            furigana: "かいしゃ に いきます",
            english: "I'm going to the company.",
          },
        ],
      },
      {
        heading: "で for location of action",
        content:
          "で marks where an action takes place. Different from に which marks static existence.",
        examples: [
          {
            japanese: "図書館で勉強します。",
            furigana: "としょかん で べんきょう します",
            english: "I study at the library.",
          },
          {
            japanese: "バスで学校へ行きます。",
            furigana: "ばす で がっこう へ いきます",
            english: "I go to school by bus.",
          },
        ],
        tip: "で can also mean 'by means of' – バスで (by bus), 鉛筆で (with a pencil).",
      },
    ],
    summary: [
      "へ = direction (heading towards)",
      "に = destination (specific point) or time",
      "で = location of action, or means/method",
    ],
  },
  {
    id: "o-particle",
    title: "Partikel を (Direct Object)",
    subtitle: "Marking what the action is done TO",
    introduction:
      "を marks the direct object – the thing that receives the action of the verb.",
    subsections: [
      {
        heading: "Using を",
        content:
          "を is written 'wo' but pronounced 'o'. It comes after the noun that receives the action.",
        examples: [
          {
            japanese: "水を飲みます。",
            furigana: "みず を のみます",
            english: "I drink water.",
          },
          {
            japanese: "本を読みました。",
            furigana: "ほん を よみました",
            english: "I read a book.",
          },
        ],
        tip: "を only comes with action verbs (transitive verbs). It is never used with intransitive verbs like いきます (go).",
      },
    ],
    summary: [
      "を marks the direct object of the action",
      "Pattern: [Subject] は [Object] を [Verb]",
      "を is pronounced 'o' in modern Japanese",
    ],
  },
];

const lesson2Exercises: GrammarExercise[] = [
  {
    type: "fill-particle",
    question: "Fill in the particle",
    sentence: "水 ___ 飲みます。",
    target: "を",
    hint: "を marks 水 (water) as the direct object of 飲みます (drink).",
  },
  {
    type: "word-bank",
    question: "Translate this sentence:",
    sentence: "I go to school by bus.",
    words: ["バス", "で", "学校", "へ", "行きます", "は"],
    answer: ["バス", "で", "学校", "へ", "行きます"],
  },
  {
    type: "translate-choice",
    question: "Which particle marks the DIRECT OBJECT?",
    choices: ["を", "は", "が", "に"],
    correct: "を",
  },
  {
    type: "fill-particle",
    question: "Fill in the particle",
    sentence: "図書館 ___ 勉強しました。",
    target: "で",
    hint: "で marks the location where the action (studying) takes place.",
  },
  {
    type: "word-bank",
    question: "Translate this sentence:",
    sentence: "Yesterday, I watched a movie.",
    words: ["昨日", "映画", "を", "見ました", "は", "に"],
    answer: ["昨日", "映画", "を", "見ました"],
  },
  {
    type: "translate-choice",
    question: "What is the negative of 食べます?",
    choices: ["食べません", "食べました", "食べませんでした", "食べない"],
    correct: "食べません",
  },
  {
    type: "fill-particle",
    question: "Fill in the particle",
    sentence: "東京 ___ 行きます。",
    target: "へ",
    hint: "へ shows direction/destination of movement.",
  },
  {
    type: "word-bank",
    question: "Translate this sentence:",
    sentence: "I drink water every day.",
    words: ["毎日", "水", "を", "飲みます", "は", "で"],
    answer: ["毎日", "水", "を", "飲みます"],
  },
  {
    type: "translate-choice",
    question: "How do you say 'I didn't eat'?",
    choices: ["食べませんでした", "食べません", "食べました", "食べます"],
    correct: "食べませんでした",
  },
  {
    type: "fill-particle",
    question: "Fill in the particle",
    sentence: "友達 ___ 映画を見ます。",
    target: "と",
    hint: "と means 'with' – 友達と = with a friend.",
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// LESSON 3: Te-form & Requests
// ──────────────────────────────────────────────────────────────────────────────
const lesson3Sections: GrammarSection[] = [
  {
    id: "te-kudasai",
    title: "〜てください (Please do...)",
    subtitle: "Making polite requests",
    introduction:
      "〜てください is used to politely ask someone to do something. It uses the て-form (te-form) of the verb.",
    subsections: [
      {
        heading: "Making polite requests",
        content:
          "Attach ください to the te-form of a verb to say 'Please do [action]'.",
        examples: [
          {
            japanese: "ここに名前を書いてください。",
            furigana: "ここ に なまえ を かいて ください",
            english: "Please write your name here.",
          },
          {
            japanese: "ちょっと待ってください。",
            furigana: "ちょっと まって ください",
            english: "Please wait a moment.",
          },
        ],
      },
    ],
    summary: [
      "Te-form + ください = 'Please do [action]'",
      "Used to make polite requests to others",
    ],
  },
  {
    id: "te-mo-ii",
    title: "〜てもいいです (Permission)",
    subtitle: "Asking for and giving permission",
    introduction:
      "〜てもいいですか is used to ask for permission. 〜てもいいです gives permission.",
    subsections: [
      {
        heading: "Asking and giving permission",
        content:
          "Add もいいですか after the te-form to ask 'May I...?'. Reply with もいいです to grant permission.",
        examples: [
          {
            japanese: "写真を撮ってもいいですか。",
            furigana: "しゃしん を とって も いい です か",
            english: "May I take a photo?",
          },
          {
            japanese: "はい、休んでもいいです。",
            furigana: "はい、やすんで も いい です",
            english: "Yes, you may rest.",
          },
        ],
      },
    ],
    summary: [
      "Te-form + もいいですか = 'May I...?'",
      "Te-form + もいいです = 'You may...'",
      "Te-form + はいけません = 'You must NOT...'",
    ],
  },
  {
    id: "nai-de-kudasai",
    title: "〜ないでください (Please don't...)",
    subtitle: "Asking someone NOT to do something",
    introduction:
      "〜ないでください is the negative request form. Use it to politely ask someone NOT to do something.",
    subsections: [
      {
        heading: "Negative requests",
        content:
          "Use the nai-form of the verb + でください to say 'Please don't...'",
        examples: [
          {
            japanese: "写真を撮らないでください。",
            furigana: "しゃしん を とらない で ください",
            english: "Please do not take photos.",
          },
          {
            japanese: "心配しないでください。",
            furigana: "しんぱい しない で ください",
            english: "Please don't worry.",
          },
        ],
        tip: "〜ないでください is softer than 〜てはいけません. Use it for gentle requests.",
      },
    ],
    summary: [
      "Nai-form + でください = 'Please don't...'",
      "Used to make negative/prohibition requests politely",
    ],
  },
];

const lesson3Exercises: GrammarExercise[] = [
  {
    type: "translate-choice",
    question: "How do you say 'Please wait a moment'?",
    choices: [
      "ちょっと待ってください。",
      "ちょっと待たないでください。",
      "ちょっと待ってもいいですか。",
      "ちょっと待ちます。",
    ],
    correct: "ちょっと待ってください。",
  },
  {
    type: "word-bank",
    question: "Translate this sentence:",
    sentence: "May I take a photo?",
    words: ["写真", "を", "撮って", "もいいですか", "ください", "は"],
    answer: ["写真", "を", "撮って", "もいいですか"],
  },
  {
    type: "translate-choice",
    question: "What does 心配しないでください mean?",
    choices: [
      "Please don't worry.",
      "Please worry.",
      "May I worry?",
      "I am worried.",
    ],
    correct: "Please don't worry.",
  },
  {
    type: "fill-particle",
    question: "Fill in the blank",
    sentence: "ここに名前を書い ___ ください。",
    target: "て",
    hint: "て is the te-form connector. 書いてください = Please write.",
  },
  {
    type: "translate-choice",
    question: "Which form means 'You must NOT do...'?",
    choices: [
      "〜てはいけません",
      "〜てもいいです",
      "〜てください",
      "〜ないでください",
    ],
    correct: "〜てはいけません",
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// EXPORTED LESSONS
// ──────────────────────────────────────────────────────────────────────────────
export const grammarLessons: GrammarLesson[] = [
  {
    id: "lesson-1",
    lessonNumber: 1,
    title: "First Sentences",
    subtitle: "は・です・か・なん・の",
    description:
      "In this lesson you'll learn the foundation of the Japanese language: how to say what something is (は/です), how to ask questions (か/なん), and how to connect nouns (の). Work through the sections in order.",
    estimatedMinutes: 50,
    sections: lesson1Sections,
    exercises: lesson1Exercises,
  },
  {
    id: "lesson-2",
    lessonNumber: 2,
    title: "Verbs & Movement",
    subtitle: "ます・を・へ・で",
    description:
      "Learn how to talk about actions using polite verb forms, and how to describe movement with location particles.",
    estimatedMinutes: 45,
    sections: lesson2Sections,
    exercises: lesson2Exercises,
  },
  {
    id: "lesson-3",
    lessonNumber: 3,
    title: "Requests & Permission",
    subtitle: "てください・てもいい・ないで",
    description:
      "Master how to make polite requests, ask for permission, and tell someone not to do something using the te-form.",
    estimatedMinutes: 35,
    sections: lesson3Sections,
    exercises: lesson3Exercises,
  },
];

export const totalSections = grammarLessons.reduce(
  (sum, lesson) => sum + lesson.sections.length,
  0,
);
