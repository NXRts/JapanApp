'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { toKana, isRomaji, toRomaji } from 'wanakana';
import { searchDictionary, DictionaryResult, allVocabulary, allKanji, allGrammar } from '@/lib/dictionary';
import Link from 'next/link';
import KanaKeyboard from '@/components/KanaKeyboard';
import { HandwritingModal } from '@/components/dictionary/HandwritingModal';
import { VoiceSearchModal } from '@/components/dictionary/VoiceSearchModal';
import { ImageSearchModal } from '@/components/dictionary/ImageSearchModal';
import { playJapaneseAudio } from '@/lib/audio';

const KANA_LIST = [
  'あ', 'い', 'う', 'え', 'お',
  'か', 'き', 'く', 'け', 'こ',
  'さ', 'し', 'す', 'せ', 'そ',
  'た', 'ち', 'つ', 'て', 'と',
  'な', 'に', 'ぬ', 'ね', 'の',
  'は', 'ひ', 'ふ', 'へ', 'ほ',
  'ま', 'み', 'む', 'め', 'も',
  'や', 'ゆ', 'よ',
  'ら', 'り', 'る', 'れ', 'ろ',
  'わ', 'を', 'ん',
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', 'ユ', 'ヨ',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', 'ヲ', 'ン'
];

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  gap: 1.25rem;
  padding: 1.5rem 2rem;
  min-height: 100vh;
  background-image: radial-gradient(var(--dot-color) 1.2px, transparent 1.2px);
  background-size: 32px 32px;
  color: var(--foreground);
  overflow-x: hidden;

  @media (max-width: 1024px) {
    padding: 1rem;
    gap: 0.75rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem;
    gap: 0.5rem;
  }
`;

const Sidebar = styled.aside`
  width: 240px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const MobileFilters = styled.div`
  display: none;
  flex-direction: column;
  gap: 0.85rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.1rem;
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(10px);
  margin-bottom: 0.5rem;

  @media (max-width: 1024px) {
    display: flex;
  }

  @media (max-width: 640px) {
    border-radius: 16px;
    padding: 0.9rem;
    gap: 0.75rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const FilterChipRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.35rem;
  width: 100%;
  padding: 0.2rem 0;

  @media (max-width: 640px) {
    gap: 0.25rem;
  }
`;

const FilterLabel = styled.span`
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.85;
  margin-left: 0.25rem;
  white-space: nowrap;
  flex-shrink: 0;
`;

const FilterChip = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.4rem 0.5rem;
  border-radius: 99px;
  border: 1px solid ${({ $active }) => $active ? 'var(--primary-dark)' : 'rgba(var(--primary-rgb), 0.15)'};
  background: ${({ $active }) => $active 
    ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' 
    : 'rgba(var(--primary-rgb), 0.03)'};
  color: ${({ $active }) => $active ? '#ffffff' : 'var(--text-secondary)'};
  font-size: 0.78rem;
  font-weight: ${({ $active }) => $active ? '700' : '600'};
  white-space: nowrap;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  box-shadow: ${({ $active }) => $active ? '0 3px 8px -1px rgba(var(--primary-rgb), 0.4)' : 'none'};
  outline: none;
  width: 100%;

  &:hover {
    border-color: ${({ $active }) => $active ? 'var(--primary-dark)' : 'rgba(var(--primary-rgb), 0.4)'};
    color: ${({ $active }) => $active ? '#ffffff' : 'var(--primary)'};
    background: ${({ $active }) => $active 
      ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' 
      : 'rgba(var(--primary-rgb), 0.08)'};
    filter: ${({ $active }) => $active ? 'brightness(1.08)' : 'none'};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-light);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    padding: 0.35rem 0.2rem;
    font-size: 0.72rem;
  }

  @media (max-width: 360px) {
    font-size: 0.65rem;
  }
`;

const LayoutRow = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 0.75rem;
  }

  @media (max-width: 640px) {
    gap: 0.5rem;
  }
`;

const SidebarSection = styled.div`
  background: var(--surface);
  border-radius: 16px;
  padding: 1.25rem;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
`;

const SectionTitle = styled.h3`
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);

  @media (max-width: 640px) {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.35rem;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  @media (max-width: 640px) {
    gap: 0.25rem;
  }
`;

