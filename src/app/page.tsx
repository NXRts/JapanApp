'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { useProgress } from '@/context/ProgressContext';

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

import { useDeviceMode } from '@/context/DeviceModeContext';
import { RoadmapNodeDrawer } from '@/components/home/RoadmapNodeDrawer';

interface LessonNode {
  id: string;
  title: string;
  description: string;
  expReward: number;
  href: string;
  icon: string;
  badge?: string;
  color?: string;
}

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
  margin-bottom: 1.5rem;
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
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
`;

const StatBannerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
  font-size: 0.9rem;
`;

export default function Home() {
  const { progress } = useProgress();
  const { deviceMode, isMounted } = useDeviceMode();
  const [mounted, setMounted] = useState(false);
  const [selectedNode, setSelectedNode] = useState<LessonNode | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

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

  // Duolingo Units Data
  const units = [
    {
      id: 'unit-1',
      title: 'Unit 1: Hiragana & Katakana Foundations 🎌',
      description: 'Master the basic Japanese sound systems & alphabets',
      color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      badgeColor: '#10b981',
      unlocked: true,
      lessons: [
        {
          id: 'lesson-1',
          title: 'Hiragana & Katakana Intro',
          description: 'Learn to write and identify basic kana characters using flashcards.',
          expReward: 20,
          href: '/study/kana-flashcards',
          icon: '🎌',
          badge: 'Materi Dasar'
        },
        {
          id: 'lesson-2',
          title: 'Kana Speed Typing',
          description: 'Type Romaji mappings for Kana characters under time pressure!',
          expReward: 30,
          href: '/game/speed-typing',
          icon: '⌨️',
          badge: 'Tantangan Ketik'
        },
        {
          id: 'lesson-3',
          title: 'Memory Match Game',
          description: 'Match Romaji with Katakana/Hiragana pairs in minimal moves.',
          expReward: 40,
          href: '/game/memory-match',
          icon: '🧠',
          badge: 'Tantangan Memori'
        }
      ]
    },
    {
      id: 'unit-2',
      title: 'Unit 2: Basic Vocabulary & Kanji 📝',
      description: 'Build your Japanese word library and core characters',
      color: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      badgeColor: '#8b5cf6',
      unlocked: progress.exp >= 100,
      lessons: [
        {
          id: 'lesson-4',
          title: 'Everyday Words',
          description: 'Study vocabulary across categories like food, family, and directions.',
          expReward: 25,
          href: '/study/vocabulary',
          icon: '📖',
          badge: 'Kosa Kata'
        },
        {
          id: 'lesson-5',
          title: 'Sentence Construction',
          description: 'Arrange words in the correct SOV order to build perfect sentences.',
          expReward: 35,
          href: '/game/sentence-builder',
          icon: '🧩',
          badge: 'Penyusunan Kalimat'
        },
        {
          id: 'lesson-6',
          title: 'Core Kanji Practice',
          description: 'Learn meaning, stroke order, and readings for core JLPT N5 Kanji.',
          expReward: 40,
          href: '/study/kanji',
          icon: '✍️',
          badge: 'Menulis Kanji'
        }
      ]
    },
    {
      id: 'unit-3',
      title: 'Unit 3: Grammar & Conjugation 🔄',
      description: 'Unlock grammar structures and verb transformations',
      color: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
      badgeColor: '#ea580c',
      unlocked: progress.exp >= 300,
      lessons: [
        {
          id: 'lesson-7',
          title: 'Grammar Essentials',
          description: 'Study particle usages and fundamental sentence patterns.',
          expReward: 30,
          href: '/study/grammar-drills',
          icon: '📘',
          badge: 'Tata Bahasa'
        },
        {
          id: 'lesson-8',
          title: 'Verb Conjugation Drills',
          description: 'Conjugate verbs into Te, Masu, Past, and negative forms in real-time!',
          expReward: 45,
          href: '/game/conjugation',
          icon: '🔄',
          badge: 'Konjugasi Verba'
        },
        {
          id: 'lesson-9',
          title: 'Roleplay Conversational',
          description: 'Practice speaking aloud in real-world situational dialogues.',
          expReward: 50,
          href: '/study/speaking',
          icon: '🗣️',
          badge: 'Percakapan AI'
        }
      ]
    }
  ];

  // Serpentine offset pattern: Center, Right, Left, Center...
  const getOffset = (index: number) => {
    const pattern = [0, 45, -45, 0];
    return pattern[index % pattern.length];
  };

  const handleNodeClick = (lesson: LessonNode, unlocked: boolean) => {
    if (!unlocked) return;
    setSelectedNode(lesson);
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

          {/* Render Units */}
          {units.map((unit) => (
            <div key={unit.id}>
              <UnitCard $color={unit.color}>
                <UnitHeader>
                  <UnitBadge>
                    {unit.unlocked ? 'Tersedia' : 'Terkunci (Req. EXP)'}
                  </UnitBadge>
                  <UnitTitle>{unit.title}</UnitTitle>
                  <UnitDesc>{unit.description}</UnitDesc>
                </UnitHeader>
              </UnitCard>

              <RoadmapPath>
                <PathLine />
                {unit.lessons.map((lesson, index) => {
                  const offset = getOffset(index);
                  const isUnlocked = unit.unlocked;
                  return (
                    <NodeContainer key={lesson.id}>
                      <NodeButton
                        $unlocked={isUnlocked}
                        $color={unit.badgeColor}
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
