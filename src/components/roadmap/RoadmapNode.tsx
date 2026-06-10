"use client";

import React from "react";
import styled, { keyframes, css } from "styled-components";
import Link from "next/link";
import { RoadmapLesson } from "@/data/roadmap";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(var(--primary-rgb), 0); }
  100% { box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0); }
`;

const NodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  margin: 1rem 0;
`;

const NodeCircle = styled(Link)<{
  $status: "locked" | "available" | "completed";
  $type: string;
}>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;

  ${({ $status }) =>
    $status === "locked" &&
    css`
      background: var(--surface);
      border: 3px solid var(--border);
      color: var(--text-secondary);
      cursor: not-allowed;
      pointer-events: none;
      filter: grayscale(1);
      opacity: 0.6;
    `}

  ${({ $status }) =>
    $status === "available" &&
    css`
      background: var(--surface);
      border: 3px solid var(--primary);
      color: var(--primary);
      animation: ${pulse} 2s infinite;
      box-shadow: 0 10px 20px rgba(var(--primary-rgb), 0.2);

      &:hover {
        transform: scale(1.1) rotate(5deg);
        background: var(--primary);
        color: white;
      }
    `}

  ${({ $status }) =>
    $status === "completed" &&
    css`
      background: linear-gradient(135deg, var(--secondary) 0%, #059669 100%);
      border: 3px solid var(--secondary);
      color: white;
      box-shadow: 0 5px 15px rgba(var(--secondary-rgb), 0.3);

      &:hover {
        transform: scale(1.1);
      }
    `}
`;

const Icon = styled.div`
  svg {
    width: 32px;
    height: 32px;
  }
`;

const Label = styled.div<{ $status: string }>`
  margin-top: 1rem;
  font-weight: 700;
  font-size: 0.9rem;
  color: ${({ $status }) =>
    $status === "locked" ? "var(--text-secondary)" : "var(--foreground)"};
  white-space: nowrap;
  text-align: center;
  max-width: 150px;
`;

const TypeBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.6rem;
  font-weight: 800;
  text-transform: uppercase;
  background: var(--primary);
  color: white;
  z-index: 3;
`;

interface RoadmapNodeProps {
  lesson: RoadmapLesson;
  status: "locked" | "available" | "completed";
}

export function RoadmapNode({ lesson, status }: RoadmapNodeProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "writing":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        );
      case "quiz":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        );
      case "grammar":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        );
      case "survival":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      default:
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        );
    }
  };

  return (
    <NodeWrapper>
      {status !== "locked" && <TypeBadge>{lesson.type}</TypeBadge>}
      <NodeCircle
        href={lesson.link}
        $status={status}
        $type={lesson.type}
        title={lesson.description}
      >
        <Icon>{getIcon(lesson.type)}</Icon>
      </NodeCircle>
      <Label $status={status}>{lesson.title}</Label>
    </NodeWrapper>
  );
}
