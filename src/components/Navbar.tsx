'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useProgress } from '@/context/ProgressContext';
import { isItemDue } from '@/lib/srs';
import { ArrowRightIcon } from './icons/AppIcons';

const SettingsModal = dynamic(() => import('./SettingsModal').then((mod) => mod.SettingsModal), { ssr: false });
const DictionarySearchOverlay = dynamic(() => import('./dictionary/DictionarySearchOverlay'), { ssr: false });

const NavRoot = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--navbar-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--navbar-border);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    background: var(--surface); /* Solid white/surface color on mobile */
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`;

const AuthButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-left: 0.5rem;
  
  @media (max-width: 1100px) {
    display: none;
  }
`;

const LoginLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s;
  
  &:hover {
    color: var(--primary);
  }
`;

const RegisterButton = styled(Link)`
  padding: 0.5rem 1.25rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(var(--primary-rgb), 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(var(--primary-rgb), 0.3);
  }
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
  z-index: 102; /* High enough to sit securely above the mobile menu */

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
  gap: 1.25rem;
  margin: 0;
  padding: 0;
  
  @media (max-width: 1100px) {
    display: none;
  }
`;

const NavItem = styled.li`
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
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

const SettingsBtn = styled.button<{ $isOpen?: boolean }>`
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
  opacity: 0.8;

  @media (max-width: 768px) {
    display: flex;
  }

  &:hover {
    color: var(--primary);
    background: rgba(var(--primary-rgb), 0.15);
    opacity: 1;
  }

  svg {
    width: 22px;
    height: 22px;
    fill: currentColor;
  }
`;

const SearchBtn = styled(SettingsBtn)`
  svg {
    fill: none;
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
  
  @media (max-width: 1100px) {
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

const Badge = styled.span`
  background: #ef4444;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  border-radius: 999px;
  margin-left: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const LevelBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.9rem;
  background: rgba(var(--primary-rgb), 0.08);
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(var(--primary-rgb), 0.12);
    transform: translateY(-1px);
  }

  @media (max-width: 600px) {
    padding: 0.3rem 0.6rem;
    gap: 0.4rem;
  }
`;

const LevelText = styled.span`
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--primary);
  white-space: nowrap;
`;

const ExpBar = styled.div`
  width: 60px;
  height: 6px;
  background: var(--border);
  border-radius: 999px;
  overflow: hidden;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ExpFill = styled.div<{ $percent: number }>`
  width: ${({ $percent }) => $percent}%;
  height: 100%;
  background: var(--primary);
  border-radius: 999px;
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 70px; /* Precise alignment below the navbar */
  left: 0;
  width: 100%;
  height: calc(100dvh - 70px);
  background: var(--surface); /* Solid background to match navbar */
  z-index: 101;
  padding: 2rem 2.5rem; /* Balanced internal padding */
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-100%)')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'all' : 'none')};
  overflow-y: auto;
  
  @media (min-width: 1101px) {
    display: none;
  }
`;

const MobileLink = styled(Link) <{ $active?: boolean; $isOpen: boolean; $delay: number }>`
  font-size: 1.4rem;
  font-weight: ${({ $active }) => ($active ? '700' : '600')};
  color: ${({ $active }) => ($active ? 'var(--primary)' : 'var(--foreground)')};
  text-decoration: none;
  padding: 1rem 0.5rem; /* Increased vertical padding for better tap targets and layout */
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--navbar-border);
  
  /* Staggered animation */
  opacity: 0;
  transform: translateY(20px);
  ${({ $isOpen }) => $isOpen && `
    opacity: 1;
    transform: translateY(0);
  `}
  transition-property: opacity, transform, color, padding, border;
  transition-delay: ${({ $delay }) => $delay}s;
  
  &:hover {
    color: var(--primary);
    padding-left: 1rem;
    border-bottom-color: var(--primary);
  }

  span {
    opacity: 0.5;
    transition: transform 0.3s ease;
  }

  &:hover span {
    transform: translateX(5px);
    opacity: 1;
  }
`;

const MobileDictBtn = styled.div<{ $isOpen: boolean; $delay: number }>`
  margin-top: 1.5rem;
  padding: 1.25rem;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
  border: 1px solid rgba(79, 70, 229, 0.2);
  color: var(--primary);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  
  /* Staggered animation */
  opacity: 0;
  transform: translateY(20px);
  ${({ $isOpen }) => $isOpen && `
    opacity: 1;
    transform: translateY(0);
  `}
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${({ $delay }) => $delay}s;

  &:hover {
    background: rgba(79, 70, 229, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.2);
  }

  svg {
    stroke-width: 2.5;
  }
`;

