# NAB 2026 News Site — Team Handbook

An autonomous news aggregator for the [NAB Show 2026](https://www.nabshow.com/) in Las Vegas (April 18–22, 2026). Managed by a Claude Code agent team, deployed on [Open Source Cloud](https://www.osaas.io) (OSC), refreshed hourly by an OSC Agent Task.

## Purpose

Readers cannot attend NAB in person. They want a curated, neutral, industry-aware feed of:

- **Floor news**: Official NAB announcements, vendor product launches, partnerships
- **Summit coverage**: Streaming Summit (Apr 20–21) and Sports Summit
- **Online buzz**: Analyst commentary and trending topics

## Team

Five agents in `.claude/agents/`:

| Agent | Role |
|---|---|
| `editor-in-chief` | Orchestrator — runs the news cycle, delegates, reports, triggers OSC rebuild |
| `news-scout` | Researches press releases + industry commentary via web search |
| `content-editor` | Curates findings into published stories + rewrites `content/brief.md` |
| `seo-aeo-expert` | Validates JSON-LD, metadata, and AEO signals per cycle; runs weekly audits |
| `site-publisher` | Builds, commits, pushes |

The editor-in-chief spawns **three scouts in parallel** (one message, three Agent calls), then the content-editor, then the seo-aeo-expert, then the publisher, then explicitly calls `mcp__osc__restart-my-app` to rebuild the OSC app. See `.claude/skills/news-cycle.md` for the exact workflow.

## Architecture

Single git repo ([Eyevinn/nab2026-news](https://github.com/Eyevinn/nab2026-news)) containing both the agent team AND the Next.js site. OSC Agent Task clones this repo hourly, runs the editor-in-chief, commits new `content/stories/*.md` files, pushes. OSC auto-rebuilds the Next.js app from the push.

```
nab2026-news/
├── CLAUDE.md              (this file)
├── .claude/
│   ├── agents/            (4 agent definitions)
│   ├── skills/news-cycle.md
│   └── settings.json
├── app/                   (Next.js 15 App Router pages)
├── lib/stories.ts         (markdown parser)
├── content/stories/*.md   (one file per story)
├── public/
├── package.json
└── next.config.mjs        (output: "standalone")
```

## Tech Stack

- **Next.js 15** App Router, static generation
- **gray-matter** for frontmatter, **marked** for body rendering
- **Node 20+**, TypeScript
- `output: "standalone"` so OSC runs `node server.js` on `process.env.PORT=8080`
- No CSS framework — a single `globals.css` with CSS variables (dark broadcast-industry palette)

## Story File Format

One file per story at `content/stories/YYYY-MM-DD-{slug}.md`:

```markdown
---
title: "Active-voice headline under 80 chars"
slug: "lowercase-kebab-slug"
date: "2026-04-18T14:30:00Z"
category: "floor"            # floor | online
tags: ["ai", "streaming"]    # 2-4 tags
source_urls:
  - "https://primary.source"
companies: ["Grass Valley"]
excerpt: "One-sentence summary under 160 chars."
---

{150-300 word body in 2-4 short paragraphs.}
```

Stories are sorted by `date` descending on the homepage. Topic pages filter by tag.

## Editorial Rules

- **Neutral tone**: No marketing adjectives ("revolutionary", "game-changing"). State facts.
- **Attribution required**: Every story links to at least one source; no source → do not publish.
- **No hallucination**: If the scout didn't find a number, don't invent one. If there's no verbatim quote, don't add one.
- **Audience-focused**: What happened, why it matters, where to read more.
- **Dedup**: Same company + same announcement = duplicate. Different angles on the same topic are OK.

## Running the News Cycle

**Manually** (from repo root):

```
claude
> Run the news cycle as editor-in-chief.
```

**Autonomously** (OSC Agent Task):

- Schedule: `0 14-23 18-22 4 *` (every hour during show days, approximate Las Vegas business hours in UTC)
- Model: `claude-sonnet-4-6`
- Max turns: 40
- Prompt: "Run the news-cycle skill as the editor-in-chief."

## Deployment

OSC app: `nab2026news` (type `nodejs`), live at `https://nab2026.apps.osaas.io`. Build and runtime:

- OSC clones the repo, runs `npm install`, runs `npm run build`, then `node .next/standalone/server.js`
- Next.js reads `process.env.PORT` (set to 8080 by OSC automatically)
- Static content in `content/stories/` is read at build time, so every rebuild regenerates the full site

Publishing flow:
1. Agent task runs twice daily → commits new stories → pushes to `main`
2. **Agent explicitly calls OSC `restart-my-app` on `nab2026news`** — a push alone does NOT trigger a rebuild
3. OSC rebuilds the container (~2–5 minutes) and the site updates

## Process Rules

- **One issue per file**: never edit multiple stories in the same commit without intent
- **Never push site code changes together with content changes** — split commits
- **Never delete old stories** — historical feed is part of the value
- **Every commit includes `Co-Authored-By: Claude <noreply@anthropic.com>`**
- **Build must pass before push** — the publisher runs `npm run build` first
- **Never `git add .` or `-A`** — only `git add content/` for content updates

## Show Schedule Reference

- **Conferences & Workshops**: April 18–22, 2026 (start one day before the exhibit hall)
- **Exhibit Hall / Show Floor**: April 19–22, 2026 (Sun 10–6, Mon–Tue 9–6, Wed 9–2)
- **Streaming Summit**: April 20–21, 2026 (West Hall)
- **Sports Summit**: April 19–22, 2026 (Sports Theater, West Hall)
- **Venue**: Las Vegas Convention Center
- **Time zone**: Pacific (UTC-7). Most press cadence peaks 9am–6pm PT.

### Day labelling (important for brief copy)

- **April 18**: pre-show / conferences + workshops only — floor is NOT open. Frame stories as "pre-show" or "curtain-raiser", never "on the floor".
- **April 19**: exhibit hall opens — this is the first floor day.
- **April 20–21**: peak floor + Streaming Summit.
- **April 22**: show closes at 2pm PT — early wrap-up coverage.

Agents writing the brief and story copy MUST respect this. Referring to April 18 news as "on the floor" is a factual error.

## Useful Links

- [NAB Show official](https://www.nabshow.com/las-vegas/)
- [Show floor hours](https://www.nabshow.com/las-vegas/show-floor/)
- [Streaming Summit](http://nabstreamingsummit.com/)
- [OSC platform](https://www.osaas.io)
- [OSC Agent Tasks docs](https://docs.osaas.io)
