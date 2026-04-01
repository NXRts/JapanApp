'use client';

import styled, { keyframes } from 'styled-components';

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Section = styled.section`
  padding: 6rem 0;
  width: 100%;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.75rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 5rem;
  color: var(--foreground);
  padding: 0 2rem;
  
  span {
    position: relative;
    z-index: 1;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 5px;
      background: var(--primary);
      border-radius: 2px;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

const MarqueeContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    black 5%,
    black 95%,
    transparent 100%
  );
`;

const MarqueeTrack = styled.div`
  display: flex;
  gap: 2.5rem;
  width: fit-content;
  animation: ${scroll} 40s linear infinite;
  padding: 2rem 0;
  
  &:hover {
    animation-play-state: paused;
  }

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1rem 0;
  }
`;

const Card = styled.div`
  background: #0f172a; /* Solid Opaque Dark Background */
  padding: 2.5rem;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 480px;
  min-height: 320px;
  flex-shrink: 0;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  
  &:hover {
    transform: translateY(-10px);
    border-color: var(--primary-light);
    background: #1e293b;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 20px rgba(var(--primary-rgb), 0.1);
  }
  
  &::before {
    content: '“';
    position: absolute;
    top: 1rem;
    right: 2.5rem;
    font-size: 5rem;
    color: var(--primary);
    opacity: 0.1;
    font-family: serif;
    line-height: 1;
  }
  
  @media (max-width: 768px) {
    width: 280px;
    padding: 1.5rem;
    min-height: 250px;
  }
`;

const Rating = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 1.5rem;
  color: #fbbf24;
  font-size: 1.15rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const TestimonialText = styled.p`
  color: #e2e8f0;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  flex-grow: 1;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const Avatar = styled.div<{ $gradient: string }>`
  width: 52px;
  height: 52px;
  border-radius: 18px;
  background: ${props => props.$gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    font-size: 0.9rem;
  }
`;

const UserMeta = styled.div`
  h4 {
    font-size: 1.15rem;
    font-weight: 800;
    color: white;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
  
  span {
    font-size: 0.85rem;
    color: var(--text-secondary);
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 0.75rem;
    }
  }
`;

const VerifiedBadge = styled.span`
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  font-size: 0.65rem;
  padding: 2px 8px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 900;
`;

const testimonials = [
  {
    name: 'Sarah J.',
    role: 'JLPT N2 Candidate',
    initial: 'SJ',
    gradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
    text: "The AI Dictionary is a game changer. Being able to scan physical manga with the OCR feature saved me so much time. It's the most polished Japanese app I've used.",
    rating: 5
  },
  {
    name: 'Kenji W.',
    role: 'Beginner Learner',
    initial: 'KW',
    gradient: 'linear-gradient(135deg, #f43f5e, #fb923c)',
    text: "I mastered Hiragana and Katakana in less than 10 days! The interactive games made the characters stick in my mind much faster than traditional flashcards.",
    rating: 5
  },
  {
    name: 'Elena R.',
    role: 'Intermediate Student',
    initial: 'ER',
    gradient: 'linear-gradient(135deg, #10b981, #3b82f6)',
    text: "The SRS algorithm is spot-on. I used to forget Kanji all the time, but the smart review system ensures I'm only practicing when it's most effective for memory.",
    rating: 5
  },
  {
    name: 'Liam M.',
    role: 'JLPT N4 Student',
    initial: 'LM',
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    text: "Sentence Builder really helped me understand grammar nuances. It's rare to find an app that covers both vocabulary and sentence structure so well.",
    rating: 5
  }
];

export function TestimonialsSection() {
  const repeatedTestimonials = [...testimonials, ...testimonials];

  return (
    <Section>
      <SectionTitle><span>Community Stories</span></SectionTitle>
      <MarqueeContainer>
        <MarqueeTrack>
          {repeatedTestimonials.map((t, i) => (
            <Card key={i}>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <Rating>{'★'.repeat(t.rating)}</Rating>
                  <TestimonialText>&ldquo;{t.text}&rdquo;</TestimonialText>
                </div>
                <UserInfo>
                  <Avatar $gradient={t.gradient}>{t.initial}</Avatar>
                  <UserMeta>
                    <h4>
                      {t.name} <VerifiedBadge>Verified</VerifiedBadge>
                    </h4>
                    <span>{t.role}</span>
                  </UserMeta>
                </UserInfo>
              </div>
            </Card>
          ))}
        </MarqueeTrack>
      </MarqueeContainer>
    </Section>
  );
}
