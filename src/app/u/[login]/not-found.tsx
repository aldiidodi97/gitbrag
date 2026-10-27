import { UserSearch } from "@/components/search/user-search";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function ProfileNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="w-full px-4 sm:px-6">
          <div className="border-border mx-auto flex w-full max-w-6xl flex-col items-center justify-center border-x px-6 py-24 text-center sm:px-10">
            <span className="label">404</span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              No GitHub user by that name.
            </h1>
            <p className="text-muted-foreground mt-3">
              Check the spelling, or try another username below.
            </p>
            <UserSearch size="md" className="mt-8" />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
