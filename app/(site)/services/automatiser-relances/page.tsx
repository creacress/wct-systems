

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Automatiser les relances et les suivis",
  description:
    "Relances email automatiques, rappels et suivi des réponses : moins d’oublis, plus de conversions. Mise en place rapide pour PME. Audit gratuit.",
  alternates: { canonical: "/services/automatiser-relances" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const FAQ = [
  {
    q: "Est-ce que ça risque d’envoyer des emails ‘robot’ ?",
    a: "Non. On écrit des séquences simples et humaines, avec des relances sobres. L’objectif est d’éviter les oublis, pas de spammer.",
  },
  {
    q: "Je n’ai pas beaucoup de prospects, c’est utile quand même ?",
    a: "Oui. Même avec peu de leads, les relances augmentent fortement le taux de réponse. Vous capitalisez sur chaque opportunité.",
  },
  {
    q: "Vous pouvez vous connecter à mon outil actuel ?",
    a: "Oui : CRM, tableur, Notion, Airtable, HubSpot, Gmail/Outlook (selon votre setup). On s’adapte et on simplifie.",
  },
] as const;

export default function AutomatiserRelancesPage() {
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
            name: "Automatiser les relances",
            item: `${SITE_URL}/services/automatiser-relances`,
          },
        ],
      },
      {
        "@type": "Service",
        name: "Automatiser les relances et les suivis",
        description:
          "Service d’automatisation de relances et suivi commercial pour PME : séquences email, rappels, suivi des réponses, intégration CRM.",
        provider: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: "France" },
        url: `${SITE_URL}/services/automatiser-relances`,
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

      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/70 via-background to-background dark:from-violet-950/30" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* HERO */}
        <section className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            Suivi commercial automatisé
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Automatiser les relances
            <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              pour signer plus
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground">
            La plupart des ventes se perdent parce que la relance n’arrive jamais.
            On met en place des relances simples, humaines et automatiques :
            moins d’oubli, plus de réponses, plus de devis signés.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact?service=relances"
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              Demander un audit gratuit
            </Link>
            <div className="text-sm text-muted-foreground">
              ✓ Relances email  ✓ Rappels  ✓ Suivi des réponses
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Le problème courant</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Prospects oubliés ou relancés trop tard",
              "Pas de système : tout repose sur la mémoire",
              "Difficile de savoir qui relancer et quand",
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
          <h2 className="text-2xl font-semibold tracking-tight">La solution (simple)</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              "Une séquence de relance courte (2–4 messages)",
              "Des rappels automatiques si aucune réponse",
              "Un suivi clair : qui a répondu, qui n’a pas répondu",
              "Un pipeline propre (CRM / table / Notion)",
            ].map((item, i) => (
              <div
                key={item}
                className="group rounded-3xl border bg-muted/40 p-6 transition hover:bg-muted"
              >
                <div className="mb-3 text-xs font-medium text-muted-foreground">Étape {i + 1}</div>
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ROI */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Exemple de ROI (simple)</h2>

          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            La relance est souvent le levier le plus rentable : vous capitalisez sur des prospects
            déjà intéressés. Voici un exemple indicatif.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Hypothèse</p>
              <p className="mt-2 text-sm text-muted-foreground">100 prospects/mois • 10% répondent</p>
            </div>

            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Après relances</p>
              <p className="mt-2 text-sm text-muted-foreground">10% → 18% de réponses</p>
            </div>

            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Impact</p>
              <p className="mt-2 text-sm text-muted-foreground">+ opportunités → + devis → + signatures</p>
            </div>
          </div>

          <div className="rounded-3xl border bg-muted p-6">
            <p className="text-sm font-medium">Traduction business</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Si votre panier moyen est de <strong>1 500€</strong> et que vous signez <strong>20%</strong>
              des prospects qui répondent, passer de 10 à 18 réponses peut ajouter plusieurs ventes
              sur le mois.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              *Exemple indicatif : dépend de votre offre, délai de décision et qualité des messages.
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
                Relances faites “quand on y pense”, prospects perdus, suivi flou.
              </p>
            </div>

            <div className="rounded-3xl border bg-muted p-8">
              <p className="text-sm font-medium">Après</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Relances automatiques, pipeline clair, priorité sur les prospects chauds.
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
            <h2 className="text-3xl font-semibold tracking-tight">On met en place la relance</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Audit rapide → séquence simple → suivi clair. Ensuite on optimise.
            </p>
            <Link
              href="/contact?service=relances"
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
            {" "}pour alimenter votre pipeline.
          </p>
        </section>
      </div>
    </main>
  );
}