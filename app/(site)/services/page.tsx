import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — Plus de clients, moins de tâches répétitives",
  description:
    "WCT Systems aide les PME à obtenir plus de prospects, automatiser les relances, structurer le suivi (CRM/RDV) et piloter avec des KPI. Audit gratuit.",
  alternates: { canonical: "/services" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const SERVICES = [
  {
    id: "prospects",
    href: "/services/trouver-prospects",
    name: "Trouver des prospects qualifiés automatiquement",
    short: "Des entreprises ciblées dans votre région, prêtes à être contactées.",
    bullets: [
      "Ciblage par secteur et zone",
      "Liste propre (sans doublons)",
      "Contacts exploitables",
      "Intégration dans votre suivi",
    ],
    cta: "Voir la page",
  },
  {
    id: "relances",
    href: "/services/automatiser-relances",
    name: "Automatiser les relances et les suivis",
    short: "Moins d’oublis, plus de réponses, plus de signatures.",
    bullets: [
      "Relances email automatiques",
      "Rappels & notifications",
      "Suivi des réponses",
      "Pipeline clair",
    ],
    cta: "Voir la page",
  },
  {
    id: "rdv",
    href: "/services/gestion-rdv-crm",
    name: "CRM & rendez-vous (simple et utilisable)",
    short: "Un pipeline clair pour ne plus perdre d’opportunités.",
    bullets: [
      "Suivi des prospects",
      "RDV structurés",
      "Étapes claires",
      "Historique centralisé",
    ],
    cta: "Voir la page",
  },
  {
    id: "pilotage",
    href: "/services/dashboard-kpi",
    name: "Dashboard KPI : voir ce qui vous rapporte",
    short: "Des chiffres simples pour décider vite et arrêter ce qui ne marche pas.",
    bullets: [
      "Leads / réponses / RDV",
      "Devis / signatures",
      "Suivi mensuel",
      "Alertes simples",
    ],
    cta: "Voir la page",
  },
  {
    id: "site",
    href: "/services/site-generation-leads",
    name: "Site génération de leads (rapide + conversion)",
    short: "Visible sur Google et compréhensible par les assistants IA.",
    bullets: [
      "SEO + structure claire",
      "1 service = 1 page",
      "Preuves & CTA",
      "Performance mobile",
    ],
    cta: "Voir la page",
  },
] as const;

const FAQ = [
  {
    q: "Par quoi commencer ?",
    a: "On commence par l’audit, puis une V1 : prospects + suivi + relances. Ensuite on ajoute le dashboard KPI et on optimise le site.",
  },
  {
    q: "Est-ce adapté à une petite entreprise ?",
    a: "Oui. L’objectif est de simplifier votre quotidien et d’augmenter vos demandes sans ajouter de complexité.",
  },
  {
    q: "Est-ce que je dois changer tous mes outils ?",
    a: "Non. On s’adapte à votre existant (quand c’est possible) et on simplifie plutôt que compliquer.",
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
            Services • Mobile-first • SEO + SEO IA
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Plus de clients.
            <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              Moins de tâches répétitives.
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground">
            On construit une machine simple : <strong>prospects → relances → suivi → KPI</strong>.
            Chaque service a sa page dédiée (claire, concrète, et orientée résultats).
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              Réserver un audit gratuit
            </Link>
            <div className="text-sm text-muted-foreground">
              ✓ Plan clair ✓ Mise en place rapide ✓ Optimisation continue
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="mt-14 grid gap-6 md:grid-cols-2" aria-label="Liste des services">
          {SERVICES.map((s) => (
            <article
              key={s.id}
              className="group relative rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:shadow-md"
            >
              <header className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">{s.name}</h2>
                <p className="text-sm text-muted-foreground">{s.short}</p>
              </header>

              <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
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
                  {s.cta}
                </Link>
                <Link
                  href={`/contact?service=${encodeURIComponent(s.id)}`}
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-700"
                >
                  Demander un audit
                </Link>
              </div>

              {/* Makes the whole card clickable (but keeps buttons accessible) */}
              <Link
                href={s.href}
                aria-label={`Ouvrir la page : ${s.name}`}
                className="absolute inset-0 rounded-3xl focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              >
                <span className="sr-only">{s.name}</span>
              </Link>

              {/* Lift the interactive elements above the overlay link */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl" />
              <div className="relative z-10" />
            </article>
          ))}
        </section>

        {/* FAQ */}
        <section className="mt-16" aria-label="FAQ">
          <h2 className="text-2xl font-semibold tracking-tight">Questions fréquentes</h2>
          <div className="mt-6 space-y-4">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-3xl border bg-background p-6 transition hover:bg-muted"
              >
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20" aria-label="Appel à l'action">
          <div className="rounded-3xl border bg-linear-to-br from-violet-50 to-indigo-50/80 p-10 text-center shadow-sm dark:from-violet-950/40 dark:to-indigo-950/30">
            <h2 className="text-3xl font-semibold tracking-tight">On démarre par l’audit</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              15–30 minutes, puis un plan clair : quoi automatiser en premier, quels KPI suivre, et comment l’exécuter.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              Réserver l’audit
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}