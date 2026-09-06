export interface Question {
  id: string;
  type:
    | "multiple-choice"
    | "sentence-builder"
    | "listening"
    | "fill-in-the-blank"
    | "typing";
  questionText: string;
  questionTextEn?: string;
  audioText?: string;
  options: string[];
  optionsEn?: string[];
  answer: string;
  answerEn?: string;
  hint?: string;
  hintEn?: string;
}

export interface Lesson {
  id: string;
  level: "Basic" | "N5" | "N4" | "N3" | "N2" | "N1";
  unitId: string;
  unitTitle: string;
  unitTitleEn?: string;
  unitDescription: string;
  unitDescriptionEn?: string;
  unitColor: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  expReward: number;
  icon: string;
  badge: string;
  badgeEn?: string;
  questions: Question[];
  /** Kana/Kanji characters covered in this lesson (used for mastery tracking) */
  characters?: string[];
}

export interface RoadmapLesson {
  id: string;
  title: string;
  description: string;
  link: string;
  type: "writing" | "vocabulary" | "grammar" | "quiz" | "survival" | "kanji";
  xpReward: number;
}

export interface RoadmapChapter {
  id: string;
  title: string;
  level: "Basic" | "N5" | "N4" | "N3" | "N2" | "N1";
  lessons: RoadmapLesson[];
}
