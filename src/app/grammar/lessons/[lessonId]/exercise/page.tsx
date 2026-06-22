"use client";

import { use, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { grammarLessons } from "@/data/grammarLessons";
import { useProgress } from "@/context/ProgressContext";

/* ─── Animations ───────────────────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { transform: scale(0.92); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

/* ─── Styled components ────────────────────────────────────────────────── */
const Screen = styled.div`
  min-height: 92vh;
  background: radial-gradient(
    circle at top right,
    rgba(79, 70, 229, 0.04) 0%,
    transparent 60%
  );
  display: flex;
  flex-direction: column;
  color: var(--foreground);
`;

const Container = styled.div`
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  animation: ${fadeUp} 0.4s ease both;

  @media (max-width: 600px) {
    padding: 1.25rem 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
`;

const CloseBtn = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border);
  transition: all 0.2s;
  &:hover {
    color: var(--foreground);
    border-color: var(--primary);
  }
`;

const ProgressTrack = styled.div`
  flex: 1;
  height: 12px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: linear-gradient(90deg, var(--primary), #a855f7);
  border-radius: 99px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ScoreTracker = styled.div`
  font-weight: 800;
  font-size: 0.95rem;
  color: var(--text-secondary);
`;

/* Question Layout */
const QuestionArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 80px; /* Space for the bottom check bar */
`;

const QuestionTitle = styled.h2`
  font-size: 1.45rem;
  font-weight: 800;
  margin: 0 0 1.5rem;
  text-align: center;
  color: var(--foreground);
`;

const SentencePrompt = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  color: var(--foreground);

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

/* Question Type: Fill in particle */
const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ParticleInput = styled.input`
  width: 140px;
  height: 60px;
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  border-radius: 16px;
  border: 2px solid var(--border);
  background: var(--surface);
  color: var(--foreground);
  outline: none;
  transition: all 0.25s;

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.15);
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.4;
  }
`;

/* Question Type: Translate Choice */
const ChoiceGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const ChoiceCard = styled.button<{ $selected: boolean; $disabled: boolean }>`
  width: 100%;
  padding: 1.1rem 1.5rem;
  border-radius: 18px;
  border: 2px solid
    ${({ $selected }) => ($selected ? "var(--primary)" : "var(--border)")};
  background: ${({ $selected }) =>
    $selected
      ? "rgba(var(--primary-rgb, 79, 70, 229), 0.08)"
      : "var(--surface)"};
  color: var(--foreground);
  font-size: 1.05rem;
  font-weight: 600;
  text-align: left;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  transition: all 0.2s;

  ${({ $selected, $disabled }) =>
    !$selected &&
    !$disabled &&
    `
    &:hover {
      border-color: rgba(79, 70, 229, 0.5);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
  `}

  @media (max-width: 600px) {
    padding: 0.85rem 1.15rem;
    font-size: 0.95rem;
    border-radius: 14px;
  }
`;

/* Question Type: Word Bank */
const WordBankWorkspace = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: 100%;
`;

const TargetArea = styled.div`
  width: 100%;
  min-height: 76px;
  border-bottom: 2px dashed var(--border);
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  justify-content: center;
  align-content: center;
  padding-bottom: 0.75rem;
`;

const TilePool = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  justify-content: center;
  margin-top: 1rem;
`;

const Tile = styled.button<{ $selected?: boolean; $disabled?: boolean }>`
  padding: 0.65rem 1.25rem;
  font-size: 1.15rem;
  font-weight: 700;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--foreground);
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $selected }) =>
    $selected &&
    `
    opacity: 0.25;
    background: var(--border);
    cursor: default;
    box-shadow: none;
    transform: scale(0.95);
  `}

  ${({ $selected, $disabled }) =>
    !$selected &&
    !$disabled &&
    `
    &:hover {
      border-color: var(--primary);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(79, 70, 229, 0.15);
    }
    &:active {
      transform: translateY(0);
    }
  `}

  @media (max-width: 600px) {
    padding: 0.45rem 0.9rem;
    font-size: 0.95rem;
    border-radius: 10px;
  }
