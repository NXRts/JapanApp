"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { DetailedItemData, QuizResultSummary } from "../types";
import { toKana, toRomaji } from "wanakana";
import { playJapaneseAudio } from "@/lib/audio";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 540px;
  margin: 0 auto;
`;

const QuizHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  background: var(--surface);
  border-radius: 99px;
  border: 1px solid var(--border);
  overflow: hidden;

  .bar {
    height: 100%;
    background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
    transition: width 0.3s ease;
  }
`;

const QuestionCard = styled.div`
  width: 100%;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 28px;
  padding: 2rem 1.5rem;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
`;

const TargetChar = styled.div`
  font-size: 4.5rem;
  font-weight: 900;
  font-family: "Noto Sans JP", sans-serif;
  color: var(--foreground);
`;

const PromptText = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-secondary);
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  width: 100%;
`;

const OptionBtn = styled.button<{ $state?: "correct" | "incorrect" | "default" }>`
  padding: 1rem;
  border-radius: 16px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid var(--border);

  background: ${({ $state }) =>
    $state === "correct"
      ? "#10b981"
      : $state === "incorrect"
        ? "#ef4444"
        : "var(--background)"};

  color: ${({ $state }) =>
    $state === "default" || !$state ? "var(--foreground)" : "white"};

  border-color: ${({ $state }) =>
    $state === "correct"
      ? "#10b981"
      : $state === "incorrect"
        ? "#ef4444"
        : "var(--border)"};

  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary);
  }
`;

const TextInput = styled.input`
  width: 100%;
  padding: 0.85rem 1.2rem;
  border-radius: 14px;
  border: 2px solid var(--border);
  background: var(--background);
  color: var(--foreground);
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 0.9rem;
  border-radius: 16px;
  background: var(--primary);
  color: white;
  font-size: 1rem;
  font-weight: 800;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const SummaryModal = styled.div`
  width: 100%;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 32px;
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  box-shadow: var(--shadow-lg);

  .score {
    font-size: 3.5rem;
    font-weight: 900;
    color: var(--primary);
  }
`;

interface IntegrativeQuizProps {
  items: DetailedItemData[];
  onComplete: (summary: QuizResultSummary) => void;
}

export function IntegrativeQuiz({ items, onComplete }: IntegrativeQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [typedInput, setTypedInput] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [answersState, setAnswersState] = useState<Record<string, boolean>>({});

  const currentItem = items[currentIndex] || items[0];

  // Alternating question modes: 0 = Multiple Choice, 1 = Typing Romaji/Kana
  const questionType = currentIndex % 2 === 0 ? "mc" : "typing";

  // Dummy options generator for MC
  const options = React.useMemo(() => {
    const wrongList = ["Air", "Hari", "Matahari", "Bulan", "Api", "Orang", "Gunung", "Sungai"]
      .filter((m) => m !== currentItem.meaning);
    const shuffledWrong = wrongList.sort(() => 0.5 - Math.random()).slice(0, 3);
    return [currentItem.meaning, ...shuffledWrong].sort(() => 0.5 - Math.random());
  }, [currentItem]);

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === currentItem.meaning;
    setAnswersState((prev) => ({ ...prev, [currentItem.char]: isCorrect }));

    if (isCorrect) {
      playJapaneseAudio(currentItem.char);
    }
  };

  const handleTypedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnswered || !typedInput.trim()) return;

    const normalizedTyped = toRomaji(typedInput.trim().toLowerCase());
    const expectedRomaji = currentItem.romaji.toLowerCase();

    const isCorrect =
      normalizedTyped === expectedRomaji ||
      typedInput.trim() === toKana(expectedRomaji);

    setIsAnswered(true);
    setAnswersState((prev) => ({ ...prev, [currentItem.char]: isCorrect }));

    if (isCorrect) {
      playJapaneseAudio(currentItem.char);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setTypedInput("");
      setIsAnswered(false);
    } else {
      // Calculate final results
      const total = items.length;
      let correctCount = 0;
      const mastered: string[] = [];
      const review: string[] = [];

      items.forEach((item) => {
        if (answersState[item.char]) {
          correctCount += 1;
          mastered.push(item.char);
        } else {
          review.push(item.char);
        }
      });

      const percentage = Math.round((correctCount / total) * 100);
      const summary: QuizResultSummary = {
        totalQuestions: total,
        correctCount,
        scorePercentage: percentage,
        expEarned: correctCount * 25 + 50,
        masteredChars: mastered,
        needsReviewChars: review,
      };

      onComplete(summary);
    }
  };

  return (
    <Container>
      <QuizHeader>
        <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "var(--text-secondary)" }}>
          Kuis Integratif ({currentIndex + 1}/{items.length})
        </span>
        <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "var(--primary)" }}>
          {questionType === "mc" ? "Pilihan Ganda" : "Ketik Cara Baca"}
        </span>
      </QuizHeader>

      <ProgressTrack>
        <div className="bar" style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }} />
      </ProgressTrack>

      <QuestionCard>
        <TargetChar>{currentItem.char}</TargetChar>

        {questionType === "mc" ? (
          <>
            <PromptText>Pilih arti Bahasa Indonesia yang paling tepat:</PromptText>
            <OptionsGrid>
              {options.map((opt, i) => {
                let state: "correct" | "incorrect" | "default" = "default";
                if (isAnswered) {
                  if (opt === currentItem.meaning) state = "correct";
                  else if (selectedOption === opt) state = "incorrect";
                }
                return (
                  <OptionBtn
                    key={i}
                    $state={state}
                    onClick={() => handleSelectOption(opt)}
                  >
                    {opt}
                  </OptionBtn>
                );
              })}
            </OptionsGrid>
          </>
        ) : (
          <form onSubmit={handleTypedSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <PromptText>Ketik cara baca Romaji atau Hiragana untuk {currentItem.char}:</PromptText>
            <TextInput
              type="text"
              placeholder="Contoh: hi / nichiyoubi..."
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              disabled={isAnswered}
              autoFocus
            />

            {!isAnswered ? (
              <SubmitBtn type="submit">Cek Jawaban</SubmitBtn>
            ) : (
              <div
                style={{
                  padding: "0.75rem",
                  borderRadius: "12px",
                  background: answersState[currentItem.char]
                    ? "rgba(16, 185, 129, 0.12)"
                    : "rgba(239, 68, 68, 0.12)",
                  color: answersState[currentItem.char] ? "#059669" : "#dc2626",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                }}
              >
                {answersState[currentItem.char]
                  ? "🎉 Benar Presisi!"
                  : `❌ Kurang tepat. Jawaban benar: ${currentItem.romaji}`}
              </div>
            )}
          </form>
        )}

        {isAnswered && (
          <SubmitBtn onClick={handleNext} style={{ marginTop: "1rem" }}>
            {currentIndex === items.length - 1 ? "Selesaikan Evaluasi 🎉" : "Soal Berikutnya →"}
          </SubmitBtn>
        )}
      </QuestionCard>
    </Container>
  );
}
