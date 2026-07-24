"use client";

import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { CheckIcon } from "../icons/AppIcons";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.5rem 1.5rem 6rem;
  min-height: 100dvh;
  width: 100%;
  position: relative;
  gap: 3rem;

  @media (max-width: 768px) {
    padding: 5.5rem 1rem 3rem;
    min-height: auto;
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  color: var(--foreground);
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.03em;

  span {
    background: linear-gradient(
      135deg,
      var(--primary) 0%,
      var(--secondary) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 10px rgba(79, 70, 229, 0.2));
    display: inline-block;
    animation: ${float} 6s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.15;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin-bottom: 3rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    max-width: 440px;
    gap: 0.75rem;
    margin-bottom: 1.5rem;

    /* Force Daily Quiz button (last-child) to span full width */
    a:last-child {
      grid-column: span 2;
    }
  }
`;

const NavButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 2rem;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.95rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.8rem 1rem;
    font-size: 0.85rem;
  }
`;

const PrimaryButton = styled(NavButton)`
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark) 100%
  );
  color: white;
  box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.4);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.5);
  }
`;

const SecondaryButton = styled(NavButton)`
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--foreground);

  &:hover {
    background: var(--background);
    border-color: var(--primary-light);
    transform: translateY(-3px);
  }
`;

const SpecialtyButton = styled(NavButton)`
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.3);
  color: #00d4ff;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    background: #00d4ff;
    border-radius: 50%;
    margin-right: 0.6rem;
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  }

  &:hover {
    background: #00d4ff;
    color: white;
    transform: translateY(-3px);
    &::before {
      background: white;
    }
  }
`;

const StatsContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(var(--primary-rgb), 0.2);
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.75rem;
  }
`;

const StatNumber = styled.span`
  font-size: 2.75rem;
  font-weight: 900;
  color: var(--primary-light);
  line-height: 1;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 0;
  }
`;

const StatLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.15em;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

interface HeroSectionProps {
  isDailyCompleted: boolean;
}

const RoadmapButton = styled(PrimaryButton)`
  background: linear-gradient(
    135deg,
    #4338ca 0%,
    #059669 100%
  ); /* Indigo to Emerald/Teal */
  box-shadow: 0 10px 20px -5px rgba(5, 150, 105, 0.3);
  min-width: 220px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: linear-gradient(135deg, #4f46e5 0%, #10b981 100%);
    box-shadow: 0 15px 30px -5px rgba(16, 185, 129, 0.4);
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    grid-column: span 2;
    font-size: 0.9rem;
    padding: 0.9rem 1.5rem;
  }
`;

const MainPrimaryButton = styled(PrimaryButton)`
  min-width: 220px;

  @media (max-width: 768px) {
    grid-column: span 2;
    font-size: 0.9rem;
    padding: 0.9rem 1.5rem;
  }
`;

export function HeroSection({ isDailyCompleted }: HeroSectionProps) {
  return (
    <Section>
      <HeroContent>
        <Title>
          Master Japanese <br />
          <span>Kanji & Kana</span>
        </Title>
        <Subtitle>
          The most effective way to learn, practice, and memorize Japanese
          characters. Start your journey to fluency today.
        </Subtitle>

        <ButtonGroup>
          <RoadmapButton href="/learning">Learning Path</RoadmapButton>
          <MainPrimaryButton href="/kana">
            Hiragana & Katakana
          </MainPrimaryButton>
          <SpecialtyButton href="/jlpt">JLPT Challenge</SpecialtyButton>
          <SecondaryButton href="/kanji">Browse Kanji</SecondaryButton>
          <SecondaryButton href="/materi">Learning Material</SecondaryButton>
          <SecondaryButton href="/practice">Start Studying</SecondaryButton>
          <SecondaryButton
            href="/daily-quiz"
            style={{
              borderColor: isDailyCompleted ? "var(--border)" : "#10b981",
              color: isDailyCompleted ? "var(--text-secondary)" : "#10b981",
              opacity: isDailyCompleted ? 0.8 : 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            {isDailyCompleted ? (
              <>
                <CheckIcon size={18} /> Daily Quiz Done
              </>
            ) : (
              "Daily Quiz"
            )}
          </SecondaryButton>
        </ButtonGroup>
      </HeroContent>

      <StatsContainer>
        <StatItem>
          <StatNumber>2,136</StatNumber>
          <StatLabel>Joyo Kanji</StatLabel>
        </StatItem>
        <StatItem
          style={{
            borderColor: "rgba(var(--primary-rgb), 0.3)",
            boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.1)",
          }}
        >
          <StatNumber>JLPT</StatNumber>
          <StatLabel>N5 to N1 Ready</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>100%</StatNumber>
          <StatLabel>Interactive</StatLabel>
        </StatItem>
      </StatsContainer>
    </Section>
  );
}
