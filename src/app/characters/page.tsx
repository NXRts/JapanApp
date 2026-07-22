"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import styled, { keyframes, css } from "styled-components";
import { useProgress } from "@/context/ProgressContext";
import { playJapaneseAudio } from "@/lib/audio";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useSearchParams, useRouter } from "next/navigation";
import { KANJI_DATA, KanjiItem } from "@/data/kanji";
import { KanjiDetailModal } from "@/components/modals/KanjiDetailModal";

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
  { char: "みょ", romaji: "myo" },
  { char: "りゃ", romaji: "rya" },
  { char: "りゅ", romaji: "ryu" },
  { char: "りょ", romaji: "ryo" },
];

const HIRAGANA_SOKUON: KanaItem[] = [
  { char: "っか", romaji: "kka" },
  { char: "っさ", romaji: "ssa" },
  { char: "った", romaji: "tta" },
  { char: "っぱ", romaji: "ppa" },
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
  { char: "ッカ", romaji: "kka" },
  { char: "ッサ", romaji: "ssa" },
  { char: "ッタ", romaji: "tta" },
  { char: "ッパ", romaji: "ppa" },
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
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #ffffff;
  border: none;
  border-bottom: 4px solid #047857;
  border-radius: 18px;
  padding: 0.95rem 2.25rem;
  font-size: 0.95rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35);
  transition: all 0.15s ease;
  margin-top: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 22px rgba(16, 185, 129, 0.45);
    filter: brightness(1.08);
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
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
    padding: 0.75rem 1rem;
    font-size: 0.88rem;
    flex: 1;
  }
`;

const KanjiFilterBar = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.25rem 0 1rem 0;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 640px) {
    justify-content: flex-start;
  }
`;

const KanjiFilterTab = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? "#8b5cf6" : "var(--surface)")};
  color: ${({ $active }) => ($active ? "white" : "var(--text-secondary)")};
  border: 1.5px solid ${({ $active }) => ($active ? "#8b5cf6" : "var(--border)")};
  border-radius: 999px;
  padding: 0.45rem 1rem;
  font-size: 0.82rem;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: #8b5cf6;
    color: ${({ $active }) => ($active ? "white" : "var(--foreground)")};
  }
`;

const KanjiCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 1050px;
  margin: 1rem auto 0 auto;

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(105px, 1fr));
    gap: 0.65rem;
  }
`;

const KanjiCardBtn = styled.button`
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 18px;
  padding: 1.1rem 0.65rem 0.85rem 0.65rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  outline: none;
  width: 100%;

  &:hover {
    border-color: #8b5cf6;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.25);
  }

  &:active {
    transform: scale(0.96);
  }

  @media (max-width: 640px) {
    padding: 0.85rem 0.4rem 0.65rem 0.4rem;
    border-radius: 14px;
  }
`;

const KanjiBigChar = styled.span`
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--foreground);
  line-height: 1;

  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

const KanjiLabelMeaning = styled.span`
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--foreground);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const KanjiSubReading = styled.span`
  font-size: 0.7rem;
  color: #8b5cf6;
  font-weight: 700;
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
// GAMIFIED PRACTICE MODE SYSTEM (MATCHING LESSON UI)
// ========================================================

const slideUpAnim = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const PracticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 0.5rem 0 3rem 0;
  min-height: 50vh;
`;

const ContentWrapper = styled.div`
  max-width: 580px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
`;

const LessonHeader = styled.header`
  width: 100%;
  max-width: 580px;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding: 0.5rem 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 1.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: var(--foreground);
  }
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 16px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 99px;
  overflow: hidden;
  border: 1px solid var(--border);
  position: relative;
`;

const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => `${$percent}%`};
  background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
  border-radius: 99px;
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
`;

const LivesIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 900;
  font-size: 1.15rem;
  color: #ef4444;
`;

const QuestionCategory = styled.span`
  font-size: 0.82rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #10b981;
  letter-spacing: 0.08em;
`;

const PracticeCard = styled.div`
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 24px;
  padding: 2.25rem 2rem;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.35rem;
  margin: 0.5rem auto;

  @media (max-width: 640px) {
    padding: 1.5rem 1.15rem;
    border-radius: 20px;
    gap: 1.15rem;
  }
`;

const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
  width: 100%;
`;

const CardFooterDivider = styled.div`
  width: 100%;
  border-top: 1.5px solid var(--border);
  margin-top: 0.5rem;
  padding-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const QuestionPrompt = styled.h2`
  font-size: 1.35rem;
  font-weight: 850;
  color: var(--foreground);
  margin: 0;

  span {
    color: #3b82f6;
    font-weight: 900;
  }

  @media (max-width: 640px) {
    font-size: 1.15rem;
  }
`;

