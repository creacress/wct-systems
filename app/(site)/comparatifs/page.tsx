import type { Metadata } from "next";
import Link from "next/link";
import { COMPARATIFS } from "@/lib/comparatifs-data";
import Breadcrumbs from "@/components/site/breadcrumbs";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Comparatifs outils pour PME — Automatisation, IA, Prospection, Sites Web | WCT Systems",
  description:
    "Zapier vs n8n, WordPress vs Next.js, prospection manuelle vs IA... Comparatifs honnêtes pour aider les PME à choisir le bon outil.",
  keywords: ["comparatif outils PME", "zapier vs n8n", "wordpress vs nextjs", "prospection manuelle vs ia"],
  alternates: { canonical: "/comparatifs" },
};

const CATEGORY_LABELS: Record<string, string> = {
  automatisation: "Automatisation",
  prospection: "Prospection",
  "site-web": "Site Web",
  ia: "IA",
};

const CATEGORY_BADGE: Record<string, string> = {
  automatisation: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-400",
  prospection: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/30 dark:text-emerald-400",
  "site-web": "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800/40 dark:bg-sky-950/30 dark:text-sky-400",
  ia: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-800/40 dark:bg-fuchsia-950/30 dark:text-fuchsia-400",
};

export default function ComparatifsIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Comparatifs", item: `${SITE_URL}/comparatifs` },
        ],
      },
      {
        "@type": "ItemList",
        name: "Comparatifs outils pour PME",
        numberOfItems: COMPARATIFS.length,
        itemListElement: COMPARATIFS.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.title,
          url: `${SITE_URL}/comparatifs/${c.slug}`,
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

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/30 via-background to-background dark:from-violet-950/10" />
      <GridPattern variant="dot" color="rgba(139, 92, 246, 0.04)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        <Breadcrumbs items={[
          { label: "Accueil", href: "/" },
          { label: "Comparatifs" },
        ]} />

        <ScrollReveal direction="up">
          <section className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800/50 dark:bg-violet-950/30 dark:text-violet-400">
              Comparatifs
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl">
              Quel outil choisir
              <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
                pour votre PME ?
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              Des comparatifs honnêtes et factuels pour vous aider à choisir la bonne solution.
              Pas de bashing : chaque outil a ses forces.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={80}>
          <section className="mt-14" aria-label="Comparatifs">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {COMPARATIFS.map((c) => (
                <Link key={c.slug} href={`/comparatifs/${c.slug}`} className="group block">
                  <article className="h-full rounded-3xl border bg-background/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-violet-200/80 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-violet-800/30">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_BADGE[c.category] ?? ""}`}>
                      {CATEGORY_LABELS[c.category] ?? c.category}
                    </span>

                    <h2 className="mt-3 text-lg font-bold tracking-tight leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {c.title}
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {c.metaDescription}
                    </p>

                    <span className="mt-4 inline-block text-xs font-medium text-violet-600 dark:text-violet-400 group-hover:underline">
                      Lire le comparatif &rarr;
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-20 rounded-3xl border border-violet-100/70 bg-linear-to-r from-violet-50/50 to-indigo-50/30 p-10 text-center dark:border-violet-900/20 dark:from-violet-950/25 dark:to-indigo-950/15">
            <h2 className="font-display font-bold text-2xl tracking-tight">
              Besoin d&apos;un avis personnalisé ?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Audit gratuit de 15 min. On analyse votre situation et on recommande l&apos;approche adaptée.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              Réserver l&apos;audit gratuit
            </Link>
          </section>
        </ScrollReveal>

      </div>
    </main>
  );
}
