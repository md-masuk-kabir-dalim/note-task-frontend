"use client";

import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Input from "@/components/common/input";
import { Surface } from "@/components/layout/surface";

export function NoteEditor({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSubmit,
  submitting,
  submitLabel = "Save note",
}: {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  submitting?: boolean;
  submitLabel?: string;
}) {
  return (
    <Surface>
      <form onSubmit={onSubmit} className="space-y-5">
        <Input
          label="Title"
          name="title"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Meeting notes, idea, reminder…"
          required
        />
        <div className="space-y-1.5">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(event) => onContentChange(event.target.value)}
            required
            rows={14}
            placeholder="Write privately. This note is only visible to you."
            className="min-h-48 leading-7 sm:min-h-64"
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={submitting} className="h-11 w-full px-5 sm:h-10 sm:w-auto">
            {submitting ? "Saving..." : submitLabel}
          </Button>
        </div>
      </form>
    </Surface>
  );
}
