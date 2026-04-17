export type Promo = {
  name: string;
  tagline: string;
  url: string;
  category: "event" | "platform" | "tool" | "product";
};

export const UPCOMING_EVENT = {
  name: "Streaming Tech Sweden 2026",
  date: "May 21, 2026",
  location: "Stockholm",
  url: "https://www.streamingtech.se",
  tagline: "The Nordic industry gathering for streaming engineers."
};

const UTM = {
  utm_source: "nab2026",
  utm_medium: "referral",
  utm_campaign: "nab2026-news"
};

export function withUtm(url: string, content?: string): string {
  const u = new URL(url);
  for (const [k, v] of Object.entries(UTM)) u.searchParams.set(k, v);
  if (content) u.searchParams.set("utm_content", content);
  return u.toString();
}

export const PROMOS: Promo[] = [
  {
    name: "Streaming Tech Sweden 2026",
    tagline: "May 21, 2026 · Stockholm · Nordic streaming-engineer gathering.",
    url: "https://www.streamingtech.se",
    category: "event"
  },
  {
    name: "Open Source Cloud",
    tagline: "Managed open-source cloud for developers who want infrastructure, not DevOps.",
    url: "https://www.osaas.io",
    category: "platform"
  },
  {
    name: "Liivo",
    tagline: "Describe your app in plain English — Liivo's AI builds it and keeps it online.",
    url: "https://www.liivo.ai",
    category: "platform"
  },
  {
    name: "Auto Subtitles",
    tagline: "AI-generated subtitles, scored against Netflix, BBC and EBU broadcast standards.",
    url: "https://autosubs.apps.osaas.io",
    category: "tool"
  },
  {
    name: "Open Media Convert",
    tagline: "Open-source video transcoding and DASH/HLS packaging, built on SVT Encore.",
    url: "https://mediaconvert.apps.osaas.io",
    category: "tool"
  },
  {
    name: "Open Intercom",
    tagline: "Browser-based WebRTC intercom for production teams — 10–100× cheaper than hardware.",
    url: "https://intercom.apps.osaas.io",
    category: "tool"
  },
  {
    name: "Open Analytics",
    tagline: "AI-native video QoE analytics on the open EPAS standard — query with SQL or Claude.",
    url: "https://analytics.apps.osaas.io",
    category: "tool"
  }
];
