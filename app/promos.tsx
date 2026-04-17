import { PROMOS, UPCOMING_EVENT, withUtm } from "@/lib/promos";

export function EventBanner({ placement }: { placement: string }) {
  return (
    <a
      href={withUtm(UPCOMING_EVENT.url, `${placement}-banner`)}
      className="event-banner"
      rel="noreferrer"
      target="_blank"
    >
      <span className="event-banner-label">Next up</span>
      <span className="event-banner-name">{UPCOMING_EVENT.name}</span>
      <span className="event-banner-meta">
        {UPCOMING_EVENT.date} · {UPCOMING_EVENT.location}
      </span>
      <span className="event-banner-cta">Register →</span>
    </a>
  );
}

export function PromoSidebar({ placement }: { placement: string }) {
  const event = PROMOS.filter((p) => p.category === "event");
  const platforms = PROMOS.filter((p) => p.category === "platform");
  const tools = PROMOS.filter((p) => p.category === "tool");

  return (
    <aside className="promo-sidebar" aria-label="Sponsored — products and events for broadcasters">
      {event.length > 0 && (
        <div className="promo-card promo-card-event">
          <div className="promo-label">Upcoming event</div>
          {event.map((p) => (
            <a
              key={p.name}
              href={withUtm(p.url, `${placement}-event`)}
              className="promo-event-link"
              rel="noreferrer"
              target="_blank"
            >
              <span className="promo-hero-name">{p.name}</span>
              <span className="promo-hero-tag">{p.tagline}</span>
              <span className="promo-event-cta">Save your seat →</span>
            </a>
          ))}
        </div>
      )}
      <div className="promo-card promo-card-hero">
        <div className="promo-label">Made possible by</div>
        {platforms.map((p) => (
          <a
            key={p.name}
            href={withUtm(p.url, `${placement}-hero`)}
            className="promo-hero-link"
            rel="noreferrer"
            target="_blank"
          >
            <span className="promo-hero-name">{p.name}</span>
            <span className="promo-hero-tag">{p.tagline}</span>
          </a>
        ))}
      </div>
      <div className="promo-card">
        <div className="promo-label">Open-source tools for broadcasters</div>
        <ul className="promo-list">
          {tools.map((p) => (
            <li key={p.name}>
              <a
                href={withUtm(p.url, `${placement}-tools`)}
                rel="noreferrer"
                target="_blank"
              >
                <strong>{p.name}</strong>
                <span>{p.tagline}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function PromoFooter({ placement }: { placement: string }) {
  return (
    <section className="promo-footer" aria-label="Explore Open Source Cloud">
      <div className="promo-footer-head">
        <span className="promo-label">Explore the tools behind this site</span>
      </div>
      <div className="promo-footer-grid">
        {PROMOS.map((p) => (
          <a
            key={p.name}
            href={withUtm(p.url, `${placement}-footer`)}
            className={`promo-footer-link promo-footer-${p.category}`}
            rel="noreferrer"
            target="_blank"
          >
            <strong>{p.name}</strong>
            <span>{p.tagline}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
