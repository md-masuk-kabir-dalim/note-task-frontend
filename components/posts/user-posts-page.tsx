"use client";

import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Surface } from "@/components/layout/surface";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { ListCardSkeleton } from "@/components/common/skeletons";
import { BreadcrumbSchema } from "@/Schema/breadcrumb-schema";
import { JsonLd } from "@/Schema/json-ld";
import { siteConfig } from "@/lib/site";
import { useUserPosts } from "@/hooks/use-posts";

export function UserPostsPage() {
  const params = useParams<{ userId: string }>();
  const { result, isLoading, error } = useUserPosts(params.userId);
  const user = result?.data;
  const posts = user?.posts || [];
  const path = `/posts/${params.userId}`;

  const collectionSchema = user
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${user.name}'s posts`,
        description: `Public posts published by ${user.name} on ${siteConfig.name}.`,
        url: `${siteConfig.url}${path}`,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: {
          "@type": "Person",
          name: user.name,
        },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: posts.length,
          itemListElement: posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "SocialMediaPosting",
              headline: post.title,
              articleBody: post.content,
              author: { "@type": "Person", name: user.name },
            },
          })),
        },
      }
    : null;

  return (
    <div className="space-y-6">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: user ? `${user.name}'s posts` : "Public posts", path },
        ]}
      />
      {collectionSchema ? <JsonLd id="posts-schema" data={collectionSchema} /> : null}
      <PageHeader
        title={user ? `${user.name}'s posts` : "User posts"}
        description="Public posts loaded with a single $lookup aggregation."
      />
      {isLoading ? (
        <ListCardSkeleton />
      ) : error ? (
        <ErrorState message="User not found" />
      ) : posts.length === 0 ? (
        <EmptyState title="No public posts" description="This user has not published anything yet." />
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Surface key={post._id}>
              <h2 className="text-lg font-semibold tracking-tight">{post.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{post.content}</p>
            </Surface>
          ))}
        </div>
      )}
    </div>
  );
}
