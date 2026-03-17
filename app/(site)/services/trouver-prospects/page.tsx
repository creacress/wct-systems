import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import CountUp from "@/components/ui/count-up";
import GridPattern from "@/components/ui/grid-pattern";
import Breadcrumbs from "@/components/site/breadcrumbs";
import RelatedServices from "@/components/site/related-services";
import { TrackedLink } from "@/components/site/tracked-link";

export const metadata: Metadata = {
  title: "Prospection B2B automatisée pour PME — Outil IA | WCT Systems",
  description:
    "Automatisez votre prospection B2B : ciblage IA par secteur et zone, enrichissement email/LinkedIn, scoring leads, intégration CRM. À partir de 99€/mois. Audit gratuit.",
  keywords: ["prospection B2B PME", "outil prospection IA", "automatiser prospection commerciale", "trouver prospects qualifiés"],
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

      {/* Background: Radar universe — Emerald/Green */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/50 via-background to-background dark:from-emerald-950/20 dark:via-background" />
      <GridPattern variant="dot" color="rgba(16, 185, 129, 0.06)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">

        <Breadcrumbs items={[
          { label: "Accueil", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Prospection IA" },
        ]} />

        {/* ── HERO ── */}
        <section className="space-y-8">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-emerald-700 backdrop-blur dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Acquisition B2B automatisée
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Trouver des prospects qualifiés
              <span className="block bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-green-400 dark:to-teal-400">
                sans perdre de temps
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Nous mettons en place un système automatisé qui identifie les bonnes
              entreprises, nettoie les données et les intègre directement dans votre
              suivi commercial.{" "}
              <strong className="text-foreground">Votre radar commercial, toujours actif.</strong>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <TrackedLink
                href="/contact?service=prospects"
                trackAs="audit_trouver_prospects"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02]"
              >
                Demander un audit gratuit
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </TrackedLink>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-500">✓</span> Ciblage précis
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-500">✓</span> Données propres
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-500">✓</span> Intégration CRM
                </span>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── STATS ── */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-20">
            <div className="grid gap-px rounded-3xl border border-emerald-100/60 bg-emerald-100/40 overflow-hidden dark:border-emerald-900/40 dark:bg-emerald-900/10 sm:grid-cols-3">
              {[
                { value: 40, suffix: "h", label: "récupérées par mois", desc: "sur la prospection manuelle" },
                { value: 200, suffix: "+", label: "prospects/mois ciblés", desc: "vs ~80 en manuel" },
                { value: 5, suffix: "×", label: "plus de volume traité", desc: "pour le même budget temps" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1 bg-background/70 p-8 text-center backdrop-blur dark:bg-background/40"
                >
                  <p className="font-display text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm font-medium text-foreground">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ── PROBLEM ── */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Le problème courant des PME
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "⏱",
                title: "Recherche chronophage",
                desc: "Recherche manuelle longue et chronophage qui mobilise vos commerciaux sur des tâches à faible valeur ajoutée.",
              },
              {
                icon: "📋",
                title: "Listes peu fiables",
                desc: "Listes peu fiables ou mal ciblées, avec doublons et contacts obsolètes qui nuisent à votre réputation d'envoi.",
              },
              {
                icon: "🗂",
                title: "Suivi désorganisé",
                desc: "Suivi commercial désorganisé entre Excel épars, notes oubliées et relances qui tombent à l'eau.",
              },
            ].map((item) => (
              <ScrollReveal key={item.title} delay={100}>
                <div className="group h-full rounded-3xl border bg-gradient-to-br from-emerald-50/40 to-green-50/20 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/[0.08] dark:bg-gradient-to-br dark:from-emerald-500/[0.04] dark:to-green-500/[0.02] dark:hover:border-emerald-500/20 dark:hover:bg-emerald-500/[0.06] dark:hover:shadow-lg dark:hover:shadow-emerald-500/5">
                  <div className="mb-4 text-2xl">{item.icon}</div>
                  <p className="font-display mb-2 text-sm font-bold text-foreground">{item.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── SOLUTION (process steps) ── */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              La solution en 4 étapes
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                step: "01",
                title: "Ciblage précis",
                desc: "Ciblage précis par secteur d'activité, zone géographique, taille d'entreprise et autres critères métiers.",
              },
              {
                step: "02",
                title: "Nettoyage des données",
                desc: "Nettoyage automatique et suppression des doublons pour des listes exploitables immédiatement.",
              },
              {
                step: "03",
                title: "Intégration CRM",
                desc: "Intégration automatique dans votre CRM ou outil de suivi existant, sans ressaisie manuelle.",
              },
              {
                step: "04",
                title: "Base prête aux relances",
                desc: "Base propre et structurée, prête à alimenter vos séquences de relances automatisées.",
              },
            ].map((item) => (
              <ScrollReveal key={item.step} delay={100}>
                <div className="group flex gap-5 rounded-3xl border bg-gradient-to-br from-emerald-50/40 to-green-50/20 p-6 transition hover:shadow-md dark:border-white/[0.06] dark:from-emerald-500/[0.04] dark:to-green-500/[0.02] dark:hover:border-emerald-500/20 dark:hover:shadow-emerald-500/5">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600/10 text-sm font-bold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <p className="font-display mb-1.5 text-sm font-bold text-foreground">{item.title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── ROI ── */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Exemple de ROI
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            <ScrollReveal delay={0}>
              <div className="h-full rounded-3xl border bg-gradient-to-br from-emerald-50/40 to-green-50/20 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:from-emerald-500/[0.04] dark:to-green-500/[0.02]">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Hypothèse</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  2h/jour de prospection manuelle → automatisée
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="h-full rounded-3xl border bg-gradient-to-br from-emerald-50/40 to-green-50/20 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:from-emerald-500/[0.04] dark:to-green-500/[0.02]">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Gain</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  ~40h/mois récupérées (temps vendu ou réinvesti)
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="h-full rounded-3xl border bg-gradient-to-br from-emerald-50/40 to-green-50/20 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:from-emerald-500/[0.04] dark:to-green-500/[0.02]">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Impact</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  + volume de contacts traités → + chances de devis signés
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={100}>
            <div className="rounded-3xl border bg-emerald-50/60 p-6 dark:border-emerald-500/20 dark:bg-emerald-500/[0.05]">
              <p className="font-display text-sm font-bold text-foreground">Traduction business</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Si votre taux de conversion est de{" "}
                <strong className="text-emerald-700 dark:text-emerald-400">5%</strong> et que vous traitez{" "}
                <strong className="text-emerald-700 dark:text-emerald-400">200 prospects/mois</strong>{" "}
                au lieu de 80, vous augmentez mécaniquement le nombre d&apos;opportunités.
                On met ensuite en place les relances pour améliorer le taux de réponse.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                *Exemple indicatif : le ROI dépend de votre offre, zone, saisonnalité et qualité du suivi.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ── BEFORE / AFTER ── */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Avant / Après
            </h2>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2">
            <ScrollReveal delay={0}>
              <div className="h-full rounded-3xl border p-8 dark:border-white/[0.08]">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  Avant
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Prospection manuelle, Excel dispersés, relances oubliées. Vos commerciaux
                  passent des heures à chercher des contacts plutôt qu&apos;à les convertir.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="h-full rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-green-50/30 p-8 dark:border-emerald-500/20 dark:from-emerald-500/[0.06] dark:to-green-500/[0.03]">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Après
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Pipeline propre, prospects ciblés automatiquement, suivi
                  structuré et prêt à convertir. Votre radar détecte les opportunités en continu.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Questions fréquentes
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {FAQ.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 80}>
                <details className="group rounded-3xl border bg-background p-6 transition hover:bg-emerald-50/40 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-emerald-500/20 dark:hover:bg-emerald-500/[0.04]">
                  <summary className="cursor-pointer font-display font-bold text-sm text-foreground marker:text-emerald-500">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <ScrollReveal delay={100}>
          <section className="mt-20">
            <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-green-50/60 to-teal-50/30 p-10 text-center shadow-sm dark:border-emerald-500/20 dark:from-emerald-950/40 dark:via-green-950/20 dark:to-teal-950/10 dark:shadow-lg dark:shadow-emerald-500/10">
              {/* Decorative orbs */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-green-400/20 blur-3xl dark:bg-green-500/10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-300/15 blur-2xl dark:bg-teal-500/[0.07]"
              />

              <div className="relative">
                <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  Prêt à générer plus d&apos;opportunités ?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  On définit votre cible et on lance la première version du système.
                  <br className="hidden sm:block" />
                  Votre radar commercial sera opérationnel en quelques jours.
                </p>
                <TrackedLink
                  href="/contact?service=prospects"
                  trackAs="audit_trouver_prospects_final"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02]"
                >
                  Réserver l&apos;audit
                </TrackedLink>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <RelatedServices currentService="trouver-prospects" />

      </div>
    </main>
  );
}
