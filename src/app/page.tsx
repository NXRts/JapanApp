"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import dynamic from "next/dynamic";
import { useProgress } from "@/context/ProgressContext";
import { useDeviceMode } from "@/context/DeviceModeContext";
import { useTheme } from "@/context/ThemeContext";
import { RoadmapNodeDrawer } from "@/components/home/RoadmapNodeDrawer";
import { lessonsData, Lesson } from "@/data/lessonsData";
import React from "react";

import { ToriiPhaseHeader } from "@/components/mobile/ToriiPhaseHeader";
import { HankoSkillCard } from "@/components/mobile/HankoSkillCard";
import { InkProgressBar } from "@/components/mobile/InkProgressBar";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

const HorizontalScrollList = styled.div`
  display: flex;
  gap: 0.85rem;
  overflow-x: auto;
  padding: 0.65rem 0.25rem 1.5rem;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  -webkit-overflow-scrolling: touch;
  width: 100%;

  @media (max-width: 480px) {
    gap: 0.6rem;
    padding: 0.5rem 0.15rem 1.25rem;
  }

  /* Show styled scrollbar on desktop/non-touch devices */
  @media (pointer: fine) {
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;

    &::-webkit-scrollbar {
      display: block;
      height: 6px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: 99px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: var(--primary-light);
    }
  }
`;

interface DraggableScrollListProps {
  children: React.ReactNode;
}

function DraggableScrollList({ children }: DraggableScrollListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only drag with left click
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (Math.abs(x - startX) > 5) {
      setHasMoved(true);
    }
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasMoved) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <HorizontalScrollList
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClickCapture={handleClickCapture}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {children}
    </HorizontalScrollList>
  );
}

// Immediate imports for above-the-fold content
import { HeroSection } from "@/components/home/HeroSection";
import { GamesSection } from "@/components/home/GamesSection";

// Dynamic imports for below-the-fold components to improve initial load
const BenefitsSection = dynamic(
  () =>
    import("@/components/home/BenefitsSection").then(
      (mod) => mod.BenefitsSection,
    ),
  { ssr: false },
);
const WhatsNewSection = dynamic(
  () =>
    import("@/components/home/WhatsNewSection").then(
      (mod) => mod.WhatsNewSection,
    ),
  { ssr: false },
);
const FeaturesSection = dynamic(
  () =>
    import("@/components/home/FeaturesSection").then(
      (mod) => mod.FeaturesSection,
    ),
  { ssr: false },
);
const StepsSection = dynamic(
  () =>
    import("@/components/home/StepsSection").then((mod) => mod.StepsSection),
  { ssr: false },
);
const TestimonialsSection = dynamic(
  () =>
    import("@/components/home/TestimonialsSection").then(
      (mod) => mod.TestimonialsSection,
    ),
  { ssr: false },
);
const FAQSection = dynamic(
  () => import("@/components/home/FAQSection").then((mod) => mod.FAQSection),
  { ssr: false },
);
const CTASection = dynamic(
  () => import("@/components/home/CTASection").then((mod) => mod.CTASection),
  { ssr: false },
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-bottom: 2rem;
`;

import { RightSidebar } from "@/components/home/RightSidebar";

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  max-width: 1140px;
  margin: 0 auto;
  padding: 1.5rem 1rem 5rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    gap: 0;
    padding: 0;
  }
`;

const MobileContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 1.25rem 0.85rem 1.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: auto;
  font-family: "Nunito", "Outfit", sans-serif;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 1rem 0.65rem 1.25rem;
  }
`;

// Level Selector Styles
const LevelSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1.75rem;
  padding: 6px 4px;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  @media (max-width: 480px) {
    gap: 0.35rem;
  }
`;

