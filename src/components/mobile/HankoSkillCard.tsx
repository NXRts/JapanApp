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
  align-items: flex-start;
  justify-content: space-between;
  width: 170px;
  height: 145px;
  padding: 1rem;
  border-radius: 20px;
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

const CardBadge = styled.span<{ $state: string; $color: string }>`
  font-size: 0.62rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 3px 8px;
  border-radius: 8px;
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
  font-size: 0.88rem;
  font-weight: 800;
  line-height: 1.25;
  color: var(--foreground);
  margin: 0.5rem 0 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: "Outfit", sans-serif;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: auto;
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--text-secondary);
`;

const HankoStamp = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid var(--torii-red);
  color: var(--torii-red);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 900;
  transform: rotate(-12deg);
  font-family: "Noto Sans JP", sans-serif;
  opacity: 0.95;
  user-select: none;
  animation: ${stampAppear} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;

  &::before {
    content: "済"; /* Traditional Hanko "Done" character */
  }
`;

const LockIcon = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  color: var(--text-secondary);
  opacity: 0.5;
`;

interface HankoSkillCardProps {
  title: string;
  badge: string;
  icon: string;
  expReward: number;
  state: "locked" | "available" | "active" | "mastered";
  color: string;
  onClick: () => void;
}

export function HankoSkillCard({
  title,
  badge,
  icon,
  expReward,
  state,
  color,
  onClick,
}: HankoSkillCardProps) {
  // Parse gradient or hex colors to solid colors for borders/text
  const solidColor = color.includes("gradient")
    ? color.match(/#(?:[0-9a-fA-F]{3}){1,2}/g)?.[0] || "#10b981"
    : color;

  return (
    <CardContainer
      $state={state}
      $color={solidColor}
      onClick={state === "locked" ? (e) => e.preventDefault() : onClick}
      aria-disabled={state === "locked"}
    >
      <CardBadge $state={state} $color={solidColor}>
        {badge}
      </CardBadge>

      {state === "locked" && (
        <LockIcon>
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
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

      {state === "mastered" && <HankoStamp />}

      <div style={{ width: "100%" }}>
        <div style={{ fontSize: "1.2rem", marginBottom: "2px" }}>{icon}</div>
        <CardTitle>{title}</CardTitle>
      </div>

      <CardFooter>
        <span>⭐ {expReward} EXP</span>
        {state === "active" && (
          <span style={{ color: "var(--torii-red)", fontWeight: 800 }}>
            Mulai
          </span>
        )}
      </CardFooter>
    </CardContainer>
  );
}
