"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { RoadmapBoard } from "@/components/roadmap/RoadmapBoard";
import { useProgress } from "@/context/ProgressContext";
import { ROADMAP_DATA } from "@/data/lessonsData";

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const Header = styled.div`
  text-align: left;
  margin-bottom: 4rem;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  color: var(--foreground);
  letter-spacing: -0.04em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const StatsStrip = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 3rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: space-between;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StatValue = styled.span`
  font-size: 2rem;
  font-weight: 900;
  color: var(--primary);
`;

const StatLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.15em;
`;

export default function RoadmapPage() {
  const { progress } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Real logic to check progress
  const completedLessons: Record<string, boolean> = {};
  ROADMAP_DATA.forEach((chapter) => {
    chapter.lessons.forEach((lesson) => {
      // Mark as completed if the user has enough EXP or matching history
      if (lesson.id === "hiragana")
        completedLessons[lesson.id] = Object.keys(progress.mastery).length > 5;
      else if (lesson.id === "katakana")
        completedLessons[lesson.id] = Object.keys(progress.mastery).length > 46;
      else if (lesson.id === "basic-particles")
        completedLessons[lesson.id] = progress.exp > 500;
      else
        completedLessons[lesson.id] =
          progress.completedExercises?.includes(lesson.id) || false;
    });
  });

  if (!mounted) return null;

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Roadmap" />

      <Header>
        <Title>Learning Path</Title>
        <Subtitle>
          A comprehensive roadmap to guide you from fundamentals to native-level
          fluency. Follow the lanes to master writing, vocabulary, and survival
          skills.
        </Subtitle>
      </Header>

      <StatsStrip>
        <StatItem>
          <StatValue>{progress.exp}</StatValue>
          <StatLabel>Total XP</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{progress.streak}</StatValue>
          <StatLabel>Day Streak</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{Object.keys(progress.mastery).length}</StatValue>
          <StatLabel>Items Mastered</StatLabel>
        </StatItem>
      </StatsStrip>

      <RoadmapBoard userProgress={completedLessons} />
    </Container>
  );
}
