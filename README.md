# 🇯🇵 JapanApp - Complete Japanese Learning & Mastery Platform

A premium, interactive, and high-fidelity Japanese learning application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Styled Components**. Designed to guide learners from complete beginner to advanced proficiency (JLPT N5–N1) through interactive SVG stroke order practice, gamified roadmaps, SRS memory retention, mini-games, listening/speaking modules, and OCR camera scanning.

---

## 🌟 Key Features Overview

### 1. 📚 Structured Lessons & Learning Roadmap (`/materi`, `/roadmap`, `/lesson`)
- **Gamified Serpentine Learning Path**: Interactive 3D learning roadmap featuring animated vector SVG portals (Alphabet, Vocabulary, Grammar, Conversation, Kanji, Finance, Travel, Trophy).
- **Tactile 3D Buttons & Level Themes**: Mechanical compression button feedback and breathing neon rings customized per JLPT level (N5 Emerald, N4 Purple, N3 Sunset, N2 Blue, N1 Crimson).
- **Dynamic 8-13 Unit Lessons**: Deterministic seeding algorithm populates units dynamically with Vocabulary, Grammar, Reading, Listening, and Fill-in-the-Blank interactive drills.

### 2. 🉐 JLPT Prep & Kanji Mastery (N5–N1) (`/jlpt`, `/jlpt-exam`, `/kanji`)
- **Kanji Dictionary & Library**: Comprehensive searchable database covering stroke counts, radicals, On'yomi, Kun'yomi, Romaji, and Indonesian translations.
- **JLPT Kanji Writer (`/jlpt/kanji-writer`)**: HanziWriter vector engine with radical color highlights, automated hint triggers, and offline SVG fallback (`STROKE_PATHS_DB`).
- **JLPT Simulation Exams (`/jlpt-exam`)**: Full timed JLPT mock exams evaluating vocabulary, grammar, and reading comprehension.

### 3. ⛩️ Unified Single-Page Memorization Studio (`/study/daily`)
- **2-Column Responsive Studio Layout**:
  - **Left Panel (Studio Canvas & Audio)**: Interactive SVG stroke order writer canvas (with replay animation, trace guide, grid lines, touch & mouse handwriting, directional arrow badges `❶↓ ❷→ ❸→ ❹→`), plus TTS Audio Playback (Native 1x & 0.7x Slow speed).
  - **Right Panel (Knowledge Cards)**: Detailed Bahasa Indonesia meaning, On'yomi & Kun'yomi tags, **Jukugo (Pasangan Kosakata Populer)** compound word cards, and **Awas Tertukar (Kanji Mirip)** confusable kanji cards.
- **Zero-Click Context Learning**: Seamless single-page environment combining audio, handwriting, stroke order, and vocabulary without tab switching.

### 4. ⚠️ Dynamic Real-Time Weak Kanji Bank (`Bank Kanji Lemah`)
- **LocalStorage SRS Connection**: Dynamically tracks items with low Ease Factor (< 2.2) and past quiz errors directly from `ProgressContext`.
- **Targeted Repair Sessions**: Interactive **`🛠️ Perbaiki Kanji Lemah`** action button to launch focused study sessions, or disabled status **`Tidak Ada Kanji Lemah ✨`** when memory accuracy is perfect.

### 5. 🎴 Kana Mastery & Practice Sheets (`/kana`, `/practice-sheets`)
- **Hiragana & Katakana Grid**: Complete chart for basic Vowels, Dakuten, Handakuten, and Yoon combinations with native audio pronunciations.
- **Interactive Practice Sheets**: Interactive canvas and printable tracing worksheets for offline handwriting practice.

### 6. 🎮 Interactive Learning Mini-Games (`/game`, `/match-pairs`)
- **Kanji Battle Game**: RPG-style turn-based battle where correct Kanji translations trigger attacks against opponent monsters.
- **Match Pairs Game**: Fast-paced card matching game connecting Kana/Kanji to their meanings.
- **Reverse Quiz**: Type the correct Kanji/Kana character when given the Indonesian/Romaji clue.

