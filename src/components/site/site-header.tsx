import { Star } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="text-muted-foreground hidden items-center gap-6 text-sm md:flex">
            <Link href="/#features" className="hover:text-foreground">
              Features
            </Link>
            <Link href="/#how-it-works" className="hover:text-foreground">
              How it works
            </Link>
            <Link href="/#faq" className="hover:text-foreground">
              FAQ
            </Link>
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
            <Star />
            Star on GitHub
          </ButtonLink>
          <ThemeToggle />
          <ButtonLink href="/#search" size="sm">
            Get your card
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
