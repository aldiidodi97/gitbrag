import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { label: "Product", href: "/#product" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Share", href: "/#share" },
  { label: "Example", href: `/u/${siteConfig.exampleLogin}` },
];

export function SiteHeader() {
  return (
    <header className="border-border bg-background/85 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="w-full px-4 sm:px-6">
        <div className="border-border relative mx-auto w-full max-w-6xl border-x">
          <div className="flex h-14 items-center justify-between pr-2 pl-4">
            <div className="flex items-center gap-4">
              <Logo />
              <nav className="relative hidden items-center md:flex">
                {nav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground relative flex h-14 items-center px-3.5 text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground hidden px-2 text-sm font-medium transition-colors sm:inline-flex"
              >
                GitHub
              </a>
              <ThemeToggle />
              <MobileMenu items={nav} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
