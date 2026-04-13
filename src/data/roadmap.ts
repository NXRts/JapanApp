export interface RoadmapLesson {
  id: string;
  title: string;
  description: string;
  link: string;
  type: 'writing' | 'vocabulary' | 'grammar' | 'quiz' | 'survival';
  xpReward: number;
}

export interface RoadmapChapter {
  id: string;
  title: string;
  lessons: RoadmapLesson[];
}

export const ROADMAP_DATA: RoadmapChapter[] = [
  {
    id: 'chapter-1',
    title: 'Chapter 1: The Writing System',
    lessons: [
      {
        id: 'hiragana-intro',
        title: 'Hiragana Basics',
        description: 'Learn the first 46 characters of the Japanese alphabet.',
        link: '/materi/hiragana',
        type: 'writing',
        xpReward: 50
      },
      {
        id: 'hiragana-practice',
        title: 'Mastering Hiragana',
        description: 'Practice writing and reading Hiragana characters.',
        link: '/practice/kana',
        type: 'quiz',
        xpReward: 100
      },
      {
        id: 'katakana-intro',
        title: 'Katakana Intro',
        description: 'Learn Katakana, used for foreign loanwords.',
        link: '/materi/katakana',
        type: 'writing',
        xpReward: 50
      }
    ]
  },
  {
    id: 'chapter-2',
    title: 'Chapter 2: Essential Greetings',
    lessons: [
      {
        id: 'daily-greetings',
        title: 'Daily Greetings',
        description: 'Ohayou, Konnichiwa, and more common phrases.',
        link: '/vocabulary/greetings',
        type: 'survival',
        xpReward: 75
      },
      {
        id: 'self-intro',
        title: 'Self Introductions',
        description: 'How to introduce yourself in Japanese.',
        link: '/vocabulary/introductions',
        type: 'survival',
        xpReward: 100
      }
    ]
  },
  {
    id: 'chapter-3',
    title: 'Chapter 3: Numbers & Time',
    lessons: [
      {
        id: 'numbers-1-100',
        title: 'Counting (1-100)',
        description: 'Master Japanese numbers and counters.',
        link: '/vocabulary/numbers',
        type: 'vocabulary',
        xpReward: 80
      },
      {
        id: 'telling-time',
        title: 'Telling Time',
        description: 'Learn how to ask and tell the time.',
        link: '/vocabulary/time',
        type: 'vocabulary',
        xpReward: 100
      }
    ]
  },
  {
    id: 'chapter-4',
    title: 'Chapter 4: Survival Grammar',
    lessons: [
      {
        id: 'particle-wa',
        title: 'The Particle は',
        description: 'Introduction to sentence topics and "desu".',
        link: '/grammar/basic-topic',
        type: 'grammar',
        xpReward: 150
      },
      {
        id: 'question-ka',
        title: 'Asking Questions',
        description: 'Transform statements into questions with か.',
        link: '/grammar/questions',
        type: 'grammar',
        xpReward: 150
      }
    ]
  }
];
