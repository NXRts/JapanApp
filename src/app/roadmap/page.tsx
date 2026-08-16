"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CheckIcon } from "@/components/common/CheckIcon";
import { useProgress } from "@/context/ProgressContext";
import { lessonsData } from "@/data/lessonsData";

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 6rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 5rem;
  }
`;

const Header = styled.div`
  text-align: left;
  margin-bottom: 2.5rem;
  max-width: 850px;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 900;
  margin-bottom: 0.85rem;
  color: var(--foreground);
  letter-spacing: -0.04em;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.15rem;
  color: var(--text-secondary);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

/* Overall Overview Grid */
const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

const AnalyticCard = styled.div<{ $borderColor?: string }>`
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 5px solid ${({ $borderColor }) => $borderColor || "var(--primary)"};
  border-radius: 20px;
  padding: 1.35rem 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const AnalyticValue = styled.span<{ $color?: string }>`
  font-size: 2.1rem;
  font-weight: 900;
  color: ${({ $color }) => $color || "var(--foreground)"};

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const AnalyticLabel = styled.span`
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

/* Section Header */
const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  .title-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 900;
    color: var(--foreground);
  }

  p {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

    h2 {
      font-size: 1.3rem;
    }
  }
`;

/* JLPT Readiness Section */
const ReadinessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.25rem;
  margin-bottom: 3.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.85rem;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const ReadinessCard = styled.div<{ $color: string; $readyPct: number }>`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 22px;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ $color }) => $color};
  }

  .badge {
    background: ${({ $color }) => $color}18;
    color: ${({ $color }) => $color};
    border: 1px solid ${({ $color }) => $color}35;
    font-size: 0.78rem;
    font-weight: 900;
    padding: 3px 10px;
    border-radius: 10px;
    margin-bottom: 0.85rem;
    text-transform: uppercase;
  }

  .level-name {
    font-size: 1.75rem;
    font-weight: 900;
    color: var(--foreground);
    margin-bottom: 0.25rem;
  }

  .pct {
    font-size: 1.5rem;
    font-weight: 900;
    color: ${({ $color }) => $color};
    margin-bottom: 0.75rem;
  }

  .bar-outer {
    width: 100%;
    height: 8px;
    background: rgba(var(--foreground-rgb), 0.08);
    border-radius: 99px;
    overflow: hidden;
    margin-bottom: 0.75rem;
  }

  .bar-inner {
    height: 100%;
    width: ${({ $readyPct }) => $readyPct}%;
    background: ${({ $color }) => $color};
    border-radius: 99px;
    transition: width 0.5s ease;
  }

  .status-text {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--text-secondary);
  }
`;

/* Skill Tree Branch Section */
const SkillTreeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 3.5rem;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const BranchCard = styled.div<{ $accentColor: string }>`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 26px;
  padding: 1.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);

  .branch-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .branch-title-box {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .branch-icon {
    font-size: 2rem;
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: ${({ $accentColor }) => $accentColor}15;
    border: 1px solid ${({ $accentColor }) => $accentColor}30;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .branch-title {
    font-size: 1.2rem;
    font-weight: 900;
    color: var(--foreground);
  }

  .branch-sub {
    font-size: 0.82rem;
    color: var(--text-secondary);
  }

  .branch-pct {
    font-size: 1.1rem;
    font-weight: 900;
    color: ${({ $accentColor }) => $accentColor};
  }

  @media (max-width: 600px) {
    padding: 1.25rem;
    border-radius: 20px;
  }
`;

const SkillNodesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const SkillNodeItem = styled.div<{ $isMastered: boolean }>`
  background: rgba(var(--foreground-rgb), 0.02);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 0.9rem 1.15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(var(--foreground-rgb), 0.05);
    border-color: var(--primary);
  }

  .node-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .node-icon {
    font-size: 1.2rem;
  }

  .node-name {
    font-size: 0.92rem;
    font-weight: 800;
    color: var(--foreground);
  }

  .node-desc {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }

  .node-status-pill {
    font-size: 0.72rem;
    font-weight: 900;
    padding: 3px 10px;
    border-radius: 8px;
    white-space: nowrap;
    background: ${({ $isMastered }) =>
      $isMastered ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)"};
    color: ${({ $isMastered }) => ($isMastered ? "#10b981" : "#f59e0b")};
    border: 1px solid
      ${({ $isMastered }) =>
        $isMastered ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"};
  }
`;

