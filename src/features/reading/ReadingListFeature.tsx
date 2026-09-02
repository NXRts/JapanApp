"use client";

import React from "react";
import styled from "styled-components";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useReading } from "./hooks/useReading";
import { StoryCard } from "./components/StoryCard";

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem 6rem;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 1rem 1rem 110px 1rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem 110px 0.5rem;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.3rem;
  font-weight: 900;
  color: var(--foreground);
  margin: 0;

  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.45;
  margin: 0;
`;

const ControlsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.25rem 1.5rem;
`;

const LevelTabsRow = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LevelTab = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? "#3b82f6" : "rgba(255, 255, 255, 0.04)")};
  color: ${({ $active }) => ($active ? "white" : "var(--text-secondary)")};
  border: 1px solid ${({ $active }) => ($active ? "#2563eb" : "var(--border)")};
  border-radius: 12px;
  padding: 0.45rem 1rem;
  font-size: 0.85rem;
  font-weight: 850;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;

  &:hover {
    color: white;
  }
`;

const SearchRow = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  height: 42px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0 1rem;
  color: var(--foreground);
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const TagSelect = styled.select`
  height: 42px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0 1rem;
  color: var(--foreground);
  font-size: 0.88rem;
  cursor: pointer;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const EmptyBox = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
`;

export default function ReadingListFeature() {
  const {
    filteredPassages,
    allTags,
    selectedLevel,
    setSelectedLevel,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    completedPassages,
  } = useReading();

  const levels = ["ALL", "N5", "N4", "N3", "N2", "N1"];

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Modul Bacaan" />

      <HeaderSection>
        <Title>📖 Modul Bacaan Interaktif</Title>
        <Subtitle>
          Tingkatkan pemahaman bacaan (*Dokkai*) dan kosakata bahasa Jepang melalui cerita pendek & artikel tergradasi.
        </Subtitle>
      </HeaderSection>

      <ControlsBox>
        <LevelTabsRow>
          {levels.map((lvl) => (
            <LevelTab
              key={lvl}
              $active={selectedLevel === lvl}
              onClick={() => setSelectedLevel(lvl)}
            >
              {lvl === "ALL" ? "Semua Level" : lvl}
            </LevelTab>
          ))}
        </LevelTabsRow>

        <SearchRow>
          <SearchInput
            type="text"
            placeholder="Cari judul cerita atau topik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <TagSelect
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="ALL">Semua Topik Tag</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                #{tag}
              </option>
            ))}
          </TagSelect>
        </SearchRow>
      </ControlsBox>

      {filteredPassages.length > 0 ? (
        <Grid>
          {filteredPassages.map((passage) => (
            <StoryCard
              key={passage.id}
              passage={passage}
              isCompleted={completedPassages.includes(passage.id)}
            />
          ))}
        </Grid>
      ) : (
        <EmptyBox>
          🔍 Tidak ada bacaan yang cocok dengan kata kunci/filter pilihanmu.
        </EmptyBox>
      )}
    </Container>
  );
}
