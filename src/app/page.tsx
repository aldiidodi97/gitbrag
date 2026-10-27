import { UserSearch } from "@/components/search/user-search";
import { SiteHeader } from "@/components/site/site-header";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <SiteHeader current="/" />
      <main className="flex min-h-[calc(100vh-96px)] flex-col md:min-h-[calc(100vh-112px)]">
        <section className="flex flex-1 flex-col px-2">
          <div className="border-border relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center border-x">
            <div className="flex w-full flex-col items-center px-4 py-20 md:py-28">
              <span className="border-border text-foreground inline-flex items-center gap-2 border px-3 py-1 font-mono text-xs tracking-[0.08em] uppercase md:text-sm">
                <span className="bg-accent size-2 md:size-2.5" />
                Open-source bragging rights
              </span>
              <h1 className="mt-4 max-w-2xl text-center text-[40px] leading-10 tracking-tighter text-balance lg:text-6xl xl:text-7xl xl:leading-16">
                Show the work you shipped upstream
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
          <span>Not affiliated with GitHub</span>
        </div>
      </footer>
    </>
  );
}
