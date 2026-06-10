"use client";

import React, {
  useState,
  useEffect,
  Suspense,
  useCallback,
  useRef,
} from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useSearchParams, useRouter } from "next/navigation";
import {
  allVocabulary,
  allKanji,
  allGrammar,
  DictionaryResult,
} from "@/lib/dictionary";
import { motion, AnimatePresence } from "framer-motion";
import { TestResultStats } from "@/components/jlpt/TestResultStats";
import { useProgress } from "@/context/ProgressContext";

// --- Types ---
interface Question {
  id: string;
  type: "vocabulary" | "grammar" | "kanji";
  prompt: string;
  subPrompt?: string;
  correctAnswer: string;
  options: string[];
  explanation?: string;
  sourceItem: any;
}

// --- Styles ---
const PageWrapper = styled.div`
  min-height: 100vh;
  background-image:
    radial-gradient(
      circle at 20% 20%,
      rgba(var(--primary-rgb), 0.05) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(var(--secondary-rgb), 0.05) 0%,
      transparent 40%
    ),
    radial-gradient(var(--dot-color) 1.2px, transparent 1.2px);
  background-size:
    100% 100%,
    100% 100%,
    32px 32px;
  color: var(--foreground);
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem 0.75rem;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 640px) {
    gap: 1.25rem;
  }
`;

const GlassCard = styled(motion.div)`
  background: rgba(var(--surface-rgb), 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 32px;
  padding: 3rem;
  box-shadow: var(--shadow-xl);
  position: relative;
  overflow: hidden;

  @media (max-width: 640px) {
    padding: 1.5rem 1.25rem;
    border-radius: 20px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  background: linear-gradient(
    135deg,
    var(--foreground) 0%,
    var(--primary) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 640px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    font-size: 0.95rem;
    margin-bottom: 1.25rem;
  }
`;

const TestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    margin-bottom: 1rem;
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 640px) {
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StatLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatValue = styled.span`
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--foreground);
`;

const TimerDisplay = styled.div<{ $warning: boolean }>`
  font-family: "JetBrains Mono", monospace;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ $warning }) => ($warning ? "#ef4444" : "var(--primary)")};
  background: ${({ $warning }) =>
    $warning ? "rgba(239, 68, 68, 0.1)" : "rgba(var(--primary-rgb), 0.1)"};
  padding: 0.5rem 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;

  @media (max-width: 640px) {
    font-size: 1.15rem;
    padding: 0.35rem 0.75rem;
    border-radius: 8px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: var(--border);
  border-radius: 99px;
  margin-bottom: 3rem;
  overflow: hidden;

  @media (max-width: 640px) {
    margin-bottom: 1.5rem;
    height: 6px;
  }
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 99px;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (max-width: 640px) {
    gap: 1.25rem;
  }
`;

const QuestionType = styled.div`
  display: inline-flex;
  padding: 0.5rem 1.25rem;
  background: rgba(var(--primary-rgb), 0.1);
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  color: var(--primary);
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  align-self: flex-start;
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.1);

  @media (max-width: 640px) {
    padding: 0.35rem 0.85rem;
    font-size: 0.7rem;
  }
`;

const Prompt = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
  background: linear-gradient(
    to bottom,
    var(--foreground),
    var(--text-secondary)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 640px) {
    font-size: 2.2rem;
  }
`;

const SubPrompt = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-top: 0.75rem;
  font-weight: 500;
  opacity: 0.8;
  line-height: 1.5;

  @media (max-width: 640px) {
    font-size: 0.95rem;
    margin-top: 0.5rem;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
`;

const OptionButton = styled(motion.button)<{
  $status?: "correct" | "incorrect" | "neutral";
}>`
  padding: 1.5rem;
  border-radius: 20px;
  border: 2px solid
    ${({ $status }) =>
      $status === "correct"
        ? "#10b981"
        : $status === "incorrect"
          ? "#ef4444"
          : "var(--border)"};
  background: ${({ $status }) =>
    $status === "correct"
      ? "rgba(16, 185, 129, 0.1)"
      : $status === "incorrect"
        ? "rgba(239, 68, 68, 0.1)"
        : "rgba(var(--surface-rgb), 0.5)"};
  color: ${({ $status }) =>
    $status === "correct"
      ? "#10b981"
      : $status === "incorrect"
        ? "#ef4444"
        : "var(--foreground)"};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: ${({ $status }) =>
    $status === "neutral" ? "var(--shadow-sm)" : "none"};

  &:hover {
    border-color: ${({ $status }) =>
      $status === "neutral" ? "var(--primary)" : ""};
    transform: ${({ $status }) =>
      $status === "neutral" ? "translateY(-2px)" : "none"};
    background: ${({ $status }) =>
      $status === "neutral" ? "rgba(var(--primary-rgb), 0.05)" : ""};
  }

  span.label {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(var(--foreground-rgb), 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 800;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    padding: 0.85rem 1rem;
    border-radius: 12px;
    font-size: 0.95rem;
    gap: 0.75rem;

    span.label {
      width: 26px;
      height: 26px;
      font-size: 0.8rem;
    }
  }
`;

const ScoreCircleWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScoreLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .value {
    font-size: 3.5rem;
    font-weight: 900;
    color: var(--foreground);
    line-height: 1;
  }
  .label {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    margin-top: 0.25rem;
  }
`;

const SvgCircle = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const ProgressRing = styled.circle`
  fill: none;
  stroke-width: 12;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s ease-out;
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background: var(--primary);
  color: white;
  border-radius: 99px;
  font-weight: 800;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(var(--primary-rgb), 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(var(--primary-rgb), 0.4);
    filter: brightness(1.1);
  }
`;

const LevelBadge = styled.div`
  padding: 0.5rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 99px;
  font-weight: 800;
  color: var(--primary);
  font-size: 1rem;
`;

const ReviewSection = styled.div`
  margin-top: 3rem;
  border-top: 1px solid var(--border);
  padding-top: 2rem;
  text-align: left;
`;

const ReviewTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--foreground);
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewItem = styled.div<{ $isCorrect: boolean }>`
  background: rgba(var(--surface-rgb), 0.3);
  border: 1px solid
    ${({ $isCorrect }) =>
      $isCorrect ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"};
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ReviewQuestion = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
`;

const ReviewAnswers = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 0.95rem;

  .label {
    color: var(--text-secondary);
    margin-right: 0.5rem;
  }
  .user-answer {
    color: var(--foreground);
    font-weight: 600;
  }
  .correct-answer {
    color: #10b981;
    font-weight: 600;
  }
`;

// --- Helpers ---
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const SettingSection = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(var(--foreground-rgb), 0.03);
  border-radius: 24px;
  border: 1px solid var(--border);

  @media (max-width: 640px) {
    padding: 1rem;
    gap: 1rem;
    border-radius: 16px;
    margin-top: 1rem;
  }
`;

const SettingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SettingLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SettingOptions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const SettingChip = styled.button<{ $active: boolean }>`
  padding: 0.6rem 1.25rem;
  border-radius: 12px;
  border: 2px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  background: ${({ $active }) =>
    $active ? "rgba(var(--primary-rgb), 0.1)" : "transparent"};
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  @media (max-width: 640px) {
    padding: 0.4rem 0.85rem;
    font-size: 0.82rem;
    border-radius: 8px;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--foreground);
  cursor: pointer;

  input {
    width: 20px;
    height: 20px;
    accent-color: var(--primary);
  }
`;

// --- Main Component ---
function MiniTestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { updateMastery, recordQuizResult } = useProgress();
  const level = searchParams.get("level") || "N5";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const hasRecordedResult = useRef(false);

  // Settings State
  const [settings, setSettings] = useState({
    count: 20,
    time: 10, // minutes
    types: {
      vocabulary: true,
      kanji: true,
      grammar: true,
    },
    showInstantFeedback: true,
  });

  const [timeLeft, setTimeLeft] = useState(settings.time * 60);
  const [testState, setTestState] = useState<"intro" | "playing" | "results">(
    "intro",
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<
    { questionIndex: number; isCorrect: boolean; selected: string }[]
  >([]);

  // Generate Test Questions
  const generateTest = useCallback(() => {
    const levelData = {
      vocab: allVocabulary.filter((v) => v.level === level),
      kanji: allKanji.filter((k) => k.level === level),
      grammar: allGrammar.filter((g) => g.level === level),
    };

    const generatedQuestions: Question[] = [];

    // Calculate split
    const enabledTypes = (
      Object.keys(settings.types) as Array<keyof typeof settings.types>
    ).filter((type) => settings.types[type]);
    if (enabledTypes.length === 0) {
      alert("Please select at least one question type.");
      return;
    }

    const countPerType = Math.ceil(settings.count / enabledTypes.length);

    // 1. Vocabulary Questions
    if (settings.types.vocabulary) {
      const vocabPool = shuffleArray(levelData.vocab);
      vocabPool.slice(0, countPerType).forEach((item) => {
        const distractors = shuffleArray(
          vocabPool.filter((v) => v.id !== item.id),
        )
          .slice(0, 3)
          .map((v) => v.meaning);

        generatedQuestions.push({
          id: item.id,
          type: "vocabulary",
          prompt: item.word || "",
          subPrompt: item.reading,
          correctAnswer: item.meaning || "",
          options: shuffleArray([item.meaning || "", ...distractors]),
          sourceItem: item,
        });
      });
    }

    // 2. Kanji Questions
    if (settings.types.kanji) {
      const kanjiPool = shuffleArray(levelData.kanji);
      kanjiPool.slice(0, countPerType).forEach((item) => {
        const distractors = shuffleArray(
          kanjiPool.filter((k) => k.id !== item.id),
        )
          .slice(0, 3)
          .map((k) => k.onyomi?.[0] || k.kunyomi?.[0] || "");

        const correctReading = item.onyomi?.[0] || item.kunyomi?.[0] || "";

        generatedQuestions.push({
          id: item.id,
          type: "kanji",
          prompt: item.kanji || "",
          subPrompt: `What is the reading?`,
          correctAnswer: correctReading,
          options: shuffleArray([correctReading, ...distractors]),
          sourceItem: item,
        });
      });
    }

    // 3. Grammar Questions
    if (settings.types.grammar) {
      const grammarPool = shuffleArray(levelData.grammar);
      grammarPool.slice(0, countPerType).forEach((item) => {
        const distractors = shuffleArray(
          grammarPool.filter((g) => g.id !== item.id),
        )
          .slice(0, 3)
          .map((g) => g.meaning || "");

        generatedQuestions.push({
          id: item.id,
          type: "grammar",
          prompt: item.title || "",
          subPrompt: item.structure,
          correctAnswer: item.meaning || "",
          options: shuffleArray([item.meaning || "", ...distractors]),
          sourceItem: item,
        });
      });
    }

    setQuestions(shuffleArray(generatedQuestions).slice(0, settings.count));
    setTestState("playing");
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setTimeLeft(settings.time * 60);
    setAnswers([]);
    hasRecordedResult.current = false;
  }, [level, settings]);

  // Timer Effect
  useEffect(() => {
    if (testState !== "playing" || timeLeft <= 0) {
      if (timeLeft === 0 && testState === "playing") setTestState("results");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [testState, timeLeft]);

  // Record Results Effect
  useEffect(() => {
    if (
      testState === "results" &&
      questions.length > 0 &&
      !hasRecordedResult.current
    ) {
      recordQuizResult(score, questions.length, `JLPT ${level} Mini Test`);
      hasRecordedResult.current = true;
    }
  }, [testState, score, questions.length, level, recordQuizResult]);

  const handleOptionClick = (optionIndex: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(optionIndex);
    const currentQ = questions[currentIndex];
    const isCorrect = currentQ.options[optionIndex] === currentQ.correctAnswer;

    if (isCorrect) setScore((prev) => prev + 1);

    setAnswers((prev) => [
      ...prev,
      {
        questionIndex: currentIndex,
        isCorrect,
        selected: currentQ.options[optionIndex],
      },
    ]);

    // Update mastery for individual items
    updateMastery(currentQ.prompt, isCorrect);

    const delay = settings.showInstantFeedback ? 800 : 300;

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setTestState("results");
      }
    }, delay);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getPerformanceMessage = (scorePercent: number) => {
    if (scorePercent === 100) return "Perfect! You're a JLPT Master!";
    if (scorePercent >= 80) return "Excellent! You're well prepared.";
    if (scorePercent >= 60)
      return "Good job! A bit more practice and you'll be ready.";
    if (scorePercent >= 40) return "Not bad, but there's room for improvement.";
    return "Keep studying! Consistency is key to mastering Japanese.";
  };

  return (
    <PageWrapper>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "JLPT Mastery", href: "/jlpt" },
          ]}
          current={`${level} Mini Test`}
        />

        <AnimatePresence mode="wait">
          {testState === "intro" && (
            <GlassCard
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <Title>JLPT {level} Mini Test</Title>
                <LevelBadge>{level}</LevelBadge>
              </div>
              <Subtitle>
                Customize your test parameters and challenge yourself to master
                the JLPT {level} content.
              </Subtitle>

              <SettingSection>
                <SettingGroup>
                  <SettingLabel>JLPT Level</SettingLabel>
                  <SettingOptions>
                    {["N5", "N4", "N3", "N2", "N1"].map((lvl) => (
                      <SettingChip
                        key={lvl}
                        $active={level === lvl}
                        onClick={() =>
                          router.push(`/jlpt/mini-test?level=${lvl}`)
                        }
                      >
                        {lvl}
                      </SettingChip>
                    ))}
                  </SettingOptions>
                </SettingGroup>

                <SettingGroup>
                  <SettingLabel>Question Count</SettingLabel>
                  <SettingOptions>
                    {[10, 20, 30, 50].map((c) => (
                      <SettingChip
                        key={c}
                        $active={settings.count === c}
                        onClick={() =>
                          setSettings((prev) => ({ ...prev, count: c }))
                        }
                      >
                        {c} Questions
                      </SettingChip>
                    ))}
                  </SettingOptions>
                </SettingGroup>

                <SettingGroup>
                  <SettingLabel>Time Limit</SettingLabel>
                  <SettingOptions>
                    {[5, 10, 20, 30].map((t) => (
                      <SettingChip
                        key={t}
                        $active={settings.time === t}
                        onClick={() =>
                          setSettings((prev) => ({ ...prev, time: t }))
                        }
                      >
                        {t} Minutes
                      </SettingChip>
                    ))}
                  </SettingOptions>
                </SettingGroup>

                <SettingGroup>
                  <SettingLabel>Question Types</SettingLabel>
                  <div
                    style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
                  >
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        checked={settings.types.vocabulary}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            types: {
                              ...prev.types,
                              vocabulary: e.target.checked,
                            },
                          }))
                        }
                      />
                      Vocabulary
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        checked={settings.types.kanji}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            types: { ...prev.types, kanji: e.target.checked },
                          }))
                        }
                      />
                      Kanji
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        checked={settings.types.grammar}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            types: { ...prev.types, grammar: e.target.checked },
                          }))
                        }
                      />
                      Grammar
                    </CheckboxLabel>
                  </div>
                </SettingGroup>

                <SettingGroup>
                  <SettingLabel>Feedback Mode</SettingLabel>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        checked={settings.showInstantFeedback}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            showInstantFeedback: e.target.checked,
                          }))
                        }
                      />
                      Show correct answer immediately
                    </CheckboxLabel>
                  </div>
                </SettingGroup>
              </SettingSection>

              <div style={{ display: "flex", gap: "1rem", marginTop: "3rem" }}>
                <button
                  onClick={generateTest}
                  style={{
                    padding: "1.25rem 3rem",
                    background: "var(--primary)",
                    color: "white",
                    borderRadius: "99px",
                    border: "none",
                    fontWeight: 900,
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    boxShadow: "0 10px 30px rgba(var(--primary-rgb), 0.3)",
                    flex: 1,
                  }}
                >
                  Start Test
                </button>
                <ActionButton
                  href="/jlpt"
                  style={{
                    background: "transparent",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                    boxShadow: "none",
                    padding: "1.25rem 2rem",
                  }}
                >
                  Cancel
                </ActionButton>
              </div>
            </GlassCard>
          )}

          {testState === "playing" && (
            <div key="playing">
              <TestHeader>
                <StatsRow>
                  <StatItem>
                    <StatLabel>Progress</StatLabel>
                    <StatValue>
                      {currentIndex + 1} / {questions.length}
                    </StatValue>
                  </StatItem>
                </StatsRow>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <LevelBadge>{level}</LevelBadge>
                  <TimerDisplay $warning={timeLeft < 60}>
                    {formatTime(timeLeft)}
                  </TimerDisplay>
                </div>
              </TestHeader>

              <ProgressBar>
                <ProgressFill
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </ProgressBar>

              <GlassCard
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
              >
                <QuestionContainer>
                  <QuestionType>{questions[currentIndex].type}</QuestionType>
                  <div>
                    <Prompt>{questions[currentIndex].prompt}</Prompt>
                    {questions[currentIndex].subPrompt && (
                      <SubPrompt>{questions[currentIndex].subPrompt}</SubPrompt>
                    )}
                  </div>

                  <OptionsGrid>
                    {questions[currentIndex].options.map((opt, idx) => {
                      let status: "neutral" | "correct" | "incorrect" =
                        "neutral";
                      if (
                        selectedOption !== null &&
                        settings.showInstantFeedback
                      ) {
                        if (opt === questions[currentIndex].correctAnswer)
                          status = "correct";
                        else if (idx === selectedOption) status = "incorrect";
                      }

                      return (
                        <OptionButton
                          key={idx}
                          $status={status}
                          onClick={() => handleOptionClick(idx)}
                          whileHover={{
                            scale:
                              status === "neutral" && selectedOption === null
                                ? 1.02
                                : 1,
                          }}
                          whileTap={{
                            scale:
                              status === "neutral" && selectedOption === null
                                ? 0.98
                                : 1,
                          }}
                        >
                          <span className="label">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {opt}
                        </OptionButton>
                      );
                    })}
                  </OptionsGrid>
                </QuestionContainer>
              </GlassCard>
            </div>
          )}

          {testState === "results" && (
            <GlassCard
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <ScoreCircleWrapper>
                  <SvgCircle viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      stroke="rgba(var(--foreground-rgb), 0.05)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <ProgressRing
                      cx="50"
                      cy="50"
                      r="44"
                      stroke="var(--primary)"
                      strokeDasharray={276.46}
                      strokeDashoffset={
                        276.46 - 276.46 * (score / questions.length)
                      }
                    />
                  </SvgCircle>
                  <ScoreLabel>
                    <div className="value">
                      {Math.round((score / questions.length) * 100)}%
                    </div>
                    <div className="label">Final Score</div>
                  </ScoreLabel>
                </ScoreCircleWrapper>

                <Title style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                  Test Results
                </Title>
                <Subtitle style={{ maxWidth: "400px", margin: "0 auto" }}>
                  {getPerformanceMessage((score / questions.length) * 100)}
                </Subtitle>
              </div>

              <TestResultStats
                stats={[
                  { label: "Correct", value: score, color: "#10b981" },
                  {
                    label: "Incorrect",
                    value: questions.length - score,
                    color: "#ef4444",
                  },
                  {
                    label: "EXP Gained",
                    value: `+${score * 10}`,
                    color: "#fbbf24",
                  },
                  {
                    label: "Time",
                    value: formatTime(600 - timeLeft),
                    color: "var(--primary)",
                  },
                  { label: "Level", value: level, color: "var(--primary)" },
                ]}
              />

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateTest}
                  style={{
                    padding: "1rem 2.5rem",
                    background: "var(--primary)",
                    color: "white",
                    borderRadius: "99px",
                    border: "none",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    boxShadow: "0 10px 20px rgba(var(--primary-rgb), 0.3)",
                  }}
                >
                  Try Again
                </motion.button>
                <ActionButton
                  href="/jlpt"
                  style={{
                    background: "rgba(var(--foreground-rgb), 0.05)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                    boxShadow: "none",
                  }}
                >
                  Finish
                </ActionButton>
              </div>

              <ReviewSection>
                <ReviewTitle>Question Review</ReviewTitle>
                <ReviewList>
                  {answers.map((answer, i) => {
                    const q = questions[answer.questionIndex];
                    return (
                      <ReviewItem key={i} $isCorrect={answer.isCorrect}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <ReviewQuestion>
                            {q.prompt}{" "}
                            <span
                              style={{
                                color: "var(--text-secondary)",
                                fontWeight: 400,
                                fontSize: "0.9rem",
                              }}
                            >
                              ({q.type})
                            </span>
                          </ReviewQuestion>
                          <div
                            style={{
                              color: answer.isCorrect ? "#10b981" : "#ef4444",
                              fontWeight: 800,
                              fontSize: "0.8rem",
                              textTransform: "uppercase",
                            }}
                          >
                            {answer.isCorrect ? "Correct" : "Incorrect"}
                          </div>
                        </div>
                        <ReviewAnswers>
                          <div>
                            <span className="label">Your answer:</span>
                            <span
                              className="user-answer"
                              style={{
                                color: answer.isCorrect ? "" : "#ef4444",
                              }}
                            >
                              {answer.selected}
                            </span>
                          </div>
                          {!answer.isCorrect && (
                            <div>
                              <span className="label">Correct:</span>
                              <span className="correct-answer">
                                {q.correctAnswer}
                              </span>
                            </div>
                          )}
                        </ReviewAnswers>
                      </ReviewItem>
                    );
                  })}
                </ReviewList>
              </ReviewSection>
            </GlassCard>
          )}
        </AnimatePresence>
      </Container>
    </PageWrapper>
  );
}

export default function MiniTestPage() {
  return (
    <Suspense
      fallback={
        <PageWrapper>
          <Container>
            <div style={{ textAlign: "center", padding: "4rem" }}>
              <h2 style={{ color: "var(--text-secondary)" }}>
                Loading Test Data...
              </h2>
            </div>
          </Container>
        </PageWrapper>
      }
    >
      <MiniTestContent />
    </Suspense>
  );
}
