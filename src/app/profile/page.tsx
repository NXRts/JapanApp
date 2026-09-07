"use client";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import {
  AwardIcon,
  BookIcon,
  FireIcon,
  SparklesIcon,
  TargetIcon,
  TrophyIcon,
} from "@/components/icons/AppIcons";
import { LeaderboardModal } from "@/components/modals/DuolingoModals";
import { useProgress } from "@/context/ProgressContext";
import { grammarLessons, totalSections } from "@/data/grammarLessons";
import { getLeagueById, getRankStatus } from "@/data/leagues";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

/* ─── Global Font & Variable Integrations for Native JapanApp Design System ─── */
const Profile2GlobalStyle = createGlobalStyle`
  :root {
    --p2-font-ui: var(--font-ui, "Inter", system-ui, -apple-system, sans-serif);
    --p2-font-jp: var(--font-kana, "Noto Sans JP", sans-serif);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* ─── Page Wrapper & Layout Grid (Wide Dashboard Layout - Gambar 2) ────────── */
const PageWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0;
  min-height: 85vh;
  color: var(--foreground);
  font-family: var(--p2-font-ui);
  padding: 1.25rem 1.5rem 5rem 1.5rem;
  animation: ${fadeIn} 0.3s ease-out;

  a,
  a:hover,
  a:focus,
  a:visited {
    text-decoration: none !important;
  }

  @media (max-width: 900px) {
    padding: 0.75rem 0.75rem 6.5rem 0.75rem;
  }
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  gap: 1rem;
  margin-top: 0.85rem;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  @media (max-width: 560px) {
    padding: 1rem;
    border-radius: 14px;
  }
`;

/* ─── SIDEBAR COMPONENTS ─────────────────────────────────────────────────── */
const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  min-width: 0;

  @media (max-width: 900px) {
    order: 1;
  }
`;

const ProfileCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const ProfileTop = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProfileAvatar = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  border: 2px solid var(--primary);
  background: radial-gradient(
    circle at 30% 30%,
    rgba(var(--primary-rgb, 79, 70, 229), 0.3),
    rgba(var(--primary-rgb, 79, 70, 229), 0.08)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(var(--primary-rgb, 79, 70, 229), 0.2);
`;

const ProfileName = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1.18rem;
  font-weight: 800;
  color: var(--foreground);
  margin-bottom: 6px;

  .crown {
    color: #f59e0b;
    font-size: 0.95rem;
  }
`;

const ProfileMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const SectionLabel = styled.div`
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 700;
  margin-bottom: 8px;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

/* Heatmap Grid */
const HeatmapWrap = styled.div`
  margin-top: 1.25rem;
  width: 100%;
  overflow: visible;
  position: relative;
  display: flex;
  flex-direction: column;

  .cell-info-bar {
    min-height: 22px;
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    padding: 3px 6px;
    border-radius: 6px;
    background: rgba(var(--foreground-rgb, 255, 255, 255), 0.025);

    .info-date {
      font-weight: 800;
      color: var(--foreground);
    }
    .info-exp {
      color: var(--primary);
      font-weight: 700;
    }
  }

  .refresh-toast {
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(16, 185, 129, 0.95);
    color: #ffffff;
    font-weight: 800;
    font-size: 10.5px;
    padding: 3px 8px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    animation: ${fadeIn} 0.2s ease-out;
    z-index: 10;
  }
`;

const HeatmapMonths = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  font-size: 10.5px;
  color: var(--text-secondary);
  margin-bottom: 6px;
  padding-left: 2px;
  font-weight: 600;
  width: 100%;
`;

const HeatmapGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, minmax(0, 1fr));
  grid-template-columns: repeat(20, 1fr);
  gap: 3px;
  width: 100%;
  padding: 3px;
  margin: -3px 0;
`;

const HeatmapCell = styled.div<{
  $level?: number;
  $highlighted?: boolean;
  $isFuture?: boolean;
}>`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 2.5px;
  cursor: ${({ $isFuture }) => ($isFuture ? "default" : "pointer")};
  pointer-events: ${({ $isFuture }) => ($isFuture ? "none" : "auto")};
  visibility: ${({ $isFuture }) => ($isFuture ? "hidden" : "visible")};
  background: ${({ $level }) => {
    switch ($level) {
      case 1:
        return "rgba(var(--primary-rgb, 79, 70, 229), 0.4)";
      case 2:
        return "rgba(var(--primary-rgb, 79, 70, 229), 0.65)";
      case 3:
        return "rgba(var(--primary-rgb, 79, 70, 229), 0.88)";
      case 4:
        return "var(--primary)";
      default:
        return "rgba(var(--foreground-rgb, 255, 255, 255), 0.06)";
    }
  }};
  box-shadow: ${({ $level, $highlighted }) =>
    $highlighted || ($level && $level > 2)
      ? "0 0 6px rgba(var(--primary-rgb, 79, 70, 229), 0.5)"
      : "none"};
  transform: ${({ $highlighted }) =>
    $highlighted ? "scale(1.2)" : "scale(1)"};
  z-index: ${({ $highlighted }) => ($highlighted ? 5 : 1)};
  transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.18s cubic-bezier(0.16, 1, 0.3, 1),
    background 0.15s ease;
  will-change: transform;

  &:hover {
    transform: scale(1.25);
    z-index: 20;
    box-shadow: 0 0 8px rgba(var(--primary-rgb, 79, 70, 229), 0.75), 0 0 2px rgba(255, 255, 255, 0.4);
    border-radius: 3px;
  }
`;

const HeatmapFoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 11px;
  color: var(--text-secondary);
  font-weight: 600;

  .refresh-btn {
    background: transparent;
    border: none;
    padding: 2px 6px;
    cursor: pointer;
    color: var(--text-secondary);
    opacity: 0.75;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-weight: 700;
    font-size: 11px;
    border-radius: 4px;
    transition: all 0.15s ease;

    &:hover {
      opacity: 1;
      color: var(--primary);
      background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
    }

    &.spinning .refresh-ico {
      display: inline-block;
      animation: ${spin} 0.6s linear infinite;
    }
  }

  .legend {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 10.5px;
    color: var(--text-secondary);
    user-select: none;

    .legend-item {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      padding: 1px 2px;
      border-radius: 2px;
      transition: opacity 0.15s ease;

      ${HeatmapCell} {
        width: 10px;
        height: 10px;
        aspect-ratio: 1 / 1;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

/* Discord Banner */
const DiscordBanner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(88, 101, 242, 0.12);
  border: 1px solid rgba(88, 101, 242, 0.25);
  border-radius: 16px;
  padding: 14px 16px;
  width: 100%;

  .banner-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding-right: 20px;
  }

  .discord-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #5865f2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .banner-text {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  .title {
    font-size: 0.88rem;
    font-weight: 800;
    color: var(--foreground);
    line-height: 1.35;
    white-space: normal;
    word-break: break-word;
  }

  .sub {
    font-size: 0.78rem;
    color: var(--text-secondary);
    line-height: 1.4;
    white-space: normal;
    word-break: break-word;
  }

  .btn-join {
    background: #5865f2;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 9px;
    font-size: 0.82rem;
    font-weight: 800;
    cursor: pointer;
    transition: opacity 0.15s ease;
    width: 100%;
    text-align: center;

    &:hover {
      opacity: 0.9;
    }
  }

  .close-x {
    position: absolute;
    top: 12px;
    right: 14px;
    color: var(--text-secondary);
    font-size: 15px;
    cursor: pointer;
    padding: 2px;
    &:hover {
      color: var(--foreground);
    }
  }
`;

/* Start Here Card */
const StartHereCard = styled.div`
  position: relative;
  border: 1px solid rgba(var(--primary-rgb, 79, 70, 229), 0.35);
  background: linear-gradient(
    135deg,
    rgba(var(--primary-rgb, 79, 70, 229), 0.14),
    rgba(var(--primary-rgb, 79, 70, 229), 0.03)
  );
  border-radius: 16px;
  padding: 16px;
  padding-top: 24px;

  .start-tag {
    position: absolute;
    top: -10px;
    left: 14px;
    background: var(--primary);
    color: #fff;
    font-size: 9.5px;
    font-weight: 900;
    letter-spacing: 0.05em;
    padding: 3px 10px;
    border-radius: 6px;
  }

  .start-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .start-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .start-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: var(--primary);
    font-family: var(--p2-font-jp);
    font-weight: 700;
    flex-shrink: 0;
  }

  .start-step {
    font-size: 10.5px;
    color: var(--primary);
    font-weight: 800;
    letter-spacing: 0.02em;
  }

  .start-title {
    font-size: 0.92rem;
    font-weight: 800;
    margin-top: 2px;
    color: var(--foreground);
  }

  .btn-go {
    background: var(--primary);
    color: #fff;
    border: none;
    padding: 7px 15px;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 800;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
    text-decoration: none !important;
    transition: opacity 0.15s ease;

    &:hover {
      opacity: 0.9;
      text-decoration: none !important;
    }
  }
`;

/* Stat Row Grid (Gambar 1 - Ringkas, Cool, & Compact) */
const StatRowGrid = styled(Card)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  padding: 14px 6px;
  width: 100%;

  .stat-item {
    padding: 4px 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .stat-item + .stat-item {
    border-left: 1px solid var(--border);
  }

  .stat-label {
    font-size: 10px;
    color: var(--text-secondary);
    letter-spacing: 0.06em;
    font-weight: 800;
    text-transform: uppercase;
  }

  .stat-value {
    font-size: 1.35rem;
    font-weight: 900;
    color: var(--foreground);
    margin: 4px 0 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    .emoji {
      font-size: 0.95rem;
    }

    &.jp {
      font-family: var(--p2-font-jp);
      color: #ec4899;
    }
  }

  .stat-sub {
    font-size: 11px;
    color: var(--text-secondary);
    font-weight: 500;
  }

  @media (max-width: 560px) {
    padding: 12px 4px;

    .stat-label {
      font-size: 9.5px;
    }

    .stat-value {
      font-size: 1.2rem;
      margin: 3px 0 1px;
    }

    .stat-sub {
      font-size: 10px;
    }
  }
`;

/* JLPT Progress Breakdown Card */
const JlptProgressCard = styled(Card)`
  .jlpt-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .jlpt-title {
    font-size: 0.95rem;
    font-weight: 800;
    color: var(--foreground);
  }

  .chev {
    color: var(--text-secondary);
    font-size: 14px;
  }

  .jlpt-list {
    margin-top: 14px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .jlpt-row-top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    font-size: 0.85rem;
  }

  .jlpt-level {
    font-weight: 800;
    color: var(--foreground);
  }

  .jlpt-pct {
    color: var(--text-secondary);
    font-weight: 700;
    margin-left: 8px;
  }

  .bar-track {
    height: 6px;
    border-radius: 6px;
    background: rgba(var(--foreground-rgb, 255, 255, 255), 0.08);
    margin: 6px 0;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    border-radius: 6px;
    background: var(--primary);
  }

  .jlpt-split {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: var(--text-secondary);
    font-weight: 500;
  }
`;

/* ─── MAIN CONTENT COMPONENTS ────────────────────────────────────────────── */
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  min-width: 0;

  @media (max-width: 900px) {
    order: 2;
  }
`;

const PracticeBanner = styled.div`
  background: linear-gradient(135deg, var(--primary), #8b5cf6);
  border-radius: 16px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.05rem;
  font-weight: 800;
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(var(--primary-rgb, 79, 70, 229), 0.25);

  .kana-mini {
    font-family: var(--p2-font-jp);
    font-size: 1.2rem;
  }
`;

const MasterCard = styled(Card)`
  h2 {
    margin: 0 0 8px;
    font-size: 1.25rem;
    font-weight: 900;
    color: var(--foreground);
  }

  p {
    margin: 0 0 20px;
    color: var(--text-secondary);
    font-size: 0.92rem;
    line-height: 1.5;
  }

  .prog-row {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .prog-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--foreground);

    .left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .prog-icon {
    font-family: var(--p2-font-jp);
    font-size: 1.05rem;
    color: var(--primary);
    font-weight: 700;
  }

  .prog-track {
    height: 8px;
    border-radius: 6px;
    background: rgba(var(--foreground-rgb, 255, 255, 255), 0.08);
    overflow: hidden;
  }

  .prog-fill {
    height: 100%;
    border-radius: 6px;
    background: var(--primary);
  }
`;

const TabsBar = styled.div`
  display: flex;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 6px;
  gap: 6px;
  overflow-x: auto;
  width: 100%;
  box-sizing: border-box;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 600px) {
    padding: 5px;
    gap: 6px;
    border-radius: 14px;
  }
`;

const TabItem = styled.div<{ $active: boolean }>`
  flex: 0 0 auto;
  min-width: max-content;
  white-space: nowrap;
  text-align: center;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 0.88rem;
  font-weight: 800;
  color: ${({ $active }) => ($active ? "#ffffff" : "var(--text-secondary)")};
  background: ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: ${({ $active }) =>
    $active ? "0 4px 12px rgba(var(--primary-rgb, 79, 70, 229), 0.3)" : "none"};
  user-select: none;

  &:hover {
    color: ${({ $active }) => ($active ? "#ffffff" : "var(--foreground)")};
    background: ${({ $active }) =>
      $active ? "var(--primary)" : "rgba(var(--foreground-rgb), 0.04)"};
  }

  @media (max-width: 600px) {
    padding: 8px 14px;
    font-size: 0.84rem;
    border-radius: 10px;
  }
