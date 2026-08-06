"use client";

import React from "react";
import styled from "styled-components";
import { DetailedItemData } from "../types";
import { InteractiveStrokeWriter } from "./InteractiveStrokeWriter";
import { playJapaneseAudio } from "@/lib/audio";

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

const StudioGrid = styled.div`
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 1.75rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const LeftPanel = styled.div`
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 28px;
  padding: 1.75rem 1.25rem;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

const CharacterHero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;

  .char {
    font-size: 4.5rem;
    font-weight: 900;
    font-family: "Noto Sans JP", sans-serif;
    line-height: 1;
    background: linear-gradient(135deg, var(--foreground) 0%, var(--primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .romaji {
    font-size: 1.1rem;
    font-weight: 800;
    font-family: "DM Mono", monospace;
    color: var(--primary);
    background: rgba(var(--primary-rgb), 0.1);
    padding: 0.25rem 0.9rem;
    border-radius: 99px;
    border: 1px solid rgba(var(--primary-rgb), 0.2);
  }
`;

const AudioButtonGroup = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const AudioBtn = styled.button<{ $slow?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.45rem 0.85rem;
  border-radius: 99px;
  background: rgba(var(--primary-rgb), 0.08);
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  color: var(--primary);
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary);
    color: white;
  }

  svg {
    width: 15px;
    height: 15px;
  }
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const KnowledgeCard = styled.div`
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 28px;
  padding: 1.75rem;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const MeaningTitle = styled.div`
  h2 {
    font-size: 1.75rem;
    font-weight: 900;
    color: var(--foreground);
    margin-bottom: 0.25rem;
  }
  .meaning-text {
    font-size: 1.05rem;
    color: var(--primary);
    font-weight: 800;
  }
`;

const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SectionLabel = styled.h4`
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Tag = styled.span<{ $type?: "on" | "kun" }>`
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.3rem 0.75rem;
  border-radius: 10px;
  background: ${({ $type }) =>
    $type === "on" ? "rgba(59, 130, 246, 0.12)" : "rgba(16, 185, 129, 0.12)"};
  color: ${({ $type }) => ($type === "on" ? "#2563eb" : "#059669")};
  border: 1px solid
    ${({ $type }) =>
      $type === "on" ? "rgba(59, 130, 246, 0.25)" : "rgba(16, 185, 129, 0.25)"};
`;

const JukugoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const JukugoItemCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  background: var(--background);
  border: 1px solid var(--border);

  .word {
    font-size: 1.15rem;
    font-weight: 900;
    font-family: "Noto Sans JP", sans-serif;
  }
  .reading {
    font-size: 0.78rem;
    color: var(--text-secondary);
  }
  .meaning {
    font-size: 0.85rem;
    font-weight: 800;
    color: var(--primary);
    margin-top: 0.2rem;
  }
`;

const SimilarList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SimilarCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.6rem 0.9rem;
  border-radius: 12px;
  background: rgba(244, 63, 94, 0.08);
  border: 1px solid rgba(244, 63, 94, 0.2);

  .sim-char {
    font-size: 1.5rem;
    font-weight: 900;
    color: #e11d48;
    font-family: "Noto Sans JP", sans-serif;
  }
  .sim-info {
    font-size: 0.82rem;
    color: var(--foreground);
    line-height: 1.35;
  }
`;

const FooterNavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 20px;
  padding: 0.85rem 1.5rem;
  box-shadow: var(--shadow-sm);
  gap: 1rem;
`;

const NavBtn = styled.button<{ $variant?: "primary" }>`
  padding: 0.8rem 1.5rem;
  border-radius: 14px;
  font-size: 0.92rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid var(--border);

  background: ${({ $variant }) =>
    $variant === "primary" ? "var(--primary)" : "var(--background)"};
  color: ${({ $variant }) => ($variant === "primary" ? "white" : "var(--foreground)")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;

interface UnifiedStudyStudioProps {
  item: DetailedItemData;
  currentIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrev: () => void;
}

export function UnifiedStudyStudio({
  item,
  currentIndex,
  totalItems,
  onNext,
  onPrev,
}: UnifiedStudyStudioProps) {
  const handleAudio = (rate = 1) => {
    playJapaneseAudio(item.char, { rate });
  };

  return (
    <Container>
      {/* Studio Header Bar */}
      <StudioHeader>
        <ProgressInfo>
          <span className="counter">
            {currentIndex + 1} dari {totalItems} Karakter
          </span>
          <ProgressTrack>
            <div
              className="fill"
              style={{ width: `${((currentIndex + 1) / totalItems) * 100}%` }}
            />
          </ProgressTrack>
        </ProgressInfo>

        <LevelTag>Zen Studio Mode</LevelTag>
      </StudioHeader>

      {/* Main Studio Grid: Left Studio Canvas + Right Knowledge Cards */}
      <StudioGrid>
        {/* LEFT COLUMN: INTERACTIVE STROKE WRITER & AUDIO */}
        <LeftPanel>
          <CharacterHero>
            <div className="char">{item.char}</div>
            <div className="romaji">{item.romaji}</div>
          </CharacterHero>

          <AudioButtonGroup>
            <AudioBtn onClick={() => handleAudio(1.0)}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
              Suara (1x)
            </AudioBtn>

            <AudioBtn onClick={() => handleAudio(0.7)} $slow={true}>
              🐢 Lambat (0.7x)
            </AudioBtn>
          </AudioButtonGroup>

          {/* Embed Interactive Stroke Writer Canvas directly */}
          <InteractiveStrokeWriter char={item.char} />
        </LeftPanel>

        {/* RIGHT COLUMN: KNOWLEDGE DATA & COMPOUND WORDS */}
        <RightPanel>
          <KnowledgeCard>
            <MeaningTitle>
              <h2>{item.char}</h2>
              <div className="meaning-text">Arti: {item.meaning}</div>
            </MeaningTitle>

            {/* Readings */}
            {(item.onyomi?.length || item.kunyomi?.length) ? (
              <SectionBlock>
                <SectionLabel>Cara Baca (On'yomi & Kun'yomi)</SectionLabel>
                <TagGroup>
                  {item.onyomi?.map((on, i) => (
                    <Tag key={`on-${i}`} $type="on">
                      音: {on}
                    </Tag>
                  ))}
                  {item.kunyomi?.map((kun, i) => (
                    <Tag key={`kun-${i}`} $type="kun">
                      訓: {kun}
                    </Tag>
                  ))}
                </TagGroup>
              </SectionBlock>
            ) : null}

            {/* Jukugo / Pasangan Kosakata Populer */}
            {item.jukugo && item.jukugo.length > 0 && (
              <SectionBlock>
                <SectionLabel>📚 Pasangan Kosakata Populer (Jukugo)</SectionLabel>
                <JukugoGrid>
                  {item.jukugo.map((j, i) => (
                    <JukugoItemCard key={i}>
                      <div className="word">{j.word}</div>
                      <div className="reading">{j.reading}</div>
                      <div className="meaning">{j.meaning}</div>
                    </JukugoItemCard>
                  ))}
                </JukugoGrid>
              </SectionBlock>
            )}

            {/* Kanji Mirip / Visually Confusable Kanji */}
            {item.similarKanji && item.similarKanji.length > 0 && (
              <SectionBlock>
                <SectionLabel>⚠️ Awas Tertukar (Kanji Mirip)</SectionLabel>
                <SimilarList>
                  {item.similarKanji.map((s, i) => (
                    <SimilarCard key={i}>
                      <div className="sim-char">{s.char}</div>
                      <div className="sim-info">
                        <strong>{s.meaning}</strong> — {s.differenceNote}
                      </div>
                    </SimilarCard>
                  ))}
                </SimilarList>
              </SectionBlock>
            )}
          </KnowledgeCard>
        </RightPanel>
      </StudioGrid>

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
