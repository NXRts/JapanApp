import { Metadata } from "next";
import { KanjiGrid } from "@/components/KanjiGrid/KanjiGrid";

export const metadata: Metadata = {
  title: "Kanji Library",
  description:
    "Browse and study Japanese Kanji from N5 to N1 level. Master readings, meanings, and stroke orders.",
};

export default function KanjiPage() {
  return <KanjiGrid />;
}
