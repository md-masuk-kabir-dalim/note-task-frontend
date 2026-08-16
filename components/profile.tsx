"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useCreatePost, useUserPosts } from "@/hooks/use-posts";
import { Button } from "@/components/ui/button";
import Input from "@/components/common/input";
import { Textarea } from "@/components/ui/textarea";
import { ErrorState } from "@/components/common/error-state";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { Surface } from "@/components/layout/surface";
import { RoleBadge } from "@/components/layout/role-badge";
import { InterestsSelect } from "@/components/common/interests-select";
import { UserAvatar } from "@/components/layout/user-avatar";
import { ListCardSkeleton } from "@/components/common/skeletons";
import { getApiErrorMessage } from "@/lib/api-error";

export default function ProfilePageClient() {
  const { user, updateProfile } = useAuth();
  const { result, isLoading: postsLoading } = useUserPosts(user?.id);
  const { createPost, isLoading } = useCreatePost();
  const [name, setName] = useState(user?.name || "");
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(user?.name || "");
    setInterests(user?.interests || []);
  }, [user]);

  return (
    <PageShell>
        <PageHeader
          title="Profile"
          description="Update your account details and publish public posts."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Surface className="space-y-5">
            <div className="flex min-w-0 items-center gap-4">
              <UserAvatar name={user?.name} size="lg" />
              <div className="min-w-0">
                <p className="truncate font-semibold">{user?.name}</p>
                <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
                <div className="mt-2">
                  <RoleBadge role={user?.role} />
                </div>
              </div>
            </div>
            {error ? <ErrorState message={error} /> : null}
            <form
              className="space-y-4"
              onSubmit={async (event) => {
                event.preventDefault();
                setError("");
                try {
                  await updateProfile({
                    name,
                    interests,
                  });
                } catch (err: unknown) {
                  setError(getApiErrorMessage(err, "Could not update profile"));
                }
              }}
            >
              <Input
                label="Name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
              <InterestsSelect value={interests} onChange={setInterests} />
              <Button type="submit" className="h-11 w-full sm:h-9 sm:w-auto">Save profile</Button>
            </form>
          </Surface>
          <Surface className="space-y-5">
            <div>
              <h2 className="font-semibold tracking-tight">Public posts</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                These are visible to anyone with your posts URL.
              </p>
            </div>
            <form
              className="space-y-3"
              onSubmit={async (event) => {
                event.preventDefault();
                await createPost({ title, content });
                setTitle("");
                setContent("");
              }}
            >
              <Input
                label="Post title"
                name="postTitle"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
              <Textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                required
                placeholder="Share something public"
                rows={5}
              />
              <Button type="submit" disabled={isLoading} className="h-11 w-full sm:h-9 sm:w-auto">
                Publish post
              </Button>
            </form>
            {postsLoading ? (
              <ListCardSkeleton count={2} />
            ) : (
              <ul className="space-y-2">
                {(result?.data?.posts || []).map((post) => (
                  <li key={post._id} className="rounded-xl border border-border/80 p-3">
                    <p className="font-medium">{post.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{post.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </Surface>
        </div>
    </PageShell>
  );
}
