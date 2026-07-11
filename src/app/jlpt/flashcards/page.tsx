"use client";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { playJapaneseAudio } from "@/lib/audio";
import {
  allGrammar,
  allKanji,
  allVocabulary,
  DictionaryResult,
  searchDictionary,
} from "@/lib/dictionary";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { toRomaji } from "wanakana";

// --- Styled Components ---

const PageWrapper = styled.div`
  min-height: 90vh;
  // background: var(--background);
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
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 640px) {
    padding: 1rem 0.75rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  width: 100%;

  @media (max-width: 640px) {
    margin-bottom: 1rem;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const HeaderRight = styled.div`
  text-align: right;

  @media (max-width: 600px) {
    text-align: left;
  }
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 1.5rem;
  padding: 0 0.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

const FilterTitle = styled.h3`
  margin: 0;
  color: var(--text-secondary);
  text-transform: capitalize;

  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`;

const FilterSelectors = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 640px) {
    justify-content: space-between;
    width: 100%;
    & > * {
      flex: 1;
    }
  }
`;

const CardArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  position: relative;
  margin-bottom: 2.5rem;

  @media (max-width: 640px) {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const NavArrow = styled.button`
  flex-shrink: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    color: var(--primary);
    border-color: var(--primary);
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const FlashcardContainer = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 450px; /* Base height for the card */
  perspective: 1000px;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    min-height: 340px;
  }
`;

const FlashcardInner = styled.div<{ $isFlipped: boolean }>`
  position: relative;
  width: 100%;
  flex: 1;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  transform: ${({ $isFlipped }) =>
    $isFlipped ? "rotateY(180deg)" : "rotateY(0)"};
`;

const FlashcardSide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: var(--surface);
  border-radius: 20px;
  box-shadow:
    var(--shadow-md),
    0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border);
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;

  @media (max-width: 640px) {
    padding: 1.5rem 1rem 3.5rem 1rem;
  }
`;

const FlashcardBack = styled(FlashcardSide)`
  transform: rotateY(180deg);
  justify-content: center;
`;

const BottomLeftText = styled.span`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  font-size: 0.9rem;
  color: var(--primary);
  font-weight: 600;
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
  padding: 0.4rem 1rem;
  border-radius: 99px;

  @media (max-width: 640px) {
    bottom: 1rem;
    left: 1rem;
    padding: 0.35rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const StatusIndicator = styled.div<{
  $status: "remembered" | "not-remembered" | null;
}>`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ $status }) =>
    $status === "remembered"
      ? "#22c55e"
      : $status === "not-remembered"
        ? "#ef4444"
        : "transparent"};
  box-shadow: ${({ $status }) =>
    $status === "remembered"
      ? "0 0 12px rgba(34, 197, 94, 0.6)"
      : $status === "not-remembered"
        ? "0 0 12px rgba(239, 68, 68, 0.6)"
        : "none"};
  z-index: 10;
  transition: all 0.3s ease;

  @media (max-width: 640px) {
    top: 1rem;
    left: 1rem;
  }
`;

const SpeakerIcon = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  margin-bottom: 1rem;

  &:hover {
    color: var(--primary);
  }

  @media (max-width: 640px) {
    margin-bottom: 0.5rem;
  }
`;

const MainWord = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--primary);
  text-align: center;
  line-height: 1.2;
  word-break: break-word;

  @media (max-width: 640px) {
    font-size: 2.5rem;
  }
`;

const BackMeaning = styled.div<{ $textLength: number }>`
  font-size: ${({ $textLength }) => {
    if ($textLength > 60) return "1.6rem";
    if ($textLength > 30) return "2.2rem";
    return "3.2rem";
  }};
  font-weight: 600;
  color: var(--primary);
  text-align: center;
  line-height: 1.4;
  word-break: break-word;
  max-width: 90%;
  margin: 0 auto;
  overflow-y: auto;
  max-height: 60%;
  padding: 0.5rem;

  /* Custom scrollbar to look sleek */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.2);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.4);
  }

  @media (max-width: 640px) {
    font-size: ${({ $textLength }) => {
      if ($textLength > 60) return "1.25rem";
      if ($textLength > 30) return "1.6rem";
      return "2.2rem";
    }};
    max-height: 55%;
  }
`;

const Readings = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const MeaningPrimary = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--foreground);
  margin-top: 1.5rem;
  text-align: center;
`;

const DetailsBtn = styled.button`
  background: none;
  border: none;
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-top: 1.5rem;
  cursor: pointer;
  transition: color 0.2s;

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: currentColor;
    margin-top: 2px;
    opacity: 0.5;
  }

  &:hover {
    color: var(--primary);
  }
`;

const FlipBtn = styled.button`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  background: none;
  border: 1px solid var(--primary);
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 99px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
  }

  @media (max-width: 640px) {
    bottom: 1rem;
    right: 1rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
    gap: 0.3rem;
  }
`;

const BottomActions = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  width: 100%;
  max-width: 600px;
  justify-content: center;
  margin-top: 1.5rem;

  @media (max-width: 640px) {
    gap: 0.75rem;
    padding: 0 0.5rem;
  }
`;

const ActionCircle = styled.button<{ $color: string; $variant?: "remembered" | "forgot" | "secondary" }>`
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 99px;
  font-weight: 700;
  color: var(--foreground);
  cursor: pointer;
  transition: all 0.2s;

  .icon-wrapper {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid ${({ $color }) => $color};
    color: ${({ $color }) => $color};
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: ${({ $color }) => $color};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    flex: 1;
    
    ${({ $variant }) =>
      $variant === "remembered" &&
      `
      background: rgba(34, 197, 94, 0.15);
      border-color: rgba(34, 197, 94, 0.4);
      color: #22c55e;
      .icon-wrapper {
        border-color: #22c55e;
        color: #22c55e;
      }
    `}

    ${({ $variant }) =>
      $variant === "forgot" &&
      `
      background: rgba(239, 68, 68, 0.15);
      border-color: rgba(239, 68, 68, 0.4);
      color: #ef4444;
      .icon-wrapper {
        border-color: #ef4444;
        color: #ef4444;
      }
    `}

    ${({ $variant }) =>
      $variant === "secondary" &&
      `
      background: var(--surface);
      border-color: var(--border);
      color: var(--text-secondary);
      flex: 0 0 auto;
      min-width: unset;
      padding: 0.75rem;
    `}
  }
`;

const SwipeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  will-change: transform;
  position: relative;
`;

const SwipeBadge = styled.div<{ $type: "remembered" | "forgot"; $opacity: number }>`
  position: absolute;
  top: 2.5rem;
  ${({ $type }) => ($type === "remembered" ? "right: 2.5rem;" : "left: 2.5rem;")}
  border: 3px solid ${({ $type }) => ($type === "remembered" ? "#22c55e" : "#ef4444")};
  color: ${({ $type }) => ($type === "remembered" ? "#22c55e" : "#ef4444")};
  background: var(--surface);
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  font-weight: 900;
  border-radius: 8px;
  text-transform: uppercase;
  transform: rotate(${({ $type }) => ($type === "remembered" ? "15deg" : "-15deg")});
  opacity: ${({ $opacity }) => $opacity};
  pointer-events: none;
  z-index: 100;
  transition: opacity 0.1s ease;
`;

// --- Dropdown Components ---
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  min-width: 120px;
  z-index: 20;
`;

const DropdownTrigger = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 99px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  outline: none;

  &:hover {
    color: var(--primary);
    border-color: var(--primary);
  }

  svg {
    transition: transform 0.2s;
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 50;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DropdownItem = styled.div<{ $isActive: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ $isActive }) =>
    $isActive ? "var(--primary)" : "var(--foreground)"};
  background: ${({ $isActive }) =>
    $isActive ? "rgba(var(--primary-rgb, 79, 70, 229), 0.05)" : "transparent"};
  transition: background 0.2s;

  &:hover {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.05);
    color: var(--primary);
  }
`;

function FilterDropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      setTimeout(
        () => document.addEventListener("click", handleClickOutside),
        0,
      );
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const displayValue = value === "All" ? options[0] : value;

  return (
    <DropdownContainer onClick={(e) => e.stopPropagation()}>
      <DropdownTrigger $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {displayValue}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </DropdownTrigger>
      {isOpen && (
        <DropdownMenu>
          {options.map((opt) => {
            const actualVal = opt === "All" ? "All" : opt;
            return (
              <DropdownItem
                key={opt}
                $isActive={value === actualVal}
                onClick={() => {
                  onChange(actualVal);
                  setIsOpen(false);
                }}
              >
                {opt}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
}

// Detail Modal Overlay
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

const ModalContent = styled.div`
  background: var(--surface);
  width: 100%;
  max-width: 800px;
  max-height: 85vh;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--surface);
  z-index: 10;
  padding: 0 1rem;

  @media (max-width: 640px) {
    padding: 0 0.5rem;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ModalTab = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  padding: 1.25rem 1.5rem;
  font-weight: 600;
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};
  border-bottom: 2px solid
    ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    color: var(--primary);
  }

  @media (max-width: 640px) {
    padding: 1rem 0.6rem;
    font-size: 0.85rem;
  }
`;

const CloseModalBtn = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 1rem;
  flex-shrink: 0;

  &:hover {
    color: var(--foreground);
  }

  @media (max-width: 640px) {
    position: sticky;
    right: 0;
    background: var(--surface);
    padding: 1rem 0.5rem;
    box-shadow: -10px 0 15px -10px var(--surface);
  }
`;

const ModalBody = styled.div`
  /* replaced by ModalLayout */
`;

const ModalLayout = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 800px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0;
  padding-bottom: 2rem;
`;

const SidePanelWrapper = styled.div`
  width: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 2rem;

  @media (max-width: 800px) {
    width: 100%;
    padding-bottom: 1.5rem;
  }
`;

const PanelCard = styled.div`
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
`;

const PanelHeader = styled.div`
  padding: 1rem 1.25rem;
  font-weight: 700;
  color: var(--foreground);
  border-bottom: 1px solid var(--border);
  background: rgba(120, 120, 120, 0.05);
`;

const EduNote = styled.div`
  display: flex;
  gap: 0.5rem;
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.15);
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--text-secondary);
  align-items: flex-start;
  margin-top: 0.5rem;
`;

const PanelBody = styled.div`
  padding: 1.25rem;
`;

const PartOfSpeechTag = styled.div`
  background: #fef08a; /* Yellow/Orange tint */
  color: #a16207;
  display: inline-flex;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  margin: 1.5rem 0;
  border: 1px solid #fde047;
`;

const ExampleBlock = styled.div`
  margin-top: 1.5rem;

  .title {
    color: var(--primary);
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.05rem;
  }

  .japanese {
    font-size: 1.15rem;
    font-weight: 500;
    color: var(--foreground);
    margin-bottom: 0.4rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    line-height: 1.5;
  }

  .translation {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const KanjiStrokeBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 220px;
  margin: 1.5rem auto;
  background: #ffffff; /* Use white to contrast the black SVGs */
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;

  /* Dashed crosshairs */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    border-left: 2px dashed rgba(0, 0, 0, 0.15);
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    border-top: 2px dashed rgba(0, 0, 0, 0.15);
  }
`;

const ThumbnailPlaceholder = styled.div`
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(79, 70, 229, 0.15) 100%);
  border-radius: 8px;
  border: 1px solid rgba(79, 70, 229, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
`;

interface KanjiStrokeDiagramProps {
  kanji: string;
}

function KanjiStrokeDiagram({ kanji }: KanjiStrokeDiagramProps) {
  const [paths, setPaths] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const cleanKanji = kanji ? kanji.trim() : "";
    if (!cleanKanji) return;
    let active = true;

    const loadPaths = async () => {
      setLoading(true);
      try {
        const hex = cleanKanji.charCodeAt(0).toString(16).padStart(5, "0");
        
        // 1. Try direct browser CDN fetch first (works if browser has internet but server does not)
        try {
          const cdnRes = await fetch(`https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${hex}.svg`);
          if (cdnRes.ok && active) {
            const text = await cdnRes.text();
            const matches = [...text.matchAll(/<path[^>]*\bd="([^"]+)"/g)];
            const extractedPaths = matches.map((m) => m[1]);
            if (extractedPaths.length > 0) {
              setPaths(extractedPaths);
              setLoading(false);
              return;
            }
          }
        } catch (cdnErr) {
          console.warn("Direct JSDelivr fetch failed, trying local proxy:", cdnErr);
        }

        // 2. Fallback to local server proxy API route
        if (active) {
          const res = await fetch(`/api/kanji-svg?hex=${hex}`);
          if (res.ok) {
            const data = await res.json();
            if (active) setPaths(data);
          }
        }
      } catch (err) {
        console.error("Failed to load kanji SVG paths:", err);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadPaths();
    return () => {
      active = false;
    };
  }, [kanji]);

  if (loading) {
    return (
      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
        Loading...
      </div>
    );
  }

  // Fallback: If both fail, render a bold, highly visible character so the user still has a clear guideline!
  if (paths.length === 0) {
    const cleanKanji = kanji ? kanji.trim() : "";
    return (
      <div style={{ fontSize: "3.5rem", fontWeight: 700, color: "#111827", opacity: 0.9, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
        {cleanKanji}
      </div>
    );
  }

  const cleanKanji = kanji ? kanji.trim() : "";

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg
        viewBox="0 0 109 109"
        style={{
          width: "85%",
          height: "85%",
          pointerEvents: "none",
          position: "relative",
          zIndex: 2,
        }}
      >
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#111827"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
}

interface ExternalSentence {
  japanese: string;
  english: string;
  romaji?: string;
  indonesian?: string;
}

interface JpjpDefinition {
  meanings: string[];
  partOfSpeech?: string;
  reading?: string;
  examples?: {
    japanese: string;
    romaji?: string;
    indonesian?: string;
    english?: string;
  }[];
}

function FlashcardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = searchParams.get("q") || "";
  const activeCategory = (searchParams.get("category") || "vocabulary") as
    | "vocabulary"
    | "grammar"
    | "kanji"
    | "sentences"
    | "jpjp"
    | "ai"
    | "all"
    | "kana";
  const activeLevel = searchParams.get("level") || "All";
  const activeStatus = searchParams.get("status") || "All";

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const [touchDeltaY, setTouchDeltaY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<
    Record<string, "remembered" | "not-remembered">
  >(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jlpt-flashcards-status");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return {};
  });
  const [activeTab, setActiveTab] = useState<
    "vocabulary" | "kanji" | "sentences" | "grammar" | "jpjp"
  >("vocabulary");
  const [activeSelectedKanjiIndex, setActiveSelectedKanjiIndex] = useState(0);
  const [externalSentences, setExternalSentences] = useState<
    ExternalSentence[]
  >([]);
  const [isFetchingSentences, setIsFetchingSentences] = useState(false);
  const [activeGrammarLevel, setActiveGrammarLevel] = useState("All");
  const [copiedKanji, setCopiedKanji] = useState<string | null>(null);
  const [jpjpData, setJpjpData] = useState<JpjpDefinition[]>([]);
  const [isFetchingJpjp, setIsFetchingJpjp] = useState(false);

  // Prevent body scrolling when modal is open & handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowDetailModal(false);
        setTimeout(() => {
          setActiveTab("vocabulary");
          setActiveSelectedKanjiIndex(0);
          setActiveGrammarLevel("All");
        }, 200);
      }
    };

    if (showDetailModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDetailModal]);

  const getItemKey = (
    item: Partial<DictionaryResult> | null | undefined,
  ): string => {
    if (!item) return "";
    return (
      item.id ||
      `${item.source || ""}-${item.type || ""}-${item.level || ""}-${item.word || item.kanji || item.title || ""}`
    );
  };

  const saveStatus = (id: string, status: "remembered" | "not-remembered") => {
    const newStatus = { ...reviewStatus, [id]: status };
    setReviewStatus(newStatus);
    localStorage.setItem("jlpt-flashcards-status", JSON.stringify(newStatus));
  };

  const playAudio = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    e.stopPropagation();
    playJapaneseAudio(text);
  };

  const handleNext = () => {
    if (!filteredData || currentIndex >= filteredData.length - 1) return;
    setIsFlipped(false);
    setActiveSelectedKanjiIndex(0);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex <= 0) return;
    setIsFlipped(false);
    setActiveSelectedKanjiIndex(0);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleLevelChange = (level: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (level === "All") {
      params.delete("level");
    } else {
      params.set("level", level);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const [searchResults, setSearchResults] = useState<DictionaryResult[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const browseData = useMemo(() => {
    if (activeCategory === "kanji") return allKanji;
    if (activeCategory === "grammar") return allGrammar;
    return allVocabulary
      .filter((v) => v.id.startsWith("lib-"))
      .map((v) => ({
        ...v,
        type: "vocabulary" as const,
        source: "kamus" as const,
      }));
  }, [activeCategory]);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      if (q) {
        const results = await searchDictionary(q, activeCategory);
        if (isMounted) setSearchResults(results);
      } else {
        if (isMounted) setSearchResults(null);
      }
      if (isMounted) setIsLoading(false);
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [q, activeCategory]);

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const filteredData = useMemo(() => {
    return (searchResults || browseData).filter((item: DictionaryResult) => {
      if (activeLevel !== "All" && item.level !== activeLevel) return false;

      const key = getItemKey(item);
      const itemStatus = reviewStatus[key];
      if (activeStatus === "remembered" && itemStatus !== "remembered")
        return false;
      if (activeStatus === "not-remembered" && itemStatus !== "not-remembered")
        return false;

      return true;
    });
  }, [searchResults, browseData, activeLevel, activeStatus, reviewStatus]);

  const currentItem =
    filteredData && filteredData.length > 0
      ? (filteredData[currentIndex] as DictionaryResult)
      : null;

  const resolveTargetWord = () =>
    currentItem?.word || currentItem?.kanji || currentItem?.title || "?";
  const targetWordForDetails = resolveTargetWord();
  const kanaArr = [
    currentItem?.reading,
    ...(currentItem?.onyomi || []),
    ...(currentItem?.kunyomi || []),
  ].filter(Boolean);
  const targetKana = Array.from(new Set(kanaArr));
  const romaji = currentItem?.romaji;
  const meaning =
    currentItem?.meaning ||
    currentItem?.indonesian ||
    currentItem?.english ||
    "No definition";

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
    setTouchDeltaX(0);
    setTouchDeltaY(0);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    
    if (Math.abs(dx) > Math.abs(dy)) {
      if (e.cancelable) e.preventDefault();
    }
    
    setTouchDeltaX(dx);
    setTouchDeltaY(dy);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || !currentItem) return;
    const threshold = 120;
    if (touchDeltaX > threshold) {
      saveStatus(getItemKey(currentItem), "remembered");
      setTimeout(() => handleNext(), 150);
    } else if (touchDeltaX < -threshold) {
      saveStatus(getItemKey(currentItem), "not-remembered");
      if (!isFlipped) setIsFlipped(true);
    }
    
    setTouchStartX(null);
    setTouchStartY(null);
    setTouchDeltaX(0);
    setTouchDeltaY(0);
    setIsDragging(false);
  };

  // Dynamic Kanji & Related Words (must be called before early returns to preserve Hook order)
  const kanjisInWord = useMemo(() => {
    if (!targetWordForDetails || targetWordForDetails === "?") return [];
    return String(targetWordForDetails)
      .split("")
      .filter((char: string) =>
        /[\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ff\u3005]/.test(char)
      );
  }, [targetWordForDetails]);

  const relatedKanjis = useMemo(() => {
    if (kanjisInWord.length === 0) return [];
    return kanjisInWord.map((char, idx) => {
      const existing = allKanji.find((k) => k.kanji === char);
      if (existing) {
        // If the vocabulary word is a single character (e.g. "戸"), align its kanji level
        // with the vocabulary word's level to prevent student confusion.
        const shouldOverrideLevel = targetWordForDetails && targetWordForDetails.length === 1;
        const levelOverride = shouldOverrideLevel && currentItem?.level 
          ? (currentItem.level.includes("JLPT") ? currentItem.level.replace("JLPT ", "") : currentItem.level)
          : undefined;

        return {
          ...existing,
          id: `${existing.id}-${idx}`,
          level: levelOverride ? `N${levelOverride.replace("N", "")}` : existing.level,
        };
      }

      const isHiragana = char >= "\u3040" && char <= "\u309f";
      const isKatakana = char >= "\u30a0" && char <= "\u30ff";
      const isIteration = char === "\u3005";

      return {
        id: `char-${char}-${idx}`,
        type: "kanji" as const,
        kanji: char,
        level: isHiragana
          ? "Hiragana"
          : isKatakana
          ? "Katakana"
          : isIteration
          ? "Symbol"
          : "Character",
        meaning: isHiragana
          ? "Hiragana character"
          : isKatakana
          ? "Katakana character"
          : isIteration
          ? "Iteration mark"
          : "Japanese character",
        onyomi: [],
        kunyomi: [],
        stroke_count: undefined,
        source: "local" as const,
      };
    });
  }, [kanjisInWord, targetWordForDetails, currentItem]);

  const relatedWords = useMemo(() => {
    if (!targetWordForDetails || targetWordForDetails === "?") return [];
    return allVocabulary
      .filter(
        (v) =>
          v.word &&
          v.word.includes(targetWordForDetails) &&
          v.word !== targetWordForDetails,
      )
      .slice(0, 5);
  }, [targetWordForDetails]);

  const synonyms = useMemo(() => {
    if (!meaning || meaning === "No definition") return [];
    const meaningTokens = meaning
      .toLowerCase()
      .split(/[;,/\u3002]/)
      .map((t: string) => t.trim())
      .filter((t: string) => t.length > 3);
    if (meaningTokens.length === 0) return [];
    return allVocabulary
      .filter((v) => {
        if (v.word === targetWordForDetails) return false;
        const vMeaning = (v.meaning || "").toLowerCase();
        return meaningTokens.some((token: string) => vMeaning.includes(token));
      })
      .slice(0, 6);
  }, [meaning, targetWordForDetails]);

  const usageInPractice = useMemo(() => {
    if (!targetWordForDetails || targetWordForDetails === "?") return [];
    const sentences = new Set<string>();
    const results: {
      japanese: string;
      english?: string;
      romaji?: string;
      indonesian?: string;
    }[] = [];

    const extractFrom = (dictionaryList: DictionaryResult[]) => {
      for (const item of dictionaryList) {
        if (item.examples && Array.isArray(item.examples)) {
          for (const ex of item.examples) {
            if (ex.japanese && ex.japanese.includes(targetWordForDetails)) {
              const strJa = String(ex.japanese);
              if (!sentences.has(strJa)) {
                sentences.add(strJa);
                results.push(ex);
              }
            }
          }
        }
      }
    };

    extractFrom(allVocabulary);
    extractFrom(allGrammar);

    return results
      .filter((ex) => {
        if (!currentItem?.examples) return true;
        return !currentItem.examples.some(
          (cx: { japanese: string; english?: string; romaji?: string }) =>
            cx.japanese === ex.japanese,
        );
      })
      .slice(0, 50);
  }, [targetWordForDetails, currentItem]);

  const relatedGrammar = useMemo(() => {
    if (!targetWordForDetails || targetWordForDetails === "?") return [];

    let baseList: DictionaryResult[] = [];
    if (currentItem?.type === "grammar") {
      baseList = [currentItem];
    } else {
      baseList = allGrammar.filter((g) => {
        const matchTitle = g.title && g.title.includes(targetWordForDetails);
        const matchExamples =
          g.examples &&
          g.examples.some(
            (ex: { japanese: string; english?: string; romaji?: string }) =>
              ex.japanese && ex.japanese.includes(targetWordForDetails),
          );
        return matchTitle || matchExamples;
      });
    }

    if (activeGrammarLevel !== "All") {
      return baseList.filter((g) => {
        const lvl = g.level?.replace("JLPT ", "") || "";
        return lvl === activeGrammarLevel;
      });
    }
    return baseList;
  }, [targetWordForDetails, currentItem, activeGrammarLevel]);

  const kanjiRelatedWords = useMemo(() => {
    if (activeTab !== "kanji" || relatedKanjis.length === 0) return [];
    const kanjiObj = relatedKanjis[activeSelectedKanjiIndex];
    if (!kanjiObj) return [];
    const targetKanji = kanjiObj.kanji;
    if (!targetKanji) return [];
    return allVocabulary
      .filter(
        (v) =>
          v.word &&
          v.word.includes(targetKanji) &&
          v.word !== targetWordForDetails,
      )
      .slice(0, 15);
  }, [
    activeTab,
    relatedKanjis,
    activeSelectedKanjiIndex,
    targetWordForDetails,
  ]);

  const categorizedWords = useMemo(() => {
    const kWords: DictionaryResult[] = [];
    const oWords: DictionaryResult[] = [];
    if (!relatedKanjis[activeSelectedKanjiIndex]) return { kWords, oWords };
    const kanjiObj = relatedKanjis[activeSelectedKanjiIndex];
    const kunyomis = kanjiObj.kunyomi
      ? kanjiObj.kunyomi.map((r) => r.replace(/[-]/g, ""))
      : [];
    const onyomis = kanjiObj.onyomi
      ? kanjiObj.onyomi.map((r) => r.replace(/[-]/g, ""))
      : [];

    kanjiRelatedWords.forEach((w) => {
      const reading = w.reading || w.romaji || "";
      let matchedKun = false;
      for (const kr of kunyomis) {
        if (kr && reading.includes(kr)) {
          matchedKun = true;
          break;
        }
      }
      if (matchedKun) kWords.push(w);
      else {
        let matchedOn = false;
        for (const or_katakana of onyomis) {
          if (!or_katakana) continue;
          const hiraganaOr = [...or_katakana]
            .map((ch) =>
              ch.charCodeAt(0) >= 0x30a1 && ch.charCodeAt(0) <= 0x30f6
                ? String.fromCharCode(ch.charCodeAt(0) - 0x0060)
                : ch,
            )
            .join("");
          if (reading.includes(hiraganaOr)) {
            matchedOn = true;
            break;
          }
        }
        if (matchedOn) oWords.push(w);
        else {
          kWords.push(w);
        }
      }
    });

    return { kWords, oWords };
  }, [kanjiRelatedWords, relatedKanjis, activeSelectedKanjiIndex]);

  const kanjiExamples = useMemo(() => {
    if (activeTab !== "kanji") return [];
    const kanjiObj = relatedKanjis[activeSelectedKanjiIndex];
    if (!kanjiObj) return [];
    const targetKanji = kanjiObj.kanji;
    if (!targetKanji) return [];
    const allExamples = [...(currentItem?.examples || []), ...usageInPractice];
    const unique: { japanese: string; english?: string; romaji?: string }[] =
      [];
    const seen = new Set();
    allExamples.forEach((ex) => {
      if (
        ex.japanese &&
        ex.japanese.includes(targetKanji) &&
        !seen.has(ex.japanese)
      ) {
        seen.add(ex.japanese);
        unique.push(ex);
      }
    });
    return unique.slice(0, 10);
  }, [
    activeTab,
    relatedKanjis,
    activeSelectedKanjiIndex,
    currentItem,
    usageInPractice,
  ]);

  useEffect(() => {
    let isMounted = true;
    if (
      activeTab === "sentences" &&
      targetWordForDetails &&
      targetWordForDetails !== "?"
    ) {
      const allCombinedExamples = [
        ...(currentItem?.examples || []),
        ...usageInPractice,
      ];
      if (allCombinedExamples.length < 5) {
        Promise.resolve().then(() => {
          if (isMounted) setIsFetchingSentences(true);
        });
        fetch(
          `/api/proxy/sentences?keyword=${encodeURIComponent(targetWordForDetails)}`,
        )
          .then((res) => res.json())
          .then((data) => {
            if (isMounted && data && data.data) {
              const existing = new Set(
                allCombinedExamples.map((e) => e.japanese),
              );
              const newSentences = data.data.filter(
                (s: { japanese: string; english: string; romaji?: string }) =>
                  !existing.has(s.japanese),
              );
              setExternalSentences(newSentences);
            }
          })
          .catch((err) =>
            console.error("Failed to fetch external sentences", err),
          )
          .finally(() => {
            if (isMounted) setIsFetchingSentences(false);
          });
      } else {
        Promise.resolve().then(() => {
          if (isMounted) setExternalSentences([]);
        });
      }
    } else {
      Promise.resolve().then(() => {
        if (isMounted) setExternalSentences([]);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [activeTab, targetWordForDetails, currentItem, usageInPractice]);

  // Fetch Japanese-Japanese definitions
  useEffect(() => {
    let isMounted = true;
    if (
      activeTab === "jpjp" &&
      targetWordForDetails &&
      targetWordForDetails !== "?"
    ) {
      Promise.resolve().then(() => {
        if (isMounted) setIsFetchingJpjp(true);
      });
      fetch(
        `/api/proxy/jpjp?keyword=${encodeURIComponent(targetWordForDetails)}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (isMounted && data && data.data) {
            setJpjpData(data.data);
          }
        })
        .catch((err) => console.error("Failed to fetch JP-JP definitions", err))
        .finally(() => {
          if (isMounted) setIsFetchingJpjp(false);
        });
    } else {
      Promise.resolve().then(() => {
        if (isMounted) setJpjpData([]);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [activeTab, targetWordForDetails]);

  if (isLoading) {
    return (
      <PageWrapper>
        <BreadcrumbWrapper>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "JLPT Mastery", href: "/jlpt" },
            ]}
            current="Flashcards"
          />
        </BreadcrumbWrapper>
        <Container>
          <Header>
            <HeaderRight>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                JLPT Flashcards
              </div>
              <div
                style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
              >
                Level {activeLevel !== "All" ? activeLevel : "All"} •{" "}
                {activeCategory.replace("-", " ").toUpperCase()}
              </div>
            </HeaderRight>
          </Header>
          <div
            style={{
              textAlign: "center",
              marginTop: "4rem",
              color: "var(--text-secondary)",
            }}
          >
            Loading flashcards...
          </div>
        </Container>
      </PageWrapper>
    );
  }

  if (!filteredData || filteredData.length === 0) {
    return (
      <PageWrapper>
        <BreadcrumbWrapper>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "JLPT Mastery", href: "/jlpt" },
            ]}
            current="Flashcards"
          />
        </BreadcrumbWrapper>
        <Container>
          <Header>
            <HeaderRight>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                JLPT Flashcards
              </div>
              <div
                style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
              >
                Level {activeLevel !== "All" ? activeLevel : "All"} •{" "}
                {activeCategory.replace("-", " ").toUpperCase()}
              </div>
            </HeaderRight>
          </Header>

          <FilterRow>
            <FilterTitle>{activeCategory.replace("-", " ")}</FilterTitle>
            <FilterSelectors>
              <FilterDropdown
                value={
                  activeStatus === "remembered"
                    ? "Remembered"
                    : activeStatus === "not-remembered"
                      ? "Forgot"
                      : "All"
                }
                onChange={(val) => {
                  const params = new URLSearchParams(searchParams.toString());
                  const mapped =
                    val === "Remembered"
                      ? "remembered"
                      : val === "Forgot"
                        ? "not-remembered"
                        : "All";
                  if (mapped === "All") params.delete("status");
                  else params.set("status", mapped);
                  router.replace(`${pathname}?${params.toString()}`, {
                    scroll: false,
                  });
                }}
                options={["All", "Remembered", "Forgot"]}
              />
              <FilterDropdown
                value={activeLevel === "All" ? "All" : activeLevel}
                onChange={handleLevelChange}
                options={["All", "N5", "N4", "N3", "N2", "N1"]}
              />
            </FilterSelectors>
          </FilterRow>

          <CardArea>
            <FlashcardContainer>
              <FlashcardSide
                style={{ position: "relative", justifyContent: "center" }}
              >
                <div style={{ margin: "auto", textAlign: "center" }}>
                  <h2
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: "0",
                    }}
                  >
                    No data available.
                  </h2>
                  <Link
                    href="/jlpt"
                    style={{
                      marginTop: "1rem",
                      color: "var(--primary)",
                      display: "inline-block",
                    }}
                  >
                    Back to JLPT
                  </Link>
                </div>
              </FlashcardSide>
            </FlashcardContainer>
          </CardArea>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <BreadcrumbWrapper>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "JLPT Mastery", href: "/jlpt" },
          ]}
          current="Flashcards"
        />
      </BreadcrumbWrapper>
      <Container>
        <Header>
          <HeaderRight>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "var(--primary)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              JLPT Flashcards
            </div>
            <div
              style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
            >
              Level {activeLevel !== "All" ? activeLevel : "All"} •{" "}
              {activeCategory.replace("-", " ").toUpperCase()}
            </div>
          </HeaderRight>
        </Header>

        <FilterRow>
          <FilterTitle>{activeCategory.replace("-", " ")}</FilterTitle>
          <FilterSelectors>
            <FilterDropdown
              value={
                activeStatus === "remembered"
                  ? "Remembered"
                  : activeStatus === "not-remembered"
                    ? "Forgot"
                    : "All"
              }
              onChange={(val) => {
                const params = new URLSearchParams(searchParams.toString());
                const mapped =
                  val === "Remembered"
                    ? "remembered"
                    : val === "Forgot"
                      ? "not-remembered"
                      : "All";
                if (mapped === "All") params.delete("status");
                else params.set("status", mapped);
                router.replace(`${pathname}?${params.toString()}`, {
                  scroll: false,
                });
              }}
              options={["All", "Remembered", "Forgot"]}
            />
            <FilterDropdown
              value={activeLevel === "All" ? "All" : activeLevel}
              onChange={handleLevelChange}
              options={["All", "N5", "N4", "N3", "N2", "N1"]}
            />
          </FilterSelectors>
        </FilterRow>

        <CardArea>
          <NavArrow onClick={handlePrev} disabled={currentIndex === 0}>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </NavArrow>

          <FlashcardContainer
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <SwipeContainer
              style={
                isDragging
                  ? {
                      transform: `translate3d(${touchDeltaX}px, ${touchDeltaY * 0.2}px, 0) rotate(${touchDeltaX * 0.05}deg)`,
                      transition: "none",
                    }
                  : {
                      transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }
              }
            >
              {touchDeltaX > 20 && (
                <SwipeBadge
                  $type="remembered"
                  $opacity={Math.min(Math.abs(touchDeltaX) / 100, 1)}
                >
                  Remembered
                </SwipeBadge>
              )}
              {touchDeltaX < -20 && (
                <SwipeBadge
                  $type="forgot"
                  $opacity={Math.min(Math.abs(touchDeltaX) / 100, 1)}
                >
                  Forgot
                </SwipeBadge>
              )}

              <FlashcardInner $isFlipped={isFlipped}>
                {/* --- FRONT SIDE --- */}
                <FlashcardSide
                  onClick={(e) => {
                    if (
                      e.target instanceof HTMLElement &&
                      (e.target.closest("button") ||
                        e.target.closest("a") ||
                        e.target.closest(".no-flip"))
                    ) {
                      return;
                    }
                    setIsFlipped(!isFlipped);
                  }}
                >
                  {reviewStatus[getItemKey(currentItem)] && (
                    <StatusIndicator
                      $status={reviewStatus[getItemKey(currentItem)]}
                    />
                  )}

                  <SpeakerIcon onClick={(e) => playAudio(e, resolveTargetWord())}>
                    <svg
                      width="32"
                      height="32"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  </SpeakerIcon>

                  <MainWord>{resolveTargetWord()}</MainWord>

                  <Readings>
                    {targetKana.length > 0
                      ? `「 ${targetKana.map((k) => `${k} (${toRomaji(k)})`).join(" 」 「 ")} 」`
                      : ""}
                  </Readings>

                  {romaji && (
                    <div
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "1.1rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {romaji}
                    </div>
                  )}

                  <DetailsBtn
                    className="no-flip"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDetailModal(true);
                    }}
                  >
                    View details
                  </DetailsBtn>

                  <BottomLeftText>
                    {currentIndex + 1} / {filteredData.length}
                  </BottomLeftText>

                  <FlipBtn
                    className="no-flip"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(true);
                    }}
                  >
                    Flip
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                  </FlipBtn>
                </FlashcardSide>

                {/* --- BACK SIDE --- */}
                <FlashcardBack
                  onClick={(e) => {
                    if (
                      e.target instanceof HTMLElement &&
                      (e.target.closest("button") ||
                        e.target.closest("a") ||
                        e.target.closest(".no-flip"))
                    ) {
                      return;
                    }
                    setIsFlipped(!isFlipped);
                  }}
                >
                  {reviewStatus[getItemKey(currentItem)] && (
                    <StatusIndicator
                      $status={reviewStatus[getItemKey(currentItem)]}
                    />
                  )}

                  <SpeakerIcon onClick={(e) => playAudio(e, resolveTargetWord())}>
                    <svg
                      width="32"
                      height="32"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  </SpeakerIcon>

                  <BackMeaning $textLength={meaning.length}>{meaning}</BackMeaning>

                  <BottomLeftText>
                    {currentIndex + 1} / {filteredData.length}
                  </BottomLeftText>

                  <FlipBtn
                    className="no-flip"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(false);
                    }}
                  >
                    Back
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                  </FlipBtn>
                </FlashcardBack>
              </FlashcardInner>
            </SwipeContainer>
          </FlashcardContainer>

          <NavArrow
            onClick={handleNext}
            disabled={currentIndex === filteredData.length - 1}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </NavArrow>
        </CardArea>

        <BottomActions>
          <ActionCircle
            $color="var(--text-secondary)"
            $variant="secondary"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            title="Previous Card"
            className="no-flip"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </ActionCircle>

          <ActionCircle
            $color="#22c55e"
            $variant="remembered"
            onClick={() => {
              saveStatus(getItemKey(currentItem), "remembered");
              setTimeout(() => handleNext(), 150);
            }}
          >
            <div className="icon-wrapper">
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            Remembered
          </ActionCircle>

          <ActionCircle
            $color="#ef4444"
            $variant="forgot"
            onClick={() => {
              saveStatus(getItemKey(currentItem), "not-remembered");
              if (!isFlipped) setIsFlipped(true);
            }}
          >
            <div className="icon-wrapper">
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
            Forgot
          </ActionCircle>
        </BottomActions>
      </Container>

      {/* --- Detail Modal --- */}
      {showDetailModal && (
        <ModalOverlay
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDetailModal(false);
              setTimeout(() => {
                setActiveTab("vocabulary");
                setActiveSelectedKanjiIndex(0);
                setActiveGrammarLevel("All");
              }, 200);
            }
          }}
        >
          <ModalContent>
            <ModalHeader>
              <ModalTab
                $active={activeTab === "vocabulary"}
                onClick={() => setActiveTab("vocabulary")}
              >
                Words
              </ModalTab>
              <ModalTab
                $active={activeTab === "kanji"}
                onClick={() => setActiveTab("kanji")}
              >
                Kanji
              </ModalTab>
              <ModalTab
                $active={activeTab === "sentences"}
                onClick={() => setActiveTab("sentences")}
              >
                Sentences
              </ModalTab>
              <ModalTab
                $active={activeTab === "grammar"}
                onClick={() => setActiveTab("grammar")}
              >
                Grammar
              </ModalTab>
              <ModalTab
                $active={activeTab === "jpjp"}
                onClick={() => setActiveTab("jpjp")}
              >
                Japanese - Japanese
              </ModalTab>
              <CloseModalBtn
                onClick={() => {
                  setShowDetailModal(false);
                  setTimeout(() => {
                    setActiveTab("vocabulary");
                    setActiveSelectedKanjiIndex(0);
                    setActiveGrammarLevel("All");
                  }, 200);
                }}
              >
                ✕
              </CloseModalBtn>
            </ModalHeader>
            <ModalLayout>
              <MainContent>
                {activeTab === "vocabulary" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "0.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <MainWord
                        style={{
                          fontSize: "3.5rem",
                          textAlign: "left",
                          color: "#3b82f6",
                          margin: 0,
                          fontWeight: 800,
                        }}
                      >
                        {resolveTargetWord()}
                      </MainWord>
                      <SpeakerIcon
                        style={{
                          margin: 0,
                          padding: 0,
                          width: 32,
                          height: 32,
                          opacity: 0.8,
                          cursor: "pointer",
                          color: "#3b82f6",
                        }}
                        onClick={(e) => playAudio(e, resolveTargetWord())}
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          style={{ width: "100%", height: "100%" }}
                        >
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                      </SpeakerIcon>
                    </div>

                    <Readings
                      style={{
                        justifyContent: "flex-start",
                        marginBottom: "0.75rem",
                        fontSize: "1.25rem",
                        color: "var(--foreground)",
                      }}
                    >
                      {targetKana.length > 0
                        ? `「 ${targetKana.map((k) => `${k} (${toRomaji(k)})`).join(" 」 「 ")} 」`
                        : ""}
                    </Readings>

                    {romaji && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "1.5rem",
                          color: "var(--foreground)",
                        }}
                      >
                        <SpeakerIcon
                          style={{
                            margin: 0,
                            opacity: 0.7,
                            cursor: "pointer",
                            padding: 0,
                            width: 24,
                            height: 24,
                          }}
                          onClick={(e) => playAudio(e, resolveTargetWord())}
                        >
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                          </svg>
                        </SpeakerIcon>
                        <span
                          style={{
                            fontSize: "1.15rem",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {romaji}
                        </span>
                      </div>
                    )}

                    <hr
                      style={{
                        border: "none",
                        borderTop: "1px solid var(--border)",
                        margin: "1.5rem 0",
                      }}
                    />

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginBottom: "1.5rem",
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}
                    >
                      Word Level:
                      <span
                        style={{
                          background: "#10b981",
                          color: "white",
                          padding: "0.2rem 0.6rem",
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                        }}
                      >
                        {currentItem?.level?.includes("JLPT")
                          ? currentItem.level
                          : `JLPT ${currentItem?.level || "N?"}`}
                      </span>
                    </div>

                    <hr
                      style={{
                        border: "none",
                        borderTop: "1px solid var(--border)",
                        margin: "1.5rem 0",
                      }}
                    />

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#ef4444",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
                      </svg>
                      {currentItem?.category === "vocabulary"
                        ? "Noun"
                        : currentItem?.category || "Vocabulary"}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <div
                        style={{
                          color: "#3b82f6",
                          fontSize: "1.5rem",
                          lineHeight: 1,
                        }}
                      >
                        •
                      </div>
                      <div
                        style={{
                          fontSize: "1.1rem",
                          color: "#3b82f6",
                          fontWeight: 600,
                          paddingTop: "0.1rem",
                        }}
                      >
                        {meaning}
                      </div>
                    </div>

                    {currentItem?.explanation && (
                      <div
                        style={{
                          paddingLeft: "2.25rem",
                          marginBottom: "1.5rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {currentItem.explanation}
                      </div>
                    )}

                    {currentItem?.examples &&
                      currentItem.examples.length > 0 &&
                      currentItem.examples.map(
                        (
                          ex: {
                            japanese: string;
                            romaji?: string;
                            indonesian?: string;
                            english?: string;
                          },
                          idx: number,
                        ) => (
                          <div
                            key={`ex-${idx}`}
                            style={{
                              paddingLeft: "2.25rem",
                              marginBottom: "2rem",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "1.15rem",
                                color: "var(--foreground)",
                                marginBottom: "0.3rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                flexWrap: "wrap",
                              }}
                            >
                              <span>{ex.japanese}</span>
                              <SpeakerIcon
                                style={{
                                  margin: 0,
                                  padding: 0,
                                  width: 22,
                                  height: 22,
                                  opacity: 0.5,
                                  cursor: "pointer",
                                }}
                                onClick={(e) => playAudio(e, ex.japanese)}
                              >
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M3 9v6h4l5 5V4L7 9H3z" />
                                </svg>
                              </SpeakerIcon>
                            </div>
                            {ex.romaji && (
                              <div
                                style={{
                                  color: "var(--text-secondary)",
                                  fontSize: "0.9rem",
                                  marginBottom: "0.4rem",
                                  fontFamily: "monospace",
                                }}
                              >
                                {ex.romaji}
                              </div>
                            )}
                            <div
                              style={{
                                color: "var(--foreground)",
                                fontSize: "1rem",
                              }}
                            >
                              {ex.indonesian || ex.english}
                            </div>
                          </div>
                        ),
                      )}

                    {synonyms.length > 0 && (
                      <div
                        style={{
                          marginTop: "2rem",
                          paddingTop: "1.5rem",
                          borderTop: "1px solid var(--border)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "1.2rem",
                            color: "var(--foreground)",
                            fontWeight: 600,
                            marginBottom: "1rem",
                          }}
                        >
                          Synonyms of{" "}
                          <span style={{ color: "#10b981" }}>
                            {resolveTargetWord()}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                            paddingLeft: "0.5rem",
                          }}
                        >
                          {synonyms.map((syn) => {
                            const synWord = syn.word;
                            if (!synWord) return null;
                            return (
                               <div
                                 key={`syn-${syn.id}`}
                                 style={{
                                   display: "flex",
                                   flexDirection: "column",
                                   gap: "0.35rem",
                                   padding: "0.6rem 0.8rem",
                                   background: "var(--surface)",
                                   border: "1px solid var(--border)",
                                   borderRadius: "8px",
                                   borderLeft: "3px solid #3b82f6",
                                 }}
                               >
                                 <div
                                   style={{
                                     display: "flex",
                                     alignItems: "center",
                                     gap: "0.5rem",
                                     flexWrap: "wrap",
                                   }}
                                 >
                                   <span
                                     style={{
                                       fontWeight: 700,
                                       color: "var(--foreground)",
                                       fontSize: "1.05rem",
                                     }}
                                   >
                                     {synWord}
                                   </span>
                                   <SpeakerIcon
                                     style={{
                                       margin: 0,
                                       padding: 0,
                                       width: 16,
                                       height: 16,
                                       opacity: 0.5,
                                       cursor: "pointer",
                                       color: "#3b82f6",
                                     }}
                                     onClick={(e) => playAudio(e, synWord)}
                                   >
                                     <svg
                                       fill="currentColor"
                                       viewBox="0 0 24 24"
                                       style={{ width: "100%", height: "100%" }}
                                     >
                                       <path d="M3 9v6h4l5 5V4L7 9H3z" />
                                     </svg>
                                   </SpeakerIcon>
                                   {syn.reading && (
                                     <span
                                       style={{
                                         color: "var(--text-secondary)",
                                         fontSize: "0.8rem",
                                         fontFamily: "monospace",
                                         background: "rgba(0,0,0,0.03)",
                                         padding: "0.1rem 0.4rem",
                                         borderRadius: "4px",
                                         whiteSpace: "nowrap",
                                       }}
                                     >
                                       {syn.reading} ({toRomaji(syn.reading)})
                                     </span>
                                   )}
                                 </div>
                                 <div
                                   style={{
                                     color: "var(--text-secondary)",
                                     fontSize: "0.9rem",
                                     lineHeight: "1.4",
                                   }}
                                 >
                                   {syn.meaning.split(/[,;]/)[0]}
                                 </div>
                               </div>
                             );
                           })}
                        </div>
                      </div>
                    )}

                    {usageInPractice.length > 0 && (
                      <div
                        style={{
                          marginTop: "2.5rem",
                          paddingTop: "1.5rem",
                          borderTop: "1px solid var(--border)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "1.2rem",
                            color: "var(--foreground)",
                            fontWeight: 600,
                            marginBottom: "1.5rem",
                          }}
                        >
                          <span style={{ color: "var(--foreground)" }}>
                            {resolveTargetWord()}
                          </span>{" "}
                          used in practice
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem",
                          }}
                        >
                          {usageInPractice.map((u, idx) => (
                            <div
                              key={`prac-${idx}`}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "1rem",
                                background: "rgba(0,0,0,0.02)",
                                padding: "1rem",
                                borderRadius: "12px",
                              }}
                            >
                              <ThumbnailPlaceholder>
                                <span
                                  style={{
                                    fontSize: targetWordForDetails.length > 2 ? "1.25rem" : "2rem",
                                    fontWeight: "bold",
                                    color: "var(--primary)",
                                    fontFamily: '"Noto Sans JP", sans-serif',
                                  }}
                                >
                                  {targetWordForDetails}
                                </span>
                              </ThumbnailPlaceholder>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "0.3rem",
                                }}
                              >
                                {u.romaji && (
                                  <div
                                    style={{
                                      fontSize: "0.8rem",
                                      color: "var(--text-secondary)",
                                    }}
                                  >
                                    {u.romaji}
                                  </div>
                                )}
                                <div
                                  style={{
                                    fontSize: "1.1rem",
                                    color: "var(--foreground)",
                                    lineHeight: 1.4,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                  }}
                                >
                                  <span>{u.japanese}</span>
                                  <SpeakerIcon
                                    style={{
                                      margin: 0,
                                      padding: 0,
                                      width: 20,
                                      height: 20,
                                      opacity: 0.5,
                                      cursor: "pointer",
                                      color: "var(--primary)",
                                      flexShrink: 0,
                                    }}
                                    onClick={(e) => playAudio(e, u.japanese)}
                                  >
                                    <svg
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M3 9v6h4l5 5V4L7 9H3z" />
                                    </svg>
                                  </SpeakerIcon>
                                </div>
                                <div
                                  style={{
                                    fontSize: "0.9rem",
                                    color: "var(--text-secondary)",
                                    marginTop: "0.2rem",
                                  }}
                                >
                                  {u.indonesian || u.english}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeTab === "kanji" && (
                  <div>
                    {relatedKanjis.length === 0 ? (
                      <div
                        style={{
                          color: "var(--text-secondary)",
                          padding: "2rem",
                          textAlign: "center",
                          background: "rgba(0,0,0,0.02)",
                          borderRadius: "12px",
                        }}
                      >
                        No kanji data for this word.
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {/* Kanji Selector Tab Strip */}
                        {relatedKanjis.length > 1 && (
                          <div
                            style={{
                              display: "flex",
                              gap: "1.5rem",
                              borderBottom: "1px solid var(--border)",
                              marginBottom: "1.5rem",
                              justifyContent: "center",
                            }}
                          >
                            {relatedKanjis.map((k, index) => (
                              <button
                                key={`selector-${k.id}`}
                                onClick={() =>
                                  setActiveSelectedKanjiIndex(index)
                                }
                                style={{
                                  background: "none",
                                  border: "none",
                                  fontSize: "1.25rem",
                                  color:
                                    activeSelectedKanjiIndex === index
                                      ? "#3b82f6"
                                      : "var(--text-secondary)",
                                  padding: "0.5rem 1rem",
                                  borderBottom:
                                    activeSelectedKanjiIndex === index
                                      ? "2px solid #3b82f6"
                                      : "2px solid transparent",
                                  cursor: "pointer",
                                  fontWeight:
                                    activeSelectedKanjiIndex === index
                                      ? 700
                                      : 500,
                                }}
                              >
                                {k.kanji}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Active Kanji Display */}
                        {relatedKanjis[activeSelectedKanjiIndex] && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              padding: "0 1rem",
                            }}
                          >
                            {/* Top row: Kanji huge + Actions */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                marginBottom: "1.5rem",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "1.25rem",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: "4.5rem",
                                    color: "#3b82f6",
                                    lineHeight: 1,
                                    fontWeight: "normal",
                                    fontFamily: '"Noto Sans JP", sans-serif',
                                  }}
                                >
                                  {
                                    relatedKanjis[activeSelectedKanjiIndex]
                                      .kanji
                                  }
                                </div>
                                <SpeakerIcon
                                  style={{
                                    margin: 0,
                                    padding: 0,
                                    width: 28,
                                    height: 28,
                                    opacity: 0.8,
                                    cursor: "pointer",
                                    color: "#3b82f6",
                                  }}
                                  onClick={(e) =>
                                    playAudio(
                                      e,
                                      relatedKanjis[activeSelectedKanjiIndex]
                                        .kanji || "",
                                    )
                                  }
                                >
                                  <svg
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    style={{ width: "100%", height: "100%" }}
                                  >
                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                                  </svg>
                                </SpeakerIcon>
                              </div>
                              <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button
                                  onClick={() =>
                                    alert(
                                      "Kanji writing practice feature coming soon!",
                                    )
                                  }
                                  title="Writing Practice (Coming Soon)"
                                  style={{
                                    background: "var(--surface)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "8px",
                                    padding: "0.4rem",
                                    color: "var(--text-secondary)",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                  }}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.style.color = "#3b82f6")
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.style.color =
                                      "var(--text-secondary)")
                                  }
                                >
                                  <svg
                                    width="20"
                                    height="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                  </svg>
                                </button>
                                <button
                                  onClick={() => {
                                    const k =
                                      relatedKanjis[activeSelectedKanjiIndex]
                                        .kanji || "";
                                    if (k) {
                                      navigator.clipboard.writeText(k);
                                      setCopiedKanji(k);
                                      setTimeout(
                                        () => setCopiedKanji(null),
                                        2000,
                                      );
                                    }
                                  }}
                                  title="Copy Kanji"
                                  style={{
                                    background: "var(--surface)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "8px",
                                    padding: "0.4rem",
                                    color:
                                      copiedKanji ===
                                      relatedKanjis[activeSelectedKanjiIndex]
                                        .kanji
                                        ? "#10b981"
                                        : "var(--text-secondary)",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                  }}
                                  onMouseOver={(e) => {
                                    if (
                                      copiedKanji !==
                                      relatedKanjis[activeSelectedKanjiIndex]
                                        .kanji
                                    )
                                      e.currentTarget.style.color = "#3b82f6";
                                  }}
                                  onMouseOut={(e) => {
                                    if (
                                      copiedKanji !==
                                      relatedKanjis[activeSelectedKanjiIndex]
                                        .kanji
                                    )
                                      e.currentTarget.style.color =
                                        "var(--text-secondary)";
                                  }}
                                >
                                  {copiedKanji ===
                                  relatedKanjis[activeSelectedKanjiIndex]
                                    .kanji ? (
                                    <svg
                                      width="20"
                                      height="20"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      ></path>
                                    </svg>
                                  ) : (
                                    <svg
                                      width="20"
                                      height="20"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      viewBox="0 0 24 24"
                                    >
                                      <rect
                                        x="9"
                                        y="9"
                                        width="13"
                                        height="13"
                                        rx="2"
                                        ry="2"
                                      ></rect>
                                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                                    </svg>
                                  )}
                                </button>
                                {(() => {
                                  const activeK =
                                    relatedKanjis[activeSelectedKanjiIndex];
                                  const activeKItem = {
                                    ...activeK,
                                    type: "kanji" as const,
                                    source: "kamus" as const,
                                  };
                                  const kKey = getItemKey(activeKItem);
                                  const isRemembered =
                                    reviewStatus[kKey] === "remembered";

                                  return (
                                    <button
                                      onClick={() => {
                                        if (isRemembered) {
                                          saveStatus(kKey, "not-remembered");
                                        } else {
                                          saveStatus(kKey, "remembered");
                                        }
                                      }}
                                      title={
                                        isRemembered
                                          ? "Remove from remembered"
                                          : "Mark as remembered"
                                      }
                                      style={{
                                        background: isRemembered
                                          ? "#10b981"
                                          : "var(--surface)",
                                        border: isRemembered
                                          ? "1px solid #10b981"
                                          : "1px solid var(--border)",
                                        borderRadius: "8px",
                                        padding: "0.4rem",
                                        color: isRemembered
                                          ? "white"
                                          : "var(--text-secondary)",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                      }}
                                      onMouseOver={(e) => {
                                        if (!isRemembered)
                                          e.currentTarget.style.color =
                                            "#3b82f6";
                                      }}
                                      onMouseOut={(e) => {
                                        if (!isRemembered)
                                          e.currentTarget.style.color =
                                            "var(--text-secondary)";
                                      }}
                                    >
                                      {isRemembered ? (
                                        <svg
                                          width="20"
                                          height="20"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                          ></path>
                                        </svg>
                                      ) : (
                                        <svg
                                          width="20"
                                          height="20"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M12 5v14m-7-7h14"></path>
                                        </svg>
                                      )}
                                    </button>
                                  );
                                })()}
                              </div>
                            </div>

                            {/* Metadata Pills */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                marginBottom: "1.5rem",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  style={{
                                    background: "rgba(0,0,0,0.05)",
                                    color: "var(--text-secondary)",
                                    padding: "0.2rem 0.6rem",
                                    borderRadius: "4px",
                                    fontSize: "0.85rem",
                                    width: "90px",
                                  }}
                                >
                                  Strokes
                                </span>
                                <span
                                  style={{
                                    marginLeft: "1rem",
                                    color: "var(--foreground)",
                                    fontWeight: 500,
                                  }}
                                >
                                  {relatedKanjis[activeSelectedKanjiIndex]
                                    .stroke_count || "-"}
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  style={{
                                    background: "rgba(0,0,0,0.05)",
                                    color: "var(--text-secondary)",
                                    padding: "0.2rem 0.6rem",
                                    borderRadius: "4px",
                                    fontSize: "0.85rem",
                                    width: "90px",
                                  }}
                                >
                                  {["Hiragana", "Katakana", "Symbol", "Character"].includes(
                                    relatedKanjis[activeSelectedKanjiIndex].level || ""
                                  )
                                    ? "Type"
                                    : "Kanji Level"}
                                </span>
                                <span
                                  style={{
                                    marginLeft: "1rem",
                                    color: "var(--foreground)",
                                    fontWeight: 500,
                                  }}
                                >
                                  {relatedKanjis[activeSelectedKanjiIndex].level
                                    ? relatedKanjis[
                                        activeSelectedKanjiIndex
                                      ].level.replace("JLPT ", "")
                                    : "-"}
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  style={{
                                    background: "rgba(0,0,0,0.05)",
                                    color: "var(--text-secondary)",
                                    padding: "0.2rem 0.6rem",
                                    borderRadius: "4px",
                                    fontSize: "0.85rem",
                                    width: "90px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.25rem",
                                  }}
                                >
                                  Frequency{" "}
                                  <svg
                                    width="12"
                                    height="12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 16v-4m0-4h.01"></path>
                                  </svg>
                                </span>
                                <span
                                  style={{
                                    marginLeft: "1rem",
                                    color: "var(--foreground)",
                                    fontWeight: 500,
                                  }}
                                >
                                  {relatedKanjis[activeSelectedKanjiIndex].grade
                                    ? `#${relatedKanjis[activeSelectedKanjiIndex].grade}/2500`
                                    : "-"}
                                </span>
                              </div>
                            </div>

                            <hr
                              style={{
                                border: "none",
                                borderTop: "1px solid var(--border)",
                                margin: "1rem 0 1.5rem",
                                opacity: 0.5,
                              }}
                            />

                            {/* Audio & Readings */}
                            <div style={{ marginBottom: "1.5rem" }}>
                              <h3
                                style={{
                                  fontSize: "1.1rem",
                                  fontWeight: 600,
                                  color: "var(--foreground)",
                                  marginBottom: "1rem",
                                }}
                              >
                                Play audio
                              </h3>

                              <div style={{ marginBottom: "1.5rem" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    color: "var(--foreground)",
                                    fontWeight: 500,
                                    marginBottom: "0.4rem",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "8px",
                                      height: "8px",
                                      background: "#3b82f6",
                                      transform: "rotate(45deg)",
                                    }}
                                  ></div>
                                  Kunyomi
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "0.5rem",
                                    paddingLeft: "1rem",
                                    marginBottom: "1rem",
                                  }}
                                >
                                  {relatedKanjis[activeSelectedKanjiIndex]
                                    .kunyomi &&
                                  relatedKanjis[activeSelectedKanjiIndex]
                                    .kunyomi.length > 0
                                    ? relatedKanjis[
                                        activeSelectedKanjiIndex
                                      ].kunyomi.map(
                                        (kun: string, kIdx: number) => {
                                          const cleanKun = kun.replace(
                                            /[-]/g,
                                            "",
                                          );
                                          return (
                                            <div
                                              key={`kun-${kIdx}`}
                                              onClick={(e) =>
                                                playAudio(e, cleanKun)
                                              }
                                              style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "0.4rem",
                                                padding: "0.3rem 0.6rem",
                                                background:
                                                  "rgba(59, 130, 246, 0.1)",
                                                color: "#3b82f6",
                                                borderRadius: "6px",
                                                fontSize: "1rem",
                                                cursor: "pointer",
                                                fontWeight: 500,
                                                transition: "all 0.2s",
                                              }}
                                              onMouseOver={(e) => {
                                                e.currentTarget.style.background =
                                                  "rgba(59, 130, 246, 0.2)";
                                              }}
                                              onMouseOut={(e) => {
                                                e.currentTarget.style.background =
                                                  "rgba(59, 130, 246, 0.1)";
                                              }}
                                            >
                                              <span>
                                                {kun} ({toRomaji(kun)})
                                              </span>
                                              <svg
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                style={{
                                                  width: 14,
                                                  height: 14,
                                                  opacity: 0.8,
                                                }}
                                              >
                                                <path d="M3 9v6h4l5 5V4L7 9H3z" />
                                              </svg>
                                            </div>
                                          );
                                        },
                                      )
                                    : "-"}
                                </div>

                                {categorizedWords.kWords.length > 0 && (
                                  <div
                                    style={{
                                      paddingLeft: "1rem",
                                      marginBottom: "1rem",
                                    }}
                                  >
                                    <table
                                      style={{
                                        width: "100%",
                                        borderCollapse: "collapse",
                                        fontSize: "0.9rem",
                                      }}
                                    >
                                      <tbody>
                                        {categorizedWords.kWords.map(
                                          (w, idx) => (
                                            <tr
                                              key={`kword-${idx}`}
                                              style={{
                                                borderBottom:
                                                  "1px solid var(--border)",
                                              }}
                                            >
                                              <td
                                                style={{
                                                  padding: "0.8rem 0.5rem",
                                                  fontWeight: 500,
                                                  width: "25%",
                                                  color: "var(--foreground)",
                                                }}
                                              >
                                                {w.word}
                                              </td>
                                              <td
                                                style={{
                                                  padding: "0.8rem 0.5rem",
                                                  color:
                                                    "var(--text-secondary)",
                                                  width: "25%",
                                                }}
                                              >
                                                {w.reading || w.romaji}
                                              </td>
                                              <td
                                                style={{
                                                  padding: "0.8rem 0.5rem",
                                                  color:
                                                    "var(--text-secondary)",
                                                }}
                                              >
                                                {w.indonesian ||
                                                  w.english ||
                                                  w.meaning}
                                              </td>
                                            </tr>
                                          ),
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>

                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    color: "var(--foreground)",
                                    fontWeight: 500,
                                    marginBottom: "0.4rem",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "8px",
                                      height: "8px",
                                      background: "#ef4444",
                                      transform: "rotate(45deg)",
                                    }}
                                  ></div>
                                  Onyomi
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "0.5rem",
                                    paddingLeft: "1rem",
                                    marginBottom: "1rem",
                                  }}
                                >
                                  {relatedKanjis[activeSelectedKanjiIndex]
                                    .onyomi &&
                                  relatedKanjis[activeSelectedKanjiIndex].onyomi
                                    .length > 0
                                    ? relatedKanjis[
                                        activeSelectedKanjiIndex
                                      ].onyomi.map(
                                        (on: string, oIdx: number) => {
                                          const cleanOn = on.replace(
                                            /[-]/g,
                                            "",
                                          );
                                          return (
                                            <div
                                              key={`on-${oIdx}`}
                                              onClick={(e) =>
                                                playAudio(e, cleanOn)
                                              }
                                              style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "0.4rem",
                                                padding: "0.3rem 0.6rem",
                                                background:
                                                  "rgba(239, 68, 68, 0.1)",
                                                color: "#ef4444",
                                                borderRadius: "6px",
                                                fontSize: "1rem",
                                                cursor: "pointer",
                                                fontWeight: 500,
                                                transition: "all 0.2s",
                                              }}
                                              onMouseOver={(e) => {
                                                e.currentTarget.style.background =
                                                  "rgba(239, 68, 68, 0.2)";
                                              }}
                                              onMouseOut={(e) => {
                                                e.currentTarget.style.background =
                                                  "rgba(239, 68, 68, 0.1)";
                                              }}
                                            >
                                              <span>
                                                {on} ({toRomaji(on)})
                                              </span>
                                              <svg
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                style={{
                                                  width: 14,
                                                  height: 14,
                                                  opacity: 0.8,
                                                }}
                                              >
                                                <path d="M3 9v6h4l5 5V4L7 9H3z" />
                                              </svg>
                                            </div>
                                          );
                                        },
                                      )
                                    : "-"}
                                </div>

                                {categorizedWords.oWords.length > 0 && (
                                  <div
                                    style={{
                                      paddingLeft: "1rem",
                                      marginBottom: "1rem",
                                    }}
                                  >
                                    <table
                                      style={{
                                        width: "100%",
                                        borderCollapse: "collapse",
                                        fontSize: "0.9rem",
                                      }}
                                    >
                                      <tbody>
                                        {categorizedWords.oWords.map(
                                          (w, idx) => (
                                            <tr
                                              key={`oword-${idx}`}
                                              style={{
                                                borderBottom:
                                                  "1px solid var(--border)",
                                              }}
                                            >
                                              <td
                                                style={{
                                                  padding: "0.8rem 0.5rem",
                                                  fontWeight: 500,
                                                  width: "25%",
                                                  color: "var(--foreground)",
                                                }}
                                              >
                                                {w.word}
                                              </td>
                                              <td
                                                style={{
                                                  padding: "0.8rem 0.5rem",
                                                  color:
                                                    "var(--text-secondary)",
                                                  width: "25%",
                                                }}
                                              >
                                                {w.reading || w.romaji}
                                              </td>
                                              <td
                                                style={{
                                                  padding: "0.8rem 0.5rem",
                                                  color:
                                                    "var(--text-secondary)",
                                                }}
                                              >
                                                {w.indonesian ||
                                                  w.english ||
                                                  w.meaning}
                                              </td>
                                            </tr>
                                          ),
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            </div>

                            <hr
                              style={{
                                border: "none",
                                borderTop: "1px solid var(--border)",
                                margin: "1rem 0 1.5rem",
                                opacity: 0.5,
                              }}
                            />

                            {/* Examples */}
                            <div>
                              <h3
                                style={{
                                  fontSize: "1.1rem",
                                  fontWeight: 600,
                                  color: "var(--foreground)",
                                  marginBottom: "1rem",
                                }}
                              >
                                Examples
                              </h3>

                              {kanjiExamples.length === 0 ? (
                                <div style={{ color: "var(--text-secondary)" }}>
                                  No example sentences for this kanji.
                                </div>
                              ) : (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.25rem",
                                  }}
                                >
                                  {kanjiExamples.map(
                                    (
                                      ex: {
                                        japanese: string;
                                        romaji?: string;
                                        indonesian?: string;
                                        english?: string;
                                      },
                                      idx: number,
                                    ) => (
                                      <div
                                        key={`k-ex-${idx}`}
                                        style={{
                                          borderBottom:
                                            idx < kanjiExamples.length - 1
                                              ? "1px solid var(--border)"
                                              : "none",
                                          paddingBottom:
                                            idx < kanjiExamples.length - 1
                                              ? "1.25rem"
                                              : "0",
                                        }}
                                      >
                                        <div
                                          style={{
                                            fontSize: "1.15rem",
                                            color: "var(--foreground)",
                                            marginBottom: "0.5rem",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.75rem",
                                            flexWrap: "wrap",
                                            fontWeight: "500",
                                          }}
                                        >
                                          <span>{ex.japanese}</span>
                                          <SpeakerIcon
                                            style={{
                                              margin: 0,
                                              padding: 0,
                                              width: 22,
                                              height: 22,
                                              opacity: 0.5,
                                              cursor: "pointer",
                                            }}
                                            onClick={(e) =>
                                              playAudio(e, ex.japanese)
                                            }
                                          >
                                            <svg
                                              fill="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path d="M3 9v6h4l5 5V4L7 9H3z" />
                                            </svg>
                                          </SpeakerIcon>
                                        </div>
                                        {ex.romaji && (
                                          <div
                                            style={{
                                              color: "var(--text-secondary)",
                                              fontSize: "0.95rem",
                                              marginBottom: "0.5rem",
                                              fontFamily: "monospace",
                                            }}
                                          >
                                            {ex.romaji}
                                          </div>
                                        )}
                                        <div
                                          style={{
                                            color: "var(--text-secondary)",
                                            fontSize: "1rem",
                                          }}
                                        >
                                          {ex.indonesian || ex.english}
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Optional Stroke Animation (at the bottom) */}
                            {relatedKanjis[activeSelectedKanjiIndex].kanji && (
                              <div
                                style={{
                                  marginTop: "2.5rem",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <KanjiStrokeBox
                                  style={{
                                    width: "160px",
                                    height: "160px",
                                    margin: "0",
                                  }}
                                >
                                  <KanjiStrokeDiagram
                                    kanji={
                                      relatedKanjis[activeSelectedKanjiIndex]
                                        .kanji
                                    }
                                  />
                                </KanjiStrokeBox>
                              </div>
                            )}

                            {/* Educational Note */}
                            {relatedKanjis.some((k) => !["Hiragana", "Katakana", "Symbol", "Character"].includes(k.level || "")) && (
                              <div style={{ marginTop: "2rem" }}>
                                <EduNote>
                                  <span style={{ fontSize: "1rem", lineHeight: 1 }}>💡</span>
                                  <div>
                                    <strong>Catatan Level:</strong> Kosakata tingkat dasar (seperti N5) sering kali menggunakan huruf Kanji dari tingkat yang lebih tinggi (seperti N3 atau N1) untuk penulisan resminya.
                                  </div>
                                </EduNote>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "sentences" &&
                  (() => {
                    const allCombinedExamples = [
                      ...(currentItem?.examples || []),
                      ...usageInPractice,
                      ...externalSentences,
                    ];
                    return (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "1.5rem",
                          }}
                        >
                          <h3
                            style={{
                              fontSize: "1.25rem",
                              fontWeight: 600,
                              color: "var(--foreground)",
                            }}
                          >
                            Example sentences for{" "}
                            <span style={{ color: "#3b82f6" }}>
                              {targetWordForDetails}
                            </span>
                          </h3>
                          {isFetchingSentences && (
                            <div
                              style={{
                                fontSize: "0.9rem",
                                color: "var(--text-secondary)",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <div
                                className="spinner"
                                style={{
                                  flexShrink: 0,
                                  width: "16px",
                                  height: "16px",
                                  minWidth: "16px",
                                  minHeight: "16px",
                                  border: "2px solid rgba(59,130,246,0.3)",
                                  borderTopColor: "#3b82f6",
                                  borderRadius: "50%",
                                  animation: "spin 1s linear infinite",
                                }}
                              ></div>
                              <span style={{ display: "inline-block" }}>
                                Searching examples...
                              </span>
                            </div>
                          )}
                        </div>

                        {allCombinedExamples.length === 0 &&
                        !isFetchingSentences ? (
                          <div
                            style={{
                              color: "var(--text-secondary)",
                              padding: "2rem 0",
                              textAlign: "center",
                            }}
                          >
                            No example sentences for this word.
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "1.25rem",
                            }}
                          >
                            {allCombinedExamples.map((ex, idx) => (
                              <div
                                key={`all-ex-${idx}`}
                                style={{
                                  borderBottom:
                                    idx < allCombinedExamples.length - 1
                                      ? "1px solid var(--border)"
                                      : "none",
                                  paddingBottom:
                                    idx < allCombinedExamples.length - 1
                                      ? "1.25rem"
                                      : "0",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: "1.15rem",
                                    color: "var(--foreground)",
                                    marginBottom: "0.5rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    flexWrap: "wrap",
                                    fontWeight: "500",
                                  }}
                                >
                                  <span>{ex.japanese}</span>
                                  <SpeakerIcon
                                    style={{
                                      margin: 0,
                                      padding: 0,
                                      width: 22,
                                      height: 22,
                                      opacity: 0.5,
                                      cursor: "pointer",
                                    }}
                                    onClick={(e) => playAudio(e, ex.japanese)}
                                  >
                                    <svg
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M3 9v6h4l5 5V4L7 9H3z" />
                                    </svg>
                                  </SpeakerIcon>
                                </div>
                                {ex.romaji && (
                                  <div
                                    style={{
                                      color: "var(--text-secondary)",
                                      fontSize: "0.95rem",
                                      marginBottom: "0.5rem",
                                      fontFamily: "monospace",
                                    }}
                                  >
                                    {ex.romaji}
                                  </div>
                                )}
                                <div
                                  style={{
                                    color: "var(--text-secondary)",
                                    fontSize: "1rem",
                                  }}
                                >
                                  {ex.indonesian || ex.english}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                {activeTab === "grammar" && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "1rem",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: "var(--foreground)",
                          margin: 0,
                        }}
                      >
                        Grammar search results for{" "}
                        <span style={{ color: "#3b82f6" }}>
                          {targetWordForDetails}
                        </span>
                      </h3>
                      <FilterDropdown
                        value={
                          activeGrammarLevel === "All"
                            ? "All"
                            : activeGrammarLevel
                        }
                        onChange={(val) => setActiveGrammarLevel(val)}
                        options={["All", "N5", "N4", "N3", "N2", "N1"]}
                      />
                    </div>

                    {relatedGrammar.length === 0 ? (
                      <div
                        style={{
                          color: "var(--text-secondary)",
                          padding: "2rem 0",
                          textAlign: "center",
                        }}
                      >
                        No related grammar for this word.
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {relatedGrammar.map((grammar, idx) => {
                          const levelColors: Record<string, string> = {
                            N5: "#10b981",
                            N4: "#3b82f6",
                            N3: "#f59e0b",
                            N2: "#ef4444",
                            N1: "#8b5cf6",
                            "JLPT N5": "#10b981",
                            "JLPT N4": "#3b82f6",
                            "JLPT N3": "#f59e0b",
                            "JLPT N2": "#ef4444",
                            "JLPT N1": "#8b5cf6",
                          };
                          const lvlColor =
                            levelColors[grammar.level || "N5"] || "#3b82f6";

                          return (
                            <div
                              key={`grammar-${grammar.id || idx}`}
                              style={{
                                borderBottom:
                                  idx < relatedGrammar.length - 1
                                    ? "1px dashed var(--border)"
                                    : "none",
                                paddingBottom: "2rem",
                                marginBottom: "2rem",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.75rem",
                                  marginBottom: "0.5rem",
                                }}
                              >
                                <span
                                  style={{
                                    background: lvlColor,
                                    color: "white",
                                    padding: "0.2rem 0.6rem",
                                    borderRadius: "6px",
                                    fontSize: "0.85rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.5px",
                                  }}
                                >
                                  {grammar.level?.replace("JLPT ", "") || "N?"}
                                </span>
                                <h4
                                  style={{
                                    fontSize: "1.4rem",
                                    color: "var(--primary)",
                                    fontWeight: 700,
                                    margin: 0,
                                  }}
                                >
                                  {grammar.title}
                                </h4>
                              </div>
                              <div
                                style={{
                                  fontSize: "1.1rem",
                                  color: "var(--foreground)",
                                  fontWeight: 500,
                                  marginBottom: "1.25rem",
                                }}
                              >
                                {grammar.meaning}
                              </div>

                              {grammar.structure && (
                                <div
                                  style={{
                                    background: "rgba(59, 130, 246, 0.08)",
                                    borderLeft: "4px solid #3b82f6",
                                    padding: "0.85rem 1.25rem",
                                    borderRadius: "0 8px 8px 0",
                                    marginBottom: "1.25rem",
                                  }}
                                >
                                  <strong
                                    style={{
                                      display: "block",
                                      color: "#3b82f6",
                                      fontSize: "0.85rem",
                                      textTransform: "uppercase",
                                      letterSpacing: "0.5px",
                                      marginBottom: "0.4rem",
                                    }}
                                  >
                                    USAGE STRUCTURE
                                  </strong>
                                  <div
                                    style={{
                                      color: "var(--foreground)",
                                      fontSize: "1rem",
                                      fontFamily: "monospace",
                                      whiteSpace: "pre-wrap",
                                    }}
                                  >
                                    {grammar.structure}
                                  </div>
                                </div>
                              )}

                              {grammar.explanation && (
                                <div
                                  style={{
                                    color: "var(--text-secondary)",
                                    fontSize: "1rem",
                                    lineHeight: 1.6,
                                    marginBottom: "1.5rem",
                                    textAlign: "justify",
                                  }}
                                >
                                  {grammar.explanation}
                                </div>
                              )}

                              {grammar.examples &&
                                grammar.examples.length > 0 && (
                                  <div>
                                    <strong
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        color: "var(--foreground)",
                                        fontSize: "1rem",
                                        marginBottom: "1rem",
                                      }}
                                    >
                                      <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                      </svg>
                                      Example Sentences:
                                    </strong>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1rem",
                                      }}
                                    >
                                      {grammar.examples.map(
                                        (
                                          ex: {
                                            japanese: string;
                                            romaji?: string;
                                            indonesian?: string;
                                            english?: string;
                                          },
                                          i: number,
                                        ) => (
                                          <div
                                            key={i}
                                            style={{
                                              background: "var(--surface)",
                                              padding: "1.25rem",
                                              borderRadius: "12px",
                                              border: "1px solid var(--border)",
                                              boxShadow:
                                                "0 2px 8px rgba(0,0,0,0.02)",
                                            }}
                                          >
                                            <div
                                              style={{
                                                fontSize: "1.15rem",
                                                color: "var(--foreground)",
                                                marginBottom: "0.5rem",
                                                fontWeight: 500,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.75rem",
                                              }}
                                            >
                                              <span>{ex.japanese}</span>
                                              <SpeakerIcon
                                                style={{
                                                  margin: 0,
                                                  padding: 0,
                                                  width: 22,
                                                  height: 22,
                                                  opacity: 0.5,
                                                  cursor: "pointer",
                                                }}
                                                onClick={(e) =>
                                                  playAudio(e, ex.japanese)
                                                }
                                              >
                                                <svg
                                                  fill="currentColor"
                                                  viewBox="0 0 24 24"
                                                >
                                                  <path d="M3 9v6h4l5 5V4L7 9H3z" />
                                                </svg>
                                              </SpeakerIcon>
                                            </div>
                                            {ex.romaji && (
                                              <div
                                                style={{
                                                  color:
                                                    "var(--text-secondary)",
                                                  fontSize: "0.9rem",
                                                  fontFamily: "monospace",
                                                  marginBottom: "0.4rem",
                                                }}
                                              >
                                                {ex.romaji}
                                              </div>
                                            )}
                                            <div
                                              style={{
                                                color: "var(--foreground)",
                                                fontSize: "0.95rem",
                                                borderTop:
                                                  "1px dashed var(--border)",
                                                paddingTop: "0.5rem",
                                                marginTop: "0.5rem",
                                              }}
                                            >
                                              {ex.indonesian || ex.english}
                                            </div>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  </div>
                                )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "jpjp" && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: "var(--foreground)",
                        }}
                      >
                        Japanese definitions for{" "}
                        <span style={{ color: "#3b82f6" }}>
                          {targetWordForDetails}
                        </span>
                      </h3>
                      {isFetchingJpjp && (
                        <div
                          style={{
                            fontSize: "0.9rem",
                            color: "var(--text-secondary)",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <div
                            style={{
                              flexShrink: 0,
                              width: "16px",
                              height: "16px",
                              minWidth: "16px",
                              minHeight: "16px",
                              border: "2px solid rgba(59,130,246,0.3)",
                              borderTopColor: "#3b82f6",
                              borderRadius: "50%",
                              animation: "spin 1s linear infinite",
                            }}
                          ></div>
                          <span>Searching definition...</span>
                        </div>
                      )}
                    </div>

                    {jpjpData.length === 0 && !isFetchingJpjp ? (
                      <div
                        style={{
                          color: "var(--text-secondary)",
                          padding: "2rem 0",
                          textAlign: "center",
                        }}
                      >
                        No Japanese-Japanese definitions for this word.
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1.25rem",
                        }}
                      >
                        {jpjpData.map((entry, idx) => (
                          <div
                            key={`jpjp-${idx}`}
                            style={{
                              borderBottom:
                                idx < jpjpData.length - 1
                                  ? "1px solid var(--border)"
                                  : "none",
                              paddingBottom:
                                idx < jpjpData.length - 1 ? "1.25rem" : "0",
                            }}
                          >
                            {/* Meanings / Definitions */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                              }}
                            >
                              {entry.meanings.map(
                                (meaning: string, mIdx: number) => (
                                  <div
                                    key={`m-${mIdx}`}
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "0.4rem",
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontSize: "1.15rem",
                                        color: "var(--foreground)",
                                        lineHeight: 1.5,
                                        fontWeight: "500",
                                      }}
                                    >
                                      {meaning}
                                    </div>

                                    {/* Supplement info for the first meaning of each entry: POS and Reading */}
                                    {mIdx === 0 && (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "0.75rem",
                                          flexWrap: "wrap",
                                        }}
                                      >
                                        <span
                                          style={{
                                            color: "#3b82f6",
                                            fontSize: "0.85rem",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                          }}
                                        >
                                          {entry.partOfSpeech || "品詞不明"}
                                        </span>
                                        {entry.reading && (
                                          <span
                                            style={{
                                              color: "var(--text-secondary)",
                                              fontSize: "0.95rem",
                                            }}
                                          >
                                            「{entry.reading} ({toRomaji(entry.reading)})」
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ),
                              )}
                            </div>

                            {/* Example Sentences */}
                            {entry.examples && entry.examples.length > 0 && (
                              <div
                                style={{
                                  marginTop: "1.25rem",
                                  paddingLeft: "0.5rem",
                                  borderLeft: "3px solid rgba(59,130,246,0.3)",
                                  paddingTop: "0.5rem",
                                  paddingBottom: "0.5rem",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: "0.85rem",
                                    color: "#3b82f6",
                                    fontWeight: 600,
                                    marginBottom: "0.75rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                  }}
                                >
                                  USAGE EXAMPLES
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.75rem",
                                  }}
                                >
                                  {entry.examples.map(
                                    (
                                      ex: {
                                        japanese: string;
                                        romaji?: string;
                                        indonesian?: string;
                                        english?: string;
                                      },
                                      eIdx: number,
                                    ) => (
                                      <div
                                        key={`jpex-${eIdx}`}
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "0.75rem",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontSize: "1rem",
                                            color: "var(--text-secondary)",
                                            lineHeight: 1.5,
                                          }}
                                        >
                                          {ex.japanese}
                                        </span>
                                        <SpeakerIcon
                                          style={{
                                            margin: 0,
                                            padding: 0,
                                            width: 22,
                                            height: 22,
                                            opacity: 0.4,
                                            cursor: "pointer",
                                            flexShrink: 0,
                                          }}
                                          onClick={(e) =>
                                            playAudio(e, ex.japanese)
                                          }
                                        >
                                          <svg
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path d="M3 9v6h4l5 5V4L7 9H3z" />
                                          </svg>
                                        </SpeakerIcon>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </MainContent>

              <SidePanelWrapper>
                {/* Related Kanji Section */}
                {relatedKanjis.length > 0 && (
                  <PanelCard>
                    <PanelHeader>Characters from {resolveTargetWord()}</PanelHeader>
                    <PanelBody
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                      }}
                    >
                      {relatedKanjis.map((k) => (
                        <div key={k.id}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              gap: "1rem",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "2rem",
                                color: "var(--primary)",
                                lineHeight: 1,
                              }}
                            >
                              {k.kanji}
                            </div>
                            {k.kanji && (
                              <SpeakerIcon
                                style={{
                                  margin: 0,
                                  padding: 0,
                                  width: 20,
                                  height: 20,
                                  opacity: 0.5,
                                  cursor: "pointer",
                                  color: "var(--primary)",
                                }}
                                onClick={(e) => playAudio(e, k.kanji || "")}
                              >
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M3 9v6h4l5 5V4L7 9H3z" />
                                </svg>
                              </SpeakerIcon>
                            )}
                            <div
                              style={{
                                fontSize: "0.9rem",
                                color: "var(--text-secondary)",
                              }}
                            >
                              {k.onyomi && k.onyomi.length > 0 && (
                                <div>
                                  <strong>On:</strong> {k.onyomi.join(", ")} (
                                  {k.onyomi.map((r) => toRomaji(r)).join(", ")})
                                </div>
                              )}
                              {k.kunyomi && k.kunyomi.length > 0 && (
                                <div>
                                  <strong>Kun:</strong> {k.kunyomi.join(", ")} (
                                  {k.kunyomi.map((r) => toRomaji(r)).join(", ")}
                                  )
                                </div>
                              )}
                            </div>
                          </div>

                          {k.kanji && (
                            <KanjiStrokeBox>
                              <KanjiStrokeDiagram kanji={k.kanji} />
                            </KanjiStrokeBox>
                          )}

                          <div
                            style={{
                              marginTop: "0.75rem",
                              fontSize: "0.9rem",
                              color: "var(--foreground)",
                            }}
                          >
                            <div style={{ marginBottom: "0.25rem" }}>
                              <strong>Meaning:</strong> {k.meaning}
                            </div>
                            {k.stroke_count && (
                              <div style={{ marginBottom: "0.25rem" }}>
                                <strong>Kanji Strokes:</strong> {k.stroke_count}
                              </div>
                            )}
                            {k.level && (
                              <div>
                                <strong>
                                  {["Hiragana", "Katakana", "Symbol", "Character"].includes(k.level)
                                    ? "Type:"
                                    : "Kanji Level:"}
                                </strong>{" "}
                                {k.level}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Educational Note */}
                      {relatedKanjis.some((k) => !["Hiragana", "Katakana", "Symbol", "Character"].includes(k.level || "")) && (
                        <EduNote>
                          <span style={{ fontSize: "1rem", lineHeight: 1 }}>💡</span>
                          <div>
                            <strong>Catatan Level:</strong> Kosakata tingkat dasar (seperti N5) sering kali menggunakan huruf Kanji dari tingkat yang lebih tinggi (seperti N3 atau N1) untuk penulisan resminya.
                          </div>
                        </EduNote>
                      )}
                    </PanelBody>
                  </PanelCard>
                )}

                {/* Related Words Section */}
                {relatedWords.length > 0 && (
                  <PanelCard>
                    <PanelHeader>
                      Words related to {resolveTargetWord()}
                    </PanelHeader>
                    <PanelBody
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      {relatedWords.map((w) => (
                        <div
                          key={w.id}
                          style={{
                            paddingBottom: "1rem",
                            borderBottom: "1px solid var(--border)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <div
                              style={{
                                color: "var(--primary)",
                                fontWeight: "bold",
                                fontSize: "1.1rem",
                              }}
                            >
                              {w.word}
                            </div>
                            {w.word && (
                              <SpeakerIcon
                                style={{
                                  margin: 0,
                                  padding: 0,
                                  width: 18,
                                  height: 18,
                                  opacity: 0.5,
                                  cursor: "pointer",
                                  color: "var(--primary)",
                                }}
                                onClick={(e) => playAudio(e, w.word || "")}
                              >
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M3 9v6h4l5 5V4L7 9H3z" />
                                </svg>
                              </SpeakerIcon>
                            )}
                          </div>
                          {w.reading && (
                            <div
                              style={{
                                fontSize: "0.85rem",
                                color: "var(--text-secondary)",
                                marginBottom: "0.25rem",
                              }}
                            >
                              「 {w.reading} ({toRomaji(w.reading)}) 」
                            </div>
                          )}
                          <div
                            style={{
                              fontSize: "0.9rem",
                              color: "var(--foreground)",
                            }}
                          >
                            {w.meaning}
                          </div>
                        </div>
                      ))}
                    </PanelBody>
                  </PanelCard>
                )}
              </SidePanelWrapper>
            </ModalLayout>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
}

function FlashcardContentWrapper() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "vocabulary";
  const activeLevel = searchParams.get("level") || "All";
  const activeStatus = searchParams.get("status") || "All";
  const q = searchParams.get("q") || "";
  const key = `${activeCategory}-${activeLevel}-${activeStatus}-${q}`;
  return <FlashcardContent key={key} />;
}

export default function FlashcardsPageContainer() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "4rem", textAlign: "center" }}>
          Loading flashcards...
        </div>
      }
    >
      <FlashcardContentWrapper />
    </Suspense>
  );
}
