"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { NoteCard } from "@/components/notes/note-card";
import { MetricsRow } from "@/components/layout/stat-card";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { EmptyState } from "@/components/common/empty-state";
import { MetricsSkeleton, NoteGridSkeleton } from "@/components/common/skeletons";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useNoteMutations, useNotes } from "@/hooks/use-notes";
import { useNoteStats } from "@/hooks/use-note-stats";
import { timeOfDayGreeting } from "@/lib/format-date";
import { useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { result, isLoading } = useNotes(1, 100);
  const { deleteNote } = useNoteMutations();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const notes = result?.data || [];
  const firstName = user?.name?.split(" ")[0] || "there";
  const stats = useNoteStats(notes, result?.pagination?.total);

  return (
    <PageShell className="space-y-8">
        <PageHeader
          title={`${timeOfDayGreeting()}, ${firstName}`}
          description="Overview of your notes and recent activity."
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
          <MetricsSkeleton />
        ) : (
          <MetricsRow
            items={[
              { label: "My notes", value: stats.total },
              { label: "This week", value: stats.createdThisWeek },
              { label: "Last updated", value: stats.lastUpdatedLabel },
              { label: "Total words", value: stats.totalWords },
            ]}
          />
        )}

        <section className="space-y-4">
          <SectionHeading
            title="Recent notes"
            action={
              <Link href="/notes" className="text-[13px] font-medium text-primary hover:text-primary-hover">
                View all
              </Link>
            }
          />
          {isLoading ? (
            <NoteGridSkeleton />
          ) : notes.length === 0 ? (
            <EmptyState
              title="No notes yet"
              description="Create your first private note. Only you will be able to read it."
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
              {notes.slice(0, 4).map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onDelete={() => setDeleteId(note._id)}
                />
              ))}
            </div>
          )}
        </section>
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
