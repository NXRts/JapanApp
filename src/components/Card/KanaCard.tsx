'use client';

import { useState, useEffect } from 'react';
import { toRomaji } from 'wanakana';
import { Card, Inner, Face, Back, AudioButton } from './KanaCard.styled';

export function KanaCard({ char }: { char: string }) {
  const [flipped, setFlipped] = useState(false);
  const romaji = toRomaji(char);

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip
    if (!window.speechSynthesis) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(char);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8; // Slightly slower for clarity
    window.speechSynthesis.speak(utterance);
  };

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <Card onClick={() => setFlipped(!flipped)}>
      <Inner $flipped={flipped}>
        <Face>
          <span>{char}</span>
        </Face>

        <Back>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', position: 'relative' }}>
            <AudioButton onClick={playAudio} title="Play Pronunciation">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            </AudioButton>
            
            <h3>{char}</h3>
            <p>{romaji}</p>
          </div>
        </Back>
      </Inner>
    </Card>
  );
}
