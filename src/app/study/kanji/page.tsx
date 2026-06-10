"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useProgress } from "@/context/ProgressContext";
import { useDeviceMode } from "@/context/DeviceModeContext";
import { DrawingCanvas } from "@/components/Practice/Canvas";
import { KanjiWriter } from "@/components/Practice/KanjiWriter";

const PageWrapper = styled.div`
  min-height: 90vh;
  width: 100%;
  /* Premium radial background */
  background: radial-gradient(
    circle at top right,
    rgba(79, 70, 229, 0.05) 0%,
    transparent 60%
  );
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

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 4rem;
  max-width: 1000px;
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

const DropdownContainer = styled.div`
  position: relative;
  width: 160px;
`;

const DropdownTrigger = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--foreground);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  svg {
    transition: transform 0.2s;
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
    color: var(--text-secondary);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 50;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DropdownItem = styled.div<{ $isActive: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-weight: 500;
  color: ${({ $isActive }) =>
    $isActive ? "var(--primary)" : "var(--foreground)"};
  background: ${({ $isActive }) =>
    $isActive ? "rgba(79, 70, 229, 0.05)" : "transparent"};
  transition: background 0.2s;

  &:hover {
    background: rgba(79, 70, 229, 0.05);
    color: var(--primary);
  }
`;

const FlashcardContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
  max-width: 1200px;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    align-items: center;
  }
`;

const SectionTitle = styled.h3`
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
  font-weight: 700;
`;

const CanvasSection = styled.div`
  background: var(--surface);
  padding: 2rem;
  border-radius: 32px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 360px; /* Limit width but allow shrink */
  height: 460px; /* Fixed height to match card */
  justify-content: center;
  gap: 1rem;
`;

const DrawingArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 450px;
  width: 100%;
`;

const CardPerspective = styled.div`
  width: 340px;
  max-width: 100%; /* Responsive width */
  height: 460px; /* Increased to match canvas section */
  perspective: 1500px; /* Enhanced depth */
  cursor: pointer;
  position: relative;
  margin-bottom: 2.5rem;
`;

const CardInner = styled.div<{ $flipped: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  transform: ${({ $flipped }) => ($flipped ? "rotateY(180deg)" : "rotateY(0)")};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 32px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  text-align: center;
  /* Glass effect */
  /* Glass effect */
  background: var(--surface); /* Use theme variable which handles light/dark */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  background: var(--surface);
  color: var(--foreground);
  border: 1px solid var(--border);
`;

const BigChar = styled.div`
  font-size: 6rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  font-size: 6rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--foreground);
  line-height: 1;
