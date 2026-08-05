export type TrackType = "kana" | "kanji";
export type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export interface DailyGoalConfig {
  targetPerDay: number; // e.g. 3, 5, 10
  activeTrack: TrackType;
  selectedLevel: JLPTLevel;
}

export interface JukugoWord {
  word: string;
  reading: string;
  meaning: string;
}

export interface ConfusableKanjiInfo {
  char: string;
  meaning: string;
  differenceNote: string;
}

export interface WeakBankItem {
  char: string;
  errorCount: number;
  lastFailedDate: string;
}

export interface DetailedItemData {
  char: string;
  romaji: string;
  meaning: string;
  onyomi?: string[];
  kunyomi?: string[];
  jukugo?: JukugoWord[];
  similarKanji?: ConfusableKanjiInfo[];
  strokes?: number;
  strokePaths?: string[]; // SVG Path data array for Stroke Writer
}

export type QuizType =
  | "multiple-choice"
  | "type-reading"
  | "match-matrix"
  | "stroke-order";

export interface QuizQuestion {
  id: string;
  type: QuizType;
  promptChar: string;
  questionText: string;
  correctAnswer: string;
  options?: string[]; // For multiple choice
  matrixPairs?: { char: string; meaning: string }[]; // For matrix matching
  strokeOptions?: string[]; // For stroke order guess
}

export interface QuizResultSummary {
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  expEarned: number;
  masteredChars: string[];
  needsReviewChars: string[];
}
