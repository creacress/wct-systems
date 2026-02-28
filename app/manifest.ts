import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

  return {
    id: siteUrl,
    name: "WCT Systems — IA & Automatisation pour PME",
    short_name: "WCT Systems",
    description:
      "Systèmes IA et automatisation pour PME : Prospects → Relances → CRM/RDV → KPI. Audit gratuit.",
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
        src: "/images/logo-wct-systems.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/logo-wct-systems.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/logo-wct-systems.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}