import React from "react";
import ReadingDetailFeature from "@/features/reading/ReadingDetailFeature";

export const metadata = {
  title: "Baca Cerita Bahasa Jepang | JapanApp",
  description: "Latihan membaca teks cerita Jepang interaktif dengan furigana dan audio.",
};

export default async function ReadingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ReadingDetailFeature id={id} />;
}
