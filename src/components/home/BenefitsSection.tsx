'use client';

import styled from 'styled-components';
import Image from 'next/image';

const Section = styled.section`
  padding: 6rem 2rem;
  background: var(--surface);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const BenefitsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BenefitContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BenefitItem = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
`;

const BenefitIcon = styled.div`
  min-width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15), rgba(var(--primary-rgb), 0.05));
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  margin-top: 5px;

  @media (max-width: 768px) {
    min-width: 60px;
    height: 60px;
    border-radius: 16px;
  }

  svg {
    width: 40px;
    height: 40px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
  }
`;

const BenefitText = styled.div`
  h3 {
    font-size: 1.35rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--foreground);
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.6;
    font-size: 1.05rem;
  }
`;

const BenefitsMapContainer = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  
  @media (max-width: 768px) {
    height: 250px;
    width: 100%;
    margin-top: 2rem;
  }
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

export function BenefitsSection() {
  return (
    <Section>
      <SectionTitle><span>Why Learn with Japan App?</span></SectionTitle>
      <BenefitsGrid>
        <BenefitContent>
          <BenefitItem>
            <BenefitIcon>
              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </BenefitIcon>
            <BenefitText>
              <h3>Scientific Retention (SRS)</h3>
              <p>Forget the forgetting curve. Our **SRS technology** ensures you memorize characters for life by predicting your brain's optimal review time.</p>
            </BenefitText>
          </BenefitItem>
          <BenefitItem>
            <BenefitIcon>
              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </BenefitIcon>
            <BenefitText>
              <h3>OCR & AI Dictionary</h3>
              <p>Found a word in the real world? Point your camera or draw it on our canvas. Our **AI tools** identify characters instantly.</p>
            </BenefitText>
          </BenefitItem>
          <BenefitItem>
            <BenefitIcon>
              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </BenefitIcon>
            <BenefitText>
              <h3>Gamified Career Paths</h3>
              <p>Open career doors by mastering JLPT. Earn **EXP**, climb ranks, and prepare for the job market with our professional resources.</p>
            </BenefitText>
          </BenefitItem>
        </BenefitContent>
        <BenefitsMapContainer>
          <Image
            src="/jp.svg"
            alt="Map of Japan"
            fill
            style={{ objectFit: 'contain', padding: '2rem', opacity: 0.8 }}
          />
          <div style={{ position: 'absolute', bottom: '2rem', textAlign: 'center', width: '100%', zIndex: 2 }}>
            <p style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--foreground)', textShadow: '0 2px 4px var(--surface)' }}>Your Gateway</p>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>to Japanese Fluency</p>
          </div>
        </BenefitsMapContainer>
      </BenefitsGrid>
    </Section>
  );
}
