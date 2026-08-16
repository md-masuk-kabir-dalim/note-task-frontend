"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { NoteCard } from "@/components/notes/note-card";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { Pagination } from "@/components/common/pagination";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { NoteGridSkeleton } from "@/components/common/skeletons";
import { Button } from "@/components/ui/button";
import { useNoteMutations, useNotes } from "@/hooks/use-notes";

export default function NotesPage() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { result, isLoading, error } = useNotes(page, 10);
  const { deleteNote } = useNoteMutations();
  const notes = result?.data || [];
  const total = result?.pagination?.total ?? notes.length;

  return (
    <PageShell>
        <PageHeader
          title="My notes"
          description={`${total} private note${total === 1 ? "" : "s"} — only you can see these.`}
          action={
            <Button asChild>
              <Link href="/notes/new">
                <Plus className="size-4" />
                New note
              </Link>
            </Button>
          }
        />
        {isLoading ? (
          <NoteGridSkeleton count={4} />
        ) : error ? (
          <ErrorState message="Could not load notes" />
        ) : notes.length === 0 ? (
          <EmptyState
            title="No notes yet"
            description="Write something only you can access."
            action={
              <Button asChild>
                <Link href="/notes/new">
                  <Plus className="size-4" />
                  New note
                </Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={() => setDeleteId(note._id)}
              />
            ))}
          </div>
        )}
        <Pagination
          currentPage={result?.pagination?.page || 1}
          totalPages={result?.pagination?.totalPages || 0}
          onPageChange={setPage}
        />
        <ConfirmDialog
          open={!!deleteId}
          title="Delete note"
          description="This cannot be undone."
          confirmLabel="Delete"
          onCancel={() => setDeleteId(null)}
          onConfirm={async () => {
            if (deleteId) await deleteNote(deleteId);
            setDeleteId(null);
          }}
        />
    </PageShell>
  );
}
