'use client';

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { TrophyIcon, SparklesIcon } from '../icons/AppIcons';

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const progressBar = keyframes`
  from { width: 100%; }
  to { width: 0%; }
`;

const ToastBox = styled(motion.div)<{ $type: 'level' | 'achievement' }>`
  pointer-events: auto;
  background: var(--surface);
  border: 1px solid ${({ $type }) =>
    $type === 'level'
      ? 'rgba(var(--primary-rgb), 0.5)'
      : 'rgba(16, 185, 129, 0.45)'};
  border-radius: 16px;
  padding: 1rem 1.25rem;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.28),
    0 0 0 1px rgba(255,255,255,0.04),
    0 0 20px ${({ $type }) =>
      $type === 'level'
        ? 'rgba(var(--primary-rgb), 0.15)'
        : 'rgba(16, 185, 129, 0.12)'};
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  width: 340px;
  max-width: calc(100vw - 2rem);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  backdrop-filter: blur(12px);

  /* Shimmer stripe at top */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ $type }) =>
      $type === 'level'
        ? 'linear-gradient(90deg, transparent, var(--primary), transparent)'
        : 'linear-gradient(90deg, transparent, #10b981, transparent)'};
    background-size: 200% 100%;
    animation: ${shimmer} 2s linear infinite;
  }

  /* On mobile: stretch to full width */
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const IconBubble = styled.div<{ $type: 'level' | 'achievement' }>`
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $type }) =>
    $type === 'level'
      ? 'rgba(var(--primary-rgb), 0.12)'
      : 'rgba(16, 185, 129, 0.12)'};
  color: ${({ $type }) =>
    $type === 'level' ? 'var(--primary)' : '#10b981'};

  svg {
    width: 22px;
    height: 22px;
  }
`;

const TextGroup = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Tag = styled.span<{ $type: 'level' | 'achievement' }>`
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $type }) =>
    $type === 'level' ? 'var(--primary)' : '#10b981'};
  font-family: 'DM Mono', monospace;
`;

const Title = styled.div`
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--foreground);
  line-height: 1.2;
  letter-spacing: -0.01em;
`;

const Description = styled.div`
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin-top: 0.1rem;
`;

const CloseBtn = styled.button`
  flex-shrink: 0;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  opacity: 0.6;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
    color: var(--foreground);
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const ProgressBarWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.05);
`;

const ProgressFill = styled.div<{ $duration: number; $type: 'level' | 'achievement' }>`
  height: 100%;
  background: ${({ $type }) =>
    $type === 'level' ? 'var(--primary)' : '#10b981'};
  animation: ${progressBar} ${({ $duration }) => $duration}ms linear forwards;
`;

export type GamificationAlertData = {
  type: 'level' | 'achievement';
  title: string;
  description: string;
  id: string;
};

const DURATION = 5000;

export const GamificationAlert = ({
  data,
  onClose,
}: {
  data: GamificationAlertData;
  onClose: (id: string) => void;
}) => {
  const [visible, setVisible] = useState(true);
  // Detect mobile for animation direction
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => onClose(data.id), 350);
  };

  useEffect(() => {
    const t = setTimeout(dismiss, DURATION);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.id]);

  const motionProps = isMobile
    ? {
        initial: { opacity: 0, y: 80, scale: 0.92 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit:    { opacity: 0, y: 80, scale: 0.88 },
      }
    : {
        initial: { opacity: 0, x: 60, scale: 0.92 },
        animate: { opacity: 1, x: 0, scale: 1 },
        exit:    { opacity: 0, x: 60, scale: 0.88 },
      };

  return (
    <AnimatePresence>
      {visible && (
        <ToastBox
          $type={data.type}
          {...motionProps}
          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
          onClick={dismiss}
          role="alert"
          aria-live="polite"
        >
          <IconBubble $type={data.type}>
            {data.type === 'level' ? <SparklesIcon /> : <TrophyIcon />}
          </IconBubble>

          <TextGroup>
            <Tag $type={data.type}>
              {data.type === 'level' ? '⬆ Level Up' : '🏆 Achievement'}
            </Tag>
            <Title>{data.title}</Title>
            <Description>{data.description}</Description>
          </TextGroup>

          <CloseBtn
            onClick={(e) => { e.stopPropagation(); dismiss(); }}
            aria-label="Dismiss notification"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </CloseBtn>

          <ProgressBarWrap>
            <ProgressFill $duration={DURATION} $type={data.type} />
          </ProgressBarWrap>
        </ToastBox>
      )}
    </AnimatePresence>
  );
};
