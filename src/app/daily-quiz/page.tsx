"use client";

import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Link from "next/link";
import { toRomaji } from "wanakana";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SeededRandom, getTodaySeed } from "@/utils/seededRandom";
import { useProgress } from "@/context/ProgressContext";
import { TestResultStats } from "@/components/jlpt/TestResultStats";

// Styled Components (Reusing similar style to KanaQuizPage for consistency)
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(
    circle at center,
    rgba(16, 185, 129, 0.05) 0%,
    transparent 70%
  ); /* Green tint for Daily */
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 3rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const HeaderRight = styled.div`
  text-align: right;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

const BackButton = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.2s;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);

  &:hover {
    color: var(--primary);
    background: rgba(79, 70, 229, 0.1);
  }
`;

const QuizCard = styled.div`
  background: var(--surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 32px;
  border: 1px solid var(--border);
  padding: 4rem 3rem;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;

  @media (max-width: 600px) {
    padding: 2.5rem 1.5rem;
    border-radius: 24px;
  }
`;

const ProgressInfo = styled.div`
  position: absolute;
  top: 45px;
  right: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary);

  @media (max-width: 600px) {
    top: 40px;
    right: 20px;
    font-size: 0.85rem;
  }
`;

const Character = styled.div`
  font-size: 8rem;
  font-weight: 800;
  margin-bottom: 3.5rem;
  line-height: 1;
  background: linear-gradient(
    135deg,
    var(--foreground) 0%,
    var(--text-secondary) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));

  @media (max-width: 600px) {
    font-size: 5rem;
    margin-bottom: 2rem;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
`;

const OptionButton = styled.button<{
  $state?: "correct" | "incorrect" | "neutral";
}>`
  padding: 1.5rem;
  border-radius: 20px;
  border: 2px solid
    ${({ $state }) =>
      $state === "correct"
        ? "#10b981"
        : $state === "incorrect"
          ? "#ef4444"
          : "var(--border)"};
  background: ${({ $state }) =>
    $state === "correct"
      ? "rgba(16, 185, 129, 0.1)"
      : $state === "incorrect"
        ? "rgba(239, 68, 68, 0.1)"
        : "var(--surface)"};
  color: ${({ $state }) =>
    $state === "correct"
      ? "#10b981"
      : $state === "incorrect"
        ? "#ef4444"
        : "var(--foreground)"};
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: ${({ $state }) =>
    $state && $state !== "neutral" ? "none" : "auto"};
  box-shadow: ${({ $state }) =>
    $state === "neutral" ? "0 4px 6px -1px rgba(0, 0, 0, 0.05)" : "none"};

  &:hover {
    transform: ${({ $state }) =>
      $state === "neutral" ? "translateY(-3px)" : "none"};
    border-color: ${({ $state }) =>
      $state === "neutral" ? "#10b981" : ""}; /* Green hover for daily */
  }

  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
    font-size: 1.1rem;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background: var(--border);
  border-radius: 99px;
  margin-top: 1rem;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => `${$percent}%`};
  background: linear-gradient(90deg, #10b981, #059669);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 99px;
`;

const ResultOverlay = styled.div`
  text-align: center;
  animation: fadeIn 0.8s ease-out;
  padding: 3rem;
  background: var(--surface);
  border-radius: 32px;
  border: 1px solid var(--border);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

const Button = styled.button`
  padding: 1rem 3rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.4);
  }
`;

const ResetButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin-left: 0.5rem;

  &:hover {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    transform: rotate(180deg);
  }
`;

// Types
interface Question {
  char: string;
  answer: string; // romaji
  options: string[];
  type: "kana" | "kanji";
}

