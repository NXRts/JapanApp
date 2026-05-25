'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* ========================================================
   PREMIUM SVG VECTOR ICONS REPRESENTATIONS (CUSTOM DESIGNS)
   ======================================================== */

export function AlphabetIcon({ color }: { color: string }) {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.15))' }}>
      <circle cx="16" cy="17" r="7" fill="url(#sunGradShared)" />
      <path d="M4 10H28M6 13H26M9 13V26M23 13V26M8 8V10M24 8V10" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 7C10 9 22 9 29 7" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      <defs>
        <linearGradient id="sunGradShared" x1="16" y1="10" x2="16" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff4e50" />
          <stop offset="1" stopColor="#f9d423" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function VocabularyIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="22" height="22" rx="4" stroke="url(#boxBorderShared)" strokeWidth="2.5" fill="rgba(255, 255, 255, 0.05)" />
      <path d="M16 5V27M16 16H27" stroke="url(#boxBorderShared)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10.5" cy="10.5" r="4.5" fill="#ffffff" />
      <circle cx="10.5" cy="10.5" r="1.8" fill="#ef4444" />
      <circle cx="21.5" cy="10.5" r="3" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="21.5" cy="10.5" r="1" fill="#ea580c" />
      <rect x="18" y="19" width="7" height="5" rx="1.5" fill="#eab308" />
      <path d="M19.5 21.5H23.5" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
      <defs>
        <linearGradient id="boxBorderShared" x1="5" y1="5" x2="27" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GrammarIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6H26" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
      <circle cx="5" cy="6" r="1.5" fill="#ea580c" />
      <circle cx="27" cy="6" r="1.5" fill="#ea580c" />
      <path d="M8 6V24C8 25.5 9.5 26 11 26H21C22.5 26 24 25.5 24 24V6H8Z" fill="url(#scrollPaperShared)" stroke="#8b5cf6" strokeWidth="2" />
      <path d="M12 10H20M12 14H18M12 18H20" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 12L17 22" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
      <path d="M16.5 23L15.5 25C15.2 25.5 15.8 26 16.2 25.5L17.5 24.2" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="scrollPaperShared" x1="16" y1="6" x2="16" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffbeb" />
          <stop offset="1" stopColor="#fef3c7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ConversationIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.5H7.5C5 21.5 3 19.5 3 17V9.5C3 7 5 5 7.5 5H18.5C21 5 23 7 23 9.5V11" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="rgba(59, 130, 246, 0.15)" />
      <path d="M13.5 11H24.5C27 11 29 13 29 15.5V23C29 25.5 27 27.5 24.5 27.5H19L14.5 30V27.5H13.5C11 27.5 9 25.5 9 23V15.5C9 13 11 11 13.5 11Z" stroke="#60a5fa" strokeWidth="2.2" strokeLinejoin="round" fill="rgba(30, 41, 59, 0.85)" />
      <circle cx="15" cy="19.5" r="1.5" fill="#60a5fa" />
      <circle cx="19" cy="19.5" r="1.5" fill="#60a5fa" />
      <circle cx="23" cy="19.5" r="1.5" fill="#60a5fa" />
    </svg>
  );
}

