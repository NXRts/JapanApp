import { GrammarPoint } from '../n5/grammar';

export const n3Grammar: GrammarPoint[] = [
  {
    id: "ndesu",
    level: "N3",
    title: "~んです (~ndesu)",
    meaning: "Explanation or emphasis",
    structure: "Verb (plain) + んです / Noun + なんです",
    explanation: "Used to give an explanation, provide background information, or add emphasis to a statement.",
    examples: [
      {
        japanese: "頭が痛いんです。",
        romaji: "Atama ga itai ndesu.",
        english: "The thing is, I have a headache."
      }
    ]
  },
  {
    id: "temoii",
    level: "N3",
    title: "~てもいい (~temo ii)",
    meaning: "May I... / It is okay to...",
    structure: "Verb (te-form) + もいい",
    explanation: "Used to ask for permission or to state that an action is permissible.",
    examples: [
      {
        japanese: "ここで写真を撮ってもいいですか。",
        romaji: "Koko de shashin o tottemo ii desu ka.",
        english: "May I take a photo here?"
      }
    ]
  }
];
