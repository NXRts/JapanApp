'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { useProgress } from '@/context/ProgressContext';
import { useDeviceMode } from '@/context/DeviceModeContext';
import { RoadmapNodeDrawer } from '@/components/home/RoadmapNodeDrawer';
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
  padding: 4px 2px;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const LevelTab = styled.button<{ $active: boolean; $activeColor: string }>`
  flex: 1;
  min-width: 72px;
  padding: 0.65rem 0.5rem;
  border-radius: 16px;
  border: 2px solid ${({ $active, $activeColor }) => ($active ? $activeColor : 'var(--border)')};
  border-bottom-width: 5px;
  background: ${({ $active, $activeColor }) => ($active ? `rgba(${this}, 0.08)` : 'var(--surface)')};
  color: ${({ $active, $activeColor }) => ($active ? $activeColor : 'var(--text-secondary)')};
  font-weight: 800;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.1s ease;
  outline: none;
  white-space: nowrap;
  text-align: center;
  box-shadow: ${({ $active }) => ($active ? '0 4px 10px rgba(0, 0, 0, 0.06)' : 'none')};

  ${({ $active, $activeColor }) => $active && `
    background: ${$activeColor}15; /* Transparent overlay */
  `}

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
  width: 6px;
  border-left: 6px dashed rgba(255, 255, 255, 0.08);
  transform: translateX(-3px);
  z-index: 0;

  @media (prefers-color-scheme: light) {
    border-left-color: rgba(0, 0, 0, 0.08);
  }
`;

const NodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.25rem 0;
  position: relative;
  z-index: 1;
`;

const NodeButton = styled.button<{ $unlocked: boolean; $color?: string; $offset: number }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ $unlocked, $color }) => ($unlocked ? $color || 'var(--primary)' : 'var(--border)')};
  border: none;
  border-bottom: 6px solid ${({ $unlocked }) => ($unlocked ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.1)')};
  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $unlocked }) => ($unlocked ? 'pointer' : 'not-allowed')};
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  transform: translateX(${({ $offset }) => $offset}px);
  transition: all 0.1s ease;
  position: relative;

  &:active {
    ${({ $unlocked }) =>
      $unlocked &&
      `
      transform: translateX(var(--offset-px)) translateY(3px);
      border-bottom-width: 3px;
    `}
  }
`;

const NodeLabel = styled.div<{ $offset: number }>`
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--foreground);
  margin-top: 0.5rem;
  transform: translateX(${({ $offset }) => $offset}px);
  background: var(--surface);
  padding: 4px 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  max-width: 150px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
                  return (
                    <NodeContainer key={lesson.id}>
                      <NodeButton
                        $unlocked={isUnlocked}
                        $color={levels.find(l => l.code === selectedLevel)?.color}
                        $offset={offset}
                        onClick={() => handleNodeClick(lesson, isUnlocked)}
                        title={lesson.title}
                        style={{ '--offset-px': `${offset}px` } as React.CSSProperties}
                      >
                        {isUnlocked ? lesson.icon : '🔒'}
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
