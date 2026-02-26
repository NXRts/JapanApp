'use client';

import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { toRomaji } from 'wanakana';

// Styled Components (Reusing similar style to KanaQuizPage for consistency)
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(16, 185, 129, 0.05) 0%, transparent 70%); /* Green tint for Daily */
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
    background: rgba(79, 70, 229, 0.1);
  }
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

  @media (max-width: 600px) {
    top: 20px;
    right: 20px;
    font-size: 0.85rem;
  }
`;

const Character = styled.div`
  font-size: 8rem;
  font-weight: 800;
  margin-bottom: 3.5rem;
  line-height: 1;
  background: linear-gradient(135deg, var(--foreground) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
  
  @media (max-width: 600px) {
    font-size: 5rem;
    margin-bottom: 2rem;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: 600px) {
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
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: ${({ $state }) => $state && $state !== 'neutral' ? 'none' : 'auto'};
  box-shadow: ${({ $state }) =>
        $state === 'neutral' ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none'};

  &:hover {
    transform: ${({ $state }) => $state === 'neutral' ? 'translateY(-3px)' : 'none'};
    border-color: ${({ $state }) => $state === 'neutral' ? '#10b981' : ''}; /* Green hover for daily */
  }
  
  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
    font-size: 1.1rem;
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
  background: linear-gradient(90deg, #10b981, #059669);
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
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.4);
  }
`;

const ResetButton = styled.button`
    background: rgba(255,255,255,0.05);
    border: none;
    color: var(--text-secondary);
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    margin-left: 0.5rem;

    &:hover {
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
        transform: rotate(180deg);
    }
`;

// Types
interface Question {
    char: string;
    answer: string; // romaji
    options: string[];
    type: 'kana' | 'kanji';
}

// Helper to shuffle arrays
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export default function KanaQuizPage() {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const TOTAL_QUESTIONS = 10;

    const generateQuiz = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch Kana data
            const res = await fetch('/api/kana?type=all');
            const kanaData: string[] = await res.json();

            // Create a pool of UNIQUE Romaji to prevent duplicate wrong answers
            const uniqueRomajiPool = Array.from(new Set(kanaData.map(c => toRomaji(c))));

            const kanaQuestions: Question[] = [];
            const shuffledKana = shuffleArray(kanaData);
            const selectedKana = shuffledKana.slice(0, TOTAL_QUESTIONS);

            selectedKana.forEach(char => {
                const correctRomaji = toRomaji(char);

                // Generate distractors using UNIQUE Romaji pool
                const availableDistractors = uniqueRomajiPool.filter(r => r !== correctRomaji);
                const shuffledDistractors = shuffleArray(availableDistractors);
                const distractors = shuffledDistractors.slice(0, 3);

                kanaQuestions.push({
                    char,
                    answer: correctRomaji,
                    options: shuffleArray([...distractors, correctRomaji]),
                    type: 'kana'
                });
            });

            setQuestions(shuffleArray(kanaQuestions));
            setCurrentIndex(0);
            setScore(0);
            setIsFinished(false);
            setSelectedOption(null);

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
        if (selectedOption) return;
        setSelectedOption(option);

        if (option === questions[currentIndex].answer) {
            setScore(s => s + 1);
        }

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
                    Generating Daily Quiz...
                </div>
            </Container>
        );
    }

    if (isFinished) {
        return (
            <Container>
                <ResultOverlay>
                    <h2>Kana Quiz Complete!</h2>
                    <p>You scored <strong>{score}</strong> out of <strong>{TOTAL_QUESTIONS}</strong></p>
                    <p style={{ fontSize: '1rem', opacity: 0.8 }}>Keep practicing to improve your reading speed!</p>
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
            <Header>
                <BackButton href="/quiz">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Quiz Hub
                </BackButton>
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

                <Character>{currentQuestion.char}</Character>

                <OptionsGrid>
                    {currentQuestion.options.map((opt) => {
                        let state: 'neutral' | 'correct' | 'incorrect' = 'neutral';
                        if (selectedOption) {
                            if (opt === currentQuestion.answer) state = 'correct';
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
