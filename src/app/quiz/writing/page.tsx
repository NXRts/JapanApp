'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { DrawingCanvas, DrawingCanvasRef } from '@/components/Practice/Canvas';

// --- Styled Components ---

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #0f172a; /* Deep dark slate */
  background: radial-gradient(circle at top right, rgba(79, 70, 229, 0.05) 0%, transparent 60%);
  color: white;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }
`;

const ToolbarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 140px;
`;

const DropdownTrigger = styled.button`
  width: 100%;
  padding: 0 1.25rem;
  height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 41, 59, 0.8);
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(10px);
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--primary);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0.5rem;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  z-index: 50;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
`;

const DropdownItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: ${props => props.$active ? 'rgba(99, 102, 241, 0.2)' : 'transparent'};
  color: ${props => props.$active ? '#818cf8' : 'white'};
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;


const ContentGrid = styled.div`
  flex: 1;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: flex-start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem;
  }
`;

const SectionHeader = styled.h3`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 800;
`;

const GlassCard = styled.div`
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);

  @media (max-width: 600px) {
    padding: 1.5rem;
    border-radius: 20px;
  }
`;

const ToolBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
  justify-content: center;
`;

const ToolButton = styled.button<{ $variant?: 'primary' | 'danger' | 'ghost' }>`
  background: ${props => props.$variant === 'primary' ? 'var(--primary)' : 'transparent'};
  border: 1px solid ${props => props.$variant === 'primary' ? 'var(--primary)' : 'rgba(255,255,255,0.1)'};
  color: ${props => props.$variant === 'danger' ? '#f43f5e' : 'white'};
  padding: 0.6rem 1.25rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.$variant === 'primary' ? 'var(--primary-dark)' : 'rgba(255,255,255,0.05)'};
  }
`;

const NextBtnLink = styled.button`
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s;

  &:hover { color: white; transform: translateX(4px); }
`;

const CardPerspective = styled.div`
  width: 100%;
  height: 480px;
  perspective: 1500px;
  cursor: pointer;
`;

const CardInner = styled.div<{ $flipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  transform: ${props => props.$flipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 32px;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  padding: 3rem;
  justify-content: center;
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
`;

const Label = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
`;

const CardMeaning = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BigKanji = styled.div`
  font-size: 6rem;
  font-weight: 800;
  line-height: 1;
`;

const FlipHint = styled.p`
  margin-top: auto;
  font-size: 0.85rem;
  font-weight: 700;
  color: #6366f1;
`;

const FooterBtnContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto 4rem auto;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
`;

const RevealBtn = styled.button`
  width: 100%;
  padding: 1.25rem;
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  color: white;
  border-radius: 999px;
  font-weight: 800;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 30px -10px rgba(79, 70, 229, 0.5);
  }
`;

const ScoreBadge = styled.div`
  font-size: 0.9rem;
  font-weight: 800;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  border: 1px solid rgba(16, 185, 129, 0.2);
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px; /* Match dropdown height */
`;

// --- Component ---

