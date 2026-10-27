import {
  ArrowRight,
  Check,
  FolderGit2,
  GitMerge,
  Image as ImageIcon,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { formatCompact, formatNumber } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { getExample } from "./example";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-border text-muted-foreground inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] uppercase">
      <span className="text-accent">[</span>
      {children}
      <span className="text-accent">]</span>
    </span>
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
              <span className="border-border-strong text-accent grid size-10 place-items-center rounded-md border">
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
                <span className="bg-accent text-accent-fg mt-0.5 grid size-4 shrink-0 place-items-center rounded-sm">
                  <Check className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-dotgrid flex flex-col justify-center gap-3 p-8 sm:p-12">
          <div className="border-border-strong bg-background overflow-hidden rounded-md border">
            <div className="border-border text-muted-foreground flex items-center gap-2 border-b px-3 py-2 font-mono text-[11px] tracking-[0.12em] uppercase">
              <span className="bg-accent size-2" />
              Look up
            </div>
            <div className="flex items-center justify-between gap-3 px-3 py-3">
              <span className="text-foreground text-sm">
                github.com/{siteConfig.exampleLogin}
              </span>
              <span className="bg-accent text-accent-fg grid size-6 shrink-0 place-items-center rounded-sm">
                <ArrowRight className="size-3.5" />
              </span>
            </div>
          </div>
          <div className="border-border bg-background rounded-md border p-3">
            <p className="text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase">
              Merged pull requests · per year
            </p>
            {years.length > 0 ? (
              <div className="mt-3 flex h-24 items-end gap-1.5">
                {years.map((y, i) => (
                  <span
                    key={y.year}
                    title={`${y.year}: ${y.merged} merged`}
                    className="bg-accent/70 grow-y flex-1 rounded-sm"
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

const shareCards = [
  {
    format: "og",
    label: "Link preview",
    size: "1200 x 630",
    width: 1200,
    height: 630,
  },
  {
    format: "square",
    label: "Square",
    size: "1080 x 1080",
    width: 1080,
    height: 1080,
  },
  {
    format: "story",
    label: "Story",
    size: "1080 x 1920",
    width: 1080,
    height: 1920,
  },
];

export function ShareCarousel() {
  const login = siteConfig.exampleLogin;
  return (
    <section
      id="share"
      className="border-border w-full scroll-mt-14 border-b px-6 py-16 sm:px-10 sm:py-24"
    >
      <div className="max-w-2xl">
        <Eyebrow>Share</Eyebrow>
        <h2 className="text-foreground mt-6 text-3xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
          One link, three images, one README badge.
        </h2>
        <p className="text-muted-foreground mt-5 max-w-md leading-7 text-pretty">
          Every profile link unfurls into a preview card on X, LinkedIn,
          Bluesky, Threads, WhatsApp and Slack. The same card downloads as a
          square or story PNG, and the SVG badge updates itself.
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:gap-5">
        {shareCards.map((card) => (
          <figure key={card.format} className="flex flex-col gap-2">
            <Image
              src={`/api/card/${login}.png?format=${card.format}`}
              alt={`${card.label} share card for ${login}`}
              width={card.width}
              height={card.height}
              unoptimized
              loading="eager"
              className="border-border h-44 w-auto rounded-lg border md:h-64"
            />
            <figcaption className="text-muted-foreground font-mono text-[11px] tracking-[0.12em] uppercase">
              {card.label} · {card.size}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section className="w-full px-6 py-20 sm:px-10">
      <div className="border-border bg-accent-soft relative rounded-xl border px-6 py-16 text-center sm:px-10 sm:py-20">
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
