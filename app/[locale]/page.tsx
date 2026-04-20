import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import CountUp from "@/components/ui/count-up";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/blog-card";
import { TrackedLink } from "@/components/site/tracked-link";
import { getLocale } from "next-intl/server";
import {
  StripeLogo,
  SupabaseLogo,
  NeonLogo,
  VercelLogo,
  NextjsLogo,
} from "@/components/ui/brand-logos";
import { TestimonialsBento } from "@/components/site/testimonials-bento";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    // Note: layout template already adds " | WCT Systems" — avoid double suffix
    title: "Digital Workplace, IA & Automatisation pour PME — Alternative française",
    description:
      "WCT Systems équipe les PME françaises : Digital Workplace gamifié (alternative à Microsoft 365 & Slack), Site Web Moderne, Automatisation RPA, Intégration IA et Nixie Pulse. Hébergé en France, à partir de 199 €/mois. Audit gratuit en 15 min.",
    keywords: [
      "Digital Workplace PME",
      "alternative Microsoft 365 PME",
      "automatisation PME France",
      "intégration IA PME",
      "outil collaboratif tout-en-un PME",
      "site web PME",
      "WCT Systems",
    ],
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt" : ""}`,
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

const SITE = {
  name: "WCT Systems",
  // Strip trailing slash to avoid double-slash asset URLs in logo/image fields
  // (stays consistent with generateMetadata's canonical normalization).
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  tagline: "Digital Workplace & IA pour PME",
  sameAs: [
    "https://www.linkedin.com/company/100266628/",
    "https://www.facebook.com/people/Webcressontech/61579372888241/",
    "https://github.com/creacress",
    "https://www.linkedin.com/in/alexis-cresson/",
  ] as string[],
};

const FAQ = [
  {
    q: "Combien de temps pour livrer une première version ?",
    a: "En général 7 à 14 jours pour une V1 : un système simple (prospects + suivi + relances) et un pilotage KPI minimal.",
  },
  {
    q: "Est-ce adapté à une petite entreprise ?",
    a: "Oui. On vise l'impact : moins de tâches répétitives et plus d'opportunités, sans complexifier votre organisation.",
  },
  {
    q: "Qu'est-ce que l'audit gratuit ?",
    a: "Un échange court (15–30 min) + une synthèse : 3 priorités, un plan d'exécution, et des KPI à suivre.",
  },
  {
    q: "C'est quoi un Digital Workplace ?",
    a: "Un bureau virtuel qui regroupe tous vos outils métier dans un seul espace. Chaque « pièce » correspond à une fonction (RH, Ventes, Support…). Votre équipe y travaille, communique et collabore sans jongler entre 10 onglets.",
  },
  {
    q: "La gamification, c'est sérieux ?",
    a: "Oui. Des études montrent que la gamification augmente l'engagement de 48% et la productivité de 36%. Les XP, badges et classements créent de la motivation concrète et mesurable.",
  },
] as const;

type ServiceItem = {
  href: string;
  title: string;
  desc: string;
  price: string;
  color: string;
  bentoSpan: string;
  accent: string;
  badge?: string;
};

const SERVICES: readonly ServiceItem[] = [
  {
    href: "/services/digital-workplace",
    title: "Digital Workplace",
    desc: "Bureau virtuel gamifié où chaque pièce est un outil métier. XP, badges, classements.",
    price: "199",
    color: "cyan",
    bentoSpan: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    accent: "from-cyan-500/10 via-teal-500/5 to-transparent",
    badge: "Nouveau",
  },
  {
    href: "/services/integration-ia",
    title: "Intégration IA",
    desc: "Chatbot, agents IA, assistants sur mesure connectés à vos données.",
    price: "199",
    color: "fuchsia",
    bentoSpan: "sm:col-span-2 lg:col-span-2",
    accent: "from-fuchsia-500/10 via-purple-500/5 to-transparent",
    badge: "Populaire",
  },
  {
    href: "/services/site-web-moderne",
    title: "Site Web Moderne",
    desc: "Site rapide, SEO + SEO IA, 4 templates. Livré en 14 jours.",
    price: "99",
    color: "sky",
    bentoSpan: "lg:col-span-1",
    accent: "from-sky-500/10 via-indigo-500/5 to-transparent",
  },
  {
    href: "/services/automatiser-relances",
    title: "Automatisation RPA",
    desc: "Workflows sur mesure : relances, CRM, reporting, dashboard KPI.",
    price: "149",
    color: "amber",
    bentoSpan: "lg:col-span-1",
    accent: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    href: "/services/nixie-pulse",
    title: "Nixie Pulse",
    desc: "Dashboard KPI physique connecté. Tubes Nixie IN-14 soviétiques. Made in France.",
    price: "990",
    color: "orange",
    bentoSpan: "sm:col-span-2 lg:col-span-2",
    accent: "from-orange-500/10 via-amber-500/5 to-transparent",
    badge: "Hardware",
  },
  {
    href: "/services/aiviz",
    title: "AIViz",
    desc: "Suivez votre visibilité dans ChatGPT, Perplexity, Claude, Gemini.",
    price: "29",
    color: "violet",
    bentoSpan: "sm:col-span-2 lg:col-span-2",
    accent: "from-violet-500/10 via-indigo-500/5 to-transparent",
    badge: "Nouveau",
  },
];


