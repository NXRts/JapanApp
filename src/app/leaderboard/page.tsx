"use client";

import React, { useState, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { LEAGUES_DATA, getLeagueById } from "@/data/leagues";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

/* ─── Styled Components ──────────────────────────────────────────────────── */
const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem 7rem;
  min-height: 90vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem 0.75rem 8rem;
  }
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2rem;
  margin-top: 1.25rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  min-width: 0;
`;

/* ─── League Tier Ribbon Carousel ────────────────────────────────────────── */
const TierRibbonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  padding: 1rem 0.75rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 640px) {
    justify-content: center;
  }
`;

const TierBadgeItem = styled.div<{ $active: boolean; $color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  font-size: 1.6rem;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: ${({ $active }) =>
    $active ? `rgba(var(--primary-rgb), 0.15)` : "rgba(255, 255, 255, 0.03)"};
  border: 2px solid
    ${({ $active, $color }) => ($active ? $color : "transparent")};
  transform: ${({ $active }) => ($active ? "scale(1.12)" : "scale(0.95)")};
  box-shadow: ${({ $active, $color }) =>
    $active ? `0 0 16px ${$color}50` : "none"};

  &:hover {
    transform: scale(1.08);
  }

  @media (max-width: 640px) {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    font-size: 1.4rem;
  }
`;

/* ─── League Banner Header ────────────────────────────────────────────────── */
const BannerCard = styled.div<{ $borderColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.75rem 1.25rem;
  background: linear-gradient(135deg, var(--surface) 0%, rgba(30, 41, 59, 0.5) 100%);
  border: 2px solid ${({ $borderColor }) => $borderColor};
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 1.25rem 0.85rem;
    border-radius: 18px;
  }
`;

const LargeLeagueIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));

  @media (max-width: 640px) {
    font-size: 2.8rem;
    margin-bottom: 0.3rem;
  }
`;

const LeagueTitle = styled.h1`
  font-size: 1.85rem;
  font-weight: 900;
  color: var(--foreground);
  margin: 0;
  letter-spacing: -0.02em;

  @media (max-width: 640px) {
    font-size: 1.4rem;
  }
`;

const LeagueSubtitle = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0.35rem 0 0;
  font-weight: 600;

  @media (max-width: 640px) {
    font-size: 0.82rem;
  }
`;

const CountdownPill = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: rgba(234, 179, 8, 0.12);
  border: 1px solid rgba(234, 179, 8, 0.3);
  color: #eab308;
  font-size: 0.85rem;
  font-weight: 800;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  margin-top: 0.75rem;
  max-width: 100%;
  box-sizing: border-box;
  text-align: center;
  white-space: normal;

  @media (max-width: 640px) {
    font-size: 0.78rem;
    padding: 0.3rem 0.65rem;
  }
`;

/* ─── Top 3 Podium Component ────────────────────────────────────────────── */
const PodiumSection = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.75rem;
  margin: 0.5rem 0 0.5rem;
  padding: 1.25rem 0.5rem 0.5rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    gap: 0.4rem;
    padding: 1rem 0.2rem 0.25rem;
  }
`;

const PodiumCard = styled(motion.div)<{ $rank: number; $isUser?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 140px;
  position: relative;
  background: ${({ $isUser }) =>
    $isUser
      ? "linear-gradient(180deg, rgba(79, 70, 229, 0.25) 0%, var(--surface) 100%)"
      : "linear-gradient(180deg, var(--surface) 0%, rgba(15, 23, 42, 0.6) 100%)"};
  border: 2px solid
    ${({ $rank, $isUser }) =>
      $isUser
        ? "var(--primary)"
        : $rank === 1
        ? "#fbbf24"
        : $rank === 2
        ? "#94a3b8"
        : "#d97706"};
  border-radius: 22px 22px 18px 18px;
  padding: 1.1rem 0.5rem 0.75rem;
  box-shadow: ${({ $rank }) =>
    $rank === 1
      ? "0 10px 25px rgba(251, 191, 36, 0.22)"
      : $rank === 2
      ? "0 8px 20px rgba(148, 163, 184, 0.15)"
      : "0 8px 20px rgba(217, 119, 6, 0.15)"};

  order: ${({ $rank }) => ($rank === 2 ? 1 : $rank === 1 ? 2 : 3)};
  transform: ${({ $rank }) => ($rank === 1 ? "translateY(-10px)" : "none")};

  @media (max-width: 480px) {
    padding: 0.85rem 0.2rem 0.5rem;
    border-radius: 16px;
    transform: ${({ $rank }) => ($rank === 1 ? "translateY(-6px)" : "none")};
  }
`;

const CrownOrMedal = styled.div<{ $rank: number }>`
  position: absolute;
  top: -16px;
  font-size: ${({ $rank }) => ($rank === 1 ? "1.75rem" : "1.25rem")};
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));

  @media (max-width: 480px) {
    top: -12px;
    font-size: ${({ $rank }) => ($rank === 1 ? "1.4rem" : "1.1rem")};
  }
