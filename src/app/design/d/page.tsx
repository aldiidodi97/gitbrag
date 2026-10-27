import Image from "next/image";
import { Suspense } from "react";
import { getExample } from "@/components/landing/example";
import { HowItWorks, ProductGrid } from "@/components/landing/sections";
import { UserSearch } from "@/components/search/user-search";
import { SiteHeader } from "@/components/site/site-header";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

async function HeroCard() {
  const r = await getExample();
  const login = siteConfig.exampleLogin;
  return (
    <div className="relative mx-auto mt-14 max-w-4xl">
      <div className="bg-accent/20 absolute inset-x-10 -bottom-6 h-24 rounded-full blur-3xl" />
      <Image
        src={`/api/card/${login}.png?format=og`}
        alt={`Share card for ${login}`}
        width={1200}
        height={630}
        unoptimized
        priority
        className="border-border relative w-full rounded-2xl border shadow-2xl"
      />
      {r?.status === "ready" ? (
        <p className="text-muted-foreground mt-4 text-center font-mono text-xs">
          Generated live for @{login} · {r.report.stats.merged} merged pull
          requests
        </p>
      ) : null}
    </div>
  );
}

export default function OptionD() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="px-6 pt-20 pb-24 text-center md:pt-28">
          <h1 className="mx-auto max-w-3xl text-5xl leading-[1.0] font-semibold tracking-[-0.03em] text-balance md:text-7xl">
            Turn your GitHub username into a card worth posting.
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg leading-7">
            Merged pull requests to other people&apos;s projects, the
            repositories they landed in, and the stars those projects carry.
          </p>
          <div id="search" className="mx-auto mt-9 max-w-xl text-left">
            <UserSearch autoFocus />
          </div>
          <Suspense>
            <HeroCard />
          </Suspense>
        </section>
        <div className="mx-auto max-w-6xl rounded-3xl">
          <ProductGrid />
          <Suspense>
            <HowItWorks />
          </Suspense>
        </div>
      </main>
    </>
  );
}
