import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES_SOLUTIONS, SECTEURS } from "@/lib/solutions-data";
import Breadcrumbs from "@/components/site/breadcrumbs";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Solutions par secteur — IA & Automatisation pour PME | WCT Systems",
  description:
    "Découvrez nos solutions IA et automatisation adaptées à votre secteur : cabinet de conseil, agence, comptable, ESN, artisan, restaurant, avocat, immobilier, e-commerce.",
  keywords: ["solutions IA par secteur", "automatisation PME", "prospection B2B secteur"],
  alternates: { canonical: "/solutions" },
};

export default function SolutionsIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE_URL}/solutions` },
        ],
      },
      {
        "@type": "ItemList",
        name: "Solutions par secteur",
        numberOfItems: SECTEURS.length,
        itemListElement: SECTEURS.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.name,
          url: `${SITE_URL}/solutions/prospection-ia/pour/${s.slug}`,
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
      <GridPattern variant="dot" color="rgba(139, 92, 246, 0.05)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        <Breadcrumbs items={[
          { label: "Accueil", href: "/" },
          { label: "Solutions par secteur" },
        ]} />

        <ScrollReveal direction="up">
          <section className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800/50 dark:bg-violet-950/30 dark:text-violet-400">
              Solutions par secteur
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl">
              Des solutions adaptées
              <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
                à votre secteur
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              Chaque métier a ses défis. Découvrez comment nos 5 SaaS s&apos;adaptent à votre réalité.
            </p>
          </section>
        </ScrollReveal>

        {/* SECTEURS */}
        {SECTEURS.map((secteur, idx) => (
          <ScrollReveal key={secteur.slug} direction="up" delay={idx * 40}>
            <section className="mt-12 first:mt-16">
              <h2 className="font-display font-bold text-2xl tracking-tight mb-2">{secteur.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">{secteur.problemType}</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {SERVICES_SOLUTIONS.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/solutions/${service.slug}/pour/${secteur.slug}`}
                    className="group rounded-2xl border bg-background/70 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-violet-200/80 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-violet-800/30"
                  >
                    <h3 className="text-sm font-bold group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">Dès {service.price}€/mois</p>
                  </Link>
                ))}
              </div>
            </section>
          </ScrollReveal>
        ))}

        {/* CTA */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-20 rounded-3xl border border-violet-100/70 bg-linear-to-r from-violet-50/50 to-indigo-50/30 p-10 text-center dark:border-violet-900/20 dark:from-violet-950/25 dark:to-indigo-950/15">
            <h2 className="font-display font-bold text-2xl tracking-tight">
              Votre secteur n&apos;est pas listé ?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Nos solutions s&apos;adaptent à tous les métiers. Parlons de votre cas en 15 min.
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
