export interface ParticleDrill {
  id: string;
  sentence: string; // The full sentence for internal use
  displaySentence: string; // The sentence with [ ] or similar markers
  options: string[]; // Options for the gap
  correctAnswer: string;
  translation: string;
  explanation: string;
  level: "N5" | "N4" | "N3";
}

export const particleDrills: ParticleDrill[] = [
  {
    id: "p1",
    sentence: "私は学生です。",
    displaySentence: "私 [ ] 学生です。",
    options: ["は", "が", "を", "に"],
    correctAnswer: "は",
    translation: "I am a student.",
    explanation: 'The particle "は" (wa) marks the topic of the sentence.',
    level: "N5",
  },
  {
    id: "p2",
    sentence: "水を飲みます。",
    displaySentence: "水 [ ] 飲みます。",
    options: ["は", "が", "を", "も"],
    correctAnswer: "を",
    translation: "Drinking water.",
    explanation: 'The particle "を" (o) marks the direct object of the verb.',
    level: "N5",
  },
  {
    id: "p3",
    sentence: "学校へ行きます。",
    displaySentence: "学校 [ ] 行きます。",
    options: ["は", "が", "を", "へ"],
    correctAnswer: "へ",
    translation: "Going to school.",
    explanation: 'The particle "へ" (e) indicates direction or destination.',
    level: "N5",
  },
  {
    id: "p4",
    sentence: "公園で遊んでいます。",
    displaySentence: "公園 [ ] 遊んでいます。",
    options: ["に", "で", "を", "は"],
    correctAnswer: "で",
    translation: "Playing in the park.",
    explanation:
      'The particle "で" (de) indicates the place where an action occurs.',
    level: "N5",
  },
  {
    id: "p5",
    sentence: "猫がいます。",
    displaySentence: "猫 [ ] います。",
    options: ["は", "が", "を", "に"],
    correctAnswer: "が",
    translation: "There is a cat.",
    explanation:
      'The particle "が" (ga) marks the subject, often used with verbs of existence (imasu/arimasu).',
    level: "N5",
  },
  {
    id: "p6",
    sentence: "日本に行きたいです。",
    displaySentence: "日本 [ ] 行きたいです。",
    options: ["に", "で", "を", "は"],
    correctAnswer: "に",
    translation: "I want to go to Japan.",
    explanation:
      'The particle "に" (ni) indicates destination or a point in time.',
    level: "N5",
  },
  {
    id: "p7",
    sentence: "本を読みました。",
    displaySentence: "本 [ ] 読みました。",
    options: ["は", "が", "を", "に"],
    correctAnswer: "を",
    translation: "I read a book.",
    explanation: 'The particle "を" (o) marks the direct object.',
    level: "N5",
  },
  {
    id: "p8",
    sentence: "デパートまでバスで行きます。",
    displaySentence: "デパート [ ] バスで行きます。",
    options: ["に", "へ", "まで", "を"],
    correctAnswer: "まで",
    translation: "Going to the department store by bus.",
    explanation: 'The particle "まで" (made) means "until" or "to".',
    level: "N5",
  },
  {
    id: "p9",
    sentence: "明日テレビを見ます。",
    displaySentence: "明日 [ ] テレビを見ます。",
    options: ["は", "が", "に", "（空欄）"],
    correctAnswer: "（空欄）",
    translation: "I will watch TV tomorrow.",
    explanation:
      'Relative time adverbs like "Ashita" do not require the particle "ni".',
    level: "N5",
  },
  {
    id: "p10",
    sentence: "田中さんと話しました。",
    displaySentence: "田中さん [ ] 話しました。",
    options: ["と", "に", "は", "が"],
    correctAnswer: "と",
    translation: "I talked with Mr. Tanaka.",
    explanation: 'The particle "と" (to) means "with" or "and".',
    level: "N5",
  },
];
