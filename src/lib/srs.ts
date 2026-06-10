/**
 * SuperMemo-2 (SM-2) inspired Spaced Repetition System algorithm.
 */

export interface SRSItem {
  easeFactor: number;
  interval: number; // in days
  repetitions: number;
  nextReviewDate: string; // ISO String
}

/**
 * Calculates the next SRS state based on the user's answer quality.
 * Quality scale (0-5):
 * 5 - perfect response
 * 4 - correct response after a hesitation
 * 3 - correct response recalled with serious difficulty
 * 2 - incorrect response; where the correct one seemed easy to recall
 * 1 - incorrect response; the correct one remembered
 * 0 - complete blackout
 *
 * For a simplified UI, we might just map: Correct -> 4 or 5, Incorrect -> 0 or 1.
 */
export function calculateNextSRS(
  item: SRSItem | undefined,
  quality: number,
): SRSItem {
  // Initial values for a new item
  let easeFactor = item?.easeFactor ?? 2.5;
  let interval = item?.interval ?? 0;
  let repetitions = item?.repetitions ?? 0;

  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect response
    repetitions = 0;
    interval = 1; // Reset interval
  }

  // Adjust ease factor based on quality
  easeFactor =
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // EF should not fall below 1.3
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);
  // Optional: Set time to exactly midnight local time to avoid sub-day drift,
  // but keeping exact time is also fine for strict intervals.
  // We'll reset it to midnight for easier daily bucket grouping.
  nextReviewDate.setHours(0, 0, 0, 0);

  return {
    easeFactor,
    interval,
    repetitions,
    nextReviewDate: nextReviewDate.toISOString(),
  };
}

/**
 * Helper to check if an item is due for review today or earlier.
 */
export function isItemDue(item: SRSItem): boolean {
  const now = new Date();
  const nextReview = new Date(item.nextReviewDate);
  return now >= nextReview;
}
