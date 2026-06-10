export interface GeneratorItem {
  japanese: string;
  romaji?: string;
  english: string; // English translations
  category: string;
  kanji?: string;
  furigana?: string;
}

export interface GrammarItem {
  pattern: string;
  exampleSentence: string;
  englishTranslation: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface GeneratorBank {
  vocabulary: GeneratorItem[];
  grammar: GrammarItem[];
  matchingPairs: { jp: string; id: string }[];
}

export const generatorBank: Record<
  "N5" | "N4" | "N3" | "N2" | "N1",
  GeneratorBank
> = {
  N5: {
    vocabulary: [
      { japanese: "あ", romaji: "a", english: "Vowel A", category: "vowels" },
      { japanese: "い", romaji: "i", english: "Vowel I", category: "vowels" },
      { japanese: "う", romaji: "u", english: "Vowel U", category: "vowels" },
      { japanese: "え", romaji: "e", english: "Vowel E", category: "vowels" },
      { japanese: "お", romaji: "o", english: "Vowel O", category: "vowels" },
      {
        japanese: "こんにちは",
        romaji: "konnichiwa",
        english: "Hello / Good Afternoon",
        category: "greetings",
      },
      {
        japanese: "おはようございます",
        romaji: "ohayou gozaimasu",
        english: "Good Morning",
        category: "greetings",
      },
      {
        japanese: "こんばんは",
        romaji: "konbanwa",
        english: "Good Evening",
        category: "greetings",
      },
      {
        japanese: "ありがとう",
        romaji: "arigatou",
        english: "Thank You",
        category: "greetings",
      },
      {
        japanese: "さようなら",
        romaji: "sayounara",
        english: "Goodbye",
        category: "greetings",
      },
      { japanese: "すし", romaji: "sushi", english: "Sushi", category: "food" },
      { japanese: "みず", romaji: "mizu", english: "Water", category: "food" },
      {
        japanese: "ごはん",
        romaji: "gohan",
        english: "Rice / Meal",
        category: "food",
      },
      {
        japanese: "おちゃ",
        romaji: "ocha",
        english: "Green Tea",
        category: "food",
      },
      { japanese: "ほん", romaji: "hon", english: "Book", category: "objects" },
      {
        japanese: "たべる",
        romaji: "taberu",
        english: "Eat",
        category: "verbs",
      },
      { japanese: "のむ", romaji: "nomu", english: "Drink", category: "verbs" },
      { japanese: "いく", romaji: "iku", english: "Go", category: "verbs" },
    ],
    grammar: [
      {
        pattern: "は ~ です",
        exampleSentence: "わたしはたなかです。",
        englishTranslation: "I am Tanaka.",
        options: ["は", "を", "に", "が"],
        answer: "は",
        explanation:
          "The particle は (wa) is used to mark the main topic of a sentence.",
      },
      {
        pattern: "を ~ ます",
        exampleSentence: "みずをのみます。",
        englishTranslation: "Drink water.",
        options: ["を", "は", "に", "が"],
        answer: "を",
        explanation:
          "The particle を (o/wo) functions as the direct object marker for transitive verbs.",
      },
      {
        pattern: "に ~ ます",
        exampleSentence: "がっこうにいきます。",
        englishTranslation: "Go to school.",
        options: ["に", "を", "は", "が"],
        answer: "に",
        explanation:
          "The particle に (ni) marks the direction or destination of movement.",
      },
    ],
    matchingPairs: [
      { jp: "あ", id: "a" },
      { jp: "い", id: "i" },
      { jp: "う", id: "u" },
      { jp: "え", id: "e" },
      { jp: "お", id: "o" },
      { jp: "みず", id: "Water" },
      { jp: "ごはん", id: "Rice" },
      { jp: "すし", id: "Sushi" },
    ],
  },
  N4: {
    vocabulary: [
      {
        japanese: "えき",
        romaji: "eki",
        english: "Station",
        category: "travel",
      },
      {
        japanese: "びょういn",
        romaji: "byouin",
        english: "Hospital",
        category: "places",
      },
      {
        japanese: "かぞく",
        romaji: "kazoku",
        english: "Family",
        category: "family",
      },
      {
        japanese: "ともだち",
        romaji: "tomodachi",
        english: "Friend",
        category: "social",
      },
      {
        japanese: "あそこ",
        romaji: "asoko",
        english: "Over there (far)",
        category: "directions",
      },
      { japanese: "かう", romaji: "kau", english: "Buy", category: "verbs" },
      { japanese: "よむ", romaji: "yomu", english: "Read", category: "verbs" },
      { japanese: "ねる", romaji: "neru", english: "Sleep", category: "verbs" },
    ],
    grammar: [
      {
        pattern: "たい です (Desire)",
        exampleSentence: "すしがたべたいです。",
        englishTranslation: "I want to eat sushi.",
        options: ["が", "を", "に", "は"],
        answer: "が",
        explanation:
          "When using the expression of desire ~tai desu, the recommended object emphasis particle is が (ga).",
      },
      {
        pattern: "~ta Form (Past)",
        exampleSentence: "きのうテレビをみた。",
        englishTranslation: "Watched television yesterday.",
        options: ["みた", "みます", "みる", "みてる"],
        answer: "みた",
        explanation: "The casual/informal past tense uses the ~ta form (mita).",
      },
      {
        pattern: "~te Form (Request)",
        exampleSentence: "ちょっとまってください。",
        englishTranslation: "Please wait a moment.",
        options: ["まって", "まちます", "まつ", "またない"],
        answer: "まって",
        explanation:
          'The verb "matsu" changes to "matte" in the ~te form for polite requests (~te kudasai).',
      },
    ],
    matchingPairs: [
      { jp: "えき", id: "Station" },
      { jp: "かぞく", id: "Family" },
      { jp: "びょういん", id: "Hospital" },
      { jp: "ともだち", id: "Friend" },
      { jp: "あそこ", id: "Over there" },
    ],
  },
  N3: {
    vocabulary: [
      {
        japanese: "会議",
        romaji: "kaigi",
        english: "Meeting / Conference",
        category: "business",
      },
      {
        japanese: "元気そう",
        romaji: "genkisou",
        english: "Looks Healthy",
        category: "adjectives",
      },
      {
        japanese: "美味しい",
        romaji: "oishii",
        english: "Delicious / Tasty",
        category: "food",
      },
      {
        japanese: "謙遜",
        romaji: "kenson",
        english: "Humble",
        category: "traits",
      },
      {
        japanese: "案内",
        romaji: "annai",
        english: "To Guide / Direct",
        category: "verbs",
      },
    ],
    grammar: [
      {
        pattern: "~sou desu (Looks like)",
        exampleSentence: "雨が降りそうです。",
        englishTranslation: "It looks like it will rain.",
        options: ["降りそう", "降るそう", "降ってそう", "降り"],
        answer: "降りそう",
        explanation:
          "Speculation of appearance (~sou) uses the verb stem (furi) + sou.",
      },
      {
        pattern: "Kenjougo (Humble)",
        exampleSentence: "田中と申します。",
        englishTranslation: "My name is Tanaka (humble).",
        options: ["申します", "おっしゃいます", "言います", "でございます"],
        answer: "申します",
        explanation:
          "Moushimasu is the humble verb (Kenjougo) to state one's name or say.",
      },
      {
        pattern: "Sonkeigo (Honorific)",
        exampleSentence: "先生が召し上がります。",
        englishTranslation: "The teacher is eating/drinking (honorific).",
        options: ["召し上がります", "いただきます", "食べます", "参ります"],
        answer: "召し上がります",
        explanation:
          "Meshiagarimasu is the honorific verb (Sonkeigo) for eating/drinking.",
      },
    ],
    matchingPairs: [
      { jp: "会議", id: "Meeting" },
      { jp: "美味しい", id: "Delicious" },
      { jp: "謙遜", id: "Humble" },
      { jp: "案内", id: "Guide" },
    ],
  },
  N2: {
    vocabulary: [
      {
        japanese: "環境",
        romaji: "kankyou",
        english: "Environment",
        category: "news",
      },
      {
        japanese: "影響",
        romaji: "eikyou",
        english: "Influence / Effect",
        category: "science",
      },
      {
        japanese: "経済",
        romaji: "keizai",
        english: "Economy",
        category: "politics",
      },
      {
        japanese: "解決",
        romaji: "kaiketsu",
        english: "Solution / Resolution",
        category: "society",
      },
    ],
    grammar: [
      {
        pattern: "について (About)",
        exampleSentence: "この問題について考えます。",
        englishTranslation: "I will think about this problem.",
        options: ["について", "にとって", "として", "において"],
        answer: "について",
        explanation:
          "~ni tsuite is used to indicate the main topic being discussed or researched.",
      },
      {
        pattern: "において (At/In formal)",
        exampleSentence: "東京において会議が行われた。",
        englishTranslation: "A meeting was held in Tokyo.",
        options: ["において", "について", "にとって", "として"],
        answer: "において",
        explanation:
          "~ni oite is a formal written expression used to mark the location or field where an event takes place.",
      },
    ],
    matchingPairs: [
      { jp: "環境", id: "Environment" },
      { jp: "影響", id: "Influence" },
      { jp: "経済", id: "Economy" },
      { jp: "解決", id: "Solution" },
    ],
  },
  N1: {
    vocabulary: [
      {
        japanese: "謙遜",
        romaji: "kenson",
        english: "Deep humble attitude",
        category: "traits",
      },
      {
        japanese: "懸念",
        romaji: "kenen",
        english: "Deep concern / anxiety",
        category: "philosophy",
      },
      {
        japanese: "矛盾",
        romaji: "mujun",
        english: "Contradiction / Paradox",
        category: "academic",
      },
      {
        japanese: "余儀なくされる",
        romaji: "yogi naku sareru",
        english: "Forced to do with no other choice",
        category: "verbs",
      },
    ],
    grammar: [
      {
        pattern: "をもって (With this/Limit)",
        exampleSentence: "本日をもって閉店いたします。",
        englishTranslation: "The shop closes as of today.",
        options: ["をもって", "を契機に", "を通じて", "のもとで"],
        answer: "をもって",
        explanation:
          "~wo motte marks a time limit or formal decision in written/literary language.",
      },
      {
        pattern: "なり ~ なり (Alternative)",
        exampleSentence: "行くくなり行かないくなり、返事をして。",
        englishTranslation: "Whether you go or not, please give an answer.",
        options: ["なり / なり", "とか / とか", "だの / だo", "つつ / つつ"],
        answer: "なり / なり",
        explanation:
          "~nari ~nari gives two alternative extreme actions that the speaker can choose from.",
      },
    ],
    matchingPairs: [
      { jp: "懸念", id: "Concern" },
      { jp: "矛盾", id: "Contradiction" },
      { jp: "謙遜", id: "Humility" },
    ],
  },
};
