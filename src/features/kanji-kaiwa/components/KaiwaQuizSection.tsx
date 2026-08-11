"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { KaiwaQuizQuestion } from "../types";

const QuizContainer = styled.div`
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

const QuizHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1.5px dashed var(--border);
  padding-bottom: 0.75rem;

  h3 {
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--foreground);
    margin: 0;
  }

  .badge {
    font-size: 0.75rem;
    font-weight: 800;
    color: #6366f1;
    background: rgba(99, 102, 241, 0.12);
    padding: 0.25rem 0.65rem;
    border-radius: 99px;
  }
`;

const ContextBox = styled.div`
  background: var(--background);
  border: 1.5px solid var(--border);
  border-radius: 16px;
  padding: 1.25rem;
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--foreground);
  text-align: center;
  line-height: 1.6;
  font-family: "'Klee One', 'Hiragino Kaku Gothic Pro', 'Yu Gothic', sans-serif";
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const OptionButton = styled.button<{
  $selected?: boolean;
  $isCorrect?: boolean | null;
}>`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 1rem;
  border-radius: 16px;
  background: ${({ $isCorrect, $selected }) =>
    $isCorrect === true
      ? "rgba(16, 185, 129, 0.15)"
      : $isCorrect === false && $selected
        ? "rgba(239, 68, 68, 0.15)"
        : "var(--background)"};
  border: 2px solid
    ${({ $isCorrect, $selected }) =>
      $isCorrect === true
        ? "#10b981"
        : $isCorrect === false && $selected
          ? "#ef4444"
          : $selected
            ? "#6366f1"
            : "var(--border)"};
  color: var(--foreground);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover:not(:disabled) {
    border-color: #6366f1;
    transform: translateY(-2px);
  }

  .char {
    font-size: 1.8rem;
    font-weight: 900;
    color: var(--primary);
    width: 42px;
    height: 42px;
    background: var(--surface);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
    flex-shrink: 0;
  }

  .details {
    display: flex;
    flex-direction: column;

    .reading {
      font-size: 0.95rem;
      font-weight: 800;
    }
    .meaning {
      font-size: 0.75rem;
      color: var(--text-secondary);
    }
  }
`;

const ExplanationBox = styled.div<{ $correct: boolean }>`
  background: ${({ $correct }) =>
    $correct ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"};
  border: 1.5px solid ${({ $correct }) => ($correct ? "#10b981" : "#ef4444")};
  border-radius: 14px;
  padding: 1rem;
  font-size: 0.85rem;
  color: var(--foreground);
  line-height: 1.5;
`;

const NextBtn = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 14px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;
  align-self: flex-end;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

interface Props {
  questions: KaiwaQuizQuestion[];
  onCompleteQuiz: (score: number) => void;
}

export function KaiwaQuizSection({ questions, onCompleteQuiz }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIdx];

  const handleSelectOption = (char: string) => {
    if (isAnswered) return;
    setSelectedOption(char);
    setIsAnswered(true);

    if (char === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onCompleteQuiz(score + (selectedOption === currentQ.correctAnswer ? 1 : 0));
    }
  };

  const isCorrect = selectedOption === currentQ.correctAnswer;

  return (
    <QuizContainer>
      <QuizHeader>
        <h3>🧩 Kuis Rumpang Dialog Percakapan</h3>
        <span className="badge">
          Soal {currentIdx + 1} dari {questions.length}
        </span>
      </QuizHeader>

      <ContextBox>{currentQ.dialogueContext}</ContextBox>

      <OptionsGrid>
        {currentQ.options.map((opt) => {
          const selected = selectedOption === opt.char;

          return (
            <OptionButton
              key={opt.char}
              $selected={selected}
              $isCorrect={isAnswered ? opt.char === currentQ.correctAnswer : null}
              disabled={isAnswered}
              onClick={() => handleSelectOption(opt.char)}
            >
              <div className="char">{opt.char}</div>
              <div className="details">
                <span className="reading">{opt.reading}</span>
                <span className="meaning">{opt.meaning}</span>
              </div>
            </OptionButton>
          );
        })}
      </OptionsGrid>

      {isAnswered && (
        <>
          <ExplanationBox $correct={isCorrect}>
            <strong>{isCorrect ? "🎉 Jawaban Benar!" : "❌ Belum Tepat!"}</strong>
            <p style={{ margin: "0.35rem 0 0 0" }}>{currentQ.explanation}</p>
          </ExplanationBox>

          <NextBtn onClick={handleNext}>
            {currentIdx < questions.length - 1 ? "Soal Selanjutnya →" : "Lihat Hasil Skenario →"}
          </NextBtn>
        </>
      )}
    </QuizContainer>
  );
}
