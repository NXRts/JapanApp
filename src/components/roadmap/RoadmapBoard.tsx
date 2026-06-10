"use client";

import React from "react";
import styled from "styled-components";
import { CategoryCard } from "./CategoryCard";
import { GridNode } from "./GridNode";
import { ROADMAP_DATA } from "@/data/roadmap";

const BoardContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0 6rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const TierSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TierHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  &::after {
    content: "";
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, var(--border) 0%, transparent 100%);
  }

  @media (max-width: 600px) {
    gap: 0.75rem;
  }
`;

const TierBadge = styled.div`
  background: var(--primary);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 12px;
  font-weight: 900;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);

  @media (max-width: 600px) {
    padding: 0.4rem 1rem;
    font-size: 1.1rem;
  }
`;

const TierTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 850;
  color: var(--foreground);

  @media (max-width: 600px) {
    font-size: 1.25rem;
  }
`;

const NodesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 3rem 2rem;
  padding-left: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 2rem 0.5rem;
    padding-left: 0;
  }
`;

interface RoadmapBoardProps {
  userProgress: Record<string, boolean>;
}

export function RoadmapBoard({ userProgress }: RoadmapBoardProps) {
  const getRowColor = (type: string) => {
    switch (type) {
      case "writing":
        return "var(--rm-purple)";
      case "vocabulary":
        return "var(--rm-pink)";
      case "grammar":
        return "var(--rm-orange)";
      case "kanji":
        return "#10b981";
      default:
        return "var(--primary)";
    }
  };

  return (
    <BoardContainer>
      {ROADMAP_DATA.map((chapter, chapterIdx) => (
        <TierSection key={chapter.id}>
          <TierHeader>
            <TierBadge>{chapter.level}</TierBadge>
            <TierTitle>
              {chapter.title.split(":")[1] || chapter.title}
            </TierTitle>
          </TierHeader>

          <NodesGrid>
            {chapter.lessons.map((lesson, lessonIdx) => {
              const isCompleted = userProgress[lesson.id];

              // Logic for availability
              let isAvailable = false;
              if (chapterIdx === 0 && lessonIdx === 0) {
                isAvailable = true;
              } else {
                const prevLesson =
                  lessonIdx > 0
                    ? chapter.lessons[lessonIdx - 1]
                    : ROADMAP_DATA[chapterIdx - 1]?.lessons.slice(-1)[0];
                if (prevLesson && userProgress[prevLesson.id])
                  isAvailable = true;
              }

              const status = isCompleted
                ? "completed"
                : isAvailable
                  ? "available"
                  : "locked";

              return (
                <GridNode
                  key={lesson.id}
                  title={lesson.title}
                  link={lesson.link}
                  status={status}
                  rowColor={getRowColor(lesson.type)}
                />
              );
            })}
          </NodesGrid>
        </TierSection>
      ))}
    </BoardContainer>
  );
}
