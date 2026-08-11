"use client";

import React from "react";
import styled from "styled-components";
import { KaiwaDialogueLine, KaiwaTargetKanji } from "../types";
import { playJapaneseAudio } from "@/lib/audio";

const StreamContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  padding: 0.5rem 0;
`;

const BubbleRow = styled.div<{ $role: "left" | "right" }>`
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  flex-direction: ${({ $role }) => ($role === "right" ? "row-reverse" : "row")};
  width: 100%;
`;

const AvatarCircle = styled.div`
  font-size: 1.8rem;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--surface);
  border: 1.5px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
`;

const BubbleContent = styled.div<{ $role: "left" | "right" }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $role }) => ($role === "right" ? "flex-end" : "flex-start")};
  max-width: 82%;

  .speaker-name {
    font-size: 0.75rem;
    font-weight: 800;
    color: var(--text-secondary);
    margin-bottom: 0.3rem;
  }
`;

const ChatCard = styled.div<{ $role: "left" | "right" }>`
  background: ${({ $role }) =>
    $role === "right"
      ? "linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)"
      : "var(--surface)"};
  border: 1.5px solid
    ${({ $role }) => ($role === "right" ? "rgba(99, 102, 241, 0.3)" : "var(--border)")};
  border-radius: ${({ $role }) =>
    $role === "right" ? "20px 4px 20px 20px" : "4px 20px 20px 20px"};
  padding: 1.1rem 1.35rem;
  box-shadow: var(--shadow-sm);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const JapaneseTextContainer = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--foreground);
  line-height: 1.8;
  font-family: "'Klee One', 'Hiragino Kaku Gothic Pro', 'Yu Gothic', sans-serif";

  .kanji-highlight {
    background: rgba(99, 102, 241, 0.2);
    color: #818cf8;
    padding: 2px 6px;
    border-radius: 6px;
    border: 1px solid rgba(99, 102, 241, 0.4);
    cursor: pointer;
    font-weight: 900;
    transition: all 0.2s ease;

    &:hover {
      background: #6366f1;
      color: white;
      transform: scale(1.08);
    }
  }
`;

const FuriganaText = styled.div`
  font-size: 0.78rem;
  font-weight: 700;
  color: #60a5fa;
  letter-spacing: 0.03em;
`;

const TranslationText = styled.div`
  font-size: 0.82rem;
  color: var(--text-secondary);
  font-style: italic;
  line-height: 1.4;
`;

const AudioPlayBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.35rem 0.65rem;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--primary);
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }
`;

interface Props {
  lines: KaiwaDialogueLine[];
  targetKanjiList: KaiwaTargetKanji[];
  showFurigana: boolean;
  audioSpeed: number;
  onSelectKanji: (kanji: KaiwaTargetKanji) => void;
}

export function KaiwaDialogueStream({
  lines,
  targetKanjiList,
  showFurigana,
  audioSpeed,
  onSelectKanji,
}: Props) {
  const handlePlayLineAudio = (text: string) => {
    playJapaneseAudio(text, { rate: audioSpeed });
  };

  const renderJapaneseText = (line: KaiwaDialogueLine) => {
    const rawText = line.textJp;
    // Replace **Kanji** markdown formatting into interactive buttons
    const parts = rawText.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const kanjiChar = part.slice(2, -2);
        const foundKanji = targetKanjiList.find((k) => k.char === kanjiChar);

        return (
          <span
            key={index}
            className="kanji-highlight"
            onClick={() => {
              if (foundKanji) onSelectKanji(foundKanji);
              else onSelectKanji({ char: kanjiChar, romaji: "", meaning: "Target Kanji", onyomi: [], kunyomi: [] });
            }}
          >
            {kanjiChar}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <StreamContainer>
      {lines.map((line) => (
        <BubbleRow key={line.id} $role={line.speakerRole}>
          <AvatarCircle>{line.avatar}</AvatarCircle>

          <BubbleContent $role={line.speakerRole}>
            <span className="speaker-name">{line.speaker}</span>

            <ChatCard $role={line.speakerRole}>
              {showFurigana && <FuriganaText>{line.furigana}</FuriganaText>}

              <JapaneseTextContainer>
                {renderJapaneseText(line)}
              </JapaneseTextContainer>

              <TranslationText>{line.textId}</TranslationText>

              <AudioPlayBtn
                onClick={() =>
                  handlePlayLineAudio(line.audioText || line.textJp.replace(/\*\*/g, ""))
                }
              >
                🔊 Putar Audio Dialog
              </AudioPlayBtn>
            </ChatCard>
          </BubbleContent>
        </BubbleRow>
      ))}
    </StreamContainer>
  );
}
