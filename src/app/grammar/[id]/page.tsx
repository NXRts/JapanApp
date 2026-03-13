'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { n5Grammar } from '@/data/jlpt/n5/grammar';
import { n4Grammar } from '@/data/jlpt/n4/grammar';
import { use } from 'react';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 90vh;
`;

const BackLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: var(--primary);
  }
`;

const Header = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
`;

const Meaning = styled.div`
  font-size: 1.5rem;
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  margin-bottom: 3rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StructureBox = styled.div`
  background: rgba(var(--primary-rgb), 0.05);
  border-left: 4px solid var(--primary);
  padding: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  border-radius: 0 16px 16px 0;
`;

const Explanation = styled.p`
  line-height: 1.8;
  font-size: 1.1rem;
  color: var(--foreground);
`;

const ExampleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ExampleItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const JapaneseText = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--foreground);
`;

const RomajiText = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
  font-style: italic;
`;

const EnglishText = styled.div`
  font-size: 1.1rem;
  color: var(--foreground);
`;

export default function GrammarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  // Search in both N5 and N4
  const allGrammar = [...n5Grammar, ...n4Grammar];
  const point = allGrammar.find((p) => p.id === id);

  if (!point) {
    return (
      <Container>
        <Header>
          <Title>Grammar point not found</Title>
          <BackLink href="/grammar">← Back to Grammar</BackLink>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <BackLink href="/grammar">← Back to Grammar</BackLink>
      
      <Header>
        <Title>{point.title}</Title>
        <Meaning>{point.meaning}</Meaning>
      </Header>

      <Section>
        <SectionTitle>Structure</SectionTitle>
        <StructureBox>{point.structure}</StructureBox>
      </Section>

      <Section>
        <SectionTitle>Explanation</SectionTitle>
        <Explanation>{point.explanation}</Explanation>
      </Section>

      <Section>
        <SectionTitle>Examples</SectionTitle>
        <ExampleList>
          {point.examples.map((example, index) => (
            <ExampleItem key={index}>
              <JapaneseText>{example.japanese}</JapaneseText>
              <RomajiText>{example.romaji}</RomajiText>
              <EnglishText>{example.english}</EnglishText>
            </ExampleItem>
          ))}
        </ExampleList>
      </Section>
    </Container>
  );
}