`;

const PodiumAvatarWrapper = styled.div<{ $rank: number }>`
  position: relative;
  width: ${({ $rank }) => ($rank === 1 ? "56px" : "46px")};
  height: ${({ $rank }) => ($rank === 1 ? "56px" : "46px")};
  margin-top: 0.35rem;
  margin-bottom: 0.4rem;

  @media (max-width: 480px) {
    width: ${({ $rank }) => ($rank === 1 ? "46px" : "38px")};
    height: ${({ $rank }) => ($rank === 1 ? "46px" : "38px")};
  }
`;

const PodiumAvatar = styled.div<{ $rank: number }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--background);
  border: 2.5px solid
    ${({ $rank }) =>
      $rank === 1 ? "#fbbf24" : $rank === 2 ? "#94a3b8" : "#d97706"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $rank }) => ($rank === 1 ? "1.7rem" : "1.35rem")};
  user-select: none;

  @media (max-width: 480px) {
    font-size: ${({ $rank }) => ($rank === 1 ? "1.35rem" : "1.05rem")};
  }
`;

const PodiumStatusBadge = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--surface);
  border: 1.5px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;

  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
    font-size: 0.55rem;
  }
`;

const PodiumRankBadge = styled.div<{ $rank: number }>`
  padding: 0.15rem 0.55rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 900;
  color: #ffffff;
  background: ${({ $rank }) =>
    $rank === 1
      ? "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)"
      : $rank === 2
      ? "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)"
      : "linear-gradient(135deg, #b45309 0%, #78350f 100%)"};
  margin-bottom: 0.25rem;

  @media (max-width: 480px) {
    font-size: 0.65rem;
    padding: 0.1rem 0.45rem;
  }
`;

const PodiumName = styled.div<{ $isUser?: boolean }>`
  font-weight: 850;
  font-size: 0.82rem;
  color: ${({ $isUser }) => ($isUser ? "var(--primary)" : "var(--foreground)")};
  text-align: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0.25rem;
  box-sizing: border-box;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const PodiumExp = styled.div`
  font-weight: 900;
  font-size: 0.8rem;
  color: #f59e0b;
  margin-top: 0.15rem;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

/* ─── Leaderboard List ───────────────────────────────────────────────────── */
const LeaderboardStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const RowItem = styled(motion.div)<{ $isUser?: boolean; $rank: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.25rem;
  border-radius: 18px;
  background: ${({ $isUser }) =>
    $isUser
      ? "linear-gradient(135deg, rgba(79, 70, 229, 0.18) 0%, rgba(99, 102, 241, 0.1) 100%)"
      : "var(--surface)"};
  border: 2px solid
    ${({ $isUser }) => ($isUser ? "var(--primary)" : "var(--border)")};
  box-shadow: ${({ $isUser }) =>
    $isUser ? "0 4px 20px rgba(79, 70, 229, 0.25)" : "none"};
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    transform: translateX(4px);
    border-color: ${({ $isUser }) =>
      $isUser ? "var(--primary)" : "var(--primary-light)"};
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.75rem;
    border-radius: 14px;
  }
`;

