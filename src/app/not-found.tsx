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
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const NotFoundIcon = styled.div`
  font-size: 6rem;
  margin-bottom: 1.5rem;
  animation: ${floatAnimation} 3s ease-in-out infinite;
`;

const NotFoundTitle = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: var(--foreground);
  margin-bottom: 0.5rem;
`;

const NotFoundSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const NotFoundMessage = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 500px;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
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
`;

const SuggestionList = styled.div`
  margin-top: 3rem;
  max-width: 400px;
  text-align: left;
`;

const SuggestionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 1rem;
`;

const SuggestionLink = styled(Link)`
  display: block;
  padding: 0.5rem 0;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--primary);
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
          moved, deleted, or perhaps the spelling is incorrect. Let's get you back
          on track!
        </NotFoundMessage>

        <ButtonGroup>
          <PrimaryButton href="/">Go Home</PrimaryButton>
          <SecondaryButton href="/practice">Try Practice</SecondaryButton>
        </ButtonGroup>

        <SuggestionList>
          <SuggestionTitle>Popular Destinations</SuggestionTitle>
          <SuggestionLink href="/kana">
            🇯🇵 Learn Hiragana & Katakana (Kana)
          </SuggestionLink>
          <SuggestionLink href="/kanji">🏮 Learn Kanji Characters</SuggestionLink>
          <SuggestionLink href="/grammar/lessons">
            📖 Japanese Grammar Lessons
          </SuggestionLink>
          <SuggestionLink href="/review">📚 Vocab Review (SRS)</SuggestionLink>
        </SuggestionList>
      </NotFoundContainer>
    </>
  );
}
