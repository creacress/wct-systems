import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import CountUp from "@/components/ui/count-up";
import GridPattern from "@/components/ui/grid-pattern";
import { PageBackground } from "@/components/site/page-background";
import Breadcrumbs from "@/components/site/breadcrumbs";
import RelatedServices from "@/components/site/related-services";
import { AIVizWidget } from "@/components/aiviz/AIVizWidget";
import { getTranslations, getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('services');
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: t('aiviz.metadata_title'),
    description: t('aiviz.metadata_description'),
    keywords: t('aiviz.metadata_keywords').split(', '),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/servicos/aiviz" : "/services/aiviz"}`,
      languages: {
        fr: `${siteUrl}/services/aiviz`,
        "pt-PT": `${siteUrl}/pt/servicos/aiviz`,
        "x-default": `${siteUrl}/services/aiviz`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function AIVizPage() {
  const t = await getTranslations('services');

  const FAQ = Array.from({ length: 5 }, (_, i) => ({
    q: t(`aiviz.faq.${i}.q`),
    a: t(`aiviz.faq.${i}.a`),
  }));

  const useCases = Array.from({ length: 6 }, (_, i) => ({
    title: t(`aiviz.use_cases.${i}.title`),
    desc: t(`aiviz.use_cases.${i}.desc`),
  }));

  const includedItems = Array.from({ length: 6 }, (_, i) =>
    t(`aiviz.included_items.${i}`)
  );

  const locale = await getLocale();
  const registerUrl = `https://aiviz.webcresson.com/register?utm_source=wct-systems&utm_medium=product_page&utm_campaign=aiviz_launch`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t('aiviz.breadcrumb_home'), item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: t('aiviz.breadcrumb_services'), item: `${SITE_URL}/services` },
          {
            "@type": "ListItem",
            position: 3,
            name: t('aiviz.breadcrumb_current'),
            item: `${SITE_URL}/services/aiviz`,
          },
        ],
      },
      {
        "@type": "Service",
        name: t('aiviz.jsonld_service_name'),
        description: t('aiviz.jsonld_service_description'),
        provider: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: t('aiviz.jsonld_area_served') },
        url: `${SITE_URL}/services/aiviz`,
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
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

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/50 via-background to-background dark:from-violet-950/20" />
      <GridPattern variant="dot" color="rgba(124, 58, 202, 0.06)" />
      <PageBackground variant="neural" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        <Breadcrumbs items={[
          { label: t('aiviz.breadcrumb_home'), href: "/" },
          { label: t('aiviz.breadcrumb_services'), href: "/services" },
          { label: t('aiviz.breadcrumb_current') },
        ]} />

        {/* HERO */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
                {t('aiviz.hero_badge')}
              </div>
              <div className="inline-flex items-center rounded-full border border-violet-300 bg-violet-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm shadow-violet-500/30">
                {t('aiviz.hero_badge_popular')}
              </div>
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              {t('aiviz.hero_title_line1')}
              <span className="block bg-linear-to-r from-violet-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-purple-400">
                {t('aiviz.hero_title_line2')}
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              {t('aiviz.hero_description')}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                {t('aiviz.hero_cta')}
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById('aiviz-demo');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center rounded-2xl border border-violet-200 bg-violet-50/50 px-6 py-3 text-sm font-medium text-violet-700 transition hover:bg-violet-100 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300 dark:hover:bg-violet-900/50"
              >
                Voir la démo
              </button>
              <div className="text-sm text-muted-foreground">
                {t('aiviz.hero_pricing')}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* USE CASES */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('aiviz.use_cases_title')}</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {useCases.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 60}>
                  <div className="rounded-3xl border bg-gradient-to-br from-violet-50/40 to-indigo-50/20 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/[0.08] dark:bg-gradient-to-br dark:from-violet-500/[0.04] dark:to-indigo-500/[0.02] dark:hover:border-violet-500/20 dark:hover:bg-violet-500/[0.06]">
                    <p className="font-display text-sm font-medium">{item.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* DEMO WIDGET */}
        <ScrollReveal delay={100}>
          <section id="aiviz-demo" className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Essayez AIViz</h2>
            <AIVizWidget variant="score-demo" className="rounded-3xl border bg-gradient-to-br from-violet-50/40 to-indigo-50/20 p-8 dark:border-white/[0.08] dark:from-violet-500/[0.04] dark:to-indigo-500/[0.02]" />
          </section>
        </ScrollReveal>

        {/* WHAT'S INCLUDED */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('aiviz.included_title')}</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {includedItems.map((item, i) => (
                <ScrollReveal key={item} delay={i * 70}>
                  <div className="group rounded-3xl border bg-gradient-to-br from-violet-50/40 to-indigo-50/20 p-6 transition hover:bg-muted dark:border-white/[0.06] dark:from-violet-500/[0.04] dark:to-indigo-500/[0.02] dark:hover:bg-violet-500/[0.06]">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-violet-100 text-sm font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                      {i + 1}
                    </div>
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ROI */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('aiviz.roi_title')}</h2>

            <div className="grid gap-6 md:grid-cols-3">
              <ScrollReveal delay={0}>
                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('aiviz.roi_hypothesis_label')}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t('aiviz.roi_hypothesis')}
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('aiviz.roi_gain_label')}</p>
                  <p className="mt-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
                    <CountUp end={60} suffix={t('aiviz.roi_gain_suffix')} />{t('aiviz.roi_gain_text')}
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('aiviz.roi_impact_label')}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t('aiviz.roi_impact')}
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className="rounded-3xl border bg-gradient-to-br from-violet-50/40 to-indigo-50/20 p-6 dark:border-white/[0.06] dark:from-violet-500/[0.04] dark:to-indigo-500/[0.02]">
              <p className="text-sm font-medium">{t('aiviz.roi_business_title')}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('aiviz.roi_business_desc_prefix')}
                <strong>{t('aiviz.roi_business_bold1')}</strong>
                {t('aiviz.roi_business_mid')}
                <strong>{t('aiviz.roi_business_bold2')}</strong>
                {t('aiviz.roi_business_suffix')}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {t('aiviz.roi_disclaimer')}
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* BEFORE AFTER */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('aiviz.before_after_title')}</h2>

            <div className="grid gap-8 md:grid-cols-2">
              <ScrollReveal delay={0} direction="left">
                <div className="rounded-3xl border p-8 dark:border-white/[0.08]">
                  <p className="text-sm font-medium">{t('aiviz.before_label')}</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {t('aiviz.before_text')}
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100} direction="right">
                <div className="rounded-3xl border bg-gradient-to-br from-violet-50/40 to-indigo-50/20 p-8 dark:border-white/[0.06] dark:from-violet-500/[0.04] dark:to-indigo-500/[0.02]">
                  <p className="text-sm font-medium">{t('aiviz.after_label')}</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {t('aiviz.after_text')}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('aiviz.faq_title')}</h2>

            <div className="space-y-4">
              {FAQ.map((f, i) => (
                <ScrollReveal key={f.q} delay={i * 80}>
                  <details className="group rounded-3xl border bg-background p-6 transition hover:bg-muted dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
                    <summary className="cursor-pointer font-medium">{f.q}</summary>
                    <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* FINAL CTA */}
        <ScrollReveal delay={100}>
          <section className="mt-20">
            <div className="relative overflow-hidden rounded-3xl border bg-linear-to-r from-violet-50 via-indigo-50/60 to-purple-50/30 p-10 text-center shadow-sm dark:border-violet-500/20 dark:from-violet-950/40 dark:via-indigo-950/30 dark:to-purple-950/20 dark:shadow-lg dark:shadow-violet-500/10">
              {/* Decorative orbs */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/15"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/15"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400/10 blur-2xl dark:bg-purple-500/10"
              />

              <div className="relative z-10">
                <h2 className="font-display font-bold text-3xl tracking-tight">{t('aiviz.cta_title')}</h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  {t('aiviz.cta_description')}
                </p>
                <a
                  href={registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition hover:scale-[1.02] hover:bg-violet-700"
                >
                  {t('aiviz.cta_button')}
                </a>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <RelatedServices currentService="aiviz" />

      </div>
    </main>
  );
}
