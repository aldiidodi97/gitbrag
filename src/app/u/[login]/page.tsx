import {
  AlertTriangle,
  Building2,
  CalendarDays,
  GitMerge,
  GitPullRequest,
  Languages,
  Star,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { KpiCard, Sparkline } from "@/components/profile/kpi-card";
import { LanguageBar } from "@/components/profile/language-bar";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ReportWarmup } from "@/components/profile/report-warmup";
import { PullRequestList } from "@/components/profile/pr-list";
import { RepoGrid } from "@/components/profile/repo-grid";
import { ShareBar } from "@/components/profile/share-bar";
import { TimelineChart } from "@/components/profile/timeline-chart";
import { UserSearch } from "@/components/search/user-search";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import {
  isGitHubError,
  compactPullRequests,
  loadReport,
  getUser,
  hasGitHubToken,
  type GitHubUser,
} from "@/lib/github";
import { computeStats } from "@/lib/github/stats";
import { siteConfig } from "@/lib/site";
import { requestProfileUrl, requestSiteUrl } from "@/lib/site-request";
import {
  cn,
  formatCompact,
  formatDate,
  formatNumber,
  pluralize,
} from "@/lib/utils";

type Props = PageProps<"/u/[login]">;

async function loadUser(login: string): Promise<GitHubUser> {
  try {
    return await getUser(login);
  } catch (error) {
    if (isGitHubError(error) && error.code === "NOT_FOUND") notFound();
    console.error(`[gitbrag] loading user ${login} failed`, error);
    throw error;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { login } = await params;
  const user = await loadUser(login);
  const name = user.name ?? user.login;
  let description = `${name}'s open-source contributions: merged pull requests, projects and languages, on ${siteConfig.name}.`;
  try {
    const result = await loadReport(login);
    if (result.status === "ready") {
      const { stats } = result.report;
      description = `${formatNumber(stats.merged)} merged pull requests across ${formatNumber(stats.repositories)} open-source projects reaching ${formatCompact(stats.totalStars)} stars.`;
    }
  } catch {
    /* keep the generic description; the page shows the error */
  }
  const title = `${name}'s open-source contributions`;
  return {
    metadataBase: new URL(await requestSiteUrl()),
    title: `${name} (@${user.login}) — open-source contributions`,
    description,
    alternates: { canonical: `/u/${user.login}` },
    openGraph: { title, description, url: `/u/${user.login}`, type: "profile" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProfilePage({ params, searchParams }: Props) {
  const [{ login }, query] = await Promise.all([params, searchParams]);
  const user = await loadUser(login);
  const hideOrgs = query.orgs === "hide";

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-8 md:py-14">
        <ProfileHeader user={user} />
        {!hasGitHubToken() ? (
          <Notice tone="warning">
            This instance has no <code>GITHUB_TOKEN</code> configured, so GitHub
            allows only 60 requests per hour. Add a token to the environment to
            make searches reliable.
          </Notice>
        ) : null}
        <Suspense fallback={<ReportSkeleton />}>
          <Report login={user.login} hideOrgs={hideOrgs} />
        </Suspense>
        <section className="border-border mt-16 border-t pt-10">
          <span className="label">Look up someone else</span>
          <UserSearch size="md" className="mt-3 max-w-xl" />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

async function Report({
  login,
  hideOrgs,
}: {
  login: string;
  hideOrgs: boolean;
}) {
  const result = await loadReport(login);
  if (result.status === "pending") {
    return (
      <div className="mt-10">
        <ReportWarmup login={login} initial={result.progress} />
      </div>
    );
  }
  const { report } = result;
  const { user } = report;
  const pullRequests = hideOrgs
    ? report.pullRequests.filter((pr) => !pr.inUserOrg)
    : report.pullRequests;
  const stats = hideOrgs ? computeStats(pullRequests) : report.stats;
  const orgPrCount = report.pullRequests.filter((pr) => pr.inUserOrg).length;
  const url = await requestProfileUrl(user.login);
  const cardBase = `${await requestSiteUrl()}/api/card/${encodeURIComponent(user.login)}`;
  const shareText = `${user.name ?? user.login} has ${formatNumber(stats.merged)} merged pull requests across ${formatNumber(stats.repositories)} open-source projects. See the full record on ${siteConfig.name}:`;
  const last12 = stats.monthly.slice(-12).map((m) => m.merged);
  const mergedLast12 = last12.reduce((a, b) => a + b, 0);
  const compact = compactPullRequests(pullRequests);

  if (stats.total === 0) {
    return (
      <section className="border-border-strong bg-card mt-10 rounded-lg border border-dashed px-6 py-16 text-center">
        <GitPullRequest className="text-muted-foreground mx-auto size-8" />
        <h2 className="mt-4 text-xl font-semibold">
          No upstream pull requests yet
        </h2>
        <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm">
          {hideOrgs
            ? `All of @${user.login}'s pull requests go to organizations they belong to.`
            : `@${user.login} has not opened pull requests in repositories owned by others, or they are all in forks.`}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          {hideOrgs ? (
            <ButtonLink href={`/u/${user.login}`} variant="outline" size="sm">
              Include organization repos
            </ButtonLink>
          ) : null}
          <ButtonLink href="/" size="sm">
            Search another user
          </ButtonLink>
        </div>
      </section>
    );
  }

  return (
    <>
      {report.truncated ? (
        <Notice tone="info">
          GitHub&apos;s search API limited how many pull requests could be
          loaded. The numbers below are a lower bound.
        </Notice>
      ) : null}

      <section className="mt-10">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <span className="label">
            Overview · fetched{" "}
            {formatDate(report.fetchedAt, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {orgPrCount > 0 ? (
            <div className="text-muted-foreground flex items-center gap-2 font-mono text-[11px]">
              <Building2 className="size-3.5" />
              <span>
                {formatNumber(orgPrCount)} {pluralize(orgPrCount, "PR")} in own
                orgs
              </span>
              <Link
                href={
                  hideOrgs ? `/u/${user.login}` : `/u/${user.login}?orgs=hide`
                }
                className="border-border bg-card text-foreground hover:bg-muted rounded-md border px-2 py-1"
              >
                {hideOrgs ? "Include" : "Hide"}
              </Link>
            </div>
          ) : null}
        </div>
        <div className="border-border bg-border grid gap-px overflow-hidden rounded-lg border sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Merged PRs"
            value={formatNumber(stats.merged)}
            Icon={GitMerge}
            hint={
              <>
                <span className="text-positive">
                  +{formatNumber(mergedLast12)}
                </span>{" "}
                in the last 12 months · {Math.round(stats.mergeRate * 100)}%
                merge rate
              </>
            }
          >
            <Sparkline values={last12} />
          </KpiCard>
          <KpiCard
            label="Projects"
            value={formatNumber(stats.repositories)}
            Icon={GitPullRequest}
            hint={`${formatNumber(stats.organizations)} ${pluralize(stats.organizations, "owner")} · ${formatNumber(stats.open)} open · ${formatNumber(stats.closed)} closed`}
          />
          <KpiCard
            label="Stars reached"
            value={formatCompact(stats.totalStars)}
            Icon={Star}
            hint="Sum of stars across contributed repositories"
          />
          <KpiCard
            label="Active since"
            value={
              stats.firstContribution
                ? new Date(stats.firstContribution).getFullYear()
                : "—"
            }
            Icon={CalendarDays}
            hint={`${stats.yearsActive} ${pluralize(stats.yearsActive, "year")} · ${formatNumber(stats.languages.length)} ${pluralize(stats.languages.length, "language")}`}
          />
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="border-border bg-card rounded-lg border p-5 lg:col-span-2">
          <TimelineChart monthly={stats.monthly} />
        </div>
        <div className="border-border bg-card flex flex-col gap-5 rounded-lg border p-5">
          <div className="flex items-center justify-between">
            <span className="label">Languages</span>
            <Languages className="text-muted-foreground size-3.5" />
          </div>
          <LanguageBar languages={stats.languages} />
          <div className="border-border mt-auto grid grid-cols-2 gap-3 border-t pt-4 font-mono text-[11px]">
            <div>
              <div className="text-muted-foreground">Merge rate</div>
              <div className="tabular text-positive">
                {Math.round(stats.mergeRate * 100)}%
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Open right now</div>
              <div className="tabular">{formatCompact(stats.open)}</div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="share"
        className="border-accent/30 bg-accent-soft/40 dark:bg-accent/5 mt-6 scroll-mt-20 rounded-lg border p-5"
      >
        <div className="mb-4 flex items-center gap-2">
          <span className="label text-accent">Share this card</span>
          <Badge tone="accent">Free</Badge>
        </div>
        <ShareBar
          url={url}
          login={user.login}
          text={shareText}
          cardBase={cardBase}
        />
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <span className="label">Top projects</span>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              Where the work landed
            </h2>
          </div>
          <span className="text-muted-foreground font-mono text-[11px]">
            {formatNumber(Math.min(stats.topRepositories.length, 12))} of{" "}
            {formatNumber(stats.repositories)}
          </span>
        </div>
        <RepoGrid repos={stats.topRepositories.slice(0, 12)} />
      </section>

      <section className="mt-12">
        <div className="mb-4">
          <span className="label">All pull requests</span>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            {formatNumber(stats.total)} {pluralize(stats.total, "pull request")}
          </h2>
        </div>
        <PullRequestList repos={compact.repos} prs={compact.prs} />
      </section>
    </>
  );
}

function ReportSkeleton() {
  return (
    <div aria-busy className="mt-10">
      <p className="label">
        Collecting pull requests from GitHub… this can take a few seconds for
        busy contributors.
      </p>
      <div className="border-border bg-border mt-4 grid gap-px overflow-hidden rounded-lg border sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card flex flex-col gap-3 px-5 py-4">
            <div className="skeleton h-3 w-24" />
            <div className="skeleton h-8 w-28" />
            <div className="skeleton h-3 w-20" />
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="skeleton h-72 lg:col-span-2" />
        <div className="skeleton h-72" />
      </div>
    </div>
  );
}

function Notice({
  tone,
  children,
}: {
  tone: "warning" | "info";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mt-6 flex items-start gap-3 rounded-md border px-4 py-3 text-sm",
        tone === "warning"
          ? "border-negative/30 bg-negative/5 text-foreground"
          : "border-border bg-muted text-muted-foreground",
      )}
    >
      <AlertTriangle
        className={cn(
          "mt-0.5 size-4 shrink-0",
          tone === "warning" ? "text-negative" : "text-accent",
        )}
      />
      <p>{children}</p>
    </div>
  );
}
