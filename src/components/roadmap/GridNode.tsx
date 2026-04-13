'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

const NodeLink = styled(Link)<{ $status: 'locked' | 'available' | 'completed'; $rowColor: string }>`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1rem 1.5rem;
  min-width: 180px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--foreground);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 5;
  box-shadow: var(--shadow-sm);

  ${({ $status, $rowColor }) => 
    $status === 'available' && css`
      border-color: ${$rowColor};
      border-width: 2px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      &:hover {
        transform: translateY(-4px);
        background: ${$rowColor};
        color: white;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      }
    `
  }

  ${({ $status, $rowColor }) => 
    $status === 'completed' && css`
      background: ${$rowColor};
      border-color: ${$rowColor};
      color: white;
      opacity: 0.9;
      &:hover {
        transform: translateY(-2px);
        opacity: 1;
      }
      &::after {
        content: '✓';
        position: absolute;
        top: -8px;
        right: -8px;
        background: #10B981;
        color: white;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
        border: 2px solid var(--surface);
      }
    `
  }

  ${({ $status }) => 
    $status === 'locked' && css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
      background: var(--background);
      border-style: dashed;
    `
  }

  @media (max-width: 768px) {
    min-width: 140px;
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }
`;

interface GridNodeProps {
  title: string;
  link: string;
  status: 'locked' | 'available' | 'completed';
  rowColor: string;
}

export function GridNode({ title, link, status, rowColor }: GridNodeProps) {
  return (
    <NodeLink href={link} $status={status} $rowColor={rowColor}>
      {title}
    </NodeLink>
  );
}
