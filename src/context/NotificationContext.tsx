"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useProgress } from "@/context/ProgressContext";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";

export interface AppNotification {
  id: string;
  type: "streak" | "quest" | "srs" | "league" | "system" | "reminder";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  icon?: string;
}

export interface NotificationSettings {
  enabled: boolean;
  dailyReminderTime: string; // e.g. "20:00"
  morningReminder: boolean;
  morningReminderTime: string; // e.g. "09:00"
  streakDangerAlert: boolean;
  srsReminder: boolean;
  leagueUpdates: boolean;
  questReminders: boolean;
  soundEnabled: boolean;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  settings: NotificationSettings;
  permission: NotificationPermission | "default";
  requestPermission: () => Promise<boolean>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  updateSettings: (newSettings: Partial<NotificationSettings>) => void;
  sendTestNotification: () => void;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: true,
  dailyReminderTime: "20:00",
  morningReminder: true,
  morningReminderTime: "09:00",
  streakDangerAlert: true,
  srsReminder: true,
  leagueUpdates: true,
  questReminders: true,
  soundEnabled: true,
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { progress } = useProgress();
  const router = useRouter();

  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_SETTINGS);
  const [permission, setPermission] = useState<NotificationPermission | "default">("default");
  const [isLoaded, setIsLoaded] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  // In-App Toast Popup & Permission Banner State
  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);
  const [showPermissionBanner, setShowPermissionBanner] = useState(false);

  const showToast = (item: AppNotification) => {
    setActiveToast(item);
    setTimeout(() => {
      setActiveToast((prev) => (prev?.id === item.id ? null : prev));
    }, 5500);
  };

  // Load initial settings & notifications from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check & Auto Prompt Notification permission
    if ("Notification" in window) {
      const currentPerm = Notification.permission;
      setPermission(currentPerm);

      if (currentPerm === "default") {
        setShowPermissionBanner(true);
        try {
          Notification.requestPermission().then((res) => {
            setPermission(res);
            if (res === "granted") setShowPermissionBanner(false);
          });
        } catch {
          // Fallback if browser requires click gesture
        }
      }
    }

    // Register Custom Service Worker for background notifications when app is closed
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw-custom.js", { scope: "/" }).then((reg) => {
        if ("periodicSync" in reg) {
          try {
            (reg as any).periodicSync.register("japanapp-daily-reminder", {
              minInterval: 12 * 60 * 60 * 1000,
            });
          } catch {
            // Periodic sync optional
          }
        }
      }).catch((err) => {
        console.error("Service Worker registration error", err);
      });
    }

    try {
      const savedSettings = localStorage.getItem("japanapp_notification_settings");
      if (savedSettings) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
      }

      const savedDismissed = localStorage.getItem("japanapp_dismissed_notifications");
      if (savedDismissed) {
        setDismissedIds(JSON.parse(savedDismissed));
      }

      const savedNotifs = localStorage.getItem("japanapp_notifications_list");
      if (savedNotifs) {
        setNotifications(JSON.parse(savedNotifs));
      } else {
        // Initial welcome notifications
        const initialList: AppNotification[] = [
          {
            id: "init_streak",
            type: "streak",
            title: "Pertahankan Streak!",
            message: "Lanjutkan latihan hari ini untuk mempertahankan streak kamu.",
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl: "/practice",
            icon: "🔥",
          },
          {
            id: "init_quest",
            type: "quest",
            title: "Bonus Daily Quest!",
            message: "Selesaikan 3 misi harian untuk mendapatkan permata bonus.",
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl: "/quests",
            icon: "💎",
          },
        ];
        setNotifications(initialList);
        localStorage.setItem("japanapp_notifications_list", JSON.stringify(initialList));
      }
    } catch (e) {
      console.error("Failed to load notifications from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save settings when changed
  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (typeof window !== "undefined") {
        localStorage.setItem("japanapp_notification_settings", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Save notifications list when changed
  const saveNotificationsList = (newList: AppNotification[]) => {
    setNotifications(newList);
    if (typeof window !== "undefined") {
      localStorage.setItem("japanapp_notifications_list", JSON.stringify(newList));
    }
  };

  // Request browser Notification permission
  const requestPermission = async (): Promise<boolean> => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return false;
    }
    try {
      const res = await Notification.requestPermission();
      setPermission(res);
      if (res === "granted") {
        setShowPermissionBanner(false);
      }
      return res === "granted";
    } catch (e) {
      console.error("Error requesting notification permission", e);
      return false;
    }
  };

  // Helper to push a system Web Notification outside the app
  const triggerSystemNotification = (title: string, options?: NotificationOptions) => {
    if (typeof window === "undefined") return;

    if ("Notification" in window && Notification.permission === "granted" && settings.enabled) {
      const highPriorityOptions = {
        icon: "/icons/icon-192.png",
        badge: "/icons/icon-192.png",
        image: "/icons/icon-512.png",
        vibrate: [500, 200, 500, 200, 500],
        requireInteraction: true,
        renotify: true,
        silent: false,
        tag: `japanapp_${Date.now()}`,
        timestamp: Date.now(),
        actions: [
          { action: "open", title: "🚀 Belajar Sekarang" }
        ],
        ...options,
      };

      try {
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.getRegistration().then((reg) => {
            if (reg) {
              reg.showNotification(title, highPriorityOptions as any);
            } else {
              new Notification(title, highPriorityOptions as any);
            }
          });
        } else {
          new Notification(title, highPriorityOptions as any);
        }
      } catch (err) {
        console.error("Failed to trigger browser notification", err);
      }
    }
  };

  // Evaluate Realtime Reminders (Streak, SRS, Quests, League)
  useEffect(() => {
    if (!isLoaded || !settings.enabled) return;

    const todayStr = new Date().toISOString().split("T")[0];
    const todayExp = progress.activityLog?.[todayStr] || 0;
    const currentHour = new Date().getHours();

    const existingNotifIds = new Set(notifications.map((n) => n.id));
    const dismissedSet = new Set(dismissedIds);
    const newItems: AppNotification[] = [];

    // 1. Streak Danger Warning (Past 18:00 and no activity today)
    if (settings.streakDangerAlert && todayExp === 0 && currentHour >= 18) {
      const dangerId = `streak_danger_${todayStr}`;
      if (!existingNotifIds.has(dangerId) && !dismissedSet.has(dangerId)) {
        const item: AppNotification = {
          id: dangerId,
          type: "streak",
          title: "Streak Kamu Dalam Bahaya!",
          message: `Kamu belum latihan hari ini! Selesaikan 1 kuis sebelum 00:00 agar streak ${progress.streak || 0} hari tidak hilang.`,
          timestamp: new Date().toISOString(),
          read: false,
          actionUrl: "/practice",
          icon: "🔥",
        };
        newItems.push(item);
        triggerSystemNotification(item.title, { body: item.message });
      }
    }

    // 2. SRS Due Reminder
    if (settings.srsReminder) {
      const srsItems = Object.values((progress as any).srsItems || progress.srs || {});
      const dueItemsCount = srsItems.filter((i: any) => {
        if (!i.nextReview) return false;
        return new Date(i.nextReview) <= new Date();
      }).length;

      if (dueItemsCount >= 5) {
        const srsId = `srs_due_${todayStr}`;
        if (!existingNotifIds.has(srsId) && !dismissedSet.has(srsId)) {
          const item: AppNotification = {
            id: srsId,
            type: "srs",
            title: "Item SRS Siap Ditinjau!",
            message: `${dueItemsCount} memori karakter & kata siap diulas untuk menjaga ingatan jangka panjangmu.`,
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl: "/practice",
            icon: "🧠",
          };
          newItems.push(item);
          triggerSystemNotification(item.title, { body: item.message });
        }
      }
    }

    // 3. Quest Reward Ready Alert
    if (settings.questReminders) {
      const claimed = (progress.claimedQuests || []).length;
      if (claimed < 3) {
        const questId = `quest_reminder_${todayStr}`;
        if (!existingNotifIds.has(questId) && !dismissedSet.has(questId)) {
          const item: AppNotification = {
            id: questId,
            type: "quest",
            title: "Daily Quest Belum Diklaim!",
            message: "Selesaikan misi harianmu hari ini untuk mendapatkan bonus permata & EXP.",
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl: "/quests",
            icon: "🎁",
          };
          newItems.push(item);
        }
      }
    }

    // 4. Morning Learning Reminder (Past 09:00 AM)
    if (settings.morningReminder !== false && currentHour >= 9) {
      const morningId = `morning_reminder_${todayStr}`;
      if (!existingNotifIds.has(morningId) && !dismissedSet.has(morningId)) {
        const item: AppNotification = {
          id: morningId,
          type: "reminder",
          title: "Selamat Pagi! Waktunya Belajar",
          message: "Mulai harimu dengan 5 menit latihan Kana & Kanji untuk memperkuat ingatan!",
          timestamp: new Date().toISOString(),
          read: false,
          actionUrl: "/practice",
          icon: "☀️",
        };
        newItems.push(item);
        triggerSystemNotification(item.title, { body: item.message });
      }
    }

    if (newItems.length > 0) {
      saveNotificationsList([...newItems, ...notifications]);
    }
  }, [progress, settings.enabled, settings.morningReminder, isLoaded, notifications, dismissedIds]);

  // Scheduled Daily Alarm Checker (runs every 60s)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoaded || !settings.enabled) return;

      const now = new Date();
      const currentHHMM = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const todayStr = now.toISOString().split("T")[0];
      const dismissedSet = new Set(dismissedIds);

      // Evening Alarm Check
      if (settings.dailyReminderTime && currentHHMM === settings.dailyReminderTime) {
        const alarmId = `alarm_${todayStr}`;
        if (!notifications.some((n) => n.id === alarmId) && !dismissedSet.has(alarmId)) {
          const item: AppNotification = {
            id: alarmId,
            type: "reminder",
            title: "⏰ Waktunya Belajar Jepang!",
            message: "Luangkan 5 menit hari ini untuk kuis Kana & Kata agar makin lancar.",
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl: "/practice",
            icon: "⏰",
          };
          saveNotificationsList([item, ...notifications]);
          triggerSystemNotification(item.title, { body: item.message });
        }
      }

      // Morning Alarm Check (09:00 AM)
      if (settings.morningReminder !== false && currentHHMM === (settings.morningReminderTime || "09:00")) {
        const morningId = `morning_alarm_${todayStr}`;
        if (!notifications.some((n) => n.id === morningId) && !dismissedSet.has(morningId)) {
          const item: AppNotification = {
            id: morningId,
            type: "reminder",
            title: "Selamat Pagi! Waktunya Belajar",
            message: "Mulai harimu dengan 5 menit latihan Kana & Kanji untuk memperkuat ingatan!",
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl: "/practice",
            icon: "☀️",
          };
          saveNotificationsList([item, ...notifications]);
          triggerSystemNotification(item.title, { body: item.message });
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [settings.enabled, settings.dailyReminderTime, settings.morningReminder, settings.morningReminderTime, notifications, dismissedIds]);

  // Notification actions
  const markAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    saveNotificationsList(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveNotificationsList(updated);
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    saveNotificationsList(updated);
    setDismissedIds((prev) => {
      const next = Array.from(new Set([...prev, id]));
      if (typeof window !== "undefined") {
        localStorage.setItem("japanapp_dismissed_notifications", JSON.stringify(next));
      }
      return next;
    });
  };

  const clearAll = () => {
    const idsToDismiss = notifications.map((n) => n.id);
    saveNotificationsList([]);
    setDismissedIds((prev) => {
      const next = Array.from(new Set([...prev, ...idsToDismiss]));
      if (typeof window !== "undefined") {
        localStorage.setItem("japanapp_dismissed_notifications", JSON.stringify(next));
      }
      return next;
    });
  };

  const sendTestNotification = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      alert("Browser Anda tidak mendukung Notifikasi Sistem.");
      return;
    }

    let currentPerm = Notification.permission;
    if (currentPerm !== "granted") {
      currentPerm = await Notification.requestPermission();
      setPermission(currentPerm);
    }

    if (currentPerm !== "granted") {
      alert("Izin notifikasi belum diberikan di peramban.");
      return;
    }

    const testItem: AppNotification = {
      id: `test_${Date.now()}`,
      type: "system",
      title: "Test",
      message: "Test",
      timestamp: new Date().toISOString(),
      read: false,
      actionUrl: "/practice",
      icon: "🧪",
    };
    saveNotificationsList([testItem, ...notifications]);
    triggerSystemNotification(testItem.title, { body: testItem.message });
  };

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        settings,
        permission,
        requestPermission,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        updateSettings,
        sendTestNotification,
      }}
    >
      {children}

      {/* Bottom Permission Banner Prompt */}
      {showPermissionBanner && permission === "default" && (
        <PermissionBannerContainer>
          <div className="banner-text">
            <span className="banner-title">🔔 Izinkan Notifikasi Sistem</span>
            <span className="banner-desc">Dapatkan pengingat Streak & jam belajar harian di HP Anda.</span>
          </div>
          <div className="banner-btns">
            <button
              className="allow"
              onClick={async () => {
                const granted = await requestPermission();
                if (granted) setShowPermissionBanner(false);
              }}
            >
              Izinkan
            </button>
            <button className="dismiss" onClick={() => setShowPermissionBanner(false)}>
              Nanti
            </button>
          </div>
        </PermissionBannerContainer>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    return {
      notifications: [],
      unreadCount: 0,
      settings: DEFAULT_SETTINGS,
      permission: "default" as const,
      requestPermission: async () => false,
      markAsRead: () => {},
      markAllAsRead: () => {},
      deleteNotification: () => {},
      clearAll: () => {},
      updateSettings: () => {},
      sendTestNotification: () => {},
    };
  }
  return context;
}

// Styled Components for Permission Banner
const slideUpAnimation = keyframes`
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

const PermissionBannerContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  max-width: 460px;
  background: var(--surface);
  border: 1px solid var(--primary);
  border-radius: 16px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5);
  padding: 0.85rem 1.1rem;
  z-index: 99998;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  animation: ${slideUpAnimation} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: "Nunito", "Outfit", sans-serif;

  .banner-text {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .banner-title {
      font-weight: 850;
      font-size: 0.85rem;
      color: var(--foreground);
    }

    .banner-desc {
      font-size: 0.75rem;
      color: var(--text-secondary);
      line-height: 1.3;
    }
  }

  .banner-btns {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;

    button.allow {
      background: var(--primary);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.76rem;
      font-weight: 850;
      cursor: pointer;
      white-space: nowrap;

      &:hover {
        opacity: 0.9;
      }
    }

    button.dismiss {
      background: transparent;
      color: var(--text-secondary);
      border: none;
      border-radius: 8px;
      padding: 6px 8px;
      font-size: 0.76rem;
      font-weight: 700;
      cursor: pointer;

      &:hover {
        color: var(--foreground);
      }
    }
  }
`;
