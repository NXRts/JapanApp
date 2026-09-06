"use client";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { KANJI_DATA } from "@/data/kanji";
import { allKanji, allVocabulary } from "@/lib/dictionary";
import confetti from "canvas-confetti";
import { getStroke } from "perfect-freehand";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import { useProgress } from "@/context/ProgressContext";
import { useTheme } from "@/context/ThemeContext";

import {
  HIRAGANA_GRID,
  HIRAGANA_DAKUON,
  KATAKANA_GRID,
  KATAKANA_DAKUON,
  KanaItem,
} from "@/data/kana";

const KANA_STROKES: Record<string, number> = {
  あ: 3, い: 2, う: 2, え: 2, お: 3,
  か: 3, き: 4, く: 1, け: 3, こ: 2,
  さ: 3, し: 1, す: 2, せ: 3, そ: 1,
  た: 4, ち: 2, つ: 1, て: 1, と: 2,
  な: 4, に: 3, ぬ: 2, ね: 2, の: 1,
  は: 3, ひ: 1, ふ: 4, へ: 1, ほ: 4,
  ま: 3, み: 2, む: 3, め: 2, も: 3,
  や: 3, ゆ: 2, よ: 2,
  ら: 2, り: 2, る: 1, れ: 1, ろ: 1,
  わ: 2, を: 3, ん: 1,
  ア: 2, イ: 2, ウ: 3, エ: 3, オ: 3,
  カ: 2, キ: 3, ク: 2, ケ: 3, コ: 2,
  サ: 3, シ: 3, ス: 2, セ: 2, ソ: 2,
  タ: 3, チ: 3, ツ: 3, テ: 3, ト: 2,
  ナ: 2, ニ: 2, ヌ: 2, ネ: 4, ノ: 1,
  ハ: 2, ヒ: 2, フ: 1, ヘ: 1, ホ: 4,
  マ: 2, ミ: 3, ム: 2, メ: 2, モ: 3,
  ヤ: 2, ユ: 2, ヨ: 3,
  ラ: 2, リ: 2, ル: 2, レ: 1, ロ: 3,
  ワ: 2, ヲ: 3, ン: 2,
};

const splitMeaning = (meaning: string): string[] => {
  const parts: string[] = [];
  let current = "";
  let parenDepth = 0;
  for (let i = 0; i < meaning.length; i++) {
    const char = meaning[i];
    if (char === "(" || char === "[" || char === "{") {
      parenDepth++;
      current += char;
    } else if (char === ")" || char === "]" || char === "}") {
      parenDepth = Math.max(0, parenDepth - 1);
      current += char;
    } else if ((char === "," || char === ";") && parenDepth === 0) {
      parts.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  if (current) {
    parts.push(current);
  }
  return parts.map((p) => p.trim()).filter(Boolean);
};

const getKanjiListForLevel = (level: string) => {
  if (level === "Hiragana") {
    const items = [
      ...HIRAGANA_GRID.filter((x): x is KanaItem => x !== null),
      ...HIRAGANA_DAKUON,
    ];
    return items.map((k) => ({
      char: k.char,
      meaning: `Karakter Kana (${k.romaji})`,
      on: k.romaji,
      kun: "",
      strokes: KANA_STROKES[k.char] || 2,
      examples: [],
    }));
  }

  if (level === "Katakana") {
    const items = [
      ...KATAKANA_GRID.filter((x): x is KanaItem => x !== null),
      ...KATAKANA_DAKUON,
    ];
    return items.map((k) => ({
      char: k.char,
      meaning: `Karakter Kana (${k.romaji})`,
      on: k.romaji,
      kun: "",
      strokes: KANA_STROKES[k.char] || 2,
      examples: [],
    }));
  }

  const dbKanji = allKanji.filter((k) => k.level === level);
  return dbKanji.map((k) => {
    const hFound = KANJI_DATA[level]?.find((x) => x.char === k.kanji);
    if (hFound) return hFound;

    const examples = allVocabulary
      .filter(
        (v) =>
          v.word &&
          k.kanji &&
          v.word.includes(k.kanji) &&
          v.meaning &&
          v.meaning !== "No definition" &&
          v.meaning !== "Tidak ada arti",
      )
      .slice(0, 4)
      .map((v) => ({
        word: v.word || "",
        reading: v.reading || "",
        meaning: v.meaning || "",
      }));

    const rawMeaning = k.meaning || "";
    const parts = splitMeaning(rawMeaning);
    const shortMeaning = parts.slice(0, 2).join(", ");

    return {
      char: k.kanji || "",
      meaning: shortMeaning,
      on: k.onyomi && k.onyomi.length > 0 ? k.onyomi.join("・") : "",
      kun: k.kunyomi && k.kunyomi.length > 0 ? k.kunyomi.join("・") : "",
      strokes: k.stroke_count || 0,
      examples,
    };
  });
};

// Utility for perfect-freehand
function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";
  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"],
  );
  d.push("Z");
  return d.join(" ");
}

// Utility for Audio Chime using Web Audio API (No MP3 file needed!)
function playSuccessChime() {
  try {
    const audioCtx = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const now = audioCtx.currentTime;

    // Create a beautiful, soft, warm 3-note arpeggio (C5 -> E5 -> G5)
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

    notes.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = "sine"; // Pure sine wave for a soft, warm, bell-like tone
      osc.frequency.setValueAtTime(freq, now + index * 0.08); // Arpeggiated entry

      gainNode.gain.setValueAtTime(0, now + index * 0.08);
      // Extremely gentle volume ramp-up to prevent popping
      gainNode.gain.linearRampToValueAtTime(0.04, now + index * 0.08 + 0.03);
      // Smooth exponential decay over 0.5 seconds for a clean release
      gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        now + index * 0.08 + 0.5,
      );

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.55);
    });
  } catch (e) {
    console.error("Audio Context not supported or blocked", e);
  }
}

// --- STYLES ---

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  gap: 1.5rem;
  padding: 1.5rem 2rem 2rem 2rem;
  min-height: 100vh;
  color: var(--foreground);

  @media (max-width: 1100px) {
    padding-bottom: 96px;
  }

  @media (max-width: 1024px) {
    padding: 1rem 1rem 96px 1rem;
    gap: 1rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem 96px 0.5rem;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
`;

const PageHeader = styled.div`
  h1 {
    font-size: 1.9rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--foreground);
    margin: 0;

    @media (max-width: 768px) {
      font-size: 1.6rem;
    }
  }
  p {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-top: 4px;
    font-family: "DM Mono", monospace;

    @media (max-width: 768px) {
      font-size: 0.78rem;
    }
  }
