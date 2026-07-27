"use client";

import React, { useState, useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { playJapaneseAudio } from "@/lib/audio";
import { useProgress } from "@/context/ProgressContext";
import {
  N5_SIMULATION_QUESTIONS,
  JLPT_N5_CONFIG,
  JLPTQuestion,
} from "@/data/jlpt/n5_simulation_data";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const soundWaveAnim = keyframes`
  0%, 100% { height: 3px; }
  50% { height: 13px; }
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem 6rem;
  min-height: 100vh;
  animation: ${fadeIn} 0.4s ease-out;

  @media (max-width: 768px) {
    padding: 1rem 1rem 4rem;
  }
`;

const TopHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const TitleBox = styled.div`
  h1 {
    font-size: 2.2rem;
    font-weight: 900;
    color: var(--foreground);
    letter-spacing: -0.03em;
    margin-bottom: 0.35rem;
  }
  p {
    font-size: 0.95rem;
    color: var(--text-secondary);
  }

  @media (max-width: 768px) {
    h1 { font-size: 1.6rem; }
    p { font-size: 0.85rem; }
  }
`;

const ModeControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
`;

const ModeToggleButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--surface)"};
  color: ${({ $active }) => ($active ? "white" : "var(--foreground)")};
  border: 1.5px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  padding: 0.6rem 1.25rem;
  border-radius: 14px;
  font-size: 0.88rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: var(--primary);
  }
`;

const LayoutToggleBar = styled.div`
  display: flex;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 14px;
  padding: 3px;
  gap: 3px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const LayoutToggleButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active ? "var(--primary)" : "transparent"};
  color: ${({ $active }) => ($active ? "white" : "var(--foreground-secondary)")};
  border: none;
  padding: 0.55rem 1rem;
  border-radius: 11px;
  font-size: 0.84rem;
  font-weight: 850;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ $active }) => ($active ? "white" : "var(--foreground)")};
  }
`;

const TimerBox = styled.div<{ $warning: boolean }>`
  background: ${({ $warning }) => ($warning ? "#ef444415" : "var(--surface)")};
  border: 2px solid ${({ $warning }) => ($warning ? "#ef4444" : "var(--border)")};
  color: ${({ $warning }) => ($warning ? "#ef4444" : "var(--foreground)")};
  padding: 0.6rem 1.25rem;
  border-radius: 14px;
  font-weight: 900;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

/* Section Navigation Tabs */
const SectionTabsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const SectionTab = styled.button<{ $active: boolean; $color: string }>`
  background: ${({ $active, $color }) => ($active ? `${$color}15` : "var(--surface)")};
  border: 2px solid ${({ $active, $color }) => ($active ? $color : "var(--border)")};
  color: ${({ $active, $color }) => ($active ? $color : "var(--text-secondary)")};
  padding: 0.75rem 1.4rem;
  border-radius: 16px;
  font-weight: 850;
  font-size: 0.92rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  white-space: nowrap;
  transition: all 0.2s ease;

  .badge {
    background: ${({ $color }) => $color};
    color: white;
    font-size: 0.72rem;
    font-weight: 900;
    padding: 2px 7px;
    border-radius: 8px;
  }
`;

/* Main Layout Grid */
const MainContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

/* Compact Booklet Paper Layout */
const CompactPaperWrapper = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1.75rem;

  @media (max-width: 768px) {
    padding: 1.25rem 1rem;
    border-radius: 20px;
  }
`;

const SectionHeaderDivider = styled.div<{ $color: string }>`
  background: ${({ $color }) => `${$color}15`};
  border: 1.5px solid ${({ $color }) => `${$color}40`};
  border-left: 6px solid ${({ $color }) => $color};
  border-radius: 18px;
  padding: 1.15rem 1.5rem;
  margin: 1.5rem 0 1.25rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 1.25rem;
    font-weight: 900;
    color: ${({ $color }) => $color};
    margin: 0;
  }

  .sec-badge {
    background: ${({ $color }) => $color};
    color: white;
    font-size: 0.8rem;
    font-weight: 900;
    padding: 3px 10px;
    border-radius: 8px;
  }
`;

const CompactQuestionBlock = styled.div`
  border-bottom: 1.5px dashed var(--border);
  padding-bottom: 1.75rem;
  margin-bottom: 1.75rem;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const CompactMetaHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.85rem;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const CompactOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const CompactOptionCard = styled.button<{
  $selected: boolean;
  $correct?: boolean;
  $wrong?: boolean;
}>`
  background: ${({ $selected, $correct, $wrong }) =>
    $correct
      ? "#10b98115"
      : $wrong
      ? "#ef444415"
      : $selected
      ? "rgba(var(--primary-rgb), 0.1)"
      : "rgba(var(--foreground-rgb), 0.03)"};

  border: 1.5px solid
    ${({ $selected, $correct, $wrong }) =>
      $correct
        ? "#10b981"
        : $wrong
        ? "#ef4444"
        : $selected
        ? "var(--primary)"
        : "var(--border)"};

  border-radius: 14px;
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;

  .opt-letter {
    width: 28px;
    height: 28px;
    border-radius: 9px;
    background: ${({ $selected, $correct, $wrong }) =>
      $correct
        ? "#10b981"
        : $wrong
        ? "#ef4444"
        : $selected
        ? "var(--primary)"
        : "rgba(var(--foreground-rgb), 0.08)"};

    color: ${({ $selected, $correct, $wrong }) =>
      $selected || $correct || $wrong ? "white" : "var(--foreground)"};

    font-weight: 900;
    font-size: 0.88rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .opt-text {
    font-size: 0.98rem;
    font-weight: 800;
    color: var(--foreground);
    line-height: 1.4;
  }

  &:hover {
    border-color: var(--primary);
  }
`;

const QuestionCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 2.25rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    padding: 1.5rem 1.25rem;
    border-radius: 20px;
  }
`;

const QuestionMetaHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
`;

const QuestionNumberBadge = styled.span`
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--primary);
`;

const SubCatBadge = styled.span`
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  border: 1px solid rgba(var(--primary-rgb), 0.25);
  font-size: 0.78rem;
  font-weight: 850;
  padding: 4px 12px;
  border-radius: 10px;
`;

const BookmarkButton = styled.button<{ $flagged: boolean }>`
  background: ${({ $flagged }) => ($flagged ? "#f59e0b20" : "transparent")};
  border: 1px solid ${({ $flagged }) => ($flagged ? "#f59e0b" : "var(--border)")};
  color: ${({ $flagged }) => ($flagged ? "#f59e0b" : "var(--text-secondary)")};
  font-size: 0.85rem;
  font-weight: 800;
  padding: 6px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const PassageBox = styled.div`
  background: rgba(var(--foreground-rgb), 0.03);
  border-left: 4px solid var(--primary);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--foreground);
  white-space: pre-line;
`;

const AudioUnitBox = styled.div`
  background: rgba(var(--primary-rgb), 0.05);
  border: 1px dashed rgba(var(--primary-rgb), 0.25);
  border-radius: 20px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AudioControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CoolAudioPlayerWidget = styled.button<{ $playing: boolean; $disabled: boolean }>`
  background: ${({ $playing }) =>
    $playing
      ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
      : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)"};
  color: white;
  border: none;
  padding: 0.35rem 0.85rem 0.35rem 0.45rem;
  border-radius: 40px;
  font-weight: 850;
  font-size: 0.82rem;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  box-shadow: ${({ $playing }) =>
    $playing
      ? "0 4px 14px rgba(16, 185, 129, 0.35)"
      : "0 4px 14px rgba(99, 102, 241, 0.3)"};
  transition: all 0.2s ease;
  opacity: ${({ $disabled, $playing }) => ($disabled && !$playing ? 0.5 : 1)};
  position: relative;

  .play-icon-circle {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }

  .audio-label {
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .equalizer-bars {
    display: flex;
    align-items: center;
    gap: 2px;
    height: 13px;
    margin-left: 0.1rem;

    span {
      width: 2.5px;
      background: white;
      border-radius: 2px;
      animation: ${soundWaveAnim} 0.8s ease-in-out infinite;

      &:nth-child(1) { animation-delay: 0s; }
      &:nth-child(2) { animation-delay: 0.15s; }
      &:nth-child(3) { animation-delay: 0.3s; }
      &:nth-child(4) { animation-delay: 0.45s; }
    }
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px) scale(1.02);
    box-shadow: ${({ $playing }) =>
      $playing
        ? "0 6px 18px rgba(16, 185, 129, 0.45)"
        : "0 6px 18px rgba(99, 102, 241, 0.45)"};

    .play-icon-circle {
      transform: scale(1.08);
      background: rgba(255, 255, 255, 0.32);
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }
`;

const AudioSpeedButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active ? "var(--primary)" : "rgba(var(--foreground-rgb), 0.06)"};
  color: ${({ $active }) => ($active ? "white" : "var(--foreground-secondary)")};
  border: none;
  padding: 0.4rem 0.85rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
`;

const AudioScriptToggle = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
`;

const QuestionText = styled.h2`
  font-size: 1.25rem;
  font-weight: 850;
  color: var(--foreground);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  white-space: pre-line;
`;

const StarWidgetBox = styled.div`
  background: rgba(var(--foreground-rgb), 0.03);
  border: 1.5px dashed var(--border);
  border-radius: 18px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 2rem;

  .label {
    font-size: 0.88rem;
    font-weight: 850;
    color: var(--text-secondary);
    margin-bottom: 0.85rem;
  }

  .sentence-preview {
    font-size: 1.2rem;
    font-weight: 850;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.25rem;
    color: var(--foreground);

    .slot {
      border-bottom: 2.5px solid var(--primary);
      padding: 0 0.5rem;
      min-width: 60px;
      text-align: center;
      color: var(--primary);
    }
    .star-slot {
      border-bottom-color: #f59e0b;
      color: #f59e0b;
    }
  }

  .blocks-row {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
  }
`;

const BlockPill = styled.div<{ $placed: boolean }>`
  background: ${({ $placed }) =>
    $placed ? "rgba(var(--foreground-rgb), 0.05)" : "var(--surface)"};
  border: 1.5px solid
    ${({ $placed }) => ($placed ? "transparent" : "var(--border)")};
  color: ${({ $placed }) =>
    $placed ? "var(--text-secondary)" : "var(--foreground)"};
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--primary);
  }
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const OptionCard = styled.button<{
  $selected: boolean;
  $correct?: boolean;
  $wrong?: boolean;
}>`
  background: ${({ $selected, $correct, $wrong }) =>
    $correct
      ? "#10b98115"
      : $wrong
      ? "#ef444415"
      : $selected
      ? "rgba(var(--primary-rgb), 0.08)"
      : "var(--surface)"};

  border: 2px solid
    ${({ $selected, $correct, $wrong }) =>
      $correct
        ? "#10b981"
        : $wrong
        ? "#ef4444"
        : $selected
        ? "var(--primary)"
        : "var(--border)"};

  border-radius: 20px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.18s ease;

  .opt-letter {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: ${({ $selected, $correct, $wrong }) =>
      $correct
        ? "#10b981"
        : $wrong
        ? "#ef4444"
        : $selected
        ? "var(--primary)"
        : "rgba(var(--foreground-rgb), 0.06)"};

    color: ${({ $selected, $correct, $wrong }) =>
      $selected || $correct || $wrong ? "white" : "var(--foreground)"};

    font-weight: 900;
    font-size: 1.05rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .opt-text {
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--foreground);
    line-height: 1.5;
  }

  &:hover {
    border-color: ${({ $selected }) => ($selected ? "var(--primary)" : "var(--primary)")};
    transform: translateX(4px);
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
`;

