"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { getStrokePaths } from "../utils/strokePaths";

const dash = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  user-select: none;
`;

const CanvasWrapper = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
  touch-action: none;
`;

const GridBackground = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.35;

  line {
    stroke: var(--primary-light);
    stroke-dasharray: 4, 4;
    stroke-width: 1.5;
  }
`;

const SvgStrokeGuide = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const StrokePathTemplate = styled.path`
  fill: none;
  stroke: var(--border);
  stroke-width: 12;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.4;
`;

const AnimatedStrokePath = styled.path<{ $animating: boolean; $delay: number }>`
  fill: none;
  stroke: var(--primary);
  stroke-width: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 300;
  stroke-dashoffset: 300;

  ${({ $animating, $delay }) =>
    $animating &&
    css`
      animation: ${dash} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      animation-delay: ${$delay}s;
    `}
`;

const StrokeNumberBadge = styled.text`
  font-size: 7.5px;
  font-weight: 900;
  fill: #6366f1;
  font-family: "DM Mono", monospace;
  pointer-events: none;
`;

const InteractiveCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: crosshair;
  z-index: 10;
`;

const ControlBar = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const ActionBtn = styled.button<{ $active?: boolean; $variant?: "primary" | "secondary" | "danger" }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.55rem 0.9rem;
  border-radius: 12px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid var(--border);

  background: ${({ $variant, $active }) =>
    $variant === "primary"
      ? "var(--primary)"
      : $active
        ? "rgba(var(--primary-rgb), 0.15)"
        : "var(--surface)"};

  color: ${({ $variant, $active }) =>
    $variant === "primary"
      ? "white"
      : $active
        ? "var(--primary)"
        : "var(--foreground)"};

  border-color: ${({ $variant, $active }) =>
    $variant === "primary"
      ? "var(--primary)"
      : $active
        ? "var(--primary)"
        : "var(--border)"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }

  svg {
    width: 15px;
    height: 15px;
  }
`;

const HintBox = styled.div`
  font-size: 0.78rem;
  color: var(--text-secondary);
  text-align: center;
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--background);
  padding: 0.4rem 0.8rem;
  border-radius: 99px;
  border: 1px solid var(--border);
