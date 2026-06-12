"use client";

import React from "react";
import styled from "styled-components";
import { ROADMAP_DATA } from "@/data/lessonsData";
import { RoadmapNode } from "./RoadmapNode";

const PathContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding: 4rem 1rem;
  position: relative;
  max-width: 800px;
  margin: 0 auto;
`;

const ChapterSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
`;

const ChapterTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--foreground);
  text-align: center;
  margin-bottom: 2rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: var(--primary);
    border-radius: 2px;
  }
`;

const LessonRow = styled.div<{ $offset: number }>`
  display: flex;
  justify-content: center;
  transform: translateX(${({ $offset }) => $offset * 60}px);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -4rem;
    left: 50%;
    width: 4px;
    height: 4rem;
    background: var(--border);
    z-index: 1;
    transform: translateX(-50%);
  }

  &:first-child::before {
    display: none;
  }
`;

const ConnectorLine = styled.div`
  position: absolute;
  top: -4rem;
  left: 50%;
  width: 4px;
  height: 4rem;
  background: var(--border);
  z-index: 1;
  transform: translateX(-50%);
`;

interface RoadmapPathProps {
  userProgress: Record<string, boolean>; // id -> completed
}

export function RoadmapPath({ userProgress }: RoadmapPathProps) {
  let globalIndex = 0;

  return (
    <PathContainer>
      {ROADMAP_DATA.map((chapter) => (
        <ChapterSection key={chapter.id}>
          <ChapterTitle>{chapter.title}</ChapterTitle>
          {chapter.lessons.map((lesson, index) => {
            globalIndex++;
            // A simple zigzag logic based on order
            const offset = index % 2 === 0 ? -1 : 1;

            // Simple logic for status:
            // 1. If globalIndex === 1 or previous is completed -> available/completed
            // For now, let's just use userProgress or assume first is always available
            const isCompleted = userProgress[lesson.id] || false;
            const isAvailable =
              (index === 0 && chapter.id === "chapter-1") ||
              isCompleted ||
              true; // TRUE FOR DEMO
            const status = isCompleted
              ? "completed"
              : isAvailable
                ? "available"
                : "locked";

            return (
              <LessonRow key={lesson.id} $offset={offset}>
                <RoadmapNode lesson={lesson} status={status} />
              </LessonRow>
            );
          })}
        </ChapterSection>
      ))}
    </PathContainer>
  );
}
