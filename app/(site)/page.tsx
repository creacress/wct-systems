import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import CountUp from "@/components/ui/count-up";
import GridPattern from "@/components/ui/grid-pattern";

export const metadata: Metadata = {
  title: "WCT Systems — Digital Workplace & IA pour PME",
  description:
    "WCT Systems conçoit le Digital Workplace des PME : bureau virtuel gamifié + Prospection IA, Site Web, Automatisation, Intégration IA. 5 SaaS, un écosystème. Audit gratuit.",
  alternates: { canonical: "/" },
};

const SITE = {
  name: "WCT Systems",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Digital Workplace & IA pour PME",
  sameAs: [] as string[],
};

const FAQ = [
  {
    q: "Combien de temps pour livrer une première version ?",
    a: "En général 7 à 14 jours pour une V1 : un système simple (prospects + suivi + relances) et un pilotage KPI minimal.",
  },
  {
    q: "Est-ce adapté à une petite entreprise ?",
    a: "Oui. On vise l'impact : moins de tâches répétitives et plus d'opportunités, sans complexifier votre organisation.",
  },
  {
    q: "Qu'est-ce que l'audit gratuit ?",
    a: "Un échange court (15–30 min) + une synthèse : 3 priorités, un plan d'exécution, et des KPI à suivre.",
  },
  {
    q: "C'est quoi un Digital Workplace ?",
    a: "Un bureau virtuel qui regroupe tous vos outils métier dans un seul espace. Chaque « pièce » correspond à une fonction (RH, Ventes, Support…). Votre équipe y travaille, communique et collabore sans jongler entre 10 onglets.",
  },
  {
    q: "La gamification, c'est sérieux ?",
    a: "Oui. Des études montrent que la gamification augmente l'engagement de 48% et la productivité de 36%. Les XP, badges et classements créent de la motivation concrète et mesurable.",
  },
] as const;

