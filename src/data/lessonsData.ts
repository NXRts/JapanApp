export interface Question {
  id: string;
  type:
    | "multiple-choice"
    | "sentence-builder"
    | "listening"
    | "fill-in-the-blank"
    | "typing";
  questionText: string;
  audioText?: string;
  options: string[];
  answer: string;
  hint?: string;
}

export interface Lesson {
  id: string;
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  unitId: string;
  unitTitle: string;
  unitDescription: string;
  unitColor: string;
  title: string;
  description: string;
  expReward: number;
  icon: string;
  badge: string;
  questions: Question[];
}

const baseLessonsData: Lesson[] = [
  {
    id: "n5-u1-l1",
    level: "N5",
    unitId: "n5-u1",
    unitTitle: "Unit 1: Ordering Food & Drinks at a Restaurant 🎌",
    unitDescription:
      "Master how to order food/drinks politely in a Japanese restaurant.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Basic Vowels & Hiragana",
    description:
      "Learn the pronunciation and basic Japanese vowels: あ, い, う, え, お.",
    expReward: 20,
    icon: "🎌",
    badge: "Hiragana",
    questions: [
      {
        id: "n5-u1-l1-q1",
        type: "multiple-choice",
        questionText:
          "Choose the correct Romaji spelling for the following Hiragana letter: あ",
        options: ["a", "i", "u", "e"],
        answer: "a",
        hint: "This character is the first vowel in the Japanese alphabet.",
      },
      {
        id: "n5-u1-l1-q2",
        type: "typing",
        questionText:
          "Type the Romaji equivalent for the following Hiragana letter: い",
        options: [],
        answer: "i",
        hint: 'Pronounced like the letter "i" in "machine" or "see".',
      },
      {
        id: "n5-u1-l1-q3",
        type: "listening",
        questionText:
          "Listen to the audio and choose the correct Hiragana letter!",
        audioText: "う",
        options: ["あ", "い", "う", "え"],
        answer: "う",
        hint: 'Vowel sound "u".',
      },
      {
        id: "n5-u1-l1-q4",
        type: "multiple-choice",
        questionText: 'Which Hiragana letter is read as "e"?',
        options: ["お", "え", "う", "あ"],
        answer: "え",
        hint: "Its shape is similar to a small hook symbol.",
      },
      {
        id: "n5-u1-l1-q5",
        type: "sentence-builder",
        questionText:
          'Arrange the cards to spell the word "A-I" (Cinta in Japanese)!',
        options: ["い", "う", "あ", "え"],
        answer: "あ い",
        hint: 'Combine the first vowel "A" and the second vowel "I".',
      },
    ],
  },
  {
    id: "n5-u1-l2",
    level: "N5",
    unitId: "n5-u1",
    unitTitle: "Unit 1: Ordering Food & Drinks at a Restaurant 🎌",
    unitDescription:
      "Master how to order food/drinks politely in a Japanese restaurant.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Restaurant Menu Vocabulary",
    description: "Learn the words for ramen, sushi, mizu, and koohii.",
    expReward: 20,
    icon: "🍱",
    badge: "Vocabulary",
    questions: [
      {
        id: "n5-u1-l2-q1",
        type: "multiple-choice",
        questionText:
          'What is the meaning of the food vocabulary "すし" (sushi)?',
        options: [
          "Japanese vinegar rice ball",
          "Noodle soup broth",
          "Grilled beef",
          "Red bean soup",
        ],
        answer: "Japanese vinegar rice ball",
        hint: "A combination of vinegared rice and fresh raw fish.",
      },
      {
        id: "n5-u1-l2-q2",
        type: "multiple-choice",
        questionText:
          'What is the translation of the word "コーヒー" (koohii)?',
        options: ["Coffee", "Green Tea", "Water", "Milk"],
        answer: "Coffee",
        hint: "Foreign loanword (Katakana).",
      },
      {
        id: "n5-u1-l2-q3",
        type: "listening",
        questionText:
          "Listen to the audio pronunciation and determine the correct meaning!",
        audioText: "みず",
        options: ["Water", "Tea", "Coffee", "Rice"],
        answer: "Water",
        hint: "Vital tasteless liquid (Mizu).",
      },
      {
        id: "n5-u1-l2-q4",
        type: "multiple-choice",
        questionText:
          'Which Katakana spelling is correct for the Japanese noodle "Ramen"?',
        options: ["ラーメン", "うどん", "そば", "パスタ"],
        answer: "ラーメン",
        hint: "A combination of chewy noodles and savory broth.",
      },
      {
        id: "n5-u1-l2-q5",
        type: "typing",
        questionText:
          'Type the English translation for the word "おちゃ" (ocha):',
        options: [],
        answer: "tea",
        hint: "Typical Japanese green tea drink.",
      },
    ],
  },
  {
    id: "n5-u1-l3",
    level: "N5",
    unitId: "n5-u1",
    unitTitle: "Unit 1: Ordering Food & Drinks at a Restaurant 🎌",
    unitDescription:
      "Master how to order food/drinks politely in a Japanese restaurant.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Particles & Counting",
    description: "Learn hitotsu, futatsu, mittsu, and object particle wo.",
    expReward: 20,
    icon: "🔢",
    badge: "Grammar",
    questions: [
      {
        id: "n5-u1-l3-q1",
        type: "multiple-choice",
        questionText: 'Which counter is used to order "satu porsi/buah"?',
        options: [
          "ひとつ (hitotsu)",
          "ふたつ (futatsu)",
          "みっつ (mittsu)",
          "よっつ (yottsu)",
        ],
        answer: "ひとつ (hitotsu)",
        hint: "Universal basic count ending in ~tsu.",
      },
      {
        id: "n5-u1-l3-q2",
        type: "multiple-choice",
        questionText: 'Which counter is used to order "tiga porsi/buah"?',
        options: [
          "みっつ (mittsu)",
          "ひとつ (hitotsu)",
          "ふたつ (futatsu)",
          "よっつ (yottsu)",
        ],
        answer: "みっつ (mittsu)",
        hint: "Hitotsu (1), futatsu (2), mittsu (3).",
      },
      {
        id: "n5-u1-l3-q3",
        type: "fill-in-the-blank",
        questionText:
          "Complete the correct object particle when ordering Sushi: \n「すし ___ ふたつください。」",
        options: ["を", "は", "が", "に"],
        answer: "を",
        hint: "The direct object marker particle is wo/o (を).",
      },
      {
        id: "n5-u1-l3-q4",
        type: "sentence-builder",
        questionText: 'Arrange the Japanese sentence: "Minta air satu porsi."',
        options: ["みず", "を", "ひとつ", "ください"],
        answer: "みず を ひとつ ください",
        hint: "Object + wo + Quantity + kudasai.",
      },
      {
        id: "n5-u1-l3-q5",
        type: "typing",
        questionText:
          "Type in Hiragana the reading of the following air Kanji: 水",
        options: [],
        answer: "みず",
        hint: 'Pronounced as "mizu".',
      },
    ],
  },
  {
    id: "n5-u1-l4",
    level: "N5",
    unitId: "n5-u1",
    unitTitle: "Unit 1: Ordering Food & Drinks at a Restaurant 🎌",
    unitDescription:
      "Master how to order food/drinks politely in a Japanese restaurant.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Making Ordering Sentences",
    description:
      "Learn kudasai, kore wa nan desu ka, and onegaishimasu sentence patterns.",
    expReward: 20,
    icon: "🗣️",
    badge: "Conversation",
    questions: [
      {
        id: "n5-u1-l4-q1",
        type: "multiple-choice",
        questionText:
          'Which question sentence pattern is correct to ask "What is this?"',
        options: [
          "これはなんですか",
          "これをください",
          "これをお願いします",
          "これはいくらですか",
        ],
        answer: "これはなんですか",
        hint: "Kore wa (this is) + nan (what) + desu ka (question).",
      },
      {
        id: "n5-u1-l4-q2",
        type: "multiple-choice",
        questionText:
          "If you want to request something politely, which suffix is added?",
        options: [
          "をお願いします (wo onegaishimasu)",
          "をください (wo kudasai)",
          "はなんですか (wa nan desu ka)",
          "はいくらですか (wa ikura desu ka)",
        ],
        answer: "をお願いします (wo onegaishimasu)",
        hint: "Onegaishimasu provides a higher level of politeness at restaurants/shops.",
      },
      {
        id: "n5-u1-l4-q3",
        type: "fill-in-the-blank",
        questionText:
          "Complete the sentence to order ramen: \n「ラーメン ___ お願いします。」",
        options: ["を", "は", "が", "に"],
        answer: "を",
        hint: "Just like kudasai, onegaishimasu is preceded by the object particle を.",
      },
      {
        id: "n5-u1-l4-q4",
        type: "sentence-builder",
        questionText:
          'Arrange the Japanese sentence: "Please give me this (while pointing at the menu)."',
        options: ["これ", "を", "ください"],
        answer: "これ を ください",
        hint: "Kore (this) + wo + kudasai.",
      },
      {
        id: "n5-u1-l4-q5",
        type: "typing",
        questionText:
          'Type the lowercase Romaji spelling for the demonstrative pronoun "Ini":',
        options: [],
        answer: "kore",
        hint: "Written with four Romaji letters.",
      },
    ],
  },
  {
    id: "n5-u1-l5",
    level: "N5",
    unitId: "n5-u1",
    unitTitle: "Unit 1: Ordering Food & Drinks at a Restaurant 🎌",
    unitDescription:
      "Master how to order food/drinks politely in a Japanese restaurant.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Unit 1 Final Challenge",
    description:
      "Final synthesis of all materials on ordering food and drinks in a restaurant.",
    expReward: 30,
    icon: "🏆",
    badge: "Synthesis",
    questions: [
      {
        id: "n5-u1-l5-q1",
        type: "multiple-choice",
        questionText:
          'Which sentence is correct to say "Tolong berikan air" at a restaurant?',
        options: [
          "みずをください",
          "おちゃをください",
          "これをください",
          "コーヒーをください",
        ],
        answer: "みずをください",
        hint: 'Mizu means water, while "wo kudasai" is used to request something.',
      },
      {
        id: "n5-u1-l5-q2",
        type: "multiple-choice",
        questionText:
          'What is the meaning of the Katakana vocabulary "コーヒー" (koohii)?',
        options: ["Coffee", "Green Tea", "Water", "Milk"],
        answer: "Coffee",
        hint: 'コーヒー (koohii) is a Katakana loanword from English "coffee".',
      },
      {
        id: "n5-u1-l5-q3",
        type: "fill-in-the-blank",
        questionText:
          "Choose the correct object marker particle to complete the following Sushi order: \n「すし ___ ください。」",
        options: ["を", "は", "が", "に"],
        answer: "を",
        hint: "The particle を (o/wo) functions as a direct object marker for the action of requesting.",
      },
      {
        id: "n5-u1-l5-q4",
        type: "multiple-choice",
        questionText:
          "What is the correct meaning for the following Japanese vocabulary: 「すし」?",
        options: ["Sushi", "Coffee", "Ramen", "Water"],
        answer: "Sushi",
        hint: "Typical Japanese vinegared rice topped with raw fish.",
      },
      {
        id: "n5-u1-l5-q5",
        type: "multiple-choice",
        questionText:
          "You want to ask about an unknown food served by the waiter at your table. Which question is most appropriate?",
        options: [
          "これはなんですか",
          "これはみずですか",
          "これをください",
          "これはいくらですか",
        ],
        answer: "これはなんですか",
        hint: 'The sentence pattern "これはなんですか" is used to ask "What is this?".',
      },
      {
        id: "n5-u1-l5-q6",
        type: "sentence-builder",
        questionText:
          'Arrange the scrambled words below into the correct request sentence: "Please give me this." (Ordering by pointing at the menu directly)',
        options: ["ください", "を", "これ"],
        answer: "これ を ください",
        hint: "Sentence structure: これ (this) + を (wo) + ください (kudasai).",
      },
      {
        id: "n5-u1-l5-q7",
        type: "multiple-choice",
        questionText:
          'Which is the correct Kunyomi reading for the following air Kanji: "水"?',
        options: [
          "みず (mizu)",
          "おちゃ (ocha)",
          "ごはん (gohan)",
          "おにく (oniku)",
        ],
        answer: "みず (mizu)",
        hint: 'The Kanji character "水" is read as "mizu".',
      },
      {
        id: "n5-u1-l5-q8",
        type: "fill-in-the-blank",
        questionText:
          'Fill in the blank to order "dua mangkuk/porsi" of ramen: \n「ラーメンを ___ ください。」',
        options: ["ひとつ", "ふたつ", "みっつ", "よっつ"],
        answer: "ふたつ",
        hint: "Object counter: ひとつ (1), ふたつ (2), みっつ (3).",
      },
      {
        id: "n5-u1-l5-q9",
        type: "sentence-builder",
        questionText:
          'Arrange the scrambled words below into the order sentence: "Tolong ramen satu porsi."',
        options: ["ください", "を", "ひとつ", "ラーメン"],
        answer: "ラーメン を ひとつ ください",
        hint: "Order quantity pattern: [Food] + を + [Quantity] + ください.",
      },
      {
        id: "n5-u1-l5-q10",
        type: "multiple-choice",
        questionText:
          'If you want to order a dish with a highly polite and formal sentence like "Tolong / Mohon berikan ini", which expression is most appropriate?',
        options: [
          "これをください",
          "これをお願いします",
          "これはなんですか",
          "これと整いです",
        ],
        answer: "これをお願いします",
        hint: 'The phrase "をお願いします" (wo onegaishimasu) is much more formal and polite.',
      },
    ],
  },
  {
    id: "n5-u2-l1",
    level: "N5",
    unitId: "n5-u2",
    unitTitle: "Unit 2: Shopping for Needs at a Convenience Store (Konbini) 🏪",
    unitDescription: "Master how to shop at a Japanese convenience store.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Convenience Store Vocabulary",
    description:
      "Learn the words for ocha, bento, fukuro, and convenience store items.",
    expReward: 20,
    icon: "🏪",
    badge: "Vocabulary",
    questions: [
      {
        id: "n5-u2-l1-q1",
        type: "multiple-choice",
        questionText:
          'What is the meaning of the convenience store vocabulary "おかんじょう" (okanjo)?',
        options: [
          "Bill / Cashier",
          "Shopping Bag",
          "Lunch Box (Bento)",
          "Green Tea",
        ],
        answer: "Bill / Cashier",
        hint: "Used when making payment or asking for the total bill.",
      },
      {
        id: "n5-u2-l1-q2",
        type: "multiple-choice",
        questionText: 'What is the translation of the word "お弁当" (obento)?',
        options: [
          "Lunch Box (Bento)",
          "Shopping Bag",
          "Cashier Payment",
          "Japanese Tea",
        ],
        answer: "Lunch Box (Bento)",
        hint: "A highly popular convenience store bento box.",
      },
      {
        id: "n5-u2-l1-q3",
        type: "listening",
        questionText:
          "Listen to the following audio and determine the meaning of the word spoken!",
        audioText: "ふくろ",
        options: [
          "Plastic bag / Shopping bag",
          "Nasi kotak",
          "Tea",
          "Cashier bill",
        ],
        answer: "Plastic bag / Shopping bag",
        hint: "Fukuro means wrapping bag/shopping bag.",
      },
      {
        id: "n5-u2-l1-q4",
        type: "multiple-choice",
        questionText:
          'Which is the correct Kanji writing for the Japanese currency "Yen"?',
        options: ["円", "百", "千", "万"],
        answer: "円",
        hint: 'Yen is represented by the circle Kanji "en" (円).',
      },
      {
        id: "n5-u2-l1-q5",
        type: "typing",
        questionText: 'Type the English translation of "お茶" (ocha):',
        options: [],
        answer: "tea",
        hint: "Healthy unsweetened green tea drink.",
      },
    ],
  },
  {
    id: "n5-u2-l2",
    level: "N5",
    unitId: "n5-u2",
    unitTitle: "Unit 2: Shopping for Needs at a Convenience Store (Konbini) 🏪",
    unitDescription: "Master how to shop at a Japanese convenience store.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Demonstrative Pronouns",
    description: "Learn the words kore, sore, and are.",
    expReward: 20,
    icon: "👉",
    badge: "Grammar",
    questions: [
      {
        id: "n5-u2-l2-q1",
        type: "multiple-choice",
        questionText:
          "Which demonstrative pronoun is used for an object far from both the speaker and the listener (Itu di sana)?",
        options: ["これ (kore)", "それ (sore)", "あれ (are)", "どれ (dore)"],
        answer: "あれ (are)",
        hint: "Kore (near speaker), sore (near listener), are (far from both).",
      },
      {
        id: "n5-u2-l2-q2",
        type: "multiple-choice",
        questionText:
          'The demonstrative pronoun "それ" (sore) is used to point to an object that is...',
        options: [
          "Near the listener",
          "Near the speaker",
          "Far from both speaker & listener",
          "Invisible",
        ],
        answer: "Near the listener",
        hint: "Sore refers to the listener's domain.",
      },
      {
        id: "n5-u2-l2-q3",
        type: "fill-in-the-blank",
        questionText:
          "Fill in the correct demonstrative pronoun when holding an object in your hand: \n「___は私のです。(This is mine.)」",
        options: ["これ", "それ", "あれ", "どれ"],
        answer: "これ",
        hint: "Use kore when the object is near or in the speaker's hand.",
      },
      {
        id: "n5-u2-l2-q4",
        type: "sentence-builder",
        questionText: 'Arrange the Japanese sentence: "That is water."',
        options: ["それ", "は", "みず", "です"],
        answer: "それ は みず です",
        hint: "Sore (that) + wa + mizu (water) + desu.",
      },
      {
        id: "n5-u2-l2-q5",
        type: "typing",
        questionText:
          'Type the lowercase Romaji spelling for the far demonstrative pronoun "Itu di sana":',
        options: [],
        answer: "are",
        hint: "Written with three Romaji letters.",
      },
    ],
  },
  {
    id: "n5-u2-l3",
    level: "N5",
    unitId: "n5-u2",
    unitTitle: "Unit 2: Shopping for Needs at a Convenience Store (Konbini) 🏪",
    unitDescription: "Master how to shop at a Japanese convenience store.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Numbers & Prices",
    description: "Learn the words ikura, en, hyaku, and sen.",
    expReward: 20,
    icon: "💴",
    badge: "Counting",
    questions: [
      {
        id: "n5-u2-l3-q1",
        type: "multiple-choice",
        questionText:
          "Which question word is used to ask for the price of an item (How much)?",
        options: ["いくら (ikura)", "どこ (doko)", "なん (nan)", "いつ (itsu)"],
        answer: "いくら (ikura)",
        hint: "Ikura desu ka means how much is the price.",
      },
      {
        id: "n5-u2-l3-q2",
        type: "multiple-choice",
        questionText:
          'What is the meaning of the hundreds Kanji "百" (hyaku) and thousands Kanji "千" (sen)?',
        options: ["100 and 1000", "10 and 100", "1000 and 10000", "1 and 10"],
        answer: "100 and 1000",
        hint: "Hyaku is read as 100, while Sen is read as 1000.",
      },
      {
        id: "n5-u2-l3-q3",
        type: "fill-in-the-blank",
        questionText:
          "Complete the following price question sentence: \n「これはいくら___か。」",
        options: ["です", "ます", "ください", "の"],
        answer: "です",
        hint: "Use the copula desu to end nominal sentences.",
      },
      {
        id: "n5-u2-l3-q4",
        type: "sentence-builder",
        questionText: 'Arrange the Japanese sentence: "Bento ini 500 Yen."',
        options: ["この", "お弁当", "は", "五百円", "です"],
        answer: "この お弁当 は 五百円 です",
        hint: "Kono obento wa gohyaku-en desu.",
      },
      {
        id: "n5-u2-l3-q5",
        type: "typing",
        questionText:
          "Type in lowercase Romaji the Japanese currency Yen (円):",
        options: [],
        answer: "en",
        hint: 'The Romaji spelling is read as "en".',
      },
    ],
  },
  {
    id: "n5-u2-l4",
    level: "N5",
    unitId: "n5-u2",
    unitTitle: "Unit 2: Shopping for Needs at a Convenience Store (Konbini) 🏪",
    unitDescription: "Master how to shop at a Japanese convenience store.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Payment Methods",
    description: "Learn the words okanjo, kaikei, and payment actions.",
    expReward: 20,
    icon: "💳",
    badge: "Transactions",
    questions: [
      {
        id: "n5-u2-l4-q1",
        type: "multiple-choice",
        questionText:
          "Which vocabulary is used to request the bill at the convenience store register?",
        options: [
          "お会計 (okaikei)",
          "お弁当 (obento)",
          "お袋 (ofukuro)",
          "お茶 (ocha)",
        ],
        answer: "お会計 (okaikei)",
        hint: "Okaikei or okanjo refers to the cashier payment.",
      },
      {
        id: "n5-u2-l4-q2",
        type: "multiple-choice",
        questionText:
          'What is the meaning of "お会計をお願いします" (Okaikei wo onegaishimasu)?',
        options: [
          "Please the total bill / payment",
          "Please give me a warm bento",
          "Please give me a plastic bag",
          "Please one warm tea",
        ],
        answer: "Please the total bill / payment",
        hint: "Polite pattern for requesting the bill/payment.",
      },
      {
        id: "n5-u2-l4-q3",
        type: "fill-in-the-blank",
        questionText:
          "Complete the sentence to request a plastic shopping bag: \n「袋を ___ ください。」",
        options: ["を", "は", "が", "に"],
        answer: "を",
        hint: "Fukuro (bag) is the object of the request action, so use the particle wo.",
      },
      {
        id: "n5-u2-l4-q4",
        type: "sentence-builder",
        questionText:
          'Arrange the Japanese sentence: "Please make the payment (polite)."',
        options: ["お会計", "を", "お願いします"],
        answer: "お会計 を お願いします",
        hint: "Okaikei + wo + onegaishimasu.",
      },
      {
        id: "n5-u2-l4-q5",
        type: "typing",
        questionText:
          "Type in Hiragana the reading of the following bento lunch box word: お弁当",
        options: [],
        answer: "おべんとう",
        hint: "Written with five Hiragana letters.",
      },
    ],
  },
  {
    id: "n5-u2-l5",
    level: "N5",
    unitId: "n5-u2",
    unitTitle: "Unit 2: Shopping for Needs at a Convenience Store (Konbini) 🏪",
    unitDescription: "Master how to shop at a Japanese convenience store.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Unit 2 Final Challenge",
    description:
      "Comprehensive final synthesis of transactions and shopping in convenience stores.",
    expReward: 30,
    icon: "🏆",
    badge: "Synthesis",
    questions: [
      {
        id: "n5-u2-l5-q1",
        type: "multiple-choice",
        questionText:
          "Which demonstrative pronoun is used for an object far from both the speaker and the listener (Itu di sana)?",
        options: ["これ (kore)", "それ (sore)", "あれ (are)", "どれ (dore)"],
        answer: "あれ (are)",
        hint: "Kore (near speaker), sore (near listener), are (far from both).",
      },
      {
        id: "n5-u2-l5-q2",
        type: "multiple-choice",
        questionText:
          'What is the meaning of the convenience store vocabulary "おかんじょう" (okanjo)?',
        options: [
          "Bill / Cashier",
          "Shopping Bag",
          "Lunch Box (Bento)",
          "Green Tea",
        ],
        answer: "Bill / Cashier",
        hint: "Used when making payment or asking for the total bill.",
      },
      {
        id: "n5-u2-l5-q3",
        type: "fill-in-the-blank",
        questionText:
          "Complete the following price question sentence: \n「これはいくら___か。」",
        options: ["です", "ます", "ください", "の"],
        answer: "です",
        hint: "A nominal question sentence ends with the copula desu + particle ka.",
      },
      {
        id: "n5-u2-l5-q4",
        type: "sentence-builder",
        questionText:
          'Arrange the correct Japanese sentence: "Bento ini 500 Yen."',
        options: ["この", "お弁当", "は", "五百円", "です"],
        answer: "この お弁当 は 五百円 です",
        hint: "Word order: Demonstrative + Topic + Particle wa + Price + desu.",
      },
      {
        id: "n5-u2-l5-q5",
        type: "typing",
        questionText:
          "Type in lowercase Romaji the Japanese currency Yen (円):",
        options: [],
        answer: "en",
        hint: 'The Romaji spelling is read as "en".',
      },
    ],
  },
  {
    id: "n5-u3-l1",
    level: "N5",
    unitId: "n5-u3",
    unitTitle:
      "Unit 3: Greeting New People & Introducing Yourself (Jikoshoukai) 🤝",
    unitDescription:
      "Learn how to introduce yourself, basic greetings, and state your country of origin.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Basic Jikoshoukai Vocabulary",
    description:
      "Kuasai kata-kata kunci perkenalan: hajimemashite, watashi, namae, dan dozo yoroshiku.",
    expReward: 20,
    icon: "🤝",
    badge: "Vocabulary",
    questions: [
      {
        id: "n5-u3-l1-q1",
        type: "multiple-choice",
        questionText:
          "Which phrase is spoken when greeting someone for the first time during a self-introduction?",
        options: [
          "はじめまして (hajimemashite)",
          "お元気ですか (o-genki desu ka)",
          "こんにちは (konnichiwa)",
          "ありがとうございます (arigatou gozaimasu)",
        ],
        answer: "はじめまして (hajimemashite)",
        hint: 'Literally means "we meet for the first time".',
      },
      {
        id: "n5-u3-l1-q2",
        type: "typing",
        questionText: 'Type the lowercase Romaji spelling for the word "Saya":',
        options: [],
        answer: "watashi",
        hint: "Written in Hiragana: わたし.",
      },
      {
        id: "n5-u3-l1-q3",
        type: "listening",
        questionText: "Listen to the audio and choose the word spoken!",
        audioText: "なまえ",
        options: [
          "なまえ (namae)",
          "わたし (watashi)",
          "くに (kuni)",
          "ともだち (tomodachi)",
        ],
        answer: "なまえ (namae)",
        hint: 'Means "name".',
      },
      {
        id: "n5-u3-l1-q4",
        type: "fill-in-the-blank",
        questionText:
          "Complete the self-introduction sentence: \n「わたし ___ 田anaka です。(I am Tanaka.)」",
        options: ["は", "を", "が", "に"],
        answer: "は",
        hint: 'The main topic marker particle is read as "wa".',
      },
      {
        id: "n5-u3-l1-q5",
        type: "sentence-builder",
        questionText:
          'Arrange the sentence to mean: "Please give me your guidance (Polite)."',
        options: ["どうぞ", "よろしく", "おねがいします"],
        answer: "どうぞ よろしく おねがいします",
        hint: 'Combine the words "douzo" + "yoroshiku" + "onegaishimasu".',
      },
    ],
  },
  {
    id: "n5-u3-l2",
    level: "N5",
    unitId: "n5-u3",
    unitTitle:
      "Unit 3: Greeting New People & Introducing Yourself (Jikoshoukai) 🤝",
    unitDescription:
      "Learn how to introduce yourself, basic greetings, and state your country of origin.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Kanji & Country of Origin",
    description:
      "Master the Kanji 人 (person) and 国 (country) and names of countries.",
    expReward: 20,
    icon: "🗻",
    badge: "Kanji & Countries",
    questions: [
      {
        id: "n5-u3-l2-q1",
        type: "multiple-choice",
        questionText:
          'Which is the correct Kunyomi reading for the Kanji "人" (person)?',
        options: ["ひと (hito)", "じん (jin)", "にん (nin)", "くに (kuni)"],
        answer: "ひと (hito)",
        hint: "Used when standing alone as the noun for person.",
      },
      {
        id: "n5-u3-l2-q2",
        type: "multiple-choice",
        questionText:
          'Which is the correct Katakana spelling for the country "Indonesia"?',
        options: ["インドネシア", "インド", "マレーシア", "アメリカ"],
        answer: "インドネシア",
        hint: "The country name Indonesia written in Katakana.",
      },
      {
        id: "n5-u3-l2-q3",
        type: "listening",
        questionText:
          "Listen to the audio pronunciation of the country and choose the correct Hiragana!",
        audioText: "にほん",
        options: ["にほん", "インド", "アメリカ", "ちゅうごく"],
        answer: "にほん",
        hint: "The country name Japan.",
      },
      {
        id: "n5-u3-l2-q4",
        type: "typing",
        questionText:
          'Type the lowercase Romaji reading of the country Kanji "国":',
        options: [],
        answer: "kuni",
        hint: "Kunyomi of the country Kanji.",
      },
      {
        id: "n5-u3-l2-q5",
        type: "sentence-builder",
        questionText:
          'Arrange the Japanese sentence: "I am Japanese (Nihon-jin)."',
        options: ["わたし", "は", "日本人", "です"],
        answer: "わたし は 日本人 です",
        hint: "Structure: I + wa + Japanese-person + desu.",
      },
    ],
  },
  {
    id: "n5-u3-l3",
    level: "N5",
    unitId: "n5-u3",
    unitTitle:
      "Unit 3: Greeting New People & Introducing Yourself (Jikoshoukai) 🤝",
    unitDescription:
      "Learn how to introduce yourself, basic greetings, and state your country of origin.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Grammar ~kara kimashita & ~jin",
    description:
      "Learn how to state country of origin and nationality using grammatical patterns.",
    expReward: 20,
    icon: "📝",
    badge: "Grammar",
    questions: [
      {
        id: "n5-u3-l3-q1",
        type: "multiple-choice",
        questionText:
          'Which sentence pattern is correct to state "I came from Indonesia"?',
        options: [
          "インドネシアから来ました",
          "インドネシアに行きます",
          "インドネシア人です",
          "インドネシアにいます",
        ],
        answer: "インドネシアから来ました",
        hint: "Pattern: [Place] + kara (from) + kimashita (came).",
      },
      {
        id: "n5-u3-l3-q2",
        type: "fill-in-the-blank",
        questionText:
          'Complete the nationality suffix for the sentence "He is American": \n「かれはアメリカ___です。」',
        options: ["人 (jin)", "人 (hito)", "国 (kuni)", "語 (go)"],
        answer: "人 (jin)",
        hint: "Use the Onyomi reading 'jin' (人) to express nationality.",
      },
      {
        id: "n5-u3-l3-q3",
        type: "listening",
        questionText:
          "Listen to the pronunciation of the sentence and choose its correct meaning!",
        audioText: "わたしはインドネシアからきました",
        options: [
          "I came from Indonesia",
          "I am going to Indonesia",
          "I am Indonesian",
          "I like Indonesia",
        ],
        answer: "I came from Indonesia",
        hint: 'The phrase "kara kimashita" refers to the place of origin.',
      },
      {
        id: "n5-u3-l3-q4",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "Is Budi Japanese?"',
        options: ["ブディさん", "は", "日本人", "です", "か"],
        answer: "ブディさん は 日本人 です か",
        hint: "Subject + wa + Nationality + desu + ka (question particle).",
      },
      {
        id: "n5-u3-l3-q5",
        type: "typing",
        questionText:
          'Type the polite formal past tense of the verb "datang" (kuru -> has come) in Hiragana:',
        options: [],
        answer: "きました",
        hint: 'Pronounced as "kimashita".',
      },
    ],
  },
  {
    id: "n5-u3-l4",
    level: "N5",
    unitId: "n5-u3",
    unitTitle:
      "Unit 3: Greeting New People & Introducing Yourself (Jikoshoukai) 🤝",
    unitDescription:
      "Learn how to introduce yourself, basic greetings, and state your country of origin.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Introduction Conversation App",
    description:
      "Practice two-way dialogue patterns often used when introducing yourself in Japan.",
    expReward: 20,
    icon: "🗣️",
    badge: "Conversation",
    questions: [
      {
        id: "n5-u3-l4-q1",
        type: "multiple-choice",
        questionText:
          'Your conversation partner says "はじめまして。どうぞよろしく。" What polite response should you give?',
        options: [
          "こちらこそ、どうぞよろしくおねがいします (kochira koso, douzo yoroshiku onegaishimasu)",
          "ありがとうございます (arigatou gozaimasu)",
          "お元気ですか (o-genki desu ka)",
          "こんにちは (konnichiwa)",
        ],
        answer:
          "こちらこそ、どうぞよろしくおねがいします (kochira koso, douzo yoroshiku onegaishimasu)",
        hint: '"Kochira koso" means "likewise / same here".',
      },
      {
        id: "n5-u3-l4-q2",
        type: "fill-in-the-blank",
        questionText:
          "Complete the blank to ask where someone is from: \n「お国は ___ ですか。」",
        options: ["どちら", "だれ", "なん", "いくつ"],
        answer: "どちら",
        hint: 'O-kuni wa dochira desu ka means "Where is your country from (polite)?"',
      },
      {
        id: "n5-u3-l4-q3",
        type: "listening",
        questionText:
          "Listen to the audio and choose the meaning of the short conversation!",
        audioText: "おなまえは？わたしはブディです",
        options: [
          "What is your name? I am Budi",
          "Where is your country? Indonesia",
          "Budi is my friend",
          "Goodbye, Budi",
        ],
        answer: "What is your name? I am Budi",
        hint: "Asking someone's name briefly in friendly/casual conversation.",
      },
      {
        id: "n5-u3-l4-q4",
        type: "sentence-builder",
        questionText:
          'Arrange the dialogue sentence: "Likewise, I look forward to working with you."',
        options: ["こちらこそ", "よろしく", "お願いします"],
        answer: "こちらこそ よろしく お願いします",
        hint: 'Use "kochira koso" at the start of the sentence.',
      },
      {
        id: "n5-u3-l4-q5",
        type: "typing",
        questionText:
          'Type in Hiragana the polite honorific reading for "Country" prefixed with o-:',
        options: [],
        answer: "おくに",
        hint: 'Write "o-kuni" in Hiragana.',
      },
    ],
  },
  {
    id: "n5-u3-l5",
    level: "N5",
    unitId: "n5-u3",
    unitTitle:
      "Unit 3: Greeting New People & Introducing Yourself (Jikoshoukai) 🤝",
    unitDescription:
      "Learn how to introduce yourself, basic greetings, and state your country of origin.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Unit 3 Final Challenge",
    description:
      "Test your self-introduction skills thoroughly to master Unit 3.",
    expReward: 30,
    icon: "🏆",
    badge: "Synthesis",
    questions: [
      {
        id: "n5-u3-l5-q1",
        type: "multiple-choice",
        questionText:
          "Which expression is appropriate to say first during a self-introduction?",
        options: [
          "はじめまして (hajimemashite)",
          "こんにちは (konnichiwa)",
          "どうぞよろしく (douzo yoroshiku)",
          "さようなら (sayounara)",
        ],
        answer: "はじめまして (hajimemashite)",
        hint: "Means the beginning of an introduction.",
      },
      {
        id: "n5-u3-l5-q2",
        type: "multiple-choice",
        questionText:
          'What is the meaning of the sentence "インドネシアから来ました"?',
        options: [
          "I came from Indonesia",
          "I am going to Indonesia",
          "I am Indonesian",
          "I was born in Indonesia",
        ],
        answer: "I came from Indonesia",
        hint: "Using the place of origin pattern ~kara kimashita.",
      },
      {
        id: "n5-u3-l5-q3",
        type: "fill-in-the-blank",
        questionText:
          "Complete the blank to state the topic about yourself: \n「わたし ___ ブディです。」",
        options: ["は", "を", "が", "に"],
        answer: "は",
        hint: "Topic marker particle.",
      },
      {
        id: "n5-u3-l5-q4",
        type: "multiple-choice",
        questionText: 'Which is the correct Kanji for "person" (hito / jin)?',
        options: ["人", "国", "日", "本"],
        answer: "人",
        hint: "Kanji shaped like a person's legs walking.",
      },
      {
        id: "n5-u3-l5-q5",
        type: "multiple-choice",
        questionText: 'How do you say "Japanese person" formally?',
        options: [
          "日本人 (Nihon-jin)",
          "日本国 (Nihon-koku)",
          "日本 (Nihon)",
          "日人 (Hi-to)",
        ],
        answer: "日本人 (Nihon-jin)",
        hint: "Japan + Kanji for Person.",
      },
      {
        id: "n5-u3-l5-q6",
        type: "sentence-builder",
        questionText:
          'Arrange the self-introduction sentence: "My name is Budi."',
        options: ["わたし", "の", "なまえ", "は", "ブディ", "です"],
        answer: "わたし の なまえ は ブディ です",
        hint: "I + possessive particle + name + wa + Budi + desu.",
      },
      {
        id: "n5-u3-l5-q7",
        type: "listening",
        questionText:
          "Listen to the audio and choose the speaker's country of origin!",
        audioText: "わたしはアメリカからきました",
        options: ["Amerika", "Indonesia", "Japan", "Cina"],
        answer: "Amerika",
        hint: "Ditulis dalam Katakana: アメリカ.",
      },
      {
        id: "n5-u3-l5-q8",
        type: "fill-in-the-blank",
        questionText:
          "Complete the polite response to the other person's self-introduction: \n「___、どうぞよろしくおねがいします。」",
        options: ["こちらこそ", "はじめまして", "ありがとう", "こんにちは"],
        answer: "こちらこそ",
        hint: 'Means "Me too / Likewise".',
      },
      {
        id: "n5-u3-l5-q9",
        type: "sentence-builder",
        questionText:
          'Arrange the following question sentence: "What is your name? (Polite)"',
        options: ["お名前", "は", "何", "です", "か"],
        answer: "お名前 は 何 です か",
        hint: "O-namae + wa + nan + desu + ka.",
      },
      {
        id: "n5-u3-l5-q10",
        type: "typing",
        questionText:
          'Type the Hiragana equivalent of the word "Country" (without prefix o-):',
        options: [],
        answer: "くに",
        hint: 'The Romaji spelling is "kuni".',
      },
    ],
  },
  {
    id: "n5-u4-l1",
    level: "N5",
    unitId: "n5-u4",
    unitTitle:
      "Unit 4: Asking for Directions and Locations (Doko, Toilet, Eki) 🗺️",
    unitDescription:
      "Master navigation vocabulary, asking for public locations, and basic directions.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Location & Public Places Vocabulary",
    description:
      "Kuasai nama fasilitas umum penting: eki, toilet, konbini, hoteru, dan kata tunjuk soko/koko/asoko.",
    expReward: 20,
    icon: "🗺️",
    badge: "Vocabulary",
    questions: [
      {
        id: "n5-u4-l1-q1",
        type: "multiple-choice",
        questionText: 'What is the meaning of the public facility "駅" (eki)?',
        options: ["Station", "Hotel", "Minimarket", "Hospital"],
        answer: "Station",
        hint: "Place to board the train (densha).",
      },
      {
        id: "n5-u4-l1-q2",
        type: "typing",
        questionText:
          'Type the Katakana spelling for the word "Toilet" in Japanese:',
        options: [],
        answer: "トイレ",
        hint: "Using three Katakana characters: ト・イ・レ.",
      },
      {
        id: "n5-u4-l1-q3",
        type: "listening",
        questionText: "Listen to the audio location and choose its meaning!",
        audioText: "ホテル",
        options: ["Hotel", "Station", "Minimarket", "Park"],
        answer: "Hotel",
        hint: 'Foreign loanword for "Hotel".',
      },
      {
        id: "n5-u4-l1-q4",
        type: "fill-in-the-blank",
        questionText:
          "Choose the correct demonstrative pronoun for the area near the listener: \n「___はコンビニです。(Di situ is the convenience store.)」",
        options: ["そこ (soko)", "ここ (koko)", "あそこ (asoko)", "doko"],
        answer: "そこ (soko)",
        hint: "Koko (near me), soko (near you), asoko (far from both of us).",
      },
      {
        id: "n5-u4-l1-q5",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "Here is a hotel."',
        options: ["ここ", "は", "ホテル", "です"],
        answer: "ここ は ホテル です",
        hint: "Koko (Di sini) + wa + hoteru + desu.",
      },
    ],
  },
  {
    id: "n5-u4-l2",
    level: "N5",
    unitId: "n5-u4",
    unitTitle:
      "Unit 4: Asking for Directions and Locations (Doko, Toilet, Eki) 🗺️",
    unitDescription:
      "Master navigation vocabulary, asking for public locations, and basic directions.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Kanji Directions & Locations",
    description: "Kuasai Kanji 右 (migi), 左 (hidari), dan 駅 (eki).",
    expReward: 20,
    icon: "🧭",
    badge: "Kanji",
    questions: [
      {
        id: "n5-u4-l2-q1",
        type: "multiple-choice",
        questionText:
          'Which is the correct Kunyomi reading for the Kanji "右" (right)?',
        options: [
          "みぎ (migi)",
          "ひだり (hidari)",
          "うえ (ue)",
          "した (shita)",
        ],
        answer: "みぎ (migi)",
        hint: "Right direction, opposite of hidari.",
      },
      {
        id: "n5-u4-l2-q2",
        type: "multiple-choice",
        questionText:
          'Which is the correct Kunyomi reading for the Kanji "左" (left)?',
        options: [
          "ひだり (hidari)",
          "みぎ (migi)",
          "なか (naka)",
          "そと (soto)",
        ],
        answer: "ひだり (hidari)",
        hint: "Left direction.",
      },
      {
        id: "n5-u4-l2-q3",
        type: "listening",
        questionText:
          "Listen to the audio pronunciation of the Kanji and determine its meaning!",
        audioText: "みぎ",
        options: ["Kanan", "Kiri", "Atas", "Bawah"],
        answer: "Kanan",
        hint: 'Pronunciation of the word "migi".',
      },
      {
        id: "n5-u4-l2-q4",
        type: "typing",
        questionText: "Type the Hiragana reading for the station Kanji: 駅",
        options: [],
        answer: "えき",
        hint: "Consists of two Hiragana letters.",
      },
      {
        id: "n5-u4-l2-q5",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "The station is on the right."',
        options: ["駅", "は", "右", "です"],
        answer: "駅 は 右 です",
        hint: "Eki (station) + wa + migi (right) + desu.",
      },
    ],
  },
  {
    id: "n5-u4-l3",
    level: "N5",
    unitId: "n5-u4",
    unitTitle:
      "Unit 4: Asking for Directions and Locations (Doko, Toilet, Eki) 🗺️",
    unitDescription:
      "Master navigation vocabulary, asking for public locations, and basic directions.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Grammar ~wa doko desu ka",
    description:
      "Learn grammatical patterns to ask for the location of a place politely.",
    expReward: 20,
    icon: "🧭",
    badge: "Grammar",
    questions: [
      {
        id: "n5-u4-l3-q1",
        type: "multiple-choice",
        questionText:
          'Which sentence pattern is correct to ask "Where is the toilet?"',
        options: [
          "トイレはどこですか",
          "トイレはこれですか",
          "トイレはなんですか",
          "トイレがありますか",
        ],
        answer: "トイレはどこですか",
        hint: "Using the question word doko (where).",
      },
      {
        id: "n5-u4-l3-q2",
        type: "fill-in-the-blank",
        questionText:
          'Complete the particle for the sentence "The hotel is over there": \n「ホテルはあそこ ___ です。」',
        options: ["- (tanpa partikel/langsung desu)", "を", "に", "は"],
        answer: "- (tanpa partikel/langsung desu)",
        hint: "After demonstrative pronouns of place like 'asoko', 'koko', 'soko', you can directly end with 'desu'.",
      },
      {
        id: "n5-u4-l3-q3",
        type: "listening",
        questionText: "Listen to the audio and choose the correct translation!",
        audioText: "えきはどこですか",
        options: [
          "Where is the station?",
          "Where is the hotel?",
          "Where is the convenience store?",
          "Is the station nearby?",
        ],
        answer: "Where is the station?",
        hint: "Eki means station, doko desu ka means where.",
      },
      {
        id: "n5-u4-l3-q4",
        type: "sentence-builder",
        questionText: 'Arrange the question sentence: "Where is the station?"',
        options: ["駅", "は", "どこ", "です", "か"],
        answer: "駅 は どこ です か",
        hint: "Eki + wa + doko + desu + ka.",
      },
      {
        id: "n5-u4-l3-q5",
        type: "typing",
        questionText: 'Type the question word "where" in Hiragana:',
        options: [],
        answer: "どこ",
        hint: 'The Romaji spelling is "doko".',
      },
    ],
  },
  {
    id: "n5-u4-l4",
    level: "N5",
    unitId: "n5-u4",
    unitTitle:
      "Unit 4: Asking for Directions and Locations (Doko, Toilet, Eki) 🗺️",
    unitDescription:
      "Master navigation vocabulary, asking for public locations, and basic directions.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Navigation Conversation App",
    description:
      "Practice conversations when lost on the street or asking locals for directions.",
    expReward: 20,
    icon: "🗣️",
    badge: "Conversation",
    questions: [
      {
        id: "n5-u4-l4-q1",
        type: "multiple-choice",
        questionText:
          "Before asking directions from a stranger, which excuse/apology is most politely used?",
        options: [
          "すみません (sumimasen)",
          "ありがとう (arigatou)",
          "はじめまして (hajimemashite)",
          "さようなら (sayounara)",
        ],
        answer: "すみません (sumimasen)",
        hint: "Used to politely get attention before asking.",
      },
      {
        id: "n5-u4-l4-q2",
        type: "fill-in-the-blank",
        questionText:
          'Someone asks for directions and you want to reply "On the left." Complete the sentence: \n「___desu。」',
        options: ["左 (hidari)", "右 (migi)", "あそこ (asoko)", "doko"],
        answer: "左 (hidari)",
        hint: "Left is read as 'hidari' (left).",
      },
      {
        id: "n5-u4-l4-q3",
        type: "listening",
        questionText:
          "Listen to the audio and choose the translation of the short dialogue!",
        audioText: "すみません、トイレはどこですか？あそこです。",
        options: [
          "Excuse me, where is the toilet? Over there.",
          "Excuse me, where is the station? Here.",
          "Please give me a toilet ticket. Here.",
          "Sorry, where is the hotel? On the left.",
        ],
        answer: "Excuse me, where is the toilet? Over there.",
        hint: "Asoko refers to a location far from both speakers (over there).",
      },
      {
        id: "n5-u4-l4-q4",
        type: "sentence-builder",
        questionText:
          'Arrange the dialogue sentence: "Excuse me, where is the station?"',
        options: ["すみません", "駅", "は", "どこ", "です", "か"],
        answer: "すみません 駅 は どこ です か",
        hint: "Begin with the excuse/apology word 'sumimasen'.",
      },
      {
        id: "n5-u4-l4-q5",
        type: "typing",
        questionText:
          'Type the English translation for the far demonstrative pronoun "あそこ" (asoko):',
        options: [],
        answer: "over there",
        hint: "Points to a place far from both.",
      },
    ],
  },
  {
    id: "n5-u4-l5",
    level: "N5",
    unitId: "n5-u4",
    unitTitle:
      "Unit 4: Asking for Directions and Locations (Doko, Toilet, Eki) 🗺️",
    unitDescription:
      "Master navigation vocabulary, asking for public locations, and basic directions.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Unit 4 Final Challenge",
    description:
      "Test your comprehensive understanding of road navigation and public locations.",
    expReward: 30,
    icon: "🏆",
    badge: "Synthesis",
    questions: [
      {
        id: "n5-u4-l5-q1",
        type: "multiple-choice",
        questionText: 'Which question word means "Where"?',
        options: ["どこ (doko)", "なん (nan)", "だれ (dare)", "いつ (itsu)"],
        answer: "どこ (doko)",
        hint: "Asking for location.",
      },
      {
        id: "n5-u4-l5-q2",
        type: "multiple-choice",
        questionText: 'What is the meaning of "駅" (eki)?',
        options: ["Station", "Bathroom", "Minimarket", "Hotel"],
        answer: "Station",
        hint: "Train transportation center.",
      },
      {
        id: "n5-u4-l5-q3",
        type: "fill-in-the-blank",
        questionText:
          'Complete the sentence: "The bathroom is there (near you)": \n「トイレは ___ です。」',
        options: ["そこ (soko)", "ここ (koko)", "あそこ (asoko)", "doko"],
        answer: "そこ (soko)",
        hint: "Demonstrative for place near the listener.",
      },
      {
        id: "n5-u4-l5-q4",
        type: "multiple-choice",
        questionText: 'How do you read the Kunyomi of the right Kanji "右"?',
        options: [
          "みぎ (migi)",
          "ひだり (hidari)",
          "うえ (ue)",
          "した (shita)",
        ],
        answer: "みぎ (migi)",
        hint: "Migi means right.",
      },
      {
        id: "n5-u4-l5-q5",
        type: "multiple-choice",
        questionText: 'How do you read the Kunyomi of the left Kanji "左"?',
        options: [
          "ひだり (hidari)",
          "みぎ (migi)",
          "なか (naka)",
          "そと (soto)",
        ],
        answer: "ひだり (hidari)",
        hint: "Hidari means left.",
      },
      {
        id: "n5-u4-l5-q6",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "Sorry, where is the hotel?"',
        options: ["すみません", "ホテル", "は", "どこ", "です", "か"],
        answer: "すみません ホテル は どこ です か",
        hint: "Polite greeting + hotel topic + wa doko desu ka.",
      },
      {
        id: "n5-u4-l5-q7",
        type: "listening",
        questionText:
          "Listen to the audio and choose the station location spoken!",
        audioText: "えきはひだりです",
        options: [
          "The station is on the left",
          "The station is on the right",
          "The station is over there",
          "The station is here",
        ],
        answer: "The station is on the left",
        hint: "Eki (station) + wa + hidari (left) + desu.",
      },
      {
        id: "n5-u4-l5-q8",
        type: "fill-in-the-blank",
        questionText: "Complete the dialogue blank:",
        options: ["です", "をください", "ですか", "にいます"],
        answer: "です",
        hint: "Statements are ended with desu.",
      },
      {
        id: "n5-u4-l5-q9",
        type: "sentence-builder",
        questionText:
          'Arrange the direction answer: "The station is on the right."',
        options: ["駅", "は", "右", "です"],
        answer: "駅 は 右 です",
        hint: "Eki + wa + migi (right) + desu.",
      },
      {
        id: "n5-u4-l5-q10",
        type: "typing",
        questionText:
          'Type the English translation for the near demonstrative pronoun "ここ" (koko):',
        options: [],
        answer: "here",
        hint: "Points to a place near the speaker.",
      },
    ],
  },
  {
    id: "n5-u5-l1",
    level: "N5",
    unitId: "n5-u5",
    unitTitle: "Unit 5: Schedule and Time (Ji, Fun, Nan-ji, ~kara ~made) ⏰",
    unitDescription:
      "Learn how to read hours, minutes, ask for daily time, and activity duration.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Hours & Time Vocabulary",
    description:
      "Kuasai kata-kira waktu: ima, ji, fun, nan-ji, asa, yoru, asa, gogo, dan gozen.",
    expReward: 20,
    icon: "⏰",
    badge: "Vocabulary",
    questions: [
      {
        id: "n5-u5-l1-q1",
        type: "multiple-choice",
        questionText:
          'Which vocabulary word means "now" in Japanese time expressions?',
        options: [
          "いま (ima)",
          "きょう (kyou)",
          "あした (ashita)",
          "きのう (kinou)",
        ],
        answer: "いま (ima)",
        hint: "Written with Kanji: 今.",
      },
      {
        id: "n5-u5-l1-q2",
        type: "typing",
        questionText:
          "Type 3 o'clock in Hiragana (note the special pronunciation):",
        options: [],
        answer: "さんじ",
        hint: "San + ji (hour) -> さんじ.",
      },
      {
        id: "n5-u5-l1-q3",
        type: "listening",
        questionText:
          "Listen to the audio time expression and choose its meaning!",
        audioText: "あさ",
        options: ["Morning", "Afternoon", "Night", "Evening"],
        answer: "Morning",
        hint: "Asa means morning.",
      },
      {
        id: "n5-u5-l1-q4",
        type: "fill-in-the-blank",
        questionText:
          "Choose the correct PM vocabulary (after 12 PM) to complete the hour: \n「いまは ___ 三時です。(It is 3 PM now.)」",
        options: ["ごご (gogo)", "ごぜん (gozen)", "あさ (asa)", "よる (yoru)"],
        answer: "ごご (gogo)",
        hint: "Gozen (AM), Gogo (PM).",
      },
      {
        id: "n5-u5-l1-q5",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "Now it is morning."',
        options: ["いま", "は", "あさ", "です"],
        answer: "いま は あさ です",
        hint: "Ima + wa + asa + desu.",
      },
    ],
  },
  {
    id: "n5-u5-l2",
    level: "N5",
    unitId: "n5-u5",
    unitTitle: "Unit 5: Schedule and Time (Ji, Fun, Nan-ji, ~kara ~made) ⏰",
    unitDescription:
      "Learn how to read hours, minutes, ask for daily time, and activity duration.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Kanji Time Expressions",
    description: "Kuasai Kanji 今 (sekarang), 時 (jam), dan 分 (menit).",
    expReward: 20,
    icon: "⏳",
    badge: "Kanji",
    questions: [
      {
        id: "n5-u5-l2-q1",
        type: "multiple-choice",
        questionText:
          'Which is the correct Kunyomi reading for the Kanji "今" (now)?',
        options: [
          "いま (ima)",
          "きょう (kyou)",
          "あした (ashita)",
          "とき (toki)",
        ],
        answer: "いま (ima)",
        hint: "Ima means now.",
      },
      {
        id: "n5-u5-l2-q2",
        type: "multiple-choice",
        questionText: 'Which Kanji represents the word "Hour" (ji)?',
        options: ["時", "分", "今", "日"],
        answer: "時",
        hint: "Used as an hour suffix, read as 'ji'.",
      },
      {
        id: "n5-u5-l2-q3",
        type: "listening",
        questionText:
          "Listen to the audio pronunciation and determine the correct number-time combination!",
        audioText: "ごじ",
        options: ["5 o'clock", "4 o'clock", "9 o'clock", "7 o'clock"],
        answer: "5 o'clock",
        hint: "Pronunciation of 'go' (5) + 'ji' (hour).",
      },
      {
        id: "n5-u5-l2-q4",
        type: "typing",
        questionText:
          "Type the Hiragana reading for the following minute suffix (for 5 minutes): 五分",
        options: [],
        answer: "ごふん",
        hint: "Go + fun (minute) -> ごふん.",
      },
      {
        id: "n5-u5-l2-q5",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "It is 1 o\'clock now."',
        options: ["いま", "は", "一時", "です"],
        answer: "いま は 一時 です",
        hint: "Ima (now) + wa + ichi-ji (1 o'clock) + desu.",
      },
    ],
  },
  {
    id: "n5-u5-l3",
    level: "N5",
    unitId: "n5-u5",
    unitTitle: "Unit 5: Schedule and Time (Ji, Fun, Nan-ji, ~kara ~made) ⏰",
    unitDescription:
      "Learn how to read hours, minutes, ask for daily time, and activity duration.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Grammar ~kara ~made & Time",
    description:
      "Master sentence patterns expressing start and end limits of activities (from... to...).",
    expReward: 20,
    icon: "📝",
    badge: "Grammar",
    questions: [
      {
        id: "n5-u5-l3-q1",
        type: "multiple-choice",
        questionText:
          'Which particles mean "from" and "until" respectively to express duration?',
        options: [
          "から (kara) and まで (made)",
          "まで (made) and から (kara)",
          "に (ni) and へ (he)",
          "と (to) and から (kara)",
        ],
        answer: "から (kara) and まで (made)",
        hint: "From hour A to hour B: A-kara B-made desu.",
      },
      {
        id: "n5-u5-l3-q2",
        type: "fill-in-the-blank",
        questionText:
          'Complete the specific time particle for the sentence "Wake up at 6 o\'clock": \n「六時 ___ おきます。」',
        options: ["に", "を", "は", "へ"],
        answer: "に",
        hint: "The particle に (ni) is used after specific times to mark when the action is done.",
      },
      {
        id: "n5-u5-l3-q3",
        type: "listening",
        questionText:
          "Listen to the pronunciation of the sentence and choose its meaning!",
        audioText: "九時から五時までです",
        options: [
          "From 9 to 5 o'clock",
          "From 5 to 9 o'clock",
          "9:05",
          "Starting at 9 o'clock sharp",
        ],
        answer: "From 9 to 5 o'clock",
        hint: "Kyuu-ji (9 o'clock) + kara (from) + go-ji (5 o'clock) + made (until).",
      },
      {
        id: "n5-u5-l3-q4",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "Study from 1 to 3 o\'clock."',
        options: ["一時", "から", "三時", "まで", "べんきょうします"],
        answer: "一時 から 三時 まで べんきょうします",
        hint: "Ichi-ji + kara + san-ji + made + benkyou-shimasu.",
      },
      {
        id: "n5-u5-l3-q5",
        type: "typing",
        questionText: 'Type the question pattern for "what time" in Hiragana:',
        options: [],
        answer: "なんじ",
        hint: "Nan (what/how many) + ji (hour) -> なんじ.",
      },
    ],
  },
  {
    id: "n5-u5-l4",
    level: "N5",
    unitId: "n5-u5",
    unitTitle: "Unit 5: Schedule and Time (Ji, Fun, Nan-ji, ~kara ~made) ⏰",
    unitDescription:
      "Learn how to read hours, minutes, ask for daily time, and activity duration.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Daily Activity Schedule App",
    description:
      "Latih percakapan tentang jam kerja, jam sekolah, dan waktu tidur sehari-hari.",
    expReward: 20,
    icon: "🗣️",
    badge: "Conversation",
    questions: [
      {
        id: "n5-u5-l4-q1",
        type: "multiple-choice",
        questionText:
          'Your conversation partner asks "いま何時ですか。" (Ima nan-ji desu ka?) The clock shows 8:00 AM. Which answer is correct?',
        options: [
          "ごぜん八時です (gozen hachi-ji desu)",
          "ごご八時です (gogo hachi-ji desu)",
          "八分です (hachi-fun desu)",
          "八時から五時までです (hachi-ji kara go-ji made desu)",
        ],
        answer: "ごぜん八時です (gozen hachi-ji desu)",
        hint: "Morning uses Gozen (ごぜん). The number 8 is hachi.",
      },
      {
        id: "n5-u5-l4-q2",
        type: "fill-in-the-blank",
        questionText:
          'Someone asks when work starts: "かいしゃは何時からですか。" You want to reply "Starts at 9." Complete the sentence: \n「___時から来ます。」',
        options: ["九 (ku/kyuu)", "七 (shichi)", "四 (yo/yon)", "八 (hachi)"],
        answer: "九 (ku/kyuu)",
        hint: '9 o\'clock is pronounced specially as "ku-ji" (九時).',
      },
      {
        id: "n5-u5-l4-q3",
        type: "listening",
        questionText: "Listen to the audio and choose the speaker's bedtime!",
        audioText: "十一時にねます",
        options: ["Sleep at 11", "Sleep at 10", "Wake up at 11", "Sleep at 12"],
        answer: "Sleep at 11",
        hint: "Juu-ichi-ji (11 o'clock) + ni (at) + nemasu (sleep).",
      },
      {
        id: "n5-u5-l4-q4",
        type: "sentence-builder",
        questionText: 'Arrange the dialogue sentence: "What time is it now?"',
        options: ["いま", "は", "何時", "です", "か"],
        answer: "いま は 何時 です か",
        hint: "Ima + wa + nan-ji + desu + ka.",
      },
      {
        id: "n5-u5-l4-q5",
        type: "typing",
        questionText:
          'Type the English translation for the verb "ねます" (nemasu):',
        options: [],
        answer: "sleep",
        hint: "The action of resting at night.",
      },
    ],
  },
  {
    id: "n5-u5-l5",
    level: "N5",
    unitId: "n5-u5",
    unitTitle: "Unit 5: Schedule and Time (Ji, Fun, Nan-ji, ~kara ~made) ⏰",
    unitDescription:
      "Learn how to read hours, minutes, ask for daily time, and activity duration.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Unit 5 Final Challenge",
    description:
      "Test your proficiency in reading time and scheduling daily activities.",
    expReward: 30,
    icon: "🏆",
    badge: "Synthesis",
    questions: [
      {
        id: "n5-u5-l5-q1",
        type: "multiple-choice",
        questionText: "How do you say 4 PM in Japanese:",
        options: [
          "ごごよじ (gogo yo-ji)",
          "ごごよんじ (gogo yon-ji)",
          "ごぜんよじ (gozen yo-ji)",
          "ごぜんよんじ (gozen yon-ji)",
        ],
        answer: "ごごよじ (gogo yo-ji)",
        hint: "4 o'clock is pronounced specially as 'yo-ji'. Afternoon/PM is 'gogo'.",
      },
      {
        id: "n5-u5-l5-q2",
        type: "multiple-choice",
        questionText: 'Which time expression is read as "いま" (ima)?',
        options: ["今", "時", "分", "日"],
        answer: "今",
        hint: "The Kanji for now/current.",
      },
      {
        id: "n5-u5-l5-q3",
        type: "fill-in-the-blank",
        questionText:
          'Complete the sentence "The shop is open from 8 o\'clock": \n「みせは八時 ___ です。」',
        options: ["から (kara)", "まで (made)", "に (ni)", "を (wo)"],
        answer: "から (kara)",
        hint: "Kara means 'from' or 'starting from'.",
      },
      {
        id: "n5-u5-l5-q4",
        type: "multiple-choice",
        questionText:
          'What is the correct pronunciation of "7 o\'clock" in Japanese?',
        options: [
          "しちじ (shichi-ji)",
          "ななじ (nana-ji)",
          "ひちじ (hichi-ji)",
          "ななじかん (nana-jikan)",
        ],
        answer: "しちじ (shichi-ji)",
        hint: "7 o'clock is read as shichi-ji.",
      },
      {
        id: "n5-u5-l5-q5",
        type: "multiple-choice",
        questionText:
          'What is the meaning of the pattern "~from~until" (~kara ~made)?',
        options: [
          "From... to...",
          "Before... after...",
          "At... to...",
          "With... together...",
        ],
        answer: "From... to...",
        hint: "Indicates start and end.",
      },
      {
        id: "n5-u5-l5-q6",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "I sleep at 10 o\'clock."',
        options: ["わたし", "は", "十時", "に", "ねます"],
        answer: "わたし は 十時 に ねます",
        hint: "Subject + wa + time + particle ni + nemasu.",
      },
      {
        id: "n5-u5-l5-q7",
        type: "listening",
        questionText:
          "Listen to the audio and choose the speaker's wake-up time!",
        audioText: "ろくじにおきます",
        options: ["Wake up at 6", "Wake up at 7", "Sleep at 6", "Go at 6"],
        answer: "Wake up at 6",
        hint: "Roku-ji (6 o'clock) + ni + okimasu (wake up).",
      },
      {
        id: "n5-u5-l5-q8",
        type: "fill-in-the-blank",
        questionText:
          "Complete the blank in the hour question sentence: \n「いま ___ 時ですか。」",
        options: ["何 (nan)", "どこ (doko)", "だれ (dare)", "いつ (itsu)"],
        answer: "何 (nan)",
        hint: "The combination of 'nan' + 'ji' (何時) means what time.",
      },
      {
        id: "n5-u5-l5-q9",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "Work starts at 8 AM."',
        options: ["ごぜん八時", "から", "はたらきます"],
        answer: "ごぜん八時 から はたらきます",
        hint: "Gozen hachi-ji + kara + hatarakimasu (work).",
      },
      {
        id: "n5-u5-l5-q10",
        type: "typing",
        questionText:
          'Type the English translation for the verb "おきます" (okimasu):',
        options: [],
        answer: "wake up",
        hint: "The action of waking up in the morning.",
      },
    ],
  },
  {
    id: "n5-u6-l1",
    level: "N5",
    unitId: "n5-u6",
    unitTitle:
      "Unit 6: Public Transportation (Kippu, Chikatetsu, Bus, ~de ikimasu) 🚌",
    unitDescription:
      "Master vehicle vocabulary, buying tickets, and stating travel modes using the means particle.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Transportation & Tickets Vocabulary",
    description:
      "Kuasai kata-kata perjalanan: densha, bus, chikatetsu, taxi, kippu, dan kata kerja perpindahan.",
    expReward: 20,
    icon: "🚌",
    badge: "Vocabulary",
    questions: [
      {
        id: "n5-u6-l1-q1",
        type: "multiple-choice",
        questionText: 'The vehicle vocabulary "電車" (densha) means:',
        options: ["Electric Train", "City Bus", "Taxi", "Pesawat Terbang"],
        answer: "Electric Train",
        hint: "The most popular rail public transportation mode in urban Japan.",
      },
      {
        id: "n5-u6-l1-q2",
        type: "typing",
        questionText: 'Type the word for "Travel Ticket" in Hiragana:',
        options: [],
        answer: "きっぷ",
        hint: "Kippu -> きっぷ (menggunakan sokuon kecil tsu).",
      },
      {
        id: "n5-u6-l1-q3",
        type: "listening",
        questionText:
          "Listen to the audio vehicle and choose the correct Katakana spelling!",
        audioText: "バス",
        options: [
          "バス (basu)",
          "タクシー (takushii)",
          "ヘリコプター (herikoputaa)",
          "バイク (baiku)",
        ],
        answer: "バス (basu)",
        hint: "City bus is written in Katakana as basu.",
      },
      {
        id: "n5-u6-l1-q4",
        type: "fill-in-the-blank",
        questionText:
          'Complete the verb of movement to express "come": \n「ともだちがうちへ ___ ます。」',
        options: ["き (ki)", "いき (iki)", "かえり (kaeri)", "nomi"],
        answer: "き (ki)",
        hint: "Kimasu means come (here).",
      },
      {
        id: "n5-u6-l1-q5",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "Board the train (densha)."',
        options: ["電車", "に", "のります"],
        answer: "電車 に のります",
        hint: "Densha (train) + boarding particle 'ni' + norimasu (ride).",
      },
    ],
  },
  {
    id: "n5-u6-l2",
    level: "N5",
    unitId: "n5-u6",
    unitTitle:
      "Unit 6: Public Transportation (Kippu, Chikatetsu, Bus, ~de ikimasu) 🚌",
    unitDescription:
      "Master vehicle vocabulary, buying tickets, and stating travel modes using the means particle.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Kanji Movement & Vehicles",
    description:
      "Kuasai Kanji 車 (kendaraan/mobil), 行 (pergi), dan 来 (datang).",
    expReward: 20,
    icon: "🚶",
    badge: "Kanji",
    questions: [
      {
        id: "n5-u6-l2-q1",
        type: "multiple-choice",
        questionText:
          'Which is the correct Kunyomi reading for the vehicle/car Kanji "車"?',
        options: [
          "くるま (kuruma)",
          "でんしゃ (densha)",
          "じてんしゃ (jitensha)",
          "ばしゃ (basha)",
        ],
        answer: "くるま (kuruma)",
        hint: "Kuruma means car/wheeled vehicle.",
      },
      {
        id: "n5-u6-l2-q2",
        type: "multiple-choice",
        questionText: 'The Kanji "行" has the basic movement meaning of:',
        options: ["Go", "Come", "Pulang", "Lari"],
        answer: "Go",
        hint: "Used in the verb 'ikimasu' (go).",
      },
      {
        id: "n5-u6-l2-q3",
        type: "listening",
        questionText:
          "Listen to the audio pronunciation of the movement Kanji and determine its meaning!",
        audioText: "きます",
        options: ["Come", "Go", "Pulang", "Eat"],
        answer: "Come",
        hint: "Onyomi/Kunyomi of the Kanji 来 (rai/ki).",
      },
      {
        id: "n5-u6-l2-q4",
        type: "typing",
        questionText:
          'Type the Hiragana reading for the following verb "go": 行きます',
        options: [],
        answer: "いきます",
        hint: "Ikimasu is written with Hiragana.",
      },
      {
        id: "n5-u6-l2-q5",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "The car (kuruma) is coming."',
        options: ["車", "が", "来ます"],
        answer: "車 が 来ます",
        hint: "Kuruma + partikel ga + kimasu.",
      },
    ],
  },
  {
    id: "n5-u6-l3",
    level: "N5",
    unitId: "n5-u6",
    unitTitle:
      "Unit 6: Public Transportation (Kippu, Chikatetsu, Bus, ~de ikimasu) 🚌",
    unitDescription:
      "Master vehicle vocabulary, buying tickets, and stating travel modes using the means particle.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Grammar Means Particle ~de",
    description:
      "Learn the function of the particle ~de to mark means of transport in travel sentences.",
    expReward: 20,
    icon: "📝",
    badge: "Grammar",
    questions: [
      {
        id: "n5-u6-l3-q1",
        type: "multiple-choice",
        questionText:
          "Which particle is used to express the mode of transportation (by/with)?",
        options: ["で (de)", "に (ni)", "を (wo)", "へ (he)"],
        answer: "で (de)",
        hint: "Pattern: [Vehicle] + de + ikimasu.",
      },
      {
        id: "n5-u6-l3-q2",
        type: "fill-in-the-blank",
        questionText:
          'Complete the direction particle for the journey: "Go to Tokyo by train": \n「電車で東京 ___ 行きます。」',
        options: ["へ (dibaca e)", "で", "を", "が"],
        answer: "へ (dibaca e)",
        hint: "The particle へ (he/read as e) is used to mark the direction/destination of movement.",
      },
      {
        id: "n5-u6-l3-q3",
        type: "listening",
        questionText:
          "Listen to the pronunciation of the sentence and choose its meaning!",
        audioText: "タクシーでいきます",
        options: [
          "Go by taxi",
          "Come by taxi",
          "Take a taxi at the station",
          "Pay the taxi fare",
        ],
        answer: "Go by taxi",
        hint: "Takushii (taxi) + de (by) + ikimasu (go).",
      },
      {
        id: "n5-u6-l3-q4",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "Go to school by bus."',
        options: ["バス", "で", "がっこう", "へ", "いきます"],
        answer: "バス で がっこう へ いきます",
        hint: "Basu + de + gakkou + he + ikimasu.",
      },
      {
        id: "n5-u6-l3-q5",
        type: "typing",
        questionText:
          'Type the direction particle read as "e" but written with Hiragana:',
        options: [],
        answer: "へ",
        hint: "The Hiragana letter 'he'.",
      },
    ],
  },
  {
    id: "n5-u6-l4",
    level: "N5",
    unitId: "n5-u6",
    unitTitle:
      "Unit 6: Public Transportation (Kippu, Chikatetsu, Bus, ~de ikimasu) 🚌",
    unitDescription:
      "Master vehicle vocabulary, buying tickets, and stating travel modes using the means particle.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Train & Bus Riding App",
    description:
      "Practice conversations about buying tickets at vending machines and asking for stop locations.",
    expReward: 20,
    icon: "🗣️",
    badge: "Conversation",
    questions: [
      {
        id: "n5-u6-l4-q1",
        type: "multiple-choice",
        questionText:
          "You want to buy one train ticket. Which sentence should you say at the ticket counter?",
        options: [
          "きっぷをひとつください (kippu wo hitotsu kudasai)",
          "きっぷをふたつください (kippu wo futatsu kudasai)",
          "きっぷがありますか (kippu ga arimasu ka)",
          "きっぷはいくらですか (kippu wa ikura desu ka)",
        ],
        answer: "きっぷをひとつください (kippu wo hitotsu kudasai)",
        hint: "Kippu (tiket) + wo + hitotsu (satu lembar) + kudasai (tolong berikan).",
      },
      {
        id: "n5-u6-l4-q2",
        type: "fill-in-the-blank",
        questionText:
          'Someone asks where the bus stop is: "バスのりばはどこですか。" You reply "The bus stop is at the station." Complete the sentence: \n「バスのりばは ___ です。」',
        options: [
          "駅 (eki)",
          "ホテル (hoteru)",
          "トイレ (toire)",
          "コンビニ (konbini)",
        ],
        answer: "駅 (eki)",
        hint: "Eki means train station.",
      },
      {
        id: "n5-u6-l4-q3",
        type: "listening",
        questionText:
          "Listen to the conversation audio and determine the mode of transportation mentioned!",
        audioText: "ちかてつでいきましょう",
        options: ["Subway", "Regular train", "City bus", "On foot"],
        answer: "Subway",
        hint: "Chikatetsu means underground train (subway).",
      },
      {
        id: "n5-u6-l4-q4",
        type: "sentence-builder",
        questionText:
          'Arrange the dialogue sentence: "Please give me two tickets."',
        options: ["きっぷ", "を", "ふたつ", "ください"],
        answer: "きっぷ を ふたつ ください",
        hint: "Kippu + wo + futatsu (2) + kudasai.",
      },
      {
        id: "n5-u6-l4-q5",
        type: "typing",
        questionText:
          'Type the English translation for the question word "なんの" (example: nanno noriba -> what kind of platform/stop?):',
        options: [],
        answer: "apa",
        hint: "Asking for the type/kind of the following noun.",
      },
    ],
  },
  {
    id: "n5-u6-l5",
    level: "N5",
    unitId: "n5-u6",
    unitTitle:
      "Unit 6: Public Transportation (Kippu, Chikatetsu, Bus, ~de ikimasu) 🚌",
    unitDescription:
      "Master vehicle vocabulary, buying tickets, and stating travel modes using the means particle.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Unit 6 Final Challenge",
    description:
      "Test your competency in traveling using public transportation.",
    expReward: 30,
    icon: "🏆",
    badge: "Synthesis",
    questions: [
      {
        id: "n5-u6-l5-q1",
        type: "multiple-choice",
        questionText: "What is subway called in Japanese?",
        options: [
          "ちかてつ (chikatetsu)",
          "でんしゃ (densha)",
          "バス (basu)",
          "タクシー (takushii)",
        ],
        answer: "ちかてつ (chikatetsu)",
        hint: "Japanese subway.",
      },
      {
        id: "n5-u6-l5-q2",
        type: "multiple-choice",
        questionText: 'Which is the correct reading of the Kanji "車"?',
        options: ["くるま (kuruma)", "しゃ (sha)", "い (i)", "らい (rai)"],
        answer: "くるま (kuruma)",
        hint: "Kunyomi of the car Kanji.",
      },
      {
        id: "n5-u6-l5-q3",
        type: "fill-in-the-blank",
        questionText:
          'Complete the blank: "Go by taxi": \n「タクシー ___ 行きます。」',
        options: ["で (de)", "を (wo)", "に (ni)", "が (ga)"],
        answer: "で (de)",
        hint: "Partikel penanda sarana alat.",
      },
      {
        id: "n5-u6-l5-q4",
        type: "multiple-choice",
        questionText:
          'What does the movement verb "帰ります" (kaerimasu) mean?',
        options: ["Pulang", "Go", "Come", "Board / Ride"],
        answer: "Pulang",
        hint: "Go back home or to one's country.",
      },
      {
        id: "n5-u6-l5-q5",
        type: "multiple-choice",
        questionText: 'How do you say "Please give me one ticket" politely?',
        options: [
          "きっぷをひとつください",
          "きっぷはいくらですか",
          "きっぷはあそこです",
          "きっぷをのります",
        ],
        answer: "きっぷをひとつください",
        hint: "Kippu + objek + hitotsu + kudasai.",
      },
      {
        id: "n5-u6-l5-q6",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "Go to the station by car."',
        options: ["車", "で", "駅", "へ", "行きます"],
        answer: "車 で 駅 へ 行きます",
        hint: "Kuruma de + eki he + ikimasu.",
      },
      {
        id: "n5-u6-l5-q7",
        type: "listening",
        questionText:
          "Listen to the audio and choose the speaker's destination!",
        audioText: "くるまでいきます",
        options: ["Go by car", "Go by train", "Come by car", "Buy a new car"],
        answer: "Go by car",
        hint: "Kuruma de ikimasu.",
      },
      {
        id: "n5-u6-l5-q8",
        type: "fill-in-the-blank",
        questionText:
          "Complete the travel direction blank: \n「日本 ___ 来ました。(Came to Japan.)」",
        options: ["へ", "で", "を", "が"],
        answer: "へ",
        hint: "Partikel penunjuk arah perjalanan 'he'.",
      },
      {
        id: "n5-u6-l5-q9",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "I came by city bus."',
        options: ["わたし", "は", "バス", "で", "来ました"],
        answer: "わたし は バス で 来ました",
        hint: "Watashi wa + basu de + kimashita.",
      },
      {
        id: "n5-u6-l5-q10",
        type: "typing",
        questionText:
          'Type the English translation of the noun "じてんしゃ" (jitensha):',
        options: [],
        answer: "bicycle",
        hint: "Kendaraan beroda dua tanpa mesin yang dikayuh.",
      },
    ],
  },
  {
    id: "n5-u7-l1",
    level: "N5",
    unitId: "n5-u7",
    unitTitle:
      "Unit 7: Hotel Check-in & Presence of Objects (~ga arimasu/imasu) 🏨",
    unitDescription:
      "Master vocabulary for hotel rooms, keys, and stating the existence of inanimate objects and living things around you.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Room Facilities & Hotel Goods Vocabulary",
    description:
      "Kuasai kata benda penting: heya (kamar), kagi (kunci), pasupooto (paspor), dan kata hewan neko, inu.",
    expReward: 20,
    icon: "🏨",
    badge: "Vocabulary",
    questions: [
      {
        id: "n5-u7-l1-q1",
        type: "multiple-choice",
        questionText: 'Which vocabulary word means "Room" in Japanese?',
        options: [
          "へや (heya)",
          "かぎ (kagi)",
          "ベッド (beddo)",
          "おふろ (ofuro)",
        ],
        answer: "へや (heya)",
        hint: "Often written with the Kanji: 部屋.",
      },
      {
        id: "n5-u7-l1-q2",
        type: "typing",
        questionText: 'Type the word for "Key" in Hiragana:',
        options: [],
        answer: "かぎ",
        hint: "Kagi -> かぎ.",
      },
      {
        id: "n5-u7-l1-q3",
        type: "listening",
        questionText:
          "Listen to the audio word and choose the correct translation!",
        audioText: "パスポート",
        options: ["Passport", "Hotel room", "Hotel key", "Dompet"],
        answer: "Passport",
        hint: "Dokumen perjalanan resmi luar negeri (Pasupooto).",
      },
      {
        id: "n5-u7-l1-q4",
        type: "fill-in-the-blank",
        questionText:
          "Complete the blank for the living noun cat: \n「へやに ___ がいます。(There is a cat in the room.)」",
        options: [
          "ねこ (neko)",
          "いぬ (inu)",
          "つくえ (tsukue)",
          "かぎ (kagi)",
        ],
        answer: "ねこ (neko)",
        hint: "Hewan lucu berbulu mengeong.",
      },
      {
        id: "n5-u7-l1-q5",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "There is a passport here."',
        options: ["パスポート", "が", "あります"],
        answer: "パスポート が あります",
        hint: "Pasupooto + partikel ga + arimasu.",
      },
    ],
  },
  {
    id: "n5-u7-l2",
    level: "N5",
    unitId: "n5-u7",
    unitTitle:
      "Unit 7: Hotel Check-in & Presence of Objects (~ga arimasu/imasu) 🏨",
    unitDescription:
      "Master vocabulary for hotel rooms, keys, and stating the existence of inanimate objects and living things around you.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Kanji Position & Existence",
    description: "Kuasai Kanji 中 (dalam), 外 (luar), dan 友 (teman).",
    expReward: 20,
    icon: "📦",
    badge: "Kanji",
    questions: [
      {
        id: "n5-u7-l2-q1",
        type: "multiple-choice",
        questionText:
          'Which is the correct Kunyomi reading for the Kanji "中" (inside/middle)?',
        options: ["なか (naka)", "そと (soto)", "うえ (ue)", "した (shita)"],
        answer: "なか (naka)",
        hint: "Naka berarti bagian dalam atau tengah.",
      },
      {
        id: "n5-u7-l2-q2",
        type: "multiple-choice",
        questionText:
          'Which is the correct Kunyomi reading for the Kanji "外" (outside)?',
        options: [
          "そと (soto)",
          "なか (naka)",
          "となり (tonari)",
          "よこ (yoko)",
        ],
        answer: "そと (soto)",
        hint: "Soto berarti bagian luar.",
      },
      {
        id: "n5-u7-l2-q3",
        type: "listening",
        questionText:
          "Listen to the audio pronunciation of the Kanji and choose its meaning!",
        audioText: "ともだち",
        options: ["Friend", "Room", "Key", "Hotel staff"],
        answer: "Friend",
        hint: "Kunyomi of the Kanji 友 (tomo) -> Tomodachi.",
      },
      {
        id: "n5-u7-l2-q4",
        type: "typing",
        questionText:
          "Type the Hiragana reading for the middle Kanji: 部屋の中 (Inside the room)",
        options: [],
        answer: "へやのなか",
        hint: "Heya + no + naka -> へやのなか.",
      },
      {
        id: "n5-u7-l2-q5",
        type: "sentence-builder",
        questionText:
          'Arrange the sentence: "My friend (tomodachi) is outside."',
        options: ["友だち", "は", "外", "に", "います"],
        answer: "友だち は 外 に います",
        hint: "Tomodachi wa + soto ni + imasu.",
      },
    ],
  },
  {
    id: "n5-u7-l3",
    level: "N5",
    unitId: "n5-u7",
    unitTitle:
      "Unit 7: Hotel Check-in & Presence of Objects (~ga arimasu/imasu) 🏨",
    unitDescription:
      "Master vocabulary for hotel rooms, keys, and stating the existence of inanimate objects and living things around you.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Grammar ~ga arimasu & imasu",
    description:
      "Learn the basic differences between the existence pattern of arimasu (inanimate) vs imasu (living things).",
    expReward: 20,
    icon: "📝",
    badge: "Grammar",
    questions: [
      {
        id: "n5-u7-l3-q1",
        type: "multiple-choice",
        questionText:
          'Which existence verb is used to express "There is a cat (living creature)"?',
        options: [
          "います (imasu)",
          "あります (arimasu)",
          "おきます (okimasu)",
          "のります (norimasu)",
        ],
        answer: "います (imasu)",
        hint: "Neko (cat) is an animal, so use imasu.",
      },
      {
        id: "n5-u7-l3-q2",
        type: "fill-in-the-blank",
        questionText:
          'Complete the correct existence verb: "There is a passport (inanimate object) in the room": \n「部屋にパスポートが ___ 。」',
        options: [
          "あります (arimasu)",
          "います (imasu)",
          "きます (kimasu)",
          "いきます (ikimasu)",
        ],
        answer: "あります (arimasu)",
        hint: "Passport is an inanimate object, so use arimasu.",
      },
      {
        id: "n5-u7-l3-q3",
        type: "listening",
        questionText:
          "Listen to the pronunciation of the sentence and choose its meaning!",
        audioText: "へやにともだちがいます",
        options: [
          "There is a friend in the room",
          "There is a friend outside",
          "I go to a friend's room",
          "A friend comes to the room",
        ],
        answer: "There is a friend in the room",
        hint: "Heya ni (in the room) + tomodachi ga (friend) + imasu (exist).",
      },
      {
        id: "n5-u7-l3-q4",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "There is a cat inside the room."',
        options: ["部屋の", "中に", "ねこ", "が", "います"],
        answer: "部屋の 中に ねこ が います",
        hint: "Heya no naka ni + neko ga + imasu.",
      },
      {
        id: "n5-u7-l3-q5",
        type: "typing",
        questionText:
          'Type the formal negative form (there is not) of the existence verb for inanimate objects "あります":',
        options: [],
        answer: "ありません",
        hint: "Arimasu berubah menjadi arimasen.",
      },
    ],
  },
  {
    id: "n5-u7-l4",
    level: "N5",
    unitId: "n5-u7",
    unitTitle:
      "Unit 7: Hotel Check-in & Presence of Objects (~ga arimasu/imasu) 🏨",
    unitDescription:
      "Master vocabulary for hotel rooms, keys, and stating the existence of inanimate objects and living things around you.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Hotel Check-in App",
    description:
      "Latih dialog check-in resepsionis hotel, meminta kunci kamar, dan menanyakan fasilitas.",
    expReward: 20,
    icon: "🗣️",
    badge: "Conversation",
    questions: [
      {
        id: "n5-u7-l4-q1",
        type: "multiple-choice",
        questionText:
          'The hotel receptionist asks for your passport: "パスポートをお願いします。" Which action/response is correct?',
        options: [
          "はい、どうぞ (hai, douzo - Sambil menyerahkan paspor)",
          "ありがとうございます (arigatou gozaimasu)",
          "すみません、ありません (sumimasen, arimasen)",
          "いいえ、ちがいます (iie, chigaimasu)",
        ],
        answer: "はい、どうぞ (hai, douzo - Sambil menyerahkan paspor)",
        hint: "Hai, douzo is used when giving something to others.",
      },
      {
        id: "n5-u7-l4-q2",
        type: "fill-in-the-blank",
        questionText:
          'You want to ask for your room key at the hotel reception: "部屋のかぎは ___ ですか。"',
        options: ["どこ", "だれ", "なん", "いくつ"],
        answer: "どこ",
        hint: "Doko desu ka means 'where'.",
      },
      {
        id: "n5-u7-l4-q3",
        type: "listening",
        questionText:
          "Listen to the conversation audio and choose the meaning of the object mentioned!",
        audioText: "かぎがありますか？はい、ここにあります。",
        options: [
          "Is there a key? Yes, there is here.",
          "Is there a room? Yes, there is here.",
          "Is there a passport? No, there is none.",
          "Is the key lost? No.",
        ],
        answer: "Is there a key? Yes, there is here.",
        hint: "Kagi (key) + arimasu ka (is there) + koko (here).",
      },
      {
        id: "n5-u7-l4-q4",
        type: "sentence-builder",
        questionText:
          'Arrange the dialogue sentence: "Please give me the room key."',
        options: ["部屋の", "かぎ", "を", "ください"],
        answer: "部屋の かぎ を ください",
        hint: "Heya no kagi (room key) + wo (object particle) + kudasai (please).",
      },
      {
        id: "n5-u7-l4-q5",
        type: "typing",
        questionText:
          'Type the English translation for the hand-over phrase "はい、どうぞ":',
        options: [],
        answer: "ya silakan",
        hint: 'Atau "ini, silakan".',
      },
    ],
  },
  {
    id: "n5-u7-l5",
    level: "N5",
    unitId: "n5-u7",
    unitTitle:
      "Unit 7: Hotel Check-in & Presence of Objects (~ga arimasu/imasu) 🏨",
    unitDescription:
      "Master vocabulary for hotel rooms, keys, and stating the existence of inanimate objects and living things around you.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Unit 7 Final Challenge",
    description:
      "Test your understanding of hotel check-in and mastery of arimasu/imasu.",
    expReward: 30,
    icon: "🏆",
    badge: "Synthesis",
    questions: [
      {
        id: "n5-u7-l5-q1",
        type: "multiple-choice",
        questionText:
          'The correct existence verb to express "There is a dog (living creature)" is:',
        options: [
          "います (imasu)",
          "あります (arimasu)",
          "きます (kimasu)",
          "ねます (nemasu)",
        ],
        answer: "います (imasu)",
        hint: "Dog (inu) is a living creature.",
      },
      {
        id: "n5-u7-l5-q2",
        type: "multiple-choice",
        questionText: "What is a hotel room called in Japanese?",
        options: [
          "へya (heya)",
          "かgi (kagi)",
          "うみ (umi)",
          "まtsuri (matsuri)",
        ],
        answer: "へya (heya)",
        hint: "Dibaca heya.",
      },
      {
        id: "n5-u7-l5-q3",
        type: "fill-in-the-blank",
        questionText:
          'Complete the existence blank: "There is a key inside the room": \n「部屋の中にかぎ ___ あります。」',
        options: ["が (ga)", "を (wo)", "は (wa)", "に (ni)"],
        answer: "が (ga)",
        hint: "Subjek penanda keberadaan di depan arimasu/imasu menggunakan partikel ga.",
      },
      {
        id: "n5-u7-l5-q4",
        type: "multiple-choice",
        questionText:
          'What is the Kunyomi meaning of the Kanji character "中"?',
        options: ["Dalam", "Luar", "Atas", "Bawah"],
        answer: "Dalam",
        hint: "Dibaca 'naka' yang berarti dalam/tengah.",
      },
      {
        id: "n5-u7-l5-q5",
        type: "multiple-choice",
        questionText:
          'What is the Kunyomi meaning of the Kanji character "外"?',
        options: ["Luar", "Dalam", "Kanan", "Kiri"],
        answer: "Luar",
        hint: "Dibaca 'soto'.",
      },
      {
        id: "n5-u7-l5-q6",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "There is a cat inside the room."',
        options: ["部屋の", "中に", "ねco", "が", "います"],
        answer: "部屋の 中に ねco が います",
        hint: "Heya (room) + particle 'no' (of) + naka (inside) + ni (in) + neko (cat) + ga + imasu (exist).",
      },
      {
        id: "n5-u7-l5-q7",
        type: "listening",
        questionText: "Listen to the audio and choose the correct translation!",
        audioText: "パスポートがありません",
        options: [
          "There is no passport",
          "There is a passport",
          "My passport is lost",
          "Membawa paspor",
        ],
        answer: "There is no passport",
        hint: "Pasupooto ga arimasen.",
      },
      {
        id: "n5-u7-l5-q8",
        type: "fill-in-the-blank",
        questionText:
          "Complete the check-in dialogue blank: \nA: 「パスポートをお願いします。」\nB: 「はい、___ 。」",
        options: ["どうぞ", "はじめまして", "ありがとう", "こんにちは"],
        answer: "どうぞ",
        hint: "Hai, douzo.",
      },
      {
        id: "n5-u7-l5-q9",
        type: "sentence-builder",
        questionText:
          'Arrange the sentence: "There is a friend outside the room."',
        options: ["部屋の", "外に", "友だち", "が", "います"],
        answer: "部屋の 外に 友だち が います",
        hint: "Heya no soto ni + tomodachi ga + imasu.",
      },
      {
        id: "n5-u7-l5-q10",
        type: "typing",
        questionText: 'Type the English translation of the noun "かぎ" (kagi):',
        options: [],
        answer: "key",
        hint: "A metal tool to open doors or locks.",
      },
    ],
  },
  {
    id: "n5-u8-l1",
    level: "N5",
    unitId: "n5-u8",
    unitTitle: "Unit 8: Family Members (Kazoku, Chichi, Haha, ~nin desu) 👨‍👩‍👧‍👦",
    unitDescription:
      "Learn how to name family members and state the number of people in a family.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Family Members Vocabulary",
    description:
      "Kuasai kata anggota keluarga sendiri: chichi (ayah), haha (ibu), kazoku (keluarga), kyoudai, otouto, imouto.",
    expReward: 20,
    icon: "👨‍👩‍👧‍👦",
    badge: "Vocabulary",
    questions: [
      {
        id: "n5-u8-l1-q1",
        type: "multiple-choice",
        questionText:
          "How do you refer to your own mother when speaking to others in Japanese?",
        options: [
          "はは (haha)",
          "おかあさん (okaasan)",
          "ちち (chichi)",
          "おとうさん (otousan)",
        ],
        answer: "はは (haha)",
        hint: "Haha is used to refer to one's own mother when speaking to outsiders.",
      },
      {
        id: "n5-u8-l1-q2",
        type: "typing",
        questionText: 'Type the word for "Family" in Hiragana:',
        options: [],
        answer: "かぞく",
        hint: "Kazoku -> かぞく.",
      },
      {
        id: "n5-u8-l1-q3",
        type: "listening",
        questionText:
          "Listen to the family member audio and determine the meaning!",
        audioText: "ちち",
        options: [
          "My father",
          "My mother",
          "Younger brother",
          "Younger sister",
        ],
        answer: "My father",
        hint: "Chichi is used to refer to one's own father.",
      },
      {
        id: "n5-u8-l1-q4",
        type: "fill-in-the-blank",
        questionText:
          "Complete the blank to refer to your younger brother: \n「わたしには ___ がいます。(I have a younger brother.)」",
        options: [
          "おとうと (otouto)",
          "いもうと (imouto)",
          "あに (ani)",
          "あね (ane)",
        ],
        answer: "おとうと (otouto)",
        hint: "Otouto means younger brother.",
      },
      {
        id: "n5-u8-l1-q5",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "There is a family."',
        options: ["かぞく", "が", "います"],
        answer: "かぞく が います",
        hint: "Kazoku + partikel ga + imasu (makhluk hidup).",
      },
    ],
  },
  {
    id: "n5-u8-l2",
    level: "N5",
    unitId: "n5-u8",
    unitTitle: "Unit 8: Family Members (Kazoku, Chichi, Haha, ~nin desu) 👨‍👩‍👧‍👦",
    unitDescription:
      "Learn how to name family members and state the number of people in a family.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Kanji Family Relations",
    description: "Kuasai Kanji 父 (ayah), 母 (ibu), dan 子 (anak).",
    expReward: 20,
    icon: "👨‍👩‍👧‍👦",
    badge: "Kanji",
    questions: [
      {
        id: "n5-u8-l2-q1",
        type: "multiple-choice",
        questionText:
          'Which is the correct Kunyomi reading for the father Kanji "父"?',
        options: [
          "ちち (chichi)",
          "はは (haha)",
          "あに (ani)",
          "おとうと (otouto)",
        ],
        answer: "ちち (chichi)",
        hint: "Chichi is read as one's own father.",
      },
      {
        id: "n5-u8-l2-q2",
        type: "multiple-choice",
        questionText:
          'Which is the correct Kunyomi reading for the mother Kanji "母"?',
        options: [
          "はは (haha)",
          "ちち (chichi)",
          "あね (ane)",
          "いもうto (imouto)",
        ],
        answer: "はは (haha)",
        hint: "Haha is read as one's own mother.",
      },
      {
        id: "n5-u8-l2-q3",
        type: "listening",
        questionText:
          "Listen to the audio pronunciation of the family Kanji and choose its meaning!",
        audioText: "こども",
        options: ["Anak", "Parents", "Older sibling", "Younger sibling"],
        answer: "Anak",
        hint: "Kunyomi of the Kanji 子 (ko) + domo -> Kodomo.",
      },
      {
        id: "n5-u8-l2-q4",
        type: "typing",
        questionText: "Type the Hiragana reading for the mother Kanji: 私の母",
        options: [],
        answer: "わたしのはは",
        hint: "Watashi + no + haha -> わたしのはは.",
      },
      {
        id: "n5-u8-l2-q5",
        type: "sentence-builder",
        questionText:
          'Arrange the sentence: "My father (chichi) is in the room."',
        options: ["父", "は", "部屋", "に", "います"],
        answer: "父 は 部屋 に います",
        hint: "Chichi + wa + heya + ni + imasu.",
      },
    ],
  },
  {
    id: "n5-u8-l3",
    level: "N5",
    unitId: "n5-u8",
    unitTitle: "Unit 8: Family Members (Kazoku, Chichi, Haha, ~nin desu) 👨‍👩‍👧‍👦",
    unitDescription:
      "Learn how to name family members and state the number of people in a family.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Grammar Counting People ~nin",
    description:
      "Pelajari cara menghitung jumlah orang (hitori, futari, ~nin) untuk menyatakan anggota keluarga.",
    expReward: 20,
    icon: "📝",
    badge: "Grammar",
    questions: [
      {
        id: "n5-u8-l3-q1",
        type: "multiple-choice",
        questionText:
          'How do you count "one person" and "two people" irregularly in Japanese?',
        options: [
          "ひとり (hitori) and ふたり (futari)",
          "いちにん (ichinin) and ににん (ninin)",
          "ひとつ (hitotsu) and ふたつ (futatsu)",
          "ひだり (hidari) and みぎ (migi)",
        ],
        answer: "ひとり (hitori) and ふたり (futari)",
        hint: "Counting one and two people is irregular.",
      },
      {
        id: "n5-u8-l3-q2",
        type: "fill-in-the-blank",
        questionText:
          'Complete the people counter suffix: "My family is three people": \n「家族 is 三 ___ です。」',
        options: ["人 (nin)", "人 (jin)", "人 (hito)", "つ (tsu)"],
        answer: "人 (nin)",
        hint: "Starting from the number 3, counting people uses the suffix 'nin' (person).",
      },
      {
        id: "n5-u8-l3-q3",
        type: "listening",
        questionText:
          "Listen to the pronunciation of the sentence and choose its meaning!",
        audioText: "あねがふたりいます",
        options: [
          "Have two older sisters",
          "Have two younger sisters",
          "I have one older sister",
          "There are two younger brothers",
        ],
        answer: "Have two older sisters",
        hint: "Ane (older sister) + ga + futari (2 people) + imasu (have/exist).",
      },
      {
        id: "n5-u8-l3-q4",
        type: "sentence-builder",
        questionText:
          'Arrange the sentence: "My family consists of four people."',
        options: ["家族", "は", "四人", "です"],
        answer: "家族 は 四人 です",
        hint: "Kazoku wa (family is) + yonin (4 people - special reading) + desu.",
      },
      {
        id: "n5-u8-l3-q5",
        type: "typing",
        questionText:
          'Type "four people" in Hiragana (note the special pronunciation):',
        options: [],
        answer: "よにん",
        hint: "Bukan yonin tapi 'yonin' ditulis 'よにん'.",
      },
    ],
  },
  {
    id: "n5-u8-l4",
    level: "N5",
    unitId: "n5-u8",
    unitTitle: "Unit 8: Family Members (Kazoku, Chichi, Haha, ~nin desu) 👨‍👩‍👧‍👦",
    unitDescription:
      "Learn how to name family members and state the number of people in a family.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Family Storytelling App",
    description:
      "Practice conversations introducing your family members and number of siblings to others.",
    expReward: 20,
    icon: "🗣️",
    badge: "Conversation",
    questions: [
      {
        id: "n5-u8-l4-q1",
        type: "multiple-choice",
        questionText:
          'Someone asks your family size: "ご家族は何人ですか。" You want to reply "My family is five people." Which sentence is correct?',
        options: [
          "家族は五人です (kazoku wa go-nin desu)",
          "家族は五つです (kazoku wa itsutsu desu)",
          "家族は五人います (kazoku wa go-nin imasu)",
          "家族は五人から来ました (kazoku wa go-nin kara kimashita)",
        ],
        answer: "家族は五人です (kazoku wa go-nin desu)",
        hint: "Polite nominal response for the number of family members.",
      },
      {
        id: "n5-u8-l4-q2",
        type: "fill-in-the-blank",
        questionText:
          'You want to say "I have one younger sister." Complete the sentence: \n「いもうとが ___ います。」',
        options: [
          "ひとり (hitori)",
          "ひとつ (hitotsu)",
          "ふたり (futari)",
          "一人 (ichinin)",
        ],
        answer: "ひとり (hitori)",
        hint: "One person is hitori (一人).",
      },
      {
        id: "n5-u8-l4-q3",
        type: "listening",
        questionText:
          "Listen to the conversation audio and determine the speaker's family size!",
        audioText: "かぞくはさんにんです",
        options: ["3 people", "4 people", "2 people", "5 people"],
        answer: "3 people",
        hint: "San-nin means 3 people.",
      },
      {
        id: "n5-u8-l4-q4",
        type: "sentence-builder",
        questionText: 'Arrange the dialogue sentence: "My mother and I."',
        options: ["わたし", "と", "はは", "です"],
        answer: "わたし と はは です",
        hint: "Watashi (I) + coordinating particle 'to' (and) + haha (mother) + desu.",
      },
      {
        id: "n5-u8-l4-q5",
        type: "typing",
        questionText:
          'Type the English translation of the noun "きょうだい" (kyoudai):',
        options: [],
        answer: "saudara kandung",
        hint: "Refers to brothers and sisters.",
      },
    ],
  },
  {
    id: "n5-u8-l5",
    level: "N5",
    unitId: "n5-u8",
    unitTitle: "Unit 8: Family Members (Kazoku, Chichi, Haha, ~nin desu) 👨‍👩‍👧‍👦",
    unitDescription:
      "Learn how to name family members and state the number of people in a family.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Unit 8 Final Challenge",
    description:
      "Test your proficiency in introducing family structure and family size.",
    expReward: 30,
    icon: "🏆",
    badge: "Synthesis",
    questions: [
      {
        id: "n5-u8-l5-q1",
        type: "multiple-choice",
        questionText:
          "How do you refer to your own father politely when talking to others?",
        options: [
          "ちち (chichi)",
          "おとうさん (otousan)",
          "はは (haha)",
          "おかあさん (okaasan)",
        ],
        answer: "ちち (chichi)",
        hint: "Chichi is for one's own father.",
      },
      {
        id: "n5-u8-l5-q2",
        type: "multiple-choice",
        questionText: 'The counter suffix for "2 people" is:',
        options: [
          "ふたり (futari)",
          "ひとり (hitori)",
          "ににん (ninin)",
          "にっつ (nittu)",
        ],
        answer: "ふたり (futari)",
        hint: "Futari is read for 2 people.",
      },
      {
        id: "n5-u8-l5-q3",
        type: "fill-in-the-blank",
        questionText:
          'Complete the sentence: "Father is in the room": \n「部屋にちち ___ います。」',
        options: ["が (ga)", "を (wo)", "は (wa)", "に (ni)"],
        answer: "が (ga)",
        hint: "Penanda subjek keberadaan.",
      },
      {
        id: "n5-u8-l5-q4",
        type: "multiple-choice",
        questionText: 'What is the meaning of the Kanji "母"?',
        options: ["Mother", "Father", "Anak", "Friend"],
        answer: "Mother",
        hint: "Dibaca haha.",
      },
      {
        id: "n5-u8-l5-q5",
        type: "multiple-choice",
        questionText: 'What is the meaning of the Kanji "父"?',
        options: ["Father", "Mother", "Younger sibling", "Older sibling"],
        answer: "Father",
        hint: "Dibaca chichi.",
      },
      {
        id: "n5-u8-l5-q6",
        type: "sentence-builder",
        questionText:
          'Arrange the sentence: "My family consists of three people."',
        options: ["家族", "は", "三人", "です"],
        answer: "家族 は 三人 です",
        hint: "Kazoku + wa + san-nin (三人) + desu.",
      },
      {
        id: "n5-u8-l5-q7",
        type: "listening",
        questionText:
          "Listen to the audio and choose the number of younger brothers owned!",
        audioText: "おとうとがひとりいます",
        options: [
          "Have one younger brother",
          "Have two younger brothers",
          "Do not have a younger brother",
          "I have one older brother",
        ],
        answer: "Have one younger brother",
        hint: "Otouto ga hitori imasu.",
      },
      {
        id: "n5-u8-l5-q8",
        type: "fill-in-the-blank",
        questionText:
          'Complete the people counter blank: "My siblings are four people": \n「きょうだいは ___ です。」',
        options: [
          "四人 (yonin)",
          "四人 (yonin)",
          "四人 (yonin)",
          "四人 (yoyin)",
        ],
        answer: "四人 (yonin)",
        hint: "Dibaca 'yonin' ditulis 四人.",
      },
      {
        id: "n5-u8-l5-q9",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "I have two older sisters."',
        options: ["あね", "が", "ふたり", "います"],
        answer: "あね が ふたり います",
        hint: "Ane (older sister) + ga + futari (2 people) + imasu.",
      },
      {
        id: "n5-u8-l5-q10",
        type: "typing",
        questionText:
          'Type the English translation of the noun "いもうと" (imouto):',
        options: [],
        answer: "adik perempuan",
        hint: "Family member who is a younger sister.",
      },
    ],
  },
  {
    id: "n5-u9-l1",
    level: "N5",
    unitId: "n5-u9",
    unitTitle: "Unit 9: Item Ownership (Particle ~no, Dare no) 🎒",
    unitDescription:
      "Master vocabulary for personal belongings, the particle of ownership, and how to ask about the owner of items.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Personal Belongings Vocabulary",
    description:
      "Kuasai kata benda barang: kaban (tas), hon (buku), kasa (payung), keitai (HP), dan kata tanya dare (siapa).",
    expReward: 20,
    icon: "🎒",
    badge: "Vocabulary",
    questions: [
      {
        id: "n5-u9-l1-q1",
        type: "multiple-choice",
        questionText: 'The baggage vocabulary "かばん" (kaban) means:',
        options: ["Bag", "Book", "Umbrella", "Ponsel"],
        answer: "Bag",
        hint: "Portable strapped bag to carry books or items.",
      },
      {
        id: "n5-u9-l1-q2",
        type: "typing",
        questionText: 'Type the word for "Umbrella" in Hiragana:',
        options: [],
        answer: "かさ",
        hint: "Kasa -> かさ.",
      },
      {
        id: "n5-u9-l1-q3",
        type: "listening",
        questionText:
          "Listen to the audio object and choose the correct translation!",
        audioText: "ほん",
        options: ["Book", "Bag", "Ponsel", "Key"],
        answer: "Book",
        hint: "Bahan cetak terjilid dibaca hon.",
      },
      {
        id: "n5-u9-l1-q4",
        type: "fill-in-the-blank",
        questionText:
          "Complete the question word blank: \n「これは ___ のですか。(Whose is this?)」",
        options: ["だれ (dare)", "なん (nan)", "どこ (doko)", "いつ (itsu)"],
        answer: "だれ (dare)",
        hint: "Dare means who.",
      },
      {
        id: "n5-u9-l1-q5",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "The bag is mine."',
        options: ["わたし", "の", "かばん", "です"],
        answer: "わたし の かばん です",
        hint: "Watashi (I) + possessive particle 'no' + kaban (bag) + desu (is).",
      },
    ],
  },
  {
    id: "n5-u9-l2",
    level: "N5",
    unitId: "n5-u9",
    unitTitle: "Unit 9: Item Ownership (Particle ~no, Dare no) 🎒",
    unitDescription:
      "Master vocabulary for personal belongings, the particle of ownership, and how to ask about the owner of items.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Kanji Goods & Titles",
    description: "Kuasai Kanji 本 (buku/asal), 先 (dahulu), dan 生 (hidup).",
    expReward: 20,
    icon: "🎒",
    badge: "Kanji",
    questions: [
      {
        id: "n5-u9-l2-q1",
        type: "multiple-choice",
        questionText:
          'Which is the correct Kunyomi reading for the book Kanji "本"?',
        options: ["ほん (hon)", "もと (moto)", "せん (sen)", "せい (sei)"],
        answer: "ほん (hon)",
        hint: "Read as 'hon' when standing alone as a book.",
      },
      {
        id: "n5-u9-l2-q2",
        type: "multiple-choice",
        questionText: 'The compound Kanji "先生" means:',
        options: ["Teacher / Lecturer", "Siswa", "Friend", "Parents"],
        answer: "Teacher / Lecturer",
        hint: "Written with the Kanji for 'before' (先) and 'life' (生), read as 'sensei'.",
      },
      {
        id: "n5-u9-l2-q3",
        type: "listening",
        questionText:
          "Listen to the audio pronunciation of the Kanji and determine its meaning!",
        audioText: "せんせい",
        options: ["Teacher", "Student", "Book", "Doctor"],
        answer: "Teacher",
        hint: "Sensei means teacher.",
      },
      {
        id: "n5-u9-l2-q4",
        type: "typing",
        questionText: "Type the Hiragana reading for the teacher Kanji: 先生",
        options: [],
        answer: "せんせい",
        hint: "Dibaca sebagai sen-sei.",
      },
      {
        id: "n5-u9-l2-q5",
        type: "sentence-builder",
        questionText:
          'Arrange the sentence: "This is the teacher\'s (sensei) book."',
        options: ["これ", "は", "先生の", "本", "です"],
        answer: "これ は 先生の 本 です",
        hint: "Kore wa + sensei no + hon + desu.",
      },
    ],
  },
  {
    id: "n5-u9-l3",
    level: "N5",
    unitId: "n5-u9",
    unitTitle: "Unit 9: Item Ownership (Particle ~no, Dare no) 🎒",
    unitDescription:
      "Master vocabulary for personal belongings, the particle of ownership, and how to ask about the owner of items.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Grammar Ownership Particle ~no",
    description:
      "Learn how to connect possessive nouns using the particle ~no (A belongs to B).",
    expReward: 20,
    icon: "📝",
    badge: "Grammar",
    questions: [
      {
        id: "n5-u9-l3-q1",
        type: "multiple-choice",
        questionText: "Which particle is used to express possession?",
        options: ["の (no)", "に (ni)", "を (wo)", "は (wa)"],
        answer: "の (no)",
        hint: "A no B = B belongs to A (example: watashi no hon = my book).",
      },
      {
        id: "n5-u9-l3-q2",
        type: "fill-in-the-blank",
        questionText:
          'Complete the particle: "Is this your bag?": \n「これはあなた ___ かばんですか。」',
        options: ["の", "を", "は", "が"],
        answer: "の",
        hint: "Anata (you) + possessive particle 'no' + kaban (bag).",
      },
      {
        id: "n5-u9-l3-q3",
        type: "listening",
        questionText:
          "Listen to the pronunciation of the sentence and choose its meaning!",
        audioText: "これはだれのかさですか",
        options: [
          "Whose umbrella is this?",
          "Is this your umbrella?",
          "This umbrella is mine",
          "Where is my umbrella?",
        ],
        answer: "Whose umbrella is this?",
        hint: "Kore wa (this is) + dare no (whose) + kasa desu ka (umbrella question).",
      },
      {
        id: "n5-u9-l3-q4",
        type: "sentence-builder",
        questionText:
          'Arrange the sentence: "That (sore) is a friend\'s smartphone."',
        options: ["それ", "は", "友だちの", "スマホ", "です"],
        answer: "それ は 友だちの スマホ です",
        hint: "Sore wa + tomodachi no (friend's) + sumaho (smartphone) + desu.",
      },
      {
        id: "n5-u9-l3-q5",
        type: "typing",
        questionText: "Type the possessive particle in Hiragana:",
        options: [],
        answer: "の",
        hint: "Suffix linking possessive nouns.",
      },
    ],
  },
  {
    id: "n5-u9-l4",
    level: "N5",
    unitId: "n5-u9",
    unitTitle: "Unit 9: Item Ownership (Particle ~no, Dare no) 🎒",
    unitDescription:
      "Master vocabulary for personal belongings, the particle of ownership, and how to ask about the owner of items.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Finding Items App",
    description:
      "Practice conversations returning a left-behind umbrella or asking for the owner of items in class.",
    expReward: 20,
    icon: "🗣️",
    badge: "Conversation",
    questions: [
      {
        id: "n5-u9-l4-q1",
        type: "multiple-choice",
        questionText:
          'Someone finds your umbrella and asks "これはあなたの傘ですか。" You reply "No, it is not mine." Which sentence is correct?',
        options: [
          "いいえ、わたしのではありません (iie, watashi no dewa arimasen)",
          "はい、わたしのです (hai, watashi no desu)",
          "いいえ, あります (iie, arimasen)",
          "いいえ、ちがいます (iie, chigaimasu)",
        ],
        answer:
          "いいえ、わたしのではありません (iie, watashi no dewa arimasen)",
        hint: "Rejecting ownership: Not mine (iie, watashi no dewa arimasen).",
      },
      {
        id: "n5-u9-l4-q2",
        type: "fill-in-the-blank",
        questionText:
          'You want to return a left-behind bag to the teacher: "先生、これは先生の ___ ですか。"',
        options: [
          "かばん (bag)",
          "ほん (book)",
          "かさ (umbrella)",
          "かぎ (key)",
        ],
        answer: "かばん (bag)",
        hint: "Bag in Japanese is 'kaban'.",
      },
      {
        id: "n5-u9-l4-q3",
        type: "listening",
        questionText:
          "Listen to the conversation audio and choose the meaning of the object mentioned!",
        audioText: "これはだれのかばんですか。わたしのです。",
        options: ["Bag", "Book", "Umbrella", "Key"],
        answer: "Bag",
        hint: "Kaban means bag.",
      },
      {
        id: "n5-u9-l4-q4",
        type: "sentence-builder",
        questionText:
          'Arrange the dialogue sentence: "This is the teacher\'s bag."',
        options: ["これ", "は", "先生", "の", "かばん", "です"],
        answer: "これ は 先生 の かばん です",
        hint: "Kore + wa + sensei + no + kaban + desu.",
      },
      {
        id: "n5-u9-l4-q5",
        type: "typing",
        questionText:
          'Type the English translation of the question word "だれ" (dare):',
        options: [],
        answer: "siapa",
        hint: "Question word for person.",
      },
    ],
  },
  {
    id: "n5-u9-l5",
    level: "N5",
    unitId: "n5-u9",
    unitTitle: "Unit 9: Item Ownership (Particle ~no, Dare no) 🎒",
    unitDescription:
      "Master vocabulary for personal belongings, the particle of ownership, and how to ask about the owner of items.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Unit 9 Final Challenge",
    description:
      "Test your synthesis ability on the concept of ownership of goods in Japanese.",
    expReward: 30,
    icon: "🏆",
    badge: "Synthesis",
    questions: [
      {
        id: "n5-u9-l5-q1",
        type: "multiple-choice",
        questionText: "The particle used to express possession is:",
        options: ["の (no)", "を (wo)", "は (wa)", "に (ni)"],
        answer: "の (no)",
        hint: "Partikel no.",
      },
      {
        id: "n5-u9-l5-q2",
        type: "multiple-choice",
        questionText: "What is umbrella called in Japanese?",
        options: [
          "かさ (kasa)",
          "かばん (kaban)",
          "ほん (hon)",
          "スマホ (sumaho)",
        ],
        answer: "かさ (kasa)",
        hint: "Rain protection item read as kasa.",
      },
      {
        id: "n5-u9-l5-q3",
        type: "fill-in-the-blank",
        questionText:
          'Complete the blank: "This bag belongs to Budi": \n「このかばんはブディさん ___ です。」',
        options: ["の (no)", "は (wa)", "が (ga)", "を (wo)"],
        answer: "の (no)",
        hint: "Partikel kepemilikan.",
      },
      {
        id: "n5-u9-l5-q4",
        type: "multiple-choice",
        questionText: 'What is the meaning of the Kanji "本"?',
        options: ["Book", "Friend", "Car", "Station"],
        answer: "Book",
        hint: "Dibaca hon.",
      },
      {
        id: "n5-u9-l5-q5",
        type: "multiple-choice",
        questionText: 'What is the meaning of the compound Kanji "先生"?',
        options: ["Teacher", "Student", "Friend", "Family"],
        answer: "Teacher",
        hint: "Dibaca sensei.",
      },
      {
        id: "n5-u9-l5-q6",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "This is my bag."',
        options: ["これ", "は", "わたし", "の", "かばん", "です"],
        answer: "これ は わたし の かばん です",
        hint: "Kore + wa + watashi + no + kaban + desu.",
      },
      {
        id: "n5-u9-l5-q7",
        type: "listening",
        questionText: "Listen to the audio and choose the correct translation!",
        audioText: "これは先生のスマホです",
        options: [
          "This is the teacher's phone",
          "This is the teacher's book",
          "Is this the teacher's phone?",
          "This phone is mine",
        ],
        answer: "This is the teacher's phone",
        hint: "Kore wa + sensei no + sumaho desu.",
      },
      {
        id: "n5-u9-l5-q8",
        type: "fill-in-the-blank",
        questionText:
          "Complete the question blank: \n「それは ___ のですか。(Whose is that?)」",
        options: ["だれ (dare)", "なん (nan)", "どこ (doko)", "いつ (itsu)"],
        answer: "だれ (dare)",
        hint: "Dare means who.",
      },
      {
        id: "n5-u9-l5-q9",
        type: "sentence-builder",
        questionText:
          'Arrange the sentence: "This umbrella belongs to the teacher."',
        options: ["この", "かさ", "は", "先生の", "です"],
        answer: "この かさ は 先生の です",
        hint: "Kono kasa wa (this umbrella) + sensei no (teacher's) + desu (is) - the object is omitted since it is moved to the front.",
      },
      {
        id: "n5-u9-l5-q10",
        type: "typing",
        questionText:
          'Type the English translation of the noun "かばん" (kaban):',
        options: [],
        answer: "bag",
        hint: "Place to carry books.",
      },
    ],
  },
  {
    id: "n5-u10-l1",
    level: "N5",
    unitId: "n5-u10",
    unitTitle: "Unit 10: Inviting Someone to Travel (~ni ikimasu, ~mashou) 🗼",
    unitDescription:
      "Master vocabulary for nature/city tourist attractions, inviting someone, and stating travel to a destination.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Tourist Places & Invitation Vocabulary",
    description:
      "Kuasai kata benda alam/wisata: umi (laut), yama (gunung), kouen (taman), matsuri, dan issho ni.",
    expReward: 20,
    icon: "🗼",
    badge: "Vocabulary",
    questions: [
      {
        id: "n5-u10-l1-q1",
        type: "multiple-choice",
        questionText: 'The nature tourism vocabulary "海" (umi) means:',
        options: ["Sea / Beach", "Mountain", "River", "Park"],
        answer: "Sea / Beach",
        hint: "Tempat berair asin yang luas, dibaca umi.",
      },
      {
        id: "n5-u10-l1-q2",
        type: "typing",
        questionText: 'Type the word for "City Park" in Hiragana:',
        options: [],
        answer: "kouen",
        hint: "Kouen -> こうえん.",
      },
      {
        id: "n5-u10-l1-q3",
        type: "listening",
        questionText:
          "Listen to the audio and choose the correct festival translation!",
        audioText: "まつり",
        options: ["Festival / Celebration", "Liburan", "Park", "Keramaian"],
        answer: "Festival / Celebration",
        hint: "Traditional Japanese festival celebration read as matsuri.",
      },
      {
        id: "n5-u10-l1-q4",
        type: "fill-in-the-blank",
        questionText:
          'Complete the blank for the adverb "together": \n「___ に行きましょう。(Let\'s go together.)」',
        options: [
          "いっしょ (issho)",
          "いつも (itsumo)",
          "とても (totemo)",
          "ゆっくり (yukkuri)",
        ],
        answer: "いっしょ (issho)",
        hint: "Issho ni berarti bersama-sama.",
      },
      {
        id: "n5-u10-l1-q5",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "Go to the park."',
        options: ["こうえん", "へ", "いきます"],
        answer: "こうえん へ いきます",
        hint: "Kouen + partikel arah he + ikimasu.",
      },
    ],
  },
  {
    id: "n5-u10-l2",
    level: "N5",
    unitId: "n5-u10",
    unitTitle: "Unit 10: Inviting Someone to Travel (~ni ikimasu, ~mashou) 🗼",
    unitDescription:
      "Master vocabulary for nature/city tourist attractions, inviting someone, and stating travel to a destination.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Kanji Nature & Travel Movements",
    description: "Kuasai Kanji 山 (gunung), 川 (sungai), dan 行 (pergi).",
    expReward: 20,
    icon: "⛰️",
    badge: "Kanji",
    questions: [
      {
        id: "n5-u10-l2-q1",
        type: "multiple-choice",
        questionText:
          'Which is the correct Kunyomi reading for the mountain Kanji "山"?',
        options: ["やま (yama)", "かわ (kawa)", "うみ (umi)", "いけ (ike)"],
        answer: "やま (yama)",
        hint: "Mountain is read as yama.",
      },
      {
        id: "n5-u10-l2-q2",
        type: "multiple-choice",
        questionText:
          'Which is the correct Kunyomi reading for the river Kanji "川"?',
        options: ["かわ (kawa)", "やま (yama)", "うみ (umi)", "もり (mori)"],
        answer: "かわ (kawa)",
        hint: "Aliran air alami dibaca kawa.",
      },
      {
        id: "n5-u10-l2-q3",
        type: "listening",
        questionText:
          "Listen to the audio pronunciation of the nature Kanji and choose its meaning!",
        audioText: "やま",
        options: ["Mountain", "River", "Sea", "Lake"],
        answer: "Mountain",
        hint: "Yama means mountain.",
      },
      {
        id: "n5-u10-l2-q4",
        type: "typing",
        questionText:
          "Type the Hiragana reading for the go Kanji: Kyotoへ行きます",
        options: [],
        answer: "きょうとへいきます",
        hint: "Kyoto + he + ikimasu.",
      },
      {
        id: "n5-u10-l2-q5",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "Go to Mount Fuji."',
        options: ["富士山", "へ", "行きます"],
        answer: "富士山 へ 行きます",
        hint: "Fujisan + he + ikimasu.",
      },
    ],
  },
  {
    id: "n5-u10-l3",
    level: "N5",
    unitId: "n5-u10",
    unitTitle: "Unit 10: Inviting Someone to Travel (~ni ikimasu, ~mashou) 🗼",
    unitDescription:
      "Master vocabulary for nature/city tourist attractions, inviting someone, and stating travel to a destination.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Grammar Invitation ~mashou",
    description:
      "Learn polite invitation patterns ~mashou (let's) and invitation question pattern ~masen ka.",
    expReward: 20,
    icon: "📝",
    badge: "Grammar",
    questions: [
      {
        id: "n5-u10-l3-q1",
        type: "multiple-choice",
        questionText:
          'The polite invitation "Let\'s eat" is changed from "たべます" (tabemasu) to:',
        options: [
          "たべましょう (tabemashou)",
          "たべますか (tabemasu ka)",
          "たべましょうか (tabemashou ka)",
          "たべません (tabemasen)",
        ],
        answer: "たべましょう (tabemashou)",
        hint: "Remove 'masu' then add 'mashou' to express 'let's'.",
      },
      {
        id: "n5-u10-l3-q2",
        type: "fill-in-the-blank",
        questionText:
          'Complete the friendly invitation blank: "How about going to the sea together?": \n「いっしょに海へ行き ___ か。」',
        options: [
          "ません (masen)",
          "ます (masu)",
          "ましょう (mashou)",
          "たい (tai)",
        ],
        answer: "ません (masen)",
        hint: "The '~masen ka' pattern is used to invite someone politely while giving them room to decline.",
      },
      {
        id: "n5-u10-l3-q3",
        type: "listening",
        questionText:
          "Listen to the pronunciation of the sentence and choose its meaning!",
        audioText: "いっしょにいきましょう",
        options: [
          "Let's go together",
          "Where do you want to go?",
          "Are you going together?",
          "I do not want to go together",
        ],
        answer: "Let's go together",
        hint: "Issho ni (together) + ikimashou (let's go).",
      },
      {
        id: "n5-u10-l3-q4",
        type: "sentence-builder",
        questionText:
          'Arrange the sentence: "Let\'s eat sushi at a restaurant."',
        options: ["すし", "を", "たべましょう"],
        answer: "すし を たべましょう",
        hint: "Sushi + wo + tabemashou.",
      },
      {
        id: "n5-u10-l3-q5",
        type: "typing",
        questionText:
          'Type the invitation form of the verb "いきます" (go -> let\'s go):',
        options: [],
        answer: "いきましょう",
        hint: "Hilangkan masu tambah mashou.",
      },
    ],
  },
  {
    id: "n5-u10-l4",
    level: "N5",
    unitId: "n5-u10",
    unitTitle: "Unit 10: Inviting Someone to Travel (~ni ikimasu, ~mashou) 🗼",
    unitDescription:
      "Master vocabulary for nature/city tourist attractions, inviting someone, and stating travel to a destination.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Vacation Plans App",
    description:
      "Practice dialogue making plans to travel to Kyoto or watch the matsuri summer festival.",
    expReward: 20,
    icon: "🗣️",
    badge: "Conversation",
    questions: [
      {
        id: "n5-u10-l4-q1",
        type: "multiple-choice",
        questionText:
          'Your friend invites you: "いっしょに京都へ行きませんか。" You agree and reply "Yes, let\'s go." Which sentence is most appropriate?',
        options: [
          "ええ、行きましょう (ee, ikimashou)",
          "いいえ、行きません (iie, ikimasen)",
          "はい、どうぞ (hai, douzo)",
          "すみません、どこですか (sumimasen, doko desu ka)",
        ],
        answer: "ええ、行きましょう (ee, ikimashou)",
        hint: "Ee (yes) + ikimashou (let's go) is the way to accept an invitation.",
      },
      {
        id: "n5-u10-l4-q2",
        type: "fill-in-the-blank",
        questionText:
          'You want to invite someone to see a fireworks festival: "いっしょにまつりへ ___ か。」',
        options: ["行きませんか", "行きます", "行きましょう", "行きたいです"],
        answer: "行きませんか",
        hint: "Use the '~masen ka' form for a questioning invitation sentence.",
      },
      {
        id: "n5-u10-l4-q3",
        type: "listening",
        questionText:
          "Listen to the conversation audio and determine the destination of the invitation!",
        audioText: "うみへいきましょう。ええ、いきましょう。",
        options: ["Sea / Beach", "Mountain", "City Park", "Kuil Kyoto"],
        answer: "Sea / Beach",
        hint: "Umi means sea.",
      },
      {
        id: "n5-u10-l4-q4",
        type: "sentence-builder",
        questionText: 'Arrange the dialogue sentence: "Let\'s go together."',
        options: ["いっしょ", "に", "行きましょう"],
        answer: "いっしょ に 行きましょう",
        hint: "Issho ni + ikimashou.",
      },
      {
        id: "n5-u10-l4-q5",
        type: "typing",
        questionText:
          'Type the English translation of the agreement "ええ、行きましょう":',
        options: [],
        answer: "ya ayo pergi",
        hint: 'Or "all right, let\'s go".',
      },
    ],
  },
  {
    id: "n5-u10-l5",
    level: "N5",
    unitId: "n5-u10",
    unitTitle: "Unit 10: Inviting Someone to Travel (~ni ikimasu, ~mashou) 🗼",
    unitDescription:
      "Master vocabulary for nature/city tourist attractions, inviting someone, and stating travel to a destination.",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    title: "Unit 1 Final Challenge0",
    description:
      "Test your competence in discussing plans and inviting someone to vacation together.",
    expReward: 30,
    icon: "🏆",
    badge: "Synthesis",
    questions: [
      {
        id: "n5-u10-l5-q1",
        type: "multiple-choice",
        questionText: 'The verb "Let\'s go" in the polite invitation form is:',
        options: [
          "いきましょう (ikimashou)",
          "いきますか (ikimasu ka)",
          "いきました (ikimashita)",
          "いきたいです (ikitai desu)",
        ],
        answer: "いきましょう (ikimashou)",
        hint: "Ikimashou.",
      },
      {
        id: "n5-u10-l5-q2",
        type: "multiple-choice",
        questionText: "What is a summer festival called in Japanese?",
        options: [
          "まつり (matsuri)",
          "うみ (umi)",
          "やま (yama)",
          "こうえん (kouen)",
        ],
        answer: "まつり (matsuri)",
        hint: "Matsuri.",
      },
      {
        id: "n5-u10-l5-q3",
        type: "fill-in-the-blank",
        questionText:
          'Complete the blank: "Let\'s drink tea together": \n「いっしょにお茶を ___ 。」',
        options: [
          "のみましょう (nomimashou)",
          "のみます (nomimasu)",
          "のみたい (nomitai)",
          "のみません (nomimasen)",
        ],
        answer: "のみましょう (nomimashou)",
        hint: "Invitation form for the verb drink.",
      },
      {
        id: "n5-u10-l5-q4",
        type: "multiple-choice",
        questionText:
          'What is the Kunyomi meaning of the Kanji character "山"?',
        options: ["Mountain", "River", "Sea", "Park"],
        answer: "Mountain",
        hint: "Dibaca yama.",
      },
      {
        id: "n5-u10-l5-q5",
        type: "multiple-choice",
        questionText:
          'What is the Kunyomi meaning of the Kanji character "川"?',
        options: ["River", "Mountain", "Lake", "Sea"],
        answer: "River",
        hint: "Dibaca kawa.",
      },
      {
        id: "n5-u10-l5-q6",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "Let\'s go to the city park."',
        options: ["こうえん", "へ", "行きましょう"],
        answer: "こうえん へ 行きましょう",
        hint: "Kouen + he + ikimashou.",
      },
      {
        id: "n5-u10-l5-q7",
        type: "listening",
        questionText:
          "Listen to the audio and choose the travel destination spoken!",
        audioText: "いっしょにうみへいきませんか",
        options: [
          "Inviting to go to the sea",
          "Inviting to go to the mountain",
          "Go to the park alone",
          "Ayo pulang ke rumah",
        ],
        answer: "Inviting to go to the sea",
        hint: "Issho ni umi he ikimasen ka.",
      },
      {
        id: "n5-u10-l5-q8",
        type: "fill-in-the-blank",
        questionText:
          "Complete the invitation dialogue blank: \nA: 「いっしょに山へ行きませんか。」\nB: 「ええ、___。」",
        options: ["行きましょう", "行きます", "どうぞ", "こんにちは"],
        answer: "行きましょう",
        hint: "Ee, ikimashou.",
      },
      {
        id: "n5-u10-l5-q9",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "Let\'s go to Kyoto together."',
        options: ["いっしょ", "に", "京都", "へ", "行きましょう"],
        answer: "いっしょ に 京都 へ 行きましょう",
        hint: "Issho ni + Kyoto + he + ikimashou.",
      },
      {
        id: "n5-u10-l5-q10",
        type: "typing",
        questionText:
          'Type the English translation of the noun "こうえん" (kouen):',
        options: [],
        answer: "park",
        hint: "Tempat bersantai publik yang asri.",
      },
    ],
  },
  {
    id: "n4-u1-l1",
    level: "N4",
    unitId: "n4-u1",
    unitTitle: "Unit 11: Directions, Desires & Life 🗺️",
    unitDescription:
      "Master vocabulary for navigation, personal desires, and N4 casual expressions.",
    unitColor: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    title: "Asking for Directions & Locations",
    description:
      "Learn how to navigate and ask for the position of public places in Japan.",
    expReward: 25,
    icon: "🗺️",
    badge: "Tanya Jawab",
    questions: [
      {
        id: "n4-u1-l1-q1",
        type: "multiple-choice",
        questionText: 'The vocabulary "えき" (eki) means:',
        options: ["Bandara", "Station", "Park", "Hospital"],
        answer: "Station",
        hint: "The place where trains stop and depart.",
      },
      {
        id: "n4-u1-l1-q2",
        type: "listening",
        questionText:
          "Listen to the audio and choose the correct location question word!",
        audioText: "どこ",
        options: ["だれ", "どこ", "いつ", "なに"],
        answer: "どこ",
        hint: 'Question word for asking place ("Where").',
      },
      {
        id: "n4-u1-l1-q3",
        type: "sentence-builder",
        questionText: 'Arrange the question sentence: "Where is the station?"',
        options: ["えき", "は", "どこ", "です", "か", "に"],
        answer: "えき は どこ です か",
        hint: "Topic (eki wa) + Question (doko) + Question Copula (desu ka).",
      },
      {
        id: "n4-u1-l1-q4",
        type: "fill-in-the-blank",
        questionText:
          'Complete the subject particle marking existence: "トイレ___あります。"',
        options: ["は", "が", "を", "に"],
        answer: "が",
        hint: 'When using the word "arimasu", the subject particle in front is usually "ga" (ga).',
      },
      {
        id: "n4-u1-l1-q5",
        type: "typing",
        questionText:
          'Type the Japanese translation of the demonstrative pronoun "Over there (far from both speaker & listener)" in Hiragana:',
        options: [],
        answer: "あそこ",
        hint: "Koko (sini), soko (situ), ... (sana).",
      },
    ],
  },
  {
    id: "n4-u1-l2",
    level: "N4",
    unitId: "n4-u1",
    unitTitle: "Unit 11: Directions, Desires & Life 🗺️",
    unitDescription:
      "Master vocabulary for navigation, personal desires, and N4 casual expressions.",
    unitColor: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    title: "Expressing Desires (~tai)",
    description:
      "Learn how to express what you want to do using the ~tai grammar pattern.",
    expReward: 25,
    icon: "💭",
    badge: "Grammar",
    questions: [
      {
        id: "n4-u1-l2-q1",
        type: "multiple-choice",
        questionText:
          'How do you change the verb "たべます" (eat) to "want to eat"?',
        options: ["たべたい", "たべた", "たべるそう", "たべます"],
        answer: "たべたい",
        hint: 'Hilangkan akhiran "masu" lalu tambahkan akhiran "tai".',
      },
      {
        id: "n4-u1-l2-q2",
        type: "listening",
        questionText: "Listen to the sentence and choose its meaning!",
        audioText: "日本に行きたいです",
        options: [
          "I want to go to Japan",
          "I have been to Japan",
          "I do not want to go to Japan",
          "I like Japan",
        ],
        answer: "I want to go to Japan",
        hint: "Nihon (Japan) + ni (to) + ikitai (want to go) + desu.",
      },
      {
        id: "n4-u1-l2-q3",
        type: "fill-in-the-blank",
        questionText:
          'Complete with the ~tai form of the verb "のむ" (drink): "みずを___です。"',
        options: ["のみたい", "のむたい", "のみたい", "のまたい"],
        answer: "のみたい",
        hint: 'Nomu -> its masu-stem is nomi, combine with tai to become "nomitai".',
      },
      {
        id: "n4-u1-l2-q4",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "I want to eat sushi."',
        options: ["すし", "が", "たべたい", "です", "を", "のみたい"],
        answer: "すし が たべたい です",
        hint: 'In the ~tai pattern, the particle "o" is often replaced by "ga" to emphasize the object of desire.',
      },
      {
        id: "n4-u1-l2-q5",
        type: "typing",
        questionText:
          'Type the opposite of "Ikitai" (Want to go), which is "Do not want to go" (Ikitakunai), in Hiragana:',
        options: [],
        answer: "いきたくない",
        hint: 'Ikitai -> ubah "i" terakhir menjadi "kunai".',
      },
    ],
  },
  {
    id: "n4-u2-l1",
    level: "N4",
    unitId: "n4-u2",
    unitTitle: "Unit 12: Past Activities & Future Plans 📅",
    unitDescription:
      "Learn how to talk about the past and formulate future plans.",
    unitColor: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    title: "The Past (~ta form)",
    description:
      "Use the informal past tense (~ta) to tell history or past events.",
    expReward: 25,
    icon: "⏳",
    badge: "Konjugasi",
    questions: [
      {
        id: "n4-u2-l1-q1",
        type: "multiple-choice",
        questionText:
          'What is the informal past tense (~ta form) of the verb "かう" (buy)?',
        options: ["かった", "かいた", "かったり", "かいます"],
        answer: "かった",
        hint: "Verbs ending in -u, -tsu, -ru change to -tta.",
      },
      {
        id: "n4-u2-l1-q2",
        type: "listening",
        questionText: "Listen to this sentence and determine its meaning!",
        audioText: "昨日テレビを見た",
        options: [
          "I watched television yesterday",
          "I want to watch television tomorrow",
          "Watching TV now",
          "Do not like TV",
        ],
        answer: "I watched television yesterday",
        hint: "Kinoo (yesterday) + terebi (TV) + o (object) + mita (watched).",
      },
      {
        id: "n4-u2-l1-q3",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "I already ate bread."',
        options: ["パン", "を", "たべた", "のみた", "ごはん"],
        answer: "パン を たべた",
        hint: "Pan (bread) + wo + tabeta (past tense of taberu).",
      },
      {
        id: "n4-u2-l1-q4",
        type: "fill-in-the-blank",
        questionText:
          'Complete the conditional sentence: "雨が___たら、行きません。"',
        options: ["ふる", "ふっ", "ふり", "ふれ"],
        answer: "ふっ",
        hint: 'Using the conditional pattern ~tara: past tense "futta" + "ra" -> "futtara".',
      },
      {
        id: "n4-u2-l1-q5",
        type: "typing",
        questionText:
          'Type the past tense (~ta form) of the verb "する" (do) in Hiragana:',
        options: [],
        answer: "した",
        hint: 'Suru berubah menjadi "shita".',
      },
    ],
  },
  {
    id: "n3-u1-l1",
    level: "N3",
    unitId: "n3-u1",
    unitTitle: "Unit 13: Speculation & N3 Conversational Language 🔄",
    unitDescription:
      "Master expressions of speculation, advanced conditionals, and formal polite language.",
    unitColor: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
    title: "Appearance & Hearsay (~sou)",
    description:
      'Bedakan penggunaan pola ~sou yang menyatakan "kelihatannya" vs "katanya".',
    expReward: 30,
    icon: "🔄",
    badge: "N3 Grammar",
    questions: [
      {
        id: "n3-u1-l1-q1",
        type: "multiple-choice",
        questionText: 'The phrase "おいしそう" (oishisou) means:',
        options: [
          "They say it's delicious",
          "It looks delicious",
          "Very delicious",
          "Not delicious / Bad taste",
        ],
        answer: "It looks delicious",
        hint: 'Conjugating the i-adjective "oishii" by dropping "i" and adding "sou".',
      },
      {
        id: "n3-u1-l1-q2",
        type: "listening",
        questionText:
          "Listen to this sentence and determine its grammatical meaning!",
        audioText: "雨が降りそうです",
        options: [
          "It looks like it will rain",
          "It is already raining heavily",
          "It rarely rains here",
          "I do not like rain",
        ],
        answer: "It looks like it will rain",
        hint: "Ame (rain) + ga + furisou (looks like it will rain).",
      },
      {
        id: "n3-u1-l1-q3",
        type: "fill-in-the-blank",
        questionText:
          'Choose the correct suffix to say "they say tomorrow is sunny": "明日は晴れる___です。"',
        options: ["そう", "らしい", "みたい", "はず"],
        answer: "そう",
        hint: 'Dictionary form + "sou desu" expresses hearsay / what others say ("they say").',
      },
      {
        id: "n3-u1-l1-q4",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "They say he will come."',
        options: ["かれ", "は", "くる", "そう", "です", "おいしい"],
        answer: "かれ は くる そう です",
        hint: "Kare (he) + wa + kuru (come - dictionary form) + sou desu (they say).",
      },
      {
        id: "n3-u1-l1-q5",
        type: "typing",
        questionText:
          'Type in Hiragana the adjective equivalent of "Looks healthy/well" from the root word "Genki" (healthy):',
        options: [],
        answer: "げんきそう",
        hint: 'Na-adjectives are directly followed by "sou" -> genkisou.',
      },
    ],
  },
  {
    id: "n3-u1-l2",
    level: "N3",
    unitId: "n3-u1",
    unitTitle: "Unit 13: Speculation & N3 Conversational Language 🔄",
    unitDescription:
      "Master expressions of speculation, advanced conditionals, and formal polite language.",
    unitColor: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
    title: "Basic Polite Language (Keigo)",
    description:
      "Understand the division of honorific language Sonkeigo and humble language Keigo.",
    expReward: 30,
    icon: "👔",
    badge: "Keigo",
    questions: [
      {
        id: "n3-u1-l2-q1",
        type: "multiple-choice",
        questionText:
          'Which Kenjougo (humble) vocabulary is used to replace the word "いきます" (go)?',
        options: [
          "まいります",
          "いらっしゃいます",
          "めしあがります",
          "おっしゃいます",
        ],
        answer: "まいります",
        hint: "Mairimasu is used when humbling oneself in front of a boss/client.",
      },
      {
        id: "n3-u1-l2-q2",
        type: "listening",
        questionText:
          "Listen to this respectful sentence and determine its meaning!",
        audioText: "何をお召し上がりになりますか",
        options: [
          "What do you want to eat/drink?",
          "When will you come?",
          "Where is your house?",
          "What is the name of your project?",
        ],
        answer: "What do you want to eat/drink?",
        hint: "Nani (what) + o + meshiagari ni narimasu ka (honorific form of eating/drinking).",
      },
      {
        id: "n3-u1-l2-q3",
        type: "fill-in-the-blank",
        questionText:
          'Complete the receptionist\'s greeting: "いらっしゃい___。"',
        options: ["ます", "ませ", "です", "ください"],
        answer: "ませ",
        hint: 'Standard welcome greeting at Japanese shops/restaurants: "Iraisshaimase".',
      },
      {
        id: "n3-u1-l2-q4",
        type: "sentence-builder",
        questionText:
          'Arrange the humble sentence: "I am Tanaka (called Tanaka)."',
        options: [
          "たなか",
          "と",
          "もうします",
          "おっしゃいます",
          "わたし",
          "は",
        ],
        answer: "たなか と もうします",
        hint: "Name + to + moushimasu (Kenjougo form of saying name).",
      },
      {
        id: "n3-u1-l2-q5",
        type: "typing",
        questionText:
          'Type the Sonkeigo (respectful) equivalent of the verb "いう" (say) in Hiragana:',
        options: [],
        answer: "おっしゃる",
        hint: "Saying in the dictionary honorific form (Oshiyaru -> osshaimasu).",
      },
    ],
  },
  {
    id: "n2-u1-l1",
    level: "N2",
    unitId: "n2-u1",
    unitTitle: "Unit 14: Nuances of Formal & Business Writing 💼",
    unitDescription:
      "Master particle usage in articles, opinions, and N2 complex grammatical relations.",
    unitColor: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    title: "About & Based On (~ni tsuite)",
    description:
      "Use formal writing particles like ~ni tsuite and ~ni oite with precision.",
    expReward: 40,
    icon: "💼",
    badge: "Grammar N2",
    questions: [
      {
        id: "n2-u1-l1-q1",
        type: "multiple-choice",
        questionText:
          'The grammar pattern "~について" (~ni tsuite) has the primary function of:',
        options: [
          "Explaining comparisons",
          "Expressing the topic of conversation/about",
          "Showing time duration",
          "Expressing cause and effect",
        ],
        answer: "Expressing the topic of conversation/about",
        hint: 'Sering diterjemahkan sebagai "mengenai" atau "tentang".',
      },
      {
        id: "n2-u1-l1-q2",
        type: "listening",
        questionText: "Listen to the academic sentence and choose its meaning!",
        audioText: "この問題について考えます",
        options: [
          "I will think about this problem",
          "This problem has already been solved",
          "Do not think about that problem",
          "This problem is not important",
        ],
        answer: "I will think about this problem",
        hint: "Kono mondai (this problem) + ni tsuite (about) + kangaemasu (think).",
      },
      {
        id: "n2-u1-l1-q3",
        type: "fill-in-the-blank",
        questionText:
          'Complete the formal N2 place particle (in/at): "東京___オリンピックが行われた。"',
        options: ["において", "について", "にとって", "として"],
        answer: "において",
        hint: '~ni oite is the formal/written form of the particle "de" (in/at).',
      },
      {
        id: "n2-u1-l1-q4",
        type: "sentence-builder",
        questionText:
          'Arrange the formal sentence: "The meeting was held at the company."',
        options: [
          "かいしゃ",
          "において",
          "かいぎ",
          "が",
          "おこなわれる",
          "について",
        ],
        answer: "かいしゃ において かいぎ が おこなわれる",
        hint: "Place (kaisha ni oite) + Subject (kaigi ga) + held (okonawareru).",
      },
      {
        id: "n2-u1-l1-q5",
        type: "typing",
        questionText: "Type the Hiragana reading for the following Kanji: 会議",
        options: [],
        answer: "かいぎ",
        hint: 'Ejaan Romajinya "kaigi" (rapat/pertemuan).',
      },
    ],
  },
  {
    id: "n1-u1-l1",
    level: "N1",
    unitId: "n1-u1",
    unitTitle: "Unit 15: Classical Literature & Abstract Concepts 🎓",
    unitDescription:
      "Master archaic expressions, advanced literary structures, and N1 proverbs.",
    unitColor: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
    title: "Final Limit Pattern (~wo motte)",
    description:
      "Understand the use of Japan's highest literary writing styles to end events.",
    expReward: 50,
    icon: "🎓",
    badge: "Mastery N1",
    questions: [
      {
        id: "n1-u1-l1-q1",
        type: "multiple-choice",
        questionText:
          'The N1 sentence pattern "~をもって" (~wo motte) when ending an activity means:',
        options: [
          "By using / with this",
          "Due to emergency reasons",
          "Immediately after",
          "Only limited to",
        ],
        answer: "By using / with this",
        hint: 'Expressing a formal deadline ("With this, [activity] is declared finished").',
      },
      {
        id: "n1-u1-l1-q2",
        type: "listening",
        questionText:
          "Listen to the official announcement sentence and determine its meaning!",
        audioText: "本日をもって閉店いたします",
        options: [
          "With this, the shop closes as of today",
          "The shop will open tomorrow",
          "Our shop caught fire today",
          "We will renovate the shop soon",
        ],
        answer: "With this, the shop closes as of today",
        hint: "Honjitsu (today) + wo motte (with/limit) + heiten itashimasu (close shop).",
      },
      {
        id: "n1-u1-l1-q3",
        type: "fill-in-the-blank",
        questionText:
          'Choose the literary N1 alternative particle: "行く___行かない___、返事をしてください。"',
        options: ["なり / なり", "とか / とか", "だの / だの", "つつ / つつ"],
        answer: "なり / なり",
        hint: '~nari ~nari means "whether... or..." (choose one action to take).',
      },
      {
        id: "n1-u1-l1-q4",
        type: "sentence-builder",
        questionText:
          'Arrange the N1 sentence: "If there are complaints, please contact us."',
        options: ["質問", "なり", "意見", "なり", "連絡", "してください"],
        answer: "質問 なり 意見 なり 連絡 してください",
        hint: "Shitsumon (question) nari + iken (opinion) nari + renraku shite kudasai.",
      },
      {
        id: "n1-u1-l1-q5",
        type: "typing",
        questionText:
          'Type in Hiragana the reading of the formal virtue word "謙遜" (Humble):',
        options: [],
        answer: "けんそん",
        hint: 'Its Romaji spelling is "kenson".',
      },
    ],
  },
];

