export const COMPARATIF_SLUGS = [
  "zapier-vs-n8n",
  "prospection-manuelle-vs-ia",
  "wordpress-vs-nextjs-site-pme",
  "chatbot-ia-vs-faq-statique",
  "make-vs-n8n",
] as const;

export type ComparatifSlug = (typeof COMPARATIF_SLUGS)[number];

export type ComparatifStructural = {
  slug: ComparatifSlug;
  category: "automatisation" | "prospection" | "site-web" | "ia";
  serviceHref: string;
  featureCount: number;
  faqCount: number;
  prosACount: number;
  consACount: number;
  prosBCount: number;
  consBCount: number;
  prosWCTCount: number;
};

export const COMPARATIFS: ComparatifStructural[] = [
  {
    slug: "zapier-vs-n8n",
    category: "automatisation",
    serviceHref: "/services/automatiser-relances",
    featureCount: 8,
    faqCount: 3,
    prosACount: 4,
    consACount: 4,
    prosBCount: 4,
    consBCount: 4,
    prosWCTCount: 5,
  },
  {
    slug: "prospection-manuelle-vs-ia",
    category: "prospection",
    serviceHref: "/services/trouver-prospects",
    featureCount: 8,
    faqCount: 3,
    prosACount: 4,
    consACount: 4,
    prosBCount: 4,
    consBCount: 4,
    prosWCTCount: 5,
  },
  {
    slug: "wordpress-vs-nextjs-site-pme",
    category: "site-web",
    serviceHref: "/services/site-web-moderne",
    featureCount: 8,
    faqCount: 3,
    prosACount: 4,
    consACount: 4,
    prosBCount: 4,
    consBCount: 4,
    prosWCTCount: 5,
  },
  {
    slug: "chatbot-ia-vs-faq-statique",
    category: "ia",
    serviceHref: "/services/integration-ia",
    featureCount: 8,
    faqCount: 3,
    prosACount: 4,
    consACount: 4,
    prosBCount: 4,
    consBCount: 4,
    prosWCTCount: 5,
  },
  {
    slug: "make-vs-n8n",
    category: "automatisation",
    serviceHref: "/services/automatiser-relances",
    featureCount: 8,
    faqCount: 3,
    prosACount: 4,
    consACount: 4,
    prosBCount: 4,
    consBCount: 4,
    prosWCTCount: 5,
  },
];
