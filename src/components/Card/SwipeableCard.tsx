'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { playJapaneseAudio } from '@/lib/audio';

const CardPerspective = styled.div<{ $zIndex: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  perspective: 1500px;
  z-index: ${props => props.$zIndex};
`;

const CardContainer = styled.div<{
  $x: number;
  $y: number;
  $rot: number;
  $isDragging: boolean;
  $leaveAnim: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  transform: translate3d(${props => props.$x}px, ${props => props.$y}px, 0)
    rotate(${props => props.$rot}deg);
  transition: ${props =>
    props.$isDragging
      ? 'none'
      : props.$leaveAnim
      ? 'transform 0.5s ease-out'
      : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'};
  cursor: ${props => (props.$isDragging ? 'grabbing' : 'grab')};
  touch-action: none;
  user-select: none;
  transform-style: preserve-3d;
  will-change: transform;
`;

const CardInner = styled.div<{ $flipped: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  transform: ${props => (props.$flipped ? 'rotateX(180deg)' : 'rotateX(0)')};
  border-radius: 32px;
  box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.15);
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 32px;
  background: var(--surface);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  overflow: hidden;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
`;

const CardBack = styled(CardFace)`
  transform: rotateX(180deg);
  background: var(--surface);
`;

const ActionOverlay = styled.div<{ $opacity: number; $color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.$color};
  opacity: ${props => props.$opacity};
  border-radius: 32px;
  pointer-events: none;
  z-index: 10;
  transition: opacity 0.1s linear;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverlayText = styled.h2`
  color: white;
  font-size: 3rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transform: rotate(-15deg);
  text-shadow: 0 4px 10px rgba(0,0,0,0.3);
  border: 4px solid white;
  padding: 1rem 2rem;
  border-radius: 16px;
`;

const FrontContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LargeText = styled.h1`
  font-size: 6rem;
  font-weight: 800;
  color: var(--foreground);
  line-height: 1.2;
  margin: 0;
  
  @media (max-width: 600px) {
    font-size: 5rem;
  }
`;

const AudioBtn = styled.button`
  background: rgba(79, 70, 229, 0.1);
  color: var(--primary);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  pointer-events: auto; /* Allow click even if card is draggable */
  
  &:hover {
    background: var(--primary);
    color: white;
    transform: scale(1.1);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const Instruction = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 2rem;
`;

const BackContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const MeaningText = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #818cf8; /* Light indigo, highly legible in dark mode */
  text-align: center;
  margin: 0;
  line-height: 1.4;
  padding: 0 1rem;
  
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const ReadingText = styled.p`
  font-size: 1.5rem;
  color: var(--text-secondary);
  font-weight: 600;
  margin: 0;
`;

export interface FlashcardData {
  id: string;
  front: string;
  romaji: string;
  meaning: string;
  audioText?: string;
}

interface SwipeableCardProps {
  card: FlashcardData;
  active: boolean; // Is this the top card?
  index: number;
  onSwipe: (dir: 'left' | 'right', card: FlashcardData) => void;
}

export default function SwipeableCard({ card, active, index, onSwipe }: SwipeableCardProps) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [leaveAnim, setLeaveAnim] = useState(false);
  const [flipped, setFlipped] = useState(false);
  
  const startPos = useRef({ x: 0, y: 0 });
  
  const playAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playJapaneseAudio(card.audioText || card.front);
  };

  const SWIPE_THRESHOLD = 120; // px
  
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!active || leaveAnim) return;
    setIsDragging(true);
    startPos.current = { x: e.clientX - x, y: e.clientY - y };
    
    // Check if clicked exactly on audio button to prevent dragging
    if ((e.target as HTMLElement).closest('button')) {
      setIsDragging(false);
    } else {
       // Capture pointer so dragging works outside the card boundaries
       (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !active) return;
    setX(e.clientX - startPos.current.x);
    setY(e.clientY - startPos.current.y);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || !active) return;
    setIsDragging(false);
    
    // Release pointer capture
    if ((e.target as HTMLElement).hasPointerCapture(e.pointerId)) {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }

    // Check click vs drag
    if (Math.abs(x) < 5 && Math.abs(y) < 5) {
      setFlipped(!flipped);
      setX(0);
      setY(0);
      return;
    }

    if (x > SWIPE_THRESHOLD) {
      // Swiped Right
      setLeaveAnim(true);
      setX(window.innerWidth);
      setY(y + 100);
      setTimeout(() => onSwipe('right', card), 300);
    } else if (x < -SWIPE_THRESHOLD) {
      // Swiped Left
      setLeaveAnim(true);
      setX(-window.innerWidth);
      setY(y + 100);
      setTimeout(() => onSwipe('left', card), 300);
    } else {
      // Return to center
      setX(0);
      setY(0);
    }
  };

  // Safe visual rotation
  const rot = x * 0.05;

  // Overlays
  const rightOpacity = Math.max(0, Math.min(x / SWIPE_THRESHOLD, 1));
  const leftOpacity = Math.max(0, Math.min(-x / SWIPE_THRESHOLD, 1));

  return (
    <CardPerspective $zIndex={100 - index}>
      <CardContainer
        $x={x}
        $y={y}
        $rot={rot}
        $isDragging={isDragging}
        $leaveAnim={leaveAnim}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <CardInner $flipped={flipped}>
          <CardFace>
            <ActionOverlay $opacity={rightOpacity} $color="rgba(34, 197, 94, 0.8)">
              <OverlayText>KNOW</OverlayText>
            </ActionOverlay>
            <ActionOverlay $opacity={leftOpacity} $color="rgba(239, 68, 68, 0.8)">
              <OverlayText>STUDY</OverlayText>
            </ActionOverlay>
            
            <FrontContent>
              <LargeText>{card.front}</LargeText>
              <AudioBtn onClick={playAudio} aria-label="Play audio">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              </AudioBtn>
            </FrontContent>
            <Instruction>Tap to flip • Swipe to sort</Instruction>
          </CardFace>

          <CardBack>
            <ActionOverlay $opacity={rightOpacity} $color="rgba(34, 197, 94, 0.8)">
              <OverlayText>KNOW</OverlayText>
            </ActionOverlay>
            <ActionOverlay $opacity={leftOpacity} $color="rgba(239, 68, 68, 0.8)">
              <OverlayText>STUDY</OverlayText>
            </ActionOverlay>
            
            <BackContent>
              <MeaningText style={{ fontSize: card.meaning && card.meaning.length > 20 ? '1.5rem' : '2.5rem' }}>
                {card.meaning}
              </MeaningText>
              <ReadingText>{card.romaji}</ReadingText>
              <AudioBtn onClick={playAudio} style={{ marginTop: '1rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              </AudioBtn>
            </BackContent>
            <Instruction>Tap to flip back</Instruction>
          </CardBack>
        </CardInner>
      </CardContainer>
    </CardPerspective>
  );
}
