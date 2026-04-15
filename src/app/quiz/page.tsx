'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

// Styled Components
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const QuizGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const QuizCard = styled(Link)`
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
`;

const IconWrapper = styled.div<{ $color: string }>`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: ${({ $color }) => `rgba(${$color}, 0.1)`};
  color: ${({ $color }) => `rgb(${$color})`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.5;
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

  ${QuizCard}:hover & {
    background: ${({ $color }) => `rgb(${$color})`};
    color: white;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export default function QuizHubPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }]} current="Quiz Hub" />
      <Header>
        <Title>Quiz Hub</Title>
        <Subtitle>
          Test your Japanese knowledge and reading speed with our selection of interactive quizzes.
        </Subtitle>
      </Header>

      <QuizGrid>
        {/* Daily Challenge */}
        <QuizCard href="/daily-quiz">
          <CardContent>
            <IconWrapper $color="245, 158, 11">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </IconWrapper>
            <CardTitle>Daily Challenge</CardTitle>
            <CardDescription>
              Take today's official 10-question challenge and maintain your streak.
            </CardDescription>
            <PlayButton $color="245, 158, 11">
              Play Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </PlayButton>
          </CardContent>
        </QuizCard>

        {/* Kana Quiz */}
        <QuizCard href="/quiz/kana">
          <CardContent>
            <IconWrapper $color="59, 130, 246">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="m2 17 10 5 10-5"></path>
                <path d="m2 12 10 5 10-5"></path>
              </svg>
            </IconWrapper>
            <CardTitle>Kana Quiz</CardTitle>
            <CardDescription>
              Test your reflex and memory of Hiragana and Katakana with quick-fire multiple choice questions.
            </CardDescription>
            <PlayButton $color="59, 130, 246">
              Play Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </PlayButton>
          </CardContent>
        </QuizCard>
        {/* Reverse Quiz */}
        <QuizCard href="/reverse-quiz">
          <CardContent>
            <IconWrapper $color="244, 63, 94">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </IconWrapper>
            <CardTitle>Reverse Quiz</CardTitle>
            <CardDescription>
              Given the Romaji reading, select the correct Japanese Kana character. Test your reverse recall!
            </CardDescription>
            <PlayButton $color="244, 63, 94">
              Play Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </PlayButton>
          </CardContent>
        </QuizCard>

        {/* Match Pairs */}
        <QuizCard href="/match-pairs">
          <CardContent>
            <IconWrapper $color="79, 70, 229">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <path d="M3.27 6.96L12 12.01l8.73-5.05" />
                <path d="M12 22.08V12" />
              </svg>
            </IconWrapper>
            <CardTitle>Match the Pairs</CardTitle>
            <CardDescription>
              Find the correct Romaji reading for each Japanese Kana character. Improve your reading speed!
            </CardDescription>
            <PlayButton $color="79, 70, 229">
              Play Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </PlayButton>
          </CardContent>
        </QuizCard>

        {/* Kanji Writing Quiz */}
        <QuizCard href="/quiz/writing">
          <CardContent>
            <IconWrapper $color="236, 72, 153">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </IconWrapper>
            <CardTitle>Kanji Writing</CardTitle>
            <CardDescription>
              Master Kanji stroke order with interactive drawing feedback. Learn by doing!
            </CardDescription>
            <PlayButton $color="236, 72, 153">
              Play Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </PlayButton>
          </CardContent>
        </QuizCard>
      </QuizGrid>
    </Container>
  );
}
