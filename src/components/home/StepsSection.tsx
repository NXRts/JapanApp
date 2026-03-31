'use client';

import styled from 'styled-components';

const Section = styled.section`
  padding: 6rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
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

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
  counter-reset: step-counter;
  position: relative;
  
  @media (min-width: 768px) {
    &::before {
      content: '';
      position: absolute;
      top: 25px;
      left: 15%;
      right: 15%;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--border), transparent);
      z-index: 0;
    }
  }
  
  @media (max-width: 768px) {
    gap: 2rem;
    margin-top: 2rem;
  }
`;

const StepCard = styled.div`
  position: relative;
  text-align: center;
  padding: 2rem;
  background: var(--surface);
  border-radius: 24px;
  border: 1px solid var(--border);
  z-index: 1;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary-light);
  }
  
  &::before {
    counter-increment: step-counter;
    content: counter(step-counter);
    width: 50px;
    height: 50px;
    background: var(--surface);
    color: var(--primary);
    border: 2px solid var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.5rem;
    margin: -45px auto 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 20px;
    
    &::before {
        width: 40px;
        height: 40px;
        font-size: 1.25rem;
        margin: -35px auto 1rem;
    }
  }
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--foreground);
`;

export function StepsSection() {
  return (
    <Section>
      <SectionTitle><span>How it works</span></SectionTitle>
      <StepsGrid>
        <StepCard>
          <StepTitle>Choose Your Level</StepTitle>
          <p style={{ color: 'var(--text-secondary)' }}>
            Start with the basics of Hiragana or challenge yourself with N1 Kanji.
          </p>
        </StepCard>
        <StepCard>
          <StepTitle>Study Details</StepTitle>
          <p style={{ color: 'var(--text-secondary)' }}>
            Learn stroke orders, onyomi/kunyomi readings, and example words.
          </p>
        </StepCard>
        <StepCard>
          <StepTitle>Test Yourself</StepTitle>
          <p style={{ color: 'var(--text-secondary)' }}>
            Reinforce your knowledge with interactive quizzes and writing practice.
          </p>
        </StepCard>
      </StepsGrid>
    </Section>
  );
}
