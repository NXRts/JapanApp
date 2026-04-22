'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2.5rem 2rem 4rem;
  min-height: 90vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--foreground) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const CategoryCard = styled(Link)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2.5rem;
  text-decoration: none;
  color: var(--foreground);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.06), transparent 40%);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2);
    border-color: var(--primary);

    &::before {
      opacity: 1;
    }
  }
`;


const CardContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const IconWrapper = styled.div<{ $color: string }>`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  background: ${({ $color }) => `rgba(${$color}, 0.1)`};
  color: ${({ $color }) => `rgb(${$color})`};

  svg {
    width: 32px;
    height: 32px;
  }
`;

const CardTitle = styled.h2`
  font-size: 2rem;
  color: var(--foreground);
  margin-bottom: 1rem;
  font-weight: 800;
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const PlayButton = styled.div<{ $color: string }>`
  align-self: flex-start;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  background: ${({ $color }) => `rgba(${$color}, 0.1)`};
  color: ${({ $color }) => `rgb(${$color})`};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${CategoryCard}:hover & {
    background: ${({ $color }) => `rgb(${$color})`};
    color: white;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

import { useProgress } from '@/context/ProgressContext';
import { isItemDue } from '@/lib/srs';

const Badge = styled.span`
  background: #ef4444;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 800;
  margin-left: 0.5rem;
  box-shadow: 0 2px 5px rgba(239, 68, 68, 0.4);
`;

export default function StudyHub() {
  const { progress } = useProgress();
  const dueItemsCount = Object.values(progress.srs).filter(isItemDue).length;

  return (
    <Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }]} current="Study" />
      
      <Header>
        <Title>Study Hub</Title>
        <Subtitle>
          Master your Japanese study skills. Choose between Reading (Dokkai) and Listening (Choukai) practice to prepare for the JLPT.
        </Subtitle>
      </Header>

      <Grid>
        <CategoryCard href="/review" style={{ gridColumn: '1 / -1', background: 'var(--primary)', color: 'white', borderColor: 'transparent' }}>
          <CardContent>
            <IconWrapper $color="255, 255, 255" className="icon-wrapper" style={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2v6h-6"></path>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                <path d="M3 22v-6h6"></path>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
              </svg>
            </IconWrapper>
            <CardTitle style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
              Daily SRS Review
              {dueItemsCount > 0 && <Badge>{dueItemsCount}</Badge>}
            </CardTitle>
            <CardDescription style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Review your vocabulary, kanji, and grammar using Spaced Repetition to ensure long-term retention.
            </CardDescription>
            <PlayButton $color="255, 255, 255" style={{ background: 'white', color: 'var(--primary)' }}>
              Start Review
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </PlayButton>
          </CardContent>
        </CategoryCard>

        <CategoryCard href="/study/reading">
          <CardContent>
            <IconWrapper $color="79, 70, 229" className="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </IconWrapper>
            <CardTitle>Reading Comprehension</CardTitle>
            <CardDescription>
              Practice reading full Japanese passages graded by JLPT level. Includes furigana toggles and study quizzes.
            </CardDescription>
            <PlayButton $color="79, 70, 229">
              Start Reading
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </PlayButton>
          </CardContent>
        </CategoryCard>

        <CategoryCard href="/study/listening">
          <CardContent>
            <IconWrapper $color="59, 130, 246" className="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </svg>
            </IconWrapper>
            <CardTitle>Listening Comprehension</CardTitle>
            <CardDescription>
              Simulate real-life Japanese conversations with interactive AI audio players. Train your ears and answer blind quizzes.
            </CardDescription>
            <PlayButton $color="59, 130, 246">
              Start Listening
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </PlayButton>
          </CardContent>
        </CategoryCard>

        <CategoryCard href="/study/speaking">
          <CardContent>
            <IconWrapper $color="16, 185, 129" className="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </IconWrapper>
            <CardTitle>Speaking Roleplay</CardTitle>
            <CardDescription>
              Practice real-life Japanese conversations by shadowing AI dialogue with your microphone.
            </CardDescription>
            <PlayButton $color="16, 185, 129">
              Start Speaking
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </PlayButton>
          </CardContent>
        </CategoryCard>

        <CategoryCard href="/study/grammar-drills">
          <CardContent>
            <IconWrapper $color="236, 72, 153" className="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </IconWrapper>
            <CardTitle>Particle Drills</CardTitle>
            <CardDescription>
              Master Japanese particles (は, が, を, に, で) with contextual fill-in-the-blank exercises.
            </CardDescription>
            <PlayButton $color="236, 72, 153">
              Start Studying
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </PlayButton>
          </CardContent>
        </CategoryCard>

        <CategoryCard href="/study/kana-flashcards">
          <CardContent>
            <IconWrapper $color="99, 102, 241" className="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <path d="M3 9h18"></path>
                <path d="M9 21V9"></path>
              </svg>
            </IconWrapper>
            <CardTitle>Kana Flashcards</CardTitle>
            <CardDescription>
              Focus on mastering individual Kana characters (Hiragana, Katakana, Dakuten) with interactive flip cards.
            </CardDescription>
            <PlayButton $color="99, 102, 241">
              Start Studying
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </PlayButton>
          </CardContent>
        </CategoryCard>

        <CategoryCard href="/study/smart-flashcards">
          <CardContent>
            <IconWrapper $color="168, 85, 247" className="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3 1.912 5.885L20 10.796l-4.544 4.427L16.528 21 12 18.204 7.472 21l1.072-5.777L4 10.796l6.088-1.911L12 3z"></path>
              </svg>
            </IconWrapper>
            <CardTitle>Smart Flashcards</CardTitle>
            <CardDescription>
              Tinder-style swipeable vocabulary flashcards with native pronunciation and active recall scoring.
            </CardDescription>
            <PlayButton $color="168, 85, 247">
              Start Studying
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </PlayButton>
          </CardContent>
        </CategoryCard>

        <CategoryCard href="/study/kanji">
          <CardContent>
            <IconWrapper $color="16, 185, 129" className="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="m2 2 5 2"></path>
                <path d="m2 2 2 5"></path>
              </svg>
            </IconWrapper>
            <CardTitle>Kanji Flashcards</CardTitle>
            <CardDescription>
              Practice writing Kanji strokes and memorize meanings with our digital self-check flashcards.
            </CardDescription>
            <PlayButton $color="16, 185, 129">
              Start Studying
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </PlayButton>
          </CardContent>
        </CategoryCard>

        <CategoryCard href="/study/vocabulary">
          <CardContent>
            <IconWrapper $color="249, 115, 22" className="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </IconWrapper>
            <CardTitle>Vocabulary Flashcards</CardTitle>
            <CardDescription>
              Learn and memorize Japanese vocabulary meanings and readings without the pressure of scoring.
            </CardDescription>
            <PlayButton $color="249, 115, 22">
              Start Studying
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </PlayButton>
          </CardContent>
        </CategoryCard>
      </Grid>
    </Container>
  );
}
