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

const KanaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1rem;
  width: 100%;

  @media (max-width: 640px) {
    padding: 0.95rem 0.75rem;
    gap: 0.6rem;
  }
`;

const KanaHeroCanvas = styled.div`
  position: relative;
  width: 105px;
  height: 105px;
  border-radius: 18px;
  background: var(--background);
  border: 1.5px dashed var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 640px) {
    width: 94px;
    height: 94px;
  }
`;

const KanaInfoGrid = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
  max-width: 380px;
  justify-content: center;
`;

const InfoCard = styled.div`
  flex: 1;
  background: var(--background);
  border: 1.5px solid var(--border);
  border-radius: 14px;
  padding: 0.7rem 0.85rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;

  .label {
    font-size: 0.68rem;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--text-secondary);
    letter-spacing: 0.5px;
  }

  .value {
    font-size: 1.35rem;
    font-weight: 900;
    color: #60a5fa;
  }

  .value-type {
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--foreground);
  }
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

  @media (max-width: 640px) {
    padding: 0.85rem;
    border-right: none;
  }

  &:last-child {
    border-right: none;
    border-bottom: none;
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
  gap: 0.75rem;
  width: 100%;
  max-width: 380px;
  justify-content: center;

  button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.55rem 0.85rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 800;
    cursor: pointer;
    background: rgba(96, 165, 250, 0.14);
    color: #60a5fa;
    border: 1.5px solid rgba(96, 165, 250, 0.35);
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;

    &:hover,
    &:active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
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

const DesktopKanaGrid = styled(WorksheetGrid)`
  display: grid;
  @media (max-width: 640px) {
    display: none !important;
  }
`;

const MobileKanaContainer = styled(KanaContainer)`
  display: none;
  @media (max-width: 640px) {
    display: flex !important;
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

  const isKana =
    /^[\u3040-\u309F\u30A0-\u30FF]/.test(item.char) ||
    item.meaning.toLowerCase().includes("kana");

  if (isKana) {
    const isKatakana = /[\u30A0-\u30FF]/.test(item.char);
    const kanaTypeLabel = isKatakana ? "Katakana" : "Hiragana";
    const romajiValue =
      item.romaji ||
      (item.meaning.startsWith("Karakter Kana: ")
        ? item.meaning.replace("Karakter Kana: ", "")
        : item.meaning);
    const radicalChar = item.char;

    return (
      <CardContainer>
        {/* MOBILE VIEW FOR KANA (GAMBAR 1) */}
        <MobileKanaContainer>
          <KanaHeroCanvas>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
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
          </KanaHeroCanvas>

          <StrokeBadge>({strokeCount} strokes)</StrokeBadge>

          <AudioButtons>
            <button onClick={() => handleAudio(1.0)}>🔊 Suara (1x)</button>
            <button onClick={() => handleAudio(0.7)}>🐢 0.7x</button>
          </AudioButtons>

          <KanaInfoGrid>
            <InfoCard>
              <span className="label">Cara Baca (Romaji)</span>
              <span className="value">{romajiValue}</span>
            </InfoCard>
            <InfoCard>
              <span className="label">Tipe Karakter</span>
              <span className="value-type">{kanaTypeLabel}</span>
            </InfoCard>
          </KanaInfoGrid>
        </MobileKanaContainer>

        {/* DESKTOP / PC VIEW FOR KANA (GAMBAR 2) */}
        <DesktopKanaGrid>
          {/* COLUMN 1: HERO KANA & STROKE COUNT */}
          <Cell>
            <HeroBox>
              <SvgCanvasWrapper>
                <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
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

          {/* COLUMN 4: COMMON WORDS */}
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
        </DesktopKanaGrid>
      </CardContainer>
    );
  }

  // Fallback Radical logic for Kanji
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
