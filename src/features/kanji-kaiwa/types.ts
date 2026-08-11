export interface KaiwaTargetKanji {
  char: string;
  romaji: string;
  meaning: string;
  onyomi: string[];
  kunyomi: string[];
  strokes?: number;
}

export interface KaiwaDialogueLine {
  id: string;
  speaker: string;
  avatar: string;
  speakerRole: "left" | "right";
  textJp: string; // Native Japanese text containing Kanji
  furigana: string; // Furigana reading annotated
  textRomaji: string;
  textId: string; // Indonesian translation
  targetKanjiChar?: string;
  audioText?: string;
}

export interface KaiwaQuizQuestion {
  id: string;
  dialogueContext: string; // e.g. "Tanaka: 日曜日に ___ に行きましょう！"
  targetKanji: string;
  options: {
    char: string;
    reading: string;
    meaning: string;
  }[];
  correctAnswer: string;
  explanation: string;
}

export interface KaiwaScenario {
  id: string;
  title: string;
  japaneseTitle: string;
  level: "N5" | "N4" | "N3";
  description: string;
  icon: string;
  themeColor: string;
  targetKanjiList: KaiwaTargetKanji[];
  dialogueLines: KaiwaDialogueLine[];
  quizQuestions: KaiwaQuizQuestion[];
}
