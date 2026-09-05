"use client";

import React, { useState, useMemo, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { MATERI_CATALOG, MateriItem } from "@/data/materiData";
import { LightBulbIcon } from "@/components/icons/AppIcons";

// ─── ANIMATIONS ─────────────────────────────────────────────────────────────
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 15px rgba(var(--primary-rgb, 79, 70, 229), 0.2); }
  50% { box-shadow: 0 0 25px rgba(var(--primary-rgb, 79, 70, 229), 0.45); }
  100% { box-shadow: 0 0 15px rgba(var(--primary-rgb, 79, 70, 229), 0.2); }
`;

// ─── STYLED COMPONENTS ───────────────────────────────────────────────────────
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem 5rem 2rem;
  min-height: 90vh;
  animation: ${fadeIn} 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 1024px) {
    padding: 1rem 1rem 96px 1rem;
  }

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem 96px 0.5rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  width: 100%;
`;

// ─── HERO HEADER ─────────────────────────────────────────────────────────────
const HeroHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: 999px;
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.12);
  border: 1px solid rgba(var(--primary-rgb, 79, 70, 229), 0.25);
  color: var(--primary);
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 1rem;
  box-shadow: 0 4px 14px rgba(var(--primary-rgb, 79, 70, 229), 0.15);
`;

const Title = styled.h1`
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
  background: linear-gradient(
    135deg,
    var(--foreground) 0%,
    var(--text-secondary) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  .kanji-sub {
    font-size: 1.8rem;
    font-weight: 600;
    margin-left: 10px;
    color: var(--primary);
    -webkit-text-fill-color: initial;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    font-size: 1.85rem;
    .kanji-sub {
      display: block;
      margin-left: 0;
      margin-top: 4px;
      font-size: 1.3rem;
    }
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.92rem;
  }
`;

// ─── USER PROGRESS BANNER ───────────────────────────────────────────────────
const ProgressBanner = styled.div`
  background: linear-gradient(
    135deg,
    rgba(var(--primary-rgb, 79, 70, 229), 0.12) 0%,
    rgba(var(--surface-rgb, 30, 41, 59), 0.8) 100%
  );
  border: 1px solid rgba(var(--primary-rgb, 79, 70, 229), 0.25);
  border-radius: 20px;
  padding: 1.25rem 1.75rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.1rem;
    gap: 1rem;
  }
`;

const ProgressInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProgressIconBadge = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.2);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  animation: ${float} 3s ease-in-out infinite;
`;

const ProgressTextGroup = styled.div`
  .head {
    font-weight: 800;
    font-size: 1.05rem;
    color: var(--foreground);
    margin-bottom: 2px;
  }
  .desc {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
`;

const ResumeBtn = styled.button`
  background: var(--primary);
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.4rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px rgba(var(--primary-rgb, 79, 70, 229), 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(var(--primary-rgb, 79, 70, 229), 0.6);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

// ─── SEARCH & FILTER CONTROLS ────────────────────────────────────────────────
const ControlsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInputWrap = styled.div`
  position: relative;
  flex: 1;

  svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
    width: 20px;
    height: 20px;
    pointer-events: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 3rem;
  border-radius: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--foreground);
  font-size: 0.95rem;
  font-weight: 500;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb, 79, 70, 229), 0.2);
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
`;

const LevelChipGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LevelChip = styled.button<{ $active: boolean }>`
  padding: 0.6rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid
    ${({ $active }) =>
      $active ? "var(--primary)" : "rgba(var(--border-rgb, 255, 255, 255), 0.1)"};
  background: ${({ $active }) =>
    $active
      ? "rgba(var(--primary-rgb, 79, 70, 229), 0.18)"
      : "var(--surface)"};
  color: ${({ $active }) => ($active ? "var(--primary)" : "var(--text-secondary)")};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;

  &:hover {
    color: var(--foreground);
    border-color: var(--primary);
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryTabBtn = styled.button<{ $active: boolean }>`
  padding: 0.6rem 1.1rem;
  border: none;
  background: ${({ $active }) =>
    $active ? "rgba(var(--primary-rgb, 79, 70, 229), 0.15)" : "transparent"};
  color: ${({ $active }) => ($active ? "var(--primary)" : "var(--text-secondary)")};
  font-weight: ${({ $active }) => ($active ? "800" : "600")};
  font-size: 0.9rem;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: var(--foreground);
  }
`;

// ─── MATERIALS GRID ─────────────────────────────────────────────────────────
const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.75rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: transparent;
    transition: background 0.25s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px -10px rgba(0, 0, 0, 0.25);
    border-color: rgba(var(--primary-rgb, 79, 70, 229), 0.4);

    &::before {
      background: var(--primary);
    }
  }
