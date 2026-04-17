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
        viewBox="0 0 1200 320"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hero-glow-a" cx="85%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#ff3d5a" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#ff3d5a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hero-glow-b" cx="95%" cy="75%" r="45%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hero-glow-c" cx="20%" cy="90%" r="40%">
            <stop offset="0%" stopColor="#2ec4ff" stopOpacity="0.28" />
            <stop offset="70%" stopColor="#2ec4ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hero-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0c1324" />
            <stop offset="100%" stopColor="#060912" />
          </linearGradient>
        </defs>
        <rect width="1200" height="320" fill="url(#hero-bg)" />
        <rect width="1200" height="320" fill="url(#hero-glow-a)" />
        <rect width="1200" height="320" fill="url(#hero-glow-b)" />
        <rect width="1200" height="320" fill="url(#hero-glow-c)" />
        <line
          x1="0"
          y1="319"
          x2="1200"
          y2="319"
          stroke="#ff3d5a"
          strokeWidth="2"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}
