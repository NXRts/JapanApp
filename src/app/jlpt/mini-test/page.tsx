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
import { allVocabulary, allKanji, allGrammar } from "@/lib/dictionary";
import { motion, AnimatePresence } from "framer-motion";
import { TestResultStats } from "@/components/jlpt/TestResultStats";
import { PostLessonFlow } from "@/components/modals/DuolingoPostLessonModals";
import { useProgress } from "@/context/ProgressContext";
import { playJapaneseAudio } from "@/lib/audio";

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

// --- Keyframes ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- Styled Components ---
const PageWrapper = styled.div`
  min-height: 100vh;
  color: var(--foreground);
  background-image: radial-gradient(var(--dot-color) 1.2px, transparent 1.2px);
  background-size: 32px 32px;
  padding-bottom: 4rem;

  @media (max-width: 600px) {
    padding-bottom: 2rem;
  }
`;

const BreadcrumbWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem 0 2rem;

  @media (max-width: 1024px) {
    padding: 1rem 1rem 0 1rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem 0 0.5rem;
  }
`;

const Container = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 640px) {
    padding: 0.5rem 0.75rem 4.5rem 0.75rem;
    min-height: calc(100vh - 120px);
    justify-content: center;
  }
`;

const SessionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.75rem;
  width: 100%;

  @media (max-width: 600px) {
    margin-bottom: 0.6rem;
  }
`;

const SessionBadgeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 0.4rem;
  }
`;

const LevelTag = styled.span`
  background: var(--primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  font-weight: 800;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 8px rgba(var(--primary-rgb), 0.3);

  @media (max-width: 600px) {
    padding: 0.18rem 0.55rem;
    font-size: 0.75rem;
  }
`;

const CategoryTag = styled.span`
  background: rgba(var(--foreground-rgb), 0.06);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  font-weight: 700;
  font-size: 0.82rem;
  text-transform: capitalize;

  @media (max-width: 600px) {
    padding: 0.18rem 0.55rem;
    font-size: 0.75rem;
  }
`;

const ProgressCounter = styled.div`
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-secondary);
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 0.4rem 1rem;
  border-radius: 99px;

  @media (max-width: 600px) {
    padding: 0.2rem 0.65rem;
    font-size: 0.78rem;
  }
`;

const TimerDisplay = styled.div<{ $warning: boolean }>`
  font-family: "JetBrains Mono", monospace;
  font-size: 1.1rem;
  font-weight: 800;
  color: ${({ $warning }) => ($warning ? "#ef4444" : "var(--primary)")};
  background: ${({ $warning }) =>
    $warning ? "rgba(239, 68, 68, 0.1)" : "rgba(var(--primary-rgb), 0.1)"};
  border: 1px solid
    ${({ $warning }) =>
      $warning ? "rgba(239, 68, 68, 0.3)" : "rgba(var(--primary-rgb), 0.3)"};
  padding: 0.35rem 0.85rem;
  border-radius: 99px;
  transition: all 0.3s ease;

  @media (max-width: 600px) {
    font-size: 0.85rem;
    padding: 0.25rem 0.6rem;
  }
`;

const PracticeCard = styled.div`
  background: var(--surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 28px;
  border: 1.5px solid var(--border);
  padding: 3rem 2.5rem;
  text-align: center;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 600px) {
    padding: 1.1rem 0.85rem;
    border-radius: 18px;
  }
`;

const SetupTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 850;
  margin-bottom: 0.75rem;
  background: linear-gradient(
    135deg,
    var(--foreground) 0%,
    var(--primary) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 600px) {
    font-size: 1.5rem;
    margin-bottom: 0.4rem;
  }
`;

const SetupSub = styled.p`
  color: var(--text-secondary);
  font-size: 0.98rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    font-size: 0.82rem;
    margin-bottom: 1.25rem;
  }
`;

const SelectionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-bottom: 2.5rem;
  text-align: left;

  @media (max-width: 600px) {
    gap: 1rem;
    margin-bottom: 1.25rem;
  }
`;

