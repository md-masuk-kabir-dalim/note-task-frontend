"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { UserTable } from "@/components/users/user-table";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { Pagination } from "@/components/common/pagination";
import { EmptyState } from "@/components/common/empty-state";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { TableSkeleton } from "@/components/common/skeletons";
import { Button } from "@/components/ui/button";
import { useAdminUserMutations, useAdminUsers } from "@/hooks/use-admin";
import type { User } from "@/types/user";

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<User | null>(null);
  const { result, isLoading } = useAdminUsers(page, 10);
  const { deleteUser } = useAdminUserMutations();
  const users = result?.data || [];

  return (
    <PageShell admin>
        <PageHeader
          title="Users"
          description="Directory of every account. Public register cannot create ADMIN."
          action={
            <Button asChild>
              <Link href="/admin/users/new">
                <Plus className="size-4" />
                Add user
              </Link>
            </Button>
          }
        />
        {isLoading ? (
          <TableSkeleton />
        ) : users.length === 0 ? (
          <EmptyState title="No users found" />
        ) : (
          <UserTable users={users} onDelete={setSelected} />
        )}
        <Pagination
          currentPage={result?.pagination?.page || 1}
          totalPages={result?.pagination?.totalPages || 0}
          onPageChange={setPage}
        />
        <ConfirmDialog
          open={!!selected}
          title="Delete user"
          description={`Remove ${selected?.name}? Their notes and posts will also be deleted.`}
          confirmLabel="Delete"
          onCancel={() => setSelected(null)}
          onConfirm={async () => {
            if (selected) await deleteUser(selected._id);
            setSelected(null);
          }}
        />
    </PageShell>
  );
}
