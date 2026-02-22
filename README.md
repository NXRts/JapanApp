# 🇯🇵 Japan App

A modern, interactive Japanese learning companion application built with Next.js 16. Designed to help users master Kanji and Kana through a clean, responsive, and customizable interface.

## ✨ Features

- **Kanji Grid Visualization**: Explore and learn Kanji characters in an organized, responsive grid layout.
- **Kana Mastery**: Comprehensive reference and practice tools for both Hiragana and Katakana.
- **Practice Mode**: Dedicated section to test your knowledge and build muscle memory.
- **Vocabulary Flashcards**: Interactive flashcards with beautiful, modern styling to master Japanese vocabulary (Hiragana, Katakana, Dakuten, Handakuten, and Yoon).
- **Theme Customization**: Toggle between Light and Dark modes for comfortable viewing in any environment.
- **Advanced Input Handling**: Integrated **Wanakana** for seamless Romaji-to-Kana conversion.
- **Responsive Design**: Optimized for a smooth experience across desktop and mobile devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Styled Components](https://styled-components.com/) & CSS Modules
- **Utilities**: [Wanakana](https://wanakana.com/) (Japanese romaji <-> kana conversion)
- **Linting**: ESLint

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or bun

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/NXRts/JapanApp.git
    cd JapanApp
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    bun install
    ```

### Running the App

Start the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router pages and layouts
│   ├── about/            # About page
│   ├── api/vocabulary/   # API route serving local JSON data
│   ├── contact/          # Contact page
│   ├── kana/             # Kana learning page
│   ├── practice/         # Practice hub
│   │   ├── kanji/        # Kanji drawing practice
│   │   └── vocabulary/   # Vocabulary flashcards
│   ├── globals.css       # Global styles
│   └── page.tsx          # Main entry point (Home)
├── components/           # Reusable UI components
│   ├── KanjiGrid/        # Kanji display grid
│   ├── Navbar.tsx        # Navigation bar
│   ├── Footer.tsx        # Site footer
│   └── ...
└── context/              # React Context providers (e.g., ThemeContext)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Developed by [NXRts](https://github.com/NXRts)
