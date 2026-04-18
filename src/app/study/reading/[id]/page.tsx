'use client';

import styled from 'styled-components';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { readingPassages, ReadingPassage, ReadingQuiz } from '@/data/reading';
import { useProgress } from '@/context/ProgressContext';

const Container = styled.div`
  max-width: 850px;
  margin: 0 auto;
  padding: 2.5rem 2rem 6rem;
  min-height: 100vh;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
`;

const ToggleGroup = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-secondary);
  
  input {
    width: 48px;
    height: 24px;
    appearance: none;
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: 999px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s;
    
    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      background: var(--border);
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    &:checked {
      background: rgba(79, 70, 229, 0.2);
      border-color: var(--primary);
      
      &::after {
        background: var(--primary);
        transform: translateX(24px);
      }
    }
  }
`;

const ContentContainer = styled.div<{ $showFurigana: boolean }>`
  margin-top: 3rem;
  
  ruby {
    font-family: 'Noto Sans JP', sans-serif;
  }
  
  rt {
    font-size: 0.55em;
    color: var(--primary);
    opacity: 0.9;
    font-weight: 700;
    line-height: 1;
    display: ${props => props.$showFurigana ? 'block' : 'none'};
    transform: translateY(10%);
  }
`;

const ParagraphBlock = styled.div`
  margin-bottom: 3rem;
`;

const JapaneseText = styled.div`
  font-size: 1.4rem;
  line-height: 2.4;
  color: var(--foreground);
  font-family: 'Noto Sans JP', sans-serif;
  letter-spacing: 0.02em;
`;

const EnglishText = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--border);
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  font-style: italic;
`;

const QuizSection = styled.div`
  margin-top: 6rem;
  padding: 3rem;
  background: var(--surface);
  border-radius: 24px;
  border: 1px solid var(--border);
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);

  @media (max-width: 600px) {
    padding: 2rem 1.5rem;
  }
`;

const QuizTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &::before {
    content: '📝';
  }
`;

const QuestionContainer = styled.div`
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--border);
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const QuestionText = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const OptionBtn = styled.button<{ $state: 'default' | 'selected' | 'correct' | 'wrong' }>`
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 2px solid ${props => 
    props.$state === 'correct' ? '#10b981' : 
    props.$state === 'wrong' ? '#ef4444' : 
    props.$state === 'selected' ? 'var(--primary)' : 'var(--border)'};
  background: ${props => 
    props.$state === 'correct' ? 'rgba(16, 185, 129, 0.1)' : 
    props.$state === 'wrong' ? 'rgba(239, 68, 68, 0.1)' : 
    props.$state === 'selected' ? 'rgba(79, 70, 229, 0.05)' : 'transparent'};
  color: var(--foreground);
  font-size: 1.1rem;
  font-weight: 600;
  text-align: left;
  cursor: ${props => props.$state === 'default' || props.$state === 'selected' ? 'pointer' : 'default'};
  transition: all 0.2s;

  &:hover {
    ${props => (props.$state === 'default' || props.$state === 'selected') && `
      border-color: var(--primary);
      background: rgba(79, 70, 229, 0.05);
    `}
  }
`;

const SubmitBtn = styled.button`
  margin-top: 1.5rem;
  padding: 0.8rem 2rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 99px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover { opacity: 0.9; }
  &:disabled {
    background: var(--border);
    cursor: not-allowed;
    color: var(--text-secondary);
  }
`;

const Explanation = styled.div<{ $isCorrect: boolean }>`
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: ${props => props.$isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  border-left: 4px solid ${props => props.$isCorrect ? '#10b981' : '#ef4444'};
  
  strong {
    color: ${props => props.$isCorrect ? '#10b981' : '#ef4444'};
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  span { color: var(--text-secondary); line-height: 1.5; display: inline-block; }
`;

