"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import dynamic from "next/dynamic";
import { useProgress } from "@/context/ProgressContext";
import { useDeviceMode } from "@/context/DeviceModeContext";
import { useTheme } from "@/context/ThemeContext";
import { RoadmapNodeDrawer } from "@/components/home/RoadmapNodeDrawer";
import { lessonsData, Lesson } from "@/data/lessonsData";
import React from "react";

import { ToriiPhaseHeader } from "@/components/mobile/ToriiPhaseHeader";
import { HankoSkillCard } from "@/components/mobile/HankoSkillCard";
import { InkProgressBar } from "@/components/mobile/InkProgressBar";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { RightSidebar } from "@/components/home/RightSidebar";

const HorizontalScrollList = styled.div`
  display: flex;
  gap: 0.85rem;
  overflow-x: auto;
  padding: 0.65rem 0.25rem 1.5rem;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  -webkit-overflow-scrolling: touch;
  width: 100%;

  @media (max-width: 480px) {
    gap: 0.6rem;
    padding: 0.5rem 0.15rem 1.25rem;
  }

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

interface DraggableScrollListProps {
  children: React.ReactNode;
}

function DraggableScrollList({ children }: DraggableScrollListProps) {
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

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (Math.abs(x - startX) > 5) {
      setHasMoved(true);
    }
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
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

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  max-width: 1140px;
  margin: 0 auto;
  padding: 1.5rem 1rem 5rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    gap: 0;
    padding: 0;
  }
`;

const MobileContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 1.25rem 0.85rem 1.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: auto;
  font-family: "Nunito", "Outfit", sans-serif;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 1rem 0.65rem 1.25rem;
  }
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

const LevelTab = styled.button<{
  $active: boolean;
  $activeColor: string;
  $activeBg: string;
}>`
  flex: 1;
  min-width: 80px;
  height: 44px;
  border-radius: 16px;
  border: 2px solid
    ${({ $active, $activeColor }) => ($active ? $activeColor : "var(--border)")};
  border-bottom: 4px solid
    ${({ $active, $activeColor }) =>
      $active ? $activeColor : "rgba(0, 0, 0, 0.12)"};
  background: ${({ $active, $activeBg }) => ($active ? $activeBg : "var(--surface)")};
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
    $active ? "0 4px 12px rgba(0, 0, 0, 0.08)" : "none"};

  ${({ $active, $activeColor }) =>
    $active &&
    css`
      text-shadow: 0 0 8px ${$activeColor}30;
    `}

  @media (max-width: 480px) {
    min-width: 42px;
    height: 38px;
    border-radius: 12px;
    font-size: 0.78rem;
  }

  &:hover {
    ${({ $active, $activeColor }) =>
      !$active &&
      css`
        border-color: ${$activeColor};
        color: ${$activeColor};
      `}
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

const StatBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
  box-shadow: var(--shadow-sm);
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 0.6rem 0.5rem;
    gap: 0.25rem;
  }
`;

const StatBannerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 800;
  font-size: 0.88rem;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 0.76rem;
    gap: 0.2rem;
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