`;

const LevelTabs = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const LevelTab = styled.button<{ $active?: boolean }>`
  font-size: 0.75rem;
  font-weight: 700;
  font-family: "DM Mono", monospace;
  padding: 5px 14px;
  border-radius: 6px;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  background: ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "var(--text-secondary)")};
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.05em;

  &:hover {
    border-color: var(--primary);
    color: ${({ $active }) => ($active ? "#fff" : "var(--primary)")};
  }

  @media (max-width: 768px) {
    padding: 4px 10px;
    font-size: 0.7rem;
  }
`;

const MobileTabNav = styled.div`
  display: none;
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 4px;
  gap: 4px;
  margin-bottom: 8px;

  @media (max-width: 960px) {
    display: flex;
  }
`;

const MobileTabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 10px;
  border: none;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "var(--text-secondary)")};
  transition: all 0.2s ease;
  outline: none;
  white-space: nowrap;

  &:hover {
    color: ${({ $active }) => ($active ? "#ffffff" : "var(--primary)")};
  }

  @media (max-width: 480px) {
    font-size: 0.72rem;
    padding: 8px 6px;
    gap: 4px;
  }

  svg {
    width: 15px;
    height: 15px;
  }
`;

const MobileTabContent = styled.div<{
  $tabId: "practice" | "list" | "stats";
  $activeTab: string;
}>`
  display: contents;

  @media (max-width: 960px) {
    display: ${({ $tabId, $activeTab }) => ($tabId === $activeTab ? "flex" : "none")};
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;

const WriterGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr 260px;
  gap: 16px;
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  padding: 18px 20px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardTitle = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
  font-family: "DM Mono", monospace;
`;

const KanjiSearch = styled.div`
  padding: 10px;
  border-bottom: 1px solid var(--border);

  input {
    width: 100%;
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: 7px;
    padding: 7px 11px;
    color: var(--foreground);
    font-size: 0.82rem;
    font-family: "DM Mono", monospace;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: var(--primary);
    }
  }
`;

const ListControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  gap: 12px;
  border-bottom: 1px solid var(--border);
  background: rgba(var(--primary-rgb), 0.01);
`;

const ListControlToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  color: var(--text-secondary);
  font-family: "DM Mono", monospace;
  cursor: pointer;
  user-select: none;
`;

const KanjiList = styled.div`
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  max-height: 460px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 2px;
  }
`;

const KanjiItem = styled.div<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  border-radius: 7px;
  cursor: pointer;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  background: ${({ $active }) =>
    $active ? "rgba(var(--primary-rgb), 0.1)" : "transparent"};
  transition: all 0.15s;
  gap: 2px;

  &:hover {
    background: rgba(var(--primary-rgb), 0.05);
    border-color: var(--border);
  }

  .char {
    font-family: "Noto Serif JP", serif;
    font-size: 1.4rem;
    line-height: 1;
    color: ${({ $active }) =>
      $active ? "var(--primary)" : "var(--foreground)"};
  }

  .reading {
    font-family: "DM Mono", monospace;
    font-size: 0.55rem;
    color: var(--text-secondary);
  }
`;

const KanjiInfo = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 16px;
`;

const KanjiBig = styled.div`
  font-family: "Noto Serif JP", serif;
  font-size: 3.5rem;
  line-height: 1;
  color: var(--primary);
  text-shadow: 0 0 40px rgba(var(--primary-rgb), 0.3);
`;

const KanjiMeta = styled.div`
  flex: 1;
`;

const KanjiMeaning = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--foreground);
  letter-spacing: -0.02em;
`;

const KanjiReadings = styled.div`
  margin-top: 4px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ReadingBadge = styled.span<{ $type: "on" | "kun" }>`
  font-family: "DM Mono", monospace;
  font-size: 0.65rem;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid
    ${({ $type }) =>
      $type === "on"
        ? "rgba(246,173,85,0.4)"
        : "rgba(var(--primary-rgb), 0.4)"};
  color: ${({ $type }) => ($type === "on" ? "#f6ad55" : "var(--primary)")};
`;

const StrokesInfo = styled.div`
  text-align: right;
  .num {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--foreground);
    line-height: 1;
  }
  .label {
    font-size: 0.65rem;
    color: var(--text-secondary);
    font-family: "DM Mono", monospace;
  }
`;

const CanvasWrap = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const CanvasBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 340px;
  aspect-ratio: 1 / 1;
  height: auto;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--background);

  /* Grid lines */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(var(--primary-rgb), 0.05) 1px, transparent 1px),
      linear-gradient(
        90deg,
        rgba(var(--primary-rgb), 0.05) 1px,
        transparent 1px
      );
    background-size: 50% 50%;
    pointer-events: none;
    z-index: 1;
  }

  /* Center cross */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(var(--primary-rgb), 0.08) 1px, transparent 1px),
      linear-gradient(
        90deg,
        rgba(var(--primary-rgb), 0.08) 1px,
        transparent 1px
      );
    background-size: 25% 25%;
    pointer-events: none;
    z-index: 1;
  }

  canvas {
    position: absolute;
    inset: 0;
    width: 100% !important;
    height: 100% !important;
  }

  #guideCanvas {
    z-index: 1;
    pointer-events: none;
  }

  #drawCanvas {
    z-index: 2;
    cursor: crosshair;
    touch-action: none;
  }
`;

const CanvasControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const ControlGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px 6px;
  align-items: center;
  width: 100%;
`;

const StrokeIndicator = styled.div`
  font-size: 0.7rem;
  color: var(--text-secondary);
  font-family: "DM Mono", monospace;
  display: flex;
  align-items: center;
  height: 100%;
  white-space: nowrap;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

const HintToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.68rem;
  color: var(--text-secondary);
  font-family: "DM Mono", monospace;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
`;

const ToggleSwitch = styled.div<{ $on: boolean }>`
  width: 32px;
  height: 18px;
  background: ${({ $on }) => ($on ? "var(--primary)" : "var(--border)")};
  border-radius: 9px;
  position: relative;
  transition: background 0.2s;

  &::after {
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: transform 0.2s;
    transform: ${({ $on }) => ($on ? "translateX(14px)" : "translateX(0)")};
  }
`;