const LevelTabText = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`;

const LevelTab = styled.button<{
  $active: boolean;
  $activeColor: string;
  $activeBg: string;
}>`
  flex: 1;
  min-width: 80px;
  height: 44px;
  border-radius: 16px;
  border: 2px solid
    ${({ $active, $activeColor }) => ($active ? $activeColor : "var(--border)")};
  border-bottom: 4px solid
    ${({ $active, $activeColor }) =>
      $active ? $activeColor : "rgba(0, 0, 0, 0.12)"};
  background: ${({ $active, $activeBg }) => ($active ? $activeBg : "var(--surface)")};
  color: ${({ $active, $activeColor }) =>
    $active ? $activeColor : "var(--text-secondary)"};
  font-weight: 800;
  font-size: 0.88rem;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  outline: none;
  white-space: nowrap;
  box-shadow: ${({ $active }) =>
    $active ? "0 4px 12px rgba(0, 0, 0, 0.08)" : "none"};

  ${({ $active, $activeColor }) =>
    $active &&
    css`
      text-shadow: 0 0 8px ${$activeColor}30;
    `}

  @media (max-width: 480px) {
    min-width: 42px;
    height: 38px;
    border-radius: 12px;
    font-size: 0.78rem;
  }

  &:hover {
    ${({ $active, $activeColor }) =>
      !$active &&
      css`
        border-color: ${$activeColor};
        color: ${$activeColor};
      `}
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

// ========================================================
// PREMIUM SVG VECTOR ICONS FOR STATE REPRESENTATION (CUSTOM DESIGNS)
// ========================================================

function CheckIcon3D() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 6L9 17L4 12"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.15))" }}
      />
    </svg>
  );
}

function ActiveStarIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="url(#starGoldGrad)"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="starGoldGrad"
          x1="12"
          y1="2"
          x2="12"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ffe680" />
          <stop offset="0.4" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function LockIcon3D() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.2))" }}
    >
      <path
        d="M7 10V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V10"
        stroke="#94a3b8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="10"
        width="16"
        height="12"
        rx="3"
        fill="#64748b"
        stroke="#475569"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="15" r="2" fill="#1e293b" />
      <path
        d="M12 16V19"
        stroke="#1e293b"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ========================================================
// STYLED COMPONENTS & STYLING FOR GAMIFIED ROADMAP
// ========================================================

const UnitCard = styled.div<{ $color?: string }>`
  background: ${({ $color }) =>
    $color || "linear-gradient(135deg, #10b981 0%, #059669 100%)"};
  border-radius: 24px;
  padding: 1.25rem 1.5rem;
  color: white;
  margin-bottom: 2.25rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  position: relative;
  overflow: hidden;
  border-bottom: 6px solid rgba(0, 0, 0, 0.22);
`;

const UnitSection = styled.span`
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.85;
  display: block;
  margin-bottom: 0.15rem;
`;

const UnitTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 900;
  line-height: 1.3;
  margin-top: 0.15rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const UnitDesc = styled.p`
  font-size: 0.82rem;
  opacity: 0.9;
  margin-top: 0.35rem;
  line-height: 1.4;
`;

const RoadmapPath = styled.div`
  display: block;
  position: relative;
  width: 320px;
  margin: 0 auto 2.5rem;
`;

const PathLineSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));

  path {
    stroke-dasharray: none;
    animation: neonSplinePulse 3s infinite ease-in-out;
  }

  @keyframes neonSplinePulse {
    0%,
    100% {
      opacity: 0.85;
      stroke-width: 8px;
    }
    50% {
      opacity: 1;
      stroke-width: 10px;
    }
  }
`;

const NodeContainer = styled.div<{ $index: number }>`
  position: absolute;
  top: ${({ $index }) => $index * 135}px;
  height: 135px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const FloatingWrapper = styled.div<{ $active: boolean; $offset: number }>`
  transform: translateX(${({ $offset }) => $offset}px);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  ${({ $active }) =>
    $active &&
    css`
      animation: floatingActive 2.4s infinite ease-in-out;
    `}

  @keyframes floatingActive {
    0%,
    100% {
      transform: translateX(${({ $offset }) => $offset}px) translateY(0px);
    }
    50% {
      transform: translateX(${({ $offset }) => $offset}px) translateY(-5px);
    }
  }
`;

