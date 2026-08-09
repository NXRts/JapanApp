"use client";

import React from "react";
import styled, { keyframes, css } from "styled-components";
import { LessonIcon } from "@/components/home/LessonIcon";
import { Lesson } from "@/data/lessonsData";

export type NodeStatus = "completed" | "active" | "locked";

interface RoadmapInteractiveNodeProps {
  lesson: Lesson;
  status: NodeStatus;
  color?: string;
  isCurrentActive?: boolean;
  onClick: () => void;
}

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.4); }
  70% { transform: scale(1.04); box-shadow: 0 0 0 12px rgba(236, 72, 153, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(236, 72, 153, 0); }
`;

const NodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 110px;
`;

const FloatingTooltip = styled.div<{ $color: string }>`
  position: absolute;
  top: -40px;
  background: ${({ $color }) => $color};
  color: white;
  font-weight: 900;
  font-size: 0.72rem;
  padding: 4px 10px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  animation: floatTooltip 1.4s infinite ease-in-out;
  white-space: nowrap;
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px 5px 0;
    border-style: solid;
    border-color: ${({ $color }) => $color} transparent;
  }

  @keyframes floatTooltip {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
`;

const TactileButton = styled.button<{
  $status: NodeStatus;
  $color: string;
  $isCurrentActive?: boolean;
}>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $status }) => ($status === "locked" ? "not-allowed" : "pointer")};
  position: relative;
  border: none;
  outline: none;
  transition: all 0.18s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 2;

  ${({ $status, $color, $isCurrentActive }) => {
    if ($status === "locked") {
      return css`
        background: #334155;
        border-bottom: 6px solid #1e293b;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        opacity: 0.75;
      `;
    }

    if ($status === "completed") {
      return css`
        background: #10b981;
        border-bottom: 6px solid #059669;
        box-shadow: 0 6px 14px rgba(16, 185, 129, 0.3);
      `;
    }

    // Active status
    return css`
      background: ${$color};
      border-bottom: 6px solid rgba(0, 0, 0, 0.35);
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);

      ${$isCurrentActive &&
      css`
        animation: ${pulse} 2s infinite;
      `}
    `;
  }}

  &:hover {
    ${({ $status }) =>
      $status !== "locked" &&
      css`
        transform: scale(1.08) translateY(-3px);
        filter: brightness(1.1);
      `}
  }

  &:active {
    ${({ $status }) =>
      $status !== "locked" &&
      css`
        transform: scale(0.96) translateY(4px) !important;
        border-bottom-width: 2px !important;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      `}
  }
`;

const NodeTitle = styled.span<{ $status: NodeStatus }>`
  font-size: 0.8rem;
  font-weight: 800;
  color: ${({ $status }) =>
    $status === "locked" ? "var(--text-secondary)" : "var(--foreground)"};
  margin-top: 0.6rem;
  text-align: center;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 100px;
`;

const XPBadge = styled.span`
  position: absolute;
  bottom: -4px;
  right: -4px;
  background: #f59e0b;
  color: white;
  font-size: 0.65rem;
  font-weight: 900;
  padding: 2px 6px;
  border-radius: 8px;
  border: 1.5px solid var(--surface);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17L4 12"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2"
        fill="#94a3b8"
        stroke="#64748b"
        strokeWidth="1.5"
      />
      <path
        d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
        stroke="#94a3b8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RoadmapInteractiveNode({
  lesson,
  status,
  color = "var(--primary)",
  isCurrentActive = false,
  onClick,
}: RoadmapInteractiveNodeProps) {
  return (
    <NodeWrapper>
      {isCurrentActive && status === "active" && (
        <FloatingTooltip $color={color}>Mulai di Sini!</FloatingTooltip>
      )}

      <TactileButton
        $status={status}
        $color={color}
        $isCurrentActive={isCurrentActive}
        onClick={onClick}
        aria-label={lesson.title}
      >
        {status === "completed" ? (
          <CheckIcon />
        ) : status === "locked" ? (
          <LockIcon />
        ) : (
          <LessonIcon icon={lesson.icon || "book"} color="white" />
        )}

        {status !== "locked" && lesson.expReward > 0 && (
          <XPBadge>+{status === "completed" ? 5 : lesson.expReward} XP</XPBadge>
        )}
      </TactileButton>

      <NodeTitle $status={status}>{lesson.title}</NodeTitle>
    </NodeWrapper>
  );
}