/* Bottom CTA Banner */
const CTABanner = styled.div`
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%);
  border-radius: 28px;
  padding: 2.5rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  box-shadow: 0 15px 35px rgba(79, 70, 229, 0.3);

  .text-box {
    max-width: 600px;
    h3 {
      font-size: 1.8rem;
      font-weight: 900;
      margin-bottom: 0.5rem;
    }
    p {
      font-size: 1rem;
      opacity: 0.9;
      line-height: 1.5;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.75rem 1.5rem;
    border-radius: 20px;
    gap: 1.25rem;

    .text-box h3 {
      font-size: 1.4rem;
    }
  }
`;

const PracticeCTAButton = styled(Link)`
  background: white;
  color: #4f46e5;
  font-weight: 900;
  font-size: 1rem;
  padding: 0.95rem 2rem;
  border-radius: 16px;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

export default function RoadmapSkillTreePage() {
  const { progress } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const completedExercises = progress.completedExercises || [];
  const totalMasteredChars = Object.keys(progress.mastery || {}).length;

  // JLPT Level Readiness Calculations
  const n5Completed = lessonsData.filter(
    (l) => l.level === "N5" && completedExercises.includes(l.id),
  ).length;
  const n5Total = lessonsData.filter((l) => l.level === "N5").length || 10;
  const n5Pct = Math.min(100, Math.round((n5Completed / n5Total) * 100));

  const n4Completed = lessonsData.filter(
    (l) => l.level === "N4" && completedExercises.includes(l.id),
  ).length;
  const n4Total = lessonsData.filter((l) => l.level === "N4").length || 8;
  const n4Pct = Math.min(100, Math.round((n4Completed / n4Total) * 100));

  const n3Completed = lessonsData.filter(
    (l) => l.level === "N3" && completedExercises.includes(l.id),
  ).length;
  const n3Total = lessonsData.filter((l) => l.level === "N3").length || 6;
  const n3Pct = Math.min(100, Math.round((n3Completed / n3Total) * 100));

  const n2Completed = lessonsData.filter(
    (l) => l.level === "N2" && completedExercises.includes(l.id),
  ).length;
  const n2Total = lessonsData.filter((l) => l.level === "N2").length || 5;
  const n2Pct = Math.min(100, Math.round((n2Completed / n2Total) * 100));

  const n1Completed = lessonsData.filter(
    (l) => l.level === "N1" && completedExercises.includes(l.id),
  ).length;
  const n1Total = lessonsData.filter((l) => l.level === "N1").length || 5;
  const n1Pct = Math.min(100, Math.round((n1Completed / n1Total) * 100));

  if (!mounted) return null;

  const JLPT_LEVELS = [
    { level: "N5", name: "Pemula", pct: Math.max(n5Pct, totalMasteredChars > 20 ? 60 : 25), color: "#8b5cf6" },
    { level: "N4", name: "Dasar Lanjut", pct: n4Pct, color: "#ec4899" },
    { level: "N3", name: "Menengah", pct: n3Pct, color: "#f59e0b" },
    { level: "N2", name: "Bisnis / Medis", pct: n2Pct, color: "#10b981" },
    { level: "N1", name: "Mahir / Native", pct: n1Pct, color: "#ef4444" },
  ];

  const SKILL_BRANCHES = [
    {
      id: "kana",
      title: "🔤 Penulisan Kana (Writing)",
      sub: "Hiragana, Katakana, Dakuten, Yoon",
      icon: "🔤",
      color: "#3b82f6",
      pct: totalMasteredChars >= 46 ? 100 : Math.round((totalMasteredChars / 46) * 100),
      nodes: [
        { name: "Vowels & K-Row (あかうき)", desc: "Pengenalan vokal dasar & konsonan K", mastered: totalMasteredChars >= 10 },
        { name: "S-Row & T-Row (さたちつ)", desc: "Konsonan S dan T Hiragana", mastered: totalMasteredChars >= 20 },
        { name: "Katakana Vowels & Loanwords", desc: "Penulisan serapan bahasa asing", mastered: totalMasteredChars >= 35 },
        { name: "Dakuten & Handakuten (がざだば)", desc: "Tanda bunyi dakuon & handakuon", mastered: totalMasteredChars >= 46 },
      ],
    },
    {
      id: "grammar",
      title: "📝 Tata Bahasa (Bunpou)",
      sub: "Partikel, Bentuk Verb, Kalimat Majemuk",
      icon: "📝",
      color: "#8b5cf6",
      pct: Math.min(100, Math.round((n5Completed / n5Total) * 100)),
      nodes: [
        { name: "Subjek & Predikat (は / です)", desc: "Struktur kalimat paling dasar", mastered: n5Completed >= 1 },
        { name: "Partikel Utama (を / に / で / へ)", desc: "Penunjuk objek, arah, dan lokasi", mastered: n5Completed >= 3 },
        { name: "Konjugasi Bentuk-Te & Ta", desc: "Kata kerja urutan & lampau", mastered: n4Completed >= 1 },
        { name: "Keigo & Bahasa Sopan (Desu/Masu)", desc: "Tata bahasa formal & bisnis", mastered: n3Completed >= 1 },
      ],
    },
    {
      id: "vocab",
      title: "📚 Kosakata & Frasa (Kotoba)",
      sub: "Salam, Makanan, Waktu, Keluarga",
      icon: "📚",
      color: "#ec4899",
      pct: Math.min(100, Math.round(((progress.exp || 0) / 1000) * 100)),
      nodes: [
        { name: "Salam & Percakapan Harian (Aisatsu)", desc: "Konnichiwa, Arigatou, Sumimasen", mastered: (progress.exp || 0) > 100 },
        { name: "Angka, Jam, & Hari (Jikan)", desc: "Menyatakan waktu dan tanggal", mastered: (progress.exp || 0) > 300 },
        { name: "Restoran & Belanja (Kaimono)", desc: "Pemesanan makanan dan transaksi", mastered: (progress.exp || 0) > 600 },
        { name: "Istilah Bisnis & Kantor", desc: "Komunikasi profesional kerja", mastered: (progress.exp || 0) > 1200 },
      ],
    },
    {
      id: "kanji",
      title: "⛩️ Kanji Master",
      sub: "Radikal, Onyomi, Kunyomi, Stroke Order",
      icon: "⛩️",
      color: "#10b981",
      pct: Math.min(100, Math.round((totalMasteredChars / 100) * 100)),
      nodes: [
        { name: "Radikal & Elemen Dasar Kanji", desc: "Pola bentuk dasar garis & simbol", mastered: totalMasteredChars >= 10 },
        { name: "100 Kanji Dasar JLPT N5", desc: "Angka, alam, dan kata sifat", mastered: totalMasteredChars >= 30 },
        { name: "300 Kanji JLPT N4", desc: "Kehidupan sehari-hari & tempat", mastered: totalMasteredChars >= 60 },
        { name: "600 Kanji JLPT N3+", desc: "Istilah koran & media cetak", mastered: totalMasteredChars >= 100 },
      ],
    },
  ];

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Peta Kurikulum" />

      <Header>
        <Title>Peta Pohon Kurikulum & Analisis Kesiapan</Title>
        <Subtitle>
          Visualisasi pohon kemampuan bahasa Jepang dan matriks kesiapan ujian JLPT
          Anda dari N5 hingga N1. Pantau progres pembelajaran secara menyeluruh!
        </Subtitle>
      </Header>

      {/* Analytics Summary */}
      <AnalyticsGrid>
        <AnalyticCard $borderColor="#3b82f6">
          <AnalyticValue $color="#3b82f6">{progress.exp || 0}</AnalyticValue>
          <AnalyticLabel>Total EXP ⚡</AnalyticLabel>
        </AnalyticCard>

        <AnalyticCard $borderColor="#f59e0b">
          <AnalyticValue $color="#f59e0b">{progress.streak || 0}</AnalyticValue>
          <AnalyticLabel>Streak Hari 🔥</AnalyticLabel>
        </AnalyticCard>

        <AnalyticCard $borderColor="#10b981">
          <AnalyticValue $color="#10b981">
            {completedExercises.length} / {lessonsData.length}
          </AnalyticValue>
          <AnalyticLabel>Pelajaran Selesai 🎯</AnalyticLabel>
        </AnalyticCard>

        <AnalyticCard $borderColor="#ec4899">
          <AnalyticValue $color="#ec4899">{totalMasteredChars}</AnalyticValue>
          <AnalyticLabel>Karakter Dikuasai 🎴</AnalyticLabel>
        </AnalyticCard>
      </AnalyticsGrid>

      {/* JLPT Readiness Section */}
      <SectionHeading>
        <div className="title-group">
          <h2>🏆 Matriks Kesiapan Ujian JLPT</h2>
        </div>
        <p>Indikator estimasi kelulusan berdasarkan progres materi & SRS Anda</p>
      </SectionHeading>

      <ReadinessGrid>
        {JLPT_LEVELS.map((item) => (
          <ReadinessCard key={item.level} $color={item.color} $readyPct={item.pct}>
            <span className="badge">Tingkat {item.level}</span>
            <div className="level-name">JLPT {item.level}</div>
            <div className="pct">{item.pct}%</div>
            <div className="bar-outer">
              <div className="bar-inner" />
            </div>
            <span className="status-text">
              {item.pct >= 80
                ? "Siap Ujian 🏆"
                : item.pct >= 40
                ? "Dalam Progres ⚡"
                : "Perlu Latihan 🔒"}
            </span>
          </ReadinessCard>
        ))}
      </ReadinessGrid>

      {/* Skill Tree Branches */}
      <SectionHeading>
        <div className="title-group">
          <h2>🌳 Pohon Cabang Kemampuan (Skill Tree)</h2>
        </div>
        <p>Eksplorasi cabang ilmu dan perkembangan mastery topik</p>
      </SectionHeading>

      <SkillTreeGrid>
        {SKILL_BRANCHES.map((branch) => (
          <BranchCard key={branch.id} $accentColor={branch.color}>
            <div className="branch-header">
              <div className="branch-title-box">
                <div className="branch-icon">{branch.icon}</div>
                <div>
                  <div className="branch-title">{branch.title}</div>
                  <div className="branch-sub">{branch.sub}</div>
                </div>
              </div>
              <div className="branch-pct">{branch.pct}%</div>
            </div>

            <SkillNodesList>
              {branch.nodes.map((node, i) => (
                <SkillNodeItem key={i} $isMastered={node.mastered}>
                  <div className="node-left">
                    <span className="node-icon">{node.mastered ? "🟢" : "🟡"}</span>
                    <div>
                      <div className="node-name">{node.name}</div>
                      <div className="node-desc">{node.desc}</div>
                    </div>
                  </div>
                  <span className="node-status-pill">
                    {node.mastered ? <><CheckIcon size={12} style={{ marginRight: "4px" }} /> Dikuasai</> : "Perlu Drill ⚡"}
                  </span>
                </SkillNodeItem>
              ))}
            </SkillNodesList>
          </BranchCard>
        ))}
      </SkillTreeGrid>

      {/* Practice CTA Banner */}
      <CTABanner>
        <div className="text-box">
          <h3>Siap Meningkatkan Kesiapan Ujian Anda?</h3>
          <p>
            Buka Practice Hub untuk melatih 13 modul drill interaktif, SRS Flashcards,
            Listening, dan Simulasi Kuis JLPT secara bebas sepuasnya!
          </p>
        </div>
        <PracticeCTAButton href="/practice">
          🚀 Buka Practice Hub
        </PracticeCTAButton>
      </CTABanner>
    </Container>
  );
}
