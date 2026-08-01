"use client";

import styled from "styled-components";

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

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
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

const Button = styled.button`
  padding: 0.75rem 2rem;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark) 100%
  );
  color: white;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
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

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ErrorContainer>
          <ErrorIcon>🚨</ErrorIcon>
          <ErrorTitle>Application Error</ErrorTitle>
          <ErrorMessage>
            A critical error occurred. This has been logged and our team has
            been notified.
          </ErrorMessage>

          {process.env.NODE_ENV === "development" && (
            <ErrorDetails>
              <strong>Error:</strong>{" "}
              {!error?.message ||
              error.message === "[object Event]" ||
              error.message.includes("[object Event]")
                ? "A media, audio, or network resource event error occurred."
                : error.message}
              {error.digest && (
                <div>
                  <strong>Digest:</strong> {error.digest}
                </div>
              )}
            </ErrorDetails>
          )}

          <Button onClick={() => reset()}>Try Again</Button>
        </ErrorContainer>
      </body>
    </html>
  );
}
