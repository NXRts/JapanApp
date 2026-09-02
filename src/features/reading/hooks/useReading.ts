"use client";

import { useState, useCallback, useMemo } from "react";
import { readingPassages, ReadingPassage } from "@/data/reading";
import { useProgress } from "@/context/ProgressContext";

export interface InspectedWordData {
  kanji?: string;
  reading: string;
  romaji: string;
  meaning: string;
  level?: string;
}

export function useReading() {
  const { progress, addExp, addGems } = useProgress();

  // Filters state
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");

  // Reader display options
  const [showFurigana, setShowFurigana] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [translationLang, setTranslationLang] = useState<"ID" | "EN">("ID");

  // Word inspector modal state
  const [inspectedWord, setInspectedWord] = useState<InspectedWordData | null>(null);

  // Audio Speech Synthesis (TTS)
  const speakText = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    // Clean HTML tags like <ruby> <rt>
    const cleanText = text.replace(/<rt>.*?<\/rt>/g, "").replace(/<[^>]+>/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85; // Slightly slower for clear learning pronunciation
    window.speechSynthesis.speak(utterance);
  }, []);

  // Filtered passages list
  const filteredPassages = useMemo(() => {
    return readingPassages.filter((p) => {
      // Level filter
      if (selectedLevel !== "ALL" && p.level !== selectedLevel) {
        return false;
      }
      // Tag filter
      if (selectedTag !== "ALL" && !p.tags.includes(selectedTag)) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const titleMatch = p.title.toLowerCase().includes(q);
        const tagMatch = p.tags.some((t) => t.toLowerCase().includes(q));
        const indTitleMatch = p.indonesianTitle?.toLowerCase().includes(q);
        return titleMatch || tagMatch || indTitleMatch;
      }
      return true;
    });
  }, [selectedLevel, selectedTag, searchQuery]);

  // Unique tags list
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    readingPassages.forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, []);

  // Complete Reading Passage Quiz
  const completeReadingPassage = useCallback(
    (passageId: string, score: number, total: number) => {
      const isPerfect = score === total;
      const expReward = isPerfect ? 40 : 25;
      const gemsReward = isPerfect ? 20 : 10;

      addExp(expReward);
      addGems(gemsReward);
    },
    [addExp, addGems],
  );

  return {
    readingPassages,
    filteredPassages,
    allTags,
    selectedLevel,
    setSelectedLevel,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    showFurigana,
    setShowFurigana,
    showTranslation,
    setShowTranslation,
    translationLang,
    setTranslationLang,
    inspectedWord,
    setInspectedWord,
    speakText,
    completeReadingPassage,
    completedPassages: progress.completedExercises || [],
  };
}
