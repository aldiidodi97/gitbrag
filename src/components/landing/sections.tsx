import Image from "next/image";
import { siteConfig } from "@/lib/site";

const included = [
  "Pull requests you authored in public repositories owned by someone else",
  "Merged, open and closed pull requests, each counted separately",
  "Archived projects (the work still happened)",
];

const excluded = [
  "Your own repositories and your forks",
  "Private repositories and anything GitHub does not expose publicly",
  "Issues, reviews and direct commits (pull requests only)",
  "Optionally, repositories of organizations you belong to (one toggle on the profile)",
];

export function WhatCounts() {
  return (
    <section
      id="what-counts"
      className="border-border scroll-mt-20 border-t py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-5 md:gap-16 md:px-8">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Only work that landed in other people&apos;s projects.
          </h2>
          <p className="text-muted-foreground mt-4">
            GitHub&apos;s contribution graph mixes in commits to your own
            repositories and private work. GitBrag asks a narrower question:
            which pull requests did you send upstream, and which were merged?
          </p>
          <p className="text-muted-foreground mt-4 text-sm">
            Data comes from GitHub&apos;s public API, is cached for one hour,
            and is fetched without you signing in to anything.
          </p>
        </div>
        <div className="border-border divide-border grid divide-y rounded-lg border md:col-span-3 md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="p-6">
            <h3 className="text-accent font-semibold">Counted</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {included.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="bg-accent mt-2 size-1.5 shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6">
            <h3 className="text-muted-foreground font-semibold">Left out</h3>
            <ul className="text-muted-foreground mt-4 flex flex-col gap-3 text-sm">
              {excluded.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="bg-border-strong mt-2 size-1.5 shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const cards = [
  { format: "og", label: "Link preview, 1200 x 630", width: 1200, height: 630 },
  { format: "square", label: "Square, 1080 x 1080", width: 1080, height: 1080 },
  { format: "story", label: "Story, 1080 x 1920", width: 1080, height: 1920 },
];

export function ShareSection({ siteUrl }: { siteUrl: string }) {
  const login = siteConfig.exampleLogin;
  return (
    <section
      id="share"
      className="border-border bg-muted/40 scroll-mt-20 border-t py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            One link, three images, one README badge.
          </h2>
          <p className="text-muted-foreground mt-4">
            Every profile link unfurls into a preview card on X, LinkedIn,
            Bluesky, Threads, WhatsApp and Slack. The same card is available as
            a square or story-size PNG, and the SVG badge below updates itself
            from the live data.
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:gap-4">
          {cards.map((card) => (
            <figure key={card.format} className="flex shrink-0 flex-col gap-2">
              <Image
                src={`/api/card/${login}.png?format=${card.format}`}
                alt={`${card.label} share card for ${login}`}
                width={card.width}
                height={card.height}
                unoptimized
                className="border-border h-44 w-auto rounded-md border md:h-72"
              />
              <figcaption className="text-muted-foreground font-mono text-xs">
                {card.label}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-5 md:items-center">
          <div className="md:col-span-2">
            <h3 className="font-semibold">README badge</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Paste this into any Markdown file. It renders the current counts
              and links back to the profile.
            </p>
          </div>
          <div className="min-w-0 md:col-span-3">
            <Image
              src={`/api/card/${login}.svg`}
              alt={`README badge for ${login}`}
              width={495}
              height={195}
              unoptimized
              className="h-auto w-full max-w-md"
            />
            <pre className="border-border bg-card text-muted-foreground mt-3 overflow-x-auto rounded-md border p-4 font-mono text-xs">
              {`[![Open-source contributions](${siteUrl}/api/card/<username>.svg)](${siteUrl}/u/<username>)`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Why is my number lower than the contributions on my GitHub profile?",
    a: "GitHub's graph counts commits, issues and reviews, including those in your own repositories and private work. GitBrag counts only pull requests you sent to repositories you do not own.",
  },
  {
    q: "Someone's profile shows a progress bar. Is it broken?",
    a: "No. Very active contributors have thousands of pull requests, and GitHub returns them 100 at a time. The page keeps fetching in the background and switches to the full report on its own, usually within half a minute. After that it loads instantly for an hour.",
  },
  {
    q: "Does GitBrag need access to my GitHub account?",
    a: "No. It reads public data with its own server-side token. There is no sign-in and nothing is stored about you beyond a one-hour cache of the report.",
  },
  {
    q: "Can I run my own copy?",
    a: "Yes. GitBrag is MIT licensed, deploys to Netlify or Vercel, and needs one environment variable: a GitHub token with public read access. The README on GitHub has the steps.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="border-border scroll-mt-20 border-t py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-5 md:gap-16 md:px-8">
        <h2 className="text-3xl font-semibold tracking-tight md:col-span-2 md:text-4xl">
          Questions people ask
        </h2>
        <dl className="divide-border divide-y md:col-span-3">
          {faqs.map(({ q, a }) => (
            <div key={q} className="py-5 first:pt-0 last:pb-0">
              <dt className="font-semibold">{q}</dt>
              <dd className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
