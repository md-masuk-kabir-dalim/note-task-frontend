import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="px-4 py-4 sm:px-6 sm:py-5">
      <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground sm:text-[11px] sm:tracking-[0.14em]">
        {label}
      </p>
      <p className="mt-1.5 text-[1.45rem] font-semibold tracking-[-0.04em] tabular-nums sm:mt-2 sm:text-[1.7rem]">
        {value}
      </p>
    </div>
  );
}

export function MetricsRow({
  items,
  className,
}: {
  items: { label: string; value: string | number }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid overflow-hidden rounded-2xl border border-violet-100/90 bg-white shadow-[0_1px_2px_rgba(26,11,58,0.04),0_8px_24px_rgba(26,11,58,0.04)]",
        items.length <= 2 ? "grid-cols-2" : "grid-cols-2 xl:grid-cols-4",
        className
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="border-b border-r border-violet-100/80 even:border-r-0 last:border-b-0 [&:nth-last-child(2)]:max-xl:border-b-0 xl:border-b-0 xl:border-r xl:even:border-r xl:last:border-r-0">
          <StatCard label={item.label} value={item.value} />
        </div>
      ))}
    </div>
  );
}
