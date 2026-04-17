import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  formatDate,
  getAllStories,
  getStoryBySlug
} from "@/lib/stories";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllStories().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return { title: "Not found" };
  return {
    title: `${story.title} — NAB 2026 Live`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      type: "article",
      publishedTime: story.date
    }
  };
}

export default async function StoryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  return (
    <article className="story-detail">
      <Link href="/" className="back-link">
        ← All stories
      </Link>
      <div className="story-meta" style={{ marginTop: "1rem" }}>
        <span className={`badge badge-${story.category}`}>{story.category}</span>
        <span>{formatDate(story.date)}</span>
      </div>
      <h1>{story.title}</h1>
      <div
        className="story-body"
        dangerouslySetInnerHTML={{ __html: story.bodyHtml }}
      />
      {story.tags?.length ? (
        <div className="tags" style={{ marginTop: "1.5rem" }}>
          {story.tags.map((t) => (
            <Link key={t} href={`/topic/${t}`} className="tag">
              {t}
            </Link>
          ))}
        </div>
      ) : null}
      {story.source_urls?.length ? (
        <div className="sources">
          <h3>Sources</h3>
          <ul>
            {story.source_urls.map((url) => (
              <li key={url}>
                <a href={url} rel="noreferrer" target="_blank">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
