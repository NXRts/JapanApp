'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toKana, isRomaji } from 'wanakana';
import { searchDictionary, DictionaryResult, allVocabulary, allKanji, allGrammar } from '@/lib/dictionary';
import Link from 'next/link';
import KanaKeyboard from '@/components/KanaKeyboard';

const PageContainer = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;
  padding: 2rem;
  min-height: 100vh;
  // background-color: var(--background);
  background-image: radial-gradient(var(--dot-color) 1.2px, transparent 1.2px);
  background-size: 32px 32px;
  color: var(--foreground);

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1.5rem;
  }
`;

const Sidebar = styled.aside`
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const SidebarSection = styled.div`
  background: var(--surface);
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
`;

const SectionTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RadioLabel = styled.label<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  background: ${({ $active }) => $active ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent'};
  color: ${({ $active }) => $active ? 'var(--primary)' : 'var(--text-secondary)'};
  font-weight: ${({ $active }) => $active ? '700' : '500'};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(var(--primary-rgb), 0.05);
    color: var(--primary);
  }

  input {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid ${({ $active }) => $active ? 'var(--primary)' : 'var(--border)'};
    border-radius: 50%;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background: var(--primary);
      border-radius: 50%;
      opacity: ${({ $active }) => $active ? 1 : 0};
      transition: opacity 0.2s;
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ActionButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ActionButton = styled.button`
  background: var(--primary);
  color: #fff;
  padding: 1.25rem;
  border-radius: 20px;
  border: none;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-md);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    filter: brightness(1.1);
  }

  svg {
    width: 28px;
    height: 28px;
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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.25rem;
    align-items: flex-start;
    padding: 1.25rem;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  color: var(--foreground);
  cursor: pointer;
  font-size: 0.95rem;

  input {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    appearance: none;
    border: 2px solid var(--border);
    background: var(--background);
    cursor: pointer;
    position: relative;
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
  }
`;

const ToolbarIcons = styled.div`
  display: flex;
  gap: 0.5rem;
  color: var(--text-secondary);

  button {
    background: none;
    border: none;
    padding: 0.6rem;
    color: inherit;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.2s;
    
    &:hover {
      background: var(--background);
      color: var(--primary);
    }
  }
`;

const ItemCard = styled.div`
  background: var(--surface);
  border-radius: 20px;
  padding: 1.75rem;
  border: 1px solid var(--border);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  align-items: flex-start;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: var(--primary);
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 640px) {
    grid-template-columns: auto 1fr auto;
    padding: 1.25rem 1rem;
    gap: 1rem;
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0;
  color: var(--foreground);
`;

const ReadingText = styled.p`
  color: var(--text-secondary);
  font-size: 1.05rem;
  font-weight: 500;
  margin: 0;
`;

const MeaningText = styled.p`
  margin: 0.75rem 0 0 0;
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--foreground);
  opacity: 0.9;
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
  gap: 0.75rem;
  margin-top: 3.5rem;
  padding-bottom: 4rem;
  flex-wrap: wrap;
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
  background: var(--surface);
  border-radius: 12px;
  padding: 0.75rem 0.75rem 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
  margin-top: 0.5rem;
  position: relative;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background: var(--background);
  border-radius: 10px;
  padding: 0.4rem 0.4rem 0.4rem 1rem;
  border: 1px solid transparent;
  transition: all 0.2s;
  
  &:focus-within {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(var(--primary-rgb, 79, 70, 229), 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.3rem 0.3rem 0.3rem 0.6rem;
  }
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: var(--foreground);
  font-size: 1.05rem;
  font-family: inherit;
  outline: none;
  padding: 0.2rem 0.4rem;
  
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
  gap: 0.4rem;
  padding: 0 0.8rem;
  border-right: 1px solid var(--border);
  margin-right: 0.6rem;

  @media (max-width: 768px) {
    gap: 0.25rem;
    padding: 0 0.4rem;
    margin-right: 0.4rem;
  }
`;

const IconButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => $active ? 'var(--primary)' : 'rgba(255, 255, 255, 0.03)'};
  color: ${({ $active }) => $active ? '#fff' : 'var(--text-secondary)'};
  border: 1px solid ${({ $active }) => $active ? 'var(--primary)' : 'var(--border)'};
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ $active }) => $active ? 'var(--primary)' : 'rgba(255, 255, 255, 0.08)'};
    color: var(--foreground);
    border-color: ${({ $active }) => $active ? 'var(--primary)' : 'var(--text-secondary)'};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const DictSelect = styled.button`
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.15);
  color: var(--primary);
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
  height: stretch;
  
  &:hover {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.25);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
    
    span {
      display: none;
    }
  }
`;

const ModesRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.25rem;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ModeBtn = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => $active ? 'rgba(var(--primary-rgb, 79, 70, 229), 0.15)' : 'transparent'};
  color: ${({ $active }) => $active ? 'var(--primary)' : 'var(--text-secondary)'};
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s;
  
  &:hover {
    color: var(--foreground);
    background: ${({ $active }) => $active ? 'rgba(var(--primary-rgb, 79, 70, 229), 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  }
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
  const [activeCategory, setActiveCategory] = useState<'kata' | 'tata-bahasa' | 'kanji'>('kata');
  const [showConfig, setShowConfig] = useState({ kata: true, ejaan: true, arti: true });
  const [searchResults, setSearchResults] = useState<DictionaryResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15; // Moved from hardcoded value to a constant
  const inputRef = React.useRef<HTMLInputElement>(null);

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
    setIsMounted(true);
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playAudio = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        const results = await searchDictionary(query, activeCategory, activeLevel);
        setSearchResults(results.filter(r => r.source === 'kamus' || r.source === 'jisho' || r.source === 'kanji-db' || r.source === 'local'));
        setIsLoading(false);
        setCurrentPage(1);
      } else {
        setSearchResults(null);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, activeCategory, activeLevel]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (isRomaji(val) && val.length > 0) {
      val = toKana(val, { IMEMode: true });
    }
    setQuery(val);
  };

  const browseData = React.useMemo(() => {
    if (activeCategory === 'kanji') {
      return allKanji;
    } else if (activeCategory === 'tata-bahasa') {
      return allGrammar.map(g => ({
        ...g,
        type: 'grammar' as const,
        source: 'local' as const
      }));
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
    return (searchResults || browseData).filter(item => {
      if (activeLevel !== 'all' && item.level !== activeLevel) return false;
      return true;
    });
  }, [searchResults, browseData, activeLevel]);

  const displayData = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <PageContainer>
      <Sidebar>
        <SidebarSection>
          <SectionTitle>Pilih jenis kata</SectionTitle>
          <RadioGroup>
            {[
              { id: 'kata', label: 'Kata' },
              { id: 'kanji', label: 'Kanji' },
              { id: 'tata-bahasa', label: 'Tata bahasa' },
            ].map(item => (
              <RadioLabel key={item.id} $active={activeCategory === item.id}>
                <input
                  type="radio"
                  checked={activeCategory === item.id}
                  onChange={() => setActiveCategory(item.id as any)}
                />
                {item.label}
              </RadioLabel>
            ))}
          </RadioGroup>
        </SidebarSection>

        <SidebarSection>
          <SectionTitle>Pilih tingkat</SectionTitle>
          <RadioGroup>
            {['N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => (
              <RadioLabel key={lvl} $active={activeLevel === lvl}>
                <input
                  type="radio"
                  checked={activeLevel === lvl}
                  onChange={() => setActiveLevel(lvl as any)}
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
          <ActionButton>
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" /></svg>
            Kuis
          </ActionButton>
          <ActionButton>
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" /></svg>
            Berlatih
          </ActionButton>
          <ActionButton>
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" /></svg>
            Tes Mini
          </ActionButton>
        </ActionButtonsGrid>

        <SearchBarWrapper>
          <SearchInputContainer>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.4rem' }}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <Input
              ref={inputRef}
              placeholder="日本, nihon, Jepang"
              value={query}
              onChange={handleInputChange}
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
              <IconButton title="Draw (Coming soon)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
              </IconButton>
              <IconButton $active={showKeyboard} onClick={() => setShowKeyboard(!showKeyboard)} title="Kana Keyboard">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
                   <path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/>
                   <path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/>
                   <path d="M7 16h10"/>
                 </svg>
              </IconButton>
              <IconButton title="Voice (Coming soon)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
              </IconButton>
              <IconButton title="OCR Image (Coming soon)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              </IconButton>
            </IconGroup>

            <DictSelect>
              <span>Jepang - Ind...</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </DictSelect>
          </SearchInputContainer>

          <ModesRow>
            <ModeBtn>
              Mode AI 
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '2px' }}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </ModeBtn>
            <ModeBtn $active>Kata</ModeBtn>
            <ModeBtn>Kanji</ModeBtn>
            <ModeBtn>Kalimat</ModeBtn>
            <ModeBtn>Tata bahasa</ModeBtn>
            <ModeBtn>Jepang - Jepang</ModeBtn>
          </ModesRow>

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
              { id: 'kata', label: 'Kata' },
              { id: 'ejaan', label: 'Ejaan' },
              { id: 'arti', label: 'Arti' }
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
            <button title="Download"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></button>
            <button title="Play"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></button>
            <button title="Shuffle"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4l5 5m11 11l-5-5m5-11l-16 16M15 4h5v5m0 6v5h-5" /></svg></button>
          </ToolbarIcons>
        </ListToolbar>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <ItemsGrid>
              {displayData.map((item: any, idx) => (
                <ItemCard key={`${item.source}-${item.type}-${item.level}-${item.id || idx}`}>
                  <SpeakerButton onClick={(e) => playAudio(e, item.type === 'kanji' ? item.kanji : (item.word || item.title))}>
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                  </SpeakerButton>
                  <ItemContent>
                    {showConfig.kata && (
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
                          item.reading && <ReadingText>{item.reading}</ReadingText>
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

                        {item.type === 'grammar' && (
                          <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
                            {item.structure && (
                              <div style={{ padding: '0.4rem 0.6rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', borderLeft: '3px solid var(--accent-color)' }}>
                                <strong>Struktur:</strong> {item.structure}
                              </div>
                            )}
                            {item.explanation && (
                              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                                {item.explanation}
                              </div>
                            )}
                            {item.examples && item.examples.length > 0 && (
                              <div style={{ marginTop: '0.5rem' }}>
                                <strong>Contoh:</strong>
                                <ul style={{ listStyleType: 'none', padding: 0, margin: '0.4rem 0 0 0', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                  {item.examples.map((ex: any, i: number) => (
                                    <li key={i} style={{ borderBottom: i !== item.examples.length - 1 ? '1px dashed rgba(255,255,255,0.1)' : 'none', paddingBottom: i !== item.examples.length - 1 ? '0.6rem' : '0' }}>
                                      <div style={{ color: 'var(--text-primary)' }}>{ex.japanese}</div>
                                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{ex.romaji}</div>
                                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic', marginTop: '0.2rem' }}>&quot;{ex.english}&quot;</div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </ItemContent>
                  <AddButton>+</AddButton>
                </ItemCard>
              ))}
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
                {totalPages > 5 && <span>...</span>}
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
                <p style={{ fontSize: '1.25rem' }}>Tidak ada hasil ditemukan.</p>
              </div>
            )}
          </>
        )}
      </MainContent>
    </PageContainer>
  );
}
