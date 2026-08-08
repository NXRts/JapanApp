"use client";

import React from "react";
import styled from "styled-components";
import { DetailedItemData } from "../types";
import { playJapaneseAudio } from "@/lib/audio";
import { getStrokePaths } from "../utils/strokePaths";

const CardContainer = styled.div`
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  width: 100%;
`;

const WorksheetGrid = styled.div`
  display: grid;
  grid-template-columns: 220px 180px 220px 1fr;
  border-collapse: collapse;

  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Cell = styled.div<{ $bg?: string }>`
  border-right: 1.5px solid var(--border);
  border-bottom: 1.5px solid var(--border);
  padding: 1rem;
  background: ${({ $bg }) => $bg || "transparent"};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:last-child {
    border-right: none;
  }
`;

const HeroBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
`;

const SvgCanvasWrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 12px;
  background: var(--background);
  border: 1px dashed var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StrokeBadge = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-align: center;
`;

const AudioButtons = styled.div`
  display: flex;
  gap: 0.4rem;
  width: 100%;
  justify-content: center;

  button {
    padding: 0.35rem 0.6rem;
    border-radius: 8px;
    font-size: 0.72rem;
    font-weight: 700;
    cursor: pointer;
    background: rgba(var(--primary-rgb), 0.12);
    color: var(--primary);
    border: 1px solid rgba(var(--primary-rgb), 0.25);
    transition: all 0.2s ease;

    &:hover {
      background: var(--primary);
      color: white;
    }
  }
`;

const CellLabel = styled.div`
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.3rem;
`;

const MeaningText = styled.div`
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--foreground);
`;

const RadicalShadedBox = styled.div`
  background: rgba(var(--primary-rgb), 0.08);
  border: 1px dashed var(--border);
  border-radius: 8px;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: auto;

  .rad-title {
    font-size: 0.68rem;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .rad-char {
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--primary);
  }
`;

const ReadingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  .reading-type {
    font-size: 0.72rem;
    font-weight: 800;
    color: var(--text-secondary);
  }

  .reading-list {
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--foreground);
  }
`;

const WordsTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  max-height: 220px;
  overflow-y: auto;
`;

const WordRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.6rem;
  align-items: center;
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
  background: var(--background);
  font-size: 0.82rem;

  .kanji-word {
    font-weight: 800;
    font-size: 0.95rem;
    color: var(--primary);
  }

  .reading-romaji {
    display: flex;
    flex-direction: column;
    .kana {
      font-weight: 700;
      font-size: 0.78rem;
      color: var(--foreground);
    }
    .romaji {
      font-size: 0.7rem;
      color: var(--text-secondary);
    }
  }

  .meaning {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-align: right;
  }
`;

interface Props {
  item: DetailedItemData;
}

export function KanjiWorksheetCard({ item }: Props) {
  const strokePaths = getStrokePaths(item.char);
  const strokeCount = item.strokes || strokePaths.length;

  const handleAudio = (rate: number = 1.0) => {
    playJapaneseAudio(item.char, { rate });
  };

  // Fallback Radical logic
  const radicalChar = item.char;

  return (
    <CardContainer>
      <WorksheetGrid>
        {/* COLUMN 1: HERO KANJI & STROKE COUNT */}
        <Cell>
          <HeroBox>
            <SvgCanvasWrapper>
              <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                {/* Grid crosshairs */}
                <line x1="50" y1="0" x2="50" y2="100" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2,2" />
                <text
                  x="50"
                  y="58"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="64"
                  fontWeight="600"
                  fontFamily="'Klee One', 'Hiragino Kaku Gothic Pro', 'Yu Gothic', 'Noto Sans JP', sans-serif"
                  fill="var(--foreground)"
                >
                  {item.char}
                </text>
              </svg>
            </SvgCanvasWrapper>

            <StrokeBadge>({strokeCount} strokes)</StrokeBadge>

            <AudioButtons>
              <button onClick={() => handleAudio(1.0)}>🔊 Suara (1x)</button>
              <button onClick={() => handleAudio(0.7)}>🐢 0.7x</button>
            </AudioButtons>
          </HeroBox>
        </Cell>

        {/* COLUMN 2: MEANING & RADICAL */}
        <Cell>
          <CellLabel>meaning</CellLabel>
          <MeaningText>{item.meaning}</MeaningText>

          <RadicalShadedBox>
            <span className="rad-title">radical</span>
            <span className="rad-char">{radicalChar}</span>
          </RadicalShadedBox>
        </Cell>

        {/* COLUMN 3: ON & KUN READINGS */}
        <Cell>
          <ReadingGroup>
            <span className="reading-type">ON readings</span>
            <span className="reading-list">
              {item.onyomi && item.onyomi.length > 0 ? item.onyomi.join(", ") : "-"}
            </span>
          </ReadingGroup>

          <ReadingGroup style={{ marginTop: "0.6rem" }}>
            <span className="reading-type">KUN readings</span>
            <span className="reading-list">
              {item.kunyomi && item.kunyomi.length > 0 ? item.kunyomi.join(", ") : "-"}
            </span>
          </ReadingGroup>
        </Cell>

        {/* COLUMN 4: COMMON WORDS (JUKUGO) */}
        <Cell>
          <CellLabel>common words</CellLabel>
          <WordsTable>
            {item.jukugo && item.jukugo.length > 0 ? (
              item.jukugo.map((w, idx) => (
                <WordRow key={idx}>
                  <span className="kanji-word">{w.word}</span>
                  <div className="reading-romaji">
                    <span className="kana">{w.reading}</span>
                  </div>
                  <span className="meaning">{w.meaning}</span>
                </WordRow>
              ))
            ) : (
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
                Tidak ada kosakata pasangan khusus.
              </div>
            )}
          </WordsTable>
        </Cell>
      </WorksheetGrid>
    </CardContainer>
  );
}
