'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { DrawingCanvas } from '@/components/Practice/Canvas';

const PageWrapper = styled.div`
  min-height: 90vh;
  width: 100%;
  /* Premium radial background */
  background: radial-gradient(circle at top right, rgba(79, 70, 229, 0.05) 0%, transparent 60%);
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
  max-width: 1000px;
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

  &:hover {
    color: var(--primary);
    background: rgba(79, 70, 229, 0.05);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 160px;
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
  gap: 4rem;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
  max-width: 1000px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }
`;

const SectionTitle = styled.h3`
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
  font-weight: 700;
`;

const CanvasSection = styled.div`
    background: var(--surface);
    padding: 2rem;
    border-radius: 32px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 360px; /* Limit width but allow shrink */
    height: 460px; /* Fixed height to match card */
    justify-content: center;
    gap: 1rem;
`;

const DrawingArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 450px;
  width: 100%;
`;

const CardPerspective = styled.div`
  width: 340px;
  max-width: 100%; /* Responsive width */
  height: 460px; /* Increased to match canvas section */
  perspective: 1500px; /* Enhanced depth */
  cursor: pointer;
  position: relative;
  margin-bottom: 2.5rem;
`;

const CardInner = styled.div<{ $flipped: boolean }>`
    width: 100%;
    height: 100%;
    position: absolute;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-style: preserve-3d;
    transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'rotateY(0)')};
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
  padding: 2.5rem;
  text-align: center;
  /* Glass effect */
  /* Glass effect */
  background: var(--surface); /* Use theme variable which handles light/dark */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  background: var(--surface);
  color: var(--foreground);
  border: 1px solid var(--border);
`;

const BigChar = styled.div`
  font-size: 6rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  font-size: 6rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--foreground);
  line-height: 1;
`;

const PromptText = styled.h2`
    font-size: 2.5rem; 
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const Details = styled.div`
  margin-top: 0.5rem;
  text-align: left;
  width: 100%;
  font-size: 0.95rem;
  
  h4 {
    color: #4f46e5;
    margin-bottom: 0.25rem;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 700;
    margin-top: 1rem;
    
    &:first-child { margin-top: 0; }
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.4;
    color: #334155;
    margin: 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
  padding: 0 1rem;
`;

const ActionBtn = styled.button<{ $type: 'easy' | 'hard' | 'flip' }>`
  padding: 1rem 2rem;
  border-radius: 999px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s;
  font-size: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  background: ${({ $type }) =>
    $type === 'easy' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
      $type === 'hard' ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' :
        'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)'};
  
  color: white;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
    opacity: 0.95;
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

export default function KanjiFlashcards() {
  const [level, setLevel] = useState('n5');
  const [studyMode, setStudyMode] = useState<'read' | 'write'>('read');
  const [kanjiList, setKanjiList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);
  const [clearTrigger, setClearTrigger] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch List
  useEffect(() => {
    setLoading(true);
    fetch(`/api/kanji/${level}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Shuffle
          setKanjiList(data.sort(() => 0.5 - Math.random()));
          setCurrentIndex(0);
          setFlipped(false);
        }
      })
      .finally(() => setLoading(false));
  }, [level]);

  const currentKanji = kanjiList[currentIndex];

  // Fetch Details for current card (Back side)
  useEffect(() => {
    if (!currentKanji) return;

    fetch(`https://kanjiapi.dev/v1/kanji/${currentKanji}`)
      .then(res => res.json())
      .then(data => setDetails(data))
      .catch(() => setDetails(null));
  }, [currentKanji]);

  const nextCard = () => {
    setFlipped(false);
    setClearTrigger(prev => prev + 1); // Auto clear canvas
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % kanjiList.length);
    }, 400); // Wait for flip back
  };

  if (loading) return (
    <PageWrapper>
      <Container>
        <div style={{ color: 'var(--text-secondary)' }}>Loading Kanji...</div>
      </Container>
    </PageWrapper>
  );

  if (!currentKanji) return <PageWrapper><Container>No Kanji found for this level.</Container></PageWrapper>;

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
          <DropdownContainer>
            <DropdownTrigger
              $isOpen={isDropdownOpen}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Level {level.toUpperCase()}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </DropdownTrigger>

            {isDropdownOpen && (
              <DropdownMenu>
                {['n5', 'n4', 'n3', 'n2', 'n1'].map(l => (
                  <DropdownItem
                    key={l}
                    $isActive={level === l}
                    onClick={() => {
                      setLevel(l);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Level {l.toUpperCase()}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </DropdownContainer>
        </Header>

        <FlashcardContainer>
          <DrawingArea>
            <SectionTitle>Practice Writing</SectionTitle>
            <CanvasSection>
              <DrawingCanvas
                width={320}
                height={320}
                clearTrigger={clearTrigger}
                char={currentKanji}
                onComplete={() => {
                  // Optional: Play sound or show toast here
                  nextCard();
                }}
                onSkip={() => nextCard()}
              />
            </CanvasSection>
          </DrawingArea>

          <CardArea>
            <SectionTitle>Flashcard</SectionTitle>
            <CardPerspective onClick={() => setFlipped(!flipped)}>
              <CardInner $flipped={flipped}>
                <CardFace>
                  <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem', fontWeight: 600 }}>
                    Write this Kanji
                  </div>

                  {details ? (
                    <>
                      <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.5rem' }}>
                        MEANING
                      </div>
                      <PromptText>
                        {details.meanings ? details.meanings[0] : '...'}
                      </PromptText>
                      <div style={{ fontSize: '4rem', fontWeight: 700, color: 'var(--foreground)', marginTop: '0.5rem' }}>
                        {currentKanji}
                      </div>
                    </>
                  ) : (
                    <h2>Loading...</h2>
                  )}

                  <p style={{ marginTop: 'auto', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                    Tap to Flip ⟳
                  </p>
                </CardFace>

                <CardBack>
                  <BigChar>{currentKanji}</BigChar>
                  {details && (
                    <Details>
                      {details.on_readings && details.on_readings.length > 0 && (
                        <>
                          <h4>Onyomi</h4>
                          <p>{details.on_readings.join(', ')}</p>
                        </>
                      )}
                      {details.kun_readings && details.kun_readings.length > 0 && (
                        <>
                          <h4>Kunyomi</h4>
                          <p>{details.kun_readings.join(', ')}</p>
                        </>
                      )}
                      <h4>Meanings</h4>
                      <p>{details.meanings?.slice(0, 3).join(', ')}</p>
                    </Details>
                  )}
                </CardBack>
              </CardInner>
            </CardPerspective>

            <ActionButtons>
              {!flipped ? (
                <ActionBtn $type="flip" onClick={() => setFlipped(true)}>
                  Reveal Answer
                </ActionBtn>
              ) : (
                <>
                  <ActionBtn $type="hard" onClick={nextCard}>Hard</ActionBtn>
                  <ActionBtn $type="easy" onClick={nextCard}>Easy</ActionBtn>
                </>
              )}
            </ActionButtons>
          </CardArea>
        </FlashcardContainer>
      </Container>
    </PageWrapper>
  );
}
