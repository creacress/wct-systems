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
    title: t('digital_workplace.metadata_title'),
    description: t('digital_workplace.metadata_description'),
    keywords: t('digital_workplace.metadata_keywords').split(', '),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/servicos/digital-workplace" : "/services/digital-workplace"}`,
      languages: {
        fr: `${siteUrl}/services/digital-workplace`,
        "pt-PT": `${siteUrl}/pt/servicos/digital-workplace`,
        "x-default": `${siteUrl}/services/digital-workplace`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const STAT_VALUES = [200, 48, 14, 10];

export default async function DigitalWorkplacePage() {
  const t = await getTranslations('services');

  const FAQ = Array.from({ length: 6 }, (_, i) => ({
    q: t(`digital_workplace.faq.${i}.q`),
    a: t(`digital_workplace.faq.${i}.a`),
  }));

  const stats = Array.from({ length: 4 }, (_, i) => ({
    end: STAT_VALUES[i],
    suffix: t(`digital_workplace.stats.${i}.suffix`),
    label: t(`digital_workplace.stats.${i}.label`),
  }));

  const problems = Array.from({ length: 6 }, (_, i) => ({
    title: t(`digital_workplace.problems.${i}.title`),
    desc: t(`digital_workplace.problems.${i}.desc`),
  }));

  const includedItems = Array.from({ length: 10 }, (_, i) =>
    t(`digital_workplace.included_items.${i}`)
  );

  const processSteps = Array.from({ length: 4 }, (_, i) => ({
    step: t(`digital_workplace.process_steps.${i}.step`),
    title: t(`digital_workplace.process_steps.${i}.title`),
    desc: t(`digital_workplace.process_steps.${i}.desc`),
    days: t(`digital_workplace.process_steps.${i}.days`),
  }));

  const roiItems = Array.from({ length: 3 }, (_, i) => ({
    label: t(`digital_workplace.roi_items.${i}.label`),
    value: t(`digital_workplace.roi_items.${i}.value`),
    detail: t(`digital_workplace.roi_items.${i}.detail`),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t('digital_workplace.breadcrumb_home'), item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: t('digital_workplace.breadcrumb_services'), item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: t('digital_workplace.breadcrumb_current'), item: `${SITE_URL}/services/digital-workplace` },
        ],
      },
      {
        "@type": "Service",
        name: t('digital_workplace.jsonld_service_name'),
        description: t('digital_workplace.jsonld_service_description'),
        provider: { "@type": "Organization", name: "WCT Systems", url: SITE_URL },
        areaServed: { "@type": "Country", name: t('digital_workplace.jsonld_area_served') },
        url: `${SITE_URL}/services/digital-workplace`,
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

      {/* Background: Game Office universe — Cyan/Lime with Tron grid */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-50/50 via-background to-background dark:from-cyan-950/20 dark:via-background" />
      <GridPattern variant="line" color="rgba(6, 182, 212, 0.06)" />
      <PageBackground variant="tron" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">

        <Breadcrumbs items={[
          { label: t('digital_workplace.breadcrumb_home'), href: "/" },
          { label: t('digital_workplace.breadcrumb_services'), href: "/services" },
          { label: t('digital_workplace.breadcrumb_current') },
        ]} />

        {/* ── HERO ── */}
        <section className="space-y-8">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/60 bg-cyan-50/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-cyan-700 backdrop-blur dark:border-cyan-800/60 dark:bg-cyan-950/50 dark:text-cyan-300">
              <span className="rounded-full bg-cyan-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                {t('digital_workplace.hero_badge_new')}
              </span>
              {t('digital_workplace.hero_badge_label')}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t('digital_workplace.hero_title_line1')}
              <span className="block bg-gradient-to-r from-cyan-600 via-teal-500 to-lime-500 bg-clip-text text-transparent dark:from-cyan-400 dark:via-teal-400 dark:to-lime-400">
                {t('digital_workplace.hero_title_line2')}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t('digital_workplace.hero_description')}{" "}
              <strong className="text-foreground">{t('digital_workplace.hero_description_bold')}</strong>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <TrackedLink
                href="/contact?service=digital-workplace"
                trackAs="audit_digital_workplace"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:bg-cyan-700 hover:shadow-xl"
              >
                {t('digital_workplace.hero_cta')}
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </TrackedLink>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="font-display font-semibold text-foreground">{t('digital_workplace.hero_price')}&nbsp;&euro;</span> {t('digital_workplace.hero_price_suffix')}
                <span className="h-4 w-px bg-border" />
                {t('digital_workplace.hero_setup')}
                <span className="h-4 w-px bg-border" />
                {t('digital_workplace.hero_delay')}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── STATS ── */}
        <section className="mt-16">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 80}>
                <div className="rounded-2xl border bg-background/70 p-5 text-center shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="font-display text-2xl font-bold tracking-tight text-cyan-600 dark:text-cyan-400">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── LE PROBLÈME ── */}
        <section className="mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{t('digital_workplace.problem_title')}</h2>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 60}>
                <div className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-cyan-500/20">
                  <p className="font-display text-sm font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── CE QUI EST INCLUS ── */}
        <section className="mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{t('digital_workplace.included_title')}</h2>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {includedItems.map((item, i) => (
              <ScrollReveal key={item} delay={i * 50}>
                <div className="group flex items-start gap-3 rounded-2xl border bg-gradient-to-br from-cyan-50/40 to-teal-50/20 p-5 transition-all duration-300 hover:shadow-md dark:border-white/[0.06] dark:from-cyan-500/[0.04] dark:to-teal-500/[0.02] dark:hover:border-cyan-500/20">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-100 font-display text-xs font-bold text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-400">
                    {i + 1}
                  </span>
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── COMMENT ÇA MARCHE ── */}
        <section className="mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{t('digital_workplace.process_title')}</h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 100}>
                <div className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 font-display text-sm font-bold text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-400">
                      {item.step}
                    </span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {item.days}
                    </span>
                  </div>
                  <p className="mt-3 font-display font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── ROI ── */}
        <section className="mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{t('digital_workplace.roi_title')}</h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="grid gap-4 md:grid-cols-3">
              {roiItems.map((x) => (
                <div key={x.label} className="rounded-2xl border bg-background/70 p-5 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{x.label}</p>
                  <p className="mt-2 font-display text-xl font-bold tracking-tight text-cyan-600 dark:text-cyan-400">{x.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{x.detail}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="rounded-3xl border bg-gradient-to-br from-cyan-50/50 to-teal-50/30 p-6 dark:border-white/[0.06] dark:from-cyan-500/[0.06] dark:to-teal-500/[0.03]">
              <p className="font-display text-sm font-semibold">{t('digital_workplace.roi_business_title')}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('digital_workplace.roi_business_desc_prefix')}
                <strong className="text-foreground">{t('digital_workplace.roi_business_bold1')}</strong>
                {t('digital_workplace.roi_business_mid1')}
                <strong className="text-foreground">{t('digital_workplace.roi_business_bold2')}</strong>
                {t('digital_workplace.roi_business_mid2')}
                <strong className="text-foreground">{t('digital_workplace.roi_business_bold3')}</strong>
                {t('digital_workplace.roi_business_suffix')}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {t('digital_workplace.roi_disclaimer')}
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ── BEFORE/AFTER ── */}
        <section className="mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{t('digital_workplace.before_after_title')}</h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            <ScrollReveal delay={0}>
              <div className="rounded-3xl border p-8 dark:border-white/[0.08]">
                <div className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  {t('digital_workplace.before_label')}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t('digital_workplace.before_text')}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="rounded-3xl border bg-gradient-to-br from-cyan-50/50 to-lime-50/30 p-8 dark:border-cyan-500/20 dark:from-cyan-500/[0.06] dark:to-lime-500/[0.03]">
                <div className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                  {t('digital_workplace.after_label')}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t('digital_workplace.after_text')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{t('digital_workplace.faq_title')}</h2>
          </ScrollReveal>

          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 60}>
                <details className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-200 open:shadow-md hover:bg-muted/50 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
                  <summary className="cursor-pointer font-display font-medium">{f.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="mt-24">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-cyan-50 via-teal-50/60 to-lime-50/30 p-10 text-center shadow-sm dark:border-cyan-500/20 dark:from-cyan-950/40 dark:via-teal-950/20 dark:to-lime-950/10 dark:shadow-lg dark:shadow-cyan-500/10">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-lime-400/10 blur-3xl" />

              <h2 className="relative font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {t('digital_workplace.cta_title')}
              </h2>
              <p className="relative mt-4 text-muted-foreground">
                {t('digital_workplace.cta_description')}
              </p>
              <TrackedLink
                href="/contact?service=digital-workplace"
                trackAs="audit_digital_workplace_final"
                className="relative mt-8 inline-flex items-center justify-center rounded-2xl bg-cyan-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.02] hover:bg-cyan-700"
              >
                {t('digital_workplace.cta_button')}
              </TrackedLink>
            </div>
          </ScrollReveal>
        </section>

        <RelatedServices currentService="digital-workplace" />

      </div>
    </main>
  );
}
