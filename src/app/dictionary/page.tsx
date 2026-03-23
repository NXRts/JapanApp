'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toKana, isRomaji } from 'wanakana';
import { searchDictionary, DictionaryResult, allVocabulary } from '@/lib/dictionary';
import Link from 'next/link';

const PageContainer = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;
  padding: 2rem;
  min-height: 100vh;
  backgroundColor: #0f121d;
  backgroundImage: radial-gradient(rgba(255, 255, 255, 0.1) 1.5px, transparent 1.5px);
  backgroundSize: 40px 40px;
  color: #fff;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
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
  background: #1a1e2e;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #94a3b8;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
  background: ${({ $active }) => $active ? 'rgba(225, 29, 72, 0.15)' : 'transparent'};
  color: ${({ $active }) => $active ? '#f43f5e' : '#94a3b8'};
  font-weight: ${({ $active }) => $active ? '700' : '500'};
  transition: all 0.2s;

  &:hover {
    background: rgba(225, 29, 72, 0.08);
  }

  input {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid ${({ $active }) => $active ? '#f43f5e' : 'rgba(255, 255, 255, 0.2)'};
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
      background: #f43f5e;
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
  background: #3b82f6;
  color: white;
  padding: 1rem;
  border-radius: 16px;
  border: none;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ListToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1a1e2e;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    appearance: none;
    border: 2px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    position: relative;
    
    &:checked {
      background: #f43f5e;
      border-color: #f43f5e;
      
      &::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 10px;
      }
    }
  }
`;

const ToolbarIcons = styled.div`
  display: flex;
  gap: 0.75rem;
  color: #94a3b8;

  button {
    background: none;
    border: none;
    padding: 0.5rem;
    color: inherit;
    cursor: pointer;
    border-radius: 8px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #f43f5e;
    }
  }
`;

const ItemCard = styled.div`
  background: #1a1e2e;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  align-items: flex-start;
  transition: all 0.2s;

  &:hover {
    border-color: #f43f5e;
    background: #23283b;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr auto;
    gap: 1rem;
  }
`;

const SpeakerButton = styled.button`
  background: none;
  border: none;
  color: #f43f5e;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  
  &:hover {
    background: rgba(244, 63, 94, 0.1);
  }
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const KanjiText = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #fff;
`;

const ReadingText = styled.p`
  color: #94a3b8;
  font-size: 1rem;
  margin: 0;
`;

const MeaningText = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #cbd5e1;
`;

const AddButton = styled.button`
  background: #f43f5e;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(244, 63, 94, 0.4);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 3rem;
  padding-bottom: 3rem;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: ${({ $active }) => $active ? '#e11d48' : '#fff'};
  color: ${({ $active }) => $active ? '#fff' : '#0f172a'};
  font-weight: 800;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const SearchBarWrapper = styled.div`
  margin-bottom: 2rem;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--surface);
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  
  &:focus-within {
    border-color: var(--primary);
  }
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  font-size: 1.1rem;
  color: var(--foreground);
  outline: none;

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
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
  const [activeLevel, setActiveLevel] = useState<'all' | 'N1' | 'N2' | 'N3' | 'N4' | 'N5'>('N5');
  const [activeCategory, setActiveCategory] = useState<'kata' | 'tata-bahasa' | 'kanji'>('kata');
  const [showConfig, setShowConfig] = useState({ kata: true, ejaan: true, arti: true });
  const [searchResults, setSearchResults] = useState<DictionaryResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        const results = await searchDictionary(query);
        setSearchResults(results.filter(r => r.source === 'kamus' || r.source === 'jisho'));
        setIsLoading(false);
        setCurrentPage(1);
      } else {
        setSearchResults(null);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (isRomaji(val) && val.length > 0) {
      val = toKana(val, { IMEMode: true });
    }
    setQuery(val);
  };

  const browseData = React.useMemo(() => {
    return allVocabulary
      .filter(v => v.id.startsWith('lib-'))
      .map(v => ({ 
        ...v, 
        type: 'vocabulary' as const, 
        source: 'kamus' as const
      }));
  }, []);

  const filteredData = React.useMemo(() => {
    return (searchResults || browseData).filter(item => {
      if (activeLevel !== 'all' && item.level !== activeLevel) return false;
      return true;
    });
  }, [searchResults, browseData, activeLevel]);

  const displayData = React.useMemo(() => {
    const itemsPerPage = 12;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / 12);

  return (
    <PageContainer>
      <Sidebar>
        <SidebarSection>
          <SectionTitle>Pilih jenis kata</SectionTitle>
          <RadioGroup>
            {[
              { id: 'kata', label: 'Kata' },
              { id: 'tata-bahasa', label: 'Tata bahasa' },
              { id: 'kanji', label: 'Kanji' }
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
          <ActionButton>
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6z"/></svg>
            Kartu Flash
          </ActionButton>
          <ActionButton>
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
            Kuis
          </ActionButton>
          <ActionButton>
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
            Berlatih
          </ActionButton>
          <ActionButton>
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>
            Tes Mini
          </ActionButton>
        </ActionButtonsGrid>

        <SearchBarWrapper style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
          <SearchInputContainer>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <Input 
              placeholder="Cari kata, kana, romaji (misal: taberu)..." 
              value={query}
              onChange={handleInputChange}
            />
          </SearchInputContainer>
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
            <button title="Download"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg></button>
            <button title="Play"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>
            <button title="Shuffle"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4l5 5m11 11l-5-5m5-11l-16 16M15 4h5v5m0 6v5h-5"/></svg></button>
          </ToolbarIcons>
        </ListToolbar>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '1rem' }}>
              {displayData.map((item: any, idx) => (
                <ItemCard key={`${item.source}-${item.type}-${item.level}-${item.id || idx}`}>
                  <SpeakerButton>
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                  </SpeakerButton>
                  <ItemContent>
                    {showConfig.kata && <KanjiText>{item.word || item.title}</KanjiText>}
                    {showConfig.ejaan && item.reading && <ReadingText>{item.reading}</ReadingText>}
                    {showConfig.arti && <MeaningText>{item.meaning}</MeaningText>}
                  </ItemContent>
                  <AddButton>+</AddButton>
                </ItemCard>
              ))}
            </div>

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
