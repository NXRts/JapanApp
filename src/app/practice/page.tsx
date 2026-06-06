'use client';

import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { useProgress } from '@/context/ProgressContext';
import { lessonsData } from '@/data/lessonsData';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { useRouter } from 'next/navigation';

// ==========================================
// ANIMATIONS
// ==========================================
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const spinSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulseGlow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 10px rgba(79, 70, 229, 0.4)); }
  50% { filter: drop-shadow(0 0 22px rgba(79, 70, 229, 0.75)); }
`;

// ==========================================
// STYLED COMPONENTS
// ==========================================
const PageWrapper = styled.div`
  min-height: 90vh;
  background: radial-gradient(circle at top right, rgba(79, 70, 229, 0.03) 0%, transparent 60%);
  padding: 2rem 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 5rem; /* bottom padding for mobile navigation bar */
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-top: 1rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 850;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--foreground);
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.5;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-top: 1.5rem;
  }
`;

const PracticeCard = styled.div<{ $gradient?: string }>`
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 24px;
  padding: 2.25rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ $gradient }) => $gradient || 'none'};
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(var(--primary-rgb), 0.35);
    box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.12), 0 5px 15px -5px rgba(var(--primary-rgb), 0.1);

    .card-graphic-container {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 1.75rem 1.5rem;
    gap: 1.5rem;
    text-align: center;
  }
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--foreground);
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.75rem;
  max-width: 460px;
`;

const CardGraphic = styled.div`
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 1;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const ActionButton = styled.button<{ $color: string; $shadowColor: string }>`
  padding: 0.9rem 1.75rem;
  border-radius: 16px;
  font-size: 0.95rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  background: ${({ $color }) => $color};
  border-bottom: 4px solid ${({ $shadowColor }) => $shadowColor};
  color: #ffffff;
  transition: all 0.1s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &:hover:not(:disabled) {
    filter: brightness(1.08);
  }

  &:active:not(:disabled) {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }

  &:disabled {
    background: var(--border);
    border-bottom-color: rgba(0, 0, 0, 0.1);
    color: var(--text-secondary);
    cursor: not-allowed;
    box-shadow: none;
  }
`;

// ==========================================
// HIGH FIDELITY GRAPHIC SVGS (Branded, No mascot)
// ==========================================
const GlowingTargetSvg = styled.svg`
  width: 100%;
  height: 100%;
  animation: ${pulseGlow} 3s ease-in-out infinite;
`;

const FloatingGroup = styled.g`
  animation: ${float} 3s ease-in-out infinite;
`;

const FloatingHeadphonesSvg = styled.svg`
  width: 100%;
  height: 100%;
  animation: ${float} 3.5s ease-in-out infinite;
`;

const SpinningArrowsSvg = styled.svg`
  width: 100%;
  height: 100%;
  animation: ${spinSlow} 15s linear infinite;
`;

const TargetBoardSvg = () => (
  <GlowingTargetSvg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Target Board Stand */}
    <path d="M45 110L30 135M95 110L110 135M70 100V135" stroke="var(--border)" strokeWidth="4" strokeLinecap="round" />
    
    {/* Concentric rings (glowing neon gradients) */}
    {/* Outer circle */}
    <circle cx="70" cy="70" r="48" fill="var(--surface)" stroke="var(--border)" strokeWidth="3" />
    <circle cx="70" cy="70" r="40" fill="#F43F5E" fillOpacity="0.1" stroke="#F43F5E" strokeWidth="4" />
    
    {/* Middle circle */}
    <circle cx="70" cy="70" r="28" fill="var(--surface)" stroke="var(--border)" strokeWidth="3" />
    <circle cx="70" cy="70" r="20" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="4" />
    
    {/* Bullseye (Center) */}
    <circle cx="70" cy="70" r="8" fill="#4F46E5" />
    <circle cx="70" cy="70" r="4" fill="#818CF8" />

    {/* Target Arrows (Neon glow) */}
    <FloatingGroup>
      {/* Arrow 1 */}
      <line x1="88" y1="52" x2="68" y2="72" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" />
      <polygon points="66,74 74,72 68,66" fill="#4F46E5" />
      <path d="M88 52L96 44M86 54L94 46" stroke="#818CF8" strokeWidth="2.5" />
      
      {/* Arrow 2 */}
      <line x1="110" y1="40" x2="76" y2="66" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
      <polygon points="74,68 81,66 76,60" fill="#10B981" />
      <path d="M110 40L116 32M108 42L114 34" stroke="#34D399" strokeWidth="2.5" />
    </FloatingGroup>
  </GlowingTargetSvg>
);

const HeadphonesSvg = () => (
  <FloatingHeadphonesSvg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Headphone Arch */}
    <path d="M30 75C30 48.4 51.6 30 70 30C88.4 30 110 48.4 110 75" stroke="#818CF8" strokeWidth="7" strokeLinecap="round" />
    
    {/* Glowing secondary line */}
    <path d="M38 75C38 55 52 40 70 40C88 40 102 55 102 75" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 4" />

    {/* Earcups (Left & Right) */}
    {/* Left Earcup */}
    <rect x="22" y="70" width="16" height="30" rx="8" fill="#4F46E5" stroke="var(--border)" strokeWidth="2" />
    <rect x="20" y="75" width="4" height="20" rx="2" fill="#818CF8" />
    
    {/* Right Earcup */}
    <rect x="102" y="70" width="16" height="30" rx="8" fill="#4F46E5" stroke="var(--border)" strokeWidth="2" />
    <rect x="116" y="75" width="4" height="20" rx="2" fill="#818CF8" />

    {/* Neon Soundwaves */}
    <path d="M10 85C5 81 5 74 10 70" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
    <path d="M6 92C-2 87-2 78 6 73" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
    
    <path d="M130 85C135 81 135 74 130 70" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
    <path d="M134 92C142 87 142 78 134 73" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
  </FloatingHeadphonesSvg>
);

