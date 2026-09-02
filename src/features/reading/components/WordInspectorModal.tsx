"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { InspectedWordData } from "../hooks/useReading";
import { useProgress } from "@/context/ProgressContext";

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const ModalBox = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.85rem 1.75rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: var(--foreground);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }
`;

const ReadingHeader = styled.div`
  font-size: 0.95rem;
  font-weight: 850;
  color: #38bdf8;
  margin-bottom: 0.2rem;
`;

const KanjiText = styled.h2`
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--foreground);
  margin: 0 0 0.5rem 0;
  font-family: var(--font-japanese, "Noto Sans JP", sans-serif);
`;

const MeaningBox = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.85rem 1rem;
  width: 100%;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.45;
  margin-bottom: 1.35rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
`;

const ActionBtn = styled.button<{ $primary?: boolean; $saved?: boolean }>`
  flex: 1;
  height: 44px;
  border-radius: 12px;
  font-weight: 850;
  font-size: 0.88rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: all 0.18s ease;

  ${({ $primary, $saved }) =>
    $saved
      ? `
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.3);
  `
      : $primary
      ? `
    background: #3b82f6;
    color: white;
    border: none;
    border-bottom: 3px solid #2563eb;
    &:hover { filter: brightness(1.1); }
  `
      : `
    background: rgba(255, 255, 255, 0.06);
    color: var(--foreground);
    border: 1px solid var(--border);
    &:hover { background: rgba(255, 255, 255, 0.12); }
  `}
`;

interface WordInspectorModalProps {
  word: InspectedWordData;
  onClose: () => void;
  onPlayTTS: (text: string) => void;
}

export const WordInspectorModal: React.FC<WordInspectorModalProps> = ({
  word,
  onClose,
  onPlayTTS,
}) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { updateSRS } = useProgress();

  const handleSaveToVocab = () => {
    const key = word.kanji || word.reading;
    updateSRS(key, 3); // Save into SRS Leitner deck at level 1/3
    setIsSaved(true);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>✕</CloseBtn>

        <ReadingHeader>{word.reading}</ReadingHeader>
        <KanjiText>{word.kanji || word.reading}</KanjiText>

        <MeaningBox>{word.meaning}</MeaningBox>

        <ButtonRow>
          <ActionBtn onClick={() => onPlayTTS(word.kanji || word.reading)}>
            🔊 Putar Audio
          </ActionBtn>

          <ActionBtn $primary $saved={isSaved} onClick={handleSaveToVocab}>
            {isSaved ? "Tersimpan 📌" : "Simpan Kata 📌"}
          </ActionBtn>
        </ButtonRow>
      </ModalBox>
    </ModalOverlay>
  );
};
