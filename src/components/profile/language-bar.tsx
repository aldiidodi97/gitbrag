import type { LanguageShare } from "@/lib/github/types";

export function LanguageBar({ languages }: { languages: LanguageShare[] }) {
  if (languages.length === 0) return null;
  const top = languages.slice(0, 6);
  const rest = languages.slice(6);
  const restShare = rest.reduce((s, l) => s + l.share, 0);
  const color = (l: LanguageShare) =>
    l.color ?? "var(--color-muted-foreground)";
  return (
    <div className="border-border flex flex-col gap-3 border-b pb-6">
      <div className="bg-muted flex h-3 overflow-hidden rounded-full">
        {top.map((l) => (
          <span
            key={l.name}
            title={`${l.name} ${(l.share * 100).toFixed(0)}%`}
            style={{ width: `${l.share * 100}%`, background: color(l) }}
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
      <ul className="flex flex-wrap gap-2">
        {top.map((l) => (
          <li
            key={l.name}
            className="border-border bg-card inline-flex items-center gap-2 rounded-full border py-1 pr-3 pl-2 text-sm"
          >
            <span
              className="size-2.5 rounded-full"
              style={{ background: color(l) }}
            />
            {l.name}
            <span className="tabular text-muted-foreground font-mono text-xs">
              {(l.share * 100).toFixed(0)}%
            </span>
          </li>
        ))}
        {rest.length > 0 ? (
          <li className="text-muted-foreground inline-flex items-center py-1 pl-1 text-sm">
            +{rest.length} more · {(restShare * 100).toFixed(0)}%
          </li>
        ) : null}
      </ul>
    </div>
  );
}
