"use client";

import { useEffect, useState } from "react";

export function LastUpdated({ iso }: { iso: string }) {
  const [local, setLocal] = useState<string | null>(null);

  useEffect(() => {
    const d = new Date(iso);
    setLocal(
      d.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
      })
    );
  }, [iso]);

  return (
    <time dateTime={iso} suppressHydrationWarning>
      {local ?? new Date(iso).toISOString().replace("T", " ").slice(0, 16) + " UTC"}
    </time>
  );
}
