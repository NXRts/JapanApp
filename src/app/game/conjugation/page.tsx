"use client";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useDeviceMode } from "@/context/DeviceModeContext";
import { useProgress } from "@/context/ProgressContext";
import { conjugationData, ConjugationVerb } from "@/data/conjugation_drills";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

// --- Styled Components ---

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  min-height: 90vh;

  @media (max-width: 1024px) {
    padding: 1rem 1rem 96px 1rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem 96px 0.5rem;
  }
`;

const BreadcrumbWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 0 1rem 0;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const LessonHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const CloseLessonBtn = styled(Link)`
  color: var(--text-secondary);
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: var(--foreground);
  }
`;

const LessonProgressBarContainer = styled.div`
  flex: 1;
  height: 16px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 99px;
  overflow: hidden;
  border: 1px solid var(--border);
`;

const LessonProgressBarFill = styled.div<{ $percent: number }>`
  width: ${({ $percent }) => $percent}%;
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  border-radius: 99px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
`;

const LessonHearts = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 1.1rem;
  font-weight: 800;
  color: #ef4444;
  white-space: nowrap;
`;

const GameArea = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 600px) {
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 600px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

// --- Options UI ---
const OptionsPanel = styled.div`
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2.5rem;
  text-align: left;

  @media (max-width: 600px) {
    padding: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

const OptionGroup = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const OptionLabel = styled.div`
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--foreground);
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SelectButton = styled.button<{ $active?: boolean; $disabled?: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  border: 2px solid ${({ $active }) => ($active ? "#10b981" : "var(--border)")};
  background: ${({ $active }) =>
    $active ? "rgba(16, 185, 129, 0.1)" : "var(--background)"};
  color: ${({ $active, $disabled }) =>
    $disabled
      ? "var(--text-secondary)"
      : $active
        ? "#10b981"
        : "var(--foreground)"};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: all 0.2s;

  &:hover {
    ${({ $disabled, $active }) =>
      !$disabled &&
      !$active &&
      `
      border-color: rgba(16, 185, 129, 0.5);
    `}
  }
`;

const ComingSoonBadge = styled.span`
  font-size: 0.7rem;
  background: var(--border);
  padding: 0.2rem 0.5rem;
  border-radius: 99px;
  margin-left: 0.5rem;
`;

// --- Game UI ---

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  font-weight: 600;
`;

const Score = styled.div`
  color: #10b981;
`;

const QuestionCount = styled.div`
  color: var(--text-secondary);
`;

const QuestionContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const TargetVerb = styled.div`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--foreground);

  @media (max-width: 600px) {
    font-size: 2.75rem;
  }
`;

const VerbMeaning = styled.div`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const InstructionBox = styled.div`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: #10b981;
  padding: 1rem 2rem;
  border-radius: 16px;
  display: inline-block;
  font-weight: 700;
  font-size: 1.25rem;

  @media (max-width: 600px) {
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
    border-radius: 12px;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const OptionButton = styled.button<{
  $isCorrect?: boolean;
  $isWrong?: boolean;
  $disabled?: boolean;
}>`
  padding: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 16px;
  border: 2px solid
    ${({ $isCorrect, $isWrong }) =>
      $isCorrect ? "#10b981" : $isWrong ? "#ef4444" : "var(--border)"};
  background: ${({ $isCorrect, $isWrong }) =>
    $isCorrect
      ? "rgba(16, 185, 129, 0.1)"
      : $isWrong
        ? "rgba(239, 68, 68, 0.1)"
        : "var(--background)"};
  color: ${({ $isCorrect, $isWrong }) =>
    $isCorrect ? "#10b981" : $isWrong ? "#ef4444" : "var(--foreground)"};
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  transition: all 0.2s;

  &:hover {
    ${({ $disabled }) =>
      !$disabled &&
      `
      border-color: #10b981;
      transform: translateY(-2px);
    `}
  }
`;

const TypingContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
`;

const TypeInput = styled.input<{ $isCorrect?: boolean; $isWrong?: boolean }>`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  text-align: center;
  border-radius: 16px;
  border: 2px solid
    ${({ $isCorrect, $isWrong }) =>
      $isCorrect ? "#10b981" : $isWrong ? "#ef4444" : "var(--border)"};
  background: var(--background);
  color: var(--foreground);
  outline: none;

  &:focus {
    border-color: #10b981;
  }
`;

const FeedbackText = styled.div<{ $isCorrect?: boolean }>`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${({ $isCorrect }) => ($isCorrect ? "#10b981" : "#ef4444")};
  animation: ${fadeIn} 0.3s ease-out;
`;

const StartButton = styled.button`
  width: 100%;
  padding: 1.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  border: none;
  border-radius: 16px;
  background: #10b981;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
    background: #059669;
  }
`;

const ResultScreen = styled.div`
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

const FinalScore = styled.div`
  font-size: 5rem;
  font-weight: 800;
  color: #10b981;
  margin: 2rem 0;

  @media (max-width: 600px) {
    font-size: 3.5rem;
    margin: 1.25rem 0;
  }
`;

const ResultMessage = styled.h2`
  font-size: 2rem;
  margin-bottom: 3rem;
  color: var(--foreground);

  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-bottom: 2rem;
  }
`;

// --- Logic Helpers ---

type FormType = "masu" | "te" | "ta" | "nai" | "passive" | "causative";
type InputType = "multiple-choice" | "manual-typing";
type DifficultyType = "basic" | "advanced";

const formLabels: Record<FormType, string> = {
  masu: "Bentuk Masu (Sopan)",
  te: "Bentuk Te (Menyambung)",
  ta: "Bentuk Ta (Lampau)",
  nai: "Bentuk Nai (Negatif)",
  passive: "Bentuk Pasif (Di...)",
  causative: "Bentuk Kausatif (Menyuruh/Membiarkan)",
};

export default function ConjugationDrillsPage() {
  const { deviceMode, isMounted } = useDeviceMode();
  const isMobileView = isMounted && deviceMode === "mobile";

  const [gameState, setGameState] = useState<"start" | "playing" | "result">(
    "start",
  );

  // Options State
  const [inputType, setInputType] = useState<InputType>("multiple-choice");
  const [difficulty, setDifficulty] = useState<DifficultyType>("basic");

  // Game State
  const [score, setScore] = useState(0);
  const { addExp } = useProgress();
  const scoreRef = useRef(score);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lives, setLives] = useState(5);

  const [currentVerb, setCurrentVerb] = useState<ConjugationVerb | null>(null);
  const [targetForm, setTargetForm] = useState<FormType>("masu");
  const [options, setOptions] = useState<string[]>([]);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Manual Typing State
  const [typedAnswer, setTypedAnswer] = useState("");
  const [typingFeedback, setTypingFeedback] = useState<
    "correct" | "wrong" | null
  >(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalQuestions = isMobileView ? 5 : 10;

  // Generate a question
  const generateQuestion = useCallback(() => {
    // 1. Pick a random verb
    const randomVerb =
      conjugationData[Math.floor(Math.random() * conjugationData.length)];

    // 2. Determine available forms based on difficulty
    const forms: FormType[] =
      difficulty === "advanced"
        ? ["masu", "te", "ta", "nai", "passive", "causative"]
        : ["masu", "te", "ta", "nai"];

    // 3. Pick a random target form
    const selectedForm = forms[Math.floor(Math.random() * forms.length)];

    // 4. The correct answer
    const correctAnswer = randomVerb.forms[selectedForm];

    if (inputType === "multiple-choice") {
      // 4. Generate distractors (wrong answers)
      const distractors = new Set<string>();

      // Add other forms of the SAME verb as distractors
      forms.forEach((f) => {
        if (f !== selectedForm) {
          distractors.add(randomVerb.forms[f]);
        }
      });

      // If we still need more distractors, pick forms from other random verbs
      while (distractors.size < 3) {
        const otherVerb =
          conjugationData[Math.floor(Math.random() * conjugationData.length)];
        const otherForm = forms[Math.floor(Math.random() * forms.length)];
        if (otherVerb.forms[otherForm] !== correctAnswer) {
          distractors.add(otherVerb.forms[otherForm]);
        }
      }

      // 5. Shuffle options
      const finalOptions = [
        correctAnswer,
        ...Array.from(distractors).slice(0, 3),
      ];
      for (let i = finalOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [finalOptions[i], finalOptions[j]] = [finalOptions[j], finalOptions[i]];
      }
      setOptions(finalOptions);
    }

    setCurrentVerb(randomVerb);
    setTargetForm(selectedForm);
    setSelectedAnswer(null);
    setTypedAnswer("");
    setTypingFeedback(null);

    // Auto focus input if manual typing
    if (inputType === "manual-typing") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [inputType, difficulty]);

  const startGame = () => {
    setScore(0);
    setLives(5);
    setCurrentQuestionIndex(0);
    generateQuestion();
    setGameState("playing");
  };

  const moveToNextQuestion = () => {
    setTimeout(() => {
      if (currentQuestionIndex + 1 >= totalQuestions) {
        setGameState("result");
        if (isMobileView) {
          addExp(40); // 40 EXP for mobile completion
        } else {
          addExp(scoreRef.current * 15);
        }
      } else {
        setCurrentQuestionIndex((i) => i + 1);
        generateQuestion();
      }
    }, 1500);
  };

  // Handle Answer for Multiple Choice
  const handleMCAnswer = (answer: string) => {
    if (selectedAnswer !== null || !currentVerb) return;

    setSelectedAnswer(answer);

    const isCorrect = answer === currentVerb.forms[targetForm];
    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      if (isMobileView) {
        setLives((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            setTimeout(() => {
              setGameState("result");
            }, 1500);
          }
          return next;
        });
      }
    }

    if (!isMobileView || lives > 1 || isCorrect) {
      moveToNextQuestion();
    }
  };

  // Handle Answer for Manual Typing
  const handleTypingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typingFeedback !== null || !currentVerb || !typedAnswer.trim()) return;

    const isCorrect = typedAnswer.trim() === currentVerb.forms[targetForm];

    if (isCorrect) {
      setTypingFeedback("correct");
      setScore((s) => s + 1);
    } else {
      setTypingFeedback("wrong");
      if (isMobileView) {
        setLives((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            setTimeout(() => {
              setGameState("result");
            }, 1500);
          }
          return next;
        });
      }
    }

    if (!isMobileView || lives > 1 || isCorrect) {
      moveToNextQuestion();
    }
  };

  return (
    <Container>
      <BreadcrumbWrapper>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Games Hub", href: "/game" },
          ]}
          current="Conjugation Drills"
        />
      </BreadcrumbWrapper>

      <ContentWrapper>
        {isMobileView && gameState === "playing" ? (
          <LessonHeader>
            <CloseLessonBtn href="/game" title="Tutup Sesi">
              ✕
            </CloseLessonBtn>
            <LessonProgressBarContainer>
              <LessonProgressBarFill
                $percent={
                  ((currentQuestionIndex +
                    (selectedAnswer !== null || typingFeedback !== null
                      ? 1
                      : 0)) /
                    totalQuestions) *
                  100
                }
              />
            </LessonProgressBarContainer>
            <LessonHearts>❤️ {lives}</LessonHearts>
          </LessonHeader>
        ) : null}

        <GameArea>
          {gameState === "start" && (
            <div style={{ textAlign: "center" }}>
              <Header>
                <Title>Conjugation Drills</Title>
                <Subtitle>
                  Uji kecepatanmu mengubah bentuk kata kerja bahasa Jepang!
                </Subtitle>
              </Header>

              <OptionsPanel>
                <OptionGroup>
                  <OptionLabel>Tipe Input</OptionLabel>
                  <ButtonRow>
                    <SelectButton
                      $active={inputType === "multiple-choice"}
                      onClick={() => setInputType("multiple-choice")}
                    >
                      Pilihan Ganda
                    </SelectButton>
                    <SelectButton
                      $active={inputType === "manual-typing"}
                      onClick={() => setInputType("manual-typing")}
                    >
                      Ketik Manual
                    </SelectButton>
                  </ButtonRow>
                  {inputType === "manual-typing" && (
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                        marginTop: "0.5rem",
                      }}
                    >
                      * Pastikan keyboard Jepang (IME) Anda aktif untuk mengetik
                      kanji.
                    </p>
                  )}
                </OptionGroup>

                <OptionGroup>
                  <OptionLabel>Tingkat Kesulitan</OptionLabel>
                  <ButtonRow>
                    <SelectButton
                      $active={difficulty === "basic"}
                      onClick={() => setDifficulty("basic")}
                    >
                      Basic (Dasar)
                    </SelectButton>
                    <SelectButton
                      $active={difficulty === "advanced"}
                      onClick={() => setDifficulty("advanced")}
                    >
                      Advanced (Pasif/Kausatif)
                    </SelectButton>
                  </ButtonRow>
                </OptionGroup>
              </OptionsPanel>

              <StartButton onClick={startGame}>Mulai Main</StartButton>
            </div>
          )}

          {gameState === "playing" && currentVerb && (
            <>
              {!isMobileView && (
                <TopBar>
                  <Score>Score: {score}</Score>
                  <QuestionCount>
                    Question {currentQuestionIndex + 1} / {totalQuestions}
                  </QuestionCount>
                </TopBar>
              )}

              <QuestionContainer>
                <TargetVerb>{currentVerb.dictionary}</TargetVerb>
                <VerbMeaning>
                  ({currentVerb.reading}) - {currentVerb.meaning}
                </VerbMeaning>

                <InstructionBox>
                  Ubah ke: {formLabels[targetForm]}
                </InstructionBox>
              </QuestionContainer>

              {inputType === "multiple-choice" ? (
                <OptionsGrid>
                  {options.map((option, index) => {
                    const isCorrectAnswer =
                      option === currentVerb.forms[targetForm];
                    const isSelected = selectedAnswer === option;

                    let showCorrect = false;
                    let showWrong = false;

                    if (selectedAnswer !== null) {
                      if (isCorrectAnswer) showCorrect = true;
                      if (isSelected && !isCorrectAnswer) showWrong = true;
                    }

                    return (
                      <OptionButton
                        key={index}
                        onClick={() => handleMCAnswer(option)}
                        $disabled={selectedAnswer !== null}
                        $isCorrect={showCorrect}
                        $isWrong={showWrong}
                      >
                        {option}
                      </OptionButton>
                    );
                  })}
                </OptionsGrid>
              ) : (
                <TypingContainer onSubmit={handleTypingSubmit}>
                  <TypeInput
                    ref={inputRef}
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    placeholder="Ketik jawaban (Kanji/Kana)..."
                    disabled={typingFeedback !== null}
                    $isCorrect={typingFeedback === "correct"}
                    $isWrong={typingFeedback === "wrong"}
                    autoComplete="off"
                  />
                  <StartButton
                    type="submit"
                    disabled={typingFeedback !== null || !typedAnswer.trim()}
                  >
                    Jawab
                  </StartButton>

                  {typingFeedback !== null && (
                    <FeedbackText $isCorrect={typingFeedback === "correct"}>
                      {typingFeedback === "correct"
                        ? "Tepat Sekali!"
                        : `Salah. Jawaban yang benar: ${currentVerb.forms[targetForm]}`}
                    </FeedbackText>
                  )}
                </TypingContainer>
              )}
            </>
          )}

          {gameState === "result" && (
            <ResultScreen>
              <Header>
                <Title>
                  {isMobileView && lives === 0 ? "Game Over! 😢" : "Selesai!"}
                </Title>
                <Subtitle>
                  {isMobileView && lives === 0
                    ? "Kamu kehabisan nyawa."
                    : "Latihan yang bagus."}
                </Subtitle>
              </Header>
              <FinalScore>
                {score} / {totalQuestions}
              </FinalScore>
              {!(isMobileView && lives === 0) && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#10b981",
                    background: "rgba(16, 185, 129, 0.1)",
                    padding: "0.6rem 1.5rem",
                    borderRadius: "999px",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    marginBottom: "2rem",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.1)",
                  }}
                >
                  🏆 +{isMobileView ? 40 : score * 15} EXP Gained
                </div>
              )}
              <ResultMessage>
                {isMobileView && lives === 0
                  ? "Jangan menyerah! Teruslah belajar dan coba lagi."
                  : score === totalQuestions
                    ? "Sempurna! Kamu master konjugasi."
                    : score >= (isMobileView ? 4 : 7)
                      ? "Kerja bagus! Sedikit lagi menuju sempurna."
                      : "Teruslah berlatih! Kamu pasti bisa."}
              </ResultMessage>
              <StartButton onClick={startGame}>Main Lagi</StartButton>
            </ResultScreen>
          )}
        </GameArea>
      </ContentWrapper>
    </Container>
  );
}
