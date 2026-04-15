import "./globals.css";
import type { Metadata } from "next";
import { Sora, DM_Sans, JetBrains_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "WCT Systems — IA, Automatisation & Digital Workplace pour PME",
    template: "%s | WCT Systems",
  },
  description:
    "5 solutions pour PME françaises : Digital Workplace gamifié, Site Web Moderne, Automatisation RPA, Intégration IA et Nixie Pulse. Audit gratuit en 15 minutes.",
  applicationName: "WCT Systems",
  openGraph: {
    title: "WCT Systems — IA, Automatisation & Digital Workplace pour PME",
    description:
      "5 solutions pour PME : Digital Workplace, Site Web Moderne, Automatisation RPA, Intégration IA et Nixie Pulse.",
    url: "/",
    siteName: "WCT Systems",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WCT Systems — IA, Automatisation & Digital Workplace pour PME",
    description:
      "5 solutions pour PME — Digital Workplace, IA, automatisation, dashboard KPI physique, résultats mesurables.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased font-body">
        {children}
      </body>
    </html>
  );
}
