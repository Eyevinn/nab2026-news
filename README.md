# NAB 2026 Live

Hourly news aggregator for [NAB Show 2026](https://www.nabshow.com/) (Las Vegas, April 18–22, 2026). For people who couldn't make it to Vegas.

**Live site:** https://nab2026news.prod.osaas.io (once deployed)

## How it works

This repo contains both the Next.js site AND the Claude Code agent team that manages it:

- `app/` — Next.js 15 App Router, static-generated
- `content/stories/*.md` — one file per story, frontmatter + markdown body
- `.claude/agents/` — four agent definitions (editor-in-chief, news-scout, content-editor, site-publisher)
- `.claude/skills/news-cycle.md` — the hourly workflow

An **OSC Agent Task** clones this repo every hour during show days, runs the editor-in-chief, which spawns specialists to gather news, write stories, and push back. OSC auto-rebuilds the site on each push.

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

## Deploy (once)

Deployed on [Open Source Cloud](https://www.osaas.io) as a `nodejs` app. See `CLAUDE.md` for the full team handbook and deployment notes.

## Architecture

```
OSC Agent Task (hourly cron)
      │
      ▼
editor-in-chief  ──spawns parallel──▶  news-scout × 3  (floor / summit / online beats)
      │                                      │
      │                                      ▼
      │                              /tmp/nab-findings-*.md
      │                                      │
      ▼                                      │
content-editor  ◀───────────────────────────┘
      │
      ▼
content/stories/*.md  (committed)
      │
      ▼
site-publisher  ──▶  git push origin main  ──▶  OSC rebuilds Next.js
```

Every story links to its primary source. Nothing is invented.

## License

MIT. Content on this site is original summarization with attribution to primary sources.
