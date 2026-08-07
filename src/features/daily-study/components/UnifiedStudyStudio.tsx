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
`;

const StudioHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 20px;
  padding: 0.85rem 1.5rem;
  box-shadow: var(--shadow-sm);

  @media (max-width: 640px) {
    padding: 0.75rem 1rem;
  }
`;

const ProgressInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  max-width: 400px;

  .counter {
    font-size: 0.9rem;
    font-weight: 800;
    color: var(--text-secondary);
    white-space: nowrap;
  }
`;

const ProgressTrack = styled.div`
  flex: 1;
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
    flex-direction: column;
    gap: 0.75rem;

    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

const NavBtn = styled.button<{ $variant?: "primary" | "secondary" }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.75rem 1.4rem;
  border-radius: 14px;
  font-size: 0.92rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${({ $variant }) =>
    $variant === "primary"
      ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark, #4f46e5) 100%)"
      : "var(--background)"};

  color: ${({ $variant }) => ($variant === "primary" ? "white" : "var(--foreground)")};
  border: 1px solid ${({ $variant }) => ($variant === "primary" ? "var(--primary)" : "var(--border)")};
  box-shadow: ${({ $variant }) => ($variant === "primary" ? "0 4px 14px rgba(99, 102, 241, 0.3)" : "none")};

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
        <ProgressInfo>
          <span className="counter">
            {currentIndex + 1} / {totalItems} Karakter
          </span>
          <ProgressTrack>
            <div className="fill" style={{ width: `${progressPercent}%` }} />
          </ProgressTrack>
        </ProgressInfo>

        <LevelTag>JLPT Studio Hafalan</LevelTag>
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

        <div style={{ fontSize: "0.88rem", fontWeight: "800", color: "var(--text-secondary)" }}>
          Karakter {currentIndex + 1} dari {totalItems}
        </div>

        <NavBtn onClick={onNext} $variant="primary">
          {currentIndex === totalItems - 1 ? "Mulai Kuis Evaluasi →" : "Karakter Selanjutnya →"}
        </NavBtn>
      </FooterNavRow>
    </Container>
  );
}
