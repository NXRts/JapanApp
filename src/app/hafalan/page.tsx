"use client";

import React, { useState, useMemo } from "react";
import styled, { keyframes, css } from "styled-components";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useProgress } from "@/context/ProgressContext";
import { playJapaneseAudio } from "@/lib/audio";
import {
  HIRAGANA_GRID,
  HIRAGANA_DAKUON,
  HIRAGANA_COMBINATIONS,
  KATAKANA_GRID,
  KATAKANA_DAKUON,
  KATAKANA_COMBINATIONS,
  KanaItem,
} from "@/data/kana";
import { KANJI_DATA } from "@/data/kanji";
import { isLeitnerDue, LEITNER_INTERVALS } from "@/lib/leitner";

// --- Types ---
export interface LeitnerCardItem {
  id: string;
  char: string;
  type: "hiragana" | "katakana" | "kanji";
  romaji?: string;
  meaning?: string;
  on?: string;
  kun?: string;
  examples?: { word: string; reading: string; meaning: string }[];
}

// --- Dynamic Animations ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const flipIn = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(180deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// --- Styled Components ---
const PageWrapper = styled.div`
  min-height: 90vh;
  padding: 1.5rem 2rem 4rem;
  max-width: 1280px;
  margin: 0 auto;
  animation: ${fadeIn} 0.4s ease-out;

  @media (max-width: 768px) {
    padding: 1rem 1rem 3rem;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: var(--foreground-secondary, #94a3b8);
  font-size: 1rem;
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.6;
`;

// --- Box Overview Section ---
const BoxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BoxCard = styled.div<{ $active?: boolean; $color: string }>`
  background: var(--surface, #1e293b);
  border: 2px solid ${props => props.$active ? props.$color : "var(--border, #334155)"};
  border-radius: 16px;
  padding: 1.25rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  ${props => props.$active && css`
    box-shadow: 0 8px 24px ${props.$color}33;
    transform: translateY(-2px);
  `}

  &:hover {
    border-color: ${props => props.$color};
    transform: translateY(-2px);
  }
`;

const BoxHeader = styled.div<{ $color: string }>`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${props => props.$color};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
`;

const BoxCount = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--foreground, #f8fafc);
  margin-bottom: 0.25rem;
`;

const BoxInterval = styled.div`
  font-size: 0.75rem;
  color: var(--foreground-secondary, #94a3b8);
`;

const DueBadge = styled.span`
  display: inline-block;
  margin-top: 0.5rem;
  background: #ef444422;
  color: #f87171;
  border: 1px solid #ef444444;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
`;

// --- Category Tabs ---
const TabBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const TabBtn = styled.button<{ $active?: boolean }>`
  padding: 0.6rem 1.25rem;
  border-radius: 12px;
  border: 1.5px solid ${props => props.$active ? "#3b82f6" : "var(--border, #334155)"};
  background: ${props => props.$active ? "#3b82f622" : "var(--surface, #1e293b)"};
  color: ${props => props.$active ? "#60a5fa" : "var(--foreground, #cbd5e1)"};
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
  }
`;

// --- Action Bar ---
const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ActionButton = styled.button<{ $variant?: "primary" | "secondary" }>`
  padding: 0.85rem 1.75rem;
  border-radius: 14px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${props => props.$variant === "secondary" ? css`
    background: var(--surface, #1e293b);
    color: var(--foreground, #f8fafc);
    border: 1.5px solid var(--border, #334155);
    &:hover {
      background: var(--surface-hover, #334155);
    }
  ` : css`
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: #ffffff;
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
    border-bottom: 4px solid #1d4ed8;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
    }
    &:active {
      transform: translateY(2px);
      border-bottom-width: 0px;
    }
  `}
`;

// --- Cards Grid (Overview Mode) ---
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 1rem;
`;

const GridItemCard = styled.div<{ $box: number }>`
  background: var(--surface, #1e293b);
  border: 1.5px solid var(--border, #334155);
  border-radius: 16px;
  padding: 1rem 0.75rem;
  text-align: center;
  position: relative;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    border-color: #3b82f6;
  }
`;

