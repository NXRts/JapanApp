'use client';

import styled from 'styled-components';
import { n5Vocabulary } from '@/data/jlpt/n5/vocabulary';
import { useState } from 'react';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 90vh;
`;

const Header = styled.div`
  margin-bottom: 4rem;
  text-align: center;
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
    gap: 1rem;
    text-align: center;
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExample = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Container>
      <Header>
        <Title>Vocabulary</Title>
        <Subtitle>
          Essential words to build your Japanese foundation.
        </Subtitle>
      </Header>

      <VocabList>
        {n5Vocabulary.map((item) => (
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