const LargeDisplayChar = styled.div`
  font-size: 4.5rem;
  font-weight: 900;
  color: var(--foreground);
  background: rgba(59, 130, 246, 0.08);
  border: 2px dashed rgba(59, 130, 246, 0.3);
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 28px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.25rem;

  @media (max-width: 640px) {
    font-size: 3.5rem;
    width: 105px;
    height: 105px;
    border-radius: 22px;
  }
`;

const SpeakerPlayButton = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-bottom: 4px solid #3730a3;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35);

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }

  svg {
    width: 36px;
    height: 36px;
  }
`;

const ChoicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  width: 100%;
  max-width: 480px;
  margin-top: 0.5rem;
`;

const ChoiceButton = styled.button<{
  $selected: boolean;
  $isChecking: boolean;
  $isCorrect: boolean;
}>`
  background: ${({ $selected }) => ($selected ? "rgba(59, 130, 246, 0.12)" : "var(--surface)")};
  border: 2px solid
    ${({ $selected }) => ($selected ? "#3b82f6" : "var(--border)")};
  border-bottom: 4px solid
    ${({ $selected }) => ($selected ? "#2563eb" : "var(--border)")};
  border-radius: 18px;
  padding: 1.15rem 1rem;
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--foreground);
  cursor: pointer;
  transition: all 0.12s ease;
  outline: none;
  text-align: center;

  &:hover:not(:disabled) {
    border-color: #3b82f6;
    background: rgba(59, 130, 246, 0.05);
  }

  &:active:not(:disabled) {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }

  &:disabled {
    cursor: default;
  }

  ${({ $isChecking, $selected, $isCorrect }) =>
    $isChecking &&
    $selected &&
    css`
      border-color: ${
        $isCorrect ? "#10b981" : "#f43f5e"
      } !important;
      border-bottom-color: ${
        $isCorrect ? "#059669" : "#e11d48"
      } !important;
      background: ${
        $isCorrect ? "rgba(16, 185, 129, 0.12)" : "rgba(244, 63, 94, 0.12)"
      } !important;
      color: ${$isCorrect ? "#10b981" : "#f43f5e"} !important;
    `}

  @media (max-width: 640px) {
    padding: 0.9rem 0.6rem;
    font-size: 1.05rem;
    border-radius: 14px;
  }
`;

const InlineActionFooter = styled.div`
  width: 100%;
  max-width: 480px;
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const InlineFeedbackCard = styled.div<{ $isCorrect: boolean }>`
  width: 100%;
  background: ${({ $isCorrect }) =>
    $isCorrect ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)"};
  border: 1.5px solid
    ${({ $isCorrect }) => ($isCorrect ? "#10b981" : "#ef4444")};
  border-radius: 18px;
  padding: 0.9rem 1.15rem;
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  text-align: left;
`;

const FeedbackTextGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
`;

const FeedbackIconCircle = styled.div<{ $state: "correct" | "incorrect" }>`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${({ $state }) => ($state === "correct" ? "#10b981" : "#ef4444")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const FeedbackTitleText = styled.h4<{ $state: "correct" | "incorrect" }>`
  font-size: 1.15rem;
  font-weight: 900;
  color: ${({ $state }) => ($state === "correct" ? "#34d399" : "#fca5a5")};
  margin: 0 0 0.15rem 0;
`;

const FeedbackSubText = styled.p`
  font-size: 0.88rem;
  color: var(--foreground);
  margin: 0;
`;

const BottomActionBtn = styled.button`
  background: #3b82f6;
  color: #ffffff;
  border: none;
  border-bottom: 4px solid #1d4ed8;
  border-radius: 18px;
  padding: 0.95rem 1.5rem;
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.04em;

  &:hover:not(:disabled) {
    filter: brightness(1.08);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }

  &:disabled {
    background: var(--border);
    border-bottom: 4px solid rgba(255, 255, 255, 0.1);
    color: var(--text-secondary);
    box-shadow: none;
    cursor: not-allowed;
  }
