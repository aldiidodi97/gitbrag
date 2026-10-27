import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroPreview } from "@/components/landing/hero-preview";
import { Faq, Features, HowItWorks } from "@/components/landing/sections";
import { UserSearch } from "@/components/search/user-search";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const examples = ["torvalds", "sindresorhus", "gaearon", "tj", "antfu"];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="dot-grid pointer-events-none absolute top-0 right-0 hidden h-[520px] w-[640px] md:block" />
          <div className="frame mx-auto max-w-6xl px-5 pt-20 pb-16 md:px-8 md:pt-28">
            <Link
              href="/#share"
              className="border-border bg-card text-muted-foreground hover:text-foreground inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs"
            >
              <span className="bg-accent text-accent-foreground rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase">
                New
              </span>
              Story-size share cards for Instagram
              <ArrowRight className="size-3" />
            </Link>
            <h1 className="mt-8 max-w-3xl text-5xl font-semibold tracking-[-0.03em] text-balance md:text-7xl">
              Your open-source work,{" "}
              <span className="text-accent">worth bragging about.</span>
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg">
              {siteConfig.description} Type a username, get a card, share it
              anywhere.
            </p>
            <div id="search" className="mt-10 max-w-xl scroll-mt-24">
              <UserSearch autoFocus />
              <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="label">Try</span>
                {examples.map((login) => (
                  <Link
                    key={login}
                    href={`/u/${login}`}
                    className="hover:text-accent font-mono text-xs"
                  >
                    {login}
                  </Link>
                ))}
              </div>
            </div>
            <div className="label mt-10 flex flex-wrap gap-x-6 gap-y-2">
              <span>No sign-in</span>
              <span>Public data only</span>
              <span>MIT licensed</span>
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
            <HeroPreview />
          </div>
        </section>

        <Features />
        <HowItWorks />

        <section
          id="share"
          className="border-border scroll-mt-20 border-t py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div className="min-w-0">
                <span className="label">[Share]</span>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                  Built to be posted.
                </h2>
                <p className="text-muted-foreground mt-4">
                  Every profile link unfurls into a rich preview on X, LinkedIn,
                  Facebook, Threads, Bluesky, WhatsApp and Slack. Prefer an
                  image? Download a 1:1 or 9:16 card. Want it on your README?
                  Embed the live SVG badge.
                </p>
                <pre className="border-border bg-muted text-muted-foreground mt-6 overflow-x-auto rounded-lg border p-4 font-mono text-xs">
                  {`![Open-source contributions](https://gitbrag.netlify.app/api/card/<username>.svg)`}
                </pre>
              </div>
              <div className="grid min-w-0 grid-cols-3 gap-3">
                {[
                  { label: "Link preview", ratio: "aspect-[1.91/1]" },
                  { label: "Square 1:1", ratio: "aspect-square" },
                  { label: "Story 9:16", ratio: "aspect-[9/16]" },
                ].map((card) => (
                  <div key={card.label} className="flex flex-col gap-2">
                    <div
                      className={`${card.ratio} border-border from-accent/90 to-accent/60 rounded-md border bg-gradient-to-br p-3`}
                    >
                      <div className="h-1.5 w-1/2 rounded bg-white/80" />
                      <div className="mt-2 h-1.5 w-1/3 rounded bg-white/50" />
                    </div>
                    <span className="label">{card.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Faq />

        <section className="border-border border-t">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <div className="hairline-corners border-border bg-card relative rounded-lg border px-6 py-16 text-center">
              <span className="corner" />
              <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl">
                Stop underselling. <br className="hidden md:block" /> Start
                bragging.
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-md">
                It takes a username and a few seconds to see what you have
                shipped upstream.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/#search" size="lg">
                  Get your card <ArrowRight />
                </ButtonLink>
                <ButtonLink
                  href={siteConfig.repoUrl}
                  variant="outline"
                  size="lg"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
