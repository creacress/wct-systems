import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/blog-card";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";
import { getTranslations, getLocale } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  const locale = await getLocale();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: t("metadata.keywords").split(", "),
    alternates: {
      canonical: `${siteUrl}${locale === "pt" ? "/pt/blog" : "/blog"}`,
      languages: {
        fr: `${siteUrl}/blog`,
        "pt-PT": `${siteUrl}/pt/blog`,
        "x-default": `${siteUrl}/blog`,
      },
    },
    openGraph: {
      locale: locale === "pt" ? "pt_PT" : "fr_FR",
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const locale = await getLocale();
  const posts = getAllPosts(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("jsonLd.breadcrumbHome"), item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: t("jsonLd.breadcrumbBlog"), item: `${SITE_URL}/blog` },
        ],
      },
      {
        "@type": "Blog",
        name: t("jsonLd.blogName"),
        description: t("jsonLd.blogDescription"),
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
              {t("list.badge")}
            </div>

            <h1 className="font-display font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
              {t("list.titleLine1")}
              <span className="block bg-linear-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
                {t("list.titleLine2")}
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              {t("list.description")}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                {t("list.ctaPrimary")}
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                {t("list.ctaSecondary")}
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* ARTICLES GRID */}
        <ScrollReveal direction="up" delay={80}>
          <section className="mt-16 sm:mt-20" aria-label="Articles">
            <div className="flex items-baseline justify-between gap-4 mb-8">
              <div>
                <h2 className="font-display font-bold text-xl tracking-tight">{t("list.allArticles")}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("list.articleCount", { count: posts.length })}
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
          <section className="mt-20" aria-label="CTA">
            <div className="rounded-3xl border border-indigo-100/70 bg-linear-to-r from-indigo-50/50 to-violet-50/30 p-10 text-center shadow-sm dark:border-indigo-900/20 dark:from-indigo-950/25 dark:to-violet-950/15 dark:shadow-lg dark:shadow-indigo-950/10">
              <div className="mx-auto max-w-2xl">
                <h2 className="font-display font-bold text-3xl tracking-tight">
                  {t("list.ctaTitle")}
                </h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  {t("list.ctaDescription")}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
                  >
                    {t("list.ctaReserve")}
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted"
                  >
                    {t("list.ctaExplore")}
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
