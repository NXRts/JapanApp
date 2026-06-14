"use client";

import React from "react";
import styled, { keyframes } from "styled-components";

const strokeReveal = keyframes`
  from { stroke-dashoffset: 200; opacity: 0; }
  to { stroke-dashoffset: 0; opacity: 1; }
`;

const HeaderContainer = styled.div<{ $color: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 1.25rem 1rem;
  background-color: var(--surface) !important;
  border-radius: 24px;
  border: 1px solid var(--border) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  margin-bottom: 1.25rem;
  overflow: hidden;
  border-bottom: 3px solid ${({ $color }) => $color};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ $color }) => $color};
  }
`;

const ToriiWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
  color: var(--torii-red);
  filter: drop-shadow(0 2px 4px rgba(196, 30, 58, 0.15));

  svg path,
  svg rect {
    stroke-dasharray: 200;
    stroke-dashoffset: 200;
    animation: ${strokeReveal} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
`;

const UnitLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--zen-gold);
  margin-bottom: 0.25rem;
`;

const UnitTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--foreground);
  margin: 0;
  line-height: 1.3;
  font-family: "Outfit", "Nunito", sans-serif;
`;

const UnitDesc = styled.p`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin: 0.35rem 0 0;
  line-height: 1.45;
  max-width: 90%;
`;

interface ToriiPhaseHeaderProps {
  unitLabel: string;
  title: string;
  description: string;
  color: string;
}

export function ToriiPhaseHeader({
  unitLabel,
  title,
  description,
  color,
}: ToriiPhaseHeaderProps) {
  return (
    <HeaderContainer $color={color}>
      <ToriiWrapper>
        {/* Customized SVG Torii Gate */}
        <svg
          viewBox="0 0 100 60"
          width="72"
          height="44"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Kasagi - Upper curved beam */}
          <path d="M 8,14 C 28,10 72,10 92,14" />
          <path d="M 8,19 C 28,15 72,15 92,19" />
          <path d="M 8,14 L 8,19" />
          <path d="M 92,14 L 92,19" />

          {/* Shimoki - Lower straight horizontal beam */}
          <rect
            x="16"
            y="27"
            width="68"
            height="3"
            rx="0.5"
            fill="currentColor"
            stroke="none"
          />

          {/* Columns */}
          <path d="M 26,29 L 29,54" />
          <path d="M 74,29 L 71,54" />

          {/* Gakuzuka - Small center support block */}
          <rect
            x="48"
            y="19"
            width="4"
            height="8"
            fill="currentColor"
            stroke="none"
          />

          {/* Pedestals */}
          <rect
            x="26"
            y="52"
            width="6"
            height="3"
            rx="1"
            fill="currentColor"
            stroke="none"
          />
          <rect
            x="68"
            y="52"
            width="6"
            height="3"
            rx="1"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </ToriiWrapper>
      <UnitLabel>{unitLabel}</UnitLabel>
      <UnitTitle>{title}</UnitTitle>
      <UnitDesc>{description}</UnitDesc>
    </HeaderContainer>
  );
}
