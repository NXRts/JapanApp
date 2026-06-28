"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import styled, { keyframes, css } from "styled-components";
import { useProgress } from "@/context/ProgressContext";
import { playJapaneseAudio } from "@/lib/audio";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useSearchParams, useRouter } from "next/navigation";

// ========================================================
// DATA DEFINITIONS (HIRAGANA & KATAKANA)
// ========================================================

interface KanaItem {
  char: string;
  romaji: string;
}

const HIRAGANA_GRID: (KanaItem | null)[] = [
  { char: "あ", romaji: "a" },
  { char: "い", romaji: "i" },
  { char: "う", romaji: "u" },
  { char: "え", romaji: "e" },
  { char: "お", romaji: "o" },
  { char: "か", romaji: "ka" },
  { char: "き", romaji: "ki" },
  { char: "く", romaji: "ku" },
  { char: "け", romaji: "ke" },
  { char: "こ", romaji: "ko" },
  { char: "さ", romaji: "sa" },
  { char: "し", romaji: "shi" },
  { char: "す", romaji: "su" },
  { char: "せ", romaji: "se" },
  { char: "そ", romaji: "so" },
  { char: "た", romaji: "ta" },
  { char: "ち", romaji: "chi" },
  { char: "つ", romaji: "tsu" },
  { char: "て", romaji: "te" },
  { char: "と", romaji: "to" },
  { char: "な", romaji: "na" },
  { char: "に", romaji: "ni" },
  { char: "ぬ", romaji: "nu" },
  { char: "ね", romaji: "ne" },
  { char: "の", romaji: "no" },
  { char: "は", romaji: "ha" },
  { char: "ひ", romaji: "hi" },
  { char: "ふ", romaji: "fu" },
  { char: "へ", romaji: "he" },
  { char: "ほ", romaji: "ho" },
  { char: "ま", romaji: "ma" },
  { char: "み", romaji: "mi" },
  { char: "む", romaji: "mu" },
  { char: "め", romaji: "me" },
  { char: "も", romaji: "mo" },
  { char: "や", romaji: "ya" },
  null,
  { char: "ゆ", romaji: "yu" },
  null,
  { char: "よ", romaji: "yo" },
  { char: "ら", romaji: "ra" },
  { char: "り", romaji: "ri" },
  { char: "る", romaji: "ru" },
  { char: "れ", romaji: "re" },
  { char: "ろ", romaji: "ro" },
  { char: "わ", romaji: "wa" },
  null,
  null,
  null,
  { char: "を", romaji: "wo" },
  { char: "ん", romaji: "n" },
  null,
  null,
  null,
  null,
];

const HIRAGANA_DAKUON: KanaItem[] = [
  { char: "が", romaji: "ga" },
  { char: "ぎ", romaji: "gi" },
  { char: "ぐ", romaji: "gu" },
  { char: "げ", romaji: "ge" },
  { char: "ご", romaji: "go" },
  { char: "ざ", romaji: "za" },
  { char: "じ", romaji: "ji" },
  { char: "ず", romaji: "zu" },
  { char: "ぜ", romaji: "ze" },
  { char: "ぞ", romaji: "zo" },
  { char: "だ", romaji: "da" },
  { char: "ぢ", romaji: "dji" },
  { char: "づ", romaji: "dzu" },
  { char: "で", romaji: "de" },
  { char: "ど", romaji: "do" },
  { char: "ば", romaji: "ba" },
  { char: "び", romaji: "bi" },
  { char: "ぶ", romaji: "bu" },
  { char: "べ", romaji: "be" },
  { char: "ぼ", romaji: "bo" },
  { char: "ぱ", romaji: "pa" },
  { char: "ぴ", romaji: "pi" },
  { char: "ぷ", romaji: "pu" },
  { char: "ぺ", romaji: "pe" },
  { char: "ぽ", romaji: "po" },
];

const HIRAGANA_COMBINATIONS: KanaItem[] = [
  { char: "きゃ", romaji: "kya" },
  { char: "きゅ", romaji: "kyu" },
  { char: "きょ", romaji: "kyo" },
  { char: "ぎゃ", romaji: "gya" },
  { char: "ぎゅ", romaji: "gyu" },
  { char: "ぎょ", romaji: "gyo" },
  { char: "しゃ", romaji: "sha" },
  { char: "しゅ", romaji: "shu" },
  { char: "しょ", romaji: "sho" },
  { char: "じゃ", romaji: "ja" },
  { char: "じゅ", romaji: "ju" },
  { char: "じょ", romaji: "jo" },
  { char: "ちゃ", romaji: "cha" },
  { char: "ちゅ", romaji: "chu" },
  { char: "ちょ", romaji: "cho" },
  { char: "にゃ", romaji: "nya" },
  { char: "にゅ", romaji: "nyu" },
  { char: "にょ", romaji: "nyo" },
  { char: "ひゃ", romaji: "hya" },
  { char: "ひゅ", romaji: "hyu" },
  { char: "ひょ", romaji: "hyo" },
  { char: "びゃ", romaji: "bya" },
  { char: "びゅ", romaji: "byu" },
  { char: "びょ", romaji: "byo" },
  { char: "ぴゃ", romaji: "pya" },
  { char: "ぴゅ", romaji: "pyu" },
  { char: "ぴょ", romaji: "pyo" },
  { char: "みゃ", romaji: "mya" },
  { char: "みゅ", romaji: "myu" },
  { char: "miょ", romaji: "myo" }, // keep standard representation
  { char: "りゃ", romaji: "rya" },
  { char: "りゅ", romaji: "ryu" },
  { char: "りょ", romaji: "ryo" },
];

