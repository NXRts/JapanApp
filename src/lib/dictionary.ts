import jlptWordsData from '../../public/JLPT_Vocabulary/data/results/JLPTWords.json';
import numbersData from '../../public/JLPT_Vocabulary/data/Angka.json';
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
  source: 'local' | 'jisho' | 'kamus' | 'angka';
}

const libraryVocabulary = Object.entries(jlptWordsData).map(([word, level]) => ({
  id: `lib-${word}`,
  word,
  reading: '',
  romaji: '',
  meaning: 'See Jisho for definition',
  level: level as string,
}));

export const allVocabulary = [
  ...n5Vocabulary,
  ...n4Vocabulary,
  ...n3Vocabulary,
  ...n2Vocabulary,
  ...n1Vocabulary,
  ...libraryVocabulary,
];

export const allGrammar = [
  ...n5Grammar,
  ...n4Grammar,
  ...n3Grammar,
  ...n2Grammar,
  ...n1Grammar,
];

export const allNumbers = Object.entries(numbersData).flatMap(([category, items]) => 
  Object.entries(items).map(([num, data]: [string, any]) => ({
    id: `num-${num}`,
    type: 'vocabulary' as const,
    level: category.replace('_', ' '),
    word: data.kanji,
    reading: data.hiragana,
    meaning: `Number: ${num}`,
    romaji: data.romaji,
    source: 'angka' as const,
  }))
);

export async function searchDictionary(query: string): Promise<DictionaryResult[]> {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  const localResults: DictionaryResult[] = [];

  // Search local Vocabulary
  allVocabulary.forEach((item) => {
    if (
      item.word.toLowerCase().includes(normalizedQuery) ||
      (item.reading && item.reading.toLowerCase().includes(normalizedQuery)) ||
      (item.romaji && item.romaji.toLowerCase().includes(normalizedQuery)) ||
      (item.meaning && item.meaning.toLowerCase().includes(normalizedQuery))
    ) {
      localResults.push({
        id: item.id,
        type: 'vocabulary',
        level: item.level,
        word: item.word,
        reading: item.reading,
        meaning: item.meaning,
        romaji: item.romaji,
        source: item.id.startsWith('lib-') ? 'kamus' : 'local',
      });
    }
  });

  // Search local Grammar
  allGrammar.forEach((item) => {
    if (
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.meaning.toLowerCase().includes(normalizedQuery)
    ) {
      localResults.push({
        id: item.id,
        type: 'grammar',
        level: item.level,
        title: item.title,
        meaning: item.meaning,
        source: 'local',
      });
    }
  });

  // Fetch from Jisho API Proxy
  try {
    const response = await fetch(`/api/proxy/jisho?keyword=${encodeURIComponent(normalizedQuery)}`);
    const data = await response.json();
    
    const jishoResults: DictionaryResult[] = (data.data || []).map((item: any) => ({
      id: item.japanese[0].word || item.japanese[0].reading,
      type: 'vocabulary' as const,
      level: item.jlpt?.[0]?.toUpperCase().replace('JLPT-', '') || '?',
      word: item.japanese[0].word || item.japanese[0].reading,
      reading: item.japanese[0].reading,
      meaning: item.senses[0].english_definitions.join(', '),
      source: 'jisho' as const,
    }));

    // Filter out duplicates (if word already in localResults)
    const localWords = new Set(localResults.map(r => r.word || r.title));
    const uniqueJishoResults = jishoResults.filter(r => !localWords.has(r.word || r.title));

    return [...localResults, ...uniqueJishoResults].slice(0, 15);
  } catch (error) {
    console.error('Search yield error:', error);
    return localResults.slice(0, 10);
  }
}
