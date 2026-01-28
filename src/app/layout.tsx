import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import StyledRegistry from "@/app/registry";
import { Navbar } from "@/components/Navbar";
import { BackToHome } from "@/components/BackToHome";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });
const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: '--font-noto-sans-jp'
});

export const metadata: Metadata = {
  title: "Japan Learning App",
  description: "Master Kanji and Kana effectively",
  manifest: "/manifest.json",
  themeColor: "#4F46E5",
  viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JapanApp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.className} ${notoSansJP.variable}`}>
        <ThemeProvider>
          <StyledRegistry>
            <Navbar />
            <main style={{ flex: 1, paddingBottom: '40px' }}>
              <BackToHome />
              {children}
            </main>
            <Footer />
            <ScrollToTop />
          </StyledRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
