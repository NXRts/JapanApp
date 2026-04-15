'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import HanziWriter from 'hanzi-writer';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;
`;

const ScoreBadge = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
  background: rgba(var(--primary-rgb), 0.1);
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
`;

const QuizCard = styled.div`
  background: var(--surface);
  backdrop-filter: blur(20px);
  border-radius: 32px;
  border: 1px solid var(--border);
  padding: 3rem;
  text-align: center;
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;
`;

const PromptArea = styled.div`
  margin-bottom: 1rem;
`;

const Meaning = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Instruction = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const WriterContainer = styled.div`
  background: white; /* Contrast for the drawing area */
  border-radius: 16px;
  padding: 20px;
  border: 2px solid var(--border);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
`;

const ActionButton = styled.button<{ $variant?: 'secondary' | 'outline' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.$variant === 'outline' ? `
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    &:hover { border-color: var(--primary); color: var(--primary); }
  ` : `
    background: var(--primary);
    color: white;
    border: none;
    &:hover { opacity: 0.9; transform: translateY(-1px); }
  `}
`;

const Message = styled.div<{ $type: 'success' | 'error' | 'neutral' }>`
  font-weight: 600;
  margin-top: 1rem;
  color: ${props => props.$type === 'success' ? '#10b981' : props.$type === 'error' ? '#ef4444' : 'var(--text-secondary)'};
  min-height: 1.5rem;
`;

const ResultOverlay = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: var(--surface);
  border-radius: 32px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-2xl);
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`;

// Quiz Data
const kanjiData = [
  { kanji: '水', meaning: 'Air (Water)' },
  { kanji: '火', meaning: 'Api (Fire)' },
  { kanji: '木', meaning: 'Pohon (Tree)' },
  { kanji: '山', meaning: 'Gunung (Mountain)' },
  { kanji: '川', meaning: 'Sungai (River)' },
  { kanji: '田', meaning: 'Sawah (Rice Field)' },
  { kanji: '日', meaning: 'Matahari/Hari (Sun/Day)' },
  { kanji: '月', meaning: 'Bulan (Moon)' },
  { kanji: '人', meaning: 'Orang (Person)' },
  { kanji: '大', meaning: 'Besar (Large)' }
];

export default function KanjiWritingQuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | 'neutral' }>({ text: '', type: 'neutral' });
  const writerRef = useRef<HanziWriter | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const currentKanji = kanjiData[currentIndex];

  const initWriter = useCallback(() => {
    if (targetRef.current) {
      targetRef.current.innerHTML = ''; // Clear previous
      writerRef.current = HanziWriter.create(targetRef.current, currentKanji.kanji, {
        width: 300,
        height: 300,
        padding: 5,
        showOutline: true,
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 200,
        strokeColor: '#4f46e5', // var(--primary)
        outlineColor: '#e5e7eb', // var(--border)
        drawingColor: '#312e81', // dark blue
      });

      writerRef.current.quiz({
        onMistake: (strokeData) => {
          setMessage({ text: 'Urutan salah! Coba lagi.', type: 'error' });
          setTimeout(() => setMessage({ text: '', type: 'neutral' }), 2000);
        },
        onCorrectStroke: () => {
          setMessage({ text: 'Bagus!', type: 'success' });
          setTimeout(() => setMessage({ text: '', type: 'neutral' }), 1000);
        },
        onComplete: (summary) => {
          setMessage({ text: 'Selesai!', type: 'success' });
          setScore(s => s + 1);
          setTimeout(() => {
            if (currentIndex < kanjiData.length - 1) {
              setCurrentIndex(prev => prev + 1);
              setMessage({ text: '', type: 'neutral' });
            } else {
              setIsFinished(true);
            }
          }, 1500);
        }
      });
    }
  }, [currentIndex, currentKanji.kanji]);

  useEffect(() => {
    initWriter();
  }, [initWriter]);

  const handleNext = () => {
    if (currentIndex < kanjiData.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const showHint = () => {
    if (writerRef.current) {
      writerRef.current.animateCharacter();
    }
  };

  const resetCanvas = () => {
    initWriter();
  };

  if (isFinished) {
    return (
      <Container>
        <ResultOverlay>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Selesai! 🏆</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
            Kamu berhasil menulis <strong>{score}</strong> Kanji dengan benar.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <ActionButton onClick={() => { setIsFinished(false); setCurrentIndex(0); setScore(0); }}>Ulangi Quiz</ActionButton>
            <Link href="/quiz">
              <ActionButton $variant="outline">Keluar</ActionButton>
            </Link>
          </div>
        </ResultOverlay>
      </Container>
    );
  }

  return (
    <Container>
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Quiz', href: '/quiz' }
        ]} 
        current="Kanji Writing" 
      />
      
      <Header>
        <ScoreBadge>Selesai: {score} / {kanjiData.length}</ScoreBadge>
      </Header>

      <QuizCard>
        <PromptArea>
          <Meaning>{currentKanji.meaning}</Meaning>
          <Instruction>Gambarkan Kanji tersebut dengan urutan goresan yang benar.</Instruction>
        </PromptArea>

        <WriterContainer ref={targetRef} />

        <Message $type={message.type}>{message.text}</Message>

        <Controls>
          <ActionButton $variant="outline" onClick={resetCanvas}>Bersihkan</ActionButton>
          <ActionButton $variant="secondary" onClick={showHint}>Lihat Petunjuk</ActionButton>
          <ActionButton onClick={handleNext}>Lewati</ActionButton>
        </Controls>
      </QuizCard>
    </Container>
  );
}
