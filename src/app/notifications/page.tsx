"use client";

import { useState, useMemo } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/context/NotificationContext";
import { useProgress } from "@/context/ProgressContext";
import { useTheme } from "@/context/ThemeContext";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 880px;
  margin: 0 auto;
  padding: 1.5rem 1rem 5rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    padding: 0.75rem 0.5rem 4rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 860px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const HeaderCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;

    @media (max-width: 580px) {
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
    }
  }

  .header-title-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    h1 {
      font-size: 1.45rem;
      font-weight: 900;
      margin: 0;
      color: var(--foreground);
      display: flex;
      align-items: center;
      gap: 0.6rem;

      @media (max-width: 480px) {
        font-size: 1.25rem;
      }
    }

    p {
      font-size: 0.88rem;
      color: var(--text-secondary);
      margin: 0;

      @media (max-width: 480px) {
        font-size: 0.8rem;
      }
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    @media (max-width: 580px) {
      width: 100%;
    }
  }
`;

const ActionButton = styled.button<{ $variant?: "primary" | "danger" | "ghost" }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.95rem;
  border-radius: 12px;
  font-size: 0.82rem;
  font-weight: 800;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid transparent;
  user-select: none;
  white-space: nowrap;

  ${({ $variant }) =>
    $variant === "primary"
      ? css`
          background: var(--primary);
          color: #ffffff;
          &:hover {
            opacity: 0.92;
            transform: translateY(-1px);
          }
        `
      : $variant === "danger"
        ? css`
            background: rgba(239, 68, 68, 0.1);
            color: #ef4444;
            border-color: rgba(239, 68, 68, 0.2);
            &:hover {
              background: rgba(239, 68, 68, 0.18);
              border-color: rgba(239, 68, 68, 0.4);
            }
          `
        : css`
            background: rgba(var(--foreground-rgb), 0.05);
            color: var(--text-secondary);
            border-color: var(--border);
            &:hover {
              background: rgba(var(--foreground-rgb), 0.09);
              color: var(--foreground);
            }
          `}

  @media (max-width: 580px) {
    flex: 1;
    justify-content: center;
    padding: 0.5rem 0.75rem;
    font-size: 0.78rem;
  }
`;

const FilterTabsBar = styled.div`
  display: flex;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 5px;
  gap: 5px;
  overflow-x: auto;
  width: 100%;
  box-sizing: border-box;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterTabItem = styled.button<{ $active: boolean }>`
  flex: 1 0 auto;
  min-width: max-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.55rem 1rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 800;
  font-family: inherit;
  color: ${({ $active }) => ($active ? "#ffffff" : "var(--text-secondary)")};
  background: ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  border: none;
  cursor: pointer;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
  box-shadow: ${({ $active }) =>
    $active ? "0 4px 12px rgba(var(--primary-rgb, 79, 70, 229), 0.3)" : "none"};

  .badge {
    background: ${({ $active }) =>
      $active ? "rgba(255, 255, 255, 0.25)" : "rgba(var(--foreground-rgb), 0.08)"};
    color: ${({ $active }) => ($active ? "#ffffff" : "var(--foreground)")};
    padding: 2px 7px;
    border-radius: 99px;
    font-size: 0.73rem;
    font-weight: 900;
  }

  &:hover {
    color: ${({ $active }) => ($active ? "#ffffff" : "var(--foreground)")};
    background: ${({ $active }) =>
      $active ? "var(--primary)" : "rgba(var(--foreground-rgb), 0.04)"};
  }

  @media (max-width: 480px) {
    padding: 0.45rem 0.75rem;
    font-size: 0.78rem;
  }
