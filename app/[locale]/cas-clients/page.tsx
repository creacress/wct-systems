import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { TrackedLink } from "@/components/site/tracked-link";
import Breadcrumbs from "@/components/site/breadcrumbs";
import { CasesList, type CaseStudy } from "@/components/site/cases-list";
import { getTranslations, getLocale } from "next-intl/server";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const CASE_SERVICES = [
  "site-web",
  "automatisation",
  "integration-ia",
  "digital-workplace",
  "automatisation",
  "automatisation",
] as const;

const CASE_STACKS = [
  ["Next.js", "SEO local", "SEO IA", "Conversion"],
  ["Automatisation", "n8n", "Email/SMS", "Dashboard KPI"],
  ["Chatbot IA", "RAG", "WhatsApp", "E-commerce"],
  ["Digital Workplace", "CRM", "Chat", "Gamification"],
  ["Next.js", "Automatisation (RPA)", "APIs", "UX / Design system"],
  ["SI", "APIs", "Automatisation", "Optimisation Web"],
];

const CASE_IS_PME = [true, true, true, true, false, false];

const CASE_DELIVERED_COUNTS = [4, 4, 4, 4, 4, 4];
const CASE_RESULTS_COUNTS = [4, 4, 4, 4, 3, 3];

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

  const CASES: CaseStudy[] = Array.from({ length: 6 }, (_, i) => ({
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

  // Map each case-study service key → canonical service URL
  const SERVICE_URL_MAP: Record<string, string> = {
    "site-web": `${SITE_URL}/services/site-web-moderne`,
    "automatisation": `${SITE_URL}/services/automatiser-relances`,
    "integration-ia": `${SITE_URL}/services/integration-ia`,
    "digital-workplace": `${SITE_URL}/services/digital-workplace`,
  };

  // Article nodes — each case study as first-class CreativeWork
  // Boosts E-E-A-T + AI-search citation likelihood (Perplexity, ChatGPT)
  const caseArticles = CASES.map((c, idx) => ({
    "@type": "Article",
    "@id": `${SITE_URL}/cas-clients#${c.slug}`,
    headline: `${c.org} — ${c.title}`,
    description: c.context,
    author: { "@id": `${SITE_URL}#organization` },
    publisher: { "@id": `${SITE_URL}#organization` },
    datePublished: "2026-01-15",
    dateModified: "2026-04-20",
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${SITE_URL}/cas-clients#collection` },
    mainEntityOfPage: `${SITE_URL}/cas-clients#${c.slug}`,
    url: `${SITE_URL}/cas-clients#${c.slug}`,
    about: {
      "@type": "Service",
      name: c.serviceLabel,
      url: SERVICE_URL_MAP[c.service] ?? `${SITE_URL}/services`,
    },
    mentions: c.stack.map((name) => ({ "@type": "Thing", name })),
    articleSection: c.sector,
    position: idx + 1,
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
        "@id": `${SITE_URL}/cas-clients#collection`,
        name: t("jsonLd.collectionName"),
        description: t("jsonLd.collectionDescription"),
        url: `${SITE_URL}/cas-clients`,
        isPartOf: { "@id": `${SITE_URL}#website` },
        inLanguage: "fr-FR",
        hasPart: caseArticles.map((a) => ({ "@id": a["@id"] })),
      },
      ...caseArticles,
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "WebPage",
        url: `${SITE_URL}/cas-clients`,
        name: t("metadata.title"),
        isPartOf: { "@id": `${SITE_URL}#website` },
        inLanguage: "fr-FR",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "[data-speakable]"],
        },
      },
    ],
  };

  return (
    <main id="content" className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-gradient-to-b from-violet-50/60 via-background to-transparent dark:from-violet-950/25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-8%] -z-10 h-[440px] w-[620px] -translate-x-1/2 rounded-full bg-violet-400/15 blur-[120px] dark:bg-violet-500/10"
      />

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20 lg:py-24">
        <Breadcrumbs
          items={[
            { label: t("breadcrumbs.home"), href: "/" },
            { label: t("breadcrumbs.casClients") },
          ]}
        />

        {/* HERO */}
        <section className="mt-4">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-white/70 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-violet-700 shadow-sm backdrop-blur dark:border-violet-800/40 dark:bg-white/5 dark:text-violet-300">
              {t("hero.badge")}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1
              data-speakable
              className="mt-6 text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
            >
              {t("hero.titleLine1")}{" "}
              <span className="font-serif-display italic text-violet-600 dark:text-violet-400">
                {t("hero.titleLine2")}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("hero.description")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedLink
                href="/contact"
                trackAs="cas_clients_hero_audit"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(124,58,237,0.28)] ring-1 ring-violet-500/20 transition-all duration-200 hover:bg-violet-700 hover:shadow-[0_14px_36px_rgba(124,58,237,0.34)] focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-background"
              >
                {t("hero.ctaPrimary")}
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </TrackedLink>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-surface px-6 py-3.5 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:ring-offset-2 focus:ring-offset-background"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* CASES LIST (Client Component with filters) */}
        <CasesList cases={CASES} />

        {/* FAQ */}
        <section className="mt-20 sm:mt-28" aria-label="FAQ">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
                {t("faq.title")}
              </h2>
            </div>
          </ScrollReveal>
          <div className="mt-8 space-y-3">
            {faqItems.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 50}>
                <details className="group bento-card overflow-hidden p-0 transition-all open:shadow-[var(--shadow-md)]" data-speakable>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-display text-base font-medium">
                    <span className="flex-1">{f.q}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--border-strong)] bg-surface transition-transform duration-200 group-open:rotate-45">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
                      </svg>
                    </span>
                  </summary>
                  <div className="border-t border-[var(--border-soft)] px-6 py-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-20 sm:mt-28" aria-label="Appel à l'action">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[32px] border border-violet-200/50 bg-gradient-to-br from-violet-50 via-indigo-50/60 to-white p-10 text-center shadow-[var(--shadow-lg)] sm:p-14 dark:border-violet-500/20 dark:from-violet-950/50 dark:via-indigo-950/30 dark:to-background">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-400/15 blur-3xl" />

              <p className="relative text-[11px] font-medium uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
                À votre tour
              </p>
              <h2 className="relative mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.05]">
                {t("cta.title")}
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
                {t("cta.description")}
              </p>
              <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <TrackedLink
                  href="/contact"
                  trackAs="cas_clients_final_audit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 py-3.5 text-sm font-medium text-white shadow-[0_12px_36px_rgba(124,58,237,0.32)] transition-all duration-200 hover:bg-violet-700 hover:shadow-[0_16px_48px_rgba(124,58,237,0.4)]"
                >
                  {t("cta.ctaPrimary")}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </TrackedLink>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-surface/80 px-8 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:bg-surface"
                >
                  {t("cta.ctaSecondary")}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </main>
  );
}
