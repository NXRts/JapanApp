"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 2rem 1.5rem 6rem;
  background: transparent;
  color: var(--foreground);
  font-family: "Inter", "Noto Sans JP", sans-serif;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 1rem 1rem 4rem;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background-color: var(--surface);
  border: 1px solid var(--border);
  padding: 3rem;
  border-radius: 24px;
  box-shadow: var(--shadow-lg);

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

const PageHeader = styled.div`
  border-bottom: 2px solid var(--border);
  padding-bottom: 2rem;
  margin-bottom: 3rem;

  h1 {
    font-size: clamp(2rem, 4vw, 2.75rem);
    font-weight: 900;
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
    color: var(--foreground);

    span {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    color: var(--text-secondary);
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0;
  }
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;

  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 1.75rem;
    background: var(--primary);
    border-radius: 3px;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--foreground);
    margin: 0;
    letter-spacing: -0.01em;
  }
`;

const SubsectionTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--foreground);
  margin-top: 2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SpecBadge = styled.span`
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  background: rgba(var(--primary-rgb), 0.08);
  color: var(--primary);
  border-radius: 99px;
  font-weight: 600;
  font-family: monospace;
`;

// --- SECTION 1: COLORS ---
const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
`;

const ColorCard = styled.div<{ $color: string }>`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }

  .preview {
    height: 90px;
    background-color: ${props => props.$color};
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 0.5rem;
  }

  .copy-btn {
    background: rgba(0, 0, 0, 0.4);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.25rem 0.5rem;
    font-size: 0.7rem;
    font-weight: 600;
    cursor: pointer;
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover .copy-btn {
    opacity: 1;
  }

  .details {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .name {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--foreground);
    }
    .hex {
      font-family: monospace;
      font-size: 0.85rem;
      color: var(--text-secondary);
    }
    .role {
      font-size: 0.75rem;
      color: var(--text-secondary);
      margin-top: 0.25rem;
    }
  }
`;

// --- SECTION 2: TYPOGRAPHY ---
const TypographyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: var(--background);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--border);
`;

const TypoSample = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-left: 3px solid var(--border);
  padding-left: 1rem;

  .label {
    font-size: 0.75rem;
    font-family: monospace;
    color: var(--text-secondary);
    text-transform: uppercase;
  }
`;

// --- SECTION 3: INTERACTIVE CARDS ---
const CardShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const FlipCardWrapper = styled.div`
  perspective: 1000px;
  height: 180px;
  width: 100%;
  cursor: pointer;
`;

const FlipCardInner = styled(motion.div)<{ $isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transform-style: preserve-3d;
`;

