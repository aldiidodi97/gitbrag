import { GitMerge, Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { RepoSummary } from "@/lib/github/types";
import { formatCompact, formatMonth } from "@/lib/utils";

export function RepoGrid({ repos }: { repos: RepoSummary[] }) {
  if (repos.length === 0) return null;
  return (
    <div className="border-border bg-border grid gap-px overflow-hidden rounded-lg border sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <a
          key={repo.nameWithOwner}
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          className="group bg-card hover:bg-muted flex flex-col gap-3 p-5 transition-colors"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <Image
                src={repo.ownerAvatarUrl}
                alt=""
                width={32}
                height={32}
                className="border-border size-8 shrink-0 rounded-md border"
              />
              <div className="min-w-0">
                <div className="text-muted-foreground truncate text-xs">
                  {repo.owner}
                </div>
                <div className="group-hover:text-accent truncate font-semibold">
                  {repo.name}
                </div>
              </div>
            </div>
            {repo.isArchived ? <Badge>Archived</Badge> : null}
          </div>
          <p className="text-muted-foreground line-clamp-2 min-h-[2.5rem] text-sm">
            {repo.description ?? "No description."}
          </p>
          <div className="text-muted-foreground mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px]">
            <span className="text-foreground inline-flex items-center gap-1">
              <GitMerge className="text-accent size-3" />
              {repo.merged} merged
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="size-3" />
              {formatCompact(repo.stars)}
            </span>
            {repo.language ? (
              <span className="inline-flex items-center gap-1">
                <span
                  className="size-2 rounded-full"
                  style={{ background: repo.language.color ?? "currentColor" }}
                />
                {repo.language.name}
              </span>
            ) : null}
            <span className="ml-auto">
              {formatMonth(repo.lastContribution)}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
