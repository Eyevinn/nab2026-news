import { getAllStories } from "@/lib/stories";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

export const dynamic = "force-static";

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const stories = getAllStories();
  const now = new Date().toUTCString();
  const items = stories
    .map((s) => {
      const url = `${SITE_URL}/story/${s.slug}`;
      const pubDate = new Date(s.date).toUTCString();
      const categories = (s.tags ?? [])
        .map((t) => `<category>${xmlEscape(t)}</category>`)
        .join("");
      const enclosure = s.image
        ? `<enclosure url="${xmlEscape(s.image)}" type="image/jpeg"/>`
        : "";
      return `
    <item>
      <title>${xmlEscape(s.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${xmlEscape(s.excerpt)}</description>
      ${categories}
      ${enclosure}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${xmlEscape(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <ttl>360</ttl>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=1800"
    }
  });
}
