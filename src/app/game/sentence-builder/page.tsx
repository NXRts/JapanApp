'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { useProgress } from '@/context/ProgressContext';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- DATA ---
interface WordItem {
  id: string;
  kana: string;
  romaji: string;
}

interface SentenceLevel {
  id: number;
  translation: string;
  romajiHint: string;
  items: WordItem[];
}

const ALL_SENTENCES: SentenceLevel[] = [
  {
    id: 1,
    translation: "I eat an apple.",
    romajiHint: "Watashi wa ringo o tabemasu.",
    items: [
      { id: "w1-1", kana: "私", romaji: "watashi" },
      { id: "w1-2", kana: "は", romaji: "wa" },
      { id: "w1-3", kana: "りんご", romaji: "ringo" },
      { id: "w1-4", kana: "を", romaji: "o" },
      { id: "w1-5", kana: "食べます", romaji: "tabemasu" }
    ]
  },
  {
    id: 2,
    translation: "He goes to school.",
    romajiHint: "Kare wa gakkō ni ikimasu.",
    items: [
      { id: "w2-1", kana: "彼", romaji: "kare" },
      { id: "w2-2", kana: "は", romaji: "wa" },
      { id: "w2-3", kana: "学校", romaji: "gakkō" },
      { id: "w2-4", kana: "に", romaji: "ni" },
      { id: "w2-5", kana: "行きます", romaji: "ikimasu" }
    ]
  },
  {
    id: 3,
    translation: "I read a book yesterday.",
    romajiHint: "Kinō watashi wa hon o yomimashita.",
    items: [
      { id: "w3-1", kana: "昨日", romaji: "kinō" },
      { id: "w3-2", kana: "私", romaji: "watashi" },
      { id: "w3-3", kana: "は", romaji: "wa" },
      { id: "w3-4", kana: "本", romaji: "hon" },
      { id: "w3-5", kana: "を", romaji: "o" },
      { id: "w3-6", kana: "読みました", romaji: "yomimashita" }
    ]
  },
  {
    id: 4,
    translation: "The cat is under the table.",
    romajiHint: "Neko wa tsukue no shita ni imasu.",
    items: [
      { id: "w4-1", kana: "猫", romaji: "neko" },
      { id: "w4-2", kana: "は", romaji: "wa" },
      { id: "w4-3", kana: "机", romaji: "tsukue" },
      { id: "w4-4", kana: "の", romaji: "no" },
      { id: "w4-5", kana: "下", romaji: "shita" },
      { id: "w4-6", kana: "に", romaji: "ni" },
      { id: "w4-7", kana: "います", romaji: "imasu" }
    ]
  },
  {
    id: 5,
    translation: "Do you like Japanese?",
    romajiHint: "Nihongo ga suki desu ka?",
    items: [
      { id: "w5-1", kana: "日本語", romaji: "nihongo" },
      { id: "w5-2", kana: "が", romaji: "ga" },
      { id: "w5-3", kana: "好き", romaji: "suki" },
      { id: "w5-4", kana: "です", romaji: "desu" },
      { id: "w5-5", kana: "か", romaji: "ka" }
    ]
  },
  {
    id: 6,
    translation: "I drink water.",
    romajiHint: "Watashi wa mizu o nomimasu.",
    items: [
      { id: "w6-1", kana: "私", romaji: "watashi" },
      { id: "w6-2", kana: "は", romaji: "wa" },
      { id: "w6-3", kana: "水", romaji: "mizu" },
      { id: "w6-4", kana: "を", romaji: "o" },
      { id: "w6-5", kana: "飲みます", romaji: "nomimasu" }
    ]
  },
  {
    id: 7,
    translation: "This book is expensive.",
    romajiHint: "Kono hon wa takai desu.",
    items: [
      { id: "w7-1", kana: "この", romaji: "kono" },
      { id: "w7-2", kana: "本", romaji: "hon" },
      { id: "w7-3", kana: "は", romaji: "wa" },
      { id: "w7-4", kana: "高い", romaji: "takai" },
      { id: "w7-5", kana: "です", romaji: "desu" }
    ]
  },
  {
    id: 8,
    translation: "The weather is good today.",
    romajiHint: "Kyō wa tenki ga ii desu.",
    items: [
      { id: "w8-1", kana: "今日", romaji: "kyō" },
      { id: "w8-2", kana: "は", romaji: "wa" },
      { id: "w8-3", kana: "天気", romaji: "tenki" },
      { id: "w8-4", kana: "が", romaji: "ga" },
      { id: "w8-5", kana: "いい", romaji: "ii" },
      { id: "w8-6", kana: "です", romaji: "desu" }
    ]
  },
  {
    id: 9,
    translation: "I don't go to the university.",
    romajiHint: "Watashi wa daigaku ni ikimasen.",
    items: [
      { id: "w9-1", kana: "私", romaji: "watashi" },
      { id: "w9-2", kana: "は", romaji: "wa" },
      { id: "w9-3", kana: "大学", romaji: "daigaku" },
      { id: "w9-4", kana: "に", romaji: "ni" },
      { id: "w9-5", kana: "行きません", romaji: "ikimasen" }
    ]
  },
  {
    id: 10,
    translation: "Please say it once more.",
    romajiHint: "Mō ichido itte kudasai.",
    items: [
      { id: "w10-1", kana: "もう", romaji: "mō" },
      { id: "w10-2", kana: "一度", romaji: "ichido" },
      { id: "w10-3", kana: "言って", romaji: "itte" },
      { id: "w10-4", kana: "ください", romaji: "kudasai" }
    ]
  },
  {
    id: 11,
    translation: "This coffee is very hot.",
    romajiHint: "Kono kōhī wa totemo atsui desu.",
    items: [
      { id: "w11-1", kana: "この", romaji: "kono" },
      { id: "w11-2", kana: "コーヒー", romaji: "kōhī" },
      { id: "w11-3", kana: "は", romaji: "wa" },
      { id: "w11-4", kana: "とても", romaji: "totemo" },
      { id: "w11-5", kana: "熱い", romaji: "atsui" },
      { id: "w11-6", kana: "です", romaji: "desu" }
    ]
  },
  {
    id: 12,
    translation: "The cat is eating fish.",
    romajiHint: "Neko wa sakana o tabete imasu.",
    items: [
      { id: "w12-1", kana: "猫", romaji: "neko" },
      { id: "w12-2", kana: "は", romaji: "wa" },
      { id: "w12-3", kana: "魚", romaji: "sakana" },
      { id: "w12-4", kana: "を", romaji: "o" },
      { id: "w12-5", kana: "食べて", romaji: "tabete" },
      { id: "w12-6", kana: "います", romaji: "imasu" }
    ]
  },
  {
    id: 13,
    translation: "That restaurant is delicious and cheap.",
    romajiHint: "Ano resutoran wa oishikute yasui desu.",
    items: [
      { id: "w13-1", kana: "あの", romaji: "ano" },
      { id: "w13-2", kana: "レストラン", romaji: "resutoran" },
      { id: "w13-3", kana: "は", romaji: "wa" },
      { id: "w13-4", kana: "美味しくて", romaji: "oishikute" },
      { id: "w13-5", kana: "安い", romaji: "yasui" },
      { id: "w13-6", kana: "です", romaji: "desu" }
    ]
  },
  {
    id: 14,
    translation: "What time is it now?",
    romajiHint: "Ima, nan-ji desu ka?",
    items: [
      { id: "w14-1", kana: "今", romaji: "ima" },
      { id: "w14-2", kana: "何時", romaji: "nanji" },
      { id: "w14-3", kana: "です", romaji: "desu" },
      { id: "w14-4", kana: "か", romaji: "ka" }
    ]
  },
  {
    id: 15,
    translation: "I wake up at 7 o'clock every day.",
    romajiHint: "Mainichi shichi-ji ni okimasu.",
    items: [
      { id: "w15-1", kana: "毎日", romaji: "mainichi" },
      { id: "w15-2", kana: "７時", romaji: "shichi-ji" },
      { id: "w15-3", kana: "に", romaji: "ni" },
      { id: "w15-4", kana: "起きます", romaji: "okimasu" }
    ]
  },
  {
    id: 16,
    translation: "May I take a photo?",
    romajiHint: "Shashin o totte mo ii desu ka?",
    items: [
      { id: "w16-1", kana: "写真", romaji: "shashin" },
      { id: "w16-2", kana: "を", romaji: "o" },
      { id: "w16-3", kana: "撮って", romaji: "totte" },
      { id: "w16-4", kana: "も", romaji: "mo" },
      { id: "w16-5", kana: "いい", romaji: "ii" },
      { id: "w16-6", kana: "です", romaji: "desu" },
      { id: "w16-7", kana: "か", romaji: "ka" }
    ]
  },
  {
    id: 17,
    translation: "I want a summer vacation.",
    romajiHint: "Natsuyasumi ga hoshii desu.",
    items: [
      { id: "w17-1", kana: "夏休み", romaji: "natsuyasumi" },
      { id: "w17-2", kana: "が", romaji: "ga" },
      { id: "w17-3", kana: "欲しい", romaji: "hoshii" },
      { id: "w17-4", kana: "です", romaji: "desu" }
    ]
  },
  {
    id: 18,
    translation: "My room is small but clean.",
    romajiHint: "Watashi no heya wa semai desu ga kirei desu.",
    items: [
      { id: "w18-1", kana: "私", romaji: "watashi" },
      { id: "w18-2", kana: "の", romaji: "no" },
      { id: "w18-3", kana: "部屋", romaji: "heya" },
      { id: "w18-4", kana: "は", romaji: "wa" },
      { id: "w18-5", kana: "狭い", romaji: "semai" },
      { id: "w18-6", kana: "ですが", romaji: "desu ga" },
      { id: "w18-7", kana: "きれい", romaji: "kirei" },
      { id: "w18-8", kana: "です", romaji: "desu" }
    ]
  },
  {
    id: 19,
    translation: "This book is not so interesting.",
    romajiHint: "Kono hon wa amari omoshiroku nai desu.",
    items: [
      { id: "w19-1", kana: "この", romaji: "kono" },
      { id: "w19-2", kana: "本", romaji: "hon" },
      { id: "w19-3", kana: "は", romaji: "wa" },
      { id: "w19-4", kana: "あまり", romaji: "amari" },
      { id: "w19-5", kana: "面白く", romaji: "omoshiroku" },
      { id: "w19-6", kana: "ない", romaji: "nai" },
      { id: "w19-7", kana: "です", romaji: "desu" }
    ]
  },
  {
    id: 20,
    translation: "Please wait a moment.",
    romajiHint: "Chotto matte kudasai.",
    items: [
      { id: "w20-1", kana: "ちょっと", romaji: "chotto" },
      { id: "w20-2", kana: "待って", romaji: "matte" },
      { id: "w20-3", kana: "ください", romaji: "kudasai" }
    ]
  }
];

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// --- STYLED COMPONENTS ---

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  max-width: 800px;
  position: relative;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.25rem;
    align-items: stretch;
  }
