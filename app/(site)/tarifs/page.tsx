import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarifs — Automatisation & IA pour PME | WCT Systems",
  description:
    "Tarifs clairs pour les PME : prospection, relances, CRM, dashboard KPI, site web. À la carte ou en pack. Mise en place incluse. Paiement en 3x possible. Audit gratuit.",
  alternates: { canonical: "/tarifs" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/* ── Données ───────────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    id: "prospects",
    href: "/services/trouver-prospects",
    name: "Trouver des prospects",
    short: "Ciblage automatisé, données propres, intégration CRM.",
    price: "390",
    unit: "/mois",
    mode: "Mensuel — mise en place incluse",
    features: [
      "Ciblage par secteur et zone géographique",
      "Nettoyage et dédoublonnage automatique",
      "Intégration dans votre CRM ou tableur",
      "Mise à jour continue de la base",
    ],
  },
  {
    id: "relances",
    href: "/services/automatiser-relances",
    name: "Automatiser les relances",
    short: "Séquences email, rappels, suivi des réponses.",
    price: "290",
    unit: "/mois",
    mode: "Mensuel — mise en place incluse",
    features: [
      "Séquence de relance courte (2–4 messages)",
      "Rappels automatiques si aucune réponse",
      "Suivi : qui a répondu, qui relancer",
      "Compatible Gmail, Outlook, CRM, Notion",
    ],
  },
  {
    id: "crm",
    href: "/services/gestion-rdv-crm",
    name: "CRM & rendez-vous",
    short: "Pipeline visuel, suivi des étapes, rappels intégrés.",
    price: "190",
    unit: "/mois",
    mode: "Mensuel — mise en place incluse",
    features: [
      "Pipeline visuel (nouveau → signé)",
      "Suivi automatique des étapes",
      "Rappels intégrés et notifications",
      "Compatible Notion, Airtable, HubSpot",
    ],
  },
  {
    id: "kpi",
    href: "/services/dashboard-kpi",
    name: "Dashboard KPI",
    short: "3–6 KPI clés, dashboard mobile, alertes.",
    price: "190",
    unit: "/mois",
    mode: "Mensuel — mise en place incluse",
    features: [
      "Définition de 3–6 KPI clés",
      "Dashboard lisible, mobile-first",
      "Alertes sur seuils et anomalies",
      "Reporting mensuel avec recommandations",
    ],
  },
  {
    id: "site",
    href: "/services/site-generation-leads",
    name: "Site web moderne",
    short: "Site rapide, SEO + SEO IA, conversion, mobile-first.",
    price: "590",
    unit: "",
    mode: "Forfait unique — livré en 7–14 jours",
    features: [
      "5–10 pages optimisées conversion",
      "SEO classique + SEO IA (JSON-LD, llms.txt)",
      "1 page par service (1 intention = 1 URL)",
      "Mobile-first, performances, CTA clairs",
    ],
    extra: "+ 190 €/mois optionnel (maintenance + évolutions SEO)",
  },
] as const;

const PACKS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Lancer l'acquisition",
    price: "590",
    priceAnnuel: "490",
    includes: ["prospects", "relances"],
    economy: "13",
    features: [
      "Prospection automatisée + données propres",
      "Séquences de relance email (2–4 messages)",
      "Pipeline CRM simple inclus",
    ],
    highlighted: false,
  },
  {
    id: "croissance",
    name: "Croissance",
    tagline: "Structurer et piloter",
    price: "890",
    priceAnnuel: "740",
    includes: ["prospects", "relances", "crm", "kpi"],
    economy: "16",
    features: [
      "Tout le pack Starter",
      "CRM complet avec suivi RDV",
      "Dashboard KPI (leads → signatures)",
      "Reporting mensuel + recommandations",
    ],
    highlighted: true,
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Système complet clé en main",
    price: "1 290",
    priceAnnuel: "1 090",
    includes: ["prospects", "relances", "crm", "kpi", "site"],
    economy: "20",
    features: [
      "Tout le pack Croissance",
      "Site génération de leads inclus",
      "Optimisation continue (itérations mensuelles)",
      "Account manager dédié",
    ],
    highlighted: false,
  },
] as const;

const FAQ = [
  {
    q: "Je peux prendre un seul service sans pack ?",
    a: "Oui. Chaque service est disponible individuellement. Les packs permettent d'économiser 13 à 20 % par rapport aux services séparés.",
  },
  {
    q: "Il y a des frais de mise en place ?",
    a: "Non. La mise en place est incluse dans tous les tarifs. On configure tout pour vous : outils, séquences, dashboard, CRM. Vous n'avez rien à installer.",
  },
  {
    q: "Le paiement en 3x, comment ça marche ?",
    a: "Pour tout engagement (annuel ou forfait site), vous pouvez régler en 3 fois sans frais. Premier tiers à la commande, deuxième au 30e jour, troisième au 60e jour.",
  },
  {
    q: "Y a-t-il un engagement de durée ?",
    a: "Engagement minimum de 3 mois pour les forfaits mensuels. Engagement 12 mois pour bénéficier du tarif annuel (2 mois offerts). Le forfait site web est un paiement unique, sans engagement.",
  },
  {
    q: "Les prix sont HT ou TTC ?",
    a: "Tous les prix affichés sont HT (hors taxes). La TVA applicable en France est de 20 %.",
  },
  {
    q: "Je peux changer de formule en cours de route ?",
    a: "Oui. Ajout de services ou passage à un pack à tout moment. La descente prend effet au prochain mois de facturation.",
  },
  {
    q: "Et si mes besoins ne correspondent à rien ici ?",
    a: "On fait un audit gratuit de 15–30 minutes pour comprendre votre situation. Si un sur-mesure est plus adapté, on propose un devis personnalisé.",
  },
] as const;

/* ── Icônes ────────────────────────────────────────────────────────────────── */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className ?? "h-4 w-4"} aria-hidden="true">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className ?? "h-4 w-4"} aria-hidden="true">
      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
    </svg>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────────── */

