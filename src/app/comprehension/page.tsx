'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 2rem 4rem;
  min-height: 90vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--foreground), var(--primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 4rem;
`;

const CategoryCard = styled(Link)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px);
    border-color: var(--primary);
    box-shadow: 0 20px 40px -15px rgba(79, 70, 229, 0.2);
    
    .icon-wrapper {
      transform: scale(1.1) rotate(5deg);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at top right, rgba(79, 70, 229, 0.05), transparent 50%);
    pointer-events: none;
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  background: rgba(79, 70, 229, 0.1);
  color: var(--primary);
`;

const CardTitle = styled.h2`
  font-size: 2rem;
  color: var(--foreground);
  margin-bottom: 1rem;
  font-weight: 800;
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
`;

export default function ComprehensionHub() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }]} current="Comprehension" />
      
      <Header>
        <Title>Comprehension</Title>
        <Subtitle>
          Master your Japanese comprehension skills. Choose between Reading (Dokkai) and Listening (Choukai) practice to prepare for the JLPT.
        </Subtitle>
      </Header>

      <Grid>
        <CategoryCard href="/comprehension/reading">
          <IconWrapper className="icon-wrapper">
            📖
          </IconWrapper>
          <CardTitle>Reading Comprehension</CardTitle>
          <CardDescription>
            Practice reading full Japanese passages graded by JLPT level. Includes furigana toggles and comprehension quizzes.
          </CardDescription>
        </CategoryCard>

        <CategoryCard href="/comprehension/listening" style={{ borderLeft: '4px solid #3b82f6' }}>
          <IconWrapper className="icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            🎧
          </IconWrapper>
          <CardTitle>Listening Comprehension</CardTitle>
          <CardDescription>
            Simulate real-life Japanese conversations with interactive AI audio players. Train your ears and answer blind quizzes.
          </CardDescription>
        </CategoryCard>
      </Grid>
    </Container>
  );
}
