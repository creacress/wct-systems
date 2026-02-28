import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trouver des prospects qualifiés automatiquement",
  description:
    "Système automatisé de prospection B2B pour PME : ciblage par secteur et zone, liste propre sans doublons, intégration directe dans votre CRM. Audit gratuit.",
  alternates: { canonical: "/services/trouver-prospects" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const FAQ = [
  {
    q: "Comment est-ce que vous trouvez les prospects ?",
    a: "Nous utilisons des bases de données fiables et des filtres avancés pour cibler précisément les entreprises qui correspondent à vos critères.",
  },
  {
    q: "Est-ce que les données sont mises à jour régulièrement ?",
    a: "Oui, notre système nettoie et met à jour les données automatiquement pour garantir leur fraîcheur et leur pertinence.",
  },
  {
    q: "Puis-je intégrer ces prospects dans mon CRM actuel ?",
    a: "Absolument, nous proposons une intégration directe avec la plupart des CRM populaires.",
  },
] as const;

export default function TrouverProspectsPage() {
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
            name: "Trouver des prospects",
            item: `${SITE_URL}/services/trouver-prospects`,
          },
        ],
      },
      {
        "@type": "Service",
        name: "Trouver des prospects qualifiés automatiquement",
        description:
          "Système automatisé de prospection B2B pour PME : ciblage par secteur et zone, liste propre sans doublons, intégration directe dans votre suivi commercial ou CRM.",
        provider: { "@type": "Organization", name: "WCT Systems", url: SITE_URL },
        areaServed: { "@type": "Country", name: "France" },
        url: `${SITE_URL}/services/trouver-prospects`,
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
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

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/70 via-background to-background dark:from-violet-950/30" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* HERO */}
        <section className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            Acquisition B2B automatisée
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Trouver des prospects qualifiés
            <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              sans perdre de temps
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground">
            Nous mettons en place un système automatisé qui identifie les bonnes
            entreprises, nettoie les données et les intègre directement dans votre
            suivi commercial.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact?service=prospects"
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              Demander un audit gratuit
            </Link>
            <div className="text-sm text-muted-foreground">
              ✓ Ciblage précis  ✓ Données propres  ✓ Intégration CRM
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Le problème courant des PME
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Recherche manuelle longue et chronophage",
              "Listes peu fiables ou mal ciblées",
              "Suivi commercial désorganisé",
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
          <h2 className="text-2xl font-semibold tracking-tight">
            La solution en 4 étapes
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              "Ciblage précis par secteur et zone",
              "Nettoyage et suppression des doublons",
              "Intégration automatique dans votre CRM",
              "Base prête pour relances automatisées",
            ].map((item, i) => (
              <div
                key={item}
                className="group rounded-3xl border bg-muted/40 p-6 transition hover:bg-muted"
              >
                <div className="mb-3 text-xs font-medium text-muted-foreground">
                  Étape {i + 1}
                </div>
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ROI */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Exemple de ROI
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Hypothèse</p>
              <p className="mt-2 text-sm text-muted-foreground">
                2h/jour de prospection manuelle → automatisée
              </p>
            </div>

            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Gain</p>
              <p className="mt-2 text-sm text-muted-foreground">
                ~40h/mois récupérées (temps vendu ou réinvesti)
              </p>
            </div>

            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Impact</p>
              <p className="mt-2 text-sm text-muted-foreground">
                + volume de contacts traités → + chances de devis signés
              </p>
            </div>
          </div>

          <div className="rounded-3xl border bg-muted p-6">
            <p className="text-sm font-medium">Traduction business</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Si votre taux de conversion est de <strong>5%</strong> et que vous traitez <strong>200 prospects/mois</strong>
              au lieu de 80, vous augmentez mécaniquement le nombre d’opportunités.
              On met ensuite en place les relances pour améliorer le taux de réponse.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              *Exemple indicatif : le ROI dépend de votre offre, zone, saisonnalité et qualité du suivi.
            </p>
          </div>
        </section>

        {/* BEFORE AFTER */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Avant / Après
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border p-8">
              <p className="text-sm font-medium">Avant</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Prospection manuelle, Excel dispersés, relances oubliées.
              </p>
            </div>

            <div className="rounded-3xl border bg-muted p-8">
              <p className="text-sm font-medium">Après</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Pipeline propre, prospects ciblés automatiquement, suivi
                structuré et prêt à convertir.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Questions fréquentes
          </h2>

          <div className="space-y-4">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-3xl border bg-background p-6 transition hover:bg-muted"
              >
                <summary className="cursor-pointer font-medium">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-20">
          <div className="rounded-3xl border bg-linear-to-r from-violet-50 to-indigo-50/80 dark:from-violet-950/40 dark:to-indigo-950/30 p-10 text-center shadow-sm">
            <h2 className="text-3xl font-semibold tracking-tight">
              Prêt à générer plus d’opportunités ?
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              On définit votre cible et on lance la première version du système.
            </p>
            <Link
              href="/contact?service=prospects"
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
