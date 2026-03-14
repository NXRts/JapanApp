'use client';

import React from 'react';
import styled from 'styled-components';

interface HeatmapProps {
  activityLog: Record<string, number>;
}

const Container = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2rem;
  overflow-x: auto;
  width: 100%;
  
  /* Custom scrollbar for mobile */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--text-secondary);

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const HeatmapWrapper = styled.div`
  display: flex;
  gap: 1rem;
  min-width: 800px;
`;

const DayLabels = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 12px);
  gap: 3px;
  padding-top: 25px; /* Spacing for month labels */
`;

const Label = styled.span`
  font-size: 0.7rem;
  color: var(--text-secondary);
  line-height: 12px;
`;

const GridColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const MonthLabels = styled.div`
  display: flex;
  margin-bottom: 8px;
  height: 17px;
`;

const MonthLabel = styled.span<{ $offset: number }>`
  position: absolute;
  font-size: 0.7rem;
  color: var(--text-secondary);
  left: ${({ $offset }) => $offset * 15}px;
`;

const GridWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 12px);
  grid-auto-columns: 12px;
  gap: 3px;
`;

const Day = styled.div<{ $intensity: number }>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: ${({ $intensity }) => {
    if ($intensity === 0) return 'rgba(255, 255, 255, 0.05)';
    if ($intensity < 50) return 'rgba(79, 70, 229, 0.2)';
    if ($intensity < 200) return 'rgba(79, 70, 229, 0.4)';
    if ($intensity < 500) return 'rgba(79, 70, 229, 0.7)';
    return 'var(--primary)';
  }};
  transition: all 0.2s;

  &:hover {
    transform: scale(1.3);
    z-index: 10;
    box-shadow: 0 0 10px var(--primary);
  }
`;

export const Heatmap: React.FC<HeatmapProps> = ({ activityLog }) => {
  // Generate last 371 days (53 weeks)
  const numDays = 371;
  const days = Array.from({ length: numDays }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (numDays - 1 - i));
    return d;
  });

  const monthLabels: { name: string, offset: number }[] = [];
  let lastMonth = -1;

  days.forEach((date, i) => {
    if (i % 7 === 0) { // Check every Sunday
      const month = date.getMonth();
      if (month !== lastMonth) {
        monthLabels.push({
          name: date.toLocaleDateString('en-US', { month: 'short' }),
          offset: Math.floor(i / 7)
        });
        lastMonth = month;
      }
    }
  });

  return (
    <Container>
      <Title>Activity Heatmap</Title>
      
      <HeatmapWrapper>
        <DayLabels>
          <Label></Label>
          <Label>Mon</Label>
          <Label></Label>
          <Label>Wed</Label>
          <Label></Label>
          <Label>Fri</Label>
          <Label></Label>
        </DayLabels>

        <GridWrapper>
          <MonthLabels>
            {monthLabels.map((m, i) => (
              <MonthLabel key={i} $offset={m.offset}>{m.name}</MonthLabel>
            ))}
          </MonthLabels>
          <Grid>
            {days.map(d => {
              const dateStr = d.toISOString().split('T')[0];
              return (
                <Day 
                  key={dateStr} 
                  $intensity={activityLog[dateStr] || 0}
                  title={`${dateStr}: ${activityLog[dateStr] || 0} EXP`}
                />
              );
            })}
          </Grid>
        </GridWrapper>
      </HeatmapWrapper>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        <span>Less</span>
        <Day $intensity={0} />
        <Day $intensity={25} />
        <Day $intensity={100} />
        <Day $intensity={300} />
        <Day $intensity={600} />
        <span>More</span>
      </div>
    </Container>
  );
};