const NavBtn = styled.button<{ $primary?: boolean }>`
  background: ${({ $primary }) =>
    $primary ? "var(--primary)" : "var(--surface)"};
  color: ${({ $primary }) => ($primary ? "white" : "var(--foreground)")};
  border: 1.5px solid
    ${({ $primary }) => ($primary ? "var(--primary)" : "var(--border)")};
  padding: 0.85rem 1.75rem;
  border-radius: 16px;
  font-size: 0.95rem;
  font-weight: 850;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.18s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;

/* Side Panel: Digital Answer Sheet */
const AnswerSheetCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const SheetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  h3 {
    font-size: 1.1rem;
    font-weight: 900;
    color: var(--foreground);
  }
`;

const StatusLegend = styled.div`
  display: flex;
  gap: 0.85rem;
  margin-bottom: 1.25rem;
  font-size: 0.75rem;
  font-weight: 800;

  .item {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .dot-green { background: #10b981; }
  .dot-yellow { background: #f59e0b; }
  .dot-gray { background: #94a3b8; }
`;

const GridNumbers = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.6rem;
  max-height: 480px;
  overflow-y: auto;
  padding-right: 4px;
`;

const NumButton = styled.button<{
  $current: boolean;
  $answered: boolean;
  $flagged: boolean;
}>`
  height: 44px;
  border-radius: 12px;
  font-size: 0.88rem;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  background: ${({ $current, $answered, $flagged }) =>
    $current
      ? "var(--primary)"
      : $flagged
      ? "#f59e0b"
      : $answered
      ? "#10b981"
      : "rgba(var(--foreground-rgb), 0.05)"};

  color: ${({ $current, $answered, $flagged }) =>
    $current || $answered || $flagged ? "white" : "var(--foreground)"};

  border: 1.5px solid
    ${({ $current }) => ($current ? "var(--primary)" : "transparent")};

  &:hover {
    transform: scale(1.05);
  }
