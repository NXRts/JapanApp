"use client";

import styled from "styled-components";
import Link from "next/link";
import {
  BookIcon,
  SwordsIcon,
  SparklesIcon,
  ChartBarIcon,
} from "../icons/AppIcons";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
`;

const AccessCard = styled(Link)`
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 2rem;
  border-radius: 24px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-8px);
    background: var(--background);
    border-color: var(--primary-light);
    box-shadow: var(--shadow-lg);

    .icon-wrapper {
      background: var(--primary);
      color: white;
      transform: scale(1.1) rotate(5deg);
    }
  }
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--foreground);
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.5;
`;

const items = [
  {
    title: "Kana Master",
    description: "Learn Hiragana and Katakana from scratch with mnemonics.",
    icon: <SparklesIcon size={28} />,
    href: "/kana",
  },
  {
    title: "JLPT Prep",
    description: "Structured challenges for N5 to N1 proficiency levels.",
    icon: <SwordsIcon size={28} />,
    href: "/jlpt",
  },
  {
    title: "Kanji Library",
    description: "Browse 2,000+ Joyo Kanji with stroke orders and meanings.",
    icon: <BookIcon size={28} />,
    href: "/kanji",
  },
  {
    title: "Study Stats",
    description: "Track your progress and maintain your daily learning streak.",
    icon: <ChartBarIcon size={28} />,
    href: "/stats",
  },
];

export function QuickAccessGrid() {
  return (
    <Grid>
      {items.map((item) => (
        <AccessCard key={item.title} href={item.href}>
          <IconWrapper className="icon-wrapper">{item.icon}</IconWrapper>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </AccessCard>
      ))}
    </Grid>
  );
}
