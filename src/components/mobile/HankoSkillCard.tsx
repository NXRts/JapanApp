"use client";

import React from "react";
import styled, { keyframes, css } from "styled-components";

const stampAppear = keyframes`
  0% { transform: scale(2.5); opacity: 0; filter: blur(3px); }
  70% { transform: scale(0.95); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; filter: none; }
`;

const CardContainer = styled.button<{
  $state: "locked" | "available" | "active" | "mastered";
  $color: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  width: 160px;
  height: 135px;
  padding: 0.85rem;
  border-radius: 18px;
  background-color: var(--surface) !important;
  color: var(--foreground);
  border: 2px solid var(--border);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 148px;
    height: 128px;
    padding: 0.7rem;
    border-radius: 16px;
  }
  /* PWA: no tap highlight, no selection */
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  ${({ $state, $color }) =>
    $state === "locked" &&
    css`
      cursor: not-allowed;
      background-color: var(--background) !important;
      border-style: dashed;
      border-color: var(--border) !important;

      /* Fade inner elements for locked state instead of fadding the container */
      & > span,
      & > div,
      & > svg {
        opacity: 0.5;
      }
    `}

  ${({ $state, $color }) =>
    $state === "available" &&
    css`
      border-color: ${$color} !important;
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
      }
    `}

  ${({ $state, $color }) =>
    $state === "active" &&
    css`
      border-color: var(--torii-red) !important;
      box-shadow:
        0 0 0 2px rgba(196, 30, 58, 0.15),
        0 8px 20px rgba(196, 30, 58, 0.1);
      animation: pulseActive 2s infinite ease-in-out;

      &:hover {
        transform: translateY(-4px);
      }

      @keyframes pulseActive {
        0%,
        100% {
          border-color: var(--torii-red);
        }
        50% {
          border-color: var(--zen-gold);
        }
      }
    `}

  ${({ $state, $color }) =>
    $state === "mastered" &&
    css`
      border-color: ${$color} !important;
      background-color: var(--surface) !important;
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
      }
    `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 4px;
  min-height: 26px;
`;

const CardBadge = styled.span<{ $state: string; $color: string }>`
  font-size: 0.58rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 3px 8px;
  border-radius: 8px;
  /* Prevent badge from overflowing into the icon */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
  background: ${({ $state, $color }) =>
    $state === "locked"
      ? "rgba(0,0,0,0.08)"
      : $state === "active"
        ? "rgba(196, 30, 58, 0.1)"
        : "rgba(0,0,0,0.04)"};
  color: ${({ $state, $color }) =>
    $state === "locked"
      ? "var(--text-secondary)"
      : $state === "active"
        ? "var(--torii-red)"
        : $color};

  html.dark & {
    background: ${({ $state }) =>
      $state === "locked"
        ? "rgba(255,255,255,0.05)"
        : "rgba(255,255,255,0.08)"};
    color: ${({ $state, $color }) =>
      $state === "locked" ? "var(--text-secondary)" : "#ffffff"};
  }
`;

const CardTitle = styled.h4`
  font-size: 0.82rem;
  font-weight: 800;
  line-height: 1.2;
  color: var(--foreground);
  margin: 0.35rem 0 0.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: "Outfit", sans-serif;

  @media (max-width: 480px) {
    font-size: 0.78rem;
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: auto;
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--text-secondary);
`;

const HankoStamp = styled.div<{ $isPartial?: boolean }>`
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid ${({ $isPartial }) => ($isPartial ? "#f59e0b" : "#10b981")};
  color: ${({ $isPartial }) => ($isPartial ? "#f59e0b" : "#10b981")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $isPartial }) => ($isPartial ? "0.6rem" : "0.75rem")};
  font-weight: 900;
  transform: rotate(-6deg);
  font-family: "Noto Sans JP", sans-serif;
  opacity: 0.95;
  user-select: none;
  background: ${({ $isPartial }) =>
    $isPartial ? "rgba(245, 158, 11, 0.12)" : "rgba(16, 185, 129, 0.12)"};
  animation: ${stampAppear} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`;

const LockIcon = styled.div`
  flex-shrink: 0;
  color: var(--text-secondary);
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface HankoSkillCardProps {
  id?: string;
  title: string;
  badge: string;
  icon: string;
  expReward: number;
  state: "locked" | "available" | "active" | "mastered";
  score?: number;
  color: string;
  onClick: () => void;
}

export function HankoSkillCard({
  id,
  title,
  badge,
  icon,
  expReward,
  state,
  score,
  color,
  onClick,
}: HankoSkillCardProps) {
  // Parse gradient or hex colors to solid colors for borders/text
  const solidColor = color.includes("gradient")
    ? color.match(/#(?:[0-9a-fA-F]{3}){1,2}/g)?.[0] || "#10b981"
    : color;

  const isPartial = score !== undefined && score < 100;

  return (
    <CardContainer
      id={id}
      $state={state}
      $color={solidColor}
      onClick={state === "locked" ? (e) => e.preventDefault() : onClick}
      aria-disabled={state === "locked"}
    >
      {/* Header row: badge label + lock/stamp icon side by side, no overlap */}
      <CardHeader>
        <CardBadge $state={state} $color={solidColor}>
          {badge}
        </CardBadge>

        {state === "locked" && (
          <LockIcon>
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </LockIcon>
        )}

        {state === "mastered" && (
          <HankoStamp $isPartial={isPartial}>
            {isPartial ? `${score}%` : "済"}
          </HankoStamp>
        )}
      </CardHeader>

      <div style={{ width: "100%", flex: 1 }}>
        <div style={{ fontSize: "1.2rem", marginBottom: "2px" }}>{icon}</div>
        <CardTitle>{title}</CardTitle>
      </div>

      <CardFooter>
        <span>⭐ {state === "mastered" ? 5 : expReward} EXP</span>
        {state === "active" && (
          <span style={{ color: "var(--torii-red)", fontWeight: 800 }}>
            Mulai
          </span>
        )}
        {state === "mastered" && (
          <span
            style={{
              color: isPartial ? "var(--primary)" : "#10b981",
              fontWeight: 800,
            }}
          >
            {isPartial ? "Ulang" : "Done"}
          </span>
        )}
      </CardFooter>
    </CardContainer>
  );
}
