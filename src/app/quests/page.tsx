"use client";

import React, { useMemo } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { getDailyQuests } from "@/utils/dailyQuests";
import { CheckIcon } from "@/components/common/CheckIcon";

/* ─── Layout & Page Containers ───────────────────────────────────────────── */
const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;

  @media (max-width: 1024px) {
    padding: 1rem 1rem 96px 1rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem 96px 0.5rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

/* ─── 1. Monthly Challenge Hero Card ─────────────────────────────────────── */
const MonthlyCard = styled.div`
  background: linear-gradient(135deg, #0d9488 0%, #14b8a6 40%, #06b6d4 100%);
  border-radius: 28px;
  padding: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 30px -5px rgba(20, 184, 166, 0.35);

  @media (max-width: 640px) {
    padding: 1.5rem;
    border-radius: 22px;
  }
`;

const MonthBadge = styled.span`
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(8px);
  color: white;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  padding: 0.35rem 0.85rem;
  border-radius: 10px;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 0.85rem;
`;

const MonthTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 900;
  margin-bottom: 0.35rem;
  color: white;
  letter-spacing: -0.02em;

  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

const MonthTimeLeft = styled.div`
  font-size: 0.85rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const MonthProgressBox = styled.div`
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ProgressLabel = styled.div`
  font-size: 0.95rem;
  font-weight: 800;
  color: white;
`;

const TrackOuter = styled.div`
  width: 100%;
  height: 22px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
`;

const TrackFill = styled.div<{ $pct: number }>`
  width: ${({ $pct }) => Math.min(100, Math.max(0, $pct))}%;
  height: 100%;
  background: linear-gradient(90deg, #38bdf8 0%, #22d3ee 100%);
  border-radius: 999px;
  transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const TrackText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
`;

const MascotBadge = styled.div`
  position: absolute;
  right: -5px;
  top: -5px;
  font-size: 1.5rem;
  background: #38bdf8;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

/* ─── 2. Daily Quests Section ─────────────────────────────────────────────── */
const SectionCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.75rem;
  box-shadow: var(--shadow-sm);

  @media (max-width: 640px) {
    padding: 1.25rem;
    border-radius: 20px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 850;
  color: var(--foreground);
`;

const TimeTag = styled.div`
  font-size: 0.8rem;
  font-weight: 800;
  color: #f59e0b;
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const QuestStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const QuestRow = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1.15rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-light);
  }

  @media (max-width: 640px) {
    padding: 1rem;
    gap: 0.85rem;
  }
`;

const QuestIconBox = styled.div`
  font-size: 2.2rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const QuestDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const QuestTitleText = styled.div`
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--foreground);

  @media (max-width: 640px) {
    font-size: 0.88rem;
  }
`;

const QuestTrackOuter = styled.div`
  width: 100%;
  height: 14px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
`;

const QuestTrackFill = styled.div<{ $pct: number; $color?: string }>`
  width: ${({ $pct }) => Math.min(100, Math.max(0, $pct))}%;
  height: 100%;
  background: ${({ $color }) => $color || "#eab308"};
  border-radius: 999px;
  transition: width 0.4s ease;
`;

const QuestTrackText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.68rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
`;

const ClaimBtn = styled.button<{ $claimed?: boolean }>`
  width: 115px;
  height: 38px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ $claimed }) => ($claimed ? "rgba(255, 255, 255, 0.08)" : "#eab308")};
  color: ${({ $claimed }) => ($claimed ? "var(--text-secondary)" : "black")};
  border: none;
  border-radius: 12px;
  padding: 0 0.5rem;
  font-weight: 900;
  font-size: 0.85rem;
  cursor: ${({ $claimed }) => ($claimed ? "default" : "pointer")};
  box-shadow: ${({ $claimed }) => ($claimed ? "none" : "0 4px 12px rgba(234, 179, 8, 0.35)")};
  transition: all 0.2s ease;

  &:hover {
    ${({ $claimed }) => (!$claimed ? "transform: translateY(-1px); filter: brightness(1.1);" : "")}
  }
`;

const QuestGoBtn = styled(Link)`
  width: 115px;
  height: 38px;
  flex-shrink: 0;
  background: #eab308;
  color: black;
  border: none;
  border-radius: 12px;
  padding: 0 0.5rem;
  font-weight: 900;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(234, 179, 8, 0.35);
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  .hover-text {
    display: none;
  }
  .default-text {
    display: inline;
  }

  &:hover {
    background: #3b82f6;
    color: white;
    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.45);
    transform: translateY(-1px);

    .default-text {
      display: none;
    }
    .hover-text {
      display: inline-block;
      font-size: 0.88rem;
      letter-spacing: 0.05em;
    }
  }
`;

/* ─── 3. Monthly Badges History Side Panel ────────────────────────────────── */
const SideTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 850;
  color: var(--foreground);
  margin-bottom: 1rem;
`;

const BadgeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const BadgeItem = styled.div<{ $unlocked?: boolean }>`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1rem 1.15rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: ${({ $unlocked }) => ($unlocked ? 1 : 0.5)};
  filter: ${({ $unlocked }) => ($unlocked ? "none" : "grayscale(60%)")};
`;

const BadgeIconCircle = styled.div<{ $color?: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ $color }) => $color || "rgba(var(--primary-rgb), 0.15)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const BadgeTextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const BadgeName = styled.span`
  font-size: 0.92rem;
  font-weight: 800;
  color: var(--foreground);
`;

const BadgeDate = styled.span`
  font-size: 0.78rem;
  color: var(--text-secondary);
