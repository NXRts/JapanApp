import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addCorsHeaders, handleCorsRequest } from "@/lib/cors";

// Define Zod schemas for Progress validation
const MasteryRecordSchema = z.object({
  correct: z.number().nonnegative(),
  incorrect: z.number().nonnegative(),
  lastAttempt: z
    .string()
    .datetime()
    .or(z.string().ip())
    .or(
      z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
    ),
});

const UserProfileSchema = z.object({
  displayName: z.string().max(100),
  username: z.string().max(100),
  email: z.string().email().or(z.string().length(0)),
  bio: z.string().max(500),
  avatar: z.string().max(10),
  difficulty: z.string().max(50),
  dailyGoal: z.string().max(20),
});

const QuizHistoryItemSchema = z
  .object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    score: z.number().nonnegative(),
    total: z.number().positive(),
    type: z.string().max(100),
  })
  .refine((data) => data.score <= data.total, {
    message: "Quiz score cannot exceed total questions",
  });

const SRSItemSchema = z.object({
  interval: z.number().nonnegative(),
  ease: z.number().nonnegative(),
  repetitions: z.number().nonnegative(),
  nextReviewDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

const ProgressDataSchema = z.object({
  mastery: z.record(z.string(), MasteryRecordSchema),
  streak: z.number().nonnegative().max(10000, "Streak is unrealistically high"),
  lastActiveDate: z
    .string()
    .nullable()
    .refine((val) => val === null || !isNaN(Date.parse(val)), {
      message: "Invalid lastActiveDate format",
    }),
  quizHistory: z.array(QuizHistoryItemSchema),
  srs: z.record(z.string(), SRSItemSchema),
  exp: z.number().nonnegative().max(10000000, "EXP is unrealistically high"),
  activityLog: z.record(z.string(), z.number()),
  completedExercises: z.array(z.string()),
  completedGrammarSections: z.array(z.string()),
  showFurigana: z.boolean().optional(),
  profile: UserProfileSchema.optional(),
  hasSetName: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  const corsResponse = handleCorsRequest(request);
  if (corsResponse) return corsResponse;

  const origin = request.headers.get("origin");

  try {
    const body = await request.json();

    // 1. Validate structure using Zod
    const validationResult = ProgressDataSchema.safeParse(body);

    if (!validationResult.success) {
      const response = NextResponse.json(
        {
          valid: false,
          reason: "Invalid progress structure",
          errors: validationResult.error.flatten(),
        },
        { status: 400 },
      );
      return addCorsHeaders(response, origin);
    }

    const progress = validationResult.data;

    // 2. Logical consistency / sanity checks (Anti-cheat)

    // Check A: EXP should not be huge while activity history is empty
    const loggedExp = Object.values(progress.activityLog).reduce(
      (acc, curr) => acc + curr,
      0,
    );

    // Allow a small discrepancy for legacy/unlogged XP or resetting anomalies,
    // but a huge gap indicates manual manipulation of local storage.
    if (progress.exp > loggedExp + 1000) {
      const response = NextResponse.json(
        {
          valid: false,
          reason: "EXP total is inconsistent with activity log history",
        },
        { status: 400 },
      );
      return addCorsHeaders(response, origin);
    }

    // Check B: Streak requires a last active date
    if (progress.streak > 0 && !progress.lastActiveDate) {
      const response = NextResponse.json(
        {
          valid: false,
          reason: "Streak is set but last active date is missing",
        },
        { status: 400 },
      );
      return addCorsHeaders(response, origin);
    }

    // Check C: Validate date keys in activityLog are valid ISO date strings (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const invalidDates = Object.keys(progress.activityLog).filter(
      (dateStr) => !dateRegex.test(dateStr),
    );
    if (invalidDates.length > 0) {
      const response = NextResponse.json(
        {
          valid: false,
          reason: "Activity log contains invalid date keys",
          invalidKeys: invalidDates,
        },
        { status: 400 },
      );
      return addCorsHeaders(response, origin);
    }

    const response = NextResponse.json({
      valid: true,
      message: "Progress data is consistent and valid",
    });
    return addCorsHeaders(response, origin);
  } catch (error) {
    console.error("Progress validation failed:", error);
    const response = NextResponse.json(
      {
        valid: false,
        reason:
          error instanceof Error
            ? error.message
            : "Malformed JSON or request error",
      },
      { status: 400 },
    );
    return addCorsHeaders(response, origin);
  }
}

export async function OPTIONS(request: NextRequest) {
  const corsResponse = handleCorsRequest(request);
  if (corsResponse) return corsResponse;
  return new NextResponse(null, { status: 204 });
}
