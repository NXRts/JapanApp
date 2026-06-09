'use client';

import styled from 'styled-components';
import { useTheme, themes } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import { useProgress } from '@/context/ProgressContext';

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
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  background: var(--surface);
  padding: 2rem;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  transform: ${({ $isOpen }) => ($isOpen ? 'scale(1)' : 'scale(0.95)')};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--foreground);
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.h3`
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-weight: 500;
`;

const ColorGrid = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ColorBtn = styled.button<{ $color: string; $isSelected: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: 3px solid ${({ $isSelected }) => ($isSelected ? 'var(--foreground)' : 'transparent')};
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ModeToggle = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--background);
  color: var(--foreground);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  
  &:hover {
    color: var(--foreground);
  }
`;
/** New Styled Components for Reset Feature */
const DangerButton = styled.button<{ $isConfirming?: boolean }>`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid ${({ $isConfirming }) => ($isConfirming ? 'var(--accent)' : 'var(--border)')};
  background: ${({ $isConfirming }) => ($isConfirming ? 'rgba(var(--accent-rgb), 0.1)' : 'var(--background)')};
  color: ${({ $isConfirming }) => ($isConfirming ? 'var(--accent)' : 'var(--text-secondary)')};
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(var(--accent-rgb), 0.15);
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ResetMsg = styled.p`
  font-size: 0.85rem;
  color: var(--secondary);
  text-align: center;
  margin-top: 0.75rem;
  font-weight: 600;
`;

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { color, setColor, mode, setMode } = useTheme();
  const { resetProgress } = useProgress();
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Prevent scroll when modal is open & handle Escape key closure
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset'; // Clean up scroll prevention
    };
  }, [isOpen, onClose]);

  return (
    <Overlay $isOpen={isOpen} onClick={onClose}>
      <Modal $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Appearance Settings</Title>

        <Section>
          <Label>Theme Color</Label>
          <ColorGrid>
            {Object.entries(themes).map(([key, value]) => (
              <ColorBtn
                key={key}
                $color={value.primary}
                $isSelected={color === key}
                onClick={() => setColor(key as any)}
                title={key}
              />
            ))}
          </ColorGrid>
        </Section>

        <Section>
          <Label>Mode</Label>
          <ModeToggle onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
            <span>{mode === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
            <span>{mode === 'light' ? '☀️' : '🌙'}</span>
          </ModeToggle>
        </Section>

        <Section>
          <Label>Learning Data</Label>
          <DangerButton 
            $isConfirming={confirmReset}
            onClick={() => {
              if (confirmReset) {
                resetProgress();
                setResetSuccess(true);
                setConfirmReset(false);
                setTimeout(() => setResetSuccess(false), 3000);
              } else {
                setConfirmReset(true);
                setTimeout(() => setConfirmReset(false), 4000); // Reset confirmation state after 4s
              }
            }}
          >
            {confirmReset ? '⚠ Confirm Reset?' : '🗑 Reset Progress'}
          </DangerButton>
          {resetSuccess && <ResetMsg>✅ Progress has been reset!</ResetMsg>}
        </Section>
      </Modal>
    </Overlay>
  );
}
