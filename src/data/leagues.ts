export interface LeagueInfo {
  id: string;
  name: string;
  englishName: string;
  icon: string;
  badgeBg: string;
  color: string;
  borderColor: string;
  description: string;
  tier: number; // 1 to 10
}

export const LEAGUES_DATA: LeagueInfo[] = [
  {
    id: "bronze",
    name: "Liga Perunggu",
    englishName: "Bronze League",
    icon: "🥉",
    badgeBg: "linear-gradient(135deg, #b45309 0%, #78350f 100%)",
    color: "#d97706",
    borderColor: "rgba(217, 119, 6, 0.3)",
    description: "Tingkat awal kompetisi mingguan bagi pembelajar baru.",
    tier: 1,
  },
  {
    id: "silver",
    name: "Liga Perak",
    englishName: "Silver League",
    icon: "🥈",
    badgeBg: "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)",
    color: "#94a3b8",
    borderColor: "rgba(148, 163, 184, 0.3)",
    description: "Tingkat lanjutan 1 untuk pejuang bahasa.",
    tier: 2,
  },
  {
    id: "gold",
    name: "Liga Emas",
    englishName: "Gold League",
    icon: "🥇",
    badgeBg: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)",
    color: "#eab308",
    borderColor: "rgba(234, 179, 8, 0.3)",
    description: "Tingkat lanjutan 2 dengan kompetisi yang makin sengit.",
    tier: 3,
  },
  {
    id: "sapphire",
    name: "Liga Safir",
    englishName: "Sapphire League",
    icon: "🔷",
    badgeBg: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
    color: "#0284c7",
    borderColor: "rgba(2, 132, 199, 0.3)",
    description: "Tingkat menengah bawah dengan kilau Safir.",
    tier: 4,
  },
  {
    id: "ruby",
    name: "Liga Ruby",
    englishName: "Ruby League",
    icon: "🔴",
    badgeBg: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
    color: "#e11d48",
    borderColor: "rgba(225, 29, 72, 0.3)",
    description: "Tingkat menengah penuh semangat membara.",
    tier: 5,
  },
  {
    id: "emerald",
    name: "Liga Zamrud",
    englishName: "Emerald League",
    icon: "💚",
    badgeBg: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    color: "#10b981",
    borderColor: "rgba(16, 185, 129, 0.3)",
    description: "Tingkat menengah atas yang konsisten.",
    tier: 6,
  },
  {
    id: "amethyst",
    name: "Liga Amethyst",
    englishName: "Amethyst League",
    icon: "💜",
    badgeBg: "linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)",
    color: "#a855f7",
    borderColor: "rgba(168, 85, 247, 0.3)",
    description: "Tingkat mahir berhiaskan kristal Amethyst.",
    tier: 7,
  },
  {
    id: "pearl",
    name: "Liga Mutiara",
    englishName: "Pearl League",
    icon: "🦪",
    badgeBg: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    color: "#ec4899",
    borderColor: "rgba(236, 72, 153, 0.3)",
    description: "Tingkat elit sebelum memasuki zona semifinal.",
    tier: 8,
  },
  {
    id: "obsidian",
    name: "Liga Obsidian",
    englishName: "Obsidian League",
    icon: "🛡️",
    badgeBg: "linear-gradient(135deg, #475569 0%, #1e293b 100%)",
    color: "#94a3b8",
    borderColor: "rgba(148, 163, 184, 0.3)",
    description: "Pintu gerbang menuju Liga Berlian kasta tertinggi.",
    tier: 9,
  },
  {
    id: "diamond",
    name: "Liga Berlian",
    englishName: "Diamond League",
    icon: "💎",
    badgeBg: "linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)",
    color: "#06b6d4",
    borderColor: "rgba(6, 182, 212, 0.3)",
    description: "Kasta puncak tertinggi para legenda pemelajar bahasa.",
    tier: 10,
  },
];

export function getLeagueById(id: string): LeagueInfo {
  return LEAGUES_DATA.find((l) => l.id === id) || LEAGUES_DATA[8]; // Default Obsidian
}

export function getRankStatus(rank: number): {
  zone: "promotion" | "safe" | "demotion";
  label: string;
  color: string;
  badgeColor: string;
} {
  if (rank <= 5) {
    return {
      zone: "promotion",
      label: "Kamu di zona promosi!",
      color: "#10b981",
      badgeColor: "rgba(16, 185, 129, 0.15)",
    };
  } else if (rank >= 26) {
    return {
      zone: "demotion",
      label: "Kamu merosot ke zona penurunan!",
      color: "#ef4444",
      badgeColor: "rgba(239, 68, 68, 0.15)",
    };
  } else {
    return {
      zone: "safe",
      label: "Kamu di zona aman!",
      color: "#3b82f6",
      badgeColor: "rgba(59, 130, 246, 0.15)",
    };
  }
}
