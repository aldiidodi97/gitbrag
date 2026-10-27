import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 font-semibold",
        className,
      )}
    >
      <span
        aria-hidden
        className="bg-accent text-accent-foreground flex h-6 w-6 items-center justify-center rounded-[5px]"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="6" r="3" />
          <path d="M6 15V9a4 4 0 0 1 4-4h2" />
          <path d="M18 9v3a4 4 0 0 1-4 4h-2" />
        </svg>
      </span>
      <span className="text-[15px] tracking-tight">GitBrag</span>
    </Link>
  );
}