// Helper to shuffle arrays
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function KanaQuizPage() {
  const { progress, updateMastery, recordQuizResult, updateSRS } =
    useProgress();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAlreadyCompleted, setIsAlreadyCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<
    { char: string; answer: string; selected: string; isCorrect: boolean }[]
  >([]);

  const TOTAL_QUESTIONS = 10;
  const TODAY_SEED = getTodaySeed();

  const generateQuiz = useCallback(async () => {
    setLoading(true);
    try {
      // Check if already completed today
      const today = new Date().toISOString().split("T")[0];
      const completedToday = progress.quizHistory.some(
        (q) => q.date.split("T")[0] === today && q.type === "daily-challenge",
      );
      setIsAlreadyCompleted(completedToday);

      // Fetch Kana data
      const res = await fetch("/api/kana?type=all");
      const kanaData: string[] = await res.json();

      // Initialize seeded random for TODAY
      const rng = new SeededRandom(TODAY_SEED);

      // Create a pool of UNIQUE Romaji
      const uniqueRomajiPool = Array.from(
        new Set(kanaData.map((c) => toRomaji(c))),
      );

      const kanaQuestions: Question[] = [];

      // Seeded shuffle of all kana to pick selection
      const shuffledKana = rng.safeShuffle(kanaData);
      const selectedKana = shuffledKana.slice(0, TOTAL_QUESTIONS);

      selectedKana.forEach((char) => {
        const correctRomaji = toRomaji(char);

        // Generate distractors using seeded selection
        const availableDistractors = uniqueRomajiPool.filter(
          (r) => r !== correctRomaji,
        );
        const shuffledDistractors = rng.safeShuffle(availableDistractors);
        const distractors = shuffledDistractors.slice(0, 3);

        kanaQuestions.push({
          char,
          answer: correctRomaji,
          options: rng.safeShuffle([...distractors, correctRomaji]),
          type: "kana",
        });
      });

      setQuestions(kanaQuestions);
      setCurrentIndex(0);
      setScore(0);
      setIsFinished(false);
      setSelectedOption(null);
      setUserAnswers([]);
    } catch (error) {
      console.error("Failed to generate quiz", error);
    } finally {
      setLoading(false);
    }
  }, [TODAY_SEED, TOTAL_QUESTIONS]); // Removed progress.quizHistory to prevent auto-reset after recording result

  useEffect(() => {
    generateQuiz();
  }, [generateQuiz]);

  const handleAnswer = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);

    const isCorrect = option === questions[currentIndex].answer;
    const finalScoreForThisQuestion = isCorrect ? score + 1 : score;

    setUserAnswers((prev) => [
      ...prev,
      {
        char: questions[currentIndex].char,
        answer: questions[currentIndex].answer,
        selected: option,
        isCorrect,
      },
    ]);

    if (isCorrect) {
      setScore((s) => s + 1);
    }

    // Record individual mastery and SRS
    updateMastery(questions[currentIndex].char, isCorrect);
    updateSRS(questions[currentIndex].char, isCorrect ? 4 : 1);

    setTimeout(() => {
      if (currentIndex < TOTAL_QUESTIONS - 1) {
        setCurrentIndex((i) => i + 1);
        setSelectedOption(null);
      } else {
        // Record overall quiz result - label as daily-challenge
        recordQuizResult(
          finalScoreForThisQuestion,
          TOTAL_QUESTIONS,
          "daily-challenge",
        );
        setIsFinished(true);
      }
    }, 800);
  };

  if (loading || questions.length === 0) {
    return (
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Quiz Hub", href: "/quiz" },
          ]}
          current="Daily Challenge"
        />
        <div
          style={{
            textAlign: "center",
            fontSize: "1.25rem",
            color: "var(--text-secondary)",
            marginTop: "4rem",
          }}
        >
          Loading Today's Challenge...
        </div>
      </Container>
    );
  }

  if (isFinished) {
    return (
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Quiz Hub", href: "/quiz" },
          ]}
          current="Daily Challenge"
        />
        <ResultOverlay>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏆</div>
          <h2 style={{ marginBottom: "2rem" }}>Daily Challenge Complete!</h2>

          <TestResultStats
            stats={[
              { label: "Correct", value: score, color: "#10b981" },
              {
                label: "Incorrect",
                value: TOTAL_QUESTIONS - score,
                color: "#ef4444",
              },
              {
                label: "EXP Gained",
                value: `+${score * 10}`,
                color: "#fbbf24",
              },
              {
                label: "Streak",
                value: `${progress.streak} Days`,
                color: "#6366f1",
              },
            ]}
          />

          <div style={{ marginTop: "2rem", textAlign: "left" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                marginBottom: "1rem",
                borderBottom: "1px solid var(--border)",
                paddingBottom: "0.5rem",
              }}
            >
              Review Today's Items
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: "1rem",
                marginBottom: "2.5rem",
              }}
            >
              {userAnswers.map((ua, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "1rem",
                    borderRadius: "16px",
                    background: "rgba(var(--surface-rgb), 0.5)",
                    border: `1px solid ${ua.isCorrect ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    {ua.char}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: ua.isCorrect ? "#10b981" : "#ef4444",
                      fontWeight: 700,
                    }}
                  >
                    {ua.isCorrect ? "✓ " + ua.answer : "✗ " + ua.selected}
                  </div>
                  {!ua.isCorrect && (
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--text-secondary)",
                        marginTop: "0.2rem",
                      }}
                    >
                      Correct: {ua.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/quiz" style={{ textDecoration: "none" }}>
              <Button>Back to Quizzes</Button>
            </Link>
            <Link href="/stats" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  background: "var(--surface)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                  boxShadow: "none",
                }}
              >
                Mastery Stats
              </Button>
            </Link>
          </div>
        </ResultOverlay>
      </Container>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Quiz Hub", href: "/quiz" },
        ]}
        current="Daily Challenge"
      />
      <Header>
        <HeaderRight>
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#10b981",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Official Daily Challenge
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            {new Date().toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </HeaderRight>
      </Header>

      <QuizCard>
        {isAlreadyCompleted && currentIndex === 0 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              background: "rgba(16, 185, 129, 0.1)",
              padding: "0.75rem 0.5rem",
              fontSize: "0.7rem",
              fontWeight: 800,
              color: "#10b981",
              letterSpacing: "0.05em",
              zIndex: 10,
            }}
          >
            ✓ TODAY'S CHALLENGE COMPLETED
          </div>
        )}
        <ProgressInfo>
          {currentIndex + 1} / {TOTAL_QUESTIONS}
        </ProgressInfo>

        <Character>{currentQuestion.char}</Character>

        <OptionsGrid>
          {currentQuestion.options.map((opt) => {
            let state: "neutral" | "correct" | "incorrect" = "neutral";
            if (selectedOption) {
              if (opt === currentQuestion.answer) state = "correct";
              else if (opt === selectedOption) state = "incorrect";
            }

            return (
              <OptionButton
                key={opt}
                $state={state}
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </OptionButton>
            );
          })}
        </OptionsGrid>

        <ProgressBarContainer>
          <ProgressFill
            $percent={((currentIndex + 1) / TOTAL_QUESTIONS) * 100}
          />
        </ProgressBarContainer>
      </QuizCard>
    </Container>
  );
}
