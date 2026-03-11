import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import CountUp from "@/components/ui/count-up";
import GridPattern from "@/components/ui/grid-pattern";

export const metadata: Metadata = {
  title: "Site Web Moderne — Rapide, SEO + SEO IA, qui convertit | WCT Systems",
  description:
    "Un site web moderne, rapide et pensé pour convertir : SEO classique + SEO IA, mobile-first, performances A+. 12 templates métier prêts à l'emploi + option sur mesure. Livré en 14 jours.",
  alternates: { canonical: "/services/site-web-moderne" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const DEMO_BASE = "https://templates-website-wct.vercel.app";

const TEMPLATES = [
  {
    id: "restaurant",
    name: "Restaurant",
    description: "Menu, réservation en ligne, galerie photos. Idéal pour restaurants, brasseries et traiteurs.",
    icon: "🍽️",
    sector: "Restauration",
    previewUrl: `${DEMO_BASE}/demo-restaurant/`,
  },
  {
    id: "immobilier",
    name: "Immobilier",
    description: "Listings, fiches biens, formulaire d'estimation. Parfait pour agences et agents immobiliers.",
    icon: "🏠",
    sector: "Immobilier",
    previewUrl: `${DEMO_BASE}/demo-immobilier/`,
  },
  {
    id: "avocats",
    name: "Cabinet d'Avocats",
    description: "Présentation du cabinet, domaines d'expertise, prise de RDV. Conçu pour avocats et juristes.",
    icon: "⚖️",
    sector: "Juridique",
    previewUrl: `${DEMO_BASE}/demo-avocats/`,
  },
  {
    id: "plombier",
    name: "Plombier",
    description: "Zone d'intervention, services, devis rapide. Adapté aux artisans et entreprises du bâtiment.",
    icon: "🔧",
    sector: "Artisanat",
    previewUrl: `${DEMO_BASE}/demo-plombier/`,
  },
  {
    id: "photographe",
    name: "Photographe",
    description: "Portfolio, galeries par projet, formulaire de contact. Pour photographes et créatifs visuels.",
    icon: "📷",
    sector: "Créatif",
    previewUrl: `${DEMO_BASE}/demo-photographe/`,
  },
  {
    id: "fleuriste",
    name: "Fleuriste",
    description: "Catalogue de bouquets, commande en ligne, livraison. Idéal pour fleuristes et pépiniéristes.",
    icon: "💐",
    sector: "Commerce",
    previewUrl: `${DEMO_BASE}/demo-fleuriste/`,
  },
  {
    id: "cabinet-rh",
    name: "Cabinet RH",
    description: "Offres d'emploi, services RH, témoignages. Conçu pour cabinets de recrutement et conseil RH.",
    icon: "👥",
    sector: "RH / Conseil",
    previewUrl: `${DEMO_BASE}/demo-cabinet-RH/`,
  },
  {
    id: "animalerie",
    name: "Animalerie",
    description: "Catalogue produits, services (toilettage, pension), conseils. Pour animaleries et vétérinaires.",
    icon: "🐾",
    sector: "Animaux",
    previewUrl: `${DEMO_BASE}/demo-animalerie/`,
  },
  {
    id: "e-commerce",
    name: "E-commerce",
    description: "Catalogue produits, fiches détaillées, tunnel de conversion. Pour boutiques en ligne de toute taille.",
    icon: "🛒",
    sector: "E-commerce",
    previewUrl: `${DEMO_BASE}/demo-E-commerce/`,
  },
  {
    id: "saas",
    name: "SaaS Landing",
    description: "Landing page conversion : features, pricing, CTA. Optimisé pour produits SaaS et apps.",
    icon: "🚀",
    sector: "Tech / SaaS",
    previewUrl: `${DEMO_BASE}/demo-saas/`,
  },
  {
    id: "tech",
    name: "Tech & Startup",
    description: "Site corporate moderne : équipe, produit, blog, intégrations. Pour startups et ESN.",
    icon: "💻",
    sector: "Tech",
    previewUrl: `${DEMO_BASE}/demo-tech/`,
  },
  {
    id: "sur-mesure",
    name: "Site Personnalisé",
    description: "Votre activité ne rentre pas dans un template ? On conçoit un site 100 % sur mesure, adapté à vos besoins spécifiques.",
    icon: "✨",
    sector: "Sur mesure",
    previewUrl: "",
  },
];

const FAQ = [
  {
    q: "J'ai déjà un site, est-ce que ça vaut le coup ?",
    a: "Souvent oui. Beaucoup de sites ne convertissent pas faute de message clair, preuve et CTA. On peut optimiser l'existant ou repartir sur une base plus rapide.",
  },
  {
    q: "C'est quoi \"SEO IA\" concrètement ?",
    a: "C'est rendre votre site très compréhensible par les assistants IA : structure claire, pages canoniques, schémas JSON-LD, et fichiers llms.txt/ai.txt. Cela améliore aussi la lisibilité pour les moteurs.",
  },
  {
    q: "Combien de temps pour une V1 ?",
    a: "En général 7 à 14 jours pour une V1 : pages clés, structure SEO, tracking minimal, et un tunnel de conversion simple.",
  },
  {
    q: "Je peux personnaliser un template ?",
    a: "Oui. Chaque template est un point de départ. On adapte les couleurs, contenus, sections et fonctionnalités à votre activité.",
  },
  {
    q: "Mon secteur n'est pas dans la liste, c'est possible quand même ?",
    a: "Absolument. Les templates couvrent les cas les plus courants, mais on crée aussi des sites sur mesure. Le process reste le même.",
  },
  {
    q: "Le site est-il maintenu ensuite ?",
    a: "Oui. L'abonnement inclut la maintenance, les évolutions et l'hébergement premium. Vous n'avez rien à gérer côté technique.",
  },
] as const;

export default function SiteWebModernePage() {
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
            name: "Site Web Moderne",
            item: `${SITE_URL}/services/site-web-moderne`,
          },
        ],
      },
      {
        "@type": "Service",
        name: "Site Web Moderne",
        description:
          "Création d'un site web moderne, rapide et pensé pour convertir : SEO classique + SEO IA, mobile-first, performances A+. 12 templates métier personnalisables, livré en 14 jours.",
        provider: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: "France" },
        url: `${SITE_URL}/services/site-web-moderne`,
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

      {/* Sky/indigo background gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-sky-50/50 via-background to-background dark:from-sky-950/20" />

      {/* Subtle dot grid pattern */}
      <GridPattern variant="dot" color="rgba(14, 165, 233, 0.06)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        {/* HERO */}
        <ScrollReveal>
          <section className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs uppercase tracking-wide text-sky-700 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-300">
              12 templates &middot; SEO + SEO IA &middot; Livré en 14 jours
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              Un site web moderne
              <span className="block bg-linear-to-r from-sky-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent dark:from-sky-400 dark:via-blue-400 dark:to-indigo-400">
                adapté à votre métier
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              Choisissez parmi <strong>12 templates métier</strong>, on l&apos;adapte à votre
              activité et on livre un site ultra rapide, optimisé SEO + SEO IA, en 14 jours.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact?service=site-web"
                className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-sky-500/25 transition hover:scale-[1.02] hover:bg-sky-700"
              >
                Demander un audit gratuit
              </Link>
              <a
                href="#templates"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted dark:border-white/[0.1]"
              >
                Voir les templates
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="rounded-full border bg-muted/50 px-3 py-1 dark:border-white/[0.08] dark:bg-white/[0.04]">
                99 &euro; HT/mois
              </span>
              <span className="rounded-full border bg-muted/50 px-3 py-1 dark:border-white/[0.08] dark:bg-white/[0.04]">
                Setup 590 &euro; HT
              </span>
              <span className="rounded-full border bg-muted/50 px-3 py-1 dark:border-white/[0.08] dark:bg-white/[0.04]">
                Livré en 14 jours
              </span>
            </div>
          </section>
        </ScrollReveal>

        {/* WHAT'S INCLUDED */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Ce qui est inclus</h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "5 à 10 pages optimisées", desc: "Pages services, accueil, contact, à propos — chacune pensée conversion." },
                { title: "SEO classique + SEO IA", desc: "Titres, métas, JSON-LD, llms.txt, ai.txt — visible par Google et les IA." },
                { title: "Mobile-first, perf A+", desc: "PageSpeed 90+, temps de chargement < 2s, responsive parfait." },
                { title: "Maintenance incluse", desc: "Mises à jour, corrections, évolutions mineures — tout est dans l'abonnement." },
                { title: "Hébergement premium", desc: "Vercel Edge Network : CDN mondial, HTTPS, déploiement automatique." },
                { title: "Formation (1h)", desc: "On vous montre comment mettre à jour vos contenus et suivre vos stats." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-sky-500/20 dark:hover:bg-white/[0.06]"
                >
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* TEMPLATES */}
        <ScrollReveal delay={150}>
          <section className="mt-16 sm:mt-24 space-y-8" id="templates">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-2xl tracking-tight">12 templates métier</h2>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Chaque template est personnalisable à 100 %. Choisissez la base qui correspond à votre activité, on s&apos;occupe du reste.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TEMPLATES.map((t) => {
                const isSurMesure = t.id === "sur-mesure";
                const hasPreview = t.previewUrl && t.previewUrl !== "#";
                return (
                  <article
                    key={t.id}
                    className={`group relative flex flex-col overflow-hidden rounded-3xl shadow-sm backdrop-blur transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      isSurMesure
                        ? "border-2 border-dashed border-sky-300 bg-linear-to-br from-sky-50/80 to-indigo-50/60 dark:border-sky-500/30 dark:from-sky-950/30 dark:to-indigo-950/20 dark:hover:border-sky-400/50 dark:hover:shadow-sky-500/10"
                        : "border bg-background/60 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-sky-500/20 dark:hover:bg-white/[0.06] dark:hover:shadow-sky-500/10"
                    }`}
                  >
                    {/* Live preview iframe */}
                    {hasPreview ? (
                      <a
                        href={t.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block w-full overflow-hidden border-b dark:border-white/[0.06]"
                        aria-label={`Voir la démo ${t.name}`}
                      >
                        {/* Mini browser bar */}
                        <div className="flex items-center gap-1.5 bg-sky-50/80 px-3 py-2 dark:bg-sky-950/20">
                          <span className="h-2 w-2 rounded-full bg-red-400/60" />
                          <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
                          <span className="h-2 w-2 rounded-full bg-green-400/60" />
                          <span className="ml-2 flex-1 truncate rounded-md bg-background/80 px-2 py-0.5 text-[10px] text-muted-foreground dark:bg-white/[0.06]">
                            {t.previewUrl.replace("https://", "")}
                          </span>
                        </div>
                        {/* Iframe container */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <iframe
                            src={t.previewUrl}
                            title={`Aperçu du template ${t.name}`}
                            loading="lazy"
                            className="pointer-events-none h-[200%] w-[200%] origin-top-left scale-50"
                            sandbox="allow-scripts allow-same-origin"
                            tabIndex={-1}
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                            <span className="rounded-2xl bg-white/90 px-4 py-2 text-xs font-medium text-sky-700 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 dark:bg-sky-950/90 dark:text-sky-300">
                              Voir la démo
                            </span>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div className="flex aspect-[16/10] w-full items-center justify-center border-b bg-linear-to-br from-sky-100/60 to-indigo-100/40 dark:border-white/[0.06] dark:from-sky-950/40 dark:to-indigo-950/20">
                        <div className="text-center">
                          <span className="text-3xl">{t.icon}</span>
                          <p className="mt-2 text-xs font-medium text-sky-700 dark:text-sky-300">
                            Sur mesure
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex grow flex-col p-6">
                      {/* Sector + icon */}
                      <div className="flex items-center justify-between">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-lg dark:bg-sky-950/50">
                          {t.icon}
                        </span>
                        <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-300">
                          {t.sector}
                        </span>
                      </div>

                      <h3 className="mt-3 text-base font-semibold tracking-tight">{t.name}</h3>
                      <p className="mt-2 grow text-sm text-muted-foreground">{t.description}</p>

                      <div className="mt-5 flex gap-3">
                        <Link
                          href={`/contact?service=site-web&template=${t.id}`}
                          className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-sky-500/25 transition hover:bg-sky-700"
                        >
                          {isSurMesure ? "Discuter du projet" : "Choisir"}
                        </Link>
                        {hasPreview && (
                          <a
                            href={t.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium transition hover:bg-muted dark:border-white/[0.1]"
                          >
                            Démo live
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="rounded-3xl border bg-muted/40 p-6 text-center dark:border-white/[0.06] dark:bg-sky-500/[0.03]">
              <p className="text-sm text-muted-foreground">
                Votre secteur n&apos;est pas dans la liste ?{" "}
                <Link href="/contact?service=site-web" className="font-medium text-sky-600 underline hover:opacity-80 dark:text-sky-400">
                  Contactez-nous
                </Link>
                , on crée aussi des sites sur mesure.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* SEO + SEO IA */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">SEO + Visibilité IA</h2>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  k: "SEO classique",
                  d: "Titres, descriptions, pages canoniques, sitemap/robots, vitesse, maillage interne.",
                },
                {
                  k: "SEO IA",
                  d: "Structure claire + schémas JSON-LD + llms.txt/ai.txt pour guider les assistants IA.",
                },
                {
                  k: "Contenus ciblés",
                  d: "Pages services et articles qui répondent aux questions des clients.",
                },
                {
                  k: "Conversion",
                  d: "CTA visibles, preuve sociale, sections simples, mobile-first.",
                },
              ].map((x) => (
                <div key={x.k} className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-sky-500/20">
                  <p className="text-sm font-medium">{x.k}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* PROCESS */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Le process en 4 étapes</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "1", title: "Audit & brief", desc: "On analyse votre existant et on définit la structure." },
                { step: "2", title: "Template & contenu", desc: "Choix du template, rédaction, visuels." },
                { step: "3", title: "Développement", desc: "Intégration, SEO, tests, optimisation perf." },
                { step: "4", title: "Mise en ligne", desc: "Déploiement, formation, suivi 30 jours." },
              ].map((x) => (
                <div
                  key={x.step}
                  className="rounded-3xl border bg-muted/40 p-6 transition hover:bg-muted dark:border-white/[0.06] dark:bg-sky-500/[0.03] dark:hover:bg-sky-500/[0.06]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 text-sm font-semibold text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
                    {x.step}
                  </div>
                  <p className="mt-3 text-sm font-medium">{x.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{x.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ROI */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Exemple de ROI</h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Hypothèse</p>
                <p className="mt-2 text-sm text-muted-foreground">1 000 visites/mois</p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Conversion</p>
                <p className="mt-2 text-sm text-muted-foreground">1% → 2% (demandes)</p>
              </div>
              <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Impact</p>
                <p className="mt-2 text-sm text-muted-foreground">10 → 20 demandes/mois</p>
              </div>
            </div>

            <div className="rounded-3xl border bg-muted p-6 dark:border-white/[0.06] dark:bg-sky-500/[0.04]">
              <p className="text-sm font-medium">Traduction business</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Si vous signez <strong>20%</strong> des demandes et que votre panier moyen est
                de <strong>1 500&euro;</strong>, doubler les demandes peut avoir un impact direct
                sur votre chiffre d&apos;affaires.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                *Exemple indicatif : dépend de votre offre, saisonnalité et qualité du suivi.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal delay={100}>
          <section className="mt-16 sm:mt-24 space-y-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Questions fréquentes</h2>

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
        </ScrollReveal>

        {/* FINAL CTA */}
        <ScrollReveal delay={100}>
          <section className="mt-20">
            <div className="relative overflow-hidden rounded-3xl border bg-linear-to-r from-sky-50 via-blue-50/60 to-indigo-50/30 p-10 text-center shadow-sm dark:border-sky-500/20 dark:from-sky-950/40 dark:via-blue-950/30 dark:to-indigo-950/20 dark:shadow-lg dark:shadow-sky-500/10">
              {/* Decorative orbs */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 -left-12 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-500/10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/10"
              />

              <div className="relative">
                <h2 className="font-display font-bold text-3xl tracking-tight">Prêt pour un site qui convertit ?</h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  Choisissez votre template → on l&apos;adapte → livré en 14 jours. Maintenance et hébergement inclus.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/contact?service=site-web"
                    className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-sky-500/25 transition hover:scale-[1.02] hover:bg-sky-700"
                  >
                    Réserver l&apos;audit
                  </Link>
                  <a
                    href="#templates"
                    className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted dark:border-white/[0.1]"
                  >
                    Voir les templates
                  </a>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Cross-linking */}
        <ScrollReveal delay={50}>
          <section className="mt-12 text-sm text-muted-foreground">
            <p>
              À combiner avec :{" "}
              <Link className="underline hover:opacity-80" href="/services/trouver-prospects">
                Prospection IA
              </Link>
              {" "}et{" "}
              <Link className="underline hover:opacity-80" href="/services/automatiser-relances">
                Automatisation (RPA)
              </Link>
              {" "}pour compléter la machine.
            </p>
          </section>
        </ScrollReveal>

      </div>
    </main>
  );
}
