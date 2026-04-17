---
name: news-cycle
description: The hourly news gathering + publishing workflow for the NAB 2026 site. Run as editor-in-chief.
---

# News Cycle

One complete run of the NAB 2026 news pipeline: research → write → publish. Designed for hourly execution during show days (April 18–22, 2026) by the editor-in-chief.

## Preconditions

- You are running as the `editor-in-chief` agent (or the main session acting as orchestrator).
- Working directory is the repo root (`CLAUDE.md` and `content/stories/` visible).
- Git remote is set and you can push.

## Steps

### 1. Plan (1 min)

Create a TodoWrite list:
- [ ] Spawn 3 scouts in parallel (floor / summit / online)
- [ ] Wait for all findings files
- [ ] Spawn content-editor with findings paths
- [ ] Spawn seo-aeo-expert to validate new stories' metadata
- [ ] Spawn site-publisher
- [ ] Call restart-my-app on `nab2026news` (only if a commit was pushed)

### 2. Scout (parallel — single message with 3 Agent calls)

```
Agent(news-scout, beat=floor, timestamp=...)
Agent(news-scout, beat=summit, timestamp=...)
Agent(news-scout, beat=online, timestamp=...)
```

Each scout writes to `/tmp/nab-findings-{beat}-{timestamp}.md`. Share the SAME timestamp across all three so paths are predictable.

**Prompt template for each scout** (inline these instructions, don't reference files):

> You are the news-scout for beat `{beat}`. Today is {YYYY-MM-DD}, day {N} of NAB Show 2026 (April 18–22, Las Vegas).
>
> For beat `floor`: focus on official announcements, vendor press releases, on-site product launches, booth news, partnerships. Primary sources: nabshow.com, nab.org, vendor newsrooms, TVTechnology, NewscastStudio, StreamingMedia, BroadcastingCable.
>
> For beat `summit`: focus on NAB Show Streaming Summit (April 20–21, West Hall) and the new Sports Summit ("Future of Sports Rights and Fan Engagement"). Speaker quotes, panel takeaways, session highlights.
>
> For beat `online`: focus on analyst commentary, blog posts, and trending topics on #NABShow. Sources: Devoncroft, nScreenMedia, Dan Rayburn, LightReading, Variety tech coverage, Streaming Media Blog.
>
> Use WebSearch + WebFetch. Aim for 6–15 findings. Write to `/tmp/nab-findings-{beat}-{timestamp}.md` with the format in your agent definition. Every finding MUST have a source URL. Do not invent quotes or specs.
>
> When done, print: `WROTE: /tmp/nab-findings-{beat}-{timestamp}.md ({N} findings)`.

Wait for all three to complete. Verify: `ls -la /tmp/nab-findings-*-{timestamp}.md` shows 3 files.

### 3. Edit (serial)

Spawn `content-editor` with INLINED context:

> You are the content-editor. Today is {YYYY-MM-DD}.
>
> Read these findings files:
> - /tmp/nab-findings-floor-{timestamp}.md
> - /tmp/nab-findings-summit-{timestamp}.md
> - /tmp/nab-findings-online-{timestamp}.md
>
> Existing stories live under `content/stories/`. Glob + read the last 20 to dedupe.
>
> Write 3–8 new stories to `content/stories/YYYY-MM-DD-{slug}.md`. Use the frontmatter format and editorial rules in your agent definition. Every story must have at least one source URL. 150–300 word body.
>
> Report: slugs written, duplicates skipped, rejections.

Wait for completion. Verify: `git status content/stories/` shows new files.

### 4. Validate SEO/AEO (serial — quick pass)

Spawn `seo-aeo-expert`:

> You are the seo-aeo-expert. The content-editor just wrote these story files:
> - content/stories/2026-04-18-slug-1.md
> - content/stories/2026-04-18-slug-2.md
> - ...
>
> Validate Tier-1 signals on the new stories only (this is a per-cycle run, not a full site audit):
> 1. Every story has a complete-sentence `excerpt` under 160 chars (not ending in "...").
> 2. Every story has at least one `source_urls` entry.
> 3. Every story headline is under 80 chars (NewsArticle-friendly).
> 4. If an image is set, `image_alt` is also set.
> 5. Tags are from the allowlist (see content-editor.md).
>
> Run `npm run build` to confirm nothing breaks type-checks. If any per-story fix is frontmatter-only (alt text, headline clamp, sentence completion of excerpt), apply it directly. If rewriting prose is needed, flag it back to me and I'll ask the content-editor to fix.
>
> Report per your agent definition's format. Do not commit.

Wait for the report. If it flags structural issues (not simple frontmatter fixes), decide whether to re-spawn content-editor with guidance or to proceed.

### 5. Publish (serial)

Spawn `site-publisher`:

> You are the site-publisher. The content-editor + seo-aeo-expert have prepared new stories under `content/stories/`.
>
> Run `npm run build` to verify. If it fails, stop and report. Otherwise `git add content/ && git commit -m "..." && git push origin main`. Use the commit message format in your agent definition.
>
> Report commit SHA, file count, and site URL. Do NOT trigger the OSC rebuild — I will.

### 6. Trigger OSC rebuild (editor-in-chief, not a subagent)

A git push does NOT auto-rebuild the OSC app. After the publisher reports a successful push, you must explicitly call the OSC MCP tool:

- `mcp__osc__restart-my-app` with `appId: "nab2026news"` (use `rebuild: false` — code-only changes reuse build cache)

If the MCP tool is unavailable, fall back to:

```
curl -X POST -H "Authorization: Bearer $OSC_ACCESS_TOKEN" \
  https://api.prod.osaas.io/mcp/restart-my-app \
  -d '{"appId":"nab2026news"}'
```

Verify the call returned success. You do NOT wait for the rebuild — it completes in 2–5 minutes in the background.

**Skip this step if no commit was created (no new news).**

### 7. Report

Summarize to the user (or agent-task log):

```
NAB NEWS CYCLE — {timestamp}
Stories added: {N}
- {slug1}
- {slug2}
...
Commit: {sha}
OSC rebuild: triggered
Site: https://nab2026.apps.osaas.io
Next run: {next cron fire time}
```

## Guardrails

- **No fake stories**: If all three scouts return empty findings, report "no new news this hour" and exit without a commit.
- **No broken deploys**: If the build fails, stop before commit. The editor should fix or the cycle should no-op.
- **Parallelism discipline**: The three scouts MUST run in one message with three Agent calls. Sequential scouts waste an hour per run.
- **Timestamp discipline**: Use one shared timestamp (ISO 8601, UTC) across all three scout paths so the editor can find them.
