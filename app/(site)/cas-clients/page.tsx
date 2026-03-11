import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";

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
      "Chatbots d'assistance (support, recherche, FAQ interne)",
      "Bascule SI maîtrisée : plan, exécution, validation",
    ],
    results: [
      "Bascule SI maîtrisée et sécurisée",
      "Intranet modernisé et plus clair pour les équipes",
      "Réduction des frictions opérationnelles grâce à l'automatisation",
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
      "Run API rationalisé (moins d'actions manuelles)",
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
    a: "Les deux. Le cœur de l'approche : construire un système simple et robuste (web + automatisations + pilotage).",
  },
  {
    q: "Vous pouvez reproduire ça pour une PME ?",
    a: "Oui. On adapte la méthode : audit rapide → V1 utile → itérations d'optimisation.",
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

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-slate-50/50 via-background to-background dark:from-slate-950/30" />
      <div className="absolute inset-0 -z-10">
        <GridPattern variant="dot" color="rgba(100, 116, 139, 0.06)" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        {/* HERO */}
        <section className="space-y-8">
          <ScrollReveal>
            <div className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-1 text-xs uppercase tracking-widest text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
              Preuves • Livraison • Exécution maîtrisée
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-bold text-4xl tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Cas clients
              <span className="block mt-1">
                des résultats concrets
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="max-w-3xl text-lg text-muted-foreground">
              Ici, pas de promesses magiques. Des livrables, une exécution propre, et
              une modernisation visible : refontes intranet, automatisations (RPA),
              chatbots, bascules SI et optimisation web.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
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
          </ScrollReveal>

          {/* LLM-friendly positioning */}
          <ScrollReveal delay={0.35}>
            <p className="max-w-3xl text-sm text-muted-foreground">
              <strong>WCT Systems</strong> conçoit et met en place des systèmes fiables
              pour améliorer l'acquisition, la conversion et l'exploitation :{" "}
              <strong>prospects → relances → CRM/RDV → KPI</strong>, avec une exécution
              maîtrisée côté SI.
            </p>
          </ScrollReveal>
        </section>

        {/* CASES */}
        <section className="mt-14 grid gap-8 md:grid-cols-2" aria-label="Liste des cas clients">
          {CASES.map((c, caseIdx) => (
            <ScrollReveal key={c.slug} delay={0.1 + caseIdx * 0.15}>
              <article
                id={c.slug}
                className="rounded-3xl border border-l-4 border-l-violet-500 bg-background/70 p-8 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 dark:border-white/[0.08] dark:border-l-violet-500 dark:bg-white/[0.04] dark:hover:border-violet-500/30 dark:hover:bg-white/[0.06] dark:hover:shadow-lg dark:hover:shadow-violet-500/5"
              >
                <header className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
                      {c.sector}
                    </span>
                    <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
                      {c.org}
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-xl tracking-tight">{c.title}</h2>
                  <p className="text-sm text-muted-foreground">{c.context}</p>
                </header>

                <div className="mt-6 grid gap-6">
                  {/* Delivered */}
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Ce qui a été livré</p>
                    <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                      {c.delivered.map((x) => (
                        <li key={x} className="flex items-start gap-2.5 rounded-2xl border bg-background px-3 py-2 dark:border-white/[0.06] dark:bg-white/[0.03]">
                          {/* Emerald check icon */}
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle cx="8" cy="8" r="7" className="fill-emerald-500/15" />
                            <path
                              d="M5 8.5l2 2 4-4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Results */}
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Résultats</p>
                    <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                      {c.results.map((x, i) => (
                        <li key={x} className="flex items-start gap-3 rounded-2xl border bg-muted px-3 py-2 dark:border-white/[0.06] dark:bg-violet-500/[0.04]">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[11px] font-bold text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
                            {i + 1}
                          </span>
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack */}
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Compétences / briques</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* In-card CTA */}
                  <div className="rounded-3xl border bg-linear-to-r from-slate-50 to-violet-50/30 dark:border-violet-500/15 dark:from-slate-950/60 dark:to-violet-950/20 p-5">
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
            </ScrollReveal>
          ))}
        </section>

        {/* FAQ */}
        <section className="mt-20" aria-label="FAQ">
          <ScrollReveal>
            <h2 className="font-display font-bold text-2xl tracking-tight">Questions fréquentes</h2>
          </ScrollReveal>
          <div className="mt-6 space-y-4">
            {FAQ.map((f, faqIdx) => (
              <ScrollReveal key={f.q} delay={0.1 + faqIdx * 0.08}>
                <details className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-200 open:shadow-md hover:bg-muted dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06] dark:hover:border-violet-500/15">
                  <summary className="cursor-pointer font-medium">{f.q}</summary>
                  <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-20" aria-label="Appel à l'action">
          <ScrollReveal>
            <div className="rounded-3xl border bg-linear-to-b from-slate-50 to-violet-50/30 dark:border-slate-800/60 dark:from-slate-950/80 dark:to-violet-950/20 p-10 text-center shadow-sm">
              <h2 className="font-display font-bold text-3xl tracking-tight">On parle de votre contexte</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Audit rapide → plan clair → V1 utile. Ensuite on optimise et on scale.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
                >
                  Réserver l'audit
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  Voir les services
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

      </div>
    </main>
  );
}
