import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WCT Systems — IA & Automatisation pour PME",
  description:
    "WCT Systems aide les PME à générer plus de clients avec des systèmes simples : prospects → relances → CRM/RDV → KPI. Audit gratuit.",
  alternates: { canonical: "/" },
};

const SITE = {
  name: "WCT Systems",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "IA & Automatisation pour PME",
  sameAs: [] as string[],
};

const FAQ = [
  {
    q: "Combien de temps pour livrer une première version ?",
    a: "En général 7 à 14 jours pour une V1 : un système simple (prospects + suivi + relances) et un pilotage KPI minimal.",
  },
  {
    q: "Est-ce adapté à une petite entreprise ?",
    a: "Oui. On vise l’impact : moins de tâches répétitives et plus d’opportunités, sans complexifier votre organisation.",
  },
  {
    q: "Qu’est-ce que l’audit gratuit ?",
    a: "Un échange court (15–30 min) + une synthèse : 3 priorités, un plan d’exécution, et des KPI à suivre.",
  },
] as const;

const SERVICES = [
  {
    href: "/services/trouver-prospects",
    title: "Trouver des prospects",
    desc: "Ciblage précis, données propres, pipeline prêt à être contacté.",
    bullets: ["Secteur + zone", "Liste propre", "Contacts exploitables"],
  },
  {
    href: "/services/automatiser-relances",
    title: "Automatiser les relances",
    desc: "Moins d’oublis, plus de réponses, plus de signatures.",
    bullets: ["Séquences simples", "Rappels auto", "Suivi réponses"],
  },
  {
    href: "/services/gestion-rdv-crm",
    title: "CRM & RDV",
    desc: "Pipeline clair et utilisable : vous savez toujours où vous en êtes.",
    bullets: ["Étapes claires", "Historique", "RDV structurés"],
  },
  {
    href: "/services/dashboard-kpi",
    title: "Dashboard KPI",
    desc: "Chiffres simples pour décider vite et couper le bruit.",
    bullets: ["Leads", "Réponses", "Signatures"],
  },
  {
    href: "/services/site-generation-leads",
    title: "Site qui convertit",
    desc: "Rapide, lisible, SEO + visibilité IA, orienté demandes.",
    bullets: ["PageSpeed", "1 service = 1 page", "CTA + preuve"],
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
        sameAs: SITE.sameAs,
      },
      {
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.url,
        description: "Systèmes IA + automatisation pour PME.",
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
              IA • Automatisation • Acquisition • Conversion
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Plus de clients.
              <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
                Moins de tâches répétitives.
              </span>
            </h1>

            {/* LLM-friendly, client-friendly positioning */}
            <p className="max-w-2xl text-lg text-muted-foreground">
              <strong>WCT Systems</strong> est une entreprise française qui aide les PME à générer plus d’opportunités
              avec des systèmes simples : <strong>prospects → relances → CRM/RDV → KPI</strong>.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Réserver un audit gratuit
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Voir les services
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 text-sm text-muted-foreground">
              <div className="rounded-3xl border bg-background/60 p-4 shadow-sm backdrop-blur">
                <p className="text-xs uppercase tracking-wide">Mobile-first</p>
                <p className="mt-2">Lecture rapide, CTA clairs</p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-4 shadow-sm backdrop-blur">
                <p className="text-xs uppercase tracking-wide">SEO</p>
                <p className="mt-2">Pages canoniques + schémas</p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-4 shadow-sm backdrop-blur">
                <p className="text-xs uppercase tracking-wide">SEO IA</p>
                <p className="mt-2">Structure claire + llms.txt</p>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
            <p className="text-sm font-medium">La V1 typique (7–14 jours)</p>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="rounded-2xl border bg-background p-4">
                <p className="font-medium">1) Prospects qualifiés</p>
                <p className="mt-1 text-muted-foreground">Ciblage → liste propre → pipeline prêt.</p>
              </div>
              <div className="rounded-2xl border bg-background p-4">
                <p className="font-medium">2) Relances & suivi</p>
                <p className="mt-1 text-muted-foreground">Relances simples + suivi des réponses.</p>
              </div>
              <div className="rounded-2xl border bg-background p-4">
                <p className="font-medium">3) KPI essentiels</p>
                <p className="mt-1 text-muted-foreground">Leads, réponses, RDV, signatures.</p>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border bg-muted p-4 text-sm">
              <p className="font-medium">Promesse</p>
              <p className="mt-1 text-muted-foreground">Un plan clair + une V1 qui tourne. Pas du blabla.</p>
            </div>
          </div>
        </section>

        {/* STATS / PROOF */}
        <section className="mt-16">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                k: "Temps gagné",
                v: "- tâches répétitives",
                d: "Automatisations ciblées : relances, suivi, reporting.",
              },
              {
                k: "Conversion",
                v: "+ réponses",
                d: "Relances simples + pipeline propre : moins d’opportunités perdues.",
              },
              {
                k: "Pilotage",
                v: "KPI clairs",
                d: "Vous décidez vite : ce qui marche / ce qui ne marche pas.",
              },
            ].map((x) => (
              <div
                key={x.k}
                className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:shadow-md"
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{x.k}</p>
                <p className="mt-2 text-xl font-semibold tracking-tight">{x.v}</p>
                <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="mt-20" aria-label="Services">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Les briques de la machine</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Chaque service a sa page dédiée (claire + SEO) : 1 intention = 1 URL.
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
            {SERVICES.map((s) => (
              <article
                key={s.href}
                className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="rounded-2xl border bg-background px-3 py-2">
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
          <div className="rounded-3xl border bg-muted p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Exemple de ROI (simple)</h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Transformer du temps perdu en opportunités mesurables. Exemple indicatif pour une PME.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Hypothèse</p>
                <p className="mt-2 text-sm text-muted-foreground">2h/jour de prospection manuelle → automatisée</p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Gain</p>
                <p className="mt-2 text-sm text-muted-foreground">~40h/mois récupérées (vendues ou réinvesties)</p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
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
            On avance en itérations courtes : audit → V1 → optimisation. Chaque étape produit quelque chose d’utilisable.
          </p>

          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                s: "Étape 1",
                t: "Audit & plan",
                d: "3 priorités + KPI + plan d’exécution.",
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
                className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur"
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
                className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:bg-muted"
              >
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ESPACE CLIENT */}
        <section className="mt-20" aria-label="Espace client">
          <div className="rounded-3xl border bg-muted p-8 sm:flex sm:items-center sm:justify-between sm:gap-8">
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
          <div className="rounded-3xl border bg-linear-to-br from-violet-50 to-indigo-50/80 p-10 text-center shadow-sm dark:from-violet-950/40 dark:to-indigo-950/30">
            <h2 className="text-3xl font-semibold tracking-tight">Prêt à simplifier et convertir ?</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Audit rapide → plan clair → V1 qui tourne. Ensuite on optimise.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Réserver l’audit
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