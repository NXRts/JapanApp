import { Lesson, Question } from "./types";

interface BasicUnitData {
  unitId: string;
  unitTitle: string;
  unitDescription: string;
  unitColor: string;
  items: { char: string; romaji: string; mnemonic: string }[];
  words: { jpn: string; rom: string; eng: string }[];
  sentences?: { eng: string; opt: string[]; ans: string }[];
}

const basicUnits: BasicUnitData[] = [
  {
    unitId: "basic-u1",
    unitTitle: "Unit 1: Hiragana - Vowels & K-Row (A-U-I-E-O) 🎌",
    unitDescription: "Learn vowels (あうえいお) and K-row (かうきけこ).",
    unitColor: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    items: [
      // Vowels (a-u-i-e-o order)
      { char: "あ", romaji: "a", mnemonic: "looks like an Apple with a stem" },
      { char: "う", romaji: "u", mnemonic: "looks like a person bending over (oo!)" },
      { char: "い", romaji: "i", mnemonic: "looks like two Eels swimming side by side" },
      { char: "え", romaji: "e", mnemonic: "looks like an Exotic runner crossing the line" },
      { char: "お", romaji: "o", mnemonic: "looks like a golfer hitting a ball onto a green (oh!)" },
      // K-Row (ka-ku-ki-ke-ko order)
      { char: "か", romaji: "ka", mnemonic: "looks like a person jumping up and down (ka-pow!)" },
      { char: "く", romaji: "ku", mnemonic: "looks like a bird's open beak (ku-ku!)" },
      { char: "き", romaji: "ki", mnemonic: "looks like a key to unlock a door" },
      { char: "け", romaji: "ke", mnemonic: "looks like a keg of drink" },
      { char: "こ", romaji: "ko", mnemonic: "looks like two cozy worms cuddling" },
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
    unitTitle: "Unit 2: Hiragana - S & T-Row (A-U-I-E-O) 🎌",
    unitDescription: "Learn S-row (さすしせそ) and T-row (たつちてと).",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    items: [
      // S-Row (sa-su-shi-se-so order)
      { char: "さ", romaji: "sa", mnemonic: "looks like a smiling face (say cheese!)" },
      { char: "す", romaji: "su", mnemonic: "looks like a swing at a playground" },
      { char: "し", romaji: "shi", mnemonic: "looks like a fishing shish-kebab hook" },
      { char: "せ", romaji: "se", mnemonic: "looks like a set of teeth" },
      { char: "そ", romaji: "so", mnemonic: "looks like a sewing pattern" },
      // T-Row (ta-tsu-chi-te-to order)
      { char: "た", romaji: "ta", mnemonic: "looks like the letters 't' and 'a'" },
      { char: "つ", romaji: "tsu", mnemonic: "looks like a giant tsunami wave" },
      { char: "ち", romaji: "chi", mnemonic: "looks like a cheerleader doing a split" },
      { char: "て", romaji: "te", mnemonic: "looks like a telephone line pole" },
      { char: "と", romaji: "to", mnemonic: "looks like a toe with a splinter in it" },
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
    unitDescription: "Learn N-row (なぬにねの), H-row (はふひへほ), and M-row (まむみめも).",
    unitColor: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    items: [
      // N-Row (na-nu-ni-ne-no order)
      { char: "な", romaji: "na", mnemonic: "looks like a nun praying" },
      { char: "ぬ", romaji: "nu", mnemonic: "looks like noodles eaten with chopsticks" },
      { char: "に", romaji: "ni", mnemonic: "looks like two needles side by side" },
      { char: "ね", romaji: "ne", mnemonic: "looks like a net for catching cats" },
      { char: "の", romaji: "no", mnemonic: "looks like a no-entry sign" },
      // H-Row (ha-fu-hi-he-ho order)
      { char: "は", romaji: "ha", mnemonic: "looks like a hockey stick and a puck" },
      { char: "ふ", romaji: "fu", mnemonic: "looks like Mount Fuji" },
      { char: "ひ", romaji: "hi", mnemonic: "looks like a laughing mouth (hee-hee!)" },
      { char: "へ", romaji: "he", mnemonic: "looks like a hill climb" },
      { char: "ほ", romaji: "ho", mnemonic: "looks like a hot stove with steam" },
      // M-Row (ma-mu-mi-me-mo order)
      { char: "ま", romaji: "ma", mnemonic: "looks like a mast of a ship" },
      { char: "む", romaji: "mu", mnemonic: "looks like a cow saying moo" },
      { char: "み", romaji: "mi", mnemonic: "looks like a musical note" },
      { char: "め", romaji: "me", mnemonic: "looks like a messy plate" },
      { char: "も", romaji: "mo", mnemonic: "looks like a fish hook catching more fish" },
    ],
    words: [
      { jpn: "いぬ", rom: "inu", eng: "dog" },
      { jpn: "ねこ", rom: "neko", eng: "cat" },
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
    unitDescription: "Learn Y-row (やゆよ), R-row (らるりれろ), W-row (わを), and N (ん).",
    unitColor: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
    items: [
      { char: "や", romaji: "ya", mnemonic: "looks like a yak walking" },
      { char: "ゆ", romaji: "yu", mnemonic: "looks like a fish swimming forward" },
      { char: "よ", romaji: "yo", mnemonic: "looks like a yo-yo on a string" },
      { char: "ら", romaji: "ra", mnemonic: "looks like a rabbit looking back" },
      { char: "る", romaji: "ru", mnemonic: "looks like a road with a loop at the end" },
      { char: "り", romaji: "ri", mnemonic: "looks like ribbons hanging" },
      { char: "れ", romaji: "re", mnemonic: "looks like a person resting near a tree" },
      { char: "ろ", romaji: "ro", mnemonic: "looks like a road without a loop" },
      { char: "わ", romaji: "wa", mnemonic: "looks like a wasp flying" },
      { char: "を", romaji: "wo", mnemonic: "looks like a person crossing a wall" },
      { char: "ん", romaji: "n", mnemonic: "looks like the letter 'n' itself" },
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
      { char: "が", romaji: "ga", mnemonic: "か with quotation marks (dakuon)" },
      { char: "ざ", romaji: "za", mnemonic: "さ with quotation marks (dakuon)" },
      { char: "だ", romaji: "da", mnemonic: "た with quotation marks (dakuon)" },
      { char: "ば", romaji: "ba", mnemonic: "は with quotation marks (dakuon)" },
      { char: "ぱ", romaji: "pa", mnemonic: "は with small circle (handakuon)" },
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
    unitTitle: "Unit 6: Katakana - Vowels, K & S-Row (A-U-I-E-O) 🎌",
    unitDescription: "Learn Katakana vowels (アウイエオ), K-row (カクキケコ), and S-row (サスシセソ).",
    unitColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    items: [
      // Vowels (A-U-I-E-O order)
      { char: "ア", romaji: "a", mnemonic: "looks like an angle" },
      { char: "ウ", romaji: "u", mnemonic: "looks like a house roof" },
      { char: "イ", romaji: "i", mnemonic: "looks like a stand hook" },
      { char: "エ", romaji: "e", mnemonic: "looks like an engineering frame" },
      { char: "オ", romaji: "o", mnemonic: "looks like a person running fast" },
      // K-Row (Ka-Ku-Ki-Ke-Ko order)
      { char: "カ", romaji: "ka", mnemonic: "looks like Hiragana か without the extra line" },
      { char: "ク", romaji: "ku", mnemonic: "looks like a crescent moon shape" },
      { char: "キ", romaji: "ki", mnemonic: "looks like a key frame" },
      { char: "ケ", romaji: "ke", mnemonic: "looks like a kettle stand" },
      { char: "コ", romaji: "ko", mnemonic: "looks like a corner brace" },
      // S-Row (Sa-Su-Shi-Se-So order)
      { char: "サ", romaji: "sa", mnemonic: "looks like a satellite dish" },
      { char: "ス", romaji: "su", mnemonic: "looks like a coat hanger structure" },
      { char: "シ", romaji: "shi", mnemonic: "looks like a smiley face looking up" },
      { char: "セ", romaji: "se", mnemonic: "looks like a sofa side view" },
      { char: "ソ", romaji: "so", mnemonic: "looks like a needle sewing downward" },
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
    unitDescription: "Learn Katakana T-row (タツチテト), N-row (ナヌネノ), H-row (ハフヒヘホ), and M-row (マムミメモ).",
    unitColor: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    items: [
      // T-Row (Ta-Tsu-Chi-Te-To order)
      { char: "タ", romaji: "ta", mnemonic: "looks like a tidal wave" },
      { char: "ツ", romaji: "tsu", mnemonic: "looks like two droplets falling downward" },
      { char: "チ", romaji: "chi", mnemonic: "looks like a cheerleader's flags" },
      { char: "テ", romaji: "te", mnemonic: "looks like a television antenna" },
      { char: "ト", romaji: "to", mnemonic: "looks like a tree branch growing out" },
      // N-Row (Na-Nu-Ni-Ne-No order)
      { char: "ナ", romaji: "na", mnemonic: "looks like a cross sword hanger" },
      { char: "ヌ", romaji: "nu", mnemonic: "looks like chopsticks with noodles" },
      { char: "ニ", romaji: "ni", mnemonic: "looks like two horizontal lines" },
      { char: "ネ", romaji: "ne", mnemonic: "looks like a net frame" },
      { char: "ノ", romaji: "no", mnemonic: "looks like a sliding slope" },
      // H-Row (Ha-Fu-Hi-He-Ho order)
      { char: "ハ", romaji: "ha", mnemonic: "looks like two hands pointing down" },
      { char: "フ", romaji: "fu", mnemonic: "looks like a flag flying" },
      { char: "ヒ", romaji: "hi", mnemonic: "looks like a high-heel boot" },
      { char: "ヘ", romaji: "he", mnemonic: "looks like a mountain peak" },
      { char: "ホ", romaji: "ho", mnemonic: "looks like a holy cross" },
      // M-Row (Ma-Mu-Mi-Me-Mo order)
      { char: "マ", romaji: "ma", mnemonic: "looks like a mast pole" },
      { char: "ム", romaji: "mu", mnemonic: "looks like a mountain range" },
      { char: "ミ", romaji: "mi", mnemonic: "looks like three slashes" },
      { char: "メ", romaji: "me", mnemonic: "looks like crossing swords" },
      { char: "モ", romaji: "mo", mnemonic: "looks like a double fish hook" },
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
    unitDescription: "Learn Katakana Y-row (ヤユヨ), R-row (ラルレロ), W-row (ワヲ), N (ン) and Dakuon.",
    unitColor: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
    items: [
      { char: "ヤ", romaji: "ya", mnemonic: "similar to Hiragana や" },
      { char: "ユ", romaji: "yu", mnemonic: "looks like a hook" },
      { char: "ヨ", romaji: "yo", mnemonic: "looks like the letter E facing backward" },
      { char: "ラ", romaji: "ra", mnemonic: "looks like a rabbit hopping" },
      { char: "ル", romaji: "ru", mnemonic: "looks like two legs standing" },
      { char: "リ", romaji: "ri", mnemonic: "similar to Hiragana り" },
      { char: "レ", romaji: "re", mnemonic: "looks like a single leg kicking" },
      { char: "ロ", romaji: "ro", mnemonic: "looks like a square box" },
      { char: "ワ", romaji: "wa", mnemonic: "similar to ア but with a closed curve" },
      { char: "ヲ", romaji: "wo", mnemonic: "looks like a hand lifting a box" },
      { char: "ン", romaji: "n", mnemonic: "looks like a smiley face with one eye looking up" },
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
        opt: ["どうom", "ありがとう", "ございます", "すみません", "です"],
        ans: "どうも ありがとう ございます",
      },
    ],
  },
];

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
    // Generate 5 to 10 lessons per unit
    const numLessons = getDeterministicRandom(unit.unitId, 5, 10);

    // Let's divide unit items into graduated subsets for step-by-step introduction!
    // Example: For unit 1 (vowels + k-row), we split into vowels (first 5) and k-row (next 5).
    const mid = Math.ceil(unit.items.length / 2);
    const subset1 = unit.items.slice(0, mid);
    const subset2 = unit.items.slice(mid);

    for (let lIdx = 1; lIdx <= numLessons; lIdx++) {
      const lessonId = `${unit.unitId}-l${lIdx}`;
      
      // Determine lesson type/badge
      const badgeTypes = ["Writing Practice", "Character Quiz", "Vocabulary", "Sentence Builder", "Listening Practice"];
      const badge = badgeTypes[(lIdx - 1) % badgeTypes.length];
      
      let icon = "✍️";
      if (badge === "Character Quiz") icon = "❓";
      else if (badge === "Vocabulary") icon = "📚";
      else if (badge === "Sentence Builder") icon = "🧩";
      else if (badge === "Listening Practice") icon = "🎧";

      const title = `Lesson ${lIdx}: ${badge}`;
      const description = `Master the basics of Japanese characters and sentence construction.`;

      // Determine active characters pool for this lesson to ensure gradual progression!
      // Lesson 1 only uses subset1 (e.g. vowels あ、う、い、え、お)
      // Lesson 2 introduces subset2 (e.g. K-row か、く、き、け、こ)
      // Lesson 3+ uses the combined pool
      let activeItems = unit.items;
      if (unit.items.length > 0) {
        if (lIdx === 1) {
          activeItems = subset1;
        } else if (lIdx === 2 && subset2.length > 0) {
          activeItems = subset2;
        }
      }

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

        // Inject sentence construction in EVERY lesson (Duolingo style)
        if (qIdx === numQuestions || qIdx === numQuestions - 1 || badge === "Sentence Builder" || unit.unitId === "basic-u10") {
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
            hint: `Mnemonic/Tip: Arrange Japanese characters to form a valid sentence.`,
          });
        } else if (badge === "Listening Practice" && activeItems.length > 0) {
          const item = activeItems[Math.floor(rng(4) * activeItems.length)];
          const correct = item.char;
          const distractors = activeItems.filter(i => i.char !== correct).map(i => i.char);
          const opts = [correct, ...distractors.slice(0, 3)].sort();
          questions.push({
            id: qId,
            type: "listening",
            questionText: "Listen to the pronunciation and select the correct character:",
            audioText: correct,
            options: opts,
            answer: correct,
            hint: `Mnemonic tip: "${item.char}" ${item.mnemonic}.`,
          });
        } else if (badge === "Vocabulary" && unit.words.length > 0) {
          // Filter words to only those containing characters learned so far if possible
          let wordPool = unit.words;
          if (lIdx === 1 && activeItems.length > 0) {
            const allowedChars = activeItems.map(i => i.char);
            const matching = unit.words.filter(w => w.jpn.split("").every(c => allowedChars.includes(c)));
            if (matching.length > 0) wordPool = matching;
          }
          const item = wordPool[Math.floor(rng(5) * wordPool.length)];
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
          // Character drills
          if (activeItems.length > 0) {
            const item = activeItems[Math.floor(rng(7) * activeItems.length)];
            if (rng(8) > 0.5) {
              questions.push({
                id: qId,
                type: "multiple-choice",
                questionText: `What is the Romaji reading of the character "${item.char}"?`,
                options: [item.romaji, ...activeItems.filter(i => i.romaji !== item.romaji).map(i => i.romaji).slice(0, 3)].sort(),
                answer: item.romaji,
                hint: `Mnemonic tip: "${item.char}" ${item.mnemonic}.`,
              });
            } else {
              questions.push({
                id: qId,
                type: "fill-in-the-blank",
                questionText: `Complete the word for "${item.char}" in Romaji: 「${item.romaji[0]}___」`,
                options: [item.romaji, ...activeItems.filter(i => i.romaji !== item.romaji).map(i => i.romaji).slice(0, 3)].sort(),
                answer: item.romaji,
                hint: `Character: ${item.char} (${item.mnemonic})`,
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
