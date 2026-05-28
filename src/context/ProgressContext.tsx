'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { calculateNextSRS, SRSItem } from '@/lib/srs';
import { GamificationAlert, GamificationAlertData } from '@/components/gamification/GamificationAlert';

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
  getDueItems: () => (SRSItem & { id: string })[];
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
  const [alerts, setAlerts] = useState<GamificationAlertData[]>([]);

  const triggerAlert = useCallback((type: 'level' | 'achievement', title: string, description: string) => {
    const id = Math.random().toString(36).substring(7);
    setAlerts(prev => [...prev, { id, type, title, description }]);
  }, []);

  const closeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  // Load from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
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
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('user-progress', JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  // Handle streak and last active date
  const checkStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    
    if (progress.lastActiveDate === today) return;

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
  }, [progress.lastActiveDate]);

  // Handle EXP and Activity
  const addExp = useCallback((amount: number) => {
    const today = new Date().toISOString().split('T')[0];
    setProgress(prev => {
      const oldLevel = Math.floor(Math.sqrt(prev.exp / 100)) + 1;
      const newExp = prev.exp + amount;
      const newLevel = Math.floor(Math.sqrt(newExp / 100)) + 1;
      
      if (newLevel > oldLevel) {
        triggerAlert('level', `Level Up!`, `You've reached level ${newLevel}! Keep it up!`);
      }

      const newActivityLog = { ...prev.activityLog };
      newActivityLog[today] = (newActivityLog[today] || 0) + amount;
      
      return {
        ...prev,
        exp: newExp,
        activityLog: newActivityLog
      };
    });
    checkStreak();
  }, [triggerAlert, checkStreak]);

  const updateMastery = useCallback((char: string, isCorrect: boolean) => {
    setProgress(prev => {
      const current = prev.mastery[char] || { correct: 0, incorrect: 0, lastAttempt: '' };
      const newMastery = {
        ...prev.mastery,
        [char]: {
          correct: current.correct + (isCorrect ? 1 : 0),
          incorrect: current.incorrect + (isCorrect ? 0 : 1),
          lastAttempt: new Date().toISOString(),
        }
      };

      // Check for achievements
      const totalMastered = Object.keys(newMastery).length;
      const oldTotal = Object.keys(prev.mastery).length;
      
      if (totalMastered === 10 && oldTotal < 10) {
        triggerAlert('achievement', 'Kanji Apprentice', 'You have learned your first 10 items!');
      } else if (totalMastered === 1 && oldTotal === 0) {
        triggerAlert('achievement', 'First Steps', 'Welcome to your learning journey!');
      }

      return {
        ...prev,
        mastery: newMastery
      };
    });
  }, [triggerAlert]);

  const updateSRS = useCallback((char: string, quality: number) => {
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
  }, []);

  const recordQuizResult = useCallback((score: number, total: number, type: string) => {
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
  }, [checkStreak, addExp]);

  const markExerciseCompleted = useCallback((id: string) => {
    setProgress(prev => {
      if (prev.completedExercises?.includes(id)) return prev;
      
      const today = new Date().toISOString().split('T')[0];
      const oldLevel = Math.floor(Math.sqrt(prev.exp / 100)) + 1;
      const newExp = prev.exp + 50;
      const newLevel = Math.floor(Math.sqrt(newExp / 100)) + 1;
      
      if (newLevel > oldLevel) {
        triggerAlert('level', `Level Up!`, `You've reached level ${newLevel}! Keep it up!`);
      }

      const newActivityLog = { ...prev.activityLog };
      newActivityLog[today] = (newActivityLog[today] || 0) + 50;

      return {
        ...prev,
        exp: newExp,
        activityLog: newActivityLog,
        completedExercises: [...(prev.completedExercises || []), id]
      };
    });
    checkStreak();
  }, [triggerAlert, checkStreak]);

  const getDueItems = useCallback(() => {
    const now = new Date();
    return Object.entries(progress.srs)
      .filter(([, item]) => new Date(item.nextReviewDate) <= now)
      .map(([id, item]) => ({ id, ...item }));
  }, [progress.srs]);

  const resetProgress = useCallback(() => {
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
  }, []);

  const contextValue = React.useMemo(() => ({
    progress,
    updateMastery,
    recordQuizResult,
    checkStreak,
    updateSRS,
    addExp,
    markExerciseCompleted,
    getDueItems,
    resetProgress
  }), [
    progress,
    updateMastery,
    recordQuizResult,
    checkStreak,
    updateSRS,
    addExp,
    markExerciseCompleted,
    getDueItems,
    resetProgress
  ]);

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
      {alerts.map(alert => (
        <GamificationAlert 
          key={alert.id} 
          data={alert} 
          onClose={closeAlert} 
        />
      ))}
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
