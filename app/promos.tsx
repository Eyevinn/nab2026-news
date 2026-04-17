import { PROMOS, withUtm } from "@/lib/promos";

export function PromoSidebar({ placement }: { placement: string }) {
  const platforms = PROMOS.filter((p) => p.category === "platform");
  const tools = PROMOS.filter((p) => p.category !== "platform");

  return (
    <aside className="promo-sidebar" aria-label="Sponsored — products for broadcasters">
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
            className="promo-footer-link"
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
