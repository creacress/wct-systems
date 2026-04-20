import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { ContactFormTracker } from "@/components/site/contact-form-tracker";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const SERVICE_VALUES = [
  "digital-workplace",
  "site-web",
  "automatisation",
  "integration-ia",
  "nixie-pulse",
  "pack-starter",
  "pack-business",
  "pack-scale",
  "autre",
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/contacto" : "/contact"}`,
      languages: {
        fr: `${siteUrl}/contact`,
        "pt-PT": `${siteUrl}/pt/contacto`,
        "x-default": `${siteUrl}/contact`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ service?: string }>;
}) {
  const t = await getTranslations("contact");
  const params = (await searchParams) ?? {};
  const preselect = (params.service ?? "").toLowerCase();
  const selected = SERVICE_VALUES.some((s) => s === preselect) ? preselect : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact#page`,
        name: t("jsonLd.contactPageName"),
        url: `${SITE_URL}/contact`,
        description: t("jsonLd.contactPageDescription"),
        isPartOf: { "@id": `${SITE_URL}#website` },
        mainEntity: { "@id": `${SITE_URL}#organization` },
        inLanguage: "fr-FR",
      },
      // Enrich canonical Organization with concrete ContactPoint (email required
      // for a useful ContactPoint). Cross-refs home via @id — Google dedupes.
      {
        "@id": `${SITE_URL}#organization`,
        "@type": "Organization",
        name: "WCT Systems",
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo-wct-systems.png`,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "contact@webcresson.com",
            availableLanguage: ["fr", "pt"],
            areaServed: "FR",
            url: `${SITE_URL}/contact`,
          },
        ],
        areaServed: { "@type": "Country", name: "France" },
        sameAs: [
          "https://www.linkedin.com/company/100266628/",
          "https://www.facebook.com/people/Webcressontech/61579372888241/",
          "https://github.com/creacress",
          "https://www.linkedin.com/in/alexis-cresson/",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
        ],
      },
      {
        "@type": "WebPage",
        url: `${SITE_URL}/contact`,
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

  const inputClass =
    "h-11 rounded-xl border border-[var(--border-strong)] bg-surface px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-violet-500 focus:ring-2 focus:ring-violet-500/25";

  return (
    <main id="content" className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] bg-gradient-to-b from-violet-50/60 via-background to-transparent dark:from-violet-950/25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-8%] -z-10 h-[420px] w-[580px] -translate-x-1/2 rounded-full bg-violet-400/15 blur-[120px] dark:bg-violet-500/10"
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
                {t("hero.titleSub")}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              dangerouslySetInnerHTML={{ __html: t.raw("hero.description") as string }}
            />
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-surface px-6 py-3 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:ring-offset-2 focus:ring-offset-background"
              >
                {t("hero.ctaServices")}
              </Link>
              <Link
                href="/cas-clients"
                className="inline-flex items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-surface px-6 py-3 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:ring-offset-2 focus:ring-offset-background"
              >
                {t("hero.ctaCases")}
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* CONTENT — Form + Sidebar */}
        <section className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <ScrollReveal className="lg:col-span-3">
            <div className="bento-card surface-noise p-6 sm:p-8">
              <header className="mb-7 border-b border-[var(--border-soft)] pb-6">
                <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {t("form.title")}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("form.subtitle")}
                </p>
              </header>

              <form
                action="/api/contact"
                method="post"
                className="grid gap-5"
                aria-label={t("form.ariaLabel")}
              >
                {/* Honeypot anti-spam */}
                <div className="hidden">
                  <label>
                    {t("form.honeypotLabel")}
                    <input name="company_website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t("form.labelName")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className={inputClass}
                      placeholder={t("form.placeholderName")}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t("form.labelEmail")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                      placeholder={t("form.placeholderEmail")}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      {t("form.labelCompany")}{" "}
                      <span className="ml-1 text-xs text-muted-foreground">
                        {t("form.optional")}
                      </span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      autoComplete="organization"
                      className={inputClass}
                      placeholder={t("form.placeholderCompany")}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      {t("form.labelPhone")}{" "}
                      <span className="ml-1 text-xs text-muted-foreground">
                        {t("form.optional")}
                      </span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={inputClass}
                      placeholder={t("form.placeholderPhone")}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="service" className="text-sm font-medium">
                    {t("form.labelSubject")}
                  </label>
                  <select
                    id="service"
                    name="service"
                    defaultValue={selected}
                    className={inputClass}
                  >
                    <option value="">{t("form.placeholderSubject")}</option>
                    {SERVICE_VALUES.map((val) => (
                      <option key={val} value={val}>
                        {t(`services.${val}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t("form.labelMessage")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="min-h-[140px] rounded-xl border border-[var(--border-strong)] bg-surface px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-violet-500 focus:ring-2 focus:ring-violet-500/25"
                    placeholder={t("form.placeholderMessage")}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("form.messageExample")}
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-[var(--border-soft)] bg-muted/60 p-4">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border border-[var(--border-strong)] accent-violet-600 focus:ring-2 focus:ring-violet-500/30"
                  />
                  <label htmlFor="consent" className="text-sm text-muted-foreground">
                    {t("form.consent")}
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 text-sm font-medium text-white shadow-[0_10px_30px_rgba(124,58,237,0.28)] ring-1 ring-violet-500/20 transition-all duration-200 hover:bg-violet-700 hover:shadow-[0_14px_36px_rgba(124,58,237,0.34)] focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-background"
                >
                  {t("form.submit")}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>

                <p className="text-xs text-muted-foreground">
                  {t("form.responseTime")}
                </p>
              </form>
            </div>
          </ScrollReveal>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="grid gap-4">
              <ScrollReveal delay={80}>
                <div className="bento-card surface-noise p-6">
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <p className="font-display text-sm font-semibold">
                      {t("sidebar.whatYouGet")}
                    </p>
                  </div>
                  <ul className="mt-4 grid gap-2 text-sm text-foreground/85">
                    {[0, 1, 2, 3].map((i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5"
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
                        <span>{t(`sidebar.benefits.${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={140}>
                <div className="bento-card p-6">
                  <p className="font-display text-sm font-semibold">
                    {t("sidebar.goFaster")}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("sidebar.goFasterDesc")}
                  </p>
                  <ol className="mt-4 grid gap-2.5">
                    {[1, 2, 3].map((n) => (
                      <li key={n} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-violet-100 font-mono text-[11px] font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                          {n}
                        </span>
                        <span className="text-foreground/85">
                          {t(`sidebar.tip${n}`)}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="bento-card p-6">
                  <p className="font-display text-sm font-semibold">
                    {t("sidebar.alternative")}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("sidebar.alternativeDesc")}
                  </p>
                  <Link
                    href="/services"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border-strong)] bg-surface px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
                  >
                    {t("sidebar.chooseService")}
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </aside>
        </section>
      </div>
      <ContactFormTracker />
    </main>
  );
}
