import { Suspense } from "react";
import Link from "next/link";
import {
  LiveExample,
  LiveExampleSkeleton,
} from "@/components/landing/live-example";
import { Faq, ShareSection, WhatCounts } from "@/components/landing/sections";
import { UserSearch } from "@/components/search/user-search";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { requestSiteUrl } from "@/lib/site-request";

export const dynamic = "force-dynamic";

const examples = ["torvalds", "sindresorhus", "gaearon", "tj", "antfu"];

export default async function HomePage() {
  const siteUrl = await requestSiteUrl();
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="frame mx-auto max-w-6xl px-5 pt-16 pb-12 md:px-8 md:pt-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="min-w-0 lg:col-span-7">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.03em] text-balance md:text-6xl">
                Your open-source work, worth bragging about.
              </h1>
              <p className="text-muted-foreground mt-6 max-w-xl text-lg">
                Type a GitHub username. GitBrag lists every pull request that
                person sent to projects they do not own, with the ones that were
                merged, and turns it into a page you can share.
              </p>
            </div>
            <div className="min-w-0 lg:col-span-5">
              <div id="search" className="scroll-mt-24">
                <UserSearch autoFocus />
                <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span>Try</span>
                  {examples.map((login) => (
                    <Link
                      key={login}
                      href={`/u/${login}`}
                      className="hover:text-accent inline-flex min-h-8 items-center font-mono text-xs"
                    >
                      {login}
                    </Link>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mt-6 text-sm">
                No sign-in. Public data only. MIT licensed.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
          <Suspense fallback={<LiveExampleSkeleton />}>
            <LiveExample />
          </Suspense>
        </section>

        <WhatCounts />
        <ShareSection siteUrl={siteUrl} />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
