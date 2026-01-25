'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { KanaCard } from '@/components/Card/KanaCard';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Section = styled.div`
  margin-bottom: 60px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 32px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  background: linear-gradient(to right, #2C3E50, #4CA1AF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  text-transform: uppercase;
`;

interface KanaData {
  hiragana: string[];
  katakana: string[];
}

// Reuse the Title style from KanjiGrid for the main page title
// Reuse the Title style logic
const MainTitle = styled.h1`
  text-align: center;
  padding-top: 40px;
  margin-bottom: 1.5rem;
  font-size: 3rem;
  background: linear-gradient(135deg, var(--secondary), var(--primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  background: var(--surface);
  padding: 0.5rem;
  border-radius: 999px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 2.5rem;
  border: none;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'var(--primary)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'white' : 'var(--text-secondary)')};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;

  &:hover {
    color: ${({ $active }) => ($active ? 'white' : 'var(--foreground)')};
  }
`;

export function KanaGrid() {
  const [data, setData] = useState<KanaData>({ hiragana: [], katakana: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'hiragana' | 'katakana'>('hiragana');

  useEffect(() => {
    fetch('/api/kana')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load kana: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error loading kana:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: 100 }}>Loading Kana...</p>;

  return (
    <Container>
      <MainTitle>Kana Learning</MainTitle>

      <Controls>
        <TabButton
          $active={activeTab === 'hiragana'}
          onClick={() => setActiveTab('hiragana')}
        >
          Hiragana
        </TabButton>
        <TabButton
          $active={activeTab === 'katakana'}
          onClick={() => setActiveTab('katakana')}
        >
          Katakana
        </TabButton>
      </Controls>

      <Grid>
        {activeTab === 'hiragana'
          ? data.hiragana.map((char) => (
            <KanaCard key={`h-${char}`} char={char} />
          ))
          : data.katakana.map((char) => (
            <KanaCard key={`k-${char}`} char={char} />
          ))
        }
      </Grid>

      <div style={{ marginTop: '4rem', textAlign: 'center' }}>
        <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Mastered both scripts?</p>
        <Link href="/kanji" style={{ textDecoration: 'none' }}>
          <TabButton $active={true} style={{ minWidth: '200px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            Start Learning Kanji
            <span>→</span>
          </TabButton>
        </Link>
      </div>
    </Container>
  );
}
