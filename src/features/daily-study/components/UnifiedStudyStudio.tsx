"use client";

import React from "react";
import styled from "styled-components";
import { DetailedItemData } from "../types";
import { KanjiWorksheetCard } from "./KanjiWorksheetCard";
import { KanjiGridPractice } from "./KanjiGridPractice";

import { getDetailedItemInfo } from "../utils/kanjiDataHelper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 640px) {
    gap: 1rem;
    padding-bottom: 85px;
  }
`;

const StudioHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 20px;
  padding: 0.85rem 1.25rem;
  box-shadow: var(--shadow-sm);

  @media (max-width: 640px) {
    padding: 0.75rem 1rem;
    border-radius: 16px;
  }
`;

const HeaderTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .counter {
    font-size: 0.9rem;
    font-weight: 800;
    color: var(--text-secondary);
    white-space: nowrap;

    @media (max-width: 640px) {
      font-size: 0.82rem;
    }
  }
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  background: var(--background);
  border-radius: 99px;
  border: 1px solid var(--border);
  overflow: hidden;

  .fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
    transition: width 0.3s ease;
  }
`;

const LevelTag = styled.div`
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--primary);
  background: rgba(var(--primary-rgb), 0.1);
  padding: 0.35rem 0.85rem;
  border-radius: 99px;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  white-space: nowrap;

  @media (max-width: 640px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.65rem;
  }
`;

const FooterNavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 20px;
  padding: 1rem 1.5rem;
  box-shadow: var(--shadow-md);
  margin-top: 0.5rem;

  @media (max-width: 640px) {
    gap: 0.6rem;
    padding: 0.75rem 0.85rem;
    border-radius: 16px;

    .counter-text {
      display: none;
    }
  }
`;

const NavBtn = styled.button<{ $variant?: "primary" | "secondary" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0.75rem 1.4rem;
  border-radius: 14px;
  font-size: 0.92rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  background: ${({ $variant }) =>
    $variant === "primary"
      ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark, #4f46e5) 100%)"
      : "var(--background)"};

  color: ${({ $variant }) => ($variant === "primary" ? "white" : "var(--foreground)")};
  border: 1px solid ${({ $variant }) => ($variant === "primary" ? "var(--primary)" : "var(--border)")};
  box-shadow: ${({ $variant }) => ($variant === "primary" ? "0 4px 14px rgba(99, 102, 241, 0.3)" : "none")};

  @media (max-width: 640px) {
    flex: 1;
    padding: 0.65rem 0.5rem;
    font-size: 0.82rem;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ $variant }) =>
      $variant === "primary"
        ? "0 6px 20px rgba(99, 102, 241, 0.45)"
        : "var(--shadow-sm)"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface UnifiedStudyStudioProps {
  items?: DetailedItemData[];
  item?: DetailedItemData;
  currentIndex: number;
  totalItems?: number;
  onNext: () => void;
  onPrev: () => void;
}

export function UnifiedStudyStudio({
  items,
  item: singleItem,
  currentIndex,
  totalItems: providedTotalItems,
  onNext,
  onPrev,
}: UnifiedStudyStudioProps) {
  const activeItems = React.useMemo(() => {
    if (items && items.length > 0) return items;
    if (singleItem) return [singleItem];
    return [getDetailedItemInfo("日"), getDetailedItemInfo("月"), getDetailedItemInfo("火")];
  }, [items, singleItem]);

  const safeIndex = Math.min(Math.max(0, currentIndex), activeItems.length - 1);
  const item = singleItem || activeItems[safeIndex] || activeItems[0];
  const totalItems = providedTotalItems || activeItems.length;
  const progressPercent = Math.round(((safeIndex + 1) / totalItems) * 100);

  return (
    <Container>
      {/* Studio Header Bar */}
      <StudioHeader>
        <HeaderTopRow>
          <span className="counter">
            {currentIndex + 1} / {totalItems} Karakter
          </span>
          <LevelTag>JLPT Studio Hafalan</LevelTag>
        </HeaderTopRow>
        <ProgressTrack>
          <div className="fill" style={{ width: `${progressPercent}%` }} />
        </ProgressTrack>
      </StudioHeader>

      {/* TOP SECTION: KANJI INFO WORKSHEET GRID (HEADER GRID LIKE GAMBAR 1) */}
      <KanjiWorksheetCard item={item} />

      {/* BOTTOM SECTION: STEP-BY-STEP STROKE ORDER SEQUENCE & PRACTICE GRID (GAMBAR 1) */}
      <KanjiGridPractice char={item.char} />

      {/* Footer Navigation Bar */}
      <FooterNavRow>
        <NavBtn onClick={onPrev} disabled={currentIndex === 0}>
          ← Sebelumnya
        </NavBtn>

        <div className="counter-text" style={{ fontSize: "0.88rem", fontWeight: "800", color: "var(--text-secondary)" }}>
          Karakter {currentIndex + 1} dari {totalItems}
        </div>

        <NavBtn onClick={onNext} $variant="primary">
          {currentIndex === totalItems - 1 ? "Mulai Kuis Evaluasi →" : "Karakter Selanjutnya →"}
        </NavBtn>
      </FooterNavRow>
    </Container>
  );
}
