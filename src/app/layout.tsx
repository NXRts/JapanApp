import type { Metadata } from "next";
import "./globals.css";
import StyledRegistry from "@/app/registry";
import { Navbar } from "@/components/Navbar";
import { BackToHome } from "@/components/BackToHome";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/context/ThemeContext";

// Google Fonts are mocked to avoid build failure in offline environments
const inter = { className: "font-inter" };
const notoSansJP = { variable: "font-noto-sans-jp" };

export const viewport = {
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  shrinkToFit: "no",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://japan-app.vercel.app",
  ),
  title: {
    default: "Japan Learning App | Master Kanji & Kana",
    template: "%s | Japan Learning App",
  },
  description:
    "The most effective way to learn, practice, and memorize Japanese characters (Hiragana, Katakana, and Kanji). Start your journey to fluency today.",
  keywords: [
    "Japanese",
    "Learn Japanese",
    "Kanji",
    "Kana",
    "Hiragana",
    "Katakana",
    "JLPT",
    "Japanese Practice",
    "Flashcards",
  ],
  authors: [{ name: "NXRts" }],
  creator: "NXRts",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Japan Learning App | Master Kanji & Kana",
    description:
      "The most effective way to learn, practice, and memorize Japanese characters. Start your journey to fluency today.",
    siteName: "Japan Learning App",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Japan Learning App - Learn Kanji and Kana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Learning App | Master Kanji & Kana",
    description:
      "The most effective way to learn, practice, and memorize Japanese characters.",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JapanApp",
  },
};

import { ProgressProvider } from "@/context/ProgressContext";
import { DeviceModeProvider } from "@/context/DeviceModeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.className} ${notoSansJP.variable}`}
      >
        <ThemeProvider>
          <DeviceModeProvider>
            <ProgressProvider>
              <StyledRegistry>
                <Navbar />
                <main style={{ flex: 1, position: "relative" }}>
                  {children}
                </main>
                <Footer />
                <ScrollToTop />
              </StyledRegistry>
            </ProgressProvider>
          </DeviceModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
