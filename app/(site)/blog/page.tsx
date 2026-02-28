import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — IA, automatisation et acquisition pour PME",
  description:
    "Articles pratiques sur l'IA appliquée, l'automatisation (n8n), la prospection B2B, les relances, le CRM et le SEO pour PME. Prochainement.",
  alternates: { canonical: "/blog" },
  robots: { index: false, follow: true },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const UPCOMING = [
  {
    title: "Comment automatiser sa prospection B2B sans outil complexe",
    desc: "Ciblage, nettoyage des données, intégration CRM : les 4 étapes pour lancer une V1 en moins de 2 semaines.",
    tags: ["Prospection", "Automatisation"],
  },
  {
    title: "Relances email : la séquence simple qui améliore le taux de réponse",
    desc: "2 à 4 messages, ton sobre, timing précis. Ce qui marche réellement pour les PME sans équipe commerciale.",
    tags: ["Relances", "Email"],
  },
  {
    title: "SEO IA : comment rendre votre site lisible par les assistants IA",
    desc: "llms.txt, JSON-LD, structure claire — ce qui compte vraiment pour être cité par ChatGPT, Perplexity et Gemini.",
    tags: ["SEO IA", "Visibilité"],
  },
  {
    title: "Dashboard KPI : les 5 métriques que chaque PME devrait suivre",
    desc: "Leads, réponses, RDV, devis, signatures. Pas besoin d'un cockpit d'avion pour décider vite.",
    tags: ["KPI", "Pilotage"],
  },
] as const;

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        ],
      },
      {
        "@type": "Blog",
        name: "Blog WCT Systems",
        description:
          "Articles pratiques sur l'IA appliquée, l'automatisation, la prospection B2B et le SEO pour PME.",
        url: `${SITE_URL}/blog`,
        publisher: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
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

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/70 via-background to-background dark:from-violet-950/30" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* HERO */}
        <section className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            Blog • IA • Automatisation • Acquisition
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Ressources pratiques
            <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              pour PME ambitieuses
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground">
            Des articles concrets sur l'IA appliquée, l'automatisation (n8n), la prospection B2B,
            les relances et le SEO. Pas de théorie : des systèmes qui tournent en production.
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
        </section>

        {/* COMING SOON */}
        <section className="mt-16 sm:mt-20" aria-label="Articles à venir">
          <div className="rounded-3xl border bg-muted/60 p-6 sm:p-8">
            <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
              Prochainement
            </div>
            <p className="mt-4 text-base font-medium">Les premiers articles arrivent bientôt.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              En attendant, vous pouvez consulter les pages services pour comprendre notre approche,
              ou nous contacter directement pour un audit.
            </p>
          </div>
        </section>

        {/* UPCOMING ARTICLES */}
        <section className="mt-12" aria-label="Sujets à venir">
          <h2 className="text-xl font-semibold tracking-tight">Sujets en préparation</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Des articles courts, orientés résultats, avec des exemples concrets.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {UPCOMING.map((a) => (
              <div
                key={a.title}
                className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur"
              >
                <div className="flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border bg-background px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm font-medium">{a.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20" aria-label="Appel à l'action">
          <div className="rounded-3xl border bg-linear-to-r from-violet-50 to-indigo-50/80 dark:from-violet-950/40 dark:to-indigo-950/30 p-10 text-center shadow-sm">
            <h2 className="text-3xl font-semibold tracking-tight">
              Pas besoin d'attendre les articles
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Audit rapide → 3 priorités → V1 qui tourne. On répond aux vraies questions dans votre contexte.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              Réserver l'audit
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
