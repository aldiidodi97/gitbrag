import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { getExample } from "@/components/landing/example";
import { LiveDashboard } from "@/components/landing/live-dashboard";
import { Cta, HowItWorks, ShareCarousel } from "@/components/landing/sections";
import { UserSearch } from "@/components/search/user-search";
import { SiteHeader } from "@/components/site/site-header";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { formatCompact, formatNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function Facts() {
  const r = await getExample();
  if (r?.status !== "ready") return null;
  const { stats, user } = r.report;
  const facts = [
    [formatNumber(stats.merged), "merged pull requests"],
    [formatNumber(stats.repositories), "projects"],
    [formatCompact(stats.totalStars), "stars reached"],
    [String(stats.yearsActive), "years active"],
  ];
  return (
    <div className="grid gap-10 md:grid-cols-2 md:items-center">
      <dl className="divide-border divide-y">
        {facts.map(([v, l]) => (
          <div key={l} className="flex items-baseline justify-between py-5">
            <dt className="text-muted-foreground text-sm">{l}</dt>
            <dd className="font-mono text-4xl font-semibold tabular-nums md:text-5xl">
              {v}
            </dd>
          </div>
        ))}
        <p className="text-muted-foreground pt-4 font-mono text-xs">
          Live numbers for @{user.login}
        </p>
      </dl>
      <Image
        src={`/api/card/${user.login}.png?format=og`}
        alt=""
        width={1200}
        height={630}
        unoptimized
        className="border-border w-full rounded-xl border shadow-2xl"
      />
    </div>
  );
}

export default function OptionA() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 pt-24 pb-20 md:px-10 md:pt-36">
          <h1 className="max-w-5xl text-6xl leading-[0.95] font-semibold tracking-[-0.04em] text-balance md:text-8xl">
            Every pull request you ever sent upstream, on one page.
          </h1>
          <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-end">
            <p className="text-muted-foreground text-xl leading-8 md:col-span-5">
              GitBrag reads a GitHub username and lists the pull requests sent
              to projects the person does not own: merged, ranked by repository,
              ready to share.
            </p>
            <div id="search" className="md:col-span-7">
              <UserSearch autoFocus />
            </div>
          </div>
        </section>
        <section className="border-border border-t">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
            <Suspense>
              <Facts />
            </Suspense>
          </div>
        </section>
        <section className="bg-muted border-border border-y py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <h2 className="max-w-xl text-4xl font-semibold tracking-tight">
              The profile page, as it renders today.
            </h2>
            <div className="mt-10">
              <Suspense>
                <LiveDashboard />
              </Suspense>
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-7xl">
          <Suspense>
            <HowItWorks />
          </Suspense>
          <ShareCarousel />
          <Cta />
        </div>
        <p className="sr-only">
          <ButtonLink href={`/u/${siteConfig.exampleLogin}`}>
            example <ArrowRight />
          </ButtonLink>
        </p>
      </main>
    </>
  );
}
