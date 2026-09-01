"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { CheckIcon } from "@/components/common/CheckIcon";

const SectionCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.75rem;
  box-shadow: var(--shadow-sm);

  @media (max-width: 640px) {
    padding: 1.15rem;
    border-radius: 20px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    margin-bottom: 1.15rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 850;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 640px) {
    font-size: 1.1rem;
  }
`;

const TimeTag = styled.div`
  font-size: 0.8rem;
  font-weight: 800;
  color: #f59e0b;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(245, 158, 11, 0.12);
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  border: 1px solid rgba(245, 158, 11, 0.25);

  @media (max-width: 640px) {
    font-size: 0.72rem;
    padding: 0.2rem 0.5rem;
  }
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
    padding: 0.9rem;
    gap: 0.75rem;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "icon detail"
      "action action";
    row-gap: 0.75rem;
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

  @media (max-width: 640px) {
    width: 40px;
    height: 40px;
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    grid-area: icon;
  }
`;

const QuestDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;

  @media (max-width: 480px) {
    grid-area: detail;
  }
`;

const QuestTitleText = styled.div`
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--foreground);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 640px) {
    font-size: 0.88rem;
    white-space: normal;
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

const ActionWrapper = styled.div`
  flex-shrink: 0;

  @media (max-width: 480px) {
    grid-area: action;
    width: 100%;
  }
`;

const ClaimBtn = styled.button<{ $claimed?: boolean }>`
  width: 115px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ $claimed }) => ($claimed ? "rgba(255, 255, 255, 0.08)" : "#eab308")};
  color: ${({ $claimed }) => ($claimed ? "var(--text-secondary)" : "#1e293b")};
  border: none;
  border-bottom: ${({ $claimed }) => ($claimed ? "none" : "3px solid #ca8a04")};
  border-radius: 12px;
  padding: 0 0.5rem;
  font-weight: 900;
  font-size: 0.85rem;
  cursor: ${({ $claimed }) => ($claimed ? "default" : "pointer")};
  box-shadow: ${({ $claimed }) => ($claimed ? "none" : "0 4px 12px rgba(234, 179, 8, 0.35)")};
  transition: all 0.15s ease;

  &:hover {
    ${({ $claimed }) =>
      !$claimed ? "transform: translateY(-1px); filter: brightness(1.1);" : ""}
  }

  &:active {
    ${({ $claimed }) =>
      !$claimed ? "transform: translateY(2px); border-bottom: 0px solid transparent;" : ""}
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 38px;
  }
`;

const QuestGoBtn = styled(Link)`
  width: 115px;
  height: 40px;
  background: #eab308;
  color: #1e293b;
  border: none;
  border-bottom: 3px solid #ca8a04;
  border-radius: 12px;
  padding: 0 0.5rem;
  font-weight: 900;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(234, 179, 8, 0.35);
  transition: all 0.15s ease;
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
    border-bottom: 3px solid #2563eb;
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

  &:active {
    transform: translateY(2px);
    border-bottom: 0px solid transparent;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 38px;
  }
`;

/* Friends Quest Card (Duolingo Feature) */
const FriendsQuestBanner = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1.15rem 1.35rem;
  margin-top: 1.5rem;
  color: var(--foreground);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 0.85rem;
  }
`;

const FriendsLeftFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const FriendsAvatarsBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 64px;
  height: 40px;
  flex-shrink: 0;
`;

const AvatarCircle = styled.div<{ $left: number; $bg: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg};
  border: 2px solid var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  position: absolute;
  left: ${({ $left }) => $left}px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const FriendsTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const FriendsTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 850;
  color: var(--foreground);

  @media (max-width: 640px) {
    font-size: 0.88rem;
  }
`;

const FriendsSub = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 700;
`;

const FriendsRewardBadge = styled.div`
  background: rgba(234, 179, 8, 0.12);
  border: 1px solid rgba(234, 179, 8, 0.25);
  padding: 0.4rem 0.85rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 850;
  color: #eab308;
  display: flex;
  align-items: center;
  gap: 0.35rem;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
  }
`;

interface DailyQuestItem {
  id: string;
  title: string;
  icon: string;
  current: number;
  target: number;
  rewardGems: number;
  isCompleted: boolean;
  actionUrl?: string;
  color?: string;
}

interface DailyQuestsSectionProps {
  dailyQuests: DailyQuestItem[];
  claimedQuests: string[];
  hoursLeftToday: number;
  onClaim: (questId: string, rewardGems: number) => void;
}

export const DailyQuestsSection: React.FC<DailyQuestsSectionProps> = ({
  dailyQuests,
  claimedQuests,
  hoursLeftToday,
  onClaim,
}) => {
  return (
    <SectionCard>
      <SectionHeader>
        <SectionTitle>⚡ Misi Harian</SectionTitle>
        <TimeTag>🕒 {hoursLeftToday} JAM SISA</TimeTag>
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
                  <QuestTrackText>
                    {q.current} / {q.target}
                  </QuestTrackText>
                </QuestTrackOuter>
              </QuestDetail>

              <ActionWrapper>
                {q.isCompleted && !isClaimed ? (
                  <ClaimBtn onClick={() => onClaim(q.id, q.rewardGems)}>
                    Klaim +{q.rewardGems} 💎
                  </ClaimBtn>
                ) : isClaimed ? (
                  <ClaimBtn $claimed disabled>
                    Diklaim <CheckIcon size={14} style={{ marginLeft: "4px" }} />
                  </ClaimBtn>
                ) : (
                  <QuestGoBtn href={q.actionUrl || "/lessons"}>
                    <span className="default-text">🎁 +{q.rewardGems} 💎</span>
                    <span className="hover-text">GO 🚀</span>
                  </QuestGoBtn>
                )}
              </ActionWrapper>
            </QuestRow>
          );
        })}
      </QuestStack>

      {/* Friends Quest Banner */}
      <FriendsQuestBanner>
        <FriendsLeftFlex>
          <FriendsAvatarsBox>
            <AvatarCircle $left={0} $bg="#0284c7">
              🦊
            </AvatarCircle>
            <AvatarCircle $left={24} $bg="#eab308">
              🐼
            </AvatarCircle>
          </FriendsAvatarsBox>
          <FriendsTextGroup>
            <FriendsTitle>Misi Teman: Selesaikan 10 Pelajaran Bersama!</FriendsTitle>
            <FriendsSub>Progres Bersama: 8 / 10 Selesai</FriendsSub>
          </FriendsTextGroup>
        </FriendsLeftFlex>
        <FriendsRewardBadge>+100 💎 & Boost 2X EXP 🔥</FriendsRewardBadge>
      </FriendsQuestBanner>
    </SectionCard>
  );
};
