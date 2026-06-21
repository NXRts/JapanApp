"use client";

import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useProgress } from "@/context/ProgressContext";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import Link from "next/link";
import { allVocabulary, allNumbers } from "@/lib/dictionary";

const PageWrapper = styled.div`
  min-height: 90vh;
  background: radial-gradient(
    circle at top right,
    rgba(79, 70, 229, 0.05) 0%,
    transparent 60%
  );
  padding: 2.5rem 2rem;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 850;
  margin-bottom: 0.5rem;
  color: var(--foreground);
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  background: var(--surface);
  border-radius: 32px;
  border: 1px dashed var(--border);
  width: 100%;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--foreground);
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
  width: 100%;
`;

const TaskCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--navbar-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  text-decoration: none;
  color: var(--foreground);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.15);
  }

  svg {
    width: 36px;
    height: 36px;
    color: var(--primary);
  }

  span {
    font-weight: 700;
    font-size: 1rem;
    text-align: center;
  }
`;

const FlashcardContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardPerspective = styled.div`
  width: 100%;
  height: 400px;
  perspective: 1500px;
  cursor: pointer;
  position: relative;
  margin-bottom: 2.5rem;
`;

const CardInner = styled.div<{ $flipped: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  transform: ${({ $flipped }) => ($flipped ? "rotateY(180deg)" : "rotateY(0)")};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  box-shadow: var(--shadow-md);
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
`;

const ItemType = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
`;

const Word = styled.div`
  font-size: 4rem;
  font-weight: 800;
  color: var(--foreground);
  margin-bottom: 1rem;
`;

const InfoGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
`;

const InfoRow = styled.div`
  label {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    display: block;
    margin-bottom: 0.2rem;
  }
  span {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--foreground);
    display: block;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const ActionBtn = styled.button<{ $color: string }>`
  flex: 1;
  padding: 1rem;
  border-radius: 16px;
  border: none;
  background: ${({ $color }) => $color};
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
`;

const RevealBtn = styled(ActionBtn)`
  background: var(--primary);
`;

const ProgressInfo = styled.div`
  margin-bottom: 2rem;
  font-weight: 600;
  color: var(--text-secondary);
