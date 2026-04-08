'use client';

import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { toRomaji } from 'wanakana';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(244, 63, 94, 0.05) 0%, transparent 70%);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    margin-bottom: 2rem;
  }
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
    background: rgba(244, 63, 94, 0.1);
  }
`;

/* Removed DateBadge */

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

  @media (max-width: 600px) {
    top: 20px;
    right: 20px;
    font-size: 0.85rem;
  }
`;

const QuestionChar = styled.div`
  font-size: 6rem;
  font-weight: 700;
  margin: 1.5rem 0 3rem;
  color: var(--foreground);
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: 'Inter', sans-serif; /* Romaji font */

  @media (max-width: 600px) {
    font-size: 5rem;
    margin: 1rem 0 2.5rem;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  
  @media (max-width: 600px) {
    gap: 1rem;
  }
`;

const OptionButton = styled.button<{ $state?: 'correct' | 'incorrect' | 'neutral' }>`
  padding: 1.25rem;
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
  font-size: 1.75rem; /* Bigger for Kana */
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  &:hover {
    transform: ${({ $state }) => $state === 'neutral' ? 'translateY(-2px)' : 'none'};
    border-color: ${({ $state }) => $state === 'neutral' ? '#f43f5e' : ''};
  }
  
  @media (max-width: 600px) {
    padding: 1rem;
    font-size: 1.5rem;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background: var(--border);
  border-radius: 99px;
  margin-top: 1rem;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => `${$percent}%`};
  background: linear-gradient(90deg, #f43f5e, #fb7185);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
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
`;

const Button = styled.button`
  padding: 1rem 3rem;
  background: linear-gradient(135deg, #f43f5e 0%, #fb7185 100%);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px rgba(244, 63, 94, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  margin-top: 2rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 25px -5px rgba(244, 63, 94, 0.4);
  }
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    color: var(--foreground);
    background: rgba(255,255,255,0.05);
    transform: rotate(180deg);
  }
`;

// Helper to shuffle arrays
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// Types
interface QuizQuestion {
    id: number;
    questionRomaji: string;
    correctKana: string;
    optionsKana: string[];
}

export default function ReverseQuizPage() {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const TOTAL_QUESTIONS = 10;

    const generateQuiz = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch Kana from central API
            const res = await fetch('/api/kana?type=all');
            const kanaData: string[] = await res.json();

            // Generate questions
            const shuffledData = shuffleArray(kanaData);
            const selectedChars = shuffledData.slice(0, TOTAL_QUESTIONS);

            const generatedQuestions: QuizQuestion[] = selectedChars.map((char, index) => {
                const romaji = toRomaji(char);

                // Get 3 random WRONG options
                const wrongOptions = kanaData.filter(h => h !== char);
                const shuffledWrong = shuffleArray(wrongOptions).slice(0, 3);

                // Mix correct with wrong options
                const options = shuffleArray([char, ...shuffledWrong]);

                return {
                    id: index,
                    questionRomaji: romaji,
                    correctKana: char,
                    optionsKana: options
                };
            });

            setQuestions(generatedQuestions);
            setCurrentIndex(0);
            setScore(0);
            setIsFinished(false);
            setSelectedAnswer(null);

        } catch (error) {
            console.error("Failed to generate quiz", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        generateQuiz();
    }, [generateQuiz]);

    const handleAnswer = (kana: string) => {
        if (selectedAnswer !== null) return; // Prevent double click

        setSelectedAnswer(kana);

        const currentQuestion = questions[currentIndex];
        const isCorrect = kana === currentQuestion.correctKana;

        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        // Wait 1 second before moving to next question
        setTimeout(() => {
            if (currentIndex < TOTAL_QUESTIONS - 1) {
                setCurrentIndex(prev => prev + 1);
                setSelectedAnswer(null);
            } else {
                setIsFinished(true);
            }
        }, 1000);
    };

    if (loading || questions.length === 0) {
        return (
            <Container>
                <Breadcrumbs 
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Quiz Hub', href: '/quiz' }
                    ]} 
                    current="Reverse Quiz" 
                />
                <div style={{ textAlign: 'center', fontSize: '1.25rem', color: 'var(--text-secondary)', marginTop: '4rem' }}>
                    Loading Today's Challenge...
                </div>
            </Container>
        );
    }

    if (isFinished) {
        return (
            <Container>
                <Breadcrumbs 
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Quiz Hub', href: '/quiz' }
                    ]} 
                    current="Reverse Quiz" 
                />
                <ResultOverlay>
                    <h2>Reverse Quiz Complete!</h2>
                    <p>You scored <strong>{score}</strong> out of <strong>{TOTAL_QUESTIONS}</strong></p>
                    <p style={{ fontSize: '1rem', opacity: 0.8 }}>Keep playing to master reverse kana recognition!</p>
                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button onClick={generateQuiz}>Play Again</Button>
                        <Link href="/quiz" style={{ textDecoration: 'none' }}>
                            <Button style={{ background: 'var(--surface)', color: 'var(--foreground)', border: '1px solid var(--border)', boxShadow: 'none' }}>Quiz Hub</Button>
                        </Link>
                    </div>
                </ResultOverlay>
            </Container>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <Container>
            <Breadcrumbs 
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Quiz Hub', href: '/quiz' }
                ]} 
                current="Reverse Quiz" 
            />
            <Header>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ResetButton onClick={generateQuiz} title="New Questions">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                            <path d="M16 21h5v-5" />
                        </svg>
                    </ResetButton>
                </div>
            </Header>

            <QuizCard>
                <ProgressInfo>
                    {currentIndex + 1} / {TOTAL_QUESTIONS}
                </ProgressInfo>

                <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Select the matching Kana</h3>

                <QuestionChar key={currentIndex}>
                    {currentQuestion.questionRomaji}
                </QuestionChar>

                <OptionsGrid>
                    {currentQuestion.optionsKana.map((kana) => {
                        let state: 'neutral' | 'correct' | 'incorrect' = 'neutral';
                        if (selectedAnswer !== null) {
                            if (kana === currentQuestion.correctKana) {
                                state = 'correct'; // Always highlight correct answer
                            } else if (kana === selectedAnswer) {
                                state = 'incorrect'; // Highlight wrong selection
                            }
                        }

                        return (
                            <OptionButton
                                key={kana}
                                onClick={() => handleAnswer(kana)}
                                $state={state}
                                disabled={selectedAnswer !== null}
                            >
                                {kana}
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
