"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type DeviceMode = "pc" | "mobile";

interface DeviceModeContextType {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  toggleDeviceMode: () => void;
  isMounted: boolean;
}

const DeviceModeContext = createContext<DeviceModeContextType | undefined>(
  undefined,
);

export function DeviceModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deviceMode, setDeviceModeState] = useState<DeviceMode>("mobile");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Synchronize state and marker on mount safely (client-only lifecycle)
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("device-mode") as DeviceMode;
      if (saved === "pc" || saved === "mobile") {
        setDeviceModeState(saved);
      } else {
        // Default layout is ALWAYS the App Sidebar / Roadmap View for all devices
        setDeviceModeState("mobile");
      }
    } catch {
      setDeviceModeState("mobile");
    }
  }, []);

  const setDeviceMode = (mode: DeviceMode) => {
    setDeviceModeState(mode);
    localStorage.setItem("device-mode", mode);

    // Toggle a global helper class on HTML element for CSS selectors if needed
    const html = document.documentElement;
    if (mode === "mobile") {
      html.classList.add("device-mobile");
      html.classList.remove("device-pc");
    } else {
      html.classList.add("device-pc");
      html.classList.remove("device-mobile");
    }
  };

  const toggleDeviceMode = () => {
    const next = deviceMode === "pc" ? "mobile" : "pc";
    setDeviceMode(next);
  };

  // Sync HTML classes on mount/mode load
  useEffect(() => {
    if (isMounted) {
      const html = document.documentElement;
      if (deviceMode === "mobile") {
        html.classList.add("device-mobile");
        html.classList.remove("device-pc");
      } else {
        html.classList.add("device-pc");
        html.classList.remove("device-mobile");
      }
    }
  }, [deviceMode, isMounted]);

  return (
    <DeviceModeContext.Provider
      value={{ deviceMode, setDeviceMode, toggleDeviceMode, isMounted }}
    >
      {children}
    </DeviceModeContext.Provider>
  );
}

export function useDeviceMode() {
  const context = useContext(DeviceModeContext);
  if (context === undefined) {
    throw new Error("useDeviceMode must be used within a DeviceModeProvider");
  }
  return context;
}
