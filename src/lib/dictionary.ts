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
import { toRomaji } from 'wanakana';

export interface DictionaryResult {
  id: string;
  type: 'vocabulary' | 'grammar' | 'kanji' | 'sentences' | 'jpjp';
  level: string;
  word?: string; // For vocabulary
  title?: string; // For grammar
  kanji?: string; // For kanji
  reading?: string; // For vocabulary/jpjp
  onyomi?: string[]; // For kanji
  kunyomi?: string[]; // For kanji
  stroke_count?: number; // For kanji
  grade?: number; // For kanji
  meaning: string;
  structure?: string; // For grammar
  explanation?: string; // For grammar
  examples?: any[]; // For grammar/jpjp
  romaji?: string;
  partOfSpeech?: string; // For jpjp
  meanings?: string[]; // For jpjp
  source: 'local' | 'jisho' | 'kamus' | 'angka' | 'kanji-db' | 'tatoeba' | 'wiktionary';
  category?: 'noun' | 'verb' | 'adjective' | 'adverb' | 'other' | string;
  indonesian?: string;
  english?: string;
}

const libraryVocabulary = Object.values(jlptWordsData).map((item: any) => ({
  id: `lib-${item.id}`,
  word: item.word,
  reading: item.reading,
  romaji: item.reading,  // We'll use kana reading as the romaji fallback
  meaning: item.english && item.english !== 'No definition' ? item.english : 'No definition',
  level: item.level as string,
  type: 'vocabulary' as const,
  source: 'kamus' as const,
}));

export const allVocabulary: DictionaryResult[] = [
  ...n5Vocabulary.map(v => ({ ...v, type: 'vocabulary' as const, source: 'local' as const })),
  ...n4Vocabulary.map(v => ({ ...v, type: 'vocabulary' as const, source: 'local' as const })),
  ...n3Vocabulary.map(v => ({ ...v, type: 'vocabulary' as const, source: 'local' as const })),
  ...n2Vocabulary.map(v => ({ ...v, type: 'vocabulary' as const, source: 'local' as const })),
  ...n1Vocabulary.map(v => ({ ...v, type: 'vocabulary' as const, source: 'local' as const })),
  ...libraryVocabulary,
];

export const allGrammar: DictionaryResult[] = [
  ...n5Grammar.map(g => ({ ...g, type: 'grammar' as const, source: 'local' as const })),
  ...n4Grammar.map(g => ({ ...g, type: 'grammar' as const, source: 'local' as const })),
  ...n3Grammar.map(g => ({ ...g, type: 'grammar' as const, source: 'local' as const })),
  ...n2Grammar.map(g => ({ ...g, type: 'grammar' as const, source: 'local' as const })),
  ...n1Grammar.map(g => ({ ...g, type: 'grammar' as const, source: 'local' as const })),
];

export const allKanji: DictionaryResult[] = Object.values(kanjiData).map((item: any) => ({
  id: `kanji-${item.kanji}`,
  type: 'kanji',
  level: item.jlpt ? `N${item.jlpt}` : 'Hyogai',
  kanji: item.kanji,
  onyomi: item.onyomi || [],
  kunyomi: item.kunyomi || [],
  stroke_count: item.stroke_count,
  grade: item.grade,
  meaning: item.english && item.english !== 'No definition' ? item.english : 'No definition',
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
  category: 'vocabulary' | 'grammar' | 'kanji' | 'sentences' | 'jpjp' | 'ai' | 'all' | 'kana' = 'all',
  levelFilter: string = 'all'
): Promise<DictionaryResult[]> {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  // Handle specialized proxy searches first
  if (category === 'ai') {
    // For now, AI mode can fallback to a general search or we can implement specific AI logic 
    // In many apps, AI mode might use a different endpoint.
    // Defaulting to 'all' behavior for now but tagged as category 'ai'.
    category = 'all';
  }
  if (category === 'sentences') {
    try {
      const response = await fetch(`/api/proxy/sentences?keyword=${encodeURIComponent(normalizedQuery)}`);
      if (!response.ok) return [];
      const data = await response.json();
      return (data.data || []).map((item: any, idx: number) => ({
        id: `sentence-${idx}`,
        type: 'sentences',
        level: '?',
        word: item.japanese,
        meaning: item.english,
        romaji: item.romaji,
        source: 'tatoeba'
      }));
    } catch (e) {
      console.warn('Sentence search error:', e);
      return [];
    }
  }

  if (category === 'jpjp') {
    try {
      const response = await fetch(`/api/proxy/jpjp?keyword=${encodeURIComponent(normalizedQuery)}`);
      if (!response.ok) return [];
      const data = await response.json();
      return (data.data || []).map((item: any, idx: number) => ({
        id: `jpjp-${idx}`,
        type: 'jpjp',
        level: '?',
        word: item.word,
        reading: item.reading,
        partOfSpeech: item.partOfSpeech,
        meaning: item.meanings.join(', '),
        meanings: item.meanings,
        examples: item.examples,
        source: 'wiktionary'
      }));
    } catch (e) {
      console.warn('JPJP search error:', e);
      return [];
    }
  }

  const localResults: DictionaryResult[] = [];

  // Search local Kana (Hiragana/Katakana characters)
  if (category === 'kana' || category === 'all') {
     const KANA_LIST = [
      'あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ',
      'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ',
      'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん',
      'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ',
      'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ほ',
      'マ', 'ミ', 'む', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'る', 'レ', 'ロ', 'ワ', 'ヲ', 'ン'
    ];
    
    // We'll search in a way similar to browseData in page.tsx
    KANA_LIST.forEach((char, index) => {
      const charRomaji = toRomaji(char).toLowerCase();
      // Since toRomaji isn't easily available in this lib without imports, 
      // we'll just check if the query matches the character itself or its romaji.
      if (char === normalizedQuery || charRomaji.includes(normalizedQuery)) {
        localResults.push({
          id: `kana-search-${index}`,
          type: 'vocabulary',
          level: 'N5',
          word: char,
          reading: charRomaji,
          meaning: `${index < 46 ? 'Hiragana' : 'Katakana'} Character: ${charRomaji.toUpperCase()}`,
          source: 'local'
        });
      }
    });

    // Also include any vocabulary that matches the kana query if searching under kana category
    if (category === 'kana') {
        allVocabulary.forEach((item) => {
          if (item.word === normalizedQuery || item.reading === normalizedQuery) {
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
  }

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
  if (category === 'vocabulary' || category === 'all') {
    allVocabulary.forEach((item) => {
      if (levelFilter !== 'all' && item.level !== levelFilter) return;
      const word = item.word;
      const reading = item.reading;
      const romaji = item.romaji;
      const meaning = item.meaning;
      if (
        (word && word.toLowerCase().includes(normalizedQuery)) ||
        (reading && reading.toLowerCase().includes(normalizedQuery)) ||
        (romaji && romaji.toLowerCase().includes(normalizedQuery)) ||
        (meaning && meaning.toLowerCase().includes(normalizedQuery))
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
  if (category === 'grammar' || category === 'all') {
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
  if (category === 'kanji' || category === 'grammar') {
    return localResults.slice(0, 100);
  }

  // Fetch from Jisho API Proxy for general vocabulary search
  try {
    const response = await fetch(`/api/proxy/jisho?keyword=${encodeURIComponent(normalizedQuery)}`);
    if (!response.ok) {
       return localResults.slice(0, 100);
    }
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
    console.warn('Search yield warning (fetch failed):', error);
    return localResults.slice(0, 100);
  }
}
