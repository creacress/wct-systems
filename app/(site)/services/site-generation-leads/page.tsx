

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Site génération de leads : rapide, clair, et qui convertit",
  description:
    "Un site ultra rapide pensé pour générer des demandes : SEO, pages services, preuves, CTA, et visibilité optimisée pour moteurs et assistants IA. Audit gratuit.",
  alternates: { canonical: "/services/site-generation-leads" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const FAQ = [
  {
    q: "J’ai déjà un site, est-ce que ça vaut le coup ?",
    a: "Souvent oui. Beaucoup de sites ne convertissent pas faute de message clair, preuve et CTA. On peut optimiser l’existant ou repartir sur une base plus rapide.",
  },
  {
    q: "C’est quoi “SEO IA” concrètement ?",
    a: "C’est rendre votre site très compréhensible par les assistants IA : structure claire, pages canoniques, schémas JSON-LD, et fichiers llms.txt/ai.txt. Cela améliore aussi la lisibilité pour les moteurs.",
  },
  {
    q: "Combien de temps pour une V1 ?",
    a: "En général 7 à 14 jours pour une V1 : pages clés, structure SEO, tracking minimal, et un tunnel de conversion simple.",
  },
] as const;

export default function SiteGenerationLeadsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          {
            "@type": "ListItem",
            position: 3,
            name: "Site génération de leads",
            item: `${SITE_URL}/services/site-generation-leads`,
          },
        ],
      },
      {
        "@type": "Service",
        name: "Site génération de leads",
        description:
          "Création/optimisation d’un site ultra rapide conçu pour générer des demandes : SEO, pages services, preuve, CTA et optimisation pour moteurs et assistants IA.",
        provider: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: "France" },
        url: `${SITE_URL}/services/site-generation-leads`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/70 via-background to-background dark:from-violet-950/30" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* HERO */}
        <section className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            SEO • Conversion • Mobile-first
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Un site rapide
            <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              qui génère des demandes
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground">
            Votre site doit faire 3 choses : être trouvé, être compris, et convertir.
            On construit une base ultra rapide, avec des pages services claires,
            des preuves, et des appels à l’action simples.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact?service=site"
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              Demander un audit gratuit
            </Link>
            <div className="text-sm text-muted-foreground">
              ✓ PageSpeed ✓ SEO ✓ Visibilité IA
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Le problème courant</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Site lent → visiteurs qui partent",
              "Message flou → peu de demandes",
              "Pas de preuve → pas de confiance",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:shadow-md"
              >
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SOLUTION */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">La solution (concrète)</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              "Une page d’accueil orientée résultat (pas du blabla)",
              "1 page par service (1 intention = 1 URL)",
              "Preuves : cas clients, chiffres, captures, process",
              "CTA clair : audit, contact, RDV",
            ].map((item, i) => (
              <div
                key={item}
                className="group rounded-3xl border bg-muted/40 p-6 transition hover:bg-muted"
              >
                <div className="mb-3 text-xs font-medium text-muted-foreground">Brique {i + 1}</div>
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO + SEO IA */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">SEO + Visibilité IA</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                k: "SEO classique",
                d: "Titres, descriptions, pages canoniques, sitemap/robots, vitesse, maillage interne.",
              },
              {
                k: "SEO IA",
                d: "Structure claire + schémas JSON-LD + llms.txt/ai.txt pour guider les assistants IA.",
              },
              {
                k: "Contenus ciblés",
                d: "Pages services et articles qui répondent aux questions des clients.",
              },
              {
                k: "Conversion",
                d: "CTA visibles, preuve sociale, sections simples, mobile-first.",
              },
            ].map((x) => (
              <div key={x.k} className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
                <p className="text-sm font-medium">{x.k}</p>
                <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ROI */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Exemple de ROI (simple)</h2>

          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Un site qui convertit mieux et qui est plus visible améliore votre pipeline.
            Voici un exemple indicatif.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Hypothèse</p>
              <p className="mt-2 text-sm text-muted-foreground">
                1 000 visites/mois
              </p>
            </div>

            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Conversion</p>
              <p className="mt-2 text-sm text-muted-foreground">
                1% → 2% (demandes)
              </p>
            </div>

            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Impact</p>
              <p className="mt-2 text-sm text-muted-foreground">
                10 → 20 demandes/mois
              </p>
            </div>
          </div>

          <div className="rounded-3xl border bg-muted p-6">
            <p className="text-sm font-medium">Traduction business</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Si vous signez <strong>20%</strong> des demandes et que votre panier moyen est
              de <strong>1 500€</strong>, doubler les demandes peut avoir un impact direct
              sur votre chiffre d’affaires.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              *Exemple indicatif : dépend de votre offre, saisonnalité et qualité du suivi.
            </p>
          </div>
        </section>

        {/* BEFORE AFTER */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Avant / Après</h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border p-8">
              <p className="text-sm font-medium">Avant</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Site lent, message flou, peu de demandes.
              </p>
            </div>

            <div className="rounded-3xl border bg-muted p-8">
              <p className="text-sm font-medium">Après</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Site rapide, pages claires, preuve, CTA → plus de demandes.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Questions fréquentes</h2>

          <div className="space-y-4">
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

        {/* FINAL CTA */}
        <section className="mt-20">
          <div className="rounded-3xl border bg-linear-to-r from-violet-50 to-indigo-50/80 dark:from-violet-950/40 dark:to-indigo-950/30 p-10 text-center shadow-sm">
            <h2 className="text-3xl font-semibold tracking-tight">On fait un site qui convertit</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Audit rapide → structure claire → pages services → optimisation. Ensuite on alimente avec prospects + relances.
            </p>
            <Link
              href="/contact?service=site"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              Réserver l’audit
            </Link>
          </div>
        </section>

        {/* Cross-linking */}
        <section className="mt-12 text-sm text-muted-foreground">
          <p>
            À combiner avec :{" "}
            <Link className="underline hover:opacity-80" href="/services/trouver-prospects">
              trouver des prospects
            </Link>
            {" "}et{" "}
            <Link className="underline hover:opacity-80" href="/services/automatiser-relances">
              automatiser les relances
            </Link>
            {" "}pour compléter la machine.
          </p>
        </section>
      </div>
    </main>
  );
}