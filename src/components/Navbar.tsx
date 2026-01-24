'use client';

import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { SettingsModal } from './SettingsModal';

const NavRoot = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--surface);
  /* Modern glass effect */
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.6);
  
  /* Dark mode override handled by CSS vars mostly, but ensures surface blend */
  @media (prefers-color-scheme: dark) {
    background: rgba(30, 41, 59, 0.85);
    border-bottom: 1px solid rgba(51, 65, 85, 0.6);
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
  
  span {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    display: none; /* Hide on mobile for now, would need hamburger menu */
  }
`;

const NavItem = styled.li`
  font-size: 0.95rem;
  font-weight: 500;
`;

const StyledLink = styled(Link) <{ $active?: boolean }>`
  color: ${({ $active }) => ($active ? 'var(--primary)' : 'var(--text-secondary)')};
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  
  &:hover {
    color: var(--primary);
  }
`;

const LearningLink = styled(Link) <{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ $active }) => ($active ? 'var(--primary)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'white' : 'var(--foreground)')};
  border-radius: 999px;
  font-weight: 600;
  border: 1px solid ${({ $active }) => ($active ? 'transparent' : 'var(--border)')};
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ $active }) => ($active ? 'var(--primary-dark)' : 'var(--surface)')};
    border-color: ${({ $active }) => ($active ? 'transparent' : 'var(--primary)')};
    color: ${({ $active }) => ($active ? 'white' : 'var(--primary)')};
    transform: translateY(-1px);
  }
`;

const SettingsBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 10px;
  border-radius: 12px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;

  &:hover {
    color: var(--primary);
    background: rgba(79, 70, 229, 0.05);
    border-color: rgba(79, 70, 229, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;

const HamburgerBtn = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--foreground);
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 73px;
  left: 0;
  width: 100%;
  height: calc(100vh - 73px);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 99;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(20px)')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'all' : 'none')};
  
  @media (prefers-color-scheme: dark) {
    background: rgba(15, 23, 42, 0.95);
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileLink = styled(Link)`
  font-size: 2rem;
  font-weight: 800;
  color: var(--foreground);
  text-decoration: none;
  padding: 0.5rem 0;
  transition: color 0.2s;
  
  &:hover {
    color: var(--primary);
  }
  
  /* Numbering or decoration */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* And update the Navbar return to use a simple clean list appearance */

export function Navbar() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <NavRoot>
        <NavContainer>
          <Logo href="/" onClick={() => setIsMobileMenuOpen(false)}>
            🇯🇵 <span>JapanApp</span>
          </Logo>

          <NavList>
            <NavItem>
              <StyledLink href="/about">About</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/contact">Contact</StyledLink>
            </NavItem>
          </NavList>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <SettingsBtn onClick={() => setIsSettingsOpen(true)} title="Settings">
              <svg viewBox="0 0 24 24">
                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
              </svg>
            </SettingsBtn>

            <HamburgerBtn onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
              )}
            </HamburgerBtn>
          </div>
        </NavContainer>

        <MobileMenu $isOpen={isMobileMenuOpen}>
          <MobileLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileLink>
          <MobileLink href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</MobileLink>
          <MobileLink href="/kanji" onClick={() => setIsMobileMenuOpen(false)}>Kanji</MobileLink>
          <MobileLink href="/kana" onClick={() => setIsMobileMenuOpen(false)}>Kana</MobileLink>
        </MobileMenu>
      </NavRoot>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
