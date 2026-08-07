"use client";

import React, { useState, useRef } from "react";
import styled from "styled-components";
import { getStrokePaths } from "../utils/strokePaths";

const GridContainer = styled.div`
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1.5px dashed var(--border);
  padding-bottom: 0.6rem;

  h3 {
    font-size: 1rem;
    font-weight: 800;
    color: var(--foreground);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .subtitle {
    font-size: 0.78rem;
    color: var(--text-secondary);
  }
`;

const WorksheetTable = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  background: var(--background);
`;

const WorksheetRow = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  width: 100%;
  border-bottom: 1.5px solid var(--border);

  &:last-child {
    border-bottom: none;
  }
`;

const CellBox = styled.div<{ $isStep?: boolean }>`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-right: 1.5px solid var(--border);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $isStep }) => ($isStep ? "rgba(var(--primary-rgb), 0.05)" : "transparent")};

  &:last-child {
    border-right: none;
  }

  svg.cell-grid {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`;

const CellCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: crosshair;
  z-index: 5;
`;

const StepBadge = styled.div`
  position: absolute;
  bottom: 3px;
  right: 4px;
  font-size: 0.6rem;
  font-weight: 800;
  color: var(--text-secondary);
  background: rgba(var(--primary-rgb), 0.12);
  padding: 1px 4px;
  border-radius: 4px;

  @media (max-width: 640px) {
    display: none;
  }
`;

const ControlBar = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  .btn-group {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  button {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0.5rem 0.9rem;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    background: var(--surface);
    color: var(--foreground);
    border: 1px solid var(--border);
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    &.primary {
      background: var(--primary);
      color: white;
      border-color: var(--primary);

      &:hover {
        opacity: 0.9;
      }
    }
  }
`;

interface Props {
  char: string;
}

