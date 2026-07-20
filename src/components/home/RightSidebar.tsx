"use client";

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import {
  CourseModal,
  StreakModal,
  ShopModal,
  HeartsModal,
  SuperModal,
  LeaderboardModal,
  AllQuestsModal,
} from "@/components/modals/DuolingoModals";

import { getDailyQuests } from "@/utils/dailyQuests";

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

  @media (max-width: 1200px) {
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
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
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
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

/* ─── 2. Super Promo Card ────────────────────────────────────────────────── */
const SuperCard = styled.div<{ $isSuper?: boolean }>`
  background: ${({ $isSuper }) =>
    $isSuper
      ? "linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)"
      : "linear-gradient(135deg, #1e1b4b 0%, #311b92 50%, #4c1d95 100%)"};
  border: 1.5px solid ${({ $isSuper }) => ($isSuper ? "#34d399" : "rgba(168, 85, 247, 0.4)")};
  border-radius: 20px;
  padding: 1.25rem;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.3);
  cursor: pointer;

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

const SuperBadge = styled.span<{ $isSuper?: boolean }>`
  background: ${({ $isSuper }) =>
    $isSuper
      ? "linear-gradient(90deg, #10b981, #059669)"
      : "linear-gradient(90deg, #ec4899, #8b5cf6)"};
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

const SuperButton = styled.button<{ $isSuper?: boolean }>`
  display: block;
  width: 100%;
  text-align: center;
  background: ${({ $isSuper }) =>
    $isSuper
      ? "linear-gradient(90deg, #10b981 0%, #059669 100%)"
      : "linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)"};
  color: white;
  font-weight: 900;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: none;
  border-bottom: 3.5px solid ${({ $isSuper }) => ($isSuper ? "#047857" : "#4338ca")};
  transition: all 0.15s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
  cursor: pointer;

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

const WidgetActionText = styled.button`
  background: none;
  border: none;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--primary);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
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
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;

  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
  }
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

const ChestButton = styled.button<{ $completed?: boolean; $claimed?: boolean }>`
  background: none;
  border: none;
  font-size: 1.3rem;
  opacity: ${({ $completed, $claimed }) => ($claimed ? 0.4 : $completed ? 1 : 0.6)};
  filter: ${({ $completed }) => ($completed ? "none" : "grayscale(0.5)")};
  cursor: ${({ $completed, $claimed }) => ($completed && !$claimed ? "pointer" : "default")};
  transform: ${({ $completed, $claimed }) => ($completed && !$claimed ? "scale(1.1)" : "scale(1)")};
  transition: transform 0.2s ease;

  &:hover {
    ${({ $completed, $claimed }) =>
      $completed && !$claimed ? "transform: scale(1.25);" : ""}
  }
`;

/* ─── Main Component ─────────────────────────────────────────────────────── */
export function RightSidebar() {
  const { progress, claimQuestReward } = useProgress();

  const [activeModal, setActiveModal] = useState<
    "course" | "streak" | "shop" | "hearts" | "super" | "leaderboard" | "quests" | null
  >(null);

  const streak = progress.streak || 0;
  const gems = progress.gems !== undefined ? progress.gems : 100;
  const hearts = progress.hearts !== undefined ? progress.hearts : 5;
  const isSuper = progress.isSuper || false;
  const claimedQuests = progress.claimedQuests || [];

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);
  const dailyQuests = useMemo(
    () => getDailyQuests(todayStr, progress),
    [todayStr, progress],
  );

  return (
    <>
      <SidebarWrapper>
        {/* 1. Stat Header Row */}
        <StatHeaderRow>
          <FlagBox onClick={() => setActiveModal("course")} title="Pilih Tingkat JLPT">
            🇯🇵 <span>JP</span>
          </FlagBox>
          <StatPill $color="#f59e0b" title="Streak Hari Ini" onClick={() => setActiveModal("streak")}>
            🔥 {streak}
          </StatPill>
          <StatPill $color="#3b82f6" title="Buka Toko Permata" onClick={() => setActiveModal("shop")}>
            💎 {gems}
          </StatPill>
          <StatPill $color="#ef4444" title="Nyawa" onClick={() => setActiveModal("hearts")}>
            ❤️ {isSuper ? "♾️" : hearts}
          </StatPill>
        </StatHeaderRow>

        {/* 2. Super Promo Card */}
        <SuperCard $isSuper={isSuper} onClick={() => setActiveModal("super")}>
          <SuperBadge $isSuper={isSuper}>{isSuper ? "Super Active" : "Super"}</SuperBadge>
          <SuperTitle>{isSuper ? "Kamu adalah Member Super!" : "Naik level dengan Super"}</SuperTitle>
          <SuperSubtitle>
            {isSuper
              ? "Nikmati Nyawa Tak Terbatas, Bebas Iklan & Fitur Eksklusif!"
              : "Bebas iklan, latihan yang dipersonalisasi, dan fitur premium tak terbatas!"}
          </SuperSubtitle>
          <SuperButton $isSuper={isSuper} onClick={(e) => { e.stopPropagation(); setActiveModal("super"); }}>
            {isSuper ? "KELOLA SUPER" : "DAPATKAN SUPER"}
          </SuperButton>
        </SuperCard>

        {/* 3. League Card */}
        <WidgetCard>
          <WidgetHeader>
            <WidgetTitle>Liga Obsidian</WidgetTitle>
            <WidgetActionText onClick={() => setActiveModal("leaderboard")}>LIHAT LIGA</WidgetActionText>
          </WidgetHeader>
          <LeagueBody onClick={() => setActiveModal("leaderboard")}>
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
            <WidgetActionText as={Link} href="/quests" style={{ textDecoration: "none" }}>LIHAT SEMUA</WidgetActionText>
          </WidgetHeader>
          <QuestList>
            {dailyQuests.map((q) => {
              const isClaimed = q.isCompleted && claimedQuests.includes(q.id);
              return (
                <QuestItem key={q.id}>
                  <QuestIcon>{q.icon}</QuestIcon>
                  <QuestContent>
                    <QuestTitle>{q.title}</QuestTitle>
                    <ProgressTrack>
                      <ProgressFill $pct={(q.current / q.target) * 100} $color={q.color} />
                      <ProgressText>{q.current} / {q.target}</ProgressText>
                    </ProgressTrack>
                  </QuestContent>
                  <ChestButton
                    $completed={q.isCompleted}
                    $claimed={isClaimed}
                    onClick={() => q.isCompleted && !isClaimed && claimQuestReward(q.id, q.rewardGems)}
                    title={isClaimed ? "Diklaim ✓" : q.isCompleted ? `Klaim +${q.rewardGems} 💎` : "Belum Selesai"}
                  >
                    {isClaimed ? "✅" : "🎁"}
                  </ChestButton>
                </QuestItem>
              );
            })}
          </QuestList>
        </WidgetCard>
      </SidebarWrapper>

      {/* Render Active Modals */}
      {activeModal === "course" && <CourseModal onClose={() => setActiveModal(null)} />}
      {activeModal === "streak" && <StreakModal onClose={() => setActiveModal(null)} />}
      {activeModal === "shop" && <ShopModal onClose={() => setActiveModal(null)} />}
      {activeModal === "hearts" && <HeartsModal onClose={() => setActiveModal(null)} />}
      {activeModal === "super" && <SuperModal onClose={() => setActiveModal(null)} />}
      {activeModal === "leaderboard" && <LeaderboardModal onClose={() => setActiveModal(null)} />}
      {activeModal === "quests" && <AllQuestsModal onClose={() => setActiveModal(null)} />}
    </>
  );
}
