"use client";

import React, { useMemo, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Heatmap } from "@/components/gamification/Heatmap";
import { grammarLessons, totalSections } from "@/data/grammarLessons";
import {
  UserIcon,
  TrophyIcon,
  TargetIcon,
  AwardIcon,
  FireIcon,
  SparklesIcon,
  BookIcon,
} from "@/components/icons/AppIcons";
import { getLeagueById, getRankStatus } from "@/data/leagues";
import { LeaderboardModal } from "@/components/modals/DuolingoModals";

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  position: relative;

  @media (max-width: 1024px) {
    padding: 1rem 1rem 96px 1rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem 96px 0.5rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.25rem;

  @media (max-width: 768px) {
    min-height: auto;
    gap: 1.5rem;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 32px;
  padding: 2.5rem;
  box-shadow: var(--shadow-md);

  @media (max-width: 768px) {
    padding: 1.5rem 1.25rem;
    gap: 1.25rem;
    border-radius: 24px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
    padding: 1.25rem 1rem;
    gap: 1rem;
    border-radius: 20px;
  }
`;

const AvatarCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-light) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  font-weight: 800;
  box-shadow: 0 10px 25px rgba(var(--primary-rgb), 0.3);
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
    font-size: 2.25rem;
  }

  @media (max-width: 480px) {
    width: 76px;
    height: 76px;
    font-size: 1.85rem;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Name = styled.h1`
  font-size: 2rem;
  font-weight: 850;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 0.35rem;
  }

  @media (max-width: 480px) {
    font-size: 1.35rem;
  }
`;

const JoinedDate = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 0.85rem;
  }
`;

const LevelBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  border: 1px solid rgba(var(--primary-rgb), 0.2);

  @media (max-width: 480px) {
    padding: 0.35rem 0.75rem;
    font-size: 0.82rem;
    border-radius: 10px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    gap: 0.5rem;
    margin-top: 0.25rem;
  }

  &::before {
    content: "";
    width: 4px;
    height: 1.35rem;
    background: var(--primary);
    border-radius: 2px;

    @media (max-width: 768px) {
      height: 1.1rem;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
  }
`;

const MainStatCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 160px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 120px;
    border-radius: 18px;
  }

  @media (max-width: 480px) {
    padding: 0.85rem;
    min-height: 100px;
    border-radius: 16px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--primary-light);
  }
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    letter-spacing: 0.04em;
  }
`;

const StatValue = styled.div`
  font-size: 2.25rem;
  font-weight: 850;
  color: var(--foreground);
  display: flex;
  align-items: baseline;
  gap: 0.4rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }

  span {
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-weight: 500;

    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
  }
`;

const ProgressInfo = styled.div`
  margin-top: 0.75rem;
`;

const LevelProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.4rem;

  @media (max-width: 480px) {
    height: 6px;
  }
`;

const ProgressBarFill = styled.div<{ $width: number }>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: linear-gradient(
    90deg,
    var(--primary) 0%,
    var(--primary-light) 100%
  );
  border-radius: 4px;
  transition: width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const GoalCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.75rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1.15rem 1rem;
    border-radius: 18px;
    gap: 0.75rem;
  }
`;

const GoalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1.1rem;
    font-weight: 800;
    margin: 0;

    @media (max-width: 480px) {
      font-size: 0.95rem;
    }
  }

  span {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--primary);

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`;

const GoalProgress = styled.div`
  height: 12px;
  background: var(--border);
  border-radius: 6px;
  overflow: hidden;

  @media (max-width: 480px) {
    height: 8px;
  }
`;

const GoalBar = styled.div<{ $width: number }>`
  height: 100%;
  width: ${({ $width }) => Math.min($width, 100)}%;
  background: linear-gradient(
    90deg,
    var(--primary) 0%,
    var(--secondary) 100%
  );
  border-radius: 6px;
  transition: width 0.5s ease;
`;

const GridTwoCol = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ChartCard = styled(MainStatCard)`
  grid-column: span 1;
  min-height: 280px;

  @media (max-width: 768px) {
    min-height: 210px;
  }
`;

const BarChartContainer = styled.div`
  height: 180px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-bottom: 0.5rem;

  @media (max-width: 768px) {
    height: 120px;
    gap: 0.3rem;
    margin-top: 1rem;
  }
`;

const BarWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
`;

const BarArea = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  min-height: 0;
`;

const Bar = styled.div<{ $height: number }>`
  width: 100%;
  max-width: 28px;
  height: ${({ $height }) => Math.max($height, 3)}%;
  background: ${({ $height }) =>
    $height > 0 ? "var(--primary)" : "rgba(var(--primary-rgb), 0.12)"};
  border-radius: 6px 6px 2px 2px;
  transition: height 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;

  @media (max-width: 480px) {
    max-width: 16px;
    border-radius: 4px 4px 2px 2px;
  }

  &:hover {
    filter: brightness(1.2);
    transform: scaleX(1.05);
  }
`;

const DayLabel = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 0.68rem;
  }
`;

const SRSDistribution = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const SRSLegend = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.75rem;
  font-size: 0.8rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.4rem 0.6rem;
    font-size: 0.72rem;
  }
