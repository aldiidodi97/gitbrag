import type { Metadata } from "next";
import { NotFoundView } from "@/components/site/not-found-view";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <NotFoundView
      title="This page shipped nowhere."
      description="The address does not exist. Look up a GitHub username below to see what they shipped upstream."
    />
  );
}
