import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import CountUp from "@/components/ui/count-up";
import GridPattern from "@/components/ui/grid-pattern";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/blog-card";
import { TrackedLink } from "@/components/site/tracked-link";
import { getTranslations, getLocale } from "next-intl/server";

const SITE = {
  name: "WCT Systems",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  sameAs: [] as string[],
};

const SERVICE_STYLES = [
  {
    href: "/services/digital-workplace",
    price: "199",
    color: "cyan",
    gradient: "from-cyan-500/10 to-teal-500/5",
    borderHover: "hover:border-cyan-400/40 dark:hover:border-cyan-500/30",
    hasBadge: true,
    badgeColor: "bg-cyan-600",
  },
  {
    href: "/services/trouver-prospects",
    price: "99",
    color: "emerald",
    gradient: "from-emerald-500/10 to-green-500/5",
    borderHover: "hover:border-emerald-400/40 dark:hover:border-emerald-500/30",
    hasBadge: false,
  },
  {
    href: "/services/site-web-moderne",
    price: "99",
    color: "sky",
    gradient: "from-sky-500/10 to-indigo-500/5",
    borderHover: "hover:border-sky-400/40 dark:hover:border-sky-500/30",
    hasBadge: false,
  },
  {
    href: "/services/automatiser-relances",
    price: "149",
    color: "amber",
    gradient: "from-amber-500/10 to-orange-500/5",
    borderHover: "hover:border-amber-400/40 dark:hover:border-amber-500/30",
    hasBadge: false,
  },
  {
    href: "/services/integration-ia",
    price: "199",
    color: "fuchsia",
    gradient: "from-fuchsia-500/10 to-purple-500/5",
    borderHover: "hover:border-fuchsia-400/40 dark:hover:border-fuchsia-500/30",
    hasBadge: true,
    badgeColor: "bg-fuchsia-600",
  },
  {
    href: "/services/q2c-facturation",
    price: "149",
    color: "emerald",
    gradient: "from-emerald-500/10 to-teal-500/5",
    borderHover: "hover:border-emerald-400/40 dark:hover:border-emerald-500/30",
    hasBadge: true,
    badgeColor: "bg-cyan-600",
  },
] as const;