export default function KanjiWritingQuizPage() {
  const [level, setLevel] = useState('n5');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [kanjiList, setKanjiList] = useState<string[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentItemDetailed, setCurrentItemDetailed] = useState<{kanji: string, meaning: string} | null>(null);

  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [clearTrigger, setClearTrigger] = useState(0);
  const [isGuideVisible, setIsGuideVisible] = useState(true);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<DrawingCanvasRef>(null);
  const advanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch Kanji List based on level
  useEffect(() => {
    let active = true;
    setLoadingList(true);
    fetch(`/api/kanji/${level}`)
      .then(res => res.json())
      .then(data => {
        if (!active) return;
        if (Array.isArray(data)) {
          setKanjiList(data.sort(() => 0.5 - Math.random()));
          setCurrentIndex(0);
          setFlipped(false);
          setScore(0);
          setIsFinished(false);
          setClearTrigger(prev => prev + 1);
        }
      })
      .finally(() => {
        if (active) setLoadingList(false);
      });
      
    return () => { active = false; };
  }, [level]);

  // Fetch Details for current Kanji
  useEffect(() => {
    let active = true;
    const currentKanji = kanjiList[currentIndex];
    if (!currentKanji) {
        setCurrentItemDetailed(null);
        return;
    }
    
    setCurrentItemDetailed(null); // Reset to show loading state if you prefer
    
    fetch(`https://kanjiapi.dev/v1/kanji/${currentKanji}`)
      .then(res => res.json())
      .then(data => {
        if (!active) return;
        setCurrentItemDetailed({
          kanji: currentKanji,
          meaning: data.meanings && data.meanings.length > 0 
            ? data.meanings.slice(0, 2).join(', ') 
            : 'Unknown'
        });
      })
      .catch(() => {
        if (active) setCurrentItemDetailed({ kanji: currentKanji, meaning: 'Unknown' });
      });
      
      return () => { active = false; };
  }, [currentIndex, kanjiList]);

  const handleNext = () => {
    if (advanceTimerRef.current) {
        clearTimeout(advanceTimerRef.current);
        advanceTimerRef.current = null;
    }
    
    if (currentIndex < kanjiList.length - 1) {
      setFlipped(false);
      setClearTrigger(prev => prev + 1);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 300);
    } else {
      setIsFinished(true);
    }
  };

  const handleReveal = () => {
    setFlipped(!flipped);
  };

  const handleCheck = () => {
    if (canvasRef.current) {
        canvasRef.current.calculateScore();
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
        canvasRef.current.clearCanvas();
    }
  };

  const handleToggleGuide = () => {
    if (canvasRef.current) {
        canvasRef.current.toggleGuide();
        setIsGuideVisible(!isGuideVisible);
    }
  };

  const onCanvasComplete = () => {
    setScore(s => s + 1);
    setTimeout(() => {
        setFlipped(true);
    }, 500);

    // Auto-advance after 5 seconds
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    advanceTimerRef.current = setTimeout(() => {
        handleNext();
    }, 5000);
  };

  if (isFinished) {
    return (
      <PageWrapper>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GlassCard style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Quiz Selesai!</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem' }}>
              Kamu telah menyelesaikan latihan menulis {score} Kanji.
            </p>
            <RevealBtn onClick={() => { setIsFinished(false); setCurrentIndex(0); setScore(0); setFlipped(false); }}>
              Ulangi Latihan
            </RevealBtn>
            <Link href="/quiz" style={{ marginTop: '1.5rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontWeight: 700 }}>
              Kembali ke Quiz Hub
            </Link>
          </GlassCard>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Header>
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Quiz', href: '/quiz' }
          ]} 
          current="Kanji Writing" 
        />
        <ToolbarHeader>
          <ScoreBadge>Score: {score}</ScoreBadge>
          <DropdownContainer ref={dropdownRef}>
            <DropdownTrigger onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Level {level.toUpperCase()}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </DropdownTrigger>
            {isDropdownOpen && (
              <DropdownMenu>
                {['n5', 'n4', 'n3', 'n2', 'n1'].map(l => (
                  <DropdownItem 
                    key={l} 
                    $active={level === l}
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
        </ToolbarHeader>
      </Header>

      <ContentGrid>
        {/* Practice Writing Side */}
        <div>
          <SectionHeader>. PRACTICE WRITING .</SectionHeader>
          <GlassCard>
            {loadingList || !currentItemDetailed ? (
               <div style={{ height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 Loading Kanji...
               </div>
            ) : (
                <DrawingCanvas
                  ref={canvasRef}
                  width={320}
                  height={320}
                  char={currentItemDetailed.kanji}
                  clearTrigger={clearTrigger}
                  hideToolbar={true}
                  onComplete={onCanvasComplete}
                  onSkip={handleNext}
                />
            )}
            
            <ToolBar>
              <ToolButton onClick={handleToggleGuide}>
                {isGuideVisible ? (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg> Hide</>
                ) : (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Guide</>
                )}
              </ToolButton>
              <ToolButton $variant="danger" onClick={handleClear}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
                Clear
              </ToolButton>
              <ToolButton $variant="primary" onClick={handleCheck}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Check
              </ToolButton>
            </ToolBar>

            <NextBtnLink onClick={handleNext}>
              Next <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
            </NextBtnLink>
          </GlassCard>
        </div>

        {/* Flashcard Side */}
        <div>
          <SectionHeader>. FLASHCARD .</SectionHeader>
          <CardPerspective onClick={handleReveal}>
            <CardInner $flipped={flipped}>
              <CardFace>
                <div style={{ marginBottom: '2rem' }}>
                  <Label style={{ display: 'block' }}>Write this Kanji</Label>
                </div>
                
                <Label>MEANING</Label>
                <CardMeaning>
                  {loadingList || !currentItemDetailed ? "..." : currentItemDetailed.meaning}
                </CardMeaning>
                
                <FlipHint>Tap to Flip ⟳</FlipHint>
              </CardFace>

              <CardBack>
                <Label>KANJI</Label>
                <BigKanji>
                  {loadingList || !currentItemDetailed ? "..." : currentItemDetailed.kanji}
                </BigKanji>
                <div style={{ marginTop: '2rem' }}>
                   <Label>PRECISION CHECK</Label>
                   <p style={{ marginTop: '0.5rem', fontWeight: 600, color: 'var(--primary)' }}>Latihan presisi penulisan aktif!</p>
                </div>
                <FlipHint>Tap to Reveal ⟳</FlipHint>
              </CardBack>
            </CardInner>
          </CardPerspective>
        </div>
      </ContentGrid>

      <FooterBtnContainer>
        <RevealBtn onClick={handleReveal}>
          {flipped ? 'Hide Answer' : 'Reveal Answer'}
        </RevealBtn>
      </FooterBtnContainer>
    </PageWrapper>
  );
}
