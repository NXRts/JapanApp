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
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(var(--primary-rgb, 79, 70, 229), 0.05) 0%, transparent 70%);

  @media (max-width: 640px) {
    padding: 2rem 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const HeaderRight = styled.div`
  text-align: right;
  
  @media (max-width: 600px) {
    text-align: left;
  }
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.2rem;
  color: var(--text-secondary);

  a {
    color: var(--foreground);
    text-decoration: none;
    font-weight: 800;
    letter-spacing: -0.02em;
    transition: color 0.2s;
    
    &:hover {
      color: var(--primary);
    }
  }

  span.separator {
    opacity: 0.3;
    font-weight: 300;
  }

  span.current {
    font-weight: 400;
    opacity: 0.8;
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
  top: 45px;
  right: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary);

  @media (max-width: 600px) {
    top: 40px;
    right: 20px;
    font-size: 0.85rem;
  }
`;

const QuestionText = styled.div`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 3.5rem;
  line-height: 1.2;
  background: linear-gradient(135deg, var(--foreground) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
  
  @media (max-width: 600px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr; 
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
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: ${({ $state }) => $state && $state !== 'neutral' ? 'none' : 'auto'};
  box-shadow: ${({ $state }) =>
        $state === 'neutral' ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  &:hover {
    transform: ${({ $state }) => $state === 'neutral' ? 'translateY(-3px)' : 'none'};
    border-color: ${({ $state }) => $state === 'neutral' ? 'var(--primary)' : ''};
  }
  
  span.option-reading {
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-weight: 400;
  }
  
  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
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
  background: linear-gradient(90deg, var(--primary), var(--primary-dark, #4f46e5));
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 99px;
`;

const ResultOverlay = styled.div`
  text-align: center;
  animation: fadeIn 0.8s ease-out;
  padding: 4rem 3rem;
  background: var(--surface);
  border-radius: 32px;
  border: 1px solid var(--border);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding: 2.5rem 1.5rem;
  }
`;

const ActionButtonParams = styled(Link)`
  padding: 1rem 3rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark, #4338ca) 100%);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px rgba(var(--primary-rgb, 79, 70, 229), 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 25px -5px rgba(var(--primary-rgb, 79, 70, 229), 0.4);
  }
`;

const RestartButton = styled.button`
  padding: 1rem 3rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark, #4338ca) 100%);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px rgba(var(--primary-rgb, 79, 70, 229), 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 25px -5px rgba(var(--primary-rgb, 79, 70, 229), 0.4);
  }
`;

const ActionSecondary = styled(Link)`
  padding: 1rem 3rem;
  background: var(--surface);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
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
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOptionIndex(null);
      } else {
        setQuizState('results');
      }
    }, 1500);
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
        <Header>
          <Breadcrumbs>
            <Link href="/jlpt">JLPT</Link> <span className="separator">/</span> <span className="current">Kuis</span>
          </Breadcrumbs>
          
          <HeaderRight>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  JLPT Custom Quiz
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Level {activeLevel !== 'All' ? activeLevel : 'Semua'} • {activeCategory.replace('-', ' ').toUpperCase()}
              </div>
          </HeaderRight>
        </Header>
        
        {quizState === 'loading' && (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p>Menyiapkan Kuis {activeLevel !== 'All' ? activeLevel : ''}...</p>
          </div>
        )}
        
        {quizState === 'error' && (
          <QuizCard>
            <h2 style={{ color: 'var(--foreground)' }}>Tidak Cukup Data</h2>
            <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Maaf, data yang tersedia untuk filter ini kurang dari 4 item.<br/> Silakan sesuaikan kembali filter Anda di halaman JLPT untuk membuat Kuis.
            </p>
            <ActionButtonParams href="/jlpt">
              Kembali ke JLPT
            </ActionButtonParams>
          </QuizCard>
        )}
        
        {quizState === 'playing' && questions.length > 0 && (
          <QuizCard>
            <ProgressInfo>
                {currentIndex + 1} / {questions.length}
            </ProgressInfo>
            
            <QuestionText>{getQuestionText(questions[currentIndex].item)}</QuestionText>
            
            <OptionsGrid>
              {questions[currentIndex].options.map((opt, idx) => {
                const isCorrect = opt.id === questions[currentIndex].item.id;
                let state: 'neutral' | 'correct' | 'incorrect' = 'neutral';
                
                if (selectedOptionIndex !== null) {
                  if (isCorrect) state = 'correct';
                  else if (idx === selectedOptionIndex) state = 'incorrect';
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
            
            <ProgressBarContainer>
                <ProgressFill $percent={((currentIndex + 1) / questions.length) * 100} />
            </ProgressBarContainer>
          </QuizCard>
        )}
        
        {quizState === 'results' && (
          <ResultOverlay>
            <div style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>🏆</div>
            <h2>Kuis Selesai!</h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: '1rem' }}>Anda mencetak skor <strong>{score}</strong> dari <strong>{questions.length}</strong></p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                {score === questions.length ? "Luar biasa! Skor Anda sempurna!" : "Kerja bagus! Teruslah berlatih."}
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <RestartButton onClick={handleRestart}>Coba Lagi</RestartButton>
              <ActionSecondary href="/jlpt">
                Kembali ke JLPT
              </ActionSecondary>
            </div>
          </ResultOverlay>
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
