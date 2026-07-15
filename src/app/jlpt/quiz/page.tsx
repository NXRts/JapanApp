"use client";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import {
  allGrammar,
  allKanji,
  allVocabulary,
  searchDictionary,
} from "@/lib/dictionary";
import { playJapaneseAudio } from "@/lib/audio";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

// --- Types & Interfaces ---
interface QuizQuestion {
  type: "meaning" | "reading" | "kanji";
  item: any;
  options: any[];
  correctOptionIndex: number;
}

interface UserAnswer {
  question: QuizQuestion;
  selectedIndex: number; // -1 if timed out
  isCorrect: boolean;
}

interface QuizStats {
  gamesPlayed: number;
  highScore: number;
  totalXP: number;
  accuracySum: number;
}

// --- Icons ---
const SpeakerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#10b981"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ef4444"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s ease",
      color: "var(--text-secondary)",
    }}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- Styled Components ---
const PageWrapper = styled.div`
  min-height: 90vh;
  color: var(--foreground);
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

// --- Lobby Styles ---
const LobbyCard = styled.div`
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

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1rem;
  text-align: center;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .value {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--primary-light, #818cf8);
  }

  .label {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const StartButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark, #4f46e5) 100%
  );
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px rgba(var(--primary-rgb, 79, 70, 229), 0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 15px 20px -5px rgba(var(--primary-rgb, 79, 70, 229), 0.35);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    margin-top: auto;
    padding: 0.85rem;
    font-size: 1rem;
  }
`;

// --- Play Screen Styles ---
const QuizCard = styled.div`
  background: var(--surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 28px;
  border: 1px solid var(--border);
  padding: 3rem 2.5rem;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
    border-radius: 20px;
    min-height: calc(100vh - 215px);
  }
`;

const TopActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;

  @media (max-width: 600px) {
    margin-bottom: 1.25rem;
  }
`;

