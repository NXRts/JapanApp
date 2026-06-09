'use client';

import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import * as wanakana from 'wanakana';
import { KANJI_DATA } from '@/data/kanji';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { allKanji, allVocabulary } from '@/lib/dictionary';

// Define static Kana arrays
const HIRAGANA_ROWS = [
  { label: 'A-Row', chars: ['あ', 'い', 'う', 'え', 'お'] },
  { label: 'Ka-Row', chars: ['か', 'き', 'く', 'け', 'こ'] },
  { label: 'Sa-Row', chars: ['さ', 'し', 'す', 'せ', 'そ'] },
  { label: 'Ta-Row', chars: ['た', 'ち', 'つ', 'て', 'と'] },
  { label: 'Na-Row', chars: ['な', 'に', 'ぬ', 'ね', 'の'] },
  { label: 'Ha-Row', chars: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
  { label: 'Ma-Row', chars: ['ま', 'み', 'む', 'め', 'も'] },
  { label: 'Ya-Row', chars: ['や', 'ゆ', 'よ'] },
  { label: 'Ra-Row', chars: ['ら', 'り', 'る', 'れ', 'ろ'] },
  { label: 'Wa/N-Row', chars: ['わ', 'を', 'ん'] }
];

const KATAKANA_ROWS = [
  { label: 'A-Row', chars: ['ア', 'イ', 'ウ', 'エ', 'オ'] },
  { label: 'Ka-Row', chars: ['カ', 'キ', 'ク', 'ケ', 'コ'] },
  { label: 'Sa-Row', chars: ['サ', 'シ', 'ス', 'セ', 'ソ'] },
  { label: 'Ta-Row', chars: ['タ', 'チ', 'ツ', 'テ', 'ト'] },
  { label: 'Na-Row', chars: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'] },
  { label: 'Ha-Row', chars: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'] },
  { label: 'Ma-Row', chars: ['マ', 'ミ', 'ム', 'メ', 'モ'] },
  { label: 'Ya-Row', chars: ['ヤ', 'ユ', 'ヨ'] },
  { label: 'Ra-Row', chars: ['ラ', 'リ', 'ル', 'レ', 'ロ'] },
  { label: 'Wa/N-Row', chars: ['ワ', 'ヲ', 'ン'] }
];

// Styled Components
const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 90vh;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
  
  @media print {
    padding: 0 !important;
    margin: 0 !important;
    max-width: 100% !important;
  }
`;

const LayoutHeader = styled.div`
  margin-bottom: 2.5rem;
  
  @media print {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 2.5rem;
  align-items: start;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
  
  @media print {
    display: block;
  }
`;

const Sidebar = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: var(--shadow-md);
  
  @media (max-width: 768px) {
    width: 100%;
    &.inactive-mobile-pane {
      display: none !important;
    }
  }
  
  @media print {
    display: none;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;
`;

const TabGroup = styled.div`
  display: flex;
  background: var(--background);
  padding: 4px;
  border-radius: 10px;
  border: 1px solid var(--border);
`;

const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  background: ${props => props.$active ? 'var(--primary)' : 'transparent'};
  color: ${props => props.$active ? 'white' : 'var(--text-secondary)'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: ${props => props.$active ? 'white' : 'var(--foreground)'};
  }
`;

const SelectorPanel = styled.div`
  max-height: 280px;
  overflow-y: auto;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.75rem;
  background: var(--background);
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
  }
`;

const RowGroup = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const RowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
`;

const RowTitleLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-secondary);
`;

const SelectRowLink = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  
  &:hover {
    background: rgba(var(--primary-rgb), 0.1);
  }
`;

const GridSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const CharBox = styled.button<{ $selected: boolean }>`
  width: 38px;
  height: 38px;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Noto Sans JP', sans-serif;
  border-radius: 8px;
  border: 1px solid ${props => props.$selected ? 'var(--primary)' : 'var(--border)'};
  background: ${props => props.$selected ? 'rgba(var(--primary-rgb), 0.1)' : 'var(--surface)'};
  color: ${props => props.$selected ? 'var(--primary)' : 'var(--foreground)'};
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: var(--primary);
    transform: translateY(-1px);
  }
`;

const KanjiSearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--foreground);
  margin-bottom: 0.75rem;
  outline: none;
  
  &:focus {
    border-color: var(--primary);
  }
`;

const LevelFilters = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 0.75rem;
`;

const LevelBadge = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 3px;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 4px;
  border: 1px solid ${props => props.$active ? 'var(--primary)' : 'var(--border)'};
  background: ${props => props.$active ? 'var(--primary)' : 'var(--surface)'};
  color: ${props => props.$active ? 'white' : 'var(--text-secondary)'};
  cursor: pointer;
`;

const CustomTextInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 0.75rem;
  font-size: 0.9rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--foreground);
  resize: none;
  outline: none;
  font-family: inherit;
  
  &:focus {
    border-color: var(--primary);
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--text-secondary);
  cursor: pointer;
  user-select: none;
  margin-top: 0.5rem;
  
  input {
    cursor: pointer;
  }
`;

const SelectionActions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 0.5rem;
`;

const ActionBtn = styled.button`
  flex: 1;
  padding: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  cursor: pointer;
  
  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  padding: 0.35rem 0;
  gap: 12px;
`;

const SettingLabel = styled.span`
  font-weight: 600;
  color: var(--foreground);
  line-height: 1.3;
`;

const SelectControl = styled.select`
  padding: 0.4rem 0.75rem;
  font-size: 0.8rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--foreground);
  outline: none;
  cursor: pointer;
  max-width: 160px;
  flex-shrink: 0;
  
  &:focus {
    border-color: var(--primary);
  }
