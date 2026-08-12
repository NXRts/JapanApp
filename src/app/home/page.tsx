"use client";

import React, { useMemo } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useProgress } from "@/context/ProgressContext";
import { HeroSection } from "@/components/home/HeroSection";
import { GamesSection } from "@/components/home/GamesSection";

const BenefitsSection = dynamic(
  () =>
    import("@/components/home/BenefitsSection").then(
      (mod) => mod.BenefitsSection,
    ),
  { ssr: false },
);
const WhatsNewSection = dynamic(
  () =>
    import("@/components/home/WhatsNewSection").then(
      (mod) => mod.WhatsNewSection,
    ),
  { ssr: false },
);
const FeaturesSection = dynamic(
  () =>
    import("@/components/home/FeaturesSection").then(
      (mod) => mod.FeaturesSection,
    ),
  { ssr: false },
);
const StepsSection = dynamic(
  () =>
    import("@/components/home/StepsSection").then((mod) => mod.StepsSection),
  { ssr: false },
);
const TestimonialsSection = dynamic(
  () =>
    import("@/components/home/TestimonialsSection").then(
      (mod) => mod.TestimonialsSection,
    ),
  { ssr: false },
);
const FAQSection = dynamic(
  () => import("@/components/home/FAQSection").then((mod) => mod.FAQSection),
  { ssr: false },
);
const CTASection = dynamic(
  () => import("@/components/home/CTASection").then((mod) => mod.CTASection),
  { ssr: false },
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-bottom: 2rem;
  width: 100%;
`;

export default function LandingHomePage() {
  const { progress } = useProgress();

  const isDailyCompleted = useMemo(() => {
    if (!progress.completedExercises) return false;
    const dailyLessons = [
      "hiragana-a",
      "hiragana-ka",
      "katakana-a",
      "n5-u1-numbers",
    ];
    return dailyLessons.every((id) =>
      progress.completedExercises.includes(id),
    );
  }, [progress.completedExercises]);

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
