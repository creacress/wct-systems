import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES_SOLUTIONS, SECTEURS } from "@/lib/solutions-data";
import Breadcrumbs from "@/components/site/breadcrumbs";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";
import { getTranslations, getLocale } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  const params: { service: string; secteur: string }[] = [];
  for (const service of SERVICES_SOLUTIONS) {
    for (const secteur of SECTEURS) {
      params.push({ service: service.slug, secteur: secteur.slug });
    }
  }
  return params;
}

function findStructural(serviceSlug: string, secteurSlug: string) {
  const service = SERVICES_SOLUTIONS.find((s) => s.slug === serviceSlug);
  const secteur = SECTEURS.find((s) => s.slug === secteurSlug);
  if (!service || !secteur) return null;
  return { service, secteur };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; secteur: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug, secteur: secteurSlug } = await params;
  const data = findStructural(serviceSlug, secteurSlug);
  if (!data) return {};

  const t = await getTranslations('solutions');
  const serviceName = t(`services.${serviceSlug}.name`);
  const secteurName = t(`secteurs.${secteurSlug}.name`);
  const solution = t(`secteurs.${secteurSlug}.solutions.${serviceSlug}`);

  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: t('detail.meta_title', { service: serviceName, secteur: secteurName }),
    description: t('detail.meta_description', { service: serviceName, secteur: secteurName.toLowerCase(), solution, price: data.service.price }),
    keywords: [
      `${serviceName.toLowerCase()} ${secteurName.toLowerCase()}`,
      t('detail.meta_keyword_automation', { secteur: secteurName.toLowerCase() }),
      t('detail.meta_keyword_ia', { secteur: secteurName.toLowerCase() }),
    ],
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? `/pt/solucoes/${serviceSlug}/para/${secteurSlug}` : `/solutions/${serviceSlug}/pour/${secteurSlug}`}`,
      languages: {
        fr: `${siteUrl}/solutions/${serviceSlug}/pour/${secteurSlug}`,
        "pt-PT": `${siteUrl}/pt/solucoes/${serviceSlug}/para/${secteurSlug}`,
        "x-default": `${siteUrl}/solutions/${serviceSlug}/pour/${secteurSlug}`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

export default async function SolutionSecteurPage({
  params,
}: {
  params: Promise<{ service: string; secteur: string }>;
}) {
  const { service: serviceSlug, secteur: secteurSlug } = await params;
  const data = findStructural(serviceSlug, secteurSlug);
  if (!data) notFound();

  const { service, secteur } = data;
  const t = await getTranslations('solutions');

  const serviceName = t(`services.${serviceSlug}.name`);
  const secteurName = t(`secteurs.${secteurSlug}.name`);
  const solution = t(`secteurs.${secteurSlug}.solutions.${serviceSlug}`);

  const faqItems = Array.from({ length: secteur.faqCount }, (_, i) => ({
    q: t(`secteurs.${secteurSlug}.faq.${i}.q`),
    a: t(`secteurs.${secteurSlug}.faq.${i}.a`),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t('detail.jsonld_home'), item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: t('detail.jsonld_solutions'), item: `${SITE_URL}/solutions` },
          { "@type": "ListItem", position: 3, name: serviceName, item: `${SITE_URL}/solutions/${serviceSlug}/pour/${secteurSlug}` },
        ],
      },
      {
        "@type": "Service",
        name: `${serviceName} ${t('detail.heading_for', { secteur: secteurName.toLowerCase() })}`,
        description: solution,
        provider: { "@type": "Organization", name: "WCT Systems", url: SITE_URL },
        areaServed: { "@type": "Country", name: t('detail.jsonld_country') },
        offers: {
          "@type": "Offer",
          price: service.price,
          priceCurrency: "EUR",
          priceSpecification: { "@type": "UnitPriceSpecification", price: service.price, priceCurrency: "EUR", unitText: "MONTH" },
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

  const otherServices = SERVICES_SOLUTIONS.filter((s) => s.slug !== serviceSlug);

  return (
    <main id="content" className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/30 via-background to-background dark:from-violet-950/10" />
      <GridPattern variant="dot" color="rgba(139, 92, 246, 0.05)" />

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">

        <Breadcrumbs items={[
          { label: t('detail.breadcrumb_home'), href: "/" },
          { label: t('detail.breadcrumb_solutions'), href: "/solutions" },
          { label: serviceName },
          { label: t('detail.breadcrumb_for', { secteur: secteurName }) },
        ]} />

        {/* HERO */}
        <ScrollReveal direction="up">
          <section className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800/50 dark:bg-violet-950/30 dark:text-violet-400">
              {serviceName} &bull; {secteurName}
            </div>

            <h1 className="font-display font-bold text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              {serviceName}
              <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
                {t('detail.heading_for', { secteur: secteurName.toLowerCase() })}
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">{solution}</p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                {t('detail.cta_audit')}
              </Link>
              <Link
                href={service.serviceHref}
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                {t('detail.cta_detail')} &rarr;
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* PROBLEME */}
        <ScrollReveal direction="up" delay={60}>
          <section className="mt-16 rounded-3xl border bg-background/60 p-8 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.03]">
            <h2 className="font-display font-bold text-xl tracking-tight mb-4">
              {t('detail.challenge_heading', { secteur: secteurName.toLowerCase() })}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{t(`secteurs.${secteurSlug}.problemType`)}.</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t('detail.challenge_text')}
            </p>
          </section>
        </ScrollReveal>

        {/* SOLUTION */}
        <ScrollReveal direction="up" delay={80}>
          <section className="mt-12">
            <h2 className="font-display font-bold text-xl tracking-tight mb-6">
              {t('detail.solution_heading', { service: serviceName.toLowerCase() })}
            </h2>
            <div className="rounded-3xl border bg-background/60 p-8 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.03]">
              <p className="text-muted-foreground leading-relaxed">{solution}</p>
              <div className="mt-6 flex items-center gap-4 text-sm">
                <span className="rounded-full bg-violet-100 px-3 py-1 font-medium text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                  {t('detail.price_from', { price: service.price })}
                </span>
                <span className="text-muted-foreground">{t('detail.setup_included')}</span>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ROI */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-12 rounded-3xl border border-violet-100/70 bg-linear-to-r from-violet-50/50 to-indigo-50/30 p-8 dark:border-violet-900/20 dark:from-violet-950/20 dark:to-indigo-950/10">
            <h2 className="font-display font-bold text-xl tracking-tight mb-4">
              {t('detail.roi_heading', { secteur: secteurName.toLowerCase() })}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">{t('detail.roi_leads_value')}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t('detail.roi_leads_label')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">{t('detail.roi_hours_value')}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t('detail.roi_hours_label')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">{t('detail.roi_payback_value')}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t('detail.roi_payback_label')}</div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal direction="up" delay={120}>
          <section className="mt-16">
            <h2 className="font-display font-bold text-xl tracking-tight mb-6">
              {t('detail.faq_heading')}
            </h2>
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

        {/* AUTRES SERVICES */}
        <ScrollReveal direction="up" delay={140}>
          <section className="mt-16">
            <h2 className="font-display font-bold text-xl tracking-tight mb-6">
              {t('detail.other_solutions_heading', { secteur: secteurName.toLowerCase() })}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}/pour/${secteurSlug}`}
                  className="group rounded-3xl border bg-background/70 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-violet-200/80 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-violet-800/30"
                >
                  <h3 className="font-bold text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {t(`services.${s.slug}.name`)}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{t(`services.${s.slug}.description`)}</p>
                  <span className="mt-3 inline-block text-xs font-medium text-violet-600 dark:text-violet-400">
                    {t('detail.other_price_from', { price: s.price })} &rarr;
                  </span>
                </Link>
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
              {t('detail.final_cta_text', { secteur: secteurName.toLowerCase() })}
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              {t('detail.final_cta_button')}
            </Link>
          </section>
        </ScrollReveal>

      </div>
    </main>
  );
}