const CardFace = styled.div<{ $back?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  border: 2px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  box-sizing: border-box;
  transform: ${props => props.$back ? "rotateY(180deg)" : "rotateY(0)"};
  transition: border-color 0.25s ease;

  &:hover {
    border-color: var(--primary-light);
  }

  .kanji {
    font-size: 3.5rem;
    font-family: "Noto Sans JP", sans-serif;
    color: var(--foreground);
    font-weight: 700;
  }

  .label {
    font-size: 0.8rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  .meaning {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--primary);
  }

  .reading {
    font-size: 1.1rem;
    color: var(--text-secondary);
    margin-top: 0.25rem;
  }
`;

const TaktilCard = styled(motion.div)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;

  h4 {
    font-size: 1.15rem;
    font-weight: 700;
    margin: 0;
    color: var(--foreground);
  }

  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin: 0;
    line-height: 1.5;
  }

  .tag {
    align-self: flex-start;
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
    background: rgba(var(--secondary-rgb), 0.08);
    color: var(--secondary);
    border-radius: 99px;
    font-weight: 600;
  }
`;

// --- SECTION 4: RESPONSIVE TABLE ---
const TableWrapper = styled.div`
  margin-top: 1rem;
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Thead = styled.thead`
  background: var(--background);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Th = styled.th`
  padding: 1rem 1.25rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-align: left;
  border-bottom: 1px solid var(--border);
`;

const Tbody = styled.tbody`
  @media (max-width: 768px) {
    display: block;
  }
`;

const Tr = styled.tr`
  transition: background 0.2s ease;

  &:nth-child(even) {
    background: rgba(var(--primary-rgb), 0.01);
  }

  &:hover {
    background: rgba(var(--primary-rgb), 0.03);
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.25rem;
    border-bottom: 1px solid var(--border);
    background: var(--surface) !important;
    margin-bottom: 1rem;
    border-radius: 12px;
    box-shadow: var(--shadow-sm);

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Td = styled.td`
  padding: 1rem 1.25rem;
  color: var(--foreground);
  border-bottom: 1px solid var(--border);

  .kanji-char {
    font-size: 1.5rem;
    font-family: "Noto Sans JP", sans-serif;
    font-weight: bold;
    color: var(--primary);
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.35rem 0;
    border-bottom: none;

    &::before {
      content: attr(data-label);
      font-weight: 700;
      color: var(--text-secondary);
      font-size: 0.85rem;
    }
  }
`;

// --- SECTION 5: PROGRESS BAR & HEX BADGES ---
const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  label {
    font-weight: 600;
    font-size: 0.95rem;
  }

  input[type="range"] {
    flex: 1;
    min-width: 200px;
    accent-color: var(--primary);
  }
`;

const ProgressBarBase = styled.div`
  width: 100%;
  height: 12px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);

  @media (max-width: 768px) {
    height: 8px;
  }
`;

const ProgressBarFill = styled.div<{ $width: number }>`
  height: 100%;
  width: ${props => props.$width}%;
  background: linear-gradient(90deg, var(--secondary) 0%, var(--primary-light) 100%);
  border-radius: 99px;
  transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const BadgeGrid = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

const HexBadgeContainer = styled.div<{ $gold?: boolean }>`
  width: 90px;
  height: 100px;
  background: ${props => props.$gold ? "var(--zen-gold, #b8860b)" : "var(--primary)"};
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 800;
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.08) rotate(2deg);
  }

  .title {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.9;
  }

  .icon {
    font-size: 1.75rem;
    margin-bottom: 0.25rem;
  }
`;

// --- SECTION 6: BUTTONS SHOWCASE ---
const ButtonGroup = styled.div`
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  align-items: center;
`;

const ButtonPrimary = styled.button`
  padding: 0.75rem 1.75rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.25);
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(var(--primary-rgb), 0.35);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonSecondary = styled.button`
  padding: 0.75rem 1.75rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background: var(--secondary);
  color: white;
  box-shadow: 0 4px 12px rgba(var(--secondary-rgb), 0.2);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.95;
  }
`;

const ButtonOutline = styled.button`
  padding: 0.75rem 1.75rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
  transition: all 0.25s ease;

  &:hover {
    background: var(--primary);
    color: white;
  }
`;

const ButtonHanko = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid var(--torii-red, #c41e3a);
  background: var(--surface);
  color: var(--torii-red, #c41e3a);
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1) rotate(10deg);
    background: rgba(196, 30, 58, 0.05);
    box-shadow: 0 6px 12px rgba(196, 30, 58, 0.15);
  }
`;

// --- SECTION 7: INPUT STATES ---
const StateSelect = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const StateButton = styled.button<{ $active: boolean; $color: string }>`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid ${props => props.$active ? props.$color : "var(--border)"};
  background: ${props => props.$active ? `rgba(${props.$color === "var(--primary)" ? "var(--primary-rgb)" : props.$color === "var(--secondary)" ? "var(--secondary-rgb)" : "var(--accent-rgb)"}, 0.08)` : "var(--surface)"};
  color: ${props => props.$active ? props.$color : "var(--text-secondary)"};
  font-weight: 600;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
`;

interface InputBoxProps {
  $state: "normal" | "focus" | "correct" | "incorrect";
}

const InputBox = styled.input<InputBoxProps>`
  width: 100%;
  max-width: 400px;
  padding: 0.85rem 1.25rem;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.25s ease;
  outline: none;

  ${props => props.$state === "normal" && `
    background: var(--background);
    border: 2px solid var(--border);
    color: var(--foreground);
  `}

  ${props => props.$state === "focus" && `
    background: var(--surface);
    border: 2px solid var(--primary);
    color: var(--foreground);
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
  `}

  ${props => props.$state === "correct" && `
    background: rgba(16, 185, 129, 0.04);
    border: 2px solid var(--secondary);
    color: var(--foreground);
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
  `}

  ${props => props.$state === "incorrect" && `
    background: rgba(244, 63, 94, 0.04);
    border: 2px solid var(--accent);
    color: var(--foreground);
    box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.15);
  `}
