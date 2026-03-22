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
} from "lucide-react";
import ScrollReveal from "@/components/ui/scroll-reveal";
import CountUp from "@/components/ui/count-up";
import { useTranslations } from "next-intl";

/* ── Données ──────────────────────────────────────────────────────────────── */

const SAAS_IDS = [
  "digital-workplace",
  "prospection-ia",
  "site-web",
  "automatisation",
  "integration-ia",
  "q2c-facturation",
] as const;

const SAAS_META: Record<
  (typeof SAAS_IDS)[number],
  {
    icon: typeof Building2;
    priceMonthly: number;
    priceYearly: number;
    yearlyTotal: number;
    setup: number;
    href: string;
    accentHover: string;
    hasBadge: boolean;
    featureCount: number;
  }
> = {
  "digital-workplace": {
    icon: Building2,
    priceMonthly: 199,
    priceYearly: 159,
    yearlyTotal: 1908,
    setup: 490,
    href: "/services/digital-workplace",
    accentHover: "hover:border-cyan-400/40",
    hasBadge: true,
    featureCount: 5,
  },
  "prospection-ia": {
    icon: Crosshair,
    priceMonthly: 99,
    priceYearly: 79,
    yearlyTotal: 948,
    setup: 490,
    href: "/services/trouver-prospects",
    accentHover: "hover:border-emerald-400/40",
    hasBadge: false,
    featureCount: 5,
  },
  "site-web": {
    icon: Globe,
    priceMonthly: 99,
    priceYearly: 79,
    yearlyTotal: 948,
    setup: 590,
    href: "/services/site-web-moderne",
    accentHover: "hover:border-sky-400/40",
    hasBadge: false,
    featureCount: 5,
  },
  "automatisation": {
    icon: Zap,
    priceMonthly: 149,
    priceYearly: 119,
    yearlyTotal: 1428,
    setup: 490,
    href: "/services/automatiser-relances",
    accentHover: "hover:border-amber-400/40",
    hasBadge: false,
    featureCount: 5,
  },
  "integration-ia": {
    icon: Brain,
    priceMonthly: 199,
    priceYearly: 159,
    yearlyTotal: 1908,
    setup: 490,
    href: "/services/integration-ia",
    accentHover: "hover:border-fuchsia-400/40",
    hasBadge: true,
    featureCount: 5,
  },
  "q2c-facturation": {
    icon: Receipt,
    priceMonthly: 149,
    priceYearly: 119,
    yearlyTotal: 1428,
    setup: 490,
    href: "/services/q2c-facturation",
    accentHover: "hover:border-emerald-400/40",
    hasBadge: true,
    featureCount: 5,
  },
};

const PACK_IDS = ["starter", "business", "scale"] as const;

const PACK_META: Record<
  (typeof PACK_IDS)[number],
  {
    priceMonthly: number;
    priceYearly: number;
    highlighted: boolean;
    gradient: string;
    hasExtraBadge: boolean;
  }
> = {
  starter: {
    priceMonthly: 199,
    priceYearly: 159,
    highlighted: false,
    gradient: "from-slate-50/80 to-indigo-50/40 dark:from-slate-900/40 dark:to-indigo-950/20",
    hasExtraBadge: false,
  },
  business: {
    priceMonthly: 349,
    priceYearly: 279,
    highlighted: true,
    gradient: "from-violet-50/80 to-indigo-50/60 dark:from-violet-950/40 dark:to-indigo-950/20",
    hasExtraBadge: false,
  },
  scale: {
    priceMonthly: 649,
    priceYearly: 519,
    highlighted: false,
    gradient: "from-indigo-50/60 to-violet-50/40 dark:from-indigo-950/30 dark:to-violet-950/20",
    hasExtraBadge: true,
  },
};

/* ── Composant principal ──────────────────────────────────────────────────── */

