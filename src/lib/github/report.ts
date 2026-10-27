import { unstable_cache } from "next/cache";
import { cache } from "react";
import { expandReport, toCompactReport, type CompactReport } from "./compact";
import { fetchPullRequests, fetchUser, normalizeLogin } from "./contributions";
import type { ContributionReport, GitHubUser } from "./types";

export const REPORT_REVALIDATE_SECONDS = 60 * 60;

async function buildReport(login: string): Promise<CompactReport> {
  const user = await fetchUser(login);
  const { pullRequests, truncated } = await fetchPullRequests(user);
  return toCompactReport(user, pullRequests, truncated);
}

/**
 * `unstable_cache` derives its key from the callback's source code. Bundlers
 * emit different import bindings for pages, route handlers and OG images, so a
 * callback that references imports directly would get one cache entry per
 * layer. Routing through `globalThis` keeps the callback source identical and
 * the cache shared.
 */
declare global {
  var __gitbragBuilders:
    { report: typeof buildReport; user: typeof fetchUser } | undefined;
}
globalThis.__gitbragBuilders = { report: buildReport, user: fetchUser };

/** Cached in a compact form so even very active contributors stay under the cache size limit. */
const cachedReport = unstable_cache(
  async (login: string) => globalThis.__gitbragBuilders!.report(login),
  ["contribution-report", "v1"],
  { revalidate: REPORT_REVALIDATE_SECONDS, tags: ["contribution-report"] },
);

const cachedUser = unstable_cache(
  async (login: string) => globalThis.__gitbragBuilders!.user(login),
  ["github-user", "v1"],
  { revalidate: REPORT_REVALIDATE_SECONDS, tags: ["github-user"] },
);

/** Profile only: fast, used to render the page header before pull requests arrive. */
export const getUser = cache(async (rawLogin: string): Promise<GitHubUser> => {
  return cachedUser(normalizeLogin(rawLogin).toLowerCase());
});

/**
 * Loads a user's contribution report. Cached per login for one hour so that
 * repeat visits and shared links do not hit the GitHub API again. Deduplicated
 * per request so `generateMetadata`, the page and the OG image share one load.
 */
export const getContributionReport = cache(
  async (rawLogin: string): Promise<ContributionReport> => {
    const login = normalizeLogin(rawLogin).toLowerCase();
    return expandReport(await cachedReport(login));
  },
);
