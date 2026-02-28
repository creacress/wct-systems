

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gestion des rendez-vous & CRM simplifié pour PME",
  description:
    "Un CRM simple et une gestion claire des rendez-vous : suivi des prospects, pipeline lisible, relances intégrées. Moins de perte, plus de signatures.",
  alternates: { canonical: "/services/gestion-rdv-crm" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const FAQ = [
  {
    q: "Je n’aime pas les CRM compliqués, est-ce adapté ?",
    a: "Oui. L’objectif est justement d’avoir un système simple, lisible et utilisable au quotidien. Pas un outil lourd que personne n’ouvre.",
  },
  {
    q: "Est-ce que je dois changer tous mes outils ?",
    a: "Pas forcément. On peut structurer votre existant (tableur, Notion, Airtable, HubSpot…) avant d’envisager un changement.",
  },
  {
    q: "Puis-je voir à quel stade est chaque prospect ?",
    a: "Oui. Le pipeline est clair : nouveau contact, relancé, RDV pris, devis envoyé, signé… Vous savez toujours où vous en êtes.",
  },
] as const;

export default function GestionRdvCrmPage() {
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
            name: "CRM & Rendez-vous",
            item: `${SITE_URL}/services/gestion-rdv-crm`,
          },
        ],
      },
      {
        "@type": "Service",
        name: "Gestion des rendez-vous & CRM simplifié",
        description:
          "Service de mise en place d’un CRM simple et gestion structurée des rendez-vous pour PME : pipeline clair, suivi des prospects, relances intégrées.",
        provider: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: "France" },
        url: `${SITE_URL}/services/gestion-rdv-crm`,
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
            Organisation commerciale simplifiée
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Un CRM clair
            <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              pour ne plus perdre d’opportunités
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground">
            Chaque prospect doit être suivi. Chaque rendez-vous doit être noté.
            On met en place un système simple qui structure votre pipeline
            et vous montre exactement où vous en êtes.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact?service=rdv"
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              Demander un audit gratuit
            </Link>
            <div className="text-sm text-muted-foreground">
              ✓ Pipeline clair ✓ RDV structurés ✓ Suivi centralisé
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Le problème courant</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Prospects notés dans plusieurs endroits",
              "Rendez-vous oubliés ou mal suivis",
              "Pas de visibilité sur le pipeline",
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
          <h2 className="text-2xl font-semibold tracking-tight">La solution</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              "Un pipeline visuel (nouveau contact → signé)",
              "Un suivi automatique des étapes",
              "Des rappels intégrés",
              "Une vue claire des opportunités en cours",
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
            Beaucoup de ventes se perdent faute de suivi. Structurer votre pipeline
            augmente mécaniquement votre taux de signature.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Hypothèse</p>
              <p className="mt-2 text-sm text-muted-foreground">
                30 devis envoyés / mois
              </p>
            </div>

            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Sans suivi structuré</p>
              <p className="mt-2 text-sm text-muted-foreground">
                15% signés
              </p>
            </div>

            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Avec suivi clair</p>
              <p className="mt-2 text-sm text-muted-foreground">
                22–25% signés
              </p>
            </div>
          </div>

          <div className="rounded-3xl border bg-muted p-6">
            <p className="text-sm font-medium">Traduction business</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Sur 30 devis, passer de 15% à 22% peut représenter plusieurs ventes
              supplémentaires chaque mois.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              *Exemple indicatif : dépend de votre offre et cycle de décision.
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
                Suivi dispersé, relances irrégulières, opportunités perdues.
              </p>
            </div>

            <div className="rounded-3xl border bg-muted p-8">
              <p className="text-sm font-medium">Après</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Pipeline clair, rendez-vous suivis, taux de signature amélioré.
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
            <h2 className="text-3xl font-semibold tracking-tight">On structure votre pipeline</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Audit rapide → pipeline clair → suivi automatisé. Ensuite on optimise.
            </p>
            <Link
              href="/contact?service=rdv"
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
            <Link className="underline hover:opacity-80" href="/services/automatiser-relances">
              automatiser les relances
            </Link>
            {" "}pour améliorer votre taux de réponse.
          </p>
        </section>
      </div>
    </main>
  );
}