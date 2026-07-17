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
    process.env.NEXT_PUBLIC_BASE_URL || "https://japan-mee.vercel.app",
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
        url: "/images/feature-graphic.png",
        width: 1024,
        height: 500,
        alt: "Japan Learning App - Learn Kanji and Kana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Learning App | Master Kanji & Kana",
    description:
      "The most effective way to learn, practice, and memorize Japanese characters.",
    images: ["/images/feature-graphic.png"],
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
import { SakuraBackground } from "@/components/common/SakuraBackground";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { OnboardingOverlay } from "@/components/common/OnboardingOverlay";
import { SplashLoader } from "@/components/common/SplashLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} ${notoSansJP.variable}`}
      >
        {/* Anti-flash script & Early Event Error Suppressor */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{function isEv(err){if(!err)return true;if(typeof Event!=='undefined'&&err instanceof Event)return true;if(Object.prototype.toString.call(err)==='[object Event]')return true;if(err.message==='[object Event]'||String(err).indexOf('[object Event]')!==-1)return true;return false;}window.addEventListener('error',function(e){if(isEv(e.error)||isEv(e)||(e.target&&e.target.tagName)){e.stopImmediatePropagation();e.preventDefault();}},true);window.addEventListener('unhandledrejection',function(e){if(isEv(e.reason)){e.stopImmediatePropagation();e.preventDefault();}},true);var h=sessionStorage.getItem('has-loaded-before');if(h){document.documentElement.classList.add('session-refresh');}else{document.documentElement.classList.add('session-first-open');sessionStorage.setItem('has-loaded-before','true');}var mode=localStorage.getItem('theme-mode')||'dark';var color=localStorage.getItem('theme-color')||'indigo';document.documentElement.classList.add(mode);var themes={indigo:{primary:"#4F46E5",primaryLight:"#818cf8",primaryDark:"#3730a3"},rose:{primary:"#e11d48",primaryLight:"#fb7185",primaryDark:"#9f1239"},emerald:{primary:"#059669",primaryLight:"#34d399",primaryDark:"#065f46"},blue:{primary:"#2563eb",primaryLight:"#60a5fa",primaryDark:"#1e40af"},orange:{primary:"#ea580c",primaryLight:"#fb923c",primaryDark:"#9a3412"}};var theme=themes[color]||themes.indigo;var root=document.documentElement;root.style.setProperty('--primary',theme.primary);root.style.setProperty('--primary-light',theme.primaryLight);root.style.setProperty('--primary-dark',theme.primaryDark);var hex=theme.primary.replace("#","");var r=parseInt(hex.substring(0,2),16);var g=parseInt(hex.substring(2,4),16);var b=parseInt(hex.substring(4,6),16);root.style.setProperty('--primary-rgb',r+','+g+','+b);if(mode==='dark'){root.style.setProperty('--background','#0B1121');root.style.setProperty('--surface','#172133');root.style.setProperty('--foreground','#F8FAFC');root.style.setProperty('--text-secondary','#CBD5E1');root.style.setProperty('--border','rgba(255,255,255,0.1)');root.style.setProperty('--dot-color','rgba(255,255,255,0.05)');}else{root.style.setProperty('--background','#F8FAFC');root.style.setProperty('--surface','#FFFFFF');root.style.setProperty('--foreground','#1E293B');root.style.setProperty('--text-secondary','#64748B');root.style.setProperty('--border','#E2E8F0');root.style.setProperty('--dot-color','#E2E8F0');}}catch(e){}})();`,
          }}
        />
        <ThemeProvider>
          <DeviceModeProvider>
            <ProgressProvider>
              <ErrorBoundary>
                <StyledRegistry>
                  <SplashLoader />
                  <SakuraBackground />
                  <Navbar />
                  <main
                    style={{
                      flex: 1,
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {children}
                  </main>
                  <Footer />
                  <ScrollToTop />
                  <OnboardingOverlay />
                </StyledRegistry>
              </ErrorBoundary>
            </ProgressProvider>
          </DeviceModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
