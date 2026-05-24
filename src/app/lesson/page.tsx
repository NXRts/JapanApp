'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSearchParams, useRouter } from 'next/navigation';
import { useProgress } from '@/context/ProgressContext';
import { lessonsData, Lesson, Question } from '@/data/lessonsData';
import { generatorBank } from '@/data/generatorBank';
import Link from 'next/link';

// ==========================================
// ANIMATIONS
// ==========================================
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const popIn = keyframes`
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
`;

// ==========================================
// STYLED COMPONENTS
// ==========================================
const FullscreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--background);
  color: var(--foreground);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem env(safe-area-inset-bottom);
  font-family: 'Nunito', 'Outfit', system-ui, -apple-system, sans-serif;
  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 1rem;
  padding-bottom: 8rem; /* Space for feedback panel */
`;

// Header Styles
const LessonHeader = styled.header`
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 1.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: var(--foreground);
  }
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 16px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 99px;
  overflow: hidden;
  border: 1px solid var(--border);
  position: relative;

  @media (prefers-color-scheme: light) {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => `${$percent}%`};
  background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
  border-radius: 99px;
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
`;

const LivesIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 800;
  font-size: 1.25rem;
  color: #ef4444;
  animation: ${float} 2s ease-in-out infinite;
`;

// Question Card & Elements
const QuestionBox = styled.div<{ $shake?: boolean }>`
  width: 100%;
  margin-top: 1.5rem;
  animation: ${popIn} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  ${({ $shake }) => $shake && css`
    animation: ${shake} 0.4s ease-in-out;
  `}
`;

const QuestionCategory = styled.span`
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--primary);
  letter-spacing: 0.1em;
`;

const QuestionText = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0.5rem 0 2rem;
  line-height: 1.4;
`;

// Types of options grids
const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;
  margin-bottom: 2rem;
`;

const OptionCard = styled.button<{ $selected: boolean }>`
  width: 100%;
  padding: 1.25rem;
  background: ${({ $selected }) => ($selected ? 'rgba(59, 130, 246, 0.08)' : 'var(--surface)')};
  border: 2px solid ${({ $selected }) => ($selected ? 'var(--primary)' : 'var(--border)')};
  border-bottom-width: 5px;
  border-radius: 20px;
  color: var(--foreground);
  font-size: 1.15rem;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  transition: all 0.1s ease;
  outline: none;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover:not(:disabled) {
    border-color: var(--primary);
    background: rgba(var(--primary-rgb), 0.04);
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

const OptionIndex = styled.span<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 2px solid ${({ $selected }) => ($selected ? 'var(--primary)' : 'var(--border)')};
  font-size: 0.9rem;
  color: ${({ $selected }) => ($selected ? 'var(--primary)' : 'var(--text-secondary)')};
  font-weight: 800;
`;

// Sentence Builder Components
const SentenceArea = styled.div`
  width: 100%;
  min-height: 80px;
  border-bottom: 2px solid var(--border);
  margin-bottom: 2.5rem;
  padding: 0.5rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-content: flex-start;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--border);
  }
`;

const ScrambledArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const WordCard = styled.button<{ $used?: boolean }>`
  padding: 0.6rem 1.2rem;
  background: var(--surface);
  border: 2px solid var(--border);
  border-bottom-width: 4px;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--foreground);
  cursor: pointer;
  transition: all 0.1s ease;
  
  ${({ $used }) => $used && css`
    opacity: 0.25;
    cursor: default;
    transform: scale(0.95);
    border-bottom-width: 2px;
  `}

  &:active:not(:disabled) {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

// Typing Component
const TypingInput = styled.input`
  width: 100%;
  padding: 1.25rem;
  background: var(--surface);
  border: 2px solid var(--border);
  border-bottom-width: 5px;
  border-radius: 20px;
  color: var(--foreground);
  font-size: 1.35rem;
  font-weight: 800;
  text-align: center;
  outline: none;
  transition: all 0.2s;
  letter-spacing: 0.05em;

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 12px rgba(16, 185, 129, 0.15);
  }
