'use client';

import React from 'react';
import styled from 'styled-components';

const Card = styled.div<{ $color: string }>`
  background: ${({ $color }) => $color};
  width: 160px;
  height: 100%;
  min-height: 140px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.3);
  position: sticky;
  left: 0;
  z-index: 10;
  transition: transform 0.3s ease;
  user-select: none;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 70px;
    flex-direction: row;
    position: relative;
    padding: 1rem;
    justify-content: flex-start;
    gap: 1rem;
    border-radius: 16px;
    margin-bottom: 0.5rem;
  }
`;

const IconWrapper = styled.div`
  background: rgba(255, 255, 255, 0.2);
  width: 70px;
  height: 70px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  
  svg {
    width: 40px;
    height: 40px;
    color: white;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    svg { width: 30px; height: 30px; }
  }
`;

const Label = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

interface CategoryCardProps {
  label: string;
  icon: React.ReactNode;
  color: string;
}

export function CategoryCard({ label, icon, color }: CategoryCardProps) {
  return (
    <Card $color={color}>
      <IconWrapper>{icon}</IconWrapper>
      <Label>{label}</Label>
    </Card>
  );
}