const STAT_ENDS = [6, 14, 200] as const;
const WHY_ENDS = [73, 6, 40] as const;
const PROCESS_STEP_NUMS = ["01", "02", "03", "04"] as const;
const PROCESS_MAIN_NUMS = ["01", "02", "03"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: t("metadata.keywords").split(", "),
    alternates: {
      canonical: locale === "pt" ? `${siteUrl}/pt` : siteUrl,
      languages: {
        fr: siteUrl,
        "pt-PT": `${siteUrl}/pt`,
        "x-default": siteUrl,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

export default async function HomePage() {
  const t = await getTranslations("home");

  const faqItems = [0, 1, 2, 3, 4].map((i) => ({
    q: t(`faq.items.${i}.q`),
    a: t(`faq.items.${i}.a`),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
        description: t("site.orgDescription"),
        sameAs: SITE.sameAs,
      },
      {
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.url,
        description: t("site.webDescription"),
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE.url}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
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
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background: Command Center universe */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/60 via-background to-background dark:from-violet-950/20 dark:via-background" />
      <GridPattern variant="dot" color="rgba(139, 92, 246, 0.06)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {/* ── HERO ── */}
        <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-violet-50/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-violet-700 backdrop-blur dark:border-violet-800/60 dark:bg-violet-950/50 dark:text-violet-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-600" />
                </span>
                {t("hero.badge")}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {t("hero.titleLine1")}
                <span className="block bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-cyan-400">
                  {t("hero.titleLine2")}
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p
                className="max-w-xl text-lg leading-relaxed text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: t.raw("hero.description") }}
              />
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/services/digital-workplace"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-500/30"
                >
                  {t("hero.ctaPrimary")}
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted dark:border-white/[0.12]"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Stats + mini process */}
          <ScrollReveal delay={200} direction="right">
            <div className="space-y-4">
              {/* Stat counters row */}
              <div className="grid grid-cols-3 gap-3">
                {STAT_ENDS.map((end, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border bg-background/70 p-4 text-center shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]"
                  >
                    <p className="font-display text-2xl font-bold tracking-tight text-violet-600 dark:text-violet-400">
                      <CountUp end={end} suffix={t(`stats.items.${i}.suffix`)} />
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{t(`stats.items.${i}.label`)}</p>
                  </div>
                ))}
              </div>

              {/* Process steps */}
              <div className="rounded-3xl border bg-background/70 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="font-display text-sm font-semibold">{t("process_mini.title")}</p>
                <div className="mt-4 grid gap-3">
                  {PROCESS_STEP_NUMS.map((n, i) => (
                    <div key={n} className="flex items-start gap-3 rounded-2xl border bg-background/60 p-3 transition-colors hover:bg-muted/50 dark:border-white/[0.06] dark:bg-white/[0.03]">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100 font-display text-xs font-bold text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">
                        {n}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{t(`process_mini.steps.${i}.title`)}</p>
                        <p className="text-xs text-muted-foreground">{t(`process_mini.steps.${i}.desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── POURQUOI ── */}
        <section className="mt-24" aria-label={t("why.title")}>
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{t("why.title")}</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">{t("why.subtitle")}</p>
          </ScrollReveal>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {WHY_ENDS.map((end, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-violet-500/20">
                  <p className="font-display text-3xl font-bold tracking-tight text-violet-600 dark:text-violet-400">
                    <CountUp end={end} suffix={t(`why.items.${i}.suffix`)} />
                  </p>
                  <p className="text-sm font-medium text-foreground">{t(`why.items.${i}.sub`)} {t(`why.items.${i}.value`)}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`why.items.${i}.desc`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── ÉCOSYSTÈME 6 SAAS ── */}
        <section className="mt-24" aria-label={t("ecosystem.title")}>
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{t("ecosystem.title")}</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  {t("ecosystem.subtitle")}
                </p>
              </div>
              <Link
                href="/services"
                className="hidden rounded-2xl border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted sm:inline-flex dark:border-white/[0.12]"
              >
                {t("ecosystem.viewAll")}
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {SERVICE_STYLES.map((s, i) => {
              const badge = t.has(`services.${i}.badge`) ? t(`services.${i}.badge`) : null;
              return (
                <ScrollReveal key={s.href} delay={i * 80}>
                  <article
                    className={`group relative rounded-3xl border p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${s.gradient} ${s.borderHover} dark:border-white/[0.08] ${
                      i === 0 ? "md:col-span-2" : ""
                    }`}
                  >
                    {s.hasBadge && badge && (
                      <div className={`absolute -top-3 left-6 rounded-full px-3 py-0.5 text-xs font-medium text-white shadow-sm ${s.badgeColor}`}>
                        {badge}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-semibold tracking-tight">{t(`services.${i}.title`)}</h3>
                      <div className="text-right">
                        <span className="font-display text-2xl font-bold tracking-tight">{s.price}&nbsp;&euro;</span>
                        <span className="text-xs text-muted-foreground"> {t("ecosystem.priceUnit")}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{t(`services.${i}.desc`)}</p>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={s.href}
                        className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted dark:border-white/[0.12]"
                      >
                        {t("ecosystem.learnMore")}
                      </Link>
                      <TrackedLink
                        href="/contact"
                        trackAs="audit_service_card"
                        className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-700"
                      >
                        {t("ecosystem.requestAudit")}
                      </TrackedLink>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              href="/services"
              className="inline-flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              {t("ecosystem.viewAllServices")}
            </Link>
          </div>
        </section>

        {/* ── ROI ── */}
        <section className="mt-24" aria-label="ROI">
          <ScrollReveal>
            <div className="rounded-3xl border bg-gradient-to-br from-violet-50/60 to-indigo-50/40 p-8 dark:border-white/[0.06] dark:from-violet-500/[0.06] dark:to-indigo-500/[0.04]">
              <h2 className="font-display text-2xl font-bold tracking-tight">{t("roi.title")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("roi.subtitle")}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-2xl border bg-background/70 p-5 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t(`roi.items.${i}.label`)}</p>
                    <p className="mt-2 font-display text-xl font-bold tracking-tight">{t(`roi.items.${i}.value`)}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t(`roi.items.${i}.detail`)}</p>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                {t("roi.disclaimer")}
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ── PROCESS ── */}
        <section className="mt-24" aria-label={t("process.title")}>
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{t("process.title")}</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {t("process.subtitle")}
            </p>
          </ScrollReveal>

          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {PROCESS_MAIN_NUMS.map((n, i) => (
              <ScrollReveal key={n} delay={i * 100}>
                <li className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 font-display text-sm font-bold text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">
                    {n}
                  </span>
                  <p className="mt-3 font-display font-semibold">{t(`process.steps.${i}.title`)}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`process.steps.${i}.desc`)}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>

          <ScrollReveal delay={300}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/contact"
                trackAs="audit_gratuit_llms"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-700"
              >
                {t("process.ctaPrimary")}
              </TrackedLink>
              <Link
                href="/llms.txt"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted dark:border-white/[0.12]"
              >
                {t("process.ctaSecondary")}
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* ── RÉSULTATS PME ── */}
        <section className="mt-24" aria-label={t("results.title")}>
          <ScrollReveal direction="up">
            <div className="rounded-3xl border bg-muted/60 p-6 sm:p-8 dark:border-white/[0.06] dark:bg-violet-500/[0.04]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-sm font-medium">{t("results.title")}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t("results.subtitle")}</p>
                </div>
                <Link href="/cas-clients" className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium transition hover:bg-muted">
                  {t("results.viewCases")}
                </Link>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="rounded-2xl border bg-background p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
                    <div className="text-2xl font-bold font-mono tracking-tight">{t(`results.items.${i}.value`)}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{t(`results.items.${i}.label`)}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── DERNIERS ARTICLES ── */}
        <section className="mt-24" aria-label={t("blog.title")}>
          <ScrollReveal>
            <div className="flex items-baseline justify-between gap-4 mb-8">
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{t("blog.title")}</h2>
              <Link href="/blog" className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400">
                {t("blog.viewAll")}
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getAllPosts().slice(0, 3).map((post) => (
              <ScrollReveal key={post.slug} direction="up" delay={60}>
                <BlogCard
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                  readingTime={post.readingTime}
                />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-24" aria-label={t("faq.title")}>
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{t("faq.title")}</h2>
          </ScrollReveal>
          <div className="mt-6 space-y-3">
            {faqItems.map((f, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <details className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-200 open:shadow-md hover:bg-muted/50 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
                  <summary className="cursor-pointer font-display font-medium">{f.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── ESPACE CLIENT ── */}
        <section className="mt-24" aria-label={t("client.title")}>
          <ScrollReveal>
            <div className="rounded-3xl border bg-muted/50 p-8 sm:flex sm:items-center sm:justify-between sm:gap-8 dark:border-white/[0.06] dark:bg-white/[0.03]">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">{t("client.title")}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("client.description")}
                </p>
              </div>
              <Link
                href="/connexion"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl border bg-background px-6 py-3 text-sm font-medium shadow-sm transition hover:bg-muted sm:mt-0 sm:shrink-0"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {t("client.cta")}
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="mt-24" aria-label={t("cta.title")}>
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-violet-50 via-indigo-50/80 to-cyan-50/50 p-10 text-center shadow-sm dark:border-violet-500/20 dark:from-violet-950/40 dark:via-indigo-950/30 dark:to-cyan-950/20 dark:shadow-lg dark:shadow-violet-500/10">
              {/* Decorative orb */}
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-violet-400/10 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

              <h2 className="relative font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {t("cta.title")}
              </h2>
              <p className="relative mt-4 text-muted-foreground">
                {t("cta.subtitle")}
              </p>
              <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <TrackedLink
                  href="/contact"
                  trackAs="audit_gratuit_cta_final"
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-[1.02] hover:bg-violet-700 hover:shadow-xl"
                >
                  {t("cta.ctaPrimary")}
                </TrackedLink>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition-colors hover:bg-muted dark:border-white/[0.12]"
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
