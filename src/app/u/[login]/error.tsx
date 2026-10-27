"use client";

import { Button, ButtonLink } from "@/components/ui/button";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function ProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-5 py-24 text-center">
        <span className="label">Something went wrong</span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          We could not load this profile.
        </h1>
        <p className="text-muted-foreground mt-3">
          {error.message ||
            "GitHub did not answer in time. This usually clears up within a minute."}
        </p>
        <div className="mt-8 flex gap-3">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/" variant="outline">
            Back home
          </ButtonLink>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
