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
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
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

export const Back = styled(Face)`
  transform: rotateY(180deg);
  background: var(--surface);
  color: var(--foreground);
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  font-size: 1rem;
  overflow-y: auto;
  text-shadow: none;
  border: 1px solid var(--border);

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }

  h3 {
    margin: 0 0 12px;
    font-size: 1.8rem;
    color: var(--primary);
    border-bottom: 2px solid var(--border);
    width: 100%;
    padding-bottom: 8px;
    flex-shrink: 0;
    font-family: 'Noto Sans JP', sans-serif;
  }
`;

export const ReadingGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 12px;
  text-align: left;
  flex-shrink: 0;
`;

export const Label = styled.span`
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--text-secondary);
  font-weight: 700;
  margin-bottom: 6px;
  letter-spacing: 0.05em;
`;

export const Readings = styled.div`
  font-weight: 500;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  line-height: 1.4;
`;

export const ReadingItem = styled.span`
  background: var(--background);
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.95rem;
  border: 1px solid var(--border);
  
  span.romaji {
    display: block;
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-weight: 400;
    margin-top: 2px;
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

export const LanguageContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  justify-content: center;
  width: 100%;
`;

export const LanguageButton = styled.button<{ $active: boolean }>`
  padding: 6px 16px;
  border: 1px solid ${({ $active }) => ($active ? 'var(--primary)' : 'var(--border)')};
  background: ${({ $active }) => ($active ? 'var(--primary)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'white' : 'var(--text-secondary)')};
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary);
    color: ${({ $active }) => ($active ? 'white' : 'var(--primary)')};
  }
`;

export const Meanings = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 16px;
  padding: 8px;
  background: var(--background);
  border-radius: 12px;
  border: 1px solid var(--border);
`;

export const MeaningText = styled.p`
  font-size: 1rem;
  color: var(--foreground);
  line-height: 1.5;
  margin-bottom: 4px;
  font-weight: 500;
  
  &.id-note {
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-weight: 400;
    font-style: italic;
    margin-top: 8px;
  }
`;