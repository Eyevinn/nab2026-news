import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type StoryFrontmatter = {
  title: string;
  slug: string;
  date: string;
  category: "floor" | "online";
  tags: string[];
  source_urls: string[];
  companies?: string[];
  excerpt: string;
  image?: string;
  image_alt?: string;
  image_credit?: string;
};

export type Story = StoryFrontmatter & {
  bodyHtml: string;
  bodyMarkdown: string;
};

const STORIES_DIR = path.join(process.cwd(), "content", "stories");

function readAll(): Story[] {
  if (!fs.existsSync(STORIES_DIR)) return [];
  const files = fs
    .readdirSync(STORIES_DIR)
    .filter((f) => f.endsWith(".md"));
  const stories: Story[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(STORIES_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const bodyHtml = marked.parse(content, { async: false }) as string;
    return {
      ...(data as StoryFrontmatter),
      bodyMarkdown: content,
      bodyHtml
    };
  });
  return stories.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllStories(): Story[] {
  return readAll();
}

export function getStoryBySlug(slug: string): Story | undefined {
  return readAll().find((s) => s.slug === slug);
}

export function getStoriesByTag(tag: string): Story[] {
  return readAll().filter((s) => s.tags?.includes(tag));
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const story of readAll()) {
    for (const tag of story.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getLastUpdatedISO(): string {
  const stories = readAll();
  return stories[0]?.date ?? new Date().toISOString();
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Los_Angeles",
    timeZoneName: "short"
  });
}
