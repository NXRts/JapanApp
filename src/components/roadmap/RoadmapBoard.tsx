"use client";

import React from "react";
import styled from "styled-components";
import { Lesson } from "@/data/lessonsData";
import {
  RoadmapInteractiveNode,
  NodeStatus,
} from "./RoadmapInteractiveNode";

interface UnitGroup {
  unitId: string;
  unitTitle: string;
  unitDescription?: string;
  unitColor?: string;
  lessons: Lesson[];
}

interface RoadmapBoardProps {
  lessons: Lesson[];
  completedExercises: string[];
  onSelectLesson: (lesson: Lesson) => void;
}

const BoardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  padding: 1rem 0 5rem;
`;

const UnitCard = styled.div<{ $color: string }>`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: ${({ $color }) => $color};
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    border-radius: 20px;
  }
`;

const UnitHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
`;

const UnitInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const UnitTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--foreground);
  letter-spacing: -0.02em;

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const UnitDesc = styled.p`
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.5;
`;

const UnitProgressBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(var(--foreground-rgb), 0.04);
  padding: 0.6rem 1.2rem;
  border-radius: 16px;
  border: 1px solid var(--border);

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ProgressText = styled.span`
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--foreground);
`;

const ProgressBarOuter = styled.div`
  width: 100px;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 99px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $color }) => $color};
  border-radius: 99px;
  transition: width 0.4s ease;
`;

const NodesFlexGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 2.5rem 1.5rem;
  padding: 1rem 0.5rem;

  @media (max-width: 600px) {
    gap: 2rem 1rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  color: var(--text-secondary);

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  .title {
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--foreground);
    margin-bottom: 0.5rem;
  }
`;

export function RoadmapBoard({
  lessons,
  completedExercises,
  onSelectLesson,
}: RoadmapBoardProps) {
  if (!lessons || lessons.length === 0) {
    return (
      <EmptyState>
        <div className="icon">🔍</div>
        <div className="title">Tidak Ada Pelajaran Ditemukan</div>
        <p>Coba pilih filter skill atau tingkatan lain di atas.</p>
      </EmptyState>
    );
  }

  // Group lessons by unitId
  const unitGroups: UnitGroup[] = [];
  const unitMap = new Map<string, UnitGroup>();

  lessons.forEach((lesson) => {
    const uId = lesson.unitId || "unit-1";
    const uTitle = lesson.unitTitle || "Unit Pelajaran";
    const uDesc = lesson.unitDescription || lesson.description || "";
    const uColor = lesson.unitColor || "var(--primary)";

    if (!unitMap.has(uId)) {
      const group: UnitGroup = {
        unitId: uId,
        unitTitle: uTitle,
        unitDescription: uDesc,
        unitColor: uColor,
        lessons: [],
      };
      unitMap.set(uId, group);
      unitGroups.push(group);
    }
    unitMap.get(uId)!.lessons.push(lesson);
  });

  // Track overall sequence of all lessons to calculate locked/active status
  let firstUncompletedFound = false;

  return (
    <BoardContainer>
      {unitGroups.map((group) => {
        const completedCount = group.lessons.filter((l) =>
          completedExercises.includes(l.id),
        ).length;
        const totalInUnit = group.lessons.length;
        const pct = totalInUnit > 0 ? (completedCount / totalInUnit) * 100 : 0;
        const color = group.unitColor || "var(--primary)";

        return (
          <UnitCard key={group.unitId} $color={color}>
            <UnitHeader>
              <UnitInfo>
                <UnitTitle>{group.unitTitle}</UnitTitle>
                {group.unitDescription && (
                  <UnitDesc>{group.unitDescription}</UnitDesc>
                )}
              </UnitInfo>

              <UnitProgressBox>
                <ProgressText>
                  {completedCount} / {totalInUnit} Selesai
                </ProgressText>
                <ProgressBarOuter>
                  <ProgressBarFill $pct={pct} $color={color} />
                </ProgressBarOuter>
              </UnitProgressBox>
            </UnitHeader>

            <NodesFlexGrid>
              {group.lessons.map((lesson, idx) => {
                const isCompleted = completedExercises.includes(lesson.id);

                let status: NodeStatus = "locked";
                let isCurrentActive = false;

                if (isCompleted) {
                  status = "completed";
                } else if (!firstUncompletedFound) {
                  status = "active";
                  isCurrentActive = true;
                  firstUncompletedFound = true;
                } else {
                  status = "locked";
                }

                return (
                  <RoadmapInteractiveNode
                    key={lesson.id}
                    lesson={lesson}
                    status={status}
                    color={color}
                    isCurrentActive={isCurrentActive}
                    onClick={() => {
                      if (status !== "locked") {
                        onSelectLesson(lesson);
                      }
                    }}
                  />
                );
              })}
            </NodesFlexGrid>
          </UnitCard>
        );
      })}
    </BoardContainer>
  );
}
