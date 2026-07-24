"use client";

import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { playJapaneseAudio } from "@/lib/audio";
import { useProgress } from "@/context/ProgressContext";
import { getStroke } from "perfect-freehand";

// ==========================================
// ANIMATIONS & STYLED COMPONENTS
// ==========================================
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.96) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  touch-action: none;
`;

const ModalBox = styled.div`
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 28px;
  width: 100%;
  max-width: 540px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.4);
  animation: ${fadeIn} 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;

  @media (max-width: 640px) {
    padding: 1.25rem 1rem;
    border-radius: 22px;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: var(--foreground);
  }
`;

const HeroHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px dashed var(--border);

  @media (max-width: 640px) {
    gap: 1rem;
  }
`;

const KanjiDisplayBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
  border: 2px solid rgba(59, 130, 246, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4.2rem;
  font-weight: 900;
  color: var(--foreground);
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2);

  @media (max-width: 640px) {
    width: 80px;
    height: 80px;
    font-size: 3.2rem;
    border-radius: 18px;
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
`;

const KanjiMeaning = styled.h2`
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--foreground);
  margin: 0;

  @media (max-width: 640px) {
    font-size: 1.2rem;
  }
`;

const BadgesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const InfoBadge = styled.span<{ $bg?: string; $color?: string }>`
  background: ${({ $bg }) => $bg || "rgba(255, 255, 255, 0.08)"};
  color: ${({ $color }) => $color || "var(--text-secondary)"};
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
`;

const AudioBtn = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.45rem 0.9rem;
  font-size: 0.82rem;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.25rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
  }
`;

const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 1.25rem;
`;

const SectionLabel = styled.h3`
  font-size: 0.95rem;
  font-weight: 900;
  color: var(--foreground);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const ReadingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

const ReadingCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const ReadingType = styled.span`
  font-size: 0.72rem;
  font-weight: 900;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ReadingVal = styled.span`
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--foreground);
`;

const ExampleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ExampleItem = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.7rem 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const ExampleWord = styled.div`
  display: flex;
  flex-direction: column;
`;

const JapWord = styled.span`
  font-weight: 900;
  font-size: 1rem;
  color: var(--foreground);
`;

const RomajiRead = styled.span`
  font-size: 0.78rem;
  color: var(--primary);
  font-weight: 700;
`;

const IndoMeaning = styled.span`
  font-size: 0.82rem;
  color: var(--text-secondary);
`;

const SmallPlayBtn = styled.button`
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: #3b82f6;
    color: white;
  }
`;

const CanvasWrapper = styled.div`
  background: #0f172a;
  border: 2px dashed rgba(255, 255, 255, 0.15);
  border-radius: 18px;
  position: relative;
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  overflow: hidden;
`;

const OutlineKanjiText = styled.span`
  position: absolute;
  font-size: 7rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.06);
  user-select: none;
  pointer-events: none;
`;

const ClearCanvasBtn = styled.button`
  position: absolute;
  bottom: 0.6rem;
  right: 0.6rem;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.3rem 0.7rem;
  font-size: 0.75rem;
  font-weight: 800;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

const PracticeCTA = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 0.85rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
  margin-top: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
