"use client";

import { FloatingDock } from "@/components/mobile/FloatingDock";
import { useDeviceMode } from "@/context/DeviceModeContext";
import { useProgress } from "@/context/ProgressContext";
import { isItemDue } from "@/lib/srs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import { UserIcon } from "./icons/AppIcons";
import { JapanAppLogoIcon } from "@/components/common/JapanAppLogoIcon";

const DictionarySearchOverlay = dynamic(
  () => import("./dictionary/DictionarySearchOverlay"),
  { ssr: false },
);

const NavRoot = styled.nav<{ $hideOnDesktop?: boolean; $isMenuOpen?: boolean }>`
  position: sticky;
  top: 0;
  z-index: ${({ $isMenuOpen }) => ($isMenuOpen ? 1005 : 100)};
  background: var(--navbar-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--navbar-border);
  transition: all 0.3s ease;
  /* Prevent navbar itself from being wider than the viewport */
  width: 100%;
  max-width: 100vw;
  /* PWA Touch optimizations */
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;

  ${({ $hideOnDesktop }) =>
    $hideOnDesktop &&
    css`
      @media (min-width: 1101px) {
        margin-left: 240px;
        width: calc(100% - 240px);
        max-width: calc(100% - 240px);
      }
    `}

  @media (max-width: 1100px) {
    background: var(--surface);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`;

const AppTopHeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.4rem 1.25rem;
  min-height: 48px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.35rem 0.75rem;
  }
`;

const DesktopBreadcrumbsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.85rem;
  font-family: "Nunito", "Outfit", sans-serif;
  user-select: none;

  @media (max-width: 1100px) {
    display: none !important;
  }
`;

const BreadcrumbItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
`;

const BreadcrumbLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--primary);
  }
`;

const BreadcrumbCurrent = styled.span`
  color: var(--foreground);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const BreadcrumbSeparator = styled.span`
  color: var(--text-secondary);
  opacity: 0.5;
  font-size: 0.75rem;
  user-select: none;
`;

const DesktopHeaderActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;

  @media (max-width: 1100px) {
    display: none !important;
  }
`;

const SearchPillButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.38rem 0.85rem;
  color: var(--text-secondary);
  font-size: 0.84rem;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(255, 255, 255, 0.2);
    color: var(--foreground);
  }

  svg {
    width: 15px;
    height: 15px;
    stroke-width: 2.2;
    opacity: 0.85;
  }
`;

const KbdShortcutBadge = styled.kbd`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1px 6px;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-secondary);
  font-family: monospace;
`;

const HeaderIconButton = styled.button<{ $active?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ $active }) =>
    $active ? "rgba(var(--primary-rgb), 0.15)" : "transparent"};
  border: 1px solid ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  color: ${({ $active }) => ($active ? "var(--primary)" : "var(--text-secondary)")};
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.85;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.08);
    color: var(--foreground);
  }

  svg {
    width: 19px;
    height: 19px;
    stroke-width: 2;
  }
`;

const NotificationBadgeDot = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  border: 2px solid var(--surface);
`;

const NotificationPopover = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 300px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  z-index: 1000;
  font-family: "Nunito", "Outfit", sans-serif;
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);

  h4 {
    margin: 0;
    font-size: 0.88rem;
    font-weight: 800;
    color: var(--foreground);
  }
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NotificationItem = styled.div`
  display: flex;
  gap: 0.6rem;
  padding: 0.5rem 0.6rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  font-size: 0.78rem;
  color: var(--foreground);
`;

const AppTopLeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;

  @media (max-width: 640px) {
    display: none;
  }
`;

const StatPill = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 99px;
  padding: 0.28rem 0.75rem;
  font-size: 0.76rem;
  font-weight: 800;
  color: var(--foreground);
`;

const AppTopRightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
`;

