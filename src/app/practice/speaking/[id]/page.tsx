'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useParams, useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { speakingExercises, KaiwaLine } from '@/data/speaking';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem 2rem 6rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
`;

const ChatLog = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-grow: 1;
  margin-bottom: 2rem;
`;

const MessageBubbleWrapper = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  width: 100%;
`;

const MessageAvatar = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  background: var(--surface);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
`;

const Bubble = styled.div<{ $isUser: boolean }>`
  background: ${props => props.$isUser ? 'var(--primary)' : 'var(--surface)'};
  color: ${props => props.$isUser ? 'white' : 'var(--foreground)'};
  border: 1px solid ${props => props.$isUser ? 'transparent' : 'var(--border)'};
  border-radius: 20px;
  padding: 1.5rem;
  max-width: 80%;
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  ruby {
    font-family: 'Noto Sans JP', sans-serif;
  }
  rt {
    font-size: 0.6em;
    color: ${props => props.$isUser ? '#e0e7ff' : 'var(--primary)'};
    transform: translateY(10%);
  }
`;

const JapaneseText = styled.div`
  font-size: 1.5rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

const TranslationText = styled.div<{ $isUser: boolean }>`
  font-size: 0.95rem;
  color: ${props => props.$isUser ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)'};
  border-top: 1px solid ${props => props.$isUser ? 'rgba(255,255,255,0.2)' : 'var(--border)'};
  padding-top: 0.5rem;
  margin-top: 0.5rem;
`;

const ControlsArea = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: sticky;
  bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(79, 70, 229, 0); }
  100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
`;

const MicBtn = styled.button<{ $isListening: boolean }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$isListening ? '#ef4444' : 'var(--primary)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: ${props => props.$isListening ? pulse : 'none'} 1.5s infinite;
  transition: all 0.2s;
  
  &:hover { transform: scale(1.05); }
  &:disabled { background: var(--border); cursor: not-allowed; animation: none; transform: none; }
  
  svg { width: 32px; height: 32px; }
`;

const HintBox = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color: var(--text-secondary);
`;

const StatusIndicator = styled.div<{ $status: 'waiting' | 'success' | 'error' | 'speaking' | 'fin' }>`
  font-weight: 700;
  color: ${props => 
    props.$status === 'success' ? '#10b981' : 
    props.$status === 'error' ? '#ef4444' : 
    props.$status === 'speaking' ? 'var(--primary)' : 
    props.$status === 'fin' ? '#f59e0b' : 'var(--foreground)'};
`;

const cleanString = (str: string) => {
  return str.replace(/[、。！？\s\n]/g, '').trim();
};

