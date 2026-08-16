"use client";

import { FileText, Plus, Tags, Users } from "lucide-react";
import { useAdminNotes, useAdminUsers } from "@/hooks/use-admin";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { MetricsRow } from "@/components/layout/stat-card";
import { MetricsSkeleton } from "@/components/common/skeletons";
import { QuickLink } from "@/components/layout/quick-link";

export default function AdminDashboardPage() {
  const users = useAdminUsers(1, 1);
  const notes = useAdminNotes(1, 1);

  return (
    <PageShell admin className="space-y-8">
        <PageHeader
          title="Admin overview"
          description="Manage accounts, inspect notes, and review interest groupings."
        />
        {users.isLoading || notes.isLoading ? (
          <MetricsSkeleton count={2} />
        ) : (
          <MetricsRow
            items={[
              { label: "Users", value: users.result?.pagination?.total ?? 0 },
              { label: "All notes", value: notes.result?.pagination?.total ?? 0 },
            ]}
          />
        )}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <QuickLink
            href="/admin/users"
            label="Manage users"
            description="Create, update, or remove accounts."
            icon={Users}
          />
          <QuickLink
            href="/admin/users/new"
            label="Add user"
            description="Admins can assign USER or ADMIN roles."
            icon={Plus}
          />
          <QuickLink
            href="/admin/notes"
            label="All notes"
            description="Read every note across the workspace."
            icon={FileText}
          />
          <QuickLink
            href="/admin/interests"
            label="Interests"
            description="Users grouped with a single aggregation."
            icon={Tags}
          />
        </div>
    </PageShell>
  );
}
