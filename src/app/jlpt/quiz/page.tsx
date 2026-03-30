'use client';

import React, { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { searchDictionary, allVocabulary, allKanji, allGrammar } from '@/lib/dictionary';

// --- Styled Components ---
const PageWrapper = styled.div`
  min-height: 90vh;
  color: var(--foreground);
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 640px) {
    padding: 2rem 1rem;
  }
`;

const Breadcrumbs = styled.div`
  width: 100%;
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  display: flex;
  gap: 0.5rem;
  
  a {
    color: var(--foreground);
    text-decoration: none;
    font-weight: 600;
  }
`;

const QuizBox = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  padding: 3rem 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const QuestionText = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--primary);
  margin: 1.5rem 0 2.5rem 0;
  text-align: center;
  line-height: 1.2;

  @media (max-width: 640px) {
    font-size: 2.5rem;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const OptionButton = styled.button<{ $state?: 'correct' | 'wrong' | 'default' }>`
  background: ${({ $state }) => 
    $state === 'correct' ? 'rgba(34, 197, 94, 0.1)' : 
    $state === 'wrong' ? 'rgba(239, 68, 68, 0.1)' : 'var(--background)'};
  border: 2px solid ${({ $state }) => 
    $state === 'correct' ? '#22c55e' : 
    $state === 'wrong' ? '#ef4444' : 'var(--border)'};
  color: var(--foreground);
  padding: 1.25rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${({ $state }) => $state === 'default' ? 'pointer' : 'default'};
  transition: all 0.2s;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  &:hover {
    ${({ $state }) => $state === 'default' && `
      border-color: var(--primary);
      transform: translateY(-2px);
    `}
  }
  
  span.option-reading {
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-weight: 400;
  }
`;

const ScoreHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-secondary);
`;

const NextButton = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: 1rem 3rem;
  border-radius: 99px;
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 2.5rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.3);

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.4);
  }
`;

const ResultsContainer = styled(QuizBox)`
  gap: 1.5rem;
  padding: 4rem 2rem;
  text-align: center;
`;

const ResultScore = styled.div`
  font-size: 4.5rem;
  font-weight: 900;
  color: var(--primary);
  margin: 1rem 0;
`;