`;

const KanaPanel = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 22px;

  .kana-panel-head {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(139, 124, 255, 0.12);
    color: #8b7cff;
    border: 1px solid rgba(139, 124, 255, 0.25);
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.05em;
  }

  .tag-ico {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 900;
  }

  h3.block-title {
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--foreground);
    margin: 0 0 14px;
  }

  .kana-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    border-radius: 12px;
    overflow: hidden;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .kana-col {
    background: var(--surface);
    padding: 20px;
  }

  .kana-col h4 {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 900;
    color: var(--foreground);
    text-transform: lowercase;
  }

  .kana-col .attempts {
    color: var(--text-secondary);
    font-size: 0.82rem;
    margin-top: 4px;
    font-weight: 500;
  }

  .focus-btn {
    display: inline-block;
    margin-top: 14px;
    border: 1px solid var(--primary);
    border-radius: 8px;
    padding: 6px 14px;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--primary);
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.08);
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: var(--primary);
      color: #ffffff;
    }
  }

  .kana-col .good-status {
    margin-top: 16px;
    color: var(--text-secondary);
    font-size: 0.82rem;
    font-weight: 500;
  }

  .chart-wrap {
    background: var(--surface);
    border-radius: 12px;
    overflow: hidden;
    width: 100%;
    padding: 6px 0;

    svg {
      width: 100%;
      min-width: 100%;
      height: auto;
      display: block;
    }
  }

  .chart-legend {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    font-size: 0.85rem;
    color: var(--text-secondary);
    font-weight: 600;
    margin-bottom: 16px;
    padding: 4px 0;

    span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
  }

  .legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }

  .view-link {
    text-align: center;
    margin-top: 4px;
    color: var(--primary);
    font-weight: 800;
    font-size: 0.88rem;
    cursor: pointer;
    text-decoration: none !important;
    transition: opacity 0.15s ease;

    &:hover {
      opacity: 0.8;
      text-decoration: none !important;
    }
  }
`;

/* ─── VOCABULARY PANEL COMPONENTS ────────────────────────────────────────── */
const VocabPanel = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;

  .vocab-panel-head {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(59, 130, 246, 0.12);
    color: #3b82f6;
    border: 1px solid rgba(59, 130, 246, 0.25);
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.05em;
  }

  .block-title {
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--foreground);
    margin-bottom: 10px;
  }

  .vocab-stat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: rgba(var(--foreground-rgb, 255, 255, 255), 0.03);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 16px;
    text-align: center;

    .v-stat-item + .v-stat-item {
      border-left: 1px solid var(--border);
    }

    .v-label {
      font-size: 10px;
      font-weight: 800;
      color: var(--text-secondary);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .v-val {
      font-size: 1.6rem;
      font-weight: 900;
      margin-top: 4px;
      color: var(--foreground);

      &.green {
        color: #10b981;
      }
      &.blue {
        color: #3b82f6;
      }
    }
  }

  .empty-distribution-box {
    background: rgba(var(--foreground-rgb, 255, 255, 255), 0.02);
    border: 1px dashed var(--border);
    border-radius: 14px;
    padding: 45px 20px;
    text-align: center;

    .main-txt {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-secondary);
      margin-bottom: 4px;
    }

    .sub-txt {
      font-size: 0.82rem;
      color: var(--text-secondary);
      opacity: 0.75;
    }
  }

  .struggle-table {
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;

    .table-head {
      display: grid;
      grid-template-columns: 1fr 1fr 1.5fr 1fr;
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--text-secondary);
      padding: 10px 14px;
      background: rgba(var(--foreground-rgb, 255, 255, 255), 0.03);
      border-bottom: 1px solid var(--border);
    }

    .table-empty {
      padding: 30px 14px;
      text-align: center;
      font-size: 0.88rem;
      color: var(--text-secondary);
      font-weight: 500;
    }
  }

  .chart-wrap {
    background: var(--surface);
    border-radius: 12px;
    overflow: hidden;
    width: 100%;
    padding: 6px 0;

    svg {
      width: 100%;
      min-width: 100%;
      height: auto;
      display: block;
    }
  }

  .chart-legend {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    font-size: 0.85rem;
    color: var(--text-secondary);
    font-weight: 600;
    margin-bottom: 16px;
    padding: 4px 0;

    span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
  }

  .legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }

  .view-link {
    text-align: center;
    margin-top: 4px;
    color: var(--primary);
    font-weight: 800;
    font-size: 0.88rem;
    cursor: pointer;
    text-decoration: none !important;
    transition: opacity 0.15s ease;

    &:hover {
      opacity: 0.8;
      text-decoration: none !important;
    }
  }
`;

/* ─── CONJUGATION PANEL COMPONENTS ────────────────────────────────────────── */
const ConjPanel = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;

  .conj-panel-head {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(20, 184, 166, 0.12);
    color: #14b8a6;
    border: 1px solid rgba(20, 184, 166, 0.25);
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.05em;
  }

  .conj-grid-layout {
    display: grid;
    grid-template-columns: 2.2fr 1fr;
    gap: 32px;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  }

  .conj-cards-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .conj-card {
    background: rgba(var(--foreground-rgb, 255, 255, 255), 0.025);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 96px;
    transition: all 0.15s ease;

    &:hover {
      border-color: rgba(20, 184, 166, 0.4);
      background: rgba(var(--foreground-rgb, 255, 255, 255), 0.04);
    }

    .card-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 6px;

      .card-title {
        font-size: 0.86rem;
        font-weight: 800;
        color: var(--foreground);
        line-height: 1.25;
      }

      .card-arrow {
        font-size: 0.8rem;
        color: var(--text-secondary);
        opacity: 0.6;
        flex-shrink: 0;
      }
    }

    .card-sub {
      font-size: 0.76rem;
      color: var(--text-secondary);
      margin-top: 10px;
      font-weight: 500;
    }

    .progress-bar-track {
      width: 100%;
      height: 4px;
      background: rgba(var(--foreground-rgb, 255, 255, 255), 0.06);
      border-radius: 2px;
      margin-top: 8px;
      overflow: hidden;

      .progress-bar-fill {
        height: 100%;
        background: #14b8a6;
        width: 0%;
      }
    }
  }

  .conj-sidebar-block {
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding-top: 4px;

    .side-section {
      .side-label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--text-secondary);
        margin-bottom: 12px;
      }

      .accuracy-val {
        font-size: 1.8rem;
        font-weight: 900;
        color: #8b7cff;
        margin-top: 8px;
      }

      .accuracy-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #8b7cff;
        margin-bottom: 4px;
      }

      .empty-last10 {
        font-size: 0.88rem;
        color: var(--text-secondary);
        opacity: 0.8;
        padding: 40px 0;
        text-align: center;
      }
    }
  }

  .view-link {
    text-align: center;
    margin-top: 8px;
    color: var(--primary);
    font-weight: 800;
    font-size: 0.88rem;
    cursor: pointer;
    text-decoration: none !important;
    transition: opacity 0.15s ease;

    &:hover {
      opacity: 0.8;
      text-decoration: none !important;
    }
  }
`;

/* ─── DATA & CONSTANTS ───────────────────────────────────────────────────── */
const HIRAGANA_CHARS = [
  "あ",
  "い",
  "う",
  "え",
  "お",
  "か",
  "き",
  "く",
  "け",
  "こ",
  "さ",
  "し",
  "す",
  "せ",
  "そ",
  "た",
  "ち",
  "つ",
  "て",
  "と",
  "な",
  "に",
  "ぬ",
  "ね",
  "の",
  "は",
  "ひ",
  "ふ",
  "へ",
  "ほ",
  "ま",
  "み",
  "む",
  "め",
  "も",
  "や",
  "ゆ",
  "よ",
  "ら",
  "り",
  "る",
  "れ",
  "ろ",
  "わ",
  "を",
  "ん",
];

const KATAKANA_CHARS = [
  "ア",
  "イ",
  "ウ",
  "エ",
  "オ",
  "カ",
  "キ",
  "ク",
  "ケ",
  "コ",
  "サ",
  "シ",
  "ス",
  "セ",
  "ソ",
  "タ",
  "チ",
  "ツ",
  "テ",
  "ト",
  "ナ",
  "ニ",
  "ヌ",
  "ネ",
  "ノ",
  "ハ",
  "ヒ",
  "フ",
  "ヘ",
  "ホ",
  "マ",
  "ミ",
  "ム",
  "メ",
  "モ",
  "ヤ",
  "ユ",
  "ヨ",
  "ラ",
  "リ",
  "ル",
  "レ",
  "ロ",
  "ワ",
  "ヲ",
  "ン",
];

const jlptData = [
  { level: "N5", total: 843, vocab: 697, grammar: 146 },
  { level: "N4", total: 773, vocab: 653, grammar: 120 },
  { level: "N3", total: 2238, vocab: 2114, grammar: 124 },
  { level: "N2", total: 1968, vocab: 1795, grammar: 173 },
  { level: "N1", total: 2938, vocab: 2694, grammar: 244 },
];

const chartDays = [
  "Aug 13",
  "Aug 14",
  "Aug 15",
  "Aug 16",
  "Aug 17",
  "Aug 18",
  "Aug 19",
];
const chartAttempts = [0, 0, 0, 0, 0, 5, 0];

const vocabDays = [
  "Aug 15",
  "Aug 16",
  "Aug 17",
  "Aug 18",
  "Aug 19",
  "Aug 20",
  "Aug 21",
];
const vocabReviewed = [0, 0, 0, 0, 0, 0, 0];
const vocabLearned = [0, 0, 0, 0, 0, 0, 0];
const vocabAccuracy = [0, 0, 0, 0, 0, 0, 0];

const conjForms = [
  { id: "plain", title: "Plain / Dictionary", attempts: 0 },
  { id: "polite", title: "Polite", attempts: 0 },
  { id: "plain_neg", title: "Plain Negative", attempts: 0 },
  { id: "plain_past", title: "Plain Past", attempts: 0 },
  { id: "polite_past", title: "Polite Past", attempts: 0 },
  { id: "polite_neg", title: "Polite Negative", attempts: 0 },
  { id: "polite_past_neg", title: "Polite Past Negative", attempts: 0 },
  { id: "plain_past_neg", title: "Plain Past Negative", attempts: 0 },
  { id: "te_form", title: "Te-form", attempts: 0 },
  { id: "progressive", title: "Progressive", attempts: 0 },
  { id: "potential", title: "Potential (can do)", attempts: 0 },
  { id: "passive", title: "Passive", attempts: 0 },
  { id: "causative", title: "Causative (make/let do)", attempts: 0 },
  { id: "volitional", title: "Volitional (let's)", attempts: 0 },
  { id: "imperative", title: "Imperative (command)", attempts: 0 },
];

/* ─── BOTTOM FULL WIDTH SECTION STYLED COMPONENTS (PROFILE 2.0 THEME) ─────── */
const BottomSection = styled.div`
  max-width: 1300px;
  margin: 2.5rem auto 0;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 850;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
  letter-spacing: -0.01em;

  .tag-ico {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.15);
    border: 1px solid rgba(var(--primary-rgb, 79, 70, 229), 0.3);
    font-size: 14px;
  }

  &::before {
    content: "";
    width: 4px;
    height: 1.15rem;
    background: linear-gradient(180deg, var(--primary) 0%, #8b5cf6 100%);
    border-radius: 3px;
  }
`;

const GridTwoCol = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const GoalCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.35rem 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    border-color: rgba(var(--primary-rgb, 79, 70, 229), 0.4);
    transform: translateY(-2px);
  }
`;

const GoalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1.05rem;
    font-weight: 850;
    margin: 0;
    color: var(--foreground);
  }

  span {
    font-size: 0.88rem;
    font-weight: 800;
    color: var(--primary);
  }
`;

const LevelProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(var(--foreground-rgb, 255, 255, 255), 0.08);
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ $width: number }>`
  height: 100%;
  width: ${({ $width }) => Math.min(100, Math.max(0, $width))}%;
  background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);
  border-radius: 999px;
  transition: width 1s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const LeagueCard = styled(Card)`
  padding: 1.35rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.7),
    rgba(15, 23, 42, 0.9)
  );
  border: 1px solid rgba(var(--primary-rgb, 79, 70, 229), 0.25);
  border-radius: 20px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--primary);
    box-shadow: 0 8px 30px rgba(var(--primary-rgb, 79, 70, 229), 0.3);
  }
`;

const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InventoryItemCard = styled(Card)<{ $highlight?: boolean }>`
  padding: 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: ${({ $highlight }) =>
    $highlight
      ? "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(147, 51, 234, 0.08))"
      : "var(--surface)"};
  border: 1px solid
    ${({ $highlight }) =>
      $highlight ? "rgba(168, 85, 247, 0.4)" : "var(--border)"};
  border-radius: 18px;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .inv-label {
    font-size: 0.76rem;
    font-weight: 800;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .inv-val {
    font-size: 1.2rem;
    font-weight: 900;
    color: var(--foreground);
  }
`;

const AchievementsStackCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.35rem 1.5rem;
`;

const AchievementRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid var(--border);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const LevelBadgeBox = styled.div<{ $bg: string }>`
  width: 58px;
  height: 58px;
  background: ${({ $bg }) => $bg};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);

  .main-icon {
    font-size: 1.5rem;
  }

  .level-tag {
    font-size: 0.56rem;
    font-weight: 900;
    color: white;
    background: rgba(0, 0, 0, 0.45);
    padding: 0.1rem 0.35rem;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
`;

const YellowProgressTrack = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(var(--foreground-rgb, 255, 255, 255), 0.08);
  border-radius: 999px;
  overflow: hidden;
`;

const YellowProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => Math.min(100, Math.max(0, $pct))}%;
  background: linear-gradient(90deg, #f59e0b 0%, #eab308 100%);
  border-radius: 999px;
  transition: width 1s ease-in-out;
`;

const AchievementGrid = styled.div<{ $isDragging?: boolean }>`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.85rem 0.5rem 1rem 0.5rem;
  margin-top: -0.35rem;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "grab")};
  user-select: none;
`;

const AchievementCard = styled(Card)<{ $unlocked: boolean }>`
  min-width: 145px;
  text-align: center;
  opacity: ${({ $unlocked }) => ($unlocked ? 1 : 0.45)};
  filter: ${({ $unlocked }) => ($unlocked ? "none" : "grayscale(80%)")};
  flex-shrink: 0;
  border-radius: 18px;
  padding: 1.1rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: ${({ $unlocked }) => ($unlocked ? "translateY(-2px)" : "none")};
  }

  .icon-wrap {
    font-size: 2.1rem;
    margin-bottom: 0.4rem;
    color: ${({ $unlocked }) =>
      $unlocked ? "var(--primary)" : "var(--text-secondary)"};
  }

  h3 {
    font-size: 0.9rem;
    font-weight: 800;
    margin-bottom: 0.2rem;
  }

  p {
    font-size: 0.74rem;
    color: var(--text-secondary);
    margin: 0;
  }
`;

const AchievementCategoryBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0 0.5rem;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AchievementTabBtn = styled.button<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%)"
      : "rgba(255, 255, 255, 0.05)"};
  color: ${({ $active }) => ($active ? "#ffffff" : "var(--text-secondary)")};
  border: 1px solid
    ${({ $active }) =>
      $active ? "transparent" : "rgba(255, 255, 255, 0.1)"};
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) =>
      $active
        ? "linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%)"
        : "rgba(255, 255, 255, 0.1)"};
  }
