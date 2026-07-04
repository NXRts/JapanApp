"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import React from "react";
import styled, { css } from "styled-components";
import { useProgress } from "@/context/ProgressContext";
import { RoadmapNodeDrawer } from "@/components/home/RoadmapNodeDrawer";
import { lessonsData, Lesson } from "@/data/lessonsData";
import { ToriiPhaseHeader } from "@/components/mobile/ToriiPhaseHeader";
import { HankoSkillCard } from "@/components/mobile/HankoSkillCard";
import { InkProgressBar } from "@/components/mobile/InkProgressBar";

/* ─── Horizontal Draggable Scroll ─────────────────────────────────────────── */
const HorizontalScrollList = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.75rem 0.25rem 1.75rem;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  -webkit-overflow-scrolling: touch;
  width: 100%;
  @media (pointer: fine) {
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
    &::-webkit-scrollbar {
      display: block;
      height: 6px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: 99px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: var(--primary-light);
    }
  }
`;

function DraggableScrollList({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (Math.abs(x - startX) > 5) setHasMoved(true);
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasMoved) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <HorizontalScrollList
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClickCapture={handleClickCapture}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {children}
    </HorizontalScrollList>
  );
}

/* ─── Styled Components ───────────────────────────────────────────────────── */
const PageWrapper = styled.div`
  min-height: 100vh;
  background: transparent;
`;

const ContentArea = styled.div`
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.25rem 6rem;
  font-family: "Nunito", "Outfit", sans-serif;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 5rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  color: var(--foreground);
  margin-bottom: 0.25rem;
  letter-spacing: -0.03em;
`;

const PageSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const StatBanner = styled.div`
  display: flex;
  justify-content: space-around;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
`;

const StatBannerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
  font-size: 0.9rem;
`;

const LevelSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1.75rem;
  padding: 6px 4px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 480px) {
    gap: 0.35rem;
  }
`;

const LevelTabText = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`;

const LevelTab = styled.button<{ $active: boolean; $activeColor: string }>`
  flex: 1;
  min-width: 80px;
  height: 44px;
  border-radius: 16px;
  border: 2px solid
    ${({ $active, $activeColor }) => ($active ? $activeColor : "var(--border)")};
  border-bottom: 4px solid
    ${({ $active, $activeColor }) =>
      $active ? $activeColor : "rgba(0, 0, 0, 0.15)"};
  background: ${({ $active }) =>
    $active ? "#16223f" : "var(--surface)"};
  color: ${({ $active, $activeColor }) =>
    $active ? $activeColor : "var(--text-secondary)"};
  font-weight: 800;
  font-size: 0.88rem;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  outline: none;
  white-space: nowrap;
  box-shadow: ${({ $active }) =>
    $active ? "0 4px 12px rgba(0, 0, 0, 0.12)" : "none"};

  ${({ $active, $activeColor }) =>
    $active &&
    css`
      background: #16223f; /* Solid dark color to block background grid dots */
      text-shadow: 0 0 8px ${$activeColor}20;
    `}

  @media (max-width: 480px) {
    min-width: 42px;
    height: 38px;
    border-radius: 12px;
    font-size: 0.78rem;
  }

  &:hover {
    ${({ $active }) =>
      !$active &&
      css`
        border-color: var(--text-secondary);
        color: var(--foreground);
      `}
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

const LockBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
`;

interface SelectedNodeData {
  title: string;
  description: string;
  expReward: number;
  href: string;
  icon: string;
  badge?: string;
  color?: string;
}