`;

const CardHeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.1rem;
`;

const IconWrapper = styled.div<{ $colorRgb: string }>`
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: ${({ $colorRgb }) => `rgba(${$colorRgb}, 0.12)`};
  color: ${({ $colorRgb }) => `rgb(${$colorRgb})`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px ${({ $colorRgb }) => `rgba(${$colorRgb}, 0.15)`};

  svg {
    width: 26px;
    height: 26px;
  }
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const LevelBadge = styled.span`
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(var(--foreground-rgb, 255, 255, 255), 0.06);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 0.72rem;
  font-weight: 800;
`;

const TagBadge = styled.span<{ $colorRgb: string }>`
  padding: 3px 8px;
  border-radius: 6px;
  background: ${({ $colorRgb }) => `rgba(${$colorRgb}, 0.15)`};
  color: ${({ $colorRgb }) => `rgb(${$colorRgb})`};
  font-size: 0.72rem;
  font-weight: 700;
`;

const BookmarkBtn = styled.button<{ $bookmarked: boolean }>`
  background: transparent;
  border: none;
  color: ${({ $bookmarked }) => ($bookmarked ? "#f59e0b" : "var(--text-secondary)")};
  cursor: pointer;
  font-size: 1.1rem;
  padding: 4px;
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--foreground);
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;

  .kanji {
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--text-secondary);
  }
`;

const CardDescription = styled.p`
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 1.25rem;
  flex-grow: 1;
`;

const CardMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.78rem;
  color: var(--text-secondary);
  font-weight: 600;
  margin-bottom: 1.25rem;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const CardFooterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionLinkBtn = styled(Link)<{ $colorRgb: string }>`
  flex: 1;
  padding: 0.7rem 1rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.88rem;
  text-decoration: none;
  background: ${({ $colorRgb }) => `rgba(${$colorRgb}, 0.12)`};
  color: ${({ $colorRgb }) => `rgb(${$colorRgb})`};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $colorRgb }) => `rgb(${$colorRgb})`};
    color: #ffffff;
    box-shadow: 0 6px 16px ${({ $colorRgb }) => `rgba(${$colorRgb}, 0.35)`};
  }
`;

const PreviewBtn = styled.button`
  padding: 0.7rem 0.9rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.85rem;
  background: rgba(var(--foreground-rgb, 255, 255, 255), 0.05);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: var(--foreground);
    background: rgba(var(--foreground-rgb, 255, 255, 255), 0.1);
  }
`;

// ─── CHEAT SHEET MODAL ───────────────────────────────────────────────────────
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  max-width: 600px;
  width: 100%;
  padding: 2rem;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
  position: relative;
  max-height: 85vh;
  overflow-y: auto;

  @media (max-width: 640px) {
    padding: 1.25rem;
    border-radius: 18px;
  }
`;

const CloseModalBtn = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 1.25rem;
  cursor: pointer;

  &:hover {
    color: var(--foreground);
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--foreground);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PreviewPoint = styled.div`
  background: rgba(var(--foreground-rgb, 255, 255, 255), 0.03);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1rem;
  margin-bottom: 10px;

  .point-title {
    font-weight: 800;
    font-size: 0.95rem;
    color: var(--primary);
    margin-bottom: 4px;
  }
  .point-desc {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 6px;
  }
  .point-example {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--foreground);
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
    padding: 4px 8px;
    border-radius: 6px;
    display: inline-block;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  .head {
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--foreground);
    margin-bottom: 6px;
  }
`;

