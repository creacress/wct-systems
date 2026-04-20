import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { TrackedLink } from "@/components/site/tracked-link";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: "Services — 6 Solutions Digital Workplace, Automatisation & IA pour PME",
    description:
      "6 solutions pour PME : Digital Workplace, Site Web Moderne, Automatisation RPA, Intégration IA, Nixie Pulse et AIViz. À partir de 29 € HT/mois. Audit gratuit.",
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/servicos" : "/services"}`,
      languages: {
        fr: `${siteUrl}/services`,
        "pt-PT": `${siteUrl}/pt/servicos`,
        "x-default": `${siteUrl}/services`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type ServiceAccent = "cyan" | "sky" | "amber" | "fuchsia" | "orange" | "violet";

type ServiceItem = {
  id: string;
  href: string;
  name: string;
  short: string;
  price: string;
  bullets: readonly string[];
  accent: ServiceAccent;
  bentoSpan: string;
  badge?: string;
};

const SERVICES: readonly ServiceItem[] = [
  {
    id: "digital-workplace",
    href: "/services/digital-workplace",
    name: "Digital Workplace",
    badge: "Nouveau",
    short: "Un bureau virtuel gamifié où chaque pièce est un outil métier.",
    price: "199",
    accent: "cyan",
    bentoSpan: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    bullets: [
      "Bureau virtuel avec pièces thématiques",
      "Gamification : XP, badges, classements",
      "Messagerie temps réel + visio",
      "Dashboard KPI par équipe",
      "Intégration 200+ outils existants",
    ],
  },
  {
    id: "integration-ia",
    href: "/services/integration-ia",
    name: "Intégration IA",
    badge: "Populaire",
    short: "Chatbot, agents IA et assistants sur mesure connectés à vos données.",
    price: "199",
    accent: "fuchsia",
    bentoSpan: "sm:col-span-2 lg:col-span-2",
    bullets: [
      "Chatbot IA (site + WhatsApp)",
      "Agents IA métier (vente, support, RH)",
      "Connexion à vos outils existants",
      "Réponses basées sur vos données (RAG)",
      "Formation équipe incluse (1h/mois)",
    ],
  },
  {
    id: "site-web",
    href: "/services/site-web-moderne",
    name: "Site Web Moderne",
    short: "Rapide, SEO + SEO IA, pensé pour convertir. 4 templates, 14 jours.",
    price: "99",
    accent: "sky",
    bentoSpan: "lg:col-span-1",
    bullets: [
      "5 à 10 pages optimisées conversion",
      "SEO classique + SEO IA (JSON-LD, llms.txt)",
      "Mobile-first, perfs A+",
      "4 templates personnalisables",
      "Maintenance & hébergement inclus",
    ],
  },
  {
    id: "automatisation",
    href: "/services/automatiser-relances",
    name: "Automatisation RPA",
    short: "Relances, CRM, reporting, facturation. Sans coder.",
    price: "149",
    accent: "amber",
    bentoSpan: "lg:col-span-1",
    bullets: [
      "Workflows sur mesure (relances, CRM, facturation)",
      "200+ intégrations (Gmail, Notion, HubSpot…)",
      "Dashboard KPI temps réel",
      "Alertes et notifications auto",
      "Support & maintenance inclus",
    ],
  },
  {
    id: "nixie-pulse",
    href: "/services/nixie-pulse",
    name: "Nixie Pulse",
    badge: "Hardware",
    short: "Dashboard KPI physique. Tubes Nixie IN-14 soviétiques, temps réel, Made in France.",
    price: "990",
    accent: "orange",
    bentoSpan: "sm:col-span-2 lg:col-span-2",
    bullets: [
      "Tubes Nixie IN-14 authentiques (NOS, URSS 1970-90)",
      "Stripe, Bitcoin, GitHub, Analytics…",
      "WiFi + interface web",
      "4 gammes : Mini, Standard, Pro, Double",
      "Assemblé à la main en France",
    ],
  },
  {
    id: "aiviz",
    href: "/services/aiviz",
    name: "AIViz",
    badge: "Nouveau",
    short: "Visibilité dans ChatGPT, Perplexity, Claude, Gemini. Score, gaps, rapports.",
    price: "29",
    accent: "violet",
    bentoSpan: "sm:col-span-2 lg:col-span-2",
    bullets: [
      "Scans multi-LLM (4 moteurs)",
      "Score 0-100 pondéré",
      "Détection citation gaps",
      "Rapports PDF mensuels",
      "Alertes email",
    ],
  },
];

const FAQ = [
  {
    q: "Par quoi commencer ?",
    a: "On commence par un audit gratuit (15–30 min). Ensuite on identifie la solution la plus impactante pour votre situation et on lance une V1 rapidement.",
  },
  {
    q: "Je peux prendre un seul service sans pack ?",
    a: "Oui. Chaque solution est disponible individuellement. Les packs permettent d'économiser 10 à 25 %.",
  },
  {
    q: "Est-ce adapté à une petite entreprise ?",
    a: "Oui. L'objectif est de simplifier votre quotidien et d'augmenter vos résultats sans ajouter de complexité. Tarifs dès 29 €/mois.",
  },
  {
    q: "Est-ce que je dois changer tous mes outils ?",
    a: "Non. Le Digital Workplace centralise vos outils existants (Notion, Slack, Google…) dans un bureau virtuel unifié. On s'adapte à votre existant.",
  },
] as const;

const ACCENT_STYLES: Record<ServiceAccent, { gradient: string; check: string; chip: string }> = {
  cyan: {
    gradient: "from-cyan-500/10 via-teal-500/5 to-transparent",
    check: "text-cyan-600 dark:text-cyan-400",
    chip: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  },
  sky: {
    gradient: "from-sky-500/10 via-indigo-500/5 to-transparent",
    check: "text-sky-600 dark:text-sky-400",
    chip: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  },
  amber: {
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    check: "text-amber-600 dark:text-amber-400",
    chip: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  fuchsia: {
    gradient: "from-fuchsia-500/10 via-purple-500/5 to-transparent",
    check: "text-fuchsia-600 dark:text-fuchsia-400",
    chip: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300",
  },
  orange: {
    gradient: "from-orange-500/10 via-amber-500/5 to-transparent",
    check: "text-orange-600 dark:text-orange-400",
    chip: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  },
  violet: {
    gradient: "from-violet-500/10 via-indigo-500/5 to-transparent",
    check: "text-violet-600 dark:text-violet-400",
    chip: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        ],
      },
      {
        "@type": "ItemList",
        name: "Services WCT Systems",
        numberOfItems: SERVICES.length,
        itemListElement: SERVICES.map((s, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: s.name,
          url: `${SITE_URL}${s.href}`,
        })),
      },
      ...SERVICES.map((s) => ({
        "@type": "Service",
        name: s.name,
        description: s.short,
        provider: { "@type": "Organization", name: "WCT Systems", url: SITE_URL },
        areaServed: { "@type": "Country", name: "France" },
        url: `${SITE_URL}${s.href}`,
        offers: {
          "@type": "Offer",
          price: s.price,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/tarifs`,
        },
      })),
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "WebPage",
        url: `${SITE_URL}/services`,
        name: "Services — WCT Systems",
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

      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-violet-50/70 via-background to-transparent dark:from-violet-950/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-8%] -z-10 h-[480px] w-[640px] -translate-x-1/2 rounded-full bg-violet-400/15 blur-[120px] dark:bg-violet-500/10"
      />

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20 lg:py-24">
        {/* HERO */}
        <section>
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-white/70 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-violet-700 shadow-sm backdrop-blur dark:border-violet-800/40 dark:bg-white/5 dark:text-violet-300">
              6 solutions · SaaS · IA · Hardware
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1
              data-speakable
              className="mt-6 text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
            >
              6 solutions pour PME.{" "}
              <span className="font-serif-display italic text-violet-600 dark:text-violet-400">
                Du digital au physique.
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Digital Workplace, site web, automatisation, IA, Nixie Pulse (dashboard KPI physique) et AIViz (visibilité IA).
              À la carte ou en pack. Hébergé en France, RGPD natif.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedLink
                href="/contact"
                trackAs="services_hero_audit"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(124,58,237,0.28)] ring-1 ring-violet-500/20 transition-all duration-200 hover:bg-violet-700 hover:shadow-[0_14px_36px_rgba(124,58,237,0.34)] focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-background"
              >
                Réserver un audit gratuit
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </TrackedLink>
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-surface px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:ring-offset-2 focus:ring-offset-background"
              >
                Voir les tarifs
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* BENTO SERVICES GRID */}
        <section className="mt-14 sm:mt-20" aria-label="Nos 6 solutions">
          <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => {
              const styles = ACCENT_STYLES[s.accent];
              return (
                <ScrollReveal key={s.id} delay={i * 60} className={s.bentoSpan}>
                  <article className={`bento-card surface-noise relative flex h-full flex-col overflow-hidden p-6 sm:p-7 ${s.bentoSpan}`}>
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${styles.gradient}`}
                    />

                    {s.badge && (
                      <span className={`absolute right-5 top-5 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${styles.chip}`}>
                        {s.badge}
                      </span>
                    )}

                    <header>
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                          {s.name}
                        </h2>
                      </div>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                        {s.short}
                      </p>
                    </header>

                    <ul className="mt-5 grow space-y-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/85">
                          <svg
                            className={`mt-0.5 h-4 w-4 shrink-0 ${styles.check}`}
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
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <footer className="mt-6 flex items-end justify-between gap-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-muted-foreground">à partir de</span>
                        <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
                          {s.price}&nbsp;€
                        </span>
                        <span className="text-xs text-muted-foreground">/mois</span>
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <Link
                          href={s.href}
                          className="inline-flex items-center gap-1 rounded-xl border border-[var(--border-strong)] bg-surface/80 px-3 py-1.5 text-xs font-medium transition hover:bg-surface"
                        >
                          Détails
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                        <TrackedLink
                          href={`/contact?service=${encodeURIComponent(s.id)}`}
                          trackAs={`service_${s.id}_start`}
                          className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-700"
                        >
                          Démarrer
                        </TrackedLink>
                      </div>
                    </footer>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* PACKS TEASER */}
        <section className="mt-20 sm:mt-28" aria-label="Packs combinés">
          <ScrollReveal>
            <div className="bento-card surface-noise relative overflow-hidden p-8 text-center sm:p-12">
              <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-violet-400/15 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />

              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                Combinez
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] sm:text-[2rem]">
                Prenez plusieurs solutions,{" "}
                <span className="font-serif-display italic">économisez jusqu&apos;à 25 %</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
                Packs Starter, Business et Scale. La tarification à la carte reste disponible.
              </p>
              <Link
                href="/tarifs#packs"
                className="mt-7 inline-flex items-center gap-2 rounded-2xl border border-[var(--border-strong)] bg-surface px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Voir les packs
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* FAQ */}
        <section className="mt-20 sm:mt-28" aria-label="FAQ">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                Questions fréquentes
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
                Tout savoir{" "}
                <span className="font-serif-display italic">avant de commencer</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="mt-8 space-y-3">
            {FAQ.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 50}>
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
        <section className="mt-20 sm:mt-28" aria-label="Appel à l'action">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[32px] border border-violet-200/50 bg-gradient-to-br from-violet-50 via-indigo-50/60 to-white p-10 text-center shadow-[var(--shadow-lg)] sm:p-14 dark:border-violet-500/20 dark:from-violet-950/50 dark:via-indigo-950/30 dark:to-background">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-400/15 blur-3xl" />

              <p className="relative text-[11px] font-medium uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
                Prêt à démarrer
              </p>
              <h2 className="relative mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.05]">
                On démarre par{" "}
                <span className="font-serif-display italic text-violet-600 dark:text-violet-400">
                  l&apos;audit
                </span>
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
                15–30 minutes, puis un plan clair : quelle solution en premier, quels KPI suivre, et comment l&apos;exécuter.
              </p>
              <TrackedLink
                href="/contact"
                trackAs="services_final_audit"
                className="relative mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 py-3.5 text-sm font-medium text-white shadow-[0_12px_36px_rgba(124,58,237,0.32)] transition-all duration-200 hover:bg-violet-700 hover:shadow-[0_16px_48px_rgba(124,58,237,0.4)]"
              >
                Réserver l&apos;audit
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </TrackedLink>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </main>
  );
}
