'use client';

import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { toRomaji } from 'wanakana';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* Premium radial background */
  background: radial-gradient(circle at center, rgba(79, 70, 229, 0.05) 0%, transparent 70%);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const BackButton = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.2s;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: rgba(255,255,255,0.05);

  &:hover {
    color: var(--primary);
    background: rgba(79, 70, 229, 0.1);
  }
`;

const ScoreBadge = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
  background: rgba(79, 70, 229, 0.1);
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  border: 1px solid rgba(79, 70, 229, 0.2);
`;

const QuizCard = styled.div`
  background: var(--surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 32px;
  border: 1px solid var(--border);
  padding: 4rem 3rem;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;

  @media (max-width: 600px) {
    padding: 2.5rem 1.5rem;
    border-radius: 24px;
  }
`;

const ProgressInfo = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary);
  opacity: 0.7;

  @media (max-width: 600px) {
    top: 20px;
    right: 20px;
    font-size: 0.85rem;
  }
`;

const Character = styled.div`
  font-size: 9rem;
  font-weight: 800;
  margin-bottom: 3.5rem;
  line-height: 1;
  background: linear-gradient(135deg, var(--foreground) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
  
  @media (max-width: 600px) {
    font-size: 6rem;
    margin-bottom: 2rem;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: 600px) {
    /* Keep 2 columns on mobile to save vertical space */
    grid-template-columns: repeat(2, 1fr); 
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
`;

const OptionButton = styled.button<{ $state?: 'correct' | 'incorrect' | 'neutral' }>`
  padding: 1.5rem;
  border-radius: 20px;
  border: 2px solid ${({ $state }) =>
    $state === 'correct' ? '#10b981' :
      $state === 'incorrect' ? '#ef4444' :
        'var(--border)'};
  background: ${({ $state }) =>
    $state === 'correct' ? 'rgba(16, 185, 129, 0.1)' :
      $state === 'incorrect' ? 'rgba(239, 68, 68, 0.1)' :
        'var(--surface)'};
  color: ${({ $state }) =>
    $state === 'correct' ? '#10b981' :
      $state === 'incorrect' ? '#ef4444' :
        'var(--foreground)'};
  font-size: 1.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: ${({ $state }) => $state && $state !== 'neutral' ? 'none' : 'auto'};
  box-shadow: ${({ $state }) =>
    $state === 'neutral' ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none'};

  &:hover {
    transform: ${({ $state }) => $state === 'neutral' ? 'translateY(-3px)' : 'none'};
    border-color: ${({ $state }) => $state === 'neutral' ? 'var(--primary)' : ''};
    box-shadow: ${({ $state }) => $state === 'neutral' ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : ''};
  }
  
  &:active {
    transform: ${({ $state }) => $state === 'neutral' ? 'translateY(-1px)' : 'none'};
  }

  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
    font-size: 1.25rem;
    border-radius: 16px;
    border-width: 1px;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background: var(--border);
  border-radius: 99px;
  margin-top: 1rem;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => `${$percent}%`};
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(79, 70, 229, 0.5);
  border-radius: 99px;
`;

const ResultOverlay = styled.div`
  text-align: center;
  animation: fadeIn 0.8s ease-out;
  padding: 3rem;
  background: var(--surface);
  border-radius: 32px;
  border: 1px solid var(--border);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding: 2rem 1.5rem;
    border-radius: 24px;
  }

  h2 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    /* Use theme variables for dynamic color */
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media (max-width: 600px) {
        font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.5rem;
    color: var(--text-secondary);
    margin-bottom: 3rem;

    @media (max-width: 600px) {
        font-size: 1.25rem;
        margin-bottom: 2rem;
    }
  }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;

    @media (max-width: 600px) {
        flex-direction: column;
        width: 100%;
    }
`;

const ActionLink = styled(Link)`
  text-decoration: none;
  display: flex;
  
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 1rem 3rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);
  
  /* Ensure perfect centering */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  /* border: none; - Default is none, no need to add transparent border which causes artifacts */

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 25px -5px rgba(79, 70, 229, 0.4);
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 1rem; /* Less padding to relying on width */
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: var(--foreground); /* Use foreground for better contrast */
  box-shadow: inset 0 0 0 2px var(--border); /* Use inset shadow instead of border for sizing match */
  
  &:hover {
    background: rgba(255,255,255,0.05);
    box-shadow: inset 0 0 0 2px var(--text-secondary); /* Update shadow on hover */
  }
