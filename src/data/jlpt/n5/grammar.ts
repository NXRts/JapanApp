export interface Example {
  japanese: string;
  romaji: string;
  english: string; // Wait, actually it's now Indonesian, I'll keep the key as english or maybe indonesian
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

export const n5Grammar: GrammarPoint[] = [];
