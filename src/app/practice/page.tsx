'use client';

import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Premium radial background similar to home */
  background: radial-gradient(circle at top center, rgba(79, 70, 229, 0.1) 0%, transparent 60%);
  margin-top: -80px; /* Pull up into navbar area */

  @media (max-width: 768px) {
    padding: 8rem 1rem 4rem; /* Increased top/bottom padding */
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  animation: fadeIn 0.8s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 600px) {
    margin-bottom: 5rem; /* Increased bottom spacing */
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--foreground);
  letter-spacing: -0.02em;
  line-height: 1.2;

  span {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 600px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  padding: 0 1rem;

  @media (max-width: 600px) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 900px;
  padding: 1rem;
  justify-items: center; /* Center items in their grid cells */
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* Force single column on mobile to ensure centering */
    gap: 1.5rem;
    padding: 0;
  }
`;

const Card = styled(Link)`
  background: var(--surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 3rem;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  width: 100%;
  max-width: 400px; /* Prevent overly wide cards on desktop */

  &:hover {
    transform: translateY(-8px);
    border-color: var(--primary);
    box-shadow: 0 20px 40px -5px rgba(79, 70, 229, 0.15);
  }

  /* Shine effect on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const IconWrapper = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(79, 70, 229, 0.05));
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin-bottom: 2rem;
  transition: transform 0.4s ease;
  box-shadow: inset 0 0 0 1px rgba(79, 70, 229, 0.1);

  ${Card}:hover & {
    transform: scale(1.1) rotate(5deg);
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: white;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1.05rem;
`;

import { useProgress } from '@/context/ProgressContext';

const StatsSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 900px;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 3rem;
  }
`;

const StatCard = styled.div`
  background: var(--surface);
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px solid var(--border);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: var(--shadow-sm);
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export default function PracticePage() {
  const { progress } = useProgress();
  const today = new Date().toISOString().split('T')[0];
  const isDailyCompleted = progress.quizHistory.some(
    q => q.date.split('T')[0] === today && q.type === 'daily-challenge'
  );
  
  const masteredCount = Object.values(progress.mastery).filter(m => m.correct > m.incorrect * 2 && m.correct > 3).length;
// ... (rest of the component)
  const learningCount = Object.keys(progress.mastery).length;

  return (
    <Container>
      <Header>
        <Title>Practice <span>Mode</span></Title>
        <Subtitle>
          Reinforce your learning with interactive quizzes and writing exercises.
        </Subtitle>
      </Header>

      <StatsSummary>
        <StatCard>
          <StatValue>{progress.streak} 🔥</StatValue>
          <StatLabel>Daily Streak</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{masteredCount}</StatValue>
          <StatLabel>Mastered Characters</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{learningCount}</StatValue>
          <StatLabel>Characters Learning</StatLabel>
        </StatCard>
      </StatsSummary>

      <Grid>
        <Card href="/daily-quiz">
          <IconWrapper>📅</IconWrapper>
          <CardTitle>Daily Challenge</CardTitle>
          <CardDescription>
            {isDailyCompleted 
              ? "✓ You've completed today's official challenge! Come back tomorrow." 
              : "Take today's official 10-question challenge and maintain your streak."}
          </CardDescription>
        </Card>

        <Card href="/practice/kana">
          <IconWrapper>あ</IconWrapper>
          <CardTitle>Kana Quiz</CardTitle>
          <CardDescription>
            Test your reflex and memory of Hiragana and Katakana with quick-fire multiple choice questions.
          </CardDescription>
        </Card>

        <Card href="/practice/kana-flashcards">
          <IconWrapper>🎴</IconWrapper>
          <CardTitle>Kana Flashcards</CardTitle>
          <CardDescription>
            Focus on mastering individual Kana characters (Hiragana, Katakana, Dakuten) with interactive flip cards.
          </CardDescription>
        </Card>

        <Card href="/practice/kanji">
          <IconWrapper>✍️</IconWrapper>
          <CardTitle>Kanji Flashcards</CardTitle>
          <CardDescription>
            Practice writing Kanji strokes and memorize meanings with our digital self-check flashcards.
          </CardDescription>
        </Card>

        <Card href="/practice/vocabulary">
          <IconWrapper>📖</IconWrapper>
          <CardTitle>Vocabulary Flashcards</CardTitle>
          <CardDescription>
            Learn and memorize Japanese vocabulary meanings and readings without the pressure of scoring.
          </CardDescription>
        </Card>
      </Grid>
    </Container>
  );
}
