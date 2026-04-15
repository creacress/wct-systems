import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SERVICES_SOLUTIONS, SECTEURS } from "@/lib/solutions-data";
import { COMPARATIFS } from "@/lib/comparatifs-data";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/**
 * Mapping of French static paths to their Portuguese equivalents.
 * Portuguese URLs are served under the /pt prefix.
 * If a path has no PT entry here, it is emitted as FR-only (no /pt URL).
 */
const FR_TO_PT: Record<string, string> = {
  "/": "/",
  "/a-propos": "/sobre-nos",
  "/services": "/servicos",
  "/services/digital-workplace": "/servicos/digital-workplace",
  "/services/automatiser-relances": "/servicos/automatizacao-rpa",
  "/services/site-web-moderne": "/servicos/website-moderno",
  "/services/integration-ia": "/servicos/integracao-ia",
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

/** FR-only routes — no /pt URL emitted (Nixie Pulse is a French hardware product). */
const FR_ONLY_ROUTES = new Set<string>([
  "/services/nixie-pulse",
]);

/** FR blog slug → PT blog slug mapping. Only FR posts listed here get a /pt/blog URL. */
const BLOG_FR_TO_PT: Record<string, string> = {
  "automatiser-prospection-b2b": "automatizar-prospeccao-b2b",
  "chatbot-ia-entreprise-guide-2026": "chatbot-ia-empresa-guia-2026",
  "cout-site-web-pme-2026": "custo-site-web-pme-2026",
  "crm-pme-quel-outil-choisir": "crm-pme-qual-ferramenta-escolher",
  "dashboard-kpi-pme": "dashboard-kpi-pme",
  "digital-workplace-guide-pme": "digital-workplace-guia-pme",
  "n8n-automatisation-pme-exemples": "n8n-automatizacao-pme-exemplos",
  "onboarding-nouveaux-employes-pme": "onboarding-novos-colaboradores-pme",
  "relances-email-sequence": "sequencias-email-follow-up",
  "rpa-guide-simple-dirigeants": "rpa-guia-simples-dirigentes",
  "seo-ia-site-visible-chatgpt": "seo-ia-site-visivel-chatgpt",
  "site-web-pme-erreurs-courantes": "site-web-pme-erros-comuns",
};

const staticRoutes = [
  "/",
  "/a-propos",
  "/services",
  "/services/digital-workplace",
  "/services/automatiser-relances",
  "/services/site-web-moderne",
  "/services/integration-ia",
  "/services/nixie-pulse",
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

  // ── Static routes ─────────────────────────────────────────────────────────
  const staticEntries = staticRoutes.flatMap((frPath) => {
    const changeFrequency = frPath === "/" ? "weekly" : "monthly";
    const priority = frPath === "/" ? 1 : frPath.startsWith("/services/") ? 0.8 : 0.6;

    // FR-only routes: emit a single entry with no hreflang alternates.
    if (FR_ONLY_ROUTES.has(frPath)) {
      return [
        {
          url: `${SITE}${frPath}`,
          lastModified,
          changeFrequency: changeFrequency as "weekly" | "monthly",
          priority,
        },
      ];
    }

    const ptPath = FR_TO_PT[frPath];
    if (!ptPath) {
      return [
        {
          url: `${SITE}${frPath}`,
          lastModified,
          changeFrequency: changeFrequency as "weekly" | "monthly",
          priority,
        },
      ];
    }

    return bilingualEntry(frPath, ptPath, {
      lastModified,
      changeFrequency,
      priority,
    });
  });

  // ── Blog articles — only emit /pt URL when a PT translation exists ────────
  const blogEntries = getAllPosts().flatMap((post) => {
    const frUrl = `${SITE}/blog/${post.slug}`;
    const ptSlug = BLOG_FR_TO_PT[post.slug];

    if (!ptSlug) {
      return [
        {
          url: frUrl,
          lastModified: new Date(post.date),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        },
      ];
    }

    const ptUrl = `${SITE}/pt/blog/${ptSlug}`;
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
