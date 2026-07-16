import type { Metadata } from "next";
import Script from "next/script";
import {
  Bodoni_Moda,
  Geist_Mono,
  Noto_Naskh_Arabic,
  Noto_Sans_Arabic,
  Sora,
} from "next/font/google";
import { IntroExperience } from "@/components/intro-experience";
import "./globals.css";

const introDecisionScript = `
(function () {
  try {
    var key = "kb-intro-played";
    var navigation = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
    var isReload = navigation && navigation.type === "reload";
    var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var hasPlayed = window.sessionStorage.getItem(key) === "true";
    document.documentElement.dataset.kbIntro = !prefersReducedMotion && (isReload || !hasPlayed) ? "play" : "skip";
  } catch (error) {
    document.documentElement.dataset.kbIntro = "play";
  }
})();
`;

const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const arabicDisplay = Noto_Naskh_Arabic({
  variable: "--font-arabic-display",
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const arabicSans = Noto_Sans_Arabic({
  variable: "--font-arabic-sans",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Khalid Bamarouf | Systems Architect",
    template: "%s | Khalid Bamarouf",
  },
  description:
    "Systems architecture, backend engineering, automation, AI operating layers, cloud infrastructure, APIs, and integration for serious technical decisions.",
  openGraph: {
    title: "Khalid Bamarouf | Systems Architect",
    description:
      "Complex systems clearly engineered through enterprise architecture, backend platforms, automation, AI, cloud, APIs, and integration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${arabicDisplay.variable} ${arabicSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <IntroExperience />
        {children}
        <Script id="kb-intro-decision" strategy="beforeInteractive">
          {introDecisionScript}
        </Script>
      </body>
    </html>
  );
}
