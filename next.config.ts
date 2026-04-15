import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nixiepulse.com",
      },
    ],
  },

  async redirects() {
    return [
      // =============================================
      // 1. EXPLORÉES NON INDEXÉES (484 pages)
      // =============================================

      // --- Anciennes pages services (ancien site) ---
      {
        source: "/services/machine-deep-learning",
        destination: "/services/integration-ia",
        permanent: true,
      },
      {
        source: "/services/intelligence-artificielle",
        destination: "/services/integration-ia",
        permanent: true,
      },

      // --- Anciennes pages /fr/ (ancien site multilingue) ---
      {
        source: "/fr/about",
        destination: "/a-propos",
        permanent: true,
      },
      {
        source: "/fr/services/intelligence-artificielle",
        destination: "/services/integration-ia",
        permanent: true,
      },
      {
        source: "/fr/services/rpa-automatisation",
        destination: "/services/automatiser-relances",
        permanent: true,
      },
      {
        source: "/fr/solutions",
        destination: "/services",
        permanent: true,
      },

      // --- Ancien PDF / downloads ---
      {
        source: "/downloads/:path*",
        destination: "/services",
        permanent: true,
      },

      // --- Attrape-tout /fr/ ---
      {
        source: "/fr/:path*",
        destination: "/",
        permanent: true,
      },

      // =============================================
      // 2. INTROUVABLES / 404 (41 pages)
      // =============================================

      // --- index.html ---
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },

      // --- Anciennes pages services ---
      {
        source: "/services/rpa-automatisation",
        destination: "/services/automatiser-relances",
        permanent: true,
      },
      {
        source: "/services/generateur-ia",
        destination: "/services/integration-ia",
        permanent: true,
      },
      {
        source: "/services/automation",
        destination: "/services/automatiser-relances",
        permanent: true,
      },
      {
        source: "/services/audit-gratuit",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/services/page-services",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/rpa-ia",
        destination: "/services/automatiser-relances",
        permanent: true,
      },

      // --- Anciennes solutions (Lisa, Marc, Julie) ---
      {
        source: "/solutions",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/solutions/lisa",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/solutions/marc",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/solutions/julie",
        destination: "/services",
        permanent: true,
      },

      // --- Pages IA ---
      {
        source: "/IA",
        destination: "/services/integration-ia",
        permanent: true,
      },
      {
        source: "/IA/Dev",
        destination: "/services/integration-ia",
        permanent: true,
      },

      // --- Ancienne page Python ---
      {
        source: "/developpement-python",
        destination: "/services/integration-ia",
        permanent: true,
      },

      // --- Ancien blog ---
      {
        source: "/blog/debutant/peur-ia",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/debutant/ia-simplement",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/debutant/ia-vs-machine-learning",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/intelligence-artificelle",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/debutant",
        destination: "/blog",
        permanent: true,
      },

      // --- Pages légales / mentions (anciennes URLs → nouvelles pages) ---
      {
        source: "/legal-mentions",
        destination: "/mentions-legales",
        permanent: true,
      },
      {
        source: "/LegalMentions",
        destination: "/mentions-legales",
        permanent: true,
      },
      {
        source: "/terms-of-sale",
        destination: "/conditions-generales-de-vente",
        permanent: true,
      },

      // --- Autres anciennes pages ---
      {
        source: "/about",
        destination: "/a-propos",
        permanent: true,
      },
      {
        source: "/pricing/custom",
        destination: "/tarifs",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/tarifs",
        permanent: true,
      },
      {
        source: "/tarifications",
        destination: "/tarifs",
        permanent: true,
      },
      {
        source: "/tarification",
        destination: "/tarifs",
        permanent: true,
      },
      {
        source: "/bug-bounty",
        destination: "/",
        permanent: true,
      },
      {
        source: "/automatisation",
        destination: "/services/automatiser-relances",
        permanent: true,
      },

      // --- Anciens sitemaps ---
      {
        source: "/sitemap-images.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap-static.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },

      // --- Ancienne recherche ---
      {
        source: "/search",
        destination: "/",
        permanent: true,
      },

      // --- Anciennes pages non redirigées ---
      {
        source: "/automatisation-entreprise",
        destination: "/services/automatiser-relances",
        permanent: true,
      },
      {
        source: "/creation-site-web",
        destination: "/services/site-web-moderne",
        permanent: true,
      },
      {
        source: "/website",
        destination: "/",
        permanent: true,
      },

      // --- Anciennes pages services renommées ---
      {
        source: "/services/site-generation-leads",
        destination: "/services/site-web-moderne",
        permanent: true,
      },
      {
        source: "/services/dashboard-kpi",
        destination: "/services/integration-ia",
        permanent: true,
      },
      {
        source: "/services/gestion-rdv-crm",
        destination: "/services/automatiser-relances",
        permanent: true,
      },

      // =============================================
      // 3. SERVICES SUPPRIMÉS (2024-2025)
      // =============================================

      // --- Prospection IA removed ---
      {
        source: "/services/trouver-prospects",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/pt/servicos/prospeccao-ia",
        destination: "/pt/servicos",
        permanent: true,
      },

      // --- Q2C Facturation removed ---
      {
        source: "/services/q2c-facturation",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/pt/servicos/q2c-faturacao",
        destination: "/pt/servicos",
        permanent: true,
      },

      // --- Solutions subdirectory catch-all ---
      {
        source: "/solutions/prospection-ia/:path*",
        destination: "/solutions",
        permanent: true,
      },

      // --- AIViz aliases ---
      {
        source: "/ai-visibility",
        destination: "/services/aiviz",
        permanent: true,
      },
      {
        source: "/aiviz",
        destination: "/services/aiviz",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);