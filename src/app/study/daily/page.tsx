import { Metadata } from "next";
import { DailyDashboard } from "@/features/daily-study/components/DailyDashboard";

export const metadata: Metadata = {
  title: "Hafalan Harian & Interactive Stroke Writer | JapanApp",
  description: "Target hafalan harian fleksibel, jalur Kana & Kanji JLPT, Interactive Stroke Writer, dan Kuis Evaluasi Integratif.",
};

export default function DailyStudyPage() {
  return <DailyDashboard />;
}
