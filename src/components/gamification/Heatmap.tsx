'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface HeatmapProps {
  activityLog: Record<string, number>;
}

const Container = styled.div<{ $cellSize: number }>`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  --bg:          #0d1117;
  --surface:     #161b22;
  --surface-2:   #1e2530;
  --border:      rgba(255, 255, 255, 0.07);
  --text:        #e6edf3;
  --text-muted:  #7d8590;
  --text-dim:    #484f58;
  --accent:      #5865f2;

  --h0: #1e2530;
  --h1: #2d3561;
  --h2: #3d4ec4;
  --h3: #5865f2;
  --h4: #818cf8;

  --radius:   14px;
  --cell:     ${props => props.$cellSize}px;
  --gap:      3px;

  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px 28px 24px;
  position: relative;
  overflow: hidden;
  width: 100%;
  color: var(--text);
  font-family: 'DM Sans', sans-serif;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(88, 101, 242, 0.5), transparent);
  }

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
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: 0.1px;
`;

const CardSubtitle = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 3px;
  font-weight: 400;
`;

const StatChips = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Chip = styled.div`
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'DM Mono', monospace;

  span { color: var(--text); font-weight: 500; }
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
`;

const DayLabel = styled.div<{ $hidden?: boolean }>`
  height: var(--cell);
  font-size: 10px;
  color: ${({ $hidden }) => $hidden ? 'transparent' : 'var(--text-muted)'};
  line-height: var(--cell);
  white-space: nowrap;
  font-family: 'DM Mono', monospace;
  letter-spacing: 0.3px;
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
`;

const MonthLabel = styled.div<{ $width: number }>`
  font-size: 10.5px;
  color: var(--text-muted);
  font-family: 'DM Mono', monospace;
  letter-spacing: 0.4px;
  white-space: nowrap;
  overflow: hidden;
  width: ${({ $width }) => $width}px;
`;

const WeekCols = styled.div`
  display: flex;
  gap: var(--gap);
  justify-content: space-between;
`;

const WeekCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap);
`;

const DayCell = styled.div<{ $level: number; $empty?: boolean }>`
  width: var(--cell);
  height: var(--cell);
  border-radius: 3px;
  cursor: ${({ $empty }) => $empty ? 'default' : 'pointer'};
  position: relative;
  transition: transform 0.12s ease, filter 0.12s ease;
  background: ${({ $level, $empty }) => {
    if ($empty) return 'transparent';
    if ($level === 0) return 'var(--h0)';
    if ($level === 1) return 'var(--h1)';
    if ($level === 2) return 'var(--h2)';
    if ($level === 3) return 'var(--h3)';
    return 'var(--h4)';
  }};

  ${({ $empty }) => !$empty && `
    &:hover {
      transform: scale(1.35);
      filter: brightness(1.25);
      z-index: 10;
    }
  `}
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--text-muted);
  font-family: 'DM Mono', monospace;
`;

const LegendCells = styled.div`
  display: flex;
  gap: 3px;
`;

const LegendCell = styled.div<{ $level: number }>`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: ${({ $level }) => {
    if ($level === 0) return 'var(--h0)';
    if ($level === 1) return 'var(--h1)';
    if ($level === 2) return 'var(--h2)';
    if ($level === 3) return 'var(--h3)';
    return 'var(--h4)';
  }};
`;

const HeatmapFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
  flex-wrap: wrap;
  gap: 10px;
`;

const StreakInfo = styled.div`
  display: flex;
  gap: 16px;
`;

const StreakItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StreakValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.5px;
  line-height: 1;

  .unit {
    font-size: 12px;
    font-weight: 400;
    color: var(--text-muted);
    margin-left: 2px;
  }
`;

const StreakLabel = styled.div`
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

const StreakDivider = styled.div`
  width: 1px;
  height: 32px;
  background: var(--border);
  align-self: center;