`;

const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 130px;
  flex-shrink: 0;
  
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: 100%;
    min-width: 0;
    flex: 1;
  }

  /* Webkit Track */
  input[type="range"]::-webkit-slider-runnable-track {
    background: var(--border);
    height: 6px;
    border-radius: 999px;
  }

  /* Webkit Thumb */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    margin-top: -5px;
    background-color: var(--primary);
    height: 16px;
    width: 16px;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    transition: background-color 0.15s, transform 0.15s;
  }
  input[type="range"]::-webkit-slider-thumb:hover {
    background-color: var(--primary-light);
    transform: scale(1.15);
  }

  /* Moz Track */
  input[type="range"]::-moz-range-track {
    background: var(--border);
    height: 6px;
    border-radius: 999px;
  }

  /* Moz Thumb */
  input[type="range"]::-moz-range-thumb {
    border: none;
    background-color: var(--primary);
    height: 16px;
    width: 16px;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    transition: background-color 0.15s, transform 0.15s;
  }
  input[type="range"]::-moz-range-thumb:hover {
    background-color: var(--primary-light);
    transform: scale(1.15);
  }
  
  span {
    font-size: 0.8rem;
    font-weight: 700;
    width: 32px;
    text-align: right;
    color: var(--foreground);
    flex-shrink: 0;
  }
`;

const CheckboxControl = styled.input`
  cursor: pointer;
  width: 18px;
  height: 18px;
  accent-color: var(--primary);
  flex-shrink: 0;
`;

const PrintButton = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.25);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(var(--primary-rgb), 0.35);
  }
`;

const MobileNavigationTabs = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 6px;
    margin-bottom: 1.5rem;
    gap: 8px;
    width: 100%;
    box-sizing: border-box;
  }
  
  @media print {
    display: none !important;
  }
`;

const MobileNavButton = styled.button<{ $active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  background: ${props => props.$active ? 'var(--primary)' : 'transparent'};
  color: ${props => props.$active ? 'white' : 'var(--text-secondary)'};
  cursor: pointer;
  transition: all 0.25s ease;
  
  &:hover {
    color: ${props => props.$active ? 'white' : 'var(--foreground)'};
  }
`;

const MobileOnlyPreviewBtn = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 0.85rem;
    background: rgba(var(--primary-rgb), 0.1);
    color: var(--primary);
    border: 1px solid var(--primary-light);
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    margin-top: 0.75rem;
    transition: all 0.2s;
    
    &:hover {
      background: rgba(var(--primary-rgb), 0.15);
      transform: translateY(-1px);
    }
  }
  
  @media print {
    display: none !important;
  }
`;

const MobileOnlyPrintWrapper = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 794px;
    margin-bottom: 1.25rem;
    
    button {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25) !important;
    }
  }
  
  @media print {
    display: none !important;
  }
`;

// Preview Frame Styles
const PreviewPane = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    padding: 0.25rem;
    box-sizing: border-box;
    &.inactive-mobile-pane {
      display: none !important;
    }
  }
  
  @media print {
    display: block;
    width: 100%;
  }
`;

const QuickTips = styled.div`
  background: rgba(var(--primary-rgb), 0.05);
  border: 1px dashed var(--primary-light);
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  max-width: 794px;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  display: flex;
  gap: 12px;
  align-items: center;
  
  @media print {
    display: none;
  }
  
  svg {
    flex-shrink: 0;
    color: var(--primary);
  }
`;

const PreviewHeading = styled.div`
  width: 100%;
  max-width: 794px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media print {
    display: none;
  }
  
  span {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-secondary);
  }
`;

// Paper container scaled to A4 aspect ratio on screen
const A4Sheet = styled.div<{ $landscape?: boolean }>`
  width: ${props => props.$landscape ? '1123px' : '794px'};
  min-height: ${props => props.$landscape ? '794px' : '1123px'};
  padding: 20mm 15mm;
  background: white;
  color: black;
  box-shadow: var(--shadow-lg);
  border-radius: 8px;
  margin-bottom: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: 'Noto Sans JP', sans-serif;
  
  &:not(:last-child) {
    page-break-after: always;
  }
  
  @media (max-width: 1024px) {
    /* Scale sheet previews on smaller viewports */
    transform: scale(0.9);
    transform-origin: top center;
    margin-bottom: -60px;
  }
  @media (max-width: 768px) {
    transform: scale(0.65);
    margin-bottom: -320px;
  }
  @media (max-width: 480px) {
    transform: scale(0.45);
    margin-bottom: -520px;
  }
  
  @media print {
    width: 100% !important;
    height: ${props => props.$landscape ? '210mm' : '297mm'} !important;
    max-height: ${props => props.$landscape ? '210mm' : '297mm'} !important;
    min-height: 0 !important;
    padding: 12mm 12mm 10mm 12mm !important;
    margin: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    transform: none !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
  }
`;

const PaperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid #000;
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
  
  .title-section {
    h2 {
      font-size: 1.4rem;
      font-weight: 800;
      color: #000;
      letter-spacing: 0.05em;
    }
    p {
      font-size: 0.75rem;
      color: #555;
      margin-top: 0.2rem;
    }
  }
  
  .meta-section {
    display: flex;
    gap: 1.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    
    span {
      border-bottom: 1px solid #000;
      padding-bottom: 2px;
      min-width: 120px;
      display: inline-block;
    }
  }
`;

const WorksheetContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const CharacterRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  page-break-inside: avoid;
  break-inside: avoid;
`;

const RowHeaderLabel = styled.div`
  display: flex;
  gap: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #000;
  padding-left: 2px;
  
  .meaning {
    font-weight: 500;
    color: #444;
  }
`;

const GridCells = styled.div`
  display: flex;
  gap: 6px;
`;

const WritingCell = styled.div<{ $size: number; $isTrace?: boolean; $traceOpacity: number }>`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border: 1.5px solid #000000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: ${props => props.$isTrace ? `rgba(0, 0, 0, ${props.$traceOpacity})` : '#000000'};
  font-size: ${props => props.$size * 0.65}px;
  font-family: 'Noto Sans JP', sans-serif;
  user-select: none;
`;

const GenkouyoushiLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    border-top: 1px dashed rgba(0, 0, 0, 0.2);
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    height: 100%;
    border-left: 1px dashed rgba(0, 0, 0, 0.2);
  }
