'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const PageWrapper = styled.div`
  min-height: 90vh;
  width: 100%;
  /* Premium radial background */
  background: radial-gradient(circle at top right, rgba(79, 70, 229, 0.05) 0%, transparent 60%);
  overflow-x: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
  max-width: 800px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
    margin-bottom: 2rem;
  }
`;

const BackLink = styled(Link)`
  text-decoration: none;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.2s;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  align-self: flex-start;

  &:hover {
    color: var(--primary);
    background: rgba(79, 70, 229, 0.05);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 160px;

  @media (max-width: 600px) {
    width: 100%;
    flex: 1;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 600px) {
    gap: 0.5rem;
    width: 100%;
    justify-content: space-between;
  }
`;

const ToggleBtn = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid ${({ $active }) => ($active ? 'var(--primary)' : 'var(--border)')};
  background: ${({ $active }) => ($active ? 'rgba(79, 70, 229, 0.1)' : 'var(--surface)')};
  color: ${({ $active }) => ($active ? 'var(--primary)' : 'var(--text-secondary)')};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  @media (max-width: 600px) {
    padding: 0.75rem;
    span {
      display: none;
    }
  }
`;

const DropdownTrigger = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--foreground);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  svg {
    transition: transform 0.2s;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
    color: var(--text-secondary);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 50;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const DropdownItem = styled.div<{ $isActive: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-weight: 500;
  color: ${({ $isActive }) => ($isActive ? 'var(--primary)' : 'var(--foreground)')};
  background: ${({ $isActive }) => ($isActive ? 'rgba(79, 70, 229, 0.05)' : 'transparent')};
  transition: background 0.2s;

  &:hover {
    background: rgba(79, 70, 229, 0.05);
    color: var(--primary);
  }
`;

const FlashcardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

const AnimContainer = styled.div<{ $dir: 'next' | 'prev' | null }>`
  width: 100%;
  display: flex;
  justify-content: center;
  
  animation: ${({ $dir }) => {
    if ($dir === 'next') return 'slideInNext 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    if ($dir === 'prev') return 'slideInPrev 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    return 'none';
  }};

  @keyframes slideInNext {
    0% { opacity: 0; transform: translateX(80px) scale(0.95); }
    100% { opacity: 1; transform: translateX(0) scale(1); }
  }
  
  @keyframes slideInPrev {
    0% { opacity: 0; transform: translateX(-80px) scale(0.95); }
    100% { opacity: 1; transform: translateX(0) scale(1); }
  }
`;

const SectionTitle = styled.h3`
  margin-bottom: 2rem;
  color: var(--text-secondary);
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
  font-weight: 700;

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const CardPerspective = styled.div`
  width: 100%;
  max-width: 500px;
  height: 460px;
  perspective: 1500px;
  cursor: pointer;
  position: relative;
  margin-bottom: 3rem;
  user-select: none;
  -webkit-user-select: none;
`;

const CardInner = styled.div<{ $flipped: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  transform: ${({ $flipped }) => ($flipped ? 'rotateX(180deg)' : 'rotateX(0)')};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 32px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

const CardBack = styled(CardFace)`
  transform: rotateX(180deg);
  background: linear-gradient(135deg, var(--surface) 0%, rgba(79, 70, 229, 0.05) 100%);
`;

const InstructionText = styled.div`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const BigCharacter = styled.div`
  font-size: 8rem;
  font-weight: 800;
  color: var(--foreground);
  line-height: 1.2;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    font-size: 6rem;
  }
`;

const HighlightRomaji = styled.h2`
  font-size: 4rem; 
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 600px) {
    font-size: 3rem;
  }
`;

const HintText = styled.p`
  margin-top: auto;
  color: var(--primary);
  font-weight: 600;
  font-size: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  max-width: 500px;
  justify-content: space-between;
  padding: 0 1rem;
`;

const IconBtn = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: var(--surface);
  color: var(--foreground);
  border: 1px solid var(--border);

  &:hover {
    transform: scale(1.1);
    border-color: var(--primary);
    color: var(--primary);
  }
  
  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ActionBtn = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  border-radius: 999px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(79, 70, 229, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

type KanaItem = {
  character: string;
  romaji: string;
};

export default function KanaFlashcards() {
  const [level, setLevel] = useState('hiragana');
  const [originalList, setOriginalList] = useState<KanaItem[]>([]);
  const [kanaList, setKanaList] = useState<KanaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRandom, setIsRandom] = useState(false); // Default sequentially
  const [slideDir, setSlideDir] = useState<'next' | 'prev' | null>(null);

  // Touch swipe states
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const minSwipeDistance = 50;

  // Fetch List
  useEffect(() => {
    setLoading(true);
    fetch(`/api/kana/${level}`)
      .then(res => res.json())
      .then((data: KanaItem[]) => {
        if (Array.isArray(data)) {
          setOriginalList(data);
        } else {
          setOriginalList([]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [level]);

  // Update list order based on mode
  useEffect(() => {
    if (originalList.length > 0) {
      if (isRandom) {
        // Shuffle copy
        setKanaList([...originalList].sort(() => 0.5 - Math.random()));
      } else {
        setKanaList([...originalList]); // Sequential
      }
      setCurrentIndex(0);
      setFlipped(false);
    } else {
      setKanaList([]);
    }
  }, [originalList, isRandom]);

  const currentKana = kanaList[currentIndex];

  const nextCard = () => {
    if (flipped) {
      setFlipped(false);
      setTimeout(() => {
        setSlideDir('next');
        setCurrentIndex(prev => (prev + 1) % kanaList.length);
      }, 300); // Wait for flip back
    } else {
      setSlideDir('next');
      setCurrentIndex(prev => (prev + 1) % kanaList.length);
    }
  };

  const prevCard = () => {
    if (flipped) {
      setFlipped(false);
      setTimeout(() => {
        setSlideDir('prev');
        setCurrentIndex(prev => (prev === 0 ? kanaList.length - 1 : prev - 1));
      }, 300);
    } else {
      setSlideDir('prev');
      setCurrentIndex(prev => (prev === 0 ? kanaList.length - 1 : prev - 1));
    }
  };

  // Swipe Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextCard(); // Swipe left -> Next
    }
    if (isRightSwipe) {
      prevCard(); // Swipe right -> Previous
    }
  };

  if (loading) return (
    <PageWrapper>
      <Container>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '4rem' }}>Loading Characters...</div>
      </Container>
    </PageWrapper>
  );

  if (!currentKana) return <PageWrapper><Container>No Kana found for this level.</Container></PageWrapper>;

  return (
    <PageWrapper>
      <Container>
        <Header>
          <BackLink href="/practice">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </BackLink>
          <Controls>
            <ToggleBtn
              $active={isRandom}
              onClick={() => setIsRandom(!isRandom)}
              title={isRandom ? 'Sequential Mode' : 'Shuffle Mode'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {!isRandom ? (
                  <>
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </>
                ) : (
                  <>
                    <polyline points="16 3 21 3 21 8"></polyline>
                    <line x1="4" y1="20" x2="21" y2="3"></line>
                    <polyline points="21 16 21 21 16 21"></polyline>
                    <line x1="15" y1="15" x2="21" y2="21"></line>
                    <line x1="4" y1="4" x2="9" y2="9"></line>
                  </>
                )}
              </svg>
              <span>{isRandom ? 'Random' : 'Sequential'}</span>
            </ToggleBtn>

            <DropdownContainer>
              <DropdownTrigger
                $isOpen={isDropdownOpen}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </DropdownTrigger>

              {isDropdownOpen && (
                <DropdownMenu>
                  {['hiragana', 'katakana', 'dakuten', 'handakuten', 'yoon'].map(l => (
                    <DropdownItem
                      key={l}
                      $isActive={level === l}
                      onClick={() => {
                        setLevel(l);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {l.charAt(0).toUpperCase() + l.slice(1)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </DropdownContainer>
          </Controls>
        </Header>

        <FlashcardContainer>
          <SectionTitle>Kana Memorization</SectionTitle>
          <AnimContainer key={currentIndex} $dir={slideDir}>
            <CardPerspective
              onClick={() => setFlipped(!flipped)}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <CardInner $flipped={flipped}>
                <CardFace>
                  <InstructionText>Character</InstructionText>
                  <BigCharacter>{currentKana.character}</BigCharacter>
                  <HintText>Tap to Reveal ⟳</HintText>
                </CardFace>

                <CardBack>
                  <InstructionText>Romaji</InstructionText>
                  <HighlightRomaji>{currentKana.romaji}</HighlightRomaji>
                  <HintText>Tap to Flip ⟳</HintText>
                </CardBack>
              </CardInner>
            </CardPerspective>
          </AnimContainer>

          <ActionButtons>
            <IconBtn onClick={prevCard} aria-label="Previous Character">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </IconBtn>

            <ActionBtn onClick={nextCard}>
              Next Character {currentIndex + 1} / {kanaList.length}
            </ActionBtn>
          </ActionButtons>
        </FlashcardContainer>
      </Container>
    </PageWrapper>
  );
}