`;

// Listening Component
const AudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const SpeakerButton = styled.button`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--primary);
  border: none;
  border-bottom: 6px solid var(--primary-dark);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
  transition: all 0.1s ease;
  outline: none;

  &:active {
    transform: translateY(3px);
    border-bottom-width: 3px;
  }

  svg {
    width: 40px;
    height: 40px;
    fill: currentColor;
  }
`;

const AudioHint = styled.span`
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

// bottom bar for answer feedback
const FeedbackPanel = styled.div<{ $state: 'correct' | 'incorrect' | 'hidden' }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ $state }) => 
    $state === 'correct' ? '#d1fae5' : 
    $state === 'incorrect' ? '#fee2e2' : 
    'var(--surface)'};
  border-top: 2px solid ${({ $state }) => 
    $state === 'correct' ? '#10b981' : 
    $state === 'incorrect' ? '#ef4444' : 
    'var(--border)'};
  padding: 1.5rem 1.5rem calc(1.5rem + env(safe-area-inset-bottom));
  display: flex;
  justify-content: center;
  z-index: 1000;
  animation: ${slideUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @media (prefers-color-scheme: dark) {
    background: ${({ $state }) => 
      $state === 'correct' ? '#064e3b' : 
      $state === 'incorrect' ? '#7f1d1d' : 
      'var(--surface)'};
  }
`;

const FeedbackContent = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FeedbackTextContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const FeedbackIcon = styled.div<{ $state: 'correct' | 'incorrect' }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ $state }) => ($state === 'correct' ? '#10b981' : '#ef4444')};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const FeedbackTitle = styled.h4<{ $state: 'correct' | 'incorrect' }>`
  font-size: 1.25rem;
  font-weight: 900;
  color: ${({ $state }) => ($state === 'correct' ? '#047857' : '#b91c1c')};
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: ${({ $state }) => ($state === 'correct' ? '#34d399' : '#fca5a5')};
  }
`;

const FeedbackDetail = styled.p`
  font-size: 0.95rem;
  margin: 0.25rem 0 0;
  color: var(--text-secondary);
  line-height: 1.4;

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const CheckButton = styled.button<{ $active: boolean; $state: 'correct' | 'incorrect' | 'hidden' }>`
  width: 100%;
  padding: 1rem;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 800;
  border: none;
  cursor: ${({ $active }) => ($active ? 'pointer' : 'not-allowed')};
  transition: all 0.1s ease;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  ${({ $active, $state }) => {
    if ($state === 'correct') {
      return css`
        background: #10b981;
        color: white;
        border-bottom: 4px solid #047857;
      `;
    }
    if ($state === 'incorrect') {
      return css`
        background: #ef4444;
        color: white;
        border-bottom: 4px solid #b91c1c;
      `;
    }
    return $active
      ? css`
          background: #10b981;
          color: white;
          border-bottom: 4px solid #059669;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
        `
      : css`
          background: var(--border);
          color: var(--text-secondary);
          border-bottom: 4px solid rgba(0, 0, 0, 0.05);
        `;
  }}

  &:active {
    ${({ $active }) => $active && css`
      transform: translateY(2px);
      border-bottom-width: 2px;
    `}
  }
`;

// Victory Dashboard
const VictoryOverlay = styled.div`
  width: 100%;
  max-width: 500px;
  text-align: center;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${popIn} 0.5s cubic-bezier(0.16, 1, 0.3, 1);
`;

const TrophyGraphic = styled.div`
  font-size: 5rem;
  margin-bottom: 1.5rem;
  animation: ${float} 2s ease-in-out infinite;
`;

const VictoryTitle = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  color: #10b981;
  margin-bottom: 0.5rem;
`;

const VictorySubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  line-height: 1.5;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  margin-bottom: 3rem;
`;

