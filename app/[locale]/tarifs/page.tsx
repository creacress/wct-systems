import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import PricingContent from "@/components/site/pricing/PricingContent";
import { PricingTracker } from "@/components/site/pricing-tracker";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

// Canonical mapping SaaS index → service URL slug (aligned with home SERVICES array)
const SAAS_SLUGS = [
  "digital-workplace",
  "site-web-moderne",
  "automatiser-relances",
  "integration-ia",
  "nixie-pulse",
  "aiviz",
] as const;

const PACK_SLUGS = ["pack-starter", "pack-business", "pack-scale"] as const;

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

  // Wrap each SaaS Offer in a Service node (provider → canonical #organization)
  // Exception: Nixie Pulse (index 4) = hardware one-time → modeled as Product
  const saasNodes = SAAS_LD.map((s, i) => {
    const slug = SAAS_SLUGS[i] ?? `service-${i}`;
    const isHardware = slug === "nixie-pulse";

    const offer = {
      "@type": "Offer" as const,
      name: `${s.name} — ${isHardware ? "achat unique" : "abonnement mensuel"}`,
      price: s.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/services/${slug}`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: s.price,
        priceCurrency: "EUR",
        ...(isHardware
          ? {}
          : { unitText: "MONTH", billingDuration: "P1M" }),
      },
      seller: { "@id": `${SITE_URL}#organization` },
    };

    if (isHardware) {
      return {
        "@type": "Product" as const,
        "@id": `${SITE_URL}/tarifs#${slug}`,
        name: s.name,
        description: s.description,
        brand: { "@type": "Brand", name: "WCT Systems" },
        category: "Hardware / Dashboard KPI",
        url: `${SITE_URL}/services/${slug}`,
        offers: offer,
      };
    }

    return {
      "@type": "Service" as const,
      "@id": `${SITE_URL}/tarifs#${slug}`,
      name: s.name,
      description: s.description,
      provider: { "@id": `${SITE_URL}#organization` },
      areaServed: { "@type": "Country", name: "France" },
      category: "SaaS / Digital Workplace",
      url: `${SITE_URL}/services/${slug}`,
      offers: offer,
    };
  });

  // Wrap each Pack Offer in a Service node
  const packNodes = PACKS_LD.map((p, i) => {
    const slug = PACK_SLUGS[i] ?? `pack-${i}`;
    return {
      "@type": "Service" as const,
      "@id": `${SITE_URL}/tarifs#${slug}`,
      name: p.name,
      description: p.description,
      provider: { "@id": `${SITE_URL}#organization` },
      areaServed: { "@type": "Country", name: "France" },
      category: "SaaS Bundle / Pack",
      url: `${SITE_URL}/tarifs#packs`,
      offers: {
        "@type": "Offer",
        name: `${p.name} — abonnement mensuel`,
        price: p.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/tarifs#packs`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: p.price,
          priceCurrency: "EUR",
          unitText: "MONTH",
          billingDuration: "P1M",
        },
        seller: { "@id": `${SITE_URL}#organization` },
      },
    };
  });

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
      ...saasNodes,
      ...packNodes,
      {
        "@type": "FAQPage",
        mainEntity: FAQ_LD.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "WebPage",
        url: `${SITE_URL}/tarifs`,
        name: t("metadata.title"),
        isPartOf: { "@id": `${SITE_URL}#website` },
        inLanguage: "fr-FR",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "[data-speakable]"],
        },
      },
    ],
  };

  return (
    <main id="content" className="relative overflow-hidden">
      <PricingTracker />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Ambient background — Soft UI Evolution */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-violet-50/70 via-background to-transparent dark:from-violet-950/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-8%] -z-10 h-[480px] w-[640px] -translate-x-1/2 rounded-full bg-violet-400/15 blur-[120px] dark:bg-violet-500/10"
      />
      <PricingContent />
    </main>
  );
}
