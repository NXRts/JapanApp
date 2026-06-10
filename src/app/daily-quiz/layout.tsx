import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Japanese Quiz",
  description:
    "Challenge yourself with a daily randomized quiz to test your Japanese reading and recognition skills.",
};

export default function DailyQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
