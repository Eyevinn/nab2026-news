import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, jsonLdScript, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How this brief is made — NAB 2026 Live",
  description:
    "NAB 2026 Live is an AI-newsroom aggregator. Here's how stories are sourced, written, edited, and published — and what guardrails are in place.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "How this brief is made — NAB 2026 Live",
    description:
      "NAB 2026 Live is an AI-newsroom aggregator. Here's how stories are sourced, written, edited, and published — and what guardrails are in place.",
    url: `${SITE_URL}/about`,
    type: "website",
    siteName: "NAB 2026 Live",
    locale: "en_US"
  },
  twitter: {
    card: "summary",
    title: "How this brief is made — NAB 2026 Live",
    description:
      "NAB 2026 Live is an AI-newsroom aggregator. Here's how stories are sourced, written, edited, and published — and what guardrails are in place."
  }
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbJsonLd([
              { name: "Home", url: `${SITE_URL}/` },
              { name: "About", url: `${SITE_URL}/about` }
            ])
          )
        }}
      />
      <section className="hero">
        <div className="kicker">About</div>
        <h1>How this brief is made.</h1>
        <p>
          NAB 2026 Live is an AI-driven aggregator of NAB Show 2026 news for
          people who can't be in Las Vegas. Editorial integrity is the core
          design goal — every story links to a primary source.
        </p>
      </section>
      <article className="story-detail" style={{ maxWidth: "42rem" }}>
        <h2>The newsroom</h2>
        <p>
          Four Claude Code agents run the site: an <strong>editor-in-chief</strong>{" "}
          orchestrates each cycle; a <strong>news-scout</strong> gathers findings
          from trade press, vendor announcements, and analyst commentary via web
          search; a <strong>content-editor</strong> curates, deduplicates, and
          writes 150–300 word summaries; a{" "}
          <strong>site-publisher</strong> builds and deploys the site. An{" "}
          <strong>SEO/AEO expert</strong> validates structured data and metadata.
        </p>

        <h2>How often it updates</h2>
        <p>
          Twice a day during NAB Show week (15:00 and 23:00 UTC on April 18–22,
          2026), a scheduled job on{" "}
          <a href="https://www.osaas.io" rel="noreferrer">
            Open Source Cloud
          </a>{" "}
          runs the cycle and commits new stories to the public{" "}
          <a
            href="https://github.com/Eyevinn/nab2026-news"
            rel="noreferrer"
            target="_blank"
          >
            GitHub repository
          </a>
          .
        </p>

        <h2>Editorial rules</h2>
        <ul>
          <li>Every story must link to at least one primary source.</li>
          <li>Quotes are only included when captured verbatim from a source.</li>
          <li>No specs, numbers, or product names are invented.</li>
          <li>
            Category labels: <strong>Floor</strong> = official announcements and
            press; <strong>Online</strong> = analyst commentary and trend pieces.
          </li>
          <li>
            Stories are neutral and industry-specific — marketing adjectives
            like "revolutionary" or "game-changing" are banned.
          </li>
        </ul>

        <h2>AI attribution</h2>
        <p>
          Stories are drafted by large-language-model agents and reviewed for
          factual correctness against their source URLs before publication.
          Articles carry a publisher byline (<em>NAB 2026 Live newsroom</em>)
          rather than a fictional human author. The source code — including all
          agent prompts and editorial rules — is public.
        </p>

        <h2>Syndication</h2>
        <p>
          Follow the site via{" "}
          <Link href="/feed.xml">RSS feed</Link>, or read individual stories on
          the homepage.
        </p>
      </article>
    </>
  );
}
