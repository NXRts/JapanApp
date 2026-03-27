'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { searchDictionary, allVocabulary, allKanji, allGrammar, DictionaryResult } from '@/lib/dictionary';

// --- Styled Components ---

const PageWrapper = styled.div`
  min-height: 90vh;
  // background: var(--background);
  color: var(--foreground);
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 640px) {
    padding: 2rem 1rem;
  }
`;

const Breadcrumbs = styled.div`
  width: 100%;
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  display: flex;
  gap: 0.5rem;
  
  a {
    color: var(--foreground);
    text-decoration: none;
    font-weight: 600;
  }
`;

const CardArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  position: relative;
  margin-bottom: 2.5rem;

  @media (max-width: 640px) {
    gap: 0.5rem;
  }
`;

const NavArrow = styled.button`
  flex-shrink: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    color: var(--primary);
    border-color: var(--primary);
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    width: 40px;
    height: 40px;
  }
`;

const FlashcardContainer = styled.div` 
  width: 100%;
  max-width: 600px;
  min-height: 450px; /* Base height for the card */
  perspective: 1000px;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    min-height: 420px;
  }
`;

const FlashcardInner = styled.div<{ $isFlipped: boolean }>`
  position: relative;
  width: 100%;
  flex: 1;
  transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
  transform-style: preserve-3d;
  transform: ${({ $isFlipped }) => ($isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const FlashcardSide = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: var(--surface);
  border-radius: 20px;
  box-shadow: var(--shadow-md), 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border);
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 640px) {
    padding: 3rem 1rem 4.5rem 1rem;
  }
`;

const FlashcardBack = styled(FlashcardSide)`
  transform: rotateY(180deg);
  justify-content: center;
`;



const BottomLeftText = styled.span`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  font-size: 0.9rem;
  color: var(--primary);
  font-weight: 600;
  background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
  padding: 0.4rem 1rem;
  border-radius: 99px;

  @media (max-width: 640px) {
    bottom: 1rem;
    left: 1rem;
    padding: 0.35rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const StatusIndicator = styled.div<{ $status: 'remembered' | 'not-remembered' | null }>`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ $status }) => 
    $status === 'remembered' ? '#22c55e' : 
    $status === 'not-remembered' ? '#ef4444' : 'transparent'};
  box-shadow: ${({ $status }) => 
    $status === 'remembered' ? '0 0 12px rgba(34, 197, 94, 0.6)' : 
    $status === 'not-remembered' ? '0 0 12px rgba(239, 68, 68, 0.6)' : 'none'};
  z-index: 10;
  transition: all 0.3s ease;

  @media (max-width: 640px) {
    top: 1rem;
    left: 1rem;
  }
`;

const SpeakerIcon = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  margin-bottom: 1rem;
  
  &:hover {
    color: var(--primary);
  }
`;

const MainWord = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--primary);
  text-align: center;
  line-height: 1.2;
  word-break: break-word;

  @media (max-width: 640px) {
    font-size: 3.5rem;
  }
`;

const Readings = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const MeaningPrimary = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--foreground);
  margin-top: 1.5rem;
  text-align: center;
`;

const DetailsBtn = styled.button`
  background: none;
  border: none;
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-top: 1.5rem;
  cursor: pointer;
  transition: color 0.2s;
  
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: currentColor;
    margin-top: 2px;
    opacity: 0.5;
  }

  &:hover {
    color: var(--primary);
  }
`;

const FlipBtn = styled.button`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  background: none;
  border: 1px solid var(--primary);
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 99px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
  }

  @media (max-width: 640px) {
    bottom: 1rem;
    right: 1rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
    gap: 0.3rem;
  }
`;

const BottomActions = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 640px) {
    gap: 1rem;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const ActionCircle = styled.button<{ $color: string }>`
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 99px;
  font-weight: 600;
  color: var(--foreground);
  cursor: pointer;
  transition: all 0.2s;

  .icon-wrapper {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid ${({ $color }) => $color};
    color: ${({ $color }) => $color};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: ${({ $color }) => $color};
  }

  @media (max-width: 640px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    flex: 1;
    min-width: 140px;
    justify-content: center;
  }
