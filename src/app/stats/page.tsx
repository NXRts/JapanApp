'use client';

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useProgress } from '@/context/ProgressContext';
import { Heatmap, generateMockActivityLog } from '@/components/gamification/Heatmap';

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem; /* Increased horizontal padding */
    gap: 2rem;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  &::before {
    content: '';
    width: 4px;
    height: 1.5rem;
    background: var(--primary);
    border-radius: 2px;
  }
`;

const Header = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2.75rem;
  font-weight: 850;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const MainStatCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: 180px;
    border-radius: 24px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--primary-light);
  }
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const StatValue = styled.div`
  font-size: 3rem;
  font-weight: 850;
  color: var(--foreground);
  display: flex;
  align-items: baseline;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }

  span {
    font-size: 1rem;
    color: var(--text-secondary);
    font-weight: 500;
  }
`;

const ProgressInfo = styled.div`
  margin-top: 1rem;
`;

const LevelProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: var(--border);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressBarFill = styled.div<{ $width: number }>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
  border-radius: 5px;
  transition: width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const ChartCard = styled(MainStatCard)`
  grid-column: span 2;
  min-height: 300px;

  @media (max-width: 1024px) {
    grid-column: span 2;
  }

  @media (max-width: 640px) {
    grid-column: span 1;
  }
`;

const BarChartContainer = styled.div`
  height: 220px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.25rem;
  margin-top: 2rem;
  padding-bottom: 0.5rem;

  @media (max-width: 768px) {
    height: 180px;
    gap: 0.5rem;
  }
`;

const BarWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const BarArea = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  min-height: 0;
`;

const Bar = styled.div<{ $height: number }>`
  width: 100%;
  max-width: 32px;
  height: ${({ $height }) => Math.max($height, 2)}%;
  background: ${({ $height }) => $height > 0 ? 'var(--primary)' : 'rgba(var(--primary-rgb), 0.1)'};
  border-radius: 6px 6px 2px 2px;
  transition: height 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to top, rgba(255,255,255,0.1), transparent);
    border-radius: inherit;
  }

  &:hover {
    filter: brightness(1.2);
    transform: scaleX(1.05);
  }
`;

const DayLabel = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 600;
`;

const SRSDistribution = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SRSLegend = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 0.75rem;
  font-size: 0.8rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LegendItem = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-weight: 500;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: ${({ $color }) => $color};
  }
`;

const MultiProgressBar = styled.div`
  width: 100%;
  height: 24px;
  background: var(--border);
  border-radius: 12px;
  display: flex;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
`;

const ProgressSegment = styled.div<{ $width: number, $color: string }>`
  width: ${({ $width }) => $width}%;
  height: 100%;
  background: ${({ $color }) => $color};
  transition: width 1s ease-in-out;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ActivityItem = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  &:hover {
    border-color: var(--primary-light);
    transform: translateX(4px);
  }
`;

const ActivityInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActivityType = styled.span`
  font-weight: 700;
  color: var(--foreground);
`;

const ActivityDate = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

const ActivityScore = styled.div<{ $perfect: boolean }>`
  font-weight: 800;
  font-size: 1.1rem;
  color: ${({ $perfect }) => $perfect ? 'var(--secondary)' : 'var(--primary)'};
  background: ${({ $perfect }) => $perfect ? 'rgba(var(--secondary-rgb), 0.1)' : 'rgba(var(--primary-rgb), 0.1)'};
  padding: 0.4rem 1rem;
  border-radius: 10px;
`;

import { Breadcrumbs } from '@/components/common/Breadcrumbs';