export default function PricingContent() {
  const [isYearly, setIsYearly] = useState(false);
  const t = useTranslations("tarifs");

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <ScrollReveal direction="up" delay={0}>
        <section className="space-y-8 text-center">
          {/* Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
            {t("hero.title")}
            <span className="block bg-linear-to-r from-violet-600 via-indigo-500 to-slate-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-slate-400">
              {t("hero.titleHighlight")}
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("hero.subtitle")}
            <br className="hidden sm:block" />
            {t("hero.subtitleLine2")}
          </p>

          {/* Stats rapides */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-2">
            <div className="text-center">
              <div className="font-display font-bold text-2xl text-violet-600 dark:text-violet-400">
                <CountUp end={6} suffix={` ${t("hero.statSaas")}`} />
              </div>
              <div className="text-xs text-muted-foreground">{t("hero.statSaasLabel")}</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <div className="font-display font-bold text-2xl text-indigo-600 dark:text-indigo-400">
                <CountUp end={20} prefix="-" suffix="%" />
              </div>
              <div className="text-xs text-muted-foreground">{t("hero.statDiscount")}</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <div className="font-display font-bold text-2xl text-slate-700 dark:text-slate-300">
                <CountUp end={0} suffix=" €" />
              </div>
              <div className="text-xs text-muted-foreground">{t("hero.statSetup")}</div>
            </div>
          </div>

          {/* Toggle mensuel / annuel */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium transition-colors ${
                !isYearly ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {t("hero.toggleMonthly")}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isYearly}
              aria-label={t("hero.toggleMonthly") + " / " + t("hero.toggleYearly")}
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
              {t("hero.toggleYearly")}
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
          aria-label={t("saas.sectionLabel")}
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SAAS_IDS.map((id) => {
              const meta = SAAS_META[id];
              const Icon = meta.icon;
              const price = isYearly ? meta.priceYearly : meta.priceMonthly;
              const name = t(`saas.items.${id}.name`);
              const badge = meta.hasBadge ? t(`saas.items.${id}.badge`) : null;
              return (
                <article
                  key={id}
                  className={`group relative flex flex-col rounded-3xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    badge
                      ? "border-violet-300 bg-linear-to-br from-violet-50/80 to-indigo-50/60 dark:border-violet-700 dark:from-violet-950/40 dark:to-indigo-950/20"
                      : `border-border/60 bg-background/60 backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04] ${meta.accentHover} dark:hover:bg-white/[0.06] dark:hover:shadow-lg dark:hover:shadow-violet-500/5`
                  }`}
                >
                  {badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-1 text-xs font-medium text-white shadow-sm">
                      {badge}
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {name}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    {t(`saas.items.${id}.description`)}
                  </p>

                  <div className="mt-5 space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight transition-all duration-300 font-mono">
                        {price}&nbsp;&euro;
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t("saas.priceUnit")}
                      </span>
                    </div>
                    {isYearly && (
                      <p className="text-xs text-muted-foreground">
                        {t("saas.billedYearly", { total: meta.yearlyTotal })}
                      </p>
                    )}
                    <p className="text-xs text-violet-600 dark:text-violet-400">
                      {t("saas.setupUnique", { price: meta.setup })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("saas.setupIncluded")}
                    </p>
                  </div>

                  <ul className="mt-5 grow space-y-2.5">
                    {Array.from({ length: meta.featureCount }, (_, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                        <span>{t(`saas.items.${id}.features.${fi}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col gap-2">
                    <Link
                      href={`/contact?service=${encodeURIComponent(id)}`}
                      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                        badge
                          ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20 hover:bg-violet-700"
                          : "border hover:bg-muted"
                      }`}
                    >
                      {t("saas.ctaStart")}
                    </Link>
                    <Link
                      href={meta.href}
                      className="inline-flex items-center justify-center gap-1.5 rounded-2xl px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      {t("saas.ctaLearnMore")} <ArrowRight className="h-3.5 w-3.5" />
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
            {t("separator")}
          </span>
          <div className="h-px grow bg-border" />
        </div>
      </ScrollReveal>

      {/* ── PACKS ─────────────────────────────────────────────────────── */}
      <ScrollReveal direction="up" delay={80}>
        <section
          id="packs"
          className="mt-12 scroll-mt-24"
          aria-label={t("packs.sectionLabel")}
        >
          <div className="space-y-2 text-center">
            <h2 className="font-display font-bold text-3xl tracking-tight">
              {t("packs.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("packs.subtitle")}
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {PACK_IDS.map((id) => {
              const meta = PACK_META[id];
              const price = isYearly ? meta.priceYearly : meta.priceMonthly;
              return (
                <article
                  key={id}
                  className={`relative flex flex-col rounded-3xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-linear-to-br ${meta.gradient} ${
                    meta.highlighted
                      ? "border-violet-300 dark:border-violet-700"
                      : "border-border/60 dark:border-white/[0.08] hover:border-violet-200 dark:hover:border-violet-500/25"
                  }`}
                >
                  {meta.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-1 text-xs font-medium text-white shadow-sm">
                      {t("packs.mostChosen")}
                    </div>
                  )}

                  <header className="space-y-1">
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {t(`packs.items.${id}.name`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`packs.items.${id}.tagline`)}
                    </p>
                  </header>

                  <div className="mt-5 space-y-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight transition-all duration-300 font-mono">
                        {price}&nbsp;&euro;
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t("saas.priceUnit")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{t(`packs.items.${id}.desc`)}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                        {t(`packs.items.${id}.badge`)}
                      </span>
                      {meta.hasExtraBadge && (
                        <span className="inline-flex rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-950/40 dark:text-violet-400">
                          {t(`packs.items.${id}.extraBadge`)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <Link
                      href={`/contact?service=pack-${encodeURIComponent(id)}`}
                      className={`inline-flex w-full items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition ${
                        meta.highlighted
                          ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20 hover:bg-violet-700"
                          : "border hover:bg-muted"
                      }`}
                    >
                      {t(`packs.items.${id}.cta`)}
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
          aria-label={t("comparison.title")}
        >
          <h2 className="font-display font-bold text-2xl tracking-tight">
            {t("comparison.title")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("comparison.subtitle")}
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 pr-4 font-medium text-muted-foreground">
                    {t("comparison.thService")}
                  </th>
                  <th className="pb-3 px-4 text-right font-medium text-muted-foreground">
                    {t("comparison.thMonthly")}
                  </th>
                  <th className="pb-3 px-4 text-right font-medium text-muted-foreground">
                    {t("comparison.thYearly")}
                  </th>
                  <th className="pb-3 pl-4 text-right font-medium text-muted-foreground">
                    {t("comparison.thSaving")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {SAAS_IDS.map((id) => {
                  const meta = SAAS_META[id];
                  return (
                    <tr key={id} className="border-b">
                      <td className="py-3 pr-4">
                        <div className="font-medium">{t(`saas.items.${id}.name`)}</div>
                        <div className="text-xs text-muted-foreground">
                          {t("comparison.setup", { price: meta.setup })}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap font-medium">
                        {meta.priceMonthly}&nbsp;&euro;{t("comparison.perMonth")}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap font-medium">
                        {meta.priceYearly}&nbsp;&euro;{t("comparison.perMonth")}
                      </td>
                      <td className="py-3 pl-4 text-right whitespace-nowrap">
                        <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                          -{Math.round(((meta.priceMonthly - meta.priceYearly) / meta.priceMonthly) * 100)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}

                <tr>
                  <td colSpan={4} className="pt-6 pb-2">
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {t("comparison.packsLabel")}
                    </div>
                  </td>
                </tr>

                {PACK_IDS.map((id) => {
                  const meta = PACK_META[id];
                  return (
                    <tr key={id} className="border-b last:border-0">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{t("comparison.pack", { name: t(`packs.items.${id}.name`) })}</span>
                          {meta.highlighted && (
                            <span className="rounded-full bg-violet-50 px-2 py-0.5 text-xs text-violet-700 dark:bg-violet-950/40 dark:text-violet-400">
                              {t("comparison.popular")}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t(`packs.items.${id}.desc`)}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap font-medium">
                        {meta.priceMonthly}&nbsp;&euro;{t("comparison.perMonth")}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap font-medium">
                        {meta.priceYearly}&nbsp;&euro;{t("comparison.perMonth")}
                      </td>
                      <td className="py-3 pl-4 text-right whitespace-nowrap">
                        <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                          {t(`packs.items.${id}.badge`)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
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
          aria-label={t("payment.sectionLabel")}
        >
          <h2 className="font-display font-bold text-2xl tracking-tight">
            {t("payment.title")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("payment.subtitle")}
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
                    {t("payment.yearly.title")}
                  </h3>
                  <span className="inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-400">
                    {t("payment.yearly.badge")}
                  </span>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>{t(`payment.yearly.features.${i}`)}</span>
                  </li>
                ))}
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
                    {t("payment.threeX.title")}
                  </h3>
                  <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
                    {t("payment.threeX.badge")}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {t("payment.threeX.intro")}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-medium text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                      {i + 1}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: t.raw(`payment.threeX.steps.${i}`) as string }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <ScrollReveal direction="up" delay={60}>
        <section
          className="mt-20"
          aria-label={t("faq.sectionLabel")}
        >
          <h2 className="font-display font-bold text-2xl tracking-tight">
            {t("faq.title")}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {Array.from({ length: 11 }, (_, i) => (
              <details
                key={i}
                className="group rounded-3xl border bg-background p-6 transition open:shadow-md hover:bg-muted dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06] open:border-violet-200/60 dark:open:border-violet-800/40"
              >
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  <span>{t(`faq.items.${i}.q`)}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{t(`faq.items.${i}.a`)}</p>
              </details>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
      <ScrollReveal direction="up" delay={80}>
        <section className="mt-20" aria-label={t("cta.sectionLabel")}>
          <div className="rounded-3xl border bg-linear-to-br from-violet-50 to-indigo-50/80 p-10 text-center shadow-sm dark:from-violet-950/40 dark:to-indigo-950/30 dark:border-violet-500/20 dark:shadow-lg dark:shadow-violet-500/10">
            <h2 className="font-display font-bold text-3xl tracking-tight">
              {t("cta.title")}
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-sm text-muted-foreground">
              {t("cta.subtitle")}
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                {t("cta.button")}
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
