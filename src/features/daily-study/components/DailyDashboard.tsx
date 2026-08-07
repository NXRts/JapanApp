"use client";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useProgress } from "@/context/ProgressContext";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { DailyGoalConfig, JLPTLevel, QuizResultSummary } from "../types";
import { getDetailedItemInfo } from "../utils/kanjiDataHelper";
import { IntegrativeQuiz } from "./IntegrativeQuiz";
import { UnifiedStudyStudio } from "./UnifiedStudyStudio";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem 96px;
  gap: 1.25rem;

  @media (max-width: 1024px) {
    padding: 1rem 1rem 96px;
    gap: 0.75rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem 96px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

const HeroBanner = styled.div`
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #c084fc 100%);
  border-radius: 32px;
  padding: 2.25rem 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 14px 35px -5px rgba(79, 70, 229, 0.4);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 1.5rem;
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h1 {
    font-size: 2.2rem;
    font-weight: 900;
    letter-spacing: -0.02em;

    @media (max-width: 640px) {
      font-size: 1.6rem;
    }
  }

  p {
    font-size: 1rem;
    opacity: 0.9;
    max-width: 480px;

    @media (max-width: 640px) {
      font-size: 0.88rem;
    }
  }
`;

const StreakBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  padding: 0.5rem 1rem;
  border-radius: 99px;
  font-size: 0.9rem;
  font-weight: 800;
  width: fit-content;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const TargetSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;

  @media (max-width: 768px) {
    align-items: flex-start;
    width: 100%;
  }
`;

const TargetPillGroup = styled.div`
  display: flex;
  gap: 0.4rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.35rem;
  border-radius: 16px;
`;

const TargetPill = styled.button<{ $active: boolean }>`
  padding: 0.45rem 0.9rem;
  border-radius: 12px;
  font-size: 0.82rem;
  font-weight: 800;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${({ $active }) => ($active ? "white" : "transparent")};
  color: ${({ $active }) => ($active ? "#4f46e5" : "white")};
`;

const TrackSwitcherCard = styled.div`
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 24px;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const TrackTabGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TrackTabBtn = styled.button<{ $active: boolean }>`
  padding: 0.65rem 1.25rem;
  border-radius: 14px;
  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid var(--border);

  background: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--background)"};
  color: ${({ $active }) => ($active ? "white" : "var(--foreground)")};
  border-color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--border)"};
`;

const LevelPickerGroup = styled.div`
  display: flex;
  gap: 0.35rem;
`;

const LevelChip = styled.button<{ $active: boolean }>`
  padding: 0.45rem 0.75rem;
  border-radius: 10px;
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
  border: 1px solid var(--border);

  background: ${({ $active }) =>
    $active ? "rgba(var(--primary-rgb), 0.15)" : "transparent"};
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};
  border-color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--border)"};
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div<{ $highlight?: boolean }>`
  background: var(--surface);
  border: 1.5px solid
    ${({ $highlight }) =>
      $highlight ? "rgba(244, 63, 94, 0.3)" : "var(--border)"};
  border-radius: 24px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: var(--shadow-sm);

  .label {
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--text-secondary);
  }
  .value {
    font-size: 2rem;
    font-weight: 900;
    color: ${({ $highlight }) =>
      $highlight ? "#f43f5e" : "var(--foreground)"};
  }
  .desc {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
`;

const StartSessionBtn = styled.button`
  width: 100%;
  padding: 1.2rem;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark) 100%
  );
  color: white;
  font-size: 1.15rem;
  font-weight: 900;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px -5px rgba(79, 70, 229, 0.5);
  }
`;

const WeakBankCard = styled.div`
  background: var(--surface);
  border: 1.5px solid rgba(244, 63, 94, 0.25);
  border-radius: 24px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewCard = styled.div`
  background: var(--surface);
  border: 1.5px solid rgba(99, 102, 241, 0.3);
  border-radius: 24px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: var(--shadow-sm);
`;

const StartReviewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.65rem 1.25rem;
  border-radius: 14px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  font-size: 0.88rem;
  font-weight: 800;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
  }
