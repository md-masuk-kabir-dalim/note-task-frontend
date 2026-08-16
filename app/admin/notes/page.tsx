"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { Surface } from "@/components/layout/surface";
import { Pagination } from "@/components/common/pagination";
import { EmptyState } from "@/components/common/empty-state";
import { ListCardSkeleton } from "@/components/common/skeletons";
import { useAdminNotes } from "@/hooks/use-admin";
import { formatDate } from "@/lib/format-date";

export default function AdminNotesPage() {
  const [page, setPage] = useState(1);
  const { result, isLoading } = useAdminNotes(page, 10);
  const notes = result?.data || [];

  return (
    <PageShell admin>
        <PageHeader
          title="All notes"
          description="Every private note in the system. Users never see each other’s notes."
        />
        {isLoading ? (
          <ListCardSkeleton />
        ) : notes.length === 0 ? (
          <EmptyState title="No notes found" />
        ) : (
          <div className="grid gap-4">
            {notes.map((note) => {
              const owner = typeof note.userId === "object" ? note.userId : null;
              return (
                <Surface key={note._id}>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {owner ? `${owner.name} · ${owner.email}` : "Unknown owner"}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold tracking-tight">{note.title}</h2>
                  <p className="mt-2 line-clamp-4 text-sm leading-6 text-muted-foreground">
                    {note.content}
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {formatDate(note.createdAt)}
                  </p>
                </Surface>
              );
            })}
          </div>
        )}
        <Pagination
          currentPage={result?.pagination?.page || 1}
          totalPages={result?.pagination?.totalPages || 0}
          onPageChange={setPage}
        />
    </PageShell>
  );
}
