import Image from "next/image";
import Link from "next/link";
import { ReportWarmup } from "@/components/profile/report-warmup";
import { hasGitHubToken, loadReport } from "@/lib/github";
import { siteConfig } from "@/lib/site";
import { formatCompact, formatNumber } from "@/lib/utils";

/**
 * The landing page shows one real profile instead of a mock: every number
 * here comes from the same report the profile page renders.
 */
export async function LiveExample() {
  const login = siteConfig.exampleLogin;
  if (!hasGitHubToken()) {
    return (
      <Frame login={login}>
        <p className="text-muted-foreground p-6 text-sm">
          The live example needs a <code>GITHUB_TOKEN</code> on the server.
          Search for any username above to see a profile.
        </p>
      </Frame>
    );
  }

  let result;
  try {
    result = await loadReport(login);
  } catch {
    return (
      <Frame login={login}>
        <p className="text-muted-foreground p-6 text-sm">
          GitHub did not answer in time, so the live example is unavailable
          right now. Search for any username above instead.
        </p>
      </Frame>
    );
  }

  if (result.status === "pending") {
    return (
      <Frame login={login}>
        <div className="p-4">
          <ReportWarmup login={login} initial={result.progress} />
        </div>
      </Frame>
    );
  }

  const { user, stats } = result.report;
  const months = stats.monthly.slice(-12);
  const max = Math.max(1, ...months.map((m) => m.merged));
  const kpis = [
    { label: "Merged PRs", value: formatNumber(stats.merged) },
    { label: "Projects", value: formatNumber(stats.repositories) },
    { label: "Stars reached", value: formatCompact(stats.totalStars) },
  ];

  return (
    <Frame login={user.login}>
      <div className="flex items-center gap-3 px-4 py-3">
        <Image
          src={user.avatarUrl}
          alt=""
          width={36}
          height={36}
          className="border-border size-9 rounded-md border"
        />
        <div className="min-w-0">
          <div className="truncate font-semibold">
            {user.name ?? user.login}
          </div>
          <div className="text-muted-foreground font-mono text-xs">
            @{user.login}
          </div>
        </div>
      </div>
      <div className="bg-border border-border grid gap-px border-y sm:grid-cols-3">
        {kpis.map((k) => (
          <div key={k.label} className="bg-card px-4 py-3">
            <span className="label">{k.label}</span>
            <div className="tabular mt-1.5 font-mono text-2xl font-medium">
              {k.value}
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-6 p-4 md:grid-cols-5">
        <div className="md:col-span-3">
          <span className="label">Merged per month, last 12 months</span>
          <div className="mt-3 flex h-24 items-end gap-1.5">
            {months.map((m) => (
              <span
                key={m.month}
                title={`${m.month}: ${m.merged} merged`}
                className="bg-accent flex-1 rounded-[2px]"
                style={{ height: `${Math.max(3, (m.merged / max) * 100)}%` }}
              />
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <span className="label">Most pull requests to</span>
          <ul className="mt-3 flex flex-col gap-2 text-xs">
            {stats.topRepositories.slice(0, 4).map((r) => (
              <li
                key={r.nameWithOwner}
                className="flex items-center justify-between gap-2"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ background: r.language?.color ?? "currentColor" }}
                  />
                  <span className="truncate font-medium">
                    {r.nameWithOwner}
                  </span>
                </span>
                <span className="tabular text-muted-foreground font-mono">
                  {r.merged} merged
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  );
}

function Frame({
  login,
  children,
}: {
  login: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border bg-card rounded-lg border">
      <div className="border-border flex items-center justify-between border-b px-4 py-2.5">
        <span className="text-muted-foreground font-mono text-xs">
          Live example / u / {login}
        </span>
        <Link
          href={`/u/${login}`}
          className="text-foreground hover:text-accent inline-flex min-h-8 items-center text-xs font-medium"
        >
          Open full profile
        </Link>
      </div>
      {children}
    </div>
  );
}

export function LiveExampleSkeleton() {
  return (
    <div
      aria-busy
      className="border-border bg-card rounded-lg border p-6 text-sm"
    >
      <span className="text-muted-foreground">
        Loading the live example from GitHub...
      </span>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton h-14" />
        ))}
      </div>
    </div>
  );
}
