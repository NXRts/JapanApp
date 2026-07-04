export interface Question {
  id: string;
  type:
    | "multiple-choice"
    | "sentence-builder"
    | "listening"
    | "fill-in-the-blank"
    | "typing";
  questionText: string;
  audioText?: string;
  options: string[];
  answer: string;
  hint?: string;
}

export interface Lesson {
  id: string;
  level: "Basic" | "N5" | "N4" | "N3" | "N2" | "N1";
  unitId: string;
  unitTitle: string;
  unitDescription: string;
  unitColor: string;
  title: string;
  description: string;
  expReward: number;
  icon: string;
  badge: string;
  questions: Question[];
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
