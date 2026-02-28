

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "WCT Systems — IA & Automatisation pour PME",
    template: "%s | WCT Systems",
  },
  description:
    "On construit des systèmes IA + automatisation (n8n, dashboards, acquisition) pour PME. Rapide, mesurable, scalable.",
  applicationName: "WCT Systems",
  openGraph: {
    title: "WCT Systems — IA & Automatisation pour PME",
    description:
      "Workflows n8n, IA, dashboards, acquisition. On livre des systèmes qui rapportent, pas juste des pages.",
    url: "/",
    siteName: "WCT Systems",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WCT Systems — IA & Automatisation pour PME",
    description:
      "IA, automatisation, dashboards et acquisition pour PME — stack moderne, résultats mesurables.",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}