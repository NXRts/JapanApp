"use client";

import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useProgress } from "@/context/ProgressContext";
import { themes, ThemeColor } from "@/context/ThemeContext";

// ─── Quotes & Tips Data ──────────────────────────────────────────────────────
export interface TipItem {
  quote: string;
  authorOrTranslation: string;
}

export const JAPANESE_TIPS: TipItem[] = [
  {
    quote: "七転び八起き (Nana korobi ya oki)",
    authorOrTranslation:
      "Jatuh tujuh kali, bangkit delapan kali. Pantang menyerah!",
  },
  {
    quote: "継続は力なり (Keizoku wa chikara nari)",
    authorOrTranslation:
      "Keberlanjutan adalah kekuatan. Konsistensi harian membawa hasil besar.",
  },
  {
    quote: "Did you know?",
    authorOrTranslation:
      "Katakana sebagian besar digunakan untuk kata serapan asing dan onomatopoia.",
  },
  {
    quote: "Did you know?",
    authorOrTranslation:
      "Hiragana memiliki 46 karakter dasar yang melambangkan setiap suku kata bahasa Jepang.",
  },
  {
    quote: "猿も木から落ちる (Saru mo ki kara ochiru)",
    authorOrTranslation:
      "Bahkan monyet pun bisa jatuh dari pohon. Semua orang pasti pernah salah.",
  },
  {
    quote: "Tip Belajar",
    authorOrTranslation:
      "Belajar 10 menit setiap hari jauh lebih efektif daripada 2 jam sekali seminggu.",
  },
  {
    quote: "千里の道も一歩から (Senri no michi mo ippo kara)",
    authorOrTranslation:
      "Perjalanan seribu mil dimulai dengan satu langkah pertama.",
  },
  {
    quote: "Tip Kanji",
    authorOrTranslation:
      "Kanji memuat arti (makna) sedangkan Kana melambangkan pelafalan (bunyi).",
  },
  {
    quote: "一期一会 (Ichigo ichie)",
    authorOrTranslation:
      "Satu pertemuan, satu kesempatan sekali seumur hidup. Hargai setiap momen belajar!",
  },
  {
    quote: "石の上にも三年 (Ishi no ue ni mo san nen)",
    authorOrTranslation:
      "Duduk di atas batu selama tiga tahun. Ketekunan akan membuahkan hasil pada akhirnya.",
  },
  {
    quote: "Did you know?",
    authorOrTranslation:
      "Katakana juga digunakan untuk menulis nama orang asing atau nama negara selain Jepang.",
  },
  {
    quote: "Did you know?",
    authorOrTranslation:
      "Kanji bahasa Jepang memiliki dua cara baca: Onyomi (cara baca Cina) dan Kunyomi (cara baca Jepang).",
  },
  {
    quote: "Did you know?",
    authorOrTranslation:
      "JLPT (Japanese-Language Proficiency Test) memiliki 5 tingkatan, mulai dari N5 (terendah) hingga N1 (tertinggi).",
  },
  {
    quote: "Tip Belajar",
    authorOrTranslation:
      "Partikel 'wa' (は) ditulis dengan huruf 'ha', tetapi dibaca 'wa' saat berfungsi sebagai partikel penunjuk topik.",
  },
  {
    quote: "Tip Belajar",
    authorOrTranslation:
      "Gunakan teknik SRS (Spaced Repetition System) yang ada di aplikasi ini untuk mengingat kosakata lebih lama!",
  },
  {
    quote: "聞くは一時の恥、聞かぬは一生の恥",
    authorOrTranslation:
      "Bertanya adalah rasa malu sesaat, tidak bertanya adalah rasa malu seumur hidup. Jangan ragu bertanya!",
  },
  {
    quote: "習うより慣れよ (Narau yori nareyo)",
    authorOrTranslation:
      "Lebih baik membiasakan diri daripada hanya sekadar menghafal. Praktikkan!",
  },
  {
    quote: "Did you know?",
    authorOrTranslation:
      "Tanda baca dalam bahasa Jepang menggunakan lingkaran kecil (。) sebagai titik dan koma miring (、).",
  },
  {
    quote: "Did you know?",
    authorOrTranslation:
      "Bahasa Jepang tidak memiliki gender kata benda (seperti Perancis/Jerman) dan tidak memiliki bentuk jamak khusus.",
  },
  {
    quote: "Tip Belajar",
    authorOrTranslation:
      "Coba ubah bahasa di ponsel Anda ke Bahasa Jepang untuk mempercepat pembiasaan sehari-hari!",
  },
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

const toriiPulse = keyframes`
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 20px rgba(196, 30, 58, 0.5)); }
  50% { transform: scale(1.04); filter: drop-shadow(0 0 35px rgba(196, 30, 58, 0.8)); }
`;

const sakuraFall = keyframes`
  0% {
    transform: translateY(-10vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.9;
  }
  90% {
    opacity: 0.9;
  }
  100% {
    transform: translateY(110vh) translateX(40px) rotate(360deg);
    opacity: 0;
  }
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
  background: var(--background);
  padding: 2rem;
  transition: opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  overflow: hidden !important;
  overflow-x: hidden !important;
  overflow-y: hidden !important;
  clip-path: inset(0);
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  touch-action: none;

  ${({ $isClosing }) =>
    $isClosing &&
    css`
      opacity: 0;
      pointer-events: none;
    `}

  /* CSS-based loading variant visibility (Anti-flash) */
  html.session-refresh & .first-open-only {
    display: none !important;
  }

  html.session-first-open & .refresh-only {
    display: none !important;
  }

  /* Fallback: default to showing first-open if script hasn't run or is blocked */
  html:not(.session-refresh):not(.session-first-open) & .refresh-only {
    display: none !important;
  }
`;

// Falling Sakura Petals for First Open
const SakuraContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden !important;
  clip-path: inset(0);
  max-width: 100vw;
  max-height: 100vh;
  z-index: 1;
`;

const Petal = styled.div<{
  $delay: number;
  $left: number;
  $scale: number;
  $duration: number;
}>`
  position: absolute;
  top: -10%;
  left: ${({ $left }) => `${$left}%`};
  width: 14px;
  height: 20px;
  background: linear-gradient(135deg, #ffb7c5, #ffa3b1);
  border-radius: 50% 0 50% 50%;
  transform-origin: center;
  opacity: 0;
  animation: ${sakuraFall} ${({ $duration }) => `${$duration}s`} linear infinite;
  animation-delay: ${({ $delay }) => `${$delay}s`};
  transform: scale(${({ $scale }) => $scale});
  filter: drop-shadow(0 2px 4px rgba(255, 183, 197, 0.3));
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  width: 100%;
  text-align: center;
  z-index: 2; /* Sits above Sakura background */
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

const ToriiIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: ${toriiPulse} 4s ease-in-out infinite;
  user-select: none;
  color: var(--torii-red, #c41e3a);
`;

const WelcomeText = styled.h2`
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--primary);
  margin-top: 0.75rem;
  letter-spacing: 0.15em;
  font-family: "Noto Sans JP", sans-serif;
  text-shadow: 0 0 12px rgba(var(--primary-rgb), 0.3);
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  margin: 0;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-light) 50%,
    var(--primary) 100%
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
  background: var(--border);
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
  background: var(--primary);
  border-radius: 999px;
  animation: ${progressAnim} 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
`;

const QuoteContainer = styled.div`
  min-height: 80px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: ${fadeIn} 0.5s ease-out;
  align-items: center;
`;

const JapaneseText = styled.h2`
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--foreground);
  margin: 0;
  line-height: 1.5;
