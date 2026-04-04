'use client';

import React, { useState, useEffect, Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { searchDictionary, allVocabulary, allKanji, allGrammar } from '@/lib/dictionary';

// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// --- Styled Components ---
const PageWrapper = styled.div`
  min-height: 100vh;
  color: var(--foreground);
  background-image: radial-gradient(var(--dot-color) 1.2px, transparent 1.2px);
  background-size: 32px 32px;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 640px) {
    padding: 2rem 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  width: 100%;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
  text-align: right;
  
  @media (max-width: 600px) {
    align-items: flex-start;
    text-align: left;
  }
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.2rem;
  color: var(--text-secondary);

  a {
    color: var(--foreground);
    text-decoration: none;
    font-weight: 800;
    letter-spacing: -0.02em;
    transition: color 0.2s;
    
    &:hover {
      color: var(--primary);
    }
  }

  span.separator {
    opacity: 0.3;
    font-weight: 300;
  }

  span.current {
    font-weight: 400;
    opacity: 0.8;
  }
`;

const PracticeCard = styled.div`
  background: var(--surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 32px;
  border: 1px solid var(--border);
  padding: 4rem 3rem;
  text-align: center;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 600px) {
    padding: 2.5rem 1.5rem;
    border-radius: 24px;
  }
`;

const SetupTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  background: linear-gradient(135deg, var(--foreground) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SelectionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
`;

const SelectionLabel = styled.label`
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 1rem;
  text-align: left;
`;

const LevelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.75rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const OptionButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? 'var(--primary)' : 'rgba(var(--foreground-rgb), 0.03)')};
  color: ${({ $active }) => ($active ? 'white' : 'var(--foreground)')};
  border: 1px solid ${({ $active }) => ($active ? 'var(--primary)' : 'var(--border)')};
  padding: 0.85rem;
  border-radius: 16px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary);
    color: ${({ $active }) => ($active ? 'white' : 'var(--primary)')};
    box-shadow: var(--shadow-sm);
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProgressInfo = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-secondary);
  background: rgba(var(--foreground-rgb), 0.05);
  padding: 0.4rem 1rem;
  border-radius: 99px;

  @media (max-width: 600px) {
    top: 20px;
    right: 20px;
    font-size: 0.85rem;
  }
`;

const ItemLevelBadge = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 600px) {
    top: 20px;
    left: 20px;
  }
`;

const MainText = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  line-height: 1.1;
  color: var(--foreground);
  
  @media (max-width: 600px) {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
`;

const RevealSection = styled.div<{ $isVisible: boolean }>`
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: ${({ $isVisible }) => ($isVisible ? 'translateY(0)' : 'translateY(10px)')};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  margin-top: 1rem;
`;

const ReadingText = styled.div`
  font-size: 1.5rem;
  color: var(--text-secondary);
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const MeaningText = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 2.5rem;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 600px) {
    gap: 1rem;
  }
`;

const FinalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2.5rem;
  flex-wrap: wrap;
`;

const BaseButton = styled.button`
  padding: 1.25rem 2rem;
  border-radius: 20px;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border: none;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const PrimaryButton = styled(BaseButton)`
  background: var(--primary);
  color: white;
  width: 100%;
  box-shadow: 0 10px 15px -3px rgba(var(--primary-rgb, 79, 70, 229), 0.3);
`;

const ConfidenceButton = styled(BaseButton)<{ $success?: boolean }>`
  background: ${({ $success }) => ($success ? 'rgba(var(--secondary-rgb, 16, 185, 129), 0.1)' : 'rgba(var(--accent-rgb, 244, 63, 94), 0.1)')};
  color: var(${({ $success }) => ($success ? '--secondary' : '--accent')});
  border: 1px solid var(${({ $success }) => ($success ? '--secondary' : '--accent')});
  
  &:hover {
    background: var(${({ $success }) => ($success ? '--secondary' : '--accent')});
    color: white;
    box-shadow: 0 10px 15px -3px ${({ $success }) => ($success ? 'rgba(var(--secondary-rgb), 0.3)' : 'rgba(var(--accent-rgb), 0.3)')};
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: var(--border);
  border-radius: 999px;
  margin-top: 3rem;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => `${$percent}%`};
  background: linear-gradient(90deg, var(--primary), var(--primary-dark, #4f46e5));
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 999px;
`;

const SpeakerButton = styled.button`
  background: rgba(var(--primary-rgb), 0.1);
  border: none;
  color: var(--primary);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 auto 2.5rem auto;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
    background: var(--primary);
    color: white;
  }

  svg {
    width: 28px;
    height: 28px;
  }
`;

const StatsHeader = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 2rem 0;
`;

const StatItem = styled.div<{ $color: string }>`
  padding: 1.5rem;
  background: rgba(var(--foreground-rgb), 0.03);
  border: 1px solid var(--border);
  border-radius: 20px;
  
  .label {
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
  
  .value {
    font-size: 2rem;
    font-weight: 800;
    color: ${({ $color }) => $color};
  }
`;

// --- Logic ---
function shuffleArray(array: any[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function PracticeContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = (searchParams.get('category') as any) || 'kata';
  const initialLevel = searchParams.get('level') || 'N5';

  const [items, setItems] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [sessionState, setSessionState] = useState<'setup' | 'loading' | 'practicing' | 'completed' | 'error'>('setup');
  const [stats, setStats] = useState({ remembered: 0, forgotten: 0 });
  
  // Setup state
  const [setupLevel, setSetupLevel] = useState(initialLevel);
  const [setupCategory, setSetupCategory] = useState(initialCategory);

  const startSession = async () => {
    setSessionState('loading');
    try {
      let baseData: any[] = [];
      
      if (initialQuery && initialQuery.trim() !== '') {
        baseData = await searchDictionary(initialQuery, setupCategory as any, setupLevel);
      } else {
        if (setupCategory === 'kanji') baseData = allKanji;
        else if (setupCategory === 'tata-bahasa') baseData = allGrammar;
        else baseData = allVocabulary.filter(v => v.id.startsWith('lib-'));
        
        if (setupLevel !== 'All') {
          baseData = baseData.filter(item => item.level === setupLevel);
        }
      }
      
      if (baseData.length === 0) {
        setSessionState('error');
        return;
      }
      
      const shuffled = shuffleArray(baseData);
      setItems(shuffled.slice(0, 20)); // Limit to 20 items per session
      setSessionState('practicing');
      setCurrentIndex(0);
      setIsRevealed(false);
      setStats({ remembered: 0, forgotten: 0 });
    } catch (err) {
      setSessionState('error');
    }
  };

  const handleReveal = () => setIsRevealed(true);

  const handleConfidence = (remembered: boolean) => {
    if (remembered) setStats(prev => ({ ...prev, remembered: prev.remembered + 1 }));
    else setStats(prev => ({ ...prev, forgotten: prev.forgotten + 1 }));

    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsRevealed(false);
    } else {
      setSessionState('completed');
    }
  };

  const playAudio = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentItem = items[currentIndex];

  const getDisplayMain = (item: any) => {
    if (item.type === 'kanji') return item.kanji;
    if (item.type === 'grammar') return item.title;
    return item.word || item.title;
  };

  const getDisplayReading = (item: any) => {
    if (item.type === 'kanji') {
      return [...(item.onyomi || []), ...(item.kunyomi || [])].join(', ');
    }
    return item.reading || item.romaji || '';
  };

  return (
    <PageWrapper>
      <Container>
        <Header>
          <Breadcrumbs>
            <Link href="/jlpt">JLPT</Link> <span className="separator">/</span> <span className="current">Practice</span>
          </Breadcrumbs>
          
          <HeaderRight>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Practice Session
            </div>
            {sessionState === 'practicing' && (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {setupLevel} • {setupCategory.charAt(0).toUpperCase() + setupCategory.slice(1).replace('-', ' ')}
              </div>
            )}
          </HeaderRight>
        </Header>

        {sessionState === 'setup' && (
          <PracticeCard>
            <SetupTitle>Start Practice</SetupTitle>
            <SelectionGroup>
              <div>
                <SelectionLabel>Select Level</SelectionLabel>
                <LevelGrid>
                  {['All', 'N1', 'N2', 'N3', 'N4', 'N5'].map((l) => (
                    <OptionButton 
                      key={l} 
                      $active={setupLevel === l} 
                      onClick={() => setSetupLevel(l)}
                    >
                      {l}
                    </OptionButton>
                  ))}
                </LevelGrid>
              </div>

              <div>
                <SelectionLabel>Select Category</SelectionLabel>
                <CategoryGrid>
                  {[
                    { id: 'kata', label: 'Vocabulary' },
                    { id: 'kanji', label: 'Kanji' },
                    { id: 'tata-bahasa', label: 'Grammar' }
                  ].map((c) => (
                    <OptionButton 
                      key={c.id} 
                      $active={setupCategory === c.id} 
                      onClick={() => setSetupCategory(c.id as any)}
                    >
                      {c.label}
                    </OptionButton>
                  ))}
                </CategoryGrid>
              </div>
            </SelectionGroup>

            <PrimaryButton onClick={startSession}>
              Start Session
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </PrimaryButton>
          </PracticeCard>
        )}

        {sessionState === 'loading' && (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '1.1rem' }}>Preparing practice materials...</p>
          </div>
        )}

        {sessionState === 'error' && (
          <PracticeCard>
            <h2 style={{ color: 'var(--foreground)' }}>Insufficient Data</h2>
            <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
              Sorry, we couldn't find data matching your filters for this practice session.
            </p>
            <FinalActions>
              <BaseButton onClick={() => setSessionState('setup')} style={{ background: 'var(--primary)', color: 'white', flex: 1 }}>
                Change Settings
              </BaseButton>
              <Link href="/jlpt" style={{ textDecoration: 'none', flex: 1 }}>
                <BaseButton style={{ background: 'transparent', color: 'var(--foreground)', border: '1px solid var(--border)', width: '100%' }}>
                  Back
                </BaseButton>
              </Link>
            </FinalActions>
          </PracticeCard>
        )}

        {sessionState === 'practicing' && currentItem && (
          <>
            <PracticeCard>
              <ItemLevelBadge>{currentItem.level}</ItemLevelBadge>
              <ProgressInfo>
                {currentIndex + 1} / {items.length}
              </ProgressInfo>

              <SpeakerButton onClick={() => playAudio(getDisplayMain(currentItem))} title="Play Audio">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
              </SpeakerButton>

              <MainText>{getDisplayMain(currentItem)}</MainText>

              {!isRevealed ? (
                <PrimaryButton onClick={handleReveal} style={{ marginTop: '2rem' }}>
                  Show Answer
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </PrimaryButton>
              ) : (
                <RevealSection $isVisible={isRevealed}>
                  <ReadingText>{getDisplayReading(currentItem)}</ReadingText>
                  <MeaningText>{currentItem.meaning}</MeaningText>
                  
                  <ActionGrid>
                    <ConfidenceButton onClick={() => handleConfidence(false)}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                      Forgot
                    </ConfidenceButton>
                    <ConfidenceButton $success onClick={() => handleConfidence(true)}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                      Remembered
                    </ConfidenceButton>
                  </ActionGrid>
                </RevealSection>
              )}
            </PracticeCard>
            
            <ProgressBarContainer>
              <ProgressFill $percent={((currentIndex + 1) / items.length) * 100} />
            </ProgressBarContainer>
          </>
        )}

        {sessionState === 'completed' && (
          <PracticeCard style={{ animation: `${slideIn} 0.8s ease-out` }}>
            <StatsHeader>🎉</StatsHeader>
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Session Complete!</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>You have completed your practice session.</p>
            
            <StatsGrid>
              <StatItem $color="var(--secondary)">
                <div className="label">Remembered</div>
                <div className="value">{stats.remembered}</div>
              </StatItem>
              <StatItem $color="var(--accent)">
                <div className="label">Needs Review</div>
                <div className="value">{stats.forgotten}</div>
              </StatItem>
            </StatsGrid>
            
            <FinalActions>
              <BaseButton onClick={() => {
                  setItems(shuffleArray(items));
                  setCurrentIndex(0);
                  setIsRevealed(false);
                  setStats({ remembered: 0, forgotten: 0 });
                  setSessionState('practicing');
                }} style={{ background: 'var(--primary)', color: 'white', flex: 1, minWidth: '160px' }}>
                Repeat Session
              </BaseButton>
              <BaseButton onClick={() => setSessionState('setup')} style={{ background: 'transparent', color: 'var(--foreground)', border: '1px solid var(--border)', flex: 1, minWidth: '160px' }}>
                Change Settings
              </BaseButton>
              <Link href="/jlpt" style={{ textDecoration: 'none', width: '100%' }}>
                <BaseButton style={{ background: 'transparent', color: 'var(--text-secondary)', border: 'none', width: '100%', fontSize: '0.95rem' }}>
                  Back to JLPT
                </BaseButton>
              </Link>
            </FinalActions>
          </PracticeCard>
        )}
      </Container>
    </PageWrapper>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading Session...</div>}>
      <PracticeContent />
    </Suspense>
  );
}
