import { Suspense } from "react";
import { getExample } from "@/components/landing/example";
import { ShareCarousel } from "@/components/landing/sections";
import { UserSearch } from "@/components/search/user-search";
import { SiteHeader } from "@/components/site/site-header";
import { formatCompact, formatNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function Receipt() {
  const r = await getExample();
  if (r?.status !== "ready") return null;
  const { stats, user } = r.report;
  const rows: [string, string][] = [
    ["MERGED PULL REQUESTS", formatNumber(stats.merged)],
    ["OPEN", formatNumber(stats.open)],
    ["CLOSED UNMERGED", formatNumber(stats.closed)],
    ["PROJECTS", formatNumber(stats.repositories)],
    ["OWNERS", formatNumber(stats.organizations)],
    ["STARS REACHED", formatCompact(stats.totalStars)],
    ["LANGUAGES", formatNumber(stats.languages.length)],
    ["FIRST PR", stats.firstContribution?.slice(0, 10) ?? "n/a"],
    ["MERGE RATE", `${Math.round(stats.mergeRate * 100)}%`],
  ];
  return (
    <div className="bg-card border-border mx-auto w-full max-w-md rounded-lg border p-6 font-mono text-sm shadow-xl">
      <div className="border-border flex items-center justify-between border-b border-dashed pb-4">
        <span className="font-semibold">GITBRAG</span>
        <span className="text-muted-foreground">@{user.login}</span>
      </div>
      <dl className="divide-border divide-y divide-dashed">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between py-2.5">
            <dt className="text-muted-foreground text-xs tracking-wider">
              {k}
            </dt>
            <dd className="tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="border-border mt-4 border-t border-dashed pt-4">
        <p className="text-muted-foreground text-[11px] tracking-wider uppercase">
          Top projects
        </p>
        {stats.topRepositories.slice(0, 5).map((repo) => (
          <div key={repo.nameWithOwner} className="flex justify-between py-1.5">
            <span className="truncate">{repo.nameWithOwner}</span>
            <span className="text-muted-foreground tabular-nums">
              {repo.merged}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex h-10 items-end gap-0.5">
        {stats.monthly.slice(-36).map((m, i, arr) => {
          const max = Math.max(...arr.map((x) => x.merged), 1);
          return (
            <span
              key={m.month}
              className="bg-foreground flex-1"
              style={{ height: `${Math.max(4, (m.merged / max) * 100)}%` }}
            />
          );
        })}
      </div>
      <p className="text-muted-foreground mt-4 text-center text-[11px]">
        gitbrag.netlify.app/u/{user.login}
      </p>
    </div>
  );
}

export default function OptionB() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-2 md:items-center md:px-10 md:py-32">
          <div>
            <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase">
              Open-source receipts
            </p>
            <h1 className="mt-5 text-5xl leading-[1.0] font-semibold tracking-[-0.03em] text-balance md:text-6xl">
              Proof of the work you shipped to other people&apos;s code.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-md text-lg leading-7">
              Type a GitHub username and get an itemised record of every pull
              request sent upstream: merged, open, closed, by project.
            </p>
            <div id="search" className="mt-8 max-w-md">
              <UserSearch autoFocus />
            </div>
            <p className="text-muted-foreground mt-4 font-mono text-xs">
              No sign-in · public data only · MIT
            </p>
          </div>
          <Suspense>
            <Receipt />
          </Suspense>
        </section>
        <div className="mx-auto max-w-6xl">
          <ShareCarousel />
        </div>
      </main>
    </>
  );
}