const StatCard = styled.div<{ $color: string }>`
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 20px;
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  .label {
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--text-secondary);
    letter-spacing: 0.05em;
  }

  .value {
    font-size: 1.4rem;
    font-weight: 900;
    color: ${({ $color }) => $color};
  }
`;

const ContinueBtn = styled.button`
  width: 100%;
  padding: 1.1rem;
  background: #10b981;
  color: white;
  border-radius: 16px;
  font-size: 1.15rem;
  font-weight: 800;
  border: none;
  border-bottom: 5px solid #059669;
  cursor: pointer;
  transition: all 0.1s;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }
`;

// Game Over Card
const GameOverOverlay = styled(VictoryOverlay)`
  .hearts-broken {
    font-size: 5rem;
    margin-bottom: 1.5rem;
  }
`;

const RetryBtn = styled(ContinueBtn)`
  background: #ef4444;
  border-color: #b91c1c;
`;

const ExitBtn = styled(Link)`
  margin-top: 1.25rem;
  color: var(--text-secondary);
  font-weight: 800;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    color: var(--foreground);
  }
`;

// ==========================================
// UTILITIES
// ==========================================
const speakText = (text: string) => {
  if (typeof window === 'undefined') return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8; // Learner pace
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.error('Audio synthesis failed', e);
  }
};

const playCorrectSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12);  // A5
    
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    console.warn('Correct Audio blocked', e);
  }
};

const playIncorrectSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
    osc.frequency.setValueAtTime(196, ctx.currentTime + 0.12);  // G3
    
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {
    console.warn('Incorrect Audio blocked', e);
  }
};

// ==========================================
// PROCEDURAL DYNAMIC QUESTION GENERATOR ENGINE
// ==========================================
const tokenizeSentence = (sentence: string): string[] => {
  const clean = sentence.replace(/[。！、]/g, '');
  if (clean === 'わたしはたなかです') return ['わたし', 'は', 'たなか', 'es', 'です']; // Add standard distractors/morphemes
  if (clean === 'みずをのみます') return ['みず', 'を', 'のみます'];
  if (clean === 'がっこうにいきます') return ['がっこう', 'に', 'いきます'];
  if (clean === 'すしがたべたいes') return ['すし', 'が', 'たべたい', 'です'];
  if (clean === 'すしがたべたいです') return ['すし', 'が', 'たべたい', 'es', 'です'];
  if (clean === 'きのうテレビをみた') return ['きのう', 'テレビ', 'を', 'みた'];
  if (clean === 'ちょっとまってください') return ['ちょっと', 'まって', 'ください'];
  if (clean === '雨が降りそうです') return ['雨', 'が', '降りそう', 'es', 'です'];
  if (clean === '田中と申します') return ['田中', 'と', '申します'];
  if (clean === '先生が召し上がります') return ['先生', 'が', '召し上がります'];
  if (clean === 'この問題について考えます') return ['この', '問題', 'について', '考えます'];
  if (clean === '東京において会議が行われた') return ['東京', 'において', '会議', 'が', '行われた'];
  if (clean === '本日をもって閉店いたします') return ['本日', 'をもって', '閉店', 'いたします'];
  if (clean === '行くくなり行かないくなり、返事をして') return ['行くく', 'なり', '行かないく', 'なり', '返事', 'を', 'して'];
  
  return clean.split(/(?!$)/u);
};

