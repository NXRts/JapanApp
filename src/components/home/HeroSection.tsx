'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1rem 4rem;
  margin-top: -2rem; /* Offset navbar margin */
  
  @media (max-width: 768px) {
    padding: 4rem 1rem 4rem;
    min-height: auto;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  color: var(--foreground);
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  
  span {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 10px rgba(79, 70, 229, 0.2));
    display: inline-block;
    animation: ${float} 6s ease-in-out infinite;
  }
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 320px;
    gap: 1.25rem;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.4);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.5);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255, 0.2), transparent);
    transition: 0.5s;
  }
  
  &:hover::after {
    left: 100%;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1.25rem 2rem;
    font-size: 1.1rem;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background: var(--btn-secondary-bg);
  backdrop-filter: blur(10px);
  color: var(--btn-secondary-text);
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--btn-secondary-border);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 1);
    color: var(--primary);
    transform: translateY(-4px) scale(1.02);
    border-color: transparent;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 10px 20px -5px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1.25rem 1.5rem;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.05);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const JLPTButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background: rgba(0, 212, 255, 0.05);
  backdrop-filter: blur(10px);
  color: #00d4ff;
  font-weight: 800;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0, 212, 255, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #00d4ff;
    border-radius: 50%;
    margin-right: 0.6rem;
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    transition: all 0.4s ease;
  }

  &:hover {
    background: #00d4ff;
    color: white;
    transform: translateY(-4px) scale(1.02);
    border-color: transparent;
    box-shadow: 0 0 25px rgba(0, 212, 255, 0.4), 0 10px 20px -5px rgba(0, 0, 0, 0.1);
    
    &::before {
      background-color: white;
      box-shadow: 0 0 10px white;
    }
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1.25rem 1.5rem;
    font-size: 1rem;
  }
`;

interface HeroSectionProps {
  isDailyCompleted: boolean;
}

export function HeroSection({ isDailyCompleted }: HeroSectionProps) {
  return (
    <Section>
      <Title>
        Master Japanese <br />
        <span>Kanji & Kana</span>
      </Title>
      <Subtitle>
        The most effective way to learn, practice, and memorize Japanese characters.
        Start your journey to fluency today.
      </Subtitle>
      <ButtonGroup>
        <PrimaryButton href="/kana">Hiragana & Katakana</PrimaryButton>
        <JLPTButton href="/jlpt">JLPT</JLPTButton>
        <SecondaryButton href="/kanji">Browse Kanji</SecondaryButton>
        <SecondaryButton href="/materi">Materi</SecondaryButton>
        <SecondaryButton href="/practice">Start Practicing</SecondaryButton>
        <SecondaryButton 
          href="/daily-quiz" 
          style={{ 
            borderColor: isDailyCompleted ? 'var(--border)' : '#10b981', 
            color: isDailyCompleted ? 'var(--text-secondary)' : '#10b981',
            opacity: isDailyCompleted ? 0.8 : 1
          }}
        >
          {isDailyCompleted ? '✓ Daily Quiz Done' : 'Daily Quiz'}
        </SecondaryButton>
      </ButtonGroup>
    </Section>
  );
}
