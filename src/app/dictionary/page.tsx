'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toKana, isRomaji } from 'wanakana';
import { searchDictionary, DictionaryResult, allVocabulary, allKanji, allGrammar } from '@/lib/dictionary';
import Link from 'next/link';

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

  const itemsPerPage = 15; // Moved from hardcoded value to a constant

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        const results = await searchDictionary(query, activeCategory);
        setSearchResults(results.filter(r => r.source === 'kamus' || r.source === 'jisho' || r.source === 'kanji-db' || r.source === 'local'));
        setIsLoading(false);
        setCurrentPage(1);
      } else {
        setSearchResults(null);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, activeCategory]);

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
          <ActionButton as={Link} href={`/dictionary/flashcards?q=${encodeURIComponent(query)}&category=${activeCategory}&level=${activeLevel}`} style={{ textDecoration: 'none' }}>
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6z" /></svg>
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
            <button title="Download"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></button>
            <button title="Play"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></button>
            <button title="Shuffle"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4l5 5m11 11l-5-5m5-11l-16 16M15 4h5v5m0 6v5h-5" /></svg></button>
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
