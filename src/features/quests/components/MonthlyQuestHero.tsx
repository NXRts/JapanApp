"use client";

import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.75rem;
  color: var(--foreground);
  position: relative;
  box-shadow: var(--shadow-sm);
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 18px;
  }
`;

const TopMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 1rem;

  @media (max-width: 640px) {
    gap: 0.4rem;
    margin-bottom: 0.85rem;
    justify-content: center;
  }
`;

const MonthBadge = styled.span`
  background: rgba(20, 184, 166, 0.15);
  color: #2dd4bf;
  border: 1px solid rgba(20, 184, 166, 0.3);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  padding: 0.3rem 0.65rem;
  border-radius: 9px;
  text-transform: uppercase;
  white-space: nowrap;

  @media (max-width: 640px) {
    font-size: 0.68rem;
    padding: 0.22rem 0.5rem;
  }
`;

const TimerBadge = styled.span`
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.3rem 0.65rem;
  border-radius: 9px;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  white-space: nowrap;

  @media (max-width: 640px) {
    font-size: 0.68rem;
    padding: 0.22rem 0.5rem;
  }
`;

const RewardBadgeHeader = styled.span`
  background: rgba(245, 158, 11, 0.12);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.25);
  font-size: 0.72rem;
  font-weight: 850;
  padding: 0.3rem 0.65rem;
  border-radius: 9px;
  white-space: nowrap;

  @media (max-width: 640px) {
    font-size: 0.68rem;
    padding: 0.22rem 0.5rem;
  }

  @media (max-width: 440px) {
    display: none;
  }
`;

const MainContentFlex = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 0.85rem;
  }
`;

const HeaderGroup = styled.div`
  flex: 1;

  @media (max-width: 640px) {
    text-align: center;
  }
`;

const MonthTitle = styled.h1`
  font-size: 2.1rem;
  font-weight: 900;
  margin-bottom: 0.35rem;
  color: var(--foreground);
  letter-spacing: -0.01em;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

const MonthSubText = styled.p`
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-secondary);
  line-height: 1.45;
  margin-bottom: 1.5rem;
  max-width: 480px;

  @media (max-width: 640px) {
    font-size: 0.82rem;
    margin-bottom: 1.15rem;
  }
`;

const MascotWrapper = styled.div`
  width: 92px;
  height: 92px;
  flex-shrink: 0;
  border-radius: 50%;
  background: rgba(20, 184, 166, 0.1);
  border: 2px solid rgba(20, 184, 166, 0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 640px) {
    width: 76px;
    height: 76px;
  }
`;

const MascotEmoji = styled.div`
  font-size: 2.6rem;
  line-height: 1;

  @media (max-width: 640px) {
    font-size: 2.1rem;
  }
`;

const MascotLabel = styled.span`
  font-size: 0.6rem;
  font-weight: 900;
  color: #2dd4bf;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 2px;
  background: rgba(0, 0, 0, 0.3);
  padding: 1px 6px;
  border-radius: 6px;
`;

/* Progress Box & Milestones */
const ProgressBox = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1.25rem 1.35rem 2.25rem 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 640px) {
    padding: 1rem 0.85rem 2.15rem 0.85rem;
    border-radius: 14px;
  }
`;

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--foreground);

  @media (max-width: 640px) {
    font-size: 0.82rem;
  }
`;

const ProgressCount = styled.span`
  font-weight: 900;
  color: #2dd4bf;
`;

const TrackWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0.5rem 0 1.25rem 0;
`;

const TrackOuter = styled.div`
  width: 100%;
  height: 18px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
`;

const TrackFill = styled.div<{ $pct: number }>`
  width: ${({ $pct }) => Math.min(100, Math.max(0, $pct))}%;
  height: 100%;
  background: #0d9488;
  border-radius: 999px;
  transition: width 0.5s ease;
`;

const MilestonesContainer = styled.div`
  position: absolute;
  top: 17px;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0;
  pointer-events: none;
`;

const MilestoneNode = styled.div<{ $pos: number }>`
  position: absolute;
  left: ${({ $pos }) => $pos}%;
  transform: translateX(-50%);
  pointer-events: auto;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NodeIconCircle = styled.div<{ $reached?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ $reached }) => ($reached ? "#f59e0b" : "var(--surface)")};
  border: 2px solid ${({ $reached }) => ($reached ? "#fef08a" : "var(--border)")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.15);
  }

  @media (max-width: 640px) {
    width: 24px;
    height: 24px;
    font-size: 0.82rem;
  }
`;

const NodeLabel = styled.span<{ $reached?: boolean }>`
  font-size: 0.7rem;
  font-weight: 850;
  color: ${({ $reached }) => ($reached ? "#fef08a" : "var(--text-secondary)")};
  margin-top: 6px;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 0.62rem;
  }
`;

interface MonthlyQuestHeroProps {
  completedCount: number;
  totalTarget?: number;
  daysLeft: number;
  currentMonthTitle: string;
  currentMonthName: string;
}

export const MonthlyQuestHero: React.FC<MonthlyQuestHeroProps> = ({
  completedCount,
  totalTarget = 50,
  daysLeft,
  currentMonthTitle,
  currentMonthName,
}) => {
  const pct = (completedCount / totalTarget) * 100;

  const milestones = [
    { target: 15, pos: 30, reward: "+50 💎", icon: "🎁", label: "15 Misi" },
    { target: 30, pos: 60, reward: "+100 💎", icon: "💎", label: "30 Misi" },
    { target: 50, pos: 94, reward: "Lencana September 🏆", icon: "🏆", label: "50 Misi" },
  ];

  const monthFormatted = currentMonthName.charAt(0) + currentMonthName.slice(1).toLowerCase();

  return (
    <CardContainer>
      <TopMetaRow>
        <MonthBadge>{currentMonthName} 2026</MonthBadge>
        <TimerBadge>⏱️ {daysLeft} HARI SISA</TimerBadge>
        <RewardBadgeHeader>🏆 Lencana {monthFormatted}</RewardBadgeHeader>
      </TopMetaRow>

      <MainContentFlex>
        <HeaderGroup>
          <MonthTitle>{currentMonthTitle}</MonthTitle>
          <MonthSubText>
            Selesaikan 50 misi harian bulan ini untuk mengumpulkan Lencana Bulanan & hadiah bonus 500 Permata!
          </MonthSubText>
        </HeaderGroup>

        <MascotWrapper>
          <MascotEmoji>🦊</MascotEmoji>
          <MascotLabel>Kitsune</MascotLabel>
        </MascotWrapper>
      </MainContentFlex>

      <ProgressBox>
        <ProgressHeader>
          <span>Progres Misi Bulan Ini</span>
          <ProgressCount>
            {completedCount} / {totalTarget} Misi
          </ProgressCount>
        </ProgressHeader>

        <TrackWrapper>
          <TrackOuter>
            <TrackFill $pct={pct} />
          </TrackOuter>

          <MilestonesContainer>
            {milestones.map((m) => {
              const isReached = completedCount >= m.target;
              return (
                <MilestoneNode
                  key={m.target}
                  $pos={m.pos}
                  title={`Target: ${m.target} Misi -> Hadiah: ${m.reward}`}
                >
                  <NodeIconCircle $reached={isReached}>
                    {isReached ? "✅" : m.icon}
                  </NodeIconCircle>
                  <NodeLabel $reached={isReached}>{m.label}</NodeLabel>
                </MilestoneNode>
              );
            })}
          </MilestonesContainer>
        </TrackWrapper>
      </ProgressBox>
    </CardContainer>
  );
};
