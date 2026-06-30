"use client";

import { useEffect } from "react";

/**
 * usePwaTouch — JavaScript backup for PWA touch behavior.
 *
 * Prevents context menu (long-press) and text selection on any element ref.
 * This is a safety net for browsers that partially ignore CSS
 * `user-select: none` or `-webkit-touch-callout: none`.
 *
 * Usage:
 *   const ref = useRef<HTMLDivElement>(null);
 *   usePwaTouch(ref);
 *   return <div ref={ref}>...</div>;
 */
export function usePwaTouch(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const preventContextMenu = (e: Event) => e.preventDefault();
    const preventSelectStart = (e: Event) => e.preventDefault();

    el.addEventListener("contextmenu", preventContextMenu, { passive: false });
    el.addEventListener("selectstart", preventSelectStart);

    return () => {
      el.removeEventListener("contextmenu", preventContextMenu);
      el.removeEventListener("selectstart", preventSelectStart);
    };
  }, [ref]);
}