/* ─── Page Component ──────────────────────────────────────────────────────── */
export default function LearningPage() {
  const { progress } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<
    "Basic" | "N5" | "N4" | "N3" | "N2" | "N1"
  >("Basic");
  const [selectedNode, setSelectedNode] = useState<SelectedNodeData | null>(
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const levels = [
    { code: "Basic" as const, label: "Basic", color: "#f59e0b" },
    { code: "N5" as const, label: "JLPT N5", color: "#10b981" },
    { code: "N4" as const, label: "JLPT N4", color: "#8b5cf6" },
    { code: "N3" as const, label: "JLPT N3", color: "#ea580c" },
    { code: "N2" as const, label: "JLPT N2", color: "#3b82f6" },
    { code: "N1" as const, label: "JLPT N1", color: "#dc2626" },
  ];

  /* O(1) lesson unlock lookup */
  const lessonRelations = useMemo(() => {
    const map = new Map<string, string>();
    for (let i = 1; i < lessonsData.length; i++) {
      map.set(lessonsData[i].id, lessonsData[i - 1].id);
    }
    return map;
  }, []);

  const levelLessons = useMemo(
    () => lessonsData.filter((l) => l.level === selectedLevel),
    [selectedLevel],
  );

  const activeUnits = useMemo(() => {
    const unitsMap: Record<
      string,
      {
        id: string;
        title: string;
        description: string;
        color: string;
        lessons: typeof levelLessons;
      }
    > = {};
    levelLessons.forEach((lesson) => {
      if (!unitsMap[lesson.unitId]) {
        unitsMap[lesson.unitId] = {
          id: lesson.unitId,
          title: lesson.unitTitle,
          description: lesson.unitDescription,
          color: lesson.unitColor,
          lessons: [],
        };
      }
      unitsMap[lesson.unitId].lessons.push(lesson);
    });
    return Object.values(unitsMap);
  }, [levelLessons]);

  const isLessonUnlocked = useCallback(
    (lessonId: string) => {
      if (lessonId === "n5-u1-l1") return true;
      const prevId = lessonRelations.get(lessonId);
      if (!prevId) return true;
      return progress.completedExercises?.includes(prevId);
    },
    [progress.completedExercises, lessonRelations],
  );

  const today = new Date().toISOString().split("T")[0];
  const isDailyCompleted = progress.quizHistory.some(
    (q) => q.date.split("T")[0] === today && q.type === "daily-challenge",
  );

  const handleNodeClick = (lesson: Lesson, unlocked: boolean) => {
    if (!unlocked) return;
    setSelectedNode({
      title: lesson.title,
      description: lesson.description,
      expReward: lesson.expReward,
      href: `/lesson?id=${lesson.id}`,
      icon: lesson.icon,
      badge: lesson.badge,
      color: lesson.unitColor,
    });
    setIsDrawerOpen(true);
  };

  if (!mounted) return null;

  return (
    <PageWrapper>
      <ContentArea>
        {/* Page Header */}
        <PageHeader>
          <PageTitle>Learning Path</PageTitle>
          <PageSubtitle>
            Master Japanese step by step — from N5 basics to N1 fluency.
          </PageSubtitle>
        </PageHeader>

        {/* Stats Banner */}
        <StatBanner>
          <StatBannerItem title="Total Experience Points">
            ⭐ <span style={{ color: "#eab308" }}>{progress.exp} EXP</span>
          </StatBannerItem>
          <StatBannerItem title="Daily Challenge Status">
            🎯{" "}
            <span
              style={{
                color: isDailyCompleted ? "#10b981" : "var(--text-secondary)",
              }}
            >
              {isDailyCompleted ? "Daily Done!" : "Daily Pending"}
            </span>
          </StatBannerItem>
        </StatBanner>

        {/* Level Tabs */}
        <LevelSelector>
          {levels.map((level) => (
            <LevelTab
              key={level.code}
              $active={selectedLevel === level.code}
              $activeColor={level.color}
              onClick={() => setSelectedLevel(level.code)}
            >
              {level.code === "Basic" ? (
                "Basic"
              ) : (
                <>
                  <LevelTabText>JLPT </LevelTabText>
                  {level.code}
                </>
              )}
            </LevelTab>
          ))}
        </LevelSelector>

        {/* No content warning */}
        {levelLessons.length === 0 && (
          <LockBanner>📭 No material available for this level yet.</LockBanner>
        )}

        {/* Units + Lessons */}
        {activeUnits.map((unit) => {
          const unitNum = parseInt(unit.id.match(/u(\d+)/i)?.[1] || "1", 10);
          const numLessons = unit.lessons.length;
          const completedInUnit = unit.lessons.filter((l) =>
            progress.completedExercises?.includes(l.id),
          ).length;
          const cleanTitle = unit.title
            .replace(/Unit \d+:\s*/i, "")
            .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
            .trim();

          return (
            <div key={unit.id} style={{ marginBottom: "2.25rem" }}>
              <ToriiPhaseHeader
                unitLabel={`UNIT ${unitNum}`}
                title={cleanTitle}
                description={unit.description}
                color={unit.color}
              />

              <InkProgressBar
                completed={completedInUnit}
                total={numLessons}
                color={
                  unit.color.includes("gradient")
                    ? unit.color.match(/#(?:[0-9a-fA-F]{3}){1,2}/g)?.[0] ||
                      "#10b981"
                    : unit.color
                }
              />

              <DraggableScrollList>
                {unit.lessons.map((lesson) => {
                  const isUnlocked = isLessonUnlocked(lesson.id);
                  const isCompleted =
                    progress.completedExercises?.includes(lesson.id) || false;
                  const isActive = isUnlocked && !isCompleted;

                  const cardState = isCompleted
                    ? "mastered"
                    : isActive
                      ? "active"
                      : isUnlocked
                        ? "available"
                        : "locked";

                  return (
                    <HankoSkillCard
                      key={lesson.id}
                      title={lesson.title}
                      badge={lesson.badge}
                      icon={lesson.icon}
                      expReward={lesson.expReward}
                      state={cardState}
                      color={unit.color}
                      onClick={() => handleNodeClick(lesson, isUnlocked)}
                    />
                  );
                })}
              </DraggableScrollList>
            </div>
          );
        })}

        {/* Lesson Drawer */}
        <RoadmapNodeDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          nodeData={selectedNode}
        />
      </ContentArea>
    </PageWrapper>
  );
}
