'use client';

import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { LessonIcon } from './LessonIcon';

interface NodeData {
  title: string;
  description: string;
  expReward: number;
  href: string;
  icon: string;
  badge?: string;
  color?: string;
}

interface RoadmapNodeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  nodeData: NodeData | null;
}

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Backdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 2000;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  animation: ${fadeIn} 0.3s ease-out;
`;

const DrawerContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-radius: 32px 32px 0 0;
  padding: 2rem 2rem calc(2rem + env(safe-area-inset-bottom));
  z-index: 2001;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.2);
  animation: ${slideUp} 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  max-height: 80vh;
  overflow-y: auto;

  @media (min-width: 600px) {
    max-width: 500px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 32px;
    bottom: 2rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    /* Update slideUp animation mapping in desktop if needed, but translate works */
  }
`;

const Handle = styled.div`
  width: 48px;
  height: 5px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  margin-bottom: 1.5rem;
  
  @media (prefers-color-scheme: light) {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--foreground);
  }
`;

const EmojiBadge = styled.div<{ $color?: string }>`
  width: 90px;
  height: 90px;
  border-radius: 28px;
  background: radial-gradient(circle at center, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%);
  border: 3px solid ${({ $color }) => $color || 'var(--primary)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3), 0 0 20px ${({ $color }) => ($color ? `${$color}40` : 'rgba(var(--primary-rgb), 0.25)')};
  position: relative;
  overflow: hidden;
  
  @media (prefers-color-scheme: light) {
    background: radial-gradient(circle at center, #ffffff 0%, #f1f5f9 100%);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08), 0 0 15px ${({ $color }) => ($color ? `${$color}25` : 'rgba(var(--primary-rgb), 0.15)')};
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--foreground);
`;

const Badge = styled.span`
  background: rgba(234, 88, 12, 0.15);
  color: #ea580c;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  margin-bottom: 1rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.75rem;
  max-width: 90%;
`;

const RewardTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
  color: #eab308; /* Gold yellow */
  background: rgba(234, 179, 8, 0.1);
  border: 1px solid rgba(234, 179, 8, 0.2);
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  font-size: 0.95rem;
  margin-bottom: 2rem;
`;

const StartButton = styled(Link)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: #ffffff;
  border-radius: 16px;
  font-size: 1.05rem;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(var(--primary-rgb), 0.25);
  border: none;
  border-bottom: 4px solid var(--primary-dark);
  transition: all 0.1s ease;
  cursor: pointer;

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

export function RoadmapNodeDrawer({ isOpen, onClose, nodeData }: RoadmapNodeDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !nodeData) return null;

  return (
    <>
      <Backdrop $isOpen={isOpen} onClick={onClose} />
      <DrawerContainer $isOpen={isOpen}>
        <Handle />
        <CloseButton onClick={onClose} aria-label="Close details">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </CloseButton>
        
        <EmojiBadge $color={nodeData.color}>
          <LessonIcon
            icon={nodeData.icon}
            badge={nodeData.badge || ''}
            color={nodeData.color || '#10b981'}
            unlocked={true}
          />
        </EmojiBadge>
        {nodeData.badge && <Badge>{nodeData.badge}</Badge>}
        <Title>{nodeData.title}</Title>
        <Description>{nodeData.description}</Description>
        
        <RewardTag>
          ⭐ +{nodeData.expReward} EXP Reward
        </RewardTag>
        
        <StartButton href={nodeData.href} onClick={onClose}>
          Mulai Pelajaran
        </StartButton>
      </DrawerContainer>
    </>
  );
}