const HIRAGANA_SOKUON: KanaItem[] = [
  { char: "っk", romaji: "kk" },
  { char: "っs", romaji: "ss" },
  { char: "っt", romaji: "tt" },
  { char: "っp", romaji: "pp" },
];

const HIRAGANA_CHOON: KanaItem[] = [
  { char: "ああ", romaji: "ā" },
  { char: "いい", romaji: "ī" },
  { char: "うう", romaji: "ū" },
  { char: "ええ", romaji: "ē" },
  { char: "おお", romaji: "ō" },
  { char: "えい", romaji: "ei" },
  { char: "おう", romaji: "ou" },
];

const KATAKANA_GRID: (KanaItem | null)[] = [
  { char: "ア", romaji: "a" },
  { char: "イ", romaji: "i" },
  { char: "ウ", romaji: "u" },
  { char: "エ", romaji: "e" },
  { char: "オ", romaji: "o" },
  { char: "カ", romaji: "ka" },
  { char: "キ", romaji: "ki" },
  { char: "ク", romaji: "ku" },
  { char: "ケ", romaji: "ke" },
  { char: "コ", romaji: "ko" },
  { char: "サ", romaji: "sa" },
  { char: "シ", romaji: "shi" },
  { char: "ス", romaji: "su" },
  { char: "セ", romaji: "se" },
  { char: "ソ", romaji: "so" },
  { char: "タ", romaji: "ta" },
  { char: "チ", romaji: "chi" },
  { char: "ツ", romaji: "tsu" },
  { char: "テ", romaji: "te" },
  { char: "ト", romaji: "to" },
  { char: "ナ", romaji: "na" },
  { char: "ニ", romaji: "ni" },
  { char: "ヌ", romaji: "nu" },
  { char: "ネ", romaji: "ne" },
  { char: "ノ", romaji: "no" },
  { char: "ハ", romaji: "ha" },
  { char: "ヒ", romaji: "hi" },
  { char: "フ", romaji: "fu" },
  { char: "ヘ", romaji: "he" },
  { char: "ホ", romaji: "ho" },
  { char: "マ", romaji: "ma" },
  { char: "ミ", romaji: "mi" },
  { char: "ム", romaji: "mu" },
  { char: "メ", romaji: "me" },
  { char: "モ", romaji: "mo" },
  { char: "ヤ", romaji: "ya" },
  null,
  { char: "ユ", romaji: "yu" },
  null,
  { char: "ヨ", romaji: "yo" },
  { char: "ラ", romaji: "ra" },
  { char: "リ", romaji: "ri" },
  { char: "ル", romaji: "ru" },
  { char: "レ", romaji: "re" },
  { char: "ロ", romaji: "ro" },
  { char: "ワ", romaji: "wa" },
  null,
  null,
  null,
  { char: "ヲ", romaji: "wo" },
  { char: "ン", romaji: "n" },
  null,
  null,
  null,
  null,
];

const KATAKANA_DAKUON: KanaItem[] = [
  { char: "ガ", romaji: "ga" },
  { char: "ギ", romaji: "gi" },
  { char: "グ", romaji: "gu" },
  { char: "ゲ", romaji: "ge" },
  { char: "ゴ", romaji: "go" },
  { char: "ザ", romaji: "za" },
  { char: "ジ", romaji: "ji" },
  { char: "ズ", romaji: "zu" },
  { char: "ゼ", romaji: "ze" },
  { char: "ゾ", romaji: "zo" },
  { char: "ダ", romaji: "da" },
  { char: "ヂ", romaji: "dji" },
  { char: "ヅ", romaji: "dzu" },
  { char: "デ", romaji: "do" },
  { char: "ド", romaji: "do" },
  { char: "バ", romaji: "ba" },
  { char: "ビ", romaji: "bi" },
  { char: "ブ", romaji: "bu" },
  { char: "ベ", romaji: "be" },
  { char: "ボ", romaji: "bo" },
  { char: "パ", romaji: "pa" },
  { char: "ピ", romaji: "pi" },
  { char: "プ", romaji: "pu" },
  { char: "ペ", romaji: "pe" },
  { char: "ポ", romaji: "po" },
];

const KATAKANA_COMBINATIONS: KanaItem[] = [
  { char: "キャ", romaji: "kya" },
  { char: "キュ", romaji: "kyu" },
  { char: "キョ", romaji: "kyo" },
  { char: "ギャ", romaji: "gya" },
  { char: "ギュ", romaji: "gyu" },
  { char: "ギョ", romaji: "gyo" },
  { char: "シャ", romaji: "sha" },
  { char: "シュ", romaji: "shu" },
  { char: "ショ", romaji: "sho" },
  { char: "ジャ", romaji: "ja" },
  { char: "ジュ", romaji: "ju" },
  { char: "ジョ", romaji: "jo" },
  { char: "チャ", romaji: "cha" },
  { char: "チュ", romaji: "chu" },
  { char: "チョ", romaji: "cho" },
  { char: "ニャ", romaji: "nya" },
  { char: "ニュ", romaji: "nyu" },
  { char: "ニョ", romaji: "nyo" },
  { char: "ヒャ", romaji: "hya" },
  { char: "ヒュ", romaji: "hyu" },
  { char: "ヒョ", romaji: "hyo" },
  { char: "ビャ", romaji: "bya" },
  { char: "ビュ", romaji: "byu" },
  { char: "ビョ", romaji: "byo" },
  { char: "ピャ", romaji: "pya" },
  { char: "ピュ", romaji: "pyu" },
  { char: "ピョ", romaji: "pyo" },
  { char: "ミャ", romaji: "mya" },
  { char: "ミュ", romaji: "myu" },
  { char: "ミョ", romaji: "myo" },
  { char: "リャ", romaji: "rya" },
  { char: "リュ", romaji: "ryu" },
  { char: "リョ", romaji: "ryo" },
];

