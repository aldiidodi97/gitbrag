export const siteConfig = {
  name: "GitBrag",
  tagline: "Show off your open-source contributions.",
  description:
    "GitBrag turns any GitHub profile into a shareable record of open-source work: merged pull requests, projects touched, languages and more.",
  repoUrl: "https://github.com/aldiidodi97/gitbrag",
  /** Real profile rendered on the landing page as the live example. */
  exampleLogin: "depapp",
  twitterHandle: "",
};

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.URL) return process.env.URL.replace(/\/$/, "");
  if (process.env.DEPLOY_PRIME_URL) return process.env.DEPLOY_PRIME_URL;
  return "http://localhost:3000";
}

export function profileUrl(login: string) {
  return `${getSiteUrl()}/u/${encodeURIComponent(login)}`;
}
