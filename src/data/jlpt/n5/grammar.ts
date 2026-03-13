export interface Example {
  japanese: string;
  romaji: string;
  english: string;
}

export interface GrammarPoint {
  id: string;
  level: string;
  title: string;
  meaning: string;
  structure: string;
  explanation: string;
  examples: Example[];
}

export const n5Grammar: GrammarPoint[] = [
  {
    id: "wa-desu",
    level: "N5",
    title: "A は B です (A wa B desu)",
    meaning: "A is B",
    structure: "[Noun A] は [Noun B] です",
    explanation: "The particle は (wa) identifies the topic of the sentence, and です (desu) is a polite copula meaning 'to be'.",
    examples: [
      {
        japanese: "私は学生です。",
        romaji: "Watashi wa gakusei desu.",
        english: "I am a student."
      },
      {
        japanese: "これは本です。",
        romaji: "Kore wa hon desu.",
        english: "This is a book."
      }
    ]
  },
  {
    id: "mo-desu",
    level: "N5",
    title: "A も B です (A mo B desu)",
    meaning: "A is also B",
    structure: "[Noun A] も [Noun B] です",
    explanation: "The particle も (mo) replaces は (wa) to indicate that the topic also shares a characteristic with something previously mentioned.",
    examples: [
      {
        japanese: "田中さんも学生です。",
        romaji: "Tanaka-san mo gakusei desu.",
        english: "Mr. Tanaka is also a student."
      }
    ]
  },
  {
    id: "no-particle",
    level: "N5",
    title: "A の B (A no B)",
    meaning: "B of A / A's B",
    structure: "[Noun A] の [Noun B]",
    explanation: "The particle の (no) indicates possession or connection between two nouns.",
    examples: [
      {
        japanese: "私の名前はユスフです。",
        romaji: "Watashi no namae wa Yusuf desu.",
        english: "My name is Yusuf."
      },
      {
        japanese: "これは日本語の本です。",
        romaji: "Kore wa nihongo no hon desu.",
        english: "This is a Japanese language book."
      }
    ]
  }
];
