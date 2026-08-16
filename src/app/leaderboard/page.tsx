"use client";

import React, { useState, useMemo } from "react";
import styled, { keyframes, css } from "styled-components";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useDeviceMode } from "@/context/DeviceModeContext";
import { LEAGUES_DATA, getLeagueById, getRankStatus } from "@/data/leagues";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CheckIcon } from "@/components/common/CheckIcon";
import { RightSidebar } from "@/components/home/RightSidebar";

/* ─── Keyframe Animations ────────────────────────────────────────────────── */
const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 15px rgba(234, 179, 8, 0.25); }
  50% { box-shadow: 0 0 25px rgba(234, 179, 8, 0.5); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

/* ─── Styled Components ──────────────────────────────────────────────────── */
const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  min-height: 90vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2rem;
  margin-top: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

/* ─── League Tier Ribbon Carousel ────────────────────────────────────────── */
const TierRibbonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
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
  background: ${({ $active, $color }) =>
    $active ? `rgba(var(--primary-rgb), 0.15)` : "rgba(255, 255, 255, 0.03)"};
  border: 2px solid
    ${({ $active, $color }) => ($active ? $color : "transparent")};
  transform: ${({ $active }) => ($active ? "scale(1.15)" : "scale(0.95)")};
  box-shadow: ${({ $active, $color }) =>
    $active ? `0 0 16px ${$color}50` : "none"};

  &:hover {
    transform: scale(1.1);
  }
`;

/* ─── League Banner Header ────────────────────────────────────────────────── */
const BannerCard = styled.div<{ $borderColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.75rem 1.5rem;
  background: linear-gradient(135deg, var(--surface) 0%, rgba(30, 41, 59, 0.5) 100%);
  border: 2px solid ${({ $borderColor }) => $borderColor};
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  position: relative;
  overflow: hidden;
`;

const LargeLeagueIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
`;

const LeagueTitle = styled.h1`
  font-size: 1.85rem;
  font-weight: 900;
  color: var(--foreground);
  margin: 0;
  letter-spacing: -0.02em;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

const LeagueSubtitle = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0.35rem 0 0;
  font-weight: 600;
`;

const CountdownPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(234, 179, 8, 0.12);
  border: 1px solid rgba(234, 179, 8, 0.3);
  color: #eab308;
  font-size: 0.85rem;
  font-weight: 800;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  margin-top: 0.75rem;
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

  &:hover {
    transform: translateX(4px);
    border-color: ${({ $isUser }) =>
      $isUser ? "var(--primary)" : "var(--primary-light)"};
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.9rem;
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
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex: 1;
  margin: 0 1rem;
  min-width: 0;
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
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
`;

const NameGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Username = styled.span<{ $isUser?: boolean }>`
  font-weight: 800;
  font-size: 0.95rem;
  color: ${({ $isUser }) => ($isUser ? "var(--primary)" : "var(--foreground)")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const StreakTag = styled.span`
  font-size: 0.72rem;
  color: #f59e0b;
  font-weight: 700;
`;

const ExpValue = styled.span<{ $isUser?: boolean }>`
  font-weight: 900;
  font-size: 0.95rem;
  color: ${({ $isUser }) => ($isUser ? "var(--primary)" : "var(--foreground)")};
  white-space: nowrap;
  flex-shrink: 0;
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
`;

const StickyActionBanner = styled.div`
  position: sticky;
  bottom: 1.5rem;
  z-index: 20;
  margin-top: 1.5rem;
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(79, 70, 229, 0.45);
  }
`;

/* ─── Mock Competitors Generator ─────────────────────────────────────────── */
const MOCK_AVATARS = ["🦊", "🐼", "🐯", "🐰", "🦁", "🐨", "🐸", "🐻", "🦄", "🐵"];
const MOCK_STATUSES = ["😎", "🥳", "💪", "🧐", "🍿", "👑", "🦊", "💯", "💩", "🏆", "🍱", "😼"];

const MOCK_COMPETITORS: { rank: number; name: string; avatar: string; exp: number; streak: string }[] = [];

export default function LeaderboardPage() {
  const { progress, setStatusEmoji } = useProgress();
  const { deviceMode } = useDeviceMode();

  const userLeague = progress.league || {
    currentLeagueId: "bronze",
    rank: 1,
    weeklyExp: progress.exp || 205,
  };

  const currentLeague = getLeagueById(userLeague.currentLeagueId);
  const rankInfo = getRankStatus(userLeague.rank);
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
      name: profile.displayName || "JapanApp Learner (Kamu)",
      avatar: profile.avatar || "🦊",
      status: activeStatus,
      exp: Math.max(userLeague.weeklyExp || 205, progress.exp || 205),
      streak: `${progress.streak || 2} hari`,
      isUser: true,
    };

    const combined = [userEntry, ...MOCK_COMPETITORS.map((c, i) => ({
      ...c,
      status: MOCK_STATUSES[i % MOCK_STATUSES.length],
      isUser: false,
    }))];

    // Re-sort by EXP descending
    combined.sort((a, b) => b.exp - a.exp);

    // Assign final ranks 1..N
    return combined.map((item, idx) => ({ ...item, rank: idx + 1 }));
  }, [userLeague, profile, progress.exp, progress.streak, activeStatus]);

  return (
    <PageContainer>
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

          {/* 3. Leaderboard List */}
          <LeaderboardStack>
            {leaderboardList.map((comp) => {
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
                        <Username $isUser={comp.isUser}>
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

          {/* Sticky Bottom Action Banner */}
          <StickyActionBanner>
            <StartQuizBtn href="/lesson">
              ⚡ Pelajari Soal & Naikkan Peringkat
            </StartQuizBtn>
          </StickyActionBanner>
        </MainSection>

        {/* Right Column: Status Selector & Widgets */}
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
