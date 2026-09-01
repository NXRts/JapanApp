"use client";

import React, { useMemo } from "react";
import styled from "styled-components";
import { useProgress } from "@/context/ProgressContext";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { getDailyQuests } from "@/utils/dailyQuests";
import { MonthlyQuestHero } from "./components/MonthlyQuestHero";
import { DailyQuestsSection } from "./components/DailyQuestsSection";
import { MonthlyBadgesSidebar } from "./components/MonthlyBadgesSidebar";

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
    padding: 1rem 1rem 110px 1rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem 110px 0.5rem;
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

export default function QuestsFeature() {
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

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Misi" />

      <ContentGrid>
        <MainColumn>
          {/* 1. Monthly Quest Hero Card */}
          <MonthlyQuestHero
            completedCount={completedQuestsCount}
            daysLeft={daysLeftInMonth}
            currentMonthTitle={currentMonthTitle}
            currentMonthName={currentMonthName}
          />

          {/* 2. Daily Quests & Friends Quest */}
          <DailyQuestsSection
            dailyQuests={dailyQuests}
            claimedQuests={claimedQuests}
            hoursLeftToday={hoursLeftToday}
            onClaim={(id, reward) => claimQuestReward(id, reward)}
          />
        </MainColumn>

        <SideColumn>
          {/* 3. Monthly Badges Gallery Panel */}
          <MonthlyBadgesSidebar unlockedBadgeIds={(progress as any).unlockedMonthlyBadges || []} />
        </SideColumn>
      </ContentGrid>
    </Container>
  );
}
