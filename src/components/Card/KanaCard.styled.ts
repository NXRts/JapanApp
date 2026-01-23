import styled from 'styled-components';

export const Card = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  perspective: 1000px;
  cursor: pointer;
  
  /* Floating animation */
  animation: float 6s ease-in-out infinite;
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
    100% { transform: translateY(0px); }
  }
`;

export const Inner = styled.div<{ $flipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1), box-shadow 0.3s ease;
  transform-style: preserve-3d;
  box-shadow: var(--shadow-md);
  border-radius: 20px;
  
  transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'rotateY(0)')};

  ${Card}:hover & {
    box-shadow: var(--shadow-lg);
  }
`;

export const Face = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%);
  color: white;
  font-size: 5rem;
  font-weight: 700;
  text-shadow: 0 4px 6px rgba(0,0,0,0.2);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
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
  transform: rotateY(180deg);
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
  &::-webkit-scrollbar { display: none; }

  h3 {
    margin: 0 0 16px;
    font-size: 3rem;
    color: var(--primary);
    width: 100%;
    padding-bottom: 8px;
    flex-shrink: 0;
    font-family: 'Noto Sans JP', sans-serif;
  }

  p {
      font-size: 1.5rem;
      color: var(--text-secondary);
      font-weight: 500;
  }
`;

export const AudioButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 8px;
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
    width: 22px;
    height: 22px;
    fill: currentColor;
  }
`;
