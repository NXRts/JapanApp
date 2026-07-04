import { Lesson } from "./types";

export const n2Lessons: Lesson[] = [
  {
    id: "n2-u1-l1",
    level: "N2",
    unitId: "n2-u1",
    unitTitle: "Unit 16: Nuances of Formal & Business Writing 💼",
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
];
