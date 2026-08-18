"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import {
  searchDictionary,
  getAutoSuggestions,
  DictionaryResult,
  allKanji,
} from "@/lib/dictionary";
import { speakJapanese } from "@/lib/audio";
import { generateConjugations, WordConjugationTable } from "@/utils/japaneseConjugation";

/* ─── Animations ─────────────────────────────────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* ─── Styled Components ──────────────────────────────────────────────────── */
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 5rem 1.5rem;
  min-height: 90vh;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 1rem 1rem 6rem 1rem;
  }
`;

const HeaderBox = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;
`;

const PageTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--foreground);
  margin: 0 0 0.4rem 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;

  @media (max-width: 640px) {
    font-size: 1.65rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
`;

/* ─── Tab Bar (Search vs Bookmarks) ─────────────────────────────────────── */
const TabContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;
`;

const TabBtn = styled.button<{ $active: boolean }>`
  padding: 0.6rem 1.25rem;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.9rem;
  border: 1px solid ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  background: ${({ $active }) =>
    $active ? "rgba(var(--primary-rgb), 0.15)" : "transparent"};
  color: ${({ $active }) => ($active ? "var(--primary)" : "var(--text-secondary)")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: var(--primary);
  }
`;

/* ─── Search Box & Auto Suggestion ───────────────────────────────────────── */
const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
  width: 100%;
`;

const SearchInputRow = styled.form`
  display: flex;
  align-items: center;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 20px;
  padding: 0.4rem 0.85rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;

  &:focus-within {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.15);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--foreground);
  padding: 0.6rem 0.5rem;
  font-family: inherit;

  &::placeholder {
    color: var(--text-secondary);
    font-weight: 500;
  }
`;

const ClearBtn = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.2s;

  &:hover {
    color: var(--foreground);
  }
`;

const SearchBtn = styled.button`
  background: linear-gradient(135deg, var(--primary) 0%, #6366f1 100%);
  color: #ffffff;
  border: none;
  padding: 0.65rem 1.4rem;
  border-radius: 14px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  margin-left: 0.5rem;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(79, 70, 229, 0.4);
  }
`;

/* Suggestions Dropdown */
const SuggestionsDropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 50;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  max-height: 360px;
  overflow-y: auto;
`;

const SuggestionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: background 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(var(--primary-rgb), 0.1);
  }
`;

/* ─── Filters & History Bar ──────────────────────────────────────────────── */
const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterChip = styled.button<{ $active: boolean }>`
  padding: 0.4rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 800;
  border: 1px solid ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  background: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--surface)"};
  color: ${({ $active }) => ($active ? "#ffffff" : "var(--text-secondary)")};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary);
  }
`;

const HistoryBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const HistoryTag = styled.button`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(var(--primary-rgb), 0.12);
    color: var(--primary);
    border-color: var(--primary);
  }
`;

/* ─── Entry Cards Grid & Layout ──────────────────────────────────────────── */
const ResultsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EntryCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.35rem 1.5rem;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-light);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
`;

const EntryHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const MainWordGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const RubyText = styled.ruby`
  font-size: 2rem;
  font-weight: 900;
  color: var(--foreground);
  line-height: 1.2;

  rt {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--primary);
    padding-bottom: 2px;
  }
`;

const RomajiLabel = styled.span`
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 700;
  margin-top: 0.2rem;
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

const LevelTag = styled.span<{ $level: string }>`
  font-size: 0.75rem;
  font-weight: 900;
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
  background: rgba(79, 70, 229, 0.12);
  color: var(--primary);
  border: 1px solid rgba(79, 70, 229, 0.25);
`;

const PosTag = styled.span`
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
  background: rgba(234, 179, 8, 0.12);
  color: #eab308;
  border: 1px solid rgba(234, 179, 8, 0.3);
`;

const DefinitionText = styled.div`
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--foreground);
  line-height: 1.5;

  span.label {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--text-secondary);
    display: block;
    margin-bottom: 0.2rem;
  }
`;

/* Sentence Examples */
const ExampleBox = styled.div`
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.9rem;
`;

const ExampleJp = styled.div`
  font-weight: 800;
  color: var(--foreground);
`;

const ExampleId = styled.div`
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 600;
`;

