'use client';

import React from 'react';
import styled from 'styled-components';
import { CategoryCard } from './CategoryCard';
import { GridNode } from './GridNode';
import { ROADMAP_DATA } from '@/data/roadmap';

const BoardContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 2rem 0 4rem;
  scrollbar-width: thin;
  scrollbar-color: var(--primary) transparent;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 10px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 200px repeat(3, 300px);
  grid-auto-rows: min-content;
  gap: 2rem;
  min-width: 1100px;
  position: relative;
  margin: 0 auto;

  /* Draw connecting lines background */
  &::before {
    content: '';
    position: absolute;
    top: 150px;
    left: 200px;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(to right, var(--border) 1px, transparent 1px),
      linear-gradient(to bottom, var(--border) 1px, transparent 1px);
    background-size: 300px 200px;
    opacity: 0.1;
    z-index: 0;
  }

  @media (max-width: 1200px) {
    justify-content: start;
    padding-left: 2rem;
  }
`;

const HeaderCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
`;

const HeaderLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

const HeaderValue = styled.span`
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--foreground);
`;

const LaneContainer = styled.div`
  display: contents; /* Allows children to participate in parent grid */
`;

const NodeCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 200px;
  
  /* Horizontal line */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -2rem;
    width: 2rem;
    height: 2px;
    background: var(--border);
    z-index: 1;
  }
`;

interface RoadmapBoardProps {
  userProgress: Record<string, boolean>;
}

export function RoadmapBoard({ userProgress }: RoadmapBoardProps) {
  // Logic to categorize and place nodes
  // For demo, we manually map categories to rows
  const lanes = [
    { title: 'Writing', color: 'var(--rm-purple)', type: 'writing', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    )},
    { title: 'Words', color: 'var(--rm-pink)', type: 'vocabulary', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    )},
    { title: 'Skills', color: 'var(--rm-orange)', type: 'survival', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )},
  ];

  // Flatten and group lessons by type for display
  const allLessons = ROADMAP_DATA.flatMap(ch => ch.lessons);
  const getLessonsByType = (type: string) => allLessons.filter(l => l.type === type || (type === 'vocabulary' && l.type === 'quiz'));

  return (
    <BoardContainer>
      <Grid>
        {/* Empty top-left cell */}
        <div style={{ padding: '1rem' }}>
          <HeaderLabel>Overview</HeaderLabel>
          <HeaderValue>Path</HeaderValue>
        </div>

        {/* Level Headers */}
        {[1, 2, 3].map(level => (
          <HeaderCell key={level}>
            <HeaderLabel>Level 0{level}</HeaderLabel>
            <HeaderValue>{level === 1 ? 'Fundamentals' : level === 2 ? 'Daily Life' : 'Immersion'}</HeaderValue>
          </HeaderCell>
        ))}

        {/* Categories and Nodes */}
        {lanes.map((lane) => (
          <LaneContainer key={lane.title}>
            <CategoryCard label={lane.title} color={lane.color} icon={lane.icon} />
            
            {/* Render 3 cells per lane for this demo levels */}
            {[0, 1, 2].map((colIndex) => {
              const lessons = getLessonsByType(lane.type);
              const lesson = lessons[colIndex];
              
              if (!lesson) return <NodeCell key={colIndex} />;
              
              const isCompleted = userProgress[lesson.id];
              const isAvailable = colIndex === 0 || userProgress[lessons[colIndex-1]?.id];
              const status = isCompleted ? 'completed' : (isAvailable ? 'available' : 'locked');

              return (
                <NodeCell key={colIndex}>
                  <GridNode 
                    title={lesson.title} 
                    link={lesson.link} 
                    status={status} 
                    rowColor={lane.color} 
                  />
                </NodeCell>
              );
            })}
          </LaneContainer>
        ))}
      </Grid>
    </BoardContainer>
  );
}
