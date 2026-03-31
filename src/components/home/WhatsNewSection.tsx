'use client';

import styled from 'styled-components';
import Link from 'next/link';

const Section = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(to bottom, transparent, rgba(79, 70, 229, 0.03), transparent);
  width: 100%;
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

const WhatsNewGrid = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled(Link)`
  background: var(--surface);
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid var(--border);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(var(--primary-rgb), 0.3);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3), 0 0 15px rgba(var(--primary-rgb), 0.1);
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const Badge = styled.span`
  align-self: flex-start;
  background: rgba(var(--primary-rgb), 0.15);
  color: var(--primary-light); 
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 0.75rem;
`;

const Description = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1rem;
`;

export function WhatsNewSection() {
  return (
    <Section>
      <SectionTitle><span>What's New</span></SectionTitle>
      <WhatsNewGrid>
        <Card href="/game">
          <Badge>New Mini-Games</Badge>
          <Title>Interactive Learning Challenges</Title>
          <Description>
            Master Japanese through fun! We've added <strong>Memory Match</strong>, <strong>Sentence Builder</strong>, and <strong>Speed Typing</strong> games to make learning addictive.
          </Description>
        </Card>
        <Card href="/dictionary">
          <Badge>Powerful Search</Badge>
          <Title>Multi-Source Dictionary</Title>
          <Description>
            Get the most accurate definitions with integrated <strong>Jisho</strong>, <strong>Wiktionary</strong>, and <strong>Native Examples</strong>. Now with Image and Voice lookup.
          </Description>
        </Card>
        <Card href="/blog">
          <Badge>New Insights</Badge>
          <Title>Japanese Culture Blog</Title>
          <Description>
            Explore deep dives into Japanese culture, daily life tips, and language learning strategies with our newly updated blog experience.
          </Description>
        </Card>
      </WhatsNewGrid>
    </Section>
  );
}
