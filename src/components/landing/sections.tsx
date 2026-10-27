import {
  ArrowRight,
  Check,
  FolderGit2,
  GitMerge,
  Image as ImageIcon,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { formatCompact, formatNumber } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { CardsCarousel } from "./cards-carousel";
import { getExample } from "./example";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-border text-muted-foreground inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] uppercase">
      <span className="text-accent">[</span>
      {children}
      <span className="text-accent">]</span>
    </span>
  );
}

const marquee = [
  "torvalds",
  "sindresorhus",
  "gaearon",
  "tj",
  "antfu",
  "kentcdodds",
  "yyx990803",
  "addyosmani",
  "mitchellh",
  "feross",
];

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <section
      id="customers"
      className="border-border w-full overflow-hidden border-b"
    >
      <p className="border-border text-muted-foreground border-b px-6 py-3 text-center font-mono text-[11px] tracking-[0.16em] uppercase sm:px-10">
        Profiles people look up on GitBrag
      </p>
      <div className="relative py-8">
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l to-transparent" />
        <div className="marquee-track flex w-max items-center gap-12 pr-12">
          {items.map((login, i) => (
            <Link
              key={`${login}-${i}`}
              href={`/u/${login}`}
              className="text-muted-foreground hover:text-accent flex shrink-0 items-center gap-2.5 transition-colors duration-200"
            >
              <Image
                src={`https://github.com/${login}.png?size=48`}
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
              <span className="text-lg font-semibold tracking-tight">
                {login}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    id: "F-01",
    span: "sm:col-span-2",
    Icon: GitMerge,
    title: "Merged, not just opened",
    text: "Every pull request the user authored in repositories they do not own, grouped by project, with merged, open and closed kept apart. Own repositories and forks are filtered out.",
  },
  {
    id: "F-02",
    span: "sm:col-span-1",
    Icon: FolderGit2,
    title: "Projects, ranked",
    text: "Which repositories they shipped to most, the stars those repositories carry, and the languages touched.",
  },
  {
    id: "F-03",
    span: "sm:col-span-1",
    Icon: ImageIcon,
    title: "Share cards",
    text: "A link preview for X, LinkedIn and Bluesky, square and story PNGs, and a live SVG badge for a README.",
  },
  {
    id: "F-04",
    span: "sm:col-span-2",
    Icon: ShieldCheck,
    title: "No sign-in, public data only",
    text: "GitBrag reads GitHub's public API with its own server-side token. Nothing is stored about you beyond a one-hour cache, and the code is MIT licensed.",
  },
];

export function ProductGrid() {
  return (
    <section
      id="product"
      className="border-border w-full scroll-mt-14 border-b px-6 py-24 sm:px-10 sm:py-28"
    >
      <div className="max-w-2xl">
        <Eyebrow>Product</Eyebrow>
        <h2 className="text-foreground mt-6 text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
          Everything you need to show what you shipped upstream.
        </h2>
      </div>
      <div className="border-border mt-12 grid grid-cols-1 border-t border-l sm:grid-cols-3">
        {features.map(({ id, span, Icon, title, text }, i) => (
          <div
            key={id}
            className={`border-border rise flex min-h-52 flex-col justify-between border-r border-b p-7 ${span}`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between">
              <span className="border-border-strong text-accent grid size-10 place-items-center border">
                <Icon className="size-4" />
              </span>
              <span className="text-muted-foreground font-mono text-[11px] tracking-[0.14em]">
                {id}
              </span>
            </div>
            <div>
              <h3 className="text-foreground text-lg font-semibold tracking-tight">
                {title}
              </h3>
              <p className="text-muted-foreground mt-2 max-w-md text-sm leading-6 text-pretty">
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export async function HowItWorks() {
  const result = await getExample();
  const years =
    result?.status === "ready" ? result.report.stats.yearly.slice(-8) : [];
  const max = Math.max(...years.map((y) => y.merged), 1);
  return (
    <section
      id="how-it-works"
      className="border-border bg-card w-full scroll-mt-14 border-b"
    >
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        <div className="border-border border-b p-8 sm:p-12 lg:border-r lg:border-b-0">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-foreground mt-6 max-w-md text-3xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
            Type a username. Get the card in seconds.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-md leading-7 text-pretty">
            GitBrag asks GitHub for every pull request the user authored outside
            their own repositories, groups them by project, and turns the result
            into a page and a set of images you can post anywhere.
          </p>
          <ul className="mt-7 flex flex-col gap-3">
            {[
              "Pull requests to repositories the user does not own, forks excluded",
              "Merged, open and closed states kept separate; archived projects still count",
              "Hide pull requests to your own organizations with one toggle",
            ].map((item) => (
              <li
                key={item}
                className="text-foreground flex items-start gap-3 text-sm leading-6"
              >
                <span className="bg-accent text-accent-fg mt-0.5 grid size-4 shrink-0 place-items-center">
                  <Check className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-dotgrid flex flex-col justify-center gap-3 p-8 sm:p-12">
          <div className="border-border-strong bg-background border">
            <div className="border-border text-muted-foreground flex items-center gap-2 border-b px-3 py-2 font-mono text-[11px] tracking-[0.12em] uppercase">
              <span className="bg-accent size-2" />
              Look up
            </div>
            <div className="flex items-center justify-between gap-3 px-3 py-3">
              <span className="text-foreground text-sm">
                github.com/{siteConfig.exampleLogin}
              </span>
              <span className="bg-accent text-accent-fg grid size-6 shrink-0 place-items-center">
                <ArrowRight className="size-3.5" />
              </span>
            </div>
          </div>
          <div className="border-border bg-background border p-3">
            <p className="text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase">
              Merged pull requests · per year
            </p>
            {years.length > 0 ? (
              <div className="mt-3 flex h-24 items-end gap-1.5">
                {years.map((y, i) => (
                  <span
                    key={y.year}
                    title={`${y.year}: ${y.merged} merged`}
                    className="bg-accent/70 grow-y flex-1"
                    style={{
                      height: `${Math.max(4, (y.merged / max) * 100)}%`,
                      animationDelay: `${i * 70}ms`,
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mt-3 text-sm">
                Loading the live example...
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function StatsStrip() {
  const result = await getExample();
  if (result?.status !== "ready") return null;
  const { stats, user } = result.report;
  const items = [
    {
      value: formatNumber(stats.merged),
      label: "Merged pull requests",
      hint: `by @${user.login}`,
    },
    {
      value: formatNumber(stats.repositories),
      label: "Projects contributed to",
      hint: `${formatNumber(stats.organizations)} different owners`,
    },
    {
      value: formatCompact(stats.totalStars),
      label: "Stars reached",
      hint: "sum across those projects",
    },
    {
      value: String(stats.yearsActive),
      label: "Years active",
      hint: `since ${stats.firstContribution?.slice(0, 4) ?? "n/a"}`,
    },
  ];
  return (
    <section className="border-border w-full border-b px-6 py-14 sm:px-10">
      <div className="border-border grid w-full grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s, i) => (
          <div
            key={s.label}
            className="border-border rise border-r border-b px-6 py-7 sm:py-8"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <p className="text-foreground font-mono text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
              {s.value}
            </p>
            <p className="text-foreground mt-3 text-sm font-medium">
              {s.label}
            </p>
            <p className="text-muted-foreground mt-0.5 font-mono text-[11px] tracking-[0.1em] uppercase">
              {s.hint}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ShareCarousel() {
  return (
    <section
      id="share"
      className="border-border w-full scroll-mt-14 border-b px-6 py-16 sm:px-10 sm:py-28"
    >
      <CardsCarousel login={siteConfig.exampleLogin} />
    </section>
  );
}

export function Cta() {
  return (
    <section className="w-full px-6 py-20 sm:px-10">
      <div className="bg-hatch border-border border">
        <div className="border-border-strong bg-background relative m-3 border px-6 py-16 text-center sm:px-10 sm:py-20">
          <Corners inset="inset-3" />
          <h2 className="text-foreground mx-auto block max-w-2xl text-4xl leading-[1.0] font-semibold tracking-[-0.03em] text-balance sm:text-6xl">
            <span className="block">Stop underselling.</span>
            <span className="block">Start bragging.</span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-5 max-w-md leading-7 text-pretty">
            Type a username, get the page and the cards. It takes a few seconds
            and no account.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/#search">
              Get your card <ArrowRight />
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
        </div>
      </div>
    </section>
  );
}

export function Corners({ inset = "inset-5" }: { inset?: string }) {
  return (
    <div className={`pointer-events-none absolute ${inset}`}>
      <span className="border-border-strong absolute -top-px -left-px size-3 border-t border-l" />
      <span className="border-border-strong absolute -top-px -right-px size-3 border-t border-r" />
      <span className="border-border-strong absolute -bottom-px -left-px size-3 border-b border-l" />
      <span className="border-border-strong absolute -right-px -bottom-px size-3 border-r border-b" />
    </div>
  );
}
