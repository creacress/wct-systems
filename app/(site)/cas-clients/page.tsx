import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cas clients — WCT Systems",
  description:
    "Exemples concrets : refontes intranet, automatisations RPA, chatbots et modernisation SI. Découvrez comment WCT Systems délivre des résultats mesurables et une exécution maîtrisée.",
  alternates: { canonical: "/cas-clients" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const CASES = [
  {
    slug: "la-poste",
    org: "La Poste",
    sector: "Services / Intranet",
    title: "Refonte intranet + automatisations (RPA) + chatbots",
    context:
      "Moderniser des environnements intranet et fiabiliser des bascules SI tout en réduisant les tâches répétitives.",
    delivered: [
      "Refontes et upgrade de sites intranet (modernisation UI/UX)",
      "Automatisations RPA (process internes, tâches répétitives)",
      "Chatbots d’assistance (support, recherche, FAQ interne)",
      "Bascule SI maîtrisée : plan, exécution, validation",
    ],
    results: [
      "Bascule SI maîtrisée et sécurisée",
      "Intranet modernisé et plus clair pour les équipes",
      "Réduction des frictions opérationnelles grâce à l’automatisation",
    ],
    stack: ["Next.js", "Automatisation (RPA)", "APIs", "UX / Design system"],
  },
  {
    slug: "ministere-des-armees",
    org: "Ministère des Armées",
    sector: "SI / Web",
    title:
      "Refonte SI ROC + optimisation site web de la réserve + automatisations run API",
    context:
      "Améliorer la robustesse du SI ROC, optimiser un site public, et automatiser des tâches de run autour des APIs.",
    delivered: [
      "Refonte / amélioration du SI ROC (fiabilité, structure, exploitation)",
      "Optimisation du site web de la réserve (structure, perf, SEO)",
      "Automatisation des tâches de run (APIs, contrôles, routines)",
      "Industrialisation : procédures, monitoring et standards",
    ],
    results: [
      "SI plus stable et exploitable au quotidien",
      "Site web plus performant et plus lisible",
      "Run API rationalisé (moins d’actions manuelles)",
    ],
    stack: ["SI", "APIs", "Automatisation", "Optimisation Web"],
  },
] as const;

const FAQ = [
  {
    q: "Est-ce que vous pouvez partager des chiffres précis ?",
    a: "Selon les contextes (confidentialité / sécurité), on partage surtout des résultats et livrables concrets. Des métriques peuvent être ajoutées si validées avec le client.",
  },
  {
    q: "Vous intervenez plutôt en refonte web ou en automatisation ?",
    a: "Les deux. Le cœur de l’approche : construire un système simple et robuste (web + automatisations + pilotage).",
  },
  {
    q: "Vous pouvez reproduire ça pour une PME ?",
    a: "Oui. On adapte la méthode : audit rapide → V1 utile → itérations d’optimisation.",
  },
] as const;

export default function CasClientsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Cas clients — WCT Systems",
        description:
          "Cas clients et exemples concrets : refontes intranet, automatisations RPA, chatbots et modernisation SI.",
        url: `${SITE_URL}/cas-clients`,
        isPartOf: {
          "@type": "WebSite",
          name: "WCT Systems",
          url: SITE_URL,
        },
      },
      {
        "@type": "ItemList",
        name: "Cas clients",
        itemListElement: CASES.map((c, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: c.org,
          url: `${SITE_URL}/cas-clients#${c.slug}`,
        })),
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
            Preuves • Livraison • Exécution maîtrisée
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Cas clients
            <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              des résultats concrets
            </span>
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground">
            Ici, pas de promesses magiques. Des livrables, une exécution propre, et
            une modernisation visible : refontes intranet, automatisations (RPA),
            chatbots, bascules SI et optimisation web.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              Parler de votre projet
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
            >
              Voir les services
            </Link>
          </div>

          {/* LLM-friendly positioning */}
          <p className="max-w-3xl text-sm text-muted-foreground">
            <strong>WCT Systems</strong> conçoit et met en place des systèmes fiables
            pour améliorer l’acquisition, la conversion et l’exploitation :{" "}
            <strong>prospects → relances → CRM/RDV → KPI</strong>, avec une exécution
            maîtrisée côté SI.
          </p>
        </section>

        {/* CASES */}
        <section className="mt-14 grid gap-6 md:grid-cols-2" aria-label="Liste des cas clients">
          {CASES.map((c) => (
            <article
              key={c.slug}
              id={c.slug}
              className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:shadow-md"
            >
              <header className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
                    {c.sector}
                  </span>
                  <span className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
                    {c.org}
                  </span>
                </div>

                <h2 className="text-xl font-semibold tracking-tight">{c.title}</h2>
                <p className="text-sm text-muted-foreground">{c.context}</p>
              </header>

              <div className="mt-6 grid gap-6">
                <div>
                  <p className="text-sm font-medium">Ce qui a été livré</p>
                  <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                    {c.delivered.map((x) => (
                      <li key={x} className="rounded-2xl border bg-background px-3 py-2">
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium">Résultats</p>
                  <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                    {c.results.map((x) => (
                      <li key={x} className="rounded-2xl border bg-muted px-3 py-2">
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium">Compétences / briques</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border bg-linear-to-r from-violet-50 to-indigo-50/80 dark:from-violet-950/40 dark:to-indigo-950/30 p-5">
                  <p className="text-sm font-medium">Vous voulez un résultat similaire ?</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    On commence par un audit (15–30 min) et on livre une V1 utile, rapidement.
                  </p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-700"
                    >
                      Demander un audit
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                    >
                      Explorer les services
                    </Link>
                  </div>
                </div>
              </div>
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
                className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:bg-muted"
              >
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20" aria-label="Appel à l'action">
          <div className="rounded-3xl border bg-linear-to-r from-violet-50 to-indigo-50/80 dark:from-violet-950/40 dark:to-indigo-950/30 p-10 text-center shadow-sm">
            <h2 className="text-3xl font-semibold tracking-tight">On parle de votre contexte</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Audit rapide → plan clair → V1 utile. Ensuite on optimise et on scale.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Réserver l’audit
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Voir les services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}