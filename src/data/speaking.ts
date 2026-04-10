export interface KaiwaLine {
  id: string;
  speaker: 'A' | 'B';
  characterName: string;
  avatar: string;
  text: string;           // plain japanese text for TTS or matching
  displayHtml: string;    // nicely formatted with furigana
  translation: string;
  voiceSettings?: { pitch: number; rate: number }; // used if text is spoken by App
}

export interface SpeakingExercise {
  id: string;
  title: string;
  level: string;
  scenario: string;
  estimatedTime: string;
  userRole: 'A' | 'B';    // Which character the user will roleplay as
  lines: KaiwaLine[];
}

export const speakingExercises: SpeakingExercise[] = [
  {
    id: 'n5-ordering-food',
    title: 'レストランで注文する (Ordering at a Restaurant)',
    level: 'N5',
    scenario: 'You are at a Japanese restaurant and want to order some food. You will roleplay as the Customer.',
    estimatedTime: '2 mins',
    userRole: 'B',
    lines: [
      {
        id: 'L1',
        speaker: 'A',
        characterName: 'Waiter',
        avatar: '👨🏻‍🍳',
        text: 'いらっしゃいませ。ご注文はお決まりですか。',
        displayHtml: 'いらっしゃいませ。ご<ruby>注文<rt>ちゅうもん</rt></ruby>はお<ruby>決<rt>き</rt></ruby>まりですか。',
        translation: 'Welcome. Have you decided on your order?',
        voiceSettings: { pitch: 1.2, rate: 0.95 }
      },
      {
        id: 'L2',
        speaker: 'B',
        characterName: 'You (Customer)',
        avatar: '👤',
        text: 'はい、ラーメンと餃子をお願いします。',
        displayHtml: 'はい、ラーメンと<ruby>餃子<rt>ぎょうざ</rt></ruby>をお<ruby>願<rt>ねが</rt></ruby>いします。',
        translation: 'Yes, ramen and gyoza, please.',
      },
      {
        id: 'L3',
        speaker: 'A',
        characterName: 'Waiter',
        avatar: '👨🏻‍🍳',
        text: 'かしこまりました。お飲み物はいかがですか。',
        displayHtml: 'かしこまりました。お<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>はいかがですか。',
        translation: 'Certainly. Would you like a drink?',
        voiceSettings: { pitch: 1.2, rate: 0.95 }
      },
      {
        id: 'L4',
        speaker: 'B',
        characterName: 'You (Customer)',
        avatar: '👤',
        text: '冷たい水をください。',
        displayHtml: '<ruby>冷<rt>つめ</rt></ruby>たい<ruby>水<rt>みず</rt></ruby>をください。',
        translation: 'Cold water, please.',
      },
      {
        id: 'L5',
        speaker: 'A',
        characterName: 'Waiter',
        avatar: '👨🏻‍🍳',
        text: '少々お待ちください。',
        displayHtml: '<ruby>少々<rt>しょうしょう</rt></ruby>お<ruby>待<rt>ま</rt></ruby>ちください。',
        translation: 'Please wait a moment.',
        voiceSettings: { pitch: 1.2, rate: 0.95 }
      }
    ]
  },
  {
    id: 'n4-asking-directions',
    title: '道を尋ねる (Asking Directions)',
    level: 'N4',
    scenario: 'You are lost in Tokyo and need to ask a police officer how to get to the station. You will roleplay as the Tourist.',
    estimatedTime: '3 mins',
    userRole: 'A',
    lines: [
      {
        id: 'D1',
        speaker: 'A',
        characterName: 'You (Tourist)',
        avatar: '👤',
        text: 'すみません、東京駅はどこですか。',
        displayHtml: 'すみません、<ruby>東京駅<rt>とうきょうえき</rt></ruby>はどこですか。',
        translation: 'Excuse me, where is Tokyo Station?',
      },
      {
        id: 'D2',
        speaker: 'B',
        characterName: 'Police Officer',
        avatar: '👮🏻‍♂️',
        text: 'この道をまっすぐ行って、二つ目の信号を右に曲がってください。',
        displayHtml: 'この<ruby>道<rt>みち</rt></ruby>をまっすぐ<ruby>行<rt>い</rt></ruby>って、<ruby>二<rt>ふた</rt></ruby>つ<ruby>目<rt>め</rt></ruby>の<ruby>信号<rt>しんごう</rt></ruby>を<ruby>右<rt>みぎ</rt></ruby>に<ruby>曲<rt>ま</rt></ruby>がってください。',
        translation: 'Go straight down this road, and turn right at the second traffic light.',
        voiceSettings: { pitch: 0.8, rate: 1.0 }
      },
      {
        id: 'D3',
        speaker: 'A',
        characterName: 'You (Tourist)',
        avatar: '👤',
        text: '二つ目の信号を右ですね。歩いて何分くらいかかりますか。',
        displayHtml: '<ruby>二<rt>ふた</rt></ruby>つ<ruby>目<rt>め</rt></ruby>の<ruby>信号<rt>しんごう</rt></ruby>を<ruby>右<rt>みぎ</rt></ruby>ですね。<ruby>歩<rt>ある</rt></ruby>いて<ruby>何分<rt>なんぷん</rt></ruby>くらいかかりますか。',
        translation: 'Right at the second traffic light. About how many minutes does it take on foot?',
      },
      {
        id: 'D4',
        speaker: 'B',
        characterName: 'Police Officer',
        avatar: '👮🏻‍♂️',
        text: 'そうですね、大体10分くらいです。',
        displayHtml: 'そうですね、<ruby>大体<rt>だいたい</rt></ruby>10<ruby>分<rt>ぷん</rt></ruby>くらいです。',
        translation: 'Let me see, it\'s about 10 minutes.',
        voiceSettings: { pitch: 0.8, rate: 1.0 }
      },
      {
        id: 'D5',
        speaker: 'A',
        characterName: 'You (Tourist)',
        avatar: '👤',
        text: 'わかりました。ありがとうございます。',
        displayHtml: 'わかりました。ありがとうございます。',
        translation: 'I understand. Thank you very much.',
      }
    ]
  }
];
