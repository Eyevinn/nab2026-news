import type { Metadata } from "next";
import Link from "next/link";
import { EventBanner, PromoFooter } from "./promos";
import { LastUpdated } from "./LastUpdated";
import { getLastUpdatedISO } from "@/lib/stories";
import {
  jsonLdScript,
  organizationJsonLd,
  websiteJsonLd
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nab2026.apps.osaas.io"),
  title: "NAB 2026 Live — what the broadcast industry is talking about",
  description:
    "Twice-daily news aggregator for NAB Show 2026 in Las Vegas. Floor announcements, summit coverage, and industry commentary for people who can't attend.",
  icons: {
    icon: "/favicon.svg"
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },
  alternates: {
    canonical: "https://nab2026.apps.osaas.io",
    types: {
      "application/rss+xml": [
        { url: "https://nab2026.apps.osaas.io/feed.xml", title: "NAB 2026 Live RSS" }
      ]
    }
  },
  openGraph: {
    title: "NAB 2026 Live",
    description:
      "What the broadcast industry is talking about on the NAB Show floor and online — refreshed twice a day.",
    type: "website",
    url: "https://nab2026.apps.osaas.io",
    siteName: "NAB 2026 Live",
    locale: "en_US"
  },
  twitter: {
    card: "summary",
    title: "NAB 2026 Live",
    description:
      "What the broadcast industry is talking about at NAB Show 2026 — refreshed twice a day."
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const lastUpdatedISO = getLastUpdatedISO();
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript([organizationJsonLd(), websiteJsonLd()])
          }}
        />
      </head>
      <body>
        <div className="event-strip-wrap">
          <div className="container">
            <EventBanner placement="top" />
          </div>
        </div>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand">
              <span className="brand-mark">NAB</span>
              <span className="brand-year">2026</span>
              <span className="brand-tag">LIVE</span>
            </Link>
            <nav className="site-nav">
              <Link href="/?cat=floor">Floor</Link>
              <Link href="/?cat=online">Online</Link>
              <Link href="/topic/ai">AI</Link>
              <Link href="/topic/streaming">Streaming</Link>
              <Link href="/topic/sports">Sports</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <div className="container">
          <PromoFooter placement="layout" />
        </div>
        <footer className="site-footer">
          <div className="container">
            <p>
              NAB Show 2026 · Las Vegas · April 18–22 ·{" "}
              <a href="https://www.nabshow.com/" rel="noreferrer">
                nabshow.com
              </a>
            </p>
            <p className="muted">
              <Link href="/about">How this brief is made</Link> ·{" "}
              <Link href="/feed.xml">RSS</Link> ·{" "}
              <a
                href="https://github.com/Eyevinn/nab2026-news"
                rel="noreferrer"
              >
                Source on GitHub
              </a>
            </p>
            <p className="muted">
              Last updated <LastUpdated iso={lastUpdatedISO} />
            </p>
            <p className="muted">
              Twice-daily aggregation by a Claude Code agent team running on{" "}
              <a
                href="https://www.osaas.io/?utm_source=nab2026&utm_medium=referral&utm_campaign=nab2026-news&utm_content=footer-credit"
                rel="noreferrer"
              >
                Open Source Cloud
              </a>
              . Every story links to its primary source.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
