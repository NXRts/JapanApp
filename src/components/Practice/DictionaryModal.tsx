"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useProgress } from "@/context/ProgressContext";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Modal = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  width: 90%;
  max-width: 400px;
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  animation: slideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const WordHeader = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 1rem;
`;

const WordTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  color: var(--foreground);
`;

const Reading = styled.div`
  color: var(--primary);
  font-weight: 700;
  font-size: 1.1rem;
  margin-top: 0.25rem;
`;

const MeaningSection = styled.div`
  margin-bottom: 2rem;
`;

const MeaningLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
`;

const MeaningText = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  color: var(--foreground);
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: 0.85rem;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: ${(props) =>
    props.$primary ? "var(--primary)" : "var(--border)"};
  color: ${(props) => (props.$primary ? "white" : "var(--foreground)")};

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
`;

interface DictionaryModalProps {
  word: string;
  onClose: () => void;
}

interface DictionaryData {
  japanese: string;
  reading: string;
  meaning: string;
}

export const DictionaryModal: React.FC<DictionaryModalProps> = ({
  word,
  onClose,
}) => {
  const [prevWord, setPrevWord] = useState(word);
  const [data, setData] = useState<DictionaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const { updateSRS, addExp } = useProgress();
  const [added, setAdded] = useState(false);

  if (word !== prevWord) {
    setPrevWord(word);
    setLoading(true);
  }

  useEffect(() => {
    // Using a public dictionary API proxy or search
    fetch(`https://jisho.org/api/v1/search/words?keyword=${word}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.data && json.data.length > 0) {
          const item = json.data[0];
          setData({
            japanese: item.japanese[0].word || item.japanese[0].reading,
            reading: item.japanese[0].reading,
            meaning: item.senses[0].english_definitions.join(", "),
          });
        } else {
          setData({
            japanese: word,
            reading: "Unknown",
            meaning: "No definition found.",
          });
        }
      })
      .catch(() => {
        setData({
          japanese: word,
          reading: "Reading...",
          meaning: "Offline or API error.",
        });
      })
      .finally(() => setLoading(false));
  }, [word]);

  const handleAddReview = () => {
    updateSRS(word, 0); // Mark as new item
    addExp(10);
    setAdded(true);
    setTimeout(onClose, 800);
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            Looking up &quot;{word}&quot;...
          </div>
        ) : data && (
          <>
            <WordHeader>
              <WordTitle>{data.japanese}</WordTitle>
              <Reading>{data.reading}</Reading>
            </WordHeader>

            <MeaningSection>
              <MeaningLabel>Definition</MeaningLabel>
              <MeaningText>{data.meaning}</MeaningText>
            </MeaningSection>

            <ActionButtons>
              <Button onClick={onClose}>Close</Button>
              <Button $primary onClick={handleAddReview} disabled={added}>
                {added ? "Added! ✓" : "Add to SRS"}
              </Button>
            </ActionButtons>
          </>
        )}
      </Modal>
    </Overlay>
  );
};
