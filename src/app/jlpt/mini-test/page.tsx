'use client';

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { useSearchParams, useRouter } from 'next/navigation';
import { allVocabulary, allKanji, allGrammar, DictionaryResult } from '@/lib/dictionary';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Question {
  id: string;
  type: 'vocabulary' | 'grammar' | 'kanji';
  prompt: string;
  subPrompt?: string;
  correctAnswer: string;
  options: string[];
  explanation?: string;
  sourceItem: any;
}

// --- Styles ---
const PageWrapper = styled.div`
  min-height: 100vh;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(var(--primary-rgb), 0.05) 0%, transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(var(--secondary-rgb), 0.05) 0%, transparent 40%),
    radial-gradient(var(--dot-color) 1.2px, transparent 1.2px);
  background-size: 100% 100%, 100% 100%, 32px 32px;
  color: var(--foreground);
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const GlassCard = styled(motion.div)`
  background: rgba(var(--surface-rgb), 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 32px;
  padding: 3rem;
  box-shadow: var(--shadow-xl);
  position: relative;
  overflow: hidden;

  @media (max-width: 640px) {
    padding: 2rem 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--foreground) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const TestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StatLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatValue = styled.span`
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--foreground);
`;

const TimerDisplay = styled.div<{ $warning: boolean }>`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ $warning }) => $warning ? '#ef4444' : 'var(--primary)'};
  background: ${({ $warning }) => $warning ? 'rgba(239, 68, 68, 0.1)' : 'rgba(var(--primary-rgb), 0.1)'};
  padding: 0.5rem 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: var(--border);
  border-radius: 99px;
  margin-bottom: 3rem;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 99px;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const QuestionType = styled.div`
  display: inline-flex;
  padding: 0.5rem 1.25rem;
  background: rgba(var(--primary-rgb), 0.1);
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  color: var(--primary);
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  align-self: flex-start;
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.1);
`;

const Prompt = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
  background: linear-gradient(to bottom, var(--foreground), var(--text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 640px) {
    font-size: 2.25rem;
  }
`;

const SubPrompt = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-top: 0.75rem;
  font-weight: 500;
  opacity: 0.8;
  line-height: 1.5;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const OptionButton = styled(motion.button)<{ $status?: 'correct' | 'incorrect' | 'neutral' }>`
  padding: 1.5rem;
  border-radius: 20px;
  border: 2px solid ${({ $status }) => 
    $status === 'correct' ? '#10b981' : 
    $status === 'incorrect' ? '#ef4444' : 
    'var(--border)'};
  background: ${({ $status }) => 
    $status === 'correct' ? 'rgba(16, 185, 129, 0.1)' : 
    $status === 'incorrect' ? 'rgba(239, 68, 68, 0.1)' : 
    'rgba(var(--surface-rgb), 0.5)'};
  color: ${({ $status }) => 
    $status === 'correct' ? '#10b981' : 
    $status === 'incorrect' ? '#ef4444' : 
    'var(--foreground)'};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: ${({ $status }) => $status === 'neutral' ? 'var(--shadow-sm)' : 'none'};

  &:hover {
    border-color: ${({ $status }) => $status === 'neutral' ? 'var(--primary)' : ''};
    transform: ${({ $status }) => $status === 'neutral' ? 'translateY(-2px)' : 'none'};
    background: ${({ $status }) => $status === 'neutral' ? 'rgba(var(--primary-rgb), 0.05)' : ''};
  }

  span.label {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(var(--foreground-rgb), 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 800;
    flex-shrink: 0;
  }
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const ResultCard = styled.div`
  background: rgba(var(--surface-rgb), 0.5);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ResultValue = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--primary);
`;

const ResultLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background: var(--primary);
  color: white;
  border-radius: 99px;
  font-weight: 800;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(var(--primary-rgb), 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(var(--primary-rgb), 0.4);
    filter: brightness(1.1);
  }
`;

const LevelBadge = styled.div`
  padding: 0.5rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 99px;
  font-weight: 800;
  color: var(--primary);
  font-size: 1rem;
`;

