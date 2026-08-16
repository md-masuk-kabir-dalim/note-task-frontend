"use client";

import { ReactNode } from "react";
import { FileText } from "lucide-react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-violet-200 bg-white/60 px-4 py-12 text-center sm:py-16">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        <FileText className="size-5" />
      </span>
      <h3 className="mt-4 text-sm font-semibold">{title}</h3>
      {description ? (
        <p className="mt-1 max-w-sm text-[13px] leading-6 text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
