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
import { contactConfig, getWhatsAppHref } from "@/content/contact-config";
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
  metadataBase: new URL("https://www.khaledbamarouf.com"),
  title: {
    default: "Khalid Bamarouf | AI Automation Engineer & Builder",
    template: "%s | Khalid Bamarouf",
  },
  description:
    "Custom AI apps and automations built around the client's actual workflow, tools, preferences, and current operating problems.",
  openGraph: {
    title: "Khalid Bamarouf | AI Automation Engineer & Builder",
    description:
      "AI automations that solve the problems clients have right now and make daily work run better.",
    url: "https://www.khaledbamarouf.com",
    siteName: "Khalid Bamarouf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khalid Bamarouf | AI Automation Engineer & Builder",
    description:
      "Custom AI apps and automations shaped around real workflows, tools, preferences, and current operating problems.",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ar: "/ar",
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Khalid Bamarouf",
  jobTitle: "AI Automation Engineer & Builder",
  url: "https://www.khaledbamarouf.com",
  email: contactConfig.email.address,
  telephone: contactConfig.whatsapp.display,
  sameAs: ["https://bamaroufstudio.com"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: contactConfig.whatsapp.display,
      url: getWhatsAppHref(),
      email: contactConfig.email.address,
    },
  ],
  knowsAbout: [
    "AI automation",
    "Custom AI apps",
    "AI agents",
    "Workflow automation",
    "Backend engineering",
    "API integration",
    "Cloud infrastructure",
    "Enterprise architecture",
  ],
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
        <Script
          id="kb-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script id="kb-intro-decision" strategy="beforeInteractive">
          {introDecisionScript}
        </Script>
      </body>
    </html>
  );
}
