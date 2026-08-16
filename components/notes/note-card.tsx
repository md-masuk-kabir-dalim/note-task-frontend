"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Note } from "@/types/note";
import { formatDate } from "@/lib/format-date";
import { IconButton } from "@/components/layout/icon-button";

export function NoteCard({
  note,
  onDelete,
}: {
  note: Note;
  onDelete?: () => void;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-violet-100/90 bg-white p-4 shadow-[0_1px_2px_rgba(26,11,58,0.04)] transition duration-200 hover:border-violet-200 hover:shadow-[0_16px_40px_rgba(26,11,58,0.08)] sm:p-5 sm:hover:-translate-y-0.5">
      <span className="absolute inset-y-4 left-0 w-0.5 rounded-full bg-primary/0 transition group-hover:bg-primary" />
      <Link href={`/notes/${note._id}`} className="flex flex-1 flex-col">
        <h3 className="text-[16px] font-semibold tracking-[-0.02em]">{note.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-6 text-muted-foreground">
          {note.content}
        </p>
      </Link>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-violet-100/80 pt-3">
        <p className="text-[12px] text-muted-foreground">{formatDate(note.updatedAt)}</p>
        <div className="flex items-center">
          <IconButton href={`/notes/${note._id}`} label="View note" icon={Eye} />
          <IconButton href={`/notes/${note._id}/edit`} label="Edit note" icon={Pencil} />
          {onDelete ? (
            <IconButton label="Delete note" icon={Trash2} tone="danger" onClick={onDelete} />
          ) : null}
        </div>
      </div>
    </article>
  );
}
