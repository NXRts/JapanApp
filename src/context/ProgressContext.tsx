'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

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
}

interface ProgressContextType {
  progress: ProgressData;
  updateMastery: (char: string, isCorrect: boolean) => void;
  recordQuizResult: (score: number, total: number, type: string) => void;
  checkStreak: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const INITIAL_DATA: ProgressData = {
  mastery: {},
  streak: 0,
  lastActiveDate: null,
  quizHistory: [],
};

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressData>(INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('user-progress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
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

  const recordQuizResult = (score: number, total: number, type: string) => {
    checkStreak(); // Record activity on quiz completion
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

  return (
    <ProgressContext.Provider value={{ progress, updateMastery, recordQuizResult, checkStreak }}>
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
