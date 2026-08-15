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
      {
        char: "う",
        romaji: "u",
        mnemonic: "looks like a person bending over (oo!)",
      },
      {
        char: "い",
        romaji: "i",
        mnemonic: "looks like two Eels swimming side by side",
      },
      {
        char: "え",
        romaji: "e",
        mnemonic: "looks like an Exotic runner crossing the line",
      },
      {
        char: "お",
        romaji: "o",
        mnemonic: "looks like a golfer hitting a ball into the hole (oh!)",
      },
      // K-Row (ka-ku-ki-ke-ko order)
      {
        char: "か",
        romaji: "ka",
        mnemonic: "looks like a person jumping up and down (ka-pow!)",
      },
      {
        char: "く",
        romaji: "ku",
        mnemonic: "looks like a bird's open beak (ku-ku!)",
      },
      {
        char: "き",
        romaji: "ki",
        mnemonic: "looks like a key to unlock a door",
      },
      { char: "け", romaji: "ke", mnemonic: "looks like a keg of drink" },
      {
        char: "こ",
        romaji: "ko",
        mnemonic: "looks like two cozy worms cuddling",
      },
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
    // Simple spelling word construction for beginners instead of complex sentences
    sentences: [
      {
        eng: "Spell 'love' (ai):",
        opt: ["あ", "い", "う", "え"],
        ans: "あ い",
      },
      {
        eng: "Spell 'blue' (aoi):",
        opt: ["あ", "お", "い", "う", "か"],
        ans: "あ お い",
      },
      {
        eng: "Spell 'red' (aka):",
        opt: ["あ", "か", "き", "い"],
        ans: "あ か",
      },
      {
        eng: "Spell 'face' (kao):",
        opt: ["か", "お", "あ", "い"],
        ans: "か お",
      },
    ],
  },
  {
    unitId: "basic-u2",
    unitTitle: "Unit 2: Hiragana - S & T-Row 🎌",
    unitDescription: "Learn S-row (さすしせそ) and T-row (たつちてと).",
    unitColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    items: [
      // S-Row (sa-su-shi-se-so order)
      {
        char: "さ",
        romaji: "sa",
        mnemonic: "looks like a smiling face (say cheese!)",
      },
      {
        char: "す",
        romaji: "su",
        mnemonic: "looks like a swing at a playground",
      },
      {
        char: "し",
        romaji: "shi",
        mnemonic: "looks like a fishing shish-kebab hook",
      },
      { char: "せ", romaji: "se", mnemonic: "looks like a set of teeth" },
      { char: "そ", romaji: "so", mnemonic: "looks like a sewing pattern" },
      // T-Row (ta-tsu-chi-te-to order)
      {
        char: "た",
        romaji: "ta",
        mnemonic: "looks like the letters 't' and 'a'",
      },
      {
        char: "つ",
        romaji: "tsu",
        mnemonic: "looks like a giant tsunami wave",
      },
      {
        char: "ち",
        romaji: "chi",
        mnemonic: "looks like a cheerleader doing a split",
      },
      {
        char: "て",
        romaji: "te",
        mnemonic: "looks like a telephone line pole",
      },
      {
        char: "と",
        romaji: "to",
        mnemonic: "looks like a toe with a splinter in it",
      },
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
    sentences: [
      {
        eng: "Spell 'sushi' (sushi):",
        opt: ["す", "し", "さ", "そ"],
        ans: "す し",
      },
      {
        eng: "It is sushi. (sushi desu):",
        opt: ["すし", "です", "みず", "を"],
        ans: "すし です",
      },
      { eng: "Spell 'hand' (te):", opt: ["て", "と", "た", "ち"], ans: "て" },
      {
        eng: "It is a house. (uchi desu):",
        opt: ["うち", "です", "そと", "は"],
        ans: "うち です",
      },
    ],
  },
  {
    unitId: "basic-u3",
    unitTitle: "Unit 3: Hiragana - N, H & M-Row 🎌",
    unitDescription:
      "Learn N-row (なぬにねの), H-row (はふひへほ), and M-row (まむみめも).",
    unitColor: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    items: [
      // N-Row (na-nu-ni-ne-no order)
      { char: "な", romaji: "na", mnemonic: "looks like a nun praying" },
      {
        char: "ぬ",
        romaji: "nu",
        mnemonic: "looks like noodles eaten with chopsticks",
      },
      {
        char: "に",
        romaji: "ni",
        mnemonic: "looks like two needles side by side",
      },
      {
        char: "ね",
        romaji: "ne",
        mnemonic: "looks like a net for catching cats",
      },
      { char: "の", romaji: "no", mnemonic: "looks like a no-entry sign" },
      // H-Row (ha-fu-hi-he-ho order)
      {
        char: "は",
        romaji: "ha",
        mnemonic: "looks like a hockey stick and a puck",
      },
      { char: "ふ", romaji: "fu", mnemonic: "looks like Mount Fuji" },
      {
        char: "ひ",
        romaji: "hi",
        mnemonic: "looks like a laughing mouth (hee-hee!)",
      },
      { char: "へ", romaji: "he", mnemonic: "looks like a hill climb" },
      {
        char: "ほ",
        romaji: "ho",
        mnemonic: "looks like a hot stove with steam",
      },
      // M-Row (ma-mu-mi-me-mo order)
      { char: "ま", romaji: "ma", mnemonic: "looks like a mast of a ship" },
      { char: "む", romaji: "mu", mnemonic: "looks like a cow saying moo" },
      { char: "み", romaji: "mi", mnemonic: "looks like a musical note" },
      { char: "め", romaji: "me", mnemonic: "looks like a messy plate" },
      {
        char: "も",
        romaji: "mo",
        mnemonic: "looks like a fish hook catching more fish",
      },
    ],
    words: [
      { jpn: "ごはん", rom: "gohan", eng: "rice" },
      { jpn: "みず", rom: "mizu", eng: "water" },
      { jpn: "おちゃ", rom: "ocha", eng: "green tea" },
      { jpn: "いぬ", rom: "inu", eng: "dog" },
      { jpn: "ねこ", rom: "neko", eng: "cat" },
    ],
    sentences: [
      {
        eng: "Water, please. (mizu o kudasai):",
        opt: ["みず", "を", "ください", "おちゃ", "es"],
        ans: "みず を ください",
      },
      {
        eng: "It is green tea. (ocha desu):",
        opt: ["おちゃ", "です", "みず", "ください"],
        ans: "おちゃ です",
      },
      {
        eng: "It is rice. (gohan desu):",
        opt: ["ごはん", "です", "すし", "を"],
        ans: "ごはん です",
      },
      {
        eng: "Green tea, please. (ocha o kudasai):",
        opt: ["おちゃ", "を", "ください", "ごはん", "です"],
        ans: "おちゃ を ください",
      },
    ],
  },
  {
    unitId: "basic-u4",
    unitTitle: "Unit 4: Hiragana - Y, R, W & N 🎌",
    unitDescription:
      "Learn Y-row (やゆよ), R-row (らるりれろ), W-row (わを), and N (ん).",
    unitColor: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
    items: [
      { char: "や", romaji: "ya", mnemonic: "looks like a yak walking" },
      {
        char: "ゆ",
        romaji: "yu",
        mnemonic: "looks like a fish swimming forward",
      },
      { char: "よ", romaji: "yo", mnemonic: "looks like a yo-yo on a string" },
      {
        char: "ら",
        romaji: "ra",
        mnemonic: "looks like a rabbit looking back",
      },
      {
        char: "る",
        romaji: "ru",
        mnemonic: "looks like a road with a loop at the end",
      },
      { char: "り", romaji: "ri", mnemonic: "looks like ribbons hanging" },
      {
        char: "れ",
        romaji: "re",
        mnemonic: "looks like a person resting near a tree",
      },
      {
        char: "ろ",
        romaji: "ro",
        mnemonic: "looks like a road without a loop",
      },
      { char: "わ", romaji: "wa", mnemonic: "looks like a wasp flying" },
      {
        char: "を",
        romaji: "wo",
        mnemonic: "looks like a person crossing a wall",
      },
      { char: "ん", romaji: "n", mnemonic: "looks like the letter 'n' itself" },
    ],
    words: [
      { jpn: "やま", rom: "yama", eng: "mountain" },
      { jpn: "ゆき", rom: "yuki", eng: "snow" },
      { jpn: "よる", rom: "yoru", eng: "night" },
      { jpn: "にほん", rom: "nihon", eng: "Japan" },
      { jpn: "わたし", rom: "watashi", eng: "I / me" },
      { jpn: "ほん", rom: "hon", eng: "book" },
    ],
    sentences: [
      {
        eng: "It is a book. (hon desu):",
        opt: ["ほん", "です", "わたし", "は"],
        ans: "ほん です",
      },
      {
        eng: "It is Japan. (nihon desu):",
        opt: ["にほん", "です", "やま", "を"],
        ans: "にほん です",
      },
      {
        eng: "I am Tanaka. (watashi wa tanaka desu):",
        opt: ["わたし", "は", "たなか", "です", "にほん"],
        ans: "わたし は たなか です",
      },
    ],
  },
  {
    unitId: "basic-u5",
    unitTitle: "Unit 5: Hiragana - Dakuon & Yoon 🎌",
    unitDescription:
      "Master modified sounds (が、ざ、だ、ば、ぱ) and combinations (きゃ、しゃ).",
    unitColor: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    items: [
      {
        char: "が",
        romaji: "ga",
        mnemonic: "か with quotation marks (dakuon)",
      },
      {
        char: "ざ",
        romaji: "za",
        mnemonic: "さ with quotation marks (dakuon)",
      },
      {
        char: "だ",
        romaji: "da",
        mnemonic: "た with quotation marks (dakuon)",
      },
      {
        char: "ば",
        romaji: "ba",
        mnemonic: "は with quotation marks (dakuon)",
      },
      {
        char: "ぱ",
        romaji: "pa",
        mnemonic: "は with small circle (handakuon)",
      },
    ],
    words: [
      { jpn: "おちゃ", rom: "ocha", eng: "green tea" },
      { jpn: "でんわ", rom: "denwa", eng: "telephone" },
      { jpn: "かぜ", rom: "kaze", eng: "wind" },
      { jpn: "みず", rom: "mizu", eng: "water" },
      { jpn: "がっこう", rom: "gakkou", eng: "school" },
      { jpn: "てんき", rom: "tenki", eng: "weather" },
      { jpn: "かぞく", rom: "kazoku", eng: "family" },
    ],
    sentences: [
      {
        eng: "It is school. (gakkou desu):",
        opt: ["がっこう", "です", "でんわ", "を"],
        ans: "がっこう です",
      },
      {
        eng: "Water, please. (mizu o kudasai):",
        opt: ["みず", "を", "ください", "おちゃ", "です"],
        ans: "みず を ください",
      },
    ],
  },
  {
    unitId: "basic-u6",
    unitTitle: "Unit 6: Katakana - Vowels, K & S-Row (A-U-I-E-O) 🎌",
    unitDescription:
      "Learn Katakana vowels (アウイエオ), K-row (カクキケコ), and S-row (サスシセソ).",
    unitColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    items: [
      // Vowels (A-U-I-E-O order)
      { char: "ア", romaji: "a", mnemonic: "looks like an angle" },
      { char: "ウ", romaji: "u", mnemonic: "looks like a house roof" },
      { char: "イ", romaji: "i", mnemonic: "looks like a stand hook" },
      { char: "エ", romaji: "e", mnemonic: "looks like an engineering frame" },
      { char: "オ", romaji: "o", mnemonic: "looks like a person running fast" },
      // K-Row (Ka-Ku-Ki-Ke-Ko order)
      {
        char: "カ",
        romaji: "ka",
        mnemonic: "looks like Hiragana か without the extra line",
      },
      {
        char: "ク",
        romaji: "ku",
        mnemonic: "looks like a crescent moon shape",
      },
      { char: "キ", romaji: "ki", mnemonic: "looks like a key frame" },
      { char: "ケ", romaji: "ke", mnemonic: "looks like a kettle stand" },
      { char: "コ", romaji: "ko", mnemonic: "looks like a corner brace" },
      // S-Row (Sa-Su-Shi-Se-So order)
      { char: "サ", romaji: "sa", mnemonic: "looks like a satellite dish" },
      {
        char: "ス",
        romaji: "su",
        mnemonic: "looks like a coat hanger structure",
      },
      {
        char: "シ",
        romaji: "shi",
        mnemonic: "looks like a smiley face looking up",
      },
      { char: "セ", romaji: "se", mnemonic: "looks like a sofa side view" },
      {
        char: "ソ",
        romaji: "so",
        mnemonic: "looks like a needle sewing downward",
      },
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
    sentences: [
      {
        eng: "It is ice. (aisu desu):",
        opt: ["アイス", "です", "ケーキ", "を"],
        ans: "アイス です",
      },
      {
        eng: "Spell 'ice' in Katakana:",
        opt: ["ア", "イ", "ス", "ケ", "コ"],
        ans: "ア イ ス",
      },
    ],
  },
  {
    unitId: "basic-u7",
    unitTitle: "Unit 7: Katakana - T, N, H & M-Row 🎌",
    unitDescription:
      "Learn Katakana T-row (タツチテト), N-row (ナヌネノ), H-row (ハフヒヘホ), and M-row (マムミメモ).",
    unitColor: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    items: [
      // T-Row (Ta-Tsu-Chi-Te-To order)
      { char: "タ", romaji: "ta", mnemonic: "looks like a tidal wave" },
      {
        char: "ツ",
        romaji: "tsu",
        mnemonic: "looks like two droplets falling downward",
      },
      {
        char: "チ",
        romaji: "chi",
        mnemonic: "looks like a cheerleader's flags",
      },
      { char: "テ", romaji: "te", mnemonic: "looks like a television antenna" },
      {
        char: "ト",
        romaji: "to",
        mnemonic: "looks like a tree branch growing out",
      },
      // N-Row (Na-Nu-Ni-Ne-No order)
      { char: "ナ", romaji: "na", mnemonic: "looks like a cross sword hanger" },
      {
        char: "ヌ",
        romaji: "nu",
        mnemonic: "looks like chopsticks with noodles",
      },
      { char: "ニ", romaji: "ni", mnemonic: "looks like two horizontal lines" },
      { char: "ネ", romaji: "ne", mnemonic: "looks like a net frame" },
      { char: "ノ", romaji: "no", mnemonic: "looks like a sliding slope" },
      // H-Row (Ha-Fu-Hi-He-Ho order)
      {
        char: "ハ",
        romaji: "ha",
        mnemonic: "looks like two hands pointing down",
      },
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
      { jpn: "コーヒー", rom: "koohii", eng: "coffee" },
      { jpn: "トマト", rom: "tomato", eng: "tomato" },
      { jpn: "ノート", rom: "nooto", eng: "notebook" },
      { jpn: "ミルク", rom: "miruku", eng: "milk" },
      { jpn: "ホテル", rom: "hoteru", eng: "hotel" },
    ],
    sentences: [
      {
        eng: "Coffee, please. (koohii o kudasai):",
        opt: ["コーヒー", "を", "ください", "ミルク", "es"],
        ans: "コーヒー を ください",
      },
      {
        eng: "It is milk. (miruku desu):",
        opt: ["ミルク", "です", "ホテル", "を"],
        ans: "ミルク です",
      },
    ],
  },
  {
    unitId: "basic-u8",
    unitTitle: "Unit 8: Katakana - Y, R, W, N & Dakuon 🎌",
    unitDescription:
      "Learn Katakana Y-row (ヤユヨ), R-row (ラルレロ), W-row (ワヲ), N (ン) and Dakuon.",
    unitColor: "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
    items: [
      { char: "ヤ", romaji: "ya", mnemonic: "similar to Hiragana や" },
      { char: "ユ", romaji: "yu", mnemonic: "looks like a hook" },
      {
        char: "ヨ",
        romaji: "yo",
        mnemonic: "looks like the letter E facing backward",
      },
      { char: "ラ", romaji: "ra", mnemonic: "looks like a rabbit hopping" },
      { char: "ル", romaji: "ru", mnemonic: "looks like two legs standing" },
      { char: "リ", romaji: "ri", mnemonic: "similar to Hiragana り" },
      { char: "レ", romaji: "re", mnemonic: "looks like a single leg kicking" },
      { char: "ロ", romaji: "ro", mnemonic: "looks like a square box" },
      {
        char: "ワ",
        romaji: "wa",
        mnemonic: "similar to ア but with a closed curve",
      },
      { char: "ヲ", romaji: "wo", mnemonic: "looks like a hand lifting a box" },
      {
        char: "ン",
        romaji: "n",
        mnemonic: "looks like a smiley face with one eye looking up",
      },
    ],
    words: [
      { jpn: "パン", rom: "pan", eng: "bread" },
      { jpn: "テレビ", rom: "terebi", eng: "TV" },
      { jpn: "トイレ", rom: "toire", eng: "toilet" },
      { jpn: "ニュース", rom: "nyuusu", eng: "news" },
      { jpn: "アメリカ", rom: "amerika", eng: "America" },
    ],
    sentences: [
      {
        eng: "Bread, please. (pan o kudasai):",
        opt: ["パン", "を", "ください", "トイレ", "です"],
        ans: "パン を ください",
      },
      {
        eng: "Is this a toilet? (toire desu ka):",
        opt: ["トイレ", "です", "か", "パン", "を"],
        ans: "トイレ です か",
      },
    ],
  },
  {
    unitId: "basic-u9",
    unitTitle: "Unit 9: Everyday Words & Greetings 🗣️",
    unitDescription:
      "Practice common phrases and greetings in standard Japanese conversation.",
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
    sentences: [
      {
        eng: "Hello. (konnichiwa):",
        opt: ["こんにちは", "ありがとう", "すみません"],
        ans: "こんにちは",
      },
      {
        eng: "Nice to meet you. (hajimemashite):",
        opt: ["はじめまして", "さようなら", "はい"],
        ans: "はじめまして",
      },
      {
        eng: "Excuse me. (sumimasen):",
        opt: ["すみません", "いいえ", "おはよう"],
        ans: "すみません",
      },
    ],
  },
  {
    unitId: "basic-u10",
    unitTitle: "Unit 10: First Sentences & Particles 📝",
    unitDescription:
      "Build your very first basic sentences using particles like は, を, の and copula です.",
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
        opt: ["どうも", "ありがとう", "ございます", "すみません", "es"],
        ans: "どうも ありがとう ございます",
      },
    ],
  },
];

