export const SERVICE_SLUGS = [
  "prospection-ia",
  "site-web",
  "automatisation",
  "integration-ia",
  "digital-workplace",
] as const;

export const SECTEUR_SLUGS = [
  "cabinet-conseil",
  "agence-marketing",
  "cabinet-comptable",
  "esn",
  "coach-consultant",
  "artisan",
  "restaurant",
  "avocat-notaire",
  "immobilier",
  "e-commerce",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type SecteurSlug = (typeof SECTEUR_SLUGS)[number];

export const SERVICES_SOLUTIONS = [
  { slug: "prospection-ia" as const, serviceHref: "/services/trouver-prospects", price: "99" },
  { slug: "site-web" as const, serviceHref: "/services/site-web-moderne", price: "99" },
  { slug: "automatisation" as const, serviceHref: "/services/automatiser-relances", price: "149" },
  { slug: "integration-ia" as const, serviceHref: "/services/integration-ia", price: "199" },
  { slug: "digital-workplace" as const, serviceHref: "/services/digital-workplace", price: "199" },
] as const;

export const SECTEURS = [
  { slug: "cabinet-conseil" as const, faqCount: 3 },
  { slug: "agence-marketing" as const, faqCount: 3 },
  { slug: "cabinet-comptable" as const, faqCount: 3 },
  { slug: "esn" as const, faqCount: 3 },
  { slug: "coach-consultant" as const, faqCount: 3 },
  { slug: "artisan" as const, faqCount: 3 },
  { slug: "restaurant" as const, faqCount: 3 },
  { slug: "avocat-notaire" as const, faqCount: 3 },
  { slug: "immobilier" as const, faqCount: 3 },
  { slug: "e-commerce" as const, faqCount: 3 },
] as const;

export type ServiceSolution = (typeof SERVICES_SOLUTIONS)[number];
export type Secteur = (typeof SECTEURS)[number];
