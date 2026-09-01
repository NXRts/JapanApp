"use client";

import React, { useState } from "react";
import styled from "styled-components";

const SectionCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);

  @media (max-width: 640px) {
    padding: 1.25rem;
    border-radius: 20px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

const SideTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 850;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CountChip = styled.span`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border);
  font-size: 0.75rem;
  font-weight: 900;
  color: #38bdf8;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 0.35rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 3px;
  border-radius: 12px;
  margin-bottom: 1.25rem;
  border: 1px solid var(--border);
`;

const TabItem = styled.button<{ $active?: boolean }>`
  flex: 1;
  background: ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  color: ${({ $active }) => ($active ? "white" : "var(--text-secondary)")};
  border: none;
  border-radius: 9px;
  padding: 0.35rem 0.2rem;
  font-size: 0.75rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: white;
  }
`;

const BadgeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const BadgeItem = styled.div<{ $status: "active" | "unlocked" | "locked" }>`
  background: ${({ $status }) =>
    $status === "active"
      ? "rgba(13, 148, 136, 0.12)"
      : "rgba(255, 255, 255, 0.02)"};
  border: 1px solid
    ${({ $status }) =>
      $status === "active"
        ? "#0d9488"
        : $status === "unlocked"
        ? "var(--border)"
        : "rgba(255, 255, 255, 0.06)"};
  border-radius: 16px;
  padding: 0.85rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  cursor: pointer;
  transition: all 0.18s ease;
  opacity: ${({ $status }) => ($status === "locked" ? 0.45 : 1)};

  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary-light);
    opacity: 1;
  }
`;

const BadgeIconCircle = styled.div<{ $color?: string; $status: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ $color }) => $color || "rgba(255, 255, 255, 0.08)"};
  border: 2px solid ${({ $status }) => ($status === "active" ? "#2dd4bf" : $status === "unlocked" ? "#f59e0b" : "rgba(255, 255, 255, 0.15)")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const BadgeTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 2px;
`;

const BadgeNameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const BadgeName = styled.span`
  font-size: 0.9rem;
  font-weight: 850;
  color: var(--foreground);
`;

const BadgeStatusTag = styled.span<{ $status: string }>`
  font-size: 0.65rem;
  font-weight: 900;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: ${({ $status }) =>
    $status === "active"
      ? "rgba(13, 148, 136, 0.2)"
      : $status === "unlocked"
      ? "rgba(34, 197, 94, 0.15)"
      : "rgba(255, 255, 255, 0.08)"};
  color: ${({ $status }) =>
    $status === "active"
      ? "#2dd4bf"
      : $status === "unlocked"
      ? "#4ade80"
      : "var(--text-secondary)"};
  border: 1px solid
    ${({ $status }) =>
      $status === "active"
        ? "rgba(13, 148, 136, 0.3)"
        : $status === "unlocked"
        ? "rgba(34, 197, 94, 0.25)"
        : "transparent"};
`;

const BadgeDate = styled.span`
  font-size: 0.76rem;
  color: var(--text-secondary);
  font-weight: 700;
`;

/* New User / Clean Data Empty State Banner */
const EmptyStateBox = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed var(--border);
  border-radius: 16px;
  padding: 1.25rem 1rem;
  text-align: center;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
`;

const EmptyIcon = styled.div`
  font-size: 1.8rem;
  margin-bottom: 0.2rem;
`;

const EmptyTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 850;
  color: var(--foreground);
`;

const EmptySub = styled.p`
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.45;
  margin: 0;
`;

/* Modal Preview */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const ModalBox = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2rem;
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const ModalCloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: var(--foreground);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }
`;

const BigModalBadgeIcon = styled.div<{ $color?: string }>`
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: ${({ $color }) => $color || "#3b82f6"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.2rem;
  margin-bottom: 1.15rem;
  border: 3px solid rgba(255, 255, 255, 0.2);
`;

const ModalBadgeTitle = styled.h2`
  font-size: 1.35rem;
  font-weight: 900;
  color: var(--foreground);
  margin-bottom: 0.35rem;
`;

const ModalBadgeSub = styled.p`
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.4;
`;

const ModalDoneBtn = styled.button`
  width: 100%;
  height: 44px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.92rem;
  font-weight: 850;
  cursor: pointer;

  &:hover {
    filter: brightness(1.08);
  }
`;

export interface BadgeData {
  id: string;
  name: string;
  date: string;
  icon: string;
  color: string;
  status: "active" | "unlocked" | "locked";
  description: string;
}

interface MonthlyBadgesSidebarProps {
  unlockedBadgeIds?: string[];
}

export const MonthlyBadgesSidebar: React.FC<MonthlyBadgesSidebarProps> = ({
  unlockedBadgeIds = [],
}) => {
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");
  const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null);

  // 1. Current Month Badge (Always Active)
  const currentMonthBadge: BadgeData = {
    id: "sep-2026",
    name: "Misi September",
    date: "September 2026",
    icon: "🦊",
    color: "#0f766e",
    status: "active",
    description: "Taklukkan 50 misi harian di bulan September untuk membuka Lencana Kehormatan Kitsune!",
  };

  // 2. All Potential Historical Badges
  const historicalBadges: BadgeData[] = [
    {
      id: "aug-2026",
      name: "Misi Agustus",
      date: "Agustus 2026",
      icon: "🎆",
      color: "rgba(239, 68, 68, 0.2)",
      status: "unlocked",
      description: "Lencana Festival Kembang Api Hanabi Agustus 2026. Berhasil diraih!",
    },
    {
      id: "jul-2026",
      name: "Misi Juli",
      date: "Juli 2026",
      icon: "🎋",
      color: "rgba(16, 185, 129, 0.2)",
      status: "unlocked",
      description: "Lencana Tanabata Wish Juli 2026. Berhasil diraih!",
    },
    {
      id: "jun-2026",
      name: "Misi Juni",
      date: "Juni 2026",
      icon: "🤿",
      color: "rgba(14, 165, 233, 0.2)",
      status: "unlocked",
      description: "Lencana Petualangan Penyelam Juni 2026. Berhasil diraih!",
    },
    {
      id: "may-2026",
      name: "Misi Mei",
      date: "Mei 2026",
      icon: "🎏",
      color: "rgba(236, 72, 153, 0.2)",
      status: "unlocked",
      description: "Lencana Koinobori Mei 2026. Berhasil diraih!",
    },
    {
      id: "apr-2026",
      name: "Misi April",
      date: "April 2026",
      icon: "🌸",
      color: "rgba(244, 114, 182, 0.2)",
      status: "unlocked",
      description: "Lencana Sakura Blossom April 2026. Berhasil diraih!",
    },
  ];

  // 3. Filter past badges to ONLY include those actually unlocked by this user
  const userUnlockedPastBadges = historicalBadges.filter((b) =>
    unlockedBadgeIds.includes(b.id),
  );

  // 4. Combined badges list for this user account
  const userBadges = [currentMonthBadge, ...userUnlockedPastBadges];

  const filteredBadges = userBadges.filter((b) => {
    if (filter === "unlocked") return b.status === "unlocked" || b.status === "active";
    if (filter === "locked") return b.status === "locked";
    return true;
  });

  const hasPastBadges = userUnlockedPastBadges.length > 0;

  return (
    <SectionCard>
      <HeaderRow>
        <SideTitle>
          <span>🏆 Lencana Bulanan</span>
        </SideTitle>
        <CountChip>{hasPastBadges ? `${userUnlockedPastBadges.length + 1}` : "1 AKTIF"}</CountChip>
      </HeaderRow>

      {hasPastBadges && (
        <FilterTabs>
          <TabItem $active={filter === "all"} onClick={() => setFilter("all")}>
            Semua
          </TabItem>
          <TabItem $active={filter === "unlocked"} onClick={() => setFilter("unlocked")}>
            Didapatkan
          </TabItem>
          <TabItem $active={filter === "locked"} onClick={() => setFilter("locked")}>
            Terkunci
          </TabItem>
        </FilterTabs>
      )}

      <BadgeList>
        {filteredBadges.map((b) => (
          <BadgeItem key={b.id} $status={b.status} onClick={() => setSelectedBadge(b)}>
            <BadgeIconCircle $color={b.color} $status={b.status}>
              {b.status === "locked" ? "🔒" : b.icon}
            </BadgeIconCircle>
            <BadgeTextGroup>
              <BadgeNameRow>
                <BadgeName>{b.name}</BadgeName>
                <BadgeStatusTag $status={b.status}>
                  {b.status === "active" ? "Aktif ⚡" : b.status === "unlocked" ? "Didapat ✅" : "Locked 🔒"}
                </BadgeStatusTag>
              </BadgeNameRow>
              <BadgeDate>{b.date}</BadgeDate>
            </BadgeTextGroup>
          </BadgeItem>
        ))}
      </BadgeList>

      {/* Encouraging info banner for new / clean accounts */}
      {!hasPastBadges && (
        <EmptyStateBox>
          <EmptyIcon>✨</EmptyIcon>
          <EmptyTitle>Lencana Pertama Menantimu!</EmptyTitle>
          <EmptySub>
            Selesaikan 50 misi harian di bulan ini untuk mengklaim lencana pertamamu. Lencana bulanan yang berhasil kamu raih akan tersimpan di sini!
          </EmptySub>
        </EmptyStateBox>
      )}

      {/* Preview Modal */}
      {selectedBadge && (
        <ModalOverlay onClick={() => setSelectedBadge(null)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalCloseBtn onClick={() => setSelectedBadge(null)}>✕</ModalCloseBtn>
            <BigModalBadgeIcon $color={selectedBadge.color}>
              {selectedBadge.status === "locked" ? "🔒" : selectedBadge.icon}
            </BigModalBadgeIcon>
            <ModalBadgeTitle>{selectedBadge.name}</ModalBadgeTitle>
            <ModalBadgeSub>{selectedBadge.description}</ModalBadgeSub>
            <ModalDoneBtn onClick={() => setSelectedBadge(null)}>Tutup</ModalDoneBtn>
          </ModalBox>
        </ModalOverlay>
      )}
    </SectionCard>
  );
};
