"use client";

import React, { useMemo } from "react";
import styled from "styled-components";
import { useProgress } from "@/context/ProgressContext";
import { HeroSection } from "@/components/home/HeroSection";
import { GamesSection } from "@/components/home/GamesSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { WhatsNewSection } from "@/components/home/WhatsNewSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { StepsSection } from "@/components/home/StepsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-bottom: 2rem;
  width: 100%;
`;

export function LandingPageView() {
  const { progress } = useProgress();

  const isDailyCompleted = useMemo(() => {
    if (!progress?.quizHistory) return false;
    const today = new Date().toISOString().split("T")[0];
    return progress.quizHistory.some(
      (q) => q.date?.split("T")[0] === today && q.type === "daily-challenge",
    );
  }, [progress?.quizHistory]);

  return (
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
  );
}