const StatusChip = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 12px;
  padding: 0.3rem 0.65rem;
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--foreground);
  box-shadow: var(--shadow-sm);
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 0.72rem;
    padding: 0.25rem 0.45rem;
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
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark) 100%
  );
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
  max-width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;

  @media (max-width: 600px) {
    padding: 0 0.75rem;
    gap: 0; /* Children manage their own spacing */
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
  flex-shrink: 0; /* Never compress the logo on tight mobile screens */

  &:hover {
    opacity: 0.8;
  }

  span {
    background: linear-gradient(
      135deg,
      var(--primary) 0%,
      var(--primary-light) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 600px) {
    font-size: 0.95rem;
    gap: 6px;
  }

  @media (max-width: 400px) {
    font-size: 0.88rem;
    gap: 4px;
    span {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 350px) {
    span {
      display: none;
    }
  }
`;

const MobileHeaderLogo = styled(Logo)`
  @media (min-width: 1101px) {
    display: none !important;
  }
`;

const MobileHeaderGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 1101px) {
    display: none !important;
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

const StyledLink = styled(Link)<{ $active?: boolean }>`
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: color 0.2s ease;

  &:hover {
    color: var(--primary);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 140px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: "";
    position: absolute;
    top: -12px;
    left: 0;
    right: 0;
    height: 12px;
    background: transparent;
  }

  ${NavItem}:hover & {
    opacity: 1;
    pointer-events: all;
    transform: translateX(-50%) translateY(5px);
  }
`;

const DropdownItem = styled(Link)<{ $active?: boolean; $isDev?: boolean }>`
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: ${({ $active, $isDev }) =>
    $isDev ? "#a855f7" : $active ? "var(--primary)" : "var(--text-secondary)"};
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(var(--primary-rgb), 0.08);
    color: ${({ $isDev }) => ($isDev ? "#c084fc" : "var(--primary)")};
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
    display: ${({ $hideOnMobile }) =>
      $hideOnMobile ? "none" : "flex"} !important;
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
  text-decoration: none;

  &:hover {
    color: var(--primary);
    background: rgba(var(--primary-rgb), 0.15);
    opacity: 1;
  }

  @media (max-width: 600px) {
    padding: 5px;
    display: ${({ $hideOnMobile }) =>
      $hideOnMobile ? "none" : "flex"} !important;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

const HamburgerBtn = styled.button<{
  $isOpen: boolean;
  $isMobileMode?: boolean;
}>`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--foreground);
  padding: 0.5rem;
  z-index: 102; /* Above mobile menu */

  @media (max-width: 1100px) {
    display: ${({ $isMobileMode }) => ($isMobileMode ? "none" : "flex")};
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
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(90deg)" : "rotate(0)")};
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
  font-family: "DM Mono", monospace;
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

const MobileMenuOverlay = styled.div<{
  $isOpen: boolean;
  $dragOpacity?: number;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 1000; /* Behind bottom sheet but above body content */
  opacity: ${({ $isOpen, $dragOpacity }) =>
    $isOpen ? ($dragOpacity !== undefined ? $dragOpacity : 1) : 0};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "all" : "none")};
  transition:
    opacity 0.35s ease,
    visibility 0.35s ease;

  @media (min-width: 1101px) {
    display: none !important;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  top: auto;
  left: 0;
  width: 100%;
  max-height: 75vh;
  background-color: var(--surface) !important;
  border-radius: 32px 32px 0 0;
  border-top: 2px solid var(--border);
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.15);
  z-index: 1001; /* Above overlay */
  padding: 1rem 1.25rem calc(1.5rem + env(safe-area-inset-bottom, 0px));
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition:
    transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    visibility 0.45s ease;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(0)" : "translateY(100%)"};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "all" : "none")};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;

  @media (min-width: 1101px) {
    display: none !important;
  }
`;

const NorenRodWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  margin: -0.25rem 0 0.25rem 0;
  cursor: grab;
  touch-action: none;
  flex-shrink: 0;

  &:active {
    cursor: grabbing;
  }
`;

const NorenRod = styled.div`
  width: 52px;
  height: 5px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 99px;
  transition: background 0.2s;

  html.dark & {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const KanjiBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: rgba(var(--primary-rgb), 0.08);
  color: var(--primary);
  font-weight: 800;
  font-size: 0.82rem;
  font-family: "Noto Sans JP", sans-serif;
  border: 1px solid rgba(var(--primary-rgb), 0.15);
  line-height: 1;
  flex-shrink: 0;
  transition: all 0.2s ease;

  html.dark & {
    background: rgba(var(--primary-rgb), 0.15);
    color: var(--primary-light);
    border-color: rgba(var(--primary-rgb), 0.3);
  }
`;

const MobileLink = styled(Link)<{
  $active?: boolean;
  $isOpen: boolean;
  $delay: number;
}>`
  font-size: 0.88rem;
  font-weight: ${({ $active }) => ($active ? "700" : "600")};
  color: ${({ $active }) => ($active ? "var(--primary)" : "var(--foreground)")};
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.5rem 0.65rem;
  text-decoration: none;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;

  /* Staggered animation */
  opacity: 0;
  transform: translateY(15px);
  ${({ $isOpen }) =>
    $isOpen &&
    `
    opacity: 1;
    transform: translateY(0);
  `}
  transition-property: opacity, transform, color, padding, border, background;
  transition-delay: ${({ $delay }) => $delay}s;

  &:active {
    transform: scale(0.97);
  }
`;

const MobileMenuSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const MobileSectionIndicator = styled.span`
  width: 3px;
  height: 12px;
  background-color: var(--primary);
  border-radius: 2px;
  display: inline-block;
`;

const MobileMenuSectionTitle = styled.div<{ $isOpen: boolean; $delay: number }>`
  grid-column: span 2;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-secondary);
  padding: 0.8rem 0.5rem 0.35rem;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1.5px dashed var(--border);
  margin-bottom: 0.25rem;

  /* Staggered animation */
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${({ $delay }) => $delay}s;
  ${({ $isOpen }) =>
    $isOpen &&
    `
    opacity: 0.85;
    transform: translateY(0);
  `}
`;

const MobileDictBtn = styled.div<{ $isOpen: boolean; $delay: number }>`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    rgba(79, 70, 229, 0.1) 0%,
    rgba(59, 130, 246, 0.05) 100%
  );
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
  ${({ $isOpen }) =>
    $isOpen &&
    `
    opacity: 1;
    transform: translateY(0);
  `}
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${({ $delay }) => $delay}s;

  &:hover {
    background: rgba(79, 70, 229, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -5px rgba(79, 70, 229, 0.2);
  }

  svg {
    stroke-width: 2.5;
  }
`;

const BottomBar = styled.div<{ $isMounted: boolean }>`
  display: none;

  @media (max-width: 1100px) {
    display: ${({ $isMounted }) => ($isMounted ? "flex" : "none")};
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

const BottomTab = styled(Link)<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};
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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LearnIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function GameIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function QuestsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M3 11V8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v3" />
      <path d="M12 11v4" />
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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 12h12" />
      <path d="M6 8v8M4 7v10M2 9v6" />
      <path d="M18 8v8M20 7v10M22 9v6" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function StatsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v20M17 5v17M7 9v13" />
    </svg>
  );
}

function AboutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
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
    font-family: "Nunito", "Outfit", sans-serif;
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
    background: linear-gradient(
      135deg,
      var(--primary) 0%,
      var(--primary-light) 100%
    );
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
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};
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

  ${({ $active }) =>
    $active &&
    css`
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
  background: linear-gradient(
    90deg,
    var(--primary) 0%,
    var(--primary-light) 100%
  );
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
  text-decoration: none;

  &:hover {
    color: var(--primary);
    border-color: var(--primary);
    background: rgba(var(--primary-rgb), 0.06);
    text-decoration: none;
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
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};
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

  ${({ $active }) =>
    $active &&
    css`
      background: rgba(var(--primary-rgb), 0.12);
      border: 2px solid var(--primary);
      color: var(--primary);
    `}
`;

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="2" />
      <circle cx="18" cy="12" r="2" />
      <circle cx="6" cy="12" r="2" />
    </svg>
  );
}

const PopoverMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  left: 215px;
  top: -180px;
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
  transform: ${({ $isOpen }) =>
    $isOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(10px)"};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "all" : "none")};
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

  svg {
    width: 18px !important;
    height: 18px !important;
    flex-shrink: 0;
  }
`;

const PopoverDivider = styled.div`
  height: 1.5px;
  background: var(--border);
  margin: 0.35rem 0.25rem;
`;

function CertificateIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "18px", height: "18px", flexShrink: 0 }}
    >
      <path
        d="M12 2L15 5L19 4L18 8L21 11L17 12L16 16L12 15L8 16L7 12L3 11L6 8L5 4L9 5L12 2Z"
        fill="#22c55e"
      />
      <circle cx="12" cy="9.5" r="3.5" fill="white" />
      <path
        d="M10 14L12 17L14 14"
        stroke="#22c55e"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "18px", height: "18px", color: "#3b82f6", flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function QuizIcon({ fill, stroke, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill={fill || "none"}
        stroke={stroke || "currentColor"}
        strokeWidth="2.5"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke={stroke || "currentColor"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookIcon({ stroke, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke || "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function StudyIcon({ stroke, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke || "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

function SheetsIcon({ stroke, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke || "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
    </svg>
  );
}

function BlogIcon({ stroke, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke || "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function ContactIcon({ stroke, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke || "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

const ROUTE_NAME_MAP: Record<string, string> = {
  home: "Home",
  learning: "Learn",
  characters: "Characters",
  hiragana: "Hiragana",
  katakana: "Katakana",
  kanji: "Kanji",
  jlpt: "JLPT",
  "kanji-writer": "Kanji Writer",
  "jlpt-simulasi": "JLPT Simulasi",
  simulasi: "Simulasi Exam",
  flashcards: "Flashcards",
  "mini-test": "Mini Test",
  practice: "Practice",
  quiz: "Quiz",
  game: "Games",
  study: "Practice",
  speaking: "Speaking",
  listening: "Listening",
  reading: "Reading",
  vocabulary: "Vocabulary",
  "smart-flashcards": "Smart Flashcards",
  "kana-flashcards": "Kana Flashcards",
  "grammar-drills": "Grammar Drills",
  materials: "Learning Materials",
  "practice-sheets": "Practice Sheets",
  "match-pairs": "Match Pairs",
  profile: "Profile",
  edit: "Edit Profile",
  settings: "Settings",
  help: "Bantuan",
  contact: "Contact",
  development: "Development Labs",
  hafalan: "Hafalan",
  quests: "Misi & Quests",
  lesson: "Lesson Player",
};

function formatSegmentLabel(segment: string): string {
  const lower = segment.toLowerCase();
  if (ROUTE_NAME_MAP[lower]) {
    return ROUTE_NAME_MAP[lower];
  }
  // Convert kebab-case or slug to Capital Case (e.g. n5 -> N5, jlpt-n5 -> JLPT N5)
  if (/^n[1-5]$/i.test(segment)) {
    return `${segment.toUpperCase()} Level`;
  }
  return segment
    .split("-")
    .map((word) => {
      if (word.toLowerCase() === "jlpt") return "JLPT";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: "JapanApp", href: "/", icon: "▦" },
  ];

  if (!pathname || pathname === "/") {
    items.push({ label: "Learn" });
    return items;
  }

  const rawSegments = pathname.split("/").filter(Boolean);
  let currentPath = "";

  rawSegments.forEach((segment, idx) => {
    currentPath += `/${segment}`;
    const isLast = idx === rawSegments.length - 1;
    const label = formatSegmentLabel(segment);

    items.push({
      label,
      href: isLast ? undefined : currentPath,
    });
  });

  return items;
}

export function Navbar() {
  const pathname = usePathname() || "";

  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLainnyaOpen, setIsLainnyaOpen] = useState(false);
  const lainnyaRef = useRef<HTMLDivElement>(null);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close notifications menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Global shortcut for opening Search modal via "/" key
  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(
          (e.target as HTMLElement)?.tagName
        )
      ) {
        e.preventDefault();
        setIsDictionaryOpen(true);
      }
    }
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Drag-to-dismiss state for Mobile Bottom Sheet
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Reset dragY when menu opens/closes
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setDragY(0);
      setIsDragging(false);
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu automatically on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    const menuEl = mobileMenuRef.current;
    if (!menuEl || menuEl.scrollTop <= 0) {
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const menuEl = mobileMenuRef.current;
    if (touchStartY.current > 0) {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - touchStartY.current;

      if (deltaY > 0 && (!menuEl || menuEl.scrollTop <= 0)) {
        setIsDragging(true);
        setDragY(deltaY);
      }
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      const timeElapsed = Date.now() - touchStartTime.current;
      const velocity = dragY / Math.max(1, timeElapsed);

      if (dragY > 80 || velocity > 0.3) {
        setIsMobileMenuOpen(false);
      } else {
        setDragY(0);
      }
      setIsDragging(false);
    }
    touchStartY.current = 0;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        lainnyaRef.current &&
        !lainnyaRef.current.contains(event.target as Node)
      ) {
        setIsLainnyaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

  const isDailyCompleted = useMemo(() => {
    if (!progress.quizHistory) return false;
    const today = new Date().toISOString().split("T")[0];
    return progress.quizHistory.some(
      (q) => q.date.split("T")[0] === today && q.type === "daily-challenge",
    );
  }, [progress.quizHistory]);

  // Prevent background scrolling when mobile menu is open and toggle helper class
  useEffect(() => {
    const html = document.documentElement;
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      html.classList.add("mobile-menu-open");
    } else {
      document.body.style.overflow = "unset";
      html.classList.remove("mobile-menu-open");
    }

    return () => {
      document.body.style.overflow = "unset";
      html.classList.remove("mobile-menu-open");
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu, "Lainnya" popover menu, and dictionary modal on Escape key press
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsLainnyaOpen(false);
        setIsDictionaryOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close menu when route changes (optional, but good for UX if Link doesn't fully reload)
  // We handle it via onClick on Links usually
  if (pathname === "/login" || pathname === "/register") return null;

  const isWidescreenMobileSim = isMounted && deviceMode === "mobile";

  return (
    <>
      {isWidescreenMobileSim && <GlobalSidebarPadding />}

      {/* Permanent Left Sidebar for Desktop view */}
      {isWidescreenMobileSim && (
        <SidebarRoot>
          <SidebarLogo href="/">
            <JapanAppLogoIcon size={26} /> <span>JapanApp</span>
          </SidebarLogo>

          <SidebarNavList>
            <SidebarNavItem href="/home" $active={pathname === "/home"}>
              <HomeIcon />
              Home
            </SidebarNavItem>

            <SidebarNavItem
              href="/"
              $active={pathname === "/" || pathname === "/learning"}
            >
              <LearnIcon />
              Learn
            </SidebarNavItem>

            <SidebarNavItem
              href="/characters"
              $active={pathname.startsWith("/characters")}
            >
              <CharactersIcon />
              Characters
            </SidebarNavItem>

            <SidebarNavItem href="/jlpt" $active={pathname.startsWith("/jlpt")}>
              <JlptIcon />
              JLPT
            </SidebarNavItem>

            <SidebarNavItem
              href="/quests"
              $active={pathname.startsWith("/quests")}
            >
              <QuestsIcon />
              Quests
            </SidebarNavItem>

            <SidebarNavItem
              href="/practice"
              $active={
                pathname.startsWith("/practice") ||
                pathname.startsWith("/study")
              }
            >
              <PracticeIcon />
              Practice
            </SidebarNavItem>

            <SidebarNavItem href="/quiz" $active={pathname.startsWith("/quiz")}>
              <QuizIcon />
              Quiz
            </SidebarNavItem>

            <SidebarNavItem href="/game" $active={pathname.startsWith("/game")}>
              <GameIcon />
              Game
            </SidebarNavItem>

            <SidebarNavItem
              href="/materi"
              $active={pathname.startsWith("/materi")}
            >
              <BookIcon />
              Learning Materials
            </SidebarNavItem>

            <SidebarNavItem href="/profile" $active={pathname === "/profile"}>
              {progress.profile?.avatar ? (
                <span
                  style={{
                    fontSize: "1.25rem",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {progress.profile.avatar}
                </span>
              ) : (
                <ProfileIcon />
              )}
              Profile
            </SidebarNavItem>

            {/* LAINNYA / MORE DROPDOWN TOGGLE */}
            <div style={{ position: "relative" }} ref={lainnyaRef}>
              <SidebarNavButton
                onClick={() => setIsLainnyaOpen(!isLainnyaOpen)}
                $active={isLainnyaOpen}
              >
                <MoreIcon />
                Lainnya
              </SidebarNavButton>

              <PopoverMenu $isOpen={isLainnyaOpen}>
                <Link
                  href="/practice-sheets"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => setIsLainnyaOpen(false)}
                >
                  <PopoverItem>
                    <SheetsIcon stroke="#f59e0b" />
                    Practice Sheets
                  </PopoverItem>
                </Link>
                <Link
                  href="/blog"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => setIsLainnyaOpen(false)}
                >
                  <PopoverItem>
                    <BlogIcon stroke="#a855f7" />
                    Blog
                  </PopoverItem>
                </Link>
                <Link
                  href="/about"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => setIsLainnyaOpen(false)}
                >
                  <PopoverItem>
                    <AboutIcon stroke="#6366f1" />
                    About
                  </PopoverItem>
                </Link>
                <Link
                  href="/contact"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => setIsLainnyaOpen(false)}
                >
                  <PopoverItem>
                    <ContactIcon stroke="#ec4899" />
                    Contact
                  </PopoverItem>
                </Link>

                <PopoverDivider />
                <Link
                  href="/development"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => setIsLainnyaOpen(false)}
                >
                  <PopoverItem style={{ color: "#8b5cf6" }}>
                    <span>🚧</span> Development Labs
                  </PopoverItem>
                </Link>

                <Link
                  href="/settings"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => setIsLainnyaOpen(false)}
                >
                  <PopoverItem>Pengaturan</PopoverItem>
                </Link>
                <Link
                  href="/help"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => setIsLainnyaOpen(false)}
                >
                  <PopoverItem>Bantuan</PopoverItem>
                </Link>
                <PopoverItem
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  Keluar
                </PopoverItem>
              </PopoverMenu>
            </div>
          </SidebarNavList>

          <SidebarFooter>
            <SidebarLevelCard
              href="/profile"
              title={`${progress.exp} Total EXP`}
            >
              <SidebarLevelHeader>
                <span>LEVEL {level}</span>
                <span>{progress.exp} EXP</span>
              </SidebarLevelHeader>
              <SidebarProgressBar>
                <SidebarProgressFill $width={percent} />
              </SidebarProgressBar>
            </SidebarLevelCard>

            <SidebarActionButtons>
              <SidebarActionButton
                onClick={() => setIsDictionaryOpen(true)}
                title="Dictionary (Jisho)"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                Dictionary
              </SidebarActionButton>

              <SidebarActionButton as={Link} href="/settings" title="Settings">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                </svg>
                Settings
              </SidebarActionButton>
            </SidebarActionButtons>
          </SidebarFooter>
        </SidebarRoot>
      )}

      <NavRoot
        $hideOnDesktop={isWidescreenMobileSim}
        $isMenuOpen={isMobileMenuOpen}
      >
        <NavContainer>
          {isMounted && deviceMode === "mobile" ? (
            <AppTopHeaderBar>
              <DesktopBreadcrumbsWrapper>
                {getBreadcrumbs(pathname).map((crumb, idx, arr) => {
                  const isLast = idx === arr.length - 1;
                  return (
                    <BreadcrumbItemContainer key={idx}>
                      {idx > 0 && <BreadcrumbSeparator>›</BreadcrumbSeparator>}
                      {isLast || !crumb.href ? (
                        <BreadcrumbCurrent>
                          {crumb.icon && <span>{crumb.icon}</span>}
                          <span>{crumb.label}</span>
                        </BreadcrumbCurrent>
                      ) : (
                        <BreadcrumbLink href={crumb.href}>
                          {crumb.icon && <span>{crumb.icon}</span>}
                          <span>{crumb.label}</span>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItemContainer>
                  );
                })}
              </DesktopBreadcrumbsWrapper>

              <MobileHeaderLogo href="/" onClick={() => setIsMobileMenuOpen(false)}>
                🇯🇵 <span>JapanApp</span>
              </MobileHeaderLogo>

              <AppTopRightGroup>
                {/* PC Desktop Toolbar Actions (Search [/], Sparkles AI, Notifications, Help, Settings) */}
                <DesktopHeaderActionsWrapper ref={notificationsRef}>
                  <SearchPillButton
                    onClick={() => setIsDictionaryOpen(true)}
                    title="Cari kata/kanji (Kamus Jisho) - Tekan tombol /"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span>Search</span>
                    <KbdShortcutBadge>/</KbdShortcutBadge>
                  </SearchPillButton>

                  <HeaderIconButton
                    title="AI Assistant"
                    type="button"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.937A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z" />
                      <path d="M20 3v4" />
                      <path d="M22 5h-4" />
                    </svg>
                  </HeaderIconButton>

                  <div style={{ position: "relative" }}>
                    <HeaderIconButton
                      $active={isNotificationsOpen}
                      onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                      title="Pemberitahuan & Notifikasi"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                      <NotificationBadgeDot />
                    </HeaderIconButton>

                    {isNotificationsOpen && (
                      <NotificationPopover>
                        <NotificationHeader>
                          <h4>🔔 Notifikasi & Update</h4>
                        </NotificationHeader>
                        <NotificationList>
                          <NotificationItem>
                            <span>🔥</span>
                            <div>
                              <strong>Streak Pertahankan!</strong>
                              <br />
                              Lanjutkan latihan hari ini untuk mempertahankan streak kamu.
                            </div>
                          </NotificationItem>
                          <NotificationItem>
                            <span>💎</span>
                            <div>
                              <strong>Bonus Daily Quest!</strong>
                              <br />
                              Selesaikan 3 misi harian untuk mendapatkan 20 permata.
                            </div>
                          </NotificationItem>
                        </NotificationList>
                      </NotificationPopover>
                    )}
                  </div>

                  <HeaderIconButton
                    as={Link}
                    href="/help"
                    title="Bantuan & Pusat Panduan"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </HeaderIconButton>

                  <HeaderIconButton
                    as={Link}
                    href="/settings"
                    title="Pengaturan"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </HeaderIconButton>
                </DesktopHeaderActionsWrapper>

                <MobileHeaderGroup>
                  <Link
                    href="/profile"
                    style={{ textDecoration: "none", flexShrink: 0 }}
                  >
                    <LevelBadge
                      style={{
                        borderRadius: "999px",
                        fontSize: "0.68rem",
                        padding: "3px 8px",
                      }}
                      title={`${progress.exp} Total EXP`}
                    >
                      LVL {level}
                    </LevelBadge>
                  </Link>

                  <SearchBtn
                    onClick={() => setIsDictionaryOpen(true)}
                    title="Dictionary (Jisho)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </SearchBtn>

                  <UserBtn href="/profile" title="Profile">
                    {progress.profile?.avatar ? (
                      <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>
                        {progress.profile.avatar}
                      </span>
                    ) : (
                      <UserIcon size={20} />
                    )}
                  </UserBtn>

                  <HamburgerBtn
                    $isOpen={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                  >
                    {isMobileMenuOpen ? (
                      <svg viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 12z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                      </svg>
                    )}
                  </HamburgerBtn>
                </MobileHeaderGroup>
              </AppTopRightGroup>
            </AppTopHeaderBar>
          ) : (
            <>
              <Logo href="/" onClick={() => setIsMobileMenuOpen(false)}>
                🇯🇵 <span>JapanApp</span>
              </Logo>

              <NavList>
                <NavItem>
                  <StyledLink href="/home" $active={pathname === "/home"}>
                    Home
                  </StyledLink>
                </NavItem>
                <NavItem>
                  <StyledLink
                    href="/"
                    $active={pathname === "/" || pathname === "/learning"}
                  >
                    Learn
                  </StyledLink>
                </NavItem>

                <NavItem>
                  <StyledLink
                    href="/characters"
                    $active={pathname.startsWith("/characters")}
                  >
                    Characters
                  </StyledLink>
                </NavItem>
                <NavItem>
                  <StyledLink
                    href="/practice"
                    $active={
                      pathname.startsWith("/practice") ||
                      pathname.startsWith("/study")
                    }
                  >
                    Practice
                  </StyledLink>
                </NavItem>

                <NavItem>
                  <StyledLink
                    href="/quiz"
                    $active={pathname.startsWith("/quiz")}
                  >
                    Quiz
                  </StyledLink>
                </NavItem>
                <NavItem>
                  <StyledLink
                    href="/jlpt"
                    $active={pathname.startsWith("/jlpt")}
                  >
                    JLPT
                  </StyledLink>
                </NavItem>
                <NavItem>
                  <StyledLink
                    href="/game"
                    $active={pathname.startsWith("/game")}
                  >
                    Game
                  </StyledLink>
                </NavItem>
                <NavItem>
                  <StyledLink
                    href="/blog"
                    $active={pathname.startsWith("/blog")}
                  >
                    Blog
                  </StyledLink>
                </NavItem>
                {/* <NavItem>
                  <StyledLink href="/careers" $active={pathname === '/careers'}>Careers</StyledLink>
                </NavItem> */}

                <NavItem>
                  <StyledLink
                    href="/quests"
                    $active={pathname.startsWith("/quests")}
                  >
                    Misi
                  </StyledLink>
                </NavItem>
                <NavItem>
                  <StyledLink href="/profile" $active={pathname === "/profile"}>
                    Profile
                  </StyledLink>
                </NavItem>
                <NavItem>
                  <StyledLink
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    More
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "12px", height: "12px" }}
                      suppressHydrationWarning
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </StyledLink>
                  <DropdownMenu>
                    <DropdownItem
                      href="/materi"
                      $active={pathname.startsWith("/materi")}
                    >
                      Materials
                    </DropdownItem>
                    <DropdownItem
                      href="/practice-sheets"
                      $active={pathname === "/practice-sheets"}
                    >
                      Sheets
                    </DropdownItem>
                    <DropdownItem
                      href="/development"
                      $active={pathname === "/development"}
                      $isDev={true}
                      suppressHydrationWarning
                    >
                      🚧 Development Labs
                    </DropdownItem>
                    <DropdownItem href="/about" $active={pathname === "/about"}>
                      About
                    </DropdownItem>
                    <DropdownItem
                      href="/contact"
                      $active={pathname === "/contact"}
                    >
                      Contact
                    </DropdownItem>
                  </DropdownMenu>
                </NavItem>
              </NavList>

              <RightNavContainer>
                <Link href="/profile" style={{ textDecoration: "none" }}>
                  <LevelBadge title={`${progress.exp} Total EXP`}>
                    LVL {level}{" "}
                    <span className="level-bar">
                      {"▰".repeat(Math.round(percent / 20)) +
                        "▱".repeat(5 - Math.round(percent / 20))}
                    </span>
                  </LevelBadge>
                </Link>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2rem",
                  }}
                >
                  <SearchBtn
                    $isOpen={isMobileMenuOpen}
                    onClick={() => setIsDictionaryOpen(true)}
                    title="Dictionary (Jisho)"
                    $hideOnMobile={deviceMode === "pc"}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </SearchBtn>

                  <UserBtn
                    href="/profile"
                    title="Profile"
                    $hideOnMobile={deviceMode === "pc"}
                  >
                    {progress.profile?.avatar ? (
                      <span style={{ fontSize: "1.3rem", lineHeight: 1 }}>
                        {progress.profile.avatar}
                      </span>
                    ) : (
                      <UserIcon size={22} />
                    )}
                  </UserBtn>

                  <SettingsBtn
                    $isOpen={isMobileMenuOpen}
                    as={Link}
                    href="/settings"
                    title="Settings"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                    </svg>
                  </SettingsBtn>
                </div>

                {isMounted && deviceMode !== "mobile" && (
                  <HamburgerBtn
                    $isOpen={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                    $isMobileMode={false}
                  >
                    {isMobileMenuOpen ? (
                      <svg viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                      </svg>
                    )}
                  </HamburgerBtn>
                )}
              </RightNavContainer>
            </>
          )}
        </NavContainer>

        <MobileMenuOverlay
          $isOpen={isMobileMenuOpen}
          $dragOpacity={isDragging ? Math.max(0, 1 - dragY / 300) : undefined}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <MobileMenu
          ref={mobileMenuRef}
          $isOpen={isMobileMenuOpen}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: isDragging
              ? `translateY(${dragY}px)`
              : isMobileMenuOpen
                ? "translateY(0)"
                : "translateY(100%)",
            visibility: isMobileMenuOpen || isDragging ? "visible" : "hidden",
            transition: isDragging
              ? "none"
              : isMobileMenuOpen
                ? "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.45s"
                : "none",
          }}
        >
          <NorenRodWrapper>
            <NorenRod />
          </NorenRodWrapper>

          {/* SECTION 1: FITUR PEMBELAJARAN */}
          <MobileMenuSection>
            <MobileMenuSectionTitle $isOpen={isMobileMenuOpen} $delay={0.02}>
              <MobileSectionIndicator /> Fitur Pembelajaran
            </MobileMenuSectionTitle>

            <MobileLink
              href="/practice"
              $active={
                pathname.startsWith("/practice") ||
                pathname.startsWith("/study")
              }
              $isOpen={isMobileMenuOpen}
              $delay={0.05}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <KanjiBadge>練</KanjiBadge>
              Practice
            </MobileLink>

            <MobileLink
              href="/quiz"
              $active={pathname.startsWith("/quiz")}
              $isOpen={isMobileMenuOpen}
              $delay={0.08}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <KanjiBadge>問</KanjiBadge>
              Quiz
            </MobileLink>

            <MobileLink
              href="/materi"
              $active={pathname.startsWith("/materi")}
              $isOpen={isMobileMenuOpen}
              $delay={0.11}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <KanjiBadge>資</KanjiBadge>
              Materials
            </MobileLink>

            <MobileLink
              href="/game"
              $active={pathname.startsWith("/game")}
              $isOpen={isMobileMenuOpen}
              $delay={0.14}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <KanjiBadge>遊</KanjiBadge>
              Game
            </MobileLink>

            <MobileLink
              href="/practice-sheets"
              $active={pathname === "/practice-sheets"}
              $isOpen={isMobileMenuOpen}
              $delay={0.17}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <KanjiBadge>書</KanjiBadge>
              Practice Sheets
            </MobileLink>

            <MobileLink
              href="/quests"
              $active={pathname.startsWith("/quests")}
              $isOpen={isMobileMenuOpen}
              $delay={0.19}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <KanjiBadge>務</KanjiBadge>
              Misi
            </MobileLink>
          </MobileMenuSection>

          {/* SECTION 2: PENGATURAN & APLIKASI */}
          <MobileMenuSection>
            <MobileMenuSectionTitle $isOpen={isMobileMenuOpen} $delay={0.22}>
              <MobileSectionIndicator /> Pengaturan & Aplikasi
            </MobileMenuSectionTitle>

            <MobileLink
              href="/profile"
              $active={pathname === "/profile"}
              $isOpen={isMobileMenuOpen}
              $delay={0.25}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <KanjiBadge>人</KanjiBadge>
              Profile
            </MobileLink>

            <MobileLink
              href="/blog"
              $active={pathname.startsWith("/blog")}
              $isOpen={isMobileMenuOpen}
              $delay={0.28}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <KanjiBadge>誌</KanjiBadge>
              Blog
            </MobileLink>

            <MobileLink
              href="/settings"
              $active={pathname === "/settings"}
              $isOpen={isMobileMenuOpen}
              $delay={0.31}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <KanjiBadge>設</KanjiBadge>
              Settings
            </MobileLink>

            <MobileLink
              href="/about"
              $active={pathname === "/about"}
              $isOpen={isMobileMenuOpen}
              $delay={0.34}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <KanjiBadge>伝</KanjiBadge>
              About
            </MobileLink>

            <MobileLink
              href="/help"
              $active={pathname === "/help"}
              $isOpen={isMobileMenuOpen}
              $delay={0.37}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <KanjiBadge>助</KanjiBadge>
              Bantuan
            </MobileLink>

            <MobileLink
              href="/contact"
              $active={pathname === "/contact"}
              $isOpen={isMobileMenuOpen}
              $delay={0.4}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <KanjiBadge>信</KanjiBadge>
              Contact
            </MobileLink>

            <MobileLink
              href="/development"
              $active={pathname.startsWith("/development")}
              $isOpen={isMobileMenuOpen}
              $delay={0.43}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <KanjiBadge>研</KanjiBadge>
              Dev Labs
            </MobileLink>

            <MobileLink
              href="#"
              $active={false}
              $isOpen={isMobileMenuOpen}
              $delay={0.46}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                window.location.href = "/login";
              }}
            >
              <KanjiBadge>退</KanjiBadge>
              Keluar
            </MobileLink>
          </MobileMenuSection>
        </MobileMenu>
      </NavRoot>

      {isDictionaryOpen && (
        <DictionarySearchOverlay onClose={() => setIsDictionaryOpen(false)} />
      )}

      {isMounted && deviceMode === "mobile" && <FloatingDock />}
    </>
  );
}
