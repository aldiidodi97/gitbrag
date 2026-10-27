import { Suspense } from "react";
import { LiveDashboard } from "@/components/landing/live-dashboard";
import { UserSearch } from "@/components/search/user-search";
import { SiteHeader } from "@/components/site/site-header";

export const dynamic = "force-dynamic";

export default function OptionE() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Who shipped what, upstream?
          </h1>
          <div id="search" className="mt-8 w-full max-w-2xl text-left">
            <UserSearch autoFocus />
          </div>
          <ul className="text-muted-foreground mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <li>Pull requests to repos you do not own</li>
            <li>Merged, open and closed kept apart</li>
            <li>Share as link, PNG or README badge</li>
          </ul>
        </section>
        <section className="border-border bg-muted border-t py-16">
          <div className="mx-auto max-w-5xl">
            <Suspense>
              <LiveDashboard />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}
