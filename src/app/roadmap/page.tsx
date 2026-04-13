'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RoadmapPath } from '@/components/roadmap/RoadmapPath';
import { useProgress } from '@/context/ProgressContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const StatsStrip = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
  padding: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary);
`;

const StatLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export default function RoadmapPage() {
  const { progress } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simple logic to mock "completed" lessons based on quiz history or character mastery
  // In a real app, we would have a 'completedLessonIds' array in progress
  const completedLessons: Record<string, boolean> = {
    'hiragana-intro': Object.keys(progress.mastery).length > 5,
    'hiragana-practice': progress.quizHistory.length > 0,
    'katakana-intro': Object.keys(progress.mastery).length > 20,
  };

  if (!mounted) return null;

  return (
    <Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }]} current="Learning Path" />
      
      <Header>
        <Title>Your Learning Path</Title>
        <Subtitle>
          Follow this structured journey to master Japanese, from your very first character to fluid conversations.
        </Subtitle>
      </Header>

      <StatsStrip>
        <StatItem>
          <StatValue>{progress.exp}</StatValue>
          <StatLabel>Total XP</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{progress.streak} Days</StatValue>
          <StatLabel>Current Streak</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{Object.keys(progress.mastery).length}</StatValue>
          <StatLabel>Mastered Items</StatLabel>
        </StatItem>
      </StatsStrip>

      <RoadmapPath userProgress={completedLessons} />
    </Container>
  );
}
