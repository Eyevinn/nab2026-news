const descriptions: Record<string, string> = {
  production:
    "Coverage of live and studio production technology at NAB Show 2026 — including broadcast switchers, routing frames, robotic cameras, and IP-based production workflows. Vendors and engineers are converging on software-defined production, making flexible, cloud-hybrid live production the dominant theme on the NAB floor this year.",

  broadcast:
    "Traditional and next-generation broadcast infrastructure news from NAB Show 2026. Stories span transmission, encoding, signal routing, and the shift from SDI to IP. Broadcasters are navigating tighter budgets while accelerating technology transitions, and NAB 2026 shows the industry at that inflection point.",

  ai:
    "Artificial-intelligence announcements and case studies from NAB Show 2026. Vendors are shipping agentic AI into newsrooms, highlight-clip pipelines, quality-control tools, and ad-targeting engines. This track covers both the vendor product launches and the analyst commentary on where AI is creating real ROI versus hype.",

  cloud:
    "Cloud infrastructure and SaaS platform news from NAB Show 2026. Stories cover multi-cloud media workflows, cloud-native encoding, storage costs, and the migration from on-premises hardware. AWS, Google Cloud, and Microsoft Azure all have a significant presence on the floor and in the Streaming Summit agenda.",

  streaming:
    "Streaming technology and strategy news from NAB Show 2026 and the co-located Streaming Summit (April 20–21). Topics include OTT delivery, adaptive bitrate encoding, latency reduction, monetization models, and the ongoing fragmentation of sports-rights distribution across linear, SVOD, and sportsbook platforms.",

  "ip-video":
    "IP video infrastructure and SMPTE ST 2110 ecosystem news from NAB Show 2026. The industry has largely committed to IP for live production; stories here cover the practical realities of that transition — interoperability, timing, security, and the newest IP-native hardware from vendors like Grass Valley, Evertz, and Ross Video.",

  sports:
    "Sports production and rights-distribution stories from NAB Show 2026 and the Sports Summit (April 19–22). Coverage spans stadium technology, remote production, AI-generated highlights, and the business of multi-platform sports rights. The Sports Summit brings leagues, rights-holders, and technology vendors together in the West Hall.",

  distribution:
    "Content distribution, affiliate, and playout technology news from NAB Show 2026. Covers CDN strategy, satellite-to-IP migration, affiliate signal delivery, and the tools that move content from production to audience at scale — with a focus on cost efficiency and reliability under live-event conditions.",

  codec:
    "Video codec and compression technology news from NAB Show 2026. Stories track AV1 mainstream adoption, hardware encoder launches, AI-driven perceptual encoding, and the competitive landscape between open and proprietary codecs as the industry pushes for higher quality at lower bitrates.",

  audio:
    "Audio technology news from NAB Show 2026 — covering wireless microphone systems, immersive audio formats, broadcast mixing consoles, and IP audio infrastructure. Audio workflows are undergoing their own IP transition, with Dante, AES67, and ST 2110-30 increasingly displacing traditional analog and AES3 routing.",

  advertising:
    "Advertising technology and monetization news from NAB Show 2026. Stories cover programmatic ad insertion, FAST channel economics, addressable advertising on broadcast and streaming platforms, and AI tools that help publishers and agencies measure and optimize ad performance across fragmented viewing environments.",

  post:
    "Post-production and media asset management news from NAB Show 2026. Covers cloud-based editing workflows, AI-assisted color and audio finishing, collaborative remote post tools, and the integration of generative AI into finishing pipelines.",

  "5g":
    "5G wireless newsgathering and live-production news from NAB Show 2026. Bonded cellular transmitters, private 5G networks for venues, and low-latency contribution over public 5G are among the themes. Vendors including LiveU and Haivision are shipping hardware designed specifically for 5G-first field production.",

  playout:
    "Playout automation and channel-in-a-box technology news from NAB Show 2026. Covers software-defined playout, cloud-native channel origination, and the transition from dedicated hardware playout servers to virtualised and SaaS-delivered broadcast channels.",

  atsc3:
    "ATSC 3.0 (NextGen TV) deployment and regulatory news from NAB Show 2026. Stories cover the FCC transition timeline, broadcaster adoption rates, interactive and datacasting use cases, and the global rollout of the standard — including progress in Brazil and other international markets.",

  "virtual-studio":
    "Virtual production and LED-volume studio technology news from NAB Show 2026. Covers real-time rendering engines, camera tracking, XR integration, and the growing use of virtual sets in both scripted and live broadcast production.",

  "live-sports":
    "Live sports production and coverage technology from NAB Show 2026 and the Sports Summit. Includes remote production (REMI) workflows, graphics and AR overlays, replay systems, and the tools that make it possible to produce dozens of simultaneous live sports events from centralised facilities.",

  camera:
    "Camera and lens technology news from NAB Show 2026. Stories cover cinema cameras, broadcast PTZ systems, and optics designed for live sports, news, and studio production. Announcements span sensors, form factors, and the growing integration of IP connectivity and AI-assisted focusing.",

  cameras:
    "Camera and lens technology news from NAB Show 2026, including cinema cameras, broadcast PTZ systems, and new optics for live production. Manufacturers are integrating IP control and AI features directly into camera bodies.",

  immersive:
    "Immersive media technology news from NAB Show 2026, including spatial audio, 360-degree video, VR/AR production tools, and the emerging standards for immersive content delivery. Blackmagic Design and others are shipping hardware aimed at immersive workflows.",

  storage:
    "Media storage and archive technology news from NAB Show 2026. Covers NAS, SAN, object storage, and cloud-tier archive strategies for high-resolution media. Stories track the cost-per-terabyte economics and the workflows that move hot, warm, and cold content between tiers.",

  captioning:
    "Closed-captioning and accessibility technology news from NAB Show 2026. Covers AI-driven automatic speech recognition for live captioning, compliance with FCC and international accessibility rules, and tools that help broadcasters meet accuracy requirements across multiple languages.",

  monetization:
    "Streaming monetization and revenue strategy news from NAB Show 2026. Stories examine subscription versus advertising-supported models, FAST channel economics, dynamic ad insertion, and the data tools that help publishers understand and grow revenue across fragmented audiences.",

  analyst:
    "Industry-analyst commentary and research findings from NAB Show 2026. Covers independent perspectives on technology adoption, market trends, and the business dynamics shaping broadcast and streaming — including views from Devoncroft Partners and other research firms active at the show.",

  hdr:
    "High dynamic range and wide color gamut technology news from NAB Show 2026. Stories cover HDR format adoption — including Dolby Vision, HDR10, and HLG — across broadcast, streaming, and cinema workflows, as well as the tools and standards that help producers deliver premium picture quality to consumer devices."
};

export function getTopicDescription(tag: string): string | undefined {
  return descriptions[tag];
}
