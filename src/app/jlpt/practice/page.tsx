"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import {
  searchDictionary,
  allVocabulary,
  allKanji,
  allGrammar,
} from "@/lib/dictionary";
import { playJapaneseAudio } from "@/lib/audio";

// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const popIn = keyframes`
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// --- Styled Components ---
const PageWrapper = styled.div`
  min-height: 100vh;
  color: var(--foreground);
  background-image: radial-gradient(var(--dot-color) 1.2px, transparent 1.2px);
  background-size: 32px 32px;
  padding-bottom: 4rem;

  @media (max-width: 600px) {
    padding-bottom: 2rem;
  }
`;

const BreadcrumbWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem 0 2rem;

  @media (max-width: 1024px) {
    padding: 1rem 1rem 0 1rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem 0 0.5rem;
  }
`;

const Container = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 640px) {
    padding: 0.5rem 0.75rem 4.5rem 0.75rem;
    min-height: calc(100vh - 120px);
    justify-content: center;
  }
`;

const SessionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.75rem;
  width: 100%;

  @media (max-width: 600px) {
    margin-bottom: 0.6rem;
  }
`;

const SessionBadgeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 0.4rem;
  }
`;

const LevelTag = styled.span`
  background: var(--primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  font-weight: 800;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 8px rgba(var(--primary-rgb), 0.3);

  @media (max-width: 600px) {
    padding: 0.18rem 0.55rem;
    font-size: 0.75rem;
  }
`;

const CategoryTag = styled.span`
  background: rgba(var(--foreground-rgb), 0.06);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  font-weight: 700;
  font-size: 0.82rem;
  text-transform: capitalize;

  @media (max-width: 600px) {
    padding: 0.18rem 0.55rem;
    font-size: 0.75rem;
  }
`;

const ProgressCounter = styled.div`
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-secondary);
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 0.4rem 1rem;
  border-radius: 99px;

  @media (max-width: 600px) {
    padding: 0.2rem 0.65rem;
    font-size: 0.78rem;
  }
`;

const PracticeCard = styled.div`
  background: var(--surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 28px;
  border: 1.5px solid var(--border);
  padding: 3rem 2.5rem;
  text-align: center;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 600px) {
    padding: 1.1rem 0.85rem;
    border-radius: 18px;
  }
`;

const SetupTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 850;
  margin-bottom: 0.75rem;
  background: linear-gradient(
    135deg,
    var(--foreground) 0%,
    var(--primary) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 600px) {
    font-size: 1.5rem;
    margin-bottom: 0.4rem;
  }
`;

const SetupSub = styled.p`
  color: var(--text-secondary);
  font-size: 0.98rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    font-size: 0.82rem;
    margin-bottom: 1.25rem;
  }
`;

const SelectionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-bottom: 2.5rem;
  text-align: left;

  @media (max-width: 600px) {
    gap: 1rem;
    margin-bottom: 1.25rem;
  }
`;

const SelectionLabel = styled.label`
  font-size: 0.88rem;
  font-weight: 800;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: block;
  margin-bottom: 0.75rem;

  @media (max-width: 600px) {
    font-size: 0.75rem;
    margin-bottom: 0.4rem;
  }
`;

const OptionGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols || 3}, 1fr);
  gap: 0.75rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(${({ $cols }) => $cols || 3}, 1fr);
    gap: 0.35rem;
  }
`;

const OptionButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active ? "var(--primary)" : "rgba(var(--foreground-rgb), 0.03)"};
  color: ${({ $active }) => ($active ? "white" : "var(--foreground)")};
  border: 1.5px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  padding: 0.85rem 1rem;
  border-radius: 16px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  .desktop-text {
    display: inline;
  }
  .mobile-text {
    display: none;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary);
    color: ${({ $active }) => ($active ? "white" : "var(--primary)")};
  }

  @media (max-width: 600px) {
    padding: 0.55rem 0.25rem;
    border-radius: 10px;
    font-size: 0.78rem;
    font-weight: 800;

    .desktop-text {
      display: none;
    }
    .mobile-text {
      display: inline;
    }
  }
`;

const InstructionBanner = styled.div`
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.08);
  border: 1px solid rgba(var(--primary-rgb, 79, 70, 229), 0.2);
  border-radius: 16px;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  text-align: left;

  .text {
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--foreground);
  }

  .sub {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  @media (max-width: 600px) {
    padding: 0.45rem 0.75rem;
    margin-bottom: 0.75rem;
    border-radius: 12px;

    .text {
      font-size: 0.78rem;
    }
    .sub {
      display: none;
    }
  }
`;

const HintToolbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 0.4rem;
    margin-bottom: 0.75rem;
  }
`;

const ToolIconButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) =>
    $active ? "var(--primary)" : "rgba(var(--foreground-rgb), 0.05)"};
  color: ${({ $active }) => ($active ? "white" : "var(--foreground)")};
  border: 1px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  border-radius: 12px;
  padding: 0.5rem 0.85rem;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary);
    transform: translateY(-1px);
  }

  @media (max-width: 600px) {
    padding: 0.35rem 0.6rem;
    font-size: 0.75rem;
    border-radius: 10px;
  }
`;

