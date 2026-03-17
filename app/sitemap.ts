import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SERVICES_SOLUTIONS, SECTEURS } from "@/lib/solutions-data";

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
  "/solutions",
  "/politique-de-confidentialite",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = routes.map((path) => ({
    url: `${SITE}${path}`,
    lastModified,
    changeFrequency: (path === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services/") ? 0.8 : 0.6,
  }));

  // Blog articles
  const blogRoutes = getAllPosts().map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Solutions par secteur
  const solutionRoutes = SERVICES_SOLUTIONS.flatMap((service) =>
    SECTEURS.map((secteur) => ({
      url: `${SITE}/solutions/${service.slug}/pour/${secteur.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
  );

  return [...staticRoutes, ...blogRoutes, ...solutionRoutes];
}
