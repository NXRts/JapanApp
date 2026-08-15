import {
  Lesson,
  Question,
  RoadmapLesson,
  RoadmapChapter,
} from "./lessons/types";
import { ROADMAP_DATA } from "./lessons/roadmap";
import { basicLessons } from "./lessons/basic";
import { n5Lessons } from "./lessons/n5";
import { n4Lessons } from "./lessons/n4";
import { n3Lessons } from "./lessons/n3";
import { n2Lessons } from "./lessons/n2";
import { n1Lessons } from "./lessons/n1";

export type { Lesson, Question, RoadmapLesson, RoadmapChapter };
export { ROADMAP_DATA };

const baseLessonsData: Lesson[] = [
  ...basicLessons,
  ...n5Lessons,
  ...n4Lessons,
  ...n3Lessons,
  ...n2Lessons,
  ...n1Lessons,
];

// DYNAMIC UNIT LESSON EXPANSION GENERATOR
interface Word {
  japanese: string;
  romaji: string;
  english: string;
}

const vocabBank: Record<string, Word[]> = {
  "N5-1": [
    { japanese: "おちゃ", romaji: "ocha", english: "green tea" },
    { japanese: "すし", romaji: "sushi", english: "sushi" },
    { japanese: "ラーメン", romaji: "ramen", english: "ramen" },
    { japanese: "コーヒー", romaji: "koohii", english: "coffee" },
    { japanese: "みず", romaji: "mizu", english: "water" },
    { japanese: "メニュー", romaji: "menyuu", english: "menu" },
    { japanese: "ビール", romaji: "biiru", english: "beer" },
    { japanese: "ごはん", romaji: "gohan", english: "rice" },
  ],
  "N5-2": [
    { japanese: "おにぎり", romaji: "onigiri", english: "rice ball" },
    { japanese: "パン", romaji: "pan", english: "bread" },
    { japanese: "お弁当", romaji: "obento", english: "bento box" },
    { japanese: "お会計", romaji: "okaikei", english: "bill" },
    { japanese: "牛乳", romaji: "gyuunyuu", english: "milk" },
    { japanese: "袋", romaji: "fukuro", english: "bag" },
    { japanese: "水", romaji: "mizu", english: "water" },
  ],
  "N5-3": [
    { japanese: "えき", romaji: "eki", english: "station" },
    { japanese: "トイレ", romaji: "toire", english: "toilet" },
    { japanese: "ぎんこう", romaji: "ginkou", english: "bank" },
    { japanese: "ホテル", romaji: "hoteru", english: "hotel" },
    { japanese: "ここ", romaji: "koko", english: "here" },
    { japanese: "そこ", romaji: "soko", english: "there" },
    { japanese: "あそこ", romaji: "asoko", english: "over there" },
  ],
  "N5-4": [
    { japanese: "おきます", romaji: "okimasu", english: "wake up" },
    { japanese: "ねます", romaji: "nemasu", english: "sleep" },
    { japanese: "たべます", romaji: "tabemasu", english: "eat" },
    { japanese: "のみます", romaji: "nomimasu", english: "drink" },
    { japanese: "いきます", romaji: "ikimasu", english: "go" },
    { japanese: "きます", romaji: "kimasu", english: "come" },
  ],
  "N5-5": [
    { japanese: "いま", romaji: "ima", english: "now" },
    { japanese: "なんじ", romaji: "nan-ji", english: "what time" },
    { japanese: "じ", romaji: "ji", english: "o'clock" },
    { japanese: "ふん", romaji: "fun", english: "minute" },
    { japanese: "はん", romaji: "han", english: "half past" },
    { japanese: "あさ", romaji: "asa", english: "morning" },
  ],
  "N5-6": [
    { japanese: "さむい", romaji: "samui", english: "cold" },
    { japanese: "あつい", romaji: "atsui", english: "hot" },
    { japanese: "おいしい", romaji: "oishii", english: "delicious" },
    { japanese: "きれい", romaji: "kirei", english: "beautiful" },
    { japanese: "おもしろい", romaji: "omoshiroi", english: "interesting" },
    { japanese: "たのしい", romaji: "tanoshii", english: "fun" },
  ],
  "N5-7": [
    { japanese: "ひだり", romaji: "hidari", english: "left" },
    { japanese: "みぎ", romaji: "migi", english: "right" },
    { japanese: "まっすぐ", romaji: "massugu", english: "straight" },
    { japanese: "かど", romaji: "kado", english: "corner" },
    { japanese: "しんごう", romaji: "shingou", english: "traffic light" },
  ],
  "N5-8": [
    { japanese: "かぞく", romaji: "kazoku", english: "family" },
    { japanese: "ちち", romaji: "chichi", english: "father" },
    { japanese: "はは", romaji: "haha", english: "mother" },
    { japanese: "あに", romaji: "ani", english: "older brother" },
    { japanese: "あね", romaji: "ane", english: "older sister" },
    { japanese: "おとうと", romaji: "otouto", english: "younger brother" },
  ],
  "N5-9": [
    { japanese: "ほん", romaji: "hon", english: "book" },
    { japanese: "かばん", romaji: "kaban", english: "bag" },
    { japanese: "さいふ", romaji: "saifu", english: "wallet" },
    { japanese: "スマホ", romaji: "sumaho", english: "smartphone" },
    { japanese: "とけい", romaji: "tokei", english: "watch" },
  ],
  "N5-10": [
    { japanese: "うみ", romaji: "umi", english: "sea" },
    { japanese: "やま", romaji: "yama", english: "mountain" },
    { japanese: "こうえん", romaji: "kouen", english: "park" },
    { japanese: "まつり", romaji: "matsuri", english: "festival" },
    { japanese: "りょこう", romaji: "ryokou", english: "travel" },
  ],
  "N4-1": [
    { japanese: "えき", romaji: "eki", english: "station" },
    { japanese: "こうばん", romaji: "kouban", english: "police box" },
    { japanese: "ちかく", romaji: "chikaku", english: "nearby" },
    { japanese: "いきたい", romaji: "ikitai", english: "want to go" },
    { japanese: "たべたい", romaji: "tabetai", english: "want to eat" },
  ],
  "N4-2": [
    { japanese: "きのう", romaji: "kinou", english: "yesterday" },
    { japanese: "おわった", romaji: "owatta", english: "finished" },
    { japanese: "かった", romaji: "katta", english: "bought" },
    { japanese: "した", romaji: "shita", english: "did" },
  ],
  "N3-1": [
    { japanese: "おいしそう", romaji: "oishisou", english: "looks delicious" },
    { japanese: "会議", romaji: "kaigi", english: "meeting" },
    { japanese: "まいる", romaji: "mairu", english: "to go / come (humble)" },
  ],
  "N2-1": [
    { japanese: "について", romaji: "ni tsuite", english: "about / regarding" },
    { japanese: "において", romaji: "ni oite", english: "in / at (formal)" },
    { japanese: "として", romaji: "to shite", english: "as" },
  ],
  "N1-1": [
    { japanese: "をもって", romaji: "wo motte", english: "with this / as of" },
    { japanese: "なり", romaji: "nari", english: "whether... or..." },
    { japanese: "謙遜", romaji: "kenson", english: "humble" },
  ],
};