`;

const PromptText = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Details = styled.div`
  margin-top: 0.5rem;
  text-align: left;
  width: 100%;
  font-size: 0.95rem;

  h4 {
    color: #4f46e5;
    margin-bottom: 0.25rem;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 700;
    margin-top: 1rem;

    &:first-child {
      margin-top: 0;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.4;
    color: #334155;
    margin: 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
  padding: 0 1rem;
`;

const ActionBtn = styled.button<{ $type: "easy" | "hard" | "flip" }>`
  padding: 1rem 2rem;
  border-radius: 999px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s;
  font-size: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  background: ${({ $type }) =>
    $type === "easy"
      ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
      : $type === "hard"
        ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
        : "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)"};

  color: white;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
    opacity: 0.95;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

interface KanjiDetails {
  meanings?: string[];
  on_readings?: string[];
  kun_readings?: string[];
}

export default function KanjiFlashcards() {
  const { deviceMode, isMounted } = useDeviceMode();
  const isMobileView = isMounted && deviceMode === "mobile";

  const [level, setLevel] = useState("n5");
  const [studyMode, setStudyMode] = useState<"read" | "write">("read");
  const [kanjiList, setKanjiList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<KanjiDetails | null>(null);
  const [clearTrigger, setClearTrigger] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });
  const SESSION_LIMIT = 10;

  const {
    progress,
    updateSRS,
    addExp,
    recordQuizResult,
    markExerciseCompleted,
  } = useProgress();

  // Fetch List
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 0);

    fetch(`/api/kanji/${level}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Smart Shuffle based on SRS
          const sorted = [...data].sort((a, b) => {
            const srsA = progress.srs[a];
            const srsB = progress.srs[b];

            if (!srsA && !srsB) return 0.5 - Math.random();
            if (!srsA) return -1;
            if (!srsB) return 1;

            return (
              new Date(srsA.nextReviewDate).getTime() -
              new Date(srsB.nextReviewDate).getTime()
            );
          });

          setKanjiList(sorted);
          setCurrentIndex(0);
          setFlipped(false);
          setSessionStats({ correct: 0, total: 0 });
        }
      })
      .finally(() => setLoading(false));

    return () => clearTimeout(timer);
  }, [level, progress.srs]);

  const currentKanji = kanjiList[currentIndex];

  const rateRecall = (quality: number) => {
    updateSRS(currentKanji, quality);
    addExp(quality * 3); // More EXP for Kanji
    setSessionStats((prev) => ({
      correct: prev.correct + (quality > 1 ? 1 : 0),
      total: prev.total + 1,
    }));
    nextCard();
  };

  // Fetch Details for current card (Back side)
  useEffect(() => {
    if (!currentKanji) return;

    fetch(`https://kanjiapi.dev/v1/kanji/${currentKanji}`)
      .then((res) => res.json())
      .then((data) => setDetails(data))
      .catch(() => setDetails(null));
  }, [currentKanji]);

  const nextCard = () => {
    setFlipped(false);
    setClearTrigger((prev) => prev + 1); // Auto clear canvas
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % kanjiList.length);
    }, 400); // Wait for flip back
  };

  const handleFinishSession = () => {
    recordQuizResult(
      sessionStats.correct,
      sessionStats.total,
      `Kanji (Level ${level.toUpperCase()})`,
    );
    addExp(50); // Bonus EXP for finishing a session
    if (level === "n5") markExerciseCompleted("n5-kanji");
    if (level === "n4") markExerciseCompleted("n4-kanji");
    if (level === "n3") markExerciseCompleted("n3-kanji-mastery");
    if (level === "n2") markExerciseCompleted("n2-kanji-2000");
    setSessionStats({ correct: 0, total: 0 });
    // Reshuffle or proceed
    setCurrentIndex(0);

    if (isMobileView) {
      window.location.href = "/";
    }
  };

  if (loading)
    return (
      <PageWrapper>
        <Container>
          <div style={{ color: "var(--text-secondary)" }}>Loading Kanji...</div>
        </Container>
      </PageWrapper>
    );

  if (sessionStats.total >= SESSION_LIMIT) {
    return (
      <PageWrapper
        style={
          isMobileView
            ? {
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }
            : {}
        }
      >
        <Container>
          <div
            style={{
              textAlign: "center",
              padding: isMobileView ? "3rem 2rem" : "4rem 2rem",
              background: "var(--surface)",
              borderRadius: isMobileView ? "32px" : "24px",
              border: "1px solid var(--border)",
              maxWidth: isMobileView ? "450px" : "none",
              width: "100%",
              boxShadow: isMobileView ? "var(--shadow-lg)" : "none",
              marginTop: isMobileView ? "0" : "4rem",
            }}
          >
            <h2
              style={{
                fontSize: isMobileView ? "2.2rem" : "2.5rem",
                marginBottom: "1rem",
                color: "#10b981",
              }}
            >
              Session Complete! 🎉
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                color: "var(--text-secondary)",
                marginBottom: "2rem",
              }}
            >
              You reviewed {SESSION_LIMIT} Kanji characters.
            </p>
            <div
              style={{
                fontSize: "4rem",
                fontWeight: 900,
                color: "var(--primary)",
                marginBottom: "2rem",
              }}
            >
              {sessionStats.correct}/{sessionStats.total}
            </div>
            <p
              style={{
                color: "#10b981",
                fontWeight: "bold",
                marginBottom: "3rem",
              }}
            >
              +50 EXP Bonus!
            </p>
            <button
              onClick={handleFinishSession}
              style={{
                background: "var(--primary)",
                color: "white",
                padding: "1rem 3rem",
                borderRadius: "999px",
                fontSize: "1.2rem",
                fontWeight: 800,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(79, 70, 229, 0.3)",
                width: isMobileView ? "100%" : "auto",
              }}
            >
              Continue Learning
            </button>
          </div>
        </Container>
      </PageWrapper>
    );
  }

  if (!currentKanji)
    return (
      <PageWrapper>
        <Container>No Kanji found for this level.</Container>
      </PageWrapper>
    );

  return (
    <PageWrapper>
      <Container>
        {isMobileView ? (
          <LessonHeader>
            <CloseLessonBtn href="/" title="Tutup Sesi">
              ✕
            </CloseLessonBtn>
            <LessonProgressBarContainer>
              <LessonProgressBarFill
                $percent={(sessionStats.total / SESSION_LIMIT) * 100}
              />
            </LessonProgressBarContainer>
            <div style={{ width: "38px" }} />
          </LessonHeader>
        ) : (
          <>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Study", href: "/study" },
              ]}
              current="Kanji Flashcards"
            />
            <Header>
              <DropdownContainer>
                <DropdownTrigger
                  $isOpen={isDropdownOpen}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Level {level.toUpperCase()}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </DropdownTrigger>

                {isDropdownOpen && (
                  <DropdownMenu>
                    {["n5", "n4", "n3", "n2", "n1"].map((l) => (
                      <DropdownItem
                        key={l}
                        $isActive={level === l}
                        onClick={() => {
                          setLevel(l);
                          setIsDropdownOpen(false);
                        }}
                      >
                        Level {l.toUpperCase()}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                )}
              </DropdownContainer>
            </Header>
          </>
        )}
        <FlashcardContainer>
          <DrawingArea>
            <SectionTitle>Stroke Order</SectionTitle>
            <CanvasSection>
              <KanjiWriter
                width={250}
                height={250}
                char={currentKanji}
                hideToolbar={true}
                autoLoop={true}
              />
            </CanvasSection>
          </DrawingArea>

          <DrawingArea>
            <SectionTitle>Practice Writing</SectionTitle>
            <CanvasSection>
              <DrawingCanvas
                width={250}
                height={250}
                clearTrigger={clearTrigger}
                char={currentKanji}
                onComplete={() => {
                  // Jika berhasil digambar, otomatis balik kartu
                  setFlipped(true);
                }}
                onSkip={() => nextCard()}
              />
            </CanvasSection>
          </DrawingArea>

          <CardArea>
            <SectionTitle>Flashcard</SectionTitle>
            <CardPerspective onClick={() => setFlipped(!flipped)}>
              <CardInner $flipped={flipped}>
                <CardFace>
                  <div
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--text-secondary)",
                      marginBottom: "2rem",
                      fontWeight: 600,
                    }}
                  >
                    Write this Kanji
                  </div>

                  {details ? (
                    <>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "var(--primary)",
                          fontWeight: 700,
                          marginBottom: "0.5rem",
                        }}
                      >
                        MEANING
                      </div>
                      <PromptText>
                        {details.meanings ? details.meanings[0] : "..."}
                      </PromptText>
                      <div
                        style={{
                          fontSize: "4rem",
                          fontWeight: 700,
                          color: "var(--foreground)",
                          marginTop: "0.5rem",
                        }}
                      >
                        {currentKanji}
                      </div>
                    </>
                  ) : (
                    <h2>Loading...</h2>
                  )}

                  <p
                    style={{
                      marginTop: "auto",
                      color: "var(--primary)",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    Tap to Flip ⟳
                  </p>
                </CardFace>

                <CardBack>
                  <BigChar>{currentKanji}</BigChar>
                  {details && (
                    <Details>
                      {details.on_readings &&
                        details.on_readings.length > 0 && (
                          <>
                            <h4>Onyomi</h4>
                            <p>{details.on_readings.join(", ")}</p>
                          </>
                        )}
                      {details.kun_readings &&
                        details.kun_readings.length > 0 && (
                          <>
                            <h4>Kunyomi</h4>
                            <p>{details.kun_readings.join(", ")}</p>
                          </>
                        )}
                      <h4>Meanings</h4>
                      <p>{details.meanings?.slice(0, 3).join(", ")}</p>
                    </Details>
                  )}
                </CardBack>
              </CardInner>
            </CardPerspective>

            <ActionButtons>
              {!flipped ? (
                <ActionBtn $type="flip" onClick={() => setFlipped(true)}>
                  Reveal Answer
                </ActionBtn>
              ) : (
                <div style={{ display: "flex", gap: "0.75rem", width: "100%" }}>
                  <ActionBtn
                    $type="hard"
                    style={{ background: "#ef4444" }}
                    onClick={() => rateRecall(1)}
                  >
                    Hard
                  </ActionBtn>
                  <ActionBtn
                    $type="hard"
                    style={{ background: "#3b82f6" }}
                    onClick={() => rateRecall(3)}
                  >
                    Good
                  </ActionBtn>
                  <ActionBtn
                    $type="easy"
                    style={{ background: "#10b981" }}
                    onClick={() => rateRecall(5)}
                  >
                    Easy
                  </ActionBtn>
                </div>
              )}
            </ActionButtons>
          </CardArea>
        </FlashcardContainer>
      </Container>
    </PageWrapper>
  );
}
