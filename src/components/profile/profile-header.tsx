import {
  Building2,
  CalendarDays,
  Link as LinkIcon,
  MapPin,
  Users,
} from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import type { GitHubUser } from "@/lib/github/types";
import { formatCompact, formatDate } from "@/lib/utils";

export function ProfileHeader({ user }: { user: GitHubUser }) {
  const facts = [
    user.company && { Icon: Building2, text: user.company },
    user.location && { Icon: MapPin, text: user.location },
    { Icon: Users, text: `${formatCompact(user.followers)} followers` },
    {
      Icon: CalendarDays,
      text: `Joined ${formatDate(user.createdAt, { day: undefined })}`,
    },
  ].filter(Boolean) as Array<{ Icon: typeof MapPin; text: string }>;

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      <div className="flex items-start gap-5">
        <Image
          src={user.avatarUrl}
          alt={`${user.login}'s avatar`}
          width={88}
          height={88}
          priority
          className="border-border size-20 rounded-lg border md:size-[88px]"
        />
        <div className="min-w-0">
          <span className="label">Open-source contributions /</span>
          <h1 className="mt-1 truncate text-3xl font-semibold tracking-tight md:text-4xl">
            {user.name ?? user.login}
          </h1>
          <a
            href={user.url}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-accent font-mono text-sm"
          >
            @{user.login}
          </a>
          {user.bio ? (
            <p className="text-muted-foreground mt-3 max-w-xl text-sm">
              {user.bio}
            </p>
          ) : null}
          <div className="text-muted-foreground mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
            {facts.map(({ Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5">
                <Icon className="size-3.5" /> {text}
              </span>
            ))}
            {user.websiteUrl ? (
              <a
                href={
                  user.websiteUrl.startsWith("http")
                    ? user.websiteUrl
                    : `https://${user.websiteUrl}`
                }
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent inline-flex items-center gap-1.5"
              >
                <LinkIcon className="size-3.5" />{" "}
                {user.websiteUrl.replace(/^https?:\/\//, "")}
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <ButtonLink
        href={user.url}
        variant="outline"
        size="sm"
        target="_blank"
        rel="noreferrer"
        className="shrink-0"
      >
        View on GitHub
      </ButtonLink>
    </div>
  );
}