const ItemChar = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: var(--foreground, #f8fafc);
  margin-bottom: 0.25rem;
`;

const ItemSub = styled.div`
  font-size: 0.8rem;
  color: var(--foreground-secondary, #94a3b8);
  font-weight: 600;
`;

const ItemBoxTag = styled.span<{ $box: number }>`
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.15rem 0.4rem;
  border-radius: 8px;
  background: ${props => {
    switch (props.$box) {
      case 5: return "#10b98122";
      case 4: return "#3b82f622";
      case 3: return "#8b5cf622";
      case 2: return "#f59e0b22";
      default: return "#ef444422";
    }
  }};
  color: ${props => {
    switch (props.$box) {
      case 5: return "#34d399";
      case 4: return "#60a5fa";
      case 3: return "#a78bfa";
      case 2: return "#fbbf24";
      default: return "#f87171";
    }
  }};
`;

// --- Study Mode / Flipcard ---
const FlipcardContainer = styled.div`
  max-width: 480px;
  margin: 2rem auto;
  perspective: 1000px;
`;

const FlipcardInner = styled.div<{ $isFlipped: boolean }>`
  position: relative;
  width: 100%;
  min-height: 320px;
  background: var(--surface, #1e293b);
  border: 2px solid var(--border, #334155);
  border-radius: 24px;
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  cursor: pointer;

  ${props => props.$isFlipped && css`
    transform: rotateY(180deg);
  `}
`;

const CardFaceFront = styled.div`
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardFaceBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2rem 1.5rem;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`;

const FlipChar = styled.div`
  font-size: 4.5rem;
  font-weight: 800;
  color: var(--foreground, #f8fafc);
  margin-bottom: 0.5rem;
`;

const FlipRomaji = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

const FlipMeaning = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--foreground, #cbd5e1);
  margin-bottom: 1rem;
`;

const ReadingsGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--foreground-secondary, #94a3b8);
`;

const AudioBtn = styled.button`
  background: #3b82f622;
  color: #60a5fa;
  border: 1px solid #3b82f644;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 1rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 480px;
  margin: 1rem auto 0;
`;

// --- Quiz Mode ---
const QuizContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  background: var(--surface, #1e293b);
  border: 2px solid var(--border, #334155);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 640px) {
    padding: 1.75rem 1.25rem;
  }
`;

const QuizPromptHeader = styled.div`
  font-size: 0.85rem;
  font-weight: 800;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  text-align: center;
`;

const QuizDisplayChar = styled.div`
  font-size: 5rem;
  font-weight: 800;
  text-align: center;
  color: var(--foreground, #f8fafc);
  margin-bottom: 1.5rem;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const OptionButton = styled.button<{
  $state?: "normal" | "correct" | "incorrect" | "disabled";
}>`
  padding: 1.1rem;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid var(--border, #334155);
  background: var(--surface-hover, #2d3748);
  color: var(--foreground, #f8fafc);
  border-bottom: 4px solid var(--border-dark, #1a202c);

  ${props => props.$state === "correct" && css`
    background: #10b98122;
    border-color: #10b981;
    color: #34d399;
    border-bottom-color: #059669;
  `}

  ${props => props.$state === "incorrect" && css`
    background: #ef444422;
    border-color: #ef4444;
    color: #f87171;
    border-bottom-color: #dc2626;
  `}

  &:hover {
    ${props => !props.$state || props.$state === "normal" ? css`
      border-color: #3b82f6;
      transform: translateY(-2px);
    ` : ""}
  }
`;

const FeedbackBox = styled.div<{ $isCorrect: boolean }>`
  margin-top: 1.5rem;
  padding: 1.25rem;
  border-radius: 16px;
  background: ${props => props.$isCorrect ? "#10b98115" : "#ef444415"};
  border: 1.5px solid ${props => props.$isCorrect ? "#10b98144" : "#ef444444"};
  color: ${props => props.$isCorrect ? "#34d399" : "#f87171"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
`;

export default function LeitnerHafalanPage() {
  const { progress, updateLeitnerProgress } = useProgress();

  // State
  const [activeCategory, setActiveCategory] = useState<"all" | "hiragana" | "katakana" | "kanji">("all");
  const [selectedBoxFilter, setSelectedBoxFilter] = useState<number | null>(null);
  const [mode, setMode] = useState<"overview" | "study" | "quiz">("overview");

  // Study & Quiz state
  const [studyIndex, setStudyIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Generate dataset
  const allCards = useMemo<LeitnerCardItem[]>(() => {
    const list: LeitnerCardItem[] = [];

    // Hiragana
    const hItems = [
      ...HIRAGANA_GRID.filter((x): x is KanaItem => x !== null),
      ...HIRAGANA_DAKUON,
      ...HIRAGANA_COMBINATIONS,
    ];
    hItems.forEach(item => {
      list.push({
        id: `h-${item.char}`,
        char: item.char,
        type: "hiragana",
        romaji: item.romaji,
      });
    });

    // Katakana
    const kItems = [
      ...KATAKANA_GRID.filter((x): x is KanaItem => x !== null),
      ...KATAKANA_DAKUON,
      ...KATAKANA_COMBINATIONS,
    ];
    kItems.forEach(item => {
      list.push({
        id: `k-${item.char}`,
        char: item.char,
        type: "katakana",
        romaji: item.romaji,
      });
    });

    // Kanji
    const kanjiN5 = KANJI_DATA.N5 || [];
    kanjiN5.forEach(item => {
      list.push({
        id: `kanji-${item.char}`,
        char: item.char,
        type: "kanji",
        meaning: item.meaning,
        on: item.on,
        kun: item.kun,
        examples: item.examples,
      });
    });

    return list;
  }, []);

  // Filtered cards by Category & Box Filter
  const filteredCards = useMemo(() => {
    return allCards.filter(card => {
      if (activeCategory !== "all" && card.type !== activeCategory) return false;
      const state = progress.leitner?.[card.char];
      const box = state?.box || 1;
      if (selectedBoxFilter !== null && box !== selectedBoxFilter) return false;
      return true;
    });
  }, [allCards, activeCategory, selectedBoxFilter, progress.leitner]);

  // Due items for Quiz
  const dueQuizCards = useMemo(() => {
    return allCards.filter(card => {
      if (activeCategory !== "all" && card.type !== activeCategory) return false;
      const state = progress.leitner?.[card.char];
      if (!state) return true; // New items are due
      return isLeitnerDue(state.nextReviewAt);
    });
  }, [allCards, activeCategory, progress.leitner]);

  // Count items per Box
  const boxCounts = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const dueCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    allCards.forEach(card => {
      if (activeCategory !== "all" && card.type !== activeCategory) return;
      const state = progress.leitner?.[card.char];
      const box = (state?.box || 1) as 1 | 2 | 3 | 4 | 5;
      counts[box] = (counts[box] || 0) + 1;
      if (!state || isLeitnerDue(state.nextReviewAt)) {
        dueCounts[box] = (dueCounts[box] || 0) + 1;
      }
    });

    return { counts, dueCounts };
  }, [allCards, activeCategory, progress.leitner]);

  // Current items for Study / Quiz
  const currentStudyCard = filteredCards[studyIndex] || filteredCards[0];
  const currentQuizCard = dueQuizCards[quizIndex] || dueQuizCards[0];

  // Options for active Quiz
  const quizOptions = useMemo(() => {
    if (!currentQuizCard) return [];
    const isKanji = currentQuizCard.type === "kanji";
    const correctAns = isKanji ? currentQuizCard.meaning! : currentQuizCard.romaji!;

    const otherPool = allCards.filter(c => c.type === currentQuizCard.type && c.char !== currentQuizCard.char);
    const shuffled = [...otherPool].sort(() => 0.5 - Math.random()).slice(0, 3);

    const wrongAns = shuffled.map(c => isKanji ? (c.meaning || "?") : (c.romaji || "?"));
    return [correctAns, ...wrongAns].sort(() => 0.5 - Math.random());
  }, [currentQuizCard, allCards]);

  // Handlers
  const handleStartStudy = () => {
    setStudyIndex(0);
    setIsFlipped(false);
    setMode("study");
  };

  const handleStartQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setSessionCompleted(false);
    setMode("quiz");
  };

  const handleAnswerSubmit = (option: string) => {
    if (isAnswerChecked || !currentQuizCard) return;

    setSelectedAnswer(option);
    setIsAnswerChecked(true);

    const isKanji = currentQuizCard.type === "kanji";
    const correctAns = isKanji ? currentQuizCard.meaning : currentQuizCard.romaji;
    const isCorrect = option === correctAns;

    // Update Leitner State
    updateLeitnerProgress(currentQuizCard.char, isCorrect);

    if (isCorrect) {
      playJapaneseAudio(currentQuizCard.char);
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex < dueQuizCards.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setSessionCompleted(true);
    }
  };

  const boxColors: Record<number, string> = {
    1: "#ef4444",
    2: "#f59e0b",
    3: "#8b5cf6",
    4: "#3b82f6",
    5: "#10b981",
  };

  const boxTitles: Record<number, string> = {
    1: "Box 1 (Harian)",
    2: "Box 2 (3 Hari)",
    3: "Box 3 (1 Minggu)",
    4: "Box 4 (2 Minggu)",
    5: "Box 5 (1 Bulan)",
  };

  return (
    <PageWrapper>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Lainnya", href: "#" },
        ]}
        current="Hafalan (Leitner 5-Box)"
      />

      <HeaderSection>
        <Title>🃏 Hafalan Leitner System (5 Box)</Title>
        <Subtitle>
          Metode hafalan berkala terstruktur untuk memindahkan memori Hiragana, Katakana, dan Kanji dari ingatan jangka pendek ke ingatan jangka panjang secara ilmiah.
        </Subtitle>
      </HeaderSection>

      {/* 5 Box Summary Cards */}
      <BoxGrid>
        {[1, 2, 3, 4, 5].map((boxNum) => {
          const count = boxCounts.counts[boxNum as keyof typeof boxCounts.counts];
          const due = boxCounts.dueCounts[boxNum as keyof typeof boxCounts.dueCounts];
          const isSelected = selectedBoxFilter === boxNum;

          return (
            <BoxCard
              key={boxNum}
              $active={isSelected}
              $color={boxColors[boxNum]}
              onClick={() => setSelectedBoxFilter(isSelected ? null : boxNum)}
            >
              <BoxHeader $color={boxColors[boxNum]}>
                {boxTitles[boxNum]}
              </BoxHeader>
              <BoxCount>{count}</BoxCount>
              <BoxInterval>
                Review tiap {LEITNER_INTERVALS[boxNum]} hari
              </BoxInterval>
              {due > 0 && <DueBadge>🔥 {due} Due</DueBadge>}
            </BoxCard>
          );
        })}
      </BoxGrid>

      {/* Category Tabs */}
      <TabBar>
        <TabBtn $active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
          🌐 Semua Karakter ({allCards.length})
        </TabBtn>
        <TabBtn $active={activeCategory === "hiragana"} onClick={() => setActiveCategory("hiragana")}>
          🎌 Hiragana
        </TabBtn>
        <TabBtn $active={activeCategory === "katakana"} onClick={() => setActiveCategory("katakana")}>
          🈁 Katakana
        </TabBtn>
        <TabBtn $active={activeCategory === "kanji"} onClick={() => setActiveCategory("kanji")}>
          🈸 Kanji
        </TabBtn>
      </TabBar>

      {/* Action Bar */}
      {mode === "overview" && (
        <ActionBar>
          <div style={{ fontWeight: 700, color: "var(--foreground-secondary)" }}>
            Menampilkan {filteredCards.length} kartu
            {selectedBoxFilter && ` di Box ${selectedBoxFilter}`}
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <ActionButton $variant="secondary" onClick={handleStartStudy} disabled={filteredCards.length === 0}>
              📖 Modul Belajar (Flipcards)
            </ActionButton>
            <ActionButton onClick={handleStartQuiz} disabled={dueQuizCards.length === 0}>
              🚀 Uji Kuis Leitner ({dueQuizCards.length} Due)
            </ActionButton>
          </div>
        </ActionBar>
      )}

      {/* Mode 1: Overview Cards Grid */}
      {mode === "overview" && (
        <CardGrid>
          {filteredCards.map((card) => {
            const state = progress.leitner?.[card.char];
            const box = state?.box || 1;
            const subText = card.type === "kanji" ? card.meaning : card.romaji;

            return (
              <GridItemCard
                key={card.id}
                $box={box}
                onClick={() => playJapaneseAudio(card.char)}
              >
                <ItemBoxTag $box={box}>Box {box}</ItemBoxTag>
                <ItemChar>{card.char}</ItemChar>
                <ItemSub>{subText}</ItemSub>
              </GridItemCard>
            );
          })}
        </CardGrid>
      )}

      {/* Mode 2: Modul Belajar (Flipcards) */}
      {mode === "study" && currentStudyCard && (
        <div>
          <ActionBar>
            <ActionButton $variant="secondary" onClick={() => setMode("overview")}>
              ⬅️ Kembali ke Overview
            </ActionButton>
            <div style={{ fontWeight: 700 }}>
              Kartu {studyIndex + 1} dari {filteredCards.length}
            </div>
          </ActionBar>

          <FlipcardContainer>
            <FlipcardInner $isFlipped={isFlipped} onClick={() => setIsFlipped(!isFlipped)}>
              <CardFaceFront>
                <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#3b82f6", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  {currentStudyCard.type}
                </div>
                <FlipChar>{currentStudyCard.char}</FlipChar>
                <div style={{ fontSize: "0.85rem", color: "var(--foreground-secondary)" }}>
                  (Klik kartu untuk membalik)
                </div>
              </CardFaceFront>

              <CardFaceBack>
                <FlipChar>{currentStudyCard.char}</FlipChar>
                {currentStudyCard.type === "kanji" ? (
                  <>
                    <FlipMeaning>{currentStudyCard.meaning}</FlipMeaning>
                    <ReadingsGroup>
                      {currentStudyCard.on && <div><strong>Onyomi:</strong> {currentStudyCard.on}</div>}
                      {currentStudyCard.kun && <div><strong>Kunyomi:</strong> {currentStudyCard.kun}</div>}
                    </ReadingsGroup>
                  </>
                ) : (
                  <FlipRomaji>Romaji: /{currentStudyCard.romaji}/</FlipRomaji>
                )}

                <AudioBtn onClick={(e) => { e.stopPropagation(); playJapaneseAudio(currentStudyCard.char); }}>
                  🔊
                </AudioBtn>
              </CardFaceBack>
            </FlipcardInner>

            <NavRow>
              <ActionButton
                $variant="secondary"
                disabled={studyIndex === 0}
                onClick={() => { setStudyIndex(prev => prev - 1); setIsFlipped(false); }}
              >
                ◀️ Sebelumnya
              </ActionButton>

              <ActionButton
                disabled={studyIndex === filteredCards.length - 1}
                onClick={() => { setStudyIndex(prev => prev + 1); setIsFlipped(false); }}
              >
                Berikutnya ▶️
              </ActionButton>
            </NavRow>
          </FlipcardContainer>
        </div>
      )}

      {/* Mode 3: Kuis Latihan Leitner */}
      {mode === "quiz" && (
        <div>
          <ActionBar>
            <ActionButton $variant="secondary" onClick={() => setMode("overview")}>
              ⬅️ Keluar Kuis
            </ActionButton>
            <div style={{ fontWeight: 700 }}>
              Kuis Leitner: {quizIndex + 1} / {dueQuizCards.length}
            </div>
          </ActionBar>

          {!sessionCompleted && currentQuizCard ? (
            <QuizContainer>
              <QuizPromptHeader>
                {currentQuizCard.type === "kanji"
                  ? "Apa arti Bahasa Indonesia dari Kanji ini?"
                  : "Apa pembacaan romaji yang tepat untuk huruf ini?"}
              </QuizPromptHeader>

              <QuizDisplayChar>{currentQuizCard.char}</QuizDisplayChar>

              <OptionsGrid>
                {quizOptions.map((option, idx) => {
                  const isKanji = currentQuizCard.type === "kanji";
                  const correctAns = isKanji ? currentQuizCard.meaning : currentQuizCard.romaji;

                  let state: "normal" | "correct" | "incorrect" = "normal";
                  if (isAnswerChecked) {
                    if (option === correctAns) state = "correct";
                    else if (option === selectedAnswer) state = "incorrect";
                  }

                  return (
                    <OptionButton
                      key={idx}
                      $state={state}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={isAnswerChecked}
                    >
                      {option}
                    </OptionButton>
                  );
                })}
              </OptionsGrid>

              {isAnswerChecked && (
                <div>
                  <FeedbackBox $isCorrect={selectedAnswer === (currentQuizCard.type === "kanji" ? currentQuizCard.meaning : currentQuizCard.romaji)}>
                    <span>
                      {selectedAnswer === (currentQuizCard.type === "kanji" ? currentQuizCard.meaning : currentQuizCard.romaji)
                        ? "🎉 Luar Biasa! Kartu naik ke Box berikutnya!"
                        : "😅 Kurang Tepat! Kartu di-reset kembali ke Box 1."}
                    </span>
                    <span>+10 XP</span>
                  </FeedbackBox>

                  <ActionButton
                    style={{ width: "100%", marginTop: "1.25rem" }}
                    onClick={handleNextQuizQuestion}
                  >
                    Lanjutkan ➡️
                  </ActionButton>
                </div>
              )}
            </QuizContainer>
          ) : (
            <QuizContainer style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏆</div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                Sesi Hafalan Leitner Selesai!
              </h2>
              <p style={{ color: "var(--foreground-secondary)", marginBottom: "1.5rem" }}>
                Anda telah menyelesaikan semua kartu yang jatuh tempo hari ini. Pertahankan streak hafalan Anda!
              </p>
              <ActionButton onClick={() => setMode("overview")} style={{ margin: "0 auto" }}>
                Kembali ke Overview 🏠
              </ActionButton>
            </QuizContainer>
          )}
        </div>
      )}
    </PageWrapper>
  );
}