const KATAKANA_SOKUON: KanaItem[] = [
  { char: "ッk", romaji: "kk" },
  { char: "ッs", romaji: "ss" },
  { char: "ッt", romaji: "tt" },
  { char: "ッp", romaji: "pp" },
];

const KATAKANA_CHOON: KanaItem[] = [
  { char: "アー", romaji: "ā" },
  { char: "イー", romaji: "ī" },
  { char: "ウー", romaji: "ū" },
  { char: "エー", romaji: "ē" },
  { char: "オー", romaji: "ō" },
];

// ========================================================
// STYLED COMPONENTS (AESTHETICS & GRID layouts)
// ========================================================

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  min-height: 100vh;
  color: var(--foreground);
  overflow-x: hidden;

  @media (max-width: 1024px) {
    padding: 1rem;
    gap: 1rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem;
  }
  @media (max-width: 768px) {
    min-height: auto;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

const MainTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--foreground);
  margin: 0;

  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0;
  line-height: 1.5;

  @media (max-width: 640px) {
    font-size: 0.92rem;
  }
`;

const PrimaryCTAButton = styled.button`
  background: linear-gradient(135deg, var(--secondary) 0%, #059669 100%);
  color: #ffffff;
  border: none;
  border-radius: 16px;
  padding: 0.95rem 2.25rem;
  font-size: 0.95rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
    filter: brightness(1.05);
  }

  &:active {
    transform: scale(0.97);
  }

  @media (max-width: 640px) {
    font-size: 0.88rem;
    padding: 0.85rem 1.75rem;
    width: 100%;
    max-width: 320px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px solid var(--border);
  width: 100%;
  margin-top: 1rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 0.85rem 2.5rem;
  font-size: 1.05rem;
  font-weight: 800;
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.06em;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--primary);
    border-radius: 99px;
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    color: ${({ $active }) =>
      $active ? "var(--primary)" : "var(--foreground)"};
  }

  @media (max-width: 640px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    flex: 1;
  }
`;

const ScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  padding-bottom: 1.5rem;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MainGridSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const GojuonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 76px);
  gap: 0.75rem;
  justify-content: center;
  margin: 0 auto;

  @media (max-width: 480px) {
    grid-template-columns: repeat(5, 62px);
    gap: 0.5rem;
  }
`;

const GroupSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2.5rem;
  border-top: 1px solid var(--border);
  padding-top: 2rem;
`;

const GroupTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--foreground);
  margin: 0 0 0.35rem 0;
  text-align: center;
`;

const GroupSubtitle = styled.p`
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin: 0 0 1.25rem 0;
  text-align: center;
  max-width: 500px;
`;

const DakuonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 76px);
  gap: 0.75rem;
  justify-content: center;

  @media (max-width: 480px) {
    grid-template-columns: repeat(5, 62px);
    gap: 0.5rem;
  }
`;

const YoonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 84px);
  gap: 0.75rem 1rem;
  justify-content: center;

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 72px);
    gap: 0.5rem 0.6rem;
  }
`;

const SokuonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 76px);
  gap: 0.75rem;
  justify-content: center;

  @media (max-width: 480px) {
    grid-template-columns: repeat(4, 64px);
    gap: 0.5rem;
  }
`;

const ChoonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 76px);
  gap: 0.75rem;
  justify-content: center;

  @media (max-width: 480px) {
    grid-template-columns: repeat(5, 62px);
    gap: 0.5rem;
  }
`;

// ========================================================
// CHARACTER CARD (DUOLINGO AESTHETIC WITH MASTERY BAR)
// ========================================================

const CardGlow = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const CharacterCardContainer = styled.button<{
  $active: boolean;
  $isEmpty: boolean;
}>`
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 18px;
  height: 94px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0.25rem 0.5rem 0.25rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  outline: none;
  user-select: none;
  touch-action: manipulation;
  width: 100%;

  ${({ $isEmpty }) =>
    $isEmpty &&
    css`
      opacity: 0;
      pointer-events: none;
      cursor: default;
      background: transparent;
      border-color: transparent;
    `}

  &:hover:not(:disabled) {
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-light);
    outline-offset: 2px;
  }

  @media (max-width: 480px) {
    height: 78px;
    border-radius: 14px;
    padding: 0.5rem 0.15rem 0.35rem 0.15rem;
  }
`;

const CardChar = styled.span`
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--foreground);
  line-height: 1;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const CardRomaji = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: lowercase;
  letter-spacing: 0.02em;

  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

const MasteryBar = styled.div`
  width: 75%;
  height: 4px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
  margin-top: 0.25rem;
