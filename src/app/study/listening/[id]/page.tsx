"use client";

import styled, { keyframes, css } from "styled-components";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { listeningExercises, ListeningQuiz } from "@/data/listening";
import { useProgress } from "@/context/ProgressContext";
import { ClickableJapaneseText } from "@/components/common/ClickableJapaneseText";
import { playJapaneseAudio } from "@/lib/audio";

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem 6rem;
  min-height: 100vh;

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
  max-width: 850px;
  margin: 0 auto;
  width: 100%;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
`;

const ScenarioBox = styled.div`
  background: var(--surface);
  border-left: 4px solid var(--primary);
  padding: 1.5rem 2rem;
  margin: 2rem 0 3rem;
  border-radius: 0 16px 16px 0;
  font-size: 1.2rem;
  color: var(--text-secondary);
  line-height: 1.6;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(59, 130, 246, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
`;

const PlayButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 0;
`;

const PlayButton = styled.button<{ $isPlaying: boolean }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${(props) => (props.$isPlaying ? "#ef4444" : "#3b82f6")};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 10px 30px
    ${(props) =>
      props.$isPlaying ? "rgba(239, 68, 68, 0.3)" : "rgba(59, 130, 246, 0.3)"};

  ${(props) =>
    props.$isPlaying &&
    css`
      animation: ${pulseAnimation} 2s infinite;
    `}

  &:hover {
    transform: scale(1.05);
  }

  svg {
    width: 50px;
    height: 50px;
    fill: currentColor;
    margin-left: ${(props) => (props.$isPlaying ? "0" : "8px")};
  }
`;

const PlayLabel = styled.div`
  margin-top: 1.5rem;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const TranscriptSection = styled.div`
  margin-top: 4rem;
`;

const TranscriptToggle = styled.button`
  width: 100%;
  padding: 1.5rem;
  background: var(--surface);
  border: 2px dashed var(--border);
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(79, 70, 229, 0.05);
    border-color: var(--primary);
  }
`;

const DialogueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const DialogueBubble = styled.div`
  display: flex;
  gap: 1.5rem;
  background: var(--surface);
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px solid var(--border);

  ruby {
    font-family: inherit;
    ruby-align: center;
  }

  rt {
    font-size: 0.6em;
    color: var(--primary);
    opacity: 0.8;
    transform: translateY(10%);
  }
`;

const Avatar = styled.div`
  font-size: 2.5rem;
  background: var(--background);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
`;

const DialogueContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;

  .speaker-name {
    font-weight: 700;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  .jp-text {
    font-size: 1.4rem;
    line-height: 2;
    color: var(--foreground);
  }

  .en-text {
    font-size: 1.05rem;
    color: var(--text-secondary);
    font-style: italic;
    margin-top: 0.5rem;
  }
`;

const QuizSection = styled.div`
  margin-top: 4rem;
  padding: 3rem;
  background: var(--surface);
  border-radius: 24px;
  border: 1px solid var(--border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  @media (max-width: 600px) {
    padding: 2rem 1.5rem;
  }
`;

const QuestionText = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const OptionBtn = styled.button<{
  $state: "default" | "selected" | "correct" | "wrong";
}>`
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 2px solid
    ${(props) =>
      props.$state === "correct"
        ? "#10b981"
        : props.$state === "wrong"
          ? "#ef4444"
          : props.$state === "selected"
            ? "#3b82f6"
            : "var(--border)"};
  background: ${(props) =>
    props.$state === "correct"
      ? "rgba(16, 185, 129, 0.1)"
      : props.$state === "wrong"
        ? "rgba(239, 68, 68, 0.1)"
        : props.$state === "selected"
          ? "rgba(59, 130, 246, 0.05)"
          : "transparent"};
  color: var(--foreground);
  font-size: 1.1rem;
  font-weight: 600;
  text-align: left;
  cursor: ${(props) =>
    props.$state === "default" || props.$state === "selected"
      ? "pointer"
      : "default"};
  transition: all 0.2s;

  &:hover {
    ${(props) =>
      (props.$state === "default" || props.$state === "selected") &&
      `
      border-color: #3b82f6;
      background: rgba(59, 130, 246, 0.05);
    `}
  }
`;

const SubmitBtn = styled.button`
  margin-top: 2rem;
  padding: 0.8rem 2rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 99px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    background: var(--border);
    cursor: not-allowed;
    color: var(--text-secondary);
  }
`;

const Explanation = styled.div<{ $isCorrect: boolean }>`
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: ${(props) =>
    props.$isCorrect ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"};
  border-left: 4px solid
    ${(props) => (props.$isCorrect ? "#10b981" : "#ef4444")};

  strong {
    color: ${(props) => (props.$isCorrect ? "#10b981" : "#ef4444")};
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  span {
    color: var(--text-secondary);
    line-height: 1.5;
    display: inline-block;
  }
`;

function QuizBlock({
  quiz,
  onAnswered,
}: {
  quiz: ListeningQuiz;
  onAnswered: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === quiz.correctAnswerIndex;

  const handleSubmit = () => {
    setSubmitted(true);
    onAnswered();
  };

  return (
    <div>
      <QuestionText>{quiz.question}</QuestionText>
      <OptionsGrid>
        {quiz.options.map((opt, idx) => {
          let state: "default" | "selected" | "correct" | "wrong" = "default";

          if (submitted) {
            if (idx === quiz.correctAnswerIndex) state = "correct";
            else if (idx === selected) state = "wrong";
          } else {
            if (idx === selected) state = "selected";
          }

          return (
            <OptionBtn
              key={idx}
              $state={state}
              onClick={() => !submitted && setSelected(idx)}
              disabled={submitted}
            >
              {opt}
            </OptionBtn>
          );
        })}
      </OptionsGrid>

      {!submitted && (
        <SubmitBtn onClick={handleSubmit} disabled={selected === null}>
          Check Answer
        </SubmitBtn>
      )}

      {submitted && (
        <Explanation $isCorrect={isCorrect}>
          <strong>{isCorrect ? "Correct!" : "Incorrect"}</strong>
          <span>{quiz.explanation}</span>
        </Explanation>
      )}
    </div>
  );
}

const CompleteBtn = styled.button<{ $completed: boolean }>`
  width: 100%;
  padding: 1.25rem;
  border-radius: 16px;
  background: ${(props) => (props.$completed ? "#10b981" : "var(--surface)")};
  color: ${(props) => (props.$completed ? "white" : "var(--primary)")};
  border: 2px solid
    ${(props) => (props.$completed ? "#10b981" : "var(--primary)")};
  font-size: 1.2rem;
  font-weight: 800;
  cursor: ${(props) => (props.$completed ? "default" : "pointer")};
  margin-top: 3rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: ${(props) => (props.$completed ? "none" : "translateY(-2px)")};
    box-shadow: ${(props) =>
      props.$completed ? "none" : "0 10px 25px -5px rgba(79, 70, 229, 0.2)"};
  }
`;

const NextStepsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  animation: fadeIn 0.5s ease-out forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const NavBtn = styled(Link)<{ $primary?: boolean }>`
  flex: 1;
  padding: 1.25rem;
  border-radius: 16px;
  text-align: center;
  font-weight: 800;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s;
  background: ${(props) =>
    props.$primary ? "var(--primary)" : "var(--surface)"};
  color: ${(props) => (props.$primary ? "white" : "var(--foreground)")};
  border: 2px solid
    ${(props) => (props.$primary ? "var(--primary)" : "var(--border)")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.$primary
        ? "0 10px 25px -5px rgba(79, 70, 229, 0.3)"
        : "0 10px 25px -5px rgba(0,0,0,0.05)"};
  }
`;

export default function ListeningDetailPage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isQuizAnswered, setIsQuizAnswered] = useState(false);
  const { progress, markExerciseCompleted } = useProgress();

  const isPlayingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cleanup synthesis on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  if (!mounted) return null;

  const id =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
        ? params.id[0]
        : null;
  const exercise = listeningExercises.find((e) => e.id === id);

  if (!exercise) {
    return (
      <Container>
        <BreadcrumbWrapper>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Listening", href: "/study/listening" },
            ]}
            current="Not Found"
          />
        </BreadcrumbWrapper>
        <ContentWrapper>
          <Title>Exercise Not Found</Title>
        </ContentWrapper>
      </Container>
    );
  }

  const currentIndex = listeningExercises.findIndex(
    (e) => e.id === exercise.id,
  );
  const nextExercise =
    currentIndex >= 0 && currentIndex < listeningExercises.length - 1
      ? listeningExercises[currentIndex + 1]
      : null;

  const isCompleted = !!progress.completedExercises?.includes(exercise.id);

  const togglePlay = async () => {
    if (isPlayingRef.current) {
      window.speechSynthesis?.cancel();
      // Stop audio element if exists
      const audio = document.getElementById(
        "exercise-audio",
      ) as HTMLAudioElement;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      isPlayingRef.current = false;
      setIsPlaying(false);
      return;
    }

    isPlayingRef.current = true;
    setIsPlaying(true);

    // Check for authentic audio file
    const exerciseAudio = exercise.audioUrl;
    if (exerciseAudio) {
      const audio = new Audio(exerciseAudio);
      audio.id = "exercise-audio";
      audio.onended = () => {
        isPlayingRef.current = false;
        setIsPlaying(false);
      };
      audio.play().catch((err) => {
        console.error("Audio play failed, falling back to TTS", err);
        playTTS();
      });
    } else {
      await playTTS();
    }
  };

  const playTTS = async () => {
    const speakLine = (line: {
      text: string;
      voiceSettings: { pitch: number; rate: number };
    }) =>
      new Promise<void>(async (resolve) => {
        await playJapaneseAudio(line.text, {
          pitch: line.voiceSettings.pitch,
          rate: line.voiceSettings.rate,
        });
        setTimeout(resolve, 600); // 600ms pause between speakers
      });

    for (const line of exercise.dialogue) {
      if (!isPlayingRef.current) break;
      if (!window.speechSynthesis) break;
      await speakLine(line);
    }

    isPlayingRef.current = false;
    setIsPlaying(false);
  };

  return (
    <Container>
      <BreadcrumbWrapper>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Listening", href: "/study/listening" },
          ]}
          current={exercise.title}
        />
      </BreadcrumbWrapper>

      <ContentWrapper>
        <ControlsContainer>
          <div>
            <span
              style={{
                background: "#3b82f6",
                color: "white",
                padding: "0.2rem 0.8rem",
                borderRadius: "99px",
                fontSize: "0.85rem",
                fontWeight: 700,
                marginRight: "1rem",
              }}
            >
              {exercise.level}
            </span>
            <Title style={{ display: "inline-block", fontSize: "2rem" }}>
              {exercise.title}
            </Title>
          </div>
        </ControlsContainer>

        <ScenarioBox>
          <strong>Scenario:</strong> {exercise.scenario}
        </ScenarioBox>

        <PlayButtonWrapper>
          <PlayButton $isPlaying={isPlaying} onClick={togglePlay}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </PlayButton>
          <PlayLabel>
            {isPlaying ? "Playing Dialogue..." : "Listen to Dialogue"}
          </PlayLabel>
        </PlayButtonWrapper>

        <QuizSection>
          <QuizBlock
            quiz={exercise.quiz}
            onAnswered={() => {
              setIsUnlocked(true);
              setIsQuizAnswered(true);
            }}
          />
        </QuizSection>

        <TranscriptSection>
          {!isUnlocked ? (
            <TranscriptToggle onClick={() => setIsUnlocked(true)}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Reveal Transcript
            </TranscriptToggle>
          ) : (
            <div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  borderBottom: "2px solid var(--border)",
                  paddingBottom: "1rem",
                }}
              >
                Dialogue Transcript
              </h3>
              <DialogueList>
                {exercise.dialogue.map((line, idx) => (
                  <DialogueBubble key={idx}>
                    <Avatar>{line.avatar}</Avatar>
                    <DialogueContent>
                      <div className="speaker-name">{line.speaker}</div>
                      <ClickableJapaneseText
                        className="jp-text"
                        html={line.displayHtml}
                      />
                      <div className="en-text">{line.translation}</div>
                    </DialogueContent>
                  </DialogueBubble>
                ))}
              </DialogueList>
            </div>
          )}
        </TranscriptSection>

        {!isCompleted && !isQuizAnswered && (
          <div
            style={{
              textAlign: "center",
              marginTop: "3rem",
              color: "var(--text-secondary)",
              fontWeight: 600,
            }}
          >
            🎧 Please answer the question to mark this listening as completed.
          </div>
        )}

        <CompleteBtn
          $completed={isCompleted}
          onClick={() => markExerciseCompleted(exercise.id)}
          disabled={isCompleted || !isQuizAnswered}
          style={{ opacity: !isCompleted && !isQuizAnswered ? 0.5 : 1 }}
        >
          {isCompleted ? (
            <>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Completed
            </>
          ) : (
            "Mark as Completed"
          )}
        </CompleteBtn>

        {isCompleted && (
          <NextStepsContainer>
            <NavBtn href="/study/listening">⬅ Back to List</NavBtn>
            {nextExercise && (
              <NavBtn href={`/study/listening/${nextExercise.id}`} $primary>
                Next Exercise ➡
              </NavBtn>
            )}
          </NextStepsContainer>
        )}
      </ContentWrapper>
    </Container>
  );
}
