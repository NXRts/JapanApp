'use client';

import styled from 'styled-components';
import Link from 'next/link';

const Section = styled.section`
  margin: 4rem auto 6rem;
  max-width: 1000px;
  width: 90%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: 32px;
  padding: 3rem 2rem;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(79, 70, 229, 0.3), 0 8px 10px -6px rgba(79, 70, 229, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 24px 24px;
    opacity: 0.3;
  }
`;

const Title = styled.h2`
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  position: relative;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background: white;
  color: var(--primary);
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 20px -5px rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 30px -5px rgba(255, 255, 255, 0.3);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

export function CTASection() {
  return (
    <Section>
      <Title>Ready to start?</Title>
      <p style={{ color: '#cbd5e1', marginBottom: '2rem', position: 'relative' }}>
        Join thousands of learners mastering Japanese every day.
      </p>
      <PrimaryButton href="/kanji">
        Get Started Now
      </PrimaryButton>
    </Section>
  );
}