`;

const AchievementSummaryCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.7) 0%,
    rgba(15, 23, 42, 0.8) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;

  .stat-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    .stat-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--text-secondary);
    }
    .stat-value {
      font-size: 1.15rem;
      font-weight: 900;
      color: var(--foreground);
    }
  }

  .progress-wrap {
    flex: 1;
    max-width: 240px;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
`;

const TierPill = styled.span<{ $tier: "bronze" | "silver" | "gold" | "diamond" }>`
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  ${({ $tier }) =>
    $tier === "bronze" &&
    `
    background: rgba(205, 127, 50, 0.15);
    color: #cd7f32;
    border: 1px solid rgba(205, 127, 50, 0.3);
  `}

  ${({ $tier }) =>
    $tier === "silver" &&
    `
    background: rgba(148, 163, 184, 0.15);
    color: #cbd5e1;
    border: 1px solid rgba(148, 163, 184, 0.3);
  `}

  ${({ $tier }) =>
    $tier === "gold" &&
    `
    background: rgba(245, 158, 11, 0.18);
    color: #fbbf24;
    border: 1px solid rgba(245, 158, 11, 0.35);
  `}

  ${({ $tier }) =>
    $tier === "diamond" &&
    `
    background: rgba(59, 130, 246, 0.18);
    color: #60a5fa;
    border: 1px solid rgba(59, 130, 246, 0.35);
  `}
`;

const UpgradedAchievementCard = styled(Card)<{
  $unlocked: boolean;
  $tier: "bronze" | "silver" | "gold" | "diamond";
}>`
  min-width: 165px;
  max-width: 190px;
  text-align: center;
  flex-shrink: 0;
  border-radius: 20px;
  padding: 1.15rem 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 0.28s cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 0.25s ease;

  opacity: ${({ $unlocked }) => ($unlocked ? 1 : 0.65)};
  background: ${({ $unlocked }) =>
    $unlocked
      ? "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)"
      : "rgba(15, 23, 42, 0.5)"};

  ${({ $unlocked, $tier }) => {
    if (!$unlocked) {
      return `
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        &:hover {
          border-color: rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.25);
        }
      `;
    }
    if ($tier === "diamond") {
      return `
        border: 1.5px solid rgba(59, 130, 246, 0.5);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2), 0 0 12px rgba(59, 130, 246, 0.15);
        &:hover {
          border-color: rgba(96, 165, 250, 0.85);
          box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.25), 0 0 20px rgba(59, 130, 246, 0.3);
        }
      `;
    }
    if ($tier === "gold") {
      return `
        border: 1.5px solid rgba(245, 158, 11, 0.5);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2), 0 0 12px rgba(245, 158, 11, 0.15);
        &:hover {
          border-color: rgba(251, 191, 36, 0.85);
          box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.25), 0 0 20px rgba(245, 158, 11, 0.3);
        }
      `;
    }
    if ($tier === "silver") {
      return `
        border: 1.5px solid rgba(148, 163, 184, 0.4);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2), 0 0 10px rgba(148, 163, 184, 0.12);
        &:hover {
          border-color: rgba(203, 213, 225, 0.75);
          box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.25), 0 0 18px rgba(148, 163, 184, 0.22);
        }
      `;
    }
    // Bronze
    return `
      border: 1.5px solid rgba(205, 127, 50, 0.45);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2), 0 0 10px rgba(205, 127, 50, 0.12);
      &:hover {
        border-color: rgba(245, 158, 11, 0.75);
        box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.25), 0 0 18px rgba(205, 127, 50, 0.28);
      }
    `;
  }}

  &:hover {
    transform: translateY(-4px);
  }

  .icon-box {
    font-size: 2.2rem;
    margin: 0.2rem 0;
    filter: ${({ $unlocked }) =>
      $unlocked ? "none" : "grayscale(90%) opacity(0.5)"};
    transition: transform 0.2s ease;
  }

  &:hover .icon-box {
    transform: scale(1.1);
  }

  h3 {
    font-size: 0.88rem;
    font-weight: 800;
    margin: 0;
    color: var(--foreground);
    line-height: 1.25;
  }

  p {
    font-size: 0.72rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.3;
  }

  .unlocked-tag {
    font-size: 0.65rem;
    font-weight: 800;
    color: #10b981;
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid rgba(16, 185, 129, 0.3);
    padding: 0.2rem 0.5rem;
    border-radius: 999px;
    margin-top: 0.25rem;
  }

  .mini-progress-bar {
    width: 100%;
    height: 5px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    overflow: hidden;
    margin-top: 0.4rem;
  }

  .mini-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
    border-radius: 999px;
  }

  .progress-ratio {
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--text-secondary);
  }
`;

const AchievementModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const AchievementModalCard = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  width: 100%;
  max-width: 420px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.08);
    border: none;
    color: var(--text-secondary);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
    }
  }

  .badge-icon {
    font-size: 4rem;
    margin: 0.75rem 0;
  }

  h2 {
    font-size: 1.35rem;
    font-weight: 900;
    margin: 0 0 0.4rem;
  }

  p {
    font-size: 0.88rem;
    color: var(--text-secondary);
    margin: 0 0 1.25rem;
    line-height: 1.4;
  }

  .reward-box {
    background: rgba(245, 158, 11, 0.12);
    border: 1px solid rgba(245, 158, 11, 0.3);
    color: #fbbf24;
    padding: 0.6rem 1.25rem;
    border-radius: 12px;
    font-weight: 800;
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
  }
`;

const MultiProgressBar = styled.div`
  width: 100%;
  height: 18px;
  background: rgba(var(--foreground-rgb, 255, 255, 255), 0.08);
  border-radius: 9px;
  display: flex;
  overflow: hidden;
`;

const ProgressSegment = styled.div<{ $width: number; $color: string }>`
  width: ${({ $width }) => $width}%;
  height: 100%;
  background: ${({ $color }) => $color};
  transition: width 1s ease-in-out;
`;

const SRSLegend = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.75rem;
  font-size: 0.8rem;
  margin-top: 0.85rem;
`;

const LegendItem = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--text-secondary);
  font-weight: 700;

  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 3px;
    background: ${({ $color }) => $color};
  }
`;

const ActivityItemCard = styled(Card)`
  padding: 1.1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-radius: 16px;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(var(--primary-rgb, 79, 70, 229), 0.3);
  }
