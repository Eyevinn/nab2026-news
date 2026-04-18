---
title: "Wowza demos AI quality control and Media over QUIC with Cloudflare at NAB"
slug: "wowza-ai-workflows-media-over-quic"
date: "2026-04-18T19:46:00Z"
category: "floor"
tags: ["streaming", "ai", "cloud", "codec"]
source_urls:
  - "https://www.wowza.com/blog/wowza-demos-ai-workflows-at-nab-show-2026"
  - "https://roastbrief.us/wowza-to-showcase-ai-powered-video-workflows-and-emerging-streaming-architectures-at-nab-show-2026/"
companies: ["Wowza Media Systems", "Cloudflare"]
excerpt: "Wowza shows automated QC and AI-driven ad insertion alongside a live MoQ demo with Cloudflare, running OBS output through CMAF over MoQT to Shaka Player at sub-second latency."
image: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1280,h_630/https://www.wowza.com/wp-content/uploads/NABPreview-BlogHeadernotext.v2-c.png"
image_alt: "Wowza AI workflows and MoQ demo at NAB Show 2026"
---

[Wowza is showing two distinct capability areas at NAB 2026](https://www.wowza.com/blog/wowza-demos-ai-workflows-at-nab-show-2026). The first is AI embedded in live stream production: automated quality control, content classification, and programmatic ad insertion supporting CSAI, SSAI, and SGAI. The demos position these as operational tools rather than roadmap features, running on active streams rather than recorded content.

The second demo is more architecturally forward-looking: a live preview of Media over QUIC (MoQ), built jointly with Cloudflare. The signal path runs from OBS through a Wowza origin server and a Cloudflare relay to Shaka Player, using CMAF over the MoQT protocol in CMSF format. The target is sub-second end-to-end latency on a standards-based path that does not require custom proprietary last-mile protocols.

MoQ is still an IETF work-in-progress, which makes Wowza and Cloudflare's live demonstration at a major industry show significant as an indication of where last-mile streaming protocols are heading once the standard reaches finalization. For streaming operators watching CDN cost and latency trade-offs, a standards-based sub-second path over existing HTTP infrastructure represents a meaningful alternative to proprietary low-latency delivery.