export default function StatsPage() {
  const { progress } = useProgress();

  // 1. Leveling Logic
  const level = Math.floor(Math.sqrt(progress.exp / 100)) + 1;
  const currentLevelExp = Math.pow(level - 1, 2) * 100;
  const nextLevelExp = Math.pow(level, 2) * 100;
  const progressToNext = ((progress.exp - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;

  // 1.5 Final Activity Log (uses mock if empty)
  const finalActivityLog = useMemo(() => {
    return Object.keys(progress.activityLog).length > 0 ? progress.activityLog : generateMockActivityLog();
  }, [progress.activityLog]);

  // 2. Weekly Activity Data
  const weeklyData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      days.push({
        label: dayName,
        value: finalActivityLog[dateStr] || 0
      });
    }
    const maxExp = Math.max(...days.map(d => d.value), 100);
    return days.map(d => ({ ...d, percent: (d.value / maxExp) * 100 }));
  }, [finalActivityLog]);

  // 2.5 Calculate Display Streak (uses mock if empty)
  const displayStreak = useMemo(() => {
    if (Object.keys(progress.activityLog).length > 0) return progress.streak;
    
    // Calculate mock streak
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      if ((finalActivityLog[dateStr] || 0) > 0) {
        currentStreak++;
      } else {
        if (i === 0) continue; // It's okay if today is empty, we check yesterday
        break;
      }
    }
    return currentStreak;
  }, [progress.activityLog, progress.streak, finalActivityLog]);

  // 3. SRS Distribution
  const srsStats = useMemo(() => {
    const counts = { learning: 0, guru: 0, master: 0, enlightened: 0, burned: 0 };
    Object.values(progress.srs).forEach(item => {
      const reps = item.repetitions;
      if (reps < 4) counts.learning++;
      else if (reps < 8) counts.guru++;
      else if (reps < 12) counts.master++;
      else if (reps < 16) counts.enlightened++;
      else counts.burned++;
    });
    
    const total = Object.values(progress.srs).length || 1;
    return {
      learning: (counts.learning / total) * 100,
      guru: (counts.guru / total) * 100,
      master: (counts.master / total) * 100,
      enlightened: (counts.enlightened / total) * 100,
      burned: (counts.burned / total) * 100,
      counts
    };
  }, [progress.srs]);

  // 4. Accuracy Logic
  const overallAccuracy = useMemo(() => {
    let correct = 0;
    let total = 0;
    Object.values(progress.mastery).forEach(m => {
      correct += m.correct;
      total += (m.correct + m.incorrect);
    });
    return total === 0 ? 0 : Math.round((correct / total) * 100);
  }, [progress.mastery]);

  return (
    <Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }]} current="Mastery Dashboard" />
      <Header>
        <StatLabel>Overview</StatLabel>
        <Title>Mastery Dashboard</Title>
        <Subtitle>Your Japanese journey at a glance.</Subtitle>
      </Header>

      <StatsGrid>
        <MainStatCard>
          <StatLabel>Current Level</StatLabel>
          <StatValue>{level}</StatValue>
          <ProgressInfo>
            <LevelProgressBar>
              <ProgressBarFill $width={progressToNext} />
            </LevelProgressBar>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>{progress.exp} total EXP</span>
              <span>{nextLevelExp - progress.exp} to Level {level + 1}</span>
            </div>
          </ProgressInfo>
        </MainStatCard>

        <MainStatCard>
          <StatLabel>Daily Streak</StatLabel>
          <StatValue>{displayStreak} <span>days</span></StatValue>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem' }}>
            {displayStreak > 0 ? "You're on fire! Keep it up." : "Start your streak today!"}
          </div>
        </MainStatCard>

        <MainStatCard>
          <StatLabel>Overall Accuracy</StatLabel>
          <StatValue>{overallAccuracy}<span>%</span></StatValue>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem' }}>
            Based on {Object.values(progress.mastery).length} total characters.
          </div>
        </MainStatCard>

        <ChartCard>
          <StatLabel>Weekly Performance (EXP)</StatLabel>
          <BarChartContainer>
            {weeklyData.map((day, i) => (
              <BarWrapper key={i}>
                <div style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 800, 
                  color: day.value > 0 ? 'var(--primary)' : 'var(--text-secondary)',
                  opacity: day.value > 0 ? 1 : 0.3,
                  marginBottom: '2px'
                }}>
                  {day.value}
                </div>
                <BarArea>
                  <Bar $height={day.percent} title={`${day.label}: ${day.value} EXP`} />
                </BarArea>
                <DayLabel>{day.label}</DayLabel>
              </BarWrapper>
            ))}
          </BarChartContainer>
        </ChartCard>

        <MainStatCard style={{ gridColumn: 'span 1' }}>
          <StatLabel>SRS Distribution</StatLabel>
          <SRSDistribution>
            <MultiProgressBar>
              <ProgressSegment $width={srsStats.learning} $color="#94a3b8" />
              <ProgressSegment $width={srsStats.guru} $color="#10b981" />
              <ProgressSegment $width={srsStats.master} $color="#3b82f6" />
              <ProgressSegment $width={srsStats.enlightened} $color="#8b5cf6" />
              <ProgressSegment $width={srsStats.burned} $color="#f43f5e" />
            </MultiProgressBar>
            <SRSLegend>
              <LegendItem $color="#94a3b8">Learning: {srsStats.counts.learning}</LegendItem>
              <LegendItem $color="#10b981">Guru: {srsStats.counts.guru}</LegendItem>
              <LegendItem $color="#3b82f6">Master: {srsStats.counts.master}</LegendItem>
              <LegendItem $color="#8b5cf6">Enlightened: {srsStats.counts.enlightened}</LegendItem>
              <LegendItem $color="#f43f5e">Burned: {srsStats.counts.burned}</LegendItem>
            </SRSLegend>
          </SRSDistribution>
        </MainStatCard>
      </StatsGrid>

      <Section>
        <SectionTitle>Consistency</SectionTitle>
        <Heatmap activityLog={progress.activityLog} />
      </Section>

      <Section>
        <SectionTitle>Items to Focus On</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {Object.entries(progress.mastery)
            .sort(([, a], [, b]) => b.incorrect - a.incorrect)
            .filter(([, m]) => m.incorrect > 0)
            .slice(0, 5)
            .map(([char, m]) => (
              <ActivityItem key={char} style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{char}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {m.incorrect} errors
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ef4444' }}>
                  {Math.round((m.correct / (m.correct + m.incorrect)) * 100)}% Acc
                </div>
              </ActivityItem>
            ))}
          {Object.values(progress.mastery).every(m => m.incorrect === 0) && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', background: 'var(--surface)', borderRadius: '20px', border: '1px dashed var(--border)', gridColumn: '1 / -1' }}>
              No weak points detected yet. Keep it up!
            </div>
          )}
        </div>
      </Section>

      <Section>
        <SectionTitle>Recent Activity</SectionTitle>
        <ActivityList>
          {progress.quizHistory.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)', background: 'var(--surface)', borderRadius: '20px', border: '1px dashed var(--border)' }}>
              No recent activity found. Start a quiz to see your progress!
            </div>
          ) : (
            progress.quizHistory.slice(0, 5).map((item, i) => {
              const date = new Date(item.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });
              const percent = Math.round((item.score / item.total) * 100);
              return (
                <ActivityItem key={i}>
                  <ActivityInfo>
                    <ActivityType>{item.type.charAt(0).toUpperCase() + item.type.slice(1)} Quiz</ActivityType>
                    <ActivityDate>{date}</ActivityDate>
                  </ActivityInfo>
                  <ActivityScore $perfect={percent === 100}>
                    {item.score}/{item.total} ({percent}%)
                  </ActivityScore>
                </ActivityItem>
              );
            })
          )}
        </ActivityList>
      </Section>
    </Container>
  );
}
