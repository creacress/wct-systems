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
    title: t('automatiser_relances.metadata_title'),
    description: t('automatiser_relances.metadata_description'),
    keywords: t('automatiser_relances.metadata_keywords').split(', '),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/servicos/automatizacao-rpa" : "/services/automatiser-relances"}`,
      languages: {
        fr: `${siteUrl}/services/automatiser-relances`,
        "pt-PT": `${siteUrl}/pt/servicos/automatizacao-rpa`,
        "x-default": `${siteUrl}/services/automatiser-relances`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const STAT_VALUES = [200, 80, 18];

export default async function AutomatiserRelancesPage() {
  const t = await getTranslations('services');

  const FAQ = Array.from({ length: 4 }, (_, i) => ({
    q: t(`automatiser_relances.faq.${i}.q`),
    a: t(`automatiser_relances.faq.${i}.a`),
  }));

  const stats = Array.from({ length: 3 }, (_, i) => ({
    end: STAT_VALUES[i],
    suffix: t(`automatiser_relances.stats.${i}.suffix`),
    label: t(`automatiser_relances.stats.${i}.label`),
  }));

  const problems = Array.from({ length: 3 }, (_, i) =>
    t(`automatiser_relances.problems.${i}`)
  );

  const includedItems = Array.from({ length: 6 }, (_, i) => ({
    title: t(`automatiser_relances.included_items.${i}.title`),
    desc: t(`automatiser_relances.included_items.${i}.desc`),
  }));

  const processSteps = Array.from({ length: 4 }, (_, i) => ({
    step: t(`automatiser_relances.process_steps.${i}.step`),
    title: t(`automatiser_relances.process_steps.${i}.title`),
    desc: t(`automatiser_relances.process_steps.${i}.desc`),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t('automatiser_relances.breadcrumb_home'), item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: t('automatiser_relances.breadcrumb_services'), item: `${SITE_URL}/services` },
          {
            "@type": "ListItem",
            position: 3,
            name: t('automatiser_relances.jsonld_breadcrumb_name'),
            item: `${SITE_URL}/services/automatiser-relances`,
          },
        ],
      },
      {
        "@type": "Service",
        name: t('automatiser_relances.jsonld_service_name'),
        description: t('automatiser_relances.jsonld_service_description'),
        provider: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: t('automatiser_relances.jsonld_area_served') },
        url: `${SITE_URL}/services/automatiser-relances`,
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

      {/* Background gradient — Machine Room amber/orange universe */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-amber-50/50 via-background to-background dark:from-amber-950/20" />
      <GridPattern variant="line" color="rgba(245, 158, 11, 0.05)" />
      <PageBackground variant="circuit" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        <Breadcrumbs items={[
          { label: t('automatiser_relances.breadcrumb_home'), href: "/" },
          { label: t('automatiser_relances.breadcrumb_services'), href: "/services" },
          { label: t('automatiser_relances.breadcrumb_current') },
        ]} />

        {/* HERO */}
        <ScrollReveal delay={0}>
          <section className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs uppercase tracking-wide text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
              {t('automatiser_relances.hero_badge')}
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              {t('automatiser_relances.hero_title_line1')}
              <span className="block bg-linear-to-r from-amber-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-yellow-400">
                {t('automatiser_relances.hero_title_line2')}
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              {t('automatiser_relances.hero_description')}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <TrackedLink
                href="/contact?service=automatisation"
                trackAs="audit_automatiser_relances"
                className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-amber-500/25 transition hover:scale-[1.02] hover:bg-amber-700"
              >
                {t('automatiser_relances.hero_cta')}
              </TrackedLink>
              <div className="text-sm text-muted-foreground">
                {t('automatiser_relances.hero_pricing')}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* STATS ROW */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-20">
            <div className="grid gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border bg-gradient-to-br from-amber-50/40 to-orange-50/20 p-6 text-center shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04] dark:from-amber-500/[0.04] dark:to-orange-500/[0.02]"
                >
                  <p className="text-3xl font-display font-bold text-amber-600 dark:text-amber-400">
                    <CountUp end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* PROBLEM */}
        <ScrollReveal delay={0}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('automatiser_relances.problem_title')}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {problems.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-amber-500/20 dark:hover:bg-white/[0.06]"
                >
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* WHAT'S INCLUDED */}
        <ScrollReveal delay={0}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('automatiser_relances.included_title')}</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {includedItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border bg-gradient-to-br from-amber-50/40 to-orange-50/20 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/[0.08] dark:from-amber-500/[0.04] dark:to-orange-500/[0.02] dark:hover:border-amber-500/20 dark:hover:bg-white/[0.06]"
                >
                  <p className="font-display font-bold text-sm">{item.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ROI */}
        <ScrollReveal delay={0}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('automatiser_relances.roi_title')}</h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('automatiser_relances.roi_hypothesis_label')}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t('automatiser_relances.roi_hypothesis')}
                </p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('automatiser_relances.roi_after_label')}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t('automatiser_relances.roi_after')}
                </p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('automatiser_relances.roi_impact_label')}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t('automatiser_relances.roi_impact')}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border bg-gradient-to-br from-amber-50/40 to-orange-50/20 p-6 dark:border-white/[0.06] dark:from-amber-500/[0.04] dark:to-orange-500/[0.02]">
              <p className="font-display font-bold text-sm">{t('automatiser_relances.roi_business_title')}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('automatiser_relances.roi_business_desc_prefix')}
                <strong>{t('automatiser_relances.roi_business_bold1')}</strong>
                {t('automatiser_relances.roi_business_mid')}
                <strong>{t('automatiser_relances.roi_business_bold2')}</strong>
                {t('automatiser_relances.roi_business_suffix')}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {t('automatiser_relances.roi_disclaimer')}
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* PROCESS STEPS */}
        <ScrollReveal delay={0}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('automatiser_relances.process_title')}</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {processSteps.map((item, i) => (
                <div
                  key={item.step}
                  className="group rounded-3xl border bg-gradient-to-br from-amber-50/40 to-orange-50/20 p-6 transition hover:shadow-md dark:border-white/[0.06] dark:from-amber-500/[0.04] dark:to-orange-500/[0.02] dark:hover:border-amber-500/20"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                      {item.step}
                    </span>
                    <p className="font-display font-bold text-sm">{item.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* BEFORE AFTER */}
        <ScrollReveal delay={0}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('automatiser_relances.before_after_title')}</h2>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-3xl border p-8 dark:border-white/[0.08]">
                <p className="font-display font-bold text-sm">{t('automatiser_relances.before_label')}</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  {t('automatiser_relances.before_text')}
                </p>
              </div>
              <div className="rounded-3xl border bg-gradient-to-br from-amber-50/40 to-orange-50/20 p-8 dark:border-amber-500/[0.15] dark:from-amber-500/[0.04] dark:to-orange-500/[0.02]">
                <p className="font-display font-bold text-sm text-amber-700 dark:text-amber-400">{t('automatiser_relances.after_label')}</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  {t('automatiser_relances.after_text')}
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal delay={0}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('automatiser_relances.faq_title')}</h2>

            <div className="space-y-4">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-3xl border bg-background p-6 transition hover:bg-muted dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-amber-500/20 dark:hover:bg-white/[0.06]"
                >
                  <summary className="cursor-pointer font-medium">{f.q}</summary>
                  <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* FINAL CTA */}
        <ScrollReveal delay={0}>
          <section className="mt-20">
            <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-amber-50 via-orange-50/60 to-yellow-50/30 p-10 text-center shadow-sm dark:border-amber-500/20 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-yellow-950/10 dark:shadow-lg dark:shadow-amber-500/10">
              {/* Decorative orbs */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl dark:bg-amber-500/10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-orange-400/20 blur-3xl dark:bg-orange-500/10"
              />

              <div className="relative">
                <h2 className="font-display font-bold text-3xl tracking-tight">{t('automatiser_relances.cta_title')}</h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  {t('automatiser_relances.cta_description')}
                </p>
                <TrackedLink
                  href="/contact?service=automatisation"
                  trackAs="audit_automatiser_relances_final"
                  className="mt-8 inline-flex items-center justify-center rounded-2xl bg-amber-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-amber-500/25 transition hover:scale-[1.02] hover:bg-amber-700"
                >
                  {t('automatiser_relances.cta_button')}
                </TrackedLink>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <RelatedServices currentService="automatiser-relances" />

      </div>
    </main>
  );
}
