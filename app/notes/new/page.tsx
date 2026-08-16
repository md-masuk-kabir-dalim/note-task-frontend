"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NoteEditor } from "@/components/notes/note-editor";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { ErrorState } from "@/components/common/error-state";
import { useNoteMutations } from "@/hooks/use-notes";
import { getApiErrorMessage } from "@/lib/api-error";

export default function CreateNotePage() {
  const router = useRouter();
  const { createNote, createState } = useNoteMutations();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  return (
    <PageShell className="mx-auto max-w-3xl">
      <PageHeader
        title="New note"
        description="Write a private note. Ownership is enforced on the server, not the client."
      />
      {error ? <ErrorState message={error} /> : null}
      <NoteEditor
        title={title}
        content={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
        submitting={createState.isLoading}
        submitLabel="Create note"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          try {
            await createNote({ title, content });
            router.push("/notes");
          } catch (err: unknown) {
            setError(getApiErrorMessage(err, "Could not create note"));
          }
        }}
      />
    </PageShell>
  );
}
