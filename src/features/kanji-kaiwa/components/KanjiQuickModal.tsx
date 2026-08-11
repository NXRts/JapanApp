"use client";

import React from "react";
import styled from "styled-components";
import { KaiwaTargetKanji } from "../types";
import { playJapaneseAudio } from "@/lib/audio";

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalCard = styled.div`
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 24px;
  width: 100%;
  max-width: 420px;
  padding: 1.75rem;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  animation: popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes popIn {
    from {
      transform: scale(0.9) translateY(10px);
      opacity: 0;
    }
    to {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1.2rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;

  &:hover {
    color: var(--foreground);
  }
`;

const KanjiDisplayBox = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  background: var(--background);
  border: 2px dashed var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: 700;
  color: var(--primary);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.15);
  font-family: "'Klee One', 'Hiragino Kaku Gothic Pro', 'Yu Gothic', sans-serif";
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.25rem;

  .meaning {
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--foreground);
  }

  .romaji {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--primary);
  }
`;

const ReadingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  width: 100%;

  .reading-box {
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 0.75rem;
    text-align: center;

    .label {
      font-size: 0.68rem;
      font-weight: 800;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .val {
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--foreground);
      margin-top: 0.2rem;
    }
  }
`;

const AudioBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 0.75rem;
  border-radius: 14px;
  background: var(--primary);
  color: white;
  font-size: 0.9rem;
  font-weight: 800;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

interface Props {
  kanji: KaiwaTargetKanji | null;
  onClose: () => void;
}

export function KanjiQuickModal({ kanji, onClose }: Props) {
  if (!kanji) return null;

  const handlePlayAudio = () => {
    playJapaneseAudio(kanji.char, { rate: 1.0 });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>✕</CloseBtn>

        <KanjiDisplayBox>{kanji.char}</KanjiDisplayBox>

        <InfoGroup>
          <span className="meaning">{kanji.meaning}</span>
          <span className="romaji">{kanji.romaji}</span>
        </InfoGroup>

        <ReadingsGrid>
          <div className="reading-box">
            <span className="label">Onyomi (音読み)</span>
            <div className="val">{kanji.onyomi.join(", ") || "-"}</div>
          </div>
          <div className="reading-box">
            <span className="label">Kunyomi (訓読み)</span>
            <div className="val">{kanji.kunyomi.join(", ") || "-"}</div>
          </div>
        </ReadingsGrid>

        <AudioBtn onClick={handlePlayAudio}>
          🔊 Dengarkan Suara Kanji ({kanji.char})
        </AudioBtn>
      </ModalCard>
    </ModalOverlay>
  );
}
