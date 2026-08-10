"use client";

import React, { useRef, useState } from "react";
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
  background: ${({ $isStep }) =>
    $isStep ? "rgba(var(--primary-rgb), 0.05)" : "transparent"};

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
  width: 100%;

  .btn-group {
    display: flex;
    gap: 0.6rem;
    width: 100%;

    button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 0.6rem 0.4rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 800;
      cursor: pointer;
      background: var(--surface);
      color: var(--foreground);
      border: 1.5px solid var(--border);
      transition: all 0.2s ease;
      white-space: nowrap;
      -webkit-tap-highlight-color: transparent;

      @media (max-width: 480px) {
        padding: 0.55rem 0.25rem;
        font-size: 0.76rem;
        gap: 3px;
      }

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
  }
`;

interface Props {
  char: string;
}

export function KanjiGridPractice({ char }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [svgPaths, setSvgPaths] = useState<string[]>(() =>
    getStrokePaths(char),
  );
  const [showGhost, setShowGhost] = useState(true);

  // References to multiple drawing canvases (3 rows * totalColumns)
  const cellCanvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Fetch official KanjiVG stroke paths dynamically
  React.useEffect(() => {
    let active = true;
    const fetchSvg = async () => {
      try {
        const hex = char.charCodeAt(0).toString(16).padStart(5, "0");
        const res = await fetch(`/api/kanji-svg?hex=${hex}`);
        if (res.ok) {
          const paths = (await res.json()) as string[];
          if (active && Array.isArray(paths) && paths.length > 0) {
            setSvgPaths(paths);
          }
        }
      } catch (err) {
        // Fallback to static getStrokePaths
      }
    };
    fetchSvg();
    return () => {
      active = false;
    };
  }, [char]);

  const totalStrokes = svgPaths.length || 1;

  // Responsive total columns per row: 5 large columns on mobile for finger drawing vs 10 on desktop
  const totalColumns = isMobile ? 5 : Math.max(10, totalStrokes + 3);

  const clearAllCanvases = () => {
    cellCanvasRefs.current.forEach((canvas) => {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    });
  };

  const getCanvasCoords = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement,
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
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement,
  ) => {
    isDrawingRef.current = true;
    lastPosRef.current = getCanvasCoords(e, canvas);
  };

  const draw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement,
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

  const isKana = /^[\u3040-\u309F\u30A0-\u30FF]/.test(char);

  return (
    <GridContainer>
      <SectionHeader>
        <h3>
          <span>🖌️</span> Lembar Latihan Menulis {isKana ? "Kana" : "Kanji"} (
          {char})
        </h3>
        <span className="subtitle">Latih Urutan Goresan & Menulis</span>
      </SectionHeader>

      <WorksheetTable>
        {/* ROW 1: STEP SEQUENCE + 3 GHOST CELLS + BLANK CELLS */}
        <WorksheetRow $cols={totalColumns}>
          {Array.from({ length: totalColumns }).map((_, colIdx) => {
            const isStepCell = colIdx < totalStrokes;
            const isTracingCell =
              colIdx >= totalStrokes && colIdx < totalStrokes + 3;
            const cellIndex = colIdx;

            return (
              <CellBox key={`row1-${colIdx}`} $isStep={isStepCell}>
                {/* Dashed Crosshairs Grid 十字格 (Native KanjiVG 109x109 viewBox) */}
                <svg className="cell-grid" viewBox="0 0 109 109">
                  <line
                    x1="54.5"
                    y1="0"
                    x2="54.5"
                    y2="109"
                    stroke="var(--border)"
                    strokeWidth="0.8"
                    strokeDasharray="3,3"
                  />
                  <line
                    x1="0"
                    y1="54.5"
                    x2="109"
                    y2="54.5"
                    stroke="var(--border)"
                    strokeWidth="0.8"
                    strokeDasharray="3,3"
                  />

                  {/* Step-by-Step Cells matching JLPT Kanji Writer (Gambar 2) */}
                  {isStepCell && (
                    <>
                      {/* 1. Remaining Future Strokes (Faint Gray Outline) */}
                      <g
                        stroke="var(--border)"
                        strokeWidth="3.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.35"
                      >
                        {svgPaths.slice(colIdx + 1).map((d, idx) => (
                          <path key={`future-${colIdx}-${idx}`} d={d} />
                        ))}
                      </g>

                      {/* 2. Past Completed Strokes (Solid Light White / Foreground) */}
                      <g
                        stroke="var(--foreground)"
                        strokeWidth="4.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.85"
                      >
                        {svgPaths.slice(0, colIdx).map((d, idx) => (
                          <path key={`past-${colIdx}-${idx}`} d={d} />
                        ))}
                      </g>

                      {/* 3. Active Step Stroke (Highlighted Amber #f6ad55 matching Gambar 2!) */}
                      {svgPaths[colIdx] && (
                        <g
                          stroke="#f6ad55"
                          strokeWidth="6"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={svgPaths[colIdx]} />
                        </g>
                      )}
                    </>
                  )}

                  {/* 3 Tracing Ghost Cells (Faint Gray Full Outline matching Gambar 2 & 3!) */}
                  {isTracingCell && showGhost && (
                    <g
                      stroke="var(--text-secondary)"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0.4 - (colIdx - totalStrokes) * 0.1}
                    >
                      {svgPaths.map((d, idx) => (
                        <path key={`ghost-${colIdx}-${idx}`} d={d} />
                      ))}
                    </g>
                  )}
                </svg>

                {isStepCell && <StepBadge>Step {colIdx + 1}</StepBadge>}

                {/* Canvas for user practice */}
                {!isStepCell && (
                  <CellCanvas
                    width={100}
                    height={100}
                    ref={(el) => {
                      cellCanvasRefs.current[cellIndex] = el;
                    }}
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
                  <line
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="100"
                    stroke="var(--border)"
                    strokeWidth="0.8"
                    strokeDasharray="3,3"
                  />
                  <line
                    x1="0"
                    y1="50"
                    x2="100"
                    y2="50"
                    stroke="var(--border)"
                    strokeWidth="0.8"
                    strokeDasharray="3,3"
                  />
                </svg>

                <CellCanvas
                  width={100}
                  height={100}
                  ref={(el) => {
                    cellCanvasRefs.current[cellIndex] = el;
                  }}
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
                  <line
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="100"
                    stroke="var(--border)"
                    strokeWidth="0.8"
                    strokeDasharray="3,3"
                  />
                  <line
                    x1="0"
                    y1="50"
                    x2="100"
                    y2="50"
                    stroke="var(--border)"
                    strokeWidth="0.8"
                    strokeDasharray="3,3"
                  />
                </svg>

                <CellCanvas
                  width={100}
                  height={100}
                  ref={(el) => {
                    cellCanvasRefs.current[cellIndex] = el;
                  }}
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
          <button
            onClick={() => setShowGhost(!showGhost)}
            className={showGhost ? "primary" : ""}
          >
            👁️ {showGhost ? "Sembunyikan" : "Bayangan"}
          </button>
          <button onClick={clearAllCanvases}>🧹 Hapus Grid</button>
        </div>
      </ControlBar>
    </GridContainer>
  );
}