const SelectionLabel = styled.label`
  font-size: 0.88rem;
  font-weight: 800;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: block;
  margin-bottom: 0.75rem;

  @media (max-width: 600px) {
    font-size: 0.75rem;
    margin-bottom: 0.4rem;
  }
`;

const OptionGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols || 3}, 1fr);
  gap: 0.75rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(${({ $cols }) => $cols || 3}, 1fr);
    gap: 0.35rem;
  }
`;

const OptionButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active ? "var(--primary)" : "rgba(var(--foreground-rgb), 0.03)"};
  color: ${({ $active }) => ($active ? "white" : "var(--foreground)")};
  border: 1.5px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  padding: 0.85rem 1rem;
  border-radius: 16px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  .desktop-text {
    display: inline;
  }
  .mobile-text {
    display: none;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary);
    color: ${({ $active }) => ($active ? "white" : "var(--primary)")};
  }

  @media (max-width: 600px) {
    padding: 0.55rem 0.25rem;
    border-radius: 10px;
    font-size: 0.78rem;
    font-weight: 800;

    .desktop-text {
      display: none;
    }
    .mobile-text {
      display: inline;
    }
  }
`;

const BaseButton = styled.button`
  padding: 1rem 1.75rem;
  border-radius: 16px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border: none;

  .desktop-text {
    display: inline;
  }
  .mobile-text {
    display: none;
  }

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 600px) {
    padding: 0.6rem 0.5rem;
    border-radius: 12px;
    font-size: 0.85rem;

    .desktop-text {
      display: none;
    }
    .mobile-text {
      display: inline;
    }
  }
`;

const PrimaryButton = styled(BaseButton)`
  background: var(--primary);
  color: white;
  width: 100%;
  box-shadow: 0 8px 16px -4px rgba(var(--primary-rgb, 79, 70, 229), 0.35);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: var(--border);
  border-radius: 99px;
  margin-bottom: 1.5rem;
  overflow: hidden;

  @media (max-width: 640px) {
    margin-bottom: 1rem;
    height: 6px;
  }
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 99px;
`;

const QuestionTypeBadge = styled.div`
  display: inline-flex;
  padding: 0.35rem 0.85rem;
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
  border: 1px solid rgba(var(--primary-rgb, 79, 70, 229), 0.2);
  color: var(--primary);
  border-radius: 99px;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
`;

const Prompt = styled.h1`
  font-size: 3.25rem;
  font-weight: 850;
  line-height: 1.15;
  margin: 0.25rem 0;
  color: var(--foreground);

  @media (max-width: 640px) {
    font-size: 2.1rem;
  }
`;

const SubPrompt = styled.p`
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin-top: 0.4rem;
  font-weight: 600;

  @media (max-width: 640px) {
    font-size: 0.88rem;
  }
`;

const HintToolbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  margin: 1rem 0 1.25rem 0;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 0.4rem;
    margin: 0.6rem 0 0.85rem 0;
  }
`;

const ToolIconButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) =>
    $active ? "var(--primary)" : "rgba(var(--foreground-rgb), 0.05)"};
  color: ${({ $active }) => ($active ? "white" : "var(--foreground)")};
  border: 1px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  border-radius: 12px;
  padding: 0.45rem 0.85rem;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary);
    transform: translateY(-1px);
  }

  @media (max-width: 600px) {
    padding: 0.35rem 0.65rem;
    font-size: 0.75rem;
    border-radius: 10px;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
  margin-top: 1.25rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
`;

const TestOptionCard = styled.button<{
  $status?: "correct" | "incorrect" | "neutral";
}>`
  padding: 1.1rem 1.25rem;
  border-radius: 16px;
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
        : "rgba(var(--foreground-rgb), 0.02)"};
  color: ${({ $status }) =>
    $status === "correct"
      ? "#10b981"
      : $status === "incorrect"
        ? "#ef4444"
        : "var(--foreground)"};
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.85rem;

  &:hover {
    ${({ $status }) =>
      $status === "neutral" &&
      `
      border-color: var(--primary);
      background: rgba(var(--primary-rgb), 0.05);
      transform: translateX(4px);
    `}
  }

  span.label {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(var(--foreground-rgb), 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 800;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    padding: 0.8rem 0.95rem;
    border-radius: 12px;
    font-size: 0.9rem;
    gap: 0.6rem;

    span.label {
      width: 24px;
      height: 24px;
      font-size: 0.78rem;
    }
  }
`;

