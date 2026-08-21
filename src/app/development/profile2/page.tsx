"use client";

import React, { useState, useMemo } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

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
  background: radial-gradient(circle at 30% 30%, rgba(var(--primary-rgb, 79, 70, 229), 0.3), rgba(var(--primary-rgb, 79, 70, 229), 0.08));
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

/* Heatmap Grid */
const HeatmapWrap = styled.div`
  margin-top: 1.25rem;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(var(--foreground-rgb, 255, 255, 255), 0.15);
    border-radius: 4px;
  }
`;

const HeatmapMonths = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  font-size: 10.5px;
  color: var(--text-secondary);
  margin-bottom: 6px;
  padding-left: 2px;
  font-weight: 600;
  min-width: 260px;
`;

const HeatmapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-auto-rows: 9px;
  gap: 2px;
  width: 100%;
  min-width: 260px;
`;

const HeatmapCell = styled.div<{ $level?: number }>`
  width: 100%;
  height: 9px;
  border-radius: 2px;
  background: ${({ $level }) => {
    switch ($level) {
      case 1:
        return "rgba(var(--primary-rgb, 79, 70, 229), 0.35)";
      case 2:
        return "rgba(var(--primary-rgb, 79, 70, 229), 0.6)";
      case 3:
        return "rgba(var(--primary-rgb, 79, 70, 229), 0.85)";
      case 4:
        return "var(--primary)";
      default:
        return "rgba(var(--foreground-rgb, 255, 255, 255), 0.06)";
    }
  }};
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.3);
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

  .refresh-ico {
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.15s ease;
    &:hover {
      opacity: 1;
      color: var(--primary);
    }
  }

  .legend {
    display: flex;
    align-items: center;
    gap: 3px;
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
    transition: opacity 0.15s ease;

    &:hover {
      opacity: 0.9;
    }
  }
`;

/* Stat Row Grid */
const StatRowGrid = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  padding: 14px 8px;

  .stat-item {
    padding: 4px 4px;
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
    font-size: 1.4rem;
    font-weight: 900;
    color: var(--foreground);
    margin: 4px 0 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    .emoji {
      font-size: 1rem;
    }

    &.jp {
      font-family: var(--p2-font-jp);
    }
  }

  .stat-sub {
    font-size: 11px;
    color: var(--text-secondary);
    font-weight: 500;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    text-align: left;

    .stat-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 4px;
    }

    .stat-item + .stat-item {
      border-left: none;
      border-top: 1px solid var(--border);
    }

    .stat-value {
      margin: 0;
      font-size: 1.2rem;
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
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 5px;
  gap: 4px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 560px) {
    padding: 4px;
  }
`;

const TabItem = styled.div<{ $active: boolean }>`
  flex: 1;
  min-width: 75px;
  white-space: nowrap;
  text-align: center;
  padding: 10px 8px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 800;
  color: ${({ $active }) => ($active ? "#ffffff" : "var(--text-secondary)")};
  background: ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: ${({ $active }) => ($active ? "#ffffff" : "var(--foreground)")};
  }

  @media (max-width: 560px) {
    padding: 8px 6px;
    font-size: 0.8rem;
    min-width: 65px;
  }
