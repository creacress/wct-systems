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
  title: "Digital Workplace — Bureau virtuel gamifié pour PME | WCT Systems",
  description:
    "Centralisez vos outils dans un bureau virtuel gamifié : chaque pièce = un outil métier. CRM, messagerie, projets, KPI — tout dans un seul espace. À partir de 199€/mois.",
  keywords: ["digital workplace PME", "bureau virtuel", "espace de travail collaboratif", "virtual office", "outil collaboratif PME"],
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
          { "@type": "ListItem", position: 3, name: "Digital Workplace", item: `${SITE_URL}/services/digital-workplace` },
        ],
      },
      {
        "@type": "Service",
        name: "Digital Workplace — Bureau virtuel gamifié pour PME",
        description: "Bureau virtuel gamifié tout-en-un pour PME : pièces thématiques, gamification (XP, badges, classements), messagerie temps réel, KPI, intégration 200+ outils.",
        provider: { "@type": "Organization", name: "WCT Systems", url: SITE_URL },
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

      {/* Background: Game Office universe — Cyan/Lime with Tron grid */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-50/50 via-background to-background dark:from-cyan-950/20 dark:via-background" />
      <GridPattern variant="line" color="rgba(6, 182, 212, 0.06)" />
      <PageBackground variant="tron" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">

        <Breadcrumbs items={[
          { label: "Accueil", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Digital Workplace" },
        ]} />

        {/* ── HERO ── */}
        <section className="space-y-8">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/60 bg-cyan-50/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-cyan-700 backdrop-blur dark:border-cyan-800/60 dark:bg-cyan-950/50 dark:text-cyan-300">
              <span className="rounded-full bg-cyan-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                Nouveau
              </span>
              Digital Workplace &bull; Gamifié
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Votre bureau virtuel.
              <span className="block bg-gradient-to-r from-cyan-600 via-teal-500 to-lime-500 bg-clip-text text-transparent dark:from-cyan-400 dark:via-teal-400 dark:to-lime-400">
                Gamifié et tout-en-un.
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Un espace de travail digital où chaque pièce est un outil métier.
              Gamification intégrée, messagerie temps réel, KPI par équipe et intégration
              de vos outils existants. <strong className="text-foreground">Le travail devient un jeu.</strong>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <TrackedLink
                href="/contact?service=digital-workplace"
                trackAs="audit_digital_workplace"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:bg-cyan-700 hover:shadow-xl"
              >
                Demander un audit gratuit
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </TrackedLink>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="font-display font-semibold text-foreground">199&nbsp;&euro;</span> HT/mois
                <span className="h-4 w-px bg-border" />
                Setup 490&nbsp;&euro;
                <span className="h-4 w-px bg-border" />
                14 jours
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── STATS ── */}
        <section className="mt-16">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { end: 200, suffix: "+", label: "Intégrations" },
              { end: 48, suffix: "%", label: "Engagement en plus" },
              { end: 14, suffix: " jours", label: "Déploiement" },
              { end: 10, suffix: " en 1", label: "Outils centralisés" },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 80}>
                <div className="rounded-2xl border bg-background/70 p-5 text-center shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="font-display text-2xl font-bold tracking-tight text-cyan-600 dark:text-cyan-400">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── LE PROBLÈME ── */}
        <section className="mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Le problème courant</h2>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Outils dispersés", desc: "Email, Slack, Notion, Drive, CRM, tableur... Votre équipe jongle entre 5 à 10 outils non connectés." },
              { title: "Pas d'engagement", desc: "Les outils internes sont subis, pas adoptés. Le taux d'utilisation chute après 2 mois." },
              { title: "Onboarding long", desc: "Un nouveau collaborateur met 3 à 6 mois pour être pleinement opérationnel." },
              { title: "Données en silos", desc: "Les infos sont éparpillées : chaque service a ses fichiers, ses habitudes, ses outils." },
              { title: "Pas de visibilité", desc: "Impossible de savoir qui fait quoi, où en est un projet, quels sont les KPI d'équipe." },
              { title: "Temps perdu", desc: "40% du temps de travail est consacré à des tâches admin et de la coordination manuelle." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 60}>
                <div className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-cyan-500/20">
                  <p className="font-display text-sm font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── CE QUI EST INCLUS ── */}
        <section className="mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Ce qui est inclus</h2>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Bureau virtuel avec pièces thématiques (RH, Ventes, Support, Projet...)",
              "Gamification intégrée : XP, badges, classements, quêtes quotidiennes",
              "Messagerie d'équipe en temps réel (chat, visio, huddles)",
              "Tableau de bord KPI par équipe et par collaborateur",
              "Intégration outils existants (Notion, Slack, Google, Microsoft 365...)",
              "Automatisations intégrées (workflows inter-pièces)",
              "Templates de bureaux par secteur (agence, cabinet, startup, PME...)",
              "Onboarding gamifié pour les nouveaux collaborateurs",
              "Gestion documentaire centralisée (par pièce)",
              "Mobile-first : accès depuis n'importe où",
            ].map((item, i) => (
              <ScrollReveal key={item} delay={i * 50}>
                <div className="group flex items-start gap-3 rounded-2xl border bg-gradient-to-br from-cyan-50/40 to-teal-50/20 p-5 transition-all duration-300 hover:shadow-md dark:border-white/[0.06] dark:from-cyan-500/[0.04] dark:to-teal-500/[0.02] dark:hover:border-cyan-500/20">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-100 font-display text-xs font-bold text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-400">
                    {i + 1}
                  </span>
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── COMMENT ÇA MARCHE ── */}
        <section className="mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Comment ça marche</h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Audit outils", desc: "Cartographie outils actuels, process et pain points. Gratuit, 30 min.", days: "J1-J3" },
              { step: "02", title: "Configuration bureau", desc: "Pièces métier, connexion outils, workflows inter-pièces.", days: "J4-J8" },
              { step: "03", title: "Déploiement", desc: "Migration données, onboarding gamifié, formation équipe.", days: "J9-J12" },
              { step: "04", title: "Gamification", desc: "XP, badges, classements, quêtes. Optimisation continue sur KPI.", days: "J13-J14" },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 100}>
                <div className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 font-display text-sm font-bold text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-400">
                      {item.step}
                    </span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {item.days}
                    </span>
                  </div>
                  <p className="mt-3 font-display font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── ROI ── */}
        <section className="mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Exemple de ROI</h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Hypothèse", value: "10 personnes", detail: "40% du temps en tâches admin et coordination" },
                { label: "Gain", value: "~160h/mois", detail: "récupérées par l'équipe grâce à la centralisation" },
                { label: "Impact", value: "x3 engagement", detail: "onboarding 2x plus rapide, turnover en baisse" },
              ].map((x) => (
                <div key={x.label} className="rounded-2xl border bg-background/70 p-5 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{x.label}</p>
                  <p className="mt-2 font-display text-xl font-bold tracking-tight text-cyan-600 dark:text-cyan-400">{x.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{x.detail}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="rounded-3xl border bg-gradient-to-br from-cyan-50/50 to-teal-50/30 p-6 dark:border-white/[0.06] dark:from-cyan-500/[0.06] dark:to-teal-500/[0.03]">
              <p className="font-display text-sm font-semibold">Traduction business</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Un bureau virtuel qui <strong className="text-foreground">centralise 10 outils en 1</strong>,
                réduit l&apos;onboarding de <strong className="text-foreground">6 mois à 3 mois</strong> et
                augmente l&apos;engagement de <strong className="text-foreground">+48%</strong> grâce à la gamification.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                *Exemple indicatif : dépend de la taille de votre équipe et de vos process actuels.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ── BEFORE/AFTER ── */}
        <section className="mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Avant / Après</h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            <ScrollReveal delay={0}>
              <div className="rounded-3xl border p-8 dark:border-white/[0.08]">
                <div className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  Avant
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  10 onglets ouverts, pas d&apos;engagement sur les outils internes,
                  onboarding de 6 mois, données en silos, aucune visibilité sur les KPI d&apos;équipe.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="rounded-3xl border bg-gradient-to-br from-cyan-50/50 to-lime-50/30 p-8 dark:border-cyan-500/20 dark:from-cyan-500/[0.06] dark:to-lime-500/[0.03]">
                <div className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                  Après
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  1 bureau virtuel, équipe engagée grâce à la gamification,
                  onboarding en 3 mois, données centralisées, KPI en temps réel par pièce.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-24 space-y-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Questions fréquentes</h2>
          </ScrollReveal>

          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 60}>
                <details className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-200 open:shadow-md hover:bg-muted/50 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
                  <summary className="cursor-pointer font-display font-medium">{f.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="mt-24">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-cyan-50 via-teal-50/60 to-lime-50/30 p-10 text-center shadow-sm dark:border-cyan-500/20 dark:from-cyan-950/40 dark:via-teal-950/20 dark:to-lime-950/10 dark:shadow-lg dark:shadow-cyan-500/10">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-lime-400/10 blur-3xl" />

              <h2 className="relative font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Prêt à transformer votre façon de travailler ?
              </h2>
              <p className="relative mt-4 text-muted-foreground">
                Audit gratuit → Configuration bureau → Déploiement gamifié → Go live en 14 jours.
              </p>
              <TrackedLink
                href="/contact?service=digital-workplace"
                trackAs="audit_digital_workplace_final"
                className="relative mt-8 inline-flex items-center justify-center rounded-2xl bg-cyan-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.02] hover:bg-cyan-700"
              >
                Réserver l&apos;audit
              </TrackedLink>
            </div>
          </ScrollReveal>
        </section>

        <RelatedServices currentService="digital-workplace" />

      </div>
    </main>
  );
}