`;

// --- SECTION 8: MOBILE LAYOUT CONCEPT (NOREN DOCK & RADIAL MENU) ---
const VisualSandbox = styled.div`
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 20px;
  height: 350px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.05);

  .explanation-text {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 4rem;
    text-align: center;
    padding: 0 1rem;
  }
`;

const NorenDockSimulated = styled.div`
  position: absolute;
  bottom: 12px;
  width: calc(100% - 24px);
  max-width: 380px;
  background: rgba(var(--surface-rgb), 0.92);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 99px;
  padding: 0.6rem 1rem;
  display: flex;
  justify-content: space-around;
  box-shadow: var(--shadow-lg);

  .noren-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text-secondary);
    cursor: pointer;

    &.active {
      color: var(--primary);
    }
  }

  .noren-badge {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Noto Sans JP", sans-serif;
    font-size: 0.75rem;
    font-weight: bold;
    background: var(--surface);
  }

  .noren-item.active .noren-badge {
    border-color: var(--primary);
    color: var(--primary);
    background: rgba(var(--primary-rgb), 0.05);
  }
`;

const HankoRadialContainer = styled.div`
  position: absolute;
  bottom: 80px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HankoMenuButton = styled.button<{ $isOpen: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid var(--torii-red, #c41e3a);
  background: var(--surface);
  color: var(--torii-red, #c41e3a);
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 900;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  transform: ${props => props.$isOpen ? "rotate(45deg) scale(1.05)" : "rotate(0) scale(1)"};
`;

const RadialItem = styled(motion.div)`
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: bold;
  font-family: "Noto Sans JP", sans-serif;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  z-index: 90;

  &:hover {
    background: rgba(var(--primary-rgb), 0.05);
    border-color: var(--primary);
  }
`;

// Helper component for Toast Notification
const Toast = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: #f8fafc;
  padding: 0.75rem 1.5rem;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 1000;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255,255,255,0.08);
`;

export default function DesignSystemPage() {
  // Color Card Copy-to-clipboard handler
  const [toastMessage, setToastMessage] = useState("");
  
  const handleCopyColor = (hex: string, name: string) => {
    navigator.clipboard.writeText(hex);
    setToastMessage(`Warna ${name} (${hex}) disalin ke clipboard!`);
    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  // Interactive Flip Card states
  const [isFlipped, setIsFlipped] = useState(false);

  // Interactive Progress bar states
  const [progressVal, setProgressVal] = useState(65);

  // Input states simulator
  const [inputState, setInputState] = useState<"normal" | "focus" | "correct" | "incorrect">("normal");
  const [inputValue, setInputValue] = useState("");

  // Mobile menu radial popup
  const [isRadialOpen, setIsRadialOpen] = useState(false);

  const colorsList = [
    { name: "Primary (Indigo)", hex: "#4F46E5", role: "Tombol utama, brand identitas, border aktif" },
    { name: "Primary Light", hex: "#818CF8", role: "Gradien tombol, hover state, kategori tag" },
    { name: "Primary Dark", hex: "#3730A3", role: "Sisi gelap gradien tombol utama" },
    { name: "Secondary (Emerald)", hex: "#10B981", role: "Jawaban benar kuis, lencana streak harian" },
    { name: "Accent (Rose)", hex: "#F43F5E", role: "Jawaban salah kuis, status kesalahan" },
    { name: "Zen Gold (Emas)", hex: "#B8860B", role: "Lencana prestasi, bintang pencapaian" },
    { name: "Torii Red (Merah)", hex: "#C41E3A", role: "Stempel Hanko, aksen kultural ikon" },
    { name: "Dark Background", hex: "#0F172A", role: "Latar dasar halaman mode gelap" },
    { name: "Dark Surface", hex: "#1E293B", role: "Latar kartu, popover, form kuis" },
    { name: "Dark Border", hex: "#334155", role: "Garis batas border mode gelap" },
  ];

  return (
    <PageWrapper>
      <ContentWrapper>
        <div style={{ marginBottom: "2rem" }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Design System" />
        </div>

        <Container>
          <PageHeader>
            <h1>Design System & <span>UI Component Specs</span></h1>
            <p>
              Auditor UI/UX & Blueprint spesifikasi elemen visual untuk proyek web belajar bahasa Jepang "JapanApp".
            </p>
          </PageHeader>

          {/* SECTION 1: BRAND IDENTITY & VISUAL CORE */}
          <Section>
            <SectionHeader>
              <h2>1. Brand Identity & Visual Core</h2>
            </SectionHeader>
            
            <SubsectionTitle>Palet Warna (Klik warna untuk menyalin HEX)</SubsectionTitle>
            <ColorGrid>
              {colorsList.map((col) => (
                <ColorCard key={col.hex} $color={col.hex}>
                  <div className="preview">
                    <button 
                      className="copy-btn" 
                      onClick={() => handleCopyColor(col.hex, col.name)}
                    >
                      Salin HEX
                    </button>
                  </div>
                  <div className="details">
                    <span className="name">{col.name}</span>
                    <span className="hex">{col.hex}</span>
                    <span className="role">{col.role}</span>
                  </div>
                </ColorCard>
              ))}
            </ColorGrid>

            <SubsectionTitle>Skala Tipografi & Font Alternatif Canva</SubsectionTitle>
            <TypographyBox>
              <TypoSample>
                <span className="label">Hero Title (H1) • 4.5rem (Bold 900) • Canva: Inter Extra Bold</span>
                <h1 style={{ fontSize: "clamp(2rem, 4vw, 4.5rem)", fontWeight: 900, margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                  Say Konnichiwa!
                </h1>
              </TypoSample>

              <TypoSample>
                <span className="label">Section Header (H2) • 2.5rem (Bold 700) • Canva: Inter Bold</span>
                <h2 style={{ fontSize: "2.5rem", fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
                  Materi Kanji Hiragana
                </h2>
              </TypoSample>

              <TypoSample>
                <span className="label">Card Header (H3) • 1.5rem (Bold 700) • Canva: Inter Bold</span>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
                  Kuis Harian Hari Ini
                </h3>
              </TypoSample>

              <TypoSample>
                <span className="label">Body Text • 1.15rem (Regular 400) • Canva: Noto Sans Japanese</span>
                <p style={{ fontSize: "1.15rem", margin: 0, lineHeight: 1.7 }}>
                  JapanApp adalah platform belajar bahasa Jepang interaktif. 日本語のテキストが読みやすいようにNoto Sans JPを使用します。
                </p>
              </TypoSample>

              <TypoSample>
                <span className="label">Micro-copy (Monospace) • 0.72rem (Medium 500) • Canva: Roboto Mono</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 500, fontFamily: "monospace", letterSpacing: "0.05em" }}>
                  LAST REVIEW: 2026-06-16T12:00:00Z • EXP: +15
                </span>
              </TypoSample>
            </TypographyBox>
          </Section>

          {/* SECTION 2: UI COMPONENTS */}
          <Section>
            <SectionHeader>
              <h2>2. Detailed UI Component Specs (PC vs Mobile)</h2>
            </SectionHeader>

            <SubsectionTitle>
              A. Flashcard & Card Materi Learning 
              <SpecBadge>Radius: 20px / 16px</SpecBadge>
            </SubsectionTitle>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              Klik flashcard untuk membalik (flip) kartu, dan klik kartu taktil untuk menguji animasi ketukan membal seluler.
            </p>
            <CardShowcaseGrid>
              {/* 3D Flip Flashcard */}
              <FlipCardWrapper onClick={() => setIsFlipped(!isFlipped)}>
                <FlipCardInner
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  $isFlipped={isFlipped}
                >
                  <CardFace>
                    <span className="label">Flashcard (Depan)</span>
                    <span className="kanji">日</span>
                  </CardFace>
                  <CardFace $back>
                    <span className="label">Jawaban (Belakang)</span>
                    <span className="meaning">Matahari / Hari</span>
                    <span className="reading">Onyomi: ニチ (nichi)</span>
                  </CardFace>
                </FlipCardInner>
              </FlipCardWrapper>

              {/* Taktil Push Bounce Card */}
              <TaktilCard
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="tag">Tata Bahasa</span>
                <h4>Partikel は (Wa)</h4>
                <p>
                  Digunakan untuk menandai topik utama pembicaraan dalam suatu kalimat bahasa Jepang.
                </p>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "auto" }}>
                  (Ketuk kartu ini untuk efek taktil)
                </span>
              </TaktilCard>
            </CardShowcaseGrid>

            <SubsectionTitle>
              B. Tabel Data & Sistem Grid (Kanji Table)
              <SpecBadge>Breakpoint: 768px</SpecBadge>
            </SubsectionTitle>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1rem" }}>
              Ubah ukuran peramban Anda menjadi lebih sempit (&lt; 768px) untuk melihat tabel ini runtuh secara responsif menjadi barisan kartu seluler yang terstruktur.
            </p>
            <TableWrapper>
              <Table>
                <Thead>
                  <tr>
                    <Th style={{ width: "20%" }}>Kanji</Th>
                    <Th style={{ width: "45%" }}>Cara Baca (Onyomi-Kunyomi)</Th>
                    <Th style={{ width: "35%" }}>Arti</Th>
                  </tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td data-label="Kanji">
                      <span className="kanji-char">日</span>
                    </Td>
                    <Td data-label="Cara Baca">ニチ, ジツ (nichi) • ひ, -び (hi)</Td>
                    <Td data-label="Arti">Matahari, Hari</Td>
                  </Tr>
                  <Tr>
                    <Td data-label="Kanji">
                      <span className="kanji-char">本</span>
                    </Td>
                    <Td data-label="Cara Baca">ホン (hon) • もと (moto)</Td>
                    <Td data-label="Arti">Buku, Asal / Sumber</Td>
                  </Tr>
                  <Tr>
                    <Td data-label="Kanji">
                      <span className="kanji-char">語</span>
                    </Td>
                    <Td data-label="Cara Baca">ゴ (go) • かた-る (kata-ru)</Td>
                    <Td data-label="Arti">Bahasa, Bercerita</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableWrapper>

            <SubsectionTitle>
              C. Progress Bar & Gamification Badges
              <SpecBadge>Hexagon Badges</SpecBadge>
            </SubsectionTitle>
            <SliderWrapper>
              <label htmlFor="p-slider">Sesuaikan Progress ({progressVal}%):</label>
              <input 
                id="p-slider"
                type="range" 
                min="0" 
                max="100" 
                value={progressVal}
                onChange={(e) => setProgressVal(Number(e.target.value))}
              />
            </SliderWrapper>

            <ProgressBarBase style={{ marginBottom: "2.5rem" }}>
              <ProgressBarFill $width={progressVal} />
            </ProgressBarBase>

            <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--foreground)" }}>
              Showcase Lencana Heksagonal (Anti-Duolingo Clip-Path):
            </div>
            <BadgeGrid>
              <HexBadgeContainer>
                <span className="icon">🔥</span>
                <span className="title">Streak 7</span>
              </HexBadgeContainer>
              <HexBadgeContainer $gold>
                <span className="icon">🏆</span>
                <span className="title">JLPT N5</span>
              </HexBadgeContainer>
              <HexBadgeContainer>
                <span className="icon">✍️</span>
                <span className="title">Kanji Master</span>
              </HexBadgeContainer>
            </BadgeGrid>

            <SubsectionTitle>
              D. Tombol Navigasi & Action Buttons
              <SpecBadge>Hanko Button</SpecBadge>
            </SubsectionTitle>
            <ButtonGroup>
              <ButtonPrimary>Lanjut Belajar (Primary)</ButtonPrimary>
              <ButtonSecondary>Lulus Kuis (Secondary)</ButtonSecondary>
              <ButtonOutline>Lihat Detail (Outline)</ButtonOutline>
              
              {/* Hanko stamp button */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
                <ButtonHanko>習</ButtonHanko>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--torii-red, #c41e3a)" }}>
                  HANKO STAMP (HP)
                </span>
              </div>
            </ButtonGroup>

            <SubsectionTitle>
              E. Kolom Input & Form Kuis
              <SpecBadge>Interactive States</SpecBadge>
            </SubsectionTitle>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1rem" }}>
              Klik tombol state di bawah ini untuk mensimulasikan perubahan status input jawaban kuis secara langsung:
            </p>
            <StateSelect>
              <StateButton 
                $active={inputState === "normal"} 
                $color="var(--text-secondary)"
                onClick={() => {
                  setInputState("normal");
                  setInputValue("");
                }}
              >
                Normal
              </StateButton>
              <StateButton 
                $active={inputState === "focus"} 
                $color="var(--primary)"
                onClick={() => {
                  setInputState("focus");
                  setInputValue("");
                }}
              >
                Focus (Aktif)
              </StateButton>
              <StateButton 
                $active={inputState === "correct"} 
                $color="var(--secondary)"
                onClick={() => {
                  setInputState("correct");
                  setInputValue("にほんご");
                }}
              >
                Correct (Benar)
              </StateButton>
              <StateButton 
                $active={inputState === "incorrect"} 
                $color="var(--accent)"
                onClick={() => {
                  setInputState("incorrect");
                  setInputValue("nihongo");
                }}
              >
                Incorrect (Salah)
              </StateButton>
            </StateSelect>

            <InputBox
              $state={inputState}
              placeholder="Ketik jawaban Hiragana (misal: にほん)..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              readOnly={inputState === "correct" || inputState === "incorrect"}
            />
          </Section>

          {/* SECTION 3: MOBILE-EXCLUSIVE IDENTITY */}
          <Section style={{ marginBottom: 0 }}>
            <SectionHeader>
              <h2>3. Mobile-Exclusive Identity Sandbox</h2>
            </SectionHeader>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              Simulasi navigasi seluler dengan tirai gantung <strong>Noren</strong> dan menu kipas <strong>Hanko</strong> (klik Hanko merah bulat untuk menembakkan sub-menu).
            </p>

            <VisualSandbox>
              <div className="explanation-text">
                <strong>Simulasi Layar Ponsel JapanApp</strong><br />
                (Melayang bebas, estetik, kental bernuansa kertas & kayu Zen)
              </div>

              {/* Floating Noren Bottom Dock Menu */}
              <NorenDockSimulated>
                <div className="noren-item active">
                  <div className="noren-badge">家</div>
                  Home
                </div>
                <div className="noren-item">
                  <div className="noren-badge">学</div>
                  Study
                </div>
                <div className="noren-item">
                  <div className="noren-badge">誌</div>
                  Blog
                </div>
                <div className="noren-item">
                  <div className="noren-badge">助</div>
                  Bantuan
                </div>
              </NorenDockSimulated>

              {/* Hanko Radial Action Menu */}
              <HankoRadialContainer>
                {/* Radial Pop Submenus */}
                <AnimatePresence>
                  {isRadialOpen && (
                    <>
                      {/* Sub-menu 1: Settings (設) */}
                      <RadialItem
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                        animate={{ x: -80, y: 0, opacity: 1, scale: 1 }}
                        exit={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                        title="Pengaturan"
                      >
                        設
                      </RadialItem>

                      {/* Sub-menu 2: Dictionary Jisho (辞) */}
                      <RadialItem
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                        animate={{ x: -58, y: -58, opacity: 1, scale: 1 }}
                        exit={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.35, type: "spring", stiffness: 300, damping: 20 }}
                        title="Kamus Jisho"
                      >
                        辞
                      </RadialItem>

                      {/* Sub-menu 3: Jisho Search (検) */}
                      <RadialItem
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                        animate={{ x: 0, y: -80, opacity: 1, scale: 1 }}
                        exit={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
                        title="Cari Jisho"
                      >
                        検
                      </RadialItem>
                    </>
                  )}
                </AnimatePresence>

                {/* Hanko Main Menu Button */}
                <HankoMenuButton
                  $isOpen={isRadialOpen}
                  onClick={() => setIsRadialOpen(!isRadialOpen)}
                  title="Buka Hanko Radial Menu"
                >
                  {isRadialOpen ? "×" : "判"}
                </HankoMenuButton>
              </HankoRadialContainer>
            </VisualSandbox>
          </Section>
        </Container>
      </ContentWrapper>

      {/* Copy notification overlay */}
      <AnimatePresence>
        {toastMessage && (
          <Toast
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            transition={{ duration: 0.2 }}
          >
            {toastMessage}
          </Toast>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

// Additional container for margins and paddings
const ContentWrapper = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  width: 100%;
`;
