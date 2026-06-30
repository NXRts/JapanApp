import styled from "styled-components";

/* Card is the perspective container + hover shadow. */
export const Card = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  perspective: 1200px;
  cursor: pointer;
  /* PWA touch: no highlight, no selection, no context menu */
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover > div {
    box-shadow: var(--shadow-lg);
  }
`;

export const Inner = styled.div<{ $flipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s ease;
  transform-style: preserve-3d;
  box-shadow: var(--shadow-md);
  border-radius: 20px;
  transform: ${({ $flipped }) => ($flipped ? "rotateY(180deg)" : "rotateY(0)")};
`;

const Baseface = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 20px;
  overflow: hidden;
  /* PWA: inherit no-selection from Card */
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
`;

export const Face = styled(Baseface)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  font-size: 5rem;
  font-weight: 700;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
    pointer-events: none;
  }
`;

export const Back = styled(Baseface)`
  transform: rotateY(180deg);
  background: var(--surface);
  color: var(--foreground);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 16px 16px;
  font-size: 1rem;
  overflow-y: auto;
  text-shadow: none;
  border: 1px solid var(--border);

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  h3 {
    margin: 0 0 10px;
    font-size: 1.8rem;
    color: var(--primary);
    border-bottom: 2px solid var(--border);
    width: 100%;
    padding-bottom: 8px;
    flex-shrink: 0;
    font-family: "Noto Sans JP", sans-serif;
    text-align: center;
  }
`;

export const ReadingGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
  text-align: left;
  flex-shrink: 0;
`;

export const Label = styled.span`
  font-size: 0.65rem;
  text-transform: uppercase;
  color: var(--text-secondary);
  font-weight: 700;
  margin-bottom: 5px;
  letter-spacing: 0.06em;
`;

export const Readings = styled.div`
  font-weight: 500;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  line-height: 1.4;
`;

export const ReadingItem = styled.span`
  background: var(--background);
  padding: 4px 8px;
  border-radius: 7px;
  font-size: 0.88rem;
  border: 1px solid var(--border);

  span.romaji {
    display: block;
    font-size: 0.7rem;
    color: var(--text-secondary);
    font-weight: 400;
    margin-top: 1px;
  }
`;

export const AudioButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 6px;
  border-radius: 50%;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;

  &:hover {
    color: var(--primary);
    background-color: rgba(79, 70, 229, 0.1);
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;

export const LanguageContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
  justify-content: center;
  width: 100%;
  flex-shrink: 0;
`;

export const LanguageButton = styled.button<{ $active: boolean }>`
  padding: 4px 14px;
  border: 1px solid ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  background: ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  color: ${({ $active }) => ($active ? "white" : "var(--text-secondary)")};
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary);
    color: ${({ $active }) => ($active ? "white" : "var(--primary)")};
  }
`;

export const Meanings = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 0;
  padding: 8px 6px;
  background: var(--background);
  border-radius: 10px;
  border: 1px solid var(--border);
  flex-shrink: 0;
`;

export const MeaningText = styled.p`
  font-size: 0.9rem;
  color: var(--foreground);
  line-height: 1.45;
  margin-bottom: 3px;
  font-weight: 500;

  &:last-child {
    margin-bottom: 0;
  }

  &.id-note {
    font-size: 0.72rem;
    color: var(--text-secondary);
    font-weight: 400;
    font-style: italic;
    margin-top: 6px;
  }
`;

export const ErrorNote = styled.p`
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-style: italic;
  text-align: center;
  margin-top: 8px;
`;