const RankBadge = styled.div<{ $rank: number }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.9rem;
  flex-shrink: 0;
  background: ${({ $rank }) =>
    $rank === 1
      ? "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)"
      : $rank === 2
      ? "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)"
      : $rank === 3
      ? "linear-gradient(135deg, #b45309 0%, #78350f 100%)"
      : "transparent"};
  color: ${({ $rank }) => ($rank <= 3 ? "#ffffff" : "var(--text-secondary)")};
  border: ${({ $rank }) => ($rank <= 3 ? "none" : "1px solid var(--border)")};
  box-shadow: ${({ $rank }) =>
    $rank <= 3 ? "0 2px 8px rgba(0,0,0,0.2)" : "none"};

  @media (max-width: 640px) {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex: 1;
  margin: 0 0.75rem;
  min-width: 0;

  @media (max-width: 640px) {
    gap: 0.5rem;
    margin: 0 0.35rem;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 42px;
  height: 42px;
  flex-shrink: 0;

  @media (max-width: 640px) {
    width: 36px;
    height: 36px;
  }
`;

const AvatarCircle = styled.div<{ $rank: number }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--background);
  border: 2px solid
    ${({ $rank }) =>
      $rank === 1
        ? "#fbbf24"
        : $rank === 2
        ? "#94a3b8"
        : $rank === 3
        ? "#d97706"
        : "var(--border)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  user-select: none;

  @media (max-width: 640px) {
    font-size: 1.15rem;
  }
`;

const StatusEmojiBadge = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--surface);
  border: 1.5px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;

  @media (max-width: 640px) {
    width: 15px;
    height: 15px;
    font-size: 0.55rem;
  }
`;

const NameGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;

const Username = styled.span<{ $isUser?: boolean }>`
  font-weight: 800;
  font-size: 0.95rem;
  color: ${({ $isUser }) => ($isUser ? "var(--primary)" : "var(--foreground)")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;

  @media (max-width: 640px) {
    font-size: 0.85rem;
  }
`;

const StreakTag = styled.span`
  font-size: 0.72rem;
  color: #f59e0b;
  font-weight: 700;

  @media (max-width: 640px) {
    font-size: 0.65rem;
  }
`;

const ExpValue = styled.span<{ $isUser?: boolean }>`
  font-weight: 900;
  font-size: 0.95rem;
  color: ${({ $isUser }) => ($isUser ? "var(--primary)" : "var(--foreground)")};
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 640px) {
    font-size: 0.85rem;
  }
`;

/* ─── Zone Divider Bar ───────────────────────────────────────────────────── */
const ZoneDivider = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin: 0.75rem 0;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  background: ${({ $color }) => `${$color}15`};
  border: 1px dashed ${({ $color }) => $color};
  color: ${({ $color }) => $color};
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 640px) {
    font-size: 0.7rem;
    padding: 0.4rem 0.5rem;
    letter-spacing: 0.02em;
  }
`;

/* ─── Status Selector Widget Card ────────────────────────────────────────── */
const WidgetCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 18px;
  }
`;

const WidgetTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 850;
  color: var(--foreground);
  margin: 0;
`;

const StatusAvatarBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--background);
  padding: 1rem;
  border-radius: 18px;
  border: 1px solid var(--border);
`;

const BigAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(var(--primary-rgb), 0.1);
  border: 2px solid var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  position: relative;
  flex-shrink: 0;
`;

const BigStatusBubble = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--surface);
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.6rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 0.4rem;
  }
`;

const EmojiBtn = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
   justify-content: center;
  height: 44px;
  border-radius: 14px;
  font-size: 1.4rem;
  background: ${({ $active }) =>
    $active ? "rgba(var(--primary-rgb), 0.2)" : "var(--background)"};
  border: 2px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: scale(1.1);
    border-color: var(--primary-light);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    height: 40px;
    font-size: 1.2rem;
    border-radius: 10px;
  }
`;

const ActionBannerContainer = styled.div`
  margin-top: 1.25rem;
  width: 100%;
`;

const StartQuizBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 1.1rem;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--primary) 0%, #6366f1 100%);
  color: #ffffff;
  font-weight: 850;
  font-size: 1.05rem;
  text-decoration: none;
  box-shadow: 0 8px 25px rgba(79, 70, 229, 0.35);
  transition: all 0.25s ease;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(79, 70, 229, 0.45);
  }

  @media (max-width: 640px) {
    padding: 0.9rem 1rem;
    font-size: 0.95rem;
    border-radius: 14px;
  }
`;

const ToastBanner = styled(motion.div)`
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1100;
  background: var(--surface);
  color: var(--foreground);
  border: 1px solid var(--primary);
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.3);
  padding: 0.6rem 1.2rem;
  border-radius: 9999px;
  font-weight: 800;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  pointer-events: none;
