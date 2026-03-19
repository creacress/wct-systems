import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import CountUp from "@/components/ui/count-up";
import GridPattern from "@/components/ui/grid-pattern";
import Breadcrumbs from "@/components/site/breadcrumbs";
import RelatedServices from "@/components/site/related-services";
import { TrackedLink } from "@/components/site/tracked-link";

export const metadata: Metadata = {
  title: "Q2C SaaS — Facturation électronique e-invoicing pour SaaS B2B | WCT Systems",
  description:
    "Le premier SI Full Quote-to-Cash nativement conforme e-facturation 2026 : Factur-X, UBL, CII, TVA OSS 30 pays, connecteur Plateforme Agréée, Revenue Recognition IFRS 15. À partir de 149€/mois.",
  keywords: [
    "facturation électronique SaaS",
    "e-facturation 2026",
    "Factur-X",
    "quote-to-cash",
    "billing SaaS B2B",
    "TVA OSS",
  ],
  alternates: { canonical: "/services/q2c-facturation" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const FAQ = [
  {
    q: "C'est quoi la réforme e-facturation 2026 ?",
    a: "À partir de septembre 2026, toutes les entreprises assujetties à la TVA en France devront émettre et recevoir des factures électroniques via une Plateforme de Dématérialisation Partenaire (PDP) ou le portail public Chorus Pro. Les factures devront respecter les formats Factur-X, UBL ou CII.",
  },
  {
    q: "Mon SaaS facture déjà avec Stripe, pourquoi Q2C ?",
    a: "Stripe génère des reçus de paiement, pas des factures conformes e-facturation. Q2C émet des Factur-X EXTENDED valides, gère la TVA OSS 30 pays, et transmet automatiquement à votre Plateforme Agréée. Stripe reste votre processeur de paiement, Q2C gère la conformité.",
  },
  {
    q: "Q2C remplace Pennylane ?",
    a: "Non. Pennylane est un outil comptable. Q2C couvre le cycle commercial amont : devis → contrat → abonnement → facturation → paiement → dunning. Q2C transmet les factures conformes à Pennylane (ou tout autre outil comptable) via le connecteur Plateforme Agréée.",
  },
  {
    q: "Quels formats sont acceptés ?",
    a: "Q2C génère nativement les 3 formats réglementaires : Factur-X EXTENDED (PDF/A-3 avec XML intégré), UBL (Universal Business Language) et CII (Cross-Industry Invoice). Le format est choisi automatiquement selon le destinataire.",
  },
  {
    q: "Comment se connecter à une Plateforme Agréée ?",
    a: "Q2C intègre un connecteur universel compatible avec les principales PDP : Chorus Pro, Dext, Pennylane, Sage, etc. La connexion se fait en quelques clics depuis le dashboard, sans développement.",
  },
  {
    q: "Est-ce que Q2C gère le prélèvement SEPA ?",
    a: "Oui. Q2C intègre GoCardless pour les prélèvements SEPA (mandat B2B et Core) et Stripe pour les paiements par carte bancaire. Les deux modes sont combinables par client.",
  },
] as const;

const PLANS = [
  {
    name: "Starter",
    price: "149",
    desc: "Pour les SaaS en lancement",
    features: [
      "Jusqu'à 100 factures/mois",
      "Factur-X EXTENDED + UBL",
      "1 connecteur PA",
      "Stripe CB",
      "Dashboard MRR/ARR",
    ],
  },
  {
    name: "Growth",
    price: "399",
    desc: "Pour les SaaS en croissance",
    highlighted: true,
    features: [
      "Jusqu'à 1 000 factures/mois",
      "Factur-X + UBL + CII",
      "3 connecteurs PA",
      "Stripe CB + GoCardless SEPA",
      "TVA OSS 30 pays + VIES",
      "Revenue Recognition IFRS 15",
      "CPQ 6 modèles de pricing",
    ],
  },
  {
    name: "Scale",
    price: "Sur devis",
    desc: "Pour les SaaS établis",
    features: [
      "Factures illimitées",
      "Tous formats + connecteurs",
      "API white-label",
      "Multi-entités juridiques",
      "Account manager dédié",
      "SLA 99.9%",
      "Audit conformité annuel inclus",
    ],
  },
];

// TODO STRIPE — Créer via MCP Stripe tools :
// Product: "Q2C SaaS — Facturation SaaS B2B"
// Price 1: 149€/mois (recurring monthly)
// Price 2: 119€/mois (recurring yearly = 1428€/an)
// Price 3: 490€ (one-time setup)
// Metadata: { service: "q2c-facturation", category: "saas" }

export default function Q2CFacturationPage() {
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
            name: "Q2C SaaS",
            item: `${SITE_URL}/services/q2c-facturation`,
          },
        ],
      },
      {
        "@type": "Service",
        name: "Q2C SaaS — Facturation électronique Quote-to-Cash pour SaaS B2B",
        description:
          "SI de facturation électronique Full Quote-to-Cash nativement conforme e-facturation 2026 : Factur-X, UBL, CII, TVA OSS 30 pays, connecteur Plateforme Agréée, Revenue Recognition IFRS 15.",
        provider: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: "France" },
        url: `${SITE_URL}/services/q2c-facturation`,
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
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-emerald-50/70 via-background to-background dark:from-emerald-950/30" />
      <GridPattern variant="dot" color="rgba(16, 185, 129, 0.06)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        <Breadcrumbs items={[
          { label: "Accueil", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Q2C SaaS" },
        ]} />

        {/* HERO */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs uppercase tracking-wide text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                E-facturation &bull; Quote-to-Cash &bull; SaaS B2B
              </div>
              <div className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm shadow-emerald-500/30">
                Nouveau
              </div>
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              Facturation électronique
              <span className="block bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
                conforme 2026, nativement
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              La réforme e-facturation arrive en septembre 2026. Q2C SaaS est le premier SI
              Full Quote-to-Cash nativement conforme : du devis au paiement, Factur-X natif,
              TVA OSS 30 pays, connecteur Plateforme Agréée.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <TrackedLink
                href="https://app.q2c.webcresson.com"
                trackAs="decouvrir_q2c"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition hover:scale-[1.02] hover:bg-emerald-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Découvrir Q2C SaaS
              </TrackedLink>
              <TrackedLink
                href="/contact?service=q2c-facturation"
                trackAs="audit_q2c"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted dark:border-white/[0.12]"
              >
                Demander un audit
              </TrackedLink>
              <div className="text-sm text-muted-foreground">
                À partir de 149 &euro; HT/mois &middot; Mise en place incluse
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* LE PROBLÈME */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Le problème</h2>

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "La réforme arrive sept. 2026",
                  desc: "Toutes les entreprises assujetties à la TVA devront émettre des factures électroniques via une PDP. Plus de PDF envoyé par email.",
                },
                {
                  title: "Aucun billing SaaS n'est conforme",
                  desc: "Stripe, Chargebee, Zuora : aucun ne génère nativement du Factur-X EXTENDED ni ne transmet à une Plateforme Agréée française.",
                },
                {
                  title: "15 € d'amende par facture",
                  desc: "15 € par facture non conforme, plafonnés à 15 000 €/an. Pour un SaaS à 500 clients, c'est jusqu'à 7 500 €/mois de pénalités.",
                },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 60}>
                  <div className="rounded-3xl border bg-gradient-to-br from-red-50/40 to-orange-50/20 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/[0.08] dark:bg-gradient-to-br dark:from-red-500/[0.04] dark:to-orange-500/[0.02] dark:hover:border-red-500/20 dark:hover:bg-red-500/[0.06]">
                    <p className="font-display text-sm font-medium">{item.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* CE QUI EST INCLUS */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Ce qui est inclus</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                "Factur-X EXTENDED-CTC-FR — le profil le plus complet",
                "Multi-format UBL + CII pour l'interopérabilité EU",
                "PricingEngine 6 modèles (flat, per-seat, usage, tiered, hybrid, custom)",
                "Stripe CB + GoCardless SEPA intégrés",
                "TVA OSS 30 pays + validation VIES temps réel",
                "Dashboard MRR/ARR/Churn + Revenue Recognition IFRS 15",
              ].map((item, i) => (
                <ScrollReveal key={item} delay={i * 70}>
                  <div className="group rounded-3xl border bg-gradient-to-br from-emerald-50/40 to-teal-50/20 p-6 transition hover:bg-muted dark:border-white/[0.06] dark:from-emerald-500/[0.04] dark:to-teal-500/[0.02] dark:hover:bg-emerald-500/[0.06]">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                      {i + 1}
                    </div>
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* LE CYCLE COMPLET */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Le cycle complet</h2>
            <p className="text-sm text-muted-foreground">
              Du premier devis jusqu&apos;au reporting financier — tout est connecté.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "01", label: "Devis", desc: "CPQ multi-modèle" },
                { step: "02", label: "Contrat", desc: "Signature électronique" },
                { step: "03", label: "Abonnement", desc: "Recurring billing" },
                { step: "04", label: "Facturation", desc: "Factur-X natif" },
                { step: "05", label: "Paiement", desc: "CB + SEPA" },
                { step: "06", label: "Dunning", desc: "Relances auto" },
                { step: "07", label: "E-facture → PA", desc: "Transmission PDP" },
                { step: "08", label: "Analytics", desc: "MRR/ARR/Churn" },
              ].map((s, i) => (
                <ScrollReveal key={s.step} delay={i * 50}>
                  <div className="flex items-start gap-3 rounded-2xl border bg-background/60 p-4 transition-colors hover:bg-muted/50 dark:border-white/[0.06] dark:bg-white/[0.03]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 font-display text-xs font-bold text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                      {s.step}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* COMPARATIF */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Pourquoi Q2C vs les autres</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 pr-4 font-medium text-muted-foreground">Fonctionnalité</th>
                    <th className="pb-3 px-3 font-medium text-emerald-600 dark:text-emerald-400">Q2C</th>
                    <th className="pb-3 px-3 font-medium text-muted-foreground">Chargebee</th>
                    <th className="pb-3 px-3 font-medium text-muted-foreground">Zuora</th>
                    <th className="pb-3 px-3 font-medium text-muted-foreground">Stripe Billing</th>
                    <th className="pb-3 pl-3 font-medium text-muted-foreground">Pennylane</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Factur-X natif", q2c: "✅", chargebee: "❌", zuora: "❌", stripe: "❌", pennylane: "⚠️ Comptable" },
                    { feature: "TVA OSS 30 pays", q2c: "✅", chargebee: "✅", zuora: "✅", stripe: "⚠️ Tax", pennylane: "❌" },
                    { feature: "CPQ intégré", q2c: "✅", chargebee: "❌", zuora: "✅", stripe: "❌", pennylane: "❌" },
                    { feature: "Revenue Recognition", q2c: "✅", chargebee: "⚠️ Add-on", zuora: "✅", stripe: "✅", pennylane: "❌" },
                    { feature: "Connecteur PA", q2c: "✅", chargebee: "❌", zuora: "❌", stripe: "❌", pennylane: "✅" },
                    { feature: "Prix (départ)", q2c: "149€", chargebee: "599$", zuora: "Sur devis", stripe: "0.5%", pennylane: "35€" },
                  ].map((row) => (
                    <tr key={row.feature} className="border-b">
                      <td className="py-3 pr-4 font-medium">{row.feature}</td>
                      <td className="py-3 px-3 font-medium text-emerald-600 dark:text-emerald-400">{row.q2c}</td>
                      <td className="py-3 px-3 text-muted-foreground">{row.chargebee}</td>
                      <td className="py-3 px-3 text-muted-foreground">{row.zuora}</td>
                      <td className="py-3 px-3 text-muted-foreground">{row.stripe}</td>
                      <td className="py-3 pl-3 text-muted-foreground">{row.pennylane}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </ScrollReveal>

        {/* PRICING */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Plans & tarifs</h2>

            <div className="grid gap-6 lg:grid-cols-3">
              {PLANS.map((plan) => (
                <ScrollReveal key={plan.name} delay={0}>
                  <div
                    className={`relative flex flex-col rounded-3xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      plan.highlighted
                        ? "border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-teal-50/60 dark:border-emerald-700 dark:from-emerald-950/40 dark:to-teal-950/20"
                        : "border-border/60 bg-background/60 backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]"
                    }`}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-1 text-xs font-medium text-white shadow-sm">
                        Recommandé
                      </div>
                    )}
                    <h3 className="font-display text-xl font-semibold tracking-tight">{plan.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight font-mono">
                        {plan.price}{plan.price !== "Sur devis" && <>&nbsp;&euro;</>}
                      </span>
                      {plan.price !== "Sur devis" && (
                        <span className="text-sm text-muted-foreground">HT / mois</span>
                      )}
                    </div>
                    <ul className="mt-5 grow space-y-2.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm">
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Link
                        href={plan.price === "Sur devis" ? "/contact?service=q2c-facturation" : "https://app.q2c.webcresson.com"}
                        className={`inline-flex w-full items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition ${
                          plan.highlighted
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700"
                            : "border hover:bg-muted"
                        }`}
                        {...(plan.price !== "Sur devis" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {plan.price === "Sur devis" ? "Nous contacter" : "Commencer"}
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ROI */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Exemple de ROI</h2>

            <div className="grid gap-6 md:grid-cols-3">
              <ScrollReveal delay={0}>
                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Hypothèse</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    SaaS B2B, 500 clients, 500 factures/mois
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Sans Q2C</p>
                  <p className="mt-2 text-sm font-semibold text-red-600 dark:text-red-400">
                    <CountUp end={7500} prefix="" suffix="€/mois" /> de pénalités potentielles
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Avec Q2C</p>
                  <p className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    149€/mois — conformité totale + temps admin divisé par 5
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Questions fréquentes</h2>

            <div className="space-y-4">
              {FAQ.map((f, i) => (
                <ScrollReveal key={f.q} delay={i * 80}>
                  <details className="group rounded-3xl border bg-background p-6 transition hover:bg-muted dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
                    <summary className="cursor-pointer font-medium">{f.q}</summary>
                    <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* FINAL CTA */}
        <ScrollReveal delay={100}>
          <section className="mt-20">
            <div className="relative overflow-hidden rounded-3xl border bg-linear-to-r from-emerald-50 via-teal-50/60 to-green-50/30 p-10 text-center shadow-sm dark:border-emerald-500/20 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-green-950/20 dark:shadow-lg dark:shadow-emerald-500/10">
              {/* Decorative orbs */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/15"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl dark:bg-teal-500/15"
              />

              <div className="relative z-10">
                <h2 className="font-display font-bold text-3xl tracking-tight">Prêt pour la conformité 2026 ?</h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  Découvrez Q2C SaaS et soyez conforme avant l&apos;échéance.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <TrackedLink
                    href="https://app.q2c.webcresson.com"
                    trackAs="decouvrir_q2c_final"
                    className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition hover:scale-[1.02] hover:bg-emerald-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Découvrir Q2C SaaS
                  </TrackedLink>
                  <TrackedLink
                    href="/contact?service=q2c-facturation"
                    trackAs="audit_q2c_final"
                    className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted dark:border-white/[0.12]"
                  >
                    Demander un audit
                  </TrackedLink>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <RelatedServices currentService="q2c-facturation" />

      </div>
    </main>
  );
}
