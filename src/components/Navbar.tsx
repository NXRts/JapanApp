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
  background: var(--navbar-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--navbar-border);
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
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
  z-index: 101; /* Ensure logo stays above mobile menu if needed, though menu usually covers all */

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
    display: none;
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
  position: relative;
  
  &:hover {
    color: var(--primary);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${({ $active }) => ($active ? '100%' : '0')};
    height: 2px;
    background: var(--primary);
    transition: width 0.3s ease;
    border-radius: 2px;
  }

  &:hover::after {
    width: 100%;
  }
`;

const SettingsBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--primary);
    background: rgba(var(--primary-rgb), 0.1);
  }

  svg {
    width: 22px;
    height: 22px;
    fill: currentColor;
  }
`;

const HamburgerBtn = styled.button<{ $isOpen: boolean }>`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--foreground);
  padding: 0.5rem;
  z-index: 102; /* Above mobile menu */
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
    transition: transform 0.3s ease;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'rotate(0)')};
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--background);
  z-index: 100;
  padding: 6rem 2rem 2rem; /* Top padding to account for header area */
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-100%)')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'all' : 'none')};
  
  @supports (backdrop-filter: blur(20px)) {
    background: var(--navbar-bg);
    backdrop-filter: blur(20px);
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileLink = styled(Link) <{ $active?: boolean }>`
  font-size: 1.75rem;
  font-weight: ${({ $active }) => ($active ? '700' : '600')};
  color: ${({ $active }) => ($active ? 'var(--primary)' : 'var(--foreground)')};
  text-decoration: none;
  padding: 0.5rem 0;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--navbar-border);
  
  &:hover {
    color: var(--primary);
    padding-left: 10px;
  }
`;

export function Navbar() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menu when route changes (optional, but good for UX if Link doesn't fully reload)
  // We handle it via onClick on Links usually

  return (
    <>
      <NavRoot>
        <NavContainer>
          <Logo href="/" onClick={() => setIsMobileMenuOpen(false)}>
            🇯🇵 <span>JapanApp</span>
          </Logo>

          <NavList>
            <NavItem>
              <StyledLink href="/practice" $active={pathname.startsWith('/practice')}>Practice</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/daily-quiz" $active={pathname.startsWith('/daily-quiz')}>Daily Quiz</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/blog" $active={pathname.startsWith('/blog')}>Blog</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/careers" $active={pathname === '/careers'}>Careers</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/about" $active={pathname === '/about'}>About</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/contact" $active={pathname === '/contact'}>Contact</StyledLink>
            </NavItem>
          </NavList>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 102 }}>
            <SettingsBtn onClick={() => setIsSettingsOpen(true)} title="Settings">
              <svg viewBox="0 0 24 24">
                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
              </svg>
            </SettingsBtn>

            <HamburgerBtn
              $isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
              )}
            </HamburgerBtn>
          </div>
        </NavContainer>

        <MobileMenu $isOpen={isMobileMenuOpen}>
          <MobileLink href="/practice" $active={pathname.startsWith('/practice')} onClick={() => setIsMobileMenuOpen(false)}>
            Practice
            <span>→</span>
          </MobileLink>
          <MobileLink href="/daily-quiz" $active={pathname.startsWith('/daily-quiz')} onClick={() => setIsMobileMenuOpen(false)}>
            Daily Quiz
            <span>→</span>
          </MobileLink>
          <MobileLink href="/blog" $active={pathname.startsWith('/blog')} onClick={() => setIsMobileMenuOpen(false)}>
            Blog
            <span>→</span>
          </MobileLink>
          <MobileLink href="/careers" $active={pathname === '/careers'} onClick={() => setIsMobileMenuOpen(false)}>
            Careers
            <span>→</span>
          </MobileLink>
          <MobileLink href="/about" $active={pathname === '/about'} onClick={() => setIsMobileMenuOpen(false)}>
            About
            <span>→</span>
          </MobileLink>
          <MobileLink href="/contact" $active={pathname === '/contact'} onClick={() => setIsMobileMenuOpen(false)}>
            Contact
            <span>→</span>
          </MobileLink>
        </MobileMenu>
      </NavRoot>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