`;

const SubmitExamBtn = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 16px;
  font-weight: 900;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.45);
  }
`;

/* Result Screen Components */
const ResultWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ResultBanner = styled.div<{ $passed: boolean }>`
  background: ${({ $passed }) =>
    $passed
      ? "linear-gradient(135deg, #059669 0%, #10b981 100%)"
      : "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)"};
  border-radius: 28px;
  padding: 3rem 2rem;
  color: white;
  text-align: center;
  box-shadow: 0 15px 35px
    ${({ $passed }) =>
      $passed ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"};

  .status-tag {
    font-size: 0.9rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: rgba(255, 255, 255, 0.2);
    padding: 6px 16px;
    border-radius: 12px;
    display: inline-block;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
  }

  .score-big {
    font-size: 2.2rem;
    font-weight: 900;
    opacity: 0.95;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.25rem;
    h2 { font-size: 2.2rem; }
    .score-big { font-size: 1.6rem; }
  }
`;

const SectionScoresGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ScoreCard = styled.div<{ $passed: boolean }>`
  background: var(--surface);
  border: 1px solid var(--border);
  border-top: 5px solid ${({ $passed }) => ($passed ? "#10b981" : "#ef4444")};
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .sec-title {
    font-size: 0.85rem;
    font-weight: 850;
    color: var(--text-secondary);
  }

  .sec-score {
    font-size: 1.8rem;
    font-weight: 900;
    color: var(--foreground);
  }

  .sec-status {
    font-size: 0.85rem;
    font-weight: 850;
    color: ${({ $passed }) => ($passed ? "#10b981" : "#ef4444")};
  }
`;

