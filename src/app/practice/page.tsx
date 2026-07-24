"use client";

import React, { useState, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { lessonsData } from "@/data/lessonsData";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

// ==========================================
// ANIMATIONS
// ==========================================
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ==========================================
// STYLED COMPONENTS
// ==========================================
const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem 4rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;

  @media (max-width: 1024px) {
    padding: 1rem 1rem 100px 1rem;
    gap: 1.25rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.75rem 100px 0.75rem;
    gap: 1rem;
  }
`;

const HeroBanner = styled.div`
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%);
  border-radius: 28px;
  padding: 2.25rem 2.5rem;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(79, 70, 229, 0.28);

  @media (max-width: 768px) {
    padding: 1.35rem 1.15rem;
    border-radius: 20px;
  }
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(10px);
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.25);

  @media (max-width: 640px) {
    font-size: 0.72rem;
    padding: 0.25rem 0.65rem;
    margin-bottom: 0.5rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 0.6rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.45rem;
    margin-bottom: 0.35rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.05rem;
  opacity: 0.92;
  max-width: 650px;
  line-height: 1.55;
  margin-bottom: 1.75rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.45;
    margin-bottom: 1rem;
  }
`;

const HeroStatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;

  @media (max-width: 640px) {
    gap: 0.4rem;
  }
`;

const HeroStatPill = styled.div`
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border-radius: 14px;
  padding: 0.55rem 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  font-weight: 800;

  @media (max-width: 640px) {
    flex: 1 1 calc(33% - 0.4rem);
    padding: 0.4rem 0.5rem;
    font-size: 0.74rem;
    border-radius: 10px;
    justify-content: center;
    gap: 0.3rem;
    text-align: center;
    white-space: nowrap;
  }
`;

/* ─── Filter Tabs Bar ─────────────────────────────────────────────────────── */
const FilterRow = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 640px) {
    gap: 0.45rem;
    padding-bottom: 0.15rem;
  }
`;

const FilterTab = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? "#3b82f6" : "var(--surface)")};
  color: ${({ $active }) => ($active ? "white" : "var(--text-secondary)")};
  border: 1.5px solid ${({ $active }) => ($active ? "#3b82f6" : "var(--border)")};
  border-radius: 999px;
  padding: 0.6rem 1.25rem;
  font-size: 0.88rem;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: #3b82f6;
    color: ${({ $active }) => ($active ? "white" : "var(--foreground)")};
  }

  @media (max-width: 640px) {
    padding: 0.42rem 0.85rem;
    font-size: 0.78rem;
  }
`;

/* ─── Main Content Grid Layout ────────────────────────────────────────────── */
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const SectionHeaderTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;

  @media (max-width: 640px) {
    font-size: 1.05rem;
  }
`;

/* ─── Practice Mode Cards Grid ────────────────────────────────────────────── */
const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
`;

const ModeCard = styled.div<{ $accentColor: string }>`
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 24px;
  padding: 1.6rem 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.15rem;
  position: relative;
  overflow: hidden;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.25s ease forwards;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: ${({ $accentColor }) => $accentColor};
    border-radius: 6px 0 0 6px;
  }

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ $accentColor }) => $accentColor};
    box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.18);
  }

  @media (max-width: 768px) {
    padding: 1.15rem 1rem;
    border-radius: 18px;
    gap: 0.85rem;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
`;

const CardIconBox = styled.div<{ $color: string }>`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: ${({ $color }) => `${$color}18`};
  border: 1.5px solid ${({ $color }) => `${$color}40`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  flex-shrink: 0;

  @media (max-width: 640px) {
    width: 42px;
    height: 42px;
    font-size: 1.35rem;
    border-radius: 12px;
  }
`;

const BadgeTag = styled.span<{ $color: string }>`
  background: ${({ $color }) => `${$color}1c`};
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => `${$color}40`};
  font-size: 0.75rem;
  font-weight: 900;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  @media (max-width: 640px) {
    font-size: 0.68rem;
    padding: 0.2rem 0.55rem;
  }
`;

const ModeTitle = styled.h3`
  font-size: 1.18rem;
  font-weight: 850;
  color: var(--foreground);
  margin-top: 0.65rem;
  margin-bottom: 0.35rem;

  @media (max-width: 640px) {
    font-size: 1.02rem;
    margin-top: 0.4rem;
    margin-bottom: 0.2rem;
  }
`;

