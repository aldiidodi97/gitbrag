import { UserSearch } from "@/components/search/user-search";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function ProfileNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-5 py-24 text-center">
        <span className="label">404</span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          No GitHub user by that name.
        </h1>
        <p className="text-muted-foreground mt-3">
          Check the spelling, or try another username below.
        </p>
        <UserSearch size="md" className="mt-8" />
      </main>
      <SiteFooter />
    </>
  );
}
