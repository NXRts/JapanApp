export interface DialogueLine {
  speaker: string;
  avatar: string; // Emoji character representing the speaker
  text: string; // Clean Japanese text to be sent to SpeechSynthesis
  displayHtml: string; // Annotated text with <ruby> and <rt> for Furigana
  translation: string;
  voiceSettings: {
    pitch: number;
    rate: number;
  };
  audioUrl?: string;
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
  audioUrl?: string;
}

export const listeningExercises: ListeningExercise[] = [
  {
    id: "n5-convenience-store",
    title: "コンビニのレジで (At the Convenience Store Checkout)",
    level: "N5",
    tags: ["Shopping", "Daily Life"],
    scenario:
      "A customer is buying a bento box at a convenience store. Listen to the cashier and the customer.",
    dialogue: [
      {
        speaker: "Cashier",
        avatar: "👩🏻‍💼",
        text: "いらっしゃいませ。お弁当温めますか。",
        displayHtml:
          "いらっしゃいませ。お<ruby>弁当<rt>べんとう</rt></ruby><ruby>温<rt>あたた</rt></ruby>めますか。",
        translation: "Welcome. Would you like me to warm up your bento?",
        voiceSettings: { pitch: 1.4, rate: 0.9 }, // Higher pitch, polite
      },
      {
        speaker: "Customer",
        avatar: "👨🏻",
        text: "はい、お願いします。",
        displayHtml: "はい、お<ruby>願<rt>ねが</rt></ruby>いします。",
        translation: "Yes, please.",
        voiceSettings: { pitch: 0.9, rate: 1.0 }, // Lower pitch, casual
      },
      {
        speaker: "Cashier",
        avatar: "👩🏻‍💼",
        text: "袋はお分けしますか。",
        displayHtml:
          "<ruby>袋<rt>ふくろ</rt></ruby>はお<ruby>分<rt>わ</rt></ruby>けしますか。",
        translation: "Would you like separate bags?",
        voiceSettings: { pitch: 1.4, rate: 0.9 },
      },
      {
        speaker: "Customer",
        avatar: "👨🏻",
        text: "いいえ、一緒でいいです。",
        displayHtml: "いいえ、<ruby>一緒<rt>いっしょ</rt></ruby>でいいです。",
        translation: "No, together is fine.",
        voiceSettings: { pitch: 0.9, rate: 1.0 },
      },
      {
        speaker: "Cashier",
        avatar: "👩🏻‍💼",
        text: "500円になります。ありがとうございます。",
        displayHtml:
          "<ruby>500円<rt>ごひゃくえん</rt></ruby>になります。ありがとうございます。",
        translation: "That will be 500 yen. Thank you very much.",
        voiceSettings: { pitch: 1.4, rate: 0.9 },
      },
    ],
    quiz: {
      question: "What did the customer request regarding the bags?",
      options: [
        "He wanted the bento in a separate bag.",
        "He didn't want any bag.",
        "He wanted everything in the same bag.",
        "He brought his own eco-bag.",
      ],
      correctAnswerIndex: 2,
      explanation:
        'The cashier asked "袋はお分けしますか" (separate bags?) and the customer replied "一緒でいいです" (together is fine).',
    },
  },
  {
    id: "n4-train-station",
    title: "駅で道を尋ねる (Asking for Directions at the Station)",
    level: "N4",
    tags: ["Travel", "Directions"],
    scenario:
      "A tourist is lost at the train station and asks a station attendant for directions.",
    dialogue: [
      {
        speaker: "Tourist",
        avatar: "👱🏼‍♂️",
        text: "すみません、東京タワーに行きたいんですが、どの電車に乗ればいいですか。",
        displayHtml:
          "すみません、<ruby>東京<rt>とうきょう</rt></ruby>タワーに<ruby>行<rt>い</rt></ruby>きたいんですが、どの<ruby>電車<rt>でんしゃ</rt></ruby>に<ruby>乗<rt>の</rt></ruby>ればいいですか。",
        translation:
          "Excuse me, I want to go to Tokyo Tower. Which train should I take?",
        voiceSettings: { pitch: 1.0, rate: 0.95 },
      },
      {
        speaker: "Station Attendant",
        avatar: "👨🏻‍✈️",
        text: "東京タワーですね。それなら、あそこの赤い線の電車に乗ってください。",
        displayHtml:
          "<ruby>東京<rt>とうきょう</rt></ruby>タワーですね。それなら、あそこの<ruby>赤<rt>あか</rt></ruby>い<ruby>線<rt>せん</rt></ruby>の<ruby>電車<rt>でんしゃ</rt></ruby>に<ruby>乗<rt>の</rt></ruby>ってください。",
        translation:
          "Tokyo Tower, right? In that case, please take the train on the red line over there.",
        voiceSettings: { pitch: 0.8, rate: 1.1 },
      },
      {
        speaker: "Tourist",
        avatar: "👱🏼‍♂️",
        text: "赤い線ですね。何分くらいかかりますか。",
        displayHtml:
          "<ruby>赤<rt>あか</rt></ruby>い<ruby>線<rt>せん</rt></ruby>ですね。<ruby>何分<rt>なんぷん</rt></ruby>くらいかかりますか。",
        translation: "The red line. About how many minutes will it take?",
        voiceSettings: { pitch: 1.0, rate: 0.95 },
      },
      {
        speaker: "Station Attendant",
        avatar: "👨🏻‍✈️",
        text: "15分くらいです。次の電車は3時に来ますよ。",
        displayHtml:
          "<ruby>15分<rt>じゅうごふん</rt></ruby>くらいです。<ruby>次<rt>つぎ</rt></ruby>の<ruby>電車<rt>でんしゃ</rt></ruby>は<ruby>3時<rt>さんじ</rt></ruby>に<ruby>来<rt>き</rt></ruby>ますよ。",
        translation: "About 15 minutes. The next train comes at 3 o'clock.",
        voiceSettings: { pitch: 0.8, rate: 1.1 },
      },
      {
        speaker: "Tourist",
        avatar: "👱🏼‍♂️",
        text: "わかりました。ありがとうございます。",
        displayHtml: "わかりました。ありがとうございます。",
        translation: "I understand. Thank you.",
        voiceSettings: { pitch: 1.0, rate: 0.95 },
      },
    ],
    quiz: {
      question:
        "Which train should the tourist take and how long will the trip take?",
      options: [
        "Blue line, 30 minutes",
        "Red line, 15 minutes",
        "Red line, 3 minutes",
        "Green line, 15 minutes",
      ],
      correctAnswerIndex: 1,
      explanation:
        "The attendant told him to take the red line (赤い線) and it will take about 15 minutes (15分くらい).",
    },
  },
  {
    id: "n5-restaurant-order",
    title: "レストランで注文する (Ordering at a Restaurant)",
    level: "N5",
    tags: ["Food", "Dining"],
    scenario: "A customer is ordering food at a Japanese restaurant.",
    dialogue: [
      {
        speaker: "Waiter",
        avatar: "👨🏻‍🍳",
        text: "ご注文はお決まりですか。",
        displayHtml:
          "ご<ruby>注文<rt>ちゅうもん</rt></ruby>はお<ruby>決<rt>き</rt></ruby>まりですか。",
        translation: "Have you decided on your order?",
        voiceSettings: { pitch: 1.0, rate: 0.9 },
      },
      {
        speaker: "Customer",
        avatar: "👩🏻",
        text: "はい、天ぷら定食を一つお願いします。",
        displayHtml:
          "はい、<ruby>天<rt>てん</rt></ruby>ぷら<ruby>定食<rt>ていしょく</rt></ruby>を<ruby>一<rt>ひと</rt></ruby>つお<ruby>願<rt>ねが</rt></ruby>いします。",
        translation: "Yes, one tempura set meal, please.",
        voiceSettings: { pitch: 1.2, rate: 1.0 },
      },
      {
        speaker: "Waiter",
        avatar: "👨🏻‍🍳",
        text: "お飲み物はいかがですか。",
        displayHtml:
          "お<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>はいかがですか。",
        translation: "Would you like a drink?",
        voiceSettings: { pitch: 1.0, rate: 0.9 },
      },
      {
        speaker: "Customer",
        avatar: "👩🏻",
        text: "冷たいお茶をください。",
        displayHtml:
          "<ruby>冷<rt>つめ</rt></ruby>たいお<ruby>茶<rt>ちゃ</rt></ruby>をください。",
        translation: "Cold tea, please.",
        voiceSettings: { pitch: 1.2, rate: 1.0 },
      },
    ],
    quiz: {
      question: "What did the customer order?",
      options: [
        "Sushi and hot tea",
        "Tempura set and cold tea",
        "Ramen and water",
        "Tempura set and hot tea",
      ],
      correctAnswerIndex: 1,
      explanation:
        "The customer ordered a tempura set meal (天ぷら定食) and cold tea (冷たいお茶).",
    },
  },
  {
    id: "n5-weekend-plans",
    title: "週末の予定 (Weekend Plans)",
    level: "N5",
    tags: ["Daily Life", "Friends"],
    scenario: "Two friends are discussing what to do this weekend.",
    dialogue: [
      {
        speaker: "Tanaka",
        avatar: "👦🏻",
        text: "週末、暇ですか。一緒に映画を見に行きませんか。",
        displayHtml:
          "<ruby>週末<rt>しゅうまつ</rt></ruby>、<ruby>暇<rt>ひま</rt></ruby>ですか。<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>に<ruby>行<rt>い</rt></ruby>きませんか。",
        translation:
          "Are you free this weekend? Won't you go see a movie with me?",
        voiceSettings: { pitch: 1.0, rate: 1.0 },
      },
      {
        speaker: "Sato",
        avatar: "👩🏻",
        text: "いいですね。何を見ますか。",
        displayHtml:
          "いいですね。<ruby>何<rt>なに</rt></ruby>を<ruby>見<rt>み</rt></ruby>ますか。",
        translation: "Sounds good. What will we see?",
        voiceSettings: { pitch: 1.3, rate: 1.0 },
      },
      {
        speaker: "Tanaka",
        avatar: "👦🏻",
        text: "新しいアニメの映画はどうですか。",
        displayHtml:
          "<ruby>新<rt>あたら</rt></ruby>しいアニメの<ruby>映画<rt>えいが</rt></ruby>はどうですか。",
        translation: "How about the new anime movie?",
        voiceSettings: { pitch: 1.0, rate: 1.0 },
      },
      {
        speaker: "Sato",
        avatar: "👩🏻",
        text: "賛成です！日曜日の午後に行きましょう。",
        displayHtml:
          "<ruby>賛成<rt>さんせい</rt></ruby>です！<ruby>日曜日<rt>にちようび</rt></ruby>の<ruby>午後<rt>ごご</rt></ruby>に<ruby>行<rt>い</rt></ruby>きましょう。",
        translation: "I agree! Let's go on Sunday afternoon.",
        voiceSettings: { pitch: 1.3, rate: 1.0 },
      },
    ],
    quiz: {
      question: "When are they going to see the movie?",
      options: [
        "Saturday morning",
        "Saturday afternoon",
        "Sunday morning",
        "Sunday afternoon",
      ],
      correctAnswerIndex: 3,
      explanation: "Sato suggested Sunday afternoon (日曜日の午後に).",
    },
  },
  {
    id: "n5-weather-forecast",
    title: "明日の天気 (Tomorrow's Weather)",
    level: "N5",
    tags: ["Weather", "News"],
    scenario: "A family is listening to the weather forecast for tomorrow.",
    dialogue: [
      {
        speaker: "Announcer",
        avatar: "📺",
        text: "明日の天気です。午前中は晴れますが、午後から雨が降るでしょう。",
        displayHtml:
          "<ruby>明日<rt>あした</rt></ruby>の<ruby>天気<rt>てんき</rt></ruby>です。<ruby>午前中<rt>ごぜんちゅう</rt></ruby>は<ruby>晴<rt>は</rt></ruby>れますが、<ruby>午後<rt>ごご</rt></ruby>から<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>るでしょう。",
        translation:
          "Here is tomorrow's weather. It will be sunny in the morning, but it will rain from the afternoon.",
        voiceSettings: { pitch: 1.1, rate: 0.95 },
      },
      {
        speaker: "Mother",
        avatar: "👩🏻",
        text: "あら、午後は雨なのね。",
        displayHtml:
          "あら、<ruby>午後<rt>ごご</rt></ruby>は<ruby>雨<rt>あめ</rt></ruby>なのね。",
        translation: "Oh, it's going to rain in the afternoon.",
        voiceSettings: { pitch: 1.3, rate: 1.0 },
      },
      {
        speaker: "Son",
        avatar: "👦🏻",
        text: "じゃあ、傘を持って行かなくちゃ。",
        displayHtml:
          "じゃあ、<ruby>傘<rt>かさ</rt></ruby>を<ruby>持<rt>も</rt></ruby>って<ruby>行<rt>い</rt></ruby>かなくちゃ。",
        translation: "Then, I have to take an umbrella.",
        voiceSettings: { pitch: 1.4, rate: 1.0 },
      },
    ],
    quiz: {
      question: "What will the weather be like tomorrow afternoon?",
      options: ["Sunny", "Cloudy", "Rainy", "Snowy"],
      correctAnswerIndex: 2,
      explanation:
        "The announcer said it will rain from the afternoon (午後から雨が降るでしょう).",
    },
  },
  {
    id: "n4-doctor-visit",
    title: "病院で (At the Hospital)",
    level: "N4",
    tags: ["Health", "Medical"],
    scenario: "A patient is explaining their symptoms to a doctor.",
    dialogue: [
      {
        speaker: "Doctor",
        avatar: "👨🏻‍⚕️",
        text: "今日はどうしましたか。",
        displayHtml: "<ruby>今日<rt>きょう</rt></ruby>はどうしましたか。",
        translation: "What's the matter today?",
        voiceSettings: { pitch: 0.8, rate: 0.9 },
      },
      {
        speaker: "Patient",
        avatar: "🤒",
        text: "昨日から熱があって、喉も痛いんです。",
        displayHtml:
          "<ruby>昨日<rt>きのう</rt></ruby>から<ruby>熱<rt>ねつ</rt></ruby>があって、<ruby>喉<rt>のど</rt></ruby>も<ruby>痛<rt>いた</rt></ruby>いんです。",
        translation:
          "I've had a fever since yesterday, and my throat also hurts.",
        voiceSettings: { pitch: 1.1, rate: 0.9 },
      },
      {
        speaker: "Doctor",
        avatar: "👨🏻‍⚕️",
        text: "風邪ですね。薬を出しますから、ゆっくり休んでください。",
        displayHtml:
          "<ruby>風邪<rt>かぜ</rt></ruby>ですね。<ruby>薬<rt>くすり</rt></ruby>を<ruby>出<rt>だ</rt></ruby>しますから、ゆっくり<ruby>休<rt>やす</rt></ruby>んでください。",
        translation:
          "It's a cold. I will prescribe some medicine, so please get some rest.",
        voiceSettings: { pitch: 0.8, rate: 0.9 },
      },
    ],
    quiz: {
      question: "What are the patient's symptoms?",
      options: [
        "Stomachache and fever",
        "Headache and cough",
        "Fever and sore throat",
        "Sore throat and cough",
      ],
      correctAnswerIndex: 2,
      explanation:
        "The patient mentions fever (熱) and sore throat (喉が痛い).",
    },
  },
  {
    id: "n4-phone-message",
    title: "電話の伝言 (Phone Message)",
    level: "N4",
    tags: ["Business", "Telephone"],
    scenario:
      "Someone is calling an office but the person they want to speak to is not there.",
    dialogue: [
      {
        speaker: "Receptionist",
        avatar: "👩🏻‍💼",
        text: "はい、鈴木株式会社です。",
        displayHtml:
          "はい、<ruby>鈴木<rt>すずき</rt></ruby><ruby>株式会社<rt>かぶしきがいしゃ</rt></ruby>です。",
        translation: "Hello, Suzuki Corporation.",
        voiceSettings: { pitch: 1.3, rate: 0.95 },
      },
      {
        speaker: "Caller",
        avatar: "👨🏻",
        text: "山田と申しますが、田中さんはおられますか。",
        displayHtml:
          "<ruby>山田<rt>やまだ</rt></ruby>と<ruby>申<rt>もう</rt></ruby>しますが、<ruby>田中<rt>たなか</rt></ruby>さんはおられますか。",
        translation: "My name is Yamada, is Mr. Tanaka there?",
        voiceSettings: { pitch: 0.9, rate: 0.95 },
      },
      {
        speaker: "Receptionist",
        avatar: "👩🏻‍💼",
        text: "申し訳ありません。田中はただいま席を外しております。",
        displayHtml:
          "<ruby>申<rt>もう</rt></ruby>し<ruby>訳<rt>わけ</rt></ruby>ありません。<ruby>田中<rt>たなか</rt></ruby>はただいま<ruby>席<rt>せき</rt></ruby>を<ruby>外<rt>はず</rt></ruby>しております。",
        translation: "I apologize. Tanaka is currently away from his desk.",
        voiceSettings: { pitch: 1.3, rate: 0.95 },
      },
      {
        speaker: "Caller",
        avatar: "👨🏻",
        text: "そうですか。では、後でまたかけ直します。",
        displayHtml:
          "そうですか。では、<ruby>後<rt>あと</rt></ruby>でまたかけ<ruby>直<rt>なお</rt></ruby>します。",
        translation: "I see. Then I will call back later.",
        voiceSettings: { pitch: 0.9, rate: 0.95 },
      },
    ],
    quiz: {
      question: "What will the caller do next?",
      options: [
        "Leave a message",
        "Call back later",
        "Wait on the line",
        "Email Tanaka",
      ],
      correctAnswerIndex: 1,
      explanation:
        'The caller said "後でまたかけ直します" (I will call back later).',
    },
  },
  {
    id: "n4-shopping-clothes",
    title: "服屋で (At the Clothes Shop)",
    level: "N4",
    tags: ["Shopping", "Fashion"],
    scenario: "A customer is looking for a shirt in a clothing store.",
    dialogue: [
      {
        speaker: "Clerk",
        avatar: "👱🏻‍♀️",
        text: "いらっしゃいませ。何かお探しですか。",
        displayHtml:
          "いらっしゃいませ。<ruby>何<rt>なに</rt></ruby>かお<ruby>探<rt>さが</rt></ruby>しですか。",
        translation: "Welcome. Are you looking for something?",
        voiceSettings: { pitch: 1.4, rate: 1.0 },
      },
      {
        speaker: "Customer",
        avatar: "👨🏻",
        text: "このシャツの青色はありますか。",
        displayHtml:
          "このシャツの<ruby>青色<rt>あおいろ</rt></ruby>はありますか。",
        translation: "Do you have this shirt in blue?",
        voiceSettings: { pitch: 1.0, rate: 1.0 },
      },
      {
        speaker: "Clerk",
        avatar: "👱🏻‍♀️",
        text: "少々お待ちください。…申し訳ございません。青色は売り切れです。黒ならありますが…",
        displayHtml:
          "<ruby>少々<rt>しょうしょう</rt></ruby>お<ruby>待<rt>ま</rt></ruby>ちください。…<ruby>申<rt>もう</rt></ruby>し<ruby>訳<rt>わけ</rt></ruby>ございません。<ruby>青色<rt>あおいろ</rt></ruby>は<ruby>売<rt>う</rt></ruby>り<ruby>切<rt>き</rt></ruby>れです。<ruby>黒<rt>くろ</rt></ruby>ならありますが…",
        translation:
          "Please wait a moment. ...I'm sorry. Blue is sold out. We have black though...",
        voiceSettings: { pitch: 1.4, rate: 0.95 },
      },
      {
        speaker: "Customer",
        avatar: "👨🏻",
        text: "そうですか。じゃあ、また今度にします。",
        displayHtml:
          "そうですか。じゃあ、また<ruby>今度<rt>こんど</rt></ruby>にします。",
        translation: "I see. Well, I'll pass for now (do it next time).",
        voiceSettings: { pitch: 1.0, rate: 1.0 },
      },
    ],
    quiz: {
      question: "Why didn't the customer buy the shirt?",
      options: [
        "It was too expensive",
        "They didn't have his size",
        "The blue color was sold out",
        "He didn't like the black color",
      ],
      correctAnswerIndex: 2,
      explanation:
        "The clerk said the blue color was sold out (青色は売り切れです).",
    },
  },
  {
    id: "n3-job-interview",
    title: "面接での自己紹介 (Job Interview Self-Introduction)",
    level: "N3",
    tags: ["Business", "Interview"],
    scenario: "An applicant is introducing themselves at a job interview.",
    dialogue: [
      {
        speaker: "Interviewer",
        avatar: "👨🏻‍💼",
        text: "それでは、まず自己紹介をお願いします。",
        displayHtml:
          "それでは、まず<ruby>自己紹介<rt>じこしょうかい</rt></ruby>をお<ruby>願<rt>ねが</rt></ruby>いします。",
        translation: "Well then, please introduce yourself first.",
        voiceSettings: { pitch: 0.8, rate: 0.9 },
      },
      {
        speaker: "Applicant",
        avatar: "🧑🏻‍🎓",
        text: "はい。初めまして、キムと申します。大学では情報工学を専攻していました。",
        displayHtml:
          "はい。<ruby>初<rt>はじ</rt></ruby>めまして、キムと<ruby>申<rt>もう</rt></ruby>します。<ruby>大学<rt>だいがく</rt></ruby>では<ruby>情報工学<rt>じょうほうこうがく</rt></ruby>を<ruby>専攻<rt>せんこう</rt></ruby>していました。",
        translation:
          "Yes. Nice to meet you, my name is Kim. I majored in Information Engineering at university.",
        voiceSettings: { pitch: 1.1, rate: 0.95 },
      },
      {
        speaker: "Interviewer",
        avatar: "👨🏻‍💼",
        text: "プログラミングの経験はありますか。",
        displayHtml:
          "プログラミングの<ruby>経験<rt>けいけん</rt></ruby>はありますか。",
        translation: "Do you have programming experience?",
        voiceSettings: { pitch: 0.8, rate: 0.9 },
      },
      {
        speaker: "Applicant",
        avatar: "🧑🏻‍🎓",
        text: "はい、ウェブアプリの開発を２年間経験しました。",
        displayHtml:
          "はい、ウェブアプリの<ruby>開発<rt>かいはつ</rt></ruby>を２<ruby>年間経験<rt>ねんかんけいけん</rt></ruby>しました。",
        translation:
          "Yes, I have two years of experience in web app development.",
        voiceSettings: { pitch: 1.1, rate: 0.95 },
      },
    ],
    quiz: {
      question: "What did the applicant major in at university?",
      options: [
        "Business",
        "Information Engineering",
        "Foreign Languages",
        "Web Design",
      ],
      correctAnswerIndex: 1,
      explanation:
        'The applicant said "大学では情報工学を専攻していました" (I majored in Information Engineering).',
    },
  },
  {
    id: "n3-post-office",
    title: "郵便局で (At the Post Office)",
    level: "N3",
    tags: ["Daily Life", "Services"],
    scenario: "A person is sending a package to America at the post office.",
    dialogue: [
      {
        speaker: "Customer",
        avatar: "👩🏻",
        text: "すみません、この荷物をアメリカまで送りたいんですが。",
        displayHtml:
          "すみません、この<ruby>荷物<rt>にもつ</rt></ruby>をアメリカまで<ruby>送<rt>おく</rt></ruby>りたいんですが。",
        translation: "Excuse me, I would like to send this package to America.",
        voiceSettings: { pitch: 1.2, rate: 1.0 },
      },
      {
        speaker: "Clerk",
        avatar: "👨🏻‍💼",
        text: "はい。航空便と船便、どちらになさいますか。",
        displayHtml:
          "はい。<ruby>航空便<rt>こうくうびん</rt></ruby>と<ruby>船便<rt>ふなびん</rt></ruby>、どちらになさいますか。",
        translation: "Yes. Would you prefer airmail or surface mail (by ship)?",
        voiceSettings: { pitch: 0.9, rate: 0.95 },
      },
      {
        speaker: "Customer",
        avatar: "👩🏻",
        text: "航空便だと、どのくらい日数がかかりますか。",
        displayHtml:
          "<ruby>航空便<rt>こうくうびん</rt></ruby>だと、どのくらい<ruby>日数<rt>にっすう</rt></ruby>がかかりますか。",
        translation: "If it's airmail, how many days will it take?",
        voiceSettings: { pitch: 1.2, rate: 1.0 },
      },
      {
        speaker: "Clerk",
        avatar: "👨🏻‍💼",
        text: "だいたい１週間くらいですね。船便だと１ヶ月以上かかります。",
        displayHtml:
          "だいたい１<ruby>週間<rt>しゅうかん</rt></ruby>くらいですね。<ruby>船便<rt>ふなびん</rt></ruby>だと１ヶ<ruby>月以上<rt>げついじょう</rt></ruby>かかります。",
        translation: "About one week. By surface mail, it takes over a month.",
        voiceSettings: { pitch: 0.9, rate: 0.95 },
      },
      {
        speaker: "Customer",
        avatar: "👩🏻",
        text: "じゃあ、航空便でお願いします。",
        displayHtml:
          "じゃあ、<ruby>航空便<rt>こうくうびん</rt></ruby>でお<ruby>願<rt>ねが</rt></ruby>いします。",
        translation: "Then, airmail please.",
        voiceSettings: { pitch: 1.2, rate: 1.0 },
      },
    ],
    quiz: {
      question: "How long does surface mail (船便) take?",
      options: ["One week", "Two weeks", "About one month", "Over one month"],
      correctAnswerIndex: 3,
      explanation:
        'The clerk says "船便だと１ヶ月以上かかります" (By surface mail, it takes over a month).',
    },
  },
  {
    id: "n3-hotel-checkin",
    title: "ホテルにチェックインする (Checking in at a Hotel)",
    level: "N3",
    tags: ["Travel", "Hotel"],
    scenario: "A guest is checking in at a hotel reception.",
    dialogue: [
      {
        speaker: "Receptionist",
        avatar: "🤵🏻",
        text: "いらっしゃいませ。ご宿泊の予約はされておりますか。",
        displayHtml:
          "いらっしゃいませ。ご<ruby>宿泊<rt>しゅくはく</rt></ruby>の<ruby>予約<rt>よやく</rt></ruby>はされておりますか。",
        translation: "Welcome. Do you have a reservation for a stay?",
        voiceSettings: { pitch: 0.9, rate: 0.9 },
      },
      {
        speaker: "Guest",
        avatar: "👨🏻",
        text: "はい、インターネットで予約した山田です。",
        displayHtml:
          "はい、インターネットで<ruby>予約<rt>よやく</rt></ruby>した<ruby>山田<rt>やまだ</rt></ruby>です。",
        translation: "Yes, I am Yamada, I booked on the internet.",
        voiceSettings: { pitch: 1.0, rate: 0.95 },
      },
      {
        speaker: "Receptionist",
        avatar: "🤵🏻",
        text: "山田様ですね。確認いたします。…はい、シングルルームで２泊ですね。こちらの用紙にご記入をお願いします。",
        displayHtml:
          "<ruby>山田様<rt>やまださま</rt></ruby>ですね。<ruby>確認<rt>かくにん</rt></ruby>いたします。…はい、シングルルームで２<ruby>泊<rt>はく</rt></ruby>ですね。こちらの<ruby>用紙<rt>ようし</rt></ruby>にご<ruby>記入<rt>きにゅう</rt></ruby>をお<ruby>願<rt>ねが</rt></ruby>いします。",
        translation:
          "Mr. Yamada. Let me check. ...Yes, a single room for 2 nights. Please fill out this form.",
        voiceSettings: { pitch: 0.9, rate: 0.9 },
      },
    ],
    quiz: {
      question: "What kind of room did the guest book and for how long?",
      options: [
        "Double room, 1 night",
        "Single room, 1 night",
        "Single room, 2 nights",
        "Twin room, 2 nights",
      ],
      correctAnswerIndex: 2,
      explanation:
        'The receptionist confirms "シングルルームで２泊ですね" (A single room for 2 nights, right).',
    },
  },
  {
    id: "n2-business-sales",
    title: "売上の会議 (Sales Meeting)",
    level: "N2",
    tags: ["Business", "Meeting"],
    scenario:
      "Two business people are discussing the recent sales figures in a meeting.",
    dialogue: [
      {
        speaker: "Manager",
        avatar: "👨🏻‍💼",
        text: "今月の売上データを見たが、先月と比べてかなり落ち込んでいるね。原因は何だと思う？",
        displayHtml:
          "<ruby>今月<rt>こんげつ</rt></ruby>の<ruby>売上<rt>うりあげ</rt></ruby>データを<ruby>見<rt>み</rt></ruby>たが、<ruby>先月<rt>せんげつ</rt></ruby>と<ruby>比<rt>くら</rt></ruby>べてかなり<ruby>落<rt>お</rt></ruby>ち<ruby>込<rt>こ</rt></ruby>んでいるね。<ruby>原因<rt>げんいん</rt></ruby>は<ruby>何<rt>なに</rt></ruby>だと<ruby>思<rt>おも</rt></ruby>う？",
        translation:
          "I saw this month's sales data, and it has dropped significantly compared to last month. What do you think the cause is?",
        voiceSettings: { pitch: 0.7, rate: 0.95 },
      },
      {
        speaker: "Employee",
        avatar: "👩🏻‍💼",
        text: "はい。競合他社が新しいキャンペーンを始めた影響が大きいと考えられます。",
        displayHtml:
          "はい。<ruby>競合他社<rt>きょうごうたしゃ</rt></ruby>が<ruby>新<rt>あたら</rt></ruby>しいキャンペーンを<ruby>始<rt>はじ</rt></ruby>めた<ruby>影響<rt>えいきょう</rt></ruby>が<ruby>大<rt>おお</rt></ruby>きいと<ruby>考<rt>かんが</rt></ruby>えられます。",
        translation:
          "Yes. It is highly likely due to the impact of the new campaign started by our competitors.",
        voiceSettings: { pitch: 1.2, rate: 0.95 },
      },
      {
        speaker: "Manager",
        avatar: "👨🏻‍💼",
        text: "なるほど。至急、こちらも対抗策を練る必要があるな。明日の午前中までに提案書をまとめてくれないか。",
        displayHtml:
          "なるほど。<ruby>至急<rt>しきゅう</rt></ruby>、こちらも<ruby>対抗策<rt>たいこうさく</rt></ruby>を<ruby>練<rt>ね</rt></ruby>る<ruby>必要<rt>ひつよう</rt></ruby>があるな。<ruby>明日<rt>あした</rt></ruby>の<ruby>午前中<rt>ごぜんちゅう</rt></ruby>までに<ruby>提案書<rt>ていあんしょ</rt></ruby>をまとめてくれないか。",
        translation:
          "I see. We urgently need to work out a countermeasure. Could you put together a proposal by tomorrow morning?",
        voiceSettings: { pitch: 0.7, rate: 0.95 },
      },
    ],
    quiz: {
      question: "What is the most likely reason for the drop in sales?",
      options: [
        "The economy is bad",
        "A competitor started a new campaign",
        "Their product is defective",
        "Prices were raised",
      ],
      correctAnswerIndex: 1,
      explanation:
        'The employee states "競合他社が新しいキャンペーンを始めた影響" (the impact of competitors starting a new campaign).',
    },
  },
  {
    id: "n2-apologizing-late",
    title: "遅刻の謝罪 (Apologizing for being late)",
    level: "N2",
    tags: ["Business", "Apology"],
    scenario:
      "An employee calls their boss to apologize for being late due to a train delay.",
    dialogue: [
      {
        speaker: "Employee",
        avatar: "👦🏻",
        text: "課長、申し訳ありません。電車の事故で運転が見合わせになっており、出社が遅れそうです。",
        displayHtml:
          "<ruby>課長<rt>かちょう</rt></ruby>、<ruby>申<rt>もう</rt></ruby>し<ruby>訳<rt>わけ</rt></ruby>ありません。<ruby>電車<rt>でんしゃ</rt></ruby>の<ruby>事故<rt>じこ</rt></ruby>で<ruby>運転<rt>うんてん</rt></ruby>が<ruby>見合<rt>みあ</rt></ruby>わせになっており、<ruby>出社<rt>しゅっしゃ</rt></ruby>が<ruby>遅<rt>おく</rt></ruby>れそうです。",
        translation:
          "Section Chief, I am very sorry. Train operations are suspended due to an accident, and I will be late coming to the office.",
        voiceSettings: { pitch: 1.0, rate: 0.9 },
      },
      {
        speaker: "Boss",
        avatar: "🧔🏻‍♂️",
        text: "そうか。どれくらい遅れそう？",
        displayHtml: "そうか。どれくらい<ruby>遅<rt>おく</rt></ruby>れそう？",
        translation: "I see. How late will you be?",
        voiceSettings: { pitch: 0.8, rate: 0.95 },
      },
      {
        speaker: "Employee",
        avatar: "👦🏻",
        text: "復旧まであと30分ほどかかるそうです。午前10時には着けると思います。",
        displayHtml:
          "<ruby>復旧<rt>ふっきゅう</rt></ruby>まであと30<ruby>分<rt>ぷん</rt></ruby>ほどかかるそうです。<ruby>午前<rt>ごぜん</rt></ruby>10<ruby>時<rt>じ</rt></ruby>には<ruby>着<rt>つ</rt></ruby>けると<ruby>思<rt>おも</rt></ruby>います。",
        translation:
          "I heard it will take about 30 minutes to resume. I think I can arrive by 10 AM.",
        voiceSettings: { pitch: 1.0, rate: 0.9 },
      },
      {
        speaker: "Boss",
        avatar: "🧔🏻‍♂️",
        text: "分かった。気をつけて来なさい。",
        displayHtml:
          "<ruby>分<rt>わ</rt></ruby>かった。<ruby>気<rt>き</rt></ruby>をつけて<ruby>来<rt>き</rt></ruby>なさい。",
        translation: "Understood. Come safely.",
        voiceSettings: { pitch: 0.8, rate: 0.95 },
      },
    ],
    quiz: {
      question: "Why is the employee going to be late?",
      options: [
        "They overslept",
        "Traffic jam",
        "Train operations suspended due to an accident",
        "They are feeling sick",
      ],
      correctAnswerIndex: 2,
      explanation:
        'The employee explains "電車の事故で運転が見合わせになっており" (train operations suspended due to an accident).',
    },
  },
  {
    id: "n2-news-typhoon",
    title: "台風のニュース (Typhoon News)",
    level: "N2",
    tags: ["News", "Weather"],
    scenario: "A news anchor is reporting on an approaching typhoon.",
    dialogue: [
      {
        speaker: "Anchor",
        avatar: "📺",
        text: "大型で強い台風10号は、現在四国沖を北上しています。",
        displayHtml:
          "<ruby>大型<rt>おおがた</rt></ruby>で<ruby>強<rt>つよ</rt></ruby>い<ruby>台風<rt>たいふう</rt></ruby>10<ruby>号<rt>ごう</rt></ruby>は、<ruby>現在<rt>げんざい</rt></ruby><ruby>四国沖<rt>しこくおき</rt></ruby>を<ruby>北上<rt>ほくじょう</rt></ruby>しています。",
        translation:
          "Large and strong Typhoon No. 10 is currently moving north off the coast of Shikoku.",
        voiceSettings: { pitch: 1.0, rate: 0.95 },
      },
      {
        speaker: "Anchor",
        avatar: "📺",
        text: "今夜遅くから明日の明け方にかけて、西日本に上陸する恐れがあります。",
        displayHtml:
          "<ruby>今夜遅<rt>こんやおそ</rt></ruby>くから<ruby>明日<rt>あした</rt></ruby>の<ruby>明<rt>あ</rt></ruby>け<ruby>方<rt>がた</rt></ruby>にかけて、<ruby>西日本<rt>にしにほん</rt></ruby>に<ruby>上陸<rt>じょうりく</rt></ruby>する<ruby>恐<rt>おそ</rt></ruby>れがあります。",
        translation:
          "There is a fear it may make landfall in western Japan from late tonight through tomorrow at dawn.",
        voiceSettings: { pitch: 1.0, rate: 0.95 },
      },
      {
        speaker: "Anchor",
        avatar: "📺",
        text: "海岸や河川の近くには絶対に近づかないでください。",
        displayHtml:
          "<ruby>海岸<rt>かいがん</rt></ruby>や<ruby>河川<rt>かせん</rt></ruby>の<ruby>近<rt>ちか</rt></ruby>くには<ruby>絶対<rt>ぜったい</rt></ruby>に<ruby>近<rt>ちか</rt></ruby>づかないでください。",
        translation: "Please absolutely do not go near the coast or rivers.",
        voiceSettings: { pitch: 1.0, rate: 0.95 },
      },
    ],
    quiz: {
      question: "When is the typhoon expected to make landfall?",
      options: [
        "This afternoon",
        "Tomorrow night",
        "Late tonight through tomorrow dawn",
        "Next week",
      ],
      correctAnswerIndex: 2,
      explanation:
        'The anchor states "今夜遅くから明日の明け方にかけて...上陸する恐れがあります" (from late tonight through tomorrow dawn).',
    },
  },
  {
    id: "n1-academic-lecture",
    title: "歴史の講義 (History Lecture)",
    level: "N1",
    tags: ["Education", "History"],
    scenario: "A professor is giving a lecture on Japanese history.",
    dialogue: [
      {
        speaker: "Professor",
        avatar: "👨🏻‍🏫",
        text: "江戸時代の鎖国政策は、単に外国との交流を絶つだけのものではありませんでした。",
        displayHtml:
          "<ruby>江戸時代<rt>えどじだい</rt></ruby>の<ruby>鎖国政策<rt>さこくせいさく</rt></ruby>は、<ruby>単<rt>たん</rt></ruby>に<ruby>外国<rt>がいこく</rt></ruby>との<ruby>交流<rt>こうりゅう</rt></ruby>を<ruby>絶<rt>た</rt></ruby>つだけのものではありませんでした。",
        translation:
          "The national isolation policy of the Edo period was not merely about cutting off exchanges with foreign countries.",
        voiceSettings: { pitch: 0.8, rate: 0.9 },
      },
      {
        speaker: "Professor",
        avatar: "👨🏻‍🏫",
        text: "国内の政治的な安定を図ると同時に、幕府が貿易を独占し、富を統制するという意図があったのです。",
        displayHtml:
          "<ruby>国内<rt>こくない</rt></ruby>の<ruby>政治的<rt>せいじてき</rt></ruby>な<ruby>安定<rt>あんてい</rt></ruby>を<ruby>図<rt>はか</rt></ruby>ると<ruby>同時<rt>どうじ</rt></ruby>に、<ruby>幕府<rt>ばくふ</rt></ruby>が<ruby>貿易<rt>ぼうえき</rt></ruby>を<ruby>独占<rt>どくせん</rt></ruby>し、<ruby>富<rt>とみ</rt></ruby>を<ruby>統制<rt>とうせい</rt></ruby>するという<ruby>意図<rt>いと</rt></ruby>があったのです。",
        translation:
          "There was an intention to monopolize trade and control wealth by the Shogunate, while simultaneously aiming for domestic political stability.",
        voiceSettings: { pitch: 0.8, rate: 0.9 },
      },
    ],
    quiz: {
      question:
        "According to the professor, what was an intention of the national isolation policy?",
      options: [
        "To prepare for war with foreign countries",
        "To monopolize trade and control wealth by the Shogunate",
        "To encourage people to travel domestically",
        "To destroy foreign cultures completely",
      ],
      correctAnswerIndex: 1,
      explanation:
        'The professor says there was an intention that "幕府が貿易を独占し、富を統制する" (the Shogunate monopolizes trade and controls wealth).',
    },
  },
  {
    id: "n1-business-contract",
    title: "契約の交渉 (Contract Negotiation)",
    level: "N1",
    tags: ["Business", "Advanced"],
    scenario: "Two executives are negotiating the terms of a new contract.",
    dialogue: [
      {
        speaker: "Exec A",
        avatar: "🧔🏻‍♂️",
        text: "ご提示いただいた条件ですが、納期に関して少々厳しいと感じております。",
        displayHtml:
          "ご<ruby>提示<rt>ていじ</rt></ruby>いただいた<ruby>条件<rt>じょうけん</rt></ruby>ですが、<ruby>納期<rt>のうき</rt></ruby>に<ruby>関<rt>かん</rt></ruby>して<ruby>少々厳<rt>しょうしょうきび</rt></ruby>しいと<ruby>感<rt>かん</rt></ruby>じております。",
        translation:
          "Regarding the conditions you presented, we feel the delivery deadline is a bit strict.",
        voiceSettings: { pitch: 0.7, rate: 0.85 },
      },
      {
        speaker: "Exec B",
        avatar: "👨🏻‍💼",
        text: "なるほど。それでは、あと1週間延長するという形であれば、合意いただけますでしょうか。",
        displayHtml:
          "なるほど。それでは、あと1<ruby>週間延長<rt>しゅうかんえんちょう</rt></ruby>するという<ruby>形<rt>かたち</rt></ruby>であれば、<ruby>合意<rt>ごうい</rt></ruby>いただけますでしょうか。",
        translation:
          "I see. If we were to extend it by another week, would you be able to agree?",
        voiceSettings: { pitch: 0.9, rate: 0.85 },
      },
      {
        speaker: "Exec A",
        avatar: "🧔🏻‍♂️",
        text: "ええ、それでしたら弊社の生産ラインも対応可能です。前向きに検討させていただきます。",
        displayHtml:
          "ええ、それでしたら<ruby>弊社<rt>へいしゃ</rt></ruby>の<ruby>生産<rt>せいさん</rt></ruby>ラインも<ruby>対応可能<rt>たいおうかのう</rt></ruby>です。<ruby>前向<rt>まえむ</rt></ruby>きに<ruby>検討<rt>けんとう</rt></ruby>させていただきます。",
        translation:
          "Yes, if that is the case, our production line can accommodate it. We will consider it positively.",
        voiceSettings: { pitch: 0.7, rate: 0.85 },
      },
    ],
    quiz: {
      question: "What compromise did Exec B offer?",
      options: [
        "To lower the price",
        "To extend the deadline by one week",
        "To cancel the contract",
        "To increase the production volume",
      ],
      correctAnswerIndex: 1,
      explanation:
        'Exec B asked if they could agree if they "あと1週間延長する" (extend it by another week).',
    },
  },
  {
    id: "n1-political-debate",
    title: "政治討論会 (Political Debate)",
    level: "N1",
    tags: ["Politics", "Society"],
    scenario: "Politicians are debating economic policies on a TV program.",
    dialogue: [
      {
        speaker: "Politician A",
        avatar: "👨🏻‍🦳",
        text: "現在の格差社会を是正するためには、富裕層への課税を強化し、それを財源として社会保障を充実させるべきです。",
        displayHtml:
          "<ruby>現在<rt>げんざい</rt></ruby>の<ruby>格差社会<rt>かくさしゃかい</rt></ruby>を<ruby>是正<rt>ぜせい</rt></ruby>するためには、<ruby>富裕層<rt>ふゆうそう</rt></ruby>への<ruby>課税<rt>かぜい</rt></ruby>を<ruby>強化<rt>きょうか</rt></ruby>し、それを<ruby>財源<rt>ざいげん</rt></ruby>として<ruby>社会保障<rt>しゃかいほしょう</rt></ruby>を<ruby>充実<rt>じゅうじつ</rt></ruby>させるべきです。",
        translation:
          "To correct the current unequal society, we should strengthen taxation on the wealthy and use that as a financial resource to enhance social security.",
        voiceSettings: { pitch: 0.8, rate: 0.95 },
      },
      {
        speaker: "Politician B",
        avatar: "👩🏻‍💼",
        text: "ただ単に税率を上げるだけでは、企業の海外流出を招きかねません。まずは経済成長を促す規制緩和が必要です。",
        displayHtml:
          "ただ<ruby>単<rt>たん</rt></ruby>に<ruby>税率<rt>ぜいりつ</rt></ruby>を<ruby>上<rt>あ</rt></ruby>げるだけでは、<ruby>企業<rt>きぎょう</rt></ruby>の<ruby>海外流出<rt>かいがいりゅうしゅつ</rt></ruby>を<ruby>招<rt>まね</rt></ruby>きかねません。まずは<ruby>経済成長<rt>けいざいせいちょう</rt></ruby>を<ruby>促<rt>うなが</rt></ruby>す<ruby>規制緩和<rt>きせいかんわ</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>です。",
        translation:
          "Simply raising the tax rate could invite the exodus of companies overseas. First, deregulation to promote economic growth is necessary.",
        voiceSettings: { pitch: 1.2, rate: 0.95 },
      },
    ],
    quiz: {
      question: "What is Politician B's main argument?",
      options: [
        "Social security should be cut",
        "Taxes should be raised immediately",
        "Deregulation is needed for economic growth before raising taxes",
        "The wealthy should pay more",
      ],
      correctAnswerIndex: 2,
      explanation:
        'Politician B argues against simply raising taxes, stating "まずは経済成長を促す規制緩和が必要です" (first, deregulation to promote economic growth is necessary).',
    },
  },
  {
    id: "n5-hobbies",
    title: "休日の過ごし方 (How to spend days off)",
    level: "N5",
    tags: ["Hobbies", "Daily Life"],
    scenario:
      "Two friends are talking about what they usually do on their days off.",
    dialogue: [
      {
        speaker: "Aki",
        avatar: "👧🏻",
        text: "休みの日は何をしていますか。",
        displayHtml:
          "<ruby>休<rt>やす</rt></ruby>みの<ruby>日<rt>ひ</rt></ruby>は<ruby>何<rt>なに</rt></ruby>をしていますか。",
        translation: "What do you do on your days off?",
        voiceSettings: { pitch: 1.3, rate: 1.0 },
      },
      {
        speaker: "Ken",
        avatar: "👦🏻",
        text: "私はよく本を読みます。Akiさんは？",
        displayHtml:
          "<ruby>私<rt>わたし</rt></ruby>はよく<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。Akiさんは？",
        translation: "I often read books. How about you, Aki?",
        voiceSettings: { pitch: 1.0, rate: 1.0 },
      },
      {
        speaker: "Aki",
        avatar: "👧🏻",
        text: "私はスポーツが好きです。テニスをします。",
        displayHtml:
          "<ruby>私<rt>わたし</rt></ruby>はスポーツが<ruby>好<rt>す</rt></ruby>きです。テニスをします。",
        translation: "I like sports. I play tennis.",
        voiceSettings: { pitch: 1.3, rate: 1.0 },
      },
    ],
    quiz: {
      question: "What does Ken usually do on his days off?",
      options: ["Plays tennis", "Reads books", "Watches movies", "Sleeps"],
      correctAnswerIndex: 1,
      explanation: 'Ken said "私はよく本を読みます" (I often read books).',
    },
  },
  {
    id: "n4-directions-bank",
    title: "銀行はどこ？ (Where is the bank?)",
    level: "N4",
    tags: ["Directions", "Town"],
    scenario: "Someone is asking a police officer for directions to a bank.",
    dialogue: [
      {
        speaker: "Passerby",
        avatar: "👨🏻",
        text: "すみません。この近くに銀行はありますか。",
        displayHtml:
          "すみません。この<ruby>近<rt>ちか</rt></ruby>くに<ruby>銀行<rt>ぎんこう</rt></ruby>はありますか。",
        translation: "Excuse me. Is there a bank near here?",
        voiceSettings: { pitch: 1.0, rate: 1.0 },
      },
      {
        speaker: "Police",
        avatar: "👮🏻‍♂️",
        text: "ええ、ありますよ。この道をまっすぐ行って、二つ目の角を右に曲がってください。",
        displayHtml:
          "ええ、ありますよ。この<ruby>道<rt>みち</rt></ruby>をまっすぐ<ruby>行<rt>い</rt></ruby>って、<ruby>二<rt>ふた</rt></ruby>つ<ruby>目<rt>め</rt></ruby>の<ruby>角<rt>かど</rt></ruby>を<ruby>右<rt>みぎ</rt></ruby>に<ruby>曲<rt>ま</rt></ruby>がってください。",
        translation:
          "Yes, there is. Go straight down this street, and turn right at the second corner.",
        voiceSettings: { pitch: 0.9, rate: 0.95 },
      },
      {
        speaker: "Passerby",
        avatar: "👨🏻",
        text: "二つ目の角を右ですね。ありがとうございます。",
        displayHtml:
          "<ruby>二<rt>ふた</rt></ruby>つ<ruby>目<rt>め</rt></ruby>の<ruby>角<rt>かど</rt></ruby>を<ruby>右<rt>みぎ</rt></ruby>ですね。ありがとうございます。",
        translation: "Right at the second corner. Thank you very much.",
        voiceSettings: { pitch: 1.0, rate: 1.0 },
      },
    ],
    quiz: {
      question: "How do you get to the bank?",
      options: [
        "Turn left at the first corner",
        "Go straight and it's on the left",
        "Turn right at the second corner",
        "Turn right at the first corner",
      ],
      correctAnswerIndex: 2,
      explanation:
        'The police officer instructed: "二つ目の角を右に曲がってください" (Turn right at the second corner).',
    },
  },
  {
    id: "n3-gift-advice",
    title: "プレゼントの相談 (Advice on a Gift)",
    level: "N3",
    tags: ["Friends", "Advice"],
    scenario:
      "A person asks their friend for advice on what to buy for a birthday present.",
    dialogue: [
      {
        speaker: "Yuki",
        avatar: "👱🏻‍♀️",
        text: "来週、母の誕生日なんだけど、何をプレゼントしたらいいと思う？",
        displayHtml:
          "<ruby>来週<rt>らいしゅう</rt></ruby>、<ruby>母<rt>はは</rt></ruby>の<ruby>誕生日<rt>たんじょうび</rt></ruby>なんだけど、<ruby>何<rt>なに</rt></ruby>をプレゼントしたらいいと<ruby>思<rt>おも</rt></ruby>う？",
        translation:
          "Next week is my mother's birthday, what do you think I should give her?",
        voiceSettings: { pitch: 1.3, rate: 1.0 },
      },
      {
        speaker: "Taro",
        avatar: "👦🏻",
        text: "お母さん、お花が好きだったよね。綺麗な花束はどう？",
        displayHtml:
          "お<ruby>母<rt>かあ</rt></ruby>さん、お<ruby>花<rt>はな</rt></ruby>が<ruby>好<rt>す</rt></ruby>きだったよね。<ruby>綺麗<rt>きれい</rt></ruby>な<ruby>花束<rt>はなたば</rt></ruby>はどう？",
        translation:
          "Your mother liked flowers, right? How about a beautiful bouquet?",
        voiceSettings: { pitch: 1.0, rate: 1.0 },
      },
      {
        speaker: "Yuki",
        avatar: "👱🏻‍♀️",
        text: "うーん、去年も花をあげたから、今年は別のものにしたいな。",
        displayHtml:
          "うーん、<ruby>去年<rt>きょねん</rt></ruby>も<ruby>花<rt>はな</rt></ruby>をあげたから、<ruby>今年<rt>ことし</rt></ruby>は<ruby>別<rt>べつ</rt></ruby>のものにしたいな。",
        translation:
          "Hmm, I gave her flowers last year too, so I want to do something else this year.",
        voiceSettings: { pitch: 1.3, rate: 1.0 },
      },
      {
        speaker: "Taro",
        avatar: "👦🏻",
        text: "じゃあ、一緒に美味しいレストランで食事をするのは？",
        displayHtml:
          "じゃあ、<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>美味<rt>おい</rt></ruby>しいレストランで<ruby>食事<rt>しょくじ</rt></ruby>をするのは？",
        translation:
          "Then, how about having a meal together at a delicious restaurant?",
        voiceSettings: { pitch: 1.0, rate: 1.0 },
      },
      {
        speaker: "Yuki",
        avatar: "👱🏻‍♀️",
        text: "それ、すごくいい！そうするよ。",
        displayHtml: "それ、すごくいい！そうするよ。",
        translation: "That's really good! I'll do that.",
        voiceSettings: { pitch: 1.3, rate: 1.0 },
      },
    ],
    quiz: {
      question: "What did Yuki decide to do for her mother's birthday?",
      options: [
        "Buy her a bouquet of flowers",
        "Give her some money",
        "Eat at a delicious restaurant together",
        "Cook a meal at home",
      ],
      correctAnswerIndex: 2,
      explanation:
        'Taro suggested "一緒に美味しいレストランで食事をするのは？" and Yuki agreed with "それ、すごくいい！そうするよ。"',
    },
  },
];
