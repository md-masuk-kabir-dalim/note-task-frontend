import { cn } from "@/lib/utils";

export function RoleBadge({ role }: { role?: string }) {
  const isAdmin = role === "ADMIN";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium",
        isAdmin ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground"
      )}
    >
      {role || "USER"}
    </span>
  );
}
