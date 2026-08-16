import type { Metadata } from "next";
import { UserPostsPage } from "@/components/posts/user-posts-page";
import { pageMetadata } from "@/lib/site";

type Props = {
  params: Promise<{ userId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId } = await params;
  return pageMetadata({
    title: "Public posts",
    description:
      "Read public posts from this SecureNotes user. Private notes stay hidden and are never listed here.",
    index: true,
    path: `/posts/${userId}`,
  });
}

export default function Page() {
  return <UserPostsPage />;
}
