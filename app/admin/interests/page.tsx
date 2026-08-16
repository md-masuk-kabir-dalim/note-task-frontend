"use client";

import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { Surface } from "@/components/layout/surface";
import { EmptyState } from "@/components/common/empty-state";
import { InterestGridSkeleton } from "@/components/common/skeletons";
import { useUsersByInterests } from "@/hooks/use-admin";

export default function InterestsPage() {
  const { result, isLoading } = useUsersByInterests();
  const groups = result?.data || [];

  return (
    <PageShell admin>
        <PageHeader
          title="Users by interests"
          description="One MongoDB aggregation: unwind interests, then group users."
        />
        {isLoading ? (
          <InterestGridSkeleton />
        ) : groups.length === 0 ? (
          <EmptyState title="No interests found" />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {groups.map((group) => (
              <Surface key={group.interest}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-medium">{group.interest}</h2>
                  <span className="rounded-md bg-muted px-2 py-0.5 text-[12px] tabular-nums text-muted-foreground">
                    {group.users.length}
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {group.users.map((user) => (
                    <li key={user._id} className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium">{user.name}</span>
                      <span className="truncate text-muted-foreground">{user.email}</span>
                    </li>
                  ))}
                </ul>
              </Surface>
            ))}
          </div>
        )}
    </PageShell>
  );
}