`;

/* ─── Mock Competitors Generator ─────────────────────────────────────────── */
const MOCK_COMPETITORS = [
  { rank: 2, name: "Tanaka Kenji", avatar: "🐼", exp: 580, streak: "14 hari" },
  { rank: 3, name: "Sakura Learner", avatar: "🐯", exp: 490, streak: "8 hari" },
  { rank: 4, name: "Yuki-chan", avatar: "🐰", exp: 420, streak: "5 hari" },
  { rank: 5, name: "Ryu Master", avatar: "🦁", exp: 380, streak: "12 hari" },
  { rank: 6, name: "Aoi Sensei", avatar: "🐨", exp: 310, streak: "3 hari" },
  { rank: 7, name: "Kaito 123", avatar: "🐸", exp: 270, streak: "6 hari" },
  { rank: 8, name: "Hana Ninja", avatar: "🐻", exp: 230, streak: "4 hari" },
  { rank: 9, name: "Sora Sky", avatar: "🦄", exp: 190, streak: "1 hari" },
  { rank: 10, name: "Ren Otaku", avatar: "🐵", exp: 150, streak: "2 hari" },
];

const MOCK_STATUSES = ["😎", "🥳", "💪", "🧐", "🍿", "👑", "🦊", "💯", "💩", "🏆", "🍱", "😼"];

export default function LeaderboardPage() {
  const { progress, setStatusEmoji } = useProgress();

  const userLeague = progress.league || {
    currentLeagueId: "bronze",
    rank: 1,
    weeklyExp: progress.exp || 205,
  };

  const currentLeague = getLeagueById(userLeague.currentLeagueId);
  const profile = progress.profile || {
    displayName: "JapanApp Learner",
    avatar: "🦊",
    statusEmoji: "😎",
  };

  const activeStatus = profile.statusEmoji || "😎";
  const [toastMsg, setToastMsg] = useState("");

  const handleStatusChange = (emoji: string) => {
    setStatusEmoji(emoji);
    setToastMsg(`Status diperbarui: ${emoji}!`);
    setTimeout(() => setToastMsg(""), 3000);
  };

  /* Combine User into leaderboard list dynamically */
  const leaderboardList = useMemo(() => {
    const userEntry = {
      rank: userLeague.rank || 1,
      name: profile.displayName || "JapanApp Learner",
      avatar: profile.avatar || "🦊",
      status: activeStatus,
      exp: Math.max(userLeague.weeklyExp || 205, progress.exp || 205),
      streak: `${progress.streak || 2} hari`,
      isUser: true,
    };

    const combined = [
      userEntry,
      ...MOCK_COMPETITORS.map((c, i) => ({
        ...c,
        status: MOCK_STATUSES[i % MOCK_STATUSES.length],
        isUser: false,
      })),
    ];

    // Re-sort by EXP descending
    combined.sort((a, b) => b.exp - a.exp);

    // Assign final ranks 1..N
    return combined.map((item, idx) => ({ ...item, rank: idx + 1 }));
  }, [userLeague, profile, progress.exp, progress.streak, activeStatus]);

  const top3List = useMemo(() => leaderboardList.slice(0, 3), [leaderboardList]);
  const restList = useMemo(() => leaderboardList.slice(3), [leaderboardList]);

  return (
    <PageContainer>
      <AnimatePresence>
        {toastMsg && (
          <ToastBanner
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
          >
            ✨ {toastMsg}
          </ToastBanner>
        )}
      </AnimatePresence>

      <Breadcrumbs
        items={[{ label: "Home", href: "/" }]}
        current="Leaderboard & Liga"
      />

      <ContentLayout>
        <MainSection>
          {/* 1. Tier Ribbon Carousel */}
          <TierRibbonContainer>
            {LEAGUES_DATA.map((l) => {
              const isCurrent = l.id === currentLeague.id;
              return (
                <TierBadgeItem
                  key={l.id}
                  $active={isCurrent}
                  $color={l.color}
                  title={`${l.name} (${l.englishName})`}
                >
                  {l.icon}
                </TierBadgeItem>
              );
            })}
          </TierRibbonContainer>

          {/* 2. League Banner Header */}
          <BannerCard $borderColor={currentLeague.borderColor}>
            <LargeLeagueIcon>{currentLeague.icon}</LargeLeagueIcon>
            <LeagueTitle>{currentLeague.name}</LeagueTitle>
            <LeagueSubtitle>{currentLeague.description}</LeagueSubtitle>
            <CountdownPill>
              ⏱️ Musim liga berakhir dalam 2 hari 14 jam
            </CountdownPill>
          </BannerCard>

          {/* 3. Top 3 Podium Section */}
          {top3List.length >= 3 && (
            <PodiumSection>
              {top3List.map((comp) => (
                <PodiumCard
                  key={`podium-${comp.name}-${comp.rank}`}
                  $rank={comp.rank}
                  $isUser={comp.isUser}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: comp.rank * 0.1 }}
                >
                  <CrownOrMedal $rank={comp.rank}>
                    {comp.rank === 1 ? "👑" : comp.rank === 2 ? "🥈" : "🥉"}
                  </CrownOrMedal>

                  <PodiumAvatarWrapper $rank={comp.rank}>
                    <PodiumAvatar $rank={comp.rank}>{comp.avatar}</PodiumAvatar>
                    <PodiumStatusBadge>
                      {comp.isUser ? activeStatus : comp.status || "😎"}
                    </PodiumStatusBadge>
                  </PodiumAvatarWrapper>

                  <PodiumRankBadge $rank={comp.rank}>#{comp.rank}</PodiumRankBadge>

                  <PodiumName $isUser={comp.isUser} title={comp.name}>
                    {comp.name} {comp.isUser && "(Kamu)"}
                  </PodiumName>

                  <PodiumExp>{comp.exp} EXP</PodiumExp>
                </PodiumCard>
              ))}
            </PodiumSection>
          )}

          {/* 4. Leaderboard List (Rank 4+) */}
          <LeaderboardStack>
            {restList.map((comp) => {
              const isPromotionBoundary = comp.rank === 5;
              const isDemotionBoundary = comp.rank === 25;

              return (
                <React.Fragment key={`${comp.name}-${comp.rank}`}>
                  <RowItem
                    $isUser={comp.isUser}
                    $rank={comp.rank}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RankBadge $rank={comp.rank}>{comp.rank}</RankBadge>

                    <UserInfo>
                      <AvatarContainer>
                        <AvatarCircle $rank={comp.rank}>
                          {comp.avatar}
                        </AvatarCircle>
                        <StatusEmojiBadge>
                          {comp.isUser ? activeStatus : comp.status || "😎"}
                        </StatusEmojiBadge>
                      </AvatarContainer>

                      <NameGroup>
                        <Username $isUser={comp.isUser} title={comp.name}>
                          {comp.name} {comp.isUser && "(Kamu)"}
                        </Username>
                        <StreakTag>🔥 {comp.streak}</StreakTag>
                      </NameGroup>
                    </UserInfo>

                    <ExpValue $isUser={comp.isUser}>{comp.exp} EXP</ExpValue>
                  </RowItem>

                  {/* Promotion Zone Divider */}
                  {isPromotionBoundary && (
                    <ZoneDivider $color="#10b981">
                      ⬆️ ZONA PROMOSI (TOP 5 NAIK LIGA) ⬆️
                    </ZoneDivider>
                  )}

                  {/* Demotion Zone Divider */}
                  {isDemotionBoundary && (
                    <ZoneDivider $color="#ef4444">
                      ⬇️ ZONA DEGRADASI (BOTTOM 5 TURUN LIGA) ⬇️
                    </ZoneDivider>
                  )}
                </React.Fragment>
              );
            })}
          </LeaderboardStack>

          {/* Static Bottom Action Banner */}
          <ActionBannerContainer>
            <StartQuizBtn href="/lesson">
              ⚡ Pelajari Soal & Naikkan Peringkat
            </StartQuizBtn>
          </ActionBannerContainer>
        </MainSection>

        {/* Right Column: Status Selector Widget */}
        <div>
          <WidgetCard>
            <WidgetTitle>Pasang statusmu</WidgetTitle>

            <StatusAvatarBox>
              <BigAvatar>
                {profile.avatar || "🦊"}
                <BigStatusBubble>{activeStatus}</BigStatusBubble>
              </BigAvatar>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>
                  {profile.displayName || "JapanApp Learner"}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    marginTop: "2px",
                  }}
                >
                  Pilih emoji untuk status liga!
                </div>
              </div>
            </StatusAvatarBox>

            <StatusGrid>
              {MOCK_STATUSES.map((emoji) => (
                <EmojiBtn
                  key={emoji}
                  $active={activeStatus === emoji}
                  onClick={() => handleStatusChange(emoji)}
                  title={`Pilih ${emoji}`}
                >
                  {emoji}
                </EmojiBtn>
              ))}
            </StatusGrid>
          </WidgetCard>
        </div>
      </ContentLayout>
    </PageContainer>
  );
}
