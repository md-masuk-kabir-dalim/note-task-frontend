import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function NoteCardSkeleton() {
  return (
    <div className="rounded-2xl border border-violet-100/90 bg-white p-5">
      <Skeleton className="h-5 w-2/3 rounded-md" />
      <Skeleton className="mt-3 h-4 w-full rounded-md" />
      <Skeleton className="mt-2 h-4 w-11/12 rounded-md" />
      <Skeleton className="mt-2 h-4 w-4/5 rounded-md" />
      <div className="mt-5 flex items-center justify-between border-t border-violet-100/80 pt-3">
        <Skeleton className="h-3 w-24 rounded-md" />
        <div className="flex gap-2">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="size-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function NoteGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <NoteCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function MetricsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      className={cn(
        "grid overflow-hidden rounded-2xl border border-violet-100/90 bg-white",
        count <= 2 ? "grid-cols-2" : "grid-cols-2 xl:grid-cols-4"
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border-b border-r border-violet-100/80 px-4 py-4 last:border-b-0 even:border-r-0 sm:px-6 sm:py-5 [&:nth-last-child(2)]:max-xl:border-b-0 xl:border-b-0 xl:border-r xl:even:border-r xl:last:border-r-0"
        >
          <Skeleton className="h-3 w-20 rounded-md" />
          <Skeleton className="mt-3 h-8 w-16 rounded-md" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <>
      <div className="grid gap-3 md:hidden">
        {Array.from({ length: Math.min(rows, 4) }).map((_, row) => (
          <div key={row} className="rounded-2xl border border-violet-100/90 bg-white p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="size-8 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-32 max-w-full rounded-md" />
                <Skeleton className="h-3 w-44 max-w-full rounded-md" />
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <Skeleton className="size-10 rounded-lg" />
              <Skeleton className="size-10 rounded-lg" />
              <Skeleton className="size-10 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
      <div className="hidden overflow-hidden rounded-2xl border border-violet-100/90 bg-white md:block">
        <div className="grid grid-cols-5 gap-4 border-b border-violet-100 px-5 py-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-3 w-16 rounded-md" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, row) => (
          <div
            key={row}
            className="grid grid-cols-5 items-center gap-4 border-b border-violet-100/70 px-5 py-3.5 last:border-0"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-7 rounded-full" />
              <Skeleton className="h-4 w-28 rounded-md" />
            </div>
            <Skeleton className="h-4 w-36 rounded-md" />
            <Skeleton className="h-5 w-14 rounded-md" />
            <Skeleton className="h-5 w-24 rounded-md" />
            <div className="ml-auto flex gap-2">
              <Skeleton className="size-8 rounded-lg" />
              <Skeleton className="size-8 rounded-lg" />
              <Skeleton className="size-8 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function FormSkeleton({ fields = 5 }: { fields?: number }) {
  return (
    <div className="rounded-2xl border border-violet-100/90 bg-white p-5">
      <div className="space-y-4">
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-3 w-20 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}
        <Skeleton className="ml-auto h-10 w-28 rounded-full" />
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 max-w-full rounded-md sm:h-8 sm:w-64" />
          <Skeleton className="h-4 w-40 max-w-full rounded-md sm:w-48" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-full rounded-full sm:h-9 sm:w-20" />
          <Skeleton className="h-10 w-full rounded-full sm:h-9 sm:w-20" />
        </div>
      </div>
      <div className="rounded-2xl border border-violet-100/90 bg-white p-6">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="mt-3 h-4 w-11/12 rounded-md" />
        <Skeleton className="mt-3 h-4 w-10/12 rounded-md" />
        <Skeleton className="mt-3 h-4 w-8/12 rounded-md" />
      </div>
    </div>
  );
}

export function ListCardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-2xl border border-violet-100/90 bg-white p-5">
          <Skeleton className="h-3 w-40 rounded-md" />
          <Skeleton className="mt-3 h-5 w-2/3 rounded-md" />
          <Skeleton className="mt-3 h-4 w-full rounded-md" />
          <Skeleton className="mt-2 h-4 w-5/6 rounded-md" />
        </div>
      ))}
    </div>
  );
}

export function InterestGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-2xl border border-violet-100/90 bg-white p-5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-5 w-8 rounded-md" />
          </div>
          <div className="mt-4 space-y-3">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded-md" />
        <Skeleton className="h-4 w-full max-w-72 rounded-md" />
      </div>
      <MetricsSkeleton />
      <NoteGridSkeleton count={2} />
    </div>
  );
}
