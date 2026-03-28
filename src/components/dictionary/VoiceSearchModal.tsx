'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  background: var(--surface);
  padding: 2rem;
  border-radius: 24px;
  width: 90%;
  max-width: 350px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  transform: ${({ $isOpen }) => ($isOpen ? 'scale(1)' : 'scale(0.95)')};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  position: relative;
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0.7); }
  70% { transform: scale(1.1); box-shadow: 0 0 0 20px rgba(var(--primary-rgb), 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0); }
`;

const MicButton = styled.button<{ $isListening: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ $isListening }) => $isListening ? 'var(--primary)' : 'var(--surface)'};
  border: 2px solid var(--primary);
  color: ${({ $isListening }) => $isListening ? 'white' : 'var(--primary)'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: ${({ $isListening }) => $isListening ? pulse : 'none'} 1.5s infinite;
  transition: all 0.3s;
  
  svg {
    width: 36px;
    height: 36px;
  }
`;

const StatusText = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--foreground);
  margin: 0;
  text-align: center;
`;

const ResultText = styled.p`
  font-size: 1.2rem;
  color: var(--primary);
  min-height: 1.5rem;
  margin: 0;
  font-weight: 700;
  text-align: center;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  &:hover { color: var(--foreground); }
`;

export function VoiceSearchModal({ isOpen, onClose, onResult }: { isOpen: boolean, onClose: () => void, onResult: (text: string) => void }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'ja-JP';

        recognitionRef.current.onstart = () => {
          setIsListening(true);
          setError('');
          setTranscript('');
        };

        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
          if (event.error === 'not-allowed') {
            setError('Microphone access denied.');
          } else {
            setError('An error occurred. Try again.');
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          // Give it a tiny bit of time before yielding result so the user sees it
          setTimeout(() => {
            if (recognitionRef.current?.finalTranscript) {
               // handle logic if needed
            }
          }, 500);
        };
      } else {
        setError('Speech recognition not supported in this browser.');
      }
    }
  }, []);

  // Handle finalize manually since onend fires asynchronously
  useEffect(() => {
    if (!isListening && transcript && !error) {
       const timer = setTimeout(() => {
          if (isOpen) onResult(transcript);
       }, 800);
       return () => clearTimeout(timer);
    }
  }, [isListening, transcript, isOpen, onResult, error]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Auto start on open if supported
      if (recognitionRef.current && !error.includes('not supported')) {
        try {
          recognitionRef.current.start();
        } catch(e) {}
      }
    } else {
      document.body.style.overflow = 'unset';
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
      setIsListening(false);
      setTranscript('');
      setError('');
    }
  }, [isOpen]);

  const toggleListening = () => {
    if (error && error.includes('supported')) return;
    
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch(e) {}
    }
  };

  return (
    <Overlay $isOpen={isOpen} onClick={onClose}>
      <Modal $isOpen={isOpen} onClick={e => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>&times;</CloseBtn>
        
        <StatusText>
          {error ? <span style={{ color: '#ef4444' }}>{error}</span> : 
           isListening ? 'Listening...' : 'Tap to speak'}
        </StatusText>
        
        <MicButton $isListening={isListening} onClick={toggleListening}>
          <svg fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
          </svg>
        </MicButton>
        
        <ResultText>
           {transcript || (isListening ? 'Speak now (in Japanese)...' : '')}
        </ResultText>

      </Modal>
    </Overlay>
  );
}
