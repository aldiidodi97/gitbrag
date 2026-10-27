import {
  Check,
  GitMerge,
  Image as ImageIcon,
  Search,
  Share2,
  Sparkles,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="label">[{eyebrow}]</span>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground mt-4">{description}</p>
      ) : null}
    </div>
  );
}

const features = [
  {
    id: "F-01",
    title: "Merged, not just opened",
    description:
      "Counts the pull requests that actually landed in projects you don't own. Forks and your own repositories are filtered out automatically.",
    Icon: GitMerge,
  },
  {
    id: "F-02",
    title: "Every project, ranked",
    description:
      "See which repositories you shipped to most, how many stars they carry, and the languages you touched along the way.",
    Icon: Sparkles,
  },
  {
    id: "F-03",
    title: "Share cards that look good",
    description:
      "A rich preview is generated for every profile link, plus downloadable square and story-size cards for Instagram, LinkedIn and X.",
    Icon: ImageIcon,
  },
  {
    id: "F-04",
    title: "Fast and anonymous",
    description:
      "No sign-up, no OAuth, nothing to install. Results are cached for an hour so shared links open instantly.",
    Icon: Zap,
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="border-border scroll-mt-20 border-t py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to prove your open-source track record."
        />
        <div className="border-border bg-border mt-14 grid gap-px overflow-hidden rounded-lg border md:grid-cols-2">
          {features.map(({ id, title, description, Icon }) => (
            <article key={id} className="bg-card flex flex-col gap-4 p-7">
              <div className="flex items-center justify-between">
                <span className="border-border bg-muted text-accent flex size-9 items-center justify-center rounded-md border">
                  <Icon className="size-4" />
                </span>
                <span className="label">{id}</span>
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    Icon: Search,
    title: "Type a username",
    text: "Any public GitHub account works: yours, a teammate's, a maintainer you admire.",
  },
  {
    Icon: GitMerge,
    title: "We collect the pull requests",
    text: "GitBrag queries GitHub's API for every pull request the user authored in repositories they don't own, then groups and ranks them.",
  },
  {
    Icon: Share2,
    title: "Share the card",
    text: "Post the link on X, LinkedIn, Threads or Bluesky, download a PNG, or embed the live SVG badge in your README.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-border bg-muted/40 scroll-mt-20 border-t py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:items-center md:px-8">
        <div>
          <span className="label">[How it works]</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            From username to brag-worthy card in seconds.
          </h2>
          <p className="text-muted-foreground mt-4">
            No account, no browser extension. GitBrag reads only public data and
            never asks for access to your GitHub account.
          </p>
          <ul className="mt-8 flex flex-col gap-3 text-sm">
            {[
              "Pull requests to repositories you don't own",
              "Merged, open and closed states kept separate",
              "Hide pull requests to your own organizations with one toggle",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="text-accent mt-0.5 size-4 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <ol className="border-border bg-border flex flex-col gap-px overflow-hidden rounded-lg border">
          {steps.map(({ Icon, title, text }, i) => (
            <li key={title} className="bg-card flex gap-4 p-6">
              <span className="border-border bg-muted text-accent flex size-9 shrink-0 items-center justify-center rounded-md border font-mono text-xs">
                0{i + 1}
              </span>
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <Icon className="text-muted-foreground size-4" />
                  {title}
                </div>
                <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "What counts as an open-source contribution?",
    a: "Pull requests you authored in public repositories that you do not own. Your own repositories and forks are excluded. Merged, open and closed pull requests are shown separately, and merged ones drive the headline number.",
  },
  {
    q: "Why does my count differ from my GitHub profile graph?",
    a: "GitHub's contribution graph includes commits to your own repositories and private work. GitBrag deliberately only counts pull requests to other people's projects.",
  },
  {
    q: "Do I need to sign in?",
    a: "No. GitBrag only reads public data with a server-side token. Nothing is stored about you beyond a one-hour cache of the results.",
  },
  {
    q: "Can I self-host it?",
    a: "Yes. GitBrag is MIT licensed and deploys to Netlify or Vercel with one environment variable. See the README on GitHub.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="border-border scroll-mt-20 border-t py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." />
        <dl className="divide-border border-border bg-card mt-12 divide-y rounded-lg border">
          {faqs.map(({ q, a }) => (
            <div key={q} className="p-6">
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
