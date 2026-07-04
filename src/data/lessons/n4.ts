import { Lesson } from "./types";

export const n4Lessons: Lesson[] = [
  {
    id: "n4-u1-l1",
    level: "N4",
    unitId: "n4-u1",
    unitTitle: "Unit 13: Directions, Desires & Life 🗺️",
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
        options: ["えき", "は", "どこ", "です", "か"],
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
    unitTitle: "Unit 13: Directions, Desires & Life 🗺️",
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
          'Complete with the ~tai form of the verb "nomu" (drink): "みずを___です。"',
        options: ["のみたい", "のむたい", "のみたい", "のまたい"],
        answer: "のみたい",
        hint: 'Nomu -> its masu-stem is nomi, combine with tai to become "nomitai".',
      },
      {
        id: "n4-u1-l2-q4",
        type: "sentence-builder",
        questionText: 'Arrange the sentence: "I want to eat sushi."',
        options: ["すし", "が", "たべたい", "es"],
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
    unitTitle: "Unit 14: Past Activities & Future Plans 📅",
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
        options: ["パン", "を", "たべた"],
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
];