`;

/* ─── MAIN PROFILE 2.0 PAGE COMPONENT ────────────────────────────────────── */
const OthersPanel = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;

  .others-panel-head {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(234, 179, 8, 0.12);
    color: #eab308;
    border: 1px solid rgba(234, 179, 8, 0.25);
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.05em;
  }

  .block-title {
    font-size: 1rem;
    font-weight: 850;
    color: var(--foreground);
    margin: 0 0 12px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export default function ProfilePage() {
  const { progress, checkStreak } = useProgress();
  const [activeTab, setActiveTab] = useState<
    "kana" | "vocab" | "grammar" | "conj" | "others"
  >("kana");
  const [showDiscord, setShowDiscord] = useState(true);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);

  // League data & Info
  const leagueData = progress.league || {
    currentLeagueId: "bronze",
    weekInLeague: 1,
    rank: 1,
    top3Finishes: 0,
    weeklyExp: 0,
  };
  const leagueInfo = getLeagueById(leagueData.currentLeagueId);
  const rankInfo = getRankStatus(leagueData.rank);

  // Leveling Logic
  const level = Math.floor(Math.sqrt((progress.exp || 0) / 100)) + 1;
  const currentLevelExp = Math.pow(level - 1, 2) * 100;
  const nextLevelExp = Math.pow(level, 2) * 100;
  const progressToNext = Math.min(
    100,
    Math.max(
      0,
      (((progress.exp || 0) - currentLevelExp) /
        (nextLevelExp - currentLevelExp)) *
        100,
    ),
  );

  // Daily Goal Calculation
  const targetGoal = parseInt(progress.profile?.dailyGoal || "50", 10);
  const todayStr = new Date().toISOString().split("T")[0];
  const todayExp = progress.activityLog?.[todayStr] || 0;
  const dailyGoalCurrent = Math.min(todayExp, targetGoal);
  const goalPercent = Math.min(100, (dailyGoalCurrent / targetGoal) * 100);

  // SRS Stage Distribution Logic
  const srsStats = useMemo(() => {
    const counts = {
      learning: 0,
      guru: 0,
      master: 0,
      enlightened: 0,
      burned: 0,
    };
    Object.values(progress.srs || {}).forEach((item) => {
      const reps = item.repetitions;
      if (reps < 4) counts.learning++;
      else if (reps < 8) counts.guru++;
      else if (reps < 12) counts.master++;
      else if (reps < 16) counts.enlightened++;
      else counts.burned++;
    });

    const total = Object.values(progress.srs || {}).length || 1;
    return {
      learning: (counts.learning / total) * 100,
      guru: (counts.guru / total) * 100,
      master: (counts.master / total) * 100,
      enlightened: (counts.enlightened / total) * 100,
      burned: (counts.burned / total) * 100,
      counts,
    };
  }, [progress.srs]);

  // Overall Grammar Progress Logic
  const completedGrammarSectionsCount = useMemo(() => {
    const completedSections = progress.completedGrammarSections || [];
    return grammarLessons.reduce((sum, lesson) => {
      return (
        sum +
        lesson.sections.filter((s) =>
          completedSections.includes(`${lesson.id}/${s.id}`),
        ).length
      );
    }, 0);
  }, [progress.completedGrammarSections]);

  const completedGrammarLessonsCount = useMemo(() => {
    const completedSections = progress.completedGrammarSections || [];
    const completedExercises = progress.completedExercises || [];
    return grammarLessons.filter((lesson) => {
      const sectionsDone = lesson.sections.filter((s) =>
        completedSections.includes(`${lesson.id}/${s.id}`),
      ).length;
      const exerciseDone = completedExercises.includes(lesson.id);
      return sectionsDone >= lesson.sections.length && exerciseDone;
    }).length;
  }, [progress.completedGrammarSections, progress.completedExercises]);

  const grammarProgressPct =
    Math.round((completedGrammarSectionsCount / totalSections) * 100) || 0;

  // Weak Points Logic
  const weakPoints = useMemo(() => {
    return Object.entries(progress.mastery || {})
      .sort(([, a], [, b]) => (b.incorrect || 0) - (a.incorrect || 0))
      .filter(([, m]) => (m.incorrect || 0) > 0)
      .slice(0, 6);
  }, [progress.mastery]);

  // Achievements Dragging Logic
  const achievementsScrollRef = useRef<HTMLDivElement>(null);
  const [isAchievementsDragging, setIsAchievementsDragging] = useState(false);
  const [achievementsStartX, setAchievementsStartX] = useState(0);
  const [achievementsScrollLeft, setAchievementsScrollLeft] = useState(0);

  const handleAchievementsMouseDown = (e: React.MouseEvent) => {
    if (!achievementsScrollRef.current) return;
    setIsAchievementsDragging(true);
    setAchievementsStartX(e.pageX - achievementsScrollRef.current.offsetLeft);
    setAchievementsScrollLeft(achievementsScrollRef.current.scrollLeft);
  };

  const handleAchievementsMouseLeave = () => {
    setIsAchievementsDragging(false);
  };

  const handleAchievementsMouseUp = () => {
    setIsAchievementsDragging(false);
  };

  const handleAchievementsMouseMove = (e: React.MouseEvent) => {
    if (!isAchievementsDragging || !achievementsScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - achievementsScrollRef.current.offsetLeft;
    const walk = (x - achievementsStartX) * 1.5;
    achievementsScrollRef.current.scrollLeft = achievementsScrollLeft - walk;
  };

  const totalCharacters = Object.keys(progress.mastery || {}).length;
  const accuracy = useMemo(() => {
    let correct = 0;
    let total = 0;
    Object.values(progress.mastery || {}).forEach((m) => {
      correct += m.correct || 0;
      total += (m.correct || 0) + (m.incorrect || 0);
    });
    return total === 0 ? 0 : Math.round((correct / total) * 100);
  }, [progress.mastery]);

  type AchievementCat = "all" | "streak" | "mastery" | "accuracy" | "level" | "quests";
  type AchievementTierType = "bronze" | "silver" | "gold" | "diamond";

  interface ExpandedAchievement {
    id: string;
    title: string;
    desc: string;
    icon: string;
    category: AchievementCat;
    tier: AchievementTierType;
    currentValue: number;
    maxValue: number;
    unlocked: boolean;
    reward: string;
  }

  const [activeAchievementTab, setActiveAchievementTab] = useState<AchievementCat>("all");
  const [selectedAchievement, setSelectedAchievement] = useState<ExpandedAchievement | null>(null);

  const userStreak = progress.streak || 0;
  const userQuizCount = (progress.quizHistory || []).length;

  const allAchievementsList: ExpandedAchievement[] = useMemo(() => [
    // Streak Tiers
    {
      id: "streak_3",
      title: "Fire Starter",
      desc: "Pertahankan 3 Hari Streak",
      icon: "🔥",
      category: "streak",
      tier: "bronze",
      currentValue: userStreak,
      maxValue: 3,
      unlocked: userStreak >= 3,
      reward: "+30 XP",
    },
    {
      id: "streak_7",
      title: "Unstoppable",
      desc: "Pertahankan 7 Hari Streak",
      icon: "⚡",
      category: "streak",
      tier: "silver",
      currentValue: userStreak,
      maxValue: 7,
      unlocked: userStreak >= 7,
      reward: "+100 XP",
    },
    {
      id: "streak_14",
      title: "Flame Master",
      desc: "Pertahankan 14 Hari Streak",
      icon: "🌋",
      category: "streak",
      tier: "gold",
      currentValue: userStreak,
      maxValue: 14,
      unlocked: userStreak >= 14,
      reward: "+300 XP",
    },
    {
      id: "streak_30",
      title: "Eternal Flame",
      desc: "Pertahankan 30 Hari Streak",
      icon: "☀️",
      category: "streak",
      tier: "diamond",
      currentValue: userStreak,
      maxValue: 30,
      unlocked: userStreak >= 30,
      reward: "+1000 XP & Badge Berlian",
    },

    // Mastery & Character Tiers
    {
      id: "kana_20",
      title: "Kana Apprentice",
      desc: "Kuasai 20 Karakter Kana",
      icon: "📖",
      category: "mastery",
      tier: "bronze",
      currentValue: totalCharacters,
      maxValue: 20,
      unlocked: totalCharacters >= 20,
      reward: "+50 XP",
    },
    {
      id: "kana_46",
      title: "Kana Scholar",
      desc: "Kuasai 46 Karakter Hiragana",
      icon: "📜",
      category: "mastery",
      tier: "silver",
      currentValue: totalCharacters,
      maxValue: 46,
      unlocked: totalCharacters >= 46,
      reward: "+150 XP",
    },
    {
      id: "kanji_10",
      title: "Kanji Initiate",
      desc: "Pelajari 10 Kanji Pertama",
      icon: "⛩️",
      category: "mastery",
      tier: "bronze",
      currentValue: totalCharacters,
      maxValue: 10,
      unlocked: totalCharacters >= 10,
      reward: "+50 XP",
    },
    {
      id: "kanji_50",
      title: "Kanji Sensei",
      desc: "Pelajari 50 Kanji",
      icon: "✒️",
      category: "mastery",
      tier: "gold",
      currentValue: totalCharacters,
      maxValue: 50,
      unlocked: totalCharacters >= 50,
      reward: "+400 XP",
    },

    // Accuracy Tiers
    {
      id: "accuracy_80",
      title: "Sharp Mind",
      desc: "Mencapai Akurasi Kuis >= 80%",
      icon: "🎯",
      category: "accuracy",
      tier: "bronze",
      currentValue: accuracy,
      maxValue: 80,
      unlocked: accuracy >= 80 && totalCharacters >= 5,
      reward: "+50 XP",
    },
    {
      id: "accuracy_90",
      title: "Perfectionist",
      desc: "Mencapai Akurasi Kuis >= 90%",
      icon: "🎯",
      category: "accuracy",
      tier: "silver",
      currentValue: accuracy,
      maxValue: 90,
      unlocked: accuracy >= 90 && totalCharacters >= 5,
      reward: "+150 XP",
    },
    {
      id: "accuracy_100",
      title: "Zen Master",
      desc: "Mencapai Akurasi Kuis 100% Sempurna",
      icon: "💎",
      category: "accuracy",
      tier: "gold",
      currentValue: accuracy,
      maxValue: 100,
      unlocked: accuracy >= 100 && totalCharacters >= 5,
      reward: "+300 XP",
    },

    // Level Tiers
    {
      id: "level_2",
      title: "First Steps",
      desc: "Capai Level 2",
      icon: "🌱",
      category: "level",
      tier: "bronze",
      currentValue: Math.max(0, level - 1),
      maxValue: 1,
      unlocked: level >= 2,
      reward: "+50 XP",
    },
    {
      id: "level_5",
      title: "Rising Star",
      desc: "Capai Level 5",
      icon: "⭐",
      category: "level",
      tier: "silver",
      currentValue: Math.max(0, level - 1),
      maxValue: 4,
      unlocked: level >= 5,
      reward: "+150 XP",
    },
    {
      id: "level_10",
      title: "JapanApp Legend",
      desc: "Capai Level 10",
      icon: "👑",
      category: "level",
      tier: "gold",
      currentValue: Math.max(0, level - 1),
      maxValue: 9,
      unlocked: level >= 10,
      reward: "+500 XP",
    },
    {
      id: "level_20",
      title: "Shogun Master",
      desc: "Capai Level 20",
      icon: "🏯",
      category: "level",
      tier: "diamond",
      currentValue: Math.max(0, level - 1),
      maxValue: 19,
      unlocked: level >= 20,
      reward: "+1500 XP & Badge Shogun",
    },

    // Quests & Feature Exploration Tiers
    {
      id: "quest_1",
      title: "Daily Challenger",
      desc: "Selesaikan 1 Sesi Kuis Harian",
      icon: "⚔️",
      category: "quests",
      tier: "bronze",
      currentValue: userQuizCount,
      maxValue: 1,
      unlocked: userQuizCount >= 1,
      reward: "+50 XP",
    },
    {
      id: "quest_5",
      title: "Quest Hunter",
      desc: "Selesaikan 5 Sesi Latihan/Kuis",
      icon: "🏹",
      category: "quests",
      tier: "silver",
      currentValue: userQuizCount,
      maxValue: 5,
      unlocked: userQuizCount >= 5,
      reward: "+150 XP",
    },
    {
      id: "explorer",
      title: "Master Explorer",
      desc: "Mulai Belajar Hiragana / Katakana / Kanji",
      icon: "🧭",
      category: "quests",
      tier: "gold",
      currentValue: totalCharacters > 0 ? 1 : 0,
      maxValue: 1,
      unlocked: totalCharacters > 0,
      reward: "+200 XP",
    },
  ], [userStreak, totalCharacters, accuracy, level, userQuizCount]);

  const filteredAchievements = useMemo(() => {
    if (activeAchievementTab === "all") return allAchievementsList;
    return allAchievementsList.filter((a) => a.category === activeAchievementTab);
  }, [activeAchievementTab, allAchievementsList]);

  const unlockedCount = useMemo(() => {
    return allAchievementsList.filter((a) => a.unlocked).length;
  }, [allAchievementsList]);
  const [jlptExpanded, setJlptExpanded] = useState(true);
  const [hoveredKanaChartIdx, setHoveredKanaChartIdx] = useState<number | null>(
    null,
  );
  const [hoveredVocabIdx, setHoveredVocabIdx] = useState<number | null>(null);

  // Heatmap interactive state
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshToast, setRefreshToast] = useState<string | null>(null);
  const [hoveredCellDate, setHoveredCellDate] = useState<{
    displayDate: string;
    exp: number;
    level: number;
  } | null>(null);
  const [highlightedLegendLevel, setHighlightedLegendLevel] = useState<
    number | null
  >(null);

  // Generate 20 weeks x 7 days (140 cells) arranged Sunday to Saturday with rumpang future cells
  const heatmapData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentDayOfWeek = today.getDay(); // 0 = Sun, 6 = Sat
    const currentWeekSunday = new Date(today);
    currentWeekSunday.setDate(today.getDate() - currentDayOfWeek);

    // Start Date: Sunday 19 weeks prior (133 days back from currentWeekSunday)
    const startDate = new Date(currentWeekSunday);
    startDate.setDate(currentWeekSunday.getDate() - 133);

    const cells = [];
    let cellId = 0;

    for (let col = 0; col < 20; col++) {
      for (let row = 0; row < 7; row++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + (col * 7 + row));

        const y = currentDate.getFullYear();
        const m = String(currentDate.getMonth() + 1).padStart(2, "0");
        const d = String(currentDate.getDate()).padStart(2, "0");
        const dateKey = `${y}-${m}-${d}`;

        const monthAbbr = currentDate.toLocaleDateString("en-US", {
          month: "short",
        });
        const displayDate = `${monthAbbr} ${currentDate.getDate()}, ${y}`;

        const isFuture = currentDate > today;

        // REAL-TIME DATA ONLY: Lookup from progress.activityLog and quizHistory
        let exp = 0;
        if (!isFuture) {
          exp = progress.activityLog?.[dateKey] || 0;
          if (exp === 0 && progress.quizHistory) {
            const quizOnDate = progress.quizHistory.find(
              (q) => q.date && q.date.startsWith(dateKey),
            );
            if (quizOnDate) {
              exp = quizOnDate.score * 10 || 15;
            }
          }
        }

        let level = 0;
        if (!isFuture && exp > 0) {
          level = exp < 50 ? 1 : exp < 200 ? 2 : exp < 500 ? 3 : 4;
        }

        cells.push({
          id: cellId++,
          col,
          row,
          dateKey,
          displayDate,
          exp,
          level,
          isFuture,
        });
      }
    }

    // Pick 5 Month Labels evenly spread across 20 columns
    const monthsList: string[] = [];
    for (let col = 0; col < 20; col += 4) {
      const cellDate = new Date(startDate);
      cellDate.setDate(startDate.getDate() + col * 7);
      monthsList.push(cellDate.toLocaleDateString("en-US", { month: "short" }));
    }

    return { cells, monthsList };
  }, [progress.activityLog, progress.quizHistory]);

  // Dynamic studied time calculation
  const studiedTimeStr = useMemo(() => {
    const totalDaysActive = Object.keys(progress.activityLog || {}).length;
    const quizCount = progress.quizHistory?.length || 0;
    const totalMinutes = Math.max(
      0,
      totalDaysActive * 12 +
        quizCount * 4 +
        Math.floor((progress.exp || 0) / 15),
    );

    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      return `${hours}h ${mins}m studied`;
    }
    return `${totalMinutes}m studied`;
  }, [progress.activityLog, progress.quizHistory, progress.exp]);

  // Real Kana stats from progress.mastery (total reviews & most practiced Kana char)
  const kanaStats = useMemo(() => {
    const entries = Object.entries(progress.mastery || {});
    const totalReviews = entries.reduce(
      (acc, [_, item]) => acc + (item.correct || 0) + (item.incorrect || 0),
      0,
    );

    let topChar = "あ";
    let maxAttempts = -1;
    entries.forEach(([char, item]) => {
      const attempts = (item.correct || 0) + (item.incorrect || 0);
      if (attempts > maxAttempts) {
        maxAttempts = attempts;
        topChar = char;
      }
    });

    return {
      reviews: totalReviews, // Pure real data: 0 when local storage is cleared
      fav: topChar,
    };
  }, [progress.mastery]);

  // Real Vocab stats from quizHistory & completedExercises
  const vocabStats = useMemo(() => {
    const vocabQuizzes =
      progress.quizHistory?.filter(
        (q) => q.type === "vocab" || q.type === "vocabulary",
      ) || [];
    const totalVocabReviewed = vocabQuizzes.reduce(
      (acc, q) => acc + (q.total || 0),
      0,
    );
    return {
      reviewed: totalVocabReviewed,
    };
  }, [progress.quizHistory]);

  // Real Grammar stats
  const grammarStats = useMemo(() => {
    const count = progress.completedGrammarSections?.length || 0;
    return {
      points: count,
    };
  }, [progress.completedGrammarSections]);

  // Real Conjugation stats
  const conjStats = useMemo(() => {
    const conjQuizzes =
      progress.quizHistory?.filter(
        (q) => q.type === "conj" || q.type === "conjugation",
      ) || [];
    const totalAttempts = conjQuizzes.reduce(
      (acc, q) => acc + (q.total || 0),
      0,
    );
    return {
      attempts: totalAttempts,
    };
  }, [progress.quizHistory]);

  // Hiragana attempts count from progress.mastery
  const hiraganaAttempts = useMemo(() => {
    return HIRAGANA_CHARS.reduce((acc, c) => {
      const item = progress.mastery?.[c];
      return acc + (item?.correct || 0) + (item?.incorrect || 0);
    }, 0);
  }, [progress.mastery]);

  // Katakana attempts count from progress.mastery
  const katakanaAttempts = useMemo(() => {
    return KATAKANA_CHARS.reduce((acc, c) => {
      const item = progress.mastery?.[c];
      return acc + (item?.correct || 0) + (item?.incorrect || 0);
    }, 0);
  }, [progress.mastery]);

  // Dynamic 7-day Kana practice chart data
  const kanaChartData = useMemo(() => {
    const days = [];
    const attempts = [];
    const accuracy = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);

      const monthAbbr = d.toLocaleDateString("en-US", { month: "short" });
      const dayNum = d.getDate();
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;

      days.push(`${monthAbbr} ${dayNum}`);

      const exp = progress.activityLog?.[dateStr] || 0;
      let dayAttempts = 0;
      let dayAccuracy = 0;

      if (exp > 0) {
        dayAttempts = Math.min(10, Math.ceil(exp / 15) || 5);
        dayAccuracy = 100;
      } else if (progress.quizHistory) {
        const quizOnDate = progress.quizHistory.find(
          (q) => q.date && q.date.startsWith(dateStr),
        );
        if (quizOnDate) {
          dayAttempts = quizOnDate.total || 5;
          dayAccuracy =
            Math.round((quizOnDate.score / (quizOnDate.total || 1)) * 100) ||
            100;
        }
      }

      attempts.push(dayAttempts);
      accuracy.push(dayAccuracy);
    }

    const maxAttempts = Math.max(5, ...attempts);

    return { days, attempts, accuracy, maxAttempts };
  }, [progress.activityLog, progress.quizHistory]);

  // Dynamic Master Kanas progress calculation
  const masterKanaStats = useMemo(() => {
    const mastery = progress.mastery || {};
    const hiraganaDone = HIRAGANA_CHARS.filter(
      (c) => (mastery[c]?.correct || 0) > 0 || (mastery[c]?.incorrect || 0) > 0,
    ).length;

    const katakanaDone = KATAKANA_CHARS.filter(
      (c) => (mastery[c]?.correct || 0) > 0 || (mastery[c]?.incorrect || 0) > 0,
    ).length;

    const hiraganaPct = Math.min(100, Math.round((hiraganaDone / 46) * 100));
    const katakanaPct = Math.min(100, Math.round((katakanaDone / 46) * 100));

    const totalDone = hiraganaDone + katakanaDone;
    const isFullyMastered = hiraganaPct === 100 && katakanaPct === 100;

    return {
      hiraganaDone,
      hiraganaPct,
      katakanaDone,
      katakanaPct,
      totalDone,
      isFullyMastered,
    };
  }, [progress.mastery]);

  // Dynamic JLPT & Basic Level Progress calculation (Basic, N5 - N1)
  const realJlptData = useMemo(() => {
    const mastery = progress.mastery || {};
    const masteryKeys = Object.keys(mastery);
    const completedGrammar = progress.completedGrammarSections?.length || 0;
    const completedExercises = progress.completedExercises?.length || 0;

    // Count Hiragana & Katakana mastered
    const hiraganaDone = HIRAGANA_CHARS.filter(
      (c) => (mastery[c]?.correct || 0) > 0 || (mastery[c]?.incorrect || 0) > 0,
    ).length;

    const katakanaDone = KATAKANA_CHARS.filter(
      (c) => (mastery[c]?.correct || 0) > 0 || (mastery[c]?.incorrect || 0) > 0,
    ).length;

    const basicTotalDone = Math.min(92, hiraganaDone + katakanaDone);
    const basicPct = Math.min(100, Math.round((basicTotalDone / 92) * 100));

    const basicRow = {
      level: "Basic",
      total: 92,
      isBasic: true,
      subLeftLabel: "Hiragana",
      subLeftDone: hiraganaDone,
      subLeftTotal: 46,
      subRightLabel: "Katakana",
      subRightDone: katakanaDone,
      subRightTotal: 46,
      totalDone: basicTotalDone,
      pct: basicPct,
    };

    const jlptRows = jlptData.map((d) => {
      let vocabDone = 0;
      let grammarDone = 0;

      if (d.level === "N5") {
        vocabDone = Math.min(
          d.vocab,
          Math.floor(masteryKeys.length * 0.7 + completedExercises * 2),
        );
        grammarDone = Math.min(d.grammar, completedGrammar);
      } else if (d.level === "N4") {
        vocabDone = Math.min(d.vocab, Math.floor(masteryKeys.length * 0.2));
        grammarDone = Math.min(d.grammar, Math.max(0, completedGrammar - 146));
      } else if (d.level === "N3") {
        vocabDone = Math.min(d.vocab, Math.floor(masteryKeys.length * 0.08));
        grammarDone = 0;
      } else {
        vocabDone = 0;
        grammarDone = 0;
      }

      const totalDone = vocabDone + grammarDone;
      const pct = Math.min(100, Math.round((totalDone / d.total) * 100));

      return {
        ...d,
        isBasic: false,
        subLeftLabel: "Vocabulary",
        subLeftDone: vocabDone,
        subLeftTotal: d.vocab,
        subRightLabel: "Grammar",
        subRightDone: grammarDone,
        subRightTotal: d.grammar,
        totalDone,
        pct,
      };
    });

    return [basicRow, ...jlptRows];
  }, [
    progress.mastery,
    progress.completedGrammarSections,
    progress.completedExercises,
  ]);

  // Refresh & synchronize handler
  const handleRefreshHeatmap = () => {
    setIsRefreshing(true);
    checkStreak();
    setRefreshToast("Activity heatmap synchronized!");

    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);

    setTimeout(() => {
      setRefreshToast(null);
    }, 2500);
  };

  return (
    <PageWrapper>
      <Profile2GlobalStyle />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
        ]}
        current="Profile"
      />

      <LayoutGrid>
        {/* ─── SIDEBAR (LEFT 290px) ──────────────────────────────────────── */}
        <Sidebar>
          {/* User Profile Card */}
          <ProfileCard>
            <ProfileTop>
              <ProfileAvatar>{progress.profile?.avatar || "🌳"}</ProfileAvatar>
              <div>
                <ProfileName>
                  {progress.profile?.username ||
                    progress.profile?.displayName ||
                    "stjp225"}{" "}
                  <span className="crown" title="VIP Student">
                    ♛
                  </span>
                </ProfileName>
                <ProfileMeta>
                  <span>🕐 {studiedTimeStr}</span>
                  <span>👥 0 friends</span>
                </ProfileMeta>
              </div>
            </ProfileTop>

            {/* Heatmap Grid */}
            <HeatmapWrap>
              {refreshToast && (
                <div className="refresh-toast">{refreshToast}</div>
              )}

              <SectionLabel>Activity</SectionLabel>
              <HeatmapMonths>
                {heatmapData.monthsList.map((m, idx) => (
                  <span key={idx}>{m}</span>
                ))}
              </HeatmapMonths>
              <HeatmapGrid>
                {heatmapData.cells.map((cell) => (
                  <HeatmapCell
                    key={cell.id}
                    $level={cell.level}
                    $highlighted={highlightedLegendLevel === cell.level}
                    $isFuture={cell.isFuture}
                    onMouseEnter={() => {
                      if (!cell.isFuture) {
                        setHoveredCellDate({
                          displayDate: cell.displayDate,
                          exp: cell.exp,
                          level: cell.level,
                        });
                      }
                    }}
                    onMouseLeave={() => setHoveredCellDate(null)}
                  />
                ))}
              </HeatmapGrid>

              {/* Clean Inline Cell Info Bar (No Overlapping Elements!) */}
              <div className="cell-info-bar">
                {hoveredCellDate ? (
                  <>
                    <span className="info-date">
                      {hoveredCellDate.displayDate}
                    </span>
                    <span className="info-exp">
                      {hoveredCellDate.level === 0
                        ? "No activity"
                        : `${hoveredCellDate.exp > 0 ? `${hoveredCellDate.exp} EXP` : "Active"}`}
                    </span>
                  </>
                ) : (
                  <>
                    <span>Current Streak</span>
                    <span className="info-exp">
                      {progress.streak || 0} days
                    </span>
                  </>
                )}
              </div>

              <HeatmapFoot>
                <button
                  type="button"
                  className={`refresh-btn ${isRefreshing ? "spinning" : ""}`}
                  onClick={handleRefreshHeatmap}
                  title="Refresh Activity Heatmap"
                >
                  <span className="refresh-ico">↻</span> Sync
                </button>
                <div className="legend">
                  Less
                  {[0, 1, 2, 3, 4].map((lvl) => (
                    <span
                      key={lvl}
                      className="legend-item"
                      onMouseEnter={() => setHighlightedLegendLevel(lvl)}
                      onMouseLeave={() => setHighlightedLegendLevel(null)}
                      title={`Level ${lvl} Activity`}
                    >
                      <HeatmapCell
                        $level={lvl}
                        $highlighted={highlightedLegendLevel === lvl}
                      />
                    </span>
                  ))}
                  More
                </div>
              </HeatmapFoot>
            </HeatmapWrap>
          </ProfileCard>

          {/* Discord Community Banner */}
          {showDiscord && (
            <DiscordBanner>
              <span
                className="close-x"
                onClick={() => setShowDiscord(false)}
                title="Close Banner"
              >
                ✕
              </span>
              <div className="banner-header">
                <div className="discord-icon">🎮</div>
                <div className="banner-text">
                  <div className="title">Join our New Discord Community</div>
                  <div className="sub">
                    Get discounts, ask questions and more!
                  </div>
                </div>
              </div>
              <button
                className="btn-join"
                onClick={() => window.open("https://discord.gg", "_blank")}
              >
                Join Community
              </button>
            </DiscordBanner>
          )}

          {/* Start Here Step 1 Card */}
          <StartHereCard>
            <span className="start-tag">START HERE</span>
            <div className="start-row">
              <div className="start-info">
                <div className="start-icon">あ</div>
                <div>
                  <div className="start-step">STEP 1 · KANA FOUNDATION</div>
                  <div className="start-title">Practice Kana</div>
                </div>
              </div>
              <Link href="/kana" style={{ textDecoration: "none" }}>
                <button className="btn-go">Go →</button>
              </Link>
            </div>
          </StartHereCard>

          {/* Stat Counter Grid */}
          <StatRowGrid>
            {/* Column 1: STREAK */}
            <div className="stat-item">
              <div className="stat-label">Streak</div>
              <div className="stat-value">
                {progress.streak || 0} <span className="emoji">🔥</span>
              </div>
              <div className="stat-sub">
                {progress.streak === 1 ? "day" : "days"}
              </div>
            </div>

            {/* Column 2: REVIEWS / ATTEMPTS BY ACTIVE TAB */}
            <div className="stat-item">
              <div className="stat-label">
                {activeTab === "kana"
                  ? "Kanas"
                  : activeTab === "vocab"
                    ? "Vocab"
                    : activeTab === "grammar"
                      ? "Grammar"
                      : "Conj"}
              </div>
              <div className="stat-value">
                {activeTab === "kana"
                  ? kanaStats.reviews
                  : activeTab === "vocab"
                    ? vocabStats.reviewed
                    : activeTab === "grammar"
                      ? grammarStats.points
                      : conjStats.attempts}{" "}
                <span className="emoji">
                  {activeTab === "kana"
                    ? "✏️"
                    : activeTab === "vocab"
                      ? "📚"
                      : activeTab === "grammar"
                        ? "📌"
                        : "🔄"}
                </span>
              </div>
              <div className="stat-sub">
                {activeTab === "kana"
                  ? "reviews"
                  : activeTab === "vocab"
                    ? "reviewed"
                    : activeTab === "grammar"
                      ? "points"
                      : "attempts"}
              </div>
            </div>

            {/* Column 3: FAVORITE CATEGORY / KANA CHAR BY ACTIVE TAB */}
            <div className="stat-item">
              <div className="stat-label">Favorite</div>
              <div className="stat-value jp">
                <span
                  style={{
                    color:
                      activeTab === "kana"
                        ? "#ec4899"
                        : activeTab === "vocab"
                          ? "#3b82f6"
                          : activeTab === "grammar"
                            ? "#ec4899"
                            : "#14b8a6",
                  }}
                >
                  {activeTab === "kana"
                    ? kanaStats.fav
                    : activeTab === "vocab"
                      ? "語"
                      : activeTab === "grammar"
                        ? "文"
                        : "活"}
                </span>{" "}
                <span className="emoji">⭐</span>
              </div>
              <div className="stat-sub">
                {activeTab === "kana"
                  ? "kana"
                  : activeTab === "vocab"
                    ? "vocab"
                    : activeTab === "grammar"
                      ? "grammar"
                      : "conj"}
              </div>
            </div>
          </StatRowGrid>

          {/* JLPT Progress Breakdown */}
          <JlptProgressCard>
            <div
              className="jlpt-header"
              onClick={() => setJlptExpanded(!jlptExpanded)}
            >
              <div className="jlpt-title">JLPT Progress</div>
              <span className="chev">{jlptExpanded ? "▴" : "▾"}</span>
            </div>

            {jlptExpanded && (
              <div className="jlpt-list">
                {realJlptData.map((d) => (
                  <div key={d.level}>
                    <div className="jlpt-row-top">
                      <span className="jlpt-level">{d.level}</span>
                      <span>
                        <span style={{ color: "var(--text-secondary)" }}>
                          {d.totalDone}/{d.total} items
                        </span>
                        <span className="jlpt-pct">{d.pct}%</span>
                      </span>
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${d.pct}%`,
                          transition: "width 0.4s ease",
                        }}
                      ></div>
                    </div>
                    <div className="jlpt-split">
                      <span>
                        {d.subLeftLabel}: {d.subLeftDone}/{d.subLeftTotal}
                      </span>
                      <span>
                        {d.subRightLabel}: {d.subRightDone}/{d.subRightTotal}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </JlptProgressCard>
        </Sidebar>

        {/* ─── MAIN CONTENT (RIGHT) ────────────────────────────────────────── */}
        <MainContent>
          {/* Practice Banner */}
          <Link href="/kana" style={{ textDecoration: "none" }}>
            <PracticeBanner style={{ cursor: "pointer" }}>
              <span className="kana-mini">あア</span> Practice Kanas &nbsp;{" "}
              {masterKanaStats.totalDone}/92
            </PracticeBanner>
          </Link>

          {/* Master Kanas Card */}
          <MasterCard>
            <h2>Master Kanas First</h2>
            <p>
              {masterKanaStats.isFullyMastered
                ? "🎉 Congratulations! You have mastered both Hiragana and Katakana. All vocabulary and grammar lessons are fully unlocked!"
                : "You need to master both Hiragana and Katakana before unlocking vocabulary and grammar lessons."}
            </p>

            <Link href="/kana" style={{ textDecoration: "none" }}>
              <div className="prog-row" style={{ cursor: "pointer" }}>
                <div className="prog-top">
                  <span className="left">
                    <span className="prog-icon">あ</span> Hiragana (
                    {masterKanaStats.hiraganaDone}/46)
                  </span>
                  <span>{masterKanaStats.hiraganaPct}%</span>
                </div>
                <div className="prog-track">
                  <div
                    className="prog-fill"
                    style={{
                      width: `${masterKanaStats.hiraganaPct}%`,
                      transition: "width 0.4s ease",
                      background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                    }}
                  ></div>
                </div>
              </div>
            </Link>

            <Link href="/kana" style={{ textDecoration: "none" }}>
              <div className="prog-row" style={{ cursor: "pointer" }}>
                <div className="prog-top">
                  <span className="left">
                    <span className="prog-icon">ア</span> Katakana (
                    {masterKanaStats.katakanaDone}/46)
                  </span>
                  <span>{masterKanaStats.katakanaPct}%</span>
                </div>
                <div className="prog-track">
                  <div
                    className="prog-fill"
                    style={{
                      width: `${masterKanaStats.katakanaPct}%`,
                      transition: "width 0.4s ease",
                      background: "linear-gradient(90deg, #3b82f6, #14b8a6)",
                    }}
                  ></div>
                </div>
              </div>
            </Link>
          </MasterCard>

          {/* Tabs Bar */}
          <TabsBar>
            <TabItem
              $active={activeTab === "kana"}
              onClick={() => setActiveTab("kana")}
            >
              Kana
            </TabItem>
            <TabItem
              $active={activeTab === "vocab"}
              onClick={() => setActiveTab("vocab")}
            >
              Vocabulary
            </TabItem>
            <TabItem
              $active={activeTab === "grammar"}
              onClick={() => setActiveTab("grammar")}
            >
              Grammar
            </TabItem>
            <TabItem
              $active={activeTab === "conj"}
              onClick={() => setActiveTab("conj")}
            >
              Conjugation
            </TabItem>
            <TabItem
              $active={activeTab === "others"}
              onClick={() => setActiveTab("others")}
            >
              Lainnya
            </TabItem>
          </TabsBar>

          {/* Kana Panel */}
          {activeTab === "kana" && (
            <KanaPanel>
              <div>
                <div className="kana-panel-head">
                  <span className="tag-ico">あ</span> KANA
                </div>
              </div>

              <div>
                <h3 className="block-title">Kana Proficiency</h3>
                <div className="kana-cols">
                  <div className="kana-col">
                    <h4>hiragana</h4>
                    <div className="attempts">
                      ({hiraganaAttempts} attempts)
                    </div>
                    <Link href="/kana?type=hiragana">
                      <div className="focus-btn">Focus Area</div>
                    </Link>
                    <div className="good-status">
                      {masterKanaStats.hiraganaDone === 46
                        ? "All 46 Hiragana characters mastered!"
                        : `${masterKanaStats.hiraganaDone}/46 characters practiced`}
                    </div>
                  </div>
                  <div className="kana-col">
                    <h4>katakana</h4>
                    <div className="attempts">
                      ({katakanaAttempts} attempts)
                    </div>
                    <Link href="/kana?type=katakana">
                      <div className="focus-btn">Focus Area</div>
                    </Link>
                    <div className="good-status">
                      {masterKanaStats.katakanaDone === 46
                        ? "All 46 Katakana characters mastered!"
                        : `${masterKanaStats.katakanaDone}/46 characters practiced`}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="block-title">Practice Activity Over Time</h3>
                <div className="chart-legend">
                  <span>
                    <span
                      className="legend-dot"
                      style={{ background: "#8b7cff" }}
                    ></span>
                    Total Attempts
                  </span>
                  <span>
                    <span
                      className="legend-dot"
                      style={{ background: "#10b981" }}
                    ></span>
                    Accuracy %
                  </span>
                </div>

                {/* Interactive SVG Chart */}
                <div className="chart-wrap" style={{ position: "relative" }}>
                  {hoveredKanaChartIdx !== null && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: `${60 + (hoveredKanaChartIdx * 880) / 6}px`,
                        transform: "translateX(-50%)",
                        background: "#0b0f19",
                        border: "1px solid rgba(139, 124, 255, 0.4)",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#fff",
                        zIndex: 20,
                        boxShadow: "0 6px 16px rgba(0,0,0,0.6)",
                        pointerEvents: "none",
                      }}
                    >
                      <div>{kanaChartData.days[hoveredKanaChartIdx]}</div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#8b7cff",
                          marginTop: "2px",
                        }}
                      >
                        {kanaChartData.attempts[hoveredKanaChartIdx]} attempts •{" "}
                        <span style={{ color: "#10b981" }}>
                          {kanaChartData.accuracy[hoveredKanaChartIdx]}%
                          accuracy
                        </span>
                      </div>
                    </div>
                  )}

                  <svg
                    width="100%"
                    height="330"
                    viewBox="0 0 1000 330"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Grid Lines */}
                    {[0, 1, 2, 3, 4, 5].map((g) => {
                      const val = (g / 5) * kanaChartData.maxAttempts;
                      const y = 25 + 240 - (g / 5) * 240;
                      return (
                        <g key={g}>
                          <line
                            x1="55"
                            x2="940"
                            y1={y}
                            y2={y}
                            stroke="var(--border)"
                            strokeWidth="1.2"
                          />
                          <text
                            x="45"
                            y={y + 5}
                            textAnchor="end"
                            fontSize="14"
                            fontWeight="800"
                            fill="var(--text-secondary)"
                          >
                            {val.toFixed(1)}
                          </text>
                        </g>
                      );
                    })}

                    {/* X Axis Labels */}
                    {kanaChartData.days.map((d, i) => {
                      const x =
                        60 + (i * 880) / (kanaChartData.days.length - 1);
                      return (
                        <text
                          key={d}
                          x={x}
                          y="300"
                          textAnchor="middle"
                          fontSize="14"
                          fontWeight="800"
                          fill="var(--text-secondary)"
                        >
                          {d}
                        </text>
                      );
                    })}

                    {/* Accuracy Green Highlighted Polygon */}
                    {kanaChartData.accuracy.map((acc, i) => {
                      if (acc === 0) return null;
                      const x1 = 60 + ((i - 0.4) * 880) / 6;
                      const x2 = 60 + ((i + 0.4) * 880) / 6;
                      return (
                        <polygon
                          key={i}
                          points={`${x1},265 ${x1},25 ${x2},25 ${x2},265`}
                          fill="rgba(16, 185, 129, 0.25)"
                        />
                      );
                    })}

                    {/* Attempts Polyline */}
                    <polyline
                      points={kanaChartData.attempts
                        .map((v, i) => {
                          const x = 60 + (i * 880) / 6;
                          const y =
                            25 + 240 - (v / kanaChartData.maxAttempts) * 240;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="#8b7cff"
                      strokeWidth="4"
                    />

                    {/* Interactive Circles */}
                    {kanaChartData.attempts.map((v, i) => {
                      const x = 60 + (i * 880) / 6;
                      const y =
                        25 + 240 - (v / kanaChartData.maxAttempts) * 240;
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r={hoveredKanaChartIdx === i ? "10" : "7"}
                          fill="#8b7cff"
                          stroke="#ffffff"
                          strokeWidth={hoveredKanaChartIdx === i ? "3" : "0"}
                          style={{
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                          onMouseEnter={() => setHoveredKanaChartIdx(i)}
                          onMouseLeave={() => setHoveredKanaChartIdx(null)}
                        />
                      );
                    })}

                    {/* Right Axis Accuracy % */}
                    {[0, 20, 40, 60, 80, 100].map((p) => {
                      const y = 25 + 240 - (p / 100) * 240;
                      return (
                        <text
                          key={p}
                          x="950"
                          y={y + 5}
                          textAnchor="start"
                          fontSize="13"
                          fontWeight="800"
                          fill="var(--text-secondary)"
                        >
                          {p}%
                        </text>
                      );
                    })}
                  </svg>
                </div>
              </div>

              <Link href="/kana" style={{ textDecoration: "none" }}>
                <div className="view-link">View Kana progress →</div>
              </Link>
            </KanaPanel>
          )}

          {/* Vocabulary / Grammar Panel */}
          {(activeTab === "vocab" || activeTab === "grammar") && (
            <VocabPanel>
              <div>
                <div
                  className="vocab-panel-head"
                  style={{
                    color: activeTab === "vocab" ? "#3b82f6" : "#ec4899",
                    background:
                      activeTab === "vocab"
                        ? "rgba(59, 130, 246, 0.12)"
                        : "rgba(236, 72, 153, 0.12)",
                    borderColor:
                      activeTab === "vocab"
                        ? "rgba(59, 130, 246, 0.25)"
                        : "rgba(236, 72, 153, 0.25)",
                  }}
                >
                  <span className="tag-ico">
                    {activeTab === "vocab" ? "📘" : "📌"}
                  </span>{" "}
                  {activeTab === "vocab" ? "VOCABULARY" : "GRAMMAR"}
                </div>
              </div>

              {/* 3 Stat Counter Grid */}
              <div className="vocab-stat-grid">
                <div className="v-stat-item">
                  <div className="v-label">Reviews</div>
                  <div className="v-val">0</div>
                </div>
                <div className="v-stat-item">
                  <div className="v-label">Learned</div>
                  <div className="v-val green">0</div>
                </div>
                <div className="v-stat-item">
                  <div className="v-label">Accuracy</div>
                  <div className="v-val blue">0%</div>
                </div>
              </div>

              {/* Overview */}
              <div>
                <h3 className="block-title">
                  {activeTab === "vocab"
                    ? "Vocabulary Overview"
                    : activeTab === "grammar"
                      ? "Grammar Overview"
                      : "Conjugation Overview"}
                </h3>
                <div className="chart-legend">
                  <span>
                    <span
                      className="legend-dot"
                      style={{ background: "#3b82f6" }}
                    ></span>
                    {activeTab === "vocab"
                      ? "Words Reviewed"
                      : activeTab === "grammar"
                        ? "Grammar Points Reviewed"
                        : "Forms Reviewed"}
                  </span>
                  <span>
                    <span
                      className="legend-dot"
                      style={{ background: "#a855f7" }}
                    ></span>
                    {activeTab === "vocab"
                      ? "New Words Learned"
                      : activeTab === "grammar"
                        ? "New Grammar Points"
                        : "New Forms Learned"}
                  </span>
                  <span>
                    <span
                      className="legend-dot"
                      style={{ background: "#10b981" }}
                    ></span>
                    Accuracy %
                  </span>
                </div>

                <div className="chart-wrap">
                  <svg
                    width="100%"
                    height="330"
                    viewBox="0 0 1000 330"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Y-Axis Label left */}
                    <text
                      x="20"
                      y="150"
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="700"
                      fill="var(--text-secondary)"
                      transform="rotate(-90 20 150)"
                    >
                      Counts
                    </text>

                    {/* Y-Axis Label right */}
                    <text
                      x="985"
                      y="150"
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="700"
                      fill="var(--text-secondary)"
                      transform="rotate(90 985 150)"
                    >
                      Accuracy
                    </text>

                    {/* Grid Lines */}
                    {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map(
                      (g, idx) => {
                        const y = 25 + 240 - (idx / 10) * 240;
                        return (
                          <g key={g}>
                            <line
                              x1="55"
                              x2="940"
                              y1={y}
                              y2={y}
                              stroke="var(--border)"
                              strokeWidth="1"
                              strokeDasharray={g === 0 ? "none" : "3,3"}
                              opacity={g === 0 ? 0.6 : 0.25}
                            />
                            <text
                              x="45"
                              y={y + 4}
                              textAnchor="end"
                              fontSize="12"
                              fontWeight="600"
                              fill="var(--text-secondary)"
                            >
                              {g === 0 || g === 1 ? g : g.toFixed(1)}
                            </text>
                          </g>
                        );
                      },
                    )}

                    {/* X Axis Labels */}
                    {vocabDays.map((d, i) => {
                      const x = 60 + (i * 880) / (vocabDays.length - 1);
                      return (
                        <text
                          key={d}
                          x={x}
                          y="300"
                          textAnchor="middle"
                          fontSize="13"
                          fontWeight="700"
                          fill="var(--text-secondary)"
                        >
                          {d}
                        </text>
                      );
                    })}

                    {/* 1. Reviewed Series (Blue Line & Dots) */}
                    <polyline
                      points={vocabReviewed
                        .map((v, i) => {
                          const x = 60 + (i * 880) / (vocabDays.length - 1);
                          const y = 25 + 240 - (v / 1.0) * 240;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3.5"
                    />
                    {vocabReviewed.map((v, i) => {
                      const x = 60 + (i * 880) / (vocabDays.length - 1);
                      const y = 25 + 240 - (v / 1.0) * 240;
                      return (
                        <circle
                          key={`rev-${i}`}
                          cx={x}
                          cy={y}
                          r="6"
                          fill="#3b82f6"
                        />
                      );
                    })}

                    {/* 2. Learned Series (Purple Dashed Line & Dots) */}
                    <polyline
                      points={vocabLearned
                        .map((v, i) => {
                          const x = 60 + (i * 880) / (vocabDays.length - 1);
                          const y = 25 + 240 - (v / 1.0) * 240;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="3"
                      strokeDasharray="4 4"
                    />
                    {vocabLearned.map((v, i) => {
                      const x = 60 + (i * 880) / (vocabDays.length - 1);
                      const y = 25 + 240 - (v / 1.0) * 240;
                      return (
                        <circle
                          key={`lrn-${i}`}
                          cx={x}
                          cy={y}
                          r="5"
                          fill="#a855f7"
                        />
                      );
                    })}

                    {/* 3. Accuracy % Series (Green Line & Dots) */}
                    <polyline
                      points={vocabAccuracy
                        .map((v, i) => {
                          const x = 60 + (i * 880) / (vocabDays.length - 1);
                          const y = 25 + 240 - (v / 100) * 240;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                    />
                    {vocabAccuracy.map((v, i) => {
                      const x = 60 + (i * 880) / (vocabDays.length - 1);
                      const y = 25 + 240 - (v / 100) * 240;
                      return (
                        <circle
                          key={`acc-${i}`}
                          cx={x}
                          cy={y}
                          r="5"
                          fill="#10b981"
                        />
                      );
                    })}

                    {/* Interactive Hover Hit-Areas for 7 Days */}
                    {vocabDays.map((d, i) => {
                      const x = 60 + (i * 880) / (vocabDays.length - 1);
                      return (
                        <rect
                          key={`hover-area-${i}`}
                          x={x - 40}
                          y="20"
                          width="80"
                          height="260"
                          fill="transparent"
                          style={{ cursor: "pointer" }}
                          onMouseEnter={() => setHoveredVocabIdx(i)}
                          onMouseLeave={() => setHoveredVocabIdx(null)}
                          onTouchStart={() => setHoveredVocabIdx(i)}
                        />
                      );
                    })}

                    {/* Active Hover Vertical Line Guide */}
                    {hoveredVocabIdx !== null && (
                      <line
                        x1={
                          60 + (hoveredVocabIdx * 880) / (vocabDays.length - 1)
                        }
                        x2={
                          60 + (hoveredVocabIdx * 880) / (vocabDays.length - 1)
                        }
                        y1="25"
                        y2="265"
                        stroke="rgba(255, 255, 255, 0.3)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                    )}

                    {/* Hover Tooltip Card (Gambar Screenshot User 100% Exact!) */}
                    {hoveredVocabIdx !== null &&
                      (() => {
                        const hoverX =
                          60 + (hoveredVocabIdx * 880) / (vocabDays.length - 1);
                        const ttWidth = 190;
                        const ttHeight = 90;
                        let ttX = hoverX - 95;
                        if (ttX < 55) ttX = 55;
                        if (ttX + ttWidth > 940) ttX = 940 - ttWidth;
                        const ttY = 130;
                        const dateStr = vocabDays[hoveredVocabIdx];

                        const lbl1 =
                          activeTab === "vocab"
                            ? "Words Reviewed"
                            : "Grammar Points Reviewed";
                        const lbl2 =
                          activeTab === "vocab"
                            ? "New Words Learned"
                            : "New Grammar Points";

                        return (
                          <g transform={`translate(${ttX}, ${ttY})`}>
                            {/* Tooltip Background Card */}
                            <rect
                              x="0"
                              y="0"
                              width={ttWidth}
                              height={ttHeight}
                              rx="8"
                              fill="#0b0f19"
                              stroke="rgba(255, 255, 255, 0.2)"
                              strokeWidth="1.2"
                              filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.65))"
                            />
                            {/* Date Header */}
                            <text
                              x="12"
                              y="22"
                              fill="#ffffff"
                              fontSize="13"
                              fontWeight="800"
                            >
                              {dateStr}
                            </text>
                            {/* Row 1 */}
                            <rect
                              x="12"
                              y="32"
                              width="10"
                              height="10"
                              rx="2"
                              fill="#3b82f6"
                            />
                            <text
                              x="28"
                              y="41"
                              fill="#e2e8f0"
                              fontSize="11"
                              fontWeight="600"
                            >
                              {lbl1}: {vocabReviewed[hoveredVocabIdx]}
                            </text>

                            {/* Row 2 */}
                            <rect
                              x="12"
                              y="49"
                              width="10"
                              height="10"
                              rx="2"
                              fill="#a855f7"
                            />
                            <text
                              x="28"
                              y="58"
                              fill="#e2e8f0"
                              fontSize="11"
                              fontWeight="600"
                            >
                              {lbl2}: {vocabLearned[hoveredVocabIdx]}
                            </text>

                            {/* Row 3 */}
                            <rect
                              x="12"
                              y="66"
                              width="10"
                              height="10"
                              rx="2"
                              fill="#10b981"
                            />
                            <text
                              x="28"
                              y="75"
                              fill="#e2e8f0"
                              fontSize="11"
                              fontWeight="600"
                            >
                              Accuracy %: {vocabAccuracy[hoveredVocabIdx]}
                            </text>
                          </g>
                        );
                      })()}

                    {/* Right Axis Accuracy % */}
                    {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
                      (p, idx) => {
                        const y = 25 + 240 - (idx / 10) * 240;
                        return (
                          <text
                            key={p}
                            x="950"
                            y={y + 4}
                            textAnchor="start"
                            fontSize="11"
                            fontWeight="600"
                            fill="var(--text-secondary)"
                          >
                            {p}%
                          </text>
                        );
                      },
                    )}
                  </svg>
                </div>
              </div>

              {/* Knowledge Distribution by JLPT Level */}
              <div>
                <h3 className="block-title">
                  Knowledge Distribution by JLPT Level
                </h3>
                <div className="empty-distribution-box">
                  <div className="main-txt">
                    No {activeTab === "vocab" ? "vocabulary" : activeTab} data
                    yet
                  </div>
                  <div className="sub-txt">
                    Start learning to see your knowledge distribution
                  </div>
                </div>
              </div>

              {/* Struggle Section */}
              <div>
                <h3 className="block-title">
                  {activeTab === "vocab"
                    ? "Words You Struggle With"
                    : "Grammar Points You Struggle With"}
                </h3>
                <div className="struggle-table">
                  {activeTab === "grammar" ? (
                    <div
                      className="table-head"
                      style={{ gridTemplateColumns: "1.5fr 2fr 1fr" }}
                    >
                      <div>Grammar Point</div>
                      <div>Meaning</div>
                      <div style={{ textAlign: "right" }}>Accuracy</div>
                    </div>
                  ) : (
                    <div className="table-head">
                      <div>Word</div>
                      <div>Reading</div>
                      <div>Meaning</div>
                      <div style={{ textAlign: "right" }}>Accuracy</div>
                    </div>
                  )}
                  <div className="table-empty">
                    {activeTab === "vocab"
                      ? "No struggling words - great job!"
                      : "No struggling grammar points - great job!"}
                  </div>
                </div>
              </div>

              <Link
                href={activeTab === "vocab" ? "/vocabulary" : "/grammar"}
                style={{ textDecoration: "none" }}
              >
                <div className="view-link">
                  View {activeTab === "vocab" ? "Vocabulary" : "Grammar"}{" "}
                  progress →
                </div>
              </Link>
            </VocabPanel>
          )}

          {/* Conjugation Panel (Rombak Presisi Gambar 1) */}
          {activeTab === "conj" && (
            <ConjPanel>
              <div>
                <div className="conj-panel-head">
                  <span className="tag-ico">🔄</span> CONJUGATION
                </div>
              </div>

              <div className="conj-grid-layout">
                {/* Left Column: Progress by form */}
                <div>
                  <h3 className="block-title">Progress by form</h3>
                  <div className="conj-cards-grid">
                    {conjForms.map((item) => (
                      <Link
                        key={item.id}
                        href={`/conjugation?form=${item.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="conj-card">
                          <div className="card-top">
                            <span className="card-title">{item.title}</span>
                            <span className="card-arrow">→</span>
                          </div>
                          <div className="card-sub">
                            {item.attempts === 0
                              ? "No attempts yet"
                              : `${item.attempts} attempts`}
                          </div>
                          <div className="progress-bar-track">
                            <div
                              className="progress-bar-fill"
                              style={{
                                width: item.attempts > 0 ? "50%" : "0%",
                              }}
                            />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right Column: Accuracy & Last 10 */}
                <div className="conj-sidebar-block">
                  <div className="side-section">
                    <div className="side-label">Accuracy</div>
                    <div className="accuracy-dot" />
                    <div className="accuracy-val">0.0%</div>
                  </div>

                  <div className="side-section">
                    <div className="side-label">Last 10</div>
                    <div className="empty-last10">No recent activity yet.</div>
                  </div>
                </div>
              </div>

              <Link href="/conjugation" style={{ textDecoration: "none" }}>
                <div className="view-link">View Conjugation progress →</div>
              </Link>
            </ConjPanel>
          )}

          {/* Others / Lainnya Panel */}
          {activeTab === "others" && (
            <OthersPanel>
              <div>
                <div className="others-panel-head">
                  <span className="tag-ico">他</span> LAINNYA
                </div>
              </div>

              {/* 1. Level Progress & Daily Goal */}
              <div>
                <h3 className="block-title">Level & Daily Study Goal</h3>
                <GridTwoCol>
                  <GoalCard>
                    <GoalHeader>
                      <h3>Level {level} Progress</h3>
                      <span>
                        {Math.round(progressToNext)}% to Level {level + 1}
                      </span>
                    </GoalHeader>
                    <LevelProgressBar>
                      <ProgressBarFill $width={progressToNext} />
                    </LevelProgressBar>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {nextLevelExp - (progress.exp || 0)} EXP needed to reach
                      Level {level + 1}
                    </p>
                  </GoalCard>

                  <GoalCard>
                    <GoalHeader>
                      <h3>Daily Study Goal</h3>
                      <span>
                        {dailyGoalCurrent} / {targetGoal} EXP
                      </span>
                    </GoalHeader>
                    <LevelProgressBar>
                      <ProgressBarFill $width={goalPercent} />
                    </LevelProgressBar>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {goalPercent >= 100
                        ? "🎉 Daily goal achieved! You're amazing."
                        : `Only ${targetGoal - dailyGoalCurrent} EXP left to hit your daily target!`}
                    </p>
                  </GoalCard>
                </GridTwoCol>
              </div>

              {/* 2. League Status */}
              <div>
                <h3 className="block-title">League Status & Leaderboard</h3>
                <LeagueCard onClick={() => setShowLeaderboardModal(true)}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "16px",
                        background: leagueInfo.badgeBg,
                        border: `1.5px solid ${leagueInfo.borderColor}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.75rem",
                        position: "relative",
                        flexShrink: 0,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      {leagueInfo.icon}
                      <span
                        style={{
                          position: "absolute",
                          bottom: "-3px",
                          right: "-3px",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: rankInfo.color,
                          color: "white",
                          fontSize: "0.65rem",
                          fontWeight: 900,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid var(--surface)",
                        }}
                      >
                        {rankInfo.zone === "demotion"
                          ? "!"
                          : rankInfo.zone === "promotion"
                            ? "▲"
                            : "✓"}
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 850,
                          color: "var(--foreground)",
                        }}
                      >
                        {leagueInfo.name} — Peringkat #{leagueData.rank || 1}
                      </div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          fontWeight: 600,
                        }}
                      >
                        {rankInfo.label} • Minggu Ke-
                        {leagueData.weekInLeague || 1}
                      </div>
                    </div>
                  </div>

                  <button
                    style={{
                      background: "rgba(59, 130, 246, 0.12)",
                      color: "#3b82f6",
                      border: "1px solid rgba(59, 130, 246, 0.3)",
                      padding: "0.5rem 1rem",
                      borderRadius: "10px",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    Lihat Liga →
                  </button>
                </LeagueCard>
              </div>

              {/* 3. Inventory & Member Status */}
              <div>
                <h3 className="block-title">Inventory & Member Status</h3>
                <InventoryGrid>
                  <InventoryItemCard>
                    <span className="inv-label">Permata (Gems)</span>
                    <span className="inv-val" style={{ color: "#3b82f6" }}>
                      💎 {progress.gems !== undefined ? progress.gems : 100}
                    </span>
                  </InventoryItemCard>

                  <InventoryItemCard>
                    <span className="inv-label">Nyawa (Hearts)</span>
                    <span className="inv-val" style={{ color: "#ef4444" }}>
                      ❤️{" "}
                      {progress.isSuper
                        ? "Tak Terbatas ♾️"
                        : `${progress.hearts !== undefined ? progress.hearts : 7} / 7`}
                    </span>
                  </InventoryItemCard>

                  <InventoryItemCard $highlight={progress.isSuper}>
                    <span className="inv-label">Status Membership</span>
                    <span
                      className="inv-val"
                      style={{
                        color: progress.isSuper
                          ? "#a855f7"
                          : "var(--foreground)",
                      }}
                    >
                      {progress.isSuper ? "Super Member 👑" : "Standar 👤"}
                    </span>
                  </InventoryItemCard>

                  <InventoryItemCard>
                    <span className="inv-label">Pelindung Streak</span>
                    <span className="inv-val" style={{ color: "#10b981" }}>
                      {progress.hasStreakFreeze ? "Freeze 🛡️" : "Belum Ada ⚪"}
                    </span>
                  </InventoryItemCard>

                  <InventoryItemCard>
                    <span className="inv-label">Misi Selesai</span>
                    <span className="inv-val" style={{ color: "#eab308" }}>
                      🎁 {(progress.claimedQuests || []).length} Klaim
                    </span>
                  </InventoryItemCard>
                </InventoryGrid>
              </div>

              {/* 4. Achievements & Quests */}
              <div>
                <h3 className="block-title">Achievements & Quests</h3>
                <AchievementsStackCard>
                  <AchievementRow>
                    <LevelBadgeBox $bg="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)">
                      <span className="main-icon">🔥</span>
                      <span className="level-tag">LEVEL 9</span>
                    </LevelBadgeBox>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.35rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.95rem",
                          fontWeight: 800,
                        }}
                      >
                        <span>Membara</span>
                        <span style={{ color: "var(--text-secondary)" }}>
                          {progress.streak || 0}/250
                        </span>
                      </div>
                      <YellowProgressTrack>
                        <YellowProgressFill
                          $pct={((progress.streak || 0) / 250) * 100}
                        />
                      </YellowProgressTrack>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Capai runtunan 250 hari
                      </span>
                    </div>
                  </AchievementRow>

                  <AchievementRow>
                    <LevelBadgeBox $bg="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)">
                      <span className="main-icon">🧙‍♂️</span>
                      <span className="level-tag">LEVEL 10</span>
                    </LevelBadgeBox>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.35rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.95rem",
                          fontWeight: 800,
                        }}
                      >
                        <span>Orang Bijak</span>
                        <span style={{ color: "var(--text-secondary)" }}>
                          {progress.exp || 0}/30000
                        </span>
                      </div>
                      <YellowProgressTrack>
                        <YellowProgressFill
                          $pct={((progress.exp || 0) / 30000) * 100}
                        />
                      </YellowProgressTrack>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Dapatkan 30000 XP
                      </span>
                    </div>
                  </AchievementRow>

                  <AchievementRow>
                    <LevelBadgeBox $bg="linear-gradient(135deg, #eab308 0%, #ca8a04 100%)">
                      <span className="main-icon">🪶</span>
                      <span className="level-tag">LEVEL 10</span>
                    </LevelBadgeBox>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.35rem",
                      }}
                    >
                      <div style={{ fontSize: "0.95rem", fontWeight: 800 }}>
                        Juara
                      </div>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--foreground)",
                          fontWeight: 600,
                        }}
                      >
                        Kamu maju ke Liga Berlian
                      </span>
                    </div>
                  </AchievementRow>
                </AchievementsStackCard>

                {/* Summary Progress Card */}
                <AchievementSummaryCard style={{ marginTop: "1rem" }}>
                  <div className="stat-info">
                    <span className="stat-title">Pencapaian Terbuka</span>
                    <span className="stat-value">
                      🏆 {unlockedCount} / {allAchievementsList.length} Badge
                    </span>
                  </div>
                  <div className="progress-wrap">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "var(--text-secondary)",
                      }}
                    >
                      <span>Progres Pencapaian</span>
                      <span>
                        {Math.round(
                          (unlockedCount / allAchievementsList.length) * 100
                        )}
                        %
                      </span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "8px",
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "999px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${(unlockedCount / allAchievementsList.length) * 100}%`,
                          background:
                            "linear-gradient(90deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)",
                          borderRadius: "999px",
                          transition: "width 0.6s ease",
                        }}
                      />
                    </div>
                  </div>
                </AchievementSummaryCard>

                {/* Category Filter Tabs */}
                <AchievementCategoryBar>
                  <AchievementTabBtn
                    $active={activeAchievementTab === "all"}
                    onClick={() => setActiveAchievementTab("all")}
                  >
                    Semua ({allAchievementsList.length})
                  </AchievementTabBtn>
                  <AchievementTabBtn
                    $active={activeAchievementTab === "streak"}
                    onClick={() => setActiveAchievementTab("streak")}
                  >
                    Streak 🔥
                  </AchievementTabBtn>
                  <AchievementTabBtn
                    $active={activeAchievementTab === "mastery"}
                    onClick={() => setActiveAchievementTab("mastery")}
                  >
                    Penguasaan ⛩️
                  </AchievementTabBtn>
                  <AchievementTabBtn
                    $active={activeAchievementTab === "accuracy"}
                    onClick={() => setActiveAchievementTab("accuracy")}
                  >
                    Akurasi 🎯
                  </AchievementTabBtn>
                  <AchievementTabBtn
                    $active={activeAchievementTab === "level"}
                    onClick={() => setActiveAchievementTab("level")}
                  >
                    Level 🏆
                  </AchievementTabBtn>
                  <AchievementTabBtn
                    $active={activeAchievementTab === "quests"}
                    onClick={() => setActiveAchievementTab("quests")}
                  >
                    Quests ⚔️
                  </AchievementTabBtn>
                </AchievementCategoryBar>

                {/* Upgraded Grid Cards */}
                <AchievementGrid
                  ref={achievementsScrollRef}
                  $isDragging={isAchievementsDragging}
                  onMouseDown={handleAchievementsMouseDown}
                  onMouseLeave={handleAchievementsMouseLeave}
                  onMouseUp={handleAchievementsMouseUp}
                  onMouseMove={handleAchievementsMouseMove}
                >
                  {filteredAchievements.map((a) => {
                    const pct = Math.min(
                      100,
                      Math.round((a.currentValue / a.maxValue) * 100)
                    );
                    return (
                      <UpgradedAchievementCard
                        key={a.id}
                        $unlocked={a.unlocked}
                        $tier={a.tier}
                        onClick={() => setSelectedAchievement(a)}
                      >
                        <TierPill $tier={a.tier}>
                          {a.tier === "bronze" && "🥉 Bronze"}
                          {a.tier === "silver" && "🥈 Silver"}
                          {a.tier === "gold" && "🥇 Gold"}
                          {a.tier === "diamond" && "💎 Diamond"}
                        </TierPill>

                        <div className="icon-box">{a.icon}</div>
                        <h3>{a.title}</h3>
                        <p>{a.desc}</p>

                        {a.unlocked ? (
                          <span className="unlocked-tag">✓ Terbuka</span>
                        ) : (
                          <div style={{ width: "100%", marginTop: "0.2rem" }}>
                            <div className="mini-progress-bar">
                              <div
                                className="mini-progress-fill"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "0.25rem",
                              }}
                            >
                              <span className="progress-ratio">
                                {a.currentValue} / {a.maxValue}
                              </span>
                              <span className="progress-ratio">{pct}%</span>
                            </div>
                          </div>
                        )}
                      </UpgradedAchievementCard>
                    );
                  })}
                </AchievementGrid>
              </div>

              {/* 5. SRS Stage & Grammar Progress */}
              <div>
                <h3 className="block-title">SRS Stage & Grammar Progress</h3>
                <GridTwoCol>
                  <Card>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "var(--text-secondary)",
                        textTransform: "uppercase",
                        marginBottom: "0.85rem",
                      }}
                    >
                      SRS Stage Distribution
                    </div>
                    <MultiProgressBar>
                      <ProgressSegment
                        $width={srsStats.learning}
                        $color="#94a3b8"
                      />
                      <ProgressSegment
                        $width={srsStats.guru}
                        $color="#10b981"
                      />
                      <ProgressSegment
                        $width={srsStats.master}
                        $color="#3b82f6"
                      />
                      <ProgressSegment
                        $width={srsStats.enlightened}
                        $color="#8b5cf6"
                      />
                      <ProgressSegment
                        $width={srsStats.burned}
                        $color="#f43f5e"
                      />
                    </MultiProgressBar>
                    <SRSLegend>
                      <LegendItem $color="#94a3b8">
                        Learning: {srsStats.counts.learning}
                      </LegendItem>
                      <LegendItem $color="#10b981">
                        Guru: {srsStats.counts.guru}
                      </LegendItem>
                      <LegendItem $color="#3b82f6">
                        Master: {srsStats.counts.master}
                      </LegendItem>
                      <LegendItem $color="#8b5cf6">
                        Enlightened: {srsStats.counts.enlightened}
                      </LegendItem>
                      <LegendItem $color="#f43f5e">
                        Burned: {srsStats.counts.burned}
                      </LegendItem>
                    </SRSLegend>
                  </Card>

                  <Card>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "var(--text-secondary)",
                        textTransform: "uppercase",
                      }}
                    >
                      Grammar Overall Progress
                    </div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 900,
                        margin: "0.35rem 0",
                      }}
                    >
                      {completedGrammarLessonsCount}{" "}
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        / {grammarLessons.length} lessons
                      </span>
                    </div>
                    <LevelProgressBar>
                      <ProgressBarFill $width={grammarProgressPct} />
                    </LevelProgressBar>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.35rem",
                      }}
                    >
                      <span>
                        {completedGrammarSectionsCount} / {totalSections}{" "}
                        sections
                      </span>
                      <span>{grammarProgressPct}% completed</span>
                    </div>
                  </Card>
                </GridTwoCol>
              </div>

              {/* 6. Items to Focus On (Weak Points) */}
              <div>
                <h3 className="block-title">Items to Focus On (Weak Points)</h3>
                <GridTwoCol style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                  {weakPoints.map(([char, m]) => (
                    <ActivityItemCard key={char}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        }}
                      >
                        <div style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                          {char}
                        </div>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {m.incorrect} errors
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 800,
                          color: "#ef4444",
                          background: "rgba(239, 68, 68, 0.1)",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "6px",
                        }}
                      >
                        {Math.round(
                          ((m.correct || 0) /
                            ((m.correct || 0) + (m.incorrect || 0))) *
                            100,
                        )}
                        % Acc
                      </div>
                    </ActivityItemCard>
                  ))}
                  {weakPoints.length === 0 && (
                    <Card
                      style={{
                        gridColumn: "1 / -1",
                        textAlign: "center",
                        padding: "1.5rem",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.9rem",
                        }}
                      >
                        No weak points detected yet. Keep up the great work!
                      </span>
                    </Card>
                  )}
                </GridTwoCol>
              </div>

              {/* 7. Recent Activity Log */}
              <div>
                <h3 className="block-title">Recent Activity Log</h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {(progress.quizHistory || []).length === 0 ? (
                    <Card style={{ textAlign: "center", padding: "1.5rem" }}>
                      <span
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.9rem",
                        }}
                      >
                        No recent quiz activity found. Start a quiz to see your
                        history!
                      </span>
                    </Card>
                  ) : (
                    (progress.quizHistory || []).slice(0, 5).map((item, i) => {
                      const date = new Date(item.date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      );
                      const percent = Math.round(
                        (item.score / item.total) * 100,
                      );
                      return (
                        <ActivityItemCard key={i}>
                          <div>
                            <div
                              style={{ fontWeight: 800, fontSize: "0.95rem" }}
                            >
                              {item.type.charAt(0).toUpperCase() +
                                item.type.slice(1)}{" "}
                              Quiz
                            </div>
                            <div
                              style={{
                                fontSize: "0.8rem",
                                color: "var(--text-secondary)",
                              }}
                            >
                              {date}
                            </div>
                          </div>
                          <div
                            style={{
                              fontWeight: 800,
                              fontSize: "0.9rem",
                              color:
                                percent === 100 ? "#10b981" : "var(--primary)",
                              background:
                                percent === 100
                                  ? "rgba(16, 185, 129, 0.1)"
                                  : "rgba(var(--primary-rgb, 79, 70, 229), 0.1)",
                              padding: "0.35rem 0.75rem",
                              borderRadius: "8px",
                            }}
                          >
                            {item.score}/{item.total} ({percent}%)
                          </div>
                        </ActivityItemCard>
                      );
                    })
                  )}
                </div>
              </div>

              {/* 8. Account Settings & Data Management */}
              <div>
                <h3 className="block-title">
                  Account Settings & Data Management
                </h3>
                <GridTwoCol>
                  <Card
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "1rem" }}>
                        Display Name & Profile
                      </div>
                      <div
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Customize your display name and avatar
                      </div>
                    </div>
                    <Link
                      href="/profile/edit"
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        style={{
                          background: "rgba(59, 130, 246, 0.12)",
                          color: "#3b82f6",
                          border: "1px solid rgba(59, 130, 246, 0.3)",
                          padding: "0.5rem 1rem",
                          borderRadius: "10px",
                          fontWeight: 800,
                          fontSize: "0.85rem",
                          cursor: "pointer",
                        }}
                      >
                        Edit Profile
                      </button>
                    </Link>
                  </Card>

                  <Card
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "1rem" }}>
                        Reset All Progress Data
                      </div>
                      <div
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Clear local storage and start fresh
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to reset all progress? This action cannot be undone.",
                          )
                        ) {
                          localStorage.clear();
                          window.location.reload();
                        }
                      }}
                      style={{
                        background: "rgba(239, 68, 68, 0.12)",
                        color: "#ef4444",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        padding: "0.5rem 1rem",
                        borderRadius: "10px",
                        fontWeight: 800,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      Reset Data 🗑️
                    </button>
                  </Card>
                </GridTwoCol>
              </div>
            </OthersPanel>
          )}
        </MainContent>
      </LayoutGrid>

      {/* Leaderboard Modal */}
      {showLeaderboardModal && (
        <LeaderboardModal onClose={() => setShowLeaderboardModal(false)} />
      )}

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <AchievementModalOverlay onClick={() => setSelectedAchievement(null)}>
          <AchievementModalCard onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelectedAchievement(null)}
            >
              ✕
            </button>

            <TierPill $tier={selectedAchievement.tier}>
              {selectedAchievement.tier === "bronze" && "🥉 Tier Perunggu"}
              {selectedAchievement.tier === "silver" && "🥈 Tier Perak"}
              {selectedAchievement.tier === "gold" && "🥇 Tier Emas"}
              {selectedAchievement.tier === "diamond" && "💎 Tier Berlian"}
            </TierPill>

            <div className="badge-icon">{selectedAchievement.icon}</div>
            <h2>{selectedAchievement.title}</h2>
            <p>{selectedAchievement.desc}</p>

            <div className="reward-box">
              🎁 Hadiah XP: {selectedAchievement.reward}
            </div>

            <div style={{ width: "100%", textAlign: "left" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "var(--text-secondary)",
                  marginBottom: "0.4rem",
                }}
              >
                <span>Progres Kamu</span>
                <span>
                  {selectedAchievement.currentValue} / {selectedAchievement.maxValue}
                </span>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(
                      100,
                      Math.round(
                        (selectedAchievement.currentValue /
                          selectedAchievement.maxValue) *
                          100
                      )
                    )}%`,
                    background:
                      "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
                    borderRadius: "999px",
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => setSelectedAchievement(null)}
              style={{
                width: "100%",
                marginTop: "1.5rem",
                background: selectedAchievement.unlocked
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  : "linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%)",
                color: "#ffffff",
                border: "none",
                padding: "0.75rem",
                borderRadius: "14px",
                fontWeight: 800,
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              {selectedAchievement.unlocked ? "✓ Pencapaian Terbuka!" : "Tutup"}
            </button>
          </AchievementModalCard>
        </AchievementModalOverlay>
      )}
    </PageWrapper>
  );
}