// ─── HELPER ICONS ────────────────────────────────────────────────────────────
function RenderIcon({ type }: { type: MateriItem["iconType"] }) {
  switch (type) {
    case "book":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "vocab":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case "dictionary":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      );
    case "lightbulb":
      return <LightBulbIcon size={26} />;
    case "print":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <path d="M6 14h12v8H6z" />
        </svg>
      );
    case "reading":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    default:
      return <span>⭐</span>;
  }
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function MateriHubPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"all" | "curriculum" | "guides" | "printables" | "cheatsheets">("all");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [previewItem, setPreviewItem] = useState<MateriItem | null>(null);

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("materi_bookmarks");
      if (saved) setBookmarks(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("materi_bookmarks", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Filtered materials catalog
  const filteredMaterials = useMemo(() => {
    return MATERI_CATALOG.filter((item) => {
      // Category tab
      if (activeTab !== "all" && item.category !== activeTab) return false;
      // Level filter
      if (selectedLevel !== "All" && item.level !== "All" && item.level !== selectedLevel) return false;
      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchKanji = item.titleKanji?.toLowerCase().includes(q) || false;
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchBadge = item.badgeText.toLowerCase().includes(q);
        return matchTitle || matchKanji || matchDesc || matchBadge;
      }
      return true;
    });
  }, [searchQuery, selectedLevel, activeTab]);

  return (
    <Container>
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Materials" />

      <ContentWrapper>
        {/* HERO HEADER */}
        <HeroHeader>
          <HeroBadge>
            <span>📚 Pusat Materi Pembelajaran</span>
          </HeroBadge>
          <Title>
            Learning Materials
            <span className="kanji-sub">学習センター</span>
          </Title>
          <Subtitle>
            Kuasai Bahasa Jepang secara terstruktur melalui modul Tata Bahasa (Grammar), Kosakata,
            Simulasi JLPT, dan Lembar Latihan Interaktif.
          </Subtitle>
        </HeroHeader>

        {/* PROGRESS BANNER */}
        <ProgressBanner>
          <ProgressInfo>
            <ProgressIconBadge>🎯</ProgressIconBadge>
            <ProgressTextGroup>
              <div className="head">Target Pembelajaran Terstruktur</div>
              <div className="desc">
                Pilih materi sesuai level JLPT Anda dan pantau kemajuan modul secara real-time.
              </div>
            </ProgressTextGroup>
          </ProgressInfo>
          <ResumeBtn onClick={() => router.push("/grammar")}>
            🚀 Lanjutkan Belajar
          </ResumeBtn>
        </ProgressBanner>

        {/* CONTROLS SECTION */}
        <ControlsSection>
          <SearchRow>
            <SearchInputWrap>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <SearchInput
                type="text"
                placeholder="Cari materi, grammar, partikel, kosakata, atau tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchInputWrap>

            <LevelChipGroup>
              {["All", "N5", "N4", "N3", "N2", "N1"].map((lvl) => (
                <LevelChip
                  key={lvl}
                  $active={selectedLevel === lvl}
                  onClick={() => setSelectedLevel(lvl)}
                >
                  {lvl === "All" ? "Semua Level" : `Level ${lvl}`}
                </LevelChip>
              ))}
            </LevelChipGroup>
          </SearchRow>

          <CategoryTabs>
            <CategoryTabBtn $active={activeTab === "all"} onClick={() => setActiveTab("all")}>
              📚 Semua Modul
            </CategoryTabBtn>
            <CategoryTabBtn $active={activeTab === "curriculum"} onClick={() => setActiveTab("curriculum")}>
              🎓 Kurikulum Utama
            </CategoryTabBtn>
            <CategoryTabBtn $active={activeTab === "guides"} onClick={() => setActiveTab("guides")}>
              💡 Tips & Strategi
            </CategoryTabBtn>
            <CategoryTabBtn $active={activeTab === "printables"} onClick={() => setActiveTab("printables")}>
              📝 Printable Sheets
            </CategoryTabBtn>
            <CategoryTabBtn $active={activeTab === "cheatsheets"} onClick={() => setActiveTab("cheatsheets")}>
              🔖 Cheat Sheets
            </CategoryTabBtn>
          </CategoryTabs>
        </ControlsSection>

        {/* MATERIALS GRID */}
        {filteredMaterials.length === 0 ? (
          <EmptyState>
            <div className="icon">📭</div>
            <div className="head">Materi Tidak Ditemukan</div>
            <p>Coba gunakan kata kunci lain atau ubah filter level JLPT Anda.</p>
          </EmptyState>
        ) : (
          <GridSection>
            {filteredMaterials.map((item) => {
              const isBookmarked = bookmarks.includes(item.id);
              return (
                <Card key={item.id}>
                  <div>
                    <CardHeaderRow>
                      <IconWrapper $colorRgb={item.colorRgb}>
                        <RenderIcon type={item.iconType} />
                      </IconWrapper>
                      <BadgeRow>
                        <LevelBadge>{item.level}</LevelBadge>
                        <TagBadge $colorRgb={item.colorRgb}>{item.badgeText}</TagBadge>
                        <BookmarkBtn
                          $bookmarked={isBookmarked}
                          onClick={(e) => toggleBookmark(item.id, e)}
                          title={isBookmarked ? "Hapus dari Bookmark" : "Simpan ke Bookmark"}
                        >
                          {isBookmarked ? "★" : "☆"}
                        </BookmarkBtn>
                      </BadgeRow>
                    </CardHeaderRow>

                    <CardTitle>
                      {item.title}
                      {item.titleKanji && <span className="kanji">({item.titleKanji})</span>}
                    </CardTitle>

                    <CardDescription>{item.description}</CardDescription>

                    <CardMetaRow>
                      <span>⏱️ {item.duration}</span>
                      <span>📖 {item.modulesCount} Sub-topik</span>
                    </CardMetaRow>
                  </div>

                  <CardFooterRow>
                    <ActionLinkBtn href={item.href} $colorRgb={item.colorRgb}>
                      {item.actionText || "Start Learning"}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </ActionLinkBtn>

                    {item.cheatSheetPreview && (
                      <PreviewBtn onClick={() => setPreviewItem(item)}>
                        👁️ Ringkasan
                      </PreviewBtn>
                    )}
                  </CardFooterRow>
                </Card>
              );
            })}
          </GridSection>
        )}
      </ContentWrapper>

      {/* CHEAT SHEET PREVIEW MODAL */}
      {previewItem && previewItem.cheatSheetPreview && (
        <ModalOverlay onClick={() => setPreviewItem(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <CloseModalBtn onClick={() => setPreviewItem(null)}>✕</CloseModalBtn>
            <ModalTitle>
              <span>🔖</span> {previewItem.cheatSheetPreview.summaryTitle}
            </ModalTitle>
            {previewItem.cheatSheetPreview.points.map((pt, idx) => (
              <PreviewPoint key={idx}>
                <div className="point-title">{pt.title}</div>
                <div className="point-desc">{pt.desc}</div>
                {pt.example && <div className="point-example">💡 Contoh: {pt.example}</div>}
              </PreviewPoint>
            ))}
            <div style={{ marginTop: "1.5rem", textTransform: "none" }}>
              <ActionLinkBtn
                href={previewItem.href}
                $colorRgb={previewItem.colorRgb}
                onClick={() => setPreviewItem(null)}
              >
                Pelajari Selengkapnya →
              </ActionLinkBtn>
            </div>
          </ModalCard>
        </ModalOverlay>
      )}
    </Container>
  );
}
