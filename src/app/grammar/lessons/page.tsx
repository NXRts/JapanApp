"use client";

import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { grammarLessons, totalSections } from "@/data/grammarLessons";
import { useProgress } from "@/context/ProgressContext";

/* ─── Animations ───────────────────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

/* ─── Styled components ────────────────────────────────────────────────── */
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
  min-height: 90vh;
  animation: ${fadeUp} 0.45s ease both;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2.5rem;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 0.4rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const FuriganaToggleBtn = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  background: ${({ $active }) =>
    $active ? "rgba(var(--primary-rgb, 79, 70, 229), 0.08)" : "var(--surface)"};
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: var(--foreground);
    border-color: var(--primary);
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.04);
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

const PageTitle = styled.h1`
  font-size: 2.75rem;
  font-weight: 800;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageSub = styled.p`
  color: var(--text-secondary);
  margin: 0;
  font-size: 1.05rem;
`;

const ProgressCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.5rem 2rem;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const ProgressLabel = styled.div`
  font-weight: 700;
  font-size: 1rem;
  color: var(--foreground);
`;

const ProgressCount = styled.div`
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-secondary);
`;

const ProgressBarWrap = styled.div`
  width: 100%;
  height: 8px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
  margin-top: 0.75rem;
`;

const ProgressBarFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: linear-gradient(90deg, var(--primary), #a855f7);
  border-radius: 99px;
  transition: width 0.6s ease;
`;

const ProgressPct = styled.div`
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-top: 0.4rem;
`;

const LessonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LessonCard = styled.div<{ $locked: boolean; $active: boolean }>`
  background: var(--surface);
  border: 1px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  border-radius: 20px;
  padding: 1.5rem 1.75rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  cursor: ${({ $locked }) => ($locked ? "not-allowed" : "pointer")};
  opacity: ${({ $locked }) => ($locked ? 0.55 : 1)};
  transition: all 0.25s;
  text-decoration: none;
  color: var(--foreground);
  position: relative;
  overflow: hidden;

  ${({ $locked }) =>
    !$locked &&
    `
    &:hover {
      border-color: var(--primary);
      transform: translateY(-3px);
      box-shadow: 0 12px 30px -8px rgba(79,70,229,0.18);
    }
  `}

  @media (max-width: 600px) {
    padding: 1rem 1.15rem;
    gap: 0.85rem;
    border-radius: 16px;
  }
`;

