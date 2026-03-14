'use client';

import React from 'react';
import styled from 'styled-components';
import { useProgress } from '@/context/ProgressContext';
import { Heatmap } from '@/components/gamification/Heatmap';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 90vh;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Header = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary);
`;

const StatLabel = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const LevelProgress = styled.div`
  width: 100%;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  margin-top: 1rem;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ $width: number }>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: var(--primary);
  border-radius: 4px;
  transition: width 1s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

export default function StatsPage() {
  const { progress } = useProgress();

  // Basic Leveling Formula: Level = floor(sqrt(exp/100)) + 1
  const level = Math.floor(Math.sqrt(progress.exp / 100)) + 1;
  const currentLevelExp = Math.pow(level - 1, 2) * 100;
  const nextLevelExp = Math.pow(level, 2) * 100;
  const progressToNext = ((progress.exp - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;

  return (
    <Container>
      <Header>
        <Title>Language Mastery</Title>
        <Subtitle>Track your Japanese learning journey and consistency.</Subtitle>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatLabel>Current Level</StatLabel>
          <StatValue>{level}</StatValue>
          <LevelProgress>
            <ProgressBar $width={progressToNext} />
          </LevelProgress>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            {progress.exp} / {nextLevelExp} EXP to next level
          </div>
        </StatCard>

        <StatCard>
          <StatLabel>Day Streak</StatLabel>
          <StatValue>{progress.streak} 🔥</StatValue>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Keep it up! Don't break the chain.
          </div>
        </StatCard>

        <StatCard>
          <StatLabel>Total Lessons</StatLabel>
          <StatValue>{progress.quizHistory.length}</StatValue>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Quizzes and games completed.
          </div>
        </StatCard>
      </StatsGrid>

      <Heatmap activityLog={progress.activityLog} />
    </Container>
  );
}
