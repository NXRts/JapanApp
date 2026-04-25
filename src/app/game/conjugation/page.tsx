'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { conjugationData, ConjugationVerb } from '@/data/conjugation_drills';

// --- Styled Components ---

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 90vh;
`;

const GameArea = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  font-weight: 600;
`;

const Score = styled.div`
  color: #10b981;
`;

const QuestionCount = styled.div`
  color: var(--text-secondary);
`;

const QuestionContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const TargetVerb = styled.div`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--foreground);
`;

const VerbMeaning = styled.div`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const InstructionBox = styled.div`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: #10b981;
  padding: 1rem 2rem;
  border-radius: 16px;
  display: inline-block;
  font-weight: 700;
  font-size: 1.25rem;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const OptionButton = styled.button<{ $isCorrect?: boolean; $isWrong?: boolean; $disabled?: boolean }>`
  padding: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 16px;
  border: 2px solid ${({ $isCorrect, $isWrong }) => 
    $isCorrect ? '#10b981' : 
    $isWrong ? '#ef4444' : 
    'var(--border)'};
  background: ${({ $isCorrect, $isWrong }) => 
    $isCorrect ? 'rgba(16, 185, 129, 0.1)' : 
    $isWrong ? 'rgba(239, 68, 68, 0.1)' : 
    'var(--background)'};
  color: ${({ $isCorrect, $isWrong }) => 
    $isCorrect ? '#10b981' : 
    $isWrong ? '#ef4444' : 
    'var(--foreground)'};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  transition: all 0.2s;

  &:hover {
    ${({ $disabled }) => !$disabled && `
      border-color: #10b981;
      transform: translateY(-2px);
    `}
  }
`;

const StartButton = styled.button`
  width: 100%;
  padding: 1.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  border: none;
  border-radius: 16px;
  background: #10b981;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
    background: #059669;
  }
`;

const ResultScreen = styled.div`
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

const FinalScore = styled.div`
  font-size: 5rem;
  font-weight: 800;
  color: #10b981;
  margin: 2rem 0;
`;

const ResultMessage = styled.h2`
  font-size: 2rem;
  margin-bottom: 3rem;
  color: var(--foreground);
`;

// --- Logic Helpers ---

type FormType = 'masu' | 'te' | 'ta' | 'nai';
const formLabels: Record<FormType, string> = {
  masu: 'Bentuk Masu (Sopan)',
  te: 'Bentuk Te (Menyambung)',
  ta: 'Bentuk Ta (Lampau)',
  nai: 'Bentuk Nai (Negatif)'
};

const TOTAL_QUESTIONS = 10;

export default function ConjugationDrillsPage() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [currentVerb, setCurrentVerb] = useState<ConjugationVerb | null>(null);
  const [targetForm, setTargetForm] = useState<FormType>('masu');
  const [options, setOptions] = useState<string[]>([]);
  
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Generate a question
  const generateQuestion = useCallback(() => {
    // 1. Pick a random verb
    const randomVerb = conjugationData[Math.floor(Math.random() * conjugationData.length)];
    
    // 2. Pick a random target form
    const forms: FormType[] = ['masu', 'te', 'ta', 'nai'];
    const selectedForm = forms[Math.floor(Math.random() * forms.length)];
    
    // 3. The correct answer
    const correctAnswer = randomVerb.forms[selectedForm];
    
    // 4. Generate distractors (wrong answers)
    const distractors = new Set<string>();
    
    // Add other forms of the SAME verb as distractors
    forms.forEach(f => {
      if (f !== selectedForm) {
        distractors.add(randomVerb.forms[f]);
      }
    });

    // If we still need more distractors, pick forms from other random verbs
    while (distractors.size < 3) {
      const otherVerb = conjugationData[Math.floor(Math.random() * conjugationData.length)];
      const otherForm = forms[Math.floor(Math.random() * forms.length)];
      if (otherVerb.forms[otherForm] !== correctAnswer) {
        distractors.add(otherVerb.forms[otherForm]);
      }
    }

    // 5. Shuffle options
    const finalOptions = [correctAnswer, ...Array.from(distractors).slice(0, 3)];
    for (let i = finalOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [finalOptions[i], finalOptions[j]] = [finalOptions[j], finalOptions[i]];
    }

    setCurrentVerb(randomVerb);
    setTargetForm(selectedForm);
    setOptions(finalOptions);
    setSelectedAnswer(null);
  }, []);

  const startGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    generateQuestion();
    setGameState('playing');
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer !== null || !currentVerb) return; // Prevent multiple clicks

    setSelectedAnswer(answer);
    
    const isCorrect = answer === currentVerb.forms[targetForm];
    if (isCorrect) {
      setScore(s => s + 1);
    }

    // Wait a short moment before moving to the next question
    setTimeout(() => {
      if (currentQuestionIndex + 1 >= TOTAL_QUESTIONS) {
        setGameState('result');
      } else {
        setCurrentQuestionIndex(i => i + 1);
        generateQuestion();
      }
    }, 1500);
  };

  return (
    <Container>
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Games Hub', href: '/game' }
        ]} 
        current="Conjugation Drills" 
      />

      <GameArea>
        {gameState === 'start' && (
          <div style={{ textAlign: 'center' }}>
            <Header>
              <Title>Conjugation Drills</Title>
              <Subtitle>Uji kecepatanmu mengubah bentuk kata kerja bahasa Jepang!</Subtitle>
            </Header>
            <StartButton onClick={startGame}>Mulai Main</StartButton>
          </div>
        )}

        {gameState === 'playing' && currentVerb && (
          <>
            <TopBar>
              <Score>Score: {score}</Score>
              <QuestionCount>Question {currentQuestionIndex + 1} / {TOTAL_QUESTIONS}</QuestionCount>
            </TopBar>

            <QuestionContainer>
              <TargetVerb>{currentVerb.dictionary}</TargetVerb>
              <VerbMeaning>({currentVerb.reading}) - {currentVerb.meaning}</VerbMeaning>
              
              <InstructionBox>
                Ubah ke: {formLabels[targetForm]}
              </InstructionBox>
            </QuestionContainer>

            <OptionsGrid>
              {options.map((option, index) => {
                const isCorrectAnswer = option === currentVerb.forms[targetForm];
                const isSelected = selectedAnswer === option;
                
                let showCorrect = false;
                let showWrong = false;

                if (selectedAnswer !== null) {
                  if (isCorrectAnswer) showCorrect = true;
                  if (isSelected && !isCorrectAnswer) showWrong = true;
                }

                return (
                  <OptionButton
                    key={index}
                    onClick={() => handleAnswer(option)}
                    $disabled={selectedAnswer !== null}
                    $isCorrect={showCorrect}
                    $isWrong={showWrong}
                  >
                    {option}
                  </OptionButton>
                );
              })}
            </OptionsGrid>
          </>
        )}

        {gameState === 'result' && (
          <ResultScreen>
            <Header>
              <Title>Selesai!</Title>
              <Subtitle>Latihan yang bagus.</Subtitle>
            </Header>
            <FinalScore>{score} / {TOTAL_QUESTIONS}</FinalScore>
            <ResultMessage>
              {score === TOTAL_QUESTIONS ? 'Sempurna! Kamu master konjugasi.' : 
               score >= 7 ? 'Kerja bagus! Sedikit lagi menuju sempurna.' : 
               'Teruslah berlatih! Kamu pasti bisa.'}
            </ResultMessage>
            <StartButton onClick={startGame}>Main Lagi</StartButton>
          </ResultScreen>
        )}
      </GameArea>
    </Container>
  );
}
