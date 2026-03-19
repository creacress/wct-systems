import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";

export const metadata: Metadata = {
  title: "Services — 6 SaaS Digital Workplace & IA pour PME | WCT Systems",
  description:
    "6 SaaS pour PME : Digital Workplace gamifié, Prospection IA, Site Web Moderne, Automatisation RPA, Intégration IA, Q2C Facturation SaaS. Mise en place incluse, à partir de 79 € HT/mois. Audit gratuit.",
  alternates: { canonical: "/services" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const SERVICES = [
  {
    id: "digital-workplace",
    href: "/services/digital-workplace",
    name: "Digital Workplace",
    badge: "Nouveau",
    short: "Un bureau virtuel gamifié où chaque pièce est un outil métier.",
    price: "199",
    bullets: [
      "Bureau virtuel avec pièces thématiques",
      "Gamification : XP, badges, classements",
      "Messagerie temps réel + visio",
      "Dashboard KPI par équipe",
      "Intégration 200+ outils existants",
    ],
  },
  {
    id: "prospection-ia",
    href: "/services/trouver-prospects",
    name: "Prospection IA",
    short: "Trouvez vos futurs clients grâce à l\u2019IA. Ciblage, enrichissement, intégration CRM.",
    price: "99",
    bullets: [
      "Ciblage IA par secteur et zone géo",
      "Enrichissement automatique (email, LinkedIn, téléphone)",
      "Scoring des leads par IA",
      "Intégration CRM / tableur automatique",
      "Base mise à jour en continu",
    ],
  },
  {
    id: "site-web",
    href: "/services/site-web-moderne",
    name: "Site Web Moderne",
    short: "Un site rapide, SEO + SEO IA, pensé pour convertir. 4 templates, livré en 14 jours.",
    price: "99",
    bullets: [
      "5 à 10 pages optimisées conversion",
      "SEO classique + SEO IA (JSON-LD, llms.txt)",
      "Mobile-first, performances A+",
      "4 templates personnalisables",
      "Maintenance & hébergement inclus",
    ],
  },
  {
    id: "automatisation",
    href: "/services/automatiser-relances",
    name: "Automatisation (RPA)",
    short: "Automatisez vos process : relances, CRM, reporting, facturation. Sans coder.",
    price: "149",
    bullets: [
      "Workflows sur mesure (relances, CRM, facturation)",
      "Intégration 200+ outils (Gmail, Notion, HubSpot\u2026)",
      "Dashboard KPI en temps réel",
      "Alertes et notifications automatiques",
      "Support & maintenance inclus",
    ],
  },
  {
    id: "integration-ia",
    href: "/services/integration-ia",
    name: "Intégration IA",
    badge: "Populaire",
    short: "Intégrez l\u2019IA dans votre quotidien : chatbot, agents, assistants sur mesure.",
    price: "199",
    bullets: [
      "Chatbot IA pour votre site / WhatsApp",
      "Agents IA métier (vente, support, RH)",
      "Connexion à vos outils existants",
      "Réponses basées sur vos données (RAG)",
      "Formation équipe incluse (1h/mois)",
    ],
  },
  {
    id: "q2c-facturation",
    href: "/services/q2c-facturation",
    name: "Q2C — Facturation SaaS",
    badge: "Nouveau",
    short: "Facturation électronique conforme 2026 pour SaaS B2B. Devis, contrats, abonnements, Factur-X, TVA OSS.",
    price: "149",
    bullets: [
      "Factur-X + UBL + CII (3 formats réglementaires)",
      "Cycle complet devis → paiement",
      "TVA OSS 30 pays + validation VIES",
      "Connecteur Plateforme Agréée",
      "Dashboard MRR/ARR + IFRS 15",
    ],
  },
] as const;

const FAQ = [
  {
    q: "Par quoi commencer ?",
    a: "On commence par un audit gratuit (15-30 min). Ensuite on identifie le SaaS le plus impactant pour votre situation et on lance une V1 rapidement.",
  },
  {
    q: "Je peux prendre un seul service sans pack ?",
    a: "Oui. Chaque SaaS est disponible individuellement. Les packs permettent d\u2019économiser 10 à 25 %.",
  },
  {
    q: "Est-ce adapté à une petite entreprise ?",
    a: "Oui. L\u2019objectif est de simplifier votre quotidien et d\u2019augmenter vos demandes sans ajouter de complexité.",
  },
  {
    q: "Est-ce que je dois changer tous mes outils ?",
    a: "Non. Le Digital Workplace centralise vos outils existants (Notion, Slack, Google…) dans un bureau virtuel unifié. On s\u2019adapte à votre existant.",
  },
] as const;

/* Per-service color schemes */
const SERVICE_COLORS = [
  /* 0 — Digital Workplace */
  {
    card: "bg-gradient-to-br from-cyan-50/40 to-teal-50/20 dark:from-cyan-500/[0.04] dark:to-teal-500/[0.02]",
    border: "border-cyan-200/60 hover:border-cyan-400/50 dark:border-cyan-700/30 dark:hover:border-cyan-500/20",
    check: "text-cyan-600 dark:text-cyan-400",
    badge: "bg-cyan-600",
  },
  /* 1 — Prospection IA */
  {
    card: "bg-gradient-to-br from-emerald-50/40 to-green-50/20 dark:from-emerald-500/[0.04] dark:to-green-500/[0.02]",
    border: "border-emerald-200/60 hover:border-emerald-400/50 dark:border-emerald-700/30 dark:hover:border-emerald-500/20",
    check: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-600",
  },
  /* 2 — Site Web Moderne */
  {
    card: "bg-gradient-to-br from-sky-50/40 to-indigo-50/20 dark:from-sky-500/[0.04] dark:to-indigo-500/[0.02]",
    border: "border-sky-200/60 hover:border-sky-400/50 dark:border-sky-700/30 dark:hover:border-sky-500/20",
    check: "text-sky-600 dark:text-sky-400",
    badge: "bg-sky-600",
  },
  /* 3 — Automatisation */
  {
    card: "bg-gradient-to-br from-amber-50/40 to-orange-50/20 dark:from-amber-500/[0.04] dark:to-orange-500/[0.02]",
    border: "border-amber-200/60 hover:border-amber-400/50 dark:border-amber-700/30 dark:hover:border-amber-500/20",
    check: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-600",
  },
  /* 4 — Intégration IA */
  {
    card: "bg-gradient-to-br from-fuchsia-50/40 to-purple-50/20 dark:from-fuchsia-500/[0.04] dark:to-purple-500/[0.02]",
    border: "border-fuchsia-200/60 hover:border-fuchsia-400/50 dark:border-fuchsia-700/30 dark:hover:border-fuchsia-500/20",
    check: "text-fuchsia-600 dark:text-fuchsia-400",
    badge: "bg-fuchsia-600",
  },
  /* 5 — Q2C Facturation SaaS */
  {
    card: "bg-gradient-to-br from-emerald-50/40 to-teal-50/20 dark:from-emerald-500/[0.04] dark:to-teal-500/[0.02]",
    border: "border-emerald-200/60 hover:border-emerald-400/50 dark:border-emerald-700/30 dark:hover:border-emerald-500/20",
    check: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-600",
  },
] as const;

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_URL}/services`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Services WCT Systems",
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
        provider: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
        areaServed: {
          "@type": "Country",
          name: "France",
        },
        url: `${SITE_URL}${s.href}`,
      })),
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

      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/50 via-background to-background dark:from-violet-950/20" />

      {/* Dot grid overlay */}
      <GridPattern variant="dot" color="rgba(139, 92, 246, 0.05)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        {/* HERO */}
        <ScrollReveal direction="up" delay={0}>
          <section className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
              6 SaaS &bull; Digital Workplace &bull; IA &bull; PME
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              6 SaaS pour PME.
              <span className="block bg-gradient-to-r from-violet-600 via-cyan-500 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-cyan-400 dark:to-indigo-400">
                Un écosystème complet.
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              Digital Workplace, prospection, site web, automatisation et IA : chaque SaaS résout un problème précis.
              Prenez-les individuellement ou combinez-les en pack pour un système complet.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Réserver un audit gratuit
              </Link>
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted dark:border-white/[0.12]"
              >
                Voir les tarifs
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* GRID */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-14 grid gap-6 md:grid-cols-2" aria-label="Nos 6 SaaS">
            {SERVICES.map((s, i) => {
              const colors = SERVICE_COLORS[i];
              return (
                <ScrollReveal key={s.id} direction="up" delay={120 + i * 80}>
                  <article
                    className={`group relative flex h-full flex-col rounded-3xl border p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${colors.card} ${colors.border} ${
                      i === 0 ? "md:col-span-2" : ""
                    }`}
                  >
                    {"badge" in s && s.badge && (
                      <div
                        className={`absolute -top-3 left-6 rounded-full px-3 py-0.5 text-xs font-medium text-white shadow-sm ${colors.badge}`}
                      >
                        {s.badge}
                      </div>
                    )}

                    <header className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h2 className="font-display font-bold text-xl tracking-tight">{s.name}</h2>
                        <div className="text-right">
                          <span className="text-2xl font-semibold tracking-tight">{s.price}&nbsp;&euro;</span>
                          <span className="text-xs text-muted-foreground"> HT/mois</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{s.short}</p>
                    </header>

                    <ul className="mt-5 grow space-y-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <svg
                            className={`mt-0.5 h-4 w-4 shrink-0 ${colors.check}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="relative z-10 mt-6 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={s.href}
                        className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium transition hover:bg-muted dark:border-white/[0.12]"
                      >
                        En savoir plus
                      </Link>
                      <Link
                        href={`/contact?service=${encodeURIComponent(s.id)}`}
                        className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-700"
                      >
                        Démarrer
                      </Link>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </section>
        </ScrollReveal>

        {/* PACKS TEASER */}
        <ScrollReveal direction="up" delay={150}>
          <section className="mt-16" aria-label="Packs combinés">
            <div className="rounded-3xl border bg-gradient-to-br from-violet-50/60 via-indigo-50/30 to-background p-8 text-center dark:border-white/[0.06] dark:from-violet-500/[0.05] dark:via-indigo-500/[0.03] dark:to-transparent">
              <h2 className="font-display font-bold text-2xl tracking-tight">Combinez et économisez</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Packs Starter, Business et Scale : de -10% à -25% vs à la carte.
              </p>
              <Link
                href="/tarifs#packs"
                className="mt-6 inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted dark:border-white/[0.12]"
              >
                Voir les packs
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-16" aria-label="FAQ">
            <h2 className="font-display font-bold text-2xl tracking-tight">Questions fréquentes</h2>
            <div className="mt-6 space-y-4">
              {FAQ.map((f, i) => (
                <ScrollReveal key={f.q} direction="up" delay={i * 60}>
                  <details className="group rounded-3xl border bg-background p-6 transition hover:bg-muted open:shadow-md dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06] dark:hover:border-violet-500/15 dark:open:shadow-violet-500/10">
                    <summary className="cursor-pointer font-medium">{f.q}</summary>
                    <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" delay={120}>
          <section className="mt-20" aria-label="Appel à l'action">
            <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-violet-50 via-indigo-50/80 to-cyan-50/50 p-10 text-center shadow-sm dark:border-violet-500/20 dark:from-violet-950/40 dark:via-indigo-950/30 dark:to-cyan-950/20 dark:shadow-lg dark:shadow-violet-500/10">
              {/* Decorative orbs */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-500/10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/10 blur-2xl dark:bg-indigo-500/10"
              />

              <h2 className="relative font-display font-bold text-3xl tracking-tight">
                On démarre par l&apos;audit
              </h2>
              <p className="relative mt-4 text-sm text-muted-foreground">
                15–30 minutes, puis un plan clair : quel SaaS en premier, quels KPI suivre, et comment l&apos;exécuter.
              </p>
              <Link
                href="/contact"
                className="relative mt-8 inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Réserver l&apos;audit
              </Link>
            </div>
          </section>
        </ScrollReveal>

      </div>
    </main>
  );
}
