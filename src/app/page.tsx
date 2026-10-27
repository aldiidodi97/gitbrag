import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { LiveDashboard } from "@/components/landing/live-dashboard";
import {
  Cta,
  HowItWorks,
  Marquee,
  ProductGrid,
  ShareCarousel,
  StatsStrip,
} from "@/components/landing/sections";
import { UserSearch } from "@/components/search/user-search";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="w-full px-4 sm:px-6">
          <div className="border-border mx-auto w-full max-w-6xl border-x">
            <section className="border-border relative overflow-hidden border-b">
              <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[440px]" />
              <div className="bg-dotgrid pointer-events-none absolute inset-0 hidden [background-image:radial-gradient(var(--accent)_1.5px,transparent_1.5px)] [mask-image:radial-gradient(40%_55%_at_78%_30%,black,transparent_70%)] opacity-60 md:block" />
              <div className="relative px-6 pt-20 pb-14 sm:px-10 sm:pt-24">
                <h1
                  className="rise text-foreground mt-7 max-w-4xl text-5xl leading-[0.98] font-semibold tracking-[-0.035em] text-balance sm:text-7xl"
                  style={{ animationDelay: "80ms" }}
                >
                  Your open-source work,{" "}
                  <span className="text-accent">worth bragging about.</span>
                </h1>
                <p
                  className="rise text-muted-foreground mt-6 max-w-xl text-base leading-7 text-pretty sm:text-lg"
                  style={{ animationDelay: "160ms" }}
                >
                  GitBrag turns any GitHub username into a record of pull
                  requests sent to other people&apos;s projects: merged, ranked
                  by repository, and ready to post as a link, a card, or a
                  README badge.
                </p>
                <div
                  id="search"
                  className="rise mt-9 max-w-xl scroll-mt-24"
                  style={{ animationDelay: "240ms" }}
                >
                  <UserSearch autoFocus />
                </div>
                <div
                  className="rise mt-5 flex flex-wrap items-center gap-3"
                  style={{ animationDelay: "300ms" }}
                >
                  <ButtonLink href={`/u/${siteConfig.exampleLogin}`}>
                    See a live example <ArrowRight />
                  </ButtonLink>
                  <ButtonLink
                    href={siteConfig.repoUrl}
                    variant="outline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View the source
                  </ButtonLink>
                </div>
                <div
                  className="rise text-muted-foreground mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.12em] uppercase"
                  style={{ animationDelay: "360ms" }}
                >
                  <span>No sign-in</span>
                  <span className="inline-flex items-center gap-4">
                    <span className="bg-border-strong size-1" />
                    Public data only
                  </span>
                  <span className="inline-flex items-center gap-4">
                    <span className="bg-border-strong size-1" />
                    MIT licensed
                  </span>
                </div>
              </div>
              <Suspense fallback={<DashboardFallback />}>
                <LiveDashboard />
              </Suspense>
            </section>

            <Marquee />
            <ProductGrid />
            <Suspense>
              <HowItWorks />
            </Suspense>
            <Suspense>
              <StatsStrip />
            </Suspense>
            <ShareCarousel />
            <Cta />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function DashboardFallback() {
  return (
    <div className="relative px-6 pb-6 sm:px-10">
      <div
        aria-busy
        className="border-border-strong bg-background rounded-lg border p-6 text-sm"
      >
        <span className="text-muted-foreground font-mono text-[11px] tracking-[0.12em] uppercase">
          Loading the live example from GitHub...
        </span>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-16" />
          ))}
        </div>
        <div className="skeleton mt-4 h-40" />
      </div>
    </div>
  );
}