/* Action Buttons Bar */
const ActionToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.25rem;
  flex-wrap: wrap;
`;

const ToolBtn = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: ${({ $active }) =>
    $active ? "rgba(var(--primary-rgb), 0.2)" : "rgba(255, 255, 255, 0.04)"};
  border: 1px solid
    ${({ $active }) => ($active ? "var(--primary)" : "var(--border)")};
  color: ${({ $active }) => ($active ? "var(--primary)" : "var(--foreground)")};
  padding: 0.4rem 0.85rem;
  border-radius: 12px;
  font-size: 0.82rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(var(--primary-rgb), 0.12);
    border-color: var(--primary);
    color: var(--primary);
  }
`;

/* ─── Modal Layout ───────────────────────────────────────────────────────── */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  width: 100%;
  max-width: 600px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 1.75rem;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;

  h2 {
    font-size: 1.35rem;
    font-weight: 900;
    margin: 0;
  }
`;

const CloseModalBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.2rem;
  &:hover {
    color: var(--foreground);
  }
`;

const ConjugationTableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.75rem;

  th,
  td {
    padding: 0.65rem 0.85rem;
    text-align: left;
    border-bottom: 1px solid var(--border);
    font-size: 0.88rem;
  }

  th {
    font-weight: 800;
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.02);
  }

  td.jp {
    font-weight: 900;
    color: var(--primary);
  }
