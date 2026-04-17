import { topicStyle } from "@/lib/visuals";

type StoryArtProps = {
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
  tags?: string[];
  variant?: "card" | "hero";
};

export function StoryArt({
  image,
  imageAlt,
  imageCredit,
  tags,
  variant = "card"
}: StoryArtProps) {
  if (image) {
    const height = variant === "hero" ? 360 : 180;
    return (
      <figure
        className={`story-art story-art-${variant}`}
        style={{ maxHeight: height }}
      >
        <img
          src={image}
          alt={imageAlt ?? ""}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {variant === "hero" && imageCredit ? (
          <figcaption className="story-art-credit">{imageCredit}</figcaption>
        ) : null}
      </figure>
    );
  }
  return <TopicArt tags={tags} variant={variant} />;
}

type Props = { tags?: string[]; variant?: "card" | "hero" };

export function TopicArt({ tags, variant = "card" }: Props) {
  const s = topicStyle(tags);
  const height = variant === "hero" ? 140 : 70;
  const gradId = `grad-${s.from.replace("#", "")}-${s.to.replace("#", "")}`;
  const patternId = `pat-${s.from.replace("#", "")}`;

  return (
    <div
      className={`topic-art topic-art-${variant}`}
      style={{ height }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 140"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={s.from} />
            <stop offset="100%" stopColor={s.to} />
          </linearGradient>
          <pattern
            id={patternId}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="4" cy="4" r="1.2" fill="#ffffff" opacity="0.18" />
          </pattern>
        </defs>
        <rect width="400" height="140" fill={`url(#${gradId})`} />
        <rect width="400" height="140" fill={`url(#${patternId})`} />
        <g
          transform={`translate(${variant === "hero" ? 320 : 330}, ${
            variant === "hero" ? 28 : 12
          }) scale(${variant === "hero" ? 2.4 : 1.6})`}
        >
          <path
            d={s.icon}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </g>
      </svg>
    </div>
  );
}

export function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg
        viewBox="0 0 1200 280"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hero-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a2234" />
            <stop offset="100%" stopColor="#0a0e1a" />
          </linearGradient>
          <linearGradient id="hero-accent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff3d5a" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2ec4ff" stopOpacity="0.7" />
          </linearGradient>
          <pattern
            id="hero-dots"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="#ffffff" opacity="0.08" />
          </pattern>
        </defs>
        <rect width="1200" height="280" fill="url(#hero-bg)" />
        <rect width="1200" height="280" fill="url(#hero-dots)" />
        {/* Broadcast-signal arcs on the right */}
        <g transform="translate(900, 140)" opacity="0.9">
          <circle cx="0" cy="0" r="28" fill="#ff3d5a" opacity="0.9" />
          <path d="M50 -35 A60 60 0 0 1 50 35" stroke="#ff3d5a" strokeWidth="3" fill="none" opacity="0.8" />
          <path d="M80 -55 A95 95 0 0 1 80 55" stroke="#a855f7" strokeWidth="3" fill="none" opacity="0.65" />
          <path d="M110 -80 A135 135 0 0 1 110 80" stroke="#2ec4ff" strokeWidth="3" fill="none" opacity="0.5" />
          <path d="M140 -105 A175 175 0 0 1 140 105" stroke="#2ec4ff" strokeWidth="3" fill="none" opacity="0.3" />
        </g>
        {/* Waveform on the left */}
        <g transform="translate(80, 200)" opacity="0.5">
          <path
            d="M0 0 L20 -30 L40 20 L60 -40 L80 10 L100 -25 L120 35 L140 -15 L160 20 L180 -30 L200 15 L220 -20 L240 25 L260 -35 L280 10"
            stroke="url(#hero-accent)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        {/* Scanlines across the full band */}
        <g opacity="0.15">
          {Array.from({ length: 14 }).map((_, i) => (
            <rect
              key={i}
              x="0"
              y={20 + i * 18}
              width="1200"
              height="1"
              fill="#ffffff"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
