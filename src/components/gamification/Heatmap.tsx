'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext';

interface HeatmapProps {
  activityLog: Record<string, number>;
}

const Container = styled.div<{ $cellSize: number }>`
  --local-surface:     var(--surface, #FFFFFF);
  --local-surface-2:   var(--background, #F8FAFC);
  --local-border:      var(--border, #E2E8F0);
  --local-text:        var(--foreground, #0F172A);
  --local-text-muted:  var(--text-secondary, #64748B);
  --local-accent:      var(--primary, #4F46E5);

  /* h0 (Empty) and active levels are now handled dynamically via props/context */

  --radius:   28px;
  --cell:     ${props => props.$cellSize}px;
  --gap:      4px;

  background: var(--local-surface);
  border: 1px solid var(--local-border);
  border-radius: var(--radius);
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 20px;
  }
  box-shadow: var(--shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05));
  position: relative;
  overflow: visible;
  width: 100%;
  color: var(--local-text);
  font-family: 'Inter', 'Noto Sans JP', sans-serif;

  *, *::before, *::after { box-sizing: border-box; }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
`;

const CardTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--local-text);
  letter-spacing: -0.01em;
`;

const CardSubtitle = styled.div`
  font-size: 0.9rem;
  color: var(--local-text-muted);
  margin-top: 4px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const StatChips = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Chip = styled.div`
  background: var(--local-surface-2);
  border: 1px solid var(--local-border);
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.8rem;
  color: var(--local-text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;

  span { color: var(--local-text); font-weight: 700; }
`;

const HeatmapWrap = styled.div`
  overflow: hidden;
  width: 100%;
`;

const HeatmapInner = styled.div`
  display: flex;
  gap: 0;
  width: 100%;
`;

const DayLabels = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  padding-top: 24px;
  margin-right: 8px;
  width: 36px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    padding-top: 24px;
    width: 36px;
    margin-right: 8px;
  }
`;

const DayLabel = styled.div<{ $hidden?: boolean }>`
  height: var(--cell);
  font-size: 0.75rem;
  color: ${({ $hidden }) => $hidden ? 'transparent' : 'var(--local-text-muted)'};
  line-height: var(--cell);
  white-space: nowrap;
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    width: 36px;
    height: var(--cell);
    line-height: var(--cell);
  }
`;

const GridArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

const MonthLabels = styled.div`
  display: flex;
  margin-bottom: 6px;
  height: 18px;
  align-items: flex-end;

  @media (max-width: 480px) {
    height: 18px;
    margin-bottom: 6px;
  }
`;

const MonthLabel = styled.div<{ $width: number }>`
  font-size: 0.75rem;
  color: var(--local-text-muted);
  font-weight: 600;
  white-space: nowrap;
  width: ${({ $width }) => $width}px;
  min-width: 30px;
`;

const WeekCols = styled.div`
  display: flex;
  gap: var(--gap);
`;

const WeekCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap);
`;

const DayCell = styled.div<{ $level: number; $empty?: boolean; $mode: 'light' | 'dark' }>`
  width: var(--cell);
  height: var(--cell);
  border-radius: 4px;
  cursor: ${({ $empty }) => $empty ? 'default' : 'pointer'};
  position: relative;
  transition: transform 0.12s ease, filter 0.12s ease;
  visibility: ${({ $empty }) => $empty ? 'hidden' : 'visible'};
  background: ${({ $level, $mode }) => {
    if ($level === 0) return $mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#E2E8F0';
    const opacity = $level === 1 ? 0.25 : $level === 2 ? 0.5 : $level === 3 ? 0.75 : 1;
    return `rgba(var(--primary-rgb), ${opacity})`;
  }};

  ${({ $empty }) => !$empty && `
    &:hover {
      transform: scale(1.35);
      filter: brightness(1.1);
      z-index: 10;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }
  `}
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--local-text-muted);
`;

const LegendCells = styled.div`
  display: flex;
  gap: 4px;
`;

const LegendCell = styled.div<{ $level: number; $mode: 'light' | 'dark' }>`
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: ${({ $level, $mode }) => {
    if ($level === 0) return $mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#E2E8F0';
    const opacity = $level === 1 ? 0.25 : $level === 2 ? 0.5 : $level === 3 ? 0.75 : 1;
    return `rgba(var(--primary-rgb), ${opacity})`;
  }};
`;

const HeatmapFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const StreakInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const StreakItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StreakValue = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--local-text);
  letter-spacing: -0.02em;
  line-height: 1;

  .unit {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--local-text-muted);
    margin-left: 4px;
  }
