import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  formatDate,
  getAllTags,
  getStoriesByTag
} from "@/lib/stories";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.tag }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag} — NAB 2026 Live`,
    description: `All NAB Show 2026 stories tagged "${tag}".`
  };
}

export default async function TopicPage({
  params
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const stories = getStoriesByTag(tag);
  if (stories.length === 0) notFound();

  return (
    <>
      <section className="hero">
        <div className="kicker">Topic</div>
        <h1>#{tag}</h1>
        <p>
          {stories.length} stor{stories.length === 1 ? "y" : "ies"} from NAB
          Show 2026.
        </p>
      </section>
      <section className="story-list">
        {stories.map((s) => (
          <Link key={s.slug} href={`/story/${s.slug}`} className="story-card">
            <div className="story-meta">
              <span className={`badge badge-${s.category}`}>{s.category}</span>
              <span>{formatDate(s.date)}</span>
            </div>
            <h2>{s.title}</h2>
            <p>{s.excerpt}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
