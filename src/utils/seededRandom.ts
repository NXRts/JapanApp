/**
 * Simple Seeded Random Number Generator
 * Using a LCG (Linear Congruential Generator) approach
 */
export class SeededRandom {
  private seed: number;

  constructor(seed: string | number) {
    if (typeof seed === 'string') {
      // Simple string hashing to number
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        hash = (hash << 5) - hash + seed.charCodeAt(i);
        hash |= 0;
      }
      this.seed = Math.abs(hash);
    } else {
      this.seed = seed;
    }
  }

  // Returns a random float between 0 and 1
  next(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  }

  // Returns a random integer between min and max
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  // Seeded shuffle for arrays
  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [result[i], result[result[j] === undefined ? i : j]] = [result[j] === undefined ? result[i] : result[j], result[i]];
      // Manual swap to be safe with seeding
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }
  
  // Alternative safer shuffle
  safeShuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i);
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }
}

/**
 * Get Today's Seed String (YYYY-MM-DD)
 */
export const getTodaySeed = () => {
  return new Date().toISOString().split('T')[0];
};