function QuizBlock({ quiz }: { quiz: ReadingQuiz }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === quiz.correctAnswerIndex;

  return (
    <QuestionContainer>
      <QuestionText>{quiz.question}</QuestionText>
      <OptionsGrid>
        {quiz.options.map((opt, idx) => {
          let state: 'default' | 'selected' | 'correct' | 'wrong' = 'default';
          
          if (submitted) {
            if (idx === quiz.correctAnswerIndex) state = 'correct';
            else if (idx === selected) state = 'wrong';
          } else {
            if (idx === selected) state = 'selected';
          }
          
          return (
            <OptionBtn 
              key={idx} 
              $state={state}
              onClick={() => !submitted && setSelected(idx)}
              disabled={submitted}
            >
              {opt}
            </OptionBtn>
          );
        })}
      </OptionsGrid>
      
      {!submitted && (
        <SubmitBtn 
          onClick={() => setSubmitted(true)} 
          disabled={selected === null}
        >
          Check Answer
        </SubmitBtn>
      )}
      
      {submitted && (
        <Explanation $isCorrect={isCorrect}>
          <strong>{isCorrect ? 'Correct!' : 'Incorrect'}</strong>
          <span>{quiz.explanation}</span>
        </Explanation>
      )}
    </QuestionContainer>
  );
}

const CompleteBtn = styled.button<{ $completed: boolean }>`
  width: 100%;
  padding: 1.25rem;
  border-radius: 16px;
  background: ${props => props.$completed ? '#10b981' : 'var(--surface)'};
  color: ${props => props.$completed ? 'white' : 'var(--primary)'};
  border: 2px solid ${props => props.$completed ? '#10b981' : 'var(--primary)'};
  font-size: 1.2rem;
  font-weight: 800;
  cursor: ${props => props.$completed ? 'default' : 'pointer'};
  margin-top: 3rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: ${props => props.$completed ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.$completed ? 'none' : '0 10px 25px -5px rgba(79, 70, 229, 0.2)'};
  }
`;

export default function ReadingDetailPage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [showFurigana, setShowFurigana] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const { progress, markExerciseCompleted } = useProgress();

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : null;
  const passage = readingPassages.find(p => p.id === id);

  if (!passage) {
    return (
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Reading', href: '/study/reading' }]} current="Not Found" />
        <Title>Passage Not Found</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Reading', href: '/study/reading' }]} current={passage.title} />
      
      <ControlsContainer>
        <div>
          <span style={{ background: 'var(--primary)', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 700, marginRight: '1rem' }}>
            {passage.level}
          </span>
          <Title style={{ display: 'inline-block', fontSize: '2rem' }}>{passage.title}</Title>
        </div>
        
        <ToggleGroup>
          <ToggleLabel>
            <span>Furigana</span>
            <input type="checkbox" checked={showFurigana} onChange={e => setShowFurigana(e.target.checked)} />
          </ToggleLabel>
          <ToggleLabel>
            <span>Translation</span>
            <input type="checkbox" checked={showTranslation} onChange={e => setShowTranslation(e.target.checked)} />
          </ToggleLabel>
        </ToggleGroup>
      </ControlsContainer>

      <ContentContainer $showFurigana={showFurigana}>
        {passage.paragraphs.map((para, idx) => (
          <ParagraphBlock key={idx}>
            <JapaneseText dangerouslySetInnerHTML={{ __html: para.japanese }} />
            {showTranslation && (
              <EnglishText>{para.english}</EnglishText>
            )}
          </ParagraphBlock>
        ))}
      </ContentContainer>

      {passage.quizzes && passage.quizzes.length > 0 && (
        <QuizSection>
          <QuizTitle>Reading Comprehension Check</QuizTitle>
          {passage.quizzes.map((quiz, idx) => (
            <QuizBlock key={idx} quiz={quiz} />
          ))}
        </QuizSection>
      )}

      <CompleteBtn 
        $completed={!!progress.completedExercises?.includes(passage.id)}
        onClick={() => markExerciseCompleted(passage.id)}
        disabled={!!progress.completedExercises?.includes(passage.id)}
      >
        {progress.completedExercises?.includes(passage.id) ? (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Completed
          </>
        ) : (
          'Mark as Completed'
        )}
      </CompleteBtn>
    </Container>
  );
}