const Btn = styled.button<{ $variant?: "primary" | "danger" | "ghost" }>`
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  padding: 7px 16px;
  border-radius: 7px;
  border: 1px solid
    ${({ $variant }) =>
      $variant === "primary"
        ? "var(--primary)"
        : $variant === "danger"
          ? "rgba(239,68,68,0.3)"
          : $variant === "ghost"
            ? "transparent"
            : "var(--border)"};
  cursor: pointer;
  transition: all 0.15s;
  background: ${({ $variant }) =>
    $variant === "primary" ? "var(--primary)" : "transparent"};
  color: ${({ $variant }) =>
    $variant === "primary"
      ? "#fff"
      : $variant === "danger"
        ? "#ef4444"
        : "var(--text-secondary)"};

  &:hover {
    background: ${({ $variant }) =>
      $variant === "primary"
        ? "var(--primary)"
        : $variant === "danger"
          ? "rgba(239,68,68,0.1)"
          : $variant === "ghost"
            ? "rgba(255,255,255,0.05)"
            : "var(--surface)"};
    opacity: ${({ $variant }) => ($variant === "primary" ? 0.85 : 1)};
    color: ${({ $variant }) =>
      $variant === "primary"
        ? "#fff"
        : $variant === "danger"
          ? "#ef4444"
          : "var(--foreground)"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PlayDemoBtn = styled(Btn)`
  background: rgba(var(--primary-rgb), 0.05);
  color: var(--primary);
  border-color: rgba(var(--primary-rgb), 0.1);
  padding: 6px 10px;
  font-size: 0.7rem;
  white-space: nowrap;
  grid-column: span 2;
  text-align: center;
  justify-content: center;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ResultBox = styled.div`
  padding: 16px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid var(--border);
`;

const ResultLabel = styled.div`
  font-size: 0.65rem;
  font-family: "DM Mono", monospace;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
`;

const ResultScore = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ScoreBarWrap = styled.div`
  flex: 1;
  height: 6px;
  background: var(--background);
  border-radius: 3px;
  overflow: hidden;
`;

const ScoreBar = styled.div<{ $score: number }>`
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: ${({ $score }) =>
    $score >= 75
      ? "linear-gradient(90deg, var(--primary), #76e4f7)"
      : $score >= 50
        ? "linear-gradient(90deg, #f6ad55, #fbd38d)"
        : "linear-gradient(90deg, #ef4444, #feb2b2)"};
  width: ${({ $score }) => $score}%;
`;

const ScoreNum = styled.div<{ $score: number | null }>`
  font-family: "DM Mono", monospace;
  font-size: 0.8rem;
  font-weight: 500;
  min-width: 36px;
  text-align: right;
  color: ${({ $score }) =>
    $score === null
      ? "var(--text-secondary)"
      : $score >= 75
        ? "#10b981"
        : $score >= 50
          ? "#f6ad55"
          : "#ef4444"};
`;

const ResultFeedback = styled.div`
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.5;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProgressRingWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 8px;

  svg {
    transform: rotate(-90deg);
  }
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: var(--background);
  border-radius: 8px;
  border: 1px solid var(--border);
`;

const StrokeGuide = styled.div`
  padding: 16px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const StrokeStep = styled.div<{ $state: "done" | "current" | "pending" }>`
  width: 42px;
  height: 42px;
  background: var(--background);
  border: 1px solid
    ${({ $state }) =>
      $state === "done"
        ? "rgba(var(--primary-rgb), 0.4)"
        : $state === "current"
          ? "rgba(246,173,85,0.6)"
          : "var(--border)"};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Noto Serif JP", serif;
  font-size: 1.1rem;
  color: ${({ $state }) =>
    $state === "done"
      ? "var(--primary)"
      : $state === "current"
        ? "#f6ad55"
        : "var(--text-secondary)"};
  position: relative;
  transition: all 0.15s;
  ${({ $state }) =>
    $state === "current" &&
    `
    animation: pulse 1s infinite;
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(246,173,85,0.3); }
      50% { box-shadow: 0 0 0 4px rgba(246,173,85,0.1); }
    }
  `}

  .step-num {
    position: absolute;
    top: 2px;
    right: 3px;
    font-family: "DM Mono", monospace;
    font-size: 0.45rem;
    color: var(--text-secondary);
  }
`;

const HistoryList = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 2px;
  }
`;

const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 6px;
  background: var(--background);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--surface);
    border-color: rgba(var(--primary-rgb), 0.3);
    transform: translateX(4px);
  }
`;

const HistoryScore = styled.span<{ $score: number }>`
  font-family: "DM Mono", monospace;
  font-size: 0.65rem;
  margin-left: auto;
  padding: 2px 7px;
  border-radius: 4px;
  background: ${({ $score }) =>
    $score >= 75
      ? "rgba(16,185,129,0.15)"
      : $score >= 50
        ? "rgba(246,173,85,0.15)"
        : "rgba(239,68,68,0.15)"};
  color: ${({ $score }) =>
    $score >= 75 ? "#10b981" : $score >= 50 ? "#f6ad55" : "#ef4444"};
`;

const LoadingDots = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-family: "DM Mono", monospace;

  .dots span {
    display: inline-block;
    width: 4px;
    height: 4px;
    background: var(--primary);
    border-radius: 50%;
    animation: blink 1.2s infinite;
  }
  .dots span:nth-child(2) {
    animation-delay: 0.2s;
  }
  .dots span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    0%,
    80%,
    100% {
      opacity: 0.2;
    }
    40% {
      opacity: 1;
    }
  }
`;

// --- DATA ---

// --- COMPONENT ---

