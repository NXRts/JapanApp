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
  list-style: none;
  gap: 1rem;
  margin: 0;
  padding: 0;
  background: rgba(0, 0, 0, 0.03);
  padding: 4px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.04);
`;

const NavItem = styled.li`
  font-size: 0.95rem;
  font-weight: 600;
`;

const StyledLink = styled(Link) <{ $active: boolean }>`
  color: ${({ $active }) => ($active ? 'var(--primary)' : 'var(--text-secondary)')};
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'white' : 'transparent')};
  box-shadow: ${({ $active }) => ($active ? '0 2px 4px rgba(0,0,0,0.05)' : 'none')};
  display: block;
  
  &:hover {
    color: var(--primary);
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

export function Navbar() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <NavRoot>
        <NavContainer>
          <Logo href="/">
            🇯🇵 <span>JapanApp</span>
          </Logo>

          <NavList>
            <NavItem>
              <StyledLink href="/kanji" $active={pathname === '/kanji'}>
                Kanji
              </StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/kana" $active={pathname === '/kana'}>
                Kana
              </StyledLink>
            </NavItem>
          </NavList>

          <SettingsBtn onClick={() => setIsSettingsOpen(true)} title="Settings">
            <svg viewBox="0 0 24 24">
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
            </svg>
          </SettingsBtn>
        </NavContainer>
      </NavRoot>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