const StreakBadge = styled.div<{ $streak: number }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
  border: 1px solid rgba(249, 115, 22, 0.2);
  padding: 0.4rem 0.8rem;
  border-radius: 99px;
  font-weight: 800;
  font-size: 0.85rem;
  opacity: ${({ $streak }) => ($streak > 0 ? 1 : 0)};
  transform: scale(${({ $streak }) => ($streak > 0 ? 1 : 0.8)});
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const QuestionCount = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-secondary);
`;

const QTypeBadge = styled.div`
  display: inline-block;
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
  color: var(--primary-light, #818cf8);
  border: 1px solid rgba(var(--primary-rgb, 79, 70, 229), 0.2);
  padding: 0.35rem 0.75rem;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;

  @media (max-width: 600px) {
    padding: 0.3rem 0.7rem;
    font-size: 0.72rem;
    margin-bottom: 0.85rem;
  }
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
  text-align: center;

  @media (max-width: 600px) {
    margin-bottom: 1.5rem;
  }
`;

const QuestionText = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--foreground);

  @media (max-width: 600px) {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }
`;

const SpeakerButton = styled.button`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
    color: var(--primary);
    border-color: var(--primary);
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    width: 36px;
    height: 36px;

    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }
`;

const QuizOptionCard = styled.button<{
  $state?: "correct" | "incorrect" | "neutral";
}>`
  padding: 1.25rem 1.5rem;
  border-radius: 18px;
  border: 2px solid
    ${({ $state }) =>
      $state === "correct"
        ? "#10b981"
        : $state === "incorrect"
          ? "#ef4444"
          : "var(--border)"};
  background: ${({ $state }) =>
    $state === "correct"
      ? "rgba(16, 185, 129, 0.1)"
      : $state === "incorrect"
        ? "rgba(239, 68, 68, 0.1)"
        : "rgba(255, 255, 255, 0.02)"};
  color: ${({ $state }) =>
    $state === "correct"
      ? "#10b981"
      : $state === "incorrect"
        ? "#ef4444"
        : "var(--foreground)"};
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  pointer-events: ${({ $state }) =>
    $state && $state !== "neutral" ? "none" : "auto"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  .option-text-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    text-align: left;
  }

  .option-main {
    font-size: 1.05rem;
  }

  .option-sub {
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .feedback-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid currentColor;
  }

  &:hover {
    transform: ${({ $state }) =>
      $state === "neutral" ? "translateY(-2px)" : "none"};
    border-color: ${({ $state }) =>
      $state === "neutral" ? "var(--primary)" : ""};
    background: ${({ $state }) =>
      $state === "neutral" ? "rgba(255, 255, 255, 0.04)" : ""};
  }

  @media (max-width: 600px) {
    padding: 0.9rem 1.1rem;
    border-radius: 14px;

    .option-main {
      font-size: 1.05rem;
    }

    .option-sub {
      font-size: 0.78rem;
    }
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 99px;
  overflow: hidden;
  margin-top: 1rem;

  @media (max-width: 600px) {
    height: 5px;
    margin-top: auto;
    padding-top: 0.5rem;
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
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 99px;
`;

const TimerContainer = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 99px;
  overflow: hidden;
  margin-top: 1.5rem;

  @media (max-width: 600px) {
    height: 4px;
    margin-top: 0.75rem;
  }
`;

const TimerProgress = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => `${$percent}%`};
  background: ${({ $percent }) => {
    if ($percent > 50) return "#10b981";
    if ($percent > 20) return "#f59e0b";
    return "#ef4444";
  }};
  transition: width 0.1s linear;
  border-radius: 99px;
`;

// --- Results Dashboard Styles ---
const ResultOverlay = styled.div`
  background: var(--surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 28px;
  border: 1px solid var(--border);
  padding: 3rem 2rem;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;

  @media (max-width: 600px) {
    padding: 2rem 1rem;
    gap: 1.5rem;
    min-height: calc(100vh - 215px);
  }
`;

const GradeBadge = styled.div<{ $grade: string }>`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  font-weight: 900;
  border: 4px solid;
  margin: 0 auto;
  box-shadow: var(--shadow-md);

  color: ${({ $grade }) => {
    if ($grade === "S") return "#f59e0b";
    if ($grade === "A") return "#10b981";
    if ($grade === "B") return "#3b82f6";
    if ($grade === "C") return "#8b5cf6";
    return "#ef4444";
  }};

  @media (max-width: 600px) {
    width: 68px;
    height: 68px;
    font-size: 2.2rem;
    border-width: 3px;
  }
`;

const ResultHeader = styled.div`
  h2 {
    font-size: 1.6rem;
    font-weight: 800;
    margin: 0;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin: 0.25rem 0 0 0;
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 1.25rem;
    }
    p {
      font-size: 0.75rem;
    }
  }
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  width: 100%;
  margin-top: 0.5rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.3rem;
  }
`;

const ResultStatBox = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  .value {
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--foreground);
  }

  .label {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  @media (max-width: 600px) {
    padding: 0.4rem 0.15rem;
    border-radius: 10px;

    .value {
      font-size: 0.82rem;
    }

    .label {
      font-size: 0.5rem;
      letter-spacing: 0.01em;
    }
  }
`;

const ReviewSection = styled.div`
  width: 100%;
  text-align: left;
  margin-top: 1rem;
`;

const ReviewTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--foreground);
  border-left: 3px solid var(--primary);
  padding-left: 0.75rem;

  @media (max-width: 600px) {
    font-size: 0.95rem;
    margin-bottom: 0.6rem;
  }
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 99px;
  }

  @media (max-width: 600px) {
    max-height: 210px;
    gap: 0.5rem;
  }
`;

const ReviewItemContainer = styled.div`
  border: 1px solid var(--border);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.01);
  overflow: hidden;
  transition: all 0.2s;
  flex-shrink: 0;
`;

const ReviewItemHeader = styled.button`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  color: var(--foreground);

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .left-side {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .marker {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.03);
  }

  .q-text {
    font-size: 1.1rem;
    font-weight: 700;
  }

  .q-type-meta {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-top: 0.15rem;
  }

  @media (max-width: 600px) {
    padding: 0.75rem 0.6rem;

    .q-text {
      font-size: 0.95rem;
    }

    .q-type-meta {
      font-size: 0.68rem;
    }
  }
`;

const ReviewItemBody = styled.div`
  padding: 0 1rem 1rem 1rem;
  border-top: 1px dashed var(--border);
  background: rgba(0, 0, 0, 0.05);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  animation: slideDown 0.2s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    margin-top: 0.5rem;
  }

  .meta-tag {
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.2rem 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    color: var(--text-secondary);
  }

  .detail-label {
    font-weight: 700;
    color: var(--text-secondary);
  }

  .answer-comparison {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-top: 0.25rem;
    background: rgba(255, 255, 255, 0.02);
    padding: 0.6rem;
    border-radius: 8px;
  }
`;

const ActionsRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;

  @media (max-width: 600px) {
    flex-direction: row;
    gap: 0.5rem;
    margin-top: auto;
  }
`;

const ResultsPrimaryButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark, #4f46e5) 100%
  );
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 8px 12px -3px rgba(var(--primary-rgb, 79, 70, 229), 0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 16px -4px rgba(var(--primary-rgb, 79, 70, 229), 0.35);
  }

  @media (max-width: 600px) {
    padding: 0.75rem;
    font-size: 0.85rem;
    border-radius: 10px;
  }
`;

const SecondaryButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--foreground);
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.02);
  }

  @media (max-width: 600px) {
    padding: 0.75rem;
    font-size: 0.85rem;
    border-radius: 10px;
  }
