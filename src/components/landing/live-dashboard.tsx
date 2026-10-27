import {
  Calendar,
  FolderGit2,
  GitMerge,
  Languages,
  LayoutDashboard,
  Share2,
  Star,
} from "lucide-react";
import { ReportWarmup } from "@/components/profile/report-warmup";
import type { ContributionStats } from "@/lib/github/types";
import { siteConfig } from "@/lib/site";
import { formatCompact, formatNumber } from "@/lib/utils";
import { getExample } from "./example";

const sidebar = [
  { label: "Overview", Icon: LayoutDashboard, active: true },
  { label: "Pull requests", Icon: GitMerge },
  { label: "Projects", Icon: FolderGit2 },
  { label: "Languages", Icon: Languages },
  { label: "Share", Icon: Share2 },
];

function Sparkline({
  values,
  className,
}: {
  values: number[];
  className?: string;
}) {
  if (values.length < 2) return null;
  const w = 64;
  const h = 20;
  const max = Math.max(...values, 1);
  const step = w / (values.length - 1);
  const pts = values
    .map(
      (v, i) =>
        `${(i * step).toFixed(1)},${(h - 1 - (v / max) * (h - 2)).toFixed(1)}`,
    )
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden>
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        points={pts}
      />
    </svg>
  );
}

