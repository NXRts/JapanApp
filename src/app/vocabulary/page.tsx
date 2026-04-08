'use client';

import styled from 'styled-components';
import { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { n5Vocabulary } from '@/data/jlpt/n5/vocabulary';
import { n4Vocabulary } from '@/data/jlpt/n4/vocabulary';
import { n3Vocabulary } from '@/data/jlpt/n3/vocabulary';
import { n2Vocabulary } from '@/data/jlpt/n2/vocabulary';
import { n1Vocabulary } from '@/data/jlpt/n1/vocabulary';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 90vh;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem;
  }
`;

const Header = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--foreground) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
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

const VocabList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const VocabCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.5rem 2rem;
  display: grid;
  grid-template-columns: 150px 1fr 1fr auto;
  align-items: center;
  gap: 2rem;
  transition: all 0.2s;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 1.5rem;
    text-align: left;
    align-items: flex-start;
  }

  &:hover {
    border-color: var(--primary);
    box-shadow: var(--shadow-sm);
  }
`;

const Word = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--foreground);

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Reading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Kana = styled.span`
  font-size: 1.1rem;
  color: var(--foreground);
`;

const Romaji = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const Meaning = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary);
`;

const CategoryBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const ExampleToggle = styled.button`
  background: none;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 99px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const ExampleBox = styled.div`
  grid-column: 1 / -1;
  background: rgba(255, 255, 255, 0.02);
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 1rem;
  border-left: 3px solid var(--primary);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default function VocabularyPage() {
  const [activeLevel, setActiveLevel] = useState<'N5' | 'N4' | 'N3' | 'N2' | 'N1' >('N5');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const currentData = {
    N5: n5Vocabulary,
    N4: n4Vocabulary,
    N3: n3Vocabulary,
    N2: n2Vocabulary,
    N1: n1Vocabulary,
  }[activeLevel];

  const toggleExample = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Container>
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Materials', href: '/materi' }
        ]} 
        current="Vocabulary" 
      />
      <Header>
        <Title>Vocabulary</Title>
        <Subtitle>
          Essential words to build your Japanese foundation. Select your target JLPT level.
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

      <VocabList>
        {currentData?.map((item) => (
          <VocabCard key={item.id}>
            <Word>{item.word}</Word>
            <Reading>
              <Kana>{item.reading}</Kana>
              <Romaji>{item.romaji}</Romaji>
            </Reading>
            <Meaning>{item.meaning}</Meaning>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CategoryBadge>{item.category}</CategoryBadge>
              {item.example && (
                <ExampleToggle onClick={() => toggleExample(item.id)}>
                  {expandedId === item.id ? 'Hide Example' : 'Show Example'}
                </ExampleToggle>
              )}
            </div>
            
            {expandedId === item.id && item.example && (
              <ExampleBox>
                <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>{item.example.japanese}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{item.example.romaji}</div>
                <div style={{ fontSize: '1rem' }}>{item.example.english}</div>
              </ExampleBox>
            )}
          </VocabCard>
        ))}
      </VocabList>
    </Container>
  );
}
