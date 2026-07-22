import { SeededRandom } from "./seededRandom";

export interface Quest {
  id: string;
  icon: string;
  title: string;
  target: number;
  rewardGems: number;
  color: string;
  current: number;
  isCompleted: boolean;
  actionUrl: string;
}

// Tiered Quest Templates (Easy, Medium, Hard) to ensure 3 balanced daily quests
const EASY_QUEST_TEMPLATES = [
  {
    icon: "⚡",
    titleTemplate: (target: number) => `Dapatkan ${target} XP hari ini`,
    targetOptions: [20, 30],
    rewardOptions: [20, 25],
    color: "#eab308",
    type: "exp",
    actionUrl: "/lesson",
  },
  {
    icon: "⏱️",
    titleTemplate: (target: number) => `Belajar selama ${target} menit hari ini`,
    targetOptions: [5, 10],
    rewardOptions: [20, 25],
    color: "#3b82f6",
    type: "study_time",
    actionUrl: "/lesson",
  },
  {
    icon: "🔤",
    titleTemplate: (target: number) => `Latihan ${target} karakter Kana hari ini`,
    targetOptions: [10, 15],
    rewardOptions: [20, 25],
    color: "#14b8a6",
    type: "kana_practice",
    actionUrl: "/kana",
  },
  {
    icon: "📝",
    titleTemplate: (target: number) => `Selesaikan ${target} latihan tata bahasa hari ini`,
    targetOptions: [1, 2],
    rewardOptions: [25, 30],
    color: "#4f46e5",
    type: "grammar_practice",
    actionUrl: "/grammar",
  },
  {
    icon: "🎯",
    titleTemplate: (target: number) => `Selesaikan ${target} sesi kuis harian`,
    targetOptions: [1, 2],
    rewardOptions: [25, 30],
    color: "#f97316",
    type: "quiz_practice",
    actionUrl: "/daily-quiz",
  },
];

const MEDIUM_QUEST_TEMPLATES = [
  {
    icon: "📚",
    titleTemplate: (target: number) => `Selesaikan ${target} pelajaran hari ini`,
    targetOptions: [2],
    rewardOptions: [30],
    color: "#10b981",
    type: "lessons",
    actionUrl: "/lesson",
  },
  {
    icon: "🎯",
    titleTemplate: (target: number) => `Selesaikan ${target} pelajaran dengan skor 80%+ hari ini`,
    targetOptions: [2],
    rewardOptions: [40],
    color: "#8b5cf6",
    type: "lessons_score",
    actionUrl: "/lesson",
  },
  {
    icon: "🈸",
    titleTemplate: (target: number) => `Hafalkan ${target} Kanji baru hari ini`,
    targetOptions: [5, 8],
    rewardOptions: [35, 45],
    color: "#ec4899",
    type: "kanji_learned",
    actionUrl: "/jlpt/flashcards?category=kanji",
  },
  {
    icon: "🎧",
    titleTemplate: (target: number) => `Selesaikan ${target} sesi latihan mendengarkan hari ini`,
    targetOptions: [1, 2],
    rewardOptions: [30, 40],
    color: "#6366f1",
    type: "listening_session",
    actionUrl: "/practice",
  },
  {
    icon: "🔄",
    titleTemplate: (target: number) => `Review ${target} kosakata yang pernah dipelajari`,
    targetOptions: [15, 25],
    rewardOptions: [30, 40],
    color: "#a855f7",
    type: "vocabulary_review",
    actionUrl: "/vocabulary",
  },
];

const HARD_QUEST_TEMPLATES = [
  {
    icon: "🏆",
    titleTemplate: (target: number) => `Selesaikan ${target} Unit pelajaran hari ini`,
    targetOptions: [1],
    rewardOptions: [50],
    color: "#06b6d4",
    type: "unit",
    actionUrl: "/lesson",
  },
  {
    icon: "🔥",
    titleTemplate: (target: number) => `Jawab 100% sempurna dalam ${target} kuis hari ini`,
    targetOptions: [1, 2],
    rewardOptions: [40, 60],
    color: "#f97316",
    type: "perfect_quiz",
    actionUrl: "/daily-quiz",
  },
  {
    icon: "🎯",
    titleTemplate: (target: number) => `Pertahankan akurasi 90%+ dalam ${target} kuis berturut-turut`,
    targetOptions: [2, 3],
    rewardOptions: [45, 65],
    color: "#10b981",
    type: "streak_accuracy",
    actionUrl: "/daily-quiz",
  },
  {
    icon: "⚡",
    titleTemplate: (target: number) => `Raih ${target} XP Bonus Kombo hari ini`,
    targetOptions: [20, 35],
    rewardOptions: [30, 45],
    color: "#eab308",
    type: "combo_bonus",
    actionUrl: "/lesson",
  },
  {
    icon: "🗣️",
    titleTemplate: (target: number) => `Selesaikan ${target} latihan pengucapan hari ini`,
    targetOptions: [3, 5],
    rewardOptions: [35, 50],
    color: "#f43f5e",
    type: "speaking_practice",
    actionUrl: "/practice",
  },
];

