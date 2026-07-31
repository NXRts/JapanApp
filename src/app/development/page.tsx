"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  min-height: 90vh;
  animation: ${fadeIn} 0.4s ease-out;

  @media (max-width: 1024px) {
    padding: 1rem 1rem 96px 1rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem 96px 0.5rem;
  }
`;

const HeaderSection = styled.div`
  text-align: left;
  margin-bottom: 2.5rem;
  max-width: 820px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 0.85rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.03em;

  @media (max-width: 768px) {
    font-size: 2.1rem;
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

/* Stats Bar */
const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
`;

const StatCard = styled.div<{ $borderColor?: string }>`
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 5px solid ${({ $borderColor }) => $borderColor || "var(--primary)"};
  border-radius: 20px;
  padding: 1.35rem 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1.25rem;

  .icon-box {
    font-size: 2rem;
    width: 52px;
    height: 52px;
    border-radius: 16px;
    background: rgba(var(--primary-rgb), 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .value {
    font-size: 1.6rem;
    font-weight: 900;
    color: var(--foreground);
  }

  .label {
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--text-secondary);
    text-transform: uppercase;
  }
`;

/* Flagship Feature Hero Card */
const FlagshipCard = styled.div`
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.15) 100%);
  border: 2px solid rgba(139, 92, 246, 0.3);
  border-radius: 28px;
  padding: 2.5rem;
  margin-bottom: 3.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(139, 92, 246, 0.12);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%);
  }

  @media (max-width: 768px) {
    padding: 1.75rem 1.25rem;
    border-radius: 20px;
  }
`;

const FlagshipBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #10b981;
  color: white;
  font-size: 0.8rem;
  font-weight: 900;
  padding: 4px 12px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.25rem;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
`;

const FlagshipContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 850px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FlagshipInfo = styled.div`
  max-width: 700px;

  h2 {
    font-size: 2rem;
    font-weight: 900;
    color: var(--foreground);
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  p {
    font-size: 1.05rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.95rem;
    }
  }
`;

const FeaturePillGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
`;

const FeaturePill = styled.span`
  background: rgba(var(--foreground-rgb), 0.06);
  border: 1px solid var(--border);
  color: var(--foreground);
  font-size: 0.85rem;
  font-weight: 800;
  padding: 0.4rem 0.9rem;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
`;

const PrimaryCTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  font-weight: 900;
  font-size: 1.05rem;
  padding: 1rem 2.25rem;
  border-radius: 18px;
  text-decoration: none;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.35);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(59, 130, 246, 0.45);
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
    padding: 0.9rem 1.5rem;
    font-size: 0.95rem;
  }
`;

