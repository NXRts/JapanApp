"use client";

import {
  GamificationAlert,
  GamificationAlertData,
} from "@/components/gamification/GamificationAlert";
import { decryptData, encryptData } from "@/lib/encryption";
import { calculateNextLeitner, LeitnerItemState } from "@/lib/leitner";
import { calculateNextSRS, SRSItem } from "@/lib/srs";
import { getDailyQuests } from "@/utils/dailyQuests";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";

/* Toast container — pojok kanan atas, di bawah navbar (56px), semua ukuran layar */
const ToastStack = styled.div`
  position: fixed;
  top: calc(56px + 0.75rem);
  right: 1.25rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  align-items: flex-end;
  pointer-events: none;

  @media (max-width: 640px) {
    right: 0.75rem;
    left: 0.75rem;
    align-items: stretch;
  }
`;

interface MasteryRecord {
  correct: number;
  incorrect: number;
  lastAttempt: string;
}

export interface UserProfile {
  displayName: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
  difficulty: string;
  dailyGoal: string;
}

export interface UserLeagueData {
  currentLeagueId: string; // e.g. "obsidian" or "pearl"
  weekInLeague: number; // e.g. 1
  rank: number; // e.g. 9
  top3Finishes: number; // e.g. 7
  weeklyExp: number; // e.g. 735
}

interface ProgressData {
  mastery: Record<string, MasteryRecord>;
  streak: number;
  lastActiveDate: string | null;
  quizHistory: {
    date: string;
    score: number;
    total: number;
    type: string;
  }[];
  srs: Record<string, SRSItem>;
  leitner: Record<string, LeitnerItemState>;
  exp: number;
  activityLog: Record<string, number>; // Date string -> EXP gained
  completedExercises: string[];
  completedGrammarSections: string[];
  exerciseScores?: Record<string, number>;
  showFurigana: boolean;
  profile?: UserProfile;
  /** true once the user has explicitly entered their name on first launch */
  hasSetName: boolean;
  gems: number;
  hearts: number;
  maxHearts: number;
  lastHeartDepletedAt?: number;
  isSuper: boolean;
  hasStreakFreeze: boolean;
  claimedQuests: string[];
  league?: UserLeagueData;
}

interface ProgressContextType {
  progress: ProgressData;
  updateMastery: (char: string, isCorrect: boolean) => void;
  recordQuizResult: (score: number, total: number, type: string) => void;
  checkStreak: () => void;
  updateSRS: (char: string, quality: number) => void;
  updateLeitnerProgress: (char: string, isCorrect: boolean) => void;
  addExp: (amount: number) => void;
  resetProgress: () => void;
  markExerciseCompleted: (id: string) => void;
  updateExerciseScore: (id: string, score: number) => void;
  getDueItems: () => (SRSItem & { id: string })[];
  updateProfile: (profileData: Partial<UserProfile>) => void;
  markGrammarSectionCompleted: (key: string) => void;
  setShowFurigana: (show: boolean) => void;
  /** First-launch onboarding: sets the display name and marks hasSetName true */
  initializeName: (name: string) => void;
  addGems: (amount: number) => void;
  spendGems: (amount: number) => boolean;
  refillHearts: () => void;
  deductHeart: () => void;
  toggleSuper: () => void;
  buyStreakFreeze: () => boolean;
  claimQuestReward: (questId: string, rewardGems: number) => void;
  timeUntilNextHeart: number;
  timeUntilFullRefill: number;
  /** Whether the user progress has finished loading from localStorage */
  isLoaded: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined,
);

export const DEFAULT_PROFILE: UserProfile = {
  displayName: "JapanApp Learner",
  username: "japan_learner",
  email: "learner@japanapp.com",
  bio: "Belajar bahasa Jepang untuk menguasai Kanji dan percakapan harian. Target lulus JLPT N5 tahun ini! 🎯",
  avatar: "🦊",
  difficulty: "pemula",
  dailyGoal: "50",
};

export const DEFAULT_LEAGUE: UserLeagueData = {
  currentLeagueId: "bronze",
  weekInLeague: 1,
  rank: 1,
  top3Finishes: 0,
  weeklyExp: 0,
};