`;

const StreakLabel = styled.div`
  font-size: 0.75rem;
  color: var(--local-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StreakDivider = styled.div`
  width: 1px;
  height: 40px;
  background: var(--local-border);
  align-self: center;
`;

const Tooltip = styled.div<{ $show: boolean; $x: number; $y: number }>`
  position: fixed;
  background: var(--local-surface);
  border: 1px solid var(--local-border);
  border-radius: 12px;
  padding: 8px 14px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--local-text);
  pointer-events: none;
  white-space: nowrap;
  z-index: 100;
  opacity: ${({ $show }) => $show ? 1 : 0};
  transform: ${({ $show }) => $show ? 'translateY(0)' : 'translateY(4px)'};
  transition: opacity 0.12s, transform 0.12s;
  box-shadow: var(--shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1));
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;

  strong { color: var(--local-accent); font-weight: 700; }
`;

function seededRand(seed: number) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateMockActivityLog(): Record<string, number> {
  const log: Record<string, number> = {};
  const rand = seededRand(42);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 365);

  let prevActive = false;
  
  for (let i = 0; i <= 365; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    
    // Fix timezone shift bug by manually creating local YYYY-MM-DD
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${day}`;

    const r = rand();
    const bias = prevActive ? 0.55 : 0.35;
    
    if (i >= 360 || r > (1 - bias)) {
      const r2 = rand();
      let exp = 0;
      if (r2 < 0.30) exp = 30; // Level 1 (< 50)
      else if (r2 < 0.60) exp = 150; // Level 2 (< 200)
      else if (r2 < 0.82) exp = 350; // Level 3 (< 500)
      else exp = 600; // Level 4 (>= 500)
      
      log[dateStr] = exp;
      prevActive = true;
    } else {
      prevActive = false;
    }
  }
  
  return log;
}

export const Heatmap: React.FC<HeatmapProps> = ({ activityLog }) => {
  const { mode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(13);
  const [visibleWeeks, setVisibleWeeks] = useState(53);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: '' });

  const TOTAL_WEEKS = 52;
  const GAP = 4;
  const DAY_LABEL_W = 36;
  const CARD_PADDING = 64; // 2rem * 2 = 64px

  useEffect(() => {
    const computeCellSize = () => {
      if (!containerRef.current) return;
      const cardW = containerRef.current.clientWidth;
      const MARGIN_RIGHT = 0;
      const available = cardW - CARD_PADDING - DAY_LABEL_W - MARGIN_RIGHT;
      const cell = Math.floor((available - (TOTAL_WEEKS - 1) * GAP) / TOTAL_WEEKS);
      
      const clampedCell = Math.max(6, Math.min(cell, 14));
      setCellSize(clampedCell);

      // Dynamically calculate how many weeks fit to truncate left side cleanly
      const maxW = Math.floor((available + GAP) / (clampedCell + GAP));
      setVisibleWeeks(Math.max(10, Math.min(TOTAL_WEEKS, maxW - 1)));
    };

    computeCellSize();
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(computeCellSize, 100);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // 1. Generate grid data
  const { weeks, monthPositions, stats, oneYearAgo, todayObj } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Grid should end on the Saturday of the current week
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + (6 - today.getDay()));

    // Go back exactly 52 weeks (364 days). Since endDate is Saturday, endDate - 363 days is Sunday.
    const startDate = new Date(endDate.getTime() - 363 * 24 * 60 * 60 * 1000);

    const resultWeeks = [];
    const allCells = [];
    let activeDays = 0;
    let totalSessions = 0;

    const finalActivityLog = activityLog;

    for (let w = 0; w < TOTAL_WEEKS; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + w * 7 + d);
        
        // Fix timezone offset issues by formatting manually to local date
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${day}`;
        
        const exp = finalActivityLog[dateStr] || 0;
        
        // We still calculate level based on exp
        let level = 0;
        
        // Stats are only calculated for days up to 'today' and within the last 365 days
        const cellInRange = date <= today && date >= oneYearAgo;

        if (cellInRange && exp > 0) {
          activeDays++;
          totalSessions += Math.ceil(exp / 10); // Simulated sessions
          level = exp < 50 ? 1 : exp < 200 ? 2 : exp < 500 ? 3 : 4;
        }

        // Make ALL cells visually present (inRange: true) so the grid is a perfect rectangle
        // Future days and >365 days will simply have level 0
        const cell = { date, dateStr, level, inRange: true, isFuture: date > today };
        week.push(cell);
        allCells.push(cell);
      }
      resultWeeks.push(week);
    }

    // Month labels logic
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const positions: { name: string; weekIdx: number }[] = [];
    let lastMonth = -1;

    resultWeeks.forEach((week, wi) => {
      const firstInRange = week.find(c => c.inRange);
      if (firstInRange) {
        const m = firstInRange.date.getMonth();
        if (m !== lastMonth) {
          positions.push({ name: months[m], weekIdx: wi });
          lastMonth = m;
        }
      }
    });

    // Streak logic
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const sortedCells = [...allCells]
      .filter(c => c.inRange && !c.isFuture)
      .sort((a,b) => a.date.getTime() - b.date.getTime());
    
    sortedCells.forEach(c => {
      if (c.level > 0) {
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    });

    for (let i = sortedCells.length - 1; i >= 0; i--) {
      if (sortedCells[i].level > 0) currentStreak++;
      else break;
    }

    return { 
      weeks: resultWeeks, 
      monthPositions: positions,
      stats: { activeDays, totalSessions, currentStreak, longestStreak },
      oneYearAgo,
      todayObj: today
    };
  }, [activityLog]);

  const handleMouseEnter = (e: React.MouseEvent, date: Date, level: number, empty?: boolean) => {
    if (empty) return;
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const dateStr = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    const activity = level === 0 ? 'No activity' : `<strong>${level}</strong> session${level>1?'s':''}`;
    
    setTooltip({
      show: true,
      x: e.clientX + 14,
      y: e.clientY - 36,
      content: `${activity} &nbsp;·&nbsp; ${dateStr}`
    });
  };

  const handleMouseMove = (e: React.MouseEvent, empty?: boolean) => {
    if (empty) return;
    setTooltip(prev => ({ ...prev, x: e.clientX + 14, y: e.clientY - 36 }));
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, show: false }));
  };

  return (
    <Container ref={containerRef} $cellSize={cellSize}>
      <CardHeader>
        <div>
          <CardTitle>Activity Heatmap</CardTitle>
          <CardSubtitle>
            {oneYearAgo.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} – {todayObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} &nbsp;·&nbsp; 365 days
          </CardSubtitle>
        </div>
        <StatChips>
          <Chip>Total sessions <span>{stats.totalSessions}</span></Chip>
          <Chip>Active days <span>{stats.activeDays}</span></Chip>
        </StatChips>
      </CardHeader>

      <HeatmapWrap>
        <HeatmapInner>
          <DayLabels>
            <DayLabel $hidden data-hidden="true">·</DayLabel>
            <DayLabel>Mon</DayLabel>
            <DayLabel $hidden data-hidden="true">·</DayLabel>
            <DayLabel>Wed</DayLabel>
            <DayLabel $hidden data-hidden="true">·</DayLabel>
            <DayLabel>Fri</DayLabel>
            <DayLabel $hidden data-hidden="true">·</DayLabel>
          </DayLabels>
          <GridArea>
            <MonthLabels>
              {monthPositions
                .filter(pos => pos.weekIdx >= TOTAL_WEEKS - visibleWeeks)
                .map((pos, i, arr) => {
                  const relativeIdx = pos.weekIdx - (TOTAL_WEEKS - visibleWeeks);
                  const nextRelativeIdx = i < arr.length - 1 ? arr[i + 1].weekIdx - (TOTAL_WEEKS - visibleWeeks) : visibleWeeks;
                  const spanWeeks = nextRelativeIdx - relativeIdx;
                  return (
                    <MonthLabel key={i} $width={spanWeeks * (cellSize + GAP)}>
                      {pos.name}
                    </MonthLabel>
                  );
              })}
            </MonthLabels>
            <WeekCols>
              {weeks.slice(-visibleWeeks).map((week, wi) => (
                <WeekCol key={wi}>
                  {week.map((cell, di) => (
                    <DayCell 
                      key={di} 
                      $level={cell.level}
                      $empty={cell.isFuture}
                      $mode={mode}
                      onMouseEnter={(e) => handleMouseEnter(e, cell.date, cell.level, cell.isFuture)}
                      onMouseMove={(e) => handleMouseMove(e, cell.isFuture)}
                      onMouseLeave={handleMouseLeave}
                    />
                  ))}
                </WeekCol>
              ))}
            </WeekCols>
          </GridArea>
        </HeatmapInner>
      </HeatmapWrap>

      <HeatmapFooter>
        <StreakInfo>
          <StreakItem>
            <StreakValue>{stats.currentStreak}<span className="unit">days</span></StreakValue>
            <StreakLabel>Current Streak</StreakLabel>
          </StreakItem>
          <StreakDivider />
          <StreakItem>
            <StreakValue>{stats.longestStreak}<span className="unit">days</span></StreakValue>
            <StreakLabel>Longest Streak</StreakLabel>
          </StreakItem>
        </StreakInfo>

        <Legend>
          Less
          <LegendCells>
            <LegendCell $level={0} $mode={mode} />
            <LegendCell $level={1} $mode={mode} />
            <LegendCell $level={2} $mode={mode} />
            <LegendCell $level={3} $mode={mode} />
            <LegendCell $level={4} $mode={mode} />
          </LegendCells>
          More
        </Legend>
      </HeatmapFooter>

      <Tooltip 
        $show={tooltip.show} 
        $x={tooltip.x} 
        $y={tooltip.y} 
        dangerouslySetInnerHTML={{ __html: tooltip.content }} 
      />
    </Container>
  );
};

