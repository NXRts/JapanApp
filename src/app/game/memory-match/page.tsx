'use client';

import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { toRomaji } from 'wanakana';
import { useProgress } from '@/context/ProgressContext';

// Styled Components
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: radial-gradient(circle at center, rgba(245, 158, 11, 0.05) 0%, transparent 70%);

  @media (max-width: 600px) {
    padding: 2rem 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  max-width: 800px;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const TitleBadge = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #f59e0b; /* Amber 500 */
  background: rgba(245, 158, 11, 0.1);
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  border: 1px solid rgba(245, 158, 11, 0.2);
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const RefreshButton = styled.button<{ $isRefreshing?: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #f59e0b;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px; /* Slightly larger hit area */
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* smoother transition */
  
  &:hover {
    background: rgba(245, 158, 11, 0.2);
    /* Subtle hover scale, we don't spin on hover anymore for a cleaner click effect */
    transform: scale(1.1); 
  }

  /* Spin when active/refreshing */
  ${({ $isRefreshing }) => $isRefreshing && `
    transform: rotate(360deg) scale(1.1);
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  `}

  svg {
    width: 18px;
    height: 18px;
  }
`;

const GameBoard = styled.div`
  background: var(--surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 32px;
  border: 1px solid var(--border);
  padding: 3rem;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 1.5rem;
    border-radius: 24px;
  }
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-secondary);

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  
  @media (max-width: 600px) {
    /* To keep 16 cards (8 pairs) we should stick to 4x4 even on mobile or make it tighter */
    grid-template-columns: repeat(4, 1fr);
    gap: 0.4rem;
  }
`;

const CardContainer = styled.div<{ $isFlipped: boolean, $isMatched: boolean }>`
  aspect-ratio: 1 / 1;
  perspective: 1000px;
  cursor: ${({ $isMatched }) => ($isMatched ? 'default' : 'pointer')};
  opacity: ${({ $isMatched }) => ($isMatched ? 0.5 : 1)};
  transition: opacity 0.3s ease;
`;

const CardInner = styled.div<{ $isFlipped: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ $isFlipped }) => ($isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 800;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  @media (max-width: 600px) {
    font-size: 1.75rem; 
    border-radius: 8px; /* Tighter rounding for smaller cards */
    border-width: 1px;
  }
`;

const CardFront = styled(CardFace)`
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.2) 100%);
  border: 2px solid rgba(245, 158, 11, 0.3);
  color: transparent;
  
  &::before {
    content: '?';
    color: #f59e0b;
    font-size: 2.5rem;
    font-weight: 900;
    opacity: 0.5;

    @media (max-width: 600px) {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 600px) {
    border-width: 1px;
  }
`;

const CardBack = styled(CardFace) <{ $type: 'hiragana' | 'katakana', $isMatched: boolean }>`
  background: var(--background);
  border: 2px solid ${({ $isMatched }) => ($isMatched ? '#10b981' : 'var(--border)')};
  color: ${({ $isMatched }) => ($isMatched ? '#10b981' : 'var(--foreground)')};
  transform: rotateY(180deg);
  
  /* Optional: differentiate hiragana/katakana slightly by text color if not matched */
  ${({ $isMatched, $type }) => !$isMatched && `
    color: ${$type === 'hiragana' ? '#3b82f6' : '#ec4899'};
  `}
`;

const Button = styled.button`
  padding: 1rem 3rem;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px rgba(245, 158, 11, 0.3);
  margin-top: 2rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 25px -5px rgba(245, 158, 11, 0.4);
  }
`;

const GameOverScreen = styled.div`
  text-align: center;
  padding: 2rem 0;
`;

interface Card {
  id: string; // unique string id
  char: string;
  romaji: string;
  type: 'hiragana' | 'katakana';
  pairId: number; // to match Hiragana with Katakana
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatchPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showRomaji, setShowRomaji] = useState(false);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const PAIRS_COUNT = 8; // Number of pairs to match (16 cards total)
  const MAX_MOVES = 30; // Limit when Easy Mode (showRomaji) is on

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const generateGame = useCallback(async () => {
    setIsLoading(true);
    setIsRefreshing(true);

    try {
      const res = await fetch('/api/kana');
      const data: { hiragana: string[], katakana: string[] } = await res.json();

      const { hiragana, katakana } = data;
      const totalAvailable = Math.min(hiragana.length, katakana.length);

      // Select random pairs
      const indices = Array.from({ length: totalAvailable }, (_, i) => i);
      const shuffledIndices = shuffleArray(indices).slice(0, PAIRS_COUNT);

      const newCards: Card[] = [];
      shuffledIndices.forEach((dictIndex, i) => {
        newCards.push({
          id: `h-${i}`,
          char: hiragana[dictIndex],
          romaji: toRomaji(hiragana[dictIndex]),
          type: 'hiragana',
          pairId: dictIndex, // This is the matching identifier
          isFlipped: false,
          isMatched: false
        });
        newCards.push({
          id: `k-${i}`,
          char: katakana[dictIndex],
          romaji: toRomaji(katakana[dictIndex]),
          type: 'katakana',
          pairId: dictIndex,
          isFlipped: false,
          isMatched: false
        });
      });

      setCards(shuffleArray(newCards));
      setFlippedIndices([]);
      setMoves(0);
      setMatches(0);
      setGameStatus('playing');

      // Reset rotation animation after a short delay
      setTimeout(() => setIsRefreshing(false), 600);
    } catch (error) {
      console.error("Failed to fetch kana for Memory Match", error);
      setIsRefreshing(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize game on mount
  useEffect(() => {
    generateGame();
  }, [generateGame]);

  const { addExp } = useProgress();

  const handleCardClick = (index: number) => {
    // Prevent clicking if two cards are already flipped, or if card is already flipped/matched, or game not active
    if (gameStatus !== 'playing' || flippedIndices.length >= 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    // Optimistically flip the card
    setCards(prev => {
      const copy = [...prev];
      copy[index].isFlipped = true;
      return copy;
    });

    // If two cards are flipped, check for match
    if (newFlippedIndices.length === 2) {
      const newMoves = moves + 1;
      setMoves(newMoves);

      const firstIndex = newFlippedIndices[0];
      const secondIndex = newFlippedIndices[1];

      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
        // Match!
        setTimeout(() => {
          setCards(prev => {
            const copy = [...prev];
            copy[firstIndex].isMatched = true;
            copy[secondIndex].isMatched = true;
            return copy;
          });

          setMatches(m => {
            const newMatches = m + 1;
            if (newMatches === PAIRS_COUNT) {
              setGameStatus('won');
              addExp(120); // Reward for winning (balanced)
            } else if (showRomaji && newMoves >= MAX_MOVES) {
              setGameStatus('lost');
            }
            return newMatches;
          });
          setFlippedIndices([]);
        }, 600);
      } else {
        // No match, flip back
        setTimeout(() => {
          setCards(prev => {
            const copy = [...prev];
            copy[firstIndex].isFlipped = false;
            copy[secondIndex].isFlipped = false;
            return copy;
          });
          setFlippedIndices([]);
          if (showRomaji && newMoves >= MAX_MOVES) {
            setGameStatus('lost');
          }
        }, 1000);
      }
    }
  };

  return (
    <Container>
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Games Hub', href: '/game' }
        ]} 
        current="Memory Match" 
      />

      <Header>
        <TitleBadge>
          Memory Match
          <RefreshButton
            $isRefreshing={isRefreshing}
            onClick={generateGame}
            title="Restart Game"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </RefreshButton>
        </TitleBadge>
      </Header>

      <GameBoard>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
            Loading cards...
          </div>
        ) : gameStatus !== 'playing' ? (
          <GameOverScreen>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: gameStatus === 'won' ? '#f59e0b' : '#ef4444' }}>
              {gameStatus === 'won' ? 'You Won! 🎉' : 'Game Over! 😢'}
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              {gameStatus === 'won'
                ? `You matched all ${PAIRS_COUNT} pairs in ${moves} moves.`
                : `You reached the limit of ${MAX_MOVES} moves. Keep practicing without Romaji if you prefer no limit!`}
            </p>
            {gameStatus === 'won' && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#f59e0b',
                background: 'rgba(245, 158, 11, 0.1)',
                padding: '0.6rem 1.5rem',
                borderRadius: '999px',
                fontWeight: 800,
                fontSize: '1.25rem',
                marginBottom: '2rem',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.1)'
              }}>
                ⭐ +120 EXP Gained
              </div>
            )}
            <br />
            <Button onClick={generateGame}>Play Again</Button>
          </GameOverScreen>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
              <input
                type="checkbox"
                id="showRomaji"
                checked={showRomaji}
                onChange={(e) => setShowRomaji(e.target.checked)}
                disabled={moves > 0}
                style={{ width: '18px', height: '18px', cursor: moves > 0 ? 'not-allowed' : 'pointer' }}
              />
              <label htmlFor="showRomaji" style={{ color: 'var(--text-secondary)', fontWeight: 600, cursor: moves > 0 ? 'not-allowed' : 'pointer' }}>
                Show Romaji letters (Max 30 moves limit)
              </label>
            </div>
            <StatsRow>
              <div>Moves: <span style={{ color: showRomaji && moves >= 25 ? '#ef4444' : '#f59e0b' }}>{moves}{showRomaji ? ` / ${MAX_MOVES}` : ''}</span></div>
              <div>Matches: <span style={{ color: '#10b981' }}>{matches} / {PAIRS_COUNT}</span></div>
            </StatsRow>

            <CardsGrid>
              {cards.map((card, index) => (
                <CardContainer
                  key={card.id}
                  $isFlipped={card.isFlipped}
                  $isMatched={card.isMatched}
                  onClick={() => handleCardClick(index)}
                >
                  <CardInner $isFlipped={card.isFlipped}>
                    <CardFront />
                    <CardBack $type={card.type} $isMatched={card.isMatched}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span>{card.char}</span>
                        {showRomaji && <span style={{ fontSize: '1.25rem', marginTop: '0.2rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{card.romaji}</span>}
                      </div>
                    </CardBack>
                  </CardInner>
                </CardContainer>
              ))}
            </CardsGrid>
          </>
        )}
      </GameBoard>
    </Container>
  );
}
