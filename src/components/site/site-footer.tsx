import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Logo } from "./logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Share cards", href: "/#share" },
      { label: "FAQ", href: "/#faq" },
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
      { label: "GitHub API", href: "https://docs.github.com/en/graphql" },
      { label: "README badge", href: "/#share" },
      { label: "Self-host", href: `${siteConfig.repoUrl}#self-hosting` },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-12 md:grid-cols-5 md:px-8">
        <div className="col-span-2 flex flex-col gap-3">
          <Logo />
          <p className="text-muted-foreground max-w-xs text-sm">
            {siteConfig.tagline}
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <span className="label">{col.title}</span>
            <ul className="flex flex-col gap-2 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-foreground/80 hover:text-foreground"
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
      <div className="border-border border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
          <span className="label">
            © {new Date().getFullYear()} GitBrag — MIT licensed
          </span>
          <span className="label">Not affiliated with GitHub</span>
        </div>
      </div>
    </footer>
  );
}
