"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled, { css, keyframes } from "styled-components";

// ========================================================
// ZEN JAPANESE — FLOATING ACTION DOCK
// A glassmorphism floating navigation dock that replaces
// the bottom tab bar with a unique JapanApp identity.
// ========================================================

const inkDrop = keyframes`
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const DockContainer = styled.nav`
  position: fixed;
  bottom: 12px;
  left: 12px;
  right: 12px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 64px;
  border-radius: 24px;
  background: var(--dock-bg);
  backdrop-filter: blur(var(--dock-blur));
  -webkit-backdrop-filter: blur(var(--dock-blur));
  border: 1px solid var(--dock-border);
  box-shadow: var(--dock-shadow);
  padding: 0 4px;
  padding-bottom: env(safe-area-inset-bottom, 0);
  /* PWA: no text selection on dock */
  user-select: none;
  -webkit-user-select: none;

  /* Only show on mobile mode */
  @media (min-width: 1101px) {
    display: none;
  }
`;

const DockItem = styled(Link)<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex: 1;
  height: 100%;
  text-decoration: none;
  position: relative;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px;
  /* PWA: no tap highlight, no selection */
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:active {
    transform: scale(0.92);
  }
`;

const DockIcon = styled.div<{ $active?: boolean }>`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};

  svg {
    width: 100%;
    height: 100%;
    stroke-width: 2.2;
    transition: transform 0.2s ease;
  }

  ${DockItem}:active & svg {
    transform: scale(0.9);
  }
`;

const DockLabel = styled.span<{ $active?: boolean }>`
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--text-secondary)"};
  transition: color 0.2s ease;
  line-height: 1;
`;

/* Ink dot indicator — replaces color block highlight */
const InkDot = styled.div<{ $visible: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--primary);
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? inkDrop : "none")} 0.35s
    cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
`;

// ========================================================
// DOCK NAVIGATION ICONS — Restored original icons
// ========================================================

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
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
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 12h12" />
      <path d="M6 8v8M4 7v10M2 9v6" />
      <path d="M18 8v8M20 7v10M22 9v6" />
    </svg>
  );
}

function JlptIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function GameIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <line x1="15" y1="13" x2="15.01" y2="13" />
      <line x1="18" y1="11" x2="18.01" y2="11" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// ========================================================
// DOCK CONFIGURATION
// ========================================================

interface DockTab {
  href: string;
  label: string;
  icon: React.FC;
  matchPaths?: string[]; // Additional paths that activate this tab
}

const DOCK_TABS: DockTab[] = [
  {
    href: "/",
    label: "Learn",
    icon: HomeIcon,
    matchPaths: ["/roadmap", "/lesson"],
  },
  {
    href: "/characters",
    label: "Characters",
    icon: CharactersIcon,
    matchPaths: ["/characters"],
  },
  {
    href: "/practice",
    label: "Practice",
    icon: PracticeIcon,
    matchPaths: ["/practice", "/game"],
  },
  {
    href: "/jlpt",
    label: "JLPT",
    icon: JlptIcon,
    matchPaths: ["/jlpt", "/quiz", "/daily-quiz"],
  },
  {
    href: "/profile",
    label: "Profile",
    icon: ProfileIcon,
    matchPaths: ["/stats", "/profile"],
  },
];

// ========================================================
// MAIN COMPONENT
// ========================================================

export function FloatingDock() {
  const pathname = usePathname() || "";

  const isTabActive = (tab: DockTab) => {
    if (pathname === tab.href) return true;
    if (tab.matchPaths) {
      return tab.matchPaths.some((p) => {
        if (p === "/") return pathname === "/";
        return pathname.startsWith(p);
      });
    }
    return false;
  };

  return (
    <DockContainer role="navigation" aria-label="Main navigation">
      {DOCK_TABS.map((tab) => {
        const active = isTabActive(tab);
        const IconComponent = tab.icon;

        return (
          <DockItem
            key={tab.href}
            href={tab.href}
            $active={active}
            aria-current={active ? "page" : undefined}
          >
            <DockIcon $active={active}>
              <IconComponent />
            </DockIcon>
            <DockLabel $active={active}>{tab.label}</DockLabel>
            <InkDot $visible={active} />
          </DockItem>
        );
      })}
    </DockContainer>
  );
}