export default function KanjiWriterPage() {
  const { mode } = useTheme();
  const [currentLevel, setCurrentLevel] = useState<
    "Hiragana" | "Katakana" | "N5" | "N4" | "N3" | "N2" | "N1"
  >("N5");
  const [currentKanji, setCurrentKanji] = useState<any>(
    () => getKanjiListForLevel("N5")[0],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMobileTab, setActiveMobileTab] = useState<
    "practice" | "list" | "stats"
  >("practice");
  const { addExp, updateMastery, recordCharacterActivity } = useProgress();

  // Canvas State
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const guideCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);
  const [hintEnabled, setHintEnabled] = useState(false);
  const [svgPaths, setSvgPaths] = useState<string[]>([]);

  type Point = { x: number; y: number };
  const [userStrokes, setUserStrokes] = useState<Point[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [strokeFeedback, setStrokeFeedback] = useState<string | null>(null);

  // Animation State
  const [isAnimating, setIsAnimating] = useState(false);
  const [animIdx, setAnimIdx] = useState(-1);
  const [animProgress, setAnimProgress] = useState(false);

  // Result State
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    grade: string;
    feedback: string;
  } | null>(null);

  // Stats State
  const [history, setHistory] = useState<any[]>([]);
  const [session, setSession] = useState({
    practicedChars: [] as string[],
    practiced: 0,
    correct: 0,
    scores: [] as number[],
    streak: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [brushType, setBrushType] = useState<"aesthetic" | "uniform">(
    "aesthetic",
  );

  // Load progress from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const savedLevel = localStorage.getItem("jlpt_kw_level");
      const savedKanji = localStorage.getItem("jlpt_kw_kanji");
      const savedHistory = localStorage.getItem("jlpt_kw_history");
      const savedSession = localStorage.getItem("jlpt_kw_session");
      const savedBrush = localStorage.getItem("jlpt_kw_brush");

      if (savedLevel) setCurrentLevel(savedLevel as any);
      if (savedKanji) setCurrentKanji(JSON.parse(savedKanji));
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      if (savedSession) setSession(JSON.parse(savedSession));
      if (savedBrush) setBrushType(savedBrush as any);
    } catch (e) {
      console.error("Failed to load kanji progress", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save progress to localStorage on state change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("jlpt_kw_level", currentLevel);
      localStorage.setItem("jlpt_kw_kanji", JSON.stringify(currentKanji));
      localStorage.setItem("jlpt_kw_history", JSON.stringify(history));
      localStorage.setItem("jlpt_kw_session", JSON.stringify(session));
      localStorage.setItem("jlpt_kw_brush", brushType);
    } catch (e) {
      console.error("Failed to save kanji progress", e);
    }
  }, [currentLevel, currentKanji, history, session, isLoaded, brushType]);
  // Sort and Shuffle States
  const [isRandomized, setIsRandomized] = useState(false);

  // Base list of kanji for the active level
  const levelKanjiList = useMemo(() => {
    return getKanjiListForLevel(currentLevel);
  }, [currentLevel]);

  const filteredKanji = useMemo(() => {
    if (!searchQuery) return levelKanjiList;
    return levelKanjiList.filter(
      (k) =>
        k.char.includes(searchQuery) ||
        k.meaning.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [levelKanjiList, searchQuery]);

  // Toggle handlers
  const handleToggleRandomized = () => {
    setIsRandomized((prev) => !prev);
  };

  // Handle Level Change
  const handleLevelChange = (level: any) => {
    setCurrentLevel(level);
    const list = getKanjiListForLevel(level);
    if (list.length > 0) {
      handleSelectKanji(list[0]);
    }
  };

  // Select Kanji
  const handleSelectKanji = useCallback((kanji: any) => {
    setCurrentKanji(kanji);
    setStrokeCount(0);
    setResult(null);
    setSvgPaths([]); // Clear old SVG paths immediately
    clearCanvas();
    setActiveMobileTab("practice");
  }, []);

  // Fetch SVG Paths when kanji changes
  useEffect(() => {
    if (!currentKanji) return;
    let active = true;

    const fetchSvg = async () => {
      try {
        const hex = currentKanji.char
          .charCodeAt(0)
          .toString(16)
          .padStart(5, "0");
        const res = await fetch(`/api/kanji-svg?hex=${hex}`);
        if (res.ok) {
          const paths = (await res.json()) as string[];
          if (active) setSvgPaths(paths);
        } else {
          if (active) setSvgPaths([]);
        }
      } catch (err) {
        if (active) setSvgPaths([]);
      }
    };
    fetchSvg();

    return () => {
      active = false;
    };
  }, [currentKanji]);

  // Setup Canvas listeners (React way)
  const getPos = (e: any, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const redrawCanvas = useCallback(
    (strokes: Point[][], activeStroke: Point[]) => {
      const canvas = drawCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const drawPath = (path: Point[]) => {
        if (path.length < 2) return;

        const strokeColor = mode === "light" ? "#0F172A" : "#ffffff";
        const shadowColor =
          mode === "light"
            ? "rgba(15, 23, 42, 0.3)"
            : "rgba(255, 255, 255, 0.3)";

        if (brushType === "aesthetic") {
          const strokeOptions = {
            size: 16,
            thinning: 0.7,
            smoothing: 0.5,
            streamline: 0.5,
            simulatePressure: true,
          };

          const pointsArray = path.map((p) => [p.x, p.y]);
          const strokeOutline = getStroke(pointsArray, strokeOptions);
          const pathData = getSvgPathFromStroke(strokeOutline);
          const path2D = new Path2D(pathData);

          ctx.fillStyle = strokeColor;
          ctx.shadowColor = shadowColor;
          ctx.shadowBlur = 4;
          ctx.fill(path2D);
        } else {
          ctx.beginPath();
          ctx.moveTo(path[0].x, path[0].y);
          for (let i = 1; i < path.length; i++) {
            ctx.lineTo(path[i].x, path[i].y);
          }
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 12;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowColor = shadowColor;
          ctx.shadowBlur = 2;
          ctx.stroke();
        }
      };

      strokes.forEach(drawPath);
      if (activeStroke.length > 0) drawPath(activeStroke);
    },
    [brushType, mode],
  );

  const validateStroke = useCallback(
    (userPath: Point[], svgPathString: string) => {
      if (!svgPathString || userPath.length < 2) return { ok: true };

      const match = svgPathString.match(/^M\s*([-\d.]+)[,\s]+([-\d.]+)/);
      if (!match) return { ok: true };

      const svgX = parseFloat(match[1]);
      const svgY = parseFloat(match[2]);

      const scale = 340 / 109;
      const targetX = svgX * scale;
      const targetY = svgY * scale;

      const startP = userPath[0];
      const dist = Math.sqrt(
        Math.pow(startP.x - targetX, 2) + Math.pow(startP.y - targetY, 2),
      );

      if (dist > 60) {
        return { ok: false, msg: "Urutan atau arah goresan salah!" };
      }

      return { ok: true };
    },
    [],
  );

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (isChecking || isAnimating || userStrokes.length >= currentKanji.strokes)
      return;
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    setIsDrawing(true);
    const pos = getPos(e, canvas);
    setCurrentStroke([pos]);
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isChecking || isAnimating) return;
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const pos = getPos(e, canvas);
    setCurrentStroke((prev) => {
      const next = [...prev, pos];
      redrawCanvas(userStrokes, next);
      return next;
    });
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentStroke.length < 2) {
      setCurrentStroke([]);
      redrawCanvas(userStrokes, []);
      return;
    }

    const targetIdx = userStrokes.length;
    if (targetIdx >= svgPaths.length && svgPaths.length > 0) {
      setStrokeFeedback("Semua goresan sudah lengkap!");
      setTimeout(() => setStrokeFeedback(null), 2000);
      setCurrentStroke([]);
      redrawCanvas(userStrokes, []);
      return;
    }

    if (svgPaths.length > 0) {
      const valid = validateStroke(currentStroke, svgPaths[targetIdx]);
      if (!valid.ok) {
        setStrokeFeedback(valid.msg || "Urutan goresan salah!");
        setTimeout(() => setStrokeFeedback(null), 2000);
        setCurrentStroke([]);
        redrawCanvas(userStrokes, []);
        return;
      }
    }

    // Success
    const newStrokes = [...userStrokes, currentStroke];
    setUserStrokes(newStrokes);
    setStrokeCount(newStrokes.length);
    setCurrentStroke([]);
    redrawCanvas(newStrokes, []);
  };

  const handleUndo = () => {
    if (userStrokes.length === 0 || isChecking || isAnimating) return;
    const newStrokes = userStrokes.slice(0, -1);
    setUserStrokes(newStrokes);
    setStrokeCount(newStrokes.length);
    redrawCanvas(newStrokes, []);
    setResult(null);
    setStrokeFeedback(null);
  };

  const drawGuide = useCallback(() => {
    const canvas = guideCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const guideColor =
      mode === "light" ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.25)";

    // If uniform mode, use Kaku (Gothic) font guide for straighter lines
    if (brushType === "uniform" || svgPaths.length === 0) {
      ctx.font = "900 240px sans-serif"; // "Kaku" / Gothic style
      ctx.fillStyle = guideColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        currentKanji?.char || "",
        canvas.width / 2,
        canvas.height / 2 + 15,
      );
    } else {
      // Aesthetic mode uses SVG paths for calligraphy style
      ctx.save();
      const scale = canvas.width / 109;
      ctx.scale(scale, scale);

      ctx.strokeStyle = guideColor;
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      svgPaths.forEach((pathStr) => {
        ctx.stroke(new Path2D(pathStr));
      });
      ctx.restore();
    }
  }, [currentKanji, svgPaths, brushType, mode]);

  useEffect(() => {
    drawGuide();
  }, [drawGuide]);

  // Redraw strokes immediately if the theme mode changes
  useEffect(() => {
    redrawCanvas(userStrokes, currentStroke);
  }, [mode, redrawCanvas, userStrokes, currentStroke]);

  const clearCanvas = useCallback(() => {
    const canvas = drawCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setStrokeCount(0);
    setUserStrokes([]);
    setCurrentStroke([]);
    setResult(null);
    setStrokeFeedback(null);
  }, []);

  const getNextSmartKanji = () => {
    const currentList = levelKanjiList;
    if (!currentList || currentList.length === 0) return null;

    if (isRandomized) {
      // 1. Find unmastered kanji (not in practicedChars)
      const unmastered = currentList.filter(
        (k) => !session.practicedChars.includes(k.char),
      );

      if (unmastered.length > 0) {
        // 2. Pick a random one from the unmastered pool
        const randomIndex = Math.floor(Math.random() * unmastered.length);
        return unmastered[randomIndex];
      } else {
        // 3. All mastered! Just pick a random one for review
        const randomIndex = Math.floor(Math.random() * currentList.length);
        return currentList[randomIndex];
      }
    } else {
      // Sequential Mode!
      const currentIndex = currentList.findIndex(
        (k) => k.char === currentKanji?.char,
      );
      if (currentIndex === -1) return currentList[0];

      // Select the next one sequentially, wrapping around
      const nextIndex = (currentIndex + 1) % currentList.length;
      return currentList[nextIndex];
    }
  };

  const handleNextKanji = () => {
    const nextKanji = getNextSmartKanji();
    if (nextKanji) {
      setCurrentKanji(nextKanji);
      clearCanvas();
      setResult(null);
      setStrokeCount(0);
    }
  };

  const handleSmartPractice = () => {
    handleNextKanji();
  };

  const runWritingDemo = async () => {
    if (isAnimating || svgPaths.length === 0) return;
    setIsAnimating(true);
    setResult(null);

    for (let i = 0; i < svgPaths.length; i++) {
      setAnimIdx(i);
      setAnimProgress(false);
      // Brief delay to allow CSS to reset offset if needed
      await new Promise((r) => setTimeout(r, 20));
      setAnimProgress(true);
      await new Promise((r) => setTimeout(r, 700)); // Delay per stroke
    }

    setTimeout(() => {
      setIsAnimating(false);
      setAnimIdx(-1);
      setAnimProgress(false);
    }, 800);
  };

  // Calculate pixel overlap between user drawing and guide
  const calculatePixelAccuracy = () => {
    const drawCanvas = drawCanvasRef.current;
    const guideCanvas = guideCanvasRef.current;
    if (!drawCanvas || !guideCanvas) return 0;

    const drawCtx = drawCanvas.getContext("2d");
    const guideCtx = guideCanvas.getContext("2d");
    if (!drawCtx || !guideCtx) return 0;

    const width = drawCanvas.width;
    const height = drawCanvas.height;

    const drawData = drawCtx.getImageData(0, 0, width, height).data;
    const guideData = guideCtx.getImageData(0, 0, width, height).data;

    let hitPixels = 0;
    let drawnPixels = 0;
    let guidePixels = 0;

    // Check alpha channels (every 4th byte is alpha)
    for (let i = 3; i < drawData.length; i += 4) {
      const drawAlpha = drawData[i];
      const guideAlpha = guideData[i];

      const isDrawn = drawAlpha > 20;
      const isGuide = guideAlpha > 20;

      if (isDrawn) drawnPixels++;
      if (isGuide) guidePixels++;
      if (isDrawn && isGuide) hitPixels++;
    }

    if (drawnPixels === 0) return 0;
    if (guidePixels === 0) return 0;

    const precision = hitPixels / drawnPixels;
    const recallRaw = hitPixels / guidePixels;
    // Increased leniency: lowered coverage requirement from 0.45 to 0.35
    const recall = Math.min(1.0, recallRaw / 0.35);

    const f1 = (2 * (precision * recall)) / (precision + recall + 0.0001);
    // Added a 15% "leniency boost" to the final score
    return Math.min(100, Math.round(f1 * 115));
  };

  // Logic to simulate AI feedback with pixel accuracy
  const handleCheck = () => {
    if (strokeCount === 0 || isChecking) return;
    setIsChecking(true);
    setResult(null);

    setTimeout(() => {
      const expectedStrokes = currentKanji.strokes;
      const strokeDiff = Math.abs(strokeCount - expectedStrokes);
      const pixelAccuracy = calculatePixelAccuracy();

      let baseScore = 10;
      let feedback = "";

      if (strokeDiff === 0) {
        if (pixelAccuracy >= 75) {
          // Lowered from 85
          baseScore = 95;
          feedback = `Amazing! The stroke count (${strokeCount}) is correct, and the kanji shape is very precise.`;
        } else if (pixelAccuracy >= 50) {
          // Lowered from 60
          baseScore = 80;
          feedback = `Good! The stroke count is correct, but the shape could be improved to follow the pattern more closely.`;
        } else {
          baseScore = 55;
          feedback = `The stroke count (${strokeCount}) is correct, but the strokes do not form the correct kanji pattern. Try again!`;
        }
      } else if (strokeCount < expectedStrokes) {
        baseScore = Math.min(80 - strokeDiff * 20, pixelAccuracy);
        baseScore = Math.max(10, baseScore);
        feedback = `Missing ${strokeDiff} stroke(s). This kanji requires ${expectedStrokes} strokes. Even if the shape looks similar, the stroke rules must be followed.`;
      } else {
        baseScore = Math.min(80 - strokeDiff * 20, pixelAccuracy);
        baseScore = Math.max(10, baseScore);
        feedback = `Too many strokes (${strokeDiff} extra). This kanji only requires ${expectedStrokes} strokes. Pay attention to the order and writing method.`;
      }

      let grade = "Poor";
      if (baseScore >= 80) {
        grade = "Excellent";
        // Fire Confetti!
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.8 },
          colors: ["#f6ad55", "#818cf8", "#10b981", "#ffffff"],
        });
        // Play Chime!
        playSuccessChime();
        // Add EXP
        addExp(10);
      } else if (baseScore >= 60) {
        grade = "Good";
        addExp(5);
      } else if (baseScore >= 40) grade = "Fair";

      const newResult = { score: baseScore, grade, feedback };
      setResult(newResult);
      setIsChecking(false);

      // Global progress tracking
      updateMastery(currentKanji.char, baseScore >= 80);
      if (recordCharacterActivity) {
        recordCharacterActivity(currentKanji.char, "writer", baseScore >= 60);
      }

      setHistory((prev) => {
        const filtered = prev.filter((h) => h.kanji.char !== currentKanji.char);
        return [{ kanji: currentKanji, score: baseScore }, ...filtered].slice(
          0,
          20,
        );
      });
      setSession((prev) => {
        const newScores = [...prev.scores, baseScore];
        const isCorrect = baseScore >= 80; // Lulus jika >= 80

        // Track unique practiced if correct
        let newPracticedChars = prev.practicedChars || [];
        if (isCorrect && !newPracticedChars.includes(currentKanji.char)) {
          newPracticedChars = [...newPracticedChars, currentKanji.char];
        }

        return {
          practicedChars: newPracticedChars,
          practiced: prev.practiced + 1,
          correct: prev.correct + (isCorrect ? 1 : 0),
          scores: newScores,
          streak: isCorrect ? prev.streak + 1 : 0,
        };
      });
    }, 800); // Reduced delay to 800ms to feel more responsive since it's doing real calculation
  };

  // Stats calc
  const totalInLevel = levelKanjiList.length || 20;
  const practicedInLevel = session.practicedChars.filter((char) =>
    levelKanjiList.some((k) => k.char === char),
  ).length;
  const progressPct = Math.round((practicedInLevel / totalInLevel) * 100) || 0;
  const avgScore =
    session.scores.length > 0
      ? Math.round(
          session.scores.reduce((a, b) => a + b, 0) / session.scores.length,
        )
      : 0;
  const ringOffset = 238.76 - (238.76 * Math.min(progressPct, 100)) / 100;

  if (!mounted) {
    return (
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "JLPT Mastery", href: "/jlpt" },
          ]}
          current="Kanji Writer"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <LoadingDots>
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>Loading workspace...</span>
          </LoadingDots>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "JLPT Mastery", href: "/jlpt" },
        ]}
        current="Kanji Writer"
      />

      <HeaderRow>
        <PageHeader>
          <h1>Kanji Writer</h1>
          <p>// Practice writing kanji with real-time stroke analysis</p>
        </PageHeader>

        <LevelTabs>
          {["Hiragana", "Katakana", "N5", "N4", "N3", "N2", "N1"].map((lvl) => (
            <LevelTab
              key={lvl}
              $active={currentLevel === lvl}
              onClick={() => handleLevelChange(lvl)}
            >
              {lvl === "Hiragana" ? "あ Hiragana" : lvl === "Katakana" ? "ア Katakana" : lvl}
            </LevelTab>
          ))}
        </LevelTabs>
      </HeaderRow>

      <MobileTabNav>
        <MobileTabButton
          $active={activeMobileTab === "practice"}
          onClick={() => setActiveMobileTab("practice")}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          Latihan
        </MobileTabButton>
        <MobileTabButton
          $active={activeMobileTab === "list"}
          onClick={() => setActiveMobileTab("list")}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          {currentLevel === "Hiragana" || currentLevel === "Katakana" ? "Daftar Kana" : "Daftar Kanji"}
        </MobileTabButton>
        <MobileTabButton
          $active={activeMobileTab === "stats"}
          onClick={() => setActiveMobileTab("stats")}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Statistik
        </MobileTabButton>
      </MobileTabNav>

      <WriterGrid>
        {/* LEFT COLUMN: Kanji/Kana List */}
        <MobileTabContent $tabId="list" $activeTab={activeMobileTab}>
          <Card>
            <CardHeader>
              <CardTitle>
                {currentLevel === "Hiragana"
                  ? "Hiragana List"
                  : currentLevel === "Katakana"
                  ? "Katakana List"
                  : "Kanji List"}
              </CardTitle>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  color: "var(--text-secondary)",
                }}
              >
                {filteredKanji.length}{" "}
                {currentLevel === "Hiragana" || currentLevel === "Katakana"
                  ? "kana"
                  : "kanji"}
              </span>
            </CardHeader>
            <div style={{ padding: "16px 16px 12px" }}>
              <Btn
                $variant="primary"
                onClick={handleSmartPractice}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "var(--primary)",
                  color: "#fff",
                  fontSize: "0.8rem",
                  padding: "10px",
                }}
              >
                Smart Practice 🧠
              </Btn>
            </div>
            <KanjiSearch>
              <input
                type="text"
                placeholder={
                  currentLevel === "Hiragana" || currentLevel === "Katakana"
                    ? "Cari kana (e.g. あ / a)..."
                    : "Search kanji..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </KanjiSearch>
            <KanjiList>
              {filteredKanji.map((k, i) => (
                <KanjiItem
                  key={i}
                  $active={currentKanji?.char === k.char}
                  onClick={() => handleSelectKanji(k)}
                >
                  <span className="char">{k.char}</span>
                  <span className="reading">
                    {k.on.split("・")[0] || k.kun.split("・")[0] || k.on}
                  </span>
                </KanjiItem>
              ))}
            </KanjiList>
          </Card>
        </MobileTabContent>

        {/* CENTER COLUMN: Canvas Area */}
        <MobileTabContent $tabId="practice" $activeTab={activeMobileTab}>
          <Card>
            {currentKanji && (
              <>
                <KanjiInfo>
                  <KanjiBig>{currentKanji.char}</KanjiBig>
                  <KanjiMeta>
                    <KanjiMeaning>{currentKanji.meaning}</KanjiMeaning>
                    <KanjiReadings>
                      {currentKanji.on && currentKanji.on !== "—" && (
                        <ReadingBadge $type="on">
                          {currentLevel === "Hiragana" || currentLevel === "Katakana"
                            ? `Romaji: ${currentKanji.on}`
                            : currentKanji.on}
                        </ReadingBadge>
                      )}
                      {currentKanji.kun && currentKanji.kun !== "—" && (
                        <ReadingBadge $type="kun">
                          {currentKanji.kun}
                        </ReadingBadge>
                      )}
                    </KanjiReadings>
                  </KanjiMeta>
                  <StrokesInfo>
                    <div className="num">{svgPaths.length || currentKanji.strokes || 1}</div>
                    <div className="label">strokes</div>
                  </StrokesInfo>
                </KanjiInfo>

                <CanvasWrap style={{ position: "relative" }}>
                  {strokeFeedback && (
                    <div
                      style={{
                        position: "absolute",
                        top: "40%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "rgba(239, 68, 68, 0.9)",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        pointerEvents: "none",
                        animation: "fadeInOut 2s forwards",
                        zIndex: 10,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {strokeFeedback}
                    </div>
                  )}
                  {isChecking && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(15,23,42,0.6)",
                        backdropFilter: "blur(2px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                        borderRadius: "12px",
                      }}
                    >
                      <LoadingDots>
                        <div className="dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <span>Analyzing...</span>
                      </LoadingDots>
                    </div>
                  )}
                  <CanvasBox>
                    <canvas
                      ref={guideCanvasRef}
                      width={340}
                      height={340}
                      id="guideCanvas"
                      style={{ opacity: hintEnabled ? 0.15 : 0.08 }}
                    />
                    <canvas
                      ref={drawCanvasRef}
                      width={340}
                      height={340}
                      id="drawCanvas"
                      onMouseDown={handlePointerDown}
                      onMouseMove={handlePointerMove}
                      onMouseUp={handlePointerUp}
                      onMouseLeave={handlePointerUp}
                      onTouchStart={handlePointerDown}
                      onTouchMove={handlePointerMove}
                      onTouchEnd={handlePointerUp}
                      onTouchCancel={handlePointerUp}
                    />

                    {/* Writing Demo Animation Overlay - INSIDE CanvasBox for perfect alignment */}
                    {isAnimating && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          zIndex: 10,
                          pointerEvents: "none",
                        }}
                      >
                        <svg
                          viewBox="0 0 109 109"
                          style={{ width: "100%", height: "100%" }}
                        >
                          {svgPaths.map((d, i) => (
                            <path
                              key={i}
                              d={d}
                              fill="none"
                              stroke="#f6ad55"
                              strokeWidth="3"
                              strokeLinecap="round"
                              style={{
                                strokeDasharray: 300,
                                strokeDashoffset:
                                  i < animIdx || (i === animIdx && animProgress)
                                    ? 0
                                    : 300,
                                transition:
                                  i === animIdx && animProgress
                                    ? "stroke-dashoffset 0.6s ease-in-out"
                                    : "none",
                                opacity: i <= animIdx ? 0.8 : 0,
                              }}
                            />
                          ))}
                        </svg>
                      </div>
                    )}
                  </CanvasBox>

                  <CanvasControls>
                    {mounted && (
                      <>
                        <ControlGroup>
                          <HintToggle>
                            <ToggleSwitch
                              $on={hintEnabled}
                              onClick={() => setHintEnabled(!hintEnabled)}
                            />
                            <span>Guide</span>
                          </HintToggle>
                          <HintToggle>
                            <ToggleSwitch
                              $on={brushType === "aesthetic"}
                              onClick={() =>
                                setBrushType((prev) =>
                                  prev === "aesthetic"
                                    ? "uniform"
                                    : "aesthetic",
                                )
                              }
                            />
                            <span>Aesthetic</span>
                          </HintToggle>
                          <HintToggle>
                            <ToggleSwitch
                              $on={isRandomized}
                              onClick={handleToggleRandomized}
                            />
                            <span>Acak 🎲</span>
                          </HintToggle>
                          <StrokeIndicator>
                            Stroke {strokeCount} / {currentKanji.strokes}
                          </StrokeIndicator>
                          <PlayDemoBtn
                            $variant="ghost"
                            onClick={runWritingDemo}
                            disabled={
                              isAnimating || isChecking || svgPaths.length === 0
                            }
                          >
                            Play Demo 🎬
                          </PlayDemoBtn>
                        </ControlGroup>

                        <ActionGroup>
                          <div style={{ display: "flex", gap: "6px", flex: 1 }}>
                            <Btn
                              $variant="danger"
                              onClick={handleUndo}
                              disabled={
                                userStrokes.length === 0 ||
                                isChecking ||
                                isAnimating
                              }
                              style={{ flex: 1, padding: "8px" }}
                            >
                              Undo
                            </Btn>
                            <Btn
                              $variant="danger"
                              onClick={clearCanvas}
                              disabled={isChecking || isAnimating}
                              style={{ flex: 1, padding: "8px" }}
                            >
                              Clear
                            </Btn>
                          </div>
                          <Btn
                            $variant="primary"
                            onClick={handleCheck}
                            disabled={
                              isChecking || isAnimating || strokeCount === 0
                            }
                            style={{
                              flex: 1.5,
                              padding: "10px",
                              fontSize: "0.85rem",
                            }}
                          >
                            Check ✓
                          </Btn>
                          {result && result.score >= 80 && (
                            <Btn
                              $variant="primary"
                              onClick={handleNextKanji}
                              style={{
                                background: "#10b981",
                                borderColor: "#10b981",
                                flex: 1,
                                padding: "10px",
                              }}
                            >
                              Next ➔
                            </Btn>
                          )}
                        </ActionGroup>
                      </>
                    )}
                  </CanvasControls>
                </CanvasWrap>

                <ResultBox>
                  <ResultLabel>Accuracy Score</ResultLabel>
                  <ResultScore>
                    <ScoreBarWrap>
                      <ScoreBar $score={result ? result.score : 0} />
                    </ScoreBarWrap>
                    <ScoreNum $score={result ? result.score : null}>
                      {result ? `${result.score}%` : "—"}
                    </ScoreNum>
                  </ResultScore>
                  {isChecking ? (
                    <LoadingDots>
                      <span>Analyzing stroke pattern</span>
                      <div className="dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </LoadingDots>
                  ) : (
                    <ResultFeedback>
                      {result ? (
                        <>
                          <span
                            style={{
                              color:
                                result.score >= 75
                                  ? "#10b981"
                                  : result.score >= 50
                                    ? "#f6ad55"
                                    : "#ef4444",
                              fontWeight: 700,
                            }}
                          >
                            {result.grade}{" "}
                            {result.score >= 80
                              ? "🎉"
                              : result.score >= 60
                                ? "👍"
                                : "💪"}
                          </span>
                          <br />
                          <span>{result.feedback}</span>
                        </>
                      ) : (
                        <span
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.75rem",
                          }}
                        >
                          Draw the kanji above, then press Check to get
                          feedback.
                        </span>
                      )}
                    </ResultFeedback>
                  )}
                </ResultBox>
              </>
            )}
          </Card>
        </MobileTabContent>

        {/* RIGHT COLUMN: Stats & Progress */}
        <RightColumn>
          {/* Progress Ring */}
          <MobileTabContent $tabId="stats" $activeTab={activeMobileTab}>
            <Card>
              <CardHeader>
                <CardTitle>Session Progress</CardTitle>
              </CardHeader>
              <ProgressRingWrap>
                <svg width="96" height="96" viewBox="0 0 96 96">
                  <circle
                    cx="48"
                    cy="48"
                    r="38"
                    fill="none"
                    stroke="var(--background)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="38"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="8"
                    strokeDasharray="238.76"
                    strokeDashoffset={ringOffset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                  />
                </svg>
                <div
                  style={{
                    marginTop: "-72px",
                    marginBottom: "56px",
                    textAlign: "center",
                    zIndex: 1,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      color: "var(--foreground)",
                    }}
                  >
                    {progressPct}%
                  </div>
                  <div
                    style={{
                      fontSize: "0.6rem",
                      fontFamily: "'DM Mono', monospace",
                      color: "var(--text-secondary)",
                    }}
                  >
                    done
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "0.7rem",
                    color: "var(--text-secondary)",
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.05em",
                  }}
                >
                  {practicedInLevel} / {totalInLevel} practiced
                </div>
              </ProgressRingWrap>
              <div
                style={{
                  padding: "0 12px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <StatRow>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--text-secondary)",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    Correct
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#10b981",
                    }}
                  >
                    {session.correct}
                  </span>
                </StatRow>
                <StatRow>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--text-secondary)",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    Avg Score
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--primary)",
                    }}
                  >
                    {avgScore}%
                  </span>
                </StatRow>
                <StatRow>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--text-secondary)",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    Streak
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--foreground)",
                    }}
                  >
                    🔥 {session.streak}
                  </span>
                </StatRow>
              </div>
            </Card>
          </MobileTabContent>

          {/* Stroke Guide */}
          {currentKanji && (
            <MobileTabContent $tabId="practice" $activeTab={activeMobileTab}>
              <Card>
                <CardHeader>
                  <CardTitle>Stroke Order</CardTitle>
                </CardHeader>
                <StrokeGuide>
                  {Array.from({ length: currentKanji.strokes }).map((_, i) => (
                    <StrokeStep
                      key={i}
                      $state={
                        i < strokeCount
                          ? "done"
                          : i === strokeCount
                            ? "current"
                            : "pending"
                      }
                    >
                      {svgPaths.length > 0 ? (
                        <svg
                          viewBox="0 0 109 109"
                          style={{ width: "100%", height: "100%" }}
                        >
                          {/* Future strokes */}
                          <g
                            stroke={
                              mode === "light"
                                ? "rgba(0, 0, 0, 0.08)"
                                : "rgba(255, 255, 255, 0.12)"
                            }
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {svgPaths.slice(i + 1).map((d, idx) => (
                              <path key={`bg-${idx}`} d={d} />
                            ))}
                          </g>
                          {/* Past strokes */}
                          <g
                            stroke={
                              mode === "light"
                                ? "rgba(0, 0, 0, 0.6)"
                                : "rgba(255, 255, 255, 0.7)"
                            }
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {svgPaths.slice(0, i).map((d, idx) => (
                              <path key={`past-${idx}`} d={d} />
                            ))}
                          </g>
                          {/* Current stroke */}
                          {svgPaths[i] && (
                            <g
                              stroke="#f6ad55"
                              strokeWidth="6"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d={svgPaths[i]} />
                            </g>
                          )}
                        </svg>
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background: "rgba(var(--primary-rgb), 0.03)",
                            borderRadius: "4px",
                          }}
                        />
                      )}
                      <span className="step-num">{i + 1}</span>
                    </StrokeStep>
                  ))}
                </StrokeGuide>
              </Card>
            </MobileTabContent>
          )}

          {/* History */}
          <MobileTabContent $tabId="stats" $activeTab={activeMobileTab}>
            <Card>
              <CardHeader>
                <CardTitle>Recent Practice</CardTitle>
              </CardHeader>
              <HistoryList>
                {history.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "20px 0",
                      color: "var(--text-secondary)",
                      fontSize: "0.8rem",
                    }}
                  >
                    No practice history yet.
                  </div>
                )}
                {history.map((h, i) => (
                  <HistoryItem
                    key={i}
                    onClick={() => {
                      // Find correct level and select
                      const found = allKanji.find(
                        (k) => k.kanji === h.kanji.char,
                      );
                      if (found && found.level) {
                        setCurrentLevel(found.level as any);
                      }
                      handleSelectKanji(h.kanji);
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Noto Serif JP', serif",
                        fontSize: "1rem",
                        width: "24px",
                        textAlign: "center",
                        color:
                          h.score >= 75
                            ? "var(--primary)"
                            : h.score >= 50
                              ? "#f6ad55"
                              : "#ef4444",
                      }}
                    >
                      {h.kanji.char}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--text-secondary)",
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      {h.kanji.meaning}
                    </span>
                    <HistoryScore $score={h.score}>{h.score}%</HistoryScore>
                  </HistoryItem>
                ))}
              </HistoryList>
            </Card>
          </MobileTabContent>
        </RightColumn>
      </WriterGrid>
    </PageContainer>
  );
}
