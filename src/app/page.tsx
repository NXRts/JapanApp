'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { useProgress } from '@/context/ProgressContext';

// Immediate imports for above-the-fold content
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
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

export default function Home() {
  const { progress } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <HeroSection isDailyCompleted={isDailyCompleted} />
        <StatsSection />
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
