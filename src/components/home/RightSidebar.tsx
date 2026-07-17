import React, { useMemo } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";

/* ─── Sidebar Outer Container ────────────────────────────────────────────── */
const SidebarWrapper = styled.aside`
  width: 360px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: sticky;
  top: 1.5rem;
  align-self: flex-start;
  z-index: 10;

  @media (max-width: 1024px) {
    display: none;
  }
`;

/* ─── 1. Top Header Stat Row ─────────────────────────────────────────────── */
const StatHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 0.6rem 0.85rem;
  box-shadow: var(--shadow-sm);
`;

const StatPill = styled.div<{ $color?: string }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 800;
  font-size: 0.9rem;
  color: ${({ $color }) => $color || "var(--foreground)"};
`;

const FlagBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.25rem 0.5rem;
  font-size: 0.85rem;
  font-weight: 800;
`;

/* ─── 2. Super Promo Card ────────────────────────────────────────────────── */
const SuperCard = styled.div`
  background: linear-gradient(135deg, #1e1b4b 0%, #311b92 50%, #4c1d95 100%);
  border: 1.5px solid rgba(168, 85, 247, 0.4);
  border-radius: 20px;
  padding: 1.25rem;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.3);

  &::after {
    content: "";
    position: absolute;
    top: -40%;
    right: -20%;
    width: 180px;
    height: 180px;
    background: radial-gradient(
      circle,
      rgba(236, 72, 153, 0.3) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const SuperBadge = styled.span`
  background: linear-gradient(90deg, #ec4899, #8b5cf6);
  color: white;
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 0.6rem;
  box-shadow: 0 2px 8px rgba(236, 72, 153, 0.4);
`;

const SuperTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
  line-height: 1.3;
  color: #ffffff;
`;

const SuperSubtitle = styled.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.45;
  margin-bottom: 1.1rem;
`;

const SuperButton = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  font-weight: 900;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  text-decoration: none;
  border-bottom: 3.5px solid #4338ca;
  transition: all 0.15s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 1px;
  }
`;

/* ─── 3. Card Base Component ─────────────────────────────────────────────── */
const WidgetCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.15rem;
  box-shadow: var(--shadow-sm);
`;

const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const WidgetTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--foreground);
`;

const WidgetLink = styled(Link)`
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--primary);
  text-decoration: none;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

/* ─── League / Leaderboard Widget ────────────────────────────────────────── */
const LeagueBody = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.85rem 1rem;
`;

const ShieldIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #475569 0%, #334155 100%);
  border: 2px solid #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const WarningBadge = styled.div`
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ef4444;
  color: white;
  font-size: 0.65rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--surface);
`;

const LeagueTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

const LeagueRankText = styled.span`
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--foreground);
`;

const LeagueStatusText = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.3;
`;

/* ─── Daily Quests Widget ────────────────────────────────────────────────── */
const QuestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const QuestItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
`;

const QuestIcon = styled.div`
  font-size: 1.5rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuestContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const QuestTitle = styled.div`
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--foreground);
  line-height: 1.25;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
`;

const ProgressFill = styled.div<{ $pct: number; $color?: string }>`
  width: ${({ $pct }) => Math.min(100, Math.max(0, $pct))}%;
  height: 100%;
  background: ${({ $color }) => $color || "#eab308"};
  border-radius: 999px;
  transition: width 0.4s ease;
`;

const ProgressText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.65rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
`;

const ChestIcon = styled.div<{ $completed?: boolean }>`
  font-size: 1.3rem;
  opacity: ${({ $completed }) => ($completed ? 1 : 0.6)};
  filter: ${({ $completed }) => ($completed ? "none" : "grayscale(0.5)")};
