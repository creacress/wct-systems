import type { Metadata } from "next";
import PricingContent from "@/components/site/pricing/PricingContent";

export const metadata: Metadata = {
  title: "Tarifs — SaaS IA & Automatisation pour PME | WCT Systems",
  description:
    "4 SaaS pour PME : prospection IA, site web moderne, automatisation, integration IA. A partir de 79 EUR HT/mois. Mise en place incluse. -20% en annuel. Audit gratuit.",
  alternates: { canonical: "/tarifs" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/* ── Donnees pour JSON-LD (serveur uniquement) ────────────────────────────── */

const SAAS_LD = [
  { name: "Prospection IA", description: "Ciblage, enrichissement, integration CRM par IA.", price: "99" },
  { name: "Site Web Moderne", description: "Site rapide, SEO + SEO IA, conversion, mobile-first.", price: "99" },
  { name: "Automatisation (RPA)", description: "Workflows sur mesure : relances, CRM, reporting.", price: "149" },
  { name: "Integration IA", description: "Chatbot, agents, assistants IA sur mesure.", price: "199" },
];

const PACKS_LD = [
  { name: "Pack Starter", description: "2 SaaS au choix", price: "179" },
  { name: "Pack Business", description: "3 SaaS au choix", price: "299" },
  { name: "Pack Scale", description: "4 SaaS inclus", price: "399" },
];

const FAQ_LD = [
  { q: "C'est quoi un SaaS ?", a: "Un SaaS est un logiciel accessible en ligne, sans installation. Vous payez un abonnement mensuel ou annuel." },
  { q: "Je peux prendre un seul service sans pack ?", a: "Oui. Chaque SaaS est disponible individuellement. Les packs permettent d'economiser 10 a 25 %." },
  { q: "Je peux tester avant de m'engager ?", a: "On propose un audit gratuit de 15 a 30 minutes pour comprendre votre situation." },
  { q: "Les prix vont-ils augmenter ?", a: "Vos prix sont garantis 12 mois apres souscription." },
  { q: "Qu'est-ce qui est inclus dans la mise en place ?", a: "Configuration, import de donnees, formation equipe (1h), accompagnement 30 jours." },
  { q: "Il y a des frais de mise en place ?", a: "Non. La mise en place est incluse dans tous les tarifs." },
  { q: "Le paiement en 3x, comment ca marche ?", a: "Pour tout engagement annuel ou setup site web, reglez en 3 fois sans frais." },
  { q: "Y a-t-il un engagement de duree ?", a: "Pas d'engagement en mensuel. L'engagement annuel est de 12 mois avec -20%." },
  { q: "Je peux changer de formule en cours de route ?", a: "Oui, a tout moment." },
  { q: "Et si mes besoins ne correspondent a rien ici ?", a: "On fait un audit gratuit de 15 a 30 minutes." },
];

export default function TarifsPage() {
  const allOffers = [
    ...SAAS_LD.map((s) => ({
      "@type": "Offer" as const,
      name: s.name,
      description: s.description,
      price: s.price,
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: s.price,
        priceCurrency: "EUR",
        unitText: "MONTH",
      },
    })),
    ...PACKS_LD.map((p) => ({
      "@type": "Offer" as const,
      name: p.name,
      description: p.description,
      price: p.price,
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.price,
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
        mainEntity: FAQ_LD.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div id="content" className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/70 via-background to-background dark:from-violet-950/30" />
      <PricingContent />
    </div>
  );
}