`;

const NotificationCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const NotificationCard = styled.div<{ $unread: boolean }>`
  position: relative;
  background: var(--surface);
  border: 1px solid
    ${({ $unread }) =>
      $unread ? "rgba(var(--primary-rgb, 79, 70, 229), 0.4)" : "var(--border)"};
  border-left: 4px solid
    ${({ $unread }) => ($unread ? "var(--primary)" : "transparent")};
  border-radius: 18px;
  padding: 1.1rem 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: ${({ $unread }) =>
    $unread ? "0 4px 16px rgba(var(--primary-rgb, 79, 70, 229), 0.08)" : "var(--shadow-sm)"};

  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .notif-avatar {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
    border: 1px solid rgba(var(--primary-rgb, 79, 70, 229), 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.45rem;
    flex-shrink: 0;

    @media (max-width: 480px) {
      width: 40px;
      height: 40px;
      font-size: 1.25rem;
      border-radius: 12px;
    }
  }

  .notif-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    .notif-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .notif-badge {
        font-size: 0.68rem;
        font-weight: 900;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        padding: 2px 7px;
        border-radius: 6px;
        background: rgba(var(--primary-rgb, 79, 70, 229), 0.12);
        color: var(--primary);
      }

      .notif-time {
        font-size: 0.74rem;
        color: var(--text-secondary);
      }

      .unread-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--primary);
        box-shadow: 0 0 8px var(--primary);
      }
    }

    .notif-title {
      font-size: 0.98rem;
      font-weight: 850;
      color: var(--foreground);
      margin: 0;
      line-height: 1.35;

      @media (max-width: 480px) {
        font-size: 0.9rem;
      }
    }

    .notif-desc {
      font-size: 0.86rem;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.45;

      @media (max-width: 480px) {
        font-size: 0.8rem;
      }
    }

    .notif-action-btn {
      margin-top: 0.4rem;
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.4rem 0.85rem;
      border-radius: 10px;
      background: rgba(var(--primary-rgb, 79, 70, 229), 0.1);
      color: var(--primary);
      border: 1px solid rgba(var(--primary-rgb, 79, 70, 229), 0.25);
      font-size: 0.78rem;
      font-weight: 800;
      text-decoration: none;
      transition: all 0.15s ease;

      &:hover {
        background: var(--primary);
        color: #ffffff;
      }
    }
  }

  .delete-item-btn {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.15s ease;
    flex-shrink: 0;

    &:hover {
      background: rgba(239, 68, 68, 0.12);
      color: #ef4444;
    }
  }
`;

const EmptyStateCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 3rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  box-shadow: var(--shadow-sm);

  .empty-icon {
    font-size: 3.5rem;
    line-height: 1;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 850;
    margin: 0;
    color: var(--foreground);
  }

  p {
    font-size: 0.88rem;
    color: var(--text-secondary);
    margin: 0;
    max-width: 360px;
    line-height: 1.5;
  }

  .cta-btn {
    margin-top: 0.5rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1.25rem;
    border-radius: 12px;
    background: var(--primary);
    color: #ffffff;
    font-size: 0.85rem;
    font-weight: 800;
    text-decoration: none;
    transition: all 0.18s ease;

    &:hover {
      opacity: 0.92;
      transform: translateY(-1px);
    }
  }
`;

const PushSettingsQuickCard = styled.div`
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%);
  border: 1px solid rgba(79, 70, 229, 0.25);
  border-radius: 18px;
  padding: 1.2rem 1.35rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  box-sizing: border-box;

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.85rem;
  }

  .info-group {
    display: flex;
    align-items: center;
    gap: 0.85rem;

    .icon-box {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: var(--primary);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .text-box {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;

      h4 {
        margin: 0;
        font-size: 0.92rem;
        font-weight: 850;
        color: var(--foreground);
      }

      p {
        margin: 0;
        font-size: 0.78rem;
        color: var(--text-secondary);
      }
    }
  }

  .action-group {
    display: flex;
    align-items: center;
    gap: 0.6rem;

    @media (max-width: 580px) {
      width: 100%;
      justify-content: flex-end;
    }
  }
`;

type FilterTab = "all" | "unread" | "quest" | "system";