const ScoreCircleWrapper = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    width: 130px;
    height: 130px;
    margin-bottom: 1rem;
  }
`;

const ScoreLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .value {
    font-size: 3rem;
    font-weight: 900;
    color: var(--foreground);
    line-height: 1;
  }
  .label {
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--text-secondary);
    text-transform: uppercase;
    margin-top: 0.2rem;
  }

  @media (max-width: 600px) {
    .value {
      font-size: 2.2rem;
    }
    .label {
      font-size: 0.72rem;
    }
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

const ReviewSection = styled.div`
  margin-top: 2rem;
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
  text-align: left;
`;

const ReviewTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--foreground);
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ReviewItem = styled.div<{ $isCorrect: boolean }>`
  background: rgba(var(--foreground-rgb), 0.02);
  border: 1px solid
    ${({ $isCorrect }) =>
      $isCorrect ? "rgba(16, 185, 129, 0.25)" : "rgba(239, 68, 68, 0.25)"};
  border-radius: 14px;
  padding: 0.9rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const ReviewQuestion = styled.div`
  font-weight: 700;
  font-size: 1rem;
`;

const ReviewAnswers = styled.div`
  display: flex;
  gap: 1.25rem;
  font-size: 0.88rem;
  flex-wrap: wrap;

  .label {
    color: var(--text-secondary);
    margin-right: 0.4rem;
  }
  .user-answer {
    color: var(--foreground);
    font-weight: 700;
  }
  .correct-answer {
    color: #10b981;
    font-weight: 700;
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

// --- Main Component ---
function MiniTestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { updateMastery, recordQuizResult } = useProgress();
  const levelParam = searchParams.get("level") || "N5";

  const [setupLevel, setSetupLevel] = useState<string>(levelParam);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFlow, setShowFlow] = useState(false);
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

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedLevel = localStorage.getItem("japanapp_minitest_level");
      if (
        savedLevel &&
        ["N5", "N4", "N3", "N2", "N1"].includes(savedLevel) &&
        !searchParams.get("level")
      ) {
        setSetupLevel(savedLevel);
      }

      const savedCount = localStorage.getItem("japanapp_minitest_count");
      if (savedCount) {
        const parsed = parseInt(savedCount, 10);
        if ([10, 20, 30, 50].includes(parsed)) {
          setSettings((prev) => ({ ...prev, count: parsed }));
        }
      }

      const savedTime = localStorage.getItem("japanapp_minitest_time");
      if (savedTime) {
        const parsed = parseInt(savedTime, 10);
        if ([5, 10, 20, 30].includes(parsed)) {
          setSettings((prev) => ({ ...prev, time: parsed }));
        }
      }

      const savedTypes = localStorage.getItem("japanapp_minitest_types");
      if (savedTypes) {
        setSettings((prev) => ({ ...prev, types: JSON.parse(savedTypes) }));
      }

      const savedFeedback = localStorage.getItem("japanapp_minitest_feedback");
      if (savedFeedback !== null) {
        setSettings((prev) => ({
          ...prev,
          showInstantFeedback: savedFeedback === "true",
        }));
      }
    } catch (e) {}
  }, [searchParams]);

  const handleLevelChange = (lvl: string) => {
    setSetupLevel(lvl);
    try {
      localStorage.setItem("japanapp_minitest_level", lvl);
    } catch (e) {}
  };

  const handleCountChange = (count: number) => {
    setSettings((prev) => ({ ...prev, count }));
    try {
      localStorage.setItem("japanapp_minitest_count", count.toString());
    } catch (e) {}
  };

  const handleTimeChange = (time: number) => {
    setSettings((prev) => ({ ...prev, time }));
    try {
      localStorage.setItem("japanapp_minitest_time", time.toString());
    } catch (e) {}
  };

  const handleTypeToggle = (type: "vocabulary" | "kanji" | "grammar") => {
    setSettings((prev) => {
      const nextTypes = { ...prev.types, [type]: !prev.types[type] };
      try {
        localStorage.setItem(
          "japanapp_minitest_types",
          JSON.stringify(nextTypes),
        );
      } catch (e) {}
      return { ...prev, types: nextTypes };
    });
  };

  const handleFeedbackToggle = (val: boolean) => {
    setSettings((prev) => ({ ...prev, showInstantFeedback: val }));
    try {
      localStorage.setItem("japanapp_minitest_feedback", val.toString());
    } catch (e) {}
  };

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
    const activeLevel = setupLevel;
    const levelData = {
      vocab: allVocabulary.filter((v) => v.level === activeLevel),
      kanji: allKanji.filter((k) => k.level === activeLevel),
      grammar: allGrammar.filter((g) => g.level === activeLevel),
    };

    const generatedQuestions: Question[] = [];

    const enabledTypes = (
      Object.keys(settings.types) as Array<keyof typeof settings.types>
    ).filter((type) => settings.types[type]);

    if (enabledTypes.length === 0) {
      alert(
        "Pilih minimal satu tipe soal (Kosakata, Kanji, atau Tata Bahasa).",
      );
      return;
    }

    const countPerType = Math.ceil(settings.count / enabledTypes.length);

    // 1. Vocabulary Questions
    if (settings.types.vocabulary && levelData.vocab.length > 0) {
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
    if (settings.types.kanji && levelData.kanji.length > 0) {
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
          subPrompt: `Pilih cara baca yang tepat`,
          correctAnswer: correctReading,
          options: shuffleArray([correctReading, ...distractors]),
          sourceItem: item,
        });
      });
    }

    // 3. Grammar Questions
    if (settings.types.grammar && levelData.grammar.length > 0) {
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

    if (generatedQuestions.length === 0) {
      alert("Belum ada data materi untuk kombinasi level & kategori ini.");
      return;
    }

    setQuestions(shuffleArray(generatedQuestions).slice(0, settings.count));
    setTestState("playing");
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setTimeLeft(settings.time * 60);
    setAnswers([]);
    hasRecordedResult.current = false;
  }, [setupLevel, settings]);

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
      recordQuizResult(score, questions.length, `JLPT ${setupLevel} Mini Test`);
      hasRecordedResult.current = true;
      setShowFlow(true);
    }
  }, [testState, score, questions.length, setupLevel, recordQuizResult]);

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
    if (scorePercent === 100) return "Sempurna! Anda Master JLPT Sejati!";
    if (scorePercent >= 80) return "Sangat Bagus! Anda Sangat Siap Ujian.";
    if (scorePercent >= 60) return "Bagus! Sedikit Latihan Lagi dan Anda Siap.";
    if (scorePercent >= 40) return "Lumayan, Tetap Tingkatkan Penguasaan Kata.";
    return "Terus Belajar! Konsistensi Adalah Kunci Utama.";
  };

  const currentQ = questions[currentIndex];

  return (
    <PageWrapper>
      <BreadcrumbWrapper>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "JLPT Mastery", href: "/jlpt" },
          ]}
          current={`${setupLevel} Mini Test`}
        />
      </BreadcrumbWrapper>

      <Container>
        {testState === "playing" && (
          <SessionHeader>
            <SessionBadgeGroup>
              <LevelTag>{setupLevel}</LevelTag>
              <CategoryTag>🎯 Mini Test</CategoryTag>
            </SessionBadgeGroup>

            <div
              style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
            >
              <ProgressCounter>
                {currentIndex + 1} / {questions.length}
              </ProgressCounter>
              <TimerDisplay $warning={timeLeft < 60}>
                ⏱️ {formatTime(timeLeft)}
              </TimerDisplay>
            </div>
          </SessionHeader>
        )}

        <AnimatePresence mode="wait">
          {/* --- 1. SETUP SCREEN --- */}
          {testState === "intro" && (
            <PracticeCard key="setup">
              <SetupTitle>JLPT {setupLevel} Mini Test Hub</SetupTitle>
              <SetupSub>
                Kustomisasi parameter ujian singkat Anda dan uji pemahaman
                materi JLPT {setupLevel} secara terukur.
              </SetupSub>

              <SelectionGroup>
                <div>
                  <SelectionLabel>Pilih Level JLPT</SelectionLabel>
                  <OptionGrid $cols={5}>
                    {["N5", "N4", "N3", "N2", "N1"].map((lvl) => (
                      <OptionButton
                        key={lvl}
                        $active={setupLevel === lvl}
                        onClick={() => handleLevelChange(lvl)}
                      >
                        {lvl}
                      </OptionButton>
                    ))}
                  </OptionGrid>
                </div>

                <div>
                  <SelectionLabel>Jumlah Soal</SelectionLabel>
                  <OptionGrid $cols={4}>
                    {[10, 20, 30, 50].map((c) => (
                      <OptionButton
                        key={c}
                        $active={settings.count === c}
                        onClick={() => handleCountChange(c)}
                      >
                        <span className="desktop-text">{c} Soal</span>
                        <span className="mobile-text">{c}</span>
                      </OptionButton>
                    ))}
                  </OptionGrid>
                </div>

                <div>
                  <SelectionLabel>Batas Waktu</SelectionLabel>
                  <OptionGrid $cols={4}>
                    {[5, 10, 20, 30].map((t) => (
                      <OptionButton
                        key={t}
                        $active={settings.time === t}
                        onClick={() => handleTimeChange(t)}
                      >
                        <span className="desktop-text">{t} Menit</span>
                        <span className="mobile-text">{t} mnt</span>
                      </OptionButton>
                    ))}
                  </OptionGrid>
                </div>

                <div>
                  <SelectionLabel>Tipe Soal Ditampilkan</SelectionLabel>
                  <OptionGrid $cols={3}>
                    {[
                      {
                        id: "vocabulary",
                        desktop: "Kosakata",
                        mobile: "Kosakata",
                      },
                      { id: "kanji", desktop: "Kanji", mobile: "Kanji" },
                      {
                        id: "grammar",
                        desktop: "Tata Bahasa",
                        mobile: "Grammar",
                      },
                    ].map((item) => {
                      const key = item.id as "vocabulary" | "kanji" | "grammar";
                      const isSelected = settings.types[key];
                      return (
                        <OptionButton
                          key={item.id}
                          $active={isSelected}
                          onClick={() => handleTypeToggle(key)}
                        >
                          <span className="desktop-text">
                            {isSelected ? "✓ " : ""}
                            {item.desktop}
                          </span>
                          <span className="mobile-text">
                            {isSelected ? "✓ " : ""}
                            {item.mobile}
                          </span>
                        </OptionButton>
                      );
                    })}
                  </OptionGrid>
                </div>

                <div>
                  <SelectionLabel>Mode Umpan Balik</SelectionLabel>
                  <OptionGrid $cols={2}>
                    <OptionButton
                      $active={settings.showInstantFeedback}
                      onClick={() => handleFeedbackToggle(true)}
                    >
                      <span className="desktop-text">
                        Tampilkan Jawaban Instan
                      </span>
                      <span className="mobile-text">Umpan Balik Instan</span>
                    </OptionButton>
                    <OptionButton
                      $active={!settings.showInstantFeedback}
                      onClick={() => handleFeedbackToggle(false)}
                    >
                      <span className="desktop-text">
                        Evaluasi Di Akhir Tes
                      </span>
                      <span className="mobile-text">Evaluasi Akhir</span>
                    </OptionButton>
                  </OptionGrid>
                </div>
              </SelectionGroup>

              <PrimaryButton onClick={generateTest}>
                <span className="desktop-text">Mulai Mini Test Sekarang</span>
                <span className="mobile-text">Mulai Test Sekarang</span>
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </PrimaryButton>
            </PracticeCard>
          )}

          {/* --- 2. GAMEPLAY SCREEN --- */}
          {testState === "playing" && currentQ && (
            <PracticeCard key="playing">
              <ProgressBar>
                <ProgressFill
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </ProgressBar>

              <QuestionTypeBadge>Soal {currentQ.type}</QuestionTypeBadge>

              <Prompt>{currentQ.prompt}</Prompt>
              {currentQ.subPrompt && (
                <SubPrompt>{currentQ.subPrompt}</SubPrompt>
              )}

              <HintToolbar>
                <ToolIconButton
                  onClick={() => playJapaneseAudio(currentQ.prompt)}
                >
                  🔊 Suara Pelafalan
                </ToolIconButton>
              </HintToolbar>

              <OptionsGrid>
                {currentQ.options.map((opt, idx) => {
                  let status: "neutral" | "correct" | "incorrect" = "neutral";
                  if (selectedOption !== null && settings.showInstantFeedback) {
                    if (opt === currentQ.correctAnswer) status = "correct";
                    else if (idx === selectedOption) status = "incorrect";
                  }

                  return (
                    <TestOptionCard
                      key={idx}
                      $status={status}
                      onClick={() => handleOptionClick(idx)}
                    >
                      <span className="label">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </TestOptionCard>
                  );
                })}
              </OptionsGrid>
            </PracticeCard>
          )}

          {/* --- 3. RESULTS SCREEN --- */}
          {testState === "results" && (
            <PracticeCard key="results">
              {showFlow && <PostLessonFlow onComplete={() => setShowFlow(false)} />}
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
                  <div className="label">Hasil Skor</div>
                </ScoreLabel>
              </ScoreCircleWrapper>

              <SetupTitle style={{ fontSize: "2rem", marginBottom: "0.4rem" }}>
                Hasil Mini Test
              </SetupTitle>
              <SetupSub
                style={{ maxWidth: "420px", margin: "0 auto 1.5rem auto" }}
              >
                {getPerformanceMessage((score / questions.length) * 100)}
              </SetupSub>

              <TestResultStats
                stats={[
                  { label: "Benar", value: score, color: "#10b981" },
                  {
                    label: "Salah",
                    value: questions.length - score,
                    color: "#ef4444",
                  },
                  {
                    label: "Bonus EXP",
                    value: `+${score * 10}`,
                    color: "#fbbf24",
                  },
                  {
                    label: "Waktu Rest",
                    value: formatTime(settings.time * 60 - timeLeft),
                    color: "var(--primary)",
                  },
                  {
                    label: "Level",
                    value: setupLevel,
                    color: "var(--primary)",
                  },
                ]}
              />

              <div
                style={{
                  display: "flex",
                  gap: "0.85rem",
                  justifyContent: "center",
                  marginTop: "1.75rem",
                }}
              >
                <PrimaryButton onClick={generateTest}>
                  Mulai Ulang Tes
                </PrimaryButton>
                <BaseButton
                  as={Link}
                  href="/jlpt"
                  style={{
                    background: "rgba(var(--foreground-rgb), 0.05)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                    textDecoration: "none",
                  }}
                >
                  Selesai
                </BaseButton>
              </div>

              <ReviewSection>
                <ReviewTitle>Review Jawaban Soal</ReviewTitle>
                <ReviewList>
                  {answers.map((answer, i) => {
                    const q = questions[answer.questionIndex];
                    if (!q) return null;
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
                                fontSize: "0.85rem",
                              }}
                            >
                              ({q.type})
                            </span>
                          </ReviewQuestion>
                          <div
                            style={{
                              color: answer.isCorrect ? "#10b981" : "#ef4444",
                              fontWeight: 800,
                              fontSize: "0.78rem",
                              textTransform: "uppercase",
                            }}
                          >
                            {answer.isCorrect ? "Benar" : "Salah"}
                          </div>
                        </div>
                        <ReviewAnswers>
                          <div>
                            <span className="label">Jawaban Anda:</span>
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
                              <span className="label">Kunci Jawaban:</span>
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
            </PracticeCard>
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
                Memuat Data Mini Test...
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