// --- Helpers ---
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- Main Component ---
function MiniTestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const level = searchParams.get('level') || 'N5';

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [testState, setTestState] = useState<'intro' | 'playing' | 'results'>('intro');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ questionIndex: number, isCorrect: boolean, selected: string }[]>([]);

  // Generate Test Questions
  const generateTest = useCallback(() => {
    const levelData = {
      vocab: allVocabulary.filter(v => v.level === level),
      kanji: allKanji.filter(k => k.level === level),
      grammar: allGrammar.filter(g => g.level === level),
    };

    const generatedQuestions: Question[] = [];
    
    // Pick 10 Vocab, 5 Kanji, 5 Grammar (or whatever is available)
    const vocabPool = shuffleArray(levelData.vocab);
    const kanjiPool = shuffleArray(levelData.kanji);
    const grammarPool = shuffleArray(levelData.grammar);

    // 1. Vocabulary Questions (Meaning)
    vocabPool.slice(0, 10).forEach(item => {
      const distractors = shuffleArray(vocabPool.filter(v => v.id !== item.id))
        .slice(0, 3)
        .map(v => v.meaning);
      
      generatedQuestions.push({
        id: item.id,
        type: 'vocabulary',
        prompt: item.word || '',
        subPrompt: item.reading,
        correctAnswer: item.meaning || '',
        options: shuffleArray([item.meaning || '', ...distractors]),
        sourceItem: item
      });
    });

    // 2. Kanji Questions (Reading)
    kanjiPool.slice(0, 5).forEach(item => {
      const distractors = shuffleArray(kanjiPool.filter(k => k.id !== item.id))
        .slice(0, 3)
        .map(k => (k.onyomi?.[0] || k.kunyomi?.[0] || ''));

      const correctReading = item.onyomi?.[0] || item.kunyomi?.[0] || '';
      
      generatedQuestions.push({
        id: item.id,
        type: 'kanji',
        prompt: item.kanji || '',
        subPrompt: `What is the reading?`,
        correctAnswer: correctReading,
        options: shuffleArray([correctReading, ...distractors]),
        sourceItem: item
      });
    });

    // 3. Grammar Questions (Meaning/Usage)
    grammarPool.slice(0, 5).forEach(item => {
      const distractors = shuffleArray(grammarPool.filter(g => g.id !== item.id))
        .slice(0, 3)
        .map(g => g.meaning || '');
      
      generatedQuestions.push({
        id: item.id,
        type: 'grammar',
        prompt: item.title || '',
        subPrompt: item.structure,
        correctAnswer: item.meaning || '',
        options: shuffleArray([item.meaning || '', ...distractors]),
        sourceItem: item
      });
    });

    setQuestions(shuffleArray(generatedQuestions));
    setTestState('playing');
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(600);
    setAnswers([]);
  }, [level]);

  // Timer Effect
  useEffect(() => {
    if (testState !== 'playing' || timeLeft <= 0) {
      if (timeLeft === 0 && testState === 'playing') setTestState('results');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [testState, timeLeft]);

  const handleOptionClick = (optionIndex: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(optionIndex);
    const currentQ = questions[currentIndex];
    const isCorrect = currentQ.options[optionIndex] === currentQ.correctAnswer;

    if (isCorrect) setScore(prev => prev + 1);

    setAnswers(prev => [...prev, {
      questionIndex: currentIndex,
      isCorrect,
      selected: currentQ.options[optionIndex]
    }]);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setTestState('results');
      }
    }, 800);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = (scorePercent: number) => {
    if (scorePercent === 100) return "Perfect! You're a JLPT Master!";
    if (scorePercent >= 80) return "Excellent! You're well prepared.";
    if (scorePercent >= 60) return "Good job! A bit more practice and you'll be ready.";
    if (scorePercent >= 40) return "Not bad, but there's room for improvement.";
    return "Keep studying! Consistency is key to mastering Japanese.";
  };

  return (
    <PageWrapper>
      <Container>
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'JLPT Mastery', href: '/jlpt' }
          ]} 
          current="Mini Test" 
        />

        <AnimatePresence mode="wait">
          {testState === 'intro' && (
            <GlassCard
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Title>JLPT {level} Mini Test</Title>
              <Subtitle>
                Test your knowledge with a mix of Vocabulary, Kanji, and Grammar. 
                You have 10 minutes to complete 20 questions.
              </Subtitle>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button 
                  onClick={generateTest}
                  style={{ 
                    padding: '1rem 2.5rem', 
                    background: 'var(--primary)', 
                    color: 'white', 
                    borderRadius: '99px', 
                    border: 'none', 
                    fontWeight: 800, 
                    fontSize: '1.1rem', 
                    cursor: 'pointer' 
                  }}
                >
                  Start Test
                </button>
                <ActionButton href="/jlpt" style={{ background: 'transparent', color: 'var(--foreground)', border: '1px solid var(--border)', boxShadow: 'none' }}>
                  Cancel
                </ActionButton>
              </div>
            </GlassCard>
          )}

          {testState === 'playing' && (
            <div key="playing">
              <TestHeader>
                <StatsRow>
                  <StatItem>
                    <StatLabel>Progress</StatLabel>
                    <StatValue>{currentIndex + 1} / {questions.length}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Score</StatLabel>
                    <StatValue>{score}</StatValue>
                  </StatItem>
                </StatsRow>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <LevelBadge>{level}</LevelBadge>
                  <TimerDisplay $warning={timeLeft < 60}>
                    {formatTime(timeLeft)}
                  </TimerDisplay>
                </div>
              </TestHeader>

              <ProgressBar>
                <ProgressFill 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </ProgressBar>

              <GlassCard
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              >
                <QuestionContainer>
                  <QuestionType>{questions[currentIndex].type}</QuestionType>
                  <div>
                    <Prompt>{questions[currentIndex].prompt}</Prompt>
                    {questions[currentIndex].subPrompt && (
                      <SubPrompt>{questions[currentIndex].subPrompt}</SubPrompt>
                    )}
                  </div>

                  <OptionsGrid>
                    {questions[currentIndex].options.map((opt, idx) => {
                      let status: 'neutral' | 'correct' | 'incorrect' = 'neutral';
                      if (selectedOption !== null) {
                        if (opt === questions[currentIndex].correctAnswer) status = 'correct';
                        else if (idx === selectedOption) status = 'incorrect';
                      }

                      return (
                        <OptionButton
                          key={idx}
                          $status={status}
                          onClick={() => handleOptionClick(idx)}
                          whileHover={{ scale: status === 'neutral' ? 1.02 : 1 }}
                          whileTap={{ scale: status === 'neutral' ? 0.98 : 1 }}
                        >
                          <span className="label">{String.fromCharCode(65 + idx)}</span>
                          {opt}
                        </OptionButton>
                      );
                    })}
                  </OptionsGrid>
                </QuestionContainer>
              </GlassCard>
            </div>
          )}

          {testState === 'results' && (
            <GlassCard
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                  {score / questions.length >= 0.8 ? '🏆' : '📚'}
                </motion.div>
                <Title>Test Results</Title>
                <Subtitle>{getPerformanceMessage((score / questions.length) * 100)}</Subtitle>
              </div>

              <ResultGrid>
                <ResultCard>
                  <ResultLabel>Final Score</ResultLabel>
                  <ResultValue>{Math.round((score / questions.length) * 100)}%</ResultValue>
                </ResultCard>
                <ResultCard>
                  <ResultLabel>Correct</ResultLabel>
                  <ResultValue style={{ color: '#10b981' }}>{score}</ResultValue>
                </ResultCard>
                <ResultCard>
                  <ResultLabel>Incorrect</ResultLabel>
                  <ResultValue style={{ color: '#ef4444' }}>{questions.length - score}</ResultValue>
                </ResultCard>
                <ResultCard>
                  <ResultLabel>Time Spent</ResultLabel>
                  <ResultValue>{formatTime(600 - timeLeft)}</ResultValue>
                </ResultCard>
              </ResultGrid>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  onClick={generateTest}
                  style={{ 
                    padding: '1rem 2.5rem', 
                    background: 'var(--primary)', 
                    color: 'white', 
                    borderRadius: '99px', 
                    border: 'none', 
                    fontWeight: 800, 
                    fontSize: '1.1rem', 
                    cursor: 'pointer' 
                  }}
                >
                  Try Again
                </button>
                <ActionButton href="/jlpt">
                  Finish
                </ActionButton>
              </div>
            </GlassCard>
          )}
        </AnimatePresence>
      </Container>
    </PageWrapper>
  );
}

export default function MiniTestPage() {
  return (
    <Suspense fallback={
      <PageWrapper>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2 style={{ color: 'var(--text-secondary)' }}>Loading Test Data...</h2>
          </div>
        </Container>
      </PageWrapper>
    }>
      <MiniTestContent />
    </Suspense>
  );
}
