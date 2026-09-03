"use client";

import { playJapaneseAudio } from "@/lib/audio";
import {
  allKanji,
  allVocabulary,
  DictionaryResult,
  getAutoSuggestions,
  searchDictionary,
} from "@/lib/dictionary";
import {
  generateConjugations,
  WordConjugationTable,
} from "@/utils/japaneseConjugation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

/* ─── Global Font Imports ────────────────────────────────────────────────── */
const KamusGlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700&family=Noto+Sans+JP:wght@400;500;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  :root {
    --font-kanji: "Noto Serif JP", serif;
    --font-kana: "Noto Sans JP", sans-serif;
    --font-ui: "Inter", sans-serif;
    --font-mono: "JetBrains Mono", monospace;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const audioPulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.6); }
  70% { box-shadow: 0 0 0 10px rgba(79, 70, 229, 0); }
  100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
`;

/* ─── Styled Components ─────────────────────────────────────────────────── */
const Container = styled.div`
  width: 100%;
  max-width: 100%;
  animation: ${fadeIn} 0.3s ease-out;
  color: var(--foreground);
`;

/* Header Section (Used when showHeader is true) */
const HeaderBox = styled.div`
  margin-bottom: 1rem;
  text-align: left;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.25rem;
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--foreground);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: -0.02em;

  span.brand-mark {
    font-family: var(--font-kanji);
    color: var(--primary);
  }

  @media (max-width: 640px) {
    font-size: 1.25rem;
    gap: 0.35rem;
  }
`;

const EntryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-secondary);

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #10b981;
  }

  @media (max-width: 640px) {
    padding: 0.2rem 0.6rem;
    font-size: 0.72rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0.3rem 0 0 0;

  @media (max-width: 640px) {
    font-size: 0.78rem;
    margin-top: 0.2rem;
  }
`;

/* Search Box Container */
const SearchBoxWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.25rem;
  margin-top: 0.5rem;
`;

const SearchBarForm = styled.form`
  display: flex;
  align-items: center;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 18px;
  padding: 0.4rem 0.6rem 0.4rem 1.2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:focus-within {
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(var(--primary-rgb, 79, 70, 229), 0.15);
  }

  svg.search-icon {
    flex-shrink: 0;
    color: var(--text-secondary);
    margin-right: 0.5rem;
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: var(--font-ui);
    font-size: 1rem;
    font-weight: 600;
    color: var(--foreground);
    padding: 0.5rem 0;

    &::placeholder {
      color: var(--text-secondary);
      font-weight: 400;
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 0.4rem 0.6rem;
    gap: 0.4rem;
    border-radius: 14px;

    svg.search-icon {
      margin-right: 0.3rem;
      width: 18px;
      height: 18px;
    }

    input {
      font-size: 0.88rem;
      padding: 0.3rem 0;
      width: 100%;
    }
  }
`;

const InputToggleBar = styled.div`
  display: flex;
  align-items: center;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 3px;
  gap: 2px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    padding: 2px;
  }
`;

const TogglePill = styled.button<{ $active: boolean }>`
  border: none;
  background: ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "var(--text-secondary)")};
  font-family: var(--font-kana);
  font-size: 0.8rem;
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  padding: 5px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    color: ${({ $active }) => ($active ? "#ffffff" : "var(--foreground)")};
  }

  @media (max-width: 768px) {
    flex: 1;
    text-align: center;
    padding: 4px 4px;
    font-size: 0.72rem;
  }
`;

const SearchMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.6rem;
  font-size: 0.82rem;
  color: var(--text-secondary);
  font-weight: 600;
  flex-wrap: wrap;

  .chips {
    display: flex;
    gap: 5px;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 640px) {
    font-size: 0.75rem;
    margin-top: 0.4rem;
  }
`;

const LevelChip = styled.button<{ $active: boolean }>`
  padding: 3px 10px;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  border-radius: 8px;
  background: ${({ $active }) =>
    $active ? "rgba(var(--primary-rgb, 79, 70, 229), 0.12)" : "var(--surface)"};
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};
  font-size: 0.78rem;
  font-weight: ${({ $active }) => ($active ? "800" : "600")};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  @media (max-width: 640px) {
    padding: 2px 8px;
    font-size: 0.72rem;
    border-radius: 6px;
  }
`;

/* Auto Suggestions Dropdown */
const SuggestionsBox = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  max-height: 360px;
  overflow-y: auto;
