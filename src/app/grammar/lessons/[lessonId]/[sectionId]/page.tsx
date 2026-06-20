"use client";

import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { grammarLessons } from "@/data/grammarLessons";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* ─── localStorage helpers ─────────────────────────────────────────────── */
function getCompletedSections(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("grammar_completed_sections") ?? "[]");
  } catch { return []; }
}
function markSectionDone(lessonId: string, sectionId: string) {
  const done = getCompletedSections();
  const key = `${lessonId}/${sectionId}`;
  if (!done.includes(key)) {
    done.push(key);
    localStorage.setItem("grammar_completed_sections", JSON.stringify(done));
  }
}

/* ─── Animations ───────────────────────────────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(79,70,229,0); }
  50%       { box-shadow: 0 0 0 8px rgba(79,70,229,0.12); }
`;

/* ─── Styled components ────────────────────────────────────────────────── */
const Container = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 90vh;
  animation: ${fadeIn} 0.4s ease both;

  @media (max-width: 768px) {
    padding: 1.25rem 1rem;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    width: 100%;
  }
`;

const BackBtn = styled(Link)`
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
  transition: all 0.2s ease;

  &:hover {
    color: var(--foreground);
    border-color: var(--primary-light, var(--primary));
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.04);
    transform: translateX(-2px);
  }
`;

const SectionCounter = styled.div`
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-secondary);
`;

/* Thin progress bar */
const ProgressBarWrap = styled.div`
  height: 5px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 2rem;
`;
const ProgressBarFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: linear-gradient(90deg, var(--primary), #a855f7);
  border-radius: 99px;
  transition: width 0.5s ease;
`;

/* Section header */
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.25rem;
`;

const SectionIconBadge = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--primary), #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const SectionTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0.2rem 0 0;
`;

/* Content blocks */
const AccordionBlock = styled.div<{ $open: boolean }>`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  margin-bottom: 1.25rem;
  overflow: hidden;
  transition: border-color 0.2s;

  &:hover { border-color: rgba(79,70,229,0.3); }
`;

const AccordionHeader = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-align: left;
  color: var(--foreground);
`;

const AccordionTitle = styled.span`
  font-weight: 700;
  font-size: 1.05rem;
`;

const ChevronIcon = styled.span<{ $open: boolean }>`
  transition: transform 0.3s;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
  color: var(--text-secondary);
  display: flex;
`;

const AccordionBody = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? "9000px" : "0")};
  overflow: hidden;
  transition: max-height 0.4s ease;
`;

const AccordionContent = styled.div`
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid var(--border);
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.75;
  color: var(--foreground);
  margin: 1rem 0;
`;

/* Example cards */
const ExampleCard = styled.div`
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.04);
  border: 1px solid rgba(var(--primary-rgb, 79, 70, 229), 0.12);
  border-radius: 14px;
  padding: 1rem 1.25rem;
  margin: 0.75rem 0;
`;

const JapaneseRow = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.15rem;
`;

const FuriganaRow = styled.div`
  font-size: 0.82rem;
  color: var(--text-secondary);
  letter-spacing: 0.03em;
  margin-bottom: 0.3rem;
`;

const EnglishRow = styled.div`
  font-size: 0.92rem;
  color: var(--text-secondary);
`;

const TipBox = styled.div`
  background: rgba(234,179,8,0.08);
  border: 1px solid rgba(234,179,8,0.25);
  border-radius: 12px;
  padding: 0.85rem 1.1rem;
  font-size: 0.9rem;
  color: var(--foreground);
  display: flex;
  gap: 0.6rem;
  margin-top: 0.75rem;
  line-height: 1.55;
`;

/* Key Vocabulary */
const VocabGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
`;

const VocabCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.9rem 1.1rem;
  transition: border-color 0.2s;
  &:hover { border-color: var(--primary); }
`;

const VocabKanji = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
`;

const VocabFuri = styled.div`
  font-size: 0.78rem;
  color: var(--text-secondary);
`;

const VocabMeaning = styled.div`
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin-top: 0.3rem;
`;

