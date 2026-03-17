import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";
import Breadcrumbs from "@/components/site/breadcrumbs";
import { CasesList, type CaseStudy } from "@/components/site/cases-list";

export const metadata: Metadata = {
  title: "Cas clients PME — Résultats concrets IA & Automatisation | WCT Systems",
  description:
    "Exemples concrets de PME françaises accompagnées par WCT Systems : prospection IA, site web, automatisation, chatbot IA, digital workplace. Résultats mesurables.",
  keywords: ["cas clients PME", "résultats automatisation PME", "témoignages IA entreprise", "exemples prospection B2B"],
  alternates: { canonical: "/cas-clients" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const CASES: CaseStudy[] = [
  {
    slug: "cabinet-conseil-rh",
    org: "Cabinet de conseil RH",
    sector: "Conseil / RH",
    size: "12 salariés",
    location: "Île-de-France",
    service: "prospection-ia",
    serviceLabel: "Prospection IA",
    title: "De 30 à 180 prospects qualifiés par mois grâce au ciblage IA",
    context: "Ce cabinet RH prospectait manuellement via LinkedIn et le bouche-à-oreille. 2h/jour pour 30 contacts peu qualifiés par mois. Pas de CRM, suivi sur Excel.",
    delivered: [
      "Ciblage IA par secteur, taille d'entreprise et zone géographique",
      "Enrichissement automatique (email pro, LinkedIn, téléphone)",
      "Scoring des leads par IA (score 1-10)",
      "Intégration directe dans un pipeline CRM structuré",
    ],
    results: [
      "180 prospects qualifiés/mois (×6) au lieu de 30",
      "Taux de réponse passé de 4% à 12% grâce à un meilleur ciblage",
      "40h/mois récupérées (réinvesties en rendez-vous clients)",
      "3 signatures supplémentaires le premier trimestre",
    ],
    metrics: [
      { label: "Prospects/mois", value: "×6" },
      { label: "Taux de réponse", value: "12%" },
      { label: "Temps récupéré", value: "40h/mois" },
    ],
    stack: ["Prospection IA", "Enrichissement", "Scoring", "CRM"],
    isPME: true,
  },
  {
    slug: "artisan-plombier-lyon",
    org: "Entreprise de plomberie",
    sector: "Artisanat / BTP",
    size: "4 salariés",
    location: "Lyon (69)",
    service: "site-web",
    serviceLabel: "Site Web Moderne",
    title: "De 0 à 15 demandes de devis par mois avec un site SEO + IA",
    context: "Cette entreprise de plomberie n'avait aucune présence en ligne. 100% du business venait du bouche-à-oreille. Pas de site web, pas de visibilité Google.",
    delivered: [
      "Site Next.js livré en 10 jours (template artisan personnalisé)",
      "SEO local optimisé (plombier + ville + quartier)",
      "SEO IA (JSON-LD, llms.txt) pour apparaître dans les réponses IA",
      "Formulaire de demande de devis avec notification instantanée",
    ],
    results: [
      "15 demandes de devis/mois via le site (partant de 0)",
      "PageSpeed score 98/100",
      "Apparition en page 1 Google sur 'plombier Lyon [quartier]' en 6 semaines",
      "Cité dans les réponses de ChatGPT sur les recherches locales",
    ],
    metrics: [
      { label: "Devis/mois", value: "15" },
      { label: "PageSpeed", value: "98/100" },
      { label: "Délai livraison", value: "10 jours" },
    ],
    stack: ["Next.js", "SEO local", "SEO IA", "Conversion"],
    isPME: true,
  },
  {
    slug: "agence-immobiliere-bordeaux",
    org: "Agence immobilière indépendante",
    sector: "Immobilier",
    size: "8 salariés",
    location: "Bordeaux (33)",
    service: "automatisation",
    serviceLabel: "Automatisation RPA",
    title: "Relances automatisées : taux de réponse propriétaires doublé",
    context: "Cette agence gérait les relances propriétaires manuellement. Les agents oubliaient de relancer, les mandats expiraient sans suivi. Pas de dashboard, KPI inexistants.",
    delivered: [
      "Séquence de relance automatique en 4 étapes (email + SMS)",
      "Pipeline propriétaires structuré avec alertes automatiques",
      "Dashboard KPI : mandats actifs, relances envoyées, taux de réponse",
      "Intégration avec leur logiciel immobilier existant",
    ],
    results: [
      "Taux de réponse propriétaires : 11% → 23%",
      "Zéro mandat oublié (alertes automatiques avant expiration)",
      "15h/semaine récupérées sur l'équipe (3 agents)",
      "2 mandats exclusifs supplémentaires par mois",
    ],
    metrics: [
      { label: "Taux réponse", value: "×2" },
      { label: "Temps gagné", value: "15h/sem" },
      { label: "Mandats/mois", value: "+2" },
    ],
    stack: ["Automatisation", "n8n", "Email/SMS", "Dashboard KPI"],
    isPME: true,
  },
  {
    slug: "e-commerce-cosmetiques",
    org: "Boutique e-commerce cosmétiques",
    sector: "E-commerce / Beauté",
    size: "6 salariés",
    location: "Nantes (44)",
    service: "integration-ia",
    serviceLabel: "Intégration IA",
    title: "Chatbot IA : 70% des questions clients résolues sans intervention humaine",
    context: "Cette boutique en ligne recevait 50+ emails/jour de questions récurrentes (délais, ingrédients, retours). 2 personnes à temps partiel pour répondre. Temps de réponse moyen : 8h.",
    delivered: [
      "Chatbot IA (RAG) formé sur le catalogue produit et la FAQ",
      "Intégration sur le site e-commerce + WhatsApp Business",
      "Escalade automatique vers l'équipe si le chatbot ne sait pas répondre",
      "Dashboard : questions résolues, taux de satisfaction, escalades",
    ],
    results: [
      "70% des questions résolues automatiquement par le chatbot",
      "Temps de réponse moyen : 8h → 12 secondes (chatbot)",
      "Équipe support réduite de 2 personnes à 0.5 ETP",
      "Satisfaction client améliorée (moins d'attente, réponses précises)",
    ],
    metrics: [
      { label: "Questions auto", value: "70%" },
      { label: "Temps réponse", value: "12s" },
      { label: "Support réduit", value: "÷4" },
    ],
    stack: ["Chatbot IA", "RAG", "WhatsApp", "E-commerce"],
    isPME: true,
  },
  {
    slug: "esn-teletravail",
    org: "ESN / SSII en full remote",
    sector: "Tech / Services numériques",
    size: "25 salariés",
    location: "France (full remote)",
    service: "digital-workplace",
    serviceLabel: "Digital Workplace",
    title: "Bureau virtuel : 5 outils remplacés, adoption à 92% en 3 semaines",
    context: "Cette ESN en full remote utilisait Slack, Trello, Google Drive, Zoom et HubSpot en parallèle. L'information était dispersée, l'onboarding des nouveaux prenait 2 semaines, et personne ne savait où trouver quoi.",
    delivered: [
      "Bureau virtuel avec 6 pièces thématiques (hall, open space, salle projet, etc.)",
      "CRM intégré (pipeline clients et avant-ventes)",
      "Messagerie d'équipe par pièce + canaux projet",
      "Gamification : XP par tâche complétée, classement mensuel, badges",
    ],
    results: [
      "5 outils consolidés en 1 seul espace",
      "Taux d'adoption : 92% de l'équipe en 3 semaines",
      "Onboarding nouveaux : 2 semaines → 3 jours",
      "Engagement équipe +35% (mesuré par activité dans l'espace)",
    ],
    metrics: [
      { label: "Outils remplacés", value: "5→1" },
      { label: "Adoption", value: "92%" },
      { label: "Onboarding", value: "÷5" },
    ],
    stack: ["Digital Workplace", "CRM", "Chat", "Gamification"],
    isPME: true,
  },
  {
    slug: "cabinet-comptable-pack",
    org: "Cabinet d'expertise comptable",
    sector: "Comptabilité / Finance",
    size: "18 salariés",
    location: "Toulouse (31)",
    service: "pack-scale",
    serviceLabel: "Pack Scale (5 SaaS)",
    title: "Système complet : prospection + site + automatisation + IA en 30 jours",
    context: "Ce cabinet voulait moderniser son acquisition client en une seule fois. Prospection manuelle, site WordPress lent, aucune relance structurée, et pas d'outil IA. Objectif : un système complet, opérationnel en 1 mois.",
    delivered: [
      "Prospection IA : ciblage TPE/PME par code NAF + zone géo",
      "Site Next.js (template cabinet comptable) avec SEO + SEO IA",
      "Automatisation : relances prospect + envoi documents + rappels échéances",
      "Chatbot IA pour les questions fréquentes des clients du cabinet",
      "Digital Workplace pour l'équipe (5 pièces, KPI dans le hall)",
    ],
    results: [
      "Système complet opérationnel en 28 jours",
      "45 prospects qualifiés dès le premier mois",
      "12 demandes de devis via le nouveau site",
      "Taux de réponse relances : 19%",
      "Temps admin récupéré : ~25h/mois",
    ],
    metrics: [
      { label: "Déploiement", value: "28 jours" },
      { label: "Prospects M1", value: "45" },
      { label: "Temps gagné", value: "25h/mois" },
    ],
    stack: ["Prospection IA", "Next.js", "Automatisation", "Chatbot IA", "Digital Workplace"],
    isPME: true,
  },
  {
    slug: "la-poste",
    org: "La Poste",
    sector: "Services / Intranet",
    size: "Grand groupe",
    location: "France",
    service: "automatisation",
    serviceLabel: "Automatisation + Chatbot",
    title: "Refonte intranet + automatisations (RPA) + chatbots",
    context: "Moderniser des environnements intranet et fiabiliser des bascules SI tout en réduisant les tâches répétitives.",
    delivered: [
      "Refontes et upgrade de sites intranet (modernisation UI/UX)",
      "Automatisations RPA (process internes, tâches répétitives)",
      "Chatbots d'assistance (support, recherche, FAQ interne)",
      "Bascule SI maîtrisée : plan, exécution, validation",
    ],
    results: [
      "Bascule SI maîtrisée et sécurisée",
      "Intranet modernisé et plus clair pour les équipes",
      "Réduction des frictions opérationnelles grâce à l'automatisation",
    ],
    metrics: [
      { label: "Bascule SI", value: "Réussie" },
      { label: "Intranet", value: "Modernisé" },
      { label: "RPA", value: "Déployé" },
    ],
    stack: ["Next.js", "Automatisation (RPA)", "APIs", "UX / Design system"],
    isPME: false,
  },
  {
    slug: "ministere-des-armees",
    org: "Ministère des Armées",
    sector: "SI / Web",
    size: "Institution",
    location: "France",
    service: "automatisation",
    serviceLabel: "SI + Automatisation",
    title: "Refonte SI ROC + optimisation site web de la réserve + automatisations run API",
    context: "Améliorer la robustesse du SI ROC, optimiser un site public, et automatiser des tâches de run autour des APIs.",
    delivered: [
      "Refonte / amélioration du SI ROC (fiabilité, structure, exploitation)",
      "Optimisation du site web de la réserve (structure, perf, SEO)",
      "Automatisation des tâches de run (APIs, contrôles, routines)",
      "Industrialisation : procédures, monitoring et standards",
    ],
    results: [
      "SI plus stable et exploitable au quotidien",
      "Site web plus performant et plus lisible",
      "Run API rationalisé (moins d'actions manuelles)",
    ],
    metrics: [
      { label: "SI ROC", value: "Stabilisé" },
      { label: "Run API", value: "Automatisé" },
      { label: "Site web", value: "Optimisé" },
    ],
    stack: ["SI", "APIs", "Automatisation", "Optimisation Web"],
    isPME: false,
  },
];

const FAQ = [
  { q: "Les chiffres sont-ils réels ?", a: "Oui. Tous les résultats sont mesurés et vérifiables. Les noms sont anonymisés à la demande des clients, mais les données sont exactes." },
  { q: "Combien de temps pour obtenir des résultats ?", a: "En général, une V1 est en production en 7-14 jours. Les premiers résultats (prospects, demandes, gain de temps) arrivent dans le premier mois." },
  { q: "Vous travaillez avec quels types de PME ?", a: "Toutes tailles : de l'artisan solo au cabinet de 50 salariés. On adapte le service et le budget. L'audit gratuit permet de dimensionner." },
  { q: "Je peux parler à un de vos clients ?", a: "Oui, sous réserve de l'accord du client concerné. Demandez-le lors de l'audit et on organise un échange." },
  { q: "Vous travaillez aussi avec des grands comptes ?", a: "Oui. On a accompagné La Poste et le Ministère des Armées sur des projets SI, automatisation et chatbot. La méthode est la même, adaptée à l'échelle." },
] as const;

export default function CasClientsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Cas clients", item: `${SITE_URL}/cas-clients` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Cas clients PME — WCT Systems",
        description: "Exemples concrets de PME françaises accompagnées par WCT Systems.",
        url: `${SITE_URL}/cas-clients`,
        isPartOf: { "@type": "WebSite", name: "WCT Systems", url: SITE_URL },
      },
      {
        "@type": "ItemList",
        name: "Cas clients",
        numberOfItems: CASES.length,
        itemListElement: CASES.map((c, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: `${c.org} — ${c.title}`,
          url: `${SITE_URL}/cas-clients#${c.slug}`,
        })),
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

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-slate-50/50 via-background to-background dark:from-slate-950/30" />
      <GridPattern variant="dot" color="rgba(100, 116, 139, 0.06)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        <Breadcrumbs items={[
          { label: "Accueil", href: "/" },
          { label: "Cas clients" },
        ]} />

        {/* HERO */}
        <ScrollReveal direction="up">
          <section className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-1 text-xs uppercase tracking-widest text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
              Cas clients &bull; PME &bull; Grands comptes
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              Cas clients
              <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
                des PME aux grands comptes
              </span>
            </h1>

            <p className="max-w-3xl text-lg text-muted-foreground">
              Pas de promesses magiques. Des résultats mesurables pour des PME françaises :
              prospection IA, sites web qui convertissent, automatisations qui font gagner du temps,
              chatbots IA et digital workplace. + Grands comptes & institutions.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Parler de votre projet
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Voir les services
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* CASES LIST (Client Component with filters) */}
        <CasesList cases={CASES} />

        {/* FAQ */}
        <section className="mt-20" aria-label="FAQ">
          <ScrollReveal direction="up">
            <h2 className="font-display font-bold text-2xl tracking-tight">Questions fréquentes</h2>
          </ScrollReveal>
          <div className="mt-6 space-y-3">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur transition-all duration-200 open:shadow-md hover:bg-muted/50 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
              >
                <summary className="flex cursor-pointer items-center justify-between font-medium text-sm">
                  {f.q}
                  <span className="ml-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <ScrollReveal direction="up">
          <section className="mt-20 rounded-3xl border border-violet-100/70 bg-linear-to-r from-violet-50/50 to-indigo-50/30 p-10 text-center dark:border-violet-900/20 dark:from-violet-950/25 dark:to-indigo-950/15">
            <h2 className="font-display font-bold text-3xl tracking-tight">On parle de votre contexte ?</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Audit rapide de 15 min, gratuit, sans engagement. On analyse votre situation et on propose un plan concret.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Réserver l&apos;audit
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Explorer les services
              </Link>
            </div>
          </section>
        </ScrollReveal>

      </div>
    </main>
  );
}
