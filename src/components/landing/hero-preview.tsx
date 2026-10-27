import { GitMerge, Star, FolderGit2, Share2 } from "lucide-react";

const kpis = [
  {
    label: "Merged PRs",
    value: "1,284",
    delta: "+32 this year",
    Icon: GitMerge,
  },
  { label: "Projects", value: "96", delta: "across 41 orgs", Icon: FolderGit2 },
  { label: "Stars reached", value: "412k", delta: "sum of repos", Icon: Star },
];

const bars = [12, 18, 15, 22, 30, 26, 34, 41, 38, 47, 52, 49];

const repos = [
  { name: "vercel/next.js", prs: 212, lang: "TypeScript", color: "#3178c6" },
  { name: "facebook/react", prs: 148, lang: "JavaScript", color: "#f1e05a" },
  { name: "rust-lang/rust", prs: 97, lang: "Rust", color: "#dea584" },
  { name: "python/cpython", prs: 64, lang: "Python", color: "#3572A5" },
];

/** Static mock of a profile, used as the hero illustration. */
export function HeroPreview() {
  return (
    <div className="hairline-corners border-border bg-card relative rounded-lg border shadow-[0_30px_80px_-40px_rgba(37,99,235,0.35)]">
      <span className="corner" />
      <div className="border-border flex items-center justify-between border-b px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="bg-accent inline-block size-1.5 rounded-sm" />
          <span className="label text-accent">Live</span>
          <span className="label">/ octocat / contributions</span>
        </div>
        <span className="border-border text-muted-foreground inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs">
          <Share2 className="size-3" /> Share
        </span>
      </div>
      <div className="bg-border grid gap-px sm:grid-cols-3">
        {kpis.map(({ label, value, delta, Icon }) => (
          <div key={label} className="bg-card px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="label">{label}</span>
              <Icon className="text-muted-foreground size-3.5" />
            </div>
            <div className="tabular mt-1.5 font-mono text-2xl font-medium">
              {value}
            </div>
            <div className="text-positive mt-0.5 font-mono text-[11px]">
              {delta}
            </div>
          </div>
        ))}
      </div>
      <div className="border-border grid gap-4 border-t p-4 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="flex items-center justify-between">
            <span className="label">Merged per month</span>
            <span className="text-muted-foreground font-mono text-[11px]">
              12M
            </span>
          </div>
          <div className="mt-3 flex h-24 items-end gap-1.5">
            {bars.map((h, i) => (
              <span
                key={i}
                className="bg-accent/80 flex-1 rounded-[2px]"
                style={{
                  height: `${(h / 52) * 100}%`,
                  opacity: 0.45 + (i / bars.length) * 0.55,
                }}
              />
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <span className="label">Top projects</span>
          <ul className="mt-3 flex flex-col gap-2 text-xs">
            {repos.map((r) => (
              <li
                key={r.name}
                className="flex items-center justify-between gap-2"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ background: r.color }}
                  />
                  <span className="truncate font-medium">{r.name}</span>
                </span>
                <span className="tabular text-muted-foreground font-mono">
                  {r.prs} PRs
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