function generateDynamicQuestions(lesson: Lesson): Question[] {
  const level = lesson.level;
  const bank = generatorBank[level];
  if (!bank) return lesson.questions;

  const generated: Question[] = [];
  const lessonId = lesson.id;

  let vocabPool = bank.vocabulary;
  let grammarPool = bank.grammar;

  const titleLower = lesson.title.toLowerCase();
  const descLower = lesson.description.toLowerCase();

  // Smart vocabulary filtering
  if (titleLower.includes('vokal') || descLower.includes('vokal')) {
    vocabPool = bank.vocabulary.filter(v => v.category === 'vowels');
  } else if (titleLower.includes('sapaan') || descLower.includes('sapaan') || titleLower.includes('aisatsu')) {
    vocabPool = bank.vocabulary.filter(v => v.category === 'greetings');
  } else if (titleLower.includes('makanan') || descLower.includes('makanan') || titleLower.includes('kuliner')) {
    vocabPool = bank.vocabulary.filter(v => v.category === 'food');
  } else if (titleLower.includes('arah') || titleLower.includes('lokasi') || titleLower.includes('stasiun')) {
    vocabPool = bank.vocabulary.filter(v => v.category === 'travel' || v.category === 'places' || v.category === 'directions');
  } else if (titleLower.includes('kerja') || titleLower.includes('aktivitas')) {
    vocabPool = bank.vocabulary.filter(v => v.category === 'verbs');
  } else if (titleLower.includes('sopan') || titleLower.includes('keigo') || titleLower.includes('hormat')) {
    vocabPool = bank.vocabulary.filter(v => v.category === 'verbs' || v.category === 'traits');
  } else if (titleLower.includes('katakana')) {
    vocabPool = bank.vocabulary.filter(v => /[\u30a0-\u30ff]/.test(v.japanese));
  }

  if (!vocabPool || vocabPool.length === 0) {
    vocabPool = bank.vocabulary;
  }

  // Smart grammar filtering
  if (titleLower.includes('keinginan') || descLower.includes('keinginan') || titleLower.includes('~tai')) {
    grammarPool = bank.grammar.filter(g => g.pattern.toLowerCase().includes('tai'));
  } else if (titleLower.includes('lampau') || titleLower.includes('~ta') || titleLower.includes('lalu')) {
    grammarPool = bank.grammar.filter(g => g.pattern.toLowerCase().includes('ta'));
  } else if (titleLower.includes('kelihatannya') || titleLower.includes('~sou') || titleLower.includes('dugaan')) {
    grammarPool = bank.grammar.filter(g => g.pattern.toLowerCase().includes('sou'));
  } else if (titleLower.includes('sopan') || titleLower.includes('keigo') || titleLower.includes('hormat')) {
    grammarPool = bank.grammar.filter(g => g.pattern.toLowerCase().includes('kenjougo') || g.pattern.toLowerCase().includes('sonkeigo'));
  } else if (titleLower.includes('mengenai') || titleLower.includes('tentang')) {
    grammarPool = bank.grammar.filter(g => g.pattern.toLowerCase().includes('about') || g.pattern.toLowerCase().includes('tsuite'));
  } else if (titleLower.includes('batas') || titleLower.includes('motte')) {
    grammarPool = bank.grammar.filter(g => g.pattern.toLowerCase().includes('motte'));
  }

  if (!grammarPool || grammarPool.length === 0) {
    grammarPool = bank.grammar;
  }

  const targetCount = 10;

  const shuffle = <T,>(arr: T[]): T[] => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  for (let i = 0; i < targetCount; i++) {
    const id = `${lessonId}-q-dyn-${i + 1}`;
    const typeIndex = i % 5;

    if (typeIndex === 0) {
      // 1. Multiple choice
      const item = vocabPool[i % vocabPool.length];
      const categoryItems = vocabPool.filter(v => v.category === item.category && v.japanese !== item.japanese);
      const remainingPool = vocabPool.filter(v => v.japanese !== item.japanese);
      const pool = categoryItems.length >= 3 ? categoryItems : remainingPool;
      const distractors = shuffle(pool).slice(0, 3).map(p => p.english);
      const options = shuffle([...distractors, item.english]);

      generated.push({
        id,
        type: 'multiple-choice',
        questionText: `Apakah arti yang tepat untuk kosakata bahasa Jepang berikut: 「${item.japanese}」?`,
        options,
        answer: item.english,
        hint: `Dilafalkan sebagai "${item.romaji || ''}"`
      });
    } 
    else if (typeIndex === 1) {
      // 2. Listening
      const item = vocabPool[(i + 2) % vocabPool.length];
      const distractors = shuffle(vocabPool.filter(v => v.japanese !== item.japanese)).slice(0, 3).map(p => p.english);
      const options = shuffle([...distractors, item.english]);

      generated.push({
        id,
        type: 'listening',
        audioText: item.japanese,
        questionText: `Dengarkan suara audio berikut dan pilihlah terjemahan bahasa Indonesia yang tepat!`,
        options,
        answer: item.english,
        hint: `Fokus pada pengucapan kata: "${item.japanese}"`
      });
    } 
    else if (typeIndex === 2 && grammarPool.length > 0) {
      // 3. Sentence builder
      const item = grammarPool[i % grammarPool.length];
      const sentenceWords = tokenizeSentence(item.exampleSentence);
      const distractors = ['ね', 'よ', 'が', 'を'].filter(d => !sentenceWords.includes(d));
      const options = shuffle([...sentenceWords, ...distractors.slice(0, 2)]);

      generated.push({
        id,
        type: 'sentence-builder',
        questionText: `Susunlah kartu-kartu kata di bawah ini menjadi kalimat yang tepat: "${item.englishTranslation}"`,
        options,
        answer: sentenceWords.join(' '),
        hint: `Gunakan partikel yang sesuai dengan tata bahasa Jepang.`
      });
    } 
    else if (typeIndex === 3 && grammarPool.length > 0) {
      // 4. Fill in the blank
      const item = grammarPool[(i + 1) % grammarPool.length];
      generated.push({
        id,
        type: 'fill-in-the-blank',
        questionText: `Pilihlah jawaban yang tepat untuk melengkapi bagian rumpang berikut:\n「${item.exampleSentence.replace(item.answer, ' ___ ')}」\n(${item.englishTranslation})`,
        options: item.options,
        answer: item.answer,
        hint: item.explanation
      });
    } 
    else {
      // 5. Typing
      const item = vocabPool[(i + 4) % vocabPool.length];
      const isVowel = item.category === 'vowels';
      const answerText = isVowel 
        ? (item.romaji || '').trim().toLowerCase()
        : item.english.split(' / ')[0].trim().toLowerCase();

      generated.push({
        id,
        type: 'typing',
        questionText: isVowel
          ? `Ketiklah padanan Romaji untuk huruf Hiragana berikut: 「${item.japanese}」`
          : `Ketik arti bahasa Indonesia untuk kosakata berikut: 「${item.japanese}」`,
        options: [],
        answer: answerText,
        hint: isVowel
          ? `Dibaca seperti bunyi vokal "${answerText.toUpperCase()}".`
          : `Ucapannya adalah "${item.romaji || ''}".`
      });
    }
  }

  // Ensure count remains exact
  while (generated.length < targetCount) {
    const fallbackItem = vocabPool[generated.length % vocabPool.length];
    generated.push({
      id: `${lessonId}-q-dyn-fallback-${generated.length + 1}`,
      type: 'multiple-choice',
      questionText: `Apakah arti kata: 「${fallbackItem.japanese}」?`,
      options: shuffle([fallbackItem.english, 'Salah 1', 'Salah 2', 'Salah 3']),
      answer: fallbackItem.english,
      hint: `Romaji: ${fallbackItem.romaji || ''}`
    });
  }

  return generated;
}

