"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { kaiwaScenarios } from "@/features/kanji-kaiwa/data/kaiwaScenarios";
import { KaiwaScenario, KaiwaTargetKanji } from "@/features/kanji-kaiwa/types";
import { KaiwaHeader } from "@/features/kanji-kaiwa/components/KaiwaHeader";
import { KaiwaDialogueStream } from "@/features/kanji-kaiwa/components/KaiwaDialogueStream";
import { KanjiQuickModal } from "@/features/kanji-kaiwa/components/KanjiQuickModal";
import { KaiwaQuizSection } from "@/features/kanji-kaiwa/components/KaiwaQuizSection";
import { KaiwaSummaryCard } from "@/features/kanji-kaiwa/components/KaiwaSummaryCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem 1rem 96px 1rem;
  gap: 1.25rem;
`;

const ModeTabsRow = styled.div`
  display: flex;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 16px;
  padding: 4px;
  width: 100%;
`;

const TabBtn = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 0.65rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  background: ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  color: ${({ $active }) => ($active ? "white" : "var(--text-secondary)")};

  &:hover {
    color: ${({ $active }) => ($active ? "white" : "var(--foreground)")};
  }
`;

export default function KanjiKaiwaLabPage() {
  const [activeScenario, setActiveScenario] = useState<KaiwaScenario>(
    kaiwaScenarios[0],
  );
  const [activeTab, setActiveTab] = useState<"dialogue" | "quiz">("dialogue");
  const [showFurigana, setShowFurigana] = useState(true);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [selectedKanjiModal, setSelectedKanjiModal] =
    useState<KaiwaTargetKanji | null>(null);

  const [isCompleted, setIsCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleToggleAudioSpeed = () => {
    setAudioSpeed((prev) => (prev === 1.0 ? 0.7 : 1.0));
  };

  const handleCompleteQuiz = (score: number) => {
    setQuizScore(score);
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setIsCompleted(false);
    setActiveTab("dialogue");
  };

  return (
    <Container>
      <Breadcrumbs
        items={[{ label: "Labs", href: "/development" }]}
        current="Kanji Kaiwa Studio"
      />

      <KaiwaHeader
        scenarios={kaiwaScenarios}
        activeScenario={activeScenario}
        onSelectScenario={(s) => {
          setActiveScenario(s);
          setIsCompleted(false);
          setActiveTab("dialogue");
        }}
        showFurigana={showFurigana}
        onToggleFurigana={() => setShowFurigana(!showFurigana)}
        audioSpeed={audioSpeed}
        onToggleAudioSpeed={handleToggleAudioSpeed}
      />

      {!isCompleted ? (
        <>
          <ModeTabsRow>
            <TabBtn
              $active={activeTab === "dialogue"}
              onClick={() => setActiveTab("dialogue")}
            >
              💬 Percakapan Kaiwa
            </TabBtn>
            <TabBtn
              $active={activeTab === "quiz"}
              onClick={() => setActiveTab("quiz")}
            >
              🧩 Kuis Rumpang Dialog ({activeScenario.quizQuestions.length})
            </TabBtn>
          </ModeTabsRow>

          {activeTab === "dialogue" ? (
            <KaiwaDialogueStream
              lines={activeScenario.dialogueLines}
              targetKanjiList={activeScenario.targetKanjiList}
              showFurigana={showFurigana}
              audioSpeed={audioSpeed}
              onSelectKanji={(k) => setSelectedKanjiModal(k)}
            />
          ) : (
            <KaiwaQuizSection
              questions={activeScenario.quizQuestions}
              onCompleteQuiz={handleCompleteQuiz}
            />
          )}
        </>
      ) : (
        <KaiwaSummaryCard
          scenario={activeScenario}
          score={quizScore}
          totalQuiz={activeScenario.quizQuestions.length}
          onRestart={handleRestart}
        />
      )}

      <KanjiQuickModal
        kanji={selectedKanjiModal}
        onClose={() => setSelectedKanjiModal(null)}
      />
    </Container>
  );
}
