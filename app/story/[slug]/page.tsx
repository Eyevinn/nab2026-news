import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  formatDate,
  getAllStories,
  getStoryBySlug
} from "@/lib/stories";
import { PromoSidebar } from "../../promos";
import { StoryArt } from "../../visuals";
import {
  SITE_URL,
  RSS_ALTERNATE_TYPES,
  breadcrumbJsonLd,
  jsonLdScript,
  newsArticleJsonLd
} from "@/lib/seo";

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
  const images = story.image
    ? [{ url: story.image, alt: story.image_alt ?? story.title }]
    : undefined;
  const url = `${SITE_URL}/story/${story.slug}`;
  return {
    title: `${story.title} — NAB 2026 Live`,
    description: story.excerpt,
    keywords: story.tags,
    alternates: { canonical: url, ...RSS_ALTERNATE_TYPES },
    openGraph: {
      title: story.title,
      description: story.excerpt,
      type: "article",
      publishedTime: story.date,
      modifiedTime: story.date,
      section: story.category === "floor" ? "Floor" : "Online",
      url,
      siteName: "NAB 2026 Live",
      locale: "en_US",
      images,
      tags: story.tags
    },
    twitter: {
      card: story.image ? "summary_large_image" : "summary",
      title: story.title,
      description: story.excerpt,
      images: story.image ? [story.image] : undefined
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
    <div className="page-grid">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            newsArticleJsonLd(story),
            breadcrumbJsonLd([
              { name: "Home", url: `${SITE_URL}/` },
              {
                name: story.category === "floor" ? "Floor" : "Online",
                url: `${SITE_URL}/?cat=${story.category}`
              },
              { name: story.title, url: `${SITE_URL}/story/${story.slug}` }
            ])
          ])
        }}
      />
      <article className="page-main story-detail">
        <Link href="/" className="back-link">
          ← All stories
        </Link>
        <StoryArt
          image={story.image}
          imageAlt={story.image_alt}
          imageCredit={story.image_credit}
          tags={story.tags}
          variant="hero"
        />
        <div className="story-meta" style={{ marginTop: "1.25rem" }}>
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
      <PromoSidebar placement="story" />
    </div>
  );
}
