/**
 * Leitner System (5-Box) Spaced Repetition Algorithm.
 */

export interface LeitnerItemState {
  box: number; // 1 | 2 | 3 | 4 | 5
  lastReviewedAt: string; // ISO Date String
  nextReviewAt: string; // ISO Date String
}

export interface LeitnerCalculationResult {
  newBox: number;
  nextReviewAt: string;
  intervalDays: number;
}

// Interval schedule per box (in days)
export const LEITNER_INTERVALS: Record<number, number> = {
  1: 1,  // Box 1 -> Review tomorrow
  2: 3,  // Box 2 -> Review in 3 days
  3: 7,  // Box 3 -> Review in 7 days (1 week)
  4: 14, // Box 4 -> Review in 14 days (2 weeks)
  5: 30, // Box 5 -> Review in 30 days (1 month / Mastered)
};

/**
 * Calculates the next Leitner box position and review date.
 * - If correct: advances to min(5, currentBox + 1).
 * - If incorrect: resets to Box 1.
 */
export function calculateNextLeitner(
  currentBox: number = 1,
  isCorrect: boolean,
  lastReviewedAt: string = new Date().toISOString()
): LeitnerCalculationResult {
  let newBox: number;

  if (isCorrect) {
    newBox = Math.min(5, (currentBox || 1) + 1);
  } else {
    newBox = 1;
  }

  const intervalDays = LEITNER_INTERVALS[newBox] || 1;

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + intervalDays);
  nextDate.setHours(0, 0, 0, 0);

  return {
    newBox,
    nextReviewAt: nextDate.toISOString(),
    intervalDays,
  };
}

/**
 * Checks if a Leitner item is due for review today or earlier.
 */
export function isLeitnerDue(nextReviewAt?: string): boolean {
  if (!nextReviewAt) return true;
  const now = new Date();
  const reviewDate = new Date(nextReviewAt);
  return now >= reviewDate;
}