const RadioLabel = styled.label<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  background: ${({ $active }) => $active ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent'};
  color: ${({ $active }) => $active ? 'var(--primary)' : 'var(--text-secondary)'};
  font-weight: ${({ $active }) => $active ? '700' : '500'};
  font-size: 0.9rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;

  &:hover {
    background: rgba(var(--primary-rgb), 0.05);
    color: var(--primary);
  }

  @media (max-width: 640px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.82rem;
  }

  input {
    appearance: none;
    width: 16px;
    height: 16px;
    min-width: 16px;
    border: 2px solid ${({ $active }) => $active ? 'var(--primary)' : 'var(--border)'};
    border-radius: 50%;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 7px;
      height: 7px;
      background: var(--primary);
      border-radius: 50%;
      opacity: ${({ $active }) => $active ? 1 : 0};
      transition: opacity 0.2s;
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 640px) {
    gap: 0.75rem;
  }
`;

const ActionButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
`;

const ActionButton = styled.button`
  background: var(--primary);
  color: #fff;
  padding: 1.25rem 0.5rem;
  border-radius: 14px;
  border: none;
  font-weight: 800;
  font-size: 0.88rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-md);

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
    filter: brightness(1.1);
  }

  svg {
    width: 26px;
    height: 26px;
  }

  @media (max-width: 640px) {
    padding: 0.85rem 0.5rem;
    font-size: 0.82rem;
    gap: 0.35rem;
    border-radius: 12px;

    svg {
      width: 20px;
      height: 20px;
    }

    &:first-child {
      grid-column: span 2;
      flex-direction: row;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.95rem 0.5rem;
      font-size: 0.88rem;
      
      svg {
        width: 22px;
        height: 22px;
      }
    }
  }
`;

const ListToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--surface);
  padding: 1rem 1.75rem;
  border-radius: 20px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);

  @media (max-width: 640px) {
    flex-direction: column;
    padding: 1rem 0.75rem;
    border-radius: 16px;
    gap: 0.85rem;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 0.5rem 0.75rem;
    flex-wrap: wrap;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-weight: 700;
  color: var(--foreground);
  cursor: pointer;
  font-size: 0.95rem;

  @media (max-width: 640px) {
    font-size: 0.8rem;
    gap: 0.35rem;
  }

  input {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    appearance: none;
    border: 2px solid var(--border);
    background: var(--background);
    cursor: pointer;
    position: relative;
    flex-shrink: 0;
    transition: all 0.2s;
    
    &:checked {
      background: var(--primary);
      border-color: var(--primary);
      
      &::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 12px;
        font-weight: 900;
      }
    }

    &:hover {
      border-color: var(--primary);
    }

    @media (max-width: 640px) {
      width: 16px;
      height: 16px;
    }
  }
`;

const ToolbarIcons = styled.div`
  display: flex;
  gap: 0.5rem;
  color: var(--text-secondary);

  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
    gap: 1.5rem;
  }

  button {
    background: none;
    border: none;
    padding: 0.6rem;
    color: inherit;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.2s;
    
    &:hover {
      background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
      color: var(--primary);
    }

    @media (max-width: 640px) {
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover, &:active {
        background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
        color: var(--primary);
      }
    }
  }
`;

const ItemCard = styled.div<{ $isPlaying?: boolean }>`
  background: var(--surface);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  border: 1px solid ${({ $isPlaying }) => $isPlaying ? 'var(--primary)' : 'var(--border)'};
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: flex-start;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  ${({ $isPlaying }) => $isPlaying && `
    box-shadow: 0 0 15px rgba(var(--primary-rgb, 79, 70, 229), 0.3);
    transform: translateY(-2px);
  `}

  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0.75rem;
    border-radius: 14px;
  }

  @media (max-width: 640px) {
    padding: 0.875rem 0.75rem;
    gap: 0.6rem;
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 0.75rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const SpeakerButton = styled.button`
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
  border: none;
  color: var(--primary);
  cursor: pointer;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: var(--primary);
    color: #fff;
    transform: scale(1.05);
  }
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const KanjiText = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0;
  color: var(--foreground);

  @media (max-width: 640px) {
    font-size: 1.35rem;
  }
`;

const ReadingText = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0;
`;

const MeaningText = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--foreground);
  opacity: 0.9;

  @media (max-width: 640px) {
    font-size: 0.92rem;
  }
`;

const AddButton = styled.button`
  background: var(--primary);
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.15) rotate(90deg);
    box-shadow: 0 0 15px rgba(var(--primary-rgb, 0, 0, 0), 0.3);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    margin-top: 1rem;
    padding-bottom: 1rem;
    gap: 0.4rem;
  }
`;

const PageButton = styled.button<{ $active?: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid ${({ $active }) => $active ? 'var(--primary)' : 'var(--border)'};
  background: ${({ $active }) => $active ? 'var(--primary)' : 'var(--surface)'};
  color: ${({ $active }) => $active ? '#fff' : 'var(--foreground)'};
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--primary);
    color: ${({ $active }) => $active ? '#fff' : 'var(--primary)'};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  margin-top: 0;
  position: relative;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background: var(--surface);
  border-radius: 99px;
  padding: 0.35rem 0.5rem 0.35rem 1.25rem;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  min-width: 0;
  overflow: hidden;
  
  &:focus-within {
    border-color: var(--primary);
    box-shadow: 0 4px 25px rgba(var(--primary-rgb, 79, 70, 229), 0.15);
  }

  @media (max-width: 768px) {
    border-radius: 16px;
    padding: 0.3rem 0.3rem 0.3rem 0.75rem;
  }

  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    border-radius: 16px;
    padding: 0.5rem 0.75rem 0.35rem 0.75rem;
    gap: 0.35rem 0.5rem;
    
    /* Search Icon */
    > svg:first-of-type {
      grid-column: 1;
      grid-row: 1;
      align-self: center;
      width: 18px;
      height: 18px;
    }
    
    /* Search Input Text */
    > input {
      grid-column: 2;
      grid-row: 1;
      font-size: 0.95rem;
      padding: 0.3rem 0;
    }
    
    /* Clear Search Button (if present) */
    > button {
      grid-column: 2;
      grid-row: 1;
      justify-self: end;
      margin-right: 0.25rem;
      align-self: center;
      z-index: 5;
    }
    
    /* Dropdown wrapper for DictSelect */
    > div {
      grid-column: 3;
      grid-row: 1;
      align-self: center;
    }
    
    /* Auxiliary Utilities Toolbar (IconGroup) in row 2 */
    > div:first-of-type {
      grid-column: 1 / span 3;
      grid-row: 2;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0.25rem 0 0.25rem;
      margin: 0;
      border-top: 1px solid var(--border);
    }
  }
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: var(--foreground);
  font-size: 1.1rem;
  font-family: inherit;
  outline: none;
  padding: 0.5rem 0.5rem;
  
  &::placeholder {
    color: var(--text-secondary);
  }

  @media (max-width: 768px) {
    min-width: 80px;
  }
