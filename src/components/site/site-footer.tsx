import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Logo } from "./logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#product" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Share cards", href: "/#share" },
      { label: "README badge", href: "/#share" },
    ],
  },
  {
    title: "Open source",
    links: [
      { label: "Source code", href: siteConfig.repoUrl },
      { label: "Report an issue", href: `${siteConfig.repoUrl}/issues` },
      {
        label: "Contribute",
        href: `${siteConfig.repoUrl}/blob/main/CONTRIBUTING.md`,
      },
      { label: "MIT License", href: `${siteConfig.repoUrl}/blob/main/LICENSE` },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Self-host guide", href: `${siteConfig.repoUrl}#self-hosting` },
      {
        label: "GitHub GraphQL API",
        href: "https://docs.github.com/en/graphql",
      },
      { label: "Example profile", href: `/u/${siteConfig.exampleLogin}` },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-border w-full border-t px-4 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="border-border grid grid-cols-2 border-l md:grid-cols-4">
          <div className="border-border border-r border-b p-6">
            <Logo />
            <p className="text-muted-foreground mt-4 max-w-[16rem] text-sm leading-6">
              {siteConfig.tagline}
            </p>
          </div>
          {columns.map((col) => (
            <div
              key={col.title}
              className="border-border border-r border-b p-6"
            >
              <p className="text-muted-foreground font-mono text-[11px] tracking-[0.14em] uppercase">
                {col.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-foreground hover:text-accent text-sm transition-colors"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-border text-muted-foreground flex flex-col items-start justify-between gap-2 border-x border-b px-6 py-5 font-mono text-[11px] tracking-[0.12em] uppercase sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} GitBrag · MIT licensed</span>
          <span>Not affiliated with GitHub</span>
        </div>
      </div>
    </footer>
  );
}
