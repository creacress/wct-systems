import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CookieBanner } from "@/components/site/cookie-banner";
import { UTMCapture } from "@/components/site/utm-capture";

export const metadata: Metadata = {
  title: {
    default: "WCT Systems — Digital Workplace & IA pour PME",
    template: "%s | WCT Systems",
  },
  description:
    "Digital Workplace gamifié + IA + automatisation pour PME. 5 SaaS, un écosystème.",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <UTMCapture />
      </Suspense>
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}