`;

const RepairWeakButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.65rem 1.25rem;
  border-radius: 14px;
  background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
  color: white;
  font-size: 0.88rem;
  font-weight: 800;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(244, 63, 94, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(244, 63, 94, 0.4);
  }
`;

const WeakCharList = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const WeakCharChip = styled.span`
  font-size: 1.2rem;
  font-weight: 900;
  font-family: "Noto Sans JP", sans-serif;
  padding: 0.4rem 0.85rem;
  border-radius: 12px;
  background: rgba(244, 63, 94, 0.1);
  color: #f43f5e;
  border: 1px solid rgba(244, 63, 94, 0.25);
`;

export function DailyDashboard() {
  const { progress, addExp, checkStreak, updateSRS, getDueItems } =
    useProgress();
  const [config, setConfig] = useState<DailyGoalConfig>({
    targetPerDay: 5,
    activeTrack: "kanji",
    selectedLevel: "N5",
  });

  const [sessionState, setSessionState] = useState<
    "dashboard" | "flashcards" | "quiz" | "summary"
  >("dashboard");
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [quizSummary, setQuizSummary] = useState<QuizResultSummary | null>(
    null,
  );
  const [customBatch, setCustomBatch] = useState<string[] | null>(null);

  // Dynamically compute real weak Kanji items from user's progress state stored in LocalStorage
  const weakItems = useMemo(() => {
    const list: string[] = [];

    // 1. Check SRS items with low Ease Factor or reset interval
    if (progress.srs) {
      Object.entries(progress.srs).forEach(([id, item]) => {
        if (
          item.easeFactor < 2.2 ||
          (item.repetitions === 0 && item.interval === 1)
        ) {
          if (!list.includes(id)) list.push(id);
        }
      });
    }

    // 2. Check items in mastery record with mistakes
    if (progress.mastery) {
      Object.entries(progress.mastery).forEach(([id, record]) => {
        if (record.incorrect > 0 && !list.includes(id)) {
          list.push(id);
        }
      });
    }

    // Return real weak items from user progress state
    return list.slice(0, 8);
  }, [progress.srs, progress.mastery]);

  // Dynamically compute real Retention Accuracy percentage from user's progress state
  const retentionAccuracy = useMemo(() => {
    if (!progress.mastery) return 0;
    let totalCorrect = 0;
    let totalAttempts = 0;

    Object.values(progress.mastery).forEach((record: any) => {
      const correct = record.correct || 0;
      const incorrect = record.incorrect || 0;
      totalCorrect += correct;
      totalAttempts += correct + incorrect;
    });

    if (totalAttempts === 0) return 0;
    return Math.round((totalCorrect / totalAttempts) * 100);
  }, [progress.mastery]);

  const dueCount = useMemo(() => {
    try {
      return getDueItems ? getDueItems().length : 2;
    } catch {
      return 2;
    }
  }, [getDueItems]);

  // Determine active item batch
  const batchChars = useMemo(() => {
    if (customBatch && customBatch.length > 0) return customBatch;
    return config.activeTrack === "kana"
      ? ["あ", "い", "う", "え", "お"].slice(0, config.targetPerDay)
      : ["日", "月", "火", "水", "木", "金", "土"].slice(
          0,
          config.targetPerDay,
        );
  }, [customBatch, config.activeTrack, config.targetPerDay]);

  const batchDetails = batchChars.map(getDetailedItemInfo);

  const handleStartSession = () => {
    setCustomBatch(null);
    setCurrentFlashcardIndex(0);
    setSessionState("flashcards");
  };

  const handleStartWeakRepairSession = () => {
    setCustomBatch(weakItems);
    setCurrentFlashcardIndex(0);
    setSessionState("flashcards");
  };

  // Dynamically compute Kanji items studied Today (Hari ini) & Yesterday (Kemarin)
  const reviewItems = useMemo(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    const yesterdayDate = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    const todayList: string[] = [];
    const yesterdayList: string[] = [];
    const combinedList: string[] = [];

    // Check SRS & Mastery records in user's progress state
    if (progress.srs) {
      Object.entries(progress.srs).forEach(([id, item]) => {
        const srsAny = item as any;
        const itemDate = (srsAny.lastReviewedDate || item.nextReviewDate || "").split("T")[0];
        if (itemDate === todayStr) {
          if (!todayList.includes(id)) todayList.push(id);
          if (!combinedList.includes(id)) combinedList.push(id);
        } else if (itemDate === yesterdayDate) {
          if (!yesterdayList.includes(id)) yesterdayList.push(id);
          if (!combinedList.includes(id)) combinedList.push(id);
        }
      });
    }

    if (progress.mastery) {
      Object.entries(progress.mastery).forEach(([id, record]) => {
        const masteryAny = record as any;
        const itemDate = (masteryAny.lastAttempt || masteryAny.lastPracticed || "").split("T")[0];
        if (itemDate === todayStr) {
          if (!todayList.includes(id)) todayList.push(id);
          if (!combinedList.includes(id)) combinedList.push(id);
        } else if (itemDate === yesterdayDate) {
          if (!yesterdayList.includes(id)) yesterdayList.push(id);
          if (!combinedList.includes(id)) combinedList.push(id);
        }
      });
    }

    return {
      todayList,
      yesterdayList,
      combinedList,
    };
  }, [progress.srs, progress.mastery]);

  const handleStartReviewSession = () => {
    setCustomBatch(reviewItems.combinedList);
    setCurrentFlashcardIndex(0);
    setSessionState("flashcards");
  };

  const handleNextFlashcard = () => {
    if (currentFlashcardIndex < batchDetails.length - 1) {
      setCurrentFlashcardIndex((prev) => prev + 1);
    } else {
      // Transition to Integrative Quiz
      setSessionState("quiz");
    }
  };

  const handleQuizComplete = (summary: QuizResultSummary) => {
    setQuizSummary(summary);
    addExp(summary.expEarned);
    checkStreak();

    // Persist real SRS memory updates to ProgressContext & LocalStorage
    summary.masteredChars.forEach((char) => {
      if (updateSRS) updateSRS(char, 5); // Perfect recall
    });
    summary.needsReviewChars.forEach((char) => {
      if (updateSRS) updateSRS(char, 1); // Incorrect attempt
    });

    setSessionState("summary");
  };

  return (
    <PageContainer>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Practice", href: "/practice" },
        ]}
        current="Hafalan Harian"
      />

      <ContentWrapper>
        {sessionState === "dashboard" && (
          <>
            {/* HERO BANNER */}
            <HeroBanner>
              <BannerContent>
                <StreakBadge>
                  🔥 Streak: {progress.streak || 1} Hari Berturut-turut!
                </StreakBadge>
                <h1>Target Hafalan Harian 🎯</h1>
                <p>
                  Pelajari {config.targetPerDay}{" "}
                  {config.activeTrack === "kana"
                    ? "Kana"
                    : `Kanji ${config.selectedLevel}`}{" "}
                  hari ini tanpa rasa lelah dengan metode SRS interaktif.
                </p>
              </BannerContent>

              <TargetSelectorWrapper>
                <div
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    opacity: 0.85,
                  }}
                >
                  Target Harian (Per Hari)
                </div>
                <TargetPillGroup>
                  {[3, 5, 10].map((num) => (
                    <TargetPill
                      key={num}
                      $active={config.targetPerDay === num}
                      onClick={() =>
                        setConfig({ ...config, targetPerDay: num })
                      }
                    >
                      {num} Items
                    </TargetPill>
                  ))}
                </TargetPillGroup>
              </TargetSelectorWrapper>
            </HeroBanner>

            {/* DUAL TRACK SWITCHER */}
            <TrackSwitcherCard>
              <div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "var(--text-secondary)",
                  }}
                >
                  Pilih Jalur Pembelajaran
                </div>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 900,
                    marginTop: "0.25rem",
                  }}
                >
                  {config.activeTrack === "kana"
                    ? "Jalur Kana (Hiragana/Katakana)"
                    : `Jalur JLPT Kanji (${config.selectedLevel})`}
                </div>
              </div>

              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <TrackTabGroup>
                  <TrackTabBtn
                    $active={config.activeTrack === "kana"}
                    onClick={() =>
                      setConfig({ ...config, activeTrack: "kana" })
                    }
                  >
                    あ Kana
                  </TrackTabBtn>
                  <TrackTabBtn
                    $active={config.activeTrack === "kanji"}
                    onClick={() =>
                      setConfig({ ...config, activeTrack: "kanji" })
                    }
                  >
                    🉐 Kanji
                  </TrackTabBtn>
                </TrackTabGroup>

                {config.activeTrack === "kanji" && (
                  <LevelPickerGroup>
                    {(["N5", "N4", "N3", "N2", "N1"] as JLPTLevel[]).map(
                      (lvl) => (
                        <LevelChip
                          key={lvl}
                          $active={config.selectedLevel === lvl}
                          onClick={() =>
                            setConfig({ ...config, selectedLevel: lvl })
                          }
                        >
                          {lvl}
                        </LevelChip>
                      ),
                    )}
                  </LevelPickerGroup>
                )}
              </div>
            </TrackSwitcherCard>

            {/* STAT METRICS GRID */}
            <StatGrid>
              <StatCard>
                <div className="label">Pelajari Hari Ini</div>
                <div className="value">{config.targetPerDay}</div>
                <div className="desc">Karakter baru disiapkan</div>
              </StatCard>

              <StatCard
                style={{ cursor: "pointer" }}
                onClick={handleStartReviewSession}
                $highlight={reviewItems.combinedList.length > 0}
              >
                <div className="label">Review Hari Ini & Kemarin</div>
                <div className="value">{reviewItems.combinedList.length}</div>
                <div className="desc">Hari ini: {reviewItems.todayList.length} | Kemarin: {reviewItems.yesterdayList.length}</div>
              </StatCard>

              <StatCard>
                <div className="label">Akurasi Retensi</div>
                <div className="value">{retentionAccuracy}%</div>
                <div className="desc">
                  {retentionAccuracy > 0
                    ? "Performa memori rata-rata"
                    : "Belum ada data kuis"}
                </div>
              </StatCard>

              <StatCard $highlight={weakItems.length > 0}>
                <div className="label">Bank Kanji Lemah</div>
                <div className="value">{weakItems.length}</div>
                <div className="desc">Karakter perlu dipertajam</div>
              </StatCard>
            </StatGrid>

            {/* REVIEW TODAY & YESTERDAY KANJI CARD */}
            <ReviewCard
              style={{
                borderColor:
                  reviewItems.combinedList.length > 0
                    ? "rgba(99, 102, 241, 0.3)"
                    : "var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    🔄 Review Kanji Hari Ini & Kemarin
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      marginTop: "2px",
                    }}
                  >
                    {reviewItems.combinedList.length > 0
                      ? `Review ulang ${reviewItems.combinedList.length} Kanji yang telah kamu pelajari hari ini (${reviewItems.todayList.length}) dan kemarin (${reviewItems.yesterdayList.length}) untuk memperkuat daya ingat.`
                      : "Belum ada Kanji yang dipelajari hari ini & kemarin. Mulai sesi hafalan harian terlebih dahulu! ✨"}
                  </p>
                </div>

                {reviewItems.combinedList.length > 0 ? (
                  <StartReviewButton onClick={handleStartReviewSession}>
                    🔄 Mulai Review ({reviewItems.combinedList.length} Karakter) →
                  </StartReviewButton>
                ) : (
                  <div
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 800,
                      color: "var(--text-secondary)",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid var(--border)",
                      padding: "0.5rem 1rem",
                      borderRadius: "12px",
                    }}
                  >
                    🎉 Belum Ada Data Ulasan
                  </div>
                )}
              </div>

              {reviewItems.combinedList.length > 0 && (
                <WeakCharList>
                  {reviewItems.combinedList.map((char, i) => (
                    <WeakCharChip
                      key={i}
                      style={{
                        background: "rgba(99, 102, 241, 0.1)",
                        color: "#6366f1",
                        borderColor: "rgba(99, 102, 241, 0.25)",
                      }}
                    >
                      {char}
                    </WeakCharChip>
                  ))}
                </WeakCharList>
              )}
            </ReviewCard>

            {/* WEAK KANJI BANK CARD (ALWAYS VISIBLE) */}
            <WeakBankCard
              style={{
                borderColor:
                  weakItems.length > 0
                    ? "rgba(244, 63, 94, 0.3)"
                    : "rgba(16, 185, 129, 0.3)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {weakItems.length > 0
                      ? "⚠️ Bank Kanji Lemah"
                      : "✨ Bank Kanji Lemah"}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      marginTop: "2px",
                    }}
                  >
                    {weakItems.length > 0
                      ? `Terdapat ${weakItems.length} karakter yang membutuhkan latihan ulang untuk memperbaiki skor ingatan.`
                      : "Belum ada Kanji lemah tersimpan. Semua ingatan kamu sempurna! ✨"}
                  </p>
                </div>

                {weakItems.length > 0 ? (
                  <RepairWeakButton onClick={handleStartWeakRepairSession}>
                    🛠️ Perbaiki Kanji Lemah ({weakItems.length} Karakter) →
                  </RepairWeakButton>
                ) : (
                  <div
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 800,
                      color: "#10b981",
                      background: "rgba(16, 185, 129, 0.1)",
                      border: "1px solid rgba(16, 185, 129, 0.25)",
                      padding: "0.5rem 1rem",
                      borderRadius: "12px",
                    }}
                  >
                    🎉 Ingatan Tajam & Sempurna
                  </div>
                )}
              </div>

              {weakItems.length > 0 && (
                <WeakCharList>
                  {weakItems.map((char, i) => (
                    <WeakCharChip key={i}>{char}</WeakCharChip>
                  ))}
                </WeakCharList>
              )}
            </WeakBankCard>

            {/* START SESSION ACTION */}
            <StartSessionBtn onClick={handleStartSession}>
              Mulai Sesi Hafalan Harian ({config.targetPerDay} Karakter) 🚀
            </StartSessionBtn>
          </>
        )}

        {/* UNIFIED STUDY STUDIO SESSION */}
        {sessionState === "flashcards" && (
          <UnifiedStudyStudio
            items={batchDetails}
            item={batchDetails[currentFlashcardIndex]}
            currentIndex={currentFlashcardIndex}
            totalItems={batchDetails.length}
            onNext={handleNextFlashcard}
            onPrev={() =>
              setCurrentFlashcardIndex((prev) => Math.max(0, prev - 1))
            }
          />
        )}

        {/* INTEGRATIVE QUIZ SESSION */}
        {sessionState === "quiz" && (
          <IntegrativeQuiz
            items={batchDetails}
            onComplete={handleQuizComplete}
          />
        )}

        {/* SUMMARY MODAL */}
        {sessionState === "summary" && quizSummary && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 900 }}>
                Evaluasi Harian Selesai! 🎉
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
                Selamat! Kamu telah menyelesaikan sesi hafalan harian hari ini.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                width: "100%",
                maxWidth: "500px",
              }}
            >
              <StatCard style={{ flex: 1, textAlign: "center" }}>
                <div className="label">Skor Evaluasi</div>
                <div className="value">{quizSummary.scorePercentage}%</div>
              </StatCard>
              <StatCard style={{ flex: 1, textAlign: "center" }}>
                <div className="label">EXP Diperoleh</div>
                <div className="value">+{quizSummary.expEarned}</div>
              </StatCard>
            </div>

            <StartSessionBtn
              onClick={() => setSessionState("dashboard")}
              style={{ maxWidth: "400px" }}
            >
              Kembali ke Dashboard Harian 🏠
            </StartSessionBtn>
          </div>
        )}
      </ContentWrapper>
    </PageContainer>
  );
}
