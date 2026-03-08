import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — 4 SaaS IA & Automatisation pour PME | WCT Systems",
  description:
    "4 SaaS pour PME : Prospection IA, Site Web Moderne, Automatisation RPA, Intégration IA. Mise en place incluse, à partir de 79 € HT/mois. Audit gratuit.",
  alternates: { canonical: "/services" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const SERVICES = [
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
    a: "Non. On s\u2019adapte à votre existant (quand c\u2019est possible) et on simplifie plutôt que compliquer.",
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

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/70 via-background to-background dark:from-violet-950/30" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* HERO */}
        <section className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            4 SaaS &bull; IA &bull; Automatisation &bull; PME
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            4 SaaS pour PME.
            <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              Un système complet.
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground">
            Prospection, site web, automatisation et IA : chaque SaaS résout un problème précis.
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

        {/* GRID */}
        <section className="mt-14 grid gap-6 md:grid-cols-2" aria-label="Nos 4 SaaS">
          {SERVICES.map((s) => (
            <article
              key={s.id}
              className={`group relative flex flex-col rounded-3xl border p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                "badge" in s && s.badge
                  ? "border-violet-300 bg-linear-to-br from-violet-50/80 to-indigo-50/60 dark:border-violet-700 dark:from-violet-950/40 dark:to-indigo-950/20 dark:hover:border-violet-500/20 dark:hover:bg-white/[0.06] dark:hover:shadow-lg dark:hover:shadow-violet-500/5"
                  : "border-border/60 bg-background/60 hover:border-violet-200 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-violet-500/20 dark:hover:bg-white/[0.06] dark:hover:shadow-lg dark:hover:shadow-violet-500/5"
              }`}
            >
              {"badge" in s && s.badge && (
                <div className="absolute -top-3 left-6 rounded-full bg-violet-600 px-3 py-0.5 text-xs font-medium text-white shadow-sm">
                  {s.badge}
                </div>
              )}

              <header className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold tracking-tight">{s.name}</h2>
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
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          ))}
        </section>

        {/* PACKS TEASER */}
        <section className="mt-16" aria-label="Packs combinés">
          <div className="rounded-3xl border bg-muted/40 p-8 text-center dark:border-white/[0.06] dark:bg-violet-500/[0.04]">
            <h2 className="text-2xl font-semibold tracking-tight">Combinez et économisez</h2>
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

        {/* FAQ */}
        <section className="mt-16" aria-label="FAQ">
          <h2 className="text-2xl font-semibold tracking-tight">Questions fréquentes</h2>
          <div className="mt-6 space-y-4">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-3xl border bg-background p-6 transition hover:bg-muted dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06] dark:hover:border-violet-500/15"
              >
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20" aria-label="Appel à l'action">
          <div className="rounded-3xl border bg-linear-to-br from-violet-50 to-indigo-50/80 p-10 text-center shadow-sm dark:from-violet-950/40 dark:to-indigo-950/30 dark:border-violet-500/20 dark:shadow-lg dark:shadow-violet-500/10">
            <h2 className="text-3xl font-semibold tracking-tight">On démarre par l&apos;audit</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              15–30 minutes, puis un plan clair : quel SaaS en premier, quels KPI suivre, et comment l&apos;exécuter.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              Réserver l&apos;audit
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