`;

const MasteryFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: ${({ $percent }) =>
    $percent >= 100
      ? "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)"
      : "var(--primary)"};
  border-radius: 99px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

interface CharacterCardProps {
  item: KanaItem | null;
}

function CharacterCard({ item }: CharacterCardProps) {
  const { progress } = useProgress();

  if (!item) {
    return <CharacterCardContainer $active={false} $isEmpty={true} disabled />;
  }

  const { char, romaji } = item;

  // Calculate progress level out of 5 correct answers for 100% mastery
  const correctCount = progress.mastery[char]?.correct || 0;
  const masteryPercent = Math.min(100, (correctCount / 5) * 100);

  const handlePlaySound = () => {
    playJapaneseAudio(char);
  };

  return (
    <CharacterCardContainer
      $active={correctCount > 0}
      $isEmpty={false}
      onClick={handlePlaySound}
      title={`Pronounce ${char} (${romaji})`}
    >
      <CardChar>{char}</CardChar>
      <CardRomaji>{romaji}</CardRomaji>
      <MasteryBar>
        <MasteryFill $percent={masteryPercent} />
      </MasteryBar>
    </CharacterCardContainer>
  );
}

// ========================================================
// GAMIFIED PRACTICE MODE SYSTEM
// ========================================================

const PracticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  gap: 1.5rem;
  padding: 1rem 0;
  min-height: 75vh;
  justify-content: space-between;
`;

const PracticeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: var(--foreground);
  }
`;

const ProgressTrack = styled.div`
  flex: 1;
  height: 16px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: linear-gradient(
    90deg,
    var(--primary) 0%,
    var(--primary-light) 100%
  );
  border-radius: 99px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
  flex: 1;
  justify-content: center;
`;

const QuestionPrompt = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--foreground);
  margin: 0;

  span {
    color: var(--primary);
  }

  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`;

const LargeDisplayChar = styled.div`
  font-size: 5rem;
  font-weight: 800;
  color: var(--foreground);
  background: rgba(var(--primary-rgb), 0.05);
  border: 2px dashed rgba(var(--primary-rgb), 0.25);
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 0.5rem;

  @media (max-width: 640px) {
    font-size: 4rem;
    width: 110px;
    height: 110px;
    border-radius: 24px;
  }
`;

const SpeakerPlayButton = styled.button`
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  border: none;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: scale(1.08);
    background: var(--primary);
    color: #ffffff;
  }

  svg {
    width: 32px;
    height: 32px;
  }
`;

const ChoicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  width: 100%;
  max-width: 460px;
  margin-top: 1rem;
`;

const ChoiceButton = styled.button<{
  $selected: boolean;
  $isChecking: boolean;
  $isCorrect: boolean;
}>`
  background: var(--surface);
  border: 2px solid
    ${({ $selected }) => ($selected ? "var(--primary)" : "var(--border)")};
  border-radius: 16px;
  padding: 1.1rem;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--foreground);
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  text-align: center;
  box-shadow: ${({ $selected }) =>
    $selected ? "0 4px 12px rgba(var(--primary-rgb), 0.15)" : "none"};

  &:hover:not(:disabled) {
    border-color: var(--primary);
    background: rgba(var(--primary-rgb), 0.02);
  }

  &:disabled {
    cursor: default;
  }

  ${({ $isChecking, $selected, $isCorrect }) =>
    $isChecking &&
    $selected &&
    css`
      border-color: ${
        $isCorrect ? "var(--secondary)" : "var(--accent)"
      } !important;
      background: ${
        $isCorrect ? "rgba(16, 185, 129, 0.08)" : "rgba(244, 63, 94, 0.08)"
      } !important;
      color: ${$isCorrect ? "var(--secondary)" : "var(--accent)"} !important;
    `}

  @media (max-width: 640px) {
    padding: 0.85rem;
    font-size: 1rem;
    border-radius: 12px;
  }
`;

const ActionFooter = styled.div`
  width: 100%;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CheckOverlay = styled.div<{ $isCorrect: boolean }>`
  width: 100%;
  background: ${({ $isCorrect }) =>
    $isCorrect ? "rgba(16, 185, 129, 0.12)" : "rgba(244, 63, 94, 0.12)"};
  border: 1.5px solid
    ${({ $isCorrect }) => ($isCorrect ? "var(--secondary)" : "var(--accent)")};
  border-radius: 16px;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const OverlayTitle = styled.h4<{ $isCorrect: boolean }>`
  font-size: 1.1rem;
  font-weight: 800;
  color: ${({ $isCorrect }) =>
    $isCorrect ? "var(--secondary)" : "var(--accent)"};
  margin: 0;
`;

const OverlayText = styled.p`
  font-size: 0.9rem;
  color: var(--foreground);
  margin: 0;
`;

const BottomActionBtn = styled.button`
  background: var(--primary);
  color: #ffffff;
  border: none;
  border-radius: 16px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.2);
  width: 100%;

  &:hover {
    filter: brightness(1.08);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: var(--border);
    color: var(--text-secondary);
    box-shadow: none;
    cursor: not-allowed;
  }
`;

const MatchingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
  max-width: 480px;
  margin-top: 1rem;
`;

const MatchColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const MatchButton = styled.button<{ $selected: boolean; $matched: boolean }>`
  background: var(--surface);
  border: 2px solid
    ${({ $selected, $matched }) =>
      $matched
        ? "transparent"
        : $selected
          ? "var(--primary)"
          : "var(--border)"};
  border-radius: 14px;
  padding: 0.85rem;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--foreground);
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
  opacity: ${({ $matched }) => ($matched ? 0.35 : 1)};
  pointer-events: ${({ $matched }) => ($matched ? "none" : "auto")};

  &:hover:not(:disabled) {
    border-color: var(--primary);
  }
`;

const CompletePanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  margin: auto 0;
`;

const CompleteEmoji = styled.div`
  font-size: 4.5rem;
  margin-bottom: 0.5rem;
  animation: ${CardGlow} 1.5s infinite ease-in-out;
`;

const CompleteScoreCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(2, 120px);
  gap: 1.5rem;
  justify-content: center;
  box-shadow: var(--shadow-sm);
`;

const ScoreItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const ScoreValue = styled.span`
  font-size: 1.75rem;
  font-weight: 850;
  color: var(--primary);
`;

const ScoreLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

// ========================================================
// COMPONENT MAIN LOGIC & COMPILATION
// ========================================================

type QuestionType =
  "kana-to-romaji" | "romaji-to-kana" | "audio-to-kana" | "matching";

interface Question {
  type: QuestionType;
  prompt: string;
  correctAnswer: string;
  choices: string[];
  audioChar?: string;
  matchPairsLeft?: string[];
  matchPairsRight?: string[];
}

function CharactersPageContent() {
  const { progress, updateMastery, addExp } = useProgress();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"hiragana" | "katakana">(
    "hiragana",
  );
  const [isPracticing, setIsPracticing] = useState(false);
  const [isMistakesReview, setIsMistakesReview] = useState(false);

  // Practice session states
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  // Matching pair states
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedLeft, setMatchedLeft] = useState<string[]>([]);
  const [matchedRight, setMatchedRight] = useState<string[]>([]);

  // Generate a practice session quiz
  const startPractice = (
    targetTab: "hiragana" | "katakana",
    onlyMistakes = false,
  ) => {
    const activeGrid = targetTab === "hiragana" ? HIRAGANA_GRID : KATAKANA_GRID;
    const activeDakuon =
      targetTab === "hiragana" ? HIRAGANA_DAKUON : KATAKANA_DAKUON;
    const activeCombi =
      targetTab === "hiragana" ? HIRAGANA_COMBINATIONS : KATAKANA_COMBINATIONS;

    // Filter valid characters from grid
    const validGrid = activeGrid.filter(
      (item): item is KanaItem => item !== null,
    );
    const pool = [...validGrid, ...activeDakuon, ...activeCombi];

    if (pool.length < 10) return;

    let targets: KanaItem[] = [];
    if (onlyMistakes) {
      const mistakesPool = pool.filter(
        (item) => (progress.mastery[item.char]?.incorrect || 0) > 0,
      );
      const nonMistakesPool = pool.filter(
        (item) => !((progress.mastery[item.char]?.incorrect || 0) > 0),
      );

      const selectedMistakes = [...mistakesPool]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      targets = [...selectedMistakes];

      if (targets.length < 5) {
        const remainingCount = 5 - targets.length;
        const fillItems = [...nonMistakesPool]
          .sort(() => 0.5 - Math.random())
          .slice(0, remainingCount);
        targets = [...targets, ...fillItems];
      }
    } else {
      // Pick 5 random target items
      targets = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);
    }

    const generatedQuestions: Question[] = [];

    targets.forEach((target, index) => {
      // Pick random question types
      const types: QuestionType[] = [
        "kana-to-romaji",
        "romaji-to-kana",
        "audio-to-kana",
        "matching",
      ];
      const qType = types[Math.floor(Math.random() * (index === 4 ? 4 : 3))]; // Let last question be matching occasionally

      if (qType === "matching") {
        const matches = [...pool].sort(() => 0.5 - Math.random()).slice(0, 4);
        generatedQuestions.push({
          type: "matching",
          prompt: "Match the matching pairs",
          correctAnswer: "matched",
          choices: [],
          matchPairsLeft: matches
            .map((m) => m.char)
            .sort(() => 0.5 - Math.random()),
          matchPairsRight: matches
            .map((m) => m.romaji)
            .sort(() => 0.5 - Math.random()),
        });
      } else {
        // Find 3 incorrect choices
        const incorrectChoices = pool
          .filter((p) => p.char !== target.char)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        if (qType === "kana-to-romaji") {
          const choices = [
            target.romaji,
            ...incorrectChoices.map((c) => c.romaji),
          ].sort(() => 0.5 - Math.random());
          generatedQuestions.push({
            type: "kana-to-romaji",
            prompt: `What is the romaji translation for:`,
            correctAnswer: target.romaji,
            choices,
            audioChar: target.char,
          });
        } else if (qType === "romaji-to-kana") {
          const choices = [
            target.char,
            ...incorrectChoices.map((c) => c.char),
          ].sort(() => 0.5 - Math.random());
          generatedQuestions.push({
            type: "romaji-to-kana",
            prompt: `Select the character for the sound:`,
            correctAnswer: target.char,
            choices,
          });
        } else {
          const choices = [
            target.char,
            ...incorrectChoices.map((c) => c.char),
          ].sort(() => 0.5 - Math.random());
          generatedQuestions.push({
            type: "audio-to-kana",
            prompt: `Listen and select the matching character:`,
            correctAnswer: target.char,
            choices,
            audioChar: target.char,
          });
        }
      }
    });

    setQuestions(generatedQuestions);
    setCurrentQuestionIndex(0);
    setSelectedChoice(null);
    setIsAnswerChecked(false);
    setCorrectCount(0);
    setShowComplete(false);
    setIsPracticing(true);

    // Reset matching state
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedLeft([]);
    setMatchedRight([]);
  };

  const handleStartPractice = () => {
    setIsMistakesReview(false);
    startPractice(activeTab, false);
  };

  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (
      searchParams &&
      searchParams.get("practice") === "true" &&
      !hasTriggeredRef.current
    ) {
      hasTriggeredRef.current = true;
      setIsMistakesReview(true);

      const hPool = [
        ...HIRAGANA_GRID.filter((item): item is KanaItem => item !== null),
        ...HIRAGANA_DAKUON,
        ...HIRAGANA_COMBINATIONS,
      ].map((x) => x.char);

      const kPool = [
        ...KATAKANA_GRID.filter((item): item is KanaItem => item !== null),
        ...KATAKANA_DAKUON,
        ...KATAKANA_COMBINATIONS,
      ].map((x) => x.char);

      const hMistakes = hPool.filter(
        (c) => (progress.mastery[c]?.incorrect || 0) > 0,
      );
      const kMistakes = kPool.filter(
        (c) => (progress.mastery[c]?.incorrect || 0) > 0,
      );

      let tab: "hiragana" | "katakana" = "hiragana";
      if (kMistakes.length > 0 && hMistakes.length === 0) {
        tab = "katakana";
        setActiveTab("katakana");
      } else {
        setActiveTab("hiragana");
      }

      startPractice(tab, true);
    }
  }, [searchParams, progress.mastery]);

  const currentQuestion = questions[currentQuestionIndex];

  // Auto-play audio on question load
  useEffect(() => {
    if (
      currentQuestion &&
      currentQuestion.audioChar &&
      isPracticing &&
      !showComplete
    ) {
      const timer = setTimeout(() => {
        playJapaneseAudio(currentQuestion.audioChar!);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, isPracticing, showComplete]);

  // Handle checking answers
  const handleCheckAnswer = () => {
    if (!currentQuestion) return;

    if (currentQuestion.type === "matching") {
      setIsAnswerCorrect(true);
      setIsAnswerChecked(true);
      setCorrectCount((prev) => prev + 1);
    } else {
      const isCorrect = selectedChoice === currentQuestion.correctAnswer;
      setIsAnswerCorrect(isCorrect);
      setIsAnswerChecked(true);
      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);
      }
    }
  };

  // Move to next question
  const handleNextQuestion = () => {
    setSelectedChoice(null);
    setIsAnswerChecked(false);

    // Save character progress
    if (
      currentQuestion &&
      currentQuestion.audioChar &&
      currentQuestion.type !== "matching"
    ) {
      updateMastery(currentQuestion.audioChar, isAnswerCorrect);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Award EXP on completion
      addExp(15);
      setShowComplete(true);
    }
  };

  // Left Match Item Click
  const handleLeftMatch = (char: string) => {
    if (isAnswerChecked) return;

    // Play sound on click
    playJapaneseAudio(char);

    if (selectedLeft === char) {
      setSelectedLeft(null);
      return;
    }

    setSelectedLeft(char);

    // Check if right item is selected and verify matching relation
    if (selectedRight) {
      const activeGrid =
        activeTab === "hiragana" ? HIRAGANA_GRID : KATAKANA_GRID;
      const activeDakuon =
        activeTab === "hiragana" ? HIRAGANA_DAKUON : KATAKANA_DAKUON;
      const activeCombi =
        activeTab === "hiragana"
          ? HIRAGANA_COMBINATIONS
          : KATAKANA_COMBINATIONS;
      const validGrid = activeGrid.filter(
        (item): item is KanaItem => item !== null,
      );
      const pool = [...validGrid, ...activeDakuon, ...activeCombi];

      const matchItem = pool.find((p) => p.char === char);
      if (matchItem && matchItem.romaji === selectedRight) {
        setMatchedLeft((prev) => [...prev, char]);
        setMatchedRight((prev) => [...prev, selectedRight]);
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        // Flash mismatch
        setSelectedLeft(char);
        setSelectedRight(null);
      }
    }
  };

  // Right Match Item Click
  const handleRightMatch = (romaji: string) => {
    if (isAnswerChecked) return;

    if (selectedRight === romaji) {
      setSelectedRight(null);
      return;
    }

    setSelectedRight(romaji);

    // Check if left item is selected and verify matching relation
    if (selectedLeft) {
      const activeGrid =
        activeTab === "hiragana" ? HIRAGANA_GRID : KATAKANA_GRID;
      const activeDakuon =
        activeTab === "hiragana" ? HIRAGANA_DAKUON : KATAKANA_DAKUON;
      const activeCombi =
        activeTab === "hiragana"
          ? HIRAGANA_COMBINATIONS
          : KATAKANA_COMBINATIONS;
      const validGrid = activeGrid.filter(
        (item): item is KanaItem => item !== null,
      );
      const pool = [...validGrid, ...activeDakuon, ...activeCombi];

      const matchItem = pool.find((p) => p.char === selectedLeft);
      if (matchItem && matchItem.romaji === romaji) {
        setMatchedLeft((prev) => [...prev, selectedLeft]);
        setMatchedRight((prev) => [...prev, romaji]);
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        setSelectedRight(romaji);
        setSelectedLeft(null);
      }
    }
  };

  // Auto-finish matching question if all pairs matched
  useEffect(() => {
    if (
      currentQuestion &&
      currentQuestion.type === "matching" &&
      currentQuestion.matchPairsLeft
    ) {
      if (
        matchedLeft.length === currentQuestion.matchPairsLeft.length &&
        !isAnswerChecked
      ) {
        setIsAnswerCorrect(true);
        setIsAnswerChecked(true);
        setCorrectCount((prev) => prev + 1);
      }
    }
  }, [matchedLeft, currentQuestion, isAnswerChecked]);

  return (
    <PageContainer>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }]}
        current="Characters"
      />

      {!isPracticing ? (
        <>
          <HeaderSection>
            <MainTitle>
              Learn {activeTab === "hiragana" ? "Hiragana" : "Katakana"}!
            </MainTitle>
            <Subtitle>
              {activeTab === "hiragana"
                ? "Learn the primary writing system of Japanese. Click cards to hear their pronunciation."
                : "Learn the writing system used for foreign loanwords. Click cards to hear their pronunciation."}
            </Subtitle>
            <PrimaryCTAButton onClick={handleStartPractice}>
              Practice Characters
            </PrimaryCTAButton>
          </HeaderSection>

          <TabContainer>
            <TabButton
              $active={activeTab === "hiragana"}
              onClick={() => setActiveTab("hiragana")}
            >
              Hiragana
            </TabButton>
            <TabButton
              $active={activeTab === "katakana"}
              onClick={() => setActiveTab("katakana")}
            >
              Katakana
            </TabButton>
          </TabContainer>

          <ScrollWrapper>
            <MainGridSection>
              <GojuonGrid>
                {(activeTab === "hiragana" ? HIRAGANA_GRID : KATAKANA_GRID).map(
                  (item, idx) => (
                    <CharacterCard
                      key={`grid-${activeTab}-${idx}`}
                      item={item}
                    />
                  ),
                )}
              </GojuonGrid>

              <GroupSection>
                <GroupTitle>Dakuon & Handakuon</GroupTitle>
                <GroupSubtitle>
                  Add modification marks (voicing/half-voicing) to modify
                  consonant sounds.
                </GroupSubtitle>
                <DakuonGrid>
                  {(activeTab === "hiragana"
                    ? HIRAGANA_DAKUON
                    : KATAKANA_DAKUON
                  ).map((item, idx) => (
                    <CharacterCard
                      key={`dakuon-${activeTab}-${idx}`}
                      item={item}
                    />
                  ))}
                </DakuonGrid>
              </GroupSection>

              <GroupSection>
                <GroupTitle>Combinations (Yōon)</GroupTitle>
                <GroupSubtitle>
                  Combine base consonants with small ya (ゃ), yu (ゅ), or yo
                  (ょ) to speak compound sounds.
                </GroupSubtitle>
                <YoonGrid>
                  {(activeTab === "hiragana"
                    ? HIRAGANA_COMBINATIONS
                    : KATAKANA_COMBINATIONS
                  ).map((item, idx) => (
                    <CharacterCard
                      key={`yoon-${activeTab}-${idx}`}
                      item={item}
                    />
                  ))}
                </YoonGrid>
              </GroupSection>

              <GroupSection>
                <GroupTitle>Double Consonants (Sokuon)</GroupTitle>
                <GroupSubtitle>
                  Small tsu (っ / ッ) is used to double the following consonant
                  and create a glottal stop.
                </GroupSubtitle>
                <SokuonGrid>
                  {(activeTab === "hiragana"
                    ? HIRAGANA_SOKUON
                    : KATAKANA_SOKUON
                  ).map((item, idx) => (
                    <CharacterCard
                      key={`sokuon-${activeTab}-${idx}`}
                      item={item}
                    />
                  ))}
                </SokuonGrid>
              </GroupSection>

              <GroupSection>
                <GroupTitle>Long Vowels (Chōon)</GroupTitle>
                <GroupSubtitle>
                  Repeat vowel sounds to produce double-beat elongated sounds.
                </GroupSubtitle>
                <ChoonGrid>
                  {(activeTab === "hiragana"
                    ? HIRAGANA_CHOON
                    : KATAKANA_CHOON
                  ).map((item, idx) => (
                    <CharacterCard
                      key={`choon-${activeTab}-${idx}`}
                      item={item}
                    />
                  ))}
                </ChoonGrid>
              </GroupSection>
            </MainGridSection>
          </ScrollWrapper>
        </>
      ) : (
        <PracticeContainer>
          <PracticeHeader>
            <CloseButton
              onClick={() => {
                setIsPracticing(false);
                if (isMistakesReview) {
                  router.push("/practice");
                } else {
                  router.replace("/characters");
                }
              }}
            >
              ✕
            </CloseButton>
            <ProgressTrack>
              <ProgressFill
                $percent={(currentQuestionIndex / questions.length) * 100}
              />
            </ProgressTrack>
            <div style={{ width: "32px" }} />
          </PracticeHeader>

          {!showComplete ? (
            <>
              {currentQuestion && (
                <QuestionBox>
                  <QuestionPrompt>
                    {currentQuestion.type === "kana-to-romaji" && (
                      <>
                        What is the romaji translation of:{" "}
                        <span>{currentQuestion.audioChar}</span>?
                      </>
                    )}
                    {currentQuestion.type === "romaji-to-kana" && (
                      <>
                        Select the Japanese character that pronounces:{" "}
                        <span>{currentQuestion.correctAnswer}</span>
                      </>
                    )}
                    {currentQuestion.type === "audio-to-kana" && (
                      <>
                        Listen to the sound and select the matching character:
                      </>
                    )}
                    {currentQuestion.type === "matching" && (
                      <>Connect the matching character pairs:</>
                    )}
                  </QuestionPrompt>

                  {/* Question visual display */}
                  {currentQuestion.type === "kana-to-romaji" && (
                    <LargeDisplayChar>
                      {currentQuestion.audioChar}
                    </LargeDisplayChar>
                  )}
                  {currentQuestion.type === "romaji-to-kana" && (
                    <LargeDisplayChar
                      style={{
                        background: "rgba(var(--secondary-rgb), 0.05)",
                        borderColor: "rgba(var(--secondary-rgb), 0.25)",
                        color: "var(--secondary)",
                      }}
                    >
                      {currentQuestion.correctAnswer}
                    </LargeDisplayChar>
                  )}
                  {currentQuestion.type === "audio-to-kana" && (
                    <SpeakerPlayButton
                      onClick={() =>
                        playJapaneseAudio(currentQuestion.audioChar!)
                      }
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                      </svg>
                    </SpeakerPlayButton>
                  )}

                  {/* Standard choices layout */}
                  {currentQuestion.type !== "matching" ? (
                    <ChoicesGrid>
                      {currentQuestion.choices.map((choice) => (
                        <ChoiceButton
                          key={choice}
                          $selected={selectedChoice === choice}
                          $isChecking={isAnswerChecked}
                          $isCorrect={isAnswerCorrect}
                          disabled={isAnswerChecked}
                          onClick={() => {
                            setSelectedChoice(choice);
                            // Auto play pronunciation sound on choice click
                            if (
                              currentQuestion.type === "romaji-to-kana" ||
                              currentQuestion.type === "audio-to-kana"
                            ) {
                              playJapaneseAudio(choice);
                            }
                          }}
                        >
                          {choice}
                        </ChoiceButton>
                      ))}
                    </ChoicesGrid>
                  ) : (
                    /* Matching pairs layout */
                    <MatchingContainer>
                      <MatchColumn>
                        {currentQuestion.matchPairsLeft?.map((char) => (
                          <MatchButton
                            key={char}
                            $selected={selectedLeft === char}
                            $matched={matchedLeft.includes(char)}
                            onClick={() => handleLeftMatch(char)}
                          >
                            {char}
                          </MatchButton>
                        ))}
                      </MatchColumn>
                      <MatchColumn>
                        {currentQuestion.matchPairsRight?.map((romaji) => (
                          <MatchButton
                            key={romaji}
                            $selected={selectedRight === romaji}
                            $matched={matchedRight.includes(romaji)}
                            onClick={() => handleRightMatch(romaji)}
                          >
                            {romaji}
                          </MatchButton>
                        ))}
                      </MatchColumn>
                    </MatchingContainer>
                  )}
                </QuestionBox>
              )}

              <ActionFooter>
                {isAnswerChecked && (
                  <CheckOverlay $isCorrect={isAnswerCorrect}>
                    <OverlayTitle $isCorrect={isAnswerCorrect}>
                      {isAnswerCorrect ? "Awesome! ✨" : "Incorrect 😢"}
                    </OverlayTitle>
                    <OverlayText>
                      {isAnswerCorrect
                        ? "Your answer is correct."
                        : `Correct answer: ${currentQuestion.correctAnswer}`}
                    </OverlayText>
                  </CheckOverlay>
                )}

                {!isAnswerChecked ? (
                  <BottomActionBtn
                    onClick={handleCheckAnswer}
                    disabled={
                      currentQuestion?.type !== "matching" && !selectedChoice
                    }
                  >
                    Check
                  </BottomActionBtn>
                ) : (
                  <BottomActionBtn onClick={handleNextQuestion}>
                    Continue
                  </BottomActionBtn>
                )}
              </ActionFooter>
            </>
          ) : (
            /* Complete session display panel */
            <CompletePanel>
              <CompleteEmoji>🎉</CompleteEmoji>
              <QuestionPrompt>
                {isMistakesReview
                  ? "Mistakes Reviewed!"
                  : "Practice Completed!"}
              </QuestionPrompt>
              <Subtitle>
                {isMistakesReview
                  ? "Great job! You have cleared some of your troubled characters."
                  : "Great job! Your Japanese character reading skills are improving."}
              </Subtitle>

              <CompleteScoreCard>
                <ScoreItem>
                  <ScoreValue>+{15}</ScoreValue>
                  <ScoreLabel>EXP GAINED</ScoreLabel>
                </ScoreItem>
                <ScoreItem>
                  <ScoreValue>
                    {Math.round((correctCount / questions.length) * 100)}%
                  </ScoreValue>
                  <ScoreLabel>ACCURACY</ScoreLabel>
                </ScoreItem>
              </CompleteScoreCard>

              <BottomActionBtn
                onClick={() => {
                  setIsPracticing(false);
                  if (isMistakesReview) {
                    router.push("/practice");
                  } else {
                    router.replace("/characters");
                  }
                }}
              >
                Finish
              </BottomActionBtn>
            </CompletePanel>
          )}
        </PracticeContainer>
      )}
    </PageContainer>
  );
}

export default function CharactersPage() {
  return (
    <Suspense
      fallback={
        <PageContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
              color: "var(--text-secondary)",
            }}
          >
            Loading Characters...
          </div>
        </PageContainer>
      }
    >
      <CharactersPageContent />
    </Suspense>
  );
}
