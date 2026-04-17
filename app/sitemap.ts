import type { MetadataRoute } from "next";
import { getAllStories, getAllTags } from "@/lib/stories";

const SITE = "https://nab2026.apps.osaas.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const stories = getAllStories();
  const tags = getAllTags();

  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "hourly", priority: 1 },
    { url: `${SITE}/?cat=floor`, lastModified: now, changeFrequency: "hourly", priority: 0.8 },
    { url: `${SITE}/?cat=online`, lastModified: now, changeFrequency: "hourly", priority: 0.8 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    ...stories.map((s) => ({
      url: `${SITE}/story/${s.slug}`,
      lastModified: s.date,
      changeFrequency: "daily" as const,
      priority: 0.9
    })),
    ...tags.map((t) => ({
      url: `${SITE}/topic/${t.tag}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.6
    }))
  ];
}