`;

/* ─── Main Component ─────────────────────────────────────────────────────── */
export function RightSidebar() {
  const { progress } = useProgress();

  const isDailyCompleted = useMemo(() => {
    if (!progress.lastActiveDate) return false;
    const today = new Date().toISOString().split("T")[0];
    return progress.lastActiveDate === today;
  }, [progress.lastActiveDate]);

  return (
    <SidebarWrapper>
      {/* 1. Stat Header Row */}
      <StatHeaderRow>
        <FlagBox>
          🇯🇵 <span>JP</span>
        </FlagBox>
        <StatPill $color="#f59e0b" title="Streak Hari Ini">
          🔥 {progress.streak || 1}
        </StatPill>
        <StatPill $color="#3b82f6" title="Total EXP">
          💎 {progress.exp || 735}
        </StatPill>
        <StatPill $color="#ef4444" title="Nyawa">
          ❤️ 5
        </StatPill>
      </StatHeaderRow>

      {/* 2. Super Promo Card */}
      <SuperCard>
        <SuperBadge>Super</SuperBadge>
        <SuperTitle>Naik level dengan Super</SuperTitle>
        <SuperSubtitle>
          Bebas iklan, latihan yang dipersonalisasi, dan fitur premium tak
          terbatas!
        </SuperSubtitle>
        <SuperButton href="/sakura-fitur">DAPATKAN SUPER</SuperButton>
      </SuperCard>

      {/* 3. League Card */}
      <WidgetCard>
        <WidgetHeader>
          <WidgetTitle>Liga Obsidian</WidgetTitle>
          <WidgetLink href="/profile">LIHAT LIGA</WidgetLink>
        </WidgetHeader>
        <LeagueBody>
          <ShieldIconBox>
            🛡️
            <WarningBadge>!</WarningBadge>
          </ShieldIconBox>
          <LeagueTextGroup>
            <LeagueRankText>Kamu di peringkat #9</LeagueRankText>
            <LeagueStatusText>
              Kamu merosot ke zona penurunan!
            </LeagueStatusText>
          </LeagueTextGroup>
        </LeagueBody>
      </WidgetCard>

      {/* 4. Daily Quests Card */}
      <WidgetCard>
        <WidgetHeader>
          <WidgetTitle>Misi Harian</WidgetTitle>
          <WidgetLink href="/daily-quiz">LIHAT SEMUA</WidgetLink>
        </WidgetHeader>
        <QuestList>
          {/* Quest 1 */}
          <QuestItem>
            <QuestIcon>⚡</QuestIcon>
            <QuestContent>
              <QuestTitle>Dapatkan 10 XP</QuestTitle>
              <ProgressTrack>
                <ProgressFill $pct={100} $color="#eab308" />
                <ProgressText>10 / 10</ProgressText>
              </ProgressTrack>
            </QuestContent>
            <ChestIcon $completed={true}>🎁</ChestIcon>
          </QuestItem>

          {/* Quest 2 */}
          <QuestItem>
            <QuestIcon>🦉</QuestIcon>
            <QuestContent>
              <QuestTitle>
                Benar 5 kali berturut-turut dalam 2 pelajaran
              </QuestTitle>
              <ProgressTrack>
                <ProgressFill
                  $pct={isDailyCompleted ? 100 : 0}
                  $color="#10b981"
                />
                <ProgressText>{isDailyCompleted ? "2 / 2" : "0 / 2"}</ProgressText>
              </ProgressTrack>
            </QuestContent>
            <ChestIcon $completed={isDailyCompleted}>🎁</ChestIcon>
          </QuestItem>

          {/* Quest 3 */}
          <QuestItem>
            <QuestIcon>🎯</QuestIcon>
            <QuestContent>
              <QuestTitle>
                Raih skor 80% ke atas dalam 3 pelajaran
              </QuestTitle>
              <ProgressTrack>
                <ProgressFill
                  $pct={isDailyCompleted ? 66 : 0}
                  $color="#8b5cf6"
                />
                <ProgressText>{isDailyCompleted ? "2 / 3" : "0 / 3"}</ProgressText>
              </ProgressTrack>
            </QuestContent>
            <ChestIcon $completed={false}>🎁</ChestIcon>
          </QuestItem>
        </QuestList>
      </WidgetCard>
    </SidebarWrapper>
  );
}
