import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WCT Systems — Digital Workplace & IA pour PME",
  description:
    "WCT Systems conçoit le Digital Workplace des PME : bureau virtuel gamifié + Prospection IA, Site Web, Automatisation, Intégration IA. 5 SaaS, un écosystème. Audit gratuit.",
  alternates: { canonical: "/" },
};

const SITE = {
  name: "WCT Systems",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Digital Workplace & IA pour PME",
  sameAs: [] as string[],
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

const SERVICES = [
  {
    href: "/services/digital-workplace",
    title: "Digital Workplace",
    desc: "Bureau virtuel gamifié où chaque pièce est un outil métier. XP, badges, classements. À partir de 199 €/mois.",
    bullets: ["Bureau virtuel", "Gamification", "200+ intégrations"],
    badge: "Nouveau",
  },
  {
    href: "/services/trouver-prospects",
    title: "Prospection IA",
    desc: "Ciblage IA, enrichissement automatique, intégration CRM. À partir de 99 €/mois.",
    bullets: ["Ciblage IA", "Enrichissement", "Scoring leads"],
  },
  {
    href: "/services/site-web-moderne",
    title: "Site Web Moderne",
    desc: "Site rapide, SEO + SEO IA, 4 templates. Livré en 14 jours. À partir de 99 €/mois.",
    bullets: ["SEO + SEO IA", "4 templates", "Perf A+"],
  },
  {
    href: "/services/automatiser-relances",
    title: "Automatisation (RPA)",
    desc: "Workflows sur mesure : relances, CRM, reporting, dashboard KPI. À partir de 149 €/mois.",
    bullets: ["200+ outils", "Dashboard KPI", "Alertes auto"],
  },
  {
    href: "/services/integration-ia",
    title: "Intégration IA",
    desc: "Chatbot, agents IA, assistants sur mesure connectés à vos données. À partir de 199 €/mois.",
    bullets: ["Chatbot IA", "Agents métier", "RAG données"],
  },
] as const;

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
        description: "Digital Workplace & IA pour PME françaises. 5 SaaS, un écosystème.",
        sameAs: SITE.sameAs,
      },
      {
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.url,
        description: "Digital Workplace gamifié + IA + automatisation pour PME. 5 SaaS, un écosystème.",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE.url}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
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
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/70 via-background to-background dark:from-violet-950/30" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* HERO */}
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
              Digital Workplace &bull; IA &bull; Automatisation &bull; Gamification
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Votre bureau digital.
              <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
                Tout-en-un, gamifié, piloté par l&apos;IA.
              </span>
            </h1>

            {/* LLM-friendly, client-friendly positioning */}
            <p className="max-w-2xl text-lg text-muted-foreground">
              <strong>WCT Systems</strong> conçoit le Digital Workplace des PME françaises :
              un bureau virtuel gamifié + 4 SaaS (<strong>Prospection IA, Site Web, Automatisation, Intégration IA</strong>).
              Chaque pièce est un outil métier. Le travail devient un jeu.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/services/digital-workplace"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Découvrir le Workplace
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Voir tous les services
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 text-sm text-muted-foreground">
              <div className="rounded-3xl border bg-background/60 p-4 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide">Digital Workplace</p>
                <p className="mt-2">Bureau virtuel tout-en-un</p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-4 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide">Gamification</p>
                <p className="mt-2">Engagement x3 pour vos équipes</p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-4 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide">IA intégrée</p>
                <p className="mt-2">Automatisations intelligentes</p>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
            <p className="text-sm font-medium">Votre Workplace en 14 jours</p>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="rounded-2xl border bg-background p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
                <p className="font-medium">1) Audit de vos outils actuels</p>
                <p className="mt-1 text-muted-foreground">Cartographie des outils, process et pain points.</p>
              </div>
              <div className="rounded-2xl border bg-background p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
                <p className="font-medium">2) Configuration des pièces métier</p>
                <p className="mt-1 text-muted-foreground">Pièces thématiques + connexion de vos outils.</p>
              </div>
              <div className="rounded-2xl border bg-background p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
                <p className="font-medium">3) Gamification &amp; onboarding</p>
                <p className="mt-1 text-muted-foreground">XP, badges, classements + formation équipe.</p>
              </div>
              <div className="rounded-2xl border bg-background p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
                <p className="font-medium">4) Go live + optimisation</p>
                <p className="mt-1 text-muted-foreground">Déploiement, KPI en temps réel, itérations.</p>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border bg-muted p-4 text-sm dark:border-violet-500/10 dark:bg-violet-500/[0.06]">
              <p className="font-medium">Promesse</p>
              <p className="mt-1 text-muted-foreground">Un bureau digital qui tourne en 14 jours. Pas du blabla.</p>
            </div>
          </div>
        </section>

        {/* POURQUOI UN DIGITAL WORKPLACE */}
        <section className="mt-16" aria-label="Pourquoi un Digital Workplace">
          <h2 className="text-2xl font-semibold tracking-tight">Pourquoi un Digital Workplace ?</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Les chiffres parlent d&apos;eux-mêmes.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                k: "73% des PME",
                v: "utilisent +5 outils non connectés",
                d: "Le Workplace les réunit dans un bureau virtuel unifié.",
              },
              {
                k: "6-9 mois de salaire",
                v: "coût du turnover par départ",
                d: "La gamification engage les équipes et réduit le turnover.",
              },
              {
                k: "40% du temps",
                v: "perdu en tâches admin",
                d: "L'automatisation intégrée libère du temps pour ce qui compte.",
              },
            ].map((x) => (
              <div
                key={x.k}
                className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-violet-500/20 dark:hover:bg-white/[0.06] dark:hover:shadow-lg dark:hover:shadow-violet-500/5"
              >
                <p className="text-xl font-semibold tracking-tight">{x.k}</p>
                <p className="mt-1 text-sm font-medium">{x.v}</p>
                <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ÉCOSYSTÈME 5 SAAS */}
        <section className="mt-20" aria-label="Écosystème">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">L&apos;écosystème 5 SaaS</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Un Digital Workplace + 4 briques IA &amp; automatisation. Chaque service a sa page dédiée.
              </p>
            </div>
            <Link
              href="/services"
              className="hidden rounded-2xl border px-4 py-2 text-sm font-medium transition hover:bg-muted sm:inline-flex"
            >
              Tout voir
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <article
                key={s.href}
                className={`rounded-3xl border p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                  i === 0
                    ? "md:col-span-2 border-violet-300 bg-linear-to-br from-violet-50/80 to-indigo-50/60 dark:border-violet-700 dark:from-violet-950/40 dark:to-indigo-950/20 dark:hover:border-violet-500/20 dark:hover:bg-white/[0.06] dark:hover:shadow-lg dark:hover:shadow-violet-500/5"
                    : "bg-background/60 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-violet-500/20 dark:hover:bg-white/[0.06] dark:hover:shadow-lg dark:hover:shadow-violet-500/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                  {"badge" in s && s.badge && (
                    <span className="rounded-full bg-violet-600 px-2.5 py-0.5 text-xs font-medium text-white">
                      {s.badge}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="rounded-2xl border bg-background px-3 py-2 dark:border-white/[0.06] dark:bg-white/[0.03]">
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={s.href}
                    className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                  >
                    Voir la page
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-700"
                  >
                    Demander un audit
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              href="/services"
              className="inline-flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-sm font-medium transition hover:bg-muted"
            >
              Voir tous les services
            </Link>
          </div>
        </section>

        {/* ROI */}
        <section className="mt-20" aria-label="ROI">
          <div className="rounded-3xl border bg-muted p-8 dark:border-white/[0.06] dark:bg-violet-500/[0.04]">
            <h2 className="text-2xl font-semibold tracking-tight">Exemple de ROI (simple)</h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Transformer du temps perdu en opportunités mesurables. Exemple indicatif pour une PME.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Hypothèse</p>
                <p className="mt-2 text-sm text-muted-foreground">2h/jour de prospection manuelle → automatisée</p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Gain</p>
                <p className="mt-2 text-sm text-muted-foreground">~40h/mois récupérées (vendues ou réinvesties)</p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Impact</p>
                <p className="mt-2 text-sm text-muted-foreground">+ volume traité → + chances de signatures</p>
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              *Indication : le ROI dépend de votre offre, zone, saisonnalité et qualité du suivi.
            </p>
          </div>
        </section>

        {/* PROCESS */}
        <section className="mt-20" aria-label="Process">
          <h2 className="text-2xl font-semibold tracking-tight">Process simple, résultats rapides</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            On avance en itérations courtes : audit → V1 → optimisation. Chaque étape produit quelque chose d&apos;utilisable.
          </p>

          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                s: "Étape 1",
                t: "Audit & plan",
                d: "3 priorités + KPI + plan d'exécution.",
              },
              {
                s: "Étape 2",
                t: "V1 en production",
                d: "Un système simple qui tourne (prospects + suivi + relances).",
              },
              {
                s: "Étape 3",
                t: "Optimisation",
                d: "SEO, contenus, relances, dashboards : on scale.",
              },
            ].map((x) => (
              <li
                key={x.s}
                className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{x.s}</p>
                <p className="mt-2 font-medium">{x.t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700"
            >
              Démarrer avec un audit
            </Link>
            <Link
              href="/llms.txt"
              className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
            >
              Lire llms.txt
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20" aria-label="FAQ">
          <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
          <div className="mt-6 space-y-4">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-200 hover:bg-muted dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06] dark:hover:border-violet-500/15"
              >
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ESPACE CLIENT */}
        <section className="mt-20" aria-label="Espace client">
          <div className="rounded-3xl border bg-muted p-8 sm:flex sm:items-center sm:justify-between sm:gap-8 dark:border-white/[0.06] dark:bg-violet-500/[0.04]">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Déjà client ?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Accédez à votre tableau de bord pour gérer vos prospects, suivre
                vos relances et piloter vos KPI.
              </p>
            </div>
            <Link
              href="/connexion"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl border bg-background px-6 py-3 text-sm font-medium shadow-sm transition hover:bg-background/80 sm:mt-0 sm:shrink-0"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Accéder à l&apos;espace client
            </Link>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-24" aria-label="Appel à l'action">
          <div className="rounded-3xl border bg-linear-to-br from-violet-50 to-indigo-50/80 p-10 text-center shadow-sm dark:border-violet-500/20 dark:from-violet-950/40 dark:to-indigo-950/30 dark:shadow-lg dark:shadow-violet-500/10">
            <h2 className="text-3xl font-semibold tracking-tight">Prêt à transformer votre façon de travailler ?</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Audit rapide → plan clair → Workplace qui tourne en 14 jours. Ensuite on optimise.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Réserver l&apos;audit
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Explorer les services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
