"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Crosshair,
  Globe,
  Zap,
  Brain,
  Building2,
  Receipt,
  Check,
  ArrowRight,
  ChevronDown,
  CreditCard,
  CalendarCheck,
  Gauge,
  Eye,
} from "lucide-react";
import ScrollReveal from "@/components/ui/scroll-reveal";
import CountUp from "@/components/ui/count-up";

/* ── Données ──────────────────────────────────────────────────────────────── */

const SAAS = [
  {
    id: "digital-workplace",
    icon: Building2,
    name: "Digital Workplace",
    badge: "Nouveau",
    description:
      "Bureau virtuel gamifié tout-en-un pour votre équipe.",
    priceMonthly: 199,
    priceYearly: 159,
    yearlyTotal: 1908,
    setup: 490,
    href: "/services/digital-workplace",
    accentHover: "hover:border-cyan-400/40",
    features: [
      "Bureau virtuel avec pièces thématiques (RH, Ventes, Support…)",
      "Gamification intégrée (XP, badges, classements)",
      "Messagerie temps réel + visio intégrée",
      "Dashboard KPI par équipe",
      "Intégration outils existants (Notion, Slack, Google…)",
    ],
  },
  {
    id: "site-web",
    icon: Globe,
    name: "Site Web Moderne",
    description:
      "Un site rapide, SEO + SEO IA, pensé pour convertir. Livré en 14 jours.",
    priceMonthly: 99,
    priceYearly: 79,
    yearlyTotal: 948,
    setup: 590,
    href: "/services/site-web-moderne",
    accentHover: "hover:border-sky-400/40",
    features: [
      "5 à 10 pages optimisées conversion",
      "SEO classique + SEO IA (JSON-LD, llms.txt)",
      "Mobile-first, performances A+",
      "Maintenance & évolutions incluses",
      "Hébergement premium inclus",
    ],
  },
  {
    id: "automatisation",
    icon: Zap,
    name: "Automatisation (RPA)",
    description:
      "Automatisez vos process : relances, CRM, reporting, sans coder.",
    priceMonthly: 149,
    priceYearly: 119,
    yearlyTotal: 1428,
    setup: 490,
    href: "/services/automatiser-relances",
    accentHover: "hover:border-amber-400/40",
    features: [
      "Workflows sur mesure (relances, CRM, facturation)",
      "Intégration 200+ outils (Gmail, Notion, HubSpot\u2026)",
      "Dashboard KPI en temps réel",
      "Alertes et notifications automatiques",
      "Support & maintenance inclus",
    ],
  },
  {
    id: "integration-ia",
    icon: Brain,
    name: "Intégration IA",
    description:
      "Intégrez l\u2019IA dans votre quotidien : chatbot, agents, assistants sur mesure.",
    priceMonthly: 199,
    priceYearly: 159,
    yearlyTotal: 1908,
    setup: 490,
    href: "/services/integration-ia",
    badge: "Populaire",
    accentHover: "hover:border-fuchsia-400/40",
    features: [
      "Chatbot IA pour votre site / WhatsApp",
      "Agents IA métier (vente, support, RH)",
      "Connexion à vos outils existants",
      "Réponses basées sur vos données (RAG)",
      "Formation équipe incluse (1h/mois)",
    ],
  },
  {
    id: "nixie-pulse",
    icon: Gauge,
    name: "Nixie Pulse",
    description:
      "Dashboard KPI physique connecté avec tubes Nixie soviétiques. Vos données affichées en temps réel.",
    priceMonthly: 990,
    priceYearly: 792,
    yearlyTotal: 792,
    setup: 0,
    href: "/services/nixie-pulse",
    badge: "Hardware",
    accentHover: "hover:border-orange-400/40",
    features: [
      "Tubes Nixie IN-14 authentiques (NOS, URSS 1970-1990)",
      "Données temps réel : Stripe, Bitcoin, GitHub, Analytics",
      "WiFi intégré + interface web de configuration",
      "4 gammes : Mini (4 tubes) à Double (16 tubes)",
      "Assemblé à la main en France",
    ],
  },
  {
    id: "aiviz",
    icon: Eye,
    name: "AIViz",
    description:
      "Mesurez votre visibilité dans ChatGPT, Perplexity, Claude, Gemini. Score 0-100, gaps, rapports.",
    priceMonthly: 29,
    priceYearly: 23,
    yearlyTotal: 276,
    setup: 0,
    href: "/services/aiviz",
    badge: "Nouveau",
    accentHover: "hover:border-violet-400/40",
    features: [
      "Scans hebdomadaires (Starter)",
      "1 marque suivie",
      "4 LLMs (ChatGPT, Perplexity, Claude, Gemini)",
      "Rapports PDF mensuels",
      "Alertes email",
    ],
  },
];

