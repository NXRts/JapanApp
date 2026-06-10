"use client";

import styled from "styled-components";
import {
  CameraIcon,
  GamepadIcon,
  RefreshIcon,
  TargetIcon,
  BookIcon,
} from "../icons/AppIcons";

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1240px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.75rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 5rem;
  color: var(--foreground);

  span {
    position: relative;
    z-index: 1;

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 5px;
      background: var(--primary);
      border-radius: 2px;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 2.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled.div`
  background: var(--surface);
  padding: 2.25rem;
  border-radius: 28px;
  border: 1px solid var(--border);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow:
      0 20px 40px -10px rgba(0, 0, 0, 0.3),
      0 0 15px rgba(var(--primary-rgb), 0.1);
    border-color: var(--primary-light);
  }

  @media (max-width: 768px) {
    padding: 1.75rem;
    border-radius: 24px;
  }
`;

const CardIcon = styled.div`
  width: 56px;
  height: 56px;
  background: linear-gradient(
    135deg,
    rgba(var(--primary-rgb), 0.15),
    rgba(var(--primary-rgb), 0.05)
  );
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.75rem;
  color: var(--primary);
  font-size: 1.75rem;
  box-shadow: 0 8px 16px -4px rgba(var(--primary-rgb), 0.1);

  svg {
    width: 28px;
    height: 28px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--foreground);

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.65;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export function FeaturesSection() {
  return (
    <Section>
      <SectionTitle>
        <span>Key Features</span>
      </SectionTitle>
      <Grid>
        <Card>
          <CardIcon>字</CardIcon>
          <CardTitle>Interactive Kanji Writer</CardTitle>
          <CardDescription>
            Master stroke order by writing naturally on your screen. Includes{" "}
            <b>Real-time Feedback</b>,<b>Stroke Recognition</b>, and 2136+ Joyo
            Kanji library.
          </CardDescription>
        </Card>
        <Card>
          <CardIcon>
            <TargetIcon size={28} />
          </CardIcon>
          <CardTitle>Personalized Roadmap</CardTitle>
          <CardDescription>
            Follow a clear, <b>Step-by-Step path</b> from N5 to N1. Curated
            curriculum covering vocabulary, kanji, and grammar patterns for
            official JLPT exams.
          </CardDescription>
        </Card>
        <Card>
          <CardIcon>
            <CameraIcon size={28} />
          </CardIcon>
          <CardTitle>AI Dictionary & OCR</CardTitle>
          <CardDescription>
            Search for meanings instantly using <b>OCR Camera</b>,
            <b>Handwriting input</b>, or highly accurate <b>Voice Search</b>{" "}
            features.
          </CardDescription>
        </Card>
        <Card>
          <CardIcon>
            <BookIcon size={28} />
          </CardIcon>
          <CardTitle>Grammar & Particle Drills</CardTitle>
          <CardDescription>
            Master tricky <b>Particles</b> and <b>Verb Conjugations</b> through
            repetitive, interactive drills designed to build permanent muscle
            memory.
          </CardDescription>
        </Card>
        <Card>
          <CardIcon>
            <GamepadIcon size={28} />
          </CardIcon>
          <CardTitle>Interactive Learning Hub</CardTitle>
          <CardDescription>
            Mastery made fun. Learn through <b>Match Pairs</b>,{" "}
            <b>Audio Challenges</b>, and various <b>Mini-games</b> in our
            vibrant interactive hub.
          </CardDescription>
        </Card>
        <Card>
          <CardIcon>
            <RefreshIcon size={28} />
          </CardIcon>
          <CardTitle>Smart SRS Mastery</CardTitle>
          <CardDescription>
            Our <b>Spaced Repetition System</b> predicts the optimal time for
            you to review, ensuring maximum long-term memory retention with
            minimum effort.
          </CardDescription>
        </Card>
      </Grid>
    </Section>
  );
}
