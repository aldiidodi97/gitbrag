import Image from "next/image";
import logo from "@/assets/logo.png";
import { UserSearch } from "@/components/search/user-search";
import { SiteHeader } from "@/components/site/site-header";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <SiteHeader current="/" />
      <main className="flex flex-1 flex-col">
        <section className="flex flex-1 flex-col px-2">
          <div className="border-border relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center border-x">
            <div className="flex w-full flex-1 flex-col items-center justify-center px-4 py-10 md:py-14">
              <Image
                src={logo}
                alt="GitBrag"
                width={96}
                height={96}
                priority
                className="mb-5 size-20 md:size-24"
              />
              <span className="border-border text-foreground inline-flex items-center border px-3 py-1 font-mono text-xs tracking-[0.08em] uppercase md:text-sm">
                Open-source bragging rights
              </span>
              <h1 className="mt-4 max-w-3xl text-center text-[2rem] leading-9 tracking-tighter sm:text-5xl sm:leading-tight lg:text-6xl xl:text-7xl xl:leading-16">
                <span className="block">Show the work</span>
                <span className="block">you shipped upstream</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-prose text-center text-sm tracking-tight text-balance lg:text-base">
                GitBrag turns a GitHub username into a record of the pull
                requests sent to other people&apos;s projects: merged, ranked by
                repository, and ready to share as a link, a card, or a README
                badge.
              </p>
              <div
                id="search"
                className="w-full max-w-lg scroll-mt-24 pt-10 pb-4"
              >
                <UserSearch autoFocus />
              </div>
              <span className="text-muted-foreground font-mono text-xs uppercase">
                No sign-in. Public data only. MIT licensed.
              </span>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-background px-2 pb-2">
        <div className="border-border text-foreground mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 border-x border-t px-4 py-4 font-mono text-xs uppercase md:text-sm lg:h-16 lg:flex-row lg:py-0">
          <span>© {new Date().getFullYear()} GitBrag. MIT licensed.</span>
          <span>
            Supported by{" "}
            <a
              href="https://pamerin.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent underline underline-offset-4 transition-colors"
            >
              Pamerin
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
