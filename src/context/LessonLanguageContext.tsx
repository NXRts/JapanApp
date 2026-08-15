"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type LessonLanguage = "id" | "en";

interface LessonLanguageContextType {
  lessonLanguage: LessonLanguage;
  setLessonLanguage: (lang: LessonLanguage) => void;
}

const LessonLanguageContext = createContext<LessonLanguageContextType>({
  lessonLanguage: "id",
  setLessonLanguage: () => {},
});

const STORAGE_KEY = "japanapp_lesson_lang";

export const LessonLanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lessonLanguage, setLessonLanguageState] = useState<LessonLanguage>("id");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "id" || saved === "en") {
        setLessonLanguageState(saved);
      }
    } catch {
      // Fallback to "id" default
    }
  }, []);

  const setLessonLanguage = (lang: LessonLanguage) => {
    setLessonLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  return (
    <LessonLanguageContext.Provider
      value={{ lessonLanguage, setLessonLanguage }}
    >
      {children}
    </LessonLanguageContext.Provider>
  );
};

export const useLessonLanguage = () => useContext(LessonLanguageContext);
