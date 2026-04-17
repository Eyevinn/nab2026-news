# NAB 2026 Live

Twice-daily news aggregator for [NAB Show 2026](https://www.nabshow.com/) (Las Vegas, April 18–22, 2026). For people who couldn't make it to Vegas.

**Live site:** https://nab2026.apps.osaas.io

## How it works

This repo contains both the Next.js site AND the Claude Code agent team that manages it:

- `app/` — Next.js 15 App Router, static-generated
- `content/stories/*.md` — one file per story, frontmatter + markdown body
- `content/brief.md` — editorial synopsis rewritten every cycle
- `.claude/agents/` — five agent definitions: `editor-in-chief`, `news-scout`, `content-editor`, `seo-aeo-expert`, `site-publisher`
- `.claude/skills/news-cycle.md` — the twice-daily workflow

An **OSC Agent Task** clones this repo twice daily during show days (15:00 and 23:00 UTC, April 18–22), runs the editor-in-chief, which spawns specialists to gather news, write stories, validate SEO/AEO signals, and push back. The editor-in-chief then explicitly triggers an OSC rebuild so the new stories appear on the live site (a plain `git push` alone does not rebuild OSC apps).

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Trigger a news cycle manually

From the repo root:

```bash
claude
> Run the news cycle as editor-in-chief.
```

## Deploy

Deployed on [Open Source Cloud](https://www.osaas.io) as a `nodejs` app mapped to the managed domain `nab2026.apps.osaas.io`. See [`CLAUDE.md`](CLAUDE.md) for the full team handbook and deployment notes.

## Architecture

```
OSC Agent Task (twice daily: 15:00 + 23:00 UTC, Apr 18–22)
      │
      ▼
editor-in-chief  ──parallel──▶  news-scout × 3 (floor / summit / online)
      │                              │
      │                              ▼
      │                     /tmp/nab-findings-*.md
      │                              │
      ▼                              │
content-editor  ◀───────────────────┘
      │
      │  writes content/stories/*.md + rewrites content/brief.md
      ▼
seo-aeo-expert
      │
      │  validates JSON-LD, canonical, excerpt shape, alt text
      ▼
site-publisher
      │
      │  npm run build → git add content/ → git commit → git push
      ▼
editor-in-chief calls mcp__osc__restart-my-app
      │
      ▼
OSC rebuilds Next.js  →  live on https://nab2026.apps.osaas.io
```

Every story links to its primary source. Nothing is invented.

## SEO / AEO

The site is built to be cited by AI search engines (Google AI Overviews, Perplexity, ChatGPT search, Claude, Gemini). See [`.claude/agents/seo-aeo-expert.md`](.claude/agents/seo-aeo-expert.md) for the full playbook. Highlights:

- `NewsArticle` + `BreadcrumbList` JSON-LD on every story
- `Organization` + `WebSite` schema in the root layout
- `ItemList` + `CollectionPage` on home / topic / category pages
- `robots` meta with `max-snippet: -1` + `max-image-preview: large`
- `og:image`, `twitter:card=summary_large_image`, canonical URLs
- `sitemap.xml`, `robots.txt` (explicitly allowing GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.), `feed.xml` (RSS)
- Honest AI-authorship disclosure at [`/about`](https://nab2026.apps.osaas.io/about)

## License

MIT. Content on this site is original summarization with attribution to primary sources.
