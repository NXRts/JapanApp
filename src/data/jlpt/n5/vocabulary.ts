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

export const n5Vocabulary: VocabularyItem[] = [];
