'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { n5Grammar } from '@/data/jlpt/n5/grammar';

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

const GrammarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const GrammarCard = styled(Link)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2rem;
  text-decoration: none;
  color: var(--foreground);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: var(--shadow-lg);
  }
`;

const LevelBadge = styled.span`
  background: rgba(79, 70, 229, 0.1);
  color: var(--primary);
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 700;
  align-self: flex-start;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
`;

const CardMeaning = styled.p`
  color: var(--text-secondary);
  line-height: 1.5;
`;

export default function GrammarPage() {
  return (
    <Container>
      <Header>
        <LevelBadge>JLPT N5</LevelBadge>
        <Title>Grammar Guide</Title>
        <Subtitle>
          Master Japanese sentence structures and particles.
        </Subtitle>
      </Header>

      <GrammarGrid>
        {n5Grammar.map((point) => (
          <GrammarCard key={point.id} href={`/grammar/${point.id}`}>
            <CardTitle>{point.title}</CardTitle>
            <CardMeaning>{point.meaning}</CardMeaning>
            <div style={{ marginTop: 'auto', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
              Learn more →
            </div>
          </GrammarCard>
        ))}
      </GrammarGrid>
    </Container>
  );
}