`;

const BackButton = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.2s;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: rgba(255,255,255,0.05);
  align-self: flex-start;

  &:hover {
    color: var(--primary);
    background: rgba(139, 92, 246, 0.1);
  }
`;

const TitleBadge = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #8b5cf6; /* Violet 500 */
  background: rgba(139, 92, 246, 0.1);
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  border: 1px solid rgba(139, 92, 246, 0.2);
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
    position: relative;
  }
`;

const RefreshButton = styled.button`
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(180deg) scale(1.1);
    background: rgba(139, 92, 246, 0.2);
  }

  &:active {
    transform: rotate(360deg) scale(0.9);
  }

  @media (max-width: 600px) {
    position: absolute;
    right: 0;
  }
`;

const GameArea = styled.div`
  background: var(--surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 32px;
  border: 1px solid var(--border);
  padding: 3rem;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  @media (max-width: 600px) {
    padding: 1.5rem;
    border-radius: 24px;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LevelIndicator = styled.div`
  color: var(--text-secondary);
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const TargetSentenceBox = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 2px dashed rgba(139, 92, 246, 0.4);
  padding: 1.5rem;
  border-radius: 16px;
  width: 100%;
  position: relative;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const ShowRomajiToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--border);
    transition: .3s;
    border-radius: 20px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .3s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: #8b5cf6;
  }

  input:checked + span:before {
    transform: translateX(16px);
  }
`;

const TranslationText = styled.h2`
  font-size: 1.5rem;
  color: var(--foreground);
  margin-bottom: 0.5rem;

  @media (max-width: 600px) {
    font-size: 1.15rem;
  }
`;

const RomajiHint = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-style: italic;

  @media (max-width: 600px) {
    font-size: 0.85rem;
  }
`;

const DropZoneWrapper = styled.div<{ $isError?: boolean; $isSuccess?: boolean }>`
  width: 100%;
  min-height: 120px;
  background: ${({ $isError, $isSuccess }) =>
    $isSuccess ? 'rgba(16, 185, 129, 0.05)' :
      $isError ? 'rgba(239, 68, 68, 0.05)' :
        'rgba(255, 255, 255, 0.02)'};
  border: 2px solid ${({ $isError, $isSuccess }) =>
    $isSuccess ? 'rgba(16, 185, 129, 0.3)' :
      $isError ? 'rgba(239, 68, 68, 0.3)' :
        'var(--border)'};
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  @media (max-width: 600px) {
    padding: 1rem;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
`;

const WordChipWrapper = styled.div<{ $isDragging?: boolean }>`
  padding: 0.75rem 1.25rem;
  background: ${({ $isDragging }) => $isDragging ? '#8b5cf6' : 'var(--background)'};
  color: ${({ $isDragging }) => $isDragging ? '#ffffff' : 'var(--foreground)'};
  border: 2px solid ${({ $isDragging }) => $isDragging ? '#8b5cf6' : 'var(--border)'};
  border-radius: 12px;
  cursor: grab;
  box-shadow: ${({ $isDragging }) => $isDragging ? '0 10px 25px -5px rgba(139, 92, 246, 0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'};
  transition: box-shadow 0.2s, background-color 0.2s, color 0.2s, border-color 0.2s;
  user-select: none;
  touch-action: none; // crucial for dnd-kit on mobile
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 600px) {
    padding: 0.5rem 0.8rem;
    border-radius: 10px;
  }
`;

const ChipKana = styled.div`
  font-size: 1.25rem;
  font-weight: 700;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const ChipRomaji = styled.div<{ $isDragging?: boolean }>`
  font-size: 0.8rem;
  margin-top: 0.25rem;
  color: ${({ $isDragging }) => $isDragging ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)'};

  @media (max-width: 600px) {
    font-size: 0.7rem;
    margin-top: 0.15rem;
  }
`;

const ActionButton = styled.button<{ $variant?: 'primary' | 'success' }>`
  padding: 1rem 3rem;
  background: ${({ $variant }) => $variant === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)'};
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px ${({ $variant }) => $variant === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(139, 92, 246, 0.3)'};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 25px -5px ${({ $variant }) => $variant === 'success' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(139, 92, 246, 0.4)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const FeedbackMessage = styled.div<{ $success?: boolean }>`
  font-weight: 700;
  font-size: 1.1rem;
  margin-top: 1rem;
  color: ${({ $success }) => $success ? '#10b981' : '#ef4444'};
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// --- COMPONENTS ---

// Sortable Item Component wrapper
const SortableWordChip = ({ id, word, romaji, showRomaji }: { id: string, word: string, romaji: string, showRomaji: boolean }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <WordChipWrapper $isDragging={isDragging}>
        <ChipKana>{word}</ChipKana>
        {showRomaji && (
          <ChipRomaji $isDragging={isDragging}>{romaji}</ChipRomaji>
        )}
      </WordChipWrapper>
    </div>
  );
};


export default function SentenceBuilderPage() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [gameSentences, setGameSentences] = useState<SentenceLevel[]>([]);
  const [words, setWords] = useState<WordItem[]>([]);
  const [status, setStatus] = useState<'playing' | 'error' | 'success'>('playing');
  const [showRomaji, setShowRomaji] = useState(false);

  // Must mount before we can safely use dnd-kit on the client
  const [isMounted, setIsMounted] = useState(false);

  const initGame = () => {
    const shuffledSubset = shuffleArray(ALL_SENTENCES).slice(0, 10);
    setGameSentences(shuffledSubset);
    loadLevelWithData(0, shuffledSubset);
  };

  useEffect(() => {
    setIsMounted(true);
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadLevelWithData = (idx: number, sentences: SentenceLevel[]) => {
    const levelData = sentences[idx];
    if (!levelData) return;

    setWords(shuffleArray(levelData.items));
    setStatus('playing');
    setLevelIndex(idx);
  };

  const loadLevel = (idx: number) => {
    loadLevelWithData(idx, gameSentences);
  };

  const swapCurrentQuestion = () => {
    const inUseIds = new Set(gameSentences.map(s => s.id));
    const available = ALL_SENTENCES.filter(s => !inUseIds.has(s.id));

    let newSentence: SentenceLevel;
    if (available.length > 0) {
      newSentence = available[Math.floor(Math.random() * available.length)];
    } else {
      const others = ALL_SENTENCES.filter(s => s.id !== gameSentences[levelIndex].id);
      newSentence = others[Math.floor(Math.random() * others.length)];
    }

    const updatedSentences = [...gameSentences];
    updatedSentences[levelIndex] = newSentence;

    setGameSentences(updatedSentences);
    loadLevelWithData(levelIndex, updatedSentences);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // minimum drag distance before taking over
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setWords((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      // reset status on any drag
      setStatus('playing');
    }
  };

  const { addExp } = useProgress();

  const checkSentence = () => {
    const correctSequence = gameSentences[levelIndex].items;

    // Check if the arrays match exactly based on their IDs
    const isMatched = words.every((word, idx) => word.id === correctSequence[idx].id);

    if (isMatched) {
      setStatus('success');
      addExp(15); // 15 EXP per correct sentence (balanced)
    } else {
      setStatus('error');
    }
  };

  const nextLevel = () => {
    if (levelIndex < gameSentences.length - 1) {
      loadLevel(levelIndex + 1);
    } else {
      // Completed all levels! Reset and generate a new batch of 10
      initGame();
    }
  };

  if (!isMounted || gameSentences.length === 0) return null;

  const currentLevel = gameSentences[levelIndex];

  return (
    <Container>
      <Header>
        <BackButton href="/game">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Games Hub
        </BackButton>
        <HeaderActions>
          <TitleBadge>Sentence Builder</TitleBadge>
          <RefreshButton onClick={swapCurrentQuestion} aria-label="Reroll Question">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </RefreshButton>
        </HeaderActions>
      </Header>

      <GameArea>
        <TopRow>
          <LevelIndicator>
            Sentence {levelIndex + 1} of {gameSentences.length}
          </LevelIndicator>
          <ShowRomajiToggle>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={showRomaji}
                onChange={(e) => setShowRomaji(e.target.checked)}
              />
              <span />
            </ToggleSwitch>
            Show Romaji
          </ShowRomajiToggle>
        </TopRow>

        <TargetSentenceBox>
          <TranslationText>&ldquo;{currentLevel.translation}&rdquo;</TranslationText>
          <RomajiHint>Hints: {currentLevel.romajiHint}</RomajiHint>
        </TargetSentenceBox>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <DropZoneWrapper $isError={status === 'error'} $isSuccess={status === 'success'}>
            <SortableContext items={words.map(w => w.id)} strategy={horizontalListSortingStrategy}>
              {words.map((word) => (
                <SortableWordChip key={word.id} id={word.id} word={word.kana} romaji={word.romaji} showRomaji={showRomaji} />
              ))}
            </SortableContext>
          </DropZoneWrapper>
        </DndContext>

        {status === 'success' ? (
          <>
            <ActionButton $variant="success" onClick={nextLevel}>
              {levelIndex < gameSentences.length - 1 ? 'Next Sentence →' : 'Play Again'}
            </ActionButton>
            <FeedbackMessage $success={true}>
              🎉 Seikai! (Correct!){' '}
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: '#10b981',
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                fontWeight: 800,
                fontSize: '0.9rem',
                marginLeft: '0.5rem',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                🏆 +15 EXP
              </span>
            </FeedbackMessage>
          </>
        ) : (
          <>
            <ActionButton onClick={checkSentence}>
              Check Answer
            </ActionButton>
            {status === 'error' && (
              <FeedbackMessage $success={false}>Incorrect order. Try again!</FeedbackMessage>
            )}
          </>
        )}
      </GameArea>
    </Container>
  );
}