const ActionButtonParams = styled(Link)`
  background: var(--surface);
  color: var(--foreground);
  border: 2px solid var(--border);
  padding: 1rem 2rem;
  border-radius: 99px;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

// --- Logic ---
interface QuizQuestion {
  item: any;
  options: any[];
}

function shuffleArray(array: any[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function QuizContent() {
  const searchParams = useSearchParams();

  const query = searchParams.get('q') || '';
  const activeCategory = searchParams.get('category') || 'kata';
  const activeLevel = searchParams.get('level') || 'All';

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState<'loading' | 'playing' | 'results' | 'error'>('loading');
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const generateQuiz = async () => {
      setQuizState('loading');
      try {
        let baseData: any[] = [];
        
        if (query && query.trim() !== '') {
          baseData = await searchDictionary(query, activeCategory as any, activeLevel);
        } else {
          if (activeCategory === 'kanji') baseData = allKanji;
          else if (activeCategory === 'tata-bahasa') baseData = allGrammar;
          else baseData = allVocabulary.filter(v => v.id.startsWith('lib-'));
          
          if (activeLevel !== 'All' && activeLevel !== 'all') {
            baseData = baseData.filter(item => item.level === activeLevel);
          }
        }
        
        if (!isMounted) return;
        
        if (baseData.length < 4) {
          setQuizState('error');
          return;
        }
        
        const shuffledBase = shuffleArray(baseData);
        const selectedQuestions = shuffledBase.slice(0, Math.min(10, shuffledBase.length));
        
        const generatedQuestions = selectedQuestions.map(item => {
          const others = shuffledBase.filter(x => x.id !== item.id);
          const wrongOptions = shuffleArray(others).slice(0, 3);
          const options = shuffleArray([item, ...wrongOptions]);
          return { item, options };
        });
        
        setQuestions(generatedQuestions);
        setQuizState('playing');
        setCurrentIndex(0);
        setScore(0);
        setSelectedOptionIndex(null);
      } catch (err) {
        if (isMounted) setQuizState('error');
      }
    };
    
    generateQuiz();
    return () => { isMounted = false; };
  }, [query, activeCategory, activeLevel]);

  const handleOptionClick = (idx: number, isCorrect: boolean) => {
    if (selectedOptionIndex !== null) return; 
    
    setSelectedOptionIndex(idx);
    if (isCorrect) setScore(prev => prev + 1);
  };
  
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      setQuizState('results');
    }
  };
  
  const handleRestart = () => {
    const reShuffled = shuffleArray(questions).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(reShuffled);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOptionIndex(null);
    setQuizState('playing');
  };

  const getQuestionText = (item: any) => {
    if (item.type === 'kanji') return item.kanji;
    if (item.type === 'grammar') return item.title;
    return item.word || item.title;
  };
  
  const getSubTextConfig = (opt: any) => {
    if (opt.type === 'kanji') {
      const readings = [
        ...(opt.onyomi || []),
        ...(opt.kunyomi || [])
      ].join(', ');
      return { read: readings, mean: opt.meaning };
    }
    if (opt.type === 'grammar') {
      return { read: '', mean: opt.meaning };
    }
    return { read: opt.reading || opt.romaji || '', mean: opt.meaning };
  };

  return (
    <PageWrapper>
      <Container>
        <Breadcrumbs>
          <Link href="/jlpt">JLPT</Link> / <span>Kuis</span>
        </Breadcrumbs>
        
        {quizState === 'loading' && (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p>Menyiapkan Kuis...</p>
          </div>
        )}
        
        {quizState === 'error' && (
          <QuizBox>
            <h2 style={{ color: 'var(--foreground)' }}>Tidak Cukup Data</h2>
            <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              Maaf, data yang tersedia untuk filter ini (Kategori: {activeCategory}, Level: {activeLevel}) kurang dari 4 item.<br/> Silakan sesuaikan kembali filter Anda di halaman JLPT untuk membuat Kuis.
            </p>
            <ActionButtonParams href="/jlpt" style={{ marginTop: '2rem' }}>
              Kembali ke JLPT
            </ActionButtonParams>
          </QuizBox>
        )}
        
        {quizState === 'playing' && questions.length > 0 && (
          <QuizBox>
            <ScoreHeader>
              <span>Soal {currentIndex + 1} / {questions.length}</span>
              <span>Skor Sementara: {score}</span>
            </ScoreHeader>
            
            <QuestionText>{getQuestionText(questions[currentIndex].item)}</QuestionText>
            
            <OptionsGrid>
              {questions[currentIndex].options.map((opt, idx) => {
                const isCorrect = opt.id === questions[currentIndex].item.id;
                let state: 'default' | 'correct' | 'wrong' = 'default';
                
                if (selectedOptionIndex !== null) {
                  if (isCorrect) state = 'correct';
                  else if (idx === selectedOptionIndex) state = 'wrong';
                }
                
                const texts = getSubTextConfig(opt);

                return (
                  <OptionButton 
                    key={idx}
                    $state={state}
                    onClick={() => handleOptionClick(idx, isCorrect)}
                  >
                    <span>{texts.mean}</span>
                    {texts.read && <span className="option-reading">{texts.read}</span>}
                  </OptionButton>
                );
              })}
            </OptionsGrid>
            
            {selectedOptionIndex !== null && (
              <NextButton onClick={handleNext}>
                {currentIndex < questions.length - 1 ? 'Soal Selanjutnya' : 'Lihat Hasil Akhir'}
              </NextButton>
            )}
          </QuizBox>
        )}
        
        {quizState === 'results' && (
          <ResultsContainer>
            <h2>Kuis Selesai!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Skor Akhir Anda</p>
            <ResultScore>{score} / {questions.length}</ResultScore>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <NextButton onClick={handleRestart} style={{ marginTop: 0 }}>Coba Lagi</NextButton>
              <ActionButtonParams href="/jlpt">
                Kembali ke JLPT
              </ActionButtonParams>
            </div>
          </ResultsContainer>
        )}

      </Container>
    </PageWrapper>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Memuat...</div>}>
      <QuizContent />
    </Suspense>
  );
}
