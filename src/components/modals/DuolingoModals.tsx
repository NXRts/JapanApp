"use client";

import { useProgress } from "@/context/ProgressContext";
import { getLeagueById, getRankStatus } from "@/data/leagues";
import { getDailyQuests, Quest } from "@/utils/dailyQuests";
import { CheckIcon } from "@/components/common/CheckIcon";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";

/* ─── Shared Modal Overlay & Container ───────────────────────────────────── */
function useLockBodyScroll(onClose?: () => void) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: ${fadeIn} 0.25s ease-out;
  touch-action: none;
`;

const ModalBox = styled.div<{ $maxWidth?: string }>`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 28px;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || "480px"};
  max-height: 85vh;
  overflow-y: auto;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: ${slideUp} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  color: var(--foreground);

  @media (max-width: 640px) {
    padding: 1.5rem;
    border-radius: 24px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: var(--foreground);
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 850;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ModalSub = styled.p`
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const ActionBtn = styled.button<{
  $variant?: "primary" | "super" | "secondary" | "danger";
}>`
  width: 100%;
  padding: 0.85rem 1.25rem;
  border-radius: 14px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${({ $variant }) => {
    if ($variant === "super") {
      return `
        background: linear-gradient(90deg, #ec4899 0%, #8b5cf6 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(236, 72, 153, 0.35);
        &:hover { filter: brightness(1.1); transform: translateY(-1px); }
      `;
    }
    if ($variant === "secondary") {
      return `
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid var(--border);
        color: var(--foreground);
        &:hover { background: rgba(255, 255, 255, 0.15); }
      `;
    }
    if ($variant === "danger") {
      return `
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #ef4444;
        &:hover { background: rgba(239, 68, 68, 0.25); }
      `;
    }
    return `
      background: var(--primary);
      color: white;
      box-shadow: 0 4px 14px rgba(var(--primary-rgb), 0.35);
      &:hover { filter: brightness(1.1); transform: translateY(-1px); }
    `;
  }}
`;

/* ─── 1. COURSE / FLAG SELECTOR MODAL ─────────────────────────────────────── */
export function CourseModal({ onClose }: { onClose: () => void }) {
  useLockBodyScroll(onClose);
  const levels = [
    {
      id: "n5",
      title: "JLPT N5 - Pemula",
      desc: "Dasar Kanji, Kana, & Percakapan Harian",
      badge: "🟢 Aktif",
    },
    {
      id: "n4",
      title: "JLPT N4 - Menengah Bawah",
      desc: "Tata bahasa dasar lanjut & Kanji N4",
      badge: "🔒 Segera",
    },
    {
      id: "n3",
      title: "JLPT N3 - Menengah",
      desc: "Percakapan alami & Bacaan sedang",
      badge: "🔒 Segera",
    },
    {
      id: "n2",
      title: "JLPT N2 - Lanjutan",
      desc: "Pemahaman bisnis & Bahasa Jepang kompleks",
      badge: "🔒 Segera",
    },
    {
      id: "n1",
      title: "JLPT N1 - Mahir",
      desc: "Tingkat penutur asli & Artikel ilmiah",
      badge: "🔒 Segera",
    },
  ];

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>🇯🇵 Bahasa Jepang (JLPT)</ModalTitle>
        <ModalSub>
          Pilih tingkat pembelajaran aktif kamu untuk menyesuaikan materi kuis &
          roadmap.
        </ModalSub>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
            marginBottom: "1.5rem",
          }}
        >
          {levels.map((lvl) => (
            <div
              key={lvl.id}
              style={{
                background:
                  lvl.id === "n5"
                    ? "rgba(var(--primary-rgb), 0.12)"
                    : "rgba(255, 255, 255, 0.03)",
                border:
                  lvl.id === "n5"
                    ? "1.5px solid var(--primary)"
                    : "1px solid var(--border)",
                borderRadius: "16px",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: lvl.id === "n5" ? "pointer" : "not-allowed",
                opacity: lvl.id === "n5" ? 1 : 0.6,
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>
                  {lvl.title}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    marginTop: "0.2rem",
                  }}
                >
                  {lvl.desc}
                </div>
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  padding: "0.2rem 0.5rem",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                {lvl.badge}
              </span>
            </div>
          ))}
        </div>

        <ActionBtn onClick={onClose}>Simpan & Lanjutkan</ActionBtn>
      </ModalBox>
    </Overlay>
  );
}

/* ─── 2. STREAK MODAL ─────────────────────────────────────────────────────── */
export function StreakModal({ onClose }: { onClose: () => void }) {
  useLockBodyScroll(onClose);
  const { progress, buyStreakFreeze } = useProgress();
  const streak = progress.streak || 0;
  const hasFreeze = progress.hasStreakFreeze || false;
  const gems = progress.gems !== undefined ? progress.gems : 100;

  const weekDays = useMemo(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(now);
    monday.setDate(now.getDate() + distanceToMonday);

    const labels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
    const log = progress.activityLog || {};
    const todayStr = now.toISOString().split("T")[0];

    return labels.map((label, index) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + index);
      const dateStr = d.toISOString().split("T")[0];
      const isToday = dateStr === todayStr;
      const hasStudied = (log[dateStr] || 0) > 0;
      return { label, dateStr, isToday, hasStudied };
    });
  }, [progress.activityLog]);

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}>🔥</div>
          <ModalTitle style={{ justifyContent: "center" }}>
            {streak} Hari Streak!
          </ModalTitle>
          <ModalSub style={{ marginBottom: "0" }}>
            Kamu telah belajar berturut-turut. Pertahankan api semangatmu!
          </ModalSub>
        </div>

        {/* Calendar Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--border)",
            borderRadius: "18px",
            padding: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {weekDays.map((d) => (
            <div
              key={d.dateStr}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  color: d.isToday ? "#f59e0b" : "var(--text-secondary)",
                  fontWeight: d.isToday ? 900 : 700,
                }}
              >
                {d.label}
              </span>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: d.hasStudied
                    ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                    : d.isToday
                    ? "rgba(245, 158, 11, 0.15)"
                    : "rgba(255,255,255,0.06)",
                  border: d.isToday
                    ? "2px solid #f59e0b"
                    : d.hasStudied
                    ? "none"
                    : "1px solid rgba(255,255,255,0.1)",
                  boxShadow: d.hasStudied
                    ? "0 0 12px rgba(245, 158, 11, 0.4)"
                    : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.05rem",
                  transition: "all 0.2s ease",
                }}
              >
                {d.hasStudied ? (
                  "🔥"
                ) : d.isToday ? (
                  <span style={{ opacity: 0.7, filter: "brightness(1.1)" }}>🔥</span>
                ) : (
                  <span style={{ opacity: 0.25, filter: "grayscale(0.8)" }}>🔥</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Streak Freeze Card */}
        <div
          style={{
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            borderRadius: "18px",
            padding: "1.25rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div style={{ fontSize: "2rem" }}>🛡️</div>
          <div style={{ flex: 1 }}>
            <div
              style={{ fontWeight: 800, fontSize: "0.95rem", color: "#3b82f6" }}
            >
              Bekukan Streak (Streak Freeze)
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                marginTop: "0.2rem",
              }}
            >
              {hasFreeze
                ? "Aktif! Streak kamu aman jika tidak belajar 1 hari."
                : "Lindungi streak kamu jika melewatkan latihan 1 hari."}
            </div>
          </div>
        </div>

        {!hasFreeze ? (
          <ActionBtn onClick={() => buyStreakFreeze()} disabled={gems < 200}>
            🛡️ Beli Streak Freeze (200 💎)
          </ActionBtn>
        ) : (
          <ActionBtn $variant="secondary" onClick={onClose}>
            Streak Aman & Aktif <CheckIcon size={16} style={{ marginLeft: "4px" }} />
          </ActionBtn>
        )}
      </ModalBox>
    </Overlay>
  );
}

/* ─── 3. SHOP MODAL (GEMS STORE) ─────────────────────────────────────────── */
export function ShopModal({ onClose }: { onClose: () => void }) {
  useLockBodyScroll(onClose);
  const { progress, spendGems, refillHearts, buyStreakFreeze, toggleSuper } =
    useProgress();
  const gems = progress.gems !== undefined ? progress.gems : 100;
  const hearts = progress.hearts !== undefined ? progress.hearts : 5;
  const isSuper = progress.isSuper || false;
  const hasFreeze = progress.hasStreakFreeze || false;

  return (
    <Overlay onClick={onClose}>
      <ModalBox $maxWidth="520px" onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <ModalTitle>🛍️ Toko JapanApp</ModalTitle>
            <ModalSub style={{ margin: 0 }}>
              Gunakan Permata 💎 untuk membeli perlengkapan & upgrade.
            </ModalSub>
          </div>
          <div
            style={{
              background: "rgba(59, 130, 246, 0.15)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "14px",
              padding: "0.5rem 0.85rem",
              fontWeight: 900,
              color: "#3b82f6",
              fontSize: "1.1rem",
            }}
          >
            💎 {gems}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {/* Item 1: Refill Hearts */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border)",
              borderRadius: "18px",
              padding: "1.15rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div style={{ fontSize: "2.2rem" }}>❤️</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>
                Isi Ulang Nyawa (Penuh 5 ❤️)
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  marginTop: "0.25rem",
                }}
              >
                Kembalikan nyawa kamu ke 5 untuk lanjut belajar tanpa batas.
              </div>
            </div>
            <button
              onClick={() => {
                if (hearts >= 5) return;
                if (spendGems(100)) refillHearts();
              }}
              disabled={hearts >= 5 || gems < 100}
              style={{
                background:
                  hearts >= 5 ? "rgba(255,255,255,0.08)" : "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "0.6rem 1rem",
                fontWeight: 800,
                fontSize: "0.85rem",
                cursor: hearts >= 5 || gems < 100 ? "not-allowed" : "pointer",
                opacity: hearts >= 5 || gems < 100 ? 0.6 : 1,
              }}
            >
              {hearts >= 5 ? <><CheckIcon size={15} style={{ marginRight: "4px" }} /> Penuh</> : "100 💎"}
            </button>
          </div>

          {/* Item 2: Streak Freeze */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border)",
              borderRadius: "18px",
              padding: "1.15rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div style={{ fontSize: "2.2rem" }}>🛡️</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>
                Bekukan Streak (Streak Freeze)
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  marginTop: "0.25rem",
                }}
              >
                Melindungi streak kamu jika kamu lupa atau tidak sempat belajar
                1 hari.
              </div>
            </div>
            <button
              onClick={() => buyStreakFreeze()}
              disabled={hasFreeze || gems < 200}
              style={{
                background: hasFreeze
                  ? "rgba(255,255,255,0.08)"
                  : "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "0.6rem 1rem",
                fontWeight: 800,
                fontSize: "0.85rem",
                cursor: hasFreeze || gems < 200 ? "not-allowed" : "pointer",
                opacity: hasFreeze || gems < 200 ? 0.6 : 1,
              }}
            >
              {hasFreeze ? <><CheckIcon size={15} style={{ marginRight: "4px" }} /> Dimiliki</> : "200 💎"}
            </button>
          </div>

          {/* Item 3: Super Subscription */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(139,92,246,0.15))",
              border: "1.5px solid rgba(236,72,153,0.4)",
              borderRadius: "18px",
              padding: "1.15rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div style={{ fontSize: "2.2rem" }}>👑</div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  color: "#ec4899",
                }}
              >
                Super JapanApp (Premium)
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  marginTop: "0.25rem",
                }}
              >
                Nyawa Tak Terbatas, Bebas Iklan & Latihan Fokus Kesalahan.
              </div>
            </div>
            <button
              onClick={() => toggleSuper()}
              style={{
                background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "0.6rem 1rem",
                fontWeight: 800,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              {isSuper ? "Nonaktifkan" : "Aktifkan"}
            </button>
          </div>
        </div>

        <ActionBtn $variant="secondary" onClick={onClose}>
          Tutup Toko
        </ActionBtn>
      </ModalBox>
    </Overlay>
  );
}

function formatTimer(seconds: number): string {
  if (seconds <= 0) return "00m 00s";
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours > 0) {
    return `${hours}j ${mins.toString().padStart(2, "0")}m`;
  }
  return `${mins.toString().padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`;
}

/* ─── 4. HEARTS MODAL ─────────────────────────────────────────────────────── */
export function HeartsModal({ onClose }: { onClose: () => void }) {
  useLockBodyScroll(onClose);
  const {
    progress,
    refillHearts,
    spendGems,
    timeUntilNextHeart,
    timeUntilFullRefill,
  } = useProgress();
  const hearts = progress.hearts !== undefined ? progress.hearts : 7;
  const isSuper = progress.isSuper || false;
  const gems = progress.gems !== undefined ? progress.gems : 100;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}>❤️</div>
          <ModalTitle style={{ justifyContent: "center" }}>
            {isSuper ? "Nyawa Tak Terbatas! ♾️" : `${hearts} / 7 Nyawa`}
          </ModalTitle>
          <ModalSub style={{ marginBottom: 0 }}>
            {isSuper
              ? "Kamu sedang menggunakan Super JapanApp. Kamu tidak akan pernah kehabisan nyawa saat kuis!"
              : "Nyawa hanya berkurang saat salah di Lesson terstruktur. Seluruh kuis & latihan di Practice Hub bebas dikerjakan sepuasnya!"}
          </ModalSub>
        </div>

        {!isSuper && hearts < 7 && (
          <div
            style={{
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              borderRadius: "16px",
              padding: "0.85rem 1rem",
              marginBottom: "1.25rem",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: "0.85rem", fontWeight: 800, color: "#f59e0b" }}
            >
              ⏱️ Auto-Refill Nyawa Otomatis (3 Jam Penuh)
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                marginTop: "0.3rem",
              }}
            >
              +1 ❤️ berikut dalam:{" "}
              <strong style={{ color: "white" }}>
                {formatTimer(timeUntilNextHeart)}
              </strong>
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                marginTop: "0.2rem",
              }}
            >
              Terisi Penuh (7/7 ❤️) dalam:{" "}
              <strong style={{ color: "#f59e0b" }}>
                {formatTimer(timeUntilFullRefill)}
              </strong>
            </div>
          </div>
        )}

        {!isSuper && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <ActionBtn
              onClick={() => {
                if (hearts >= 7) return;
                if (spendGems(100)) refillHearts();
              }}
              disabled={hearts >= 7 || gems < 100}
            >
              ❤️ Isi Penuh 7 Nyawa (100 💎)
            </ActionBtn>

            <ActionBtn
              as={Link}
              href="/practice"
              $variant="secondary"
              style={{ textDecoration: "none" }}
              onClick={onClose}
            >
              💪 Latihan Bebas di Practice Hub
            </ActionBtn>
          </div>
        )}

        <ActionBtn
          $variant={isSuper ? "primary" : "super"}
          as={Link}
          href="/development"
          style={{ textDecoration: "none" }}
          onClick={onClose}
        >
          👑 Dapatkan Nyawa Tak Terbatas dengan Super
        </ActionBtn>
      </ModalBox>
    </Overlay>
  );
}

/* ─── 5. SUPER MODAL ──────────────────────────────────────────────────────── */
export function SuperModal({ onClose }: { onClose: () => void }) {
  useLockBodyScroll(onClose);
  const { progress, toggleSuper } = useProgress();
  const isSuper = progress.isSuper || false;

  const perks = [
    {
      icon: "❤️",
      title: "Nyawa Tak Terbatas",
      desc: "Jawab kuis tanpa takut kehabisan nyawa.",
    },
    {
      icon: "🚫",
      title: "Bebas Iklan",
      desc: "Fokus belajar tanpa ada gangguan iklan.",
    },
    {
      icon: "🎯",
      title: "Latihan Kesalahan",
      desc: "Review otomatis soal-soal yang pernah kamu salah jawab.",
    },
    {
      icon: "🦊",
      title: "Lencana & Hanko Eksklusif",
      desc: "Dapatkan tampilan avatar & profil bercahaya emas.",
    },
  ];

  return (
    <Overlay onClick={onClose}>
      <ModalBox $maxWidth="500px" onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <span
            style={{
              background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
              color: "white",
              padding: "0.25rem 0.75rem",
              borderRadius: "8px",
              fontSize: "0.75rem",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Super JapanApp
          </span>
          <ModalTitle
            style={{ justifyContent: "center", marginTop: "0.75rem" }}
          >
            Belajar Lebih Cepat Tanpa Batas!
          </ModalTitle>
          <ModalSub>
            Nikmati pengalaman belajar bahasa Jepang paling premium dan seru.
          </ModalSub>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {perks.map((p) => (
            <div
              key={p.title}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border)",
                borderRadius: "18px",
                padding: "1rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.75rem", marginBottom: "0.4rem" }}>
                {p.icon}
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "0.88rem",
                  marginBottom: "0.2rem",
                }}
              >
                {p.title}
              </div>
              <div
                style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
              >
                {p.desc}
              </div>
            </div>
          ))}
        </div>

        <ActionBtn
          $variant="super"
          onClick={() => {
            toggleSuper();
            onClose();
          }}
        >
          {isSuper
            ? "Kembali ke Mode Standar"
            : "⚡ Aktifkan Super JapanApp Gratis"}
        </ActionBtn>
      </ModalBox>
    </Overlay>
  );
}

/* ─── 6. LEADERBOARD / LEAGUE MODAL ───────────────────────────────────────── */
export function LeaderboardModal({ onClose }: { onClose: () => void }) {
  useLockBodyScroll(onClose);
  const { progress } = useProgress();
  const leagueData = progress.league || {
    currentLeagueId: "bronze",
    weekInLeague: 1,
    rank: 1,
    top3Finishes: 0,
    weeklyExp: 0,
  };
  const leagueInfo = getLeagueById(leagueData.currentLeagueId);
  const userExp = leagueData.weeklyExp || 0;
  const userName = progress.profile?.displayName || "JapanApp Learner";
  const userAvatar = progress.profile?.avatar || "🦊";

  // Single user leaderboard (lightweight & clean)
  const rawCompetitors = [
    {
      name: `${userName} (Kamu)`,
      exp: userExp,
      avatar: userAvatar,
      isUser: true,
    },
  ];

  const userRankIndex = 1;
  const rankInfo = getRankStatus(userRankIndex);

  return (
    <Overlay onClick={onClose}>
      <ModalBox $maxWidth="520px" onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.3rem" }}>
            {leagueInfo.icon}
          </div>
          <ModalTitle style={{ justifyContent: "center" }}>
            {leagueInfo.name} ({leagueInfo.englishName})
          </ModalTitle>
          <ModalSub style={{ marginBottom: "0.5rem" }}>
            Musim liga berakhir dalam <b>2 hari 14 jam</b>. 5 teratas akan naik
            ke tingkat berikutnya!
          </ModalSub>
          <div
            style={{
              display: "inline-block",
              background: rankInfo.badgeColor,
              color: rankInfo.color,
              padding: "0.35rem 0.85rem",
              borderRadius: "10px",
              fontWeight: 800,
              fontSize: "0.85rem",
              border: `1px solid ${rankInfo.color}`,
              marginTop: "0.25rem",
            }}
          >
            {rankInfo.label}
          </div>
        </div>

        {/* Competitors List */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          {rawCompetitors.map((c, idx) => {
            const actualRank = idx + 1;
            return (
              <div
                key={actualRank}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "14px",
                  background: c.isUser
                    ? "rgba(var(--primary-rgb), 0.18)"
                    : actualRank <= 5
                      ? "rgba(16, 185, 129, 0.05)"
                      : actualRank >= 9
                        ? "rgba(239, 68, 68, 0.05)"
                        : "rgba(255, 255, 255, 0.03)",
                  border: c.isUser
                    ? "1.5px solid var(--primary)"
                    : actualRank <= 5
                      ? "1px solid rgba(16, 185, 129, 0.2)"
                      : actualRank >= 9
                        ? "1px solid rgba(239, 68, 68, 0.2)"
                        : "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    fontWeight: 900,
                    color:
                      actualRank <= 3 ? "#f59e0b" : "var(--text-secondary)",
                    textAlign: "center",
                  }}
                >
                  #{actualRank}
                </div>
                <div style={{ fontSize: "1.4rem" }}>{c.avatar}</div>
                <div
                  style={{
                    flex: 1,
                    fontWeight: c.isUser ? 900 : 700,
                    fontSize: "0.9rem",
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    color: "var(--primary)",
                    fontSize: "0.88rem",
                  }}
                >
                  {c.exp} EXP
                </div>
              </div>
            );
          })}
        </div>

        <ActionBtn
          as={Link}
          href="/practice"
          style={{ textDecoration: "none" }}
          onClick={onClose}
        >
          ⚡ Pelajari Soal & Naikkan Peringkat
        </ActionBtn>
      </ModalBox>
    </Overlay>
  );
}

const ModalQuestGoBtn = styled(Link)`
  width: 100px;
  height: 36px;
  flex-shrink: 0;
  background: #eab308;
  color: black;
  border-radius: 10px;
  padding: 0 0.5rem;
  font-weight: 900;
  font-size: 0.8rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(234, 179, 8, 0.4);
  transition: all 0.2s ease;
  text-align: center;

  .hover-label {
    display: none;
  }
  .default-label {
    display: inline;
  }

  &:hover {
    background: #3b82f6;
    color: white;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.45);

    .default-label {
      display: none;
    }
    .hover-label {
      display: inline;
      font-weight: 900;
    }
  }
`;

/* ─── 7. ALL QUESTS MODAL ─────────────────────────────────────────────────── */
export function AllQuestsModal({ onClose }: { onClose: () => void }) {
  useLockBodyScroll(onClose);
  const { progress, claimQuestReward } = useProgress();
  const claimedQuests = progress.claimedQuests || [];

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);
  const dailyQuests = useMemo(
    () => getDailyQuests(todayStr, progress),
    [todayStr, progress],
  );

  return (
    <Overlay onClick={onClose}>
      <ModalBox $maxWidth="520px" onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <ModalTitle>🎯 Misi & Lencana Bulanan</ModalTitle>
        <ModalSub>
          Selesaikan misi harian untuk mengumpulkan Permata 💎 dan Lencana
          Pahlawan.
        </ModalSub>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {dailyQuests.map((q: Quest) => {
            const isClaimed = q.isCompleted && claimedQuests.includes(q.id);
            return (
              <div
                key={q.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border)",
                  borderRadius: "18px",
                  padding: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                }}
              >
                <div style={{ fontSize: "1.75rem" }}>{q.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>
                    {q.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                      marginTop: "0.2rem",
                    }}
                  >
                    Progres: {q.current} / {q.target} (Hadiah: +{q.rewardGems}{" "}
                    💎)
                  </div>
                </div>
                {q.isCompleted && !isClaimed ? (
                  <button
                    onClick={() => claimQuestReward(q.id, q.rewardGems)}
                    style={{
                      width: "100px",
                      height: "36px",
                      flexShrink: 0,
                      background: "#eab308",
                      color: "black",
                      border: "none",
                      borderRadius: "10px",
                      padding: "0 0.5rem",
                      fontWeight: 900,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(234,179,8,0.4)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Klaim 🎁
                  </button>
                ) : isClaimed ? (
                  <span
                    style={{
                      width: "100px",
                      flexShrink: 0,
                      textAlign: "center",
                      fontSize: "0.8rem",
                      fontWeight: 800,
                      color: "#10b981",
                    }}
                  >
                    Diklaim <CheckIcon size={14} style={{ marginLeft: "4px" }} />
                  </span>
                ) : (
                  <ModalQuestGoBtn
                    href={q.actionUrl || "/lesson"}
                    onClick={onClose}
                  >
                    <span className="default-label">🎁 +{q.rewardGems} 💎</span>
                    <span className="hover-label">GO 🚀</span>
                  </ModalQuestGoBtn>
                )}
              </div>
            );
          })}
        </div>

        <ActionBtn $variant="secondary" onClick={onClose}>
          Tutup Misi
        </ActionBtn>
      </ModalBox>
    </Overlay>
  );
}
