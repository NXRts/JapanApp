"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 2rem 4rem;
  min-height: 90vh;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 1.5rem;
    min-height: auto;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 850;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffb7c5 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.15rem;
  color: var(--text-secondary);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FeatureGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-bottom: 3rem;
`;

const FeatureCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px -5px rgba(255, 183, 197, 0.15);
    border-color: rgba(255, 183, 197, 0.5);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1.5rem;
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: rgba(255, 183, 197, 0.1);
  color: #ffb7c5;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 2.2rem;
    border-radius: 16px;
  }
`;

const FeatureInfo = styled.div`
  flex-grow: 1;
`;

const FeatureTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--foreground);
`;

const FeatureDesc = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary);
  color: white;
  padding: 0.65rem 1.25rem;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 750;
  font-size: 0.88rem;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);

  &:hover {
    transform: translateY(-1.5px);
    filter: brightness(1.1);
    box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3);
  }
`;

const ControlButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ffd1dc 0%, #ffb7c5 100%);
  color: #7a2c3a;
  border: none;
  padding: 0.65rem 1.25rem;
  border-radius: 14px;
  font-weight: 800;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(255, 183, 197, 0.3);

  &:hover {
    transform: translateY(-1.5px);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function SakuraFitur() {
  const [sakuraEnabled, setSakuraEnabled] = useState(true);

  useEffect(() => {
    const status = localStorage.getItem("sakura-particles-enabled");
    if (status === "false") {
      setSakuraEnabled(false);
    }
  }, []);

  const toggleSakura = () => {
    const nextState = !sakuraEnabled;
    setSakuraEnabled(nextState);
    localStorage.setItem("sakura-particles-enabled", String(nextState));

    // Dispatch global event for the layout
    const event = new Event("sakura-theme-changed");
    window.dispatchEvent(event);
  };

  return (
    <Container>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }]}
        current="SakuraFitur"
      />

      <Header>
        <Title>SakuraFitur Hub 🌸</Title>
        <Subtitle>
          Daftar peningkatan dan fitur premium baru yang diadaptasi dari
          SakuraFlow namun dibalut dalam estetika Zen Jepang khas Japan App
          Anda.
        </Subtitle>
      </Header>

      <FeatureGrid>
        {/* Fitur 1: SRS Vocab */}
        <FeatureCard>
          <FeatureIcon>📚</FeatureIcon>
          <FeatureInfo>
            <FeatureTitle>
              Penyelesaian Detail Kosakata SRS (Milestone 1)
            </FeatureTitle>
            <FeatureDesc>
              Placeholder ulasan kosakata kini telah diintegrasikan dengan
              database kosakata lokal! Halaman ulasan kini menampilkan cara baca
              Kana (Furigana), Romaji, arti lengkap, serta Text-to-Speech (TTS)
              suara pelafalan bahasa Jepang asli yang dinamis.
            </FeatureDesc>
            <ActionButton href="/review">Coba SRS Review</ActionButton>
          </FeatureInfo>
        </FeatureCard>

        {/* Fitur 2: Sakura Background */}
        <FeatureCard>
          <FeatureIcon>🌸</FeatureIcon>
          <FeatureInfo>
            <FeatureTitle>
              Tema Kelopak Sakura Berguguran (Milestone 2)
            </FeatureTitle>
            <FeatureDesc>
              Menambahkan keindahan visual kelopak bunga sakura yang jatuh
              meliuk di latar belakang layar secara halus untuk menghadirkan
              atmosfer belajar Jepang yang premium. Anda bisa menonaktifkan atau
              mengaktifkannya secara langsung melalui tombol di bawah ini.
            </FeatureDesc>
            <ControlButton onClick={toggleSakura}>
              {sakuraEnabled
                ? "Nonaktifkan Efek Sakura"
                : "Aktifkan Efek Sakura"}
            </ControlButton>
          </FeatureInfo>
        </FeatureCard>

        {/* Fitur 3: JLPT Exam */}
        <FeatureCard>
          <FeatureIcon>⏱️</FeatureIcon>
          <FeatureInfo>
            <FeatureTitle>
              Simulasi Ujian JLPT Berdurasi (Milestone 3)
            </FeatureTitle>
            <FeatureDesc>
              Uji kesiapan ujian resmi Anda dengan simulasi tes JLPT berdurasi
              mundur! Menyediakan soal latihan kosakata & tata bahasa
              terstruktur sesuai standar kelulusan (passing mark) JLPT asli.
            </FeatureDesc>
            <ActionButton href="/jlpt-exam">Mulai Simulasi JLPT</ActionButton>
          </FeatureInfo>
        </FeatureCard>

        {/* Fitur 4: Sakura Grammar */}
        <FeatureCard>
          <FeatureIcon>📚</FeatureIcon>
          <FeatureInfo>
            <FeatureTitle>
              Struktur Belajar & Kuis Tata Bahasa (Sakura Grammar)
            </FeatureTitle>
            <FeatureDesc>
              Belajar tata bahasa Jepang N5 secara terstruktur dan berurutan!
              Modul baru ini menyediakan materi dengan furigana, ulasan
              ringkasan, dan kuis interaktif yang terbagi menjadi 3 jenis soal
              (pilihan ganda, mengisi partikel, dan penyusun kalimat).
            </FeatureDesc>
            <ActionButton href="/grammar/lessons">
              Mulai Belajar Grammar
            </ActionButton>
          </FeatureInfo>
        </FeatureCard>
      </FeatureGrid>
    </Container>
  );
}