`;

const MatchingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  width: 100%;
  max-width: 480px;
  margin-top: 0.5rem;
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
  const [activeTab, setActiveTab] = useState<"hiragana" | "katakana" | "kanji">(
    "hiragana",
  );
  const [kanjiFilter, setKanjiFilter] = useState<string>("N5");
  const [selectedKanji, setSelectedKanji] = useState<KanjiItem | null>(null);
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
    targetTab: "hiragana" | "katakana" | "kanji",
    onlyMistakes = false,
  ) => {
    let pool: KanaItem[] = [];

    if (targetTab === "kanji") {
      const currentList = filteredKanjiList.length > 0 ? filteredKanjiList : KANJI_DATA.N5;
      pool = currentList.map((item) => ({
        char: item.char,
        romaji: item.meaning,
      }));
    } else {
      const activeGrid = targetTab === "hiragana" ? HIRAGANA_GRID : KATAKANA_GRID;
      const activeDakuon =
        targetTab === "hiragana" ? HIRAGANA_DAKUON : KATAKANA_DAKUON;
      const activeCombi =
        targetTab === "hiragana" ? HIRAGANA_COMBINATIONS : KATAKANA_COMBINATIONS;
      const validGrid = activeGrid.filter(
        (item): item is KanaItem => item !== null,
      );
      pool = [...validGrid, ...activeDakuon, ...activeCombi];
    }

    if (pool.length < 4) return;

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
      targets = [...pool].sort(() => 0.5 - Math.random()).slice(0, Math.min(5, pool.length));
    }

    const generatedQuestions: Question[] = [];

    targets.forEach((target, index) => {
      // Pick random question types
      const types: QuestionType[] =
        targetTab === "kanji"
          ? ["romaji-to-kana", "kana-to-romaji"]
          : ["kana-to-romaji", "romaji-to-kana", "audio-to-kana", "matching"];

      const qType = types[Math.floor(Math.random() * (index === 4 && targetTab !== "kanji" ? 4 : types.length))];

      if (qType === "matching") {
        const matches = [...pool].sort(() => 0.5 - Math.random()).slice(0, 4);
        generatedQuestions.push({
          type: "matching",
          prompt: "Hubungkan pasangan huruf dan romaji yang cocok:",
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
            prompt: targetTab === "kanji" ? `Apa arti Bahasa Indonesia dari Kanji ini?` : `Apa romaji yang tepat untuk huruf ini?`,
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
            prompt: targetTab === "kanji" ? `Pilih huruf Kanji yang berbunyi / berarti demikian:` : `Pilih huruf Jepang yang berbunyi demikian:`,
            correctAnswer: target.char,
            choices,
            audioChar: target.romaji,
          });
        } else {
          const choices = [
            target.char,
            ...incorrectChoices.map((c) => c.char),
          ].sort(() => 0.5 - Math.random());
          generatedQuestions.push({
            type: "audio-to-kana",
            prompt: `Dengarkan suara audio dan pilih huruf yang sesuai:`,
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

  const filteredKanjiList = useMemo(() => {
    if (kanjiFilter === "N5") return KANJI_DATA.N5 || [];
    if (kanjiFilter === "N4") return KANJI_DATA.N4 || [];
    if (kanjiFilter === "N3") return KANJI_DATA.N3 || [];
    if (kanjiFilter === "N2") return KANJI_DATA.N2 || [];
    if (kanjiFilter === "N1") return KANJI_DATA.N1 || [];

    const allN5 = KANJI_DATA.N5 || [];
    if (kanjiFilter === "numbers") {
      const chars = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万"];
      return allN5.filter((k) => chars.includes(k.char));
    }
    if (kanjiFilter === "nature") {
      const chars = ["日", "月", "火", "水", "木", "金", "土", "山", "川", "天", "気", "雨", "花", "空"];
      return allN5.filter((k) => chars.includes(k.char));
    }
    if (kanjiFilter === "people") {
      const chars = ["人", "男", "女", "子", "目", "口", "手", "足", "父", "母"];
      return allN5.filter((k) => chars.includes(k.char));
    }
    if (kanjiFilter === "directions") {
      const chars = ["上", "下", "中", "大", "小", "左", "右", "東", "西", "南", "北"];
      return allN5.filter((k) => chars.includes(k.char));
    }

    return KANJI_DATA.N5 || [];
  }, [kanjiFilter]);

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
    if (!currentQuestion || isAnswerChecked) return;

    if (currentQuestion.type === "matching") {
      setIsAnswerCorrect(true);
      setIsAnswerChecked(true);
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
              {activeTab === "hiragana"
                ? "Belajar Hiragana Dasar!"
                : activeTab === "katakana"
                ? "Belajar Katakana Dasar!"
                : "Pembelajaran Kanji Interaktif!"}
            </MainTitle>
            <Subtitle>
              {activeTab === "hiragana"
                ? "Pelajari fondasi utama sistem penulisan Jepang. Klik kartu untuk mendengarkan pengucapan audio."
                : activeTab === "katakana"
                ? "Pelajari huruf sistem serapan kosakata asing. Klik kartu untuk mendengarkan pengucapan audio."
                : "Pelajari huruf Kanji secara bertahap mulai dari angka, alam, hingga level JLPT. Klik kartu untuk melihat animasi coretan & contoh kata."}
            </Subtitle>
            <PrimaryCTAButton onClick={handleStartPractice}>
              {activeTab === "kanji" ? "Latihan Kanji Interaktif 🚀" : "Latihan Huruf (Practice Characters)"}
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
            <TabButton
              $active={activeTab === "kanji"}
              onClick={() => setActiveTab("kanji")}
            >
              Kanji 🈸
            </TabButton>
          </TabContainer>

          {activeTab === "kanji" ? (
            <div style={{ width: "100%", marginTop: "1rem" }}>
              <KanjiFilterBar>
                <KanjiFilterTab $active={kanjiFilter === "N5"} onClick={() => setKanjiFilter("N5")}>
                  🎓 JLPT N5 (Dasar)
                </KanjiFilterTab>
                <KanjiFilterTab $active={kanjiFilter === "N4"} onClick={() => setKanjiFilter("N4")}>
                  🎓 JLPT N4
                </KanjiFilterTab>
                <KanjiFilterTab $active={kanjiFilter === "N3"} onClick={() => setKanjiFilter("N3")}>
                  🎓 JLPT N3
                </KanjiFilterTab>
                <KanjiFilterTab $active={kanjiFilter === "numbers"} onClick={() => setKanjiFilter("numbers")}>
                  🔢 Angka & Hitungan
                </KanjiFilterTab>
                <KanjiFilterTab $active={kanjiFilter === "nature"} onClick={() => setKanjiFilter("nature")}>
                  🌞 Alam & Waktu
                </KanjiFilterTab>
                <KanjiFilterTab $active={kanjiFilter === "people"} onClick={() => setKanjiFilter("people")}>
                  👤 Manusia & Tubuh
                </KanjiFilterTab>
                <KanjiFilterTab $active={kanjiFilter === "directions"} onClick={() => setKanjiFilter("directions")}>
                  🗺️ Arah & Ukuran
                </KanjiFilterTab>
              </KanjiFilterBar>

              <KanjiCardGrid>
                {filteredKanjiList.map((item) => {
                  const masteryData = progress.mastery[item.char] || { correct: 0, incorrect: 0 };
                  const totalAttempts = masteryData.correct + masteryData.incorrect;
                  const masteryPct = totalAttempts > 0 ? Math.min(100, Math.round((masteryData.correct / totalAttempts) * 100)) : 0;
                  return (
                    <KanjiCardBtn
                      key={item.char}
                      onClick={() => {
                        playJapaneseAudio(item.char);
                        setSelectedKanji(item);
                      }}
                    >
                      <KanjiBigChar>{item.char}</KanjiBigChar>
                      <KanjiLabelMeaning>{item.meaning}</KanjiLabelMeaning>
                      <KanjiSubReading>{item.kun || item.on || ""}</KanjiSubReading>
                      <MasteryBar>
                        <MasteryFill $percent={masteryPct} />
                      </MasteryBar>
                    </KanjiCardBtn>
                  );
                })}
              </KanjiCardGrid>
            </div>
          ) : (
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
          )}

          {selectedKanji && (
            <KanjiDetailModal
              kanji={selectedKanji}
              onClose={() => setSelectedKanji(null)}
              onPractice={() => router.push("/jlpt/kanji-writer")}
            />
          )}
        </>
      ) : (
        <PracticeContainer>
          <LessonHeader>
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
            <ProgressBar>
              <ProgressFill
                $percent={
                  showComplete
                    ? 100
                    : Math.min(
                        100,
                        Math.round(
                          ((currentQuestionIndex + (isAnswerChecked ? 1 : 0)) /
                            (questions.length || 1)) *
                            100,
                        ),
                      )
                }
              />
            </ProgressBar>
            <LivesIndicator>❤️ {progress.isSuper ? "♾️" : (progress.hearts ?? 5)}</LivesIndicator>
          </LessonHeader>

          <ContentWrapper>
            {!showComplete ? (
              <>
                {currentQuestion && (
                  <PracticeCard>
                    <QuestionBox>
                      <QuestionCategory>
                        LATIHAN HURUF {activeTab.toUpperCase()}
                      </QuestionCategory>

                      <QuestionPrompt>
                        {currentQuestion.type === "kana-to-romaji" && (
                          <>{activeTab === "kanji" ? "Apa arti Bahasa Indonesia dari Kanji ini?" : "Apa pembacaan romaji yang tepat untuk huruf ini?"}</>
                        )}
                        {currentQuestion.type === "romaji-to-kana" && (
                          <>{activeTab === "kanji" ? "Pilih huruf Kanji yang berbunyi / berarti demikian:" : "Pilih huruf Jepang yang berbunyi demikian:"}</>
                        )}
                        {currentQuestion.type === "audio-to-kana" && (
                          <>Dengarkan suara audio dan pilih huruf yang sesuai:</>
                        )}
                        {currentQuestion.type === "matching" && (
                          <>Hubungkan pasangan huruf dan romaji yang cocok:</>
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
                            background: "rgba(59, 130, 246, 0.08)",
                            borderColor: "rgba(59, 130, 246, 0.3)",
                            color: "#3b82f6",
                          }}
                        >
                          {currentQuestion.audioChar || currentQuestion.correctAnswer}
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

                    {/* Card Footer Divider & Action Button inside PracticeCard */}
                    <CardFooterDivider>
                      {isAnswerChecked && (
                        <InlineFeedbackCard $isCorrect={isAnswerCorrect}>
                          <FeedbackIconCircle
                            $state={isAnswerCorrect ? "correct" : "incorrect"}
                          >
                            {isAnswerCorrect ? "✓" : "✕"}
                          </FeedbackIconCircle>
                          <div>
                            <FeedbackTitleText
                              $state={isAnswerCorrect ? "correct" : "incorrect"}
                            >
                              {isAnswerCorrect
                                ? "Luar Biasa! ✨ Benar Sekali"
                                : "Kurang Tepat 😢"}
                            </FeedbackTitleText>
                            <FeedbackSubText>
                              {isAnswerCorrect
                                ? "Jawaban kamu sudah benar."
                                : `Jawaban yang benar: ${currentQuestion?.correctAnswer}`}
                            </FeedbackSubText>
                          </div>
                        </InlineFeedbackCard>
                      )}

                      <BottomActionBtn
                        onClick={
                          !isAnswerChecked ? handleCheckAnswer : handleNextQuestion
                        }
                        disabled={
                          !isAnswerChecked &&
                          currentQuestion?.type !== "matching" &&
                          !selectedChoice
                        }
                        style={{
                          width: "100%",
                          maxWidth: "100%",
                          background: !isAnswerChecked
                            ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                            : isAnswerCorrect
                            ? "#10b981"
                            : "#ef4444",
                          borderBottomColor: !isAnswerChecked
                            ? "#047857"
                            : isAnswerCorrect
                            ? "#047857"
                            : "#b91c1c",
                        }}
                      >
                        {!isAnswerChecked ? "PERIKSA JAWABAN 🚀" : "LANJUTKAN ➡️"}
                      </BottomActionBtn>
                    </CardFooterDivider>
                  </PracticeCard>
                )}
              </>
            ) : (
              /* Complete session display panel */
              <CompletePanel>
                <CompleteEmoji>🎉</CompleteEmoji>
                <QuestionPrompt>
                  {isMistakesReview
                    ? "Evaluasi Kesalahan Selesai! 🎉"
                    : "Sesi Latihan Selesai! 🎉"}
                </QuestionPrompt>
                <Subtitle>
                  {isMistakesReview
                    ? "Hebat sekali! Kamu berhasil memperbaiki beberapa kesalahan huruf."
                    : "Kerja bagus! Kemampuan membaca huruf Jepang kamu makin terasah tajam."}
                </Subtitle>

                <CompleteScoreCard>
                  <ScoreItem>
                    <ScoreValue>+15 XP</ScoreValue>
                    <ScoreLabel>XP TERKUMPUL</ScoreLabel>
                  </ScoreItem>
                  <ScoreItem>
                    <ScoreValue>
                      {Math.min(
                        100,
                        Math.round(
                          (correctCount / (questions.length || 1)) * 100,
                        ),
                      )}
                      %
                    </ScoreValue>
                    <ScoreLabel>AKURASI JAWABAN</ScoreLabel>
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
                  style={{
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    borderBottomColor: "#047857",
                    maxWidth: "320px",
                    marginTop: "1.5rem",
                  }}
                >
                  SELESAI & KEMBALI 🏠
                </BottomActionBtn>
              </CompletePanel>
            )}
          </ContentWrapper>
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
