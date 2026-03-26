import jlptWordsData from '../../public/JLPT_Vocabulary/data/results/JLPTWordsEnriched.json';
import numbersData from '../../public/JLPT_Vocabulary/data/Angka.json';
import kanjiData from '../../public/JLPT_Vocabulary/data/results/KanjiDictionary.json';
import grammarData from '../../public/JLPT_Vocabulary/data/results/GrammarDictionary.json';
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
  type: 'vocabulary' | 'grammar' | 'kanji';
  level: string;
  word?: string; // For vocabulary
  title?: string; // For grammar
  kanji?: string; // For kanji
  reading?: string; // For vocabulary
  onyomi?: string[]; // For kanji
  kunyomi?: string[]; // For kanji
  stroke_count?: number; // For kanji
  grade?: number; // For kanji
  meaning: string;
  structure?: string; // For grammar
  explanation?: string; // For grammar
  examples?: any[]; // For grammar
  romaji?: string;
  source: 'local' | 'jisho' | 'kamus' | 'angka' | 'kanji-db';
}

const libraryVocabulary = Object.values(jlptWordsData).map((item: any) => ({
  id: `lib-${item.id}`,
  word: item.word,
  reading: item.reading,
  romaji: item.reading,  // We'll use kana reading as the romaji fallback
  meaning: item.indonesian && item.indonesian !== 'Tidak ada arti' ? item.indonesian : (item.english || 'No definition'),
  level: item.level as string,
}));

export const allVocabulary = [
  ...n5Vocabulary,
  ...n4Vocabulary,
  ...n3Vocabulary,
  ...n2Vocabulary,
  ...n1Vocabulary,
  ...libraryVocabulary,
];

export const allGrammar: DictionaryResult[] = Object.values(grammarData).map((item: any) => ({
  ...item,
  type: 'grammar',
  source: 'local'
}));

export const allKanji: DictionaryResult[] = Object.values(kanjiData).map((item: any) => ({
  id: `kanji-${item.kanji}`,
  type: 'kanji',
  level: item.jlpt ? `N${item.jlpt}` : 'Hyogai',
  kanji: item.kanji,
  onyomi: item.onyomi || [],
  kunyomi: item.kunyomi || [],
  stroke_count: item.stroke_count,
  grade: item.grade,
  meaning: item.indonesian && item.indonesian !== 'Tidak ada arti' ? item.indonesian : (item.english || 'No definition'),
  source: 'kanji-db',
}));

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

export async function searchDictionary(
  query: string, 
  category: 'kata' | 'tata-bahasa' | 'kanji' | 'all' = 'all',
  levelFilter: string = 'all'
): Promise<DictionaryResult[]> {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  const localResults: DictionaryResult[] = [];

  // Search local Kanji
  if (category === 'kanji' || category === 'all') {
    allKanji.forEach((item) => {
      if (levelFilter !== 'all' && item.level !== levelFilter) return;
      if (
        (item.kanji && item.kanji.includes(normalizedQuery)) ||
        item.onyomi?.some(r => r.includes(normalizedQuery) || r.toLowerCase().includes(normalizedQuery)) ||
        item.kunyomi?.some(r => r.includes(normalizedQuery) || r.toLowerCase().includes(normalizedQuery)) ||
        item.meaning.toLowerCase().includes(normalizedQuery)
      ) {
        localResults.push(item);
      }
    });
  }

  // Search local Vocabulary
  if (category === 'kata' || category === 'all') {
    allVocabulary.forEach((item) => {
      if (levelFilter !== 'all' && item.level !== levelFilter) return;
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
  }

  // Search local Grammar
  if (category === 'tata-bahasa' || category === 'all') {
    allGrammar.forEach((item) => {
      if (levelFilter !== 'all' && item.level !== levelFilter) return;
      if (
        (item.title && item.title.toLowerCase().includes(normalizedQuery)) ||
        item.meaning.toLowerCase().includes(normalizedQuery)
      ) {
        localResults.push({
          id: item.id,
          type: 'grammar',
          level: item.level,
          title: item.title,
          meaning: item.meaning,
          structure: item.structure,
          explanation: item.explanation,
          examples: item.examples,
          source: 'local',
        });
      }
    });
  }

  // If we only want Kanji or Grammar, we can skip fetching Jisho
  if (category === 'kanji' || category === 'tata-bahasa') {
    return localResults.slice(0, 100);
  }

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
    const localWords = new Set(localResults.map(r => r.word || r.title || r.kanji));
    let uniqueJishoResults = jishoResults.filter(r => !localWords.has(r.word || r.title || r.kanji));
    
    // Apply level filter to Jisho results as well
    if (levelFilter !== 'all') {
      uniqueJishoResults = uniqueJishoResults.filter(r => r.level === levelFilter);
    }

    return [...localResults, ...uniqueJishoResults].slice(0, 100);
  } catch (error) {
    console.error('Search yield error:', error);
    return localResults.slice(0, 50);
  }
}
