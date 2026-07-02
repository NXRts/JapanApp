"use client";

import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useProgress } from "@/context/ProgressContext";

// ─── Quotes & Tips Data ──────────────────────────────────────────────────────
interface TipItem {
  quote: string;
  authorOrTranslation: string;
}

const JAPANESE_TIPS: TipItem[] = [
  {
    quote: "七転び八起き (Nana korobi ya oki)",
    authorOrTranslation: "Jatuh tujuh kali, bangkit delapan kali. Pantang menyerah!",
  },
  {
    quote: "継続は力なり (Keizoku wa chikara nari)",
    authorOrTranslation: "Keberlanjutan adalah kekuatan. Konsistensi harian membawa hasil besar.",
  },
  {
    quote: "Did you know?",
    authorOrTranslation: "Katakana sebagian besar digunakan untuk kata serapan asing dan onomatopoia.",
  },
  {
    quote: "Did you know?",
    authorOrTranslation: "Hiragana memiliki 46 karakter dasar yang melambangkan setiap suku kata bahasa Jepang.",
  },
  {
    quote: "猿も木から落ちる (Saru mo ki kara ochiru)",
    authorOrTranslation: "Bahkan monyet pun bisa jatuh dari pohon. Semua orang pasti pernah salah.",
  },
  {
    quote: "Tip Belajar",
    authorOrTranslation: "Belajar 10 menit setiap hari jauh lebih efektif daripada 2 jam sekali seminggu.",
  },
  {
    quote: "千里の道も一歩から (Senri no michi mo ippo kara)",
    authorOrTranslation: "Perjalanan seribu mil dimulai dengan satu langkah pertama.",
  },
  {
    quote: "Tip Kanji",
    authorOrTranslation: "Kanji memuat arti (makna) sedangkan Kana melambangkan pelafalan (bunyi).",
  }
];

// ─── Keyframes ────────────────────────────────────────────────────────────────
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(184, 134, 11, 0.4)); }
  50% { transform: scale(1.05); filter: drop-shadow(0 0 25px rgba(184, 134, 11, 0.6)); }
`;

// ─── Styled Components ────────────────────────────────────────────────────────
const Overlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0B1121; /* Solid dark background matching default theme */
  padding: 2rem;
  transition: opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1);

  ${({ $isClosing }) =>
    $isClosing &&
    css`
      opacity: 0;
      pointer-events: none;
    `}
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  width: 100%;
  text-align: center;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const FlagIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  animation: ${pulse} 3s ease-in-out infinite;
  user-select: none;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  margin: 0;
  background: linear-gradient(
    135deg,
    #ffd700 0%,
    var(--zen-gold, #b8860b) 50%,
    #ffd700 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 3s linear infinite;
`;

const ProgressBarWrapper = styled.div`
  width: 180px;
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 2.5rem;
  position: relative;
`;

const progressAnim = keyframes`
  0% { left: -100%; width: 50%; }
  50% { left: 20%; width: 60%; }
  100% { left: 100%; width: 30%; }
`;

const ProgressBarActive = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    var(--primary, #4f46e5) 0%,
    var(--primary-light, #818cf8) 100%
  );
  border-radius: 999px;
  animation: ${progressAnim} 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
`;

const QuoteContainer = styled.div`
  min-height: 80px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const JapaneseText = styled.h2`
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--foreground, #f8fafc);
  margin: 0;
  line-height: 1.5;
`;

const TranslationText = styled.p`
  font-size: 0.85rem;
  color: var(--text-secondary, #94a3b8);
  margin: 0;
  line-height: 1.6;
  max-width: 380px;
`;

// ─── Component ────────────────────────────────────────────────────────────────
export function SplashLoader() {
  const { isLoaded } = useProgress();
  const [shouldRender, setShouldRender] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [randomTip, setRandomTip] = useState<TipItem>(JAPANESE_TIPS[0]);
  const [minDurationElapsed, setMinDurationElapsed] = useState(false);

  // Pick a random tip once on component load to override the default
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * JAPANESE_TIPS.length);
    setRandomTip(JAPANESE_TIPS[randomIndex]);

    // Enforce 3 seconds minimum display duration
    const timer = setTimeout(() => {
      setMinDurationElapsed(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handle closing sequence when BOTH app is loaded and minimum duration has elapsed
  useEffect(() => {
    if (isLoaded && minDurationElapsed) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // matches the 0.5s transition opacity
      return () => clearTimeout(timer);
    }
  }, [isLoaded, minDurationElapsed]);

  if (!shouldRender) return null;

  return (
    <Overlay $isClosing={isClosing} role="status" aria-busy="true">
      <ContentWrapper>
        <LogoContainer>
          <FlagIcon aria-hidden="true">🇯🇵</FlagIcon>
          <Title>JapanApp</Title>
        </LogoContainer>

        <ProgressBarWrapper>
          <ProgressBarActive />
        </ProgressBarWrapper>

        <QuoteContainer>
          <JapaneseText>{randomTip.quote}</JapaneseText>
          <TranslationText>{randomTip.authorOrTranslation}</TranslationText>
        </QuoteContainer>
      </ContentWrapper>
    </Overlay>
  );
}
