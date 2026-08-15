"use client";

import styled from "styled-components";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const Section = styled.section`
  padding: 6rem 2rem;
  background: transparent;
  width: 100%;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionHeader = styled.div`
  max-width: 800px;
  margin: 0 auto 4rem;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

const Badge = styled(motion.span)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--foreground);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(135deg, var(--primary) 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const GamesGrid = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

const Card = styled(motion.create(Link))`
  background: var(--surface);
  padding: 2rem;
  border-radius: 24px;
  border: 1px solid var(--border);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  position: relative;
  transition:
    border-color 0.3s ease,
    background 0.3s ease;
  height: 100%;

  &:hover {
    border-color: rgba(var(--primary-rgb), 0.5);
    background: var(--background);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 20px;
  }
`;

const IconWrapper = styled.div<{ $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${({ $color }) => `rgba(${$color}, 0.1)`};
  color: ${({ $color }) => `rgb(${$color})`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.1) rotate(5deg);
  }

  svg {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    margin-bottom: 1rem;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const CardBadge = styled.span<{ $color: string }>`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  color: ${({ $color }) => `rgb(${$color})`};
  background: ${({ $color }) => `rgba(${$color}, 0.1)`};
  padding: 0.25rem 0.6rem;
  border-radius: 6px;

  @media (max-width: 768px) {
    top: 1.25rem;
    right: 1.25rem;
    font-size: 0.55rem;
    padding: 0.15rem 0.4rem;
  }
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const Description = styled.p`
  color: var(--text-secondary);
  line-height: 1.5;
  font-size: 0.95rem;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const LearnMore = styled.div<{ $color: string }>`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: ${({ $color }) => `rgb(${$color})`};
  opacity: 0.8;
  transition: gap 0.2s ease;

  ${Card}:hover & {
    gap: 0.75rem;
    opacity: 1;
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
    font-size: 0.8rem;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const features = [
  {
    title: "Match Pairs",
    description:
      "Test your memory speed by matching Japanese characters and their meanings in this exciting game.",
    href: "/match-pairs",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    color: "245, 158, 11", // Amber
    badge: "Popular",
    type: "Game",
  },
  {
    title: "Kanji Writer",
    description:
      "Master Kanji stroke order with our interactive writing tool. Get instant feedback on your form.",
    href: "/jlpt/kanji-writer",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    color: "16, 185, 129", // Emerald
    badge: "Essential",
    type: "Practice",
  },
  {
    title: "Conjugation Drills",
    description:
      "Speed up your grammar! Practice verb forms across different levels and difficulties.",
    href: "/game/conjugation",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <path d="M12 8h4" />
        <path d="M12 12h4" />
        <path d="M12 16h4" />
      </svg>
    ),
    color: "59, 130, 246", // Blue
    badge: "Advanced",
    type: "Drill",
  },
  {
    title: "Sentence Builder",
    description:
      "Construct complex Japanese sentences by dragging particles and words into place.",
    href: "/game/sentence-builder",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9" />
        <path d="M11 11v6" />
        <path d="M8 14h6" />
        <path d="M18 4l-6 6" />
      </svg>
    ),
    color: "139, 92, 246", // Violet
    badge: "New",
    type: "Skill",
  },
  {
    title: "Particle Master",
    description:
      "Learn the nuances of Japanese particles like は, が, に, and を in real-world contexts.",
    href: "/study/grammar-drills",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    color: "236, 72, 153", // Pink
    badge: "Tricky",
    type: "Drill",
  },
  {
    title: "Listening Lab",
    description:
      "Sharpen your ears with audio-based challenges. Listen and identify phrases or words.",
    href: "/study/listening",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
    color: "20, 184, 166", // Teal
    badge: "Audio",
    type: "Skill",
  },
  {
    title: "Smart Flashcards",
    description:
      "Our SRS algorithm tracks your progress and shows cards right when you need to review.",
    href: "/study/smart-flashcards",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: "99, 102, 241", // Indigo
    badge: "SRS",
    type: "Review",
  },
  {
    title: "Speed Typing",
    description:
      "Improve your reflexes! Type the correct Romaji mapping for Kana as fast as you can.",
    href: "/game/speed-typing",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
        <line x1="6" y1="8" x2="6" y2="8" />
        <line x1="10" y1="8" x2="10" y2="8" />
        <line x1="14" y1="8" x2="14" y2="8" />
        <line x1="18" y1="8" x2="18" y2="8" />
        <line x1="6" y1="12" x2="6" y2="12" />
        <line x1="10" y1="12" x2="10" y2="12" />
        <line x1="14" y1="12" x2="14" y2="12" />
        <line x1="18" y1="12" x2="18" y2="12" />
        <line x1="7" y1="16" x2="17" y2="16" />
      </svg>
    ),
    color: "239, 68, 68", // Red
    badge: "Reflex",
    type: "Game",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export function GamesSection() {
  return (
    <Section id="interactive-learning">
      <SectionHeader>
        <Badge
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Learning Made Fun
        </Badge>
        <SectionTitle
          as={motion.h2}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Interactive <span>Learning Hub</span>
        </SectionTitle>
        <SectionSubtitle
          as={motion.p}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Level up your Japanese skills through interactive activities designed
          to accelerate your understanding and memory.
        </SectionSubtitle>
      </SectionHeader>

      <GamesGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((feature, index) => (
          <Card
            key={index}
            href={feature.href}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <CardBadge $color={feature.color}>{feature.badge}</CardBadge>
            <IconWrapper $color={feature.color}>{feature.icon}</IconWrapper>
            <Title>{feature.title}</Title>
            <Description>{feature.description}</Description>
            <LearnMore $color={feature.color}>
              Start Now
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: "16px", height: "16px" }}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </LearnMore>
          </Card>
        ))}
      </GamesGrid>
    </Section>
  );
}
