import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";
import Breadcrumbs from "@/components/site/breadcrumbs";
import RelatedServices from "@/components/site/related-services";
import { TrackedLink } from "@/components/site/tracked-link";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    // Note: layout template already adds " | WCT Systems" — avoid double suffix
    title: "Nixie Pulse — Dashboard KPI physique Made in France | Alternative hardware aux dashboards SaaS",
    description:
      "Le premier dashboard KPI physique connecté au monde. Tubes Nixie IN-14 soviétiques affichant vos données Stripe, Bitcoin, GitHub, Analytics en temps réel. Alternative hardware française aux dashboards SaaS. Made in France. À partir de 990 €.",
    keywords: [
      "Nixie Pulse",
      "dashboard KPI physique",
      "dashboard Made in France",
      "alternative dashboard SaaS",
      "tubes Nixie IN-14",
      "objet connecté français",
      "KPI temps réel hardware",
    ],
    alternates: {
      canonical: `${siteUrl}/services/nixie-pulse`,
      languages: {
        fr: `${siteUrl}/services/nixie-pulse`,
        "x-default": `${siteUrl}/services/nixie-pulse`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const FAQ = [
  {
    q: "Qu'est-ce qu'un tube Nixie ?",
    a: "Un tube Nixie est un composant d'affichage cathodique inventé en 1954. Nos tubes IN-14 ont été fabriqués en Union soviétique entre 1970 et 1990. Ce sont des pièces New Old Stock (NOS), jamais utilisées, certifiées par l'artisan ukrainien GRA & AFCH.",
  },
  {
    q: "Quelles données peut-on afficher ?",
    a: "Stripe (CA, revenus), Bitcoin/Ethereum (cours), GitHub (stars, issues), Google Analytics (visiteurs), météo, ou toute API personnalisée. Vous configurez la source depuis une interface web.",
  },
  {
    q: "Comment se connecte le Nixie Pulse ?",
    a: "Via WiFi intégré. Un unique câble USB-C suffit pour l'alimentation. L'installation ne requiert aucune compétence technique.",
  },
  {
    q: "Quand sera-t-il disponible ?",
    a: "La campagne Kickstarter est prévue en octobre 2026. Les inscrits à la liste d'attente bénéficient d'un accès Early Bird avec -20 % de réduction.",
  },
  {
    q: "Existe-t-il plusieurs tailles ?",
    a: "Oui. 4 gammes : Mini (4 tubes, 990 €), Standard (6 tubes, 1 245 €), Pro (8 tubes, 1 900 €) et Double (16 tubes, 2 910 €).",
  },
] as const;

const PRODUCTS = [
  { name: "Mini", tubes: 4, price: "990 €", earlyBird: "792 €" },
  { name: "Standard", tubes: 6, price: "1 245 €", earlyBird: "996 €", popular: true },
  { name: "Pro", tubes: 8, price: "1 900 €", earlyBird: "1 520 €" },
  { name: "Double", tubes: 16, price: "2 910 €", earlyBird: "2 328 €" },
];

const DATA_SOURCES = [
  { name: "Stripe", desc: "Chiffre d'affaires, MRR, clients" },
  { name: "Bitcoin / Ethereum", desc: "Cours en temps réel" },
  { name: "GitHub", desc: "Stars, issues, pull requests" },
  { name: "Google Analytics", desc: "Visiteurs, sessions, conversions" },
  { name: "Météo", desc: "Température, humidité, conditions" },
  { name: "Custom API", desc: "Toute API REST / JSON" },
];

export default function NixiePulsePage() {
  const pageUrl = `${SITE_URL}/services/nixie-pulse`;

  const PRICES_CENTS: Record<string, number> = {
    Mini: 99000,
    Standard: 124500,
    Pro: 190000,
    Double: 291000,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "WCT Systems",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description:
          "Digital Workplace & IA pour PME — 6 solutions, mise en place incluse. Faturação eletrónica com suporte a tubes Nixie.",
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "WCT Systems",
        url: SITE_URL,
        inLanguage: "fr",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          {
            "@type": "ListItem",
            position: 3,
            name: "Nixie Pulse",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Product",
        name: "Nixie Pulse — Dashboard KPI physique connecté",
        description:
          "Le premier dashboard KPI physique connecté au monde. Tubes Nixie IN-14 soviétiques authentiques affichant vos données en temps réel.",
        brand: { "@type": "Brand", name: "Nixie Pulse" },
        manufacturer: { "@type": "Organization", name: "WCT Systems" },
        url: pageUrl,
        inLanguage: "fr",
        category: "Consumer Electronics",
        countryOfOrigin: { "@type": "Country", name: "FR" },
        offers: PRODUCTS.map((p) => ({
          "@type": "Offer",
          name: `Nixie Pulse ${p.name}`,
          price: (PRICES_CENTS[p.name] / 100).toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/PreOrder",
          url: pageUrl,
          seller: { "@type": "Organization", name: "WCT Systems" },
          deliveryLeadTime: {
            "@type": "QuantitativeValue",
            minValue: 6,
            maxValue: 8,
            unitCode: "WK",
          },
        })),
      },
      {
        "@type": "FAQPage",
        inLanguage: "fr",
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
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-orange-50/50 via-background to-background dark:from-orange-950/20" />
      <GridPattern variant="dot" color="rgba(232, 116, 12, 0.06)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        <Breadcrumbs items={[
          { label: "Accueil", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Nixie Pulse" },
        ]} />

        {/* HERO */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1 text-xs uppercase tracking-wide text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300">
                Hardware &bull; IoT &bull; Made in France &bull; Kickstarter 2026
              </div>
              <div className="inline-flex items-center rounded-full border border-orange-300 bg-orange-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm shadow-orange-500/30">
                Nouveau produit
              </div>
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              Vos KPI.
              <span className="block bg-linear-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400">
                Gravés dans le verre.
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              <strong className="text-foreground">Nixie Pulse</strong> est le premier dashboard KPI physique connecté au monde.
              Des tubes Nixie IN-14 authentiques d&apos;époque soviétique affichent vos données Stripe,
              Bitcoin, GitHub ou Analytics en temps réel. Assemblé à la main en France.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <TrackedLink
                href="https://nixiepulse.com"
                trackAs="visit_nixiepulse"
                className="inline-flex items-center justify-center rounded-2xl bg-orange-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-orange-500/25 transition hover:scale-[1.02] hover:bg-orange-700"
              >
                Découvrir sur nixiepulse.com
              </TrackedLink>
              <div className="text-sm text-muted-foreground">
                À partir de 990 &euro; &middot; Early Bird -20% &middot; Kickstarter oct. 2026
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* PRODUCT IMAGE */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24">
            <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-orange-50/40 to-amber-50/20 dark:border-white/[0.08] dark:from-orange-500/[0.04] dark:to-amber-500/[0.02]">
              <Image
                src="https://nixiepulse.com/images/GUS_0943.jpg"
                alt="Nixie Pulse — Dashboard KPI physique connecté avec tubes Nixie IN-14 authentiques"
                width={1600}
                height={900}
                className="w-full h-auto"
                priority
              />
            </div>
          </section>
        </ScrollReveal>

        {/* DATA SOURCES */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Sources de données</h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DATA_SOURCES.map((source, i) => (
                <ScrollReveal key={source.name} delay={i * 60}>
                  <div className="rounded-3xl border bg-gradient-to-br from-orange-50/40 to-amber-50/20 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/[0.08] dark:from-orange-500/[0.04] dark:to-amber-500/[0.02] dark:hover:border-orange-500/20">
                    <p className="font-display text-sm font-medium">{source.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{source.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* 4 GAMMES */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Quatre gammes</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PRODUCTS.map((product, i) => (
                <ScrollReveal key={product.name} delay={i * 60}>
                  <div className={`rounded-3xl border p-6 transition hover:shadow-md ${product.popular ? "border-orange-300/60 bg-gradient-to-br from-orange-50/60 to-amber-50/30 dark:border-orange-700/40 dark:from-orange-500/[0.06] dark:to-amber-500/[0.03]" : "bg-background/60 dark:border-white/[0.08] dark:bg-white/[0.04]"}`}>
                    {product.popular && (
                      <div className="mb-3 inline-flex rounded-full bg-orange-600 px-3 py-0.5 text-xs font-medium text-white">
                        Populaire
                      </div>
                    )}
                    <p className="font-display font-bold text-lg">{product.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{product.tubes} tubes Nixie IN-14</p>
                    <p className="mt-3 text-2xl font-semibold tracking-tight">{product.price}</p>
                    <p className="text-sm text-orange-600 dark:text-orange-400">Early Bird : {product.earlyBird}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* WHAT'S INCLUDED */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Inclus dans chaque Nixie Pulse</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                "Tubes Nixie IN-14 authentiques (NOS, URSS 1970-1990)",
                "PCB NCS314 by GRA & AFCH (artisan ukrainien depuis 2007)",
                "Raspberry Pi Zero 2W (WiFi intégré)",
                "Boîtier MDF noir mat",
                "Câble USB-C + alimentation",
                "Interface web de configuration",
              ].map((item, i) => (
                <ScrollReveal key={item} delay={i * 70}>
                  <div className="group rounded-3xl border bg-gradient-to-br from-orange-50/40 to-amber-50/20 p-6 transition hover:bg-muted dark:border-white/[0.06] dark:from-orange-500/[0.04] dark:to-amber-500/[0.02] dark:hover:bg-orange-500/[0.06]">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-sm font-semibold text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
                      {i + 1}
                    </div>
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* BEFORE AFTER */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Avant / Après</h2>

            <div className="grid gap-8 md:grid-cols-2">
              <ScrollReveal delay={0} direction="left">
                <div className="rounded-3xl border p-8 dark:border-white/[0.08]">
                  <p className="text-sm font-medium">Avant</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Vos KPI sont cachés dans des onglets, des dashboards digitaux qu&apos;on oublie de consulter. Les données restent abstraites.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100} direction="right">
                <div className="rounded-3xl border bg-gradient-to-br from-orange-50/40 to-amber-50/20 p-8 dark:border-white/[0.06] dark:from-orange-500/[0.04] dark:to-amber-500/[0.02]">
                  <p className="text-sm font-medium">Après</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Vos données prennent vie dans la lueur orange de tubes Nixie soviétiques. Un objet physique, tangible, qui rend vos KPI impossibles à ignorer.
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
            <div className="relative overflow-hidden rounded-3xl border bg-linear-to-r from-orange-50 via-amber-50/60 to-yellow-50/30 p-10 text-center shadow-sm dark:border-orange-500/20 dark:from-orange-950/40 dark:via-amber-950/30 dark:to-yellow-950/20 dark:shadow-lg dark:shadow-orange-500/10">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-orange-400/20 blur-3xl dark:bg-orange-500/15"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl dark:bg-amber-500/15"
              />

              <div className="relative z-10">
                <h2 className="font-display font-bold text-3xl tracking-tight">Rejoignez la liste d&apos;attente</h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  Inscrivez-vous sur nixiepulse.com pour un accès Early Bird (-20%) au lancement Kickstarter d&apos;octobre 2026.
                </p>
                <TrackedLink
                  href="https://nixiepulse.com"
                  trackAs="visit_nixiepulse_final"
                  className="mt-8 inline-flex items-center justify-center rounded-2xl bg-orange-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-orange-500/25 transition hover:scale-[1.02] hover:bg-orange-700"
                >
                  Découvrir Nixie Pulse
                </TrackedLink>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <RelatedServices currentService="nixie-pulse" />

      </div>
    </main>
  );
}