`;

const EmptyStateMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  border: 2px dashed var(--border);
  border-radius: 12px;
  color: var(--text-secondary);
  font-size: 1rem;
  gap: 12px;
  padding: 2rem;
  text-align: center;
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  width: 100%;
  max-width: 794px;
`;

const FooterCredits = styled.div`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  color: #777;
`;

// ========================================================
// FLASHCARD STYLED COMPONENTS & HELPERS
// ========================================================

const svgCache: Record<string, string> = {};

function KanjiStrokeSvg({ char }: { char: string }) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!char) return;
    if (svgCache[char]) {
      setSvgContent(svgCache[char]);
      return;
    }
    setLoading(true);
    const hex = char.charCodeAt(0).toString(16).padStart(5, '0');
    fetch(`https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then((text) => {
        const cleanedText = text
          .replace(/style="[^"]*"/g, '')
          .replace(/width="[^"]*"/g, 'width="100%"')
          .replace(/height="[^"]*"/g, 'height="100%"');
        svgCache[char] = cleanedText;
        setSvgContent(cleanedText);
        setLoading(false);
      })
      .catch(() => {
        setSvgContent(null);
        setLoading(false);
      });
  }, [char]);

  if (loading) {
    return <div style={{ fontSize: '0.6rem', color: '#888' }}>Loading...</div>;
  }

  if (!svgContent) {
    return (
      <div
        style={{
          fontSize: '2.5rem',
          fontFamily: "'Noto Serif JP', serif",
          color: '#ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          border: '1px dashed #eee'
        }}
      >
        {char}
      </div>
    );
  }

  return (
    <div
      className="stroke-svg-container"
      dangerouslySetInnerHTML={{ __html: svgContent }}
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    />
  );
}

const FlashcardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 3.5in);
  grid-template-rows: repeat(4, 2.5in);
  gap: 0;
  width: 7in;
  height: 10in;
  margin: 0 auto;
  box-sizing: border-box;
  background: white;
  
  @media print {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    page-break-inside: avoid !important;
  }
`;

const FlashcardCell = styled.div`
  width: 3.5in;
  height: 2.5in;
  border: 1px dashed #ccc;
  box-sizing: border-box;
  overflow: hidden;
  background: white;
  color: black;
  position: relative;
  
  @media print {
    border: 1px dashed #999;
  }
`;

const CardFront = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0.3in;
  position: relative;
`;

const CardFrontLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
`;

const CardFrontWord = styled.div`
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 0.2in;
  color: #111;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const CardFrontRight = styled.div`
  flex: 1.2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Serif JP', serif;
  font-size: 1.1in;
  font-weight: bold;
  line-height: 1;
  color: #000;
`;

const CardBack = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0.2in 0.25in;
`;

const CardBackTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 1.1in;
`;

const CardBackTopLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
`;

const CardBackReadingsLabel = styled.span`
  font-size: 0.09in;
  font-weight: 700;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 1px;
`;

const CardBackReadingsValue = styled.span`
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 0.15in;
  color: #000;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardBackMeaning = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.14in;
  font-weight: 700;
  color: #111;
  margin-top: 4px;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardBackTopRight = styled.div`
  width: 0.85in;
  height: 0.85in;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fafafa;
  flex-shrink: 0;
  margin-left: 8px;
`;

const CardBackDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #eee;
  margin: 5px 0;
`;

const CardBackBottom = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  min-width: 0;
`;

const CardBackExampleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 0.12in;
  line-height: 1.3;
  width: 100%;
`;

const CardBackExampleWord = styled.span`
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 700;
  color: #000;
  white-space: nowrap;
`;

const CardBackExampleReading = styled.span`
  font-family: 'Noto Sans JP', sans-serif;
  color: #666;
  font-size: 0.1in;
  white-space: nowrap;
`;

const CardBackExampleMeaning = styled.span`
  font-family: 'Inter', sans-serif;
  color: #444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
`;

export default function PracticeSheetsPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<'settings' | 'preview'>('settings');
  // Navigation & Data tabs
  const [activeTab, setActiveTab] = useState<'kana' | 'kanji' | 'custom'>('kana');
  const [kanaTab, setKanaTab] = useState<'hiragana' | 'katakana'>('hiragana');
  const [kanjiLevel, setKanjiLevel] = useState<'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('N5');
  const [kanjiSearch, setKanjiSearch] = useState('');
  const [sheetType, setSheetType] = useState<'worksheet' | 'flashcards'>('worksheet');

  // Selected Characters
  const [selectedChars, setSelectedChars] = useState<string[]>([]);
  const [customText, setCustomText] = useState('');
  const [convertRomaji, setConvertRomaji] = useState(true);

  // Settings State
  const [gridStyle, setGridStyle] = useState<'genkouyoushi' | 'plain'>('genkouyoushi');
  const [practiceMode, setPracticeMode] = useState<'trace' | 'fullTrace' | 'empty'>('trace');
  const [cellSize, setCellSize] = useState<'large' | 'medium' | 'small'>('medium');
  const [traceCount, setTraceCount] = useState(2);
  const [traceOpacity, setTraceOpacity] = useState(0.25);
  const [showMetadata, setShowMetadata] = useState(true);
  const [showHeaders, setShowHeaders] = useState(true);
  const [landscape, setLandscape] = useState(false);

  // Print references
  const printAreaRef = useRef<HTMLDivElement>(null);

  // Load selections / settings from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const savedSettings = localStorage.getItem('sheet-generator-settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        if (parsed.gridStyle) setGridStyle(parsed.gridStyle);
        if (parsed.practiceMode) setPracticeMode(parsed.practiceMode);
        if (parsed.cellSize) setCellSize(parsed.cellSize);
        if (parsed.traceCount !== undefined) setTraceCount(parsed.traceCount);
        if (parsed.traceOpacity !== undefined) setTraceOpacity(parsed.traceOpacity);
        if (parsed.showMetadata !== undefined) setShowMetadata(parsed.showMetadata);
        if (parsed.showHeaders !== undefined) setShowHeaders(parsed.showHeaders);
        if (parsed.landscape !== undefined) setLandscape(parsed.landscape);
        if (parsed.sheetType) setSheetType(parsed.sheetType);
      }

      const savedChars = localStorage.getItem('sheet-generator-chars');
      if (savedChars) {
        setSelectedChars(JSON.parse(savedChars));
      }
      
      const savedCustomText = localStorage.getItem('sheet-generator-custom-text');
      if (savedCustomText) {
        setCustomText(savedCustomText);
      }
      
      const savedActiveTab = localStorage.getItem('sheet-generator-tab');
      if (savedActiveTab) {
        setActiveTab(savedActiveTab as 'kana' | 'kanji' | 'custom');
      }
    } catch (e) {
      console.error('Failed to load local storage configurations:', e);
    }
  }, []);

  // Save configurations on changes
  useEffect(() => {
    const settings = {
      gridStyle,
      practiceMode,
      cellSize,
      traceCount,
      traceOpacity,
      showMetadata,
      showHeaders,
      landscape,
      sheetType
    };
    localStorage.setItem('sheet-generator-settings', JSON.stringify(settings));
  }, [gridStyle, practiceMode, cellSize, traceCount, traceOpacity, showMetadata, showHeaders, landscape, sheetType]);

  const getCardDetails = (char: string) => {
    // 1. Look up in allKanji database
    const found = allKanji.find((k) => k.kanji === char);
    if (found) {
      // Prioritize hardcoded examples in KANJI_DATA if they exist
      let examples: { word: string; reading: string; meaning: string }[] = [];
      for (const lvl of ['N5', 'N4', 'N3', 'N2', 'N1'] as const) {
        const hFound = KANJI_DATA[lvl]?.find((k) => k.char === char);
        if (hFound && hFound.examples) {
          examples = hFound.examples;
          break;
        }
      }

      // If no hardcoded examples, dynamically generate from allVocabulary
      if (examples.length === 0) {
        examples = allVocabulary
          .filter((v) => v.word && v.word.includes(char))
          .slice(0, 4)
          .map((v) => ({
            word: v.word || '',
            reading: v.reading || '',
            meaning: v.meaning || ''
          }));
      }

      return {
        char,
        meaning: found.meaning || '',
        on: found.onyomi && found.onyomi.length > 0 ? found.onyomi.join('・') : '',
        kun: found.kunyomi && found.kunyomi.length > 0 ? found.kunyomi.join('・') : '',
        strokes: found.stroke_count || 0,
        examples
      };
    }

    const isKanaChar = wanakana.isKana(char);
    const romaji = isKanaChar ? wanakana.toRomaji(char) : '';
    return {
      char,
      meaning: isKanaChar ? 'Kana Character' : 'Custom character',
      on: isKanaChar ? `Romaji: ${romaji}` : '',
      kun: '',
      strokes: 0,
      examples: []
    };
  };

  // Save selected characters
  useEffect(() => {
    localStorage.setItem('sheet-generator-chars', JSON.stringify(selectedChars));
  }, [selectedChars]);

  // Handle Custom Text input changes
  const handleCustomTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let val = e.target.value;
    if (convertRomaji) {
      // Auto convert Romaji input to Kana in real time
      val = wanakana.toKana(val);
    }
    setCustomText(val);
    localStorage.setItem('sheet-generator-custom-text', val);
  };

  // Auto conversion toggle
  const toggleConvertRomaji = () => {
    const nextVal = !convertRomaji;
    setConvertRomaji(nextVal);
    if (nextVal && customText) {
      const converted = wanakana.toKana(customText);
      setCustomText(converted);
      localStorage.setItem('sheet-generator-custom-text', converted);
    }
  };

  // Toggle character selection
  const toggleChar = (char: string) => {
    setSelectedChars(prev => 
      prev.includes(char) ? prev.filter(c => c !== char) : [...prev, char]
    );
  };

  // Select all kana in current sub-tab
  const selectAllKana = () => {
    const rows = kanaTab === 'hiragana' ? HIRAGANA_ROWS : KATAKANA_ROWS;
    const allChars = rows.flatMap(r => r.chars);
    setSelectedChars(prev => {
      const filtered = prev.filter(c => !allChars.includes(c)); // clear current ones
      return [...filtered, ...allChars]; // add all
    });
  };

  // Select a specific row of Kana
  const selectRow = (chars: string[]) => {
    setSelectedChars(prev => {
      const hasAll = chars.every(c => prev.includes(c));
      if (hasAll) {
        // Remove row characters
        return prev.filter(c => !chars.includes(c));
      } else {
        // Add missing row characters
        const missing = chars.filter(c => !prev.includes(c));
        return [...prev, ...missing];
      }
    });
  };

  // Select all Kanji in current filtered list
  const selectAllKanji = () => {
    const list = getFilteredKanji();
    const chars = list.map(k => k.char);
    setSelectedChars(prev => {
      const filtered = prev.filter(c => !chars.includes(c));
      return [...filtered, ...chars];
    });
  };

  // Clear selections
  const clearSelections = () => {
    setSelectedChars([]);
    setCustomText('');
    localStorage.removeItem('sheet-generator-custom-text');
  };

  // Get active character list to render on worksheet
  const getActiveCharacters = () => {
    if (activeTab === 'custom') {
      // Clean custom text to only characters that aren't empty whitespace
      return customText.replace(/\s+/g, '').split('');
    }
    return selectedChars;
  };

  // Get filtered Kanji list
  const getFilteredKanji = () => {
    const levelData = allKanji
      .filter(k => k.level === kanjiLevel)
      .map(k => ({
        char: k.kanji || '',
        meaning: k.meaning || '',
        on: k.onyomi ? k.onyomi.join('・') : '',
        kun: k.kunyomi ? k.kunyomi.join('・') : '',
        strokes: k.stroke_count || 0
      }));

    if (!kanjiSearch) return levelData;
    const searchLower = kanjiSearch.toLowerCase();
    return levelData.filter(k => 
      k.char.includes(kanjiSearch) || 
      k.meaning.toLowerCase().includes(searchLower) ||
      k.on.includes(kanjiSearch) ||
      k.kun.includes(kanjiSearch)
    );
  };

  // Character layout parameters based on cell size and paper orientation
  const getCellParameters = () => {
    if (landscape) {
      switch (cellSize) {
        case 'large':
          return { size: 70, cellsPerRow: 13, rowsPerPage: 5 };
        case 'small':
          return { size: 38, cellsPerRow: 22, rowsPerPage: 7 };
        case 'medium':
        default:
          return { size: 50, cellsPerRow: 17, rowsPerPage: 6 };
      }
    } else {
      switch (cellSize) {
        case 'large':
          return { size: 70, cellsPerRow: 8, rowsPerPage: 8 };
        case 'small':
          return { size: 38, cellsPerRow: 15, rowsPerPage: 11 };
        case 'medium':
        default:
          return { size: 50, cellsPerRow: 12, rowsPerPage: 9 };
      }
    }
  };

  // Helper: Get Romaji label for Kana or English meaning for Kanji
  const getCharacterHeaderLabel = (char: string) => {
    if (wanakana.isKana(char)) {
      return wanakana.toRomaji(char);
    }
    // Search in allKanji database
    const found = allKanji.find(k => k.kanji === char);
    if (found) {
      return `${found.meaning} (${found.stroke_count || 0} strokes)`;
    }
    return '';
  };

  // Split selected characters into pages
  const paginateCharacters = (chars: string[], rowsPerPage: number) => {
    const pages: string[][] = [];
    for (let i = 0; i < chars.length; i += rowsPerPage) {
      pages.push(chars.slice(i, i + rowsPerPage));
    }
    return pages;
  };

  const charactersToRender = mounted ? getActiveCharacters() : [];
  const { size: cellSizePx, cellsPerRow, rowsPerPage } = getCellParameters();
  const flashcardsPerPage = 8;
  const paginatedPages = paginateCharacters(charactersToRender, sheetType === 'flashcards' ? flashcardsPerPage : rowsPerPage);

  const handlePrint = () => {
    window.print();
  };

  return (
    <PageContainer>
      <LayoutHeader>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Materials', href: '/materi' }]} current="Practice Sheets" />
        <Title>Printable Practice Sheets</Title>
        <Subtitle>Generate beautiful, custom Japanese handwriting grids (Genkouyoushi) to practice offline.</Subtitle>
      </LayoutHeader>

      {mounted && (
        <MobileNavigationTabs>
          <MobileNavButton 
            $active={mobileActiveTab === 'settings'} 
            onClick={() => setMobileActiveTab('settings')}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128c.332-.183.582-.495.645-.869l.214-1.28z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Setelan
          </MobileNavButton>
          <MobileNavButton 
            $active={mobileActiveTab === 'preview'} 
            onClick={() => setMobileActiveTab('preview')}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Pratinjau ({paginatedPages.length} Hlm)
          </MobileNavButton>
        </MobileNavigationTabs>
      )}

      <MainGrid>
        {/* Sidebar Controls */}
        <Sidebar className={mobileActiveTab === 'settings' ? 'active-mobile-pane' : 'inactive-mobile-pane'}>
          <div>
            <SectionTitle>
              <span>1. Select Mode</span>
            </SectionTitle>
            <TabGroup style={{ marginBottom: '1.5rem' }}>
              <TabButton $active={sheetType === 'worksheet'} onClick={() => setSheetType('worksheet')}>
                Worksheet
              </TabButton>
              <TabButton $active={sheetType === 'flashcards'} onClick={() => setSheetType('flashcards')}>
                Flashcards
              </TabButton>
            </TabGroup>
          </div>

          <div>
            <SectionTitle>
              <span>2. Choose Characters</span>
            </SectionTitle>
            
            <TabGroup style={{ marginBottom: '1rem' }}>
              <TabButton $active={activeTab === 'kana'} onClick={() => { setActiveTab('kana'); localStorage.setItem('sheet-generator-tab', 'kana'); }}>
                Kana
              </TabButton>
              <TabButton $active={activeTab === 'kanji'} onClick={() => { setActiveTab('kanji'); localStorage.setItem('sheet-generator-tab', 'kanji'); }}>
                Kanji
              </TabButton>
              <TabButton $active={activeTab === 'custom'} onClick={() => { setActiveTab('custom'); localStorage.setItem('sheet-generator-tab', 'custom'); }}>
                Custom Text
              </TabButton>
            </TabGroup>

            {/* KANA SUB PANEL */}
            {activeTab === 'kana' && (
              <>
                <TabGroup style={{ marginBottom: '0.75rem', padding: '2px' }}>
                  <TabButton $active={kanaTab === 'hiragana'} onClick={() => setKanaTab('hiragana')}>
                    Hiragana
                  </TabButton>
                  <TabButton $active={kanaTab === 'katakana'} onClick={() => setKanaTab('katakana')}>
                    Katakana
                  </TabButton>
                </TabGroup>
                
                <SelectionActions>
                  <ActionBtn onClick={selectAllKana}>Select All</ActionBtn>
                  <ActionBtn onClick={clearSelections}>Clear All</ActionBtn>
                </SelectionActions>

                <SelectorPanel>
                  {kanaTab === 'hiragana' ? (
                    HIRAGANA_ROWS.map(row => (
                      <RowGroup key={row.label}>
                        <RowHeader>
                          <RowTitleLabel>{row.label}</RowTitleLabel>
                          <SelectRowLink onClick={() => selectRow(row.chars)}>
                            {row.chars.every(c => selectedChars.includes(c)) ? 'Deselect' : 'Select'}
                          </SelectRowLink>
                        </RowHeader>
                        <GridSelector>
                          {row.chars.map(c => (
                            <CharBox 
                              key={c} 
                              $selected={selectedChars.includes(c)}
                              onClick={() => toggleChar(c)}
                            >
                              {c}
                            </CharBox>
                          ))}
                        </GridSelector>
                      </RowGroup>
                    ))
                  ) : (
                    KATAKANA_ROWS.map(row => (
                      <RowGroup key={row.label}>
                        <RowHeader>
                          <RowTitleLabel>{row.label}</RowTitleLabel>
                          <SelectRowLink onClick={() => selectRow(row.chars)}>
                            {row.chars.every(c => selectedChars.includes(c)) ? 'Deselect' : 'Select'}
                          </SelectRowLink>
                        </RowHeader>
                        <GridSelector>
                          {row.chars.map(c => (
                            <CharBox 
                              key={c} 
                              $selected={selectedChars.includes(c)}
                              onClick={() => toggleChar(c)}
                            >
                              {c}
                            </CharBox>
                          ))}
                        </GridSelector>
                      </RowGroup>
                    ))
                  )}
                </SelectorPanel>
              </>
            )}

            {/* KANJI SUB PANEL */}
            {activeTab === 'kanji' && (
              <>
                <KanjiSearchInput 
                  type="text" 
                  placeholder="Search Kanji or Meaning..." 
                  value={kanjiSearch}
                  onChange={(e) => setKanjiSearch(e.target.value)}
                />
                
                <LevelFilters>
                  {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map(lvl => (
                    <LevelBadge 
                      key={lvl} 
                      $active={kanjiLevel === lvl}
                      onClick={() => setKanjiLevel(lvl)}
                    >
                      {lvl}
                    </LevelBadge>
                  ))}
                </LevelFilters>

                <SelectionActions>
                  <ActionBtn onClick={selectAllKanji}>Select All {kanjiLevel}</ActionBtn>
                  <ActionBtn onClick={clearSelections}>Clear All</ActionBtn>
                </SelectionActions>

                <SelectorPanel>
                  <GridSelector>
                    {getFilteredKanji().map(k => (
                      <CharBox 
                        key={k.char} 
                        $selected={selectedChars.includes(k.char)}
                        onClick={() => toggleChar(k.char)}
                        title={k.meaning}
                      >
                        {k.char}
                      </CharBox>
                    ))}
                    {getFilteredKanji().length === 0 && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', width: '100%', padding: '1rem 0' }}>
                        No matching Kanji found
                      </div>
                    )}
                  </GridSelector>
                </SelectorPanel>
              </>
            )}

            {/* CUSTOM TEXT PANEL */}
            {activeTab === 'custom' && (
              <>
                <CustomTextInput 
                  placeholder="Type Japanese text, or Romaji (auto-converts) to generate custom writing worksheets..."
                  value={customText}
                  onChange={handleCustomTextChange}
                />
                <CheckboxLabel>
                  <CheckboxControl 
                    type="checkbox" 
                    checked={convertRomaji} 
                    onChange={toggleConvertRomaji}
                  />
                  <span>Convert Romaji to Kana automatically</span>
                </CheckboxLabel>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <ActionBtn style={{ flex: 'none', padding: '4px 12px' }} onClick={clearSelections}>Clear Text</ActionBtn>
                </div>
              </>
            )}
          </div>

          {sheetType === 'worksheet' ? (
            <div>
              <SectionTitle>
                <span>3. Sheet Style</span>
              </SectionTitle>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <SettingRow>
                  <SettingLabel>Grid Guidelines</SettingLabel>
                  <SelectControl 
                    value={gridStyle} 
                    onChange={(e) => setGridStyle(e.target.value as any)}
                  >
                    <option value="genkouyoushi">Genkouyoushi (Dashed +)</option>
                    <option value="plain">Plain Borders Only</option>
                  </SelectControl>
                </SettingRow>

                <SettingRow>
                  <SettingLabel>Worksheet Layout</SettingLabel>
                  <SelectControl 
                    value={practiceMode} 
                    onChange={(e) => setPracticeMode(e.target.value as any)}
                  >
                    <option value="trace">Reference + Tracing + Blank</option>
                    <option value="fullTrace">All Tracing Boxes</option>
                    <option value="empty">Reference + Blank Grid</option>
                  </SelectControl>
                </SettingRow>

                <SettingRow>
                  <SettingLabel>Cell Box Size</SettingLabel>
                  <SelectControl 
                    value={cellSize} 
                    onChange={(e) => setCellSize(e.target.value as any)}
                  >
                    <option value="large">Large (8 rows/page)</option>
                    <option value="medium">Medium (9 rows/page)</option>
                    <option value="small">Small (11 rows/page)</option>
                  </SelectControl>
                </SettingRow>

                {practiceMode === 'trace' && (
                  <SettingRow>
                    <SettingLabel>Tracing Guides</SettingLabel>
                    <RangeContainer>
                      <input 
                        type="range" 
                        min="1" 
                        max="5" 
                        value={traceCount} 
                        onChange={(e) => setTraceCount(Number(e.target.value))}
                      />
                      <span>{traceCount}</span>
                    </RangeContainer>
                  </SettingRow>
                )}

                {practiceMode !== 'empty' && (
                  <SettingRow>
                    <SettingLabel>Jiplat (Trace) Opacity</SettingLabel>
                    <RangeContainer>
                      <input 
                        type="range" 
                        min="0.1" 
                        max="0.5" 
                        step="0.05"
                        value={traceOpacity} 
                        onChange={(e) => setTraceOpacity(Number(e.target.value))}
                      />
                      <span>{Math.round(traceOpacity * 100)}%</span>
                    </RangeContainer>
                  </SettingRow>
                )}

                <SettingRow>
                  <SettingLabel>Include Romaji/Meaning</SettingLabel>
                  <CheckboxControl 
                    type="checkbox" 
                    checked={showHeaders} 
                    onChange={(e) => setShowHeaders(e.target.checked)}
                  />
                </SettingRow>

                <SettingRow>
                  <SettingLabel>Paper Header fields</SettingLabel>
                  <CheckboxControl 
                    type="checkbox" 
                    checked={showMetadata} 
                    onChange={(e) => setShowMetadata(e.target.checked)}
                  />
                </SettingRow>

                <SettingRow>
                  <SettingLabel>Landscape Orientation</SettingLabel>
                  <CheckboxControl 
                    type="checkbox" 
                    checked={landscape} 
                    onChange={(e) => setLandscape(e.target.checked)}
                  />
                </SettingRow>
              </div>
            </div>
          ) : (
            <div>
              <SectionTitle>
                <span>3. Card Info</span>
              </SectionTitle>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, background: 'rgba(var(--primary-rgb), 0.05)', padding: '16px', borderRadius: '12px', border: '1px dashed var(--primary-light)' }}>
                <strong>Flashcards Layout:</strong> Generates standard 3.5" x 2.5" flashcards optimized for 8 cards per page (A4/Letter). 
                <br/><br/>
                Prints two-sided automatically with horizontal column flipping so card front and back align perfectly.
              </div>
            </div>
          )}

          <div style={{ marginTop: '0.5rem' }}>
            {mounted && (
              <PrintButton onClick={handlePrint} disabled={charactersToRender.length === 0}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 19.164h10.56M16.5 15.75v3.437m-9 0V15.75M9 10.5h6M5.22 10.5h13.56c.928 0 1.62.83 1.48 1.744l-1.05 6.75a1.5 1.5 0 01-1.48 1.256H6.07a1.5 1.5 0 01-1.48-1.256l-1.05-6.75a1.5 1.5 0 011.48-1.744zM16.5 7.5v-3a1.5 1.5 0 00-1.5-1.5h-6A1.5 1.5 0 007.5 4.5v3M19.5 10.5h.008v.008h-.008V10.5z" />
                </svg>
                Print Practice Sheet
              </PrintButton>
            )}

            {/* Mobile-Only Action to switch to Preview tab */}
            {mounted && (
              <MobileOnlyPreviewBtn onClick={() => setMobileActiveTab('preview')}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Lihat Pratinjau ({paginatedPages.length} Hlm)
              </MobileOnlyPreviewBtn>
            )}
          </div>
        </Sidebar>

        {/* Live Preview Pane */}
        <PreviewPane className={mobileActiveTab === 'preview' ? 'active-mobile-pane' : 'inactive-mobile-pane'}>
          <QuickTips>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <strong>Print Optimizations:</strong> When the browser print window opens, make sure to <strong>disable Headers and Footers</strong>, set your margins to <strong>Default/None</strong>, and enable <strong>Background Graphics</strong> for crisp guides!
            </div>
          </QuickTips>

          {/* Mobile-Only Print Button in Preview Pane */}
          {mounted && charactersToRender.length > 0 && (
            <MobileOnlyPrintWrapper>
              <PrintButton onClick={handlePrint}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 19.164h10.56M16.5 15.75v3.437m-9 0V15.75M9 10.5h6M5.22 10.5h13.56c.928 0 1.62.83 1.48 1.744l-1.05 6.75a1.5 1.5 0 01-1.48 1.256H6.07a1.5 1.5 0 01-1.48-1.256l-1.05-6.75a1.5 1.5 0 011.48-1.744zM16.5 7.5v-3a1.5 1.5 0 00-1.5-1.5h-6A1.5 1.5 0 007.5 4.5v3M19.5 10.5h.008v.008h-.008V10.5z" />
                </svg>
                Print Practice Sheet
              </PrintButton>
            </MobileOnlyPrintWrapper>
          )}

          {charactersToRender.length > 0 ? (
            <>
              <PreviewHeading>
                <span>Live Preview ({sheetType === 'worksheet' ? paginatedPages.length : paginatedPages.length * 2} { (sheetType === 'worksheet' ? paginatedPages.length : paginatedPages.length * 2) === 1 ? 'Page' : 'Pages'})</span>
                <span style={{ fontSize: '0.8rem' }}>Scale adjusts to print layout automatically</span>
              </PreviewHeading>
              
              <div ref={printAreaRef}>
                {sheetType === 'worksheet' ? (
                  paginatedPages.map((pageChars, pageIdx) => (
                    <A4Sheet key={pageIdx} $landscape={landscape}>
                      {/* Paper Header */}
                      {showMetadata && (
                        <PaperHeader>
                          <div className="title-section">
                            <h2>日本語練習帳 — Japanese Writing Practice</h2>
                            <p>
                              {activeTab === 'kana' && `Kana Script Exercise — Sheet ${pageIdx + 1} of ${paginatedPages.length}`}
                              {activeTab === 'kanji' && `Kanji Writing Exercise — Sheet ${pageIdx + 1} of ${paginatedPages.length}`}
                              {activeTab === 'custom' && `Custom Handwriting Workbook — Sheet ${pageIdx + 1} of ${paginatedPages.length}`}
                            </p>
                          </div>
                          <div className="meta-section">
                            <div>Name: <span></span></div>
                            <div>Date: <span></span></div>
                          </div>
                        </PaperHeader>
                      )}

                      {/* Sheet Grid Rows */}
                      <WorksheetContent>
                        {pageChars.map((char, rowIdx) => (
                          <CharacterRow key={rowIdx}>
                            {showHeaders && (
                              <RowHeaderLabel>
                                <span className="romaji">{getCharacterHeaderLabel(char)}</span>
                              </RowHeaderLabel>
                            )}
                            <GridCells>
                              {/* 1. Reference Cell */}
                              <WritingCell $size={cellSizePx} $traceOpacity={traceOpacity}>
                                {char}
                                {gridStyle === 'genkouyoushi' && <GenkouyoushiLines />}
                              </WritingCell>

                              {/* 2. Practice Cells based on set set mode */}
                              {Array.from({ length: cellsPerRow - 1 }).map((_, cellIdx) => {
                                const isTrace = 
                                  practiceMode === 'fullTrace' || 
                                  (practiceMode === 'trace' && cellIdx < traceCount);
                                  
                                return (
                                  <WritingCell 
                                    key={cellIdx} 
                                    $size={cellSizePx} 
                                    $isTrace={isTrace}
                                    $traceOpacity={traceOpacity}
                                  >
                                    {isTrace ? char : ''}
                                    {gridStyle === 'genkouyoushi' && <GenkouyoushiLines />}
                                  </WritingCell>
                                );
                              })}
                            </GridCells>
                          </CharacterRow>
                        ))}
                      </WorksheetContent>

                      {/* Sheet Footer Credits */}
                      <FooterCredits>
                        <span>Generated via JapanApp Worksheet Studio</span>
                        <span>Page {pageIdx + 1} of {paginatedPages.length}</span>
                      </FooterCredits>
                    </A4Sheet>
                  ))
                ) : (
                  paginatedPages.map((pageChars, pageIdx) => {
                    const padded = [...pageChars];
                    while (padded.length < 8) {
                      padded.push('');
                    }

                    const frontIndices = [0, 1, 2, 3, 4, 5, 6, 7];
                    const backIndices = [1, 0, 3, 2, 5, 4, 7, 6];

                    return (
                      <div key={pageIdx}>
                        {/* FRONT SHEET */}
                        <A4Sheet className="flashcard-page" style={{ padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <FlashcardGrid>
                            {frontIndices.map((idx) => {
                              const char = padded[idx];
                              if (!char) return <FlashcardCell key={idx} />;
                              const details = getCardDetails(char);
                              return (
                                <FlashcardCell key={idx}>
                                  <CardFront>
                                    <CardFrontLeft>
                                      {details.examples.slice(0, 4).map((ex, exIdx) => (
                                        <CardFrontWord key={exIdx}>
                                          {ex.word}
                                        </CardFrontWord>
                                      ))}
                                    </CardFrontLeft>
                                    <CardFrontRight>
                                      {details.char}
                                    </CardFrontRight>
                                  </CardFront>
                                </FlashcardCell>
                              );
                            })}
                          </FlashcardGrid>
                        </A4Sheet>

                        {/* BACK SHEET */}
                        <A4Sheet className="flashcard-page" style={{ padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <FlashcardGrid>
                            {backIndices.map((idx) => {
                              const char = padded[idx];
                              if (!char) return <FlashcardCell key={idx} />;
                              const details = getCardDetails(char);
                              return (
                                <FlashcardCell key={idx}>
                                  <CardBack>
                                    <CardBackTop>
                                      <CardBackTopLeft>
                                        {details.on && (
                                          <>
                                            <CardBackReadingsLabel>Onyomi</CardBackReadingsLabel>
                                            <CardBackReadingsValue>{details.on}</CardBackReadingsValue>
                                          </>
                                        )}
                                        {details.kun && (
                                          <>
                                            <CardBackReadingsLabel>Kunyomi</CardBackReadingsLabel>
                                            <CardBackReadingsValue>{details.kun}</CardBackReadingsValue>
                                          </>
                                        )}
                                        <CardBackMeaning>
                                          {details.meaning}
                                        </CardBackMeaning>
                                      </CardBackTopLeft>
                                      <CardBackTopRight>
                                        <KanjiStrokeSvg char={details.char} />
                                      </CardBackTopRight>
                                    </CardBackTop>
                                    
                                    {details.examples.length > 0 && <CardBackDivider />}
                                    
                                    <CardBackBottom>
                                      {details.examples.slice(0, 4).map((ex, exIdx) => (
                                        <CardBackExampleRow key={exIdx}>
                                          <CardBackExampleWord>{ex.word}</CardBackExampleWord>
                                          <CardBackExampleReading>{ex.reading}</CardBackExampleReading>
                                          <CardBackExampleMeaning>{ex.meaning}</CardBackExampleMeaning>
                                        </CardBackExampleRow>
                                      ))}
                                    </CardBackBottom>
                                  </CardBack>
                                </FlashcardCell>
                              );
                            })}
                          </FlashcardGrid>
                        </A4Sheet>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          ) : (
            <EmptyStateMessage>
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <div>
                <h4 style={{ fontWeight: 700, marginBottom: '4px', color: 'var(--foreground)' }}>Practice Sheet is Empty</h4>
                <p style={{ maxWidth: '380px', margin: '0 auto', fontSize: '0.85rem' }}>
                  Please select some Hiragana, Katakana, or Kanji characters from the left panel, or type custom text, to generate writing grids.
                </p>
              </div>
            </EmptyStateMessage>
          )}
        </PreviewPane>
      </MainGrid>

      {/* Global CSS Injector for Printing */}
      <style jsx global>{`
        @media print {
          /* Hide normal web page chrome */
          nav, footer, .LayoutHeader, aside, button, select, input, textarea, .QuickTips, .PreviewHeading, #BackToHome, .ScrollToTop, .SettingsModal {
            display: none !important;
          }
          
          /* Set paper layout size and margins - margin: 0 hides default browser headers & footers */
          @page {
            size: ${sheetType === 'flashcards' ? 'A4 portrait' : landscape ? 'A4 landscape' : 'A4 portrait'};
            margin: 0 !important;
          }
          
          body {
            background: #ffffff !important;
            background-image: none !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            min-height: auto !important;
            display: block !important;
          }
          
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          
          /* Force page break inside lists */
          .A4Sheet {
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 12mm 12mm 10mm 12mm !important;
            width: 100% !important;
            height: ${landscape ? '210mm' : '297mm'} !important;
            max-height: ${landscape ? '210mm' : '297mm'} !important;
            box-sizing: border-box !important;
            background: transparent !important;
            page-break-inside: avoid !important;
            overflow: hidden !important;
          }

          .flashcard-page {
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 297mm !important;
            max-height: 297mm !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            background: transparent !important;
            page-break-inside: avoid !important;
            overflow: hidden !important;
          }
          
          .A4Sheet:not(:last-child), .flashcard-page:not(:last-child) {
            page-break-after: always !important;
            break-after: page !important;
          }
        }
      `}</style>
    </PageContainer>
  );
}
