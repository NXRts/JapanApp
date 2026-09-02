"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { ReadingPassage } from "@/data/reading";

const CardWrapper = styled(Link)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.5rem 1.65rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
  transition: all 0.22s ease;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    border-color: #3b82f6;
    box-shadow: 0 12px 28px -10px rgba(59, 130, 246, 0.35);
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const LevelBadge = styled.span<{ $level: string }>`
  background: ${({ $level }) =>
    $level === "N5"
      ? "rgba(16, 185, 129, 0.15)"
      : $level === "N4"
      ? "rgba(59, 130, 246, 0.15)"
      : $level === "N3"
      ? "rgba(245, 158, 11, 0.15)"
      : "rgba(239, 68, 68, 0.15)"};
  color: ${({ $level }) =>
    $level === "N5"
      ? "#10b981"
      : $level === "N4"
      ? "#3b82f6"
      : $level === "N3"
      ? "#f59e0b"
      : "#ef4444"};
  border: 1px solid
    ${({ $level }) =>
      $level === "N5"
        ? "rgba(16, 185, 129, 0.3)"
        : $level === "N4"
        ? "rgba(59, 130, 246, 0.3)"
        : $level === "N3"
        ? "rgba(245, 158, 11, 0.3)"
        : "rgba(239, 68, 68, 0.3)"};
  font-size: 0.75rem;
  font-weight: 900;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
`;

const TimeChip = styled.span`
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const ContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const JapaneseTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 850;
  color: var(--foreground);
  line-height: 1.4;
  margin: 0;
`;

const IndonesianTitle = styled.div`
  font-size: 0.88rem;
  color: var(--text-secondary);
  font-weight: 700;
`;

const TagsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

const TagBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 800;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
`;

const StatusText = styled.span<{ $isDone?: boolean }>`
  font-size: 0.78rem;
  font-weight: 850;
  color: ${({ $isDone }) => ($isDone ? "#22c55e" : "var(--text-secondary)")};
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const ActionArrow = styled.span`
  font-size: 0.85rem;
  font-weight: 900;
  color: #3b82f6;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

interface StoryCardProps {
  passage: ReadingPassage;
  isCompleted?: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({ passage, isCompleted }) => {
  return (
    <CardWrapper href={`/study/reading/${passage.id}`}>
      <TopRow>
        <LevelBadge $level={passage.level}>{passage.level}</LevelBadge>
        <TimeChip>⏱️ {passage.estimatedTime}</TimeChip>
      </TopRow>

      <ContentGroup>
        <JapaneseTitle>{passage.title}</JapaneseTitle>
        {passage.indonesianTitle && (
          <IndonesianTitle>{passage.indonesianTitle}</IndonesianTitle>
        )}
      </ContentGroup>

      <TagsRow>
        {passage.tags.map((t) => (
          <TagBadge key={t}>#{t}</TagBadge>
        ))}
      </TagsRow>

      <BottomRow>
        <StatusText $isDone={isCompleted}>
          {isCompleted ? "Selesai ✅" : "Mulai Baca 📖"}
        </StatusText>
        <ActionArrow>Baca →</ActionArrow>
      </BottomRow>
    </CardWrapper>
  );
};