const ModeDescription = styled.p`
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;

  @media (max-width: 640px) {
    font-size: 0.8rem;
    line-height: 1.42;
  }
`;

const ActionBtn3D = styled(Link)<{ $color: string; $disabled?: boolean }>`
  width: 100%;
  background: ${({ $color, $disabled }) => ($disabled ? "var(--border)" : $color)};
  color: ${({ $disabled }) => ($disabled ? "var(--text-secondary)" : "white")};
  font-size: 0.9rem;
  font-weight: 900;
  text-align: center;
  padding: 0.8rem 1.25rem;
  border-radius: 14px;
  text-decoration: none;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: all 0.15s ease;
  display: inline-block;

  &:hover {
    ${({ $disabled }) => (!$disabled ? "filter: brightness(1.1); transform: translateY(-1px);" : "")}
  }

  &:active {
    ${({ $disabled }) => (!$disabled ? "transform: translateY(1px);" : "")}
  }

  @media (max-width: 640px) {
    padding: 0.62rem 1rem;
    font-size: 0.82rem;
    border-radius: 12px;
  }
`;

/* ─── Side Widgets ───────────────────────────────────────────────────────── */
const SideWidget = styled.div`
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 24px;
  padding: 1.35rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 640px) {
    padding: 1.1rem 1rem;
    border-radius: 18px;
    gap: 0.75rem;
  }
`;

const WidgetHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.05rem;
  font-weight: 900;
  color: var(--foreground);

  @media (max-width: 640px) {
    font-size: 0.96rem;
  }
`;

const TipsText = styled.p`
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;

  @media (max-width: 640px) {
    font-size: 0.8rem;
    line-height: 1.42;
  }
`;

const ActivityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0;
  border-bottom: 1px dashed var(--border);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 640px) {
    padding: 0.45rem 0;
  }
`;

const ActivityLabel = styled.span`
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 700;

  @media (max-width: 640px) {
    font-size: 0.78rem;
  }
`;