`;

const LegendItem = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-secondary);
  font-weight: 600;

  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 3px;
    background: ${({ $color }) => $color};
  }
`;

const MultiProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: var(--border);
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    height: 14px;
    border-radius: 7px;
  }
`;

const ProgressSegment = styled.div<{ $width: number; $color: string }>`
  width: ${({ $width }) => $width}%;
  height: 100%;
  background: ${({ $color }) => $color};
  transition: width 1s ease-in-out;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const ActivityItem = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;

  @media (max-width: 768px) {
    padding: 0.75rem 0.85rem;
    border-radius: 14px;
  }

  &:hover {
    border-color: var(--primary-light);
    transform: translateX(4px);
  }
`;

const ActivityInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActivityType = styled.span`
  font-weight: 700;
  color: var(--foreground);

  @media (max-width: 480px) {
    font-size: 0.88rem;
  }
`;

const ActivityDate = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);

  @media (max-width: 480px) {
    font-size: 0.74rem;
  }
`;

const ActivityScore = styled.div<{ $perfect: boolean }>`
  font-weight: 800;
  font-size: 1rem;
  color: ${({ $perfect }) =>
    $perfect ? "var(--secondary)" : "var(--primary)"};
  background: ${({ $perfect }) =>
    $perfect
      ? "rgba(var(--secondary-rgb), 0.1)"
      : "rgba(var(--primary-rgb), 0.1)"};
  padding: 0.35rem 0.85rem;
  border-radius: 10px;

  @media (max-width: 480px) {
    font-size: 0.82rem;
    padding: 0.25rem 0.6rem;
    border-radius: 8px;
  }
`;

const AchievementGrid = styled.div<{ $isDragging?: boolean }>`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.75rem;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "grab")};
  user-select: none;

  @media (max-width: 480px) {
    gap: 0.75rem;
    padding-bottom: 0.5rem;
  }
`;

const AchievementCard = styled.div<{ $unlocked: boolean }>`
  min-width: 140px;
  background: var(--surface);
  border: 1px solid
    ${({ $unlocked }) =>
      $unlocked ? "rgba(var(--primary-rgb), 0.3)" : "var(--border)"};
  border-radius: 20px;
  padding: 1.25rem;
  text-align: center;
  opacity: ${({ $unlocked }) => ($unlocked ? 1 : 0.45)};
  filter: ${({ $unlocked }) => ($unlocked ? "none" : "grayscale(80%)")};
  transition: all 0.2s;
  flex-shrink: 0;

  @media (max-width: 480px) {
    min-width: 115px;
    padding: 0.85rem 0.6rem;
    border-radius: 16px;
  }

  .icon-wrap {
    font-size: 2.25rem;
    margin-bottom: 0.5rem;
    color: ${({ $unlocked }) =>
      $unlocked ? "var(--primary)" : "var(--text-secondary)"};

    @media (max-width: 480px) {
      font-size: 1.65rem;
      margin-bottom: 0.35rem;
    }
  }

  h3 {
    font-size: 0.95rem;
    font-weight: 750;
    margin-bottom: 0.25rem;

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }

  p {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0;

    @media (max-width: 480px) {
      font-size: 0.68rem;
    }
  }
`;

const SettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const SettingItem = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    padding: 0.85rem 1rem;
    border-radius: 16px;
  }
`;

const SettingLabel = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-weight: 700;
    font-size: 1rem;

    @media (max-width: 480px) {
      font-size: 0.88rem;
    }
  }

  span:last-child {
    font-size: 0.85rem;
    color: var(--text-secondary);

    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
  }
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  background: ${({ $danger }) =>
    $danger ? "rgba(239, 68, 68, 0.1)" : "rgba(var(--primary-rgb), 0.1)"};
  color: ${({ $danger }) => ($danger ? "#ef4444" : "var(--primary)")};
  border: 1px solid
    ${({ $danger }) =>
      $danger ? "rgba(239, 68, 68, 0.2)" : "rgba(var(--primary-rgb), 0.2)"};
  padding: 0.6rem 1.25rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;

  @media (max-width: 480px) {
    padding: 0.45rem 0.85rem;
    font-size: 0.8rem;
    border-radius: 10px;
  }

  &:hover {
    background: ${({ $danger }) => ($danger ? "#ef4444" : "var(--primary)")};
    color: white;
  }
`;

/* ─── Duolingo Style Statistik & Pencapaian Components ─── */
const DuolingoStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.65rem;
  }
`;

const DuoStatCard = styled.div<{ $hasBadge?: boolean }>`
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 20px;
  padding: 1.15rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    padding: ${(props) => (props.$hasBadge ? "1.25rem 0.85rem 0.75rem" : "0.85rem 0.9rem")};
    gap: 0.75rem;
    border-radius: 16px;
  }
`;

const DuoStatIcon = styled.div`
  font-size: 2.25rem;
  flex-shrink: 0;

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const DuoStatText = styled.div`
  display: flex;
  flex-direction: column;
`;

const DuoStatValue = styled.div`
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--foreground);
  line-height: 1.1;

  @media (max-width: 480px) {
    font-size: 1.15rem;
  }
`;

const DuoStatLabel = styled.div`
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-secondary);
  margin-top: 0.2rem;

  @media (max-width: 480px) {
    font-size: 0.72rem;
  }
`;

const WeekBadgeTag = styled.span`
  position: absolute;
  top: 8px;
  right: 10px;
  background: rgba(236, 72, 153, 0.2);
  color: #ec4899;
  border: 1px solid rgba(236, 72, 153, 0.4);
  font-size: 0.65rem;
  font-weight: 900;
  padding: 0.15rem 0.5rem;
  border-radius: 8px;
  letter-spacing: 0.04em;
  white-space: nowrap;
  z-index: 2;

  @media (max-width: 480px) {
    font-size: 0.48rem;
    padding: 0.08rem 0.32rem;
    top: 5px;
    right: 6px;
    border-radius: 5px;
    letter-spacing: 0.02em;
  }
`;

const SectionHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const ActionTextLink = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 0.85rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  cursor: pointer;
  text-transform: uppercase;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const AchievementsStackCard = styled.div`
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    border-radius: 18px;
  }
`;

const AchievementRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1.5px solid var(--border);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 600px) {
    padding: 1rem;
    gap: 0.85rem;
  }
`;

const LevelBadgeBox = styled.div<{ $bg: string }>`
  width: 68px;
  height: 68px;
  background: ${({ $bg }) => $bg};
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;

  @media (max-width: 480px) {
    width: 54px;
    height: 54px;
    border-radius: 14px;
  }

  .main-icon {
    font-size: 1.85rem;

    @media (max-width: 480px) {
      font-size: 1.35rem;
    }
  }

  .level-tag {
    font-size: 0.62rem;
    font-weight: 900;
    color: white;
    background: rgba(0, 0, 0, 0.35);
    padding: 0.1rem 0.4rem;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 0.1rem;

    @media (max-width: 480px) {
      font-size: 0.55rem;
      padding: 0.08rem 0.3rem;
    }
  }
