import { Lesson, Question } from "./types";

interface BasicUnitData {
  unitId: string;
  unitTitle: string;
  unitDescription: string;
  unitColor: string;
  items: { char: string; romaji: string }[];
  words: { jpn: string; rom; eng: string }[];
  sentences?: { eng: string; opt: string[]; ans: string }[];
}

const basicUnits: BasicUnitData[] = [
  {
    unitId: "basic-u1",
    unitTitle: "Unit 1: Hiragana - Vowels & K-Row 🎌",
    unitDescription: "Learn vowels (あいうえお) and K-row (かきくけこ).",
    unitColor: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    items: [
      { char: "あ", romaji: "a" },
      { char: "い", romaji: "i" },
      { char: "う", romaji: "u" },
      { char: "え", romaji: "e" },
      { char: "お", romaji: "o" },
      { char: "か", romaji: "ka" },
      { char: "き", romaji: "ki" },
      { char: "く", romaji: "ku" },
      { char: "け", romaji: "ke" },
      { char: "こ", romaji: "ko" },
    ],
    words: [
      { jpn: "あい", rom: "ai", eng: "love" },
      { jpn: "うえ", rom: "ue", eng: "up" },
      { jpn: "あおい", rom: "aoi", eng: "blue" },
      { jpn: "かく", rom: "kaku", eng: "write" },
      { jpn: "いけ", rom: "ike", eng: "pond" },
      { jpn: "かお", rom: "kao", eng: "face" },
      { jpn: "あか", rom: "aka", eng: "red" },
      { jpn: "えき", rom: "eki", eng: "station" },
    ],
  },
  {
    unitId: "basic-u2",
    unitTitle: "Unit 2: Hiragana - S & T-Row 🎌",
    unitDescription: "Learn S-row (さしすせそ) and T-row (たちつてと).",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    items: [
      { char: "さ", romaji: "sa" },
      { char: "し", romaji: "shi" },
      { char: "す", romaji: "su" },
      { char: "せ", romaji: "se" },
      { char: "そ", romaji: "so" },
      { char: "た", romaji: "ta" },
      { char: "ち", romaji: "chi" },
      { char: "つ", romaji: "tsu" },
      { char: "て", romaji: "te" },
      { char: "と", romaji: "to" },
    ],
    words: [
      { jpn: "すし", rom: "sushi", eng: "sushi" },
      { jpn: "さか", rom: "saka", eng: "slope" },
      { jpn: "うそ", rom: "uso", eng: "lie" },
      { jpn: "て", rom: "te", eng: "hand" },
      { jpn: "とち", rom: "tochi", eng: "land" },
      { jpn: "たつ", rom: "tatsu", eng: "stand" },
      { jpn: "あした", rom: "ashita", eng: "tomorrow" },
      { jpn: "うち", rom: "uchi", eng: "home" },
      { jpn: "そと", rom: "soto", eng: "outside" },
    ],
  },
  {
    unitId: "basic-u3",
    unitTitle: "Unit 3: Hiragana - N, H & M-Row 🎌",
    unitDescription: "Learn N-row (なにぬねの), H-row (はひふへほ), and M-row (まみむめも).",
    unitColor: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    items: [
      { char: "な", romaji: "na" },
      { char: "に", romaji: "ni" },
      { char: "ぬ", romaji: "nu" },
      { char: "ね", romaji: "ne" },
      { char: "の", romaji: "no" },
      { char: "は", romaji: "ha" },
      { char: "ひ", romaji: "hi" },
      { char: "ふ", romaji: "fu" },
      { char: "へ", romaji: "he" },
      { char: "ほ", romaji: "ho" },
      { char: "ま", romaji: "ma" },
      { char: "み", romaji: "mi" },
      { char: "む", romaji: "mu" },
      { char: "め", romaji: "me" },
      { char: "も", romaji: "mo" },
    ],
    words: [
      { jpn: "いぬ", rom: "inu", eng: "dog" },
      { jpn: "ねこ", rom: "neco", eng: "cat" },
      { jpn: "はな", rom: "hana", eng: "flower" },
      { jpn: "ひと", rom: "hito", eng: "person" },
      { jpn: "ふね", rom: "fune", eng: "ship" },
      { jpn: "まち", rom: "machi", eng: "town" },
      { jpn: "みみ", rom: "mimi", eng: "ear" },
      { jpn: "め", rom: "me", eng: "eye" },
      { jpn: "もも", rom: "momo", eng: "peach" },
    ],
  },
  {
    unitId: "basic-u4",
    unitTitle: "Unit 4: Hiragana - Y, R, W & N 🎌",
    unitDescription: "Learn Y-row (やゆよ), R-row (らりるれろ), W-row (わを), and N (ん).",
    unitColor: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
    items: [
      { char: "や", romaji: "ya" },
      { char: "ゆ", romaji: "yu" },
      { char: "よ", romaji: "yo" },
      { char: "ら", romaji: "ra" },
      { char: "り", romaji: "ri" },
      { char: "る", romaji: "ru" },
      { char: "れ", romaji: "re" },
      { char: "ろ", romaji: "ro" },
      { char: "わ", romaji: "wa" },
      { char: "を", romaji: "wo" },
      { char: "ん", romaji: "n" },
    ],
    words: [
      { jpn: "やま", rom: "yama", eng: "mountain" },
      { jpn: "ゆき", rom: "yuki", eng: "snow" },
      { jpn: "よる", rom: "yoru", eng: "night" },
      { jpn: "さくら", rom: "sakura", eng: "cherry blossom" },
      { jpn: "はる", rom: "haru", eng: "spring" },
      { jpn: "ふゆ", rom: "fuyu", eng: "winter" },
      { jpn: "にほん", rom: "nihon", eng: "Japan" },
      { jpn: "わたし", rom: "watashi", eng: "I / me" },
      { jpn: "ほん", rom: "hon", eng: "book" },
    ],
  },
  {
    unitId: "basic-u5",
    unitTitle: "Unit 5: Hiragana - Dakuon & Yoon 🎌",
    unitDescription: "Master modified sounds (が、ざ、だ、ば、ぱ) and combinations (きゃ、しゃ).",
    unitColor: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    items: [
      { char: "が", romaji: "ga" },
      { char: "ぎ", romaji: "gi" },
      { char: "ぐ", romaji: "gu" },
      { char: "げ", romaji: "ge" },
      { char: "ご", romaji: "go" },
      { char: "ざ", romaji: "za" },
      { char: "じ", romaji: "ji" },
      { char: "ず", romaji: "zu" },
      { char: "ぜ", romaji: "ze" },
      { char: "ぞ", romaji: "zo" },
      { char: "だ", romaji: "da" },
      { char: "ぢ", romaji: "dji" },
      { char: "づ", romaji: "dzu" },
      { char: "で", romaji: "de" },
      { char: "ど", romaji: "do" },
      { char: "ば", romaji: "ba" },
      { char: "び", romaji: "bi" },
      { char: "ぶ", romaji: "bu" },
      { char: "べ", romaji: "be" },
      { char: "ぼ", romaji: "bo" },
      { char: "ぱ", romaji: "pa" },
      { char: "ぴ", romaji: "pi" },
      { char: "ぷ", romaji: "pu" },
      { char: "ぺ", romaji: "pe" },
      { char: "ぽ", romaji: "po" },
    ],
    words: [
      { jpn: "おちゃ", rom: "ocha", eng: "green tea" },
      { jpn: "でんわ", rom: "denwa", eng: "telephone" },
      { jpn: "かぜ", rom: "kaze", eng: "wind" },
      { jpn: "みず", rom: "mizu", eng: "water" },
      { jpn: "ひゃく", rom: "hyaku", eng: "hundred" },
      { jpn: "がっこう", rom: "gakkou", eng: "school" },
      { jpn: "てんき", rom: "tenki", eng: "weather" },
      { jpn: "かぞく", rom: "kazoku", eng: "family" },
    ],
  },
  {
    unitId: "basic-u6",
    unitTitle: "Unit 6: Katakana - Vowels, K & S-Row 🎌",
    unitDescription: "Learn Katakana vowels (アイウエオ), K-row (カキクケコ), and S-row (サシスセソ).",
    unitColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    items: [
      { char: "ア", romaji: "a" },
      { char: "イ", romaji: "i" },
      { char: "ウ", romaji: "u" },
      { char: "エ", romaji: "e" },
      { char: "オ", romaji: "o" },
      { char: "カ", romaji: "ka" },
      { char: "キ", romaji: "ki" },
      { char: "ク", romaji: "ku" },
      { char: "ケ", romaji: "ke" },
      { char: "コ", romaji: "ko" },
      { char: "サ", romaji: "sa" },
      { char: "シ", romaji: "shi" },
      { char: "ス", romaji: "su" },
      { char: "セ", romaji: "se" },
      { char: "ソ", romaji: "so" },
    ],
    words: [
      { jpn: "アイス", rom: "aisu", eng: "ice" },
      { jpn: "カメラ", rom: "kamera", eng: "camera" },
      { jpn: "ケーキ", rom: "keeki", eng: "cake" },
      { jpn: "ガス", rom: "gasu", eng: "gas" },
      { jpn: "ココア", rom: "kokoa", eng: "cocoa" },
      { jpn: "スキー", rom: "sukii", eng: "ski" },
      { jpn: "ソース", rom: "soosu", eng: "sauce" },
    ],
  },
  {
    unitId: "basic-u7",
    unitTitle: "Unit 7: Katakana - T, N, H & M-Row 🎌",
    unitDescription: "Learn Katakana T-row (タチツテト), N-row (ナニヌネノ), H-row (ハヒフヘホ), and M-row (マミムメモ).",
    unitColor: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    items: [
      { char: "タ", romaji: "ta" },
      { char: "チ", romaji: "chi" },
      { char: "ツ", romaji: "tsu" },
      { char: "テ", romaji: "te" },
      { char: "ト", romaji: "to" },
      { char: "ナ", romaji: "na" },
      { char: "ニ", romaji: "ni" },
      { char: "ヌ", romaji: "nu" },
      { char: "ネ", romaji: "ne" },
      { char: "ノ", romaji: "no" },
      { char: "ハ", romaji: "ha" },
      { char: "ヒ", romaji: "hi" },
      { char: "フ", romaji: "fu" },
      { char: "ヘ", romaji: "he" },
      { char: "ホ", romaji: "ho" },
      { char: "マ", romaji: "ma" },
      { char: "ミ", romaji: "mi" },
      { char: "ム", romaji: "mu" },
      { char: "メ", romaji: "me" },
      { char: "モ", romaji: "mo" },
    ],
    words: [
      { jpn: "タクシー", rom: "takushii", eng: "taxi" },
      { jpn: "ノート", rom: "nooto", eng: "notebook" },
      { jpn: "ハム", rom: "hamu", eng: "ham" },
      { jpn: "マイク", rom: "maiku", eng: "microphone" },
      { jpn: "ミルク", rom: "miruku", eng: "milk" },
      { jpn: "メロン", rom: "meron", eng: "melon" },
      { jpn: "トマト", rom: "tomato", eng: "tomato" },
      { jpn: "ホテル", rom: "hoteru", eng: "hotel" },
    ],
  },
  {
    unitId: "basic-u8",
    unitTitle: "Unit 8: Katakana - Y, R, W, N & Dakuon 🎌",
    unitDescription: "Learn Katakana Y-row (ヤユヨ), R-row (ラリルレロ), W-row (ワヲ), N (ン) and Dakuon/Yoon combinations.",
    unitColor: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
    items: [
      { char: "ヤ", romaji: "ya" },
      { char: "ユ", romaji: "yu" },
      { char: "ヨ", romaji: "yo" },
      { char: "ラ", romaji: "ra" },
      { char: "リ", romaji: "ri" },
      { char: "ル", romaji: "ru" },
      { char: "レ", romaji: "re" },
      { char: "ロ", romaji: "ro" },
      { char: "ワ", romaji: "wa" },
      { char: "ヲ", romaji: "wo" },
      { char: "ン", romaji: "n" },
    ],
    words: [
      { jpn: "ラジオ", rom: "rajio", eng: "radio" },
      { jpn: "テレビ", rom: "terebi", eng: "TV" },
      { jpn: "トイレ", rom: "toire", eng: "toilet" },
      { jpn: "パン", rom: "pan", eng: "bread" },
      { jpn: "ニュース", rom: "nyuusu", eng: "news" },
      { jpn: "アメリカ", rom: "amerika", eng: "America" },
      { jpn: "パソコン", rom: "pasokon", eng: "PC" },
    ],
  },
  {
    unitId: "basic-u9",
    unitTitle: "Unit 9: Everyday Words & Greetings 🗣️",
    unitDescription: "Practice common phrases and greetings in standard Japanese conversation.",
    unitColor: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)",
    items: [],
    words: [
      { jpn: "こんにちは", rom: "konnichiwa", eng: "hello" },
      { jpn: "ありがとう", rom: "arigatou", eng: "thank you" },
      { jpn: "さようなら", rom: "sayounara", eng: "goodbye" },
      { jpn: "すみません", rom: "sumimasen", eng: "excuse me" },
      { jpn: "はい", rom: "hai", eng: "yes" },
      { jpn: "いいえ", rom: "iie", eng: "no" },
      { jpn: "はじめまして", rom: "hajimemashite", eng: "nice to meet you" },
      { jpn: "おはよう", rom: "ohayou", eng: "good morning" },
    ],
  },
  {
    unitId: "basic-u10",
    unitTitle: "Unit 10: First Sentences & Particles 📝",
    unitDescription: "Build your very first basic sentences using particles like は, を, の and copula です.",
    unitColor: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    items: [],
    words: [],
    sentences: [
      {
        eng: "This is a pen.",
        opt: ["これ", "は", "ペン", "です", "それ", "を"],
        ans: "これ は ペン です",
      },
      {
        eng: "I eat sushi.",
        opt: ["すし", "を", "たべます", "おちゃ", "は"],
        ans: "すし を たべます",
      },
      {
        eng: "I drink green tea.",
        opt: ["おちゃ", "を", "のみます", "すし", "です"],
        ans: "おちゃ を のみます",
      },
      {
        eng: "This is my book.",
        opt: ["これ", "は", "わたし", "の", "ほん", "です", "それ"],
        ans: "これ は わたし の ほん です",
      },
      {
        eng: "Japanese language is fun.",
        opt: ["にほんご", "は", "たのしい", "です", "あつい", "が"],
        ans: "にほんご は たのしい です",
      },
      {
        eng: "Excuse me, where is the station?",
        opt: ["すみません", "えき", "は", "どこ", "です", "か", "これ"],
        ans: "すみません えき は どこ です か",
      },
      {
        eng: "Thank you very much.",
        opt: ["どうも", "ありがとう", "ございます", "すみません", "です"],
        ans: "どうも ありがとう ございます",
      },
    ],
  },
];

