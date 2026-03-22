import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPARATIFS } from "@/lib/comparatifs-data";
import Breadcrumbs from "@/components/site/breadcrumbs";
import { TrackedLink } from "@/components/site/tracked-link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";
import { getTranslations, getLocale } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return COMPARATIFS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = COMPARATIFS.find((x) => x.slug === slug);
  if (!c) return {};

  const t = await getTranslations('comparatifs');
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: t(`items.${c.slug}.metaTitle`),
    description: t(`items.${c.slug}.metaDescription`),
    keywords: t(`items.${c.slug}.keywords`).split(', '),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? `/pt/comparacoes/${c.slug}` : `/comparatifs/${c.slug}`}`,
      languages: {
        fr: `${siteUrl}/comparatifs/${c.slug}`,
        "pt-PT": `${siteUrl}/pt/comparacoes/${c.slug}`,
        "x-default": `${siteUrl}/comparatifs/${c.slug}`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

const CATEGORY_COLORS: Record<string, { badge: string; accent: string }> = {
  automatisation: {
    badge: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-400",
    accent: "from-amber-50/30 via-background to-background dark:from-amber-950/10",
  },
  prospection: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/30 dark:text-emerald-400",
    accent: "from-emerald-50/30 via-background to-background dark:from-emerald-950/10",
  },
  "site-web": {
    badge: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800/40 dark:bg-sky-950/30 dark:text-sky-400",
    accent: "from-sky-50/30 via-background to-background dark:from-sky-950/10",
  },
  ia: {
    badge: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-800/40 dark:bg-fuchsia-950/30 dark:text-fuchsia-400",
    accent: "from-fuchsia-50/30 via-background to-background dark:from-fuchsia-950/10",
  },
};

export default async function ComparatifPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = COMPARATIFS.find((x) => x.slug === slug);
  if (!c) notFound();

  const t = await getTranslations('comparatifs');
  const colors = CATEGORY_COLORS[c.category] ?? CATEGORY_COLORS.automatisation;

  const title = t(`items.${c.slug}.title`);
  const optionAName = t(`items.${c.slug}.optionAName`);
  const optionBName = t(`items.${c.slug}.optionBName`);
  const serviceLabel = t(`items.${c.slug}.serviceLabel`);
  const intro = t(`items.${c.slug}.intro`);
  const verdict = t(`items.${c.slug}.verdict`);

  const features = Array.from({ length: c.featureCount }, (_, i) => ({
    feature: t(`items.${c.slug}.features.${i}.feature`),
    optionA: t(`items.${c.slug}.features.${i}.optionA`),
    optionB: t(`items.${c.slug}.features.${i}.optionB`),
    wct: t(`items.${c.slug}.features.${i}.wct`),
  }));

  const prosA = Array.from({ length: c.prosACount }, (_, i) => t(`items.${c.slug}.prosA.${i}`));
  const consA = Array.from({ length: c.consACount }, (_, i) => t(`items.${c.slug}.consA.${i}`));
  const prosB = Array.from({ length: c.prosBCount }, (_, i) => t(`items.${c.slug}.prosB.${i}`));
  const consB = Array.from({ length: c.consBCount }, (_, i) => t(`items.${c.slug}.consB.${i}`));
  const prosWCT = Array.from({ length: c.prosWCTCount }, (_, i) => t(`items.${c.slug}.prosWCT.${i}`));
  const faqItems = Array.from({ length: c.faqCount }, (_, i) => ({
    q: t(`items.${c.slug}.faq.${i}.q`),
    a: t(`items.${c.slug}.faq.${i}.a`),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t('detail.jsonld_home'), item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: t('detail.jsonld_comparatifs'), item: `${SITE_URL}/comparatifs` },
          { "@type": "ListItem", position: 3, name: title, item: `${SITE_URL}/comparatifs/${c.slug}` },
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
    ],
  };

  return (
    <main id="content" className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={`absolute inset-0 -z-10 bg-linear-to-b ${colors.accent}`} />
      <GridPattern variant="dot" color="rgba(139, 92, 246, 0.04)" />

      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">

        <Breadcrumbs items={[
          { label: t('detail.breadcrumb_home'), href: "/" },
          { label: t('detail.breadcrumb_comparatifs'), href: "/comparatifs" },
          { label: title },
        ]} />

        {/* HERO */}
        <ScrollReveal direction="up">
          <section className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium uppercase tracking-wide ${colors.badge}`}>
                {t('detail.badge_comparatif')}
              </span>
              <span className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium uppercase tracking-wide ${colors.badge}`}>
                {serviceLabel}
              </span>
            </div>

            <h1 className="font-display font-bold text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            <p className="max-w-3xl text-lg text-muted-foreground">{intro}</p>
          </section>
        </ScrollReveal>

        {/* TABLEAU COMPARATIF — Desktop */}
        <ScrollReveal direction="up" delay={60}>
          <section className="mt-14" aria-label={t('detail.badge_comparatif')}>
            <h2 className="font-display font-bold text-xl tracking-tight mb-6">
              {t('detail.table_heading', { optionA: optionAName, optionB: optionBName })}
            </h2>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground border-b dark:border-white/[0.08]">{t('detail.table_header_critere')}</th>
                    <th className="text-left py-3 px-4 font-medium border-b dark:border-white/[0.08]">{optionAName}</th>
                    <th className="text-left py-3 px-4 font-medium border-b dark:border-white/[0.08]">{optionBName}</th>
                    <th className="text-left py-3 px-4 font-bold text-violet-700 dark:text-violet-400 border-b border-violet-200/60 dark:border-violet-800/30 bg-violet-50/50 dark:bg-violet-950/20 rounded-t-2xl">WCT Systems</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((f, i) => (
                    <tr key={i} className="border-b dark:border-white/[0.06]">
                      <td className="py-3 px-4 font-medium text-muted-foreground">{f.feature}</td>
                      <td className="py-3 px-4">{f.optionA}</td>
                      <td className="py-3 px-4">{f.optionB}</td>
                      <td className="py-3 px-4 bg-violet-50/30 dark:bg-violet-950/10 font-medium">{f.wct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {features.map((f, i) => (
                <div key={i} className="rounded-2xl border bg-background/60 p-4 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.03]">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">{f.feature}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-2">
                      <span className="text-muted-foreground shrink-0">{optionAName}</span>
                      <span className="text-right">{f.optionA}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-muted-foreground shrink-0">{optionBName}</span>
                      <span className="text-right">{f.optionB}</span>
                    </div>
                    <div className="flex justify-between gap-2 pt-2 border-t border-violet-200/40 dark:border-violet-800/20">
                      <span className="font-medium text-violet-700 dark:text-violet-400 shrink-0">WCT</span>
                      <span className="text-right font-medium">{f.wct}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* AVANTAGES / INCONVENIENTS */}
        <ScrollReveal direction="up" delay={80}>
          <section className="mt-14">
            <h2 className="font-display font-bold text-xl tracking-tight mb-6">
              {t('detail.pros_cons_heading')}
            </h2>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Option A */}
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.03]">
                <h3 className="font-bold tracking-tight mb-4">{optionAName}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-2">{t('detail.pros_label')}</p>
                    <ul className="space-y-1.5">
                      {prosA.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wide mb-2">{t('detail.cons_label')}</p>
                    <ul className="space-y-1.5">
                      {consA.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Option B */}
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.03]">
                <h3 className="font-bold tracking-tight mb-4">{optionBName}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-2">{t('detail.pros_label')}</p>
                    <ul className="space-y-1.5">
                      {prosB.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wide mb-2">{t('detail.cons_label')}</p>
                    <ul className="space-y-1.5">
                      {consB.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* L'APPROCHE WCT */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-14">
            <div className="rounded-3xl border border-violet-200/60 bg-linear-to-r from-violet-50/50 to-indigo-50/30 p-8 dark:border-violet-900/20 dark:from-violet-950/20 dark:to-indigo-950/10">
              <h2 className="font-display font-bold text-xl tracking-tight mb-4">
                {t('detail.wct_approach_heading')}
              </h2>
              <ul className="space-y-2">
                {prosWCT.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <TrackedLink
                  href={c.serviceHref}
                  trackAs={`comparatif_service_${c.slug}`}
                  className="inline-flex items-center justify-center rounded-2xl border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
                >
                  {t('detail.wct_service_link', { label: serviceLabel })} &rarr;
                </TrackedLink>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* VERDICT */}
        <ScrollReveal direction="up" delay={120}>
          <section className="mt-14">
            <h2 className="font-display font-bold text-xl tracking-tight mb-4">{t('detail.verdict_heading')}</h2>
            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.03]">
              <p className="text-muted-foreground leading-relaxed">{verdict}</p>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal direction="up" delay={140}>
          <section className="mt-14">
            <h2 className="font-display font-bold text-xl tracking-tight mb-6">{t('detail.faq_heading')}</h2>
            <div className="space-y-3">
              {faqItems.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-200 open:shadow-md hover:bg-muted/50 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-medium text-sm">
                    {f.q}
                    <span className="ml-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* CTA FINAL */}
        <ScrollReveal direction="up" delay={160}>
          <section className="mt-16 rounded-3xl border border-violet-100/70 bg-linear-to-r from-violet-50/50 to-indigo-50/30 p-10 text-center dark:border-violet-900/20 dark:from-violet-950/25 dark:to-indigo-950/15">
            <h2 className="font-display font-bold text-2xl tracking-tight">
              {t('detail.final_cta_heading')}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {t('detail.final_cta_text')}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <TrackedLink
                href={`/contact?service=${c.category}`}
                trackAs={`comparatif_${c.slug}`}
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                {t('detail.final_cta_button')}
              </TrackedLink>
              <Link
                href="/comparatifs"
                className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted"
              >
                {t('detail.final_cta_all')}
              </Link>
            </div>
          </section>
        </ScrollReveal>

      </div>
    </main>
  );
}
