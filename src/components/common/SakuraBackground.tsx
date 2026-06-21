"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const fall = keyframes`
  0% {
    transform: translateY(-50px) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(105vh) translateX(150px) rotate(360deg);
    opacity: 0;
  }
`;

const sway = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(80px);
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
`;

interface PetalProps {
  $left: number;
  $delay: number;
  $duration: number;
  $size: number;
}

const Petal = styled.div<PetalProps>`
  position: absolute;
  top: -50px;
  left: ${({ $left }) => $left}%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size * 0.7}px;
  background: linear-gradient(135deg, #ffd1dc 0%, #ffb7c5 100%);
  border-radius: 15px 1px 15px 15px; /* Curved sakura petal shape */
  opacity: 0;
  animation:
    ${fall} ${({ $duration }) => $duration}s linear infinite,
    ${sway} 4s ease-in-out infinite alternate;
  animation-delay: ${({ $delay }) => $delay}s;
  transform-origin: left top;
  box-shadow: 0 2px 5px rgba(255, 183, 197, 0.2);
`;

interface PetalConfig {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export function SakuraBackground() {
  const [petals, setPetals] = useState<PetalConfig[]>([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Check if user disabled it previously
    const status = localStorage.getItem("sakura-particles-enabled");
    if (status === "false") {
      setEnabled(false);
    }

    // Generate random configurations for 20 petals
    const newPetals: PetalConfig[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12 - 12, // Start some immediately
      duration: Math.random() * 8 + 8, // 8s to 16s fall speed
      size: Math.random() * 10 + 10, // 10px to 20px size
    }));
    setPetals(newPetals);

    // Listen to localStorage changes or custom events to toggle dynamic styling
    const handleToggle = () => {
      const active =
        localStorage.getItem("sakura-particles-enabled") !== "false";
      setEnabled(active);
    };

    window.addEventListener("sakura-theme-changed", handleToggle);
    return () => {
      window.removeEventListener("sakura-theme-changed", handleToggle);
    };
  }, []);

  if (!enabled) return null;

  return (
    <BackgroundContainer aria-hidden="true">
      {petals.map((petal) => (
        <Petal
          key={petal.id}
          $left={petal.left}
          $delay={petal.delay}
          $duration={petal.duration}
          $size={petal.size}
        />
      ))}
    </BackgroundContainer>
  );
}
