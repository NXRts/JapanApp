"use client";

import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { grammarLessons } from "@/data/grammarLessons";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";

/* ─── Animations ───────────────────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const progressAnim = keyframes`
  from { width: 0%; }
  to   { width: var(--target-w); }
`;

/* ─── Styled components ────────────────────────────────────────────────── */
const Container = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 3rem 2rem;
  min-height: 90vh;
  animation: ${fadeUp} 0.4s ease both;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  margin-bottom: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    color: var(--foreground);
    border-color: var(--primary-light, var(--primary));
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.04);
    transform: translateX(-2px);
  }
`;

/* Progress bar across top */
const TopProgressWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 6px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: linear-gradient(90deg, var(--primary), #a855f7);
  border-radius: 99px;
  transition: width 0.5s ease;
`;

const ProgressLabel = styled.div`
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-secondary);
  white-space: nowrap;
`;

/* Lesson header */
const LessonHeader = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.75rem 2rem;
  margin-bottom: 2.5rem;
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.25rem 1.5rem;
    gap: 1rem;
  }
`;

const LessonIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--primary), #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
`;

const LessonInfo = styled.div`
  flex: 1;
`;

const LessonTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0 0 0.3rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const LessonSubtitle = styled.div`
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
`;

const LessonDesc = styled.p`
  font-size: 0.95rem;
  color: var(--foreground);
  line-height: 1.6;
  margin: 0 0 0.75rem;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const MetaDot = styled.span`
  &::before {
    content: "·";
    margin-right: 0.5rem;
  }
`;

/* Progress section */
const SectionProgress = styled.div`
  margin-bottom: 2.5rem;
`;

const ProgTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
`;

const ProgCount = styled.div`
  color: var(--text-secondary);
`;

const ProgBar = styled.div`
  height: 6px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 0.4rem;
`;

const ProgFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: linear-gradient(90deg, var(--primary), #a855f7);
  border-radius: 99px;
  transition: width 0.6s ease;
`;

/* Section list */
const SectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

const SectionCard = styled.div<{
  $locked: boolean;
  $done: boolean;
  $active: boolean;
}>`
  background: var(--surface);
  border: 1px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  border-radius: 18px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  cursor: ${({ $locked }) => ($locked ? "not-allowed" : "pointer")};
  opacity: ${({ $locked }) => ($locked ? 0.5 : 1)};
  text-decoration: none;
  color: var(--foreground);
  transition: all 0.2s;

  ${({ $locked }) =>
    !$locked &&
    `
    &:hover {
      border-color: var(--primary);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px -6px rgba(79,70,229,0.15);
    }
  `}

  @media (max-width: 600px) {
    padding: 1rem 1.15rem;
    gap: 0.85rem;
    border-radius: 16px;
  }
`;

const SectionNum = styled.div<{ $done: boolean; $active: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.9rem;
  background: ${({ $done, $active }) =>
    $done
      ? "rgba(34,197,94,0.12)"
      : $active
        ? "var(--primary)"
        : "var(--border)"};
  color: ${({ $done, $active }) =>
    $done ? "#22c55e" : $active ? "#fff" : "var(--text-secondary)"};
  border: ${({ $done }) => ($done ? "1.5px solid #22c55e" : "none")};

  @media (max-width: 600px) {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    font-size: 0.85rem;
  }
`;

const SectionInfo = styled.div`
  flex: 1;
`;

const SectionTitle = styled.div`
  font-weight: 700;
  font-size: 1.05rem;
`;

const SectionSub = styled.div`
  font-size: 0.83rem;
  color: var(--text-secondary);
  margin-top: 0.15rem;
`;

const SectionBadge = styled.span`
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0.18rem 0.55rem;
  border-radius: 99px;
  background: var(--primary);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

/* Exercise CTA */
const ExerciseBanner = styled.div<{ $locked: boolean }>`
  margin-top: 2rem;
  background: ${({ $locked }) =>
    $locked
      ? "var(--surface)"
      : "linear-gradient(135deg, rgba(79,70,229,0.15), rgba(168,85,247,0.12))"};
  border: 1px solid
    ${({ $locked }) => ($locked ? "var(--border)" : "var(--primary)")};
  border-radius: 20px;
  padding: 1.75rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    padding: 1.25rem;
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    gap: 1.25rem;
  }
`;

const ExTitle = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
`;

const ExSub = styled.div`
  font-size: 0.88rem;
  color: var(--text-secondary);
`;

const ExBtn = styled(Link)<{ $locked: boolean }>`
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  background: ${({ $locked }) =>
    $locked ? "var(--border)" : "var(--primary)"};
  color: ${({ $locked }) => ($locked ? "var(--text-secondary)" : "#fff")};
  text-decoration: none;
  pointer-events: ${({ $locked }) => ($locked ? "none" : "auto")};
  transition: all 0.2s;
  white-space: nowrap;
  &:hover {
    opacity: 0.88;
  }

  @media (max-width: 600px) {
    width: 100%;
    text-align: center;
  }
`;

