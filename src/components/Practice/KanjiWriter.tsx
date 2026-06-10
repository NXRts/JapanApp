"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import HanziWriter from "hanzi-writer";

const CanvasWrapper = styled.div<{ $width: number; $height: number }>`
  position: relative;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  background: #fff;
  border-radius: 12px;
  border: 2px dashed var(--border);
  overflow: hidden;
  touch-action: none;
  margin: 0 auto;

  /* Grid lines for guidance */
  &::before,
  &::after {
    content: "";
    position: absolute;
    background: rgba(0, 0, 0, 0.05);
    z-index: 0;
    pointer-events: none;
  }

  &::before {
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    border-top: 1px dashed rgba(0, 0, 0, 0.1);
    background: none;
  }

  &::after {
    left: 50%;
    top: 0;
    height: 100%;
    width: 1px;
    border-left: 1px dashed rgba(0, 0, 0, 0.1);
    background: none;
  }
`;

const TargetDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  width: 100%;
`;

const ToolBtn = styled.button<{
  $variant?: "primary" | "danger" | "ghost" | "success" | undefined;
}>`
  background: ${({ $variant }) =>
    $variant === "danger"
      ? "rgba(239, 68, 68, 0.1)"
      : $variant === "success"
        ? "#10b981"
        : $variant === "primary"
          ? "var(--primary)"
          : $variant === "ghost"
            ? "transparent"
            : "var(--surface)"};
  border: 1px solid
    ${({ $variant }) =>
      $variant === "danger"
        ? "rgba(239, 68, 68, 0.2)"
        : $variant === "success"
          ? "#10b981"
          : $variant === "primary"
            ? "var(--primary)"
            : $variant === "ghost"
              ? "transparent"
              : "var(--border)"};
  color: ${({ $variant }) =>
    $variant === "danger"
      ? "#ef4444"
      : $variant === "primary" || $variant === "success"
        ? "#ffffff"
        : $variant === "ghost"
          ? "var(--text-secondary)"
          : "var(--foreground)"};
  padding: 0.5rem 0.85rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $variant }) =>
    $variant === "ghost" ? "none" : "var(--shadow-sm)"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ $variant }) =>
      $variant === "ghost" ? "none" : "var(--shadow-md)"};
    background: ${({ $variant }) =>
      $variant === "danger"
        ? "rgba(239, 68, 68, 0.15)"
        : $variant === "success"
          ? "#059669"
          : $variant === "primary"
            ? "var(--primary-dark)"
            : $variant === "ghost"
              ? "rgba(0,0,0,0.05)"
              : "var(--surface)"};
  }
`;

export interface KanjiWriterProps {
  char: string;
  width?: number;
  height?: number;
  onComplete?: () => void;
  onSkip?: () => void;
  hideToolbar?: boolean;
  autoLoop?: boolean;
}

export function KanjiWriter({
  char,
  width = 300,
  height = 300,
  onComplete,
  onSkip,
  hideToolbar = false,
  autoLoop = false,
}: KanjiWriterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriter | null>(null);
  const [isQuizzing, setIsQuizzing] = useState(false);

  useEffect(() => {
    if (!char || !containerRef.current) return;

    // Clean up previous instance if any
    containerRef.current.innerHTML = "";

    // Initialize HanziWriter
    writerRef.current = HanziWriter.create(containerRef.current, char, {
      width: width,
      height: height,
      padding: 15,
      showOutline: true,
      strokeAnimationSpeed: 1.5,
      delayBetweenStrokes: 100,
      strokeColor: "#333333",
      radicalColor: "#16a34a", // Highlights the radical in green
      outlineColor: "#e5e7eb",
    });

    // Auto animate or loop
    setTimeout(() => {
      if (autoLoop) {
        writerRef.current?.loopCharacterAnimation();
      } else {
        writerRef.current?.animateCharacter();
      }
    }, 500);

    return () => {
      writerRef.current = null;
    };
  }, [char, width, height, autoLoop]);

  const handleAnimate = () => {
    setIsQuizzing(false);
    writerRef.current?.cancelQuiz();
    writerRef.current?.animateCharacter();
  };

  const handlePractice = () => {
    if (!writerRef.current) return;
    setIsQuizzing(true);
    writerRef.current.quiz({
      onComplete: (summaryData) => {
        setIsQuizzing(false);
        if (onComplete) {
          setTimeout(onComplete, 1000); // 1s delay before moving to next card
        }
      },
      showHintAfterMisses: 1, // Show hint after 1 mistake
    });
  };

  const handleClear = () => {
    if (!writerRef.current) return;
    writerRef.current.cancelQuiz();
    writerRef.current.hideCharacter();
    writerRef.current.showOutline();
    setIsQuizzing(false);
  };

  return (
    <div>
      <CanvasWrapper $width={width} $height={height}>
        <TargetDiv ref={containerRef} />
      </CanvasWrapper>

      {!hideToolbar && (
        <Toolbar>
          <ToolBtn onClick={handleAnimate} $variant="primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Animate
          </ToolBtn>
          <ToolBtn
            onClick={handlePractice}
            $variant={isQuizzing ? "success" : undefined}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            Practice
          </ToolBtn>
          <ToolBtn onClick={handleClear} $variant="ghost">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"></path>
            </svg>
            Clear
          </ToolBtn>
          {onSkip && (
            <ToolBtn onClick={onSkip} $variant="ghost">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
              Skip
            </ToolBtn>
          )}
        </Toolbar>
      )}
    </div>
  );
}
