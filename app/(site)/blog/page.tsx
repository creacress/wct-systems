import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";

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
    readTime: "8 min",
    category: "Système",
  },
  {
    title: "Relances email : la séquence simple qui améliore le taux de réponse",
    desc: "2 à 4 messages, ton sobre, timing précis. Ce qui marche réellement pour les PME sans équipe commerciale.",
    tags: ["Relances", "Email"],
    readTime: "6 min",
    category: "Acquisition",
  },
  {
    title: "SEO IA : comment rendre votre site lisible par les assistants IA",
    desc: "llms.txt, JSON-LD, structure claire — ce qui compte vraiment pour être cité par ChatGPT, Perplexity et Gemini.",
    tags: ["SEO IA", "Visibilité"],
    readTime: "10 min",
    category: "Visibilité",
  },
  {
    title: "Dashboard KPI : les 5 métriques que chaque PME devrait suivre",
    desc: "Leads, réponses, RDV, devis, signatures. Pas besoin d'un cockpit d'avion pour décider vite.",
    tags: ["KPI", "Pilotage"],
    readTime: "7 min",
    category: "Pilotage",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Editorial background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-indigo-50/30 via-background to-background dark:from-indigo-950/10" />
      <GridPattern variant="dot" color="rgba(99, 102, 241, 0.05)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        {/* HERO */}
        <ScrollReveal direction="up">
          <section className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-xs uppercase tracking-wide text-indigo-700 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:text-indigo-400">
              Blog • IA • Automatisation • Acquisition
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              Ressources pratiques
              <span className="block bg-linear-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
                pour PME ambitieuses
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              Des articles concrets sur l&apos;IA appliquée, l&apos;automatisation (n8n), la prospection B2B,
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
        </ScrollReveal>

        {/* COMING SOON BANNER */}
        <ScrollReveal direction="up" delay={80}>
          <section className="mt-16 sm:mt-20" aria-label="Articles à venir">
            <div className="rounded-3xl border border-indigo-100/70 bg-linear-to-r from-indigo-50/50 to-violet-50/30 p-6 sm:p-8 dark:border-indigo-900/20 dark:from-indigo-950/20 dark:to-violet-950/10">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center rounded-full border border-indigo-200/80 bg-background px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-800/40 dark:bg-white/[0.04] dark:text-indigo-400">
                  Prochainement
                </div>
                <div className="h-px flex-1 bg-indigo-100/60 dark:bg-indigo-900/20" />
              </div>
              <p className="mt-4 text-base font-semibold">Les premiers articles arrivent bientôt.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                En attendant, vous pouvez consulter les pages services pour comprendre notre approche,
                ou nous contacter directement pour un audit.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* MAGAZINE GRID — UPCOMING ARTICLES */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-14" aria-label="Sujets à venir">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl tracking-tight">Sujets en préparation</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Des articles courts, orientés résultats, avec des exemples concrets.
                </p>
              </div>
              <div className="hidden sm:block h-px flex-1 bg-border" />
            </div>

            {/* Featured article — large card */}
            <div className="mt-6 grid gap-4 lg:grid-cols-5">
              <ScrollReveal direction="up" delay={0} className="lg:col-span-3">
                <div className="group relative h-full rounded-3xl border border-indigo-100/70 bg-background/70 p-7 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-200/80 dark:border-indigo-900/20 dark:bg-white/[0.04] dark:hover:border-indigo-800/30">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/30 dark:text-indigo-400">
                      {UPCOMING[0].category}
                    </span>
                    <span className="text-xs text-muted-foreground">{UPCOMING[0].readTime} de lecture</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold tracking-tight leading-snug sm:text-2xl">
                    {UPCOMING[0].title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {UPCOMING[0].desc}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {UPCOMING[0].tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border bg-background px-2.5 py-0.5 text-xs text-muted-foreground dark:border-white/[0.08] dark:bg-white/[0.04]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    À venir
                    <span aria-hidden className="opacity-60">—</span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Stack of 2 smaller cards */}
              <div className="lg:col-span-2 grid gap-4">
                {UPCOMING.slice(1, 3).map((a, i) => (
                  <ScrollReveal key={a.title} direction="up" delay={80 + i * 60}>
                    <div className="group rounded-3xl border border-indigo-100/70 bg-background/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-200/80 dark:border-indigo-900/20 dark:bg-white/[0.04] dark:hover:border-indigo-800/30">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/30 dark:text-indigo-400">
                          {a.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{a.readTime}</span>
                      </div>
                      <h3 className="mt-3 text-base font-bold tracking-tight leading-snug">
                        {a.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {a.desc}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* 4th article — wide strip */}
            <ScrollReveal direction="up" delay={160}>
              <div className="mt-4 rounded-3xl border border-indigo-100/70 bg-background/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-200/80 dark:border-indigo-900/20 dark:bg-white/[0.04] dark:hover:border-indigo-800/30">
                <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
                  <div className="hidden sm:flex h-full w-px self-stretch bg-indigo-100/60 dark:bg-indigo-900/20" />
                  <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/30 dark:text-indigo-400">
                          {UPCOMING[3].category}
                        </span>
                        <span className="text-xs text-muted-foreground">{UPCOMING[3].readTime} de lecture</span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold tracking-tight">
                        {UPCOMING[3].title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {UPCOMING[3].desc}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end sm:gap-1.5">
                      {UPCOMING[3].tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border bg-background px-2.5 py-0.5 text-xs text-muted-foreground dark:border-white/[0.08] dark:bg-white/[0.04]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-20" aria-label="Appel à l'action">
            <div className="rounded-3xl border border-indigo-100/70 bg-linear-to-r from-indigo-50/50 to-violet-50/30 p-10 text-center shadow-sm dark:border-indigo-900/20 dark:from-indigo-950/25 dark:to-violet-950/15 dark:shadow-lg dark:shadow-indigo-950/10">
              <div className="mx-auto max-w-2xl">
                <div className="mb-4 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/30 dark:text-indigo-400">
                  Pas besoin d&apos;attendre
                </div>
                <h2 className="font-display font-bold text-3xl tracking-tight">
                  Pas besoin d&apos;attendre les articles
                </h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  Audit rapide → 3 priorités → V1 qui tourne. On répond aux vraies questions dans votre contexte.
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
            </div>
          </section>
        </ScrollReveal>

      </div>
    </main>
  );
}
