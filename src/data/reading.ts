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
  },
  {
    id: 'n5-shopping',
    title: '買い物のリスト (Shopping List)',
    level: 'N5',
    tags: ['Shopping', 'Daily Life'],
    estimatedTime: '2 mins',
    paragraphs: [
      {
        japanese: 'きょうはスーパーへ<ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>に<ruby>行<rt>い</rt></ruby>きます。<ruby>冷蔵庫<rt>れいぞうこ</rt></ruby>になにもありません。',
        english: 'I am going shopping at the supermarket today. There is nothing in the refrigerator.'
      },
      {
        japanese: 'りんごとパンとぎゅうにゅうを<ruby>買<rt>か</rt></ruby>います。それから、たまごも<ruby>買<rt>か</rt></ruby>います。',
        english: 'I will buy apples, bread, and milk. And then, I will also buy eggs.'
      }
    ],
    quizzes: [
      {
        question: 'Where is the author going today?',
        options: ['Department Store', 'Supermarket', 'Convenience Store', 'Restaurant'],
        correctAnswerIndex: 1,
        explanation: 'The text says "スーパーへ買い物に行きます" (I am going shopping at the supermarket).'
      },
      {
        question: 'Which of the following is NOT on the shopping list?',
        options: ['Apples', 'Bread', 'Fish', 'Eggs'],
        correctAnswerIndex: 2,
        explanation: 'The list includes apples (りんご), bread (パン), milk (ぎゅうにゅう), and eggs (たまご). Fish is not mentioned.'
      }
    ]
  },
  {
    id: 'n5-japanese-class',
    title: '日本語のクラス (Japanese Class)',
    level: 'N5',
    tags: ['School', 'Study'],
    estimatedTime: '2 mins',
    paragraphs: [
      {
        japanese: 'わたしの<ruby>日本語<rt>にほんご</rt></ruby>のクラスは<ruby>月曜日<rt>げつようび</rt></ruby>と<ruby>木曜日<rt>もくようび</rt></ruby>にあります。',
        english: 'My Japanese class is on Monday and Thursday.'
      },
      {
        japanese: 'クラスに<ruby>学生<rt>がくせい</rt></ruby>が１５<ruby>人<rt>にん</rt></ruby>います。<ruby>先生<rt>せんせい</rt></ruby>はとてもやさしいです。',
        english: 'There are 15 students in the class. The teacher is very kind.'
      }
    ],
    quizzes: [
      {
        question: 'What days are the Japanese classes?',
        options: ['Monday and Tuesday', 'Tuesday and Friday', 'Monday and Thursday', 'Wednesday and Friday'],
        correctAnswerIndex: 2,
        explanation: 'The text says "月曜日と木曜日" (Monday and Thursday).'
      },
      {
        question: 'How is the teacher described?',
        options: ['Strict', 'Kind', 'Funny', 'Scary'],
        correctAnswerIndex: 1,
        explanation: 'The text says "先生はとてもやさしいです" (The teacher is very kind).'
      }
    ]
  },
  {
    id: 'n4-four-seasons',
    title: '日本の四季 (Japan\'s Four Seasons)',
    level: 'N4',
    tags: ['Nature', 'Culture'],
    estimatedTime: '3 mins',
    paragraphs: [
      {
        japanese: '<ruby>日本<rt>にほん</rt></ruby>には<ruby>春<rt>はる</rt></ruby>、<ruby>夏<rt>なつ</rt></ruby>、<ruby>秋<rt>あき</rt></ruby>、<ruby>冬<rt>ふゆ</rt></ruby>の４つの<ruby>季節<rt>きせつ</rt></ruby>があります。それぞれの<ruby>季節<rt>きせつ</rt></ruby>で<ruby>違<rt>ちが</rt></ruby>う<ruby>景色<rt>けしき</rt></ruby>を<ruby>楽<rt>たの</rt></ruby>しむことができます。',
        english: 'Japan has four seasons: spring, summer, autumn, and winter. You can enjoy different scenery in each season.'
      },
      {
        japanese: '<ruby>春<rt>はる</rt></ruby>は<ruby>桜<rt>さくら</rt></ruby>がとてもきれいです。<ruby>秋<rt>あき</rt></ruby>は<ruby>山<rt>やま</rt></ruby>の<ruby>木<rt>き</rt></ruby>が<ruby>赤<rt>あか</rt></ruby>や<ruby>黄色<rt>きいろ</rt></ruby>になります。',
        english: 'In spring, the cherry blossoms are very beautiful. In autumn, the trees on the mountains turn red and yellow.'
      }
    ],
    quizzes: [
      {
        question: 'How many seasons does Japan have?',
        options: ['Two', 'Three', 'Four', 'Five'],
        correctAnswerIndex: 2,
        explanation: 'The text says "日本には春、夏、秋、冬の４つの季節があります" (Japan has 4 seasons).'
      },
      {
        question: 'What happens in autumn according to the text?',
        options: ['Cherry blossoms bloom', 'It snows a lot', 'Trees turn red and yellow', 'It gets very hot'],
        correctAnswerIndex: 2,
        explanation: 'The text says "秋は山の木が赤や黄色になります" (In autumn, the trees on the mountains turn red and yellow).'
      }
    ]
  },
  {
    id: 'n4-riding-train',
    title: '電車の乗り方 (How to Ride the Train)',
    level: 'N4',
    tags: ['Travel', 'Transportation'],
    estimatedTime: '3 mins',
    paragraphs: [
      {
        japanese: '<ruby>日本<rt>にほん</rt></ruby>で<ruby>電車<rt>でんしゃ</rt></ruby>に<ruby>乗<rt>の</rt></ruby>る<ruby>時<rt>とき</rt></ruby>は、まず<ruby>切符<rt>きっぷ</rt></ruby>を<ruby>買<rt>か</rt></ruby>うか、ICカードを<ruby>使<rt>つか</rt></ruby>います。',
        english: 'When taking a train in Japan, you first buy a ticket or use an IC card.'
      },
      {
        japanese: '<ruby>電車<rt>でんしゃ</rt></ruby>の<ruby>中<rt>なか</rt></ruby>では、<ruby>大<rt>おお</rt></ruby>きい<ruby>声<rt>こえ</rt></ruby>で<ruby>話<rt>はな</rt></ruby>してはいけません。<ruby>電話<rt>でんわ</rt></ruby>をかけるのもだめです。',
        english: 'Inside the train, you must not speak in a loud voice. Making phone calls is also not allowed.'
      }
    ],
    quizzes: [
      {
        question: 'What should you NOT do inside a Japanese train?',
        options: ['Read a book', 'Speak loudly', 'Listen to music', 'Sleep'],
        correctAnswerIndex: 1,
        explanation: 'The text says "電車の中では、大きい声で話してはいけません" (You must not speak loudly inside the train).'
      },
      {
        question: 'What are the two ways to pay for the train mentioned in the text?',
        options: ['Cash and credit card', 'Ticket and smartphone', 'Ticket and IC card', 'IC card and cash'],
        correctAnswerIndex: 2,
        explanation: 'The text says "切符を買うか、ICカードを使います" (Buy a ticket or use an IC card).'
      }
    ]
  },
  {
    id: 'n3-volunteering',
    title: 'ボランティア活動 (Volunteer Activities)',
    level: 'N3',
    tags: ['Society', 'Activities'],
    estimatedTime: '4 mins',
    paragraphs: [
      {
        japanese: '<ruby>先週末<rt>せんしゅうまつ</rt></ruby>、<ruby>公園<rt>こうえん</rt></ruby>のゴミ<ruby>拾<rt>ひろ</rt></ruby>いのボランティアに<ruby>参加<rt>さんか</rt></ruby>しました。',
        english: 'Last weekend, I participated in a volunteer activity to pick up trash at the park.'
      },
      {
        japanese: '<ruby>思<rt>おも</rt></ruby>っていたより<ruby>多<rt>おお</rt></ruby>くのゴミがあり、とくにプラスチックのゴミが<ruby>目立<rt>めだ</rt></ruby>ちました。',
        english: 'There was more trash than I expected, and plastic trash was particularly noticeable.'
      },
      {
        japanese: 'ボランティアを<ruby>通<rt>とお</rt></ruby>じて、<ruby>環境<rt>かんきょう</rt></ruby>について<ruby>考<rt>かんが</rt></ruby>える<ruby>良<rt>よ</rt></ruby>い<ruby>機会<rt>きかい</rt></ruby>になりました。',
        english: 'Through volunteering, it became a good opportunity to think about the environment.'
      }
    ],
    quizzes: [
      {
        question: 'What kind of volunteer activity did the author do?',
        options: ['Helping the elderly', 'Teaching Japanese', 'Picking up trash', 'Planting trees'],
        correctAnswerIndex: 2,
        explanation: 'The text says "公園のゴミ拾いのボランティア" (volunteer activity picking up trash at the park).'
      },
      {
        question: 'What kind of trash was most noticeable?',
        options: ['Glass', 'Paper', 'Plastic', 'Metal'],
        correctAnswerIndex: 2,
        explanation: 'The text says "とくにプラスチックのゴミが目立ちました" (plastic trash was particularly noticeable).'
      }
    ]
  },
  {
    id: 'n3-pop-culture',
    title: '日本のポップカルチャー (Japanese Pop Culture)',
    level: 'N3',
    tags: ['Culture', 'Entertainment'],
    estimatedTime: '4 mins',
    paragraphs: [
      {
        japanese: '<ruby>日本<rt>にほん</rt></ruby>のアニメやマンガは、<ruby>世界中<rt>せかいじゅう</rt></ruby>で<ruby>人気<rt>にんき</rt></ruby>があります。',
        english: 'Japanese anime and manga are popular all over the world.'
      },
      {
        japanese: 'インターネットの<ruby>発達<rt>はったつ</rt></ruby>により、<ruby>海外<rt>かいがい</rt></ruby>のファンも<ruby>日本<rt>にほん</rt></ruby>と<ruby>同<rt>おな</rt></ruby>じタイミングで<ruby>作品<rt>さくひん</rt></ruby>を<ruby>楽<rt>たの</rt></ruby>しめるようになりました。',
        english: 'With the development of the internet, overseas fans can now enjoy works at the same time as Japan.'
      },
      {
        japanese: 'これからも、<ruby>日本<rt>にほん</rt></ruby>のポップカルチャーは<ruby>多<rt>おお</rt></ruby>くの<ruby>人<rt>ひと</rt></ruby>に<ruby>愛<rt>あい</rt></ruby>され<ruby>続<rt>つづ</rt></ruby>けるでしょう。',
        english: 'Japanese pop culture will likely continue to be loved by many people from now on.'
      }
    ],
    quizzes: [
      {
        question: 'Why can overseas fans enjoy anime at the same time as Japan?',
        options: ['Because of cheap flights', 'Because of the development of the internet', 'Because everyone speaks Japanese', 'Because manga stores are everywhere'],
        correctAnswerIndex: 1,
        explanation: 'The text attributes this to the development of the internet (インターネットの発達により).'
      },
      {
        question: 'According to the text, what is the future of Japanese pop culture?',
        options: ['It will become less popular', 'It will be loved by many people', 'It will only be popular in Japan', 'It will be replaced by foreign culture'],
        correctAnswerIndex: 1,
        explanation: 'The text says it will continue to be loved by many people (多くの人に愛され続けるでしょう).'
      }
    ]
  },
  {
    id: 'n2-aging-population',
    title: '少子高齢化問題 (Declining Birthrate and Aging Population)',
    level: 'N2',
    tags: ['Society', 'News'],
    estimatedTime: '5 mins',
    paragraphs: [
      {
        japanese: '<ruby>日本<rt>にほん</rt></ruby>の<ruby>抱<rt>かか</rt></ruby>える<ruby>最大<rt>さいだい</rt></ruby>の<ruby>問題<rt>もんだい</rt></ruby>の<ruby>一<rt>ひと</rt></ruby>つが「<ruby>少子高齢化<rt>しょうしこうれいか</rt></ruby>」である。<ruby>子供<rt>こども</rt></ruby>の<ruby>数<rt>かず</rt></ruby>が<ruby>減<rt>へ</rt></ruby>り、お<ruby>年寄<rt>としよ</rt></ruby>りの<ruby>割合<rt>わりあい</rt></ruby>が<ruby>増<rt>ふ</rt></ruby>え<ruby>続<rt>つづ</rt></ruby>けている。',
        english: 'One of the biggest problems Japan faces is the "declining birthrate and aging population". The number of children is decreasing, and the proportion of elderly people continues to increase.'
      },
      {
        japanese: 'このままでは、<ruby>将来<rt>しょうらい</rt></ruby>の<ruby>労働力<rt>ろうどうりょく</rt></ruby>が<ruby>不足<rt>ふそく</rt></ruby>し、<ruby>経済<rt>けいざい</rt></ruby>に<ruby>深刻<rt>しんこく</rt></ruby>な<ruby>影響<rt>えいきょう</rt></ruby>を<ruby>与<rt>あた</rt></ruby>えることが<ruby>懸念<rt>けねん</rt></ruby>されている。',
        english: 'If this continues, there are concerns that the future labor force will be insufficient, having a serious impact on the economy.'
      },
      {
        japanese: '<ruby>政府<rt>せいふ</rt></ruby>は、<ruby>子育<rt>こそだ</rt></ruby>て<ruby>支援<rt>しえん</rt></ruby>の<ruby>充実<rt>じゅうじつ</rt></ruby>や<ruby>外国人労働者<rt>がいこくじんろうどうしゃ</rt></ruby>の<ruby>受<rt>う</rt></ruby>け<ruby>入<rt>い</rt></ruby>れなど、さまざまな<ruby>対策<rt>たいさく</rt></ruby>を<ruby>講<rt>こう</rt></ruby>じているが、<ruby>根本的<rt>こんぽんてき</rt></ruby>な<ruby>解決<rt>かいけつ</rt></ruby>には<ruby>至<rt>いた</rt></ruby>っていない。',
        english: 'The government is taking various measures, such as enhancing childcare support and accepting foreign workers, but a fundamental solution has not been reached.'
      }
    ],
    quizzes: [
      {
        question: 'What is the main concern mentioned regarding the aging population?',
        options: ['Lack of schools', 'Insufficient labor force affecting the economy', 'Too many hospitals', 'Overpopulation in cities'],
        correctAnswerIndex: 1,
        explanation: 'The text mentions concerns that the future labor force will be insufficient, impacting the economy (将来の労働力が不足し、経済に深刻な影響を与える).'
      },
      {
        question: 'Which of the following is a measure the government is taking?',
        options: ['Closing down businesses', 'Enhancing childcare support', 'Banning foreign workers', 'Reducing taxes for the elderly'],
        correctAnswerIndex: 1,
        explanation: 'The government is enhancing childcare support (子育て支援の充実) and accepting foreign workers.'
      }
    ]
  },
  {
    id: 'n2-environment',
    title: '環境保護とリサイクル (Environmental Protection and Recycling)',
    level: 'N2',
    tags: ['Environment', 'Society'],
    estimatedTime: '5 mins',
    paragraphs: [
      {
        japanese: '<ruby>地球温暖化<rt>ちきゅうおんだんか</rt></ruby>を<ruby>防<rt>ふせ</rt></ruby>ぐため、<ruby>私<rt>わたし</rt></ruby>たち<ruby>一人一人<rt>ひとりひとり</rt></ruby>が<ruby>環境保護<rt>かんきょうほご</rt></ruby>に<ruby>取<rt>と</rt></ruby>り<ruby>組<rt>く</rt></ruby>むことが<ruby>求<rt>もと</rt></ruby>められている。',
        english: 'To prevent global warming, each and every one of us is required to engage in environmental protection.'
      },
      {
        japanese: 'とくに、ゴミの<ruby>分別<rt>ぶんべつ</rt></ruby>とリサイクルは<ruby>重要<rt>じゅうよう</rt></ruby>だ。ペットボトルやプラスチック<ruby>容器<rt>ようき</rt></ruby>を<ruby>正<rt>ただ</rt></ruby>しく<ruby>処理<rt>しょり</rt></ruby>することで、<ruby>資源<rt>しげん</rt></ruby>の<ruby>無駄遣<rt>むだづか</rt></ruby>いを<ruby>減<rt>へ</rt></ruby>らすことができる。',
        english: 'In particular, garbage sorting and recycling are important. By properly disposing of PET bottles and plastic containers, we can reduce the waste of resources.'
      },
      {
        japanese: '<ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>の<ruby>際<rt>さい</rt></ruby>にマイバッグを<ruby>持参<rt>じさん</rt></ruby>することも、<ruby>立派<rt>りっぱ</rt></ruby>なエコ<ruby>活動<rt>かつどう</rt></ruby>の<ruby>一<rt>ひと</rt></ruby>つである。',
        english: 'Bringing your own bag when shopping is also a fine eco-friendly activity.'
      }
    ],
    quizzes: [
      {
        question: 'According to the text, why is it important to recycle plastic containers?',
        options: ['To make new toys', 'To reduce the waste of resources', 'To save money', 'To make the city look beautiful'],
        correctAnswerIndex: 1,
        explanation: 'Recycling helps reduce the waste of resources (資源の無駄遣いを減らすことができる).'
      },
      {
        question: 'What is given as an example of an eco-friendly activity?',
        options: ['Driving a car less', 'Bringing your own bag when shopping', 'Using less water', 'Planting trees'],
        correctAnswerIndex: 1,
        explanation: 'Bringing your own bag (マイバッグを持参すること) is mentioned as a fine eco activity.'
      }
    ]
  },
  {
    id: 'n1-keigo-evolution',
    title: '敬語の変遷と現代社会 (The Evolution of Keigo and Modern Society)',
    level: 'N1',
    tags: ['Language', 'Culture', 'Advanced'],
    estimatedTime: '6 mins',
    paragraphs: [
      {
        japanese: '<ruby>日本社会<rt>にほんしゃかい</rt></ruby>における<ruby>人間関係<rt>にんげんかんけい</rt></ruby>の<ruby>変化<rt>へんか</rt></ruby>に<ruby>伴<rt>ともな</rt></ruby>い、<ruby>敬語<rt>けいご</rt></ruby>の<ruby>使<rt>つか</rt></ruby>い<ruby>方<rt>かた</rt></ruby>も<ruby>徐々<rt>じょじょ</rt></ruby>に<ruby>変容<rt>へんよう</rt></ruby>を<ruby>遂<rt>と</rt></ruby>げてきた。',
        english: 'Along with changes in human relations in Japanese society, the way keigo (honorific language) is used has also gradually undergone a transformation.'
      },
      {
        japanese: '<ruby>過去<rt>かこ</rt></ruby>においては<ruby>絶対的<rt>ぜったいてき</rt></ruby>な<ruby>上下関係<rt>じょうげかんけい</rt></ruby>を<ruby>示<rt>しめ</rt></ruby>すツールであった<ruby>敬語<rt>けいご</rt></ruby>が、<ruby>現代<rt>げんだい</rt></ruby>では<ruby>相手<rt>あいて</rt></ruby>との<ruby>適度<rt>てきど</rt></ruby>な<ruby>距離感<rt>きょりかん</rt></ruby>を<ruby>保<rt>たも</rt></ruby>つための「<ruby>潤滑油<rt>じゅんかつゆ</rt></ruby>」としての<ruby>役割<rt>やくわり</rt></ruby>を<ruby>担<rt>にな</rt></ruby>うようになっている。',
        english: 'Keigo, which in the past was a tool to indicate absolute hierarchical relationships, has come to play the role of a "lubricant" in modern times to maintain an appropriate sense of distance with others.'
      },
      {
        japanese: 'とりわけビジネスシーンにおいては、<ruby>過度<rt>かど</rt></ruby>な<ruby>謙譲表現<rt>けんじょうひょうげん</rt></ruby>よりも、<ruby>円滑<rt>えんかつ</rt></ruby>なコミュニケーションを<ruby>促進<rt>そくしん</rt></ruby>する<ruby>丁寧<rt>ていねい</rt></ruby>さが<ruby>重視<rt>じゅうし</rt></ruby>される<ruby>傾向<rt>けいこう</rt></ruby>にある。',
        english: 'Particularly in business scenes, there is a tendency to emphasize politeness that promotes smooth communication over excessive humble expressions.'
      }
    ],
    quizzes: [
      {
        question: 'How has the role of Keigo changed in modern times?',
        options: ['It is no longer used at all.', 'It shifted from showing absolute hierarchy to maintaining appropriate distance.', 'It is now only used by older people.', 'It became more strict and complicated.'],
        correctAnswerIndex: 1,
        explanation: 'The text states it shifted from a tool for absolute hierarchical relationships to a lubricant for maintaining an appropriate sense of distance.'
      },
      {
        question: 'What is currently emphasized more in business scenes regarding Keigo?',
        options: ['Excessive humble expressions', 'Using old-fashioned words', 'Politeness that promotes smooth communication', 'Speaking as fast as possible'],
        correctAnswerIndex: 2,
        explanation: 'Politeness that promotes smooth communication is emphasized over excessive humble expressions (円滑なコミュニケーションを促進する丁寧さが重視される).'
      }
    ]
  },
  {
    id: 'n1-economic-prospects',
    title: '日本経済の展望 (Prospects for the Japanese Economy)',
    level: 'N1',
    tags: ['Economy', 'News', 'Advanced'],
    estimatedTime: '6 mins',
    paragraphs: [
      {
        japanese: '<ruby>長引<rt>ながび</rt></ruby>くデフレ<ruby>経済<rt>けいざい</rt></ruby>からの<ruby>脱却<rt>だっきゃく</rt></ruby>を<ruby>目指<rt>めざ</rt></ruby>す<ruby>日本<rt>にほん</rt></ruby>において、イノベーションの<ruby>創出<rt>そうしゅつ</rt></ruby>は<ruby>喫緊<rt>きっきん</rt></ruby>の<ruby>課題<rt>かだい</rt></ruby>である。',
        english: 'In Japan, which aims to break free from a prolonged deflationary economy, the creation of innovation is an urgent issue.'
      },
      {
        japanese: '<ruby>従来<rt>じゅうらい</rt></ruby>のものづくり<ruby>産業<rt>さんぎょう</rt></ruby>に<ruby>加<rt>くわ</rt></ruby>え、AIやIoTといった<ruby>先端技術<rt>せんたんぎじゅつ</rt></ruby>を<ruby>駆使<rt>くし</rt></ruby>した<ruby>新<rt>あたら</rt></ruby>しいビジネスモデルの<ruby>構築<rt>こうちく</rt></ruby>が<ruby>求<rt>もと</rt></ruby>められている。',
        english: 'In addition to traditional manufacturing industries, the construction of new business models fully utilizing advanced technologies like AI and IoT is required.'
      },
      {
        japanese: 'また、グローバル<ruby>市場<rt>しじょう</rt></ruby>での<ruby>競争力<rt>きょうそうりょく</rt></ruby>を<ruby>維持<rt>いじ</rt></ruby>するためには、<ruby>多様<rt>たよう</rt></ruby>な<ruby>人材<rt>じんざい</rt></ruby>の<ruby>育成<rt>いくせい</rt></ruby>と、<ruby>柔軟<rt>じゅうなん</rt></ruby>な<ruby>働<rt>はたら</rt></ruby>き<ruby>方<rt>かた</rt></ruby>の<ruby>導入<rt>どうにゅう</rt></ruby>が<ruby>不可欠<rt>ふかけつ</rt></ruby>となるだろう。',
        english: 'Furthermore, in order to maintain competitiveness in the global market, the cultivation of diverse human resources and the introduction of flexible working styles will be indispensable.'
      }
    ],
    quizzes: [
      {
        question: 'What is considered an urgent issue for Japan\'s economy?',
        options: ['Decreasing imports', 'Creation of innovation', 'Building more factories', 'Increasing taxes'],
        correctAnswerIndex: 1,
        explanation: 'The text states the creation of innovation is an urgent issue (イノベーションの創出は喫緊の課題である).'
      },
      {
        question: 'What is indispensable for maintaining global competitiveness according to the passage?',
        options: ['Lowering prices', 'Working longer hours', 'Cultivating diverse human resources and flexible working styles', 'Focusing solely on domestic markets'],
        correctAnswerIndex: 2,
        explanation: 'The text points to the cultivation of diverse human resources and the introduction of flexible working styles (多様な人材の育成と、柔軟な働き方の導入が不可欠).'
      }
    ]
  }
];
