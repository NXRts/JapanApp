'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { toRomaji } from 'wanakana';
import Link from 'next/link';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, rgba(79, 70, 229, 0.05) 0%, transparent 70%);
`;

const GameCard = styled.div`
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
  width: 100%;
  max-width: 600px;

  @media (max-width: 600px) {
    padding: 2.5rem 1.5rem;
    border-radius: 24px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  max-width: 600px;
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
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-secondary);
`;

const KanaDisplay = styled.div`
  font-size: 6rem;
  font-weight: 800;
  margin: 2rem 0;
  color: var(--foreground);
  text-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  text-align: center;
  border: 2px solid var(--border);
  border-radius: 16px;
  background: var(--background);
  color: var(--foreground);
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  }
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
  margin-top: 2rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 25px -5px rgba(79, 70, 229, 0.4);
  }
`;

export default function GamePage() {
    const [kanaList, setKanaList] = useState<string[]>([]);
    const [currentKana, setCurrentKana] = useState<string>('');
    const [inputVal, setInputVal] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch Kana list on mount
    useEffect(() => {
        fetch('/api/kana?type=all')
            .then(res => res.json())
            .then(data => {
                setKanaList(data);
            })
            .catch(err => console.error("Error fetching kana:", err));
    }, []);

    const getRandomKana = useCallback(() => {
        if (kanaList.length === 0) return '';
        const randomIndex = Math.floor(Math.random() * kanaList.length);
        return kanaList[randomIndex];
    }, [kanaList]);

    // Timer logic
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isPlaying) {
            setIsPlaying(false);
            setIsGameOver(true);
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    const startGame = () => {
        if (kanaList.length === 0) return;
        setScore(0);
        setTimeLeft(60);
        setIsGameOver(false);
        setIsPlaying(true);
        setCurrentKana(getRandomKana());
        setInputVal('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputVal(val);

        // Check if the input matches the romaji of the current kana
        const targetRomaji = toRomaji(currentKana);

        if (val.toLowerCase().trim() === targetRomaji) {
            setScore(prev => prev + 1);
            setCurrentKana(getRandomKana());
            setInputVal('');
        }
    };

    return (
        <Container>
            <Header>
                <BackButton href="/">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Home
                </BackButton>
                <TitleBadge>Kana Speed Typing</TitleBadge>
            </Header>

            <GameCard>
                {!isPlaying && !isGameOver && (
                    <div>
                        <h2 style={{ marginBottom: '1rem' }}>Kana Speed Typing</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Type the Romaji mapping for the Kana character shown. You have 60 seconds to get as many right as possible!
                        </p>
                        <Button onClick={startGame} disabled={kanaList.length === 0}>
                            {kanaList.length === 0 ? 'Loading...' : 'Start Game'}
                        </Button>
                    </div>
                )}

                {isPlaying && (
                    <div>
                        <StatsRow>
                            <div>Score: <span style={{ color: 'var(--primary)' }}>{score}</span></div>
                            <div style={{ color: timeLeft <= 10 ? '#ef4444' : 'inherit' }}>
                                Time: {timeLeft}s
                            </div>
                        </StatsRow>

                        <KanaDisplay>{currentKana}</KanaDisplay>

                        <Input
                            ref={inputRef}
                            type="text"
                            value={inputVal}
                            onChange={handleInputChange}
                            placeholder="Type romaji here..."
                            autoFocus
                            autoComplete="off"
                        />
                    </div>
                )}

                {isGameOver && (
                    <div>
                        <h2>Time's Up!</h2>
                        <KanaDisplay style={{ fontSize: '4rem', margin: '1rem 0' }}>{score}</KanaDisplay>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '2rem' }}>
                            characters typed correctly.
                        </p>
                        <Button onClick={startGame}>Play Again</Button>
                    </div>
                )}
            </GameCard>
        </Container>
    );
}
