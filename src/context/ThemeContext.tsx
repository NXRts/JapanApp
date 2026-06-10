"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeColor = "indigo" | "rose" | "emerald" | "blue" | "orange";
type ThemeMode = "light" | "dark";

interface ThemeContextType {
  color: ThemeColor;
  mode: ThemeMode;
  setColor: (color: ThemeColor) => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes: Record<
  ThemeColor,
  { primary: string; primaryLight: string; primaryDark: string }
> = {
  indigo: {
    primary: "#4F46E5",
    primaryLight: "#818CF8",
    primaryDark: "#3730A3",
  },
  rose: { primary: "#E11D48", primaryLight: "#FB7185", primaryDark: "#9F1239" },
  emerald: {
    primary: "#059669",
    primaryLight: "#34D399",
    primaryDark: "#064E3B",
  },
  blue: { primary: "#2563EB", primaryLight: "#60A5FA", primaryDark: "#1E3A8A" },
  orange: {
    primary: "#EA580C",
    primaryLight: "#FB923C",
    primaryDark: "#9A3412",
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState<ThemeColor>("indigo");
  const [mode, setMode] = useState<ThemeMode>("dark");

  // Load from local storage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedColor = localStorage.getItem("theme-color") as ThemeColor;
      const savedMode = localStorage.getItem("theme-mode") as ThemeMode;
      if (savedColor) setColor(savedColor);
      if (savedMode) setMode(savedMode);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Update CSS variables when state changes
  useEffect(() => {
    const root = document.documentElement;
    const theme = themes[color];

    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--primary-light", theme.primaryLight);
    root.style.setProperty("--primary-dark", theme.primaryDark);

    // Convert hex to RGB for alpha channel support
    const hex = theme.primary.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    root.style.setProperty("--primary-rgb", `${r}, ${g}, ${b}`);

    if (mode === "dark") {
      root.style.setProperty("--background", "#0B1121"); /* Deeper Navy */
      root.style.setProperty("--surface", "#172133"); /* Richer Navy surface */
      root.style.setProperty("--foreground", "#F8FAFC");
      root.style.setProperty(
        "--text-secondary",
        "#CBD5E1",
      ); /* Brighter secondary text */
      root.style.setProperty("--border", "rgba(255, 255, 255, 0.1)");
      root.style.setProperty("--shadow-sm", "0 1px 2px 0 rgb(0 0 0 / 0.4)");
      root.style.setProperty("--shadow-md", "0 4px 6px -1px rgb(0 0 0 / 0.4)");
      root.style.setProperty("--dot-color", "rgba(255, 255, 255, 0.05)");
      root.style.setProperty(
        "--navbar-bg",
        "rgba(11, 17, 33, 0.85)",
      ); /* Match background */
      root.style.setProperty("--navbar-border", "rgba(255, 255, 255, 0.08)");

      /* Dark: Glassy transparent */
      root.style.setProperty("--btn-secondary-bg", "rgba(255, 255, 255, 0.05)");
      root.style.setProperty("--btn-secondary-text", "#F8FAFC");
      root.style.setProperty(
        "--btn-secondary-border",
        "rgba(255, 255, 255, 0.1)",
      );
    } else {
      root.style.setProperty("--background", "#F8FAFC");
      root.style.setProperty("--surface", "#FFFFFF");
      root.style.setProperty("--foreground", "#1E293B");
      root.style.setProperty("--text-secondary", "#64748B");
      root.style.setProperty("--border", "#E2E8F0");
      root.style.setProperty("--shadow-sm", "0 1px 2px 0 rgb(0 0 0 / 0.05)");
      root.style.setProperty("--shadow-md", "0 4px 6px -1px rgb(0 0 0 / 0.1)");
      root.style.setProperty("--dot-color", "#E2E8F0");
      root.style.setProperty("--navbar-bg", "rgba(255, 255, 255, 0.85)");
      root.style.setProperty("--navbar-border", "rgba(226, 232, 240, 0.6)");

      /* Light: White solid with dark text/primary text */
      root.style.setProperty("--btn-secondary-bg", "#FFFFFF");
      root.style.setProperty(
        "--btn-secondary-text",
        "#4F46E5",
      ); /* Primary color */
      root.style.setProperty("--btn-secondary-border", "#E2E8F0");
    }

    localStorage.setItem("theme-color", color);
    localStorage.setItem("theme-mode", mode);
  }, [color, mode]);

  return (
    <ThemeContext.Provider value={{ color, mode, setColor, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