/* Experimental Grid */
const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 900;
  color: var(--foreground);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const DevGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const DevCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.75rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;

  .card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  .card-icon {
    font-size: 2.2rem;
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: rgba(var(--foreground-rgb), 0.04);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .badge-status {
    font-size: 0.72rem;
    font-weight: 900;
    padding: 4px 10px;
    border-radius: 8px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .status-dev {
    background: rgba(245, 158, 11, 0.15);
    color: #f59e0b;
    border: 1px solid rgba(245, 158, 11, 0.3);
  }

  .status-exp {
    background: rgba(168, 85, 247, 0.15);
    color: #a855f7;
    border: 1px solid rgba(168, 85, 247, 0.3);
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 900;
    color: var(--foreground);
    margin-bottom: 0.4rem;
  }

  p {
    font-size: 0.92rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .progress-box {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-top: 0.5rem;
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.78rem;
    font-weight: 800;
    color: var(--text-secondary);
  }

  .progress-outer {
    width: 100%;
    height: 6px;
    background: rgba(var(--foreground-rgb), 0.08);
    border-radius: 99px;
    overflow: hidden;
  }

  .progress-inner {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, #8b5cf6, #3b82f6);
  }
`;

/* Feedback Banner */
const FeedbackBanner = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2.25rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  h3 {
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--foreground);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.95rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }
`;

const FeedbackButton = styled.button`
  background: rgba(var(--primary-rgb), 0.12);
  color: var(--primary);
  border: 1px solid rgba(var(--primary-rgb), 0.3);
  font-weight: 900;
  font-size: 0.95rem;
  padding: 0.8rem 1.75rem;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary);
    color: white;
  }
`;

const EXPERIMENTAL_FEATURES = [
  {
    id: "ai-sensei",
    icon: "🤖",
    title: "AI Sensei Voice Assistant",
    description: "Tutor kecerdasan buatan interaktif untuk percakapan bebas (Kaiwa) dengan koreksi tata bahasa dan saran pengucapan langsung.",
    progress: 75,
    status: "Dalam Pengembangan ⚙️",
    statusClass: "status-dev",
    target: "Versi 1.2",
  },
  {
    id: "kanji-tracing",
    icon: "✍️",
    title: "Kanji Stroke Tracing Lab",
    description: "Laboratorium latihan menulis karakter Kanji dengan kanvas digital interaktif dan pendeteksi urutan coretan (Stroke Order).",
    progress: 80,
    status: "Eksperimental 🧪",
    statusClass: "status-exp",
    target: "Versi 1.1",
  },
  {
    id: "pitch-accent",
    icon: "🎧",
    title: "Pitch Accent & Intonation Lab",
    description: "Visualisasi pola intonasi nada bicara (Pitch Accent) standar Tokyo dan laboratorium analisis suara rekaman pengguna.",
    progress: 60,
    status: "Dalam Pengembangan ⚙️",
    statusClass: "status-dev",
    target: "Versi 1.3",
  },
  {
    id: "anki-export",
    icon: "📦",
    title: "Anki Deck Exporter & Sync",
    description: "Fitur mengekspor daftar kosakata dan kanji favorit Anda dari JapanApp ke file dek Anki (.apkg) untuk latihan offline.",
    progress: 45,
    status: "Dalam Perancangan 📐",
    statusClass: "status-dev",
    target: "Versi 1.3",
  },
];

export default function DevelopmentPage() {
  const [showFeedbackAlert, setShowFeedbackAlert] = useState(false);

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Development" />

      <HeaderSection>
        <Title>Development & Experimental Labs 🧪</Title>
        <Subtitle>
          Daftar modul dan fitur yang sedang aktif dikembangkan oleh tim JapanApp. Coba
          fitur beta secara langsung dan berikan saran pengembangan Anda!
        </Subtitle>
      </HeaderSection>

      {/* Stats Summary */}
      <StatsRow>
        <StatCard $borderColor="#10b981">
          <div className="icon-box">🚀</div>
          <div>
            <div className="value">1 Fitur Beta</div>
            <div className="label">Siap Dicoba</div>
          </div>
        </StatCard>

        <StatCard $borderColor="#8b5cf6">
          <div className="icon-box">🧪</div>
          <div>
            <div className="value">4 Laboratorium</div>
            <div className="label">Dalam Pengembangan</div>
          </div>
        </StatCard>

        <StatCard $borderColor="#3b82f6">
          <div className="icon-box">⚡</div>
          <div>
            <div className="value">Aktif</div>
            <div className="label">Status Server Labs</div>
          </div>
        </StatCard>
      </StatsRow>

      {/* Flagship Feature 1: Simulasi Ujian JLPT N5 */}
      <FlagshipCard style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(59, 130, 246, 0.15) 100%)", borderColor: "rgba(16, 185, 129, 0.4)" }}>
        <FlagshipBadge style={{ background: "#10b981" }}>Beta Siap Dicoba • Module Baru 🏆</FlagshipBadge>
        <FlagshipContent>
          <FlagshipInfo>
            <h2>🏆 Simulasi Ujian Resmi JLPT N5 (Single-Page Quiz)</h2>
            <p>
              Simulasi ujian resmi JLPT N5 lengkap (70 Soal: Moji/Goi, Bunpou/Dokkai, Choukai) dengan countdown timer per seksi, lembar jawab digital, audio percakapan, & sertifikat kelulusan.
            </p>

            <FeaturePillGrid>
              <FeaturePill>⏱️ Timer Ujian 90 Menit</FeaturePill>
              <FeaturePill>📝 70 Soal Standar JEES</FeaturePill>
              <FeaturePill>🎧 Pemutar Audio Choukai</FeaturePill>
              <FeaturePill>📜 Sertifikat & Rapor Poin</FeaturePill>
            </FeaturePillGrid>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <PrimaryCTAButton href="/development/jlpt-simulasi" style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}>
                🚀 Mulai Simulasi Ujian JLPT N5
              </PrimaryCTAButton>
              <PrimaryCTAButton href="/development/jlpt-sertifikat" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" }}>
                📜 Lihat Pratinjau Sertifikat N5
              </PrimaryCTAButton>
            </div>
          </FlagshipInfo>
        </FlagshipContent>
      </FlagshipCard>

      {/* Flagship Feature 2: Hafalan Memorization System */}
      <FlagshipCard>
        <FlagshipBadge>Beta Tersedia • Fitur Unggulan 🚀</FlagshipBadge>
        <FlagshipContent>
          <FlagshipInfo>
            <h2>🃏 Sistem Hafalan Leitner (Spaced Repetition System)</h2>
            <p>
              Metode hafalan berkala ilmiah 5-Box Leitner untuk memindahkan ingatan
              Hiragana, Katakana, dan Kanji dari memori jangka pendek ke memori jangka
              panjang secara efektif.
            </p>

            <FeaturePillGrid>
              <FeaturePill>📦 5 Kotak Memori Berjenjang</FeaturePill>
              <FeaturePill>🔊 Audio Pengucapan Alami</FeaturePill>
              <FeaturePill>📊 Pelacakan Kartu Jatuh Tempo</FeaturePill>
              <FeaturePill>🔤 Hiragana, Katakana & Kanji</FeaturePill>
            </FeaturePillGrid>

            <PrimaryCTAButton href="/development/hafalan">
              🚀 Coba Fitur Hafalan Sekarang
            </PrimaryCTAButton>
          </FlagshipInfo>
        </FlagshipContent>
      </FlagshipCard>

      {/* Experimental Features Grid */}
      <SectionTitle>🧪 Modul Dalam Tahap Pengembangan</SectionTitle>
      <DevGrid>
        {EXPERIMENTAL_FEATURES.map((item) => (
          <DevCard key={item.id}>
            <div>
              <div className="card-top">
                <div className="card-icon">{item.icon}</div>
                <span className={`badge-status ${item.statusClass}`}>
                  {item.status}
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <div className="progress-box">
              <div className="progress-info">
                <span>Pengerjaan: {item.progress}%</span>
                <span>{item.target}</span>
              </div>
              <div className="progress-outer">
                <div
                  className="progress-inner"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          </DevCard>
        ))}
      </DevGrid>

      {/* Feedback & Suggestion Section */}
      <FeedbackBanner>
        <h3>💡 Punya Ide Fitur Baru?</h3>
        <p>
          Kami ingin mendengar masukan dari Anda! Berikan saran modul atau fitur yang
          Anda harapkan di JapanApp.
        </p>
        <FeedbackButton onClick={() => setShowFeedbackAlert(true)}>
          {showFeedbackAlert ? "Terima Kasih atas Masukan Anda! ❤️" : "Kirim Masukan & Ide Fitur"}
        </FeedbackButton>
      </FeedbackBanner>
    </Container>
  );
}