`;

// --- Utility Functions ---
function shuffleArray(array: any[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// --- Main Quiz Content Component ---
function QuizContent() {
  const searchParams = useSearchParams();

  const queryParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";
  const levelParam = searchParams.get("level") || "";

  // Lobby States
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("mix");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timeAttack, setTimeAttack] = useState<boolean>(false);

  // Stats from LocalStorage
  const [stats, setStats] = useState<QuizStats>({
    gamesPlayed: 0,
    highScore: 0,
    totalXP: 0,
    accuracySum: 0,
  });

  // Gameplay States
  const [quizState, setQuizState] = useState<
    "lobby" | "loading" | "playing" | "results" | "error"
  >("lobby");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [expandedReviewIdx, setExpandedReviewIdx] = useState<number | null>(
    null,
  );

  // Time Attack Timer State
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load stats and set lobby configurations from URL params on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("jlpt-quiz-stats-v2");
      if (stored) {
        try {
          setStats(JSON.parse(stored));
        } catch (_) {}
      }
    }

    if (levelParam) setSelectedLevel(levelParam);
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [levelParam, categoryParam]);

  // Save Stats to LocalStorage
  const saveStats = (finalScore: number, finalXP: number, qLength: number) => {
    const accuracy = Math.round((finalScore / qLength) * 100);
    const newStats: QuizStats = {
      gamesPlayed: stats.gamesPlayed + 1,
      highScore: Math.max(stats.highScore, finalScore),
      totalXP: stats.totalXP + finalXP,
      accuracySum: stats.accuracySum + accuracy,
    };
    setStats(newStats);
    if (typeof window !== "undefined") {
      localStorage.setItem("jlpt-quiz-stats-v2", JSON.stringify(newStats));
    }
  };

  // Average Accuracy Helper
  const averageAccuracy = useMemo(() => {
    if (stats.gamesPlayed === 0) return 0;
    return Math.round(stats.accuracySum / stats.gamesPlayed);
  }, [stats]);

  // Fail-Safe TTS Audio Speech
  const playAudio = (text: string) => {
    if (text) {
      playJapaneseAudio(text);
    }
  };

  // Generate dynamic questions logic
  const startQuiz = async () => {
    setQuizState("loading");
    try {
      let pool: any[] = [];

      if (selectedCategory === "kanji") {
        pool = allKanji.map((x) => ({ ...x, type: "kanji" }));
      } else if (selectedCategory === "grammar") {
        pool = allGrammar.map((x) => ({ ...x, type: "grammar" }));
      } else if (selectedCategory === "vocabulary") {
        pool = allVocabulary
          .filter((x) => x.id.startsWith("lib-"))
          .map((x) => ({ ...x, type: "vocabulary" }));
      } else {
        pool = [
          ...allKanji.map((x) => ({ ...x, type: "kanji" })),
          ...allGrammar.map((x) => ({ ...x, type: "grammar" })),
          ...allVocabulary
            .filter((x) => x.id.startsWith("lib-"))
            .map((x) => ({ ...x, type: "vocabulary" })),
        ];
      }

      if (selectedLevel !== "All") {
        pool = pool.filter((item) => item.level === selectedLevel);
      }

      if (queryParam && queryParam.trim() !== "") {
        const filteredSearch = await searchDictionary(
          queryParam,
          "vocabulary",
          selectedLevel,
        );
        if (filteredSearch.length > 0) {
          pool = pool.filter((p) => filteredSearch.some((f) => f.id === p.id));
        }
      }

      if (pool.length < 4) {
        setQuizState("error");
        return;
      }

      const selected = shuffleArray(pool).slice(
        0,
        Math.min(questionCount, pool.length),
      );

      const generated: QuizQuestion[] = selected.map((item) => {
        let types: ("meaning" | "reading" | "kanji")[] = ["meaning"];
        if (item.type === "kanji") {
          types = ["meaning", "reading", "kanji"];
        } else if (item.type === "vocabulary") {
          types = ["meaning", "reading", "kanji"];
        }

        const qType = types[Math.floor(Math.random() * types.length)];

        const others = pool.filter((x) => {
          if (x.id === item.id) return false;
          if (item.type === "kanji") return x.type === "kanji";
          if (item.type === "grammar") return x.type === "grammar";
          return x.type !== "kanji" && x.type !== "grammar";
        });

        const wrongs = shuffleArray(others).slice(0, 3);
        const options = shuffleArray([item, ...wrongs]);
        const correctOptionIndex = options.findIndex((o) => o.id === item.id);

        return {
          type: qType,
          item,
          options,
          correctOptionIndex,
        };
      });

      setQuestions(generated);
      setCurrentIndex(0);
      setScore(0);
      setStreak(0);
      setMaxStreak(0);
      setXpEarned(0);
      setUserAnswers([]);
      setSelectedOptionIndex(null);
      setQuizState("playing");
    } catch (_) {
      setQuizState("error");
    }
  };

  useEffect(() => {
    if (quizState !== "playing" || !timeAttack) return;

    setTimeLeft(10);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          clearInterval(timerRef.current!);
          handleOptionClick(-1, false);
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, quizState, timeAttack]);

  const handleOptionClick = (optionIndex: number, isCorrect: boolean) => {
    if (selectedOptionIndex !== null) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOptionIndex(optionIndex);

    const currentQuestion = questions[currentIndex];
    let addedXP = 0;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      const currentStreak = streak + 1;
      setStreak(currentStreak);
      setMaxStreak((prev) => Math.max(prev, currentStreak));

      addedXP = 100 + currentStreak * 20;
      setXpEarned((prev) => prev + addedXP);
    } else {
      setStreak(0);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion,
        selectedIndex: optionIndex,
        isCorrect,
      },
    ]);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOptionIndex(null);
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        const finalXP = xpEarned + addedXP;
        saveStats(finalScore, finalXP, questions.length);
        setQuizState("results");
      }
    }, 1600);
  };

  const getQuestionContent = (q: QuizQuestion) => {
    const item = q.item;
    if (q.type === "kanji") {
      return {
        instruction: "Find the correct Kanji / Word:",
        main:
          item.meaning || item.indonesian || item.english || "No Definition",
      };
    }
    if (q.type === "reading") {
      return {
        instruction: "What is the reading (Furigana)?",
        main: item.word || item.kanji || item.title,
      };
    }
    return {
      instruction: "What does this mean?",
      main: item.word || item.kanji || item.title,
    };
  };

  const getOptionLabel = (opt: any, qType: "meaning" | "reading" | "kanji") => {
    if (qType === "kanji") {
      return {
        main: opt.word || opt.kanji || opt.title,
        sub: opt.reading || "",
      };
    }
    if (qType === "reading") {
      return {
        main: opt.reading || opt.romaji || "No reading",
        sub: opt.meaning || opt.indonesian || opt.english || "",
      };
    }
    return {
      main: opt.meaning || opt.indonesian || opt.english || "No Definition",
      sub: opt.reading || opt.romaji || "",
    };
  };

  const getPerformanceGrade = (ratio: number) => {
    if (ratio === 1)
      return {
        grade: "S",
        title: "Perfect Score! 💮",
        desc: "Amazing! Your knowledge is flawless!",
      };
    if (ratio >= 0.9)
      return {
        grade: "A",
        title: "Outstanding! 🌟",
        desc: "Incredible accuracy. Keep up the high score!",
      };
    if (ratio >= 0.8)
      return {
        grade: "B",
        title: "Great Job! 👍",
        desc: "Very strong understanding. Study details to reach S!",
      };
    if (ratio >= 0.6)
      return {
        grade: "C",
        title: "Good Effort! 💪",
        desc: "Solid attempt. Review wrong answers below.",
      };
    return {
      grade: "D",
      title: "Keep Practicing! 📚",
      desc: "Review the vocabulary library and try again.",
    };
  };

  const resultsGrade = useMemo(() => {
    if (questions.length === 0) return { grade: "D", title: "", desc: "" };
    return getPerformanceGrade(score / questions.length);
  }, [score, questions]);

  return (
    <PageWrapper>
      <BreadcrumbWrapper>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "JLPT Mastery", href: "/jlpt" },
          ]}
          current="Quiz"
        />
      </BreadcrumbWrapper>

      <Container>
        {/* --- 1. LOBBY STATE --- */}
        {quizState === "lobby" && (
          <LobbyCard>
            <SetupTitle>JLPT Quiz Hub</SetupTitle>
            <SetupSub>
              Pilih mode kuis dan tantang penguasaan materi JLPT Anda dalam batasan waktu yang terukur.
            </SetupSub>

            {stats.gamesPlayed > 0 && (
              <StatsRow style={{ marginBottom: "1.5rem" }}>
                <StatItem>
                  <span className="value">{stats.gamesPlayed}</span>
                  <span className="label">Played</span>
                </StatItem>
                <StatItem>
                  <span className="value">{averageAccuracy}%</span>
                  <span className="label">Accuracy</span>
                </StatItem>
                <StatItem>
                  <span className="value">{stats.totalXP}</span>
                  <span className="label">Total XP</span>
                </StatItem>
              </StatsRow>
            )}

            <SelectionGroup>
              <div>
                <SelectionLabel>Pilih Mode Kuis</SelectionLabel>
                <OptionGrid $cols={2}>
                  <OptionButton
                    $active={!timeAttack}
                    onClick={() => setTimeAttack(false)}
                  >
                    <span className="desktop-text">⚡ Express Quiz (Relaxed)</span>
                    <span className="mobile-text">⚡ Relaxed</span>
                  </OptionButton>
                  <OptionButton
                    $active={timeAttack}
                    onClick={() => setTimeAttack(true)}
                  >
                    <span className="desktop-text">🔥 Time Attack (10 Detik/Soal)</span>
                    <span className="mobile-text">🔥 Time Attack</span>
                  </OptionButton>
                </OptionGrid>
              </div>

              <div>
                <SelectionLabel>Pilih Level JLPT</SelectionLabel>
                <OptionGrid $cols={6}>
                  {["All", "N5", "N4", "N3", "N2", "N1"].map((lvl) => (
                    <OptionButton
                      key={lvl}
                      $active={selectedLevel === lvl}
                      onClick={() => setSelectedLevel(lvl)}
                    >
                      {lvl}
                    </OptionButton>
                  ))}
                </OptionGrid>
              </div>

              <div>
                <SelectionLabel>Pilih Kategori Materi</SelectionLabel>
                <OptionGrid $cols={4}>
                  {[
                    { id: "mix", desktop: "Semua Mix", mobile: "Mix" },
                    { id: "vocabulary", desktop: "Kosakata", mobile: "Kosakata" },
                    { id: "kanji", desktop: "Kanji", mobile: "Kanji" },
                    { id: "grammar", desktop: "Tata Bahasa", mobile: "Grammar" },
                  ].map((cat) => (
                    <OptionButton
                      key={cat.id}
                      $active={selectedCategory === cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      <span className="desktop-text">{cat.desktop}</span>
                      <span className="mobile-text">{cat.mobile}</span>
                    </OptionButton>
                  ))}
                </OptionGrid>
              </div>

              <div>
                <SelectionLabel>Jumlah Soal</SelectionLabel>
                <OptionGrid $cols={3}>
                  {[10, 20, 30].map((num) => (
                    <OptionButton
                      key={num}
                      $active={questionCount === num}
                      onClick={() => setQuestionCount(num)}
                    >
                      <span className="desktop-text">{num} Soal</span>
                      <span className="mobile-text">{num}</span>
                    </OptionButton>
                  ))}
                </OptionGrid>
              </div>
            </SelectionGroup>

            <PrimaryButton onClick={startQuiz}>
              <span className="desktop-text">Mulai Sesi Kuis Sekarang</span>
              <span className="mobile-text">Mulai Kuis Sekarang</span>
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
          </LobbyCard>
        )}

        {/* --- 2. LOADING STATE --- */}
        {quizState === "loading" && (
          <LobbyCard
            style={{
              alignItems: "center",
              justifyContent: "center",
              minHeight: "300px",
            }}
          >
            <div
              className="spinner"
              style={{ fontSize: "2rem", marginBottom: "1rem" }}
            >
              ⌛
            </div>
            <h3 style={{ margin: 0 }}>Generating Quiz...</h3>
            <p
              style={{ color: "var(--text-secondary)", margin: "0.5rem 0 0 0" }}
            >
              Curating mixed questions for Level {selectedLevel}...
            </p>
          </LobbyCard>
        )}

        {/* --- 3. ERROR STATE --- */}
        {quizState === "error" && (
          <LobbyCard style={{ textAlign: "center" }}>
            <h3 style={{ color: "#ef4444" }}>Not Enough Content</h3>
            <p style={{ color: "var(--text-secondary)" }}>
              The selected filter combination (Level {selectedLevel} -{" "}
              {selectedCategory}) does not contain enough items in the
              dictionary database to build a 4-choice quiz.
            </p>
            <StartButton onClick={() => setQuizState("lobby")}>
              Back to Lobby
            </StartButton>
          </LobbyCard>
        )}

        {/* --- 4. PLAYING STATE --- */}
        {quizState === "playing" && questions.length > 0 && (
          <QuizCard>
            <TopActionBar>
              <StreakBadge $streak={streak}>🔥 {streak} Streak</StreakBadge>
              <QuestionCount>
                {currentIndex + 1} / {questions.length}
              </QuestionCount>
            </TopActionBar>

            <QuestionWrapper>
              <QTypeBadge>
                {getQuestionContent(questions[currentIndex]).instruction}
              </QTypeBadge>
              <QuestionText>
                {getQuestionContent(questions[currentIndex]).main}
              </QuestionText>

              <SpeakerButton
                onClick={() => {
                  const item = questions[currentIndex].item;
                  playAudio(item.word || item.kanji || item.title);
                }}
                title="Listen Pronunciation"
              >
                <SpeakerIcon />
              </SpeakerButton>
            </QuestionWrapper>

            <OptionsGrid>
              {questions[currentIndex].options.map((opt, idx) => {
                const isCorrect =
                  idx === questions[currentIndex].correctOptionIndex;
                let state: "neutral" | "correct" | "incorrect" = "neutral";

                if (selectedOptionIndex !== null) {
                  if (isCorrect) state = "correct";
                  else if (idx === selectedOptionIndex) state = "incorrect";
                }

                const optStrings = getOptionLabel(
                  opt,
                  questions[currentIndex].type,
                );

                return (
                  <QuizOptionCard
                    key={idx}
                    $state={state}
                    onClick={() => handleOptionClick(idx, isCorrect)}
                  >
                    <div className="option-text-wrapper">
                      <span className="option-main">{optStrings.main}</span>
                      {optStrings.sub && (
                        <span className="option-sub">{optStrings.sub}</span>
                      )}
                    </div>

                    {selectedOptionIndex !== null && isCorrect && (
                      <div
                        className="feedback-icon"
                        style={{ color: "#10b981" }}
                      >
                        <CheckIcon />
                      </div>
                    )}
                    {selectedOptionIndex !== null &&
                      idx === selectedOptionIndex &&
                      !isCorrect && (
                        <div
                          className="feedback-icon"
                          style={{ color: "#ef4444" }}
                        >
                          <CrossIcon />
                        </div>
                      )}
                  </QuizOptionCard>
                );
              })}
            </OptionsGrid>

            <ProgressBarContainer>
              <ProgressFill
                $percent={((currentIndex + 1) / questions.length) * 100}
              />
            </ProgressBarContainer>

            {timeAttack && (
              <TimerContainer>
                <TimerProgress $percent={(timeLeft / 10) * 100} />
              </TimerContainer>
            )}
          </QuizCard>
        )}

        {/* --- 5. RESULTS & REVIEW STATE --- */}
        {quizState === "results" && (
          <ResultOverlay>
            <GradeBadge $grade={resultsGrade.grade}>
              {resultsGrade.grade}
            </GradeBadge>

            <ResultHeader>
              <h2>{resultsGrade.title}</h2>
              <p>{resultsGrade.desc}</p>
            </ResultHeader>

            <ResultGrid>
              <ResultStatBox>
                <span className="value">
                  {score} / {questions.length}
                </span>
                <span className="label">Score</span>
              </ResultStatBox>
              <ResultStatBox>
                <span className="value">
                  {Math.round((score / questions.length) * 100)}%
                </span>
                <span className="label">Accuracy</span>
              </ResultStatBox>
              <ResultStatBox>
                <span className="value">+{xpEarned}</span>
                <span className="label">XP Gained</span>
              </ResultStatBox>
              <ResultStatBox>
                <span className="value">🔥 {maxStreak}</span>
                <span className="label">Max Streak</span>
              </ResultStatBox>
            </ResultGrid>

            <ReviewSection>
              <ReviewTitle>Question Log & Review</ReviewTitle>
              <ReviewList>
                {userAnswers.map((answer, index) => {
                  const isExpanded = expandedReviewIdx === index;
                  const item = answer.question.item;
                  return (
                    <ReviewItemContainer key={index}>
                      <ReviewItemHeader
                        onClick={() =>
                          setExpandedReviewIdx(isExpanded ? null : index)
                        }
                      >
                        <div className="left-side">
                          <div className="marker">
                            {answer.isCorrect ? <CheckIcon /> : <CrossIcon />}
                          </div>
                          <div>
                            <div className="q-text">
                              {item.word || item.kanji || item.title}
                            </div>
                            <div className="q-type-meta">
                              {answer.question.type.toUpperCase()} MATCH • LEVEL{" "}
                              {item.level}
                            </div>
                          </div>
                        </div>
                        <ChevronIcon expanded={isExpanded} />
                      </ReviewItemHeader>

                      {isExpanded && (
                        <ReviewItemBody>
                          <div className="meta-row">
                            <span className="meta-tag">
                              Level: {item.level}
                            </span>
                            <span className="meta-tag">
                              Type: {item.type?.toUpperCase() || "VOCABULARY"}
                            </span>
                            {item.strokes && (
                              <span className="meta-tag">
                                Strokes: {item.strokes}
                              </span>
                            )}
                          </div>

                          <div>
                            <span className="detail-label">Reading: </span>
                            {item.reading
                              ? `${item.reading} (${item.romaji || ""})`
                              : "N/A"}
                          </div>

                          <div>
                            <span className="detail-label">Meaning: </span>
                            {item.meaning ||
                              item.indonesian ||
                              item.english ||
                              "No definition"}
                          </div>

                          {item.type === "kanji" && (
                            <>
                              {item.onyomi && item.onyomi.length > 0 && (
                                <div>
                                  <span className="detail-label">Onyomi: </span>
                                  {item.onyomi.join(", ")}
                                </div>
                              )}
                              {item.kunyomi && item.kunyomi.length > 0 && (
                                <div>
                                  <span className="detail-label">
                                    Kunyomi:{" "}
                                  </span>
                                  {item.kunyomi.join(", ")}
                                </div>
                              )}
                            </>
                          )}

                          <div className="answer-comparison">
                            <div>
                              <span
                                className="detail-label"
                                style={{ color: "#ef4444" }}
                              >
                                Your Choice:{" "}
                              </span>
                              {answer.selectedIndex === -1
                                ? "Time Out"
                                : getOptionLabel(
                                    answer.question.options[
                                      answer.selectedIndex
                                    ],
                                    answer.question.type,
                                  ).main}
                            </div>
                            {!answer.isCorrect && (
                              <div>
                                <span
                                  className="detail-label"
                                  style={{ color: "#10b981" }}
                                >
                                  Correct Choice:{" "}
                                </span>
                                {
                                  getOptionLabel(
                                    answer.question.options[
                                      answer.question.correctOptionIndex
                                    ],
                                    answer.question.type,
                                  ).main
                                }
                              </div>
                            )}
                          </div>
                        </ReviewItemBody>
                      )}
                    </ReviewItemContainer>
                  );
                })}
              </ReviewList>
            </ReviewSection>

            <ActionsRow>
              <ResultsPrimaryButton onClick={startQuiz}>Try Again</ResultsPrimaryButton>
              <SecondaryButton onClick={() => setQuizState("lobby")}>
                Back to Lobby
              </SecondaryButton>
            </ActionsRow>
          </ResultOverlay>
        )}
      </Container>
    </PageWrapper>
  );
}

// --- Next.js Entry Page Wrapper ---
export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "4rem", textAlign: "center" }}>
          Loading Quiz Hub...
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
