import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1.15;
  perspective: 1000px;
  cursor: pointer;
  /* PWA touch: no highlight, no selection, no context menu */
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`;

export const Inner = styled.div<{ $flipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  will-change: transform;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border-radius: 20px;

  transform: ${({ $flipped }) => ($flipped ? "rotateY(180deg)" : "rotateY(0deg)")};

  ${Card}:hover & {
    box-shadow: 0 12px 28px rgba(59, 130, 246, 0.25);
  }
`;

export const Face = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  font-size: clamp(2.5rem, 5vw, 3.8rem);
  font-weight: 800;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.12) 0%,
      transparent 60%
    );
    pointer-events: none;
  }
`;

export const ReadingItem = styled.div`
  background: var(--background);
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  color: var(--foreground);
  border: 1px solid var(--border);

  span.romaji {
    display: block;
    font-size: 1rem;
    color: var(--text-secondary);
    font-weight: 400;
    margin-top: 4px;
  }
`;

export const Back = styled(Face)`
  transform: rotateY(180deg) translateZ(0);
  background: var(--surface);
  color: var(--foreground);
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  font-size: 0.95rem;
  overflow-y: auto;
  text-shadow: none;
  border: 1px solid var(--border);

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  h3 {
    margin: 0 0 8px;
    font-size: clamp(2rem, 4vw, 3rem);
    color: var(--primary);
    width: 100%;
    padding-bottom: 8px;
    flex-shrink: 0;
    font-family: "Noto Sans JP", sans-serif;
  }

  p {
    font-size: 1.5rem;
    color: var(--text-secondary);
    font-weight: 500;
  }
`;

export const AudioButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  left: auto;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;

  &:hover {
    color: var(--primary);
    background-color: rgba(59, 130, 246, 0.15);
    transform: scale(1.15);
  }

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
`;