### 7. 🎧 Listening, Speaking, & Grammar Modules (`/study`, `/grammar`)
- **Listening Comprehension (Choukai)**: Audio drills with interactive script toggles and speed controls (1x & 0.7x).
- **Speaking Roleplay (Kaiwa)**: Interactive conversation scenarios with Speech Recognition & native TTS feedback.
- **Grammar & Particle Drills**: Detailed explanation cards for Japanese sentence structures (Wa vs Ga, Ni vs De, etc.) with fill-in-the-blank exercises.

### 8. 🔄 Spaced Repetition System (SRS) & Leitner Box (`/practice`, `/review`)
- **SRS Review Engine**: SuperMemo SM-2 algorithm scheduling cards based on ease factors, intervals, and memory retention performance.
- **Leitner Box**: Multi-stage flashcard review system reinforcing long-term memory.

### 9. 🏆 Gamified Progression, Quests, & Hearts Economy (`/quests`, `/profile`)
- **EXP & Streak System**: Earn experience points, level up, and maintain daily learning streaks.
- **Hearts & Gems Economy**: Hearts system rewarding accurate answers and Gems currency to refill hearts or buy streak freezes.
- **Daily & Weekly Quests**: Complete quests to earn gems, EXP, and unlock exclusive achievement badges.
- **Leaderboard Leagues**: Compete with other learners in Bronze, Silver, Gold, and Master leagues based on weekly EXP.

### 10. 🔍 OCR Kanji Camera Scanner & Quick Dictionary
- **Live Camera OCR (Tesseract.js)**: Scan Japanese characters directly from photos or live camera feeds inside the dictionary search overlay.
- **Quick Dictionary Overlay**: Floating Jisho search accessible anywhere via quick search bar or keyboard shortcut.

### 11. 📰 Long-Form Educational Blog (`/blog`)
- Rich educational articles covering JLPT study strategies, Kansai dialect nuances, Japanese business etiquette, and culture.

### 12. 📜 Certificate System & Stats Dashboard (`/sertifikat`, `/stats`)
- Printable course completion certificates and detailed analytics dashboards visualizing learning heatmap, accuracy, and EXP gains.

---

## 🛠️ Tech Stack & Dependencies

- **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Engine**: [React 19](https://react.dev/)
- **Programming Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling Engine**: [Styled Components 6](https://styled-components.com/) (CSS-in-JS) & Vanilla CSS
- **PWA & Service Worker**: [@ducanh2912/next-pwa](https://github.com/ducanh2912/next-pwa)
- **OCR Engine**: [Tesseract.js](https://tesseract.projectnaptha.com/)
- **Kanji Stroke Engine**: [HanziWriter](https://hanziwriter.org/)
- **Japanese Text Utility**: [Wanakana](https://wanakana.com/) (Romaji-to-Kana converter)
- **State & Progression**: React Context (`ProgressContext`, `ThemeContext`, `DeviceModeContext`)

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

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```bash
JapanApp/
├── public/                 # Static assets, manifests, service workers, & public Icon.json
├── src/
│   ├── app/                # Next.js App Router pages (50+ routes)
│   │   ├── jlpt/           # JLPT Kanji Writer & Mock Exam
│   │   ├── practice/       # Practice Hub, SRS Reviews, & Drills
│   │   ├── roadmap/        # Serpentine Map Learning Path
│   │   ├── study/          # Daily Study Studio & Dashboard
│   │   ├── game/           # Kanji Battle & Mini Games
│   │   ├── kana/           # Hiragana & Katakana Master Grid
│   │   ├── kanji/          # Kanji Library (N5-N1)
│   │   ├── grammar/        # Grammar Rules & Exercises
│   │   ├── blog/           # Educational Articles
│   │   └── quests/         # Daily & Weekly Quests
│   ├── components/         # Reusable UI components & SVG AppIcons
│   ├── context/            # React Contexts (ProgressContext, Theme, DeviceMode)
│   ├── data/               # Static datasets, blog posts, & Icon.json registry
│   ├── features/           # Feature modules (daily-study, kana, kanji, navigation)
│   └── lib/                # Audio play helpers, SRS algorithms, & Wanakana
```

---

Developed with ❤️ by [NXRts](https://github.com/NXRts)
