"use client";

import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const waveMove = keyframes`
  from { background-position: 0 0; }
  to { background-position: 240px 120px; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  overflow-x: hidden;
`;

const ValuesSection = styled.section`
  position: relative;
  padding: 8rem 2rem;
  background: var(--background);
  width: 100vw;
  margin-left: calc(50% - 50vw);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);

  @media (max-width: 768px) {
    padding: 3.5rem 1rem;
  }
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem 1rem 6rem;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(79, 70, 229, 0.05) 0%,
    transparent 70%
  );
  position: relative;

  @media (max-width: 768px) {
    padding: 4.5rem 1rem 3rem;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  color: var(--foreground);
  margin-bottom: 0.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  animation: ${fadeIn} 0.8s ease-out;

  span {
    background: linear-gradient(
      135deg,
      var(--primary) 0%,
      var(--secondary) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 10px rgba(79, 70, 229, 0.2));
  }
`;

const JpTitle = styled.div`
  font-family: "Noto Sans JP", sans-serif;
  font-size: 1.5rem;
  color: var(--primary);
  font-weight: 500;
  margin-bottom: 2rem;
  opacity: 0.8;
  letter-spacing: 0.2em;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
`;

const HeroImageWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border);
  animation: ${fadeIn} 1.2s ease-out;
  position: relative;
  aspect-ratio: 16/9;

  img {
    object-fit: cover;
  }

  @media (max-width: 768px) {
    margin: 1.5rem auto;
    border-radius: 16px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 700px;
  margin-bottom: 2.5rem;
  line-height: 1.8;
  animation: ${fadeIn} 1.4s ease-out;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.75rem;
    line-height: 1.6;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto 4rem;
  width: 100%;
  padding: 0 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 1.5rem;
    margin-bottom: 3rem;
  }
