# 🇯🇵 Japan App

A premium, interactive, and high-fidelity Japanese learning companion application built with **Next.js 15**, **React 19**, and **Styled Components**. Designed to help users master Hiragana, Katakana, Kanji, and grammar through a structured, game-like, and highly immersive interface.

---

## ✨ Features & Recent Updates

### 1. 🗺️ Visual Learning Roadmap

- **Custom Vector SVG Animated Portals**: An overhauled serpentine learning path utilizing custom SVG portals (Alphabet, Vocabulary, Grammar, Conversation, Kanji, Finance, Travel, Trophy) instead of standard emojis.
- **Tactile 3D Buttons**: Nodes feature immersive active-press mechanical compression and smooth scale transitions on hover.
- **Breathing Neon Rings**: Active lesson portals pulse with custom neon rings corresponding to the JLPT level's specific theme:
  - **N5**: Emerald Green
  - **N4**: Violet Purple
  - **N3**: Sunset Orange
  - **N2**: Ocean Blue
  - **N1**: Crimson Red
- **Frosted Glass Labels**: Level headers and card components use advanced `backdrop-filter: blur(12px)` glassmorphism.

### 2. 🌀 Dynamic Unit Syllabus Expansion (Randomized 8-13 Lessons)

- **Programmatic Runtime Expansion**: To keep the repository lightweight while offering a massive content database, the lessons list is dynamically expanded at runtime.
- **Deterministic Seeding**: Uses a hashing algorithm based on the unique `unitId` to determine a stable, randomized count of **8 to 13 lessons per unit**. This count remains consistent across page reloads and browser sessions, preserving user progression.
- **Thematic Question Generator**: Automatically populates generated lessons (Vocabulary, Grammar, Reading, Listening, Conversation) with 5 interactive questions:
  - **Multiple-Choice**: Vocabulary meaning or translation drill.
  - **Sentence-Builder**: Reordering words using interactive cards.
  - **Typing**: Typing translations using direct keyboard inputs.
  - **Listening**: Audio-based comprehension exercises powered by local pronunciation banks.
  - **Fill-in-the-Blank**: Completing particle matching structures.
- **Sequence Preservation**: Dynamically places new practice lessons _before_ the unit's original "Synthesis / Final Challenge" trophy lesson. This ensures the challenge remains the final lock of the unit and maintains database ID compatibility.

### 3. 🖱️ Desktop Mouse Drag-to-Scroll Carousel

- **Draggable Card Carousels**: Implements custom pointer event listeners to make the horizontal scroll lists scrollable via mouse drag on desktop screens.
- **Locked Node Interaction**: Uses `aria-disabled` and manual event capture instead of standard HTML button disabled properties. This allows mouse pointer events to bubble up, ensuring that locked lessons can still be clicked and dragged horizontally without breaking the scroll gesture.

### 4. 🧭 Centered Mobile Simulation Navigation Submenu ("More")

- **Shortcuts Popover**: When running in mobile simulation mode on desktop screens, clicking **Lainnya** toggles a floating popover menu with direct links to:
  - **Study** (Graduation Cap Icon - Emerald `#10b981`)
  - **Quiz** (Check Circle Icon - Green `#22c55e`)
  - **Learning Materials** (Book Icon - Blue `#3b82f6`)
  - **Practice Sheets** (Grid Icon - Amber `#f59e0b`)
  - **Blog** (Document Icon - Purple `#a855f7`)
  - **Contact** (Envelope Icon - Pink `#ec4899`)
  - **Settings**, **Help**, and **Logout**
- **Balanced Centering**: Positioned at `top: -180px` relative to the trigger button to align it vertically in the center. This prevents the menu from extending past the bottom of the viewport or overlapping critical footer elements.

### 5. 🎨 Premium Japanese Zen Aesthetic

- Curated color palettes with responsive hover triggers and fluid typography utilizing Google Fonts (Nunito, Outfit, Noto Sans JP).
- Safe spacing offsets (e.g. `100px` bottom-position for the **ScrollToTop** button and `min-height: auto` for main pages) prevent overlaps with the mobile floating action dock and clean up unused blank space at the bottom of pages.

### 6. 📰 Overhauled Long-Form Blog

- **Database Cleanup**: Overhauled the mock data in [blog.ts](file:///home/nxrts/Program%20Koding/Japan-App/src/data/blog.ts) to clean up 8 irrelevant or short placeholder posts.
- **Premium Content**: Retains **10 highly educational, long-form articles** written with rich, multi-sentence paragraphs covering JLPT prep strategies, Kansai dialects, particle distinctions (Wa vs Ga, Ni vs De), business cards etiquette, and hot springs bathing rules.

---

## 🛠️ Tech Stack

- **Core Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Engine**: [React 19](https://react.dev/)
- **Styling Method**: [Styled Components](https://styled-components.com/) (CSS-in-JS) & Vanilla CSS
- **Utilities**: [Wanakana](https://wanakana.com/) (Romaji-to-Kana converter)
- **State Management**: React Context (Progress, DeviceMode, Theme)

---

## 🚀 Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/NXRts/JapanApp.git
   cd JapanApp
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to start your learning journey.

---

## 📂 Project Structure

```bash
src/
├── app/                  # App Router routes and pages
│   ├── (auth)/           # Login and Registration pages
│   ├── roadmap/          # Map-based sequential learning paths
│   ├── practice/         # Flashcards and interactive drills
│   ├── study/            # Listening, Reading, and Speaking practice
│   ├── blog/             # Overhauled educational articles
│   ├── stats/            # Exp and progression visuals
│   └── page.tsx          # Dynamic landing and core study dashboard
├── components/           # Reusable components
│   ├── roadmap/          # RoadmapBoard, RoadmapPath, and RoadmapNode
│   ├── mobile/           # FloatingActionDock, HankoSkillCard, and ToriiHeader
│   └── icons/            # Thematic custom SVG app icons
├── context/              # Contexts (ProgressContext, DeviceModeContext)
├── data/                 # Datasets (blog, listening, speaking, lessonsData)
└── lib/                  # Helper utilities (srs logic, wanakana)
```

---

Developed with ❤️ by [NXRts](https://github.com/NXRts)
