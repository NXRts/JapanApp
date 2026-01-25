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
  gap: 1rem;
  margin-top: 0.5rem;
`;

const ToolBtn = styled.button`
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  
  &:hover {
    color: var(--primary);
    border-color: var(--primary);
  }
`;

export function DrawingCanvas({
    width = 300,
    height = 300,
    clearTrigger = 0
}: {
    width?: number;
    height?: number;
    clearTrigger?: number; // Prop to force clear externally
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

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
    };

    const finishDrawing = () => {
        if (!contextRef.current) return;
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || !contextRef.current) return;
        const { offsetX, offsetY } = getCoordinates(nativeEvent);

        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
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
    };

    return (
        <div>
            <CanvasWrapper>
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
                <ToolBtn onClick={clearCanvas}>Clear</ToolBtn>
            </Toolbar>
        </div>
    );
}
