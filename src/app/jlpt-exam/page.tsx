"use client";

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import {
  generatorBank,
  GeneratorItem,
  GrammarItem,
} from "@/data/generatorBank";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem 2rem 4rem;
  min-height: 90vh;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    min-height: auto;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 850;
  margin-bottom: 0.5rem;
  color: var(--foreground);
  text-align: center;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 2.5rem;
  box-shadow: var(--shadow-md);
  margin-bottom: 2rem;
  border-bottom: 6px solid var(--border);

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 20px;
  }
`;

const SelectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const LevelButton = styled.button<{ $active: boolean; $color: string }>`
  background: ${({ $active, $color }) =>
    $active ? `${$color}15` : "var(--surface)"};
  border: 2px solid
    ${({ $active, $color }) => ($active ? $color : "var(--border)")};
  border-bottom-width: 5px;
  border-color: ${({ $active, $color }) =>
    $active ? $color : "var(--border)"};
  color: ${({ $active, $color }) =>
    $active ? $color : "var(--text-secondary)"};
  border-radius: 18px;
  padding: 1.25rem 1rem;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.15s ease;
  outline: none;

  &:hover {
    border-color: ${({ $color }) => $color};
    color: ${({ $color }) => $color};
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

const StartBtn = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem 2.5rem;
  font-weight: 800;
  font-size: 1.15rem;
  cursor: pointer;
  width: 100%;
  border-bottom: 5px solid rgba(0, 0, 0, 0.22);
  transition: all 0.15s ease;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

// Running Exam Styles
const ExamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const TimerText = styled.div<{ $danger: boolean }>`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ $danger }) => ($danger ? "#ef4444" : "var(--primary)")};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ $danger }) =>
    $danger ? "rgba(239,68,68,0.1)" : "rgba(79,70,229,0.08)"};
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 1px solid
    ${({ $danger }) => ($danger ? "rgba(239,68,68,0.2)" : "var(--border)")};
`;

const ProgressInfo = styled.div`
  font-weight: 700;
  color: var(--text-secondary);
`;

const ProgressBar = styled.div`
  height: 8px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 2.5rem;
`;

const ProgressFill = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}%;
  height: 100%;
  background: var(--primary);
  border-radius: 99px;
  transition: width 0.3s ease;
`;

const QuestionText = styled.h2`
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--foreground);
  margin-bottom: 0.5rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const QuestionTranslation = styled.p`
  color: var(--text-secondary);
  font-size: 1.05rem;
  margin-bottom: 2rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 2.5rem;
`;

const OptionButton = styled.button<{ $selected: boolean }>`
  background: ${({ $selected }) =>
    $selected ? "rgba(79,70,229,0.08)" : "var(--surface)"};
  border: 2px solid
    ${({ $selected }) => ($selected ? "var(--primary)" : "var(--border)")};
  border-bottom-width: 4px;
  color: ${({ $selected }) =>
    $selected ? "var(--primary)" : "var(--foreground)"};
  border-radius: 16px;
  padding: 1rem 1.25rem;
  font-weight: 700;
  font-size: 1.05rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;
  outline: none;

  &:hover {
    border-color: var(--primary);
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

const NextBtn = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 14px;
  padding: 0.85rem 2rem;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-end;
  border-bottom: 4px solid rgba(0, 0, 0, 0.2);
  transition: all 0.15s ease;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

// Result Page Styles
const ResultHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ScoreBadge = styled.div`
  font-size: 4rem;
  font-weight: 900;
  color: var(--primary);
  margin-bottom: 0.5rem;
`;

const PassStatus = styled.div<{ $passed: boolean }>`
  font-size: 1.8rem;
  font-weight: 900;
  color: ${({ $passed }) => ($passed ? "#10b981" : "#ef4444")};
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CorrectionItem = styled.div<{ $correct: boolean }>`
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 5px solid ${({ $correct }) => ($correct ? "#10b981" : "#ef4444")};
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.25rem;
`;

const CorrectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 800;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
`;

const CorrectionDetails = styled.div`
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-top: 0.5rem;
  background: rgba(255, 255, 255, 0.02);
  padding: 0.75rem;
  border-radius: 10px;
  border: 1px solid var(--border);
