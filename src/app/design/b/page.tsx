import Image from "next/image";
import {
  Avatar,
  DesignFrame,
  Pending,
  getDesignData,
} from "@/components/design/shared";
import { PullRequestList } from "@/components/profile/pr-list";
import { ShareBar } from "@/components/profile/share-bar";
import { formatCompact, formatMonth, formatNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DesignB() {
  const data = await getDesignData();
  if (!data) {
    return (
      <DesignFrame current="b">
        <Pending />
      </DesignFrame>
    );
  }
  const { user, stats, url, cardBase, shareText, compact } = data;
  const years = [...stats.yearly].sort((a, b) => b.year - a.year);
  const maxYear = Math.max(...years.map((y) => y.opened), 1);
  const strip: Array<[string, string, string]> = [
    [
      "Merged",
      formatNumber(stats.merged),
      `${Math.round(stats.mergeRate * 100)}% of ${formatNumber(stats.total)} opened`,
    ],
    [
      "Projects",
      formatNumber(stats.repositories),
      `${formatNumber(stats.organizations)} different owners`,
    ],
    [
      "Stars reached",
      formatCompact(stats.totalStars),
      "across contributed repos",
    ],
    [
      "Years",
      String(stats.yearsActive),
      stats.firstContribution
        ? `since ${new Date(stats.firstContribution).getFullYear()}`
        : "",
    ],
  ];
  return (
    <DesignFrame current="b" className="px-0 sm:px-0">
      <header className="px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <Avatar
            src={user.avatarUrl}
            login={user.login}
            size={40}
            className="rounded-full"
          />
          <div className="font-mono text-sm">
            <span>{user.name ?? user.login}</span>
            <span className="text-muted-foreground"> · @{user.login}</span>
          </div>
        </div>
        <h1 className="mt-8 max-w-4xl text-4xl leading-[1.05] tracking-tighter md:text-6xl">
          <span className="text-accent">{formatNumber(stats.merged)}</span> pull
          requests merged into{" "}
          <span className="text-accent">
            {formatNumber(stats.repositories)}
          </span>{" "}
          projects other people own.
        </h1>
      </header>
      <dl className="border-border divide-border mt-10 grid grid-cols-2 divide-x divide-y border-y lg:grid-cols-4 lg:divide-y-0">
        {strip.map(([k, v, hint]) => (
          <div key={k} className="px-4 py-6 sm:px-8">
            <dt className="label">{k}</dt>
            <dd className="tabular mt-2 font-mono text-4xl tracking-tight md:text-5xl">
              {v}
            </dd>
            <dd className="text-muted-foreground mt-2 font-mono text-[11px]">
              {hint}
            </dd>
          </div>
        ))}
      </dl>
      <section className="grid gap-10 px-4 py-10 sm:px-8 lg:grid-cols-2">
        <div>
          <span className="label mb-4 block">By year</span>
          <ol className="space-y-2.5">
            {years.map((y) => (
              <li
                key={y.year}
                className="grid grid-cols-[3.5rem_1fr_4.5rem] items-center gap-3 font-mono text-xs"
              >
                <span className="text-muted-foreground">{y.year}</span>
                <span className="bg-muted relative h-5 overflow-hidden">
                  <span
                    className="bg-accent/30 absolute inset-y-0 left-0"
                    style={{ width: `${(y.opened / maxYear) * 100}%` }}
                  />
                  <span
                    className="bg-accent absolute inset-y-0 left-0"
                    style={{ width: `${(y.merged / maxYear) * 100}%` }}
                  />
                </span>
                <span className="tabular text-right">
                  {y.merged}
                  <span className="text-muted-foreground"> / {y.opened}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="text-muted-foreground mt-3 font-mono text-[11px]">
            merged / opened
          </p>
        </div>
        <div>
          <span className="label mb-4 block">Top projects</span>
          <table className="w-full text-sm">
            <tbody className="divide-border divide-y">
              {stats.topRepositories.slice(0, 10).map((repo) => (
                <tr key={repo.nameWithOwner}>
                  <td className="py-2 pr-3">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-accent flex items-center gap-2.5"
                    >
                      <Image
                        src={repo.ownerAvatarUrl}
                        alt=""
                        width={20}
                        height={20}
                        className="size-5 rounded"
                      />
                      <span className="truncate">
                        <span className="text-muted-foreground">
                          {repo.owner}/
                        </span>
                        {repo.name}
                      </span>
                    </a>
                  </td>
                  <td className="text-muted-foreground hidden py-2 pr-3 font-mono text-[11px] sm:table-cell">
                    {repo.language?.name ?? ""}
                  </td>
                  <td className="tabular py-2 pr-3 text-right font-mono text-xs">
                    {repo.merged}
                  </td>
                  <td className="text-muted-foreground tabular py-2 text-right font-mono text-[11px]">
                    ★ {formatCompact(repo.stars)}
                  </td>
                  <td className="text-muted-foreground hidden py-2 pl-3 text-right font-mono text-[11px] md:table-cell">
                    {formatMonth(repo.lastContribution)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="border-border border-y px-4 py-5 sm:px-8">
        <ShareBar
          url={url}
          login={user.login}
          text={shareText}
          cardBase={cardBase}
        />
      </section>
      <section className="px-4 py-10 sm:px-8">
        <span className="label mb-4 block">All pull requests</span>
        <PullRequestList repos={compact.repos} prs={compact.prs} />
      </section>
    </DesignFrame>
  );
}
