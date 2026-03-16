'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';
import { n5Grammar } from '@/data/jlpt/n5/grammar';
import { n4Grammar } from '@/data/jlpt/n4/grammar';
import { n3Grammar } from '@/data/jlpt/n3/grammar';
import { n2Grammar } from '@/data/jlpt/n2/grammar';
import { n1Grammar } from '@/data/jlpt/n1/grammar';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 90vh;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
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

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const LevelSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
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
  white-space: nowrap;

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1.25rem;
    font-size: 0.9rem;
    flex: 1;
    min-width: calc(33.33% - 0.5rem);
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

  @media (max-width: 768px) {
    padding: 1.75rem;
    gap: 1rem;
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

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const CardMeaning = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1.1rem;
  margin: 0;
`;

export default function GrammarPage() {
  const [activeLevel, setActiveLevel] = useState<'N5' | 'N4' | 'N3' | 'N2' | 'N1' >('N5');

  const currentData = {
    N5: n5Grammar,
    N4: n4Grammar,
    N3: n3Grammar,
    N2: n2Grammar,
    N1: n1Grammar,
  }[activeLevel];

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
        <LevelButton 
          $active={activeLevel === 'N3'} 
          onClick={() => setActiveLevel('N3')}
        >
          JLPT N3
        </LevelButton>
        <LevelButton 
          $active={activeLevel === 'N2'} 
          onClick={() => setActiveLevel('N2')}
        >
          JLPT N2
        </LevelButton>
        <LevelButton 
          $active={activeLevel === 'N1'} 
          onClick={() => setActiveLevel('N1')}
        >
          JLPT N1
        </LevelButton>
      </LevelSelector>

      <GrammarGrid>
        {currentData?.map((point) => (
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
