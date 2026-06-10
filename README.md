# 🇯🇵 Japan App

A premium, interactive Japanese learning companion application built with Next.js 15. Designed to help users master Kanji and Kana through a structured, modern, and high-fidelity interface.

## ✨ Features

- **🗺️ Visual Learning Roadmap (Duolingo Style)**: An exquisitely overhauled serpentine learning path using **custom vector SVG animated portals** (Alphabet, Vocabulary, Grammar, Conversation, Kanji, Finance, Travel, Trophy) instead of basic emojis.
  - **Tactile 3D Buttons**: Immersive buttons with 3D mechanical active-press compression and smooth hover scales.
  - **Neon Active Portal**: Active lessons float gently and pulse with a **breathing neon aura ring** matching the level's theme (Emerald N5, Violet N4, Orange N3, Blue N2, Red N1).
  - **Frosted Glass Labels**: Exquisite capsule labels utilizing modern `backdrop-filter: blur(12px)`.
  - **Perfect Alignment**: Prescise horizontal-center alignment on both desktop viewports and notched mobile devices.
- **📚 Rich JLPT Syllabus Database (`lessonsData.ts`)**: Fully populated path from N5 to N1.
  - **JLPT N5 Expansion**: 10 full units (240 questions) mapping basic survival skills like ordering food, convenience store transactions, basic directions, housing, and travel.
  - **Interactive Question Varieties**: Supports multiple choice, typing, listening exercises powered by Web Speech API, sentence-building card sets, and fill-in-the-blank particle matching.
- **✍️ Kanji Grid & Practice**: Explore and learn Kanji characters with organized visualization and drawing practice modules.
- **🔤 Kana Mastery**: Deep-dive tools for mastering Hiragana and Katakana (Basic, Dakuten, Handakuten, and Yoon).
- **💡 Study Hub**: Dedicated sections for Listening, Reading, and Speaking practice to build holistic fluency.
- **⚡ Smart Flashcards**: Tinder-style swipeable vocabulary flashcards with native pronunciation and SRS-ready tracking.
- **🏆 Daily Challenges**: Keep your logic sharp with rotating daily quizzes and streak tracking.
- **🎨 Premium Japanese Aesthetic**: A modern UI/UX featuring glassmorphism, dynamic gradients, and authentic Japanese typography.
- **🔀 Advanced Input**: Integrated **Wanakana** for seamless Romaji-to-Kana conversion.
- **🔐 Auth Ready**: Premium dummy Login and Register layouts ready for backend integration.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Styled Components](https://styled-components.com/) & Vanilla CSS
- **Utilities**: [Wanakana](https://wanakana.com/)
- **Context**: State management via React Context (Progress, Theme)

## 🚀 Getting Started

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/NXRts/JapanApp.git
    cd JapanApp
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Run the App**:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) to see your journey begin.

## 📂 Project Structure

```bash
src/
├── app/                  # App Router pages & layouts
│   ├── (auth)/           # Authentication flow (Login/Register)
│   ├── roadmap/          # Structured Learning Path
│   ├── practice/         # Flashcards & Quiz modules
│   ├── study/            # Listening/Speaking hub
│   ├── materi/           # Learning materials & Tip sections
│   ├── stats/            # Progress visualization
│   └── page.tsx          # Dynamic Landing Page
├── components/           # Reusable UI & Layout components
│   ├── roadmap/          # Roadmap Board & Nodes
│   ├── home/             # Hero, Features, & Section components
│   ├── common/           # Shared UI elements
│   └── icons/            # App-specific SVG icons
├── context/              # Progress & Theme providers
├── data/                 # Local datasets (Roadmap, Blog, Lessons)
└── lib/                  # Helper utilities & SRS logic
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Developed with ❤️ by [NXRts](https://github.com/NXRts)
