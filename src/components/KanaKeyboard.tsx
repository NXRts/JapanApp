import React, { useState } from 'react';
import styled from 'styled-components';

const KeyboardContainer = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  margin-top: 0.5rem;
  width: 100%;
  min-width: 320px;
  max-width: 400px;
  z-index: 100;
`;

const TabRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;
`;

const TabBtn = styled.button<{ $active: boolean }>`
  background: transparent;
  border: none;
  font-weight: 800;
  font-size: 1rem;
  color: ${({ $active }) => $active ? 'var(--primary)' : 'var(--text-secondary)'};
  cursor: pointer;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
    color: var(--primary);
  }
`;

const SubTabRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  padding-bottom: 0.2rem;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
  }
`;

const SubTabBtn = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => $active ? 'var(--primary)' : 'var(--background)'};
  color: ${({ $active }) => $active ? '#fff' : 'var(--foreground)'};
  border: 1px solid ${({ $active }) => $active ? 'var(--primary)' : 'var(--border)'};
  padding: 0.35rem 0.7rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
`;

const KeyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.4rem;
`;

const KeyBtn = styled.button`
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.6rem 0;
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--foreground);
  cursor: pointer;
  transition: all 0.1s;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
    border-color: var(--primary);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:disabled {
    opacity: 0;
    pointer-events: none;
  }
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  gap: 0.5rem;
`;

const ActionBtn = styled.button<{ $variant?: 'primary' | 'danger' }>`
  flex: 1;
  padding: 0.6rem 0;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  background: ${({ $variant }) => $variant === 'primary' ? 'var(--primary)' : $variant === 'danger' ? 'rgba(239, 68, 68, 0.1)' : 'var(--background)'};
  color: ${({ $variant }) => $variant === 'primary' ? '#fff' : $variant === 'danger' ? '#ef4444' : 'var(--foreground)'};
  border: 1px solid ${({ $variant }) => $variant === 'primary' ? 'transparent' : $variant === 'danger' ? 'rgba(239, 68, 68, 0.2)' : 'var(--border)'};
  transition: all 0.2s;
  
  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
`;

const layouts = {
  hiragana: {
    seion: [
      'あ','い','う','え','お',
      'か','き','く','け','こ',
      'さ','し','す','せ','そ',
      'た','ち','つ','て','と',
      'な','に','ぬ','ね','の',
      'は','ひ','ふ','へ','ほ',
      'ま','み','む','め','も',
      'や','','ゆ','','よ',
      'ら','り','る','れ','ろ',
      'わ','','','','を',
      'ん','ー','','',''
    ],
    dakuon: [
      'が','ぎ','ぐ','げ','ご',
      'ざ','じ','ず','ぜ','ぞ',
      'だ','ぢ','づ','で','ど',
      'ば','び','ぶ','べ','ぼ',
      'ぱ','ぴ','ぷ','ぺ','ぽ'
    ],
    yoon: [
      'きゃ','きゅ','きょ','','',
      'しゃ','しゅ','しょ','','',
      'ちゃ','ちゅ','ちょ','','',
      'にゃ','にゅ','にょ','','',
      'ひゃ','ひゅ','ひょ','','',
      'みゃ','みゅ','みょ','','',
      'りゃ','りゅ','りょ','','',
      'ぎゃ','ぎゅ','ぎょ','','',
      'じゃ','じゅ','じょ','','',
      'びゃ','びゅ','びょ','','',
      'ぴゃ','ぴゅ','ぴょ','','',
    ]
  },
  katakana: {
    seion: [
      'ア','イ','ウ','エ','オ',
      'カ','キ','ク','ケ','コ',
      'サ','シ','ス','セ','ソ',
      'タ','チ','ツ','テ','ト',
      'ナ','ニ','ヌ','ネ','ノ',
      'ハ','ヒ','フ','ヘ','ホ',
      'マ','ミ','ム','メ','モ',
      'ヤ','','ユ','','ヨ',
      'ラ','リ','ル','レ','ロ',
      'ワ','','','','ヲ',
      'ン','ー','','',''
    ],
    dakuon: [
      'ガ','ギ','グ','ゲ','ゴ',
      'ザ','ジ','ズ','ゼ','ゾ',
      'ダ','ヂ','ヅ','デ','ド',
      'バ','ビ','ブ','ベ','ボ',
      'パ','ピ','プ','ペ','ポ'
    ],
    yoon: [
      'キャ','キュ','キョ','','',
      'シャ','シュ','ショ','','',
      'チャ','チュ','チョ','','',
      'ニャ','ニュ','ニョ','','',
      'ヒャ','ヒュ','ヒョ','','',
      'ミャ','ミュ','ミョ','','',
      'リャ','リュ','リョ','','',
      'ギャ','ギュ','ギョ','','',
      'ジャ','ジュ','ジョ','','',
      'ビャ','ビュ','ビョ','','',
      'ピャ','ピュ','ピョ','','',
    ]
  }
};

export default function KanaKeyboard({ onType, onBackspace, onClose }: { onType: (char: string) => void, onBackspace: () => void, onClose: () => void }) {
  const [script, setScript] = useState<'hiragana' | 'katakana'>('hiragana');
  const [mode, setMode] = useState<'seion' | 'dakuon' | 'yoon'>('seion');

  const keys = layouts[script][mode];

  return (
    <KeyboardContainer>
      <TabRow>
        <TabBtn $active={script === 'hiragana'} onClick={() => setScript('hiragana')}>Hiragana</TabBtn>
        <TabBtn $active={script === 'katakana'} onClick={() => setScript('katakana')}>Katakana</TabBtn>
      </TabRow>
      <SubTabRow>
        <SubTabBtn $active={mode === 'seion'} onClick={() => setMode('seion')}>Dasar</SubTabBtn>
        <SubTabBtn $active={mode === 'dakuon'} onClick={() => setMode('dakuon')}>Dakuon</SubTabBtn>
        <SubTabBtn $active={mode === 'yoon'} onClick={() => setMode('yoon')}>Yōon</SubTabBtn>
      </SubTabRow>

      <KeyGrid>
        {keys.map((key, i) => (
          <KeyBtn key={i} disabled={!key} onClick={(e) => { e.preventDefault(); key && onType(key); }}>
            {key}
          </KeyBtn>
        ))}
      </KeyGrid>

      <ActionRow>
        <ActionBtn onClick={(e) => { e.preventDefault(); onClose(); }}>Tutup</ActionBtn>
        <ActionBtn onClick={(e) => { e.preventDefault(); onType(' '); }}>Spasi</ActionBtn>
        <ActionBtn $variant="danger" onClick={(e) => { e.preventDefault(); onBackspace(); }}>
          ⌫
        </ActionBtn>
      </ActionRow>
    </KeyboardContainer>
  );
}
