import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import CountUp from "@/components/ui/count-up";
import GridPattern from "@/components/ui/grid-pattern";
import { PageBackground } from "@/components/site/page-background";
import Breadcrumbs from "@/components/site/breadcrumbs";
import RelatedServices from "@/components/site/related-services";
import { TrackedLink } from "@/components/site/tracked-link";

export const metadata: Metadata = {
  title: "Automatiser relances commerciales PME — RPA sans code | WCT Systems",
  description:
    "Automatisez vos relances, CRM, reporting et facturation avec des workflows sur mesure. 200+ intégrations, dashboard KPI. À partir de 149€/mois.",
  keywords: ["automatiser relances commerciales", "RPA PME", "automatisation n8n", "workflow automatique"],
  alternates: { canonical: "/services/automatiser-relances" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const FAQ = [
  {
    q: "Est-ce que ça risque d'envoyer des emails 'robot' ?",
    a: "Non. On écrit des séquences simples et humaines, avec des relances sobres. L'objectif est d'éviter les oublis, pas de spammer.",
  },
  {
    q: "Vous pouvez vous connecter à mon outil actuel ?",
    a: "Oui : CRM, tableur, Notion, Airtable, HubSpot, Gmail/Outlook, Slack, et 200+ autres outils. On s'adapte et on simplifie.",
  },
  {
    q: "Je n'ai pas beaucoup de prospects, c'est utile quand même ?",
    a: "Oui. Même avec peu de leads, les relances augmentent fortement le taux de réponse. Et l'automatisation CRM/reporting vous fait gagner du temps immédiatement.",
  },
  {
    q: "Est-ce que le dashboard KPI est inclus ?",
    a: "Oui. Un dashboard en temps réel fait partie du service : leads, réponses, devis, signatures, alertes.",
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
            name: "Automatisation (RPA)",
            item: `${SITE_URL}/services/automatiser-relances`,
          },
        ],
      },
      {
        "@type": "Service",
        name: "Automatisation (RPA) — Relances, CRM, Reporting",
        description:
          "Service d'automatisation RPA pour PME : workflows sur mesure, relances email, CRM, facturation, reporting, dashboard KPI, intégration 200+ outils.",
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

      {/* Background gradient — Machine Room amber/orange universe */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-amber-50/50 via-background to-background dark:from-amber-950/20" />
      <GridPattern variant="line" color="rgba(245, 158, 11, 0.05)" />
      <PageBackground variant="circuit" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        <Breadcrumbs items={[
          { label: "Accueil", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Automatisation RPA" },
        ]} />

        {/* HERO */}
        <ScrollReveal delay={0}>
          <section className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs uppercase tracking-wide text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
              RPA &bull; Relances &bull; CRM &bull; KPI
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              Automatisez vos process
              <span className="block bg-linear-to-r from-amber-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-yellow-400">
                sans coder
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              Relances, CRM, facturation, reporting : on automatise vos workflows sur mesure.
              Intégration avec 200+ outils, dashboard KPI en temps réel, alertes automatiques.
              Vous gardez le contrôle, sans les tâches répétitives.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <TrackedLink
                href="/contact?service=automatisation"
                trackAs="audit_automatiser_relances"
                className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-amber-500/25 transition hover:scale-[1.02] hover:bg-amber-700"
              >
                Demander un audit gratuit
              </TrackedLink>
              <div className="text-sm text-muted-foreground">
                149 &euro; HT/mois &middot; Mise en place incluse &middot; 200+ outils
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* STATS ROW */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-20">
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { end: 200, suffix: "+", label: "outils connectés" },
                { end: 80, suffix: "%", label: "de tâches répétitives éliminées" },
                { end: 18, suffix: "%", label: "de taux de réponse moyen" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border bg-gradient-to-br from-amber-50/40 to-orange-50/20 p-6 text-center shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04] dark:from-amber-500/[0.04] dark:to-orange-500/[0.02]"
                >
                  <p className="text-3xl font-display font-bold text-amber-600 dark:text-amber-400">
                    <CountUp end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* PROBLEM */}
        <ScrollReveal delay={0}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Le problème courant</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                "Prospects oubliés ou relancés trop tard",
                "Suivi dispersé entre 5 outils différents",
                "Pas de visibilité sur ce qui marche (KPI flous)",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-amber-500/20 dark:hover:bg-white/[0.06]"
                >
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* WHAT'S INCLUDED */}
        <ScrollReveal delay={0}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Ce qui est inclus</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Workflows sur mesure", desc: "Relances, CRM, facturation, onboarding — on automatise vos process clés." },
                { title: "Intégration 200+ outils", desc: "Gmail, Notion, HubSpot, Airtable, Slack, Stripe, et bien plus." },
                { title: "Dashboard KPI", desc: "Leads, réponses, devis, signatures — suivi en temps réel." },
                { title: "Alertes automatiques", desc: "Notifications quand un seuil est atteint ou qu'une action est nécessaire." },
                { title: "Pipeline CRM clair", desc: "Suivi des prospects du premier contact à la signature." },
                { title: "Support & maintenance", desc: "On maintient et fait évoluer vos automations en continu." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border bg-gradient-to-br from-amber-50/40 to-orange-50/20 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/[0.08] dark:from-amber-500/[0.04] dark:to-orange-500/[0.02] dark:hover:border-amber-500/20 dark:hover:bg-white/[0.06]"
                >
                  <p className="font-display font-bold text-sm">{item.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ROI */}
        <ScrollReveal delay={0}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Exemple de ROI</h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Hypothèse</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  100 prospects/mois &bull; 10% répondent
                </p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Après automatisation</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  10% → 18% de réponses + pipeline clair
                </p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Impact</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  + opportunités, + devis, + signatures
                </p>
              </div>
            </div>

            <div className="rounded-3xl border bg-gradient-to-br from-amber-50/40 to-orange-50/20 p-6 dark:border-white/[0.06] dark:from-amber-500/[0.04] dark:to-orange-500/[0.02]">
              <p className="font-display font-bold text-sm">Traduction business</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Si votre panier moyen est de <strong>1 500&euro;</strong> et que vous signez <strong>20%</strong> des
                prospects qui répondent, passer de 10 à 18 réponses + un pipeline structuré peut ajouter
                plusieurs ventes chaque mois.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                *Exemple indicatif : dépend de votre offre, délai de décision et qualité des messages.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* PROCESS STEPS */}
        <ScrollReveal delay={0}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Comment ça marche</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                { step: 1, title: "Audit des process", desc: "On cartographie vos workflows actuels et identifions les tâches à automatiser en priorité." },
                { step: 2, title: "Conception des automations", desc: "On conçoit vos workflows sur mesure, branchés sur vos outils existants." },
                { step: 3, title: "Mise en production", desc: "On déploie, on teste et on forme votre équipe sur les nouvelles automations." },
                { step: 4, title: "Optimisation continue", desc: "On mesure les résultats via le dashboard KPI et on ajuste en continu." },
              ].map((item) => (
                <div
                  key={item.step}
                  className="group rounded-3xl border bg-gradient-to-br from-amber-50/40 to-orange-50/20 p-6 transition hover:shadow-md dark:border-white/[0.06] dark:from-amber-500/[0.04] dark:to-orange-500/[0.02] dark:hover:border-amber-500/20"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                      {item.step}
                    </span>
                    <p className="font-display font-bold text-sm">{item.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* BEFORE AFTER */}
        <ScrollReveal delay={0}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Avant / Après</h2>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-3xl border p-8 dark:border-white/[0.08]">
                <p className="font-display font-bold text-sm">Avant</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Relances manuelles, suivi dispersé, KPI flous, prospects perdus.
                </p>
              </div>
              <div className="rounded-3xl border bg-gradient-to-br from-amber-50/40 to-orange-50/20 p-8 dark:border-amber-500/[0.15] dark:from-amber-500/[0.04] dark:to-orange-500/[0.02]">
                <p className="font-display font-bold text-sm text-amber-700 dark:text-amber-400">Après</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Workflows automatisés, pipeline clair, dashboard KPI, alertes en temps réel.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal delay={0}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Questions fréquentes</h2>

            <div className="space-y-4">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-3xl border bg-background p-6 transition hover:bg-muted dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-amber-500/20 dark:hover:bg-white/[0.06]"
                >
                  <summary className="cursor-pointer font-medium">{f.q}</summary>
                  <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* FINAL CTA */}
        <ScrollReveal delay={0}>
          <section className="mt-20">
            <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-amber-50 via-orange-50/60 to-yellow-50/30 p-10 text-center shadow-sm dark:border-amber-500/20 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-yellow-950/10 dark:shadow-lg dark:shadow-amber-500/10">
              {/* Decorative orbs */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl dark:bg-amber-500/10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-orange-400/20 blur-3xl dark:bg-orange-500/10"
              />

              <div className="relative">
                <h2 className="font-display font-bold text-3xl tracking-tight">On automatise vos process</h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  Audit rapide → workflows prioritaires → dashboard KPI. Ensuite on optimise en continu.
                </p>
                <TrackedLink
                  href="/contact?service=automatisation"
                  trackAs="audit_automatiser_relances_final"
                  className="mt-8 inline-flex items-center justify-center rounded-2xl bg-amber-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-amber-500/25 transition hover:scale-[1.02] hover:bg-amber-700"
                >
                  Réserver l&apos;audit
                </TrackedLink>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <RelatedServices currentService="automatiser-relances" />

      </div>
    </main>
  );
}
