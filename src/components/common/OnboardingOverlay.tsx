"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";

// ─── Rute Pembelajaran Terproteksi ──────────────────────────────────────────────
const RESTRICTED_ROUTES = [
  "/learning",
  "/characters",
  "/kana",
  "/kanji",
  "/jlpt",
  "/jlpt-exam",
  "/practice",
  "/practice-sheets",
  "/study",
  "/quiz",
  "/game",
  "/materi",
  "/stats",
  "/profile",
  "/daily-quiz",
  "/review",
  "/vocabulary",
  "/grammar",
  "/roadmap",
];

/**
 * OnboardingOverlay — Passive component.
 * Mandatory onboarding requirement is removed so users can immediately learn
 * without being redirected or blocked.
 */
export function OnboardingOverlay() {
  return null;
}
