import type { MetadataRoute } from "next";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const routes = [
  "/",
  "/a-propos",
  "/services",
  "/services/digital-workplace",
  "/services/trouver-prospects",
  "/services/automatiser-relances",
  "/services/site-web-moderne",
  "/services/integration-ia",
  "/tarifs",
  "/contact",
  "/cas-clients",
  "/blog",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${SITE}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services/") ? 0.8 : 0.6,
  }));
}
