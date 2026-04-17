import Link from "next/link";
import { getAllStories, formatDate } from "@/lib/stories";
import { PromoSidebar } from "./promos";

export const dynamic = "force-static";

export default async function Home({
  searchParams
}: {
  searchParams?: Promise<{ cat?: string }>;
}) {
  const all = getAllStories();
  const params = (await searchParams) ?? {};
  const cat = params.cat;
  const stories =
    cat === "floor" || cat === "online"
      ? all.filter((s) => s.category === cat)
      : all;

  return (
    <>
      <section className="hero">
        <div className="kicker">Las Vegas · April 18–22, 2026 · Live coverage</div>
        <h1>What the broadcast industry is talking about.</h1>
        <p>
          Floor announcements, summit highlights, and online buzz from NAB Show
          2026 — refreshed hourly by an AI newsroom. For those who couldn't
          make it to Vegas.
        </p>
      </section>

      <div className="page-grid">
        <div className="page-main">
          {stories.length === 0 ? (
            <div className="empty">
              <h2>Warming up the newsroom…</h2>
              <p>
                The first news cycle is about to run. Check back in an hour, or
                follow the project on GitHub.
              </p>
            </div>
          ) : (
            <section className="story-list">
              {stories.map((s) => (
                <Link key={s.slug} href={`/story/${s.slug}`} className="story-card">
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
