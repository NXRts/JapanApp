"use client";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import Link from "next/link";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 90vh;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    min-height: auto;
  }
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
  margin-bottom: 1rem;
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

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

const GameCardLink = styled(Link)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2rem;
  text-decoration: none;
  color: var(--foreground);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;

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
    border-color: rgba(var(--primary-rgb), 0.5);

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
  flex-grow: 1;
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

  ${GameCardLink}:hover & {
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
  z-index: 10;

  @media (max-width: 768px) {
    top: 1.25rem;
    right: 1.25rem;
    font-size: 0.55rem;
    padding: 0.15rem 0.4rem;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--foreground);
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
  font-size: 0.95rem;
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

const PlayButton = styled.div<{ $color: string }>`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: ${({ $color }) => `rgb(${$color})`};
  opacity: 0.8;
  transition: gap 0.2s ease;

  ${GameCardLink}:hover & {
    gap: 0.75rem;
    opacity: 1;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export default function GamesHubPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Game Hub" />
      <Header>
        <Title>Games Hub</Title>
        <Subtitle>
          Sharpen your Japanese skills with our interactive and fun mini-games.
          Find your favorite game below!
        </Subtitle>
      </Header>

      <GameGrid>
        {/* Memory Match Game */}
        <GameCardLink href="/game/memory-match">
          <CardBadge $color="245, 158, 11">PUZZLE</CardBadge>
          <CardContent>
            <IconWrapper $color="245, 158, 11">
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
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
            </IconWrapper>
            <CardTitle>Memory Match</CardTitle>
            <CardDescription>
              A visual puzzle! Match the Hiragana and Katakana characters having
              the same sound to clear the board.
            </CardDescription>
            <PlayButton $color="245, 158, 11">
              Play Now
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
            </PlayButton>
          </CardContent>
        </GameCardLink>

        {/* Kana Speed Typing Game */}
        <GameCardLink href="/game/speed-typing">
          <CardBadge $color="59, 130, 246">REFLEX</CardBadge>
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
            </IconWrapper>
            <CardTitle>Kana Speed Typing</CardTitle>
            <CardDescription>
              Test your typing reflexes! Type the correct Romaji mapping for the
              Kana as quickly as you can before the time runs out.
            </CardDescription>
            <PlayButton $color="59, 130, 246">
              Play Now
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
            </PlayButton>
          </CardContent>
        </GameCardLink>

        {/* Sentence Builder Game */}
        <GameCardLink href="/game/sentence-builder">
          <CardBadge $color="139, 92, 246">GRAMMAR</CardBadge>
          <CardContent>
            <IconWrapper $color="139, 92, 246">
              {" "}
              {/* Violet color */}
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
            </IconWrapper>
            <CardTitle>Sentence Builder</CardTitle>
            <CardDescription>
              Master Japanese grammar! Drag and drop the jumbled words and
              particles into the correct sequence to build the sentence.
            </CardDescription>
            <PlayButton $color="139, 92, 246">
              Start Building
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
            </PlayButton>
          </CardContent>
        </GameCardLink>

        {/* Conjugation Drills Game */}
        <GameCardLink href="/game/conjugation">
          <CardBadge $color="16, 185, 129">PRACTICE</CardBadge>
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
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                <path d="M12 8h4" />
                <path d="M12 12h4" />
                <path d="M12 16h4" />
              </svg>
            </IconWrapper>
            <CardTitle>Conjugation Drills</CardTitle>
            <CardDescription>
              Master verb conjugations! Quickly identify the correct Masu, Te,
              Ta, or Nai form of Japanese verbs before time runs out.
            </CardDescription>
            <PlayButton $color="16, 185, 129">
              Start Drills
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
            </PlayButton>
          </CardContent>
        </GameCardLink>
      </GameGrid>
    </Container>
  );
}
