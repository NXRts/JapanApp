"use client";

import React, { useMemo } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { readingPassages } from "@/data/reading";
import { useReading } from "./hooks/useReading";
import { InteractivePassageViewer } from "./components/InteractivePassageViewer";
import { WordInspectorModal } from "./components/WordInspectorModal";
import { ReadingQuizSection } from "./components/ReadingQuizSection";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 6rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 0.75rem 0.75rem 110px 0.75rem;
  }
`;

const StoryHeaderCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  @media (max-width: 640px) {
    padding: 1.25rem 1.15rem;
    border-radius: 20px;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
`;

const LevelTag = styled.span<{ $level: string }>`
  background: ${({ $level }) =>
    $level === "N5"
      ? "rgba(16, 185, 129, 0.15)"
      : $level === "N4"
      ? "rgba(59, 130, 246, 0.15)"
      : $level === "N3"
      ? "rgba(245, 158, 11, 0.15)"
      : "rgba(239, 68, 68, 0.15)"};
  color: ${({ $level }) =>
    $level === "N5"
      ? "#10b981"
      : $level === "N4"
      ? "#3b82f6"
      : $level === "N3"
      ? "#f59e0b"
      : "#ef4444"};
  border: 1px solid
    ${({ $level }) =>
      $level === "N5"
        ? "rgba(16, 185, 129, 0.3)"
        : $level === "N4"
        ? "rgba(59, 130, 246, 0.3)"
        : $level === "N3"
        ? "rgba(245, 158, 11, 0.3)"
        : "rgba(239, 68, 68, 0.3)"};
  font-size: 0.75rem;
  font-weight: 900;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
`;

const TimeTag = styled.span`
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
`;

const StoryMainTitle = styled.h1`
  font-size: 2.1rem;
  font-weight: 900;
  color: var(--foreground);
  margin: 0;

  @media (max-width: 640px) {
    font-size: 1.6rem;
  }
`;

const StoryIndonesianTitle = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 700;
`;

/* Control Bar */
const ControlBar = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 0.85rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  position: sticky;
  top: 72px;
  z-index: 99;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 640px) {
    padding: 0.75rem 1rem;
    top: 64px;
  }
`;

const ToggleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.15rem;
  flex-wrap: wrap;
`;

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--foreground);
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #3b82f6;
  cursor: pointer;
`;

const LangSelect = styled.select`
  height: 32px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0 0.5rem;
  color: var(--foreground);
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
`;

const AudioAllBtn = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.4rem 0.85rem;
  font-size: 0.82rem;
  font-weight: 850;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.15s ease;

  &:hover {
    filter: brightness(1.1);
  }
`;

const FooterNavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
`;

const NavBtn = styled(Link)<{ $primary?: boolean }>`
  padding: 0.65rem 1.25rem;
  border-radius: 12px;
  font-size: 0.88rem;
  font-weight: 850;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.15s ease;

  ${({ $primary }) =>
    $primary
      ? `
    background: #3b82f6;
    color: white;
    &:hover { filter: brightness(1.1); }
  `
      : `
    background: rgba(255, 255, 255, 0.05);
    color: var(--foreground);
    border: 1px solid var(--border);
    &:hover { background: rgba(255, 255, 255, 0.12); }
  `}
`;

const NotFoundBox = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  color: var(--text-secondary);
`;

interface ReadingDetailFeatureProps {
  id: string;
}

export default function ReadingDetailFeature({ id }: ReadingDetailFeatureProps) {
  const passage = useMemo(() => readingPassages.find((p) => p.id === id), [id]);

  const {
    showFurigana,
    setShowFurigana,
    showTranslation,
    setShowTranslation,
    translationLang,
    setTranslationLang,
    inspectedWord,
    setInspectedWord,
    speakText,
    completeReadingPassage,
  } = useReading();

  if (!passage) {
    return (
      <Container>
        <NotFoundBox>
          <h2>📖 Cerita tidak ditemukan.</h2>
          <NavBtn href="/study/reading">← Kembali ke Daftar Cerita</NavBtn>
        </NotFoundBox>
      </Container>
    );
  }

  const currentIndex = readingPassages.findIndex((p) => p.id === passage.id);
  const nextPassage =
    currentIndex >= 0 && currentIndex < readingPassages.length - 1
      ? readingPassages[currentIndex + 1]
      : null;

  const fullJapaneseText = passage.paragraphs.map((p) => p.japanese).join(" ");

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Modul Bacaan", href: "/study/reading" },
        ]}
        current={passage.title}
      />

      <StoryHeaderCard>
        <MetaRow>
          <LevelTag $level={passage.level}>{passage.level}</LevelTag>
          <TimeTag>⏱️ {passage.estimatedTime}</TimeTag>
          {passage.tags.map((t) => (
            <TimeTag key={t}>#{t}</TimeTag>
          ))}
        </MetaRow>

        <StoryMainTitle>{passage.title}</StoryMainTitle>
        {passage.indonesianTitle && (
          <StoryIndonesianTitle>{passage.indonesianTitle}</StoryIndonesianTitle>
        )}
      </StoryHeaderCard>

      {/* Controls Bar */}
      <ControlBar>
        <ToggleGroup>
          <ToggleLabel>
            <CheckboxInput
              type="checkbox"
              checked={showFurigana}
              onChange={(e) => setShowFurigana(e.target.checked)}
            />
            Furigana (Cara Baca)
          </ToggleLabel>

          <ToggleLabel>
            <CheckboxInput
              type="checkbox"
              checked={showTranslation}
              onChange={(e) => setShowTranslation(e.target.checked)}
            />
            Terjemahan
          </ToggleLabel>

          {showTranslation && (
            <LangSelect
              value={translationLang}
              onChange={(e) => setTranslationLang(e.target.value as "ID" | "EN")}
            >
              <option value="ID">Bahasa Indonesia 🇮🇩</option>
              <option value="EN">English 🇬🇧</option>
            </LangSelect>
          )}
        </ToggleGroup>

        <AudioAllBtn onClick={() => speakText(fullJapaneseText)}>
          🔊 Putar Semua Audio
        </AudioAllBtn>
      </ControlBar>

      {/* Passage Paragraphs */}
      <InteractivePassageViewer
        paragraphs={passage.paragraphs}
        showFurigana={showFurigana}
        showTranslation={showTranslation}
        translationLang={translationLang}
        onInspectWord={(w) => setInspectedWord(w)}
        onPlayTTS={(txt) => speakText(txt)}
      />

      {/* Reading Comprehension Quizzes */}
      <ReadingQuizSection
        quizzes={passage.quizzes}
        onComplete={(score, total) =>
          completeReadingPassage(passage.id, score, total)
        }
      />

      <FooterNavRow>
        <NavBtn href="/study/reading">← Kembali ke Daftar</NavBtn>
        {nextPassage && (
          <NavBtn $primary href={`/study/reading/${nextPassage.id}`}>
            Cerita Berikutnya →
          </NavBtn>
        )}
      </FooterNavRow>

      {/* Word Inspector Modal */}
      {inspectedWord && (
        <WordInspectorModal
          word={inspectedWord}
          onClose={() => setInspectedWord(null)}
          onPlayTTS={(txt) => speakText(txt)}
        />
      )}
    </Container>
  );
}
