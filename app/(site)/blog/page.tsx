import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/blog-card";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";

export const metadata: Metadata = {
  title: "Blog — IA, automatisation et prospection B2B pour PME | WCT Systems",
  description:
    "Articles pratiques sur l'IA appliquée, l'automatisation (n8n), la prospection B2B, les relances, le CRM et le SEO pour PME.",
  keywords: ["blog IA PME", "automatisation PME", "prospection B2B", "SEO IA", "RPA PME"],
  alternates: { canonical: "/blog" },
  robots: { index: true, follow: true },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        ],
      },
      {
        "@type": "Blog",
        name: "Blog WCT Systems",
        description:
          "Articles pratiques sur l'IA appliquée, l'automatisation, la prospection B2B et le SEO pour PME.",
        url: `${SITE_URL}/blog`,
        publisher: {
          "@type": "Organization",
          name: "WCT Systems",
          url: SITE_URL,
        },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          url: `${SITE_URL}/blog/${post.slug}`,
          author: { "@type": "Organization", name: "WCT Systems" },
        })),
      },
    ],
  };

  return (
    <main id="content" className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-indigo-50/30 via-background to-background dark:from-indigo-950/10" />
      <GridPattern variant="dot" color="rgba(99, 102, 241, 0.05)" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

        {/* HERO */}
        <ScrollReveal direction="up">
          <section className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-xs uppercase tracking-wide text-indigo-700 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:text-indigo-400">
              Blog &bull; IA &bull; Automatisation &bull; Acquisition
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              Ressources pratiques
              <span className="block bg-linear-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
                pour PME ambitieuses
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              Des articles concrets sur l&apos;IA appliquée, l&apos;automatisation (n8n), la prospection B2B,
              les relances et le SEO. Pas de théorie : des systèmes qui tournent en production.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Réserver un audit gratuit
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Voir les services
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* ARTICLES GRID */}
        <ScrollReveal direction="up" delay={80}>
          <section className="mt-16 sm:mt-20" aria-label="Articles">
            <div className="flex items-baseline justify-between gap-4 mb-8">
              <div>
                <h2 className="font-display font-bold text-xl tracking-tight">Tous les articles</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {posts.length} article{posts.length > 1 ? "s" : ""} publiés
                </p>
              </div>
              <div className="hidden sm:block h-px flex-1 bg-border" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                  readingTime={post.readingTime}
                />
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" delay={100}>
          <section className="mt-20" aria-label="Appel à l'action">
            <div className="rounded-3xl border border-indigo-100/70 bg-linear-to-r from-indigo-50/50 to-violet-50/30 p-10 text-center shadow-sm dark:border-indigo-900/20 dark:from-indigo-950/25 dark:to-violet-950/15 dark:shadow-lg dark:shadow-indigo-950/10">
              <div className="mx-auto max-w-2xl">
                <h2 className="font-display font-bold text-3xl tracking-tight">
                  Un projet en tête ?
                </h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  Audit rapide de 15 min, gratuit, sans engagement. On répond aux vraies questions dans votre contexte.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
                  >
                    Réserver l&apos;audit
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted"
                  >
                    Explorer les services
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

      </div>
    </main>
  );
}
