'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
    gap: 0.75rem;
  }
`;

const NavArrow = styled.button`
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
    width: 36px;
    height: 36px;
  }
`;

const Flashcard = styled.div`
  background: var(--surface);
  border-radius: 20px;
  box-shadow: var(--shadow-md), 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border);
  width: 100%;
  max-width: 600px;
  min-height: 400px;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const TopRightText = styled.span`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 600;
  background: var(--background);
  padding: 0.4rem 1rem;
  border-radius: 99px;
  border: 1px solid var(--border);
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
`;

const BottomActions = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
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
`;

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
  padding: 2rem;
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
  }
  
  .japanese {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--foreground);
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .translation {
    color: var(--text-secondary);
  }
`;

function FlashcardContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const activeCategory = searchParams.get('category') || 'kata';
  const activeLevel = searchParams.get('level') || 'All';

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
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
      if (activeLevel === 'All') return true;
      return item.level === activeLevel;
    });
  }, [searchResults, browseData, activeLevel]);

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
          <Flashcard style={{ justifyContent: 'center' }}>
            <h2 style={{ color: 'var(--text-secondary)' }}>Data kosong.</h2>
            <Link href="/jlpt" style={{ marginTop: '1rem', color: 'var(--primary)' }}>Kembali ke JLPT</Link>
          </Flashcard>
        </Container>
      </PageWrapper>
    );
  }

  const currentItem = filteredData[currentIndex] as any;

  const handleNext = () => {
    if (currentIndex < filteredData.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const resolveTargetWord = () => currentItem.word || currentItem.kanji || currentItem.title || '?';
  const kanaArr = [currentItem.reading, ...(currentItem.onyomi || []), ...(currentItem.kunyomi || [])].filter(Boolean);
  const targetKana = Array.from(new Set(kanaArr));
  const romaji = currentItem.romaji;
  const meaning = currentItem.meaning || currentItem.indonesian || currentItem.english || 'No definition';
  
  return (
    <PageWrapper>
      <Container>
        <Breadcrumbs>
          <Link href="/jlpt">JLPT</Link> / Kartu Flash
        </Breadcrumbs>

        <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
          {activeCategory.replace('-', ' ')}
        </h3>

        <CardArea>
          <NavArrow onClick={handlePrev} disabled={currentIndex === 0}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
          </NavArrow>
          
          <Flashcard>
            <TopRightText>Semua ⌄</TopRightText>
            
            <SpeakerIcon>
               <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
            </SpeakerIcon>

            <MainWord>{!isFlipped ? resolveTargetWord() : meaning}</MainWord>
            
            {!isFlipped && (
              <Readings>
                {targetKana.length > 0 ? `「 ${targetKana.join(' 」 「 ')} 」` : ''}
              </Readings>
            )}
            
            {!isFlipped && romaji && (
              <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.25rem' }}>{romaji}</div>
            )}

            {!isFlipped && (
              <DetailsBtn onClick={() => setShowDetailModal(true)}>
                Lihat detailnya
              </DetailsBtn>
            )}

            <BottomLeftText>{currentIndex + 1} / {filteredData.length}</BottomLeftText>
            
            <FlipBtn onClick={() => setIsFlipped(!isFlipped)}>
              Kembali
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </FlipBtn>
          </Flashcard>
          
          <NavArrow onClick={handleNext} disabled={currentIndex === filteredData.length - 1}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
          </NavArrow>
        </CardArea>

        <BottomActions>
          <ActionCircle $color="#22c55e" onClick={handleNext}>
             <div className="icon-wrapper">
               <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
             </div>
             Teringat
          </ActionCircle>
          <ActionCircle $color="#ef4444" onClick={() => setIsFlipped(true)}>
             <div className="icon-wrapper">
               <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
             </div>
             Tidak diingat
          </ActionCircle>
        </BottomActions>
      </Container>

      {/* --- Detail Modal --- */}
      {showDetailModal && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && setShowDetailModal(false)}>
          <ModalContent>
            <ModalHeader>
              <ModalTab $active>Kata</ModalTab>
              <ModalTab disabled>Kanji</ModalTab>
              <ModalTab disabled>Kalimat</ModalTab>
              <ModalTab disabled>Tata bahasa</ModalTab>
              <CloseModalBtn onClick={() => setShowDetailModal(false)}>✕</CloseModalBtn>
            </ModalHeader>
            <ModalBody>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                 <MainWord style={{ fontSize: '3rem', textAlign: 'left', color: 'var(--primary)' }}>
                   {resolveTargetWord()}
                 </MainWord>
                 <SpeakerIcon style={{ margin: 0, opacity: 0.5 }}>
                   <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                 </SpeakerIcon>
               </div>
               
               <Readings style={{ justifyContent: 'flex-start', marginBottom: '0.5rem' }}>
                 {targetKana.length > 0 ? `「 ${targetKana.join(' 」 「 ')} 」` : ''}
               </Readings>
               
               {romaji && (
                 <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>{romaji}</div>
               )}

               <PartOfSpeechTag>
                 ☆ {currentItem.category === 'kata' ? 'Noun' : currentItem.level} ({activeCategory})
               </PartOfSpeechTag>

               <ExampleBlock>
                 <div className="title">◆ Pengertian Utama</div>
                 <div className="japanese">{meaning}</div>
                 {currentItem.explanation && (
                   <div className="translation" style={{ marginTop: '0.5rem' }}>{currentItem.explanation}</div>
                 )}
               </ExampleBlock>

               {currentItem.examples && currentItem.examples.length > 0 && currentItem.examples.map((ex: any, idx: number) => (
                 <ExampleBlock key={idx}>
                   <div className="title">◆ Contoh {idx + 1}</div>
                   <div className="japanese">
                     {ex.japanese}
                     <SpeakerIcon style={{ padding: 0, margin: 0, width: 20, opacity: 0.5 }}>
                       <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3z"/></svg>
                     </SpeakerIcon>
                   </div>
                   <div className="translation">{ex.romaji}</div>
                   <div className="translation" style={{ fontStyle: 'italic', marginTop: '0.2rem' }}>{ex.indonesian || ex.english}</div>
                 </ExampleBlock>
               ))}
               
            </ModalBody>
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