const INITIAL_DATA: ProgressData = {
  mastery: {},
  streak: 0,
  lastActiveDate: null,
  quizHistory: [],
  srs: {},
  leitner: {},
  exp: 0,
  activityLog: {},
  completedExercises: [],
  completedGrammarSections: [],
  showFurigana: true,
  profile: DEFAULT_PROFILE,
  hasSetName: true,
  gems: 100,
  hearts: 7,
  maxHearts: 7,
  lastHeartDepletedAt: undefined,
  isSuper: false,
  hasStreakFreeze: false,
  claimedQuests: [],
  league: DEFAULT_LEAGUE,
};

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressData>(INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [alerts, setAlerts] = useState<GamificationAlertData[]>([]);

  const triggerAlert = useCallback(
    (type: "level" | "achievement", title: string, description: string) => {
      const id = Math.random().toString(36).substring(7);
      setAlerts((prev) => [...prev, { id, type, title, description }]);
    },
    [],
  );

  const closeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  // Load from localStorage
  useEffect(() => {
    const timer = setTimeout(async () => {
      const saved = localStorage.getItem("user-progress");

      let legacyCompletedSections: string[] = [];
      let legacyCompletedExercises: string[] = [];
      try {
        const savedSections = localStorage.getItem(
          "grammar_completed_sections",
        );
        if (savedSections) {
          legacyCompletedSections = JSON.parse(savedSections);
        }
      } catch (e) {
        console.error("Failed to parse legacy grammar completed sections", e);
      }
      try {
        const savedExercises = localStorage.getItem(
          "grammar_completed_exercises",
        );
        if (savedExercises) {
          legacyCompletedExercises = JSON.parse(savedExercises);
        }
      } catch (e) {
        console.error("Failed to parse legacy grammar completed exercises", e);
      }

      if (saved) {
        try {
          let parsed = null;

          if (saved.startsWith("U2FsdGVkX1") || !saved.trim().startsWith("{")) {
            parsed = await decryptData(saved);
          }

          if (!parsed && saved.trim().startsWith("{")) {
            parsed = JSON.parse(saved);
          }

          if (parsed) {
            const mergedCompletedSections = Array.from(
              new Set([
                ...(parsed.completedGrammarSections || []),
                ...legacyCompletedSections,
              ]),
            );
            const mergedCompletedExercises = Array.from(
              new Set([
                ...(parsed.completedExercises || []),
                ...legacyCompletedExercises,
              ]),
            );

            const candidateProgress = {
              ...INITIAL_DATA,
              ...parsed,
              srs: parsed.srs || {},
              leitner: parsed.leitner || {},
              mastery: parsed.mastery || {},
              quizHistory: parsed.quizHistory || [],
              streak: parsed.streak || 0,
              exp: parsed.exp || 0,
              activityLog: parsed.activityLog || {},
              completedExercises: mergedCompletedExercises,
              completedGrammarSections: mergedCompletedSections,
              showFurigana:
                typeof parsed.showFurigana === "boolean"
                  ? parsed.showFurigana
                  : true,
              profile: {
                ...DEFAULT_PROFILE,
                ...(parsed.profile || {}),
              },
              hasSetName: true,
              gems:
                typeof parsed.gems === "number" && parsed.gems !== 800
                  ? parsed.gems
                  : 100,
              hearts: typeof parsed.hearts === "number" ? parsed.hearts : 7,
              maxHearts: 7,
              isSuper:
                typeof parsed.isSuper === "boolean" ? parsed.isSuper : false,
              hasStreakFreeze:
                typeof parsed.hasStreakFreeze === "boolean"
                  ? parsed.hasStreakFreeze
                  : false,
              claimedQuests: Array.isArray(parsed.claimedQuests)
                ? parsed.claimedQuests
                : [],
              league: (() => {
                const savedLeague = parsed.league || DEFAULT_LEAGUE;
                // Auto-correct legacy "obsidian" default for users with low EXP
                if (
                  savedLeague.currentLeagueId === "obsidian" &&
                  (parsed.exp || 0) < 1000
                ) {
                  return {
                    currentLeagueId: "bronze",
                    weekInLeague: 1,
                    rank: 1,
                    top3Finishes: 0,
                    weeklyExp: parsed.exp || 0,
                  };
                }
                return {
                  ...DEFAULT_LEAGUE,
                  ...savedLeague,
                };
              })(),
            };

            // Server-side validation (anti-cheat) — runs after UI hydration
            // Runs in background; on failure falls back gracefully without losing local data
            try {
              const res = await fetch("/api/progress/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(candidateProgress),
              });

              if (!res.ok) {
                // Preserve local candidateProgress so user data is retained safely
                setProgress(candidateProgress);
                setIsLoaded(true);
                return;
              }
            } catch {
              // Network error — allow progress (fail open for offline support)
            }

            setProgress(candidateProgress);
          }
        } catch (e) {
          console.error("Failed to parse progress data", e);
        }
      } else {
        if (
          legacyCompletedSections.length > 0 ||
          legacyCompletedExercises.length > 0
        ) {
          setProgress((prev) => ({
            ...prev,
            completedGrammarSections: legacyCompletedSections,
            completedExercises: legacyCompletedExercises,
          }));
        }
      }
      setIsLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage
  useEffect(() => {
    const saveProgress = async () => {
      if (isLoaded) {
        try {
          const encrypted = await encryptData(progress);
          if (encrypted) {
            localStorage.setItem("user-progress", encrypted);
          }
        } catch (e) {
          console.error("Failed to save progress:", e);
        }
      }
    };
    saveProgress();
  }, [progress, isLoaded]);

  // Handle streak and last active date
  const checkStreak = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];

    if (progress.lastActiveDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    setProgress((prev) => {
      let newStreak = prev.streak;
      if (prev.lastActiveDate === yesterdayStr) {
        newStreak += 1;
      } else if (prev.lastActiveDate !== today) {
        newStreak = 1;
      }

      return {
        ...prev,
        streak: newStreak,
        lastActiveDate: today,
      };
    });
  }, [progress.lastActiveDate]);

  // Helper to automatically claim completed daily quests
  const autoClaimCompletedQuests = useCallback(
    (prev: ProgressData): ProgressData => {
      const dateStr = new Date().toISOString().split("T")[0];
      const todayQuests = getDailyQuests(dateStr, prev);
      const claimed = prev.claimedQuests || [];

      let newGems = prev.gems !== undefined ? prev.gems : 100;
      let newClaimed = [...claimed];
      let updated = false;

      for (const q of todayQuests) {
        if (q.isCompleted && !newClaimed.includes(q.id)) {
          newGems += q.rewardGems;
          newClaimed.push(q.id);
          updated = true;
          triggerAlert(
            "achievement",
            "Misi Harian Selesai! 🎁",
            `Misi "${q.title}" otomatis diklaim (+${q.rewardGems} 💎)`,
          );
        }
      }

      if (!updated) return prev;

      return {
        ...prev,
        gems: newGems,
        claimedQuests: newClaimed,
      };
    },
    [triggerAlert],
  );

  // Handle EXP and Activity
  const addExp = useCallback(
    (amount: number) => {
      const today = new Date().toISOString().split("T")[0];
      setProgress((prev) => {
        const oldLevel = Math.floor(Math.sqrt(prev.exp / 100)) + 1;
        const newExp = prev.exp + amount;
        const newLevel = Math.floor(Math.sqrt(newExp / 100)) + 1;

        if (newLevel > oldLevel) {
          triggerAlert(
            "level",
            `Level Up!`,
            `You've reached level ${newLevel}! Keep it up!`,
          );
        }

        const newActivityLog = { ...prev.activityLog };
        newActivityLog[today] = (newActivityLog[today] || 0) + amount;

        const currentLeague = prev.league || DEFAULT_LEAGUE;
        const updatedLeague = {
          ...currentLeague,
          weeklyExp: (currentLeague.weeklyExp || 0) + amount,
        };

        const nextState = {
          ...prev,
          exp: newExp,
          activityLog: newActivityLog,
          league: updatedLeague,
        };

        return autoClaimCompletedQuests(nextState);
      });
      checkStreak();
    },
    [triggerAlert, checkStreak, autoClaimCompletedQuests],
  );

  const updateMastery = useCallback(
    (char: string, isCorrect: boolean) => {
      setProgress((prev) => {
        const current = prev.mastery[char] || {
          correct: 0,
          incorrect: 0,
          lastAttempt: "",
        };
        const newMastery = {
          ...prev.mastery,
          [char]: {
            correct: current.correct + (isCorrect ? 1 : 0),
            incorrect: isCorrect
              ? Math.max(0, current.incorrect - 1)
              : current.incorrect + 1,
            lastAttempt: new Date().toISOString(),
          },
        };

        // Check for achievements
        const totalMastered = Object.keys(newMastery).length;
        const oldTotal = Object.keys(prev.mastery).length;

        if (totalMastered === 10 && oldTotal < 10) {
          triggerAlert(
            "achievement",
            "Kanji Apprentice",
            "You have learned your first 10 items!",
          );
        } else if (totalMastered === 1 && oldTotal === 0) {
          triggerAlert(
            "achievement",
            "First Steps",
            "Welcome to your learning journey!",
          );
        }

        const nextState = {
          ...prev,
          mastery: newMastery,
        };

        return autoClaimCompletedQuests(nextState);
      });
    },
    [triggerAlert, autoClaimCompletedQuests],
  );

  const updateSRS = useCallback(
    (char: string, quality: number) => {
      setProgress((prev) => {
        const currentItem = prev.srs[char];
        const nextItem = calculateNextSRS(currentItem, quality);
        const nextState = {
          ...prev,
          srs: {
            ...prev.srs,
            [char]: nextItem,
          },
        };
        return autoClaimCompletedQuests(nextState);
      });
    },
    [autoClaimCompletedQuests],
  );

  const updateLeitnerProgress = useCallback(
    (char: string, isCorrect: boolean) => {
      setProgress((prev) => {
        const currentItem = prev.leitner?.[char];
        const nextResult = calculateNextLeitner(
          currentItem?.box || 1,
          isCorrect,
          currentItem?.lastReviewedAt,
        );
        const nextState = {
          ...prev,
          leitner: {
            ...prev.leitner,
            [char]: {
              box: nextResult.newBox,
              lastReviewedAt: new Date().toISOString(),
              nextReviewAt: nextResult.nextReviewAt,
            },
          },
        };
        return autoClaimCompletedQuests(nextState);
      });
      addExp(isCorrect ? 10 : 2);
    },
    [addExp, autoClaimCompletedQuests],
  );

  const recordQuizResult = useCallback(
    (score: number, total: number, type: string) => {
      checkStreak(); // Record activity on quiz completion
      addExp(score * 10); // Reward 10 EXP per correct answer
      setProgress((prev) => {
        const nextState = {
          ...prev,
          quizHistory: [
            {
              date: new Date().toISOString(),
              score,
              total,
              type,
            },
            ...prev.quizHistory.slice(0, 49), // Keep last 50
          ],
        };
        return autoClaimCompletedQuests(nextState);
      });
    },
    [checkStreak, addExp, autoClaimCompletedQuests],
  );

  const markExerciseCompleted = useCallback(
    (id: string) => {
      setProgress((prev) => {
        if (prev.completedExercises?.includes(id)) return prev;

        const today = new Date().toISOString().split("T")[0];
        const oldLevel = Math.floor(Math.sqrt(prev.exp / 100)) + 1;
        const newExp = prev.exp + 50;
        const newLevel = Math.floor(Math.sqrt(newExp / 100)) + 1;

        if (newLevel > oldLevel) {
          triggerAlert(
            "level",
            `Level Up!`,
            `You've reached level ${newLevel}! Keep it up!`,
          );
        }

        const newActivityLog = { ...prev.activityLog };
        newActivityLog[today] = (newActivityLog[today] || 0) + 50;

        const nextState = {
          ...prev,
          exp: newExp,
          activityLog: newActivityLog,
          completedExercises: [...(prev.completedExercises || []), id],
          quizHistory: [
            {
              date: new Date().toISOString(),
              score: 5,
              total: 5,
              type: "lesson",
              id,
            },
            ...(prev.quizHistory || []).slice(0, 49),
          ],
        };

        return autoClaimCompletedQuests(nextState);
      });
      checkStreak();
    },
    [triggerAlert, checkStreak, autoClaimCompletedQuests],
  );

  const updateExerciseScore = useCallback(
    (id: string, score: number) => {
      setProgress((prev) => {
        const currentScores = prev.exerciseScores || {};
        const prevScore = currentScores[id] || 0;
        const newScore = Math.max(prevScore, Math.min(100, Math.max(0, score)));
        if (prevScore === newScore && currentScores[id] !== undefined) return prev;

        const nextState = {
          ...prev,
          exerciseScores: {
            ...currentScores,
            [id]: newScore,
          },
        };
        return autoClaimCompletedQuests(nextState);
      });
    },
    [autoClaimCompletedQuests],
  );

  const getDueItems = useCallback(() => {
    const now = new Date();
    return Object.entries(progress.srs)
      .filter(([, item]) => new Date(item.nextReviewDate) <= now)
      .map(([id, item]) => ({ id, ...item }));
  }, [progress.srs]);

  const updateProfile = useCallback((profileData: Partial<UserProfile>) => {
    setProgress((prev) => ({
      ...prev,
      profile: {
        ...DEFAULT_PROFILE,
        ...(prev.profile || {}),
        ...profileData,
      },
    }));
  }, []);

  const markGrammarSectionCompleted = useCallback((key: string) => {
    setProgress((prev) => {
      if (prev.completedGrammarSections?.includes(key)) return prev;
      return {
        ...prev,
        completedGrammarSections: [
          ...(prev.completedGrammarSections || []),
          key,
        ],
      };
    });
  }, []);

  const setShowFurigana = useCallback((show: boolean) => {
    setProgress((prev) => ({
      ...prev,
      showFurigana: show,
    }));
  }, []);

  /** First-launch onboarding handler — stores display name and unlocks learning routes */
  const initializeName = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setProgress((prev) => ({
      ...prev,
      hasSetName: true,
      profile: {
        ...DEFAULT_PROFILE,
        ...(prev.profile || {}),
        displayName: trimmed,
        username: trimmed.toLowerCase().replace(/\s+/g, "_"),
      },
    }));
  }, []);

  const resetProgress = useCallback(() => {
    if (typeof window !== "undefined") {
      // 1. Atomic wipe of all storage (Learning + Theme settings)
      localStorage.clear();
      sessionStorage.clear();

      // 2. Comprehensive cookie sweep for both basic path and current domain
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name =
          eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie =
          name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        document.cookie =
          name +
          "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" +
          window.location.hostname;
      }

      // 3. Instant hard-navigation to ensure a clean slate and prevent React from re-saving state
      window.location.replace("/");
    }
  }, []);

  const addGems = useCallback((amount: number) => {
    setProgress((prev) => ({ ...prev, gems: (prev.gems || 0) + amount }));
  }, []);

  const spendGems = useCallback((amount: number) => {
    let success = false;
    setProgress((prev) => {
      const currentGems = prev.gems !== undefined ? prev.gems : 100;
      if (currentGems >= amount) {
        success = true;
        return { ...prev, gems: currentGems - amount };
      }
      return prev;
    });
    return success;
  }, []);

  const [timeUntilNextHeart, setTimeUntilNextHeart] = useState<number>(0);
  const [timeUntilFullRefill, setTimeUntilFullRefill] = useState<number>(0);

  // Auto-refill engine effect: +1 heart every ~25.7 minutes (7 hearts in 3 hours / 180 mins)
  useEffect(() => {
    if (!isLoaded) return;

    const MAX_HEARTS = 7;
    const TOTAL_REFILL_MS = 180 * 60 * 1000; // 3 hours = 180 mins
    const MS_PER_HEART = TOTAL_REFILL_MS / MAX_HEARTS; // ~25.71 mins per heart

    const checkRefill = () => {
      const now = Date.now();
      const currentHearts = progress.hearts ?? MAX_HEARTS;

      if (currentHearts >= MAX_HEARTS || progress.isSuper) {
        setTimeUntilNextHeart(0);
        setTimeUntilFullRefill(0);
        if (progress.lastHeartDepletedAt !== undefined) {
          setProgress((prev) => ({ ...prev, lastHeartDepletedAt: undefined }));
        }
        return;
      }

      const depletedAt = progress.lastHeartDepletedAt || now;
      const elapsed = Math.max(0, now - depletedAt);
      const heartsGained = Math.floor(elapsed / MS_PER_HEART);

      if (heartsGained > 0) {
        const nextHearts = Math.min(MAX_HEARTS, currentHearts + heartsGained);
        const nextDepletedAt =
          nextHearts >= MAX_HEARTS
            ? undefined
            : depletedAt + heartsGained * MS_PER_HEART;

        setProgress((prev) => ({
          ...prev,
          hearts: nextHearts,
          lastHeartDepletedAt: nextDepletedAt,
        }));
      }

      // Calculate remaining countdown timers (in seconds)
      const remMs = MS_PER_HEART - (elapsed % MS_PER_HEART);
      const remainingSecondsForNext = Math.ceil(remMs / 1000);
      setTimeUntilNextHeart(remainingSecondsForNext);

      const neededHearts = MAX_HEARTS - currentHearts;
      const remainingTotalMs = (neededHearts - 1) * MS_PER_HEART + remMs;
      setTimeUntilFullRefill(Math.ceil(remainingTotalMs / 1000));
    };

    checkRefill();
    const interval = setInterval(checkRefill, 1000);
    return () => clearInterval(interval);
  }, [
    isLoaded,
    progress.hearts,
    progress.isSuper,
    progress.lastHeartDepletedAt,
  ]);

  const refillHearts = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      hearts: 7,
      maxHearts: 7,
      lastHeartDepletedAt: undefined,
    }));
  }, []);

  const deductHeart = useCallback(() => {
    setProgress((prev) => {
      if (prev.isSuper) return prev;
      const currentHearts = prev.hearts !== undefined ? prev.hearts : 7;
      if (currentHearts <= 0) return prev;

      const nextHearts = currentHearts - 1;
      const now = Date.now();
      const nextDepletedAt = prev.lastHeartDepletedAt || now;

      return {
        ...prev,
        hearts: nextHearts,
        lastHeartDepletedAt: nextDepletedAt,
      };
    });
  }, []);

  const toggleSuper = useCallback(() => {
    setProgress((prev) => {
      const nextSuper = !prev.isSuper;
      triggerAlert(
        "achievement",
        nextSuper ? "Super JapanApp Aktif! 👑" : "Mode Standar Aktif",
        nextSuper
          ? "Nikmati Nyawa Tak Terbatas, Bebas Iklan & Fitur Eksklusif!"
          : "Kamu kembali ke mode standar gratis.",
      );
      return {
        ...prev,
        isSuper: nextSuper,
        hearts: nextSuper ? 7 : prev.hearts,
        lastHeartDepletedAt: nextSuper ? undefined : prev.lastHeartDepletedAt,
      };
    });
  }, [triggerAlert]);

  const buyStreakFreeze = useCallback(() => {
    let success = false;
    setProgress((prev) => {
      const currentGems = prev.gems !== undefined ? prev.gems : 100;
      if (currentGems >= 200 && !prev.hasStreakFreeze) {
        success = true;
        triggerAlert(
          "achievement",
          "Bekukan Streak Diaktifkan! 🛡️",
          "Streak kamu dilindungi selama 1 hari jika kamu lupa belajar.",
        );
        return {
          ...prev,
          gems: currentGems - 200,
          hasStreakFreeze: true,
        };
      }
      return prev;
    });
    return success;
  }, [triggerAlert]);

  const claimQuestReward = useCallback(
    (questId: string, _rewardGems: number) => {
      setProgress((prev) => {
        const claimed = prev.claimedQuests || [];
        if (claimed.includes(questId)) return prev;

        const dateStr = new Date().toISOString().split("T")[0];
        const todayQuests = getDailyQuests(dateStr, prev);
        const quest = todayQuests.find((q) => q.id === questId);

        // Anti-cheat: Ensure quest exists and is actually completed today!
        if (!quest || !quest.isCompleted) {
          triggerAlert(
            "achievement",
            "Misi Belum Selesai ⚠️",
            "Selesaikan misi terlebih dahulu sebelum mengklaim!",
          );
          return prev;
        }

        const actualReward = quest.rewardGems;
        triggerAlert(
          "achievement",
          "Hadiah Diklaim! 🎁",
          `Kamu mendapatkan +${actualReward} Permata 💎`,
        );
        return {
          ...prev,
          gems: (prev.gems || 0) + actualReward,
          claimedQuests: [...claimed, questId],
        };
      });
    },
    [triggerAlert],
  );

  const contextValue = React.useMemo(
    () => ({
      progress,
      updateMastery,
      recordQuizResult,
      checkStreak,
      updateSRS,
      updateLeitnerProgress,
      addExp,
      markExerciseCompleted,
      updateExerciseScore,
      getDueItems,
      resetProgress,
      updateProfile,
      markGrammarSectionCompleted,
      setShowFurigana,
      initializeName,
      addGems,
      spendGems,
      refillHearts,
      deductHeart,
      toggleSuper,
      buyStreakFreeze,
      claimQuestReward,
      timeUntilNextHeart,
      timeUntilFullRefill,
      isLoaded,
    }),
    [
      progress,
      updateMastery,
      recordQuizResult,
      checkStreak,
      updateSRS,
      updateLeitnerProgress,
      addExp,
      markExerciseCompleted,
      updateExerciseScore,
      getDueItems,
      resetProgress,
      updateProfile,
      markGrammarSectionCompleted,
      setShowFurigana,
      initializeName,
      addGems,
      spendGems,
      refillHearts,
      deductHeart,
      toggleSuper,
      buyStreakFreeze,
      claimQuestReward,
      timeUntilNextHeart,
      timeUntilFullRefill,
      isLoaded,
    ],
  );

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
      <ToastStack>
        {alerts.map((alert) => (
          <GamificationAlert key={alert.id} data={alert} onClose={closeAlert} />
        ))}
      </ToastStack>
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
