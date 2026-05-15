'use client';

/**
 * Universal Audio Utility for Cross-Browser Japanese Speech Synthesis
 */

interface AudioOptions {
  rate?: number;
  pitch?: number;
  voice?: SpeechSynthesisVoice;
}

let voices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && window.speechSynthesis) {
  // Load voices immediately
  voices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
  };
}

export const playJapaneseAudio = (text: string, options: AudioOptions = {}): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('Speech synthesis not supported');
      return resolve();
    }

    // Force getVoices() call in case it's empty (common in Safari/Firefox)
    if (voices.length === 0) {
      voices = window.speechSynthesis.getVoices();
    }

    // Safari/iOS fix: Cancel and speak immediately in the same tick as user interaction
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = options.rate || 0.85;
    utterance.pitch = options.pitch || 1.0;

    // Try to find a Japanese voice
    const jaVoice = 
      options.voice ||
      voices.find(v => v.lang === 'ja-JP' && v.name.includes('Premium')) ||
      voices.find(v => v.lang === 'ja-JP' && v.name.includes('Google')) ||
      voices.find(v => v.lang.startsWith('ja')) ||
      voices.find(v => v.lang === 'ja-JP');

    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve(); // Resolve anyway to prevent hanging

    window.speechSynthesis.speak(utterance);
  });
};