function getDeterministicRandom(
  seed: string,
  min: number,
  max: number,
): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const rng = Math.abs(Math.sin(hash));
  return Math.floor(rng * (max - min + 1)) + min;
}

function getSmartRomajiDistractors(
  correctRomaji: string,
  unitItems: { romaji: string }[],
  allUnitItems: { romaji: string }[] = [],
): string[] {
  const targetLen = correctRomaji.length;

  const romajiPool2 = [
    "ka", "ki", "ku", "ke", "ko",
    "sa", "shi", "su", "se", "so",
    "ta", "chi", "tsu", "te", "to",
    "na", "ni", "nu", "ne", "no",
    "ha", "hi", "fu", "he", "ho",
    "ma", "mi", "mu", "me", "mo",
    "ra", "ri", "ru", "re", "ro",
    "ya", "yu", "yo", "wa", "wo",
  ];
  const romajiPool1 = ["a", "i", "u", "e", "o"];

  const candidatePool = targetLen === 1 ? romajiPool1 : romajiPool2;

  let candidates: string[] = unitItems
    .map((i) => i.romaji)
    .filter((r) => r !== correctRomaji && r.length === targetLen);

  if (candidates.length < 3) {
    const extraAll = allUnitItems
      .map((i) => i.romaji)
      .filter((r) => r !== correctRomaji && r.length === targetLen && !candidates.includes(r));
    candidates = [...candidates, ...extraAll];
  }

  if (candidates.length < 3) {
    const extraPool = candidatePool.filter(
      (r) => r !== correctRomaji && !candidates.includes(r),
    );
    candidates = [...candidates, ...extraPool];
  }

  const result: string[] = [];
  for (const c of candidates) {
    if (!result.includes(c) && c !== correctRomaji) {
      result.push(c);
    }
    if (result.length === 3) break;
  }
  return result;
}

