'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { calculateNextSRS, SRSItem } from '@/lib/srs';

interface MasteryRecord {
  correct: number;
  incorrect: number;
  lastAttempt: string;
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
  exp: number;
  activityLog: Record<string, number>; // Date string -> EXP gained
  completedExercises: string[];
}

interface ProgressContextType {
  progress: ProgressData;
  updateMastery: (char: string, isCorrect: boolean) => void;
  recordQuizResult: (score: number, total: number, type: string) => void;
  checkStreak: () => void;
  updateSRS: (char: string, quality: number) => void;
  addExp: (amount: number) => void;
  resetProgress: () => void;
  markExerciseCompleted: (id: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const INITIAL_DATA: ProgressData = {
  mastery: {},
  streak: 0,
  lastActiveDate: null,
  quizHistory: [],
  srs: {},
  exp: 0,
  activityLog: {},
  completedExercises: [],
};

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressData>(INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('user-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress({
          ...INITIAL_DATA,
          ...parsed,
          srs: parsed.srs || {},
          mastery: parsed.mastery || {},
          quizHistory: parsed.quizHistory || [],
          streak: parsed.streak || 0,
          exp: parsed.exp || 0,
          activityLog: parsed.activityLog || {},
          completedExercises: parsed.completedExercises || [],
        });
      } catch (e) {
        console.error('Failed to parse progress data', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('user-progress', JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  // Handle EXP and Activity
  const addExp = (amount: number) => {
    const today = new Date().toISOString().split('T')[0];
    setProgress(prev => {
      const newActivityLog = { ...prev.activityLog };
      newActivityLog[today] = (newActivityLog[today] || 0) + amount;
      
      return {
        ...prev,
        exp: prev.exp + amount,
        activityLog: newActivityLog
      };
    });
    checkStreak();
  };

  // Handle streak and last active date
  const checkStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (progress.lastActiveDate === today) return;

    const lastDate = progress.lastActiveDate ? new Date(progress.lastActiveDate) : null;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    setProgress(prev => {
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
  };

  const updateMastery = (char: string, isCorrect: boolean) => {
    setProgress(prev => {
      const current = prev.mastery[char] || { correct: 0, incorrect: 0, lastAttempt: '' };
      return {
        ...prev,
        mastery: {
          ...prev.mastery,
          [char]: {
            correct: current.correct + (isCorrect ? 1 : 0),
            incorrect: current.incorrect + (isCorrect ? 0 : 1),
            lastAttempt: new Date().toISOString(),
          }
        }
      };
    });
  };

  const updateSRS = (char: string, quality: number) => {
    setProgress(prev => {
      const currentItem = prev.srs[char];
      const nextItem = calculateNextSRS(currentItem, quality);
      return {
        ...prev,
        srs: {
          ...prev.srs,
          [char]: nextItem
        }
      };
    });
  };

  const recordQuizResult = (score: number, total: number, type: string) => {
    checkStreak(); // Record activity on quiz completion
    addExp(score * 10); // Reward 10 EXP per correct answer
    setProgress(prev => ({
      ...prev,
      quizHistory: [
        {
          date: new Date().toISOString(),
          score,
          total,
          type,
        },
        ...prev.quizHistory.slice(0, 49), // Keep last 50
      ]
    }));
  };

  const markExerciseCompleted = (id: string) => {
    setProgress(prev => {
      if (prev.completedExercises?.includes(id)) return prev;
      return {
        ...prev,
        completedExercises: [...(prev.completedExercises || []), id]
      };
    });
  };

  const contextValue = React.useMemo(() => ({
    progress,
    updateMastery,
    recordQuizResult,
    checkStreak,
    updateSRS,
    addExp,
    markExerciseCompleted,
    resetProgress: () => {
      if (typeof window !== 'undefined') {
        // 1. Atomic wipe of all storage (Learning + Theme settings)
        localStorage.clear();
        sessionStorage.clear();

        // 2. Comprehensive cookie sweep for both basic path and current domain
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=' + window.location.hostname;
        }

        // 3. Instant hard-navigation to ensure a clean slate and prevent React from re-saving state
        window.location.replace('/');
      }
    }
  }), [progress]);

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