// ==========================================
// CORE CONTENT COMPONENT
// ==========================================
function LessonPlayerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { markExerciseCompleted, addExp } = useProgress();
  const startTime = useRef<number | null>(null);

  const lessonId = searchParams.get('id') || 'n5-u1-l1';
  const lesson = lessonsData.find((l) => l.id === lessonId) || lessonsData[0];
  const [questions, setQuestions] = useState<Question[]>([]);

  // State Management
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [shakeBox, setShakeBox] = useState(false);
  const [hasVoiceTriggered, setHasVoiceTriggered] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Initialize questions and start time safely on client-side mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuestions(generateDynamicQuestions(lesson));
      startTime.current = Date.now();
    }, 0);
    return () => clearTimeout(timer);
  }, [lessonId, lesson]);

  const activeQuestion = questions[currentIdx];

  // Auto voice trigger for listening type
  useEffect(() => {
    if (activeQuestion?.type === 'listening' && !hasVoiceTriggered) {
      const timer = setTimeout(() => {
        speakText(activeQuestion.audioText || '');
        setHasVoiceTriggered(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIdx, activeQuestion, hasVoiceTriggered]);

  // Handle options select
  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  // Card sentence click
  const handleCardClick = (word: string) => {
    if (isAnswered) return;
    setSelectedCards((prev) => [...prev, word]);
  };

  // Remove card from sentence builder
  const handleRemoveCard = (index: number) => {
    if (isAnswered) return;
    setSelectedCards((prev) => prev.filter((_, idx) => idx !== index));
  };

  const isCheckActive = () => {
    if (!activeQuestion) return false;
    if (isAnswered) return true;
    if (activeQuestion.type === 'multiple-choice' || activeQuestion.type === 'listening') {
      return selectedOption !== null;
    }
    if (activeQuestion.type === 'sentence-builder') {
      return selectedCards.length > 0;
    }
    if (activeQuestion.type === 'typing' || activeQuestion.type === 'fill-in-the-blank') {
      return typedAnswer.trim().length > 0;
    }
    return false;
  };

  const handleCheckAnswer = () => {
    if (!activeQuestion) return;
    if (isAnswered) {
      // Proceed to next question
      if (currentIdx < questions.length - 1) {
        setCurrentIdx((idx) => idx + 1);
        setSelectedOption(null);
        setSelectedCards([]);
        setTypedAnswer('');
        setIsAnswered(false);
        setHasVoiceTriggered(false);
      } else {
        // Finish Lesson!
        const totalTime = Math.round((Date.now() - (startTime.current || Date.now())) / 1000);
        setElapsedTime(totalTime);
        addExp(lesson.expReward);
        markExerciseCompleted(lesson.id);
        setIsFinished(true);
      }
      return;
    }

    // Checking answer
    let correct = false;
    const cleanAnswer = activeQuestion.answer.trim().toLowerCase();

    if (activeQuestion.type === 'multiple-choice' || activeQuestion.type === 'listening') {
      correct = selectedOption?.trim().toLowerCase() === cleanAnswer;
    } else if (activeQuestion.type === 'sentence-builder') {
      const userSentence = selectedCards.join(' ').trim().toLowerCase();
      correct = userSentence === cleanAnswer;
    } else if (activeQuestion.type === 'typing') {
      correct = typedAnswer.trim().toLowerCase() === cleanAnswer;
    } else if (activeQuestion.type === 'fill-in-the-blank') {
      correct = typedAnswer.trim().toLowerCase() === cleanAnswer;
    }

    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      playCorrectSound();
    } else {
      playIncorrectSound();
      setShakeBox(true);
      setTimeout(() => setShakeBox(false), 400);
      setHearts((h) => {
        const nextH = h - 1;
        if (nextH <= 0) {
          const totalTime = Math.round((Date.now() - (startTime.current || Date.now())) / 1000);
          setElapsedTime(totalTime);
          setTimeout(() => setIsGameOver(true), 600);
        }
        return nextH;
      });
    }
  };

  // Game over retry
  const handleRetry = () => {
    setCurrentIdx(0);
    setHearts(5);
    setSelectedOption(null);
    setSelectedCards([]);
    setTypedAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setIsFinished(false);
    setIsGameOver(false);
    setElapsedTime(0);
    setHasVoiceTriggered(false);
    startTime.current = Date.now();
  };

  // Exit prompt confirmation
  const handleExit = (e: React.MouseEvent) => {
    if (!window.confirm('Keluar dari pelajaran? Kemajuan sesi ini akan hilang.')) {
      e.preventDefault();
    }
  };

  if (questions.length === 0) {
    return (
      <FullscreenContainer>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '60vh' }}>
          <TrophyGraphic style={{ animation: 'float 2s ease-in-out infinite' }}>🎌</TrophyGraphic>
          <VictoryTitle>Memuat Pelajaran...</VictoryTitle>
          <VictorySubtitle>Sistem sedang meracik soal dinamis untuk Anda.</VictorySubtitle>
        </div>
      </FullscreenContainer>
    );
  }

  if (isFinished) {
    const elapsedMinutes = Math.floor(elapsedTime / 60);
    const elapsedSeconds = elapsedTime % 60;

    return (
      <FullscreenContainer>
        <VictoryOverlay>
          <TrophyGraphic>🏆</TrophyGraphic>
          <VictoryTitle>Pelajaran Selesai!</VictoryTitle>
          <VictorySubtitle>Kerja bagus! Sesi ini melatih pemahaman Anda secara komprehensif.</VictorySubtitle>

          <StatsGrid>
            <StatCard $color="#fbbf24">
              <span className="label">EXP Gained</span>
              <span className="value">+{lesson.expReward} EXP</span>
            </StatCard>
            <StatCard $color="#3b82f6">
              <span className="label">Waktu</span>
              <span className="value">
                {elapsedMinutes > 0 ? `${elapsedMinutes}m ` : ''}{elapsedSeconds}s
              </span>
            </StatCard>
          </StatsGrid>

          <ContinueBtn onClick={() => router.push('/')}>
            Lanjutkan
          </ContinueBtn>
        </VictoryOverlay>
      </FullscreenContainer>
    );
  }

  if (isGameOver) {
    return (
      <FullscreenContainer>
        <GameOverOverlay>
          <div className="hearts-broken">💔</div>
          <VictoryTitle style={{ color: '#ef4444' }}>Kehabisan Nyawa!</VictoryTitle>
          <VictorySubtitle>Jangan menyerah! Latihan membuat Anda semakin mahir. Mari coba lagi!</VictorySubtitle>

          <RetryBtn onClick={handleRetry}>
            Coba Lagi
          </RetryBtn>
          <ExitBtn href="/" onClick={handleExit}>
            Keluar Ke Roadmap
          </ExitBtn>
        </GameOverOverlay>
      </FullscreenContainer>
    );
  }

  const progressPercent = (currentIdx / questions.length) * 100;

  return (
    <FullscreenContainer>
      <LessonHeader>
        <Link href="/" onClick={handleExit} passHref legacyBehavior={false}>
          <CloseButton aria-label="Exit Lesson">✕</CloseButton>
        </Link>
        <ProgressBar>
          <ProgressFill $percent={progressPercent} />
        </ProgressBar>
        <LivesIndicator title="Hearts Remaining">
          ❤️ {hearts}
        </LivesIndicator>
      </LessonHeader>

      <ContentWrapper>
        <QuestionBox $shake={shakeBox}>
          <QuestionCategory>
            {activeQuestion.type === 'listening' ? 'Mendengarkan' : 
             activeQuestion.type === 'sentence-builder' ? 'Menyusun Kalimat' : 
             activeQuestion.type === 'typing' ? 'Ketik Jawaban' : 
             activeQuestion.type === 'fill-in-the-blank' ? 'Isi Rumpang' : 
             'Pilihan Ganda'}
          </QuestionCategory>

          <QuestionText>{activeQuestion.questionText}</QuestionText>

          {/* QUESTION TYPE RENDER */}
          {activeQuestion.type === 'multiple-choice' && (
            <OptionGrid>
              {activeQuestion.options.map((option, idx) => (
                <OptionCard
                  key={option}
                  $selected={selectedOption === option}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                >
                  <OptionIndex $selected={selectedOption === option}>{idx + 1}</OptionIndex>
                  {option}
                </OptionCard>
              ))}
            </OptionGrid>
          )}

          {activeQuestion.type === 'listening' && (
            <>
              <AudioContainer>
                <SpeakerButton onClick={() => speakText(activeQuestion.audioText || '')} type="button">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                </SpeakerButton>
                <AudioHint>Klik untuk memutar suara</AudioHint>
              </AudioContainer>

              <OptionGrid>
                {activeQuestion.options.map((option, idx) => (
                  <OptionCard
                    key={option}
                    $selected={selectedOption === option}
                    onClick={() => handleSelectOption(option)}
                    disabled={isAnswered}
                  >
                    <OptionIndex $selected={selectedOption === option}>{idx + 1}</OptionIndex>
                    {option}
                  </OptionCard>
                ))}
              </OptionGrid>
            </>
          )}

          {activeQuestion.type === 'sentence-builder' && (
            <>
              <SentenceArea>
                {selectedCards.map((card, idx) => (
                  <WordCard key={idx} onClick={() => handleRemoveCard(idx)}>
                    {card}
                  </WordCard>
                ))}
              </SentenceArea>

              <ScrambledArea>
                {activeQuestion.options.map((word, idx) => {
                  const usedCount = selectedCards.filter((c) => c === word).length;
                  const isUsed = usedCount > 0 && selectedCards.indexOf(word) !== -1; // Basic visual placeholder
                  return (
                    <WordCard
                      key={idx}
                      $used={isUsed}
                      onClick={() => !isUsed && handleCardClick(word)}
                      disabled={isUsed || isAnswered}
                    >
                      {word}
                    </WordCard>
                  );
                })}
              </ScrambledArea>
            </>
          )}

          {activeQuestion.type === 'typing' && (
            <TypingInput
              type="text"
              placeholder="Ketik bahasa Indonesianya..."
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              disabled={isAnswered}
              autoFocus
            />
          )}

          {activeQuestion.type === 'fill-in-the-blank' && (
            <>
              <TypingInput
                type="text"
                placeholder="Ketik partikel yang rumpang (misal: は, を, に)..."
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                disabled={isAnswered}
                autoFocus
              />
              <ScrambledArea style={{ marginTop: '1.5rem' }}>
                {activeQuestion.options.map((opt) => (
                  <WordCard
                    key={opt}
                    onClick={() => setTypedAnswer(opt)}
                    disabled={isAnswered}
                  >
                    {opt}
                  </WordCard>
                ))}
              </ScrambledArea>
            </>
          )}
        </QuestionBox>
      </ContentWrapper>

      {/* FEEDBACK BOTTOM PANEL */}
      <FeedbackPanel $state={isAnswered ? (isCorrect ? 'correct' : 'incorrect') : 'hidden'}>
        <FeedbackContent>
          {isAnswered && (
            <FeedbackTextContainer>
              <FeedbackIcon $state={isCorrect ? 'correct' : 'incorrect'}>
                {isCorrect ? '✓' : '✕'}
              </FeedbackIcon>
              <div>
                <FeedbackTitle $state={isCorrect ? 'correct' : 'incorrect'}>
                  {isCorrect ? 'Luar Biasa!' : 'Jawaban Kurang Tepat'}
                </FeedbackTitle>
                <FeedbackDetail>
                  {isCorrect ? 
                    'Jawaban Anda 100% tepat.' : 
                    `Jawaban yang benar: ${activeQuestion.answer}`}
                </FeedbackDetail>
              </div>
            </FeedbackTextContainer>
          )}
          
          <CheckButton
            $active={isCheckActive()}
            $state={isAnswered ? (isCorrect ? 'correct' : 'incorrect') : 'hidden'}
            onClick={() => isCheckActive() && handleCheckAnswer()}
          >
            {isAnswered ? 'Lanjutkan' : 'Periksa'}
          </CheckButton>
        </FeedbackContent>
      </FeedbackPanel>
    </FullscreenContainer>
  );
}

// Next.js Suspense wrapper for search params compatibility
export default function LessonPlayerPage() {
  return (
    <Suspense fallback={
      <FullscreenContainer style={{ justifyContent: 'center' }}>
        <div style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
          Memuat Pelajaran...
        </div>
      </FullscreenContainer>
    }>
      <LessonPlayerContent />
    </Suspense>
  );
}
