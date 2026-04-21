---
title: "Paramount+ details shared Fire TV architecture for Paramount+ and Pluto TV"
slug: "paramount-plus-pluto-fire-tv-architecture"
date: "2026-04-21T15:40:00Z"
category: "floor"
tags: ["streaming", "cloud", "distribution", "production"]
source_urls:
  - "https://www.mediaplaynews.com/streaming-summit-returns-to-nab-april-20-21-with-eye-on-sports-bundling-ads-and-ai/"
companies: ["Paramount+"]
excerpt: "Paramount+ engineers explained how a single Amazon Fire TV codebase powers both Paramount+ SVOD and Pluto TV FAST in a Streaming Summit session."
---

Paramount+'s VP of Engineering Tom Schultz and Lead Software Engineer Cesar Mascarenhas presented a technical session at Tuesday's [Streaming Summit](https://www.mediaplaynews.com/streaming-summit-returns-to-nab-april-20-21-with-eye-on-sports-bundling-ads-and-ai/) covering the Amazon Fire TV app that serves both Paramount+ and Pluto TV from a single codebase. The session outlined the technical challenges the team encountered, the architectural decisions used to address them, and the case for deliberate refactoring as the platforms grew in concurrent scale.

Serving a premium subscription VOD service and a free ad-supported television platform from shared infrastructure creates specific engineering tensions: differing latency tolerances, distinct ad-serving requirements, separate entitlement systems, and divergent UX performance expectations. The Paramount+ team addressed how they resolved those tensions through architectural consolidation rather than maintaining parallel codebases — a trade-off that reduces maintenance overhead but requires careful interface design between service layers.

The dual-service approach is a consolidation model that other streaming operators managing both an SVOD and a FAST product may follow. As FAST channel proliferation continues and cost pressure on streaming operations grows, running both tiers from a shared application layer on major CTV platforms represents a viable path to reducing engineering overhead without sacrificing product differentiation.
