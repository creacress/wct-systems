import BlogCard from "./blog-card";
import type { BlogPost } from "@/lib/blog";

interface RelatedArticlesProps {
  posts: BlogPost[];
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section aria-label="Articles liés" className="mt-16">
      <h2 className="font-display font-bold text-xl tracking-tight mb-6">Articles sur le même sujet</h2>
      <div className="grid gap-4 sm:grid-cols-2">
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
  );
}
