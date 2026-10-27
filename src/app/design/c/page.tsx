import { Suspense } from "react";
import { LiveDashboard } from "@/components/landing/live-dashboard";
import { ShareCarousel, StatsStrip } from "@/components/landing/sections";
import { UserSearch } from "@/components/search/user-search";
import { SiteHeader } from "@/components/site/site-header";

export const dynamic = "force-dynamic";

const points = [
  [
    "01",
    "Pull requests to repositories you do not own. Forks and your own repos are left out.",
  ],
  [
    "02",
    "Merged, open and closed are counted separately, so the merged number means something.",
  ],
  [
    "03",
    "One link unfurls into a card on X, LinkedIn and Bluesky; PNG and SVG badge included.",
  ],
];

export default function OptionC() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
          <aside className="md:sticky md:top-24 md:col-span-5 md:self-start">
            <h1 className="text-5xl leading-[1.0] font-semibold tracking-[-0.03em] text-balance md:text-6xl">
              Your upstream work, counted and shareable.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-md text-lg leading-7">
              GitBrag builds a public report of the pull requests a GitHub user
              sent to projects they do not own.
            </p>
            <div id="search" className="mt-8">
              <UserSearch autoFocus />
            </div>
            <ol className="mt-10 flex flex-col gap-5">
              {points.map(([n, t]) => (
                <li key={n} className="flex gap-4">
                  <span className="text-accent font-mono text-sm">{n}</span>
                  <p className="text-muted-foreground text-sm leading-6">{t}</p>
                </li>
              ))}
            </ol>
          </aside>
          <div className="md:col-span-7">
            <Suspense>
              <LiveDashboard />
            </Suspense>
            <Suspense>
              <StatsStrip />
            </Suspense>
            <ShareCarousel />
          </div>
        </div>
      </main>
    </>
  );
}
