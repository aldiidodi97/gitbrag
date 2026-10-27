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
import { formatCompact, formatDate, formatNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DesignE() {
  const data = await getDesignData();
  if (!data) {
    return (
      <DesignFrame current="e">
        <Pending />
      </DesignFrame>
    );
  }
  const { user, stats, url, cardBase, shareText, compact } = data;
  const numbers: Array<[string, string]> = [
    [formatNumber(stats.merged), "merged pull requests"],
    [formatNumber(stats.repositories), "projects"],
    [formatCompact(stats.totalStars), "stars reached"],
    [String(stats.yearsActive), "years upstream"],
  ];
  return (
    <DesignFrame current="e">
      <div className="flex flex-col items-center text-center">
        <Avatar
          src={user.avatarUrl}
          login={user.login}
          size={96}
          className="rounded-full"
        />
        <span className="border-border mt-5 inline-flex items-center border px-3 py-1 font-mono text-xs tracking-[0.08em] uppercase">
          @{user.login} · joined{" "}
          {formatDate(user.createdAt, { day: undefined, month: undefined })}
        </span>
        <h1 className="mt-4 text-5xl tracking-tighter md:text-7xl">
          {user.name ?? user.login}
        </h1>
        {user.bio ? (
          <p className="text-muted-foreground mt-4 max-w-prose text-sm tracking-tight text-balance lg:text-base">
            {user.bio}
          </p>
        ) : null}
      </div>
      <dl className="border-border divide-border mt-12 grid grid-cols-2 divide-x border-y text-center lg:grid-cols-4">
        {numbers.map(([v, l]) => (
          <div key={l} className="px-2 py-7">
            <dd className="tabular font-mono text-4xl tracking-tight md:text-5xl">
              {v}
            </dd>
            <dt className="text-muted-foreground mt-2 font-mono text-[11px] uppercase">
              {l}
            </dt>
          </div>
        ))}
      </dl>
      <div className="mt-12">
        <TimelineChart monthly={stats.monthly} />
      </div>
      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
        <section>
          <span className="label mb-2 block">Where the work landed</span>
          <RankedRepos
            repos={stats.topRepositories.slice(0, 10)}
            max={stats.topRepositories[0]?.merged ?? 1}
          />
        </section>
        <aside className="space-y-10">
          <div>
            <span className="label mb-3 block">Languages</span>
            <LanguageBar languages={stats.languages} />
          </div>
          <div>
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
      <section className="mt-14">
        <span className="label mb-4 block">
          All {formatNumber(stats.total)} pull requests
        </span>
        <PullRequestList repos={compact.repos} prs={compact.prs} />
      </section>
    </DesignFrame>
  );
}
