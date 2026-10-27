import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <span aria-hidden className="bg-accent grid size-6 place-items-center">
        <span className="bg-accent-fg size-2.5" />
      </span>
      <span className="text-foreground text-[15px] font-semibold tracking-tight">
        GitBrag
      </span>
    </Link>
  );
}
