import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  formatDate,
  getAllTags,
  getStoriesByTag
} from "@/lib/stories";
import { PromoSidebar } from "../../promos";
import { TopicArt } from "../../visuals";
import {
  SITE_URL,
  RSS_ALTERNATE_TYPES,
  breadcrumbJsonLd,
  collectionPageJsonLd,
  itemListJsonLd,
  jsonLdScript
} from "@/lib/seo";
import { getTopicDescription } from "@/lib/topicDescriptions";

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
  const url = `${SITE_URL}/topic/${tag}`;
  const topicDesc =
    getTopicDescription(tag) ??
    `All NAB Show 2026 stories tagged "${tag}".`;
  return {
    title: `#${tag} — NAB 2026 Live`,
    description: topicDesc,
    alternates: { canonical: url, ...RSS_ALTERNATE_TYPES },
    openGraph: {
      title: `#${tag} — NAB 2026 Live`,
      description: topicDesc,
      url,
      type: "website",
      siteName: "NAB 2026 Live",
      locale: "en_US"
    },
    twitter: {
      card: "summary",
      title: `#${tag} — NAB 2026 Live`,
      description: topicDesc
    }
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
  const url = `${SITE_URL}/topic/${tag}`;
  const topicDesc =
    getTopicDescription(tag) ??
    `All NAB Show 2026 stories tagged "${tag}".`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            collectionPageJsonLd({
              url,
              name: `#${tag} — NAB 2026 Live`,
              description: topicDesc
            }),
            itemListJsonLd(stories, url),
            breadcrumbJsonLd([
              { name: "Home", url: `${SITE_URL}/` },
              { name: `#${tag}`, url }
            ])
          ])
        }}
      />
      <section className="hero">
        <div className="kicker">Topic</div>
        <h1>#{tag}</h1>
        <p>{topicDesc}</p>
      </section>
      <div className="page-grid">
        <div className="page-main">
          <section className="story-list">
            {stories.map((s) => (
              <Link key={s.slug} href={`/story/${s.slug}`} className="story-card story-card-visual">
                <TopicArt tags={s.tags} variant="card" />
                <div className="story-card-body">
                  <div className="story-meta">
                    <span className={`badge badge-${s.category}`}>{s.category}</span>
                    <span>{formatDate(s.date)}</span>
                  </div>
                  <h2>{s.title}</h2>
                  <p>{s.excerpt}</p>
                </div>
              </Link>
            ))}
          </section>
        </div>
        <PromoSidebar placement="topic" />
      </div>
    </>
  );
}
