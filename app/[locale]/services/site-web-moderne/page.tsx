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
    title: t('site_web_moderne.metadata_title'),
    description: t('site_web_moderne.metadata_description'),
    keywords: t('site_web_moderne.metadata_keywords').split(', '),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/servicos/website-moderno" : "/services/site-web-moderne"}`,
      languages: {
        fr: `${siteUrl}/services/site-web-moderne`,
        "pt-PT": `${siteUrl}/pt/servicos/website-moderno`,
        "x-default": `${siteUrl}/services/site-web-moderne`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const DEMO_BASE = "https://templates-website-wct.vercel.app";

const TEMPLATE_IDS = [
  "restaurant", "immobilier", "avocats", "plombier", "photographe",
  "fleuriste", "cabinet_rh", "animalerie", "e_commerce", "saas", "tech", "sur_mesure",
] as const;

const TEMPLATE_ICONS: Record<string, string> = {
  restaurant: "🍽️", immobilier: "🏠", avocats: "⚖️", plombier: "🔧",
  photographe: "📷", fleuriste: "💐", cabinet_rh: "👥", animalerie: "🐾",
  e_commerce: "🛒", saas: "🚀", tech: "💻", sur_mesure: "✨",
};

const TEMPLATE_PREVIEW_URLS: Record<string, string> = {
  restaurant: `${DEMO_BASE}/demo-restaurant/`,
  immobilier: `${DEMO_BASE}/demo-immobilier/`,
  avocats: `${DEMO_BASE}/demo-avocats/`,
  plombier: `${DEMO_BASE}/demo-plombier/`,
  photographe: `${DEMO_BASE}/demo-photographe/`,
  fleuriste: `${DEMO_BASE}/demo-fleuriste/`,
  cabinet_rh: `${DEMO_BASE}/demo-cabinet-RH/`,
  animalerie: `${DEMO_BASE}/demo-animalerie/`,
  e_commerce: `${DEMO_BASE}/demo-E-commerce/`,
  saas: `${DEMO_BASE}/demo-saas/`,
  tech: `${DEMO_BASE}/demo-tech/`,
  sur_mesure: "",
};

// Contact IDs use hyphens
const TEMPLATE_CONTACT_IDS: Record<string, string> = {
  restaurant: "restaurant", immobilier: "immobilier", avocats: "avocats",
  plombier: "plombier", photographe: "photographe", fleuriste: "fleuriste",
  cabinet_rh: "cabinet-rh", animalerie: "animalerie", e_commerce: "e-commerce",
  saas: "saas", tech: "tech", sur_mesure: "sur-mesure",
};

export default async function SiteWebModernePage() {
  const t = await getTranslations('services');

  const TEMPLATES = TEMPLATE_IDS.map((id) => ({
    id: TEMPLATE_CONTACT_IDS[id],
    name: t(`site_web_moderne.templates.${id}.name`),
    description: t(`site_web_moderne.templates.${id}.description`),
    sector: t(`site_web_moderne.templates.${id}.sector`),
    icon: TEMPLATE_ICONS[id],
    previewUrl: TEMPLATE_PREVIEW_URLS[id],
  }));

  const includedItems = Array.from({ length: 6 }, (_, i) => ({
    title: t(`site_web_moderne.included_items.${i}.title`),
    desc: t(`site_web_moderne.included_items.${i}.desc`),
  }));

  const seoItems = Array.from({ length: 4 }, (_, i) => ({
    k: t(`site_web_moderne.seo_items.${i}.k`),
    d: t(`site_web_moderne.seo_items.${i}.d`),
  }));

  const processSteps = Array.from({ length: 4 }, (_, i) => ({
    step: t(`site_web_moderne.process_steps.${i}.step`),
    title: t(`site_web_moderne.process_steps.${i}.title`),
    desc: t(`site_web_moderne.process_steps.${i}.desc`),
  }));

  const FAQ = Array.from({ length: 6 }, (_, i) => ({
    q: t(`site_web_moderne.faq.${i}.q`),
    a: t(`site_web_moderne.faq.${i}.a`),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t('site_web_moderne.breadcrumb_home'), item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: t('site_web_moderne.breadcrumb_services'), item: `${SITE_URL}/services` },
          {
            "@type": "ListItem",
            position: 3,
            name: t('site_web_moderne.breadcrumb_current'),
            item: `${SITE_URL}/services/site-web-moderne`,
          },
        ],
      },
      {
        "@type": "Service",
        name: t('site_web_moderne.jsonld_service_name'),
        description: t('site_web_moderne.jsonld_service_description'),
        provider: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: t('site_web_moderne.jsonld_area_served') },
        url: `${SITE_URL}/services/site-web-moderne`,
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

      {/* Sky/indigo background gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-sky-50/50 via-background to-background dark:from-sky-950/20" />

      {/* Subtle dot grid pattern */}
      <GridPattern variant="dot" color="rgba(14, 165, 233, 0.06)" />
      <PageBackground variant="grid-iso" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        <Breadcrumbs items={[
          { label: t('site_web_moderne.breadcrumb_home'), href: "/" },
          { label: t('site_web_moderne.breadcrumb_services'), href: "/services" },
          { label: t('site_web_moderne.breadcrumb_current') },
        ]} />

        {/* HERO */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs uppercase tracking-wide text-sky-700 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-300">
              {t('site_web_moderne.hero_badge')}
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              {t('site_web_moderne.hero_title_line1')}
              <span className="block bg-linear-to-r from-sky-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent dark:from-sky-400 dark:via-blue-400 dark:to-indigo-400">
                {t('site_web_moderne.hero_title_line2')}
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              {t('site_web_moderne.hero_description_prefix')}<strong>{t('site_web_moderne.hero_description_bold')}</strong>{t('site_web_moderne.hero_description_suffix')}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <TrackedLink
                href="/contact?service=site-web"
                trackAs="audit_site_web_moderne"
                className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-sky-500/25 transition hover:scale-[1.02] hover:bg-sky-700"
              >
                {t('site_web_moderne.hero_cta_audit')}
              </TrackedLink>
              <a
                href="#templates"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted dark:border-white/[0.1]"
              >
                {t('site_web_moderne.hero_cta_templates')}
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="rounded-full border bg-muted/50 px-3 py-1 dark:border-white/[0.08] dark:bg-white/[0.04]">
                {t('site_web_moderne.hero_price_monthly')}
              </span>
              <span className="rounded-full border bg-muted/50 px-3 py-1 dark:border-white/[0.08] dark:bg-white/[0.04]">
                {t('site_web_moderne.hero_price_setup')}
              </span>
              <span className="rounded-full border bg-muted/50 px-3 py-1 dark:border-white/[0.08] dark:bg-white/[0.04]">
                {t('site_web_moderne.hero_delivery')}
              </span>
            </div>
          </section>
        </ScrollReveal>

        {/* WHAT'S INCLUDED */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('site_web_moderne.included_title')}</h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {includedItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-sky-500/20 dark:hover:bg-white/[0.06]"
                >
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* TEMPLATES */}
        <ScrollReveal delay={150}>
          <section className="mt-16 sm:mt-24 space-y-8" id="templates">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-2xl tracking-tight">{t('site_web_moderne.templates_title')}</h2>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                {t('site_web_moderne.templates_description')}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TEMPLATES.map((tmpl) => {
                const isSurMesure = tmpl.id === "sur-mesure";
                const hasPreview = tmpl.previewUrl && tmpl.previewUrl !== "#";
                return (
                  <article
                    key={tmpl.id}
                    className={`group relative flex flex-col overflow-hidden rounded-3xl shadow-sm backdrop-blur transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      isSurMesure
                        ? "border-2 border-dashed border-sky-300 bg-linear-to-br from-sky-50/80 to-indigo-50/60 dark:border-sky-500/30 dark:from-sky-950/30 dark:to-indigo-950/20 dark:hover:border-sky-400/50 dark:hover:shadow-sky-500/10"
                        : "border bg-background/60 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-sky-500/20 dark:hover:bg-white/[0.06] dark:hover:shadow-sky-500/10"
                    }`}
                  >
                    {/* Live preview iframe */}
                    {hasPreview ? (
                      <a
                        href={tmpl.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block w-full overflow-hidden border-b dark:border-white/[0.06]"
                        aria-label={`${t('site_web_moderne.template_demo_label')} ${tmpl.name}`}
                      >
                        {/* Mini browser bar */}
                        <div className="flex items-center gap-1.5 bg-sky-50/80 px-3 py-2 dark:bg-sky-950/20">
                          <span className="h-2 w-2 rounded-full bg-red-400/60" />
                          <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
                          <span className="h-2 w-2 rounded-full bg-green-400/60" />
                          <span className="ml-2 flex-1 truncate rounded-md bg-background/80 px-2 py-0.5 text-[10px] text-muted-foreground dark:bg-white/[0.06]">
                            {tmpl.previewUrl.replace("https://", "")}
                          </span>
                        </div>
                        {/* Iframe container */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <iframe
                            src={tmpl.previewUrl}
                            title={`${t('site_web_moderne.template_demo_label')} ${tmpl.name}`}
                            loading="lazy"
                            className="pointer-events-none h-[200%] w-[200%] origin-top-left scale-50"
                            sandbox="allow-scripts allow-same-origin"
                            tabIndex={-1}
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                            <span className="rounded-2xl bg-white/90 px-4 py-2 text-xs font-medium text-sky-700 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 dark:bg-sky-950/90 dark:text-sky-300">
                              {t('site_web_moderne.template_demo_label')}
                            </span>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div className="flex aspect-[16/10] w-full items-center justify-center border-b bg-linear-to-br from-sky-100/60 to-indigo-100/40 dark:border-white/[0.06] dark:from-sky-950/40 dark:to-indigo-950/20">
                        <div className="text-center">
                          <span className="text-3xl">{tmpl.icon}</span>
                          <p className="mt-2 text-xs font-medium text-sky-700 dark:text-sky-300">
                            {t('site_web_moderne.template_sur_mesure_label')}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex grow flex-col p-6">
                      {/* Sector + icon */}
                      <div className="flex items-center justify-between">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-lg dark:bg-sky-950/50">
                          {tmpl.icon}
                        </span>
                        <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-300">
                          {tmpl.sector}
                        </span>
                      </div>

                      <h3 className="mt-3 text-base font-semibold tracking-tight">{tmpl.name}</h3>
                      <p className="mt-2 grow text-sm text-muted-foreground">{tmpl.description}</p>

                      <div className="mt-5 flex gap-3">
                        <Link
                          href={`/contact?service=site-web&template=${tmpl.id}`}
                          className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-sky-500/25 transition hover:bg-sky-700"
                        >
                          {isSurMesure ? t('site_web_moderne.template_cta_custom') : t('site_web_moderne.template_cta_choose')}
                        </Link>
                        {hasPreview && (
                          <a
                            href={tmpl.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium transition hover:bg-muted dark:border-white/[0.1]"
                          >
                            {t('site_web_moderne.template_cta_demo')}
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="rounded-3xl border bg-muted/40 p-6 text-center dark:border-white/[0.06] dark:bg-sky-500/[0.03]">
              <p className="text-sm text-muted-foreground">
                {t('site_web_moderne.templates_fallback')}{" "}
                <Link href="/contact?service=site-web" className="font-medium text-sky-600 underline hover:opacity-80 dark:text-sky-400">
                  {t('site_web_moderne.templates_fallback_link')}
                </Link>
                {t('site_web_moderne.templates_fallback_suffix')}
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* SEO + SEO IA */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('site_web_moderne.seo_title')}</h2>

            <div className="grid gap-4 md:grid-cols-2">
              {seoItems.map((x) => (
                <div key={x.k} className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-sky-500/20">
                  <p className="text-sm font-medium">{x.k}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* PROCESS */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('site_web_moderne.process_title')}</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((x) => (
                <div
                  key={x.step}
                  className="rounded-3xl border bg-muted/40 p-6 transition hover:bg-muted dark:border-white/[0.06] dark:bg-sky-500/[0.03] dark:hover:bg-sky-500/[0.06]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 text-sm font-semibold text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
                    {x.step}
                  </div>
                  <p className="mt-3 text-sm font-medium">{x.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{x.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ROI */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('site_web_moderne.roi_title')}</h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('site_web_moderne.roi_hypothesis_label')}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t('site_web_moderne.roi_hypothesis')}</p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('site_web_moderne.roi_conversion_label')}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t('site_web_moderne.roi_conversion')}</p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('site_web_moderne.roi_impact_label')}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t('site_web_moderne.roi_impact')}</p>
              </div>
            </div>

            <div className="rounded-3xl border bg-muted p-6 dark:border-white/[0.06] dark:bg-sky-500/[0.04]">
              <p className="text-sm font-medium">{t('site_web_moderne.roi_business_title')}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('site_web_moderne.roi_business_desc_prefix')}
                <strong>{t('site_web_moderne.roi_business_bold1')}</strong>
                {t('site_web_moderne.roi_business_mid')}
                <strong>{t('site_web_moderne.roi_business_bold2')}</strong>
                {t('site_web_moderne.roi_business_suffix')}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {t('site_web_moderne.roi_disclaimer')}
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">{t('site_web_moderne.faq_title')}</h2>

            <div className="space-y-4">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-3xl border bg-background p-6 transition hover:bg-muted dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
                >
                  <summary className="cursor-pointer font-medium">{f.q}</summary>
                  <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* FINAL CTA */}
        <ScrollReveal delay={100}>
          <section className="mt-20">
            <div className="relative overflow-hidden rounded-3xl border bg-linear-to-r from-sky-50 via-blue-50/60 to-indigo-50/30 p-10 text-center shadow-sm dark:border-sky-500/20 dark:from-sky-950/40 dark:via-blue-950/30 dark:to-indigo-950/20 dark:shadow-lg dark:shadow-sky-500/10">
              {/* Decorative orbs */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 -left-12 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-500/10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/10"
              />

              <div className="relative">
                <h2 className="font-display font-bold text-3xl tracking-tight">{t('site_web_moderne.cta_title')}</h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  {t('site_web_moderne.cta_description')}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <TrackedLink
                    href="/contact?service=site-web"
                    trackAs="audit_site_web_final"
                    className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-sky-500/25 transition hover:scale-[1.02] hover:bg-sky-700"
                  >
                    {t('site_web_moderne.cta_button')}
                  </TrackedLink>
                  <a
                    href="#templates"
                    className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted dark:border-white/[0.1]"
                  >
                    {t('site_web_moderne.cta_templates')}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <RelatedServices currentService="site-web-moderne" />

      </div>
    </main>
  );
}