export function KanjiIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="14" r="8" fill="url(#fujiSunShared)" />
      <path d="M2 28L11.5 13C12.5 11.5 13.5 10 16 10C18.5 10 19.5 11.5 20.5 13L30 28H2Z" fill="url(#mountainGradShared)" />
      <path d="M12.5 14.5L14 19L16 17L18 19L19.5 14.5C18.5 13 17.5 12 16 12C14.5 12 13.5 13 12.5 14.5Z" fill="#ffffff" />
      <path d="M12.5 14.5L16 10L19.5 14.5C18.5 13 17.5 12 16 12C14.5 12 13.5 13 12.5 14.5Z" fill="#ffffff" />
      <path d="M1 28H31" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="fujiSunShared" x1="16" y1="6" x2="16" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f43f5e" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="mountainGradShared" x1="16" y1="10" x2="16" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#312e81" />
          <stop offset="1" stopColor="#1e1b4b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FinanceIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="13" stroke="url(#goldGradShared)" strokeWidth="2.5" fill="rgba(251, 191, 36, 0.08)" />
      <circle cx="16" cy="16" r="10" stroke="url(#goldGradShared)" strokeWidth="1" strokeDasharray="3 2" />
      <path d="M11 9L16 15.5L21 9M16 15.5V25M13 17.5H19M13 20.5H19" stroke="url(#goldGradShared)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="goldGradShared" x1="16" y1="3" x2="16" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fbbf24" />
          <stop offset="0.5" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TravelIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="13" stroke="url(#travelGradShared)" strokeWidth="2.5" fill="rgba(16, 185, 129, 0.08)" />
      <path d="M16 3V6M16 26V29M3 16H6M26 16H29" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 16L19 11L16 5L13 11L16 16Z" fill="#ef4444" stroke="#ef4444" strokeWidth="1" strokeLinejoin="round" />
      <path d="M16 16L13 21L16 27L19 21L16 16Z" fill="#94a3b8" stroke="#64748b" strokeWidth="1" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="2" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
      <defs>
        <linearGradient id="travelGradShared" x1="16" y1="3" x2="16" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10b981" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TrophyIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 10C3.5 10 3.5 15 6 16V10ZM26 10C28.5 10 28.5 15 26 16V10Z" stroke="url(#trophyGradShared)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8H24V16C24 20.5 20.5 22 16 22C11.5 22 8 20.5 8 16V8Z" fill="url(#trophyGradShared)" stroke="#b45309" strokeWidth="1.5" />
      <path d="M13 22V26H11V28H21V26H19V22H13Z" fill="url(#trophyGradShared)" stroke="#b45309" strokeWidth="1.5" />
      <path d="M16 11L17.2 13.5L20 13.9L18 15.9L18.5 18.7L16 17.3L13.5 18.7L14 15.9L12 13.9L14.8 13.5L16 11Z" fill="#ffffff" />
      <circle cx="25" cy="6" r="1" fill="#ffffff" />
      <circle cx="7" cy="22" r="1.2" fill="#ffffff" />
      <defs>
        <linearGradient id="trophyGradShared" x1="16" y1="5" x2="16" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fbbf24" />
          <stop offset="0.5" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(255, 255, 255, 0.35)', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="rgba(255, 255, 255, 0.05)" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1.5" fill="#eab308" stroke="#eab308" strokeWidth="0.5" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ========================================================
   MAPPER & CLASSIFICATION LOGIC FOR DYNAMIC SVG RENDERING
   ======================================================== */

export function getIconType(icon: string, badge: string): string {
  const b = badge.toLowerCase();
  const i = icon;

  if (b.includes('hiragana') || b.includes('katakana') || b.includes('huruf') || b.includes('writing') || b.includes('alphabet')) {
    return 'alphabet';
  }
  if (b.includes('kosakata') || b.includes('vocabulary') || b.includes('word') || i === '🍱' || i === '🏪' || i === '📦' || i === '🎒') {
    return 'vocabulary';
  }
  if (b.includes('grammar') || b.includes('tata bahasa') || b.includes('partikel') || i === '👉' || i === '📝') {
    return 'grammar';
  }
  if (b.includes('percakapan') || b.includes('dialogue') || b.includes('conversation') || b.includes('speech') || i === '🗣️' || i === '🤝' || i === '👨‍👩‍👧‍👦') {
    return 'conversation';
  }
  if (b.includes('kanji') || i === '🗻' || i === '🗼' || i === '⛰️') {
    return 'kanji';
  }
  if (b.includes('hitungan') || b.includes('transaksi') || b.includes('uang') || b.includes('numbers') || i === '🔢' || i === '💴' || i === '💳') {
    return 'finance';
  }
  if (b.includes('travel') || b.includes('arah') || b.includes('navigasi') || i === '🗺️' || i === '🧭' || i === '⏰' || i === '⏳' || i === '🚌' || i === '🚶' || i === '🏨') {
    return 'travel';
  }
  if (b.includes('sintesis') || b.includes('tantangan') || b.includes('challenge') || i === '🏆') {
    return 'trophy';
  }
  return 'vocabulary'; // default fallback
}

interface LessonIconProps {
  icon: string;
  badge: string;
  color: string;
  unlocked: boolean;
}

export function LessonIcon({ icon, badge, color, unlocked }: LessonIconProps) {
  if (!unlocked) {
    return <LockIcon />;
  }

  const type = getIconType(icon, badge);
  switch (type) {
    case 'alphabet':
      return <AlphabetIcon color={color} />;
    case 'vocabulary':
      return <VocabularyIcon />;
    case 'grammar':
      return <GrammarIcon />;
    case 'conversation':
      return <ConversationIcon />;
    case 'kanji':
      return <KanjiIcon />;
    case 'finance':
      return <FinanceIcon />;
    case 'travel':
      return <TravelIcon />;
    case 'trophy':
      return <TrophyIcon />;
    default:
      return <VocabularyIcon />;
  }
}
