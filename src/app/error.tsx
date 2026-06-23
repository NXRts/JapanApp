"use client";

import { useEffect } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background: var(--surface);
`;

const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: ${shakeAnimation} 0.5s ease-in-out;
`;

const ErrorTitle = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  color: var(--foreground);
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 500px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ErrorDetails = styled.div`
  background: var(--border);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--text-secondary);
  max-width: 600px;
  overflow-x: auto;
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

const SecondaryButton = styled.button`
  padding: 0.75rem 2rem;
  background: var(--surface);
  color: var(--foreground);
  border: 2px solid var(--border);
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--text-secondary);
    background: var(--border);
  }

  &:active {
    transform: translateY(2px);
  }
`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <ErrorContainer>
      <ErrorIcon>🚨</ErrorIcon>
      <ErrorTitle>Something went wrong!</ErrorTitle>
      <ErrorMessage>
        We encountered an unexpected error. This has been logged and our team
        has been notified. You can try refreshing the page or go back to the
        home page.
      </ErrorMessage>

      {process.env.NODE_ENV === "development" && (
        <ErrorDetails>
          <strong>Error:</strong> {error.message}
          {error.digest && (
            <div>
              <strong>Digest:</strong> {error.digest}
            </div>
          )}
          <div style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>
            {error.stack}
          </div>
        </ErrorDetails>
      )}

      <ButtonGroup>
        <PrimaryButton href="/">Go Home</PrimaryButton>
        <SecondaryButton onClick={() => reset()}>Try Again</SecondaryButton>
      </ButtonGroup>
    </ErrorContainer>
  );
}
