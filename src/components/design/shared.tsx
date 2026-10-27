import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { compactPullRequests, loadReport } from "@/lib/github";
import type { ContributionReport } from "@/lib/github/types";
import { siteConfig } from "@/lib/site";
import { requestProfileUrl, requestSiteUrl } from "@/lib/site-request";
import { cn, formatNumber } from "@/lib/utils";

export const designOptions = [
  ["a", "Dossier"],
  ["b", "Statement"],
  ["c", "Bento"],
  ["d", "Ledger"],
  ["e", "Magazine"],
] as const;

export async function getDesignData() {
  const result = await loadReport(siteConfig.exampleLogin);
  if (result.status !== "ready") return null;
  const report: ContributionReport = result.report;
  const { user, stats } = report;
  const url = await requestProfileUrl(user.login);
  const cardBase = `${await requestSiteUrl()}/api/card/${encodeURIComponent(user.login)}`;
  const shareText = `${user.name ?? user.login} has ${formatNumber(stats.merged)} merged pull requests across ${formatNumber(stats.repositories)} open-source projects. See the full record on ${siteConfig.name}:`;
  return {
    report,
    user,
    stats,
    url,
    cardBase,
    shareText,
    compact: compactPullRequests(report.pullRequests),
  };
}

export function DesignFrame({
  current,
  children,
  className,
}: {
  current: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-2">
        <div className="border-border mx-auto w-full max-w-6xl border-x">
          <nav className="border-border flex flex-wrap items-center gap-1 border-b px-4 py-2 font-mono text-[11px] uppercase">
            <span className="text-muted-foreground mr-2">Option</span>
            {designOptions.map(([key, label]) => (
              <Link
                key={key}
                href={`/design/${key}`}
                className={cn(
                  "border px-2 py-0.5",
                  key === current
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-border hover:border-border-strong",
                )}
              >
                {key.toUpperCase()} {label}
              </Link>
            ))}
          </nav>
          <div className={cn("px-4 py-8 sm:px-8 md:py-12", className)}>
            {children}
          </div>
        </div>
      </main>
    </>
  );
}

export function Pending() {
  return (
    <p className="label">Report for the example profile is still loading.</p>
  );
}

export function Avatar({
  src,
  login,
  size,
  className,
}: {
  src: string;
  login: string;
  size: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={`${login}'s avatar`}
      width={size}
      height={size}
      priority
      className={cn("border-border border", className)}
      style={{ width: size, height: size }}
    />
  );
}

export function RankedRepos({
  repos,
  max,
}: {
  repos: ContributionReport["stats"]["topRepositories"];
  max: number;
}) {
  return (
    <ol className="divide-border divide-y">
      {repos.map((repo, i) => (
        <li key={repo.nameWithOwner}>
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 py-3"
          >
            <span className="text-muted-foreground w-6 font-mono text-xs tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Image
              src={repo.ownerAvatarUrl}
              alt=""
              width={28}
              height={28}
              className="border-border size-7 rounded-md border"
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm">
                <span className="text-muted-foreground">{repo.owner}/</span>
                <span className="group-hover:text-accent font-medium">
                  {repo.name}
                </span>
              </div>
              <div className="bg-border mt-1.5 h-1 w-full overflow-hidden rounded-full">
                <div
                  className="bg-accent h-full"
                  style={{
                    width: `${Math.max(4, (repo.merged / max) * 100)}%`,
                  }}
                />
              </div>
            </div>
            <span className="tabular shrink-0 font-mono text-sm">
              {formatNumber(repo.merged)}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}