`;

interface ExamQuestion {
  type: "vocabulary" | "grammar";
  question: string;
  translation: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function JLPTExam() {
  const { addExp, recordQuizResult } = useProgress();
  const [level, setLevel] = useState<"N5" | "N4" | "N3" | "N2" | "N1">("N5");
  const [gameState, setGameState] = useState<"select" | "exam" | "result">(
    "select",
  );

  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes total
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const levelColors = {
    N5: "#10b981", // Emerald
    N4: "#8b5cf6", // Violet
    N3: "#ea580c", // Orange
    N2: "#3b82f6", // Blue
    N1: "#dc2626", // Red
  };

  const handleStartExam = () => {
    // Generate questions for this level
    const bank = generatorBank[level];
    const generated: ExamQuestion[] = [];

    // Add up to 5 Vocabulary MCQ questions
    const shuffledVocab = [...bank.vocabulary].sort(() => 0.5 - Math.random());
    const vocabQuestions = shuffledVocab.slice(0, 5).map((item) => {
      // Pick 3 random distractor words
      const distractors = bank.vocabulary
        .filter((v) => v.english !== item.english)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((v) => v.english);

      const options = [item.english, ...distractors].sort(
        () => 0.5 - Math.random(),
      );

      return {
        type: "vocabulary" as const,
        question: `Apa arti dari kosakata "${item.japanese}" (${item.romaji})?`,
        translation: "Pilih terjemahan bahasa Inggris yang paling tepat.",
        options,
        correctAnswer: item.english,
        explanation: `Kosakata "${item.japanese}" dibaca "${item.romaji}" berarti "${item.english}".`,
      };
    });
    generated.push(...vocabQuestions);

    // Add Grammar MCQ questions
    const shuffledGrammar = [...bank.grammar].sort(() => 0.5 - Math.random());
    const grammarQuestions = shuffledGrammar.slice(0, 5).map((item) => ({
      type: "grammar" as const,
      question: `Lengkapi kalimat berikut: ${item.exampleSentence.replace(item.answer, " ___ ")}`,
      translation: `Terjemahan: "${item.englishTranslation}"`,
      options: item.options,
      correctAnswer: item.answer,
      explanation: item.explanation,
    }));
    generated.push(...grammarQuestions);

    // Randomize order of questions
    setQuestions(generated.sort(() => 0.5 - Math.random()));
    setCurrentIdx(0);
    setAnswers([]);
    setSelectedOpt(null);
    setTimeLeft(180);
    setGameState("exam");

    // Start Timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleFinishExam(answers, generated);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleNextQuestion = () => {
    const updatedAnswers = [...answers, selectedOpt || ""];
    setAnswers(updatedAnswers);
    setSelectedOpt(null);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      handleFinishExam(updatedAnswers, questions);
    }
  };

  const handleFinishExam = (
    finalAnswers: string[],
    currentQuestions: ExamQuestion[],
  ) => {
    setGameState("result");

    // Calculate Score
    let correctCount = 0;
    currentQuestions.forEach((q, idx) => {
      if (finalAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const xpEarned = correctCount * 15 + 40; // 15 EXP per correct answer + 40 completion bonus
    addExp(xpEarned);
    recordQuizResult(
      correctCount,
      currentQuestions.length,
      `JLPT Mock Exam (${level})`,
    );
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Rendering
  if (gameState === "result") {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correctCount++;
    });
    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= 60; // 60% Passing Score

    return (
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "SakuraFitur", href: "/sakura-fitur" },
          ]}
          current="Hasil Ujian"
        />

        <ResultHeader>
          <Title>Hasil Ujian Mock {level}</Title>
          <ScoreBadge>{percentage}%</ScoreBadge>
          <PassStatus $passed={passed}>
            {passed ? "LULUS (合格) 🎉" : "GAGAL (不合格) ❌"}
          </PassStatus>
          <p style={{ color: "var(--text-secondary)" }}>
            Anda berhasil menjawab benar {correctCount} dari {questions.length}{" "}
            soal.
            <br />
            <strong>+{correctCount * 15 + 40} EXP</strong> telah ditambahkan ke
            progres Anda!
          </p>
        </ResultHeader>

        <Card>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              marginBottom: "1.5rem",
            }}
          >
            Lembar Jawaban & Pembahasan
          </h2>

          {questions.map((q, idx) => {
            const isCorrect = answers[idx] === q.correctAnswer;
            return (
              <CorrectionItem key={idx} $correct={isCorrect}>
                <CorrectionHeader>
                  <span style={{ color: isCorrect ? "#10b981" : "#ef4444" }}>
                    {isCorrect ? "✓ BENAR" : "✗ SALAH"}
                  </span>
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      textTransform: "uppercase",
                    }}
                  >
                    Soal {idx + 1} • {q.type}
                  </span>
                </CorrectionHeader>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {q.question}
                </div>
                <div
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-secondary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {q.translation}
                </div>
                <div style={{ fontSize: "0.95rem" }}>
                  Jawaban Anda:{" "}
                  <strong style={{ color: isCorrect ? "#10b981" : "#ef4444" }}>
                    {answers[idx] || "(Kosong)"}
                  </strong>
                </div>
                {!isCorrect && (
                  <div style={{ fontSize: "0.95rem", marginTop: "0.25rem" }}>
                    Jawaban Benar:{" "}
                    <strong style={{ color: "#10b981" }}>
                      {q.correctAnswer}
                    </strong>
                  </div>
                )}
                <CorrectionDetails>
                  <strong>Penjelasan:</strong> {q.explanation}
                </CorrectionDetails>
              </CorrectionItem>
            );
          })}
        </Card>

        <div style={{ display: "flex", gap: "1rem" }}>
          <StartBtn
            as={Link}
            href="/"
            style={{ textDecoration: "none", textAlign: "center" }}
          >
            Kembali ke Beranda
          </StartBtn>
          <StartBtn
            onClick={() => setGameState("select")}
            style={{
              background: "transparent",
              color: "var(--primary)",
              border: "2px solid var(--primary)",
              borderBottomWidth: "5px",
            }}
          >
            Uji Ulang
          </StartBtn>
        </div>
      </Container>
    );
  }

  if (gameState === "exam") {
    const currentQuestion = questions[currentIdx];
    const progressPercent = (currentIdx / questions.length) * 100;

    return (
      <Container>
        <ExamHeader>
          <ProgressInfo>
            Pertanyaan {currentIdx + 1} dari {questions.length}
          </ProgressInfo>
          <TimerText $danger={timeLeft < 30}>
            ⏱️ {formatTime(timeLeft)}
          </TimerText>
        </ExamHeader>

        <ProgressBar>
          <ProgressFill $width={progressPercent} />
        </ProgressBar>

        <Card>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "var(--primary)",
              letterSpacing: "0.08em",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Kategori: {currentQuestion.type}
          </span>
          <QuestionText>{currentQuestion.question}</QuestionText>
          <QuestionTranslation>
            {currentQuestion.translation}
          </QuestionTranslation>

          <OptionsContainer>
            {currentQuestion.options.map((opt) => (
              <OptionButton
                key={opt}
                $selected={selectedOpt === opt}
                onClick={() => setSelectedOpt(opt)}
              >
                {opt}
              </OptionButton>
            ))}
          </OptionsContainer>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <NextBtn
              onClick={handleNextQuestion}
              disabled={selectedOpt === null}
              style={{
                opacity: selectedOpt === null ? 0.6 : 1,
                cursor: selectedOpt === null ? "not-allowed" : "pointer",
              }}
            >
              {currentIdx < questions.length - 1
                ? "Pertanyaan Berikutnya →"
                : "Selesai & Kirim"}
            </NextBtn>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="JLPT Exam" />

      <Title>Simulasi Ujian JLPT</Title>
      <Subtitle>
        Uji kesiapan Anda untuk ujian sertifikasi bahasa Jepang resmi di bawah
        tekanan waktu.
      </Subtitle>

      <Card>
        <h2
          style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1rem" }}
        >
          Pilih Tingkat Level JLPT
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.95rem",
            marginBottom: "2rem",
          }}
        >
          Tiap ujian terdiri atas 10 pertanyaan (campuran kosakata dan tata
          bahasa) dengan batas waktu 3 menit.
        </p>

        <SelectionGrid>
          {(["N5", "N4", "N3", "N2", "N1"] as const).map((lvl) => (
            <LevelButton
              key={lvl}
              $active={level === lvl}
              $color={levelColors[lvl]}
              onClick={() => setLevel(lvl)}
            >
              JLPT {lvl}
            </LevelButton>
          ))}
        </SelectionGrid>

        <StartBtn onClick={handleStartExam}>Mulai Ujian JLPT {level}</StartBtn>
      </Card>
    </Container>
  );
}
