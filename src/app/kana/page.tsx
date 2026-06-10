import { Metadata } from "next";
import { KanaGrid } from "@/components/Grid/KanaGrid";

export const metadata: Metadata = {
  title: "Kana (Hiragana & Katakana)",
  description:
    "Learn and practice all Japanese Hiragana and Katakana characters.",
};

export default function KanaPage() {
  return <KanaGrid />;
}
