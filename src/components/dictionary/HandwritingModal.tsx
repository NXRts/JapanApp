"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  background: var(--surface);
  padding: 1.5rem;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  transform: ${({ $isOpen }) => ($isOpen ? "scale(1)" : "scale(0.95)")};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--foreground);
  margin: 0;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  display: flex;
  &:hover {
    color: var(--foreground);
  }
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 300px;
  border: 2px dashed var(--border);
  border-radius: 12px;
  background: var(--background);
  position: relative;
  touch-action: none;
`;

const CandidatesArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-height: 48px;
`;

const CandidateBtn = styled.button`
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
  border: 1px solid rgba(var(--primary-rgb, 79, 70, 229), 0.2);
  color: var(--primary);
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: var(--primary);
    color: white;
  }
`;

const clearBtnStyle = {
  background: "transparent",
  border: "1px solid var(--border)",
  color: "var(--text-secondary)",
  padding: "0.5rem 1rem",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600" as const,
};

type Stroke = { x: number[]; y: number[]; time: number[] };

export function HandwritingModal({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (text: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke>({
    x: [],
    y: [],
    time: [],
  });
  const [candidates, setCandidates] = useState<string[]>([]);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const width = 350; // max width
  const height = 300;

  const clearCanvas = useCallback(() => {
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setStrokes([]);
    setCandidates([]);
  }, [ctx]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Init canvas
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.parentElement?.clientWidth || width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (context) {
          context.lineCap = "round";
          context.lineJoin = "round";
          context.lineWidth = 4;
          context.strokeStyle = "var(--foreground)"; // Need to resolve CSS variable to actual color if it doesn't work directly, but usually it does if not using complex transforms
          // Actually context needs a raw color
          const rootStyles = getComputedStyle(document.body);
          context.strokeStyle =
            rootStyles.getPropertyValue("--foreground").trim() || "#333";
          setCtx(context);
        }
      }
    } else {
      document.body.style.overflow = "unset";
      clearCanvas();
    }
  }, [isOpen, clearCanvas]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getCoordinates(e);
    if (!ctx) return;
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setCurrentStroke({ x: [x], y: [y], time: [Date.now()] });
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !ctx) return;
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setCurrentStroke((prev) => ({
      x: [...prev.x, x],
      y: [...prev.y, y],
      time: [...prev.time, Date.now()],
    }));
  };

  const endDrawing = () => {
    if (!isDrawing || !ctx) return;
    ctx.closePath();
    setIsDrawing(false);
    if (currentStroke.x.length > 0) {
      const newStrokes = [...strokes, currentStroke];
      setStrokes(newStrokes);
      fetchCandidates(newStrokes);
    }
    setCurrentStroke({ x: [], y: [], time: [] });
  };

  const fetchCandidates = async (inkData: Stroke[]) => {
    // Format for Google Input Tools API
    const formattedInk = inkData.map((stroke) => [stroke.x, stroke.y, []]); // empty time array is fine

    // Using a public API for demonstration. Standard CORS limits might apply if called directly from browser,
    // but the inputtools endpoint usually allows it.
    try {
      const response = await fetch(
        "https://inputtools.google.com/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            app_version: 0.4,
            api_level: "537.36",
            device: "5.0",
            input_type: 0,
            options: "enable_pre_space",
            requests: [
              {
                writing_guide: {
                  writing_area_width: canvasRef.current?.width || width,
                  writing_area_height: height,
                },
                ink: formattedInk,
                language: "ja",
              },
            ],
          }),
        },
      );
      const data = await response.json();
      if (data[0] === "SUCCESS" && data[1] && data[1][0] && data[1][0][1]) {
        setCandidates(data[1][0][1].slice(0, 10)); // Top 10 candidates
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Overlay $isOpen={isOpen} onClick={onClose}>
      <Modal $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Draw Kanji</Title>
          <CloseBtn onClick={onClose}>&times;</CloseBtn>
        </Header>

        <CanvasContainer>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={endDrawing}
            style={{ width: "100%", height: "100%" }}
          />
        </CanvasContainer>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}
        >
          <button style={clearBtnStyle} onClick={clearCanvas}>
            Clear
          </button>
        </div>

        <CandidatesArea>
          {candidates.length > 0 ? (
            candidates.map((char, i) => (
              <CandidateBtn key={i} onClick={() => onSelect(char)}>
                {char}
              </CandidateBtn>
            ))
          ) : (
            <span
              style={{ color: "var(--text-secondary)", alignSelf: "center" }}
            >
              Draw on the canvas to see candidates
            </span>
          )}
        </CandidatesArea>
      </Modal>
    </Overlay>
  );
}
