import { cache } from "react";
import { hasGitHubToken, loadReport, type ReportResult } from "@/lib/github";
import { siteConfig } from "@/lib/site";

/** The real profile shown on the landing page; deduped per request. */
export const getExample = cache(async (): Promise<ReportResult | null> => {
  if (!hasGitHubToken()) return null;
  try {
    return await loadReport(siteConfig.exampleLogin);
  } catch {
    return null;
  }
});