`;

const SuggestionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  transition: background 0.12s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.08);
  }
`;

/* Main Content Body */
const BodyWrap = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const GridPanel = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;
`;

const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  gap: 0.75rem;
  flex-wrap: wrap;

  h2 {
    font-size: 0.85rem;
    font-weight: 800;
    color: var(--foreground);
    letter-spacing: 0.03em;
    margin: 0;
    text-transform: uppercase;

    span {
      font-weight: 500;
      color: var(--text-secondary);
      text-transform: none;
      margin-left: 6px;
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;

    h2 {
      font-size: 0.75rem;
    }
  }
`;

const SortBar = styled.div`
  display: flex;
  gap: 4px;

  button {
    border: 1px solid var(--border);
    background: var(--surface);
    border-radius: 8px;
    padding: 4px 10px;
    font-family: var(--font-ui);
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    color: var(--text-secondary);
    transition: all 0.15s ease;

    &.active {
      border-color: var(--primary);
      background: rgba(var(--primary-rgb, 79, 70, 229), 0.12);
      color: var(--primary);
    }

    &:hover:not(.active) {
      border-color: var(--primary);
      color: var(--primary);
    }
  }

  @media (max-width: 640px) {
    width: 100%;

    button {
      flex: 1;
      text-align: center;
      padding: 4px 2px;
      font-size: 0.72rem;
    }
  }
`;

/* Responsive Auto-Fill Grid */
const VGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 8px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 10px;
  width: 100%;

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(95px, 1fr));
    gap: 5px;
    padding: 5px;
    border-radius: 12px;
  }
`;

const CellCard = styled.div<{ $starred?: boolean }>`
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 8px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 98px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--primary);
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.06);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  }

  .pos-tag {
    position: absolute;
    top: 5px;
    left: 6px;
    font-family: var(--font-mono);
    font-size: 8.5px;
    font-weight: 800;
    color: #d97706;
    background: rgba(217, 119, 6, 0.12);
    border: 1px solid rgba(217, 119, 6, 0.2);
    padding: 1px 4px;
    border-radius: 4px;
    line-height: 1.2;
  }

  .star-btn {
    position: absolute;
    top: 5px;
    right: 6px;
    font-size: 11px;
    color: ${({ $starred }) => ($starred ? "#f59e0b" : "var(--border)")};
    transition: color 0.15s ease;
  }

  .furigana {
    font-family: var(--font-kana);
    font-size: 9.5px;
    color: var(--primary);
    font-weight: 700;
    letter-spacing: 0.3px;
    margin-top: 6px;
    line-height: 1;
    height: 11px;
  }

  .kanji {
    font-family: var(--font-kanji);
    font-size: 1.45rem;
    font-weight: 700;
    color: var(--foreground);
    line-height: 1.15;
    margin: 2px 0;
  }

  .romaji {
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-secondary);
    letter-spacing: 0.2px;
  }

  .indo {
    font-family: var(--font-ui);
    font-size: 11px;
    font-weight: 800;
    color: var(--primary);
    margin-top: 4px;
    text-align: center;
    line-height: 1.25;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
    width: 100%;
  }

  @media (max-width: 640px) {
    min-height: 84px;
    padding: 6px 3px 4px;
    border-radius: 10px;

    .pos-tag {
      top: 3px;
      left: 3px;
      font-size: 7.5px;
      padding: 0px 3px;
    }

    .star-btn {
      top: 3px;
      right: 3px;
      font-size: 9.5px;
    }

    .furigana {
      font-size: 8.5px;
      margin-top: 4px;
      height: 9px;
    }

    .kanji {
      font-size: 1.18rem;
      margin: 1px 0;
    }

    .romaji {
      font-size: 8.5px;
    }

    .indo {
      font-size: 9.5px;
      margin-top: 2px;
    }
  }
`;

/* Pagination */
const PaginationBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 1.5rem 0;
  font-family: var(--font-mono);
  font-size: 0.85rem;

  button {
    min-width: 32px;
    height: 32px;
    padding: 0 10px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-secondary);
    border-radius: 8px;
    cursor: pointer;
    font-family: var(--font-mono);
    font-weight: 600;
    transition: all 0.15s ease;

    &.active {
      background: var(--primary);
      border-color: var(--primary);
      color: #ffffff;
      font-weight: 800;
    }

    &.nav {
      color: var(--foreground);
      font-family: var(--font-ui);
      font-weight: 700;
    }

    &:hover:not(.active) {
      border-color: var(--primary);
      color: var(--primary);
    }
  }

  .ellipsis {
    color: var(--text-secondary);
    padding: 0 4px;
  }

  @media (max-width: 640px) {
    justify-content: flex-start;
    overflow-x: auto;
    padding: 1rem 0;
    button {
      flex-shrink: 0;
    }
  }
`;

