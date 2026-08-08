// Standard SVG stroke paths dictionary for interactive stroke order guide
export interface StrokeGuideData {
  char: string;
  viewBox: string;
  paths: string[];
}

export const STROKE_PATHS_DB: Record<string, string[]> = {
  // Hiragana Vowels (Calibrated to Standard Japanese Typography Font 'Noto Sans JP' / 'Klee One')
  あ: [
    "M 24,38 C 40,36 60,35 76,35", // Stroke 1: Top horizontal bar
    "M 50,20 C 48,44 44,64 41,83", // Stroke 2: Vertical stem
    "M 43,43 C 33,58 22,70 28,78 C 36,88 64,88 74,74 C 82,58 72,46 54,49 C 42,52 35,64 43,72", // Stroke 3: Loop
  ],
  い: [
    "M 35,28 C 30,48 34,68 24,78", // Left curved stroke
    "M 65,36 C 65,48 64,62 58,70", // Right short stroke
  ],
  う: [
    "M 42,20 C 48,22 55,25 58,28", // Top stroke
    "M 32,42 C 60,35 74,65 36,80", // Curved body
  ],
  え: [
    "M 42,20 C 48,22 55,25 58,28", // Top stroke
    "M 32,46 L 68,46 L 36,76 C 54,72 68,76 76,82", // Z-body
  ],
  お: [
    "M 24,36 C 40,34 60,32 70,32", // Horizontal bar
    "M 46,20 L 46,65 C 46,84 76,76 76,60 C 76,46 62,46 52,52", // Vertical loop
    "M 68,26 C 72,30 76,34 80,38", // Right dot
  ],

  // Basic Kanji (Calibrated to y=56, fontSize=60)
  日: [
    "M 26,22 L 26,82", // Left vertical
    "M 26,22 L 74,22 L 74,82", // Top-right corner
    "M 26,52 L 74,52", // Middle bar
    "M 26,82 L 74,82", // Bottom bar
  ],
  月: [
    "M 30,18 C 30,45 25,72 15,88", // Left stroke
    "M 30,18 L 74,18 L 74,88 C 74,88 69,82 64,82", // Right corner with hook
    "M 30,42 L 74,42", // Upper bar
    "M 30,66 L 74,66", // Lower bar
  ],
  火: [
    "M 32,42 L 22,56", // Left dot
    "M 68,42 L 78,56", // Right dot
    "M 50,22 C 50,46 40,74 15,88", // Center left curve
    "M 50,46 C 60,60 74,78 88,88", // Right sweeping stroke
  ],
  水: [
    "M 50,18 L 50,84 C 50,84 45,78 40,78", // Center vertical hook
    "M 22,38 L 40,46 L 22,74", // Left angle stroke
    "M 74,28 L 50,52", // Right top stroke
    "M 54,52 C 64,66 74,76 88,86", // Right bottom stroke
  ],
  木: [
    "M 18,42 L 82,42", // Horizontal bar
    "M 50,18 L 50,88", // Center vertical
    "M 50,42 C 40,62 25,76 12,86", // Left diagonal
    "M 50,42 C 60,62 75,76 88,86", // Right diagonal
  ],
  金: [
    "M 50,18 C 40,32 25,46 12,56", // Roof left
    "M 50,18 C 60,32 75,46 88,56", // Roof right
    "M 26,46 L 74,46", // Top bar
    "M 22,64 L 78,64", // Middle bar
    "M 50,46 L 50,82", // Vertical stem
    "M 36,70 L 26,80", // Left dot
    "M 64,70 L 74,80", // Right dot
    "M 16,82 L 84,82", // Bottom base bar
  ],
  土: [
    "M 26,38 L 74,38", // Short top bar
    "M 50,18 L 50,76", // Center vertical
    "M 16,76 L 84,76", // Long bottom bar
  ],
  人: [
    "M 50,22 C 40,46 25,70 12,84", // Left leg
    "M 44,42 C 55,60 70,74 88,84", // Right leg
  ],
  山: [
    "M 50,18 L 50,82", // Center vertical
    "M 22,42 L 22,82 L 78,82 L 78,42", // Bottom U-bucket frame
  ],
  川: [
    "M 26,22 C 26,46 21,70 16,84", // Left curved vertical
    "M 50,26 L 50,78", // Center straight vertical
    "M 74,18 L 74,88", // Right long vertical
  ],
};

export function getStrokePaths(char: string): string[] {
  if (STROKE_PATHS_DB[char]) {
    return STROKE_PATHS_DB[char];
  }
  // Generic fallback 3-stroke box guide if specific path data is missing
  return [
    "M 25,25 L 75,25 L 75,75 L 25,75 Z",
    "M 25,50 L 75,50",
    "M 50,25 L 50,75",
  ];
}
