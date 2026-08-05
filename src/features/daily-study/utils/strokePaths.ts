// Standard SVG stroke paths dictionary for interactive stroke order guide
export interface StrokeGuideData {
  char: string;
  viewBox: string;
  paths: string[];
}

export const STROKE_PATHS_DB: Record<string, string[]> = {
  // Hiragana Vowels
  あ: [
    "M 30,35 L 70,35", // Horizontal top
    "M 50,15 L 50,85", // Vertical center
    "M 40,45 C 75,40 85,80 40,75 C 25,70 30,55 50,55", // Loop
  ],
  い: [
    "M 35,25 C 30,50 35,70 25,80", // Left curve
    "M 65,35 C 65,50 65,65 60,70", // Right short stroke
  ],
  う: [
    "M 40,20 L 55,25", // Top dot/dash
    "M 30,40 C 65,30 75,70 35,80", // Curved loop
  ],
  え: [
    "M 40,20 L 55,25", // Top dot
    "M 30,45 L 65,45 L 35,75 C 55,70 70,75 75,80", // Z-stroke with tail
  ],
  お: [
    "M 25,35 L 65,35", // Horizontal
    "M 45,20 L 45,65 C 45,85 75,75 75,60 C 75,45 60,45 50,50", // Vertical loop
    "M 70,25 L 80,35", // Right dot
  ],

  // Basic Kanji
  日: [
    "M 25,20 L 25,85", // Left vertical
    "M 25,20 L 75,20 L 75,85", // Top-right corner
    "M 25,50 L 75,50", // Middle bar
    "M 25,85 L 75,85", // Bottom bar
  ],
  月: [
    "M 30,15 C 30,45 25,75 15,90", // Left stroke
    "M 30,15 L 75,15 L 75,90 C 75,90 70,85 65,85", // Right corner with hook
    "M 30,40 L 75,40", // Upper bar
    "M 30,65 L 75,65", // Lower bar
  ],
  火: [
    "M 30,40 L 20,55", // Left dot
    "M 70,40 L 80,55", // Right dot
    "M 50,20 C 50,45 40,75 15,90", // Center left curve
    "M 50,45 C 60,60 75,80 90,90", // Right sweeping stroke
  ],
  水: [
    "M 50,15 L 50,85 C 50,85 45,80 40,80", // Center vertical hook
    "M 20,35 L 40,45 L 20,75", // Left angle stroke
    "M 75,25 L 50,50", // Right top stroke
    "M 55,50 C 65,65 75,75 90,85", // Right bottom stroke
  ],
  木: [
    "M 15,40 L 85,40", // Horizontal bar
    "M 50,15 L 50,90", // Center vertical
    "M 50,40 C 40,60 25,75 10,85", // Left diagonal
    "M 50,40 C 60,60 75,75 90,85", // Right diagonal
  ],
  金: [
    "M 50,15 C 40,30 25,45 10,55", // Roof left
    "M 50,15 C 60,30 75,45 90,55", // Roof right
    "M 25,45 L 75,45", // Top bar
    "M 20,65 L 80,65", // Middle bar
    "M 50,45 L 50,85", // Vertical stem
    "M 35,72 L 25,82", // Left dot
    "M 65,72 L 75,82", // Right dot
    "M 15,85 L 85,85", // Bottom base bar
  ],
  土: [
    "M 25,35 L 75,35", // Short top bar
    "M 50,15 L 50,75", // Center vertical
    "M 15,75 L 85,75", // Long bottom bar
  ],
  人: [
    "M 50,20 C 40,45 25,70 10,85", // Left leg
    "M 45,40 C 55,60 70,75 90,85", // Right leg
  ],
  山: [
    "M 50,15 L 50,85", // Center vertical
    "M 20,40 L 20,85 L 80,85 L 80,40", // Bottom U-bucket frame
  ],
  川: [
    "M 25,20 C 25,45 20,70 15,85", // Left curved vertical
    "M 50,25 L 50,80", // Center straight vertical
    "M 75,15 L 75,90", // Right long vertical
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