/* Summary */
const SummaryBox = styled.div`
  background: linear-gradient(135deg, rgba(79,70,229,0.12), rgba(168,85,247,0.1));
  border: 1px solid rgba(79,70,229,0.25);
  border-radius: 20px;
  padding: 1.5rem 1.75rem;
  margin-bottom: 2rem;
`;

const SummaryTitle = styled.div`
  font-weight: 800;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: var(--primary);
`;

const SummaryList = styled.ul`
  margin: 0;
  padding: 0 0 0 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const SummaryItem = styled.li`
  font-size: 0.93rem;
  line-height: 1.5;
  color: var(--foreground);
`;

/* Bottom nav */
const NavRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const NavBtn = styled(Link)<{ $primary?: boolean }>`
  flex: 1;
  min-width: 140px;
  padding: 0.875rem 1.5rem;
  border-radius: 14px;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  text-align: center;
  border: 1px solid ${({ $primary }) => ($primary ? "var(--primary)" : "var(--border)")};
  background: ${({ $primary }) => ($primary ? "var(--primary)" : "var(--surface)")};
  color: ${({ $primary }) => ($primary ? "#fff" : "var(--foreground)")};
  transition: all 0.2s;
  animation: ${({ $primary }) => ($primary ? glowPulse : "none")} 2.5s ease infinite;
  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

const MarkDoneBtn = styled.button`
  flex: 1;
  min-width: 140px;
  padding: 0.875rem 1.5rem;
  border-radius: 14px;
  font-weight: 700;
  font-size: 0.95rem;
  border: none;
  background: var(--primary);
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { transform: translateY(-2px); opacity: 0.9; }
`;

