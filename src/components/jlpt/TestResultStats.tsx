'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Stat {
  label: string;
  value: string | number;
  color?: string;
}

interface TestResultStatsProps {
  stats: Stat[];
}

const ResultGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-bottom: 3rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ResultCard = styled(motion.div)`
  background: rgba(var(--surface-rgb), 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  border-radius: 28px;
  padding: 1.75rem 1.25rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(var(--primary-rgb), 0.3);
    background: rgba(var(--surface-rgb), 0.6);
    transform: translateY(-5px);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(var(--primary-rgb), 0.05), transparent 70%);
    pointer-events: none;
  }
`;

const ResultValue = styled.div<{ $color?: string }>`
  font-size: 2.25rem;
  font-weight: 900;
  color: ${({ $color }) => $color || 'var(--primary)'};
  line-height: 1;
`;

const ResultLabel = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TestResultStats: React.FC<TestResultStatsProps> = ({ stats }) => {
  return (
    <ResultGrid
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {stats.map((stat, i) => (
        <ResultCard
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <ResultLabel>{stat.label}</ResultLabel>
          <ResultValue $color={stat.color}>{stat.value}</ResultValue>
        </ResultCard>
      ))}
    </ResultGrid>
  );
};