`;

interface Question {
  char: string;
  romaji: string;
  options: string[]; // 4 romaji options
}

export default function KanaQuizPage() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Game config
  const TOTAL_QUESTIONS = 10;

  const generateQuiz = useCallback(async () => {
    setLoading(true);
    setIsFinished(false);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);

    try {
      const res = await fetch('/api/kana?type=all');
      const data: string[] = await res.json();

      // Fisher-Yates shuffle function
      const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
      };

      // Shuffle initial data
      const shuffled = shuffleArray(data);
      const selectedChars = shuffled.slice(0, TOTAL_QUESTIONS);

      const newQuestions = selectedChars.map(char => {
        const correctRomaji = toRomaji(char);

        // Generate distractors
        const distractors: string[] = [];
        while (distractors.length < 3) {
          const randomChar = data[Math.floor(Math.random() * data.length)];
          const romaji = toRomaji(randomChar);
          if (romaji !== correctRomaji && !distractors.includes(romaji)) {
            distractors.push(romaji);
          }
        }

        // Shuffle options
        return {
          char,
          romaji: correctRomaji,
          options: shuffleArray([...distractors, correctRomaji])
        };
      });

      setQuestions(newQuestions);
    } catch (error) {
      console.error("Failed to generate quiz", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    generateQuiz();
  }, [generateQuiz]);

  const handleAnswer = (option: string) => {
    if (selectedOption) return; // Prevent double clicking
    setSelectedOption(option);

    const isCorrect = option === questions[currentIndex].romaji;
    if (isCorrect) {
      setScore(s => s + 1);
    }

    // Auto next after delay
    setTimeout(() => {
      if (currentIndex < TOTAL_QUESTIONS - 1) {
        setCurrentIndex(i => i + 1);
        setSelectedOption(null);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
          Generating Quiz...
        </div>
      </Container>
    );
  }

  if (isFinished) {
    return (
      <Container>
        <ResultOverlay>
          <h2>Quiz Complete!</h2>
          <p>You scored <strong>{score}</strong> out of <strong>{TOTAL_QUESTIONS}</strong></p>
          <ButtonGroup>
            <Button onClick={generateQuiz}>Try Again</Button>
            <ActionLink href="/practice">
              <SecondaryButton>Exit</SecondaryButton>
            </ActionLink>
          </ButtonGroup>
        </ResultOverlay>
      </Container>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Container>
      <Header>
        <BackButton href="/practice">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Exit
        </BackButton>
        <ScoreBadge>Score: {score}</ScoreBadge>
      </Header>

      <QuizCard>
        <ProgressInfo>
          {currentIndex + 1} / {TOTAL_QUESTIONS}
        </ProgressInfo>

        <Character>{currentQuestion.char}</Character>

        <OptionsGrid>
          {currentQuestion.options.map((opt) => {
            let state: 'neutral' | 'correct' | 'incorrect' = 'neutral';
            if (selectedOption) {
              if (opt === currentQuestion.romaji) state = 'correct';
              else if (opt === selectedOption) state = 'incorrect';
            }

            return (
              <OptionButton
                key={opt}
                $state={state}
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </OptionButton>
            );
          })}
        </OptionsGrid>

        <ProgressBarContainer>
          <ProgressFill $percent={((currentIndex + 1) / TOTAL_QUESTIONS) * 100} />
        </ProgressBarContainer>
      </QuizCard>
    </Container>
  );
}
