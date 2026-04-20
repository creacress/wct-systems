import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { TrackedLink } from "@/components/site/tracked-link";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

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
        "@id": `${SITE_URL}/a-propos#page`,
        name: t("jsonLd.pageName"),
        url: `${SITE_URL}/a-propos`,
        description: t("jsonLd.pageDescription"),
        isPartOf: { "@id": `${SITE_URL}#website` },
        mainEntity: { "@id": `${SITE_URL}#organization` },
        inLanguage: "fr-FR",
      },
      // Enrich canonical Organization (declared on home) with founder + foundingDate.
      // Using @id cross-ref so Google deduplicates to the same entity.
      {
        "@id": `${SITE_URL}#organization`,
        "@type": "Organization",
        name: "WCT Systems",
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo-wct-systems.png`,
        areaServed: { "@type": "Country", name: "France" },
        description: t("jsonLd.orgDescription"),
        foundingDate: "2024",
        foundingLocation: { "@type": "Country", name: "France" },
        founder: { "@id": `${SITE_URL}/a-propos#founder` },
        knowsAbout: ["Automatisation", "RPA", "Chatbots", "CRM", "Prospection", "SEO", "KPI"],
        sameAs: [
          "https://www.linkedin.com/company/100266628/",
          "https://www.facebook.com/people/Webcressontech/61579372888241/",
          "https://github.com/creacress",
          "https://www.linkedin.com/in/alexis-cresson/",
        ],
      },
      // Founder Person — boosts E-E-A-T + knowledge-graph + AI-search citations
      {
        "@type": "Person",
        "@id": `${SITE_URL}/a-propos#founder`,
        name: "Alexis Cresson",
        givenName: "Alexis",
        familyName: "Cresson",
        jobTitle: "Founder",
        worksFor: { "@id": `${SITE_URL}#organization` },
        url: `${SITE_URL}/a-propos`,
        knowsAbout: [
          "Digital Workplace",
          "Automatisation RPA",
          "Intégration IA",
          "Prospection B2B",
          "SEO IA / AEO / GEO",
        ],
        sameAs: [
          "https://www.linkedin.com/in/alexis-cresson/",
          "https://github.com/creacress",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "À propos", item: `${SITE_URL}/a-propos` },
        ],
      },
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
        url: `${SITE_URL}/a-propos`,
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
        {/* HERO */}
        <section>
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
              {t("hero.title")}{" "}
              <span className="font-serif-display italic text-violet-600 dark:text-violet-400">
                {t("hero.titleHighlight")}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              dangerouslySetInnerHTML={{ __html: t.raw("hero.description") as string }}
            />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p
              className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground/85"
              dangerouslySetInnerHTML={{ __html: t.raw("hero.llmParagraph") as string }}
            />
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedLink
                href="/contact"
                trackAs="apropos_hero_audit"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(124,58,237,0.28)] ring-1 ring-violet-500/20 transition-all duration-200 hover:bg-violet-700 hover:shadow-[0_14px_36px_rgba(124,58,237,0.34)] focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-background"
              >
                {t("hero.ctaContact")}
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </TrackedLink>
              <Link
                href="/cas-clients"
                className="inline-flex items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-surface px-6 py-3.5 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:ring-offset-2 focus:ring-offset-background"
              >
                {t("hero.ctaCases")}
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* STORY — 2 bento cards */}
        <section className="mt-20 sm:mt-28 grid gap-4 lg:grid-cols-2" aria-label={t("story.sectionLabel")}>
          <ScrollReveal>
            <div className="bento-card surface-noise h-full p-6 sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                Pourquoi WCT Systems
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]">
                {t("story.whyTitle")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
                {t("story.whyP1")}
              </p>
              <p
                className="mt-3 text-sm leading-relaxed text-foreground/85 sm:text-base"
                dangerouslySetInnerHTML={{ __html: t.raw("story.whyP2") as string }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="bento-card surface-noise h-full p-6 sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                Méthode
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]">
                {t("story.methodTitle")}
              </h2>
              <ol className="mt-5 grid gap-3">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-violet-100 font-mono text-[11px] font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-sm leading-relaxed text-foreground/85 sm:text-base"
                      dangerouslySetInnerHTML={{ __html: t.raw(`story.methodSteps.${i}`) as string }}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>
        </section>

        {/* VALUES — 4 bento cards */}
        <section className="mt-20 sm:mt-28" aria-label={t("values.sectionLabel")}>
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                Nos valeurs
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
                {t("values.title")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("values.subtitle")}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <ScrollReveal key={i} delay={i * 70}>
                <article className="bento-card h-full p-6">
                  <span
                    className="text-xl text-violet-600 dark:text-violet-400"
                    aria-hidden
                  >
                    {t(`values.items.${i}.icon`)}
                  </span>
                  <h3 className="mt-3 font-display text-base font-semibold">
                    {t(`values.items.${i}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`values.items.${i}.desc`)}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="mt-20 sm:mt-28" aria-label={t("whatWeDo.sectionLabel")}>
          <ScrollReveal>
            <div className="bento-card surface-noise relative overflow-hidden p-8 sm:p-10 lg:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-400/15 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl"
              />

              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                Ce qu&apos;on fait
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                {t("whatWeDo.title")}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
                {t("whatWeDo.subtitle")}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 rounded-2xl border border-[var(--border-soft)] bg-surface/70 px-4 py-3 text-sm text-foreground/85 backdrop-blur"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{t(`whatWeDo.items.${i}`)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-surface/80 px-6 py-3 text-sm font-medium backdrop-blur transition hover:bg-surface"
                >
                  {t("whatWeDo.ctaServices")}
                </Link>
                <TrackedLink
                  href="/contact"
                  trackAs="apropos_whatwedo_audit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(124,58,237,0.22)] transition hover:bg-violet-700 hover:shadow-[0_14px_36px_rgba(124,58,237,0.3)]"
                >
                  {t("whatWeDo.ctaAudit")}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </TrackedLink>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* FAQ */}
        <section className="mt-20 sm:mt-28" aria-label={t("faq.sectionLabel")}>
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
              <ScrollReveal key={i} delay={i * 50}>
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
        <section className="mt-20 sm:mt-28" aria-label={t("cta.sectionLabel")}>
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[32px] border border-violet-200/50 bg-gradient-to-br from-violet-50 via-indigo-50/60 to-white p-10 text-center shadow-[var(--shadow-lg)] sm:p-14 dark:border-violet-500/20 dark:from-violet-950/50 dark:via-indigo-950/30 dark:to-background">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-400/15 blur-3xl" />

              <p className="relative text-[11px] font-medium uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
                Passons à l&apos;action
              </p>
              <h2 className="relative mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.05]">
                {t("cta.title")}
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
                {t("cta.subtitle")}
              </p>
              <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <TrackedLink
                  href="/contact"
                  trackAs="apropos_final_audit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 py-3.5 text-sm font-medium text-white shadow-[0_12px_36px_rgba(124,58,237,0.32)] transition-all duration-200 hover:bg-violet-700 hover:shadow-[0_16px_48px_rgba(124,58,237,0.4)]"
                >
                  {t("cta.ctaAudit")}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </TrackedLink>
                <Link
                  href="/cas-clients"
                  className="inline-flex items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-surface/80 px-8 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:bg-surface"
                >
                  {t("cta.ctaResults")}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </main>
  );
}