export interface RoadmapLesson {
  id: string;
  title: string;
  description: string;
  link: string;
  type: "writing" | "vocabulary" | "grammar" | "quiz" | "survival" | "kanji";
  xpReward: number;
}

export interface RoadmapChapter {
  id: string;
  title: string;
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  lessons: RoadmapLesson[];
}

export const ROADMAP_DATA: RoadmapChapter[] = [
  {
    id: "n5-foundation",
    title: "N5: The Foundations",
    level: "N5",
    lessons: [
      {
        id: "hiragana",
        title: "Hiragana Mastery",
        description: "The phonetic base of Japanese.",
        link: "/study/kanji",
        type: "writing",
        xpReward: 50,
      },
      {
        id: "katakana",
        title: "Katakana Intro",
        description: "Loanwords and foreign names.",
        link: "/study/kanji",
        type: "writing",
        xpReward: 50,
      },
      {
        id: "basic-particles",
        title: "Essential Particles",
        description: "は, が, を, に fundamentals.",
        link: "/study/grammar",
        type: "grammar",
        xpReward: 100,
      },
      {
        id: "n5-vocab-1",
        title: "Daily Vocab",
        description: "100 most common words.",
        link: "/study/vocabulary",
        type: "vocabulary",
        xpReward: 100,
      },
    ],
  },
  {
    id: "n4-intermediate-base",
    title: "N4: Expanding Horizons",
    level: "N4",
    lessons: [
      {
        id: "n4-grammar",
        title: "Intermediate Grammar",
        description: "Complex sentences and conjugation.",
        link: "/study/grammar",
        type: "grammar",
        xpReward: 150,
      },
      {
        id: "n4-kanji",
        title: "300 Essential Kanji",
        description: "Daily life characters.",
        link: "/study/kanji",
        type: "kanji",
        xpReward: 200,
      },
      {
        id: "n4-listening",
        title: "Basic Conversation",
        description: "Understanding native speed.",
        link: "/study/listening",
        type: "survival",
        xpReward: 150,
      },
    ],
  },
  {
    id: "n3-bridge",
    title: "N3: The Bridge",
    level: "N3",
    lessons: [
      {
        id: "n3-reading",
        title: "Short Stories",
        description: "Reading for comprehension.",
        link: "/study/reading",
        type: "vocabulary",
        xpReward: 250,
      },
      {
        id: "n3-keigo",
        title: "Honorifics Intro",
        description: "Polite and humble speech.",
        link: "/study/speaking",
        type: "survival",
        xpReward: 200,
      },
      {
        id: "n3-kanji-mastery",
        title: "600 Kanji",
        description: "Advanced character sets.",
        link: "/study/kanji",
        type: "kanji",
        xpReward: 300,
      },
    ],
  },
  {
    id: "n2-business",
    title: "N2: Professional Japanese",
    level: "N2",
    lessons: [
      {
        id: "n2-business-vocab",
        title: "Business Terms",
        description: "Workplace vocabulary.",
        link: "/study/vocabulary",
        type: "vocabulary",
        xpReward: 400,
      },
      {
        id: "n2-advanced-grammar",
        title: "Abstract Grammar",
        description: "Nuanced expressions.",
        link: "/study/grammar",
        type: "grammar",
        xpReward: 400,
      },
      {
        id: "n2-news-listening",
        title: "News Reports",
        description: "Understanding media.",
        link: "/study/listening",
        type: "survival",
        xpReward: 400,
      },
    ],
  },
  {
    id: "n1-fluency",
    title: "N1: Native Fluency",
    level: "N1",
    lessons: [
      {
        id: "n1-literature",
        title: "Classic Literature",
        description: "Deep cultural understanding.",
        link: "/study/reading",
        type: "writing",
        xpReward: 500,
      },
      {
        id: "n1-kanji-2000",
        title: "Jouyou Kanji 2136",
        description: "The complete set.",
        link: "/study/kanji",
        type: "kanji",
        xpReward: 1000,
      },
      {
        id: "n1-philosophical-debate",
        title: "Abstract Discussion",
        description: "High-level speaking.",
        link: "/study/speaking",
        type: "survival",
        xpReward: 600,
      },
    ],
  },
];