function getSmartKanaDistractors(
  correctChar: string,
  unitItems: { char: string }[],
  allUnitItems: { char: string }[] = [],
): string[] {
  const isVowel = ["あ", "い", "う", "え", "お", "ア", "イ", "ウ", "エ", "オ"].includes(correctChar);
  const kanaPool2 = ["か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の"];
  const kanaPool1 = ["あ", "い", "う", "え", "お"];

  const pool = isVowel ? kanaPool1 : kanaPool2;

  let candidates = unitItems
    .map((i) => i.char)
    .filter((c) => c !== correctChar && (isVowel ? ["あ", "い", "う", "え", "お"].includes(c) : !["あ", "い", "う", "え", "お"].includes(c)));

  if (candidates.length < 3) {
    const extraAll = allUnitItems
      .map((i) => i.char)
      .filter((c) => c !== correctChar && !candidates.includes(c));
    candidates = [...candidates, ...extraAll];
  }

  if (candidates.length < 3) {
    const extraPool = pool.filter((c) => c !== correctChar && !candidates.includes(c));
    candidates = [...candidates, ...extraPool];
  }

  const result: string[] = [];
  for (const c of candidates) {
    if (!result.includes(c) && c !== correctChar) {
      result.push(c);
    }
    if (result.length === 3) break;
  }
  return result;
}