const MainTargetWord = styled.h1`
  font-size: 4.25rem;
  font-weight: 850;
  margin: 1rem 0 1.5rem 0;
  color: var(--foreground);
  line-height: 1.15;
  letter-spacing: 0.02em;

  ruby {
    ruby-position: over;
    rt {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 0.2rem;
    }
  }

  @media (max-width: 600px) {
    font-size: 2.2rem;
    margin: 0.25rem 0 0.5rem 0;

    ruby rt {
      font-size: 0.95rem;
    }
  }
`;

const RevealBox = styled.div`
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.04);
  border: 1.5px solid rgba(var(--primary-rgb, 79, 70, 229), 0.2);
  border-radius: 20px;
  padding: 1.75rem 1.5rem;
  margin-top: 1.5rem;
  animation: ${popIn} 0.4s ease-out;
  text-align: center;

  @media (max-width: 600px) {
    padding: 0.85rem 0.65rem;
    margin-top: 0.6rem;
    border-radius: 16px;
  }
`;

const ReadingText = styled.div`
  font-size: 1.35rem;
  color: var(--text-secondary);
  font-weight: 700;
  margin-bottom: 0.4rem;

  @media (max-width: 600px) {
    font-size: 1.05rem;
    margin-bottom: 0.25rem;
  }
`;

const MeaningText = styled.div`
  font-size: 1.65rem;
  font-weight: 850;
  color: var(--primary);
  margin-bottom: 1.25rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }
`;

const BreakdownBox = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.85rem 1.25rem;
  margin-top: 1rem;
  text-align: left;
  font-size: 0.88rem;

  .title {
    font-weight: 800;
    color: var(--text-secondary);
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    margin-bottom: 0.4rem;
  }

  .content {
    color: var(--foreground);
    line-height: 1.5;
  }

  @media (max-width: 600px) {
    padding: 0.6rem 0.75rem;
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.85rem;
  margin-top: 1.75rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.35rem;
    margin-top: 0.75rem;
  }
`;

const BaseButton = styled.button`
  padding: 1rem 1.75rem;
  border-radius: 16px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border: none;

  .desktop-text {
    display: inline;
  }
  .mobile-text {
    display: none;
  }

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 600px) {
    padding: 0.6rem 0.5rem;
    border-radius: 12px;
    font-size: 0.85rem;

    .desktop-text {
      display: none;
    }
    .mobile-text {
      display: inline;
    }
  }
`;

const PrimaryButton = styled(BaseButton)`
  background: var(--primary);
  color: white;
  width: 100%;
  box-shadow: 0 8px 16px -4px rgba(var(--primary-rgb, 79, 70, 229), 0.35);
`;

const SelfAssessButton = styled(BaseButton)<{
  $type: "hard" | "good" | "easy";
}>`
  background: ${({ $type }) =>
    $type === "easy"
      ? "rgba(16, 185, 129, 0.12)"
      : $type === "good"
        ? "rgba(59, 130, 246, 0.12)"
        : "rgba(244, 63, 94, 0.12)"};
  color: ${({ $type }) =>
    $type === "easy" ? "#10b981" : $type === "good" ? "#3b82f6" : "#f43f5e"};
  border: 1.5px solid
    ${({ $type }) =>
      $type === "easy"
        ? "rgba(16, 185, 129, 0.4)"
        : $type === "good"
          ? "rgba(59, 130, 246, 0.4)"
          : "rgba(244, 63, 94, 0.4)"};

  .desktop-text {
    display: inline;
  }
  .mobile-text {
    display: none;
  }

  &:hover {
    background: ${({ $type }) =>
      $type === "easy" ? "#10b981" : $type === "good" ? "#3b82f6" : "#f43f5e"};
    color: white;
  }

  @media (max-width: 600px) {
    padding: 0.55rem 0.25rem;
    font-size: 0.78rem;
    border-radius: 12px;

    .desktop-text {
      display: none;
    }
    .mobile-text {
      display: inline;
    }
  }
`;

// --- Drill Mode Components ---
const DrillOptionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const DrillOptionCard = styled.button<{
  $state: "default" | "correct" | "incorrect" | "disabled";
}>`
  padding: 1rem 1.25rem;
  border-radius: 16px;
  font-size: 1.05rem;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid
    ${({ $state }) =>
      $state === "correct"
        ? "#10b981"
        : $state === "incorrect"
          ? "#f43f5e"
          : "var(--border)"};
  background: ${({ $state }) =>
    $state === "correct"
      ? "rgba(16, 185, 129, 0.1)"
      : $state === "incorrect"
        ? "rgba(244, 63, 94, 0.1)"
        : "rgba(var(--foreground-rgb), 0.02)"};
  color: ${({ $state }) =>
    $state === "correct"
      ? "#10b981"
      : $state === "incorrect"
        ? "#f43f5e"
        : "var(--foreground)"};

  &:hover {
    ${({ $state }) =>
      $state === "default" &&
      `
      border-color: var(--primary);
      background: rgba(var(--primary-rgb), 0.05);
      transform: translateX(4px);
    `}
  }

  @media (max-width: 600px) {
    padding: 0.85rem 1rem;
    font-size: 0.92rem;
    border-radius: 12px;
  }