`;

/* Bottom Action Bar */
const CheckBar = styled.div<{ $answered: boolean; $isCorrect: boolean | null }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ $answered, $isCorrect }) =>
    $answered
      ? $isCorrect
        ? "rgba(34, 197, 94, 0.12)"
        : "rgba(239, 68, 68, 0.12)"
      : "var(--surface)"};
  border-top: 1px solid
    ${({ $answered, $isCorrect }) =>
      $answered
        ? $isCorrect
          ? "rgba(34, 197, 94, 0.2)"
          : "rgba(239, 68, 68, 0.2)"
        : "var(--border)"};
  padding: 1.25rem 2rem;
  z-index: 999;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 600px) {
    padding: 1rem 1.25rem;
  }
`;

const BarInner = styled.div`
  max-width: 680px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const FeedbackText = styled.div<{ $isCorrect: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  color: ${({ $isCorrect }) => ($isCorrect ? "#15803d" : "#b91c1c")};

  .status-title {
    font-weight: 850;
    font-size: 1.15rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .explanation {
    font-size: 0.9rem;
    line-height: 1.4;
    opacity: 0.9;
  }
`;

const ActionButton = styled.button<{
  $primary?: boolean;
  $isCorrect?: boolean | null;
}>`
  padding: 0.9rem 2.25rem;
  border-radius: 16px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background: ${({ $primary, $isCorrect }) =>
    $primary
      ? $isCorrect === true
        ? "#22c55e"
        : $isCorrect === false
          ? "#ef4444"
          : "var(--primary)"
      : "var(--border)"};
  color: ${({ $primary }) => ($primary ? "#fff" : "var(--text-secondary)")};
  transition: all 0.2s;
  box-shadow: ${({ $primary }) =>
    $primary ? "0 4px 14px rgba(0, 0, 0, 0.15)" : "none"};

  &:hover {
    transform: translateY(-2px);
    opacity: 0.95;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

/* Completion View */
const CompleteWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1rem;
  animation: ${scaleIn} 0.45s ease both;
`;

const TrophyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 1.5rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const TitleComplete = styled.h1`
  font-size: 2.25rem;
  font-weight: 850;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, var(--primary) 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SubComplete = styled.p`
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 440px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  width: 100%;
  max-width: 400px;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  .val {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--foreground);
  }
  .lbl {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const RewardCard = styled.div`
  grid-column: span 2;
  background: linear-gradient(
    135deg,
    rgba(79, 70, 229, 0.08) 0%,
    rgba(168, 85, 247, 0.06) 100%
  );
  border: 1.5px solid var(--primary);
  border-radius: 20px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-weight: 800;
  font-size: 1.2rem;
  color: var(--primary);
  animation: ${pulse} 2s ease infinite;

  span.xp {
    background: var(--primary);
    color: #fff;
    padding: 0.25rem 0.75rem;
    border-radius: 99px;
    font-size: 0.9rem;
  }
`;

const HomeButton = styled(Link)`
  width: 100%;
  max-width: 320px;
  padding: 1rem 2rem;
  border-radius: 16px;
  background: var(--primary);
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.05rem;
  box-shadow: 0 8px 24px -6px rgba(79, 70, 229, 0.4);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px -4px rgba(79, 70, 229, 0.5);
  }
`;

/* ─── Component ────────────────────────────────────────────────────────── */
export default function GrammarExercisePage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = use(params);
  const router = useRouter();
  const { markExerciseCompleted } = useProgress();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [wordBankSelection, setWordBankSelection] = useState<number[]>([]);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const lesson = grammarLessons.find((l) => l.id === lessonId);
  const exercises = lesson?.exercises ?? [];
  const exercise = exercises[currentIdx];

  // Set up Word Bank shuffler
  useEffect(() => {
    if (exercise && exercise.type === "word-bank" && exercise.words) {
      // Shuffling
      const wordsCopy = [...exercise.words];
      setShuffledWords(wordsCopy.sort(() => Math.random() - 0.5));
      setWordBankSelection([]);
    } else {
      setShuffledWords([]);
      setWordBankSelection([]);
    }
    // Reset answers
    setSelectedOption(null);
    setInputText("");
    setAnswered(false);
    setIsCorrect(null);
  }, [currentIdx, exercise]);

  // Handle marking complete on component mounts of completion view
  useEffect(() => {
    if (completed && lesson) {
      markExerciseCompleted(lesson.id);
    }
  }, [completed, lesson, markExerciseCompleted]);

  if (!lesson || exercises.length === 0) {
    return (
      <Screen>
        <Container>
          <QuestionTitle style={{ marginTop: "4rem" }}>
            Latihan Tidak Ditemukan
          </QuestionTitle>
          <HomeButton href="/grammar/lessons" style={{ alignSelf: "center" }}>
            Kembali ke Pelajaran
          </HomeButton>
        </Container>
      </Screen>
    );
  }

  const pct = Math.round((currentIdx / exercises.length) * 100);

  function checkAnswer() {
    if (answered) return;

    let correct = false;

    if (exercise.type === "fill-particle") {
      const userText = inputText.trim();
      correct = userText === exercise.target;
    } else if (exercise.type === "translate-choice") {
      correct = selectedOption === exercise.correct;
    } else if (exercise.type === "word-bank" && exercise.answer) {
      const userArray = wordBankSelection.map((idx) => shuffledWords[idx]);
      correct =
        userArray.length === exercise.answer.length &&
        userArray.every((val, i) => val === exercise.answer![i]);
    }

    setIsCorrect(correct);
    setAnswered(true);
    if (correct) {
      setScore((s) => s + 1);
    }
  }

  function handleContinue() {
    if (currentIdx + 1 < exercises.length) {
      setCurrentIdx((idx) => idx + 1);
    } else {
      setCompleted(true);
    }
  }

  function toggleWordBankTile(indexInShuffled: number) {
    if (answered) return;
    if (wordBankSelection.includes(indexInShuffled)) {
      // Remove it
      setWordBankSelection((sel) => sel.filter((i) => i !== indexInShuffled));
    } else {
      // Add it
      setWordBankSelection((sel) => [...sel, indexInShuffled]);
    }
  }

  // Determine if check button is disabled
  let isCheckDisabled = true;
  if (exercise) {
    if (exercise.type === "fill-particle") {
      isCheckDisabled = inputText.trim().length === 0;
    } else if (exercise.type === "translate-choice") {
      isCheckDisabled = selectedOption === null;
    } else if (exercise.type === "word-bank") {
      isCheckDisabled = wordBankSelection.length === 0;
    }
  }

  if (completed) {
    const accuracy = Math.round((score / exercises.length) * 100);
    return (
      <Screen>
        <Container>
          <CompleteWrapper>
            <TrophyIcon>🌸</TrophyIcon>
            <TitleComplete>Pelajaran Selesai!</TitleComplete>
            <SubComplete>
              Hebat! Anda telah berhasil menyelesaikan latihan untuk{" "}
              <strong>
                Lesson {lesson.lessonNumber}: {lesson.title}
              </strong>
              .
            </SubComplete>

            <StatsGrid>
              <StatCard>
                <div className="val">
                  {score} / {exercises.length}
                </div>
                <div className="lbl">Skor Benar</div>
              </StatCard>
              <StatCard>
                <div className="val">{accuracy}%</div>
                <div className="lbl">Akurasi</div>
              </StatCard>
              <RewardCard>
                <span>Reward:</span>
                <span className="xp">+50 EXP Gained</span>
              </RewardCard>
            </StatsGrid>

            <HomeButton href={`/grammar/lessons/${lesson.id}`}>
              Selesai &amp; Kembali
            </HomeButton>
          </CompleteWrapper>
        </Container>
      </Screen>
    );
  }

  return (
    <Screen>
      <Container>
        {/* Header with Close and Progress */}
        <Header>
          <CloseBtn href={`/grammar/lessons/${lessonId}`}>✕</CloseBtn>
          <ProgressTrack>
            <ProgressFill $pct={pct} />
          </ProgressTrack>
          <ScoreTracker>
            {currentIdx + 1} / {exercises.length}
          </ScoreTracker>
        </Header>

        {/* Question body */}
        <QuestionArea>
          <QuestionTitle>{exercise.question}</QuestionTitle>

          {/* Prompt Sentence */}
          {exercise.sentence && (
            <SentencePrompt>
              {exercise.type === "fill-particle"
                ? exercise.sentence.replace("___", " _ ")
                : exercise.sentence}
            </SentencePrompt>
          )}

          {/* Render inputs based on question type */}
          {exercise.type === "fill-particle" && (
            <InputWrapper>
              <ParticleInput
                type="text"
                placeholder="?"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={answered}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isCheckDisabled && !answered) {
                    checkAnswer();
                  }
                }}
                autoFocus
              />
            </InputWrapper>
          )}

          {exercise.type === "translate-choice" && exercise.choices && (
            <ChoiceGrid>
              {exercise.choices.map((choice, idx) => (
                <ChoiceCard
                  key={idx}
                  $selected={selectedOption === choice}
                  $disabled={answered}
                  onClick={() => !answered && setSelectedOption(choice)}
                >
                  {choice}
                </ChoiceCard>
              ))}
            </ChoiceGrid>
          )}

          {exercise.type === "word-bank" && (
            <WordBankWorkspace>
              {/* Output / selected area */}
              <TargetArea>
                {wordBankSelection.map((shuffledIndex, selIdx) => (
                  <Tile
                    key={selIdx}
                    onClick={() => toggleWordBankTile(shuffledIndex)}
                    $disabled={answered}
                  >
                    {shuffledWords[shuffledIndex]}
                  </Tile>
                ))}
              </TargetArea>

              {/* Pool area */}
              <TilePool>
                {shuffledWords.map((word, idx) => {
                  const isSelected = wordBankSelection.includes(idx);
                  return (
                    <Tile
                      key={idx}
                      $selected={isSelected}
                      $disabled={answered}
                      onClick={() => !isSelected && toggleWordBankTile(idx)}
                    >
                      {word}
                    </Tile>
                  );
                })}
              </TilePool>
            </WordBankWorkspace>
          )}
        </QuestionArea>
      </Container>

      {/* Sticky footer check bar */}
      <CheckBar $answered={answered} $isCorrect={isCorrect}>
        <BarInner>
          {answered ? (
            <>
              <FeedbackText $isCorrect={isCorrect ?? false}>
                <div className="status-title">
                  {isCorrect ? (
                    <>
                      <span>✓</span> Jawaban Benar!
                    </>
                  ) : (
                    <>
                      <span>✗</span> Kurang Tepat
                    </>
                  )}
                </div>
                {!isCorrect && exercise.target && (
                  <div className="explanation">
                    Jawaban yang benar: <strong>{exercise.target}</strong>
                  </div>
                )}
                {!isCorrect && exercise.answer && (
                  <div className="explanation">
                    Jawaban yang benar:{" "}
                    <strong>{exercise.answer.join(" ")}</strong>
                  </div>
                )}
                {exercise.hint && (
                  <div className="explanation" style={{ marginTop: "0.2rem" }}>
                    💡 {exercise.hint}
                  </div>
                )}
              </FeedbackText>
              <ActionButton
                $primary
                $isCorrect={isCorrect}
                onClick={handleContinue}
              >
                {currentIdx + 1 === exercises.length
                  ? "Selesaikan"
                  : "Lanjutkan →"}
              </ActionButton>
            </>
          ) : (
            <>
              <div
                style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
              >
                Pastikan jawaban Anda terisi sebelum memeriksa.
              </div>
              <ActionButton
                $primary
                disabled={isCheckDisabled}
                onClick={checkAnswer}
              >
                Periksa Jawaban
              </ActionButton>
            </>
          )}
        </BarInner>
      </CheckBar>
    </Screen>
  );
}
