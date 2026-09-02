"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { ReadingQuiz } from "@/data/reading";

const QuizCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 640px) {
    padding: 1.35rem 1.15rem;
    border-radius: 20px;
  }
`;

const QuizTitleHeader = styled.h2`
  font-size: 1.35rem;
  font-weight: 850;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
`;

const QuestionText = styled.div`
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--foreground);
  line-height: 1.45;
`;

const OptionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const OptionBtn = styled.button<{
  $selected?: boolean;
  $isCorrect?: boolean;
  $isSubmitted?: boolean;
}>`
  width: 100%;
  padding: 1rem 1.25rem;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 800;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ $selected, $isCorrect, $isSubmitted }) =>
    $isSubmitted
      ? $isCorrect
        ? `
        background: rgba(34, 197, 94, 0.15);
        color: #22c55e;
        border: 2px solid #22c55e;
      `
        : $selected
        ? `
        background: rgba(239, 68, 68, 0.15);
        color: #ef4444;
        border: 2px solid #ef4444;
      `
        : `
        background: rgba(255, 255, 255, 0.02);
        color: var(--text-secondary);
        border: 1px solid var(--border);
        opacity: 0.6;
      `
      : $selected
      ? `
      background: rgba(59, 130, 246, 0.15);
      color: #3b82f6;
      border: 2px solid #3b82f6;
    `
      : `
      background: rgba(255, 255, 255, 0.03);
      color: var(--foreground);
      border: 1px solid var(--border);
      &:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: var(--primary);
      }
    `}
`;

const ExplanationBox = styled.div`
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  font-size: 0.88rem;
  color: #38bdf8;
  line-height: 1.45;
  font-weight: 700;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 48px;
  background: #3b82f6;
  color: white;
  border: none;
  border-bottom: 4px solid #2563eb;
  border-radius: 14px;
  font-size: 0.98rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-bottom: none;
  }
`;

/* Completion Banner */
const CompletionCard = styled.div`
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`;

const RewardTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const CompletionTitle = styled.div`
  font-size: 1.05rem;
  font-weight: 900;
  color: #22c55e;
`;

const CompletionSub = styled.div`
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 700;
`;

const RewardChip = styled.div`
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #f59e0b;
  font-size: 0.88rem;
  font-weight: 900;
  padding: 0.4rem 0.85rem;
  border-radius: 12px;
`;

interface ReadingQuizSectionProps {
  quizzes: ReadingQuiz[];
  onComplete: (score: number, total: number) => void;
}

export const ReadingQuizSection: React.FC<ReadingQuizSectionProps> = ({
  quizzes,
  onComplete,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hasClaimed, setHasClaimed] = useState<boolean>(false);

  const handleSelectOption = (qIdx: number, oIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    quizzes.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    onComplete(score, quizzes.length);
    setHasClaimed(true);
  };

  const allAnswered = quizzes.every((_, idx) => selectedAnswers[idx] !== undefined);

  return (
    <QuizCard>
      <QuizTitleHeader>📝 Kuis Pemahaman Reading</QuizTitleHeader>

      {quizzes.map((q, qIdx) => (
        <QuestionBox key={qIdx}>
          <QuestionText>
            {qIdx + 1}. {q.question}
          </QuestionText>

          <OptionsGrid>
            {q.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[qIdx] === oIdx;
              const isCorrect = q.correctAnswerIndex === oIdx;
              return (
                <OptionBtn
                  key={oIdx}
                  $selected={isSelected}
                  $isCorrect={isCorrect}
                  $isSubmitted={isSubmitted}
                  onClick={() => handleSelectOption(qIdx, oIdx)}
                >
                  <span>{opt}</span>
                  {isSubmitted && isCorrect && <span>✅</span>}
                  {isSubmitted && isSelected && !isCorrect && <span>❌</span>}
                </OptionBtn>
              );
            })}
          </OptionsGrid>

          {isSubmitted && <ExplanationBox>💡 {q.explanation}</ExplanationBox>}
        </QuestionBox>
      ))}

      {!isSubmitted ? (
        <SubmitBtn disabled={!allAnswered} onClick={handleSubmit}>
          Kirim Jawaban & Klaim Hadiah 🎁
        </SubmitBtn>
      ) : (
        <CompletionCard>
          <RewardTextGroup>
            <CompletionTitle>
              Kuis Selesai! Skor: {calculateScore()} / {quizzes.length}
            </CompletionTitle>
            <CompletionSub>
              Selamat! Kamu telah menyelesaikan evaluasi pemahaman cerita ini.
            </CompletionSub>
          </RewardTextGroup>
          <RewardChip>+40 EXP ⚡ | +20 Gems 💎</RewardChip>
        </CompletionCard>
      )}
    </QuizCard>
  );
};
