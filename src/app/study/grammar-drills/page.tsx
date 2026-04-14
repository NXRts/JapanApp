'use client';

import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { particleDrills, ParticleDrill } from '@/data/particles_drills';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  /* Premium radial background */
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%); /* Blue tint for grammar */
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 3rem;
`;

const ScoreBadge = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
  background: rgba(79, 70, 229, 0.1);
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  border: 1px solid rgba(79, 70, 229, 0.2);
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
  opacity: 0.7;

  @media (max-width: 600px) {
    top: 20px;
    right: 20px;
    font-size: 0.85rem;
  }
`;

const Sentence = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.4;
  color: var(--foreground);
  
  @media (max-width: 600px) {
    font-size: 1.75rem;
  }
`;

const Translation = styled.div`
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 3.5rem;
  font-style: italic;

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2.5rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr); 
    gap: 0.75rem;
  }
`;

const OptionButton = styled.button<{ $state?: 'correct' | 'incorrect' | 'neutral' }>`
  padding: 1rem;
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
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  pointer-events: ${({ $state }) => $state && $state !== 'neutral' ? 'none' : 'auto'};
  box-shadow: ${({ $state }) =>
    $state === 'neutral' ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none'};

  &:hover {
    transform: ${({ $state }) => $state === 'neutral' ? 'translateY(-2px)' : 'none'};
    border-color: ${({ $state }) => $state === 'neutral' ? 'var(--primary)' : ''};
  }
  
  @media (max-width: 600px) {
    font-size: 1.25rem;
    padding: 0.75rem;
  }
`;

const ExplanationBox = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.5;
  text-align: left;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const NextButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  font-size: 1.1rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background: var(--border);
  border-radius: 999px;
  margin-top: 2rem;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => `${$percent}%`};
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  transition: width 0.5s ease;
`;

const ResultOverlay = styled.div`
  text-align: center;
  padding: 4rem 3rem;
  background: var(--surface);
  border-radius: 32px;
  border: 1px solid var(--border);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  width: 100%;
  margin: 0 auto;

  h2 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 3rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  min-width: 160px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: var(--foreground);
  box-shadow: inset 0 0 0 2px var(--border);
  
  &:hover {
    background: rgba(255,255,255,0.05);
    box-shadow: inset 0 0 0 2px var(--text-secondary);
  }
`;

export default function GrammarDrillsPage() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<ParticleDrill[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Game config
  const TOTAL_QUESTIONS = Math.min(10, particleDrills.length);

  const generateQuiz = useCallback(() => {
    setLoading(true);
    setIsFinished(false);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);

    // Shuffle and pick
    const shuffled = [...particleDrills].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, TOTAL_QUESTIONS));
    setLoading(false);
  }, [TOTAL_QUESTIONS]);

  useEffect(() => {
    generateQuiz();
  }, [generateQuiz]);

  const handleAnswer = (option: string) => {
    if (selectedOption) return; // Prevent double click
    setSelectedOption(option);

    if (option === questions[currentIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  if (loading || questions.length === 0) return null;

  if (isFinished) {
    return (
      <Container>
        <ResultOverlay>
          <h2>Quiz Complete!</h2>
          <p>You scored <strong>{score}</strong> out of <strong>{TOTAL_QUESTIONS}</strong></p>
          <ButtonGroup>
            <Button onClick={generateQuiz}>Try Again</Button>
            <Link href="/practice" style={{ textDecoration: 'none', display: 'flex', width: '100%' }}>
              <SecondaryButton style={{ width: '100%' }}>Exit</SecondaryButton>
            </Link>
          </ButtonGroup>
        </ResultOverlay>
      </Container>
    );
  }

  const currentQuestion = questions[currentIndex];

  const getSentenceWithAnswer = () => {
    if (!selectedOption) return currentQuestion.displaySentence;
    // Replace [ ] with the selected option, styled based on correctness
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const color = isCorrect ? '#10b981' : '#ef4444';
    
    const parts = currentQuestion.displaySentence.split('[ ]');
    if (parts.length < 2) return currentQuestion.displaySentence;

    return (
      <>
        {parts[0]}
        <span style={{ color, borderBottom: `2px solid ${color}`, padding: '0 0.5rem', display: 'inline-block' }}>
          {selectedOption}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <Container>
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Study', href: '/study' }
        ]} 
        current="Particle Drills" 
      />
      <Header>
        <ScoreBadge>Score: {score}</ScoreBadge>
      </Header>

      <QuizCard>
        <ProgressInfo>
          {currentIndex + 1} / {TOTAL_QUESTIONS}
        </ProgressInfo>

        <Sentence>
          {selectedOption ? getSentenceWithAnswer() : currentQuestion.displaySentence}
        </Sentence>
        <Translation>{currentQuestion.translation}</Translation>

        <OptionsGrid>
          {currentQuestion.options.map((opt) => {
            let state: 'neutral' | 'correct' | 'incorrect' = 'neutral';
            if (selectedOption) {
              if (opt === currentQuestion.correctAnswer) state = 'correct';
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

        {selectedOption && (
          <ExplanationBox>
            <strong>Penjelasan:</strong> {currentQuestion.explanation}
            <NextButton onClick={handleNext}>Lanjut (Next)</NextButton>
          </ExplanationBox>
        )}

        <ProgressBarContainer>
          <ProgressFill $percent={((currentIndex + 1) / TOTAL_QUESTIONS) * 100} />
        </ProgressBarContainer>
      </QuizCard>
    </Container>
  );
}
