import { ImageResponse } from "next/og";
import { loadCardFonts } from "@/lib/cards/fonts";
import { CARD_SIZES, ShareCard } from "@/lib/cards/share-card";
import { getContributionReport } from "@/lib/github";
import { getSiteUrl } from "@/lib/site";

export const alt = "Open-source contributions on GitBrag";
export const size = CARD_SIZES.og;
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ login: string }>;
}) {
  const { login } = await params;
  const [report, fonts] = await Promise.all([
    getContributionReport(login),
    loadCardFonts(),
  ]);
  const siteHost = new URL(getSiteUrl()).host;
  return new ImageResponse(
    <ShareCard report={report} format="og" siteHost={siteHost} />,
    { ...size, fonts },
  );
}