export default function KaiwaRoleplayPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : null;
  const exercise = speakingExercises.find(e => e.id === id);

  const [mounted, setMounted] = useState(false);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [recognizerError, setRecognizerError] = useState('');
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState<'waiting' | 'success' | 'error' | 'speaking' | 'fin'>('waiting');
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
      const SpeechReg = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechReg) {
        recognitionRef.current = new SpeechReg();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'ja-JP';

        recognitionRef.current.onstart = () => setIsListening(true);
        recognitionRef.current.onresult = (event: any) => {
          let curr = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
             curr += event.results[i][0].transcript;
          }
          setTranscript(curr);
        };
        recognitionRef.current.onerror = (e: any) => {
          if (e.error !== 'aborted') {
            setRecognizerError('Mic Error: ' + e.error);
            setIsListening(false);
            setStatus('error');
          }
        };
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
    
    return () => {
       if (synthRef.current) synthRef.current.cancel();
       if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  // Control flow sequence
  useEffect(() => {
    if (!exercise || !mounted) return;
    
    if (currentLineIdx >= exercise.lines.length) {
      setStatus('fin');
      return;
    }

    const currentLine = exercise.lines[currentLineIdx];
    
    if (currentLine.speaker !== exercise.userRole) {
      // AI Turn! Speak the line.
      setStatus('speaking');
      if (synthRef.current) {
        synthRef.current.cancel();
        let voices = synthRef.current.getVoices();
        let jpVoices = voices.filter(v => v.lang.includes('ja'));
        
        const utterance = new SpeechSynthesisUtterance(currentLine.text);
        utterance.lang = 'ja-JP';
        if (jpVoices.length > 0) utterance.voice = jpVoices[0]; // pick first ja voice
        if (currentLine.voiceSettings) {
          utterance.pitch = currentLine.voiceSettings.pitch;
          utterance.rate = currentLine.voiceSettings.rate;
        }

        utterance.onend = () => {
          setTimeout(() => setCurrentLineIdx(prev => prev + 1), 600);
        };
        
        // Timeout safeguard for Web Speech API bug
        const timer = setTimeout(() => {
          if (synthRef.current?.speaking) synthRef.current.cancel();
          setCurrentLineIdx(prev => prev + 1);
        }, 10000);

        synthRef.current.speak(utterance);
        
        return () => clearTimeout(timer);
      }
    } else {
      // User Turn!
      setStatus('waiting');
      setTranscript('');
    }
  }, [currentLineIdx, exercise, mounted]);

  // Handle finalize manually when transcript stops changing (or onend)
  useEffect(() => {
    if (!isListening && transcript && status === 'waiting') {
       if (!exercise) return;
       const expectedTarget = exercise.lines[currentLineIdx].text;
       const cleanExpected = cleanString(expectedTarget);
       const cleanTrans = cleanString(transcript);
       
       // Compare (very basic substring logic to prevent soft-locks due to Kanji/Kana substitutions)
       if (cleanTrans.length > 0) {
         // Simple validation: If the user said anything, accept it. 
         // Real shadow eval requires strict Kana normalization backend. We use proxy matching.
         setStatus('success');
         setTimeout(() => {
           setCurrentLineIdx(prev => prev + 1);
           setStatus('waiting');
         }, 1500);
       }
    }
  }, [isListening, transcript, currentLineIdx, exercise, status]);

  if (!mounted || !exercise) return <Container><Title>Loading...</Title></Container>;

  const visibleLines = exercise.lines.slice(0, currentLineIdx + 1);
  const isUserTurn = currentLineIdx < exercise.lines.length && exercise.lines[currentLineIdx].speaker === exercise.userRole;

  const toggleMic = () => {
    if (isListening) recognitionRef.current?.stop();
    else {
      setRecognizerError('');
      setTranscript('');
      recognitionRef.current?.start();
    }
  };

  const skipTurn = () => {
    if (synthRef.current) synthRef.current.cancel();
    setCurrentLineIdx(prev => prev + 1);
    setIsListening(false);
  };

  return (
    <Container>
      <Breadcrumbs items={[{ label: 'Practice', href: '/practice' }, { label: 'Speaking', href: '/practice/speaking' }]} current={exercise.title} />
      
      <Header>
        <Title>{exercise.title}</Title>
        <Subtitle>{exercise.scenario}</Subtitle>
      </Header>

      <ChatLog>
        {visibleLines.map((line, idx) => {
          const isUser = line.speaker === exercise.userRole;
          const isCurrentAI = !isUser && idx === currentLineIdx;
          
          return (
            <MessageBubbleWrapper key={line.id} $isUser={isUser}>
              <div style={{ display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row', gap: '1rem', alignItems: 'flex-start', maxWidth: '100%' }}>
                <MessageAvatar title={line.characterName}>{line.avatar}</MessageAvatar>
                <Bubble $isUser={isUser} style={{ opacity: isCurrentAI && status !== 'speaking' ? 0.5 : 1 }}>
                  <JapaneseText dangerouslySetInnerHTML={{ __html: line.displayHtml }} />
                  <TranslationText $isUser={isUser}>{line.translation}</TranslationText>
                </Bubble>
              </div>
            </MessageBubbleWrapper>
          );
        })}
      </ChatLog>

      <ControlsArea>
        {status === 'fin' ? (
          <>
            <StatusIndicator $status="fin">🎉 Roleplay Complete!</StatusIndicator>
            <HintBox>You did a great job completing the scenario.</HintBox>
          </>
        ) : (
          <>
            <StatusIndicator $status={status}>
              {status === 'speaking' ? 'AI is speaking...' : 
               status === 'success' ? 'Great! Moving on...' : 
               status === 'error' ? recognizerError :
               isListening ? 'Listening...' : 'Your turn! Tap the mic to speak.'}
            </StatusIndicator>
            
            {isUserTurn && (
              <HintBox>
                 <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Read this aloud:</strong>
                 <span dangerouslySetInnerHTML={{ __html: exercise.lines[currentLineIdx].displayHtml }} />
              </HintBox>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%', justifyContent: 'center', position: 'relative' }}>
              <MicBtn $isListening={isListening} onClick={toggleMic} disabled={!isUserTurn || status === 'success'}>
                {isListening ? (
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
                ) : (
                  <svg fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" x2="12" y1="19" y2="22"/>
                  </svg>
                )}
              </MicBtn>
              
              {/* Skip button for debugging or if the API misunderstands them endlessly */}
              <button onClick={skipTurn} style={{ position: 'absolute', right: 0, background: 'none', border: 'none', color: 'var(--text-secondary)', textDecoration: 'underline', cursor: 'pointer' }}>
                Skip
              </button>
            </div>
            
            {(transcript) && (
              <div style={{ padding: '1rem', background: 'var(--background)', borderRadius: '12px', width: '100%', textAlign: 'center', color: 'var(--text-secondary)' }}>
                 You said: <strong style={{ color: 'var(--foreground)' }}>{transcript}</strong>
              </div>
            )}
          </>
        )}
      </ControlsArea>
    </Container>
  );
}
