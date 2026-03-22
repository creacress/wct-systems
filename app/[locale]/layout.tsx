import type { Metadata } from "next";
import { Suspense } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
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
    "Digital Workplace gamifié + IA + automatisation pour PME. 6 SaaS, un écosystème.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <>
      <NextIntlClientProvider locale={locale}>
        <Navbar />
        <Suspense fallback={null}>
          <UTMCapture />
        </Suspense>
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </NextIntlClientProvider>
    </>
  );
}
