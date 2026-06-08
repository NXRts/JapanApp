'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styled, { css, createGlobalStyle } from 'styled-components';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useProgress } from '@/context/ProgressContext';
import { isItemDue } from '@/lib/srs';
import { ArrowRightIcon, UserIcon } from './icons/AppIcons';
import { useDeviceMode } from '@/context/DeviceModeContext';
import { DeviceModeSwitcher } from '@/components/DeviceModeSwitcher';

const SettingsModal = dynamic(() => import('./SettingsModal').then((mod) => mod.SettingsModal), { ssr: false });
const DictionarySearchOverlay = dynamic(() => import('./dictionary/DictionarySearchOverlay'), { ssr: false });

const NavRoot = styled.nav<{ $hideOnDesktop?: boolean }>`
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--navbar-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--navbar-border);
  transition: all 0.3s ease;

  ${({ $hideOnDesktop }) => $hideOnDesktop && css`
    @media (min-width: 1101px) {
      display: none;
    }
  `}

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
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;

  @media (max-width: 600px) {
    padding: 0 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s;
  z-index: 102;

  &:hover {
    opacity: 0.8;
  }
  
  span {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 600px) {
    font-size: 0.95rem;
    gap: 6px;
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
  position: relative;
`;

const StyledLink = styled(Link) <{ $active?: boolean }>`
  color: ${({ $active }) => ($active ? 'var(--primary)' : 'var(--text-secondary)')};
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--primary);
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

  @media (max-width: 600px) {
    padding: 5px;
  }

  svg {
    width: 22px;
    height: 22px;
    fill: currentColor;
  }
`;

const SearchBtn = styled(SettingsBtn)<{ $hideOnMobile?: boolean }>`
  svg {
    fill: none;
  }

  @media (max-width: 600px) {
    display: ${({ $hideOnMobile }) => ($hideOnMobile ? 'none' : 'flex')} !important;
  }
`;

const UserBtn = styled(Link)<{ $hideOnMobile?: boolean }>`
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

  &:hover {
    color: var(--primary);
    background: rgba(var(--primary-rgb), 0.15);
    opacity: 1;
  }

  @media (max-width: 600px) {
    padding: 5px;
    display: ${({ $hideOnMobile }) => ($hideOnMobile ? 'none' : 'flex')} !important;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

const HamburgerBtn = styled.button<{ $isOpen: boolean; $isMobileMode?: boolean }>`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--foreground);
  padding: 0.5rem;
  z-index: 102; /* Above mobile menu */
  
  @media (max-width: 1100px) {
    display: ${({ $isMobileMode }) => ($isMobileMode ? 'none' : 'flex')};
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0; /* Reset padding for precise ergonomic touch target */
  }

  @media (max-width: 600px) {
    width: 44px;
    height: 44px;
    padding: 0; /* Maintain minimum 44px x 44px touch target on smaller mobile screens */
  }
  
  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
    transition: transform 0.3s ease;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'rotate(0)')};
  }
`;

const RightNavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  z-index: 102;

  @media (max-width: 600px) {
    gap: 0.5rem; /* Tighter grouping on mobile */
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
  font-size: 0.72rem;
  font-family: 'DM Mono', monospace;
  background: rgba(var(--primary-rgb), 0.1);
  border: 1px solid var(--border);
  padding: 3px 10px;
  border-radius: 20px;
  color: var(--primary);
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    background: rgba(var(--primary-rgb), 0.15);
    border-color: var(--primary);
  }

  @media (max-width: 600px) {
    padding: 2px 6px;
    font-size: 0.65rem;
    
    .level-bar {
      display: none;
    }
  }
`;

const MobileMenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 56px; /* Start below the navbar bar — tidak menutupi navbar */
  left: 0;
  width: 100%;
  height: calc(100dvh - 56px);
  background: rgba(0, 0, 0, 0.2); /* Lebih ringan agar tidak terlalu gelap */
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 100; /* Behind MobileMenu (101) but above page content */
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'all' : 'none')};
  transition: opacity 0.3s ease;
  
  @media (min-width: 1101px) {
    display: none;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 56px; /* Tepat di bawah navbar (NavContainer height = 56px) */
  left: 0;
  width: 100%;
  height: calc(100dvh - 56px);
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

const BottomBar = styled.div<{ $isMounted: boolean }>`
  display: none;
  
  @media (max-width: 1100px) {
    display: ${({ $isMounted }) => ($isMounted ? 'flex' : 'none')};
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: var(--surface);
    border-top: 1px solid var(--border);
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.06);
    padding-bottom: env(safe-area-inset-bottom);
  }
`;

const BottomTab = styled(Link) <{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  color: ${({ $active }) => ($active ? 'var(--primary)' : 'var(--text-secondary)')};
  text-decoration: none;
  font-size: 0.72rem;
  font-weight: 700;
  transition: all 0.2s ease;
  flex: 1;
  height: 100%;

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2.2;
    transition: transform 0.2s ease;
  }

  &:active svg {
    transform: scale(0.9);
  }
`;

// ========================================================
// PREMIUM SIDEBAR SVG NAVIGATION ICONS
// ========================================================

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function GameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <line x1="15" y1="13" x2="15.01" y2="13" />
      <line x1="18" y1="11" x2="18.01" y2="11" />
    </svg>
  );
}

function JlptIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function CharactersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <text
        x="12"
        y="12"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="21"
        fontWeight="800"
        fontFamily="'Nunito', 'Outfit', 'Noto Sans JP', sans-serif"
      >
        あ
      </text>
    </svg>
  );
}

function PracticeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 12h12" />
      <path d="M6 8v8M4 7v10M2 9v6" />
      <path d="M18 8v8M20 7v10M22 9v6" />
    </svg>
  );
}


function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function StatsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5v17M7 9v13" />
    </svg>
  );
}

function AboutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

// ========================================================
// PREMIUM DESKTOP SIDEBAR STYLED COMPONENTS & GLOBAL PADDING
// ========================================================

const GlobalSidebarPadding = createGlobalStyle`
  @media (min-width: 1101px) {
    main, footer {
      padding-left: 240px !important;
    }
  }
`;

const SidebarRoot = styled.aside`
  display: none;

  @media (min-width: 1101px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 240px;
    background: var(--surface);
    border-right: 2px solid var(--border);
    padding: 1.5rem 1.25rem;
    z-index: 999;
    font-family: 'Nunito', 'Outfit', sans-serif;
  }
`;

const SidebarLogo = styled(Link)`
  font-size: 1.25rem;
  font-weight: 800;
  text-decoration: none;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 2rem;
  padding: 0.5rem;
  
  span {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const SidebarNavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const SidebarNavItem = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 1rem;
  border-radius: 16px;
  color: ${({ $active }) => ($active ? 'var(--primary)' : 'var(--text-secondary)')};
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  
  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
  }

  &:hover {
    background: rgba(var(--primary-rgb), 0.08);
    color: var(--primary);
    transform: translateX(4px);
  }

  &:active {
    transform: scale(0.97) translateX(4px);
  }

  ${({ $active }) => $active && css`
    background: rgba(var(--primary-rgb), 0.12);
    border: 2px solid var(--primary);
    color: var(--primary);
    
    svg {
      transform: scale(1.1);
    }
  `}
`;

const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 2px solid var(--border);
  padding-top: 1.25rem;
  margin-top: auto;
`;

const SidebarLevelCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: rgba(var(--primary-rgb), 0.06);
  border: 1.5px solid var(--border);
  border-radius: 16px;
  padding: 0.85rem;
  text-decoration: none;
  color: var(--foreground);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary);
    background: rgba(var(--primary-rgb), 0.1);
  }
`;

const SidebarLevelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 800;
  font-size: 0.8rem;
  color: var(--primary);
`;

const SidebarProgressBar = styled.div`
  height: 8px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
  position: relative;
`;

const SidebarProgressFill = styled.div<{ $width: number }>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
  border-radius: 99px;
`;

const SidebarActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SidebarActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 0.55rem 0.3rem;
  border-radius: 12px;
  border: 1.5px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-weight: 700;
  font-size: 0.74rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 0;
  white-space: nowrap;

  &:hover {
    color: var(--primary);
    border-color: var(--primary);
    background: rgba(var(--primary-rgb), 0.06);
  }

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`;

const SidebarNavButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 1rem;
  border-radius: 16px;
  color: ${({ $active }) => ($active ? 'var(--primary)' : 'var(--text-secondary)')};
  background: transparent;
  border: 2px solid transparent;
  width: 100%;
  text-align: left;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  
  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
  }

  &:hover {
    background: rgba(var(--primary-rgb), 0.08);
    color: var(--primary);
    transform: translateX(4px);
  }

  &:active {
    transform: scale(0.97) translateX(4px);
  }

  ${({ $active }) => $active && css`
    background: rgba(var(--primary-rgb), 0.12);
    border: 2px solid var(--primary);
    color: var(--primary);
  `}
`;

const LainnyaIconContainer = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #c084fc; /* light purple */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;

  svg {
    width: 14px;
    height: 14px;
    stroke: currentColor;
    stroke-width: 3.5;
  }
`;

const PopoverMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  left: 215px;
  bottom: 0;
  width: 240px;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 20px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transform: ${({ $isOpen }) => ($isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)')};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'all' : 'none')};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
`;

const PopoverItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.65rem 0.85rem;
  border-radius: 12px;
  color: var(--text-secondary);
  font-weight: 700;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    background: rgba(var(--primary-rgb), 0.08);
    color: var(--primary);
  }
`;

const PopoverDivider = styled.div`
  height: 1.5px;
  background: var(--border);
  margin: 0.35rem 0.25rem;
`;

function CertificateIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', flexShrink: 0 }}>
      <path d="M12 2L15 5L19 4L18 8L21 11L17 12L16 16L12 15L8 16L7 12L3 11L6 8L5 4L9 5L12 2Z" fill="#22c55e" />
      <circle cx="12" cy="9.5" r="3.5" fill="white" />
      <path d="M10 14L12 17L14 14" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', color: '#3b82f6', flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function QuizIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2.5" />
      <path d="M9 12L11 14L15 10" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', flexShrink: 0 }}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLainnyaOpen, setIsLainnyaOpen] = useState(false);
  const lainnyaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (lainnyaRef.current && !lainnyaRef.current.contains(event.target as Node)) {
        setIsLainnyaOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const { progress } = useProgress();
  const { deviceMode, isMounted } = useDeviceMode();

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
  if (pathname === '/login' || pathname === '/register') return null;

  const isWidescreenMobileSim = isMounted && deviceMode === 'mobile';

  return (
    <>
      {isWidescreenMobileSim && <GlobalSidebarPadding />}
      
      {/* Permanent Left Sidebar for Desktop view */}
      {isWidescreenMobileSim && (
        <SidebarRoot>
          <SidebarLogo href="/">
            🇯🇵 <span>JapanApp</span>
          </SidebarLogo>
          
          <SidebarNavList>
            <SidebarNavItem href="/" $active={pathname === '/'}>
              <HomeIcon />
              Learn
            </SidebarNavItem>
            
            <SidebarNavItem href="/characters" $active={pathname.startsWith('/characters')}>
              <CharactersIcon />
              Characters
            </SidebarNavItem>
            
            <SidebarNavItem href="/practice" $active={pathname === '/practice'}>
              <PracticeIcon />
              Practice
            </SidebarNavItem>
            
            <SidebarNavItem href="/jlpt" $active={pathname.startsWith('/jlpt')}>
              <JlptIcon />
              JLPT
            </SidebarNavItem>
            
            <SidebarNavItem href="/game" $active={pathname.startsWith('/game')}>
              <GameIcon />
              Game
            </SidebarNavItem>
            
            <SidebarNavItem href="/stats" $active={pathname === '/stats'}>
              <StatsIcon />
              Stats
            </SidebarNavItem>
            
            <SidebarNavItem href="/about" $active={pathname === '/about'}>
              <AboutIcon />
              About
            </SidebarNavItem>

            <SidebarNavItem href="/profile" $active={pathname === '/profile'}>
              <ProfileIcon />
              Profile
            </SidebarNavItem>

            {/* LAINNYA / MORE DROPDOWN TOGGLE */}
            <div style={{ position: 'relative' }} ref={lainnyaRef}>
              <SidebarNavButton onClick={() => setIsLainnyaOpen(!isLainnyaOpen)} $active={isLainnyaOpen}>
                <LainnyaIconContainer>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="19" cy="12" r="1.5" />
                    <circle cx="5" cy="12" r="1.5" />
                  </svg>
                </LainnyaIconContainer>
                Lainnya
              </SidebarNavButton>

              <PopoverMenu $isOpen={isLainnyaOpen}>
                <Link href="/quiz" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsLainnyaOpen(false)}>
                  <PopoverItem>
                    <QuizIcon />
                    Quiz
                  </PopoverItem>
                </Link>
                <Link href="/materi" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsLainnyaOpen(false)}>
                  <PopoverItem>
                    <BookIcon />
                    Learning Materials
                  </PopoverItem>
                </Link>
                
                <PopoverDivider />
                
                <PopoverItem onClick={() => { setIsSettingsOpen(true); setIsLainnyaOpen(false); }}>
                  Pengaturan
                </PopoverItem>
                <Link href="/about" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsLainnyaOpen(false)}>
                  <PopoverItem>
                    Bantuan
                  </PopoverItem>
                </Link>
                <PopoverItem onClick={() => { window.location.href = '/login'; }}>
                  Keluar
                </PopoverItem>
              </PopoverMenu>
            </div>
          </SidebarNavList>
          
          <SidebarFooter>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.25rem' }}>
              <DeviceModeSwitcher />
            </div>
            
            <SidebarLevelCard href="/stats" title={`${progress.exp} Total EXP`}>
              <SidebarLevelHeader>
                <span>LEVEL {level}</span>
                <span>{progress.exp} EXP</span>
              </SidebarLevelHeader>
              <SidebarProgressBar>
                <SidebarProgressFill $width={percent} />
              </SidebarProgressBar>
            </SidebarLevelCard>
            
            <SidebarActionButtons>
              <SidebarActionButton onClick={() => setIsDictionaryOpen(true)} title="Dictionary (Jisho)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                Dictionary
              </SidebarActionButton>
              
              <SidebarActionButton onClick={() => setIsSettingsOpen(true)} title="Settings">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                </svg>
                Settings
              </SidebarActionButton>
            </SidebarActionButtons>
          </SidebarFooter>
        </SidebarRoot>
      )}

      <NavRoot $hideOnDesktop={isWidescreenMobileSim}>
        <NavContainer>
          {isMounted && deviceMode === 'mobile' ? (
            <>
              <Logo href="/" onClick={() => setIsMobileMenuOpen(false)}>
                🇯🇵 <span>JapanApp</span>
              </Logo>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center', flex: 1, margin: '0 0.25rem' }}>
                <DeviceModeSwitcher />
                <Link href="/stats" style={{ textDecoration: 'none' }}>
                  <LevelBadge style={{ borderRadius: '999px', fontSize: '0.68rem', padding: '4px 8px' }} title={`${progress.exp} Total EXP`}>
                    LVL {level}
                  </LevelBadge>
                </Link>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <SearchBtn onClick={() => setIsDictionaryOpen(true)} title="Dictionary (Jisho)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </SearchBtn>
                <UserBtn href="/profile" title="Profile">
                  <UserIcon size={20} />
                </UserBtn>
                <SettingsBtn onClick={() => setIsSettingsOpen(true)} title="Settings">
                  <svg viewBox="0 0 24 24">
                    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                  </svg>
                </SettingsBtn>
              </div>
            </>
          ) : (
            <>
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
                  <StyledLink href="/characters" $active={pathname.startsWith('/characters')}>Characters</StyledLink>
                </NavItem>

                <NavItem>
                  <StyledLink href="/practice" $active={pathname === '/practice'}>Practice</StyledLink>
                </NavItem>

                <NavItem>
                  <StyledLink href="/quiz" $active={pathname.startsWith('/quiz')}>Quiz</StyledLink>
                </NavItem>
                <NavItem>
                  <StyledLink href="/materi" $active={pathname.startsWith('/materi')}>Materials</StyledLink>
                </NavItem>
                <NavItem>
                  <StyledLink href="/practice-sheets" $active={pathname === '/practice-sheets'}>Sheets</StyledLink>
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
                  <StyledLink href="/profile" $active={pathname === '/profile'}>Profile</StyledLink>
                </NavItem>
                <NavItem>
                  <StyledLink href="/contact" $active={pathname === '/contact'}>Contact</StyledLink>
                </NavItem>
              </NavList>

              <RightNavContainer>
                <DeviceModeSwitcher />
                
                <Link href="/stats" style={{ textDecoration: 'none' }}>
                  <LevelBadge title={`${progress.exp} Total EXP`}>
                    LVL {level} <span className="level-bar">{'▰'.repeat(Math.round(percent / 20)) + '▱'.repeat(5 - Math.round(percent / 20))}</span>
                  </LevelBadge>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <SearchBtn 
                    $isOpen={isMobileMenuOpen} 
                    onClick={() => setIsDictionaryOpen(true)} 
                    title="Dictionary (Jisho)"
                    $hideOnMobile={deviceMode === 'pc'}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </SearchBtn>

                  <UserBtn 
                    href="/profile" 
                    title="Profile"
                    $hideOnMobile={deviceMode === 'pc'}
                  >
                    <UserIcon size={22} />
                  </UserBtn>

                  <SettingsBtn $isOpen={isMobileMenuOpen} onClick={() => setIsSettingsOpen(true)} title="Settings">
                    <svg viewBox="0 0 24 24">
                      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                    </svg>
                  </SettingsBtn>
                </div>

                {isMounted && deviceMode !== 'mobile' && (
                  <HamburgerBtn
                    $isOpen={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                    $isMobileMode={false}
                  >
                    {isMobileMenuOpen ? (
                      <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
                    )}
                  </HamburgerBtn>
                )}
              </RightNavContainer>
            </>
          )}
        </NavContainer>

        <MobileMenuOverlay $isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(false)} />
        <MobileMenu $isOpen={isMobileMenuOpen}>
          <MobileLink href="/" $active={pathname === '/'} $isOpen={isMobileMenuOpen} $delay={0.1} onClick={() => setIsMobileMenuOpen(false)}>
            Home
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink>

          <MobileLink href="/study" $active={pathname.startsWith('/study')} $isOpen={isMobileMenuOpen} $delay={0.17} onClick={() => setIsMobileMenuOpen(false)}>
            Study
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink>
          <MobileLink href="/characters" $active={pathname.startsWith('/characters')} $isOpen={isMobileMenuOpen} $delay={0.18} onClick={() => setIsMobileMenuOpen(false)}>
            Characters
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink>
          <MobileLink href="/practice" $active={pathname === '/practice'} $isOpen={isMobileMenuOpen} $delay={0.19} onClick={() => setIsMobileMenuOpen(false)}>
            Practice
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
          <MobileLink href="/practice-sheets" $active={pathname === '/practice-sheets'} $isOpen={isMobileMenuOpen} $delay={0.28} onClick={() => setIsMobileMenuOpen(false)}>
            Practice Sheets
            <span><ArrowRightIcon size={18} /></span>
          </MobileLink>
          <MobileLink href="/jlpt" $active={pathname.startsWith('/jlpt')} $isOpen={isMobileMenuOpen} $delay={0.31} onClick={() => setIsMobileMenuOpen(false)}>
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
          <MobileLink href="/profile" $active={pathname === '/profile'} $isOpen={isMobileMenuOpen} $delay={0.55} onClick={() => setIsMobileMenuOpen(false)}>
            Profile
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
            $delay={0.8}
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

      {isMounted && deviceMode === 'mobile' && (
        <BottomBar $isMounted={isMounted}>
          <BottomTab href="/" $active={pathname === '/'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Learn
          </BottomTab>
          <BottomTab href="/characters" $active={pathname.startsWith('/characters')}>
            <CharactersIcon />
            Characters
          </BottomTab>
          <BottomTab href="/practice" $active={pathname === '/practice'}>
            <PracticeIcon />
            Practice
          </BottomTab>
          <BottomTab href="/jlpt" $active={pathname.startsWith('/jlpt')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            JLPT
          </BottomTab>
          <BottomTab href="/game" $active={pathname.startsWith('/game')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="3" />
              <line x1="6" y1="12" x2="10" y2="12" />
              <line x1="8" y1="10" x2="8" y2="14" />
              <line x1="15" y1="13" x2="15.01" y2="13" />
              <line x1="18" y1="11" x2="18.01" y2="11" />
            </svg>
            Game
          </BottomTab>
          <BottomTab href="/profile" $active={pathname === '/profile'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Profile
          </BottomTab>
        </BottomBar>
      )}
    </>
  );
}