const LessonNumBadge = styled.div<{ $done: boolean; $active: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
  background: ${({ $done, $active }) =>
    $done
      ? "rgba(34,197,94,0.15)"
      : $active
        ? "var(--primary)"
        : "var(--border)"};
  color: ${({ $done, $active }) =>
    $done ? "#22c55e" : $active ? "#fff" : "var(--text-secondary)"};
  border: ${({ $done }) => ($done ? "2px solid #22c55e" : "none")};

  @media (max-width: 600px) {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    font-size: 0.95rem;
  }
`;

const LessonInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const LessonTitle = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.2rem;

  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

const LessonSubtitle = styled.div`
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin-bottom: 0.4rem;
`;

const LessonMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const MetaTag = styled.span<{ $green?: boolean }>`
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
  background: ${({ $green }) =>
    $green ? "rgba(34,197,94,0.1)" : "rgba(var(--primary-rgb),0.08)"};
  color: ${({ $green }) => ($green ? "#22c55e" : "var(--primary)")};
`;

const CurrentBadge = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 99px;
  background: var(--primary);
  color: #fff;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const SectionCount = styled.div`
  font-size: 0.82rem;
  color: var(--text-secondary);
  text-align: right;
  flex-shrink: 0;
`;

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M17 11H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M12 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
    <path
      d="M8 11V7a4 4 0 0 1 8 0v4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ChevronIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 18l6-6-6-6"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 6L9 17l-5-5"
      stroke="#22c55e"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── Component ────────────────────────────────────────────────────────── */
export default function GrammarLessonsPage() {
  const { progress, setShowFurigana } = useProgress();
  const completedSections = progress.completedGrammarSections;
  const completedExercises = progress.completedExercises;

  /* Figure out per-lesson completion */
  const statusFixed = grammarLessons.map((lesson, idx) => {
    const sectionsDone = lesson.sections.filter((s) =>
      completedSections.includes(`${lesson.id}/${s.id}`),
    ).length;
    const exerciseDone = completedExercises.includes(lesson.id);
    const totalInLesson = lesson.sections.length;
    const pct = Math.round((sectionsDone / totalInLesson) * 100);
    const done = sectionsDone >= totalInLesson && exerciseDone;
    let locked = false;
    if (idx > 0) {
      const prev = grammarLessons[idx - 1];
      const prevSectionsDone = prev.sections.filter((s) =>
        completedSections.includes(`${prev.id}/${s.id}`),
      ).length;
      const prevExDone = completedExercises.includes(prev.id);
      locked = !(prevSectionsDone >= prev.sections.length && prevExDone);
    }
    return { sectionsDone, totalInLesson, pct, done, locked };
  });

  const totalDoneSections = grammarLessons.reduce((sum, lesson) => {
    return (
      sum +
      lesson.sections.filter((s) =>
        completedSections.includes(`${lesson.id}/${s.id}`),
      ).length
    );
  }, 0);

  const overallPct = Math.round((totalDoneSections / totalSections) * 100);

  /* Find current (first non-done, non-locked) lesson */
  const currentIdx = statusFixed.findIndex((s) => !s.done && !s.locked);

  return (
    <Container>
      <Header>
        <BackLink href="/grammar">
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
          Back to Grammar
        </BackLink>
        <HeaderTop>
          <PageTitle>Grammar Lessons</PageTitle>
          <FuriganaToggleBtn
            $active={progress.showFurigana}
            onClick={() => setShowFurigana(!progress.showFurigana)}
          >
            <span>
              {progress.showFurigana
                ? "🌸 Furigana: Show"
                : "💤 Furigana: Hide"}
            </span>
          </FuriganaToggleBtn>
        </HeaderTop>
        <PageSub>All {grammarLessons.length} lessons for N5 grammar</PageSub>
      </Header>

      {/* Overall Progress */}
      <ProgressCard>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ProgressLabel>Overall Progress</ProgressLabel>
            <ProgressCount>
              {totalDoneSections} / {totalSections} sections
            </ProgressCount>
          </div>
          <ProgressBarWrap>
            <ProgressBarFill $pct={overallPct} />
          </ProgressBarWrap>
          <ProgressPct>{overallPct}% completed</ProgressPct>
        </div>
      </ProgressCard>

      {/* Lesson List */}
      <LessonList>
        {grammarLessons.map((lesson, idx) => {
          const s = statusFixed[idx];
          const isActive = idx === currentIdx;

          const cardContent = (
            <>
              <LessonNumBadge $done={s.done} $active={isActive && !s.done}>
                {s.done ? <CheckIcon /> : lesson.lessonNumber}
              </LessonNumBadge>

              <LessonInfo>
                <LessonTitle>
                  Lesson {lesson.lessonNumber}: {lesson.title}
                  {isActive && !s.done && (
                    <CurrentBadge style={{ marginLeft: "0.6rem" }}>
                      Current
                    </CurrentBadge>
                  )}
                </LessonTitle>
                <LessonSubtitle>{lesson.subtitle}</LessonSubtitle>
                <LessonMeta>
                  <MetaTag>{lesson.sections.length} sections</MetaTag>
                  {s.done ? (
                    <MetaTag $green>✓ Completed</MetaTag>
                  ) : s.sectionsDone > 0 ? (
                    <MetaTag>
                      {s.sectionsDone}/{s.totalInLesson} done
                    </MetaTag>
                  ) : null}
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    ~{lesson.estimatedMinutes} min
                  </span>
                </LessonMeta>
              </LessonInfo>

              <SectionCount>
                <div style={{ marginBottom: "0.2rem" }}>
                  {s.sectionsDone}/{s.totalInLesson}
                </div>
                {s.locked ? (
                  <span style={{ color: "var(--text-secondary)" }}>
                    <LockIcon />
                  </span>
                ) : (
                  <span style={{ color: "var(--primary)" }}>
                    <ChevronIcon />
                  </span>
                )}
              </SectionCount>
            </>
          );

          if (s.locked) {
            return (
              <LessonCard key={lesson.id} $locked $active={false}>
                {cardContent}
              </LessonCard>
            );
          }

          return (
            <LessonCard
              key={lesson.id}
              as={Link}
              href={`/grammar/lessons/${lesson.id}`}
              $locked={false}
              $active={isActive}
            >
              {cardContent}
            </LessonCard>
          );
        })}
      </LessonList>
    </Container>
  );
}
