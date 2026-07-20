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
}

const QUEST_TEMPLATES = [
  {
    icon: "⚡",
    titleTemplate: (target: number) => `Dapatkan ${target} XP hari ini`,
    targetOptions: [20, 30, 50, 80],
    rewardOptions: [15, 25, 35, 50],
    color: "#eab308",
    type: "exp",
  },
  {
    icon: "🎯",
    titleTemplate: (target: number) => `Selesaikan ${target} kuis dengan skor 80%+ hari ini`,
    targetOptions: [1, 2],
    rewardOptions: [25, 45],
    color: "#8b5cf6",
    type: "quiz_score",
  },
  {
    icon: "🦉",
    titleTemplate: (_target: number) => `Pertahankan streak belajar hari ini`,
    targetOptions: [1],
    rewardOptions: [30],
    color: "#10b981",
    type: "streak",
  },
  {
    icon: "📖",
    titleTemplate: (target: number) => `Selesaikan ${target} latihan / pelajaran hari ini`,
    targetOptions: [1, 2],
    rewardOptions: [20, 40],
    color: "#3b82f6",
    type: "grammar",
  },
  {
    icon: "🔥",
    titleTemplate: (target: number) => `Jawab 100% sempurna dalam ${target} kuis hari ini`,
    targetOptions: [1, 2],
    rewardOptions: [35, 60],
    color: "#f97316",
    type: "perfect_quiz",
  },
];

export function getDailyQuests(dateStr: string, progress: any): Quest[] {
  // Convert dateStr (YYYY-MM-DD) to numeric seed
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = (seed << 5) - seed + dateStr.charCodeAt(i);
    seed |= 0;
  }

  const rng = new SeededRandom(Math.abs(seed) || 12345);

  // Pick 3 distinct quest templates for today
  const shuffledTemplates = [...QUEST_TEMPLATES].sort(() => rng.next() - 0.5);
  const selectedTemplates = shuffledTemplates.slice(0, 3);

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
    } else if (t.type === "quiz_score") {
      const highScores = todayQuizzes.filter(
        (q: any) => q.total > 0 && q.score / q.total >= 0.8,
      ).length;
      current = Math.min(target, highScores);
    } else if (t.type === "streak") {
      current = todayExp > 0 ? 1 : 0;
    } else if (t.type === "grammar") {
      current = Math.min(target, todayExp >= 15 ? 1 : 0);
    } else if (t.type === "perfect_quiz") {
      const perfects = todayQuizzes.filter(
        (q: any) => q.total > 0 && q.score === q.total,
      ).length;
      current = Math.min(target, perfects);
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
    };
  });
}