/* Chevron down SVG */
const Chevron = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Component ────────────────────────────────────────────────────────── */
export default function SectionPage({
  params,
}: {
  params: Promise<{ lessonId: string; sectionId: string }>;
}) {
  const { lessonId, sectionId } = use(params);
  const router = useRouter();
  const [openBlocks, setOpenBlocks] = useState<Set<number>>(new Set([0]));
  const [marked, setMarked] = useState(false);

  const lesson = grammarLessons.find((l) => l.id === lessonId);
  const section = lesson?.sections.find((s) => s.id === sectionId);
  const sectionIdx = lesson?.sections.findIndex((s) => s.id === sectionId) ?? 0;

  useEffect(() => {
    const done = getCompletedSections();
    if (done.includes(`${lessonId}/${sectionId}`)) setMarked(true);
    // Auto-open all
    if (section) {
      setOpenBlocks(new Set(section.subsections.map((_, i) => i)));
    }
  }, [lessonId, sectionId]);

  if (!lesson || !section) {
    return (
      <Container>
        <BackBtn href="/grammar/lessons">
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
          Back
        </BackBtn>
        <h1>Section not found</h1>
      </Container>
    );
  }

  const totalSectionsInLesson = lesson.sections.length;
  const pct = Math.round(((sectionIdx + 1) / totalSectionsInLesson) * 100);

  const nextSection = lesson.sections[sectionIdx + 1];
  const prevSection = lesson.sections[sectionIdx - 1];

  function toggleBlock(i: number) {
    setOpenBlocks((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function handleMarkDone() {
    markSectionDone(lessonId, sectionId);
    setMarked(true);
    // Navigate to next section or back to lesson
    if (nextSection) {
      router.push(`/grammar/lessons/${lessonId}/${nextSection.id}`);
    } else {
      router.push(`/grammar/lessons/${lessonId}`);
    }
  }

  return (
    <Container>
      {/* Top nav */}
      <TopRow>
        <BackBtn href={`/grammar/lessons/${lessonId}`}>
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
          Back to Lesson {lesson.lessonNumber}
        </BackBtn>
        <SectionCounter>
          SECTION {sectionIdx + 1} OF {totalSectionsInLesson}
        </SectionCounter>
      </TopRow>

      {/* Progress bar */}
      <ProgressBarWrap>
        <ProgressBarFill $pct={pct} />
      </ProgressBarWrap>

      {/* Section header */}
      <SectionHeader>
        <SectionIconBadge>🎯</SectionIconBadge>
        <div>
          <SectionTitle>{section.title}</SectionTitle>
          <SectionSubtitle>{section.subtitle}</SectionSubtitle>
        </div>
      </SectionHeader>

      {/* Introduction */}
      <AccordionBlock $open={true}>
        <AccordionHeader onClick={() => toggleBlock(-1)}>
          <AccordionTitle>Introduction</AccordionTitle>
          <ChevronIcon $open={openBlocks.has(-1)}>
            <Chevron />
          </ChevronIcon>
        </AccordionHeader>
        <AccordionBody $open={openBlocks.has(-1)}>
          <AccordionContent>
            <Paragraph>{section.introduction}</Paragraph>
          </AccordionContent>
        </AccordionBody>
      </AccordionBlock>

      {/* Subsections */}
      {section.subsections.map((sub, i) => (
        <AccordionBlock key={i} $open={openBlocks.has(i)}>
          <AccordionHeader onClick={() => toggleBlock(i)}>
            <AccordionTitle>
              {i + 1}. {sub.heading}
            </AccordionTitle>
            <ChevronIcon $open={openBlocks.has(i)}>
              <Chevron />
            </ChevronIcon>
          </AccordionHeader>
          <AccordionBody $open={openBlocks.has(i)}>
            <AccordionContent>
              <Paragraph>{sub.content}</Paragraph>

              {sub.examples?.map((ex, ei) => (
                <ExampleCard key={ei}>
                  <JapaneseRow>{ex.japanese}</JapaneseRow>
                  {ex.furigana && <FuriganaRow>{ex.furigana}</FuriganaRow>}
                  <EnglishRow>{ex.english}</EnglishRow>
                </ExampleCard>
              ))}

              {sub.tip && (
                <TipBox>
                  <span>💡</span>
                  <span>{sub.tip}</span>
                </TipBox>
              )}
            </AccordionContent>
          </AccordionBody>
        </AccordionBlock>
      ))}

      {/* Key Vocabulary */}
      {section.keyVocabulary && section.keyVocabulary.length > 0 && (
        <AccordionBlock $open={openBlocks.has(99)}>
          <AccordionHeader onClick={() => toggleBlock(99)}>
            <AccordionTitle>4. Key Vocabulary</AccordionTitle>
            <ChevronIcon $open={openBlocks.has(99)}>
              <Chevron />
            </ChevronIcon>
          </AccordionHeader>
          <AccordionBody $open={openBlocks.has(99)}>
            <AccordionContent>
              <Paragraph>
                Here are the key words you need with this pattern. Furigana
                above the kanji helps you read them right away.
              </Paragraph>
              <VocabGrid>
                {section.keyVocabulary.map((v, vi) => (
                  <VocabCard key={vi}>
                    <VocabFuri>{v.furigana}</VocabFuri>
                    <VocabKanji>{v.kanji}</VocabKanji>
                    <VocabMeaning>{v.meaning}</VocabMeaning>
                  </VocabCard>
                ))}
              </VocabGrid>
            </AccordionContent>
          </AccordionBody>
        </AccordionBlock>
      )}

      {/* Summary */}
      {section.summary.length > 0 && (
        <SummaryBox>
          <SummaryTitle>Summary</SummaryTitle>
          <SummaryList>
            {section.summary.map((item, si) => (
              <SummaryItem key={si}>{item}</SummaryItem>
            ))}
          </SummaryList>
        </SummaryBox>
      )}

      {/* Navigation buttons */}
      <NavRow>
        {prevSection ? (
          <NavBtn href={`/grammar/lessons/${lessonId}/${prevSection.id}`}>
            ← Previous
          </NavBtn>
        ) : (
          <NavBtn href={`/grammar/lessons/${lessonId}`}>← Back to Lesson</NavBtn>
        )}

        {marked ? (
          nextSection ? (
            <NavBtn
              $primary
              href={`/grammar/lessons/${lessonId}/${nextSection.id}`}
            >
              Next Section →
            </NavBtn>
          ) : (
            <NavBtn $primary href={`/grammar/lessons/${lessonId}`}>
              Back to Lesson ✓
            </NavBtn>
          )
        ) : (
          <MarkDoneBtn onClick={handleMarkDone}>
            {nextSection ? "Mark as done & continue →" : "Complete section ✓"}
          </MarkDoneBtn>
        )}
      </NavRow>
    </Container>
  );
}
