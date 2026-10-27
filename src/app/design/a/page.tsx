import {
  Avatar,
  DesignFrame,
  Pending,
  RankedRepos,
  getDesignData,
} from "@/components/design/shared";
import { LanguageBar } from "@/components/profile/language-bar";
import { PullRequestList } from "@/components/profile/pr-list";
import { ShareBar } from "@/components/profile/share-bar";
import { TimelineChart } from "@/components/profile/timeline-chart";
import { ButtonLink } from "@/components/ui/button";
import { formatCompact, formatDate, formatNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DesignA() {
  const data = await getDesignData();
  if (!data) {
    return (
      <DesignFrame current="a">
        <Pending />
      </DesignFrame>
    );
  }
  const { user, stats, url, cardBase, shareText, compact } = data;
  const kpis: Array<[string, string]> = [
    ["Merged PRs", formatNumber(stats.merged)],
    ["Projects", formatNumber(stats.repositories)],
    ["Owners", formatNumber(stats.organizations)],
    ["Stars reached", formatCompact(stats.totalStars)],
    ["Merge rate", `${Math.round(stats.mergeRate * 100)}%`],
    [
      "Active since",
      stats.firstContribution
        ? String(new Date(stats.firstContribution).getFullYear())
        : "n/a",
    ],
  ];
  const max = stats.topRepositories[0]?.merged ?? 1;
  return (
    <DesignFrame current="a">
      <div className="grid gap-10 lg:grid-cols-[272px_1fr] lg:gap-14">
        <aside className="self-start lg:sticky lg:top-20">
          <Avatar
            src={user.avatarUrl}
            login={user.login}
            size={96}
            className="rounded-lg"
          />
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">
            {user.name ?? user.login}
          </h1>
          <a
            href={user.url}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-accent font-mono text-sm"
          >
            @{user.login}
          </a>
          {user.bio ? (
            <p className="text-muted-foreground mt-3 text-sm">{user.bio}</p>
          ) : null}
          <dl className="border-border divide-border mt-6 divide-y border-y">
            {kpis.map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between py-2.5"
              >
                <dt className="text-muted-foreground font-mono text-[11px] uppercase">
                  {k}
                </dt>
                <dd className="tabular font-mono text-base">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <span className="label">Languages</span>
            <div className="mt-3">
              <LanguageBar languages={stats.languages} />
            </div>
          </div>
          <ButtonLink
            href={user.url}
            variant="outline"
            size="sm"
            target="_blank"
            rel="noreferrer"
            className="mt-6 w-full"
          >
            View on GitHub
          </ButtonLink>
          <p className="text-muted-foreground mt-4 font-mono text-[11px]">
            Joined {formatDate(user.createdAt, { day: undefined })} ·{" "}
            {formatCompact(user.followers)} followers
          </p>
        </aside>
        <div className="min-w-0">
          <div className="border-border rounded-lg border p-5">
            <TimelineChart monthly={stats.monthly} />
          </div>
          <section className="mt-10">
            <div className="mb-2 flex items-end justify-between">
              <span className="label">Where the work landed</span>
              <span className="text-muted-foreground font-mono text-[11px]">
                merged PRs per project
              </span>
            </div>
            <RankedRepos repos={stats.topRepositories.slice(0, 8)} max={max} />
          </section>
          <section className="border-border mt-10 border-y py-5">
            <span className="label mb-4 block">Share</span>
            <ShareBar
              url={url}
              login={user.login}
              text={shareText}
              cardBase={cardBase}
            />
          </section>
          <section className="mt-10">
            <span className="label mb-4 block">
              {formatNumber(stats.total)} pull requests
            </span>
            <PullRequestList repos={compact.repos} prs={compact.prs} />
          </section>
        </div>
      </div>
    </DesignFrame>
  );
}
