import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIRS: Record<string, string> = {
  fr: path.join(process.cwd(), "content/blog"),
  pt: path.join(process.cwd(), "content/blog/pt"),
};

const READING_TIME_LABEL: Record<string, string> = {
  fr: "de lecture",
  pt: "de leitura",
};

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  readingTime: string;
  content: string;
}

export function getAllPosts(locale: string = "fr"): BlogPost[] {
  const dir = BLOG_DIRS[locale] ?? BLOG_DIRS.fr;
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title ?? "",
        description: data.description ?? "",
        date: data.date ?? "",
        tags: data.tags ?? [],
        author: data.author ?? "WCT Systems",
        readingTime: stats.text.replace("read", READING_TIME_LABEL[locale] ?? READING_TIME_LABEL.fr),
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string, locale: string = "fr"): BlogPost | undefined {
  const dir = BLOG_DIRS[locale] ?? BLOG_DIRS.fr;
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    author: data.author ?? "WCT Systems",
    readingTime: stats.text.replace("read", READING_TIME_LABEL[locale] ?? READING_TIME_LABEL.fr),
    content,
  };
}
