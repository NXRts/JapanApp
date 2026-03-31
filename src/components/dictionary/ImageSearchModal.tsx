'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';


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
  padding: 1.5rem;
  border-radius: 20px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  transform: ${({ $isOpen }) => ($isOpen ? 'scale(1)' : 'scale(0.95)')};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--foreground);
  margin: 0;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  display: flex;
  &:hover { color: var(--foreground); }
`;

const DropZone = styled.div<{ $isDragActive: boolean }>`
  border: 2px dashed ${({ $isDragActive }) => $isDragActive ? 'var(--primary)' : 'var(--border)'};
  background: ${({ $isDragActive }) => $isDragActive ? 'rgba(var(--primary-rgb), 0.05)' : 'var(--background)'};
  border-radius: 16px;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  
  &:hover {
    border-color: var(--primary);
    background: rgba(var(--primary-rgb), 0.02);
  }

  svg {
    width: 48px;
    height: 48px;
    color: var(--text-secondary);
    transition: color 0.2s;
  }
  
  &:hover svg {
    color: var(--primary);
  }
`;

const TextPrimary = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--foreground);
  margin: 0;
`;

const TextSecondary = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
`;

const Loader = styled.div`
  width: 30px;
  height: 30px;
  border: 3px solid rgba(var(--primary-rgb), 0.2);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export function ImageSearchModal({ isOpen, onClose, onResult }: { isOpen: boolean, onClose: () => void, onResult: (text: string) => void }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState('Extracting text...');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsProcessing(false);
      setIsDragActive(false);
    }
  }, [isOpen]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
    }

    setIsProcessing(true);
    setProgressText('Menyiapkan Mesin OCR...');

    try {
      const Tesseract = (await import('tesseract.js')).default;
      const { data: { text } } = await Tesseract.recognize(
        file,
        'jpn', // 'jpn' ensures accuracy for Japanese Characters 
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              setProgressText(`Membaca teks: ${Math.round(m.progress * 100)}%`);
            } else if (m.status === 'loading tesseract core') {
              setProgressText('Memuat inti memori...');
            } else if (m.status === 'loading language traineddata') {
                setProgressText('Mengunduh data bahasa (Hanya 1x Pertama)');
            } else {
              setProgressText('Memproses gambar...');
            }
          }
        }
      );

      // Clean up text: remove spaces and newlines
      const cleanText = text.replace(/[\s\n\r]/g, '');

      setIsProcessing(false);
      onResult(cleanText);
    } catch (error) {
      console.error(error);
      alert('Gagal mendeteksi teks pada gambar.');
      setIsProcessing(false);
    }
  };

  const handleClick = () => {
    if (!isProcessing) {
      fileInputRef.current?.click();
    }
  };

  return (
    <Overlay $isOpen={isOpen} onClick={onClose}>
      <Modal $isOpen={isOpen} onClick={e => e.stopPropagation()}>
        <Header>
          <Title>Image OCR Search</Title>
          {!isProcessing && <CloseBtn onClick={onClose}>&times;</CloseBtn>}
        </Header>
        
        {isProcessing ? (
           <DropZone $isDragActive={false} style={{ cursor: 'wait' }}>
              <Loader />
              <TextPrimary>{progressText}</TextPrimary>
              <TextSecondary>Extracting text using OCR. This might take a moment.</TextSecondary>
           </DropZone>
        ) : (
          <DropZone 
            $isDragActive={isDragActive}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
            />
            <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <TextPrimary>Click to upload or drag and drop</TextPrimary>
                <TextSecondary>SVG, PNG, JPG (max. 5MB)</TextSecondary>
            </div>
          </DropZone>
        )}

      </Modal>
    </Overlay>
  );
}
