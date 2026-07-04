import { Lesson } from "./types";

export const n1Lessons: Lesson[] = [
  {
    id: "n1-u1-l1",
    level: "N1",
    unitId: "n1-u1",
    unitTitle: "Unit 17: Classical Literature & Abstract Concepts 🎓",
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
        options: ["なり / なり", "とか / とか", "だの / だo", "つつ / つつ"],
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