/* Right Filter Rail */
const FilterRail = styled.aside`
  width: 54px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: sticky;
  top: 90px;
  height: fit-content;

  @media (max-width: 900px) {
    width: 100%;
    flex-direction: row;
    position: static;
    gap: 8px;
  }
`;

const RailCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 8px 0;

  @media (max-width: 900px) {
    flex: 1;
    min-width: 0;
    padding: 4px 4px;
  }
`;

const RailTitle = styled.div`
  font-size: 8.5px;
  font-weight: 800;
  color: var(--text-secondary);
  text-align: center;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  text-transform: uppercase;

  @media (max-width: 900px) {
    margin-bottom: 2px;
    font-size: 8px;
  }
`;

const RailList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 420px;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 900px) {
    flex-direction: row;
    max-height: none;
    overflow-x: auto;
    padding: 2px;
    gap: 2px;
  }
`;

const RailItem = styled.button<{ $active?: boolean; $kana?: boolean }>`
  width: 32px;
  height: 24px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ $kana }) =>
    $kana ? "var(--font-kana)" : "var(--font-ui)"};
  font-size: ${({ $kana }) => ($kana ? "12px" : "10.5px")};
  font-weight: 700;
  color: ${({ $active }) => ($active ? "#ffffff" : "var(--text-secondary)")};
  background: ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  cursor: pointer;
  border-radius: 6px;
  flex-shrink: 0;
  transition: all 0.12s ease;

  &:hover {
    background: ${({ $active }) =>
      $active
        ? "var(--primary)"
        : "rgba(var(--primary-rgb, 79, 70, 229), 0.12)"};
    color: ${({ $active }) => ($active ? "#ffffff" : "var(--primary)")};
  }

  @media (max-width: 900px) {
    width: 28px;
    height: 22px;
    font-size: ${({ $kana }) => ($kana ? "11px" : "9.5px")};
  }
`;

