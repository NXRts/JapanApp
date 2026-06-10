"use client";

import { useState } from "react";
import styled from "styled-components";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import {
  SparklesIcon,
  GraduationIcon,
  BookIcon,
  LightBulbIcon,
  FireIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from "@/components/icons/AppIcons";

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(
    135deg,
    var(--foreground) 0%,
    var(--text-secondary) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
  gap: 1rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 2rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1rem;
  border: 2px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  background: ${({ $active }) =>
    $active ? "rgba(var(--primary-rgb), 0.1)" : "var(--surface)"};
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary);
    color: var(--primary);
    box-shadow: 0 10px 20px -5px rgba(var(--primary-rgb), 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    border-color: var(--primary);
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at top right,
      rgba(var(--primary-rgb), 0.05),
      transparent 60%
    );
    pointer-events: none;
  }
`;

const IconBox = styled.div<{ $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);

  svg {
    width: 28px;
    height: 28px;
    stroke-width: 2.5;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--foreground);
`;

const Description = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 2rem;
  flex-grow: 1;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--primary);
  background: rgba(var(--primary-rgb), 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  align-self: flex-start;
  margin-bottom: 1rem;
`;

interface Tip {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  tag: string;
}

const beginnerTips: Tip[] = [
  {
    id: 1,
    tag: "Priority #1",
    title: "Master Kana First",
    description:
      "Drop Romaji as soon as possible. Spend the first week only on Hiragana and Katakana. It forces your brain to recognize the real structure of Japanese sounds.",
    icon: <BookIcon />,
    color: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
  },
  {
    id: 2,
    tag: "Technique",
    title: "Use Mnemonics for Kanji",
    description:
      "Don't just write Kanji 100 times. Use associations (Heisig Method). Link each component (radical) to a story. It stays in your memory much longer.",
    icon: <SparklesIcon />,
    color: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
  },
  {
    id: 3,
    tag: "Grammar",
    title: "Focus on Particles",
    description:
      "The biggest hurdle for beginners is 'wa', 'ga', 'ni', and 'de'. Master these early, and complex sentences will start making sense much faster.",
    icon: <GraduationIcon />,
    color: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
  },
  {
    id: 4,
    tag: "Habit",
    title: "Consistent Daily Quiz",
    description:
      "Spend 10 minutes every single day rather than 2 hours once a week. Your brain needs repetitive exposure to move data into long-term memory.",
    icon: <FireIcon />,
    color: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
  },
];

const advancedTips: Tip[] = [
  {
    id: 5,
    tag: "Immersion",
    title: "Shadowing Technique",
    description:
      "Listen to a native speaker and repeat immediately after them (0.5s delay). This improves your pitch accent, rhythm, and natural speaking speed immensely.",
    icon: <ChartBarIcon />,
    color: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
  },
  {
    id: 6,
    tag: "Resources",
    title: "Monolingual Dictionary",
    description:
      "Switch to J-J dictionaries (Goo, Kotobank) for higher level Kanji. Stop translating and start understanding Japanese through Japanese definitions.",
    icon: <BookIcon />,
    color: "linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)",
  },
  {
    id: 7,
    tag: "Context",
    title: "Sentence Mining",
    description:
      "Don't learn individual words. Learn whole sentences from the anime, books, or news you consume. Context is everything for nuance (Nuancing).",
    icon: <LightBulbIcon />,
    color: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
  },
  {
    id: 8,
    tag: "Expertise",
    title: "Yojijukugo (Idioms)",
    description:
      "Start learning 4-character idioms. They are widely used in formal settings and literature. It marks the transition from 'Fluent' to 'Highly Literate'.",
    icon: <GraduationIcon />,
    color: "linear-gradient(135deg, #db2777 0%, #f472b6 100%)",
  },
];

export default function TipsPage() {
  const [activeLevel, setActiveLevel] = useState<"beginner" | "advanced">(
    "beginner",
  );
  const tips = activeLevel === "beginner" ? beginnerTips : advancedTips;

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Materials", href: "/materi" },
        ]}
        current="Tips & Tricks"
      />
      <Header>
        <Title>Language Mastery Hub</Title>
        <Subtitle>
          Curated professional strategies to accelerate your Japanese learning
          journey, from your first Hiragana to native-level literacy.
        </Subtitle>
      </Header>

      <ToggleContainer>
        <TabButton
          $active={activeLevel === "beginner"}
          onClick={() => setActiveLevel("beginner")}
        >
          Beginner Track
        </TabButton>
        <TabButton
          $active={activeLevel === "advanced"}
          onClick={() => setActiveLevel("advanced")}
        >
          Advanced Track
        </TabButton>
      </ToggleContainer>

      <Grid>
        {tips.map((tip) => (
          <Card key={tip.id}>
            <IconBox $color={tip.color}>{tip.icon}</IconBox>
            <Tag>{tip.tag}</Tag>
            <CardTitle>{tip.title}</CardTitle>
            <Description>{tip.description}</Description>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
