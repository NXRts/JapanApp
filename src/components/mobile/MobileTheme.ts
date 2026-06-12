import { keyframes, css } from "styled-components";

// ========================================================
// TRADITIONAL JAPANESE COLOR PALETTES (Zen Japanese Theme)
// ========================================================
export const JapaneseColors = {
  toriiRed: "#C41E3A",     // Traditional Shinto gate red
  zenGold: "#B8860B",      // Dark golden rod accent
  sumiInk: "#1e293b",      // Slate black for calligraphic strokes
  sakuraPink: "#FFB7C5",   // Cherry blossom soft pink
  bambooGreen: "#4A7c59",  // Deep organic bamboo green
  washiOffWhite: "#FAF8F5",// Traditional handmade paper background
  washiDarkSlate: "#131b2e"// Dark textured surface background
};

// ========================================================
// REUSABLE KEYFRAMES
// ========================================================
export const inkDrop = keyframes`
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

export const stampAppear = keyframes`
  0% { transform: scale(2.5); opacity: 0; filter: blur(3px); }
  70% { transform: scale(0.95); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; filter: none; }
`;

export const pulseActive = keyframes`
  0%, 100% { border-color: ${JapaneseColors.toriiRed}; }
  50% { border-color: ${JapaneseColors.zenGold}; }
`;

export const brushReveal = keyframes`
  from { stroke-dashoffset: 200; opacity: 0; }
  to { stroke-dashoffset: 0; opacity: 1; }
`;

// ========================================================
// VISUAL HELPERS & MIXINS
// ========================================================
export const MobileTheme = {
  colors: JapaneseColors,
  animations: {
    inkDrop,
    stampAppear,
    pulseActive,
    brushReveal
  },
  typography: {
    japaneseFont: "'Noto Sans JP', 'Nunito', 'Outfit', sans-serif",
    englishFont: "'Inter', 'Outfit', sans-serif",
    sizes: {
      xs: "0.62rem",
      sm: "0.75rem",
      base: "0.88rem",
      lg: "1.15rem",
      xl: "1.5rem"
    }
  },
  effects: {
    washiPaper: css`
      position: relative;
      background-image: radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 0),
                        radial-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 0);
      background-size: 8px 8px;
      background-position: 0 0, 4px 4px;
    `,
    glass: css`
      background: var(--dock-bg);
      backdrop-filter: blur(var(--dock-blur));
      -webkit-backdrop-filter: blur(var(--dock-blur));
      border: 1px solid var(--dock-border);
      box-shadow: var(--dock-shadow);
    `
  }
};
