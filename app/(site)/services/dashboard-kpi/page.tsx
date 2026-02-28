

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard KPI : piloter simplement votre activité",
  description:
    "Un dashboard KPI clair pour PME : leads, réponses, conversions, devis signés. Suivi mensuel, alertes et décisions rapides. Audit gratuit.",
  alternates: { canonical: "/services/dashboard-kpi" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const FAQ = [
  {
    q: "Je n’ai pas beaucoup de données, ça marche quand même ?",
    a: "Oui. On commence avec 3 à 6 KPI simples. L’objectif est d’avoir une visibilité claire, pas un cockpit d’avion.",
  },
  {
    q: "Vous pouvez récupérer les données de mes outils actuels ?",
    a: "Oui : CRM, tableur, Notion/Airtable, formulaires, emails (selon setup), outils de pub, etc. On privilégie les connexions robustes.",
  },
  {
    q: "Est-ce que je peux le consulter sur mobile ?",
    a: "Oui. Tout est conçu mobile-first : lecture rapide, chiffres clairs, sections courtes.",
  },
] as const;

export default function DashboardKpiPage() {
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
            name: "Dashboard KPI",
            item: `${SITE_URL}/services/dashboard-kpi`,
          },
        ],
      },
      {
        "@type": "Service",
        name: "Dashboard KPI : piloter simplement votre activité",
        description:
          "Service de création de dashboard KPI pour PME : suivi leads, taux de réponse, conversions, devis signés, alertes et reporting simple.",
        provider: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: "France" },
        url: `${SITE_URL}/services/dashboard-kpi`,
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
            Pilotage simple • Décisions rapides
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Un dashboard KPI
            <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              clair et actionnable
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground">
            Vous ne devez pas “deviner” si votre prospection marche.
            On met en place un tableau de bord simple : leads, réponses, conversions,
            devis signés… pour décider vite et arrêter ce qui ne marche pas.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact?service=pilotage"
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              Demander un audit gratuit
            </Link>
            <div className="text-sm text-muted-foreground">
              ✓ KPI simples ✓ Mobile-first ✓ Alertes
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Le problème courant</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Vous ne savez pas ce qui rapporte vraiment",
              "Les chiffres sont dispersés (Excel, mails, CRM…)",
              "Vous prenez des décisions au feeling",
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
              "Définir 3–6 KPI (ex : leads, réponses, devis, signatures)",
              "Centraliser vos données (CRM / tableur / outils)",
              "Créer un dashboard lisible (mobile-first)",
              "Mettre des alertes (seuils, anomalies)",
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

        {/* KPI EXAMPLES */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Exemples de KPI utiles</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { k: "Leads générés", d: "Combien de nouveaux contacts par semaine/mois." },
              { k: "Taux de réponse", d: "% de prospects qui répondent à vos messages." },
              { k: "RDV obtenus", d: "Nombre de rendez-vous pris." },
              { k: "Devis envoyés", d: "Volume de devis générés." },
              { k: "Devis signés", d: "Ce qui fait rentrer du chiffre." },
              { k: "Délai de réponse", d: "Temps moyen avant réponse (optimisable)." },
            ].map((x) => (
              <div
                key={x.k}
                className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur"
              >
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
            Un dashboard ne “gagne” pas directement de l’argent : il évite surtout
            de perdre du temps et de l’argent sur de mauvaises décisions.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Hypothèse</p>
              <p className="mt-2 text-sm text-muted-foreground">
                1 action / mois arrêtée car non rentable
              </p>
            </div>

            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Gain</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Budget + temps récupérés
              </p>
            </div>

            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Impact</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Décisions plus rapides → meilleur ROI global
              </p>
            </div>
          </div>

          <div className="rounded-3xl border bg-muted p-6">
            <p className="text-sm font-medium">Traduction business</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Si vous investissez <strong>500€</strong> / mois sur une action qui ne convertit pas,
              la repérer et l’arrêter tôt finance souvent le dashboard à lui seul.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              *Exemple indicatif : dépend de vos canaux et de vos marges.
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
                Chiffres dispersés, décisions au feeling, perte de temps.
              </p>
            </div>

            <div className="rounded-3xl border bg-muted p-8">
              <p className="text-sm font-medium">Après</p>
              <p className="mt-4 text-sm text-muted-foreground">
                KPI centralisés, décisions rapides, focus sur ce qui marche.
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
            <h2 className="text-3xl font-semibold tracking-tight">On clarifie vos chiffres</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Audit rapide → KPI essentiels → dashboard lisible. Ensuite on automatise la collecte.
            </p>
            <Link
              href="/contact?service=pilotage"
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
            {" "}pour améliorer le taux de réponse.
          </p>
        </section>
      </div>
    </main>
  );
}