`;

// Helper for perfect freehand SVG path
function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";
  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"] as (string | number)[],
  );
  d.push("Z");
  return d.join(" ");
}

export interface KanjiDetailModalProps {
  kanji: {
    char: string;
    meaning: string;
    on: string;
    kun: string;
    strokes: number;
    level?: string;
    examples?: { word: string; reading: string; meaning: string }[];
  };
  onClose: () => void;
  onPractice?: () => void;
}

export function KanjiDetailModal({ kanji, onClose, onPractice }: KanjiDetailModalProps) {
  const { addExp } = useProgress();
  const [userStrokes, setUserStrokes] = useState<number[][][]>([]);
  const [currentStroke, setCurrentStroke] = useState<number[][]>([]);
  const isDrawingRef = useRef(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll & listen to Escape key
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canvasContainerRef.current) return;
    const rect = canvasContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    isDrawingRef.current = true;
    setCurrentStroke([[x, y, e.pressure || 0.5]]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDrawingRef.current || !canvasContainerRef.current) return;
    const rect = canvasContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentStroke((prev) => [...prev, [x, y, e.pressure || 0.5]]);
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    if (currentStroke.length > 0) {
      setUserStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke([]);
    }
  };

  const clearCanvas = () => {
    setUserStrokes([]);
    setCurrentStroke([]);
  };

  const handleAudioPlay = (textToPlay: string) => {
    playJapaneseAudio(textToPlay);
  };

  const handlePracticeClick = () => {
    addExp(10); // Reward 10 EXP for studying Kanji
    if (onPractice) {
      onPractice();
    }
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>×</CloseBtn>

        {/* Hero Header */}
        <HeroHeader>
          <KanjiDisplayBox>{kanji.char}</KanjiDisplayBox>
          <HeaderInfo>
            <KanjiMeaning>{kanji.meaning}</KanjiMeaning>

            <BadgesRow>
              <InfoBadge $bg="rgba(139, 92, 246, 0.2)" $color="#a855f7">
                {kanji.level || "N5"}
              </InfoBadge>
              <InfoBadge $bg="rgba(59, 130, 246, 0.2)" $color="#3b82f6">
                {kanji.strokes} Coretan
              </InfoBadge>
            </BadgesRow>

            <AudioBtn onClick={() => handleAudioPlay(kanji.char)}>
              🔊 Pelafalan Kanji
            </AudioBtn>
          </HeaderInfo>
        </HeroHeader>

        {/* Readings */}
        <SectionBlock>
          <SectionLabel>📖 Cara Baca (Readings)</SectionLabel>
          <ReadingsGrid>
            <ReadingCard>
              <ReadingType>Onyomi (音読み)</ReadingType>
              <ReadingVal>{kanji.on || "—"}</ReadingVal>
            </ReadingCard>
            <ReadingCard>
              <ReadingType>Kunyomi (訓読み)</ReadingType>
              <ReadingVal>{kanji.kun || "—"}</ReadingVal>
            </ReadingCard>
          </ReadingsGrid>
        </SectionBlock>

        {/* Canvas Stroke Writer */}
        <SectionBlock>
          <SectionLabel>✏️ Latih Coretan Kanji di Sini</SectionLabel>
          <CanvasWrapper
            ref={canvasContainerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <OutlineKanjiText>{kanji.char}</OutlineKanjiText>

            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              {userStrokes.map((s, idx) => {
                const strokeData = getStroke(s, { size: 10, thinning: 0.5, smoothing: 0.5 });
                const pathData = getSvgPathFromStroke(strokeData);
                return <path key={idx} d={pathData} fill="#38bdf8" />;
              })}
              {currentStroke.length > 0 && (
                <path
                  d={getSvgPathFromStroke(
                    getStroke(currentStroke, { size: 10, thinning: 0.5, smoothing: 0.5 }),
                  )}
                  fill="#38bdf8"
                />
              )}
            </svg>

            {userStrokes.length > 0 && <ClearCanvasBtn onClick={clearCanvas}>Hapus Coretan</ClearCanvasBtn>}
          </CanvasWrapper>
        </SectionBlock>

        {/* Example Vocabulary */}
        {kanji.examples && kanji.examples.length > 0 && (
          <SectionBlock>
            <SectionLabel>📚 Contoh Kosakata Terkait</SectionLabel>
            <ExampleList>
              {kanji.examples.map((ex, idx) => (
                <ExampleItem key={idx}>
                  <ExampleWord>
                    <JapWord>{ex.word}</JapWord>
                    <RomajiRead>{ex.reading}</RomajiRead>
                    <IndoMeaning>{ex.meaning}</IndoMeaning>
                  </ExampleWord>
                  <SmallPlayBtn onClick={() => handleAudioPlay(ex.word)}>🔊</SmallPlayBtn>
                </ExampleItem>
              ))}
            </ExampleList>
          </SectionBlock>
        )}

        <PracticeCTA onClick={handlePracticeClick}>🎴 Hafalkan di JLPT Flashcards (+10 XP)</PracticeCTA>
      </ModalBox>
    </Overlay>
  );
}
