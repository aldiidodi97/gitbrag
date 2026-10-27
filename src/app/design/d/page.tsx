import { GitMerge, GitPullRequest, GitPullRequestClosed } from "lucide-react";
import {
  Avatar,
  DesignFrame,
  Pending,
  RankedRepos,
  getDesignData,
} from "@/components/design/shared";
import { ShareBar } from "@/components/profile/share-bar";
import type { PullRequest } from "@/lib/github/types";
import { formatCompact, formatDate, formatNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

const PER_YEAR = 8;
const icons = {
  MERGED: { Icon: GitMerge, className: "text-accent" },
  OPEN: { Icon: GitPullRequest, className: "text-positive" },
  CLOSED: { Icon: GitPullRequestClosed, className: "text-negative" },
};

export default async function DesignD() {
  const data = await getDesignData();
  if (!data) {
    return (
      <DesignFrame current="d">
        <Pending />
      </DesignFrame>
    );
  }
  const { user, stats, report, url, cardBase, shareText } = data;
  const byYear = new Map<string, PullRequest[]>();
  for (const pr of report.pullRequests) {
    const y = pr.createdAt.slice(0, 4);
    byYear.set(y, [...(byYear.get(y) ?? []), pr]);
  }
  const years = [...byYear.keys()].sort().reverse();
  const inline = [
    `${formatNumber(stats.merged)} merged`,
    `${formatNumber(stats.repositories)} projects`,
    `${formatCompact(stats.totalStars)} stars reached`,
    `${stats.yearsActive} years`,
  ];
  return (
    <DesignFrame current="d" className="py-0 md:py-0">
      <div className="border-border -mx-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-b px-4 py-4 sm:-mx-8 sm:px-8">
        <Avatar
          src={user.avatarUrl}
          login={user.login}
          size={36}
          className="rounded-md"
        />
        <div className="leading-tight">
          <h1 className="font-semibold tracking-tight">
            {user.name ?? user.login}
          </h1>
          <a
            href={user.url}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-accent font-mono text-xs"
          >
            @{user.login}
          </a>
        </div>
        <ul className="text-muted-foreground flex flex-wrap gap-x-4 font-mono text-xs sm:ml-auto">
          {inline.map((t) => (
            <li key={t}>
              <span className="text-foreground">{t.split(" ")[0]}</span>{" "}
              {t.slice(t.indexOf(" ") + 1)}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-10 py-8 lg:grid-cols-[1fr_300px] lg:gap-14">
        <div className="min-w-0">
          {years.map((year) => {
            const prs = byYear.get(year) ?? [];
            const merged = prs.filter((p) => p.state === "MERGED").length;
            const shown = prs.slice(0, PER_YEAR);
            return (
              <section key={year} className="mb-10">
                <header className="bg-background border-border sticky top-14 z-10 flex items-baseline justify-between border-b py-2">
                  <span className="font-mono text-2xl tracking-tight">
                    {year}
                  </span>
                  <span className="text-muted-foreground font-mono text-[11px] uppercase">
                    {merged} merged · {prs.length} opened
                  </span>
                </header>
                <ol className="divide-border divide-y">
                  {shown.map((pr) => {
                    const { Icon, className } = icons[pr.state];
                    return (
                      <li key={pr.id}>
                        <a
                          href={pr.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group grid grid-cols-[1rem_5.5rem_1fr] items-baseline gap-3 py-2.5 text-sm sm:grid-cols-[1rem_5.5rem_12rem_1fr]"
                        >
                          <Icon
                            className={`${className} size-3.5 self-center`}
                          />
                          <span className="text-muted-foreground font-mono text-[11px]">
                            {formatDate(pr.createdAt, { year: undefined })}
                          </span>
                          <span className="hidden truncate font-mono text-xs sm:block">
                            {pr.repo.nameWithOwner}
                          </span>
                          <span className="group-hover:text-accent truncate">
                            <span className="text-muted-foreground font-mono text-xs sm:hidden">
                              {pr.repo.name} ·{" "}
                            </span>
                            {pr.title}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
                {prs.length > shown.length ? (
                  <p className="text-muted-foreground mt-2 font-mono text-[11px]">
                    + {prs.length - shown.length} more in {year}
                  </p>
                ) : null}
              </section>
            );
          })}
        </div>
        <aside className="self-start lg:sticky lg:top-20">
          <span className="label mb-2 block">Most contributed</span>
          <RankedRepos
            repos={stats.topRepositories.slice(0, 8)}
            max={stats.topRepositories[0]?.merged ?? 1}
          />
          <div className="border-border mt-8 border-t pt-5">
            <span className="label mb-3 block">Share</span>
            <ShareBar
              url={url}
              login={user.login}
              text={shareText}
              cardBase={cardBase}
            />
          </div>
        </aside>
      </div>
    </DesignFrame>
  );
}
