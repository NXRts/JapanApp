"use client";

import styled from "styled-components";
import { TargetIcon, BookIcon, RefreshIcon } from "../icons/AppIcons";

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 4rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.75rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 6rem;
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
    margin-bottom: 3rem;
  }
`;

const TimelineWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem 0;

  @media (min-width: 1024px) {
    &::before {
      content: "";
      position: absolute;
      top: 105px;
      left: 10%;
      right: 10%;
      height: 2px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--border) 20%,
        var(--border) 80%,
        transparent 100%
      );
      z-index: 0;
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 4rem;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 2px;
      background: linear-gradient(
        180deg,
        transparent,
        var(--border),
        transparent
      );
      z-index: 0;
    }
  }
`;

const StepNode = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;

  &:hover {
    .dot {
      background: var(--primary);
      box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.5);
      transform: scale(1.2);
    }
    .content {
      transform: translateY(-10px);
      border-color: var(--primary-light);
      background: rgba(var(--primary-rgb), 0.05);
    }
  }
`;

const Dot = styled.div`
  width: 48px;
  height: 48px;
  background: var(--surface);
  border: 2px solid var(--primary-light);
  color: var(--primary-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    margin-bottom: 1rem;
    width: 40px;
    height: 40px;
    font-size: 0.9rem;
  }
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 28px;
  border: 1px solid var(--border);
  text-align: center;
  width: 100%;
  transition: all 0.4s ease;

  @media (max-width: 1024px) {
    max-width: 400px;
  }
`;

const IconWrapper = styled.div`
  height: 48px;
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-light);
  filter: drop-shadow(0 0 10px rgba(var(--primary-rgb), 0.2));
`;

const StepTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--foreground);
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const StepDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export function StepsSection() {
  return (
    <Section>
      <SectionTitle>
        <span>How It Works</span>
      </SectionTitle>
      <TimelineWrapper>
        <StepNode>
          <Dot className="dot">1</Dot>
          <ContentCard className="content">
            <IconWrapper>
              <TargetIcon size={32} />
            </IconWrapper>
            <StepTitle>Choose Your Roadmap</StepTitle>
            <StepDescription>
              Start your journey with a structured path from{" "}
              <b>Hiragana basics</b> to advanced <b>JLPT N1</b> mastery.
            </StepDescription>
          </ContentCard>
        </StepNode>

        <StepNode>
          <Dot className="dot">2</Dot>
          <ContentCard className="content">
            <IconWrapper>
              <BookIcon size={32} />
            </IconWrapper>
            <StepTitle>Interactive Practice</StepTitle>
            <StepDescription>
              Master Kanji with our <b>Handwriting Tool</b>, drill complex{" "}
              <b>Grammar</b>, and sharpen ears in the <b>Audio Lab</b>.
            </StepDescription>
          </ContentCard>
        </StepNode>

        <StepNode>
          <Dot className="dot">3</Dot>
          <ContentCard className="content">
            <IconWrapper>
              <RefreshIcon size={32} />
            </IconWrapper>
            <StepTitle>Achieve Mastery</StepTitle>
            <StepDescription>
              Retain everything with our <b>Intelligent SRS</b> that tracks your
              memory and schedules perfect reviews.
            </StepDescription>
          </ContentCard>
        </StepNode>
      </TimelineWrapper>
    </Section>
  );
}
