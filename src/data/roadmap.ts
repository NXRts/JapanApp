export interface RoadmapLesson {
  id: string;
  title: string;
  description: string;
  link: string;
  type: 'writing' | 'vocabulary' | 'grammar' | 'quiz' | 'survival' | 'kanji';
  xpReward: number;
}

export interface RoadmapChapter {
  id: string;
  title: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  lessons: RoadmapLesson[];
}

export const ROADMAP_DATA: RoadmapChapter[] = [
  {
    id: 'n5-foundation',
    title: 'N5: The Foundations',
    level: 'N5',
    lessons: [
      { id: 'hiragana', title: 'Hiragana Mastery', description: 'The phonetic base of Japanese.', link: '/study/kanji', type: 'writing', xpReward: 50 },
      { id: 'katakana', title: 'Katakana Intro', description: 'Loanwords and foreign names.', link: '/study/kanji', type: 'writing', xpReward: 50 },
      { id: 'basic-particles', title: 'Essential Particles', description: 'は, が, を, に fundamentals.', link: '/study/grammar', type: 'grammar', xpReward: 100 },
      { id: 'n5-vocab-1', title: 'Daily Vocab', description: '100 most common words.', link: '/study/vocabulary', type: 'vocabulary', xpReward: 100 },
    ]
  },
  {
    id: 'n4-intermediate-base',
    title: 'N4: Expanding Horizons',
    level: 'N4',
    lessons: [
      { id: 'n4-grammar', title: 'Intermediate Grammar', description: 'Complex sentences and conjugation.', link: '/study/grammar', type: 'grammar', xpReward: 150 },
      { id: 'n4-kanji', title: '300 Essential Kanji', description: 'Daily life characters.', link: '/study/kanji', type: 'kanji', xpReward: 200 },
      { id: 'n4-listening', title: 'Basic Conversation', description: 'Understanding native speed.', link: '/study/listening', type: 'survival', xpReward: 150 },
    ]
  },
  {
    id: 'n3-bridge',
    title: 'N3: The Bridge',
    level: 'N3',
    lessons: [
      { id: 'n3-reading', title: 'Short Stories', description: 'Reading for comprehension.', link: '/study/reading', type: 'vocabulary', xpReward: 250 },
      { id: 'n3-keigo', title: 'Honorifics Intro', description: 'Polite and humble speech.', link: '/study/speaking', type: 'survival', xpReward: 200 },
      { id: 'n3-kanji-mastery', title: '600 Kanji', description: 'Advanced character sets.', link: '/study/kanji', type: 'kanji', xpReward: 300 },
    ]
  },
  {
    id: 'n2-business',
    title: 'N2: Professional Japanese',
    level: 'N2',
    lessons: [
      { id: 'n2-business-vocab', title: 'Business Terms', description: 'Workplace vocabulary.', link: '/study/vocabulary', type: 'vocabulary', xpReward: 400 },
      { id: 'n2-advanced-grammar', title: 'Abstract Grammar', description: 'Nuanced expressions.', link: '/study/grammar', type: 'grammar', xpReward: 400 },
      { id: 'n2-news-listening', title: 'News Reports', description: 'Understanding media.', link: '/study/listening', type: 'survival', xpReward: 400 },
    ]
  },
  {
    id: 'n1-fluency',
    title: 'N1: Native Fluency',
    level: 'N1',
    lessons: [
      { id: 'n1-literature', title: 'Classic Literature', description: 'Deep cultural understanding.', link: '/study/reading', type: 'writing', xpReward: 500 },
      { id: 'n1-kanji-2000', title: 'Jouyou Kanji 2136', description: 'The complete set.', link: '/study/kanji', type: 'kanji', xpReward: 1000 },
      { id: 'n1-philosophical-debate', title: 'Abstract Discussion', description: 'High-level speaking.', link: '/study/speaking', type: 'survival', xpReward: 600 },
    ]
  }
];
