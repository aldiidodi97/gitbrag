import {
  Avatar,
  DesignFrame,
  Pending,
  getDesignData,
} from "@/components/design/shared";
import { Sparkline } from "@/components/profile/kpi-card";
import { LanguageBar } from "@/components/profile/language-bar";
import { PullRequestList } from "@/components/profile/pr-list";
import { RepoGrid } from "@/components/profile/repo-grid";
import { ShareBar } from "@/components/profile/share-bar";
import { TimelineChart } from "@/components/profile/timeline-chart";
import { formatCompact, formatNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DesignC() {
  const data = await getDesignData();
  if (!data) {
    return (
      <DesignFrame current="c">
        <Pending />
      </DesignFrame>
    );
  }
  const { user, stats, url, cardBase, shareText, compact } = data;
  const last12 = stats.monthly.slice(-12).map((m) => m.merged);
  const tile = "bg-card border-border flex flex-col rounded-lg border p-5";
  return (
    <DesignFrame current="c">
      <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="flex items-start gap-5">
          <Avatar
            src={user.avatarUrl}
            login={user.login}
            size={72}
            className="rounded-lg"
          />
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
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
              <p className="text-muted-foreground mt-3 max-w-md text-sm">
                {user.bio}
              </p>
            ) : null}
          </div>
        </div>
        <div className="border-border overflow-hidden rounded-lg border shadow-[0_12px_32px_var(--color-accent-glow)]">
          {/* eslint-disable-next-line @next/next/no-img-element -- generated card, any origin */}
          <img
            src={`${cardBase}?format=og`}
            alt={`${user.login}'s share card`}
            width={1200}
            height={630}
            className="block w-full"
          />
        </div>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <div className={`${tile} lg:col-span-2 lg:row-span-2`}>
          <span className="label">Merged PRs</span>
          <div className="tabular mt-auto font-mono text-6xl tracking-tight">
            {formatNumber(stats.merged)}
          </div>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-muted-foreground font-mono text-[11px]">
              {Math.round(stats.mergeRate * 100)}% merge rate · last 12 months
            </span>
            <Sparkline values={last12} />
          </div>
        </div>
        {[
          ["Projects", formatNumber(stats.repositories)],
          ["Stars reached", formatCompact(stats.totalStars)],
          ["Owners", formatNumber(stats.organizations)],
          ["Open now", formatNumber(stats.open)],
        ].map(([k, v]) => (
          <div key={k} className={`${tile} lg:col-span-1`}>
            <span className="label">{k}</span>
            <div className="tabular mt-3 font-mono text-3xl tracking-tight">
              {v}
            </div>
          </div>
        ))}
        <div className={`${tile} lg:col-span-2`}>
          <span className="label">Languages</span>
          <div className="mt-3">
            <LanguageBar languages={stats.languages} />
          </div>
        </div>
        <div className={`${tile} sm:col-span-2 lg:col-span-4`}>
          <TimelineChart monthly={stats.monthly} />
        </div>
        <div className={`${tile} sm:col-span-2 lg:col-span-2`}>
          <span className="label">Share</span>
          <div className="mt-3">
            <ShareBar
              url={url}
              login={user.login}
              text={shareText}
              cardBase={cardBase}
            />
          </div>
        </div>
      </div>
      <section className="mt-10">
        <span className="label mb-4 block">Top projects</span>
        <RepoGrid repos={stats.topRepositories.slice(0, 6)} />
      </section>
      <section className="mt-10">
        <span className="label mb-4 block">All pull requests</span>
        <PullRequestList repos={compact.repos} prs={compact.prs} />
      </section>
    </DesignFrame>
  );
}