function AreaChart({ values }: { values: number[] }) {
  const w = 600;
  const h = 160;
  const max = Math.max(...values, 1);
  const step = w / Math.max(values.length - 1, 1);
  const pts = values.map(
    (v, i) => [i * step, h - 4 - (v / max) * (h - 12)] as const,
  );
  const d = pts
    .map(([x, y], i) => {
      if (i === 0) return `M${x.toFixed(1)},${y.toFixed(1)}`;
      const [px, py] = pts[i - 1];
      const cx = ((px + x) / 2).toFixed(1);
      return `C${cx},${py.toFixed(1)} ${cx},${y.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const area = `${d} L${w},${h} L0,${h} Z`;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="h-40 w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1="0"
          x2={w}
          y1={h * t}
          y2={h * t}
          stroke="var(--border)"
          strokeDasharray="3 4"
        />
      ))}
      <path d={area} fill="url(#hero-area)" />
      <path
        d={d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

export async function LiveDashboard() {
  const result = await getExample();
  const login = siteConfig.exampleLogin;

  return (
    <div className="relative px-6 pb-6 sm:px-10">
      <div className="rise relative" style={{ animationDelay: "320ms" }}>
        <div className="bg-dotgrid bg-accent/[0.06] pointer-events-none absolute -inset-x-4 -top-6 bottom-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="border-border-strong bg-background relative overflow-hidden rounded-lg border shadow-[0_-1px_0_0_var(--border)]">
          <div className="border-border flex items-center justify-between border-b px-4 py-2.5">
            <div className="text-muted-foreground flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase">
              <span className="text-accent inline-flex items-center gap-1.5">
                <span className="bg-accent size-1.5 animate-pulse" />
                Live
              </span>
              <span className="text-border-strong">/</span>
              <span className="truncate">u / {login}</span>
            </div>
            <div className="text-muted-foreground hidden items-center gap-1.5 sm:flex">
              <span className="border-border inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[11px]">
                <Calendar className="size-3" /> Last 12 months
              </span>
              <span className="border-border inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[11px]">
                <Share2 className="size-3" /> Share
              </span>
            </div>
          </div>
          <div className="border-border flex items-center gap-1 overflow-x-auto border-b px-2">
            {sidebar.map(({ label, Icon, active }) => (
              <span
                key={label}
                className={
                  active
                    ? "border-accent text-accent flex items-center gap-2 border-b-2 px-3 py-2.5 text-[13px] font-medium whitespace-nowrap"
                    : "text-muted-foreground flex items-center gap-2 border-b-2 border-transparent px-3 py-2.5 text-[13px] whitespace-nowrap"
                }
              >
                <Icon className="size-3.5" />
                {label}
              </span>
            ))}
          </div>
          <div>
            <div className="min-w-0 p-4">
              {!result ? (
                <p className="text-muted-foreground p-4 text-sm">
                  The live example needs a <code>GITHUB_TOKEN</code> on the
                  server. Search for any username above to see a profile.
                </p>
              ) : result.status === "pending" ? (
                <ReportWarmup login={login} initial={result.progress} />
              ) : (
                <Body stats={result.report.stats} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Body({ stats }: { stats: ContributionStats }) {
  const last12 = stats.monthly.slice(-12);
  const merged12 = last12.reduce((a, m) => a + m.merged, 0);
  const prev12 = stats.monthly
    .slice(-24, -12)
    .reduce((a, m) => a + m.merged, 0);
  const delta = prev12 > 0 ? (merged12 - prev12) / prev12 : null;
  const years = stats.yearly.slice(-6);
  const maxYear = Math.max(...years.map((y) => y.merged), 1);
  const kpis = [
    {
      label: "Merged PRs",
      value: formatNumber(stats.merged),
      spark: last12.map((m) => m.merged),
      hint: `${pct(stats.mergeRate)} merge rate`,
      tone: "text-success",
    },
    {
      label: "Projects",
      value: formatNumber(stats.repositories),
      spark: years.map((y) => y.merged),
      hint: `${formatNumber(stats.organizations)} owners`,
      tone: "text-muted-foreground",
    },
    {
      label: "Stars reached",
      value: formatCompact(stats.totalStars),
      spark: stats.topRepositories
        .slice(0, 8)
        .map((r) => r.stars)
        .reverse(),
      hint: "across contributed repos",
      tone: "text-muted-foreground",
    },
    {
      label: "Open now",
      value: formatNumber(stats.open),
      spark: last12.map((m) => m.opened),
      hint: `${formatNumber(stats.closed)} closed unmerged`,
      tone: stats.open > 0 ? "text-warning" : "text-muted-foreground",
    },
  ];

  return (
    <>
      <div className="border-border grid grid-cols-2 border-t border-l lg:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="border-border flex flex-col justify-between gap-3 border-r border-b p-3.5"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase">
                {k.label}
              </p>
              <Sparkline values={k.spark} className="text-accent h-5 w-16" />
            </div>
            <div>
              <p className="text-foreground font-mono text-2xl font-semibold tabular-nums">
                {k.value}
              </p>
              <p
                className={`mt-1 font-mono text-[11px] tabular-nums ${k.tone}`}
              >
                {k.hint}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-border mt-4 rounded-md border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground font-mono text-[11px] tracking-[0.12em] uppercase">
              Merged pull requests over time
            </p>
            <p className="text-foreground mt-1 flex items-baseline gap-1.5 font-mono text-lg font-semibold tabular-nums">
              {formatNumber(merged12)}
              <span className="text-muted-foreground">·</span>
              {delta === null ? (
                <span className="text-muted-foreground text-sm">
                  last 12 months
                </span>
              ) : (
                <span
                  className={`text-sm ${delta >= 0 ? "text-success" : "text-danger"}`}
                >
                  {delta >= 0 ? "+" : ""}
                  {Math.round(delta * 100)}% vs prev
                </span>
              )}
            </p>
          </div>
          <div className="border-border hidden items-center gap-0.5 rounded-md border p-0.5 sm:flex">
            {["3M", "6M", "12M", "ALL"].map((r) => (
              <span
                key={r}
                className={
                  r === "12M"
                    ? "bg-accent text-accent-fg rounded-sm px-2.5 py-1 font-mono text-[10px] tracking-wide uppercase"
                    : "text-muted-foreground px-2.5 py-1 font-mono text-[10px] tracking-wide uppercase"
                }
              >
                {r}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <AreaChart values={last12.map((m) => m.merged)} />
        </div>
      </div>
      <div className="border-border mt-4 grid grid-cols-1 border-t border-l lg:grid-cols-2">
        <div className="border-border border-r border-b p-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground font-mono text-[11px] tracking-[0.12em] uppercase">
              Merged per year
            </p>
            <p className="text-accent font-mono text-[11px] tabular-nums">
              {stats.yearsActive} yrs active
            </p>
          </div>
          <div className="mt-4 flex h-32 items-end gap-2">
            {years.map((y, i) => (
              <div
                key={y.year}
                className="flex h-full flex-1 flex-col justify-end gap-1.5"
              >
                <span
                  className="bg-accent grow-y w-full rounded-sm"
                  style={{
                    height: `${Math.max(3, (y.merged / maxYear) * 100)}%`,
                    opacity: 0.45 + (i / years.length) * 0.55,
                    animationDelay: `${400 + i * 60}ms`,
                  }}
                />
                <span className="text-muted-foreground text-center font-mono text-[9px] tabular-nums">
                  {y.year}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-border border-r border-b">
          <div className="border-border text-muted-foreground grid grid-cols-[1fr_4rem_3rem] gap-2 border-b px-3 py-2 font-mono text-[10px] tracking-[0.1em] uppercase">
            <span>Repository</span>
            <span className="text-right">PRs</span>
            <span className="text-right">Merged</span>
          </div>
          {stats.topRepositories.slice(0, 4).map((r) => {
            const rate = r.pullRequests ? r.merged / r.pullRequests : 0;
            return (
              <div
                key={r.nameWithOwner}
                className="text-foreground border-border grid grid-cols-[1fr_4rem_3rem] gap-2 px-3 py-[9px] text-[12px] [&:not(:last-child)]:border-b"
              >
                <span className="flex min-w-0 items-center gap-1.5">
                  <Star className="text-muted-foreground size-3 shrink-0" />
                  <span className="truncate">{r.nameWithOwner}</span>
                </span>
                <span className="text-right font-mono tabular-nums">
                  {formatNumber(r.pullRequests)}
                </span>
                <span
                  className={`text-right font-mono tabular-nums ${rate >= 0.7 ? "text-success" : "text-danger"}`}
                >
                  {pct(rate)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