export function KanjiGridPractice({ char }: Props) {
  const strokePaths = getStrokePaths(char);
  const totalStrokes = strokePaths.length;
  const [showGhost, setShowGhost] = useState(true);

  // References to multiple drawing canvases (3 rows * totalColumns)
  const cellCanvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Responsive total columns per row (e.g. 10 columns max to fit 100% width cleanly without scrollbar)
  const totalColumns = Math.max(10, totalStrokes + 3);

  const clearAllCanvases = () => {
    cellCanvasRefs.current.forEach((canvas) => {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    });
  };

  const getCanvasCoords = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
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

    const scaleX = canvas.width / (rect.width || 1);
    const scaleY = canvas.height / (rect.height || 1);

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    isDrawingRef.current = true;
    lastPosRef.current = getCanvasCoords(e, canvas);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    if (!isDrawingRef.current || !lastPosRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentPos = getCanvasCoords(e, canvas);

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.strokeStyle = "#6366f1";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    lastPosRef.current = currentPos;
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  return (
    <GridContainer>
      <SectionHeader>
        <h3>
          <span>🖌️</span> Lembar Latihan Menulis Kanji ({char})
        </h3>
        <span className="subtitle">Responsif 100% tanpa scrollbar samping</span>
      </SectionHeader>

      <WorksheetTable>
        {/* ROW 1: STEP SEQUENCE + 3 GHOST CELLS + BLANK CELLS */}
        <WorksheetRow $cols={totalColumns}>
          {Array.from({ length: totalColumns }).map((_, colIdx) => {
            const isStepCell = colIdx < totalStrokes;
            const isTracingCell = colIdx >= totalStrokes && colIdx < totalStrokes + 3;
            const cellIndex = colIdx;

            return (
              <CellBox key={`row1-${colIdx}`} $isStep={isStepCell}>
                {/* Dashed Crosshairs Grid 十字格 */}
                <svg className="cell-grid" viewBox="0 0 100 100">
                  <line x1="50" y1="0" x2="50" y2="100" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3,3" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3,3" />

                  {/* Step-by-Step strokes */}
                  {isStepCell &&
                    strokePaths.slice(0, colIdx + 1).map((p, strokeIdx) => (
                      <path
                        key={`step-${colIdx}-${strokeIdx}`}
                        d={p}
                        fill="none"
                        stroke={strokeIdx === colIdx ? "var(--primary)" : "var(--foreground)"}
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ))}

                  {/* 3 Tracing Ghost Cells */}
                  {isTracingCell && showGhost &&
                    strokePaths.map((p, pIdx) => (
                      <path
                        key={`ghost-${colIdx}-${pIdx}`}
                        d={p}
                        fill="none"
                        stroke="var(--text-secondary)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={0.45 - (colIdx - totalStrokes) * 0.1}
                      />
                    ))}
                </svg>

                {isStepCell && <StepBadge>Step {colIdx + 1}</StepBadge>}

                {/* Canvas for user practice */}
                {!isStepCell && (
                  <CellCanvas
                    width={100}
                    height={100}
                    ref={(el) => { cellCanvasRefs.current[cellIndex] = el; }}
                    onMouseDown={(e) => startDrawing(e, e.currentTarget)}
                    onMouseMove={(e) => draw(e, e.currentTarget)}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={(e) => startDrawing(e, e.currentTarget)}
                    onTouchMove={(e) => draw(e, e.currentTarget)}
                    onTouchEnd={stopDrawing}
                  />
                )}
              </CellBox>
            );
          })}
        </WorksheetRow>

        {/* ROW 2: COMPLETELY BLANK PRACTICE GRID CELLS */}
        <WorksheetRow $cols={totalColumns}>
          {Array.from({ length: totalColumns }).map((_, colIdx) => {
            const cellIndex = totalColumns + colIdx;

            return (
              <CellBox key={`row2-${colIdx}`}>
                <svg className="cell-grid" viewBox="0 0 100 100">
                  <line x1="50" y1="0" x2="50" y2="100" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3,3" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3,3" />
                </svg>

                <CellCanvas
                  width={100}
                  height={100}
                  ref={(el) => { cellCanvasRefs.current[cellIndex] = el; }}
                  onMouseDown={(e) => startDrawing(e, e.currentTarget)}
                  onMouseMove={(e) => draw(e, e.currentTarget)}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={(e) => startDrawing(e, e.currentTarget)}
                  onTouchMove={(e) => draw(e, e.currentTarget)}
                  onTouchEnd={stopDrawing}
                />
              </CellBox>
            );
          })}
        </WorksheetRow>

        {/* ROW 3: COMPLETELY BLANK PRACTICE GRID CELLS */}
        <WorksheetRow $cols={totalColumns}>
          {Array.from({ length: totalColumns }).map((_, colIdx) => {
            const cellIndex = totalColumns * 2 + colIdx;

            return (
              <CellBox key={`row3-${colIdx}`}>
                <svg className="cell-grid" viewBox="0 0 100 100">
                  <line x1="50" y1="0" x2="50" y2="100" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3,3" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3,3" />
                </svg>

                <CellCanvas
                  width={100}
                  height={100}
                  ref={(el) => { cellCanvasRefs.current[cellIndex] = el; }}
                  onMouseDown={(e) => startDrawing(e, e.currentTarget)}
                  onMouseMove={(e) => draw(e, e.currentTarget)}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={(e) => startDrawing(e, e.currentTarget)}
                  onTouchMove={(e) => draw(e, e.currentTarget)}
                  onTouchEnd={stopDrawing}
                />
              </CellBox>
            );
          })}
        </WorksheetRow>
      </WorksheetTable>

      <ControlBar>
        <div className="btn-group">
          <button onClick={() => setShowGhost(!showGhost)} className={showGhost ? "primary" : ""}>
            👁️ {showGhost ? "Sembunyikan Bayangan" : "Tampilkan 3 Sel Bayangan Jiplak"}
          </button>
        </div>

        <button onClick={clearAllCanvases}>
          🧹 Hapus Coretan Grid
        </button>
      </ControlBar>
    </GridContainer>
  );
}
