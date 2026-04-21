'use client';

import React from 'react';
import styled from 'styled-components';
import { CategoryCard } from './CategoryCard';
import { GridNode } from './GridNode';
import { ROADMAP_DATA } from '@/data/roadmap';

const BoardContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0 4rem;
`;

const SkillPath = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding: 2rem 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 4px;
    background: var(--border);
    transform: translateX(-50%);
    z-index: 0;
  }
`;

const ChapterSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 1;
`;

const ChapterTitle = styled.h3`
  background: var(--surface);
  padding: 0.5rem 1.5rem;
  border: 2px solid var(--primary);
  border-radius: 99px;
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--primary);
  box-shadow: var(--shadow-sm);
`;

const NodesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
`;

const NodeRow = styled.div<{ $offset: number }>`
  display: flex;
  justify-content: center;
  width: 100%;
  transform: translateX(${props => props.$offset}px);
  
  @media (max-width: 600px) {
    transform: none;
  }
`;

interface RoadmapBoardProps {
  userProgress: Record<string, boolean>;
}

export function RoadmapBoard({ userProgress }: RoadmapBoardProps) {
  const getRowColor = (type: string) => {
    switch(type) {
      case 'writing': return 'var(--rm-purple)';
      case 'vocabulary': return 'var(--rm-pink)';
      case 'grammar': return 'var(--rm-orange)';
      case 'kanji': return '#10b981';
      default: return 'var(--primary)';
    }
  };

  return (
    <BoardContainer>
      <SkillPath>
        {ROADMAP_DATA.map((chapter, chapterIdx) => (
          <ChapterSection key={chapter.id}>
            <ChapterTitle>{chapter.title}</ChapterTitle>
            <NodesContainer>
              {chapter.lessons.map((lesson, lessonIdx) => {
                // Zig-zag offset
                const offset = (lessonIdx % 2 === 0 ? -40 : 40);
                const isCompleted = userProgress[lesson.id];
                
                // Logic for availability: Previous lesson must be completed
                let isAvailable = false;
                if (chapterIdx === 0 && lessonIdx === 0) {
                  isAvailable = true;
                } else {
                  const prevLesson = lessonIdx > 0 
                    ? chapter.lessons[lessonIdx - 1] 
                    : ROADMAP_DATA[chapterIdx - 1]?.lessons.slice(-1)[0];
                  if (prevLesson && userProgress[prevLesson.id]) isAvailable = true;
                }

                const status = isCompleted ? 'completed' : (isAvailable ? 'available' : 'locked');

                return (
                  <NodeRow key={lesson.id} $offset={offset}>
                    <GridNode 
                      title={lesson.title} 
                      link={lesson.link} 
                      status={status} 
                      rowColor={getRowColor(lesson.type)} 
                    />
                  </NodeRow>
                );
              })}
            </NodesContainer>
          </ChapterSection>
        ))}
      </SkillPath>
    </BoardContainer>
  );
}
