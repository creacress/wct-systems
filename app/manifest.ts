import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

  return {
    id: siteUrl,
    name: "WCT Systems — Digital Workplace, IA & Automatisation pour PME",
    short_name: "WCT Systems",
    description:
      "Alternative française à Microsoft 365 pour PME : Digital Workplace gamifié, Site Web, Automatisation RPA, Intégration IA et Nixie Pulse. Hébergé en France. Audit gratuit.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0B0B0F",
    theme_color: "#0B0B0F",
    categories: ["business", "productivity", "technology"],
    lang: "fr",
    icons: [
      {
        src: "/images/logo-wct-systems-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/logo-wct-systems-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/logo-wct-systems-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}