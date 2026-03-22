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
    title: t('integration_ia.metadata_title'),
    description: t('integration_ia.metadata_description'),
    keywords: t('integration_ia.metadata_keywords').split(', '),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/servicos/integracao-ia" : "/services/integration-ia"}`,
      languages: {
        fr: `${siteUrl}/services/integration-ia`,
        "pt-PT": `${siteUrl}/pt/servicos/integracao-ia`,
        "x-default": `${siteUrl}/services/integration-ia`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function IntegrationIaPage() {
  const t = await getTranslations('services');

  const FAQ = Array.from({ length: 4 }, (_, i) => ({
    q: t(`integration_ia.faq.${i}.q`),
    a: t(`integration_ia.faq.${i}.a`),
  }));

  const useCases = Array.from({ length: 6 }, (_, i) => ({
    title: t(`integration_ia.use_cases.${i}.title`),
    desc: t(`integration_ia.use_cases.${i}.desc`),
  }));

  const includedItems = Array.from({ length: 6 }, (_, i) =>
    t(`integration_ia.included_items.${i}`)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t('integration_ia.breadcrumb_home'), item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: t('integration_ia.breadcrumb_services'), item: `${SITE_URL}/services` },
          {
            "@type": "ListItem",
            position: 3,
            name: t('integration_ia.breadcrumb_current'),
            item: `${SITE_URL}/services/integration-ia`,
          },
        ],
      },
      {
        "@type": "Service",
        name: t('integration_ia.jsonld_service_name'),
        description: t('integration_ia.jsonld_service_description'),
        provider: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: t('integration_ia.jsonld_area_served') },
        url: `${SITE_URL}/services/integration-ia`,
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
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-fuchsia-50/50 via-background to-background dark:from-fuchsia-950/20" />
      <GridPattern variant="dot" color="rgba(217, 70, 239, 0.06)" />
      <PageBackground variant="neural" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        <Breadcrumbs items={[
          { label: t('integration_ia.breadcrumb_home'), href: "/" },
          { label: t('integration_ia.breadcrumb_services'), href: "/services" },
          { label: t('integration_ia.breadcrumb_current') },
        ]} />

        {/* HERO */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-fuchsia-200 bg-fuchsia-50 px-4 py-1 text-xs uppercase tracking-wide text-fuchsia-700 dark:border-fuchsia-800 dark:bg-fuchsia-950/50 dark:text-fuchsia-300">
                {t('integration_ia.hero_badge')}
              </div>
              <div className="inline-flex items-center rounded-full border border-fuchsia-300 bg-fuchsia-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm shadow-fuchsia-500/30">
                {t('integration_ia.hero_badge_popular')}
              </div>
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              {t('integration_ia.hero_title_line1')}
              <span className="block bg-linear-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent dark:from-fuchsia-400 dark:via-purple-400 dark:to-pink-400">
                {t('integration_ia.hero_title_line2')}
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              {t('integration_ia.hero_description')}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <TrackedLink
                href="/contact?service=integration-ia"
                trackAs="audit_integration_ia"
                className="inline-flex items-center justify-center rounded-2xl bg-fuchsia-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/25 transition hover:scale-[1.02] hover:bg-fuchsia-700"
              >
                {t('integration_ia.hero_cta')}
              </TrackedLink>
              <div className="text-sm text-muted-foreground">
                {t('integration_ia.hero_pricing')}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* USE CASES */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('integration_ia.use_cases_title')}</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {useCases.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 60}>
                  <div className="rounded-3xl border bg-gradient-to-br from-fuchsia-50/40 to-purple-50/20 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/[0.08] dark:bg-gradient-to-br dark:from-fuchsia-500/[0.04] dark:to-purple-500/[0.02] dark:hover:border-fuchsia-500/20 dark:hover:bg-fuchsia-500/[0.06]">
                    <p className="font-display text-sm font-medium">{item.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* WHAT'S INCLUDED */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('integration_ia.included_title')}</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {includedItems.map((item, i) => (
                <ScrollReveal key={item} delay={i * 70}>
                  <div className="group rounded-3xl border bg-gradient-to-br from-fuchsia-50/40 to-purple-50/20 p-6 transition hover:bg-muted dark:border-white/[0.06] dark:from-fuchsia-500/[0.04] dark:to-purple-500/[0.02] dark:hover:bg-fuchsia-500/[0.06]">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-100 text-sm font-semibold text-fuchsia-700 dark:bg-fuchsia-950/50 dark:text-fuchsia-300">
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
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('integration_ia.roi_title')}</h2>

            <div className="grid gap-6 md:grid-cols-3">
              <ScrollReveal delay={0}>
                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('integration_ia.roi_hypothesis_label')}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t('integration_ia.roi_hypothesis')}
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('integration_ia.roi_gain_label')}</p>
                  <p className="mt-2 text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400">
                    <CountUp end={60} suffix={t('integration_ia.roi_gain_suffix')} />{t('integration_ia.roi_gain_text')}
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('integration_ia.roi_impact_label')}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t('integration_ia.roi_impact')}
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className="rounded-3xl border bg-gradient-to-br from-fuchsia-50/40 to-purple-50/20 p-6 dark:border-white/[0.06] dark:from-fuchsia-500/[0.04] dark:to-purple-500/[0.02]">
              <p className="text-sm font-medium">{t('integration_ia.roi_business_title')}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('integration_ia.roi_business_desc_prefix')}
                <strong>{t('integration_ia.roi_business_bold1')}</strong>
                {t('integration_ia.roi_business_mid')}
                <strong>{t('integration_ia.roi_business_bold2')}</strong>
                {t('integration_ia.roi_business_suffix')}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {t('integration_ia.roi_disclaimer')}
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* BEFORE AFTER */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('integration_ia.before_after_title')}</h2>

            <div className="grid gap-8 md:grid-cols-2">
              <ScrollReveal delay={0} direction="left">
                <div className="rounded-3xl border p-8 dark:border-white/[0.08]">
                  <p className="text-sm font-medium">{t('integration_ia.before_label')}</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {t('integration_ia.before_text')}
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100} direction="right">
                <div className="rounded-3xl border bg-gradient-to-br from-fuchsia-50/40 to-purple-50/20 p-8 dark:border-white/[0.06] dark:from-fuchsia-500/[0.04] dark:to-purple-500/[0.02]">
                  <p className="text-sm font-medium">{t('integration_ia.after_label')}</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {t('integration_ia.after_text')}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('integration_ia.faq_title')}</h2>

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
            <div className="relative overflow-hidden rounded-3xl border bg-linear-to-r from-fuchsia-50 via-purple-50/60 to-pink-50/30 p-10 text-center shadow-sm dark:border-fuchsia-500/20 dark:from-fuchsia-950/40 dark:via-purple-950/30 dark:to-pink-950/20 dark:shadow-lg dark:shadow-fuchsia-500/10">
              {/* Decorative orbs */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-500/15"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl dark:bg-purple-500/15"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/10 blur-2xl dark:bg-pink-500/10"
              />

              <div className="relative z-10">
                <h2 className="font-display font-bold text-3xl tracking-tight">{t('integration_ia.cta_title')}</h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  {t('integration_ia.cta_description')}
                </p>
                <TrackedLink
                  href="/contact?service=integration-ia"
                  trackAs="audit_integration_ia_final"
                  className="mt-8 inline-flex items-center justify-center rounded-2xl bg-fuchsia-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/25 transition hover:scale-[1.02] hover:bg-fuchsia-700"
                >
                  {t('integration_ia.cta_button')}
                </TrackedLink>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <RelatedServices currentService="integration-ia" />

      </div>
    </main>
  );
}
