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
 * OnboardingRedirectHandler — Headless redirect guard.
 * If the user hasn't set their name and attempts to visit a restricted route,
 * they are instantly redirected to the standalone `/login` page.
 */
export function OnboardingOverlay() {
  const { progress, isLoaded } = useProgress();
  const pathname = usePathname() || "";
  const router = useRouter();

  useEffect(() => {
    // Only perform route guarding once the progress state is successfully
    // hydrated from localStorage.
    if (!isLoaded) return;

    const isRestrictedRoute = RESTRICTED_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    );

    if (!progress.hasSetName && isRestrictedRoute) {
      // Redirect to dedicated onboarding page with the target path preserved
      const redirectUrl = encodeURIComponent(pathname);
      router.replace(`/onboarding?redirect=${redirectUrl}`);
    }
  }, [progress.hasSetName, isLoaded, pathname, router]);

  return null;
}