/* Icons */
const CheckSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 6L9 17l-5-5"
      stroke="#22c55e"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const LockSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="11"
      width="18"
      height="11"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M7 11V7a5 5 0 0 1 10 0v4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* ─── Component ────────────────────────────────────────────────────────── */
export default function LessonDetailPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = use(params);
  const router = useRouter();
  const { progress } = useProgress();
  const completedSections = progress.completedGrammarSections;
  const completedExercises = progress.completedExercises;

  const lesson = grammarLessons.find((l) => l.id === lessonId);

  if (!lesson) {
    return (
      <Container>
        <BackLink href="/grammar/lessons">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Lessons
        </BackLink>
        <h1>Lesson not found</h1>
      </Container>
    );
  }

  /* Per-section completion */
  const sectionStatus = lesson.sections.map((s, idx) => {
    const key = `${lesson.id}/${s.id}`;
    const done = completedSections.includes(key);
    // First section always open; rest need previous done
    const locked =
      idx > 0 &&
      !completedSections.includes(
        `${lesson.id}/${lesson.sections[idx - 1].id}`,
      );
    const active = !done && !locked;
    return { done, locked, active };
  });

  const sectionsDone = sectionStatus.filter((s) => s.done).length;
  const allSectionsDone = sectionsDone >= lesson.sections.length;
  const exerciseDone = completedExercises.includes(lesson.id);
  const exerciseLocked = !allSectionsDone;
  const pct = Math.round((sectionsDone / lesson.sections.length) * 100);

  return (
    <Container>
      <BackLink href="/grammar/lessons">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Lessons
      </BackLink>

      {/* Top progress */}
      <TopProgressWrap>
        <ProgressBar>
          <ProgressFill $pct={pct} />
        </ProgressBar>
        <ProgressLabel>
          {sectionsDone}/{lesson.sections.length}
        </ProgressLabel>
      </TopProgressWrap>

      {/* Lesson header */}
      <LessonHeader>
        <LessonIcon>文</LessonIcon>
        <LessonInfo>
          <LessonTitle>
            Lesson {lesson.lessonNumber}: {lesson.title}
          </LessonTitle>
          <LessonSubtitle>{lesson.subtitle}</LessonSubtitle>
          <LessonDesc>{lesson.description}</LessonDesc>
          <MetaRow>
            <span>💬 {lesson.sections.length} sections</span>
            <MetaDot>✏️ Quiz, Fill-in &amp; Sentence Building</MetaDot>
            <MetaDot>⏱ ~{lesson.estimatedMinutes} min</MetaDot>
          </MetaRow>
        </LessonInfo>
      </LessonHeader>

      {/* Progress */}
      <SectionProgress>
        <ProgTitle>
          <span>Progress</span>
          <ProgCount>
            {sectionsDone} / {lesson.sections.length}
          </ProgCount>
        </ProgTitle>
        <ProgBar>
          <ProgFill $pct={pct} />
        </ProgBar>
      </SectionProgress>

      {/* Section list */}
      <SectionList>
        {lesson.sections.map((section, idx) => {
          const status = sectionStatus[idx];
          const href = `/grammar/lessons/${lesson.id}/${section.id}`;

          return (
            <SectionCard
              key={section.id}
              as={status.locked ? "div" : Link}
              href={status.locked ? undefined : href}
              $locked={status.locked}
              $done={status.done}
              $active={status.active}
            >
              <SectionNum $done={status.done} $active={status.active}>
                {status.done ? <CheckSvg /> : idx + 1}
              </SectionNum>

              <SectionInfo>
                <SectionTitle>{section.title}</SectionTitle>
                <SectionSub>{section.subtitle}</SectionSub>
              </SectionInfo>

              {status.active && <SectionBadge>Current</SectionBadge>}
              {status.locked && (
                <span style={{ color: "var(--text-secondary)" }}>
                  <LockSvg />
                </span>
              )}
              {status.done && (
                <span style={{ color: "#22c55e" }}>
                  <CheckSvg />
                </span>
              )}
            </SectionCard>
          );
        })}
      </SectionList>

      {/* Exercise CTA */}
      <ExerciseBanner $locked={exerciseLocked}>
        <div>
          <ExTitle>
            {exerciseDone
              ? "✓ Exercise Completed"
              : exerciseLocked
                ? "🔒 Complete all sections to unlock"
                : "🎯 Ready for the exercise?"}
          </ExTitle>
          <ExSub>
            {exerciseDone
              ? `You completed all ${lesson.exercises.length} questions!`
              : exerciseLocked
                ? `Complete all ${lesson.sections.length} sections first`
                : `${lesson.exercises.length} questions · Sentence Building & Quiz`}
          </ExSub>
        </div>
        <ExBtn
          href={exerciseLocked ? "#" : `/grammar/lessons/${lesson.id}/exercise`}
          $locked={exerciseLocked}
        >
          {exerciseDone ? "Redo Exercise" : "Start Exercise →"}
        </ExBtn>
      </ExerciseBanner>
    </Container>
  );
}