const PACKS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Lancer l\u2019acquisition",
    desc: "2 SaaS au choix parmi les 6",
    priceMonthly: 199,
    priceYearly: 159,
    badge: "-10% vs à la carte",
    cta: "Composer mon pack",
    highlighted: false,
    gradient: "from-slate-50/80 to-indigo-50/40 dark:from-slate-900/40 dark:to-indigo-950/20",
  },
  {
    id: "business",
    name: "Business",
    tagline: "Structurer et piloter",
    desc: "3 SaaS au choix parmi les 6",
    priceMonthly: 349,
    priceYearly: 279,
    badge: "-15% vs à la carte",
    cta: "Composer mon pack",
    highlighted: true,
    gradient: "from-violet-50/80 to-indigo-50/60 dark:from-violet-950/40 dark:to-indigo-950/20",
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Système complet",
    desc: "Les 5 solutions incluses",
    priceMonthly: 649,
    priceYearly: 519,
    badge: "-25% vs à la carte",
    extraBadge: "Account manager dédié",
    cta: "Choisir Scale",
    highlighted: false,
    gradient: "from-indigo-50/60 to-violet-50/40 dark:from-indigo-950/30 dark:to-violet-950/20",
  },
];

const FAQ = [
  {
    q: "C\u2019est quoi un SaaS ?",
    a: "Un SaaS (Software as a Service) est un logiciel accessible en ligne, sans installation. Vous payez un abonnement mensuel ou annuel et on s\u2019occupe de tout : hébergement, mises à jour, support. Comme Netflix, mais pour votre entreprise.",
  },
  {
    q: "Je peux prendre un seul service sans pack ?",
    a: "Oui. Chaque SaaS est disponible individuellement. Les packs permettent d\u2019économiser 10 à 25 % par rapport aux services séparés.",
  },
  {
    q: "Je peux tester avant de m\u2019engager ?",
    a: "On propose un audit gratuit de 15 à 30 minutes pour comprendre votre situation, vous montrer une démo, et définir un plan concret. Pas d\u2019engagement avant d\u2019être convaincu.",
  },
  {
    q: "Les prix vont-ils augmenter ?",
    a: "Vos prix sont garantis 12 mois après souscription. Si nos tarifs évoluent, votre tarif reste inchangé pendant toute la durée de votre engagement.",
  },
  {
    q: "Qu\u2019est-ce qui est inclus dans la mise en place ?",
    a: "Configuration complète de vos outils, import de vos données existantes, formation de votre équipe (1h), et un accompagnement pendant les 30 premiers jours.",
  },
  {
    q: "Il y a des frais de mise en place ?",
    a: "Non. La mise en place est incluse dans tous les tarifs (sauf le setup unique pour le Site Web Moderne et le Digital Workplace). On configure tout pour vous.",
  },
  {
    q: "Le paiement en 3x, comment ça marche ?",
    a: "Pour tout engagement annuel ou setup, vous pouvez régler en 3 fois sans frais. Premier tiers à la commande, deuxième au 30e jour, troisième au 60e jour.",
  },
  {
    q: "Y a-t-il un engagement de durée ?",
    a: "Pas d\u2019engagement en mensuel \u2014 vous pouvez arrêter quand vous voulez. L\u2019engagement annuel est de 12 mois, avec -20% sur le tarif mensuel.",
  },
  {
    q: "Je peux changer de formule en cours de route ?",
    a: "Oui. Ajout de services ou passage à un pack à tout moment. La descente prend effet au prochain mois de facturation.",
  },
  {
    q: "Et si mes besoins ne correspondent à rien ici ?",
    a: "On fait un audit gratuit de 15 à 30 minutes pour comprendre votre situation. Si un sur-mesure est plus adapté, on propose un devis personnalisé.",
  },
  {
    q: "Le Digital Workplace remplace mes outils actuels ?",
    a: "Pas forcément. Il les centralise dans un bureau virtuel unifié. Vos outils existants (Notion, Slack, Google…) s\u2019intègrent directement dans les pièces du Workplace.",
  },
];

