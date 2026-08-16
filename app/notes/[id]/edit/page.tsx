"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { NoteEditor } from "@/components/notes/note-editor";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { FormSkeleton } from "@/components/common/skeletons";
import { ErrorState } from "@/components/common/error-state";
import { useNote, useNoteMutations } from "@/hooks/use-notes";
import { getApiErrorMessage } from "@/lib/api-error";

export default function EditNotePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { result, isLoading } = useNote(params.id);
  const { updateNote, updateState } = useNoteMutations();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (result?.data) {
      setTitle(result.data.title);
      setContent(result.data.content);
    }
  }, [result?.data]);

  return (
    <PageShell className="mx-auto max-w-3xl">
      <PageHeader title="Edit note" description="Changes stay private to your account." />
      {isLoading ? (
        <FormSkeleton fields={2} />
      ) : (
        <>
          {error ? <ErrorState message={error} /> : null}
          <NoteEditor
            title={title}
            content={content}
            onTitleChange={setTitle}
            onContentChange={setContent}
            submitting={updateState.isLoading}
            onSubmit={async (event) => {
              event.preventDefault();
              setError("");
              try {
                await updateNote(params.id, { title, content });
                router.push(`/notes/${params.id}`);
              } catch (err: unknown) {
                setError(getApiErrorMessage(err, "Could not update note"));
              }
            }}
          />
        </>
      )}
    </PageShell>
  );
}
