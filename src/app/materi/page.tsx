"use client";

import styled from "styled-components";
import Link from "next/link";

import { LightBulbIcon } from "@/components/icons/AppIcons";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";

// Styled Components
const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  min-height: 90vh;

  @media (max-width: 1024px) {
    padding: 1rem 1rem 96px 1rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem 96px 0.5rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.1rem;
  background: linear-gradient(
    135deg,
    var(--foreground) 0%,
    var(--text-secondary) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

const HubCardLink = styled(Link)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2.5rem;
  text-decoration: none;
  color: var(--foreground);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(255, 255, 255, 0.06),
      transparent 40%
    );
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2);
    border-color: var(--primary);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 20px;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const IconWrapper = styled.div<{ $color: string }>`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: ${({ $color }) => `rgba(${$color}, 0.1)`};
  color: ${({ $color }) => `rgb(${$color})`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  svg {
    width: 32px;
    height: 32px;
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

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    min-height: 2.6rem;
    display: flex;
    align-items: flex-start;
  }
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    line-height: 1.4;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-grow: 0;
    max-height: 4.2em;
  }
`;

const ActionButton = styled.div<{ $color: string }>`
  align-self: flex-start;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  background: ${({ $color }) => `rgba(${$color}, 0.1)`};
  color: ${({ $color }) => `rgb(${$color})`};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${HubCardLink}:hover & {
    background: ${({ $color }) => `rgb(${$color})`};
    color: white;
  }

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 768px) {
    padding: 0 !important;
    background: transparent !important;
    color: ${({ $color }) => `rgb(${$color})`} !important;
    font-size: 0.8rem;
    border-radius: 0;

    ${HubCardLink}:hover & {
      background: transparent !important;
      color: ${({ $color }) => `rgb(${$color})`} !important;
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export default function MateriHubPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Materials" />
      <ContentWrapper>
        <Header>
          <Title>Learning Materials</Title>
          <Subtitle>
            Master Japanese in a structured way through selected Grammar,
            Vocabulary, and Study Strategies.
          </Subtitle>
        </Header>

        <HubGrid>
          {/* Grammar Hub */}
          <HubCardLink href="/grammar">
            <CardContent>
              <IconWrapper $color="59, 130, 246">
                {" "}
                {/* Blue color */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </IconWrapper>
              <CardTitle>Grammar</CardTitle>
              <CardDescription>
                Learn sentence structures, particles, and Japanese patterns from
                N5 to N4 levels with in-depth explanations.
              </CardDescription>
              <ActionButton $color="59, 130, 246">
                Start Learning
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </ActionButton>
            </CardContent>
          </HubCardLink>

          {/* Vocabulary Hub */}
          <HubCardLink href="/vocabulary">
            <CardContent>
              <IconWrapper $color="16, 185, 129">
                {" "}
                {/* Emerald color */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </IconWrapper>
              <CardTitle>Vocabulary</CardTitle>
              <CardDescription>
                Enrich your vocabulary with thousands of words accompanied by
                example sentences and pronunciation audio.
              </CardDescription>
              <ActionButton $color="16, 185, 129">
                Enrich Vocabulary
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </ActionButton>
            </CardContent>
          </HubCardLink>

          {/* Dictionary Hub */}
          <HubCardLink href="/jlpt">
            <CardContent>
              <IconWrapper $color="234, 179, 8">
                {" "}
                {/* Amber color */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </IconWrapper>
              <CardTitle>JLPT</CardTitle>
              <CardDescription>
                Quickly access thousands of Japanese vocabulary and grammar
                instantly through our smart search system.
              </CardDescription>
              <ActionButton $color="234, 179, 8">
                Open JLPT
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </ActionButton>
            </CardContent>
          </HubCardLink>

          {/* Tips & Tricks Hub */}
          <HubCardLink href="/tips">
            <CardContent>
              <IconWrapper $color="139, 92, 246">
                {" "}
                {/* Purple/Violet color */}
                <LightBulbIcon size={32} />
              </IconWrapper>
              <CardTitle>Learning Tips</CardTitle>
              <CardDescription>
                Discover professional strategies and psychological tricks to
                accelerate your Japanese acquisition journey.
              </CardDescription>
              <ActionButton $color="139, 92, 246">
                View Strategies
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </ActionButton>
            </CardContent>
          </HubCardLink>

          {/* Practice Sheets Hub */}
          <HubCardLink href="/practice-sheets">
            <CardContent>
              <IconWrapper $color="244, 63, 94">
                {" "}
                {/* Rose color */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <path d="M6 14h12v8H6z" />
                </svg>
              </IconWrapper>
              <CardTitle>Practice Sheets</CardTitle>
              <CardDescription>
                Generate custom Japanese Genkouyoushi grids for Kana and Kanji
                to print out and practice handwriting offline.
              </CardDescription>
              <ActionButton $color="244, 63, 94">
                Print Sheets
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </ActionButton>
            </CardContent>
          </HubCardLink>
        </HubGrid>
      </ContentWrapper>
    </Container>
  );
}
