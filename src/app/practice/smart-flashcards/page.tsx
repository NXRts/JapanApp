'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import SwipeableCard, { FlashcardData } from '@/components/Card/SwipeableCard';

const PageWrapper = styled.div`
  min-height: 90vh;
  width: 100%;
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
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
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

const DeckContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 500px;
  margin-top: 2rem;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 4rem;
  
  button {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: none;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    
    &:hover {
      transform: scale(1.1);
    }
    
    &:active {
      transform: scale(0.95);
    }
    
    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

const StudyBtn = styled.button`
  background: white;
  color: #ef4444;
  border: 2px solid #fee2e2 !important;
  
  &:hover {
    box-shadow: 0 10px 25px rgba(239, 68, 68, 0.2);
  }
`;

const KnowBtn = styled.button`
  background: white;
  color: #22c55e;
  border: 2px solid #dcfce7 !important;
  
  &:hover {
    box-shadow: 0 10px 25px rgba(34, 197, 94, 0.2);
  }
`;

const SummaryScreen = styled.div`
  text-align: center;
  animation: fadeIn 0.5s ease-out;
  background: var(--surface);
  padding: 4rem;
  border-radius: 32px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  max-width: 600px;
  width: 100%;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 3rem 0;
`;

const StatBlock = styled.div`
  p {
    color: var(--text-secondary);
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
  h3 {
    font-size: 3rem;
    font-weight: 800;
    color: var(--foreground);
    margin: 0;
  }
`;

const ActionBtn = styled.button`
  padding: 1rem 3rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1.2rem;
  border: none;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(79, 70, 229, 0.4);
  }
`;

import { allVocabulary } from '@/lib/dictionary';

interface DeckCard extends FlashcardData {
  level: string;
}

// Map all vocabulary (which internally includes JLPTWords.json) to Flashcard format
const FULL_DECK: DeckCard[] = allVocabulary.map((item: any) => ({
  id: item.id || `word-${Math.random()}`,
  front: item.word || item.reading || '?',
  romaji: item.romaji || `[Level: ${item.level}]`,
  meaning: item.meaning ? item.meaning.split(',')[0].trim() : 'No definition',
  audioText: item.reading || item.word || '',
  level: item.level || '?'
}));

export default function SmartFlashcardsPage() {
  const [deck, setDeck] = useState<DeckCard[]>([]);
  const [knownCount, setKnownCount] = useState(0);
  const [studyCount, setStudyCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [levelFilter, setLevelFilter] = useState('All');

  const loadDeck = (filter: string) => {
    let pool = FULL_DECK;
    if (filter !== 'All') {
      pool = FULL_DECK.filter(card => card.level === filter);
    }
    
    // Shuffle and cap at 10 items
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setDeck(shuffled.slice(0, 10));
    setKnownCount(0);
    setStudyCount(0);
    setIsFinished(false);
  };

  useEffect(() => {
    loadDeck(levelFilter);
  }, [levelFilter]);

  const handleSwipe = (dir: 'left' | 'right', card: FlashcardData) => {
    if (dir === 'right') {
      setKnownCount(prev => prev + 1);
    } else {
      setStudyCount(prev => prev + 1);
    }
    
    // Remove the card from the top of the deck
    setDeck(prevDeck => {
      const newDeck = [...prevDeck];
      newDeck.shift(); // Remove top card
      
      // If no cards left, show summary
      if (newDeck.length === 0) {
        setTimeout(() => setIsFinished(true), 300);
      }
      return newDeck;
    });
  };

  // Button handlers that simulate swipe
  const handleSimulateSwipe = (dir: 'left' | 'right') => {
    if (deck.length === 0) return;
    const currentCard = deck[0];
    
    // Dispatch custom event to the card visually if we wanted to
    // or just process it directly
    handleSwipe(dir, currentCard);
  };

  const restart = () => {
    loadDeck(levelFilter);
  };

  return (
    <PageWrapper>
      <Container>
        <Header>
          <BackLink href="/practice">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Practice
          </BackLink>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <select 
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '999px',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--foreground)',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <option value="All">All Levels</option>
              <option value="N5">N5</option>
              <option value="N4">N4</option>
              <option value="N3">N3</option>
              <option value="N2">N2</option>
              <option value="N1">N1</option>
            </select>
            <div style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>
              Remaining: {deck.length}
            </div>
            <button 
              onClick={restart} 
              title="Refresh / Shuffle Deck"
              style={{ 
                background: 'rgba(79, 70, 229, 0.1)', 
                color: 'var(--primary)', 
                border: 'none', 
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'rotate(30deg)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'rotate(0deg)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
            </button>
          </div>
        </Header>

        {!isFinished ? (
          <>
            <DeckContainer>
              {deck.map((card, idx) => (
                <SwipeableCard
                  key={card.id}
                  card={card}
                  index={idx}
                  active={idx === 0}
                  onSwipe={handleSwipe}
                />
              ))}
            </DeckContainer>

            {deck.length > 0 && (
               <ControlsContainer>
                 <StudyBtn onClick={() => handleSimulateSwipe('left')} aria-label="Study Again">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                     <line x1="18" y1="6" x2="6" y2="18"></line>
                     <line x1="6" y1="6" x2="18" y2="18"></line>
                   </svg>
                 </StudyBtn>
                 <KnowBtn onClick={() => handleSimulateSwipe('right')} aria-label="Known">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M20 6L9 17l-5-5"></path>
                   </svg>
                 </KnowBtn>
               </ControlsContainer>
            )}
          </>
        ) : (
          <SummaryScreen>
            <Title>Session Complete! 🎉</Title>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
              Awesome job! Keep your daily streak going.
            </p>
            
            <StatRow>
              <StatBlock>
                <p>Mastered</p>
                <h3 style={{ color: '#22c55e' }}>{knownCount}</h3>
              </StatBlock>
              <StatBlock>
                <p>To Review</p>
                <h3 style={{ color: '#ef4444' }}>{studyCount}</h3>
              </StatBlock>
            </StatRow>

            <ActionBtn onClick={restart}>Study Again</ActionBtn>
          </SummaryScreen>
        )}
      </Container>
    </PageWrapper>
  );
}
