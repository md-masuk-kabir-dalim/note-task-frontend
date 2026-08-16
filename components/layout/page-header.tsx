import { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <div className="min-w-0 space-y-1.5">
        <h1 className="break-words text-[1.4rem] font-semibold tracking-[-0.04em] text-foreground sm:text-[1.85rem]">
          {title}
        </h1>
        {description ? (
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? (
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center [&_a]:w-full sm:[&_a]:w-auto [&_button]:w-full sm:[&_button]:w-auto">
          {action}
        </div>
      ) : null}
    </div>
  );
}
