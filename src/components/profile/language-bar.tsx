import type { LanguageShare } from "@/lib/github/types";

export function LanguageBar({ languages }: { languages: LanguageShare[] }) {
  if (languages.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">No language data yet.</p>
    );
  }
  const top = languages.slice(0, 6);
  const rest = languages.slice(6);
  const restShare = rest.reduce((s, l) => s + l.share, 0);
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-muted flex h-2 overflow-hidden">
        {top.map((l) => (
          <span
            key={l.name}
            title={`${l.name} ${(l.share * 100).toFixed(0)}%`}
            style={{
              width: `${l.share * 100}%`,
              background: l.color ?? "var(--muted-foreground)",
            }}
          />
        ))}
        {restShare > 0 ? (
          <span
            style={{
              width: `${restShare * 100}%`,
              background: "var(--border-strong)",
            }}
          />
        ) : null}
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
        {top.map((l) => (
          <li key={l.name} className="flex items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-2">
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ background: l.color ?? "var(--muted-foreground)" }}
              />
              <span className="truncate">{l.name}</span>
            </span>
            <span className="tabular text-muted-foreground font-mono text-xs">
              {(l.share * 100).toFixed(0)}%
            </span>
          </li>
        ))}
        {rest.length > 0 ? (
          <li className="text-muted-foreground flex items-center justify-between gap-2">
            <span>+{rest.length} more</span>
            <span className="tabular font-mono text-xs">
              {(restShare * 100).toFixed(0)}%
            </span>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
