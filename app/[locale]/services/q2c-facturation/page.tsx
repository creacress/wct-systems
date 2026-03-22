import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import CountUp from "@/components/ui/count-up";
import GridPattern from "@/components/ui/grid-pattern";
import Breadcrumbs from "@/components/site/breadcrumbs";
import RelatedServices from "@/components/site/related-services";
import { TrackedLink } from "@/components/site/tracked-link";
import { getTranslations, getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('services');
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: t('q2c_facturation.metadata_title'),
    description: t('q2c_facturation.metadata_description'),
    keywords: t('q2c_facturation.metadata_keywords').split(', '),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/servicos/q2c-faturacao" : "/services/q2c-facturation"}`,
      languages: {
        fr: `${siteUrl}/services/q2c-facturation`,
        "pt-PT": `${siteUrl}/pt/servicos/q2c-faturacao`,
        "x-default": `${siteUrl}/services/q2c-facturation`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// TODO STRIPE — Créer via MCP Stripe tools :
// Product: "Q2C SaaS — Facturation SaaS B2B"
// Price 1: 149€/mois (recurring monthly)
// Price 2: 119€/mois (recurring yearly = 1428€/an)
// Price 3: 490€ (one-time setup)
// Metadata: { service: "q2c-facturation", category: "saas" }

export default async function Q2CFacturationPage() {
  const t = await getTranslations('services');

  const FAQ = Array.from({ length: 6 }, (_, i) => ({
    q: t(`q2c_facturation.faq.${i}.q`),
    a: t(`q2c_facturation.faq.${i}.a`),
  }));

  const problems = Array.from({ length: 3 }, (_, i) => ({
    title: t(`q2c_facturation.problems.${i}.title`),
    desc: t(`q2c_facturation.problems.${i}.desc`),
  }));

  const includedItems = Array.from({ length: 6 }, (_, i) =>
    t(`q2c_facturation.included_items.${i}`)
  );

  const cycleSteps = Array.from({ length: 8 }, (_, i) => ({
    step: t(`q2c_facturation.cycle_steps.${i}.step`),
    label: t(`q2c_facturation.cycle_steps.${i}.label`),
    desc: t(`q2c_facturation.cycle_steps.${i}.desc`),
  }));

  const comparisonRows = Array.from({ length: 6 }, (_, i) => ({
    feature: t(`q2c_facturation.comparison_rows.${i}.feature`),
    q2c: t(`q2c_facturation.comparison_rows.${i}.q2c`),
    chargebee: t(`q2c_facturation.comparison_rows.${i}.chargebee`),
    zuora: t(`q2c_facturation.comparison_rows.${i}.zuora`),
    stripe: t(`q2c_facturation.comparison_rows.${i}.stripe`),
    pennylane: t(`q2c_facturation.comparison_rows.${i}.pennylane`),
  }));

  const plans = Array.from({ length: 3 }, (_, i) => ({
    name: t(`q2c_facturation.plans.${i}.name`),
    price: t(`q2c_facturation.plans.${i}.price`),
    desc: t(`q2c_facturation.plans.${i}.desc`),
    highlighted: i === 1,
    features: t.raw(`q2c_facturation.plans.${i}.features`) as string[],
  }));

  const comparisonHeaders = t.raw('q2c_facturation.comparison_headers') as string[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t('q2c_facturation.breadcrumb_home'), item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: t('q2c_facturation.breadcrumb_services'), item: `${SITE_URL}/services` },
          {
            "@type": "ListItem",
            position: 3,
            name: t('q2c_facturation.breadcrumb_current'),
            item: `${SITE_URL}/services/q2c-facturation`,
          },
        ],
      },
      {
        "@type": "Service",
        name: t('q2c_facturation.jsonld_service_name'),
        description: t('q2c_facturation.jsonld_service_description'),
        provider: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: t('q2c_facturation.jsonld_area_served') },
        url: `${SITE_URL}/services/q2c-facturation`,
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
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-emerald-50/70 via-background to-background dark:from-emerald-950/30" />
      <GridPattern variant="dot" color="rgba(16, 185, 129, 0.06)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        <Breadcrumbs items={[
          { label: t('q2c_facturation.breadcrumb_home'), href: "/" },
          { label: t('q2c_facturation.breadcrumb_services'), href: "/services" },
          { label: t('q2c_facturation.breadcrumb_current') },
        ]} />

        {/* HERO */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs uppercase tracking-wide text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                {t('q2c_facturation.hero_badge')}
              </div>
              <div className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm shadow-emerald-500/30">
                {t('q2c_facturation.hero_badge_new')}
              </div>
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              {t('q2c_facturation.hero_title_line1')}
              <span className="block bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
                {t('q2c_facturation.hero_title_line2')}
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              {t('q2c_facturation.hero_description')}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <TrackedLink
                href="https://app.q2c.webcresson.com"
                trackAs="decouvrir_q2c"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition hover:scale-[1.02] hover:bg-emerald-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('q2c_facturation.hero_cta_discover')}
              </TrackedLink>
              <TrackedLink
                href="/contact?service=q2c-facturation"
                trackAs="audit_q2c"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted dark:border-white/[0.12]"
              >
                {t('q2c_facturation.hero_cta_audit')}
              </TrackedLink>
              <div className="text-sm text-muted-foreground">
                {t('q2c_facturation.hero_pricing')}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* LE PROBLÈME */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('q2c_facturation.problem_title')}</h2>

            <div className="grid gap-6 sm:grid-cols-3">
              {problems.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 60}>
                  <div className="rounded-3xl border bg-gradient-to-br from-red-50/40 to-orange-50/20 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/[0.08] dark:bg-gradient-to-br dark:from-red-500/[0.04] dark:to-orange-500/[0.02] dark:hover:border-red-500/20 dark:hover:bg-red-500/[0.06]">
                    <p className="font-display text-sm font-medium">{item.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* CE QUI EST INCLUS */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('q2c_facturation.included_title')}</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {includedItems.map((item, i) => (
                <ScrollReveal key={item} delay={i * 70}>
                  <div className="group rounded-3xl border bg-gradient-to-br from-emerald-50/40 to-teal-50/20 p-6 transition hover:bg-muted dark:border-white/[0.06] dark:from-emerald-500/[0.04] dark:to-teal-500/[0.02] dark:hover:bg-emerald-500/[0.06]">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                      {i + 1}
                    </div>
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* LE CYCLE COMPLET */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('q2c_facturation.cycle_title')}</h2>
            <p className="text-sm text-muted-foreground">
              {t('q2c_facturation.cycle_description')}
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {cycleSteps.map((s, i) => (
                <ScrollReveal key={s.step} delay={i * 50}>
                  <div className="flex items-start gap-3 rounded-2xl border bg-background/60 p-4 transition-colors hover:bg-muted/50 dark:border-white/[0.06] dark:bg-white/[0.03]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 font-display text-xs font-bold text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                      {s.step}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* COMPARATIF */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('q2c_facturation.comparison_title')}</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 pr-4 font-medium text-muted-foreground">{t('q2c_facturation.comparison_header_feature')}</th>
                    {comparisonHeaders.map((h, i) => (
                      <th key={h} className={`pb-3 px-3 font-medium ${i === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-b">
                      <td className="py-3 pr-4 font-medium">{row.feature}</td>
                      <td className="py-3 px-3 font-medium text-emerald-600 dark:text-emerald-400">{row.q2c}</td>
                      <td className="py-3 px-3 text-muted-foreground">{row.chargebee}</td>
                      <td className="py-3 px-3 text-muted-foreground">{row.zuora}</td>
                      <td className="py-3 px-3 text-muted-foreground">{row.stripe}</td>
                      <td className="py-3 pl-3 text-muted-foreground">{row.pennylane}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </ScrollReveal>

        {/* PRICING */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('q2c_facturation.plans_title')}</h2>

            <div className="grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <ScrollReveal key={plan.name} delay={0}>
                  <div
                    className={`relative flex flex-col rounded-3xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      plan.highlighted
                        ? "border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-teal-50/60 dark:border-emerald-700 dark:from-emerald-950/40 dark:to-teal-950/20"
                        : "border-border/60 bg-background/60 backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]"
                    }`}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-1 text-xs font-medium text-white shadow-sm">
                        {t('q2c_facturation.plan_recommended')}
                      </div>
                    )}
                    <h3 className="font-display text-xl font-semibold tracking-tight">{plan.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight font-mono">
                        {plan.price}{plan.price !== t('q2c_facturation.plans.2.price') && <>&nbsp;&euro;</>}
                      </span>
                      {plan.price !== t('q2c_facturation.plans.2.price') && (
                        <span className="text-sm text-muted-foreground">{t('q2c_facturation.plan_price_suffix')}</span>
                      )}
                    </div>
                    <ul className="mt-5 grow space-y-2.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm">
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Link
                        href={plan.price === t('q2c_facturation.plans.2.price') ? "/contact?service=q2c-facturation" : "https://app.q2c.webcresson.com"}
                        className={`inline-flex w-full items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition ${
                          plan.highlighted
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700"
                            : "border hover:bg-muted"
                        }`}
                        {...(plan.price !== t('q2c_facturation.plans.2.price') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {plan.price === t('q2c_facturation.plans.2.price') ? t('q2c_facturation.plan_cta_contact') : t('q2c_facturation.plan_cta_start')}
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ROI */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('q2c_facturation.roi_title')}</h2>

            <div className="grid gap-6 md:grid-cols-3">
              <ScrollReveal delay={0}>
                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('q2c_facturation.roi_hypothesis_label')}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t('q2c_facturation.roi_hypothesis')}
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('q2c_facturation.roi_without_label')}</p>
                  <p className="mt-2 text-sm font-semibold text-red-600 dark:text-red-400">
                    <CountUp end={7500} prefix="" suffix={t('q2c_facturation.roi_without_suffix')} />{t('q2c_facturation.roi_without_text')}
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('q2c_facturation.roi_with_label')}</p>
                  <p className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    {t('q2c_facturation.roi_with_text')}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('q2c_facturation.faq_title')}</h2>

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
            <div className="relative overflow-hidden rounded-3xl border bg-linear-to-r from-emerald-50 via-teal-50/60 to-green-50/30 p-10 text-center shadow-sm dark:border-emerald-500/20 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-green-950/20 dark:shadow-lg dark:shadow-emerald-500/10">
              {/* Decorative orbs */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/15"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl dark:bg-teal-500/15"
              />

              <div className="relative z-10">
                <h2 className="font-display font-bold text-3xl tracking-tight">{t('q2c_facturation.cta_title')}</h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  {t('q2c_facturation.cta_description')}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <TrackedLink
                    href="https://app.q2c.webcresson.com"
                    trackAs="decouvrir_q2c_final"
                    className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition hover:scale-[1.02] hover:bg-emerald-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('q2c_facturation.cta_discover')}
                  </TrackedLink>
                  <TrackedLink
                    href="/contact?service=q2c-facturation"
                    trackAs="audit_q2c_final"
                    className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted dark:border-white/[0.12]"
                  >
                    {t('q2c_facturation.cta_audit')}
                  </TrackedLink>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <RelatedServices currentService="q2c-facturation" />

      </div>
    </main>
  );
}
