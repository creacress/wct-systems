import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digital Workplace — Bureau virtuel gamifié pour PME | WCT Systems",
  description:
    "Digital Workplace : bureau virtuel gamifié où chaque pièce est un outil métier. Gamification, messagerie temps réel, KPI, intégration 200+ outils. À partir de 199 €/mois. Audit gratuit.",
  alternates: { canonical: "/services/digital-workplace" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const FAQ = [
  {
    q: "C'est quoi un Digital Workplace exactement ?",
    a: "Un Digital Workplace est un bureau virtuel qui regroupe tous vos outils métier dans un seul espace. Chaque « pièce » correspond à une fonction (RH, Ventes, Support, Projet…). Votre équipe y travaille, communique et collabore sans jongler entre 10 onglets.",
  },
  {
    q: "La gamification, c'est sérieux ?",
    a: "Oui. Des études montrent que la gamification augmente l'engagement de 48% et la productivité de 36%. Les XP, badges et classements créent de la motivation intrinsèque — votre équipe progresse et le voit concrètement.",
  },
  {
    q: "Le Digital Workplace remplace mes outils actuels ?",
    a: "Pas forcément. Il les centralise dans un bureau virtuel unifié. Vos outils existants (Notion, Slack, Google, Microsoft 365…) s'intègrent directement dans les pièces du Workplace.",
  },
  {
    q: "Combien de temps pour déployer le Workplace ?",
    a: "Environ 14 jours : audit de vos outils actuels (J1-J3), configuration des pièces métier (J4-J8), gamification et onboarding (J9-J12), go live et optimisation (J13-J14).",
  },
  {
    q: "C'est adapté à une petite équipe ?",
    a: "Oui. On propose des templates de bureaux par taille et secteur (agence, cabinet, startup, PME). Même une équipe de 5 personnes gagne en efficacité et en engagement.",
  },
  {
    q: "Les données sont-elles sécurisées ?",
    a: "Oui. Hébergement européen, chiffrement de bout en bout, SSO compatible. Vos données restent privées et conformes RGPD.",
  },
] as const;

export default function DigitalWorkplacePage() {
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
            name: "Digital Workplace",
            item: `${SITE_URL}/services/digital-workplace`,
          },
        ],
      },
      {
        "@type": "Service",
        name: "Digital Workplace — Bureau virtuel gamifié pour PME",
        description:
          "Bureau virtuel gamifié tout-en-un pour PME : pièces thématiques, gamification (XP, badges, classements), messagerie temps réel, KPI, intégration 200+ outils.",
        provider: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: "France" },
        url: `${SITE_URL}/services/digital-workplace`,
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
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            <span className="rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-semibold text-white">
              Nouveau
            </span>
            Digital Workplace &bull; Gamifié
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Votre bureau virtuel.
            <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              Gamifié et tout-en-un.
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground">
            Un espace de travail digital où chaque pièce est un outil métier.
            Gamification intégrée, messagerie temps réel, KPI par équipe et intégration
            de vos outils existants. Le travail devient un jeu.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact?service=digital-workplace"
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              Demander un audit gratuit
            </Link>
            <div className="text-sm text-muted-foreground">
              249&nbsp;&euro; HT/mois &middot; Setup 790&nbsp;&euro; &middot; Déploiement en 14 jours
            </div>
          </div>
        </section>

        {/* LE PROBLÈME */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Le problème courant</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Outils dispersés",
                desc: "Email, Slack, Notion, Drive, CRM, tableur… Votre équipe jongle entre 5 à 10 outils non connectés.",
              },
              {
                title: "Pas d'engagement",
                desc: "Les outils internes sont subis, pas adoptés. Le taux d'utilisation chute après 2 mois.",
              },
              {
                title: "Onboarding long",
                desc: "Un nouveau collaborateur met 3 à 6 mois pour être pleinement opérationnel.",
              },
              {
                title: "Données en silos",
                desc: "Les infos sont éparpillées : chaque service a ses fichiers, ses habitudes, ses outils.",
              },
              {
                title: "Pas de visibilité",
                desc: "Impossible de savoir qui fait quoi, où en est un projet, quels sont les KPI d'équipe.",
              },
              {
                title: "Temps perdu",
                desc: "40% du temps de travail est consacré à des tâches admin et de la coordination manuelle.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-violet-500/20 dark:hover:bg-white/[0.06]"
              >
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CE QUI EST INCLUS */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Ce qui est inclus</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Bureau virtuel avec pièces thématiques (RH, Ventes, Support, Projet…)",
              "Gamification intégrée : XP, badges, classements, quêtes quotidiennes",
              "Messagerie d'équipe en temps réel (chat, visio, huddles)",
              "Tableau de bord KPI par équipe et par collaborateur",
              "Intégration outils existants (Notion, Slack, Google, Microsoft 365…)",
              "Automatisations intégrées (workflows inter-pièces)",
              "Templates de bureaux par secteur (agence, cabinet, startup, PME…)",
              "Onboarding gamifié pour les nouveaux collaborateurs",
              "Gestion documentaire centralisée (par pièce)",
              "Mobile-first : accès depuis n'importe où",
            ].map((item, i) => (
              <div
                key={item}
                className="group rounded-3xl border bg-muted/40 p-6 transition hover:bg-muted dark:border-white/[0.06] dark:bg-violet-500/[0.03] dark:hover:bg-violet-500/[0.06]"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-violet-100 text-sm font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                  {i + 1}
                </div>
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMMENT ÇA MARCHE */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Comment ça marche</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "Étape 1",
                title: "Audit de vos outils",
                desc: "On cartographie vos outils actuels, vos process et vos pain points. Gratuit, 30 min.",
              },
              {
                step: "Étape 2",
                title: "Configuration bureau",
                desc: "On crée vos pièces métier, connecte vos outils et configure les workflows inter-pièces.",
              },
              {
                step: "Étape 3",
                title: "Déploiement",
                desc: "Migration des données, onboarding gamifié de votre équipe, formation sur chaque pièce.",
              },
              {
                step: "Étape 4",
                title: "Gamification",
                desc: "Activation des XP, badges, classements et quêtes. Optimisation continue basée sur les KPI.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.step}</p>
                <p className="mt-2 font-medium">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ROI */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Exemple de ROI</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Hypothèse</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Équipe de 10 personnes, 40% du temps en tâches admin et coordination
              </p>
            </div>
            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Gain</p>
              <p className="mt-2 text-sm text-muted-foreground">
                ~160h/mois récupérées par l&apos;équipe grâce à la centralisation
              </p>
            </div>
            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Impact</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Engagement x3, onboarding 2x plus rapide, turnover en baisse
              </p>
            </div>
          </div>

          <div className="rounded-3xl border bg-muted p-6 dark:border-white/[0.06] dark:bg-violet-500/[0.04]">
            <p className="text-sm font-medium">Traduction business</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Un bureau virtuel qui <strong>centralise 10 outils en 1</strong>,
              réduit l&apos;onboarding de <strong>6 mois à 3 mois</strong> et
              augmente l&apos;engagement de <strong>+48%</strong> grâce à la gamification.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              *Exemple indicatif : dépend de la taille de votre équipe et de vos process actuels.
            </p>
          </div>
        </section>

        {/* BEFORE AFTER */}
        <section className="mt-16 sm:mt-24 space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Avant / Après</h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border p-8 dark:border-white/[0.08]">
              <p className="text-sm font-medium">Avant</p>
              <p className="mt-4 text-sm text-muted-foreground">
                10 onglets ouverts, pas d&apos;engagement sur les outils internes,
                onboarding de 6 mois, données en silos, aucune visibilité sur les KPI d&apos;équipe.
              </p>
            </div>
            <div className="rounded-3xl border bg-muted p-8 dark:border-white/[0.06] dark:bg-violet-500/[0.04]">
              <p className="text-sm font-medium">Après</p>
              <p className="mt-4 text-sm text-muted-foreground">
                1 bureau virtuel, équipe engagée grâce à la gamification,
                onboarding en 3 mois, données centralisées, KPI en temps réel par pièce.
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
                className="group rounded-3xl border bg-background p-6 transition hover:bg-muted dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
              >
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-20">
          <div className="rounded-3xl border bg-linear-to-r from-violet-50 to-indigo-50/80 dark:from-violet-950/40 dark:to-indigo-950/30 p-10 text-center shadow-sm dark:border-violet-500/20 dark:shadow-lg dark:shadow-violet-500/10">
            <h2 className="text-3xl font-semibold tracking-tight">Prêt à transformer votre façon de travailler ?</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Audit gratuit → Configuration bureau → Déploiement gamifié → Go live en 14 jours.
            </p>
            <Link
              href="/contact?service=digital-workplace"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
            >
              Réserver l&apos;audit
            </Link>
          </div>
        </section>

        {/* Cross-linking */}
        <section className="mt-12 text-sm text-muted-foreground">
          <p>
            À combiner avec :{" "}
            <Link className="underline hover:opacity-80" href="/services/automatiser-relances">
              Automatisation (RPA)
            </Link>
            {" "}et{" "}
            <Link className="underline hover:opacity-80" href="/services/integration-ia">
              Intégration IA
            </Link>
            {" "}pour un écosystème complet.
          </p>
        </section>
      </div>
    </main>
  );
}