`;

// --- Dropdown Components ---
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  min-width: 120px;
  z-index: 20;
`;

const DropdownTrigger = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 99px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  outline: none;

  &:hover {
    color: var(--primary);
    border-color: var(--primary);
  }

  svg {
    transition: transform 0.2s;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 50;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const DropdownItem = styled.div<{ $isActive: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ $isActive }) => ($isActive ? 'var(--primary)' : 'var(--foreground)')};
  background: ${({ $isActive }) => ($isActive ? 'rgba(var(--primary-rgb, 79, 70, 229), 0.05)' : 'transparent')};
  transition: background 0.2s;

  &:hover {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.05);
    color: var(--primary);
  }
`;

function FilterDropdown({ value, onChange, options }: { value: string, onChange: (val: string) => void, options: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if(isOpen) {
      setTimeout(() => document.addEventListener('click', handleClickOutside), 0);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const displayValue = value === 'All' ? options[0] : value;
  
  return (
    <DropdownContainer onClick={(e) => e.stopPropagation()}>
      <DropdownTrigger $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {displayValue}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </DropdownTrigger>
      {isOpen && (
        <DropdownMenu>
          {options.map(opt => {
            const actualVal = opt === 'Semua' ? 'All' : opt;
            return (
              <DropdownItem 
                key={opt}
                $isActive={value === actualVal}
                onClick={() => {
                  onChange(actualVal);
                  setIsOpen(false);
                }}
              >
                {opt}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
}

// Detail Modal Overlay
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

const ModalContent = styled.div`
  background: var(--surface);
  width: 100%;
  max-width: 800px;
  max-height: 85vh;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--surface);
  z-index: 10;
  padding: 0 1rem;
`;

const ModalTab = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  padding: 1.25rem 1.5rem;
  font-weight: 600;
  color: ${({ $active }) => $active ? 'var(--primary)' : 'var(--text-secondary)'};
  border-bottom: 2px solid ${({ $active }) => $active ? 'var(--primary)' : 'transparent'};
  cursor: pointer;
  
  &:hover:not(:disabled) {
    color: var(--primary);
  }
`;

const CloseModalBtn = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 1rem;
  
  &:hover {
    color: var(--foreground);
  }
`;

const ModalBody = styled.div`
  /* replaced by ModalLayout */
`;

const ModalLayout = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  
  @media (max-width: 800px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const SidePanelWrapper = styled.div`
  width: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const PanelCard = styled.div`
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
`;

const PanelHeader = styled.div`
  padding: 1rem 1.25rem;
  font-weight: 700;
  color: var(--foreground);
  border-bottom: 1px solid var(--border);
  background: rgba(120, 120, 120, 0.05);
`;

const PanelBody = styled.div`
  padding: 1.25rem;
`;

const PartOfSpeechTag = styled.div`
  background: #fef08a; /* Yellow/Orange tint */
  color: #a16207;
  display: inline-flex;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  margin: 1.5rem 0;
  border: 1px solid #fde047;
`;

const ExampleBlock = styled.div`
  margin-top: 1.5rem;
  
  .title {
    color: var(--primary);
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.05rem;
  }
  
  .japanese {
    font-size: 1.15rem;
    font-weight: 500;
    color: var(--foreground);
    margin-bottom: 0.4rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    line-height: 1.5;
  }
  
  .translation {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const KanjiStrokeBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 220px;
  margin: 1.5rem auto;
  background: #ffffff; /* Use white to contrast the black SVGs */
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.1);
  overflow: hidden;
  
  /* Dashed crosshairs */
  &::before {
    content: '';
    position: absolute;
    top: 0; bottom: 0; left: 50%;
    border-left: 2px dashed rgba(0,0,0,0.15);
  }
  &::after {
    content: '';
    position: absolute;
    left: 0; right: 0; top: 50%;
    border-top: 2px dashed rgba(0,0,0,0.15);
  }
`;

const KanjiStrokeImage = styled.img`
  position: relative;
  z-index: 2;
  width: 85%;
  height: 85%;
  object-fit: contain;
  filter: none !important;
`;

const getKanjiVgUrl = (kanji: string) => {
  const hex = kanji.charCodeAt(0).toString(16).padStart(5, '0');
  return `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg`;
};

function FlashcardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const q = searchParams.get('q') || '';
  const activeCategory = searchParams.get('category') || 'kata';
  const activeLevel = searchParams.get('level') || 'All';
  const activeStatus = searchParams.get('status') || 'All';

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<Record<string, 'remembered' | 'not-remembered'>>({});
  const [activeTab, setActiveTab] = useState<'kata' | 'kanji' | 'kalimat' | 'tata-bahasa'>('kata');
  
  // Prevent body scrolling when modal is open & handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowDetailModal(false);
        setTimeout(() => setActiveTab('kata'), 200);
      }
    };

    if (showDetailModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showDetailModal]);
  
  useEffect(() => {
    const saved = localStorage.getItem('jlpt-flashcards-status');
    if (saved) {
      try {
        setReviewStatus(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const getItemKey = (item: any) => item?.id || `${item?.source}-${item?.type}-${item?.level}-${item?.word || item?.kanji || item?.title}`;

  const saveStatus = (id: string, status: 'remembered' | 'not-remembered') => {
    const newStatus = { ...reviewStatus, [id]: status };
    setReviewStatus(newStatus);
    localStorage.setItem('jlpt-flashcards-status', JSON.stringify(newStatus));
  };
  
  const playAudio = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (!filteredData || currentIndex >= filteredData.length - 1) return;
    setIsFlipped(false);
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex <= 0) return;
    setIsFlipped(false);
    setCurrentIndex(prev => prev - 1);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [activeCategory, activeLevel]);

  const handleLevelChange = (level: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (level === 'All') {
      params.delete('level');
    } else {
      params.set('level', level);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  
  const [searchResults, setSearchResults] = useState<DictionaryResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const browseData = useMemo(() => {
    if (activeCategory === 'kanji') return allKanji;
    if (activeCategory === 'tata-bahasa') return allGrammar;
    return allVocabulary
      .filter(v => v.id.startsWith('lib-'))
      .map(v => ({ ...v, type: 'vocabulary' as const, source: 'kamus' as const }));
  }, [activeCategory]);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      if (q) {
        const results = await searchDictionary(q, activeCategory as any);
        if (isMounted) setSearchResults(results);
      } else {
        if (isMounted) setSearchResults(null);
      }
      if (isMounted) setIsLoading(false);
    }
    loadData();
    return () => { isMounted = false; };
  }, [q, activeCategory]);

  const filteredData = useMemo(() => {
    return (searchResults || browseData).filter((item: DictionaryResult) => {
      if (activeLevel !== 'All' && item.level !== activeLevel) return false;
      
      const key = getItemKey(item);
      const itemStatus = reviewStatus[key];
      if (activeStatus === 'remembered' && itemStatus !== 'remembered') return false;
      if (activeStatus === 'not-remembered' && itemStatus !== 'not-remembered') return false;
      
      return true;
    });
  }, [searchResults, browseData, activeLevel, activeStatus, reviewStatus]);

  const currentItem = filteredData && filteredData.length > 0 ? filteredData[currentIndex] as any : null;

  const resolveTargetWord = () => currentItem?.word || currentItem?.kanji || currentItem?.title || '?';
  const targetWordForDetails = resolveTargetWord();
  const kanaArr = [currentItem?.reading, ...(currentItem?.onyomi || []), ...(currentItem?.kunyomi || [])].filter(Boolean);
  const targetKana = Array.from(new Set(kanaArr));
  const romaji = currentItem?.romaji;
  const meaning = currentItem?.meaning || currentItem?.indonesian || currentItem?.english || 'No definition';
  
  // Dynamic Kanji & Related Words (must be called before early returns to preserve Hook order)
  const kanjisInWord = useMemo(() => {
    if (!targetWordForDetails || targetWordForDetails === '?') return [];
    return String(targetWordForDetails).split('').filter((char: string) => char >= '\u4e00' && char <= '\u9faf');
  }, [targetWordForDetails]);

  const relatedKanjis = useMemo(() => {
    if (kanjisInWord.length === 0) return [];
    return allKanji.filter(k => k.kanji && kanjisInWord.includes(k.kanji));
  }, [kanjisInWord]);

  const relatedWords = useMemo(() => {
    if (!targetWordForDetails || targetWordForDetails === '?') return [];
    return allVocabulary
      .filter(v => v.word && v.word.includes(targetWordForDetails) && v.word !== targetWordForDetails)
      .slice(0, 5);
  }, [targetWordForDetails]);

  const synonyms = useMemo(() => {
    if (!meaning || meaning === 'No definition') return [];
    const meaningTokens = meaning.toLowerCase().split(/[;,/\u3002]/).map((t: string) => t.trim()).filter((t: string) => t.length > 3);
    if (meaningTokens.length === 0) return [];
    return allVocabulary.filter(v => {
      if (v.word === targetWordForDetails) return false;
      const vMeaning = (v.meaning || '').toLowerCase();
      return meaningTokens.some((token: string) => vMeaning.includes(token));
    }).slice(0, 6);
  }, [meaning, targetWordForDetails]);

  const usageInPractice = useMemo(() => {
    if (!targetWordForDetails || targetWordForDetails === '?') return [];
    const sentences = new Set<string>();
    const results: any[] = [];
    
    const extractFrom = (dictionaryList: any[]) => {
      for (const item of dictionaryList) {
        if (item.examples && Array.isArray(item.examples)) {
          for (const ex of item.examples) {
            if (ex.japanese && ex.japanese.includes(targetWordForDetails)) {
              const strJa = String(ex.japanese);
              if (!sentences.has(strJa)) {
                 sentences.add(strJa);
                 results.push(ex);
              }
            }
          }
        }
      }
    };
    
    extractFrom(allVocabulary);
    extractFrom(allGrammar);
    
    // Filter out if it's already in the main examples
    return results.filter(ex => {
       if (!currentItem?.examples) return true;
       return !currentItem.examples.some((cx: any) => cx.japanese === ex.japanese);
    }).slice(0, 3);
  }, [targetWordForDetails, currentItem]);

  if (isLoading) {
    return (
      <PageWrapper>
        <Container>
          <Breadcrumbs>
             <Link href="/jlpt">JLPT</Link> / Kartu Flash
          </Breadcrumbs>
          <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)' }}>Memuat kartu flash...</div>
        </Container>
      </PageWrapper>
    );
  }

  if (!filteredData || filteredData.length === 0) {
    return (
      <PageWrapper>
        <Container>
          <Breadcrumbs>
            <Link href="/jlpt">JLPT</Link> / Kartu Flash
          </Breadcrumbs>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '600px', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
            <h3 style={{ margin: 0, color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
              {activeCategory.replace('-', ' ')}
            </h3>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <FilterDropdown 
                value={activeStatus === 'remembered' ? 'Teringat' : activeStatus === 'not-remembered' ? 'Tidak diingat' : 'Semua'}
                onChange={(val) => {
                  const params = new URLSearchParams(searchParams.toString());
                  const mapped = val === 'Teringat' ? 'remembered' : val === 'Tidak diingat' ? 'not-remembered' : 'All';
                  if (mapped === 'All') params.delete('status');
                  else params.set('status', mapped);
                  router.replace(`${pathname}?${params.toString()}`, { scroll: false });
                }}
                options={['Semua', 'Teringat', 'Tidak diingat']}
              />
              <FilterDropdown 
                value={activeLevel}
                onChange={handleLevelChange}
                options={['Semua', 'N5', 'N4', 'N3', 'N2', 'N1']}
              />
            </div>
          </div>

          <CardArea>
            <FlashcardContainer>
              <FlashcardSide style={{ position: 'relative', justifyContent: 'center' }}>
                <div style={{ margin: 'auto', textAlign: 'center' }}>
                  <h2 style={{ color: 'var(--text-secondary)', marginBottom: '0' }}>Data kosong.</h2>
                  <Link href="/jlpt" style={{ marginTop: '1rem', color: 'var(--primary)', display: 'inline-block' }}>Kembali ke JLPT</Link>
                </div>
              </FlashcardSide>
            </FlashcardContainer>
          </CardArea>
          
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container>
        <Breadcrumbs>
          <Link href="/jlpt">JLPT</Link> / Kartu Flash
        </Breadcrumbs>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '600px', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
          <h3 style={{ margin: 0, color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
            {activeCategory.replace('-', ' ')}
          </h3>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <FilterDropdown 
              value={activeStatus === 'remembered' ? 'Teringat' : activeStatus === 'not-remembered' ? 'Tidak diingat' : 'Semua'}
              onChange={(val) => {
                const params = new URLSearchParams(searchParams.toString());
                const mapped = val === 'Teringat' ? 'remembered' : val === 'Tidak diingat' ? 'not-remembered' : 'All';
                if (mapped === 'All') params.delete('status');
                else params.set('status', mapped);
                router.replace(`${pathname}?${params.toString()}`, { scroll: false });
              }}
              options={['Semua', 'Teringat', 'Tidak diingat']}
            />
            <FilterDropdown 
              value={activeLevel}
              onChange={handleLevelChange}
              options={['Semua', 'N5', 'N4', 'N3', 'N2', 'N1']}
            />
          </div>
        </div>

        <CardArea>
          <NavArrow onClick={handlePrev} disabled={currentIndex === 0}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
          </NavArrow>
          
          <FlashcardContainer>
            <FlashcardInner $isFlipped={isFlipped}>
              {/* --- FRONT SIDE --- */}
              <FlashcardSide>
                {reviewStatus[getItemKey(currentItem)] && (
                  <StatusIndicator $status={reviewStatus[getItemKey(currentItem)]} />
                )}
                
                <SpeakerIcon onClick={(e) => playAudio(e, resolveTargetWord())}>
                   <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                </SpeakerIcon>

                <MainWord>{resolveTargetWord()}</MainWord>
                
                <Readings>
                  {targetKana.length > 0 ? `「 ${targetKana.join(' 」 「 ')} 」` : ''}
                </Readings>
                
                {romaji && (
                  <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.25rem' }}>{romaji}</div>
                )}

                <DetailsBtn onClick={(e) => { e.stopPropagation(); setShowDetailModal(true); }}>
                  Lihat detailnya
                </DetailsBtn>

                <BottomLeftText>{currentIndex + 1} / {filteredData.length}</BottomLeftText>
                
                <FlipBtn onClick={() => setIsFlipped(true)}>
                  Kembali
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                </FlipBtn>
              </FlashcardSide>

              {/* --- BACK SIDE --- */}
              <FlashcardBack>
                {reviewStatus[getItemKey(currentItem)] && (
                  <StatusIndicator $status={reviewStatus[getItemKey(currentItem)]} />
                )}

                <SpeakerIcon onClick={(e) => playAudio(e, resolveTargetWord())}>
                   <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                </SpeakerIcon>

                <MainWord>{meaning}</MainWord>

                <BottomLeftText>{currentIndex + 1} / {filteredData.length}</BottomLeftText>
                
                <FlipBtn onClick={() => setIsFlipped(false)}>
                  Kembali
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                </FlipBtn>
              </FlashcardBack>
            </FlashcardInner>
          </FlashcardContainer>
          
          <NavArrow onClick={handleNext} disabled={currentIndex === filteredData.length - 1}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
          </NavArrow>
        </CardArea>

        <BottomActions>
          <ActionCircle 
            $color="#22c55e" 
            onClick={() => {
              saveStatus(getItemKey(currentItem), 'remembered');
              setTimeout(() => handleNext(), 150);
            }}
          >
             <div className="icon-wrapper">
               <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
             </div>
             Teringat
          </ActionCircle>
          <ActionCircle 
            $color="#ef4444" 
            onClick={() => {
              saveStatus(getItemKey(currentItem), 'not-remembered');
              if (!isFlipped) setIsFlipped(true);
            }}
          >
             <div className="icon-wrapper">
               <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
             </div>
             Tidak diingat
          </ActionCircle>
        </BottomActions>
      </Container>

      {/* --- Detail Modal --- */}
      {showDetailModal && (
        <ModalOverlay onClick={(e) => {
          if (e.target === e.currentTarget) {
             setShowDetailModal(false);
             setTimeout(() => setActiveTab('kata'), 200);
          }
        }}>
          <ModalContent>
            <ModalHeader>
              <ModalTab $active={activeTab === 'kata'} onClick={() => setActiveTab('kata')}>Kata</ModalTab>
              <ModalTab $active={activeTab === 'kanji'} onClick={() => setActiveTab('kanji')}>Kanji</ModalTab>
              <ModalTab $active={activeTab === 'kalimat'} onClick={() => setActiveTab('kalimat')}>Kalimat</ModalTab>
              <ModalTab disabled>Tata bahasa</ModalTab>
              <CloseModalBtn onClick={() => {
                setShowDetailModal(false);
                setTimeout(() => setActiveTab('kata'), 200);
              }}>✕</CloseModalBtn>
            </ModalHeader>
            <ModalLayout>
              <MainContent>
                {activeTab === 'kata' && (
                  <>
                    <MainWord style={{ fontSize: '3.5rem', textAlign: 'left', color: '#3b82f6', marginBottom: '0.5rem', fontWeight: 800 }}>
                      {resolveTargetWord()}
                    </MainWord>
                    
                    <Readings style={{ justifyContent: 'flex-start', marginBottom: '0.75rem', fontSize: '1.25rem', color: 'var(--foreground)' }}>
                      {targetKana.length > 0 ? `「 ${targetKana.join(' 」 「 ')} 」` : ''}
                    </Readings>
                    
                    {romaji && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--foreground)' }}>
                        <SpeakerIcon style={{ margin: 0, opacity: 0.7, cursor: 'pointer', padding: 0, width: 24, height: 24 }} onClick={(e) => playAudio(e, resolveTargetWord())}>
                          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                        </SpeakerIcon>
                        <span style={{ fontSize: '1.15rem', letterSpacing: '0.05em' }}>{romaji}</span>
                      </div>
                    )}

                    <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 600 }}>
                      Tingkat: 
                      <span style={{ background: '#10b981', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                        {currentItem?.level?.includes('JLPT') ? currentItem.level : `JLPT ${currentItem?.level || 'N?'}`}
                      </span>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" /></svg>
                        {currentItem?.category === 'kata' ? 'Noun' : currentItem?.category || 'Vocabulary'}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      <div style={{ color: '#3b82f6', fontSize: '1.5rem', lineHeight: 1 }}>•</div>
                      <div style={{ fontSize: '1.1rem', color: '#3b82f6', fontWeight: 600, paddingTop: '0.1rem' }}>
                        {meaning}
                      </div>
                    </div>

                    {currentItem?.explanation && (
                      <div style={{ paddingLeft: '2.25rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                        {currentItem.explanation}
                      </div>
                    )}

                    {currentItem?.examples && currentItem.examples.length > 0 && currentItem.examples.map((ex: any, idx: number) => (
                      <div key={`ex-${idx}`} style={{ paddingLeft: '2.25rem', marginBottom: '2rem' }}>
                        <div style={{ fontSize: '1.15rem', color: 'var(--foreground)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <span>{ex.japanese}</span>
                          <SpeakerIcon style={{ margin: 0, padding: 0, width: 22, height: 22, opacity: 0.5, cursor: 'pointer' }} onClick={(e) => playAudio(e, ex.japanese)}>
                            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3z"/></svg>
                          </SpeakerIcon>
                        </div>
                        {ex.romaji && <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.4rem', fontFamily: 'monospace' }}>{ex.romaji}</div>}
                        <div style={{ color: 'var(--foreground)', fontSize: '1rem' }}>{ex.indonesian || ex.english}</div>
                      </div>
                    ))}

                    {synonyms.length > 0 && (
                      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '1.2rem', color: 'var(--foreground)', fontWeight: 600, marginBottom: '1rem' }}>
                          Sinonim dari <span style={{ color: '#10b981' }}>{resolveTargetWord()}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '0.5rem' }}>
                          {synonyms.map(syn => (
                            <div key={`syn-${syn.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3b82f6', fontSize: '1rem' }}>
                              <div style={{ padding: '0.2rem', background: '#3b82f6', borderRadius: '50%', transform: 'scale(0.5)' }}></div>
                              <span style={{ fontWeight: 600, width: '4rem', color: 'var(--foreground)' }}>{syn.word}</span>
                              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>; {syn.meaning.split(/[,;]/)[0]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {usageInPractice.length > 0 && (
                      <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '1.2rem', color: 'var(--foreground)', fontWeight: 600, marginBottom: '1.5rem' }}>
                          <span style={{ color: 'var(--foreground)' }}>{resolveTargetWord()}</span> digunakan dalam praktik
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          {usageInPractice.map((u, idx) => (
                            <div key={`prac-${idx}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', background: 'rgba(0,0,0,0.02)', padding: '1rem', borderRadius: '12px' }}>
                              <img 
                                src={`https://picsum.photos/seed/japan-${targetWordForDetails}-${idx}/120/80`} 
                                alt="Contextual thumbnail" 
                                style={{ flexShrink: 0, width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }} 
                              />
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                {u.romaji && <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{u.romaji}</div>}
                                <div style={{ fontSize: '1.1rem', color: 'var(--foreground)', lineHeight: 1.4 }}>{u.japanese}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{u.indonesian || u.english}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'kanji' && (
                  <div>
                    <h2 style={{ fontSize: '1.75rem', color: 'var(--foreground)', marginBottom: '1.5rem', fontWeight: 700 }}>Kanji dalam kata ini</h2>
                    {relatedKanjis.length === 0 ? (
                      <div style={{ color: 'var(--text-secondary)', padding: '2rem', textAlign: 'center', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>Tidak ada data kanji untuk kata ini.</div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {relatedKanjis.map(k => (
                          <div key={`tab-kanji-${k.id}`} style={{ display: 'flex', gap: '2rem', background: 'rgba(0,0,0,0.02)', padding: '1.5rem', borderRadius: '16px', alignItems: 'flex-start' }}>
                            <div style={{ flexShrink: 0, textAlign: 'center' }}>
                               <div style={{ fontSize: '2.5rem', color: 'var(--primary)', lineHeight: 1, marginBottom: '1rem', fontWeight: 'bold' }}>{k.kanji}</div>
                               {k.kanji && (
                                 <KanjiStrokeBox style={{ width: '110px', height: '110px', margin: '0' }}>
                                   <KanjiStrokeImage src={getKanjiVgUrl(k.kanji)} alt={k.kanji} loading="lazy" />
                                 </KanjiStrokeBox>
                               )}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '1rem', lineHeight: 1.4 }}>{k.meaning}</div>
                              
                              {k.onyomi && k.onyomi.length > 0 && (
                                <div style={{ marginBottom: '0.5rem', fontSize: '1rem', display: 'flex', gap: '0.5rem' }}>
                                  <strong style={{ color: '#ef4444', minWidth: '70px' }}>Onyomi:</strong> <span style={{ color: 'var(--foreground)' }}>{k.onyomi.join(', ')}</span>
                                </div>
                              )}
                              {k.kunyomi && k.kunyomi.length > 0 && (
                                <div style={{ marginBottom: '0.5rem', fontSize: '1rem', display: 'flex', gap: '0.5rem' }}>
                                  <strong style={{ color: '#3b82f6', minWidth: '70px' }}>Kunyomi:</strong> <span style={{ color: 'var(--foreground)' }}>{k.kunyomi.join(', ')}</span>
                                </div>
                              )}
                              
                              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                                {k.level && (
                                  <span style={{ background: '#10b981', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                    {k.level.includes('JLPT') ? k.level : `JLPT ${k.level}`}
                                  </span>
                                )}
                                {k.stroke_count && (
                                  <span style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '0.3rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600' }}>
                                    {k.stroke_count} strokes
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'kalimat' && (
                  <div>
                    <h2 style={{ fontSize: '1.75rem', color: 'var(--foreground)', marginBottom: '1.5rem', fontWeight: 700 }}>Contoh Kalimat</h2>
                    {((currentItem?.examples || []).length === 0 && usageInPractice.length === 0) ? (
                      <div style={{ color: 'var(--text-secondary)', padding: '2rem', textAlign: 'center', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>Tidak ada contoh kalimat untuk kata ini.</div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {currentItem?.examples && currentItem.examples.length > 0 && currentItem.examples.map((ex: any, idx: number) => (
                          <div key={`tab-ex-${idx}`} style={{ background: 'rgba(0,0,0,0.02)', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #3b82f6' }}>
                             <div style={{ fontSize: '1.15rem', color: 'var(--foreground)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', fontWeight: '500' }}>
                               <span>{ex.japanese}</span>
                               <SpeakerIcon style={{ margin: 0, padding: 0, width: 22, height: 22, opacity: 0.5, cursor: 'pointer' }} onClick={(e) => playAudio(e, ex.japanese)}>
                                 <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3z"/></svg>
                               </SpeakerIcon>
                             </div>
                             {ex.romaji && <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.5rem', fontFamily: 'monospace' }}>{ex.romaji}</div>}
                             <div style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{ex.indonesian || ex.english}</div>
                          </div>
                        ))}
                        
                        {usageInPractice.map((u, idx) => (
                           <div key={`tab-prac-${idx}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', background: 'rgba(0,0,0,0.02)', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
                             <img 
                               src={`https://picsum.photos/seed/japan-${targetWordForDetails}-${idx}/120/80`} 
                               alt="Contextual thumbnail" 
                               style={{ flexShrink: 0, width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }} 
                             />
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', width: '100%' }}>
                               {u.romaji && <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{u.romaji}</div>}
                               <div style={{ fontSize: '1.15rem', color: 'var(--foreground)', lineHeight: 1.4, display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                                 {u.japanese}
                                 <SpeakerIcon style={{ margin: 0, padding: 0, width: 20, height: 20, opacity: 0.5, cursor: 'pointer' }} onClick={(e) => playAudio(e, u.japanese)}>
                                   <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3z"/></svg>
                                 </SpeakerIcon>
                               </div>
                               <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>{u.indonesian || u.english}</div>
                             </div>
                           </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </MainContent>

              <SidePanelWrapper>
                {/* Related Kanji Section */}
                {relatedKanjis.length > 0 && (
                  <PanelCard>
                    <PanelHeader>Kanji dari {resolveTargetWord()}</PanelHeader>
                    <PanelBody style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {relatedKanjis.map(k => (
                        <div key={k.id}>
                           <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem' }}>
                             <div style={{ fontSize: '2rem', color: 'var(--primary)', lineHeight: 1 }}>{k.kanji}</div>
                             <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                               {k.onyomi && k.onyomi.length > 0 && <div><strong>On:</strong> {k.onyomi.join(', ')}</div>}
                               {k.kunyomi && k.kunyomi.length > 0 && <div><strong>Kun:</strong> {k.kunyomi.join(', ')}</div>}
                             </div>
                           </div>
                           
                           {k.kanji && (
                             <KanjiStrokeBox>
                               <KanjiStrokeImage src={getKanjiVgUrl(k.kanji)} alt={k.kanji} loading="lazy" />
                             </KanjiStrokeBox>
                           )}
                           
                           <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--foreground)' }}>
                             <div style={{ marginBottom: '0.25rem' }}><strong>Arti:</strong> {k.meaning}</div>
                             {k.stroke_count && <div style={{ marginBottom: '0.25rem' }}><strong>Stroke:</strong> {k.stroke_count}</div>}
                             {k.level && <div><strong>Level:</strong> {k.level}</div>}
                           </div>
                        </div>
                      ))}
                    </PanelBody>

                  </PanelCard>
                )}

                {/* Related Words Section */}
                {relatedWords.length > 0 && (
                  <PanelCard>
                    <PanelHeader>Kata terkait dengan {resolveTargetWord()}</PanelHeader>
                    <PanelBody style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {relatedWords.map(w => (
                        <div key={w.id} style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                          <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>{w.word}</div>
                          {w.reading && <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>「 {w.reading} 」</div>}
                          <div style={{ fontSize: '0.9rem', color: 'var(--foreground)' }}>{w.meaning}</div>
                        </div>
                      ))}
                    </PanelBody>
                  </PanelCard>
                )}
              </SidePanelWrapper>
            </ModalLayout>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
}

export default function FlashcardsPageContainer() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading flashcards...</div>}>
      <FlashcardContent />
    </Suspense>
  );
}