`;

export default function ReviewPage() {
  const { getDueItems, updateSRS, addExp } = useProgress();
  const [dueItems, setDueItems] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const rawDue = getDueItems();
    setDueItems(rawDue.sort(() => 0.5 - Math.random()));
    setLoading(false);
  }, []);

  const currentItem = dueItems[currentIndex];

  useEffect(() => {
    if (!currentItem) return;
    setDetails(null);

    // Try to fetch details based on type
    if (currentItem.id.length === 1) {
      // Likely Kanji
      fetch(`https://kanjiapi.dev/v1/kanji/${currentItem.id}`)
        .then((res) => res.json())
        .then((data) => setDetails({ type: "kanji", ...data }))
        .catch(() => setDetails({ type: "unknown" }));
    } else {
      // Likely Vocabulary
      // First look in allVocabulary and allNumbers
      const vocabDetails =
        allVocabulary.find(
          (v) => v.word === currentItem.id || v.id === currentItem.id,
        ) ||
        allNumbers.find(
          (n) => n.word === currentItem.id || n.id === currentItem.id,
        );

      if (vocabDetails) {
        setDetails({
          type: "vocabulary",
          meaning: vocabDetails.meaning,
          reading: vocabDetails.reading,
          romaji: vocabDetails.romaji,
        });
      } else {
        // Fallback to proxy search if not found locally
        fetch(`/api/proxy/jisho?keyword=${encodeURIComponent(currentItem.id)}`)
          .then((res) => res.json())
          .then((data) => {
            const firstResult = data.data?.[0];
            if (firstResult) {
              setDetails({
                type: "vocabulary",
                meaning:
                  firstResult.senses?.[0]?.english_definitions?.join(", ") ||
                  "No definition",
                reading: firstResult.japanese?.[0]?.reading || "...",
                romaji: "",
              });
            } else {
              setDetails({
                type: "vocabulary",
                meaning: "Vocabulary Item",
                reading: "...",
                romaji: "",
              });
            }
          })
          .catch(() => {
            setDetails({
              type: "vocabulary",
              meaning: "Vocabulary Item",
              reading: "...",
              romaji: "",
            });
          });
      }
    }
  }, [currentItem]);

  const handleRating = (quality: number) => {
    updateSRS(currentItem.id, quality);
    addExp(quality * 2);

    setFlipped(false);
    setTimeout(() => {
      if (currentIndex < dueItems.length - 1) {
        setCurrentIndex((v) => v + 1);
      } else {
        setDueItems([]); // Finished!
      }
    }, 300);
  };

  if (loading)
    return (
      <PageWrapper>
        <Container>Checking for reviews...</Container>
      </PageWrapper>
    );

  if (dueItems.length === 0) {
    return (
      <PageWrapper>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }]}
            current="SRS Review"
          />
          <EmptyState>
            <h2>Semua Beres! 🎉</h2>
            <p style={{ marginBottom: "0" }}>
              Tidak ada item yang perlu diulas hari ini. Kerja bagus!
            </p>
          </EmptyState>

          <div style={{ marginTop: "4rem", width: "100%" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 800,
                color: "var(--text-secondary)",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Lanjut Belajar
            </h3>
            <TaskGrid style={{ marginTop: "1rem" }}>
              <TaskCard href="/study/kanji">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                  <path d="m2 2 5 2"></path>
                  <path d="m2 2 2 5"></path>
                </svg>
                <span>Pelajari Kanji Baru</span>
              </TaskCard>

              <TaskCard href="/study/vocabulary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--rm-orange)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <span style={{ color: "var(--rm-orange)" }}>
                  Hafalkan Kosakata
                </span>
              </TaskCard>

              <TaskCard href="/roadmap">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                <span style={{ color: "#10b981" }}>Lanjut Learning Path</span>
              </TaskCard>
            </TaskGrid>
          </div>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }]}
          current="SRS Review"
        />
        <Header>
          <Title>Review Sesi</Title>
          <Subtitle>Ulas kembali apa yang telah Anda pelajari.</Subtitle>
        </Header>

        <ProgressInfo>
          Item {currentIndex + 1} dari {dueItems.length}
        </ProgressInfo>

        <FlashcardContainer>
          <CardPerspective onClick={() => setFlipped(!flipped)}>
            <CardInner $flipped={flipped}>
              <CardFace>
                <ItemType>{details?.type || "Loading..."}</ItemType>
                <Word>{currentItem.id}</Word>
                <p
                  style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
                >
                  Tap to Reveal
                </p>
              </CardFace>

              <CardBack>
                <ItemType>{details?.type}</ItemType>
                <Word>{currentItem.id}</Word>
                <InfoGrid>
                  {details?.type === "kanji" && (
                    <>
                      <InfoRow>
                        <label>Meanings</label>
                        <span>{details.meanings?.slice(0, 2).join(", ")}</span>
                      </InfoRow>
                      <InfoRow>
                        <label>Readings</label>
                        <span>
                          {[
                            ...(details.on_readings || []),
                            ...(details.kun_readings || []),
                          ]
                            .slice(0, 3)
                            .join(", ")}
                        </span>
                      </InfoRow>
                    </>
                  )}
                  {details?.type === "vocabulary" && (
                    <>
                      <InfoRow>
                        <label>Reading (Furigana)</label>
                        <span style={{ color: "#16a34a", fontSize: "1.5rem" }}>
                          {details.reading || "..."}
                        </span>
                      </InfoRow>
                      {details.romaji && (
                        <InfoRow>
                          <label>Romaji</label>
                          <span
                            style={{ fontSize: "1.2rem", color: "#10b981" }}
                          >
                            {details.romaji}
                          </span>
                        </InfoRow>
                      )}
                      <InfoRow>
                        <label>Meaning</label>
                        <span style={{ color: "#3b82f6", fontSize: "1.2rem" }}>
                          {details.meaning}
                        </span>
                      </InfoRow>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Avoid flipping card
                          if (typeof window !== "undefined") {
                            const synth = window.speechSynthesis;
                            const utterance = new SpeechSynthesisUtterance(
                              currentItem.id,
                            );
                            utterance.lang = "ja-JP";
                            synth.speak(utterance);
                          }
                        }}
                        style={{
                          background: "var(--primary)",
                          color: "white",
                          border: "none",
                          borderRadius: "12px",
                          padding: "0.5rem 1rem",
                          fontWeight: "bold",
                          cursor: "pointer",
                          marginTop: "0.5rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        🔊 Suara
                      </button>
                    </>
                  )}
                </InfoGrid>
              </CardBack>
            </CardInner>
          </CardPerspective>

          <ActionButtons>
            {!flipped ? (
              <RevealBtn
                $color="var(--primary)"
                onClick={() => setFlipped(true)}
              >
                Buka Jawaban
              </RevealBtn>
            ) : (
              <>
                <ActionBtn $color="#ef4444" onClick={() => handleRating(1)}>
                  Hard
                </ActionBtn>
                <ActionBtn $color="#3b82f6" onClick={() => handleRating(3)}>
                  Good
                </ActionBtn>
                <ActionBtn $color="#10b981" onClick={() => handleRating(5)}>
                  Easy
                </ActionBtn>
              </>
            )}
          </ActionButtons>
        </FlashcardContainer>
      </Container>
    </PageWrapper>
  );
}
