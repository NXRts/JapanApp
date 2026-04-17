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
  },
  {
    id: 'n2-technology',
    title: '現代のテクノロジーと社会 (Modern Technology and Society)',
    level: 'N2',
    tags: ['Technology', 'Society', 'Advanced'],
    estimatedTime: '5 mins',
    paragraphs: [
      {
        japanese: 'スマートフォンの<ruby>普及<rt>ふきゅう</rt></ruby>により、私たちの<ruby>生活<rt>せいかつ</rt></ruby>は<ruby>劇的<rt>げきてき</rt></ruby>に<ruby>変化<rt>へんか</rt></ruby>した。いつでもどこでも<ruby>情報<rt>じょうほう</rt></ruby>にアクセスできる<ruby>便利<rt>べんり</rt></ruby>さがある<ruby>一方<rt>いっぽう</rt></ruby>で、<ruby>対面<rt>たいめん</rt></ruby>のコミュニケーションが<ruby>減少<rt>げんしょう</rt></ruby>しているという<ruby>指摘<rt>してき</rt></ruby>もある。',
        english: 'With the widespread use of smartphones, our lives have changed dramatically. While there is the convenience of accessing information anytime and anywhere, it is also pointed out that face-to-face communication is decreasing.'
      },
      {
        japanese: 'また、SNSの<ruby>利用<rt>りよう</rt></ruby>が<ruby>若者<rt>わかもの</rt></ruby>の<ruby>心理的<rt>しんりてき</rt></ruby>なストレスに<ruby>繋<rt>つな</rt></ruby>がるケースも<ruby>報告<rt>ほうこく</rt></ruby>されている。<ruby>便利<rt>べんり</rt></ruby>なツールであるからこそ、その<ruby>使<rt>つか</rt></ruby>い<ruby>方<rt>かた</rt></ruby>には<ruby>十分<rt>じゅうぶん</rt></ruby>な<ruby>注意<rt>ちゅうい</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>だ。',
        english: 'Furthermore, there are reported cases where the use of SNS leads to psychological stress in young people. Precisely because it is a convenient tool, sufficient caution is necessary in how it is used.'
      }
    ],
    quizzes: [
      {
        question: 'What is mentioned as a negative effect of smartphones?',
        options: ['Lack of information', 'Decrease in face-to-face communication', 'High costs', 'Lack of convenience'],
        correctAnswerIndex: 1,
        explanation: 'The text states "対面のコミュニケーションが減少しているという指摘もある" (it is pointed out that face-to-face communication is decreasing).'
      },
      {
        question: 'According to the passage, why must we be careful when using SNS?',
        options: ['Because it is difficult to use', 'Because it costs a lot of money', 'Because it can lead to psychological stress', 'Because old people cannot use it'],
        correctAnswerIndex: 2,
        explanation: 'The text mentions cases where SNS use leads to psychological stress (心理的なストレスに繋がるケース).'
      }
    ]
  },
  {
    id: 'n1-traditional-culture',
    title: '日本の伝統文化の継承 (Inheritance of Traditional Culture)',
    level: 'N1',
    tags: ['Culture', 'History', 'Advanced'],
    estimatedTime: '6 mins',
    paragraphs: [
      {
        japanese: '<ruby>急速<rt>きゅうそく</rt></ruby>なグローバル<ruby>化<rt>か</rt></ruby>の<ruby>波<rt>なみ</rt></ruby>に<ruby>洗<rt>あら</rt></ruby>われる<ruby>現代<rt>げんだい</rt></ruby>において、<ruby>自国<rt>じこく</rt></ruby>の<ruby>伝統文化<rt>でんとうぶんか</rt></ruby>をいかに<ruby>継承<rt>けいしょう</rt></ruby>していくかは、<ruby>多<rt>おお</rt></ruby>くの<ruby>国<rt>くに</rt></ruby>が<ruby>直面<rt>ちょくめん</rt></ruby>する<ruby>課題<rt>かだい</rt></ruby>である。<ruby>日本<rt>にほん</rt></ruby>においても、<ruby>後継者不足<rt>こうけいしゃぶそく</rt></ruby>により<ruby>存続<rt>そんぞく</rt></ruby>の<ruby>危機<rt>きき</rt></ruby>に<ruby>瀕<rt>ひん</rt></ruby>している<ruby>伝統工芸<rt>でんとうこうげい</rt></ruby>は<ruby>少<rt>すく</rt></ruby>なくない。',
        english: 'In modern times washed by the waves of rapid globalization, how to inherit one\'s own traditional culture is a challenge faced by many countries. In Japan as well, not a few traditional crafts are on the verge of survival due to a lack of successors.'
      },
      {
        japanese: 'しかし、<ruby>単<rt>たん</rt></ruby>に<ruby>古<rt>ふる</rt></ruby>き<ruby>良<rt>よ</rt></ruby>きものを<ruby>保存<rt>ほぞん</rt></ruby>するだけでなく、<ruby>現代<rt>げんだい</rt></ruby>のライフスタイルに<ruby>合<rt>あ</rt></ruby>わせて<ruby>柔軟<rt>じゅうなん</rt></ruby>に<ruby>形<rt>かたち</rt></ruby>を<ruby>変<rt>か</rt></ruby>えながら<ruby>受<rt>う</rt></ruby>け<ruby>継<rt>つ</rt></ruby>がれるべきだという<ruby>意見<rt>いけん</rt></ruby>も<ruby>台頭<rt>たいとう</rt></ruby>している。',
        english: 'However, opinions are also emerging that we shouldn\'t merely preserve the good old things, but rather inherit them while flexibly changing their forms to match modern lifestyles.'
      }
    ],
    quizzes: [
      {
        question: 'What is a major reason traditional crafts are in danger in Japan?',
        options: ['Lack of materials', 'Lack of successors', 'Lack of interest from foreigners', 'Lack of government funding'],
        correctAnswerIndex: 1,
        explanation: 'The text mentions "後継者不足により" (due to a lack of successors).'
      },
      {
        question: 'What emerging opinion regarding traditional culture is mentioned?',
        options: ['It should be completely replaced', 'It should be preserved exactly as it was', 'It should adapt to modern lifestyles', 'It should only be taught in schools'],
        correctAnswerIndex: 2,
        explanation: 'The text states it should be inherited while flexibly changing forms to match modern lifestyles (現代のライフスタイルに合わせて柔軟に形を変えながら...).'
      }
    ]
  },
  {
    id: 'n5-weekend-plans',
    title: '週末の予定 (Weekend Plans)',
    level: 'N5',
    tags: ['Daily Life', 'Activities'],
    estimatedTime: '2 mins',
    paragraphs: [
      {
        japanese: 'わたしの<ruby>趣味<rt>しゅみ</rt></ruby>はえいがをみることです。<ruby>今週<rt>こんしゅう</rt></ruby>の<ruby>日曜日<rt>にちようび</rt></ruby>、<ruby>友達<rt>ともだち</rt></ruby>とえいがかんへ<ruby>行<rt>い</rt></ruby>きます。',
        english: 'My hobby is watching movies. This Sunday, I will go to the movie theater with my friend.'
      },
      {
        japanese: 'えいがのあとで、いっしょに<ruby>晩<rt>ばん</rt></ruby>ごはんをたべます。とても<ruby>楽<rt>たの</rt></ruby>しみです。',
        english: 'After the movie, we will eat dinner together. I am really looking forward to it.'
      }
    ],
    quizzes: [
      {
        question: 'What is the author\'s hobby?',
        options: ['Reading books', 'Listening to music', 'Watching movies', 'Playing sports'],
        correctAnswerIndex: 2,
        explanation: 'The text says "わたしの趣味はえいがをみることです" (My hobby is watching movies).'
      },
      {
        question: 'When is the author going to the movie theater?',
        options: ['Saturday', 'Sunday', 'Friday', 'Next week'],
        correctAnswerIndex: 1,
        explanation: 'The text states "今週の日曜日" (This Sunday).'
      }
    ]
  }
];
