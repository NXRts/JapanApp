"use client";

import { useEffect, useState, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { KanjiCard } from "@/components/Card/KanjiCard";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { KANJI_DATA } from "@/data/kanji";

const gridFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  min-height: 90vh;

  @media (max-width: 1024px) {
    padding: 1rem 1rem 96px 1rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem 96px 0.5rem;
  }
`;

const Grid = styled.div<{ key?: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 1.25rem;
  padding: 10px 0;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  animation: ${gridFadeIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(105px, 1fr));
    gap: 0.75rem;
  }
`;

const HeaderSection = styled.div`
  text-align: left;
  margin-bottom: 2rem;
  max-width: 820px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.03em;

  @media (max-width: 768px) {
    font-size: 2.1rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const ScriptNavControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin: 0 auto 1.75rem auto;
  background: var(--surface);
  padding: 0.5rem;
  border-radius: 20px;
  width: fit-content;
  border: 1px solid var(--border);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
`;

const TabButton = styled.div<{ $active?: boolean }>`
  padding: 0.8rem 2.25rem;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  font-size: 0.95rem;
  font-weight: 800;
  min-width: 150px;
  text-align: center;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);

  @media (max-width: 480px) {
    min-width: 120px;
    padding: 0.75rem 1.25rem;
    font-size: 0.88rem;
  }
`;

const KanaLinkButton = styled(Link)`
  padding: 0.8rem 1.75rem;
  border: none;
  border-radius: 14px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 800;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
  justify-content: center;

  &:hover {
    color: var(--foreground);
    background: rgba(var(--foreground-rgb), 0.06);
  }

  @media (max-width: 480px) {
    min-width: 100px;
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }
`;

const LevelControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const LevelButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 2rem;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  border-radius: 999px;
  background: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--surface)"};
  color: ${({ $active }) => ($active ? "white" : "var(--text-secondary)")};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $active }) =>
    $active ? "var(--shadow-md)" : "var(--shadow-sm)"};

  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary);
    color: ${({ $active }) => ($active ? "white" : "var(--primary)")};
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

const kanjiCache: Record<string, string[]> = {};

export function KanjiGrid() {
  const [level, setLevel] = useState("n5");
  const [kanjiList, setKanjiList] = useState<string[]>(() => kanjiCache["n5"] || []);
  const [loading, setLoading] = useState<boolean>(() => !kanjiCache["n5"]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // If cached, load immediately in 0ms!
    if (kanjiCache[level] && kanjiCache[level].length > 0) {
      setKanjiList(kanjiCache[level]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/kanji/${level}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data)) {
          kanjiCache[level] = data;
          setKanjiList(data);
        } else {
          // Fallback to static KANJI_DATA database
          const upperLvl = level.toUpperCase();
          const fallbackChars = KANJI_DATA[upperLvl]?.map((item: any) => item.char) || [];
          kanjiCache[level] = fallbackChars;
          setKanjiList(fallbackChars);
        }
      })
      .catch((error) => {
        console.warn("Fallback to offline kanji data:", error);
        const upperLvl = level.toUpperCase();
        const fallbackChars = KANJI_DATA[upperLvl]?.map((item: any) => item.char) || [];
        kanjiCache[level] = fallbackChars;
        setKanjiList(fallbackChars);
      })
      .finally(() => setLoading(false));
  }, [level]);

  // Background prefetch all remaining JLPT levels into cache!
  useEffect(() => {
    const levels = ["n5", "n4", "n3", "n2", "n1"];
    levels.forEach((lvl) => {
      if (!kanjiCache[lvl]) {
        fetch(`/api/kanji/${lvl}`)
          .then((res) => res.ok ? res.json() : null)
          .then((data) => {
            if (Array.isArray(data)) kanjiCache[lvl] = data;
          })
          .catch(() => {});
      }
    });

    // Prefetch Kana API as well
    fetch("/api/kana?type=hiragana").catch(() => {});
  }, []);

  const filteredList = useMemo(
    () => kanjiList.filter((char) => char.includes(search)),
    [kanjiList, search],
  );

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Materials", href: "/materi" },
        ]}
        current="Kanji Library"
      />

      <HeaderSection>
        <Title>JLPT {level.toUpperCase()} Kanji 🉐</Title>
        <Subtitle>
          Jelajahi dan pelajari karakter Kanji (漢字) bahasa Jepang berdasarkan tingkat JLPT (N5 - N1) lengkap dengan cara baca Kun'yomi, On'yomi, arti, dan urutan coretan.
        </Subtitle>
      </HeaderSection>

      {/* Script Navigation Bar (Hiragana, Katakana, Kanji) */}
      <ScriptNavControls>
        <KanaLinkButton href="/kana">
          Hiragana (平仮名)
        </KanaLinkButton>
        <KanaLinkButton href="/kana">
          Katakana (片仮名)
        </KanaLinkButton>
        <TabButton $active={true}>
          Kanji (漢字)
        </TabButton>
      </ScriptNavControls>

      {/* JLPT Level Selector */}
      <LevelControls>
        {["n5", "n4", "n3", "n2", "n1"].map((l) => (
          <LevelButton
            key={l}
            $active={level === l}
            onClick={() => setLevel(l)}
          >
            {l.toUpperCase()}
          </LevelButton>
        ))}
      </LevelControls>

      <div style={{ padding: "0 20px" }}>
        <SearchInput
          placeholder="Search Kanji..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p style={{ textAlign: "center", marginTop: 100 }}>Loading Kanji...</p>
      ) : filteredList.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: 100 }}>
          {kanjiList.length === 0
            ? "No kanji loaded for this level"
            : "No kanji found matching your search"}
        </p>
      ) : (
        <Grid key={level}>
          {filteredList.map((char) => (
            <KanjiCard key={char} char={char} />
          ))}
        </Grid>
      )}
    </Container>
  );
}
