'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { DictionaryModal } from '@/components/Practice/DictionaryModal';

const StyledWrapper = styled.div`
  .clickable-word {
    cursor: help;
    transition: background 0.2s;
    border-radius: 4px;
    padding: 0 2px;
    
    &:hover {
      background: rgba(var(--primary-rgb), 0.1);
      border-bottom: 1px dotted var(--primary);
    }
  }
`;

interface ClickableJapaneseTextProps {
  html: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ClickableJapaneseText: React.FC<ClickableJapaneseTextProps> = ({ html, className, style }) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  // Regex to match Kanji, Hiragana, and Katakana sequences
  // It tries to be smart but without a proper tokenizer it's heuristic
  const processedHtml = html.replace(
    /([\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf]+)/g, 
    '<span class="clickable-word" data-word="$1">$1</span>'
  );

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('clickable-word')) {
      const word = target.getAttribute('data-word');
      if (word) setSelectedWord(word);
    }
  };

  return (
    <>
      <StyledWrapper 
        className={className} 
        style={style} 
        onClick={handleClick}
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
      {selectedWord && (
        <DictionaryModal 
          word={selectedWord} 
          onClose={() => setSelectedWord(null)} 
        />
      )}
    </>
  );
};
