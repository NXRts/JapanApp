'use client';

import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useProgress } from '@/context/ProgressContext';
import { isItemDue } from '@/lib/srs';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  min-height: calc(100vh - 70px);
  padding: 4rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--foreground);
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: var(--surface);
  border-radius: 24px;
  border: 1px solid var(--border);
  width: 100%;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--foreground);
  }
  
  p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.4);
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 500px;
  background: var(--surface);
  border-radius: 24px;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border);
`;

const CharacterDisplay = styled.div`
  font-size: 8rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 2rem;
  line-height: 1;
`;

const Instruction = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.25rem;
  border-radius: 12px;
  border: 2px solid var(--border);
  background: var(--background);
  color: var(--foreground);
  text-align: center;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const ResultMessage = styled.div<{ $correct: boolean }>`
  margin-top: 1.5rem;
  padding: 1rem;
  width: 100%;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  background: ${({ $correct }) => $correct ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  color: ${({ $correct }) => $correct ? '#10b981' : '#ef4444'};
`;

const ProgressInfo = styled.div`
  margin-top: 2rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

// Minimal dictionary mapping just to make the UI work without a massive file block.
// In a full implementation, you'd fetch this from the existing JSONs or API.
const dictCache: Record<string, string> = {}; 

export default function ReviewPage() {
  const { progress, updateSRS } = useProgress();
  const [dueItems, setDueItems] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');

  // 1. Identify due items on mount
  useEffect(() => {
    const items = Object.entries(progress.srs)
      .filter(([_, data]) => isItemDue(data))
      .map(([char]) => char);
    
    // Shuffle
    setDueItems(items.sort(() => Math.random() - 0.5));
  }, []);

  // 2. Fetch romaji for the current character
  useEffect(() => {
    if (dueItems.length === 0 || currentIndex >= dueItems.length) return;
    
    const char = dueItems[currentIndex];
    
    // If we don't have it cached, we fetch it (simplified for this demo logic)
    if (!dictCache[char]) {
        // Fallback or async fetch would go here
        // For now, we simulate we just know it or ask them to type something specific.
        // In reality, you'd query your API: /api/kana/hiragana etc.
    }
  }, [currentIndex, dueItems]);

  const currentItem = dueItems[currentIndex];
  const isFinished = dueItems.length > 0 && currentIndex >= dueItems.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showResult || !inputValue.trim()) return;

    // Simulate validation - IN REALITY you check against the Romaji dictionary
    // We will hook this up to the wanakana library which the project already uses
    import('wanakana').then(wanakana => {
        const expectedRomaji = wanakana.toRomaji(currentItem).toLowerCase();
        const userInput = inputValue.toLowerCase().trim();
        const correct = expectedRomaji === userInput;
        
        setIsCorrect(correct);
        setCorrectAnswer(expectedRomaji);
        setShowResult(true);

        // Update SRS
        // Quality 4 for correct, Quality 1 for incorrect
        updateSRS(currentItem, correct ? 4 : 1);

        // Move to next after delay
        setTimeout(() => {
            setShowResult(false);
            setInputValue('');
            setCurrentIndex(prev => prev + 1);
        }, 1500);
    });
  };

  if (dueItems.length === 0) {
    return (
      <Container>
        <Header>
          <Title>Reviews</Title>
          <Subtitle>Spaced Repetition System</Subtitle>
        </Header>
        <EmptyState>
          <h2>You're all caught up! 🎉</h2>
          <p>There are no items due for review right now. Come back later or learn some new items.</p>
          <PrimaryButton href="/practice">Learn New Items</PrimaryButton>
        </EmptyState>
      </Container>
    );
  }

  if (isFinished) {
    return (
      <Container>
        <Header>
          <Title>Session Complete</Title>
        </Header>
        <EmptyState>
          <h2>Great job! 🎯</h2>
          <p>You've finished all your reviews for now.</p>
          <PrimaryButton href="/">Return Home</PrimaryButton>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Reviews</Title>
        <Subtitle>Spaced Repetition System</Subtitle>
      </Header>

      <Card>
        <CharacterDisplay>{currentItem}</CharacterDisplay>
        <Instruction>Type the romaji reading:</Instruction>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={showResult}
            autoFocus
            autoComplete="off"
            placeholder="e.g. a, ka, sa..."
          />
        </form>

        {showResult && (
          <ResultMessage $correct={isCorrect}>
            {isCorrect ? 'Correct!' : `Incorrect. The correct reading is: ${correctAnswer}`}
          </ResultMessage>
        )}
      </Card>

      <ProgressInfo>
        Review {currentIndex + 1} of {dueItems.length}
      </ProgressInfo>
    </Container>
  );
}
