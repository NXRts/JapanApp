'use client';

import { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import dynamic from 'next/dynamic';
import { useProgress } from '@/context/ProgressContext';
import { useDeviceMode } from '@/context/DeviceModeContext';
import { RoadmapNodeDrawer } from '@/components/home/RoadmapNodeDrawer';
import { LessonIcon, CheckIcon } from '@/components/home/LessonIcon';
import { lessonsData, Lesson } from '@/data/lessonsData';

// Immediate imports for above-the-fold content
import { HeroSection } from '@/components/home/HeroSection';
import { GamesSection } from '@/components/home/GamesSection';

// Dynamic imports for below-the-fold components to improve initial load
const BenefitsSection = dynamic(() => import('@/components/home/BenefitsSection').then(mod => mod.BenefitsSection), { ssr: false });
const WhatsNewSection = dynamic(() => import('@/components/home/WhatsNewSection').then(mod => mod.WhatsNewSection), { ssr: false });
const FeaturesSection = dynamic(() => import('@/components/home/FeaturesSection').then(mod => mod.FeaturesSection), { ssr: false });
const StepsSection = dynamic(() => import('@/components/home/StepsSection').then(mod => mod.StepsSection), { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection').then(mod => mod.TestimonialsSection), { ssr: false });
const FAQSection = dynamic(() => import('@/components/home/FAQSection').then(mod => mod.FAQSection), { ssr: false });
const CTASection = dynamic(() => import('@/components/home/CTASection').then(mod => mod.CTASection), { ssr: false });

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-bottom: 2rem;
`;

const MobileContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 1rem 6rem;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  font-family: 'Nunito', 'Outfit', sans-serif;
`;

// Level Selector Styles
const LevelSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1.75rem;
  padding: 6px 4px;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const LevelTab = styled.button<{ $active: boolean; $activeColor: string }>`
  flex: 1;
  min-width: 80px;
  height: 44px;
  border-radius: 16px;
  border: 2px solid ${({ $active, $activeColor }) => ($active ? $activeColor : 'var(--border)')};
  border-bottom: 4px solid ${({ $active, $activeColor }) => ($active ? $activeColor : 'rgba(0, 0, 0, 0.15)')};
  background: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.02)' : 'var(--surface)')};
  color: ${({ $active, $activeColor }) => ($active ? $activeColor : 'var(--text-secondary)')};
  font-weight: 800;
  font-size: 0.88rem;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  outline: none;
  white-space: nowrap;
  box-shadow: ${({ $active }) => ($active ? '0 4px 12px rgba(0, 0, 0, 0.12)' : 'none')};

  ${({ $active, $activeColor }) => $active && css`
    background: ${$activeColor}15; /* Transparent overlay matching level color */
    text-shadow: 0 0 8px ${$activeColor}20;
  `}

  @media (prefers-color-scheme: light) {
    border-bottom-color: ${({ $active, $activeColor }) => ($active ? $activeColor : 'rgba(0, 0, 0, 0.08)')};
  }

  &:hover {
    ${({ $active }) => !$active && css`
      border-color: var(--text-secondary);
      color: var(--foreground);
    `}
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

const UnitCard = styled.div<{ $color?: string }>`
  background: ${({ $color }) => $color || 'linear-gradient(135deg, #10b981 0%, #059669 100%)'};
  border-radius: 24px;
  padding: 1.5rem;
  color: white;
  margin-bottom: 2.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  border-bottom: 6px solid rgba(0, 0, 0, 0.2);
`;

const UnitHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;
  z-index: 2;
`;

const UnitBadge = styled.span`
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
  width: fit-content;
`;

const UnitTitle = styled.h2`
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.3;
  margin-top: 0.25rem;
`;

const UnitDesc = styled.p`
  font-size: 0.85rem;
  opacity: 0.9;
  margin-top: 0.25rem;
`;

const RoadmapPath = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 1rem 0;
  margin-bottom: 2.5rem;
`;

const PathLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 8px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 99px;
  transform: translateX(-4px);
  z-index: 0;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.6);

  /* Glowing vertical tracking dash */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 2px;
    width: 4px;
    background: repeating-linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0.15) 12px,
      transparent 12px,
      transparent 24px
    );
  }

  @media (prefers-color-scheme: light) {
    background: rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    &::after {
      background: repeating-linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.08),
        rgba(0, 0, 0, 0.08) 12px,
        transparent 12px,
        transparent 24px
      );
    }
  }
`;

const NodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.5rem 0;
  position: relative;
  z-index: 1;
`;

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0px var(--pulse-color), 0 8px 24px rgba(0, 0, 0, 0.35);
  }
  70% {
    box-shadow: 0 0 0 14px rgba(255, 255, 255, 0), 0 8px 24px rgba(0, 0, 0, 0.35);
  }
  100% {
    box-shadow: 0 0 0 0px rgba(255, 255, 255, 0), 0 8px 24px rgba(0, 0, 0, 0.35);
  }
`;

const floatingNode = keyframes`
  0% {
    transform: translateX(var(--offset-px)) translateY(0px);
  }
  50% {
    transform: translateX(var(--offset-px)) translateY(-5px);
  }
  100% {
    transform: translateX(var(--offset-px)) translateY(0px);
  }
`;

const NodeButton = styled.button<{ 
  $unlocked: boolean; 
  $active: boolean; 
  $completed: boolean; 
  $color: string; 
  $offset: number 
}>`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $unlocked }) => ($unlocked ? 'pointer' : 'not-allowed')};
  transform: translateX(${({ $offset }) => $offset}px);
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  border: none;
  outline: none;
  
  /* Glowing / tactile properties depending on state */
  ${({ $unlocked, $active, $completed, $color }) => {
    if (!$unlocked) {
      return css`
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        border: 2px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        opacity: 0.65;
        
        @media (prefers-color-scheme: light) {
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
          border: 2px solid rgba(0, 0, 0, 0.06);
          opacity: 0.75;
        }
      `;
    }

    if ($active) {
      // Current active node - high pulse, full vivid color
      return css`
        background: radial-gradient(circle at center, ${$color} 0%, ${$color}dd 100%);
        border: 3px solid #ffffff;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.2);
        --pulse-color: ${$color}80;
        z-index: 10;
        
        /* Floating and pulsing animations combined */
        animation: ${pulseGlow} 2s infinite ease-in-out, ${floatingNode} 3s infinite ease-in-out;
      `;
    }

    if ($completed) {
      // Completed node - luxurious dark orb with glowing boundary ring matching level color
      return css`
        background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
        border: 3px solid ${$color};
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25), 0 0 12px ${$color}40, inset 0 2px 4px rgba(255, 255, 255, 0.1);
        
        @media (prefers-color-scheme: light) {
          background: radial-gradient(circle at center, #ffffff 0%, #f1f5f9 100%);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1), 0 0 10px ${$color}30, inset 0 2px 4px rgba(255, 255, 255, 0.8);
        }
      `;
    }

    // Unlocked but not active and not completed
    return css`
      background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
      border: 3px solid ${$color}aa;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.1);
      
      @media (prefers-color-scheme: light) {
        background: radial-gradient(circle at center, #ffffff 0%, #f8fafc 100%);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.8);
      }
    `;
  }}

  /* Hover scale up slightly */
  &:hover {
    ${({ $unlocked }) =>
      $unlocked &&
      css`
        transform: translateX(var(--offset-px)) scale(1.08) translateY(-2px);
        filter: brightness(1.1);
      `}
  }

  /* 3D mechanical active click */
  &:active {
    ${({ $unlocked }) =>
      $unlocked &&
      css`
        transform: translateX(var(--offset-px)) scale(0.96) translateY(2px);
        transition: all 0.05s ease;
      `}
  }
`;

const NodeLabel = styled.div<{ $offset: number }>`
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--foreground);
  margin-top: 0.65rem;
  transform: translateX(${({ $offset }) => $offset}px);
  
  /* Glassmorphism capsule */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  padding: 5px 14px;
  border-radius: 99px;
  max-width: 150px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.2s ease;

  @media (prefers-color-scheme: light) {
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const CompletedBadge = styled.div<{ $color: string }>`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #10b981;
  border: 2px solid var(--background);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3), 0 0 6px rgba(16, 185, 129, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;

  @keyframes popIn {
    from { transform: scale(0); }
    to { transform: scale(1); }
  }
`;



const StatBanner = styled.div`
  display: flex;
  justify-content: space-around;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
`;

const StatBannerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
  font-size: 0.9rem;
`;

const LockBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
`;

interface SelectedNodeData {
  title: string;
  description: string;
  expReward: number;
  href: string;
  icon: string;
  badge?: string;
  color?: string;
}

export default function Home() {
  const { progress } = useProgress();
  const { deviceMode, isMounted } = useDeviceMode();
  const [mounted, setMounted] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SelectedNodeData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('N5');

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Level config with custom colors
  const levels = [
    { code: 'N5' as const, label: 'JLPT N5', color: '#10b981' }, // Emerald
    { code: 'N4' as const, label: 'JLPT N4', color: '#8b5cf6' }, // Violet
    { code: 'N3' as const, label: 'JLPT N3', color: '#ea580c' }, // Orange
    { code: 'N2' as const, label: 'JLPT N2', color: '#3b82f6' }, // Blue
    { code: 'N1' as const, label: 'JLPT N1', color: '#dc2626' }  // Red
  ];

  const activeLevelColor = levels.find(l => l.code === selectedLevel)?.color || '#10b981';

  // Group lessons from lessonsData by unitId for the active selectedLevel
  const levelLessons = lessonsData.filter(lesson => lesson.level === selectedLevel);
  
  const unitsMap: Record<string, { id: string; title: string; description: string; color: string; lessons: typeof levelLessons }> = {};
  
  levelLessons.forEach(lesson => {
    if (!unitsMap[lesson.unitId]) {
      unitsMap[lesson.unitId] = {
        id: lesson.unitId,
        title: lesson.unitTitle,
        description: lesson.unitDescription,
        color: lesson.unitColor,
        lessons: []
      };
    }
    unitsMap[lesson.unitId].lessons.push(lesson);
  });

  const activeUnits = Object.values(unitsMap);

  // Verification logic: A lesson is unlocked if it is the first N5 lesson or if the previous lesson in lessonsData is completed
  const isLessonUnlocked = (lessonId: string) => {
    if (lessonId === 'n5-u1-l1') return true;
    
    const idx = lessonsData.findIndex(l => l.id === lessonId);
    if (idx <= 0) return true;
    
    const prevLesson = lessonsData[idx - 1];
    return progress.completedExercises?.includes(prevLesson.id);
  };

  const today = new Date().toISOString().split('T')[0];
  const isDailyCompleted = progress.quizHistory.some(
    q => q.date.split('T')[0] === today && q.type === 'daily-challenge'
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Japan Learning App",
    "url": "https://japan-app.vercel.app",
    "description": "The most effective way to learn, practice, and memorize Japanese characters (Hiragana, Katakana, and Kanji).",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "author": {
      "@type": "Person",
      "name": "NXRts"
    }
  };

  if (!mounted) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Container>
          <HeroSection isDailyCompleted={false} />
        </Container>
      </>
    );
  }

  // Serpentine offset pattern: Center, Right, Left, Center...
  const getOffset = (index: number) => {
    const pattern = [0, 42, -42, 0];
    return pattern[index % pattern.length];
  };

  const handleNodeClick = (lesson: Lesson, unlocked: boolean) => {
    if (!unlocked) return;
    setSelectedNode({
      title: lesson.title,
      description: lesson.description,
      expReward: lesson.expReward,
      href: `/lesson?id=${lesson.id}`,
      icon: lesson.icon,
      badge: lesson.badge,
      color: lesson.unitColor
    });
    setIsDrawerOpen(true);
  };

  if (isMounted && deviceMode === 'mobile') {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MobileContainer>
          {/* Top stats banner */}
          <StatBanner>
            <StatBannerItem title="Total Experience Points">
              ⭐ <span style={{ color: '#eab308' }}>{progress.exp} EXP</span>
            </StatBannerItem>
            <StatBannerItem title="Daily Challenge Status">
              🎯 <span style={{ color: isDailyCompleted ? '#10b981' : 'var(--text-secondary)' }}>
                {isDailyCompleted ? 'Daily Done!' : 'Daily Pending'}
              </span>
            </StatBannerItem>
          </StatBanner>

          {/* Level Tab Bar Selector */}
          <LevelSelector>
            {levels.map(level => (
              <LevelTab
                key={level.code}
                $active={selectedLevel === level.code}
                $activeColor={level.color}
                onClick={() => setSelectedLevel(level.code)}
              >
                {level.label}
              </LevelTab>
            ))}
          </LevelSelector>

          {/* Locked indicators warnings */}
          {levelLessons.length === 0 && (
            <LockBanner>
              📭 Belum ada materi untuk level ini.
            </LockBanner>
          )}

          {/* Render Units */}
          {activeUnits.map((unit) => (
            <div key={unit.id}>
              <UnitCard $color={unit.color}>
                <UnitHeader>
                  <UnitBadge>Pelajaran Aktif</UnitBadge>
                  <UnitTitle>{unit.title}</UnitTitle>
                  <UnitDesc>{unit.description}</UnitDesc>
                </UnitHeader>
              </UnitCard>

              <RoadmapPath>
                <PathLine />
                {unit.lessons.map((lesson, index) => {
                  const offset = getOffset(index);
                  const isUnlocked = isLessonUnlocked(lesson.id);
                  const isCompleted = progress.completedExercises?.includes(lesson.id) || false;
                  const isActive = isUnlocked && !isCompleted;
                  const levelColor = levels.find(l => l.code === selectedLevel)?.color || '#10b981';

                  return (
                    <NodeContainer key={lesson.id}>
                      <NodeButton
                        $unlocked={isUnlocked}
                        $active={isActive}
                        $completed={isCompleted}
                        $color={levelColor}
                        $offset={offset}
                        onClick={() => handleNodeClick(lesson, isUnlocked)}
                        title={lesson.title}
                        style={{ '--offset-px': `${offset}px` } as React.CSSProperties}
                      >
                        <LessonIcon
                          icon={lesson.icon}
                          badge={lesson.badge}
                          color={levelColor}
                          unlocked={isUnlocked}
                        />
                        {isUnlocked && isCompleted && (
                          <CompletedBadge $color={levelColor}>
                            <CheckIcon />
                          </CompletedBadge>
                        )}
                      </NodeButton>
                      <NodeLabel $offset={offset}>{lesson.title}</NodeLabel>
                    </NodeContainer>
                  );
                })}
              </RoadmapPath>
            </div>
          ))}

          {/* Node detail bottom drawer sheet */}
          <RoadmapNodeDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            nodeData={selectedNode}
          />
        </MobileContainer>
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <HeroSection isDailyCompleted={isDailyCompleted} />
        <GamesSection />
        <BenefitsSection />
        <WhatsNewSection />
        <FeaturesSection />
        <StepsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </Container>
    </>
  );
}
