"use client";

import type { Note } from "@/types/note";
import { countWords, formatDate } from "@/lib/format-date";

export const useNoteStats = (notes: Note[], total = notes.length) => {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const createdThisWeek = notes.filter(
    (note) => new Date(note.createdAt).getTime() >= weekAgo
  ).length;
  const lastUpdated = notes
    .map((note) => note.updatedAt)
    .sort((a, b) => +new Date(b) - +new Date(a))[0];

  return {
    total,
    createdThisWeek,
    lastUpdatedLabel: formatDate(lastUpdated),
    totalWords: notes.reduce((sum, note) => sum + countWords(note.content), 0),
  };
};
