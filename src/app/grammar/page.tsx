'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';
import { n5Grammar } from '@/data/jlpt/n5/grammar';
import { n4Grammar } from '@/data/jlpt/n4/grammar';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 90vh;
`;

const Header = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--foreground) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0;
  line-height: 1.6;
`;

const LevelSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  justify-content: center;
`;

const LevelButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 2rem;
  border-radius: 99px;
  border: 1px solid ${({ $active }) => ($active ? 'var(--primary)' : 'var(--border)')};
  background: ${({ $active }) => ($active ? 'rgba(79, 70, 229, 0.1)' : 'var(--surface)')};
  color: ${({ $active }) => ($active ? 'var(--primary)' : 'var(--text-secondary)')};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const GrammarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const GrammarCard = styled(Link)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2.5rem;
  text-decoration: none;
  color: var(--foreground);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    border-color: var(--primary);
    box-shadow: 0 20px 40px -10px rgba(79, 70, 229, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--primary);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
`;

const CardMeaning = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1.1rem;
  margin: 0;
`;

export default function GrammarPage() {
  const [activeLevel, setActiveLevel] = useState<'N5' | 'N4'>('N5');

  const currentData = activeLevel === 'N5' ? n5Grammar : n4Grammar;

  return (
    <Container>
      <Header>
        <Title>Grammar Guide</Title>
        <Subtitle>
          Master Japanese sentence structures and particles. Choose your target JLPT level to begin.
        </Subtitle>
      </Header>

      <LevelSelector>
        <LevelButton 
          $active={activeLevel === 'N5'} 
          onClick={() => setActiveLevel('N5')}
        >
          JLPT N5
        </LevelButton>
        <LevelButton 
          $active={activeLevel === 'N4'} 
          onClick={() => setActiveLevel('N4')}
        >
          JLPT N4
        </LevelButton>
      </LevelSelector>

      <GrammarGrid>
        {currentData.map((point) => (
          <GrammarCard key={point.id} href={`/grammar/${point.id}`}>
            <CardTitle>{point.title}</CardTitle>
            <CardMeaning>{point.meaning}</CardMeaning>
            <div style={{ marginTop: 'auto', color: 'var(--primary)', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Learn more
              <span>→</span>
            </div>
          </GrammarCard>
        ))}
      </GrammarGrid>
    </Container>
  );
}
