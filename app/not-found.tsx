import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero">
      <div className="kicker">404</div>
      <h1>Story not found.</h1>
      <p>
        <Link href="/">← Back to the feed</Link>
      </p>
    </section>
  );
}
