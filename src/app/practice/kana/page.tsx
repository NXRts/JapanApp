'use client';

import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { toRomaji } from 'wanakana';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackButton = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: var(--primary);
  }
`;

const Score = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
`;

const QuizCard = styled.div`
  background: var(--surface);
  border-radius: 24px;
  border: 1px solid var(--border);
  padding: 3rem;
  text-align: center;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
`;

const Character = styled.div`
  font-size: 8rem;
  font-weight: 800;
  margin-bottom: 3rem;
  color: var(--foreground);
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const OptionButton = styled.button<{ $state?: 'correct' | 'incorrect' | 'neutral' }>`
  padding: 1.5rem;
  border-radius: 16px;
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
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  pointer-events: ${({ $state }) => $state && $state !== 'neutral' ? 'none' : 'auto'};

  &:hover {
    border-color: ${({ $state }) => $state === 'neutral' ? 'var(--primary)' : ''};
    transform: ${({ $state }) => $state === 'neutral' ? 'translateY(-2px)' : 'none'};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  margin-top: 2rem;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => `${$percent}%`};
  background: var(--primary);
  transition: width 0.3s ease;
`;

const ResultOverlay = styled.div`
  text-align: center;
  animation: fadeIn 0.5s ease;

  h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.5rem;
    color: var(--text-secondary);
    margin-bottom: 3rem;
  }
`;

const Button = styled.button`
  padding: 1rem 3rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--primary-dark);
    transform: scale(1.05);
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

            // Shuffle data
            const shuffled = [...data].sort(() => 0.5 - Math.random());
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

                return {
                    char,
                    romaji: correctRomaji,
                    options: [...distractors, correctRomaji].sort(() => 0.5 - Math.random())
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
                <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>Loading Quiz...</div>
            </Container>
        );
    }

    if (isFinished) {
        return (
            <Container>
                <ResultOverlay>
                    <h2>Quiz Complete!</h2>
                    <p>You scored {score} out of {TOTAL_QUESTIONS}</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Button onClick={generateQuiz}>Try Again</Button>
                        <Link href="/practice" style={{ textDecoration: 'none' }}>
                            <Button style={{ background: 'var(--surface)', color: 'var(--foreground)', border: '1px solid var(--border)' }}>
                                Exit
                            </Button>
                        </Link>
                    </div>
                </ResultOverlay>
            </Container>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <Container>
            <Header>
                <BackButton href="/practice">← Exit</BackButton>
                <Score>Score: {score}/{TOTAL_QUESTIONS}</Score>
            </Header>

            <QuizCard>
                <div style={{ position: 'absolute', top: 20, right: 20, color: 'var(--text-secondary)' }}>
                    {currentIndex + 1} / {TOTAL_QUESTIONS}
                </div>
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
                <ProgressBar>
                    <ProgressFill $percent={((currentIndex + 1) / TOTAL_QUESTIONS) * 100} />
                </ProgressBar>
            </QuizCard>
        </Container>
    );
}
