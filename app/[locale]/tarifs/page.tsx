import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import PricingContent from "@/components/site/pricing/PricingContent";
import GridPattern from "@/components/ui/grid-pattern";
import { PricingTracker } from "@/components/site/pricing-tracker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tarifs");
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: t("metadata.keywords").split(", "),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/precos" : "/tarifs"}`,
      languages: {
        fr: `${siteUrl}/tarifs`,
        "pt-PT": `${siteUrl}/pt/precos`,
        "x-default": `${siteUrl}/tarifs`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
  };
}

export default async function TarifsPage() {
  const t = await getTranslations("tarifs");

  /* ── Donnees pour JSON-LD (serveur uniquement) ────────────────────────────── */

  const SAAS_LD = [0, 1, 2, 3, 4, 5].map((i) => ({
    name: t(`jsonLd.saas.${i}.name`),
    description: t(`jsonLd.saas.${i}.description`),
    price: ["199", "99", "99", "149", "199", "149"][i],
  }));

  const PACKS_LD = [0, 1, 2].map((i) => ({
    name: t(`jsonLd.packs.${i}.name`),
    description: t(`jsonLd.packs.${i}.description`),
    price: ["199", "349", "649"][i],
  }));

  const FAQ_LD = Array.from({ length: 11 }, (_, i) => ({
    q: t(`jsonLd.faq.${i}.q`),
    a: t(`jsonLd.faq.${i}.a`),
  }));

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
          { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: t("breadcrumb.tarifs"), item: `${SITE_URL}/tarifs` },
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
      <PricingTracker />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/40 via-background to-background dark:from-violet-950/15" />
      <GridPattern variant="line" color="rgba(139, 92, 246, 0.04)" />
      <PricingContent />
    </div>
  );
}
