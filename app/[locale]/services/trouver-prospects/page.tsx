import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import CountUp from "@/components/ui/count-up";
import GridPattern from "@/components/ui/grid-pattern";
import { PageBackground } from "@/components/site/page-background";
import Breadcrumbs from "@/components/site/breadcrumbs";
import RelatedServices from "@/components/site/related-services";
import { TrackedLink } from "@/components/site/tracked-link";
import { getTranslations, getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('services');
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: t('trouver_prospects.metadata_title'),
    description: t('trouver_prospects.metadata_description'),
    keywords: t('trouver_prospects.metadata_keywords').split(', '),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/servicos/prospeccao-ia" : "/services/trouver-prospects"}`,
      languages: {
        fr: `${siteUrl}/services/trouver-prospects`,
        "pt-PT": `${siteUrl}/pt/servicos/prospeccao-ia`,
        "x-default": `${siteUrl}/services/trouver-prospects`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const STAT_VALUES = [40, 200, 5];
const STAT_SUFFIXES_KEYS = [0, 1, 2];

export default async function TrouverProspectsPage() {
  const t = await getTranslations('services');

  const FAQ = Array.from({ length: 3 }, (_, i) => ({
    q: t(`trouver_prospects.faq.${i}.q`),
    a: t(`trouver_prospects.faq.${i}.a`),
  }));

  const stats = [
    { value: 40, suffix: "h", label: t('trouver_prospects.stats.0.label'), desc: t('trouver_prospects.stats.0.desc') },
    { value: 200, suffix: "+", label: t('trouver_prospects.stats.1.label'), desc: t('trouver_prospects.stats.1.desc') },
    { value: 5, suffix: "×", label: t('trouver_prospects.stats.2.label'), desc: t('trouver_prospects.stats.2.desc') },
  ];

  const problems = Array.from({ length: 3 }, (_, i) => ({
    icon: ["⏱", "📋", "🗂"][i],
    title: t(`trouver_prospects.problems.${i}.title`),
    desc: t(`trouver_prospects.problems.${i}.desc`),
  }));

  const solutionSteps = Array.from({ length: 4 }, (_, i) => ({
    step: t(`trouver_prospects.solution_steps.${i}.step`),
    title: t(`trouver_prospects.solution_steps.${i}.title`),
    desc: t(`trouver_prospects.solution_steps.${i}.desc`),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t('trouver_prospects.breadcrumb_home'), item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: t('trouver_prospects.breadcrumb_services'), item: `${SITE_URL}/services` },
          {
            "@type": "ListItem",
            position: 3,
            name: t('trouver_prospects.jsonld_breadcrumb_name'),
            item: `${SITE_URL}/services/trouver-prospects`,
          },
        ],
      },
      {
        "@type": "Service",
        name: t('trouver_prospects.jsonld_service_name'),
        description: t('trouver_prospects.jsonld_service_description'),
        provider: { "@type": "Organization", name: "WCT Systems", url: SITE_URL },
        areaServed: { "@type": "Country", name: t('trouver_prospects.jsonld_area_served') },
        url: `${SITE_URL}/services/trouver-prospects`,
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <main id="content" className="relative overflow-hidden">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background: Radar universe — Emerald/Green */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/50 via-background to-background dark:from-emerald-950/20 dark:via-background" />
      <GridPattern variant="dot" color="rgba(16, 185, 129, 0.06)" />
      <PageBackground variant="radar" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">

        <Breadcrumbs items={[
          { label: t('trouver_prospects.breadcrumb_home'), href: "/" },
          { label: t('trouver_prospects.breadcrumb_services'), href: "/services" },
          { label: t('trouver_prospects.breadcrumb_current') },
        ]} />

        {/* ── HERO ── */}
        <section className="space-y-8">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-emerald-700 backdrop-blur dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              {t('trouver_prospects.hero_badge')}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t('trouver_prospects.hero_title_line1')}
              <span className="block bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-green-400 dark:to-teal-400">
                {t('trouver_prospects.hero_title_line2')}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t('trouver_prospects.hero_description')}{" "}
              <strong className="text-foreground">{t('trouver_prospects.hero_description_bold')}</strong>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <TrackedLink
                href="/contact?service=prospects"
                trackAs="audit_trouver_prospects"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02]"
              >
                {t('trouver_prospects.hero_cta')}
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </TrackedLink>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-500">✓</span> {t('trouver_prospects.hero_check1')}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-500">✓</span> {t('trouver_prospects.hero_check2')}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-500">✓</span> {t('trouver_prospects.hero_check3')}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── STATS ── */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-20">
            <div className="grid gap-px rounded-3xl border border-emerald-100/60 bg-emerald-100/40 overflow-hidden dark:border-emerald-900/40 dark:bg-emerald-900/10 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1 bg-background/70 p-8 text-center backdrop-blur dark:bg-background/40"
                >
                  <p className="font-display text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm font-medium text-foreground">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ── PROBLEM ── */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {t('trouver_prospects.problem_title')}
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {problems.map((item) => (
              <ScrollReveal key={item.title} delay={100}>
                <div className="group h-full rounded-3xl border bg-gradient-to-br from-emerald-50/40 to-green-50/20 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/[0.08] dark:bg-gradient-to-br dark:from-emerald-500/[0.04] dark:to-green-500/[0.02] dark:hover:border-emerald-500/20 dark:hover:bg-emerald-500/[0.06] dark:hover:shadow-lg dark:hover:shadow-emerald-500/5">
                  <div className="mb-4 text-2xl">{item.icon}</div>
                  <p className="font-display mb-2 text-sm font-bold text-foreground">{item.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── SOLUTION (process steps) ── */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {t('trouver_prospects.solution_title')}
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {solutionSteps.map((item) => (
              <ScrollReveal key={item.step} delay={100}>
                <div className="group flex gap-5 rounded-3xl border bg-gradient-to-br from-emerald-50/40 to-green-50/20 p-6 transition hover:shadow-md dark:border-white/[0.06] dark:from-emerald-500/[0.04] dark:to-green-500/[0.02] dark:hover:border-emerald-500/20 dark:hover:shadow-emerald-500/5">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600/10 text-sm font-bold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <p className="font-display mb-1.5 text-sm font-bold text-foreground">{item.title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── ROI ── */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {t('trouver_prospects.roi_title')}
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            <ScrollReveal delay={0}>
              <div className="h-full rounded-3xl border bg-gradient-to-br from-emerald-50/40 to-green-50/20 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:from-emerald-500/[0.04] dark:to-green-500/[0.02]">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">{t('trouver_prospects.roi_hypothesis_label')}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t('trouver_prospects.roi_hypothesis')}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="h-full rounded-3xl border bg-gradient-to-br from-emerald-50/40 to-green-50/20 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:from-emerald-500/[0.04] dark:to-green-500/[0.02]">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">{t('trouver_prospects.roi_gain_label')}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t('trouver_prospects.roi_gain')}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="h-full rounded-3xl border bg-gradient-to-br from-emerald-50/40 to-green-50/20 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:from-emerald-500/[0.04] dark:to-green-500/[0.02]">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">{t('trouver_prospects.roi_impact_label')}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t('trouver_prospects.roi_impact')}
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={100}>
            <div className="rounded-3xl border bg-emerald-50/60 p-6 dark:border-emerald-500/20 dark:bg-emerald-500/[0.05]">
              <p className="font-display text-sm font-bold text-foreground">{t('trouver_prospects.roi_business_title')}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t('trouver_prospects.roi_business_desc_prefix')}
                <strong className="text-emerald-700 dark:text-emerald-400">{t('trouver_prospects.roi_business_bold1')}</strong>
                {t('trouver_prospects.roi_business_mid')}
                <strong className="text-emerald-700 dark:text-emerald-400">{t('trouver_prospects.roi_business_bold2')}</strong>
                {t('trouver_prospects.roi_business_suffix')}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {t('trouver_prospects.roi_disclaimer')}
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ── BEFORE / AFTER ── */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {t('trouver_prospects.before_after_title')}
            </h2>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2">
            <ScrollReveal delay={0}>
              <div className="h-full rounded-3xl border p-8 dark:border-white/[0.08]">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  {t('trouver_prospects.before_label')}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t('trouver_prospects.before_text')}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="h-full rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-green-50/30 p-8 dark:border-emerald-500/20 dark:from-emerald-500/[0.06] dark:to-green-500/[0.03]">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {t('trouver_prospects.after_label')}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t('trouver_prospects.after_text')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {t('trouver_prospects.faq_title')}
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {FAQ.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 80}>
                <details className="group rounded-3xl border bg-background p-6 transition hover:bg-emerald-50/40 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-emerald-500/20 dark:hover:bg-emerald-500/[0.04]">
                  <summary className="cursor-pointer font-display font-bold text-sm text-foreground marker:text-emerald-500">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <ScrollReveal delay={100}>
          <section className="mt-20">
            <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-green-50/60 to-teal-50/30 p-10 text-center shadow-sm dark:border-emerald-500/20 dark:from-emerald-950/40 dark:via-green-950/20 dark:to-teal-950/10 dark:shadow-lg dark:shadow-emerald-500/10">
              {/* Decorative orbs */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-green-400/20 blur-3xl dark:bg-green-500/10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-300/15 blur-2xl dark:bg-teal-500/[0.07]"
              />

              <div className="relative">
                <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {t('trouver_prospects.cta_title')}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t('trouver_prospects.cta_description_line1')}
                  <br className="hidden sm:block" />
                  {t('trouver_prospects.cta_description_line2')}
                </p>
                <TrackedLink
                  href="/contact?service=prospects"
                  trackAs="audit_trouver_prospects_final"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02]"
                >
                  {t('trouver_prospects.cta_button')}
                </TrackedLink>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <RelatedServices currentService="trouver-prospects" />

      </div>
    </main>
  );
}
