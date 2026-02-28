import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  async redirects() {
    return [
      // =============================================
      // 1. EXPLORÉES NON INDEXÉES (484 pages)
      // =============================================

      // --- 472 anciennes URLs /contact?model=... ---
      // Une seule règle attrape TOUTES les variantes
      {
        source: "/contact",
        has: [{ type: "query", key: "model" }],
        destination: "/contact",
        permanent: true,
      },

      // --- Anciennes pages services (ancien site) ---
      {
        source: "/services/machine-deep-learning",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/intelligence-artificielle",
        destination: "/services",
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
        destination: "/services",
        permanent: true,
      },
      {
        source: "/fr/services/rpa-automatisation",
        destination: "/services",
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
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/generateur-ia",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/automation",
        destination: "/services",
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
        destination: "/services",
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
        destination: "/services",
        permanent: true,
      },
      {
        source: "/IA/Dev",
        destination: "/services",
        permanent: true,
      },

      // --- Ancienne page Python ---
      {
        source: "/developpement-python",
        destination: "/services",
        permanent: true,
      },

      // --- Ancien blog ---
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

      // --- Pages légales / mentions ---
      {
        source: "/mentions-legales",
        destination: "/",
        permanent: true,
      },
      {
        source: "/legal-mentions",
        destination: "/",
        permanent: true,
      },
      {
        source: "/LegalMentions",
        destination: "/",
        permanent: true,
      },
      {
        source: "/terms-of-sale",
        destination: "/",
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
        destination: "/contact",
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
    ];
  },
};

export default nextConfig;