export interface ReadingQuiz {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ReadingPassage {
  id: string;
  title: string;
  level: string; // e.g., 'N5', 'N4'
  tags: string[];
  estimatedTime: string;
  paragraphs: {
    japanese: string;
    english: string;
  }[];
  quizzes: ReadingQuiz[];
}

export const readingPassages: ReadingPassage[] = [
  {
    id: 'n5-self-intro',
    title: '自己紹介 (Self Introduction)',
    level: 'N5',
    tags: ['Daily Life', 'Greetings'],
    estimatedTime: '2 mins',
    paragraphs: [
      {
        japanese: 'はじめまして。わたしの<ruby>名前<rt>なまえ</rt></ruby>は田中です。',
        english: 'Nice to meet you. My name is Tanaka.'
      },
      {
        japanese: 'わたしは<ruby>日本<rt>にほん</rt></ruby>の<ruby>東京<rt>とうきょう</rt></ruby>にすんでいます。きょうはいい<ruby>天気<rt>てんき</rt></ruby>ですね。',
        english: 'I live in Tokyo, Japan. The weather is nice today, isn\'t it?'
      },
      {
        japanese: '<ruby>毎日<rt>まいにち</rt></ruby>、あさ<ruby>７時<rt>しちじ</rt></ruby>におきます。そして、<ruby>朝<rt>あさ</rt></ruby>ごはんをたべます。',
        english: 'I wake up every day at 7 AM. And then, I eat breakfast.'
      }
    ],
    quizzes: [
      {
        question: 'What time does Tanaka wake up?',
        options: ['6 AM', '7 AM', '8 AM', '9 AM'],
        correctAnswerIndex: 1,
        explanation: 'The text says "あさ７時におきます" (I wake up at 7 AM).'
      },
      {
        question: 'Where does Tanaka live?',
        options: ['Kyoto', 'Osaka', 'Tokyo', 'Hokkaido'],
        correctAnswerIndex: 2,
        explanation: 'The text says "日本の東京にすんでいます" (I live in Tokyo, Japan).'
      }
    ]
  },
  {
    id: 'n4-restaurant',
    title: 'レストランで (At the Restaurant)',
    level: 'N4',
    tags: ['Food', 'Conversational'],
    estimatedTime: '3 mins',
    paragraphs: [
      {
        japanese: 'きのう、<ruby>友達<rt>ともだち</rt></ruby>と<ruby>新<rt>あたら</rt></ruby>しいレストランへ<ruby>行<rt>い</rt></ruby>きました。',
        english: 'Yesterday, I went to a new restaurant with my friend.'
      },
      {
        japanese: 'わたしはカレーライスを<ruby>注文<rt>ちゅうもん</rt></ruby>しました。<ruby>友達<rt>ともだち</rt></ruby>はラーメンにしました。',
        english: 'I ordered curry rice. My friend decided on ramen.'
      },
      {
        japanese: 'カレーはとても<ruby>辛<rt>から</rt></ruby>かったですが、おいしかったです。また<ruby>来週<rt>らいしゅう</rt></ruby>も<ruby>行<rt>い</rt></ruby>きたいです。',
        english: 'The curry was very spicy, but it was delicious. I want to go again next week.'
      }
    ],
    quizzes: [
      {
        question: 'What did the author order?',
        options: ['Ramen', 'Curry rice', 'Sushi', 'Hamburg steak'],
        correctAnswerIndex: 1,
        explanation: 'The text says "わたしはカレーライスを注文しました" (I ordered curry rice).'
      },
      {
        question: 'How was the author\'s food?',
        options: ['Sweet', 'Spicy but delicious', 'Not delicious', 'Cold'],
        correctAnswerIndex: 1,
        explanation: 'The text says "カレーはとても辛かったですが、おいしかったです" (The curry was very spicy, but delicious).'
      }
    ]
  },
  {
    id: 'n3-remote-work',
    title: 'リモートワークについて (About Remote Work)',
    level: 'N3',
    tags: ['Business', 'Society'],
    estimatedTime: '4 mins',
    paragraphs: [
      {
        japanese: '<ruby>最近<rt>さいきん</rt></ruby>、<ruby>自宅<rt>じたく</rt></ruby>で<ruby>働<rt>はたら</rt></ruby>く「リモートワーク」が<ruby>増<rt>ふ</rt></ruby>えています。',
        english: 'Recently, the practice of working from home, "remote work", has been increasing.'
      },
      {
        japanese: 'リモートワークの<ruby>良<rt>よ</rt></ruby>いところは、<ruby>通勤<rt>つうきん</rt></ruby>の<ruby>時間<rt>じかん</rt></ruby>がなくなることです。そのため、<ruby>家族<rt>かぞく</rt></ruby>と<ruby>過<rt>す</rt></ruby>ごす<ruby>時間<rt>じかん</rt></ruby>が<ruby>長<rt>なが</rt></ruby>くなります。',
        english: 'The good thing about remote work is that commmuting time disappears. Because of that, you have more time to spend with your family.'
      },
      {
        japanese: 'しかし、<ruby>問題<rt>もんだい</rt></ruby>もあります。<ruby>同僚<rt>どうりょう</rt></ruby>とコミュニケーションをとるのが<ruby>難<rt>むずか</rt></ruby>しくなることです。',
        english: 'However, there are also problems. It becomes harder to communicate with colleagues.'
      }
    ],
    quizzes: [
      {
        question: 'What is mentioned as a benefit of remote work?',
        options: ['Higher salary', 'No commuting time', 'Free lunch', 'Less work hours'],
        correctAnswerIndex: 1,
        explanation: 'The text mentions "通勤の時間がなくなること" (eliminating commuting time).'
      },
      {
        question: 'What is mentioned as a problem with remote work?',
        options: ['Poor internet connection', 'Lack of exercise', 'Difficulty communicating with colleagues', 'Too much noise at home'],
        correctAnswerIndex: 2,
        explanation: 'The texts points out "同僚とコミュニケーションをとるのが難しくなる" (becomes difficult to communicate with colleagues).'
      }
    ]
  }
];