/* ─── Detail Modal ───────────────────────────────────────────────────────── */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  width: 100%;
  max-width: 560px;
  max-height: 88vh;
  overflow-y: auto;
  padding: 1.5rem 1.75rem;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.25);
  color: var(--foreground);

  @media (max-width: 640px) {
    padding: 1.2rem 1rem;
    border-radius: 16px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

const ModalKanjiTitle = styled.div`
  font-family: var(--font-kanji);
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--foreground);
  line-height: 1.1;
`;

const ModalFurigana = styled.div`
  font-family: var(--font-kana);
  font-size: 1rem;
  color: var(--primary);
  font-weight: 700;
  margin-bottom: 2px;
`;

const ModalRomaji = styled.div`
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const ActionGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
`;

const ActionBtn = styled.button<{
  $primary?: boolean;
  $active?: boolean;
  $isPlaying?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 700;
  font-family: var(--font-ui);
  border: 1px solid
    ${({ $primary, $active, $isPlaying }) =>
      $primary || $active || $isPlaying ? "var(--primary)" : "var(--border)"};
  background: ${({ $primary, $active, $isPlaying }) =>
    $primary || $isPlaying
      ? "var(--primary)"
      : $active
        ? "rgba(var(--primary-rgb, 79, 70, 229), 0.15)"
        : "var(--surface)"};
  color: ${({ $primary, $active, $isPlaying }) =>
    $primary || $isPlaying
      ? "#ffffff"
      : $active
        ? "var(--primary)"
        : "var(--foreground)"};
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  touch-action: manipulation;
  ${({ $isPlaying }) =>
    $isPlaying &&
    css`
      animation: ${audioPulse} 1.2s infinite;
    `}

  &:hover {
    border-color: var(--primary);
    color: ${({ $primary, $isPlaying }) =>
      $primary || $isPlaying ? "#ffffff" : "var(--primary)"};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.92);
  }
`;

const ToastBanner = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--foreground);
  color: var(--background);
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.88rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 2000;
`;

/* ─── DATA & CONSTANTS ───────────────────────────────────────────────────── */
const ALPHABET_RAIL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const KANA_RAIL = [
  "あ",
  "か",
  "さ",
  "た",
  "な",
  "は",
  "ま",
  "や",
  "ら",
  "わ",
  "が",
  "ざ",
  "だ",
  "ば",
  "ぱ",
  "ん",
];

/* Helper for POS formatting */
function formatPOS(type?: string, word?: string): string {
  if (!type && !word) return "N";
  const str = `${type || ""} ${word || ""}`.toLowerCase();
  if (str.includes("verb 2") || str.includes("v2") || str.includes("ichidan"))
    return "V2";
  if (str.includes("verb 3") || str.includes("v3") || str.includes("suru"))
    return "V3";
  if (str.includes("verb 1") || str.includes("v1") || str.includes("godan"))
    return "V1";
  if (
    str.includes("adj-i") ||
    str.includes("i-adj") ||
    str.includes("adjective-i")
  )
    return "A-i";
  if (
    str.includes("adj-na") ||
    str.includes("na-adj") ||
    str.includes("adjective-na")
  )
    return "A-na";
  if (str.includes("suru")) return "VS";
  return "N";
}

export interface KamusLightViewProps {
  showHeader?: boolean;
}

export function KamusLightView({ showHeader = false }: KamusLightViewProps) {
  const [query, setQuery] = useState("");
  const [inputMode, setInputMode] = useState<
    "all" | "hira" | "kata" | "romaji" | "id"
  >("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [sortMode, setSortMode] = useState<"freq" | "alpha" | "level">("freq");
  const [activeRailChar, setActiveRailChar] = useState<string | null>(null);

  // Pagination & Results
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 120;

  // Search state
  const [results, setResults] = useState<DictionaryResult[]>([]);
  const [suggestions, setSuggestions] = useState<DictionaryResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  // Storage
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Modals
  const [detailItem, setDetailItem] = useState<DictionaryResult | null>(null);
  const [selectedConjugation, setSelectedConjugation] =
    useState<WordConjugationTable | null>(null);
  const [selectedKanji, setSelectedKanji] = useState<DictionaryResult | null>(
    null,
  );

  const searchContainerRef = useRef<HTMLDivElement>(null);

  /* Load bookmarks from localStorage */
  useEffect(() => {
    try {
      const savedBM = localStorage.getItem("japanapp_kamus_starred");
      if (savedBM) setBookmarks(JSON.parse(savedBM));
    } catch (e) {
      console.warn(e);
    }
  }, []);

  /* Initial data load */
  useEffect(() => {
    performSearch("");
  }, []);

  /* Perform Search */
  const performSearch = async (searchTerm: string) => {
    setLoading(true);
    setShowSuggestions(false);

    const term = searchTerm.trim();
    let res: DictionaryResult[] = [];

    if (!term) {
      res = allVocabulary;
    } else {
      res = await searchDictionary(term, "all", levelFilter);
    }

    setResults(res);
    setCurrentPage(1);
    setLoading(false);
  };

  /* Toast Helper */
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2400);
  };

  /* Audio Playback Handler with visual feedback */
  const handlePlayAudio = async (text: string) => {
    if (!text || isPlayingAudio) return;
    setIsPlayingAudio(true);
    try {
      await playJapaneseAudio(text, {
        onStart: () => setIsPlayingAudio(true),
        onEnd: () => setIsPlayingAudio(false),
      });
    } finally {
      setIsPlayingAudio(false);
    }
  };

  /* Toggle Star / Bookmark */
  const toggleStar = (e: React.MouseEvent, item: DictionaryResult) => {
    e.stopPropagation();
    const wordKey = item.word || item.kanji || item.reading || item.id;
    setBookmarks((prev) => {
      let updated;
      if (prev.includes(wordKey)) {
        updated = prev.filter((k) => k !== wordKey);
        triggerToast("Dihapus dari favorit");
      } else {
        updated = [...prev, wordKey];
        triggerToast("Disimpan ke favorit ★");
      }
      localStorage.setItem("japanapp_kamus_starred", JSON.stringify(updated));
      return updated;
    });
  };

  /* Auto Suggestion typing */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim().length >= 1) {
      const sugs = getAutoSuggestions(val, 8);
      setSuggestions(sugs);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  /* Close suggestion on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Filter & Sort Pipeline */
  const processedResults = useMemo(() => {
    let list = [...results];

    // 1. Mode Input Filter
    if (inputMode === "hira") {
      list = list.filter((r) =>
        /^[\u3040-\u309f]+$/.test(r.reading || r.word || ""),
      );
    } else if (inputMode === "kata") {
      list = list.filter((r) =>
        /^[\u30a0-\u30ff]+$/.test(r.word || r.reading || ""),
      );
    } else if (inputMode === "romaji") {
      list = list.filter((r) => Boolean(r.romaji));
    }

    // 2. Level Filter
    if (levelFilter !== "all") {
      list = list.filter((r) => r.level === levelFilter);
    }

    // 3. Rail Character Filter
    if (activeRailChar) {
      const char = activeRailChar.toLowerCase();
      list = list.filter((r) => {
        const w = (r.word || "").toLowerCase();
        const rd = (r.reading || "").toLowerCase();
        const rm = (r.romaji || "").toLowerCase();
        const mn = (r.meaning || "").toLowerCase();
        return (
          w.startsWith(char) ||
          rd.startsWith(char) ||
          rm.startsWith(char) ||
          mn.startsWith(char)
        );
      });
    }

    // 4. Sorting
    if (sortMode === "alpha") {
      list.sort((a, b) =>
        (a.reading || a.word || "").localeCompare(
          b.reading || b.word || "",
          "ja",
        ),
      );
    } else if (sortMode === "level") {
      list.sort((a, b) => (a.level || "N5").localeCompare(b.level || "N5"));
    }

    return list;
  }, [results, inputMode, levelFilter, activeRailChar, sortMode]);

  /* Paginated Items */
  const totalPages = Math.max(
    1,
    Math.ceil(processedResults.length / itemsPerPage),
  );
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedResults.slice(start, start + itemsPerPage);
  }, [processedResults, currentPage, itemsPerPage]);

  /* Conjugation Modal Handler */
  const handleOpenConjugation = (item: DictionaryResult) => {
    const word = item.word || item.reading || "";
    const reading = item.reading || "";
    const pos = item.partOfSpeech || item.category || "";

    const conj = generateConjugations(word, reading, pos);
    if (conj && conj.items.length > 0) {
      setSelectedConjugation(conj);
    } else {
      triggerToast("Konjugasi hanya berlaku untuk Kata Kerja / Kata Sifat");
    }
  };

  /* Kanjidex Modal Handler */
  const handleOpenKanjiDetail = (kanjiChar: string) => {
    const found = allKanji.find((k) => k.kanji === kanjiChar);
    if (found) {
      setSelectedKanji(found);
    } else {
      setSelectedKanji({
        id: `kanji-${kanjiChar}`,
        type: "kanji",
        kanji: kanjiChar,
        level: "N5",
        meaning: `Kanji ${kanjiChar}`,
        source: "kanji-db",
      });
    }
  };

  return (
    <Container>
      <KamusGlobalStyle />

      {showHeader && (
        <>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Characters", href: "/characters" },
            ]}
            current="Kamus JapanApp"
          />

          <HeaderBox>
            <TitleRow>
              <PageTitle>
                <span className="brand-mark">学</span> JapanApp — Kamus
                Jepang-Indonesia
              </PageTitle>

              <EntryBadge>
                <span className="dot" />
                {allVocabulary.length.toLocaleString()} Entri · N5–N1
              </EntryBadge>
            </TitleRow>
            <Subtitle>
              Cari cepat kata Jepang-Indonesia & Indonesia-Jepang (Kanji, Kana,
              Romaji, atau Kata Indonesia).
            </Subtitle>
          </HeaderBox>
        </>
      )}

      {/* Search Row */}
      <SearchBoxWrapper ref={searchContainerRef}>
        <SearchBarForm
          onSubmit={(e) => {
            e.preventDefault();
            performSearch(query);
          }}
        >
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Cari kata, kanji, atau arti… misalnya 食べる, taberu, atau makan"
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.length >= 1 && setShowSuggestions(true)}
          />
          <InputToggleBar>
            <TogglePill
              type="button"
              $active={inputMode === "all"}
              onClick={() => setInputMode("all")}
            >
              Semua
            </TogglePill>
            <TogglePill
              type="button"
              $active={inputMode === "hira"}
              onClick={() => setInputMode("hira")}
            >
              ひら
            </TogglePill>
            <TogglePill
              type="button"
              $active={inputMode === "kata"}
              onClick={() => setInputMode("kata")}
            >
              カナ
            </TogglePill>
            <TogglePill
              type="button"
              $active={inputMode === "romaji"}
              onClick={() => setInputMode("romaji")}
            >
              Romaji
            </TogglePill>
            <TogglePill
              type="button"
              $active={inputMode === "id"}
              onClick={() => setInputMode("id")}
            >
              ID
            </TogglePill>
          </InputToggleBar>
        </SearchBarForm>

        {/* Real-time Auto Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <SuggestionsBox>
            {suggestions.map((sug, idx) => (
              <SuggestionRow
                key={`sug-${sug.id}-${idx}`}
                onClick={() => {
                  const text = sug.word || sug.reading || sug.meaning;
                  setQuery(text);
                  performSearch(text);
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-kanji)",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      marginRight: "8px",
                    }}
                  >
                    {sug.word || sug.kanji || sug.reading}
                  </span>
                  {sug.reading && sug.reading !== sug.word && (
                    <span
                      style={{
                        fontFamily: "var(--font-kana)",
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      ({sug.reading})
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "var(--primary)",
                  }}
                >
                  {sug.meaning}
                </span>
              </SuggestionRow>
            ))}
          </SuggestionsBox>
        )}

        {/* Search Meta & Level Filters */}
        <SearchMetaRow>
          <div className="chips">
            {["all", "N5", "N4", "N3", "N2", "N1"].map((lvl) => (
              <LevelChip
                key={lvl}
                $active={levelFilter === lvl}
                onClick={() => setLevelFilter(lvl)}
              >
                {lvl === "all" ? "Semua level" : lvl}
              </LevelChip>
            ))}
          </div>
          <span>
            Menampilkan{" "}
            {paginatedItems.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}
            –{Math.min(currentPage * itemsPerPage, processedResults.length)}{" "}
            dari {processedResults.length.toLocaleString()} hasil
            {query ? ` untuk "${query}"` : ""}
          </span>
        </SearchMetaRow>
      </SearchBoxWrapper>

      {/* Main Body */}
      <BodyWrap>
        <GridPanel>
          <ToolbarRow>
            <h2>
              HASIL PENCARIAN <span>· diurutkan berdasarkan {sortMode}</span>
            </h2>
            <SortBar>
              <button
                className={sortMode === "freq" ? "active" : ""}
                onClick={() => setSortMode("freq")}
              >
                Frekuensi
              </button>
              <button
                className={sortMode === "alpha" ? "active" : ""}
                onClick={() => setSortMode("alpha")}
              >
                Abjad (あ→ん)
              </button>
              <button
                className={sortMode === "level" ? "active" : ""}
                onClick={() => setSortMode("level")}
              >
                Level JLPT
              </button>
            </SortBar>
          </ToolbarRow>

          {/* Loading Indicator */}
          {loading && (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "var(--text-secondary)",
                fontWeight: 600,
              }}
            >
              🔄 Memuat entri kamus...
            </div>
          )}

          {/* Dense 12-Column Grid */}
          {!loading && paginatedItems.length > 0 && (
            <VGrid>
              {paginatedItems.map((item, idx) => {
                const wordKey =
                  item.word || item.kanji || item.reading || item.id;
                const isStarred = bookmarks.includes(wordKey);
                const pos = formatPOS(
                  item.partOfSpeech || item.category,
                  item.word,
                );

                return (
                  <CellCard
                    key={`${item.id}-${idx}`}
                    $starred={isStarred}
                    onClick={() => setDetailItem(item)}
                  >
                    <span className="pos-tag">{pos}</span>
                    <span
                      className="star-btn"
                      onClick={(e) => toggleStar(e, item)}
                    >
                      ★
                    </span>
                    <span className="furigana">
                      {item.reading && item.reading !== item.word
                        ? item.reading
                        : ""}
                    </span>
                    <span className="kanji">
                      {item.word || item.kanji || item.reading}
                    </span>
                    <span className="romaji">
                      {item.romaji || item.reading}
                    </span>
                    <span className="indo">{item.meaning}</span>
                  </CellCard>
                );
              })}
            </VGrid>
          )}

          {/* Empty State */}
          {!loading && paginatedItems.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 1.5rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                🍃
              </div>
              <h3 style={{ margin: "0 0 0.4rem 0", fontWeight: 800 }}>
                Entri kata tidak ditemukan
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  margin: 0,
                  fontSize: "13px",
                }}
              >
                Coba gunakan kata dasar Romaji (contoh: <i>taberu</i>) atau kata
                Bahasa Indonesia lainnya.
              </p>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <PaginationBox>
              <button
                className="nav"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                ‹ Sebelumnya
              </button>

              {Array.from(
                { length: Math.min(5, totalPages) },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  className={currentPage === p ? "active" : ""}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              ))}

              {totalPages > 5 && <span className="ellipsis">…</span>}

              {totalPages > 5 && (
                <button
                  className={currentPage === totalPages ? "active" : ""}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              )}

              <button
                className="nav"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
              >
                Berikutnya ›
              </button>
            </PaginationBox>
          )}
        </GridPanel>

        {/* Right Filter Rail (A-Z & Kana index) */}
        <FilterRail>
          <RailCard>
            <RailTitle>A–Z</RailTitle>
            <RailList>
              {ALPHABET_RAIL.map((char) => (
                <RailItem
                  key={char}
                  $active={activeRailChar === char}
                  onClick={() =>
                    setActiveRailChar((prev) => (prev === char ? null : char))
                  }
                >
                  {char}
                </RailItem>
              ))}
            </RailList>
          </RailCard>

          <RailCard>
            <RailTitle>あ–ん</RailTitle>
            <RailList>
              {KANA_RAIL.map((char) => (
                <RailItem
                  key={char}
                  $kana
                  $active={activeRailChar === char}
                  onClick={() =>
                    setActiveRailChar((prev) => (prev === char ? null : char))
                  }
                >
                  {char}
                </RailItem>
              ))}
            </RailList>
          </RailCard>
        </FilterRail>
      </BodyWrap>

      {/* ─── MODAL 1: INTERACTIVE WORD DETAIL MODAL ───────────────────────── */}
      {detailItem && (
        <ModalOverlay onClick={() => setDetailItem(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <div>
                {detailItem.reading &&
                  detailItem.reading !== detailItem.word && (
                    <ModalFurigana>{detailItem.reading}</ModalFurigana>
                  )}
                <ModalKanjiTitle>
                  {detailItem.word || detailItem.kanji || detailItem.reading}
                </ModalKanjiTitle>
                <ModalRomaji>
                  {detailItem.romaji || detailItem.reading}
                </ModalRomaji>
              </div>

              <div style={{ textAlign: "right" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "var(--primary)",
                    background: "rgba(var(--primary-rgb, 79, 70, 229), 0.12)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                  }}
                >
                  {detailItem.level || "N5"}
                </span>
                <div
                  style={{
                    fontSize: "1.4rem",
                    cursor: "pointer",
                    marginTop: "8px",
                    color: bookmarks.includes(
                      detailItem.word ||
                        detailItem.kanji ||
                        detailItem.reading ||
                        detailItem.id,
                    )
                      ? "#f59e0b"
                      : "var(--border)",
                  }}
                  onClick={(e) => toggleStar(e, detailItem)}
                >
                  ★
                </div>
              </div>
            </ModalHeader>

            <div
              style={{
                fontSize: "14px",
                fontWeight: 800,
                color: "var(--foreground)",
              }}
            >
              Arti & Definisi:
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "var(--primary)",
                fontWeight: 700,
                marginTop: "4px",
                marginBottom: "1rem",
              }}
            >
              {detailItem.meaning}
            </div>

            {/* Example Sentences */}
            {detailItem.examples && detailItem.examples.length > 0 && (
              <div style={{ marginTop: "1rem" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--text-secondary)",
                    marginBottom: "6px",
                  }}
                >
                  CONTOH KALIMAT:
                </div>
                {detailItem.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "var(--background)",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      marginBottom: "6px",
                      fontSize: "13px",
                    }}
                  >
                    <div
                      style={{ fontWeight: 700, color: "var(--foreground)" }}
                    >
                      {ex.japanese}
                    </div>
                    {ex.indonesian && (
                      <div
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "12px",
                        }}
                      >
                        {ex.indonesian}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons Toolbar */}
            <ActionGrid>
              <ActionBtn
                $primary
                $isPlaying={isPlayingAudio}
                disabled={isPlayingAudio}
                onClick={() =>
                  handlePlayAudio(
                    detailItem.word ||
                      detailItem.kanji ||
                      detailItem.reading ||
                      "",
                  )
                }
              >
                {isPlayingAudio ? "🔊 Memutar... 🎶" : "🔊 Dengar Audio"}
              </ActionBtn>

              <ActionBtn
                onClick={() => {
                  const text = `${detailItem.word || detailItem.kanji || detailItem.reading} (${detailItem.reading || ""}) - ${detailItem.meaning}`;
                  navigator.clipboard.writeText(text);
                  triggerToast("Teks entri berhasil disalin! 📋");
                }}
              >
                📋 Salin Teks
              </ActionBtn>

              {(detailItem.word || detailItem.kanji || "").length > 0 &&
                /[一-龯]/.test(detailItem.word || detailItem.kanji || "") && (
                  <ActionBtn
                    onClick={() => {
                      const kanjiChar = (
                        detailItem.word ||
                        detailItem.kanji ||
                        ""
                      ).charAt(0);
                      handleOpenKanjiDetail(kanjiChar);
                    }}
                  >
                    ⛩️ Detail Kanji
                  </ActionBtn>
                )}

              <ActionBtn onClick={() => handleOpenConjugation(detailItem)}>
                🔄 Konjugasi Kata
              </ActionBtn>
            </ActionGrid>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* ─── MODAL 2: TABEL KONJUGASI ─────────────────────────────────────── */}
      {selectedConjugation && (
        <ModalOverlay onClick={() => setSelectedConjugation(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <h2 style={{ fontSize: "1.2rem", margin: 0, fontWeight: 800 }}>
                🔄 Konjugasi ({selectedConjugation.word})
              </h2>
              <button
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "1.4rem",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                }}
                onClick={() => setSelectedConjugation(null)}
              >
                ×
              </button>
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "var(--primary)",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              {selectedConjugation.typeLabel}
            </div>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13px",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th style={{ textAlign: "left", padding: "6px" }}>Bentuk</th>
                  <th style={{ textAlign: "left", padding: "6px" }}>Jepang</th>
                  <th style={{ textAlign: "left", padding: "6px" }}>
                    Penjelasan
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedConjugation.items.map((c, idx) => (
                  <tr
                    key={idx}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td style={{ padding: "8px 6px", fontWeight: 600 }}>
                      {c.formName}
                    </td>
                    <td
                      style={{
                        padding: "8px 6px",
                        fontFamily: "var(--font-kanji)",
                        fontWeight: 700,
                        color: "var(--primary)",
                      }}
                    >
                      {c.japanese}
                    </td>
                    <td
                      style={{
                        padding: "8px 6px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {c.formNameId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* ─── MODAL 3: KANJIDEX BREAKDOWN ─────────────────────────────────── */}
      {selectedKanji && (
        <ModalOverlay onClick={() => setSelectedKanji(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <h2 style={{ fontSize: "1.2rem", margin: 0, fontWeight: 800 }}>
                ⛩️ Detail Kanji ({selectedKanji.kanji})
              </h2>
              <button
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "1.4rem",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                }}
                onClick={() => setSelectedKanji(null)}
              >
                ×
              </button>
            </div>

            <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
              <div
                style={{
                  fontFamily: "var(--font-kanji)",
                  fontSize: "3.5rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  lineHeight: 1,
                }}
              >
                {selectedKanji.kanji}
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  marginTop: "6px",
                  color: "var(--foreground)",
                }}
              >
                {selectedKanji.meaning}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                background: "var(--background)",
                padding: "12px",
                borderRadius: "12px",
                fontSize: "13px",
              }}
            >
              <div>
                <strong>Kun&#39;yomi (Jepang):</strong>
                <div style={{ color: "var(--primary)", fontWeight: 700 }}>
                  {selectedKanji.kunyomi?.join(", ") || "-"}
                </div>
              </div>
              <div>
                <strong>On&#39;yomi (Cina):</strong>
                <div style={{ color: "#d97706", fontWeight: 700 }}>
                  {selectedKanji.onyomi?.join(", ") || "-"}
                </div>
              </div>
              <div>
                <strong>Goresan (Strokes):</strong>
                <div>{selectedKanji.stroke_count || 5} goresan</div>
              </div>
              <div>
                <strong>Level JLPT:</strong>
                <div>{selectedKanji.level || "N5"}</div>
              </div>
            </div>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* Toast Notification */}
      {toastMsg && <ToastBanner>{toastMsg}</ToastBanner>}
    </Container>
  );
}