`;

const ShortcutHint = styled.kbd`
  background: transparent;
  border: none;
  padding: 0 0.8rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-secondary);
  opacity: 0.6;
  font-family: monospace;
  pointer-events: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0 0.35rem;
  margin-right: 0.25rem;
  flex-shrink: 0;

  @media (max-width: 640px) {
    gap: 0.1rem;
    padding: 0 0.15rem;
    margin-right: 0.1rem;
  }
`;

const IconButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => $active ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent'};
  color: ${({ $active }) => $active ? 'var(--primary)' : 'var(--text-secondary)'};
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(var(--primary-rgb), 0.08);
    color: var(--primary);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const DictSelect = styled.button`
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 99px;
  padding: 0.5rem 1rem;
  font-size: 0.88rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  flex-shrink: 0;
  max-width: 220px;
  
  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(var(--primary-rgb), 0.3);
  }

  span.dict-full {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span.dict-short {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.82rem;
    max-width: 160px;
  }

  @media (max-width: 640px) {
    padding: 0.4rem 0.65rem;
    max-width: none;
    height: 32px;
    border-radius: 99px;

    span.dict-full {
      display: none;
    }
    
    span.dict-short {
      display: inline-block;
      font-size: 0.78rem;
      font-weight: 800;
    }

    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

const ModesRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem 0;
  width: 100%;
  
  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.35rem;
    padding: 0.4rem 0;
  }

  @media (max-width: 640px) {
    gap: 0.2rem;
  }
`;

const ModeBtn = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.45rem 1.1rem;
  border-radius: 99px;
  border: 1px solid ${({ $active }) => $active ? 'var(--primary-dark)' : 'rgba(var(--primary-rgb), 0.15)'};
  background: ${({ $active }) => $active 
    ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' 
    : 'rgba(var(--primary-rgb), 0.03)'};
  color: ${({ $active }) => $active ? '#ffffff' : 'var(--text-secondary)'};
  font-size: 0.82rem;
  font-weight: ${({ $active }) => $active ? '700' : '600'};
  white-space: nowrap;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  box-shadow: ${({ $active }) => $active ? '0 3px 8px -1px rgba(var(--primary-rgb), 0.4)' : 'none'};
  outline: none;

  &:hover {
    border-color: ${({ $active }) => $active ? 'var(--primary-dark)' : 'rgba(var(--primary-rgb), 0.4)'};
    color: ${({ $active }) => $active ? '#ffffff' : 'var(--primary)'};
    background: ${({ $active }) => $active 
      ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' 
      : 'rgba(var(--primary-rgb), 0.08)'};
    filter: ${({ $active }) => $active ? 'brightness(1.08)' : 'none'};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-light);
    outline-offset: 2px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0.4rem 0.3rem;
    font-size: 0.75rem;
  }

  @media (max-width: 640px) {
    padding: 0.35rem 0.15rem;
    font-size: 0.7rem;
    
    svg {
      width: 10px;
      height: 10px;
      margin-left: 0 !important;
    }
  }

  @media (max-width: 360px) {
    font-size: 0.62rem;
  }
`;

const AutocompleteDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  max-height: 400px;
  overflow-y: auto;
  z-index: 100;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const AutocompleteItem = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
  }
