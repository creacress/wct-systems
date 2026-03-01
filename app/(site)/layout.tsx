import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CookieBanner } from "@/components/site/cookie-banner";

export const metadata: Metadata = {
  title: {
    default: "WCT Systems — IA & Automatisation pour PME",
    template: "%s | WCT Systems",
  },
  description:
    "On construit des systèmes IA + automatisation (n8n, dashboards, acquisition) pour PME. Rapide, mesurable, scalable.",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}