const SyncArrowsSvg = () => (
  <SpinningArrowsSvg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Glowing background circle */}
    <circle cx="70" cy="70" r="45" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.4" />
    
    {/* Arrow paths */}
    <path d="M35 70C35 50.7 50.7 35 70 35C83 35 94.4 42.1 100.5 52.5" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
    <path d="M105 70C105 89.3 89.3 105 70 105C57 105 45.6 97.9 39.5 87.5" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />

    {/* Arrow Tips */}
    <polygon points="103,55 93,52 101,45" fill="#F59E0B" />
    <polygon points="37,85 47,88 39,95" fill="#F59E0B" />
    
    {/* Inner decorative star/compass shape */}
    <polygon points="70,55 74,66 85,70 74,74 70,85 66,74 55,70 66,66" fill="#FBBF24" />
  </SpinningArrowsSvg>
);

// ==========================================
// CORE PRACTICE PAGE
// ==========================================
export default function PracticeHubPage() {
  const { progress } = useProgress();
  const router = useRouter();

  // Dynamic lesson calculations
  const practiceLessonId = useMemo(() => {
    if (progress.completedExercises && progress.completedExercises.length > 0) {
      const idx = Math.floor(Math.random() * progress.completedExercises.length);
      return progress.completedExercises[idx];
    }
    return 'n5-u1-l1';
  }, [progress.completedExercises]);

  const listeningLessonId = useMemo(() => {
    const audioLessons = lessonsData.filter((l) =>
      l.questions.some((q) => q.type === 'listening')
    );
    if (audioLessons.length > 0) {
      const idx = Math.floor(Math.random() * audioLessons.length);
      return audioLessons[idx].id;
    }
    return 'n5-u1-l1';
  }, []);

  // Mistakes logic
  const mistakesCount = useMemo(() => {
    if (!progress.mastery) return 0;
    return Object.values(progress.mastery).filter((m) => m.incorrect > 0).length;
  }, [progress.mastery]);

  return (
    <PageWrapper>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }]} current="Practice Hub" />
        
        <Header>
          <Title>Practice Hub</Title>
          <Subtitle>
            Target specific domains, test your listening retention, or review characters you found challenging.
          </Subtitle>
        </Header>

        {/* SECTION: TODAY'S REVIEW */}
        <SectionTitle>Daily Practice</SectionTitle>

        <PracticeCard $gradient="radial-gradient(circle, var(--primary) 0%, transparent 60%)">
          <CardContent>
            <CardTitle>Targeted Practice</CardTitle>
            <CardDescription>
              Strengthen weak spots in vocabulary and grammar cards from your completed lessons.
            </CardDescription>
            <ActionButton 
              $color="#1cb0f6" 
              $shadowColor="#1890d8"
              onClick={() => router.push(`/lesson?id=${practiceLessonId}&from=practice`)}
            >
              Start Practice (+20 EXP)
            </ActionButton>
          </CardContent>
          <CardGraphic className="card-graphic-container">
            <TargetBoardSvg />
          </CardGraphic>
        </PracticeCard>

        {/* SECTION: INTERACTIVE FOCUS */}
        <SectionTitle>Interactive Focus</SectionTitle>

        <PracticeCard $gradient="radial-gradient(circle, var(--primary) 0%, transparent 60%)">
          <CardContent>
            <CardTitle>Listening Comprehension</CardTitle>
            <CardDescription>
              Train your particles recognition and listening capabilities with audio quiz items.
            </CardDescription>
            <ActionButton 
              $color="#818cf8" 
              $shadowColor="#4f46e5"
              onClick={() => router.push(`/lesson?id=${listeningLessonId}&from=practice`)}
            >
              Practice Audio (+15 EXP)
            </ActionButton>
          </CardContent>
          <CardGraphic className="card-graphic-container">
            <HeadphonesSvg />
          </CardGraphic>
        </PracticeCard>

        {/* SECTION: COLLECTION */}
        <SectionTitle>Your Collection</SectionTitle>

        <PracticeCard $gradient="radial-gradient(circle, #f59e0b 0%, transparent 60%)">
          <CardContent>
            <CardTitle>Mistakes Review</CardTitle>
            <CardDescription>
              {mistakesCount > 0 
                ? `Review the ${mistakesCount} characters you got incorrect during quizzes to improve mastery.`
                : "No mistakes currently! Maintain your clean streak and continue practicing."}
            </CardDescription>
            <ActionButton 
              $color="#f59e0b" 
              $shadowColor="#d97706"
              disabled={mistakesCount === 0}
              onClick={() => router.push('/characters?practice=true')}
            >
              {mistakesCount > 0 ? `Review ${mistakesCount} Mistakes` : 'Zero Mistakes! 🔥'}
            </ActionButton>
          </CardContent>
          <CardGraphic className="card-graphic-container">
            <SyncArrowsSvg />
          </CardGraphic>
        </PracticeCard>

      </Container>
    </PageWrapper>
  );
}