const ActiveTooltip = styled.div<{ $color: string }>`
  position: absolute;
  top: -38px;
  background: ${({ $color }) => $color};
  color: white;
  font-weight: 900;
  font-size: 0.72rem;
  padding: 4px 10px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  animation: floatTooltip 1.2s infinite ease-in-out;
  white-space: nowrap;
  z-index: 12;
  border: 1px solid rgba(255, 255, 255, 0.15);

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px 5px 0;
    border-style: solid;
    border-color: ${({ $color }) => $color} transparent;
  }

  @keyframes floatTooltip {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3px);
    }
  }
`;

const NodeButton = styled.button<{
  $unlocked: boolean;
  $active: boolean;
  $completed: boolean;
  $color: string;
}>`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $unlocked }) => ($unlocked ? "pointer" : "not-allowed")};
  position: relative;
  border: none;
  outline: none;
  transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 2;

  /* 3D Tactile Design */
  ${({ $unlocked, $active, $completed, $color }) => {
    if (!$unlocked) {
      return css`
        background: #334155;
        border-bottom: 6px solid #1e293b;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        opacity: 0.7;

        @media (prefers-color-scheme: light) {
          background: #cbd5e1;
          border-bottom: 6px solid #94a3b8;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
        }
      `;
    }

    if ($completed) {
      return css`
        background: #58cc02;
        border-bottom: 6px solid #389600;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      `;
    }

    if ($active) {
      return css`
        background: ${$color};
        border-bottom: 6px solid rgba(0, 0, 0, 0.3);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      `;
    }

    return css`
      background: ${$color}dd;
      border-bottom: 6px solid rgba(0, 0, 0, 0.25);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    `;
  }}

  &:hover {
    ${({ $unlocked }) =>
      $unlocked &&
      css`
        transform: scale(1.06) translateY(-2px);
        filter: brightness(1.08);
      `}
  }

  &:active {
    ${({ $unlocked }) =>
      $unlocked &&
      css`
        transform: scale(0.96) translateY(4px) !important;
        border-bottom-width: 2px !important;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
        transition: all 0.05s ease;
      `}
  }
`;

const DecorContainer = styled.div<{ $side: "left" | "right"; $y: number }>`
  position: absolute;
  top: ${({ $y }) => $y - 30}px;
  ${({ $side }) => ($side === "left" ? "left: 12px;" : "right: 12px;")}
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
  animation: floatDecor 3s infinite ease-in-out;
  cursor: pointer;

  @keyframes floatDecor {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-6px);
    }
  }
`;

const SpeechBubble = styled.div`
  position: absolute;
  top: -34px;
  background: var(--surface);
  border: 1.5px solid var(--border);
  color: var(--foreground);
  font-weight: 800;
  font-size: 0.68rem;
  padding: 3px 8px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  white-space: nowrap;
  z-index: 6;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px 5px 0;
    border-style: solid;
    border-color: var(--surface) transparent;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: -7px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 7px 7px 0;
    border-style: solid;
    border-color: var(--border) transparent;
    z-index: -1;
  }
