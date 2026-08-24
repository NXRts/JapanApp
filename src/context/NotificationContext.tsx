"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useProgress } from "@/context/ProgressContext";
import { useRouter } from "next/navigation";

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
  clearAll: () => void;
  updateSettings: (newSettings: Partial<NotificationSettings>) => void;
  sendTestNotification: () => void;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: true,
  dailyReminderTime: "20:00",
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

  // Load initial settings & notifications from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check Notification permission
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }

    try {
      const savedSettings = localStorage.getItem("japanapp_notification_settings");
      if (savedSettings) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
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
      return res === "granted";
    } catch (e) {
      console.error("Error requesting notification permission", e);
      return false;
    }
  };

  // Helper to push a system Web Notification
  const triggerSystemNotification = (title: string, options?: NotificationOptions) => {
    if (typeof window === "undefined" || !("Notification" in window)) return;

    if (Notification.permission === "granted" && settings.enabled) {
      try {
        if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.ready.then((reg) => {
            reg.showNotification(title, {
              icon: "/icons/icon-192x192.png",
              badge: "/icons/icon-192x192.png",
              vibrate: [200, 100, 200],
              ...options,
            } as any);
          });
        } else {
          new Notification(title, {
            icon: "/icons/icon-192x192.png",
            ...options,
          });
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
    const newItems: AppNotification[] = [];

    // 1. Streak Danger Warning (Past 18:00 and no activity today)
    if (settings.streakDangerAlert && todayExp === 0 && currentHour >= 18) {
      const dangerId = `streak_danger_${todayStr}`;
      if (!existingNotifIds.has(dangerId)) {
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
        if (!existingNotifIds.has(srsId)) {
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
        if (!existingNotifIds.has(questId)) {
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

    if (newItems.length > 0) {
      saveNotificationsList([...newItems, ...notifications]);
    }
  }, [progress, settings.enabled, isLoaded, notifications]);

  // Scheduled Daily Alarm Checker (runs every 60s)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoaded || !settings.enabled || !settings.dailyReminderTime) return;

      const now = new Date();
      const currentHHMM = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const todayStr = now.toISOString().split("T")[0];

      if (currentHHMM === settings.dailyReminderTime) {
        const alarmId = `alarm_${todayStr}`;
        if (!notifications.some((n) => n.id === alarmId)) {
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
    }, 60000);

    return () => clearInterval(interval);
  }, [settings.enabled, settings.dailyReminderTime, notifications]);

  // Notification actions
  const markAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    saveNotificationsList(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveNotificationsList(updated);
  };

  const clearAll = () => {
    saveNotificationsList([]);
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

    try {
      if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        const reg = await navigator.serviceWorker.ready;
        reg.showNotification(testItem.title, {
          body: testItem.message,
          icon: "/icons/icon-192x192.png",
          badge: "/icons/icon-192x192.png",
          vibrate: [200, 100, 200],
        } as any);
      } else {
        new Notification(testItem.title, {
          body: testItem.message,
          icon: "/icons/icon-192x192.png",
        });
      }
    } catch (e) {
      console.error("Failed to trigger OS test notification", e);
    }
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
        clearAll,
        updateSettings,
        sendTestNotification,
      }}
    >
      {children}
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
      clearAll: () => {},
      updateSettings: () => {},
      sendTestNotification: () => {},
    };
  }
  return context;
}