`;

export default function QuestsPage() {
  const { progress, claimQuestReward } = useProgress();
  const claimedQuests = progress.claimedQuests || [];
  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);

  const dailyQuests = useMemo(
    () => getDailyQuests(todayStr, progress),
    [todayStr, progress],
  );

  const currentMonthPrefix = useMemo(
    () => new Date().toISOString().slice(0, 7),
    [],
  );

  const currentMonthName = useMemo(() => {
    return new Date().toLocaleDateString("id-ID", { month: "long" }).toUpperCase();
  }, []);

  const currentMonthTitle = useMemo(() => {
    const month = new Date().toLocaleDateString("id-ID", { month: "long" });
    return `Misi ${month.charAt(0).toUpperCase() + month.slice(1)}`;
  }, []);

  const daysLeftInMonth = useMemo(() => {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return lastDay.getDate() - now.getDate() + 1;
  }, []);

  const hoursLeftToday = useMemo(() => {
    const now = new Date();
    return Math.max(1, 24 - now.getHours());
  }, []);

  const completedQuestsCount = useMemo(() => {
    const monthlyClaimed = claimedQuests.filter((id) =>
      id.startsWith(currentMonthPrefix),
    ).length;

    const todayCompletedUnclaimed = dailyQuests.filter(
      (q) => q.isCompleted && !claimedQuests.includes(q.id),
    ).length;

    return Math.min(50, monthlyClaimed + todayCompletedUnclaimed);
  }, [claimedQuests, currentMonthPrefix, dailyQuests]);

  const monthlyBadges = [
    { name: "Misi Juni", date: "Juni 2026", icon: "🤿", color: "rgba(14, 165, 233, 0.2)", unlocked: true },
    { name: "Misi Mei", date: "Mei 2026", icon: "🎏", color: "rgba(236, 72, 153, 0.2)", unlocked: true },
    { name: "Misi April", date: "April 2026", icon: "👩‍🚀", color: "rgba(168, 85, 247, 0.2)", unlocked: true },
    { name: "Misi Maret", date: "Maret 2026", icon: "🐯", color: "rgba(245, 158, 11, 0.2)", unlocked: true },
    { name: "Misi Februari", date: "Februari 2026", icon: "🐸", color: "rgba(16, 185, 129, 0.2)", unlocked: true },
    { name: "Misi Januari", date: "Januari 2026", icon: "🥶", color: "rgba(59, 130, 246, 0.2)", unlocked: true },
  ];

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Misi" />

      <ContentGrid>
        {/* Main Column */}
        <MainColumn>
          {/* 1. Monthly Challenge Card */}
          <MonthlyCard>
            <MonthBadge>{currentMonthName}</MonthBadge>
            <MonthTitle>{currentMonthTitle}</MonthTitle>
            <MonthTimeLeft>⏱️ {daysLeftInMonth} HARI SISA</MonthTimeLeft>

            <MonthProgressBox>
              <ProgressLabel>Taklukkan 50 misi</ProgressLabel>
              <TrackOuter>
                <TrackFill $pct={(completedQuestsCount / 50) * 100} />
                <TrackText>{completedQuestsCount} / 50</TrackText>
                <MascotBadge>🤿</MascotBadge>
              </TrackOuter>
            </MonthProgressBox>
          </MonthlyCard>

          {/* 2. Daily Quests Section */}
          <SectionCard>
            <SectionHeader>
              <SectionTitle>Misi Harian</SectionTitle>
              <TimeTag>🕒 {hoursLeftToday} JAM</TimeTag>
            </SectionHeader>

            <QuestStack>
              {dailyQuests.map((q) => {
                const isClaimed = q.isCompleted && claimedQuests.includes(q.id);
                return (
                  <QuestRow key={q.id}>
                    <QuestIconBox>{q.icon}</QuestIconBox>
                    <QuestDetail>
                      <QuestTitleText>{q.title}</QuestTitleText>
                      <QuestTrackOuter>
                        <QuestTrackFill $pct={(q.current / q.target) * 100} $color={q.color} />
                        <QuestTrackText>{q.current} / {q.target}</QuestTrackText>
                      </QuestTrackOuter>
                    </QuestDetail>
                    {q.isCompleted && !isClaimed ? (
                      <ClaimBtn onClick={() => claimQuestReward(q.id, q.rewardGems)}>
                        Klaim +{q.rewardGems} 💎
                      </ClaimBtn>
                    ) : isClaimed ? (
                      <ClaimBtn $claimed disabled>
                        Diklaim <CheckIcon size={14} style={{ marginLeft: "4px" }} />
                      </ClaimBtn>
                    ) : (
                      <QuestGoBtn href={q.actionUrl || "/lesson"}>
                        <span className="default-text">🎁 +{q.rewardGems} 💎</span>
                        <span className="hover-text">GO 🚀</span>
                      </QuestGoBtn>
                    )}
                  </QuestRow>
                );
              })}
            </QuestStack>
          </SectionCard>
        </MainColumn>

        {/* Side Column */}
        <SideColumn>
          <SectionCard>
            <SideTitle>Lencana Bulanan</SideTitle>
            <BadgeList>
              {monthlyBadges.map((b) => (
                <BadgeItem key={b.name} $unlocked={b.unlocked}>
                  <BadgeIconCircle $color={b.color}>{b.icon}</BadgeIconCircle>
                  <BadgeTextGroup>
                    <BadgeName>{b.name}</BadgeName>
                    <BadgeDate>{b.date}</BadgeDate>
                  </BadgeTextGroup>
                </BadgeItem>
              ))}
            </BadgeList>
          </SectionCard>
        </SideColumn>
      </ContentGrid>
    </Container>
  );
}