`;

const AutocompleteText = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

const AutocompleteWord = styled.span`
  color: var(--primary);
  font-weight: 700;
  font-size: 1.05rem;
`;

const AutocompleteMeaning = styled.span`
  color: var(--text-secondary);
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;


const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(79, 70, 229, 0.1);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 4rem auto;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default function DictionaryPage() {
  const [query, setQuery] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeLevel, setActiveLevel] = useState<'all' | 'N1' | 'N2' | 'N3' | 'N4' | 'N5'>('N5');
  const [activeCategory, setActiveCategory] = useState<'vocabulary' | 'grammar' | 'kanji' | 'sentences' | 'jpjp' | 'ai' | 'kana'>('vocabulary');
  const [showConfig, setShowConfig] = useState({ vocabulary: true, ejaan: true, arti: true, rekomendasi: true });
  const [searchResults, setSearchResults] = useState<DictionaryResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Search extra controls
  const [showDrawModal, setShowDrawModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedDict, setSelectedDict] = useState<'JA-ID' | 'JA-EN' | 'JA-JA'>('JA-ID');
  const [showDictDropdown, setShowDictDropdown] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
  const [autoKana, setAutoKana] = useState(false);

  const itemsPerPage = 15; // Moved from hardcoded value to a constant
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const searchWrapperRef = React.useRef<HTMLDivElement>(null);

  const handleKeyboardType = (char: string) => {
    setQuery(prev => prev + char);
    inputRef.current?.focus();
  };

  const handleKeyboardBackspace = () => {
    setQuery(prev => prev.slice(0, -1));
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDictDropdown(false);
      }
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playAudio = (e: React.MouseEvent, text: string, itemId?: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (itemId) {
      setCurrentlyPlayingId(itemId); 
      playJapaneseAudio(text).finally(() => setCurrentlyPlayingId(null));
    } else {
      playJapaneseAudio(text);
    }
  };

  useEffect(() => {
    setShuffleSeed(0);
  }, [activeCategory, activeLevel, query]);

  const handleDownloadCSV = () => {
    if (!filteredData || filteredData.length === 0) return;

    // User confirmation
    const isConfirmed = window.confirm(`Are you sure you want to download these ${filteredData.length} items in CSV format?`);
    if (!isConfirmed) return;

    let csvContent = "Word,Reading,Meaning,Type,Level\n";
    filteredData.forEach(item => {
      const word = item.type === 'kanji' ? item.kanji : (item.word || item.title);
      const reading = item.type === 'kanji'
        ? `On: ${item.onyomi?.join(', ')} | Kun: ${item.kunyomi?.join(', ')}`
        : (item.reading || item.romaji || '');
      const meaning = item.meaning || '';
      const escapeCell = (str: string) => `"${(str || '').toString().replace(/"/g, '""')}"`;

      csvContent += `${escapeCell(word ?? '')},${escapeCell(reading)},${escapeCell(meaning)},${escapeCell(item.type)},${escapeCell(item.level || '')}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `jlpt_${activeCategory}_${activeLevel}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePlayAll = () => {
    if (!displayData || displayData.length === 0) return;

    if (isPlayingAll) {
      window.speechSynthesis.cancel();
      setIsPlayingAll(false);
      setCurrentlyPlayingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlayingAll(true);

    let utteranceEndCount = 0;
    const itemsWithContent = displayData.filter(i => (i.type === 'kanji' ? i.kanji : (i.word || i.title)));

    if (itemsWithContent.length === 0) {
      setIsPlayingAll(false);
      return;
    }

    const handleSpeechCancel = () => {
      setIsPlayingAll(false);
      setCurrentlyPlayingId(null);
    };

    itemsWithContent.forEach((item, idx) => {
      const text = item.type === 'kanji' ? item.kanji : (item.word || item.title);
      const itemId = `${item.source}-${item.type}-${item.level}-${item.id || idx}`;

      if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.8;

        utterance.onstart = () => {
          setCurrentlyPlayingId(itemId);
        };

        const finishUtterance = () => {
          utteranceEndCount++;
          if (utteranceEndCount === itemsWithContent.length) {
            setIsPlayingAll(false);
            setCurrentlyPlayingId(null);
          }
        };

        utterance.onend = finishUtterance;
        utterance.onerror = handleSpeechCancel;
        window.speechSynthesis.speak(utterance);
      }
    });
  };

  const handleShuffle = () => {
    setShuffleSeed(prev => prev + 1);
    setCurrentPage(1);
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        // results are found across all JLPT levels. 
        const results = await searchDictionary(query, activeCategory as 'vocabulary' | 'grammar' | 'kanji' | 'sentences' | 'jpjp' | 'ai' | 'kana', 'all');

        // Filter out ID/EN based on dict
        let filtered = results;
        if (selectedDict === 'JA-EN') {
          filtered = results.filter(r => r.source === 'jisho' || r.source === 'kanji-db');
        } else if (selectedDict === 'JA-ID') {
          filtered = results.filter(r => r.source === 'kamus' || r.source === 'local' || r.source === 'angka' || r.source === 'kanji-db' || r.source === 'tatoeba' || r.source === 'wiktionary');
        } else if (selectedDict === 'JA-JA') {
          filtered = results.filter(r => r.source === 'wiktionary' || r.source === 'local');
        }

        setSearchResults(filtered);
        setIsLoading(false);
        setCurrentPage(1);
      } else {
        setSearchResults(null);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, activeCategory, activeLevel, selectedDict]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (autoKana && isRomaji(val) && val.length > 0) {
      val = toKana(val, { IMEMode: true });
    }
    setQuery(val);
  };

  const browseData = React.useMemo((): DictionaryResult[] => {
    if (activeCategory === "kanji") { return allKanji; } else if (activeCategory === "grammar") {
      return allGrammar.map(g => ({
        ...g,
        type: 'grammar' as const,
        source: 'local' as const
      }));
    } else if (activeCategory === 'kana') {
      return KANA_LIST.map((char, index) => ({
        id: `kana-${index}`,
        type: 'vocabulary' as const,
        level: 'N5',
        word: char,
        reading: toRomaji(char),
        romaji: toRomaji(char),
        meaning: `${index < 46 ? 'Hiragana' : 'Katakana'} Letter: ${toRomaji(char).toUpperCase()}`,
        source: 'local' as const
      }));
    } else if (activeCategory === 'sentences' || activeCategory === 'jpjp') {
      return []; // These are dynamic searches or self-rendering components
    } else {
      return allVocabulary
        .filter(v => v.id.startsWith('lib-'))
        .map(v => ({
          ...v,
          type: 'vocabulary' as const,
          source: 'kamus' as const
        }));
    }
  }, [activeCategory]);

  const filteredData = React.useMemo(() => {
    const result = (searchResults || browseData).filter(item => {
      // If we are actively searching (searchResults is not null), we bypass the level filter 
      // to show all relevant matches across all JLPT levels. 
      // If we are just browsing (searchResults is null), we respect the level filter.
      if (searchResults) return true; 

      if (activeLevel !== 'all' && item.level !== activeLevel) return false;
      return true;
    });

    if (shuffleSeed > 0) {
      const shuffled = [...result];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    return result;
  }, [searchResults, browseData, activeLevel, shuffleSeed]);

  const displayData = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <PageContainer>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }]} current="JLPT Mastery" />
      <MobileFilters>
        <FilterGroup>
          <FilterLabel>Category</FilterLabel>
          <FilterChipRow>
            {[
              { id: 'kana', label: 'Kana' },
              { id: 'vocabulary', label: 'Words' },
              { id: 'kanji', label: 'Kanji' },
              { id: 'sentences', label: 'Sentences' },
              { id: 'grammar', label: 'Grammar' },
            ].map(item => (
              <FilterChip
                key={item.id}
                $active={activeCategory === item.id}
                onClick={() => setActiveCategory(item.id as typeof activeCategory)}
              >
                {item.label}
              </FilterChip>
            ))}
          </FilterChipRow>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>Level</FilterLabel>
          <FilterChipRow>
            {['N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => (
              <FilterChip
                key={lvl}
                $active={activeLevel === lvl}
                onClick={() => setActiveLevel(lvl as typeof activeLevel)}
              >
                {lvl}
              </FilterChip>
            ))}
          </FilterChipRow>
        </FilterGroup>
      </MobileFilters>
      <LayoutRow>
        <Sidebar>
          <SidebarSection>
            <SectionTitle>Select Category</SectionTitle>
            <RadioGroup>
              {[
                { id: 'kana', label: 'Kana' },
                { id: 'vocabulary', label: 'Vocabulary' },
                { id: 'kanji', label: 'Kanji' },
                { id: 'sentences', label: 'Sentences' },
                { id: 'grammar', label: 'Grammar' },
                { id: 'jpjp', label: 'Japanese - Japanese' },
              ].map(item => (
                <RadioLabel key={item.id} $active={activeCategory === item.id}>
                  <input
                    type="radio"
                    checked={activeCategory === item.id}
                    onChange={() => setActiveCategory(item.id as typeof activeCategory)}
                  />
                  {item.label}
                </RadioLabel>
              ))}
            </RadioGroup>
          </SidebarSection>

          <SidebarSection>
            <SectionTitle>Select Level</SectionTitle>
            <RadioGroup>
              {['N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => (
                <RadioLabel key={lvl} $active={activeLevel === lvl}>
                  <input
                    type="radio"
                    checked={activeLevel === lvl}
                    onChange={() => setActiveLevel(lvl as typeof activeLevel)}
                  />
                  {lvl}
                </RadioLabel>
              ))}
            </RadioGroup>
          </SidebarSection>
        </Sidebar>

        <MainContent>
          <ActionButtonsGrid>
            <ActionButton as={Link} href={`/jlpt/flashcards?q=${encodeURIComponent(query)}&category=${activeCategory}&level=${activeLevel}`} style={{ textDecoration: 'none' }}>
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="4" y="8" width="16" height="12" rx="2" />
                <path d="M8 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2" />
              </svg>
              Flashcards
            </ActionButton>
            <ActionButton as={Link} href={`/jlpt/quiz?q=${encodeURIComponent(query)}&category=${activeCategory}&level=${activeLevel}`} style={{ textDecoration: 'none' }}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" /></svg>
              Quiz
            </ActionButton>
            <ActionButton as={Link} href={`/jlpt/practice?q=${encodeURIComponent(query)}&category=${activeCategory}&level=${activeLevel}`} style={{ textDecoration: 'none' }}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" /></svg>
              Practice
            </ActionButton>
            <ActionButton as={Link} href={`/jlpt/mini-test?level=${activeLevel}`} style={{ textDecoration: 'none' }}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" /></svg>
              Mini Test
            </ActionButton>
            <ActionButton as={Link} href={`/jlpt/kanji-writer?q=${encodeURIComponent(query)}&category=${activeCategory}&level=${activeLevel}`} style={{ textDecoration: 'none' }}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              Kanji Writer
            </ActionButton>
          </ActionButtonsGrid>

          <SearchBarWrapper ref={searchWrapperRef}>
            <SearchInputContainer>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.4rem' }}>
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <Input
                ref={inputRef}
                placeholder={autoKana ? "nihon, sensei, kuruma" : "Japan, sensei, mountain, 日本"}
                value={query}
                onChange={handleInputChange}
                onFocus={() => setIsInputFocused(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    inputRef.current?.blur();
                    setIsInputFocused(false);
                  }
                }}
              />
              {query.length === 0 && <ShortcutHint>Ctrl K</ShortcutHint>}
              {query.length > 0 && (
                <IconButton onClick={() => setQuery('')} aria-label="Clear search" style={{ marginRight: '0.5rem', width: '28px', height: '28px', background: 'transparent', border: 'none' }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </IconButton>
              )}

              <IconGroup>
                <IconButton title="Draw" onClick={() => setShowDrawModal(true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
                </IconButton>
                <IconButton $active={showKeyboard} onClick={() => setShowKeyboard(!showKeyboard)} title="Kana Keyboard">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                    <path d="M6 8h.01" /><path d="M10 8h.01" /><path d="M14 8h.01" /><path d="M18 8h.01" />
                    <path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" />
                    <path d="M7 16h10" />
                  </svg>
                </IconButton>
                <IconButton title="Voice" onClick={() => setShowVoiceModal(true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
                </IconButton>
                <IconButton title="OCR Image" onClick={() => setShowImageModal(true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                </IconButton>
                <IconButton $active={autoKana} onClick={() => setAutoKana(!autoKana)} title={autoKana ? "Auto-Kana: On" : "Auto-Kana: Off"}>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', fontWeight: 800, fontFamily: 'monospace', position: 'relative', width: '100%', height: '100%', justifyContent: 'center' }}>
                    <span style={{ position: 'absolute', left: '4px', top: '6px', color: autoKana ? 'var(--primary)' : 'inherit', opacity: autoKana ? 1 : 0.5 }}>A</span>
                    <span style={{ position: 'absolute', right: '4px', bottom: '6px', color: autoKana ? 'var(--primary)' : 'inherit' }}>あ</span>
                  </div>
                </IconButton>
              </IconGroup>

              <div style={{ position: 'relative' }} ref={dropdownRef}>
                <DictSelect onClick={() => setShowDictDropdown(!showDictDropdown)}>
                  <span className="dict-full">{selectedDict === 'JA-ID' ? 'Japanese - Indonesian' : selectedDict === 'JA-EN' ? 'Japanese - English' : 'Japanese - Japanese'}</span>
                  <span className="dict-short">{selectedDict}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </DictSelect>
                {showDictDropdown && (
                  <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', zIndex: 50, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', minWidth: '180px' }}>
                    <button onClick={() => { setSelectedDict('JA-ID'); setShowDictDropdown(false); if (activeCategory === 'jpjp') setActiveCategory('vocabulary'); }} style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap', border: 'none', background: 'transparent', color: selectedDict === 'JA-ID' ? 'var(--primary)' : 'var(--foreground)', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid var(--border)', fontWeight: selectedDict === 'JA-ID' ? 'bold' : 'normal' }}>Japanese - Indonesian</button>
                    <button onClick={() => { setSelectedDict('JA-EN'); setShowDictDropdown(false); if (activeCategory === 'jpjp') setActiveCategory('vocabulary'); }} style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap', border: 'none', background: 'transparent', color: selectedDict === 'JA-EN' ? 'var(--primary)' : 'var(--foreground)', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid var(--border)', fontWeight: selectedDict === 'JA-EN' ? 'bold' : 'normal' }}>Japanese - English</button>
                    <button onClick={() => { setSelectedDict('JA-JA'); setShowDictDropdown(false); setActiveCategory('jpjp'); }} style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap', border: 'none', background: 'transparent', color: selectedDict === 'JA-JA' ? 'var(--primary)' : 'var(--foreground)', cursor: 'pointer', textAlign: 'left', fontWeight: selectedDict === 'JA-JA' ? 'bold' : 'normal' }}>Japanese - Japanese</button>
                  </div>
                )}
              </div>
            </SearchInputContainer>

            <ModesRow>
              {[
                { id: 'ai', label: 'AI Mode' },
                { id: 'kana', label: 'Kana' },
                { id: 'vocabulary', label: 'Words' },
                { id: 'kanji', label: 'Kanji' },
                { id: 'sentences', label: 'Sentences' },
                { id: 'grammar', label: 'Grammar' },
              ].map(mode => (
                <ModeBtn
                  key={mode.id}
                  $active={activeCategory === mode.id}
                  onClick={() => setActiveCategory(mode.id as typeof activeCategory)}
                >
                  {mode.id === 'ai' ? (
                    <>
                      {mode.label}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '2px' }}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
                    </>
                  ) : mode.label}
                </ModeBtn>
              ))}
            </ModesRow>

            {showConfig.rekomendasi && isInputFocused && query.length > 0 && searchResults && searchResults.length > 0 && (
              <AutocompleteDropdown>
                {searchResults.slice(0, 8).map(res => (
                  <AutocompleteItem
                    key={`auto-${res.source}-${res.type}-${res.id}`}
                    onMouseDown={(e) => {
                      // Prevent blurring the input so that an onClick can correctly fire
                      e.preventDefault();
                    }}
                    onClick={() => {
                      setQuery(res.word || res.title || res.kanji || '');
                      setIsInputFocused(false);
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    <AutocompleteText>
                      <AutocompleteWord>
                        {res.word || res.title || res.kanji}
                        {res.reading && (
                          <span style={{ fontSize: '0.8rem', fontWeight: 400, marginLeft: '0.5rem', opacity: 0.7 }}>
                            ({res.reading})
                          </span>
                        )}
                      </AutocompleteWord>
                      <AutocompleteMeaning>{res.meaning}</AutocompleteMeaning>
                    </AutocompleteText>
                  </AutocompleteItem>
                ))}
              </AutocompleteDropdown>
            )}

            {showKeyboard && (
              <div style={{ position: 'absolute', zIndex: 100, top: 'calc(100% + 0.5rem)', left: 0, width: '100%' }}>
                <KanaKeyboard
                  onType={handleKeyboardType}
                  onBackspace={handleKeyboardBackspace}
                  onClose={() => setShowKeyboard(false)}
                />
              </div>
            )}
          </SearchBarWrapper>


          <ListToolbar>
            <CheckboxGroup>
              {[
                { id: 'vocabulary', label: 'Words' },
                { id: 'ejaan', label: 'Reading' },
                { id: 'arti', label: 'Meaning' },
                { id: 'rekomendasi', label: 'Suggestions' }
              ].map(item => (
                <CheckboxLabel key={item.id}>
                  <input
                    type="checkbox"
                    checked={showConfig[item.id as keyof typeof showConfig]}
                    onChange={() => setShowConfig(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof showConfig] }))}
                  />
                  {item.label}
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
            <ToolbarIcons>
              <button title="Download CSV" onClick={handleDownloadCSV}><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></button>
              <button title={isPlayingAll ? "Stop Playback" : "Play All on Page"} onClick={handlePlayAll} style={{ color: isPlayingAll ? 'var(--primary)' : 'inherit' }}>
                {isPlayingAll ? (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                ) : (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                )}
              </button>
              <button title="Shuffle List" onClick={handleShuffle}><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4l5 5m11 11l-5-5m5-11l-16 16M15 4h5v5m0 6v5h-5" /></svg></button>
            </ToolbarIcons>
          </ListToolbar>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <ItemsGrid>
                {displayData.map((item, idx) => {
                  const itemId = `${item.source}-${item.type}-${item.level}-${item.id || idx}`;
                  return (
                    <ItemCard key={itemId} $isPlaying={currentlyPlayingId === itemId}>
                      <SpeakerButton onClick={(e) => playAudio(e, (item.type === 'kanji' ? item.kanji : (item.word || item.title)) ?? '', itemId)}>
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                      </SpeakerButton>
                      <ItemContent>
                        {showConfig.vocabulary && (
                          <KanjiText>
                            {item.type === 'kanji' ? item.kanji : (item.word || item.title)}
                          </KanjiText>
                        )}
                        {showConfig.ejaan && (
                          <>
                            {item.type === 'kanji' ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.2rem' }}>
                                {item.onyomi && item.onyomi.length > 0 && <ReadingText><strong>On:</strong> {item.onyomi.join(', ')}</ReadingText>}
                                {item.kunyomi && item.kunyomi.length > 0 && <ReadingText><strong>Kun:</strong> {item.kunyomi.join(', ')}</ReadingText>}
                              </div>
                            ) : (
                              (item.reading || item.romaji) && <ReadingText>{item.reading || item.romaji}</ReadingText>
                            )}
                          </>
                        )}
                        {showConfig.arti && (
                          <>
                            <MeaningText>{item.meaning}</MeaningText>

                            {item.type === 'kanji' && item.stroke_count && (
                              <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                {item.stroke_count} strokes • {item.level}
                              </div>
                            )}

                            {item.type === 'jpjp' && item.partOfSpeech && (
                              <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 'bold', marginTop: '0.25rem' }}>
                                {item.partOfSpeech}
                              </div>
                            )}

                            {item.type === 'grammar' && (
                              <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
                                {item.structure && (
                                  <div style={{ padding: '0.4rem 0.6rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', borderLeft: '3px solid var(--accent-color)' }}>
                                    <strong>Structure:</strong> {item.structure}
                                  </div>
                                )}
                                {item.explanation && (
                                  <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                                    {item.explanation}
                                  </div>
                                )}
                              </div>
                            )}

                            {(item.type === 'grammar' || item.type === 'jpjp') && item.examples && item.examples.length > 0 && (
                              <div style={{ marginTop: '0.75rem' }}>
                                <strong>Examples:</strong>
                                <ul style={{ listStyleType: 'none', padding: 0, margin: '0.4rem 0 0 0', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                  {item.examples.map((ex, i: number) => (
                                    <li key={i} style={{ borderBottom: i !== (item.examples?.length ?? 0) - 1 ? '1px dashed rgba(255,255,255,0.1)' : 'none', paddingBottom: i !== (item.examples?.length ?? 0) - 1 ? '0.6rem' : '0' }}>
                                      <div style={{ color: 'var(--text-primary)' }}>{ex.japanese}</div>
                                      {ex.romaji && <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{ex.romaji}</div>}
                                      {ex.english && <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic', marginTop: '0.2rem' }}>&quot;{ex.english}&quot;</div>}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </>
                        )}
                      </ItemContent>
                      <AddButton>+</AddButton>
                    </ItemCard>
                  );
                })}
              </ItemsGrid>

              {totalPages > 1 && (
                <Pagination>
                  <PageButton onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}>&lt;</PageButton>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => (
                    <PageButton
                      key={i + 1}
                      $active={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PageButton>
                  ))}
                  {totalPages > 5 && <span style={{ color: 'var(--text-secondary)' }}>...</span>}
                  {totalPages > 5 && (
                    <PageButton
                      $active={currentPage === totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </PageButton>
                  )}
                  <PageButton onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}>&gt;</PageButton>
                </Pagination>
              )}

              {displayData.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                  <p style={{ fontSize: '1.25rem' }}>No results found.</p>
                </div>
              )}
            </>
          )}
        </MainContent>
      </LayoutRow>

      <HandwritingModal
        isOpen={showDrawModal}
        onClose={() => setShowDrawModal(false)}
        onSelect={(char) => { setQuery(prev => prev + char); setShowDrawModal(false); inputRef.current?.focus(); }}
      />

      <VoiceSearchModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        onResult={(text) => { setQuery(text); setShowVoiceModal(false); inputRef.current?.focus(); }}
      />

      <ImageSearchModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onResult={(text) => { setQuery(text); setShowImageModal(false); inputRef.current?.focus(); }}
      />

    </PageContainer>
  );
}
