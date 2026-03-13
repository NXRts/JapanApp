export interface VocabularyItem {
  id: string;
  level: string;
  word: string;
  reading: string;
  romaji: string;
  meaning: string;
  category: "noun" | "verb" | "adjective" | "adverb" | "other";
  example?: {
    japanese: string;
    romaji: string;
    english: string;
  };
}

export const n5Vocabulary: VocabularyItem[] = [
  {
    id: "watashi",
    level: "N5",
    word: "私",
    reading: "わたし",
    romaji: "watashi",
    meaning: "I, me",
    category: "noun",
    example: {
      japanese: "私はジャカルタから来ました。",
      romaji: "Watashi wa Jakaruta kara kimashita.",
      english: "I came from Jakarta."
    }
  },
  {
    id: "taberu",
    level: "N5",
    word: "食べる",
    reading: "たべる",
    romaji: "taberu",
    meaning: "to eat",
    category: "verb",
    example: {
      japanese: "パンを食べます。",
      romaji: "Pan o tabemasu.",
      english: "I eat bread."
    }
  },
  {
    id: "oishii",
    level: "N5",
    word: "美味しい",
    reading: "おいしい",
    romaji: "oishii",
    meaning: "delicious, tasty",
    category: "adjective",
    example: {
      japanese: "この寿司はとても美味しいです。",
      romaji: "Kono sushi wa totemo oishii desu.",
      english: "This sushi is very delicious."
    }
  },
  {
    id: "gakusei",
    level: "N5",
    word: "学生",
    reading: "がくせい",
    romaji: "gakusei",
    meaning: "student",
    category: "noun",
    example: {
      japanese: "彼は大学生です。",
      romaji: "Kare wa daigakusei desu.",
      english: "He is a university student."
    }
  },
  {
    id: "miru",
    level: "N5",
    word: "見る",
    reading: "みる",
    romaji: "miru",
    meaning: "to see, to watch",
    category: "verb",
    example: {
      japanese: "映画を見ます。",
      romaji: "Eiga o mimasu.",
      english: "I watch a movie."
    }
  }
];
