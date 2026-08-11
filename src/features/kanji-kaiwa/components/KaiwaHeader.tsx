"use client";

import React from "react";
import styled from "styled-components";
import { KaiwaScenario } from "../types";

const Container = styled.div`
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 20px;
  padding: 1.25rem 1.5rem;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .icon-badge {
    font-size: 1.8rem;
    background: rgba(var(--primary-rgb), 0.1);
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(var(--primary-rgb), 0.2);
  }

  h2 {
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--foreground);
    margin: 0;
  }

  p {
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin: 0.15rem 0 0 0;
  }
`;

const ControlsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 640px) {
    width: 100%;
  }

  button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 0.55rem 0.85rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 800;
    cursor: pointer;
    background: var(--background);
    color: var(--foreground);
    border: 1.5px solid var(--border);
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    &.active {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
    }
  }
`;

const ScenarioPillsRow = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScenarioPill = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.45rem 0.85rem;
  border-radius: 99px;
  font-size: 0.78rem;
  font-weight: 800;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${({ $active }) =>
    $active ? "rgba(99, 102, 241, 0.15)" : "var(--background)"};
  color: ${({ $active }) => ($active ? "#6366f1" : "var(--text-secondary)")};
  border: 1.5px solid
    ${({ $active }) => ($active ? "#6366f1" : "var(--border)")};

  &:hover {
    border-color: #6366f1;
    color: #6366f1;
  }
`;

interface Props {
  scenarios: KaiwaScenario[];
  activeScenario: KaiwaScenario;
  onSelectScenario: (scenario: KaiwaScenario) => void;
  showFurigana: boolean;
  onToggleFurigana: () => void;
  audioSpeed: number;
  onToggleAudioSpeed: () => void;
}

export function KaiwaHeader({
  scenarios,
  activeScenario,
  onSelectScenario,
  showFurigana,
  onToggleFurigana,
  audioSpeed,
  onToggleAudioSpeed,
}: Props) {
  return (
    <Container>
      <TopRow>
        <TitleBox>
          <div className="icon-badge">{activeScenario.icon}</div>
          <div>
            <h2>{activeScenario.japaneseTitle}</h2>
            <p>{activeScenario.description}</p>
          </div>
        </TitleBox>

        <ControlsGroup>
          <button
            onClick={onToggleFurigana}
            className={showFurigana ? "active" : ""}
          >
            👁️ Furigana {showFurigana ? "ON" : "OFF"}
          </button>
          <button onClick={onToggleAudioSpeed}>
            🐢 Speed {audioSpeed}x
          </button>
        </ControlsGroup>
      </TopRow>

      <ScenarioPillsRow>
        {scenarios.map((s) => (
          <ScenarioPill
            key={s.id}
            $active={s.id === activeScenario.id}
            onClick={() => onSelectScenario(s)}
          >
            <span>{s.icon}</span>
            <span>{s.title}</span>
          </ScenarioPill>
        ))}
      </ScenarioPillsRow>
    </Container>
  );
}