`;

const StatCard = styled.div`
  background: var(--surface);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid var(--border);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary-light);
  }

  .value {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }

  .label {
    color: var(--text-secondary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    border-radius: 16px;
    max-width: 340px;
    width: 100%;
    margin: 0 auto;

    .value {
      font-size: 2rem;
      margin-bottom: 0.25rem;
    }

    .label {
      font-size: 0.75rem;
      letter-spacing: 0.03em;
    }
  }
`;

const ContentSection = styled.section`
  padding: 8rem 2rem;
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  position: relative;
  z-index: 1;
  width: 100vw;
  margin-left: calc(50% - 50vw);

  & > div {
    max-width: 1000px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    padding: 3.5rem 1rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const BlockTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--foreground);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 4px;
    background: var(--primary);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
`;

const BlockParagraph = styled.p`
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1.15rem;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 1rem;

  span {
    color: var(--primary);
  }

  @media (max-width: 768px) {
    font-size: 1.85rem;
  }
`;

const SectionSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    gap: 1.25rem;
  }
`;

interface ValueIconProps {
  $variant?: "primary" | "secondary" | "accent";
}

const ValueCard = styled.div<ValueIconProps>`
  padding: 3.5rem 2.5rem;
  background: var(--surface);
  border-radius: 28px;
  border: 1px solid var(--border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
    border-color: ${(props) =>
      props.$variant === "secondary"
        ? "var(--secondary)"
        : props.$variant === "accent"
          ? "var(--accent)"
          : "var(--primary)"};
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${(props) =>
      props.$variant === "secondary"
        ? "var(--secondary)"
        : props.$variant === "accent"
          ? "var(--accent)"
          : "var(--primary)"};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  .icon {
    width: 60px;
    height: 60px;
    background: ${(props) => {
      const rgb =
        props.$variant === "secondary"
          ? "var(--secondary-rgb)"
          : props.$variant === "accent"
            ? "var(--accent-rgb)"
            : "var(--primary-rgb)";
      return `linear-gradient(135deg, rgba(${rgb}, 0.15), rgba(${rgb}, 0.05))`;
    }};
    border: 1px solid
      ${(props) => {
        const rgb =
          props.$variant === "secondary"
            ? "var(--secondary-rgb)"
            : props.$variant === "accent"
              ? "var(--accent-rgb)"
              : "var(--primary-rgb)";
        return `rgba(${rgb}, 0.1)`;
      }};
    color: ${(props) =>
      props.$variant === "secondary"
        ? "var(--secondary)"
        : props.$variant === "accent"
          ? "var(--accent)"
          : "var(--primary)"};
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    box-shadow: 0 8px 16px -4px
      ${(props) => {
        const rgb =
          props.$variant === "secondary"
            ? "var(--secondary-rgb)"
            : props.$variant === "accent"
              ? "var(--accent-rgb)"
              : "var(--primary-rgb)";
        return `rgba(${rgb}, 0.1)`;
      }};

    svg {
      width: 28px;
      height: 28px;
    }
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    color: var(--foreground);
  }

  p {
    color: var(--text-secondary);
    line-height: 1.7;
    font-size: 1.05rem;
  }

  @media (max-width: 768px) {
    padding: 1.75rem 1.25rem;
    border-radius: 20px;

    .icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      margin-bottom: 1.25rem;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    h3 {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
`;

const JourneySection = styled.section`
  padding: 5rem 2rem 2rem;
  border-top: 1px solid var(--border);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 3.5rem 1rem 1.5rem;
  }
`;

const Timeline = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border);
  }

  @media (min-width: 768px) {
    &::before {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @media (max-width: 768px) {
    &::before {
      left: 10px;
    }
  }
`;

interface TimelineItemProps {
  $side: "left" | "right";
}

const TimelineItem = styled.div<TimelineItemProps>`
  margin-bottom: 3rem;
  position: relative;
  padding-left: 50px;

  @media (min-width: 768px) {
    padding-left: 0;
    width: 50%;
    margin-left: ${(props) => (props.$side === "right" ? "50%" : "0")};
    padding-left: ${(props) => (props.$side === "right" ? "40px" : "0")};
    padding-right: ${(props) => (props.$side === "left" ? "40px" : "0")};
    text-align: ${(props) => (props.$side === "left" ? "right" : "left")};
  }

  &::after {
    content: "";
    position: absolute;
    left: 21px;
    top: 0;
    width: 22px;
    height: 22px;
    background: var(--background);
    border: 4px solid var(--accent);
    border-radius: 50%;
    z-index: 10;
    transform: translateX(-50%);
    box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.25);
  }

  @media (min-width: 768px) {
    &::after {
      left: ${(props) => (props.$side === "right" ? "0" : "100%")};
      right: auto;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    padding-left: 32px;

    &::after {
      left: 10px;
      width: 14px;
      height: 14px;
      border-width: 3px;
    }

    .content {
      padding: 1rem;
      border-radius: 12px;

      h4 {
        font-size: 1rem;
        margin-bottom: 0.25rem;
      }

      p {
        font-size: 0.85rem;
        line-height: 1.4;
      }
    }
  }

  .date {
    font-weight: 800;
    color: var(--primary);
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    text-transform: uppercase;
  }

  .content {
    background: var(--surface);
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);

    h4 {
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--foreground);
    }

    p {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
`;

const CTASection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 2.5rem 1rem;
  }
`;

const Divider = styled.div`
  max-width: 800px;
  margin: 0 auto;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border), transparent);
  opacity: 0.8;
`;

const CTACard = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    #8b5cf6 50%,
    var(--accent) 100%
  );
  padding: 5rem 2rem;
  border-radius: 32px;
  box-shadow: 0 25px 50px -12px rgba(79, 70, 229, 0.4);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at top right,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 3rem 1.25rem;
    border-radius: 24px;
  }
`;

const CTAButtonGroup = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  margin-top: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-top: 1.75rem;
    gap: 0.75rem;
  }
`;

