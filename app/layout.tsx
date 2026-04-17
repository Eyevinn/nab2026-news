import type { Metadata } from "next";
import Link from "next/link";
import { PromoFooter } from "./promos";
import "./globals.css";

export const metadata: Metadata = {
  title: "NAB 2026 Live — what the broadcast industry is talking about",
  description:
    "Hourly news aggregator for NAB Show 2026 in Las Vegas. Floor announcements, summit coverage, and industry commentary for people who can't attend.",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "NAB 2026 Live",
    description:
      "What the broadcast industry is talking about on the NAB Show floor and online — refreshed hourly.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
              Hourly aggregation by a Claude Code agent team running on{" "}
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
