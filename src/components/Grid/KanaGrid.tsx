"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { KanaCard } from "@/components/Card/KanaCard";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

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

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin: 0 auto 2.5rem auto;
  background: var(--surface);
  padding: 0.5rem;
  border-radius: 20px;
  width: fit-content;
  border: 1px solid var(--border);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.8rem 2.25rem;
  border: none;
  border-radius: 14px;
  background: ${({ $active }) =>
    $active ? "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" : "transparent"};
  color: ${({ $active }) => ($active ? "white" : "var(--text-secondary)")};
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 150px;
  box-shadow: ${({ $active }) =>
    $active ? "0 4px 14px rgba(59, 130, 246, 0.35)" : "none"};

  &:hover {
    color: ${({ $active }) => ($active ? "white" : "var(--foreground)")};
  }

  @media (max-width: 480px) {
    min-width: 120px;
    padding: 0.75rem 1.25rem;
    font-size: 0.88rem;
  }
`;

const KanjiLinkButton = styled(Link)`
  padding: 0.8rem 1.75rem;
  border: none;
  border-radius: 14px;
  background: rgba(var(--primary-rgb), 0.12);
  color: var(--primary);
  border: 1px solid rgba(var(--primary-rgb), 0.3);
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
    background: var(--primary);
    color: white;
    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
  }

  @media (max-width: 480px) {
    min-width: 100px;
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }
`;

const Grid = styled.div<{ key?: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 1.25rem;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 10px 0;
  animation: ${gridFadeIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(105px, 1fr));
    gap: 0.75rem;
  }
`;

const FALLBACK_HIRAGANA = [
  "あ", "い", "う", "え", "お",
  "か", "き", "く", "け", "こ",
  "さ", "し", "す", "せ", "そ",
  "た", "ち", "つ", "て", "と",
  "な", "に", "ぬ", "ね", "の",
  "は", "ひ", "ふ", "へ", "ほ",
  "ま", "み", "む", "め", "も",
  "や", "ゆ", "よ",
  "ら", "り", "る", "れ", "ろ",
  "わ", "を", "ん"
];

const FALLBACK_KATAKANA = [
  "ア", "イ", "ウ", "エ", "オ",
  "カ", "キ", "ク", "ケ", "コ",
  "サ", "シ", "ス", "セ", "ソ",
  "タ", "チ", "ツ", "テ", "ト",
  "ナ", "ニ", "ヌ", "ネ", "ノ",
  "ハ", "ヒ", "フ", "ヘ", "ホ",
  "マ", "ミ", "ム", "メ", "モ",
  "ヤ", "ユ", "ヨ",
  "ラ", "リ", "ル", "レ", "ロ",
  "ワ", "ヲ", "ン"
];

interface KanaData {
  hiragana: string[];
  katakana: string[];
}

const kanaCache: { hiragana?: string[]; katakana?: string[] } = {};

export function KanaGrid() {
  const [data, setData] = useState<KanaData>(() => ({
    hiragana: kanaCache.hiragana || FALLBACK_HIRAGANA,
    katakana: kanaCache.katakana || FALLBACK_KATAKANA,
  }));
  const [loading, setLoading] = useState<boolean>(() => {
    return !(kanaCache.hiragana && kanaCache.katakana);
  });
  const [activeTab, setActiveTab] = useState<"hiragana" | "katakana">(
    "hiragana",
  );

  useEffect(() => {
    // If cached, skip network fetch
    if (kanaCache.hiragana && kanaCache.katakana) {
      setData({ hiragana: kanaCache.hiragana, katakana: kanaCache.katakana });
      setLoading(false);
      return;
    }

    Promise.all([
      fetch("/api/kana?type=hiragana")
        .then((res) => (res.ok ? (res.json() as Promise<string[]>) : FALLBACK_HIRAGANA))
        .catch(() => FALLBACK_HIRAGANA),
      fetch("/api/kana?type=katakana")
        .then((res) => (res.ok ? (res.json() as Promise<string[]>) : FALLBACK_KATAKANA))
        .catch(() => FALLBACK_KATAKANA),
    ])
      .then(([hiragana, katakana]) => {
        const finalHira = Array.isArray(hiragana) ? hiragana : FALLBACK_HIRAGANA;
        const finalKata = Array.isArray(katakana) ? katakana : FALLBACK_KATAKANA;
        kanaCache.hiragana = finalHira;
        kanaCache.katakana = finalKata;
        setData({ hiragana: finalHira, katakana: finalKata });
      })
      .catch((error) => {
        console.warn("Fallback to offline kana data:", error);
        kanaCache.hiragana = FALLBACK_HIRAGANA;
        kanaCache.katakana = FALLBACK_KATAKANA;
        setData({ hiragana: FALLBACK_HIRAGANA, katakana: FALLBACK_KATAKANA });
      })
      .finally(() => setLoading(false));

    // Background prefetch Kanji API
    fetch("/api/kanji/n5").catch(() => {});
  }, []);

  if (loading)
    return (
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Materials", href: "/materi" },
          ]}
          current="Kana Library"
        />
        <HeaderSection>
          <Title>Kana Learning 🔤</Title>
          <Subtitle>
            Memuat pustaka karakter Kana bahasa Jepang...
          </Subtitle>
        </HeaderSection>
      </Container>
    );

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Materials", href: "/materi" },
        ]}
        current="Kana Library"
      />

      <HeaderSection>
        <Title>Kana Learning 🔤</Title>
        <Subtitle>
          Pelajari dan latih 46 karakter dasar Hiragana (平仮名) & Katakana (片仮名) bahasa Jepang lengkap dengan audio pengucapan dan romaji interaktif.
        </Subtitle>
      </HeaderSection>

      <Controls>
        <TabButton
          $active={activeTab === "hiragana"}
          onClick={() => setActiveTab("hiragana")}
        >
          Hiragana (平仮名)
        </TabButton>
        <TabButton
          $active={activeTab === "katakana"}
          onClick={() => setActiveTab("katakana")}
        >
          Katakana (片仮名)
        </TabButton>
        <KanjiLinkButton href="/kanji">
          Kanji (漢字) <span>→</span>
        </KanjiLinkButton>
      </Controls>

      <Grid key={activeTab}>
        {activeTab === "hiragana"
          ? data.hiragana.map((char: string) => (
              <KanaCard key={`h-${char}`} char={char} />
            ))
          : data.katakana.map((char: string) => (
              <KanaCard key={`k-${char}`} char={char} />
            ))}
      </Grid>
    </Container>
  );
}