const SERVICES = [
  {
    href: "/services/digital-workplace",
    title: "Digital Workplace",
    desc: "Bureau virtuel gamifié où chaque pièce est un outil métier. XP, badges, classements.",
    price: "249",
    color: "cyan",
    gradient: "from-cyan-500/10 to-teal-500/5",
    borderHover: "hover:border-cyan-400/40 dark:hover:border-cyan-500/30",
    badge: "Nouveau",
  },
  {
    href: "/services/trouver-prospects",
    title: "Prospection IA",
    desc: "Ciblage IA, enrichissement automatique, scoring, intégration CRM.",
    price: "99",
    color: "emerald",
    gradient: "from-emerald-500/10 to-green-500/5",
    borderHover: "hover:border-emerald-400/40 dark:hover:border-emerald-500/30",
  },
  {
    href: "/services/site-web-moderne",
    title: "Site Web Moderne",
    desc: "Site rapide, SEO + SEO IA, 4 templates. Livré en 14 jours.",
    price: "99",
    color: "sky",
    gradient: "from-sky-500/10 to-indigo-500/5",
    borderHover: "hover:border-sky-400/40 dark:hover:border-sky-500/30",
  },
  {
    href: "/services/automatiser-relances",
    title: "Automatisation (RPA)",
    desc: "Workflows sur mesure : relances, CRM, reporting, dashboard KPI.",
    price: "149",
    color: "amber",
    gradient: "from-amber-500/10 to-orange-500/5",
    borderHover: "hover:border-amber-400/40 dark:hover:border-amber-500/30",
  },
  {
    href: "/services/integration-ia",
    title: "Intégration IA",
    desc: "Chatbot, agents IA, assistants sur mesure connectés à vos données.",
    price: "199",
    color: "fuchsia",
    gradient: "from-fuchsia-500/10 to-purple-500/5",
    borderHover: "hover:border-fuchsia-400/40 dark:hover:border-fuchsia-500/30",
    badge: "Populaire",
  },
] as const;

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
        description: "Digital Workplace & IA pour PME françaises. 5 SaaS, un écosystème.",
        sameAs: SITE.sameAs,
      },
      {
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.url,
        description: "Digital Workplace gamifié + IA + automatisation pour PME. 5 SaaS, un écosystème.",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE.url}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
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
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background: Command Center universe */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/60 via-background to-background dark:from-violet-950/20 dark:via-background" />
      <GridPattern variant="dot" color="rgba(139, 92, 246, 0.06)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {/* ── HERO ── */}
        <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-violet-50/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-violet-700 backdrop-blur dark:border-violet-800/60 dark:bg-violet-950/50 dark:text-violet-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-600" />
                </span>
                5 SaaS &bull; Digital Workplace &bull; IA
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Votre bureau digital.
                <span className="block bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-cyan-400">
                  Tout-en-un, gamifié, piloté par l&apos;IA.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                <strong className="text-foreground">WCT Systems</strong> conçoit le Digital Workplace des PME françaises :
                un bureau virtuel gamifié + 4 SaaS (<strong className="text-foreground">Prospection IA, Site Web, Automatisation, Intégration IA</strong>).
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/services/digital-workplace"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-500/30"
                >
                  Découvrir le Workplace
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted dark:border-white/[0.12]"
                >
                  Voir les 5 services
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Stats + mini process */}
          <ScrollReveal delay={200} direction="right">
            <div className="space-y-4">
              {/* Stat counters row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { end: 5, suffix: " SaaS", label: "Écosystème" },
                  { end: 14, suffix: " jours", label: "Time to live" },
                  { end: 200, suffix: "+", label: "Intégrations" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border bg-background/70 p-4 text-center shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]"
                  >
                    <p className="font-display text-2xl font-bold tracking-tight text-violet-600 dark:text-violet-400">
                      <CountUp end={s.end} suffix={s.suffix} />
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Process steps */}
              <div className="rounded-3xl border bg-background/70 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="font-display text-sm font-semibold">Votre Workplace en 14 jours</p>
                <div className="mt-4 grid gap-3">
                  {[
                    { n: "01", t: "Audit", d: "Cartographie outils & process" },
                    { n: "02", t: "Configuration", d: "Pièces métier + connexions" },
                    { n: "03", t: "Gamification", d: "XP, badges + formation" },
                    { n: "04", t: "Go live", d: "Déploiement + KPI temps réel" },
                  ].map((step) => (
                    <div key={step.n} className="flex items-start gap-3 rounded-2xl border bg-background/60 p-3 transition-colors hover:bg-muted/50 dark:border-white/[0.06] dark:bg-white/[0.03]">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100 font-display text-xs font-bold text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">
                        {step.n}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{step.t}</p>
                        <p className="text-xs text-muted-foreground">{step.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── POURQUOI ── */}
        <section className="mt-24" aria-label="Pourquoi un Digital Workplace">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Pourquoi un Digital Workplace ?</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">Les chiffres parlent d&apos;eux-mêmes.</p>
          </ScrollReveal>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { end: 73, suffix: "%", sub: "des PME", v: "utilisent +5 outils non connectés", d: "Le Workplace les réunit dans un bureau virtuel unifié." },
              { end: 6, suffix: "-9 mois", sub: "de salaire", v: "coût du turnover par départ", d: "La gamification engage les équipes et réduit le turnover." },
              { end: 40, suffix: "%", sub: "du temps", v: "perdu en tâches admin", d: "L'automatisation intégrée libère du temps pour ce qui compte." },
            ].map((x, i) => (
              <ScrollReveal key={x.sub} delay={i * 100}>
                <div className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-violet-500/20">
                  <p className="font-display text-3xl font-bold tracking-tight text-violet-600 dark:text-violet-400">
                    <CountUp end={x.end} suffix={x.suffix} />
                  </p>
                  <p className="text-sm font-medium text-foreground">{x.sub} {x.v}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── ÉCOSYSTÈME 5 SAAS ── */}
        <section className="mt-24" aria-label="Écosystème">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">L&apos;écosystème 5 SaaS</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  Un Digital Workplace + 4 briques IA & automatisation. Chaque service a sa couleur.
                </p>
              </div>
              <Link
                href="/services"
                className="hidden rounded-2xl border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted sm:inline-flex dark:border-white/[0.12]"
              >
                Tout voir
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.href} delay={i * 80}>
                <article
                  className={`group relative rounded-3xl border p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${s.gradient} ${s.borderHover} dark:border-white/[0.08] ${
                    i === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  {"badge" in s && s.badge && (
                    <div className={`absolute -top-3 left-6 rounded-full px-3 py-0.5 text-xs font-medium text-white shadow-sm ${
                      s.badge === "Nouveau" ? "bg-cyan-600" : "bg-fuchsia-600"
                    }`}>
                      {s.badge}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold tracking-tight">{s.title}</h3>
                    <div className="text-right">
                      <span className="font-display text-2xl font-bold tracking-tight">{s.price}&nbsp;&euro;</span>
                      <span className="text-xs text-muted-foreground"> HT/mois</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={s.href}
                      className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted dark:border-white/[0.12]"
                    >
                      En savoir plus
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-700"
                    >
                      Demander un audit
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              href="/services"
              className="inline-flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Voir tous les services
            </Link>
          </div>
        </section>

        {/* ── ROI ── */}
        <section className="mt-24" aria-label="ROI">
          <ScrollReveal>
            <div className="rounded-3xl border bg-gradient-to-br from-violet-50/60 to-indigo-50/40 p-8 dark:border-white/[0.06] dark:from-violet-500/[0.06] dark:to-indigo-500/[0.04]">
              <h2 className="font-display text-2xl font-bold tracking-tight">Exemple de ROI</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Transformer du temps perdu en opportunités mesurables. Exemple indicatif pour une PME.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  { label: "Hypothèse", value: "2h/jour", detail: "de prospection manuelle automatisée" },
                  { label: "Gain", value: "~40h/mois", detail: "récupérées (vendues ou réinvesties)" },
                  { label: "Impact", value: "+volume", detail: "traité = plus de chances de signatures" },
                ].map((x) => (
                  <div key={x.label} className="rounded-2xl border bg-background/70 p-5 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{x.label}</p>
                    <p className="mt-2 font-display text-xl font-bold tracking-tight">{x.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{x.detail}</p>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                *Indication : le ROI dépend de votre offre, zone, saisonnalité et qualité du suivi.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ── PROCESS ── */}
        <section className="mt-24" aria-label="Process">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Process simple, résultats rapides</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Audit → V1 → optimisation. Chaque étape produit quelque chose d&apos;utilisable.
            </p>
          </ScrollReveal>

          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { s: "01", t: "Audit & plan", d: "3 priorités + KPI + plan d'exécution." },
              { s: "02", t: "V1 en production", d: "Un système simple qui tourne (prospects + suivi + relances)." },
              { s: "03", t: "Optimisation", d: "SEO, contenus, relances, dashboards : on scale." },
            ].map((x, i) => (
              <ScrollReveal key={x.s} delay={i * 100}>
                <li className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 font-display text-sm font-bold text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">
                    {x.s}
                  </span>
                  <p className="mt-3 font-display font-semibold">{x.t}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>

          <ScrollReveal delay={300}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-700"
              >
                Démarrer avec un audit
              </Link>
              <Link
                href="/llms.txt"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted dark:border-white/[0.12]"
              >
                Lire llms.txt
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-24" aria-label="FAQ">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">FAQ</h2>
          </ScrollReveal>
          <div className="mt-6 space-y-3">
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

        {/* ── ESPACE CLIENT ── */}
        <section className="mt-24" aria-label="Espace client">
          <ScrollReveal>
            <div className="rounded-3xl border bg-muted/50 p-8 sm:flex sm:items-center sm:justify-between sm:gap-8 dark:border-white/[0.06] dark:bg-white/[0.03]">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">Déjà client ?</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Accédez à votre tableau de bord pour gérer vos prospects, suivre
                  vos relances et piloter vos KPI.
                </p>
              </div>
              <Link
                href="/connexion"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl border bg-background px-6 py-3 text-sm font-medium shadow-sm transition hover:bg-muted sm:mt-0 sm:shrink-0"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Espace client
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="mt-24" aria-label="Appel à l'action">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-violet-50 via-indigo-50/80 to-cyan-50/50 p-10 text-center shadow-sm dark:border-violet-500/20 dark:from-violet-950/40 dark:via-indigo-950/30 dark:to-cyan-950/20 dark:shadow-lg dark:shadow-violet-500/10">
              {/* Decorative orb */}
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-violet-400/10 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

              <h2 className="relative font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Prêt à transformer votre façon de travailler ?
              </h2>
              <p className="relative mt-4 text-muted-foreground">
                Audit rapide → plan clair → Workplace qui tourne en 14 jours. Ensuite on optimise.
              </p>
              <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-[1.02] hover:bg-violet-700 hover:shadow-xl"
                >
                  Réserver l&apos;audit
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition-colors hover:bg-muted dark:border-white/[0.12]"
                >
                  Explorer les services
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </main>
  );
}
