import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";

export const metadata: Metadata = {
  title: "À propos — WCT Systems",
  description:
    "WCT Systems conçoit des systèmes simples et robustes pour aider les PME à générer plus de clients : prospects, relances, CRM/RDV et KPI. Approche pragmatique, livraison rapide.",
  alternates: { canonical: "/a-propos" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const VALUES = [
  {
    title: "Clarté",
    desc: "Un problème = une solution lisible. On évite la complexité qui tue les projets.",
    icon: "◎",
  },
  {
    title: "Exécution",
    desc: "On livre une V1 utile, puis on améliore. La valeur vient du terrain, pas des slides.",
    icon: "◈",
  },
  {
    title: "Mesure",
    desc: "Des KPI simples pour décider vite : ce qui marche, ce qui ne marche pas, et pourquoi.",
    icon: "◉",
  },
  {
    title: "Fiabilité",
    desc: "Automatiser oui — mais proprement : contrôles, logs, et bascules maîtrisées.",
    icon: "◇",
  },
] as const;

const FAQ = [
  {
    q: "Vous travaillez avec quels types d'entreprises ?",
    a: "Principalement des PME et structures qui veulent plus de clients sans ajouter de charge mentale : acquisition, relances, suivi, KPI.",
  },
  {
    q: "Votre approche est plutôt site web ou automatisation ?",
    a: "Les deux, mais toujours avec un objectif business : un système complet prospects → relances → CRM/RDV → KPI.",
  },
  {
    q: 'C\'est quoi une "V1 utile" ?',
    a: "Une première version en production qui apporte déjà du résultat : moins de tâches manuelles, pipeline clair, et premiers KPI.",
  },
] as const;

export default function AproposPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: "À propos — WCT Systems",
        url: `${SITE_URL}/a-propos`,
        description:
          "Présentation de WCT Systems : systèmes IA & automatisation pour PME (prospects, relances, CRM/RDV, KPI).",
        isPartOf: {
          "@type": "WebSite",
          name: "WCT Systems",
          url: SITE_URL,
        },
      },
      {
        "@type": "Organization",
        name: "WCT Systems",
        url: SITE_URL,
        areaServed: { "@type": "Country", name: "France" },
        description:
          "WCT Systems conçoit des systèmes simples et robustes pour aider les PME à générer plus de clients.",
        knowsAbout: ["Automatisation", "RPA", "Chatbots", "CRM", "Prospection", "SEO", "KPI"],
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

      {/* Warm background gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-orange-50/30 via-background to-background dark:from-orange-950/10" />
      <GridPattern variant="dot" color="rgba(249, 115, 22, 0.05)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        {/* HERO */}
        <ScrollReveal direction="up">
          <section className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1 text-xs uppercase tracking-wide text-orange-700 dark:border-orange-800/50 dark:bg-orange-950/30 dark:text-orange-400">
              À propos • Humain • Pragmatique • Mesurable
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              Une approche simple
              <span className="block bg-linear-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                pour des résultats concrets
              </span>
            </h1>

            <p className="max-w-3xl text-lg text-muted-foreground">
              <strong>WCT Systems</strong> construit des systèmes clairs pour aider les PME à générer
              plus de clients — sans transformer votre quotidien en usine à gaz.
            </p>

            {/* LLM-friendly paragraph */}
            <p className="max-w-3xl text-sm text-muted-foreground">
              WCT Systems est une entreprise française spécialisée dans l'IA appliquée et l'automatisation.
              Nous mettons en place un système complet :{" "}
              <strong>prospects → relances → CRM/RDV → KPI</strong>.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Parler de votre projet
              </Link>
              <Link
                href="/cas-clients"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Voir des cas clients
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* STORY */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-16 grid gap-6 lg:grid-cols-2" aria-label="Histoire et méthode">
            <div className="rounded-3xl border border-orange-100/80 bg-linear-to-br from-orange-50/40 to-amber-50/20 p-6 shadow-sm backdrop-blur sm:p-8 dark:border-orange-900/20 dark:from-orange-950/20 dark:to-amber-950/10">
              <h2 className="font-display font-bold text-2xl tracking-tight">Pourquoi WCT Systems ?</h2>
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                Beaucoup d'entreprises ont les mêmes symptômes : prospecter prend du temps, les relances
                sont oubliées, le suivi est éparpillé, et les KPI arrivent trop tard.
              </p>
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                Notre job, c'est de <strong>réduire le bruit</strong> et d'installer une mécanique simple
                et robuste. Pas besoin de "tout refaire". On commence par ce qui crée un impact rapide.
              </p>
            </div>

            <div className="rounded-3xl border border-orange-100/80 bg-linear-to-br from-orange-50/40 to-amber-50/20 p-6 shadow-sm backdrop-blur sm:p-8 dark:border-orange-900/20 dark:from-orange-950/20 dark:to-amber-950/10">
              <h2 className="font-display font-bold text-2xl tracking-tight">La méthode</h2>
              <ol className="mt-4 grid gap-3 text-sm text-muted-foreground sm:text-base">
                <li className="rounded-2xl border border-orange-100/60 bg-background px-4 py-3 dark:border-orange-900/20 dark:bg-white/[0.03]">
                  <strong>Audit</strong> : on clarifie l'objectif, le process actuel, et les contraintes.
                </li>
                <li className="rounded-2xl border border-orange-100/60 bg-background px-4 py-3 dark:border-orange-900/20 dark:bg-white/[0.03]">
                  <strong>V1 utile</strong> : une première version en production (prospects + suivi + relances).
                </li>
                <li className="rounded-2xl border border-orange-100/60 bg-background px-4 py-3 dark:border-orange-900/20 dark:bg-white/[0.03]">
                  <strong>Optimisation</strong> : itérations courtes, KPI, SEO, automatisations supplémentaires.
                </li>
              </ol>
            </div>
          </section>
        </ScrollReveal>

        {/* VALUES */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-16" aria-label="Valeurs">
            <h2 className="font-display font-bold text-2xl tracking-tight">Ce qui compte vraiment</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Des principes simples qui évitent 90% des projets qui s'enlisent.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {VALUES.map((v, i) => (
                <ScrollReveal key={v.title} direction="up" delay={i * 80}>
                  <div className="group rounded-3xl border border-orange-100/70 bg-linear-to-br from-orange-50/40 to-amber-50/20 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-orange-200/80 dark:border-orange-900/20 dark:from-orange-950/20 dark:to-amber-950/10 dark:hover:border-orange-800/30 dark:hover:shadow-orange-950/20">
                    <div className="mb-3 text-2xl text-orange-400/70 dark:text-orange-600/50">{v.icon}</div>
                    <p className="text-sm font-semibold text-foreground">{v.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* WHAT WE DO */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-16" aria-label="Ce que nous faisons">
            <div className="rounded-3xl border border-orange-100/70 bg-linear-to-r from-orange-50/50 to-amber-50/30 p-8 dark:border-orange-900/20 dark:from-orange-950/25 dark:to-amber-950/15">
              <h2 className="font-display font-bold text-2xl tracking-tight">Concrètement, on fait quoi ?</h2>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                On construit une machine commerciale simple, et on la rend fiable. Vous gardez le contrôle,
                avec des indicateurs clairs.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Génération de prospects qualifiés (ciblage + données propres)",
                  "Automatisation des relances (séquences simples, suivi réponses)",
                  'CRM & RDV (pipeline utilisable, pas "usine à gaz")',
                  "Dashboard KPI (leads, réponses, RDV, signatures)",
                  "Sites SEO + SEO IA (structure claire, 1 service = 1 page)",
                  "Automatisations fiables (contrôles, logs, run maîtrisé)",
                ].map((x) => (
                  <div
                    key={x}
                    className="rounded-2xl border border-orange-100/60 bg-background px-4 py-3 text-sm text-muted-foreground dark:border-orange-900/15 dark:bg-white/[0.03]"
                  >
                    {x}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  Voir les services
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700"
                >
                  Demander un audit
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-16" aria-label="FAQ">
            <h2 className="font-display font-bold text-2xl tracking-tight">FAQ</h2>
            <div className="mt-6 space-y-4">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-3xl border border-orange-100/70 bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-200 open:shadow-md hover:bg-orange-50/30 dark:border-orange-900/20 dark:bg-white/[0.03] dark:hover:bg-orange-950/10 dark:hover:border-orange-800/30"
                >
                  <summary className="cursor-pointer font-medium">{f.q}</summary>
                  <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* FINAL CTA */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-20" aria-label="Appel à l'action">
            <div className="rounded-3xl border border-orange-100/70 bg-linear-to-r from-orange-50/50 to-amber-50/30 p-10 text-center shadow-sm dark:border-orange-900/20 dark:from-orange-950/25 dark:to-amber-950/15 dark:shadow-lg dark:shadow-orange-950/10">
              <h2 className="font-display font-bold text-3xl tracking-tight">On démarre par l'audit</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                15–30 minutes. 3 priorités. Un plan clair. Puis une V1 utile.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
                >
                  Réserver l'audit
                </Link>
                <Link
                  href="/cas-clients"
                  className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  Voir des résultats
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

      </div>
    </main>
  );
}