`;

const Tooltip = styled.div<{ $show: boolean; $x: number; $y: number }>`
  position: fixed;
  background: #1e2530;
  border: 1px solid rgba(88,101,242,0.35);
  border-radius: 8px;
  padding: 7px 11px;
  font-size: 11.5px;
  color: var(--text);
  pointer-events: none;
  white-space: nowrap;
  z-index: 100;
  opacity: ${({ $show }) => $show ? 1 : 0};
  transform: ${({ $show }) => $show ? 'translateY(0)' : 'translateY(4px)'};
  transition: opacity 0.12s, transform 0.12s;
  font-family: 'DM Mono', monospace;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;

  strong { color: var(--accent); }
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
    const dateStr = d.toISOString().split('T')[0];

    const r = rand();
    const bias = prevActive ? 0.55 : 0.35;
    
    if (r > (1 - bias)) {
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(13);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: '' });

  const TOTAL_WEEKS = 53;
  const GAP = 3;
  const DAY_LABEL_W = 36;
  const CARD_PADDING = 56; // 28 * 2
  const MARGIN_RIGHT = 8;

  useEffect(() => {
    const computeCellSize = () => {
      if (!containerRef.current) return;
      const cardW = containerRef.current.clientWidth;
      const available = cardW - CARD_PADDING - DAY_LABEL_W - MARGIN_RIGHT;
      const cell = Math.floor((available - (TOTAL_WEEKS - 1) * GAP) / TOTAL_WEEKS);
      setCellSize(Math.max(8, Math.min(cell, 14)));
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

    // Go back exactly 53 weeks (371 days). Since endDate is Saturday, endDate - 370 days is Sunday.
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 370);

    const resultWeeks = [];
    const allCells = [];
    let activeDays = 0;
    let totalSessions = 0;

    const hasRealActivity = Object.values(activityLog).some(v => v > 0);
    const finalActivityLog = hasRealActivity ? activityLog : generateMockActivityLog();

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
        
        let level = 0;
        const cellInRange = date <= today && date >= oneYearAgo;

        if (cellInRange && exp > 0) {
          activeDays++;
          totalSessions += Math.ceil(exp / 10); // Simulated sessions
          level = exp < 50 ? 1 : exp < 200 ? 2 : exp < 500 ? 3 : 4;
        }

        const cell = { date, dateStr, level, inRange: cellInRange };
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

    const sortedCells = [...allCells].filter(c => c.inRange).sort((a,b) => a.date.getTime() - b.date.getTime());
    
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
            <DayLabel $hidden>·</DayLabel>
            <DayLabel>Mon</DayLabel>
            <DayLabel $hidden>·</DayLabel>
            <DayLabel>Wed</DayLabel>
            <DayLabel $hidden>·</DayLabel>
            <DayLabel>Fri</DayLabel>
            <DayLabel $hidden>·</DayLabel>
          </DayLabels>
          <GridArea>
            <MonthLabels>
              {monthPositions.map((pos, i) => {
                const nextIdx = monthPositions[i + 1]?.weekIdx ?? TOTAL_WEEKS;
                const spanWeeks = nextIdx - pos.weekIdx;
                return (
                  <MonthLabel key={i} $width={spanWeeks * (cellSize + GAP)}>
                    {pos.name}
                  </MonthLabel>
                );
              })}
            </MonthLabels>
            <WeekCols>
              {weeks.map((week, wi) => (
                <WeekCol key={wi}>
                  {week.map((cell, di) => (
                    <DayCell 
                      key={di} 
                      $level={cell.level}
                      $empty={!cell.inRange}
                      onMouseEnter={(e) => handleMouseEnter(e, cell.date, cell.level, !cell.inRange)}
                      onMouseMove={(e) => handleMouseMove(e, !cell.inRange)}
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
            <LegendCell $level={0} />
            <LegendCell $level={1} />
            <LegendCell $level={2} />
            <LegendCell $level={3} />
            <LegendCell $level={4} />
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

