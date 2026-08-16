"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { Surface } from "@/components/layout/surface";
import { DetailSkeleton } from "@/components/common/skeletons";
import { ErrorState } from "@/components/common/error-state";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useNote, useNoteMutations } from "@/hooks/use-notes";
import { formatDate } from "@/lib/format-date";

export default function ViewNotePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { result, isLoading, error } = useNote(params.id);
  const { deleteNote } = useNoteMutations();
  const [confirm, setConfirm] = useState(false);
  const note = result?.data;

  return (
    <PageShell className="mx-auto max-w-3xl">
      {isLoading ? (
        <DetailSkeleton />
      ) : error ? (
        <ErrorState message="Note not found or not authorized" />
      ) : note ? (
        <>
          <PageHeader
            title={note.title}
            description={`Updated ${formatDate(note.updatedAt)} · Created ${formatDate(note.createdAt)}`}
            action={
              <div className="flex w-full gap-2">
                <Button asChild variant="outline" className="flex-1 sm:flex-none">
                  <Link href={`/notes/${note._id}/edit`}>
                    <Pencil className="size-4" />
                    Edit
                  </Link>
                </Button>
                <Button variant="destructive" className="flex-1 sm:flex-none" onClick={() => setConfirm(true)}>
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              </div>
            }
          />
          <Surface>
            <p className="whitespace-pre-wrap text-[15px] leading-7 text-foreground/90">
              {note.content}
            </p>
          </Surface>
        </>
      ) : null}
      <ConfirmDialog
        open={confirm}
        title="Delete note"
        description="This cannot be undone."
        confirmLabel="Delete"
        onCancel={() => setConfirm(false)}
        onConfirm={async () => {
          await deleteNote(params.id);
          router.push("/notes");
        }}
      />
    </PageShell>
  );
}