`;

interface InteractiveStrokeWriterProps {
  char: string;
  onStrokeCompleted?: () => void;
}

function getStartCoords(d: string, index: number, allPaths: string[]): { x: number; y: number } {
  const match = d.match(/M\s*(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)/i);
  if (!match) return { x: 15, y: 15 };

  let x = parseFloat(match[1]);
  let y = parseFloat(match[2]);

  // Check direction of stroke (horizontal vs vertical)
  const nextSegment = d.match(/(?:L|C)\s*(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)/i);
  let isHorizontal = false;
  if (nextSegment) {
    const nx = parseFloat(nextSegment[1]);
    const ny = parseFloat(nextSegment[2]);
    if (Math.abs(nx - x) > Math.abs(ny - y)) {
      isHorizontal = true;
    }
  }

  // Handle shared starting points (like stroke 1 and 2 at top-left corner)
  let isSharedWithPrev = false;
  for (let i = 0; i < index; i++) {
    const prevMatch = allPaths[i].match(/M\s*(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)/i);
    if (prevMatch) {
      const px = parseFloat(prevMatch[1]);
      const py = parseFloat(prevMatch[2]);
      if (Math.abs(x - px) < 6 && Math.abs(y - py) < 6) {
        isSharedWithPrev = true;
        break;
      }
    }
  }

  if (isSharedWithPrev) {
    if (isHorizontal && nextSegment) {
      const nx = parseFloat(nextSegment[1]);
      x = (x + nx) / 2; // Position stroke 2 badge above the midpoint of horizontal bar
      y = Math.max(8, y - 9);
    } else {
      x = Math.max(8, x - 11);
      y = Math.max(8, y - 8);
    }
  } else {
    if (x <= 35) {
      x = Math.max(8, x - 11);
    } else if (y <= 30) {
      y = Math.max(8, y - 10);
    } else {
      x = Math.max(8, x - 10);
      y = Math.max(8, y - 2);
    }
  }

  return { x: Math.round(x), y: Math.round(y) };
}

function getStrokeDirection(d: string): { arrow: string; angle: number } {
  const matchM = d.match(/M\s*(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)/i);
  const matchNext = d.match(/(?:L|C)\s*(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)/i);

  if (!matchM || !matchNext) return { arrow: "→", angle: 0 };

  const x1 = parseFloat(matchM[1]);
  const y1 = parseFloat(matchM[2]);
  const x2 = parseFloat(matchNext[1]);
  const y2 = parseFloat(matchNext[2]);

  const dx = x2 - x1;
  const dy = y2 - y1;

  if (Math.abs(dx) > Math.abs(dy) * 1.5) {
    return { arrow: dx > 0 ? "→" : "←", angle: dx > 0 ? 0 : 180 };
  } else if (Math.abs(dy) > Math.abs(dx) * 1.5) {
    return { arrow: dy > 0 ? "↓" : "↑", angle: dy > 0 ? 90 : 270 };
  } else if (dx > 0 && dy > 0) {
    return { arrow: "↘", angle: 45 };
  } else if (dx < 0 && dy > 0) {
    return { arrow: "↙", angle: 135 };
  } else if (dx > 0 && dy < 0) {
    return { arrow: "↗", angle: 315 };
  }

  return { arrow: "→", angle: 0 };
}

export function InteractiveStrokeWriter({ char, onStrokeCompleted }: InteractiveStrokeWriterProps) {
  const [showTemplate, setShowTemplate] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const [strokeCount, setStrokeCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const paths = getStrokePaths(char);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setStrokeCount(0);
  }, []);

  const replayAnimation = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsAnimating(true);
    }, 50);
  };

  // Setup Canvas Resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(2, 2);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#4f46e5";
      ctx.lineWidth = 9;
    }
  }, []);

  // Drawing event handlers
  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawingRef.current = true;
    const pos = getCanvasCoords(e);
    lastPosRef.current = pos;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || !lastPosRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentPos = getCanvasCoords(e);

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPosRef.current = currentPos;
  };

  const stopDrawing = () => {
    if (isDrawingRef.current) {
      setStrokeCount((prev) => prev + 1);
      if (onStrokeCompleted) onStrokeCompleted();
    }
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  return (
    <Container>
      <CanvasWrapper>
        {/* Grid Lines (十字格 / 田字格) */}
        {showGrid && (
          <GridBackground viewBox="0 0 100 100">
            <line x1="50" y1="0" x2="50" y2="100" />
            <line x1="0" y1="50" x2="100" y2="50" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2,2" />
          </GridBackground>
        )}

        {/* SVG Stroke Order Guide Template & Animation */}
        <SvgStrokeGuide viewBox="0 0 100 100">
          {/* Static Background Template */}
          {showTemplate &&
            paths.map((p, idx) => (
              <StrokePathTemplate key={`tmpl-${idx}`} d={p} />
            ))}

          {/* Animated Strokes with Order Numbers */}
          {paths.map((p, idx) => (
            <React.Fragment key={`anim-${idx}`}>
              <AnimatedStrokePath
                d={p}
                $animating={isAnimating}
                $delay={idx * 0.9}
              />
              {showTemplate &&
                (() => {
                  const coords = getStartCoords(p, idx, paths);
                  const dir = getStrokeDirection(p);
                  return (
                    <g key={`num-badge-${idx}`} transform={`translate(${coords.x}, ${coords.y})`}>
                      <rect
                        x="-6"
                        y="-4.5"
                        width="12"
                        height="9"
                        rx="4.5"
                        fill="var(--primary)"
                        stroke="var(--surface)"
                        strokeWidth="0.8"
                      />
                      <text
                        x="0"
                        y="0.7"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="4.2"
                        fontWeight="900"
                        fill="#ffffff"
                        fontFamily="sans-serif"
                      >
                        {idx + 1}{dir.arrow}
                      </text>
                    </g>
                  );
                })()}
            </React.Fragment>
          ))}
        </SvgStrokeGuide>

        {/* Interactive Handwriting Canvas Pad */}
        <InteractiveCanvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </CanvasWrapper>

      <HintBox>
        <span>✏️</span> Tulis karakter <strong>{char}</strong> sesuai nomor urutan goresan ({paths.length} Goresan)
      </HintBox>

      {/* Control Actions */}
      <ControlBar>
        <ActionBtn onClick={replayAnimation} $variant="primary" title="Putar Ulang Animasi Goresan">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Putar Goresan
        </ActionBtn>

        <ActionBtn onClick={() => setShowTemplate(!showTemplate)} $active={showTemplate}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Jiplakan
        </ActionBtn>

        <ActionBtn onClick={() => setShowGrid(!showGrid)} $active={showGrid}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="12" y1="3" x2="12" y2="21" />
          </svg>
          Grid
        </ActionBtn>

        <ActionBtn onClick={clearCanvas} title="Hapus Tulisan di Kanvas">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
          Hapus ({strokeCount})
        </ActionBtn>
      </ControlBar>
    </Container>
  );
}
