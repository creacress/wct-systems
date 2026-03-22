import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SERVICES_SOLUTIONS, SECTEURS } from "@/lib/solutions-data";
import { COMPARATIFS } from "@/lib/comparatifs-data";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/**
 * Mapping of French static paths to their Portuguese equivalents.
 * Portuguese URLs are served under the /pt prefix.
 */
const FR_TO_PT: Record<string, string> = {
  "/": "/",
  "/a-propos": "/sobre-nos",
  "/services": "/servicos",
  "/services/digital-workplace": "/servicos/digital-workplace",
  "/services/trouver-prospects": "/servicos/prospeccao-ia",
  "/services/automatiser-relances": "/servicos/automatizacao-rpa",
  "/services/site-web-moderne": "/servicos/website-moderno",
  "/services/integration-ia": "/servicos/integracao-ia",
  "/services/q2c-facturation": "/servicos/q2c-faturacao",
  "/tarifs": "/precos",
  "/contact": "/contacto",
  "/cas-clients": "/casos-de-sucesso",
  "/blog": "/blog",
  "/solutions": "/solucoes",
  "/comparatifs": "/comparacoes",
  "/politique-de-confidentialite": "/politica-de-privacidade",
  "/mentions-legales": "/avisos-legais",
  "/conditions-generales-de-vente": "/termos-e-condicoes",
};

const staticRoutes = [
  "/",
  "/a-propos",
  "/services",
  "/services/digital-workplace",
  "/services/trouver-prospects",
  "/services/automatiser-relances",
  "/services/site-web-moderne",
  "/services/integration-ia",
  "/services/q2c-facturation",
  "/tarifs",
  "/contact",
  "/cas-clients",
  "/blog",
  "/solutions",
  "/comparatifs",
  "/politique-de-confidentialite",
  "/mentions-legales",
  "/conditions-generales-de-vente",
] as const;

/** Build a sitemap entry with hreflang alternates for both locales. */
function bilingualEntry(
  frPath: string,
  ptPath: string,
  opts: {
    lastModified: Date;
    changeFrequency: "weekly" | "monthly";
    priority: number;
  },
): MetadataRoute.Sitemap {
  const frUrl = `${SITE}${frPath}`;
  const ptUrl = `${SITE}/pt${ptPath}`;

  const alternates = {
    languages: {
      fr: frUrl,
      "pt-PT": ptUrl,
      "x-default": frUrl,
    },
  };

  return [
    {
      url: frUrl,
      lastModified: opts.lastModified,
      changeFrequency: opts.changeFrequency,
      priority: opts.priority,
      alternates,
    },
    {
      url: ptUrl,
      lastModified: opts.lastModified,
      changeFrequency: opts.changeFrequency,
      priority: opts.priority,
      alternates,
    },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // ── Static routes (both locales) ──────────────────────────────────────────
  const staticEntries = staticRoutes.flatMap((frPath) => {
    const ptPath = FR_TO_PT[frPath] ?? frPath;
    return bilingualEntry(frPath, ptPath, {
      lastModified,
      changeFrequency: frPath === "/" ? "weekly" : "monthly",
      priority: frPath === "/" ? 1 : frPath.startsWith("/services/") ? 0.8 : 0.6,
    });
  });

  // ── Blog articles (French only — no /content/blog/pt/ directory yet) ──────
  const blogEntries = getAllPosts().flatMap((post) => {
    const frPath = `/blog/${post.slug}`;
    const ptPath = `/blog/${post.slug}`;
    const frUrl = `${SITE}${frPath}`;
    const ptUrl = `${SITE}/pt${ptPath}`;

    const alternates = {
      languages: {
        fr: frUrl,
        "pt-PT": ptUrl,
        "x-default": frUrl,
      },
    };

    return [
      {
        url: frUrl,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates,
      },
      {
        url: ptUrl,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates,
      },
    ];
  });

  // ── Solutions par secteur (both locales) ──────────────────────────────────
  const solutionEntries = SERVICES_SOLUTIONS.flatMap((service) =>
    SECTEURS.flatMap((secteur) => {
      const frPath = `/solutions/${service.slug}/pour/${secteur.slug}`;
      const ptPath = `/solucoes/${service.slug}/para/${secteur.slug}`;
      return bilingualEntry(frPath, ptPath, {
        lastModified,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    })
  );

  // ── Comparatifs (both locales) ────────────────────────────────────────────
  const comparatifEntries = COMPARATIFS.flatMap((c) => {
    const frPath = `/comparatifs/${c.slug}`;
    const ptPath = `/comparacoes/${c.slug}`;
    return bilingualEntry(frPath, ptPath, {
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return [
    ...staticEntries,
    ...blogEntries,
    ...solutionEntries,
    ...comparatifEntries,
  ];
}