/* ── Composant principal ──────────────────────────────────────────────────── */

export default function PricingContent() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <ScrollReveal direction="up" delay={0}>
        <section className="space-y-8 text-center">
          {/* Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
              Tarifs transparents · Mise en place incluse
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
            Choisissez votre plan.
            <span className="block bg-linear-to-r from-violet-600 via-indigo-500 to-slate-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-slate-400">
              Évoluez à votre rythme.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            5 solutions conçues pour les PME françaises. Mise en place incluse.
            <br className="hidden sm:block" />
            Sans engagement mensuel, -20% en annuel.
          </p>

          {/* Stats rapides */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-2">
            <div className="text-center">
              <div className="font-display font-bold text-2xl text-violet-600 dark:text-violet-400">
                <CountUp end={5} suffix=" solutions" />
              </div>
              <div className="text-xs text-muted-foreground">à la carte ou en pack</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <div className="font-display font-bold text-2xl text-indigo-600 dark:text-indigo-400">
                <CountUp end={20} prefix="-" suffix="%" />
              </div>
              <div className="text-xs text-muted-foreground">en engagement annuel</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <div className="font-display font-bold text-2xl text-slate-700 dark:text-slate-300">
                <CountUp end={0} suffix=" €" />
              </div>
              <div className="text-xs text-muted-foreground">frais de mise en place</div>
            </div>
          </div>

          {/* Toggle mensuel / annuel */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium transition-colors ${
                !isYearly ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Mensuel
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isYearly}
              aria-label="Basculer entre tarif mensuel et annuel"
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-muted transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 data-checked:bg-violet-600"
              data-checked={isYearly ? "" : undefined}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ${
                  isYearly ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isYearly ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Annuel
              <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-400">
                -20%
              </span>
            </span>
          </div>
        </section>
      </ScrollReveal>

      {/* ── SAAS CARDS ────────────────────────────────────────────────── */}
      <ScrollReveal direction="up" delay={100}>
        <section
          id="saas"
          className="mt-16 scroll-mt-24"
          aria-label="Nos 5 solutions"
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SAAS.map((s) => {
              const Icon = s.icon;
              const price = isYearly ? s.priceYearly : s.priceMonthly;
              return (
                <article
                  key={s.id}
                  className={`group relative flex flex-col rounded-3xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    s.badge
                      ? "border-violet-300 bg-linear-to-br from-violet-50/80 to-indigo-50/60 dark:border-violet-700 dark:from-violet-950/40 dark:to-indigo-950/20"
                      : `border-border/60 bg-background/60 backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04] ${s.accentHover} dark:hover:bg-white/[0.06] dark:hover:shadow-lg dark:hover:shadow-violet-500/5`
                  }`}
                >
                  {s.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-1 text-xs font-medium text-white shadow-sm">
                      {s.badge}
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {s.name}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    {s.description}
                  </p>

                  <div className="mt-5 space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight transition-all duration-300 font-mono">
                        {price}&nbsp;&euro;
                      </span>
                      <span className="text-sm text-muted-foreground">
                        HT / mois
                      </span>
                    </div>
                    {isYearly && (
                      <p className="text-xs text-muted-foreground">
                        Facturé {s.yearlyTotal}&nbsp;&euro;/an
                      </p>
                    )}
                    {"setup" in s && (
                      <p className="text-xs text-violet-600 dark:text-violet-400">
                        Setup unique : {s.setup}&nbsp;&euro; HT
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Mise en place incluse
                    </p>
                  </div>

                  <ul className="mt-5 grow space-y-2.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col gap-2">
                    <Link
                      href={`/contact?service=${encodeURIComponent(s.id)}`}
                      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                        s.badge
                          ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20 hover:bg-violet-700"
                          : "border hover:bg-muted"
                      }`}
                    >
                      Démarrer
                    </Link>
                    <Link
                      href={s.href}
                      className="inline-flex items-center justify-center gap-1.5 rounded-2xl px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      En savoir plus <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* ── SÉPARATEUR ────────────────────────────────────────────────── */}
      <ScrollReveal direction="none" delay={0}>
        <div className="mt-20 flex items-center gap-4">
          <div className="h-px grow bg-border" />
          <span className="shrink-0 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            Économisez avec les packs
          </span>
          <div className="h-px grow bg-border" />
        </div>
      </ScrollReveal>

      {/* ── PACKS ─────────────────────────────────────────────────────── */}
      <ScrollReveal direction="up" delay={80}>
        <section
          id="packs"
          className="mt-12 scroll-mt-24"
          aria-label="Packs combinés"
        >
          <div className="space-y-2 text-center">
            <h2 className="font-display font-bold text-3xl tracking-tight">
              Packs combinés
            </h2>
            <p className="text-muted-foreground">
              Combinez plusieurs SaaS et bénéficiez de tarifs réduits.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {PACKS.map((pack) => {
              const price = isYearly ? pack.priceYearly : pack.priceMonthly;
              return (
                <article
                  key={pack.id}
                  className={`relative flex flex-col rounded-3xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-linear-to-br ${pack.gradient} ${
                    pack.highlighted
                      ? "border-violet-300 dark:border-violet-700"
                      : "border-border/60 dark:border-white/[0.08] hover:border-violet-200 dark:hover:border-violet-500/25"
                  }`}
                >
                  {pack.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-1 text-xs font-medium text-white shadow-sm">
                      Le plus choisi
                    </div>
                  )}

                  <header className="space-y-1">
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {pack.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {pack.tagline}
                    </p>
                  </header>

                  <div className="mt-5 space-y-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight transition-all duration-300 font-mono">
                        {price}&nbsp;&euro;
                      </span>
                      <span className="text-sm text-muted-foreground">
                        HT / mois
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{pack.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                        {pack.badge}
                      </span>
                      {"extraBadge" in pack && (
                        <span className="inline-flex rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-950/40 dark:text-violet-400">
                          {pack.extraBadge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <Link
                      href={`/contact?service=pack-${encodeURIComponent(pack.id)}`}
                      className={`inline-flex w-full items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition ${
                        pack.highlighted
                          ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20 hover:bg-violet-700"
                          : "border hover:bg-muted"
                      }`}
                    >
                      {pack.cta}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* ── TABLEAU COMPARATIF ────────────────────────────────────────── */}
      <ScrollReveal direction="up" delay={60}>
        <section
          className="mt-20 scroll-mt-24"
          aria-label="Récapitulatif des tarifs"
        >
          <h2 className="font-display font-bold text-2xl tracking-tight">
            Tous les tarifs en un coup d&apos;&#339;il
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Prix HT — mise en place incluse dans tous les tarifs.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 pr-4 font-medium text-muted-foreground">
                    Service
                  </th>
                  <th className="pb-3 px-4 text-right font-medium text-muted-foreground">
                    Mensuel
                  </th>
                  <th className="pb-3 px-4 text-right font-medium text-muted-foreground">
                    Annuel
                  </th>
                  <th className="pb-3 pl-4 text-right font-medium text-muted-foreground">
                    Économie
                  </th>
                </tr>
              </thead>
              <tbody>
                {SAAS.map((s) => (
                  <tr key={s.id} className="border-b">
                    <td className="py-3 pr-4">
                      <div className="font-medium">{s.name}</div>
                      {"setup" in s && (
                        <div className="text-xs text-muted-foreground">
                          + setup {s.setup}&nbsp;&euro;
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap font-medium">
                      {s.priceMonthly}&nbsp;&euro;/mois
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap font-medium">
                      {s.priceYearly}&nbsp;&euro;/mois
                    </td>
                    <td className="py-3 pl-4 text-right whitespace-nowrap">
                      <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                        -{Math.round(((s.priceMonthly - s.priceYearly) / s.priceMonthly) * 100)}%
                      </span>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td colSpan={4} className="pt-6 pb-2">
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Packs combinés
                    </div>
                  </td>
                </tr>

                {PACKS.map((p) => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Pack {p.name}</span>
                        {p.highlighted && (
                          <span className="rounded-full bg-violet-50 px-2 py-0.5 text-xs text-violet-700 dark:bg-violet-950/40 dark:text-violet-400">
                            Populaire
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {p.desc}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap font-medium">
                      {p.priceMonthly}&nbsp;&euro;/mois
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap font-medium">
                      {p.priceYearly}&nbsp;&euro;/mois
                    </td>
                    <td className="py-3 pl-4 text-right whitespace-nowrap">
                      <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                        {p.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </ScrollReveal>

      {/* ── OPTIONS DE PAIEMENT ───────────────────────────────────────── */}
      <ScrollReveal direction="up" delay={80}>
        <section
          id="paiement"
          className="mt-20 scroll-mt-24"
          aria-label="Options de paiement"
        >
          <h2 className="font-display font-bold text-2xl tracking-tight">
            Options de paiement
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Deux options pour adapter le paiement à votre trésorerie.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Engagement annuel */}
            <div className="rounded-3xl border bg-linear-to-br from-violet-50 to-indigo-50/60 p-6 shadow-sm dark:from-violet-950/40 dark:to-indigo-950/20">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400">
                  <CalendarCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    Engagement annuel
                  </h3>
                  <span className="inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-400">
                    -20% sur tous les tarifs
                  </span>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>Facturation mensuelle</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>Engagement 12 mois</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>Prix garantis pendant toute la durée</span>
                </li>
              </ul>
            </div>

            {/* Paiement en 3x */}
            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    Paiement en 3 fois
                  </h3>
                  <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
                    Sans frais
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Pour tout engagement annuel ou setup.
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-medium text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                    1
                  </span>
                  <span>
                    <strong>1er tiers</strong> à la commande
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-medium text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                    2
                  </span>
                  <span>
                    <strong>2e tiers</strong> au 30e jour
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-medium text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                    3
                  </span>
                  <span>
                    <strong>3e tiers</strong> au 60e jour
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <ScrollReveal direction="up" delay={60}>
        <section
          className="mt-20"
          aria-label="Questions fréquentes sur les tarifs"
        >
          <h2 className="font-display font-bold text-2xl tracking-tight">
            Questions fréquentes
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-3xl border bg-background p-6 transition open:shadow-md hover:bg-muted dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06] open:border-violet-200/60 dark:open:border-violet-800/40"
              >
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  <span>{f.q}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
      <ScrollReveal direction="up" delay={80}>
        <section className="mt-20" aria-label="Appel à l'action">
          <div className="rounded-3xl border bg-linear-to-br from-violet-50 to-indigo-50/80 p-10 text-center shadow-sm dark:from-violet-950/40 dark:to-indigo-950/30 dark:border-violet-500/20 dark:shadow-lg dark:shadow-violet-500/10">
            <h2 className="font-display font-bold text-3xl tracking-tight">
              Besoin d&apos;aide pour choisir ?
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-sm text-muted-foreground">
              L&apos;audit est gratuit — 15 à 30 minutes pour comprendre votre
              situation, identifier le bon service (ou pack), et voir un plan
              concret avant de vous engager.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Réserver un audit gratuit
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