`;

const AchievementDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const AchievementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 1.05rem;
    font-weight: 850;
    color: var(--foreground);

    @media (max-width: 480px) {
      font-size: 0.92rem;
    }
  }

  .progress-num {
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--text-secondary);

    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
  }
`;

const YellowProgressTrack = styled.div`
  width: 100%;
  height: 12px;
  background: var(--border);
  border-radius: 999px;
  overflow: hidden;

  @media (max-width: 480px) {
    height: 10px;
  }
`;

const YellowProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => Math.min(100, Math.max(0, $pct))}%;
  background: linear-gradient(90deg, #f59e0b 0%, #eab308 100%);
  border-radius: 999px;
  transition: width 1s ease-in-out;
`;

const AchievementSub = styled.div`
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 0.76rem;
  }
`;

export default function ProfilePage() {
  const { progress } = useProgress();
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);

  const leagueData = progress.league || {
    currentLeagueId: "bronze",
    weekInLeague: 1,
    rank: 1,
    top3Finishes: 0,
    weeklyExp: 0,
  };
  const leagueInfo = getLeagueById(leagueData.currentLeagueId);
  const rankInfo = getRankStatus(leagueData.rank);

  // Dragging logic for achievements
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // 1. Leveling Logic
  const level = Math.floor(Math.sqrt(progress.exp / 100)) + 1;
  const currentLevelExp = Math.pow(level - 1, 2) * 100;
  const nextLevelExp = Math.pow(level, 2) * 100;
  const progressToNext =
    ((progress.exp - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;

  // 2. Total Characters & Mastery
  const totalCharacters = useMemo(
    () => Object.keys(progress.mastery).length,
    [progress.mastery],
  );

  // 3. Weekly 7-Day Activity Chart
  const weeklyData = useMemo(() => {
    const days = [];
    const log = progress.activityLog || {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const dayStr = String(d.getDate()).padStart(2, "0");
      const dateStr = `${y}-${m}-${dayStr}`;
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      days.push({
        label: dayName,
        value: log[dateStr] || 0,
      });
    }
    const maxExp = Math.max(...days.map((d) => d.value), 100);
    return days.map((d) => ({ ...d, percent: (d.value / maxExp) * 100 }));
  }, [progress.activityLog]);

  // 4. SRS Distribution
  const srsStats = useMemo(() => {
    const counts = {
      learning: 0,
      guru: 0,
      master: 0,
      enlightened: 0,
      burned: 0,
    };
    Object.values(progress.srs).forEach((item) => {
      const reps = item.repetitions;
      if (reps < 4) counts.learning++;
      else if (reps < 8) counts.guru++;
      else if (reps < 12) counts.master++;
      else if (reps < 16) counts.enlightened++;
      else counts.burned++;
    });

    const total = Object.values(progress.srs).length || 1;
    return {
      learning: (counts.learning / total) * 100,
      guru: (counts.guru / total) * 100,
      master: (counts.master / total) * 100,
      enlightened: (counts.enlightened / total) * 100,
      burned: (counts.burned / total) * 100,
      counts,
    };
  }, [progress.srs]);

  // 5. Accuracy Logic
  const accuracy = useMemo(() => {
    let correct = 0;
    let total = 0;
    Object.values(progress.mastery).forEach((m) => {
      correct += m.correct;
      total += m.correct + m.incorrect;
    });
    return total === 0 ? 0 : Math.round((correct / total) * 100);
  }, [progress.mastery]);

  // 6. Grammar Progress Logic
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

  // 7. Daily Goal Calculation
  const targetGoal = parseInt(progress.profile?.dailyGoal || "50", 10);
  const todayStr = new Date().toISOString().split("T")[0];
  const todayExp = progress.activityLog?.[todayStr] || 0;
  const dailyGoal = {
    current: Math.min(todayExp, targetGoal),
    target: targetGoal,
  };
  const goalPercent = (dailyGoal.current / dailyGoal.target) * 100;

  // 8. Achievements List
  const achievements = [
    {
      id: "first_quiz",
      title: "First Steps",
      desc: "Reach Level 2",
      icon: <SparklesIcon />,
      unlocked: level >= 2,
    },
    {
      id: "streak_3",
      title: "Fire Starter",
      desc: "3 Day Streak",
      icon: <FireIcon />,
      unlocked: progress.streak >= 3,
    },
    {
      id: "kanji_10",
      title: "Kanji Apprentice",
      desc: "Learn 10 Kanji",
      icon: <BookIcon />,
      unlocked: totalCharacters >= 10,
    },
    {
      id: "accuracy_90",
      title: "Perfectionist",
      desc: "90% Accuracy",
      icon: <TargetIcon />,
      unlocked: accuracy >= 90 && totalCharacters >= 5,
    },
    {
      id: "level_10",
      title: "JapanApp Legend",
      desc: "Reach Level 10",
      icon: <TrophyIcon />,
      unlocked: level >= 10,
    },
    {
      id: "streak_10",
      title: "Unstoppable",
      desc: "10 Day Streak",
      icon: <AwardIcon />,
      unlocked: progress.streak >= 10,
    },
  ];

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Profile" />

      <ContentWrapper>
        {/* Profile Header */}
        <ProfileHeader>
          <AvatarCircle>
            {progress.profile?.avatar ? (
              <span style={{ fontSize: "3.5rem", lineHeight: 1 }}>
                {progress.profile.avatar}
              </span>
            ) : (
              <UserIcon size={64} />
            )}
          </AvatarCircle>
          <ProfileInfo>
            <Name>{progress.profile?.displayName || "JapanApp Learner"}</Name>
            <JoinedDate>
              Mastering {totalCharacters} items across Kanji & Vocabulary
            </JoinedDate>
            {progress.profile?.bio && (
              <p
                style={{
                  margin: "0 0 1.25rem 0",
                  fontStyle: "italic",
                  color: "var(--text-secondary)",
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                }}
              >
                {progress.profile.bio}
              </p>
            )}
            <LevelBadge>
              <span>🏆</span> Level {level}
            </LevelBadge>
          </ProfileInfo>
        </ProfileHeader>

        {/* Level Progress & Daily Goal */}
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
              {nextLevelExp - progress.exp} EXP needed to reach Level {level + 1}
            </p>
          </GoalCard>

          <GoalCard>
            <GoalHeader>
              <h3>Daily Study Goal</h3>
              <span>
                {dailyGoal.current} / {dailyGoal.target} EXP
              </span>
            </GoalHeader>
            <GoalProgress>
              <GoalBar $width={goalPercent} />
            </GoalProgress>
            <p
              style={{
                margin: 0,
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
              }}
            >
              {goalPercent >= 100
                ? "🎉 Daily goal achieved! You're amazing."
                : `Only ${dailyGoal.target - dailyGoal.current} EXP left to hit your daily target!`}
            </p>
          </GoalCard>
        </GridTwoCol>

        {/* 1. DUOLINGO STYLE STATISTIK */}
        <SectionTitle>Statistik</SectionTitle>
        <DuolingoStatsGrid>
          <DuoStatCard>
            <DuoStatIcon>🔥</DuoStatIcon>
            <DuoStatText>
              <DuoStatValue>{progress.streak || 0}</DuoStatValue>
              <DuoStatLabel>Runtunan hari</DuoStatLabel>
            </DuoStatText>
          </DuoStatCard>

          <DuoStatCard>
            <DuoStatIcon>⚡</DuoStatIcon>
            <DuoStatText>
              <DuoStatValue>{progress.exp || 0}</DuoStatValue>
              <DuoStatLabel>Total XP</DuoStatLabel>
            </DuoStatText>
          </DuoStatCard>

          <DuoStatCard $hasBadge style={{ cursor: "pointer" }} onClick={() => setShowLeaderboardModal(true)}>
            <WeekBadgeTag>MINGGU KE-{leagueData.weekInLeague || 1}</WeekBadgeTag>
            <DuoStatIcon>{leagueInfo.icon}</DuoStatIcon>
            <DuoStatText style={{ minWidth: 0 }}>
              <DuoStatValue style={{ color: leagueInfo.color, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {leagueInfo.name.replace("Liga ", "")}
              </DuoStatValue>
              <DuoStatLabel>Liga saat ini</DuoStatLabel>
            </DuoStatText>
          </DuoStatCard>

          <DuoStatCard>
            <DuoStatIcon>🎖️</DuoStatIcon>
            <DuoStatText>
              <DuoStatValue>{leagueData.top3Finishes ?? 0}</DuoStatValue>
              <DuoStatLabel>Posisi 3 besar</DuoStatLabel>
            </DuoStatText>
          </DuoStatCard>
        </DuolingoStatsGrid>

        {/* LEAGUE RANKING STATUS BANNER CARD */}
        <AchievementsStackCard style={{ padding: "1.25rem 1.5rem", marginTop: "-0.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 850, margin: 0 }}>
              {leagueInfo.name}
            </h3>
            <ActionTextLink onClick={() => setShowLeaderboardModal(true)}>
              LIHAT LIGA
            </ActionTextLink>
          </div>

          <div
            onClick={() => setShowLeaderboardModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem 1.25rem",
              borderRadius: "18px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--border)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: leagueInfo.badgeBg,
                border: `1.5px solid ${leagueInfo.borderColor}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
                position: "relative",
                flexShrink: 0,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
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
                {rankInfo.zone === "demotion" ? "!" : rankInfo.zone === "promotion" ? "▲" : "✓"}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "1.05rem", fontWeight: 850, color: "var(--foreground)" }}>
                Kamu di peringkat #{leagueData.rank || 1}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                {rankInfo.label}
              </div>
            </div>
          </div>
        </AchievementsStackCard>

        {/* 2. DUOLINGO STYLE PENCAPAIAN */}
        <SectionHeaderRow>
          <SectionTitle style={{ marginTop: 0 }}>Pencapaian</SectionTitle>
          <ActionTextLink as={Link} href="/quests" style={{ textDecoration: "none" }}>
            LIHAT SEMUA
          </ActionTextLink>
        </SectionHeaderRow>

        <AchievementsStackCard>
          <AchievementRow>
            <LevelBadgeBox $bg="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)">
              <span className="main-icon">🔥</span>
              <span className="level-tag">LEVEL 9</span>
            </LevelBadgeBox>
            <AchievementDetail>
              <AchievementHeader>
                <span className="title">Membara</span>
                <span className="progress-num">{progress.streak || 0}/250</span>
              </AchievementHeader>
              <YellowProgressTrack>
                <YellowProgressFill $pct={((progress.streak || 0) / 250) * 100} />
              </YellowProgressTrack>
              <AchievementSub>Capai runtunan 250 hari</AchievementSub>
            </AchievementDetail>
          </AchievementRow>

          <AchievementRow>
            <LevelBadgeBox $bg="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)">
              <span className="main-icon">🧙‍♂️</span>
              <span className="level-tag">LEVEL 10</span>
            </LevelBadgeBox>
            <AchievementDetail>
              <AchievementHeader>
                <span className="title">Orang Bijak</span>
                <span className="progress-num">{progress.exp || 0}/30000</span>
              </AchievementHeader>
              <YellowProgressTrack>
                <YellowProgressFill $pct={((progress.exp || 0) / 30000) * 100} />
              </YellowProgressTrack>
              <AchievementSub>Dapatkan 30000 XP</AchievementSub>
            </AchievementDetail>
          </AchievementRow>

          <AchievementRow>
            <LevelBadgeBox $bg="linear-gradient(135deg, #eab308 0%, #ca8a04 100%)">
              <span className="main-icon">🪶</span>
              <span className="level-tag">LEVEL 10</span>
            </LevelBadgeBox>
            <AchievementDetail>
              <AchievementHeader>
                <span className="title">Juara</span>
              </AchievementHeader>
              <AchievementSub style={{ color: "var(--foreground)", fontWeight: 700 }}>
                Kamu maju ke Liga Berlian
              </AchievementSub>
            </AchievementDetail>
          </AchievementRow>
        </AchievementsStackCard>

        {/* Gamification & Inventory Status */}
        <SectionTitle>Inventory & Status Duolingo</SectionTitle>
        <StatsGrid>
          <MainStatCard style={{ background: "rgba(59, 130, 246, 0.08)", borderColor: "rgba(59, 130, 246, 0.2)" }}>
            <StatLabel>Permata (Gems)</StatLabel>
            <StatValue style={{ color: "#3b82f6" }}>💎 {progress.gems !== undefined ? progress.gems : 100}</StatValue>
          </MainStatCard>

          <MainStatCard style={{ background: "rgba(239, 68, 68, 0.08)", borderColor: "rgba(239, 68, 68, 0.2)" }}>
            <StatLabel>Nyawa (Hearts)</StatLabel>
            <StatValue style={{ color: "#ef4444" }}>
              ❤️ {progress.isSuper ? "Tak Terbatas ♾️" : `${progress.hearts !== undefined ? progress.hearts : 7} / 7`}
            </StatValue>
          </MainStatCard>

          <MainStatCard style={{ background: progress.isSuper ? "rgba(168, 85, 247, 0.12)" : "rgba(255, 255, 255, 0.03)", borderColor: progress.isSuper ? "rgba(168, 85, 247, 0.4)" : "var(--border)" }}>
            <StatLabel>Status Membership</StatLabel>
            <StatValue style={{ color: progress.isSuper ? "#a855f7" : "var(--foreground)" }}>
              {progress.isSuper ? "Member Super 👑" : "Standar 👤"}
            </StatValue>
          </MainStatCard>

          <MainStatCard style={{ background: "rgba(16, 185, 129, 0.08)", borderColor: "rgba(16, 185, 129, 0.2)" }}>
            <StatLabel>Pelindung Streak</StatLabel>
            <StatValue style={{ color: "#10b981" }}>
              {progress.hasStreakFreeze ? "Streak Freeze 🛡️" : "Belum Memiliki ⚪"}
            </StatValue>
          </MainStatCard>

          <MainStatCard style={{ background: "rgba(234, 179, 8, 0.08)", borderColor: "rgba(234, 179, 8, 0.2)" }}>
            <StatLabel>Misi Selesai</StatLabel>
            <StatValue style={{ color: "#eab308" }}>
              🎁 {(progress.claimedQuests || []).length} Klaim
            </StatValue>
          </MainStatCard>
        </StatsGrid>

        {/* Weekly Activity & SRS Breakdown */}
        <SectionTitle>Weekly Activity & Mastery Breakdown</SectionTitle>
        <GridTwoCol>
          <ChartCard>
            <StatLabel>Past 7 Days EXP</StatLabel>
            <BarChartContainer>
              {weeklyData.map((day, i) => (
                <BarWrapper key={i}>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color:
                        day.value > 0
                          ? "var(--primary)"
                          : "var(--text-secondary)",
                    }}
                  >
                    {day.value}
                  </div>
                  <BarArea>
                    <Bar
                      $height={day.percent}
                      title={`${day.label}: ${day.value} EXP`}
                    />
                  </BarArea>
                  <DayLabel>{day.label}</DayLabel>
                </BarWrapper>
              ))}
            </BarChartContainer>
          </ChartCard>

          <MainStatCard>
            <StatLabel>SRS Stage Distribution</StatLabel>
            <SRSDistribution>
              <MultiProgressBar>
                <ProgressSegment $width={srsStats.learning} $color="#94a3b8" />
                <ProgressSegment $width={srsStats.guru} $color="#10b981" />
                <ProgressSegment $width={srsStats.master} $color="#3b82f6" />
                <ProgressSegment $width={srsStats.enlightened} $color="#8b5cf6" />
                <ProgressSegment $width={srsStats.burned} $color="#f43f5e" />
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
            </SRSDistribution>

            <div style={{ marginTop: "1.5rem" }}>
              <StatLabel>Grammar Progress</StatLabel>
              <StatValue style={{ marginTop: "0.25rem", fontSize: "1.5rem" }}>
                {completedGrammarLessonsCount}{" "}
                <span style={{ fontSize: "0.85rem" }}>/ {grammarLessons.length} lessons</span>
              </StatValue>
              <ProgressInfo style={{ marginTop: "0.5rem" }}>
                <LevelProgressBar>
                  <ProgressBarFill $width={grammarProgressPct} />
                </LevelProgressBar>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "0.25rem",
                  }}
                >
                  <span>
                    {completedGrammarSectionsCount} / {totalSections} sections
                  </span>
                  <span>{grammarProgressPct}% completed</span>
                </div>
              </ProgressInfo>
            </div>
          </MainStatCard>
        </GridTwoCol>

        {/* Consistency / Study Heatmap */}
        <SectionTitle>Consistency & Study Heatmap</SectionTitle>
        <Heatmap activityLog={progress.activityLog || {}} />

        {/* Items to Focus On */}
        <SectionTitle>Items to Focus On</SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "0.75rem",
            width: "100%",
          }}
        >
          {Object.entries(progress.mastery)
            .sort(([, a], [, b]) => b.incorrect - a.incorrect)
            .filter(([, m]) => m.incorrect > 0)
            .slice(0, 5)
            .map(([char, m]) => (
              <ActivityItem
                key={char}
                style={{ padding: "1rem 1.25rem", flexWrap: "wrap", gap: "0.75rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    flex: 1,
                    minWidth: "130px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      wordBreak: "break-word",
                    }}
                  >
                    {char}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {m.incorrect} errors
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "#ef4444",
                    whiteSpace: "nowrap",
                  }}
                >
                  {Math.round((m.correct / (m.correct + m.incorrect)) * 100)}% Acc
                </div>
              </ActivityItem>
            ))}
          {Object.values(progress.mastery).every((m) => m.incorrect === 0) && (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                color: "var(--text-secondary)",
                background: "var(--surface)",
                borderRadius: "20px",
                border: "1px dashed var(--border)",
                gridColumn: "1 / -1",
              }}
            >
              No weak points detected yet. Keep it up!
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <SectionTitle>Recent Activity</SectionTitle>
        <ActivityList>
          {progress.quizHistory.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                color: "var(--text-secondary)",
                background: "var(--surface)",
                borderRadius: "20px",
                border: "1px dashed var(--border)",
              }}
            >
              No recent activity found. Start a quiz to see your progress!
            </div>
          ) : (
            progress.quizHistory.slice(0, 5).map((item, i) => {
              const date = new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
              const percent = Math.round((item.score / item.total) * 100);
              return (
                <ActivityItem key={i}>
                  <ActivityInfo>
                    <ActivityType>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}{" "}
                      Quiz
                    </ActivityType>
                    <ActivityDate>{date}</ActivityDate>
                  </ActivityInfo>
                  <ActivityScore $perfect={percent === 100}>
                    {item.score}/{item.total} ({percent}%)
                  </ActivityScore>
                </ActivityItem>
              );
            })
          )}
        </ActivityList>

        {/* Achievements Grid */}
        <SectionTitle>Achievements</SectionTitle>
        <AchievementGrid
          ref={scrollRef}
          $isDragging={isDragging}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {achievements.map((a) => (
            <AchievementCard
              key={a.id}
              $unlocked={a.unlocked}
              title={a.unlocked ? "Unlocked!" : "Keep studying to unlock"}
            >
              <div className="icon-wrap">{a.icon}</div>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </AchievementCard>
          ))}
        </AchievementGrid>

        {/* Account Settings */}
        <SettingsSection>
          <SectionTitle>Account Settings</SectionTitle>
          <SettingItem>
            <SettingLabel>
              <span>Display Name</span>
              <span>How you appear to others</span>
            </SettingLabel>
            <ActionButton as={Link} href="/profile/edit">
              Edit
            </ActionButton>
          </SettingItem>
          <SettingItem>
            <SettingLabel>
              <span>App Data</span>
              <span>Reset your progress and settings</span>
            </SettingLabel>
            <ActionButton
              $danger
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to reset all progress? This cannot be undone.",
                  )
                ) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
            >
              Reset Data
            </ActionButton>
          </SettingItem>
        </SettingsSection>

        {showLeaderboardModal && (
          <LeaderboardModal onClose={() => setShowLeaderboardModal(false)} />
        )}
      </ContentWrapper>
    </Container>
  );
}