function pickRandom<T>(arr: T[], rng: SeededRandom): T {
  const idx = Math.floor(rng.next() * arr.length);
  return arr[idx];
}

export function getDailyQuests(dateStr: string, progress: any): Quest[] {
  // Convert dateStr (YYYY-MM-DD) to numeric seed
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = (seed << 5) - seed + dateStr.charCodeAt(i);
    seed |= 0;
  }

  const rng = new SeededRandom(Math.abs(seed) || 12345);

  // Pick 1 Easy, 1 Medium, and 1 Hard quest template for balanced daily progression
  const easyTemplate = pickRandom(EASY_QUEST_TEMPLATES, rng);
  const mediumTemplate = pickRandom(MEDIUM_QUEST_TEMPLATES, rng);
  const hardTemplate = pickRandom(HARD_QUEST_TEMPLATES, rng);

  const selectedTemplates = [easyTemplate, mediumTemplate, hardTemplate];

  const todayExp = progress?.activityLog?.[dateStr] || 0;
  const quizHistory = progress?.quizHistory || [];

  // Strictly filter quizzes completed TODAY (dateStr)
  const todayQuizzes = quizHistory.filter((q: any) => {
    if (!q.timestamp && !q.date) return false;
    const ts = q.timestamp || q.date;
    try {
      const qDate = new Date(ts).toISOString().split("T")[0];
      return qDate === dateStr;
    } catch {
      return false;
    }
  });

  return selectedTemplates.map((t, idx) => {
    const targetIdx = Math.floor(rng.next() * t.targetOptions.length);
    const target = t.targetOptions[targetIdx];
    const rewardGems = t.rewardOptions[targetIdx];
    const questId = `${dateStr}-q${idx + 1}`;

    let current = 0;
    if (t.type === "exp") {
      current = Math.min(target, todayExp);
    } else if (t.type === "lessons") {
      current = Math.min(target, todayQuizzes.length);
    } else if (t.type === "lessons_score") {
      const highScores = todayQuizzes.filter(
        (q: any) => q.total > 0 && q.score / q.total >= 0.8,
      ).length;
      current = Math.min(target, highScores);
    } else if (t.type === "unit") {
      current = Math.min(target, (todayQuizzes.length >= 3 || todayExp >= 50) ? 1 : 0);
    } else if (t.type === "perfect_quiz") {
      const perfects = todayQuizzes.filter(
        (q: any) => q.total > 0 && q.score === q.total,
      ).length;
      current = Math.min(target, perfects);
    } else if (t.type === "study_time") {
      const estimatedMinutes = Math.floor(todayQuizzes.length * 3 + todayExp / 5);
      current = Math.min(target, estimatedMinutes);
    } else if (t.type === "kanji_learned") {
      const totalCorrect = todayQuizzes.reduce((acc: number, q: any) => acc + (q.score || 0), 0);
      current = Math.min(target, totalCorrect);
    } else if (t.type === "listening_session") {
      const listeningCount = todayQuizzes.filter(
        (q: any) => q.type && (q.type.includes("listening") || q.type.includes("audio") || q.type.includes("kana")),
      ).length;
      current = Math.min(target, listeningCount || (todayQuizzes.length > 0 ? 1 : 0));
    } else if (t.type === "kana_practice") {
      const kanaItems = todayQuizzes.reduce((acc: number, q: any) => acc + (q.score || 0), 0);
      current = Math.min(target, kanaItems);
    } else if (t.type === "speaking_practice") {
      const speakingCount = todayQuizzes.filter(
        (q: any) => q.type && (q.type.includes("speaking") || q.type.includes("pronunciation")),
      ).length;
      current = Math.min(target, speakingCount || (todayQuizzes.length > 0 ? 1 : 0));
    } else if (t.type === "vocabulary_review") {
      const totalReviewed = todayQuizzes.reduce((acc: number, q: any) => acc + (q.total || 0), 0);
      current = Math.min(target, totalReviewed);
    } else if (t.type === "combo_bonus") {
      const comboExp = Math.floor(todayExp * 0.4);
      current = Math.min(target, comboExp);
    } else if (t.type === "grammar_practice" || t.type === "quiz_practice") {
      current = Math.min(target, todayQuizzes.length);
    } else if (t.type === "streak_accuracy") {
      let streakAcc = 0;
      let maxStreakAcc = 0;
      for (const q of todayQuizzes) {
        if (q.total > 0 && q.score / q.total >= 0.9) {
          streakAcc++;
          maxStreakAcc = Math.max(maxStreakAcc, streakAcc);
        } else {
          streakAcc = 0;
        }
      }
      current = Math.min(target, maxStreakAcc);
    }

    return {
      id: questId,
      icon: t.icon,
      title: t.titleTemplate(target),
      target,
      rewardGems,
      color: t.color,
      current,
      isCompleted: current >= target,
      actionUrl: t.actionUrl || "/lesson",
    };
  });
}
