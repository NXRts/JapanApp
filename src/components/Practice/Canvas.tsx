'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background: #fff;
  border-radius: 12px;
  border: 2px dashed var(--border);
  overflow: hidden;
  touch-action: none; /* Prevent scrolling while drawing */
  margin: 0 auto;
  cursor: crosshair;

  /* Grid lines for guidance */
  &::before, &::after {
    content: '';
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
    border-top: 1px dashed rgba(0,0,0,0.1);
    background: none;
  }
  
  &::after {
    left: 50%;
    top: 0;
    height: 100%;
    width: 1px;
    border-left: 1px dashed rgba(0,0,0,0.1);
    background: none;
  }
`;

const StyledCanvas = styled.canvas`
  position: relative;
  z-index: 1;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const ToolBtn = styled.button<{ $variant?: 'primary' | 'danger' | 'ghost' }>`
  background: ${({ $variant }) =>
        $variant === 'danger' ? 'rgba(239, 68, 68, 0.1)' :
            $variant === 'primary' ? 'var(--primary)' :
                $variant === 'ghost' ? 'transparent' :
                    'var(--surface)'};
  border: 1px solid ${({ $variant }) =>
        $variant === 'danger' ? 'rgba(239, 68, 68, 0.2)' :
            $variant === 'primary' ? 'var(--primary)' :
                $variant === 'ghost' ? 'transparent' :
                    'var(--border)'};
  color: ${({ $variant }) =>
        $variant === 'danger' ? '#ef4444' :
            $variant === 'primary' ? '#ffffff' :
                $variant === 'ghost' ? 'var(--text-secondary)' :
                    'var(--foreground)'};
  padding: 0.5rem 0.85rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $variant }) => $variant === 'ghost' ? 'none' : 'var(--shadow-sm)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ $variant }) => $variant === 'ghost' ? 'none' : 'var(--shadow-md)'};
    background: ${({ $variant }) =>
        $variant === 'danger' ? 'rgba(239, 68, 68, 0.15)' :
            $variant === 'primary' ? 'var(--primary-dark)' :
                $variant === 'ghost' ? 'rgba(0,0,0,0.05)' :
                    'var(--surface)'};
    
    ${({ $variant }) => $variant === 'ghost' && `
        color: var(--primary);
    `}
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 1.1em;
    height: 1.1em;
  }
`;

