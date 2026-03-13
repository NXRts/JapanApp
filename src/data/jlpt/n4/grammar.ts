import { GrammarPoint } from '../n5/grammar';

export const n4Grammar: GrammarPoint[] = [
  {
    id: "ndesu",
    level: "N4",
    title: "～んです (~ndesu)",
    meaning: "Explanation or emphasis",
    structure: "[Plain form] + んです",
    explanation: "Used to provide an explanation, ask for an explanation, or add emphasis to a statement.",
    examples: [
      {
        japanese: "頭が痛いんです。",
        romaji: "Atama ga itai n desu.",
        english: "The thing is, my head hurts."
      },
      {
        japanese: "どこへ行くんですか。",
        romaji: "Doko e iku n desu ka.",
        english: "Where is it that you're going?"
      }
    ]
  },
  {
    id: "temo-ii",
    level: "N4",
    title: "～てもいい (~temo ii)",
    meaning: "May I... / It is okay to...",
    structure: "[Te-form] + もいい (です)",
    explanation: "Used to ask for permission or to state that something is allowed.",
    examples: [
      {
        japanese: "ここで写真を撮ってもいいですか。",
        romaji: "Koko de shashin o tottemo ii desu ka.",
        english: "May I take a photo here?"
      },
      {
        japanese: "入ってもいいですよ。",
        romaji: "Haittemo ii desu yo.",
        english: "You may enter."
      }
    ]
  },
  {
    id: "nagira",
    level: "N4",
    title: "～ながら (~nagara)",
    meaning: "While doing...",
    structure: "[Verb stem] + ながら",
    explanation: "Used when two actions are performed simultaneously by the same person.",
    examples: [
      {
        japanese: "音楽を聞きながら勉強します。",
        romaji: "Ongaku o kikinagara benkyou shimasu.",
        english: "I study while listening to music."
      }
    ]
  }
];
