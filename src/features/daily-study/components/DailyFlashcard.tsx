"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { DetailedItemData } from "../types";
import { InteractiveStrokeWriter } from "./InteractiveStrokeWriter";
import { playJapaneseAudio } from "@/lib/audio";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
`;

const ModeTabs = styled.div`
  display: flex;
  background: var(--surface);
  padding: 0.35rem;
  border-radius: 16px;
  border: 1px solid var(--border);
  gap: 0.35rem;
  width: 100%;
  box-shadow: var(--shadow-sm);
`;

const ModeTab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.65rem 1rem;
  border: none;
  border-radius: 12px;
  font-size: 0.88rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background: ${({ $active }) =>
    $active ? "var(--primary)" : "transparent"};
  color: ${({ $active }) => ($active ? "white" : "var(--text-secondary)")};

  &:hover {
    color: ${({ $active }) => ($active ? "white" : "var(--foreground)")};
  }
`;

const CardPerspective = styled.div`
  perspective: 1200px;
  width: 100%;
  min-height: 420px;
`;

const CardInner = styled.div<{ $flipped: boolean }>`
  position: relative;
  width: 100%;
  min-height: 420px;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  transform: ${({ $flipped }) => ($flipped ? "rotateY(180deg)" : "rotateY(0deg)")};
`;

const CardSide = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  min-height: 420px;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 28px;
  box-shadow: var(--shadow-md);
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
  justify-content: space-between;
`;

const CardFront = styled(CardSide)`
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`;

const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
  overflow-y: auto;
  gap: 1.25rem;
`;

const LargeChar = styled.div`
  font-size: 6rem;
  font-weight: 900;
  font-family: "Noto Sans JP", sans-serif;
  line-height: 1;
  background: linear-gradient(135deg, var(--foreground) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const RomajiBadge = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  font-family: "DM Mono", monospace;
  color: var(--primary);
  background: rgba(var(--primary-rgb), 0.1);
  padding: 0.35rem 1.2rem;
  border-radius: 99px;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
`;

const AudioControlsRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const AudioBtn = styled.button<{ $slow?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.5rem 1rem;
  border-radius: 99px;
  background: rgba(var(--primary-rgb), 0.08);
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  color: var(--primary);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary);
    color: white;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const FlipHint = styled.span`
  font-size: 0.78rem;
  color: var(--text-secondary);
  margin-top: 2rem;
  opacity: 0.7;
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--border);
  padding-bottom: 0.75rem;

  h3 {
    font-size: 2.2rem;
    font-weight: 900;
    font-family: "Noto Sans JP", sans-serif;
  }
`;

const ReadingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const SectionTitle = styled.h4`
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
  padding: 0.25rem 0.65rem;
  border-radius: 8px;
  background: ${({ $type }) =>
    $type === "on"
      ? "rgba(59, 130, 246, 0.12)"
      : "rgba(16, 185, 129, 0.12)"};
  color: ${({ $type }) => ($type === "on" ? "#2563eb" : "#059669")};
  border: 1px solid
    ${({ $type }) =>
      $type === "on"
        ? "rgba(59, 130, 246, 0.25)"
        : "rgba(16, 185, 129, 0.25)"};
`;

const JukugoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const JukugoCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0.85rem;
  border-radius: 12px;
  background: var(--background);
  border: 1px solid var(--border);

  .word {
    font-size: 1.1rem;
    font-weight: 800;
    font-family: "Noto Sans JP", sans-serif;
  }
  .reading {
    font-size: 0.78rem;
    color: var(--text-secondary);
  }
  .meaning {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--primary);
  }
`;

const SimilarList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const SimilarCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  background: rgba(244, 63, 94, 0.08);
  border: 1px solid rgba(244, 63, 94, 0.2);

  .sim-char {
    font-size: 1.4rem;
    font-weight: 900;
    color: #e11d48;
    font-family: "Noto Sans JP", sans-serif;
  }
  .sim-text {
    font-size: 0.8rem;
    color: var(--foreground);
    line-height: 1.3;
  }
`;