const defaultVocab: Word[] = [
  { japanese: "日本語", romaji: "nihongo", english: "Japanese language" },
  { japanese: "ともだち", romaji: "tomodachi", english: "friend" },
  { japanese: "せんせい", romaji: "sensei", english: "teacher" },
  { japanese: "べんきょう", romaji: "benkyou", english: "study" },
  { japanese: "がっこう", romaji: "gakkou", english: "school" },
  { japanese: "さくら", romaji: "sakura", english: "cherry blossom" },
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

function generateQuestion(
  qId: string,
  level: string,
  unitTitle: string,
  badge: string,
): Question {
  const unitNumMatch = qId.match(/u(\d+)/);
  const unitNum = unitNumMatch ? unitNumMatch[1] : "1";
  const key = `${level}-${unitNum}`;
  const bank = vocabBank[key] || defaultVocab;

  let hash = 0;
  for (let i = 0; i < qId.length; i++) {
    hash = qId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const rng = (offset: number) => Math.abs(Math.sin(hash + offset));

  const wordIdx = Math.floor(rng(1) * bank.length);
  const word = bank[wordIdx];

  const questionTypes: Question["type"][] = [
    "multiple-choice",
    "sentence-builder",
    "listening",
    "fill-in-the-blank",
    "typing",
  ];
  const type = questionTypes[Math.floor(rng(2) * questionTypes.length)];

  let questionText = "";
  let options: string[] = [];
  let answer = "";
  let hint = "";
  let audioText: string | undefined = undefined;

  const getDistractors = (correct: string, count: number): string[] => {
    const pool = bank.filter(
      (w) => w.english !== correct && w.japanese !== correct,
    );
    const result: string[] = [];
    let idx = 0;
    while (result.length < count && pool.length > 0) {
      const w = pool[Math.floor(rng(idx + 10) * pool.length)];
      if (!result.includes(w.english) && !result.includes(w.japanese)) {
        result.push(w.english);
      }
      idx++;
      if (idx > 20) break;
    }
    const defaultPool = [
      "water",
      "bread",
      "school",
      "friend",
      "book",
      "sushi",
      "ramen",
    ];
    while (result.length < count) {
      const fallback =
        defaultPool[Math.floor(rng(result.length + 50) * defaultPool.length)];
      if (!result.includes(fallback) && fallback !== correct) {
        result.push(fallback);
      }
    }
    return result;
  };

  const getJapaneseDistractors = (correct: string, count: number): string[] => {
    const pool = bank.filter((w) => w.japanese !== correct);
    const result: string[] = [];
    let idx = 0;
    while (result.length < count && pool.length > 0) {
      const w = pool[Math.floor(rng(idx + 20) * pool.length)];
      if (!result.includes(w.japanese)) {
        result.push(w.japanese);
      }
      idx++;
      if (idx > 20) break;
    }
    const defaultPool = ["みず", "おちゃ", "ごはん", "えき", "ほん"];
    while (result.length < count) {
      const fallback =
        defaultPool[Math.floor(rng(result.length + 60) * defaultPool.length)];
      if (!result.includes(fallback) && fallback !== correct) {
        result.push(fallback);
      }
    }
    return result;
  };

  let questionTextId = "";
  let questionTextEn = "";
  let hintId = "";
  let hintEn = "";

  if (type === "multiple-choice") {
    if (rng(3) > 0.5) {
      questionTextId = `Apa arti dari kosakata "${word.japanese}" (${word.romaji})?`;
      questionTextEn = `What is the meaning of the vocabulary "${word.japanese}"?`;
      answer = word.english;
      const distractors = getDistractors(answer, 3);
      options = [answer, ...distractors].sort();
      hintId = `Cara baca (Romaji): "${word.romaji}".`;
      hintEn = `Its Romaji spelling is "${word.romaji}".`;
    } else {
      questionTextId = `Pilih kata Bahasa Jepang yang pas untuk "${word.english}":`;
      questionTextEn = `Choose the correct Japanese word for "${word.english}":`;
      answer = word.japanese;
      const distractors = getJapaneseDistractors(answer, 3);
      options = [answer, ...distractors].sort();
      hintId = `Pengucapan: "${word.romaji}".`;
      hintEn = `Pronounced as "${word.romaji}".`;
    }
  } else if (type === "typing") {
    questionTextId = `Ketik arti Bahasa Inggris dari kosakata "${word.japanese}":`;
    questionTextEn = `Type the English translation for the Japanese word "${word.japanese}":`;
    answer = word.english.toLowerCase();
    options = [];
    hintId = `Tips: Dimulai dengan huruf "${answer.charAt(0)}".`;
    hintEn = `It starts with the letter "${answer.charAt(0)}".`;
  } else if (type === "fill-in-the-blank") {
    questionTextId = `Lengkapi kalimat berikut dengan kata yang tepat: \n「これは ___ です。」 (Artinya: Ini adalah ${word.english}.)`;
    questionTextEn = `Complete the sentence with the correct word: \n「これは ___ です。」 (Translation: This is ${word.english}.)`;
    answer = word.japanese;
    const distractors = getJapaneseDistractors(answer, 3);
    options = [answer, ...distractors].sort();
    hintId = `Tips: Kata yang hilang berarti "${word.english}".`;
    hintEn = `The missing word means "${word.english}".`;
  } else if (type === "listening") {
    questionTextId = `Dengarkan pengucapan audio lalu pilih arti yang pas:`;
    questionTextEn = `Listen to the pronunciation and choose the correct English meaning:`;
    audioText = word.japanese;
    answer = word.english;
    const distractors = getDistractors(answer, 3);
    options = [answer, ...distractors].sort();
    hintId = `Tips: Kamu mendengarkan "${word.romaji}".`;
    hintEn = `You heard "${word.romaji}".`;
  } else {
    questionTextId = `Susun kata berikut agar membentuk kalimat: "Tolong ${word.english}."`;
    questionTextEn = `Arrange the cards to translate: "${word.english} please."`;
    answer = `${word.japanese} を ください`;
    options = [word.japanese, "を", "ください", "es", "ka", "masu"].sort();
    hintId = `Pola kalimat: [Kata] + を + ください.`;
    hintEn = `The pattern is: [Item] + を + ください.`;
  }

  return {
    id: qId,
    type,
    questionText: questionTextId,
    questionTextEn,
    audioText,
    options,
    answer,
    hint: hintId,
    hintEn,
  };
}

function expandLessonsData(base: Lesson[]): Lesson[] {
  const unitsMap = new Map<string, Lesson[]>();
  base.forEach((lesson) => {
    if (!unitsMap.has(lesson.unitId)) {
      unitsMap.set(lesson.unitId, []);
    }
    unitsMap.get(lesson.unitId)!.push(lesson);
  });

  const expanded: Lesson[] = [];

  for (const [unitId, lessons] of unitsMap.entries()) {
    if (unitId.startsWith("basic-")) {
      expanded.push(...lessons);
      continue;
    }

    const targetCount = getDeterministicRandom(unitId, 8, 13);
    const existingCount = lessons.length;

    if (existingCount >= targetCount) {
      expanded.push(...lessons);
      continue;
    }

    const synthesisLesson = lessons.find((l) => l.badge === "Synthesis");
    const normalLessons = lessons.filter((l) => l.badge !== "Synthesis");

    expanded.push(...normalLessons);

    const firstLesson = lessons[0];
    const needed = targetCount - existingCount;

    for (let i = 0; i < needed; i++) {
      const lessonIndex = existingCount + i + 1;
      const lessonId = `${unitId}-l${lessonIndex}`;

      const badgeTypes = [
        "Vocabulary",
        "Grammar",
        "Reading",
        "Listening",
        "Conversation",
      ];
      const badge = badgeTypes[i % badgeTypes.length];

      let icon = "📝";
      if (badge === "Vocabulary") icon = "📚";
      else if (badge === "Reading") icon = "📖";
      else if (badge === "Listening") icon = "🎧";
      else if (badge === "Conversation") icon = "🗣️";

      const title = `Extra Practice: ${badge} Mastery`;
      const description = `Strengthen your understanding of ${
        firstLesson.unitTitle
          .split(":")[1]
          ?.trim()
          .replace(/🎌|🏪|🗺️|☀️|⏰|❄️|🚇|👨‍👩‍👧‍👦|🎒|🗼/g, "") || "this unit's"
      } topics.`;

      const questions: Question[] = [];
      for (let qIdx = 1; qIdx <= 5; qIdx++) {
        const qId = `${lessonId}-q${qIdx}`;
        questions.push(
          generateQuestion(
            qId,
            firstLesson.level,
            firstLesson.unitTitle,
            badge,
          ),
        );
      }

      expanded.push({
        id: lessonId,
        level: firstLesson.level,
        unitId: firstLesson.unitId,
        unitTitle: firstLesson.unitTitle,
        unitDescription: firstLesson.unitDescription,
        unitColor: firstLesson.unitColor,
        title,
        description,
        expReward: 20,
        icon,
        badge,
        questions,
      });
    }

    if (synthesisLesson) {
      expanded.push(synthesisLesson);
    }

    // Generate 25-Question Unit Exam for N5-N1 units
    const examLessonId = `${unitId}-exam`;
    const examQuestions: Question[] = [];
    const unitCleanTitle = firstLesson.unitTitle
      .replace(/Unit \d+:\s*/i, "")
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
      .trim();

    const badgeTypesForExam = [
      "Vocabulary",
      "Grammar",
      "Reading",
      "Listening",
      "Conversation",
    ];

    for (let qIdx = 1; qIdx <= 25; qIdx++) {
      const qId = `${examLessonId}-q${qIdx}`;
      const qBadge = badgeTypesForExam[(qIdx - 1) % badgeTypesForExam.length];
      examQuestions.push(
        generateQuestion(
          qId,
          firstLesson.level,
          firstLesson.unitTitle,
          qBadge,
        ),
      );
    }

    expanded.push({
      id: examLessonId,
      level: firstLesson.level,
      unitId: firstLesson.unitId,
      unitTitle: firstLesson.unitTitle,
      unitDescription: firstLesson.unitDescription,
      unitColor: firstLesson.unitColor,
      title: `Ujian Unit 🏆: ${unitCleanTitle}`,
      description: `Ujian komprehensif 25 soal untuk menguji seluruh materi ${unitCleanTitle}. Minimal 80% untuk lulus!`,
      expReward: 100,
      icon: "🏆",
      badge: "Ujian Unit",
      questions: examQuestions,
    });
  }

  return expanded;
}

export const lessonsData: Lesson[] = expandLessonsData(baseLessonsData);
