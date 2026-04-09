export interface DialogueLine {
  speaker: string;
  avatar: string; // Emoji character representing the speaker
  text: string;   // Clean Japanese text to be sent to SpeechSynthesis
  displayHtml: string; // Annotated text with <ruby> and <rt> for Furigana
  translation: string;
  voiceSettings: {
    pitch: number;
    rate: number;
  };
}

export interface ListeningQuiz {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ListeningExercise {
  id: string;
  title: string;
  level: string;
  tags: string[];
  scenario: string;
  dialogue: DialogueLine[];
  quiz: ListeningQuiz;
}

export const listeningExercises: ListeningExercise[] = [
  {
    id: 'n5-convenience-store',
    title: 'コンビニのレジで (At the Convenience Store Checkout)',
    level: 'N5',
    tags: ['Shopping', 'Daily Life'],
    scenario: 'A customer is buying a bento box at a convenience store. Listen to the cashier and the customer.',
    dialogue: [
      {
        speaker: 'Cashier',
        avatar: '👩🏻‍💼',
        text: 'いらっしゃいませ。お弁当温めますか。',
        displayHtml: 'いらっしゃいませ。お<ruby>弁当<rt>べんとう</rt></ruby><ruby>温<rt>あたた</rt></ruby>めますか。',
        translation: 'Welcome. Would you like me to warm up your bento?',
        voiceSettings: { pitch: 1.4, rate: 0.9 } // Higher pitch, polite
      },
      {
        speaker: 'Customer',
        avatar: '👨🏻',
        text: 'はい、お願いします。',
        displayHtml: 'はい、お<ruby>願<rt>ねが</rt></ruby>いします。',
        translation: 'Yes, please.',
        voiceSettings: { pitch: 0.9, rate: 1.0 } // Lower pitch, casual
      },
      {
        speaker: 'Cashier',
        avatar: '👩🏻‍💼',
        text: '袋はお分けしますか。',
        displayHtml: '<ruby>袋<rt>ふくろ</rt></ruby>はお<ruby>分<rt>わ</rt></ruby>けしますか。',
        translation: 'Would you like separate bags?',
        voiceSettings: { pitch: 1.4, rate: 0.9 }
      },
      {
        speaker: 'Customer',
        avatar: '👨🏻',
        text: 'いいえ、一緒でいいです。',
        displayHtml: 'いいえ、<ruby>一緒<rt>いっしょ</rt></ruby>でいいです。',
        translation: 'No, together is fine.',
        voiceSettings: { pitch: 0.9, rate: 1.0 }
      },
      {
        speaker: 'Cashier',
        avatar: '👩🏻‍💼',
        text: '500円になります。ありがとうございます。',
        displayHtml: '<ruby>500円<rt>ごひゃくえん</rt></ruby>になります。ありがとうございます。',
        translation: 'That will be 500 yen. Thank you very much.',
        voiceSettings: { pitch: 1.4, rate: 0.9 }
      }
    ],
    quiz: {
      question: 'What did the customer request regarding the bags?',
      options: [
        'He wanted the bento in a separate bag.',
        'He didn\'t want any bag.',
        'He wanted everything in the same bag.',
        'He brought his own eco-bag.'
      ],
      correctAnswerIndex: 2,
      explanation: 'The cashier asked "袋はお分けしますか" (separate bags?) and the customer replied "一緒でいいです" (together is fine).'
    }
  },
  {
    id: 'n4-train-station',
    title: '駅で道を尋ねる (Asking for Directions at the Station)',
    level: 'N4',
    tags: ['Travel', 'Directions'],
    scenario: 'A tourist is lost at the train station and asks a station attendant for directions.',
    dialogue: [
      {
        speaker: 'Tourist',
        avatar: '👱🏼‍♂️',
        text: 'すみません、東京タワーに行きたいんですが、どの電車に乗ればいいですか。',
        displayHtml: 'すみません、<ruby>東京<rt>とうきょう</rt></ruby>タワーに<ruby>行<rt>い</rt></ruby>きたいんですが、どの<ruby>電車<rt>でんしゃ</rt></ruby>に<ruby>乗<rt>の</rt></ruby>ればいいですか。',
        translation: 'Excuse me, I want to go to Tokyo Tower. Which train should I take?',
        voiceSettings: { pitch: 1.0, rate: 0.95 }
      },
      {
        speaker: 'Station Attendant',
        avatar: '👨🏻‍✈️',
        text: '東京タワーですね。それなら、あそこの赤い線の電車に乗ってください。',
        displayHtml: '<ruby>東京<rt>とうきょう</rt></ruby>タワーですね。それなら、あそこの<ruby>赤<rt>あか</rt></ruby>い<ruby>線<rt>せん</rt></ruby>の<ruby>電車<rt>でんしゃ</rt></ruby>に<ruby>乗<rt>の</rt></ruby>ってください。',
        translation: 'Tokyo Tower, right? In that case, please take the train on the red line over there.',
        voiceSettings: { pitch: 0.8, rate: 1.1 }
      },
      {
        speaker: 'Tourist',
        avatar: '👱🏼‍♂️',
        text: '赤い線ですね。何分くらいかかりますか。',
        displayHtml: '<ruby>赤<rt>あか</rt></ruby>い<ruby>線<rt>せん</rt></ruby>ですね。<ruby>何分<rt>なんぷん</rt></ruby>くらいかかりますか。',
        translation: 'The red line. About how many minutes will it take?',
        voiceSettings: { pitch: 1.0, rate: 0.95 }
      },
      {
        speaker: 'Station Attendant',
        avatar: '👨🏻‍✈️',
        text: '15分くらいです。次の電車は3時に来ますよ。',
        displayHtml: '<ruby>15分<rt>じゅうごふん</rt></ruby>くらいです。<ruby>次<rt>つぎ</rt></ruby>の<ruby>電車<rt>でんしゃ</rt></ruby>は<ruby>3時<rt>さんじ</rt></ruby>に<ruby>来<rt>き</rt></ruby>ますよ。',
        translation: 'About 15 minutes. The next train comes at 3 o\'clock.',
        voiceSettings: { pitch: 0.8, rate: 1.1 }
      },
      {
        speaker: 'Tourist',
        avatar: '👱🏼‍♂️',
        text: 'わかりました。ありがとうございます。',
        displayHtml: 'わかりました。ありがとうございます。',
        translation: 'I understand. Thank you.',
        voiceSettings: { pitch: 1.0, rate: 0.95 }
      }
    ],
    quiz: {
      question: 'Which train should the tourist take and how long will the trip take?',
      options: [
        'Blue line, 30 minutes',
        'Red line, 15 minutes',
        'Red line, 3 minutes',
        'Green line, 15 minutes'
      ],
      correctAnswerIndex: 1,
      explanation: 'The attendant told him to take the red line (赤い線) and it will take about 15 minutes (15分くらい).'
    }
  }
];
