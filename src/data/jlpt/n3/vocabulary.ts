import { VocabularyItem } from '../n5/vocabulary';

export const n3Vocabulary: VocabularyItem[] = [
  {
    id: "keiken",
    level: "N3",
    word: "経験",
    reading: "けいけん",
    romaji: "keiken",
    meaning: "experience",
    category: "noun",
    example: {
      japanese: "いい経験になりました。",
      romaji: "Ii keiken ni narimashita.",
      english: "It was a good experience."
    }
  },
  {
    id: "hitsuyo",
    level: "N3",
    word: "必要",
    reading: "ひつよう",
    romaji: "hitsuyo",
    meaning: "necessary",
    category: "adjective",
    example: {
      japanese: "パスポートが必要です。",
      romaji: "Pasupōto ga hitsuyō desu.",
      english: "A passport is necessary."
    }
  }
];
