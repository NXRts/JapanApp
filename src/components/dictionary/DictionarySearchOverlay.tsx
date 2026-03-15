'use client';

import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { toKana, isRomaji } from 'wanakana';
import { searchDictionary, DictionaryResult } from '@/lib/dictionary';
import Link from 'next/link';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  padding-top: 10vh;
`;

const SearchContainer = styled.div`
  width: 90%;
  max-width: 600px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const SearchInputWrapper = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  
  &:focus-within {
    border-color: var(--primary);
    box-shadow: 0 20px 40px rgba(79, 70, 229, 0.2);
  }
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: var(--foreground);
  font-size: 1.25rem;
  padding: 0.75rem 0;
  
  &:focus {
    outline: none;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  max-height: 60vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ResultItem = styled(Link)`
  padding: 1rem;
  border-radius: 12px;
  text-decoration: none;
  color: var(--foreground);
  transition: background 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    background: rgba(79, 70, 229, 0.05);
  }
`;

const WordInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const WordName = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
`;

const WordMeaning = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const Badge = styled.span`
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.25rem 0.6rem;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  text-transform: uppercase;
`;

interface Props {
  onClose: () => void;
}

export default function DictionarySearchOverlay({ onClose }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DictionaryResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    
    // Close on escape
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        const searchResults = await searchDictionary(query);
        setResults(searchResults);
        setIsLoading(false);
      } else {
        setResults([]);
      }
    }, 300); // Debounce for API

    return () => clearTimeout(timer);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    if (isRomaji(val) && val.length > 0) {
      val = toKana(val, { IMEMode: true });
    }
    
    setQuery(val);
  };

  return (
    <Overlay onClick={onClose}>
      <SearchContainer onClick={(e) => e.stopPropagation()}>
        <SearchInputWrapper>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <Input
            ref={inputRef}
            placeholder="Search words, kana, or romaji..."
            value={query}
            onChange={handleInputChange}
            autoComplete="off"
          />
          {isLoading ? (
             <div style={{ width: '20px', height: '20px', border: '2px solid rgba(79, 70, 229, 0.2)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          ) : query && (
            <button onClick={() => { setQuery(''); setResults([]); }} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem' }}>
              ✕
            </button>
          )}
        </SearchInputWrapper>

        <style jsx global>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>

        {results.length > 0 && (
          <ResultsContainer>
            {results.map((res) => (
              <ResultItem 
                key={`${res.source}-${res.type}-${res.level}-${res.id}`} 
                href={res.type === 'vocabulary' ? `/vocabulary` : `/grammar/${res.id}`}
                onClick={onClose}
              >
                <WordInfo>
                  <WordName>
                    {res.type === 'vocabulary' ? res.word : res.title}
                    {res.reading && (
                      <span style={{ fontSize: '0.8rem', fontWeight: 400, marginLeft: '0.5rem', opacity: 0.7 }}>
                        ({res.reading})
                      </span>
                    )}
                  </WordName>
                  <WordMeaning>{res.meaning}</WordMeaning>
                </WordInfo>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Badge>{res.level}</Badge>
                  <Badge style={{ 
                    background: res.source === 'jisho' ? 'rgba(234, 179, 8, 0.1)' : res.source === 'kamus' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    color: res.source === 'jisho' ? '#eab308' : res.source === 'kamus' ? '#3b82f6' : 'var(--text-secondary)',
                    border: res.source === 'jisho' ? '1px solid rgba(234, 179, 8, 0.2)' : res.source === 'kamus' ? '1px solid rgba(59, 130, 246, 0.2)' : 'none'
                  }}>
                    {res.source === 'jisho' ? 'Jisho API' : res.source === 'kamus' ? 'Kamus' : 'Internal'}
                  </Badge>
                  <Badge style={{ background: res.type === 'grammar' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(79, 70, 229, 0.1)', color: res.type === 'grammar' ? '#10b981' : 'var(--primary)' }}>
                    {res.type}
                  </Badge>
                </div>
              </ResultItem>
            ))}
          </ResultsContainer>
        )}
        
        {query && results.length === 0 && (
          <ResultsContainer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No results found for "{query}"
          </ResultsContainer>
        )}
      </SearchContainer>
    </Overlay>
  );
}
