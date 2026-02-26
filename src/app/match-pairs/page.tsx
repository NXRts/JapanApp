'use client';

import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { toRomaji } from 'wanakana';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(79, 70, 229, 0.05) 0%, transparent 70%);
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

const TitleBadge = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.1);
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  border: 1px solid rgba(79, 70, 229, 0.2);

  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0.4rem 1rem;
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

const MatchGrid = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const MatchColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
`;

const MatchButton = styled.button<{ $state?: 'selected' | 'matched' | 'neutral', $isRomaji?: boolean }>`
  padding: 1.25rem;
  border-radius: 16px;
  border: 2px solid ${({ $state }) =>
        $state === 'matched' ? '#10b981' :
            $state === 'selected' ? '#4f46e5' :
                'var(--border)'};
  background: ${({ $state }) =>
        $state === 'matched' ? 'rgba(16, 185, 129, 0.1)' :
            $state === 'selected' ? 'rgba(79, 70, 229, 0.1)' :
                'var(--surface)'};
  color: ${({ $state }) =>
        $state === 'matched' ? '#10b981' :
            $state === 'selected' ? '#4f46e5' :
                'var(--foreground)'};
  font-size: ${({ $isRomaji }) => $isRomaji ? '1.25rem' : '1.5rem'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: ${({ $state }) => $state === 'matched' ? 'none' : 'auto'};
  
  &:hover {
    transform: ${({ $state }) => $state === 'neutral' ? 'translateY(-2px)' : 'none'};
    border-color: ${({ $state }) => $state === 'neutral' ? '#4f46e5' : ''};
  }
  
  @media (max-width: 600px) {
    padding: 1rem;
    font-size: ${({ $isRomaji }) => $isRomaji ? '1.1rem' : '1.25rem'};
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
  background: linear-gradient(90deg, #4f46e5, #3b82f6);
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
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  margin: 0.5rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 25px -5px rgba(79, 70, 229, 0.4);
  }
`;

// Types
export interface MatchPairItem {
    id: string;
    kana: string;
    romaji: string;
}

interface MatchPairsQuestion {
    id: string;
    pairs: MatchPairItem[];
    shuffledKana: MatchPairItem[];
    shuffledRomaji: MatchPairItem[];
}

export default function MatchPairsPage() {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<MatchPairsQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const [selectedKanaPair, setSelectedKanaPair] = useState<string | null>(null);
    const [selectedRomajiPair, setSelectedRomajiPair] = useState<string | null>(null);
    const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);

    const TOTAL_QUESTIONS = 5; // e.g. 5 rounds of matching
    const PAIRS_PER_ROUND = 4;

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const generateQuiz = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/kana?type=all');
            const kanaData: string[] = await res.json();

            // basic shuffle
            const shuffledData = shuffleArray(kanaData);

            const newQuestions: MatchPairsQuestion[] = [];
            let index = 0;

            for (let i = 0; i < TOTAL_QUESTIONS; i++) {
                const pairs: MatchPairItem[] = [];
                for (let j = 0; j < PAIRS_PER_ROUND; j++) {
                    if (index >= shuffledData.length) index = 0;
                    const char = shuffledData[index++];
                    pairs.push({
                        id: `pair-${i}-${j}`,
                        kana: char,
                        romaji: toRomaji(char)
                    });
                }

                newQuestions.push({
                    id: `round-${i}`,
                    pairs,
                    shuffledKana: shuffleArray([...pairs]),
                    shuffledRomaji: shuffleArray([...pairs])
                });
            }

            setQuestions(newQuestions);
            setCurrentIndex(0);
            setScore(0);
            setIsFinished(false);
            setMatchedPairIds([]);
        } catch (error) {
            console.error("Failed to generate quiz", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        generateQuiz();
    }, [generateQuiz]);

    const handleMatchSelection = (id: string, isRomaji: boolean) => {
        if (isRomaji) {
            if (selectedRomajiPair === id) setSelectedRomajiPair(null);
            else setSelectedRomajiPair(id);
        } else {
            if (selectedKanaPair === id) setSelectedKanaPair(null);
            else setSelectedKanaPair(id);
        }
    };

    useEffect(() => {
        const currentQ = questions[currentIndex];
        if (!currentQ) return;

        if (selectedKanaPair && selectedRomajiPair) {
            if (selectedKanaPair === selectedRomajiPair) {
                const newMatched = [...matchedPairIds, selectedKanaPair];
                setMatchedPairIds(newMatched);
                setSelectedKanaPair(null);
                setSelectedRomajiPair(null);

                if (newMatched.length === currentQ.pairs.length) {
                    setScore(s => s + 1); // point for finishing the round
                    setTimeout(() => {
                        if (currentIndex < TOTAL_QUESTIONS - 1) {
                            setCurrentIndex(i => i + 1);
                            setMatchedPairIds([]);
                        } else {
                            setIsFinished(true);
                        }
                    }, 1000);
                }
            } else {
                // Incorrect match setup
                setTimeout(() => {
                    setSelectedKanaPair(null);
                    setSelectedRomajiPair(null);
                }, 400);
            }
        }
    }, [selectedKanaPair, selectedRomajiPair, matchedPairIds, currentIndex, questions]);

    if (loading || questions.length === 0) {
        return (
            <Container>
                <div style={{ textAlign: 'center', fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                    Loading cards...
                </div>
            </Container>
        );
    }

    if (isFinished) {
        return (
            <Container>
                <ResultOverlay>
                    <h2>Quiz Complete!</h2>
                    <p>You matched all <strong>{TOTAL_QUESTIONS * PAIRS_PER_ROUND}</strong> pairs!</p>
                    <div style={{ marginTop: '2rem' }}>
                        <Button onClick={generateQuiz}>Play Again</Button>
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <Button style={{ background: 'var(--surface)', color: 'var(--foreground)', border: '1px solid var(--border)' }}>Back to Home</Button>
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
                <TitleBadge>Match the Pairs</TitleBadge>
            </Header>

            <QuizCard>
                <ProgressInfo>
                    Round {currentIndex + 1} / {TOTAL_QUESTIONS}
                </ProgressInfo>

                <h3 style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>Find the correct pairings</h3>

                <MatchGrid>
                    <MatchColumn>
                        {currentQuestion.shuffledKana.map((item) => {
                            const isMatched = matchedPairIds.includes(item.id);
                            const isSelected = selectedKanaPair === item.id;
                            const state = isMatched ? 'matched' : (isSelected ? 'selected' : 'neutral');

                            return (
                                <MatchButton
                                    key={`kana-${item.id}`}
                                    $state={state}
                                    onClick={() => handleMatchSelection(item.id, false)}
                                >
                                    {item.kana}
                                </MatchButton>
                            );
                        })}
                    </MatchColumn>
                    <MatchColumn>
                        {currentQuestion.shuffledRomaji.map((item) => {
                            const isMatched = matchedPairIds.includes(item.id);
                            const isSelected = selectedRomajiPair === item.id;
                            const state = isMatched ? 'matched' : (isSelected ? 'selected' : 'neutral');

                            return (
                                <MatchButton
                                    key={`romaji-${item.id}`}
                                    $state={state}
                                    $isRomaji
                                    onClick={() => handleMatchSelection(item.id, true)}
                                >
                                    {item.romaji}
                                </MatchButton>
                            );
                        })}
                    </MatchColumn>
                </MatchGrid>

                <ProgressBarContainer>
                    <ProgressFill $percent={((currentIndex + 1) / TOTAL_QUESTIONS) * 100} />
                </ProgressBarContainer>
            </QuizCard>
        </Container>
    );
}
