"use client";

import Link from "next/link";
import styled, { keyframes, createGlobalStyle } from "styled-components";

const NotFoundGlobalStyle = createGlobalStyle`
  main {
    background: var(--surface) !important;
  }
`;

const NotFoundContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background: var(--surface);

  @media (max-width: 600px) {
    padding: 1.25rem 1rem 5.5rem 1rem;
    min-height: calc(100vh - 170px);
    justify-content: center;
  }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const NotFoundIcon = styled.div`
  font-size: 6rem;
  margin-bottom: 1.5rem;
  animation: ${floatAnimation} 3s ease-in-out infinite;

  @media (max-width: 600px) {
    font-size: 3.5rem;
    margin-bottom: 0.5rem;
  }
`;

const NotFoundTitle = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: var(--foreground);
  margin-bottom: 0.5rem;

  @media (max-width: 600px) {
    font-size: 2.2rem;
    margin-bottom: 0.2rem;
  }
`;

const NotFoundSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }
`;

const NotFoundMessage = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 500px;
  margin-bottom: 2.5rem;
  line-height: 1.6;

  @media (max-width: 600px) {
    font-size: 0.82rem;
    line-height: 1.45;
    margin-bottom: 1.25rem;
    max-width: 320px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 600px) {
    gap: 0.5rem;
    width: 100%;
  }
`;

const PrimaryButton = styled(Link)`
  padding: 0.75rem 2rem;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark) 100%
  );
  color: white;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
  border-bottom: 4px solid rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }

  @media (max-width: 600px) {
    padding: 0.6rem 1.25rem;
    font-size: 0.88rem;
  }
`;

const SecondaryButton = styled(Link)`
  padding: 0.75rem 2rem;
  background: var(--surface);
  color: var(--foreground);
  border: 2px solid var(--border);
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    border-color: var(--text-secondary);
    background: var(--border);
  }

  &:active {
    transform: translateY(2px);
  }

  @media (max-width: 600px) {
    padding: 0.6rem 1.25rem;
    font-size: 0.88rem;
  }
`;

const SuggestionSection = styled.div`
  margin-top: 3rem;
  max-width: 680px;
  width: 100%;

  @media (max-width: 600px) {
    margin-top: 1.25rem;
  }
`;

const SuggestionTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 1.25rem;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 0.92rem;
    margin-bottom: 0.4rem;
  }
`;

const SuggestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem 2.5rem;
  text-align: left;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.15rem;
    text-align: center;
  }
`;

const SecondarySuggestionColumn = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;

const SuggestionLink = styled(Link)`
  display: block;
  padding: 0.5rem 0;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: var(--primary);
  }

  @media (max-width: 600px) {
    padding: 0.35rem 0;
    font-size: 0.82rem;
  }
`;

export default function NotFound() {
  return (
    <>
      <NotFoundGlobalStyle />
      <NotFoundContainer>
        <NotFoundIcon>⛩️</NotFoundIcon>
        <NotFoundTitle>404</NotFoundTitle>
        <NotFoundSubtitle>
          Lost in Translation / ページが見つかりません
        </NotFoundSubtitle>
        <NotFoundMessage>
          We couldn't find the page you were looking for. It might have been
          moved, deleted, or perhaps the spelling is incorrect. Let's get you
          back on track!
        </NotFoundMessage>

        <ButtonGroup>
          <PrimaryButton href="/">Go Home</PrimaryButton>
          <SecondaryButton href="/jlpt">Try JLPT</SecondaryButton>
        </ButtonGroup>

        <SuggestionSection>
          <SuggestionTitle>Popular Destinations</SuggestionTitle>
          <SuggestionGrid>
            {/* Left Column (5 items - Visible on Desktop & Mobile) */}
            <div>
              <SuggestionLink href="/characters">
                あ Learn Characters (Kana & Kanji)
              </SuggestionLink>
              <SuggestionLink href="/jlpt">
                🏆 JLPT Level Practice
              </SuggestionLink>
              <SuggestionLink href="/study">
                📖 Study Hub & Lessons
              </SuggestionLink>
              <SuggestionLink href="/quiz">
                🎯 Quiz Hub & Practice
              </SuggestionLink>
              <SuggestionLink href="/game">
                🎮 Game Hub & Mini Games
              </SuggestionLink>
            </div>

            {/* Right Column (5 items - Hidden on Mobile) */}
            <SecondarySuggestionColumn>
              <SuggestionLink href="/jlpt/kanji-writer">
                ✍️ Kanji Stroke Writer
              </SuggestionLink>
              <SuggestionLink href="/study/smart-flashcards">
                🎴 Smart Flashcards (SRS)
              </SuggestionLink>
              <SuggestionLink href="/study/listening">
                🎧 Listening Practice
              </SuggestionLink>
              <SuggestionLink href="/study/speaking">
                🗣️ Speaking & Pitch Accent
              </SuggestionLink>
              <SuggestionLink href="/study/vocabulary">
                📚 Vocabulary Review
              </SuggestionLink>
            </SecondarySuggestionColumn>
          </SuggestionGrid>
        </SuggestionSection>
      </NotFoundContainer>
    </>
  );
}
