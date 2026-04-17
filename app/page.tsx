import Link from "next/link";
import { getAllStories, formatDate } from "@/lib/stories";
import { getBrief } from "@/lib/brief";
import { PromoSidebar } from "./promos";
import { HeroArt, StoryArt } from "./visuals";

export const dynamic = "force-static";

export default async function Home({
  searchParams
}: {
  searchParams?: Promise<{ cat?: string }>;
}) {
  const all = getAllStories();
  const brief = getBrief();
  const params = (await searchParams) ?? {};
  const cat = params.cat;
  const stories =
    cat === "floor" || cat === "online"
      ? all.filter((s) => s.category === cat)
      : all;

  return (
    <>
      <section className="hero hero-with-art">
        <HeroArt />
        <div className="hero-inner">
          <div className="kicker">Las Vegas · April 18–22, 2026 · Live coverage</div>
          <h1>What the broadcast industry is talking about.</h1>
          <p>
            Floor announcements, summit highlights, and online buzz from NAB
            Show 2026 — refreshed twice a day by an AI newsroom. For those who
            couldn't make it to Vegas.
          </p>
        </div>
      </section>

      {brief && (
        <section className="brief">
          <div className="brief-head">
            <span className="brief-label">The brief</span>
            <span className="brief-date">{formatDate(brief.date)}</span>
          </div>
          <h2 className="brief-title">{brief.title}</h2>
          <div
            className="brief-body"
            dangerouslySetInnerHTML={{ __html: brief.bodyHtml }}
          />
        </section>
      )}

      <div className="page-grid">
        <div className="page-main">
          {stories.length === 0 ? (
            <div className="empty">
              <h2>Warming up the newsroom…</h2>
              <p>
                The first news cycle is about to run. Check back later today.
              </p>
            </div>
          ) : (
            <section className="story-list">
              {stories.map((s) => (
                <Link key={s.slug} href={`/story/${s.slug}`} className="story-card story-card-visual">
                  <StoryArt
                    image={s.image}
                    imageAlt={s.image_alt}
                    tags={s.tags}
                    variant="card"
                  />
                  <div className="story-card-body">
                    <div className="story-meta">
                      <span
                        className={`badge badge-${s.category}`}
                        title={s.category === "floor" ? "On the floor" : "Online buzz"}
                      >
                        {s.category}
                      </span>
                      <span>{formatDate(s.date)}</span>
                    </div>
                    <h2>{s.title}</h2>
                    <p>{s.excerpt}</p>
                    {s.tags?.length ? (
                      <div className="tags">
                        {s.tags.map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </section>
          )}
        </div>
        <PromoSidebar placement="home" />
      </div>
    </>
  );
}
