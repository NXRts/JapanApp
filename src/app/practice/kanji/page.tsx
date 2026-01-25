'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { DrawingCanvas } from '@/components/Practice/Canvas';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 0.5rem;
  
  select {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--foreground);
    font-size: 1rem;
  }
`;

const FlashcardContainer = styled.div`
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  width: 100%;
  justify-content: center;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const CardArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  width: 100%;
`;

const Card = styled.div<{ $flipped: boolean }>`
  width: 300px;
  height: 380px;
  perspective: 1000px;
  cursor: pointer;
  position: relative;
  margin-bottom: 2rem;

  & > div {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'rotateY(0)')};
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  background: #fff;
  color: #1a1a1a;
`;

const BigChar = styled.div`
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 1rem;
`;

const Hint = styled.div`
  font-size: 1.25rem;
  color: var(--text-secondary);
`;

const Details = styled.div`
  margin-top: 1rem;
  text-align: left;
  width: 100%;
  
  h4 {
    color: var(--primary);
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
    text-transform: uppercase;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    line-height: 1.4;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
`;

const ActionBtn = styled.button<{ $type: 'easy' | 'hard' | 'flip' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  width: 100%;
  transition: transform 0.2s;

  background: ${({ $type }) =>
        $type === 'easy' ? '#10b981' :
            $type === 'hard' ? '#ef4444' :
                'var(--primary)'};
  color: white;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

const DrawingArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: var(--text-secondary);
`;

export default function KanjiFlashcards() {
    const [level, setLevel] = useState('n5');
    const [kanjiList, setKanjiList] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState<any>(null);
    const [clearTrigger, setClearTrigger] = useState(0);

    // Fetch List
    useEffect(() => {
        setLoading(true);
        fetch(`/api/kanji/${level}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // Shuffle
                    setKanjiList(data.sort(() => 0.5 - Math.random()));
                    setCurrentIndex(0);
                    setFlipped(false);
                }
            })
            .finally(() => setLoading(false));
    }, [level]);

    const currentKanji = kanjiList[currentIndex];

    // Fetch Details for current card (Back side)
    // We fetch early but only show when flipped or pre-load
    useEffect(() => {
        if (!currentKanji) return;

        fetch(`https://kanjiapi.dev/v1/kanji/${currentKanji}`)
            .then(res => res.json())
            .then(data => setDetails(data))
            .catch(() => setDetails(null));
    }, [currentKanji]);

    const nextCard = () => {
        setFlipped(false);
        setClearTrigger(prev => prev + 1); // Auto clear canvas
        setTimeout(() => {
            setCurrentIndex(prev => (prev + 1) % kanjiList.length);
        }, 300); // Wait for flip transition
    };

    if (loading) return <Container>Loading...</Container>;
    if (!currentKanji) return <Container>No Kanji found for this level.</Container>;

    return (
        <Container>
            <Header>
                <Link href="/practice" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
                    ← Back
                </Link>
                <Controls>
                    <select value={level} onChange={(e) => setLevel(e.target.value)}>
                        {['n5', 'n4', 'n3', 'n2', 'n1'].map(l => (
                            <option key={l} value={l}>Level {l.toUpperCase()}</option>
                        ))}
                    </select>
                </Controls>
            </Header>

            <FlashcardContainer>
                <DrawingArea>
                    <SectionTitle>Write Here</SectionTitle>
                    <DrawingCanvas clearTrigger={clearTrigger} />
                </DrawingArea>

                <CardArea>
                    <Card $flipped={flipped} onClick={() => setFlipped(!flipped)}>
                        <div>
                            <CardFace>
                                <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                    What is this?
                                </div>
                                {/* On front, we usually show Meaning or just "Hidden" if we want to test writing. 
                    Let's show the Meaning asking for the Character. 
                */}
                                {details ? (
                                    <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>
                                        {details.meanings ? details.meanings[0] : '...'}
                                    </h2>
                                ) : (
                                    <h2>Loading...</h2>
                                )}
                                <p style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>Click to reveal</p>
                            </CardFace>

                            <CardBack>
                                <BigChar>{currentKanji}</BigChar>
                                {details && (
                                    <Details>
                                        {details.on_readings && details.on_readings.length > 0 && (
                                            <>
                                                <h4>Onyomi</h4>
                                                <p>{details.on_readings.join(', ')}</p>
                                            </>
                                        )}
                                        {details.kun_readings && details.kun_readings.length > 0 && (
                                            <>
                                                <h4>Kunyomi</h4>
                                                <p>{details.kun_readings.join(', ')}</p>
                                            </>
                                        )}
                                        <h4>Meanings</h4>
                                        <p>{details.meanings?.slice(0, 3).join(', ')}</p>
                                    </Details>
                                )}
                            </CardBack>
                        </div>
                    </Card>

                    <ActionButtons>
                        {/* If not flipped, show Reveal button. If flipped, show Next buttons */}
                        {!flipped ? (
                            <ActionBtn $type="flip" onClick={() => setFlipped(true)}>
                                Reveal Answer
                            </ActionBtn>
                        ) : (
                            <>
                                <ActionBtn $type="hard" onClick={nextCard}>Hard / Wrong</ActionBtn>
                                <ActionBtn $type="easy" onClick={nextCard}>Easy / Correct</ActionBtn>
                            </>
                        )}
                    </ActionButtons>
                </CardArea>
            </FlashcardContainer>
        </Container>
    );
}