`;

const RewardTag = styled.div`
  position: absolute;
  top: -20px;
  background: #fbbf24;
  color: #78350f;
  font-weight: 900;
  font-size: 0.62rem;
  padding: 1.5px 6px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(251, 191, 36, 0.25);
  text-transform: uppercase;
  border: 1.2px solid #d97706;
  white-space: nowrap;
  z-index: 6;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1.5rem;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 28px;
  width: 100%;
  max-width: 320px;
  padding: 1.75rem 1.5rem;
  text-align: center;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  border-bottom: 8px solid var(--border);
  animation: scaleIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes scaleIn {
    from {
      transform: scale(0.85);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 900;
  color: var(--foreground);
  margin-top: 0.75rem;
`;

const ModalText = styled.p`
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0.65rem 0 1.25rem;
  line-height: 1.45;
`;

const ModalButton = styled.button<{ $color?: string }>`
  background: ${({ $color }) => $color || "#10b981"};
  color: white;
  border: none;
  outline: none;
  font-weight: 800;
  font-size: 0.9rem;
  padding: 0.7rem 1.5rem;
  border-radius: 14px;
  cursor: pointer;
  border-bottom: 4px solid rgba(0, 0, 0, 0.2);
  transition: all 0.15s ease;
  width: 100%;

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

const StatBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
  box-shadow: var(--shadow-sm);
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 0.6rem 0.5rem;
    gap: 0.25rem;
  }
`;

const StatBannerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 800;
  font-size: 0.88rem;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 0.76rem;
    gap: 0.2rem;
  }
`;

const LockBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
`;

interface SelectedNodeData {
  title: string;
  description: string;
  expReward: number;
  href: string;
  icon: string;
  badge?: string;
  color?: string;
}

export default function Home() {
  const { progress, addExp } = useProgress();
  const { deviceMode, isMounted } = useDeviceMode();
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const [mounted, setMounted] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SelectedNodeData | null>(
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<
    "Basic" | "N5" | "N4" | "N3" | "N2" | "N1"
  >("Basic");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Automatically switch to the active level matching the user's current progress
  useEffect(() => {
    if (progress.completedExercises && progress.completedExercises.length > 0) {
      const activeLesson = lessonsData.find(
        (lesson) => !progress.completedExercises.includes(lesson.id),
      );
      if (activeLesson) {
        setSelectedLevel(activeLesson.level);
      }
    }
  }, [progress.completedExercises]);

  // Smoothly auto-scroll to the current active lesson node on mount or tab change (Lessons page specific)
  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      const activeNode = document.getElementById("active-lesson-node");
      if (activeNode) {
        activeNode.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [mounted, selectedLevel, progress.completedExercises]);

  // Level config with custom colors
  const levels = [
    { code: "Basic" as const, label: "Basic", color: "#f59e0b" }, // Amber
    { code: "N5" as const, label: "JLPT N5", color: "#10b981" }, // Emerald
    { code: "N4" as const, label: "JLPT N4", color: "#8b5cf6" }, // Violet
    { code: "N3" as const, label: "JLPT N3", color: "#ea580c" }, // Orange
    { code: "N2" as const, label: "JLPT N2", color: "#3b82f6" }, // Blue
    { code: "N1" as const, label: "JLPT N1", color: "#dc2626" }, // Red
  ];

  const activeLevelColor =
    levels.find((l) => l.code === selectedLevel)?.color || "#10b981";

  const getActiveBgColor = (levelCode: string) => {
    if (isDark) {
      return "#16223f"; // Solid dark navy to block background grid dots
    }
    switch (levelCode) {
      case "Basic":
        return "#FFFBEB"; // Solid light amber (Amber 50)
      case "N5":
        return "#ECFDF5"; // Solid light emerald (Emerald 50)
      case "N4":
        return "#F5F3FF"; // Solid light violet (Violet 50)
      case "N3":
        return "#FFF7ED"; // Solid light orange (Orange 50)
      case "N2":
        return "#EFF6FF"; // Solid light blue (Blue 50)
      case "N1":
        return "#FEF2F2"; // Solid light red (Red 50)
      default:
        return "#EEF2FF";
    }
  };

  // O(1) lesson relationship index lookup map to optimize lesson unlock status checks
  const lessonRelations = useMemo(() => {
    const map = new Map<string, string>();
    for (let i = 1; i < lessonsData.length; i++) {
      map.set(lessonsData[i].id, lessonsData[i - 1].id);
    }
    return map;
  }, []);

  // Group lessons from lessonsData by unitId for the active selectedLevel (memoized to avoid raw evaluations)
  const levelLessons = useMemo(() => {
    return lessonsData.filter((lesson) => lesson.level === selectedLevel);
  }, [selectedLevel]);

  const activeUnits = useMemo(() => {
    const unitsMap: Record<
      string,
      {
        id: string;
        title: string;
        description: string;
        color: string;
        lessons: typeof levelLessons;
      }
    > = {};

    levelLessons.forEach((lesson) => {
      if (!unitsMap[lesson.unitId]) {
        unitsMap[lesson.unitId] = {
          id: lesson.unitId,
          title: lesson.unitTitle,
          description: lesson.unitDescription,
          color: lesson.unitColor,
          lessons: [],
        };
      }
      unitsMap[lesson.unitId].lessons.push(lesson);
    });
    return Object.values(unitsMap);
  }, [levelLessons]);

  // Lesson lock logic: A lesson is unlocked if previous lesson is completed.
  // For N5 (and higher levels), ALL lessons in the previous level (Basic) must be completed first!
  const isLessonUnlocked = useCallback(
    (lessonId: string) => {
      const lesson = lessonsData.find((l) => l.id === lessonId);
      if (!lesson) return false;

      // Basic level lessons
      if (lesson.level === "Basic") {
        const basicLessons = lessonsData.filter((l) => l.level === "Basic");
        if (lesson.id === basicLessons[0]?.id) return true;
        const prevId = lessonRelations.get(lessonId);
        if (!prevId) return true;
        return progress.completedExercises?.includes(prevId) || false;
      }

      // N5, N4, N3, N2, N1 level lessons: Require previous level to be 100% completed FIRST!
      const levelOrder: ("Basic" | "N5" | "N4" | "N3" | "N2" | "N1")[] = [
        "Basic",
        "N5",
        "N4",
        "N3",
        "N2",
        "N1",
      ];
      const currentLevelIdx = levelOrder.indexOf(lesson.level);
      const prevLevelCode = levelOrder[currentLevelIdx - 1];

      if (prevLevelCode) {
        const prevLevelLessons = lessonsData.filter(
          (l) => l.level === prevLevelCode,
        );
        const isPrevLevelCompleted = prevLevelLessons.every((l) =>
          progress.completedExercises?.includes(l.id),
        );
        if (!isPrevLevelCompleted) {
          return false; // Whole level is locked because previous level is not completed!
        }
      }

      // If previous level is completed, check sequential unlock within current level
      const currentLevelLessons = lessonsData.filter(
        (l) => l.level === lesson.level,
      );
      if (lesson.id === currentLevelLessons[0]?.id) return true;

      const prevId = lessonRelations.get(lessonId);
      if (!prevId) return true;
      return progress.completedExercises?.includes(prevId) || false;
    },
    [lessonRelations, progress.completedExercises],
  );

  const today = new Date().toISOString().split("T")[0];
  const isDailyCompleted = progress.quizHistory.some(
    (q) => q.date.split("T")[0] === today && q.type === "daily-challenge",
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Japan Learning App",
    url: "https://japan-app.vercel.app",
    description:
      "The most effective way to learn, practice, and memorize Japanese characters (Hiragana, Katakana, and Kanji).",
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    author: {
      "@type": "Person",
      name: "NXRts",
    },
  };

  if (!mounted) {
    // Return null during pre-mount to avoid flashing the wrong device view.
    // DeviceModeContext now resolves the correct mode synchronously, so
    // this null state is only visible for a tiny SSR hydration window.
    return null;
  }

  // Serpentine offset pattern: Center, Right, Center, Left...
  const getOffset = (index: number) => {
    const pattern = [0, 50, 0, -50];
    return pattern[index % pattern.length];
  };

  // Helper to construct dynamic Duolingo unit section & labels
  const getSectionTitle = (unitId: string, unitTitle: string) => {
    const cleanTitle = unitTitle
      .replace(/Unit \d+:\s*/i, "")
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
      .trim();
    const match = unitId.match(/u(\d+)/i);
    const unitNum = match ? parseInt(match[1], 10) : 1;

    let sectionNum = 1;
    let sectionName = "Basic Interaction & Survival";

    if (selectedLevel === "N5") {
      if (unitNum > 8) {
        sectionNum = 3;
        sectionName = "Intermediate Communication & Culture";
      } else if (unitNum > 4) {
        sectionNum = 2;
        sectionName = "Daily Life in Japan";
      } else {
        sectionNum = 1;
        sectionName = "Basic Interaction & Survival";
      }
    } else {
      sectionNum = 4;
      sectionName = "Professional & Academic Life";
    }

    return {
      section: `SECTION ${sectionNum}: ${sectionName.toUpperCase()}`,
      unitLabel: `UNIT ${unitNum}`,
      title: cleanTitle,
    };
  };

  const handleNodeClick = (lesson: Lesson, unlocked: boolean) => {
    if (!unlocked) return;
    setSelectedNode({
      title: lesson.title,
      description: lesson.description,
      expReward: lesson.expReward,
      href: `/lesson?id=${lesson.id}`,
      icon: lesson.icon,
      badge: lesson.badge,
      color: lesson.unitColor,
    });
    setIsDrawerOpen(true);
  };

  if (isMounted && deviceMode === "mobile") {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MainLayout>
          <MobileContainer>
            {/* Top stats banner */}
            <StatBanner>
              <StatBannerItem title="Total Experience Points">
                ⭐ <span style={{ color: "#eab308" }}>{progress.exp} EXP</span>
              </StatBannerItem>
              <StatBannerItem title="Daily Challenge Status">
                🎯{" "}
                <span
                  style={{
                    color: isDailyCompleted ? "#10b981" : "var(--text-secondary)",
                  }}
                >
                  {isDailyCompleted ? "Daily Done!" : "Daily Pending"}
                </span>
              </StatBannerItem>
            </StatBanner>

            {/* Level Tab Bar Selector */}
            <LevelSelector>
              {levels.map((level) => (
                <LevelTab
                  key={level.code}
                  $active={selectedLevel === level.code}
                  $activeColor={level.color}
                  $activeBg={getActiveBgColor(level.code)}
                  onClick={() => setSelectedLevel(level.code)}
                >
                  {level.code === "Basic" ? (
                    "Basic"
                  ) : (
                    <>
                      <LevelTabText>JLPT </LevelTabText>
                      {level.code}
                    </>
                  )}
                </LevelTab>
              ))}
            </LevelSelector>

            {/* Locked indicators warnings */}
            {levelLessons.length === 0 && (
              <LockBanner>
                📭 No material available for this level yet.
              </LockBanner>
            )}

            {/* Render Units */}
            {activeUnits.map((unit) => {
              const sectHeader = getSectionTitle(unit.id, unit.title);
              const numLessons = unit.lessons.length;
              const completedInUnit = unit.lessons.filter((l) =>
                progress.completedExercises?.includes(l.id),
              ).length;

              return (
                <div key={unit.id} style={{ marginBottom: "2.25rem" }}>
                  <ToriiPhaseHeader
                    unitLabel={sectHeader.unitLabel}
                    title={sectHeader.title}
                    description={unit.description}
                    color={unit.color}
                  />

                  <InkProgressBar
                    completed={completedInUnit}
                    total={numLessons}
                    color={
                      unit.color.includes("gradient")
                        ? unit.color.match(/#(?:[0-9a-fA-F]{3}){1,2}/g)?.[0] ||
                          "#10b981"
                        : unit.color
                    }
                  />

                  <DraggableScrollList>
                    {unit.lessons.map((lesson) => {
                      const isUnlocked = isLessonUnlocked(lesson.id);
                      const isCompleted =
                        progress.completedExercises?.includes(lesson.id) || false;
                      const isActive = isUnlocked && !isCompleted;

                      const cardState = isCompleted
                        ? "mastered"
                        : isActive
                          ? "active"
                          : isUnlocked
                            ? "available"
                            : "locked";

                      return (
                        <HankoSkillCard
                          key={lesson.id}
                          id={isActive ? "active-lesson-node" : undefined}
                          title={lesson.title}
                          badge={lesson.badge}
                          icon={lesson.icon}
                          expReward={lesson.expReward}
                          state={cardState}
                          color={unit.color}
                          onClick={() => handleNodeClick(lesson, isUnlocked)}
                        />
                      );
                    })}
                  </DraggableScrollList>
                </div>
              );
            })}

            {/* Node detail bottom drawer sheet */}
            <RoadmapNodeDrawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              nodeData={selectedNode}
            />
          </MobileContainer>
          <RightSidebar />
        </MainLayout>
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <HeroSection isDailyCompleted={isDailyCompleted} />
        <GamesSection />
        <BenefitsSection />
        <WhatsNewSection />
        <FeaturesSection />
        <StepsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </Container>
    </>
  );
}