function getSmartVocabDistractors(
  correctEng: string,
  unitWords: { eng: string }[],
): string[] {
  const defaultEnglishVocab = [
    "Water", "Tea", "Rice", "Fish", "Meat", "Book", "School", "Friend", "Teacher",
    "House", "Car", "Train", "Station", "Sun", "Moon", "Rain", "Dog", "Cat",
  ];

  let candidates = unitWords
    .map((w) => w.eng)
    .filter((e) => e !== correctEng);

  if (candidates.length < 3) {
    const extra = defaultEnglishVocab.filter((e) => e !== correctEng && !candidates.includes(e));
    candidates = [...candidates, ...extra];
  }

  const result: string[] = [];
  for (const e of candidates) {
    if (!result.includes(e) && e !== correctEng) {
      result.push(e);
    }
    if (result.length === 3) break;
  }
  return result;
}

function generateBasicLessons(): Lesson[] {
  const result: Lesson[] = [];

  basicUnits.forEach((unit) => {
    // 5 to 10 lessons per unit (compact size)
    const numLessons = getDeterministicRandom(unit.unitId, 5, 10);

    const mid = Math.ceil(unit.items.length / 2);
    const subset1 = unit.items.slice(0, mid);
    const subset2 = unit.items.slice(mid);

    for (let lIdx = 1; lIdx <= numLessons; lIdx++) {
      const lessonId = `${unit.unitId}-l${lIdx}`;

      // Determine lesson type/badge
      const badgeTypes = [
        "Writing Practice",
        "Character Quiz",
        "Vocabulary",
        "Sentence Builder",
        "Listening Practice",
      ];
      const badge = badgeTypes[(lIdx - 1) % badgeTypes.length];

      let icon = "✍️";
      if (badge === "Character Quiz") icon = "❓";
      else if (badge === "Vocabulary") icon = "📚";
      else if (badge === "Sentence Builder") icon = "🧩";
      else if (badge === "Listening Practice") icon = "🎧";

      const title = `Lesson ${lIdx}: ${badge}`;
      const description = `Master the basics of Japanese characters and sentence construction.`;

      // Active character subset for graduated difficulty
      let activeItems = unit.items;
      if (unit.items.length > 0) {
        if (lIdx === 1) {
          activeItems = subset1;
        } else if (lIdx === 2 && subset2.length > 0) {
          activeItems = subset2;
        }
      }

      // Generate 4 to 6 questions per lesson to prevent fatigue and repetition!
      const numQuestions = getDeterministicRandom(lessonId, 4, 6);
      const questions: Question[] = [];

      // Anti-duplication state
      const usedKeys = new Set<string>();
      let lastKey = "";

      for (let qIdx = 1; qIdx <= numQuestions; qIdx++) {
        const qId = `${lessonId}-q${qIdx}`;

        let qHash = 0;
        for (let i = 0; i < qId.length; i++) {
          qHash = qId.charCodeAt(i) + ((qHash << 5) - qHash);
        }
        const rng = (offset: number) => Math.abs(Math.sin(qHash + offset));

        // Let's decide question type with anti-duplication
        // Inject sentence building/spelling into ALL lessons
        if (
          qIdx === numQuestions ||
          qIdx === numQuestions - 1 ||
          badge === "Sentence Builder" ||
          unit.unitId === "basic-u10"
        ) {
          const sentencesPool = unit.sentences || [
            {
              eng: "Spell 'love' (ai):",
              opt: ["あ", "い", "う", "え"],
              ans: "あ い",
            },
            {
              eng: "Spell 'up' (ue):",
              opt: ["う", "え", "あ", "お"],
              ans: "う え",
            },
          ];

          // Filter out used sentences
          let available = sentencesPool.filter(
            (s) => !usedKeys.has(s.eng) && s.eng !== lastKey,
          );
          if (available.length === 0) {
            available = sentencesPool.filter((s) => s.eng !== lastKey);
          }
          if (available.length === 0) {
            available = sentencesPool;
          }

          const item = available[Math.floor(rng(2) * available.length)];
          usedKeys.add(item.eng);
          lastKey = item.eng;

          questions.push({
            id: qId,
            type: "sentence-builder",
            questionText: item.eng,
            options: [...item.opt].sort(() => rng(3) - 0.5),
            answer: item.ans,
            hint: `Mnemonic/Tip: Arrange characters/words correctly.`,
          });
        } else if (badge === "Listening Practice" && activeItems.length > 0) {
          let available = activeItems.filter(
            (i) => !usedKeys.has(i.char) && i.char !== lastKey,
          );
          if (available.length === 0) {
            available = activeItems.filter((i) => i.char !== lastKey);
          }
          if (available.length === 0) {
            available = activeItems;
          }

          const item = available[Math.floor(rng(4) * available.length)];
          usedKeys.add(item.char);
          lastKey = item.char;

          const correct = item.char;
          const distractors = getSmartKanaDistractors(
            correct,
            activeItems,
            unit.items,
          );
          const opts = [correct, ...distractors].sort();
          questions.push({
            id: qId,
            type: "listening",
            questionText:
              "Listen to the pronunciation and select the correct character:",
            audioText: correct,
            options: opts,
            answer: correct,
            hint: `Mnemonic tip: "${item.char}" ${item.mnemonic}.`,
          });
        } else if (badge === "Vocabulary" && unit.words.length > 0) {
          let wordPool = unit.words;
          if (lIdx === 1 && activeItems.length > 0) {
            const allowedChars = activeItems.map((i) => i.char);
            const matching = unit.words.filter((w) =>
              w.jpn.split("").every((c) => allowedChars.includes(c)),
            );
            if (matching.length > 0) wordPool = matching;
          }

          let available = wordPool.filter(
            (w) => !usedKeys.has(w.jpn) && w.jpn !== lastKey,
          );
          if (available.length === 0) {
            available = wordPool.filter((w) => w.jpn !== lastKey);
          }
          if (available.length === 0) {
            available = wordPool;
          }

          const item = available[Math.floor(rng(5) * available.length)];
          usedKeys.add(item.jpn);
          lastKey = item.jpn;

          if (rng(6) > 0.5) {
            const distractors = getSmartVocabDistractors(item.eng, unit.words);
            questions.push({
              id: qId,
              type: "multiple-choice",
              questionText: `What is the meaning of "${item.jpn}" (${item.rom})?`,
              options: [item.eng, ...distractors].sort(),
              answer: item.eng,
              hint: `Romaji: ${item.rom}`,
            });
          } else {
            const distractors = unit.words
              .filter((w) => w.jpn !== item.jpn)
              .map((w) => w.jpn);
            const fallbackKana = getSmartKanaDistractors(item.jpn, unit.words.map(w => ({ char: w.jpn })), unit.items);
            const finalOptions = distractors.length >= 3 ? distractors.slice(0, 3) : [...distractors, ...fallbackKana].slice(0, 3);
            questions.push({
              id: qId,
              type: "multiple-choice",
              questionText: `Choose the correct Japanese word for "${item.eng}":`,
              options: [item.jpn, ...finalOptions].sort(),
              answer: item.jpn,
              hint: `Pronounced as: ${item.rom}`,
            });
          }
        } else {
          // Character drills
          if (activeItems.length > 0) {
            let available = activeItems.filter(
              (i) => !usedKeys.has(i.char) && i.char !== lastKey,
            );
            if (available.length === 0) {
              available = activeItems.filter((i) => i.char !== lastKey);
            }
            if (available.length === 0) {
              available = activeItems;
            }

            const item = available[Math.floor(rng(7) * available.length)];
            usedKeys.add(item.char);
            lastKey = item.char;

            if (rng(8) > 0.5) {
              const distractors = getSmartRomajiDistractors(
                item.romaji,
                activeItems,
                unit.items,
              );
              questions.push({
                id: qId,
                type: "multiple-choice",
                questionText: `Choose the correct Romaji reading for "${item.char}":`,
                options: [item.romaji, ...distractors].sort(),
                answer: item.romaji,
                hint: `Mnemonic tip: "${item.char}" ${item.mnemonic}.`,
              });
            } else {
              questions.push({
                id: qId,
                type: "typing",
                questionText: `Type the Romaji reading of the character "${item.char}":`,
                options: [],
                answer: item.romaji.toLowerCase(),
                hint: `Mnemonic tip: "${item.char}" ${item.mnemonic}.`,
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

    // Generate 25-Question Unit Exam for this Basic Unit
    const examLessonId = `${unit.unitId}-exam`;
    const examQuestions: Question[] = [];
    const unitCleanTitle = unit.unitTitle
      .replace(/Unit \d+:\s*/i, "")
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
      .trim();

    for (let qIdx = 1; qIdx <= 25; qIdx++) {
      const qId = `${examLessonId}-q${qIdx}`;
      const qHash = qIdx * 101;
      const rng = (offset: number) => Math.abs(Math.sin(qHash + offset));

      if (qIdx % 4 === 0 && unit.sentences && unit.sentences.length > 0) {
        const s = unit.sentences[(qIdx - 1) % unit.sentences.length];
        examQuestions.push({
          id: qId,
          type: "sentence-builder",
          questionText: s.eng,
          options: [...s.opt].sort(() => rng(1) - 0.5),
          answer: s.ans,
          hint: "Arrange the words/characters correctly.",
        });
      } else if (qIdx % 3 === 0 && unit.words && unit.words.length > 0) {
        const w = unit.words[(qIdx - 1) % unit.words.length];
        const distractors = unit.words
          .filter((x) => x.eng !== w.eng)
          .map((x) => x.eng);
        const opts = [w.eng, ...distractors.slice(0, 3)].sort();
        examQuestions.push({
          id: qId,
          type: "multiple-choice",
          questionText: `What is the meaning of "${w.jpn}" (${w.rom})?`,
          options: opts,
          answer: w.eng,
          hint: `Word: ${w.rom}`,
        });
      } else if (unit.items && unit.items.length > 0) {
        const item = unit.items[(qIdx - 1) % unit.items.length];
        if (qIdx % 2 === 0) {
          const distractors = getSmartKanaDistractors(
            item.char,
            unit.items,
            unit.items,
          );
          const opts = [item.char, ...distractors].sort();
          examQuestions.push({
            id: qId,
            type: "listening",
            questionText:
              "Listen to the audio and choose the correct character!",
            audioText: item.char,
            options: opts,
            answer: item.char,
            hint: `Pronounced "${item.romaji}". ${item.mnemonic}`,
          });
        } else {
          const distractors = getSmartRomajiDistractors(
            item.romaji,
            unit.items,
            unit.items,
          );
          const opts = [item.romaji, ...distractors].sort();
          examQuestions.push({
            id: qId,
            type: "multiple-choice",
            questionText: `Choose the correct Romaji reading for "${item.char}":`,
            options: opts,
            answer: item.romaji,
            hint: item.mnemonic,
          });
        }
      } else {
        examQuestions.push({
          id: qId,
          type: "sentence-builder",
          questionText: "Spell 'Love' (ai):",
          options: ["あ", "い", "う", "え"],
          answer: "あ い",
          hint: "Combine あ and い.",
        });
      }
    }

    result.push({
      id: examLessonId,
      level: "Basic",
      unitId: unit.unitId,
      unitTitle: unit.unitTitle,
      unitDescription: unit.unitDescription,
      unitColor: unit.unitColor,
      title: `Ujian Unit 🏆: ${unitCleanTitle}`,
      description: `Ujian komprehensif 25 soal untuk menguji seluruh pemahaman materi ${unitCleanTitle}. Minimal 80% untuk lulus!`,
      expReward: 100,
      icon: "🏆",
      badge: "Ujian Unit",
      questions: examQuestions,
    });
  });

  return result;
}

export const basicLessons: Lesson[] = generateBasicLessons();
