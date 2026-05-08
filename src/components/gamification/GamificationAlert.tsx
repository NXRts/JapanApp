'use client';

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { TrophyIcon, SparklesIcon, FireIcon } from '../icons/AppIcons';

const slideUp = keyframes`
  0% { transform: translate(-50%, 100%); opacity: 0; }
  15% { transform: translate(-50%, -50%); opacity: 1; }
  85% { transform: translate(-50%, -50%); opacity: 1; }
  100% { transform: translate(-50%, -150%); opacity: 0; }
`;

const confetti = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10000;
  pointer-events: none;
`;

const AlertBox = styled.div<{ $type: 'level' | 'achievement' }>`
  background: var(--surface);
  border: 2px solid ${({ $type }) => $type === 'level' ? 'var(--primary)' : 'var(--secondary)'};
  border-radius: 24px;
  padding: 2rem 3rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3), 0 0 30px ${({ $type }) => $type === 'level' ? 'rgba(var(--primary-rgb), 0.3)' : 'rgba(var(--secondary-rgb), 0.3)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: ${slideUp} 4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  min-width: 320px;
  text-align: center;
`;

const IconWrapper = styled.div<{ $type: 'level' | 'achievement' }>`
  width: 80px;
  height: 80px;
  background: ${({ $type }) => $type === 'level' ? 'rgba(var(--primary-rgb), 0.1)' : 'rgba(var(--secondary-rgb), 0.1)'};
  color: ${({ $type }) => $type === 'level' ? 'var(--primary)' : 'var(--secondary)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  svg { width: 40px; height: 40px; }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 900;
  margin: 0;
  color: var(--foreground);
`;

const Description = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
`;

const Particle = styled.div<{ $delay: number; $left: number }>`
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--primary);
  border-radius: 2px;
  left: ${({ $left }) => $left}%;
  animation: ${confetti} 1s ease-out ${({ $delay }) => $delay}s infinite;
`;

export type GamificationAlertData = {
  type: 'level' | 'achievement';
  title: string;
  description: string;
  id: string;
};

export const GamificationAlert = ({ 
  data, 
  onClose 
}: { 
  data: GamificationAlertData; 
  onClose: (id: string) => void 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(data.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [data.id, onClose]);

  return (
    <AlertContainer>
      <AlertBox $type={data.type}>
        <IconWrapper $type={data.type}>
          {data.type === 'level' ? <SparklesIcon /> : <TrophyIcon />}
        </IconWrapper>
        <Title>{data.title}</Title>
        <Description>{data.description}</Description>
      </AlertBox>
    </AlertContainer>
  );
};