// DYNAMIC UNIT LESSON EXPANSION GENERATOR
interface Word {
  japanese: string;
  romaji: string;
  english: string;
}

const vocabBank: Record<string, Word[]> = {
  "N5-1": [
    { japanese: "おちゃ", romaji: "ocha", english: "green tea" },
    { japanese: "すし", romaji: "sushi", english: "sushi" },
    { japanese: "ラーメン", romaji: "ramen", english: "ramen" },
    { japanese: "コーヒー", romaji: "koohii", english: "coffee" },
    { japanese: "みず", romaji: "mizu", english: "water" },
    { japanese: "メニュー", romaji: "menyuu", english: "menu" },
    { japanese: "ビール", romaji: "biiru", english: "beer" },
    { japanese: "ごはん", romaji: "gohan", english: "rice" },
  ],
  "N5-2": [
    { japanese: "おにぎり", romaji: "onigiri", english: "rice ball" },
    { japanese: "パン", romaji: "pan", english: "bread" },
    { japanese: "お弁当", romaji: "obento", english: "bento box" },
    { japanese: "お会計", romaji: "okaikei", english: "bill" },
    { japanese: "牛乳", romaji: "gyuunyuu", english: "milk" },
    { japanese: "袋", romaji: "fukuro", english: "bag" },
    { japanese: "水", romaji: "mizu", english: "water" },
  ],
  "N5-3": [
    { japanese: "えき", romaji: "eki", english: "station" },
    { japanese: "トイレ", romaji: "toire", english: "toilet" },
    { japanese: "ぎんこう", romaji: "ginkou", english: "bank" },
    { japanese: "ホテル", romaji: "hoteru", english: "hotel" },
    { japanese: "ここ", romaji: "koko", english: "here" },
    { japanese: "そこ", romaji: "soko", english: "there" },
    { japanese: "あそこ", romaji: "asoko", english: "over there" },
  ],
  "N5-4": [
    { japanese: "おきます", romaji: "okimasu", english: "wake up" },
    { japanese: "ねます", romaji: "nemasu", english: "sleep" },
    { japanese: "たべます", romaji: "tabemasu", english: "eat" },
    { japanese: "のみます", romaji: "nomimasu", english: "drink" },
    { japanese: "いきます", romaji: "ikimasu", english: "go" },
    { japanese: "きます", romaji: "kimasu", english: "come" },
  ],
  "N5-5": [
    { japanese: "いま", romaji: "ima", english: "now" },
    { japanese: "なんじ", romaji: "nan-ji", english: "what time" },
    { japanese: "じ", romaji: "ji", english: "o'clock" },
    { japanese: "ふん", romaji: "fun", english: "minute" },
    { japanese: "はん", romaji: "han", english: "half past" },
    { japanese: "あさ", romaji: "asa", english: "morning" },
  ],
  "N5-6": [
    { japanese: "さむい", romaji: "samui", english: "cold" },
    { japanese: "あつい", romaji: "atsui", english: "hot" },
    { japanese: "おいしい", romaji: "oishii", english: "delicious" },
    { japanese: "きれい", romaji: "kirei", english: "beautiful" },
    { japanese: "おもしろい", romaji: "omoshiroi", english: "interesting" },
    { japanese: "たのしい", romaji: "tanoshii", english: "fun" },
  ],
  "N5-7": [
    { japanese: "ひだり", romaji: "hidari", english: "left" },
    { japanese: "みぎ", romaji: "migi", english: "right" },
    { japanese: "まっすぐ", romaji: "massugu", english: "straight" },
    { japanese: "かど", romaji: "kado", english: "corner" },
    { japanese: "しんごう", romaji: "shingou", english: "traffic light" },
  ],
  "N5-8": [
    { japanese: "かぞく", romaji: "kazoku", english: "family" },
    { japanese: "ちち", romaji: "chichi", english: "father" },
    { japanese: "はは", romaji: "haha", english: "mother" },
    { japanese: "あに", romaji: "ani", english: "older brother" },
    { japanese: "あね", romaji: "ane", english: "older sister" },
    { japanese: "おとうと", romaji: "otouto", english: "younger brother" },
  ],
  "N5-9": [
    { japanese: "ほん", romaji: "hon", english: "book" },
    { japanese: "かばん", romaji: "kaban", english: "bag" },
    { japanese: "さいふ", romaji: "saifu", english: "wallet" },
    { japanese: "スマホ", romaji: "sumaho", english: "smartphone" },
    { japanese: "とけい", romaji: "tokei", english: "watch" },
  ],
  "N5-10": [
    { japanese: "うみ", romaji: "umi", english: "sea" },
    { japanese: "やま", romaji: "yama", english: "mountain" },
    { japanese: "こうえん", romaji: "kouen", english: "park" },
    { japanese: "まつり", romaji: "matsuri", english: "festival" },
    { japanese: "りょこう", romaji: "ryokou", english: "travel" },
  ],
  "N4-1": [
    { japanese: "えき", romaji: "eki", english: "station" },
    { japanese: "こうばん", romaji: "kouban", english: "police box" },
    { japanese: "ちかく", romaji: "chikaku", english: "nearby" },
    { japanese: "いきたい", romaji: "ikitai", english: "want to go" },
    { japanese: "たべたい", romaji: "tabetai", english: "want to eat" },
  ],
  "N4-2": [
    { japanese: "きのう", romaji: "kinou", english: "yesterday" },
    { japanese: "おわった", romaji: "owatta", english: "finished" },
    { japanese: "かった", romaji: "katta", english: "bought" },
    { japanese: "した", romaji: "shita", english: "did" },
  ],
  "N3-1": [
    { japanese: "おいしそう", romaji: "oishisou", english: "looks delicious" },
    { japanese: "会議", romaji: "kaigi", english: "meeting" },
    { japanese: "まいる", romaji: "mairu", english: "to go / come (humble)" },
  ],
  "N2-1": [
    { japanese: "について", romaji: "ni tsuite", english: "about / regarding" },
    { japanese: "において", romaji: "ni oite", english: "in / at (formal)" },
    { japanese: "として", romaji: "to shite", english: "as" },
  ],
  "N1-1": [
    { japanese: "をもって", romaji: "wo motte", english: "with this / as of" },
    { japanese: "なり", romaji: "nari", english: "whether... or..." },
    { japanese: "謙遜", romaji: "kenson", english: "humble" },
  ]
};

