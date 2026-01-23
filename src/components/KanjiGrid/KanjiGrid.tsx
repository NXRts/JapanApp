'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { KanjiCard } from '@/components/Card/KanjiCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 32px;
  padding: 40px 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  padding-top: 40px;
  margin-bottom: 2rem;
  font-size: 3rem;
  background: linear-gradient(135deg, var(--primary-dark), var(--primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const LevelButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 2rem;
  border: 1px solid ${({ $active }) => ($active ? 'var(--primary)' : 'var(--border)')};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'var(--primary)' : 'var(--surface)')};
  color: ${({ $active }) => ($active ? 'white' : 'var(--text-secondary)')};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $active }) => ($active ? 'var(--shadow-md)' : 'var(--shadow-sm)')};

  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary);
    color: ${({ $active }) => ($active ? 'white' : 'var(--primary)')};
    box-shadow: var(--shadow-md);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SearchInput = styled.input`
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  width: 100%;
  max-width: 400px;
  font-size: 1rem;
  color: var(--foreground);
  background: var(--surface);
  transition: all 0.2s;
  box-shadow: var(--shadow-sm);
  margin-bottom: 2rem;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

export function KanjiGrid() {
  const [kanjiList, setKanjiList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState('n5');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/kanji/${level}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load kanji: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          console.error('API Error:', data.error);
          setKanjiList([]);
        } else {
          setKanjiList(Array.isArray(data) ? data : []);
        }
      })
      .catch((error) => {
        console.error('Error loading kanji:', error);
        setKanjiList([]);
      })
      .finally(() => setLoading(false));
  }, [level]);

  // Filter kanji based on search input
  // Since we only have the character char in the list (string[]), we can only filter by character match
  // In a real app with full metadata, we could match meaning/reading too. 
  // For now, this effectively "Highlights" or "Finds" the character if it exists in the list for this level.
  const filteredList = kanjiList.filter(char => char.includes(search));

  return (
    <>
      <Title>JLPT {level.toUpperCase()} Kanji</Title>
      
      <Controls>
        {['n5', 'n4', 'n3', 'n2', 'n1'].map((l) => (
          <LevelButton 
            key={l} 
            $active={level === l} 
            onClick={() => setLevel(l)}
          >
            {l.toUpperCase()}
          </LevelButton>
        ))}
      </Controls>

      <div style={{ padding: '0 20px' }}>
        <SearchInput 
          placeholder="Search Kanji..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', marginTop: 100 }}>Loading Kanji...</p>
      ) : filteredList.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: 100 }}>
          {kanjiList.length === 0 ? "No kanji loaded for this level" : "No kanji found matching your search"}
        </p>
      ) : (
        <Grid>
          {filteredList.map((char) => (
            <KanjiCard key={char} char={char} />
          ))}
        </Grid>
      )}
    </>
  );
}
