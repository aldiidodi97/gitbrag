import Image from "next/image";
import heart from "@/assets/icons/heart.png";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function SupportCallout() {
  return (
    <section className="border-border bg-card mt-14 flex flex-col items-center gap-6 rounded-xl border p-8 text-center sm:flex-row sm:text-left">
      <Image src={heart} alt="" className="size-16 shrink-0 sm:size-[72px]" />
      <div className="min-w-0 flex-1">
        <span className="label">Support {siteConfig.name}</span>
        <p className="mt-1.5 text-lg tracking-tight text-balance sm:text-xl">
          Free, open source and no login. If it made you look good, buy me a
          coffee.
        </p>
      </div>
      <ButtonLink
        href={siteConfig.supportUrl}
        target="_blank"
        rel="noreferrer"
        variant="raised"
        className="shrink-0"
      >
        Support me
      </ButtonLink>
    </section>
  );
}
