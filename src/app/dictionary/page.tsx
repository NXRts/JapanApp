'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toKana, isRomaji } from 'wanakana';
import { searchDictionary, DictionaryResult, allVocabulary, allGrammar } from '@/lib/dictionary';
import Link from 'next/link';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 90vh;
`;

const Header = styled.div`
  margin-bottom: 4rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--foreground) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SearchBarWrapper = styled.div`
  margin-bottom: 3rem;
  padding: 1rem 0;
`;

const SearchInputContainer = styled.div`
  background: var(--surface);
  border: none;
  border-radius: 24px;
  padding: 0.75rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:focus-within {
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
    transform: translateY(-2px);
  }
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: var(--foreground);
  font-size: 1.5rem;
  font-weight: 500;
  
  &:focus {
    outline: none;
  }

  &::placeholder {
    opacity: 0.5;
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FilterChip = styled.button<{ $active: boolean }>`
  padding: 0.6rem 1.5rem;
  border-radius: 99px;
  border: 1px solid ${({ $active }) => ($active ? 'var(--primary)' : 'var(--border)')};
  background: ${({ $active }) => ($active ? 'rgba(79, 70, 229, 0.1)' : 'var(--surface)')};
  color: ${({ $active }) => ($active ? 'var(--primary)' : 'var(--text-secondary)')};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  &:hover {
    border-color: var(--primary);
    transform: translateY(-4px);
    box-shadow: var(--shadow-sm);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const MainText = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--foreground);
`;

const ReadingText = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
`;

const Badge = styled.span<{ $type?: string }>`
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  background: ${({ $type }) => 
    $type === 'grammar' ? 'rgba(16, 185, 129, 0.1)' : 
    $type === 'jisho' ? 'rgba(234, 179, 8, 0.1)' : 
    $type === 'kamus' ? 'rgba(59, 130, 246, 0.1)' :
    'rgba(255, 255, 255, 0.05)'};
  color: ${({ $type }) => 
    $type === 'grammar' ? '#10b981' : 
    $type === 'jisho' ? '#eab308' : 
    $type === 'kamus' ? '#3b82f6' :
    'var(--text-secondary)'};
`;

const MeaningText = styled.p`
  margin: 0;
  line-height: 1.5;
  color: var(--text-secondary);
  flex: 1;
`;

const StatsInfo = styled.div`
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--text-secondary);
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
  const [activeFilter, setActiveFilter] = useState<'all' | 'vocabulary' | 'grammar' | 'kamus'>('all');
  const [activeLevel, setActiveLevel] = useState<'all' | 'N1' | 'N2' | 'N3' | 'N4' | 'N5'>('all');
  const [searchResults, setSearchResults] = useState<DictionaryResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        const results = await searchDictionary(query);
        setSearchResults(results);
        setIsLoading(false);
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

  // Pre-filtered internal data for "browse" view
  const browseData = (() => {
    const data = [
      ...allVocabulary.map(v => ({ 
        ...v, 
        type: 'vocabulary' as const, 
        source: (v.id.startsWith('lib-') ? 'kamus' : 'local') as 'local' | 'kamus'
      })),
      ...allGrammar.map(g => ({ ...g, type: 'grammar' as const, source: 'local' as const }))
    ].filter(item => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'kamus') {
        const isKamus = item.source === 'kamus';
        const matchesLevel = activeLevel === 'all' || item.level === activeLevel;
        return isKamus && matchesLevel;
      }
      return (item as any).type === activeFilter;
    });

    // If viewing Kamus with no specific level, shuffle to show a mix
    if (activeFilter === 'kamus' && activeLevel === 'all') {
      return [...data].sort(() => Math.random() - 0.5).slice(0, 100);
    }

    return data.slice(0, 100);
  })();

  const displayData = searchResults || browseData;

  return (
    <Container>
      <Header>
        <Title>Library Kamus</Title>
        <Subtitle>
          Jelajahi ribuan kosakata dan tata bahasa Jepang. Gunakan pencarian untuk mencari kata kapan saja.
        </Subtitle>
      </Header>

      <SearchBarWrapper>
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
          {query && (
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem' }}>
              ✕
            </button>
          )}
        </SearchInputContainer>
      </SearchBarWrapper>

      <FilterSection>
        <FilterChip 
          $active={activeFilter === 'all'} 
          onClick={() => setActiveFilter('all')}
        >
          Semua
        </FilterChip>
        <FilterChip 
          $active={activeFilter === 'vocabulary'} 
          onClick={() => setActiveFilter('vocabulary')}
        >
          Kosakata
        </FilterChip>
        <FilterChip 
          $active={activeFilter === 'grammar'} 
          onClick={() => setActiveFilter('grammar')}
        >
          Tata Bahasa
        </FilterChip>
        <FilterChip 
          $active={activeFilter === 'kamus'} 
          onClick={() => {
            setActiveFilter('kamus');
            setActiveLevel('all');
          }}
        >
          Kamus
        </FilterChip>
      </FilterSection>

      {activeFilter === 'kamus' && (
        <FilterSection style={{ marginBottom: '2rem', gap: '0.5rem' }}>
          {['all', 'N1', 'N2', 'N3', 'N4', 'N5'].map((lvl) => (
            <FilterChip 
              key={lvl}
              $active={activeLevel === lvl}
              onClick={() => setActiveLevel(lvl as any)}
              style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}
            >
              {lvl === 'all' ? 'Semua Level' : lvl}
            </FilterChip>
          ))}
        </FilterSection>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Grid>
          {displayData.map((item: any, idx) => (
            <Card key={`${item.source}-${item.type}-${item.level}-${item.id || idx}`}>
              <CardHeader>
                <div>
                  <MainText>{item.word || item.title}</MainText>
                  {item.reading && <ReadingText>{item.reading}</ReadingText>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <Badge $type={item.source}>
                    {item.source === 'jisho' ? 'Jisho API' : item.source === 'kamus' ? 'Kamus' : 'Internal'}
                  </Badge>
                  <Badge $type={item.type}>{item.type}</Badge>
                </div>
              </CardHeader>
              
              <MeaningText>{item.meaning}</MeaningText>
              
              <StatsInfo>
                <span>Level: <strong>{item.level || '?'}</strong></span>
                {item.source === 'local' && (
                   <Link 
                    href={item.type === 'vocabulary' ? '/vocabulary' : `/grammar/${item.id}`}
                    style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}
                  >
                    Detail →
                  </Link>
                )}
              </StatsInfo>
            </Card>
          ))}
        </Grid>
      )}

      {!isLoading && displayData.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '1.25rem' }}>Tidak ada hasil ditemukan untuk "{query}".</p>
        </div>
      )}
    </Container>
  );
}