`;

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function KamusPage() {
  const [activeTab, setActiveTab] = useState<"search" | "bookmarks">("search");
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [results, setResults] = useState<DictionaryResult[]>([]);
  const [suggestions, setSuggestions] = useState<DictionaryResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // User storage
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<DictionaryResult[]>([]);
  const [toastMsg, setToastMsg] = useState("");

  // Modals
  const [selectedConjugation, setSelectedConjugation] =
    useState<WordConjugationTable | null>(null);
  const [selectedKanji, setSelectedKanji] = useState<DictionaryResult | null>(
    null
  );

  const searchContainerRef = useRef<HTMLDivElement>(null);

  /* Load localStorage data */
  useEffect(() => {
    try {
      const savedHist = localStorage.getItem("japanapp_kamus_history");
      if (savedHist) setSearchHistory(JSON.parse(savedHist));

      const savedBM = localStorage.getItem("japanapp_kamus_bookmarks");
      if (savedBM) setBookmarks(JSON.parse(savedBM));
    } catch (e) {
      console.warn("localStorage error:", e);
    }
  }, []);

  /* Save bookmarks */
  const toggleBookmark = (item: DictionaryResult) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id);
      let updated;
      if (exists) {
        updated = prev.filter((b) => b.id !== item.id);
        triggerToast("Dihapus dari Favorit");
      } else {
        updated = [item, ...prev];
        triggerToast("Disimpan ke Favorit ⭐");
      }
      localStorage.setItem("japanapp_kamus_bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  /* Toast Helper */
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  };

  /* Auto-Suggestion Handling */
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length >= 1) {
      const sugs = getAutoSuggestions(val, 8);
      setSuggestions(sugs);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  /* Execute Search */
  const handleSearch = async (searchTerm?: string) => {
    const term = (searchTerm !== undefined ? searchTerm : query).trim();
    if (!term) return;

    setQuery(term);
    setShowSuggestions(false);
    setLoading(true);
    setHasSearched(true);

    // Save to search history
    setSearchHistory((prev) => {
      const filtered = prev.filter((h) => h.toLowerCase() !== term.toLowerCase());
      const updated = [term, ...filtered].slice(0, 10);
      localStorage.setItem("japanapp_kamus_history", JSON.stringify(updated));
      return updated;
    });

    const res = await searchDictionary(term, "all", levelFilter);
    setResults(res);
    setLoading(false);
  };

  /* Close suggestion on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Filtered results when level changes */
  const displayResults = useMemo(() => {
    if (levelFilter === "all") return results;
    return results.filter((r) => r.level === levelFilter);
  }, [results, levelFilter]);

  /* Open Conjugation Modal */
  const handleOpenConjugation = (item: DictionaryResult) => {
    const word = item.word || item.reading || "";
    const reading = item.reading || "";
    const pos = item.partOfSpeech || item.category || "";

    const conj = generateConjugations(word, reading, pos);
    if (conj && conj.items.length > 0) {
      setSelectedConjugation(conj);
    } else {
      triggerToast("Tabel konjugasi hanya untuk kata kerja & kata sifat");
    }
  };

  /* Open Kanji Detail Modal */
  const handleOpenKanjiDetail = (kanjiChar: string) => {
    const found = allKanji.find((k) => k.kanji === kanjiChar);
    if (found) {
      setSelectedKanji(found);
    } else {
      setSelectedKanji({
        id: `kanji-${kanjiChar}`,
        type: "kanji",
        kanji: kanjiChar,
        level: "N5",
        meaning: `Kanji ${kanjiChar}`,
        source: "kanji-db",
      });
    }
  };

  /* Copy to Clipboard */
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(`${label} berhasil disalin! 📋`);
  };

  return (
    <PageContainer>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Development Lab", href: "/development" },
        ]}
        current="Kamus Ringan"
      />

      <HeaderBox>
        <PageTitle>📖 Kamus Ringan 2 Arah</PageTitle>
        <Subtitle>
          Cari cepat kata Jepang-Indonesia & Indonesia-Jepang (Kanji, Kana, Romaji, atau Kata Indonesia).
        </Subtitle>
      </HeaderBox>

      {/* Tabs */}
      <TabContainer>
        <TabBtn
          $active={activeTab === "search"}
          onClick={() => setActiveTab("search")}
        >
          🔍 Pencarian Kamus
        </TabBtn>
        <TabBtn
          $active={activeTab === "bookmarks"}
          onClick={() => setActiveTab("bookmarks")}
        >
          ⭐ Kamus Favorit ({bookmarks.length})
        </TabBtn>
      </TabContainer>

      {/* SEARCH TAB CONTENT */}
      {activeTab === "search" && (
        <>
          {/* Smart Search Bar */}
          <SearchWrapper ref={searchContainerRef}>
            <SearchInputRow
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <span style={{ fontSize: "1.2rem", margin: "0 0.3rem" }}>🔍</span>
              <SearchInput
                type="text"
                placeholder="Cari kata (contoh: taberu, 食べる, makan, N5)..."
                value={query}
                onChange={handleQueryChange}
                onFocus={() => query.length >= 1 && setShowSuggestions(true)}
              />
              {query && (
                <ClearBtn
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSuggestions([]);
                    setShowSuggestions(false);
                  }}
                >
                  ×
                </ClearBtn>
              )}
              <SearchBtn type="submit">Cari Kata</SearchBtn>
            </SearchInputRow>

            {/* Auto Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <SuggestionsDropdown>
                {suggestions.map((sug) => (
                  <SuggestionItem
                    key={sug.id}
                    onClick={() => handleSearch(sug.word || sug.reading || sug.meaning)}
                  >
                    <div>
                      <span style={{ fontWeight: 900, fontSize: "1.05rem" }}>
                        {sug.word || sug.kanji || sug.reading}
                      </span>
                      {sug.reading && sug.reading !== sug.word && (
                        <span
                          style={{
                            fontSize: "0.85rem",
                            color: "var(--text-secondary)",
                            marginLeft: "0.6rem",
                          }}
                        >
                          ({sug.reading})
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                        fontWeight: 600,
                      }}
                    >
                      {sug.meaning}
                    </span>
                  </SuggestionItem>
                ))}
              </SuggestionsDropdown>
            )}
          </SearchWrapper>

          {/* Level Filter Bar */}
          <FilterRow>
            {["all", "N5", "N4", "N3", "N2", "N1"].map((lvl) => (
              <FilterChip
                key={lvl}
                $active={levelFilter === lvl}
                onClick={() => setLevelFilter(lvl)}
              >
                {lvl === "all" ? "Semua Level" : lvl}
              </FilterChip>
            ))}
          </FilterRow>

          {/* History Pills */}
          {searchHistory.length > 0 && (
            <HistoryBox>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  fontWeight: 700,
                }}
              >
                Terakhir Dicari:
              </span>
              {searchHistory.map((h) => (
                <HistoryTag key={h} onClick={() => handleSearch(h)}>
                  {h}
                </HistoryTag>
              ))}
            </HistoryBox>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div
              style={{
                textAlign: "center",
                padding: "2.5rem",
                color: "var(--text-secondary)",
                fontWeight: 700,
              }}
            >
              🔄 Mencari data kata...
            </div>
          )}

          {/* Results List */}
          {!loading && displayResults.length > 0 && (
            <ResultsGrid>
              {displayResults.map((item) => {
                const isBookmarked = bookmarks.some((b) => b.id === item.id);
                const displayWord = item.word || item.kanji || item.reading || item.title || "";
                const displayReading = item.reading || "";

                return (
                  <EntryCard key={item.id}>
                    <EntryHeader>
                      <MainWordGroup>
                        {displayReading && displayReading !== displayWord ? (
                          <RubyText>
                            {displayWord}
                            <rt>{displayReading}</rt>
                          </RubyText>
                        ) : (
                          <div
                            style={{
                              fontSize: "1.8rem",
                              fontWeight: 900,
                              color: "var(--foreground)",
                            }}
                          >
                            {displayWord}
                          </div>
                        )}
                        {item.romaji && <RomajiLabel>{item.romaji}</RomajiLabel>}
                      </MainWordGroup>

                      <BadgeRow>
                        {item.level && <LevelTag $level={item.level}>{item.level}</LevelTag>}
                        {item.partOfSpeech && <PosTag>{item.partOfSpeech}</PosTag>}
                      </BadgeRow>
                    </EntryHeader>

                    <DefinitionText>
                      <span className="label">ARTI & DEFINISI:</span>
                      {item.meaning}
                    </DefinitionText>

                    {/* Example Sentences */}
                    {item.examples && item.examples.length > 0 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {item.examples.slice(0, 2).map((ex, idx) => (
                          <ExampleBox key={idx}>
                            <ExampleJp>{ex.japanese}</ExampleJp>
                            {ex.indonesian && <ExampleId>{ex.indonesian}</ExampleId>}
                          </ExampleBox>
                        ))}
                      </div>
                    )}

                    {/* Action Toolbar */}
                    <ActionToolbar>
                      <ToolBtn onClick={() => speakJapanese(displayWord)}>
                        🔊 Dengar Audio
                      </ToolBtn>

                      <ToolBtn onClick={() => copyToClipboard(displayWord, displayWord)}>
                        📋 Salin Kata
                      </ToolBtn>

                      <ToolBtn
                        $active={isBookmarked}
                        onClick={() => toggleBookmark(item)}
                      >
                        {isBookmarked ? "⭐ Favorit" : "☆ Simpan"}
                      </ToolBtn>

                      {/* If word has Kanji, show Kanjidex option */}
                      {displayWord !== displayReading && (
                        <ToolBtn
                          onClick={() => handleOpenKanjiDetail(displayWord.charAt(0))}
                        >
                          ⛩️ Detail Kanji
                        </ToolBtn>
                      )}

                      {/* Conjugation option */}
                      <ToolBtn onClick={() => handleOpenConjugation(item)}>
                        🔄 Konjugasi
                      </ToolBtn>
                    </ActionToolbar>
                  </EntryCard>
                );
              })}
            </ResultsGrid>
          )}

          {/* Empty Search Result */}
          {!loading && hasSearched && displayResults.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 1.5rem",
                background: "var(--surface)",
                borderRadius: "20px",
                border: "1px solid var(--border)",
                marginTop: "1rem",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🍃</div>
              <h3 style={{ margin: "0 0 0.5rem 0", fontWeight: 800 }}>
                Kata tidak ditemukan
              </h3>
              <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "0.95rem" }}>
                Coba gunakan kata dasar Romaji (contoh: <i>taberu</i>) atau kata Bahasa Indonesia lainnya.
              </p>
            </div>
          )}
        </>
      )}

      {/* BOOKMARKS TAB CONTENT */}
      {activeTab === "bookmarks" && (
        <ResultsGrid>
          {bookmarks.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 1.5rem",
                background: "var(--surface)",
                borderRadius: "20px",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>⭐</div>
              <h3 style={{ margin: "0 0 0.5rem 0", fontWeight: 800 }}>
                Belum ada kata favorit
              </h3>
              <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "0.95rem" }}>
                Simpan kata-kata dari pencarian kamus untuk dipelajari kembali di sini!
              </p>
            </div>
          ) : (
            bookmarks.map((item) => {
              const displayWord = item.word || item.kanji || item.reading || "";
              return (
                <EntryCard key={item.id}>
                  <EntryHeader>
                    <div>
                      <div style={{ fontSize: "1.6rem", fontWeight: 900 }}>
                        {displayWord} ({item.reading})
                      </div>
                      {item.romaji && <RomajiLabel>{item.romaji}</RomajiLabel>}
                    </div>
                    <LevelTag $level={item.level}>{item.level}</LevelTag>
                  </EntryHeader>

                  <DefinitionText>{item.meaning}</DefinitionText>

                  <ActionToolbar>
                    <ToolBtn onClick={() => speakJapanese(displayWord)}>🔊 Dengar</ToolBtn>
                    <ToolBtn $active onClick={() => toggleBookmark(item)}>
                      ⭐ Hapus Favorit
                    </ToolBtn>
                  </ActionToolbar>
                </EntryCard>
              );
            })
          )}
        </ResultsGrid>
      )}

      {/* ─── MODAL 1: TABEL KONJUGASI ─────────────────────────────────────── */}
      {selectedConjugation && (
        <ModalOverlay onClick={() => setSelectedConjugation(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>🔄 Tabel Konjugasi ({selectedConjugation.word})</h2>
              <CloseModalBtn onClick={() => setSelectedConjugation(null)}>
                ×
              </CloseModalBtn>
            </ModalHeader>

            <div style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 800 }}>
              {selectedConjugation.typeLabel}
            </div>

            <ConjugationTableStyle>
              <thead>
                <tr>
                  <th>Bentuk Perubahan</th>
                  <th>Jepang</th>
                  <th>Penjelasan</th>
                </tr>
              </thead>
              <tbody>
                {selectedConjugation.items.map((c, idx) => (
                  <tr key={idx}>
                    <td>{c.formName}</td>
                    <td className="jp">
                      {c.japanese}
                      {c.polite && (
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                          Sopan: {c.polite}
                        </div>
                      )}
                    </td>
                    <td style={{ color: "var(--text-secondary)" }}>{c.formNameId}</td>
                  </tr>
                ))}
              </tbody>
            </ConjugationTableStyle>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* ─── MODAL 2: KANJIDEX DETAIL ─────────────────────────────────────── */}
      {selectedKanji && (
        <ModalOverlay onClick={() => setSelectedKanji(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>⛩️ Detail Kanji ({selectedKanji.kanji})</h2>
              <CloseModalBtn onClick={() => setSelectedKanji(null)}>
                ×
              </CloseModalBtn>
            </ModalHeader>

            <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
              <div
                style={{
                  fontSize: "4rem",
                  fontWeight: 900,
                  color: "var(--primary)",
                  lineHeight: 1,
                }}
              >
                {selectedKanji.kanji}
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  marginTop: "0.5rem",
                  color: "var(--foreground)",
                }}
              >
                {selectedKanji.meaning}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
                background: "var(--background)",
                padding: "1rem",
                borderRadius: "16px",
                fontSize: "0.9rem",
              }}
            >
              <div>
                <strong>Kun'yomi (Jepang):</strong>
                <div style={{ color: "var(--primary)", fontWeight: 800 }}>
                  {selectedKanji.kunyomi?.join(", ") || "-"}
                </div>
              </div>
              <div>
                <strong>On'yomi (Cina):</strong>
                <div style={{ color: "#eab308", fontWeight: 800 }}>
                  {selectedKanji.onyomi?.join(", ") || "-"}
                </div>
              </div>
              <div>
                <strong>Goresan (Strokes):</strong>
                <div>{selectedKanji.stroke_count || 5} goresan</div>
              </div>
              <div>
                <strong>Level JLPT:</strong>
                <div>{selectedKanji.level || "N5"}</div>
              </div>
            </div>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--foreground)",
            color: "var(--background)",
            padding: "0.75rem 1.5rem",
            borderRadius: "9999px",
            fontWeight: 800,
            fontSize: "0.9rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            zIndex: 2000,
          }}
        >
          {toastMsg}
        </div>
      )}
    </PageContainer>
  );
}