`;

const KanaPanel = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 22px;

  .kana-panel-head {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    color: var(--primary);
  }

  .tag-ico {
    width: 28px;
    height: 20px;
    border-radius: 4px;
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.15);
    color: var(--primary);
    display: flex;
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
    overflow-x: auto;
  }

  .chart-legend {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 0.82rem;
    color: var(--text-secondary);
    font-weight: 600;
    margin-bottom: 12px;
  }

  .legend-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
  }

  .view-link {
    text-align: center;
    margin-top: 4px;
    color: var(--primary);
    font-weight: 800;
    font-size: 0.88rem;
    cursor: pointer;
    transition: opacity 0.15s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;



/* ─── DATA & CONSTANTS ───────────────────────────────────────────────────── */
const jlptData = [
  { level: "N5", total: 843, vocab: 697, grammar: 146 },
  { level: "N4", total: 773, vocab: 653, grammar: 120 },
  { level: "N3", total: 2238, vocab: 2114, grammar: 124 },
  { level: "N2", total: 1968, vocab: 1795, grammar: 173 },
  { level: "N1", total: 2938, vocab: 2694, grammar: 244 },
];

const chartDays = ["Aug 13", "Aug 14", "Aug 15", "Aug 16", "Aug 17", "Aug 18", "Aug 19"];
const chartAttempts = [0, 0, 0, 0, 0, 5, 0];

/* ─── MAIN PROFILE 2.0 PAGE COMPONENT ────────────────────────────────────── */
export default function Profile2Page() {
  const [activeTab, setActiveTab] = useState<"kana" | "vocab" | "grammar" | "conj">("kana");
  const [showDiscord, setShowDiscord] = useState(true);
  const [jlptExpanded, setJlptExpanded] = useState(true);

  // Generate 192 heatmap cells
  const heatmapCells = useMemo(() => {
    const cells = [];
    for (let i = 0; i < 192; i++) {
      let level = 0;
      if (i === 189) level = 4;
      else if (i === 188) level = 2;
      else if (i === 175) level = 1;
      cells.push(level);
    }
    return cells;
  }, []);

  return (
    <PageWrapper>
      <Profile2GlobalStyle />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Development Labs", href: "/development" },
        ]}
        current="Profil User 2.0"
      />

      <LayoutGrid>
        {/* ─── SIDEBAR (LEFT 290px) ──────────────────────────────────────── */}
        <Sidebar>
          {/* User Profile Card */}
          <ProfileCard>
            <ProfileTop>
              <ProfileAvatar>🌳</ProfileAvatar>
              <div>
                <ProfileName>
                  stjp225 <span className="crown" title="VIP Student">♛</span>
                </ProfileName>
                <ProfileMeta>
                  <span>🕐 0m studied</span>
                  <span>👥 0 friends</span>
                </ProfileMeta>
              </div>
            </ProfileTop>

            {/* Heatmap Grid */}
            <HeatmapWrap>
              <SectionLabel>Activity</SectionLabel>
              <HeatmapMonths>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
              </HeatmapMonths>
              <HeatmapGrid>
                {heatmapCells.map((lvl: number, idx: number) => (
                  <HeatmapCell key={idx} $level={lvl} title={`Activity level: ${lvl}`} />
                ))}
              </HeatmapGrid>
              <HeatmapFoot>
                <span className="refresh-ico" title="Refresh Heatmap">↻</span>
                <div className="legend">
                  Less
                  <HeatmapCell $level={0} />
                  <HeatmapCell $level={1} />
                  <HeatmapCell $level={2} />
                  <HeatmapCell $level={3} />
                  <HeatmapCell $level={4} />
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
                  <div className="sub">Get discounts, ask questions and more!</div>
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
              <Link href="/kana">
                <button className="btn-go">Go →</button>
              </Link>
            </div>
          </StartHereCard>

          {/* Stat Counter Grid */}
          <StatRowGrid>
            <div className="stat-item">
              <div className="stat-label">Streak</div>
              <div className="stat-value">
                1 <span className="emoji">🔥</span>
              </div>
              <div className="stat-sub">day</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Kanas</div>
              <div className="stat-value">
                5 <span className="emoji">✏️</span>
              </div>
              <div className="stat-sub">reviews</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Favorite</div>
              <div className="stat-value jp">
                あ <span className="emoji">⭐</span>
              </div>
              <div className="stat-sub">kana</div>
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
                {jlptData.map((d) => (
                  <div key={d.level}>
                    <div className="jlpt-row-top">
                      <span className="jlpt-level">{d.level}</span>
                      <span>
                        <span style={{ color: "var(--text-secondary)" }}>
                          0/{d.total} items
                        </span>
                        <span className="jlpt-pct">0%</span>
                      </span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: "0%" }}></div>
                    </div>
                    <div className="jlpt-split">
                      <span>Vocabulary: 0/{d.vocab}</span>
                      <span>Grammar: 0/{d.grammar}</span>
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
          <PracticeBanner>
            <span className="kana-mini">あア</span> Practice Kanas &nbsp; 0/5
          </PracticeBanner>

          {/* Master Kanas Card */}
          <MasterCard>
            <h2>Master Kanas First</h2>
            <p>
              You need to master both Hiragana and Katakana before unlocking vocabulary
              and grammar lessons.
            </p>

            <div className="prog-row">
              <div className="prog-top">
                <span className="left">
                  <span className="prog-icon">あ</span> Hiragana
                </span>
                <span>5%</span>
              </div>
              <div className="prog-track">
                <div className="prog-fill" style={{ width: "5%" }}></div>
              </div>
            </div>

            <div className="prog-row">
              <div className="prog-top">
                <span className="left">
                  <span className="prog-icon">ア</span> Katakana
                </span>
                <span>0%</span>
              </div>
              <div className="prog-track">
                <div className="prog-fill" style={{ width: "0%" }}></div>
              </div>
            </div>
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
          </TabsBar>

          {/* Kana Panel */}
          <KanaPanel>
            <div>
              <div className="kana-panel-head">
                <span className="tag-ico">Aあ</span> KANA
              </div>
            </div>

            <div>
              <h3 className="block-title">Kana Proficiency</h3>
              <div className="kana-cols">
                <div className="kana-col">
                  <h4>hiragana</h4>
                  <div className="attempts">(5 attempts)</div>
                  <Link href="/kana?type=hiragana">
                    <div className="focus-btn">Focus Area</div>
                  </Link>
                  <div className="good-status">
                    All characters at good proficiency
                  </div>
                </div>
                <div className="kana-col">
                  <h4>katakana</h4>
                  <div className="attempts">(0 attempts)</div>
                  <Link href="/kana?type=katakana">
                    <div className="focus-btn">Focus Area</div>
                  </Link>
                  <div className="good-status">
                    All characters at good proficiency
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="block-title">Stats by Type</h3>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                Practice Hiragana & Katakana to see breakdown stats by vowel groups (A, I, U, E, O).
              </div>
            </div>

            <div>
              <h3 className="block-title">Practice Activity Over Time</h3>
              <div className="chart-legend">
                <span>
                  <span className="legend-dot" style={{ background: "#8b7cff" }}></span>
                  Total Attempts
                </span>
                <span>
                  <span className="legend-dot" style={{ background: "#10b981" }}></span>
                  Accuracy %
                </span>
              </div>

              {/* Interactive SVG Chart */}
              <div className="chart-wrap">
                <svg
                  width="100%"
                  height="300"
                  viewBox="0 0 1000 300"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Grid Lines */}
                  {[0, 1, 2, 3, 4, 5].map((g) => {
                    const y = 20 + 240 - (g / 5) * 240;
                    return (
                      <g key={g}>
                        <line
                          x1="50"
                          x2="950"
                          y1={y}
                          y2={y}
                          stroke="var(--border)"
                          strokeWidth="1"
                        />
                        <text
                          x="40"
                          y={y + 4}
                          textAnchor="end"
                          fontSize="12"
                          fill="var(--text-secondary)"
                        >
                          {g.toFixed(1)}
                        </text>
                      </g>
                    );
                  })}

                  {/* X Axis Labels */}
                  {chartDays.map((d, i) => {
                    const x = 50 + (i * 900) / (chartDays.length - 1);
                    return (
                      <text
                        key={d}
                        x={x}
                        y="288"
                        textAnchor="middle"
                        fontSize="12"
                        fill="var(--text-secondary)"
                      >
                        {d}
                      </text>
                    );
                  })}

                  {/* Accuracy Area Polygon (Green highlight on Aug 18) */}
                  <polygon
                    points="650,260 650,20 725,20 800,20 800,260"
                    fill="rgba(16, 185, 129, 0.35)"
                  />

                  {/* Attempts Line & Circles */}
                  <polyline
                    points={chartAttempts
                      .map((v, i) => {
                        const x = 50 + (i * 900) / (chartDays.length - 1);
                        const y = 20 + 240 - (v / 5) * 240;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="#8b7cff"
                    strokeWidth="3"
                  />

                  {chartAttempts.map((v, i) => {
                    const x = 50 + (i * 900) / (chartDays.length - 1);
                    const y = 20 + 240 - (v / 5) * 240;
                    return (
                      <circle key={i} cx={x} cy={y} r="5" fill="#8b7cff" />
                    );
                  })}

                  {/* Right Axis Accuracy % */}
                  {[0, 20, 40, 60, 80, 100].map((p) => {
                    const y = 20 + 240 - (p / 100) * 240;
                    return (
                      <text
                        key={p}
                        x="960"
                        y={y + 4}
                        textAnchor="start"
                        fontSize="11"
                        fill="var(--text-secondary)"
                      >
                        {p}%
                      </text>
                    );
                  })}
                </svg>
              </div>
            </div>

            <Link href="/kana">
              <div className="view-link">View Kana progress →</div>
            </Link>
          </KanaPanel>
        </MainContent>
      </LayoutGrid>


    </PageWrapper>
  );
}
