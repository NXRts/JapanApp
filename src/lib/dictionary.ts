import { n5Vocabulary } from '@/data/jlpt/n5/vocabulary';
import { n4Vocabulary } from '@/data/jlpt/n4/vocabulary';
import { n3Vocabulary } from '@/data/jlpt/n3/vocabulary';
import { n2Vocabulary } from '@/data/jlpt/n2/vocabulary';
import { n1Vocabulary } from '@/data/jlpt/n1/vocabulary';

import { n5Grammar } from '@/data/jlpt/n5/grammar';
import { n4Grammar } from '@/data/jlpt/n4/grammar';
import { n3Grammar } from '@/data/jlpt/n3/grammar';
import { n2Grammar } from '@/data/jlpt/n2/grammar';
import { n1Grammar } from '@/data/jlpt/n1/grammar';

export interface DictionaryResult {
  id: string;
  type: 'vocabulary' | 'grammar';
  level: string;
  word?: string; // For vocabulary
  title?: string; // For grammar
  reading?: string; // For vocabulary
  meaning: string;
  romaji?: string;
}

const allVocabulary = [
  ...n5Vocabulary,
  ...n4Vocabulary,
  ...n3Vocabulary,
  ...n2Vocabulary,
  ...n1Vocabulary,
];

const allGrammar = [
  ...n5Grammar,
  ...n4Grammar,
  ...n3Grammar,
  ...n2Grammar,
  ...n1Grammar,
];

export function searchDictionary(query: string): DictionaryResult[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  const results: DictionaryResult[] = [];

  // Search Vocabulary
  allVocabulary.forEach((item) => {
    if (
      item.word.toLowerCase().includes(normalizedQuery) ||
      item.reading.toLowerCase().includes(normalizedQuery) ||
      item.romaji.toLowerCase().includes(normalizedQuery) ||
      item.meaning.toLowerCase().includes(normalizedQuery)
    ) {
      results.push({
        id: item.id,
        type: 'vocabulary',
        level: item.level,
        word: item.word,
        reading: item.reading,
        meaning: item.meaning,
        romaji: item.romaji,
      });
    }
  });

  // Search Grammar
  allGrammar.forEach((item) => {
    if (
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.meaning.toLowerCase().includes(normalizedQuery)
    ) {
      results.push({
        id: item.id,
        type: 'grammar',
        level: item.level,
        title: item.title,
        meaning: item.meaning,
      });
    }
  });

  return results.slice(0, 10); // Limit to top 10 results for performance
}
