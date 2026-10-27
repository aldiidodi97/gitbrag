import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { label: "Home", href: "/" },
  { label: "Example", href: `/u/${siteConfig.exampleLogin}` },
  { label: "Source", href: siteConfig.repoUrl },
];

export function Corners() {
  return (
    <>
      <span className="border-border-strong absolute -top-px -left-px h-3 w-3 border-t-2 border-l-2" />
      <span className="border-border-strong absolute -top-px -right-px h-3 w-3 border-t-2 border-r-2" />
      <span className="border-border-strong absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2" />
      <span className="border-border-strong absolute -right-px -bottom-px h-3 w-3 border-r-2 border-b-2" />
    </>
  );
}

export function SiteHeader({ current = "/" }: { current?: string }) {
  return (
    <header className="bg-background sticky top-0 z-50 px-2 pt-2">
      <div className="border-border relative mx-auto flex h-14 w-full max-w-6xl items-center justify-between border px-4 md:h-16">
        <Corners />
        <div className="flex flex-1 items-center">
          <Logo />
        </div>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              {...(item.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className={
                item.href === current
                  ? "text-accent text-[15px] tracking-tight"
                  : "text-foreground hover:text-accent text-[15px] tracking-tight transition-colors"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />
          <Link
            href="/#search"
            className="bg-accent text-accent-fg hover:bg-accent/90 hidden h-9 items-center px-4 font-mono text-xs tracking-[0.08em] uppercase transition-colors sm:inline-flex md:h-10"
          >
            Get your card
          </Link>
          <MobileMenu items={nav} />
        </div>
      </div>
    </header>
  );
}
