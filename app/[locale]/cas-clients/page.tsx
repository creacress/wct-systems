import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";
import Breadcrumbs from "@/components/site/breadcrumbs";
import { CasesList, type CaseStudy } from "@/components/site/cases-list";
import { getTranslations, getLocale } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const CASE_SERVICES = [
  "prospection-ia",
  "site-web",
  "automatisation",
  "integration-ia",
  "digital-workplace",
  "pack-scale",
  "automatisation",
  "automatisation",
] as const;

const CASE_STACKS = [
  ["Prospection IA", "Enrichissement", "Scoring", "CRM"],
  ["Next.js", "SEO local", "SEO IA", "Conversion"],
  ["Automatisation", "n8n", "Email/SMS", "Dashboard KPI"],
  ["Chatbot IA", "RAG", "WhatsApp", "E-commerce"],
  ["Digital Workplace", "CRM", "Chat", "Gamification"],
  ["Prospection IA", "Next.js", "Automatisation", "Chatbot IA", "Digital Workplace"],
  ["Next.js", "Automatisation (RPA)", "APIs", "UX / Design system"],
  ["SI", "APIs", "Automatisation", "Optimisation Web"],
];

const CASE_IS_PME = [true, true, true, true, true, true, false, false];

const CASE_DELIVERED_COUNTS = [4, 4, 4, 4, 4, 5, 4, 4];
const CASE_RESULTS_COUNTS = [4, 4, 4, 4, 4, 5, 3, 3];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("casClients");
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: t("metadata.keywords").split(", "),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/casos-de-sucesso" : "/cas-clients"}`,
      languages: {
        fr: `${siteUrl}/cas-clients`,
        "pt-PT": `${siteUrl}/pt/casos-de-sucesso`,
        "x-default": `${siteUrl}/cas-clients`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

export default async function CasClientsPage() {
  const t = await getTranslations("casClients");

  const CASES: CaseStudy[] = Array.from({ length: 8 }, (_, i) => ({
    slug: t(`cases.${i}.slug`),
    org: t(`cases.${i}.org`),
    sector: t(`cases.${i}.sector`),
    size: t(`cases.${i}.size`),
    location: t(`cases.${i}.location`),
    service: CASE_SERVICES[i],
    serviceLabel: t(`cases.${i}.serviceLabel`),
    title: t(`cases.${i}.title`),
    context: t(`cases.${i}.context`),
    delivered: Array.from({ length: CASE_DELIVERED_COUNTS[i] }, (_, j) =>
      t(`cases.${i}.delivered.${j}`)
    ),
    results: Array.from({ length: CASE_RESULTS_COUNTS[i] }, (_, j) =>
      t(`cases.${i}.results.${j}`)
    ),
    metrics: Array.from({ length: 3 }, (_, j) => ({
      label: t(`cases.${i}.metrics.${j}.label`),
      value: t(`cases.${i}.metrics.${j}.value`),
    })),
    stack: CASE_STACKS[i],
    isPME: CASE_IS_PME[i],
  }));

  const faqItems = Array.from({ length: 5 }, (_, i) => ({
    q: t(`faq.items.${i}.q`),
    a: t(`faq.items.${i}.a`),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("jsonLd.breadcrumbHome"), item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: t("jsonLd.breadcrumbCasClients"), item: `${SITE_URL}/cas-clients` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: t("jsonLd.collectionName"),
        description: t("jsonLd.collectionDescription"),
        url: `${SITE_URL}/cas-clients`,
        isPartOf: { "@type": "WebSite", name: "WCT Systems", url: SITE_URL },
      },
      {
        "@type": "ItemList",
        name: t("jsonLd.itemListName"),
        numberOfItems: CASES.length,
        itemListElement: CASES.map((c, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: `${c.org} — ${c.title}`,
          url: `${SITE_URL}/cas-clients#${c.slug}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main id="content" className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-slate-50/50 via-background to-background dark:from-slate-950/30" />
      <GridPattern variant="dot" color="rgba(100, 116, 139, 0.06)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        <Breadcrumbs items={[
          { label: t("breadcrumbs.home"), href: "/" },
          { label: t("breadcrumbs.casClients") },
        ]} />

        {/* HERO */}
        <ScrollReveal direction="up">
          <section className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-1 text-xs uppercase tracking-widest text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
              {t("hero.badge")}
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              {t("hero.titleLine1")}
              <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
                {t("hero.titleLine2")}
              </span>
            </h1>

            <p className="max-w-3xl text-lg text-muted-foreground">
              {t("hero.description")}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                {t("hero.ctaPrimary")}
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* CASES LIST (Client Component with filters) */}
        <CasesList cases={CASES} />

        {/* FAQ */}
        <section className="mt-20" aria-label="FAQ">
          <ScrollReveal direction="up">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t("faq.title")}</h2>
          </ScrollReveal>
          <div className="mt-6 space-y-3">
            {faqItems.map((f) => (
              <details
                key={f.q}
                className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-200 open:shadow-md hover:bg-muted/50 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
              >
                <summary className="flex cursor-pointer items-center justify-between font-medium text-sm">
                  {f.q}
                  <span className="ml-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <ScrollReveal direction="up">
          <section className="mt-20 rounded-3xl border border-violet-100/70 bg-linear-to-r from-violet-50/50 to-indigo-50/30 p-10 text-center dark:border-violet-900/20 dark:from-violet-950/25 dark:to-indigo-950/15">
            <h2 className="font-display font-bold text-3xl tracking-tight">{t("cta.title")}</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("cta.description")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                {t("cta.ctaPrimary")}
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted"
              >
                {t("cta.ctaSecondary")}
              </Link>
            </div>
          </section>
        </ScrollReveal>

      </div>
    </main>
  );
}