`;

const ExplanationBanner = styled.div<{ $isCorrect: boolean }>`
  background: ${({ $isCorrect }) =>
    $isCorrect ? "rgba(16, 185, 129, 0.1)" : "rgba(244, 63, 94, 0.1)"};
  border: 1px solid ${({ $isCorrect }) => ($isCorrect ? "#10b981" : "#f43f5e")};
  border-radius: 16px;
  padding: 1.25rem;
  margin-top: 1.5rem;
  text-align: left;
  animation: ${popIn} 0.3s ease-out;

  .header {
    font-weight: 850;
    font-size: 1.1rem;
    color: ${({ $isCorrect }) => ($isCorrect ? "#10b981" : "#f43f5e")};
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .body {
    font-size: 0.92rem;
    color: var(--foreground);
    line-height: 1.5;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: var(--border);
  border-radius: 999px;
  margin-top: 2rem;
  overflow: hidden;

  @media (max-width: 600px) {
    margin-top: 1.25rem;
    height: 6px;
  }
`;

const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => `${$percent}%`};
  background: linear-gradient(
    90deg,
    var(--primary),
    var(--primary-dark, #4f46e5)
  );
  transition: width 0.4s ease;
  border-radius: 999px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 2rem 0;

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
`;

const StatItem = styled.div<{ $color: string }>`
  padding: 1.25rem;
  background: rgba(var(--foreground-rgb), 0.03);
  border: 1px solid var(--border);
  border-radius: 20px;

  .label {
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0.35rem;
  }

  .value {
    font-size: 1.75rem;
    font-weight: 850;
    color: ${({ $color }) => $color};
  }

  @media (max-width: 600px) {
    padding: 0.85rem 0.5rem;
    border-radius: 14px;

    .label {
      font-size: 0.7rem;
    }
    .value {
      font-size: 1.25rem;
    }
  }
`;

// --- Helpers ---
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const kanaToRomajiMap: Record<string, string> = {
  あ: "a",
  い: "i",
  う: "u",
  え: "e",
  お: "o",
  か: "ka",
  き: "ki",
  く: "ku",
  け: "ke",
  こ: "ko",
  さ: "sa",
  し: "shi",
  す: "su",
  せ: "se",
  そ: "so",
  た: "ta",
  ち: "chi",
  つ: "tsu",
  て: "te",
  と: "to",
  な: "na",
  に: "ni",
  ぬ: "nu",
  ね: "ne",
  の: "no",
  は: "ha",
  ひ: "hi",
  ふ: "fu",
  へ: "he",
  ほ: "ho",
  ま: "ma",
  み: "mi",
  む: "mu",
  め: "me",
  も: "mo",
  や: "ya",
  ゆ: "yu",
  よ: "yo",
  ら: "ra",
  り: "ri",
  る: "ru",
  れ: "re",
  ろ: "ro",
  わ: "wa",
  を: "wo",
  ん: "n",
  が: "ga",
  ぎ: "gi",
  ぐ: "gu",
  げ: "ge",
  ご: "go",
  ざ: "za",
  じ: "ji",
  ず: "zu",
  ぜ: "ze",
  ぞ: "zo",
  だ: "da",
  ぢ: "ji",
  づ: "zu",
  で: "de",
  ど: "do",
  ば: "ba",
  び: "bi",
  ぶ: "bu",
  べ: "be",
  ぼ: "bo",
  ぱ: "pa",
  ぴ: "pi",
  ぷ: "pu",
  ぺ: "pe",
  ぽ: "po",
  きゃ: "kya",
  きゅ: "kyu",
  きょ: "kyo",
  しゃ: "sha",
  しゅ: "shu",
  しょ: "sho",
  ちゃ: "cha",
  ちゅ: "chu",
  ちょ: "cho",
  にゃ: "nya",
  にゅ: "nyu",
  にょ: "nyo",
  ひゃ: "hya",
  ひゅ: "hyu",
  ひょ: "hyo",
  みゃ: "mya",
  みゅ: "myu",
  みょ: "myo",
  りゃ: "rya",
  りゅ: "ryu",
  りょ: "ryo",
  ぎゃ: "gya",
  ぎゅ: "gyu",
  ぎょ: "gyo",
  じゃ: "ja",
  じゅ: "ju",
  じょ: "jo",
  びゃ: "bya",
  びゅ: "byu",
  びょ: "byo",
  ぴゃ: "pya",
  ぴゅ: "pyu",
  ぴょ: "pyo",
  ア: "a",
  イ: "i",
  ウ: "u",
  エ: "e",
  オ: "o",
  カ: "ka",
  キ: "ki",
  ク: "ku",
  ケ: "ke",
  コ: "ko",
  サ: "sa",
  シ: "shi",
  ス: "su",
  セ: "se",
  ソ: "so",
  タ: "ta",
  チ: "chi",
  ツ: "tsu",
  テ: "te",
  ト: "to",
  ナ: "na",
  ニ: "ni",
  ヌ: "nu",
  ネ: "ne",
  ノ: "no",
  ハ: "ha",
  ヒ: "hi",
  フ: "fu",
  ヘ: "he",
  ホ: "ho",
  マ: "ma",
  ミ: "mi",
  ム: "mu",
  メ: "me",
  モ: "mo",
  ヤ: "ya",
  ユ: "yu",
  ヨ: "yo",
  ラ: "ra",
  リ: "ri",
  ル: "ru",
  レ: "re",
  ロ: "ro",
  ワ: "wa",
  ヲ: "wo",
  ン: "n",
  ガ: "ga",
  ギ: "gi",
  グ: "gu",
  ゲ: "ge",
  ゴ: "go",
  ザ: "za",
  ジ: "ji",
  ズ: "zu",
  ゼ: "ze",
  ゾ: "zo",
  ダ: "da",
  ヂ: "ji",
  ヅ: "zu",
  デ: "de",
  ド: "do",
  バ: "ba",
  ビ: "bi",
  ブ: "bu",
  ベ: "be",
  ボ: "bo",
  パ: "pa",
  ピ: "pi",
  プ: "pu",
  ペ: "pe",
  ポ: "po",
  キャ: "kya",
  キュ: "kyu",
  キョ: "kyo",
  シャ: "sha",
  シュ: "shu",
  ショ: "sho",
  チャ: "cha",
  チュ: "chu",
  チョ: "cho",
  ニャ: "nya",
  ニュ: "nyu",
  ニョ: "nyo",
  ヒャ: "hya",
  ヒュ: "hyu",
  ヒョ: "hyo",
  ミャ: "mya",
  ミュ: "myu",
  ミョ: "myo",
  リャ: "rya",
  リュ: "ryu",
  リョ: "ryo",
  ギャ: "gya",
  ギュ: "gyu",
  ギョ: "gyo",
  ジャ: "ja",
  ジュ: "ju",
  ジョ: "jo",
  ビャ: "bya",
  ビュ: "byu",
  ビョ: "byo",
  ピャ: "pya",
  ピュ: "pyu",
  ピョ: "pyo",
};

function convertKanaToRomaji(text: string): string {
  if (!text) return "";
  let res = "";
  let i = 0;
  while (i < text.length) {
    if (i + 1 < text.length && kanaToRomajiMap[text.slice(i, i + 2)]) {
      res += kanaToRomajiMap[text.slice(i, i + 2)];
      i += 2;
    } else if (kanaToRomajiMap[text[i]]) {
      res += kanaToRomajiMap[text[i]];
      i += 1;
    } else if (text[i] === "っ" || text[i] === "ッ") {
      if (i + 1 < text.length) {
        const nextR = convertKanaToRomaji(text[i + 1]);
        if (nextR) res += nextR[0];
      }
      i += 1;
    } else if (text[i] === "ー") {
      i += 1;
    } else {
      res += text[i];
      i += 1;
    }
  }
  return res;
}

function formatReadingsWithRomaji(readings: string[] | string): string {
  const list = Array.isArray(readings) ? readings : [readings];
  return list
    .map((r) => {
      const rom = convertKanaToRomaji(r);
      return rom && rom !== r ? `${r} (${rom})` : r;
    })
    .join(", ");
}

function getItemKanjiDetails(item: any) {
  if (!item) return { onyomiStr: "", kunyomiStr: "" };

  let onyomiList: string[] = [];
  let kunyomiList: string[] = [];

  if (
    item.onyomi &&
    (Array.isArray(item.onyomi) ? item.onyomi.length > 0 : true)
  ) {
    onyomiList = Array.isArray(item.onyomi) ? item.onyomi : [item.onyomi];
  }
  if (
    item.kunyomi &&
    (Array.isArray(item.kunyomi) ? item.kunyomi.length > 0 : true)
  ) {
    kunyomiList = Array.isArray(item.kunyomi) ? item.kunyomi : [item.kunyomi];
  }

  // If item is Vocabulary and doesn't explicitly have onyomi/kunyomi, lookup kanji characters in item.word from allKanji
  const targetChars = item.word || item.kanji || "";
  if (targetChars) {
    for (const char of targetChars) {
      const match = allKanji.find((k) => k.kanji === char);
      if (match) {
        if (match.onyomi) {
          const arr = Array.isArray(match.onyomi)
            ? match.onyomi
            : [match.onyomi];
          onyomiList.push(...arr);
        }
        if (match.kunyomi) {
          const arr = Array.isArray(match.kunyomi)
            ? match.kunyomi
            : [match.kunyomi];
          kunyomiList.push(...arr);
        }
      }
    }
  }

  // Remove duplicates
  onyomiList = Array.from(new Set(onyomiList));
  kunyomiList = Array.from(new Set(kunyomiList));

  return {
    onyomiStr:
      onyomiList.length > 0 ? formatReadingsWithRomaji(onyomiList) : "",
    kunyomiStr:
      kunyomiList.length > 0 ? formatReadingsWithRomaji(kunyomiList) : "",
  };
}

function getRevealedReadingHeader(item: any): string {
  if (!item) return "";

  const mainWord = item.word || item.title || item.kanji || "";
  const rawReading =
    item.reading ||
    (item.type === "kanji" ? item.kunyomi?.[0] || item.onyomi?.[0] : "");

  const targetForRomaji = rawReading || mainWord;
  const rom = item.romaji || convertKanaToRomaji(targetForRomaji);

  if (rawReading) {
    if (rom && rawReading.toLowerCase() !== rom.toLowerCase()) {
      return `${rawReading} (${rom})`;
    }
    return rawReading;
  }

  if (mainWord) {
    if (rom && mainWord.toLowerCase() !== rom.toLowerCase()) {
      return `${mainWord} (${rom})`;
    }
    return mainWord;
  }

  return "";
}

function PracticeContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = (searchParams.get("category") as any) || "vocabulary";
  const initialLevel = searchParams.get("level") || "N5";

  // State
  const [items, setItems] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionState, setSessionState] = useState<
    "setup" | "loading" | "practicing" | "completed" | "error"
  >("setup");

  // Options State
  const [practiceMode, setPracticeMode] = useState<"flashcard" | "drill">(
    "flashcard",
  );
  const [setupLevel, setSetupLevel] = useState(initialLevel);
  const [setupCategory, setSetupCategory] = useState(initialCategory);

  // Load saved preferences from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedMode = localStorage.getItem("japanapp_practice_mode");
      if (savedMode === "flashcard" || savedMode === "drill") {
        setPracticeMode(savedMode);
      }

      if (!searchParams.get("level")) {
        const savedLevel = localStorage.getItem("japanapp_practice_level");
        if (
          savedLevel &&
          ["All", "N5", "N4", "N3", "N2", "N1"].includes(savedLevel)
        ) {
          setSetupLevel(savedLevel);
        }
      }

      if (!searchParams.get("category")) {
        const savedCategory = localStorage.getItem(
          "japanapp_practice_category",
        );
        if (
          savedCategory &&
          ["vocabulary", "kanji", "grammar"].includes(savedCategory)
        ) {
          setSetupCategory(savedCategory);
        }
      }
    } catch (e) {
      // ignore storage errors
    }
  }, [searchParams]);

  const handleModeChange = (mode: "flashcard" | "drill") => {
    setPracticeMode(mode);
    try {
      localStorage.setItem("japanapp_practice_mode", mode);
    } catch (e) {}
  };

  const handleLevelChange = (level: string) => {
    setSetupLevel(level);
    try {
      localStorage.setItem("japanapp_practice_level", level);
    } catch (e) {}
  };

  const handleCategoryChange = (category: string) => {
    setSetupCategory(category);
    try {
      localStorage.setItem("japanapp_practice_category", category);
    } catch (e) {}
  };

  // Card View States
  const [isRevealed, setIsRevealed] = useState(false);
  const [showFurigana, setShowFurigana] = useState(true);
  const [showRomaji, setShowRomaji] = useState(false);
  const [showOnyomi, setShowOnyomi] = useState(false);

  // Drill Mode State
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Stats State
  const [stats, setStats] = useState({
    easy: 0,
    good: 0,
    hard: 0,
  });

  const startSession = async () => {
    setSessionState("loading");
    try {
      let baseData: any[] = [];

      if (initialQuery && initialQuery.trim() !== "") {
        baseData = await searchDictionary(
          initialQuery,
          setupCategory as any,
          setupLevel,
        );
      } else {
        if (setupCategory === "kanji") baseData = allKanji;
        else if (setupCategory === "grammar") baseData = allGrammar;
        else baseData = allVocabulary.filter((v) => v.id.startsWith("lib-"));

        if (setupLevel !== "All") {
          baseData = baseData.filter((item) => item.level === setupLevel);
        }
      }

      if (baseData.length === 0) {
        setSessionState("error");
        return;
      }

      const shuffled = shuffleArray(baseData);
      setItems(shuffled.slice(0, 20)); // Limit 20 per session
      setSessionState("practicing");
      setCurrentIndex(0);
      setIsRevealed(false);
      setSelectedOption(null);
      setIsSubmitted(false);
      setShowOnyomi(false);
      setStats({ easy: 0, good: 0, hard: 0 });
    } catch (err) {
      setSessionState("error");
    }
  };

  const currentItem = items[currentIndex];

  const getDisplayMain = (item: any) => {
    if (!item) return "";
    if (item.type === "kanji") return item.kanji;
    if (item.type === "grammar") return item.title;
    return item.word || item.title;
  };

  const getDisplayReading = (item: any) => {
    if (!item) return "";
    if (item.type === "kanji" || item.onyomi || item.kunyomi) {
      const parts = [];
      if (
        item.onyomi &&
        (Array.isArray(item.onyomi) ? item.onyomi.length > 0 : true)
      ) {
        const onStr = Array.isArray(item.onyomi)
          ? item.onyomi.join(", ")
          : item.onyomi;
        parts.push(`音読み (Onyomi): ${onStr}`);
      }
      if (
        item.kunyomi &&
        (Array.isArray(item.kunyomi) ? item.kunyomi.length > 0 : true)
      ) {
        const kunStr = Array.isArray(item.kunyomi)
          ? item.kunyomi.join(", ")
          : item.kunyomi;
        parts.push(`訓読み (Kunyomi): ${kunStr}`);
      }
      if (parts.length > 0) return parts.join(" • ");
    }
    return item.reading || item.romaji || "";
  };

  // Generate 4 Multiple Choice options for Drill Mode
  const currentDrillOptions = useMemo(() => {
    if (!currentItem || items.length === 0) return [];
    const correctMeaning = currentItem.meaning;
    const otherMeanings = items
      .filter((i) => i.meaning !== correctMeaning)
      .map((i) => i.meaning);

    const shuffledOthers = shuffleArray(otherMeanings).slice(0, 3);
    return shuffleArray([correctMeaning, ...shuffledOthers]);
  }, [currentItem, items]);

  const playAudio = (text: string) => {
    if (text) {
      playJapaneseAudio(text);
    }
  };

  const handleSelfAssessment = (type: "hard" | "good" | "easy") => {
    setStats((prev) => ({ ...prev, [type]: prev[type] + 1 }));

    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsRevealed(false);
      setShowOnyomi(false);
    } else {
      setSessionState("completed");
    }
  };

  const handleDrillSubmit = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
    setIsSubmitted(true);

    const isCorrect = option === currentItem.meaning;
    if (isCorrect) {
      setStats((prev) => ({ ...prev, easy: prev.easy + 1 }));
    } else {
      setStats((prev) => ({ ...prev, hard: prev.hard + 1 }));
    }
  };

  const handleNextDrill = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setShowOnyomi(false);
    } else {
      setSessionState("completed");
    }
  };

  return (
    <PageWrapper>
      <BreadcrumbWrapper>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "JLPT Mastery", href: "/jlpt" },
          ]}
          current="Practice"
        />
      </BreadcrumbWrapper>
      <Container>
        {sessionState === "practicing" && (
          <SessionHeader>
            <SessionBadgeGroup>
              <LevelTag>{setupLevel}</LevelTag>
              <CategoryTag>
                {setupCategory} •{" "}
                {practiceMode === "flashcard" ? "🎴 Flashcard" : "🎯 Drill"}
              </CategoryTag>
            </SessionBadgeGroup>

            <ProgressCounter>
              {currentIndex + 1} / {items.length}
            </ProgressCounter>
          </SessionHeader>
        )}

        {/* --- SETUP SCREEN --- */}
        {sessionState === "setup" && (
          <PracticeCard>
            <SetupTitle>Start Practice Hub</SetupTitle>
            <SetupSub>
              Pilih mode dan filter materi latihan sesuai kebutuhan Anda untuk
              mengasah ingatan tanpa tekanan waktu.
            </SetupSub>

            <SelectionGroup>
              <div>
                <SelectionLabel>Pilih Mode Latihan</SelectionLabel>
                <OptionGrid $cols={2}>
                  <OptionButton
                    $active={practiceMode === "flashcard"}
                    onClick={() => handleModeChange("flashcard")}
                  >
                    <span className="desktop-text">
                      🎴 Flashcard Mastery (Flip Card)
                    </span>
                    <span className="mobile-text">🎴 Flashcard</span>
                  </OptionButton>
                  <OptionButton
                    $active={practiceMode === "drill"}
                    onClick={() => handleModeChange("drill")}
                  >
                    <span className="desktop-text">
                      🎯 Interactive Drill (Pilihan Ganda)
                    </span>
                    <span className="mobile-text">🎯 Kuis Drill</span>
                  </OptionButton>
                </OptionGrid>
              </div>

              <div>
                <SelectionLabel>Pilih Level JLPT</SelectionLabel>
                <OptionGrid $cols={6}>
                  {["All", "N5", "N4", "N3", "N2", "N1"].map((l) => (
                    <OptionButton
                      key={l}
                      $active={setupLevel === l}
                      onClick={() => handleLevelChange(l)}
                    >
                      {l}
                    </OptionButton>
                  ))}
                </OptionGrid>
              </div>

              <div>
                <SelectionLabel>Pilih Kategori Materi</SelectionLabel>
                <OptionGrid $cols={3}>
                  {[
                    {
                      id: "vocabulary",
                      desktop: "Kosakata (Vocabulary)",
                      mobile: "Kosakata",
                    },
                    { id: "kanji", desktop: "Kanji", mobile: "Kanji" },
                    {
                      id: "grammar",
                      desktop: "Tata Bahasa (Grammar)",
                      mobile: "Tata Bahasa",
                    },
                  ].map((c) => (
                    <OptionButton
                      key={c.id}
                      $active={setupCategory === c.id}
                      onClick={() => handleCategoryChange(c.id)}
                    >
                      <span className="desktop-text">{c.desktop}</span>
                      <span className="mobile-text">{c.mobile}</span>
                    </OptionButton>
                  ))}
                </OptionGrid>
              </div>
            </SelectionGroup>

            <PrimaryButton onClick={startSession}>
              <span className="desktop-text">Mulai Sesi Latihan Sekarang</span>
              <span className="mobile-text">Mulai Latihan Sekarang</span>
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </PrimaryButton>
          </PracticeCard>
        )}

        {/* --- LOADING --- */}
        {sessionState === "loading" && (
          <div
            style={{
              padding: "4rem",
              textAlign: "center",
              color: "var(--text-secondary)",
            }}
          >
            <p style={{ fontSize: "1.1rem" }}>
              Menyiapkan materi latihan JLPT Anda...
            </p>
          </div>
        )}

        {/* --- ERROR / NO DATA --- */}
        {sessionState === "error" && (
          <PracticeCard>
            <h2 style={{ color: "var(--foreground)" }}>Data Belum Tersedia</h2>
            <p
              style={{
                marginTop: "1rem",
                textAlign: "center",
                color: "var(--text-secondary)",
                marginBottom: "2.5rem",
              }}
            >
              Maaf, belum ada item yang cocok dengan kombinasi filter level dan
              kategori ini. Silakan coba filter lain!
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <PrimaryButton onClick={() => setSessionState("setup")}>
                Ubah Filter
              </PrimaryButton>
            </div>
          </PracticeCard>
        )}

        {/* --- FLASHCARD PRACTICE MODE --- */}
        {sessionState === "practicing" &&
          currentItem &&
          practiceMode === "flashcard" && (
            <>
              <PracticeCard>
                <InstructionBanner>
                  <div>
                    <div className="text">
                      💡 Tebak Cara Baca & Arti Kata Berikut
                    </div>
                    <div className="sub">
                      Gunakan tombol bantuan Furigana/Audio jika diperlukan,
                      lalu klik "Buka Jawaban".
                    </div>
                  </div>
                </InstructionBanner>

                {/* Hint & Audio Toolbar */}
                <HintToolbar>
                  <ToolIconButton
                    onClick={() => playAudio(getDisplayMain(currentItem))}
                    title="Dengar Suara"
                  >
                    🔊 Suara
                  </ToolIconButton>

                  {currentItem.reading && (
                    <ToolIconButton
                      $active={showFurigana}
                      onClick={() => setShowFurigana(!showFurigana)}
                    >
                      あ Furigana
                    </ToolIconButton>
                  )}

                  {currentItem.romaji && (
                    <ToolIconButton
                      $active={showRomaji}
                      onClick={() => setShowRomaji(!showRomaji)}
                    >
                      abc Romaji
                    </ToolIconButton>
                  )}
                </HintToolbar>

                {/* Main Word Display */}
                <MainTargetWord>
                  {showFurigana && currentItem.reading ? (
                    <ruby>
                      {getDisplayMain(currentItem)}
                      <rt>{currentItem.reading}</rt>
                    </ruby>
                  ) : (
                    getDisplayMain(currentItem)
                  )}
                </MainTargetWord>

                {/* Optional Romaji Hint */}
                {showRomaji && currentItem.romaji && (
                  <div
                    style={{
                      fontSize: "1.1rem",
                      color: "var(--primary)",
                      fontWeight: 700,
                      marginBottom: "0.75rem",
                    }}
                  >
                    [{currentItem.romaji}]
                  </div>
                )}

                {/* Reveal & Self-Assessment */}
                {!isRevealed ? (
                  <PrimaryButton
                    onClick={() => setIsRevealed(true)}
                    style={{ marginTop: "1.5rem" }}
                  >
                    Buka Jawaban (Show Answer)
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </PrimaryButton>
                ) : (
                  <RevealBox>
                    <ReadingText>
                      {getRevealedReadingHeader(currentItem)}
                    </ReadingText>
                    <MeaningText>{currentItem.meaning}</MeaningText>

                    {/* Onyomi & Kunyomi Breakdown with Latin Romaji */}
                    {(() => {
                      const { onyomiStr, kunyomiStr } =
                        getItemKanjiDetails(currentItem);
                      if (!onyomiStr && !kunyomiStr) return null;
                      return (
                        <BreakdownBox
                          style={{ marginBottom: "0.85rem", marginTop: "1rem" }}
                        >
                          <div className="title">
                            Cara Baca Kanji (Onyomi & Kunyomi)
                          </div>
                          <div className="content">
                            {onyomiStr && (
                              <div>
                                <strong style={{ color: "var(--primary)" }}>
                                  音読み (Onyomi):
                                </strong>{" "}
                                {onyomiStr}
                              </div>
                            )}
                            {kunyomiStr && (
                              <div style={{ marginTop: "0.35rem" }}>
                                <strong style={{ color: "var(--primary)" }}>
                                  訓読み (Kunyomi):
                                </strong>{" "}
                                {kunyomiStr}
                              </div>
                            )}
                          </div>
                        </BreakdownBox>
                      );
                    })()}

                    {/* Kanji stroke count / radical breakdown if present */}
                    {currentItem.strokeCount && (
                      <BreakdownBox>
                        <div className="title">Detail Kanji</div>
                        <div className="content">
                          Jumlah Goresan: {currentItem.strokeCount} | Radikal:{" "}
                          {currentItem.radical || "-"}
                        </div>
                      </BreakdownBox>
                    )}

                    <ActionGrid>
                      <SelfAssessButton
                        $type="hard"
                        onClick={() => handleSelfAssessment("hard")}
                      >
                        <span className="desktop-text">
                          ❌ Perlu Diulang (Hard)
                        </span>
                        <span className="mobile-text">❌ Hard</span>
                      </SelfAssessButton>
                      <SelfAssessButton
                        $type="good"
                        onClick={() => handleSelfAssessment("good")}
                      >
                        <span className="desktop-text">
                          🤔 Cukup Paham (Good)
                        </span>
                        <span className="mobile-text">🤔 Good</span>
                      </SelfAssessButton>
                      <SelfAssessButton
                        $type="easy"
                        onClick={() => handleSelfAssessment("easy")}
                      >
                        <span className="desktop-text">
                          ✅ Sudah Kuasai (Easy)
                        </span>
                        <span className="mobile-text">✅ Easy</span>
                      </SelfAssessButton>
                    </ActionGrid>
                  </RevealBox>
                )}
              </PracticeCard>

              <ProgressBarContainer>
                <ProgressFill
                  $percent={((currentIndex + 1) / items.length) * 100}
                />
              </ProgressBarContainer>
            </>
          )}

        {/* --- INTERACTIVE DRILL PRACTICE MODE (Pilihan Ganda) --- */}
        {sessionState === "practicing" &&
          currentItem &&
          practiceMode === "drill" && (
            <>
              <PracticeCard>
                <InstructionBanner>
                  <div>
                    <div className="text">
                      🎯 Pilih Arti Kata / Tata Bahasa yang Paling Tepat
                    </div>
                    <div className="sub">
                      Klik salah satu dari 4 opsi di bawah. Penjelasan instan
                      akan muncul begitu dipilih!
                    </div>
                  </div>
                </InstructionBanner>

                {/* Target word */}
                <MainTargetWord>{getDisplayMain(currentItem)}</MainTargetWord>

                {currentItem.reading && (
                  <div
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--text-secondary)",
                      fontWeight: 700,
                      marginBottom: "1.5rem",
                    }}
                  >
                    Cara Baca: {currentItem.reading}
                  </div>
                )}

                {/* Multiple choice options */}
                <DrillOptionsGrid>
                  {currentDrillOptions.map((optIndex, idx) => {
                    const isSelected = selectedOption === optIndex;
                    const isCorrect = optIndex === currentItem.meaning;
                    let state:
                      "default" | "correct" | "incorrect" | "disabled" =
                      "default";

                    if (isSubmitted) {
                      if (isCorrect) state = "correct";
                      else if (isSelected) state = "incorrect";
                      else state = "disabled";
                    }

                    return (
                      <DrillOptionCard
                        key={idx}
                        $state={state}
                        disabled={isSubmitted}
                        onClick={() => handleDrillSubmit(optIndex)}
                      >
                        <span>
                          <strong>{String.fromCharCode(65 + idx)}.</strong>{" "}
                          {optIndex}
                        </span>
                        {isSubmitted && isCorrect && <span>✅</span>}
                        {isSubmitted && isSelected && !isCorrect && (
                          <span>❌</span>
                        )}
                      </DrillOptionCard>
                    );
                  })}
                </DrillOptionsGrid>

                {/* Instant Explanation Banner */}
                {isSubmitted && (
                  <>
                    <ExplanationBanner
                      $isCorrect={selectedOption === currentItem.meaning}
                    >
                      <div className="header">
                        {selectedOption === currentItem.meaning
                          ? "🎉 Jawaban Benar!"
                          : "💡 Penjelasan Jawaban"}
                      </div>
                      <div className="body">
                        <strong>{getDisplayMain(currentItem)}</strong> (
                        {getDisplayReading(currentItem)}) artinya adalah{" "}
                        <span
                          style={{ color: "var(--primary)", fontWeight: 800 }}
                        >
                          "{currentItem.meaning}"
                        </span>
                        .
                        {currentItem.exampleSentence && (
                          <div style={{ marginTop: "0.5rem" }}>
                            <em>Contoh: {currentItem.exampleSentence}</em>
                          </div>
                        )}
                      </div>
                    </ExplanationBanner>

                    <PrimaryButton
                      onClick={handleNextDrill}
                      style={{ marginTop: "1.5rem" }}
                    >
                      Lanjut ke Soal Berikutnya →
                    </PrimaryButton>
                  </>
                )}
              </PracticeCard>

              <ProgressBarContainer>
                <ProgressFill
                  $percent={((currentIndex + 1) / items.length) * 100}
                />
              </ProgressBarContainer>
            </>
          )}

        {/* --- COMPLETED SUMMARY --- */}
        {sessionState === "completed" && (
          <PracticeCard style={{ animation: `${slideInRight} 0.5s ease-out` }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎉</div>
            <h2 style={{ fontSize: "2rem", fontWeight: 850 }}>
              Sesi Latihan Selesai!
            </h2>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
              Luar biasa! Anda telah menyelesaikan 20 item latihan {setupLevel}{" "}
              ({setupCategory}).
            </p>

            <StatsGrid>
              <StatItem $color="#10b981">
                <div className="label">Kuasai (Easy)</div>
                <div className="value">{stats.easy}</div>
              </StatItem>
              <StatItem $color="#3b82f6">
                <div className="label">Cukup (Good)</div>
                <div className="value">{stats.good}</div>
              </StatItem>
              <StatItem $color="#f43f5e">
                <div className="label">Perlu Diulang</div>
                <div className="value">{stats.hard}</div>
              </StatItem>
            </StatsGrid>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginTop: "2rem",
              }}
            >
              <PrimaryButton
                onClick={() => {
                  setItems(shuffleArray(items));
                  setCurrentIndex(0);
                  setIsRevealed(false);
                  setSelectedOption(null);
                  setIsSubmitted(false);
                  setStats({ easy: 0, good: 0, hard: 0 });
                  setSessionState("practicing");
                }}
                style={{ flex: 1, minWidth: "160px" }}
              >
                Ulangi Sesi Ini 🔄
              </PrimaryButton>
              <BaseButton
                onClick={() => setSessionState("setup")}
                style={{
                  background: "transparent",
                  color: "var(--foreground)",
                  border: "1.5px solid var(--border)",
                  flex: 1,
                  minWidth: "160px",
                }}
              >
                Pengaturan Baru ⚙️
              </BaseButton>
            </div>
          </PracticeCard>
        )}
      </Container>
    </PageWrapper>
  );
}

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "4rem", textAlign: "center" }}>
          Menyiapkan Sesi Latihan...
        </div>
      }
    >
      <PracticeContent />
    </Suspense>
  );
}