// Programmatic Generator to create 10-18 lessons per unit, and 5-13 questions per lesson
function getDeterministicRandom(seed: string, min: number, max: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const rng = Math.abs(Math.sin(hash));
  return Math.floor(rng * (max - min + 1)) + min;
}

function generateBasicLessons(): Lesson[] {
  const result: Lesson[] = [];

  basicUnits.forEach((unit) => {
    // Generate between 10 to 18 lessons per unit
    const numLessons = getDeterministicRandom(unit.unitId, 10, 18);

    for (let lIdx = 1; lIdx <= numLessons; lIdx++) {
      const lessonId = `${unit.unitId}-l${lIdx}`;
      
      // Determine lesson type/badge
      const badgeTypes = ["Writing Practice", "Character Quiz", "Vocabulary", "Duolingo Builder", "Listening"];
      const badge = badgeTypes[(lIdx - 1) % badgeTypes.length];
      
      let icon = "✍️";
      if (badge === "Character Quiz") icon = "❓";
      else if (badge === "Vocabulary") icon = "📚";
      else if (badge === "Duolingo Builder") icon = "🧩";
      else if (badge === "Listening") icon = "🎧";

      const title = `Lesson ${lIdx}: ${badge}`;
      const description = `Master the basics of Japanese characters and sentence construction.`;

      // Generate 5 to 13 questions per lesson
      const numQuestions = getDeterministicRandom(lessonId, 5, 13);
      const questions: Question[] = [];

      for (let qIdx = 1; qIdx <= numQuestions; qIdx++) {
        const qId = `${lessonId}-q${qIdx}`;
        
        let qHash = 0;
        for (let i = 0; i < qId.length; i++) {
          qHash = qId.charCodeAt(i) + ((qHash << 5) - qHash);
        }
        const rng = (offset: number) => Math.abs(Math.sin(qHash + offset));

        // Let's decide question type
        // Sentence building (Duolingo style) gets priority in Duolingo Builder badge, or when unit is u10
        if (badge === "Duolingo Builder" || unit.unitId === "basic-u10" || (unit.sentences && rng(1) > 0.6)) {
          const sentencesPool = unit.sentences || [
            { eng: "This is blue.", opt: ["これ", "は", "あおい", "です", "赤"], ans: "これ は あおい です" },
            { eng: "A red flower.", opt: ["あかい", "はな", "です", "それ", "の"], ans: "あかい はな です" },
            { eng: "I go to school.", opt: ["がっこう", "に", "いきます", "わたし", "は", "を"], ans: "がっこう に いきます" }
          ];
          const item = sentencesPool[Math.floor(rng(2) * sentencesPool.length)];
          questions.push({
            id: qId,
            type: "sentence-builder",
            questionText: `Arrange the sentence: "${item.eng}"`,
            options: [...item.opt].sort(() => rng(3) - 0.5),
            answer: item.ans,
            hint: `Translate to Japanese: ${item.eng}`,
          });
        } else if (badge === "Listening" && unit.items.length > 0) {
          const item = unit.items[Math.floor(rng(4) * unit.items.length)];
          const correct = item.char;
          const distractors = unit.items.filter(i => i.char !== correct).map(i => i.char);
          const opts = [correct, ...distractors.slice(0, 3)].sort();
          questions.push({
            id: qId,
            type: "listening",
            questionText: "Listen to the pronunciation and select the correct character:",
            audioText: correct,
            options: opts,
            answer: correct,
            hint: `You are looking for "${item.romaji}".`,
          });
        } else if (badge === "Vocabulary" && unit.words.length > 0) {
          const item = unit.words[Math.floor(rng(5) * unit.words.length)];
          if (rng(6) > 0.5) {
            questions.push({
              id: qId,
              type: "multiple-choice",
              questionText: `What is the meaning of "${item.jpn}" (${item.rom})?`,
              options: [item.eng, ...unit.words.filter(w => w.eng !== item.eng).map(w => w.eng).slice(0, 3)].sort(),
              answer: item.eng,
              hint: `Romaji: ${item.rom}`,
            });
          } else {
            questions.push({
              id: qId,
              type: "typing",
              questionText: `Type the English translation for "${item.jpn}":`,
              options: [],
              answer: item.eng.toLowerCase(),
              hint: `Starts with "${item.eng[0]}".`,
            });
          }
        } else {
          // Character drills (writing/quiz)
          if (unit.items.length > 0) {
            const item = unit.items[Math.floor(rng(7) * unit.items.length)];
            if (rng(8) > 0.5) {
              questions.push({
                id: qId,
                type: "multiple-choice",
                questionText: `What is the Romaji reading of the character "${item.char}"?`,
                options: [item.romaji, ...unit.items.filter(i => i.romaji !== item.romaji).map(i => i.romaji).slice(0, 3)].sort(),
                answer: item.romaji,
                hint: `It sounds like "${item.romaji}".`,
              });
            } else {
              questions.push({
                id: qId,
                type: "fill-in-the-blank",
                questionText: `Complete the word for "${item.char}" in Romaji: 「${item.romaji[0]}___」`,
                options: [item.romaji, ...unit.items.filter(i => i.romaji !== item.romaji).map(i => i.romaji).slice(0, 3)].sort(),
                answer: item.romaji,
                hint: `Character: ${item.char}`,
              });
            }
          } else {
            // Fallback basic questions
            questions.push({
              id: qId,
              type: "multiple-choice",
              questionText: "What does 'Konnichiwa' mean?",
              options: ["Hello", "Goodbye", "Thank you", "Sorry"],
              answer: "Hello",
              hint: "Standard Japanese greeting.",
            });
          }
        }
      }

      result.push({
        id: lessonId,
        level: "Basic",
        unitId: unit.unitId,
        unitTitle: unit.unitTitle,
        unitDescription: unit.unitDescription,
        unitColor: unit.unitColor,
        title,
        description,
        expReward: 15,
        icon,
        badge,
        questions,
      });
    }
  });

  return result;
}

export const basicLessons: Lesson[] = generateBasicLessons();
