"use client";

import React from "react";
import styled from "styled-components";
import { ReadingParagraph } from "@/data/reading";
import { InspectedWordData } from "../hooks/useReading";

const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ParagraphCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.75rem 2rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 1.15rem;

  @media (max-width: 640px) {
    padding: 1.15rem 1rem;
    border-radius: 16px;
    gap: 0.85rem;
  }
`;

const JapaneseTextRow = styled.div<{ $showFurigana: boolean }>`
  font-size: 1.35rem;
  line-height: ${({ $showFurigana }) => ($showFurigana ? "2.3" : "1.8")};
  color: var(--foreground);
  font-weight: 750;
  letter-spacing: 0.03em;
  font-family: var(--font-japanese, "Noto Sans JP", sans-serif);

  ruby {
    margin: 0 1px;
    padding: 0 2px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: rgba(59, 130, 246, 0.2);
    }
  }

  rt {
    font-size: 0.65em;
    color: #38bdf8;
    font-weight: 800;
    display: ${({ $showFurigana }) => ($showFurigana ? "ruby-text" : "none")};
  }

  @media (max-width: 640px) {
    font-size: 1.12rem;
    line-height: ${({ $showFurigana }) => ($showFurigana ? "2.1" : "1.75")};
  }
`;

const ParagraphActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--border);

  @media (max-width: 540px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.65rem;
  }
`;

const TranslationText = styled.p`
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
  font-weight: 600;

  @media (max-width: 640px) {
    font-size: 0.85rem;
  }
`;

const AudioPlayBtn = styled.button`
  background: rgba(59, 130, 246, 0.12);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 10px;
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 850;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(59, 130, 246, 0.22);
  }

  @media (max-width: 540px) {
    align-self: flex-end;
    font-size: 0.75rem;
    padding: 0.3rem 0.65rem;
  }
`;

interface InteractivePassageViewerProps {
  paragraphs: ReadingParagraph[];
  showFurigana: boolean;
  showTranslation: boolean;
  translationLang: "ID" | "EN";
  onInspectWord: (word: InspectedWordData) => void;
  onPlayTTS: (text: string) => void;
}

export const InteractivePassageViewer: React.FC<InteractivePassageViewerProps> = ({
  paragraphs,
  showFurigana,
  showTranslation,
  translationLang,
  onInspectWord,
  onPlayTTS,
}) => {
  // Handle click on Japanese text element
  const handleTextClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const rubyEl = target.closest("ruby");

    if (rubyEl) {
      // Extract text content and reading
      const rtEl = rubyEl.querySelector("rt");
      const reading = rtEl ? rtEl.innerText.trim() : "";
      const kanjiText = rubyEl.innerText.replace(reading, "").trim();

      onInspectWord({
        kanji: kanjiText,
        reading: reading || kanjiText,
        romaji: "",
        meaning: `Klik untuk melihat arti kata "${kanjiText || reading}" di Kamus.`,
      });
    }
  };

  return (
    <ViewerContainer>
      {paragraphs.map((p, idx) => {
        const translation = translationLang === "ID" && p.indonesian ? p.indonesian : p.english;

        return (
          <ParagraphCard key={idx}>
            <JapaneseTextRow
              $showFurigana={showFurigana}
              onClick={handleTextClick}
              dangerouslySetInnerHTML={{ __html: p.japanese }}
            />

            <ParagraphActionRow>
              {showTranslation && <TranslationText>{translation}</TranslationText>}

              <AudioPlayBtn onClick={() => onPlayTTS(p.japanese)}>
                🔊 Dengarkan
              </AudioPlayBtn>
            </ParagraphActionRow>
          </ParagraphCard>
        );
      })}
    </ViewerContainer>
  );
};
