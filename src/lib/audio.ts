'use client';

/**
 * Universal Audio Utility for Cross-Browser Japanese Speech Synthesis
 */

let voices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && window.speechSynthesis) {
  // Load voices immediately
  voices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
  };
}

export const playJapaneseAudio = (text: string, rate: number = 0.8) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn('Speech synthesis not supported');
    return;
  }

  // Force getVoices() call in case it's empty (common in Safari/Firefox)
  if (voices.length === 0) {
    voices = window.speechSynthesis.getVoices();
  }

  // Safari/iOS fix: Cancel and speak immediately in the same tick as user interaction
  // We don't use setTimeout here because iOS requires direct user action context.
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = rate;

  // Try to find a Japanese voice
  const jaVoice = 
    voices.find(v => v.lang === 'ja-JP' && v.name.includes('Premium')) ||
    voices.find(v => v.lang === 'ja-JP' && v.name.includes('Google')) ||
    voices.find(v => v.lang.startsWith('ja')) ||
    voices.find(v => v.lang === 'ja-JP');

  if (jaVoice) {
    utterance.voice = jaVoice;
  }

  window.speechSynthesis.speak(utterance);
};
