"use client";

import React, { useState, useMemo, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { GAME_CATALOG, GameItem } from "@/data/gameData";
import { useProgress } from "@/context/ProgressContext";

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
    padding: 0.75rem 0.75rem 96px 0.75rem;
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

  @media (max-width: 640px) {
    margin-bottom: 1.1rem;
  }
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

  @media (max-width: 640px) {
    font-size: 0.75rem;
    padding: 4px 10px;
    margin-bottom: 0.5rem;
  }
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
    font-size: 1.75rem;
    .kanji-sub {
      display: block;
      margin-left: 0;
      margin-top: 4px;
      font-size: 1.25rem;
    }
  }

  @media (max-width: 640px) {
    font-size: 1.45rem;
    margin-bottom: 0.4rem;
    .kanji-sub {
      display: inline-block;
      margin-left: 6px;
      margin-top: 0;
      font-size: 1.05rem;
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

  @media (max-width: 640px) {
    font-size: 0.82rem;
    line-height: 1.42;
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

  @media (max-width: 640px) {
    padding: 0.85rem 1rem;
    border-radius: 16px;
    gap: 0.75rem;
    margin-bottom: 1.1rem;
  }
`;

const ProgressInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 640px) {
    gap: 10px;
  }
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

  @media (max-width: 640px) {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    font-size: 1.1rem;
  }
`;

const ProgressTextGroup = styled.div`
  .head {
    font-weight: 800;
    font-size: 1.05rem;
    color: var(--foreground);
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .desc {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .stat-pill {
    font-size: 0.75rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 999px;
    background: rgba(245, 158, 11, 0.18);
    color: #fbbf24;
    border: 1px solid rgba(245, 158, 11, 0.35);
  }

  @media (max-width: 640px) {
    .head {
      font-size: 0.9rem;
    }
    .desc {
      font-size: 0.76rem;
      line-height: 1.35;
    }
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

  @media (max-width: 640px) {
    padding: 0.55rem 0.9rem;
    font-size: 0.8rem;
    border-radius: 10px;
  }
`;

// ─── SEARCH & FILTER CONTROLS ────────────────────────────────────────────────
const ControlsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    gap: 0.65rem;
    margin-bottom: 1.1rem;
  }
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
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

  @media (max-width: 640px) {
    svg {
      left: 12px;
      width: 16px;
      height: 16px;
    }
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
    text-overflow: ellipsis;
  }

  @media (max-width: 640px) {
    padding: 0.6rem 0.75rem 0.6rem 2.25rem;
    font-size: 0.82rem;
    border-radius: 12px;
  }
`;

const LevelChipGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 2px 2px 6px 2px;
  }
`;

const LevelChip = styled.button<{ $active: boolean }>`
  padding: 0.6rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
  border: 1px solid
    ${({ $active }) =>
      $active
        ? "var(--primary)"
        : "rgba(var(--border-rgb, 255, 255, 255), 0.1)"};
  background: ${({ $active }) =>
    $active
      ? "rgba(var(--primary-rgb, 79, 70, 229), 0.18)"
      : "var(--surface)"};
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;

  &:hover {
    color: var(--foreground);
    border-color: var(--primary);
  }

  @media (max-width: 640px) {
    padding: 0.42rem 0.75rem;
    font-size: 0.78rem;
    border-radius: 8px;
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
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding-bottom: 6px;
  }
`;

const CategoryTabBtn = styled.button<{ $active: boolean }>`
  padding: 0.6rem 1.1rem;
  border: none;
  flex-shrink: 0;
  background: ${({ $active }) =>
    $active ? "rgba(var(--primary-rgb, 79, 70, 229), 0.15)" : "transparent"};
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};
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

  @media (max-width: 640px) {
    padding: 0.42rem 0.75rem;
    font-size: 0.78rem;
    border-radius: 8px;
  }
`;

// ─── GAME GRID & CARDS ───────────────────────────────────────────────────────
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

const Card = styled.div<{ $colorRgb: string }>`
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
    box-shadow: 0 16px 32px -10px rgba(0, 0, 0, 0.25),
      0 0 18px ${({ $colorRgb }) => `rgba(${$colorRgb}, 0.2)`};
    border-color: ${({ $colorRgb }) => `rgba(${$colorRgb}, 0.5)`};

    &::before {
      background: ${({ $colorRgb }) => `rgb(${$colorRgb})`};
    }
  }

  @media (max-width: 640px) {
    padding: 1.1rem;
    border-radius: 16px;
  }
`;

const CardHeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 1.1rem;

  @media (max-width: 640px) {
    margin-bottom: 0.85rem;
  }
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
  transition: transform 0.25s ease;

  ${Card}:hover & {
    transform: scale(1.08) rotate(3deg);
  }

  svg {
    width: 26px;
    height: 26px;
  }

  @media (max-width: 640px) {
    width: 42px;
    height: 42px;
    border-radius: 12px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const LevelBadge = styled.span`
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(var(--foreground-rgb, 255, 255, 255), 0.06);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 0.72rem;
  font-weight: 800;
  white-space: nowrap;
`;

const TagBadge = styled.span<{ $colorRgb: string }>`
  padding: 3px 8px;
  border-radius: 6px;
  background: ${({ $colorRgb }) => `rgba(${$colorRgb}, 0.15)`};
  color: ${({ $colorRgb }) => `rgb(${$colorRgb})`};
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

const BookmarkBtn = styled.button<{ $bookmarked: boolean }>`
  background: transparent;
  border: none;
  color: ${({ $bookmarked }) =>
    $bookmarked ? "#f59e0b" : "var(--text-secondary)"};
  cursor: pointer;
  font-size: 1.15rem;
  padding: 2px 4px;
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
  flex-wrap: wrap;

  .kanji {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  @media (max-width: 640px) {
    font-size: 1.05rem;
    margin-bottom: 4px;

    .kanji {
      font-size: 0.8rem;
    }
  }
`;

const CardDescription = styled.p`
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 1.25rem;
  flex-grow: 1;

  @media (max-width: 640px) {
    font-size: 0.8rem;
    line-height: 1.42;
    margin-bottom: 0.75rem;
  }
`;

const CardMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.78rem;
  color: var(--text-secondary);
  font-weight: 600;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  @media (max-width: 640px) {
    font-size: 0.74rem;
    gap: 10px;
    margin-bottom: 0.75rem;
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
  background: ${({ $colorRgb }) => `rgba(${$colorRgb}, 0.14)`};
  color: ${({ $colorRgb }) => `rgb(${$colorRgb})`};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $colorRgb }) => `rgb(${$colorRgb})`};
    color: #ffffff;
    box-shadow: 0 6px 16px ${({ $colorRgb }) => `rgba(${$colorRgb}, 0.35)`};
  }

  @media (max-width: 640px) {
    padding: 0.55rem 0.75rem;
    font-size: 0.8rem;
    border-radius: 10px;

    svg {
      width: 14px;
      height: 14px;
    }
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
  white-space: nowrap;
  transition: all 0.15s ease;

  &:hover {
    color: var(--foreground);
    background: rgba(var(--foreground-rgb, 255, 255, 255), 0.1);
  }

  @media (max-width: 640px) {
    padding: 0.55rem 0.65rem;
    font-size: 0.78rem;
    border-radius: 10px;
  }
`;

// ─── HOW TO PLAY MODAL ───────────────────────────────────────────────────────
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
    line-height: 1.45;
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
  p {
    font-size: 0.9rem;
    max-width: 400px;
    margin: 0 auto 1.25rem;
    line-height: 1.5;
  }
  button {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.15);
    color: var(--primary);
    border: 1px solid rgba(var(--primary-rgb, 79, 70, 229), 0.3);
    padding: 0.6rem 1.2rem;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--primary);
      color: #ffffff;
    }
  }
`;

// ─── HELPER ICONS ────────────────────────────────────────────────────────────
function RenderGameIcon({ type }: { type: GameItem["iconType"] }) {
  switch (type) {
    case "puzzle":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "keyboard":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
          <line x1="6" y1="8" x2="6" y2="8" />
          <line x1="10" y1="8" x2="10" y2="8" />
          <line x1="14" y1="8" x2="14" y2="8" />
          <line x1="18" y1="8" x2="18" y2="8" />
          <line x1="6" y1="12" x2="6" y2="12" />
          <line x1="10" y1="12" x2="10" y2="12" />
          <line x1="14" y1="12" x2="14" y2="12" />
          <line x1="18" y1="12" x2="18" y2="12" />
          <line x1="7" y1="16" x2="17" y2="16" />
        </svg>
      );
    case "sentence":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9" />
          <path d="M11 11v6" />
          <path d="M8 14h6" />
          <path d="M18 4l-6 6" />
        </svg>
      );
    case "conjugation":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <path d="M12 8h4" />
          <path d="M12 12h4" />
          <path d="M12 16h4" />
        </svg>
      );
    case "cards":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="12" height="15" rx="2" />
          <path d="M9 5V3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2" />
        </svg>
      );
    case "daily":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case "quiz":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    default:
      return <span>🎮</span>;
  }
}

// ─── MAIN GAMES HUB PAGE COMPONENT ──────────────────────────────────────────
export default function GamesHubPage() {
  const router = useRouter();
  const { progress } = useProgress();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Semua");
  const [activeTab, setActiveTab] = useState<
    "all" | "reflex" | "puzzle" | "grammar" | "drill" | "quiz" | "favorites"
  >("all");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [previewItem, setPreviewItem] = useState<GameItem | null>(null);

  // User stats derived from progress
  const userStreak = progress?.streak || 0;
  const userExp = progress?.exp || 0;
  const userLevel = Math.floor(Math.sqrt(userExp / 100)) + 1;

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("japanapp_game_bookmarks");
      if (saved) setBookmarks(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem("japanapp_game_bookmarks", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Filtered games catalog
  const filteredGames = useMemo(() => {
    return GAME_CATALOG.filter((item) => {
      // Favorites tab
      if (activeTab === "favorites") {
        if (!bookmarks.includes(item.id)) return false;
      } else if (activeTab !== "all" && item.category !== activeTab) {
        return false;
      }

      // Difficulty filter
      if (
        selectedDifficulty !== "Semua" &&
        item.difficulty !== "Semua" &&
        item.difficulty !== selectedDifficulty
      ) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchKanji = item.titleKanji?.toLowerCase().includes(q) || false;
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchBadge = item.badgeText.toLowerCase().includes(q);
        const matchSkill = item.skillFocus.toLowerCase().includes(q);
        return (
          matchTitle || matchKanji || matchDesc || matchBadge || matchSkill
        );
      }

      return true;
    });
  }, [searchQuery, selectedDifficulty, activeTab, bookmarks]);

  return (
    <Container>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }]}
        current="Games Hub"
      />

      <ContentWrapper>
        {/* HERO HEADER */}
        <HeroHeader>
          <HeroBadge>
            <span>🎮 Pusat Mini-Game & Latihan Interaktif</span>
          </HeroBadge>
          <Title>
            Games Hub
            <span className="kanji-sub">日本語ゲーム</span>
          </Title>
          <Subtitle>
            Asah kemampuan bahasa Jepangmu lewat mini-game seru! Latih refleks
            membaca Kana, pertajam daya ingat kosakata, dan susun kalimat alami
            sambil mengumpulkan bonus XP.
          </Subtitle>
        </HeroHeader>

        {/* PROGRESS BANNER */}
        <ProgressBanner>
          <ProgressInfo>
            <ProgressIconBadge>⚡</ProgressIconBadge>
            <ProgressTextGroup>
              <div className="head">
                Level {userLevel} Pembelajar
                <span className="stat-pill">🔥 {userStreak} Hari Streak</span>
                <span className="stat-pill">💎 {userExp} XP</span>
              </div>
              <div className="desc">
                Bermain game 5 menit sehari dapat melipatgandakan retensi memori
                dan mempercepat penguasaan alfabet Jepang.
              </div>
            </ProgressTextGroup>
          </ProgressInfo>
          <ResumeBtn onClick={() => router.push("/game/speed-typing")}>
            🚀 Mainkan Speed Typing
          </ResumeBtn>
        </ProgressBanner>

        {/* CONTROLS SECTION */}
        <ControlsSection>
          <SearchRow>
            <SearchInputWrap>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <SearchInput
                type="text"
                placeholder="Cari game, refleks, partikel, memori, atau drill kata..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchInputWrap>

            <LevelChipGroup>
              {["Semua", "Pemula", "Menengah", "Tantangan"].map((diff) => (
                <LevelChip
                  key={diff}
                  $active={selectedDifficulty === diff}
                  onClick={() => setSelectedDifficulty(diff)}
                >
                  {diff === "Semua" ? "Semua Level" : diff}
                </LevelChip>
              ))}
            </LevelChipGroup>
          </SearchRow>

          <CategoryTabs>
            <CategoryTabBtn
              $active={activeTab === "all"}
              onClick={() => setActiveTab("all")}
            >
              🎮 Semua Game ({GAME_CATALOG.length})
            </CategoryTabBtn>
            <CategoryTabBtn
              $active={activeTab === "reflex"}
              onClick={() => setActiveTab("reflex")}
            >
              ⚡ Refleks & Kecepatan
            </CategoryTabBtn>
            <CategoryTabBtn
              $active={activeTab === "puzzle"}
              onClick={() => setActiveTab("puzzle")}
            >
              🧩 Puzzle & Memori
            </CategoryTabBtn>
            <CategoryTabBtn
              $active={activeTab === "grammar"}
              onClick={() => setActiveTab("grammar")}
            >
              ⛩️ Tata Bahasa & Kalimat
            </CategoryTabBtn>
            <CategoryTabBtn
              $active={activeTab === "drill"}
              onClick={() => setActiveTab("drill")}
            >
              📖 Konjugasi Kata
            </CategoryTabBtn>
            <CategoryTabBtn
              $active={activeTab === "quiz"}
              onClick={() => setActiveTab("quiz")}
            >
              🎯 Kuis & Tantangan
            </CategoryTabBtn>
            <CategoryTabBtn
              $active={activeTab === "favorites"}
              onClick={() => setActiveTab("favorites")}
            >
              ⭐ Favorit Saya ({bookmarks.length})
            </CategoryTabBtn>
          </CategoryTabs>
        </ControlsSection>

        {/* GAMES GRID */}
        {filteredGames.length === 0 ? (
          <EmptyState>
            <div className="icon">🎮</div>
            <div className="head">Game Tidak Ditemukan</div>
            <p>
              Tidak ada game yang cocok dengan pencarian atau filter yang Anda
              pilih. Coba gunakan kata kunci lain.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDifficulty("Semua");
                setActiveTab("all");
              }}
            >
              Reset Semua Filter
            </button>
          </EmptyState>
        ) : (
          <GridSection>
            {filteredGames.map((item) => {
              const isBookmarked = bookmarks.includes(item.id);
              return (
                <Card key={item.id} $colorRgb={item.colorRgb}>
                  <div>
                    <CardHeaderRow>
                      <IconWrapper $colorRgb={item.colorRgb}>
                        <RenderGameIcon type={item.iconType} />
                      </IconWrapper>
                      <BadgeRow>
                        <LevelBadge>{item.difficulty}</LevelBadge>
                        <TagBadge $colorRgb={item.colorRgb}>
                          {item.badgeText}
                        </TagBadge>
                        <BookmarkBtn
                          $bookmarked={isBookmarked}
                          onClick={(e) => toggleBookmark(item.id, e)}
                          title={
                            isBookmarked
                              ? "Hapus dari Favorit"
                              : "Simpan ke Favorit"
                          }
                        >
                          {isBookmarked ? "★" : "☆"}
                        </BookmarkBtn>
                      </BadgeRow>
                    </CardHeaderRow>

                    <CardTitle>
                      {item.title}
                      {item.titleKanji && (
                        <span className="kanji">({item.titleKanji})</span>
                      )}
                    </CardTitle>

                    <CardDescription>{item.description}</CardDescription>

                    <CardMetaRow>
                      <span>⏱️ {item.duration}</span>
                      <span>🎁 +{item.xpReward} XP</span>
                      <span>🎯 {item.skillFocus}</span>
                    </CardMetaRow>
                  </div>

                  <CardFooterRow>
                    <ActionLinkBtn href={item.href} $colorRgb={item.colorRgb}>
                      {item.actionText || "Main Sekarang"}
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

                    {item.howToPlayPreview && (
                      <PreviewBtn onClick={() => setPreviewItem(item)}>
                        👁️ Cara Main
                      </PreviewBtn>
                    )}
                  </CardFooterRow>
                </Card>
              );
            })}
          </GridSection>
        )}
      </ContentWrapper>

      {/* HOW TO PLAY MODAL */}
      {previewItem && previewItem.howToPlayPreview && (
        <ModalOverlay onClick={() => setPreviewItem(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <CloseModalBtn onClick={() => setPreviewItem(null)}>
              ✕
            </CloseModalBtn>
            <ModalTitle>
              <span>🎮</span> {previewItem.howToPlayPreview.summaryTitle}
            </ModalTitle>
            {previewItem.howToPlayPreview.points.map((pt, idx) => (
              <PreviewPoint key={idx}>
                <div className="point-title">{pt.title}</div>
                <div className="point-desc">{pt.desc}</div>
                {pt.example && (
                  <div className="point-example">💡 Contoh: {pt.example}</div>
                )}
              </PreviewPoint>
            ))}
            <div style={{ marginTop: "1.5rem" }}>
              <ActionLinkBtn
                href={previewItem.href}
                $colorRgb={previewItem.colorRgb}
                onClick={() => setPreviewItem(null)}
              >
                Mulai Main Game Ini Sekarang →
              </ActionLinkBtn>
            </div>
          </ModalCard>
        </ModalOverlay>
      )}
    </Container>
  );
}
