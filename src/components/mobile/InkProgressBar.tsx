"use client";

import React from "react";
import styled from "styled-components";
import { CheckIcon } from "@/components/common/CheckIcon";

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  margin-top: 0.75rem;
  padding: 0.25rem 0;
`;

const BarTrack = styled.div`
  position: relative;
  flex: 1;
  height: 10px;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

  html.dark & {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const BarFill = styled.div<{ $percent: number; $color: string }>`
  height: 100%;
  width: ${({ $percent }) => `${$percent}%`};
  background: ${({ $color }) => $color};
  border-radius: 6px;
  transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;

  /* Brush stroke texture effect */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 8px 100%;
    opacity: 0.25;
  }
`;

const StampBadge = styled.div<{ $color: string; $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1.5px dashed ${({ $color }) => $color};
  color: ${({ $color, $active }) => ($active ? "#ffffff" : $color)};
  background: ${({ $color, $active }) => ($active ? $color : "transparent")};
  font-size: 0.58rem;
  font-weight: 800;
  transition: all 0.4s ease;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  /* Traditional Hanko stamp look */
  text-transform: uppercase;
  writing-mode: horizontal-tb;
`;

interface InkProgressBarProps {
  completed: number;
  total: number;
  color: string;
}

export function InkProgressBar({
  completed,
  total,
  color,
}: InkProgressBarProps) {
  const percent =
    total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
  const isMastered = percent === 100;

  return (
    <ProgressBarContainer>
      <BarTrack>
        <BarFill $percent={percent} $color={color} />
      </BarTrack>
      <StampBadge $color={color} $active={isMastered}>
        {isMastered ? <CheckIcon size={12} color="#ffffff" strokeWidth={3.5} /> : `${percent}%`}
      </StampBadge>
    </ProgressBarContainer>
  );
}
