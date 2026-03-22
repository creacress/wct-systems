import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "pt"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/services": {
      fr: "/services",
      pt: "/servicos",
    },
    "/services/digital-workplace": {
      fr: "/services/digital-workplace",
      pt: "/servicos/digital-workplace",
    },
    "/services/trouver-prospects": {
      fr: "/services/trouver-prospects",
      pt: "/servicos/prospeccao-ia",
    },
    "/services/site-web-moderne": {
      fr: "/services/site-web-moderne",
      pt: "/servicos/website-moderno",
    },
    "/services/automatiser-relances": {
      fr: "/services/automatiser-relances",
      pt: "/servicos/automatizacao-rpa",
    },
    "/services/integration-ia": {
      fr: "/services/integration-ia",
      pt: "/servicos/integracao-ia",
    },
    "/services/q2c-facturation": {
      fr: "/services/q2c-facturation",
      pt: "/servicos/q2c-faturacao",
    },
    "/tarifs": {
      fr: "/tarifs",
      pt: "/precos",
    },
    "/contact": {
      fr: "/contact",
      pt: "/contacto",
    },
    "/contact/merci": {
      fr: "/contact/merci",
      pt: "/contacto/obrigado",
    },
    "/a-propos": {
      fr: "/a-propos",
      pt: "/sobre-nos",
    },
    "/cas-clients": {
      fr: "/cas-clients",
      pt: "/casos-de-sucesso",
    },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/comparatifs": {
      fr: "/comparatifs",
      pt: "/comparacoes",
    },
    "/comparatifs/[slug]": {
      fr: "/comparatifs/[slug]",
      pt: "/comparacoes/[slug]",
    },
    "/solutions": {
      fr: "/solutions",
      pt: "/solucoes",
    },
    "/solutions/[service]/pour/[secteur]": {
      fr: "/solutions/[service]/pour/[secteur]",
      pt: "/solucoes/[service]/para/[secteur]",
    },
    "/mentions-legales": {
      fr: "/mentions-legales",
      pt: "/avisos-legais",
    },
    "/politique-de-confidentialite": {
      fr: "/politique-de-confidentialite",
      pt: "/politica-de-privacidade",
    },
    "/conditions-generales-de-vente": {
      fr: "/conditions-generales-de-vente",
      pt: "/termos-e-condicoes",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
