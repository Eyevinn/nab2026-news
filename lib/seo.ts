import type { Story } from "./stories";

export const SITE_URL = "https://nab2026.apps.osaas.io";
export const SITE_NAME = "NAB 2026 Live";
export const SITE_DESCRIPTION =
  "Twice-daily news aggregator for NAB Show 2026 in Las Vegas — floor announcements, summit coverage, and industry commentary for people who can't attend.";
export const PUBLISHER_LOGO = `${SITE_URL}/logo.png`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: PUBLISHER_LOGO,
      width: 600,
      height: 60
    },
    description: SITE_DESCRIPTION
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en"
  };
}

export function breadcrumbJsonLd(trail: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.url
    }))
  };
}

export function newsArticleJsonLd(story: Story) {
  const url = `${SITE_URL}/story/${story.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    headline: story.title,
    description: story.excerpt,
    image: story.image ? [{ "@type": "ImageObject", url: story.image }] : undefined,
    datePublished: story.date,
    dateModified: story.date,
    articleSection: story.category === "floor" ? "Floor" : "Online",
    keywords: story.tags?.join(", "),
    inLanguage: "en",
    isAccessibleForFree: true,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Organization",
      name: `${SITE_NAME} newsroom`,
      url: `${SITE_URL}/about`
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    citation: story.source_urls?.map((u) => ({ "@type": "CreativeWork", url: u }))
  };
}

export function itemListJsonLd(stories: Story[], pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: pageUrl,
    numberOfItems: stories.length,
    itemListElement: stories.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/story/${s.slug}`,
      name: s.title
    }))
  };
}

export function collectionPageJsonLd({
  url,
  name,
  description
}: {
  url: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` }
  };
}

export function jsonLdScript(data: unknown | unknown[]): string {
  const payload = Array.isArray(data) ? data : [data];
  return JSON.stringify(payload);
}

export const RSS_ALTERNATE_TYPES = {
  types: {
    "application/rss+xml": [
      { url: `${SITE_URL}/feed.xml`, title: "NAB 2026 Live RSS" }
    ]
  }
};
