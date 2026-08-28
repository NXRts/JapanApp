"use client";

import React, { useMemo } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useProgress } from "@/context/ProgressContext";
import { HeroSection } from "@/components/home/HeroSection";
import { GamesSection } from "@/components/home/GamesSection";

// Dynamic imports for below-the-fold components to optimize load times
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

export default function RootPage() {
  const { progress } = useProgress();

  const isDailyCompleted = useMemo(() => {
    if (!progress.quizHistory) return false;
    const today = new Date().toISOString().split("T")[0];
    return progress.quizHistory.some(
      (q) => q.date.split("T")[0] === today && q.type === "daily-challenge",
    );
  }, [progress.quizHistory]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Japan Learning App",
    url: "https://japan-mee.vercel.app",
    description:
      "The most effective way to learn, practice, and memorize Japanese characters (Hiragana, Katakana, and Kanji).",
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    author: {
      "@type": "Person",
      name: "NXRts",
    },
  };

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