const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
`;

const NavBtn = styled.button<{ $variant?: "primary" }>`
  flex: 1;
  padding: 0.85rem 1.25rem;
  border-radius: 16px;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid var(--border);

  background: ${({ $variant }) =>
    $variant === "primary" ? "var(--primary)" : "var(--surface)"};
  color: ${({ $variant }) => ($variant === "primary" ? "white" : "var(--foreground)")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

interface DailyFlashcardProps {
  item: DetailedItemData;
  currentIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrev: () => void;
}

export function DailyFlashcard({
  item,
  currentIndex,
  totalItems,
  onNext,
  onPrev,
}: DailyFlashcardProps) {
  const [activeMode, setActiveMode] = useState<"card" | "stroke">("card");
  const [flipped, setFlipped] = useState(false);

  const handleAudio = (e: React.MouseEvent, rate = 1) => {
    e.stopPropagation();
    playJapaneseAudio(item.char, { rate });
  };

  return (
    <Container>
      {/* Mode Switcher */}
      <ModeTabs>
        <ModeTab
          $active={activeMode === "card"}
          onClick={() => setActiveMode("card")}
        >
          🎴 Flashcard
        </ModeTab>
        <ModeTab
          $active={activeMode === "stroke"}
          onClick={() => setActiveMode("stroke")}
        >
          ✍️ Interactive Writer
        </ModeTab>
      </ModeTabs>

      {/* Render Flashcard or Interactive Stroke Writer */}
      {activeMode === "stroke" ? (
        <InteractiveStrokeWriter char={item.char} />
      ) : (
        <CardPerspective>
          <CardInner $flipped={flipped}>
            {/* FRONT FACE */}
            <CardFront onClick={() => setFlipped(true)}>
              <LargeChar>{item.char}</LargeChar>
              <RomajiBadge>{item.romaji}</RomajiBadge>

              <AudioControlsRow>
                <AudioBtn onClick={(e) => handleAudio(e, 1.0)}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                  </svg>
                  Suara (1x)
                </AudioBtn>
                <AudioBtn onClick={(e) => handleAudio(e, 0.7)} $slow={true}>
                  🐢 Lambat (0.7x)
                </AudioBtn>
              </AudioControlsRow>

              <FlipHint>👆 Klik kartu untuk melihat detail & Jukugo</FlipHint>
            </CardFront>

            {/* BACK FACE */}
            <CardBack onClick={() => setFlipped(false)}>
              <DetailHeader>
                <div>
                  <h3>{item.char}</h3>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    {item.meaning}
                  </div>
                </div>
                <AudioBtn onClick={(e) => handleAudio(e, 1.0)}>
                  🔊 Play
                </AudioBtn>
              </DetailHeader>

              {/* Readings */}
              {(item.onyomi?.length || item.kunyomi?.length) ? (
                <ReadingSection>
                  <SectionTitle>Cara Baca (On'yomi & Kun'yomi)</SectionTitle>
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
                </ReadingSection>
              ) : null}

              {/* Jukugo / Pasangan Kosakata Populer */}
              {item.jukugo && item.jukugo.length > 0 && (
                <ReadingSection>
                  <SectionTitle>📚 Pasangan Kosakata Populer (Jukugo)</SectionTitle>
                  <JukugoList>
                    {item.jukugo.map((j, i) => (
                      <JukugoCard key={i}>
                        <div>
                          <div className="word">{j.word}</div>
                          <div className="reading">{j.reading}</div>
                        </div>
                        <div className="meaning">{j.meaning}</div>
                      </JukugoCard>
                    ))}
                  </JukugoList>
                </ReadingSection>
              )}

              {/* Kanji Mirip / Visually Confusable Kanji */}
              {item.similarKanji && item.similarKanji.length > 0 && (
                <ReadingSection>
                  <SectionTitle>⚠️ Awas Tertukar (Kanji Mirip)</SectionTitle>
                  <SimilarList>
                    {item.similarKanji.map((s, i) => (
                      <SimilarCard key={i}>
                        <div className="sim-char">{s.char}</div>
                        <div className="sim-text">
                          <strong>{s.meaning}</strong> — {s.differenceNote}
                        </div>
                      </SimilarCard>
                    ))}
                  </SimilarList>
                </ReadingSection>
              )}
            </CardBack>
          </CardInner>
        </CardPerspective>
      )}

      {/* Navigation Footer Controls */}
      <NavRow>
        <NavBtn onClick={onPrev} disabled={currentIndex === 0}>
          ← Sebelumnya
        </NavBtn>

        <div style={{ alignSelf: "center", fontSize: "0.85rem", fontWeight: "800", color: "var(--text-secondary)" }}>
          {currentIndex + 1} / {totalItems}
        </div>

        <NavBtn onClick={onNext} $variant="primary">
          {currentIndex === totalItems - 1 ? "Mulai Kuis →" : "Berikutnya →"}
        </NavBtn>
      </NavRow>
    </Container>
  );
}
