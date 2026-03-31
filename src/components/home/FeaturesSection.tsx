'use client';

import styled from 'styled-components';

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: var(--foreground);
  
  span {
    position: relative;
    z-index: 1;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: var(--primary);
      border-radius: 2px;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled.div`
  background: var(--surface);
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-light);
  }
  
  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 16px;
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15), rgba(var(--primary-rgb), 0.05));
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--primary);
  font-size: 1.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--foreground);
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1.05rem;
`;

export function FeaturesSection() {
  return (
    <Section>
      <SectionTitle><span>Everything you need</span></SectionTitle>
      <Grid>
        <Card>
          <CardIcon>字</CardIcon>
          <CardTitle>2000+ Kanji</CardTitle>
          <CardDescription>
            Comprehensive library of Joyo Kanji tailored for all JLPT levels.
            Master readings, meanings, and stroke orders.
          </CardDescription>
        </Card>
        <Card>
          <CardIcon>あ</CardIcon>
          <CardTitle>Hiragana & Katakana</CardTitle>
          <CardDescription>
            Visualize and practice the essential alphabets of Japanese.
            Perfect for beginners starting their journey.
          </CardDescription>
        </Card>
        <Card>
          <CardIcon>✍️</CardIcon>
          <CardTitle>Interactive Practice</CardTitle>
          <CardDescription>
            Test your knowledge with Kana quizzes and practice checking your memory with
            Kanji flashcards and drawing exercises.
          </CardDescription>
        </Card>
        <Card>
          <CardIcon>📖</CardIcon>
          <CardTitle>Integrated Dictionary</CardTitle>
          <CardDescription>
            Quickly look up meanings, readings, and example sentences for any Japanese word or character.
          </CardDescription>
        </Card>
      </Grid>
    </Section>
  );
}
