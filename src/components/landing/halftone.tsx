import { getExample } from "./example";

/**
 * A halftone field drawn from the example profile's real monthly merged
 * counts: one column per month, dot size grows with activity, rows fade
 * upward like a dither.
 */
export async function Halftone() {
  const result = await getExample();
  const ready = result?.status === "ready" ? result.report : null;
  const months = ready ? ready.stats.monthly.slice(-96) : [];
  const cols = Math.max(months.length, 48);
  const rows = 22;
  const cell = 14;
  const w = cols * cell;
  const h = rows * cell;
  const max = Math.max(...months.map((m) => m.merged), 1);
  const dots: string[] = [];
  for (let c = 0; c < cols; c++) {
    const v = months[c] ? months[c].merged / max : 0;
    const peak = 0.15 + v * 0.85;
    for (let r = 0; r < rows; r++) {
      const depth = (r + 1) / rows;
      const size = Math.max(0, (depth * 1.1 - (1 - peak)) * (cell * 0.46));
      if (size < 0.6) continue;
      dots.push(
        `<circle cx="${c * cell + cell / 2}" cy="${r * cell + cell / 2}" r="${size.toFixed(2)}" />`,
      );
    }
  }
  return (
    <div
      aria-hidden
      className="text-accent relative mt-10 w-full flex-1 overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="h-56 w-full fill-current md:h-72"
        dangerouslySetInnerHTML={{ __html: dots.join("") }}
      />
      {ready ? (
        <span className="text-muted-foreground border-border block border-t px-4 py-2 text-right font-mono text-[10px] tracking-[0.14em] uppercase">
          merged pull requests per month, @{ready.user.login}
        </span>
      ) : null}
    </div>
  );
}
