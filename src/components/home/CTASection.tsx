'use client';

import styled from 'styled-components';
import Link from 'next/link';

const SectionWrapper = styled.section`
  padding: 6rem 1.5rem 8rem;
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 4rem 1rem 5rem;
  }
`;

const CTAContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%);
  border-radius: 40px;
  padding: 5rem 2rem;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 30px 60px -12px rgba(79, 70, 229, 0.4);
  
  @media (max-width: 768px) {
    padding: 3.5rem 1.5rem;
    border-radius: 32px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
  }

  /* Decorative Orbs */
  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: white;
    filter: blur(120px);
    opacity: 0.1;
    top: -150px;
    right: -100px;
    border-radius: 50%;
  }
`;

const TitleBuffer = styled.div`
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
`;

const GLOW_ANIMATION = `
  @keyframes glow {
    0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
    70% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
  }
`;

const PrimaryButton = styled(Link)`
  ${GLOW_ANIMATION}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 3rem;
  background: white;
  color: var(--primary);
  font-weight: 800;
  font-size: 1.15rem;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.2);
  animation: glow 3s infinite;
  box-sizing: border-box;

  @media (max-width: 640px) {
    width: 100%;
    padding: 1.1rem 1.5rem;
    font-size: 1.1rem;
  }

  &:hover {
    transform: translateY(-5px) scale(1.05);
    background: #f8fafc;
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(-2px) scale(0.98);
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 2.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  font-weight: 700;
  font-size: 1.15rem;
  border-radius: 20px;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  box-sizing: border-box;

  @media (max-width: 640px) {
    width: 100%;
    padding: 1.1rem 1.5rem;
    font-size: 1.1rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

export function CTASection() {
  return (
    <SectionWrapper>
      <CTAContainer>
        <TitleBuffer>
          <Title>Ready to Master Japanese?</Title>
          <Subtitle>
            Join thousands of students using our AI-powered SRS Mastery to crush their JLPT goals. Start your journey today!
          </Subtitle>
          <ActionGroup>
            <PrimaryButton href="/jlpt">
              Start JLPT Challenge
            </PrimaryButton>
            <SecondaryButton href="/practice">
              Try Practice Mode
            </SecondaryButton>
          </ActionGroup>
        </TitleBuffer>
      </CTAContainer>
    </SectionWrapper>
  );
}