export default function NotificationsPage() {
  const router = useRouter();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    sendTestNotification,
    permission,
    requestPermission,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const counts = useMemo(() => {
    const unread = notifications.filter((n) => !n.read).length;
    const quest = notifications.filter((n) => n.type === "streak" || n.type === "quest").length;
    const system = notifications.filter((n) => n.type === "system").length;
    return {
      all: notifications.length,
      unread,
      quest,
      system,
    };
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((n) => !n.read);
      case "quest":
        return notifications.filter((n) => n.type === "streak" || n.type === "quest");
      case "system":
        return notifications.filter((n) => n.type === "system");
      case "all":
      default:
        return notifications;
    }
  }, [notifications, activeTab]);

  const formatRelativeTime = (timestampString: string) => {
    try {
      const date = new Date(timestampString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 1) return "Baru saja";
      if (diffMins < 60) return `${diffMins} menit lalu`;
      if (diffHours < 24) return `${diffHours} jam lalu`;
      if (diffDays === 1) return "Kemarin";
      return `${diffDays} hari lalu`;
    } catch {
      return "Hari ini";
    }
  };

  const getCategoryBadge = (type: string) => {
    switch (type) {
      case "streak":
        return "STREAK REMINDER";
      case "quest":
        return "DAILY QUEST";
      case "system":
        return "SYSTEM UPDATE";
      default:
        return "NOTIFIKASI";
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <Breadcrumbs items={[{ label: "Home", href: "/" }]} current="Notifikasi" />

        <HeaderCard>
          <div className="header-top">
            <div className="header-title-group">
              <h1>
                <span>🔔</span> Pusat Notifikasi & Aktivitas
              </h1>
              <p>Pantau pengingat streak, daily quest, dan pemberitahuan sistem kamu.</p>
            </div>

            <div className="header-actions">
              {unreadCount > 0 && (
                <ActionButton $variant="ghost" onClick={markAllAsRead}>
                  ✓ Tandai Dibaca
                </ActionButton>
              )}
              {notifications.length > 0 && (
                <ActionButton $variant="danger" onClick={clearAll}>
                  🗑️ Hapus Semua
                </ActionButton>
              )}
            </div>
          </div>

          <FilterTabsBar>
            <FilterTabItem $active={activeTab === "all"} onClick={() => setActiveTab("all")}>
              Semua <span className="badge">{counts.all}</span>
            </FilterTabItem>
            <FilterTabItem $active={activeTab === "unread"} onClick={() => setActiveTab("unread")}>
              Belum Dibaca <span className="badge">{counts.unread}</span>
            </FilterTabItem>
            <FilterTabItem $active={activeTab === "quest"} onClick={() => setActiveTab("quest")}>
              Streak & Quest <span className="badge">{counts.quest}</span>
            </FilterTabItem>
            <FilterTabItem $active={activeTab === "system"} onClick={() => setActiveTab("system")}>
              Sistem <span className="badge">{counts.system}</span>
            </FilterTabItem>
          </FilterTabsBar>
        </HeaderCard>

        {/* Quick Web Push Control Banner */}
        <PushSettingsQuickCard>
          <div className="info-group">
            <div className="icon-box">📱</div>
            <div className="text-box">
              <h4>Notifikasi Latar Belakang HP (Web Push)</h4>
              <p>
                {permission === "granted"
                  ? "Aktif • Anda akan menerima pengingat harian di HP saat PWA ditutup."
                  : "Minta izin untuk mendapatkan pengingat streak langsung di HP Anda."}
              </p>
            </div>
          </div>
          <div className="action-group">
            {permission !== "granted" ? (
              <ActionButton $variant="primary" onClick={requestPermission}>
                Izinkan HP
              </ActionButton>
            ) : (
              <ActionButton $variant="ghost" onClick={sendTestNotification}>
                🧪 Tes Push
              </ActionButton>
            )}
            <Link href="/settings" style={{ textDecoration: "none" }}>
              <ActionButton $variant="ghost">Pengaturan ⚙️</ActionButton>
            </Link>
          </div>
        </PushSettingsQuickCard>

        {/* Notifications List or Empty State */}
        {filteredNotifications.length === 0 ? (
          <EmptyStateCard>
            <div className="empty-icon">🎉</div>
            <h3>Tidak Ada Notifikasi saat ini!</h3>
            <p>
              {activeTab === "unread"
                ? "Semua notifikasi sudah kamu baca. Bagus sekali!"
                : "Kamu sudah up-to-date! Lanjutkan streak dan kuis harianmu."}
            </p>
            <Link href="/lessons" className="cta-btn">
              Mulai Belajar Pelajaran ➔
            </Link>
          </EmptyStateCard>
        ) : (
          <NotificationCardList>
            {filteredNotifications.map((notif) => (
              <NotificationCard
                key={notif.id}
                $unread={!notif.read}
                onClick={() => {
                  markAsRead(notif.id);
                  if (notif.actionUrl) {
                    router.push(notif.actionUrl);
                  }
                }}
              >
                <div className="notif-avatar">{notif.icon || "🔔"}</div>

                <div className="notif-body">
                  <div className="notif-meta">
                    <span className="notif-badge">{getCategoryBadge(notif.type)}</span>
                    <span className="notif-time">{formatRelativeTime(notif.timestamp)}</span>
                    {!notif.read && <span className="unread-dot" title="Belum dibaca" />}
                  </div>

                  <h3 className="notif-title">{notif.title}</h3>
                  <p className="notif-desc">{notif.message}</p>

                  {notif.actionUrl && (
                    <Link
                      href={notif.actionUrl}
                      className="notif-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notif.id);
                      }}
                    >
                      Buka Fitur ➔
                    </Link>
                  )}
                </div>

                <button
                  type="button"
                  className="delete-item-btn"
                  title="Hapus notifikasi ini"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notif.id);
                  }}
                >
                  ✕
                </button>
              </NotificationCard>
            ))}
          </NotificationCardList>
        )}
      </ContentWrapper>
    </PageContainer>
  );
}