`;

const TranslationText = styled.p`
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
  max-width: 380px;
`;

// ─── Component ────────────────────────────────────────────────────────────────
// Pre-generated static values to avoid hydration mismatch on Sakura Petals
const STATIC_PETALS = [
  { delay: 0.2, left: 10, scale: 0.8, duration: 6.2 },
  { delay: 1.5, left: 25, scale: 1.1, duration: 5.5 },
  { delay: 0.7, left: 45, scale: 0.6, duration: 7.1 },
  { delay: 2.3, left: 60, scale: 0.9, duration: 6.8 },
  { delay: 1.1, left: 75, scale: 1.2, duration: 5.2 },
  { delay: 3.0, left: 90, scale: 0.7, duration: 7.5 },
  { delay: 0.9, left: 20, scale: 0.9, duration: 6.4 },
  { delay: 2.5, left: 55, scale: 0.8, duration: 6.9 },
  { delay: 1.8, left: 80, scale: 1.0, duration: 5.8 },
];

export function SplashLoader() {
  const { isLoaded } = useProgress();
  const [shouldRender, setShouldRender] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [randomTip, setRandomTip] = useState<TipItem>(JAPANESE_TIPS[0]);
  const [minDurationElapsed, setMinDurationElapsed] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  // Determine visitor status and enforce correct delay duration
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * JAPANESE_TIPS.length);
    setRandomTip(JAPANESE_TIPS[randomIndex]);

    let isRefresh = false;
    try {
      isRefresh = !!sessionStorage.getItem("has-loaded-before");
      setIsInteractive(isRefresh);
    } catch {}

    const duration = isRefresh ? 3000 : 3500;
    const timer = setTimeout(() => {
      setMinDurationElapsed(true);
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scrolling when the loading screen is active
  useEffect(() => {
    if (shouldRender) {
      document.body.style.overflow = "hidden";
      document.body.style.overflowX = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overflowX = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.overflowX = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.overflowX = "";
    };
  }, [shouldRender]);

  // Close overlay when app loads and min duration completes
  useEffect(() => {
    if (isLoaded && minDurationElapsed) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, minDurationElapsed]);

  // Click handler to change tips (only active on refresh screen)
  const changeTip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInteractive) return;

    const remainingTips = JAPANESE_TIPS.filter(
      (t) =>
        t.quote !== randomTip.quote ||
        t.authorOrTranslation !== randomTip.authorOrTranslation,
    );
    if (remainingTips.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingTips.length);
      setRandomTip(remainingTips[randomIndex]);
    }
  };

  if (!shouldRender) return null;

  return (
    <Overlay
      $isClosing={isClosing}
      role="status"
      aria-busy="true"
      onClick={changeTip}
      className={isInteractive ? "session-refresh" : "session-first-open"}
      style={{ cursor: isInteractive ? "pointer" : "default" }}
      title={isInteractive ? "Klik untuk mengganti tips" : undefined}
    >
      {/* Falling Sakura Petals for First-Time Welcoming Screen */}
      <SakuraContainer className="first-open-only">
        {STATIC_PETALS.map((petal, index) => (
          <Petal
            key={index}
            $delay={petal.delay}
            $left={petal.left}
            $scale={petal.scale}
            $duration={petal.duration}
          />
        ))}
      </SakuraContainer>

      <ContentWrapper>
        {/* ⛩️ FIRST OPEN LAYOUT (Traditional Zen Aesthetics) */}
        <div
          className="first-open-only"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LogoContainer style={{ marginBottom: "2rem" }}>
            <ToriiIcon aria-hidden="true">⛩️</ToriiIcon>
            <Title>JapanApp</Title>
            <WelcomeText>ようこそ</WelcomeText>
          </LogoContainer>

          <ProgressBarWrapper style={{ marginBottom: "2.5rem" }}>
            <ProgressBarActive />
          </ProgressBarWrapper>

          <QuoteContainer>
            <JapaneseText>Mempersiapkan kuil pembelajaran Anda...</JapaneseText>
            <TranslationText style={{ opacity: 0.8 }}>
              Belajar hiragana, katakana, dan kanji secara interaktif.
            </TranslationText>
          </QuoteContainer>
        </div>

        {/* 🇯🇵 REFRESH LAYOUT (Interactive Tips) */}
        <div
          className="refresh-only"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
        </div>
      </ContentWrapper>
    </Overlay>
  );
}
