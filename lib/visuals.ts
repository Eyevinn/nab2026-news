export type TopicStyle = {
  from: string;
  to: string;
  icon: string;
};

const D: TopicStyle = {
  from: "#6366f1",
  to: "#8b5cf6",
  icon:
    "M12 2l1.8 4.8L18 8l-4.2 1.2L12 14l-1.8-4.8L6 8l4.2-1.2L12 2z"
};

export const TOPIC_STYLES: Record<string, TopicStyle> = {
  ai: {
    from: "#a855f7",
    to: "#ec4899",
    icon:
      "M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z"
  },
  streaming: {
    from: "#2ec4ff",
    to: "#6366f1",
    icon:
      "M4 12a8 8 0 0 1 16 0M7 12a5 5 0 0 1 10 0M12 12v.01"
  },
  cloud: {
    from: "#38bdf8",
    to: "#818cf8",
    icon:
      "M7 18a4 4 0 0 1-.88-7.9A5 5 0 0 1 16 9h.5a3.5 3.5 0 1 1 0 7H7z"
  },
  codec: {
    from: "#10b981",
    to: "#06b6d4",
    icon: "M3 12h2l2-6 4 12 4-12 2 6h4"
  },
  "ip-video": {
    from: "#22d3ee",
    to: "#0ea5e9",
    icon:
      "M3 7l9 5 9-5-9-5-9 5zm0 0v10l9 5 9-5V7"
  },
  production: {
    from: "#f59e0b",
    to: "#ef4444",
    icon:
      "M4 6h16v12H4zM4 10h16M8 6v4M16 6v4"
  },
  sports: {
    from: "#ef4444",
    to: "#f97316",
    icon:
      "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-6 6l12 8M6 16l12-8"
  },
  distribution: {
    from: "#0ea5e9",
    to: "#22c55e",
    icon: "M4 12h6M14 12h6M10 6l4 12M14 6l-4 12"
  },
  advertising: {
    from: "#f472b6",
    to: "#f97316",
    icon: "M3 11h4l8-5v12l-8-5H3zM17 9a3 3 0 0 1 0 6"
  },
  broadcast: {
    from: "#ef4444",
    to: "#8b5cf6",
    icon:
      "M5 12a7 7 0 0 1 14 0M8 12a4 4 0 0 1 8 0M12 12v8M10 20h4"
  },
  post: {
    from: "#a78bfa",
    to: "#34d399",
    icon: "M4 4h16v16H4zM4 9h16M9 9v11M4 14h5"
  },
  audio: {
    from: "#22c55e",
    to: "#06b6d4",
    icon: "M3 12h2l2-6 2 12 2-9 2 6 2-3 2 4h3"
  },
  captioning: {
    from: "#facc15",
    to: "#10b981",
    icon:
      "M4 6h16v12H4zM7 14h3M13 14h4M7 10h10"
  },
  "virtual-studio": {
    from: "#6366f1",
    to: "#22d3ee",
    icon: "M3 7h18v10H3zM3 12h18M12 7v10M7 20h10"
  },
  playout: {
    from: "#f43f5e",
    to: "#fbbf24",
    icon: "M8 5l12 7-12 7V5z"
  },
  storage: {
    from: "#64748b",
    to: "#0ea5e9",
    icon:
      "M4 6h16v4H4zM4 14h16v4H4zM6 8h.01M6 16h.01"
  },
  hdr: {
    from: "#fb923c",
    to: "#f43f5e",
    icon:
      "M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"
  },
  "5g": {
    from: "#8b5cf6",
    to: "#06b6d4",
    icon: "M6 18v-6M10 18V9M14 18V6M18 18v-9"
  },
  atsc3: {
    from: "#0ea5e9",
    to: "#8b5cf6",
    icon: "M5 12a7 7 0 0 1 14 0M12 12v8M9 20h6"
  },
  immersive: {
    from: "#8b5cf6",
    to: "#ec4899",
    icon:
      "M3 9a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-3l-3-3-3 3H6a3 3 0 0 1-3-3V9z"
  },
  camera: {
    from: "#64748b",
    to: "#f43f5e",
    icon: "M4 8h4l2-2h4l2 2h4v10H4zM12 17a3 3 0 0 1 0-6 3 3 0 0 1 0 6z"
  },
  live: {
    from: "#ef4444",
    to: "#fbbf24",
    icon: "M12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12zM12 3v3M12 18v3M3 12h3M18 12h3"
  },
  monetization: {
    from: "#facc15",
    to: "#10b981",
    icon:
      "M12 3v18M8 7h6a3 3 0 0 1 0 6H8m0 0h6a3 3 0 0 1 0 6H8"
  },
  analyst: {
    from: "#64748b",
    to: "#8b5cf6",
    icon: "M4 20h16M4 20V10M10 20V6M16 20v-8M22 20V4"
  }
};

export function topicStyle(tags: string[] | undefined): TopicStyle {
  if (!tags || tags.length === 0) return D;
  for (const t of tags) {
    const style = TOPIC_STYLES[t];
    if (style) return style;
  }
  return D;
}
