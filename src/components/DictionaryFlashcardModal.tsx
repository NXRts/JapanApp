'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DictionaryResult } from '@/lib/dictionary';

interface FlashcardModalProps {
  data: DictionaryResult[];
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  
  .counter {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.4rem 1rem;
    border-radius: 99px;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .close-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background 0.2s;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const CardContainer = styled.div`
  perspective: 1000px;
  width: 100%;
  height: 400px;
  cursor: pointer;
`;

const CardInner = styled.div<{ $flipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: var(--surface);
  border-radius: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 1px solid var(--border);
`;

const CardFront = styled(CardFace)`
  color: var(--foreground);
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  background: var(--surface);
`;

const BigText = styled.h2`
  font-size: 4rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, var(--foreground) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 640px) {
    font-size: 3rem;
  }
`;

const SubText = styled.p`
  font-size: 1.25rem;
  color: var(--primary);
  font-weight: 600;
  margin-top: 1rem;
`;

const Tag = styled.span`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
  color: var(--primary);
  padding: 0.4rem 1rem;
  border-radius: 99px;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const MeaningText = styled.h3`
  font-size: 1.75rem;
  color: var(--foreground);
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const ReadingText = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const ExplanationText = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  padding: 1rem;
  background: rgba(var(--foreground-rgb, 0, 0, 0), 0.03);
  border-radius: 16px;
  width: 100%;
  text-align: left;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const ActionBtn = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 16px;
  border: none;
  background: var(--surface);
  color: var(--foreground);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover:not(:disabled) {
    background: var(--primary);
    color: white;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyStateContainer = styled(CardFace)`
  position: relative;
  height: 400px;
  text-align: center;
`;

export default function DictionaryFlashcardModal({ data, onClose }: FlashcardModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
         e.preventDefault();
         handleNext();
      }
      if (e.key === 'ArrowLeft') {
         e.preventDefault();
         handlePrev();
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
         e.preventDefault();
         setIsFlipped(prev => !prev);
      }
      if (e.key === 'Escape') {
         onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFlipped, data.length]);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 150);
    }
  };

  if (!data || data.length === 0) {
    return (
      <Overlay>
        <Container>
          <Header>
            <div className="counter">0 / 0</div>
            <button className="close-btn" onClick={onClose}>✕</button>
          </Header>
          <EmptyStateContainer style={{ position: 'relative' }}>
            <h3 style={{ color: 'var(--text-secondary)' }}>Tidak ada data yang tersedia untuk flashcard ini.</h3>
            <ActionBtn style={{ marginTop: '2rem' }} onClick={onClose}>Tutup</ActionBtn>
          </EmptyStateContainer>
        </Container>
      </Overlay>
    );
  }

  const currentItem = data[currentIndex];
  
  // Resolve texts based on type
  const targetWord = currentItem.word || currentItem.kanji || currentItem.title || '?';
  const targetReading = currentItem.reading || currentItem.onyomi?.join(', ') || '';
  const romaji = currentItem.romaji || currentItem.structure || '';
  const meaning = currentItem.meaning || 'No definition';
  
  const displayReading = [targetReading, romaji].filter(Boolean).join(' • ');

  return (
    <Overlay onClick={(e) => {
        // close if clicked outside
        if (e.target === e.currentTarget) onClose();
    }}>
      <Container>
        <Header>
          <div className="counter">{currentIndex + 1} / {data.length}</div>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </Header>

        <CardContainer onClick={() => setIsFlipped(!isFlipped)}>
          <CardInner $flipped={isFlipped}>
            <CardFront>
              <Tag>{currentItem.level}</Tag>
              {currentItem.type === 'grammar' ? (
                <BigText style={{ fontSize: '2.5rem' }}>{targetWord}</BigText>
              ) : (
                <BigText>{targetWord}</BigText>
              )}
              {currentItem.type === 'grammar' && currentItem.structure && (
                 <SubText>{currentItem.structure}</SubText>
              )}
              <div style={{ position: 'absolute', bottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', opacity: 0.6, fontWeight: 500 }}>
                Ketuk untuk membalik
              </div>
            </CardFront>

            <CardBack>
              <MeaningText>{meaning}</MeaningText>
              {displayReading && <ReadingText>{displayReading}</ReadingText>}
              
              {currentItem.explanation && (
                 <ExplanationText>
                   {currentItem.explanation}
                 </ExplanationText>
              )}
            </CardBack>
          </CardInner>
        </CardContainer>

        <Controls>
          <ActionBtn onClick={handlePrev} disabled={currentIndex === 0}>
            ← Sebelumnya
          </ActionBtn>
          <ActionBtn onClick={handleNext} disabled={currentIndex === data.length - 1} style={{ background: currentIndex === data.length - 1 ? 'var(--surface)' : 'var(--primary)', color: currentIndex === data.length - 1 ? 'var(--foreground)' : 'white' }}>
            {currentIndex === data.length - 1 ? 'Selesai' : 'Berikutnya →'}
          </ActionBtn>
        </Controls>
      </Container>
    </Overlay>
  );
}