export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/images/logo-wct-systems-512.png`,
        description:
          "Digital Workplace, IA & Automatisation pour PME françaises. 6 solutions intégrées, hébergé en France, RGPD natif.",
        foundingDate: "2024",
        areaServed: { "@type": "Country", name: "France" },
        knowsAbout: [
          "Digital Workplace",
          "Intelligence Artificielle",
          "Automatisation RPA",
          "Génération de leads B2B",
          "Site web Next.js",
          "SEO IA / AEO / GEO",
        ],
        sameAs: SITE.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}#website`,
        name: SITE.name,
        url: SITE.url,
        description:
          "Digital Workplace gamifié + IA + automatisation pour PME. 6 solutions intégrées.",
        inLanguage: ["fr-FR", "pt-PT"],
        publisher: { "@id": `${SITE.url}#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE.url}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}#service`,
        name: "WCT Systems — IA & Automatisation PME",
        url: SITE.url,
        provider: { "@id": `${SITE.url}#organization` },
        serviceType: "Digital Workplace, IA, Automatisation, Site Web",
        areaServed: { "@type": "Country", name: "France" },
        priceRange: "29€ - 990€",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Offres WCT Systems",
          itemListElement: SERVICES.map((s, idx) => {
            // Nixie Pulse = hardware one-time payment; all others = monthly SaaS.
            const isHardware = s.href === "/services/nixie-pulse";
            return {
              "@type": "Offer",
              position: idx + 1,
              name: s.title,
              description: s.desc,
              price: s.price,
              priceCurrency: "EUR",
              url: `${SITE.url}${s.href}`,
              availability: "https://schema.org/InStock",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: s.price,
                priceCurrency: "EUR",
                ...(isHardware
                  ? {}
                  : { unitText: "MONTH", billingDuration: "P1M" }),
              },
              itemOffered: {
                "@type": isHardware ? "Product" : "Service",
                name: s.title,
                url: `${SITE.url}${s.href}`,
              },
            };
          }),
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "WCT Systems Digital Workplace",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Collaboration & Productivity Suite",
        operatingSystem: "Web, iOS, Android",
        description:
          "Digital Workplace tout-en-un pour PME françaises : messagerie, visio, documents, tâches, CRM et IA intégrée. Alternative française à Microsoft 365 & Slack, hébergée en France.",
        url: `${SITE.url}/services/digital-workplace`,
        inLanguage: ["fr-FR", "pt-PT"],
        offers: {
          "@type": "Offer",
          price: "199",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${SITE.url}/tarifs`,
        },
        provider: { "@id": `${SITE.url}#organization` },
        featureList: [
          "Digital Workplace gamifié (alternative Microsoft 365 & Slack)",
          "Site Web Moderne (Next.js + IA)",
          "Automatisation RPA & relances",
          "Intégration IA & chatbots",
          "Nixie Pulse — Dashboard KPI physique Made in France",
          "AIViz — Visibilité IA (ChatGPT, Perplexity, Claude, Gemini)",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE.url}#webpage`,
        url: SITE.url,
        name: "WCT Systems — Digital Workplace, IA & Automatisation pour PME",
        isPartOf: { "@id": `${SITE.url}#website` },
        primaryImageOfPage: `${SITE.url}/opengraph-image`,
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

      {/* Ambient background — subtle, Soft UI Evolution */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-gradient-to-b from-violet-50/70 via-background to-transparent dark:from-violet-950/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] -z-10 h-[560px] w-[720px] -translate-x-1/2 rounded-full bg-violet-400/20 blur-[120px] dark:bg-violet-500/10"
      />

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20 lg:py-28">
        {/* ── HERO ── */}
        <section className="relative">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-white/70 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-violet-700 shadow-sm backdrop-blur dark:border-violet-800/40 dark:bg-white/5 dark:text-violet-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-600" />
              </span>
              Alternative française · Hébergé en France · RGPD
            </div>
          </ScrollReveal>

          <div className="mt-6 grid gap-10 lg:mt-10 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-12">
            <div className="space-y-7">
              <ScrollReveal delay={80}>
                <h1
                  data-speakable
                  className="text-[clamp(2.2rem,6.4vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground"
                >
                  {"Le Digital Workplace français "}
                  <span className="font-serif-display text-violet-600 dark:text-violet-400">
                    qui remplace
                  </span>
                  {" vos 12 outils."}
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={160}>
                <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  <strong className="text-foreground">WCT Systems</strong> équipe les PME françaises avec un Digital Workplace souverain
                  et 5 solutions complémentaires : site web moderne, automatisation RPA, intégration IA,
                  Nixie Pulse et AIViz. Hébergé en France, à partir de{" "}
                  <strong className="text-foreground">199 €/mois</strong>.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={220}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <TrackedLink
                    href="/contact"
                    trackAs="hero_audit_primary"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(124,58,237,0.28)] ring-1 ring-violet-500/20 transition-all duration-200 hover:bg-violet-700 hover:shadow-[0_14px_36px_rgba(124,58,237,0.34)] focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-background"
                  >
                    Réserver l&apos;audit — 15 min
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </TrackedLink>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-surface px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:ring-offset-2 focus:ring-offset-background"
                  >
                    Explorer les 6 solutions
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={280}>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    V1 en 7–14 jours
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Sans engagement
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    RGPD & données en France
                  </span>
                </div>
              </ScrollReveal>
            </div>

            {/* Right column — stat bento */}
            <ScrollReveal delay={200} direction="right">
              <div className="grid gap-3 sm:grid-cols-2 lg:sticky lg:top-24">
                <ul
                  className="contents"
                  // TODO: i18n — add "home.aria_stats_list" key
                  aria-label="Statistiques clés"
                >
                  {[
                    { end: 6, suffix: "", label: "solutions intégrées", tone: "violet" },
                    { end: 14, suffix: " j.", label: "time to live", tone: "cyan" },
                    { end: 200, suffix: "+", label: "intégrations dispo.", tone: "amber" },
                    { end: 40, suffix: "h/mois", label: "économisées (moy.)", tone: "emerald" },
                  ].map((s) => (
                    <li
                      key={s.label}
                      className="bento-card surface-noise p-4 sm:p-5"
                    >
                      <p className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        <CountUp end={s.end} suffix={s.suffix} />
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                    </li>
                  ))}
                </ul>

                <div className="bento-card p-5 sm:col-span-2">
                  <p className="font-display text-sm font-semibold">Votre Workplace en 14 jours</p>
                  <ol className="mt-3 grid gap-2.5">
                    {[
                      { n: "01", t: "Audit", d: "Cartographie outils & process" },
                      { n: "02", t: "Configuration", d: "Pièces métier + connexions" },
                      { n: "03", t: "Gamification", d: "XP, badges + formation" },
                      { n: "04", t: "Go live", d: "Déploiement + KPI temps réel" },
                    ].map((step) => (
                      <li key={step.n} className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100 font-mono text-[11px] font-semibold text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
                          {step.n}
                        </span>
                        <div>
                          <p className="text-sm font-medium leading-tight">{step.t}</p>
                          <p className="text-xs text-muted-foreground">{step.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Trust strip — real logos in monochrome grayscale */}
          <ScrollReveal delay={320}>
            <div className="mt-14 border-y border-[var(--border-soft)] py-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Conforme · Hébergé en France · Technos partenaires
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4 sm:gap-x-10">
                {/* Compliance badges (text) */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/60 px-3 py-1 text-xs font-medium text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  RGPD
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/60 px-3 py-1 text-xs font-medium text-blue-800 dark:border-blue-800/50 dark:bg-blue-950/40 dark:text-blue-300">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Hébergé en France
                </span>

                {/* Real brand logos — grayscale for quiet trust-strip, brand color on hover */}
                <ul
                  className="flex flex-wrap items-center gap-x-7 gap-y-3 text-foreground/75 dark:text-foreground/60"
                  aria-label="Technologies partenaires"
                >
                  {[
                    { Logo: NextjsLogo, name: "Next.js" },
                    { Logo: VercelLogo, name: "Vercel" },
                    { Logo: StripeLogo, name: "Stripe" },
                    { Logo: SupabaseLogo, name: "Supabase" },
                    { Logo: NeonLogo, name: "Neon" },
                  ].map(({ Logo, name }) => (
                    <li
                      key={name}
                      className="transition duration-200 [&>svg]:grayscale [&>svg]:opacity-70 hover:[&>svg]:grayscale-0 hover:[&>svg]:opacity-100"
                    >
                      <Logo className="h-5 w-auto" title={name} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── POURQUOI ── */}
        <section className="mt-20 sm:mt-28" aria-label="Pourquoi un Digital Workplace">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                Pourquoi maintenant
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
                Le vrai coût des{" "}
                <span className="font-serif-display italic text-violet-600 dark:text-violet-400">
                  12 outils déconnectés
                </span>
              </h2>
              <p className="mt-3 text-muted-foreground">
                Les chiffres parlent d&apos;eux-mêmes. Et ils se traduisent en euros.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                end: 73,
                suffix: "%",
                sub: "des PME",
                v: "utilisent +5 outils non connectés",
                d: "Le Workplace les réunit dans un bureau virtuel unifié.",
              },
              {
                end: 6,
                suffix: "-9 mois",
                sub: "de salaire",
                v: "coût du turnover par départ",
                d: "La gamification engage les équipes et réduit le turnover.",
              },
              {
                end: 40,
                suffix: "%",
                sub: "du temps",
                v: "perdu en tâches admin",
                d: "L'automatisation intégrée libère du temps pour ce qui compte.",
              },
            ].map((x, i) => (
              <ScrollReveal key={x.sub} delay={i * 80}>
                <article className="bento-card p-6" data-speakable>
                  <p className="font-display text-4xl font-semibold tracking-[-0.03em] text-violet-600 dark:text-violet-400">
                    <CountUp end={x.end} suffix={x.suffix} />
                  </p>
                  <p className="mt-3 text-sm font-medium text-foreground">
                    {x.sub} {x.v}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {x.d}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── ÉCOSYSTÈME — BENTO ── */}
        <section className="mt-20 sm:mt-28" aria-label="Écosystème 6 solutions">
          <ScrollReveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                  L&apos;écosystème
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
                  6 solutions,{" "}
                  <span className="font-serif-display italic">un seul partenaire</span>
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Workplace, site, automatisation, IA, hardware KPI, visibilité IA. Chaque brique répond à un besoin PME précis.
                </p>
              </div>
              <Link
                href="/services"
                className="hidden items-center gap-1.5 self-start rounded-2xl border border-[var(--border-strong)] bg-surface px-4 py-2.5 text-sm font-medium transition hover:bg-muted sm:inline-flex"
              >
                Voir toutes les offres
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          {/* Bento grid: 1 col mobile, 2 cols sm, 4 cols lg — avoid dense md */}
          <div className="mt-10 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.href} delay={i * 60} className={s.bentoSpan}>
                <article className={`bento-card surface-noise relative flex h-full flex-col overflow-hidden p-6 ${s.bentoSpan}`}>
                  {/* Colored gradient accent */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${s.accent}`}
                  />

                  {s.badge && (
                    <span className="absolute right-5 top-5 inline-flex items-center rounded-full border border-[var(--border-strong)] bg-surface/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
                      {s.badge}
                    </span>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                      {s.title}
                    </h3>
                  </div>

                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>

                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-muted-foreground">à partir de</span>
                      <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
                        {s.price}&nbsp;€
                      </span>
                      <span className="text-xs text-muted-foreground">/mois</span>
                    </div>
                    <Link
                      href={s.href}
                      className="group/link inline-flex items-center gap-1 rounded-xl border border-[var(--border-strong)] bg-surface/80 px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-surface"
                      aria-label={`En savoir plus sur ${s.title}`}
                    >
                      Découvrir
                      <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              href="/services"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-surface px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Voir tous les services
            </Link>
          </div>
        </section>

        {/* ── ROI ── */}
        <section className="mt-20 sm:mt-28" aria-label="ROI">
          <ScrollReveal>
            <div className="bento-card surface-noise relative overflow-hidden p-8 sm:p-10 lg:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-400/15 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-indigo-400/10 blur-3xl"
              />

              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                Exemple de ROI
              </p>
              <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                Transformer du temps perdu en{" "}
                <span className="font-serif-display italic text-violet-600 dark:text-violet-400">
                  opportunités mesurables
                </span>
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  { label: "Hypothèse", value: "2 h/jour", detail: "de prospection manuelle automatisée" },
                  { label: "Gain", value: "~40 h/mois", detail: "récupérées (vendues ou réinvesties)" },
                  { label: "Impact", value: "+volume", detail: "traité = plus de chances de signatures" },
                ].map((x) => (
                  <div
                    key={x.label}
                    className="rounded-2xl border border-[var(--border-soft)] bg-surface/70 p-5 backdrop-blur"
                  >
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      {x.label}
                    </p>
                    <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em]">
                      {x.value}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{x.detail}</p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs text-muted-foreground">
                *Indication : le ROI dépend de votre offre, zone, saisonnalité et qualité du suivi.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ── PROCESS ── */}
        <section className="mt-20 sm:mt-28" aria-label="Process">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                Process
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
                Process simple,{" "}
                <span className="font-serif-display italic">résultats rapides</span>
              </h2>
              <p className="mt-3 text-muted-foreground">
                Audit → V1 → optimisation. Chaque étape produit quelque chose d&apos;utilisable.
              </p>
            </div>
          </ScrollReveal>

          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { s: "01", t: "Audit & plan", d: "3 priorités + KPI + plan d'exécution." },
              { s: "02", t: "V1 en production", d: "Un système simple qui tourne (prospects + suivi + relances)." },
              { s: "03", t: "Optimisation", d: "SEO, contenus, relances, dashboards : on scale." },
            ].map((x, i) => (
              <ScrollReveal key={x.s} delay={i * 80}>
                <li className="bento-card h-full p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 font-mono text-sm font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                    {x.s}
                  </span>
                  <p className="mt-4 font-display text-lg font-semibold">{x.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>

          <ScrollReveal delay={260}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/contact"
                trackAs="process_audit_cta"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(124,58,237,0.22)] transition hover:bg-violet-700 hover:shadow-[0_14px_36px_rgba(124,58,237,0.3)]"
              >
                Démarrer avec un audit
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </TrackedLink>
              <Link
                href="/llms.txt"
                className="inline-flex items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-surface px-6 py-3.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Lire llms.txt
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* ── SOCIAL PROOF ── */}
        <section className="mt-20 sm:mt-28" aria-label="Résultats PME">
          <ScrollReveal direction="up">
            <div className="bento-card surface-noise p-6 sm:p-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                    Résultats PME mesurés
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Cas anonymisés, chiffres réels.</p>
                </div>
                <Link
                  href="/cas-clients"
                  className="inline-flex items-center gap-1.5 self-start rounded-2xl border border-[var(--border-strong)] bg-surface px-4 py-2 text-sm font-medium transition hover:bg-muted"
                >
                  Voir les cas
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { value: "92%", label: "adoption Digital Workplace (ESN)" },
                  { value: "70%", label: "questions auto (chatbot e-commerce)" },
                  { value: "28 j.", label: "système complet déployé (cabinet comptable)" },
                  { value: "40 h", label: "économisées/mois (auto. facturation)" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-[var(--border-soft)] bg-surface p-4"
                  >
                    <div className="font-display text-2xl font-semibold tracking-[-0.02em]">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs leading-tight text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── TESTIMONIALS ── */}
        <TestimonialsBento />

        {/* ── BLOG ── */}
        {posts.length > 0 && (
          <section className="mt-20 sm:mt-28" aria-label="Derniers articles">
            <ScrollReveal>
              <div className="mb-8 flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                    Ressources
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
                    Derniers{" "}
                    <span className="font-serif-display italic">articles</span>
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
                >
                  Tous les articles →
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <ScrollReveal key={post.slug} direction="up" delay={i * 60}>
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
        )}

        {/* ── NIXIE PULSE HIGHLIGHT ── */}
        <section className="mt-20 sm:mt-28" aria-label="Nixie Pulse">
          <ScrollReveal>
            <div className="bento-card surface-noise relative overflow-hidden border-orange-200/60 bg-gradient-to-br from-orange-50/80 via-amber-50/40 to-transparent p-8 sm:p-10 dark:border-orange-800/30 dark:from-orange-950/20 dark:via-amber-950/10 dark:to-transparent">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl space-y-4">
                  <span className="inline-flex items-center rounded-full border border-orange-300/70 bg-orange-100/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-orange-800 backdrop-blur dark:border-orange-700 dark:bg-orange-950/60 dark:text-orange-300">
                    Hardware · Dashboard KPI physique
                  </span>
                  <h2 className="font-display text-3xl font-semibold tracking-[-0.02em]">
                    Nixie Pulse
                    <span className="mt-1 block text-lg font-normal text-muted-foreground">
                      Vos KPI, <span className="font-serif-display italic">gravés dans le verre</span>.
                    </span>
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Le premier dashboard KPI physique connecté au monde.
                    Tubes Nixie IN-14 soviétiques affichant vos données Stripe, Bitcoin, GitHub ou Analytics en temps réel.
                    Assemblé à la main en France.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {["Données temps réel", "8 sources", "Made in France"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-orange-100/80 px-3 py-1 text-xs text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 md:items-end">
                  <p className="font-display text-4xl font-semibold tracking-[-0.03em]">
                    990 <span className="text-lg font-normal text-muted-foreground">€</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Early Bird −20 % · Kickstarter oct. 2026
                  </p>
                  <Link
                    href="/services/nixie-pulse"
                    className="inline-flex items-center gap-2 rounded-2xl bg-orange-600 px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(234,88,12,0.22)] transition hover:bg-orange-700 hover:shadow-[0_14px_36px_rgba(234,88,12,0.3)]"
                  >
                    Découvrir Nixie Pulse
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-20 sm:mt-28" aria-label="FAQ">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                Questions fréquentes
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
                On répond{" "}
                <span className="font-serif-display italic">directement</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="mt-8 space-y-3">
            {FAQ.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 50}>
                <details
                  className="group bento-card overflow-hidden p-0 transition-all open:shadow-[var(--shadow-md)]"
                  data-speakable
                >
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

        {/* ── ESPACE CLIENT ── */}
        <section className="mt-20 sm:mt-28" aria-label="Espace client">
          <ScrollReveal>
            <div className="bento-card flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  Déjà client ?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Accédez à votre tableau de bord pour gérer vos prospects, suivre vos relances et piloter vos KPI.
                </p>
              </div>
              <Link
                href="/connexion"
                className="inline-flex items-center justify-center gap-2 self-start rounded-2xl border border-[var(--border-strong)] bg-surface px-6 py-3 text-sm font-medium shadow-sm transition hover:bg-muted sm:self-center sm:shrink-0"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Espace client
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="mt-20 sm:mt-28" aria-label="Appel à l'action">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[32px] border border-violet-200/50 bg-gradient-to-br from-violet-50 via-indigo-50/60 to-white p-10 text-center shadow-[var(--shadow-lg)] sm:p-14 dark:border-violet-500/20 dark:from-violet-950/50 dark:via-indigo-950/30 dark:to-background">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-400/15 blur-3xl" />

              <p className="relative text-[11px] font-medium uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
                Prêt à démarrer
              </p>
              <h2 className="relative mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-[2.75rem] sm:leading-[1.05]">
                Transformez votre façon de{" "}
                <span className="font-serif-display italic text-violet-600 dark:text-violet-400">
                  travailler
                </span>
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
                Audit rapide → plan clair → Workplace qui tourne en 14 jours. Ensuite on optimise.
              </p>
              <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <TrackedLink
                  href="/contact"
                  trackAs="audit_gratuit_cta_final"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 py-3.5 text-sm font-medium text-white shadow-[0_12px_36px_rgba(124,58,237,0.32)] transition-all duration-200 hover:bg-violet-700 hover:shadow-[0_16px_48px_rgba(124,58,237,0.4)]"
                >
                  Réserver l&apos;audit
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </TrackedLink>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-surface/80 px-8 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:bg-surface"
                >
                  Explorer les services
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </main>
  );
}
