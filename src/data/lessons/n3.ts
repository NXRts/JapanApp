import { Lesson } from "./types";

export const n3Lessons: Lesson[] = [
  {
    id: "n3-u1-l1",
    level: "N3",
    unitId: "n3-u1",
    unitTitle: "Unit 15: Speculation & N3 Conversational Language 🔄",
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
        options: ["かれ", "は", "くる", "そう", "です"],
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
    unitTitle: "Unit 15: Speculation & N3 Conversational Language 🔄",
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
];
