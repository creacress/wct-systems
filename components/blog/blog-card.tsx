import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
}

export default function BlogCard({ slug, title, description, date, tags, readingTime }: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="h-full rounded-3xl border border-indigo-100/70 bg-background/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-200/80 dark:border-indigo-900/20 dark:bg-white/[0.04] dark:hover:border-indigo-800/30">
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:border-indigo-800/40 dark:bg-indigo-950/30 dark:text-indigo-400"
            >
              {tag}
            </span>
          ))}
          <span className="text-xs text-muted-foreground">{readingTime}</span>
        </div>

        <h3 className="mt-3 text-lg font-bold tracking-tight leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <time dateTime={date}>{formattedDate}</time>
          <span className="font-medium text-indigo-600 dark:text-indigo-400 group-hover:underline">
            Lire &rarr;
          </span>
        </div>
      </article>
    </Link>
  );
}
