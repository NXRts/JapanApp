'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

const NodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
`;

const NodeButton = styled(Link)<{ $status: 'locked' | 'available' | 'completed'; $rowColor: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid var(--border);
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 5;
  box-shadow: 0 4px 0 var(--border);

  &:active {
    transform: translateY(4px);
    box-shadow: none;
  }

  ${({ $status, $rowColor }) => 
    $status === 'available' && css`
      border-color: ${$rowColor};
      box-shadow: 0 6px 0 ${$rowColor};
      background: white;
      &:hover {
        transform: translateY(-4px) scale(1.05);
        box-shadow: 0 10px 0 ${$rowColor};
      }
    `
  }

  ${({ $status, $rowColor }) => 
    $status === 'completed' && css`
      background: ${$rowColor};
      border-color: ${$rowColor};
      box-shadow: 0 6px 0 rgba(0,0,0,0.2);
      &:hover {
        transform: translateY(-2px) scale(1.05);
      }
    `
  }

  ${({ $status }) => 
    $status === 'locked' && css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
      filter: grayscale(1);
    `
  }
`;

const NodeTitle = styled.span`
  font-size: 0.85rem;
  font-weight: 800;
  text-align: center;
  color: var(--foreground);
  line-height: 1.2;
`;

const CheckIcon = styled.div`
  position: absolute;
  bottom: -4px;
  right: -4px;
  background: #10B981;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border: 3px solid var(--surface);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const LockIcon = styled.div`
  color: var(--text-secondary);
  svg { width: 32px; height: 32px; }
`;

interface GridNodeProps {
  title: string;
  link: string;
  status: 'locked' | 'available' | 'completed';
  rowColor: string;
}

export function GridNode({ title, link, status, rowColor }: GridNodeProps) {
  return (
    <NodeContainer>
      <NodeButton href={link} $status={status} $rowColor={rowColor}>
        {status === 'completed' && (
          <>
            <span style={{ fontSize: '2rem' }}>⭐</span>
            <CheckIcon>✓</CheckIcon>
          </>
        )}
        {status === 'available' && (
          <span style={{ fontSize: '2rem' }}>📖</span>
        )}
        {status === 'locked' && (
          <LockIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </LockIcon>
        )}
      </NodeButton>
      <NodeTitle>{title}</NodeTitle>
    </NodeContainer>
  );
}