const ActivityValue = styled.span`
  font-size: 0.9rem;
  font-weight: 900;
  color: var(--foreground);

  @media (max-width: 640px) {
    font-size: 0.82rem;
  }
`;

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function PracticeHubPage() {
  const { progress } = useProgress();
  const [activeFilter, setActiveFilter] = useState<"all" | "jlpt" | "audio" | "games" | "review">("all");

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);
  const todayExp = progress.activityLog?.[todayStr] || 0;
  const streak = progress.streak || 0;
  const completedCount = progress.completedExercises?.length || 0;

  // Mistakes count
  const mistakesCount = useMemo(() => {
    if (!progress.mastery) return 0;
    return Object.values(progress.mastery).filter((m) => m.incorrect > 0).length;
  }, [progress.mastery]);

  // Dynamic lesson calculations
  const practiceLessonId = useMemo(() => {
    if (progress.completedExercises && progress.completedExercises.length > 0) {
      const idx = Math.floor(Math.random() * progress.completedExercises.length);
      return progress.completedExercises[idx];
    }
    return "n5-u1-l1";
  }, [progress.completedExercises]);

  const listeningLessonId = useMemo(() => {
    const relations = new Map<string, string>();
    for (let i = 1; i < lessonsData.length; i++) {
      relations.set(lessonsData[i].id, lessonsData[i - 1].id);
    }

    const audioLessons = lessonsData.filter((l) => {
      const hasListening = l.questions.some((q) => q.type === "listening");
      if (!hasListening) return false;
      if (l.id === "n5-u1-l1") return true;
      const prevId = relations.get(l.id);
      if (!prevId) return true;
      return progress.completedExercises?.includes(prevId);
    });

    if (audioLessons.length > 0) {
      const idx = Math.floor(Math.random() * audioLessons.length);
      return audioLessons[idx].id;
    }
    return "n5-u1-l1";
  }, [progress.completedExercises]);

  // Practice Modes Definition
  const practiceModes = [
    {
      id: "jlpt-practice",
      category: "jlpt",
      icon: "🎯",
      title: "Latihan JLPT Interaktif",
      description: "Mode latihan pilihan ganda & Flashcards SRS untuk tingkat N5 hingga N1 tanpa tekanan waktu.",
      tag: "+25 XP",
      tagColor: "#8b5cf6",
      accentColor: "#8b5cf6",
      href: "/jlpt/practice",
      btnText: "Mulai Latihan JLPT",
    },
    {
      id: "lesson-drill",
      category: "jlpt",
      icon: "📚",
      title: "Drill Pelajaran Terstruktur",
      description: "Pertajam pemahaman dari modul pelajaran yang pernah kamu selesaikan sebelumnya.",
      tag: "+20 XP",
      tagColor: "#3b82f6",
      accentColor: "#3b82f6",
      href: `/lesson?id=${practiceLessonId}&from=practice`,
      btnText: "Mulai Drill Pelajaran",
    },
    {
      id: "audio-listening",
      category: "audio",
      icon: "🎧",
      title: "Pemahaman Pendengaran (Audio)",
      description: "Latih pendengaran alami, percakapan harian, dan partikel tata bahasa lewat kuis audio.",
      tag: "+15 XP",
      tagColor: "#6366f1",
      accentColor: "#6366f1",
      href: "/study/listening",
      btnText: "Latih Audio Pendengaran",
    },
    {
      id: "grammar-drills",
      category: "jlpt",
      icon: "📝",
      title: "Drill Tata Bahasa & Pola Kalimat",
      description: "Latihan pemahaman pola kalimat, konjugasi kata kerja, dan penggunaan partikel secara mendalam.",
      tag: "+20 XP",
      tagColor: "#ec4899",
      accentColor: "#ec4899",
      href: "/study/grammar-drills",
      btnText: "Mulai Drill Tata Bahasa",
    },
    {
      id: "mini-games",
      category: "games",
      icon: "🎮",
      title: "Mini Game Belajar Bahasa",
      description: "Asah kecepatan daya ingat Kana dan Kanji lewat game Speed Typing & Memory Match yang seru.",
      tag: "+15 XP",
      tagColor: "#10b981",
      accentColor: "#10b981",
      href: "/game",
      btnText: "Mainkan Mini Game",
    },
    {
      id: "mistakes-review",
      category: "review",
      icon: "🔄",
      title: "Perbaikan Kesalahan Soal",
      description:
        mistakesCount > 0
          ? `Terdapat ${mistakesCount} item soal yang pernah salah dikerjakan. Ulangi untuk menguasainya 100%.`
          : "Tidak ada kesalahan tersimpan saat ini! Seluruh latihan kamu tercatat sempurna.",
      tag: mistakesCount > 0 ? `${mistakesCount} Kesalahan` : "Skor Perfek ✨",
      tagColor: mistakesCount > 0 ? "#f59e0b" : "#10b981",
      accentColor: "#f59e0b",
      href: "/characters?practice=true",
      btnText: mistakesCount > 0 ? `Perbaiki ${mistakesCount} Soal` : "Semua Benar ✓",
      disabled: mistakesCount === 0,
    },
    {
      id: "vocabulary-srs",
      category: "review",
      icon: "🈸",
      title: "Review Kosakata & Kanji SRS",
      description: "Metode Spaced Repetition System (SRS) untuk ingatan jangka panjang seluruh huruf dan kosakata.",
      tag: "SRS Mode",
      tagColor: "#a855f7",
      accentColor: "#a855f7",
      href: "/study/vocabulary",
      btnText: "Review Kosakata SRS",
    },
  ];

  const filteredModes = useMemo(() => {
    if (activeFilter === "all") return practiceModes;
    return practiceModes.filter((m) => m.category === activeFilter);
  }, [activeFilter, practiceModes]);

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Practice Hub" />

      {/* Hero Banner Header */}
      <HeroBanner>
        <HeroBadge>🎯 Pusat Asah Kemampuan</HeroBadge>
        <HeroTitle>Practice Hub</HeroTitle>
        <HeroSubtitle>
          Pertajam pemahaman tata bahasa, latih pendengaran audio, perbaiki kesalahan soal, dan nikmati latihan
          interaktif bebas tekanan waktu.
        </HeroSubtitle>
        <HeroStatsRow>
          <HeroStatPill>⚡ {todayExp} XP Hari Ini</HeroStatPill>
          <HeroStatPill>🔄 {mistakesCount} Perlu Diperbaiki</HeroStatPill>
          <HeroStatPill>🔥 {streak} Hari Runtunan</HeroStatPill>
        </HeroStatsRow>
      </HeroBanner>

      {/* Filter Tabs Bar */}
      <FilterRow>
        <FilterTab $active={activeFilter === "all"} onClick={() => setActiveFilter("all")}>
          ✨ Semua Mode
        </FilterTab>
        <FilterTab $active={activeFilter === "jlpt"} onClick={() => setActiveFilter("jlpt")}>
          🎯 JLPT & Drill
        </FilterTab>
        <FilterTab $active={activeFilter === "audio"} onClick={() => setActiveFilter("audio")}>
          🎧 Fokus Audio
        </FilterTab>
        <FilterTab $active={activeFilter === "games"} onClick={() => setActiveFilter("games")}>
          🎮 Mini Game
        </FilterTab>
        <FilterTab $active={activeFilter === "review"} onClick={() => setActiveFilter("review")}>
          🔄 Review & Kesalahan
        </FilterTab>
      </FilterRow>

      {/* Main Grid Layout */}
      <ContentGrid>
        <MainColumn>
          <SectionHeaderTitle>⚡ Mode Latihan Pilihan</SectionHeaderTitle>

          <CardsGrid>
            {filteredModes.map((mode) => (
              <ModeCard key={mode.id} $accentColor={mode.accentColor}>
                <div>
                  <CardTop>
                    <CardIconBox $color={mode.accentColor}>{mode.icon}</CardIconBox>
                    <BadgeTag $color={mode.tagColor}>{mode.tag}</BadgeTag>
                  </CardTop>
                  <ModeTitle>{mode.title}</ModeTitle>
                  <ModeDescription>{mode.description}</ModeDescription>
                </div>
                <ActionBtn3D
                  href={mode.disabled ? "#" : mode.href}
                  $color={mode.accentColor}
                  $disabled={mode.disabled}
                  onClick={(e) => mode.disabled && e.preventDefault()}
                >
                  {mode.btnText}
                </ActionBtn3D>
              </ModeCard>
            ))}
          </CardsGrid>
        </MainColumn>

        {/* Side Column Widgets */}
        <SideColumn>
          <SideWidget>
            <WidgetHeaderRow>💡 Tips Latihan Efektif</WidgetHeaderRow>
            <TipsText>
              Latihan konsisten 10–15 menit setiap hari jauh lebih cepat membakar ingatan jangka panjang dibandingkan
              belajar maraton dalam satu hari! Gunakan mode Audio untuk melatih pendengaran percakapan asli.
            </TipsText>
          </SideWidget>

          <SideWidget>
            <WidgetHeaderRow>📊 Statistik Latihan Hari Ini</WidgetHeaderRow>
            <ActivityRow>
              <ActivityLabel>XP Terkumpul Hari Ini</ActivityLabel>
              <ActivityValue>+ {todayExp} XP</ActivityValue>
            </ActivityRow>
            <ActivityRow>
              <ActivityLabel>Pelajaran Selesai</ActivityLabel>
              <ActivityValue>{completedCount} Modul</ActivityValue>
            </ActivityRow>
            <ActivityRow>
              <ActivityLabel>Nyawa Belajar</ActivityLabel>
              <ActivityValue>{progress.isSuper ? "♾️ Super" : `${progress.hearts ?? 5} / 5 ❤️`}</ActivityValue>
            </ActivityRow>
          </SideWidget>

          <SideWidget style={{ background: "linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)", borderColor: "rgba(234, 179, 8, 0.3)" }}>
            <WidgetHeaderRow>⚡ Kuis Harian Kilat</WidgetHeaderRow>
            <TipsText style={{ color: "var(--foreground)" }}>
              Selesaikan 10 soal kuis cepat untuk mengumpulkan XP tambahan dan mempercepat perolehan Lencana Misi Harian!
            </TipsText>
            <ActionBtn3D href="/daily-quiz" $color="#f59e0b">
              Buka Kuis Harian 🚀
            </ActionBtn3D>
          </SideWidget>
        </SideColumn>
      </ContentGrid>
    </Container>
  );
}
