import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Practice Japanese",
    description: "Test your knowledge with Kana quizzes, and practice checking your memory with Kanji & Vocabulary flashcards.",
};

export default function PracticeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
