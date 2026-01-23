# KanjiApp

A modern, comprehensive JLPT N3 Kanji learning application built with Next.js 16.

## Features

- **Interactive Kanji Cards**: Click to flip cards and reveal readings.
- **Audio Pronunciation**: Built-in Text-to-Speech support for Kanji readings.
- **Romaji Support**: Automatically converts Kana readings to Romaji using `wanakana`.
- **Premium Design**:
  - Glassmorphism effects and modern gradients.
  - Smooth 3D flip animations.
  - Responsive grid layout for all device sizes.
- **Dynamic Data**: Fetches Kanji data from `kanjiapi.dev`.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Styled Components](https://styled-components.com/)
- **Utilities**: [Wanakana](https://wanakana.com/) (Kana-to-Romaji conversion)
- **Language**: TypeScript

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: App Router pages and API routes.
- `src/components`: Reusable UI components.
  - `KanjiGrid`: Main grid layout.
  - `Card`: Kanji card component with flip logic and styling.
- `src/app/api`: Proxy routes to fetch external Kanji data.

## Credits

- Kanji data provided by [kanjiapi.dev](https://kanjiapi.dev/).