export function Navbar() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { progress } = useProgress();

  const dueItemsCount = Object.values(progress.srs).filter(isItemDue).length;

  // Level Logic
  const level = Math.floor(Math.sqrt(progress.exp / 100)) + 1;
  const currentLevelExp = Math.pow(level - 1, 2) * 100;
  const nextLevelExp = Math.pow(level, 2) * 100;
  const expInCurrentLevel = progress.exp - currentLevelExp;
  const expNeededForNext = nextLevelExp - currentLevelExp;
  const percent = (expInCurrentLevel / expNeededForNext) * 100;

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
              <StyledLink href="/" $active={pathname === '/'}>Home</StyledLink>
            </NavItem>

            <NavItem>
              <StyledLink href="/study" $active={pathname.startsWith('/study')}>Study</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/review" $active={pathname.startsWith('/review')}>
                Review
                {dueItemsCount > 0 && <Badge>{dueItemsCount}</Badge>}
              </StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/quiz" $active={pathname.startsWith('/quiz')}>Quiz</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/materi" $active={pathname.startsWith('/materi')}>Materials</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/jlpt" $active={pathname.startsWith('/jlpt')}>JLPT</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/game" $active={pathname.startsWith('/game')}>Game</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/blog" $active={pathname.startsWith('/blog')}>Blog</StyledLink>
            </NavItem>
            {/* <NavItem>
              <StyledLink href="/careers" $active={pathname === '/careers'}>Careers</StyledLink>
            </NavItem> */}
            <NavItem>
              <StyledLink href="/stats" $active={pathname === '/stats'}>Stats</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/about" $active={pathname === '/about'}>About</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/contact" $active={pathname === '/contact'}>Contact</StyledLink>
            </NavItem>
          </NavList>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', zIndex: 102 }}>
            <Link href="/stats" style={{ textDecoration: 'none' }}>
              <LevelBadge title={`${progress.exp} Total EXP`}>
                <LevelText>LVL {level}</LevelText>
                <ExpBar>
                  <ExpFill $percent={percent} />
                </ExpBar>
              </LevelBadge>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <SearchBtn $isOpen={isMobileMenuOpen} onClick={() => setIsDictionaryOpen(true)} title="Dictionary (Jisho)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </SearchBtn>

              <SettingsBtn $isOpen={isMobileMenuOpen} onClick={() => setIsSettingsOpen(true)} title="Settings">
                <svg viewBox="0 0 24 24">
                  <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                </svg>
              </SettingsBtn>
            </div>

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
          <MobileLink href="/" $active={pathname === '/'} $isOpen={isMobileMenuOpen} $delay={0.1} onClick={() => setIsMobileMenuOpen(false)}>
            Home
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink>

          <MobileLink href="/study" $active={pathname.startsWith('/study')} $isOpen={isMobileMenuOpen} $delay={0.17} onClick={() => setIsMobileMenuOpen(false)}>
            Study
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink>
          <MobileLink href="/quiz" $active={pathname.startsWith('/quiz')} $isOpen={isMobileMenuOpen} $delay={0.2} onClick={() => setIsMobileMenuOpen(false)}>
            Quiz
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink>
          <MobileLink href="/materi" $active={pathname.startsWith('/materi')} $isOpen={isMobileMenuOpen} $delay={0.25} onClick={() => setIsMobileMenuOpen(false)}>
            Materials
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink>
          <MobileLink href="/jlpt" $active={pathname.startsWith('/jlpt')} $isOpen={isMobileMenuOpen} $delay={0.3} onClick={() => setIsMobileMenuOpen(false)}>
            JLPT
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink>
          <MobileLink href="/game" $active={pathname.startsWith('/game')} $isOpen={isMobileMenuOpen} $delay={0.35} onClick={() => setIsMobileMenuOpen(false)}>
            Game
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink>
          <MobileLink href="/blog" $active={pathname.startsWith('/blog')} $isOpen={isMobileMenuOpen} $delay={0.4} onClick={() => setIsMobileMenuOpen(false)}>
            Blog
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink>
          <MobileLink href="/stats" $active={pathname === '/stats'} $isOpen={isMobileMenuOpen} $delay={0.45} onClick={() => setIsMobileMenuOpen(false)}>
            Stats
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink>
          <MobileLink href="/about" $active={pathname === '/about'} $isOpen={isMobileMenuOpen} $delay={0.5} onClick={() => setIsMobileMenuOpen(false)}>
            About
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink>
          <MobileLink href="/contact" $active={pathname === '/contact'} $isOpen={isMobileMenuOpen} $delay={0.55} onClick={() => setIsMobileMenuOpen(false)}>
            Contact
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink>
          {/* 
          <MobileLink href="/login" $isOpen={isMobileMenuOpen} $delay={0.6} onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--primary)', fontWeight: 800 }}>
            Log In
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink>
          <MobileLink href="/register" $isOpen={isMobileMenuOpen} $delay={0.65} onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'rgba(var(--primary-rgb), 0.1)', color: 'var(--primary)', fontWeight: 800, borderRadius: '12px' }}>
            Get Started
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink> 
          */}
          <MobileDictBtn
            $isOpen={isMobileMenuOpen}
            $delay={0.75}
            onClick={() => { setIsDictionaryOpen(true); setIsMobileMenuOpen(false); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Dictionary (Jisho)
          </MobileDictBtn>
        </MobileMenu>
      </NavRoot>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      {isDictionaryOpen && <DictionarySearchOverlay onClose={() => setIsDictionaryOpen(false)} />}
    </>
  );
}