export default function Home() {
  const { progress, triggerAlert } = useProgress();
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const [mounted, setMounted] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SelectedNodeData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<
    "Basic" | "N5" | "N4" | "N3" | "N2" | "N1"
  >("Basic");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (progress.completedExercises && progress.completedExercises.length > 0) {
      const activeLesson = lessonsData.find(
        (lesson) => !progress.completedExercises.includes(lesson.id),
      );
      if (activeLesson) {
        setSelectedLevel(activeLesson.level);
      }
    }
  }, [progress.completedExercises]);

  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      const activeNode = document.getElementById("active-lesson-node");
      if (activeNode) {
        activeNode.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [mounted, selectedLevel, progress.completedExercises]);

  const levels = [
    { code: "Basic" as const, label: "Basic", color: "#f59e0b" },
    { code: "N5" as const, label: "JLPT N5", color: "#10b981" },
    { code: "N4" as const, label: "JLPT N4", color: "#8b5cf6" },
    { code: "N3" as const, label: "JLPT N3", color: "#ea580c" },
    { code: "N2" as const, label: "JLPT N2", color: "#3b82f6" },
    { code: "N1" as const, label: "JLPT N1", color: "#dc2626" },
  ];

  const getActiveBgColor = (levelCode: string) => {
    if (isDark) {
      return "#16223f";
    }
    switch (levelCode) {
      case "Basic":
        return "#FFFBEB";
      case "N5":
        return "#ECFDF5";
      case "N4":
        return "#F5F3FF";
      case "N3":
        return "#FFF7ED";
      case "N2":
        return "#EFF6FF";
      case "N1":
        return "#FEF2F2";
      default:
        return "#EEF2FF";
    }
  };

  const lessonRelations = useMemo(() => {
    const map = new Map<string, string>();
    for (let i = 1; i < lessonsData.length; i++) {
      map.set(lessonsData[i].id, lessonsData[i - 1].id);
    }
    return map;
  }, []);

  const levelLessons = useMemo(() => {
    return lessonsData.filter((lesson) => lesson.level === selectedLevel);
  }, [selectedLevel]);

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
      const lesson = lessonsData.find((l) => l.id === lessonId);
      if (!lesson) return false;

      if (lesson.level === "Basic") {
        const basicLessons = lessonsData.filter((l) => l.level === "Basic");
        if (lesson.id === basicLessons[0]?.id) return true;
        const prevId = lessonRelations.get(lessonId);
        if (!prevId) return true;
        return progress.completedExercises?.includes(prevId) || false;
      }

      const levelOrder: ("Basic" | "N5" | "N4" | "N3" | "N2" | "N1")[] = [
        "Basic",
        "N5",
        "N4",
        "N3",
        "N2",
        "N1",
      ];
      const currentLevelIdx = levelOrder.indexOf(lesson.level);
      const prevLevelCode = levelOrder[currentLevelIdx - 1];

      if (prevLevelCode) {
        const prevLevelLessons = lessonsData.filter(
          (l) => l.level === prevLevelCode,
        );
        const isPrevLevelCompleted = prevLevelLessons.every((l) =>
          progress.completedExercises?.includes(l.id),
        );
        if (!isPrevLevelCompleted) {
          return false;
        }
      }

      const currentLevelLessons = lessonsData.filter(
        (l) => l.level === lesson.level,
      );
      if (lesson.id === currentLevelLessons[0]?.id) return true;

      const prevId = lessonRelations.get(lessonId);
      if (!prevId) return true;
      return progress.completedExercises?.includes(prevId) || false;
    },
    [lessonRelations, progress.completedExercises],
  );

  const today = new Date().toISOString().split("T")[0];
  const isDailyCompleted = progress.quizHistory.some(
    (q) => q.date.split("T")[0] === today && q.type === "daily-challenge",
  );

  const handleNodeClick = (lesson: Lesson, unlocked: boolean) => {
    if (!unlocked) {
      const levelOrder: ("Basic" | "N5" | "N4" | "N3" | "N2" | "N1")[] = [
        "Basic",
        "N5",
        "N4",
        "N3",
        "N2",
        "N1",
      ];
      const currentLevelIdx = levelOrder.indexOf(lesson.level);
      const prevLevelCode = levelOrder[currentLevelIdx - 1];

      if (prevLevelCode) {
        const prevLevelLessons = lessonsData.filter(
          (l) => l.level === prevLevelCode,
        );
        const isPrevLevelCompleted = prevLevelLessons.every((l) =>
          progress.completedExercises?.includes(l.id),
        );
        if (!isPrevLevelCompleted) {
          triggerAlert(
            "level",
            `Pelajaran Level ${lesson.level} Terkunci 🔒`,
            `Selesaikan semua pelajaran di level ${prevLevelCode} terlebih dahulu untuk membuka pelajaran ini!`,
          );
          return;
        }
      }

      triggerAlert(
        "level",
        "Pelajaran Terkunci 🔒",
        "Selesaikan pelajaran sebelumnya terlebih dahulu untuk membuka pelajaran ini!",
      );
      return;
    }
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

  const getSectionTitle = (unitId: string, unitTitle: string) => {
    const cleanTitle = unitTitle
      .replace(/Unit \d+:\s*/i, "")
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
      .trim();
    const match = unitId.match(/u(\d+)/i);
    const unitNum = match ? parseInt(match[1], 10) : 1;

    let sectionNum = 1;
    let sectionName = "Basic Interaction & Survival";

    if (selectedLevel === "N5") {
      if (unitNum > 8) {
        sectionNum = 3;
        sectionName = "Intermediate Communication & Culture";
      } else if (unitNum > 4) {
        sectionNum = 2;
        sectionName = "Daily Life in Japan";
      } else {
        sectionNum = 1;
        sectionName = "Basic Interaction & Survival";
      }
    } else {
      sectionNum = 4;
      sectionName = "Professional & Academic Life";
    }

    return {
      section: `SECTION ${sectionNum}: ${sectionName.toUpperCase()}`,
      unitLabel: `UNIT ${unitNum}`,
      title: cleanTitle,
    };
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Japan Learning App",
    url: "https://japan-app.vercel.app",
    description:
      "The most effective way to learn, practice, and memorize Japanese characters (Hiragana, Katakana, and Kanji).",
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    author: {
      "@type": "Person",
      name: "NXRts",
    },
  };

  if (!mounted) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainLayout>
        <MobileContainer>
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

          <LevelSelector>
            {levels.map((level) => (
              <LevelTab
                key={level.code}
                $active={selectedLevel === level.code}
                $activeColor={level.color}
                $activeBg={getActiveBgColor(level.code)}
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

          {levelLessons.length === 0 && (
            <LockBanner>
              📭 No material available for this level yet.
            </LockBanner>
          )}

          {activeUnits.map((unit) => {
            const sectHeader = getSectionTitle(unit.id, unit.title);
            const numLessons = unit.lessons.length;
            const completedInUnit = unit.lessons.filter(
              (l) => progress.completedExercises?.includes(l.id),
            ).length;

            return (
              <div key={unit.id} style={{ marginBottom: "2.25rem" }}>
                <ToriiPhaseHeader
                  unitLabel={sectHeader.unitLabel}
                  title={sectHeader.title}
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
                        id={isActive ? "active-lesson-node" : undefined}
                        title={lesson.title}
                        badge={lesson.badge}
                        icon={lesson.icon}
                        expReward={lesson.expReward}
                        state={cardState}
                        score={progress.exerciseScores?.[lesson.id]}
                        color={unit.color}
                        onClick={() => handleNodeClick(lesson, isUnlocked)}
                      />
                    );
                  })}
                </DraggableScrollList>
              </div>
            );
          })}

          <RoadmapNodeDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            nodeData={selectedNode}
          />
        </MobileContainer>
        <RightSidebar />
      </MainLayout>
    </>
  );
}
