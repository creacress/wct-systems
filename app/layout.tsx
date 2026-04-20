import "./globals.css";
import type { Metadata } from "next";
import { Sora, DM_Sans, JetBrains_Mono, Instrument_Serif } from "next/font/google";
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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "WCT Systems — IA, Automatisation & Digital Workplace pour PME",
    template: "%s | WCT Systems",
  },
  description:
    "6 solutions pour PME françaises : Digital Workplace gamifié, Site Web Moderne, Automatisation RPA, Intégration IA, Nixie Pulse et AIViz. Audit gratuit en 15 minutes.",
  applicationName: "WCT Systems",
  openGraph: {
    title: "WCT Systems — IA, Automatisation & Digital Workplace pour PME",
    description:
      "6 solutions pour PME : Digital Workplace, Site Web Moderne, Automatisation RPA, Intégration IA, Nixie Pulse et AIViz.",
    url: "/",
    siteName: "WCT Systems",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WCT Systems — IA, Automatisation & Digital Workplace pour PME",
    description:
      "6 solutions pour PME — Digital Workplace, Site Web Moderne, IA, automatisation, Nixie Pulse et AIViz.",
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
    <html lang={locale} suppressHydrationWarning className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}>
      <head>
        {/* Preconnect — fonts served via next/font but help establish GTM early-connect without loading it */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Preload LCP-critical above-the-fold logo (navbar, every page) */}
        <link
          rel="preload"
          as="image"
          href="/images/logo-wct-systems-80.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased font-body">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5SG8GNR8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