const DarkButton = styled(Link)`
  padding: 1rem 2.5rem;
  background: #ffffff;
  color: var(--primary);
  font-weight: 700;
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    background: #f8fafc;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    width: 100%;
    max-width: 280px;
    box-sizing: border-box;
    text-align: center;
  }
`;

const OutlineButton = styled(Link)`
  padding: 1rem 2.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-weight: 700;
  border-radius: 14px;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    width: 100%;
    max-width: 280px;
    box-sizing: border-box;
    text-align: center;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 3rem;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark) 100%
  );
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.4);

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 40px -10px rgba(79, 70, 229, 0.5);
  }

  &:active {
    transform: translateY(0) scale(1);
  }

  @media (max-width: 768px) {
    padding: 0.85rem 2rem;
    font-size: 0.95rem;
  }
`;

export default function AboutPage() {
  return (
    <Container>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "1.5rem 2rem 0",
          width: "100%",
        }}
      >
        <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="About" />
      </div>
      <HeroSection>
        <Title>
          About <span>Japan Learning App</span>
        </Title>
        <JpTitle>アプリについて</JpTitle>
        <HeroSubtitle>
          Bridging the gap between culture and technology. We're building the
          future of Japanese language mastery through immersive, beautiful, and
          data-driven learning experiences.
        </HeroSubtitle>
        <PrimaryButton href="/study" style={{ marginBottom: "4rem" }}>
          Start Your Journey
        </PrimaryButton>

        <HeroImageWrapper>
          <Image
            src="/images/about_hero.png"
            alt="Japan Learning App Hero"
            fill
            priority
          />
        </HeroImageWrapper>
      </HeroSection>

      <StatsGrid>
        <StatCard>
          <div className="value">2,136</div>
          <div className="label">Joyo Kanji</div>
        </StatCard>
        <StatCard>
          <div className="value">JLPT</div>
          <div className="label">N5 to N1 Ready</div>
        </StatCard>
        <StatCard>
          <div className="value">100%</div>
          <div className="label">Interactive</div>
        </StatCard>
      </StatsGrid>

      <ContentSection>
        <GridContainer>
          <TextBlock>
            <BlockTitle>Our Story</BlockTitle>
            <BlockParagraph>
              The Japanese language is incredibly rich and challenging,
              especially when it comes to mastering its unique writing systems.
              Japan Learning App was born out of a passion for the language and
              a desire to build a tool that feels less like a chore and more
              like a natural part of your daily routine.
            </BlockParagraph>
            <BlockParagraph>
              We noticed that many traditional learning resources were either
              too rigid or visually unappealing, making the process of
              memorizing thousands of characters daunting. We wanted to build
              something different&mdash;a modern, beautiful, and highly
              interactive platform tailored for learners at all levels, from
              complete beginners tackling Hiragana to advanced students
              preparing for the JLPT N1.
            </BlockParagraph>
          </TextBlock>

          <TextBlock>
            <BlockTitle>Our Learning Approach</BlockTitle>
            <BlockParagraph>
              We believe that effective learning comes from consistent, engaging
              practice. That&#39;s why we&#39;ve built our platform around
              proven educational methods. Our interactive flashcards employ
              spaced repetition principles and randomized modes to ensure that
              characters move into your long-term memory.
            </BlockParagraph>
            <BlockParagraph>
              Beyond rote memorization, we emphasize context and culture. With
              features like stroke-order animations, native audio pronunciation,
              and our immersive Japanese Culture Blog, we provide a holistic
              learning experience. We don&#39;t just want you to pass a test; we
              want you to connect with the language and the culture it
              represents.
            </BlockParagraph>
          </TextBlock>
        </GridContainer>
      </ContentSection>

      <ValuesSection>
        <SectionHeader>
          <SectionTitle>
            Our Core <span>Values</span>
          </SectionTitle>
          <SectionSubtitle>
            Essential principles that guide everything we build for our
            community of learners.
          </SectionSubtitle>
        </SectionHeader>

        <ValuesGrid>
          <ValueCard $variant="primary">
            <div className="icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3>Simplicity First</h3>
            <p>
              Learning Japanese is complex enough. Our UI is designed to be
              clean, distraction-free, and effortlessly intuitive. We prioritize
              common sense design over complexity, ensuring you focus 100% of
              your energy on the characters, not the navigation.
            </p>
          </ValueCard>

          <ValueCard $variant="secondary">
            <div className="icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3>Dynamic Learning</h3>
            <p>
              We move beyond static lists. Our platform uses Spaced Repetition
              (SRS) to ensure you remember what you've learned at just the right
              time. Our algorithms adapt to your progress, helping you master
              Kanji faster than traditional methods.
            </p>
          </ValueCard>

          <ValueCard $variant="accent">
            <div className="icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <h3>Cultural Depth</h3>
            <p>
              Language is culture. We integrate cultural context, native
              pronunciations, and stroke-order history into every lesson. Our
              blog dive deeper into the rich heritage of Japan, making your
              learning experience holistic and meaningful.
            </p>
          </ValueCard>
        </ValuesGrid>
      </ValuesSection>

      <JourneySection>
        <SectionHeader>
          <SectionTitle>
            Our <span>Journey</span>
          </SectionTitle>
          <SectionSubtitle>
            From a simple prototype to a comprehensive JLPT preparation
            platform.
          </SectionSubtitle>
        </SectionHeader>

        <Timeline>
          <TimelineItem $side="left">
            <div className="date">Phase 1</div>
            <div className="content">
              <h4>The Foundation</h4>
              <p>
                Establishing the core learning experience with comprehensive
                Hiragana and Katakana tables, interactive quizzes, and native
                audio foundations.
              </p>
            </div>
          </TimelineItem>

          <TimelineItem $side="right">
            <div className="date">Phase 2</div>
            <div className="content">
              <h4>Comprehensive Characters</h4>
              <p>
                Integration of the full Joyo Kanji database and expanded
                vocabulary modules, categorized by JLPT levels for structured
                progress.
              </p>
            </div>
          </TimelineItem>

          <TimelineItem $side="left">
            <div className="date">Phase 3</div>
            <div className="content">
              <h4>Intelligent Mastery</h4>
              <p>
                Implementation of our signature SRS (Spaced Repetition System)
                and advanced study statistics to ensure long-term retention of
                characters.
              </p>
            </div>
          </TimelineItem>

          <TimelineItem $side="right">
            <div className="date">Phase 4</div>
            <div className="content">
              <h4>Interactive Ecosystem</h4>
              <p>
                Launch of the Kanji Writer, Particle Master, and Verb
                Conjugation Drills, turning passive learning into an active
                handwriting and grammar experience.
              </p>
            </div>
          </TimelineItem>

          <TimelineItem $side="left">
            <div className="date">Phase 5</div>
            <div className="content">
              <h4>Personalized Roadmaps</h4>
              <p>
                The current era: Tailored learning paths from N5 to N1, guiding
                every student through a personalized journey to Japanese
                fluency.
              </p>
            </div>
          </TimelineItem>
        </Timeline>
      </JourneySection>

      <CTASection>
        <CTACard>
          <SectionTitle style={{ color: "#FFFFFF", marginBottom: "1.5rem" }}>
            Ready to Master Japanese?
          </SectionTitle>
          <SectionSubtitle
            style={{ color: "rgba(255, 255, 255, 0.9)", maxWidth: "700px" }}
          >
            Join thousands of students using our AI-powered SRS Mastery to crush
            their JLPT goals. Start your journey today!
          </SectionSubtitle>
          <CTAButtonGroup>
            <DarkButton href="/jlpt">Start JLPT Challenge</DarkButton>
            <OutlineButton href="/study">Start Studying Mode</OutlineButton>
          </CTAButtonGroup>
        </CTACard>
      </CTASection>
    </Container>
  );
}