const defaultVocab: Word[] = [
  { japanese: "日本語", romaji: "nihongo", english: "Japanese language" },
  { japanese: "ともだち", romaji: "tomodachi", english: "friend" },
  { japanese: "せんせい", romaji: "sensei", english: "teacher" },
  { japanese: "べんきょう", romaji: "benkyou", english: "study" },
  { japanese: "がっこう", romaji: "gakkou", english: "school" },
  { japanese: "さくら", romaji: "sakura", english: "cherry blossom" },
];

function getDeterministicRandom(seed: string, min: number, max: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const rng = Math.abs(Math.sin(hash));
  return Math.floor(rng * (max - min + 1)) + min;
}

function generateQuestion(qId: string, level: string, unitTitle: string, badge: string): Question {
  const unitNumMatch = qId.match(/u(\d+)/);
  const unitNum = unitNumMatch ? unitNumMatch[1] : "1";
  const key = `${level}-${unitNum}`;
  const bank = vocabBank[key] || defaultVocab;
  
  let hash = 0;
  for (let i = 0; i < qId.length; i++) {
    hash = qId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const rng = (offset: number) => Math.abs(Math.sin(hash + offset));
  
  const wordIdx = Math.floor(rng(1) * bank.length);
  const word = bank[wordIdx];
  
  const questionTypes: Question["type"][] = ["multiple-choice", "typing", "fill-in-the-blank", "listening", "sentence-builder"];
  const type = questionTypes[Math.floor(rng(2) * questionTypes.length)];

  let questionText = "";
  let options: string[] = [];
  let answer = "";
  let hint = "";
  let audioText: string | undefined = undefined;

  const getDistractors = (correct: string, count: number): string[] => {
    const pool = bank.filter(w => w.english !== correct && w.japanese !== correct);
    const result: string[] = [];
    let idx = 0;
    while (result.length < count && pool.length > 0) {
      const w = pool[Math.floor(rng(idx + 10) * pool.length)];
      if (!result.includes(w.english) && !result.includes(w.japanese)) {
        result.push(w.english);
      }
      idx++;
      if (idx > 20) break;
    }
    const defaultPool = ["water", "bread", "school", "friend", "book", "sushi", "ramen"];
    while (result.length < count) {
      const fallback = defaultPool[Math.floor(rng(result.length + 50) * defaultPool.length)];
      if (!result.includes(fallback) && fallback !== correct) {
        result.push(fallback);
      }
    }
    return result;
  };

  const getJapaneseDistractors = (correct: string, count: number): string[] => {
    const pool = bank.filter(w => w.japanese !== correct);
    const result: string[] = [];
    let idx = 0;
    while (result.length < count && pool.length > 0) {
      const w = pool[Math.floor(rng(idx + 20) * pool.length)];
      if (!result.includes(w.japanese)) {
        result.push(w.japanese);
      }
      idx++;
      if (idx > 20) break;
    }
    const defaultPool = ["みず", "おちゃ", "ごはん", "えき", "ほん"];
    while (result.length < count) {
      const fallback = defaultPool[Math.floor(rng(result.length + 60) * defaultPool.length)];
      if (!result.includes(fallback) && fallback !== correct) {
        result.push(fallback);
      }
    }
    return result;
  };

  if (type === "multiple-choice") {
    if (rng(3) > 0.5) {
      questionText = `What is the meaning of the vocabulary "${word.japanese}"?`;
      answer = word.english;
      const distractors = getDistractors(answer, 3);
      options = [answer, ...distractors].sort();
      hint = `Its Romaji spelling is "${word.romaji}".`;
    } else {
      questionText = `Choose the correct Japanese word for "${word.english}":`;
      answer = word.japanese;
      const distractors = getJapaneseDistractors(answer, 3);
      options = [answer, ...distractors].sort();
      hint = `Pronounced as "${word.romaji}".`;
    }
  } else if (type === "typing") {
    questionText = `Type the English translation for the Japanese word "${word.japanese}":`;
    answer = word.english.toLowerCase();
    options = [];
    hint = `It starts with the letter "${answer.charAt(0)}".`;
  } else if (type === "fill-in-the-blank") {
    questionText = `Complete the sentence with the correct word: \n「これは ___ です。」 (Translation: This is ${word.english}.)`;
    answer = word.japanese;
    const distractors = getJapaneseDistractors(answer, 3);
    options = [answer, ...distractors].sort();
    hint = `The missing word means "${word.english}".`;
  } else if (type === "listening") {
    questionText = `Listen to the pronunciation and choose the correct English meaning:`;
    audioText = word.japanese;
    answer = word.english;
    const distractors = getDistractors(answer, 3);
    options = [answer, ...distractors].sort();
    hint = `You heard "${word.romaji}".`;
  } else {
    questionText = `Arrange the cards to translate: "${word.english} please."`;
    answer = `${word.japanese} を ください`;
    options = [word.japanese, "を", "ください", "です", "か", "ます"].sort();
    hint = `The pattern is: [Item] + を + ください.`;
  }

  return {
    id: qId,
    type,
    questionText,
    audioText,
    options,
    answer,
    hint,
  };
}

function expandLessonsData(base: Lesson[]): Lesson[] {
  const unitsMap = new Map<string, Lesson[]>();
  base.forEach(lesson => {
    if (!unitsMap.has(lesson.unitId)) {
      unitsMap.set(lesson.unitId, []);
    }
    unitsMap.get(lesson.unitId)!.push(lesson);
  });

  const expanded: Lesson[] = [];

  for (const [unitId, lessons] of unitsMap.entries()) {
    const targetCount = getDeterministicRandom(unitId, 8, 13);
    const existingCount = lessons.length;

    if (existingCount >= targetCount) {
      expanded.push(...lessons);
      continue;
    }

    const synthesisLesson = lessons.find(l => l.badge === "Synthesis");
    const normalLessons = lessons.filter(l => l.badge !== "Synthesis");

    expanded.push(...normalLessons);

    const firstLesson = lessons[0];
    const needed = targetCount - existingCount;

    for (let i = 0; i < needed; i++) {
      const lessonIndex = existingCount + i + 1;
      const lessonId = `${unitId}-l${lessonIndex}`;
      
      const badgeTypes = ["Vocabulary", "Grammar", "Reading", "Listening", "Conversation"];
      const badge = badgeTypes[i % badgeTypes.length];
      
      let icon = "📝";
      if (badge === "Vocabulary") icon = "📚";
      else if (badge === "Reading") icon = "📖";
      else if (badge === "Listening") icon = "🎧";
      else if (badge === "Conversation") icon = "🗣️";

      const title = `Extra Practice: ${badge} Mastery`;
      const description = `Strengthen your understanding of ${firstLesson.unitTitle.split(":")[1]?.trim().replace(/🎌|🏪|🗺️|☀️|⏰|❄️|🚇|👨‍👩‍👧‍👦|🎒|🗼/g, "") || "this unit's"} topics.`;

      const questions: Question[] = [];
      for (let qIdx = 1; qIdx <= 5; qIdx++) {
        const qId = `${lessonId}-q${qIdx}`;
        questions.push(generateQuestion(qId, firstLesson.level, firstLesson.unitTitle, badge));
      }

      expanded.push({
        id: lessonId,
        level: firstLesson.level,
        unitId: firstLesson.unitId,
        unitTitle: firstLesson.unitTitle,
        unitDescription: firstLesson.unitDescription,
        unitColor: firstLesson.unitColor,
        title,
        description,
        expReward: 20,
        icon,
        badge,
        questions,
      });
    }

    if (synthesisLesson) {
      expanded.push(synthesisLesson);
    }
  }

  return expanded;
}

export const lessonsData: Lesson[] = expandLessonsData(baseLessonsData);

