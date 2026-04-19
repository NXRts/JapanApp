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
  },
  {
    id: 'n5-convenience-store',
    title: 'コンビニで買い物 (Convenience Store Shopping)',
    level: 'N5',
    scenario: 'You are buying a lunch box (bento) at a convenience store. You will roleplay as the Customer.',
    estimatedTime: '2 mins',
    userRole: 'A',
    lines: [
      {
        id: 'CS1',
        speaker: 'A',
        characterName: 'You (Customer)',
        avatar: '👤',
        text: 'すみません、これをお願いします。',
        displayHtml: 'すみません、これをお<ruby>願<rt>ねが</rt></ruby>いします。',
        translation: 'Excuse me, I\'ll take this, please.',
      },
      {
        id: 'CS2',
        speaker: 'B',
        characterName: 'Clerk',
        avatar: '🏪',
        text: 'はい。お弁当は温めますか。',
        displayHtml: 'はい。お<ruby>弁当<rt>べんとう</rt></ruby>は<ruby>温<rt>あたた</rt></ruby>めますか。',
        translation: 'Certainly. Would you like your bento warmed up?',
        voiceSettings: { pitch: 1.0, rate: 1.1 }
      },
      {
        id: 'CS3',
        speaker: 'A',
        characterName: 'You (Customer)',
        avatar: '👤',
        text: 'はい、お願いします。',
        displayHtml: 'はい、お<ruby>願<rt>ねが</rt></ruby>いします。',
        translation: 'Yes, please.',
      },
      {
        id: 'CS4',
        speaker: 'B',
        characterName: 'Clerk',
        avatar: '🏪',
        text: '袋はご利用になりますか。',
        displayHtml: '<ruby>袋<rt>ふくろ</rt></ruby>はご<ruby>利用<rt>りよう</rt></ruby>になりますか。',
        translation: 'Would you like a bag?',
        voiceSettings: { pitch: 1.0, rate: 1.1 }
      },
      {
        id: 'CS5',
        speaker: 'A',
        characterName: 'You (Customer)',
        avatar: '👤',
        text: 'いいえ、大丈夫です。',
        displayHtml: 'いいえ、<ruby>大丈夫<rt>だいじょうぶ</rt></ruby>です。',
        translation: 'No, I\'m fine.',
      }
    ]
  },
  {
    id: 'n4-meeting-friend',
    title: '友達と待ち合わせ (Meeting a Friend)',
    level: 'N4',
    scenario: 'You are meeting your Japanese friend Ken at Shibuya crossing. You will roleplay as yourself.',
    estimatedTime: '3 mins',
    userRole: 'A',
    lines: [
      {
        id: 'MF1',
        speaker: 'B',
        characterName: 'Ken',
        avatar: '👦🏻',
        text: 'お待たせ！ごめん、電車が遅れちゃって。',
        displayHtml: 'お<ruby>待<rt>ま</rt></ruby>たせ！ごめん、<ruby>電車<rt>でんしゃ</rt></ruby>が<ruby>遅<rt>おく</rt></ruby>れちゃって。',
        translation: 'Sorry to keep you waiting! My train was late.',
        voiceSettings: { pitch: 1.1, rate: 1.05 }
      },
      {
        id: 'MF2',
        speaker: 'A',
        characterName: 'You',
        avatar: '👤',
        text: '全然大丈夫だよ。私も今着いたところだから。',
        displayHtml: '<ruby>全然大丈夫<rt>ぜんぜんだいじょうぶ</rt></ruby>だよ。<ruby>私<rt>わたし</rt></ruby>も<ruby>今着<rt>いまつ</rt></ruby>いたところだから。',
        translation: 'No problem at all. I just got here too.',
      },
      {
        id: 'MF3',
        speaker: 'B',
        characterName: 'Ken',
        avatar: '👦🏻',
        text: 'そう？よかった。今日は何食べたい？',
        displayHtml: 'そう？よかった。<ruby>今日<rt>きょう</rt></ruby>は<ruby>何食<rt>なにた</rt></ruby>べたい？',
        translation: 'Really? Good. What do you want to eat today?',
        voiceSettings: { pitch: 1.1, rate: 1.05 }
      },
      {
        id: 'MF4',
        speaker: 'A',
        characterName: 'You',
        avatar: '👤',
        text: 'お寿司はどう？最近、いいお店を見つけたんだ。',
        displayHtml: 'お<ruby>寿司<rt>すし</rt></ruby>はどう？<ruby>最近<rt>さいきん</rt></ruby>、いいお<ruby>店<rt>みせ</rt></ruby>を<ruby>見<rt>み</rt></ruby>つけたんだ。',
        translation: 'How about sushi? I found a good place recently.',
      }
    ]
  },
  {
    id: 'n5-introducing-self',
    title: '自己紹介 (Self-Introduction)',
    level: 'N5',
    scenario: 'You are introducing yourself to your new classmates. You will roleplay as the Student.',
    estimatedTime: '2 mins',
    userRole: 'A',
    lines: [
      {
        id: 'SI1',
        speaker: 'A',
        characterName: 'You (Student)',
        avatar: '👤',
        text: '初めまして。私の名前は田中です。インドネシアから来ました。',
        displayHtml: '<ruby>初<rt>はじ</rt></ruby>めまして。<ruby>私<rt>わたし</rt></ruby>の<ruby>名前<rt>なまえ</rt></ruby>は<ruby>田中<rt>たなか</rt></ruby>です。インドネシアから<ruby>来<rt>き</rt></ruby>ました。',
        translation: 'Nice to meet you. My name is Tanaka. I came from Indonesia.',
      },
      {
        id: 'SI2',
        speaker: 'B',
        characterName: 'Teacher',
        avatar: '👩🏻‍🏫',
        text: '田中さん、よろしくお願いします。日本は初めてですか。',
        displayHtml: '<ruby>田中<rt>たなか</rt></ruby>さん、よろしくお願いします。<ruby>日本<rt>にほん</rt></ruby>は<ruby>初<rt>はじ</rt></ruby>めてですか。',
        translation: 'Tanaka-san, nice to meet you. Is this your first time in Japan?',
        voiceSettings: { pitch: 1.0, rate: 0.9 }
      },
      {
        id: 'SI3',
        speaker: 'A',
        characterName: 'You (Student)',
        avatar: '👤',
        text: 'はい、初めてです。日本の文化にとても興味があります。',
        displayHtml: 'はい、<ruby>初<rt>はじ</rt></ruby>めてです。<ruby>日本<rt>にほん</rt></ruby>の<ruby>文化<rt>ぶんか</rt></ruby>にとても<ruby>興味<rt>きょうみ</rt></ruby>があります。',
        translation: 'Yes, it is my first time. I am very interested in Japanese culture.',
      }
    ]
  },
  {
    id: 'n3-doctor-visit',
    title: '病院で診察 (Doctor Consultation)',
    level: 'N3',
    scenario: 'You have a bad stomach ache and are seeing a doctor. You will roleplay as the Patient.',
    estimatedTime: '4 mins',
    userRole: 'A',
    lines: [
      {
        id: 'DV1',
        speaker: 'B',
        characterName: 'Doctor',
        avatar: '👨🏻‍⚕️',
        text: '今日はどうされましたか。',
        displayHtml: '<ruby>今日<rt>きょう</rt></ruby>はどうされましたか。',
        translation: 'How can I help you today?',
        voiceSettings: { pitch: 0.9, rate: 0.85 }
      },
      {
        id: 'DV2',
        speaker: 'A',
        characterName: 'You (Patient)',
        avatar: '👤',
        text: '昨日の夜からお腹が痛くて、熱も少しあります。',
        displayHtml: '<ruby>昨日<rt>きのう</rt></ruby>の<ruby>夜<rt>よる</rt></ruby>からお<ruby>腹<rt>なか</rt></ruby>が<ruby>痛<rt>いた</rt></ruby>くて、<ruby>熱<rt>ねつ</rt></ruby>も<ruby>少<rt>すこ</rt></ruby>しあります。',
        translation: 'My stomach has been hurting since last night, and I have a slight fever.',
      },
      {
        id: 'DV3',
        speaker: 'B',
        characterName: 'Doctor',
        avatar: '👨🏻‍⚕️',
        text: 'そうですか。何か変わったものを食べましたか。',
        displayHtml: 'そうですか。<ruby>何<rt>なに</rt></ruby>か<ruby>変<rt>か</rt></ruby>わったものを<ruby>食<rt>た</rt></ruby>べましたか。',
        translation: 'I see. Did you eat anything unusual?',
        voiceSettings: { pitch: 0.9, rate: 0.85 }
      },
      {
        id: 'DV4',
        speaker: 'A',
        characterName: 'You (Patient)',
        avatar: '👤',
        text: 'いいえ、特に。でも、最近仕事が忙しくてストレスが溜まっています。',
        displayHtml: 'いいえ、<ruby>特<rt>とく</rt></ruby>に。でも、<ruby>最近仕事<rt>さいきんしごと</rt></ruby>が<ruby>忙<rt>いそが</rt></ruby>しくてストレスが<ruby>溜<rt>た</rt></ruby>まっています。',
        translation: 'No, not especially. But I\'ve been busy at work lately and stress has been building up.',
      }
    ]
  },
  {
    id: 'n4-renting-bicycle',
    title: 'レンタサイクル (Renting a Bicycle)',
    level: 'N4',
    scenario: 'You are renting a bicycle to explore Kyoto. You will roleplay as the Customer.',
    estimatedTime: '3 mins',
    userRole: 'A',
    lines: [
      {
        id: 'RB1',
        speaker: 'A',
        characterName: 'You (Customer)',
        avatar: '👤',
        text: '自転車を借りたいんですが、いくらですか。',
        displayHtml: '<ruby>自転車<rt>じてんしゃ</rt></ruby>を<ruby>借<rt>か</rt></ruby>りたいんですが、いくらですか。',
        translation: 'I\'d like to rent a bicycle, how much is it?',
      },
      {
        id: 'RB2',
        speaker: 'B',
        characterName: 'Shop Staff',
        avatar: '🚲',
        text: '一日1000円です。身分証明書は持っていますか。',
        displayHtml: '<ruby>一日<rt>いちにち</rt></ruby>1000<ruby>円<rt>えん</rt></ruby>です。<ruby>身分証明書<rt>みぶんしょうめいしょ</rt></ruby>は<ruby>持<rt>も</rt></ruby>っていますか。',
        translation: 'It\'s 1000 yen for a day. Do you have an ID?',
        voiceSettings: { pitch: 1.0, rate: 1.0 }
      },
      {
        id: 'RB3',
        speaker: 'A',
        characterName: 'You (Customer)',
        avatar: '👤',
        text: 'はい、パスポートがあります。返却は何時までですか。',
        displayHtml: 'はい、パスポートがあります。<ruby>返却<rt>へんきゃく</rt></ruby>は<ruby>何時<rt>なんじ</rt></ruby>までですか。',
        translation: 'Yes, I have my passport. What time do I need to return it by?',
      },
      {
        id: 'RB4',
        speaker: 'B',
        characterName: 'Shop Staff',
        avatar: '🚲',
        text: '午後6時までにお願いします。',
        displayHtml: '<ruby>午後<rt>ごご</rt></ruby>6<ruby>時<rt>じ</rt></ruby>までにお<ruby>願<rt>ねが</rt></ruby>いします。',
        translation: 'Please return it by 6 PM.',
        voiceSettings: { pitch: 1.0, rate: 1.0 }
      }
    ]
  },
  {
    id: 'n3-hotel-booking',
    title: 'ホテルの予約確認 (Hotel Reservation Check)',
    level: 'N3',
    scenario: 'You are checking your hotel reservation at the front desk. You will roleplay as the Guest.',
    estimatedTime: '3 mins',
    userRole: 'B',
    lines: [
      {
        id: 'HB1',
        speaker: 'A',
        characterName: 'Receptionist',
        avatar: '🏨',
        text: 'いらっしゃいませ。ご予約のお名前をお願いします。',
        displayHtml: 'いらっしゃいませ。ご<ruby>予約<rt>よやく</rt></ruby>のお<ruby>名前<rt>なまえ</rt></ruby>をお<ruby>願<rt>ねが</rt></ruby>いします。',
        translation: 'Welcome. May I have the name for the reservation?',
        voiceSettings: { pitch: 1.1, rate: 0.9 }
      },
      {
        id: 'HB2',
        speaker: 'B',
        characterName: 'You (Guest)',
        avatar: '👤',
        text: 'スミスです。3泊で予約しているはずですが。',
        displayHtml: 'スミスです。3<ruby>泊<rt>はく</rt></ruby>で<ruby>予約<rt>よやく</rt></ruby>しているはずですが。',
        translation: 'It\'s Smith. I should have a reservation for three nights.',
      },
      {
        id: 'HB3',
        speaker: 'A',
        characterName: 'Receptionist',
        avatar: '🏨',
        text: 'はい、スミス様ですね。禁煙のダブルルームで承っております。',
        displayHtml: 'はい、スミス<ruby>様<rt>さま</rt></ruby>ですね。<ruby>禁煙<rt>きんえん</rt></ruby>のダブルルームで<ruby>承<rt>うけたまわ</rt></ruby>っております。',
        translation: 'Yes, Mr. Smith. We have you down for a non-smoking double room.',
        voiceSettings: { pitch: 1.1, rate: 0.9 }
      },
      {
        id: 'HB4',
        speaker: 'B',
        characterName: 'You (Guest)',
        avatar: '👤',
        text: 'そうです。朝食は何時からですか。',
        displayHtml: 'そうです。<ruby>朝食<rt>ちょうしょく</rt></ruby>は<ruby>何時<rt>なんじ</rt></ruby>からですか。',
        translation: 'That\'s right. What time is breakfast?',
      }
    ]
  },
  {
    id: 'n2-noisy-neighbor',
    title: '隣人への苦情 (Complaint to Neighbor)',
    level: 'N2',
    scenario: 'Your neighbor is playing loud music late at night. You go to talk to them. You will roleplay as the Complainer.',
    estimatedTime: '4 mins',
    userRole: 'A',
    lines: [
      {
        id: 'NN1',
        speaker: 'A',
        characterName: 'You (Neighbor)',
        avatar: '👤',
        text: '夜分にすみません。ちょっと音楽の音が大きいようなんですが。',
        displayHtml: '<ruby>夜分<rt>やぶん</rt></ruby>にすみません。ちょっと<ruby>音楽<rt>おんがく</rt></ruby>の<ruby>音<rt>おと</rt></ruby>が<ruby>大<rt>おお</rt></ruby>きいようなんですが。',
        translation: 'Sorry to bother you so late. It seems your music is a bit loud.',
      },
      {
        id: 'NN2',
        speaker: 'B',
        characterName: 'Loud Neighbor',
        avatar: '🕺',
        text: 'あ、すみません。気づきませんでした。うるさかったですか。',
        displayHtml: 'あ、すみません。<ruby>気<rt>き</rt></ruby>づきませんでした。うるさかったですか。',
        translation: 'Ah, sorry. I didn\'t realize. Was it noisy?',
        voiceSettings: { pitch: 1.2, rate: 1.1 }
      },
      {
        id: 'NN3',
        speaker: 'A',
        characterName: 'You (Neighbor)',
        avatar: '👤',
        text: 'ええ、明日早いので、もう少しボリュームを下げていただけませんか。',
        displayHtml: 'ええ、<ruby>明日早<rt>あしたはや</rt></ruby>いので、もう少しボリュームを<ruby>下<rt>さ</rt></ruby>げていただけませんか。',
        translation: 'Yes, I have an early start tomorrow, so could you please turn the volume down a bit?',
      },
      {
        id: 'NN4',
        speaker: 'B',
        characterName: 'Loud Neighbor',
        avatar: '🕺',
        text: '申し訳ありません。すぐに小さくします。',
        displayHtml: '<ruby>申<rt>もう</rt></ruby>し<ruby>訳<rt>わけ</rt></ruby>ありません。すぐに<ruby>小<rt>ちい</rt></ruby>さくします。',
        translation: 'I\'m very sorry. I\'ll turn it down right away.',
        voiceSettings: { pitch: 1.2, rate: 1.1 }
      }
    ]
  },
  {
    id: 'n2-job-interview',
    title: '採用面接 (Job Interview)',
    level: 'N2',
    scenario: 'You are having a job interview for a software developer position. You will roleplay as the Applicant.',
    estimatedTime: '5 mins',
    userRole: 'B',
    lines: [
      {
        id: 'JI1',
        speaker: 'A',
        characterName: 'Interviewer',
        avatar: '💼',
        text: 'まず、簡単に自己紹介をお願いします。',
        displayHtml: 'まず、<ruby>簡単<rt>かんたん</rt></ruby>に<ruby>自己紹介<rt>じこしょうかい</rt></ruby>をお<ruby>願<rt>ねが</rt></ruby>いします。',
        translation: 'First, please give a brief self-introduction.',
        voiceSettings: { pitch: 0.8, rate: 0.95 }
      },
      {
        id: 'JI2',
        speaker: 'B',
        characterName: 'You (Applicant)',
        avatar: '👤',
        text: 'はい。前職ではフルスタックエンジニアとして3年間働いておりました。',
        displayHtml: 'はい。<ruby>前職<rt>ぜんしょく</rt></ruby>ではフルスタックエンジニアとして3<ruby>年間働<rt>ねんかんはたら</rt></ruby>いておりました。',
        translation: 'Yes. In my previous job, I worked as a full-stack engineer for three years.',
      },
      {
        id: 'JI3',
        speaker: 'A',
        characterName: 'Interviewer',
        avatar: '💼',
        text: '弊社を志望した理由は何ですか。',
        displayHtml: '<ruby>弊社<rt>へいしゃ</rt></ruby>を<ruby>志望<rt>しぼう</rt></ruby>した<ruby>理由<rt>りゆう</rt></ruby>は<ruby>何<rt>なん</rt></ruby>ですか。',
        translation: 'What is your reason for applying to our company?',
        voiceSettings: { pitch: 0.8, rate: 0.95 }
      },
      {
        id: 'JI4',
        speaker: 'B',
        characterName: 'You (Applicant)',
        avatar: '👤',
        text: '貴社の革新的な技術と、グローバルな環境に魅力を感じたからです。',
        displayHtml: '<ruby>貴社<rt>きしゃ</rt></ruby>の<ruby>革新的<rt>かくしんてき</rt></ruby>な<ruby>技術<rt>ぎじゅつ</rt></ruby>と、グローバルな<ruby>環境<rt>かんきょう</rt></ruby>に<ruby>魅力<rt>みりょく</rt></ruby>を<ruby>感<rt>かん</rt></ruby>じたからです。',
        translation: 'Because I was attracted to your company\'s innovative technology and global environment.',
      }
    ]
  },
  {
    id: 'n1-business-negotiation',
    title: '納期交渉 (Deadline Negotiation)',
    level: 'N1',
    scenario: 'You are negotiating a project deadline with a client. You will roleplay as the Project Manager.',
    estimatedTime: '6 mins',
    userRole: 'A',
    lines: [
      {
        id: 'BN1',
        speaker: 'A',
        characterName: 'You (Project Manager)',
        avatar: '👤',
        text: '現状、追加の要望を考慮しますと、当初の納期は厳しい状況にあります。',
        displayHtml: '<ruby>現状<rt>げんじょう</rt></ruby>、<ruby>追加<rt>ついか</rt></ruby>の<ruby>要望<rt>ようぼう</rt></ruby>を<ruby>考慮<rt>こうりょ</rt></ruby>しますと、<ruby>当初<rt>とうしょ</rt></ruby>の<ruby>納期<rt>のうき</rt></ruby>は<ruby>厳<rt>きび</rt></ruby>しい<ruby>状況<rt>じょうきょう</rt></ruby>にあります。',
        translation: 'Given the current situation and the additional requests, meeting the original deadline is becoming difficult.',
      },
      {
        id: 'BN2',
        speaker: 'B',
        characterName: 'Client',
        avatar: '🏢',
        text: 'それは困りましたね。リリースのスケジュールは既に決まっているのですが。',
        displayHtml: 'それは<ruby>困<rt>こま</rt></ruby>りましたね。リリースのスケジュールは<ruby>既<rt>すで</rt></ruby>に<ruby>決<rt>き</rt></ruby>まっているのですが。',
        translation: 'That\'s problematic. The release schedule has already been set.',
        voiceSettings: { pitch: 0.8, rate: 1.0 }
      },
      {
        id: 'BN3',
        speaker: 'A',
        characterName: 'You (Project Manager)',
        avatar: '👤',
        text: '承知しております。そこで、フェーズを分けて段階的に機能を公開してはいかがでしょうか。',
        displayHtml: '<ruby>承知<rt>しょうち</rt></ruby>しております。そこで、フェーズを<ruby>分<rt>わ</rt></ruby>けて<ruby>段階的<rt>だんかいてき</rt></ruby>に<ruby>機能<rt>きのう</rt></ruby>を<ruby>公開<rt>こうかい</rt></ruby>してはいかがでしょうか。',
        translation: 'I understand. How about we split the phases and release the features incrementally?',
      },
      {
        id: 'BN4',
        speaker: 'B',
        characterName: 'Client',
        avatar: '🏢',
        text: 'なるほど。優先順位の高いものから着手するということですね。検討してみます。',
        displayHtml: 'なるほど。<ruby>優先順位<rt>ゆうせんじゅんい</rt></ruby>の<ruby>高<rt>たか</rt></ruby>いものから<ruby>着手<rt>ちゃくしゅ</rt></ruby>するということですね。<ruby>検討<rt>けんとう</rt></ruby>してみます。',
        translation: 'I see. So starting with the high-priority items. I\'ll consider it.',
        voiceSettings: { pitch: 0.8, rate: 1.0 }
      }
    ]
  },
  {
    id: 'n4-hobby-talk',
    title: '趣味について話す (Talking About Hobbies)',
    level: 'N4',
    scenario: 'You are talking about your hobbies with a Japanese colleague during lunch. You will roleplay as yourself.',
    estimatedTime: '3 mins',
    userRole: 'A',
    lines: [
      {
        id: 'HT1',
        speaker: 'B',
        characterName: 'Colleague',
        avatar: '🧑🏻‍💻',
        text: '休みの日は何をしていますか。',
        displayHtml: '<ruby>休<rt>やす</rt></ruby>みの<ruby>日<rt>ひ</rt></ruby>は<ruby>何<rt>なに</rt></ruby>をしていますか。',
        translation: 'What do you do on your days off?',
        voiceSettings: { pitch: 1.0, rate: 1.0 }
      },
      {
        id: 'HT2',
        speaker: 'A',
        characterName: 'You',
        avatar: '👤',
        text: 'たいてい家で映画を見たり、本を読んだりしています。',
        displayHtml: 'たいてい<ruby>家<rt>うち</rt></ruby>で<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>たり、<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>んだりしています。',
        translation: 'I usually watch movies or read books at home.',
      },
      {
        id: 'HT3',
        speaker: 'B',
        characterName: 'Colleague',
        avatar: '🧑🏻‍💻',
        text: 'どんな映画が好きですか。',
        displayHtml: 'どんな<ruby>映画<rt>えいが</rt></ruby>が<ruby>好<rt>す</rt></ruby>きですか。',
        translation: 'What kind of movies do you like?',
        voiceSettings: { pitch: 1.0, rate: 1.0 }
      },
      {
        id: 'HT4',
        speaker: 'A',
        characterName: 'You',
        avatar: '👤',
        text: 'アニメやアクション映画が好きです。おすすめはありますか。',
        displayHtml: 'アニメやアクション<ruby>映画<rt>えいが</rt></ruby>が<ruby>好<rt>す</rt></ruby>きです。おすすめはありますか。',
        translation: 'I like anime and action movies. Do you have any recommendations?',
      }
    ]
  },
  {
    id: 'n2-asking-refund',
    title: '返金の依頼 (Asking for a Refund)',
    level: 'N2',
    scenario: 'You bought a dress that had a small hole in it. You go back to the store to ask for a refund. You will roleplay as the Customer.',
    estimatedTime: '4 mins',
    userRole: 'A',
    lines: [
      {
        id: 'AR1',
        speaker: 'A',
        characterName: 'You (Customer)',
        avatar: '👤',
        text: 'すみません、昨日ここで買ったワンピースに穴が開いていたので、返金をお願いしたいのですが。',
        displayHtml: 'すみません、<ruby>昨日<rt>きのう</rt></ruby>ここで<ruby>買<rt>か</rt></ruby>ったワンピースに<ruby>穴<rt>あな</rt></ruby>が<ruby>開<rt>あ</rt></ruby>いていたので、<ruby>返金<rt>へんきん</rt></ruby>をお<ruby>願<rt>ねが</rt></ruby>いしたいのですが。',
        translation: 'Excuse me, the dress I bought here yesterday has a hole in it, so I\'d like to ask for a refund.',
      },
      {
        id: 'AR2',
        speaker: 'B',
        characterName: 'Shop Manager',
        avatar: '👩🏻‍💼',
        text: '申し訳ございません。レシートはお持ちでしょうか。',
        displayHtml: '<ruby>申<rt>もう</rt></ruby>し<ruby>訳<rt>わけ</rt></ruby>ございません。レシートはお<ruby>持<rt>も</rt></ruby>ちでしょうか。',
        translation: 'I\'m very sorry. Do you have the receipt?',
        voiceSettings: { pitch: 1.1, rate: 0.9 }
      },
      {
        id: 'AR3',
        speaker: 'A',
        characterName: 'You (Customer)',
        avatar: '👤',
        text: 'はい、これです。同じものがあれば交換でもいいですよ。',
        displayHtml: 'はい、これです。<ruby>同<rt>おな</rt></ruby>じものがあれば<ruby>交換<rt>こうかん</rt></ruby>でもいいですよ。',
        translation: 'Yes, here it is. If you have the same item, an exchange would be fine too.',
      },
      {
        id: 'AR4',
        speaker: 'B',
        characterName: 'Shop Manager',
        avatar: '👩🏻‍💼',
        text: '在庫を確認してまいります。少々お待ちください。',
        displayHtml: '<ruby>在庫<rt>ざいこ</rt></ruby>を<ruby>確認<rt>かくにん</rt></ruby>してまいります。<ruby>少々<rt>しょうしょう</rt></ruby>お<ruby>待<rt>ま</rt></ruby>ちください。',
        translation: 'I\'ll go check the stock. Please wait a moment.',
        voiceSettings: { pitch: 1.1, rate: 0.9 }
      }
    ]
  },
  {
    id: 'n3-declining-invitation',
    title: '誘いを断る (Declining an Invitation)',
    level: 'N3',
    scenario: 'Your colleague invites you to a drinking party, but you have other plans. You will roleplay as yourself.',
    estimatedTime: '3 mins',
    userRole: 'A',
    lines: [
      {
        id: 'DI1',
        speaker: 'B',
        characterName: 'Colleague',
        avatar: '👨🏻‍💻',
        text: '今日の仕事帰り、飲みに行かない？',
        displayHtml: '<ruby>今日<rt>きょう</rt></ruby>の<ruby>仕事帰<rt>しごとがえ</rt></ruby>り、<ruby>飲<rt>の</rt></ruby>みに<ruby>行<rt>い</rt></ruby>かない？',
        translation: 'Do you want to go for a drink after work today?',
        voiceSettings: { pitch: 1.0, rate: 1.1 }
      },
      {
        id: 'DI2',
        speaker: 'A',
        characterName: 'You',
        avatar: '👤',
        text: '誘ってくれてありがとう。でも今日は予定があって。',
        displayHtml: '<ruby>誘<rt>さそ</rt></ruby>ってくれてありがとう。でも<ruby>今日<rt>きょう</rt></ruby>は<ruby>予定<rt>よてい</rt></ruby>があって。',
        translation: 'Thanks for inviting me. But I have plans today.',
      },
      {
        id: 'DI3',
        speaker: 'B',
        characterName: 'Colleague',
        avatar: '👨🏻‍💻',
        text: 'そっか、残念。また今度誘うね。',
        displayHtml: 'そっか、<ruby>残念<rt>ざんねん</rt></ruby>。また<ruby>今度誘<rt>こんどさそ</rt></ruby>うね。',
        translation: 'Oh, that\'s a shame. I\'ll invite you next time.',
        voiceSettings: { pitch: 1.0, rate: 1.1 }
      },
      {
        id: 'DI4',
        speaker: 'A',
        characterName: 'You',
        avatar: '👤',
        text: 'うん、ぜひ！また声をかけてね。',
        displayHtml: 'うん、ぜひ！また<ruby>声<rt>こえ</rt></ruby>をかけてね。',
        translation: 'Yeah, definitely! Please ask again.',
      }
    ]
  },
  {
    id: 'n5-ordering-coffee',
    title: 'カフェで注文 (Ordering at a Cafe)',
    level: 'N5',
    scenario: 'You are ordering coffee and a cake at a local cafe. You will roleplay as the Customer.',
    estimatedTime: '2 mins',
    userRole: 'A',
    lines: [
      {
        id: 'OC1',
        speaker: 'B',
        characterName: 'Barista',
        avatar: '☕',
        text: 'いらっしゃいませ。何になさいますか。',
        displayHtml: 'いらっしゃいませ。<ruby>何<rt>なに</rt></ruby>になさいますか。',
        translation: 'Welcome. What would you like?',
        voiceSettings: { pitch: 1.2, rate: 1.0 }
      },
      {
        id: 'OC2',
        speaker: 'A',
        characterName: 'You (Customer)',
        avatar: '👤',
        text: 'ホットコーヒーと、チーズケーキを一つください。',
        displayHtml: 'ホットコーヒーと、チーズケーキを<ruby>一<rt>ひと</rt></ruby>つください。',
        translation: 'A hot coffee and one cheesecake, please.',
      },
      {
        id: 'OC3',
        speaker: 'B',
        characterName: 'Barista',
        avatar: '☕',
        text: '店内でお召し上がりですか。',
        displayHtml: '<ruby>店内<rt>てんない</rt></ruby>でお<ruby>召<rt>め</rt></ruby>し<ruby>上<rt>あ</rt></ruby>がりですか。',
        translation: 'Will you be eating here?',
        voiceSettings: { pitch: 1.2, rate: 1.0 }
      },
      {
        id: 'OC4',
        speaker: 'A',
        characterName: 'You (Customer)',
        avatar: '👤',
        text: 'はい、店内で。',
        displayHtml: 'はい、<ruby>店内<rt>てんない</rt></ruby>で。',
        translation: 'Yes, here.',
      }
    ]
  },
  {
    id: 'n4-part-time-interview',
    title: 'アルバイトの面接 (Part-time Job Interview)',
    level: 'N4',
    scenario: 'You are interviewing for a part-time job at a convenience store. You will roleplay as the Applicant.',
    estimatedTime: '4 mins',
    userRole: 'A',
    lines: [
      {
        id: 'PI1',
        speaker: 'B',
        characterName: 'Store Manager',
        avatar: '🏪',
        text: '週に何日くらい入れますか。',
        displayHtml: '<ruby>週<rt>しゅう</rt></ruby>に<ruby>何日<rt>なんにち</rt></ruby>くらい<ruby>入<rt>い</rt></ruby>れますか。',
        translation: 'About how many days a week can you work?',
        voiceSettings: { pitch: 0.9, rate: 0.9 }
      },
      {
        id: 'PI2',
        speaker: 'A',
        characterName: 'You (Applicant)',
        avatar: '👤',
        text: '週に3日、平日の夕方からなら入れます。',
        displayHtml: '<ruby>週<rt>しゅう</rt></ruby>に3<ruby>日<rt>にち</rt></ruby>、<ruby>平日<rt>へいじつ</rt></ruby>の<ruby>夕方<rt>ゆうがた</rt></ruby>からなら<ruby>入<rt>い</rt></ruby>れます。',
        translation: 'I can work three days a week, from weekday evenings.',
      },
      {
        id: 'PI3',
        speaker: 'B',
        characterName: 'Store Manager',
        avatar: '🏪',
        text: '土日は難しいですか。',
        displayHtml: '<ruby>土日<rt>どにち</rt></ruby>は<ruby>難<rt>むずか</rt></ruby>しいですか。',
        translation: 'Is it difficult on weekends?',
        voiceSettings: { pitch: 0.9, rate: 0.9 }
      },
      {
        id: 'PI4',
        speaker: 'A',
        characterName: 'You (Applicant)',
        avatar: '👤',
        text: '土曜日の午前中なら大丈夫です。',
        displayHtml: '<ruby>土曜日<rt>どようび</rt></ruby>の<ruby>午前中<rt>ごぜんちゅう</rt></ruby>なら<ruby>大丈夫<rt>だいじょうぶ</rt></ruby>です。',
        translation: 'Saturday mornings would be fine.',
      }
    ]
  },
  {
    id: 'n1-project-delay',
    title: 'プロジェクトの遅延報告 (Project Delay Report)',
    level: 'N1',
    scenario: 'You have to inform your boss about a significant delay in the current project. You will roleplay as the Team Lead.',
    estimatedTime: '6 mins',
    userRole: 'A',
    lines: [
      {
        id: 'PD1',
        speaker: 'A',
        characterName: 'You (Team Lead)',
        avatar: '👤',
        text: '課長、今お時間よろしいでしょうか。',
        displayHtml: '<ruby>課長<rt>かちょう</rt></ruby>、<ruby>今<rt>いま</rt></ruby>お<ruby>時間<rt>じかん</rt></ruby>よろしいでしょうか。',
        translation: 'Section Chief, do you have a moment?',
      },
      {
        id: 'PD2',
        speaker: 'B',
        characterName: 'Section Chief',
        avatar: '👨🏻‍💼',
        text: 'ああ、どうしたんだ。',
        displayHtml: 'ああ、どうしたんだ。',
        translation: 'Ah, what is it?',
        voiceSettings: { pitch: 0.8, rate: 0.9 }
      },
      {
        id: 'PD3',
        speaker: 'A',
        characterName: 'You (Team Lead)',
        avatar: '👤',
        text: '例のプロジェクトですが、サーバーの不具合により1週間の遅れが生じる見込みです。',
        displayHtml: '<ruby>例<rt>れい</rt></ruby>のプロジェクトですが、サーバーの<ruby>不具合<rt>ふぐあい</rt></ruby>により1<ruby>週間<rt>しゅうかん</rt></ruby>の<ruby>遅<rt>おく</rt></ruby>れが<ruby>生<rt>しょう</rt></ruby>じる<ruby>見込<rt>みこ</rt></ruby>みです。',
        translation: 'Regarding that project, due to server issues, we are expecting a one-week delay.',
      },
      {
        id: 'PD4',
        speaker: 'B',
        characterName: 'Section Chief',
        avatar: '👨🏻‍💼',
        text: 'それは困るな。リカバリープランは考えてあるのか。',
        displayHtml: 'それは<ruby>困<rt>こま</rt></ruby>るな。リカバリープランは<ruby>考<rt>かんが</rt></ruby>えてあるのか。',
        translation: 'That\'s a problem. Have you thought of a recovery plan?',
        voiceSettings: { pitch: 0.8, rate: 0.9 }
      }
    ]
  },
  {
    id: 'n5-library-help',
    title: '図書館で質問 (Asking at a Library)',
    level: 'N5',
    scenario: 'You are looking for a specific book at a local library. You will roleplay as the Visitor.',
    estimatedTime: '2 mins',
    userRole: 'A',
    lines: [
      {
        id: 'LH1',
        speaker: 'A',
        characterName: 'You (Visitor)',
        avatar: '👤',
        text: 'すみません、日本語の教科書はどこにありますか。',
        displayHtml: 'すみません、<ruby>日本語<rt>にほんご</rt></ruby>の<ruby>教科書<rt>きょうかしょ</rt></ruby>はどこにありますか。',
        translation: 'Excuse me, where are the Japanese language textbooks?',
      },
      {
        id: 'LH2',
        speaker: 'B',
        characterName: 'Librarian',
        avatar: '👩🏻‍🏫',
        text: 'あちらの3番の棚にあります。',
        displayHtml: 'あちらの3<ruby>番<rt>ばん</rt></ruby>の<ruby>棚<rt>たな</rt></ruby>にあります。',
        translation: 'They are on shelf number 3 over there.',
        voiceSettings: { pitch: 1.1, rate: 1.0 }
      },
      {
        id: 'LH3',
        speaker: 'A',
        characterName: 'You (Visitor)',
        avatar: '👤',
        text: 'ありがとうございます。CDも借りることができますか。',
        displayHtml: 'ありがとうございます。CDも<ruby>借<rt>か</rt></ruby>りることができますか。',
        translation: 'Thank you. Can I also borrow CDs?',
      },
      {
        id: 'LH4',
        speaker: 'B',
        characterName: 'Librarian',
        avatar: '👩🏻‍🏫',
        text: 'はい、カードがあれば大丈夫ですよ。',
        displayHtml: 'はい、カードがあれば<ruby>大丈夫<rt>だいじょうぶ</rt></ruby>ですよ。',
        translation: 'Yes, if you have a card, it\'s fine.',
        voiceSettings: { pitch: 1.1, rate: 1.0 }
      }
    ]
  },
  {
    id: 'n4-weekend-plans',
    title: '週末の予定 (Weekend Plans)',
    level: 'N4',
    scenario: 'You are discussing weekend plans with your Japanese partner. You will roleplay as yourself.',
    estimatedTime: '3 mins',
    userRole: 'A',
    lines: [
      {
        id: 'WP1',
        speaker: 'B',
        characterName: 'Partner',
        avatar: '👧🏻',
        text: '今週末、何かしたいことある？',
        displayHtml: '<ruby>今週末<rt>こんしゅうまつ</rt></ruby>、<ruby>何<rt>なに</rt></ruby>かしたいことある？',
        translation: 'Is there anything you want to do this weekend?',
        voiceSettings: { pitch: 1.2, rate: 1.1 }
      },
      {
        id: 'WP2',
        speaker: 'A',
        characterName: 'You',
        avatar: '👤',
        text: '久しぶりに公園でピクニックがしたいな。',
        displayHtml: '<ruby>久<rt>ひさ</rt></ruby>しぶりに<ruby>公園<rt>こうえん</rt></ruby>でピクニックがしたいな。',
        translation: 'I want to have a picnic in the park for the first time in a while.',
      },
      {
        id: 'WP3',
        speaker: 'B',
        characterName: 'Partner',
        avatar: '👧🏻',
        text: 'いいね！お弁当、私が作るよ。',
        displayHtml: 'いいね！お<ruby>弁当<rt>べんとう</rt></ruby>、<ruby>私<rt>わたし</rt></ruby>が<ruby>作<rt>つく</rt></ruby>るよ。',
        translation: 'That sounds good! I\'ll make the lunch boxes.',
        voiceSettings: { pitch: 1.2, rate: 1.1 }
      },
      {
        id: 'WP4',
        speaker: 'A',
        characterName: 'You',
        avatar: '👤',
        text: '本当？ありがとう。楽しみにしてるね。',
        displayHtml: '<ruby>本当<rt>ほんとう</rt></ruby>？ありがとう。<ruby>楽<rt>たの</rt></ruby>しみにしてるね。',
        translation: 'Really? Thank you. I\'m looking forward to it.',
      }
    ]
  },
  {
    id: 'n3-bank-account',
    title: '銀行口座の開設 (Opening a Bank Account)',
    level: 'N3',
    scenario: 'You are at a bank to open a new savings account. You will roleplay as the Customer.',
    estimatedTime: '5 mins',
    userRole: 'A',
    lines: [
      {
        id: 'BA1',
        speaker: 'A',
        characterName: 'You (Customer)',
        avatar: '👤',
        text: '新しい口座を作りたいのですが。',
        displayHtml: '<ruby>新<rt>あたら</rt></ruby>しい<ruby>口座<rt>こうざ</rt></ruby>を<ruby>作<rt>つく</rt></ruby>りたいのですが。',
        translation: 'I\'d like to open a new account.',
      },
      {
        id: 'BA2',
        speaker: 'B',
        characterName: 'Bank Clerk',
        avatar: '🏦',
        text: 'かしこまりました。こちらに必要事項を記入してください。',
        displayHtml: 'かしこまりました。こちらに<ruby>必要事項<rt>ひつようじこう</rt></ruby>を<ruby>記入<rt>きにゅう</rt></ruby>してください。',
        translation: 'Certainly. Please fill in the necessary information here.',
        voiceSettings: { pitch: 1.0, rate: 0.9 }
      },
      {
        id: 'BA3',
        speaker: 'A',
        characterName: 'You (Customer)',
        avatar: '👤',
        text: '印鑑は持っていないんですが、サインでもいいですか。',
        displayHtml: '<ruby>印鑑<rt>いんかん</rt></ruby>は<ruby>持<rt>も</rt></ruby>っていないんですが、サインでもいいですか。',
        translation: 'I don\'t have a seal, is a signature okay?',
      },
      {
        id: 'BA4',
        speaker: 'B',
        characterName: 'Bank Clerk',
        avatar: '🏦',
        text: 'はい、サインでも大丈夫ですよ。',
        displayHtml: 'はい、サインでも<ruby>大丈夫<rt>だいじょうぶ</rt></ruby>ですよ。',
        translation: 'Yes, a signature is fine too.',
        voiceSettings: { pitch: 1.0, rate: 0.9 }
      }
    ]
  }
];
