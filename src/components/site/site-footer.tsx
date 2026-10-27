import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Logo } from "./logo";

const links = [
  { label: "Source code", href: siteConfig.repoUrl },
  { label: "Report an issue", href: `${siteConfig.repoUrl}/issues` },
  { label: "Self-host guide", href: `${siteConfig.repoUrl}#self-hosting` },
  { label: "MIT License", href: `${siteConfig.repoUrl}/blob/main/LICENSE` },
];

export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="text-muted-foreground text-sm">
            Reads public GitHub data only. Not affiliated with GitHub.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-foreground/80 hover:text-foreground inline-flex min-h-11 items-center md:min-h-0"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