export default function TarifsPage() {
  const allOffers = [
    ...SERVICES.map((s) => ({
      "@type": "Offer" as const,
      name: s.name,
      description: s.short,
      price: s.price.replace(/\s/g, ""),
      priceCurrency: "EUR",
    })),
    ...PACKS.map((p) => ({
      "@type": "Offer" as const,
      name: `Pack ${p.name}`,
      description: p.tagline,
      price: p.price.replace(/\s/g, ""),
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.price.replace(/\s/g, ""),
        priceCurrency: "EUR",
        unitText: "MONTH",
      },
    })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Tarifs", item: `${SITE_URL}/tarifs` },
        ],
      },
      ...allOffers.map((o) => ({
        ...o,
        seller: { "@type": "Organization", name: "WCT Systems", url: SITE_URL },
      })),
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

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="space-y-8 text-center">
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            Mise en place incluse &bull; Paiement en 3x possible
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Des tarifs clairs.
            <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              Adaptés aux PME.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Prenez un seul service ou combinez-les en pack pour économiser.
            Mise en place incluse dans tous les tarifs — pas de frais cachés.
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <a href="#services" className="inline-flex items-center gap-1.5 rounded-2xl border px-4 py-2 transition hover:bg-muted">
              Services à la carte
            </a>
            <a href="#packs" className="inline-flex items-center gap-1.5 rounded-2xl bg-violet-600 px-4 py-2 font-medium text-white shadow-sm shadow-violet-500/20 transition hover:bg-violet-700">
              Voir les packs
            </a>
            <a href="#engagement" className="inline-flex items-center gap-1.5 rounded-2xl border px-4 py-2 transition hover:bg-muted">
              Engagement annuel
            </a>
          </div>
        </section>

        {/* ── SERVICES À LA CARTE ───────────────────────────────────────── */}
        <section id="services" className="mt-20 scroll-mt-24" aria-label="Tarifs par service">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Services à la carte</h2>
            <p className="text-sm text-muted-foreground">
              Un seul besoin ? Prenez uniquement le service qui vous manque. Mise en place incluse.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <article
                key={s.id}
                className="flex flex-col rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:shadow-md"
              >
                <header className="space-y-2">
                  <h3 className="text-lg font-semibold tracking-tight">{s.name}</h3>
                  <p className="text-sm text-muted-foreground">{s.short}</p>
                </header>

                <div className="mt-5 space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold tracking-tight">{s.price}&nbsp;€</span>
                    {s.unit && <span className="text-sm text-muted-foreground">HT {s.unit}</span>}
                    {!s.unit && <span className="text-sm text-muted-foreground">HT</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">{s.mode}</p>
                  {"extra" in s && (
                    <p className="text-xs text-violet-600 dark:text-violet-400">{s.extra}</p>
                  )}
                </div>

                <ul className="mt-5 grow space-y-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-2">
                  <Link
                    href={`/contact?service=${encodeURIComponent(s.id)}`}
                    className="inline-flex items-center justify-center rounded-2xl border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
                  >
                    Demander ce service
                  </Link>
                  <Link
                    href={s.href}
                    className="inline-flex items-center justify-center gap-1.5 rounded-2xl px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    En savoir plus <ArrowIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── SÉPARATEUR ────────────────────────────────────────────────── */}
        <div className="mt-20 flex items-center gap-4">
          <div className="h-px grow bg-border" />
          <span className="shrink-0 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            Économisez en combinant
          </span>
          <div className="h-px grow bg-border" />
        </div>

        {/* ── PACKS ─────────────────────────────────────────────────────── */}
        <section id="packs" className="mt-12 scroll-mt-24" aria-label="Packs combinés">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Packs combinés</h2>
            <p className="text-sm text-muted-foreground">
              Plusieurs services ensemble, mise en place incluse, tarif réduit.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {PACKS.map((pack) => (
              <article
                key={pack.id}
                className={`relative flex flex-col rounded-3xl border p-6 shadow-sm transition hover:shadow-md ${
                  pack.highlighted
                    ? "border-violet-300 bg-linear-to-br from-violet-50 to-indigo-50/60 dark:border-violet-700 dark:from-violet-950/40 dark:to-indigo-950/20"
                    : "bg-background/60 backdrop-blur"
                }`}
              >
                {pack.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-1 text-xs font-medium text-white shadow-sm">
                    Le plus choisi
                  </div>
                )}

                <header className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-tight">{pack.name}</h3>
                  <p className="text-sm text-muted-foreground">{pack.tagline}</p>
                </header>

                <div className="mt-6 space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight">{pack.price}&nbsp;€</span>
                    <span className="text-sm text-muted-foreground">HT / mois</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Mise en place incluse — engagement 3 mois min.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                      −{pack.economy} % vs à la carte
                    </span>
                    <span className="inline-flex rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
                      ou {pack.priceAnnuel} €/mois à l'année
                    </span>
                  </div>
                </div>

                {/* Services inclus */}
                <div className="mt-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Services inclus</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {pack.includes.map((sid) => {
                      const s = SERVICES.find((sv) => sv.id === sid);
                      return (
                        <span
                          key={sid}
                          className="rounded-full border bg-background px-2.5 py-0.5 text-xs"
                        >
                          {s?.name ?? sid}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <ul className="mt-5 grow space-y-2.5">
                  {pack.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`mt-8 inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition ${
                    pack.highlighted
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.02] hover:bg-violet-700"
                      : "border hover:bg-muted"
                  }`}
                >
                  Choisir {pack.name}
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* ── ENGAGEMENT ANNUEL + PAIEMENT EN 3X ───────────────────────── */}
        <section id="engagement" className="mt-20 scroll-mt-24" aria-label="Options de paiement">
          <h2 className="text-2xl font-semibold tracking-tight">Options de paiement</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Deux options pour adapter le paiement à votre trésorerie.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Engagement annuel */}
            <div className="rounded-3xl border bg-linear-to-br from-violet-50 to-indigo-50/60 p-6 shadow-sm dark:from-violet-950/40 dark:to-indigo-950/20">
              <div className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                2 mois offerts
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Engagement annuel</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Payez 10 mois au lieu de 12 — soit <strong>2 mois offerts</strong> sur tous les packs et services mensuels.
                Facturation mensuelle, engagement 12 mois.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between rounded-2xl border bg-background px-4 py-2.5">
                  <span>Starter</span>
                  <span className="font-medium">490 €/mois <span className="text-xs text-muted-foreground line-through">590 €</span></span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border bg-background px-4 py-2.5">
                  <span>Croissance</span>
                  <span className="font-medium">740 €/mois <span className="text-xs text-muted-foreground line-through">890 €</span></span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border bg-background px-4 py-2.5">
                  <span>Scale</span>
                  <span className="font-medium">1 090 €/mois <span className="text-xs text-muted-foreground line-through">1 290 €</span></span>
                </div>
              </div>
            </div>

            {/* Paiement en 3x */}
            <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur">
              <div className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
                Sans frais
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Paiement en 3 fois</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pour tout engagement annuel ou forfait site web, réglez en 3 fois sans frais.
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-medium text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">1</span>
                  <span><strong>1er tiers</strong> à la commande</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-medium text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">2</span>
                  <span><strong>2e tiers</strong> au 30e jour</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-medium text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">3</span>
                  <span><strong>3e tiers</strong> au 60e jour</span>
                </li>
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Exemple : site web à 590 € → 3 × 197 € sans frais.
              </p>
            </div>
          </div>
        </section>

        {/* ── RÉCAP VISUEL ──────────────────────────────────────────────── */}
        <section className="mt-20" aria-label="Récapitulatif des tarifs">
          <h2 className="text-2xl font-semibold tracking-tight">Tous les tarifs en un coup d'œil</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Prix HT — mise en place incluse dans tous les tarifs.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 pr-4 font-medium text-muted-foreground">Service</th>
                  <th className="pb-3 px-4 text-right font-medium text-muted-foreground">Prix</th>
                  <th className="pb-3 pl-4 text-right font-medium text-muted-foreground" />
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((s) => (
                  <tr key={s.id} className="border-b">
                    <td className="py-3 pr-4">
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.mode}</div>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap font-medium">
                      {s.price} €{s.unit ? ` ${s.unit}` : ""}
                    </td>
                    <td className="py-3 pl-4 text-right">
                      <Link
                        href={`/contact?service=${encodeURIComponent(s.id)}`}
                        className="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                      >
                        Choisir
                      </Link>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td colSpan={3} className="pt-4 pb-2">
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Packs combinés (tarifs réduits)
                    </div>
                  </td>
                </tr>

                {PACKS.map((p) => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Pack {p.name}</span>
                        <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700 dark:bg-green-950/40 dark:text-green-400">
                          −{p.economy} %
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">{p.tagline} — {p.priceAnnuel} €/mois à l'année</div>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap font-medium">{p.price} € /mois</td>
                    <td className="py-3 pl-4 text-right">
                      <Link
                        href="/contact"
                        className="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                      >
                        Choisir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="mt-20" aria-label="Questions fréquentes sur les tarifs">
          <h2 className="text-2xl font-semibold tracking-tight">Questions fréquentes</h2>
          <div className="mt-6 space-y-4">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-3xl border bg-background p-6 transition hover:bg-muted"
              >
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
        <section className="mt-20" aria-label="Appel à l'action">
          <div className="rounded-3xl border bg-linear-to-br from-violet-50 to-indigo-50/80 p-10 text-center shadow-sm dark:from-violet-950/40 dark:to-indigo-950/30">
            <h2 className="text-3xl font-semibold tracking-tight">
              Besoin d'aide pour choisir ?
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-sm text-muted-foreground">
              L'audit est gratuit — 15–30 minutes pour comprendre votre situation,
              identifier le bon service (ou pack), et voir un plan concret avant de vous engager.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Réserver un audit gratuit
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Voir les services en détail
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
