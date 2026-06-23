import { z } from "zod";

// Common validation schemas
export const keywordSchema = z
  .string()
  .min(1, "Keyword is required")
  .max(100, "Keyword must be less than 100 characters")
  .regex(
    /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u0041-\u005A\u0061-\u007A\u0030-\u0039\s\-_]+$/,
    "Keyword contains invalid characters"
  );

export const kanaTypeSchema = z.enum(["hiragana", "katakana", "all"], {
  message: "Type must be hiragana, katakana, or all",
});

export const levelSchema = z.enum(["N5", "N4", "N3", "N2", "N1"], {
  message: "Level must be N5, N4, N3, N2, or N1",
});

// API route validation helpers
export function validateSearchParams<T extends z.ZodType>(
  schema: T,
  searchParams: URLSearchParams
): z.infer<T> {
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return schema.parse(params);
}

export function validateKeyword(keyword: string | null): string {
  if (!keyword) {
    throw new Error("Keyword is required");
  }
  return keywordSchema.parse(keyword);
}

export function validateKanaType(type: string | null): string {
  if (!type) {
    return "all";
  }
  return kanaTypeSchema.parse(type);
}
