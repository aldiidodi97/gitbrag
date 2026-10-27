import { NotFoundView } from "@/components/site/not-found-view";

export default function ProfileNotFound() {
  return (
    <NotFoundView
      title="No GitHub user by that name."
      description="Check the spelling, or look up another username below."
    />
  );
}
