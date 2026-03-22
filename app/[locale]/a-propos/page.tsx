import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/sobre-nos" : "/a-propos"}`,
      languages: {
        fr: `${siteUrl}/a-propos`,
        "pt-PT": `${siteUrl}/pt/sobre-nos`,
        "x-default": `${siteUrl}/a-propos`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

export default async function AproposPage() {
  const t = await getTranslations("about");

  const faqItems = [0, 1, 2].map((i) => ({
    q: t(`faq.items.${i}.q`),
    a: t(`faq.items.${i}.a`),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: t("jsonLd.pageName"),
        url: `${SITE_URL}/a-propos`,
        description: t("jsonLd.pageDescription"),
        isPartOf: {
          "@type": "WebSite",
          name: "WCT Systems",
          url: SITE_URL,
        },
      },
      {
        "@type": "Organization",
        name: "WCT Systems",
        url: SITE_URL,
        areaServed: { "@type": "Country", name: "France" },
        description: t("jsonLd.orgDescription"),
        knowsAbout: ["Automatisation", "RPA", "Chatbots", "CRM", "Prospection", "SEO", "KPI"],
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

      {/* Warm background gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-orange-50/30 via-background to-background dark:from-orange-950/10" />
      <GridPattern variant="dot" color="rgba(249, 115, 22, 0.05)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        {/* HERO */}
        <ScrollReveal direction="up">
          <section className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1 text-xs uppercase tracking-wide text-orange-700 dark:border-orange-800/50 dark:bg-orange-950/30 dark:text-orange-400">
              {t("hero.badge")}
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              {t("hero.title")}
              <span className="block bg-linear-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>
            </h1>

            <p
              className="max-w-3xl text-lg text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: t.raw("hero.description") as string }}
            />

            {/* LLM-friendly paragraph */}
            <p
              className="max-w-3xl text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: t.raw("hero.llmParagraph") as string }}
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                {t("hero.ctaContact")}
              </Link>
              <Link
                href="/cas-clients"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                {t("hero.ctaCases")}
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* STORY */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-16 grid gap-6 lg:grid-cols-2" aria-label={t("story.sectionLabel")}>
            <div className="rounded-3xl border border-orange-100/80 bg-linear-to-br from-orange-50/40 to-amber-50/20 p-6 shadow-sm backdrop-blur sm:p-8 dark:border-orange-900/20 dark:from-orange-950/20 dark:to-amber-950/10">
              <h2 className="font-display font-bold text-2xl tracking-tight">{t("story.whyTitle")}</h2>
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                {t("story.whyP1")}
              </p>
              <p
                className="mt-4 text-sm text-muted-foreground sm:text-base"
                dangerouslySetInnerHTML={{ __html: t.raw("story.whyP2") as string }}
              />
            </div>

            <div className="rounded-3xl border border-orange-100/80 bg-linear-to-br from-orange-50/40 to-amber-50/20 p-6 shadow-sm backdrop-blur sm:p-8 dark:border-orange-900/20 dark:from-orange-950/20 dark:to-amber-950/10">
              <h2 className="font-display font-bold text-2xl tracking-tight">{t("story.methodTitle")}</h2>
              <ol className="mt-4 grid gap-3 text-sm text-muted-foreground sm:text-base">
                {[0, 1, 2].map((i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-orange-100/60 bg-background px-4 py-3 dark:border-orange-900/20 dark:bg-white/[0.03]"
                    dangerouslySetInnerHTML={{ __html: t.raw(`story.methodSteps.${i}`) as string }}
                  />
                ))}
              </ol>
            </div>
          </section>
        </ScrollReveal>

        {/* VALUES */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-16" aria-label={t("values.sectionLabel")}>
            <h2 className="font-display font-bold text-2xl tracking-tight">{t("values.title")}</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {t("values.subtitle")}
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <ScrollReveal key={i} direction="up" delay={i * 80}>
                  <div className="group rounded-3xl border border-orange-100/70 bg-linear-to-br from-orange-50/40 to-amber-50/20 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-orange-200/80 dark:border-orange-900/20 dark:from-orange-950/20 dark:to-amber-950/10 dark:hover:border-orange-800/30 dark:hover:shadow-orange-950/20">
                    <div className="mb-3 text-2xl text-orange-400/70 dark:text-orange-600/50">{t(`values.items.${i}.icon`)}</div>
                    <p className="text-sm font-semibold text-foreground">{t(`values.items.${i}.title`)}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{t(`values.items.${i}.desc`)}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* WHAT WE DO */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-16" aria-label={t("whatWeDo.sectionLabel")}>
            <div className="rounded-3xl border border-orange-100/70 bg-linear-to-r from-orange-50/50 to-amber-50/30 p-8 dark:border-orange-900/20 dark:from-orange-950/25 dark:to-amber-950/15">
              <h2 className="font-display font-bold text-2xl tracking-tight">{t("whatWeDo.title")}</h2>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {t("whatWeDo.subtitle")}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-orange-100/60 bg-background px-4 py-3 text-sm text-muted-foreground dark:border-orange-900/15 dark:bg-white/[0.03]"
                  >
                    {t(`whatWeDo.items.${i}`)}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  {t("whatWeDo.ctaServices")}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700"
                >
                  {t("whatWeDo.ctaAudit")}
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-16" aria-label={t("faq.sectionLabel")}>
            <h2 className="font-display font-bold text-2xl tracking-tight">{t("faq.title")}</h2>
            <div className="mt-6 space-y-4">
              {faqItems.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-3xl border border-orange-100/70 bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-200 open:shadow-md hover:bg-orange-50/30 dark:border-orange-900/20 dark:bg-white/[0.03] dark:hover:bg-orange-950/10 dark:hover:border-orange-800/30"
                >
                  <summary className="cursor-pointer font-medium">{f.q}</summary>
                  <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* FINAL CTA */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-20" aria-label={t("cta.sectionLabel")}>
            <div className="rounded-3xl border border-orange-100/70 bg-linear-to-r from-orange-50/50 to-amber-50/30 p-10 text-center shadow-sm dark:border-orange-900/20 dark:from-orange-950/25 dark:to-amber-950/15 dark:shadow-lg dark:shadow-orange-950/10">
              <h2 className="font-display font-bold text-3xl tracking-tight">{t("cta.title")}</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                {t("cta.subtitle")}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
                >
                  {t("cta.ctaAudit")}
                </Link>
                <Link
                  href="/cas-clients"
                  className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  {t("cta.ctaResults")}
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

      </div>
    </main>
  );
}
