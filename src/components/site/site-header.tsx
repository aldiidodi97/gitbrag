import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { label: "What counts", href: "/#what-counts" },
  { label: "Share cards", href: "/#share" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteHeader() {
  return (
    <header className="border-border bg-background sticky top-0 z-40 border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="text-muted-foreground hidden items-center gap-6 text-sm md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ButtonLink
            href={siteConfig.repoUrl}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hidden sm:inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </ButtonLink>
          <ThemeToggle />
          <ButtonLink href="/#search" size="sm">
            Look up a username
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