export function DrawingCanvas({
    width = 300,
    height = 300,
    clearTrigger = 0,
    char = '',
    onComplete,
    onSkip
}: {
    width?: number;
    height?: number;
    clearTrigger?: number;
    char?: string;
    onComplete?: () => void;
    onSkip?: () => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [showGuide, setShowGuide] = useState(false); // Default to off, user can toggle
    const [guidePaths, setGuidePaths] = useState<string[]>([]);
    const [userStrokes, setUserStrokes] = useState<{ x: number; y: number }[][]>([]);
    const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);
    const [score, setScore] = useState<number | null>(null);
    const [warning, setWarning] = useState<string | null>(null);

    useEffect(() => {
        if (!char) {
            setGuidePaths([]);
            setScore(null);
            setWarning(null);
            setUserStrokes([]);
            return;
        }

        const fetchGuide = async () => {
            try {
                // Determine Hex Code (KanjiVG uses 5-digit hex)
                const code = char.charCodeAt(0).toString(16).padStart(5, '0');
                const res = await fetch(`https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${code}.svg`);
                if (!res.ok) return;

                const text = await res.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, "image/svg+xml");
                const paths = Array.from(doc.querySelectorAll('path')).map(p => p.getAttribute('d') || '').filter(d => d);
                setGuidePaths(paths);
                setShowGuide(true); // Auto-show guide when new char loads? Maybe better to keep user preference, but let's default ON for now based on request.
            } catch (err) {
                console.error("Failed to fetch guide", err);
            }
        };

        fetchGuide();
    }, [char]);

    // Helper to get start point
    const getStartPoint = (d: string) => {
        const match = d.match(/[Mm]\s*([\d.]+)[,\s]+([\d.]+)/);
        if (match) return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
        return null;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#2d2d2d'; // Ink color
        ctx.lineWidth = 6;

        contextRef.current = ctx;
    }, [width, height]);

    // Clear canvas when trigger changes
    useEffect(() => {
        clearCanvas();
    }, [clearTrigger]);

    const startDrawing = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
        const { offsetX, offsetY } = getCoordinates(nativeEvent);
        if (!contextRef.current) return;

        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
        setCurrentStroke([{ x: offsetX, y: offsetY }]);
        setWarning(null); // Clear warning on new stroke
    };

    const finishDrawing = () => {
        if (!contextRef.current) return;
        contextRef.current.closePath();
        setIsDrawing(false);
        if (currentStroke.length > 0) {
            setUserStrokes(prev => [...prev, currentStroke]);
            setCurrentStroke([]);
        }
    };

    const draw = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || !contextRef.current) return;
        const { offsetX, offsetY } = getCoordinates(nativeEvent);

        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        setCurrentStroke(prev => [...prev, { x: offsetX, y: offsetY }]);
    };

    const getCoordinates = (event: MouseEvent | TouchEvent) => {
        if ('touches' in event) {
            const canvas = canvasRef.current;
            if (!canvas) return { offsetX: 0, offsetY: 0 };

            const rect = canvas.getBoundingClientRect();
            const touch = event.touches[0];
            return {
                offsetX: touch.clientX - rect.left,
                offsetY: touch.clientY - rect.top
            };
        } else {
            return {
                offsetX: (event as MouseEvent).offsetX,
                offsetY: (event as MouseEvent).offsetY
            };
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = contextRef.current;
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        setUserStrokes([]);
        setScore(null);
        setWarning(null);
    };

    const calculateScore = () => {
        if (guidePaths.length === 0) return;

        // Check for incomplete drawings
        // Allow a small margin of error (e.g. sometimes 1 stroke is drawn as 2, but usually it's less)
        // But for "incomplete", strictly less is a good check.
        if (userStrokes.length < guidePaths.length) {
            setWarning(`Incomplete! (${userStrokes.length}/${guidePaths.length} strokes)`);
            return;
        }

        if (userStrokes.length === 0) return;

        // Simple algorithm: Sample points from guide paths and user strokes and compare average minimum distance.
        // NOTE: This is a simplified heuristic. Real Kanji grading is complex.

        const samplePath = (pathStr: string, samples = 50) => {
            const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
            el.setAttribute("d", pathStr);
            const len = el.getTotalLength();
            const points = [];
            for (let i = 0; i <= samples; i++) {
                const pt = el.getPointAtLength((i / samples) * len);
                // Scale SVG 109x109 box to Canvas 300x300 (approx ratio 2.75)
                // Actually canvas width is dynamic, so we use current width ratio
                const scale = width / 109;
                points.push({ x: pt.x * scale, y: pt.y * scale });
            }
            return points;
        };

        const flattenStrokes = (strokes: { x: number; y: number }[][]) => strokes.flat();

        const guidePoints = guidePaths.flatMap(p => samplePath(p));
        const userPoints = flattenStrokes(userStrokes);

        // Calculate Average Minimum Distance from User Points to Guide Points
        let totalDist = 0;
        let matchedPoints = 0;

        // 1. Coverage: How close is user to the guide?
        for (const uPt of userPoints) {
            let minDist = Infinity;
            for (const gPt of guidePoints) {
                const d = Math.sqrt((uPt.x - gPt.x) ** 2 + (uPt.y - gPt.y) ** 2);
                if (d < minDist) minDist = d;
            }
            // Only penalize if distance is significant (e.g., > 10px) to allow some jitter
            // Clamping max penalty per point
            totalDist += Math.min(minDist, 50);
            matchedPoints++;
        }

        const avgError = matchedPoints > 0 ? totalDist / matchedPoints : 50;

        // Convert average error (pixels) to percentage.
        // e.g. 0 error = 100%, 20px error = 0%
        let accuracy = Math.max(0, 100 - (avgError * 3)); // Strictness factor

        // Penalty for stroke count mismatch
        const strokeDiff = Math.abs(userStrokes.length - guidePaths.length);
        if (strokeDiff > 0) accuracy -= (strokeDiff * 10);

        const finalScore = Math.round(accuracy);
        setScore(finalScore);

        // Auto-advance if score is good
        if (finalScore >= 70 && onComplete) {
            setTimeout(() => {
                onComplete();
            }, 1000); // 1s delay to see the score
        } else {
            // Auto-retry on low score
            setTimeout(() => {
                clearCanvas();
            }, 1500);
        }
    };

    const handleSkip = () => {
        if (onSkip) {
            onSkip();
        }
    };

    return (
        <div>
            <CanvasWrapper>
                {score !== null && (
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, width: '100%', height: '100%',
                        background: 'rgba(255,255,255,0.85)',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '12px'
                    }}>
                        <div style={{ fontSize: '3rem', fontWeight: 800, color: score > 70 ? '#10b981' : '#f59e0b' }}>
                            {score}%
                        </div>
                        <div style={{ color: '#64748b', fontWeight: 600 }}>
                            {score >= 70 ? 'Excellent!' : 'Try Again'}
                        </div>
                    </div>
                )}
                {warning && (
                    <div style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(239, 68, 68, 0.95)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        zIndex: 20,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        {warning}
                    </div>
                )}
                {showGuide && (
                    <svg
                        viewBox="0 0 109 109"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 0,
                            pointerEvents: 'none',
                            opacity: 0.8
                        }}
                    >
                        {guidePaths.map((d, i) => {
                            const start = getStartPoint(d);
                            return (
                                <g key={i}>
                                    <path d={d} stroke="#e5e7eb" strokeWidth="2" fill="none" />
                                    {start && (
                                        <>
                                            <circle cx={start.x} cy={start.y} r="1.5" fill="rgba(239, 68, 68, 0.6)" />
                                            <text
                                                x={start.x - 3}
                                                y={start.y + 3}
                                                fontSize="4"
                                                fill="rgba(239, 68, 68, 0.8)"
                                                fontWeight="bold"
                                                style={{ userSelect: 'none' }}
                                            >
                                                {i + 1}
                                            </text>
                                        </>
                                    )}
                                </g>
                            );
                        })}
                    </svg>
                )}
                <StyledCanvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    onMouseLeave={finishDrawing}
                    onTouchStart={startDrawing}
                    onTouchEnd={finishDrawing}
                    onTouchMove={draw}
                />
            </CanvasWrapper>
            <Toolbar>
                <ToolBtn onClick={() => setShowGuide(!showGuide)} $variant="ghost">
                    {showGuide ? (
                        <>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" /></svg>
                            Hide
                        </>
                    ) : (
                        <>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                            Guide
                        </>
                    )}
                </ToolBtn>
                <ToolBtn onClick={clearCanvas} $variant="danger">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" /></svg>
                    Clear
                </ToolBtn>
                <ToolBtn onClick={calculateScore} $variant="primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    Check
                </ToolBtn>
                <ToolBtn onClick={handleSkip} $variant="ghost">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    Next
                </ToolBtn>
            </Toolbar>
        </div>
    );
}