const CertificateBox = styled.div`
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.05) 0%, rgba(245, 158, 11, 0.05) 100%);
  border: 2px solid var(--primary);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  text-align: center;
  position: relative;

  h3 {
    font-size: 1.6rem;
    font-weight: 900;
    color: var(--foreground);
    margin-bottom: 0.5rem;
  }
  .cert-sub {
    font-size: 0.95rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }
  .cert-name {
    font-size: 2rem;
    font-weight: 900;
    color: var(--primary);
    margin-bottom: 1rem;
    font-family: serif;
  }
`;

export default function JLPTN5SimulationPage() {
  const { addExp } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isOfficialMode, setIsOfficialMode] = useState(true);
  const [layoutMode, setLayoutMode] = useState<"paper" | "single">("paper");
  const [activeSection, setActiveSection] = useState<"moji_goi" | "bunpou_dokkai" | "choukai">("moji_goi");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [showScript, setShowScript] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);

  // Single Overall Unified Exam Timer (90 Minutes Total = 5400 Seconds)
  const [timeLeft, setTimeLeft] = useState(90 * 60);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sectionQuestions = useMemo(() => {
    return N5_SIMULATION_QUESTIONS.filter((q) => q.section === activeSection);
  }, [activeSection]);

  const currentQuestion = sectionQuestions[currentIdx] || N5_SIMULATION_QUESTIONS[0];

  const handlePlayAudioForQuestion = async (qId: number, audioText?: string) => {
    if (!audioText || playingAudioId !== null) return;
    setPlayingAudioId(qId);
    console.log(`[JLPT Player] handlePlayAudio initiated for Question #${qId}...`);
    try {
      const playPromise = playJapaneseAudio(audioText, { rate: audioSpeed });
      const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 25000));
      await Promise.race([playPromise, timeoutPromise]);
    } catch (err) {
      console.warn("Audio playback error:", err);
    } finally {
      setPlayingAudioId(null);
    }
  };

  useEffect(() => {
    if (!isOfficialMode || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOfficialMode, isSubmitted]);

  const handleSectionSwitch = (secId: "moji_goi" | "bunpou_dokkai" | "choukai") => {
    setActiveSection(secId);
    setCurrentIdx(0);

    if (layoutMode === "paper") {
      const el = document.getElementById(`section-${secId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSelectOptionForQuestion = (questionId: number, optIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optIdx,
    }));
  };

  const handleSelectOption = (optIdx: number) => {
    handleSelectOptionForQuestion(currentQuestion.id, optIdx);
  };

  const toggleFlaggedForQuestion = (questionId: number) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const toggleFlagged = () => {
    toggleFlaggedForQuestion(currentQuestion.id);
  };

  // Score Calculation
  const results = useMemo(() => {
    let rawMojiGoi = 0;
    let rawBunpouDokkai = 0;
    let rawChoukai = 0;

    N5_SIMULATION_QUESTIONS.forEach((q) => {
      const uAns = userAnswers[q.id];
      if (uAns !== undefined && uAns === q.answer) {
        if (q.section === "moji_goi") rawMojiGoi += 2.4;
        if (q.section === "bunpou_dokkai") rawBunpouDokkai += 2.4;
        if (q.section === "choukai") rawChoukai += 3.0;
      }
    });

    const mojiGoiScore = Math.round(rawMojiGoi);
    const bunpouDokkaiScore = Math.round(rawBunpouDokkai);
    const choukaiScore = Math.round(rawChoukai);

    const totalScore = mojiGoiScore + bunpouDokkaiScore + choukaiScore;

    const mojiGoiPassed = mojiGoiScore >= 19;
    const bunpouDokkaiPassed = bunpouDokkaiScore >= 19;
    const choukaiPassed = choukaiScore >= 19;
    const totalPassed = totalScore >= 80 && mojiGoiPassed && bunpouDokkaiPassed && choukaiPassed;

    return {
      mojiGoiScore,
      bunpouDokkaiScore,
      choukaiScore,
      totalScore,
      mojiGoiPassed,
      bunpouDokkaiPassed,
      choukaiPassed,
      totalPassed,
    };
  }, [userAnswers]);

  useEffect(() => {
    if (isSubmitted && results.totalPassed) {
      addExp(150);
    }
  }, [isSubmitted, results.totalPassed, addExp]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!mounted) return null;

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Development", href: "/development" },
        ]}
        current="Simulasi JLPT N5"
      />

      {isSubmitted ? (
        <ResultWrapper>
          <ResultBanner $passed={results.totalPassed}>
            <span className="status-tag">
              {results.totalPassed ? "Hantei: LULUS 🏆" : "Hantei: BELUM LULUS ⚠️"}
            </span>
            <h2>{results.totalPassed ? "Selamat! Anda Lulus Ujian JLPT N5 🎉" : "Terus Berlatih!"}</h2>
            <div className="score-big">{results.totalScore} / 180 Poin</div>
          </ResultBanner>

          <SectionScoresGrid>
            <ScoreCard $passed={results.mojiGoiPassed}>
              <div className="sec-title">文字・語彙 (Moji & Goi)</div>
              <div className="sec-score">{results.mojiGoiScore} / 60 Poin</div>
              <div className="sec-status">
                {results.mojiGoiPassed ? "LULUS ✅ (Min 19)" : "BELUM LULUS ⚠️"}
              </div>
            </ScoreCard>

            <ScoreCard $passed={results.bunpouDokkaiPassed}>
              <div className="sec-title">文法・読解 (Bunpou & Dokkai)</div>
              <div className="sec-score">{results.bunpouDokkaiScore} / 60 Poin</div>
              <div className="sec-status">
                {results.bunpouDokkaiPassed ? "LULUS ✅ (Min 19)" : "BELUM LULUS ⚠️"}
              </div>
            </ScoreCard>

            <ScoreCard $passed={results.choukaiPassed}>
              <div className="sec-title">聴解 (Choukai)</div>
              <div className="sec-score">{results.choukaiScore} / 60 Poin</div>
              <div className="sec-status">
                {results.choukaiPassed ? "LULUS ✅ (Min 19)" : "BELUM LULUS ⚠️"}
              </div>
            </ScoreCard>
          </SectionScoresGrid>

          {results.totalPassed && (
            <CertificateBox>
              <h3>📜 Sertifikat Kelulusan Simulasi JLPT N5</h3>
              <p className="cert-sub">Diberikan kepada:</p>
              <div className="cert-name">JapanApp Learner</div>
              <p>Telah berhasil menyelesaikan Simulasi Ujian JLPT N5 dengan nilai {results.totalScore}/180.</p>
            </CertificateBox>
          )}

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <NavBtn
              $primary
              onClick={() => {
                setIsSubmitted(false);
                setUserAnswers({});
                setFlaggedQuestions({});
                setTimeLeft(90 * 60);
                handleSectionSwitch("moji_goi");
              }}
            >
              🔄 Ulangi Simulasi Ujian
            </NavBtn>
            <Link href="/development" style={{ textDecoration: "none" }}>
              <NavBtn>Kembali ke Development Labs</NavBtn>
            </Link>
          </div>
        </ResultWrapper>
      ) : (
        <>
          <TopHeader>
            <TitleBox>
              <h1>Simulasi Ujian Resmi JLPT N5 🏆</h1>
              <p>Format Resmi: 70 Soal • 90 Menit Total • Ambang Kelulusan Min. 80/180 Poin</p>
            </TitleBox>

            <ModeControls>
              <LayoutToggleBar>
                <LayoutToggleButton
                  $active={layoutMode === "paper"}
                  onClick={() => setLayoutMode("paper")}
                >
                  📄 Mode Ringkas (1 Halaman)
                </LayoutToggleButton>
                <LayoutToggleButton
                  $active={layoutMode === "single"}
                  onClick={() => setLayoutMode("single")}
                >
                  🗂️ Mode Per Soal (Stepper)
                </LayoutToggleButton>
              </LayoutToggleBar>

              <ModeToggleButton
                $active={isOfficialMode}
                onClick={() => setIsOfficialMode(true)}
              >
                ⏱️ Mode Ujian Resmi
              </ModeToggleButton>
              <ModeToggleButton
                $active={!isOfficialMode}
                onClick={() => setIsOfficialMode(false)}
              >
                🎓 Mode Latihan Santai
              </ModeToggleButton>

              {isOfficialMode && (
                <TimerBox $warning={timeLeft < 300}>
                  ⏱️ {formatTimer(timeLeft)}
                </TimerBox>
              )}
            </ModeControls>
          </TopHeader>

          <SectionTabsContainer>
            {JLPT_N5_CONFIG.sections.map((sec) => (
              <SectionTab
                key={sec.id}
                $active={activeSection === sec.id}
                $color={sec.id === "moji_goi" ? "#3b82f6" : sec.id === "bunpou_dokkai" ? "#8b5cf6" : "#ec4899"}
                onClick={() => handleSectionSwitch(sec.id)}
              >
                {sec.japaneseName}
                <span className="badge">{sec.questionCount} Soal</span>
              </SectionTab>
            ))}
          </SectionTabsContainer>

          <MainContentGrid>
            {layoutMode === "paper" ? (
              <CompactPaperWrapper>
                {JLPT_N5_CONFIG.sections.map((sec) => {
                  const secQuestions = N5_SIMULATION_QUESTIONS.filter((q) => q.section === sec.id);
                  const secColor = sec.id === "moji_goi" ? "#3b82f6" : sec.id === "bunpou_dokkai" ? "#8b5cf6" : "#ec4899";

                  return (
                    <div key={sec.id} id={`section-${sec.id}`}>
                      <SectionHeaderDivider $color={secColor}>
                        <h2>{sec.japaneseName} ({sec.name})</h2>
                        <span className="sec-badge">{sec.questionCount} Soal</span>
                      </SectionHeaderDivider>

                      {secQuestions.map((q) => {
                        const isSelected = userAnswers[q.id] !== undefined;
                        const isFlagged = Boolean(flaggedQuestions[q.id]);
                        const isThisPlaying = playingAudioId === q.id;

                        return (
                          <CompactQuestionBlock key={q.id} id={`question-card-${q.id}`}>
                            <CompactMetaHeader>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                <QuestionNumberBadge>
                                  No. {q.id}
                                </QuestionNumberBadge>
                                <SubCatBadge>{q.subCategory}</SubCatBadge>
                              </div>
                              <BookmarkButton
                                $flagged={isFlagged}
                                onClick={() => toggleFlaggedForQuestion(q.id)}
                              >
                                🔖 {isFlagged ? "Ragu" : "Tandai"}
                              </BookmarkButton>
                            </CompactMetaHeader>

                            {q.passageText && <PassageBox>{q.passageText}</PassageBox>}

                            {q.audioText && (
                              <div style={{ marginBottom: "0.85rem" }}>
                                <AudioControlsRow>
                                  <CoolAudioPlayerWidget
                                    $playing={isThisPlaying}
                                    $disabled={playingAudioId !== null && !isThisPlaying}
                                    onClick={() => handlePlayAudioForQuestion(q.id, q.audioText)}
                                  >
                                    <div className="play-icon-circle">
                                      {isThisPlaying ? "🔊" : "🎧"}
                                    </div>
                                    <span className="audio-label">
                                      {isThisPlaying ? "Memutar Audio" : "Putar Audio"}
                                    </span>
                                    {isThisPlaying && (
                                      <div className="equalizer-bars">
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                      </div>
                                    )}
                                  </CoolAudioPlayerWidget>
                                </AudioControlsRow>
                              </div>
                            )}

                            <QuestionText style={{ fontSize: "1.1rem", marginBottom: "0.85rem" }}>
                              {q.questionText}
                            </QuestionText>

                            {q.starSentence && (
                              <StarWidgetBox style={{ padding: "0.85rem 1rem", marginBottom: "1rem" }}>
                                <div className="label">⭐ Susunan Kalimat (Pilih Posisi ★):</div>
                                <div className="sentence-preview" style={{ fontSize: "1rem" }}>
                                  <span>{q.starSentence.prefix}</span>
                                  <span className="slot">[ 1 ]</span>
                                  <span className="slot">[ 2 ]</span>
                                  <span className="slot star-slot">[ ★ ]</span>
                                  <span className="slot">[ 4 ]</span>
                                  <span>{q.starSentence.suffix}</span>
                                </div>
                                <div className="blocks-row">
                                  {q.starSentence.blocks.map((blk, bIdx) => (
                                    <BlockPill key={bIdx} $placed={false} style={{ padding: "0.35rem 0.75rem", fontSize: "0.82rem" }}>
                                      {bIdx + 1}. {blk}
                                    </BlockPill>
                                  ))}
                                </div>
                              </StarWidgetBox>
                            )}

                            <CompactOptionsGrid>
                              {q.options.map((optText, oIdx) => {
                                const selected = userAnswers[q.id] === oIdx;
                                const showCorrect = !isOfficialMode && oIdx === q.answer;
                                const showWrong = !isOfficialMode && selected && oIdx !== q.answer;

                                return (
                                  <CompactOptionCard
                                    key={oIdx}
                                    $selected={selected}
                                    $correct={showCorrect}
                                    $wrong={showWrong}
                                    onClick={() => handleSelectOptionForQuestion(q.id, oIdx)}
                                  >
                                    <div className="opt-letter">
                                      {String.fromCharCode(65 + oIdx)}
                                    </div>
                                    <div className="opt-text">{optText}</div>
                                  </CompactOptionCard>
                                );
                              })}
                            </CompactOptionsGrid>

                            {!isOfficialMode && userAnswers[q.id] !== undefined && (
                              <div
                                style={{
                                  background: "rgba(var(--primary-rgb), 0.08)",
                                  border: "1px solid var(--border)",
                                  borderRadius: "12px",
                                  padding: "0.85rem 1rem",
                                  fontSize: "0.88rem",
                                  lineHeight: "1.5",
                                }}
                              >
                                <strong>💡 Pembahasan:</strong> {q.explanation}
                              </div>
                            )}
                          </CompactQuestionBlock>
                        );
                      })}
                    </div>
                  );
                })}

                <SubmitExamBtn
                  onClick={() => setIsSubmitted(true)}
                  style={{ marginTop: "2rem", padding: "1.25rem", fontSize: "1.05rem" }}
                >
                  🏁 Selesaikan & Kumpulkan Ujian JLPT
                </SubmitExamBtn>
              </CompactPaperWrapper>
            ) : (
              <QuestionCard id={`question-card-${currentQuestion.id}`}>
                <QuestionMetaHeader>
                  <QuestionNumberBadge>
                    Soal No. {currentQuestion.id} / 70
                  </QuestionNumberBadge>
                  <SubCatBadge>{currentQuestion.subCategory}</SubCatBadge>
                  <BookmarkButton
                    $flagged={Boolean(flaggedQuestions[currentQuestion.id])}
                    onClick={toggleFlagged}
                  >
                    🔖 {flaggedQuestions[currentQuestion.id] ? "Ditandai Ragu" : "Tandai Ragu"}
                  </BookmarkButton>
                </QuestionMetaHeader>

                {currentQuestion.passageText && (
                  <PassageBox>{currentQuestion.passageText}</PassageBox>
                )}

                {currentQuestion.audioText && (
                  <AudioUnitBox>
                    <AudioControlsRow>
                      <CoolAudioPlayerWidget
                        $playing={playingAudioId === currentQuestion.id}
                        $disabled={playingAudioId !== null && playingAudioId !== currentQuestion.id}
                        onClick={() => handlePlayAudioForQuestion(currentQuestion.id, currentQuestion.audioText)}
                      >
                        <div className="play-icon-circle">
                          {playingAudioId === currentQuestion.id ? "🔊" : "🎧"}
                        </div>
                        <span className="audio-label">
                          {playingAudioId === currentQuestion.id ? "Memutar Audio..." : "Putar Audio"}
                        </span>
                        {playingAudioId === currentQuestion.id && (
                          <div className="equalizer-bars">
                            <span />
                            <span />
                            <span />
                            <span />
                          </div>
                        )}
                      </CoolAudioPlayerWidget>

                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <AudioSpeedButton
                          $active={audioSpeed === 1.0}
                          onClick={() => setAudioSpeed(1.0)}
                        >
                          1.0x
                        </AudioSpeedButton>
                        <AudioSpeedButton
                          $active={audioSpeed === 0.85}
                          onClick={() => setAudioSpeed(0.85)}
                        >
                          0.85x (Lambat)
                        </AudioSpeedButton>
                      </div>
                    </AudioControlsRow>

                    {!isOfficialMode && (
                      <div>
                        <AudioScriptToggle onClick={() => setShowScript(!showScript)}>
                          {showScript ? "Sembunyikan Naskah Script" : "Tampilkan Naskah Script Audio 📝"}
                        </AudioScriptToggle>
                        {showScript && (
                          <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "var(--foreground)" }}>
                            {currentQuestion.audioText}
                          </p>
                        )}
                      </div>
                    )}
                  </AudioUnitBox>
                )}

                <QuestionText>{currentQuestion.questionText}</QuestionText>

                {currentQuestion.starSentence && (
                  <StarWidgetBox>
                    <div className="label">⭐ Susunan Kalimat (Pilih Posisi ★):</div>
                    <div className="sentence-preview">
                      <span>{currentQuestion.starSentence.prefix}</span>
                      <span className="slot">[ 1 ]</span>
                      <span className="slot">[ 2 ]</span>
                      <span className="slot star-slot">[ ★ ]</span>
                      <span className="slot">[ 4 ]</span>
                      <span>{currentQuestion.starSentence.suffix}</span>
                    </div>
                    <div className="blocks-row">
                      {currentQuestion.starSentence.blocks.map((blk, bIdx) => (
                        <BlockPill key={bIdx} $placed={false}>
                          {bIdx + 1}. {blk}
                        </BlockPill>
                      ))}
                    </div>
                  </StarWidgetBox>
                )}

                <OptionsList>
                  {currentQuestion.options.map((optText, oIdx) => {
                    const isSelected = userAnswers[currentQuestion.id] === oIdx;
                    const showCorrect = !isOfficialMode && oIdx === currentQuestion.answer;
                    const showWrong = !isOfficialMode && isSelected && oIdx !== currentQuestion.answer;

                    return (
                      <OptionCard
                        key={oIdx}
                        $selected={isSelected}
                        $correct={showCorrect}
                        $wrong={showWrong}
                        onClick={() => handleSelectOption(oIdx)}
                      >
                        <div className="opt-letter">
                          {String.fromCharCode(65 + oIdx)}
                        </div>
                        <div className="opt-text">{optText}</div>
                      </OptionCard>
                    );
                  })}
                </OptionsList>

                {!isOfficialMode && userAnswers[currentQuestion.id] !== undefined && (
                  <div
                    style={{
                      background: "rgba(var(--primary-rgb), 0.08)",
                      border: "1px solid var(--border)",
                      borderRadius: "16px",
                      padding: "1.25rem",
                      marginBottom: "1.5rem",
                      fontSize: "0.92rem",
                      lineHeight: "1.6",
                    }}
                  >
                    <strong>💡 Pembahasan:</strong> {currentQuestion.explanation}
                  </div>
                )}

                <CardFooter>
                  <NavBtn
                    disabled={currentIdx === 0}
                    onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  >
                    ← Soal Sebelumnya
                  </NavBtn>

                  <NavBtn
                    $primary
                    onClick={() => {
                      if (currentIdx < sectionQuestions.length - 1) {
                        setCurrentIdx((prev) => prev + 1);
                      }
                    }}
                  >
                    {currentIdx === sectionQuestions.length - 1
                      ? "Selesai Seksi Ini"
                      : "Soal Berikutnya →"}
                  </NavBtn>
                </CardFooter>
              </QuestionCard>
            )}

            <AnswerSheetCard>
              <SheetHeader>
                <h3>Lembar Jawab Digital</h3>
                <span style={{ fontSize: "0.82rem", fontWeight: 800 }}>
                  {Object.keys(userAnswers).length} / 70 Terjawab
                </span>
              </SheetHeader>

              <StatusLegend>
                <div className="item"><div className="dot dot-green" /> Dijawab</div>
                <div className="item"><div className="dot dot-yellow" /> Ragu</div>
                <div className="item"><div className="dot dot-gray" /> Kosong</div>
              </StatusLegend>

              <GridNumbers>
                {N5_SIMULATION_QUESTIONS.map((q) => {
                  const isCurrent = q.id === currentQuestion.id;
                  const isAns = userAnswers[q.id] !== undefined;
                  const isFlag = Boolean(flaggedQuestions[q.id]);

                  return (
                    <NumButton
                      key={q.id}
                      $current={isCurrent}
                      $answered={isAns}
                      $flagged={isFlag}
                      onClick={() => {
                        setActiveSection(q.section);
                        const secQuestions = N5_SIMULATION_QUESTIONS.filter(
                          (sq) => sq.section === q.section
                        );
                        const targetIdx = secQuestions.findIndex(
                          (sq) => sq.id === q.id
                        );
                        setCurrentIdx(targetIdx >= 0 ? targetIdx : 0);
                        setTimeout(() => {
                          const el = document.getElementById(`question-card-${q.id}`);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "center" });
                          }
                        }, 100);
                      }}
                    >
                      {q.id}
                    </NumButton>
                  );
                })}
              </GridNumbers>

              <SubmitExamBtn onClick={() => setIsSubmitted(true)}>
                🏁 Selesaikan & Kumpulkan Ujian
              </SubmitExamBtn>
            </AnswerSheetCard>
          </MainContentGrid>
        </>
      )}
    </Container>
  );
}
