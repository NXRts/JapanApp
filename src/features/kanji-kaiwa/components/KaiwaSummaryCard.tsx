"use client";

import React from "react";
import styled from "styled-components";
import { KaiwaScenario } from "../types";

const SummaryContainer = styled.div`
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 24px;
  padding: 2rem 1.5rem;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const TrophyBadge = styled.div`
  font-size: 3.5rem;
  width: 90px;
  height: 90px;
  background: rgba(99, 102, 241, 0.12);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(99, 102, 241, 0.3);
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--foreground);
  margin: 0;
`;

const ExpBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  font-size: 1rem;
  font-weight: 900;
  padding: 0.5rem 1.25rem;
  border-radius: 99px;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
`;

const KanjiGrid = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-top: 0.5rem;

  .kanji-chip {
    background: var(--background);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 0.5rem 0.85rem;
    display: flex;
    align-items: center;
    gap: 6px;

    .char {
      font-size: 1.2rem;
      font-weight: 900;
      color: var(--primary);
    }
    .meaning {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-secondary);
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
  margin-top: 1rem;

  button {
    flex: 1;
    padding: 0.85rem;
    border-radius: 14px;
    font-size: 0.9rem;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s ease;

    &.primary {
      background: var(--primary);
      color: white;
      border: none;
    }

    &.secondary {
      background: var(--background);
      color: var(--foreground);
      border: 1.5px solid var(--border);
    }

    &:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
  }
`;

interface Props {
  scenario: KaiwaScenario;
  score: number;
  totalQuiz: number;
  onRestart: () => void;
}

export function KaiwaSummaryCard({
  scenario,
  score,
  totalQuiz,
  onRestart,
}: Props) {
  const expEarned = 50 + score * 15;

  return (
    <SummaryContainer>
      <TrophyBadge>🏆</TrophyBadge>
      <Title>Skenario Percakapan Selesai!</Title>
      <p style={{ color: "var(--text-secondary)", margin: 0 }}>
        Kamu telah menyelesaikan skenario <strong>{scenario.title}</strong> dan menjawab <strong>{score} dari {totalQuiz}</strong> kuis rumpang dengan benar.
      </p>

      <ExpBadge>🌟 +{expEarned} EXP Berhasil Didapat!</ExpBadge>

      <div style={{ width: "100%", textAlign: "center", marginTop: "0.5rem" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "var(--text-secondary)" }}>
          Kanji Yang Dikuasai Dalam Percakapan Ini:
        </span>
        <KanjiGrid>
          {scenario.targetKanjiList.map((k) => (
            <div key={k.char} className="kanji-chip">
              <span className="char">{k.char}</span>
              <span className="meaning">{k.meaning}</span>
            </div>
          ))}
        </KanjiGrid>
      </div>

      <ActionButtons>
        <button className="secondary" onClick={onRestart}>
          🔄 Ulangi Skenario Ini
        </button>
      </ActionButtons>
    </SummaryContainer>
  );
}
