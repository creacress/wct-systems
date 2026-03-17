import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import RelatedArticles from "@/components/blog/related-articles";
import ScrollReveal from "@/components/ui/scroll-reveal";
import GridPattern from "@/components/ui/grid-pattern";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Blog WCT Systems`,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        p.tags.some((t) => post.tags.includes(t))
    )
    .slice(0, 2);

  const formattedDate = new Date(post.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${slug}` },
        ],
      },
      {
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        author: { "@type": "Organization", name: post.author, url: SITE_URL },
        publisher: { "@type": "Organization", name: "WCT Systems", url: SITE_URL },
        url: `${SITE_URL}/blog/${slug}`,
        keywords: post.tags.join(", "),
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

      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        {/* Breadcrumbs */}
        <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-foreground transition-colors">Accueil</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
            <li aria-hidden>/</li>
            <li className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{post.title}</li>
          </ol>
        </nav>

        <ScrollReveal direction="up">
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/30 dark:text-indigo-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span aria-hidden>&middot;</span>
              <time dateTime={post.date}>{formattedDate}</time>
              <span aria-hidden>&middot;</span>
              <span>{post.readingTime}</span>
            </div>
          </header>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={60}>
          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline">
            <MDXRemote source={post.content} />
          </div>
        </ScrollReveal>

        <RelatedArticles posts={related} />

        {/* CTA */}
        <ScrollReveal direction="up" delay={80}>
          <div className="mt-16 rounded-3xl border border-indigo-100/70 bg-linear-to-r from-indigo-50/50 to-violet-50/30 p-8 text-center dark:border-indigo-900/20 dark:from-indigo-950/25 dark:to-violet-950/15">
            <h2 className="font-display font-bold text-xl tracking-tight">
              Besoin d&apos;aide pour mettre ça en place ?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Audit rapide de 15 min, gratuit, sans engagement.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Réserver l&apos;audit
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                &larr; Tous les articles
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </article>
    </main>
  );
}
